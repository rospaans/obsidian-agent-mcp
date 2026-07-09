# Obsidian Community Plugin: Submission Readiness Checklist

Purpose: a checklist for a coding agent to audit this repository before submitting the
plugin to the Obsidian Community directory. Work through every item, report each as
PASS / FAIL / N/A with a short justification, and quote the offending file and line for
each FAIL.

## Important context: how review works now

Review is fully automated. When you submit through the developer dashboard on the
Community site, or when any new release is published, an automated scan runs against the
plugin. The plugin is not installable inside Obsidian until that scan passes, and every
new version is scanned, not just the first submission.

The scanner runs two things:

1. `eslint-plugin-obsidianmd` (the official rule set, `recommended` config).
2. `typescript-eslint` type-checked rules. Most submission failures come from missing
   this second part, so the audit must confirm the project is set up for type-aware
   linting (a valid `tsconfig.json` referenced by the ESLint config).

Treat items marked **[BLOCKER]** as hard failures that will stop publication. Items
marked **[GUIDELINE]** are recommendations reviewers may still require you to fix
depending on severity. Items marked **[POLICY]** are the Developer Policies: violating
these can get a plugin removed even after publication.

Canonical references:
- Developer policies: https://docs.obsidian.md/Developer+policies
- Submission requirements: https://docs.obsidian.md/Plugins/Releasing/Submission+requirements+for+plugins
- Plugin guidelines: https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines
- Self critique checklist: https://docs.obsidian.md/oo24/plugin
- Official ESLint plugin: https://github.com/obsidianmd/eslint-plugin

---

## 1. Required files in the repository root

- [ ] **[BLOCKER]** `manifest.json` exists at the repo root and is valid JSON.
- [ ] **[BLOCKER]** `README.md` exists at the repo root, describing the purpose of the
      plugin and how to use it.
- [ ] **[BLOCKER]** `LICENSE` exists at the repo root and clearly states the license.
- [ ] **[GUIDELINE]** `main.js` is NOT committed to the repo. It belongs only in the
      GitHub release assets, not in source control.
- [ ] **[GUIDELINE]** A lock file is committed (`package-lock.json`, `pnpm-lock.yaml`,
      or `yarn.lock`) matching the package manager in use.
- [ ] `styles.css` at the root is optional. If present, confirm it is real and used.

---

## 2. manifest.json field audit

Validate against the official manifest schema. The scanner runs `validate-manifest`, so
structural errors here are blockers.

- [ ] **[BLOCKER]** `id` is present, unique across all published plugins, and does NOT
      contain the string `obsidian`. Confirm the id is not already taken in the
      community directory.
- [ ] **[BLOCKER]** `name` is present. Do not include the word "Obsidian" unless it is
      genuinely necessary, since it is usually redundant and can imply a first-party
      creation (trademark concern).
- [ ] **[BLOCKER]** `version` follows Semantic Versioning in strict `x.y.z` form (for
      example `1.0.0`). No `v` prefix, no pre-release suffix in the released tag.
- [ ] **[BLOCKER]** `minAppVersion` is set to the minimum Obsidian version whose API you
      actually rely on. If unsure, use the current latest stable build number. The
      scanner (`no-unsupported-api`) will flag any API you call that did not exist in
      `minAppVersion`.
- [ ] **[BLOCKER]** `description`:
  - [ ] 250 characters maximum.
  - [ ] Ends with a period.
  - [ ] Does not start with "This is a plugin".
  - [ ] Starts ideally with an action verb (for example "Translate...", "Sync...",
        "Generate...", "Import...").
  - [ ] No emoji or special characters.
  - [ ] Correct capitalization for acronyms, proper nouns, and trademarks (Obsidian,
        Markdown, PDF, and so on).
- [ ] **[BLOCKER]** `author` is present.
- [ ] `authorUrl`, if present, points to a real author or project page, not a donation
      link.
- [ ] **[BLOCKER]** `isDesktopOnly` is set to `true` if, and only if, the plugin uses
      Node.js or Electron APIs (for example `fs`, `path`, `os`, `crypto`, `electron`).
      If the plugin is mobile compatible, this must be `false` or absent.
