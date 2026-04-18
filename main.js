"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@xterm/xterm/lib/xterm.js
var require_xterm = __commonJS({
  "node_modules/@xterm/xterm/lib/xterm.js"(exports2, module2) {
    !(function(e, t) {
      if ("object" == typeof exports2 && "object" == typeof module2) module2.exports = t();
      else if ("function" == typeof define && define.amd) define([], t);
      else {
        var i = t();
        for (var s in i) ("object" == typeof exports2 ? exports2 : e)[s] = i[s];
      }
    })(globalThis, (() => (() => {
      "use strict";
      var e = { 2840: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.AccessibilityManager = void 0;
        const n = i2(7721), o = i2(4292), a = i2(7150), l = i2(7098), h = i2(6501), c = i2(7093);
        let d = class extends a.Disposable {
          constructor(e3, t3, i3, s3) {
            super(), this._terminal = e3, this._coreBrowserService = i3, this._renderService = s3, this._rowColumns = /* @__PURE__ */ new WeakMap(), this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "";
            const r2 = this._coreBrowserService.mainDocument;
            this._accessibilityContainer = r2.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = r2.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
            for (let e4 = 0; e4 < this._terminal.rows; e4++) this._rowElements[e4] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e4]);
            if (this._topBoundaryFocusListener = (e4) => this._handleBoundaryFocus(e4, 0), this._bottomBoundaryFocusListener = (e4) => this._handleBoundaryFocus(e4, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = r2.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this._register(new o.TimeBasedDebouncer(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
            this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this._register(this._terminal.onResize(((e4) => this._handleResize(e4.rows)))), this._register(this._terminal.onRender(((e4) => this._refreshRows(e4.start, e4.end)))), this._register(this._terminal.onScroll((() => this._refreshRows()))), this._register(this._terminal.onA11yChar(((e4) => this._handleChar(e4)))), this._register(this._terminal.onLineFeed((() => this._handleChar("\n")))), this._register(this._terminal.onA11yTab(((e4) => this._handleTab(e4)))), this._register(this._terminal.onKey(((e4) => this._handleKey(e4.key)))), this._register(this._terminal.onBlur((() => this._clearLiveRegion()))), this._register(this._renderService.onDimensionsChange((() => this._refreshRowsDimensions()))), this._register((0, c.addDisposableListener)(r2, "selectionchange", (() => this._handleSelectionChange()))), this._register(this._coreBrowserService.onDprChange((() => this._refreshRowsDimensions()))), this._refreshRowsDimensions(), this._refreshRows(), this._register((0, a.toDisposable)((() => {
              this._accessibilityContainer.remove(), this._rowElements.length = 0;
            })));
          }
          _handleTab(e3) {
            for (let t3 = 0; t3 < e3; t3++) this._handleChar(" ");
          }
          _handleChar(e3) {
            this._liveRegionLineCount < 21 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e3 && (this._charsToAnnounce += e3) : this._charsToAnnounce += e3, "\n" === e3 && (this._liveRegionLineCount++, 21 === this._liveRegionLineCount && (this._liveRegion.textContent += n.tooMuchOutput.get())));
          }
          _clearLiveRegion() {
            this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
          }
          _handleKey(e3) {
            this._clearLiveRegion(), /\p{Control}/u.test(e3) || this._charsToConsume.push(e3);
          }
          _refreshRows(e3, t3) {
            this._liveRegionDebouncer.refresh(e3, t3, this._terminal.rows);
          }
          _renderRows(e3, t3) {
            const i3 = this._terminal.buffer, s3 = i3.lines.length.toString();
            for (let r2 = e3; r2 <= t3; r2++) {
              const e4 = i3.lines.get(i3.ydisp + r2), t4 = [], n2 = e4?.translateToString(true, void 0, void 0, t4) || "", o2 = (i3.ydisp + r2 + 1).toString(), a2 = this._rowElements[r2];
              a2 && (0 === n2.length ? (a2.textContent = "\xA0", this._rowColumns.set(a2, [0, 1])) : (a2.textContent = n2, this._rowColumns.set(a2, t4)), a2.setAttribute("aria-posinset", o2), a2.setAttribute("aria-setsize", s3), this._alignRowWidth(a2));
            }
            this._announceCharacters();
          }
          _announceCharacters() {
            0 !== this._charsToAnnounce.length && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
          }
          _handleBoundaryFocus(e3, t3) {
            const i3 = e3.target, s3 = this._rowElements[0 === t3 ? 1 : this._rowElements.length - 2];
            if (i3.getAttribute("aria-posinset") === (0 === t3 ? "1" : `${this._terminal.buffer.lines.length}`)) return;
            if (e3.relatedTarget !== s3) return;
            let r2, n2;
            if (0 === t3 ? (r2 = i3, n2 = this._rowElements.pop(), this._rowContainer.removeChild(n2)) : (r2 = this._rowElements.shift(), n2 = i3, this._rowContainer.removeChild(r2)), r2.removeEventListener("focus", this._topBoundaryFocusListener), n2.removeEventListener("focus", this._bottomBoundaryFocusListener), 0 === t3) {
              const e4 = this._createAccessibilityTreeNode();
              this._rowElements.unshift(e4), this._rowContainer.insertAdjacentElement("afterbegin", e4);
            } else {
              const e4 = this._createAccessibilityTreeNode();
              this._rowElements.push(e4), this._rowContainer.appendChild(e4);
            }
            this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(0 === t3 ? -1 : 1), this._rowElements[0 === t3 ? 1 : this._rowElements.length - 2].focus(), e3.preventDefault(), e3.stopImmediatePropagation();
          }
          _handleSelectionChange() {
            if (0 === this._rowElements.length) return;
            const e3 = this._coreBrowserService.mainDocument.getSelection();
            if (!e3) return;
            if (e3.isCollapsed) return void (this._rowContainer.contains(e3.anchorNode) && this._terminal.clearSelection());
            if (!e3.anchorNode || !e3.focusNode) return void console.error("anchorNode and/or focusNode are null");
            let t3 = { node: e3.anchorNode, offset: e3.anchorOffset }, i3 = { node: e3.focusNode, offset: e3.focusOffset };
            if ((t3.node.compareDocumentPosition(i3.node) & Node.DOCUMENT_POSITION_PRECEDING || t3.node === i3.node && t3.offset > i3.offset) && ([t3, i3] = [i3, t3]), t3.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (t3 = { node: this._rowElements[0].childNodes[0], offset: 0 }), !this._rowContainer.contains(t3.node)) return;
            const s3 = this._rowElements.slice(-1)[0];
            if (i3.node.compareDocumentPosition(s3) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (i3 = { node: s3, offset: s3.textContent?.length ?? 0 }), !this._rowContainer.contains(i3.node)) return;
            const r2 = ({ node: e4, offset: t4 }) => {
              const i4 = e4 instanceof Text ? e4.parentNode : e4;
              let s4 = parseInt(i4?.getAttribute("aria-posinset"), 10) - 1;
              if (isNaN(s4)) return console.warn("row is invalid. Race condition?"), null;
              const r3 = this._rowColumns.get(i4);
              if (!r3) return console.warn("columns is null. Race condition?"), null;
              let n3 = t4 < r3.length ? r3[t4] : r3.slice(-1)[0] + 1;
              return n3 >= this._terminal.cols && (++s4, n3 = 0), { row: s4, column: n3 };
            }, n2 = r2(t3), o2 = r2(i3);
            if (n2 && o2) {
              if (n2.row > o2.row || n2.row === o2.row && n2.column >= o2.column) throw new Error("invalid range");
              this._terminal.select(n2.column, n2.row, (o2.row - n2.row) * this._terminal.cols - n2.column + o2.column);
            }
          }
          _handleResize(e3) {
            this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
            for (let e4 = this._rowContainer.children.length; e4 < this._terminal.rows; e4++) this._rowElements[e4] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e4]);
            for (; this._rowElements.length > e3; ) this._rowContainer.removeChild(this._rowElements.pop());
            this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
          }
          _createAccessibilityTreeNode() {
            const e3 = this._coreBrowserService.mainDocument.createElement("div");
            return e3.setAttribute("role", "listitem"), e3.tabIndex = -1, this._refreshRowDimensions(e3), e3;
          }
          _refreshRowsDimensions() {
            if (this._renderService.dimensions.css.cell.height) {
              Object.assign(this._accessibilityContainer.style, { width: `${this._renderService.dimensions.css.canvas.width}px`, fontSize: `${this._terminal.options.fontSize}px` }), this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
              for (let e3 = 0; e3 < this._terminal.rows; e3++) this._refreshRowDimensions(this._rowElements[e3]), this._alignRowWidth(this._rowElements[e3]);
            }
          }
          _refreshRowDimensions(e3) {
            e3.style.height = `${this._renderService.dimensions.css.cell.height}px`;
          }
          _alignRowWidth(e3) {
            e3.style.transform = "";
            const t3 = e3.getBoundingClientRect().width, i3 = this._rowColumns.get(e3)?.slice(-1)?.[0];
            if (!i3) return;
            const s3 = i3 * this._renderService.dimensions.css.cell.width;
            e3.style.transform = `scaleX(${s3 / t3})`;
          }
        };
        t2.AccessibilityManager = d, t2.AccessibilityManager = d = s2([r(1, h.IInstantiationService), r(2, l.ICoreBrowserService), r(3, l.IRenderService)], d);
      }, 7861: (e2, t2) => {
        function i2(e3) {
          return e3.replace(/\r?\n/g, "\r");
        }
        function s2(e3, t3) {
          return t3 ? "\x1B[200~" + e3 + "\x1B[201~" : e3;
        }
        function r(e3, t3, r2, n2) {
          e3 = s2(e3 = i2(e3), r2.decPrivateModes.bracketedPasteMode && true !== n2.rawOptions.ignoreBracketedPasteMode), r2.triggerDataEvent(e3, true), t3.value = "";
        }
        function n(e3, t3, i3) {
          const s3 = i3.getBoundingClientRect(), r2 = e3.clientX - s3.left - 10, n2 = e3.clientY - s3.top - 10;
          t3.style.width = "20px", t3.style.height = "20px", t3.style.left = `${r2}px`, t3.style.top = `${n2}px`, t3.style.zIndex = "1000", t3.focus();
        }
        Object.defineProperty(t2, "__esModule", { value: true }), t2.prepareTextForTerminal = i2, t2.bracketTextForPaste = s2, t2.copyHandler = function(e3, t3) {
          e3.clipboardData && e3.clipboardData.setData("text/plain", t3.selectionText), e3.preventDefault();
        }, t2.handlePasteEvent = function(e3, t3, i3, s3) {
          e3.stopPropagation(), e3.clipboardData && r(e3.clipboardData.getData("text/plain"), t3, i3, s3);
        }, t2.paste = r, t2.moveTextAreaUnderMouseCursor = n, t2.rightClickHandler = function(e3, t3, i3, s3, r2) {
          n(e3, t3, i3), r2 && s3.rightClickSelect(e3), t3.value = s3.selectionText, t3.select();
        };
      }, 7174: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ColorContrastCache = void 0;
        const s2 = i2(7710);
        t2.ColorContrastCache = class {
          constructor() {
            this._color = new s2.TwoKeyMap(), this._css = new s2.TwoKeyMap();
          }
          setCss(e3, t3, i3) {
            this._css.set(e3, t3, i3);
          }
          getCss(e3, t3) {
            return this._css.get(e3, t3);
          }
          setColor(e3, t3, i3) {
            this._color.set(e3, t3, i3);
          }
          getColor(e3, t3) {
            return this._color.get(e3, t3);
          }
          clear() {
            this._color.clear(), this._css.clear();
          }
        };
      }, 1718: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreBrowserTerminal = void 0;
        const s2 = i2(7861), r = i2(7721), n = i2(3285), o = i2(4017), a = i2(4196), l = i2(9925), h = i2(3618), c = i2(3955), d = i2(4792), u = i2(945), _ = i2(9574), f = i2(9820), p = i2(9784), g = i2(5783), m = i2(2079), v = i2(7098), S = i2(9078), b = i2(4103), C = i2(5777), y = i2(701), w = i2(6107), E = i2(3534), D = i2(706), L = i2(8693), R = i2(4720), A = i2(6501), T = i2(2486), k = i2(2840), M = i2(8906), O = i2(802), I = i2(7093), P = i2(7150);
        class x extends C.CoreTerminal {
          get linkifier() {
            return this._linkifier.value;
          }
          get onFocus() {
            return this._onFocus.event;
          }
          get onBlur() {
            return this._onBlur.event;
          }
          get onA11yChar() {
            return this._onA11yCharEmitter.event;
          }
          get onA11yTab() {
            return this._onA11yTabEmitter.event;
          }
          get onWillOpen() {
            return this._onWillOpen.event;
          }
          constructor(e3 = {}) {
            super(e3), this._linkifier = this._register(new P.MutableDisposable()), this.browser = y, this._keyDownHandled = false, this._keyDownSeen = false, this._keyPressHandled = false, this._unprocessedDeadKey = false, this._accessibilityManager = this._register(new P.MutableDisposable()), this._onCursorMove = this._register(new O.Emitter()), this.onCursorMove = this._onCursorMove.event, this._onKey = this._register(new O.Emitter()), this.onKey = this._onKey.event, this._onRender = this._register(new O.Emitter()), this.onRender = this._onRender.event, this._onSelectionChange = this._register(new O.Emitter()), this.onSelectionChange = this._onSelectionChange.event, this._onTitleChange = this._register(new O.Emitter()), this.onTitleChange = this._onTitleChange.event, this._onBell = this._register(new O.Emitter()), this.onBell = this._onBell.event, this._onFocus = this._register(new O.Emitter()), this._onBlur = this._register(new O.Emitter()), this._onA11yCharEmitter = this._register(new O.Emitter()), this._onA11yTabEmitter = this._register(new O.Emitter()), this._onWillOpen = this._register(new O.Emitter()), this._setup(), this._decorationService = this._instantiationService.createInstance(R.DecorationService), this._instantiationService.setService(A.IDecorationService, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(f.LinkProviderService), this._instantiationService.setService(v.ILinkProviderService, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(n.OscLinkProvider)), this._register(this._inputHandler.onRequestBell((() => this._onBell.fire()))), this._register(this._inputHandler.onRequestRefreshRows(((e4) => this.refresh(e4?.start ?? 0, e4?.end ?? this.rows - 1)))), this._register(this._inputHandler.onRequestSendFocus((() => this._reportFocus()))), this._register(this._inputHandler.onRequestReset((() => this.reset()))), this._register(this._inputHandler.onRequestWindowsOptionsReport(((e4) => this._reportWindowsOptions(e4)))), this._register(this._inputHandler.onColor(((e4) => this._handleColorEvent(e4)))), this._register(O.Event.forward(this._inputHandler.onCursorMove, this._onCursorMove)), this._register(O.Event.forward(this._inputHandler.onTitleChange, this._onTitleChange)), this._register(O.Event.forward(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this._register(O.Event.forward(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this._register(this._bufferService.onResize(((e4) => this._afterResize(e4.cols, e4.rows)))), this._register((0, P.toDisposable)((() => {
              this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
            })));
          }
          _handleColorEvent(e3) {
            if (this._themeService) for (const t3 of e3) {
              let e4, i3 = "";
              switch (t3.index) {
                case 256:
                  e4 = "foreground", i3 = "10";
                  break;
                case 257:
                  e4 = "background", i3 = "11";
                  break;
                case 258:
                  e4 = "cursor", i3 = "12";
                  break;
                default:
                  e4 = "ansi", i3 = "4;" + t3.index;
              }
              switch (t3.type) {
                case 0:
                  const s3 = b.color.toColorRGB("ansi" === e4 ? this._themeService.colors.ansi[t3.index] : this._themeService.colors[e4]);
                  this.coreService.triggerDataEvent(`${E.C0.ESC}]${i3};${(0, L.toRgbString)(s3)}${E.C1_ESCAPED.ST}`);
                  break;
                case 1:
                  if ("ansi" === e4) this._themeService.modifyColors(((e5) => e5.ansi[t3.index] = b.channels.toColor(...t3.color)));
                  else {
                    const i4 = e4;
                    this._themeService.modifyColors(((e5) => e5[i4] = b.channels.toColor(...t3.color)));
                  }
                  break;
                case 2:
                  this._themeService.restoreColor(t3.index);
              }
            }
          }
          _setup() {
            super._setup(), this._customKeyEventHandler = void 0;
          }
          get buffer() {
            return this.buffers.active;
          }
          focus() {
            this.textarea && this.textarea.focus({ preventScroll: true });
          }
          _handleScreenReaderModeOptionChange(e3) {
            e3 ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(k.AccessibilityManager, this)) : this._accessibilityManager.clear();
          }
          _handleTextAreaFocus(e3) {
            this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(E.C0.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
          }
          blur() {
            return this.textarea?.blur();
          }
          _handleTextAreaBlur() {
            this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(E.C0.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
          }
          _syncTextArea() {
            if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
            const e3 = this.buffer.ybase + this.buffer.y, t3 = this.buffer.lines.get(e3);
            if (!t3) return;
            const i3 = Math.min(this.buffer.x, this.cols - 1), s3 = this._renderService.dimensions.css.cell.height, r2 = t3.getWidth(i3), n2 = this._renderService.dimensions.css.cell.width * r2, o2 = this.buffer.y * this._renderService.dimensions.css.cell.height, a2 = i3 * this._renderService.dimensions.css.cell.width;
            this.textarea.style.left = a2 + "px", this.textarea.style.top = o2 + "px", this.textarea.style.width = n2 + "px", this.textarea.style.height = s3 + "px", this.textarea.style.lineHeight = s3 + "px", this.textarea.style.zIndex = "-5";
          }
          _initGlobal() {
            this._bindKeys(), this._register((0, I.addDisposableListener)(this.element, "copy", ((e4) => {
              this.hasSelection() && (0, s2.copyHandler)(e4, this._selectionService);
            })));
            const e3 = (e4) => (0, s2.handlePasteEvent)(e4, this.textarea, this.coreService, this.optionsService);
            this._register((0, I.addDisposableListener)(this.textarea, "paste", e3)), this._register((0, I.addDisposableListener)(this.element, "paste", e3)), y.isFirefox ? this._register((0, I.addDisposableListener)(this.element, "mousedown", ((e4) => {
              2 === e4.button && (0, s2.rightClickHandler)(e4, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
            }))) : this._register((0, I.addDisposableListener)(this.element, "contextmenu", ((e4) => {
              (0, s2.rightClickHandler)(e4, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
            }))), y.isLinux && this._register((0, I.addDisposableListener)(this.element, "auxclick", ((e4) => {
              1 === e4.button && (0, s2.moveTextAreaUnderMouseCursor)(e4, this.textarea, this.screenElement);
            })));
          }
          _bindKeys() {
            this._register((0, I.addDisposableListener)(this.textarea, "keyup", ((e3) => this._keyUp(e3)), true)), this._register((0, I.addDisposableListener)(this.textarea, "keydown", ((e3) => this._keyDown(e3)), true)), this._register((0, I.addDisposableListener)(this.textarea, "keypress", ((e3) => this._keyPress(e3)), true)), this._register((0, I.addDisposableListener)(this.textarea, "compositionstart", (() => this._compositionHelper.compositionstart()))), this._register((0, I.addDisposableListener)(this.textarea, "compositionupdate", ((e3) => this._compositionHelper.compositionupdate(e3)))), this._register((0, I.addDisposableListener)(this.textarea, "compositionend", (() => this._compositionHelper.compositionend()))), this._register((0, I.addDisposableListener)(this.textarea, "input", ((e3) => this._inputEvent(e3)), true)), this._register(this.onRender((() => this._compositionHelper.updateCompositionElements())));
          }
          open(e3) {
            if (!e3) throw new Error("Terminal requires a parent element.");
            if (e3.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) return void (this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView));
            this._document = e3.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e3.appendChild(this.element);
            const t3 = this._document.createDocumentFragment();
            this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), t3.appendChild(this._viewportElement), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._register((0, I.addDisposableListener)(this.screenElement, "mousemove", ((e4) => this.updateCursorStyle(e4)))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), t3.appendChild(this.screenElement);
            const i3 = this.textarea = this._document.createElement("textarea");
            this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", r.promptLabel.get()), y.isChromeOS || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._register(this.optionsService.onSpecificOptionChange("disableStdin", (() => i3.readOnly = this.optionsService.rawOptions.disableStdin))), this.textarea.readOnly = this.optionsService.rawOptions.disableStdin, this._coreBrowserService = this._register(this._instantiationService.createInstance(_.CoreBrowserService, this.textarea, e3.ownerDocument.defaultView ?? window, this._document ?? "undefined" != typeof window ? window.document : null)), this._instantiationService.setService(v.ICoreBrowserService, this._coreBrowserService), this._register((0, I.addDisposableListener)(this.textarea, "focus", ((e4) => this._handleTextAreaFocus(e4)))), this._register((0, I.addDisposableListener)(this.textarea, "blur", (() => this._handleTextAreaBlur()))), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(d.CharSizeService, this._document, this._helperContainer), this._instantiationService.setService(v.ICharSizeService, this._charSizeService), this._themeService = this._instantiationService.createInstance(S.ThemeService), this._instantiationService.setService(v.IThemeService, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(u.CharacterJoinerService), this._instantiationService.setService(v.ICharacterJoinerService, this._characterJoinerService), this._renderService = this._register(this._instantiationService.createInstance(g.RenderService, this.rows, this.screenElement)), this._instantiationService.setService(v.IRenderService, this._renderService), this._register(this._renderService.onRenderedViewportChange(((e4) => this._onRender.fire(e4)))), this.onResize(((e4) => this._renderService.resize(e4.cols, e4.rows))), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(h.CompositionHelper, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(p.MouseService), this._instantiationService.setService(v.IMouseService, this._mouseService);
            const s3 = this._linkifier.value = this._register(this._instantiationService.createInstance(M.Linkifier, this.screenElement));
            this.element.appendChild(t3);
            try {
              this._onWillOpen.fire(this.element);
            } catch {
            }
            this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._register(this.onCursorMove((() => {
              this._renderService.handleCursorMove(), this._syncTextArea();
            }))), this._register(this.onResize((() => this._renderService.handleResize(this.cols, this.rows)))), this._register(this.onBlur((() => this._renderService.handleBlur()))), this._register(this.onFocus((() => this._renderService.handleFocus()))), this._viewport = this._register(this._instantiationService.createInstance(o.Viewport, this.element, this.screenElement)), this._register(this._viewport.onRequestScrollLines(((e4) => {
              super.scrollLines(e4, false), this.refresh(0, this.rows - 1);
            }))), this._selectionService = this._register(this._instantiationService.createInstance(m.SelectionService, this.element, this.screenElement, s3)), this._instantiationService.setService(v.ISelectionService, this._selectionService), this._register(this._selectionService.onRequestScrollLines(((e4) => this.scrollLines(e4.amount, e4.suppressScrollEvent)))), this._register(this._selectionService.onSelectionChange((() => this._onSelectionChange.fire()))), this._register(this._selectionService.onRequestRedraw(((e4) => this._renderService.handleSelectionChanged(e4.start, e4.end, e4.columnSelectMode)))), this._register(this._selectionService.onLinuxMouseSelection(((e4) => {
              this.textarea.value = e4, this.textarea.focus(), this.textarea.select();
            }))), this._register(O.Event.any(this._onScroll.event, this._inputHandler.onScroll)((() => {
              this._selectionService.refresh(), this._viewport?.queueSync();
            }))), this._register(this._instantiationService.createInstance(a.BufferDecorationRenderer, this.screenElement)), this._register((0, I.addDisposableListener)(this.element, "mousedown", ((e4) => this._selectionService.handleMouseDown(e4)))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(k.AccessibilityManager, this)), this._register(this.optionsService.onSpecificOptionChange("screenReaderMode", ((e4) => this._handleScreenReaderModeOptionChange(e4)))), this.options.overviewRuler.width && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(l.OverviewRulerRenderer, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRuler", ((e4) => {
              !this._overviewRulerRenderer && e4 && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(l.OverviewRulerRenderer, this._viewportElement, this.screenElement)));
            })), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
          }
          _createRenderer() {
            return this._instantiationService.createInstance(c.DomRenderer, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
          }
          bindMouse() {
            const e3 = this, t3 = this.element;
            function i3(t4) {
              const i4 = e3._mouseService.getMouseReportCoords(t4, e3.screenElement);
              if (!i4) return false;
              let s4, r3;
              switch (t4.overrideType || t4.type) {
                case "mousemove":
                  r3 = 32, void 0 === t4.buttons ? (s4 = 3, void 0 !== t4.button && (s4 = t4.button < 3 ? t4.button : 3)) : s4 = 1 & t4.buttons ? 0 : 4 & t4.buttons ? 1 : 2 & t4.buttons ? 2 : 3;
                  break;
                case "mouseup":
                  r3 = 0, s4 = t4.button < 3 ? t4.button : 3;
                  break;
                case "mousedown":
                  r3 = 1, s4 = t4.button < 3 ? t4.button : 3;
                  break;
                case "wheel":
                  if (e3._customWheelEventHandler && false === e3._customWheelEventHandler(t4)) return false;
                  const i5 = t4.deltaY;
                  if (0 === i5) return false;
                  if (0 === e3.coreMouseService.consumeWheelEvent(t4, e3._renderService?.dimensions?.device?.cell?.height, e3._coreBrowserService?.dpr)) return false;
                  r3 = i5 < 0 ? 0 : 1, s4 = 4;
                  break;
                default:
                  return false;
              }
              return !(void 0 === r3 || void 0 === s4 || s4 > 4) && e3.coreMouseService.triggerMouseEvent({ col: i4.col, row: i4.row, x: i4.x, y: i4.y, button: s4, action: r3, ctrl: t4.ctrlKey, alt: t4.altKey, shift: t4.shiftKey });
            }
            const s3 = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, r2 = { mouseup: (e4) => (i3(e4), e4.buttons || (this._document.removeEventListener("mouseup", s3.mouseup), s3.mousedrag && this._document.removeEventListener("mousemove", s3.mousedrag)), this.cancel(e4)), wheel: (e4) => (i3(e4), this.cancel(e4, true)), mousedrag: (e4) => {
              e4.buttons && i3(e4);
            }, mousemove: (e4) => {
              e4.buttons || i3(e4);
            } };
            this._register(this.coreMouseService.onProtocolChange(((e4) => {
              e4 ? ("debug" === this.optionsService.rawOptions.logLevel && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(e4)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), 8 & e4 ? s3.mousemove || (t3.addEventListener("mousemove", r2.mousemove), s3.mousemove = r2.mousemove) : (t3.removeEventListener("mousemove", s3.mousemove), s3.mousemove = null), 16 & e4 ? s3.wheel || (t3.addEventListener("wheel", r2.wheel, { passive: false }), s3.wheel = r2.wheel) : (t3.removeEventListener("wheel", s3.wheel), s3.wheel = null), 2 & e4 ? s3.mouseup || (s3.mouseup = r2.mouseup) : (this._document.removeEventListener("mouseup", s3.mouseup), s3.mouseup = null), 4 & e4 ? s3.mousedrag || (s3.mousedrag = r2.mousedrag) : (this._document.removeEventListener("mousemove", s3.mousedrag), s3.mousedrag = null);
            }))), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this._register((0, I.addDisposableListener)(t3, "mousedown", ((e4) => {
              if (e4.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(e4)) return i3(e4), s3.mouseup && this._document.addEventListener("mouseup", s3.mouseup), s3.mousedrag && this._document.addEventListener("mousemove", s3.mousedrag), this.cancel(e4);
            }))), this._register((0, I.addDisposableListener)(t3, "wheel", ((t4) => {
              if (!s3.wheel) {
                if (this._customWheelEventHandler && false === this._customWheelEventHandler(t4)) return false;
                if (!this.buffer.hasScrollback) {
                  if (0 === t4.deltaY) return false;
                  if (0 === e3.coreMouseService.consumeWheelEvent(t4, e3._renderService?.dimensions?.device?.cell?.height, e3._coreBrowserService?.dpr)) return this.cancel(t4, true);
                  const i4 = E.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (t4.deltaY < 0 ? "A" : "B");
                  return this.coreService.triggerDataEvent(i4, true), this.cancel(t4, true);
                }
              }
            }), { passive: false }));
          }
          refresh(e3, t3) {
            this._renderService?.refreshRows(e3, t3);
          }
          updateCursorStyle(e3) {
            this._selectionService?.shouldColumnSelect(e3) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
          }
          _showCursor() {
            this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
          }
          scrollLines(e3, t3) {
            this._viewport ? this._viewport.scrollLines(e3) : super.scrollLines(e3, t3), this.refresh(0, this.rows - 1);
          }
          scrollPages(e3) {
            this.scrollLines(e3 * (this.rows - 1));
          }
          scrollToTop() {
            this.scrollLines(-this._bufferService.buffer.ydisp);
          }
          scrollToBottom(e3) {
            e3 && this._viewport ? this._viewport.scrollToLine(this.buffer.ybase, true) : this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
          }
          scrollToLine(e3) {
            const t3 = e3 - this._bufferService.buffer.ydisp;
            0 !== t3 && this.scrollLines(t3);
          }
          paste(e3) {
            (0, s2.paste)(e3, this.textarea, this.coreService, this.optionsService);
          }
          attachCustomKeyEventHandler(e3) {
            this._customKeyEventHandler = e3;
          }
          attachCustomWheelEventHandler(e3) {
            this._customWheelEventHandler = e3;
          }
          registerLinkProvider(e3) {
            return this._linkProviderService.registerLinkProvider(e3);
          }
          registerCharacterJoiner(e3) {
            if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
            const t3 = this._characterJoinerService.register(e3);
            return this.refresh(0, this.rows - 1), t3;
          }
          deregisterCharacterJoiner(e3) {
            if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
            this._characterJoinerService.deregister(e3) && this.refresh(0, this.rows - 1);
          }
          get markers() {
            return this.buffer.markers;
          }
          registerMarker(e3) {
            return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e3);
          }
          registerDecoration(e3) {
            return this._decorationService.registerDecoration(e3);
          }
          hasSelection() {
            return !!this._selectionService && this._selectionService.hasSelection;
          }
          select(e3, t3, i3) {
            this._selectionService.setSelection(e3, t3, i3);
          }
          getSelection() {
            return this._selectionService ? this._selectionService.selectionText : "";
          }
          getSelectionPosition() {
            if (this._selectionService && this._selectionService.hasSelection) return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
          }
          clearSelection() {
            this._selectionService?.clearSelection();
          }
          selectAll() {
            this._selectionService?.selectAll();
          }
          selectLines(e3, t3) {
            this._selectionService?.selectLines(e3, t3);
          }
          _keyDown(e3) {
            if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && false === this._customKeyEventHandler(e3)) return false;
            const t3 = this.browser.isMac && this.options.macOptionIsMeta && e3.altKey;
            if (!t3 && !this._compositionHelper.keydown(e3)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(true), false;
            t3 || "Dead" !== e3.key && "AltGraph" !== e3.key || (this._unprocessedDeadKey = true);
            const i3 = (0, D.evaluateKeyboardEvent)(e3, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
            if (this.updateCursorStyle(e3), 3 === i3.type || 2 === i3.type) {
              const t4 = this.rows - 1;
              return this.scrollLines(2 === i3.type ? -t4 : t4), this.cancel(e3, true);
            }
            return 1 === i3.type && this.selectAll(), !!this._isThirdLevelShift(this.browser, e3) || (i3.cancel && this.cancel(e3, true), !i3.key || !!(e3.key && !e3.ctrlKey && !e3.altKey && !e3.metaKey && 1 === e3.key.length && e3.key.charCodeAt(0) >= 65 && e3.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = false, true) : (i3.key !== E.C0.ETX && i3.key !== E.C0.CR || (this.textarea.value = ""), this._onKey.fire({ key: i3.key, domEvent: e3 }), this._showCursor(), this.coreService.triggerDataEvent(i3.key, true), !this.optionsService.rawOptions.screenReaderMode || e3.altKey || e3.ctrlKey ? this.cancel(e3, true) : void (this._keyDownHandled = true))));
          }
          _isThirdLevelShift(e3, t3) {
            const i3 = e3.isMac && !this.options.macOptionIsMeta && t3.altKey && !t3.ctrlKey && !t3.metaKey || e3.isWindows && t3.altKey && t3.ctrlKey && !t3.metaKey || e3.isWindows && t3.getModifierState("AltGraph");
            return "keypress" === t3.type ? i3 : i3 && (!t3.keyCode || t3.keyCode > 47);
          }
          _keyUp(e3) {
            this._keyDownSeen = false, this._customKeyEventHandler && false === this._customKeyEventHandler(e3) || ((function(e4) {
              return 16 === e4.keyCode || 17 === e4.keyCode || 18 === e4.keyCode;
            })(e3) || this.focus(), this.updateCursorStyle(e3), this._keyPressHandled = false);
          }
          _keyPress(e3) {
            let t3;
            if (this._keyPressHandled = false, this._keyDownHandled) return false;
            if (this._customKeyEventHandler && false === this._customKeyEventHandler(e3)) return false;
            if (this.cancel(e3), e3.charCode) t3 = e3.charCode;
            else if (null === e3.which || void 0 === e3.which) t3 = e3.keyCode;
            else {
              if (0 === e3.which || 0 === e3.charCode) return false;
              t3 = e3.which;
            }
            return !(!t3 || (e3.altKey || e3.ctrlKey || e3.metaKey) && !this._isThirdLevelShift(this.browser, e3) || (t3 = String.fromCharCode(t3), this._onKey.fire({ key: t3, domEvent: e3 }), this._showCursor(), this.coreService.triggerDataEvent(t3, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, 0));
          }
          _inputEvent(e3) {
            if (e3.data && "insertText" === e3.inputType && (!e3.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
              if (this._keyPressHandled) return false;
              this._unprocessedDeadKey = false;
              const t3 = e3.data;
              return this.coreService.triggerDataEvent(t3, true), this.cancel(e3), true;
            }
            return false;
          }
          resize(e3, t3) {
            e3 !== this.cols || t3 !== this.rows ? super.resize(e3, t3) : this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
          }
          _afterResize(e3, t3) {
            this._charSizeService?.measure();
          }
          clear() {
            if (0 !== this.buffer.ybase || 0 !== this.buffer.y) {
              this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
              for (let e3 = 1; e3 < this.rows; e3++) this.buffer.lines.push(this.buffer.getBlankLine(w.DEFAULT_ATTR_DATA));
              this._onScroll.fire({ position: this.buffer.ydisp }), this.refresh(0, this.rows - 1);
            }
          }
          reset() {
            this.options.rows = this.rows, this.options.cols = this.cols;
            const e3 = this._customKeyEventHandler;
            this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this._customKeyEventHandler = e3, this.refresh(0, this.rows - 1);
          }
          clearTextureAtlas() {
            this._renderService?.clearTextureAtlas();
          }
          _reportFocus() {
            this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(E.C0.ESC + "[I") : this.coreService.triggerDataEvent(E.C0.ESC + "[O");
          }
          _reportWindowsOptions(e3) {
            if (this._renderService) switch (e3) {
              case T.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
                const e4 = this._renderService.dimensions.css.canvas.width.toFixed(0), t3 = this._renderService.dimensions.css.canvas.height.toFixed(0);
                this.coreService.triggerDataEvent(`${E.C0.ESC}[4;${t3};${e4}t`);
                break;
              case T.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
                const i3 = this._renderService.dimensions.css.cell.width.toFixed(0), s3 = this._renderService.dimensions.css.cell.height.toFixed(0);
                this.coreService.triggerDataEvent(`${E.C0.ESC}[6;${s3};${i3}t`);
            }
          }
          cancel(e3, t3) {
            if (this.options.cancelEvents || t3) return e3.preventDefault(), e3.stopPropagation(), false;
          }
        }
        t2.CoreBrowserTerminal = x;
      }, 8906: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Linkifier = void 0;
        const n = i2(7150), o = i2(6501), a = i2(7098), l = i2(802), h = i2(7093);
        let c = class extends n.Disposable {
          get currentLink() {
            return this._currentLink;
          }
          constructor(e3, t3, i3, s3, r2) {
            super(), this._element = e3, this._mouseService = t3, this._renderService = i3, this._bufferService = s3, this._linkProviderService = r2, this._linkCacheDisposables = [], this._isMouseOut = true, this._wasResized = false, this._activeLine = -1, this._onShowLinkUnderline = this._register(new l.Emitter()), this.onShowLinkUnderline = this._onShowLinkUnderline.event, this._onHideLinkUnderline = this._register(new l.Emitter()), this.onHideLinkUnderline = this._onHideLinkUnderline.event, this._register((0, n.toDisposable)((() => {
              (0, n.dispose)(this._linkCacheDisposables), this._linkCacheDisposables.length = 0, this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
            }))), this._register(this._bufferService.onResize((() => {
              this._clearCurrentLink(), this._wasResized = true;
            }))), this._register((0, h.addDisposableListener)(this._element, "mouseleave", (() => {
              this._isMouseOut = true, this._clearCurrentLink();
            }))), this._register((0, h.addDisposableListener)(this._element, "mousemove", this._handleMouseMove.bind(this))), this._register((0, h.addDisposableListener)(this._element, "mousedown", this._handleMouseDown.bind(this))), this._register((0, h.addDisposableListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
          }
          _handleMouseMove(e3) {
            this._lastMouseEvent = e3;
            const t3 = this._positionFromMouseEvent(e3, this._element, this._mouseService);
            if (!t3) return;
            this._isMouseOut = false;
            const i3 = e3.composedPath();
            for (let e4 = 0; e4 < i3.length; e4++) {
              const t4 = i3[e4];
              if (t4.classList.contains("xterm")) break;
              if (t4.classList.contains("xterm-hover")) return;
            }
            this._lastBufferCell && t3.x === this._lastBufferCell.x && t3.y === this._lastBufferCell.y || (this._handleHover(t3), this._lastBufferCell = t3);
          }
          _handleHover(e3) {
            if (this._activeLine !== e3.y || this._wasResized) return this._clearCurrentLink(), this._askForLink(e3, false), void (this._wasResized = false);
            this._currentLink && this._linkAtPosition(this._currentLink.link, e3) || (this._clearCurrentLink(), this._askForLink(e3, true));
          }
          _askForLink(e3, t3) {
            this._activeProviderReplies && t3 || (this._activeProviderReplies?.forEach(((e4) => {
              e4?.forEach(((e5) => {
                e5.link.dispose && e5.link.dispose();
              }));
            })), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e3.y);
            let i3 = false;
            for (const [s3, r2] of this._linkProviderService.linkProviders.entries()) if (t3) {
              const t4 = this._activeProviderReplies?.get(s3);
              t4 && (i3 = this._checkLinkProviderResult(s3, e3, i3));
            } else r2.provideLinks(e3.y, ((t4) => {
              if (this._isMouseOut) return;
              const r3 = t4?.map(((e4) => ({ link: e4 })));
              this._activeProviderReplies?.set(s3, r3), i3 = this._checkLinkProviderResult(s3, e3, i3), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e3.y, this._activeProviderReplies);
            }));
          }
          _removeIntersectingLinks(e3, t3) {
            const i3 = /* @__PURE__ */ new Set();
            for (let s3 = 0; s3 < t3.size; s3++) {
              const r2 = t3.get(s3);
              if (r2) for (let t4 = 0; t4 < r2.length; t4++) {
                const s4 = r2[t4], n2 = s4.link.range.start.y < e3 ? 0 : s4.link.range.start.x, o2 = s4.link.range.end.y > e3 ? this._bufferService.cols : s4.link.range.end.x;
                for (let e4 = n2; e4 <= o2; e4++) {
                  if (i3.has(e4)) {
                    r2.splice(t4--, 1);
                    break;
                  }
                  i3.add(e4);
                }
              }
            }
          }
          _checkLinkProviderResult(e3, t3, i3) {
            if (!this._activeProviderReplies) return i3;
            const s3 = this._activeProviderReplies.get(e3);
            let r2 = false;
            for (let t4 = 0; t4 < e3; t4++) this._activeProviderReplies.has(t4) && !this._activeProviderReplies.get(t4) || (r2 = true);
            if (!r2 && s3) {
              const e4 = s3.find(((e5) => this._linkAtPosition(e5.link, t3)));
              e4 && (i3 = true, this._handleNewLink(e4));
            }
            if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !i3) for (let e4 = 0; e4 < this._activeProviderReplies.size; e4++) {
              const s4 = this._activeProviderReplies.get(e4)?.find(((e5) => this._linkAtPosition(e5.link, t3)));
              if (s4) {
                i3 = true, this._handleNewLink(s4);
                break;
              }
            }
            return i3;
          }
          _handleMouseDown() {
            this._mouseDownLink = this._currentLink;
          }
          _handleMouseUp(e3) {
            if (!this._currentLink) return;
            const t3 = this._positionFromMouseEvent(e3, this._element, this._mouseService);
            var i3, s3;
            t3 && this._mouseDownLink && (i3 = this._mouseDownLink.link, s3 = this._currentLink.link, i3.text === s3.text && i3.range.start.x === s3.range.start.x && i3.range.start.y === s3.range.start.y && i3.range.end.x === s3.range.end.x && i3.range.end.y === s3.range.end.y) && this._linkAtPosition(this._currentLink.link, t3) && this._currentLink.link.activate(e3, this._currentLink.link.text);
          }
          _clearCurrentLink(e3, t3) {
            this._currentLink && this._lastMouseEvent && (!e3 || !t3 || this._currentLink.link.range.start.y >= e3 && this._currentLink.link.range.end.y <= t3) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, (0, n.dispose)(this._linkCacheDisposables), this._linkCacheDisposables.length = 0);
          }
          _handleNewLink(e3) {
            if (!this._lastMouseEvent) return;
            const t3 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
            t3 && this._linkAtPosition(e3.link, t3) && (this._currentLink = e3, this._currentLink.state = { decorations: { underline: void 0 === e3.link.decorations || e3.link.decorations.underline, pointerCursor: void 0 === e3.link.decorations || e3.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, e3.link, this._lastMouseEvent), e3.link.decorations = {}, Object.defineProperties(e3.link.decorations, { pointerCursor: { get: () => this._currentLink?.state?.decorations.pointerCursor, set: (e4) => {
              this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== e4 && (this._currentLink.state.decorations.pointerCursor = e4, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", e4));
            } }, underline: { get: () => this._currentLink?.state?.decorations.underline, set: (t4) => {
              this._currentLink?.state && this._currentLink?.state?.decorations.underline !== t4 && (this._currentLink.state.decorations.underline = t4, this._currentLink.state.isHovered && this._fireUnderlineEvent(e3.link, t4));
            } } }), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange(((e4) => {
              if (!this._currentLink) return;
              const t4 = 0 === e4.start ? 0 : e4.start + 1 + this._bufferService.buffer.ydisp, i3 = this._bufferService.buffer.ydisp + 1 + e4.end;
              if (this._currentLink.link.range.start.y >= t4 && this._currentLink.link.range.end.y <= i3 && (this._clearCurrentLink(t4, i3), this._lastMouseEvent)) {
                const e5 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
                e5 && this._askForLink(e5, false);
              }
            }))));
          }
          _linkHover(e3, t3, i3) {
            this._currentLink?.state && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t3, true), this._currentLink.state.decorations.pointerCursor && e3.classList.add("xterm-cursor-pointer")), t3.hover && t3.hover(i3, t3.text);
          }
          _fireUnderlineEvent(e3, t3) {
            const i3 = e3.range, s3 = this._bufferService.buffer.ydisp, r2 = this._createLinkUnderlineEvent(i3.start.x - 1, i3.start.y - s3 - 1, i3.end.x, i3.end.y - s3 - 1, void 0);
            (t3 ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(r2);
          }
          _linkLeave(e3, t3, i3) {
            this._currentLink?.state && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t3, false), this._currentLink.state.decorations.pointerCursor && e3.classList.remove("xterm-cursor-pointer")), t3.leave && t3.leave(i3, t3.text);
          }
          _linkAtPosition(e3, t3) {
            const i3 = e3.range.start.y * this._bufferService.cols + e3.range.start.x, s3 = e3.range.end.y * this._bufferService.cols + e3.range.end.x, r2 = t3.y * this._bufferService.cols + t3.x;
            return i3 <= r2 && r2 <= s3;
          }
          _positionFromMouseEvent(e3, t3, i3) {
            const s3 = i3.getCoords(e3, t3, this._bufferService.cols, this._bufferService.rows);
            if (s3) return { x: s3[0], y: s3[1] + this._bufferService.buffer.ydisp };
          }
          _createLinkUnderlineEvent(e3, t3, i3, s3, r2) {
            return { x1: e3, y1: t3, x2: i3, y2: s3, cols: this._bufferService.cols, fg: r2 };
          }
        };
        t2.Linkifier = c, t2.Linkifier = c = s2([r(1, a.IMouseService), r(2, a.IRenderService), r(3, o.IBufferService), r(4, a.ILinkProviderService)], c);
      }, 7721: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.tooMuchOutput = t2.promptLabel = void 0;
        let i2 = "Terminal input";
        const s2 = { get: () => i2, set: (e3) => i2 = e3 };
        t2.promptLabel = s2;
        let r = "Too much output to announce, navigate to rows manually to read";
        const n = { get: () => r, set: (e3) => r = e3 };
        t2.tooMuchOutput = n;
      }, 3285: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.OscLinkProvider = void 0;
        const n = i2(3055), o = i2(6501);
        let a = class {
          constructor(e3, t3, i3) {
            this._bufferService = e3, this._optionsService = t3, this._oscLinkService = i3;
          }
          provideLinks(e3, t3) {
            const i3 = this._bufferService.buffer.lines.get(e3 - 1);
            if (!i3) return void t3(void 0);
            const s3 = [], r2 = this._optionsService.rawOptions.linkHandler, o2 = new n.CellData(), a2 = i3.getTrimmedLength();
            let h = -1, c = -1, d = false;
            for (let t4 = 0; t4 < a2; t4++) if (-1 !== c || i3.hasContent(t4)) {
              if (i3.loadCell(t4, o2), o2.hasExtendedAttrs() && o2.extended.urlId) {
                if (-1 === c) {
                  c = t4, h = o2.extended.urlId;
                  continue;
                }
                d = o2.extended.urlId !== h;
              } else -1 !== c && (d = true);
              if (d || -1 !== c && t4 === a2 - 1) {
                const i4 = this._oscLinkService.getLinkData(h)?.uri;
                if (i4) {
                  const n2 = { start: { x: c + 1, y: e3 }, end: { x: t4 + (d || t4 !== a2 - 1 ? 0 : 1), y: e3 } };
                  let o3 = false;
                  if (!r2?.allowNonHttpProtocols) try {
                    const e4 = new URL(i4);
                    ["http:", "https:"].includes(e4.protocol) || (o3 = true);
                  } catch (e4) {
                    o3 = true;
                  }
                  o3 || s3.push({ text: i4, range: n2, activate: (e4, t5) => r2 ? r2.activate(e4, t5, n2) : l(0, t5), hover: (e4, t5) => r2?.hover?.(e4, t5, n2), leave: (e4, t5) => r2?.leave?.(e4, t5, n2) });
                }
                d = false, o2.hasExtendedAttrs() && o2.extended.urlId ? (c = t4, h = o2.extended.urlId) : (c = -1, h = -1);
              }
            }
            t3(s3);
          }
        };
        function l(e3, t3) {
          if (confirm(`Do you want to navigate to ${t3}?

WARNING: This link could potentially be dangerous`)) {
            const e4 = window.open();
            if (e4) {
              try {
                e4.opener = null;
              } catch {
              }
              e4.location.href = t3;
            } else console.warn("Opening link blocked as opener could not be cleared");
          }
        }
        t2.OscLinkProvider = a, t2.OscLinkProvider = a = s2([r(0, o.IBufferService), r(1, o.IOptionsService), r(2, o.IOscLinkService)], a);
      }, 4852: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.RenderDebouncer = void 0, t2.RenderDebouncer = class {
          constructor(e3, t3) {
            this._renderCallback = e3, this._coreBrowserService = t3, this._refreshCallbacks = [];
          }
          dispose() {
            this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
          }
          addRefreshCallback(e3) {
            return this._refreshCallbacks.push(e3), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._innerRefresh()))), this._animationFrame;
          }
          refresh(e3, t3, i2) {
            this._rowCount = i2, e3 = void 0 !== e3 ? e3 : 0, t3 = void 0 !== t3 ? t3 : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e3) : e3, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t3) : t3, this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._innerRefresh())));
          }
          _innerRefresh() {
            if (this._animationFrame = void 0, void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return void this._runRefreshCallbacks();
            const e3 = Math.max(this._rowStart, 0), t3 = Math.min(this._rowEnd, this._rowCount - 1);
            this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e3, t3), this._runRefreshCallbacks();
          }
          _runRefreshCallbacks() {
            for (const e3 of this._refreshCallbacks) e3(0);
            this._refreshCallbacks = [];
          }
        };
      }, 4292: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.TimeBasedDebouncer = void 0, t2.TimeBasedDebouncer = class {
          constructor(e3, t3 = 1e3) {
            this._renderCallback = e3, this._debounceThresholdMS = t3, this._lastRefreshMs = 0, this._additionalRefreshRequested = false;
          }
          dispose() {
            this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
          }
          refresh(e3, t3, i2) {
            this._rowCount = i2, e3 = void 0 !== e3 ? e3 : 0, t3 = void 0 !== t3 ? t3 : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e3) : e3, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t3) : t3;
            const s2 = performance.now();
            if (s2 - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = s2, this._innerRefresh();
            else if (!this._additionalRefreshRequested) {
              const e4 = s2 - this._lastRefreshMs, t4 = this._debounceThresholdMS - e4;
              this._additionalRefreshRequested = true, this._refreshTimeoutID = window.setTimeout((() => {
                this._lastRefreshMs = performance.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = void 0;
              }), t4);
            }
          }
          _innerRefresh() {
            if (void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return;
            const e3 = Math.max(this._rowStart, 0), t3 = Math.min(this._rowEnd, this._rowCount - 1);
            this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e3, t3);
          }
        };
      }, 9302: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DEFAULT_ANSI_COLORS = void 0;
        const s2 = i2(4103);
        t2.DEFAULT_ANSI_COLORS = Object.freeze((() => {
          const e3 = [s2.css.toColor("#2e3436"), s2.css.toColor("#cc0000"), s2.css.toColor("#4e9a06"), s2.css.toColor("#c4a000"), s2.css.toColor("#3465a4"), s2.css.toColor("#75507b"), s2.css.toColor("#06989a"), s2.css.toColor("#d3d7cf"), s2.css.toColor("#555753"), s2.css.toColor("#ef2929"), s2.css.toColor("#8ae234"), s2.css.toColor("#fce94f"), s2.css.toColor("#729fcf"), s2.css.toColor("#ad7fa8"), s2.css.toColor("#34e2e2"), s2.css.toColor("#eeeeec")], t3 = [0, 95, 135, 175, 215, 255];
          for (let i3 = 0; i3 < 216; i3++) {
            const r = t3[i3 / 36 % 6 | 0], n = t3[i3 / 6 % 6 | 0], o = t3[i3 % 6];
            e3.push({ css: s2.channels.toCss(r, n, o), rgba: s2.channels.toRgba(r, n, o) });
          }
          for (let t4 = 0; t4 < 24; t4++) {
            const i3 = 8 + 10 * t4;
            e3.push({ css: s2.channels.toCss(i3, i3, i3), rgba: s2.channels.toRgba(i3, i3, i3) });
          }
          return e3;
        })());
      }, 4017: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Viewport = void 0;
        const n = i2(7098), o = i2(7150), a = i2(6501), l = i2(7093), h = i2(8234), c = i2(802), d = i2(9881);
        let u = class extends o.Disposable {
          constructor(e3, t3, i3, s3, r2, n2, a2, u2) {
            super(), this._bufferService = i3, this._optionsService = a2, this._renderService = u2, this._onRequestScrollLines = this._register(new c.Emitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this._isSyncing = false, this._isHandlingScroll = false, this._suppressOnScrollHandler = false;
            const _ = this._register(new d.Scrollable({ forceIntegerValues: false, smoothScrollDuration: this._optionsService.rawOptions.smoothScrollDuration, scheduleAtNextAnimationFrame: (e4) => (0, l.scheduleAtNextAnimationFrame)(s3.window, e4) }));
            this._register(this._optionsService.onSpecificOptionChange("smoothScrollDuration", (() => {
              _.setSmoothScrollDuration(this._optionsService.rawOptions.smoothScrollDuration);
            }))), this._scrollableElement = this._register(new h.SmoothScrollableElement(t3, { vertical: 1, horizontal: 2, useShadows: false, mouseWheelSmoothScroll: true, ...this._getChangeOptions() }, _)), this._register(this._optionsService.onMultipleOptionChange(["scrollSensitivity", "fastScrollSensitivity", "overviewRuler"], (() => this._scrollableElement.updateOptions(this._getChangeOptions())))), this._register(r2.onProtocolChange(((e4) => {
              this._scrollableElement.updateOptions({ handleMouseWheel: !(16 & e4) });
            }))), this._scrollableElement.setScrollDimensions({ height: 0, scrollHeight: 0 }), this._register(c.Event.runAndSubscribe(n2.onChangeColors, (() => {
              this._scrollableElement.getDomNode().style.backgroundColor = n2.colors.background.css;
            }))), e3.appendChild(this._scrollableElement.getDomNode()), this._register((0, o.toDisposable)((() => this._scrollableElement.getDomNode().remove()))), this._styleElement = s3.mainDocument.createElement("style"), t3.appendChild(this._styleElement), this._register((0, o.toDisposable)((() => this._styleElement.remove()))), this._register(c.Event.runAndSubscribe(n2.onChangeColors, (() => {
              this._styleElement.textContent = [".xterm .xterm-scrollable-element > .scrollbar > .slider {", `  background: ${n2.colors.scrollbarSliderBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider:hover {", `  background: ${n2.colors.scrollbarSliderHoverBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider.active {", `  background: ${n2.colors.scrollbarSliderActiveBackground.css};`, "}"].join("\n");
            }))), this._register(this._bufferService.onResize((() => this.queueSync()))), this._register(this._bufferService.buffers.onBufferActivate((() => {
              this._latestYDisp = void 0, this.queueSync();
            }))), this._register(this._bufferService.onScroll((() => this._sync()))), this._register(this._scrollableElement.onScroll(((e4) => this._handleScroll(e4))));
          }
          scrollLines(e3) {
            const t3 = this._scrollableElement.getScrollPosition();
            this._scrollableElement.setScrollPosition({ reuseAnimation: true, scrollTop: t3.scrollTop + e3 * this._renderService.dimensions.css.cell.height });
          }
          scrollToLine(e3, t3) {
            t3 && (this._latestYDisp = e3), this._scrollableElement.setScrollPosition({ reuseAnimation: !t3, scrollTop: e3 * this._renderService.dimensions.css.cell.height });
          }
          _getChangeOptions() {
            return { mouseWheelScrollSensitivity: this._optionsService.rawOptions.scrollSensitivity, fastScrollSensitivity: this._optionsService.rawOptions.fastScrollSensitivity, verticalScrollbarSize: this._optionsService.rawOptions.overviewRuler?.width || 14 };
          }
          queueSync(e3) {
            void 0 !== e3 && (this._latestYDisp = e3), void 0 === this._queuedAnimationFrame && (this._queuedAnimationFrame = this._renderService.addRefreshCallback((() => {
              this._queuedAnimationFrame = void 0, this._sync(this._latestYDisp);
            })));
          }
          _sync(e3 = this._bufferService.buffer.ydisp) {
            this._renderService && !this._isSyncing && (this._isSyncing = true, this._suppressOnScrollHandler = true, this._scrollableElement.setScrollDimensions({ height: this._renderService.dimensions.css.canvas.height, scrollHeight: this._renderService.dimensions.css.cell.height * this._bufferService.buffer.lines.length }), this._suppressOnScrollHandler = false, e3 !== this._latestYDisp && this._scrollableElement.setScrollPosition({ scrollTop: e3 * this._renderService.dimensions.css.cell.height }), this._isSyncing = false);
          }
          _handleScroll(e3) {
            if (!this._renderService) return;
            if (this._isHandlingScroll || this._suppressOnScrollHandler) return;
            this._isHandlingScroll = true;
            const t3 = Math.round(e3.scrollTop / this._renderService.dimensions.css.cell.height), i3 = t3 - this._bufferService.buffer.ydisp;
            0 !== i3 && (this._latestYDisp = t3, this._onRequestScrollLines.fire(i3)), this._isHandlingScroll = false;
          }
        };
        t2.Viewport = u, t2.Viewport = u = s2([r(2, a.IBufferService), r(3, n.ICoreBrowserService), r(4, a.ICoreMouseService), r(5, n.IThemeService), r(6, a.IOptionsService), r(7, n.IRenderService)], u);
      }, 4196: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferDecorationRenderer = void 0;
        const n = i2(7098), o = i2(7150), a = i2(6501);
        let l = class extends o.Disposable {
          constructor(e3, t3, i3, s3, r2) {
            super(), this._screenElement = e3, this._bufferService = t3, this._coreBrowserService = i3, this._decorationService = s3, this._renderService = r2, this._decorationElements = /* @__PURE__ */ new Map(), this._altBufferIsActive = false, this._dimensionsChanged = false, this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this._register(this._renderService.onRenderedViewportChange((() => this._doRefreshDecorations()))), this._register(this._renderService.onDimensionsChange((() => {
              this._dimensionsChanged = true, this._queueRefresh();
            }))), this._register(this._coreBrowserService.onDprChange((() => this._queueRefresh()))), this._register(this._bufferService.buffers.onBufferActivate((() => {
              this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
            }))), this._register(this._decorationService.onDecorationRegistered((() => this._queueRefresh()))), this._register(this._decorationService.onDecorationRemoved(((e4) => this._removeDecoration(e4)))), this._register((0, o.toDisposable)((() => {
              this._container.remove(), this._decorationElements.clear();
            })));
          }
          _queueRefresh() {
            void 0 === this._animationFrame && (this._animationFrame = this._renderService.addRefreshCallback((() => {
              this._doRefreshDecorations(), this._animationFrame = void 0;
            })));
          }
          _doRefreshDecorations() {
            for (const e3 of this._decorationService.decorations) this._renderDecoration(e3);
            this._dimensionsChanged = false;
          }
          _renderDecoration(e3) {
            this._refreshStyle(e3), this._dimensionsChanged && this._refreshXPosition(e3);
          }
          _createElement(e3) {
            const t3 = this._coreBrowserService.mainDocument.createElement("div");
            t3.classList.add("xterm-decoration"), t3.classList.toggle("xterm-decoration-top-layer", "top" === e3?.options?.layer), t3.style.width = `${Math.round((e3.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, t3.style.height = (e3.options.height || 1) * this._renderService.dimensions.css.cell.height + "px", t3.style.top = (e3.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height + "px", t3.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
            const i3 = e3.options.x ?? 0;
            return i3 && i3 > this._bufferService.cols && (t3.style.display = "none"), this._refreshXPosition(e3, t3), t3;
          }
          _refreshStyle(e3) {
            const t3 = e3.marker.line - this._bufferService.buffers.active.ydisp;
            if (t3 < 0 || t3 >= this._bufferService.rows) e3.element && (e3.element.style.display = "none", e3.onRenderEmitter.fire(e3.element));
            else {
              let i3 = this._decorationElements.get(e3);
              i3 || (i3 = this._createElement(e3), e3.element = i3, this._decorationElements.set(e3, i3), this._container.appendChild(i3), e3.onDispose((() => {
                this._decorationElements.delete(e3), i3.remove();
              }))), i3.style.display = this._altBufferIsActive ? "none" : "block", this._altBufferIsActive || (i3.style.width = `${Math.round((e3.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, i3.style.height = (e3.options.height || 1) * this._renderService.dimensions.css.cell.height + "px", i3.style.top = t3 * this._renderService.dimensions.css.cell.height + "px", i3.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`), e3.onRenderEmitter.fire(i3);
            }
          }
          _refreshXPosition(e3, t3 = e3.element) {
            if (!t3) return;
            const i3 = e3.options.x ?? 0;
            "right" === (e3.options.anchor || "left") ? t3.style.right = i3 ? i3 * this._renderService.dimensions.css.cell.width + "px" : "" : t3.style.left = i3 ? i3 * this._renderService.dimensions.css.cell.width + "px" : "";
          }
          _removeDecoration(e3) {
            this._decorationElements.get(e3)?.remove(), this._decorationElements.delete(e3), e3.dispose();
          }
        };
        t2.BufferDecorationRenderer = l, t2.BufferDecorationRenderer = l = s2([r(1, a.IBufferService), r(2, n.ICoreBrowserService), r(3, a.IDecorationService), r(4, n.IRenderService)], l);
      }, 957: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ColorZoneStore = void 0, t2.ColorZoneStore = class {
          constructor() {
            this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
          }
          get zones() {
            return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
          }
          clear() {
            this._zones.length = 0, this._zonePoolIndex = 0;
          }
          addDecoration(e3) {
            if (e3.options.overviewRulerOptions) {
              for (const t3 of this._zones) if (t3.color === e3.options.overviewRulerOptions.color && t3.position === e3.options.overviewRulerOptions.position) {
                if (this._lineIntersectsZone(t3, e3.marker.line)) return;
                if (this._lineAdjacentToZone(t3, e3.marker.line, e3.options.overviewRulerOptions.position)) return void this._addLineToZone(t3, e3.marker.line);
              }
              if (this._zonePoolIndex < this._zonePool.length) return this._zonePool[this._zonePoolIndex].color = e3.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = e3.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = e3.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = e3.marker.line, void this._zones.push(this._zonePool[this._zonePoolIndex++]);
              this._zones.push({ color: e3.options.overviewRulerOptions.color, position: e3.options.overviewRulerOptions.position, startBufferLine: e3.marker.line, endBufferLine: e3.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
            }
          }
          setPadding(e3) {
            this._linePadding = e3;
          }
          _lineIntersectsZone(e3, t3) {
            return t3 >= e3.startBufferLine && t3 <= e3.endBufferLine;
          }
          _lineAdjacentToZone(e3, t3, i2) {
            return t3 >= e3.startBufferLine - this._linePadding[i2 || "full"] && t3 <= e3.endBufferLine + this._linePadding[i2 || "full"];
          }
          _addLineToZone(e3, t3) {
            e3.startBufferLine = Math.min(e3.startBufferLine, t3), e3.endBufferLine = Math.max(e3.endBufferLine, t3);
          }
        };
      }, 9925: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.OverviewRulerRenderer = void 0;
        const n = i2(957), o = i2(7098), a = i2(7150), l = i2(6501), h = { full: 0, left: 0, center: 0, right: 0 }, c = { full: 0, left: 0, center: 0, right: 0 }, d = { full: 0, left: 0, center: 0, right: 0 };
        let u = class extends a.Disposable {
          get _width() {
            return this._optionsService.options.overviewRuler?.width || 0;
          }
          constructor(e3, t3, i3, s3, r2, o2, l2, h2) {
            super(), this._viewportElement = e3, this._screenElement = t3, this._bufferService = i3, this._decorationService = s3, this._renderService = r2, this._optionsService = o2, this._themeService = l2, this._coreBrowserService = h2, this._colorZoneStore = new n.ColorZoneStore(), this._shouldUpdateDimensions = true, this._shouldUpdateAnchor = true, this._lastKnownBufferLength = 0, this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement), this._register((0, a.toDisposable)((() => this._canvas?.remove())));
            const c2 = this._canvas.getContext("2d");
            if (!c2) throw new Error("Ctx cannot be null");
            this._ctx = c2, this._register(this._decorationService.onDecorationRegistered((() => this._queueRefresh(void 0, true)))), this._register(this._decorationService.onDecorationRemoved((() => this._queueRefresh(void 0, true)))), this._register(this._renderService.onRenderedViewportChange((() => this._queueRefresh()))), this._register(this._bufferService.buffers.onBufferActivate((() => {
              this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
            }))), this._register(this._bufferService.onScroll((() => {
              this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
            }))), this._register(this._renderService.onRender((() => {
              this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
            }))), this._register(this._coreBrowserService.onDprChange((() => this._queueRefresh(true)))), this._register(this._optionsService.onSpecificOptionChange("overviewRuler", (() => this._queueRefresh(true)))), this._register(this._themeService.onChangeColors((() => this._queueRefresh()))), this._queueRefresh(true);
          }
          _refreshDrawConstants() {
            const e3 = Math.floor((this._canvas.width - 1) / 3), t3 = Math.ceil((this._canvas.width - 1) / 3);
            c.full = this._canvas.width, c.left = e3, c.center = t3, c.right = e3, this._refreshDrawHeightConstants(), d.full = 1, d.left = 1, d.center = 1 + c.left, d.right = 1 + c.left + c.center;
          }
          _refreshDrawHeightConstants() {
            h.full = Math.round(2 * this._coreBrowserService.dpr);
            const e3 = this._canvas.height / this._bufferService.buffer.lines.length, t3 = Math.round(Math.max(Math.min(e3, 12), 6) * this._coreBrowserService.dpr);
            h.left = t3, h.center = t3, h.right = t3;
          }
          _refreshColorZonePadding() {
            this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * h.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * h.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * h.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * h.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
          }
          _refreshCanvasDimensions() {
            this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
          }
          _refreshDecorations() {
            this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
            for (const e4 of this._decorationService.decorations) this._colorZoneStore.addDecoration(e4);
            this._ctx.lineWidth = 1, this._renderRulerOutline();
            const e3 = this._colorZoneStore.zones;
            for (const t3 of e3) "full" !== t3.position && this._renderColorZone(t3);
            for (const t3 of e3) "full" === t3.position && this._renderColorZone(t3);
            this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
          }
          _renderRulerOutline() {
            this._ctx.fillStyle = this._themeService.colors.overviewRulerBorder.css, this._ctx.fillRect(0, 0, 1, this._canvas.height), this._optionsService.rawOptions.overviewRuler.showTopBorder && this._ctx.fillRect(1, 0, this._canvas.width - 1, 1), this._optionsService.rawOptions.overviewRuler.showBottomBorder && this._ctx.fillRect(1, this._canvas.height - 1, this._canvas.width - 1, this._canvas.height);
          }
          _renderColorZone(e3) {
            this._ctx.fillStyle = e3.color, this._ctx.fillRect(d[e3.position || "full"], Math.round((this._canvas.height - 1) * (e3.startBufferLine / this._bufferService.buffers.active.lines.length) - h[e3.position || "full"] / 2), c[e3.position || "full"], Math.round((this._canvas.height - 1) * ((e3.endBufferLine - e3.startBufferLine) / this._bufferService.buffers.active.lines.length) + h[e3.position || "full"]));
          }
          _queueRefresh(e3, t3) {
            this._shouldUpdateDimensions = e3 || this._shouldUpdateDimensions, this._shouldUpdateAnchor = t3 || this._shouldUpdateAnchor, void 0 === this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((() => {
              this._refreshDecorations(), this._animationFrame = void 0;
            })));
          }
        };
        t2.OverviewRulerRenderer = u, t2.OverviewRulerRenderer = u = s2([r(2, l.IBufferService), r(3, l.IDecorationService), r(4, o.IRenderService), r(5, l.IOptionsService), r(6, o.IThemeService), r(7, o.ICoreBrowserService)], u);
      }, 3618: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CompositionHelper = void 0;
        const n = i2(7098), o = i2(6501), a = i2(3534);
        let l = class {
          get isComposing() {
            return this._isComposing;
          }
          constructor(e3, t3, i3, s3, r2, n2) {
            this._textarea = e3, this._compositionView = t3, this._bufferService = i3, this._optionsService = s3, this._coreService = r2, this._renderService = n2, this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
          }
          compositionstart() {
            this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
          }
          compositionupdate(e3) {
            this._compositionView.textContent = e3.data, this.updateCompositionElements(), setTimeout((() => {
              this._compositionPosition.end = this._textarea.value.length;
            }), 0);
          }
          compositionend() {
            this._finalizeComposition(true);
          }
          keydown(e3) {
            if (this._isComposing || this._isSendingComposition) {
              if (20 === e3.keyCode || 229 === e3.keyCode) return false;
              if (16 === e3.keyCode || 17 === e3.keyCode || 18 === e3.keyCode) return false;
              this._finalizeComposition(false);
            }
            return 229 !== e3.keyCode || (this._handleAnyTextareaChanges(), false);
          }
          _finalizeComposition(e3) {
            if (this._compositionView.classList.remove("active"), this._isComposing = false, e3) {
              const e4 = { start: this._compositionPosition.start, end: this._compositionPosition.end };
              this._isSendingComposition = true, setTimeout((() => {
                if (this._isSendingComposition) {
                  let t3;
                  this._isSendingComposition = false, e4.start += this._dataAlreadySent.length, t3 = this._isComposing ? this._textarea.value.substring(e4.start, this._compositionPosition.start) : this._textarea.value.substring(e4.start), t3.length > 0 && this._coreService.triggerDataEvent(t3, true);
                }
              }), 0);
            } else {
              this._isSendingComposition = false;
              const e4 = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
              this._coreService.triggerDataEvent(e4, true);
            }
          }
          _handleAnyTextareaChanges() {
            const e3 = this._textarea.value;
            setTimeout((() => {
              if (!this._isComposing) {
                const t3 = this._textarea.value, i3 = t3.replace(e3, "");
                this._dataAlreadySent = i3, t3.length > e3.length ? this._coreService.triggerDataEvent(i3, true) : t3.length < e3.length ? this._coreService.triggerDataEvent(`${a.C0.DEL}`, true) : t3.length === e3.length && t3 !== e3 && this._coreService.triggerDataEvent(t3, true);
              }
            }), 0);
          }
          updateCompositionElements(e3) {
            if (this._isComposing) {
              if (this._bufferService.buffer.isCursorInViewport) {
                const e4 = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), t3 = this._renderService.dimensions.css.cell.height, i3 = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, s3 = e4 * this._renderService.dimensions.css.cell.width;
                this._compositionView.style.left = s3 + "px", this._compositionView.style.top = i3 + "px", this._compositionView.style.height = t3 + "px", this._compositionView.style.lineHeight = t3 + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
                const r2 = this._compositionView.getBoundingClientRect();
                this._textarea.style.left = s3 + "px", this._textarea.style.top = i3 + "px", this._textarea.style.width = Math.max(r2.width, 1) + "px", this._textarea.style.height = Math.max(r2.height, 1) + "px", this._textarea.style.lineHeight = r2.height + "px";
              }
              e3 || setTimeout((() => this.updateCompositionElements(true)), 0);
            }
          }
        };
        t2.CompositionHelper = l, t2.CompositionHelper = l = s2([r(2, o.IBufferService), r(3, o.IOptionsService), r(4, o.ICoreService), r(5, n.IRenderService)], l);
      }, 5251: (e2, t2) => {
        function i2(e3, t3, i3) {
          const s2 = i3.getBoundingClientRect(), r = e3.getComputedStyle(i3), n = parseInt(r.getPropertyValue("padding-left")), o = parseInt(r.getPropertyValue("padding-top"));
          return [t3.clientX - s2.left - n, t3.clientY - s2.top - o];
        }
        Object.defineProperty(t2, "__esModule", { value: true }), t2.getCoordsRelativeToElement = i2, t2.getCoords = function(e3, t3, s2, r, n, o, a, l, h) {
          if (!o) return;
          const c = i2(e3, t3, s2);
          return c ? (c[0] = Math.ceil((c[0] + (h ? a / 2 : 0)) / a), c[1] = Math.ceil(c[1] / l), c[0] = Math.min(Math.max(c[0], 1), r + (h ? 1 : 0)), c[1] = Math.min(Math.max(c[1], 1), n), c) : void 0;
        };
      }, 9686: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.moveToCellSequence = function(e3, t3, i3, s3) {
          const o2 = i3.buffer.x, c = i3.buffer.y;
          if (!i3.buffer.hasScrollback) return (function(e4, t4, i4, s4, o3, c2) {
            return 0 === r(t4, s4, o3, c2).length ? "" : h(a(e4, t4, e4, t4 - n(t4, o3), false, o3).length, l("D", c2));
          })(o2, c, 0, t3, i3, s3) + r(c, t3, i3, s3) + (function(e4, t4, i4, s4, o3, c2) {
            let d2;
            d2 = r(t4, s4, o3, c2).length > 0 ? s4 - n(s4, o3) : t4;
            const u2 = s4, _ = (function(e5, t5, i5, s5, o4, a2) {
              let l2;
              return l2 = r(i5, s5, o4, a2).length > 0 ? s5 - n(s5, o4) : t5, e5 < i5 && l2 <= s5 || e5 >= i5 && l2 < s5 ? "C" : "D";
            })(e4, t4, i4, s4, o3, c2);
            return h(a(e4, d2, i4, u2, "C" === _, o3).length, l(_, c2));
          })(o2, c, e3, t3, i3, s3);
          let d;
          if (c === t3) return d = o2 > e3 ? "D" : "C", h(Math.abs(o2 - e3), l(d, s3));
          d = c > t3 ? "D" : "C";
          const u = Math.abs(c - t3);
          return h((function(e4, t4) {
            return t4.cols - e4;
          })(c > t3 ? e3 : o2, i3) + (u - 1) * i3.cols + 1 + ((c > t3 ? o2 : e3) - 1), l(d, s3));
        };
        const s2 = i2(3534);
        function r(e3, t3, i3, s3) {
          const r2 = e3 - n(e3, i3), a2 = t3 - n(t3, i3), c = Math.abs(r2 - a2) - (function(e4, t4, i4) {
            let s4 = 0;
            const r3 = e4 - n(e4, i4), a3 = t4 - n(t4, i4);
            for (let n2 = 0; n2 < Math.abs(r3 - a3); n2++) {
              const a4 = "A" === o(e4, t4) ? -1 : 1, l2 = i4.buffer.lines.get(r3 + a4 * n2);
              l2?.isWrapped && s4++;
            }
            return s4;
          })(e3, t3, i3);
          return h(c, l(o(e3, t3), s3));
        }
        function n(e3, t3) {
          let i3 = 0, s3 = t3.buffer.lines.get(e3), r2 = s3?.isWrapped;
          for (; r2 && e3 >= 0 && e3 < t3.rows; ) i3++, s3 = t3.buffer.lines.get(--e3), r2 = s3?.isWrapped;
          return i3;
        }
        function o(e3, t3) {
          return e3 > t3 ? "A" : "B";
        }
        function a(e3, t3, i3, s3, r2, n2) {
          let o2 = e3, a2 = t3, l2 = "";
          for (; (o2 !== i3 || a2 !== s3) && a2 >= 0 && a2 < n2.buffer.lines.length; ) o2 += r2 ? 1 : -1, r2 && o2 > n2.cols - 1 ? (l2 += n2.buffer.translateBufferLineToString(a2, false, e3, o2), o2 = 0, e3 = 0, a2++) : !r2 && o2 < 0 && (l2 += n2.buffer.translateBufferLineToString(a2, false, 0, e3 + 1), o2 = n2.cols - 1, e3 = o2, a2--);
          return l2 + n2.buffer.translateBufferLineToString(a2, false, e3, o2);
        }
        function l(e3, t3) {
          const i3 = t3 ? "O" : "[";
          return s2.C0.ESC + i3 + e3;
        }
        function h(e3, t3) {
          e3 = Math.floor(e3);
          let i3 = "";
          for (let s3 = 0; s3 < e3; s3++) i3 += t3;
          return i3;
        }
      }, 3955: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DomRenderer = void 0;
        const n = i2(1433), o = i2(2744), a = i2(9176), l = i2(6181), h = i2(2274), c = i2(7098), d = i2(4103), u = i2(7150), _ = i2(6501), f = i2(802), p = "xterm-dom-renderer-owner-", g = "xterm-rows", m = "xterm-fg-", v = "xterm-bg-", S = "xterm-focus", b = "xterm-selection";
        let C = 1, y = class extends u.Disposable {
          constructor(e3, t3, i3, s3, r2, a2, c2, d2, _2, m2, v2, S2, y2, w) {
            super(), this._terminal = e3, this._document = t3, this._element = i3, this._screenElement = s3, this._viewportElement = r2, this._helperContainer = a2, this._linkifier2 = c2, this._charSizeService = _2, this._optionsService = m2, this._bufferService = v2, this._coreService = S2, this._coreBrowserService = y2, this._themeService = w, this._terminalClass = C++, this._rowElements = [], this._selectionRenderModel = (0, h.createSelectionRenderModel)(), this.onRequestRedraw = this._register(new f.Emitter()).event, this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(g), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(b), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = (0, l.createRenderDimensions)(), this._updateDimensions(), this._register(this._optionsService.onOptionChange((() => this._handleOptionsChanged()))), this._register(this._themeService.onChangeColors(((e4) => this._injectCss(e4)))), this._injectCss(this._themeService.colors), this._rowFactory = d2.createInstance(n.DomRendererRowFactory, document), this._element.classList.add(p + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this._register(this._linkifier2.onShowLinkUnderline(((e4) => this._handleLinkHover(e4)))), this._register(this._linkifier2.onHideLinkUnderline(((e4) => this._handleLinkLeave(e4)))), this._register((0, u.toDisposable)((() => {
              this._element.classList.remove(p + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
            }))), this._widthCache = new o.WidthCache(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
          }
          _updateDimensions() {
            const e3 = this._coreBrowserService.dpr;
            this.dimensions.device.char.width = this._charSizeService.width * e3, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e3), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e3), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e3), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
            for (const e4 of this._rowElements) e4.style.width = `${this.dimensions.css.canvas.width}px`, e4.style.height = `${this.dimensions.css.cell.height}px`, e4.style.lineHeight = `${this.dimensions.css.cell.height}px`, e4.style.overflow = "hidden";
            this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
            const t3 = `${this._terminalSelector} .${g} span { display: inline-block; height: 100%; vertical-align: top;}`;
            this._dimensionsStyleElement.textContent = t3, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
          }
          _injectCss(e3) {
            this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
            let t3 = `${this._terminalSelector} .${g} { pointer-events: none; color: ${e3.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
            t3 += `${this._terminalSelector} .${g} .xterm-dim { color: ${d.color.multiplyOpacity(e3.foreground, 0.5).css};}`, t3 += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
            const i3 = `blink_underline_${this._terminalClass}`, s3 = `blink_bar_${this._terminalClass}`, r2 = `blink_block_${this._terminalClass}`;
            t3 += `@keyframes ${i3} { 50% {  border-bottom-style: hidden; }}`, t3 += `@keyframes ${s3} { 50% {  box-shadow: none; }}`, t3 += `@keyframes ${r2} { 0% {  background-color: ${e3.cursor.css};  color: ${e3.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e3.cursor.css}; }}`, t3 += `${this._terminalSelector} .${g}.${S} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${i3} 1s step-end infinite;}${this._terminalSelector} .${g}.${S} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${s3} 1s step-end infinite;}${this._terminalSelector} .${g}.${S} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${r2} 1s step-end infinite;}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-block { background-color: ${e3.cursor.css}; color: ${e3.cursorAccent.css};}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e3.cursor.css} !important; color: ${e3.cursorAccent.css} !important;}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e3.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e3.cursor.css} inset;}${this._terminalSelector} .${g} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e3.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, t3 += `${this._terminalSelector} .${b} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${b} div { position: absolute; background-color: ${e3.selectionBackgroundOpaque.css};}${this._terminalSelector} .${b} div { position: absolute; background-color: ${e3.selectionInactiveBackgroundOpaque.css};}`;
            for (const [i4, s4] of e3.ansi.entries()) t3 += `${this._terminalSelector} .${m}${i4} { color: ${s4.css}; }${this._terminalSelector} .${m}${i4}.xterm-dim { color: ${d.color.multiplyOpacity(s4, 0.5).css}; }${this._terminalSelector} .${v}${i4} { background-color: ${s4.css}; }`;
            t3 += `${this._terminalSelector} .${m}${a.INVERTED_DEFAULT_COLOR} { color: ${d.color.opaque(e3.background).css}; }${this._terminalSelector} .${m}${a.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${d.color.multiplyOpacity(d.color.opaque(e3.background), 0.5).css}; }${this._terminalSelector} .${v}${a.INVERTED_DEFAULT_COLOR} { background-color: ${e3.foreground.css}; }`, this._themeStyleElement.textContent = t3;
          }
          _setDefaultSpacing() {
            const e3 = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
            this._rowContainer.style.letterSpacing = `${e3}px`, this._rowFactory.defaultSpacing = e3;
          }
          handleDevicePixelRatioChange() {
            this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
          }
          _refreshRowElements(e3, t3) {
            for (let e4 = this._rowElements.length; e4 <= t3; e4++) {
              const e5 = this._document.createElement("div");
              this._rowContainer.appendChild(e5), this._rowElements.push(e5);
            }
            for (; this._rowElements.length > t3; ) this._rowContainer.removeChild(this._rowElements.pop());
          }
          handleResize(e3, t3) {
            this._refreshRowElements(e3, t3), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
          }
          handleCharSizeChanged() {
            this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
          }
          handleBlur() {
            this._rowContainer.classList.remove(S), this.renderRows(0, this._bufferService.rows - 1);
          }
          handleFocus() {
            this._rowContainer.classList.add(S), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
          }
          handleSelectionChanged(e3, t3, i3) {
            if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e3, t3, i3), this.renderRows(0, this._bufferService.rows - 1), !e3 || !t3) return;
            if (this._selectionRenderModel.update(this._terminal, e3, t3, i3), !this._selectionRenderModel.hasSelection) return;
            const s3 = this._selectionRenderModel.viewportStartRow, r2 = this._selectionRenderModel.viewportEndRow, n2 = this._selectionRenderModel.viewportCappedStartRow, o2 = this._selectionRenderModel.viewportCappedEndRow, a2 = this._document.createDocumentFragment();
            if (i3) {
              const i4 = e3[0] > t3[0];
              a2.appendChild(this._createSelectionElement(n2, i4 ? t3[0] : e3[0], i4 ? e3[0] : t3[0], o2 - n2 + 1));
            } else {
              const i4 = s3 === n2 ? e3[0] : 0, l2 = n2 === r2 ? t3[0] : this._bufferService.cols;
              a2.appendChild(this._createSelectionElement(n2, i4, l2));
              const h2 = o2 - n2 - 1;
              if (a2.appendChild(this._createSelectionElement(n2 + 1, 0, this._bufferService.cols, h2)), n2 !== o2) {
                const e4 = r2 === o2 ? t3[0] : this._bufferService.cols;
                a2.appendChild(this._createSelectionElement(o2, 0, e4));
              }
            }
            this._selectionContainer.appendChild(a2);
          }
          _createSelectionElement(e3, t3, i3, s3 = 1) {
            const r2 = this._document.createElement("div"), n2 = t3 * this.dimensions.css.cell.width;
            let o2 = this.dimensions.css.cell.width * (i3 - t3);
            return n2 + o2 > this.dimensions.css.canvas.width && (o2 = this.dimensions.css.canvas.width - n2), r2.style.height = s3 * this.dimensions.css.cell.height + "px", r2.style.top = e3 * this.dimensions.css.cell.height + "px", r2.style.left = `${n2}px`, r2.style.width = `${o2}px`, r2;
          }
          handleCursorMove() {
          }
          _handleOptionsChanged() {
            this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
          }
          clear() {
            for (const e3 of this._rowElements) e3.replaceChildren();
          }
          renderRows(e3, t3) {
            const i3 = this._bufferService.buffer, s3 = i3.ybase + i3.y, r2 = Math.min(i3.x, this._bufferService.cols - 1), n2 = this._coreService.decPrivateModes.cursorBlink ?? this._optionsService.rawOptions.cursorBlink, o2 = this._coreService.decPrivateModes.cursorStyle ?? this._optionsService.rawOptions.cursorStyle, a2 = this._optionsService.rawOptions.cursorInactiveStyle;
            for (let l2 = e3; l2 <= t3; l2++) {
              const e4 = l2 + i3.ydisp, t4 = this._rowElements[l2], h2 = i3.lines.get(e4);
              if (!t4 || !h2) break;
              t4.replaceChildren(...this._rowFactory.createRow(h2, e4, e4 === s3, o2, a2, r2, n2, this.dimensions.css.cell.width, this._widthCache, -1, -1));
            }
          }
          get _terminalSelector() {
            return `.${p}${this._terminalClass}`;
          }
          _handleLinkHover(e3) {
            this._setCellUnderline(e3.x1, e3.x2, e3.y1, e3.y2, e3.cols, true);
          }
          _handleLinkLeave(e3) {
            this._setCellUnderline(e3.x1, e3.x2, e3.y1, e3.y2, e3.cols, false);
          }
          _setCellUnderline(e3, t3, i3, s3, r2, n2) {
            i3 < 0 && (e3 = 0), s3 < 0 && (t3 = 0);
            const o2 = this._bufferService.rows - 1;
            i3 = Math.max(Math.min(i3, o2), 0), s3 = Math.max(Math.min(s3, o2), 0), r2 = Math.min(r2, this._bufferService.cols);
            const a2 = this._bufferService.buffer, l2 = a2.ybase + a2.y, h2 = Math.min(a2.x, r2 - 1), c2 = this._optionsService.rawOptions.cursorBlink, d2 = this._optionsService.rawOptions.cursorStyle, u2 = this._optionsService.rawOptions.cursorInactiveStyle;
            for (let o3 = i3; o3 <= s3; ++o3) {
              const _2 = o3 + a2.ydisp, f2 = this._rowElements[o3], p2 = a2.lines.get(_2);
              if (!f2 || !p2) break;
              f2.replaceChildren(...this._rowFactory.createRow(p2, _2, _2 === l2, d2, u2, h2, c2, this.dimensions.css.cell.width, this._widthCache, n2 ? o3 === i3 ? e3 : 0 : -1, n2 ? (o3 === s3 ? t3 : r2) - 1 : -1));
            }
          }
        };
        t2.DomRenderer = y, t2.DomRenderer = y = s2([r(7, _.IInstantiationService), r(8, c.ICharSizeService), r(9, _.IOptionsService), r(10, _.IBufferService), r(11, _.ICoreService), r(12, c.ICoreBrowserService), r(13, c.IThemeService)], y);
      }, 1433: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DomRendererRowFactory = void 0;
        const n = i2(9176), o = i2(8938), a = i2(3055), l = i2(6501), h = i2(4103), c = i2(7098), d = i2(945), u = i2(6181), _ = i2(5451);
        let f = class {
          constructor(e3, t3, i3, s3, r2, n2, o2) {
            this._document = e3, this._characterJoinerService = t3, this._optionsService = i3, this._coreBrowserService = s3, this._coreService = r2, this._decorationService = n2, this._themeService = o2, this._workCell = new a.CellData(), this._columnSelectMode = false, this.defaultSpacing = 0;
          }
          handleSelectionChanged(e3, t3, i3) {
            this._selectionStart = e3, this._selectionEnd = t3, this._columnSelectMode = i3;
          }
          createRow(e3, t3, i3, s3, r2, a2, l2, c2, u2, f2, g) {
            const m = [], v = this._characterJoinerService.getJoinedCharacters(t3), S = this._themeService.colors;
            let b, C = e3.getNoBgTrimmedLength();
            i3 && C < a2 + 1 && (C = a2 + 1);
            let y = 0, w = "", E = 0, D = 0, L = 0, R = 0, A = false, T = 0, k = false, M = 0, O = 0;
            const I = [], P = -1 !== f2 && -1 !== g;
            for (let x = 0; x < C; x++) {
              e3.loadCell(x, this._workCell);
              let C2 = this._workCell.getWidth();
              if (0 === C2) continue;
              let B = false, N = x >= O, U = x, F = this._workCell;
              if (v.length > 0 && x === v[0][0] && N) {
                const s4 = v.shift(), r3 = this._isCellInSelection(s4[0], t3);
                for (E = s4[0] + 1; E < s4[1]; E++) N &&= r3 === this._isCellInSelection(E, t3);
                N &&= !i3 || a2 < s4[0] || a2 >= s4[1], N ? (B = true, F = new d.JoinedCellData(this._workCell, e3.translateToString(true, s4[0], s4[1]), s4[1] - s4[0]), U = s4[1] - 1, C2 = F.getWidth()) : O = s4[1];
              }
              const W = this._isCellInSelection(x, t3), H = i3 && x === a2, K = P && x >= f2 && x <= g;
              let z = false;
              this._decorationService.forEachDecorationAtCell(x, t3, void 0, ((e4) => {
                z = true;
              }));
              let j = F.getChars() || o.WHITESPACE_CELL_CHAR;
              if (" " === j && (F.isUnderline() || F.isOverline()) && (j = "\xA0"), M = C2 * c2 - u2.get(j, F.isBold(), F.isItalic()), b) {
                if (y && (W && k || !W && !k && F.bg === D) && (W && k && S.selectionForeground || F.fg === L) && F.extended.ext === R && K === A && M === T && !H && !B && !z && N) {
                  F.isInvisible() ? w += o.WHITESPACE_CELL_CHAR : w += j, y++;
                  continue;
                }
                y && (b.textContent = w), b = this._document.createElement("span"), y = 0, w = "";
              } else b = this._document.createElement("span");
              if (D = F.bg, L = F.fg, R = F.extended.ext, A = K, T = M, k = W, B && a2 >= x && a2 <= U && (a2 = x), !this._coreService.isCursorHidden && H && this._coreService.isCursorInitialized) {
                if (I.push("xterm-cursor"), this._coreBrowserService.isFocused) l2 && I.push("xterm-cursor-blink"), I.push("bar" === s3 ? "xterm-cursor-bar" : "underline" === s3 ? "xterm-cursor-underline" : "xterm-cursor-block");
                else if (r2) switch (r2) {
                  case "outline":
                    I.push("xterm-cursor-outline");
                    break;
                  case "block":
                    I.push("xterm-cursor-block");
                    break;
                  case "bar":
                    I.push("xterm-cursor-bar");
                    break;
                  case "underline":
                    I.push("xterm-cursor-underline");
                }
              }
              if (F.isBold() && I.push("xterm-bold"), F.isItalic() && I.push("xterm-italic"), F.isDim() && I.push("xterm-dim"), w = F.isInvisible() ? o.WHITESPACE_CELL_CHAR : F.getChars() || o.WHITESPACE_CELL_CHAR, F.isUnderline() && (I.push(`xterm-underline-${F.extended.underlineStyle}`), " " === w && (w = "\xA0"), !F.isUnderlineColorDefault())) if (F.isUnderlineColorRGB()) b.style.textDecorationColor = `rgb(${_.AttributeData.toColorRGB(F.getUnderlineColor()).join(",")})`;
              else {
                let e4 = F.getUnderlineColor();
                this._optionsService.rawOptions.drawBoldTextInBrightColors && F.isBold() && e4 < 8 && (e4 += 8), b.style.textDecorationColor = S.ansi[e4].css;
              }
              F.isOverline() && (I.push("xterm-overline"), " " === w && (w = "\xA0")), F.isStrikethrough() && I.push("xterm-strikethrough"), K && (b.style.textDecoration = "underline");
              let $ = F.getFgColor(), V = F.getFgColorMode(), G = F.getBgColor(), q = F.getBgColorMode();
              const X = !!F.isInverse();
              if (X) {
                const e4 = $;
                $ = G, G = e4;
                const t4 = V;
                V = q, q = t4;
              }
              let Y, Z, J, Q = false;
              switch (this._decorationService.forEachDecorationAtCell(x, t3, void 0, ((e4) => {
                "top" !== e4.options.layer && Q || (e4.backgroundColorRGB && (q = 50331648, G = e4.backgroundColorRGB.rgba >> 8 & 16777215, Y = e4.backgroundColorRGB), e4.foregroundColorRGB && (V = 50331648, $ = e4.foregroundColorRGB.rgba >> 8 & 16777215, Z = e4.foregroundColorRGB), Q = "top" === e4.options.layer);
              })), !Q && W && (Y = this._coreBrowserService.isFocused ? S.selectionBackgroundOpaque : S.selectionInactiveBackgroundOpaque, G = Y.rgba >> 8 & 16777215, q = 50331648, Q = true, S.selectionForeground && (V = 50331648, $ = S.selectionForeground.rgba >> 8 & 16777215, Z = S.selectionForeground)), Q && I.push("xterm-decoration-top"), q) {
                case 16777216:
                case 33554432:
                  J = S.ansi[G], I.push(`xterm-bg-${G}`);
                  break;
                case 50331648:
                  J = h.channels.toColor(G >> 16, G >> 8 & 255, 255 & G), this._addStyle(b, `background-color:#${p((G >>> 0).toString(16), "0", 6)}`);
                  break;
                default:
                  X ? (J = S.foreground, I.push(`xterm-bg-${n.INVERTED_DEFAULT_COLOR}`)) : J = S.background;
              }
              switch (Y || F.isDim() && (Y = h.color.multiplyOpacity(J, 0.5)), V) {
                case 16777216:
                case 33554432:
                  F.isBold() && $ < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && ($ += 8), this._applyMinimumContrast(b, J, S.ansi[$], F, Y, void 0) || I.push(`xterm-fg-${$}`);
                  break;
                case 50331648:
                  const e4 = h.channels.toColor($ >> 16 & 255, $ >> 8 & 255, 255 & $);
                  this._applyMinimumContrast(b, J, e4, F, Y, Z) || this._addStyle(b, `color:#${p($.toString(16), "0", 6)}`);
                  break;
                default:
                  this._applyMinimumContrast(b, J, S.foreground, F, Y, Z) || X && I.push(`xterm-fg-${n.INVERTED_DEFAULT_COLOR}`);
              }
              I.length && (b.className = I.join(" "), I.length = 0), H || B || z || !N ? b.textContent = w : y++, M !== this.defaultSpacing && (b.style.letterSpacing = `${M}px`), m.push(b), x = U;
            }
            return b && y && (b.textContent = w), m;
          }
          _applyMinimumContrast(e3, t3, i3, s3, r2, n2) {
            if (1 === this._optionsService.rawOptions.minimumContrastRatio || (0, u.treatGlyphAsBackgroundColor)(s3.getCode())) return false;
            const o2 = this._getContrastCache(s3);
            let a2;
            if (r2 || n2 || (a2 = o2.getColor(t3.rgba, i3.rgba)), void 0 === a2) {
              const e4 = this._optionsService.rawOptions.minimumContrastRatio / (s3.isDim() ? 2 : 1);
              a2 = h.color.ensureContrastRatio(r2 || t3, n2 || i3, e4), o2.setColor((r2 || t3).rgba, (n2 || i3).rgba, a2 ?? null);
            }
            return !!a2 && (this._addStyle(e3, `color:${a2.css}`), true);
          }
          _getContrastCache(e3) {
            return e3.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
          }
          _addStyle(e3, t3) {
            e3.setAttribute("style", `${e3.getAttribute("style") || ""}${t3};`);
          }
          _isCellInSelection(e3, t3) {
            const i3 = this._selectionStart, s3 = this._selectionEnd;
            return !(!i3 || !s3) && (this._columnSelectMode ? i3[0] <= s3[0] ? e3 >= i3[0] && t3 >= i3[1] && e3 < s3[0] && t3 <= s3[1] : e3 < i3[0] && t3 >= i3[1] && e3 >= s3[0] && t3 <= s3[1] : t3 > i3[1] && t3 < s3[1] || i3[1] === s3[1] && t3 === i3[1] && e3 >= i3[0] && e3 < s3[0] || i3[1] < s3[1] && t3 === s3[1] && e3 < s3[0] || i3[1] < s3[1] && t3 === i3[1] && e3 >= i3[0]);
          }
        };
        function p(e3, t3, i3) {
          for (; e3.length < i3; ) e3 = t3 + e3;
          return e3;
        }
        t2.DomRendererRowFactory = f, t2.DomRendererRowFactory = f = s2([r(1, c.ICharacterJoinerService), r(2, l.IOptionsService), r(3, c.ICoreBrowserService), r(4, l.ICoreService), r(5, l.IDecorationService), r(6, c.IThemeService)], f);
      }, 2744: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.WidthCache = void 0, t2.WidthCache = class {
          constructor(e3, t3) {
            this._flat = new Float32Array(256), this._font = "", this._fontSize = 0, this._weight = "normal", this._weightBold = "bold", this._measureElements = [], this._container = e3.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
            const i2 = e3.createElement("span");
            i2.classList.add("xterm-char-measure-element");
            const s2 = e3.createElement("span");
            s2.classList.add("xterm-char-measure-element"), s2.style.fontWeight = "bold";
            const r = e3.createElement("span");
            r.classList.add("xterm-char-measure-element"), r.style.fontStyle = "italic";
            const n = e3.createElement("span");
            n.classList.add("xterm-char-measure-element"), n.style.fontWeight = "bold", n.style.fontStyle = "italic", this._measureElements = [i2, s2, r, n], this._container.appendChild(i2), this._container.appendChild(s2), this._container.appendChild(r), this._container.appendChild(n), t3.appendChild(this._container), this.clear();
          }
          dispose() {
            this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
          }
          clear() {
            this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
          }
          setFont(e3, t3, i2, s2) {
            e3 === this._font && t3 === this._fontSize && i2 === this._weight && s2 === this._weightBold || (this._font = e3, this._fontSize = t3, this._weight = i2, this._weightBold = s2, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i2}`, this._measureElements[1].style.fontWeight = `${s2}`, this._measureElements[2].style.fontWeight = `${i2}`, this._measureElements[3].style.fontWeight = `${s2}`, this.clear());
          }
          get(e3, t3, i2) {
            let s2 = 0;
            if (!t3 && !i2 && 1 === e3.length && (s2 = e3.charCodeAt(0)) < 256) {
              if (-9999 !== this._flat[s2]) return this._flat[s2];
              const t4 = this._measure(e3, 0);
              return t4 > 0 && (this._flat[s2] = t4), t4;
            }
            let r = e3;
            t3 && (r += "B"), i2 && (r += "I");
            let n = this._holey.get(r);
            if (void 0 === n) {
              let s3 = 0;
              t3 && (s3 |= 1), i2 && (s3 |= 2), n = this._measure(e3, s3), n > 0 && this._holey.set(r, n);
            }
            return n;
          }
          _measure(e3, t3) {
            const i2 = this._measureElements[t3];
            return i2.textContent = e3.repeat(32), i2.offsetWidth / 32;
          }
        };
      }, 9176: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.INVERTED_DEFAULT_COLOR = void 0, t2.INVERTED_DEFAULT_COLOR = 257;
      }, 6181: (e2, t2) => {
        function i2(e3) {
          return 57508 <= e3 && e3 <= 57558;
        }
        function s2(e3) {
          return e3 >= 128512 && e3 <= 128591 || e3 >= 127744 && e3 <= 128511 || e3 >= 128640 && e3 <= 128767 || e3 >= 9728 && e3 <= 9983 || e3 >= 9984 && e3 <= 10175 || e3 >= 65024 && e3 <= 65039 || e3 >= 129280 && e3 <= 129535 || e3 >= 127462 && e3 <= 127487;
        }
        Object.defineProperty(t2, "__esModule", { value: true }), t2.throwIfFalsy = function(e3) {
          if (!e3) throw new Error("value must not be falsy");
          return e3;
        }, t2.isPowerlineGlyph = i2, t2.isRestrictedPowerlineGlyph = function(e3) {
          return 57520 <= e3 && e3 <= 57527;
        }, t2.isEmoji = s2, t2.allowRescaling = function(e3, t3, r, n) {
          return 1 === t3 && r > Math.ceil(1.5 * n) && void 0 !== e3 && e3 > 255 && !s2(e3) && !i2(e3) && !(function(e4) {
            return 57344 <= e4 && e4 <= 63743;
          })(e3);
        }, t2.treatGlyphAsBackgroundColor = function(e3) {
          return i2(e3) || (function(e4) {
            return 9472 <= e4 && e4 <= 9631;
          })(e3);
        }, t2.createRenderDimensions = function() {
          return { css: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 } }, device: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 }, char: { width: 0, height: 0, left: 0, top: 0 } } };
        }, t2.computeNextVariantOffset = function(e3, t3, i3 = 0) {
          return (e3 - (2 * Math.round(t3) - i3)) % (2 * Math.round(t3));
        };
      }, 2274: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.createSelectionRenderModel = function() {
          return new i2();
        };
        class i2 {
          constructor() {
            this.clear();
          }
          clear() {
            this.hasSelection = false, this.columnSelectMode = false, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
          }
          update(e3, t3, i3, s2 = false) {
            if (this.selectionStart = t3, this.selectionEnd = i3, !t3 || !i3 || t3[0] === i3[0] && t3[1] === i3[1]) return void this.clear();
            const r = e3.buffers.active.ydisp, n = t3[1] - r, o = i3[1] - r, a = Math.max(n, 0), l = Math.min(o, e3.rows - 1);
            a >= e3.rows || l < 0 ? this.clear() : (this.hasSelection = true, this.columnSelectMode = s2, this.viewportStartRow = n, this.viewportEndRow = o, this.viewportCappedStartRow = a, this.viewportCappedEndRow = l, this.startCol = t3[0], this.endCol = i3[0]);
          }
          isCellSelected(e3, t3, i3) {
            return !!this.hasSelection && (i3 -= e3.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? t3 >= this.startCol && i3 >= this.viewportCappedStartRow && t3 < this.endCol && i3 <= this.viewportCappedEndRow : t3 < this.startCol && i3 >= this.viewportCappedStartRow && t3 >= this.endCol && i3 <= this.viewportCappedEndRow : i3 > this.viewportStartRow && i3 < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i3 === this.viewportStartRow && t3 >= this.startCol && t3 < this.endCol || this.viewportStartRow < this.viewportEndRow && i3 === this.viewportEndRow && t3 < this.endCol || this.viewportStartRow < this.viewportEndRow && i3 === this.viewportStartRow && t3 >= this.startCol);
          }
        }
      }, 5959: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.SelectionModel = void 0, t2.SelectionModel = class {
          constructor(e3) {
            this._bufferService = e3, this.isSelectAllActive = false, this.selectionStartLength = 0;
          }
          clearSelection() {
            this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = false, this.selectionStartLength = 0;
          }
          get finalSelectionStart() {
            return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
          }
          get finalSelectionEnd() {
            if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
            if (this.selectionStart) {
              if (!this.selectionEnd || this.areSelectionValuesReversed()) {
                const e3 = this.selectionStart[0] + this.selectionStartLength;
                return e3 > this._bufferService.cols ? e3 % this._bufferService.cols == 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols) - 1] : [e3 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols)] : [e3, this.selectionStart[1]];
              }
              if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
                const e3 = this.selectionStart[0] + this.selectionStartLength;
                return e3 > this._bufferService.cols ? [e3 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols)] : [Math.max(e3, this.selectionEnd[0]), this.selectionEnd[1]];
              }
              return this.selectionEnd;
            }
          }
          areSelectionValuesReversed() {
            const e3 = this.selectionStart, t3 = this.selectionEnd;
            return !(!e3 || !t3) && (e3[1] > t3[1] || e3[1] === t3[1] && e3[0] > t3[0]);
          }
          handleTrim(e3) {
            return this.selectionStart && (this.selectionStart[1] -= e3), this.selectionEnd && (this.selectionEnd[1] -= e3), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
          }
        };
      }, 4792: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CharSizeService = void 0;
        const n = i2(6501), o = i2(7150), a = i2(802);
        let l = class extends o.Disposable {
          get hasValidSize() {
            return this.width > 0 && this.height > 0;
          }
          constructor(e3, t3, i3) {
            super(), this._optionsService = i3, this.width = 0, this.height = 0, this._onCharSizeChange = this._register(new a.Emitter()), this.onCharSizeChange = this._onCharSizeChange.event;
            try {
              this._measureStrategy = this._register(new d(this._optionsService));
            } catch {
              this._measureStrategy = this._register(new c(e3, t3, this._optionsService));
            }
            this._register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], (() => this.measure())));
          }
          measure() {
            const e3 = this._measureStrategy.measure();
            e3.width === this.width && e3.height === this.height || (this.width = e3.width, this.height = e3.height, this._onCharSizeChange.fire());
          }
        };
        t2.CharSizeService = l, t2.CharSizeService = l = s2([r(2, n.IOptionsService)], l);
        class h extends o.Disposable {
          constructor() {
            super(...arguments), this._result = { width: 0, height: 0 };
          }
          _validateAndSet(e3, t3) {
            void 0 !== e3 && e3 > 0 && void 0 !== t3 && t3 > 0 && (this._result.width = e3, this._result.height = t3);
          }
        }
        class c extends h {
          constructor(e3, t3, i3) {
            super(), this._document = e3, this._parentElement = t3, this._optionsService = i3, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
          }
          measure() {
            return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
          }
        }
        class d extends h {
          constructor(e3) {
            super(), this._optionsService = e3, this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
            const t3 = this._ctx.measureText("W");
            if (!("width" in t3 && "fontBoundingBoxAscent" in t3 && "fontBoundingBoxDescent" in t3)) throw new Error("Required font metrics not supported");
          }
          measure() {
            this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
            const e3 = this._ctx.measureText("W");
            return this._validateAndSet(e3.width, e3.fontBoundingBoxAscent + e3.fontBoundingBoxDescent), this._result;
          }
        }
      }, 945: function(e2, t2, i2) {
        var s2, r = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, n = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CharacterJoinerService = t2.JoinedCellData = void 0;
        const o = i2(5451), a = i2(8938), l = i2(3055), h = i2(6501);
        class c extends o.AttributeData {
          constructor(e3, t3, i3) {
            super(), this.content = 0, this.combinedData = "", this.fg = e3.fg, this.bg = e3.bg, this.combinedData = t3, this._width = i3;
          }
          isCombined() {
            return 2097152;
          }
          getWidth() {
            return this._width;
          }
          getChars() {
            return this.combinedData;
          }
          getCode() {
            return 2097151;
          }
          setFromCharData(e3) {
            throw new Error("not implemented");
          }
          getAsCharData() {
            return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
          }
        }
        t2.JoinedCellData = c;
        let d = s2 = class {
          constructor(e3) {
            this._bufferService = e3, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new l.CellData();
          }
          register(e3) {
            const t3 = { id: this._nextCharacterJoinerId++, handler: e3 };
            return this._characterJoiners.push(t3), t3.id;
          }
          deregister(e3) {
            for (let t3 = 0; t3 < this._characterJoiners.length; t3++) if (this._characterJoiners[t3].id === e3) return this._characterJoiners.splice(t3, 1), true;
            return false;
          }
          getJoinedCharacters(e3) {
            if (0 === this._characterJoiners.length) return [];
            const t3 = this._bufferService.buffer.lines.get(e3);
            if (!t3 || 0 === t3.length) return [];
            const i3 = [], s3 = t3.translateToString(true);
            let r2 = 0, n2 = 0, o2 = 0, l2 = t3.getFg(0), h2 = t3.getBg(0);
            for (let e4 = 0; e4 < t3.getTrimmedLength(); e4++) if (t3.loadCell(e4, this._workCell), 0 !== this._workCell.getWidth()) {
              if (this._workCell.fg !== l2 || this._workCell.bg !== h2) {
                if (e4 - r2 > 1) {
                  const e5 = this._getJoinedRanges(s3, o2, n2, t3, r2);
                  for (let t4 = 0; t4 < e5.length; t4++) i3.push(e5[t4]);
                }
                r2 = e4, o2 = n2, l2 = this._workCell.fg, h2 = this._workCell.bg;
              }
              n2 += this._workCell.getChars().length || a.WHITESPACE_CELL_CHAR.length;
            }
            if (this._bufferService.cols - r2 > 1) {
              const e4 = this._getJoinedRanges(s3, o2, n2, t3, r2);
              for (let t4 = 0; t4 < e4.length; t4++) i3.push(e4[t4]);
            }
            return i3;
          }
          _getJoinedRanges(e3, t3, i3, r2, n2) {
            const o2 = e3.substring(t3, i3);
            let a2 = [];
            try {
              a2 = this._characterJoiners[0].handler(o2);
            } catch (e4) {
              console.error(e4);
            }
            for (let e4 = 1; e4 < this._characterJoiners.length; e4++) try {
              const t4 = this._characterJoiners[e4].handler(o2);
              for (let e5 = 0; e5 < t4.length; e5++) s2._mergeRanges(a2, t4[e5]);
            } catch (e5) {
              console.error(e5);
            }
            return this._stringRangesToCellRanges(a2, r2, n2), a2;
          }
          _stringRangesToCellRanges(e3, t3, i3) {
            let s3 = 0, r2 = false, n2 = 0, o2 = e3[s3];
            if (o2) {
              for (let l2 = i3; l2 < this._bufferService.cols; l2++) {
                const i4 = t3.getWidth(l2), h2 = t3.getString(l2).length || a.WHITESPACE_CELL_CHAR.length;
                if (0 !== i4) {
                  if (!r2 && o2[0] <= n2 && (o2[0] = l2, r2 = true), o2[1] <= n2) {
                    if (o2[1] = l2, o2 = e3[++s3], !o2) break;
                    o2[0] <= n2 ? (o2[0] = l2, r2 = true) : r2 = false;
                  }
                  n2 += h2;
                }
              }
              o2 && (o2[1] = this._bufferService.cols);
            }
          }
          static _mergeRanges(e3, t3) {
            let i3 = false;
            for (let s3 = 0; s3 < e3.length; s3++) {
              const r2 = e3[s3];
              if (i3) {
                if (t3[1] <= r2[0]) return e3[s3 - 1][1] = t3[1], e3;
                if (t3[1] <= r2[1]) return e3[s3 - 1][1] = Math.max(t3[1], r2[1]), e3.splice(s3, 1), e3;
                e3.splice(s3, 1), s3--;
              } else {
                if (t3[1] <= r2[0]) return e3.splice(s3, 0, t3), e3;
                if (t3[1] <= r2[1]) return r2[0] = Math.min(t3[0], r2[0]), e3;
                t3[0] < r2[1] && (r2[0] = Math.min(t3[0], r2[0]), i3 = true);
              }
            }
            return i3 ? e3[e3.length - 1][1] = t3[1] : e3.push(t3), e3;
          }
        };
        t2.CharacterJoinerService = d, t2.CharacterJoinerService = d = s2 = r([n(0, h.IBufferService)], d);
      }, 9574: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreBrowserService = void 0;
        const s2 = i2(802), r = i2(7093), n = i2(7150);
        class o extends n.Disposable {
          constructor(e3, t3, i3) {
            super(), this._textarea = e3, this._window = t3, this.mainDocument = i3, this._isFocused = false, this._cachedIsFocused = void 0, this._screenDprMonitor = this._register(new a(this._window)), this._onDprChange = this._register(new s2.Emitter()), this.onDprChange = this._onDprChange.event, this._onWindowChange = this._register(new s2.Emitter()), this.onWindowChange = this._onWindowChange.event, this._register(this.onWindowChange(((e4) => this._screenDprMonitor.setWindow(e4)))), this._register(s2.Event.forward(this._screenDprMonitor.onDprChange, this._onDprChange)), this._register((0, r.addDisposableListener)(this._textarea, "focus", (() => this._isFocused = true))), this._register((0, r.addDisposableListener)(this._textarea, "blur", (() => this._isFocused = false)));
          }
          get window() {
            return this._window;
          }
          set window(e3) {
            this._window !== e3 && (this._window = e3, this._onWindowChange.fire(this._window));
          }
          get dpr() {
            return this.window.devicePixelRatio;
          }
          get isFocused() {
            return void 0 === this._cachedIsFocused && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask((() => this._cachedIsFocused = void 0))), this._cachedIsFocused;
          }
        }
        t2.CoreBrowserService = o;
        class a extends n.Disposable {
          constructor(e3) {
            super(), this._parentWindow = e3, this._windowResizeListener = this._register(new n.MutableDisposable()), this._onDprChange = this._register(new s2.Emitter()), this.onDprChange = this._onDprChange.event, this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this._register((0, n.toDisposable)((() => this.clearListener())));
          }
          setWindow(e3) {
            this._parentWindow = e3, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
          }
          _setWindowResizeListener() {
            this._windowResizeListener.value = (0, r.addDisposableListener)(this._parentWindow, "resize", (() => this._setDprAndFireIfDiffers()));
          }
          _setDprAndFireIfDiffers() {
            this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
          }
          _updateDpr() {
            this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
          }
          clearListener() {
            this._resolutionMediaMatchList && this._outerListener && (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
          }
        }
      }, 9820: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.LinkProviderService = void 0;
        const s2 = i2(7150);
        class r extends s2.Disposable {
          constructor() {
            super(), this.linkProviders = [], this._register((0, s2.toDisposable)((() => this.linkProviders.length = 0)));
          }
          registerLinkProvider(e3) {
            return this.linkProviders.push(e3), { dispose: () => {
              const t3 = this.linkProviders.indexOf(e3);
              -1 !== t3 && this.linkProviders.splice(t3, 1);
            } };
          }
        }
        t2.LinkProviderService = r;
      }, 9784: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.MouseService = void 0;
        const n = i2(7098), o = i2(5251);
        let a = class {
          constructor(e3, t3) {
            this._renderService = e3, this._charSizeService = t3;
          }
          getCoords(e3, t3, i3, s3, r2) {
            return (0, o.getCoords)(window, e3, t3, i3, s3, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, r2);
          }
          getMouseReportCoords(e3, t3) {
            const i3 = (0, o.getCoordsRelativeToElement)(window, e3, t3);
            if (this._charSizeService.hasValidSize) return i3[0] = Math.min(Math.max(i3[0], 0), this._renderService.dimensions.css.canvas.width - 1), i3[1] = Math.min(Math.max(i3[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(i3[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(i3[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(i3[0]), y: Math.floor(i3[1]) };
          }
        };
        t2.MouseService = a, t2.MouseService = a = s2([r(0, n.IRenderService), r(1, n.ICharSizeService)], a);
      }, 5783: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.RenderService = void 0;
        const n = i2(4852), o = i2(7098), a = i2(7150), l = i2(6168), h = i2(6501), c = i2(802);
        let d = class extends a.Disposable {
          get dimensions() {
            return this._renderer.value.dimensions;
          }
          constructor(e3, t3, i3, s3, r2, o2, h2, d2, _) {
            super(), this._rowCount = e3, this._optionsService = i3, this._charSizeService = s3, this._coreService = r2, this._coreBrowserService = d2, this._renderer = this._register(new a.MutableDisposable()), this._pausedResizeTask = new l.DebouncedIdleTask(), this._observerDisposable = this._register(new a.MutableDisposable()), this._isPaused = false, this._needsFullRefresh = false, this._isNextRenderRedrawOnly = true, this._needsSelectionRefresh = false, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = { start: void 0, end: void 0, columnSelectMode: false }, this._onDimensionsChange = this._register(new c.Emitter()), this.onDimensionsChange = this._onDimensionsChange.event, this._onRenderedViewportChange = this._register(new c.Emitter()), this.onRenderedViewportChange = this._onRenderedViewportChange.event, this._onRender = this._register(new c.Emitter()), this.onRender = this._onRender.event, this._onRefreshRequest = this._register(new c.Emitter()), this.onRefreshRequest = this._onRefreshRequest.event, this._renderDebouncer = new n.RenderDebouncer(((e4, t4) => this._renderRows(e4, t4)), this._coreBrowserService), this._register(this._renderDebouncer), this._syncOutputHandler = new u(this._coreBrowserService, this._coreService, (() => this._fullRefresh())), this._register((0, a.toDisposable)((() => this._syncOutputHandler.dispose()))), this._register(this._coreBrowserService.onDprChange((() => this.handleDevicePixelRatioChange()))), this._register(h2.onResize((() => this._fullRefresh()))), this._register(h2.buffers.onBufferActivate((() => this._renderer.value?.clear()))), this._register(this._optionsService.onOptionChange((() => this._handleOptionsChanged()))), this._register(this._charSizeService.onCharSizeChange((() => this.handleCharSizeChanged()))), this._register(o2.onDecorationRegistered((() => this._fullRefresh()))), this._register(o2.onDecorationRemoved((() => this._fullRefresh()))), this._register(this._optionsService.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio", "rescaleOverlappingGlyphs"], (() => {
              this.clear(), this.handleResize(h2.cols, h2.rows), this._fullRefresh();
            }))), this._register(this._optionsService.onMultipleOptionChange(["cursorBlink", "cursorStyle"], (() => this.refreshRows(h2.buffer.y, h2.buffer.y, true)))), this._register(_.onChangeColors((() => this._fullRefresh()))), this._registerIntersectionObserver(this._coreBrowserService.window, t3), this._register(this._coreBrowserService.onWindowChange(((e4) => this._registerIntersectionObserver(e4, t3))));
          }
          _registerIntersectionObserver(e3, t3) {
            if ("IntersectionObserver" in e3) {
              const i3 = new e3.IntersectionObserver(((e4) => this._handleIntersectionChange(e4[e4.length - 1])), { threshold: 0 });
              i3.observe(t3), this._observerDisposable.value = (0, a.toDisposable)((() => i3.disconnect()));
            }
          }
          _handleIntersectionChange(e3) {
            this._isPaused = void 0 === e3.isIntersecting ? 0 === e3.intersectionRatio : !e3.isIntersecting, this._isPaused || this._charSizeService.hasValidSize || this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
          }
          refreshRows(e3, t3, i3 = false) {
            if (this._isPaused) return void (this._needsFullRefresh = true);
            if (this._coreService.decPrivateModes.synchronizedOutput) return void this._syncOutputHandler.bufferRows(e3, t3);
            const s3 = this._syncOutputHandler.flush();
            s3 && (e3 = Math.min(e3, s3.start), t3 = Math.max(t3, s3.end)), i3 || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e3, t3, this._rowCount);
          }
          _renderRows(e3, t3) {
            this._renderer.value && (this._coreService.decPrivateModes.synchronizedOutput ? this._syncOutputHandler.bufferRows(e3, t3) : (e3 = Math.min(e3, this._rowCount - 1), t3 = Math.min(t3, this._rowCount - 1), this._renderer.value.renderRows(e3, t3), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e3, end: t3 }), this._onRender.fire({ start: e3, end: t3 }), this._isNextRenderRedrawOnly = true));
          }
          resize(e3, t3) {
            this._rowCount = t3, this._fireOnCanvasResize();
          }
          _handleOptionsChanged() {
            this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
          }
          _fireOnCanvasResize() {
            this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
          }
          hasRenderer() {
            return !!this._renderer.value;
          }
          setRenderer(e3) {
            this._renderer.value = e3, this._renderer.value && (this._renderer.value.onRequestRedraw(((e4) => this.refreshRows(e4.start, e4.end, true))), this._needsSelectionRefresh = true, this._fullRefresh());
          }
          addRefreshCallback(e3) {
            return this._renderDebouncer.addRefreshCallback(e3);
          }
          _fullRefresh() {
            this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
          }
          clearTextureAtlas() {
            this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
          }
          handleDevicePixelRatioChange() {
            this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
          }
          handleResize(e3, t3) {
            this._renderer.value && (this._isPaused ? this._pausedResizeTask.set((() => this._renderer.value?.handleResize(e3, t3))) : this._renderer.value.handleResize(e3, t3), this._fullRefresh());
          }
          handleCharSizeChanged() {
            this._renderer.value?.handleCharSizeChanged();
          }
          handleBlur() {
            this._renderer.value?.handleBlur();
          }
          handleFocus() {
            this._renderer.value?.handleFocus();
          }
          handleSelectionChanged(e3, t3, i3) {
            this._selectionState.start = e3, this._selectionState.end = t3, this._selectionState.columnSelectMode = i3, this._renderer.value?.handleSelectionChanged(e3, t3, i3);
          }
          handleCursorMove() {
            this._renderer.value?.handleCursorMove();
          }
          clear() {
            this._renderer.value?.clear();
          }
        };
        t2.RenderService = d, t2.RenderService = d = s2([r(2, h.IOptionsService), r(3, o.ICharSizeService), r(4, h.ICoreService), r(5, h.IDecorationService), r(6, h.IBufferService), r(7, o.ICoreBrowserService), r(8, o.IThemeService)], d);
        class u {
          constructor(e3, t3, i3) {
            this._coreBrowserService = e3, this._coreService = t3, this._onTimeout = i3, this._start = 0, this._end = 0, this._isBuffering = false;
          }
          bufferRows(e3, t3) {
            this._isBuffering ? (this._start = Math.min(this._start, e3), this._end = Math.max(this._end, t3)) : (this._start = e3, this._end = t3, this._isBuffering = true), void 0 === this._timeout && (this._timeout = this._coreBrowserService.window.setTimeout((() => {
              this._timeout = void 0, this._coreService.decPrivateModes.synchronizedOutput = false, this._onTimeout();
            }), 1e3));
          }
          flush() {
            if (void 0 !== this._timeout && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0), !this._isBuffering) return;
            const e3 = { start: this._start, end: this._end };
            return this._isBuffering = false, e3;
          }
          dispose() {
            void 0 !== this._timeout && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0);
          }
        }
      }, 2079: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.SelectionService = void 0;
        const n = i2(5251), o = i2(9686), a = i2(5959), l = i2(7098), h = i2(7150), c = i2(701), d = i2(9384), u = i2(3055), _ = i2(6501), f = i2(802), p = String.fromCharCode(160), g = new RegExp(p, "g");
        let m = class extends h.Disposable {
          constructor(e3, t3, i3, s3, r2, n2, o2, l2, c2) {
            super(), this._element = e3, this._screenElement = t3, this._linkifier = i3, this._bufferService = s3, this._coreService = r2, this._mouseService = n2, this._optionsService = o2, this._renderService = l2, this._coreBrowserService = c2, this._dragScrollAmount = 0, this._enabled = true, this._workCell = new u.CellData(), this._mouseDownTimeStamp = 0, this._oldHasSelection = false, this._oldSelectionStart = void 0, this._oldSelectionEnd = void 0, this._onLinuxMouseSelection = this._register(new f.Emitter()), this.onLinuxMouseSelection = this._onLinuxMouseSelection.event, this._onRedrawRequest = this._register(new f.Emitter()), this.onRequestRedraw = this._onRedrawRequest.event, this._onSelectionChange = this._register(new f.Emitter()), this.onSelectionChange = this._onSelectionChange.event, this._onRequestScrollLines = this._register(new f.Emitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this._mouseMoveListener = (e4) => this._handleMouseMove(e4), this._mouseUpListener = (e4) => this._handleMouseUp(e4), this._coreService.onUserInput((() => {
              this.hasSelection && this.clearSelection();
            })), this._trimListener = this._bufferService.buffer.lines.onTrim(((e4) => this._handleTrim(e4))), this._register(this._bufferService.buffers.onBufferActivate(((e4) => this._handleBufferActivate(e4)))), this.enable(), this._model = new a.SelectionModel(this._bufferService), this._activeSelectionMode = 0, this._register((0, h.toDisposable)((() => {
              this._removeMouseDownListeners();
            }))), this._register(this._bufferService.onResize(((e4) => {
              e4.rowsChanged && this.clearSelection();
            })));
          }
          reset() {
            this.clearSelection();
          }
          disable() {
            this.clearSelection(), this._enabled = false;
          }
          enable() {
            this._enabled = true;
          }
          get selectionStart() {
            return this._model.finalSelectionStart;
          }
          get selectionEnd() {
            return this._model.finalSelectionEnd;
          }
          get hasSelection() {
            const e3 = this._model.finalSelectionStart, t3 = this._model.finalSelectionEnd;
            return !(!e3 || !t3 || e3[0] === t3[0] && e3[1] === t3[1]);
          }
          get selectionText() {
            const e3 = this._model.finalSelectionStart, t3 = this._model.finalSelectionEnd;
            if (!e3 || !t3) return "";
            const i3 = this._bufferService.buffer, s3 = [];
            if (3 === this._activeSelectionMode) {
              if (e3[0] === t3[0]) return "";
              const r2 = e3[0] < t3[0] ? e3[0] : t3[0], n2 = e3[0] < t3[0] ? t3[0] : e3[0];
              for (let o2 = e3[1]; o2 <= t3[1]; o2++) {
                const e4 = i3.translateBufferLineToString(o2, true, r2, n2);
                s3.push(e4);
              }
            } else {
              const r2 = e3[1] === t3[1] ? t3[0] : void 0;
              s3.push(i3.translateBufferLineToString(e3[1], true, e3[0], r2));
              for (let r3 = e3[1] + 1; r3 <= t3[1] - 1; r3++) {
                const e4 = i3.lines.get(r3), t4 = i3.translateBufferLineToString(r3, true);
                e4?.isWrapped ? s3[s3.length - 1] += t4 : s3.push(t4);
              }
              if (e3[1] !== t3[1]) {
                const e4 = i3.lines.get(t3[1]), r3 = i3.translateBufferLineToString(t3[1], true, 0, t3[0]);
                e4 && e4.isWrapped ? s3[s3.length - 1] += r3 : s3.push(r3);
              }
            }
            return s3.map(((e4) => e4.replace(g, " "))).join(c.isWindows ? "\r\n" : "\n");
          }
          clearSelection() {
            this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
          }
          refresh(e3) {
            this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame((() => this._refresh()))), c.isLinux && e3 && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
          }
          _refresh() {
            this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: 3 === this._activeSelectionMode });
          }
          _isClickInSelection(e3) {
            const t3 = this._getMouseBufferCoords(e3), i3 = this._model.finalSelectionStart, s3 = this._model.finalSelectionEnd;
            return !!(i3 && s3 && t3) && this._areCoordsInSelection(t3, i3, s3);
          }
          isCellInSelection(e3, t3) {
            const i3 = this._model.finalSelectionStart, s3 = this._model.finalSelectionEnd;
            return !(!i3 || !s3) && this._areCoordsInSelection([e3, t3], i3, s3);
          }
          _areCoordsInSelection(e3, t3, i3) {
            return e3[1] > t3[1] && e3[1] < i3[1] || t3[1] === i3[1] && e3[1] === t3[1] && e3[0] >= t3[0] && e3[0] < i3[0] || t3[1] < i3[1] && e3[1] === i3[1] && e3[0] < i3[0] || t3[1] < i3[1] && e3[1] === t3[1] && e3[0] >= t3[0];
          }
          _selectWordAtCursor(e3, t3) {
            const i3 = this._linkifier.currentLink?.link?.range;
            if (i3) return this._model.selectionStart = [i3.start.x - 1, i3.start.y - 1], this._model.selectionStartLength = (0, d.getRangeLength)(i3, this._bufferService.cols), this._model.selectionEnd = void 0, true;
            const s3 = this._getMouseBufferCoords(e3);
            return !!s3 && (this._selectWordAt(s3, t3), this._model.selectionEnd = void 0, true);
          }
          selectAll() {
            this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
          }
          selectLines(e3, t3) {
            this._model.clearSelection(), e3 = Math.max(e3, 0), t3 = Math.min(t3, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e3], this._model.selectionEnd = [this._bufferService.cols, t3], this.refresh(), this._onSelectionChange.fire();
          }
          _handleTrim(e3) {
            this._model.handleTrim(e3) && this.refresh();
          }
          _getMouseBufferCoords(e3) {
            const t3 = this._mouseService.getCoords(e3, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
            if (t3) return t3[0]--, t3[1]--, t3[1] += this._bufferService.buffer.ydisp, t3;
          }
          _getMouseEventScrollAmount(e3) {
            let t3 = (0, n.getCoordsRelativeToElement)(this._coreBrowserService.window, e3, this._screenElement)[1];
            const i3 = this._renderService.dimensions.css.canvas.height;
            return t3 >= 0 && t3 <= i3 ? 0 : (t3 > i3 && (t3 -= i3), t3 = Math.min(Math.max(t3, -50), 50), t3 /= 50, t3 / Math.abs(t3) + Math.round(14 * t3));
          }
          shouldForceSelection(e3) {
            return c.isMac ? e3.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e3.shiftKey;
          }
          handleMouseDown(e3) {
            if (this._mouseDownTimeStamp = e3.timeStamp, (2 !== e3.button || !this.hasSelection) && 0 === e3.button) {
              if (!this._enabled) {
                if (!this.shouldForceSelection(e3)) return;
                e3.stopPropagation();
              }
              e3.preventDefault(), this._dragScrollAmount = 0, this._enabled && e3.shiftKey ? this._handleIncrementalClick(e3) : 1 === e3.detail ? this._handleSingleClick(e3) : 2 === e3.detail ? this._handleDoubleClick(e3) : 3 === e3.detail && this._handleTripleClick(e3), this._addMouseDownListeners(), this.refresh(true);
            }
          }
          _addMouseDownListeners() {
            this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval((() => this._dragScroll()), 50);
          }
          _removeMouseDownListeners() {
            this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
          }
          _handleIncrementalClick(e3) {
            this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e3));
          }
          _handleSingleClick(e3) {
            if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(e3) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e3), !this._model.selectionStart) return;
            this._model.selectionEnd = void 0;
            const t3 = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
            t3 && t3.length !== this._model.selectionStart[0] && 0 === t3.hasWidth(this._model.selectionStart[0]) && this._model.selectionStart[0]++;
          }
          _handleDoubleClick(e3) {
            this._selectWordAtCursor(e3, true) && (this._activeSelectionMode = 1);
          }
          _handleTripleClick(e3) {
            const t3 = this._getMouseBufferCoords(e3);
            t3 && (this._activeSelectionMode = 2, this._selectLineAt(t3[1]));
          }
          shouldColumnSelect(e3) {
            return e3.altKey && !(c.isMac && this._optionsService.rawOptions.macOptionClickForcesSelection);
          }
          _handleMouseMove(e3) {
            if (e3.stopImmediatePropagation(), !this._model.selectionStart) return;
            const t3 = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
            if (this._model.selectionEnd = this._getMouseBufferCoords(e3), !this._model.selectionEnd) return void this.refresh(true);
            2 === this._activeSelectionMode ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : 1 === this._activeSelectionMode && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e3), 3 !== this._activeSelectionMode && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
            const i3 = this._bufferService.buffer;
            if (this._model.selectionEnd[1] < i3.lines.length) {
              const e4 = i3.lines.get(this._model.selectionEnd[1]);
              e4 && 0 === e4.hasWidth(this._model.selectionEnd[0]) && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
            }
            t3 && t3[0] === this._model.selectionEnd[0] && t3[1] === this._model.selectionEnd[1] || this.refresh(true);
          }
          _dragScroll() {
            if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
              this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
              const e3 = this._bufferService.buffer;
              this._dragScrollAmount > 0 ? (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e3.ydisp + this._bufferService.rows, e3.lines.length - 1)) : (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e3.ydisp), this.refresh();
            }
          }
          _handleMouseUp(e3) {
            const t3 = e3.timeStamp - this._mouseDownTimeStamp;
            if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && t3 < 500 && e3.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
              if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
                const t4 = this._mouseService.getCoords(e3, this._element, this._bufferService.cols, this._bufferService.rows, false);
                if (t4 && void 0 !== t4[0] && void 0 !== t4[1]) {
                  const e4 = (0, o.moveToCellSequence)(t4[0] - 1, t4[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
                  this._coreService.triggerDataEvent(e4, true);
                }
              }
            } else this._fireEventIfSelectionChanged();
          }
          _fireEventIfSelectionChanged() {
            const e3 = this._model.finalSelectionStart, t3 = this._model.finalSelectionEnd, i3 = !(!e3 || !t3 || e3[0] === t3[0] && e3[1] === t3[1]);
            i3 ? e3 && t3 && (this._oldSelectionStart && this._oldSelectionEnd && e3[0] === this._oldSelectionStart[0] && e3[1] === this._oldSelectionStart[1] && t3[0] === this._oldSelectionEnd[0] && t3[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(e3, t3, i3)) : this._oldHasSelection && this._fireOnSelectionChange(e3, t3, i3);
          }
          _fireOnSelectionChange(e3, t3, i3) {
            this._oldSelectionStart = e3, this._oldSelectionEnd = t3, this._oldHasSelection = i3, this._onSelectionChange.fire();
          }
          _handleBufferActivate(e3) {
            this.clearSelection(), this._trimListener.dispose(), this._trimListener = e3.activeBuffer.lines.onTrim(((e4) => this._handleTrim(e4)));
          }
          _convertViewportColToCharacterIndex(e3, t3) {
            let i3 = t3;
            for (let s3 = 0; t3 >= s3; s3++) {
              const r2 = e3.loadCell(s3, this._workCell).getChars().length;
              0 === this._workCell.getWidth() ? i3-- : r2 > 1 && t3 !== s3 && (i3 += r2 - 1);
            }
            return i3;
          }
          setSelection(e3, t3, i3) {
            this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e3, t3], this._model.selectionStartLength = i3, this.refresh(), this._fireEventIfSelectionChanged();
          }
          rightClickSelect(e3) {
            this._isClickInSelection(e3) || (this._selectWordAtCursor(e3, false) && this.refresh(true), this._fireEventIfSelectionChanged());
          }
          _getWordAt(e3, t3, i3 = true, s3 = true) {
            if (e3[0] >= this._bufferService.cols) return;
            const r2 = this._bufferService.buffer, n2 = r2.lines.get(e3[1]);
            if (!n2) return;
            const o2 = r2.translateBufferLineToString(e3[1], false);
            let a2 = this._convertViewportColToCharacterIndex(n2, e3[0]), l2 = a2;
            const h2 = e3[0] - a2;
            let c2 = 0, d2 = 0, u2 = 0, _2 = 0;
            if (" " === o2.charAt(a2)) {
              for (; a2 > 0 && " " === o2.charAt(a2 - 1); ) a2--;
              for (; l2 < o2.length && " " === o2.charAt(l2 + 1); ) l2++;
            } else {
              let t4 = e3[0], i4 = e3[0];
              0 === n2.getWidth(t4) && (c2++, t4--), 2 === n2.getWidth(i4) && (d2++, i4++);
              const s4 = n2.getString(i4).length;
              for (s4 > 1 && (_2 += s4 - 1, l2 += s4 - 1); t4 > 0 && a2 > 0 && !this._isCharWordSeparator(n2.loadCell(t4 - 1, this._workCell)); ) {
                n2.loadCell(t4 - 1, this._workCell);
                const e4 = this._workCell.getChars().length;
                0 === this._workCell.getWidth() ? (c2++, t4--) : e4 > 1 && (u2 += e4 - 1, a2 -= e4 - 1), a2--, t4--;
              }
              for (; i4 < n2.length && l2 + 1 < o2.length && !this._isCharWordSeparator(n2.loadCell(i4 + 1, this._workCell)); ) {
                n2.loadCell(i4 + 1, this._workCell);
                const e4 = this._workCell.getChars().length;
                2 === this._workCell.getWidth() ? (d2++, i4++) : e4 > 1 && (_2 += e4 - 1, l2 += e4 - 1), l2++, i4++;
              }
            }
            l2++;
            let f2 = a2 + h2 - c2 + u2, p2 = Math.min(this._bufferService.cols, l2 - a2 + c2 + d2 - u2 - _2);
            if (t3 || "" !== o2.slice(a2, l2).trim()) {
              if (i3 && 0 === f2 && 32 !== n2.getCodePoint(0)) {
                const t4 = r2.lines.get(e3[1] - 1);
                if (t4 && n2.isWrapped && 32 !== t4.getCodePoint(this._bufferService.cols - 1)) {
                  const t5 = this._getWordAt([this._bufferService.cols - 1, e3[1] - 1], false, true, false);
                  if (t5) {
                    const e4 = this._bufferService.cols - t5.start;
                    f2 -= e4, p2 += e4;
                  }
                }
              }
              if (s3 && f2 + p2 === this._bufferService.cols && 32 !== n2.getCodePoint(this._bufferService.cols - 1)) {
                const t4 = r2.lines.get(e3[1] + 1);
                if (t4?.isWrapped && 32 !== t4.getCodePoint(0)) {
                  const t5 = this._getWordAt([0, e3[1] + 1], false, false, true);
                  t5 && (p2 += t5.length);
                }
              }
              return { start: f2, length: p2 };
            }
          }
          _selectWordAt(e3, t3) {
            const i3 = this._getWordAt(e3, t3);
            if (i3) {
              for (; i3.start < 0; ) i3.start += this._bufferService.cols, e3[1]--;
              this._model.selectionStart = [i3.start, e3[1]], this._model.selectionStartLength = i3.length;
            }
          }
          _selectToWordAt(e3) {
            const t3 = this._getWordAt(e3, true);
            if (t3) {
              let i3 = e3[1];
              for (; t3.start < 0; ) t3.start += this._bufferService.cols, i3--;
              if (!this._model.areSelectionValuesReversed()) for (; t3.start + t3.length > this._bufferService.cols; ) t3.length -= this._bufferService.cols, i3++;
              this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? t3.start : t3.start + t3.length, i3];
            }
          }
          _isCharWordSeparator(e3) {
            return 0 !== e3.getWidth() && this._optionsService.rawOptions.wordSeparator.indexOf(e3.getChars()) >= 0;
          }
          _selectLineAt(e3) {
            const t3 = this._bufferService.buffer.getWrappedRangeForLine(e3), i3 = { start: { x: 0, y: t3.first }, end: { x: this._bufferService.cols - 1, y: t3.last } };
            this._model.selectionStart = [0, t3.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = (0, d.getRangeLength)(i3, this._bufferService.cols);
          }
        };
        t2.SelectionService = m, t2.SelectionService = m = s2([r(3, _.IBufferService), r(4, _.ICoreService), r(5, l.IMouseService), r(6, _.IOptionsService), r(7, l.IRenderService), r(8, l.ICoreBrowserService)], m);
      }, 7098: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ILinkProviderService = t2.IThemeService = t2.ICharacterJoinerService = t2.ISelectionService = t2.IRenderService = t2.IMouseService = t2.ICoreBrowserService = t2.ICharSizeService = void 0;
        const s2 = i2(6201);
        t2.ICharSizeService = (0, s2.createDecorator)("CharSizeService"), t2.ICoreBrowserService = (0, s2.createDecorator)("CoreBrowserService"), t2.IMouseService = (0, s2.createDecorator)("MouseService"), t2.IRenderService = (0, s2.createDecorator)("RenderService"), t2.ISelectionService = (0, s2.createDecorator)("SelectionService"), t2.ICharacterJoinerService = (0, s2.createDecorator)("CharacterJoinerService"), t2.IThemeService = (0, s2.createDecorator)("ThemeService"), t2.ILinkProviderService = (0, s2.createDecorator)("LinkProviderService");
      }, 9078: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ThemeService = void 0;
        const n = i2(7174), o = i2(9302), a = i2(4103), l = i2(7150), h = i2(6501), c = i2(802), d = a.css.toColor("#ffffff"), u = a.css.toColor("#000000"), _ = a.css.toColor("#ffffff"), f = u, p = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 }, g = d;
        let m = class extends l.Disposable {
          get colors() {
            return this._colors;
          }
          constructor(e3) {
            super(), this._optionsService = e3, this._contrastCache = new n.ColorContrastCache(), this._halfContrastCache = new n.ColorContrastCache(), this._onChangeColors = this._register(new c.Emitter()), this.onChangeColors = this._onChangeColors.event, this._colors = { foreground: d, background: u, cursor: _, cursorAccent: f, selectionForeground: void 0, selectionBackgroundTransparent: p, selectionBackgroundOpaque: a.color.blend(u, p), selectionInactiveBackgroundTransparent: p, selectionInactiveBackgroundOpaque: a.color.blend(u, p), scrollbarSliderBackground: a.color.opacity(d, 0.2), scrollbarSliderHoverBackground: a.color.opacity(d, 0.4), scrollbarSliderActiveBackground: a.color.opacity(d, 0.5), overviewRulerBorder: d, ansi: o.DEFAULT_ANSI_COLORS.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this._register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", (() => this._contrastCache.clear()))), this._register(this._optionsService.onSpecificOptionChange("theme", (() => this._setTheme(this._optionsService.rawOptions.theme))));
          }
          _setTheme(e3 = {}) {
            const t3 = this._colors;
            if (t3.foreground = v(e3.foreground, d), t3.background = v(e3.background, u), t3.cursor = a.color.blend(t3.background, v(e3.cursor, _)), t3.cursorAccent = a.color.blend(t3.background, v(e3.cursorAccent, f)), t3.selectionBackgroundTransparent = v(e3.selectionBackground, p), t3.selectionBackgroundOpaque = a.color.blend(t3.background, t3.selectionBackgroundTransparent), t3.selectionInactiveBackgroundTransparent = v(e3.selectionInactiveBackground, t3.selectionBackgroundTransparent), t3.selectionInactiveBackgroundOpaque = a.color.blend(t3.background, t3.selectionInactiveBackgroundTransparent), t3.selectionForeground = e3.selectionForeground ? v(e3.selectionForeground, a.NULL_COLOR) : void 0, t3.selectionForeground === a.NULL_COLOR && (t3.selectionForeground = void 0), a.color.isOpaque(t3.selectionBackgroundTransparent)) {
              const e4 = 0.3;
              t3.selectionBackgroundTransparent = a.color.opacity(t3.selectionBackgroundTransparent, e4);
            }
            if (a.color.isOpaque(t3.selectionInactiveBackgroundTransparent)) {
              const e4 = 0.3;
              t3.selectionInactiveBackgroundTransparent = a.color.opacity(t3.selectionInactiveBackgroundTransparent, e4);
            }
            if (t3.scrollbarSliderBackground = v(e3.scrollbarSliderBackground, a.color.opacity(t3.foreground, 0.2)), t3.scrollbarSliderHoverBackground = v(e3.scrollbarSliderHoverBackground, a.color.opacity(t3.foreground, 0.4)), t3.scrollbarSliderActiveBackground = v(e3.scrollbarSliderActiveBackground, a.color.opacity(t3.foreground, 0.5)), t3.overviewRulerBorder = v(e3.overviewRulerBorder, g), t3.ansi = o.DEFAULT_ANSI_COLORS.slice(), t3.ansi[0] = v(e3.black, o.DEFAULT_ANSI_COLORS[0]), t3.ansi[1] = v(e3.red, o.DEFAULT_ANSI_COLORS[1]), t3.ansi[2] = v(e3.green, o.DEFAULT_ANSI_COLORS[2]), t3.ansi[3] = v(e3.yellow, o.DEFAULT_ANSI_COLORS[3]), t3.ansi[4] = v(e3.blue, o.DEFAULT_ANSI_COLORS[4]), t3.ansi[5] = v(e3.magenta, o.DEFAULT_ANSI_COLORS[5]), t3.ansi[6] = v(e3.cyan, o.DEFAULT_ANSI_COLORS[6]), t3.ansi[7] = v(e3.white, o.DEFAULT_ANSI_COLORS[7]), t3.ansi[8] = v(e3.brightBlack, o.DEFAULT_ANSI_COLORS[8]), t3.ansi[9] = v(e3.brightRed, o.DEFAULT_ANSI_COLORS[9]), t3.ansi[10] = v(e3.brightGreen, o.DEFAULT_ANSI_COLORS[10]), t3.ansi[11] = v(e3.brightYellow, o.DEFAULT_ANSI_COLORS[11]), t3.ansi[12] = v(e3.brightBlue, o.DEFAULT_ANSI_COLORS[12]), t3.ansi[13] = v(e3.brightMagenta, o.DEFAULT_ANSI_COLORS[13]), t3.ansi[14] = v(e3.brightCyan, o.DEFAULT_ANSI_COLORS[14]), t3.ansi[15] = v(e3.brightWhite, o.DEFAULT_ANSI_COLORS[15]), e3.extendedAnsi) {
              const i3 = Math.min(t3.ansi.length - 16, e3.extendedAnsi.length);
              for (let s3 = 0; s3 < i3; s3++) t3.ansi[s3 + 16] = v(e3.extendedAnsi[s3], o.DEFAULT_ANSI_COLORS[s3 + 16]);
            }
            this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
          }
          restoreColor(e3) {
            this._restoreColor(e3), this._onChangeColors.fire(this.colors);
          }
          _restoreColor(e3) {
            if (void 0 !== e3) switch (e3) {
              case 256:
                this._colors.foreground = this._restoreColors.foreground;
                break;
              case 257:
                this._colors.background = this._restoreColors.background;
                break;
              case 258:
                this._colors.cursor = this._restoreColors.cursor;
                break;
              default:
                this._colors.ansi[e3] = this._restoreColors.ansi[e3];
            }
            else for (let e4 = 0; e4 < this._restoreColors.ansi.length; ++e4) this._colors.ansi[e4] = this._restoreColors.ansi[e4];
          }
          modifyColors(e3) {
            e3(this._colors), this._onChangeColors.fire(this.colors);
          }
          _updateRestoreColors() {
            this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
          }
        };
        function v(e3, t3) {
          if (void 0 !== e3) try {
            return a.css.toColor(e3);
          } catch {
          }
          return t3;
        }
        t2.ThemeService = m, t2.ThemeService = m = s2([r(0, h.IOptionsService)], m);
      }, 5639: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CircularList = void 0;
        const s2 = i2(7150), r = i2(802);
        class n extends s2.Disposable {
          constructor(e3) {
            super(), this._maxLength = e3, this.onDeleteEmitter = this._register(new r.Emitter()), this.onDelete = this.onDeleteEmitter.event, this.onInsertEmitter = this._register(new r.Emitter()), this.onInsert = this.onInsertEmitter.event, this.onTrimEmitter = this._register(new r.Emitter()), this.onTrim = this.onTrimEmitter.event, this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
          }
          get maxLength() {
            return this._maxLength;
          }
          set maxLength(e3) {
            if (this._maxLength === e3) return;
            const t3 = new Array(e3);
            for (let i3 = 0; i3 < Math.min(e3, this.length); i3++) t3[i3] = this._array[this._getCyclicIndex(i3)];
            this._array = t3, this._maxLength = e3, this._startIndex = 0;
          }
          get length() {
            return this._length;
          }
          set length(e3) {
            if (e3 > this._length) for (let t3 = this._length; t3 < e3; t3++) this._array[t3] = void 0;
            this._length = e3;
          }
          get(e3) {
            return this._array[this._getCyclicIndex(e3)];
          }
          set(e3, t3) {
            this._array[this._getCyclicIndex(e3)] = t3;
          }
          push(e3) {
            this._array[this._getCyclicIndex(this._length)] = e3, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
          }
          recycle() {
            if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
            return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
          }
          get isFull() {
            return this._length === this._maxLength;
          }
          pop() {
            return this._array[this._getCyclicIndex(this._length-- - 1)];
          }
          splice(e3, t3, ...i3) {
            if (t3) {
              for (let i4 = e3; i4 < this._length - t3; i4++) this._array[this._getCyclicIndex(i4)] = this._array[this._getCyclicIndex(i4 + t3)];
              this._length -= t3, this.onDeleteEmitter.fire({ index: e3, amount: t3 });
            }
            for (let t4 = this._length - 1; t4 >= e3; t4--) this._array[this._getCyclicIndex(t4 + i3.length)] = this._array[this._getCyclicIndex(t4)];
            for (let t4 = 0; t4 < i3.length; t4++) this._array[this._getCyclicIndex(e3 + t4)] = i3[t4];
            if (i3.length && this.onInsertEmitter.fire({ index: e3, amount: i3.length }), this._length + i3.length > this._maxLength) {
              const e4 = this._length + i3.length - this._maxLength;
              this._startIndex += e4, this._length = this._maxLength, this.onTrimEmitter.fire(e4);
            } else this._length += i3.length;
          }
          trimStart(e3) {
            e3 > this._length && (e3 = this._length), this._startIndex += e3, this._length -= e3, this.onTrimEmitter.fire(e3);
          }
          shiftElements(e3, t3, i3) {
            if (!(t3 <= 0)) {
              if (e3 < 0 || e3 >= this._length) throw new Error("start argument out of range");
              if (e3 + i3 < 0) throw new Error("Cannot shift elements in list beyond index 0");
              if (i3 > 0) {
                for (let s4 = t3 - 1; s4 >= 0; s4--) this.set(e3 + s4 + i3, this.get(e3 + s4));
                const s3 = e3 + t3 + i3 - this._length;
                if (s3 > 0) for (this._length += s3; this._length > this._maxLength; ) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
              } else for (let s3 = 0; s3 < t3; s3++) this.set(e3 + s3 + i3, this.get(e3 + s3));
            }
          }
          _getCyclicIndex(e3) {
            return (this._startIndex + e3) % this._maxLength;
          }
        }
        t2.CircularList = n;
      }, 7453: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.clone = function e3(t3, i2 = 5) {
          if ("object" != typeof t3) return t3;
          const s2 = Array.isArray(t3) ? [] : {};
          for (const r in t3) s2[r] = i2 <= 1 ? t3[r] : t3[r] && e3(t3[r], i2 - 1);
          return s2;
        };
      }, 4103: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.rgba = t2.rgb = t2.css = t2.color = t2.channels = t2.NULL_COLOR = void 0, t2.toPaddedHex = d, t2.contrastRatio = u;
        let i2 = 0, s2 = 0, r = 0, n = 0;
        var o, a, l, h, c;
        function d(e3) {
          const t3 = e3.toString(16);
          return t3.length < 2 ? "0" + t3 : t3;
        }
        function u(e3, t3) {
          return e3 < t3 ? (t3 + 0.05) / (e3 + 0.05) : (e3 + 0.05) / (t3 + 0.05);
        }
        t2.NULL_COLOR = { css: "#00000000", rgba: 0 }, (function(e3) {
          e3.toCss = function(e4, t3, i3, s3) {
            return void 0 !== s3 ? `#${d(e4)}${d(t3)}${d(i3)}${d(s3)}` : `#${d(e4)}${d(t3)}${d(i3)}`;
          }, e3.toRgba = function(e4, t3, i3, s3 = 255) {
            return (e4 << 24 | t3 << 16 | i3 << 8 | s3) >>> 0;
          }, e3.toColor = function(t3, i3, s3, r2) {
            return { css: e3.toCss(t3, i3, s3, r2), rgba: e3.toRgba(t3, i3, s3, r2) };
          };
        })(o || (t2.channels = o = {})), (function(e3) {
          function t3(e4, t4) {
            return n = Math.round(255 * t4), [i2, s2, r] = c.toChannels(e4.rgba), { css: o.toCss(i2, s2, r, n), rgba: o.toRgba(i2, s2, r, n) };
          }
          e3.blend = function(e4, t4) {
            if (n = (255 & t4.rgba) / 255, 1 === n) return { css: t4.css, rgba: t4.rgba };
            const a2 = t4.rgba >> 24 & 255, l2 = t4.rgba >> 16 & 255, h2 = t4.rgba >> 8 & 255, c2 = e4.rgba >> 24 & 255, d2 = e4.rgba >> 16 & 255, u2 = e4.rgba >> 8 & 255;
            return i2 = c2 + Math.round((a2 - c2) * n), s2 = d2 + Math.round((l2 - d2) * n), r = u2 + Math.round((h2 - u2) * n), { css: o.toCss(i2, s2, r), rgba: o.toRgba(i2, s2, r) };
          }, e3.isOpaque = function(e4) {
            return !(255 & ~e4.rgba);
          }, e3.ensureContrastRatio = function(e4, t4, i3) {
            const s3 = c.ensureContrastRatio(e4.rgba, t4.rgba, i3);
            if (s3) return o.toColor(s3 >> 24 & 255, s3 >> 16 & 255, s3 >> 8 & 255);
          }, e3.opaque = function(e4) {
            const t4 = (255 | e4.rgba) >>> 0;
            return [i2, s2, r] = c.toChannels(t4), { css: o.toCss(i2, s2, r), rgba: t4 };
          }, e3.opacity = t3, e3.multiplyOpacity = function(e4, i3) {
            return n = 255 & e4.rgba, t3(e4, n * i3 / 255);
          }, e3.toColorRGB = function(e4) {
            return [e4.rgba >> 24 & 255, e4.rgba >> 16 & 255, e4.rgba >> 8 & 255];
          };
        })(a || (t2.color = a = {})), (function(e3) {
          let t3, a2;
          try {
            const e4 = document.createElement("canvas");
            e4.width = 1, e4.height = 1;
            const i3 = e4.getContext("2d", { willReadFrequently: true });
            i3 && (t3 = i3, t3.globalCompositeOperation = "copy", a2 = t3.createLinearGradient(0, 0, 1, 1));
          } catch {
          }
          e3.toColor = function(e4) {
            if (e4.match(/#[\da-f]{3,8}/i)) switch (e4.length) {
              case 4:
                return i2 = parseInt(e4.slice(1, 2).repeat(2), 16), s2 = parseInt(e4.slice(2, 3).repeat(2), 16), r = parseInt(e4.slice(3, 4).repeat(2), 16), o.toColor(i2, s2, r);
              case 5:
                return i2 = parseInt(e4.slice(1, 2).repeat(2), 16), s2 = parseInt(e4.slice(2, 3).repeat(2), 16), r = parseInt(e4.slice(3, 4).repeat(2), 16), n = parseInt(e4.slice(4, 5).repeat(2), 16), o.toColor(i2, s2, r, n);
              case 7:
                return { css: e4, rgba: (parseInt(e4.slice(1), 16) << 8 | 255) >>> 0 };
              case 9:
                return { css: e4, rgba: parseInt(e4.slice(1), 16) >>> 0 };
            }
            const l2 = e4.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
            if (l2) return i2 = parseInt(l2[1]), s2 = parseInt(l2[2]), r = parseInt(l2[3]), n = Math.round(255 * (void 0 === l2[5] ? 1 : parseFloat(l2[5]))), o.toColor(i2, s2, r, n);
            if (!t3 || !a2) throw new Error("css.toColor: Unsupported css format");
            if (t3.fillStyle = a2, t3.fillStyle = e4, "string" != typeof t3.fillStyle) throw new Error("css.toColor: Unsupported css format");
            if (t3.fillRect(0, 0, 1, 1), [i2, s2, r, n] = t3.getImageData(0, 0, 1, 1).data, 255 !== n) throw new Error("css.toColor: Unsupported css format");
            return { rgba: o.toRgba(i2, s2, r, n), css: e4 };
          };
        })(l || (t2.css = l = {})), (function(e3) {
          function t3(e4, t4, i3) {
            const s3 = e4 / 255, r2 = t4 / 255, n2 = i3 / 255;
            return 0.2126 * (s3 <= 0.03928 ? s3 / 12.92 : Math.pow((s3 + 0.055) / 1.055, 2.4)) + 0.7152 * (r2 <= 0.03928 ? r2 / 12.92 : Math.pow((r2 + 0.055) / 1.055, 2.4)) + 0.0722 * (n2 <= 0.03928 ? n2 / 12.92 : Math.pow((n2 + 0.055) / 1.055, 2.4));
          }
          e3.relativeLuminance = function(e4) {
            return t3(e4 >> 16 & 255, e4 >> 8 & 255, 255 & e4);
          }, e3.relativeLuminance2 = t3;
        })(h || (t2.rgb = h = {})), (function(e3) {
          function t3(e4, t4, i3) {
            const s3 = e4 >> 24 & 255, r2 = e4 >> 16 & 255, n2 = e4 >> 8 & 255;
            let o2 = t4 >> 24 & 255, a3 = t4 >> 16 & 255, l2 = t4 >> 8 & 255, c2 = u(h.relativeLuminance2(o2, a3, l2), h.relativeLuminance2(s3, r2, n2));
            for (; c2 < i3 && (o2 > 0 || a3 > 0 || l2 > 0); ) o2 -= Math.max(0, Math.ceil(0.1 * o2)), a3 -= Math.max(0, Math.ceil(0.1 * a3)), l2 -= Math.max(0, Math.ceil(0.1 * l2)), c2 = u(h.relativeLuminance2(o2, a3, l2), h.relativeLuminance2(s3, r2, n2));
            return (o2 << 24 | a3 << 16 | l2 << 8 | 255) >>> 0;
          }
          function a2(e4, t4, i3) {
            const s3 = e4 >> 24 & 255, r2 = e4 >> 16 & 255, n2 = e4 >> 8 & 255;
            let o2 = t4 >> 24 & 255, a3 = t4 >> 16 & 255, l2 = t4 >> 8 & 255, c2 = u(h.relativeLuminance2(o2, a3, l2), h.relativeLuminance2(s3, r2, n2));
            for (; c2 < i3 && (o2 < 255 || a3 < 255 || l2 < 255); ) o2 = Math.min(255, o2 + Math.ceil(0.1 * (255 - o2))), a3 = Math.min(255, a3 + Math.ceil(0.1 * (255 - a3))), l2 = Math.min(255, l2 + Math.ceil(0.1 * (255 - l2))), c2 = u(h.relativeLuminance2(o2, a3, l2), h.relativeLuminance2(s3, r2, n2));
            return (o2 << 24 | a3 << 16 | l2 << 8 | 255) >>> 0;
          }
          e3.blend = function(e4, t4) {
            if (n = (255 & t4) / 255, 1 === n) return t4;
            const a3 = t4 >> 24 & 255, l2 = t4 >> 16 & 255, h2 = t4 >> 8 & 255, c2 = e4 >> 24 & 255, d2 = e4 >> 16 & 255, u2 = e4 >> 8 & 255;
            return i2 = c2 + Math.round((a3 - c2) * n), s2 = d2 + Math.round((l2 - d2) * n), r = u2 + Math.round((h2 - u2) * n), o.toRgba(i2, s2, r);
          }, e3.ensureContrastRatio = function(e4, i3, s3) {
            const r2 = h.relativeLuminance(e4 >> 8), n2 = h.relativeLuminance(i3 >> 8);
            if (u(r2, n2) < s3) {
              if (n2 < r2) {
                const n3 = t3(e4, i3, s3), o3 = u(r2, h.relativeLuminance(n3 >> 8));
                if (o3 < s3) {
                  const t4 = a2(e4, i3, s3);
                  return o3 > u(r2, h.relativeLuminance(t4 >> 8)) ? n3 : t4;
                }
                return n3;
              }
              const o2 = a2(e4, i3, s3), l2 = u(r2, h.relativeLuminance(o2 >> 8));
              if (l2 < s3) {
                const n3 = t3(e4, i3, s3);
                return l2 > u(r2, h.relativeLuminance(n3 >> 8)) ? o2 : n3;
              }
              return o2;
            }
          }, e3.reduceLuminance = t3, e3.increaseLuminance = a2, e3.toChannels = function(e4) {
            return [e4 >> 24 & 255, e4 >> 16 & 255, e4 >> 8 & 255, 255 & e4];
          };
        })(c || (t2.rgba = c = {}));
      }, 5777: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreTerminal = void 0;
        const s2 = i2(6501), r = i2(6025), n = i2(7276), o = i2(9640), a = i2(56), l = i2(4071), h = i2(7792), c = i2(6415), d = i2(5746), u = i2(5882), _ = i2(2486), f = i2(3562), p = i2(8811), g = i2(802), m = i2(7150);
        let v = false;
        class S extends m.Disposable {
          get onScroll() {
            return this._onScrollApi || (this._onScrollApi = this._register(new g.Emitter()), this._onScroll.event(((e3) => {
              this._onScrollApi?.fire(e3.position);
            }))), this._onScrollApi.event;
          }
          get cols() {
            return this._bufferService.cols;
          }
          get rows() {
            return this._bufferService.rows;
          }
          get buffers() {
            return this._bufferService.buffers;
          }
          get options() {
            return this.optionsService.options;
          }
          set options(e3) {
            for (const t3 in e3) this.optionsService.options[t3] = e3[t3];
          }
          constructor(e3) {
            super(), this._windowsWrappingHeuristics = this._register(new m.MutableDisposable()), this._onBinary = this._register(new g.Emitter()), this.onBinary = this._onBinary.event, this._onData = this._register(new g.Emitter()), this.onData = this._onData.event, this._onLineFeed = this._register(new g.Emitter()), this.onLineFeed = this._onLineFeed.event, this._onResize = this._register(new g.Emitter()), this.onResize = this._onResize.event, this._onWriteParsed = this._register(new g.Emitter()), this.onWriteParsed = this._onWriteParsed.event, this._onScroll = this._register(new g.Emitter()), this._instantiationService = new r.InstantiationService(), this.optionsService = this._register(new a.OptionsService(e3)), this._instantiationService.setService(s2.IOptionsService, this.optionsService), this._bufferService = this._register(this._instantiationService.createInstance(o.BufferService)), this._instantiationService.setService(s2.IBufferService, this._bufferService), this._logService = this._register(this._instantiationService.createInstance(n.LogService)), this._instantiationService.setService(s2.ILogService, this._logService), this.coreService = this._register(this._instantiationService.createInstance(l.CoreService)), this._instantiationService.setService(s2.ICoreService, this.coreService), this.coreMouseService = this._register(this._instantiationService.createInstance(h.CoreMouseService)), this._instantiationService.setService(s2.ICoreMouseService, this.coreMouseService), this.unicodeService = this._register(this._instantiationService.createInstance(c.UnicodeService)), this._instantiationService.setService(s2.IUnicodeService, this.unicodeService), this._charsetService = this._instantiationService.createInstance(d.CharsetService), this._instantiationService.setService(s2.ICharsetService, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(p.OscLinkService), this._instantiationService.setService(s2.IOscLinkService, this._oscLinkService), this._inputHandler = this._register(new _.InputHandler(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this._register(g.Event.forward(this._inputHandler.onLineFeed, this._onLineFeed)), this._register(this._inputHandler), this._register(g.Event.forward(this._bufferService.onResize, this._onResize)), this._register(g.Event.forward(this.coreService.onData, this._onData)), this._register(g.Event.forward(this.coreService.onBinary, this._onBinary)), this._register(this.coreService.onRequestScrollToBottom((() => this.scrollToBottom(true)))), this._register(this.coreService.onUserInput((() => this._writeBuffer.handleUserInput()))), this._register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], (() => this._handleWindowsPtyOptionChange()))), this._register(this._bufferService.onScroll((() => {
              this._onScroll.fire({ position: this._bufferService.buffer.ydisp }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
            }))), this._writeBuffer = this._register(new f.WriteBuffer(((e4, t3) => this._inputHandler.parse(e4, t3)))), this._register(g.Event.forward(this._writeBuffer.onWriteParsed, this._onWriteParsed));
          }
          write(e3, t3) {
            this._writeBuffer.write(e3, t3);
          }
          writeSync(e3, t3) {
            this._logService.logLevel <= s2.LogLevelEnum.WARN && !v && (this._logService.warn("writeSync is unreliable and will be removed soon."), v = true), this._writeBuffer.writeSync(e3, t3);
          }
          input(e3, t3 = true) {
            this.coreService.triggerDataEvent(e3, t3);
          }
          resize(e3, t3) {
            isNaN(e3) || isNaN(t3) || (e3 = Math.max(e3, o.MINIMUM_COLS), t3 = Math.max(t3, o.MINIMUM_ROWS), this._bufferService.resize(e3, t3));
          }
          scroll(e3, t3 = false) {
            this._bufferService.scroll(e3, t3);
          }
          scrollLines(e3, t3) {
            this._bufferService.scrollLines(e3, t3);
          }
          scrollPages(e3) {
            this.scrollLines(e3 * (this.rows - 1));
          }
          scrollToTop() {
            this.scrollLines(-this._bufferService.buffer.ydisp);
          }
          scrollToBottom(e3) {
            this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
          }
          scrollToLine(e3) {
            const t3 = e3 - this._bufferService.buffer.ydisp;
            0 !== t3 && this.scrollLines(t3);
          }
          registerEscHandler(e3, t3) {
            return this._inputHandler.registerEscHandler(e3, t3);
          }
          registerDcsHandler(e3, t3) {
            return this._inputHandler.registerDcsHandler(e3, t3);
          }
          registerCsiHandler(e3, t3) {
            return this._inputHandler.registerCsiHandler(e3, t3);
          }
          registerOscHandler(e3, t3) {
            return this._inputHandler.registerOscHandler(e3, t3);
          }
          _setup() {
            this._handleWindowsPtyOptionChange();
          }
          reset() {
            this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
          }
          _handleWindowsPtyOptionChange() {
            let e3 = false;
            const t3 = this.optionsService.rawOptions.windowsPty;
            t3 && void 0 !== t3.buildNumber && void 0 !== t3.buildNumber ? e3 = !!("conpty" === t3.backend && t3.buildNumber < 21376) : this.optionsService.rawOptions.windowsMode && (e3 = true), e3 ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
          }
          _enableWindowsWrappingHeuristics() {
            if (!this._windowsWrappingHeuristics.value) {
              const e3 = [];
              e3.push(this.onLineFeed(u.updateWindowsModeWrappedState.bind(null, this._bufferService))), e3.push(this.registerCsiHandler({ final: "H" }, (() => ((0, u.updateWindowsModeWrappedState)(this._bufferService), false)))), this._windowsWrappingHeuristics.value = (0, m.toDisposable)((() => {
                for (const t3 of e3) t3.dispose();
              }));
            }
          }
        }
        t2.CoreTerminal = S;
      }, 2486: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.InputHandler = t2.WindowsOptionsReportType = void 0, t2.isValidColorIndex = R;
        const n = i2(3534), o = i2(6760), a = i2(6717), l = i2(7150), h = i2(726), c = i2(6107), d = i2(8938), u = i2(3055), _ = i2(5451), f = i2(6501), p = i2(6415), g = i2(1346), m = i2(9823), v = i2(8693), S = i2(802), b = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 }, C = 131072;
        function y(e3, t3) {
          if (e3 > 24) return t3.setWinLines || false;
          switch (e3) {
            case 1:
              return !!t3.restoreWin;
            case 2:
              return !!t3.minimizeWin;
            case 3:
              return !!t3.setWinPosition;
            case 4:
              return !!t3.setWinSizePixels;
            case 5:
              return !!t3.raiseWin;
            case 6:
              return !!t3.lowerWin;
            case 7:
              return !!t3.refreshWin;
            case 8:
              return !!t3.setWinSizeChars;
            case 9:
              return !!t3.maximizeWin;
            case 10:
              return !!t3.fullscreenWin;
            case 11:
              return !!t3.getWinState;
            case 13:
              return !!t3.getWinPosition;
            case 14:
              return !!t3.getWinSizePixels;
            case 15:
              return !!t3.getScreenSizePixels;
            case 16:
              return !!t3.getCellSizePixels;
            case 18:
              return !!t3.getWinSizeChars;
            case 19:
              return !!t3.getScreenSizeChars;
            case 20:
              return !!t3.getIconTitle;
            case 21:
              return !!t3.getWinTitle;
            case 22:
              return !!t3.pushTitle;
            case 23:
              return !!t3.popTitle;
            case 24:
              return !!t3.setWinLines;
          }
          return false;
        }
        var w;
        !(function(e3) {
          e3[e3.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS", e3[e3.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
        })(w || (t2.WindowsOptionsReportType = w = {}));
        let E = 0;
        class D extends l.Disposable {
          getAttrData() {
            return this._curAttrData;
          }
          constructor(e3, t3, i3, s3, r2, l2, d2, u2, _2 = new a.EscapeSequenceParser()) {
            super(), this._bufferService = e3, this._charsetService = t3, this._coreService = i3, this._logService = s3, this._optionsService = r2, this._oscLinkService = l2, this._coreMouseService = d2, this._unicodeService = u2, this._parser = _2, this._parseBuffer = new Uint32Array(4096), this._stringDecoder = new h.StringToUtf32(), this._utf8Decoder = new h.Utf8ToUtf32(), this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = c.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = c.DEFAULT_ATTR_DATA.clone(), this._onRequestBell = this._register(new S.Emitter()), this.onRequestBell = this._onRequestBell.event, this._onRequestRefreshRows = this._register(new S.Emitter()), this.onRequestRefreshRows = this._onRequestRefreshRows.event, this._onRequestReset = this._register(new S.Emitter()), this.onRequestReset = this._onRequestReset.event, this._onRequestSendFocus = this._register(new S.Emitter()), this.onRequestSendFocus = this._onRequestSendFocus.event, this._onRequestSyncScrollBar = this._register(new S.Emitter()), this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event, this._onRequestWindowsOptionsReport = this._register(new S.Emitter()), this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event, this._onA11yChar = this._register(new S.Emitter()), this.onA11yChar = this._onA11yChar.event, this._onA11yTab = this._register(new S.Emitter()), this.onA11yTab = this._onA11yTab.event, this._onCursorMove = this._register(new S.Emitter()), this.onCursorMove = this._onCursorMove.event, this._onLineFeed = this._register(new S.Emitter()), this.onLineFeed = this._onLineFeed.event, this._onScroll = this._register(new S.Emitter()), this.onScroll = this._onScroll.event, this._onTitleChange = this._register(new S.Emitter()), this.onTitleChange = this._onTitleChange.event, this._onColor = this._register(new S.Emitter()), this.onColor = this._onColor.event, this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 }, this._specialColors = [256, 257, 258], this._register(this._parser), this._dirtyRowTracker = new L(this._bufferService), this._activeBuffer = this._bufferService.buffer, this._register(this._bufferService.buffers.onBufferActivate(((e4) => this._activeBuffer = e4.activeBuffer))), this._parser.setCsiHandlerFallback(((e4, t4) => {
              this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(e4), params: t4.toArray() });
            })), this._parser.setEscHandlerFallback(((e4) => {
              this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(e4) });
            })), this._parser.setExecuteHandlerFallback(((e4) => {
              this._logService.debug("Unknown EXECUTE code: ", { code: e4 });
            })), this._parser.setOscHandlerFallback(((e4, t4, i4) => {
              this._logService.debug("Unknown OSC code: ", { identifier: e4, action: t4, data: i4 });
            })), this._parser.setDcsHandlerFallback(((e4, t4, i4) => {
              "HOOK" === t4 && (i4 = i4.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(e4), action: t4, payload: i4 });
            })), this._parser.setPrintHandler(((e4, t4, i4) => this.print(e4, t4, i4))), this._parser.registerCsiHandler({ final: "@" }, ((e4) => this.insertChars(e4))), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, ((e4) => this.scrollLeft(e4))), this._parser.registerCsiHandler({ final: "A" }, ((e4) => this.cursorUp(e4))), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, ((e4) => this.scrollRight(e4))), this._parser.registerCsiHandler({ final: "B" }, ((e4) => this.cursorDown(e4))), this._parser.registerCsiHandler({ final: "C" }, ((e4) => this.cursorForward(e4))), this._parser.registerCsiHandler({ final: "D" }, ((e4) => this.cursorBackward(e4))), this._parser.registerCsiHandler({ final: "E" }, ((e4) => this.cursorNextLine(e4))), this._parser.registerCsiHandler({ final: "F" }, ((e4) => this.cursorPrecedingLine(e4))), this._parser.registerCsiHandler({ final: "G" }, ((e4) => this.cursorCharAbsolute(e4))), this._parser.registerCsiHandler({ final: "H" }, ((e4) => this.cursorPosition(e4))), this._parser.registerCsiHandler({ final: "I" }, ((e4) => this.cursorForwardTab(e4))), this._parser.registerCsiHandler({ final: "J" }, ((e4) => this.eraseInDisplay(e4, false))), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, ((e4) => this.eraseInDisplay(e4, true))), this._parser.registerCsiHandler({ final: "K" }, ((e4) => this.eraseInLine(e4, false))), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, ((e4) => this.eraseInLine(e4, true))), this._parser.registerCsiHandler({ final: "L" }, ((e4) => this.insertLines(e4))), this._parser.registerCsiHandler({ final: "M" }, ((e4) => this.deleteLines(e4))), this._parser.registerCsiHandler({ final: "P" }, ((e4) => this.deleteChars(e4))), this._parser.registerCsiHandler({ final: "S" }, ((e4) => this.scrollUp(e4))), this._parser.registerCsiHandler({ final: "T" }, ((e4) => this.scrollDown(e4))), this._parser.registerCsiHandler({ final: "X" }, ((e4) => this.eraseChars(e4))), this._parser.registerCsiHandler({ final: "Z" }, ((e4) => this.cursorBackwardTab(e4))), this._parser.registerCsiHandler({ final: "`" }, ((e4) => this.charPosAbsolute(e4))), this._parser.registerCsiHandler({ final: "a" }, ((e4) => this.hPositionRelative(e4))), this._parser.registerCsiHandler({ final: "b" }, ((e4) => this.repeatPrecedingCharacter(e4))), this._parser.registerCsiHandler({ final: "c" }, ((e4) => this.sendDeviceAttributesPrimary(e4))), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, ((e4) => this.sendDeviceAttributesSecondary(e4))), this._parser.registerCsiHandler({ final: "d" }, ((e4) => this.linePosAbsolute(e4))), this._parser.registerCsiHandler({ final: "e" }, ((e4) => this.vPositionRelative(e4))), this._parser.registerCsiHandler({ final: "f" }, ((e4) => this.hVPosition(e4))), this._parser.registerCsiHandler({ final: "g" }, ((e4) => this.tabClear(e4))), this._parser.registerCsiHandler({ final: "h" }, ((e4) => this.setMode(e4))), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, ((e4) => this.setModePrivate(e4))), this._parser.registerCsiHandler({ final: "l" }, ((e4) => this.resetMode(e4))), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, ((e4) => this.resetModePrivate(e4))), this._parser.registerCsiHandler({ final: "m" }, ((e4) => this.charAttributes(e4))), this._parser.registerCsiHandler({ final: "n" }, ((e4) => this.deviceStatus(e4))), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, ((e4) => this.deviceStatusPrivate(e4))), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, ((e4) => this.softReset(e4))), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, ((e4) => this.setCursorStyle(e4))), this._parser.registerCsiHandler({ final: "r" }, ((e4) => this.setScrollRegion(e4))), this._parser.registerCsiHandler({ final: "s" }, ((e4) => this.saveCursor(e4))), this._parser.registerCsiHandler({ final: "t" }, ((e4) => this.windowOptions(e4))), this._parser.registerCsiHandler({ final: "u" }, ((e4) => this.restoreCursor(e4))), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, ((e4) => this.insertColumns(e4))), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, ((e4) => this.deleteColumns(e4))), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, ((e4) => this.selectProtected(e4))), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, ((e4) => this.requestMode(e4, true))), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, ((e4) => this.requestMode(e4, false))), this._parser.setExecuteHandler(n.C0.BEL, (() => this.bell())), this._parser.setExecuteHandler(n.C0.LF, (() => this.lineFeed())), this._parser.setExecuteHandler(n.C0.VT, (() => this.lineFeed())), this._parser.setExecuteHandler(n.C0.FF, (() => this.lineFeed())), this._parser.setExecuteHandler(n.C0.CR, (() => this.carriageReturn())), this._parser.setExecuteHandler(n.C0.BS, (() => this.backspace())), this._parser.setExecuteHandler(n.C0.HT, (() => this.tab())), this._parser.setExecuteHandler(n.C0.SO, (() => this.shiftOut())), this._parser.setExecuteHandler(n.C0.SI, (() => this.shiftIn())), this._parser.setExecuteHandler(n.C1.IND, (() => this.index())), this._parser.setExecuteHandler(n.C1.NEL, (() => this.nextLine())), this._parser.setExecuteHandler(n.C1.HTS, (() => this.tabSet())), this._parser.registerOscHandler(0, new g.OscHandler(((e4) => (this.setTitle(e4), this.setIconName(e4), true)))), this._parser.registerOscHandler(1, new g.OscHandler(((e4) => this.setIconName(e4)))), this._parser.registerOscHandler(2, new g.OscHandler(((e4) => this.setTitle(e4)))), this._parser.registerOscHandler(4, new g.OscHandler(((e4) => this.setOrReportIndexedColor(e4)))), this._parser.registerOscHandler(8, new g.OscHandler(((e4) => this.setHyperlink(e4)))), this._parser.registerOscHandler(10, new g.OscHandler(((e4) => this.setOrReportFgColor(e4)))), this._parser.registerOscHandler(11, new g.OscHandler(((e4) => this.setOrReportBgColor(e4)))), this._parser.registerOscHandler(12, new g.OscHandler(((e4) => this.setOrReportCursorColor(e4)))), this._parser.registerOscHandler(104, new g.OscHandler(((e4) => this.restoreIndexedColor(e4)))), this._parser.registerOscHandler(110, new g.OscHandler(((e4) => this.restoreFgColor(e4)))), this._parser.registerOscHandler(111, new g.OscHandler(((e4) => this.restoreBgColor(e4)))), this._parser.registerOscHandler(112, new g.OscHandler(((e4) => this.restoreCursorColor(e4)))), this._parser.registerEscHandler({ final: "7" }, (() => this.saveCursor())), this._parser.registerEscHandler({ final: "8" }, (() => this.restoreCursor())), this._parser.registerEscHandler({ final: "D" }, (() => this.index())), this._parser.registerEscHandler({ final: "E" }, (() => this.nextLine())), this._parser.registerEscHandler({ final: "H" }, (() => this.tabSet())), this._parser.registerEscHandler({ final: "M" }, (() => this.reverseIndex())), this._parser.registerEscHandler({ final: "=" }, (() => this.keypadApplicationMode())), this._parser.registerEscHandler({ final: ">" }, (() => this.keypadNumericMode())), this._parser.registerEscHandler({ final: "c" }, (() => this.fullReset())), this._parser.registerEscHandler({ final: "n" }, (() => this.setgLevel(2))), this._parser.registerEscHandler({ final: "o" }, (() => this.setgLevel(3))), this._parser.registerEscHandler({ final: "|" }, (() => this.setgLevel(3))), this._parser.registerEscHandler({ final: "}" }, (() => this.setgLevel(2))), this._parser.registerEscHandler({ final: "~" }, (() => this.setgLevel(1))), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, (() => this.selectDefaultCharset())), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, (() => this.selectDefaultCharset()));
            for (const e4 in o.CHARSETS) this._parser.registerEscHandler({ intermediates: "(", final: e4 }, (() => this.selectCharset("(" + e4))), this._parser.registerEscHandler({ intermediates: ")", final: e4 }, (() => this.selectCharset(")" + e4))), this._parser.registerEscHandler({ intermediates: "*", final: e4 }, (() => this.selectCharset("*" + e4))), this._parser.registerEscHandler({ intermediates: "+", final: e4 }, (() => this.selectCharset("+" + e4))), this._parser.registerEscHandler({ intermediates: "-", final: e4 }, (() => this.selectCharset("-" + e4))), this._parser.registerEscHandler({ intermediates: ".", final: e4 }, (() => this.selectCharset("." + e4))), this._parser.registerEscHandler({ intermediates: "/", final: e4 }, (() => this.selectCharset("/" + e4)));
            this._parser.registerEscHandler({ intermediates: "#", final: "8" }, (() => this.screenAlignmentPattern())), this._parser.setErrorHandler(((e4) => (this._logService.error("Parsing error: ", e4), e4))), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new m.DcsHandler(((e4, t4) => this.requestStatusString(e4, t4))));
          }
          _preserveStack(e3, t3, i3, s3) {
            this._parseStack.paused = true, this._parseStack.cursorStartX = e3, this._parseStack.cursorStartY = t3, this._parseStack.decodedLength = i3, this._parseStack.position = s3;
          }
          _logSlowResolvingAsync(e3) {
            this._logService.logLevel <= f.LogLevelEnum.WARN && Promise.race([e3, new Promise(((e4, t3) => setTimeout((() => t3("#SLOW_TIMEOUT")), 5e3)))]).catch(((e4) => {
              if ("#SLOW_TIMEOUT" !== e4) throw e4;
              console.warn("async parser handler taking longer than 5000 ms");
            }));
          }
          _getCurrentLinkId() {
            return this._curAttrData.extended.urlId;
          }
          parse(e3, t3) {
            let i3, s3 = this._activeBuffer.x, r2 = this._activeBuffer.y, n2 = 0;
            const o2 = this._parseStack.paused;
            if (o2) {
              if (i3 = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, t3)) return this._logSlowResolvingAsync(i3), i3;
              s3 = this._parseStack.cursorStartX, r2 = this._parseStack.cursorStartY, this._parseStack.paused = false, e3.length > C && (n2 = this._parseStack.position + C);
            }
            if (this._logService.logLevel <= f.LogLevelEnum.DEBUG && this._logService.debug("parsing data " + ("string" == typeof e3 ? ` "${e3}"` : ` "${Array.prototype.map.call(e3, ((e4) => String.fromCharCode(e4))).join("")}"`)), this._logService.logLevel === f.LogLevelEnum.TRACE && this._logService.trace("parsing data (codes)", "string" == typeof e3 ? e3.split("").map(((e4) => e4.charCodeAt(0))) : e3), this._parseBuffer.length < e3.length && this._parseBuffer.length < C && (this._parseBuffer = new Uint32Array(Math.min(e3.length, C))), o2 || this._dirtyRowTracker.clearRange(), e3.length > C) for (let t4 = n2; t4 < e3.length; t4 += C) {
              const n3 = t4 + C < e3.length ? t4 + C : e3.length, o3 = "string" == typeof e3 ? this._stringDecoder.decode(e3.substring(t4, n3), this._parseBuffer) : this._utf8Decoder.decode(e3.subarray(t4, n3), this._parseBuffer);
              if (i3 = this._parser.parse(this._parseBuffer, o3)) return this._preserveStack(s3, r2, o3, t4), this._logSlowResolvingAsync(i3), i3;
            }
            else if (!o2) {
              const t4 = "string" == typeof e3 ? this._stringDecoder.decode(e3, this._parseBuffer) : this._utf8Decoder.decode(e3, this._parseBuffer);
              if (i3 = this._parser.parse(this._parseBuffer, t4)) return this._preserveStack(s3, r2, t4, 0), this._logSlowResolvingAsync(i3), i3;
            }
            this._activeBuffer.x === s3 && this._activeBuffer.y === r2 || this._onCursorMove.fire();
            const a2 = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), l2 = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
            l2 < this._bufferService.rows && this._onRequestRefreshRows.fire({ start: Math.min(l2, this._bufferService.rows - 1), end: Math.min(a2, this._bufferService.rows - 1) });
          }
          print(e3, t3, i3) {
            let s3, r2;
            const n2 = this._charsetService.charset, o2 = this._optionsService.rawOptions.screenReaderMode, a2 = this._bufferService.cols, l2 = this._coreService.decPrivateModes.wraparound, u2 = this._coreService.modes.insertMode, _2 = this._curAttrData;
            let f2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && i3 - t3 > 0 && 2 === f2.getWidth(this._activeBuffer.x - 1) && f2.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, _2);
            let g2 = this._parser.precedingJoinState;
            for (let m2 = t3; m2 < i3; ++m2) {
              if (s3 = e3[m2], s3 < 127 && n2) {
                const e4 = n2[String.fromCharCode(s3)];
                e4 && (s3 = e4.charCodeAt(0));
              }
              const t4 = this._unicodeService.charProperties(s3, g2);
              r2 = p.UnicodeService.extractWidth(t4);
              const i4 = p.UnicodeService.extractShouldJoin(t4), v2 = i4 ? p.UnicodeService.extractWidth(g2) : 0;
              if (g2 = t4, o2 && this._onA11yChar.fire((0, h.stringFromCodePoint)(s3)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + r2 - v2 > a2) {
                if (l2) {
                  const e4 = f2;
                  let t5 = this._activeBuffer.x - v2;
                  for (this._activeBuffer.x = v2, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), f2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), v2 > 0 && f2 instanceof c.BufferLine && f2.copyCellsFrom(e4, t5, 0, v2, false); t5 < a2; ) e4.setCellFromCodepoint(t5++, 0, 1, _2);
                } else if (this._activeBuffer.x = a2 - 1, 2 === r2) continue;
              }
              if (i4 && this._activeBuffer.x) {
                const e4 = f2.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
                f2.addCodepointToCell(this._activeBuffer.x - e4, s3, r2);
                for (let e5 = r2 - v2; --e5 >= 0; ) f2.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, _2);
              } else if (u2 && (f2.insertCells(this._activeBuffer.x, r2 - v2, this._activeBuffer.getNullCell(_2)), 2 === f2.getWidth(a2 - 1) && f2.setCellFromCodepoint(a2 - 1, d.NULL_CELL_CODE, d.NULL_CELL_WIDTH, _2)), f2.setCellFromCodepoint(this._activeBuffer.x++, s3, r2, _2), r2 > 0) for (; --r2; ) f2.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, _2);
            }
            this._parser.precedingJoinState = g2, this._activeBuffer.x < a2 && i3 - t3 > 0 && 0 === f2.getWidth(this._activeBuffer.x) && !f2.hasContent(this._activeBuffer.x) && f2.setCellFromCodepoint(this._activeBuffer.x, 0, 1, _2), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
          }
          registerCsiHandler(e3, t3) {
            return "t" !== e3.final || e3.prefix || e3.intermediates ? this._parser.registerCsiHandler(e3, t3) : this._parser.registerCsiHandler(e3, ((e4) => !y(e4.params[0], this._optionsService.rawOptions.windowOptions) || t3(e4)));
          }
          registerDcsHandler(e3, t3) {
            return this._parser.registerDcsHandler(e3, new m.DcsHandler(t3));
          }
          registerEscHandler(e3, t3) {
            return this._parser.registerEscHandler(e3, t3);
          }
          registerOscHandler(e3, t3) {
            return this._parser.registerOscHandler(e3, new g.OscHandler(t3));
          }
          bell() {
            return this._onRequestBell.fire(), true;
          }
          lineFeed() {
            return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
          }
          carriageReturn() {
            return this._activeBuffer.x = 0, true;
          }
          backspace() {
            if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
            if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
            else if (0 === this._activeBuffer.x && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
              this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
              const e3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
              e3.hasWidth(this._activeBuffer.x) && !e3.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
            }
            return this._restrictCursor(), true;
          }
          tab() {
            if (this._activeBuffer.x >= this._bufferService.cols) return true;
            const e3 = this._activeBuffer.x;
            return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e3), true;
          }
          shiftOut() {
            return this._charsetService.setgLevel(1), true;
          }
          shiftIn() {
            return this._charsetService.setgLevel(0), true;
          }
          _restrictCursor(e3 = this._bufferService.cols - 1) {
            this._activeBuffer.x = Math.min(e3, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
          }
          _setCursor(e3, t3) {
            this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e3, this._activeBuffer.y = this._activeBuffer.scrollTop + t3) : (this._activeBuffer.x = e3, this._activeBuffer.y = t3), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
          }
          _moveCursor(e3, t3) {
            this._restrictCursor(), this._setCursor(this._activeBuffer.x + e3, this._activeBuffer.y + t3);
          }
          cursorUp(e3) {
            const t3 = this._activeBuffer.y - this._activeBuffer.scrollTop;
            return t3 >= 0 ? this._moveCursor(0, -Math.min(t3, e3.params[0] || 1)) : this._moveCursor(0, -(e3.params[0] || 1)), true;
          }
          cursorDown(e3) {
            const t3 = this._activeBuffer.scrollBottom - this._activeBuffer.y;
            return t3 >= 0 ? this._moveCursor(0, Math.min(t3, e3.params[0] || 1)) : this._moveCursor(0, e3.params[0] || 1), true;
          }
          cursorForward(e3) {
            return this._moveCursor(e3.params[0] || 1, 0), true;
          }
          cursorBackward(e3) {
            return this._moveCursor(-(e3.params[0] || 1), 0), true;
          }
          cursorNextLine(e3) {
            return this.cursorDown(e3), this._activeBuffer.x = 0, true;
          }
          cursorPrecedingLine(e3) {
            return this.cursorUp(e3), this._activeBuffer.x = 0, true;
          }
          cursorCharAbsolute(e3) {
            return this._setCursor((e3.params[0] || 1) - 1, this._activeBuffer.y), true;
          }
          cursorPosition(e3) {
            return this._setCursor(e3.length >= 2 ? (e3.params[1] || 1) - 1 : 0, (e3.params[0] || 1) - 1), true;
          }
          charPosAbsolute(e3) {
            return this._setCursor((e3.params[0] || 1) - 1, this._activeBuffer.y), true;
          }
          hPositionRelative(e3) {
            return this._moveCursor(e3.params[0] || 1, 0), true;
          }
          linePosAbsolute(e3) {
            return this._setCursor(this._activeBuffer.x, (e3.params[0] || 1) - 1), true;
          }
          vPositionRelative(e3) {
            return this._moveCursor(0, e3.params[0] || 1), true;
          }
          hVPosition(e3) {
            return this.cursorPosition(e3), true;
          }
          tabClear(e3) {
            const t3 = e3.params[0];
            return 0 === t3 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : 3 === t3 && (this._activeBuffer.tabs = {}), true;
          }
          cursorForwardTab(e3) {
            if (this._activeBuffer.x >= this._bufferService.cols) return true;
            let t3 = e3.params[0] || 1;
            for (; t3--; ) this._activeBuffer.x = this._activeBuffer.nextStop();
            return true;
          }
          cursorBackwardTab(e3) {
            if (this._activeBuffer.x >= this._bufferService.cols) return true;
            let t3 = e3.params[0] || 1;
            for (; t3--; ) this._activeBuffer.x = this._activeBuffer.prevStop();
            return true;
          }
          selectProtected(e3) {
            const t3 = e3.params[0];
            return 1 === t3 && (this._curAttrData.bg |= 536870912), 2 !== t3 && 0 !== t3 || (this._curAttrData.bg &= -536870913), true;
          }
          _eraseInBufferLine(e3, t3, i3, s3 = false, r2 = false) {
            const n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e3);
            n2.replaceCells(t3, i3, this._activeBuffer.getNullCell(this._eraseAttrData()), r2), s3 && (n2.isWrapped = false);
          }
          _resetBufferLine(e3, t3 = false) {
            const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e3);
            i3 && (i3.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), t3), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e3), i3.isWrapped = false);
          }
          eraseInDisplay(e3, t3 = false) {
            let i3;
            switch (this._restrictCursor(this._bufferService.cols), e3.params[0]) {
              case 0:
                for (i3 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i3), this._eraseInBufferLine(i3++, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t3); i3 < this._bufferService.rows; i3++) this._resetBufferLine(i3, t3);
                this._dirtyRowTracker.markDirty(i3);
                break;
              case 1:
                for (i3 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i3), this._eraseInBufferLine(i3, 0, this._activeBuffer.x + 1, true, t3), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(i3 + 1).isWrapped = false); i3--; ) this._resetBufferLine(i3, t3);
                this._dirtyRowTracker.markDirty(0);
                break;
              case 2:
                if (this._optionsService.rawOptions.scrollOnEraseInDisplay) {
                  for (i3 = this._bufferService.rows, this._dirtyRowTracker.markRangeDirty(0, i3 - 1); i3--; ) {
                    const e5 = this._activeBuffer.lines.get(this._activeBuffer.ybase + i3);
                    if (e5?.getTrimmedLength()) break;
                  }
                  for (; i3 >= 0; i3--) this._bufferService.scroll(this._eraseAttrData());
                } else {
                  for (i3 = this._bufferService.rows, this._dirtyRowTracker.markDirty(i3 - 1); i3--; ) this._resetBufferLine(i3, t3);
                  this._dirtyRowTracker.markDirty(0);
                }
                break;
              case 3:
                const e4 = this._activeBuffer.lines.length - this._bufferService.rows;
                e4 > 0 && (this._activeBuffer.lines.trimStart(e4), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - e4, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - e4, 0), this._onScroll.fire(0));
            }
            return true;
          }
          eraseInLine(e3, t3 = false) {
            switch (this._restrictCursor(this._bufferService.cols), e3.params[0]) {
              case 0:
                this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t3);
                break;
              case 1:
                this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, t3);
                break;
              case 2:
                this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, t3);
            }
            return this._dirtyRowTracker.markDirty(this._activeBuffer.y), true;
          }
          insertLines(e3) {
            this._restrictCursor();
            let t3 = e3.params[0] || 1;
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const i3 = this._activeBuffer.ybase + this._activeBuffer.y, s3 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, r2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s3 + 1;
            for (; t3--; ) this._activeBuffer.lines.splice(r2 - 1, 1), this._activeBuffer.lines.splice(i3, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
          }
          deleteLines(e3) {
            this._restrictCursor();
            let t3 = e3.params[0] || 1;
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const i3 = this._activeBuffer.ybase + this._activeBuffer.y;
            let s3;
            for (s3 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, s3 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s3; t3--; ) this._activeBuffer.lines.splice(i3, 1), this._activeBuffer.lines.splice(s3, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
          }
          insertChars(e3) {
            this._restrictCursor();
            const t3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            return t3 && (t3.insertCells(this._activeBuffer.x, e3.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
          }
          deleteChars(e3) {
            this._restrictCursor();
            const t3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            return t3 && (t3.deleteCells(this._activeBuffer.x, e3.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
          }
          scrollUp(e3) {
            let t3 = e3.params[0] || 1;
            for (; t3--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          scrollDown(e3) {
            let t3 = e3.params[0] || 1;
            for (; t3--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(c.DEFAULT_ATTR_DATA));
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          scrollLeft(e3) {
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const t3 = e3.params[0] || 1;
            for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
              const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
              i3.deleteCells(0, t3, this._activeBuffer.getNullCell(this._eraseAttrData())), i3.isWrapped = false;
            }
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          scrollRight(e3) {
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const t3 = e3.params[0] || 1;
            for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
              const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
              i3.insertCells(0, t3, this._activeBuffer.getNullCell(this._eraseAttrData())), i3.isWrapped = false;
            }
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          insertColumns(e3) {
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const t3 = e3.params[0] || 1;
            for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
              const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
              i3.insertCells(this._activeBuffer.x, t3, this._activeBuffer.getNullCell(this._eraseAttrData())), i3.isWrapped = false;
            }
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          deleteColumns(e3) {
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const t3 = e3.params[0] || 1;
            for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
              const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
              i3.deleteCells(this._activeBuffer.x, t3, this._activeBuffer.getNullCell(this._eraseAttrData())), i3.isWrapped = false;
            }
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          eraseChars(e3) {
            this._restrictCursor();
            const t3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            return t3 && (t3.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e3.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
          }
          repeatPrecedingCharacter(e3) {
            const t3 = this._parser.precedingJoinState;
            if (!t3) return true;
            const i3 = e3.params[0] || 1, s3 = p.UnicodeService.extractWidth(t3), r2 = this._activeBuffer.x - s3, n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(r2), o2 = new Uint32Array(n2.length * i3);
            let a2 = 0;
            for (let e4 = 0; e4 < n2.length; ) {
              const t4 = n2.codePointAt(e4) || 0;
              o2[a2++] = t4, e4 += t4 > 65535 ? 2 : 1;
            }
            let l2 = a2;
            for (let e4 = 1; e4 < i3; ++e4) o2.copyWithin(l2, 0, a2), l2 += a2;
            return this.print(o2, 0, l2), true;
          }
          sendDeviceAttributesPrimary(e3) {
            return e3.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(n.C0.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(n.C0.ESC + "[?6c")), true;
          }
          sendDeviceAttributesSecondary(e3) {
            return e3.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e3.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(n.C0.ESC + "[>83;40003;0c")), true;
          }
          _is(e3) {
            return 0 === (this._optionsService.rawOptions.termName + "").indexOf(e3);
          }
          setMode(e3) {
            for (let t3 = 0; t3 < e3.length; t3++) switch (e3.params[t3]) {
              case 4:
                this._coreService.modes.insertMode = true;
                break;
              case 20:
                this._optionsService.options.convertEol = true;
            }
            return true;
          }
          setModePrivate(e3) {
            for (let t3 = 0; t3 < e3.length; t3++) switch (e3.params[t3]) {
              case 1:
                this._coreService.decPrivateModes.applicationCursorKeys = true;
                break;
              case 2:
                this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), this._charsetService.setgCharset(1, o.DEFAULT_CHARSET), this._charsetService.setgCharset(2, o.DEFAULT_CHARSET), this._charsetService.setgCharset(3, o.DEFAULT_CHARSET);
                break;
              case 3:
                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
                break;
              case 6:
                this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
                break;
              case 7:
                this._coreService.decPrivateModes.wraparound = true;
                break;
              case 12:
                this._optionsService.options.cursorBlink = true;
                break;
              case 45:
                this._coreService.decPrivateModes.reverseWraparound = true;
                break;
              case 66:
                this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
                break;
              case 9:
                this._coreMouseService.activeProtocol = "X10";
                break;
              case 1e3:
                this._coreMouseService.activeProtocol = "VT200";
                break;
              case 1002:
                this._coreMouseService.activeProtocol = "DRAG";
                break;
              case 1003:
                this._coreMouseService.activeProtocol = "ANY";
                break;
              case 1004:
                this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
                break;
              case 1005:
                this._logService.debug("DECSET 1005 not supported (see #2507)");
                break;
              case 1006:
                this._coreMouseService.activeEncoding = "SGR";
                break;
              case 1015:
                this._logService.debug("DECSET 1015 not supported (see #2507)");
                break;
              case 1016:
                this._coreMouseService.activeEncoding = "SGR_PIXELS";
                break;
              case 25:
                this._coreService.isCursorHidden = false;
                break;
              case 1048:
                this.saveCursor();
                break;
              case 1049:
                this.saveCursor();
              case 47:
              case 1047:
                this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
                break;
              case 2004:
                this._coreService.decPrivateModes.bracketedPasteMode = true;
                break;
              case 2026:
                this._coreService.decPrivateModes.synchronizedOutput = true;
            }
            return true;
          }
          resetMode(e3) {
            for (let t3 = 0; t3 < e3.length; t3++) switch (e3.params[t3]) {
              case 4:
                this._coreService.modes.insertMode = false;
                break;
              case 20:
                this._optionsService.options.convertEol = false;
            }
            return true;
          }
          resetModePrivate(e3) {
            for (let t3 = 0; t3 < e3.length; t3++) switch (e3.params[t3]) {
              case 1:
                this._coreService.decPrivateModes.applicationCursorKeys = false;
                break;
              case 3:
                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
                break;
              case 6:
                this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
                break;
              case 7:
                this._coreService.decPrivateModes.wraparound = false;
                break;
              case 12:
                this._optionsService.options.cursorBlink = false;
                break;
              case 45:
                this._coreService.decPrivateModes.reverseWraparound = false;
                break;
              case 66:
                this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
                break;
              case 9:
              case 1e3:
              case 1002:
              case 1003:
                this._coreMouseService.activeProtocol = "NONE";
                break;
              case 1004:
                this._coreService.decPrivateModes.sendFocus = false;
                break;
              case 1005:
                this._logService.debug("DECRST 1005 not supported (see #2507)");
                break;
              case 1006:
              case 1016:
                this._coreMouseService.activeEncoding = "DEFAULT";
                break;
              case 1015:
                this._logService.debug("DECRST 1015 not supported (see #2507)");
                break;
              case 25:
                this._coreService.isCursorHidden = true;
                break;
              case 1048:
                this.restoreCursor();
                break;
              case 1049:
              case 47:
              case 1047:
                this._bufferService.buffers.activateNormalBuffer(), 1049 === e3.params[t3] && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
                break;
              case 2004:
                this._coreService.decPrivateModes.bracketedPasteMode = false;
                break;
              case 2026:
                this._coreService.decPrivateModes.synchronizedOutput = false, this._onRequestRefreshRows.fire(void 0);
            }
            return true;
          }
          requestMode(e3, t3) {
            const i3 = this._coreService.decPrivateModes, { activeProtocol: s3, activeEncoding: r2 } = this._coreMouseService, o2 = this._coreService, { buffers: a2, cols: l2 } = this._bufferService, { active: h2, alt: c2 } = a2, d2 = this._optionsService.rawOptions, u2 = (e4) => e4 ? 1 : 2, _2 = e3.params[0];
            return f2 = _2, p2 = t3 ? 2 === _2 ? 4 : 4 === _2 ? u2(o2.modes.insertMode) : 12 === _2 ? 3 : 20 === _2 ? u2(d2.convertEol) : 0 : 1 === _2 ? u2(i3.applicationCursorKeys) : 3 === _2 ? d2.windowOptions.setWinLines ? 80 === l2 ? 2 : 132 === l2 ? 1 : 0 : 0 : 6 === _2 ? u2(i3.origin) : 7 === _2 ? u2(i3.wraparound) : 8 === _2 ? 3 : 9 === _2 ? u2("X10" === s3) : 12 === _2 ? u2(d2.cursorBlink) : 25 === _2 ? u2(!o2.isCursorHidden) : 45 === _2 ? u2(i3.reverseWraparound) : 66 === _2 ? u2(i3.applicationKeypad) : 67 === _2 ? 4 : 1e3 === _2 ? u2("VT200" === s3) : 1002 === _2 ? u2("DRAG" === s3) : 1003 === _2 ? u2("ANY" === s3) : 1004 === _2 ? u2(i3.sendFocus) : 1005 === _2 ? 4 : 1006 === _2 ? u2("SGR" === r2) : 1015 === _2 ? 4 : 1016 === _2 ? u2("SGR_PIXELS" === r2) : 1048 === _2 ? 1 : 47 === _2 || 1047 === _2 || 1049 === _2 ? u2(h2 === c2) : 2004 === _2 ? u2(i3.bracketedPasteMode) : 2026 === _2 ? u2(i3.synchronizedOutput) : 0, o2.triggerDataEvent(`${n.C0.ESC}[${t3 ? "" : "?"}${f2};${p2}$y`), true;
            var f2, p2;
          }
          _updateAttrColor(e3, t3, i3, s3, r2) {
            return 2 === t3 ? (e3 |= 50331648, e3 &= -16777216, e3 |= _.AttributeData.fromColorRGB([i3, s3, r2])) : 5 === t3 && (e3 &= -50331904, e3 |= 33554432 | 255 & i3), e3;
          }
          _extractColor(e3, t3, i3) {
            const s3 = [0, 0, -1, 0, 0, 0];
            let r2 = 0, n2 = 0;
            do {
              if (s3[n2 + r2] = e3.params[t3 + n2], e3.hasSubParams(t3 + n2)) {
                const i4 = e3.getSubParams(t3 + n2);
                let o2 = 0;
                do {
                  5 === s3[1] && (r2 = 1), s3[n2 + o2 + 1 + r2] = i4[o2];
                } while (++o2 < i4.length && o2 + n2 + 1 + r2 < s3.length);
                break;
              }
              if (5 === s3[1] && n2 + r2 >= 2 || 2 === s3[1] && n2 + r2 >= 5) break;
              s3[1] && (r2 = 1);
            } while (++n2 + t3 < e3.length && n2 + r2 < s3.length);
            for (let e4 = 2; e4 < s3.length; ++e4) -1 === s3[e4] && (s3[e4] = 0);
            switch (s3[0]) {
              case 38:
                i3.fg = this._updateAttrColor(i3.fg, s3[1], s3[3], s3[4], s3[5]);
                break;
              case 48:
                i3.bg = this._updateAttrColor(i3.bg, s3[1], s3[3], s3[4], s3[5]);
                break;
              case 58:
                i3.extended = i3.extended.clone(), i3.extended.underlineColor = this._updateAttrColor(i3.extended.underlineColor, s3[1], s3[3], s3[4], s3[5]);
            }
            return n2;
          }
          _processUnderline(e3, t3) {
            t3.extended = t3.extended.clone(), (!~e3 || e3 > 5) && (e3 = 1), t3.extended.underlineStyle = e3, t3.fg |= 268435456, 0 === e3 && (t3.fg &= -268435457), t3.updateExtended();
          }
          _processSGR0(e3) {
            e3.fg = c.DEFAULT_ATTR_DATA.fg, e3.bg = c.DEFAULT_ATTR_DATA.bg, e3.extended = e3.extended.clone(), e3.extended.underlineStyle = 0, e3.extended.underlineColor &= -67108864, e3.updateExtended();
          }
          charAttributes(e3) {
            if (1 === e3.length && 0 === e3.params[0]) return this._processSGR0(this._curAttrData), true;
            const t3 = e3.length;
            let i3;
            const s3 = this._curAttrData;
            for (let r2 = 0; r2 < t3; r2++) i3 = e3.params[r2], i3 >= 30 && i3 <= 37 ? (s3.fg &= -50331904, s3.fg |= 16777216 | i3 - 30) : i3 >= 40 && i3 <= 47 ? (s3.bg &= -50331904, s3.bg |= 16777216 | i3 - 40) : i3 >= 90 && i3 <= 97 ? (s3.fg &= -50331904, s3.fg |= 16777224 | i3 - 90) : i3 >= 100 && i3 <= 107 ? (s3.bg &= -50331904, s3.bg |= 16777224 | i3 - 100) : 0 === i3 ? this._processSGR0(s3) : 1 === i3 ? s3.fg |= 134217728 : 3 === i3 ? s3.bg |= 67108864 : 4 === i3 ? (s3.fg |= 268435456, this._processUnderline(e3.hasSubParams(r2) ? e3.getSubParams(r2)[0] : 1, s3)) : 5 === i3 ? s3.fg |= 536870912 : 7 === i3 ? s3.fg |= 67108864 : 8 === i3 ? s3.fg |= 1073741824 : 9 === i3 ? s3.fg |= 2147483648 : 2 === i3 ? s3.bg |= 134217728 : 21 === i3 ? this._processUnderline(2, s3) : 22 === i3 ? (s3.fg &= -134217729, s3.bg &= -134217729) : 23 === i3 ? s3.bg &= -67108865 : 24 === i3 ? (s3.fg &= -268435457, this._processUnderline(0, s3)) : 25 === i3 ? s3.fg &= -536870913 : 27 === i3 ? s3.fg &= -67108865 : 28 === i3 ? s3.fg &= -1073741825 : 29 === i3 ? s3.fg &= 2147483647 : 39 === i3 ? (s3.fg &= -67108864, s3.fg |= 16777215 & c.DEFAULT_ATTR_DATA.fg) : 49 === i3 ? (s3.bg &= -67108864, s3.bg |= 16777215 & c.DEFAULT_ATTR_DATA.bg) : 38 === i3 || 48 === i3 || 58 === i3 ? r2 += this._extractColor(e3, r2, s3) : 53 === i3 ? s3.bg |= 1073741824 : 55 === i3 ? s3.bg &= -1073741825 : 59 === i3 ? (s3.extended = s3.extended.clone(), s3.extended.underlineColor = -1, s3.updateExtended()) : 100 === i3 ? (s3.fg &= -67108864, s3.fg |= 16777215 & c.DEFAULT_ATTR_DATA.fg, s3.bg &= -67108864, s3.bg |= 16777215 & c.DEFAULT_ATTR_DATA.bg) : this._logService.debug("Unknown SGR attribute: %d.", i3);
            return true;
          }
          deviceStatus(e3) {
            switch (e3.params[0]) {
              case 5:
                this._coreService.triggerDataEvent(`${n.C0.ESC}[0n`);
                break;
              case 6:
                const e4 = this._activeBuffer.y + 1, t3 = this._activeBuffer.x + 1;
                this._coreService.triggerDataEvent(`${n.C0.ESC}[${e4};${t3}R`);
            }
            return true;
          }
          deviceStatusPrivate(e3) {
            if (6 === e3.params[0]) {
              const e4 = this._activeBuffer.y + 1, t3 = this._activeBuffer.x + 1;
              this._coreService.triggerDataEvent(`${n.C0.ESC}[?${e4};${t3}R`);
            }
            return true;
          }
          softReset(e3) {
            return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = c.DEFAULT_ATTR_DATA.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
          }
          setCursorStyle(e3) {
            const t3 = 0 === e3.length ? 1 : e3.params[0];
            if (0 === t3) this._coreService.decPrivateModes.cursorStyle = void 0, this._coreService.decPrivateModes.cursorBlink = void 0;
            else {
              switch (t3) {
                case 1:
                case 2:
                  this._coreService.decPrivateModes.cursorStyle = "block";
                  break;
                case 3:
                case 4:
                  this._coreService.decPrivateModes.cursorStyle = "underline";
                  break;
                case 5:
                case 6:
                  this._coreService.decPrivateModes.cursorStyle = "bar";
              }
              const e4 = t3 % 2 == 1;
              this._coreService.decPrivateModes.cursorBlink = e4;
            }
            return true;
          }
          setScrollRegion(e3) {
            const t3 = e3.params[0] || 1;
            let i3;
            return (e3.length < 2 || (i3 = e3.params[1]) > this._bufferService.rows || 0 === i3) && (i3 = this._bufferService.rows), i3 > t3 && (this._activeBuffer.scrollTop = t3 - 1, this._activeBuffer.scrollBottom = i3 - 1, this._setCursor(0, 0)), true;
          }
          windowOptions(e3) {
            if (!y(e3.params[0], this._optionsService.rawOptions.windowOptions)) return true;
            const t3 = e3.length > 1 ? e3.params[1] : 0;
            switch (e3.params[0]) {
              case 14:
                2 !== t3 && this._onRequestWindowsOptionsReport.fire(w.GET_WIN_SIZE_PIXELS);
                break;
              case 16:
                this._onRequestWindowsOptionsReport.fire(w.GET_CELL_SIZE_PIXELS);
                break;
              case 18:
                this._bufferService && this._coreService.triggerDataEvent(`${n.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
                break;
              case 22:
                0 !== t3 && 2 !== t3 || (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > 10 && this._windowTitleStack.shift()), 0 !== t3 && 1 !== t3 || (this._iconNameStack.push(this._iconName), this._iconNameStack.length > 10 && this._iconNameStack.shift());
                break;
              case 23:
                0 !== t3 && 2 !== t3 || this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), 0 !== t3 && 1 !== t3 || this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
            }
            return true;
          }
          saveCursor(e3) {
            return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
          }
          restoreCursor(e3) {
            return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
          }
          setTitle(e3) {
            return this._windowTitle = e3, this._onTitleChange.fire(e3), true;
          }
          setIconName(e3) {
            return this._iconName = e3, true;
          }
          setOrReportIndexedColor(e3) {
            const t3 = [], i3 = e3.split(";");
            for (; i3.length > 1; ) {
              const e4 = i3.shift(), s3 = i3.shift();
              if (/^\d+$/.exec(e4)) {
                const i4 = parseInt(e4);
                if (R(i4)) if ("?" === s3) t3.push({ type: 0, index: i4 });
                else {
                  const e5 = (0, v.parseColor)(s3);
                  e5 && t3.push({ type: 1, index: i4, color: e5 });
                }
              }
            }
            return t3.length && this._onColor.fire(t3), true;
          }
          setHyperlink(e3) {
            const t3 = e3.indexOf(";");
            if (-1 === t3) return true;
            const i3 = e3.slice(0, t3).trim(), s3 = e3.slice(t3 + 1);
            return s3 ? this._createHyperlink(i3, s3) : !i3.trim() && this._finishHyperlink();
          }
          _createHyperlink(e3, t3) {
            this._getCurrentLinkId() && this._finishHyperlink();
            const i3 = e3.split(":");
            let s3;
            const r2 = i3.findIndex(((e4) => e4.startsWith("id=")));
            return -1 !== r2 && (s3 = i3[r2].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: s3, uri: t3 }), this._curAttrData.updateExtended(), true;
          }
          _finishHyperlink() {
            return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), true;
          }
          _setOrReportSpecialColor(e3, t3) {
            const i3 = e3.split(";");
            for (let e4 = 0; e4 < i3.length && !(t3 >= this._specialColors.length); ++e4, ++t3) if ("?" === i3[e4]) this._onColor.fire([{ type: 0, index: this._specialColors[t3] }]);
            else {
              const s3 = (0, v.parseColor)(i3[e4]);
              s3 && this._onColor.fire([{ type: 1, index: this._specialColors[t3], color: s3 }]);
            }
            return true;
          }
          setOrReportFgColor(e3) {
            return this._setOrReportSpecialColor(e3, 0);
          }
          setOrReportBgColor(e3) {
            return this._setOrReportSpecialColor(e3, 1);
          }
          setOrReportCursorColor(e3) {
            return this._setOrReportSpecialColor(e3, 2);
          }
          restoreIndexedColor(e3) {
            if (!e3) return this._onColor.fire([{ type: 2 }]), true;
            const t3 = [], i3 = e3.split(";");
            for (let e4 = 0; e4 < i3.length; ++e4) if (/^\d+$/.exec(i3[e4])) {
              const s3 = parseInt(i3[e4]);
              R(s3) && t3.push({ type: 2, index: s3 });
            }
            return t3.length && this._onColor.fire(t3), true;
          }
          restoreFgColor(e3) {
            return this._onColor.fire([{ type: 2, index: 256 }]), true;
          }
          restoreBgColor(e3) {
            return this._onColor.fire([{ type: 2, index: 257 }]), true;
          }
          restoreCursorColor(e3) {
            return this._onColor.fire([{ type: 2, index: 258 }]), true;
          }
          nextLine() {
            return this._activeBuffer.x = 0, this.index(), true;
          }
          keypadApplicationMode() {
            return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
          }
          keypadNumericMode() {
            return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
          }
          selectDefaultCharset() {
            return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), true;
          }
          selectCharset(e3) {
            return 2 !== e3.length ? (this.selectDefaultCharset(), true) : ("/" === e3[0] || this._charsetService.setgCharset(b[e3[0]], o.CHARSETS[e3[1]] || o.DEFAULT_CHARSET), true);
          }
          index() {
            return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
          }
          tabSet() {
            return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
          }
          reverseIndex() {
            if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
              const e3 = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
              this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e3, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
            } else this._activeBuffer.y--, this._restrictCursor();
            return true;
          }
          fullReset() {
            return this._parser.reset(), this._onRequestReset.fire(), true;
          }
          reset() {
            this._curAttrData = c.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = c.DEFAULT_ATTR_DATA.clone();
          }
          _eraseAttrData() {
            return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= 67108863 & this._curAttrData.bg, this._eraseAttrDataInternal;
          }
          setgLevel(e3) {
            return this._charsetService.setgLevel(e3), true;
          }
          screenAlignmentPattern() {
            const e3 = new u.CellData();
            e3.content = 1 << 22 | "E".charCodeAt(0), e3.fg = this._curAttrData.fg, e3.bg = this._curAttrData.bg, this._setCursor(0, 0);
            for (let t3 = 0; t3 < this._bufferService.rows; ++t3) {
              const i3 = this._activeBuffer.ybase + this._activeBuffer.y + t3, s3 = this._activeBuffer.lines.get(i3);
              s3 && (s3.fill(e3), s3.isWrapped = false);
            }
            return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), true;
          }
          requestStatusString(e3, t3) {
            const i3 = this._bufferService.buffer, s3 = this._optionsService.rawOptions;
            return ((e4) => (this._coreService.triggerDataEvent(`${n.C0.ESC}${e4}${n.C0.ESC}\\`), true))('"q' === e3 ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : '"p' === e3 ? 'P1$r61;1"p' : "r" === e3 ? `P1$r${i3.scrollTop + 1};${i3.scrollBottom + 1}r` : "m" === e3 ? "P1$r0m" : " q" === e3 ? `P1$r${{ block: 2, underline: 4, bar: 6 }[s3.cursorStyle] - (s3.cursorBlink ? 1 : 0)} q` : "P0$r");
          }
          markRangeDirty(e3, t3) {
            this._dirtyRowTracker.markRangeDirty(e3, t3);
          }
        }
        t2.InputHandler = D;
        let L = class {
          constructor(e3) {
            this._bufferService = e3, this.clearRange();
          }
          clearRange() {
            this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
          }
          markDirty(e3) {
            e3 < this.start ? this.start = e3 : e3 > this.end && (this.end = e3);
          }
          markRangeDirty(e3, t3) {
            e3 > t3 && (E = e3, e3 = t3, t3 = E), e3 < this.start && (this.start = e3), t3 > this.end && (this.end = t3);
          }
          markAllDirty() {
            this.markRangeDirty(0, this._bufferService.rows - 1);
          }
        };
        function R(e3) {
          return 0 <= e3 && e3 < 256;
        }
        L = s2([r(0, f.IBufferService)], L);
      }, 7710: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.FourKeyMap = t2.TwoKeyMap = void 0;
        class i2 {
          constructor() {
            this._data = {};
          }
          set(e3, t3, i3) {
            this._data[e3] || (this._data[e3] = {}), this._data[e3][t3] = i3;
          }
          get(e3, t3) {
            return this._data[e3] ? this._data[e3][t3] : void 0;
          }
          clear() {
            this._data = {};
          }
        }
        t2.TwoKeyMap = i2, t2.FourKeyMap = class {
          constructor() {
            this._data = new i2();
          }
          set(e3, t3, s2, r, n) {
            this._data.get(e3, t3) || this._data.set(e3, t3, new i2()), this._data.get(e3, t3).set(s2, r, n);
          }
          get(e3, t3, i3, s2) {
            return this._data.get(e3, t3)?.get(i3, s2);
          }
          clear() {
            this._data.clear();
          }
        };
      }, 701: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.isChromeOS = t2.isLinux = t2.isWindows = t2.isIphone = t2.isIpad = t2.isMac = t2.isSafari = t2.isLegacyEdge = t2.isFirefox = t2.isNode = void 0, t2.getSafariVersion = function() {
          if (!t2.isSafari) return 0;
          const e3 = i2.match(/Version\/(\d+)/);
          return null === e3 || e3.length < 2 ? 0 : parseInt(e3[1]);
        }, t2.isNode = "undefined" != typeof process && "title" in process;
        const i2 = t2.isNode ? "node" : navigator.userAgent, s2 = t2.isNode ? "node" : navigator.platform;
        t2.isFirefox = i2.includes("Firefox"), t2.isLegacyEdge = i2.includes("Edge"), t2.isSafari = /^((?!chrome|android).)*safari/i.test(i2), t2.isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(s2), t2.isIpad = "iPad" === s2, t2.isIphone = "iPhone" === s2, t2.isWindows = ["Windows", "Win16", "Win32", "WinCE"].includes(s2), t2.isLinux = s2.indexOf("Linux") >= 0, t2.isChromeOS = /\bCrOS\b/.test(i2);
      }, 3087: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.SortedList = void 0;
        const s2 = i2(6168);
        let r = 0;
        t2.SortedList = class {
          constructor(e3) {
            this._getKey = e3, this._array = [], this._insertedValues = [], this._flushInsertedTask = new s2.IdleTaskQueue(), this._isFlushingInserted = false, this._deletedIndices = [], this._flushDeletedTask = new s2.IdleTaskQueue(), this._isFlushingDeleted = false;
          }
          clear() {
            this._array.length = 0, this._insertedValues.length = 0, this._flushInsertedTask.clear(), this._isFlushingInserted = false, this._deletedIndices.length = 0, this._flushDeletedTask.clear(), this._isFlushingDeleted = false;
          }
          insert(e3) {
            this._flushCleanupDeleted(), 0 === this._insertedValues.length && this._flushInsertedTask.enqueue((() => this._flushInserted())), this._insertedValues.push(e3);
          }
          _flushInserted() {
            const e3 = this._insertedValues.sort(((e4, t4) => this._getKey(e4) - this._getKey(t4)));
            let t3 = 0, i3 = 0;
            const s3 = new Array(this._array.length + this._insertedValues.length);
            for (let r2 = 0; r2 < s3.length; r2++) i3 >= this._array.length || this._getKey(e3[t3]) <= this._getKey(this._array[i3]) ? (s3[r2] = e3[t3], t3++) : s3[r2] = this._array[i3++];
            this._array = s3, this._insertedValues.length = 0;
          }
          _flushCleanupInserted() {
            !this._isFlushingInserted && this._insertedValues.length > 0 && this._flushInsertedTask.flush();
          }
          delete(e3) {
            if (this._flushCleanupInserted(), 0 === this._array.length) return false;
            const t3 = this._getKey(e3);
            if (void 0 === t3) return false;
            if (r = this._search(t3), -1 === r) return false;
            if (this._getKey(this._array[r]) !== t3) return false;
            do {
              if (this._array[r] === e3) return 0 === this._deletedIndices.length && this._flushDeletedTask.enqueue((() => this._flushDeleted())), this._deletedIndices.push(r), true;
            } while (++r < this._array.length && this._getKey(this._array[r]) === t3);
            return false;
          }
          _flushDeleted() {
            this._isFlushingDeleted = true;
            const e3 = this._deletedIndices.sort(((e4, t4) => e4 - t4));
            let t3 = 0;
            const i3 = new Array(this._array.length - e3.length);
            let s3 = 0;
            for (let r2 = 0; r2 < this._array.length; r2++) e3[t3] === r2 ? t3++ : i3[s3++] = this._array[r2];
            this._array = i3, this._deletedIndices.length = 0, this._isFlushingDeleted = false;
          }
          _flushCleanupDeleted() {
            !this._isFlushingDeleted && this._deletedIndices.length > 0 && this._flushDeletedTask.flush();
          }
          *getKeyIterator(e3) {
            if (this._flushCleanupInserted(), this._flushCleanupDeleted(), 0 !== this._array.length && (r = this._search(e3), !(r < 0 || r >= this._array.length) && this._getKey(this._array[r]) === e3)) do {
              yield this._array[r];
            } while (++r < this._array.length && this._getKey(this._array[r]) === e3);
          }
          forEachByKey(e3, t3) {
            if (this._flushCleanupInserted(), this._flushCleanupDeleted(), 0 !== this._array.length && (r = this._search(e3), !(r < 0 || r >= this._array.length) && this._getKey(this._array[r]) === e3)) do {
              t3(this._array[r]);
            } while (++r < this._array.length && this._getKey(this._array[r]) === e3);
          }
          values() {
            return this._flushCleanupInserted(), this._flushCleanupDeleted(), [...this._array].values();
          }
          _search(e3) {
            let t3 = 0, i3 = this._array.length - 1;
            for (; i3 >= t3; ) {
              let s3 = t3 + i3 >> 1;
              const r2 = this._getKey(this._array[s3]);
              if (r2 > e3) i3 = s3 - 1;
              else {
                if (!(r2 < e3)) {
                  for (; s3 > 0 && this._getKey(this._array[s3 - 1]) === e3; ) s3--;
                  return s3;
                }
                t3 = s3 + 1;
              }
            }
            return t3;
          }
        };
      }, 6168: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DebouncedIdleTask = t2.IdleTaskQueue = t2.PriorityTaskQueue = void 0;
        const s2 = i2(701);
        class r {
          constructor() {
            this._tasks = [], this._i = 0;
          }
          enqueue(e3) {
            this._tasks.push(e3), this._start();
          }
          flush() {
            for (; this._i < this._tasks.length; ) this._tasks[this._i]() || this._i++;
            this.clear();
          }
          clear() {
            this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
          }
          _start() {
            this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
          }
          _process(e3) {
            this._idleCallback = void 0;
            let t3 = 0, i3 = 0, s3 = e3.timeRemaining(), r2 = 0;
            for (; this._i < this._tasks.length; ) {
              if (t3 = performance.now(), this._tasks[this._i]() || this._i++, t3 = Math.max(1, performance.now() - t3), i3 = Math.max(t3, i3), r2 = e3.timeRemaining(), 1.5 * i3 > r2) return s3 - t3 < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(s3 - t3))}ms`), void this._start();
              s3 = r2;
            }
            this.clear();
          }
        }
        class n extends r {
          _requestCallback(e3) {
            return setTimeout((() => e3(this._createDeadline(16))));
          }
          _cancelCallback(e3) {
            clearTimeout(e3);
          }
          _createDeadline(e3) {
            const t3 = performance.now() + e3;
            return { timeRemaining: () => Math.max(0, t3 - performance.now()) };
          }
        }
        t2.PriorityTaskQueue = n, t2.IdleTaskQueue = !s2.isNode && "requestIdleCallback" in window ? class extends r {
          _requestCallback(e3) {
            return requestIdleCallback(e3);
          }
          _cancelCallback(e3) {
            cancelIdleCallback(e3);
          }
        } : n, t2.DebouncedIdleTask = class {
          constructor() {
            this._queue = new t2.IdleTaskQueue();
          }
          set(e3) {
            this._queue.clear(), this._queue.enqueue(e3);
          }
          flush() {
            this._queue.flush();
          }
        };
      }, 5882: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.updateWindowsModeWrappedState = function(e3) {
          const t3 = e3.buffer.lines.get(e3.buffer.ybase + e3.buffer.y - 1), i3 = t3?.get(e3.cols - 1), r = e3.buffer.lines.get(e3.buffer.ybase + e3.buffer.y);
          r && i3 && (r.isWrapped = i3[s2.CHAR_DATA_CODE_INDEX] !== s2.NULL_CELL_CODE && i3[s2.CHAR_DATA_CODE_INDEX] !== s2.WHITESPACE_CELL_CODE);
        };
        const s2 = i2(8938);
      }, 5451: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ExtendedAttrs = t2.AttributeData = void 0;
        class i2 {
          constructor() {
            this.fg = 0, this.bg = 0, this.extended = new s2();
          }
          static toColorRGB(e3) {
            return [e3 >>> 16 & 255, e3 >>> 8 & 255, 255 & e3];
          }
          static fromColorRGB(e3) {
            return (255 & e3[0]) << 16 | (255 & e3[1]) << 8 | 255 & e3[2];
          }
          clone() {
            const e3 = new i2();
            return e3.fg = this.fg, e3.bg = this.bg, e3.extended = this.extended.clone(), e3;
          }
          isInverse() {
            return 67108864 & this.fg;
          }
          isBold() {
            return 134217728 & this.fg;
          }
          isUnderline() {
            return this.hasExtendedAttrs() && 0 !== this.extended.underlineStyle ? 1 : 268435456 & this.fg;
          }
          isBlink() {
            return 536870912 & this.fg;
          }
          isInvisible() {
            return 1073741824 & this.fg;
          }
          isItalic() {
            return 67108864 & this.bg;
          }
          isDim() {
            return 134217728 & this.bg;
          }
          isStrikethrough() {
            return 2147483648 & this.fg;
          }
          isProtected() {
            return 536870912 & this.bg;
          }
          isOverline() {
            return 1073741824 & this.bg;
          }
          getFgColorMode() {
            return 50331648 & this.fg;
          }
          getBgColorMode() {
            return 50331648 & this.bg;
          }
          isFgRGB() {
            return !(50331648 & ~this.fg);
          }
          isBgRGB() {
            return !(50331648 & ~this.bg);
          }
          isFgPalette() {
            return 16777216 == (50331648 & this.fg) || 33554432 == (50331648 & this.fg);
          }
          isBgPalette() {
            return 16777216 == (50331648 & this.bg) || 33554432 == (50331648 & this.bg);
          }
          isFgDefault() {
            return !(50331648 & this.fg);
          }
          isBgDefault() {
            return !(50331648 & this.bg);
          }
          isAttributeDefault() {
            return 0 === this.fg && 0 === this.bg;
          }
          getFgColor() {
            switch (50331648 & this.fg) {
              case 16777216:
              case 33554432:
                return 255 & this.fg;
              case 50331648:
                return 16777215 & this.fg;
              default:
                return -1;
            }
          }
          getBgColor() {
            switch (50331648 & this.bg) {
              case 16777216:
              case 33554432:
                return 255 & this.bg;
              case 50331648:
                return 16777215 & this.bg;
              default:
                return -1;
            }
          }
          hasExtendedAttrs() {
            return 268435456 & this.bg;
          }
          updateExtended() {
            this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
          }
          getUnderlineColor() {
            if (268435456 & this.bg && ~this.extended.underlineColor) switch (50331648 & this.extended.underlineColor) {
              case 16777216:
              case 33554432:
                return 255 & this.extended.underlineColor;
              case 50331648:
                return 16777215 & this.extended.underlineColor;
              default:
                return this.getFgColor();
            }
            return this.getFgColor();
          }
          getUnderlineColorMode() {
            return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode();
          }
          isUnderlineColorRGB() {
            return 268435456 & this.bg && ~this.extended.underlineColor ? !(50331648 & ~this.extended.underlineColor) : this.isFgRGB();
          }
          isUnderlineColorPalette() {
            return 268435456 & this.bg && ~this.extended.underlineColor ? 16777216 == (50331648 & this.extended.underlineColor) || 33554432 == (50331648 & this.extended.underlineColor) : this.isFgPalette();
          }
          isUnderlineColorDefault() {
            return 268435456 & this.bg && ~this.extended.underlineColor ? !(50331648 & this.extended.underlineColor) : this.isFgDefault();
          }
          getUnderlineStyle() {
            return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0;
          }
          getUnderlineVariantOffset() {
            return this.extended.underlineVariantOffset;
          }
        }
        t2.AttributeData = i2;
        class s2 {
          get ext() {
            return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext;
          }
          set ext(e3) {
            this._ext = e3;
          }
          get underlineStyle() {
            return this._urlId ? 5 : (469762048 & this._ext) >> 26;
          }
          set underlineStyle(e3) {
            this._ext &= -469762049, this._ext |= e3 << 26 & 469762048;
          }
          get underlineColor() {
            return 67108863 & this._ext;
          }
          set underlineColor(e3) {
            this._ext &= -67108864, this._ext |= 67108863 & e3;
          }
          get urlId() {
            return this._urlId;
          }
          set urlId(e3) {
            this._urlId = e3;
          }
          get underlineVariantOffset() {
            const e3 = (3758096384 & this._ext) >> 29;
            return e3 < 0 ? 4294967288 ^ e3 : e3;
          }
          set underlineVariantOffset(e3) {
            this._ext &= 536870911, this._ext |= e3 << 29 & 3758096384;
          }
          constructor(e3 = 0, t3 = 0) {
            this._ext = 0, this._urlId = 0, this._ext = e3, this._urlId = t3;
          }
          clone() {
            return new s2(this._ext, this._urlId);
          }
          isEmpty() {
            return 0 === this.underlineStyle && 0 === this._urlId;
          }
        }
        t2.ExtendedAttrs = s2;
      }, 1073: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Buffer = t2.MAX_BUFFER_SIZE = void 0;
        const s2 = i2(5639), r = i2(6168), n = i2(5451), o = i2(6107), a = i2(732), l = i2(3055), h = i2(8938), c = i2(8158), d = i2(6760);
        t2.MAX_BUFFER_SIZE = 4294967295, t2.Buffer = class {
          constructor(e3, t3, i3) {
            this._hasScrollback = e3, this._optionsService = t3, this._bufferService = i3, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.tabs = {}, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = o.DEFAULT_ATTR_DATA.clone(), this.savedCharset = d.DEFAULT_CHARSET, this.markers = [], this._nullCell = l.CellData.fromCharData([0, h.NULL_CELL_CHAR, h.NULL_CELL_WIDTH, h.NULL_CELL_CODE]), this._whitespaceCell = l.CellData.fromCharData([0, h.WHITESPACE_CELL_CHAR, h.WHITESPACE_CELL_WIDTH, h.WHITESPACE_CELL_CODE]), this._isClearing = false, this._memoryCleanupQueue = new r.IdleTaskQueue(), this._memoryCleanupPosition = 0, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new s2.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
          }
          getNullCell(e3) {
            return e3 ? (this._nullCell.fg = e3.fg, this._nullCell.bg = e3.bg, this._nullCell.extended = e3.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new n.ExtendedAttrs()), this._nullCell;
          }
          getWhitespaceCell(e3) {
            return e3 ? (this._whitespaceCell.fg = e3.fg, this._whitespaceCell.bg = e3.bg, this._whitespaceCell.extended = e3.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new n.ExtendedAttrs()), this._whitespaceCell;
          }
          getBlankLine(e3, t3) {
            return new o.BufferLine(this._bufferService.cols, this.getNullCell(e3), t3);
          }
          get hasScrollback() {
            return this._hasScrollback && this.lines.maxLength > this._rows;
          }
          get isCursorInViewport() {
            const e3 = this.ybase + this.y - this.ydisp;
            return e3 >= 0 && e3 < this._rows;
          }
          _getCorrectBufferLength(e3) {
            if (!this._hasScrollback) return e3;
            const i3 = e3 + this._optionsService.rawOptions.scrollback;
            return i3 > t2.MAX_BUFFER_SIZE ? t2.MAX_BUFFER_SIZE : i3;
          }
          fillViewportRows(e3) {
            if (0 === this.lines.length) {
              void 0 === e3 && (e3 = o.DEFAULT_ATTR_DATA);
              let t3 = this._rows;
              for (; t3--; ) this.lines.push(this.getBlankLine(e3));
            }
          }
          clear() {
            this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new s2.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
          }
          resize(e3, t3) {
            const i3 = this.getNullCell(o.DEFAULT_ATTR_DATA);
            let s3 = 0;
            const r2 = this._getCorrectBufferLength(t3);
            if (r2 > this.lines.maxLength && (this.lines.maxLength = r2), this.lines.length > 0) {
              if (this._cols < e3) for (let t4 = 0; t4 < this.lines.length; t4++) s3 += +this.lines.get(t4).resize(e3, i3);
              let n2 = 0;
              if (this._rows < t3) for (let s4 = this._rows; s4 < t3; s4++) this.lines.length < t3 + this.ybase && (this._optionsService.rawOptions.windowsMode || void 0 !== this._optionsService.rawOptions.windowsPty.backend || void 0 !== this._optionsService.rawOptions.windowsPty.buildNumber ? this.lines.push(new o.BufferLine(e3, i3)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + n2 + 1 ? (this.ybase--, n2++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new o.BufferLine(e3, i3)));
              else for (let e4 = this._rows; e4 > t3; e4--) this.lines.length > t3 + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
              if (r2 < this.lines.maxLength) {
                const e4 = this.lines.length - r2;
                e4 > 0 && (this.lines.trimStart(e4), this.ybase = Math.max(this.ybase - e4, 0), this.ydisp = Math.max(this.ydisp - e4, 0), this.savedY = Math.max(this.savedY - e4, 0)), this.lines.maxLength = r2;
              }
              this.x = Math.min(this.x, e3 - 1), this.y = Math.min(this.y, t3 - 1), n2 && (this.y += n2), this.savedX = Math.min(this.savedX, e3 - 1), this.scrollTop = 0;
            }
            if (this.scrollBottom = t3 - 1, this._isReflowEnabled && (this._reflow(e3, t3), this._cols > e3)) for (let t4 = 0; t4 < this.lines.length; t4++) s3 += +this.lines.get(t4).resize(e3, i3);
            this._cols = e3, this._rows = t3, this._memoryCleanupQueue.clear(), s3 > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue((() => this._batchedMemoryCleanup())));
          }
          _batchedMemoryCleanup() {
            let e3 = true;
            this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, e3 = false);
            let t3 = 0;
            for (; this._memoryCleanupPosition < this.lines.length; ) if (t3 += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), t3 > 100) return true;
            return e3;
          }
          get _isReflowEnabled() {
            const e3 = this._optionsService.rawOptions.windowsPty;
            return e3 && e3.buildNumber ? this._hasScrollback && "conpty" === e3.backend && e3.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
          }
          _reflow(e3, t3) {
            this._cols !== e3 && (e3 > this._cols ? this._reflowLarger(e3, t3) : this._reflowSmaller(e3, t3));
          }
          _reflowLarger(e3, t3) {
            const i3 = this._optionsService.rawOptions.reflowCursorLine, s3 = (0, a.reflowLargerGetLinesToRemove)(this.lines, this._cols, e3, this.ybase + this.y, this.getNullCell(o.DEFAULT_ATTR_DATA), i3);
            if (s3.length > 0) {
              const i4 = (0, a.reflowLargerCreateNewLayout)(this.lines, s3);
              (0, a.reflowLargerApplyNewLayout)(this.lines, i4.layout), this._reflowLargerAdjustViewport(e3, t3, i4.countRemoved);
            }
          }
          _reflowLargerAdjustViewport(e3, t3, i3) {
            const s3 = this.getNullCell(o.DEFAULT_ATTR_DATA);
            let r2 = i3;
            for (; r2-- > 0; ) 0 === this.ybase ? (this.y > 0 && this.y--, this.lines.length < t3 && this.lines.push(new o.BufferLine(e3, s3))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
            this.savedY = Math.max(this.savedY - i3, 0);
          }
          _reflowSmaller(e3, t3) {
            const i3 = this._optionsService.rawOptions.reflowCursorLine, s3 = this.getNullCell(o.DEFAULT_ATTR_DATA), r2 = [];
            let n2 = 0;
            for (let l2 = this.lines.length - 1; l2 >= 0; l2--) {
              let h2 = this.lines.get(l2);
              if (!h2 || !h2.isWrapped && h2.getTrimmedLength() <= e3) continue;
              const c2 = [h2];
              for (; h2.isWrapped && l2 > 0; ) h2 = this.lines.get(--l2), c2.unshift(h2);
              if (!i3) {
                const e4 = this.ybase + this.y;
                if (e4 >= l2 && e4 < l2 + c2.length) continue;
              }
              const d2 = c2[c2.length - 1].getTrimmedLength(), u = (0, a.reflowSmallerGetNewLineLengths)(c2, this._cols, e3), _ = u.length - c2.length;
              let f;
              f = 0 === this.ybase && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + _) : Math.max(0, this.lines.length - this.lines.maxLength + _);
              const p = [];
              for (let e4 = 0; e4 < _; e4++) {
                const e5 = this.getBlankLine(o.DEFAULT_ATTR_DATA, true);
                p.push(e5);
              }
              p.length > 0 && (r2.push({ start: l2 + c2.length + n2, newLines: p }), n2 += p.length), c2.push(...p);
              let g = u.length - 1, m = u[g];
              0 === m && (g--, m = u[g]);
              let v = c2.length - _ - 1, S = d2;
              for (; v >= 0; ) {
                const e4 = Math.min(S, m);
                if (void 0 === c2[g]) break;
                if (c2[g].copyCellsFrom(c2[v], S - e4, m - e4, e4, true), m -= e4, 0 === m && (g--, m = u[g]), S -= e4, 0 === S) {
                  v--;
                  const e5 = Math.max(v, 0);
                  S = (0, a.getWrappedLineTrimmedLength)(c2, e5, this._cols);
                }
              }
              for (let t4 = 0; t4 < c2.length; t4++) u[t4] < e3 && c2[t4].setCell(u[t4], s3);
              let b = _ - f;
              for (; b-- > 0; ) 0 === this.ybase ? this.y < t3 - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + n2) - t3 && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
              this.savedY = Math.min(this.savedY + _, this.ybase + t3 - 1);
            }
            if (r2.length > 0) {
              const e4 = [], t4 = [];
              for (let e5 = 0; e5 < this.lines.length; e5++) t4.push(this.lines.get(e5));
              const i4 = this.lines.length;
              let s4 = i4 - 1, o2 = 0, a2 = r2[o2];
              this.lines.length = Math.min(this.lines.maxLength, this.lines.length + n2);
              let l2 = 0;
              for (let h3 = Math.min(this.lines.maxLength - 1, i4 + n2 - 1); h3 >= 0; h3--) if (a2 && a2.start > s4 + l2) {
                for (let e5 = a2.newLines.length - 1; e5 >= 0; e5--) this.lines.set(h3--, a2.newLines[e5]);
                h3++, e4.push({ index: s4 + 1, amount: a2.newLines.length }), l2 += a2.newLines.length, a2 = r2[++o2];
              } else this.lines.set(h3, t4[s4--]);
              let h2 = 0;
              for (let t5 = e4.length - 1; t5 >= 0; t5--) e4[t5].index += h2, this.lines.onInsertEmitter.fire(e4[t5]), h2 += e4[t5].amount;
              const c2 = Math.max(0, i4 + n2 - this.lines.maxLength);
              c2 > 0 && this.lines.onTrimEmitter.fire(c2);
            }
          }
          translateBufferLineToString(e3, t3, i3 = 0, s3) {
            const r2 = this.lines.get(e3);
            return r2 ? r2.translateToString(t3, i3, s3) : "";
          }
          getWrappedRangeForLine(e3) {
            let t3 = e3, i3 = e3;
            for (; t3 > 0 && this.lines.get(t3).isWrapped; ) t3--;
            for (; i3 + 1 < this.lines.length && this.lines.get(i3 + 1).isWrapped; ) i3++;
            return { first: t3, last: i3 };
          }
          setupTabStops(e3) {
            for (null != e3 ? this.tabs[e3] || (e3 = this.prevStop(e3)) : (this.tabs = {}, e3 = 0); e3 < this._cols; e3 += this._optionsService.rawOptions.tabStopWidth) this.tabs[e3] = true;
          }
          prevStop(e3) {
            for (null == e3 && (e3 = this.x); !this.tabs[--e3] && e3 > 0; ) ;
            return e3 >= this._cols ? this._cols - 1 : e3 < 0 ? 0 : e3;
          }
          nextStop(e3) {
            for (null == e3 && (e3 = this.x); !this.tabs[++e3] && e3 < this._cols; ) ;
            return e3 >= this._cols ? this._cols - 1 : e3 < 0 ? 0 : e3;
          }
          clearMarkers(e3) {
            this._isClearing = true;
            for (let t3 = 0; t3 < this.markers.length; t3++) this.markers[t3].line === e3 && (this.markers[t3].dispose(), this.markers.splice(t3--, 1));
            this._isClearing = false;
          }
          clearAllMarkers() {
            this._isClearing = true;
            for (let e3 = 0; e3 < this.markers.length; e3++) this.markers[e3].dispose();
            this.markers.length = 0, this._isClearing = false;
          }
          addMarker(e3) {
            const t3 = new c.Marker(e3);
            return this.markers.push(t3), t3.register(this.lines.onTrim(((e4) => {
              t3.line -= e4, t3.line < 0 && t3.dispose();
            }))), t3.register(this.lines.onInsert(((e4) => {
              t3.line >= e4.index && (t3.line += e4.amount);
            }))), t3.register(this.lines.onDelete(((e4) => {
              t3.line >= e4.index && t3.line < e4.index + e4.amount && t3.dispose(), t3.line > e4.index && (t3.line -= e4.amount);
            }))), t3.register(t3.onDispose((() => this._removeMarker(t3)))), t3;
          }
          _removeMarker(e3) {
            this._isClearing || this.markers.splice(this.markers.indexOf(e3), 1);
          }
        };
      }, 6107: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferLine = t2.DEFAULT_ATTR_DATA = void 0;
        const s2 = i2(5451), r = i2(3055), n = i2(8938), o = i2(726);
        t2.DEFAULT_ATTR_DATA = Object.freeze(new s2.AttributeData());
        let a = 0;
        class l {
          constructor(e3, t3, i3 = false) {
            this.isWrapped = i3, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(3 * e3);
            const s3 = t3 || r.CellData.fromCharData([0, n.NULL_CELL_CHAR, n.NULL_CELL_WIDTH, n.NULL_CELL_CODE]);
            for (let t4 = 0; t4 < e3; ++t4) this.setCell(t4, s3);
            this.length = e3;
          }
          get(e3) {
            const t3 = this._data[3 * e3 + 0], i3 = 2097151 & t3;
            return [this._data[3 * e3 + 1], 2097152 & t3 ? this._combined[e3] : i3 ? (0, o.stringFromCodePoint)(i3) : "", t3 >> 22, 2097152 & t3 ? this._combined[e3].charCodeAt(this._combined[e3].length - 1) : i3];
          }
          set(e3, t3) {
            this._data[3 * e3 + 1] = t3[n.CHAR_DATA_ATTR_INDEX], t3[n.CHAR_DATA_CHAR_INDEX].length > 1 ? (this._combined[e3] = t3[1], this._data[3 * e3 + 0] = 2097152 | e3 | t3[n.CHAR_DATA_WIDTH_INDEX] << 22) : this._data[3 * e3 + 0] = t3[n.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | t3[n.CHAR_DATA_WIDTH_INDEX] << 22;
          }
          getWidth(e3) {
            return this._data[3 * e3 + 0] >> 22;
          }
          hasWidth(e3) {
            return 12582912 & this._data[3 * e3 + 0];
          }
          getFg(e3) {
            return this._data[3 * e3 + 1];
          }
          getBg(e3) {
            return this._data[3 * e3 + 2];
          }
          hasContent(e3) {
            return 4194303 & this._data[3 * e3 + 0];
          }
          getCodePoint(e3) {
            const t3 = this._data[3 * e3 + 0];
            return 2097152 & t3 ? this._combined[e3].charCodeAt(this._combined[e3].length - 1) : 2097151 & t3;
          }
          isCombined(e3) {
            return 2097152 & this._data[3 * e3 + 0];
          }
          getString(e3) {
            const t3 = this._data[3 * e3 + 0];
            return 2097152 & t3 ? this._combined[e3] : 2097151 & t3 ? (0, o.stringFromCodePoint)(2097151 & t3) : "";
          }
          isProtected(e3) {
            return 536870912 & this._data[3 * e3 + 2];
          }
          loadCell(e3, t3) {
            return a = 3 * e3, t3.content = this._data[a + 0], t3.fg = this._data[a + 1], t3.bg = this._data[a + 2], 2097152 & t3.content && (t3.combinedData = this._combined[e3]), 268435456 & t3.bg && (t3.extended = this._extendedAttrs[e3]), t3;
          }
          setCell(e3, t3) {
            2097152 & t3.content && (this._combined[e3] = t3.combinedData), 268435456 & t3.bg && (this._extendedAttrs[e3] = t3.extended), this._data[3 * e3 + 0] = t3.content, this._data[3 * e3 + 1] = t3.fg, this._data[3 * e3 + 2] = t3.bg;
          }
          setCellFromCodepoint(e3, t3, i3, s3) {
            268435456 & s3.bg && (this._extendedAttrs[e3] = s3.extended), this._data[3 * e3 + 0] = t3 | i3 << 22, this._data[3 * e3 + 1] = s3.fg, this._data[3 * e3 + 2] = s3.bg;
          }
          addCodepointToCell(e3, t3, i3) {
            let s3 = this._data[3 * e3 + 0];
            2097152 & s3 ? this._combined[e3] += (0, o.stringFromCodePoint)(t3) : 2097151 & s3 ? (this._combined[e3] = (0, o.stringFromCodePoint)(2097151 & s3) + (0, o.stringFromCodePoint)(t3), s3 &= -2097152, s3 |= 2097152) : s3 = t3 | 1 << 22, i3 && (s3 &= -12582913, s3 |= i3 << 22), this._data[3 * e3 + 0] = s3;
          }
          insertCells(e3, t3, i3) {
            if ((e3 %= this.length) && 2 === this.getWidth(e3 - 1) && this.setCellFromCodepoint(e3 - 1, 0, 1, i3), t3 < this.length - e3) {
              const s3 = new r.CellData();
              for (let i4 = this.length - e3 - t3 - 1; i4 >= 0; --i4) this.setCell(e3 + t3 + i4, this.loadCell(e3 + i4, s3));
              for (let s4 = 0; s4 < t3; ++s4) this.setCell(e3 + s4, i3);
            } else for (let t4 = e3; t4 < this.length; ++t4) this.setCell(t4, i3);
            2 === this.getWidth(this.length - 1) && this.setCellFromCodepoint(this.length - 1, 0, 1, i3);
          }
          deleteCells(e3, t3, i3) {
            if (e3 %= this.length, t3 < this.length - e3) {
              const s3 = new r.CellData();
              for (let i4 = 0; i4 < this.length - e3 - t3; ++i4) this.setCell(e3 + i4, this.loadCell(e3 + t3 + i4, s3));
              for (let e4 = this.length - t3; e4 < this.length; ++e4) this.setCell(e4, i3);
            } else for (let t4 = e3; t4 < this.length; ++t4) this.setCell(t4, i3);
            e3 && 2 === this.getWidth(e3 - 1) && this.setCellFromCodepoint(e3 - 1, 0, 1, i3), 0 !== this.getWidth(e3) || this.hasContent(e3) || this.setCellFromCodepoint(e3, 0, 1, i3);
          }
          replaceCells(e3, t3, i3, s3 = false) {
            if (s3) for (e3 && 2 === this.getWidth(e3 - 1) && !this.isProtected(e3 - 1) && this.setCellFromCodepoint(e3 - 1, 0, 1, i3), t3 < this.length && 2 === this.getWidth(t3 - 1) && !this.isProtected(t3) && this.setCellFromCodepoint(t3, 0, 1, i3); e3 < t3 && e3 < this.length; ) this.isProtected(e3) || this.setCell(e3, i3), e3++;
            else for (e3 && 2 === this.getWidth(e3 - 1) && this.setCellFromCodepoint(e3 - 1, 0, 1, i3), t3 < this.length && 2 === this.getWidth(t3 - 1) && this.setCellFromCodepoint(t3, 0, 1, i3); e3 < t3 && e3 < this.length; ) this.setCell(e3++, i3);
          }
          resize(e3, t3) {
            if (e3 === this.length) return 4 * this._data.length * 2 < this._data.buffer.byteLength;
            const i3 = 3 * e3;
            if (e3 > this.length) {
              if (this._data.buffer.byteLength >= 4 * i3) this._data = new Uint32Array(this._data.buffer, 0, i3);
              else {
                const e4 = new Uint32Array(i3);
                e4.set(this._data), this._data = e4;
              }
              for (let i4 = this.length; i4 < e3; ++i4) this.setCell(i4, t3);
            } else {
              this._data = this._data.subarray(0, i3);
              const t4 = Object.keys(this._combined);
              for (let i4 = 0; i4 < t4.length; i4++) {
                const s4 = parseInt(t4[i4], 10);
                s4 >= e3 && delete this._combined[s4];
              }
              const s3 = Object.keys(this._extendedAttrs);
              for (let t5 = 0; t5 < s3.length; t5++) {
                const i4 = parseInt(s3[t5], 10);
                i4 >= e3 && delete this._extendedAttrs[i4];
              }
            }
            return this.length = e3, 4 * i3 * 2 < this._data.buffer.byteLength;
          }
          cleanupMemory() {
            if (4 * this._data.length * 2 < this._data.buffer.byteLength) {
              const e3 = new Uint32Array(this._data.length);
              return e3.set(this._data), this._data = e3, 1;
            }
            return 0;
          }
          fill(e3, t3 = false) {
            if (t3) for (let t4 = 0; t4 < this.length; ++t4) this.isProtected(t4) || this.setCell(t4, e3);
            else {
              this._combined = {}, this._extendedAttrs = {};
              for (let t4 = 0; t4 < this.length; ++t4) this.setCell(t4, e3);
            }
          }
          copyFrom(e3) {
            this.length !== e3.length ? this._data = new Uint32Array(e3._data) : this._data.set(e3._data), this.length = e3.length, this._combined = {};
            for (const t3 in e3._combined) this._combined[t3] = e3._combined[t3];
            this._extendedAttrs = {};
            for (const t3 in e3._extendedAttrs) this._extendedAttrs[t3] = e3._extendedAttrs[t3];
            this.isWrapped = e3.isWrapped;
          }
          clone() {
            const e3 = new l(0);
            e3._data = new Uint32Array(this._data), e3.length = this.length;
            for (const t3 in this._combined) e3._combined[t3] = this._combined[t3];
            for (const t3 in this._extendedAttrs) e3._extendedAttrs[t3] = this._extendedAttrs[t3];
            return e3.isWrapped = this.isWrapped, e3;
          }
          getTrimmedLength() {
            for (let e3 = this.length - 1; e3 >= 0; --e3) if (4194303 & this._data[3 * e3 + 0]) return e3 + (this._data[3 * e3 + 0] >> 22);
            return 0;
          }
          getNoBgTrimmedLength() {
            for (let e3 = this.length - 1; e3 >= 0; --e3) if (4194303 & this._data[3 * e3 + 0] || 50331648 & this._data[3 * e3 + 2]) return e3 + (this._data[3 * e3 + 0] >> 22);
            return 0;
          }
          copyCellsFrom(e3, t3, i3, s3, r2) {
            const n2 = e3._data;
            if (r2) for (let r3 = s3 - 1; r3 >= 0; r3--) {
              for (let e4 = 0; e4 < 3; e4++) this._data[3 * (i3 + r3) + e4] = n2[3 * (t3 + r3) + e4];
              268435456 & n2[3 * (t3 + r3) + 2] && (this._extendedAttrs[i3 + r3] = e3._extendedAttrs[t3 + r3]);
            }
            else for (let r3 = 0; r3 < s3; r3++) {
              for (let e4 = 0; e4 < 3; e4++) this._data[3 * (i3 + r3) + e4] = n2[3 * (t3 + r3) + e4];
              268435456 & n2[3 * (t3 + r3) + 2] && (this._extendedAttrs[i3 + r3] = e3._extendedAttrs[t3 + r3]);
            }
            const o2 = Object.keys(e3._combined);
            for (let s4 = 0; s4 < o2.length; s4++) {
              const r3 = parseInt(o2[s4], 10);
              r3 >= t3 && (this._combined[r3 - t3 + i3] = e3._combined[r3]);
            }
          }
          translateToString(e3, t3, i3, s3) {
            t3 = t3 ?? 0, i3 = i3 ?? this.length, e3 && (i3 = Math.min(i3, this.getTrimmedLength())), s3 && (s3.length = 0);
            let r2 = "";
            for (; t3 < i3; ) {
              const e4 = this._data[3 * t3 + 0], i4 = 2097151 & e4, a2 = 2097152 & e4 ? this._combined[t3] : i4 ? (0, o.stringFromCodePoint)(i4) : n.WHITESPACE_CELL_CHAR;
              if (r2 += a2, s3) for (let e5 = 0; e5 < a2.length; ++e5) s3.push(t3);
              t3 += e4 >> 22 || 1;
            }
            return s3 && s3.push(t3), r2;
          }
        }
        t2.BufferLine = l;
      }, 9384: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.getRangeLength = function(e3, t3) {
          if (e3.start.y > e3.end.y) throw new Error(`Buffer range end (${e3.end.x}, ${e3.end.y}) cannot be before start (${e3.start.x}, ${e3.start.y})`);
          return t3 * (e3.end.y - e3.start.y) + (e3.end.x - e3.start.x + 1);
        };
      }, 732: (e2, t2) => {
        function i2(e3, t3, i3) {
          if (t3 === e3.length - 1) return e3[t3].getTrimmedLength();
          const s2 = !e3[t3].hasContent(i3 - 1) && 1 === e3[t3].getWidth(i3 - 1), r = 2 === e3[t3 + 1].getWidth(0);
          return s2 && r ? i3 - 1 : i3;
        }
        Object.defineProperty(t2, "__esModule", { value: true }), t2.reflowLargerGetLinesToRemove = function(e3, t3, s2, r, n, o) {
          const a = [];
          for (let l = 0; l < e3.length - 1; l++) {
            let h = l, c = e3.get(++h);
            if (!c.isWrapped) continue;
            const d = [e3.get(l)];
            for (; h < e3.length && c.isWrapped; ) d.push(c), c = e3.get(++h);
            if (!o && r >= l && r < h) {
              l += d.length - 1;
              continue;
            }
            let u = 0, _ = i2(d, u, t3), f = 1, p = 0;
            for (; f < d.length; ) {
              const e4 = i2(d, f, t3), r2 = e4 - p, o2 = s2 - _, a2 = Math.min(r2, o2);
              d[u].copyCellsFrom(d[f], p, _, a2, false), _ += a2, _ === s2 && (u++, _ = 0), p += a2, p === e4 && (f++, p = 0), 0 === _ && 0 !== u && 2 === d[u - 1].getWidth(s2 - 1) && (d[u].copyCellsFrom(d[u - 1], s2 - 1, _++, 1, false), d[u - 1].setCell(s2 - 1, n));
            }
            d[u].replaceCells(_, s2, n);
            let g = 0;
            for (let e4 = d.length - 1; e4 > 0 && (e4 > u || 0 === d[e4].getTrimmedLength()); e4--) g++;
            g > 0 && (a.push(l + d.length - g), a.push(g)), l += d.length - 1;
          }
          return a;
        }, t2.reflowLargerCreateNewLayout = function(e3, t3) {
          const i3 = [];
          let s2 = 0, r = t3[s2], n = 0;
          for (let o = 0; o < e3.length; o++) if (r === o) {
            const i4 = t3[++s2];
            e3.onDeleteEmitter.fire({ index: o - n, amount: i4 }), o += i4 - 1, n += i4, r = t3[++s2];
          } else i3.push(o);
          return { layout: i3, countRemoved: n };
        }, t2.reflowLargerApplyNewLayout = function(e3, t3) {
          const i3 = [];
          for (let s2 = 0; s2 < t3.length; s2++) i3.push(e3.get(t3[s2]));
          for (let t4 = 0; t4 < i3.length; t4++) e3.set(t4, i3[t4]);
          e3.length = t3.length;
        }, t2.reflowSmallerGetNewLineLengths = function(e3, t3, s2) {
          const r = [], n = e3.map(((s3, r2) => i2(e3, r2, t3))).reduce(((e4, t4) => e4 + t4));
          let o = 0, a = 0, l = 0;
          for (; l < n; ) {
            if (n - l < s2) {
              r.push(n - l);
              break;
            }
            o += s2;
            const h = i2(e3, a, t3);
            o > h && (o -= h, a++);
            const c = 2 === e3[a].getWidth(o - 1);
            c && o--;
            const d = c ? s2 - 1 : s2;
            r.push(d), l += d;
          }
          return r;
        }, t2.getWrappedLineTrimmedLength = i2;
      }, 4097: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferSet = void 0;
        const s2 = i2(7150), r = i2(1073), n = i2(802);
        class o extends s2.Disposable {
          constructor(e3, t3) {
            super(), this._optionsService = e3, this._bufferService = t3, this._onBufferActivate = this._register(new n.Emitter()), this.onBufferActivate = this._onBufferActivate.event, this.reset(), this._register(this._optionsService.onSpecificOptionChange("scrollback", (() => this.resize(this._bufferService.cols, this._bufferService.rows)))), this._register(this._optionsService.onSpecificOptionChange("tabStopWidth", (() => this.setupTabStops())));
          }
          reset() {
            this._normal = new r.Buffer(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new r.Buffer(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
          }
          get alt() {
            return this._alt;
          }
          get active() {
            return this._activeBuffer;
          }
          get normal() {
            return this._normal;
          }
          activateNormalBuffer() {
            this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
          }
          activateAltBuffer(e3) {
            this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e3), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
          }
          resize(e3, t3) {
            this._normal.resize(e3, t3), this._alt.resize(e3, t3), this.setupTabStops(e3);
          }
          setupTabStops(e3) {
            this._normal.setupTabStops(e3), this._alt.setupTabStops(e3);
          }
        }
        t2.BufferSet = o;
      }, 3055: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CellData = void 0;
        const s2 = i2(726), r = i2(8938), n = i2(5451);
        class o extends n.AttributeData {
          constructor() {
            super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new n.ExtendedAttrs(), this.combinedData = "";
          }
          static fromCharData(e3) {
            const t3 = new o();
            return t3.setFromCharData(e3), t3;
          }
          isCombined() {
            return 2097152 & this.content;
          }
          getWidth() {
            return this.content >> 22;
          }
          getChars() {
            return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0, s2.stringFromCodePoint)(2097151 & this.content) : "";
          }
          getCode() {
            return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content;
          }
          setFromCharData(e3) {
            this.fg = e3[r.CHAR_DATA_ATTR_INDEX], this.bg = 0;
            let t3 = false;
            if (e3[r.CHAR_DATA_CHAR_INDEX].length > 2) t3 = true;
            else if (2 === e3[r.CHAR_DATA_CHAR_INDEX].length) {
              const i3 = e3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
              if (55296 <= i3 && i3 <= 56319) {
                const s3 = e3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
                56320 <= s3 && s3 <= 57343 ? this.content = 1024 * (i3 - 55296) + s3 - 56320 + 65536 | e3[r.CHAR_DATA_WIDTH_INDEX] << 22 : t3 = true;
              } else t3 = true;
            } else this.content = e3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | e3[r.CHAR_DATA_WIDTH_INDEX] << 22;
            t3 && (this.combinedData = e3[r.CHAR_DATA_CHAR_INDEX], this.content = 2097152 | e3[r.CHAR_DATA_WIDTH_INDEX] << 22);
          }
          getAsCharData() {
            return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
          }
        }
        t2.CellData = o;
      }, 8938: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.WHITESPACE_CELL_CODE = t2.WHITESPACE_CELL_WIDTH = t2.WHITESPACE_CELL_CHAR = t2.NULL_CELL_CODE = t2.NULL_CELL_WIDTH = t2.NULL_CELL_CHAR = t2.CHAR_DATA_CODE_INDEX = t2.CHAR_DATA_WIDTH_INDEX = t2.CHAR_DATA_CHAR_INDEX = t2.CHAR_DATA_ATTR_INDEX = t2.DEFAULT_EXT = t2.DEFAULT_ATTR = t2.DEFAULT_COLOR = void 0, t2.DEFAULT_COLOR = 0, t2.DEFAULT_ATTR = t2.DEFAULT_COLOR << 9 | 256, t2.DEFAULT_EXT = 0, t2.CHAR_DATA_ATTR_INDEX = 0, t2.CHAR_DATA_CHAR_INDEX = 1, t2.CHAR_DATA_WIDTH_INDEX = 2, t2.CHAR_DATA_CODE_INDEX = 3, t2.NULL_CELL_CHAR = "", t2.NULL_CELL_WIDTH = 1, t2.NULL_CELL_CODE = 0, t2.WHITESPACE_CELL_CHAR = " ", t2.WHITESPACE_CELL_WIDTH = 1, t2.WHITESPACE_CELL_CODE = 32;
      }, 8158: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Marker = void 0;
        const s2 = i2(802), r = i2(7150);
        class n {
          get id() {
            return this._id;
          }
          constructor(e3) {
            this.line = e3, this.isDisposed = false, this._disposables = [], this._id = n._nextId++, this._onDispose = this.register(new s2.Emitter()), this.onDispose = this._onDispose.event;
          }
          dispose() {
            this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), (0, r.dispose)(this._disposables), this._disposables.length = 0);
          }
          register(e3) {
            return this._disposables.push(e3), e3;
          }
        }
        t2.Marker = n, n._nextId = 1;
      }, 6760: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DEFAULT_CHARSET = t2.CHARSETS = void 0, t2.CHARSETS = {}, t2.DEFAULT_CHARSET = t2.CHARSETS.B, t2.CHARSETS[0] = { "`": "\u25C6", a: "\u2592", b: "\u2409", c: "\u240C", d: "\u240D", e: "\u240A", f: "\xB0", g: "\xB1", h: "\u2424", i: "\u240B", j: "\u2518", k: "\u2510", l: "\u250C", m: "\u2514", n: "\u253C", o: "\u23BA", p: "\u23BB", q: "\u2500", r: "\u23BC", s: "\u23BD", t: "\u251C", u: "\u2524", v: "\u2534", w: "\u252C", x: "\u2502", y: "\u2264", z: "\u2265", "{": "\u03C0", "|": "\u2260", "}": "\xA3", "~": "\xB7" }, t2.CHARSETS.A = { "#": "\xA3" }, t2.CHARSETS.B = void 0, t2.CHARSETS[4] = { "#": "\xA3", "@": "\xBE", "[": "ij", "\\": "\xBD", "]": "|", "{": "\xA8", "|": "f", "}": "\xBC", "~": "\xB4" }, t2.CHARSETS.C = t2.CHARSETS[5] = { "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" }, t2.CHARSETS.R = { "#": "\xA3", "@": "\xE0", "[": "\xB0", "\\": "\xE7", "]": "\xA7", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xA8" }, t2.CHARSETS.Q = { "@": "\xE0", "[": "\xE2", "\\": "\xE7", "]": "\xEA", "^": "\xEE", "`": "\xF4", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xFB" }, t2.CHARSETS.K = { "@": "\xA7", "[": "\xC4", "\\": "\xD6", "]": "\xDC", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xDF" }, t2.CHARSETS.Y = { "#": "\xA3", "@": "\xA7", "[": "\xB0", "\\": "\xE7", "]": "\xE9", "`": "\xF9", "{": "\xE0", "|": "\xF2", "}": "\xE8", "~": "\xEC" }, t2.CHARSETS.E = t2.CHARSETS[6] = { "@": "\xC4", "[": "\xC6", "\\": "\xD8", "]": "\xC5", "^": "\xDC", "`": "\xE4", "{": "\xE6", "|": "\xF8", "}": "\xE5", "~": "\xFC" }, t2.CHARSETS.Z = { "#": "\xA3", "@": "\xA7", "[": "\xA1", "\\": "\xD1", "]": "\xBF", "{": "\xB0", "|": "\xF1", "}": "\xE7" }, t2.CHARSETS.H = t2.CHARSETS[7] = { "@": "\xC9", "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" }, t2.CHARSETS["="] = { "#": "\xF9", "@": "\xE0", "[": "\xE9", "\\": "\xE7", "]": "\xEA", "^": "\xEE", _: "\xE8", "`": "\xF4", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xFB" };
      }, 3534: (e2, t2) => {
        var i2, s2, r;
        Object.defineProperty(t2, "__esModule", { value: true }), t2.C1_ESCAPED = t2.C1 = t2.C0 = void 0, (function(e3) {
          e3.NUL = "\0", e3.SOH = "", e3.STX = "", e3.ETX = "", e3.EOT = "", e3.ENQ = "", e3.ACK = "", e3.BEL = "\x07", e3.BS = "\b", e3.HT = "	", e3.LF = "\n", e3.VT = "\v", e3.FF = "\f", e3.CR = "\r", e3.SO = "", e3.SI = "", e3.DLE = "", e3.DC1 = "", e3.DC2 = "", e3.DC3 = "", e3.DC4 = "", e3.NAK = "", e3.SYN = "", e3.ETB = "", e3.CAN = "", e3.EM = "", e3.SUB = "", e3.ESC = "\x1B", e3.FS = "", e3.GS = "", e3.RS = "", e3.US = "", e3.SP = " ", e3.DEL = "\x7F";
        })(i2 || (t2.C0 = i2 = {})), (function(e3) {
          e3.PAD = "\x80", e3.HOP = "\x81", e3.BPH = "\x82", e3.NBH = "\x83", e3.IND = "\x84", e3.NEL = "\x85", e3.SSA = "\x86", e3.ESA = "\x87", e3.HTS = "\x88", e3.HTJ = "\x89", e3.VTS = "\x8A", e3.PLD = "\x8B", e3.PLU = "\x8C", e3.RI = "\x8D", e3.SS2 = "\x8E", e3.SS3 = "\x8F", e3.DCS = "\x90", e3.PU1 = "\x91", e3.PU2 = "\x92", e3.STS = "\x93", e3.CCH = "\x94", e3.MW = "\x95", e3.SPA = "\x96", e3.EPA = "\x97", e3.SOS = "\x98", e3.SGCI = "\x99", e3.SCI = "\x9A", e3.CSI = "\x9B", e3.ST = "\x9C", e3.OSC = "\x9D", e3.PM = "\x9E", e3.APC = "\x9F";
        })(s2 || (t2.C1 = s2 = {})), (function(e3) {
          e3.ST = `${i2.ESC}\\`;
        })(r || (t2.C1_ESCAPED = r = {}));
      }, 706: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.evaluateKeyboardEvent = function(e3, t3, i3, n) {
          const o = { type: 0, cancel: false, key: void 0 }, a = (e3.shiftKey ? 1 : 0) | (e3.altKey ? 2 : 0) | (e3.ctrlKey ? 4 : 0) | (e3.metaKey ? 8 : 0);
          switch (e3.keyCode) {
            case 0:
              "UIKeyInputUpArrow" === e3.key ? o.key = t3 ? s2.C0.ESC + "OA" : s2.C0.ESC + "[A" : "UIKeyInputLeftArrow" === e3.key ? o.key = t3 ? s2.C0.ESC + "OD" : s2.C0.ESC + "[D" : "UIKeyInputRightArrow" === e3.key ? o.key = t3 ? s2.C0.ESC + "OC" : s2.C0.ESC + "[C" : "UIKeyInputDownArrow" === e3.key && (o.key = t3 ? s2.C0.ESC + "OB" : s2.C0.ESC + "[B");
              break;
            case 8:
              o.key = e3.ctrlKey ? "\b" : s2.C0.DEL, e3.altKey && (o.key = s2.C0.ESC + o.key);
              break;
            case 9:
              if (e3.shiftKey) {
                o.key = s2.C0.ESC + "[Z";
                break;
              }
              o.key = s2.C0.HT, o.cancel = true;
              break;
            case 13:
              o.key = e3.altKey ? s2.C0.ESC + s2.C0.CR : s2.C0.CR, o.cancel = true;
              break;
            case 27:
              o.key = s2.C0.ESC, e3.altKey && (o.key = s2.C0.ESC + s2.C0.ESC), o.cancel = true;
              break;
            case 37:
              if (e3.metaKey) break;
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "D" : t3 ? s2.C0.ESC + "OD" : s2.C0.ESC + "[D";
              break;
            case 39:
              if (e3.metaKey) break;
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "C" : t3 ? s2.C0.ESC + "OC" : s2.C0.ESC + "[C";
              break;
            case 38:
              if (e3.metaKey) break;
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "A" : t3 ? s2.C0.ESC + "OA" : s2.C0.ESC + "[A";
              break;
            case 40:
              if (e3.metaKey) break;
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "B" : t3 ? s2.C0.ESC + "OB" : s2.C0.ESC + "[B";
              break;
            case 45:
              e3.shiftKey || e3.ctrlKey || (o.key = s2.C0.ESC + "[2~");
              break;
            case 46:
              o.key = a ? s2.C0.ESC + "[3;" + (a + 1) + "~" : s2.C0.ESC + "[3~";
              break;
            case 36:
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "H" : t3 ? s2.C0.ESC + "OH" : s2.C0.ESC + "[H";
              break;
            case 35:
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "F" : t3 ? s2.C0.ESC + "OF" : s2.C0.ESC + "[F";
              break;
            case 33:
              e3.shiftKey ? o.type = 2 : e3.ctrlKey ? o.key = s2.C0.ESC + "[5;" + (a + 1) + "~" : o.key = s2.C0.ESC + "[5~";
              break;
            case 34:
              e3.shiftKey ? o.type = 3 : e3.ctrlKey ? o.key = s2.C0.ESC + "[6;" + (a + 1) + "~" : o.key = s2.C0.ESC + "[6~";
              break;
            case 112:
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "P" : s2.C0.ESC + "OP";
              break;
            case 113:
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "Q" : s2.C0.ESC + "OQ";
              break;
            case 114:
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "R" : s2.C0.ESC + "OR";
              break;
            case 115:
              o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "S" : s2.C0.ESC + "OS";
              break;
            case 116:
              o.key = a ? s2.C0.ESC + "[15;" + (a + 1) + "~" : s2.C0.ESC + "[15~";
              break;
            case 117:
              o.key = a ? s2.C0.ESC + "[17;" + (a + 1) + "~" : s2.C0.ESC + "[17~";
              break;
            case 118:
              o.key = a ? s2.C0.ESC + "[18;" + (a + 1) + "~" : s2.C0.ESC + "[18~";
              break;
            case 119:
              o.key = a ? s2.C0.ESC + "[19;" + (a + 1) + "~" : s2.C0.ESC + "[19~";
              break;
            case 120:
              o.key = a ? s2.C0.ESC + "[20;" + (a + 1) + "~" : s2.C0.ESC + "[20~";
              break;
            case 121:
              o.key = a ? s2.C0.ESC + "[21;" + (a + 1) + "~" : s2.C0.ESC + "[21~";
              break;
            case 122:
              o.key = a ? s2.C0.ESC + "[23;" + (a + 1) + "~" : s2.C0.ESC + "[23~";
              break;
            case 123:
              o.key = a ? s2.C0.ESC + "[24;" + (a + 1) + "~" : s2.C0.ESC + "[24~";
              break;
            default:
              if (!e3.ctrlKey || e3.shiftKey || e3.altKey || e3.metaKey) if (i3 && !n || !e3.altKey || e3.metaKey) !i3 || e3.altKey || e3.ctrlKey || e3.shiftKey || !e3.metaKey ? e3.key && !e3.ctrlKey && !e3.altKey && !e3.metaKey && e3.keyCode >= 48 && 1 === e3.key.length ? o.key = e3.key : e3.key && e3.ctrlKey && ("_" === e3.key && (o.key = s2.C0.US), "@" === e3.key && (o.key = s2.C0.NUL)) : 65 === e3.keyCode && (o.type = 1);
              else {
                const t4 = r[e3.keyCode], i4 = t4?.[e3.shiftKey ? 1 : 0];
                if (i4) o.key = s2.C0.ESC + i4;
                else if (e3.keyCode >= 65 && e3.keyCode <= 90) {
                  const t5 = e3.ctrlKey ? e3.keyCode - 64 : e3.keyCode + 32;
                  let i5 = String.fromCharCode(t5);
                  e3.shiftKey && (i5 = i5.toUpperCase()), o.key = s2.C0.ESC + i5;
                } else if (32 === e3.keyCode) o.key = s2.C0.ESC + (e3.ctrlKey ? s2.C0.NUL : " ");
                else if ("Dead" === e3.key && e3.code.startsWith("Key")) {
                  let t5 = e3.code.slice(3, 4);
                  e3.shiftKey || (t5 = t5.toLowerCase()), o.key = s2.C0.ESC + t5, o.cancel = true;
                }
              }
              else e3.keyCode >= 65 && e3.keyCode <= 90 ? o.key = String.fromCharCode(e3.keyCode - 64) : 32 === e3.keyCode ? o.key = s2.C0.NUL : e3.keyCode >= 51 && e3.keyCode <= 55 ? o.key = String.fromCharCode(e3.keyCode - 51 + 27) : 56 === e3.keyCode ? o.key = s2.C0.DEL : 219 === e3.keyCode ? o.key = s2.C0.ESC : 220 === e3.keyCode ? o.key = s2.C0.FS : 221 === e3.keyCode && (o.key = s2.C0.GS);
          }
          return o;
        };
        const s2 = i2(3534), r = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
      }, 726: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Utf8ToUtf32 = t2.StringToUtf32 = void 0, t2.stringFromCodePoint = function(e3) {
          return e3 > 65535 ? (e3 -= 65536, String.fromCharCode(55296 + (e3 >> 10)) + String.fromCharCode(e3 % 1024 + 56320)) : String.fromCharCode(e3);
        }, t2.utf32ToString = function(e3, t3 = 0, i2 = e3.length) {
          let s2 = "";
          for (let r = t3; r < i2; ++r) {
            let t4 = e3[r];
            t4 > 65535 ? (t4 -= 65536, s2 += String.fromCharCode(55296 + (t4 >> 10)) + String.fromCharCode(t4 % 1024 + 56320)) : s2 += String.fromCharCode(t4);
          }
          return s2;
        }, t2.StringToUtf32 = class {
          constructor() {
            this._interim = 0;
          }
          clear() {
            this._interim = 0;
          }
          decode(e3, t3) {
            const i2 = e3.length;
            if (!i2) return 0;
            let s2 = 0, r = 0;
            if (this._interim) {
              const i3 = e3.charCodeAt(r++);
              56320 <= i3 && i3 <= 57343 ? t3[s2++] = 1024 * (this._interim - 55296) + i3 - 56320 + 65536 : (t3[s2++] = this._interim, t3[s2++] = i3), this._interim = 0;
            }
            for (let n = r; n < i2; ++n) {
              const r2 = e3.charCodeAt(n);
              if (55296 <= r2 && r2 <= 56319) {
                if (++n >= i2) return this._interim = r2, s2;
                const o = e3.charCodeAt(n);
                56320 <= o && o <= 57343 ? t3[s2++] = 1024 * (r2 - 55296) + o - 56320 + 65536 : (t3[s2++] = r2, t3[s2++] = o);
              } else 65279 !== r2 && (t3[s2++] = r2);
            }
            return s2;
          }
        }, t2.Utf8ToUtf32 = class {
          constructor() {
            this.interim = new Uint8Array(3);
          }
          clear() {
            this.interim.fill(0);
          }
          decode(e3, t3) {
            const i2 = e3.length;
            if (!i2) return 0;
            let s2, r, n, o, a = 0, l = 0, h = 0;
            if (this.interim[0]) {
              let s3 = false, r2 = this.interim[0];
              r2 &= 192 == (224 & r2) ? 31 : 224 == (240 & r2) ? 15 : 7;
              let n2, o2 = 0;
              for (; (n2 = 63 & this.interim[++o2]) && o2 < 4; ) r2 <<= 6, r2 |= n2;
              const l2 = 192 == (224 & this.interim[0]) ? 2 : 224 == (240 & this.interim[0]) ? 3 : 4, c2 = l2 - o2;
              for (; h < c2; ) {
                if (h >= i2) return 0;
                if (n2 = e3[h++], 128 != (192 & n2)) {
                  h--, s3 = true;
                  break;
                }
                this.interim[o2++] = n2, r2 <<= 6, r2 |= 63 & n2;
              }
              s3 || (2 === l2 ? r2 < 128 ? h-- : t3[a++] = r2 : 3 === l2 ? r2 < 2048 || r2 >= 55296 && r2 <= 57343 || 65279 === r2 || (t3[a++] = r2) : r2 < 65536 || r2 > 1114111 || (t3[a++] = r2)), this.interim.fill(0);
            }
            const c = i2 - 4;
            let d = h;
            for (; d < i2; ) {
              for (; !(!(d < c) || 128 & (s2 = e3[d]) || 128 & (r = e3[d + 1]) || 128 & (n = e3[d + 2]) || 128 & (o = e3[d + 3])); ) t3[a++] = s2, t3[a++] = r, t3[a++] = n, t3[a++] = o, d += 4;
              if (s2 = e3[d++], s2 < 128) t3[a++] = s2;
              else if (192 == (224 & s2)) {
                if (d >= i2) return this.interim[0] = s2, a;
                if (r = e3[d++], 128 != (192 & r)) {
                  d--;
                  continue;
                }
                if (l = (31 & s2) << 6 | 63 & r, l < 128) {
                  d--;
                  continue;
                }
                t3[a++] = l;
              } else if (224 == (240 & s2)) {
                if (d >= i2) return this.interim[0] = s2, a;
                if (r = e3[d++], 128 != (192 & r)) {
                  d--;
                  continue;
                }
                if (d >= i2) return this.interim[0] = s2, this.interim[1] = r, a;
                if (n = e3[d++], 128 != (192 & n)) {
                  d--;
                  continue;
                }
                if (l = (15 & s2) << 12 | (63 & r) << 6 | 63 & n, l < 2048 || l >= 55296 && l <= 57343 || 65279 === l) continue;
                t3[a++] = l;
              } else if (240 == (248 & s2)) {
                if (d >= i2) return this.interim[0] = s2, a;
                if (r = e3[d++], 128 != (192 & r)) {
                  d--;
                  continue;
                }
                if (d >= i2) return this.interim[0] = s2, this.interim[1] = r, a;
                if (n = e3[d++], 128 != (192 & n)) {
                  d--;
                  continue;
                }
                if (d >= i2) return this.interim[0] = s2, this.interim[1] = r, this.interim[2] = n, a;
                if (o = e3[d++], 128 != (192 & o)) {
                  d--;
                  continue;
                }
                if (l = (7 & s2) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & o, l < 65536 || l > 1114111) continue;
                t3[a++] = l;
              }
            }
            return a;
          }
        };
      }, 7428: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.UnicodeV6 = void 0;
        const s2 = i2(6415), r = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]], n = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
        let o;
        t2.UnicodeV6 = class {
          constructor() {
            if (this.version = "6", !o) {
              o = new Uint8Array(65536), o.fill(1), o[0] = 0, o.fill(0, 1, 32), o.fill(0, 127, 160), o.fill(2, 4352, 4448), o[9001] = 2, o[9002] = 2, o.fill(2, 11904, 42192), o[12351] = 1, o.fill(2, 44032, 55204), o.fill(2, 63744, 64256), o.fill(2, 65040, 65050), o.fill(2, 65072, 65136), o.fill(2, 65280, 65377), o.fill(2, 65504, 65511);
              for (let e3 = 0; e3 < r.length; ++e3) o.fill(0, r[e3][0], r[e3][1] + 1);
            }
          }
          wcwidth(e3) {
            return e3 < 32 ? 0 : e3 < 127 ? 1 : e3 < 65536 ? o[e3] : (function(e4, t3) {
              let i3, s3 = 0, r2 = t3.length - 1;
              if (e4 < t3[0][0] || e4 > t3[r2][1]) return false;
              for (; r2 >= s3; ) if (i3 = s3 + r2 >> 1, e4 > t3[i3][1]) s3 = i3 + 1;
              else {
                if (!(e4 < t3[i3][0])) return true;
                r2 = i3 - 1;
              }
              return false;
            })(e3, n) ? 0 : e3 >= 131072 && e3 <= 196605 || e3 >= 196608 && e3 <= 262141 ? 2 : 1;
          }
          charProperties(e3, t3) {
            let i3 = this.wcwidth(e3), r2 = 0 === i3 && 0 !== t3;
            if (r2) {
              const e4 = s2.UnicodeService.extractWidth(t3);
              0 === e4 ? r2 = false : e4 > i3 && (i3 = e4);
            }
            return s2.UnicodeService.createPropertyValue(0, i3, r2);
          }
        };
      }, 3562: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.WriteBuffer = void 0;
        const s2 = i2(7150), r = i2(802);
        class n extends s2.Disposable {
          constructor(e3) {
            super(), this._action = e3, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = false, this._syncCalls = 0, this._didUserInput = false, this._onWriteParsed = this._register(new r.Emitter()), this.onWriteParsed = this._onWriteParsed.event;
          }
          handleUserInput() {
            this._didUserInput = true;
          }
          writeSync(e3, t3) {
            if (void 0 !== t3 && this._syncCalls > t3) return void (this._syncCalls = 0);
            if (this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
            let i3;
            for (this._isSyncWriting = true; i3 = this._writeBuffer.shift(); ) {
              this._action(i3);
              const e4 = this._callbacks.shift();
              e4 && e4();
            }
            this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
          }
          write(e3, t3) {
            if (this._pendingData > 5e7) throw new Error("write data discarded, use flow control to avoid losing data");
            if (!this._writeBuffer.length) {
              if (this._bufferOffset = 0, this._didUserInput) return this._didUserInput = false, this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(t3), void this._innerWrite();
              setTimeout((() => this._innerWrite()));
            }
            this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(t3);
          }
          _innerWrite(e3 = 0, t3 = true) {
            const i3 = e3 || performance.now();
            for (; this._writeBuffer.length > this._bufferOffset; ) {
              const e4 = this._writeBuffer[this._bufferOffset], s3 = this._action(e4, t3);
              if (s3) {
                const e5 = (e6) => performance.now() - i3 >= 12 ? setTimeout((() => this._innerWrite(0, e6))) : this._innerWrite(i3, e6);
                return void s3.catch(((e6) => (queueMicrotask((() => {
                  throw e6;
                })), Promise.resolve(false)))).then(e5);
              }
              const r2 = this._callbacks[this._bufferOffset];
              if (r2 && r2(), this._bufferOffset++, this._pendingData -= e4.length, performance.now() - i3 >= 12) break;
            }
            this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > 50 && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout((() => this._innerWrite()))) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
          }
        }
        t2.WriteBuffer = n;
      }, 8693: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.parseColor = function(e3) {
          if (!e3) return;
          let t3 = e3.toLowerCase();
          if (0 === t3.indexOf("rgb:")) {
            t3 = t3.slice(4);
            const e4 = i2.exec(t3);
            if (e4) {
              const t4 = e4[1] ? 15 : e4[4] ? 255 : e4[7] ? 4095 : 65535;
              return [Math.round(parseInt(e4[1] || e4[4] || e4[7] || e4[10], 16) / t4 * 255), Math.round(parseInt(e4[2] || e4[5] || e4[8] || e4[11], 16) / t4 * 255), Math.round(parseInt(e4[3] || e4[6] || e4[9] || e4[12], 16) / t4 * 255)];
            }
          } else if (0 === t3.indexOf("#") && (t3 = t3.slice(1), s2.exec(t3) && [3, 6, 9, 12].includes(t3.length))) {
            const e4 = t3.length / 3, i3 = [0, 0, 0];
            for (let s3 = 0; s3 < 3; ++s3) {
              const r2 = parseInt(t3.slice(e4 * s3, e4 * s3 + e4), 16);
              i3[s3] = 1 === e4 ? r2 << 4 : 2 === e4 ? r2 : 3 === e4 ? r2 >> 4 : r2 >> 8;
            }
            return i3;
          }
        }, t2.toRgbString = function(e3, t3 = 16) {
          const [i3, s3, n] = e3;
          return `rgb:${r(i3, t3)}/${r(s3, t3)}/${r(n, t3)}`;
        };
        const i2 = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, s2 = /^[\da-f]+$/;
        function r(e3, t3) {
          const i3 = e3.toString(16), s3 = i3.length < 2 ? "0" + i3 : i3;
          switch (t3) {
            case 4:
              return i3[0];
            case 8:
              return s3;
            case 12:
              return (s3 + s3).slice(0, 3);
            default:
              return s3 + s3;
          }
        }
      }, 1263: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.PAYLOAD_LIMIT = void 0, t2.PAYLOAD_LIMIT = 1e7;
      }, 9823: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DcsHandler = t2.DcsParser = void 0;
        const s2 = i2(726), r = i2(7262), n = i2(1263), o = [];
        t2.DcsParser = class {
          constructor() {
            this._handlers = /* @__PURE__ */ Object.create(null), this._active = o, this._ident = 0, this._handlerFb = () => {
            }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
          }
          dispose() {
            this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
            }, this._active = o;
          }
          registerHandler(e3, t3) {
            void 0 === this._handlers[e3] && (this._handlers[e3] = []);
            const i3 = this._handlers[e3];
            return i3.push(t3), { dispose: () => {
              const e4 = i3.indexOf(t3);
              -1 !== e4 && i3.splice(e4, 1);
            } };
          }
          clearHandler(e3) {
            this._handlers[e3] && delete this._handlers[e3];
          }
          setHandlerFallback(e3) {
            this._handlerFb = e3;
          }
          reset() {
            if (this._active.length) for (let e3 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e3 >= 0; --e3) this._active[e3].unhook(false);
            this._stack.paused = false, this._active = o, this._ident = 0;
          }
          hook(e3, t3) {
            if (this.reset(), this._ident = e3, this._active = this._handlers[e3] || o, this._active.length) for (let e4 = this._active.length - 1; e4 >= 0; e4--) this._active[e4].hook(t3);
            else this._handlerFb(this._ident, "HOOK", t3);
          }
          put(e3, t3, i3) {
            if (this._active.length) for (let s3 = this._active.length - 1; s3 >= 0; s3--) this._active[s3].put(e3, t3, i3);
            else this._handlerFb(this._ident, "PUT", (0, s2.utf32ToString)(e3, t3, i3));
          }
          unhook(e3, t3 = true) {
            if (this._active.length) {
              let i3 = false, s3 = this._active.length - 1, r2 = false;
              if (this._stack.paused && (s3 = this._stack.loopPosition - 1, i3 = t3, r2 = this._stack.fallThrough, this._stack.paused = false), !r2 && false === i3) {
                for (; s3 >= 0 && (i3 = this._active[s3].unhook(e3), true !== i3); s3--) if (i3 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = false, i3;
                s3--;
              }
              for (; s3 >= 0; s3--) if (i3 = this._active[s3].unhook(false), i3 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = true, i3;
            } else this._handlerFb(this._ident, "UNHOOK", e3);
            this._active = o, this._ident = 0;
          }
        };
        const a = new r.Params();
        a.addParam(0), t2.DcsHandler = class {
          constructor(e3) {
            this._handler = e3, this._data = "", this._params = a, this._hitLimit = false;
          }
          hook(e3) {
            this._params = e3.length > 1 || e3.params[0] ? e3.clone() : a, this._data = "", this._hitLimit = false;
          }
          put(e3, t3, i3) {
            this._hitLimit || (this._data += (0, s2.utf32ToString)(e3, t3, i3), this._data.length > n.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
          }
          unhook(e3) {
            let t3 = false;
            if (this._hitLimit) t3 = false;
            else if (e3 && (t3 = this._handler(this._data, this._params), t3 instanceof Promise)) return t3.then(((e4) => (this._params = a, this._data = "", this._hitLimit = false, e4)));
            return this._params = a, this._data = "", this._hitLimit = false, t3;
          }
        };
      }, 6717: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.EscapeSequenceParser = t2.VT500_TRANSITION_TABLE = t2.TransitionTable = void 0;
        const s2 = i2(7150), r = i2(7262), n = i2(1346), o = i2(9823);
        class a {
          constructor(e3) {
            this.table = new Uint8Array(e3);
          }
          setDefault(e3, t3) {
            this.table.fill(e3 << 4 | t3);
          }
          add(e3, t3, i3, s3) {
            this.table[t3 << 8 | e3] = i3 << 4 | s3;
          }
          addMany(e3, t3, i3, s3) {
            for (let r2 = 0; r2 < e3.length; r2++) this.table[t3 << 8 | e3[r2]] = i3 << 4 | s3;
          }
        }
        t2.TransitionTable = a;
        const l = 160;
        t2.VT500_TRANSITION_TABLE = (function() {
          const e3 = new a(4095), t3 = Array.apply(null, Array(256)).map(((e4, t4) => t4)), i3 = (e4, i4) => t3.slice(e4, i4), s3 = i3(32, 127), r2 = i3(0, 24);
          r2.push(25), r2.push.apply(r2, i3(28, 32));
          const n2 = i3(0, 14);
          let o2;
          for (o2 in e3.setDefault(1, 0), e3.addMany(s3, 0, 2, 0), n2) e3.addMany([24, 26, 153, 154], o2, 3, 0), e3.addMany(i3(128, 144), o2, 3, 0), e3.addMany(i3(144, 152), o2, 3, 0), e3.add(156, o2, 0, 0), e3.add(27, o2, 11, 1), e3.add(157, o2, 4, 8), e3.addMany([152, 158, 159], o2, 0, 7), e3.add(155, o2, 11, 3), e3.add(144, o2, 11, 9);
          return e3.addMany(r2, 0, 3, 0), e3.addMany(r2, 1, 3, 1), e3.add(127, 1, 0, 1), e3.addMany(r2, 8, 0, 8), e3.addMany(r2, 3, 3, 3), e3.add(127, 3, 0, 3), e3.addMany(r2, 4, 3, 4), e3.add(127, 4, 0, 4), e3.addMany(r2, 6, 3, 6), e3.addMany(r2, 5, 3, 5), e3.add(127, 5, 0, 5), e3.addMany(r2, 2, 3, 2), e3.add(127, 2, 0, 2), e3.add(93, 1, 4, 8), e3.addMany(s3, 8, 5, 8), e3.add(127, 8, 5, 8), e3.addMany([156, 27, 24, 26, 7], 8, 6, 0), e3.addMany(i3(28, 32), 8, 0, 8), e3.addMany([88, 94, 95], 1, 0, 7), e3.addMany(s3, 7, 0, 7), e3.addMany(r2, 7, 0, 7), e3.add(156, 7, 0, 0), e3.add(127, 7, 0, 7), e3.add(91, 1, 11, 3), e3.addMany(i3(64, 127), 3, 7, 0), e3.addMany(i3(48, 60), 3, 8, 4), e3.addMany([60, 61, 62, 63], 3, 9, 4), e3.addMany(i3(48, 60), 4, 8, 4), e3.addMany(i3(64, 127), 4, 7, 0), e3.addMany([60, 61, 62, 63], 4, 0, 6), e3.addMany(i3(32, 64), 6, 0, 6), e3.add(127, 6, 0, 6), e3.addMany(i3(64, 127), 6, 0, 0), e3.addMany(i3(32, 48), 3, 9, 5), e3.addMany(i3(32, 48), 5, 9, 5), e3.addMany(i3(48, 64), 5, 0, 6), e3.addMany(i3(64, 127), 5, 7, 0), e3.addMany(i3(32, 48), 4, 9, 5), e3.addMany(i3(32, 48), 1, 9, 2), e3.addMany(i3(32, 48), 2, 9, 2), e3.addMany(i3(48, 127), 2, 10, 0), e3.addMany(i3(48, 80), 1, 10, 0), e3.addMany(i3(81, 88), 1, 10, 0), e3.addMany([89, 90, 92], 1, 10, 0), e3.addMany(i3(96, 127), 1, 10, 0), e3.add(80, 1, 11, 9), e3.addMany(r2, 9, 0, 9), e3.add(127, 9, 0, 9), e3.addMany(i3(28, 32), 9, 0, 9), e3.addMany(i3(32, 48), 9, 9, 12), e3.addMany(i3(48, 60), 9, 8, 10), e3.addMany([60, 61, 62, 63], 9, 9, 10), e3.addMany(r2, 11, 0, 11), e3.addMany(i3(32, 128), 11, 0, 11), e3.addMany(i3(28, 32), 11, 0, 11), e3.addMany(r2, 10, 0, 10), e3.add(127, 10, 0, 10), e3.addMany(i3(28, 32), 10, 0, 10), e3.addMany(i3(48, 60), 10, 8, 10), e3.addMany([60, 61, 62, 63], 10, 0, 11), e3.addMany(i3(32, 48), 10, 9, 12), e3.addMany(r2, 12, 0, 12), e3.add(127, 12, 0, 12), e3.addMany(i3(28, 32), 12, 0, 12), e3.addMany(i3(32, 48), 12, 9, 12), e3.addMany(i3(48, 64), 12, 0, 11), e3.addMany(i3(64, 127), 12, 12, 13), e3.addMany(i3(64, 127), 10, 12, 13), e3.addMany(i3(64, 127), 9, 12, 13), e3.addMany(r2, 13, 13, 13), e3.addMany(s3, 13, 13, 13), e3.add(127, 13, 0, 13), e3.addMany([27, 156, 24, 26], 13, 14, 0), e3.add(l, 0, 2, 0), e3.add(l, 8, 5, 8), e3.add(l, 6, 0, 6), e3.add(l, 11, 0, 11), e3.add(l, 13, 13, 13), e3;
        })();
        class h extends s2.Disposable {
          constructor(e3 = t2.VT500_TRANSITION_TABLE) {
            super(), this._transitions = e3, this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 }, this.initialState = 0, this.currentState = this.initialState, this._params = new r.Params(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (e4, t3, i3) => {
            }, this._executeHandlerFb = (e4) => {
            }, this._csiHandlerFb = (e4, t3) => {
            }, this._escHandlerFb = (e4) => {
            }, this._errorHandlerFb = (e4) => e4, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this._register((0, s2.toDisposable)((() => {
              this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null);
            }))), this._oscParser = this._register(new n.OscParser()), this._dcsParser = this._register(new o.DcsParser()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, (() => true));
          }
          _identifier(e3, t3 = [64, 126]) {
            let i3 = 0;
            if (e3.prefix) {
              if (e3.prefix.length > 1) throw new Error("only one byte as prefix supported");
              if (i3 = e3.prefix.charCodeAt(0), i3 && 60 > i3 || i3 > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
            }
            if (e3.intermediates) {
              if (e3.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
              for (let t4 = 0; t4 < e3.intermediates.length; ++t4) {
                const s4 = e3.intermediates.charCodeAt(t4);
                if (32 > s4 || s4 > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
                i3 <<= 8, i3 |= s4;
              }
            }
            if (1 !== e3.final.length) throw new Error("final must be a single byte");
            const s3 = e3.final.charCodeAt(0);
            if (t3[0] > s3 || s3 > t3[1]) throw new Error(`final must be in range ${t3[0]} .. ${t3[1]}`);
            return i3 <<= 8, i3 |= s3, i3;
          }
          identToString(e3) {
            const t3 = [];
            for (; e3; ) t3.push(String.fromCharCode(255 & e3)), e3 >>= 8;
            return t3.reverse().join("");
          }
          setPrintHandler(e3) {
            this._printHandler = e3;
          }
          clearPrintHandler() {
            this._printHandler = this._printHandlerFb;
          }
          registerEscHandler(e3, t3) {
            const i3 = this._identifier(e3, [48, 126]);
            void 0 === this._escHandlers[i3] && (this._escHandlers[i3] = []);
            const s3 = this._escHandlers[i3];
            return s3.push(t3), { dispose: () => {
              const e4 = s3.indexOf(t3);
              -1 !== e4 && s3.splice(e4, 1);
            } };
          }
          clearEscHandler(e3) {
            this._escHandlers[this._identifier(e3, [48, 126])] && delete this._escHandlers[this._identifier(e3, [48, 126])];
          }
          setEscHandlerFallback(e3) {
            this._escHandlerFb = e3;
          }
          setExecuteHandler(e3, t3) {
            this._executeHandlers[e3.charCodeAt(0)] = t3;
          }
          clearExecuteHandler(e3) {
            this._executeHandlers[e3.charCodeAt(0)] && delete this._executeHandlers[e3.charCodeAt(0)];
          }
          setExecuteHandlerFallback(e3) {
            this._executeHandlerFb = e3;
          }
          registerCsiHandler(e3, t3) {
            const i3 = this._identifier(e3);
            void 0 === this._csiHandlers[i3] && (this._csiHandlers[i3] = []);
            const s3 = this._csiHandlers[i3];
            return s3.push(t3), { dispose: () => {
              const e4 = s3.indexOf(t3);
              -1 !== e4 && s3.splice(e4, 1);
            } };
          }
          clearCsiHandler(e3) {
            this._csiHandlers[this._identifier(e3)] && delete this._csiHandlers[this._identifier(e3)];
          }
          setCsiHandlerFallback(e3) {
            this._csiHandlerFb = e3;
          }
          registerDcsHandler(e3, t3) {
            return this._dcsParser.registerHandler(this._identifier(e3), t3);
          }
          clearDcsHandler(e3) {
            this._dcsParser.clearHandler(this._identifier(e3));
          }
          setDcsHandlerFallback(e3) {
            this._dcsParser.setHandlerFallback(e3);
          }
          registerOscHandler(e3, t3) {
            return this._oscParser.registerHandler(e3, t3);
          }
          clearOscHandler(e3) {
            this._oscParser.clearHandler(e3);
          }
          setOscHandlerFallback(e3) {
            this._oscParser.setHandlerFallback(e3);
          }
          setErrorHandler(e3) {
            this._errorHandler = e3;
          }
          clearErrorHandler() {
            this._errorHandler = this._errorHandlerFb;
          }
          reset() {
            this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, 0 !== this._parseStack.state && (this._parseStack.state = 2, this._parseStack.handlers = []);
          }
          _preserveStack(e3, t3, i3, s3, r2) {
            this._parseStack.state = e3, this._parseStack.handlers = t3, this._parseStack.handlerPos = i3, this._parseStack.transition = s3, this._parseStack.chunkPos = r2;
          }
          parse(e3, t3, i3) {
            let s3, r2 = 0, n2 = 0, o2 = 0;
            if (this._parseStack.state) if (2 === this._parseStack.state) this._parseStack.state = 0, o2 = this._parseStack.chunkPos + 1;
            else {
              if (void 0 === i3 || 1 === this._parseStack.state) throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
              const t4 = this._parseStack.handlers;
              let n3 = this._parseStack.handlerPos - 1;
              switch (this._parseStack.state) {
                case 3:
                  if (false === i3 && n3 > -1) {
                    for (; n3 >= 0 && (s3 = t4[n3](this._params), true !== s3); n3--) if (s3 instanceof Promise) return this._parseStack.handlerPos = n3, s3;
                  }
                  this._parseStack.handlers = [];
                  break;
                case 4:
                  if (false === i3 && n3 > -1) {
                    for (; n3 >= 0 && (s3 = t4[n3](), true !== s3); n3--) if (s3 instanceof Promise) return this._parseStack.handlerPos = n3, s3;
                  }
                  this._parseStack.handlers = [];
                  break;
                case 6:
                  if (r2 = e3[this._parseStack.chunkPos], s3 = this._dcsParser.unhook(24 !== r2 && 26 !== r2, i3), s3) return s3;
                  27 === r2 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
                  break;
                case 5:
                  if (r2 = e3[this._parseStack.chunkPos], s3 = this._oscParser.end(24 !== r2 && 26 !== r2, i3), s3) return s3;
                  27 === r2 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
              }
              this._parseStack.state = 0, o2 = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = 15 & this._parseStack.transition;
            }
            for (let i4 = o2; i4 < t3; ++i4) {
              switch (r2 = e3[i4], n2 = this._transitions.table[this.currentState << 8 | (r2 < 160 ? r2 : l)], n2 >> 4) {
                case 2:
                  for (let s4 = i4 + 1; ; ++s4) {
                    if (s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < l) {
                      this._printHandler(e3, i4, s4), i4 = s4 - 1;
                      break;
                    }
                    if (++s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < l) {
                      this._printHandler(e3, i4, s4), i4 = s4 - 1;
                      break;
                    }
                    if (++s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < l) {
                      this._printHandler(e3, i4, s4), i4 = s4 - 1;
                      break;
                    }
                    if (++s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < l) {
                      this._printHandler(e3, i4, s4), i4 = s4 - 1;
                      break;
                    }
                  }
                  break;
                case 3:
                  this._executeHandlers[r2] ? this._executeHandlers[r2]() : this._executeHandlerFb(r2), this.precedingJoinState = 0;
                  break;
                case 0:
                  break;
                case 1:
                  if (this._errorHandler({ position: i4, code: r2, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort) return;
                  break;
                case 7:
                  const o3 = this._csiHandlers[this._collect << 8 | r2];
                  let a2 = o3 ? o3.length - 1 : -1;
                  for (; a2 >= 0 && (s3 = o3[a2](this._params), true !== s3); a2--) if (s3 instanceof Promise) return this._preserveStack(3, o3, a2, n2, i4), s3;
                  a2 < 0 && this._csiHandlerFb(this._collect << 8 | r2, this._params), this.precedingJoinState = 0;
                  break;
                case 8:
                  do {
                    switch (r2) {
                      case 59:
                        this._params.addParam(0);
                        break;
                      case 58:
                        this._params.addSubParam(-1);
                        break;
                      default:
                        this._params.addDigit(r2 - 48);
                    }
                  } while (++i4 < t3 && (r2 = e3[i4]) > 47 && r2 < 60);
                  i4--;
                  break;
                case 9:
                  this._collect <<= 8, this._collect |= r2;
                  break;
                case 10:
                  const h2 = this._escHandlers[this._collect << 8 | r2];
                  let c = h2 ? h2.length - 1 : -1;
                  for (; c >= 0 && (s3 = h2[c](), true !== s3); c--) if (s3 instanceof Promise) return this._preserveStack(4, h2, c, n2, i4), s3;
                  c < 0 && this._escHandlerFb(this._collect << 8 | r2), this.precedingJoinState = 0;
                  break;
                case 11:
                  this._params.reset(), this._params.addParam(0), this._collect = 0;
                  break;
                case 12:
                  this._dcsParser.hook(this._collect << 8 | r2, this._params);
                  break;
                case 13:
                  for (let s4 = i4 + 1; ; ++s4) if (s4 >= t3 || 24 === (r2 = e3[s4]) || 26 === r2 || 27 === r2 || r2 > 127 && r2 < l) {
                    this._dcsParser.put(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                  break;
                case 14:
                  if (s3 = this._dcsParser.unhook(24 !== r2 && 26 !== r2), s3) return this._preserveStack(6, [], 0, n2, i4), s3;
                  27 === r2 && (n2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
                  break;
                case 4:
                  this._oscParser.start();
                  break;
                case 5:
                  for (let s4 = i4 + 1; ; s4++) if (s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 127 && r2 < l) {
                    this._oscParser.put(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                  break;
                case 6:
                  if (s3 = this._oscParser.end(24 !== r2 && 26 !== r2), s3) return this._preserveStack(5, [], 0, n2, i4), s3;
                  27 === r2 && (n2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
              }
              this.currentState = 15 & n2;
            }
          }
        }
        t2.EscapeSequenceParser = h;
      }, 1346: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.OscHandler = t2.OscParser = void 0;
        const s2 = i2(1263), r = i2(726), n = [];
        t2.OscParser = class {
          constructor() {
            this._state = 0, this._active = n, this._id = -1, this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
            }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
          }
          registerHandler(e3, t3) {
            void 0 === this._handlers[e3] && (this._handlers[e3] = []);
            const i3 = this._handlers[e3];
            return i3.push(t3), { dispose: () => {
              const e4 = i3.indexOf(t3);
              -1 !== e4 && i3.splice(e4, 1);
            } };
          }
          clearHandler(e3) {
            this._handlers[e3] && delete this._handlers[e3];
          }
          setHandlerFallback(e3) {
            this._handlerFb = e3;
          }
          dispose() {
            this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
            }, this._active = n;
          }
          reset() {
            if (2 === this._state) for (let e3 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e3 >= 0; --e3) this._active[e3].end(false);
            this._stack.paused = false, this._active = n, this._id = -1, this._state = 0;
          }
          _start() {
            if (this._active = this._handlers[this._id] || n, this._active.length) for (let e3 = this._active.length - 1; e3 >= 0; e3--) this._active[e3].start();
            else this._handlerFb(this._id, "START");
          }
          _put(e3, t3, i3) {
            if (this._active.length) for (let s3 = this._active.length - 1; s3 >= 0; s3--) this._active[s3].put(e3, t3, i3);
            else this._handlerFb(this._id, "PUT", (0, r.utf32ToString)(e3, t3, i3));
          }
          start() {
            this.reset(), this._state = 1;
          }
          put(e3, t3, i3) {
            if (3 !== this._state) {
              if (1 === this._state) for (; t3 < i3; ) {
                const i4 = e3[t3++];
                if (59 === i4) {
                  this._state = 2, this._start();
                  break;
                }
                if (i4 < 48 || 57 < i4) return void (this._state = 3);
                -1 === this._id && (this._id = 0), this._id = 10 * this._id + i4 - 48;
              }
              2 === this._state && i3 - t3 > 0 && this._put(e3, t3, i3);
            }
          }
          end(e3, t3 = true) {
            if (0 !== this._state) {
              if (3 !== this._state) if (1 === this._state && this._start(), this._active.length) {
                let i3 = false, s3 = this._active.length - 1, r2 = false;
                if (this._stack.paused && (s3 = this._stack.loopPosition - 1, i3 = t3, r2 = this._stack.fallThrough, this._stack.paused = false), !r2 && false === i3) {
                  for (; s3 >= 0 && (i3 = this._active[s3].end(e3), true !== i3); s3--) if (i3 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = false, i3;
                  s3--;
                }
                for (; s3 >= 0; s3--) if (i3 = this._active[s3].end(false), i3 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = true, i3;
              } else this._handlerFb(this._id, "END", e3);
              this._active = n, this._id = -1, this._state = 0;
            }
          }
        }, t2.OscHandler = class {
          constructor(e3) {
            this._handler = e3, this._data = "", this._hitLimit = false;
          }
          start() {
            this._data = "", this._hitLimit = false;
          }
          put(e3, t3, i3) {
            this._hitLimit || (this._data += (0, r.utf32ToString)(e3, t3, i3), this._data.length > s2.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
          }
          end(e3) {
            let t3 = false;
            if (this._hitLimit) t3 = false;
            else if (e3 && (t3 = this._handler(this._data), t3 instanceof Promise)) return t3.then(((e4) => (this._data = "", this._hitLimit = false, e4)));
            return this._data = "", this._hitLimit = false, t3;
          }
        };
      }, 7262: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Params = void 0;
        const i2 = 2147483647;
        class s2 {
          static fromArray(e3) {
            const t3 = new s2();
            if (!e3.length) return t3;
            for (let i3 = Array.isArray(e3[0]) ? 1 : 0; i3 < e3.length; ++i3) {
              const s3 = e3[i3];
              if (Array.isArray(s3)) for (let e4 = 0; e4 < s3.length; ++e4) t3.addSubParam(s3[e4]);
              else t3.addParam(s3);
            }
            return t3;
          }
          constructor(e3 = 32, t3 = 32) {
            if (this.maxLength = e3, this.maxSubParamsLength = t3, t3 > 256) throw new Error("maxSubParamsLength must not be greater than 256");
            this.params = new Int32Array(e3), this.length = 0, this._subParams = new Int32Array(t3), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(e3), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
          }
          clone() {
            const e3 = new s2(this.maxLength, this.maxSubParamsLength);
            return e3.params.set(this.params), e3.length = this.length, e3._subParams.set(this._subParams), e3._subParamsLength = this._subParamsLength, e3._subParamsIdx.set(this._subParamsIdx), e3._rejectDigits = this._rejectDigits, e3._rejectSubDigits = this._rejectSubDigits, e3._digitIsSub = this._digitIsSub, e3;
          }
          toArray() {
            const e3 = [];
            for (let t3 = 0; t3 < this.length; ++t3) {
              e3.push(this.params[t3]);
              const i3 = this._subParamsIdx[t3] >> 8, s3 = 255 & this._subParamsIdx[t3];
              s3 - i3 > 0 && e3.push(Array.prototype.slice.call(this._subParams, i3, s3));
            }
            return e3;
          }
          reset() {
            this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
          }
          addParam(e3) {
            if (this._digitIsSub = false, this.length >= this.maxLength) this._rejectDigits = true;
            else {
              if (e3 < -1) throw new Error("values lesser than -1 are not allowed");
              this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = e3 > i2 ? i2 : e3;
            }
          }
          addSubParam(e3) {
            if (this._digitIsSub = true, this.length) if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) this._rejectSubDigits = true;
            else {
              if (e3 < -1) throw new Error("values lesser than -1 are not allowed");
              this._subParams[this._subParamsLength++] = e3 > i2 ? i2 : e3, this._subParamsIdx[this.length - 1]++;
            }
          }
          hasSubParams(e3) {
            return (255 & this._subParamsIdx[e3]) - (this._subParamsIdx[e3] >> 8) > 0;
          }
          getSubParams(e3) {
            const t3 = this._subParamsIdx[e3] >> 8, i3 = 255 & this._subParamsIdx[e3];
            return i3 - t3 > 0 ? this._subParams.subarray(t3, i3) : null;
          }
          getSubParamsAll() {
            const e3 = {};
            for (let t3 = 0; t3 < this.length; ++t3) {
              const i3 = this._subParamsIdx[t3] >> 8, s3 = 255 & this._subParamsIdx[t3];
              s3 - i3 > 0 && (e3[t3] = this._subParams.slice(i3, s3));
            }
            return e3;
          }
          addDigit(e3) {
            let t3;
            if (this._rejectDigits || !(t3 = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
            const s3 = this._digitIsSub ? this._subParams : this.params, r = s3[t3 - 1];
            s3[t3 - 1] = ~r ? Math.min(10 * r + e3, i2) : e3;
          }
        }
        t2.Params = s2;
      }, 3027: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.AddonManager = void 0, t2.AddonManager = class {
          constructor() {
            this._addons = [];
          }
          dispose() {
            for (let e3 = this._addons.length - 1; e3 >= 0; e3--) this._addons[e3].instance.dispose();
          }
          loadAddon(e3, t3) {
            const i2 = { instance: t3, dispose: t3.dispose, isDisposed: false };
            this._addons.push(i2), t3.dispose = () => this._wrappedAddonDispose(i2), t3.activate(e3);
          }
          _wrappedAddonDispose(e3) {
            if (e3.isDisposed) return;
            let t3 = -1;
            for (let i2 = 0; i2 < this._addons.length; i2++) if (this._addons[i2] === e3) {
              t3 = i2;
              break;
            }
            if (-1 === t3) throw new Error("Could not dispose an addon that has not been loaded");
            e3.isDisposed = true, e3.dispose.apply(e3.instance), this._addons.splice(t3, 1);
          }
        };
      }, 3235: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferApiView = void 0;
        const s2 = i2(793), r = i2(3055);
        t2.BufferApiView = class {
          constructor(e3, t3) {
            this._buffer = e3, this.type = t3;
          }
          init(e3) {
            return this._buffer = e3, this;
          }
          get cursorY() {
            return this._buffer.y;
          }
          get cursorX() {
            return this._buffer.x;
          }
          get viewportY() {
            return this._buffer.ydisp;
          }
          get baseY() {
            return this._buffer.ybase;
          }
          get length() {
            return this._buffer.lines.length;
          }
          getLine(e3) {
            const t3 = this._buffer.lines.get(e3);
            if (t3) return new s2.BufferLineApiView(t3);
          }
          getNullCell() {
            return new r.CellData();
          }
        };
      }, 793: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferLineApiView = void 0;
        const s2 = i2(3055);
        t2.BufferLineApiView = class {
          constructor(e3) {
            this._line = e3;
          }
          get isWrapped() {
            return this._line.isWrapped;
          }
          get length() {
            return this._line.length;
          }
          getCell(e3, t3) {
            if (!(e3 < 0 || e3 >= this._line.length)) return t3 ? (this._line.loadCell(e3, t3), t3) : this._line.loadCell(e3, new s2.CellData());
          }
          translateToString(e3, t3, i3) {
            return this._line.translateToString(e3, t3, i3);
          }
        };
      }, 5101: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferNamespaceApi = void 0;
        const s2 = i2(3235), r = i2(7150), n = i2(802);
        class o extends r.Disposable {
          constructor(e3) {
            super(), this._core = e3, this._onBufferChange = this._register(new n.Emitter()), this.onBufferChange = this._onBufferChange.event, this._normal = new s2.BufferApiView(this._core.buffers.normal, "normal"), this._alternate = new s2.BufferApiView(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate((() => this._onBufferChange.fire(this.active)));
          }
          get active() {
            if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
            if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
            throw new Error("Active buffer is neither normal nor alternate");
          }
          get normal() {
            return this._normal.init(this._core.buffers.normal);
          }
          get alternate() {
            return this._alternate.init(this._core.buffers.alt);
          }
        }
        t2.BufferNamespaceApi = o;
      }, 6097: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ParserApi = void 0, t2.ParserApi = class {
          constructor(e3) {
            this._core = e3;
          }
          registerCsiHandler(e3, t3) {
            return this._core.registerCsiHandler(e3, ((e4) => t3(e4.toArray())));
          }
          addCsiHandler(e3, t3) {
            return this.registerCsiHandler(e3, t3);
          }
          registerDcsHandler(e3, t3) {
            return this._core.registerDcsHandler(e3, ((e4, i2) => t3(e4, i2.toArray())));
          }
          addDcsHandler(e3, t3) {
            return this.registerDcsHandler(e3, t3);
          }
          registerEscHandler(e3, t3) {
            return this._core.registerEscHandler(e3, t3);
          }
          addEscHandler(e3, t3) {
            return this.registerEscHandler(e3, t3);
          }
          registerOscHandler(e3, t3) {
            return this._core.registerOscHandler(e3, t3);
          }
          addOscHandler(e3, t3) {
            return this.registerOscHandler(e3, t3);
          }
        };
      }, 4335: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.UnicodeApi = void 0, t2.UnicodeApi = class {
          constructor(e3) {
            this._core = e3;
          }
          register(e3) {
            this._core.unicodeService.register(e3);
          }
          get versions() {
            return this._core.unicodeService.versions;
          }
          get activeVersion() {
            return this._core.unicodeService.activeVersion;
          }
          set activeVersion(e3) {
            this._core.unicodeService.activeVersion = e3;
          }
        };
      }, 9640: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferService = t2.MINIMUM_ROWS = t2.MINIMUM_COLS = void 0;
        const n = i2(7150), o = i2(4097), a = i2(6501), l = i2(802);
        t2.MINIMUM_COLS = 2, t2.MINIMUM_ROWS = 1;
        let h = class extends n.Disposable {
          get buffer() {
            return this.buffers.active;
          }
          constructor(e3) {
            super(), this.isUserScrolling = false, this._onResize = this._register(new l.Emitter()), this.onResize = this._onResize.event, this._onScroll = this._register(new l.Emitter()), this.onScroll = this._onScroll.event, this.cols = Math.max(e3.rawOptions.cols || 0, t2.MINIMUM_COLS), this.rows = Math.max(e3.rawOptions.rows || 0, t2.MINIMUM_ROWS), this.buffers = this._register(new o.BufferSet(e3, this)), this._register(this.buffers.onBufferActivate(((e4) => {
              this._onScroll.fire(e4.activeBuffer.ydisp);
            })));
          }
          resize(e3, t3) {
            const i3 = this.cols !== e3, s3 = this.rows !== t3;
            this.cols = e3, this.rows = t3, this.buffers.resize(e3, t3), this._onResize.fire({ cols: e3, rows: t3, colsChanged: i3, rowsChanged: s3 });
          }
          reset() {
            this.buffers.reset(), this.isUserScrolling = false;
          }
          scroll(e3, t3 = false) {
            const i3 = this.buffer;
            let s3;
            s3 = this._cachedBlankLine, s3 && s3.length === this.cols && s3.getFg(0) === e3.fg && s3.getBg(0) === e3.bg || (s3 = i3.getBlankLine(e3, t3), this._cachedBlankLine = s3), s3.isWrapped = t3;
            const r2 = i3.ybase + i3.scrollTop, n2 = i3.ybase + i3.scrollBottom;
            if (0 === i3.scrollTop) {
              const e4 = i3.lines.isFull;
              n2 === i3.lines.length - 1 ? e4 ? i3.lines.recycle().copyFrom(s3) : i3.lines.push(s3.clone()) : i3.lines.splice(n2 + 1, 0, s3.clone()), e4 ? this.isUserScrolling && (i3.ydisp = Math.max(i3.ydisp - 1, 0)) : (i3.ybase++, this.isUserScrolling || i3.ydisp++);
            } else {
              const e4 = n2 - r2 + 1;
              i3.lines.shiftElements(r2 + 1, e4 - 1, -1), i3.lines.set(n2, s3.clone());
            }
            this.isUserScrolling || (i3.ydisp = i3.ybase), this._onScroll.fire(i3.ydisp);
          }
          scrollLines(e3, t3) {
            const i3 = this.buffer;
            if (e3 < 0) {
              if (0 === i3.ydisp) return;
              this.isUserScrolling = true;
            } else e3 + i3.ydisp >= i3.ybase && (this.isUserScrolling = false);
            const s3 = i3.ydisp;
            i3.ydisp = Math.max(Math.min(i3.ydisp + e3, i3.ybase), 0), s3 !== i3.ydisp && (t3 || this._onScroll.fire(i3.ydisp));
          }
        };
        t2.BufferService = h, t2.BufferService = h = s2([r(0, a.IOptionsService)], h);
      }, 5746: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CharsetService = void 0, t2.CharsetService = class {
          constructor() {
            this.glevel = 0, this._charsets = [];
          }
          reset() {
            this.charset = void 0, this._charsets = [], this.glevel = 0;
          }
          setgLevel(e3) {
            this.glevel = e3, this.charset = this._charsets[e3];
          }
          setgCharset(e3, t3) {
            this._charsets[e3] = t3, this.glevel === e3 && (this.charset = t3);
          }
        };
      }, 7792: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreMouseService = void 0;
        const n = i2(6501), o = i2(7150), a = i2(802), l = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (e3) => 4 !== e3.button && 1 === e3.action && (e3.ctrl = false, e3.alt = false, e3.shift = false, true) }, VT200: { events: 19, restrict: (e3) => 32 !== e3.action }, DRAG: { events: 23, restrict: (e3) => 32 !== e3.action || 3 !== e3.button }, ANY: { events: 31, restrict: (e3) => true } };
        function h(e3, t3) {
          let i3 = (e3.ctrl ? 16 : 0) | (e3.shift ? 4 : 0) | (e3.alt ? 8 : 0);
          return 4 === e3.button ? (i3 |= 64, i3 |= e3.action) : (i3 |= 3 & e3.button, 4 & e3.button && (i3 |= 64), 8 & e3.button && (i3 |= 128), 32 === e3.action ? i3 |= 32 : 0 !== e3.action || t3 || (i3 |= 3)), i3;
        }
        const c = String.fromCharCode, d = { DEFAULT: (e3) => {
          const t3 = [h(e3, false) + 32, e3.col + 32, e3.row + 32];
          return t3[0] > 255 || t3[1] > 255 || t3[2] > 255 ? "" : `\x1B[M${c(t3[0])}${c(t3[1])}${c(t3[2])}`;
        }, SGR: (e3) => {
          const t3 = 0 === e3.action && 4 !== e3.button ? "m" : "M";
          return `\x1B[<${h(e3, true)};${e3.col};${e3.row}${t3}`;
        }, SGR_PIXELS: (e3) => {
          const t3 = 0 === e3.action && 4 !== e3.button ? "m" : "M";
          return `\x1B[<${h(e3, true)};${e3.x};${e3.y}${t3}`;
        } };
        let u = class extends o.Disposable {
          constructor(e3, t3, i3) {
            super(), this._bufferService = e3, this._coreService = t3, this._optionsService = i3, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._lastEvent = null, this._wheelPartialScroll = 0, this._onProtocolChange = this._register(new a.Emitter()), this.onProtocolChange = this._onProtocolChange.event;
            for (const e4 of Object.keys(l)) this.addProtocol(e4, l[e4]);
            for (const e4 of Object.keys(d)) this.addEncoding(e4, d[e4]);
            this.reset();
          }
          addProtocol(e3, t3) {
            this._protocols[e3] = t3;
          }
          addEncoding(e3, t3) {
            this._encodings[e3] = t3;
          }
          get activeProtocol() {
            return this._activeProtocol;
          }
          get areMouseEventsActive() {
            return 0 !== this._protocols[this._activeProtocol].events;
          }
          set activeProtocol(e3) {
            if (!this._protocols[e3]) throw new Error(`unknown protocol "${e3}"`);
            this._activeProtocol = e3, this._onProtocolChange.fire(this._protocols[e3].events);
          }
          get activeEncoding() {
            return this._activeEncoding;
          }
          set activeEncoding(e3) {
            if (!this._encodings[e3]) throw new Error(`unknown encoding "${e3}"`);
            this._activeEncoding = e3;
          }
          reset() {
            this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null, this._wheelPartialScroll = 0;
          }
          consumeWheelEvent(e3, t3, i3) {
            if (0 === e3.deltaY || e3.shiftKey) return 0;
            if (void 0 === t3 || void 0 === i3) return 0;
            const s3 = t3 / i3;
            let r2 = this._applyScrollModifier(e3.deltaY, e3);
            return e3.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (r2 /= s3 + 0, Math.abs(e3.deltaY) < 50 && (r2 *= 0.3), this._wheelPartialScroll += r2, r2 = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e3.deltaMode === WheelEvent.DOM_DELTA_PAGE && (r2 *= this._bufferService.rows), r2;
          }
          _applyScrollModifier(e3, t3) {
            return t3.altKey || t3.ctrlKey || t3.shiftKey ? e3 * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e3 * this._optionsService.rawOptions.scrollSensitivity;
          }
          triggerMouseEvent(e3) {
            if (e3.col < 0 || e3.col >= this._bufferService.cols || e3.row < 0 || e3.row >= this._bufferService.rows) return false;
            if (4 === e3.button && 32 === e3.action) return false;
            if (3 === e3.button && 32 !== e3.action) return false;
            if (4 !== e3.button && (2 === e3.action || 3 === e3.action)) return false;
            if (e3.col++, e3.row++, 32 === e3.action && this._lastEvent && this._equalEvents(this._lastEvent, e3, "SGR_PIXELS" === this._activeEncoding)) return false;
            if (!this._protocols[this._activeProtocol].restrict(e3)) return false;
            const t3 = this._encodings[this._activeEncoding](e3);
            return t3 && ("DEFAULT" === this._activeEncoding ? this._coreService.triggerBinaryEvent(t3) : this._coreService.triggerDataEvent(t3, true)), this._lastEvent = e3, true;
          }
          explainEvents(e3) {
            return { down: !!(1 & e3), up: !!(2 & e3), drag: !!(4 & e3), move: !!(8 & e3), wheel: !!(16 & e3) };
          }
          _equalEvents(e3, t3, i3) {
            if (i3) {
              if (e3.x !== t3.x) return false;
              if (e3.y !== t3.y) return false;
            } else {
              if (e3.col !== t3.col) return false;
              if (e3.row !== t3.row) return false;
            }
            return e3.button === t3.button && e3.action === t3.action && e3.ctrl === t3.ctrl && e3.alt === t3.alt && e3.shift === t3.shift;
          }
        };
        t2.CoreMouseService = u, t2.CoreMouseService = u = s2([r(0, n.IBufferService), r(1, n.ICoreService), r(2, n.IOptionsService)], u);
      }, 4071: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreService = void 0;
        const n = i2(7453), o = i2(7150), a = i2(6501), l = i2(802), h = Object.freeze({ insertMode: false }), c = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, cursorBlink: void 0, cursorStyle: void 0, origin: false, reverseWraparound: false, sendFocus: false, synchronizedOutput: false, wraparound: true });
        let d = class extends o.Disposable {
          constructor(e3, t3, i3) {
            super(), this._bufferService = e3, this._logService = t3, this._optionsService = i3, this.isCursorInitialized = false, this.isCursorHidden = false, this._onData = this._register(new l.Emitter()), this.onData = this._onData.event, this._onUserInput = this._register(new l.Emitter()), this.onUserInput = this._onUserInput.event, this._onBinary = this._register(new l.Emitter()), this.onBinary = this._onBinary.event, this._onRequestScrollToBottom = this._register(new l.Emitter()), this.onRequestScrollToBottom = this._onRequestScrollToBottom.event, this.modes = (0, n.clone)(h), this.decPrivateModes = (0, n.clone)(c);
          }
          reset() {
            this.modes = (0, n.clone)(h), this.decPrivateModes = (0, n.clone)(c);
          }
          triggerDataEvent(e3, t3 = false) {
            if (this._optionsService.rawOptions.disableStdin) return;
            const i3 = this._bufferService.buffer;
            t3 && this._optionsService.rawOptions.scrollOnUserInput && i3.ybase !== i3.ydisp && this._onRequestScrollToBottom.fire(), t3 && this._onUserInput.fire(), this._logService.debug(`sending data "${e3}"`), this._logService.trace("sending data (codes)", (() => e3.split("").map(((e4) => e4.charCodeAt(0))))), this._onData.fire(e3);
          }
          triggerBinaryEvent(e3) {
            this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e3}"`), this._logService.trace("sending binary (codes)", (() => e3.split("").map(((e4) => e4.charCodeAt(0))))), this._onBinary.fire(e3));
          }
        };
        t2.CoreService = d, t2.CoreService = d = s2([r(0, a.IBufferService), r(1, a.ILogService), r(2, a.IOptionsService)], d);
      }, 4720: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DecorationService = void 0;
        const s2 = i2(4103), r = i2(7150), n = i2(3087), o = i2(802);
        let a = 0, l = 0;
        class h extends r.Disposable {
          get decorations() {
            return this._decorations.values();
          }
          constructor() {
            super(), this._decorations = new n.SortedList(((e3) => e3?.marker.line)), this._onDecorationRegistered = this._register(new o.Emitter()), this.onDecorationRegistered = this._onDecorationRegistered.event, this._onDecorationRemoved = this._register(new o.Emitter()), this.onDecorationRemoved = this._onDecorationRemoved.event, this._register((0, r.toDisposable)((() => this.reset())));
          }
          registerDecoration(e3) {
            if (e3.marker.isDisposed) return;
            const t3 = new c(e3);
            if (t3) {
              const e4 = t3.marker.onDispose((() => t3.dispose())), i3 = t3.onDispose((() => {
                i3.dispose(), t3 && (this._decorations.delete(t3) && this._onDecorationRemoved.fire(t3), e4.dispose());
              }));
              this._decorations.insert(t3), this._onDecorationRegistered.fire(t3);
            }
            return t3;
          }
          reset() {
            for (const e3 of this._decorations.values()) e3.dispose();
            this._decorations.clear();
          }
          *getDecorationsAtCell(e3, t3, i3) {
            let s3 = 0, r2 = 0;
            for (const n2 of this._decorations.getKeyIterator(t3)) s3 = n2.options.x ?? 0, r2 = s3 + (n2.options.width ?? 1), e3 >= s3 && e3 < r2 && (!i3 || (n2.options.layer ?? "bottom") === i3) && (yield n2);
          }
          forEachDecorationAtCell(e3, t3, i3, s3) {
            this._decorations.forEachByKey(t3, ((t4) => {
              a = t4.options.x ?? 0, l = a + (t4.options.width ?? 1), e3 >= a && e3 < l && (!i3 || (t4.options.layer ?? "bottom") === i3) && s3(t4);
            }));
          }
        }
        t2.DecorationService = h;
        class c extends r.DisposableStore {
          get backgroundColorRGB() {
            return null === this._cachedBg && (this.options.backgroundColor ? this._cachedBg = s2.css.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
          }
          get foregroundColorRGB() {
            return null === this._cachedFg && (this.options.foregroundColor ? this._cachedFg = s2.css.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
          }
          constructor(e3) {
            super(), this.options = e3, this.onRenderEmitter = this.add(new o.Emitter()), this.onRender = this.onRenderEmitter.event, this._onDispose = this.add(new o.Emitter()), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = e3.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
          }
          dispose() {
            this._onDispose.fire(), super.dispose();
          }
        }
      }, 6025: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.InstantiationService = t2.ServiceCollection = void 0;
        const s2 = i2(6501), r = i2(6201);
        class n {
          constructor(...e3) {
            this._entries = /* @__PURE__ */ new Map();
            for (const [t3, i3] of e3) this.set(t3, i3);
          }
          set(e3, t3) {
            const i3 = this._entries.get(e3);
            return this._entries.set(e3, t3), i3;
          }
          forEach(e3) {
            for (const [t3, i3] of this._entries.entries()) e3(t3, i3);
          }
          has(e3) {
            return this._entries.has(e3);
          }
          get(e3) {
            return this._entries.get(e3);
          }
        }
        t2.ServiceCollection = n, t2.InstantiationService = class {
          constructor() {
            this._services = new n(), this._services.set(s2.IInstantiationService, this);
          }
          setService(e3, t3) {
            this._services.set(e3, t3);
          }
          getService(e3) {
            return this._services.get(e3);
          }
          createInstance(e3, ...t3) {
            const i3 = (0, r.getServiceDependencies)(e3).sort(((e4, t4) => e4.index - t4.index)), s3 = [];
            for (const t4 of i3) {
              const i4 = this._services.get(t4.id);
              if (!i4) throw new Error(`[createInstance] ${e3.name} depends on UNKNOWN service ${t4.id._id}.`);
              s3.push(i4);
            }
            const n2 = i3.length > 0 ? i3[0].index : t3.length;
            if (t3.length !== n2) throw new Error(`[createInstance] First service dependency of ${e3.name} at position ${n2 + 1} conflicts with ${t3.length} static arguments`);
            return new e3(...[...t3, ...s3]);
          }
        };
      }, 7276: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.LogService = void 0, t2.setTraceLogger = function(e3) {
          l = e3;
        }, t2.traceCall = function(e3, t3, i3) {
          if ("function" != typeof i3.value) throw new Error("not supported");
          const s3 = i3.value;
          i3.value = function(...e4) {
            if (l.logLevel !== o.LogLevelEnum.TRACE) return s3.apply(this, e4);
            l.trace(`GlyphRenderer#${s3.name}(${e4.map(((e5) => JSON.stringify(e5))).join(", ")})`);
            const t4 = s3.apply(this, e4);
            return l.trace(`GlyphRenderer#${s3.name} return`, t4), t4;
          };
        };
        const n = i2(7150), o = i2(6501), a = { trace: o.LogLevelEnum.TRACE, debug: o.LogLevelEnum.DEBUG, info: o.LogLevelEnum.INFO, warn: o.LogLevelEnum.WARN, error: o.LogLevelEnum.ERROR, off: o.LogLevelEnum.OFF };
        let l, h = class extends n.Disposable {
          get logLevel() {
            return this._logLevel;
          }
          constructor(e3) {
            super(), this._optionsService = e3, this._logLevel = o.LogLevelEnum.OFF, this._updateLogLevel(), this._register(this._optionsService.onSpecificOptionChange("logLevel", (() => this._updateLogLevel()))), l = this;
          }
          _updateLogLevel() {
            this._logLevel = a[this._optionsService.rawOptions.logLevel];
          }
          _evalLazyOptionalParams(e3) {
            for (let t3 = 0; t3 < e3.length; t3++) "function" == typeof e3[t3] && (e3[t3] = e3[t3]());
          }
          _log(e3, t3, i3) {
            this._evalLazyOptionalParams(i3), e3.call(console, (this._optionsService.options.logger ? "" : "xterm.js: ") + t3, ...i3);
          }
          trace(e3, ...t3) {
            this._logLevel <= o.LogLevelEnum.TRACE && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e3, t3);
          }
          debug(e3, ...t3) {
            this._logLevel <= o.LogLevelEnum.DEBUG && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e3, t3);
          }
          info(e3, ...t3) {
            this._logLevel <= o.LogLevelEnum.INFO && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e3, t3);
          }
          warn(e3, ...t3) {
            this._logLevel <= o.LogLevelEnum.WARN && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e3, t3);
          }
          error(e3, ...t3) {
            this._logLevel <= o.LogLevelEnum.ERROR && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e3, t3);
          }
        };
        t2.LogService = h, t2.LogService = h = s2([r(0, o.IOptionsService)], h);
      }, 56: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.OptionsService = t2.DEFAULT_OPTIONS = void 0;
        const s2 = i2(7150), r = i2(701), n = i2(802);
        t2.DEFAULT_OPTIONS = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: true, drawBoldTextInBrightColors: true, documentOverride: null, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: false, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1e3, scrollOnEraseInDisplay: false, scrollOnUserInput: true, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, reflowCursorLine: false, rescaleOverlappingGlyphs: false, rightClickSelectsWord: r.isMac, windowOptions: {}, windowsMode: false, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRuler: {} };
        const o = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
        class a extends s2.Disposable {
          constructor(e3) {
            super(), this._onOptionChange = this._register(new n.Emitter()), this.onOptionChange = this._onOptionChange.event;
            const i3 = { ...t2.DEFAULT_OPTIONS };
            for (const t3 in e3) if (t3 in i3) try {
              const s3 = e3[t3];
              i3[t3] = this._sanitizeAndValidateOption(t3, s3);
            } catch (e4) {
              console.error(e4);
            }
            this.rawOptions = i3, this.options = { ...i3 }, this._setupOptions(), this._register((0, s2.toDisposable)((() => {
              this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
            })));
          }
          onSpecificOptionChange(e3, t3) {
            return this.onOptionChange(((i3) => {
              i3 === e3 && t3(this.rawOptions[e3]);
            }));
          }
          onMultipleOptionChange(e3, t3) {
            return this.onOptionChange(((i3) => {
              -1 !== e3.indexOf(i3) && t3();
            }));
          }
          _setupOptions() {
            const e3 = (e4) => {
              if (!(e4 in t2.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e4}"`);
              return this.rawOptions[e4];
            }, i3 = (e4, i4) => {
              if (!(e4 in t2.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e4}"`);
              i4 = this._sanitizeAndValidateOption(e4, i4), this.rawOptions[e4] !== i4 && (this.rawOptions[e4] = i4, this._onOptionChange.fire(e4));
            };
            for (const t3 in this.rawOptions) {
              const s3 = { get: e3.bind(this, t3), set: i3.bind(this, t3) };
              Object.defineProperty(this.options, t3, s3);
            }
          }
          _sanitizeAndValidateOption(e3, i3) {
            switch (e3) {
              case "cursorStyle":
                if (i3 || (i3 = t2.DEFAULT_OPTIONS[e3]), !/* @__PURE__ */ (function(e4) {
                  return "block" === e4 || "underline" === e4 || "bar" === e4;
                })(i3)) throw new Error(`"${i3}" is not a valid value for ${e3}`);
                break;
              case "wordSeparator":
                i3 || (i3 = t2.DEFAULT_OPTIONS[e3]);
                break;
              case "fontWeight":
              case "fontWeightBold":
                if ("number" == typeof i3 && 1 <= i3 && i3 <= 1e3) break;
                i3 = o.includes(i3) ? i3 : t2.DEFAULT_OPTIONS[e3];
                break;
              case "cursorWidth":
                i3 = Math.floor(i3);
              case "lineHeight":
              case "tabStopWidth":
                if (i3 < 1) throw new Error(`${e3} cannot be less than 1, value: ${i3}`);
                break;
              case "minimumContrastRatio":
                i3 = Math.max(1, Math.min(21, Math.round(10 * i3) / 10));
                break;
              case "scrollback":
                if ((i3 = Math.min(i3, 4294967295)) < 0) throw new Error(`${e3} cannot be less than 0, value: ${i3}`);
                break;
              case "fastScrollSensitivity":
              case "scrollSensitivity":
                if (i3 <= 0) throw new Error(`${e3} cannot be less than or equal to 0, value: ${i3}`);
                break;
              case "rows":
              case "cols":
                if (!i3 && 0 !== i3) throw new Error(`${e3} must be numeric, value: ${i3}`);
                break;
              case "windowsPty":
                i3 = i3 ?? {};
            }
            return i3;
          }
        }
        t2.OptionsService = a;
      }, 8811: function(e2, t2, i2) {
        var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a = e3.length - 1; a >= 0; a--) (r2 = e3[a]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, r = this && this.__param || function(e3, t3) {
          return function(i3, s3) {
            t3(i3, s3, e3);
          };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.OscLinkService = void 0;
        const n = i2(6501);
        let o = class {
          constructor(e3) {
            this._bufferService = e3, this._nextId = 1, this._entriesWithId = /* @__PURE__ */ new Map(), this._dataByLinkId = /* @__PURE__ */ new Map();
          }
          registerLink(e3) {
            const t3 = this._bufferService.buffer;
            if (void 0 === e3.id) {
              const i4 = t3.addMarker(t3.ybase + t3.y), s4 = { data: e3, id: this._nextId++, lines: [i4] };
              return i4.onDispose((() => this._removeMarkerFromLink(s4, i4))), this._dataByLinkId.set(s4.id, s4), s4.id;
            }
            const i3 = e3, s3 = this._getEntryIdKey(i3), r2 = this._entriesWithId.get(s3);
            if (r2) return this.addLineToLink(r2.id, t3.ybase + t3.y), r2.id;
            const n2 = t3.addMarker(t3.ybase + t3.y), o2 = { id: this._nextId++, key: this._getEntryIdKey(i3), data: i3, lines: [n2] };
            return n2.onDispose((() => this._removeMarkerFromLink(o2, n2))), this._entriesWithId.set(o2.key, o2), this._dataByLinkId.set(o2.id, o2), o2.id;
          }
          addLineToLink(e3, t3) {
            const i3 = this._dataByLinkId.get(e3);
            if (i3 && i3.lines.every(((e4) => e4.line !== t3))) {
              const e4 = this._bufferService.buffer.addMarker(t3);
              i3.lines.push(e4), e4.onDispose((() => this._removeMarkerFromLink(i3, e4)));
            }
          }
          getLinkData(e3) {
            return this._dataByLinkId.get(e3)?.data;
          }
          _getEntryIdKey(e3) {
            return `${e3.id};;${e3.uri}`;
          }
          _removeMarkerFromLink(e3, t3) {
            const i3 = e3.lines.indexOf(t3);
            -1 !== i3 && (e3.lines.splice(i3, 1), 0 === e3.lines.length && (void 0 !== e3.data.id && this._entriesWithId.delete(e3.key), this._dataByLinkId.delete(e3.id)));
          }
        };
        t2.OscLinkService = o, t2.OscLinkService = o = s2([r(0, n.IBufferService)], o);
      }, 6201: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.serviceRegistry = void 0, t2.getServiceDependencies = function(e3) {
          return e3[s2] || [];
        }, t2.createDecorator = function(e3) {
          if (t2.serviceRegistry.has(e3)) return t2.serviceRegistry.get(e3);
          const r = function(e4, t3, n) {
            if (3 !== arguments.length) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
            !(function(e5, t4, r2) {
              t4[i2] === t4 ? t4[s2].push({ id: e5, index: r2 }) : (t4[s2] = [{ id: e5, index: r2 }], t4[i2] = t4);
            })(r, e4, n);
          };
          return r._id = e3, t2.serviceRegistry.set(e3, r), r;
        };
        const i2 = "di$target", s2 = "di$dependencies";
        t2.serviceRegistry = /* @__PURE__ */ new Map();
      }, 6501: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.IDecorationService = t2.IUnicodeService = t2.IOscLinkService = t2.IOptionsService = t2.ILogService = t2.LogLevelEnum = t2.IInstantiationService = t2.ICharsetService = t2.ICoreService = t2.ICoreMouseService = t2.IBufferService = void 0;
        const s2 = i2(6201);
        var r;
        t2.IBufferService = (0, s2.createDecorator)("BufferService"), t2.ICoreMouseService = (0, s2.createDecorator)("CoreMouseService"), t2.ICoreService = (0, s2.createDecorator)("CoreService"), t2.ICharsetService = (0, s2.createDecorator)("CharsetService"), t2.IInstantiationService = (0, s2.createDecorator)("InstantiationService"), (function(e3) {
          e3[e3.TRACE = 0] = "TRACE", e3[e3.DEBUG = 1] = "DEBUG", e3[e3.INFO = 2] = "INFO", e3[e3.WARN = 3] = "WARN", e3[e3.ERROR = 4] = "ERROR", e3[e3.OFF = 5] = "OFF";
        })(r || (t2.LogLevelEnum = r = {})), t2.ILogService = (0, s2.createDecorator)("LogService"), t2.IOptionsService = (0, s2.createDecorator)("OptionsService"), t2.IOscLinkService = (0, s2.createDecorator)("OscLinkService"), t2.IUnicodeService = (0, s2.createDecorator)("UnicodeService"), t2.IDecorationService = (0, s2.createDecorator)("DecorationService");
      }, 6415: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.UnicodeService = void 0;
        const s2 = i2(7428), r = i2(802);
        class n {
          static extractShouldJoin(e3) {
            return !!(1 & e3);
          }
          static extractWidth(e3) {
            return e3 >> 1 & 3;
          }
          static extractCharKind(e3) {
            return e3 >> 3;
          }
          static createPropertyValue(e3, t3, i3 = false) {
            return (16777215 & e3) << 3 | (3 & t3) << 1 | (i3 ? 1 : 0);
          }
          constructor() {
            this._providers = /* @__PURE__ */ Object.create(null), this._active = "", this._onChange = new r.Emitter(), this.onChange = this._onChange.event;
            const e3 = new s2.UnicodeV6();
            this.register(e3), this._active = e3.version, this._activeProvider = e3;
          }
          dispose() {
            this._onChange.dispose();
          }
          get versions() {
            return Object.keys(this._providers);
          }
          get activeVersion() {
            return this._active;
          }
          set activeVersion(e3) {
            if (!this._providers[e3]) throw new Error(`unknown Unicode version "${e3}"`);
            this._active = e3, this._activeProvider = this._providers[e3], this._onChange.fire(e3);
          }
          register(e3) {
            this._providers[e3.version] = e3;
          }
          wcwidth(e3) {
            return this._activeProvider.wcwidth(e3);
          }
          getStringCellWidth(e3) {
            let t3 = 0, i3 = 0;
            const s3 = e3.length;
            for (let r2 = 0; r2 < s3; ++r2) {
              let o = e3.charCodeAt(r2);
              if (55296 <= o && o <= 56319) {
                if (++r2 >= s3) return t3 + this.wcwidth(o);
                const i4 = e3.charCodeAt(r2);
                56320 <= i4 && i4 <= 57343 ? o = 1024 * (o - 55296) + i4 - 56320 + 65536 : t3 += this.wcwidth(i4);
              }
              const a = this.charProperties(o, i3);
              let l = n.extractWidth(a);
              n.extractShouldJoin(a) && (l -= n.extractWidth(i3)), t3 += l, i3 = a;
            }
            return t3;
          }
          charProperties(e3, t3) {
            return this._activeProvider.charProperties(e3, t3);
          }
        }
        t2.UnicodeService = n;
      }, 4333: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.isAndroid = t2.isElectron = t2.isWebkitWebView = t2.isSafari = t2.isChrome = t2.isWebKit = t2.isFirefox = t2.onDidChangeFullscreen = t2.onDidChangeZoomLevel = void 0, t2.addMatchMediaChangeListener = o, t2.setZoomLevel = function(e3, t3) {
          n.INSTANCE.setZoomLevel(e3, t3);
        }, t2.getZoomLevel = function(e3) {
          return n.INSTANCE.getZoomLevel(e3);
        }, t2.getZoomFactor = function(e3) {
          return n.INSTANCE.getZoomFactor(e3);
        }, t2.setZoomFactor = function(e3, t3) {
          n.INSTANCE.setZoomFactor(e3, t3);
        }, t2.setFullscreen = function(e3, t3) {
          n.INSTANCE.setFullscreen(e3, t3);
        }, t2.isFullscreen = function(e3) {
          return n.INSTANCE.isFullscreen(e3);
        }, t2.isStandalone = function() {
          return l;
        }, t2.isWCOEnabled = function() {
          return navigator?.windowControlsOverlay?.visible;
        }, t2.getWCOBoundingRect = function() {
          return navigator?.windowControlsOverlay?.getTitlebarAreaRect();
        };
        const s2 = i2(4693), r = i2(802);
        class n {
          constructor() {
            this.mapWindowIdToZoomLevel = /* @__PURE__ */ new Map(), this._onDidChangeZoomLevel = new r.Emitter(), this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event, this.mapWindowIdToZoomFactor = /* @__PURE__ */ new Map(), this._onDidChangeFullscreen = new r.Emitter(), this.onDidChangeFullscreen = this._onDidChangeFullscreen.event, this.mapWindowIdToFullScreen = /* @__PURE__ */ new Map();
          }
          static {
            this.INSTANCE = new n();
          }
          getZoomLevel(e3) {
            return this.mapWindowIdToZoomLevel.get(this.getWindowId(e3)) ?? 0;
          }
          setZoomLevel(e3, t3) {
            if (this.getZoomLevel(t3) === e3) return;
            const i3 = this.getWindowId(t3);
            this.mapWindowIdToZoomLevel.set(i3, e3), this._onDidChangeZoomLevel.fire(i3);
          }
          getZoomFactor(e3) {
            return this.mapWindowIdToZoomFactor.get(this.getWindowId(e3)) ?? 1;
          }
          setZoomFactor(e3, t3) {
            this.mapWindowIdToZoomFactor.set(this.getWindowId(t3), e3);
          }
          setFullscreen(e3, t3) {
            if (this.isFullscreen(t3) === e3) return;
            const i3 = this.getWindowId(t3);
            this.mapWindowIdToFullScreen.set(i3, e3), this._onDidChangeFullscreen.fire(i3);
          }
          isFullscreen(e3) {
            return !!this.mapWindowIdToFullScreen.get(this.getWindowId(e3));
          }
          getWindowId(e3) {
            return e3.vscodeWindowId;
          }
        }
        function o(e3, t3, i3) {
          "string" == typeof t3 && (t3 = e3.matchMedia(t3)), t3.addEventListener("change", i3);
        }
        t2.onDidChangeZoomLevel = n.INSTANCE.onDidChangeZoomLevel, t2.onDidChangeFullscreen = n.INSTANCE.onDidChangeFullscreen;
        const a = "object" == typeof navigator ? navigator.userAgent : "";
        t2.isFirefox = a.indexOf("Firefox") >= 0, t2.isWebKit = a.indexOf("AppleWebKit") >= 0, t2.isChrome = a.indexOf("Chrome") >= 0, t2.isSafari = !t2.isChrome && a.indexOf("Safari") >= 0, t2.isWebkitWebView = !t2.isChrome && !t2.isSafari && t2.isWebKit, t2.isElectron = a.indexOf("Electron/") >= 0, t2.isAndroid = a.indexOf("Android") >= 0;
        let l = false;
        if ("function" == typeof s2.mainWindow.matchMedia) {
          const e3 = s2.mainWindow.matchMedia("(display-mode: standalone) or (display-mode: window-controls-overlay)"), t3 = s2.mainWindow.matchMedia("(display-mode: fullscreen)");
          l = e3.matches, o(s2.mainWindow, e3, (({ matches: e4 }) => {
            l && t3.matches || (l = e4);
          }));
        }
      }, 7745: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BrowserFeatures = t2.KeyboardSupport = void 0;
        const o = n(i2(4333)), a = i2(4693), l = n(i2(8163));
        var h;
        !(function(e3) {
          e3[e3.Always = 0] = "Always", e3[e3.FullScreen = 1] = "FullScreen", e3[e3.None = 2] = "None";
        })(h || (t2.KeyboardSupport = h = {}));
        const c = "object" == typeof navigator ? navigator : {};
        t2.BrowserFeatures = { clipboard: { writeText: l.isNative || document.queryCommandSupported && document.queryCommandSupported("copy") || !!(c && c.clipboard && c.clipboard.writeText), readText: l.isNative || !!(c && c.clipboard && c.clipboard.readText) }, keyboard: l.isNative || o.isStandalone() ? h.Always : c.keyboard || o.isSafari ? h.FullScreen : h.None, touch: "ontouchstart" in a.mainWindow || c.maxTouchPoints > 0, pointerEvents: a.mainWindow.PointerEvent && ("ontouchstart" in a.mainWindow || navigator.maxTouchPoints > 0) };
      }, 7093: function(e2, t2, i2) {
        var s2, r = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), n = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), o = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && r(t3, e3, i3);
          return n(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.SafeTriangle = t2.DragAndDropObserver = t2.ModifierKeyEmitter = t2.DetectedFullscreenMode = t2.Namespace = t2.EventHelper = t2.EventType = t2.sharedMutationObserver = t2.Dimension = t2.WindowIntervalTimer = t2.scheduleAtNextAnimationFrame = t2.runAtThisOrScheduleAtNextAnimationFrame = t2.WindowIdleValue = t2.addStandardDisposableGenericMouseUpListener = t2.addStandardDisposableGenericMouseDownListener = t2.addStandardDisposableListener = t2.onDidUnregisterWindow = t2.onWillUnregisterWindow = t2.onDidRegisterWindow = t2.hasWindow = t2.getWindowById = t2.getWindowId = t2.getWindowsCount = t2.getWindows = t2.getDocument = t2.getWindow = t2.registerWindow = void 0, t2.clearNode = function(e3) {
          for (; e3.firstChild; ) e3.firstChild.remove();
        }, t2.clearNodeRecursively = function e3(t3) {
          for (; t3.firstChild; ) {
            const i3 = t3.firstChild;
            i3.remove(), e3(i3);
          }
        }, t2.addDisposableListener = C, t2.addDisposableGenericMouseDownListener = w, t2.addDisposableGenericMouseMoveListener = function(e3, i3, s3) {
          return C(e3, g.isIOS && l.BrowserFeatures.pointerEvents ? t2.EventType.POINTER_MOVE : t2.EventType.MOUSE_MOVE, i3, s3);
        }, t2.addDisposableGenericMouseUpListener = E, t2.runWhenWindowIdle = function(e3, t3, i3) {
          return (0, d._runWhenIdle)(e3, t3, i3);
        }, t2.disposableWindowInterval = function(e3, t3, i3, s3) {
          let r2 = 0;
          const n2 = e3.setInterval((() => {
            r2++, ("number" == typeof s3 && r2 >= s3 || true === t3()) && o2.dispose();
          }), i3), o2 = (0, p.toDisposable)((() => {
            e3.clearInterval(n2);
          }));
          return o2;
        }, t2.measure = function(e3, i3) {
          return (0, t2.scheduleAtNextAnimationFrame)(e3, i3, 1e4);
        }, t2.modify = function(e3, i3) {
          return (0, t2.scheduleAtNextAnimationFrame)(e3, i3, -1e4);
        }, t2.addDisposableThrottledListener = function(e3, t3, i3, s3, r2) {
          return new T(e3, t3, i3, s3, r2);
        }, t2.getComputedStyle = k, t2.getClientArea = function e3(i3, s3) {
          const r2 = (0, t2.getWindow)(i3), n2 = r2.document;
          if (i3 !== n2.body) return new O(i3.clientWidth, i3.clientHeight);
          if (g.isIOS && r2?.visualViewport) return new O(r2.visualViewport.width, r2.visualViewport.height);
          if (r2?.innerWidth && r2.innerHeight) return new O(r2.innerWidth, r2.innerHeight);
          if (n2.body && n2.body.clientWidth && n2.body.clientHeight) return new O(n2.body.clientWidth, n2.body.clientHeight);
          if (n2.documentElement && n2.documentElement.clientWidth && n2.documentElement.clientHeight) return new O(n2.documentElement.clientWidth, n2.documentElement.clientHeight);
          if (s3) return e3(s3);
          throw new Error("Unable to figure out browser width and height");
        }, t2.getTopLeftOffset = I, t2.size = function(e3, t3, i3) {
          "number" == typeof t3 && (e3.style.width = `${t3}px`), "number" == typeof i3 && (e3.style.height = `${i3}px`);
        }, t2.position = function(e3, t3, i3, s3, r2, n2 = "absolute") {
          "number" == typeof t3 && (e3.style.top = `${t3}px`), "number" == typeof i3 && (e3.style.right = `${i3}px`), "number" == typeof s3 && (e3.style.bottom = `${s3}px`), "number" == typeof r2 && (e3.style.left = `${r2}px`), e3.style.position = n2;
        }, t2.getDomNodePagePosition = function(e3) {
          const i3 = e3.getBoundingClientRect(), s3 = (0, t2.getWindow)(e3);
          return { left: i3.left + s3.scrollX, top: i3.top + s3.scrollY, width: i3.width, height: i3.height };
        }, t2.getDomNodeZoomLevel = function(e3) {
          let t3 = e3, i3 = 1;
          do {
            const e4 = k(t3).zoom;
            null != e4 && "1" !== e4 && (i3 *= e4), t3 = t3.parentElement;
          } while (null !== t3 && t3 !== t3.ownerDocument.documentElement);
          return i3;
        }, t2.getTotalWidth = P, t2.getContentWidth = function(e3) {
          const t3 = M.getBorderLeftWidth(e3) + M.getBorderRightWidth(e3), i3 = M.getPaddingLeft(e3) + M.getPaddingRight(e3);
          return e3.offsetWidth - t3 - i3;
        }, t2.getTotalScrollWidth = x, t2.getContentHeight = function(e3) {
          const t3 = M.getBorderTopWidth(e3) + M.getBorderBottomWidth(e3), i3 = M.getPaddingTop(e3) + M.getPaddingBottom(e3);
          return e3.offsetHeight - t3 - i3;
        }, t2.getTotalHeight = function(e3) {
          const t3 = M.getMarginTop(e3) + M.getMarginBottom(e3);
          return e3.offsetHeight + t3;
        }, t2.getLargestChildWidth = function(e3, t3) {
          const i3 = t3.map(((t4) => Math.max(x(t4), P(t4)) + (function(e4, t5) {
            if (null === e4) return 0;
            const i4 = I(e4), s3 = I(t5);
            return i4.left - s3.left;
          })(t4, e3) || 0));
          return Math.max(...i3);
        }, t2.isAncestor = B, t2.setParentFlowTo = function(e3, t3) {
          e3.dataset[N] = t3.id;
        }, t2.isAncestorUsingFlowTo = function(e3, t3) {
          let i3 = e3;
          for (; i3; ) {
            if (i3 === t3) return true;
            if (Q(i3)) {
              const e4 = U(i3);
              if (e4) {
                i3 = e4;
                continue;
              }
            }
            i3 = i3.parentNode;
          }
          return false;
        }, t2.findParentWithClass = F, t2.hasParentWithClass = function(e3, t3, i3) {
          return !!F(e3, t3, i3);
        }, t2.isShadowRoot = W, t2.isInShadowDOM = function(e3) {
          return !!H(e3);
        }, t2.getShadowRoot = H, t2.getActiveElement = K, t2.isActiveElement = function(e3) {
          return K() === e3;
        }, t2.isAncestorOfActiveElement = function(e3) {
          return B(K(), e3);
        }, t2.isActiveDocument = function(e3) {
          return e3.ownerDocument === z();
        }, t2.getActiveDocument = z, t2.getActiveWindow = function() {
          const e3 = z();
          return e3.defaultView?.window ?? v.mainWindow;
        }, t2.isGlobalStylesheet = function(e3) {
          return j.has(e3);
        }, t2.createStyleSheet2 = function() {
          return new $();
        }, t2.createStyleSheet = V, t2.cloneGlobalStylesheets = function(e3) {
          const t3 = new p.DisposableStore();
          for (const [i3, s3] of j) t3.add(G(i3, s3, e3));
          return t3;
        }, t2.createMetaElement = function(e3 = v.mainWindow.document.head) {
          return q("meta", e3);
        }, t2.createLinkElement = function(e3 = v.mainWindow.document.head) {
          return q("link", e3);
        }, t2.createCSSRule = function e3(t3, i3, s3 = Y()) {
          if (s3 && i3) {
            s3.sheet?.insertRule(`${t3} {${i3}}`, 0);
            for (const r2 of j.get(s3) ?? []) e3(t3, i3, r2);
          }
        }, t2.removeCSSRulesContainingSelector = function e3(t3, i3 = Y()) {
          if (!i3) return;
          const s3 = Z(i3), r2 = [];
          for (let e4 = 0; e4 < s3.length; e4++) {
            const i4 = s3[e4];
            J(i4) && -1 !== i4.selectorText.indexOf(t3) && r2.push(e4);
          }
          for (let e4 = r2.length - 1; e4 >= 0; e4--) i3.sheet?.deleteRule(r2[e4]);
          for (const s4 of j.get(i3) ?? []) e3(t3, s4);
        }, t2.isHTMLElement = Q, t2.isHTMLAnchorElement = function(e3) {
          return e3 instanceof HTMLAnchorElement || e3 instanceof (0, t2.getWindow)(e3).HTMLAnchorElement;
        }, t2.isHTMLSpanElement = function(e3) {
          return e3 instanceof HTMLSpanElement || e3 instanceof (0, t2.getWindow)(e3).HTMLSpanElement;
        }, t2.isHTMLTextAreaElement = function(e3) {
          return e3 instanceof HTMLTextAreaElement || e3 instanceof (0, t2.getWindow)(e3).HTMLTextAreaElement;
        }, t2.isHTMLInputElement = function(e3) {
          return e3 instanceof HTMLInputElement || e3 instanceof (0, t2.getWindow)(e3).HTMLInputElement;
        }, t2.isHTMLButtonElement = function(e3) {
          return e3 instanceof HTMLButtonElement || e3 instanceof (0, t2.getWindow)(e3).HTMLButtonElement;
        }, t2.isHTMLDivElement = function(e3) {
          return e3 instanceof HTMLDivElement || e3 instanceof (0, t2.getWindow)(e3).HTMLDivElement;
        }, t2.isSVGElement = function(e3) {
          return e3 instanceof SVGElement || e3 instanceof (0, t2.getWindow)(e3).SVGElement;
        }, t2.isMouseEvent = function(e3) {
          return e3 instanceof MouseEvent || e3 instanceof (0, t2.getWindow)(e3).MouseEvent;
        }, t2.isKeyboardEvent = function(e3) {
          return e3 instanceof KeyboardEvent || e3 instanceof (0, t2.getWindow)(e3).KeyboardEvent;
        }, t2.isPointerEvent = function(e3) {
          return e3 instanceof PointerEvent || e3 instanceof (0, t2.getWindow)(e3).PointerEvent;
        }, t2.isDragEvent = function(e3) {
          return e3 instanceof DragEvent || e3 instanceof (0, t2.getWindow)(e3).DragEvent;
        }, t2.isEventLike = function(e3) {
          const t3 = e3;
          return !(!t3 || "function" != typeof t3.preventDefault || "function" != typeof t3.stopPropagation);
        }, t2.saveParentsScrollTop = function(e3) {
          const t3 = [];
          for (let i3 = 0; e3 && e3.nodeType === e3.ELEMENT_NODE; i3++) t3[i3] = e3.scrollTop, e3 = e3.parentNode;
          return t3;
        }, t2.restoreParentsScrollTop = function(e3, t3) {
          for (let i3 = 0; e3 && e3.nodeType === e3.ELEMENT_NODE; i3++) e3.scrollTop !== t3[i3] && (e3.scrollTop = t3[i3]), e3 = e3.parentNode;
        }, t2.trackFocus = function(e3) {
          return new ee(e3);
        }, t2.after = function(e3, t3) {
          return e3.after(t3), t3;
        }, t2.append = te, t2.prepend = function(e3, t3) {
          return e3.insertBefore(t3, e3.firstChild), t3;
        }, t2.reset = function(e3, ...t3) {
          e3.innerText = "", te(e3, ...t3);
        }, t2.$ = ne, t2.join = function(e3, t3) {
          const i3 = [];
          return e3.forEach(((e4, s3) => {
            s3 > 0 && (t3 instanceof Node ? i3.push(t3.cloneNode()) : i3.push(document.createTextNode(t3))), i3.push(e4);
          })), i3;
        }, t2.setVisibility = function(e3, ...t3) {
          e3 ? oe(...t3) : ae(...t3);
        }, t2.show = oe, t2.hide = ae, t2.removeTabIndexAndUpdateFocus = function(e3) {
          if (e3 && e3.hasAttribute("tabIndex")) {
            if (e3.ownerDocument.activeElement === e3) {
              const t3 = (function(e4) {
                for (; e4 && e4.nodeType === e4.ELEMENT_NODE; ) {
                  if (Q(e4) && e4.hasAttribute("tabIndex")) return e4;
                  e4 = e4.parentNode;
                }
                return null;
              })(e3.parentElement);
              t3?.focus();
            }
            e3.removeAttribute("tabindex");
          }
        }, t2.finalHandler = function(e3) {
          return (t3) => {
            t3.preventDefault(), t3.stopPropagation(), e3(t3);
          };
        }, t2.domContentLoaded = function(e3) {
          return new Promise(((t3) => {
            if ("complete" === e3.document.readyState || e3.document && null !== e3.document.body) t3(void 0);
            else {
              const i3 = () => {
                e3.window.removeEventListener("DOMContentLoaded", i3, false), t3();
              };
              e3.window.addEventListener("DOMContentLoaded", i3, false);
            }
          }));
        }, t2.computeScreenAwareSize = function(e3, t3) {
          const i3 = e3.devicePixelRatio * t3;
          return Math.max(1, Math.floor(i3)) / e3.devicePixelRatio;
        }, t2.windowOpenNoOpener = function(e3) {
          v.mainWindow.open(e3, "_blank", "noopener");
        }, t2.windowOpenPopup = function(e3) {
          const t3 = Math.floor(v.mainWindow.screenLeft + v.mainWindow.innerWidth / 2 - le / 2), i3 = Math.floor(v.mainWindow.screenTop + v.mainWindow.innerHeight / 2 - he / 2);
          v.mainWindow.open(e3, "_blank", `width=${le},height=${he},top=${i3},left=${t3}`);
        }, t2.windowOpenWithSuccess = function(e3, t3 = true) {
          const i3 = v.mainWindow.open();
          return !!i3 && (t3 && (i3.opener = null), i3.location.href = e3, true);
        }, t2.animate = function(e3, i3) {
          const s3 = () => {
            i3(), r2 = (0, t2.scheduleAtNextAnimationFrame)(e3, s3);
          };
          let r2 = (0, t2.scheduleAtNextAnimationFrame)(e3, s3);
          return (0, p.toDisposable)((() => r2.dispose()));
        }, t2.asCSSPropertyValue = function(e3) {
          return `'${e3.replace(/'/g, "%27")}'`;
        }, t2.asCssValueWithDefault = function e3(t3, i3) {
          if (void 0 !== t3) {
            const s3 = t3.match(/^\s*var\((.+)\)$/);
            if (s3) {
              const t4 = s3[1].split(",", 2);
              return 2 === t4.length && (i3 = e3(t4[1].trim(), i3)), `var(${t4[0]}, ${i3})`;
            }
            return t3;
          }
          return i3;
        }, t2.detectFullscreen = function(e3) {
          return e3.document.fullscreenElement || e3.document.webkitFullscreenElement || e3.document.webkitIsFullScreen ? { mode: ce.DOCUMENT, guess: false } : e3.innerHeight === e3.screen.height ? { mode: ce.BROWSER, guess: false } : (g.isMacintosh || g.isLinux) && e3.outerHeight === e3.screen.height && e3.outerWidth === e3.screen.width ? { mode: ce.BROWSER, guess: true } : null;
        }, t2.multibyteAwareBtoa = function(e3) {
          return btoa((function(e4) {
            const t3 = new Uint16Array(e4.length);
            for (let i4 = 0; i4 < t3.length; i4++) t3[i4] = e4.charCodeAt(i4);
            let i3 = "";
            const s3 = new Uint8Array(t3.buffer);
            for (let e5 = 0; e5 < s3.length; e5++) i3 += String.fromCharCode(s3[e5]);
            return i3;
          })(e3));
        }, t2.getCookieValue = function(e3) {
          const t3 = document.cookie.match("(^|[^;]+)\\s*" + e3 + "\\s*=\\s*([^;]+)");
          return t3 ? t3.pop() : void 0;
        }, t2.h = function(e3, ...t3) {
          let i3, s3;
          Array.isArray(t3[0]) ? (i3 = {}, s3 = t3[0]) : (i3 = t3[0] || {}, s3 = t3[1]);
          const r2 = _e.exec(e3);
          if (!r2 || !r2.groups) throw new Error("Bad use of h");
          const n2 = r2.groups.tag || "div", o2 = document.createElement(n2);
          r2.groups.id && (o2.id = r2.groups.id);
          const a2 = [];
          if (r2.groups.class) for (const e4 of r2.groups.class.split(".")) "" !== e4 && a2.push(e4);
          if (void 0 !== i3.className) for (const e4 of i3.className.split(".")) "" !== e4 && a2.push(e4);
          a2.length > 0 && (o2.className = a2.join(" "));
          const l2 = {};
          if (r2.groups.name && (l2[r2.groups.name] = o2), s3) for (const e4 of s3) Q(e4) ? o2.appendChild(e4) : "string" == typeof e4 ? o2.append(e4) : "root" in e4 && (Object.assign(l2, e4), o2.appendChild(e4.root));
          for (const [e4, t4] of Object.entries(i3)) if ("className" !== e4) if ("style" === e4) for (const [e5, i4] of Object.entries(t4)) o2.style.setProperty(fe(e5), "number" == typeof i4 ? i4 + "px" : "" + i4);
          else "tabIndex" === e4 ? o2.tabIndex = t4 : o2.setAttribute(fe(e4), t4.toString());
          return l2.root = o2, l2;
        }, t2.svgElem = function(e3, ...t3) {
          let i3, s3;
          Array.isArray(t3[0]) ? (i3 = {}, s3 = t3[0]) : (i3 = t3[0] || {}, s3 = t3[1]);
          const r2 = _e.exec(e3);
          if (!r2 || !r2.groups) throw new Error("Bad use of h");
          const n2 = r2.groups.tag || "div", o2 = document.createElementNS("http://www.w3.org/2000/svg", n2);
          r2.groups.id && (o2.id = r2.groups.id);
          const a2 = [];
          if (r2.groups.class) for (const e4 of r2.groups.class.split(".")) "" !== e4 && a2.push(e4);
          if (void 0 !== i3.className) for (const e4 of i3.className.split(".")) "" !== e4 && a2.push(e4);
          a2.length > 0 && (o2.className = a2.join(" "));
          const l2 = {};
          if (r2.groups.name && (l2[r2.groups.name] = o2), s3) for (const e4 of s3) Q(e4) ? o2.appendChild(e4) : "string" == typeof e4 ? o2.append(e4) : "root" in e4 && (Object.assign(l2, e4), o2.appendChild(e4.root));
          for (const [e4, t4] of Object.entries(i3)) if ("className" !== e4) if ("style" === e4) for (const [e5, i4] of Object.entries(t4)) o2.style.setProperty(fe(e5), "number" == typeof i4 ? i4 + "px" : "" + i4);
          else "tabIndex" === e4 ? o2.tabIndex = t4 : o2.setAttribute(fe(e4), t4.toString());
          return l2.root = o2, l2;
        }, t2.copyAttributes = pe, t2.trackAttributes = function(e3, i3, s3) {
          pe(e3, i3, s3);
          const r2 = new p.DisposableStore();
          return r2.add(t2.sharedMutationObserver.observe(e3, r2, { attributes: true, attributeFilter: s3 })(((t3) => {
            for (const s4 of t3) "attributes" === s4.type && s4.attributeName && ge(e3, i3, s4.attributeName);
          }))), r2;
        };
        const a = o(i2(4333)), l = i2(7745), h = i2(5394), c = i2(5964), d = i2(1758), u = i2(9807), _ = o(i2(802)), f = i2(7883), p = i2(7150), g = o(i2(8163)), m = i2(6304), v = i2(4693), S = i2(7704);
        s2 = (function() {
          const e3 = /* @__PURE__ */ new Map();
          (0, v.ensureCodeWindow)(v.mainWindow, 1);
          const i3 = { window: v.mainWindow, disposables: new p.DisposableStore() };
          e3.set(v.mainWindow.vscodeWindowId, i3);
          const s3 = new _.Emitter(), r2 = new _.Emitter(), n2 = new _.Emitter();
          return { onDidRegisterWindow: s3.event, onWillUnregisterWindow: n2.event, onDidUnregisterWindow: r2.event, registerWindow(i4) {
            if (e3.has(i4.vscodeWindowId)) return p.Disposable.None;
            const o2 = new p.DisposableStore(), a2 = { window: i4, disposables: o2.add(new p.DisposableStore()) };
            return e3.set(i4.vscodeWindowId, a2), o2.add((0, p.toDisposable)((() => {
              e3.delete(i4.vscodeWindowId), r2.fire(i4);
            }))), o2.add(C(i4, t2.EventType.BEFORE_UNLOAD, (() => {
              n2.fire(i4);
            }))), s3.fire(a2), o2;
          }, getWindows: () => e3.values(), getWindowsCount: () => e3.size, getWindowId: (e4) => e4.vscodeWindowId, hasWindow: (t3) => e3.has(t3), getWindowById: function(t3, s4) {
            return ("number" == typeof t3 ? e3.get(t3) : void 0) ?? (s4 ? i3 : void 0);
          }, getWindow(e4) {
            const t3 = e4;
            if (t3?.ownerDocument?.defaultView) return t3.ownerDocument.defaultView.window;
            const i4 = e4;
            return i4?.view ? i4.view.window : v.mainWindow;
          }, getDocument(e4) {
            const i4 = e4;
            return (0, t2.getWindow)(i4).document;
          } };
        })(), t2.registerWindow = s2.registerWindow, t2.getWindow = s2.getWindow, t2.getDocument = s2.getDocument, t2.getWindows = s2.getWindows, t2.getWindowsCount = s2.getWindowsCount, t2.getWindowId = s2.getWindowId, t2.getWindowById = s2.getWindowById, t2.hasWindow = s2.hasWindow, t2.onDidRegisterWindow = s2.onDidRegisterWindow, t2.onWillUnregisterWindow = s2.onWillUnregisterWindow, t2.onDidUnregisterWindow = s2.onDidUnregisterWindow;
        class b {
          constructor(e3, t3, i3, s3) {
            this._node = e3, this._type = t3, this._handler = i3, this._options = s3 || false, this._node.addEventListener(this._type, this._handler, this._options);
          }
          dispose() {
            this._handler && (this._node.removeEventListener(this._type, this._handler, this._options), this._node = null, this._handler = null);
          }
        }
        function C(e3, t3, i3, s3) {
          return new b(e3, t3, i3, s3);
        }
        function y(e3, t3) {
          return function(i3) {
            return t3(new c.StandardMouseEvent(e3, i3));
          };
        }
        function w(e3, i3, s3) {
          return C(e3, g.isIOS && l.BrowserFeatures.pointerEvents ? t2.EventType.POINTER_DOWN : t2.EventType.MOUSE_DOWN, i3, s3);
        }
        function E(e3, i3, s3) {
          return C(e3, g.isIOS && l.BrowserFeatures.pointerEvents ? t2.EventType.POINTER_UP : t2.EventType.MOUSE_UP, i3, s3);
        }
        t2.addStandardDisposableListener = function(e3, i3, s3, r2) {
          let n2 = s3;
          return "click" === i3 || "mousedown" === i3 || "contextmenu" === i3 ? n2 = y((0, t2.getWindow)(e3), s3) : "keydown" !== i3 && "keypress" !== i3 && "keyup" !== i3 || (n2 = /* @__PURE__ */ (function(e4) {
            return function(t3) {
              return e4(new h.StandardKeyboardEvent(t3));
            };
          })(s3)), C(e3, i3, n2, r2);
        }, t2.addStandardDisposableGenericMouseDownListener = function(e3, i3, s3) {
          return w(e3, y((0, t2.getWindow)(e3), i3), s3);
        }, t2.addStandardDisposableGenericMouseUpListener = function(e3, i3, s3) {
          return E(e3, y((0, t2.getWindow)(e3), i3), s3);
        };
        class D extends d.AbstractIdleValue {
          constructor(e3, t3) {
            super(e3, t3);
          }
        }
        t2.WindowIdleValue = D;
        class L extends d.IntervalTimer {
          constructor(e3) {
            super(), this.defaultTarget = e3 && (0, t2.getWindow)(e3);
          }
          cancelAndSet(e3, t3, i3) {
            return super.cancelAndSet(e3, t3, i3 ?? this.defaultTarget);
          }
        }
        t2.WindowIntervalTimer = L;
        class R {
          constructor(e3, t3 = 0) {
            this._runner = e3, this.priority = t3, this._canceled = false;
          }
          dispose() {
            this._canceled = true;
          }
          execute() {
            if (!this._canceled) try {
              this._runner();
            } catch (e3) {
              (0, u.onUnexpectedError)(e3);
            }
          }
          static sort(e3, t3) {
            return t3.priority - e3.priority;
          }
        }
        !(function() {
          const e3 = /* @__PURE__ */ new Map(), i3 = /* @__PURE__ */ new Map(), s3 = /* @__PURE__ */ new Map(), r2 = /* @__PURE__ */ new Map();
          t2.scheduleAtNextAnimationFrame = (n2, o2, a2 = 0) => {
            const l2 = (0, t2.getWindowId)(n2), h2 = new R(o2, a2);
            let c2 = e3.get(l2);
            return c2 || (c2 = [], e3.set(l2, c2)), c2.push(h2), s3.get(l2) || (s3.set(l2, true), n2.requestAnimationFrame((() => ((t3) => {
              s3.set(t3, false);
              const n3 = e3.get(t3) ?? [];
              for (i3.set(t3, n3), e3.set(t3, []), r2.set(t3, true); n3.length > 0; ) n3.sort(R.sort), n3.shift().execute();
              r2.set(t3, false);
            })(l2)))), h2;
          }, t2.runAtThisOrScheduleAtNextAnimationFrame = (e4, s4, n2) => {
            const o2 = (0, t2.getWindowId)(e4);
            if (r2.get(o2)) {
              const e5 = new R(s4, n2);
              let t3 = i3.get(o2);
              return t3 || (t3 = [], i3.set(o2, t3)), t3.push(e5), e5;
            }
            return (0, t2.scheduleAtNextAnimationFrame)(e4, s4, n2);
          };
        })();
        const A = function(e3, t3) {
          return t3;
        };
        class T extends p.Disposable {
          constructor(e3, t3, i3, s3 = A, r2 = 8) {
            super();
            let n2 = null, o2 = 0;
            const a2 = this._register(new d.TimeoutTimer()), l2 = () => {
              o2 = (/* @__PURE__ */ new Date()).getTime(), i3(n2), n2 = null;
            };
            this._register(C(e3, t3, ((e4) => {
              n2 = s3(n2, e4);
              const t4 = (/* @__PURE__ */ new Date()).getTime() - o2;
              t4 >= r2 ? (a2.cancel(), l2()) : a2.setIfNotSet(l2, r2 - t4);
            })));
          }
        }
        function k(e3) {
          return (0, t2.getWindow)(e3).getComputedStyle(e3, null);
        }
        class M {
          static convertToPixels(e3, t3) {
            return parseFloat(t3) || 0;
          }
          static getDimension(e3, t3, i3) {
            const s3 = k(e3), r2 = s3 ? s3.getPropertyValue(t3) : "0";
            return M.convertToPixels(e3, r2);
          }
          static getBorderLeftWidth(e3) {
            return M.getDimension(e3, "border-left-width", "borderLeftWidth");
          }
          static getBorderRightWidth(e3) {
            return M.getDimension(e3, "border-right-width", "borderRightWidth");
          }
          static getBorderTopWidth(e3) {
            return M.getDimension(e3, "border-top-width", "borderTopWidth");
          }
          static getBorderBottomWidth(e3) {
            return M.getDimension(e3, "border-bottom-width", "borderBottomWidth");
          }
          static getPaddingLeft(e3) {
            return M.getDimension(e3, "padding-left", "paddingLeft");
          }
          static getPaddingRight(e3) {
            return M.getDimension(e3, "padding-right", "paddingRight");
          }
          static getPaddingTop(e3) {
            return M.getDimension(e3, "padding-top", "paddingTop");
          }
          static getPaddingBottom(e3) {
            return M.getDimension(e3, "padding-bottom", "paddingBottom");
          }
          static getMarginLeft(e3) {
            return M.getDimension(e3, "margin-left", "marginLeft");
          }
          static getMarginTop(e3) {
            return M.getDimension(e3, "margin-top", "marginTop");
          }
          static getMarginRight(e3) {
            return M.getDimension(e3, "margin-right", "marginRight");
          }
          static getMarginBottom(e3) {
            return M.getDimension(e3, "margin-bottom", "marginBottom");
          }
        }
        class O {
          static {
            this.None = new O(0, 0);
          }
          constructor(e3, t3) {
            this.width = e3, this.height = t3;
          }
          with(e3 = this.width, t3 = this.height) {
            return e3 !== this.width || t3 !== this.height ? new O(e3, t3) : this;
          }
          static is(e3) {
            return "object" == typeof e3 && "number" == typeof e3.height && "number" == typeof e3.width;
          }
          static lift(e3) {
            return e3 instanceof O ? e3 : new O(e3.width, e3.height);
          }
          static equals(e3, t3) {
            return e3 === t3 || !(!e3 || !t3) && e3.width === t3.width && e3.height === t3.height;
          }
        }
        function I(e3) {
          let t3 = e3.offsetParent, i3 = e3.offsetTop, s3 = e3.offsetLeft;
          for (; null !== (e3 = e3.parentNode) && e3 !== e3.ownerDocument.body && e3 !== e3.ownerDocument.documentElement; ) {
            i3 -= e3.scrollTop;
            const r2 = W(e3) ? null : k(e3);
            r2 && (s3 -= "rtl" !== r2.direction ? e3.scrollLeft : -e3.scrollLeft), e3 === t3 && (s3 += M.getBorderLeftWidth(e3), i3 += M.getBorderTopWidth(e3), i3 += e3.offsetTop, s3 += e3.offsetLeft, t3 = e3.offsetParent);
          }
          return { left: s3, top: i3 };
        }
        function P(e3) {
          const t3 = M.getMarginLeft(e3) + M.getMarginRight(e3);
          return e3.offsetWidth + t3;
        }
        function x(e3) {
          const t3 = M.getMarginLeft(e3) + M.getMarginRight(e3);
          return e3.scrollWidth + t3;
        }
        function B(e3, t3) {
          return Boolean(t3?.contains(e3));
        }
        t2.Dimension = O;
        const N = "parentFlowToElementId";
        function U(e3) {
          const t3 = e3.dataset[N];
          return "string" == typeof t3 ? e3.ownerDocument.getElementById(t3) : null;
        }
        function F(e3, t3, i3) {
          for (; e3 && e3.nodeType === e3.ELEMENT_NODE; ) {
            if (e3.classList.contains(t3)) return e3;
            if (i3) {
              if ("string" == typeof i3) {
                if (e3.classList.contains(i3)) return null;
              } else if (e3 === i3) return null;
            }
            e3 = e3.parentNode;
          }
          return null;
        }
        function W(e3) {
          return e3 && !!e3.host && !!e3.mode;
        }
        function H(e3) {
          for (; e3.parentNode; ) {
            if (e3 === e3.ownerDocument?.body) return null;
            e3 = e3.parentNode;
          }
          return W(e3) ? e3 : null;
        }
        function K() {
          let e3 = z().activeElement;
          for (; e3?.shadowRoot; ) e3 = e3.shadowRoot.activeElement;
          return e3;
        }
        function z() {
          return (0, t2.getWindowsCount)() <= 1 ? v.mainWindow.document : Array.from((0, t2.getWindows)()).map((({ window: e3 }) => e3.document)).find(((e3) => e3.hasFocus())) ?? v.mainWindow.document;
        }
        const j = /* @__PURE__ */ new Map();
        class $ {
          constructor() {
            this._currentCssStyle = "", this._styleSheet = void 0;
          }
          setStyle(e3) {
            e3 !== this._currentCssStyle && (this._currentCssStyle = e3, this._styleSheet ? this._styleSheet.innerText = e3 : this._styleSheet = V(v.mainWindow.document.head, ((t3) => t3.innerText = e3)));
          }
          dispose() {
            this._styleSheet && (this._styleSheet.remove(), this._styleSheet = void 0);
          }
        }
        function V(e3 = v.mainWindow.document.head, i3, s3) {
          const r2 = document.createElement("style");
          if (r2.type = "text/css", r2.media = "screen", i3?.(r2), e3.appendChild(r2), s3 && s3.add((0, p.toDisposable)((() => r2.remove()))), e3 === v.mainWindow.document.head) {
            const e4 = /* @__PURE__ */ new Set();
            j.set(r2, e4);
            for (const { window: i4, disposables: n2 } of (0, t2.getWindows)()) {
              if (i4 === v.mainWindow) continue;
              const t3 = n2.add(G(r2, e4, i4));
              s3?.add(t3);
            }
          }
          return r2;
        }
        function G(e3, i3, s3) {
          const r2 = new p.DisposableStore(), n2 = e3.cloneNode(true);
          s3.document.head.appendChild(n2), r2.add((0, p.toDisposable)((() => n2.remove())));
          for (const t3 of Z(e3)) n2.sheet?.insertRule(t3.cssText, n2.sheet?.cssRules.length);
          return r2.add(t2.sharedMutationObserver.observe(e3, r2, { childList: true })((() => {
            n2.textContent = e3.textContent;
          }))), i3.add(n2), r2.add((0, p.toDisposable)((() => i3.delete(n2)))), r2;
        }
        function q(e3, t3 = v.mainWindow.document.head) {
          const i3 = document.createElement(e3);
          return t3.appendChild(i3), i3;
        }
        t2.sharedMutationObserver = new class {
          constructor() {
            this.mutationObservers = /* @__PURE__ */ new Map();
          }
          observe(e3, t3, i3) {
            let s3 = this.mutationObservers.get(e3);
            s3 || (s3 = /* @__PURE__ */ new Map(), this.mutationObservers.set(e3, s3));
            const r2 = (0, m.hash)(i3);
            let n2 = s3.get(r2);
            if (n2) n2.users += 1;
            else {
              const o2 = new _.Emitter(), a2 = new MutationObserver(((e4) => o2.fire(e4)));
              a2.observe(e3, i3);
              const l2 = n2 = { users: 1, observer: a2, onDidMutate: o2.event };
              t3.add((0, p.toDisposable)((() => {
                l2.users -= 1, 0 === l2.users && (o2.dispose(), a2.disconnect(), s3?.delete(r2), 0 === s3?.size && this.mutationObservers.delete(e3));
              }))), s3.set(r2, n2);
            }
            return n2.onDidMutate;
          }
        }();
        let X = null;
        function Y() {
          return X || (X = V()), X;
        }
        function Z(e3) {
          return e3?.sheet?.rules ? e3.sheet.rules : e3?.sheet?.cssRules ? e3.sheet.cssRules : [];
        }
        function J(e3) {
          return "string" == typeof e3.selectorText;
        }
        function Q(e3) {
          return e3 instanceof HTMLElement || e3 instanceof (0, t2.getWindow)(e3).HTMLElement;
        }
        t2.EventType = { CLICK: "click", AUXCLICK: "auxclick", DBLCLICK: "dblclick", MOUSE_UP: "mouseup", MOUSE_DOWN: "mousedown", MOUSE_OVER: "mouseover", MOUSE_MOVE: "mousemove", MOUSE_OUT: "mouseout", MOUSE_ENTER: "mouseenter", MOUSE_LEAVE: "mouseleave", MOUSE_WHEEL: "wheel", POINTER_UP: "pointerup", POINTER_DOWN: "pointerdown", POINTER_MOVE: "pointermove", POINTER_LEAVE: "pointerleave", CONTEXT_MENU: "contextmenu", WHEEL: "wheel", KEY_DOWN: "keydown", KEY_PRESS: "keypress", KEY_UP: "keyup", LOAD: "load", BEFORE_UNLOAD: "beforeunload", UNLOAD: "unload", PAGE_SHOW: "pageshow", PAGE_HIDE: "pagehide", PASTE: "paste", ABORT: "abort", ERROR: "error", RESIZE: "resize", SCROLL: "scroll", FULLSCREEN_CHANGE: "fullscreenchange", WK_FULLSCREEN_CHANGE: "webkitfullscreenchange", SELECT: "select", CHANGE: "change", SUBMIT: "submit", RESET: "reset", FOCUS: "focus", FOCUS_IN: "focusin", FOCUS_OUT: "focusout", BLUR: "blur", INPUT: "input", STORAGE: "storage", DRAG_START: "dragstart", DRAG: "drag", DRAG_ENTER: "dragenter", DRAG_LEAVE: "dragleave", DRAG_OVER: "dragover", DROP: "drop", DRAG_END: "dragend", ANIMATION_START: a.isWebKit ? "webkitAnimationStart" : "animationstart", ANIMATION_END: a.isWebKit ? "webkitAnimationEnd" : "animationend", ANIMATION_ITERATION: a.isWebKit ? "webkitAnimationIteration" : "animationiteration" }, t2.EventHelper = { stop: (e3, t3) => (e3.preventDefault(), t3 && e3.stopPropagation(), e3) };
        class ee extends p.Disposable {
          static hasFocusWithin(e3) {
            if (Q(e3)) {
              const t3 = H(e3);
              return B(t3 ? t3.activeElement : e3.ownerDocument.activeElement, e3);
            }
            {
              const t3 = e3;
              return B(t3.document.activeElement, t3.document);
            }
          }
          constructor(e3) {
            super(), this._onDidFocus = this._register(new _.Emitter()), this.onDidFocus = this._onDidFocus.event, this._onDidBlur = this._register(new _.Emitter()), this.onDidBlur = this._onDidBlur.event;
            let i3 = ee.hasFocusWithin(e3), s3 = false;
            const r2 = () => {
              s3 = false, i3 || (i3 = true, this._onDidFocus.fire());
            }, n2 = () => {
              i3 && (s3 = true, (Q(e3) ? (0, t2.getWindow)(e3) : e3).setTimeout((() => {
                s3 && (s3 = false, i3 = false, this._onDidBlur.fire());
              }), 0));
            };
            this._refreshStateHandler = () => {
              ee.hasFocusWithin(e3) !== i3 && (i3 ? n2() : r2());
            }, this._register(C(e3, t2.EventType.FOCUS, r2, true)), this._register(C(e3, t2.EventType.BLUR, n2, true)), Q(e3) && (this._register(C(e3, t2.EventType.FOCUS_IN, (() => this._refreshStateHandler()))), this._register(C(e3, t2.EventType.FOCUS_OUT, (() => this._refreshStateHandler()))));
          }
          refreshState() {
            this._refreshStateHandler();
          }
        }
        function te(e3, ...t3) {
          if (e3.append(...t3), 1 === t3.length && "string" != typeof t3[0]) return t3[0];
        }
        const ie = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;
        var se;
        function re(e3, t3, i3, ...s3) {
          const r2 = ie.exec(t3);
          if (!r2) throw new Error("Bad use of emmet");
          const n2 = r2[1] || "div";
          let o2;
          return o2 = e3 !== se.HTML ? document.createElementNS(e3, n2) : document.createElement(n2), r2[3] && (o2.id = r2[3]), r2[4] && (o2.className = r2[4].replace(/\./g, " ").trim()), i3 && Object.entries(i3).forEach((([e4, t4]) => {
            void 0 !== t4 && (/^on\w+$/.test(e4) ? o2[e4] = t4 : "selected" === e4 ? t4 && o2.setAttribute(e4, "true") : o2.setAttribute(e4, t4));
          })), o2.append(...s3), o2;
        }
        function ne(e3, t3, ...i3) {
          return re(se.HTML, e3, t3, ...i3);
        }
        function oe(...e3) {
          for (const t3 of e3) t3.style.display = "", t3.removeAttribute("aria-hidden");
        }
        function ae(...e3) {
          for (const t3 of e3) t3.style.display = "none", t3.setAttribute("aria-hidden", "true");
        }
        !(function(e3) {
          e3.HTML = "http://www.w3.org/1999/xhtml", e3.SVG = "http://www.w3.org/2000/svg";
        })(se || (t2.Namespace = se = {})), ne.SVG = function(e3, t3, ...i3) {
          return re(se.SVG, e3, t3, ...i3);
        };
        const le = 780, he = 640;
        var ce;
        !(function(e3) {
          e3[e3.DOCUMENT = 1] = "DOCUMENT", e3[e3.BROWSER = 2] = "BROWSER";
        })(ce || (t2.DetectedFullscreenMode = ce = {}));
        class de extends _.Emitter {
          constructor() {
            super(), this._subscriptions = new p.DisposableStore(), this._keyStatus = { altKey: false, shiftKey: false, ctrlKey: false, metaKey: false }, this._subscriptions.add(_.Event.runAndSubscribe(t2.onDidRegisterWindow, (({ window: e3, disposables: t3 }) => this.registerListeners(e3, t3)), { window: v.mainWindow, disposables: this._subscriptions }));
          }
          registerListeners(e3, t3) {
            t3.add(C(e3, "keydown", ((e4) => {
              if (e4.defaultPrevented) return;
              const t4 = new h.StandardKeyboardEvent(e4);
              if (t4.keyCode !== f.KeyCode.Alt || !e4.repeat) {
                if (e4.altKey && !this._keyStatus.altKey) this._keyStatus.lastKeyPressed = "alt";
                else if (e4.ctrlKey && !this._keyStatus.ctrlKey) this._keyStatus.lastKeyPressed = "ctrl";
                else if (e4.metaKey && !this._keyStatus.metaKey) this._keyStatus.lastKeyPressed = "meta";
                else if (e4.shiftKey && !this._keyStatus.shiftKey) this._keyStatus.lastKeyPressed = "shift";
                else {
                  if (t4.keyCode === f.KeyCode.Alt) return;
                  this._keyStatus.lastKeyPressed = void 0;
                }
                this._keyStatus.altKey = e4.altKey, this._keyStatus.ctrlKey = e4.ctrlKey, this._keyStatus.metaKey = e4.metaKey, this._keyStatus.shiftKey = e4.shiftKey, this._keyStatus.lastKeyPressed && (this._keyStatus.event = e4, this.fire(this._keyStatus));
              }
            }), true)), t3.add(C(e3, "keyup", ((e4) => {
              e4.defaultPrevented || (!e4.altKey && this._keyStatus.altKey ? this._keyStatus.lastKeyReleased = "alt" : !e4.ctrlKey && this._keyStatus.ctrlKey ? this._keyStatus.lastKeyReleased = "ctrl" : !e4.metaKey && this._keyStatus.metaKey ? this._keyStatus.lastKeyReleased = "meta" : !e4.shiftKey && this._keyStatus.shiftKey ? this._keyStatus.lastKeyReleased = "shift" : this._keyStatus.lastKeyReleased = void 0, this._keyStatus.lastKeyPressed !== this._keyStatus.lastKeyReleased && (this._keyStatus.lastKeyPressed = void 0), this._keyStatus.altKey = e4.altKey, this._keyStatus.ctrlKey = e4.ctrlKey, this._keyStatus.metaKey = e4.metaKey, this._keyStatus.shiftKey = e4.shiftKey, this._keyStatus.lastKeyReleased && (this._keyStatus.event = e4, this.fire(this._keyStatus)));
            }), true)), t3.add(C(e3.document.body, "mousedown", (() => {
              this._keyStatus.lastKeyPressed = void 0;
            }), true)), t3.add(C(e3.document.body, "mouseup", (() => {
              this._keyStatus.lastKeyPressed = void 0;
            }), true)), t3.add(C(e3.document.body, "mousemove", ((e4) => {
              e4.buttons && (this._keyStatus.lastKeyPressed = void 0);
            }), true)), t3.add(C(e3, "blur", (() => {
              this.resetKeyStatus();
            })));
          }
          get keyStatus() {
            return this._keyStatus;
          }
          get isModifierPressed() {
            return this._keyStatus.altKey || this._keyStatus.ctrlKey || this._keyStatus.metaKey || this._keyStatus.shiftKey;
          }
          resetKeyStatus() {
            this.doResetKeyStatus(), this.fire(this._keyStatus);
          }
          doResetKeyStatus() {
            this._keyStatus = { altKey: false, shiftKey: false, ctrlKey: false, metaKey: false };
          }
          static getInstance() {
            return de.instance || (de.instance = new de()), de.instance;
          }
          dispose() {
            super.dispose(), this._subscriptions.dispose();
          }
        }
        t2.ModifierKeyEmitter = de;
        class ue extends p.Disposable {
          constructor(e3, t3) {
            super(), this.element = e3, this.callbacks = t3, this.counter = 0, this.dragStartTime = 0, this.registerListeners();
          }
          registerListeners() {
            this.callbacks.onDragStart && this._register(C(this.element, t2.EventType.DRAG_START, ((e3) => {
              this.callbacks.onDragStart?.(e3);
            }))), this.callbacks.onDrag && this._register(C(this.element, t2.EventType.DRAG, ((e3) => {
              this.callbacks.onDrag?.(e3);
            }))), this._register(C(this.element, t2.EventType.DRAG_ENTER, ((e3) => {
              this.counter++, this.dragStartTime = e3.timeStamp, this.callbacks.onDragEnter?.(e3);
            }))), this._register(C(this.element, t2.EventType.DRAG_OVER, ((e3) => {
              e3.preventDefault(), this.callbacks.onDragOver?.(e3, e3.timeStamp - this.dragStartTime);
            }))), this._register(C(this.element, t2.EventType.DRAG_LEAVE, ((e3) => {
              this.counter--, 0 === this.counter && (this.dragStartTime = 0, this.callbacks.onDragLeave?.(e3));
            }))), this._register(C(this.element, t2.EventType.DRAG_END, ((e3) => {
              this.counter = 0, this.dragStartTime = 0, this.callbacks.onDragEnd?.(e3);
            }))), this._register(C(this.element, t2.EventType.DROP, ((e3) => {
              this.counter = 0, this.dragStartTime = 0, this.callbacks.onDrop?.(e3);
            })));
          }
        }
        t2.DragAndDropObserver = ue;
        const _e = /(?<tag>[\w\-]+)?(?:#(?<id>[\w\-]+))?(?<class>(?:\.(?:[\w\-]+))*)(?:@(?<name>(?:[\w\_])+))?/;
        function fe(e3) {
          return e3.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        }
        function pe(e3, t3, i3) {
          for (const { name: s3, value: r2 } of e3.attributes) i3 && !i3.includes(s3) || t3.setAttribute(s3, r2);
        }
        function ge(e3, t3, i3) {
          const s3 = e3.getAttribute(i3);
          s3 ? t3.setAttribute(i3, s3) : t3.removeAttribute(i3);
        }
        t2.SafeTriangle = class {
          constructor(e3, t3, i3) {
            this.originX = e3, this.originY = t3, this.triangles = [];
            const { top: s3, left: r2, right: n2, bottom: o2 } = i3.getBoundingClientRect(), a2 = this.triangles;
            let l2 = 0;
            a2[l2++] = r2, a2[l2++] = s3, a2[l2++] = n2, a2[l2++] = s3, a2[l2++] = r2, a2[l2++] = s3, a2[l2++] = r2, a2[l2++] = o2, a2[l2++] = n2, a2[l2++] = s3, a2[l2++] = n2, a2[l2++] = o2, a2[l2++] = r2, a2[l2++] = o2, a2[l2++] = n2, a2[l2++] = o2;
          }
          contains(e3, t3) {
            const { triangles: i3, originX: s3, originY: r2 } = this;
            for (let n2 = 0; n2 < 4; n2++) if ((0, S.isPointWithinTriangle)(e3, t3, s3, r2, i3[2 * n2], i3[2 * n2 + 1], i3[2 * n2 + 2], i3[2 * n2 + 3])) return true;
            return false;
          }
        };
      }, 9675: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.FastDomNode = void 0, t2.createFastDomNode = function(e3) {
          return new i2(e3);
        };
        class i2 {
          constructor(e3) {
            this.domNode = e3, this._maxWidth = "", this._width = "", this._height = "", this._top = "", this._left = "", this._bottom = "", this._right = "", this._paddingTop = "", this._paddingLeft = "", this._paddingBottom = "", this._paddingRight = "", this._fontFamily = "", this._fontWeight = "", this._fontSize = "", this._fontStyle = "", this._fontFeatureSettings = "", this._fontVariationSettings = "", this._textDecoration = "", this._lineHeight = "", this._letterSpacing = "", this._className = "", this._display = "", this._position = "", this._visibility = "", this._color = "", this._backgroundColor = "", this._layerHint = false, this._contain = "none", this._boxShadow = "";
          }
          setMaxWidth(e3) {
            const t3 = s2(e3);
            this._maxWidth !== t3 && (this._maxWidth = t3, this.domNode.style.maxWidth = this._maxWidth);
          }
          setWidth(e3) {
            const t3 = s2(e3);
            this._width !== t3 && (this._width = t3, this.domNode.style.width = this._width);
          }
          setHeight(e3) {
            const t3 = s2(e3);
            this._height !== t3 && (this._height = t3, this.domNode.style.height = this._height);
          }
          setTop(e3) {
            const t3 = s2(e3);
            this._top !== t3 && (this._top = t3, this.domNode.style.top = this._top);
          }
          setLeft(e3) {
            const t3 = s2(e3);
            this._left !== t3 && (this._left = t3, this.domNode.style.left = this._left);
          }
          setBottom(e3) {
            const t3 = s2(e3);
            this._bottom !== t3 && (this._bottom = t3, this.domNode.style.bottom = this._bottom);
          }
          setRight(e3) {
            const t3 = s2(e3);
            this._right !== t3 && (this._right = t3, this.domNode.style.right = this._right);
          }
          setPaddingTop(e3) {
            const t3 = s2(e3);
            this._paddingTop !== t3 && (this._paddingTop = t3, this.domNode.style.paddingTop = this._paddingTop);
          }
          setPaddingLeft(e3) {
            const t3 = s2(e3);
            this._paddingLeft !== t3 && (this._paddingLeft = t3, this.domNode.style.paddingLeft = this._paddingLeft);
          }
          setPaddingBottom(e3) {
            const t3 = s2(e3);
            this._paddingBottom !== t3 && (this._paddingBottom = t3, this.domNode.style.paddingBottom = this._paddingBottom);
          }
          setPaddingRight(e3) {
            const t3 = s2(e3);
            this._paddingRight !== t3 && (this._paddingRight = t3, this.domNode.style.paddingRight = this._paddingRight);
          }
          setFontFamily(e3) {
            this._fontFamily !== e3 && (this._fontFamily = e3, this.domNode.style.fontFamily = this._fontFamily);
          }
          setFontWeight(e3) {
            this._fontWeight !== e3 && (this._fontWeight = e3, this.domNode.style.fontWeight = this._fontWeight);
          }
          setFontSize(e3) {
            const t3 = s2(e3);
            this._fontSize !== t3 && (this._fontSize = t3, this.domNode.style.fontSize = this._fontSize);
          }
          setFontStyle(e3) {
            this._fontStyle !== e3 && (this._fontStyle = e3, this.domNode.style.fontStyle = this._fontStyle);
          }
          setFontFeatureSettings(e3) {
            this._fontFeatureSettings !== e3 && (this._fontFeatureSettings = e3, this.domNode.style.fontFeatureSettings = this._fontFeatureSettings);
          }
          setFontVariationSettings(e3) {
            this._fontVariationSettings !== e3 && (this._fontVariationSettings = e3, this.domNode.style.fontVariationSettings = this._fontVariationSettings);
          }
          setTextDecoration(e3) {
            this._textDecoration !== e3 && (this._textDecoration = e3, this.domNode.style.textDecoration = this._textDecoration);
          }
          setLineHeight(e3) {
            const t3 = s2(e3);
            this._lineHeight !== t3 && (this._lineHeight = t3, this.domNode.style.lineHeight = this._lineHeight);
          }
          setLetterSpacing(e3) {
            const t3 = s2(e3);
            this._letterSpacing !== t3 && (this._letterSpacing = t3, this.domNode.style.letterSpacing = this._letterSpacing);
          }
          setClassName(e3) {
            this._className !== e3 && (this._className = e3, this.domNode.className = this._className);
          }
          toggleClassName(e3, t3) {
            this.domNode.classList.toggle(e3, t3), this._className = this.domNode.className;
          }
          setDisplay(e3) {
            this._display !== e3 && (this._display = e3, this.domNode.style.display = this._display);
          }
          setPosition(e3) {
            this._position !== e3 && (this._position = e3, this.domNode.style.position = this._position);
          }
          setVisibility(e3) {
            this._visibility !== e3 && (this._visibility = e3, this.domNode.style.visibility = this._visibility);
          }
          setColor(e3) {
            this._color !== e3 && (this._color = e3, this.domNode.style.color = this._color);
          }
          setBackgroundColor(e3) {
            this._backgroundColor !== e3 && (this._backgroundColor = e3, this.domNode.style.backgroundColor = this._backgroundColor);
          }
          setLayerHinting(e3) {
            this._layerHint !== e3 && (this._layerHint = e3, this.domNode.style.transform = this._layerHint ? "translate3d(0px, 0px, 0px)" : "");
          }
          setBoxShadow(e3) {
            this._boxShadow !== e3 && (this._boxShadow = e3, this.domNode.style.boxShadow = e3);
          }
          setContain(e3) {
            this._contain !== e3 && (this._contain = e3, this.domNode.style.contain = this._contain);
          }
          setAttribute(e3, t3) {
            this.domNode.setAttribute(e3, t3);
          }
          removeAttribute(e3) {
            this.domNode.removeAttribute(e3);
          }
          appendChild(e3) {
            this.domNode.appendChild(e3.domNode);
          }
          removeChild(e3) {
            this.domNode.removeChild(e3.domNode);
          }
        }
        function s2(e3) {
          return "number" == typeof e3 ? `${e3}px` : e3;
        }
        t2.FastDomNode = i2;
      }, 8328: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.GlobalPointerMoveMonitor = void 0;
        const o = n(i2(7093)), a = i2(7150);
        t2.GlobalPointerMoveMonitor = class {
          constructor() {
            this._hooks = new a.DisposableStore(), this._pointerMoveCallback = null, this._onStopCallback = null;
          }
          dispose() {
            this.stopMonitoring(false), this._hooks.dispose();
          }
          stopMonitoring(e3, t3) {
            if (!this.isMonitoring()) return;
            this._hooks.clear(), this._pointerMoveCallback = null;
            const i3 = this._onStopCallback;
            this._onStopCallback = null, e3 && i3 && i3(t3);
          }
          isMonitoring() {
            return !!this._pointerMoveCallback;
          }
          startMonitoring(e3, t3, i3, s3, r2) {
            this.isMonitoring() && this.stopMonitoring(false), this._pointerMoveCallback = s3, this._onStopCallback = r2;
            let n2 = e3;
            try {
              e3.setPointerCapture(t3), this._hooks.add((0, a.toDisposable)((() => {
                try {
                  e3.releasePointerCapture(t3);
                } catch (e4) {
                }
              })));
            } catch (t4) {
              n2 = o.getWindow(e3);
            }
            this._hooks.add(o.addDisposableListener(n2, o.EventType.POINTER_MOVE, ((e4) => {
              e4.buttons === i3 ? (e4.preventDefault(), this._pointerMoveCallback(e4)) : this.stopMonitoring(true);
            }))), this._hooks.add(o.addDisposableListener(n2, o.EventType.POINTER_UP, ((e4) => this.stopMonitoring(true))));
          }
        };
      }, 6609: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.IframeUtils = void 0, t2.parentOriginHash = async function(e3, t3) {
          if (!crypto.subtle) throw new Error("'crypto.subtle' is not available so webviews will not work. This is likely because the editor is not running in a secure context (https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).");
          const i3 = JSON.stringify({ parentOrigin: e3, salt: t3 }), s3 = new TextEncoder().encode(i3);
          return (function(e4) {
            const t4 = Array.from(new Uint8Array(e4)).map(((e5) => e5.toString(16).padStart(2, "0"))).join("");
            return BigInt(`0x${t4}`).toString(32).padStart(52, "0");
          })(await crypto.subtle.digest("sha-256", s3));
        };
        const i2 = /* @__PURE__ */ new WeakMap();
        function s2(e3) {
          if (!e3.parent || e3.parent === e3) return null;
          try {
            const t3 = e3.location, i3 = e3.parent.location;
            if ("null" !== t3.origin && "null" !== i3.origin && t3.origin !== i3.origin) return null;
          } catch (e4) {
            return null;
          }
          return e3.parent;
        }
        t2.IframeUtils = class {
          static getSameOriginWindowChain(e3) {
            let t3 = i2.get(e3);
            if (!t3) {
              t3 = [], i2.set(e3, t3);
              let r, n = e3;
              do {
                r = s2(n), r ? t3.push({ window: new WeakRef(n), iframeElement: n.frameElement || null }) : t3.push({ window: new WeakRef(n), iframeElement: null }), n = r;
              } while (n);
            }
            return t3.slice(0);
          }
          static getPositionOfChildWindowRelativeToAncestorWindow(e3, t3) {
            if (!t3 || e3 === t3) return { top: 0, left: 0 };
            let i3 = 0, s3 = 0;
            const r = this.getSameOriginWindowChain(e3);
            for (const e4 of r) {
              const r2 = e4.window.deref();
              if (i3 += r2?.scrollY ?? 0, s3 += r2?.scrollX ?? 0, r2 === t3) break;
              if (!e4.iframeElement) break;
              const n = e4.iframeElement.getBoundingClientRect();
              i3 += n.top, s3 += n.left;
            }
            return { top: i3, left: s3 };
          }
        };
      }, 5394: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.StandardKeyboardEvent = void 0, t2.printKeyboardEvent = function(e3) {
          const t3 = [];
          return e3.ctrlKey && t3.push("ctrl"), e3.shiftKey && t3.push("shift"), e3.altKey && t3.push("alt"), e3.metaKey && t3.push("meta"), `modifiers: [${t3.join(",")}], code: ${e3.code}, keyCode: ${e3.keyCode}, key: ${e3.key}`;
        }, t2.printStandardKeyboardEvent = function(e3) {
          const t3 = [];
          return e3.ctrlKey && t3.push("ctrl"), e3.shiftKey && t3.push("shift"), e3.altKey && t3.push("alt"), e3.metaKey && t3.push("meta"), `modifiers: [${t3.join(",")}], code: ${e3.code}, keyCode: ${e3.keyCode} ('${a.KeyCodeUtils.toString(e3.keyCode)}')`;
        };
        const o = n(i2(4333)), a = i2(7883), l = i2(2811), h = n(i2(8163)), c = h.isMacintosh ? a.KeyMod.WinCtrl : a.KeyMod.CtrlCmd, d = a.KeyMod.Alt, u = a.KeyMod.Shift, _ = h.isMacintosh ? a.KeyMod.CtrlCmd : a.KeyMod.WinCtrl;
        t2.StandardKeyboardEvent = class {
          constructor(e3) {
            this._standardKeyboardEventBrand = true;
            const t3 = e3;
            this.browserEvent = t3, this.target = t3.target, this.ctrlKey = t3.ctrlKey, this.shiftKey = t3.shiftKey, this.altKey = t3.altKey, this.metaKey = t3.metaKey, this.altGraphKey = t3.getModifierState?.("AltGraph"), this.keyCode = (function(e4) {
              if (e4.charCode) {
                const t5 = String.fromCharCode(e4.charCode).toUpperCase();
                return a.KeyCodeUtils.fromString(t5);
              }
              const t4 = e4.keyCode;
              if (3 === t4) return a.KeyCode.PauseBreak;
              if (o.isFirefox) switch (t4) {
                case 59:
                  return a.KeyCode.Semicolon;
                case 60:
                  if (h.isLinux) return a.KeyCode.IntlBackslash;
                  break;
                case 61:
                  return a.KeyCode.Equal;
                case 107:
                  return a.KeyCode.NumpadAdd;
                case 109:
                  return a.KeyCode.NumpadSubtract;
                case 173:
                  return a.KeyCode.Minus;
                case 224:
                  if (h.isMacintosh) return a.KeyCode.Meta;
              }
              else if (o.isWebKit) {
                if (h.isMacintosh && 93 === t4) return a.KeyCode.Meta;
                if (!h.isMacintosh && 92 === t4) return a.KeyCode.Meta;
              }
              return a.EVENT_KEY_CODE_MAP[t4] || a.KeyCode.Unknown;
            })(t3), this.code = t3.code, this.ctrlKey = this.ctrlKey || this.keyCode === a.KeyCode.Ctrl, this.altKey = this.altKey || this.keyCode === a.KeyCode.Alt, this.shiftKey = this.shiftKey || this.keyCode === a.KeyCode.Shift, this.metaKey = this.metaKey || this.keyCode === a.KeyCode.Meta, this._asKeybinding = this._computeKeybinding(), this._asKeyCodeChord = this._computeKeyCodeChord();
          }
          preventDefault() {
            this.browserEvent && this.browserEvent.preventDefault && this.browserEvent.preventDefault();
          }
          stopPropagation() {
            this.browserEvent && this.browserEvent.stopPropagation && this.browserEvent.stopPropagation();
          }
          toKeyCodeChord() {
            return this._asKeyCodeChord;
          }
          equals(e3) {
            return this._asKeybinding === e3;
          }
          _computeKeybinding() {
            let e3 = a.KeyCode.Unknown;
            this.keyCode !== a.KeyCode.Ctrl && this.keyCode !== a.KeyCode.Shift && this.keyCode !== a.KeyCode.Alt && this.keyCode !== a.KeyCode.Meta && (e3 = this.keyCode);
            let t3 = 0;
            return this.ctrlKey && (t3 |= c), this.altKey && (t3 |= d), this.shiftKey && (t3 |= u), this.metaKey && (t3 |= _), t3 |= e3, t3;
          }
          _computeKeyCodeChord() {
            let e3 = a.KeyCode.Unknown;
            return this.keyCode !== a.KeyCode.Ctrl && this.keyCode !== a.KeyCode.Shift && this.keyCode !== a.KeyCode.Alt && this.keyCode !== a.KeyCode.Meta && (e3 = this.keyCode), new l.KeyCodeChord(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, e3);
          }
        };
      }, 5964: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.StandardWheelEvent = t2.DragMouseEvent = t2.StandardMouseEvent = void 0;
        const o = n(i2(4333)), a = i2(6609), l = n(i2(8163));
        class h {
          constructor(e3, t3) {
            this.timestamp = Date.now(), this.browserEvent = t3, this.leftButton = 0 === t3.button, this.middleButton = 1 === t3.button, this.rightButton = 2 === t3.button, this.buttons = t3.buttons, this.target = t3.target, this.detail = t3.detail || 1, "dblclick" === t3.type && (this.detail = 2), this.ctrlKey = t3.ctrlKey, this.shiftKey = t3.shiftKey, this.altKey = t3.altKey, this.metaKey = t3.metaKey, "number" == typeof t3.pageX ? (this.posx = t3.pageX, this.posy = t3.pageY) : (this.posx = t3.clientX + this.target.ownerDocument.body.scrollLeft + this.target.ownerDocument.documentElement.scrollLeft, this.posy = t3.clientY + this.target.ownerDocument.body.scrollTop + this.target.ownerDocument.documentElement.scrollTop);
            const i3 = a.IframeUtils.getPositionOfChildWindowRelativeToAncestorWindow(e3, t3.view);
            this.posx -= i3.left, this.posy -= i3.top;
          }
          preventDefault() {
            this.browserEvent.preventDefault();
          }
          stopPropagation() {
            this.browserEvent.stopPropagation();
          }
        }
        t2.StandardMouseEvent = h, t2.DragMouseEvent = class extends h {
          constructor(e3, t3) {
            super(e3, t3), this.dataTransfer = t3.dataTransfer;
          }
        }, t2.StandardWheelEvent = class {
          constructor(e3, t3 = 0, i3 = 0) {
            this.browserEvent = e3 || null, this.target = e3 ? e3.target || e3.targetNode || e3.srcElement : null, this.deltaY = i3, this.deltaX = t3;
            let s3 = false;
            if (o.isChrome) {
              const e4 = navigator.userAgent.match(/Chrome\/(\d+)/);
              s3 = (e4 ? parseInt(e4[1]) : 123) <= 122;
            }
            if (e3) {
              const t4 = e3, i4 = e3, r2 = e3.view?.devicePixelRatio || 1;
              if (void 0 !== t4.wheelDeltaY) this.deltaY = s3 ? t4.wheelDeltaY / (120 * r2) : t4.wheelDeltaY / 120;
              else if (void 0 !== i4.VERTICAL_AXIS && i4.axis === i4.VERTICAL_AXIS) this.deltaY = -i4.detail / 3;
              else if ("wheel" === e3.type) {
                const t5 = e3;
                t5.deltaMode === t5.DOM_DELTA_LINE ? o.isFirefox && !l.isMacintosh ? this.deltaY = -e3.deltaY / 3 : this.deltaY = -e3.deltaY : this.deltaY = -e3.deltaY / 40;
              }
              if (void 0 !== t4.wheelDeltaX) o.isSafari && l.isWindows ? this.deltaX = -t4.wheelDeltaX / 120 : this.deltaX = s3 ? t4.wheelDeltaX / (120 * r2) : t4.wheelDeltaX / 120;
              else if (void 0 !== i4.HORIZONTAL_AXIS && i4.axis === i4.HORIZONTAL_AXIS) this.deltaX = -e3.detail / 3;
              else if ("wheel" === e3.type) {
                const t5 = e3;
                t5.deltaMode === t5.DOM_DELTA_LINE ? o.isFirefox && !l.isMacintosh ? this.deltaX = -e3.deltaX / 3 : this.deltaX = -e3.deltaX : this.deltaX = -e3.deltaX / 40;
              }
              0 === this.deltaY && 0 === this.deltaX && e3.wheelDelta && (this.deltaY = s3 ? e3.wheelDelta / (120 * r2) : e3.wheelDelta / 120);
            }
          }
          preventDefault() {
            this.browserEvent?.preventDefault();
          }
          stopPropagation() {
            this.browserEvent?.stopPropagation();
          }
        };
      }, 8594: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__decorate || function(e3, t3, i3, s3) {
          var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t3, i3, s3);
          else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
          return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
        }, o = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Gesture = t2.EventType = void 0;
        const a = o(i2(7093)), l = i2(4693), h = o(i2(3058)), c = i2(4838), d = i2(802), u = i2(7150), _ = i2(6317);
        var f;
        !(function(e3) {
          e3.Tap = "-xterm-gesturetap", e3.Change = "-xterm-gesturechange", e3.Start = "-xterm-gesturestart", e3.End = "-xterm-gesturesend", e3.Contextmenu = "-xterm-gesturecontextmenu";
        })(f || (t2.EventType = f = {}));
        class p extends u.Disposable {
          static {
            this.SCROLL_FRICTION = -5e-3;
          }
          static {
            this.HOLD_DELAY = 700;
          }
          static {
            this.CLEAR_TAP_COUNT_TIME = 400;
          }
          constructor() {
            super(), this.dispatched = false, this.targets = new _.LinkedList(), this.ignoreTargets = new _.LinkedList(), this.activeTouches = {}, this.handle = null, this._lastSetTapCountTime = 0, this._register(d.Event.runAndSubscribe(a.onDidRegisterWindow, (({ window: e3, disposables: t3 }) => {
              t3.add(a.addDisposableListener(e3.document, "touchstart", ((e4) => this.onTouchStart(e4)), { passive: false })), t3.add(a.addDisposableListener(e3.document, "touchend", ((t4) => this.onTouchEnd(e3, t4)))), t3.add(a.addDisposableListener(e3.document, "touchmove", ((e4) => this.onTouchMove(e4)), { passive: false }));
            }), { window: l.mainWindow, disposables: this._store }));
          }
          static addTarget(e3) {
            if (!p.isTouchDevice()) return u.Disposable.None;
            p.INSTANCE || (p.INSTANCE = (0, u.markAsSingleton)(new p()));
            const t3 = p.INSTANCE.targets.push(e3);
            return (0, u.toDisposable)(t3);
          }
          static ignoreTarget(e3) {
            if (!p.isTouchDevice()) return u.Disposable.None;
            p.INSTANCE || (p.INSTANCE = (0, u.markAsSingleton)(new p()));
            const t3 = p.INSTANCE.ignoreTargets.push(e3);
            return (0, u.toDisposable)(t3);
          }
          static isTouchDevice() {
            return "ontouchstart" in l.mainWindow || navigator.maxTouchPoints > 0;
          }
          dispose() {
            this.handle && (this.handle.dispose(), this.handle = null), super.dispose();
          }
          onTouchStart(e3) {
            const t3 = Date.now();
            this.handle && (this.handle.dispose(), this.handle = null);
            for (let i3 = 0, s3 = e3.targetTouches.length; i3 < s3; i3++) {
              const s4 = e3.targetTouches.item(i3);
              this.activeTouches[s4.identifier] = { id: s4.identifier, initialTarget: s4.target, initialTimeStamp: t3, initialPageX: s4.pageX, initialPageY: s4.pageY, rollingTimestamps: [t3], rollingPageX: [s4.pageX], rollingPageY: [s4.pageY] };
              const r2 = this.newGestureEvent(f.Start, s4.target);
              r2.pageX = s4.pageX, r2.pageY = s4.pageY, this.dispatchEvent(r2);
            }
            this.dispatched && (e3.preventDefault(), e3.stopPropagation(), this.dispatched = false);
          }
          onTouchEnd(e3, t3) {
            const i3 = Date.now(), s3 = Object.keys(this.activeTouches).length;
            for (let r2 = 0, n2 = t3.changedTouches.length; r2 < n2; r2++) {
              const n3 = t3.changedTouches.item(r2);
              if (!this.activeTouches.hasOwnProperty(String(n3.identifier))) {
                console.warn("move of an UNKNOWN touch", n3);
                continue;
              }
              const o2 = this.activeTouches[n3.identifier], a2 = Date.now() - o2.initialTimeStamp;
              if (a2 < p.HOLD_DELAY && Math.abs(o2.initialPageX - h.tail(o2.rollingPageX)) < 30 && Math.abs(o2.initialPageY - h.tail(o2.rollingPageY)) < 30) {
                const e4 = this.newGestureEvent(f.Tap, o2.initialTarget);
                e4.pageX = h.tail(o2.rollingPageX), e4.pageY = h.tail(o2.rollingPageY), this.dispatchEvent(e4);
              } else if (a2 >= p.HOLD_DELAY && Math.abs(o2.initialPageX - h.tail(o2.rollingPageX)) < 30 && Math.abs(o2.initialPageY - h.tail(o2.rollingPageY)) < 30) {
                const e4 = this.newGestureEvent(f.Contextmenu, o2.initialTarget);
                e4.pageX = h.tail(o2.rollingPageX), e4.pageY = h.tail(o2.rollingPageY), this.dispatchEvent(e4);
              } else if (1 === s3) {
                const t4 = h.tail(o2.rollingPageX), s4 = h.tail(o2.rollingPageY), r3 = h.tail(o2.rollingTimestamps) - o2.rollingTimestamps[0], n4 = t4 - o2.rollingPageX[0], a3 = s4 - o2.rollingPageY[0], l2 = [...this.targets].filter(((e4) => o2.initialTarget instanceof Node && e4.contains(o2.initialTarget)));
                this.inertia(e3, l2, i3, Math.abs(n4) / r3, n4 > 0 ? 1 : -1, t4, Math.abs(a3) / r3, a3 > 0 ? 1 : -1, s4);
              }
              this.dispatchEvent(this.newGestureEvent(f.End, o2.initialTarget)), delete this.activeTouches[n3.identifier];
            }
            this.dispatched && (t3.preventDefault(), t3.stopPropagation(), this.dispatched = false);
          }
          newGestureEvent(e3, t3) {
            const i3 = document.createEvent("CustomEvent");
            return i3.initEvent(e3, false, true), i3.initialTarget = t3, i3.tapCount = 0, i3;
          }
          dispatchEvent(e3) {
            if (e3.type === f.Tap) {
              const t3 = (/* @__PURE__ */ new Date()).getTime();
              let i3 = 0;
              i3 = t3 - this._lastSetTapCountTime > p.CLEAR_TAP_COUNT_TIME ? 1 : 2, this._lastSetTapCountTime = t3, e3.tapCount = i3;
            } else e3.type !== f.Change && e3.type !== f.Contextmenu || (this._lastSetTapCountTime = 0);
            if (e3.initialTarget instanceof Node) {
              for (const t4 of this.ignoreTargets) if (t4.contains(e3.initialTarget)) return;
              const t3 = [];
              for (const i3 of this.targets) if (i3.contains(e3.initialTarget)) {
                let s3 = 0, r2 = e3.initialTarget;
                for (; r2 && r2 !== i3; ) s3++, r2 = r2.parentElement;
                t3.push([s3, i3]);
              }
              t3.sort(((e4, t4) => e4[0] - t4[0]));
              for (const [i3, s3] of t3) s3.dispatchEvent(e3), this.dispatched = true;
            }
          }
          inertia(e3, t3, i3, s3, r2, n2, o2, l2, h2) {
            this.handle = a.scheduleAtNextAnimationFrame(e3, (() => {
              const a2 = Date.now(), c2 = a2 - i3;
              let d2 = 0, u2 = 0, _2 = true;
              s3 += p.SCROLL_FRICTION * c2, o2 += p.SCROLL_FRICTION * c2, s3 > 0 && (_2 = false, d2 = r2 * s3 * c2), o2 > 0 && (_2 = false, u2 = l2 * o2 * c2);
              const g = this.newGestureEvent(f.Change);
              g.translationX = d2, g.translationY = u2, t3.forEach(((e4) => e4.dispatchEvent(g))), _2 || this.inertia(e3, t3, a2, s3, r2, n2 + d2, o2, l2, h2 + u2);
            }));
          }
          onTouchMove(e3) {
            const t3 = Date.now();
            for (let i3 = 0, s3 = e3.changedTouches.length; i3 < s3; i3++) {
              const s4 = e3.changedTouches.item(i3);
              if (!this.activeTouches.hasOwnProperty(String(s4.identifier))) {
                console.warn("end of an UNKNOWN touch", s4);
                continue;
              }
              const r2 = this.activeTouches[s4.identifier], n2 = this.newGestureEvent(f.Change, r2.initialTarget);
              n2.translationX = s4.pageX - h.tail(r2.rollingPageX), n2.translationY = s4.pageY - h.tail(r2.rollingPageY), n2.pageX = s4.pageX, n2.pageY = s4.pageY, this.dispatchEvent(n2), r2.rollingPageX.length > 3 && (r2.rollingPageX.shift(), r2.rollingPageY.shift(), r2.rollingTimestamps.shift()), r2.rollingPageX.push(s4.pageX), r2.rollingPageY.push(s4.pageY), r2.rollingTimestamps.push(t3);
            }
            this.dispatched && (e3.preventDefault(), e3.stopPropagation(), this.dispatched = false);
          }
        }
        t2.Gesture = p, n([c.memoize], p, "isTouchDevice", null);
      }, 8801: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.AbstractScrollbar = void 0;
        const o = n(i2(7093)), a = i2(9675), l = i2(8328), h = i2(8974), c = i2(79), d = i2(8286), u = n(i2(8163));
        class _ extends d.Widget {
          constructor(e3) {
            super(), this._lazyRender = e3.lazyRender, this._host = e3.host, this._scrollable = e3.scrollable, this._scrollByPage = e3.scrollByPage, this._scrollbarState = e3.scrollbarState, this._visibilityController = this._register(new c.ScrollbarVisibilityController(e3.visibility, "visible scrollbar " + e3.extraScrollbarClassName, "invisible scrollbar " + e3.extraScrollbarClassName)), this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._pointerMoveMonitor = this._register(new l.GlobalPointerMoveMonitor()), this._shouldRender = true, this.domNode = (0, a.createFastDomNode)(document.createElement("div")), this.domNode.setAttribute("role", "presentation"), this.domNode.setAttribute("aria-hidden", "true"), this._visibilityController.setDomNode(this.domNode), this.domNode.setPosition("absolute"), this._register(o.addDisposableListener(this.domNode.domNode, o.EventType.POINTER_DOWN, ((e4) => this._domNodePointerDown(e4))));
          }
          _createArrow(e3) {
            const t3 = this._register(new h.ScrollbarArrow(e3));
            this.domNode.domNode.appendChild(t3.bgDomNode), this.domNode.domNode.appendChild(t3.domNode);
          }
          _createSlider(e3, t3, i3, s3) {
            this.slider = (0, a.createFastDomNode)(document.createElement("div")), this.slider.setClassName("slider"), this.slider.setPosition("absolute"), this.slider.setTop(e3), this.slider.setLeft(t3), "number" == typeof i3 && this.slider.setWidth(i3), "number" == typeof s3 && this.slider.setHeight(s3), this.slider.setLayerHinting(true), this.slider.setContain("strict"), this.domNode.domNode.appendChild(this.slider.domNode), this._register(o.addDisposableListener(this.slider.domNode, o.EventType.POINTER_DOWN, ((e4) => {
              0 === e4.button && (e4.preventDefault(), this._sliderPointerDown(e4));
            }))), this.onclick(this.slider.domNode, ((e4) => {
              e4.leftButton && e4.stopPropagation();
            }));
          }
          _onElementSize(e3) {
            return this._scrollbarState.setVisibleSize(e3) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
          }
          _onElementScrollSize(e3) {
            return this._scrollbarState.setScrollSize(e3) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
          }
          _onElementScrollPosition(e3) {
            return this._scrollbarState.setScrollPosition(e3) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
          }
          beginReveal() {
            this._visibilityController.setShouldBeVisible(true);
          }
          beginHide() {
            this._visibilityController.setShouldBeVisible(false);
          }
          render() {
            this._shouldRender && (this._shouldRender = false, this._renderDomNode(this._scrollbarState.getRectangleLargeSize(), this._scrollbarState.getRectangleSmallSize()), this._updateSlider(this._scrollbarState.getSliderSize(), this._scrollbarState.getArrowSize() + this._scrollbarState.getSliderPosition()));
          }
          _domNodePointerDown(e3) {
            e3.target === this.domNode.domNode && this._onPointerDown(e3);
          }
          delegatePointerDown(e3) {
            const t3 = this.domNode.domNode.getClientRects()[0].top, i3 = t3 + this._scrollbarState.getSliderPosition(), s3 = t3 + this._scrollbarState.getSliderPosition() + this._scrollbarState.getSliderSize(), r2 = this._sliderPointerPosition(e3);
            i3 <= r2 && r2 <= s3 ? 0 === e3.button && (e3.preventDefault(), this._sliderPointerDown(e3)) : this._onPointerDown(e3);
          }
          _onPointerDown(e3) {
            let t3, i3;
            if (e3.target === this.domNode.domNode && "number" == typeof e3.offsetX && "number" == typeof e3.offsetY) t3 = e3.offsetX, i3 = e3.offsetY;
            else {
              const s4 = o.getDomNodePagePosition(this.domNode.domNode);
              t3 = e3.pageX - s4.left, i3 = e3.pageY - s4.top;
            }
            const s3 = this._pointerDownRelativePosition(t3, i3);
            this._setDesiredScrollPositionNow(this._scrollByPage ? this._scrollbarState.getDesiredScrollPositionFromOffsetPaged(s3) : this._scrollbarState.getDesiredScrollPositionFromOffset(s3)), 0 === e3.button && (e3.preventDefault(), this._sliderPointerDown(e3));
          }
          _sliderPointerDown(e3) {
            if (!(e3.target && e3.target instanceof Element)) return;
            const t3 = this._sliderPointerPosition(e3), i3 = this._sliderOrthogonalPointerPosition(e3), s3 = this._scrollbarState.clone();
            this.slider.toggleClassName("active", true), this._pointerMoveMonitor.startMonitoring(e3.target, e3.pointerId, e3.buttons, ((e4) => {
              const r2 = this._sliderOrthogonalPointerPosition(e4), n2 = Math.abs(r2 - i3);
              if (u.isWindows && n2 > 140) return void this._setDesiredScrollPositionNow(s3.getScrollPosition());
              const o2 = this._sliderPointerPosition(e4) - t3;
              this._setDesiredScrollPositionNow(s3.getDesiredScrollPositionFromDelta(o2));
            }), (() => {
              this.slider.toggleClassName("active", false), this._host.onDragEnd();
            })), this._host.onDragStart();
          }
          _setDesiredScrollPositionNow(e3) {
            const t3 = {};
            this.writeScrollPosition(t3, e3), this._scrollable.setScrollPositionNow(t3);
          }
          updateScrollbarSize(e3) {
            this._updateScrollbarSize(e3), this._scrollbarState.setScrollbarSize(e3), this._shouldRender = true, this._lazyRender || this.render();
          }
          isNeeded() {
            return this._scrollbarState.isNeeded();
          }
        }
        t2.AbstractScrollbar = _;
      }, 151: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.HorizontalScrollbar = void 0;
        const s2 = i2(8801), r = i2(8245), n = i2(9881);
        class o extends s2.AbstractScrollbar {
          constructor(e3, t3, i3) {
            const s3 = e3.getScrollDimensions(), o2 = e3.getCurrentScrollPosition();
            if (super({ lazyRender: t3.lazyRender, host: i3, scrollbarState: new r.ScrollbarState(t3.horizontalHasArrows ? t3.arrowSize : 0, t3.horizontal === n.ScrollbarVisibility.Hidden ? 0 : t3.horizontalScrollbarSize, t3.vertical === n.ScrollbarVisibility.Hidden ? 0 : t3.verticalScrollbarSize, s3.width, s3.scrollWidth, o2.scrollLeft), visibility: t3.horizontal, extraScrollbarClassName: "horizontal", scrollable: e3, scrollByPage: t3.scrollByPage }), t3.horizontalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
            this._createSlider(Math.floor((t3.horizontalScrollbarSize - t3.horizontalSliderSize) / 2), 0, void 0, t3.horizontalSliderSize);
          }
          _updateSlider(e3, t3) {
            this.slider.setWidth(e3), this.slider.setLeft(t3);
          }
          _renderDomNode(e3, t3) {
            this.domNode.setWidth(e3), this.domNode.setHeight(t3), this.domNode.setLeft(0), this.domNode.setBottom(0);
          }
          onDidScroll(e3) {
            return this._shouldRender = this._onElementScrollSize(e3.scrollWidth) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(e3.scrollLeft) || this._shouldRender, this._shouldRender = this._onElementSize(e3.width) || this._shouldRender, this._shouldRender;
          }
          _pointerDownRelativePosition(e3, t3) {
            return e3;
          }
          _sliderPointerPosition(e3) {
            return e3.pageX;
          }
          _sliderOrthogonalPointerPosition(e3) {
            return e3.pageY;
          }
          _updateScrollbarSize(e3) {
            this.slider.setHeight(e3);
          }
          writeScrollPosition(e3, t3) {
            e3.scrollLeft = t3;
          }
          updateOptions(e3) {
            this.updateScrollbarSize(e3.horizontal === n.ScrollbarVisibility.Hidden ? 0 : e3.horizontalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(e3.vertical === n.ScrollbarVisibility.Hidden ? 0 : e3.verticalScrollbarSize), this._visibilityController.setVisibility(e3.horizontal), this._scrollByPage = e3.scrollByPage;
          }
        }
        t2.HorizontalScrollbar = o;
      }, 8234: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DomScrollableElement = t2.SmoothScrollableElement = t2.ScrollableElement = t2.AbstractScrollableElement = t2.MouseWheelClassifier = void 0;
        const o = i2(4333), a = n(i2(7093)), l = i2(9675), h = i2(5964), c = i2(151), d = i2(5473), u = i2(8286), _ = i2(1758), f = i2(802), p = i2(7150), g = n(i2(8163)), m = i2(9881);
        class v {
          constructor(e3, t3, i3) {
            this.timestamp = e3, this.deltaX = t3, this.deltaY = i3, this.score = 0;
          }
        }
        class S {
          static {
            this.INSTANCE = new S();
          }
          constructor() {
            this._capacity = 5, this._memory = [], this._front = -1, this._rear = -1;
          }
          isPhysicalMouseWheel() {
            if (-1 === this._front && -1 === this._rear) return false;
            let e3 = 1, t3 = 0, i3 = 1, s3 = this._rear;
            for (; ; ) {
              const r2 = s3 === this._front ? e3 : Math.pow(2, -i3);
              if (e3 -= r2, t3 += this._memory[s3].score * r2, s3 === this._front) break;
              s3 = (this._capacity + s3 - 1) % this._capacity, i3++;
            }
            return t3 <= 0.5;
          }
          acceptStandardWheelEvent(e3) {
            if (o.isChrome) {
              const t3 = a.getWindow(e3.browserEvent), i3 = (0, o.getZoomFactor)(t3);
              this.accept(Date.now(), e3.deltaX * i3, e3.deltaY * i3);
            } else this.accept(Date.now(), e3.deltaX, e3.deltaY);
          }
          accept(e3, t3, i3) {
            let s3 = null;
            const r2 = new v(e3, t3, i3);
            -1 === this._front && -1 === this._rear ? (this._memory[0] = r2, this._front = 0, this._rear = 0) : (s3 = this._memory[this._rear], this._rear = (this._rear + 1) % this._capacity, this._rear === this._front && (this._front = (this._front + 1) % this._capacity), this._memory[this._rear] = r2), r2.score = this._computeScore(r2, s3);
          }
          _computeScore(e3, t3) {
            if (Math.abs(e3.deltaX) > 0 && Math.abs(e3.deltaY) > 0) return 1;
            let i3 = 0.5;
            if (this._isAlmostInt(e3.deltaX) && this._isAlmostInt(e3.deltaY) || (i3 += 0.25), t3) {
              const s3 = Math.abs(e3.deltaX), r2 = Math.abs(e3.deltaY), n2 = Math.abs(t3.deltaX), o2 = Math.abs(t3.deltaY), a2 = Math.max(Math.min(s3, n2), 1), l2 = Math.max(Math.min(r2, o2), 1), h2 = Math.max(s3, n2), c2 = Math.max(r2, o2);
              h2 % a2 == 0 && c2 % l2 == 0 && (i3 -= 0.5);
            }
            return Math.min(Math.max(i3, 0), 1);
          }
          _isAlmostInt(e3) {
            return Math.abs(Math.round(e3) - e3) < 0.01;
          }
        }
        t2.MouseWheelClassifier = S;
        class b extends u.Widget {
          get options() {
            return this._options;
          }
          constructor(e3, t3, i3) {
            super(), this._onScroll = this._register(new f.Emitter()), this.onScroll = this._onScroll.event, this._onWillScroll = this._register(new f.Emitter()), this.onWillScroll = this._onWillScroll.event, this._options = (function(e4) {
              const t4 = { lazyRender: void 0 !== e4.lazyRender && e4.lazyRender, className: void 0 !== e4.className ? e4.className : "", useShadows: void 0 === e4.useShadows || e4.useShadows, handleMouseWheel: void 0 === e4.handleMouseWheel || e4.handleMouseWheel, flipAxes: void 0 !== e4.flipAxes && e4.flipAxes, consumeMouseWheelIfScrollbarIsNeeded: void 0 !== e4.consumeMouseWheelIfScrollbarIsNeeded && e4.consumeMouseWheelIfScrollbarIsNeeded, alwaysConsumeMouseWheel: void 0 !== e4.alwaysConsumeMouseWheel && e4.alwaysConsumeMouseWheel, scrollYToX: void 0 !== e4.scrollYToX && e4.scrollYToX, mouseWheelScrollSensitivity: void 0 !== e4.mouseWheelScrollSensitivity ? e4.mouseWheelScrollSensitivity : 1, fastScrollSensitivity: void 0 !== e4.fastScrollSensitivity ? e4.fastScrollSensitivity : 5, scrollPredominantAxis: void 0 === e4.scrollPredominantAxis || e4.scrollPredominantAxis, mouseWheelSmoothScroll: void 0 === e4.mouseWheelSmoothScroll || e4.mouseWheelSmoothScroll, arrowSize: void 0 !== e4.arrowSize ? e4.arrowSize : 11, listenOnDomNode: void 0 !== e4.listenOnDomNode ? e4.listenOnDomNode : null, horizontal: void 0 !== e4.horizontal ? e4.horizontal : m.ScrollbarVisibility.Auto, horizontalScrollbarSize: void 0 !== e4.horizontalScrollbarSize ? e4.horizontalScrollbarSize : 10, horizontalSliderSize: void 0 !== e4.horizontalSliderSize ? e4.horizontalSliderSize : 0, horizontalHasArrows: void 0 !== e4.horizontalHasArrows && e4.horizontalHasArrows, vertical: void 0 !== e4.vertical ? e4.vertical : m.ScrollbarVisibility.Auto, verticalScrollbarSize: void 0 !== e4.verticalScrollbarSize ? e4.verticalScrollbarSize : 10, verticalHasArrows: void 0 !== e4.verticalHasArrows && e4.verticalHasArrows, verticalSliderSize: void 0 !== e4.verticalSliderSize ? e4.verticalSliderSize : 0, scrollByPage: void 0 !== e4.scrollByPage && e4.scrollByPage };
              return t4.horizontalSliderSize = void 0 !== e4.horizontalSliderSize ? e4.horizontalSliderSize : t4.horizontalScrollbarSize, t4.verticalSliderSize = void 0 !== e4.verticalSliderSize ? e4.verticalSliderSize : t4.verticalScrollbarSize, g.isMacintosh && (t4.className += " mac"), t4;
            })(t3), this._scrollable = i3, this._register(this._scrollable.onScroll(((e4) => {
              this._onWillScroll.fire(e4), this._onDidScroll(e4), this._onScroll.fire(e4);
            })));
            const s3 = { onMouseWheel: (e4) => this._onMouseWheel(e4), onDragStart: () => this._onDragStart(), onDragEnd: () => this._onDragEnd() };
            this._verticalScrollbar = this._register(new d.VerticalScrollbar(this._scrollable, this._options, s3)), this._horizontalScrollbar = this._register(new c.HorizontalScrollbar(this._scrollable, this._options, s3)), this._domNode = document.createElement("div"), this._domNode.className = "xterm-scrollable-element " + this._options.className, this._domNode.setAttribute("role", "presentation"), this._domNode.style.position = "relative", this._domNode.appendChild(e3), this._domNode.appendChild(this._horizontalScrollbar.domNode.domNode), this._domNode.appendChild(this._verticalScrollbar.domNode.domNode), this._options.useShadows ? (this._leftShadowDomNode = (0, l.createFastDomNode)(document.createElement("div")), this._leftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._leftShadowDomNode.domNode), this._topShadowDomNode = (0, l.createFastDomNode)(document.createElement("div")), this._topShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topShadowDomNode.domNode), this._topLeftShadowDomNode = (0, l.createFastDomNode)(document.createElement("div")), this._topLeftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topLeftShadowDomNode.domNode)) : (this._leftShadowDomNode = null, this._topShadowDomNode = null, this._topLeftShadowDomNode = null), this._listenOnDomNode = this._options.listenOnDomNode || this._domNode, this._mouseWheelToDispose = [], this._setListeningToMouseWheel(this._options.handleMouseWheel), this.onmouseover(this._listenOnDomNode, ((e4) => this._onMouseOver(e4))), this.onmouseleave(this._listenOnDomNode, ((e4) => this._onMouseLeave(e4))), this._hideTimeout = this._register(new _.TimeoutTimer()), this._isDragging = false, this._mouseIsOver = false, this._shouldRender = true, this._revealOnScroll = true;
          }
          dispose() {
            this._mouseWheelToDispose = (0, p.dispose)(this._mouseWheelToDispose), super.dispose();
          }
          getDomNode() {
            return this._domNode;
          }
          getOverviewRulerLayoutInfo() {
            return { parent: this._domNode, insertBefore: this._verticalScrollbar.domNode.domNode };
          }
          delegateVerticalScrollbarPointerDown(e3) {
            this._verticalScrollbar.delegatePointerDown(e3);
          }
          getScrollDimensions() {
            return this._scrollable.getScrollDimensions();
          }
          setScrollDimensions(e3) {
            this._scrollable.setScrollDimensions(e3, false);
          }
          updateClassName(e3) {
            this._options.className = e3, g.isMacintosh && (this._options.className += " mac"), this._domNode.className = "xterm-scrollable-element " + this._options.className;
          }
          updateOptions(e3) {
            void 0 !== e3.handleMouseWheel && (this._options.handleMouseWheel = e3.handleMouseWheel, this._setListeningToMouseWheel(this._options.handleMouseWheel)), void 0 !== e3.mouseWheelScrollSensitivity && (this._options.mouseWheelScrollSensitivity = e3.mouseWheelScrollSensitivity), void 0 !== e3.fastScrollSensitivity && (this._options.fastScrollSensitivity = e3.fastScrollSensitivity), void 0 !== e3.scrollPredominantAxis && (this._options.scrollPredominantAxis = e3.scrollPredominantAxis), void 0 !== e3.horizontal && (this._options.horizontal = e3.horizontal), void 0 !== e3.vertical && (this._options.vertical = e3.vertical), void 0 !== e3.horizontalScrollbarSize && (this._options.horizontalScrollbarSize = e3.horizontalScrollbarSize), void 0 !== e3.verticalScrollbarSize && (this._options.verticalScrollbarSize = e3.verticalScrollbarSize), void 0 !== e3.scrollByPage && (this._options.scrollByPage = e3.scrollByPage), this._horizontalScrollbar.updateOptions(this._options), this._verticalScrollbar.updateOptions(this._options), this._options.lazyRender || this._render();
          }
          setRevealOnScroll(e3) {
            this._revealOnScroll = e3;
          }
          delegateScrollFromMouseWheelEvent(e3) {
            this._onMouseWheel(new h.StandardWheelEvent(e3));
          }
          _setListeningToMouseWheel(e3) {
            if (this._mouseWheelToDispose.length > 0 !== e3 && (this._mouseWheelToDispose = (0, p.dispose)(this._mouseWheelToDispose), e3)) {
              const e4 = (e5) => {
                this._onMouseWheel(new h.StandardWheelEvent(e5));
              };
              this._mouseWheelToDispose.push(a.addDisposableListener(this._listenOnDomNode, a.EventType.MOUSE_WHEEL, e4, { passive: false }));
            }
          }
          _onMouseWheel(e3) {
            if (e3.browserEvent?.defaultPrevented) return;
            const t3 = S.INSTANCE;
            t3.acceptStandardWheelEvent(e3);
            let i3 = false;
            if (e3.deltaY || e3.deltaX) {
              let s4 = e3.deltaY * this._options.mouseWheelScrollSensitivity, r2 = e3.deltaX * this._options.mouseWheelScrollSensitivity;
              this._options.scrollPredominantAxis && (this._options.scrollYToX && r2 + s4 === 0 ? r2 = s4 = 0 : Math.abs(s4) >= Math.abs(r2) ? r2 = 0 : s4 = 0), this._options.flipAxes && ([s4, r2] = [r2, s4]);
              const n2 = !g.isMacintosh && e3.browserEvent && e3.browserEvent.shiftKey;
              !this._options.scrollYToX && !n2 || r2 || (r2 = s4, s4 = 0), e3.browserEvent && e3.browserEvent.altKey && (r2 *= this._options.fastScrollSensitivity, s4 *= this._options.fastScrollSensitivity);
              const o2 = this._scrollable.getFutureScrollPosition();
              let a2 = {};
              if (s4) {
                const e4 = 50 * s4, t4 = o2.scrollTop - (e4 < 0 ? Math.floor(e4) : Math.ceil(e4));
                this._verticalScrollbar.writeScrollPosition(a2, t4);
              }
              if (r2) {
                const e4 = 50 * r2, t4 = o2.scrollLeft - (e4 < 0 ? Math.floor(e4) : Math.ceil(e4));
                this._horizontalScrollbar.writeScrollPosition(a2, t4);
              }
              a2 = this._scrollable.validateScrollPosition(a2), (o2.scrollLeft !== a2.scrollLeft || o2.scrollTop !== a2.scrollTop) && (this._options.mouseWheelSmoothScroll && t3.isPhysicalMouseWheel() ? this._scrollable.setScrollPositionSmooth(a2) : this._scrollable.setScrollPositionNow(a2), i3 = true);
            }
            let s3 = i3;
            !s3 && this._options.alwaysConsumeMouseWheel && (s3 = true), !s3 && this._options.consumeMouseWheelIfScrollbarIsNeeded && (this._verticalScrollbar.isNeeded() || this._horizontalScrollbar.isNeeded()) && (s3 = true), s3 && (e3.preventDefault(), e3.stopPropagation());
          }
          _onDidScroll(e3) {
            this._shouldRender = this._horizontalScrollbar.onDidScroll(e3) || this._shouldRender, this._shouldRender = this._verticalScrollbar.onDidScroll(e3) || this._shouldRender, this._options.useShadows && (this._shouldRender = true), this._revealOnScroll && this._reveal(), this._options.lazyRender || this._render();
          }
          renderNow() {
            if (!this._options.lazyRender) throw new Error("Please use `lazyRender` together with `renderNow`!");
            this._render();
          }
          _render() {
            if (this._shouldRender && (this._shouldRender = false, this._horizontalScrollbar.render(), this._verticalScrollbar.render(), this._options.useShadows)) {
              const e3 = this._scrollable.getCurrentScrollPosition(), t3 = e3.scrollTop > 0, i3 = e3.scrollLeft > 0, s3 = i3 ? " left" : "", r2 = t3 ? " top" : "", n2 = i3 || t3 ? " top-left-corner" : "";
              this._leftShadowDomNode.setClassName(`shadow${s3}`), this._topShadowDomNode.setClassName(`shadow${r2}`), this._topLeftShadowDomNode.setClassName(`shadow${n2}${r2}${s3}`);
            }
          }
          _onDragStart() {
            this._isDragging = true, this._reveal();
          }
          _onDragEnd() {
            this._isDragging = false, this._hide();
          }
          _onMouseLeave(e3) {
            this._mouseIsOver = false, this._hide();
          }
          _onMouseOver(e3) {
            this._mouseIsOver = true, this._reveal();
          }
          _reveal() {
            this._verticalScrollbar.beginReveal(), this._horizontalScrollbar.beginReveal(), this._scheduleHide();
          }
          _hide() {
            this._mouseIsOver || this._isDragging || (this._verticalScrollbar.beginHide(), this._horizontalScrollbar.beginHide());
          }
          _scheduleHide() {
            this._mouseIsOver || this._isDragging || this._hideTimeout.cancelAndSet((() => this._hide()), 500);
          }
        }
        t2.AbstractScrollableElement = b, t2.ScrollableElement = class extends b {
          constructor(e3, t3) {
            (t3 = t3 || {}).mouseWheelSmoothScroll = false;
            const i3 = new m.Scrollable({ forceIntegerValues: true, smoothScrollDuration: 0, scheduleAtNextAnimationFrame: (t4) => a.scheduleAtNextAnimationFrame(a.getWindow(e3), t4) });
            super(e3, t3, i3), this._register(i3);
          }
          setScrollPosition(e3) {
            this._scrollable.setScrollPositionNow(e3);
          }
          getScrollPosition() {
            return this._scrollable.getCurrentScrollPosition();
          }
        }, t2.SmoothScrollableElement = class extends b {
          constructor(e3, t3, i3) {
            super(e3, t3, i3);
          }
          setScrollPosition(e3) {
            e3.reuseAnimation ? this._scrollable.setScrollPositionSmooth(e3, e3.reuseAnimation) : this._scrollable.setScrollPositionNow(e3);
          }
          getScrollPosition() {
            return this._scrollable.getCurrentScrollPosition();
          }
        }, t2.DomScrollableElement = class extends b {
          constructor(e3, t3) {
            (t3 = t3 || {}).mouseWheelSmoothScroll = false;
            const i3 = new m.Scrollable({ forceIntegerValues: false, smoothScrollDuration: 0, scheduleAtNextAnimationFrame: (t4) => a.scheduleAtNextAnimationFrame(a.getWindow(e3), t4) });
            super(e3, t3, i3), this._register(i3), this._element = e3, this._register(this.onScroll(((e4) => {
              e4.scrollTopChanged && (this._element.scrollTop = e4.scrollTop), e4.scrollLeftChanged && (this._element.scrollLeft = e4.scrollLeft);
            }))), this.scanDomNode();
          }
          setScrollPosition(e3) {
            this._scrollable.setScrollPositionNow(e3);
          }
          getScrollPosition() {
            return this._scrollable.getCurrentScrollPosition();
          }
          scanDomNode() {
            this.setScrollDimensions({ width: this._element.clientWidth, scrollWidth: this._element.scrollWidth, height: this._element.clientHeight, scrollHeight: this._element.scrollHeight }), this.setScrollPosition({ scrollLeft: this._element.scrollLeft, scrollTop: this._element.scrollTop });
          }
        };
      }, 8974: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ScrollbarArrow = t2.ARROW_IMG_SIZE = void 0;
        const o = i2(8328), a = i2(8286), l = i2(1758), h = n(i2(7093));
        t2.ARROW_IMG_SIZE = 11;
        class c extends a.Widget {
          constructor(e3) {
            super(), this._onActivate = e3.onActivate, this.bgDomNode = document.createElement("div"), this.bgDomNode.className = "arrow-background", this.bgDomNode.style.position = "absolute", this.bgDomNode.style.width = e3.bgWidth + "px", this.bgDomNode.style.height = e3.bgHeight + "px", void 0 !== e3.top && (this.bgDomNode.style.top = "0px"), void 0 !== e3.left && (this.bgDomNode.style.left = "0px"), void 0 !== e3.bottom && (this.bgDomNode.style.bottom = "0px"), void 0 !== e3.right && (this.bgDomNode.style.right = "0px"), this.domNode = document.createElement("div"), this.domNode.className = e3.className, this.domNode.style.position = "absolute", this.domNode.style.width = t2.ARROW_IMG_SIZE + "px", this.domNode.style.height = t2.ARROW_IMG_SIZE + "px", void 0 !== e3.top && (this.domNode.style.top = e3.top + "px"), void 0 !== e3.left && (this.domNode.style.left = e3.left + "px"), void 0 !== e3.bottom && (this.domNode.style.bottom = e3.bottom + "px"), void 0 !== e3.right && (this.domNode.style.right = e3.right + "px"), this._pointerMoveMonitor = this._register(new o.GlobalPointerMoveMonitor()), this._register(h.addStandardDisposableListener(this.bgDomNode, h.EventType.POINTER_DOWN, ((e4) => this._arrowPointerDown(e4)))), this._register(h.addStandardDisposableListener(this.domNode, h.EventType.POINTER_DOWN, ((e4) => this._arrowPointerDown(e4)))), this._pointerdownRepeatTimer = this._register(new h.WindowIntervalTimer()), this._pointerdownScheduleRepeatTimer = this._register(new l.TimeoutTimer());
          }
          _arrowPointerDown(e3) {
            e3.target && e3.target instanceof Element && (this._onActivate(), this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancelAndSet((() => {
              this._pointerdownRepeatTimer.cancelAndSet((() => this._onActivate()), 1e3 / 24, h.getWindow(e3));
            }), 200), this._pointerMoveMonitor.startMonitoring(e3.target, e3.pointerId, e3.buttons, ((e4) => {
            }), (() => {
              this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancel();
            })), e3.preventDefault());
          }
        }
        t2.ScrollbarArrow = c;
      }, 8245: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ScrollbarState = void 0;
        class i2 {
          constructor(e3, t3, i3, s2, r, n) {
            this._scrollbarSize = Math.round(t3), this._oppositeScrollbarSize = Math.round(i3), this._arrowSize = Math.round(e3), this._visibleSize = s2, this._scrollSize = r, this._scrollPosition = n, this._computedAvailableSize = 0, this._computedIsNeeded = false, this._computedSliderSize = 0, this._computedSliderRatio = 0, this._computedSliderPosition = 0, this._refreshComputedValues();
          }
          clone() {
            return new i2(this._arrowSize, this._scrollbarSize, this._oppositeScrollbarSize, this._visibleSize, this._scrollSize, this._scrollPosition);
          }
          setVisibleSize(e3) {
            const t3 = Math.round(e3);
            return this._visibleSize !== t3 && (this._visibleSize = t3, this._refreshComputedValues(), true);
          }
          setScrollSize(e3) {
            const t3 = Math.round(e3);
            return this._scrollSize !== t3 && (this._scrollSize = t3, this._refreshComputedValues(), true);
          }
          setScrollPosition(e3) {
            const t3 = Math.round(e3);
            return this._scrollPosition !== t3 && (this._scrollPosition = t3, this._refreshComputedValues(), true);
          }
          setScrollbarSize(e3) {
            this._scrollbarSize = Math.round(e3);
          }
          setOppositeScrollbarSize(e3) {
            this._oppositeScrollbarSize = Math.round(e3);
          }
          static _computeValues(e3, t3, i3, s2, r) {
            const n = Math.max(0, i3 - e3), o = Math.max(0, n - 2 * t3), a = s2 > 0 && s2 > i3;
            if (!a) return { computedAvailableSize: Math.round(n), computedIsNeeded: a, computedSliderSize: Math.round(o), computedSliderRatio: 0, computedSliderPosition: 0 };
            const l = Math.round(Math.max(20, Math.floor(i3 * o / s2))), h = (o - l) / (s2 - i3), c = r * h;
            return { computedAvailableSize: Math.round(n), computedIsNeeded: a, computedSliderSize: Math.round(l), computedSliderRatio: h, computedSliderPosition: Math.round(c) };
          }
          _refreshComputedValues() {
            const e3 = i2._computeValues(this._oppositeScrollbarSize, this._arrowSize, this._visibleSize, this._scrollSize, this._scrollPosition);
            this._computedAvailableSize = e3.computedAvailableSize, this._computedIsNeeded = e3.computedIsNeeded, this._computedSliderSize = e3.computedSliderSize, this._computedSliderRatio = e3.computedSliderRatio, this._computedSliderPosition = e3.computedSliderPosition;
          }
          getArrowSize() {
            return this._arrowSize;
          }
          getScrollPosition() {
            return this._scrollPosition;
          }
          getRectangleLargeSize() {
            return this._computedAvailableSize;
          }
          getRectangleSmallSize() {
            return this._scrollbarSize;
          }
          isNeeded() {
            return this._computedIsNeeded;
          }
          getSliderSize() {
            return this._computedSliderSize;
          }
          getSliderPosition() {
            return this._computedSliderPosition;
          }
          getDesiredScrollPositionFromOffset(e3) {
            if (!this._computedIsNeeded) return 0;
            const t3 = e3 - this._arrowSize - this._computedSliderSize / 2;
            return Math.round(t3 / this._computedSliderRatio);
          }
          getDesiredScrollPositionFromOffsetPaged(e3) {
            if (!this._computedIsNeeded) return 0;
            const t3 = e3 - this._arrowSize;
            let i3 = this._scrollPosition;
            return t3 < this._computedSliderPosition ? i3 -= this._visibleSize : i3 += this._visibleSize, i3;
          }
          getDesiredScrollPositionFromDelta(e3) {
            if (!this._computedIsNeeded) return 0;
            const t3 = this._computedSliderPosition + e3;
            return Math.round(t3 / this._computedSliderRatio);
          }
        }
        t2.ScrollbarState = i2;
      }, 79: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ScrollbarVisibilityController = void 0;
        const s2 = i2(1758), r = i2(7150), n = i2(9881);
        class o extends r.Disposable {
          constructor(e3, t3, i3) {
            super(), this._visibility = e3, this._visibleClassName = t3, this._invisibleClassName = i3, this._domNode = null, this._isVisible = false, this._isNeeded = false, this._rawShouldBeVisible = false, this._shouldBeVisible = false, this._revealTimer = this._register(new s2.TimeoutTimer());
          }
          setVisibility(e3) {
            this._visibility !== e3 && (this._visibility = e3, this._updateShouldBeVisible());
          }
          setShouldBeVisible(e3) {
            this._rawShouldBeVisible = e3, this._updateShouldBeVisible();
          }
          _applyVisibilitySetting() {
            return this._visibility !== n.ScrollbarVisibility.Hidden && (this._visibility === n.ScrollbarVisibility.Visible || this._rawShouldBeVisible);
          }
          _updateShouldBeVisible() {
            const e3 = this._applyVisibilitySetting();
            this._shouldBeVisible !== e3 && (this._shouldBeVisible = e3, this.ensureVisibility());
          }
          setIsNeeded(e3) {
            this._isNeeded !== e3 && (this._isNeeded = e3, this.ensureVisibility());
          }
          setDomNode(e3) {
            this._domNode = e3, this._domNode.setClassName(this._invisibleClassName), this.setShouldBeVisible(false);
          }
          ensureVisibility() {
            this._isNeeded ? this._shouldBeVisible ? this._reveal() : this._hide(true) : this._hide(false);
          }
          _reveal() {
            this._isVisible || (this._isVisible = true, this._revealTimer.setIfNotSet((() => {
              this._domNode?.setClassName(this._visibleClassName);
            }), 0));
          }
          _hide(e3) {
            this._revealTimer.cancel(), this._isVisible && (this._isVisible = false, this._domNode?.setClassName(this._invisibleClassName + (e3 ? " fade" : "")));
          }
        }
        t2.ScrollbarVisibilityController = o;
      }, 5473: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.VerticalScrollbar = void 0;
        const s2 = i2(8801), r = i2(8245), n = i2(9881);
        class o extends s2.AbstractScrollbar {
          constructor(e3, t3, i3) {
            const s3 = e3.getScrollDimensions(), o2 = e3.getCurrentScrollPosition();
            if (super({ lazyRender: t3.lazyRender, host: i3, scrollbarState: new r.ScrollbarState(t3.verticalHasArrows ? t3.arrowSize : 0, t3.vertical === n.ScrollbarVisibility.Hidden ? 0 : t3.verticalScrollbarSize, 0, s3.height, s3.scrollHeight, o2.scrollTop), visibility: t3.vertical, extraScrollbarClassName: "vertical", scrollable: e3, scrollByPage: t3.scrollByPage }), t3.verticalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
            this._createSlider(0, Math.floor((t3.verticalScrollbarSize - t3.verticalSliderSize) / 2), t3.verticalSliderSize, void 0);
          }
          _updateSlider(e3, t3) {
            this.slider.setHeight(e3), this.slider.setTop(t3);
          }
          _renderDomNode(e3, t3) {
            this.domNode.setWidth(t3), this.domNode.setHeight(e3), this.domNode.setRight(0), this.domNode.setTop(0);
          }
          onDidScroll(e3) {
            return this._shouldRender = this._onElementScrollSize(e3.scrollHeight) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(e3.scrollTop) || this._shouldRender, this._shouldRender = this._onElementSize(e3.height) || this._shouldRender, this._shouldRender;
          }
          _pointerDownRelativePosition(e3, t3) {
            return t3;
          }
          _sliderPointerPosition(e3) {
            return e3.pageY;
          }
          _sliderOrthogonalPointerPosition(e3) {
            return e3.pageX;
          }
          _updateScrollbarSize(e3) {
            this.slider.setWidth(e3);
          }
          writeScrollPosition(e3, t3) {
            e3.scrollTop = t3;
          }
          updateOptions(e3) {
            this.updateScrollbarSize(e3.vertical === n.ScrollbarVisibility.Hidden ? 0 : e3.verticalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(0), this._visibilityController.setVisibility(e3.vertical), this._scrollByPage = e3.scrollByPage;
          }
        }
        t2.VerticalScrollbar = o;
      }, 8286: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Widget = void 0;
        const o = n(i2(7093)), a = i2(5394), l = i2(5964), h = i2(8594), c = i2(7150);
        class d extends c.Disposable {
          onclick(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.CLICK, ((i3) => t3(new l.StandardMouseEvent(o.getWindow(e3), i3)))));
          }
          onmousedown(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.MOUSE_DOWN, ((i3) => t3(new l.StandardMouseEvent(o.getWindow(e3), i3)))));
          }
          onmouseover(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.MOUSE_OVER, ((i3) => t3(new l.StandardMouseEvent(o.getWindow(e3), i3)))));
          }
          onmouseleave(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.MOUSE_LEAVE, ((i3) => t3(new l.StandardMouseEvent(o.getWindow(e3), i3)))));
          }
          onkeydown(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.KEY_DOWN, ((e4) => t3(new a.StandardKeyboardEvent(e4)))));
          }
          onkeyup(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.KEY_UP, ((e4) => t3(new a.StandardKeyboardEvent(e4)))));
          }
          oninput(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.INPUT, t3));
          }
          onblur(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.BLUR, t3));
          }
          onfocus(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.FOCUS, t3));
          }
          onchange(e3, t3) {
            this._register(o.addDisposableListener(e3, o.EventType.CHANGE, t3));
          }
          ignoreGesture(e3) {
            return h.Gesture.ignoreTarget(e3);
          }
        }
        t2.Widget = d;
      }, 4693: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.mainWindow = void 0, t2.ensureCodeWindow = function(e3, t3) {
        }, t2.mainWindow = "object" == typeof window ? window : globalThis;
      }, 3058: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Permutation = t2.CallbackIterable = t2.ArrayQueue = t2.booleanComparator = t2.numberComparator = t2.CompareResult = void 0, t2.tail = function(e3, t3 = 0) {
          return e3[e3.length - (1 + t3)];
        }, t2.tail2 = function(e3) {
          if (0 === e3.length) throw new Error("Invalid tail call");
          return [e3.slice(0, e3.length - 1), e3[e3.length - 1]];
        }, t2.equals = function(e3, t3, i3 = (e4, t4) => e4 === t4) {
          if (e3 === t3) return true;
          if (!e3 || !t3) return false;
          if (e3.length !== t3.length) return false;
          for (let s3 = 0, r2 = e3.length; s3 < r2; s3++) if (!i3(e3[s3], t3[s3])) return false;
          return true;
        }, t2.removeFastWithoutKeepingOrder = function(e3, t3) {
          const i3 = e3.length - 1;
          t3 < i3 && (e3[t3] = e3[i3]), e3.pop();
        }, t2.binarySearch = function(e3, t3, i3) {
          return n(e3.length, ((s3) => i3(e3[s3], t3)));
        }, t2.binarySearch2 = n, t2.quickSelect = function e3(t3, i3, s3) {
          if ((t3 |= 0) >= i3.length) throw new TypeError("invalid index");
          const r2 = i3[Math.floor(i3.length * Math.random())], n2 = [], o2 = [], a2 = [];
          for (const e4 of i3) {
            const t4 = s3(e4, r2);
            t4 < 0 ? n2.push(e4) : t4 > 0 ? o2.push(e4) : a2.push(e4);
          }
          return t3 < n2.length ? e3(t3, n2, s3) : t3 < n2.length + a2.length ? a2[0] : e3(t3 - (n2.length + a2.length), o2, s3);
        }, t2.groupBy = function(e3, t3) {
          const i3 = [];
          let s3;
          for (const r2 of e3.slice(0).sort(t3)) s3 && 0 === t3(s3[0], r2) ? s3.push(r2) : (s3 = [r2], i3.push(s3));
          return i3;
        }, t2.groupAdjacentBy = function* (e3, t3) {
          let i3, s3;
          for (const r2 of e3) void 0 !== s3 && t3(s3, r2) ? i3.push(r2) : (i3 && (yield i3), i3 = [r2]), s3 = r2;
          i3 && (yield i3);
        }, t2.forEachAdjacent = function(e3, t3) {
          for (let i3 = 0; i3 <= e3.length; i3++) t3(0 === i3 ? void 0 : e3[i3 - 1], i3 === e3.length ? void 0 : e3[i3]);
        }, t2.forEachWithNeighbors = function(e3, t3) {
          for (let i3 = 0; i3 < e3.length; i3++) t3(0 === i3 ? void 0 : e3[i3 - 1], e3[i3], i3 + 1 === e3.length ? void 0 : e3[i3 + 1]);
        }, t2.sortedDiff = o, t2.delta = function(e3, t3, i3) {
          const s3 = o(e3, t3, i3), r2 = [], n2 = [];
          for (const t4 of s3) r2.push(...e3.slice(t4.start, t4.start + t4.deleteCount)), n2.push(...t4.toInsert);
          return { removed: r2, added: n2 };
        }, t2.top = function(e3, t3, i3) {
          if (0 === i3) return [];
          const s3 = e3.slice(0, i3).sort(t3);
          return a(e3, t3, s3, i3, e3.length), s3;
        }, t2.topAsync = function(e3, t3, i3, r2, n2) {
          return 0 === i3 ? Promise.resolve([]) : new Promise(((o2, l2) => {
            (async () => {
              const o3 = e3.length, l3 = e3.slice(0, i3).sort(t3);
              for (let h2 = i3, c2 = Math.min(i3 + r2, o3); h2 < o3; h2 = c2, c2 = Math.min(c2 + r2, o3)) {
                if (h2 > i3 && await new Promise(((e4) => setTimeout(e4))), n2 && n2.isCancellationRequested) throw new s2.CancellationError();
                a(e3, t3, l3, h2, c2);
              }
              return l3;
            })().then(o2, l2);
          }));
        }, t2.coalesce = function(e3) {
          return e3.filter(((e4) => !!e4));
        }, t2.coalesceInPlace = function(e3) {
          let t3 = 0;
          for (let i3 = 0; i3 < e3.length; i3++) e3[i3] && (e3[t3] = e3[i3], t3 += 1);
          e3.length = t3;
        }, t2.move = function(e3, t3, i3) {
          e3.splice(i3, 0, e3.splice(t3, 1)[0]);
        }, t2.isFalsyOrEmpty = function(e3) {
          return !Array.isArray(e3) || 0 === e3.length;
        }, t2.isNonEmptyArray = function(e3) {
          return Array.isArray(e3) && e3.length > 0;
        }, t2.distinct = function(e3, t3 = (e4) => e4) {
          const i3 = /* @__PURE__ */ new Set();
          return e3.filter(((e4) => {
            const s3 = t3(e4);
            return !i3.has(s3) && (i3.add(s3), true);
          }));
        }, t2.uniqueFilter = function(e3) {
          const t3 = /* @__PURE__ */ new Set();
          return (i3) => {
            const s3 = e3(i3);
            return !t3.has(s3) && (t3.add(s3), true);
          };
        }, t2.firstOrDefault = function(e3, t3) {
          return e3.length > 0 ? e3[0] : t3;
        }, t2.lastOrDefault = function(e3, t3) {
          return e3.length > 0 ? e3[e3.length - 1] : t3;
        }, t2.commonPrefixLength = function(e3, t3, i3 = (e4, t4) => e4 === t4) {
          let s3 = 0;
          for (let r2 = 0, n2 = Math.min(e3.length, t3.length); r2 < n2 && i3(e3[r2], t3[r2]); r2++) s3++;
          return s3;
        }, t2.range = function(e3, t3) {
          let i3 = "number" == typeof t3 ? e3 : 0;
          "number" == typeof t3 ? i3 = e3 : (i3 = 0, t3 = e3);
          const s3 = [];
          if (i3 <= t3) for (let e4 = i3; e4 < t3; e4++) s3.push(e4);
          else for (let e4 = i3; e4 > t3; e4--) s3.push(e4);
          return s3;
        }, t2.index = function(e3, t3, i3) {
          return e3.reduce(((e4, s3) => (e4[t3(s3)] = i3 ? i3(s3) : s3, e4)), /* @__PURE__ */ Object.create(null));
        }, t2.insert = function(e3, t3) {
          return e3.push(t3), () => l(e3, t3);
        }, t2.remove = l, t2.arrayInsert = function(e3, t3, i3) {
          const s3 = e3.slice(0, t3), r2 = e3.slice(t3);
          return s3.concat(i3, r2);
        }, t2.shuffle = function(e3, t3) {
          let i3;
          if ("number" == typeof t3) {
            let e4 = t3;
            i3 = () => {
              const t4 = 179426549 * Math.sin(e4++);
              return t4 - Math.floor(t4);
            };
          } else i3 = Math.random;
          for (let t4 = e3.length - 1; t4 > 0; t4 -= 1) {
            const s3 = Math.floor(i3() * (t4 + 1)), r2 = e3[t4];
            e3[t4] = e3[s3], e3[s3] = r2;
          }
        }, t2.pushToStart = function(e3, t3) {
          const i3 = e3.indexOf(t3);
          i3 > -1 && (e3.splice(i3, 1), e3.unshift(t3));
        }, t2.pushToEnd = function(e3, t3) {
          const i3 = e3.indexOf(t3);
          i3 > -1 && (e3.splice(i3, 1), e3.push(t3));
        }, t2.pushMany = function(e3, t3) {
          for (const i3 of t3) e3.push(i3);
        }, t2.mapArrayOrNot = function(e3, t3) {
          return Array.isArray(e3) ? e3.map(t3) : t3(e3);
        }, t2.asArray = function(e3) {
          return Array.isArray(e3) ? e3 : [e3];
        }, t2.getRandomElement = function(e3) {
          return e3[Math.floor(Math.random() * e3.length)];
        }, t2.insertInto = h, t2.splice = function(e3, t3, i3, s3) {
          const r2 = c(e3, t3);
          let n2 = e3.splice(r2, i3);
          return void 0 === n2 && (n2 = []), h(e3, r2, s3), n2;
        }, t2.compareBy = function(e3, t3) {
          return (i3, s3) => t3(e3(i3), e3(s3));
        }, t2.tieBreakComparators = function(...e3) {
          return (t3, i3) => {
            for (const s3 of e3) {
              const e4 = s3(t3, i3);
              if (!d.isNeitherLessOrGreaterThan(e4)) return e4;
            }
            return d.neitherLessOrGreaterThan;
          };
        }, t2.reverseOrder = function(e3) {
          return (t3, i3) => -e3(t3, i3);
        };
        const s2 = i2(9807), r = i2(8297);
        function n(e3, t3) {
          let i3 = 0, s3 = e3 - 1;
          for (; i3 <= s3; ) {
            const e4 = (i3 + s3) / 2 | 0, r2 = t3(e4);
            if (r2 < 0) i3 = e4 + 1;
            else {
              if (!(r2 > 0)) return e4;
              s3 = e4 - 1;
            }
          }
          return -(i3 + 1);
        }
        function o(e3, t3, i3) {
          const s3 = [];
          function r2(e4, t4, i4) {
            if (0 === t4 && 0 === i4.length) return;
            const r3 = s3[s3.length - 1];
            r3 && r3.start + r3.deleteCount === e4 ? (r3.deleteCount += t4, r3.toInsert.push(...i4)) : s3.push({ start: e4, deleteCount: t4, toInsert: i4 });
          }
          let n2 = 0, o2 = 0;
          for (; ; ) {
            if (n2 === e3.length) {
              r2(n2, 0, t3.slice(o2));
              break;
            }
            if (o2 === t3.length) {
              r2(n2, e3.length - n2, []);
              break;
            }
            const s4 = e3[n2], a2 = t3[o2], l2 = i3(s4, a2);
            0 === l2 ? (n2 += 1, o2 += 1) : l2 < 0 ? (r2(n2, 1, []), n2 += 1) : l2 > 0 && (r2(n2, 0, [a2]), o2 += 1);
          }
          return s3;
        }
        function a(e3, t3, i3, s3, n2) {
          for (const o2 = i3.length; s3 < n2; s3++) {
            const n3 = e3[s3];
            if (t3(n3, i3[o2 - 1]) < 0) {
              i3.pop();
              const e4 = (0, r.findFirstIdxMonotonousOrArrLen)(i3, ((e5) => t3(n3, e5) < 0));
              i3.splice(e4, 0, n3);
            }
          }
        }
        function l(e3, t3) {
          const i3 = e3.indexOf(t3);
          if (i3 > -1) return e3.splice(i3, 1), t3;
        }
        function h(e3, t3, i3) {
          const s3 = c(e3, t3), r2 = e3.length, n2 = i3.length;
          e3.length = r2 + n2;
          for (let t4 = r2 - 1; t4 >= s3; t4--) e3[t4 + n2] = e3[t4];
          for (let t4 = 0; t4 < n2; t4++) e3[t4 + s3] = i3[t4];
        }
        function c(e3, t3) {
          return t3 < 0 ? Math.max(t3 + e3.length, 0) : Math.min(t3, e3.length);
        }
        var d;
        !(function(e3) {
          e3.isLessThan = function(e4) {
            return e4 < 0;
          }, e3.isLessThanOrEqual = function(e4) {
            return e4 <= 0;
          }, e3.isGreaterThan = function(e4) {
            return e4 > 0;
          }, e3.isNeitherLessOrGreaterThan = function(e4) {
            return 0 === e4;
          }, e3.greaterThan = 1, e3.lessThan = -1, e3.neitherLessOrGreaterThan = 0;
        })(d || (t2.CompareResult = d = {})), t2.numberComparator = (e3, t3) => e3 - t3, t2.booleanComparator = (e3, i3) => (0, t2.numberComparator)(e3 ? 1 : 0, i3 ? 1 : 0), t2.ArrayQueue = class {
          constructor(e3) {
            this.items = e3, this.firstIdx = 0, this.lastIdx = this.items.length - 1;
          }
          get length() {
            return this.lastIdx - this.firstIdx + 1;
          }
          takeWhile(e3) {
            let t3 = this.firstIdx;
            for (; t3 < this.items.length && e3(this.items[t3]); ) t3++;
            const i3 = t3 === this.firstIdx ? null : this.items.slice(this.firstIdx, t3);
            return this.firstIdx = t3, i3;
          }
          takeFromEndWhile(e3) {
            let t3 = this.lastIdx;
            for (; t3 >= 0 && e3(this.items[t3]); ) t3--;
            const i3 = t3 === this.lastIdx ? null : this.items.slice(t3 + 1, this.lastIdx + 1);
            return this.lastIdx = t3, i3;
          }
          peek() {
            if (0 !== this.length) return this.items[this.firstIdx];
          }
          peekLast() {
            if (0 !== this.length) return this.items[this.lastIdx];
          }
          dequeue() {
            const e3 = this.items[this.firstIdx];
            return this.firstIdx++, e3;
          }
          removeLast() {
            const e3 = this.items[this.lastIdx];
            return this.lastIdx--, e3;
          }
          takeCount(e3) {
            const t3 = this.items.slice(this.firstIdx, this.firstIdx + e3);
            return this.firstIdx += e3, t3;
          }
        };
        class u {
          static {
            this.empty = new u(((e3) => {
            }));
          }
          constructor(e3) {
            this.iterate = e3;
          }
          forEach(e3) {
            this.iterate(((t3) => (e3(t3), true)));
          }
          toArray() {
            const e3 = [];
            return this.iterate(((t3) => (e3.push(t3), true))), e3;
          }
          filter(e3) {
            return new u(((t3) => this.iterate(((i3) => !e3(i3) || t3(i3)))));
          }
          map(e3) {
            return new u(((t3) => this.iterate(((i3) => t3(e3(i3))))));
          }
          some(e3) {
            let t3 = false;
            return this.iterate(((i3) => (t3 = e3(i3), !t3))), t3;
          }
          findFirst(e3) {
            let t3;
            return this.iterate(((i3) => !e3(i3) || (t3 = i3, false))), t3;
          }
          findLast(e3) {
            let t3;
            return this.iterate(((i3) => (e3(i3) && (t3 = i3), true))), t3;
          }
          findLastMaxBy(e3) {
            let t3, i3 = true;
            return this.iterate(((s3) => ((i3 || d.isGreaterThan(e3(s3, t3))) && (i3 = false, t3 = s3), true))), t3;
          }
        }
        t2.CallbackIterable = u;
        class _ {
          constructor(e3) {
            this._indexMap = e3;
          }
          static createSortPermutation(e3, t3) {
            const i3 = Array.from(e3.keys()).sort(((i4, s3) => t3(e3[i4], e3[s3])));
            return new _(i3);
          }
          apply(e3) {
            return e3.map(((t3, i3) => e3[this._indexMap[i3]]));
          }
          inverse() {
            const e3 = this._indexMap.slice();
            for (let t3 = 0; t3 < this._indexMap.length; t3++) e3[this._indexMap[t3]] = t3;
            return new _(e3);
          }
        }
        t2.Permutation = _;
      }, 8297: (e2, t2) => {
        function i2(e3, t3, i3 = e3.length - 1) {
          for (let s3 = i3; s3 >= 0; s3--) if (t3(e3[s3])) return s3;
          return -1;
        }
        function s2(e3, t3, i3 = 0, s3 = e3.length) {
          let r2 = i3, n2 = s3;
          for (; r2 < n2; ) {
            const i4 = Math.floor((r2 + n2) / 2);
            t3(e3[i4]) ? r2 = i4 + 1 : n2 = i4;
          }
          return r2 - 1;
        }
        function r(e3, t3, i3 = 0, s3 = e3.length) {
          let r2 = i3, n2 = s3;
          for (; r2 < n2; ) {
            const i4 = Math.floor((r2 + n2) / 2);
            t3(e3[i4]) ? n2 = i4 : r2 = i4 + 1;
          }
          return r2;
        }
        Object.defineProperty(t2, "__esModule", { value: true }), t2.MonotonousArray = void 0, t2.findLast = function(e3, t3) {
          const s3 = i2(e3, t3);
          if (-1 !== s3) return e3[s3];
        }, t2.findLastIdx = i2, t2.findLastMonotonous = function(e3, t3) {
          const i3 = s2(e3, t3);
          return -1 === i3 ? void 0 : e3[i3];
        }, t2.findLastIdxMonotonous = s2, t2.findFirstMonotonous = function(e3, t3) {
          const i3 = r(e3, t3);
          return i3 === e3.length ? void 0 : e3[i3];
        }, t2.findFirstIdxMonotonousOrArrLen = r, t2.findFirstIdxMonotonous = function(e3, t3, i3 = 0, s3 = e3.length) {
          const n2 = r(e3, t3, i3, s3);
          return n2 === e3.length ? -1 : n2;
        }, t2.findFirstMax = o, t2.findLastMax = function(e3, t3) {
          if (0 === e3.length) return;
          let i3 = e3[0];
          for (let s3 = 1; s3 < e3.length; s3++) {
            const r2 = e3[s3];
            t3(r2, i3) >= 0 && (i3 = r2);
          }
          return i3;
        }, t2.findFirstMin = function(e3, t3) {
          return o(e3, ((e4, i3) => -t3(e4, i3)));
        }, t2.findMaxIdx = function(e3, t3) {
          if (0 === e3.length) return -1;
          let i3 = 0;
          for (let s3 = 1; s3 < e3.length; s3++) t3(e3[s3], e3[i3]) > 0 && (i3 = s3);
          return i3;
        }, t2.mapFindFirst = function(e3, t3) {
          for (const i3 of e3) {
            const e4 = t3(i3);
            if (void 0 !== e4) return e4;
          }
        };
        class n {
          static {
            this.assertInvariants = false;
          }
          constructor(e3) {
            this._array = e3, this._findLastMonotonousLastIdx = 0;
          }
          findLastMonotonous(e3) {
            if (n.assertInvariants) {
              if (this._prevFindLastPredicate) {
                for (const t4 of this._array) if (this._prevFindLastPredicate(t4) && !e3(t4)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
              }
              this._prevFindLastPredicate = e3;
            }
            const t3 = s2(this._array, e3, this._findLastMonotonousLastIdx);
            return this._findLastMonotonousLastIdx = t3 + 1, -1 === t3 ? void 0 : this._array[t3];
          }
        }
        function o(e3, t3) {
          if (0 === e3.length) return;
          let i3 = e3[0];
          for (let s3 = 1; s3 < e3.length; s3++) {
            const r2 = e3[s3];
            t3(r2, i3) > 0 && (i3 = r2);
          }
          return i3;
        }
        t2.MonotonousArray = n;
      }, 1758: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.AsyncIterableSource = t2.CancelableAsyncIterableObject = t2.AsyncIterableObject = t2.LazyStatefulPromise = t2.StatefulPromise = t2.Promises = t2.DeferredPromise = t2.IntervalCounter = t2.TaskSequentializer = t2.GlobalIdleValue = t2.AbstractIdleValue = t2._runWhenIdle = t2.runWhenGlobalIdle = t2.ThrottledWorker = t2.RunOnceWorker = t2.ProcessTimeRunOnceScheduler = t2.RunOnceScheduler = t2.IntervalTimer = t2.TimeoutTimer = t2.LimitedQueue = t2.Queue = t2.Limiter = t2.AutoOpenBarrier = t2.Barrier = t2.ThrottledDelayer = t2.Delayer = t2.SequencerByKey = t2.Sequencer = t2.Throttler = void 0, t2.isThenable = c, t2.createCancelablePromise = d, t2.raceCancellation = function(e3, t3, i3) {
          return new Promise(((s3, r2) => {
            const n2 = t3.onCancellationRequested((() => {
              n2.dispose(), s3(i3);
            }));
            e3.then(s3, r2).finally((() => n2.dispose()));
          }));
        }, t2.raceCancellationError = function(e3, t3) {
          return new Promise(((i3, s3) => {
            const n2 = t3.onCancellationRequested((() => {
              n2.dispose(), s3(new r.CancellationError());
            }));
            e3.then(i3, s3).finally((() => n2.dispose()));
          }));
        }, t2.raceCancellablePromises = async function(e3) {
          let t3 = -1;
          const i3 = e3.map(((e4, i4) => e4.then(((e5) => (t3 = i4, e5)))));
          try {
            return await Promise.race(i3);
          } finally {
            e3.forEach(((e4, i4) => {
              i4 !== t3 && e4.cancel();
            }));
          }
        }, t2.raceTimeout = function(e3, t3, i3) {
          let s3;
          const r2 = setTimeout((() => {
            s3?.(void 0), i3?.();
          }), t3);
          return Promise.race([e3.finally((() => clearTimeout(r2))), new Promise(((e4) => s3 = e4))]);
        }, t2.asPromise = function(e3) {
          return new Promise(((t3, i3) => {
            const s3 = e3();
            c(s3) ? s3.then(t3, i3) : t3(s3);
          }));
        }, t2.promiseWithResolvers = u, t2.timeout = g, t2.disposableTimeout = function(e3, t3 = 0, i3) {
          const s3 = setTimeout((() => {
            e3(), i3 && r2.dispose();
          }), t3), r2 = (0, o.toDisposable)((() => {
            clearTimeout(s3), i3?.deleteAndLeak(r2);
          }));
          return i3?.add(r2), r2;
        }, t2.sequence = function(e3) {
          const t3 = [];
          let i3 = 0;
          const s3 = e3.length;
          return Promise.resolve(null).then((function r2(n2) {
            null != n2 && t3.push(n2);
            const o2 = i3 < s3 ? e3[i3++]() : null;
            return o2 ? o2.then(r2) : Promise.resolve(t3);
          }));
        }, t2.first = function(e3, t3 = (e4) => !!e4, i3 = null) {
          let s3 = 0;
          const r2 = e3.length, n2 = () => {
            if (s3 >= r2) return Promise.resolve(i3);
            const o2 = e3[s3++];
            return Promise.resolve(o2()).then(((e4) => t3(e4) ? Promise.resolve(e4) : n2()));
          };
          return n2();
        }, t2.firstParallel = function(e3, t3 = (e4) => !!e4, i3 = null) {
          if (0 === e3.length) return Promise.resolve(i3);
          let s3 = e3.length;
          const r2 = () => {
            s3 = -1;
            for (const t4 of e3) t4.cancel?.();
          };
          return new Promise(((n2, o2) => {
            for (const a2 of e3) a2.then(((e4) => {
              --s3 >= 0 && t3(e4) ? (r2(), n2(e4)) : 0 === s3 && n2(i3);
            })).catch(((e4) => {
              --s3 >= 0 && (r2(), o2(e4));
            }));
          }));
        }, t2.retry = async function(e3, t3, i3) {
          let s3;
          for (let r2 = 0; r2 < i3; r2++) try {
            return await e3();
          } catch (e4) {
            s3 = e4, await g(t3);
          }
          throw s3;
        }, t2.createCancelableAsyncIterable = function(e3) {
          const t3 = new s2.CancellationTokenSource(), i3 = e3(t3.token);
          return new A(t3, (async (e4) => {
            const s3 = t3.token.onCancellationRequested((() => {
              s3.dispose(), t3.dispose(), e4.reject(new r.CancellationError());
            }));
            try {
              for await (const s4 of i3) {
                if (t3.token.isCancellationRequested) return;
                e4.emitOne(s4);
              }
              s3.dispose(), t3.dispose();
            } catch (i4) {
              s3.dispose(), t3.dispose(), e4.reject(i4);
            }
          }));
        };
        const s2 = i2(8447), r = i2(9807), n = i2(802), o = i2(7150), a = i2(8163), l = i2(5015), h = i2(626);
        function c(e3) {
          return !!e3 && "function" == typeof e3.then;
        }
        function d(e3) {
          const t3 = new s2.CancellationTokenSource(), i3 = e3(t3.token), n2 = new Promise(((e4, s3) => {
            const n3 = t3.token.onCancellationRequested((() => {
              n3.dispose(), s3(new r.CancellationError());
            }));
            Promise.resolve(i3).then(((i4) => {
              n3.dispose(), t3.dispose(), e4(i4);
            }), ((e5) => {
              n3.dispose(), t3.dispose(), s3(e5);
            }));
          }));
          return new class {
            cancel() {
              t3.cancel(), t3.dispose();
            }
            then(e4, t4) {
              return n2.then(e4, t4);
            }
            catch(e4) {
              return this.then(void 0, e4);
            }
            finally(e4) {
              return n2.finally(e4);
            }
          }();
        }
        function u() {
          let e3, t3;
          return { promise: new Promise(((i3, s3) => {
            e3 = i3, t3 = s3;
          })), resolve: e3, reject: t3 };
        }
        class _ {
          constructor() {
            this.isDisposed = false, this.activePromise = null, this.queuedPromise = null, this.queuedPromiseFactory = null;
          }
          queue(e3) {
            if (this.isDisposed) return Promise.reject(new Error("Throttler is disposed"));
            if (this.activePromise) {
              if (this.queuedPromiseFactory = e3, !this.queuedPromise) {
                const e4 = () => {
                  if (this.queuedPromise = null, this.isDisposed) return;
                  const e5 = this.queue(this.queuedPromiseFactory);
                  return this.queuedPromiseFactory = null, e5;
                };
                this.queuedPromise = new Promise(((t3) => {
                  this.activePromise.then(e4, e4).then(t3);
                }));
              }
              return new Promise(((e4, t3) => {
                this.queuedPromise.then(e4, t3);
              }));
            }
            return this.activePromise = e3(), new Promise(((e4, t3) => {
              this.activePromise.then(((t4) => {
                this.activePromise = null, e4(t4);
              }), ((e5) => {
                this.activePromise = null, t3(e5);
              }));
            }));
          }
          dispose() {
            this.isDisposed = true;
          }
        }
        t2.Throttler = _, t2.Sequencer = class {
          constructor() {
            this.current = Promise.resolve(null);
          }
          queue(e3) {
            return this.current = this.current.then((() => e3()), (() => e3()));
          }
        }, t2.SequencerByKey = class {
          constructor() {
            this.promiseMap = /* @__PURE__ */ new Map();
          }
          queue(e3, t3) {
            const i3 = (this.promiseMap.get(e3) ?? Promise.resolve()).catch((() => {
            })).then(t3).finally((() => {
              this.promiseMap.get(e3) === i3 && this.promiseMap.delete(e3);
            }));
            return this.promiseMap.set(e3, i3), i3;
          }
        };
        class f {
          constructor(e3) {
            this.defaultDelay = e3, this.deferred = null, this.completionPromise = null, this.doResolve = null, this.doReject = null, this.task = null;
          }
          trigger(e3, t3 = this.defaultDelay) {
            this.task = e3, this.cancelTimeout(), this.completionPromise || (this.completionPromise = new Promise(((e4, t4) => {
              this.doResolve = e4, this.doReject = t4;
            })).then((() => {
              if (this.completionPromise = null, this.doResolve = null, this.task) {
                const e4 = this.task;
                return this.task = null, e4();
              }
            })));
            const i3 = () => {
              this.deferred = null, this.doResolve?.(null);
            };
            return this.deferred = t3 === l.MicrotaskDelay ? ((e4) => {
              let t4 = true;
              return queueMicrotask((() => {
                t4 && (t4 = false, e4());
              })), { isTriggered: () => t4, dispose: () => {
                t4 = false;
              } };
            })(i3) : ((e4, t4) => {
              let i4 = true;
              const s3 = setTimeout((() => {
                i4 = false, t4();
              }), e4);
              return { isTriggered: () => i4, dispose: () => {
                clearTimeout(s3), i4 = false;
              } };
            })(t3, i3), this.completionPromise;
          }
          isTriggered() {
            return !!this.deferred?.isTriggered();
          }
          cancel() {
            this.cancelTimeout(), this.completionPromise && (this.doReject?.(new r.CancellationError()), this.completionPromise = null);
          }
          cancelTimeout() {
            this.deferred?.dispose(), this.deferred = null;
          }
          dispose() {
            this.cancel();
          }
        }
        t2.Delayer = f, t2.ThrottledDelayer = class {
          constructor(e3) {
            this.delayer = new f(e3), this.throttler = new _();
          }
          trigger(e3, t3) {
            return this.delayer.trigger((() => this.throttler.queue(e3)), t3);
          }
          isTriggered() {
            return this.delayer.isTriggered();
          }
          cancel() {
            this.delayer.cancel();
          }
          dispose() {
            this.delayer.dispose(), this.throttler.dispose();
          }
        };
        class p {
          constructor() {
            this._isOpen = false, this._promise = new Promise(((e3, t3) => {
              this._completePromise = e3;
            }));
          }
          isOpen() {
            return this._isOpen;
          }
          open() {
            this._isOpen = true, this._completePromise(true);
          }
          wait() {
            return this._promise;
          }
        }
        function g(e3, t3) {
          return t3 ? new Promise(((i3, s3) => {
            const n2 = setTimeout((() => {
              o2.dispose(), i3();
            }), e3), o2 = t3.onCancellationRequested((() => {
              clearTimeout(n2), o2.dispose(), s3(new r.CancellationError());
            }));
          })) : d(((t4) => g(e3, t4)));
        }
        t2.Barrier = p, t2.AutoOpenBarrier = class extends p {
          constructor(e3) {
            super(), this._timeout = setTimeout((() => this.open()), e3);
          }
          open() {
            clearTimeout(this._timeout), super.open();
          }
        };
        class m {
          constructor(e3) {
            this._size = 0, this._isDisposed = false, this.maxDegreeOfParalellism = e3, this.outstandingPromises = [], this.runningPromises = 0, this._onDrained = new n.Emitter();
          }
          whenIdle() {
            return this.size > 0 ? n.Event.toPromise(this.onDrained) : Promise.resolve();
          }
          get onDrained() {
            return this._onDrained.event;
          }
          get size() {
            return this._size;
          }
          queue(e3) {
            if (this._isDisposed) throw new Error("Object has been disposed");
            return this._size++, new Promise(((t3, i3) => {
              this.outstandingPromises.push({ factory: e3, c: t3, e: i3 }), this.consume();
            }));
          }
          consume() {
            for (; this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism; ) {
              const e3 = this.outstandingPromises.shift();
              this.runningPromises++;
              const t3 = e3.factory();
              t3.then(e3.c, e3.e), t3.then((() => this.consumed()), (() => this.consumed()));
            }
          }
          consumed() {
            this._isDisposed || (this.runningPromises--, 0 == --this._size && this._onDrained.fire(), this.outstandingPromises.length > 0 && this.consume());
          }
          clear() {
            if (this._isDisposed) throw new Error("Object has been disposed");
            this.outstandingPromises.length = 0, this._size = this.runningPromises;
          }
          dispose() {
            this._isDisposed = true, this.outstandingPromises.length = 0, this._size = 0, this._onDrained.dispose();
          }
        }
        t2.Limiter = m, t2.Queue = class extends m {
          constructor() {
            super(1);
          }
        }, t2.LimitedQueue = class {
          constructor() {
            this.sequentializer = new C(), this.tasks = 0;
          }
          queue(e3) {
            return this.sequentializer.isRunning() ? this.sequentializer.queue((() => this.sequentializer.run(this.tasks++, e3()))) : this.sequentializer.run(this.tasks++, e3());
          }
        }, t2.TimeoutTimer = class {
          constructor(e3, t3) {
            this._isDisposed = false, this._token = -1, "function" == typeof e3 && "number" == typeof t3 && this.setIfNotSet(e3, t3);
          }
          dispose() {
            this.cancel(), this._isDisposed = true;
          }
          cancel() {
            -1 !== this._token && (clearTimeout(this._token), this._token = -1);
          }
          cancelAndSet(e3, t3) {
            if (this._isDisposed) throw new r.BugIndicatingError("Calling 'cancelAndSet' on a disposed TimeoutTimer");
            this.cancel(), this._token = setTimeout((() => {
              this._token = -1, e3();
            }), t3);
          }
          setIfNotSet(e3, t3) {
            if (this._isDisposed) throw new r.BugIndicatingError("Calling 'setIfNotSet' on a disposed TimeoutTimer");
            -1 === this._token && (this._token = setTimeout((() => {
              this._token = -1, e3();
            }), t3));
          }
        }, t2.IntervalTimer = class {
          constructor() {
            this.disposable = void 0, this.isDisposed = false;
          }
          cancel() {
            this.disposable?.dispose(), this.disposable = void 0;
          }
          cancelAndSet(e3, t3, i3 = globalThis) {
            if (this.isDisposed) throw new r.BugIndicatingError("Calling 'cancelAndSet' on a disposed IntervalTimer");
            this.cancel();
            const s3 = i3.setInterval((() => {
              e3();
            }), t3);
            this.disposable = (0, o.toDisposable)((() => {
              i3.clearInterval(s3), this.disposable = void 0;
            }));
          }
          dispose() {
            this.cancel(), this.isDisposed = true;
          }
        };
        class v {
          constructor(e3, t3) {
            this.timeoutToken = -1, this.runner = e3, this.timeout = t3, this.timeoutHandler = this.onTimeout.bind(this);
          }
          dispose() {
            this.cancel(), this.runner = null;
          }
          cancel() {
            this.isScheduled() && (clearTimeout(this.timeoutToken), this.timeoutToken = -1);
          }
          schedule(e3 = this.timeout) {
            this.cancel(), this.timeoutToken = setTimeout(this.timeoutHandler, e3);
          }
          get delay() {
            return this.timeout;
          }
          set delay(e3) {
            this.timeout = e3;
          }
          isScheduled() {
            return -1 !== this.timeoutToken;
          }
          flush() {
            this.isScheduled() && (this.cancel(), this.doRun());
          }
          onTimeout() {
            this.timeoutToken = -1, this.runner && this.doRun();
          }
          doRun() {
            this.runner?.();
          }
        }
        t2.RunOnceScheduler = v, t2.ProcessTimeRunOnceScheduler = class {
          constructor(e3, t3) {
            t3 % 1e3 != 0 && console.warn(`ProcessTimeRunOnceScheduler resolution is 1s, ${t3}ms is not a multiple of 1000ms.`), this.runner = e3, this.timeout = t3, this.counter = 0, this.intervalToken = -1, this.intervalHandler = this.onInterval.bind(this);
          }
          dispose() {
            this.cancel(), this.runner = null;
          }
          cancel() {
            this.isScheduled() && (clearInterval(this.intervalToken), this.intervalToken = -1);
          }
          schedule(e3 = this.timeout) {
            e3 % 1e3 != 0 && console.warn(`ProcessTimeRunOnceScheduler resolution is 1s, ${e3}ms is not a multiple of 1000ms.`), this.cancel(), this.counter = Math.ceil(e3 / 1e3), this.intervalToken = setInterval(this.intervalHandler, 1e3);
          }
          isScheduled() {
            return -1 !== this.intervalToken;
          }
          onInterval() {
            this.counter--, this.counter > 0 || (clearInterval(this.intervalToken), this.intervalToken = -1, this.runner?.());
          }
        }, t2.RunOnceWorker = class extends v {
          constructor(e3, t3) {
            super(e3, t3), this.units = [];
          }
          work(e3) {
            this.units.push(e3), this.isScheduled() || this.schedule();
          }
          doRun() {
            const e3 = this.units;
            this.units = [], this.runner?.(e3);
          }
          dispose() {
            this.units = [], super.dispose();
          }
        };
        class S extends o.Disposable {
          constructor(e3, t3) {
            super(), this.options = e3, this.handler = t3, this.pendingWork = [], this.throttler = this._register(new o.MutableDisposable()), this.disposed = false;
          }
          get pending() {
            return this.pendingWork.length;
          }
          work(e3) {
            if (this.disposed) return false;
            if ("number" == typeof this.options.maxBufferedWork) {
              if (this.throttler.value) {
                if (this.pending + e3.length > this.options.maxBufferedWork) return false;
              } else if (this.pending + e3.length - this.options.maxWorkChunkSize > this.options.maxBufferedWork) return false;
            }
            for (const t3 of e3) this.pendingWork.push(t3);
            return this.throttler.value || this.doWork(), true;
          }
          doWork() {
            this.handler(this.pendingWork.splice(0, this.options.maxWorkChunkSize)), this.pendingWork.length > 0 && (this.throttler.value = new v((() => {
              this.throttler.clear(), this.doWork();
            }), this.options.throttleDelay), this.throttler.value.schedule());
          }
          dispose() {
            super.dispose(), this.disposed = true;
          }
        }
        t2.ThrottledWorker = S, "function" != typeof globalThis.requestIdleCallback || "function" != typeof globalThis.cancelIdleCallback ? t2._runWhenIdle = (e3, t3) => {
          (0, a.setTimeout0)((() => {
            if (i3) return;
            const e4 = Date.now() + 15, s3 = { didTimeout: true, timeRemaining: () => Math.max(0, e4 - Date.now()) };
            t3(Object.freeze(s3));
          }));
          let i3 = false;
          return { dispose() {
            i3 || (i3 = true);
          } };
        } : t2._runWhenIdle = (e3, t3, i3) => {
          const s3 = e3.requestIdleCallback(t3, "number" == typeof i3 ? { timeout: i3 } : void 0);
          let r2 = false;
          return { dispose() {
            r2 || (r2 = true, e3.cancelIdleCallback(s3));
          } };
        }, t2.runWhenGlobalIdle = (e3) => (0, t2._runWhenIdle)(globalThis, e3);
        class b {
          constructor(e3, i3) {
            this._didRun = false, this._executor = () => {
              try {
                this._value = i3();
              } catch (e4) {
                this._error = e4;
              } finally {
                this._didRun = true;
              }
            }, this._handle = (0, t2._runWhenIdle)(e3, (() => this._executor()));
          }
          dispose() {
            this._handle.dispose();
          }
          get value() {
            if (this._didRun || (this._handle.dispose(), this._executor()), this._error) throw this._error;
            return this._value;
          }
          get isInitialized() {
            return this._didRun;
          }
        }
        t2.AbstractIdleValue = b, t2.GlobalIdleValue = class extends b {
          constructor(e3) {
            super(globalThis, e3);
          }
        };
        class C {
          isRunning(e3) {
            return "number" == typeof e3 ? this._running?.taskId === e3 : !!this._running;
          }
          get running() {
            return this._running?.promise;
          }
          cancelRunning() {
            this._running?.cancel();
          }
          run(e3, t3, i3) {
            return this._running = { taskId: e3, cancel: () => i3?.(), promise: t3 }, t3.then((() => this.doneRunning(e3)), (() => this.doneRunning(e3))), t3;
          }
          doneRunning(e3) {
            this._running && e3 === this._running.taskId && (this._running = void 0, this.runQueued());
          }
          runQueued() {
            if (this._queued) {
              const e3 = this._queued;
              this._queued = void 0, e3.run().then(e3.promiseResolve, e3.promiseReject);
            }
          }
          queue(e3) {
            if (this._queued) this._queued.run = e3;
            else {
              const { promise: t3, resolve: i3, reject: s3 } = u();
              this._queued = { run: e3, promise: t3, promiseResolve: i3, promiseReject: s3 };
            }
            return this._queued.promise;
          }
          hasQueued() {
            return !!this._queued;
          }
          async join() {
            return this._queued?.promise ?? this._running?.promise;
          }
        }
        var y, w, E;
        t2.TaskSequentializer = C, t2.IntervalCounter = class {
          constructor(e3, t3 = () => Date.now()) {
            this.interval = e3, this.nowFn = t3, this.lastIncrementTime = 0, this.value = 0;
          }
          increment() {
            const e3 = this.nowFn();
            return e3 - this.lastIncrementTime > this.interval && (this.lastIncrementTime = e3, this.value = 0), this.value++, this.value;
          }
        }, (function(e3) {
          e3[e3.Resolved = 0] = "Resolved", e3[e3.Rejected = 1] = "Rejected";
        })(y || (y = {}));
        class D {
          get isRejected() {
            return this.outcome?.outcome === y.Rejected;
          }
          get isResolved() {
            return this.outcome?.outcome === y.Resolved;
          }
          get isSettled() {
            return !!this.outcome;
          }
          get value() {
            return this.outcome?.outcome === y.Resolved ? this.outcome?.value : void 0;
          }
          constructor() {
            this.p = new Promise(((e3, t3) => {
              this.completeCallback = e3, this.errorCallback = t3;
            }));
          }
          complete(e3) {
            return new Promise(((t3) => {
              this.completeCallback(e3), this.outcome = { outcome: y.Resolved, value: e3 }, t3();
            }));
          }
          error(e3) {
            return new Promise(((t3) => {
              this.errorCallback(e3), this.outcome = { outcome: y.Rejected, value: e3 }, t3();
            }));
          }
          cancel() {
            return this.error(new r.CancellationError());
          }
        }
        t2.DeferredPromise = D, (function(e3) {
          e3.settled = async function(e4) {
            let t3;
            const i3 = await Promise.all(e4.map(((e5) => e5.then(((e6) => e6), ((e6) => {
              t3 || (t3 = e6);
            })))));
            if (void 0 !== t3) throw t3;
            return i3;
          }, e3.withAsyncBody = function(e4) {
            return new Promise((async (t3, i3) => {
              try {
                await e4(t3, i3);
              } catch (e5) {
                i3(e5);
              }
            }));
          };
        })(w || (t2.Promises = w = {}));
        class L {
          get value() {
            return this._value;
          }
          get error() {
            return this._error;
          }
          get isResolved() {
            return this._isResolved;
          }
          constructor(e3) {
            this._value = void 0, this._error = void 0, this._isResolved = false, this.promise = e3.then(((e4) => (this._value = e4, this._isResolved = true, e4)), ((e4) => {
              throw this._error = e4, this._isResolved = true, e4;
            }));
          }
          requireValue() {
            if (!this._isResolved) throw new r.BugIndicatingError("Promise is not resolved yet");
            if (this._error) throw this._error;
            return this._value;
          }
        }
        t2.StatefulPromise = L, t2.LazyStatefulPromise = class {
          constructor(e3) {
            this._compute = e3, this._promise = new h.Lazy((() => new L(this._compute())));
          }
          requireValue() {
            return this._promise.value.requireValue();
          }
          getPromise() {
            return this._promise.value.promise;
          }
          get currentValue() {
            return this._promise.rawValue?.value;
          }
        }, (function(e3) {
          e3[e3.Initial = 0] = "Initial", e3[e3.DoneOK = 1] = "DoneOK", e3[e3.DoneError = 2] = "DoneError";
        })(E || (E = {}));
        class R {
          static fromArray(e3) {
            return new R(((t3) => {
              t3.emitMany(e3);
            }));
          }
          static fromPromise(e3) {
            return new R((async (t3) => {
              t3.emitMany(await e3);
            }));
          }
          static fromPromises(e3) {
            return new R((async (t3) => {
              await Promise.all(e3.map((async (e4) => t3.emitOne(await e4))));
            }));
          }
          static merge(e3) {
            return new R((async (t3) => {
              await Promise.all(e3.map((async (e4) => {
                for await (const i3 of e4) t3.emitOne(i3);
              })));
            }));
          }
          static {
            this.EMPTY = R.fromArray([]);
          }
          constructor(e3, t3) {
            this._state = E.Initial, this._results = [], this._error = null, this._onReturn = t3, this._onStateChanged = new n.Emitter(), queueMicrotask((async () => {
              const t4 = { emitOne: (e4) => this.emitOne(e4), emitMany: (e4) => this.emitMany(e4), reject: (e4) => this.reject(e4) };
              try {
                await Promise.resolve(e3(t4)), this.resolve();
              } catch (e4) {
                this.reject(e4);
              } finally {
                t4.emitOne = void 0, t4.emitMany = void 0, t4.reject = void 0;
              }
            }));
          }
          [Symbol.asyncIterator]() {
            let e3 = 0;
            return { next: async () => {
              for (; ; ) {
                if (this._state === E.DoneError) throw this._error;
                if (e3 < this._results.length) return { done: false, value: this._results[e3++] };
                if (this._state === E.DoneOK) return { done: true, value: void 0 };
                await n.Event.toPromise(this._onStateChanged.event);
              }
            }, return: async () => (this._onReturn?.(), { done: true, value: void 0 }) };
          }
          static map(e3, t3) {
            return new R((async (i3) => {
              for await (const s3 of e3) i3.emitOne(t3(s3));
            }));
          }
          map(e3) {
            return R.map(this, e3);
          }
          static filter(e3, t3) {
            return new R((async (i3) => {
              for await (const s3 of e3) t3(s3) && i3.emitOne(s3);
            }));
          }
          filter(e3) {
            return R.filter(this, e3);
          }
          static coalesce(e3) {
            return R.filter(e3, ((e4) => !!e4));
          }
          coalesce() {
            return R.coalesce(this);
          }
          static async toPromise(e3) {
            const t3 = [];
            for await (const i3 of e3) t3.push(i3);
            return t3;
          }
          toPromise() {
            return R.toPromise(this);
          }
          emitOne(e3) {
            this._state === E.Initial && (this._results.push(e3), this._onStateChanged.fire());
          }
          emitMany(e3) {
            this._state === E.Initial && (this._results = this._results.concat(e3), this._onStateChanged.fire());
          }
          resolve() {
            this._state === E.Initial && (this._state = E.DoneOK, this._onStateChanged.fire());
          }
          reject(e3) {
            this._state === E.Initial && (this._state = E.DoneError, this._error = e3, this._onStateChanged.fire());
          }
        }
        t2.AsyncIterableObject = R;
        class A extends R {
          constructor(e3, t3) {
            super(t3), this._source = e3;
          }
          cancel() {
            this._source.cancel();
          }
        }
        t2.CancelableAsyncIterableObject = A, t2.AsyncIterableSource = class {
          constructor(e3) {
            let t3, i3;
            this._deferred = new D(), this._asyncIterable = new R(((e4) => {
              if (!t3) return i3 && e4.emitMany(i3), this._errorFn = (t4) => e4.reject(t4), this._emitFn = (t4) => e4.emitOne(t4), this._deferred.p;
              e4.reject(t3);
            }), e3), this._emitFn = (e4) => {
              i3 || (i3 = []), i3.push(e4);
            }, this._errorFn = (e4) => {
              t3 || (t3 = e4);
            };
          }
          get asyncIterable() {
            return this._asyncIterable;
          }
          resolve() {
            this._deferred.complete();
          }
          reject(e3) {
            this._errorFn(e3), this._deferred.complete();
          }
          emitOne(e3) {
            this._emitFn(e3);
          }
        };
      }, 8447: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CancellationTokenSource = t2.CancellationToken = void 0, t2.cancelOnDispose = function(e3) {
          const t3 = new a();
          return e3.add({ dispose() {
            t3.cancel();
          } }), t3.token;
        };
        const s2 = i2(802), r = Object.freeze((function(e3, t3) {
          const i3 = setTimeout(e3.bind(t3), 0);
          return { dispose() {
            clearTimeout(i3);
          } };
        }));
        var n;
        !(function(e3) {
          e3.isCancellationToken = function(t3) {
            return t3 === e3.None || t3 === e3.Cancelled || t3 instanceof o || !(!t3 || "object" != typeof t3) && "boolean" == typeof t3.isCancellationRequested && "function" == typeof t3.onCancellationRequested;
          }, e3.None = Object.freeze({ isCancellationRequested: false, onCancellationRequested: s2.Event.None }), e3.Cancelled = Object.freeze({ isCancellationRequested: true, onCancellationRequested: r });
        })(n || (t2.CancellationToken = n = {}));
        class o {
          constructor() {
            this._isCancelled = false, this._emitter = null;
          }
          cancel() {
            this._isCancelled || (this._isCancelled = true, this._emitter && (this._emitter.fire(void 0), this.dispose()));
          }
          get isCancellationRequested() {
            return this._isCancelled;
          }
          get onCancellationRequested() {
            return this._isCancelled ? r : (this._emitter || (this._emitter = new s2.Emitter()), this._emitter.event);
          }
          dispose() {
            this._emitter && (this._emitter.dispose(), this._emitter = null);
          }
        }
        class a {
          constructor(e3) {
            this._token = void 0, this._parentListener = void 0, this._parentListener = e3 && e3.onCancellationRequested(this.cancel, this);
          }
          get token() {
            return this._token || (this._token = new o()), this._token;
          }
          cancel() {
            this._token ? this._token instanceof o && this._token.cancel() : this._token = n.Cancelled;
          }
          dispose(e3 = false) {
            e3 && this.cancel(), this._parentListener?.dispose(), this._token ? this._token instanceof o && this._token.dispose() : this._token = n.None;
          }
        }
        t2.CancellationTokenSource = a;
      }, 4869: (e2, t2) => {
        var i2;
        Object.defineProperty(t2, "__esModule", { value: true }), t2.CharCode = void 0, (function(e3) {
          e3[e3.Null = 0] = "Null", e3[e3.Backspace = 8] = "Backspace", e3[e3.Tab = 9] = "Tab", e3[e3.LineFeed = 10] = "LineFeed", e3[e3.CarriageReturn = 13] = "CarriageReturn", e3[e3.Space = 32] = "Space", e3[e3.ExclamationMark = 33] = "ExclamationMark", e3[e3.DoubleQuote = 34] = "DoubleQuote", e3[e3.Hash = 35] = "Hash", e3[e3.DollarSign = 36] = "DollarSign", e3[e3.PercentSign = 37] = "PercentSign", e3[e3.Ampersand = 38] = "Ampersand", e3[e3.SingleQuote = 39] = "SingleQuote", e3[e3.OpenParen = 40] = "OpenParen", e3[e3.CloseParen = 41] = "CloseParen", e3[e3.Asterisk = 42] = "Asterisk", e3[e3.Plus = 43] = "Plus", e3[e3.Comma = 44] = "Comma", e3[e3.Dash = 45] = "Dash", e3[e3.Period = 46] = "Period", e3[e3.Slash = 47] = "Slash", e3[e3.Digit0 = 48] = "Digit0", e3[e3.Digit1 = 49] = "Digit1", e3[e3.Digit2 = 50] = "Digit2", e3[e3.Digit3 = 51] = "Digit3", e3[e3.Digit4 = 52] = "Digit4", e3[e3.Digit5 = 53] = "Digit5", e3[e3.Digit6 = 54] = "Digit6", e3[e3.Digit7 = 55] = "Digit7", e3[e3.Digit8 = 56] = "Digit8", e3[e3.Digit9 = 57] = "Digit9", e3[e3.Colon = 58] = "Colon", e3[e3.Semicolon = 59] = "Semicolon", e3[e3.LessThan = 60] = "LessThan", e3[e3.Equals = 61] = "Equals", e3[e3.GreaterThan = 62] = "GreaterThan", e3[e3.QuestionMark = 63] = "QuestionMark", e3[e3.AtSign = 64] = "AtSign", e3[e3.A = 65] = "A", e3[e3.B = 66] = "B", e3[e3.C = 67] = "C", e3[e3.D = 68] = "D", e3[e3.E = 69] = "E", e3[e3.F = 70] = "F", e3[e3.G = 71] = "G", e3[e3.H = 72] = "H", e3[e3.I = 73] = "I", e3[e3.J = 74] = "J", e3[e3.K = 75] = "K", e3[e3.L = 76] = "L", e3[e3.M = 77] = "M", e3[e3.N = 78] = "N", e3[e3.O = 79] = "O", e3[e3.P = 80] = "P", e3[e3.Q = 81] = "Q", e3[e3.R = 82] = "R", e3[e3.S = 83] = "S", e3[e3.T = 84] = "T", e3[e3.U = 85] = "U", e3[e3.V = 86] = "V", e3[e3.W = 87] = "W", e3[e3.X = 88] = "X", e3[e3.Y = 89] = "Y", e3[e3.Z = 90] = "Z", e3[e3.OpenSquareBracket = 91] = "OpenSquareBracket", e3[e3.Backslash = 92] = "Backslash", e3[e3.CloseSquareBracket = 93] = "CloseSquareBracket", e3[e3.Caret = 94] = "Caret", e3[e3.Underline = 95] = "Underline", e3[e3.BackTick = 96] = "BackTick", e3[e3.a = 97] = "a", e3[e3.b = 98] = "b", e3[e3.c = 99] = "c", e3[e3.d = 100] = "d", e3[e3.e = 101] = "e", e3[e3.f = 102] = "f", e3[e3.g = 103] = "g", e3[e3.h = 104] = "h", e3[e3.i = 105] = "i", e3[e3.j = 106] = "j", e3[e3.k = 107] = "k", e3[e3.l = 108] = "l", e3[e3.m = 109] = "m", e3[e3.n = 110] = "n", e3[e3.o = 111] = "o", e3[e3.p = 112] = "p", e3[e3.q = 113] = "q", e3[e3.r = 114] = "r", e3[e3.s = 115] = "s", e3[e3.t = 116] = "t", e3[e3.u = 117] = "u", e3[e3.v = 118] = "v", e3[e3.w = 119] = "w", e3[e3.x = 120] = "x", e3[e3.y = 121] = "y", e3[e3.z = 122] = "z", e3[e3.OpenCurlyBrace = 123] = "OpenCurlyBrace", e3[e3.Pipe = 124] = "Pipe", e3[e3.CloseCurlyBrace = 125] = "CloseCurlyBrace", e3[e3.Tilde = 126] = "Tilde", e3[e3.NoBreakSpace = 160] = "NoBreakSpace", e3[e3.U_Combining_Grave_Accent = 768] = "U_Combining_Grave_Accent", e3[e3.U_Combining_Acute_Accent = 769] = "U_Combining_Acute_Accent", e3[e3.U_Combining_Circumflex_Accent = 770] = "U_Combining_Circumflex_Accent", e3[e3.U_Combining_Tilde = 771] = "U_Combining_Tilde", e3[e3.U_Combining_Macron = 772] = "U_Combining_Macron", e3[e3.U_Combining_Overline = 773] = "U_Combining_Overline", e3[e3.U_Combining_Breve = 774] = "U_Combining_Breve", e3[e3.U_Combining_Dot_Above = 775] = "U_Combining_Dot_Above", e3[e3.U_Combining_Diaeresis = 776] = "U_Combining_Diaeresis", e3[e3.U_Combining_Hook_Above = 777] = "U_Combining_Hook_Above", e3[e3.U_Combining_Ring_Above = 778] = "U_Combining_Ring_Above", e3[e3.U_Combining_Double_Acute_Accent = 779] = "U_Combining_Double_Acute_Accent", e3[e3.U_Combining_Caron = 780] = "U_Combining_Caron", e3[e3.U_Combining_Vertical_Line_Above = 781] = "U_Combining_Vertical_Line_Above", e3[e3.U_Combining_Double_Vertical_Line_Above = 782] = "U_Combining_Double_Vertical_Line_Above", e3[e3.U_Combining_Double_Grave_Accent = 783] = "U_Combining_Double_Grave_Accent", e3[e3.U_Combining_Candrabindu = 784] = "U_Combining_Candrabindu", e3[e3.U_Combining_Inverted_Breve = 785] = "U_Combining_Inverted_Breve", e3[e3.U_Combining_Turned_Comma_Above = 786] = "U_Combining_Turned_Comma_Above", e3[e3.U_Combining_Comma_Above = 787] = "U_Combining_Comma_Above", e3[e3.U_Combining_Reversed_Comma_Above = 788] = "U_Combining_Reversed_Comma_Above", e3[e3.U_Combining_Comma_Above_Right = 789] = "U_Combining_Comma_Above_Right", e3[e3.U_Combining_Grave_Accent_Below = 790] = "U_Combining_Grave_Accent_Below", e3[e3.U_Combining_Acute_Accent_Below = 791] = "U_Combining_Acute_Accent_Below", e3[e3.U_Combining_Left_Tack_Below = 792] = "U_Combining_Left_Tack_Below", e3[e3.U_Combining_Right_Tack_Below = 793] = "U_Combining_Right_Tack_Below", e3[e3.U_Combining_Left_Angle_Above = 794] = "U_Combining_Left_Angle_Above", e3[e3.U_Combining_Horn = 795] = "U_Combining_Horn", e3[e3.U_Combining_Left_Half_Ring_Below = 796] = "U_Combining_Left_Half_Ring_Below", e3[e3.U_Combining_Up_Tack_Below = 797] = "U_Combining_Up_Tack_Below", e3[e3.U_Combining_Down_Tack_Below = 798] = "U_Combining_Down_Tack_Below", e3[e3.U_Combining_Plus_Sign_Below = 799] = "U_Combining_Plus_Sign_Below", e3[e3.U_Combining_Minus_Sign_Below = 800] = "U_Combining_Minus_Sign_Below", e3[e3.U_Combining_Palatalized_Hook_Below = 801] = "U_Combining_Palatalized_Hook_Below", e3[e3.U_Combining_Retroflex_Hook_Below = 802] = "U_Combining_Retroflex_Hook_Below", e3[e3.U_Combining_Dot_Below = 803] = "U_Combining_Dot_Below", e3[e3.U_Combining_Diaeresis_Below = 804] = "U_Combining_Diaeresis_Below", e3[e3.U_Combining_Ring_Below = 805] = "U_Combining_Ring_Below", e3[e3.U_Combining_Comma_Below = 806] = "U_Combining_Comma_Below", e3[e3.U_Combining_Cedilla = 807] = "U_Combining_Cedilla", e3[e3.U_Combining_Ogonek = 808] = "U_Combining_Ogonek", e3[e3.U_Combining_Vertical_Line_Below = 809] = "U_Combining_Vertical_Line_Below", e3[e3.U_Combining_Bridge_Below = 810] = "U_Combining_Bridge_Below", e3[e3.U_Combining_Inverted_Double_Arch_Below = 811] = "U_Combining_Inverted_Double_Arch_Below", e3[e3.U_Combining_Caron_Below = 812] = "U_Combining_Caron_Below", e3[e3.U_Combining_Circumflex_Accent_Below = 813] = "U_Combining_Circumflex_Accent_Below", e3[e3.U_Combining_Breve_Below = 814] = "U_Combining_Breve_Below", e3[e3.U_Combining_Inverted_Breve_Below = 815] = "U_Combining_Inverted_Breve_Below", e3[e3.U_Combining_Tilde_Below = 816] = "U_Combining_Tilde_Below", e3[e3.U_Combining_Macron_Below = 817] = "U_Combining_Macron_Below", e3[e3.U_Combining_Low_Line = 818] = "U_Combining_Low_Line", e3[e3.U_Combining_Double_Low_Line = 819] = "U_Combining_Double_Low_Line", e3[e3.U_Combining_Tilde_Overlay = 820] = "U_Combining_Tilde_Overlay", e3[e3.U_Combining_Short_Stroke_Overlay = 821] = "U_Combining_Short_Stroke_Overlay", e3[e3.U_Combining_Long_Stroke_Overlay = 822] = "U_Combining_Long_Stroke_Overlay", e3[e3.U_Combining_Short_Solidus_Overlay = 823] = "U_Combining_Short_Solidus_Overlay", e3[e3.U_Combining_Long_Solidus_Overlay = 824] = "U_Combining_Long_Solidus_Overlay", e3[e3.U_Combining_Right_Half_Ring_Below = 825] = "U_Combining_Right_Half_Ring_Below", e3[e3.U_Combining_Inverted_Bridge_Below = 826] = "U_Combining_Inverted_Bridge_Below", e3[e3.U_Combining_Square_Below = 827] = "U_Combining_Square_Below", e3[e3.U_Combining_Seagull_Below = 828] = "U_Combining_Seagull_Below", e3[e3.U_Combining_X_Above = 829] = "U_Combining_X_Above", e3[e3.U_Combining_Vertical_Tilde = 830] = "U_Combining_Vertical_Tilde", e3[e3.U_Combining_Double_Overline = 831] = "U_Combining_Double_Overline", e3[e3.U_Combining_Grave_Tone_Mark = 832] = "U_Combining_Grave_Tone_Mark", e3[e3.U_Combining_Acute_Tone_Mark = 833] = "U_Combining_Acute_Tone_Mark", e3[e3.U_Combining_Greek_Perispomeni = 834] = "U_Combining_Greek_Perispomeni", e3[e3.U_Combining_Greek_Koronis = 835] = "U_Combining_Greek_Koronis", e3[e3.U_Combining_Greek_Dialytika_Tonos = 836] = "U_Combining_Greek_Dialytika_Tonos", e3[e3.U_Combining_Greek_Ypogegrammeni = 837] = "U_Combining_Greek_Ypogegrammeni", e3[e3.U_Combining_Bridge_Above = 838] = "U_Combining_Bridge_Above", e3[e3.U_Combining_Equals_Sign_Below = 839] = "U_Combining_Equals_Sign_Below", e3[e3.U_Combining_Double_Vertical_Line_Below = 840] = "U_Combining_Double_Vertical_Line_Below", e3[e3.U_Combining_Left_Angle_Below = 841] = "U_Combining_Left_Angle_Below", e3[e3.U_Combining_Not_Tilde_Above = 842] = "U_Combining_Not_Tilde_Above", e3[e3.U_Combining_Homothetic_Above = 843] = "U_Combining_Homothetic_Above", e3[e3.U_Combining_Almost_Equal_To_Above = 844] = "U_Combining_Almost_Equal_To_Above", e3[e3.U_Combining_Left_Right_Arrow_Below = 845] = "U_Combining_Left_Right_Arrow_Below", e3[e3.U_Combining_Upwards_Arrow_Below = 846] = "U_Combining_Upwards_Arrow_Below", e3[e3.U_Combining_Grapheme_Joiner = 847] = "U_Combining_Grapheme_Joiner", e3[e3.U_Combining_Right_Arrowhead_Above = 848] = "U_Combining_Right_Arrowhead_Above", e3[e3.U_Combining_Left_Half_Ring_Above = 849] = "U_Combining_Left_Half_Ring_Above", e3[e3.U_Combining_Fermata = 850] = "U_Combining_Fermata", e3[e3.U_Combining_X_Below = 851] = "U_Combining_X_Below", e3[e3.U_Combining_Left_Arrowhead_Below = 852] = "U_Combining_Left_Arrowhead_Below", e3[e3.U_Combining_Right_Arrowhead_Below = 853] = "U_Combining_Right_Arrowhead_Below", e3[e3.U_Combining_Right_Arrowhead_And_Up_Arrowhead_Below = 854] = "U_Combining_Right_Arrowhead_And_Up_Arrowhead_Below", e3[e3.U_Combining_Right_Half_Ring_Above = 855] = "U_Combining_Right_Half_Ring_Above", e3[e3.U_Combining_Dot_Above_Right = 856] = "U_Combining_Dot_Above_Right", e3[e3.U_Combining_Asterisk_Below = 857] = "U_Combining_Asterisk_Below", e3[e3.U_Combining_Double_Ring_Below = 858] = "U_Combining_Double_Ring_Below", e3[e3.U_Combining_Zigzag_Above = 859] = "U_Combining_Zigzag_Above", e3[e3.U_Combining_Double_Breve_Below = 860] = "U_Combining_Double_Breve_Below", e3[e3.U_Combining_Double_Breve = 861] = "U_Combining_Double_Breve", e3[e3.U_Combining_Double_Macron = 862] = "U_Combining_Double_Macron", e3[e3.U_Combining_Double_Macron_Below = 863] = "U_Combining_Double_Macron_Below", e3[e3.U_Combining_Double_Tilde = 864] = "U_Combining_Double_Tilde", e3[e3.U_Combining_Double_Inverted_Breve = 865] = "U_Combining_Double_Inverted_Breve", e3[e3.U_Combining_Double_Rightwards_Arrow_Below = 866] = "U_Combining_Double_Rightwards_Arrow_Below", e3[e3.U_Combining_Latin_Small_Letter_A = 867] = "U_Combining_Latin_Small_Letter_A", e3[e3.U_Combining_Latin_Small_Letter_E = 868] = "U_Combining_Latin_Small_Letter_E", e3[e3.U_Combining_Latin_Small_Letter_I = 869] = "U_Combining_Latin_Small_Letter_I", e3[e3.U_Combining_Latin_Small_Letter_O = 870] = "U_Combining_Latin_Small_Letter_O", e3[e3.U_Combining_Latin_Small_Letter_U = 871] = "U_Combining_Latin_Small_Letter_U", e3[e3.U_Combining_Latin_Small_Letter_C = 872] = "U_Combining_Latin_Small_Letter_C", e3[e3.U_Combining_Latin_Small_Letter_D = 873] = "U_Combining_Latin_Small_Letter_D", e3[e3.U_Combining_Latin_Small_Letter_H = 874] = "U_Combining_Latin_Small_Letter_H", e3[e3.U_Combining_Latin_Small_Letter_M = 875] = "U_Combining_Latin_Small_Letter_M", e3[e3.U_Combining_Latin_Small_Letter_R = 876] = "U_Combining_Latin_Small_Letter_R", e3[e3.U_Combining_Latin_Small_Letter_T = 877] = "U_Combining_Latin_Small_Letter_T", e3[e3.U_Combining_Latin_Small_Letter_V = 878] = "U_Combining_Latin_Small_Letter_V", e3[e3.U_Combining_Latin_Small_Letter_X = 879] = "U_Combining_Latin_Small_Letter_X", e3[e3.LINE_SEPARATOR = 8232] = "LINE_SEPARATOR", e3[e3.PARAGRAPH_SEPARATOR = 8233] = "PARAGRAPH_SEPARATOR", e3[e3.NEXT_LINE = 133] = "NEXT_LINE", e3[e3.U_CIRCUMFLEX = 94] = "U_CIRCUMFLEX", e3[e3.U_GRAVE_ACCENT = 96] = "U_GRAVE_ACCENT", e3[e3.U_DIAERESIS = 168] = "U_DIAERESIS", e3[e3.U_MACRON = 175] = "U_MACRON", e3[e3.U_ACUTE_ACCENT = 180] = "U_ACUTE_ACCENT", e3[e3.U_CEDILLA = 184] = "U_CEDILLA", e3[e3.U_MODIFIER_LETTER_LEFT_ARROWHEAD = 706] = "U_MODIFIER_LETTER_LEFT_ARROWHEAD", e3[e3.U_MODIFIER_LETTER_RIGHT_ARROWHEAD = 707] = "U_MODIFIER_LETTER_RIGHT_ARROWHEAD", e3[e3.U_MODIFIER_LETTER_UP_ARROWHEAD = 708] = "U_MODIFIER_LETTER_UP_ARROWHEAD", e3[e3.U_MODIFIER_LETTER_DOWN_ARROWHEAD = 709] = "U_MODIFIER_LETTER_DOWN_ARROWHEAD", e3[e3.U_MODIFIER_LETTER_CENTRED_RIGHT_HALF_RING = 722] = "U_MODIFIER_LETTER_CENTRED_RIGHT_HALF_RING", e3[e3.U_MODIFIER_LETTER_CENTRED_LEFT_HALF_RING = 723] = "U_MODIFIER_LETTER_CENTRED_LEFT_HALF_RING", e3[e3.U_MODIFIER_LETTER_UP_TACK = 724] = "U_MODIFIER_LETTER_UP_TACK", e3[e3.U_MODIFIER_LETTER_DOWN_TACK = 725] = "U_MODIFIER_LETTER_DOWN_TACK", e3[e3.U_MODIFIER_LETTER_PLUS_SIGN = 726] = "U_MODIFIER_LETTER_PLUS_SIGN", e3[e3.U_MODIFIER_LETTER_MINUS_SIGN = 727] = "U_MODIFIER_LETTER_MINUS_SIGN", e3[e3.U_BREVE = 728] = "U_BREVE", e3[e3.U_DOT_ABOVE = 729] = "U_DOT_ABOVE", e3[e3.U_RING_ABOVE = 730] = "U_RING_ABOVE", e3[e3.U_OGONEK = 731] = "U_OGONEK", e3[e3.U_SMALL_TILDE = 732] = "U_SMALL_TILDE", e3[e3.U_DOUBLE_ACUTE_ACCENT = 733] = "U_DOUBLE_ACUTE_ACCENT", e3[e3.U_MODIFIER_LETTER_RHOTIC_HOOK = 734] = "U_MODIFIER_LETTER_RHOTIC_HOOK", e3[e3.U_MODIFIER_LETTER_CROSS_ACCENT = 735] = "U_MODIFIER_LETTER_CROSS_ACCENT", e3[e3.U_MODIFIER_LETTER_EXTRA_HIGH_TONE_BAR = 741] = "U_MODIFIER_LETTER_EXTRA_HIGH_TONE_BAR", e3[e3.U_MODIFIER_LETTER_HIGH_TONE_BAR = 742] = "U_MODIFIER_LETTER_HIGH_TONE_BAR", e3[e3.U_MODIFIER_LETTER_MID_TONE_BAR = 743] = "U_MODIFIER_LETTER_MID_TONE_BAR", e3[e3.U_MODIFIER_LETTER_LOW_TONE_BAR = 744] = "U_MODIFIER_LETTER_LOW_TONE_BAR", e3[e3.U_MODIFIER_LETTER_EXTRA_LOW_TONE_BAR = 745] = "U_MODIFIER_LETTER_EXTRA_LOW_TONE_BAR", e3[e3.U_MODIFIER_LETTER_YIN_DEPARTING_TONE_MARK = 746] = "U_MODIFIER_LETTER_YIN_DEPARTING_TONE_MARK", e3[e3.U_MODIFIER_LETTER_YANG_DEPARTING_TONE_MARK = 747] = "U_MODIFIER_LETTER_YANG_DEPARTING_TONE_MARK", e3[e3.U_MODIFIER_LETTER_UNASPIRATED = 749] = "U_MODIFIER_LETTER_UNASPIRATED", e3[e3.U_MODIFIER_LETTER_LOW_DOWN_ARROWHEAD = 751] = "U_MODIFIER_LETTER_LOW_DOWN_ARROWHEAD", e3[e3.U_MODIFIER_LETTER_LOW_UP_ARROWHEAD = 752] = "U_MODIFIER_LETTER_LOW_UP_ARROWHEAD", e3[e3.U_MODIFIER_LETTER_LOW_LEFT_ARROWHEAD = 753] = "U_MODIFIER_LETTER_LOW_LEFT_ARROWHEAD", e3[e3.U_MODIFIER_LETTER_LOW_RIGHT_ARROWHEAD = 754] = "U_MODIFIER_LETTER_LOW_RIGHT_ARROWHEAD", e3[e3.U_MODIFIER_LETTER_LOW_RING = 755] = "U_MODIFIER_LETTER_LOW_RING", e3[e3.U_MODIFIER_LETTER_MIDDLE_GRAVE_ACCENT = 756] = "U_MODIFIER_LETTER_MIDDLE_GRAVE_ACCENT", e3[e3.U_MODIFIER_LETTER_MIDDLE_DOUBLE_GRAVE_ACCENT = 757] = "U_MODIFIER_LETTER_MIDDLE_DOUBLE_GRAVE_ACCENT", e3[e3.U_MODIFIER_LETTER_MIDDLE_DOUBLE_ACUTE_ACCENT = 758] = "U_MODIFIER_LETTER_MIDDLE_DOUBLE_ACUTE_ACCENT", e3[e3.U_MODIFIER_LETTER_LOW_TILDE = 759] = "U_MODIFIER_LETTER_LOW_TILDE", e3[e3.U_MODIFIER_LETTER_RAISED_COLON = 760] = "U_MODIFIER_LETTER_RAISED_COLON", e3[e3.U_MODIFIER_LETTER_BEGIN_HIGH_TONE = 761] = "U_MODIFIER_LETTER_BEGIN_HIGH_TONE", e3[e3.U_MODIFIER_LETTER_END_HIGH_TONE = 762] = "U_MODIFIER_LETTER_END_HIGH_TONE", e3[e3.U_MODIFIER_LETTER_BEGIN_LOW_TONE = 763] = "U_MODIFIER_LETTER_BEGIN_LOW_TONE", e3[e3.U_MODIFIER_LETTER_END_LOW_TONE = 764] = "U_MODIFIER_LETTER_END_LOW_TONE", e3[e3.U_MODIFIER_LETTER_SHELF = 765] = "U_MODIFIER_LETTER_SHELF", e3[e3.U_MODIFIER_LETTER_OPEN_SHELF = 766] = "U_MODIFIER_LETTER_OPEN_SHELF", e3[e3.U_MODIFIER_LETTER_LOW_LEFT_ARROW = 767] = "U_MODIFIER_LETTER_LOW_LEFT_ARROW", e3[e3.U_GREEK_LOWER_NUMERAL_SIGN = 885] = "U_GREEK_LOWER_NUMERAL_SIGN", e3[e3.U_GREEK_TONOS = 900] = "U_GREEK_TONOS", e3[e3.U_GREEK_DIALYTIKA_TONOS = 901] = "U_GREEK_DIALYTIKA_TONOS", e3[e3.U_GREEK_KORONIS = 8125] = "U_GREEK_KORONIS", e3[e3.U_GREEK_PSILI = 8127] = "U_GREEK_PSILI", e3[e3.U_GREEK_PERISPOMENI = 8128] = "U_GREEK_PERISPOMENI", e3[e3.U_GREEK_DIALYTIKA_AND_PERISPOMENI = 8129] = "U_GREEK_DIALYTIKA_AND_PERISPOMENI", e3[e3.U_GREEK_PSILI_AND_VARIA = 8141] = "U_GREEK_PSILI_AND_VARIA", e3[e3.U_GREEK_PSILI_AND_OXIA = 8142] = "U_GREEK_PSILI_AND_OXIA", e3[e3.U_GREEK_PSILI_AND_PERISPOMENI = 8143] = "U_GREEK_PSILI_AND_PERISPOMENI", e3[e3.U_GREEK_DASIA_AND_VARIA = 8157] = "U_GREEK_DASIA_AND_VARIA", e3[e3.U_GREEK_DASIA_AND_OXIA = 8158] = "U_GREEK_DASIA_AND_OXIA", e3[e3.U_GREEK_DASIA_AND_PERISPOMENI = 8159] = "U_GREEK_DASIA_AND_PERISPOMENI", e3[e3.U_GREEK_DIALYTIKA_AND_VARIA = 8173] = "U_GREEK_DIALYTIKA_AND_VARIA", e3[e3.U_GREEK_DIALYTIKA_AND_OXIA = 8174] = "U_GREEK_DIALYTIKA_AND_OXIA", e3[e3.U_GREEK_VARIA = 8175] = "U_GREEK_VARIA", e3[e3.U_GREEK_OXIA = 8189] = "U_GREEK_OXIA", e3[e3.U_GREEK_DASIA = 8190] = "U_GREEK_DASIA", e3[e3.U_IDEOGRAPHIC_FULL_STOP = 12290] = "U_IDEOGRAPHIC_FULL_STOP", e3[e3.U_LEFT_CORNER_BRACKET = 12300] = "U_LEFT_CORNER_BRACKET", e3[e3.U_RIGHT_CORNER_BRACKET = 12301] = "U_RIGHT_CORNER_BRACKET", e3[e3.U_LEFT_BLACK_LENTICULAR_BRACKET = 12304] = "U_LEFT_BLACK_LENTICULAR_BRACKET", e3[e3.U_RIGHT_BLACK_LENTICULAR_BRACKET = 12305] = "U_RIGHT_BLACK_LENTICULAR_BRACKET", e3[e3.U_OVERLINE = 8254] = "U_OVERLINE", e3[e3.UTF8_BOM = 65279] = "UTF8_BOM", e3[e3.U_FULLWIDTH_SEMICOLON = 65307] = "U_FULLWIDTH_SEMICOLON", e3[e3.U_FULLWIDTH_COMMA = 65292] = "U_FULLWIDTH_COMMA";
        })(i2 || (t2.CharCode = i2 = {}));
      }, 9087: (e2, t2) => {
        var i2;
        Object.defineProperty(t2, "__esModule", { value: true }), t2.SetWithKey = void 0, t2.groupBy = function(e3, t3) {
          const i3 = /* @__PURE__ */ Object.create(null);
          for (const s3 of e3) {
            const e4 = t3(s3);
            let r = i3[e4];
            r || (r = i3[e4] = []), r.push(s3);
          }
          return i3;
        }, t2.diffSets = function(e3, t3) {
          const i3 = [], s3 = [];
          for (const s4 of e3) t3.has(s4) || i3.push(s4);
          for (const i4 of t3) e3.has(i4) || s3.push(i4);
          return { removed: i3, added: s3 };
        }, t2.diffMaps = function(e3, t3) {
          const i3 = [], s3 = [];
          for (const [s4, r] of e3) t3.has(s4) || i3.push(r);
          for (const [i4, r] of t3) e3.has(i4) || s3.push(r);
          return { removed: i3, added: s3 };
        }, t2.intersection = function(e3, t3) {
          const i3 = /* @__PURE__ */ new Set();
          for (const s3 of t3) e3.has(s3) && i3.add(s3);
          return i3;
        };
        class s2 {
          static {
            i2 = Symbol.toStringTag;
          }
          constructor(e3, t3) {
            this.toKey = t3, this._map = /* @__PURE__ */ new Map(), this[i2] = "SetWithKey";
            for (const t4 of e3) this.add(t4);
          }
          get size() {
            return this._map.size;
          }
          add(e3) {
            const t3 = this.toKey(e3);
            return this._map.set(t3, e3), this;
          }
          delete(e3) {
            return this._map.delete(this.toKey(e3));
          }
          has(e3) {
            return this._map.has(this.toKey(e3));
          }
          *entries() {
            for (const e3 of this._map.values()) yield [e3, e3];
          }
          keys() {
            return this.values();
          }
          *values() {
            for (const e3 of this._map.values()) yield e3;
          }
          clear() {
            this._map.clear();
          }
          forEach(e3, t3) {
            this._map.forEach(((i3) => e3.call(t3, i3, i3, this)));
          }
          [Symbol.iterator]() {
            return this.values();
          }
        }
        t2.SetWithKey = s2;
      }, 4838: (e2, t2) => {
        function i2(e3) {
          return (t3, i3, s2) => {
            let r = null, n = null;
            if ("function" == typeof s2.value ? (r = "value", n = s2.value) : "function" == typeof s2.get && (r = "get", n = s2.get), !n) throw new Error("not supported");
            s2[r] = e3(n, i3);
          };
        }
        Object.defineProperty(t2, "__esModule", { value: true }), t2.memoize = function(e3, t3, i3) {
          let s2 = null, r = null;
          if ("function" == typeof i3.value ? (s2 = "value", r = i3.value, 0 !== r.length && console.warn("Memoize should only be used in functions with zero parameters")) : "function" == typeof i3.get && (s2 = "get", r = i3.get), !r) throw new Error("not supported");
          const n = `$memoize$${t3}`;
          i3[s2] = function(...e4) {
            return this.hasOwnProperty(n) || Object.defineProperty(this, n, { configurable: false, enumerable: false, writable: false, value: r.apply(this, e4) }), this[n];
          };
        }, t2.debounce = function(e3, t3, s2) {
          return i2(((i3, r) => {
            const n = `$debounce$${r}`, o = `$debounce$result$${r}`;
            return function(...r2) {
              this[o] || (this[o] = s2 ? s2() : void 0), clearTimeout(this[n]), t3 && (this[o] = t3(this[o], ...r2), r2 = [this[o]]), this[n] = setTimeout((() => {
                i3.apply(this, r2), this[o] = s2 ? s2() : void 0;
              }), e3);
            };
          }));
        }, t2.throttle = function(e3, t3, s2) {
          return i2(((i3, r) => {
            const n = `$throttle$timer$${r}`, o = `$throttle$result$${r}`, a = `$throttle$lastRun$${r}`, l = `$throttle$pending$${r}`;
            return function(...r2) {
              if (this[o] || (this[o] = s2 ? s2() : void 0), null !== this[a] && void 0 !== this[a] || (this[a] = -Number.MAX_VALUE), t3 && (this[o] = t3(this[o], ...r2)), this[l]) return;
              const h = this[a] + e3;
              h <= Date.now() ? (this[a] = Date.now(), i3.apply(this, [this[o]]), this[o] = s2 ? s2() : void 0) : (this[l] = true, this[n] = setTimeout((() => {
                this[l] = false, this[a] = Date.now(), i3.apply(this, [this[o]]), this[o] = s2 ? s2() : void 0;
              }), h - Date.now()));
            };
          }));
        };
      }, 9807: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BugIndicatingError = t2.ErrorNoTelemetry = t2.ExpectedError = t2.NotSupportedError = t2.NotImplementedError = t2.ReadonlyError = t2.CancellationError = t2.errorHandler = t2.ErrorHandler = void 0, t2.setUnexpectedErrorHandler = function(e3) {
          t2.errorHandler.setUnexpectedErrorHandler(e3);
        }, t2.isSigPipeError = function(e3) {
          if (!e3 || "object" != typeof e3) return false;
          const t3 = e3;
          return "EPIPE" === t3.code && "WRITE" === t3.syscall?.toUpperCase();
        }, t2.onUnexpectedError = function(e3) {
          r(e3) || t2.errorHandler.onUnexpectedError(e3);
        }, t2.onUnexpectedExternalError = function(e3) {
          r(e3) || t2.errorHandler.onUnexpectedExternalError(e3);
        }, t2.transformErrorForSerialization = function(e3) {
          if (e3 instanceof Error) {
            const { name: t3, message: i3 } = e3;
            return { $isError: true, name: t3, message: i3, stack: e3.stacktrace || e3.stack, noTelemetry: c.isErrorNoTelemetry(e3) };
          }
          return e3;
        }, t2.transformErrorFromSerialization = function(e3) {
          let t3;
          return e3.noTelemetry ? t3 = new c() : (t3 = new Error(), t3.name = e3.name), t3.message = e3.message, t3.stack = e3.stack, t3;
        }, t2.isCancellationError = r, t2.canceled = function() {
          const e3 = new Error(s2);
          return e3.name = e3.message, e3;
        }, t2.illegalArgument = function(e3) {
          return e3 ? new Error(`Illegal argument: ${e3}`) : new Error("Illegal argument");
        }, t2.illegalState = function(e3) {
          return e3 ? new Error(`Illegal state: ${e3}`) : new Error("Illegal state");
        }, t2.getErrorMessage = function(e3) {
          return e3 ? e3.message ? e3.message : e3.stack ? e3.stack.split("\n")[0] : String(e3) : "Error";
        };
        class i2 {
          constructor() {
            this.listeners = [], this.unexpectedErrorHandler = function(e3) {
              setTimeout((() => {
                if (e3.stack) {
                  if (c.isErrorNoTelemetry(e3)) throw new c(e3.message + "\n\n" + e3.stack);
                  throw new Error(e3.message + "\n\n" + e3.stack);
                }
                throw e3;
              }), 0);
            };
          }
          addListener(e3) {
            return this.listeners.push(e3), () => {
              this._removeListener(e3);
            };
          }
          emit(e3) {
            this.listeners.forEach(((t3) => {
              t3(e3);
            }));
          }
          _removeListener(e3) {
            this.listeners.splice(this.listeners.indexOf(e3), 1);
          }
          setUnexpectedErrorHandler(e3) {
            this.unexpectedErrorHandler = e3;
          }
          getUnexpectedErrorHandler() {
            return this.unexpectedErrorHandler;
          }
          onUnexpectedError(e3) {
            this.unexpectedErrorHandler(e3), this.emit(e3);
          }
          onUnexpectedExternalError(e3) {
            this.unexpectedErrorHandler(e3);
          }
        }
        t2.ErrorHandler = i2, t2.errorHandler = new i2();
        const s2 = "Canceled";
        function r(e3) {
          return e3 instanceof n || e3 instanceof Error && e3.name === s2 && e3.message === s2;
        }
        class n extends Error {
          constructor() {
            super(s2), this.name = this.message;
          }
        }
        t2.CancellationError = n;
        class o extends TypeError {
          constructor(e3) {
            super(e3 ? `${e3} is read-only and cannot be changed` : "Cannot change read-only property");
          }
        }
        t2.ReadonlyError = o;
        class a extends Error {
          constructor(e3) {
            super("NotImplemented"), e3 && (this.message = e3);
          }
        }
        t2.NotImplementedError = a;
        class l extends Error {
          constructor(e3) {
            super("NotSupported"), e3 && (this.message = e3);
          }
        }
        t2.NotSupportedError = l;
        class h extends Error {
          constructor() {
            super(...arguments), this.isExpected = true;
          }
        }
        t2.ExpectedError = h;
        class c extends Error {
          constructor(e3) {
            super(e3), this.name = "CodeExpectedError";
          }
          static fromError(e3) {
            if (e3 instanceof c) return e3;
            const t3 = new c();
            return t3.message = e3.message, t3.stack = e3.stack, t3;
          }
          static isErrorNoTelemetry(e3) {
            return "CodeExpectedError" === e3.name;
          }
        }
        t2.ErrorNoTelemetry = c;
        class d extends Error {
          constructor(e3) {
            super(e3 || "An unexpected bug occurred."), Object.setPrototypeOf(this, d.prototype);
          }
        }
        t2.BugIndicatingError = d;
      }, 802: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueWithChangeEvent = t2.Relay = t2.EventBufferer = t2.DynamicListEventMultiplexer = t2.EventMultiplexer = t2.MicrotaskEmitter = t2.DebounceEmitter = t2.PauseableEmitter = t2.AsyncEmitter = t2.createEventDeliveryQueue = t2.Emitter = t2.ListenerRefusalError = t2.ListenerLeakError = t2.EventProfiling = t2.Event = void 0, t2.setGlobalLeakWarningThreshold = function(e3) {
          const t3 = c;
          return c = e3, { dispose() {
            c = t3;
          } };
        };
        const s2 = i2(9807), r = i2(8841), n = i2(7150), o = i2(6317), a = i2(9725);
        var l;
        !(function(e3) {
          function t3(e4) {
            return (t4, i4 = null, s4) => {
              let r3, n2 = false;
              return r3 = e4(((e5) => {
                if (!n2) return r3 ? r3.dispose() : n2 = true, t4.call(i4, e5);
              }), null, s4), n2 && r3.dispose(), r3;
            };
          }
          function i3(e4, t4, i4) {
            return r2(((i5, s4 = null, r3) => e4(((e5) => i5.call(s4, t4(e5))), null, r3)), i4);
          }
          function s3(e4, t4, i4) {
            return r2(((i5, s4 = null, r3) => e4(((e5) => t4(e5) && i5.call(s4, e5)), null, r3)), i4);
          }
          function r2(e4, t4) {
            let i4;
            const s4 = new m({ onWillAddFirstListener() {
              i4 = e4(s4.fire, s4);
            }, onDidRemoveLastListener() {
              i4?.dispose();
            } });
            return t4?.add(s4), s4.event;
          }
          function o2(e4, t4, i4 = 100, s4 = false, r3 = false, n2, o3) {
            let a3, l3, h3, c2, d2 = 0;
            const u2 = new m({ leakWarningThreshold: n2, onWillAddFirstListener() {
              a3 = e4(((e5) => {
                d2++, l3 = t4(l3, e5), s4 && !h3 && (u2.fire(l3), l3 = void 0), c2 = () => {
                  const e6 = l3;
                  l3 = void 0, h3 = void 0, (!s4 || d2 > 1) && u2.fire(e6), d2 = 0;
                }, "number" == typeof i4 ? (clearTimeout(h3), h3 = setTimeout(c2, i4)) : void 0 === h3 && (h3 = 0, queueMicrotask(c2));
              }));
            }, onWillRemoveListener() {
              r3 && d2 > 0 && c2?.();
            }, onDidRemoveLastListener() {
              c2 = void 0, a3.dispose();
            } });
            return o3?.add(u2), u2.event;
          }
          e3.None = () => n.Disposable.None, e3.defer = function(e4, t4) {
            return o2(e4, (() => {
            }), 0, void 0, true, void 0, t4);
          }, e3.once = t3, e3.map = i3, e3.forEach = function(e4, t4, i4) {
            return r2(((i5, s4 = null, r3) => e4(((e5) => {
              t4(e5), i5.call(s4, e5);
            }), null, r3)), i4);
          }, e3.filter = s3, e3.signal = function(e4) {
            return e4;
          }, e3.any = function(...e4) {
            return (t4, i4 = null, s4) => {
              return r3 = (0, n.combinedDisposable)(...e4.map(((e5) => e5(((e6) => t4.call(i4, e6)))))), (o3 = s4) instanceof Array ? o3.push(r3) : o3 && o3.add(r3), r3;
              var r3, o3;
            };
          }, e3.reduce = function(e4, t4, s4, r3) {
            let n2 = s4;
            return i3(e4, ((e5) => (n2 = t4(n2, e5), n2)), r3);
          }, e3.debounce = o2, e3.accumulate = function(t4, i4 = 0, s4) {
            return e3.debounce(t4, ((e4, t5) => e4 ? (e4.push(t5), e4) : [t5]), i4, void 0, true, void 0, s4);
          }, e3.latch = function(e4, t4 = (e5, t5) => e5 === t5, i4) {
            let r3, n2 = true;
            return s3(e4, ((e5) => {
              const i5 = n2 || !t4(e5, r3);
              return n2 = false, r3 = e5, i5;
            }), i4);
          }, e3.split = function(t4, i4, s4) {
            return [e3.filter(t4, i4, s4), e3.filter(t4, ((e4) => !i4(e4)), s4)];
          }, e3.buffer = function(e4, t4 = false, i4 = [], s4) {
            let r3 = i4.slice(), n2 = e4(((e5) => {
              r3 ? r3.push(e5) : a3.fire(e5);
            }));
            s4 && s4.add(n2);
            const o3 = () => {
              r3?.forEach(((e5) => a3.fire(e5))), r3 = null;
            }, a3 = new m({ onWillAddFirstListener() {
              n2 || (n2 = e4(((e5) => a3.fire(e5))), s4 && s4.add(n2));
            }, onDidAddFirstListener() {
              r3 && (t4 ? setTimeout(o3) : o3());
            }, onDidRemoveLastListener() {
              n2 && n2.dispose(), n2 = null;
            } });
            return s4 && s4.add(a3), a3.event;
          }, e3.chain = function(e4, t4) {
            return (i4, s4, r3) => {
              const n2 = t4(new l2());
              return e4((function(e5) {
                const t5 = n2.evaluate(e5);
                t5 !== a2 && i4.call(s4, t5);
              }), void 0, r3);
            };
          };
          const a2 = /* @__PURE__ */ Symbol("HaltChainable");
          class l2 {
            constructor() {
              this.steps = [];
            }
            map(e4) {
              return this.steps.push(e4), this;
            }
            forEach(e4) {
              return this.steps.push(((t4) => (e4(t4), t4))), this;
            }
            filter(e4) {
              return this.steps.push(((t4) => e4(t4) ? t4 : a2)), this;
            }
            reduce(e4, t4) {
              let i4 = t4;
              return this.steps.push(((t5) => (i4 = e4(i4, t5), i4))), this;
            }
            latch(e4 = (e5, t4) => e5 === t4) {
              let t4, i4 = true;
              return this.steps.push(((s4) => {
                const r3 = i4 || !e4(s4, t4);
                return i4 = false, t4 = s4, r3 ? s4 : a2;
              })), this;
            }
            evaluate(e4) {
              for (const t4 of this.steps) if ((e4 = t4(e4)) === a2) break;
              return e4;
            }
          }
          e3.fromNodeEventEmitter = function(e4, t4, i4 = (e5) => e5) {
            const s4 = (...e5) => r3.fire(i4(...e5)), r3 = new m({ onWillAddFirstListener: () => e4.on(t4, s4), onDidRemoveLastListener: () => e4.removeListener(t4, s4) });
            return r3.event;
          }, e3.fromDOMEventEmitter = function(e4, t4, i4 = (e5) => e5) {
            const s4 = (...e5) => r3.fire(i4(...e5)), r3 = new m({ onWillAddFirstListener: () => e4.addEventListener(t4, s4), onDidRemoveLastListener: () => e4.removeEventListener(t4, s4) });
            return r3.event;
          }, e3.toPromise = function(e4) {
            return new Promise(((i4) => t3(e4)(i4)));
          }, e3.fromPromise = function(e4) {
            const t4 = new m();
            return e4.then(((e5) => {
              t4.fire(e5);
            }), (() => {
              t4.fire(void 0);
            })).finally((() => {
              t4.dispose();
            })), t4.event;
          }, e3.forward = function(e4, t4) {
            return e4(((e5) => t4.fire(e5)));
          }, e3.runAndSubscribe = function(e4, t4, i4) {
            return t4(i4), e4(((e5) => t4(e5)));
          };
          class h2 {
            constructor(e4, t4) {
              this._observable = e4, this._counter = 0, this._hasChanged = false;
              const i4 = { onWillAddFirstListener: () => {
                e4.addObserver(this);
              }, onDidRemoveLastListener: () => {
                e4.removeObserver(this);
              } };
              this.emitter = new m(i4), t4 && t4.add(this.emitter);
            }
            beginUpdate(e4) {
              this._counter++;
            }
            handlePossibleChange(e4) {
            }
            handleChange(e4, t4) {
              this._hasChanged = true;
            }
            endUpdate(e4) {
              this._counter--, 0 === this._counter && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = false, this.emitter.fire(this._observable.get())));
            }
          }
          e3.fromObservable = function(e4, t4) {
            return new h2(e4, t4).emitter.event;
          }, e3.fromObservableLight = function(e4) {
            return (t4, i4, s4) => {
              let r3 = 0, o3 = false;
              const a3 = { beginUpdate() {
                r3++;
              }, endUpdate() {
                r3--, 0 === r3 && (e4.reportChanges(), o3 && (o3 = false, t4.call(i4)));
              }, handlePossibleChange() {
              }, handleChange() {
                o3 = true;
              } };
              e4.addObserver(a3), e4.reportChanges();
              const l3 = { dispose() {
                e4.removeObserver(a3);
              } };
              return s4 instanceof n.DisposableStore ? s4.add(l3) : Array.isArray(s4) && s4.push(l3), l3;
            };
          };
        })(l || (t2.Event = l = {}));
        class h {
          static {
            this.all = /* @__PURE__ */ new Set();
          }
          static {
            this._idPool = 0;
          }
          constructor(e3) {
            this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${e3}_${h._idPool++}`, h.all.add(this);
          }
          start(e3) {
            this._stopWatch = new a.StopWatch(), this.listenerCount = e3;
          }
          stop() {
            if (this._stopWatch) {
              const e3 = this._stopWatch.elapsed();
              this.durations.push(e3), this.elapsedOverall += e3, this.invocationCount += 1, this._stopWatch = void 0;
            }
          }
        }
        t2.EventProfiling = h;
        let c = -1;
        class d {
          static {
            this._idPool = 1;
          }
          constructor(e3, t3, i3 = (d._idPool++).toString(16).padStart(3, "0")) {
            this._errorHandler = e3, this.threshold = t3, this.name = i3, this._warnCountdown = 0;
          }
          dispose() {
            this._stacks?.clear();
          }
          check(e3, t3) {
            const i3 = this.threshold;
            if (i3 <= 0 || t3 < i3) return;
            this._stacks || (this._stacks = /* @__PURE__ */ new Map());
            const s3 = this._stacks.get(e3.value) || 0;
            if (this._stacks.set(e3.value, s3 + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
              this._warnCountdown = 0.5 * i3;
              const [e4, s4] = this.getMostFrequentStack(), r2 = `[${this.name}] potential listener LEAK detected, having ${t3} listeners already. MOST frequent listener (${s4}):`;
              console.warn(r2), console.warn(e4);
              const n2 = new _(r2, e4);
              this._errorHandler(n2);
            }
            return () => {
              const t4 = this._stacks.get(e3.value) || 0;
              this._stacks.set(e3.value, t4 - 1);
            };
          }
          getMostFrequentStack() {
            if (!this._stacks) return;
            let e3, t3 = 0;
            for (const [i3, s3] of this._stacks) (!e3 || t3 < s3) && (e3 = [i3, s3], t3 = s3);
            return e3;
          }
        }
        class u {
          static create() {
            const e3 = new Error();
            return new u(e3.stack ?? "");
          }
          constructor(e3) {
            this.value = e3;
          }
          print() {
            console.warn(this.value.split("\n").slice(2).join("\n"));
          }
        }
        class _ extends Error {
          constructor(e3, t3) {
            super(e3), this.name = "ListenerLeakError", this.stack = t3;
          }
        }
        t2.ListenerLeakError = _;
        class f extends Error {
          constructor(e3, t3) {
            super(e3), this.name = "ListenerRefusalError", this.stack = t3;
          }
        }
        t2.ListenerRefusalError = f;
        let p = 0;
        class g {
          constructor(e3) {
            this.value = e3, this.id = p++;
          }
        }
        class m {
          constructor(e3) {
            this._size = 0, this._options = e3, this._leakageMon = c > 0 || this._options?.leakWarningThreshold ? new d(e3?.onListenerError ?? s2.onUnexpectedError, this._options?.leakWarningThreshold ?? c) : void 0, this._perfMon = this._options?._profName ? new h(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
          }
          dispose() {
            this._disposed || (this._disposed = true, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose());
          }
          get event() {
            return this._event ??= (e3, t3, i3) => {
              if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
                const e4 = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
                console.warn(e4);
                const t4 = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], i4 = new f(`${e4}. HINT: Stack shows most frequent listener (${t4[1]}-times)`, t4[0]);
                return (this._options?.onListenerError || s2.onUnexpectedError)(i4), n.Disposable.None;
              }
              if (this._disposed) return n.Disposable.None;
              t3 && (e3 = e3.bind(t3));
              const r2 = new g(e3);
              let o2;
              this._leakageMon && this._size >= Math.ceil(0.2 * this._leakageMon.threshold) && (r2.stack = u.create(), o2 = this._leakageMon.check(r2.stack, this._size + 1)), this._listeners ? this._listeners instanceof g ? (this._deliveryQueue ??= new v(), this._listeners = [this._listeners, r2]) : this._listeners.push(r2) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r2, this._options?.onDidAddFirstListener?.(this)), this._size++;
              const a2 = (0, n.toDisposable)((() => {
                o2?.(), this._removeListener(r2);
              }));
              return i3 instanceof n.DisposableStore ? i3.add(a2) : Array.isArray(i3) && i3.push(a2), a2;
            }, this._event;
          }
          _removeListener(e3) {
            if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
            if (1 === this._size) return this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), void (this._size = 0);
            const t3 = this._listeners, i3 = t3.indexOf(e3);
            if (-1 === i3) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
            this._size--, t3[i3] = void 0;
            const s3 = this._deliveryQueue.current === this;
            if (2 * this._size <= t3.length) {
              let e4 = 0;
              for (let i4 = 0; i4 < t3.length; i4++) t3[i4] ? t3[e4++] = t3[i4] : s3 && (this._deliveryQueue.end--, e4 < this._deliveryQueue.i && this._deliveryQueue.i--);
              t3.length = e4;
            }
          }
          _deliver(e3, t3) {
            if (!e3) return;
            const i3 = this._options?.onListenerError || s2.onUnexpectedError;
            if (i3) try {
              e3.value(t3);
            } catch (e4) {
              i3(e4);
            }
            else e3.value(t3);
          }
          _deliverQueue(e3) {
            const t3 = e3.current._listeners;
            for (; e3.i < e3.end; ) this._deliver(t3[e3.i++], e3.value);
            e3.reset();
          }
          fire(e3) {
            if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof g) this._deliver(this._listeners, e3);
            else {
              const t3 = this._deliveryQueue;
              t3.enqueue(this, e3, this._listeners.length), this._deliverQueue(t3);
            }
            this._perfMon?.stop();
          }
          hasListeners() {
            return this._size > 0;
          }
        }
        t2.Emitter = m, t2.createEventDeliveryQueue = () => new v();
        class v {
          constructor() {
            this.i = -1, this.end = 0;
          }
          enqueue(e3, t3, i3) {
            this.i = 0, this.end = i3, this.current = e3, this.value = t3;
          }
          reset() {
            this.i = this.end, this.current = void 0, this.value = void 0;
          }
        }
        t2.AsyncEmitter = class extends m {
          async fireAsync(e3, t3, i3) {
            if (this._listeners) for (this._asyncDeliveryQueue || (this._asyncDeliveryQueue = new o.LinkedList()), ((e4, t4) => {
              if (e4 instanceof g) t4(e4);
              else for (let i4 = 0; i4 < e4.length; i4++) {
                const s3 = e4[i4];
                s3 && t4(s3);
              }
            })(this._listeners, ((t4) => this._asyncDeliveryQueue.push([t4.value, e3]))); this._asyncDeliveryQueue.size > 0 && !t3.isCancellationRequested; ) {
              const [e4, r2] = this._asyncDeliveryQueue.shift(), n2 = [], o2 = { ...r2, token: t3, waitUntil: (t4) => {
                if (Object.isFrozen(n2)) throw new Error("waitUntil can NOT be called asynchronous");
                i3 && (t4 = i3(t4, e4)), n2.push(t4);
              } };
              try {
                e4(o2);
              } catch (e5) {
                (0, s2.onUnexpectedError)(e5);
                continue;
              }
              Object.freeze(n2), await Promise.allSettled(n2).then(((e5) => {
                for (const t4 of e5) "rejected" === t4.status && (0, s2.onUnexpectedError)(t4.reason);
              }));
            }
          }
        };
        class S extends m {
          get isPaused() {
            return 0 !== this._isPaused;
          }
          constructor(e3) {
            super(e3), this._isPaused = 0, this._eventQueue = new o.LinkedList(), this._mergeFn = e3?.merge;
          }
          pause() {
            this._isPaused++;
          }
          resume() {
            if (0 !== this._isPaused && 0 == --this._isPaused) if (this._mergeFn) {
              if (this._eventQueue.size > 0) {
                const e3 = Array.from(this._eventQueue);
                this._eventQueue.clear(), super.fire(this._mergeFn(e3));
              }
            } else for (; !this._isPaused && 0 !== this._eventQueue.size; ) super.fire(this._eventQueue.shift());
          }
          fire(e3) {
            this._size && (0 !== this._isPaused ? this._eventQueue.push(e3) : super.fire(e3));
          }
        }
        t2.PauseableEmitter = S, t2.DebounceEmitter = class extends S {
          constructor(e3) {
            super(e3), this._delay = e3.delay ?? 100;
          }
          fire(e3) {
            this._handle || (this.pause(), this._handle = setTimeout((() => {
              this._handle = void 0, this.resume();
            }), this._delay)), super.fire(e3);
          }
        }, t2.MicrotaskEmitter = class extends m {
          constructor(e3) {
            super(e3), this._queuedEvents = [], this._mergeFn = e3?.merge;
          }
          fire(e3) {
            this.hasListeners() && (this._queuedEvents.push(e3), 1 === this._queuedEvents.length && queueMicrotask((() => {
              this._mergeFn ? super.fire(this._mergeFn(this._queuedEvents)) : this._queuedEvents.forEach(((e4) => super.fire(e4))), this._queuedEvents = [];
            })));
          }
        };
        class b {
          constructor() {
            this.hasListeners = false, this.events = [], this.emitter = new m({ onWillAddFirstListener: () => this.onFirstListenerAdd(), onDidRemoveLastListener: () => this.onLastListenerRemove() });
          }
          get event() {
            return this.emitter.event;
          }
          add(e3) {
            const t3 = { event: e3, listener: null };
            return this.events.push(t3), this.hasListeners && this.hook(t3), (0, n.toDisposable)((0, r.createSingleCallFunction)((() => {
              this.hasListeners && this.unhook(t3);
              const e4 = this.events.indexOf(t3);
              this.events.splice(e4, 1);
            })));
          }
          onFirstListenerAdd() {
            this.hasListeners = true, this.events.forEach(((e3) => this.hook(e3)));
          }
          onLastListenerRemove() {
            this.hasListeners = false, this.events.forEach(((e3) => this.unhook(e3)));
          }
          hook(e3) {
            e3.listener = e3.event(((e4) => this.emitter.fire(e4)));
          }
          unhook(e3) {
            e3.listener?.dispose(), e3.listener = null;
          }
          dispose() {
            this.emitter.dispose();
            for (const e3 of this.events) e3.listener?.dispose();
            this.events = [];
          }
        }
        t2.EventMultiplexer = b, t2.DynamicListEventMultiplexer = class {
          constructor(e3, t3, i3, s3) {
            this._store = new n.DisposableStore();
            const r2 = this._store.add(new b()), o2 = this._store.add(new n.DisposableMap());
            function a2(e4) {
              o2.set(e4, r2.add(s3(e4)));
            }
            for (const t4 of e3) a2(t4);
            this._store.add(t3(((e4) => {
              a2(e4);
            }))), this._store.add(i3(((e4) => {
              o2.deleteAndDispose(e4);
            }))), this.event = r2.event;
          }
          dispose() {
            this._store.dispose();
          }
        }, t2.EventBufferer = class {
          constructor() {
            this.data = [];
          }
          wrapEvent(e3, t3, i3) {
            return (s3, r2, n2) => e3(((e4) => {
              const n3 = this.data[this.data.length - 1];
              if (!t3) return void (n3 ? n3.buffers.push((() => s3.call(r2, e4))) : s3.call(r2, e4));
              const o2 = n3;
              o2 ? (o2.items ??= [], o2.items.push(e4), 0 === o2.buffers.length && n3.buffers.push((() => {
                o2.reducedResult ??= i3 ? o2.items.reduce(t3, i3) : o2.items.reduce(t3), s3.call(r2, o2.reducedResult);
              }))) : s3.call(r2, t3(i3, e4));
            }), void 0, n2);
          }
          bufferEvents(e3) {
            const t3 = { buffers: new Array() };
            this.data.push(t3);
            const i3 = e3();
            return this.data.pop(), t3.buffers.forEach(((e4) => e4())), i3;
          }
        }, t2.Relay = class {
          constructor() {
            this.listening = false, this.inputEvent = l.None, this.inputEventListener = n.Disposable.None, this.emitter = new m({ onDidAddFirstListener: () => {
              this.listening = true, this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter);
            }, onDidRemoveLastListener: () => {
              this.listening = false, this.inputEventListener.dispose();
            } }), this.event = this.emitter.event;
          }
          set input(e3) {
            this.inputEvent = e3, this.listening && (this.inputEventListener.dispose(), this.inputEventListener = e3(this.emitter.fire, this.emitter));
          }
          dispose() {
            this.inputEventListener.dispose(), this.emitter.dispose();
          }
        }, t2.ValueWithChangeEvent = class {
          static const(e3) {
            return new C(e3);
          }
          constructor(e3) {
            this._value = e3, this._onDidChange = new m(), this.onDidChange = this._onDidChange.event;
          }
          get value() {
            return this._value;
          }
          set value(e3) {
            e3 !== this._value && (this._value = e3, this._onDidChange.fire(void 0));
          }
        };
        class C {
          constructor(e3) {
            this.value = e3, this.onDidChange = l.None;
          }
        }
      }, 8841: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.createSingleCallFunction = function(e3, t3) {
          const i2 = this;
          let s2, r = false;
          return function() {
            if (r) return s2;
            if (r = true, t3) try {
              s2 = e3.apply(i2, arguments);
            } finally {
              t3();
            }
            else s2 = e3.apply(i2, arguments);
            return s2;
          };
        };
      }, 6304: function(e2, t2, i2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3);
          var r2 = Object.getOwnPropertyDescriptor(t3, i3);
          r2 && !("get" in r2 ? !t3.__esModule : r2.writable || r2.configurable) || (r2 = { enumerable: true, get: function() {
            return t3[i3];
          } }), Object.defineProperty(e3, s3, r2);
        } : function(e3, t3, i3, s3) {
          void 0 === s3 && (s3 = i3), e3[s3] = t3[i3];
        }), r = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
        } : function(e3, t3) {
          e3.default = t3;
        }), n = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var i3 in e3) "default" !== i3 && Object.prototype.hasOwnProperty.call(e3, i3) && s2(t3, e3, i3);
          return r(t3, e3), t3;
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.StringSHA1 = t2.Hasher = void 0, t2.hash = function(e3) {
          return a(e3, 0);
        }, t2.doHash = a, t2.numberHash = l, t2.stringHash = h, t2.toHexString = _;
        const o = n(i2(1316));
        function a(e3, t3) {
          switch (typeof e3) {
            case "object":
              return null === e3 ? l(349, t3) : Array.isArray(e3) ? (i3 = e3, s3 = l(104579, s3 = t3), i3.reduce(((e4, t4) => a(t4, e4)), s3)) : (function(e4, t4) {
                return t4 = l(181387, t4), Object.keys(e4).sort().reduce(((t5, i4) => (t5 = h(i4, t5), a(e4[i4], t5))), t4);
              })(e3, t3);
            case "string":
              return h(e3, t3);
            case "boolean":
              return (function(e4, t4) {
                return l(e4 ? 433 : 863, t4);
              })(e3, t3);
            case "number":
              return l(e3, t3);
            case "undefined":
              return l(937, t3);
            default:
              return l(617, t3);
          }
          var i3, s3;
        }
        function l(e3, t3) {
          return (t3 << 5) - t3 + e3 | 0;
        }
        function h(e3, t3) {
          t3 = l(149417, t3);
          for (let i3 = 0, s3 = e3.length; i3 < s3; i3++) t3 = l(e3.charCodeAt(i3), t3);
          return t3;
        }
        var c;
        function d(e3, t3, i3 = 32) {
          const s3 = i3 - t3;
          return (e3 << t3 | (~((1 << s3) - 1) & e3) >>> s3) >>> 0;
        }
        function u(e3, t3 = 0, i3 = e3.byteLength, s3 = 0) {
          for (let r2 = 0; r2 < i3; r2++) e3[t3 + r2] = s3;
        }
        function _(e3, t3 = 32) {
          return e3 instanceof ArrayBuffer ? Array.from(new Uint8Array(e3)).map(((e4) => e4.toString(16).padStart(2, "0"))).join("") : (function(e4, t4, i3 = "0") {
            for (; e4.length < t4; ) e4 = i3 + e4;
            return e4;
          })((e3 >>> 0).toString(16), t3 / 4);
        }
        t2.Hasher = class {
          constructor() {
            this._value = 0;
          }
          get value() {
            return this._value;
          }
          hash(e3) {
            return this._value = a(e3, this._value), this._value;
          }
        }, (function(e3) {
          e3[e3.BLOCK_SIZE = 64] = "BLOCK_SIZE", e3[e3.UNICODE_REPLACEMENT = 65533] = "UNICODE_REPLACEMENT";
        })(c || (c = {}));
        class f {
          static {
            this._bigBlock32 = new DataView(new ArrayBuffer(320));
          }
          constructor() {
            this._h0 = 1732584193, this._h1 = 4023233417, this._h2 = 2562383102, this._h3 = 271733878, this._h4 = 3285377520, this._buff = new Uint8Array(c.BLOCK_SIZE + 3), this._buffDV = new DataView(this._buff.buffer), this._buffLen = 0, this._totalLen = 0, this._leftoverHighSurrogate = 0, this._finished = false;
          }
          update(e3) {
            const t3 = e3.length;
            if (0 === t3) return;
            const i3 = this._buff;
            let s3, r2, n2 = this._buffLen, a2 = this._leftoverHighSurrogate;
            for (0 !== a2 ? (s3 = a2, r2 = -1, a2 = 0) : (s3 = e3.charCodeAt(0), r2 = 0); ; ) {
              let l2 = s3;
              if (o.isHighSurrogate(s3)) {
                if (!(r2 + 1 < t3)) {
                  a2 = s3;
                  break;
                }
                {
                  const t4 = e3.charCodeAt(r2 + 1);
                  o.isLowSurrogate(t4) ? (r2++, l2 = o.computeCodePoint(s3, t4)) : l2 = c.UNICODE_REPLACEMENT;
                }
              } else o.isLowSurrogate(s3) && (l2 = c.UNICODE_REPLACEMENT);
              if (n2 = this._push(i3, n2, l2), r2++, !(r2 < t3)) break;
              s3 = e3.charCodeAt(r2);
            }
            this._buffLen = n2, this._leftoverHighSurrogate = a2;
          }
          _push(e3, t3, i3) {
            return i3 < 128 ? e3[t3++] = i3 : i3 < 2048 ? (e3[t3++] = 192 | (1984 & i3) >>> 6, e3[t3++] = 128 | (63 & i3) >>> 0) : i3 < 65536 ? (e3[t3++] = 224 | (61440 & i3) >>> 12, e3[t3++] = 128 | (4032 & i3) >>> 6, e3[t3++] = 128 | (63 & i3) >>> 0) : (e3[t3++] = 240 | (1835008 & i3) >>> 18, e3[t3++] = 128 | (258048 & i3) >>> 12, e3[t3++] = 128 | (4032 & i3) >>> 6, e3[t3++] = 128 | (63 & i3) >>> 0), t3 >= c.BLOCK_SIZE && (this._step(), t3 -= c.BLOCK_SIZE, this._totalLen += c.BLOCK_SIZE, e3[0] = e3[c.BLOCK_SIZE + 0], e3[1] = e3[c.BLOCK_SIZE + 1], e3[2] = e3[c.BLOCK_SIZE + 2]), t3;
          }
          digest() {
            return this._finished || (this._finished = true, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, c.UNICODE_REPLACEMENT)), this._totalLen += this._buffLen, this._wrapUp()), _(this._h0) + _(this._h1) + _(this._h2) + _(this._h3) + _(this._h4);
          }
          _wrapUp() {
            this._buff[this._buffLen++] = 128, u(this._buff, this._buffLen), this._buffLen > 56 && (this._step(), u(this._buff));
            const e3 = 8 * this._totalLen;
            this._buffDV.setUint32(56, Math.floor(e3 / 4294967296), false), this._buffDV.setUint32(60, e3 % 4294967296, false), this._step();
          }
          _step() {
            const e3 = f._bigBlock32, t3 = this._buffDV;
            for (let i4 = 0; i4 < 64; i4 += 4) e3.setUint32(i4, t3.getUint32(i4, false), false);
            for (let t4 = 64; t4 < 320; t4 += 4) e3.setUint32(t4, d(e3.getUint32(t4 - 12, false) ^ e3.getUint32(t4 - 32, false) ^ e3.getUint32(t4 - 56, false) ^ e3.getUint32(t4 - 64, false), 1), false);
            let i3, s3, r2, n2 = this._h0, o2 = this._h1, a2 = this._h2, l2 = this._h3, h2 = this._h4;
            for (let t4 = 0; t4 < 80; t4++) t4 < 20 ? (i3 = o2 & a2 | ~o2 & l2, s3 = 1518500249) : t4 < 40 ? (i3 = o2 ^ a2 ^ l2, s3 = 1859775393) : t4 < 60 ? (i3 = o2 & a2 | o2 & l2 | a2 & l2, s3 = 2400959708) : (i3 = o2 ^ a2 ^ l2, s3 = 3395469782), r2 = d(n2, 5) + i3 + h2 + s3 + e3.getUint32(4 * t4, false) & 4294967295, h2 = l2, l2 = a2, a2 = d(o2, 30), o2 = n2, n2 = r2;
            this._h0 = this._h0 + n2 & 4294967295, this._h1 = this._h1 + o2 & 4294967295, this._h2 = this._h2 + a2 & 4294967295, this._h3 = this._h3 + l2 & 4294967295, this._h4 = this._h4 + h2 & 4294967295;
          }
        }
        t2.StringSHA1 = f;
      }, 4218: (e2, t2) => {
        var i2;
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Iterable = void 0, (function(e3) {
          function t3(e4) {
            return e4 && "object" == typeof e4 && "function" == typeof e4[Symbol.iterator];
          }
          e3.is = t3;
          const i3 = Object.freeze([]);
          function* s2(e4) {
            yield e4;
          }
          e3.empty = function() {
            return i3;
          }, e3.single = s2, e3.wrap = function(e4) {
            return t3(e4) ? e4 : s2(e4);
          }, e3.from = function(e4) {
            return e4 || i3;
          }, e3.reverse = function* (e4) {
            for (let t4 = e4.length - 1; t4 >= 0; t4--) yield e4[t4];
          }, e3.isEmpty = function(e4) {
            return !e4 || true === e4[Symbol.iterator]().next().done;
          }, e3.first = function(e4) {
            return e4[Symbol.iterator]().next().value;
          }, e3.some = function(e4, t4) {
            let i4 = 0;
            for (const s3 of e4) if (t4(s3, i4++)) return true;
            return false;
          }, e3.find = function(e4, t4) {
            for (const i4 of e4) if (t4(i4)) return i4;
          }, e3.filter = function* (e4, t4) {
            for (const i4 of e4) t4(i4) && (yield i4);
          }, e3.map = function* (e4, t4) {
            let i4 = 0;
            for (const s3 of e4) yield t4(s3, i4++);
          }, e3.flatMap = function* (e4, t4) {
            let i4 = 0;
            for (const s3 of e4) yield* t4(s3, i4++);
          }, e3.concat = function* (...e4) {
            for (const t4 of e4) yield* t4;
          }, e3.reduce = function(e4, t4, i4) {
            let s3 = i4;
            for (const i5 of e4) s3 = t4(s3, i5);
            return s3;
          }, e3.slice = function* (e4, t4, i4 = e4.length) {
            for (t4 < 0 && (t4 += e4.length), i4 < 0 ? i4 += e4.length : i4 > e4.length && (i4 = e4.length); t4 < i4; t4++) yield e4[t4];
          }, e3.consume = function(t4, i4 = Number.POSITIVE_INFINITY) {
            const s3 = [];
            if (0 === i4) return [s3, t4];
            const r = t4[Symbol.iterator]();
            for (let t5 = 0; t5 < i4; t5++) {
              const t6 = r.next();
              if (t6.done) return [s3, e3.empty()];
              s3.push(t6.value);
            }
            return [s3, { [Symbol.iterator]: () => r }];
          }, e3.asyncToArray = async function(e4) {
            const t4 = [];
            for await (const i4 of e4) t4.push(i4);
            return Promise.resolve(t4);
          };
        })(i2 || (t2.Iterable = i2 = {}));
      }, 7883: (e2, t2) => {
        var i2, s2;
        Object.defineProperty(t2, "__esModule", { value: true }), t2.KeyMod = t2.KeyCodeUtils = t2.ScanCodeUtils = t2.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE = t2.EVENT_KEY_CODE_MAP = t2.ScanCode = t2.KeyCode = void 0, t2.KeyChord = function(e3, t3) {
          return (e3 | (65535 & t3) << 16 >>> 0) >>> 0;
        }, (function(e3) {
          e3[e3.DependsOnKbLayout = -1] = "DependsOnKbLayout", e3[e3.Unknown = 0] = "Unknown", e3[e3.Backspace = 1] = "Backspace", e3[e3.Tab = 2] = "Tab", e3[e3.Enter = 3] = "Enter", e3[e3.Shift = 4] = "Shift", e3[e3.Ctrl = 5] = "Ctrl", e3[e3.Alt = 6] = "Alt", e3[e3.PauseBreak = 7] = "PauseBreak", e3[e3.CapsLock = 8] = "CapsLock", e3[e3.Escape = 9] = "Escape", e3[e3.Space = 10] = "Space", e3[e3.PageUp = 11] = "PageUp", e3[e3.PageDown = 12] = "PageDown", e3[e3.End = 13] = "End", e3[e3.Home = 14] = "Home", e3[e3.LeftArrow = 15] = "LeftArrow", e3[e3.UpArrow = 16] = "UpArrow", e3[e3.RightArrow = 17] = "RightArrow", e3[e3.DownArrow = 18] = "DownArrow", e3[e3.Insert = 19] = "Insert", e3[e3.Delete = 20] = "Delete", e3[e3.Digit0 = 21] = "Digit0", e3[e3.Digit1 = 22] = "Digit1", e3[e3.Digit2 = 23] = "Digit2", e3[e3.Digit3 = 24] = "Digit3", e3[e3.Digit4 = 25] = "Digit4", e3[e3.Digit5 = 26] = "Digit5", e3[e3.Digit6 = 27] = "Digit6", e3[e3.Digit7 = 28] = "Digit7", e3[e3.Digit8 = 29] = "Digit8", e3[e3.Digit9 = 30] = "Digit9", e3[e3.KeyA = 31] = "KeyA", e3[e3.KeyB = 32] = "KeyB", e3[e3.KeyC = 33] = "KeyC", e3[e3.KeyD = 34] = "KeyD", e3[e3.KeyE = 35] = "KeyE", e3[e3.KeyF = 36] = "KeyF", e3[e3.KeyG = 37] = "KeyG", e3[e3.KeyH = 38] = "KeyH", e3[e3.KeyI = 39] = "KeyI", e3[e3.KeyJ = 40] = "KeyJ", e3[e3.KeyK = 41] = "KeyK", e3[e3.KeyL = 42] = "KeyL", e3[e3.KeyM = 43] = "KeyM", e3[e3.KeyN = 44] = "KeyN", e3[e3.KeyO = 45] = "KeyO", e3[e3.KeyP = 46] = "KeyP", e3[e3.KeyQ = 47] = "KeyQ", e3[e3.KeyR = 48] = "KeyR", e3[e3.KeyS = 49] = "KeyS", e3[e3.KeyT = 50] = "KeyT", e3[e3.KeyU = 51] = "KeyU", e3[e3.KeyV = 52] = "KeyV", e3[e3.KeyW = 53] = "KeyW", e3[e3.KeyX = 54] = "KeyX", e3[e3.KeyY = 55] = "KeyY", e3[e3.KeyZ = 56] = "KeyZ", e3[e3.Meta = 57] = "Meta", e3[e3.ContextMenu = 58] = "ContextMenu", e3[e3.F1 = 59] = "F1", e3[e3.F2 = 60] = "F2", e3[e3.F3 = 61] = "F3", e3[e3.F4 = 62] = "F4", e3[e3.F5 = 63] = "F5", e3[e3.F6 = 64] = "F6", e3[e3.F7 = 65] = "F7", e3[e3.F8 = 66] = "F8", e3[e3.F9 = 67] = "F9", e3[e3.F10 = 68] = "F10", e3[e3.F11 = 69] = "F11", e3[e3.F12 = 70] = "F12", e3[e3.F13 = 71] = "F13", e3[e3.F14 = 72] = "F14", e3[e3.F15 = 73] = "F15", e3[e3.F16 = 74] = "F16", e3[e3.F17 = 75] = "F17", e3[e3.F18 = 76] = "F18", e3[e3.F19 = 77] = "F19", e3[e3.F20 = 78] = "F20", e3[e3.F21 = 79] = "F21", e3[e3.F22 = 80] = "F22", e3[e3.F23 = 81] = "F23", e3[e3.F24 = 82] = "F24", e3[e3.NumLock = 83] = "NumLock", e3[e3.ScrollLock = 84] = "ScrollLock", e3[e3.Semicolon = 85] = "Semicolon", e3[e3.Equal = 86] = "Equal", e3[e3.Comma = 87] = "Comma", e3[e3.Minus = 88] = "Minus", e3[e3.Period = 89] = "Period", e3[e3.Slash = 90] = "Slash", e3[e3.Backquote = 91] = "Backquote", e3[e3.BracketLeft = 92] = "BracketLeft", e3[e3.Backslash = 93] = "Backslash", e3[e3.BracketRight = 94] = "BracketRight", e3[e3.Quote = 95] = "Quote", e3[e3.OEM_8 = 96] = "OEM_8", e3[e3.IntlBackslash = 97] = "IntlBackslash", e3[e3.Numpad0 = 98] = "Numpad0", e3[e3.Numpad1 = 99] = "Numpad1", e3[e3.Numpad2 = 100] = "Numpad2", e3[e3.Numpad3 = 101] = "Numpad3", e3[e3.Numpad4 = 102] = "Numpad4", e3[e3.Numpad5 = 103] = "Numpad5", e3[e3.Numpad6 = 104] = "Numpad6", e3[e3.Numpad7 = 105] = "Numpad7", e3[e3.Numpad8 = 106] = "Numpad8", e3[e3.Numpad9 = 107] = "Numpad9", e3[e3.NumpadMultiply = 108] = "NumpadMultiply", e3[e3.NumpadAdd = 109] = "NumpadAdd", e3[e3.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", e3[e3.NumpadSubtract = 111] = "NumpadSubtract", e3[e3.NumpadDecimal = 112] = "NumpadDecimal", e3[e3.NumpadDivide = 113] = "NumpadDivide", e3[e3.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", e3[e3.ABNT_C1 = 115] = "ABNT_C1", e3[e3.ABNT_C2 = 116] = "ABNT_C2", e3[e3.AudioVolumeMute = 117] = "AudioVolumeMute", e3[e3.AudioVolumeUp = 118] = "AudioVolumeUp", e3[e3.AudioVolumeDown = 119] = "AudioVolumeDown", e3[e3.BrowserSearch = 120] = "BrowserSearch", e3[e3.BrowserHome = 121] = "BrowserHome", e3[e3.BrowserBack = 122] = "BrowserBack", e3[e3.BrowserForward = 123] = "BrowserForward", e3[e3.MediaTrackNext = 124] = "MediaTrackNext", e3[e3.MediaTrackPrevious = 125] = "MediaTrackPrevious", e3[e3.MediaStop = 126] = "MediaStop", e3[e3.MediaPlayPause = 127] = "MediaPlayPause", e3[e3.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", e3[e3.LaunchMail = 129] = "LaunchMail", e3[e3.LaunchApp2 = 130] = "LaunchApp2", e3[e3.Clear = 131] = "Clear", e3[e3.MAX_VALUE = 132] = "MAX_VALUE";
        })(i2 || (t2.KeyCode = i2 = {})), (function(e3) {
          e3[e3.DependsOnKbLayout = -1] = "DependsOnKbLayout", e3[e3.None = 0] = "None", e3[e3.Hyper = 1] = "Hyper", e3[e3.Super = 2] = "Super", e3[e3.Fn = 3] = "Fn", e3[e3.FnLock = 4] = "FnLock", e3[e3.Suspend = 5] = "Suspend", e3[e3.Resume = 6] = "Resume", e3[e3.Turbo = 7] = "Turbo", e3[e3.Sleep = 8] = "Sleep", e3[e3.WakeUp = 9] = "WakeUp", e3[e3.KeyA = 10] = "KeyA", e3[e3.KeyB = 11] = "KeyB", e3[e3.KeyC = 12] = "KeyC", e3[e3.KeyD = 13] = "KeyD", e3[e3.KeyE = 14] = "KeyE", e3[e3.KeyF = 15] = "KeyF", e3[e3.KeyG = 16] = "KeyG", e3[e3.KeyH = 17] = "KeyH", e3[e3.KeyI = 18] = "KeyI", e3[e3.KeyJ = 19] = "KeyJ", e3[e3.KeyK = 20] = "KeyK", e3[e3.KeyL = 21] = "KeyL", e3[e3.KeyM = 22] = "KeyM", e3[e3.KeyN = 23] = "KeyN", e3[e3.KeyO = 24] = "KeyO", e3[e3.KeyP = 25] = "KeyP", e3[e3.KeyQ = 26] = "KeyQ", e3[e3.KeyR = 27] = "KeyR", e3[e3.KeyS = 28] = "KeyS", e3[e3.KeyT = 29] = "KeyT", e3[e3.KeyU = 30] = "KeyU", e3[e3.KeyV = 31] = "KeyV", e3[e3.KeyW = 32] = "KeyW", e3[e3.KeyX = 33] = "KeyX", e3[e3.KeyY = 34] = "KeyY", e3[e3.KeyZ = 35] = "KeyZ", e3[e3.Digit1 = 36] = "Digit1", e3[e3.Digit2 = 37] = "Digit2", e3[e3.Digit3 = 38] = "Digit3", e3[e3.Digit4 = 39] = "Digit4", e3[e3.Digit5 = 40] = "Digit5", e3[e3.Digit6 = 41] = "Digit6", e3[e3.Digit7 = 42] = "Digit7", e3[e3.Digit8 = 43] = "Digit8", e3[e3.Digit9 = 44] = "Digit9", e3[e3.Digit0 = 45] = "Digit0", e3[e3.Enter = 46] = "Enter", e3[e3.Escape = 47] = "Escape", e3[e3.Backspace = 48] = "Backspace", e3[e3.Tab = 49] = "Tab", e3[e3.Space = 50] = "Space", e3[e3.Minus = 51] = "Minus", e3[e3.Equal = 52] = "Equal", e3[e3.BracketLeft = 53] = "BracketLeft", e3[e3.BracketRight = 54] = "BracketRight", e3[e3.Backslash = 55] = "Backslash", e3[e3.IntlHash = 56] = "IntlHash", e3[e3.Semicolon = 57] = "Semicolon", e3[e3.Quote = 58] = "Quote", e3[e3.Backquote = 59] = "Backquote", e3[e3.Comma = 60] = "Comma", e3[e3.Period = 61] = "Period", e3[e3.Slash = 62] = "Slash", e3[e3.CapsLock = 63] = "CapsLock", e3[e3.F1 = 64] = "F1", e3[e3.F2 = 65] = "F2", e3[e3.F3 = 66] = "F3", e3[e3.F4 = 67] = "F4", e3[e3.F5 = 68] = "F5", e3[e3.F6 = 69] = "F6", e3[e3.F7 = 70] = "F7", e3[e3.F8 = 71] = "F8", e3[e3.F9 = 72] = "F9", e3[e3.F10 = 73] = "F10", e3[e3.F11 = 74] = "F11", e3[e3.F12 = 75] = "F12", e3[e3.PrintScreen = 76] = "PrintScreen", e3[e3.ScrollLock = 77] = "ScrollLock", e3[e3.Pause = 78] = "Pause", e3[e3.Insert = 79] = "Insert", e3[e3.Home = 80] = "Home", e3[e3.PageUp = 81] = "PageUp", e3[e3.Delete = 82] = "Delete", e3[e3.End = 83] = "End", e3[e3.PageDown = 84] = "PageDown", e3[e3.ArrowRight = 85] = "ArrowRight", e3[e3.ArrowLeft = 86] = "ArrowLeft", e3[e3.ArrowDown = 87] = "ArrowDown", e3[e3.ArrowUp = 88] = "ArrowUp", e3[e3.NumLock = 89] = "NumLock", e3[e3.NumpadDivide = 90] = "NumpadDivide", e3[e3.NumpadMultiply = 91] = "NumpadMultiply", e3[e3.NumpadSubtract = 92] = "NumpadSubtract", e3[e3.NumpadAdd = 93] = "NumpadAdd", e3[e3.NumpadEnter = 94] = "NumpadEnter", e3[e3.Numpad1 = 95] = "Numpad1", e3[e3.Numpad2 = 96] = "Numpad2", e3[e3.Numpad3 = 97] = "Numpad3", e3[e3.Numpad4 = 98] = "Numpad4", e3[e3.Numpad5 = 99] = "Numpad5", e3[e3.Numpad6 = 100] = "Numpad6", e3[e3.Numpad7 = 101] = "Numpad7", e3[e3.Numpad8 = 102] = "Numpad8", e3[e3.Numpad9 = 103] = "Numpad9", e3[e3.Numpad0 = 104] = "Numpad0", e3[e3.NumpadDecimal = 105] = "NumpadDecimal", e3[e3.IntlBackslash = 106] = "IntlBackslash", e3[e3.ContextMenu = 107] = "ContextMenu", e3[e3.Power = 108] = "Power", e3[e3.NumpadEqual = 109] = "NumpadEqual", e3[e3.F13 = 110] = "F13", e3[e3.F14 = 111] = "F14", e3[e3.F15 = 112] = "F15", e3[e3.F16 = 113] = "F16", e3[e3.F17 = 114] = "F17", e3[e3.F18 = 115] = "F18", e3[e3.F19 = 116] = "F19", e3[e3.F20 = 117] = "F20", e3[e3.F21 = 118] = "F21", e3[e3.F22 = 119] = "F22", e3[e3.F23 = 120] = "F23", e3[e3.F24 = 121] = "F24", e3[e3.Open = 122] = "Open", e3[e3.Help = 123] = "Help", e3[e3.Select = 124] = "Select", e3[e3.Again = 125] = "Again", e3[e3.Undo = 126] = "Undo", e3[e3.Cut = 127] = "Cut", e3[e3.Copy = 128] = "Copy", e3[e3.Paste = 129] = "Paste", e3[e3.Find = 130] = "Find", e3[e3.AudioVolumeMute = 131] = "AudioVolumeMute", e3[e3.AudioVolumeUp = 132] = "AudioVolumeUp", e3[e3.AudioVolumeDown = 133] = "AudioVolumeDown", e3[e3.NumpadComma = 134] = "NumpadComma", e3[e3.IntlRo = 135] = "IntlRo", e3[e3.KanaMode = 136] = "KanaMode", e3[e3.IntlYen = 137] = "IntlYen", e3[e3.Convert = 138] = "Convert", e3[e3.NonConvert = 139] = "NonConvert", e3[e3.Lang1 = 140] = "Lang1", e3[e3.Lang2 = 141] = "Lang2", e3[e3.Lang3 = 142] = "Lang3", e3[e3.Lang4 = 143] = "Lang4", e3[e3.Lang5 = 144] = "Lang5", e3[e3.Abort = 145] = "Abort", e3[e3.Props = 146] = "Props", e3[e3.NumpadParenLeft = 147] = "NumpadParenLeft", e3[e3.NumpadParenRight = 148] = "NumpadParenRight", e3[e3.NumpadBackspace = 149] = "NumpadBackspace", e3[e3.NumpadMemoryStore = 150] = "NumpadMemoryStore", e3[e3.NumpadMemoryRecall = 151] = "NumpadMemoryRecall", e3[e3.NumpadMemoryClear = 152] = "NumpadMemoryClear", e3[e3.NumpadMemoryAdd = 153] = "NumpadMemoryAdd", e3[e3.NumpadMemorySubtract = 154] = "NumpadMemorySubtract", e3[e3.NumpadClear = 155] = "NumpadClear", e3[e3.NumpadClearEntry = 156] = "NumpadClearEntry", e3[e3.ControlLeft = 157] = "ControlLeft", e3[e3.ShiftLeft = 158] = "ShiftLeft", e3[e3.AltLeft = 159] = "AltLeft", e3[e3.MetaLeft = 160] = "MetaLeft", e3[e3.ControlRight = 161] = "ControlRight", e3[e3.ShiftRight = 162] = "ShiftRight", e3[e3.AltRight = 163] = "AltRight", e3[e3.MetaRight = 164] = "MetaRight", e3[e3.BrightnessUp = 165] = "BrightnessUp", e3[e3.BrightnessDown = 166] = "BrightnessDown", e3[e3.MediaPlay = 167] = "MediaPlay", e3[e3.MediaRecord = 168] = "MediaRecord", e3[e3.MediaFastForward = 169] = "MediaFastForward", e3[e3.MediaRewind = 170] = "MediaRewind", e3[e3.MediaTrackNext = 171] = "MediaTrackNext", e3[e3.MediaTrackPrevious = 172] = "MediaTrackPrevious", e3[e3.MediaStop = 173] = "MediaStop", e3[e3.Eject = 174] = "Eject", e3[e3.MediaPlayPause = 175] = "MediaPlayPause", e3[e3.MediaSelect = 176] = "MediaSelect", e3[e3.LaunchMail = 177] = "LaunchMail", e3[e3.LaunchApp2 = 178] = "LaunchApp2", e3[e3.LaunchApp1 = 179] = "LaunchApp1", e3[e3.SelectTask = 180] = "SelectTask", e3[e3.LaunchScreenSaver = 181] = "LaunchScreenSaver", e3[e3.BrowserSearch = 182] = "BrowserSearch", e3[e3.BrowserHome = 183] = "BrowserHome", e3[e3.BrowserBack = 184] = "BrowserBack", e3[e3.BrowserForward = 185] = "BrowserForward", e3[e3.BrowserStop = 186] = "BrowserStop", e3[e3.BrowserRefresh = 187] = "BrowserRefresh", e3[e3.BrowserFavorites = 188] = "BrowserFavorites", e3[e3.ZoomToggle = 189] = "ZoomToggle", e3[e3.MailReply = 190] = "MailReply", e3[e3.MailForward = 191] = "MailForward", e3[e3.MailSend = 192] = "MailSend", e3[e3.MAX_VALUE = 193] = "MAX_VALUE";
        })(s2 || (t2.ScanCode = s2 = {}));
        class r {
          constructor() {
            this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
          }
          define(e3, t3) {
            this._keyCodeToStr[e3] = t3, this._strToKeyCode[t3.toLowerCase()] = e3;
          }
          keyCodeToStr(e3) {
            return this._keyCodeToStr[e3];
          }
          strToKeyCode(e3) {
            return this._strToKeyCode[e3.toLowerCase()] || i2.Unknown;
          }
        }
        const n = new r(), o = new r(), a = new r();
        t2.EVENT_KEY_CODE_MAP = new Array(230), t2.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE = {};
        const l = [], h = /* @__PURE__ */ Object.create(null), c = /* @__PURE__ */ Object.create(null);
        var d, u;
        t2.ScanCodeUtils = { lowerCaseToEnum: (e3) => c[e3] || s2.None, toEnum: (e3) => h[e3] || s2.None, toString: (e3) => l[e3] || "None" }, (function(e3) {
          e3.toString = function(e4) {
            return n.keyCodeToStr(e4);
          }, e3.fromString = function(e4) {
            return n.strToKeyCode(e4);
          }, e3.toUserSettingsUS = function(e4) {
            return o.keyCodeToStr(e4);
          }, e3.toUserSettingsGeneral = function(e4) {
            return a.keyCodeToStr(e4);
          }, e3.fromUserSettings = function(e4) {
            return o.strToKeyCode(e4) || a.strToKeyCode(e4);
          }, e3.toElectronAccelerator = function(e4) {
            if (e4 >= i2.Numpad0 && e4 <= i2.NumpadDivide) return null;
            switch (e4) {
              case i2.UpArrow:
                return "Up";
              case i2.DownArrow:
                return "Down";
              case i2.LeftArrow:
                return "Left";
              case i2.RightArrow:
                return "Right";
            }
            return n.keyCodeToStr(e4);
          };
        })(d || (t2.KeyCodeUtils = d = {})), (function(e3) {
          e3[e3.CtrlCmd = 2048] = "CtrlCmd", e3[e3.Shift = 1024] = "Shift", e3[e3.Alt = 512] = "Alt", e3[e3.WinCtrl = 256] = "WinCtrl";
        })(u || (t2.KeyMod = u = {}));
      }, 2811: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ResolvedKeybinding = t2.ResolvedChord = t2.Keybinding = t2.ScanCodeChord = t2.KeyCodeChord = void 0, t2.decodeKeybinding = function(e3, t3) {
          if ("number" == typeof e3) {
            if (0 === e3) return null;
            const i3 = (65535 & e3) >>> 0, s3 = (4294901760 & e3) >>> 16;
            return new c(0 !== s3 ? [a(i3, t3), a(s3, t3)] : [a(i3, t3)]);
          }
          {
            const i3 = [];
            for (let s3 = 0; s3 < e3.length; s3++) i3.push(a(e3[s3], t3));
            return new c(i3);
          }
        }, t2.createSimpleKeybinding = a;
        const s2 = i2(9807), r = i2(7883), n = i2(8163);
        var o;
        function a(e3, t3) {
          const i3 = !!(e3 & o.CtrlCmd), s3 = !!(e3 & o.WinCtrl), r2 = t3 === n.OperatingSystem.Macintosh ? s3 : i3, a2 = !!(e3 & o.Shift), h2 = !!(e3 & o.Alt), c2 = t3 === n.OperatingSystem.Macintosh ? i3 : s3, d = e3 & o.KeyCode;
          return new l(r2, a2, h2, c2, d);
        }
        !(function(e3) {
          e3[e3.CtrlCmd = 2048] = "CtrlCmd", e3[e3.Shift = 1024] = "Shift", e3[e3.Alt = 512] = "Alt", e3[e3.WinCtrl = 256] = "WinCtrl", e3[e3.KeyCode = 255] = "KeyCode";
        })(o || (o = {}));
        class l {
          constructor(e3, t3, i3, s3, r2) {
            this.ctrlKey = e3, this.shiftKey = t3, this.altKey = i3, this.metaKey = s3, this.keyCode = r2;
          }
          equals(e3) {
            return e3 instanceof l && this.ctrlKey === e3.ctrlKey && this.shiftKey === e3.shiftKey && this.altKey === e3.altKey && this.metaKey === e3.metaKey && this.keyCode === e3.keyCode;
          }
          getHashCode() {
            return `K${this.ctrlKey ? "1" : "0"}${this.shiftKey ? "1" : "0"}${this.altKey ? "1" : "0"}${this.metaKey ? "1" : "0"}${this.keyCode}`;
          }
          isModifierKey() {
            return this.keyCode === r.KeyCode.Unknown || this.keyCode === r.KeyCode.Ctrl || this.keyCode === r.KeyCode.Meta || this.keyCode === r.KeyCode.Alt || this.keyCode === r.KeyCode.Shift;
          }
          toKeybinding() {
            return new c([this]);
          }
          isDuplicateModifierCase() {
            return this.ctrlKey && this.keyCode === r.KeyCode.Ctrl || this.shiftKey && this.keyCode === r.KeyCode.Shift || this.altKey && this.keyCode === r.KeyCode.Alt || this.metaKey && this.keyCode === r.KeyCode.Meta;
          }
        }
        t2.KeyCodeChord = l;
        class h {
          constructor(e3, t3, i3, s3, r2) {
            this.ctrlKey = e3, this.shiftKey = t3, this.altKey = i3, this.metaKey = s3, this.scanCode = r2;
          }
          equals(e3) {
            return e3 instanceof h && this.ctrlKey === e3.ctrlKey && this.shiftKey === e3.shiftKey && this.altKey === e3.altKey && this.metaKey === e3.metaKey && this.scanCode === e3.scanCode;
          }
          getHashCode() {
            return `S${this.ctrlKey ? "1" : "0"}${this.shiftKey ? "1" : "0"}${this.altKey ? "1" : "0"}${this.metaKey ? "1" : "0"}${this.scanCode}`;
          }
          isDuplicateModifierCase() {
            return this.ctrlKey && (this.scanCode === r.ScanCode.ControlLeft || this.scanCode === r.ScanCode.ControlRight) || this.shiftKey && (this.scanCode === r.ScanCode.ShiftLeft || this.scanCode === r.ScanCode.ShiftRight) || this.altKey && (this.scanCode === r.ScanCode.AltLeft || this.scanCode === r.ScanCode.AltRight) || this.metaKey && (this.scanCode === r.ScanCode.MetaLeft || this.scanCode === r.ScanCode.MetaRight);
          }
        }
        t2.ScanCodeChord = h;
        class c {
          constructor(e3) {
            if (0 === e3.length) throw (0, s2.illegalArgument)("chords");
            this.chords = e3;
          }
          getHashCode() {
            let e3 = "";
            for (let t3 = 0, i3 = this.chords.length; t3 < i3; t3++) 0 !== t3 && (e3 += ";"), e3 += this.chords[t3].getHashCode();
            return e3;
          }
          equals(e3) {
            if (null === e3) return false;
            if (this.chords.length !== e3.chords.length) return false;
            for (let t3 = 0; t3 < this.chords.length; t3++) if (!this.chords[t3].equals(e3.chords[t3])) return false;
            return true;
          }
        }
        t2.Keybinding = c, t2.ResolvedChord = class {
          constructor(e3, t3, i3, s3, r2, n2) {
            this.ctrlKey = e3, this.shiftKey = t3, this.altKey = i3, this.metaKey = s3, this.keyLabel = r2, this.keyAriaLabel = n2;
          }
        }, t2.ResolvedKeybinding = class {
        };
      }, 626: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Lazy = void 0, t2.Lazy = class {
          constructor(e3) {
            this.executor = e3, this._didRun = false;
          }
          get hasValue() {
            return this._didRun;
          }
          get value() {
            if (!this._didRun) try {
              this._value = this.executor();
            } catch (e3) {
              this._error = e3;
            } finally {
              this._didRun = true;
            }
            if (this._error) throw this._error;
            return this._value;
          }
          get rawValue() {
            return this._value;
          }
        };
      }, 7150: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DisposableMap = t2.ImmortalReference = t2.AsyncReferenceCollection = t2.ReferenceCollection = t2.SafeDisposable = t2.RefCountedDisposable = t2.MandatoryMutableDisposable = t2.MutableDisposable = t2.Disposable = t2.DisposableStore = t2.DisposableTracker = void 0, t2.setDisposableTracker = function(e3) {
          l = e3;
        }, t2.trackDisposable = c, t2.markAsDisposed = d, t2.markAsSingleton = function(e3) {
          return l?.markAsSingleton(e3), e3;
        }, t2.isDisposable = _, t2.dispose = f, t2.disposeIfDisposable = function(e3) {
          for (const t3 of e3) _(t3) && t3.dispose();
          return [];
        }, t2.combinedDisposable = function(...e3) {
          const t3 = p((() => f(e3)));
          return (function(e4, t4) {
            if (l) for (const i3 of e4) l.setParent(i3, t4);
          })(e3, t3), t3;
        }, t2.toDisposable = p, t2.disposeOnReturn = function(e3) {
          const t3 = new g();
          try {
            e3(t3);
          } finally {
            t3.dispose();
          }
        };
        const s2 = i2(3058), r = i2(9087), n = i2(2608), o = i2(8841), a = i2(4218);
        let l = null;
        class h {
          constructor() {
            this.livingDisposables = /* @__PURE__ */ new Map();
          }
          static {
            this.idx = 0;
          }
          getDisposableData(e3) {
            let t3 = this.livingDisposables.get(e3);
            return t3 || (t3 = { parent: null, source: null, isSingleton: false, value: e3, idx: h.idx++ }, this.livingDisposables.set(e3, t3)), t3;
          }
          trackDisposable(e3) {
            const t3 = this.getDisposableData(e3);
            t3.source || (t3.source = new Error().stack);
          }
          setParent(e3, t3) {
            this.getDisposableData(e3).parent = t3;
          }
          markAsDisposed(e3) {
            this.livingDisposables.delete(e3);
          }
          markAsSingleton(e3) {
            this.getDisposableData(e3).isSingleton = true;
          }
          getRootParent(e3, t3) {
            const i3 = t3.get(e3);
            if (i3) return i3;
            const s3 = e3.parent ? this.getRootParent(this.getDisposableData(e3.parent), t3) : e3;
            return t3.set(e3, s3), s3;
          }
          getTrackedDisposables() {
            const e3 = /* @__PURE__ */ new Map();
            return [...this.livingDisposables.entries()].filter((([, t3]) => null !== t3.source && !this.getRootParent(t3, e3).isSingleton)).flatMap((([e4]) => e4));
          }
          computeLeakingDisposables(e3 = 10, t3) {
            let i3;
            if (t3) i3 = t3;
            else {
              const e4 = /* @__PURE__ */ new Map(), t4 = [...this.livingDisposables.values()].filter(((t5) => null !== t5.source && !this.getRootParent(t5, e4).isSingleton));
              if (0 === t4.length) return;
              const s3 = new Set(t4.map(((e5) => e5.value)));
              if (i3 = t4.filter(((e5) => !(e5.parent && s3.has(e5.parent)))), 0 === i3.length) throw new Error("There are cyclic diposable chains!");
            }
            if (!i3) return;
            function o2(e4) {
              const t4 = e4.source.split("\n").map(((e5) => e5.trim().replace("at ", ""))).filter(((e5) => "" !== e5));
              return (function(e5, t5) {
                for (; e5.length > 0 && t5.some(((t6) => "string" == typeof t6 ? t6 === e5[0] : e5[0].match(t6))); ) e5.shift();
              })(t4, ["Error", /^trackDisposable \(.*\)$/, /^DisposableTracker.trackDisposable \(.*\)$/]), t4.reverse();
            }
            const a2 = new n.SetMap();
            for (const e4 of i3) {
              const t4 = o2(e4);
              for (let i4 = 0; i4 <= t4.length; i4++) a2.add(t4.slice(0, i4).join("\n"), e4);
            }
            i3.sort((0, s2.compareBy)(((e4) => e4.idx), s2.numberComparator));
            let l2 = "", h2 = 0;
            for (const t4 of i3.slice(0, e3)) {
              h2++;
              const e4 = o2(t4), s3 = [];
              for (let t5 = 0; t5 < e4.length; t5++) {
                let n2 = e4[t5];
                n2 = `(shared with ${a2.get(e4.slice(0, t5 + 1).join("\n")).size}/${i3.length} leaks) at ${n2}`;
                const l3 = a2.get(e4.slice(0, t5).join("\n")), h3 = (0, r.groupBy)([...l3].map(((e5) => o2(e5)[t5])), ((e5) => e5));
                delete h3[e4[t5]];
                for (const [e5, t6] of Object.entries(h3)) s3.unshift(`    - stacktraces of ${t6.length} other leaks continue with ${e5}`);
                s3.unshift(n2);
              }
              l2 += `


==================== Leaking disposable ${h2}/${i3.length}: ${t4.value.constructor.name} ====================
${s3.join("\n")}
============================================================

`;
            }
            return i3.length > e3 && (l2 += `


... and ${i3.length - e3} more leaking disposables

`), { leaks: i3, details: l2 };
          }
        }
        function c(e3) {
          return l?.trackDisposable(e3), e3;
        }
        function d(e3) {
          l?.markAsDisposed(e3);
        }
        function u(e3, t3) {
          l?.setParent(e3, t3);
        }
        function _(e3) {
          return "object" == typeof e3 && null !== e3 && "function" == typeof e3.dispose && 0 === e3.dispose.length;
        }
        function f(e3) {
          if (a.Iterable.is(e3)) {
            const t3 = [];
            for (const i3 of e3) if (i3) try {
              i3.dispose();
            } catch (e4) {
              t3.push(e4);
            }
            if (1 === t3.length) throw t3[0];
            if (t3.length > 1) throw new AggregateError(t3, "Encountered errors while disposing of store");
            return Array.isArray(e3) ? [] : e3;
          }
          if (e3) return e3.dispose(), e3;
        }
        function p(e3) {
          const t3 = c({ dispose: (0, o.createSingleCallFunction)((() => {
            d(t3), e3();
          })) });
          return t3;
        }
        t2.DisposableTracker = h;
        class g {
          static {
            this.DISABLE_DISPOSED_WARNING = false;
          }
          constructor() {
            this._toDispose = /* @__PURE__ */ new Set(), this._isDisposed = false, c(this);
          }
          dispose() {
            this._isDisposed || (d(this), this._isDisposed = true, this.clear());
          }
          get isDisposed() {
            return this._isDisposed;
          }
          clear() {
            if (0 !== this._toDispose.size) try {
              f(this._toDispose);
            } finally {
              this._toDispose.clear();
            }
          }
          add(e3) {
            if (!e3) return e3;
            if (e3 === this) throw new Error("Cannot register a disposable on itself!");
            return u(e3, this), this._isDisposed ? g.DISABLE_DISPOSED_WARNING || console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack) : this._toDispose.add(e3), e3;
          }
          delete(e3) {
            if (e3) {
              if (e3 === this) throw new Error("Cannot dispose a disposable on itself!");
              this._toDispose.delete(e3), e3.dispose();
            }
          }
          deleteAndLeak(e3) {
            e3 && this._toDispose.has(e3) && (this._toDispose.delete(e3), u(e3, null));
          }
        }
        t2.DisposableStore = g;
        class m {
          static {
            this.None = Object.freeze({ dispose() {
            } });
          }
          constructor() {
            this._store = new g(), c(this), u(this._store, this);
          }
          dispose() {
            d(this), this._store.dispose();
          }
          _register(e3) {
            if (e3 === this) throw new Error("Cannot register a disposable on itself!");
            return this._store.add(e3);
          }
        }
        t2.Disposable = m;
        class v {
          constructor() {
            this._isDisposed = false, c(this);
          }
          get value() {
            return this._isDisposed ? void 0 : this._value;
          }
          set value(e3) {
            this._isDisposed || e3 === this._value || (this._value?.dispose(), e3 && u(e3, this), this._value = e3);
          }
          clear() {
            this.value = void 0;
          }
          dispose() {
            this._isDisposed = true, d(this), this._value?.dispose(), this._value = void 0;
          }
          clearAndLeak() {
            const e3 = this._value;
            return this._value = void 0, e3 && u(e3, null), e3;
          }
        }
        t2.MutableDisposable = v, t2.MandatoryMutableDisposable = class {
          constructor(e3) {
            this._disposable = new v(), this._isDisposed = false, this._disposable.value = e3;
          }
          get value() {
            return this._disposable.value;
          }
          set value(e3) {
            this._isDisposed || e3 === this._disposable.value || (this._disposable.value = e3);
          }
          dispose() {
            this._isDisposed = true, this._disposable.dispose();
          }
        }, t2.RefCountedDisposable = class {
          constructor(e3) {
            this._disposable = e3, this._counter = 1;
          }
          acquire() {
            return this._counter++, this;
          }
          release() {
            return 0 == --this._counter && this._disposable.dispose(), this;
          }
        }, t2.SafeDisposable = class {
          constructor() {
            this.dispose = () => {
            }, this.unset = () => {
            }, this.isset = () => false, c(this);
          }
          set(e3) {
            let t3 = e3;
            return this.unset = () => t3 = void 0, this.isset = () => void 0 !== t3, this.dispose = () => {
              t3 && (t3(), t3 = void 0, d(this));
            }, this;
          }
        }, t2.ReferenceCollection = class {
          constructor() {
            this.references = /* @__PURE__ */ new Map();
          }
          acquire(e3, ...t3) {
            let i3 = this.references.get(e3);
            i3 || (i3 = { counter: 0, object: this.createReferencedObject(e3, ...t3) }, this.references.set(e3, i3));
            const { object: s3 } = i3, r2 = (0, o.createSingleCallFunction)((() => {
              0 == --i3.counter && (this.destroyReferencedObject(e3, i3.object), this.references.delete(e3));
            }));
            return i3.counter++, { object: s3, dispose: r2 };
          }
        }, t2.AsyncReferenceCollection = class {
          constructor(e3) {
            this.referenceCollection = e3;
          }
          async acquire(e3, ...t3) {
            const i3 = this.referenceCollection.acquire(e3, ...t3);
            try {
              return { object: await i3.object, dispose: () => i3.dispose() };
            } catch (e4) {
              throw i3.dispose(), e4;
            }
          }
        }, t2.ImmortalReference = class {
          constructor(e3) {
            this.object = e3;
          }
          dispose() {
          }
        };
        class S {
          constructor() {
            this._store = /* @__PURE__ */ new Map(), this._isDisposed = false, c(this);
          }
          dispose() {
            d(this), this._isDisposed = true, this.clearAndDisposeAll();
          }
          clearAndDisposeAll() {
            if (this._store.size) try {
              f(this._store.values());
            } finally {
              this._store.clear();
            }
          }
          has(e3) {
            return this._store.has(e3);
          }
          get size() {
            return this._store.size;
          }
          get(e3) {
            return this._store.get(e3);
          }
          set(e3, t3, i3 = false) {
            this._isDisposed && console.warn(new Error("Trying to add a disposable to a DisposableMap that has already been disposed of. The added object will be leaked!").stack), i3 || this._store.get(e3)?.dispose(), this._store.set(e3, t3);
          }
          deleteAndDispose(e3) {
            this._store.get(e3)?.dispose(), this._store.delete(e3);
          }
          deleteAndLeak(e3) {
            const t3 = this._store.get(e3);
            return this._store.delete(e3), t3;
          }
          keys() {
            return this._store.keys();
          }
          values() {
            return this._store.values();
          }
          [Symbol.iterator]() {
            return this._store[Symbol.iterator]();
          }
        }
        t2.DisposableMap = S;
      }, 6317: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.LinkedList = void 0;
        class i2 {
          static {
            this.Undefined = new i2(void 0);
          }
          constructor(e3) {
            this.element = e3, this.next = i2.Undefined, this.prev = i2.Undefined;
          }
        }
        class s2 {
          constructor() {
            this._first = i2.Undefined, this._last = i2.Undefined, this._size = 0;
          }
          get size() {
            return this._size;
          }
          isEmpty() {
            return this._first === i2.Undefined;
          }
          clear() {
            let e3 = this._first;
            for (; e3 !== i2.Undefined; ) {
              const t3 = e3.next;
              e3.prev = i2.Undefined, e3.next = i2.Undefined, e3 = t3;
            }
            this._first = i2.Undefined, this._last = i2.Undefined, this._size = 0;
          }
          unshift(e3) {
            return this._insert(e3, false);
          }
          push(e3) {
            return this._insert(e3, true);
          }
          _insert(e3, t3) {
            const s3 = new i2(e3);
            if (this._first === i2.Undefined) this._first = s3, this._last = s3;
            else if (t3) {
              const e4 = this._last;
              this._last = s3, s3.prev = e4, e4.next = s3;
            } else {
              const e4 = this._first;
              this._first = s3, s3.next = e4, e4.prev = s3;
            }
            this._size += 1;
            let r = false;
            return () => {
              r || (r = true, this._remove(s3));
            };
          }
          shift() {
            if (this._first !== i2.Undefined) {
              const e3 = this._first.element;
              return this._remove(this._first), e3;
            }
          }
          pop() {
            if (this._last !== i2.Undefined) {
              const e3 = this._last.element;
              return this._remove(this._last), e3;
            }
          }
          _remove(e3) {
            if (e3.prev !== i2.Undefined && e3.next !== i2.Undefined) {
              const t3 = e3.prev;
              t3.next = e3.next, e3.next.prev = t3;
            } else e3.prev === i2.Undefined && e3.next === i2.Undefined ? (this._first = i2.Undefined, this._last = i2.Undefined) : e3.next === i2.Undefined ? (this._last = this._last.prev, this._last.next = i2.Undefined) : e3.prev === i2.Undefined && (this._first = this._first.next, this._first.prev = i2.Undefined);
            this._size -= 1;
          }
          *[Symbol.iterator]() {
            let e3 = this._first;
            for (; e3 !== i2.Undefined; ) yield e3.element, e3 = e3.next;
          }
        }
        t2.LinkedList = s2;
      }, 2608: (e2, t2) => {
        var i2;
        Object.defineProperty(t2, "__esModule", { value: true }), t2.SetMap = t2.BidirectionalMap = t2.CounterSet = t2.Touch = void 0, t2.getOrSet = function(e3, t3, i3) {
          let s2 = e3.get(t3);
          return void 0 === s2 && (s2 = i3, e3.set(t3, s2)), s2;
        }, t2.mapToString = function(e3) {
          const t3 = [];
          return e3.forEach(((e4, i3) => {
            t3.push(`${i3} => ${e4}`);
          })), `Map(${e3.size}) {${t3.join(", ")}}`;
        }, t2.setToString = function(e3) {
          const t3 = [];
          return e3.forEach(((e4) => {
            t3.push(e4);
          })), `Set(${e3.size}) {${t3.join(", ")}}`;
        }, t2.mapsStrictEqualIgnoreOrder = function(e3, t3) {
          if (e3 === t3) return true;
          if (e3.size !== t3.size) return false;
          for (const [i3, s2] of e3) if (!t3.has(i3) || t3.get(i3) !== s2) return false;
          for (const [i3] of t3) if (!e3.has(i3)) return false;
          return true;
        }, (function(e3) {
          e3[e3.None = 0] = "None", e3[e3.AsOld = 1] = "AsOld", e3[e3.AsNew = 2] = "AsNew";
        })(i2 || (t2.Touch = i2 = {})), t2.CounterSet = class {
          constructor() {
            this.map = /* @__PURE__ */ new Map();
          }
          add(e3) {
            return this.map.set(e3, (this.map.get(e3) || 0) + 1), this;
          }
          delete(e3) {
            let t3 = this.map.get(e3) || 0;
            return 0 !== t3 && (t3--, 0 === t3 ? this.map.delete(e3) : this.map.set(e3, t3), true);
          }
          has(e3) {
            return this.map.has(e3);
          }
        }, t2.BidirectionalMap = class {
          constructor(e3) {
            if (this._m1 = /* @__PURE__ */ new Map(), this._m2 = /* @__PURE__ */ new Map(), e3) for (const [t3, i3] of e3) this.set(t3, i3);
          }
          clear() {
            this._m1.clear(), this._m2.clear();
          }
          set(e3, t3) {
            this._m1.set(e3, t3), this._m2.set(t3, e3);
          }
          get(e3) {
            return this._m1.get(e3);
          }
          getKey(e3) {
            return this._m2.get(e3);
          }
          delete(e3) {
            const t3 = this._m1.get(e3);
            return void 0 !== t3 && (this._m1.delete(e3), this._m2.delete(t3), true);
          }
          forEach(e3, t3) {
            this._m1.forEach(((i3, s2) => {
              e3.call(t3, i3, s2, this);
            }));
          }
          keys() {
            return this._m1.keys();
          }
          values() {
            return this._m1.values();
          }
        }, t2.SetMap = class {
          constructor() {
            this.map = /* @__PURE__ */ new Map();
          }
          add(e3, t3) {
            let i3 = this.map.get(e3);
            i3 || (i3 = /* @__PURE__ */ new Set(), this.map.set(e3, i3)), i3.add(t3);
          }
          delete(e3, t3) {
            const i3 = this.map.get(e3);
            i3 && (i3.delete(t3), 0 === i3.size && this.map.delete(e3));
          }
          forEach(e3, t3) {
            const i3 = this.map.get(e3);
            i3 && i3.forEach(t3);
          }
          get(e3) {
            return this.map.get(e3) || /* @__PURE__ */ new Set();
          }
        };
      }, 7704: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.SlidingWindowAverage = t2.MovingAverage = t2.Counter = void 0, t2.clamp = function(e3, t3, i2) {
          return Math.min(Math.max(e3, t3), i2);
        }, t2.rot = function(e3, t3) {
          return (t3 + e3 % t3) % t3;
        }, t2.isPointWithinTriangle = function(e3, t3, i2, s2, r, n, o, a) {
          const l = o - i2, h = a - s2, c = r - i2, d = n - s2, u = e3 - i2, _ = t3 - s2, f = l * l + h * h, p = l * c + h * d, g = l * u + h * _, m = c * c + d * d, v = c * u + d * _, S = 1 / (f * m - p * p), b = (m * g - p * v) * S, C = (f * v - p * g) * S;
          return b >= 0 && C >= 0 && b + C < 1;
        }, t2.Counter = class {
          constructor() {
            this._next = 0;
          }
          getNext() {
            return this._next++;
          }
        }, t2.MovingAverage = class {
          constructor() {
            this._n = 1, this._val = 0;
          }
          update(e3) {
            return this._val = this._val + (e3 - this._val) / this._n, this._n += 1, this._val;
          }
          get value() {
            return this._val;
          }
        }, t2.SlidingWindowAverage = class {
          constructor(e3) {
            this._n = 0, this._val = 0, this._values = [], this._index = 0, this._sum = 0, this._values = new Array(e3), this._values.fill(0, 0, e3);
          }
          update(e3) {
            const t3 = this._values[this._index];
            return this._values[this._index] = e3, this._index = (this._index + 1) % this._values.length, this._sum -= t3, this._sum += e3, this._n < this._values.length && (this._n += 1), this._val = this._sum / this._n, this._val;
          }
          get value() {
            return this._val;
          }
        };
      }, 8163: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.isAndroid = t2.isEdge = t2.isSafari = t2.isFirefox = t2.isChrome = t2.OS = t2.OperatingSystem = t2.setTimeout0 = t2.setTimeout0IsFaster = t2.translationsConfigFile = t2.platformLocale = t2.locale = t2.Language = t2.language = t2.userAgent = t2.platform = t2.isCI = t2.isMobile = t2.isIOS = t2.webWorkerOrigin = t2.isWebWorker = t2.isWeb = t2.isElectron = t2.isNative = t2.isLinuxSnap = t2.isLinux = t2.isMacintosh = t2.isWindows = t2.Platform = t2.LANGUAGE_DEFAULT = void 0, t2.PlatformToString = function(e3) {
          switch (e3) {
            case C.Web:
              return "Web";
            case C.Mac:
              return "Mac";
            case C.Linux:
              return "Linux";
            case C.Windows:
              return "Windows";
          }
        }, t2.isLittleEndian = function() {
          if (!L) {
            L = true;
            const e3 = new Uint8Array(2);
            e3[0] = 1, e3[1] = 2;
            const t3 = new Uint16Array(e3.buffer);
            D = 513 === t3[0];
          }
          return D;
        }, t2.isBigSurOrNewer = function(e3) {
          return parseFloat(e3) >= 20;
        }, t2.LANGUAGE_DEFAULT = "en";
        let i2, s2, r, n = false, o = false, a = false, l = false, h = false, c = false, d = false, u = false, _ = false, f = false, p = t2.LANGUAGE_DEFAULT, g = t2.LANGUAGE_DEFAULT;
        const m = globalThis;
        let v;
        void 0 !== m.vscode && void 0 !== m.vscode.process ? v = m.vscode.process : "undefined" != typeof process && "string" == typeof process?.versions?.node && (v = process);
        const S = "string" == typeof v?.versions?.electron, b = S && "renderer" === v?.type;
        if ("object" == typeof v) {
          n = "win32" === v.platform, o = "darwin" === v.platform, a = "linux" === v.platform, l = a && !!v.env.SNAP && !!v.env.SNAP_REVISION, d = S, _ = !!v.env.CI || !!v.env.BUILD_ARTIFACTSTAGINGDIRECTORY, i2 = t2.LANGUAGE_DEFAULT, p = t2.LANGUAGE_DEFAULT;
          const e3 = v.env.VSCODE_NLS_CONFIG;
          if (e3) try {
            const r2 = JSON.parse(e3);
            i2 = r2.userLocale, g = r2.osLocale, p = r2.resolvedLanguage || t2.LANGUAGE_DEFAULT, s2 = r2.languagePack?.translationsConfigFile;
          } catch (e4) {
          }
          h = true;
        } else "object" != typeof navigator || b ? console.error("Unable to resolve platform.") : (r = navigator.userAgent, n = r.indexOf("Windows") >= 0, o = r.indexOf("Macintosh") >= 0, u = (r.indexOf("Macintosh") >= 0 || r.indexOf("iPad") >= 0 || r.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0, a = r.indexOf("Linux") >= 0, f = r?.indexOf("Mobi") >= 0, c = true, p = globalThis._VSCODE_NLS_LANGUAGE || t2.LANGUAGE_DEFAULT, i2 = navigator.language.toLowerCase(), g = i2);
        var C;
        !(function(e3) {
          e3[e3.Web = 0] = "Web", e3[e3.Mac = 1] = "Mac", e3[e3.Linux = 2] = "Linux", e3[e3.Windows = 3] = "Windows";
        })(C || (t2.Platform = C = {}));
        let y = C.Web;
        var w, E;
        o ? y = C.Mac : n ? y = C.Windows : a && (y = C.Linux), t2.isWindows = n, t2.isMacintosh = o, t2.isLinux = a, t2.isLinuxSnap = l, t2.isNative = h, t2.isElectron = d, t2.isWeb = c, t2.isWebWorker = c && "function" == typeof m.importScripts, t2.webWorkerOrigin = t2.isWebWorker ? m.origin : void 0, t2.isIOS = u, t2.isMobile = f, t2.isCI = _, t2.platform = y, t2.userAgent = r, t2.language = p, (function(e3) {
          e3.value = function() {
            return t2.language;
          }, e3.isDefaultVariant = function() {
            return 2 === t2.language.length ? "en" === t2.language : t2.language.length >= 3 && "e" === t2.language[0] && "n" === t2.language[1] && "-" === t2.language[2];
          }, e3.isDefault = function() {
            return "en" === t2.language;
          };
        })(w || (t2.Language = w = {})), t2.locale = i2, t2.platformLocale = g, t2.translationsConfigFile = s2, t2.setTimeout0IsFaster = "function" == typeof m.postMessage && !m.importScripts, t2.setTimeout0 = (() => {
          if (t2.setTimeout0IsFaster) {
            const e3 = [];
            m.addEventListener("message", ((t4) => {
              if (t4.data && t4.data.vscodeScheduleAsyncWork) for (let i3 = 0, s3 = e3.length; i3 < s3; i3++) {
                const s4 = e3[i3];
                if (s4.id === t4.data.vscodeScheduleAsyncWork) return e3.splice(i3, 1), void s4.callback();
              }
            }));
            let t3 = 0;
            return (i3) => {
              const s3 = ++t3;
              e3.push({ id: s3, callback: i3 }), m.postMessage({ vscodeScheduleAsyncWork: s3 }, "*");
            };
          }
          return (e3) => setTimeout(e3);
        })(), (function(e3) {
          e3[e3.Windows = 1] = "Windows", e3[e3.Macintosh = 2] = "Macintosh", e3[e3.Linux = 3] = "Linux";
        })(E || (t2.OperatingSystem = E = {})), t2.OS = o || u ? E.Macintosh : n ? E.Windows : E.Linux;
        let D = true, L = false;
        t2.isChrome = !!(t2.userAgent && t2.userAgent.indexOf("Chrome") >= 0), t2.isFirefox = !!(t2.userAgent && t2.userAgent.indexOf("Firefox") >= 0), t2.isSafari = !!(!t2.isChrome && t2.userAgent && t2.userAgent.indexOf("Safari") >= 0), t2.isEdge = !!(t2.userAgent && t2.userAgent.indexOf("Edg/") >= 0), t2.isAndroid = !!(t2.userAgent && t2.userAgent.indexOf("Android") >= 0);
      }, 9881: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.SmoothScrollingOperation = t2.SmoothScrollingUpdate = t2.Scrollable = t2.ScrollState = t2.ScrollbarVisibility = void 0;
        const s2 = i2(802), r = i2(7150);
        var n;
        !(function(e3) {
          e3[e3.Auto = 1] = "Auto", e3[e3.Hidden = 2] = "Hidden", e3[e3.Visible = 3] = "Visible";
        })(n || (t2.ScrollbarVisibility = n = {}));
        class o {
          constructor(e3, t3, i3, s3, r2, n2, o2) {
            this._forceIntegerValues = e3, this._scrollStateBrand = void 0, this._forceIntegerValues && (t3 |= 0, i3 |= 0, s3 |= 0, r2 |= 0, n2 |= 0, o2 |= 0), this.rawScrollLeft = s3, this.rawScrollTop = o2, t3 < 0 && (t3 = 0), s3 + t3 > i3 && (s3 = i3 - t3), s3 < 0 && (s3 = 0), r2 < 0 && (r2 = 0), o2 + r2 > n2 && (o2 = n2 - r2), o2 < 0 && (o2 = 0), this.width = t3, this.scrollWidth = i3, this.scrollLeft = s3, this.height = r2, this.scrollHeight = n2, this.scrollTop = o2;
          }
          equals(e3) {
            return this.rawScrollLeft === e3.rawScrollLeft && this.rawScrollTop === e3.rawScrollTop && this.width === e3.width && this.scrollWidth === e3.scrollWidth && this.scrollLeft === e3.scrollLeft && this.height === e3.height && this.scrollHeight === e3.scrollHeight && this.scrollTop === e3.scrollTop;
          }
          withScrollDimensions(e3, t3) {
            return new o(this._forceIntegerValues, void 0 !== e3.width ? e3.width : this.width, void 0 !== e3.scrollWidth ? e3.scrollWidth : this.scrollWidth, t3 ? this.rawScrollLeft : this.scrollLeft, void 0 !== e3.height ? e3.height : this.height, void 0 !== e3.scrollHeight ? e3.scrollHeight : this.scrollHeight, t3 ? this.rawScrollTop : this.scrollTop);
          }
          withScrollPosition(e3) {
            return new o(this._forceIntegerValues, this.width, this.scrollWidth, void 0 !== e3.scrollLeft ? e3.scrollLeft : this.rawScrollLeft, this.height, this.scrollHeight, void 0 !== e3.scrollTop ? e3.scrollTop : this.rawScrollTop);
          }
          createScrollEvent(e3, t3) {
            const i3 = this.width !== e3.width, s3 = this.scrollWidth !== e3.scrollWidth, r2 = this.scrollLeft !== e3.scrollLeft, n2 = this.height !== e3.height, o2 = this.scrollHeight !== e3.scrollHeight, a2 = this.scrollTop !== e3.scrollTop;
            return { inSmoothScrolling: t3, oldWidth: e3.width, oldScrollWidth: e3.scrollWidth, oldScrollLeft: e3.scrollLeft, width: this.width, scrollWidth: this.scrollWidth, scrollLeft: this.scrollLeft, oldHeight: e3.height, oldScrollHeight: e3.scrollHeight, oldScrollTop: e3.scrollTop, height: this.height, scrollHeight: this.scrollHeight, scrollTop: this.scrollTop, widthChanged: i3, scrollWidthChanged: s3, scrollLeftChanged: r2, heightChanged: n2, scrollHeightChanged: o2, scrollTopChanged: a2 };
          }
        }
        t2.ScrollState = o;
        class a extends r.Disposable {
          constructor(e3) {
            super(), this._scrollableBrand = void 0, this._onScroll = this._register(new s2.Emitter()), this.onScroll = this._onScroll.event, this._smoothScrollDuration = e3.smoothScrollDuration, this._scheduleAtNextAnimationFrame = e3.scheduleAtNextAnimationFrame, this._state = new o(e3.forceIntegerValues, 0, 0, 0, 0, 0, 0), this._smoothScrolling = null;
          }
          dispose() {
            this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), super.dispose();
          }
          setSmoothScrollDuration(e3) {
            this._smoothScrollDuration = e3;
          }
          validateScrollPosition(e3) {
            return this._state.withScrollPosition(e3);
          }
          getScrollDimensions() {
            return this._state;
          }
          setScrollDimensions(e3, t3) {
            const i3 = this._state.withScrollDimensions(e3, t3);
            this._setState(i3, Boolean(this._smoothScrolling)), this._smoothScrolling?.acceptScrollDimensions(this._state);
          }
          getFutureScrollPosition() {
            return this._smoothScrolling ? this._smoothScrolling.to : this._state;
          }
          getCurrentScrollPosition() {
            return this._state;
          }
          setScrollPositionNow(e3) {
            const t3 = this._state.withScrollPosition(e3);
            this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), this._setState(t3, false);
          }
          setScrollPositionSmooth(e3, t3) {
            if (0 === this._smoothScrollDuration) return this.setScrollPositionNow(e3);
            if (this._smoothScrolling) {
              e3 = { scrollLeft: void 0 === e3.scrollLeft ? this._smoothScrolling.to.scrollLeft : e3.scrollLeft, scrollTop: void 0 === e3.scrollTop ? this._smoothScrolling.to.scrollTop : e3.scrollTop };
              const i3 = this._state.withScrollPosition(e3);
              if (this._smoothScrolling.to.scrollLeft === i3.scrollLeft && this._smoothScrolling.to.scrollTop === i3.scrollTop) return;
              let s3;
              s3 = t3 ? new c(this._smoothScrolling.from, i3, this._smoothScrolling.startTime, this._smoothScrolling.duration) : this._smoothScrolling.combine(this._state, i3, this._smoothScrollDuration), this._smoothScrolling.dispose(), this._smoothScrolling = s3;
            } else {
              const t4 = this._state.withScrollPosition(e3);
              this._smoothScrolling = c.start(this._state, t4, this._smoothScrollDuration);
            }
            this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame((() => {
              this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
            }));
          }
          hasPendingScrollAnimation() {
            return Boolean(this._smoothScrolling);
          }
          _performSmoothScrolling() {
            if (!this._smoothScrolling) return;
            const e3 = this._smoothScrolling.tick(), t3 = this._state.withScrollPosition(e3);
            return this._setState(t3, true), this._smoothScrolling ? e3.isDone ? (this._smoothScrolling.dispose(), void (this._smoothScrolling = null)) : void (this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame((() => {
              this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
            }))) : void 0;
          }
          _setState(e3, t3) {
            const i3 = this._state;
            i3.equals(e3) || (this._state = e3, this._onScroll.fire(this._state.createScrollEvent(i3, t3)));
          }
        }
        t2.Scrollable = a;
        class l {
          constructor(e3, t3, i3) {
            this.scrollLeft = e3, this.scrollTop = t3, this.isDone = i3;
          }
        }
        function h(e3, t3) {
          const i3 = t3 - e3;
          return function(t4) {
            return e3 + i3 * (1 - (s3 = 1 - t4, Math.pow(s3, 3)));
            var s3;
          };
        }
        t2.SmoothScrollingUpdate = l;
        class c {
          constructor(e3, t3, i3, s3) {
            this.from = e3, this.to = t3, this.duration = s3, this.startTime = i3, this.animationFrameDisposable = null, this._initAnimations();
          }
          _initAnimations() {
            this.scrollLeft = this._initAnimation(this.from.scrollLeft, this.to.scrollLeft, this.to.width), this.scrollTop = this._initAnimation(this.from.scrollTop, this.to.scrollTop, this.to.height);
          }
          _initAnimation(e3, t3, i3) {
            if (Math.abs(e3 - t3) > 2.5 * i3) {
              let o2, a2;
              return e3 < t3 ? (o2 = e3 + 0.75 * i3, a2 = t3 - 0.75 * i3) : (o2 = e3 - 0.75 * i3, a2 = t3 + 0.75 * i3), s3 = h(e3, o2), r2 = h(a2, t3), n2 = 0.33, function(e4) {
                return e4 < n2 ? s3(e4 / n2) : r2((e4 - n2) / (1 - n2));
              };
            }
            var s3, r2, n2;
            return h(e3, t3);
          }
          dispose() {
            null !== this.animationFrameDisposable && (this.animationFrameDisposable.dispose(), this.animationFrameDisposable = null);
          }
          acceptScrollDimensions(e3) {
            this.to = e3.withScrollPosition(this.to), this._initAnimations();
          }
          tick() {
            return this._tick(Date.now());
          }
          _tick(e3) {
            const t3 = (e3 - this.startTime) / this.duration;
            if (t3 < 1) {
              const e4 = this.scrollLeft(t3), i3 = this.scrollTop(t3);
              return new l(e4, i3, false);
            }
            return new l(this.to.scrollLeft, this.to.scrollTop, true);
          }
          combine(e3, t3, i3) {
            return c.start(e3, t3, i3);
          }
          static start(e3, t3, i3) {
            i3 += 10;
            const s3 = Date.now() - 10;
            return new c(e3, t3, s3, i3);
          }
        }
        t2.SmoothScrollingOperation = c;
      }, 9725: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.StopWatch = void 0;
        const i2 = globalThis.performance && "function" == typeof globalThis.performance.now;
        class s2 {
          static create(e3) {
            return new s2(e3);
          }
          constructor(e3) {
            this._now = i2 && false === e3 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
          }
          stop() {
            this._stopTime = this._now();
          }
          reset() {
            this._startTime = this._now(), this._stopTime = -1;
          }
          elapsed() {
            return -1 !== this._stopTime ? this._stopTime - this._startTime : this._now() - this._startTime;
          }
        }
        t2.StopWatch = s2;
      }, 1316: (e2, t2, i2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.noBreakWhitespace = t2.CodePointIterator = void 0, t2.isFalsyOrWhitespace = function(e3) {
          return !e3 || "string" != typeof e3 || 0 === e3.trim().length;
        }, t2.format = function(e3, ...t3) {
          return 0 === t3.length ? e3 : e3.replace(n, (function(e4, i3) {
            const s3 = parseInt(i3, 10);
            return isNaN(s3) || s3 < 0 || s3 >= t3.length ? e4 : t3[s3];
          }));
        }, t2.format2 = function(e3, t3) {
          return 0 === Object.keys(t3).length ? e3 : e3.replace(o, ((e4, i3) => t3[i3] ?? e4));
        }, t2.htmlAttributeEncodeValue = function(e3) {
          return e3.replace(/[<>"'&]/g, ((e4) => {
            switch (e4) {
              case "<":
                return "&lt;";
              case ">":
                return "&gt;";
              case '"':
                return "&quot;";
              case "'":
                return "&apos;";
              case "&":
                return "&amp;";
            }
            return e4;
          }));
        }, t2.escape = function(e3) {
          return e3.replace(/[<>&]/g, (function(e4) {
            switch (e4) {
              case "<":
                return "&lt;";
              case ">":
                return "&gt;";
              case "&":
                return "&amp;";
              default:
                return e4;
            }
          }));
        }, t2.escapeRegExpCharacters = a, t2.count = function(e3, t3) {
          let i3 = 0, s3 = e3.indexOf(t3);
          for (; -1 !== s3; ) i3++, s3 = e3.indexOf(t3, s3 + t3.length);
          return i3;
        }, t2.truncate = function(e3, t3, i3 = "\u2026") {
          return e3.length <= t3 ? e3 : `${e3.substr(0, t3)}${i3}`;
        }, t2.truncateMiddle = function(e3, t3, i3 = "\u2026") {
          if (e3.length <= t3) return e3;
          const s3 = Math.ceil(t3 / 2) - i3.length / 2, r2 = Math.floor(t3 / 2) - i3.length / 2;
          return `${e3.substr(0, s3)}${i3}${e3.substr(e3.length - r2)}`;
        }, t2.trim = function(e3, t3 = " ") {
          return h(l(e3, t3), t3);
        }, t2.ltrim = l, t2.rtrim = h, t2.convertSimple2RegExpPattern = function(e3) {
          return e3.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&").replace(/[\*]/g, ".*");
        }, t2.stripWildcards = function(e3) {
          return e3.replace(/\*/g, "");
        }, t2.createRegExp = function(e3, t3, i3 = {}) {
          if (!e3) throw new Error("Cannot create regex from empty string");
          t3 || (e3 = a(e3)), i3.wholeWord && (/\B/.test(e3.charAt(0)) || (e3 = "\\b" + e3), /\B/.test(e3.charAt(e3.length - 1)) || (e3 += "\\b"));
          let s3 = "";
          return i3.global && (s3 += "g"), i3.matchCase || (s3 += "i"), i3.multiline && (s3 += "m"), i3.unicode && (s3 += "u"), new RegExp(e3, s3);
        }, t2.regExpLeadsToEndlessLoop = function(e3) {
          return "^" !== e3.source && "^$" !== e3.source && "$" !== e3.source && "^\\s*$" !== e3.source && !(!e3.exec("") || 0 !== e3.lastIndex);
        }, t2.splitLines = function(e3) {
          return e3.split(/\r\n|\r|\n/);
        }, t2.splitLinesIncludeSeparators = function(e3) {
          const t3 = [], i3 = e3.split(/(\r\n|\r|\n)/);
          for (let e4 = 0; e4 < Math.ceil(i3.length / 2); e4++) t3.push(i3[2 * e4] + (i3[2 * e4 + 1] ?? ""));
          return t3;
        }, t2.firstNonWhitespaceIndex = function(e3) {
          for (let t3 = 0, i3 = e3.length; t3 < i3; t3++) {
            const i4 = e3.charCodeAt(t3);
            if (i4 !== s2.CharCode.Space && i4 !== s2.CharCode.Tab) return t3;
          }
          return -1;
        }, t2.getLeadingWhitespace = function(e3, t3 = 0, i3 = e3.length) {
          for (let r2 = t3; r2 < i3; r2++) {
            const i4 = e3.charCodeAt(r2);
            if (i4 !== s2.CharCode.Space && i4 !== s2.CharCode.Tab) return e3.substring(t3, r2);
          }
          return e3.substring(t3, i3);
        }, t2.lastNonWhitespaceIndex = function(e3, t3 = e3.length - 1) {
          for (let i3 = t3; i3 >= 0; i3--) {
            const t4 = e3.charCodeAt(i3);
            if (t4 !== s2.CharCode.Space && t4 !== s2.CharCode.Tab) return i3;
          }
          return -1;
        }, t2.replaceAsync = function(e3, t3, i3) {
          const s3 = [];
          let r2 = 0;
          for (const n2 of e3.matchAll(t3)) {
            if (s3.push(e3.slice(r2, n2.index)), void 0 === n2.index) throw new Error("match.index should be defined");
            r2 = n2.index + n2[0].length, s3.push(i3(n2[0], ...n2.slice(1), n2.index, e3, n2.groups));
          }
          return s3.push(e3.slice(r2)), Promise.all(s3).then(((e4) => e4.join("")));
        }, t2.compare = function(e3, t3) {
          return e3 < t3 ? -1 : e3 > t3 ? 1 : 0;
        }, t2.compareSubstring = c, t2.compareIgnoreCase = function(e3, t3) {
          return d(e3, t3, 0, e3.length, 0, t3.length);
        }, t2.compareSubstringIgnoreCase = d, t2.isAsciiDigit = function(e3) {
          return e3 >= s2.CharCode.Digit0 && e3 <= s2.CharCode.Digit9;
        }, t2.isLowerAsciiLetter = u, t2.isUpperAsciiLetter = function(e3) {
          return e3 >= s2.CharCode.A && e3 <= s2.CharCode.Z;
        }, t2.equalsIgnoreCase = function(e3, t3) {
          return e3.length === t3.length && 0 === d(e3, t3);
        }, t2.startsWithIgnoreCase = function(e3, t3) {
          const i3 = t3.length;
          return !(t3.length > e3.length) && 0 === d(e3, t3, 0, i3);
        }, t2.commonPrefixLength = function(e3, t3) {
          const i3 = Math.min(e3.length, t3.length);
          let s3;
          for (s3 = 0; s3 < i3; s3++) if (e3.charCodeAt(s3) !== t3.charCodeAt(s3)) return s3;
          return i3;
        }, t2.commonSuffixLength = function(e3, t3) {
          const i3 = Math.min(e3.length, t3.length);
          let s3;
          const r2 = e3.length - 1, n2 = t3.length - 1;
          for (s3 = 0; s3 < i3; s3++) if (e3.charCodeAt(r2 - s3) !== t3.charCodeAt(n2 - s3)) return s3;
          return i3;
        }, t2.isHighSurrogate = _, t2.isLowSurrogate = f, t2.computeCodePoint = p, t2.getNextCodePoint = g;
        const s2 = i2(4869), r = i2(8960), n = /{(\d+)}/g, o = /{([^}]+)}/g;
        function a(e3) {
          return e3.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
        }
        function l(e3, t3) {
          if (!e3 || !t3) return e3;
          const i3 = t3.length;
          if (0 === i3 || 0 === e3.length) return e3;
          let s3 = 0;
          for (; e3.indexOf(t3, s3) === s3; ) s3 += i3;
          return e3.substring(s3);
        }
        function h(e3, t3) {
          if (!e3 || !t3) return e3;
          const i3 = t3.length, s3 = e3.length;
          if (0 === i3 || 0 === s3) return e3;
          let r2 = s3, n2 = -1;
          for (; n2 = e3.lastIndexOf(t3, r2 - 1), -1 !== n2 && n2 + i3 === r2; ) {
            if (0 === n2) return "";
            r2 = n2;
          }
          return e3.substring(0, r2);
        }
        function c(e3, t3, i3 = 0, s3 = e3.length, r2 = 0, n2 = t3.length) {
          for (; i3 < s3 && r2 < n2; i3++, r2++) {
            const s4 = e3.charCodeAt(i3), n3 = t3.charCodeAt(r2);
            if (s4 < n3) return -1;
            if (s4 > n3) return 1;
          }
          const o2 = s3 - i3, a2 = n2 - r2;
          return o2 < a2 ? -1 : o2 > a2 ? 1 : 0;
        }
        function d(e3, t3, i3 = 0, s3 = e3.length, r2 = 0, n2 = t3.length) {
          for (; i3 < s3 && r2 < n2; i3++, r2++) {
            let o3 = e3.charCodeAt(i3), a3 = t3.charCodeAt(r2);
            if (o3 === a3) continue;
            if (o3 >= 128 || a3 >= 128) return c(e3.toLowerCase(), t3.toLowerCase(), i3, s3, r2, n2);
            u(o3) && (o3 -= 32), u(a3) && (a3 -= 32);
            const l2 = o3 - a3;
            if (0 !== l2) return l2;
          }
          const o2 = s3 - i3, a2 = n2 - r2;
          return o2 < a2 ? -1 : o2 > a2 ? 1 : 0;
        }
        function u(e3) {
          return e3 >= s2.CharCode.a && e3 <= s2.CharCode.z;
        }
        function _(e3) {
          return 55296 <= e3 && e3 <= 56319;
        }
        function f(e3) {
          return 56320 <= e3 && e3 <= 57343;
        }
        function p(e3, t3) {
          return t3 - 56320 + (e3 - 55296 << 10) + 65536;
        }
        function g(e3, t3, i3) {
          const s3 = e3.charCodeAt(i3);
          if (_(s3) && i3 + 1 < t3) {
            const t4 = e3.charCodeAt(i3 + 1);
            if (f(t4)) return p(s3, t4);
          }
          return s3;
        }
        t2.CodePointIterator = class {
          get offset() {
            return this._offset;
          }
          constructor(e3, t3 = 0) {
            this._str = e3, this._len = e3.length, this._offset = t3;
          }
          setOffset(e3) {
            this._offset = e3;
          }
          prevCodePoint() {
            const e3 = (function(e4, t3) {
              const i3 = e4.charCodeAt(t3 - 1);
              if (f(i3) && t3 > 1) {
                const s3 = e4.charCodeAt(t3 - 2);
                if (_(s3)) return p(s3, i3);
              }
              return i3;
            })(this._str, this._offset);
            return this._offset -= e3 >= r.Constants.UNICODE_SUPPLEMENTARY_PLANE_BEGIN ? 2 : 1, e3;
          }
          nextCodePoint() {
            const e3 = g(this._str, this._len, this._offset);
            return this._offset += e3 >= r.Constants.UNICODE_SUPPLEMENTARY_PLANE_BEGIN ? 2 : 1, e3;
          }
          eol() {
            return this._offset >= this._len;
          }
        }, t2.noBreakWhitespace = "\xA0";
      }, 5015: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.MicrotaskDelay = void 0, t2.MicrotaskDelay = /* @__PURE__ */ Symbol("MicrotaskDelay");
      }, 8960: (e2, t2) => {
        var i2;
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Constants = void 0, t2.toUint8 = function(e3) {
          return e3 < 0 ? 0 : e3 > i2.MAX_UINT_8 ? i2.MAX_UINT_8 : 0 | e3;
        }, t2.toUint32 = function(e3) {
          return e3 < 0 ? 0 : e3 > i2.MAX_UINT_32 ? i2.MAX_UINT_32 : 0 | e3;
        }, (function(e3) {
          e3[e3.MAX_SAFE_SMALL_INTEGER = 1073741824] = "MAX_SAFE_SMALL_INTEGER", e3[e3.MIN_SAFE_SMALL_INTEGER = -1073741824] = "MIN_SAFE_SMALL_INTEGER", e3[e3.MAX_UINT_8 = 255] = "MAX_UINT_8", e3[e3.MAX_UINT_16 = 65535] = "MAX_UINT_16", e3[e3.MAX_UINT_32 = 4294967295] = "MAX_UINT_32", e3[e3.UNICODE_SUPPLEMENTARY_PLANE_BEGIN = 65536] = "UNICODE_SUPPLEMENTARY_PLANE_BEGIN";
        })(i2 || (t2.Constants = i2 = {}));
      } }, t = {};
      function i(s2) {
        var r = t[s2];
        if (void 0 !== r) return r.exports;
        var n = t[s2] = { exports: {} };
        return e[s2].call(n.exports, n, n.exports, i), n.exports;
      }
      var s = {};
      return (() => {
        var e2 = s;
        Object.defineProperty(e2, "__esModule", { value: true }), e2.Terminal = void 0;
        const t2 = i(7721), r = i(1718), n = i(7150), o = i(3027), a = i(5101), l = i(6097), h = i(4335), c = ["cols", "rows"];
        let d = 0;
        class u extends n.Disposable {
          constructor(e3) {
            super(), this._core = this._register(new r.CoreBrowserTerminal(e3)), this._addonManager = this._register(new o.AddonManager()), this._publicOptions = { ...this._core.options };
            const t3 = (e4) => this._core.options[e4], i2 = (e4, t4) => {
              this._checkReadonlyOptions(e4), this._core.options[e4] = t4;
            };
            for (const e4 in this._core.options) {
              const s2 = { get: t3.bind(this, e4), set: i2.bind(this, e4) };
              Object.defineProperty(this._publicOptions, e4, s2);
            }
          }
          _checkReadonlyOptions(e3) {
            if (c.includes(e3)) throw new Error(`Option "${e3}" can only be set in the constructor`);
          }
          _checkProposedApi() {
            if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
          }
          get onBell() {
            return this._core.onBell;
          }
          get onBinary() {
            return this._core.onBinary;
          }
          get onCursorMove() {
            return this._core.onCursorMove;
          }
          get onData() {
            return this._core.onData;
          }
          get onKey() {
            return this._core.onKey;
          }
          get onLineFeed() {
            return this._core.onLineFeed;
          }
          get onRender() {
            return this._core.onRender;
          }
          get onResize() {
            return this._core.onResize;
          }
          get onScroll() {
            return this._core.onScroll;
          }
          get onSelectionChange() {
            return this._core.onSelectionChange;
          }
          get onTitleChange() {
            return this._core.onTitleChange;
          }
          get onWriteParsed() {
            return this._core.onWriteParsed;
          }
          get element() {
            return this._core.element;
          }
          get parser() {
            return this._parser || (this._parser = new l.ParserApi(this._core)), this._parser;
          }
          get unicode() {
            return this._checkProposedApi(), new h.UnicodeApi(this._core);
          }
          get textarea() {
            return this._core.textarea;
          }
          get rows() {
            return this._core.rows;
          }
          get cols() {
            return this._core.cols;
          }
          get buffer() {
            return this._buffer || (this._buffer = this._register(new a.BufferNamespaceApi(this._core))), this._buffer;
          }
          get markers() {
            return this._checkProposedApi(), this._core.markers;
          }
          get modes() {
            const e3 = this._core.coreService.decPrivateModes;
            let t3 = "none";
            switch (this._core.coreMouseService.activeProtocol) {
              case "X10":
                t3 = "x10";
                break;
              case "VT200":
                t3 = "vt200";
                break;
              case "DRAG":
                t3 = "drag";
                break;
              case "ANY":
                t3 = "any";
            }
            return { applicationCursorKeysMode: e3.applicationCursorKeys, applicationKeypadMode: e3.applicationKeypad, bracketedPasteMode: e3.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: t3, originMode: e3.origin, reverseWraparoundMode: e3.reverseWraparound, sendFocusMode: e3.sendFocus, synchronizedOutputMode: e3.synchronizedOutput, wraparoundMode: e3.wraparound };
          }
          get options() {
            return this._publicOptions;
          }
          set options(e3) {
            for (const t3 in e3) this._publicOptions[t3] = e3[t3];
          }
          blur() {
            this._core.blur();
          }
          focus() {
            this._core.focus();
          }
          input(e3, t3 = true) {
            this._core.input(e3, t3);
          }
          resize(e3, t3) {
            this._verifyIntegers(e3, t3), this._core.resize(e3, t3);
          }
          open(e3) {
            this._core.open(e3);
          }
          attachCustomKeyEventHandler(e3) {
            this._core.attachCustomKeyEventHandler(e3);
          }
          attachCustomWheelEventHandler(e3) {
            this._core.attachCustomWheelEventHandler(e3);
          }
          registerLinkProvider(e3) {
            return this._core.registerLinkProvider(e3);
          }
          registerCharacterJoiner(e3) {
            return this._checkProposedApi(), this._core.registerCharacterJoiner(e3);
          }
          deregisterCharacterJoiner(e3) {
            this._checkProposedApi(), this._core.deregisterCharacterJoiner(e3);
          }
          registerMarker(e3 = 0) {
            return this._verifyIntegers(e3), this._core.registerMarker(e3);
          }
          registerDecoration(e3) {
            return this._checkProposedApi(), this._verifyPositiveIntegers(e3.x ?? 0, e3.width ?? 0, e3.height ?? 0), this._core.registerDecoration(e3);
          }
          hasSelection() {
            return this._core.hasSelection();
          }
          select(e3, t3, i2) {
            this._verifyIntegers(e3, t3, i2), this._core.select(e3, t3, i2);
          }
          getSelection() {
            return this._core.getSelection();
          }
          getSelectionPosition() {
            return this._core.getSelectionPosition();
          }
          clearSelection() {
            this._core.clearSelection();
          }
          selectAll() {
            this._core.selectAll();
          }
          selectLines(e3, t3) {
            this._verifyIntegers(e3, t3), this._core.selectLines(e3, t3);
          }
          dispose() {
            super.dispose();
          }
          scrollLines(e3) {
            this._verifyIntegers(e3), this._core.scrollLines(e3);
          }
          scrollPages(e3) {
            this._verifyIntegers(e3), this._core.scrollPages(e3);
          }
          scrollToTop() {
            this._core.scrollToTop();
          }
          scrollToBottom() {
            this._core.scrollToBottom();
          }
          scrollToLine(e3) {
            this._verifyIntegers(e3), this._core.scrollToLine(e3);
          }
          clear() {
            this._core.clear();
          }
          write(e3, t3) {
            this._core.write(e3, t3);
          }
          writeln(e3, t3) {
            this._core.write(e3), this._core.write("\r\n", t3);
          }
          paste(e3) {
            this._core.paste(e3);
          }
          refresh(e3, t3) {
            this._verifyIntegers(e3, t3), this._core.refresh(e3, t3);
          }
          reset() {
            this._core.reset();
          }
          clearTextureAtlas() {
            this._core.clearTextureAtlas();
          }
          loadAddon(e3) {
            this._addonManager.loadAddon(this, e3);
          }
          static get strings() {
            return { get promptLabel() {
              return t2.promptLabel.get();
            }, set promptLabel(e3) {
              t2.promptLabel.set(e3);
            }, get tooMuchOutput() {
              return t2.tooMuchOutput.get();
            }, set tooMuchOutput(e3) {
              t2.tooMuchOutput.set(e3);
            } };
          }
          _verifyIntegers(...e3) {
            for (d of e3) if (d === 1 / 0 || isNaN(d) || d % 1 != 0) throw new Error("This API only accepts integers");
          }
          _verifyPositiveIntegers(...e3) {
            for (d of e3) if (d && (d === 1 / 0 || isNaN(d) || d % 1 != 0 || d < 0)) throw new Error("This API only accepts positive integers");
          }
        }
        e2.Terminal = u;
      })(), s;
    })()));
  }
});

// node_modules/@xterm/addon-fit/lib/addon-fit.js
var require_addon_fit = __commonJS({
  "node_modules/@xterm/addon-fit/lib/addon-fit.js"(exports2, module2) {
    !(function(e, t) {
      "object" == typeof exports2 && "object" == typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports2 ? exports2.FitAddon = t() : e.FitAddon = t();
    })(globalThis, (() => (() => {
      "use strict";
      var e = {};
      return (() => {
        var t = e;
        Object.defineProperty(t, "__esModule", { value: true }), t.FitAddon = void 0, t.FitAddon = class {
          activate(e2) {
            this._terminal = e2;
          }
          dispose() {
          }
          fit() {
            const e2 = this.proposeDimensions();
            if (!e2 || !this._terminal || isNaN(e2.cols) || isNaN(e2.rows)) return;
            const t2 = this._terminal._core;
            this._terminal.rows === e2.rows && this._terminal.cols === e2.cols || (t2._renderService.clear(), this._terminal.resize(e2.cols, e2.rows));
          }
          proposeDimensions() {
            if (!this._terminal) return;
            if (!this._terminal.element || !this._terminal.element.parentElement) return;
            const e2 = this._terminal._core._renderService.dimensions;
            if (0 === e2.css.cell.width || 0 === e2.css.cell.height) return;
            const t2 = 0 === this._terminal.options.scrollback ? 0 : this._terminal.options.overviewRuler?.width || 14, r = window.getComputedStyle(this._terminal.element.parentElement), i = parseInt(r.getPropertyValue("height")), o = Math.max(0, parseInt(r.getPropertyValue("width"))), s = window.getComputedStyle(this._terminal.element), n = i - (parseInt(s.getPropertyValue("padding-top")) + parseInt(s.getPropertyValue("padding-bottom"))), l = o - (parseInt(s.getPropertyValue("padding-right")) + parseInt(s.getPropertyValue("padding-left"))) - t2;
            return { cols: Math.max(2, Math.floor(l / e2.css.cell.width)), rows: Math.max(1, Math.floor(n / e2.css.cell.height)) };
          }
        };
      })(), e;
    })()));
  }
});

// node_modules/@xterm/addon-web-links/lib/addon-web-links.js
var require_addon_web_links = __commonJS({
  "node_modules/@xterm/addon-web-links/lib/addon-web-links.js"(exports2, module2) {
    !(function(e, t) {
      "object" == typeof exports2 && "object" == typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports2 ? exports2.WebLinksAddon = t() : e.WebLinksAddon = t();
    })(globalThis, (() => (() => {
      "use strict";
      var e = { 490: (e2, t2) => {
        function n2(e3) {
          try {
            const t3 = new URL(e3), n3 = t3.password && t3.username ? `${t3.protocol}//${t3.username}:${t3.password}@${t3.host}` : t3.username ? `${t3.protocol}//${t3.username}@${t3.host}` : `${t3.protocol}//${t3.host}`;
            return e3.toLocaleLowerCase().startsWith(n3.toLocaleLowerCase());
          } catch (e4) {
            return false;
          }
        }
        Object.defineProperty(t2, "__esModule", { value: true }), t2.LinkComputer = t2.WebLinkProvider = void 0, t2.WebLinkProvider = class {
          constructor(e3, t3, n3, o3 = {}) {
            this._terminal = e3, this._regex = t3, this._handler = n3, this._options = o3;
          }
          provideLinks(e3, t3) {
            const n3 = o2.computeLink(e3, this._regex, this._terminal, this._handler);
            t3(this._addCallbacks(n3));
          }
          _addCallbacks(e3) {
            return e3.map(((e4) => (e4.leave = this._options.leave, e4.hover = (t3, n3) => {
              if (this._options.hover) {
                const { range: o3 } = e4;
                this._options.hover(t3, n3, o3);
              }
            }, e4)));
          }
        };
        class o2 {
          static computeLink(e3, t3, r, i) {
            const s = new RegExp(t3.source, (t3.flags || "") + "g"), [a, c] = o2._getWindowedLineStrings(e3 - 1, r), l = a.join("");
            let d;
            const p = [];
            for (; d = s.exec(l); ) {
              const e4 = d[0];
              if (!n2(e4)) continue;
              const [t4, s2] = o2._mapStrIdx(r, c, 0, d.index), [a2, l2] = o2._mapStrIdx(r, t4, s2, e4.length);
              if (-1 === t4 || -1 === s2 || -1 === a2 || -1 === l2) continue;
              const h = { start: { x: s2 + 1, y: t4 + 1 }, end: { x: l2, y: a2 + 1 } };
              p.push({ range: h, text: e4, activate: i });
            }
            return p;
          }
          static _getWindowedLineStrings(e3, t3) {
            let n3, o3 = e3, r = e3, i = 0, s = "";
            const a = [];
            if (n3 = t3.buffer.active.getLine(e3)) {
              const e4 = n3.translateToString(true);
              if (n3.isWrapped && " " !== e4[0]) {
                for (i = 0; (n3 = t3.buffer.active.getLine(--o3)) && i < 2048 && (s = n3.translateToString(true), i += s.length, a.push(s), n3.isWrapped && -1 === s.indexOf(" ")); ) ;
                a.reverse();
              }
              for (a.push(e4), i = 0; (n3 = t3.buffer.active.getLine(++r)) && n3.isWrapped && i < 2048 && (s = n3.translateToString(true), i += s.length, a.push(s), -1 === s.indexOf(" ")); ) ;
            }
            return [a, o3];
          }
          static _mapStrIdx(e3, t3, n3, o3) {
            const r = e3.buffer.active, i = r.getNullCell();
            let s = n3;
            for (; o3; ) {
              const e4 = r.getLine(t3);
              if (!e4) return [-1, -1];
              for (let n4 = s; n4 < e4.length; ++n4) {
                e4.getCell(n4, i);
                const s2 = i.getChars();
                if (i.getWidth() && (o3 -= s2.length || 1, n4 === e4.length - 1 && "" === s2)) {
                  const e5 = r.getLine(t3 + 1);
                  e5 && e5.isWrapped && (e5.getCell(0, i), 2 === i.getWidth() && (o3 += 1));
                }
                if (o3 < 0) return [t3, n4];
              }
              t3++, s = 0;
            }
            return [t3, s];
          }
        }
        t2.LinkComputer = o2;
      } }, t = {};
      function n(o2) {
        var r = t[o2];
        if (void 0 !== r) return r.exports;
        var i = t[o2] = { exports: {} };
        return e[o2](i, i.exports, n), i.exports;
      }
      var o = {};
      return (() => {
        var e2 = o;
        Object.defineProperty(e2, "__esModule", { value: true }), e2.WebLinksAddon = void 0;
        const t2 = n(490), r = /(https?|HTTPS?):[/]{2}[^\s"'!*(){}|\\\^<>`]*[^\s"':,.!?{}|\\\^~\[\]`()<>]/;
        function i(e3, t3) {
          const n2 = window.open();
          if (n2) {
            try {
              n2.opener = null;
            } catch {
            }
            n2.location.href = t3;
          } else console.warn("Opening link blocked as opener could not be cleared");
        }
        e2.WebLinksAddon = class {
          constructor(e3 = i, t3 = {}) {
            this._handler = e3, this._options = t3;
          }
          activate(e3) {
            this._terminal = e3;
            const n2 = this._options, o2 = n2.urlRegex || r;
            this._linkProvider = this._terminal.registerLinkProvider(new t2.WebLinkProvider(this._terminal, o2, this._handler, n2));
          }
          dispose() {
            this._linkProvider?.dispose();
          }
        };
      })(), o;
    })()));
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ObsidianAgentMCP
});
module.exports = __toCommonJS(main_exports);
var import_obsidian4 = require("obsidian");
var import_node_http = require("node:http");
var import_node_crypto = require("node:crypto");
var import_node_crypto2 = require("node:crypto");
var import_node_fs2 = require("node:fs");
var import_node_path3 = require("node:path");
var import_node_os = require("node:os");

// src/settings.ts
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  enabledTools: {
    tasks: true
  },
  terminal: {
    shell: "",
    shellArgs: "",
    startupCommand: "",
    cwd: "vault",
    fontSize: 13
  }
};
var AgentMCPSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Agent MCP" });
    containerEl.createEl("h3", { text: "Tools" });
    new import_obsidian.Setting(containerEl).setName("Task Board integration").setDesc(
      "Expose a getTasks tool that reads pending tasks from the Task Board plugin cache. Disable this if you are not using the Task Board plugin."
    ).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.enabledTools.tasks).onChange(async (value) => {
        this.plugin.settings.enabledTools.tasks = value;
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h3", { text: "Terminal" });
    new import_obsidian.Setting(containerEl).setName("Shell").setDesc(
      "Path to the shell executable. Leave blank to use $SHELL (macOS/Linux) or %COMSPEC% (Windows)."
    ).addText(
      (text) => text.setPlaceholder(process.env.SHELL || "/bin/zsh").setValue(this.plugin.settings.terminal.shell).onChange(async (value) => {
        this.plugin.settings.terminal.shell = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Shell arguments").setDesc("Space-separated arguments passed to the shell on launch.").addText(
      (text) => text.setPlaceholder("-l").setValue(this.plugin.settings.terminal.shellArgs).onChange(async (value) => {
        this.plugin.settings.terminal.shellArgs = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Startup command").setDesc(
      "Optional command automatically typed into the shell when a terminal is opened (e.g. `claude`)."
    ).addText(
      (text) => text.setPlaceholder("claude").setValue(this.plugin.settings.terminal.startupCommand).onChange(async (value) => {
        this.plugin.settings.terminal.startupCommand = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Working directory").setDesc("Where each new terminal starts.").addDropdown(
      (drop) => drop.addOption("vault", "Vault root").addOption("home", "Home directory").setValue(this.plugin.settings.terminal.cwd).onChange(async (value) => {
        this.plugin.settings.terminal.cwd = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Font size").setDesc("Font size used inside the terminal.").addSlider(
      (slider) => slider.setLimits(10, 22, 1).setValue(this.plugin.settings.terminal.fontSize).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.terminal.fontSize = value;
        await this.plugin.saveSettings();
      })
    );
  }
};

// src/tools/editor.ts
var import_obsidian2 = require("obsidian");

// src/tools/types.ts
function wrap(data) {
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
}

// src/tools/editor.ts
function getSelectionData(app) {
  const view = app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
  if (!view?.file) return null;
  const editor = view.editor;
  const basePath = app.vault.adapter.getBasePath();
  const cursor = editor.getCursor();
  const from = editor.getCursor("from");
  const to = editor.getCursor("to");
  const text = editor.getSelection();
  const rel = view.file.path;
  return {
    filePath: basePath + "/" + rel,
    relativePath: rel.includes(" ") ? `"${rel}"` : rel,
    cursor: { line: cursor.line, character: cursor.ch },
    selection: {
      start: { line: from.line, character: from.ch },
      end: { line: to.line, character: to.ch },
      isEmpty: text === "",
      text
    }
  };
}
function createEditorTools(app, getLatestSelection) {
  function basePath() {
    return app.vault.adapter.getBasePath();
  }
  return [
    {
      name: "getLatestSelection",
      description: "The primary tool for finding out what the user has open in Obsidian. Returns the file path, cursor position, and selected text for the note the user was last working in. Works whether or not the Obsidian editor is currently focused \u2014 it returns the cached last-known state when focus is elsewhere (e.g. the user switched to a terminal to type a message) and falls back to the live state when Obsidian is focused. Always call this first when the user asks about their current file, selection, or context.",
      inputSchema: { type: "object", properties: {} },
      call() {
        const d = getLatestSelection() ?? getSelectionData(app);
        return d ? wrap(d) : wrap({ error: "no selection tracked yet" });
      }
    },
    {
      name: "getOpenEditors",
      description: "Returns all open markdown tabs in the Obsidian workspace. Each tab has a file URI, display label, languageId ('markdown'), and an isActive flag. isActive is true only when the Obsidian editor window is focused \u2014 it will be false for every tab when the user is in a terminal. Only call this when you need the full list of open tabs; to find the user's current file, use getLatestSelection instead.",
      inputSchema: { type: "object", properties: {} },
      call() {
        const base = basePath();
        const leaves = app.workspace.getLeavesOfType("markdown");
        const active = app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
        return wrap({
          tabs: leaves.filter((l) => l.view.file).map((l) => {
            const file = l.view.file;
            return {
              uri: "file://" + base + "/" + file.path,
              isActive: l.view === active,
              label: file.basename,
              languageId: "markdown"
            };
          })
        });
      }
    },
    {
      name: "getWorkspaceFolders",
      description: "Returns the absolute path to the Obsidian vault root. Use this to resolve relative file paths returned by other tools.",
      inputSchema: { type: "object", properties: {} },
      call() {
        return wrap({ folders: [basePath()] });
      }
    }
  ];
}

// src/tools/tasks.ts
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
function createTasksTool(getBasePath) {
  return {
    name: "getTasks",
    description: "Get all pending tasks from the vault, grouped by overdue, today, this week, future, and undated. Reads from the Task Board plugin cache. Requires the Task Board plugin to be installed and active.",
    inputSchema: { type: "object", properties: {} },
    call() {
      try {
        const basePath = getBasePath();
        const cachePath = (0, import_node_path.join)(basePath, ".obsidian", "plugins", "task-board", "tasks.json");
        const cache = JSON.parse((0, import_node_fs.readFileSync)(cachePath, "utf-8"));
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        const pad = (n) => String(n).padStart(2, "0");
        const localDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        const todayStr = localDate(today);
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() + 7);
        const weekEndStr = localDate(weekEnd);
        const overdue = [];
        const dueToday = [];
        const dueThisWeek = [];
        const future = [];
        const undated = [];
        const pending = cache.Pending;
        for (const tasks of Object.values(pending)) {
          for (const task of tasks) {
            const t = {
              id: task.id,
              title: task.title.replace(/^-\s*\[.\]\s*/, "").replace(/📅.*$/, "").trim(),
              due: task.due || null,
              priority: task.priority,
              tags: task.tags,
              file: task.filePath
            };
            if (!task.due) undated.push(t);
            else if (task.due < todayStr) overdue.push(t);
            else if (task.due === todayStr) dueToday.push(t);
            else if (task.due <= weekEndStr) dueThisWeek.push(t);
            else future.push(t);
          }
        }
        return wrap({
          asOf: cache.Modified_at,
          summary: {
            overdue: overdue.length,
            today: dueToday.length,
            thisWeek: dueThisWeek.length,
            future: future.length,
            undated: undated.length
          },
          overdue,
          today: dueToday,
          thisWeek: dueThisWeek,
          future,
          undated
        });
      } catch (e) {
        return wrap({
          error: "Could not read Task Board cache. Is the Task Board plugin installed and active?",
          detail: String(e)
        });
      }
    }
  };
}

// src/terminal/view.ts
var import_obsidian3 = require("obsidian");
var import_xterm2 = __toESM(require_xterm());
var import_addon_fit = __toESM(require_addon_fit());
var import_addon_web_links = __toESM(require_addon_web_links());

// src/terminal/pty.ts
var import_node_path2 = require("node:path");
function loadNodePty(pluginDir) {
  const pkgDir = (0, import_node_path2.join)(pluginDir, "node-pty");
  return require(pkgDir);
}
function spawnShell(opts) {
  const nodePty = loadNodePty(opts.pluginDir);
  const env = {
    ...process.env,
    ...opts.env,
    TERM: opts.env?.TERM ?? "xterm-256color",
    COLORTERM: opts.env?.COLORTERM ?? "truecolor"
  };
  return nodePty.spawn(opts.shell, opts.args ?? [], {
    name: "xterm-256color",
    cols: opts.cols ?? 80,
    rows: opts.rows ?? 24,
    cwd: opts.cwd,
    env,
    encoding: "utf8"
  });
}
function defaultShell() {
  if (process.platform === "win32") {
    return { file: process.env.COMSPEC || "cmd.exe", args: [] };
  }
  const shell = process.env.SHELL || "/bin/bash";
  return { file: shell, args: [] };
}

// node_modules/@xterm/xterm/css/xterm.css
var xterm_default = `/**
 * Copyright (c) 2014 The xterm.js authors. All rights reserved.
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * https://github.com/chjj/term.js
 * @license MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 *   The original design remains. The terminal itself
 *   has been extended to include xterm CSI codes, among
 *   other features.
 */

/**
 *  Default styles for xterm.js
 */

.xterm {
    cursor: text;
    position: relative;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

.xterm.focus,
.xterm:focus {
    outline: none;
}

.xterm .xterm-helpers {
    position: absolute;
    top: 0;
    /**
     * The z-index of the helpers must be higher than the canvases in order for
     * IMEs to appear on top.
     */
    z-index: 5;
}

.xterm .xterm-helper-textarea {
    padding: 0;
    border: 0;
    margin: 0;
    /* Move textarea out of the screen to the far left, so that the cursor is not visible */
    position: absolute;
    opacity: 0;
    left: -9999em;
    top: 0;
    width: 0;
    height: 0;
    z-index: -5;
    /** Prevent wrapping so the IME appears against the textarea at the correct position */
    white-space: nowrap;
    overflow: hidden;
    resize: none;
}

.xterm .composition-view {
    /* TODO: Composition position got messed up somewhere */
    background: #000;
    color: #FFF;
    display: none;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
}

.xterm .composition-view.active {
    display: block;
}

.xterm .xterm-viewport {
    /* On OS X this is required in order for the scroll bar to appear fully opaque */
    background-color: #000;
    overflow-y: scroll;
    cursor: default;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
}

.xterm .xterm-screen {
    position: relative;
}

.xterm .xterm-screen canvas {
    position: absolute;
    left: 0;
    top: 0;
}

.xterm-char-measure-element {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: -9999em;
    line-height: normal;
}

.xterm.enable-mouse-events {
    /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
    cursor: default;
}

.xterm.xterm-cursor-pointer,
.xterm .xterm-cursor-pointer {
    cursor: pointer;
}

.xterm.column-select.focus {
    /* Column selection mode */
    cursor: crosshair;
}

.xterm .xterm-accessibility:not(.debug),
.xterm .xterm-message {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    color: transparent;
    pointer-events: none;
}

.xterm .xterm-accessibility-tree:not(.debug) *::selection {
  color: transparent;
}

.xterm .xterm-accessibility-tree {
  font-family: monospace;
  user-select: text;
  white-space: pre;
}

.xterm .xterm-accessibility-tree > div {
  transform-origin: left;
  width: fit-content;
}

.xterm .live-region {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

.xterm-dim {
    /* Dim should not apply to background, so the opacity of the foreground color is applied
     * explicitly in the generated class and reset to 1 here */
    opacity: 1 !important;
}

.xterm-underline-1 { text-decoration: underline; }
.xterm-underline-2 { text-decoration: double underline; }
.xterm-underline-3 { text-decoration: wavy underline; }
.xterm-underline-4 { text-decoration: dotted underline; }
.xterm-underline-5 { text-decoration: dashed underline; }

.xterm-overline {
    text-decoration: overline;
}

.xterm-overline.xterm-underline-1 { text-decoration: overline underline; }
.xterm-overline.xterm-underline-2 { text-decoration: overline double underline; }
.xterm-overline.xterm-underline-3 { text-decoration: overline wavy underline; }
.xterm-overline.xterm-underline-4 { text-decoration: overline dotted underline; }
.xterm-overline.xterm-underline-5 { text-decoration: overline dashed underline; }

.xterm-strikethrough {
    text-decoration: line-through;
}

.xterm-screen .xterm-decoration-container .xterm-decoration {
	z-index: 6;
	position: absolute;
}

.xterm-screen .xterm-decoration-container .xterm-decoration.xterm-decoration-top-layer {
	z-index: 7;
}

.xterm-decoration-overview-ruler {
    z-index: 8;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: none;
}

.xterm-decoration-top {
    z-index: 2;
    position: relative;
}



/* Derived from vs/base/browser/ui/scrollbar/media/scrollbar.css */

/* xterm.js customization: Override xterm's cursor style */
.xterm .xterm-scrollable-element > .scrollbar {
    cursor: default;
}

/* Arrows */
.xterm .xterm-scrollable-element > .scrollbar > .scra {
	cursor: pointer;
	font-size: 11px !important;
}

.xterm .xterm-scrollable-element > .visible {
	opacity: 1;

	/* Background rule added for IE9 - to allow clicks on dom node */
	background:rgba(0,0,0,0);

	transition: opacity 100ms linear;
	/* In front of peek view */
	z-index: 11;
}
.xterm .xterm-scrollable-element > .invisible {
	opacity: 0;
	pointer-events: none;
}
.xterm .xterm-scrollable-element > .invisible.fade {
	transition: opacity 800ms linear;
}

/* Scrollable Content Inset Shadow */
.xterm .xterm-scrollable-element > .shadow {
	position: absolute;
	display: none;
}
.xterm .xterm-scrollable-element > .shadow.top {
	display: block;
	top: 0;
	left: 3px;
	height: 3px;
	width: 100%;
	box-shadow: var(--vscode-scrollbar-shadow, #000) 0 6px 6px -6px inset;
}
.xterm .xterm-scrollable-element > .shadow.left {
	display: block;
	top: 3px;
	left: 0;
	height: 100%;
	width: 3px;
	box-shadow: var(--vscode-scrollbar-shadow, #000) 6px 0 6px -6px inset;
}
.xterm .xterm-scrollable-element > .shadow.top-left-corner {
	display: block;
	top: 0;
	left: 0;
	height: 3px;
	width: 3px;
}
.xterm .xterm-scrollable-element > .shadow.top.left {
	box-shadow: var(--vscode-scrollbar-shadow, #000) 6px 0 6px -6px inset;
}
`;

// src/terminal/styles.ts
var STYLE_EL_ID = "agent-mcp-terminal-styles";
function ensureTerminalStyles() {
  if (document.getElementById(STYLE_EL_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_EL_ID;
  style.textContent = xterm_default + `
.agent-mcp-terminal-host { width: 100%; height: 100%; }
.agent-mcp-terminal-host .xterm-viewport { overflow-y: auto; }
`;
  document.head.appendChild(style);
}

// src/terminal/view.ts
var AGENT_TERMINAL_VIEW_TYPE = "agent-terminal";
var AgentTerminalView = class extends import_obsidian3.ItemView {
  constructor(leaf, configProvider) {
    super(leaf);
    this.configProvider = configProvider;
    this.navigation = true;
  }
  term = null;
  fit = null;
  pty = null;
  resizeObserver = null;
  disposers = [];
  getViewType() {
    return AGENT_TERMINAL_VIEW_TYPE;
  }
  getDisplayText() {
    return "Agent Terminal";
  }
  getIcon() {
    return "terminal";
  }
  async onOpen() {
    ensureTerminalStyles();
    const container = this.contentEl;
    container.empty();
    container.addClass("agent-mcp-terminal-container");
    container.style.padding = "0";
    container.style.height = "100%";
    container.style.background = "var(--background-primary)";
    const host = container.createDiv({ cls: "agent-mcp-terminal-host" });
    host.style.width = "100%";
    host.style.height = "100%";
    const cfg = this.configProvider();
    const term = new import_xterm2.Terminal({
      fontFamily: cfg.fontFamily || 'Menlo, Consolas, "Liberation Mono", monospace',
      fontSize: cfg.fontSize || 13,
      cursorBlink: true,
      convertEol: false,
      allowProposedApi: true,
      theme: readTheme(),
      scrollback: 1e4
    });
    const fit = new import_addon_fit.FitAddon();
    const links = new import_addon_web_links.WebLinksAddon();
    term.loadAddon(fit);
    term.loadAddon(links);
    term.open(host);
    fit.fit();
    this.term = term;
    this.fit = fit;
    try {
      this.pty = this.startPty(cfg, term.cols, term.rows);
    } catch (err) {
      term.writeln("\x1B[31mFailed to start shell:\x1B[0m " + String(err));
      term.writeln("");
      term.writeln("The native PTY module could not be loaded. If you built from source,");
      term.writeln("run `npm install` and `npm run build` again. If you installed the release,");
      term.writeln("make sure the `node-pty/` folder is present next to main.js.");
      return;
    }
    this.wirePtyToTerm(this.pty, term);
    if (cfg.startupCommand && cfg.startupCommand.trim().length > 0) {
      this.pty.write(cfg.startupCommand + "\r");
    }
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.fit || !this.term || !this.pty) return;
      try {
        this.fit.fit();
        this.pty.resize(this.term.cols, this.term.rows);
      } catch {
      }
    });
    this.resizeObserver.observe(host);
    term.focus();
  }
  startPty(cfg, cols, rows) {
    const { file, args } = cfg.shell ? { file: cfg.shell, args: cfg.shellArgs ?? [] } : defaultShell();
    return spawnShell({
      pluginDir: cfg.pluginDir,
      shell: file,
      args,
      cwd: cfg.cwd,
      cols,
      rows
    });
  }
  wirePtyToTerm(pty, term) {
    this.disposers.push(
      pty.onData((data) => term.write(data)),
      pty.onExit(({ exitCode }) => {
        term.writeln("");
        term.writeln(`\x1B[90m[process exited with code ${exitCode}]\x1B[0m`);
      }),
      term.onData((data) => pty.write(data))
    );
  }
  async onClose() {
    for (const d of this.disposers) {
      try {
        d.dispose();
      } catch {
      }
    }
    this.disposers = [];
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    try {
      this.pty?.kill();
    } catch {
    }
    this.pty = null;
    try {
      this.term?.dispose();
    } catch {
    }
    this.term = null;
    this.fit = null;
  }
};
function readTheme() {
  const styles = getComputedStyle(document.body);
  const v = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
  return {
    background: v("--background-primary", "#1e1e1e"),
    foreground: v("--text-normal", "#d4d4d4"),
    cursor: v("--text-normal", "#d4d4d4"),
    selectionBackground: v("--text-selection", "#264f78")
  };
}

// src/main.ts
var GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
var OPCODE = { TEXT: 1, CLOSE: 8, PING: 9, PONG: 10 };
var MCP_HTTP_PORT = 27183;
var DEFAULT_MCP_PROTOCOL_VERSION = "2025-03-26";
var SUPPORTED_MCP_PROTOCOL_VERSIONS = /* @__PURE__ */ new Set([
  "2024-11-05",
  "2025-03-26",
  "2025-06-18",
  "2025-11-25"
]);
var LOCK_DIR = (0, import_node_path3.join)((0, import_node_os.homedir)(), ".claude", "ide");
function createLockFile(port, pid, vaultPath, authToken) {
  (0, import_node_fs2.mkdirSync)(LOCK_DIR, { recursive: true });
  const tmp = (0, import_node_path3.join)(LOCK_DIR, `${port}.lock.tmp`);
  const lockPath = (0, import_node_path3.join)(LOCK_DIR, `${port}.lock`);
  (0, import_node_fs2.writeFileSync)(tmp, JSON.stringify({ pid, port, workspaceFolders: [vaultPath], ideName: "Obsidian", transport: "ws", authToken }));
  (0, import_node_fs2.renameSync)(tmp, lockPath);
}
function removeLockFile(port) {
  try {
    (0, import_node_fs2.unlinkSync)((0, import_node_path3.join)(LOCK_DIR, `${port}.lock`));
  } catch {
  }
}
function cleanStaleLockFiles() {
  try {
    for (const file of (0, import_node_fs2.readdirSync)(LOCK_DIR).filter((f) => f.endsWith(".lock"))) {
      const p = (0, import_node_path3.join)(LOCK_DIR, file);
      try {
        const data = JSON.parse((0, import_node_fs2.readFileSync)(p, "utf-8"));
        if (data.ideName !== "Obsidian") continue;
        process.kill(data.pid, 0);
      } catch {
        try {
          (0, import_node_fs2.unlinkSync)(p);
        } catch {
        }
      }
    }
  } catch {
  }
}
function computeAcceptKey(key) {
  return (0, import_node_crypto2.createHash)("sha1").update(key + GUID).digest("base64");
}
function parseFrame(buf) {
  const opcode = buf[0] & 15;
  const masked = (buf[1] & 128) !== 0;
  let len = buf[1] & 127;
  let offset = 2;
  if (len === 126) {
    if (buf.length < 4) return null;
    len = buf.readUInt16BE(2);
    offset = 4;
  } else if (len === 127) {
    if (buf.length < 10) return null;
    len = Number(buf.readBigUInt64BE(2));
    offset = 10;
  }
  if (masked) {
    const end = offset + 4;
    if (buf.length < end + len) return null;
    const mask = buf.subarray(offset, end);
    const payload = Buffer.alloc(len);
    for (let i = 0; i < len; i++) payload[i] = buf[end + i] ^ mask[i % 4];
    return { opcode, payload, totalLength: end + len };
  }
  if (buf.length < offset + len) return null;
  return { opcode, payload: buf.subarray(offset, offset + len), totalLength: offset + len };
}
function makeFrame(opcode, data) {
  const payload = typeof data === "string" ? Buffer.from(data) : data;
  const len = payload.length;
  let header;
  if (len < 126) {
    header = Buffer.alloc(2);
    header[0] = 128 | opcode;
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[0] = 128 | opcode;
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 128 | opcode;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }
  return Buffer.concat([header, payload]);
}
var ObsidianAgentMCP = class extends import_obsidian4.Plugin {
  clients = /* @__PURE__ */ new Set();
  server = null;
  mcpServer = null;
  mcpSessions = /* @__PURE__ */ new Map();
  codexSseSessions = /* @__PURE__ */ new Set();
  port = 0;
  pingInterval = null;
  broadcastTimer = null;
  prevStateKey = null;
  authToken = "";
  latestSelection = getSelectionData(this.app);
  settings = DEFAULT_SETTINGS;
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new AgentMCPSettingsTab(this.app, this));
    cleanStaleLockFiles();
    this.authToken = (0, import_node_crypto.randomUUID)();
    this.port = await this.startServer();
    const vaultPath = this.basePath();
    createLockFile(this.port, process.pid, vaultPath, this.authToken);
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.scheduleBroadcast()));
    this.registerDomEvent(window, "focus", () => {
      this.prevStateKey = null;
      this.scheduleBroadcast();
    });
    this.registerDomEvent(document, "selectionchange", () => this.scheduleBroadcast());
    this.addCommand({
      id: "send-to-claude",
      name: "Send to Claude",
      editorCallback: () => {
        const data = this.captureSelection();
        if (!data) return;
        this.broadcast({ jsonrpc: "2.0", method: "at_mentioned", params: data });
      }
    });
    this.registerView(
      AGENT_TERMINAL_VIEW_TYPE,
      (leaf) => new AgentTerminalView(leaf, () => this.getTerminalConfig())
    );
    this.addCommand({
      id: "open-agent-terminal",
      name: "Open Agent Terminal",
      callback: () => this.openTerminalView()
    });
    this.addRibbonIcon("terminal", "Open Agent Terminal", () => this.openTerminalView());
    this.startMcpHttpServer();
    console.log(`[claude-mcp] listening on 127.0.0.1:${this.port}`);
  }
  onunload() {
    if (this.broadcastTimer) clearTimeout(this.broadcastTimer);
    if (this.pingInterval) clearInterval(this.pingInterval);
    for (const c of this.clients) c.socket.destroy();
    this.clients.clear();
    this.server?.close();
    this.mcpServer?.close();
    if (this.port) removeLockFile(this.port);
    this.app.workspace.detachLeavesOfType(AGENT_TERMINAL_VIEW_TYPE);
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  basePath() {
    return this.app.vault.adapter.getBasePath();
  }
  // ── Terminal ───────────────────────────────────────────────────────────────
  pluginDir() {
    return (0, import_node_path3.join)(this.basePath(), ".obsidian", "plugins", this.manifest.id);
  }
  getTerminalConfig() {
    const t = this.settings.terminal;
    const shellArgs = t.shellArgs.trim().length ? t.shellArgs.split(/\s+/).filter(Boolean) : void 0;
    return {
      pluginDir: this.pluginDir(),
      cwd: t.cwd === "home" ? (0, import_node_os.homedir)() : this.basePath(),
      shell: t.shell.trim() || void 0,
      shellArgs,
      startupCommand: t.startupCommand,
      fontSize: t.fontSize
    };
  }
  async openTerminalView() {
    const existing = this.app.workspace.getLeavesOfType(AGENT_TERMINAL_VIEW_TYPE);
    if (existing.length > 0) {
      this.app.workspace.revealLeaf(existing[0]);
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) return;
    await leaf.setViewState({ type: AGENT_TERMINAL_VIEW_TYPE, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  // ── Tool registry ──────────────────────────────────────────────────────────
  getActiveTools() {
    const tools = [...createEditorTools(this.app, () => this.latestSelection)];
    if (this.settings.enabledTools.tasks) {
      tools.push(createTasksTool(() => this.basePath()));
    }
    return tools;
  }
  // ── Broadcasting ───────────────────────────────────────────────────────────
  scheduleBroadcast() {
    if (this.broadcastTimer) clearTimeout(this.broadcastTimer);
    this.broadcastTimer = setTimeout(() => {
      this.broadcastTimer = null;
      this.doBroadcast();
    }, 100);
  }
  doBroadcast() {
    const data = this.captureSelection();
    if (!data) return;
    const key = JSON.stringify({ f: data.filePath, c: data.cursor, s: data.selection });
    if (key === this.prevStateKey) return;
    this.prevStateKey = key;
    this.broadcast({
      jsonrpc: "2.0",
      method: "selection_changed",
      params: { text: data.selection.text, filePath: data.filePath, fileUrl: "file://" + data.filePath, selection: data.selection }
    });
  }
  broadcast(msg) {
    const frame = makeFrame(OPCODE.TEXT, JSON.stringify(msg));
    for (const c of this.clients) {
      if (c.socket.writable) c.socket.write(frame);
    }
    const sseData = `event: message
data: ${JSON.stringify(msg)}

`;
    for (const res of this.codexSseSessions) {
      if (!res.writableEnded) res.write(sseData);
      else this.codexSseSessions.delete(res);
    }
  }
  captureSelection() {
    const data = getSelectionData(this.app);
    if (data) this.latestSelection = data;
    return data;
  }
  // ── RPC routing ────────────────────────────────────────────────────────────
  handleRpc(msg) {
    const id = msg.id;
    const tools = this.getActiveTools();
    switch (msg.method) {
      case "initialize":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: msg.params?.protocolVersion || "2025-03-26",
            capabilities: { tools: {} },
            serverInfo: { name: "obsidian-agent-mcp", version: this.manifest.version }
          }
        };
      case "tools/list":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            tools: tools.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema }))
          }
        };
      case "tools/call": {
        const name = msg.params?.name;
        const tool = tools.find((t) => t.name === name);
        if (!tool) return { jsonrpc: "2.0", id, error: { code: -32601, message: `Tool not found: ${name}` } };
        return { jsonrpc: "2.0", id, result: tool.call(msg.params) };
      }
      default:
        if (["openDiff", "getDiagnostics", "checkDocumentDirty", "saveDocument", "close_tab", "closeAllDiffTabs", "executeCode"].includes(msg.method))
          return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: "{}" }] } };
        return { jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } };
    }
  }
  // ── WebSocket server ───────────────────────────────────────────────────────
  handleClient(socket, headers) {
    if (headers["x-claude-code-ide-authorization"] !== this.authToken) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
    const wsKey = headers["sec-websocket-key"];
    if (!wsKey || Array.isArray(wsKey)) {
      socket.write("HTTP/1.1 400 Bad Request\r\n\r\n");
      socket.destroy();
      return;
    }
    const protocol = headers["sec-websocket-protocol"];
    socket.write(
      `HTTP/1.1 101 Switching Protocols\r
Upgrade: websocket\r
Connection: Upgrade\r
Sec-WebSocket-Accept: ${computeAcceptKey(wsKey)}\r
` + (protocol ? `Sec-WebSocket-Protocol: ${protocol}\r
` : "") + "\r\n"
    );
    const client = { socket, buffer: Buffer.alloc(0), alive: true };
    this.clients.add(client);
    socket.on("data", (data) => {
      client.buffer = Buffer.concat([client.buffer, data]);
      this.processFrames(client);
    });
    socket.on("close", () => this.clients.delete(client));
    socket.on("error", () => this.clients.delete(client));
  }
  processFrames(client) {
    while (true) {
      const frame = parseFrame(client.buffer);
      if (!frame) break;
      client.buffer = client.buffer.subarray(frame.totalLength);
      if (!client.socket.writable) break;
      if (frame.opcode === OPCODE.PING) {
        client.socket.write(makeFrame(OPCODE.PONG, frame.payload));
      } else if (frame.opcode === OPCODE.PONG) {
        client.alive = true;
      } else if (frame.opcode === OPCODE.CLOSE) {
        client.socket.write(makeFrame(OPCODE.CLOSE, Buffer.alloc(0)));
        client.socket.destroy();
        this.clients.delete(client);
        break;
      } else if (frame.opcode === OPCODE.TEXT) {
        try {
          const msg = JSON.parse(frame.payload.toString());
          if (msg.id == null) continue;
          client.socket.write(makeFrame(OPCODE.TEXT, JSON.stringify(this.handleRpc(msg))));
        } catch {
          client.socket.write(makeFrame(OPCODE.TEXT, JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } })));
        }
      }
    }
  }
  startServer() {
    return new Promise((resolve, reject) => {
      this.server = (0, import_node_http.createServer)((_req, res) => {
        res.writeHead(400);
        res.end();
      });
      this.server.on("upgrade", (req, socket, head) => {
        const s = socket;
        if (head.length > 0) s.unshift(head);
        this.handleClient(s, req.headers);
      });
      this.server.on("error", reject);
      this.server.listen(0, "127.0.0.1", () => {
        const addr = this.server.address();
        this.pingInterval = setInterval(() => {
          for (const c of this.clients) {
            if (!c.alive) {
              c.socket.destroy();
              this.clients.delete(c);
              continue;
            }
            c.alive = false;
            if (c.socket.writable) c.socket.write(makeFrame(OPCODE.PING, Buffer.alloc(0)));
          }
        }, 3e4);
        resolve(addr.port);
      });
    });
  }
  // ── MCP HTTP/SSE server ────────────────────────────────────────────────────
  isLocalhostRequest(req, res) {
    const host = Array.isArray(req.headers["host"]) ? req.headers["host"][0] : req.headers["host"];
    if (!host || !(/* @__PURE__ */ new Set([`127.0.0.1:${MCP_HTTP_PORT}`, `localhost:${MCP_HTTP_PORT}`])).has(host)) {
      res.writeHead(403);
      res.end();
      return false;
    }
    const origin = req.headers["origin"];
    if (origin !== void 0) {
      res.writeHead(403);
      res.end();
      return false;
    }
    return true;
  }
  getProtocolVersionHeader(req) {
    const raw = Array.isArray(req.headers["mcp-protocol-version"]) ? req.headers["mcp-protocol-version"][0] : req.headers["mcp-protocol-version"];
    if (raw == null || raw === "") return DEFAULT_MCP_PROTOCOL_VERSION;
    return SUPPORTED_MCP_PROTOCOL_VERSIONS.has(raw) ? raw : DEFAULT_MCP_PROTOCOL_VERSION;
  }
  parseJsonRpcBody(body) {
    return JSON.parse(body);
  }
  handleStreamableHttpPayload(payload) {
    const messages = Array.isArray(payload) ? payload : [payload];
    const responses = [];
    for (const msg of messages) {
      if (!msg || typeof msg !== "object") return { status: 400 };
      const rpc = msg;
      if (rpc.jsonrpc !== "2.0") return { status: 400 };
      if (typeof rpc.method !== "string" || rpc.id == null) continue;
      responses.push(this.handleRpc({
        jsonrpc: "2.0",
        id: rpc.id,
        method: rpc.method,
        params: rpc.params
      }));
    }
    if (responses.length === 0) return { status: 202 };
    return {
      status: 200,
      body: JSON.stringify(Array.isArray(payload) ? responses : responses[0])
    };
  }
  startMcpHttpServer() {
    this.mcpServer = (0, import_node_http.createServer)((req, res) => {
      if (!this.isLocalhostRequest(req, res)) return;
      const protocolVersion = this.getProtocolVersionHeader(req);
      const url = new URL(req.url ?? "/", `http://127.0.0.1:${MCP_HTTP_PORT}`);
      if (url.pathname === "/mcp" && req.method === "GET") {
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "MCP-Protocol-Version": protocolVersion
        });
        this.codexSseSessions.add(res);
        req.on("close", () => this.codexSseSessions.delete(res));
        res.write(": keepalive\n\n");
        return;
      }
      if (url.pathname === "/mcp" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => body += chunk.toString());
        req.on("end", () => {
          try {
            const result = this.handleStreamableHttpPayload(this.parseJsonRpcBody(body));
            if (result.status === 200) {
              res.writeHead(200, {
                "Content-Type": "application/json",
                "MCP-Protocol-Version": protocolVersion
              });
              res.end(result.body);
              return;
            }
            res.writeHead(result.status, {
              "MCP-Protocol-Version": protocolVersion
            });
            res.end();
          } catch {
            res.writeHead(400, {
              "MCP-Protocol-Version": protocolVersion
            });
            res.end();
          }
        });
        return;
      }
      if (url.pathname === "/sse" && req.method === "GET") {
        const sessionId = (0, import_node_crypto.randomUUID)();
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "MCP-Protocol-Version": protocolVersion
        });
        this.mcpSessions.set(sessionId, res);
        res.write(`event: endpoint
data: http://127.0.0.1:${MCP_HTTP_PORT}/message?sessionId=${sessionId}

`);
        req.on("close", () => this.mcpSessions.delete(sessionId));
        return;
      }
      if (url.pathname === "/message" && req.method === "POST") {
        const sseRes = this.mcpSessions.get(url.searchParams.get("sessionId") ?? "");
        let body = "";
        req.on("data", (chunk) => body += chunk.toString());
        req.on("end", () => {
          try {
            const msg = JSON.parse(body);
            res.writeHead(202, { "MCP-Protocol-Version": protocolVersion });
            res.end();
            if (msg.id != null && sseRes && !sseRes.writableEnded) {
              sseRes.write(`event: message
data: ${JSON.stringify(this.handleRpc(msg))}

`);
            }
          } catch {
            res.writeHead(400, { "MCP-Protocol-Version": protocolVersion });
            res.end();
          }
        });
        return;
      }
      res.writeHead(404, { "MCP-Protocol-Version": protocolVersion });
      res.end();
    });
    this.mcpServer.on("error", (err) => {
      if (err.code !== "EADDRINUSE") console.error("[claude-mcp] MCP HTTP error:", err);
    });
    this.mcpServer.listen(
      MCP_HTTP_PORT,
      "127.0.0.1",
      () => console.log(`[claude-mcp] MCP HTTP server on 127.0.0.1:${MCP_HTTP_PORT}`)
    );
  }
};
