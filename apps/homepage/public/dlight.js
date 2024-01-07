const N = {}; "global" in N || (typeof window < "u" ? N.global = window : typeof global < "u" ? N.global = global : N.global = {}); "document" in N || typeof document < "u" && (N.document = document); const o = N; function y(i) { o.global = i } function T(i) { o.document = i } const c = { Comp: 0, For: 1, Cond: 2, Env: 3, Exp: 4, Subview: 5 }; var u = class {_$dlNodeType; constructor(t) { this._$dlNodeType = t } get _$el() { return u.toEls(this._$nodes) } static toEls(t) { const e = []; return this.loopShallowEls(t, n => { e.push(n) }), e } static loopShallowEls(t, e) { t.forEach(n => { if (!("_$dlNodeType" in n)) return e(n); n._$nodes && u.loopShallowEls(n._$nodes, e) }) } static addParentEl(t, e) { t.forEach(n => { "_$dlNodeType" in n && (n._$parentEl = e, n._$nodes && u.addParentEl(n._$nodes, e)) }) } static getFlowIndexFromNodes(t, e) { let n = 0; const s = [...t]; for (;s.length > 0;) { const r = s.shift(); if (r === e) break; "_$dlNodeType" in r ? r._$nodes && s.unshift(...r._$nodes) : n++ } return n } static appendNodesWithSibling(t, e, n) { return n ? this.insertNodesBefore(t, e, n) : this.appendNodes(t, e) } static appendNodesWithIndex(t, e, n, s) { return s = s ?? e.childNodes.length, s !== n ? this.insertNodesBefore(t, e, e.childNodes[n]) : this.appendNodes(t, e) } static insertNodesBefore(t, e, n) { let s = 0; return this.loopShallowEls(t, r => { e.insertBefore(r, n), s++ }), s } static appendNodes(t, e) { let n = 0; return this.loopShallowEls(t, s => { e.appendChild(s), n++ }), n } static addWillUnmount(t, e) { const n = o.global.WillUnmountStore; const s = n[n.length - 1]; s && s.push(e.bind(null, t)) } static addDidUnmount(t, e) { const n = o.global.DidUnmountStore; const s = n[n.length - 1]; s && s.push(e.bind(null, t)) } static addDidMount(t, e) { o.global.DidMountStore || (o.global.DidMountStore = []), o.global.DidMountStore.push(e.bind(null, t)) } static runDidMount() { const t = o.global.DidMountStore; if (!(!t || t.length === 0)) { for (let e = t.length - 1; e >= 0; e--)t[e](); o.global.DidMountStore = [] } }}; function O(i, t) { Object.assign(i.style, t) } function H(i, t) { Object.assign(i.dataset, t) } function S(i, t, e) { const n = `$${t}`; n in i && i[n] === e || (i[t] = e, i[n] = e) } function K(i, t) { Object.entries(t).forEach(([e, n]) => { S(i, e, n) }) } function _(i, t, e) { const n = `$${t}`; n in i && i[n] === e || (i.setAttribute(t, e), i[n] = e) } function j(i, t) { Object.entries(t).forEach(([e, n]) => { _(i, e, n) }) } function C(i, t, e) { const n = i[`$on${t}`]; n && i.removeEventListener(t, n), i.addEventListener(t, e), i[`$on${t}`] = e } function R(i) { const t = o.document.createElement("template"); t.innerHTML = i; const e = t.content.firstChild; return () => e.cloneNode(!0) } function X(i) { return o.document.createElement(i) } function L(i, t, e) { i._$nodes || (i._$nodes = Array.from(i.childNodes)), i._$nodes.splice(e, 0, t); const n = u.getFlowIndexFromNodes(i._$nodes, t); u.appendNodesWithIndex([t], i, n), u.addParentEl([t], i) } function b(i, t, e) { if (t === "style") { O(i, e); return } if (t === "dataset") { H(i, e); return } if (t !== "element") { if (t === "prop") { K(i, e); return } if (t === "attr") { j(i, e); return } if (t === "innerHTML") { S(i, "innerHTML", e); return } if (t !== "forwardProp") { if (t.startsWith("on")) { C(i, t.slice(2).toLowerCase(), e); return }_(i, t, e) } } } const D = class extends u {constructor() { super(c.Comp) }_$init(t, e, n, s) { this._$notInitd = !0, s && s._$addForwardProps(this), e !== null && this._$setContent(e), t && Object.entries(t).forEach(([r, p]) => { this._$setProp(r, p) }), n && (this._$children = n), o.global.DLEnvStore && Object.entries(o.global.DLEnvStore.envs).forEach(([r, [p, a]]) => { a.addNode(this), this._$initEnv(r, p, a) }), this._$callUpdatesBeforeInit(), this.didMount && u.addDidMount(this, this.didMount.bind(this)), this.willUnmount && u.addWillUnmount(this, this.willUnmount.bind(this)), this.didUnmount && u.addDidUnmount(this, this.didUnmount.bind(this)), this.willMount?.(), this._$nodes = this.View?.() ?? [] }_$callUpdatesBeforeInit() { const t = Object.getOwnPropertyNames(Object.getPrototypeOf(this)); const e = Object.getOwnPropertyNames(this); [...t, ...e].forEach(s => { if (s.startsWith("$w$")) return this[s.slice(3)](); s.startsWith("$f$") && (this[`$${s.slice(3)}`] = this[s]) }), delete this._$notInitd }_$setForwardProp(t, e) { if (t in this) { this[t] = e; return } this._$forwardPropsId.push(t); const n = `$${t}`; this[n] = e, Object.defineProperty(this, t, { get() { return this[n] }, set(s) { this[n] !== s && (this[n] = s, this._$forwardPropsSet?.forEach(r => { r._$dlNodeType === c.Comp && r._$setProp(t, s), r instanceof HTMLElement && b(r, t, s) })) } }) }_$addForwardProps(t) { this._$forwardPropsSet.add(t), this._$forwardPropsId.forEach(e => { const n = this[e]; this._$forwardPropsSet?.forEach(s => { s._$dlNodeType === c.Comp && ("_$forwardProps" in s && s._$forwardPropsId.push(e), s._$setProp(e, n)), s instanceof HTMLElement && b(s, e, n) }) }), u.addWillUnmount(t, this._$forwardPropsSet.delete.bind(this._$forwardPropsSet, t)) }_$setProp(t, e) { "_$forwardProps" in this && this._$setForwardProp(t, e), `$p$${t}` in this && (this[t] = e) }_$initEnv(t, e, n) { `$e$${t}` in this && (this[t] = e, this[`$en$${t}`] = n) }_$updateEnv(t, e, n) { `$e$${t}` in this && n === this[`$en$${t}`] && this[t] !== e && (this[t] = e) }_$setContent(t) { const e = this._$contentKey; e && this[e] !== t && (this[e] = t) }_$updateProp(t, e) { const n = `$${t}`; if (this[n] === e) return; const s = this[n]; this[n] = e, this._$updateDerived(t), this._$updateView(t, s, e) }_$updateDerived(t) { "_$notInitd" in this || this[`$s$${t}`]?.forEach(e => { `$w$${e}` in this ? this[e]() : this[`$${e}`] = this[`$f$${e}`] }) }_$updateView(t, e, n) { const s = this[`$$${t}`]; s && this._$update?.(s, t, e, n) }}; const et = D; function nt(i, t) { i._$updateDerived(t), i._$updateView(t) } const v = class {constructor() { this.envs = {}, this.currentEnvNodes = [] }addEnvNode(t) { this.currentEnvNodes.push(t), this.mergeEnvs() }replaceEnvNodes(t) { this.currentEnvNodes = t, this.mergeEnvs() }removeEnvNode() { this.currentEnvNodes.pop(), this.mergeEnvs() }mergeEnvs() { this.envs = {}, this.currentEnvNodes.forEach(t => { Object.entries(t.envs).forEach(([e, n]) => { this.envs[e] = [n, t] }) }) }}; const F = class extends u {constructor(t) { super(c.Env), "DLEnvStore" in o.global || (o.global.DLEnvStore = new v()), this.envs = t, this.updateNodes = new Set(), o.global.DLEnvStore.addEnvNode(this) }updateEnv(t, e) { this.envs[t] = e, o.global.DLEnvStore.currentEnvNodes.includes(this) && o.global.DLEnvStore.mergeEnvs(), this.updateNodes.forEach(n => { n._$updateEnv(t, e, this) }) }addNode(t) { this.updateNodes.add(t), u.addWillUnmount(t, this.updateNodes.delete.bind(this.updateNodes, t)) }initNodes(t) { this._$nodes = t, o.global.DLEnvStore.removeEnvNode() }}; function ut(i) { return o.document.createTextNode(i) } function ht(i, t) { i.textContent !== t && (i.textContent = t) } const I = class {propViewFunc; dlUpdateFunc = new Set(); constructor(t) { this.propViewFunc = t }build() { let t; const e = s => { t = s, this.dlUpdateFunc.add(s) }; const n = this.propViewFunc(e); return n.length === 0 ? [] : (t && u.addWillUnmount(n[0], this.dlUpdateFunc.delete.bind(this.dlUpdateFunc, t)), n) }update(...t) { this.dlUpdateFunc.forEach(e => { e(...t) }) }}; const W = class extends u {constructor() { super(c.Subview) }}; const w = class extends u {constructor(t) { super(t), o.global.DLEnvStore && o.global.DLEnvStore.currentEnvNodes.length > 0 && (this.savedEnvNodes = [...o.global.DLEnvStore.currentEnvNodes]) }initNewNodes(t) { u.addParentEl(t, this._$parentEl) }geneNewNodesInEnv(t) { if (!this.savedEnvNodes) { const s = t(); return this.initNewNodes(s), s } const e = o.global.DLEnvStore.currentEnvNodes; o.global.DLEnvStore.replaceEnvNodes(this.savedEnvNodes); const n = t(); return o.global.DLEnvStore.replaceEnvNodes(e), this.initNewNodes(n), n }initUnmountStore() { o.global.WillUnmountStore.push([]), o.global.DidUnmountStore.push([]) }removeNodes(t) { u.loopShallowEls(t, e => { this._$parentEl.removeChild(e) }) }}; var l = class extends w {array; nodeFunc; depNum; nodesMap = new Map(); updateMap = new Map(); get _$nodes() { const t = []; for (let e = 0; e < this.array.length; e++)t.push(...this.nodesMap.get(this.keys?.[e] ?? e)); return t }constructor(t, e, n) { super(c.For), this.array = [...t], this.keys = n, this.depNum = e }addNodeFunc(t) { this.nodeFunc = t, this.array.forEach((e, n) => { this.initUnmountStore(); const s = this.keys?.[n] ?? n; const r = t(e, this.updateMap, s); this.nodesMap.set(s, r), this.setUnmountMap(s) }), l.addWillUnmount(this, this.runAllWillUnmount.bind(this)), l.addDidUnmount(this, this.runAllDidUnmount.bind(this)) }update(t, ...e) { if (!(t & this.depNum)) { this.updateArgs = e; for (let n = 0; n < this.array.length; n++) this.updateItem(n, t) } }updateItem(t, e) { const n = this.keys?.[t] ?? t; this.updateMap.get(n)?.(e ?? this.depNum, ...this.updateArgs, this.array[t]) }updateArray(t, e, n, s, r) { if (this.updateArgs = [e, n, s], r) { this.updateWithKey(t, r); return } this.updateWithOutKey(t) }getNewNodes(t, e, n) { this.initUnmountStore(); const s = this.geneNewNodesInEnv(() => this.nodeFunc(n[t], this.updateMap, e)); return this.setUnmountMap(e), this.nodesMap.set(e, s), s }setUnmountMap(t) { const e = o.global.WillUnmountStore.pop(); e && e.length > 0 && (this.willUnmountMap || (this.willUnmountMap = new Map()), this.willUnmountMap.set(t, e)); const n = o.global.DidUnmountStore.pop(); n && n.length > 0 && (this.didUnmountMap || (this.didUnmountMap = new Map()), this.didUnmountMap.set(t, n)) }runAllWillUnmount() { !this.willUnmountMap || this.willUnmountMap.size === 0 || (this.willUnmountMap.forEach(t => { for (let e = 0; e < t.length; e++)t[e]?.() }), this.willUnmountMap.clear()) }runAllDidUnmount() { !this.didUnmountMap || this.didUnmountMap.size === 0 || (this.didUnmountMap.forEach(t => { for (let e = t.length - 1; e >= 0; e--)t[e]?.() }), this.didUnmountMap.clear()) }runWillUnmount(t) { if (!this.willUnmountMap || this.willUnmountMap.size === 0) return; const e = this.willUnmountMap.get(t); if (e) { for (let n = 0; n < e.length; n++)e[n]?.(); this.willUnmountMap.delete(t) } }runDidUnmount(t) { if (!this.didUnmountMap || this.didUnmountMap.size === 0) return; const e = this.didUnmountMap.get(t); if (e) { for (let n = e.length - 1; n >= 0; n--)e[n]?.(); this.didUnmountMap.delete(t) } }removeNodes(t, e) { this.runWillUnmount(e), super.removeNodes(t), this.runDidUnmount(e), this.updateMap.delete(e), this.nodesMap.delete(e) }updateWithOutKey(t) { const e = this.array.length; const n = t.length; if (e === n) { for (let r = 0; r < this.array.length; r++) this.updateItem(r); this.array = t; return } const s = this._$parentEl; if (e < n) { let r = l.getFlowIndexFromNodes(s._$nodes, this); const p = s.childNodes.length; for (let a = 0; a < n; a++) { if (a < e) { r += l.getFlowIndexFromNodes(this.nodesMap.get(a)), this.updateItem(a); continue } const f = this.getNewNodes(a, a, t); l.appendNodesWithIndex(f, s, r, p) }l.runDidMount(), this.array = t; return } for (let r = 0; r < n; r++) this.updateItem(r); for (let r = n; r < e; r++) { const p = this.nodesMap.get(r); this.removeNodes(p, r) } this.array = t }updateWithKey(t, e) { if (e.length !== new Set(e).size) throw new Error("DLight: Duplicate keys in for loop are not allowed"); const n = this.keys; if (this.keys = e, l.arrayEqual(n, this.keys)) { for (let d = 0; d < t.length; d++) this.updateItem(d); this.array = t; return } const s = this._$parentEl; if (this.keys.length === 0) { const d = s._$nodes ?? []; if (d.length === 1 && d[0] === this) this.runAllWillUnmount(), s.innerHTML = "", this.runAllDidUnmount(); else for (let h = 0; h < n.length; h++) { const m = n[h]; this.removeNodes(this.nodesMap.get(m), m) } this.nodesMap.clear(), this.updateMap.clear(), this.array = []; return } const r = l.getFlowIndexFromNodes(s._$nodes, this); if (n.length === 0) { const d = s.childNodes[r]; for (let h = 0; h < this.keys.length; h++) { const m = this.getNewNodes(h, this.keys[h], t); l.appendNodesWithSibling(m, s, d) }l.runDidMount(), this.array = t; return } const p = []; for (let d = 0; d < n.length; d++) { const h = n[d]; if (this.keys.includes(h)) { p.push(h); continue } this.removeNodes(this.nodesMap.get(h), h) } let a = s.childNodes.length; let f = r; for (let d = 0; d < this.keys.length; d++) { const h = this.keys[d]; if (p.includes(h)) { f += l.getFlowIndexFromNodes(this.nodesMap.get(h)), this.updateItem(d); continue } const m = this.getNewNodes(d, h, t); p.splice(d, 0, h); const U = l.appendNodesWithIndex(m, s, f, a); f += U, a += U } if (l.runDidMount(), l.arrayEqual(this.keys, p)) { this.array = t; return }f = r; const M = []; for (let d = 0; d < this.keys.length; d++) { const h = this.keys[d]; const m = p.indexOf(h); const U = M[d]; if (U) { const x = l.appendNodesWithIndex(U, s, f + l.getFlowIndexFromNodes(U), a); f += x, a += x, M[d] = void 0 } else if (m === d) { f += l.getFlowIndexFromNodes(this.nodesMap.get(h)); continue } else { M[this.keys.indexOf(p[d])] = this.nodesMap.get(this.keys[m]); const x = l.appendNodesWithIndex(this.nodesMap.get(h), s, f, a); f += x, a += x } const P = p[d]; p[d] = p[m], p[m] = P } this.array = t } static arrayEqual(t, e) { return t.length !== e.length ? !1 : t.every((n, s) => n === e[s]) }}; const E = class extends w {willUnmountFuncs = []; didUnmountFuncs = []; setUnmountFuncs() { this.willUnmountFuncs = o.global.WillUnmountStore.pop(), this.didUnmountFuncs = o.global.DidUnmountStore.pop() }runWillUnmount() { for (let t = 0; t < this.willUnmountFuncs.length; t++) this.willUnmountFuncs[t]() }runDidUnmount() { for (let t = this.didUnmountFuncs.length - 1; t >= 0; t--) this.didUnmountFuncs[t]() }removeNodes(t) { this.runWillUnmount(), super.removeNodes(t), this.runDidUnmount() }geneNewNodesInEnv(t) { this.initUnmountStore(); const e = super.geneNewNodesInEnv(t); return this.setUnmountFuncs(), e }}; var $ = class extends E {nodesFunc; constructor(t) { super(c.Exp), this.nodesFunc = t, this.initUnmountStore(), this._$nodes = $.formatNodes(t()), this.setUnmountFuncs(), $.addWillUnmount(this, this.runWillUnmount.bind(this)), $.addDidUnmount(this, this.runDidUnmount.bind(this)) }update() { this.removeNodes(this._$nodes); const t = this.geneNewNodesInEnv(() => $.formatNodes(this.nodesFunc())); if (t.length === 0) { this._$nodes = []; return } const e = this._$parentEl; const n = $.getFlowIndexFromNodes(e._$nodes, this); const s = e.childNodes[n]; $.appendNodesWithSibling(t, e, s), $.runDidMount(), this._$nodes = t } static formatNodes(t) { return Array.isArray(t) || (t = [t]), t.flat(1).filter(e => e != null && typeof e !== "boolean").map(e => typeof e === "string" || typeof e === "number" || typeof e === "bigint" ? o.document.createTextNode(`${e}`) : "propViewFunc" in e ? e.build() : e).flat(1) }}; var g = class extends E {condFunc; cond; depNum; constructor(t) { super(c.Cond), this.depNum = t }addCondFunc(t) { this.cond = -1, this.condFunc = t, this.initUnmountStore(), this._$nodes = this.condFunc(this), this.setUnmountFuncs(), g.addWillUnmount(this, this.runWillUnmount.bind(this)), g.addDidUnmount(this, this.runDidUnmount.bind(this)) }updateCond(...t) { const e = [this.willUnmountFuncs, this.didUnmountFuncs]; const n = this.geneNewNodesInEnv(() => this.condFunc(this)); if (this.didntChange) return [this.willUnmountFuncs, this.didUnmountFuncs] = e, this.didntChange = !1, this.updateFunc?.(this.depNum, ...t), this._$nodes; const s = [this.willUnmountFuncs, this.didUnmountFuncs]; if ([this.willUnmountFuncs, this.didUnmountFuncs] = e, this._$nodes && this._$nodes.length > 0 && this.removeNodes(this._$nodes), [this.willUnmountFuncs, this.didUnmountFuncs] = s, n.length === 0) return this._$nodes = [], this._$nodes; const r = this._$parentEl; const p = g.getFlowIndexFromNodes(r._$nodes, this); const a = r.childNodes[p]; return g.appendNodesWithSibling(n, r, a), g.runDidMount(), this._$nodes = n, this._$nodes }update(t, ...e) { t & this.depNum || this.updateFunc?.(t, ...e) }}; function V() { o.global.WillUnmountStore = [], o.global.DidUnmountStore = [] } function Tt(i, t) { let e = i; if (typeof i === "string") { const s = o.document.getElementById(i); if (s)e = s; else throw new Error(`DLight: Element with id ${i} not found`) }V(), e.innerHTML = ""; const n = new t(); n._$init(), L(e, n, 0), u.runDidMount() } function Ot(i, t) { return i() } function B(i) { return i } const Ht = B; export { Ht as $, D as CompNode, g as CondNode, F as EnvNode, v as EnvStoreClass, $ as ExpNode, l as ForNode, I as PropView, W as SubViewNode, et as View, X as createElement, R as createTemplate, ut as createTextNode, B as escape, b as forwardHTMLProp, L as insertNode, Ot as manual, Tt as render, H as setDataset, T as setDocument, C as setEvent, y as setGlobal, _ as setHTMLAttr, j as setHTMLAttrs, S as setHTMLProp, K as setHTMLProps, O as setStyle, nt as update, ht as updateText }
// # sourceMappingURL=index.js.map