- [ ] **[BLOCKER]** `fundingUrl` is present only if you actually accept financial
      support (for example Buy Me a Coffee, GitHub Sponsors). If you do not accept
      donations, remove the field entirely. It must never point to Obsidian itself.
- [ ] The manifest committed at the HEAD of the default branch is accurate, since the
      directory reads the manifest from there at submission time.

---

## 3. GitHub release audit

- [ ] **[BLOCKER]** A GitHub release exists whose tag name exactly matches the `version`
      in `manifest.json`. The tag must be the bare version, with no `v` prefix.
- [ ] **[BLOCKER]** The release has these files attached as individual binary assets
      (not only inside the source zip):
  - [ ] `main.js`
  - [ ] `manifest.json` (yes, also in the release, in addition to the repo root)
  - [ ] `styles.css` (only if the plugin ships styles)
- [ ] `versions.json` is present and maps plugin versions to their `minAppVersion` if you
      want older Obsidian clients to fetch compatible older builds. Recommended.
- [ ] The release is published, not a draft.

---

## 4. README disclosures (Developer policy)

The following are allowed ONLY if clearly disclosed in the README. For each, confirm the
plugin either does not do it, or discloses it clearly.

- [ ] **[POLICY]** Payment required for full access: disclosed if applicable.
- [ ] **[POLICY]** Account required for full access: disclosed if applicable.
- [ ] **[POLICY]** Network use: every remote service is named, with an explanation of
      what data is sent and why it is needed.
- [ ] **[POLICY]** Accessing files outside the Obsidian vault: disclosed with reason.
- [ ] **[POLICY]** Static ads within the plugin's own interface: disclosed if present.
- [ ] **[POLICY]** Server-side telemetry: disclosed, with a link to a privacy policy
      explaining how data is handled.
- [ ] **[POLICY]** Closed source: flagged. Note that new closed source plugins are not
      currently being accepted into the directory.
- [ ] **[POLICY]** Third-party code attribution: any borrowed code is credited in the
      README where its license requires it.

---

## 5. Developer policy: hard prohibitions

Confirm the plugin does NONE of the following.

- [ ] **[POLICY]** No obfuscated code that hides its purpose.
- [ ] **[POLICY]** No dynamic ads loaded over the internet.
- [ ] **[POLICY]** No static ads outside the plugin's own interface.
- [ ] **[POLICY]** No client-side telemetry of any kind. Check dependencies too: many
      analytics or usage-tracking libraries collect data users would consider sensitive.
- [ ] **[POLICY]** No self-update mechanism. The plugin must not download and run code to
      update itself. Updates go only through normal GitHub releases.
- [ ] **[POLICY]** No remote code execution, and no fetching and evaluating code from the
      network.
- [ ] **[POLICY]** No collecting vault contents or personal data without clear consent.

---

## 6. LICENSE and copyright

- [ ] **[BLOCKER]** `LICENSE` file present and its license is clearly indicated.
- [ ] **[BLOCKER]** The copyright holder in the LICENSE is the real author, not leftover
      sample or template boilerplate. The scanner runs `validate-license` on the
      structure of the copyright notice.
- [ ] **[POLICY]** The plugin complies with the licenses of any code it reuses, including
      required attribution in the README.
- [ ] **[POLICY]** No use of the "Obsidian" trademark in a way that could confuse users
      into thinking this is a first-party plugin.

---

## 7. Not a disallowed fork

- [ ] **[POLICY]** If this project derives from another plugin, confirm one of: explicit
      written approval from the original author in a publicly verifiable place, OR proof
      the original author is unreachable and has not updated for at least 6 months. In
      either case the original author is credited as a contributor.
- [ ] **[POLICY]** If the project simply diverges in functionality, confirm it is a fresh
      repository with its own code and inherits no code from another repo without
      permission.

---

## 8. Submission-specific requirements

