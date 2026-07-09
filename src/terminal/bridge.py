#!/usr/bin/env python3
"""PTY bridge for the Obsidian Agent MCP terminal.

Spawns a shell on a real kernel pty and bridges it over stdio, giving the
plugin true-TTY behavior (raw mode, ANSI, resize) without shipping any native
.node binary. Uses only the Python standard library.

Protocol
  argv:   shell cwd cols rows [shell args...]
  stdin:  raw terminal input bytes  -> pty master
  stdout: raw terminal output bytes <- pty master
  fd 3:   control channel, lines of "cols,rows\\n" -> TIOCSWINSZ + SIGWINCH
  exit:   process exits with the shell's exit code
"""
import os, sys, pty, fcntl, termios, struct, select, signal, errno


def set_winsize(fd, rows, cols):
    fcntl.ioctl(fd, termios.TIOCSWINSZ, struct.pack("HHHH", rows, cols, 0, 0))


def main():
    if len(sys.argv) < 5:
        sys.stderr.write("pty bridge: expected shell cwd cols rows [args...]\n")
        sys.exit(2)

    shell = sys.argv[1]
    cwd = sys.argv[2]
    cols = int(sys.argv[3])
    rows = int(sys.argv[4])
    shell_args = sys.argv[5:]

    pid, master_fd = pty.fork()
    if pid == 0:  # child: attached to the pty slave as its controlling TTY
        try:
            os.chdir(cwd)
        except OSError:
            pass
        os.execvp(shell, [shell] + shell_args)
        os._exit(127)

    # parent
    set_winsize(master_fd, rows, cols)

    ctrl_fd = 3
    try:
        os.fstat(ctrl_fd)
    except OSError:
        ctrl_fd = None

    stdin_fd = sys.stdin.fileno()
    stdout_fd = sys.stdout.fileno()
    ctrl_buf = b""

    while True:
        rfds = [master_fd, stdin_fd] + ([ctrl_fd] if ctrl_fd is not None else [])
        try:
            r, _, _ = select.select(rfds, [], [])
        except OSError as e:
            if e.errno == errno.EINTR:
                continue
            raise

        if master_fd in r:
            try:
                data = os.read(master_fd, 65536)
            except OSError:
                data = b""
            if not data:
                break
            os.write(stdout_fd, data)

        if stdin_fd in r:
            try:
                data = os.read(stdin_fd, 65536)
            except OSError:
                data = b""
            if data:
                os.write(master_fd, data)

        if ctrl_fd is not None and ctrl_fd in r:
            try:
                chunk = os.read(ctrl_fd, 4096)
            except OSError:
                chunk = b""
            if chunk:
                ctrl_buf += chunk
                while b"\n" in ctrl_buf:
                    line, ctrl_buf = ctrl_buf.split(b"\n", 1)
                    parts = line.decode(errors="ignore").strip().split(",")
                    if len(parts) == 2:
                        try:
                            set_winsize(master_fd, int(parts[1]), int(parts[0]))
                            os.kill(pid, signal.SIGWINCH)
                        except (ValueError, OSError):
                            pass

    try:
        _, status = os.waitpid(pid, 0)
        code = os.waitstatus_to_exitcode(status)
    except OSError:
        code = 0
    sys.exit(code if code >= 0 else 1)


if __name__ == "__main__":
    main()