- [ ] **[BLOCKER]** No sample or boilerplate code from the template remains. Scanner runs
      `no-sample-code` and `sample-names`. Check specifically for:
  - [ ] Placeholder class names like `MyPlugin`, `SampleSettingTab`, `SampleModal`.
  - [ ] The sample ribbon icon, sample "Open modal (simple)" command, sample global
        click listener, and the sample `setInterval` console logger.
  - [ ] Leftover comments and TODOs from the template.
- [ ] **[BLOCKER]** Command IDs do not embed the plugin ID. Obsidian prefixes the plugin
      ID automatically. Scanner: `commands/no-plugin-id-in-command-id`.
- [ ] **[BLOCKER]** Command IDs do not contain the word "command". Scanner:
      `commands/no-command-in-command-id`.
- [ ] **[GUIDELINE]** Command names do not repeat the plugin name, and do not contain the
      word "command". Obsidian shows the plugin name already. Scanners:
      `commands/no-plugin-name-in-command-name`, `commands/no-command-in-command-name`.
- [ ] **[GUIDELINE]** No default hotkeys are assigned to commands, to avoid conflicts.
      Scanner: `commands/no-default-hotkeys`.

---

## 9. Code quality: automated ESLint rules (each is a scan check)

Run `npm run lint` (or the equivalent) with `eslint-plugin-obsidianmd` recommended config
AND typescript-eslint type-checked rules enabled. Confirm the ESLint config imports both
and references `tsconfig.json` via `parserOptions.project`. Then verify each rule area:

- [ ] `no-nodejs-modules`: no Node.js built-in imports unless guarded by
      `Platform.isDesktop` and required dynamically at runtime. Not at the top level.
- [ ] `no-global-this`: no `global` or `globalThis`. Use `window` or `activeWindow` for
      popout window compatibility.
- [ ] `platform`: OS detection uses Obsidian's `Platform`, not the `navigator` API or
      `process.platform`.
- [ ] `detach-leaves`: leaves are NOT detached in `onunload`.
- [ ] `no-view-references-in-plugin`: the plugin does not store direct references to its
      custom views (memory leak risk).
- [ ] `no-plugin-as-component`: passing a component to `MarkdownRenderer.render` avoids
      the anti-patterns that cause memory leaks.
- [ ] `no-tfile-tfolder-cast`: no casting to `TFile` or `TFolder`. Use `instanceof`
      checks instead.
- [ ] `prefer-instanceof`: use `.instanceOf(T)` over `instanceof T` for cross-window-safe
      checks on DOM nodes and UI events.
- [ ] `no-forbidden-elements`: no attaching forbidden elements to the DOM.
- [ ] `no-static-styles-assignment`: no setting styles directly on elements. Use CSS
      classes in `styles.css` instead.
- [ ] `settings-tab/no-manual-html-headings`: settings headings do not use raw HTML
      heading elements.
- [ ] `settings-tab/no-problematic-settings-headings`: no anti-patterns in settings
      headings.
- [ ] `ui/sentence-case`: UI strings use sentence case, not Title Case.
- [ ] `prefer-window-timers`: use `window.setTimeout` and friends, not bare global timer
      calls, for popout compatibility.
- [ ] `prefer-active-doc` (warn): prefer `activeDocument` over `document` for popout
      compatibility.
- [ ] `prefer-file-manager-trash-file` (warn): prefer `FileManager.trashFile()` over
      `Vault.trash()` or `Vault.delete()` so deletion respects user settings.
- [ ] `prefer-get-language`: use Obsidian's `getLanguage()` rather than reading
      `localStorage` or bundling a language detector.
- [ ] `prefer-abstract-input-suggest`: use the built-in `AbstractInputSuggest` rather
      than the commonly copied custom `TextInputSuggest`.
- [ ] `object-assign`: avoid two-argument `Object.assign`.
- [ ] `editor-drop-paste`: editor-drop and editor-paste handlers check
      `evt.defaultPrevented` and call `evt.preventDefault()`.
- [ ] `regex-lookbehind`: no regex lookbehinds if supporting iOS below 16.4.
- [ ] `hardcoded-config-path`: the `.obsidian` config folder path is not hardcoded. Read
      it from `app.vault.configDir`.
- [ ] `vault/iterate`: do not iterate all files to find one by path. Use direct lookups
      such as `getAbstractFileByPath`.
- [ ] `no-unsupported-api`: no API calls newer than `minAppVersion`.
- [ ] `validate-manifest` and `validate-license`: pass (covered in sections 2 and 6).

---

## 10. Code quality: manual best practices (not all auto-detected)

- [ ] **[GUIDELINE]** Use `this.app`, never the global `app` or `window.app`. The global
      is for debugging and may be removed.
- [ ] **[GUIDELINE]** No unnecessary console logging. In default configuration the
      console should show only errors. `console.warn`, `console.error`, and
      `console.debug` are tolerated for real error reporting; remove routine logs.
- [ ] **[GUIDELINE]** Use `const` or `let`, never `var`.
- [ ] **[GUIDELINE]** Use Obsidian's `requestUrl` for network calls, not `fetch` or
      `axios.get`, to avoid CORS and mobile issues.
- [ ] **[GUIDELINE]** Any user-defined or constructed vault path passes through
      `normalizePath()` from the Obsidian API. This is the single most common review
      comment.
- [ ] **[GUIDELINE]** Do not cast `Vault.adapter` to `FileSystemAdapter`. Gate any such
      use behind an `instanceof` check, since on mobile it is a `CapacitorAdapter`.
- [ ] **[GUIDELINE]** Do not use `Vault.modify` to edit the active file. Use the `Editor`
      interface for the active file, or `Vault.process` for background edits.
- [ ] **[GUIDELINE]** Do not read or write frontmatter manually. Use
      `FileManager.processFrontMatter`.
- [ ] **[GUIDELINE]** Event listeners, intervals, and DOM events are registered through
      `registerEvent`, `registerInterval`, `registerDomEvent`, and similar, so they are
      cleaned up automatically. Anything not auto-registered is torn down in `onunload`.
- [ ] **[GUIDELINE]** Do not override Obsidian core styling. Scope custom CSS under your
      own class.
- [ ] **[GUIDELINE]** Prefer building DOM with `createEl` / `createDiv` helpers over
      assigning `innerHTML` / `outerHTML`.
- [ ] **[GUIDELINE]** Scan for deprecated API methods (they render as strikethrough in
      most IDEs) and replace them.
- [ ] **[GUIDELINE]** If `main.ts` is large, split it into multiple files or folders for
      maintainability.
- [ ] **[GUIDELINE]** Be conservative with dependencies. Fewer dependencies is safer, and
      each one is part of what reviewers assess.

---

## 11. Mobile compatibility

- [ ] If `isDesktopOnly` is `false`, confirm the plugin genuinely runs on mobile: no
      un-gated Node or Electron usage, no `FileSystemAdapter` assumptions, no
      desktop-only APIs, and no iOS-incompatible regex.
- [ ] If any of the above cannot be satisfied, set `isDesktopOnly: true` in the manifest
      instead.

---

## 12. Pre-submission mechanical steps

- [ ] Everything above is committed to the default branch and pushed, since the directory
      reads `manifest.json` from HEAD of the default branch.
- [ ] Optionally run a preview scan on the target branch, tag, or commit using the
      developer dashboard on the Community site before formally submitting.
- [ ] Submit via the developer dashboard: sign in to the Community site with your
      Obsidian account, connect the GitHub account that owns the repo, choose the repo,
      and complete the submission steps. The plugin is reviewed immediately on submission.
- [ ] Address any scorecard feedback by pushing fixes and publishing a new release with an
      incremented version, then re-checking status.

---

## Agent output format

For each numbered section, produce a table with columns: item, status
(PASS / FAIL / N/A), evidence (file and line, or command output). At the end, list every
BLOCKER FAIL first, then POLICY FAIL, then GUIDELINE FAIL, so the highest-priority fixes
are unmistakable.
