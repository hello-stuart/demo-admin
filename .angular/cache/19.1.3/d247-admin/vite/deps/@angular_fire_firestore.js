import {
  Component,
  LogLevel,
  Logger,
  createMockUserToken,
  getModularInstance,
  getUA,
  index_esm_default,
  isBrowserExtension,
  isElectron,
  isIE,
  isMobileCordova,
  isReactNative,
  isSafari,
  isUWP
} from "./chunk-I5FWUVCI.js";
import {
  isPlatformServer
} from "./chunk-CRI2ENBZ.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  Optional,
  PLATFORM_ID,
  VERSION,
  Version,
  isDevMode,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UOQOKBHC.js";
import "./chunk-GBNX7I7N.js";
import {
  merge,
  queueScheduler
} from "./chunk-PRRE4YUN.js";
import {
  Observable,
  Subject,
  asyncScheduler,
  distinctUntilChanged,
  filter,
  first,
  from,
  map,
  observeOn,
  of,
  pairwise,
  scan,
  shareReplay,
  startWith,
  subscribeOn,
  switchMap,
  switchMapTo,
  tap
} from "./chunk-2U6QIE6W.js";
import {
  __awaiter,
  __extends,
  __generator,
  __spreadArray
} from "./chunk-55JZBEKM.js";
import "./chunk-EIB7IA3J.js";

// node_modules/firebase/app/dist/index.esm.js
var name = "firebase";
var version = "8.10.1";
index_esm_default.registerVersion(name, version, "app");
index_esm_default.SDK_VERSION = version;

// node_modules/@angular/fire/fesm2015/angular-fire.js
function noop() {
}
var ɵZoneScheduler = class {
  constructor(zone, delegate = queueScheduler) {
    this.zone = zone;
    this.delegate = delegate;
  }
  now() {
    return this.delegate.now();
  }
  schedule(work, delay, state) {
    const targetZone = this.zone;
    const workInZone = function(state2) {
      targetZone.runGuarded(() => {
        work.apply(this, [state2]);
      });
    };
    return this.delegate.schedule(workInZone, delay, state);
  }
};
var ɵBlockUntilFirstOperator = class {
  constructor(zone) {
    this.zone = zone;
    this.task = null;
  }
  call(subscriber, source) {
    const unscheduleTask = this.unscheduleTask.bind(this);
    this.task = this.zone.run(() => Zone.current.scheduleMacroTask("firebaseZoneBlock", noop, {}, noop, noop));
    return source.pipe(tap({
      next: unscheduleTask,
      complete: unscheduleTask,
      error: unscheduleTask
    })).subscribe(subscriber).add(unscheduleTask);
  }
  unscheduleTask() {
    setTimeout(() => {
      if (this.task != null && this.task.state === "scheduled") {
        this.task.invoke();
        this.task = null;
      }
    }, 10);
  }
};
var ɵAngularFireSchedulers = class {
  constructor(ngZone) {
    this.ngZone = ngZone;
    this.outsideAngular = ngZone.runOutsideAngular(() => new ɵZoneScheduler(Zone.current));
    this.insideAngular = ngZone.run(() => new ɵZoneScheduler(Zone.current, asyncScheduler));
  }
};
function ɵkeepUnstableUntilFirstFactory(schedulers) {
  return function keepUnstableUntilFirst(obs$) {
    obs$ = obs$.lift(new ɵBlockUntilFirstOperator(schedulers.ngZone));
    return obs$.pipe(
      // Run the subscribe body outside of Angular (e.g. calling Firebase SDK to add a listener to a change event)
      subscribeOn(schedulers.outsideAngular),
      // Run operators inside the angular zone (e.g. side effects via tap())
      observeOn(schedulers.insideAngular)
      // INVESTIGATE https://github.com/angular/angularfire/pull/2315
      // share()
    );
  };
}
var noopFunctions = ["ngOnDestroy"];
var ɵlazySDKProxy = (klass, observable, zone, options = {}) => {
  return new Proxy(klass, {
    get: (_, name2) => zone.runOutsideAngular(() => {
      var _a2;
      if (klass[name2]) {
        if ((_a2 = options === null || options === void 0 ? void 0 : options.spy) === null || _a2 === void 0 ? void 0 : _a2.get) {
          options.spy.get(name2, klass[name2]);
        }
        return klass[name2];
      }
      if (noopFunctions.indexOf(name2) > -1) {
        return () => {
        };
      }
      const promise = observable.toPromise().then((mod) => {
        const ret = mod && mod[name2];
        if (typeof ret === "function") {
          return ret.bind(mod);
        } else if (ret && ret.then) {
          return ret.then((res) => zone.run(() => res));
        } else {
          return zone.run(() => ret);
        }
      });
      return new Proxy(() => {
      }, {
        get: (_2, name3) => promise[name3],
        // TODO handle callbacks as transparently as I can
        apply: (self2, _2, args) => promise.then((it2) => {
          var _a3;
          const res = it2 && it2(...args);
          if ((_a3 = options === null || options === void 0 ? void 0 : options.spy) === null || _a3 === void 0 ? void 0 : _a3.apply) {
            options.spy.apply(name2, args, res);
          }
          return res;
        })
      });
    })
  });
};
var ɵapplyMixins = (derivedCtor, constructors) => {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype || baseCtor).forEach((name2) => {
      Object.defineProperty(derivedCtor.prototype, name2, Object.getOwnPropertyDescriptor(baseCtor.prototype || baseCtor, name2));
    });
  });
};
var FIREBASE_OPTIONS = new InjectionToken("angularfire2.app.options");
var FIREBASE_APP_NAME = new InjectionToken("angularfire2.app.nameOrConfig");
var FirebaseApp = class {
};
var VERSION2 = new Version("6.1.5");
function ɵfirebaseAppFactory(options, zone, nameOrConfig) {
  const name2 = typeof nameOrConfig === "string" && nameOrConfig || "[DEFAULT]";
  const config = typeof nameOrConfig === "object" && nameOrConfig || {};
  config.name = config.name || name2;
  const existingApp = index_esm_default.apps.filter((app2) => app2 && app2.name === config.name)[0];
  const app = existingApp || zone.runOutsideAngular(() => index_esm_default.initializeApp(options, config));
  try {
    if (JSON.stringify(options) !== JSON.stringify(app.options)) {
      const hmr = !!module.hot;
      log("error", `${app.name} Firebase App already initialized with different options${hmr ? ", you may need to reload as Firebase is not HMR aware." : "."}`);
    }
  } catch (e) {
  }
  return app;
}
var ɵlogAuthEmulatorError = () => {
  log("warn", "You may need to import 'firebase/auth' manually in your component rather than rely on AngularFireAuth's dynamic import, when using the emulator suite https://github.com/angular/angularfire/issues/2656");
};
var log = (level, ...args) => {
  if (isDevMode() && typeof console !== "undefined") {
    console[level](...args);
  }
};
globalThis.ɵAngularfireInstanceCache || (globalThis.ɵAngularfireInstanceCache = /* @__PURE__ */ new Map());
function ɵfetchInstance(cacheKey, moduleName, app, fn2, args) {
  const [instance, ...cachedArgs] = globalThis.ɵAngularfireInstanceCache.get(cacheKey) || [];
  if (instance) {
    try {
      if (args.some((arg, i) => {
        const cachedArg = cachedArgs[i];
        if (arg && typeof arg === "object") {
          return JSON.stringify(arg) !== JSON.stringify(cachedArg);
        } else {
          return arg !== cachedArg;
        }
      })) {
        const hmr = !!module.hot;
        log("error", `${moduleName} was already initialized on the ${app.name} Firebase App instance with different settings.${hmr ? " You may need to reload as Firebase is not HMR aware." : ""}`);
      }
    } catch (e) {
    }
    return instance;
  } else {
    const newInstance = fn2();
    globalThis.ɵAngularfireInstanceCache.set(cacheKey, [newInstance, ...args]);
    return newInstance;
  }
}
var FIREBASE_APP_PROVIDER = {
  provide: FirebaseApp,
  useFactory: ɵfirebaseAppFactory,
  deps: [FIREBASE_OPTIONS, NgZone, [new Optional(), FIREBASE_APP_NAME]]
};
var AngularFireModule = class _AngularFireModule {
  // tslint:disable-next-line:ban-types
  constructor(platformId) {
    index_esm_default.registerVersion("angularfire", VERSION2.full, platformId.toString());
    index_esm_default.registerVersion("angular", VERSION.full);
  }
  static initializeApp(options, nameOrConfig) {
    return {
      ngModule: _AngularFireModule,
      providers: [{
        provide: FIREBASE_OPTIONS,
        useValue: options
      }, {
        provide: FIREBASE_APP_NAME,
        useValue: nameOrConfig
      }]
    };
  }
};
AngularFireModule.decorators = [{
  type: NgModule,
  args: [{
    providers: [FIREBASE_APP_PROVIDER]
  }]
}];
AngularFireModule.ctorParameters = () => [{
  type: Object,
  decorators: [{
    type: Inject,
    args: [PLATFORM_ID]
  }]
}];

// node_modules/@firebase/webchannel-wrapper/dist/index.esm.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d2[p2] = b2[p2];
  };
  return extendStatics(d, b);
};
function __extends2(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var k;
var goog = goog || {};
var l = commonjsGlobal || self;
function aa() {
}
function ba(a) {
  var b = typeof a;
  b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
  return "array" == b || "object" == b && "number" == typeof a.length;
}
function p(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
}
function da(a) {
  return Object.prototype.hasOwnProperty.call(a, ea) && a[ea] || (a[ea] = ++fa);
}
var ea = "closure_uid_" + (1e9 * Math.random() >>> 0);
var fa = 0;
function ha(a, b, c) {
  return a.call.apply(a.bind, arguments);
}
function ia(a, b, c) {
  if (!a) throw Error();
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b, e);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
}
function q(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? q = ha : q = ia;
  return q.apply(null, arguments);
}
function ja(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = c.slice();
    d.push.apply(d, arguments);
    return a.apply(this, d);
  };
}
function t(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.Z = b.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
  a.Vb = function(d, e, f) {
    for (var h = Array(arguments.length - 2), n = 2; n < arguments.length; n++) h[n - 2] = arguments[n];
    return b.prototype[e].apply(d, h);
  };
}
function v() {
  this.s = this.s;
  this.o = this.o;
}
var ka = 0;
var la = {};
v.prototype.s = false;
v.prototype.na = function() {
  if (!this.s && (this.s = true, this.M(), 0 != ka)) {
    var a = da(this);
    delete la[a];
  }
};
v.prototype.M = function() {
  if (this.o) for (; this.o.length; ) this.o.shift()();
};
var ma = Array.prototype.indexOf ? function(a, b) {
  return Array.prototype.indexOf.call(a, b, void 0);
} : function(a, b) {
  if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
  for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
  return -1;
};
var na = Array.prototype.forEach ? function(a, b, c) {
  Array.prototype.forEach.call(a, b, c);
} : function(a, b, c) {
  var d = a.length, e = "string" === typeof a ? a.split("") : a;
  for (var f = 0; f < d; f++) f in e && b.call(c, e[f], f, a);
};
function oa(a) {
  a: {
    var b = pa;
    var c = a.length, d = "string" === typeof a ? a.split("") : a;
    for (var e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) {
      b = e;
      break a;
    }
    b = -1;
  }
  return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
}
function qa(a) {
  return Array.prototype.concat.apply([], arguments);
}
function ra(a) {
  var b = a.length;
  if (0 < b) {
    var c = Array(b);
    for (var d = 0; d < b; d++) c[d] = a[d];
    return c;
  }
  return [];
}
function sa(a) {
  return /^[\s\xa0]*$/.test(a);
}
var ta = String.prototype.trim ? function(a) {
  return a.trim();
} : function(a) {
  return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
};
function w(a, b) {
  return -1 != a.indexOf(b);
}
function ua(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
var x;
a: {
  va2 = l.navigator;
  if (va2) {
    wa2 = va2.userAgent;
    if (wa2) {
      x = wa2;
      break a;
    }
  }
  x = "";
}
var va2;
var wa2;
function xa(a, b, c) {
  for (var d in a) b.call(c, a[d], d, a);
}
function ya(a) {
  var b = {};
  for (var c in a) b[c] = a[c];
  return b;
}
var za = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Aa(a, b) {
  var c, d;
  for (var e = 1; e < arguments.length; e++) {
    d = arguments[e];
    for (c in d) a[c] = d[c];
    for (var f = 0; f < za.length; f++) c = za[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
  }
}
function Ca(a) {
  Ca[" "](a);
  return a;
}
Ca[" "] = aa;
function Fa(a) {
  var b = Ga;
  return Object.prototype.hasOwnProperty.call(b, 9) ? b[9] : b[9] = a(9);
}
var Ha = w(x, "Opera");
var y = w(x, "Trident") || w(x, "MSIE");
var Ia = w(x, "Edge");
var Ja = Ia || y;
var Ka = w(x, "Gecko") && !(w(x.toLowerCase(), "webkit") && !w(x, "Edge")) && !(w(x, "Trident") || w(x, "MSIE")) && !w(x, "Edge");
var La = w(x.toLowerCase(), "webkit") && !w(x, "Edge");
function Ma() {
  var a = l.document;
  return a ? a.documentMode : void 0;
}
var Na;
a: {
  Oa2 = "", Pa2 = function() {
    var a = x;
    if (Ka) return /rv:([^\);]+)(\)|;)/.exec(a);
    if (Ia) return /Edge\/([\d\.]+)/.exec(a);
    if (y) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (La) return /WebKit\/(\S+)/.exec(a);
    if (Ha) return /(?:Version)[ \/]?(\S+)/.exec(a);
  }();
  Pa2 && (Oa2 = Pa2 ? Pa2[1] : "");
  if (y) {
    Qa2 = Ma();
    if (null != Qa2 && Qa2 > parseFloat(Oa2)) {
      Na = String(Qa2);
      break a;
    }
  }
  Na = Oa2;
}
var Oa2;
var Pa2;
var Qa2;
var Ga = {};
function Ra() {
  return Fa(function() {
    var a = 0;
    var b = ta(String(Na)).split("."), c = ta("9").split("."), d = Math.max(b.length, c.length);
    for (var h = 0; 0 == a && h < d; h++) {
      var e = b[h] || "", f = c[h] || "";
      do {
        e = /(\d*)(\D*)(.*)/.exec(e) || ["", "", "", ""];
        f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
        if (0 == e[0].length && 0 == f[0].length) break;
        a = ua(0 == e[1].length ? 0 : parseInt(e[1], 10), 0 == f[1].length ? 0 : parseInt(f[1], 10)) || ua(0 == e[2].length, 0 == f[2].length) || ua(e[2], f[2]);
        e = e[3];
        f = f[3];
      } while (0 == a);
    }
    return 0 <= a;
  });
}
var Sa;
if (l.document && y) {
  Ta2 = Ma();
  Sa = Ta2 ? Ta2 : parseInt(Na, 10) || void 0;
} else Sa = void 0;
var Ta2;
var Ua = Sa;
var Va = function() {
  if (!l.addEventListener || !Object.defineProperty) return false;
  var a = false, b = Object.defineProperty({}, "passive", {
    get: function() {
      a = true;
    }
  });
  try {
    l.addEventListener("test", aa, b), l.removeEventListener("test", aa, b);
  } catch (c) {
  }
  return a;
}();
function z(a, b) {
  this.type = a;
  this.g = this.target = b;
  this.defaultPrevented = false;
}
z.prototype.h = function() {
  this.defaultPrevented = true;
};
function A(a, b) {
  z.call(this, a ? a.type : "");
  this.relatedTarget = this.g = this.target = null;
  this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
  this.key = "";
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
  this.state = null;
  this.pointerId = 0;
  this.pointerType = "";
  this.i = null;
  if (a) {
    var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.g = b;
    if (b = a.relatedTarget) {
      if (Ka) {
        a: {
          try {
            Ca(b.nodeName);
            var e = true;
            break a;
          } catch (f) {
          }
          e = false;
        }
        e || (b = null);
      }
    } else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.key = a.key || "";
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Wa[a.pointerType] || "";
    this.state = a.state;
    this.i = a;
    a.defaultPrevented && A.Z.h.call(this);
  }
}
t(A, z);
var Wa = {
  2: "touch",
  3: "pen",
  4: "mouse"
};
A.prototype.h = function() {
  A.Z.h.call(this);
  var a = this.i;
  a.preventDefault ? a.preventDefault() : a.returnValue = false;
};
var B = "closure_listenable_" + (1e6 * Math.random() | 0);
var Xa = 0;
function Ya(a, b, c, d, e) {
  this.listener = a;
  this.proxy = null;
  this.src = b;
  this.type = c;
  this.capture = !!d;
  this.ia = e;
  this.key = ++Xa;
  this.ca = this.fa = false;
}
function Za(a) {
  a.ca = true;
  a.listener = null;
  a.proxy = null;
  a.src = null;
  a.ia = null;
}
function $a(a) {
  this.src = a;
  this.g = {};
  this.h = 0;
}
$a.prototype.add = function(a, b, c, d, e) {
  var f = a.toString();
  a = this.g[f];
  a || (a = this.g[f] = [], this.h++);
  var h = ab(a, b, d, e);
  -1 < h ? (b = a[h], c || (b.fa = false)) : (b = new Ya(b, this.src, f, !!d, e), b.fa = c, a.push(b));
  return b;
};
function bb(a, b) {
  var c = b.type;
  if (c in a.g) {
    var d = a.g[c], e = ma(d, b), f;
    (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
    f && (Za(b), 0 == a.g[c].length && (delete a.g[c], a.h--));
  }
}
function ab(a, b, c, d) {
  for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (!f.ca && f.listener == b && f.capture == !!c && f.ia == d) return e;
  }
  return -1;
}
var cb = "closure_lm_" + (1e6 * Math.random() | 0);
var db = {};
function fb(a, b, c, d, e) {
  if (d && d.once) return gb(a, b, c, d, e);
  if (Array.isArray(b)) {
    for (var f = 0; f < b.length; f++) fb(a, b[f], c, d, e);
    return null;
  }
  c = hb(c);
  return a && a[B] ? a.N(b, c, p(d) ? !!d.capture : !!d, e) : ib(a, b, c, false, d, e);
}
function ib(a, b, c, d, e, f) {
  if (!b) throw Error("Invalid event type");
  var h = p(e) ? !!e.capture : !!e, n = jb(a);
  n || (a[cb] = n = new $a(a));
  c = n.add(b, c, d, h, f);
  if (c.proxy) return c;
  d = kb();
  c.proxy = d;
  d.src = a;
  d.listener = c;
  if (a.addEventListener) Va || (e = h), void 0 === e && (e = false), a.addEventListener(b.toString(), d, e);
  else if (a.attachEvent) a.attachEvent(lb(b.toString()), d);
  else if (a.addListener && a.removeListener) a.addListener(d);
  else throw Error("addEventListener and attachEvent are unavailable.");
  return c;
}
function kb() {
  function a(c) {
    return b.call(a.src, a.listener, c);
  }
  var b = mb;
  return a;
}
function gb(a, b, c, d, e) {
  if (Array.isArray(b)) {
    for (var f = 0; f < b.length; f++) gb(a, b[f], c, d, e);
    return null;
  }
  c = hb(c);
  return a && a[B] ? a.O(b, c, p(d) ? !!d.capture : !!d, e) : ib(a, b, c, true, d, e);
}
function nb(a, b, c, d, e) {
  if (Array.isArray(b)) for (var f = 0; f < b.length; f++) nb(a, b[f], c, d, e);
  else (d = p(d) ? !!d.capture : !!d, c = hb(c), a && a[B]) ? (a = a.i, b = String(b).toString(), b in a.g && (f = a.g[b], c = ab(f, c, d, e), -1 < c && (Za(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b], a.h--)))) : a && (a = jb(a)) && (b = a.g[b.toString()], a = -1, b && (a = ab(b, c, d, e)), (c = -1 < a ? b[a] : null) && ob(c));
}
function ob(a) {
  if ("number" !== typeof a && a && !a.ca) {
    var b = a.src;
    if (b && b[B]) bb(b.i, a);
    else {
      var c = a.type, d = a.proxy;
      b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(lb(c), d) : b.addListener && b.removeListener && b.removeListener(d);
      (c = jb(b)) ? (bb(c, a), 0 == c.h && (c.src = null, b[cb] = null)) : Za(a);
    }
  }
}
function lb(a) {
  return a in db ? db[a] : db[a] = "on" + a;
}
function mb(a, b) {
  if (a.ca) a = true;
  else {
    b = new A(b, this);
    var c = a.listener, d = a.ia || a.src;
    a.fa && ob(a);
    a = c.call(d, b);
  }
  return a;
}
function jb(a) {
  a = a[cb];
  return a instanceof $a ? a : null;
}
var pb = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
function hb(a) {
  if ("function" === typeof a) return a;
  a[pb] || (a[pb] = function(b) {
    return a.handleEvent(b);
  });
  return a[pb];
}
function C() {
  v.call(this);
  this.i = new $a(this);
  this.P = this;
  this.I = null;
}
t(C, v);
C.prototype[B] = true;
C.prototype.removeEventListener = function(a, b, c, d) {
  nb(this, a, b, c, d);
};
function D(a, b) {
  var c, d = a.I;
  if (d) for (c = []; d; d = d.I) c.push(d);
  a = a.P;
  d = b.type || b;
  if ("string" === typeof b) b = new z(b, a);
  else if (b instanceof z) b.target = b.target || a;
  else {
    var e = b;
    b = new z(d, a);
    Aa(b, e);
  }
  e = true;
  if (c) for (var f = c.length - 1; 0 <= f; f--) {
    var h = b.g = c[f];
    e = qb(h, d, true, b) && e;
  }
  h = b.g = a;
  e = qb(h, d, true, b) && e;
  e = qb(h, d, false, b) && e;
  if (c) for (f = 0; f < c.length; f++) h = b.g = c[f], e = qb(h, d, false, b) && e;
}
C.prototype.M = function() {
  C.Z.M.call(this);
  if (this.i) {
    var a = this.i, c;
    for (c in a.g) {
      for (var d = a.g[c], e = 0; e < d.length; e++) Za(d[e]);
      delete a.g[c];
      a.h--;
    }
  }
  this.I = null;
};
C.prototype.N = function(a, b, c, d) {
  return this.i.add(String(a), b, false, c, d);
};
C.prototype.O = function(a, b, c, d) {
  return this.i.add(String(a), b, true, c, d);
};
function qb(a, b, c, d) {
  b = a.i.g[String(b)];
  if (!b) return true;
  b = b.concat();
  for (var e = true, f = 0; f < b.length; ++f) {
    var h = b[f];
    if (h && !h.ca && h.capture == c) {
      var n = h.listener, u = h.ia || h.src;
      h.fa && bb(a.i, h);
      e = false !== n.call(u, d) && e;
    }
  }
  return e && !d.defaultPrevented;
}
var rb = l.JSON.stringify;
function sb() {
  var a = tb;
  var b = null;
  a.g && (b = a.g, a.g = a.g.next, a.g || (a.h = null), b.next = null);
  return b;
}
var ub = (
  /** @class */
  function() {
    function ub2() {
      this.h = this.g = null;
    }
    ub2.prototype.add = function(a, b) {
      var c = vb.get();
      c.set(a, b);
      this.h ? this.h.next = c : this.g = c;
      this.h = c;
    };
    return ub2;
  }()
);
var vb = new /** @class */
(function() {
  function class_2(a, b) {
    this.i = a;
    this.j = b;
    this.h = 0;
    this.g = null;
  }
  class_2.prototype.get = function() {
    var a;
    0 < this.h ? (this.h--, a = this.g, this.g = a.next, a.next = null) : a = this.i();
    return a;
  };
  return class_2;
}())(function() {
  return new wb();
}, function(a) {
  return a.reset();
});
var wb = (
  /** @class */
  function() {
    function wb2() {
      this.next = this.g = this.h = null;
    }
    wb2.prototype.set = function(a, b) {
      this.h = a;
      this.g = b;
      this.next = null;
    };
    wb2.prototype.reset = function() {
      this.next = this.g = this.h = null;
    };
    return wb2;
  }()
);
function yb(a) {
  l.setTimeout(function() {
    throw a;
  }, 0);
}
function zb(a, b) {
  Ab || Bb();
  Cb || (Ab(), Cb = true);
  tb.add(a, b);
}
var Ab;
function Bb() {
  var a = l.Promise.resolve(void 0);
  Ab = function() {
    a.then(Db);
  };
}
var Cb = false;
var tb = new ub();
function Db() {
  for (var a; a = sb(); ) {
    try {
      a.h.call(a.g);
    } catch (c) {
      yb(c);
    }
    var b = vb;
    b.j(a);
    100 > b.h && (b.h++, a.next = b.g, b.g = a);
  }
  Cb = false;
}
function Eb(a, b) {
  C.call(this);
  this.h = a || 1;
  this.g = b || l;
  this.j = q(this.kb, this);
  this.l = Date.now();
}
t(Eb, C);
k = Eb.prototype;
k.da = false;
k.S = null;
k.kb = function() {
  if (this.da) {
    var a = Date.now() - this.l;
    0 < a && a < 0.8 * this.h ? this.S = this.g.setTimeout(this.j, this.h - a) : (this.S && (this.g.clearTimeout(this.S), this.S = null), D(this, "tick"), this.da && (Fb(this), this.start()));
  }
};
k.start = function() {
  this.da = true;
  this.S || (this.S = this.g.setTimeout(this.j, this.h), this.l = Date.now());
};
function Fb(a) {
  a.da = false;
  a.S && (a.g.clearTimeout(a.S), a.S = null);
}
k.M = function() {
  Eb.Z.M.call(this);
  Fb(this);
  delete this.g;
};
function Gb(a, b, c) {
  if ("function" === typeof a) c && (a = q(a, c));
  else if (a && "function" == typeof a.handleEvent) a = q(a.handleEvent, a);
  else throw Error("Invalid listener argument");
  return 2147483647 < Number(b) ? -1 : l.setTimeout(a, b || 0);
}
function Hb(a) {
  a.g = Gb(function() {
    a.g = null;
    a.i && (a.i = false, Hb(a));
  }, a.j);
  var b = a.h;
  a.h = null;
  a.m.apply(null, b);
}
var Ib = (
  /** @class */
  function(_super) {
    __extends2(Ib2, _super);
    function Ib2(a, b) {
      var _this = _super.call(this) || this;
      _this.m = a;
      _this.j = b;
      _this.h = null;
      _this.i = false;
      _this.g = null;
      return _this;
    }
    Ib2.prototype.l = function(a) {
      this.h = arguments;
      this.g ? this.i = true : Hb(this);
    };
    Ib2.prototype.M = function() {
      _super.prototype.M.call(this);
      this.g && (l.clearTimeout(this.g), this.g = null, this.i = false, this.h = null);
    };
    return Ib2;
  }(v)
);
function E(a) {
  v.call(this);
  this.h = a;
  this.g = {};
}
t(E, v);
var Jb = [];
function Kb(a, b, c, d) {
  Array.isArray(c) || (c && (Jb[0] = c.toString()), c = Jb);
  for (var e = 0; e < c.length; e++) {
    var f = fb(b, c[e], d || a.handleEvent, false, a.h || a);
    if (!f) break;
    a.g[f.key] = f;
  }
}
function Lb(a) {
  xa(a.g, function(b, c) {
    this.g.hasOwnProperty(c) && ob(b);
  }, a);
  a.g = {};
}
E.prototype.M = function() {
  E.Z.M.call(this);
  Lb(this);
};
E.prototype.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};
function Mb() {
  this.g = true;
}
Mb.prototype.Aa = function() {
  this.g = false;
};
function Nb(a, b, c, d, e, f) {
  a.info(function() {
    if (a.g) {
      if (f) {
        var h = "";
        for (var n = f.split("&"), u = 0; u < n.length; u++) {
          var m = n[u].split("=");
          if (1 < m.length) {
            var r = m[0];
            m = m[1];
            var G2 = r.split("_");
            h = 2 <= G2.length && "type" == G2[1] ? h + (r + "=" + m + "&") : h + (r + "=redacted&");
          }
        }
      } else h = null;
    } else h = f;
    return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b + "\n" + c + "\n" + h;
  });
}
function Ob(a, b, c, d, e, f, h) {
  a.info(function() {
    return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b + "\n" + c + "\n" + f + " " + h;
  });
}
function F(a, b, c, d) {
  a.info(function() {
    return "XMLHTTP TEXT (" + b + "): " + Pb(a, c) + (d ? " " + d : "");
  });
}
function Qb(a, b) {
  a.info(function() {
    return "TIMEOUT: " + b;
  });
}
Mb.prototype.info = function() {
};
function Pb(a, b) {
  if (!a.g) return b;
  if (!b) return null;
  try {
    var c = JSON.parse(b);
    if (c) {
      for (a = 0; a < c.length; a++) if (Array.isArray(c[a])) {
        var d = c[a];
        if (!(2 > d.length)) {
          var e = d[1];
          if (Array.isArray(e) && !(1 > e.length)) {
            var f = e[0];
            if ("noop" != f && "stop" != f && "close" != f) for (var h = 1; h < e.length; h++) e[h] = "";
          }
        }
      }
    }
    return rb(c);
  } catch (n) {
    return b;
  }
}
var H = {};
var Rb = null;
function Sb() {
  return Rb = Rb || new C();
}
H.Ma = "serverreachability";
function Tb(a) {
  z.call(this, H.Ma, a);
}
t(Tb, z);
function I(a) {
  var b = Sb();
  D(b, new Tb(b, a));
}
H.STAT_EVENT = "statevent";
function Ub(a, b) {
  z.call(this, H.STAT_EVENT, a);
  this.stat = b;
}
t(Ub, z);
function J(a) {
  var b = Sb();
  D(b, new Ub(b, a));
}
H.Na = "timingevent";
function Vb(a, b) {
  z.call(this, H.Na, a);
  this.size = b;
}
t(Vb, z);
function K(a, b) {
  if ("function" !== typeof a) throw Error("Fn must not be null and must be a function");
  return l.setTimeout(function() {
    a();
  }, b);
}
var Wb = {
  NO_ERROR: 0,
  lb: 1,
  yb: 2,
  xb: 3,
  sb: 4,
  wb: 5,
  zb: 6,
  Ja: 7,
  TIMEOUT: 8,
  Cb: 9
};
var Xb = {
  qb: "complete",
  Mb: "success",
  Ka: "error",
  Ja: "abort",
  Eb: "ready",
  Fb: "readystatechange",
  TIMEOUT: "timeout",
  Ab: "incrementaldata",
  Db: "progress",
  tb: "downloadprogress",
  Ub: "uploadprogress"
};
function Yb() {
}
Yb.prototype.h = null;
function Zb(a) {
  return a.h || (a.h = a.i());
}
function $b() {
}
var L = {
  OPEN: "a",
  pb: "b",
  Ka: "c",
  Bb: "d"
};
function ac() {
  z.call(this, "d");
}
t(ac, z);
function bc() {
  z.call(this, "c");
}
t(bc, z);
var cc;
function dc() {
}
t(dc, Yb);
dc.prototype.g = function() {
  return new XMLHttpRequest();
};
dc.prototype.i = function() {
  return {};
};
cc = new dc();
function M(a, b, c, d) {
  this.l = a;
  this.j = b;
  this.m = c;
  this.X = d || 1;
  this.V = new E(this);
  this.P = ec;
  a = Ja ? 125 : void 0;
  this.W = new Eb(a);
  this.H = null;
  this.i = false;
  this.s = this.A = this.v = this.K = this.F = this.Y = this.B = null;
  this.D = [];
  this.g = null;
  this.C = 0;
  this.o = this.u = null;
  this.N = -1;
  this.I = false;
  this.O = 0;
  this.L = null;
  this.aa = this.J = this.$ = this.U = false;
  this.h = new fc();
}
function fc() {
  this.i = null;
  this.g = "";
  this.h = false;
}
var ec = 45e3;
var gc = {};
var hc = {};
k = M.prototype;
k.setTimeout = function(a) {
  this.P = a;
};
function ic(a, b, c) {
  a.K = 1;
  a.v = jc(N(b));
  a.s = c;
  a.U = true;
  kc(a, null);
}
function kc(a, b) {
  a.F = Date.now();
  lc(a);
  a.A = N(a.v);
  var c = a.A, d = a.X;
  Array.isArray(d) || (d = [String(d)]);
  mc(c.h, "t", d);
  a.C = 0;
  c = a.l.H;
  a.h = new fc();
  a.g = nc(a.l, c ? b : null, !a.s);
  0 < a.O && (a.L = new Ib(q(a.Ia, a, a.g), a.O));
  Kb(a.V, a.g, "readystatechange", a.gb);
  b = a.H ? ya(a.H) : {};
  a.s ? (a.u || (a.u = "POST"), b["Content-Type"] = "application/x-www-form-urlencoded", a.g.ea(a.A, a.u, a.s, b)) : (a.u = "GET", a.g.ea(a.A, a.u, null, b));
  I(1);
  Nb(a.j, a.u, a.A, a.m, a.X, a.s);
}
k.gb = function(a) {
  a = a.target;
  var b = this.L;
  b && 3 == O(a) ? b.l() : this.Ia(a);
};
k.Ia = function(a) {
  try {
    if (a == this.g) a: {
      var r = O(this.g);
      var b = this.g.Da();
      var G2 = this.g.ba();
      if (!(3 > r) && (3 != r || Ja || this.g && (this.h.h || this.g.ga() || oc(this.g)))) {
        this.I || 4 != r || 7 == b || (8 == b || 0 >= G2 ? I(3) : I(2));
        pc(this);
        var c = this.g.ba();
        this.N = c;
        b: if (qc(this)) {
          var d = oc(this.g);
          a = "";
          var e = d.length, f = 4 == O(this.g);
          if (!this.h.i) {
            if ("undefined" === typeof TextDecoder) {
              P(this);
              rc(this);
              var h = "";
              break b;
            }
            this.h.i = new l.TextDecoder();
          }
          for (b = 0; b < e; b++) this.h.h = true, a += this.h.i.decode(d[b], {
            stream: f && b == e - 1
          });
          d.splice(0, e);
          this.h.g += a;
          this.C = 0;
          h = this.h.g;
        } else h = this.g.ga();
        this.i = 200 == c;
        Ob(this.j, this.u, this.A, this.m, this.X, r, c);
        if (this.i) {
          if (this.$ && !this.J) {
            b: {
              if (this.g) {
                var n, u = this.g;
                if ((n = u.g ? u.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !sa(n)) {
                  var m = n;
                  break b;
                }
              }
              m = null;
            }
            if (c = m) F(this.j, this.m, c, "Initial handshake response via X-HTTP-Initial-Response"), this.J = true, sc(this, c);
            else {
              this.i = false;
              this.o = 3;
              J(12);
              P(this);
              rc(this);
              break a;
            }
          }
          this.U ? (tc(this, r, h), Ja && this.i && 3 == r && (Kb(this.V, this.W, "tick", this.fb), this.W.start())) : (F(this.j, this.m, h, null), sc(this, h));
          4 == r && P(this);
          this.i && !this.I && (4 == r ? uc(this.l, this) : (this.i = false, lc(this)));
        } else 400 == c && 0 < h.indexOf("Unknown SID") ? (this.o = 3, J(12)) : (this.o = 0, J(13)), P(this), rc(this);
      }
    }
  } catch (r2) {
  } finally {
  }
};
function qc(a) {
  return a.g ? "GET" == a.u && 2 != a.K && a.l.Ba : false;
}
function tc(a, b, c) {
  var d = true, e;
  for (; !a.I && a.C < c.length; ) if (e = vc(a, c), e == hc) {
    4 == b && (a.o = 4, J(14), d = false);
    F(a.j, a.m, null, "[Incomplete Response]");
    break;
  } else if (e == gc) {
    a.o = 4;
    J(15);
    F(a.j, a.m, c, "[Invalid Chunk]");
    d = false;
    break;
  } else F(a.j, a.m, e, null), sc(a, e);
  qc(a) && e != hc && e != gc && (a.h.g = "", a.C = 0);
  4 != b || 0 != c.length || a.h.h || (a.o = 1, J(16), d = false);
  a.i = a.i && d;
  d ? 0 < c.length && !a.aa && (a.aa = true, b = a.l, b.g == a && b.$ && !b.L && (b.h.info("Great, no buffering proxy detected. Bytes received: " + c.length), wc(b), b.L = true, J(11))) : (F(a.j, a.m, c, "[Invalid Chunked Response]"), P(a), rc(a));
}
k.fb = function() {
  if (this.g) {
    var a = O(this.g), b = this.g.ga();
    this.C < b.length && (pc(this), tc(this, a, b), this.i && 4 != a && lc(this));
  }
};
function vc(a, b) {
  var c = a.C, d = b.indexOf("\n", c);
  if (-1 == d) return hc;
  c = Number(b.substring(c, d));
  if (isNaN(c)) return gc;
  d += 1;
  if (d + c > b.length) return hc;
  b = b.substr(d, c);
  a.C = d + c;
  return b;
}
k.cancel = function() {
  this.I = true;
  P(this);
};
function lc(a) {
  a.Y = Date.now() + a.P;
  xc(a, a.P);
}
function xc(a, b) {
  if (null != a.B) throw Error("WatchDog timer not null");
  a.B = K(q(a.eb, a), b);
}
function pc(a) {
  a.B && (l.clearTimeout(a.B), a.B = null);
}
k.eb = function() {
  this.B = null;
  var a = Date.now();
  0 <= a - this.Y ? (Qb(this.j, this.A), 2 != this.K && (I(3), J(17)), P(this), this.o = 2, rc(this)) : xc(this, this.Y - a);
};
function rc(a) {
  0 == a.l.G || a.I || uc(a.l, a);
}
function P(a) {
  pc(a);
  var b = a.L;
  b && "function" == typeof b.na && b.na();
  a.L = null;
  Fb(a.W);
  Lb(a.V);
  a.g && (b = a.g, a.g = null, b.abort(), b.na());
}
function sc(a, b) {
  try {
    var c = a.l;
    if (0 != c.G && (c.g == a || yc(c.i, a))) {
      if (c.I = a.N, !a.J && yc(c.i, a) && 3 == c.G) {
        try {
          var d = c.Ca.g.parse(b);
        } catch (m2) {
          d = null;
        }
        if (Array.isArray(d) && 3 == d.length) {
          var e = d;
          if (0 == e[0]) a: {
            if (!c.u) {
              if (c.g) if (c.g.F + 3e3 < a.F) zc(c), Ac(c);
              else break a;
              Bc(c);
              J(18);
            }
          }
          else c.ta = e[1], 0 < c.ta - c.U && 37500 > e[2] && c.N && 0 == c.A && !c.v && (c.v = K(q(c.ab, c), 6e3));
          if (1 >= Cc(c.i) && c.ka) {
            try {
              c.ka();
            } catch (m2) {
            }
            c.ka = void 0;
          }
        } else Q(c, 11);
      } else if ((a.J || c.g == a) && zc(c), !sa(b)) for (e = c.Ca.g.parse(b), b = 0; b < e.length; b++) {
        var m = e[b];
        c.U = m[0];
        m = m[1];
        if (2 == c.G) {
          if ("c" == m[0]) {
            c.J = m[1];
            c.la = m[2];
            var r = m[3];
            null != r && (c.ma = r, c.h.info("VER=" + c.ma));
            var G2 = m[4];
            null != G2 && (c.za = G2, c.h.info("SVER=" + c.za));
            var Da2 = m[5];
            null != Da2 && "number" === typeof Da2 && 0 < Da2 && (d = 1.5 * Da2, c.K = d, c.h.info("backChannelRequestTimeoutMs_=" + d));
            d = c;
            var ca2 = a.g;
            if (ca2) {
              var Ea2 = ca2.g ? ca2.g.getResponseHeader("X-Client-Wire-Protocol") : null;
              if (Ea2) {
                var f = d.i;
                !f.g && (w(Ea2, "spdy") || w(Ea2, "quic") || w(Ea2, "h2")) && (f.j = f.l, f.g = /* @__PURE__ */ new Set(), f.h && (Dc(f, f.h), f.h = null));
              }
              if (d.D) {
                var xb = ca2.g ? ca2.g.getResponseHeader("X-HTTP-Session-Id") : null;
                xb && (d.sa = xb, R(d.F, d.D, xb));
              }
            }
            c.G = 3;
            c.j && c.j.xa();
            c.$ && (c.O = Date.now() - a.F, c.h.info("Handshake RTT: " + c.O + "ms"));
            d = c;
            var h = a;
            d.oa = Ec(d, d.H ? d.la : null, d.W);
            if (h.J) {
              Fc(d.i, h);
              var n = h, u = d.K;
              u && n.setTimeout(u);
              n.B && (pc(n), lc(n));
              d.g = h;
            } else Gc(d);
            0 < c.l.length && Hc(c);
          } else "stop" != m[0] && "close" != m[0] || Q(c, 7);
        } else 3 == c.G && ("stop" == m[0] || "close" == m[0] ? "stop" == m[0] ? Q(c, 7) : Ic(c) : "noop" != m[0] && c.j && c.j.wa(m), c.A = 0);
      }
    }
    I(4);
  } catch (m2) {
  }
}
function Jc(a) {
  if (a.R && "function" == typeof a.R) return a.R();
  if ("string" === typeof a) return a.split("");
  if (ba(a)) {
    for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
    return b;
  }
  b = [];
  c = 0;
  for (d in a) b[c++] = a[d];
  return b;
}
function Kc(a, b) {
  if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0);
  else if (ba(a) || "string" === typeof a) na(a, b, void 0);
  else {
    if (a.T && "function" == typeof a.T) var c = a.T();
    else if (a.R && "function" == typeof a.R) c = void 0;
    else if (ba(a) || "string" === typeof a) {
      c = [];
      for (var d = a.length, e = 0; e < d; e++) c.push(e);
    } else for (e in c = [], d = 0, a) c[d++] = e;
    d = Jc(a);
    e = d.length;
    for (var f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a);
  }
}
function S(a, b) {
  this.h = {};
  this.g = [];
  this.i = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2) throw Error("Uneven number of arguments");
    for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
  } else if (a) if (a instanceof S) for (c = a.T(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
  else for (d in a) this.set(d, a[d]);
}
k = S.prototype;
k.R = function() {
  Lc(this);
  for (var a = [], b = 0; b < this.g.length; b++) a.push(this.h[this.g[b]]);
  return a;
};
k.T = function() {
  Lc(this);
  return this.g.concat();
};
function Lc(a) {
  if (a.i != a.g.length) {
    for (var b = 0, c = 0; b < a.g.length; ) {
      var d = a.g[b];
      T(a.h, d) && (a.g[c++] = d);
      b++;
    }
    a.g.length = c;
  }
  if (a.i != a.g.length) {
    var e = {};
    for (c = b = 0; b < a.g.length; ) d = a.g[b], T(e, d) || (a.g[c++] = d, e[d] = 1), b++;
    a.g.length = c;
  }
}
k.get = function(a, b) {
  return T(this.h, a) ? this.h[a] : b;
};
k.set = function(a, b) {
  T(this.h, a) || (this.i++, this.g.push(a));
  this.h[a] = b;
};
k.forEach = function(a, b) {
  for (var c = this.T(), d = 0; d < c.length; d++) {
    var e = c[d], f = this.get(e);
    a.call(b, f, e, this);
  }
};
function T(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
var Mc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
function Nc(a, b) {
  if (a) {
    a = a.split("&");
    for (var c = 0; c < a.length; c++) {
      var d = a[c].indexOf("="), e = null;
      if (0 <= d) {
        var f = a[c].substring(0, d);
        e = a[c].substring(d + 1);
      } else f = a[c];
      b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
    }
  }
}
function U(a, b) {
  this.i = this.s = this.j = "";
  this.m = null;
  this.o = this.l = "";
  this.g = false;
  if (a instanceof U) {
    this.g = void 0 !== b ? b : a.g;
    Oc(this, a.j);
    this.s = a.s;
    Pc(this, a.i);
    Qc(this, a.m);
    this.l = a.l;
    b = a.h;
    var c = new Rc();
    c.i = b.i;
    b.g && (c.g = new S(b.g), c.h = b.h);
    Sc(this, c);
    this.o = a.o;
  } else a && (c = String(a).match(Mc)) ? (this.g = !!b, Oc(this, c[1] || "", true), this.s = Tc(c[2] || ""), Pc(this, c[3] || "", true), Qc(this, c[4]), this.l = Tc(c[5] || "", true), Sc(this, c[6] || "", true), this.o = Tc(c[7] || "")) : (this.g = !!b, this.h = new Rc(null, this.g));
}
U.prototype.toString = function() {
  var a = [], b = this.j;
  b && a.push(Uc(b, Vc, true), ":");
  var c = this.i;
  if (c || "file" == b) a.push("//"), (b = this.s) && a.push(Uc(b, Vc, true), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.m, null != c && a.push(":", String(c));
  if (c = this.l) this.i && "/" != c.charAt(0) && a.push("/"), a.push(Uc(c, "/" == c.charAt(0) ? Wc : Xc, true));
  (c = this.h.toString()) && a.push("?", c);
  (c = this.o) && a.push("#", Uc(c, Yc));
  return a.join("");
};
function N(a) {
  return new U(a);
}
function Oc(a, b, c) {
  a.j = c ? Tc(b, true) : b;
  a.j && (a.j = a.j.replace(/:$/, ""));
}
function Pc(a, b, c) {
  a.i = c ? Tc(b, true) : b;
}
function Qc(a, b) {
  if (b) {
    b = Number(b);
    if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
    a.m = b;
  } else a.m = null;
}
function Sc(a, b, c) {
  b instanceof Rc ? (a.h = b, Zc(a.h, a.g)) : (c || (b = Uc(b, $c)), a.h = new Rc(b, a.g));
}
function R(a, b, c) {
  a.h.set(b, c);
}
function jc(a) {
  R(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36));
  return a;
}
function ad(a) {
  return a instanceof U ? N(a) : new U(a, void 0);
}
function bd(a, b, c, d) {
  var e = new U(null, void 0);
  a && Oc(e, a);
  b && Pc(e, b);
  c && Qc(e, c);
  d && (e.l = d);
  return e;
}
function Tc(a, b) {
  return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
}
function Uc(a, b, c) {
  return "string" === typeof a ? (a = encodeURI(a).replace(b, cd), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
}
function cd(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
}
var Vc = /[#\/\?@]/g;
var Xc = /[#\?:]/g;
var Wc = /[#\?]/g;
var $c = /[#\?@]/g;
var Yc = /#/g;
function Rc(a, b) {
  this.h = this.g = null;
  this.i = a || null;
  this.j = !!b;
}
function V(a) {
  a.g || (a.g = new S(), a.h = 0, a.i && Nc(a.i, function(b, c) {
    a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
  }));
}
k = Rc.prototype;
k.add = function(a, b) {
  V(this);
  this.i = null;
  a = W(this, a);
  var c = this.g.get(a);
  c || this.g.set(a, c = []);
  c.push(b);
  this.h += 1;
  return this;
};
function dd(a, b) {
  V(a);
  b = W(a, b);
  T(a.g.h, b) && (a.i = null, a.h -= a.g.get(b).length, a = a.g, T(a.h, b) && (delete a.h[b], a.i--, a.g.length > 2 * a.i && Lc(a)));
}
function ed(a, b) {
  V(a);
  b = W(a, b);
  return T(a.g.h, b);
}
k.forEach = function(a, b) {
  V(this);
  this.g.forEach(function(c, d) {
    na(c, function(e) {
      a.call(b, e, d, this);
    }, this);
  }, this);
};
k.T = function() {
  V(this);
  for (var a = this.g.R(), b = this.g.T(), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
  return c;
};
k.R = function(a) {
  V(this);
  var b = [];
  if ("string" === typeof a) ed(this, a) && (b = qa(b, this.g.get(W(this, a))));
  else {
    a = this.g.R();
    for (var c = 0; c < a.length; c++) b = qa(b, a[c]);
  }
  return b;
};
k.set = function(a, b) {
  V(this);
  this.i = null;
  a = W(this, a);
  ed(this, a) && (this.h -= this.g.get(a).length);
  this.g.set(a, [b]);
  this.h += 1;
  return this;
};
k.get = function(a, b) {
  if (!a) return b;
  a = this.R(a);
  return 0 < a.length ? String(a[0]) : b;
};
function mc(a, b, c) {
  dd(a, b);
  0 < c.length && (a.i = null, a.g.set(W(a, b), ra(c)), a.h += c.length);
}
k.toString = function() {
  if (this.i) return this.i;
  if (!this.g) return "";
  for (var a = [], b = this.g.T(), c = 0; c < b.length; c++) {
    var d = b[c], e = encodeURIComponent(String(d));
    d = this.R(d);
    for (var f = 0; f < d.length; f++) {
      var h = e;
      "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
      a.push(h);
    }
  }
  return this.i = a.join("&");
};
function W(a, b) {
  b = String(b);
  a.j && (b = b.toLowerCase());
  return b;
}
function Zc(a, b) {
  b && !a.j && (V(a), a.i = null, a.g.forEach(function(c, d) {
    var e = d.toLowerCase();
    d != e && (dd(this, d), mc(this, e, c));
  }, a));
  a.j = b;
}
var fd = (
  /** @class */
  /* @__PURE__ */ function() {
    function fd2(a, b) {
      this.h = a;
      this.g = b;
    }
    return fd2;
  }()
);
function gd(a) {
  this.l = a || hd;
  l.PerformanceNavigationTiming ? (a = l.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(l.g && l.g.Ea && l.g.Ea() && l.g.Ea().Zb);
  this.j = a ? this.l : 1;
  this.g = null;
  1 < this.j && (this.g = /* @__PURE__ */ new Set());
  this.h = null;
  this.i = [];
}
var hd = 10;
function id(a) {
  return a.h ? true : a.g ? a.g.size >= a.j : false;
}
function Cc(a) {
  return a.h ? 1 : a.g ? a.g.size : 0;
}
function yc(a, b) {
  return a.h ? a.h == b : a.g ? a.g.has(b) : false;
}
function Dc(a, b) {
  a.g ? a.g.add(b) : a.h = b;
}
function Fc(a, b) {
  a.h && a.h == b ? a.h = null : a.g && a.g.has(b) && a.g.delete(b);
}
gd.prototype.cancel = function() {
  var e_1, _a2;
  this.i = jd(this);
  if (this.h) this.h.cancel(), this.h = null;
  else if (this.g && 0 !== this.g.size) {
    try {
      for (var _b = __values(this.g.values()), _c2 = _b.next(); !_c2.done; _c2 = _b.next()) {
        var a = _c2.value;
        a.cancel();
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c2 && !_c2.done && (_a2 = _b.return)) _a2.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    this.g.clear();
  }
};
function jd(a) {
  var e_2, _a2;
  if (null != a.h) return a.i.concat(a.h.D);
  if (null != a.g && 0 !== a.g.size) {
    var b = a.i;
    try {
      for (var _b = __values(a.g.values()), _c2 = _b.next(); !_c2.done; _c2 = _b.next()) {
        var c = _c2.value;
        b = b.concat(c.D);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_c2 && !_c2.done && (_a2 = _b.return)) _a2.call(_b);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    return b;
  }
  return ra(a.i);
}
function kd() {
}
kd.prototype.stringify = function(a) {
  return l.JSON.stringify(a, void 0);
};
kd.prototype.parse = function(a) {
  return l.JSON.parse(a, void 0);
};
function ld() {
  this.g = new kd();
}
function md(a, b, c) {
  var d = c || "";
  try {
    Kc(a, function(e, f) {
      var h = e;
      p(e) && (h = rb(e));
      b.push(d + f + "=" + encodeURIComponent(h));
    });
  } catch (e) {
    throw b.push(d + "type=" + encodeURIComponent("_badmap")), e;
  }
}
function nd(a, b) {
  var c = new Mb();
  if (l.Image) {
    var d_1 = new Image();
    d_1.onload = ja(od, c, d_1, "TestLoadImage: loaded", true, b);
    d_1.onerror = ja(od, c, d_1, "TestLoadImage: error", false, b);
    d_1.onabort = ja(od, c, d_1, "TestLoadImage: abort", false, b);
    d_1.ontimeout = ja(od, c, d_1, "TestLoadImage: timeout", false, b);
    l.setTimeout(function() {
      if (d_1.ontimeout) d_1.ontimeout();
    }, 1e4);
    d_1.src = a;
  } else b(false);
}
function od(a, b, c, d, e) {
  try {
    b.onload = null, b.onerror = null, b.onabort = null, b.ontimeout = null, e(d);
  } catch (f) {
  }
}
function pd(a) {
  this.l = a.$b || null;
  this.j = a.ib || false;
}
t(pd, Yb);
pd.prototype.g = function() {
  return new qd(this.l, this.j);
};
pd.prototype.i = /* @__PURE__ */ function(a) {
  return function() {
    return a;
  };
}({});
function qd(a, b) {
  C.call(this);
  this.D = a;
  this.u = b;
  this.m = void 0;
  this.readyState = rd;
  this.status = 0;
  this.responseType = this.responseText = this.response = this.statusText = "";
  this.onreadystatechange = null;
  this.v = new Headers();
  this.h = null;
  this.C = "GET";
  this.B = "";
  this.g = false;
  this.A = this.j = this.l = null;
}
t(qd, C);
var rd = 0;
k = qd.prototype;
k.open = function(a, b) {
  if (this.readyState != rd) throw this.abort(), Error("Error reopening a connection");
  this.C = a;
  this.B = b;
  this.readyState = 1;
  sd(this);
};
k.send = function(a) {
  if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
  this.g = true;
  var b = {
    headers: this.v,
    method: this.C,
    credentials: this.m,
    cache: void 0
  };
  a && (b.body = a);
  (this.D || l).fetch(new Request(this.B, b)).then(this.Va.bind(this), this.ha.bind(this));
};
k.abort = function() {
  this.response = this.responseText = "";
  this.v = new Headers();
  this.status = 0;
  this.j && this.j.cancel("Request was aborted.");
  1 <= this.readyState && this.g && 4 != this.readyState && (this.g = false, td(this));
  this.readyState = rd;
};
k.Va = function(a) {
  if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, sd(this)), this.g && (this.readyState = 3, sd(this), this.g))) if ("arraybuffer" === this.responseType) a.arrayBuffer().then(this.Ta.bind(this), this.ha.bind(this));
  else if ("undefined" !== typeof l.ReadableStream && "body" in a) {
    this.j = a.body.getReader();
    if (this.u) {
      if (this.responseType) throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
      this.response = [];
    } else this.response = this.responseText = "", this.A = new TextDecoder();
    ud(this);
  } else a.text().then(this.Ua.bind(this), this.ha.bind(this));
};
function ud(a) {
  a.j.read().then(a.Sa.bind(a)).catch(a.ha.bind(a));
}
k.Sa = function(a) {
  if (this.g) {
    if (this.u && a.value) this.response.push(a.value);
    else if (!this.u) {
      var b = a.value ? a.value : new Uint8Array(0);
      if (b = this.A.decode(b, {
        stream: !a.done
      })) this.response = this.responseText += b;
    }
    a.done ? td(this) : sd(this);
    3 == this.readyState && ud(this);
  }
};
k.Ua = function(a) {
  this.g && (this.response = this.responseText = a, td(this));
};
k.Ta = function(a) {
  this.g && (this.response = a, td(this));
};
k.ha = function() {
  this.g && td(this);
};
function td(a) {
  a.readyState = 4;
  a.l = null;
  a.j = null;
  a.A = null;
  sd(a);
}
k.setRequestHeader = function(a, b) {
  this.v.append(a, b);
};
k.getResponseHeader = function(a) {
  return this.h ? this.h.get(a.toLowerCase()) || "" : "";
};
k.getAllResponseHeaders = function() {
  if (!this.h) return "";
  var a = [], b = this.h.entries();
  for (var c = b.next(); !c.done; ) c = c.value, a.push(c[0] + ": " + c[1]), c = b.next();
  return a.join("\r\n");
};
function sd(a) {
  a.onreadystatechange && a.onreadystatechange.call(a);
}
Object.defineProperty(qd.prototype, "withCredentials", {
  get: function() {
    return "include" === this.m;
  },
  set: function(a) {
    this.m = a ? "include" : "same-origin";
  }
});
var vd = l.JSON.parse;
function X(a) {
  C.call(this);
  this.headers = new S();
  this.u = a || null;
  this.h = false;
  this.C = this.g = null;
  this.H = "";
  this.m = 0;
  this.j = "";
  this.l = this.F = this.v = this.D = false;
  this.B = 0;
  this.A = null;
  this.J = wd;
  this.K = this.L = false;
}
t(X, C);
var wd = "";
var xd = /^https?$/i;
var yd = ["POST", "PUT"];
k = X.prototype;
k.ea = function(a, b, c, d) {
  if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.H + "; newUri=" + a);
  b = b ? b.toUpperCase() : "GET";
  this.H = a;
  this.j = "";
  this.m = 0;
  this.D = false;
  this.h = true;
  this.g = this.u ? this.u.g() : cc.g();
  this.C = this.u ? Zb(this.u) : Zb(cc);
  this.g.onreadystatechange = q(this.Fa, this);
  try {
    this.F = true, this.g.open(b, String(a), true), this.F = false;
  } catch (f) {
    zd(this, f);
    return;
  }
  a = c || "";
  var e = new S(this.headers);
  d && Kc(d, function(f, h) {
    e.set(h, f);
  });
  d = oa(e.T());
  c = l.FormData && a instanceof l.FormData;
  !(0 <= ma(yd, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  e.forEach(function(f, h) {
    this.g.setRequestHeader(h, f);
  }, this);
  this.J && (this.g.responseType = this.J);
  "withCredentials" in this.g && this.g.withCredentials !== this.L && (this.g.withCredentials = this.L);
  try {
    Ad(this), 0 < this.B && ((this.K = Bd(this.g)) ? (this.g.timeout = this.B, this.g.ontimeout = q(this.pa, this)) : this.A = Gb(this.pa, this.B, this)), this.v = true, this.g.send(a), this.v = false;
  } catch (f) {
    zd(this, f);
  }
};
function Bd(a) {
  return y && Ra() && "number" === typeof a.timeout && void 0 !== a.ontimeout;
}
function pa(a) {
  return "content-type" == a.toLowerCase();
}
k.pa = function() {
  "undefined" != typeof goog && this.g && (this.j = "Timed out after " + this.B + "ms, aborting", this.m = 8, D(this, "timeout"), this.abort(8));
};
function zd(a, b) {
  a.h = false;
  a.g && (a.l = true, a.g.abort(), a.l = false);
  a.j = b;
  a.m = 5;
  Cd(a);
  Dd(a);
}
function Cd(a) {
  a.D || (a.D = true, D(a, "complete"), D(a, "error"));
}
k.abort = function(a) {
  this.g && this.h && (this.h = false, this.l = true, this.g.abort(), this.l = false, this.m = a || 7, D(this, "complete"), D(this, "abort"), Dd(this));
};
k.M = function() {
  this.g && (this.h && (this.h = false, this.l = true, this.g.abort(), this.l = false), Dd(this, true));
  X.Z.M.call(this);
};
k.Fa = function() {
  this.s || (this.F || this.v || this.l ? Ed(this) : this.cb());
};
k.cb = function() {
  Ed(this);
};
function Ed(a) {
  if (a.h && "undefined" != typeof goog && (!a.C[1] || 4 != O(a) || 2 != a.ba())) {
    if (a.v && 4 == O(a)) Gb(a.Fa, 0, a);
    else if (D(a, "readystatechange"), 4 == O(a)) {
      a.h = false;
      try {
        var n = a.ba();
        a: switch (n) {
          case 200:
          case 201:
          case 202:
          case 204:
          case 206:
          case 304:
          case 1223:
            var b = true;
            break a;
          default:
            b = false;
        }
        var c;
        if (!(c = b)) {
          var d;
          if (d = 0 === n) {
            var e = String(a.H).match(Mc)[1] || null;
            if (!e && l.self && l.self.location) {
              var f = l.self.location.protocol;
              e = f.substr(0, f.length - 1);
            }
            d = !xd.test(e ? e.toLowerCase() : "");
          }
          c = d;
        }
        if (c) D(a, "complete"), D(a, "success");
        else {
          a.m = 6;
          try {
            var h = 2 < O(a) ? a.g.statusText : "";
          } catch (u) {
            h = "";
          }
          a.j = h + " [" + a.ba() + "]";
          Cd(a);
        }
      } finally {
        Dd(a);
      }
    }
  }
}
function Dd(a, b) {
  if (a.g) {
    Ad(a);
    var c = a.g, d = a.C[0] ? aa : null;
    a.g = null;
    a.C = null;
    b || D(a, "ready");
    try {
      c.onreadystatechange = d;
    } catch (e) {
    }
  }
}
function Ad(a) {
  a.g && a.K && (a.g.ontimeout = null);
  a.A && (l.clearTimeout(a.A), a.A = null);
}
function O(a) {
  return a.g ? a.g.readyState : 0;
}
k.ba = function() {
  try {
    return 2 < O(this) ? this.g.status : -1;
  } catch (a) {
    return -1;
  }
};
k.ga = function() {
  try {
    return this.g ? this.g.responseText : "";
  } catch (a) {
    return "";
  }
};
k.Qa = function(a) {
  if (this.g) {
    var b = this.g.responseText;
    a && 0 == b.indexOf(a) && (b = b.substring(a.length));
    return vd(b);
  }
};
function oc(a) {
  try {
    if (!a.g) return null;
    if ("response" in a.g) return a.g.response;
    switch (a.J) {
      case wd:
      case "text":
        return a.g.responseText;
      case "arraybuffer":
        if ("mozResponseArrayBuffer" in a.g) return a.g.mozResponseArrayBuffer;
    }
    return null;
  } catch (b) {
    return null;
  }
}
k.Da = function() {
  return this.m;
};
k.La = function() {
  return "string" === typeof this.j ? this.j : String(this.j);
};
function Fd(a) {
  var b = "";
  xa(a, function(c, d) {
    b += d;
    b += ":";
    b += c;
    b += "\r\n";
  });
  return b;
}
function Gd(a, b, c) {
  a: {
    for (d in c) {
      var d = false;
      break a;
    }
    d = true;
  }
  d || (c = Fd(c), "string" === typeof a ? null != c && encodeURIComponent(String(c)) : R(a, b, c));
}
function Hd(a, b, c) {
  return c && c.internalChannelParams ? c.internalChannelParams[a] || b : b;
}
function Id(a) {
  this.za = 0;
  this.l = [];
  this.h = new Mb();
  this.la = this.oa = this.F = this.W = this.g = this.sa = this.D = this.aa = this.o = this.P = this.s = null;
  this.Za = this.V = 0;
  this.Xa = Hd("failFast", false, a);
  this.N = this.v = this.u = this.m = this.j = null;
  this.X = true;
  this.I = this.ta = this.U = -1;
  this.Y = this.A = this.C = 0;
  this.Pa = Hd("baseRetryDelayMs", 5e3, a);
  this.$a = Hd("retryDelaySeedMs", 1e4, a);
  this.Ya = Hd("forwardChannelMaxRetries", 2, a);
  this.ra = Hd("forwardChannelRequestTimeoutMs", 2e4, a);
  this.qa = a && a.xmlHttpFactory || void 0;
  this.Ba = a && a.Yb || false;
  this.K = void 0;
  this.H = a && a.supportsCrossDomainXhr || false;
  this.J = "";
  this.i = new gd(a && a.concurrentRequestLimit);
  this.Ca = new ld();
  this.ja = a && a.fastHandshake || false;
  this.Ra = a && a.Wb || false;
  a && a.Aa && this.h.Aa();
  a && a.forceLongPolling && (this.X = false);
  this.$ = !this.ja && this.X && a && a.detectBufferingProxy || false;
  this.ka = void 0;
  this.O = 0;
  this.L = false;
  this.B = null;
  this.Wa = !a || false !== a.Xb;
}
k = Id.prototype;
k.ma = 8;
k.G = 1;
function Ic(a) {
  Jd(a);
  if (3 == a.G) {
    var b = a.V++, c = N(a.F);
    R(c, "SID", a.J);
    R(c, "RID", b);
    R(c, "TYPE", "terminate");
    Kd(a, c);
    b = new M(a, a.h, b, void 0);
    b.K = 2;
    b.v = jc(N(c));
    c = false;
    l.navigator && l.navigator.sendBeacon && (c = l.navigator.sendBeacon(b.v.toString(), ""));
    !c && l.Image && (new Image().src = b.v, c = true);
    c || (b.g = nc(b.l, null), b.g.ea(b.v));
    b.F = Date.now();
    lc(b);
  }
  Ld(a);
}
k.hb = function(a) {
  try {
    this.h.info("Origin Trials invoked: " + a);
  } catch (b) {
  }
};
function Ac(a) {
  a.g && (wc(a), a.g.cancel(), a.g = null);
}
function Jd(a) {
  Ac(a);
  a.u && (l.clearTimeout(a.u), a.u = null);
  zc(a);
  a.i.cancel();
  a.m && ("number" === typeof a.m && l.clearTimeout(a.m), a.m = null);
}
function Md(a, b) {
  a.l.push(new fd(a.Za++, b));
  3 == a.G && Hc(a);
}
function Hc(a) {
  id(a.i) || a.m || (a.m = true, zb(a.Ha, a), a.C = 0);
}
function Nd(a, b) {
  if (Cc(a.i) >= a.i.j - (a.m ? 1 : 0)) return false;
  if (a.m) return a.l = b.D.concat(a.l), true;
  if (1 == a.G || 2 == a.G || a.C >= (a.Xa ? 0 : a.Ya)) return false;
  a.m = K(q(a.Ha, a, b), Od(a, a.C));
  a.C++;
  return true;
}
k.Ha = function(a) {
  if (this.m) if (this.m = null, 1 == this.G) {
    if (!a) {
      this.V = Math.floor(1e5 * Math.random());
      a = this.V++;
      var e = new M(this, this.h, a, void 0);
      var f = this.s;
      this.P && (f ? (f = ya(f), Aa(f, this.P)) : f = this.P);
      null === this.o && (e.H = f);
      if (this.ja) a: {
        var b = 0;
        for (var c = 0; c < this.l.length; c++) {
          b: {
            var d = this.l[c];
            if ("__data__" in d.g && (d = d.g.__data__, "string" === typeof d)) {
              d = d.length;
              break b;
            }
            d = void 0;
          }
          if (void 0 === d) break;
          b += d;
          if (4096 < b) {
            b = c;
            break a;
          }
          if (4096 === b || c === this.l.length - 1) {
            b = c + 1;
            break a;
          }
        }
        b = 1e3;
      }
      else b = 1e3;
      b = Pd(this, e, b);
      c = N(this.F);
      R(c, "RID", a);
      R(c, "CVER", 22);
      this.D && R(c, "X-HTTP-Session-Id", this.D);
      Kd(this, c);
      this.o && f && Gd(c, this.o, f);
      Dc(this.i, e);
      this.Ra && R(c, "TYPE", "init");
      this.ja ? (R(c, "$req", b), R(c, "SID", "null"), e.$ = true, ic(e, c, null)) : ic(e, c, b);
      this.G = 2;
    }
  } else 3 == this.G && (a ? Qd(this, a) : 0 == this.l.length || id(this.i) || Qd(this));
};
function Qd(a, b) {
  var c;
  b ? c = b.m : c = a.V++;
  var d = N(a.F);
  R(d, "SID", a.J);
  R(d, "RID", c);
  R(d, "AID", a.U);
  Kd(a, d);
  a.o && a.s && Gd(d, a.o, a.s);
  c = new M(a, a.h, c, a.C + 1);
  null === a.o && (c.H = a.s);
  b && (a.l = b.D.concat(a.l));
  b = Pd(a, c, 1e3);
  c.setTimeout(Math.round(0.5 * a.ra) + Math.round(0.5 * a.ra * Math.random()));
  Dc(a.i, c);
  ic(c, d, b);
}
function Kd(a, b) {
  a.j && Kc({}, function(c, d) {
    R(b, d, c);
  });
}
function Pd(a, b, c) {
  c = Math.min(a.l.length, c);
  var d = a.j ? q(a.j.Oa, a.j, a) : null;
  a: {
    var e = a.l;
    var f = -1;
    for (; ; ) {
      var h = ["count=" + c];
      -1 == f ? 0 < c ? (f = e[0].h, h.push("ofs=" + f)) : f = 0 : h.push("ofs=" + f);
      var n = true;
      for (var u = 0; u < c; u++) {
        var m = e[u].h;
        var r = e[u].g;
        m -= f;
        if (0 > m) f = Math.max(0, e[u].h - 100), n = false;
        else try {
          md(r, h, "req" + m + "_");
        } catch (G2) {
          d && d(r);
        }
      }
      if (n) {
        d = h.join("&");
        break a;
      }
    }
  }
  a = a.l.splice(0, c);
  b.D = a;
  return d;
}
function Gc(a) {
  a.g || a.u || (a.Y = 1, zb(a.Ga, a), a.A = 0);
}
function Bc(a) {
  if (a.g || a.u || 3 <= a.A) return false;
  a.Y++;
  a.u = K(q(a.Ga, a), Od(a, a.A));
  a.A++;
  return true;
}
k.Ga = function() {
  this.u = null;
  Rd(this);
  if (this.$ && !(this.L || null == this.g || 0 >= this.O)) {
    var a = 2 * this.O;
    this.h.info("BP detection timer enabled: " + a);
    this.B = K(q(this.bb, this), a);
  }
};
k.bb = function() {
  this.B && (this.B = null, this.h.info("BP detection timeout reached."), this.h.info("Buffering proxy detected and switch to long-polling!"), this.N = false, this.L = true, J(10), Ac(this), Rd(this));
};
function wc(a) {
  null != a.B && (l.clearTimeout(a.B), a.B = null);
}
function Rd(a) {
  a.g = new M(a, a.h, "rpc", a.Y);
  null === a.o && (a.g.H = a.s);
  a.g.O = 0;
  var b = N(a.oa);
  R(b, "RID", "rpc");
  R(b, "SID", a.J);
  R(b, "CI", a.N ? "0" : "1");
  R(b, "AID", a.U);
  Kd(a, b);
  R(b, "TYPE", "xmlhttp");
  a.o && a.s && Gd(b, a.o, a.s);
  a.K && a.g.setTimeout(a.K);
  var c = a.g;
  a = a.la;
  c.K = 1;
  c.v = jc(N(b));
  c.s = null;
  c.U = true;
  kc(c, a);
}
k.ab = function() {
  null != this.v && (this.v = null, Ac(this), Bc(this), J(19));
};
function zc(a) {
  null != a.v && (l.clearTimeout(a.v), a.v = null);
}
function uc(a, b) {
  var c = null;
  if (a.g == b) {
    zc(a);
    wc(a);
    a.g = null;
    var d = 2;
  } else if (yc(a.i, b)) c = b.D, Fc(a.i, b), d = 1;
  else return;
  a.I = b.N;
  if (0 != a.G) {
    if (b.i) {
      if (1 == d) {
        c = b.s ? b.s.length : 0;
        b = Date.now() - b.F;
        var e = a.C;
        d = Sb();
        D(d, new Vb(d, c, b, e));
        Hc(a);
      } else Gc(a);
    } else if (e = b.o, 3 == e || 0 == e && 0 < a.I || !(1 == d && Nd(a, b) || 2 == d && Bc(a))) switch (c && 0 < c.length && (b = a.i, b.i = b.i.concat(c)), e) {
      case 1:
        Q(a, 5);
        break;
      case 4:
        Q(a, 10);
        break;
      case 3:
        Q(a, 6);
        break;
      default:
        Q(a, 2);
    }
  }
}
function Od(a, b) {
  var c = a.Pa + Math.floor(Math.random() * a.$a);
  a.j || (c *= 2);
  return c * b;
}
function Q(a, b) {
  a.h.info("Error code " + b);
  if (2 == b) {
    var c = null;
    a.j && (c = null);
    var d = q(a.jb, a);
    c || (c = new U("//www.google.com/images/cleardot.gif"), l.location && "http" == l.location.protocol || Oc(c, "https"), jc(c));
    nd(c.toString(), d);
  } else J(2);
  a.G = 0;
  a.j && a.j.va(b);
  Ld(a);
  Jd(a);
}
k.jb = function(a) {
  a ? (this.h.info("Successfully pinged google.com"), J(2)) : (this.h.info("Failed to ping google.com"), J(1));
};
function Ld(a) {
  a.G = 0;
  a.I = -1;
  if (a.j) {
    if (0 != jd(a.i).length || 0 != a.l.length) a.i.i.length = 0, ra(a.l), a.l.length = 0;
    a.j.ua();
  }
}
function Ec(a, b, c) {
  var d = ad(c);
  if ("" != d.i) b && Pc(d, b + "." + d.i), Qc(d, d.m);
  else {
    var e = l.location;
    d = bd(e.protocol, b ? b + "." + e.hostname : e.hostname, +e.port, c);
  }
  a.aa && xa(a.aa, function(e2, f) {
    R(d, f, e2);
  });
  b = a.D;
  c = a.sa;
  b && c && R(d, b, c);
  R(d, "VER", a.ma);
  Kd(a, d);
  return d;
}
function nc(a, b, c) {
  if (b && !a.H) throw Error("Can't create secondary domain capable XhrIo object.");
  b = c && a.Ba && !a.qa ? new X(new pd({
    ib: true
  })) : new X(a.qa);
  b.L = a.H;
  return b;
}
function Sd() {
}
k = Sd.prototype;
k.xa = function() {
};
k.wa = function() {
};
k.va = function() {
};
k.ua = function() {
};
k.Oa = function() {
};
function Td() {
  if (y && !(10 <= Number(Ua))) throw Error("Environmental error: no available transport.");
}
Td.prototype.g = function(a, b) {
  return new Y(a, b);
};
function Y(a, b) {
  C.call(this);
  this.g = new Id(b);
  this.l = a;
  this.h = b && b.messageUrlParams || null;
  a = b && b.messageHeaders || null;
  b && b.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = {
    "X-Client-Protocol": "webchannel"
  });
  this.g.s = a;
  a = b && b.initMessageHeaders || null;
  b && b.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b.messageContentType : a = {
    "X-WebChannel-Content-Type": b.messageContentType
  });
  b && b.ya && (a ? a["X-WebChannel-Client-Profile"] = b.ya : a = {
    "X-WebChannel-Client-Profile": b.ya
  });
  this.g.P = a;
  (a = b && b.httpHeadersOverwriteParam) && !sa(a) && (this.g.o = a);
  this.A = b && b.supportsCrossDomainXhr || false;
  this.v = b && b.sendRawJson || false;
  (b = b && b.httpSessionIdParam) && !sa(b) && (this.g.D = b, a = this.h, null !== a && b in a && (a = this.h, b in a && delete a[b]));
  this.j = new Z(this);
}
t(Y, C);
Y.prototype.m = function() {
  this.g.j = this.j;
  this.A && (this.g.H = true);
  var a = this.g, b = this.l, c = this.h || void 0;
  a.Wa && (a.h.info("Origin Trials enabled."), zb(q(a.hb, a, b)));
  J(0);
  a.W = b;
  a.aa = c || {};
  a.N = a.X;
  a.F = Ec(a, null, a.W);
  Hc(a);
};
Y.prototype.close = function() {
  Ic(this.g);
};
Y.prototype.u = function(a) {
  if ("string" === typeof a) {
    var b = {};
    b.__data__ = a;
    Md(this.g, b);
  } else this.v ? (b = {}, b.__data__ = rb(a), Md(this.g, b)) : Md(this.g, a);
};
Y.prototype.M = function() {
  this.g.j = null;
  delete this.j;
  Ic(this.g);
  delete this.g;
  Y.Z.M.call(this);
};
function Ud(a) {
  ac.call(this);
  var b = a.__sm__;
  if (b) {
    a: {
      for (var c in b) {
        a = c;
        break a;
      }
      a = void 0;
    }
    if (this.i = a) a = this.i, b = null !== b && a in b ? b[a] : void 0;
    this.data = b;
  } else this.data = a;
}
t(Ud, ac);
function Vd() {
  bc.call(this);
  this.status = 1;
}
t(Vd, bc);
function Z(a) {
  this.g = a;
}
t(Z, Sd);
Z.prototype.xa = function() {
  D(this.g, "a");
};
Z.prototype.wa = function(a) {
  D(this.g, new Ud(a));
};
Z.prototype.va = function(a) {
  D(this.g, new Vd(a));
};
Z.prototype.ua = function() {
  D(this.g, "b");
};
Td.prototype.createWebChannel = Td.prototype.g;
Y.prototype.send = Y.prototype.u;
Y.prototype.open = Y.prototype.m;
Y.prototype.close = Y.prototype.close;
Wb.NO_ERROR = 0;
Wb.TIMEOUT = 8;
Wb.HTTP_ERROR = 6;
Xb.COMPLETE = "complete";
$b.EventType = L;
L.OPEN = "a";
L.CLOSE = "b";
L.ERROR = "c";
L.MESSAGE = "d";
C.prototype.listen = C.prototype.N;
X.prototype.listenOnce = X.prototype.O;
X.prototype.getLastError = X.prototype.La;
X.prototype.getLastErrorCode = X.prototype.Da;
X.prototype.getStatus = X.prototype.ba;
X.prototype.getResponseJson = X.prototype.Qa;
X.prototype.getResponseText = X.prototype.ga;
X.prototype.send = X.prototype.ea;
var createWebChannelTransport = function() {
  return new Td();
};
var getStatEventTarget = function() {
  return Sb();
};
var ErrorCode = Wb;
var EventType = Xb;
var Event = H;
var Stat = {
  rb: 0,
  ub: 1,
  vb: 2,
  Ob: 3,
  Tb: 4,
  Qb: 5,
  Rb: 6,
  Pb: 7,
  Nb: 8,
  Sb: 9,
  PROXY: 10,
  NOPROXY: 11,
  Lb: 12,
  Hb: 13,
  Ib: 14,
  Gb: 15,
  Jb: 16,
  Kb: 17,
  nb: 18,
  mb: 19,
  ob: 20
};
var FetchXmlHttpFactory = pd;
var WebChannel = $b;
var XhrIo = X;

// node_modules/@firebase/firestore/dist/esm5/prebuilt-2d830653-6eee25bb.js
var S2 = (
  /** @class */
  function() {
    function t2(t3, e) {
      var n = this;
      this.previousValue = t3, e && (e.sequenceNumberHandler = function(t4) {
        return n.t(t4);
      }, this.i = function(t4) {
        return e.writeSequenceNumber(t4);
      });
    }
    return t2.prototype.t = function(t3) {
      return this.previousValue = Math.max(t3, this.previousValue), this.previousValue;
    }, t2.prototype.next = function() {
      var t3 = ++this.previousValue;
      return this.i && this.i(t3), t3;
    }, t2;
  }()
);
S2.o = -1;
var N2 = {
  // Causes are copied from:
  // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
  /** Not an error; returned on success. */
  OK: "ok",
  /** The operation was cancelled (typically by the caller). */
  CANCELLED: "cancelled",
  /** Unknown error or an error from a different error domain. */
  UNKNOWN: "unknown",
  /**
   * Client specified an invalid argument. Note that this differs from
   * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
   * problematic regardless of the state of the system (e.g., a malformed file
   * name).
   */
  INVALID_ARGUMENT: "invalid-argument",
  /**
   * Deadline expired before operation could complete. For operations that
   * change the state of the system, this error may be returned even if the
   * operation has completed successfully. For example, a successful response
   * from a server could have been delayed long enough for the deadline to
   * expire.
   */
  DEADLINE_EXCEEDED: "deadline-exceeded",
  /** Some requested entity (e.g., file or directory) was not found. */
  NOT_FOUND: "not-found",
  /**
   * Some entity that we attempted to create (e.g., file or directory) already
   * exists.
   */
  ALREADY_EXISTS: "already-exists",
  /**
   * The caller does not have permission to execute the specified operation.
   * PERMISSION_DENIED must not be used for rejections caused by exhausting
   * some resource (use RESOURCE_EXHAUSTED instead for those errors).
   * PERMISSION_DENIED must not be used if the caller can not be identified
   * (use UNAUTHENTICATED instead for those errors).
   */
  PERMISSION_DENIED: "permission-denied",
  /**
   * The request does not have valid authentication credentials for the
   * operation.
   */
  UNAUTHENTICATED: "unauthenticated",
  /**
   * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
   * entire file system is out of space.
   */
  RESOURCE_EXHAUSTED: "resource-exhausted",
  /**
   * Operation was rejected because the system is not in a state required for
   * the operation's execution. For example, directory to be deleted may be
   * non-empty, an rmdir operation is applied to a non-directory, etc.
   *
   * A litmus test that may help a service implementor in deciding
   * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
   *  (a) Use UNAVAILABLE if the client can retry just the failing call.
   *  (b) Use ABORTED if the client should retry at a higher-level
   *      (e.g., restarting a read-modify-write sequence).
   *  (c) Use FAILED_PRECONDITION if the client should not retry until
   *      the system state has been explicitly fixed. E.g., if an "rmdir"
   *      fails because the directory is non-empty, FAILED_PRECONDITION
   *      should be returned since the client should not retry unless
   *      they have first fixed up the directory by deleting files from it.
   *  (d) Use FAILED_PRECONDITION if the client performs conditional
   *      REST Get/Update/Delete on a resource and the resource on the
   *      server does not match the condition. E.g., conflicting
   *      read-modify-write on the same resource.
   */
  FAILED_PRECONDITION: "failed-precondition",
  /**
   * The operation was aborted, typically due to a concurrency issue like
   * sequencer check failures, transaction aborts, etc.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  ABORTED: "aborted",
  /**
   * Operation was attempted past the valid range. E.g., seeking or reading
   * past end of file.
   *
   * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
   * if the system state changes. For example, a 32-bit file system will
   * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
   * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
   * an offset past the current file size.
   *
   * There is a fair bit of overlap between FAILED_PRECONDITION and
   * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
   * when it applies so that callers who are iterating through a space can
   * easily look for an OUT_OF_RANGE error to detect when they are done.
   */
  OUT_OF_RANGE: "out-of-range",
  /** Operation is not implemented or not supported/enabled in this service. */
  UNIMPLEMENTED: "unimplemented",
  /**
   * Internal errors. Means some invariants expected by underlying System has
   * been broken. If you see one of these errors, Something is very broken.
   */
  INTERNAL: "internal",
  /**
   * The service is currently unavailable. This is a most likely a transient
   * condition and may be corrected by retrying with a backoff.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  UNAVAILABLE: "unavailable",
  /** Unrecoverable data loss or corruption. */
  DATA_LOSS: "data-loss"
};
var D2 = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, n2) || this).code = t2, r.message = n2, /** The custom name for all FirestoreErrors. */
      r.name = "FirebaseError", // HACK: We write a toString property directly because Error is not a real
      // class and so inheritance does not work correctly. We could alternatively
      // do the same "back-door inheritance" trick that FirebaseError does.
      r.toString = function() {
        return r.name + ": [code=" + r.code + "]: " + r.message;
      }, r;
    }
    return __extends(n, e), n;
  }(Error)
);
var A2 = new Logger("@firebase/firestore");
function k2() {
  return A2.logLevel;
}
function C2(t2) {
  for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
  if (A2.logLevel <= LogLevel.DEBUG) {
    var i = n.map(L2);
    A2.debug.apply(A2, __spreadArray(["Firestore (8.10.1): " + t2], i));
  }
}
function x2(t2) {
  for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
  if (A2.logLevel <= LogLevel.ERROR) {
    var i = n.map(L2);
    A2.error.apply(A2, __spreadArray(["Firestore (8.10.1): " + t2], i));
  }
}
function R2(t2) {
  for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
  if (A2.logLevel <= LogLevel.WARN) {
    var i = n.map(L2);
    A2.warn.apply(A2, __spreadArray(["Firestore (8.10.1): " + t2], i));
  }
}
function L2(t2) {
  if ("string" == typeof t2) return t2;
  try {
    return e = t2, JSON.stringify(e);
  } catch (e2) {
    return t2;
  }
  var e;
}
function O2(t2) {
  void 0 === t2 && (t2 = "Unexpected state");
  var e = "FIRESTORE (8.10.1) INTERNAL ASSERTION FAILED: " + t2;
  throw x2(e), new Error(e);
}
function P2(t2, e) {
  t2 || O2();
}
function F2(t2, e) {
  return t2;
}
function M2(t2) {
  var e = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "undefined" != typeof self && (self.crypto || self.msCrypto)
  ), n = new Uint8Array(t2);
  if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n);
  else
    for (var r = 0; r < t2; r++) n[r] = Math.floor(256 * Math.random());
  return n;
}
var V2 = (
  /** @class */
  function() {
    function t2() {
    }
    return t2.u = function() {
      for (var t3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t3.length) * t3.length, n = ""; n.length < 20; ) for (var r = M2(40), i = 0; i < r.length; ++i)
        n.length < 20 && r[i] < e && (n += t3.charAt(r[i] % t3.length));
      return n;
    }, t2;
  }()
);
function q2(t2, e) {
  return t2 < e ? -1 : t2 > e ? 1 : 0;
}
function U2(t2, e, n) {
  return t2.length === e.length && t2.every(function(t3, r) {
    return n(t3, e[r]);
  });
}
function B2(t2) {
  return t2 + "\0";
}
var j = (
  /** @class */
  function() {
    function t2(t3, e) {
      if (this.seconds = t3, this.nanoseconds = e, e < 0) throw new D2(N2.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
      if (e >= 1e9) throw new D2(N2.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
      if (t3 < -62135596800) throw new D2(N2.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t3);
      if (t3 >= 253402300800) throw new D2(N2.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t3);
    }
    return t2.now = function() {
      return t2.fromMillis(Date.now());
    }, /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */
    t2.fromDate = function(e) {
      return t2.fromMillis(e.getTime());
    }, /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */
    t2.fromMillis = function(e) {
      var n = Math.floor(e / 1e3);
      return new t2(n, Math.floor(1e6 * (e - 1e3 * n)));
    }, /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */
    t2.prototype.toDate = function() {
      return new Date(this.toMillis());
    }, /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */
    t2.prototype.toMillis = function() {
      return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }, t2.prototype._compareTo = function(t3) {
      return this.seconds === t3.seconds ? q2(this.nanoseconds, t3.nanoseconds) : q2(this.seconds, t3.seconds);
    }, /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */
    t2.prototype.isEqual = function(t3) {
      return t3.seconds === this.seconds && t3.nanoseconds === this.nanoseconds;
    }, /** Returns a textual representation of this `Timestamp`. */
    t2.prototype.toString = function() {
      return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }, /** Returns a JSON-serializable representation of this `Timestamp`. */
    t2.prototype.toJSON = function() {
      return {
        seconds: this.seconds,
        nanoseconds: this.nanoseconds
      };
    }, /**
     * Converts this object to a primitive string, which allows `Timestamp` objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */
    t2.prototype.valueOf = function() {
      var t3 = this.seconds - -62135596800;
      return String(t3).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }, t2;
  }()
);
var K2 = (
  /** @class */
  function() {
    function t2(t3) {
      this.timestamp = t3;
    }
    return t2.fromTimestamp = function(e) {
      return new t2(e);
    }, t2.min = function() {
      return new t2(new j(0, 0));
    }, t2.prototype.compareTo = function(t3) {
      return this.timestamp._compareTo(t3.timestamp);
    }, t2.prototype.isEqual = function(t3) {
      return this.timestamp.isEqual(t3.timestamp);
    }, /** Returns a number representation of the version for use in spec tests. */
    t2.prototype.toMicroseconds = function() {
      return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }, t2.prototype.toString = function() {
      return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }, t2.prototype.toTimestamp = function() {
      return this.timestamp;
    }, t2;
  }()
);
function G(t2) {
  var e = 0;
  for (var n in t2) Object.prototype.hasOwnProperty.call(t2, n) && e++;
  return e;
}
function Q2(t2, e) {
  for (var n in t2) Object.prototype.hasOwnProperty.call(t2, n) && e(n, t2[n]);
}
function z2(t2) {
  for (var e in t2) if (Object.prototype.hasOwnProperty.call(t2, e)) return false;
  return true;
}
var W2 = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      void 0 === e ? e = 0 : e > t3.length && O2(), void 0 === n ? n = t3.length - e : n > t3.length - e && O2(), this.segments = t3, this.offset = e, this.len = n;
    }
    return Object.defineProperty(t2.prototype, "length", {
      get: function() {
        return this.len;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.isEqual = function(e) {
      return 0 === t2.comparator(this, e);
    }, t2.prototype.child = function(e) {
      var n = this.segments.slice(this.offset, this.limit());
      return e instanceof t2 ? e.forEach(function(t3) {
        n.push(t3);
      }) : n.push(e), this.construct(n);
    }, /** The index of one past the last segment of the path. */
    t2.prototype.limit = function() {
      return this.offset + this.length;
    }, t2.prototype.popFirst = function(t3) {
      return t3 = void 0 === t3 ? 1 : t3, this.construct(this.segments, this.offset + t3, this.length - t3);
    }, t2.prototype.popLast = function() {
      return this.construct(this.segments, this.offset, this.length - 1);
    }, t2.prototype.firstSegment = function() {
      return this.segments[this.offset];
    }, t2.prototype.lastSegment = function() {
      return this.get(this.length - 1);
    }, t2.prototype.get = function(t3) {
      return this.segments[this.offset + t3];
    }, t2.prototype.isEmpty = function() {
      return 0 === this.length;
    }, t2.prototype.isPrefixOf = function(t3) {
      if (t3.length < this.length) return false;
      for (var e = 0; e < this.length; e++) if (this.get(e) !== t3.get(e)) return false;
      return true;
    }, t2.prototype.isImmediateParentOf = function(t3) {
      if (this.length + 1 !== t3.length) return false;
      for (var e = 0; e < this.length; e++) if (this.get(e) !== t3.get(e)) return false;
      return true;
    }, t2.prototype.forEach = function(t3) {
      for (var e = this.offset, n = this.limit(); e < n; e++) t3(this.segments[e]);
    }, t2.prototype.toArray = function() {
      return this.segments.slice(this.offset, this.limit());
    }, t2.comparator = function(t3, e) {
      for (var n = Math.min(t3.length, e.length), r = 0; r < n; r++) {
        var i = t3.get(r), o = e.get(r);
        if (i < o) return -1;
        if (i > o) return 1;
      }
      return t3.length < e.length ? -1 : t3.length > e.length ? 1 : 0;
    }, t2;
  }()
);
var H2 = (
  /** @class */
  function(e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return __extends(n, e), n.prototype.construct = function(t2, e2, r) {
      return new n(t2, e2, r);
    }, n.prototype.canonicalString = function() {
      return this.toArray().join("/");
    }, n.prototype.toString = function() {
      return this.canonicalString();
    }, /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */
    n.fromString = function() {
      for (var t2 = [], e2 = 0; e2 < arguments.length; e2++) t2[e2] = arguments[e2];
      for (var r = [], i = 0, o = t2; i < o.length; i++) {
        var s = o[i];
        if (s.indexOf("//") >= 0) throw new D2(N2.INVALID_ARGUMENT, "Invalid segment (" + s + "). Paths must not contain // in them.");
        r.push.apply(r, s.split("/").filter(function(t3) {
          return t3.length > 0;
        }));
      }
      return new n(r);
    }, n.emptyPath = function() {
      return new n([]);
    }, n;
  }(W2)
);
var Y2 = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
var $ = (
  /** @class */
  function(e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return __extends(n, e), n.prototype.construct = function(t2, e2, r) {
      return new n(t2, e2, r);
    }, /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    n.isValidIdentifier = function(t2) {
      return Y2.test(t2);
    }, n.prototype.canonicalString = function() {
      return this.toArray().map(function(t2) {
        return t2 = t2.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), n.isValidIdentifier(t2) || (t2 = "`" + t2 + "`"), t2;
      }).join(".");
    }, n.prototype.toString = function() {
      return this.canonicalString();
    }, /**
     * Returns true if this field references the key of a document.
     */
    n.prototype.isKeyField = function() {
      return 1 === this.length && "__name__" === this.get(0);
    }, /**
     * The field designating the key of a document.
     */
    n.keyField = function() {
      return new n(["__name__"]);
    }, /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */
    n.fromServerFormat = function(t2) {
      for (var e2 = [], r = "", i = 0, o = function() {
        if (0 === r.length) throw new D2(N2.INVALID_ARGUMENT, "Invalid field path (" + t2 + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
        e2.push(r), r = "";
      }, s = false; i < t2.length; ) {
        var u = t2[i];
        if ("\\" === u) {
          if (i + 1 === t2.length) throw new D2(N2.INVALID_ARGUMENT, "Path has trailing escape character: " + t2);
          var a = t2[i + 1];
          if ("\\" !== a && "." !== a && "`" !== a) throw new D2(N2.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t2);
          r += a, i += 2;
        } else "`" === u ? (s = !s, i++) : "." !== u || s ? (r += u, i++) : (o(), i++);
      }
      if (o(), s) throw new D2(N2.INVALID_ARGUMENT, "Unterminated ` in path: " + t2);
      return new n(e2);
    }, n.emptyPath = function() {
      return new n([]);
    }, n;
  }(W2)
);
var X2 = (
  /** @class */
  function() {
    function t2(t3) {
      this.fields = t3, // TODO(dimond): validation of FieldMask
      // Sort the field mask to support `FieldMask.isEqual()` and assert below.
      t3.sort($.comparator);
    }
    return t2.prototype.covers = function(t3) {
      for (var e = 0, n = this.fields; e < n.length; e++) {
        if (n[e].isPrefixOf(t3)) return true;
      }
      return false;
    }, t2.prototype.isEqual = function(t3) {
      return U2(this.fields, t3.fields, function(t4, e) {
        return t4.isEqual(e);
      });
    }, t2;
  }()
);
var J2 = (
  /** @class */
  function() {
    function t2(t3) {
      this.binaryString = t3;
    }
    return t2.fromBase64String = function(e) {
      return new t2(atob(e));
    }, t2.fromUint8Array = function(e) {
      return new t2(
        /**
        * Helper function to convert an Uint8array to a binary string.
        */
        function(t3) {
          for (var e2 = "", n = 0; n < t3.length; ++n) e2 += String.fromCharCode(t3[n]);
          return e2;
        }(e)
      );
    }, t2.prototype.toBase64 = function() {
      return t3 = this.binaryString, btoa(t3);
      var t3;
    }, t2.prototype.toUint8Array = function() {
      return function(t3) {
        for (var e = new Uint8Array(t3.length), n = 0; n < t3.length; n++) e[n] = t3.charCodeAt(n);
        return e;
      }(this.binaryString);
    }, t2.prototype.approximateByteSize = function() {
      return 2 * this.binaryString.length;
    }, t2.prototype.compareTo = function(t3) {
      return q2(this.binaryString, t3.binaryString);
    }, t2.prototype.isEqual = function(t3) {
      return this.binaryString === t3.binaryString;
    }, t2;
  }()
);
J2.EMPTY_BYTE_STRING = new J2("");
var Z2 = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function tt(t2) {
  if (P2(!!t2), "string" == typeof t2) {
    var e = 0, n = Z2.exec(t2);
    if (P2(!!n), n[1]) {
      var r = n[1];
      r = (r + "000000000").substr(0, 9), e = Number(r);
    }
    var i = new Date(t2);
    return {
      seconds: Math.floor(i.getTime() / 1e3),
      nanos: e
    };
  }
  return {
    seconds: et(t2.seconds),
    nanos: et(t2.nanos)
  };
}
function et(t2) {
  return "number" == typeof t2 ? t2 : "string" == typeof t2 ? Number(t2) : 0;
}
function nt(t2) {
  return "string" == typeof t2 ? J2.fromBase64String(t2) : J2.fromUint8Array(t2);
}
function rt(t2) {
  var e, n;
  return "server_timestamp" === (null === (n = ((null === (e = null == t2 ? void 0 : t2.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}
function it(t2) {
  var e = t2.mapValue.fields.__previous_value__;
  return rt(e) ? it(e) : e;
}
function ot(t2) {
  var e = tt(t2.mapValue.fields.__local_write_time__.timestampValue);
  return new j(e.seconds, e.nanos);
}
function st(t2) {
  return null == t2;
}
function ut(t2) {
  return 0 === t2 && 1 / t2 == -1 / 0;
}
function at(t2) {
  return "number" == typeof t2 && Number.isInteger(t2) && !ut(t2) && t2 <= Number.MAX_SAFE_INTEGER && t2 >= Number.MIN_SAFE_INTEGER;
}
var ct = (
  /** @class */
  function() {
    function t2(t3) {
      this.path = t3;
    }
    return t2.fromPath = function(e) {
      return new t2(H2.fromString(e));
    }, t2.fromName = function(e) {
      return new t2(H2.fromString(e).popFirst(5));
    }, /** Returns true if the document is in the specified collectionId. */
    t2.prototype.hasCollectionId = function(t3) {
      return this.path.length >= 2 && this.path.get(this.path.length - 2) === t3;
    }, t2.prototype.isEqual = function(t3) {
      return null !== t3 && 0 === H2.comparator(this.path, t3.path);
    }, t2.prototype.toString = function() {
      return this.path.toString();
    }, t2.comparator = function(t3, e) {
      return H2.comparator(t3.path, e.path);
    }, t2.isDocumentKey = function(t3) {
      return t3.length % 2 == 0;
    }, /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */
    t2.fromSegments = function(e) {
      return new t2(new H2(e.slice()));
    }, t2;
  }()
);
function ht(t2) {
  return "nullValue" in t2 ? 0 : "booleanValue" in t2 ? 1 : "integerValue" in t2 || "doubleValue" in t2 ? 2 : "timestampValue" in t2 ? 3 : "stringValue" in t2 ? 5 : "bytesValue" in t2 ? 6 : "referenceValue" in t2 ? 7 : "geoPointValue" in t2 ? 8 : "arrayValue" in t2 ? 9 : "mapValue" in t2 ? rt(t2) ? 4 : 10 : O2();
}
function ft(t2, e) {
  var n = ht(t2);
  if (n !== ht(e)) return false;
  switch (n) {
    case 0:
      return true;
    case 1:
      return t2.booleanValue === e.booleanValue;
    case 4:
      return ot(t2).isEqual(ot(e));
    case 3:
      return function(t3, e2) {
        if ("string" == typeof t3.timestampValue && "string" == typeof e2.timestampValue && t3.timestampValue.length === e2.timestampValue.length)
          return t3.timestampValue === e2.timestampValue;
        var n2 = tt(t3.timestampValue), r = tt(e2.timestampValue);
        return n2.seconds === r.seconds && n2.nanos === r.nanos;
      }(t2, e);
    case 5:
      return t2.stringValue === e.stringValue;
    case 6:
      return function(t3, e2) {
        return nt(t3.bytesValue).isEqual(nt(e2.bytesValue));
      }(t2, e);
    case 7:
      return t2.referenceValue === e.referenceValue;
    case 8:
      return function(t3, e2) {
        return et(t3.geoPointValue.latitude) === et(e2.geoPointValue.latitude) && et(t3.geoPointValue.longitude) === et(e2.geoPointValue.longitude);
      }(t2, e);
    case 2:
      return function(t3, e2) {
        if ("integerValue" in t3 && "integerValue" in e2) return et(t3.integerValue) === et(e2.integerValue);
        if ("doubleValue" in t3 && "doubleValue" in e2) {
          var n2 = et(t3.doubleValue), r = et(e2.doubleValue);
          return n2 === r ? ut(n2) === ut(r) : isNaN(n2) && isNaN(r);
        }
        return false;
      }(t2, e);
    case 9:
      return U2(t2.arrayValue.values || [], e.arrayValue.values || [], ft);
    case 10:
      return function(t3, e2) {
        var n2 = t3.mapValue.fields || {}, r = e2.mapValue.fields || {};
        if (G(n2) !== G(r)) return false;
        for (var i in n2) if (n2.hasOwnProperty(i) && (void 0 === r[i] || !ft(n2[i], r[i]))) return false;
        return true;
      }(t2, e);
    default:
      return O2();
  }
}
function lt(t2, e) {
  return void 0 !== (t2.values || []).find(function(t3) {
    return ft(t3, e);
  });
}
function dt(t2, e) {
  var n = ht(t2), r = ht(e);
  if (n !== r) return q2(n, r);
  switch (n) {
    case 0:
      return 0;
    case 1:
      return q2(t2.booleanValue, e.booleanValue);
    case 2:
      return function(t3, e2) {
        var n2 = et(t3.integerValue || t3.doubleValue), r2 = et(e2.integerValue || e2.doubleValue);
        return n2 < r2 ? -1 : n2 > r2 ? 1 : n2 === r2 ? 0 : (
          // one or both are NaN.
          isNaN(n2) ? isNaN(r2) ? 0 : -1 : 1
        );
      }(t2, e);
    case 3:
      return pt(t2.timestampValue, e.timestampValue);
    case 4:
      return pt(ot(t2), ot(e));
    case 5:
      return q2(t2.stringValue, e.stringValue);
    case 6:
      return function(t3, e2) {
        var n2 = nt(t3), r2 = nt(e2);
        return n2.compareTo(r2);
      }(t2.bytesValue, e.bytesValue);
    case 7:
      return function(t3, e2) {
        for (var n2 = t3.split("/"), r2 = e2.split("/"), i = 0; i < n2.length && i < r2.length; i++) {
          var o = q2(n2[i], r2[i]);
          if (0 !== o) return o;
        }
        return q2(n2.length, r2.length);
      }(t2.referenceValue, e.referenceValue);
    case 8:
      return function(t3, e2) {
        var n2 = q2(et(t3.latitude), et(e2.latitude));
        return 0 !== n2 ? n2 : q2(et(t3.longitude), et(e2.longitude));
      }(t2.geoPointValue, e.geoPointValue);
    case 9:
      return function(t3, e2) {
        for (var n2 = t3.values || [], r2 = e2.values || [], i = 0; i < n2.length && i < r2.length; ++i) {
          var o = dt(n2[i], r2[i]);
          if (o) return o;
        }
        return q2(n2.length, r2.length);
      }(t2.arrayValue, e.arrayValue);
    case 10:
      return function(t3, e2) {
        var n2 = t3.fields || {}, r2 = Object.keys(n2), i = e2.fields || {}, o = Object.keys(i);
        r2.sort(), o.sort();
        for (var s = 0; s < r2.length && s < o.length; ++s) {
          var u = q2(r2[s], o[s]);
          if (0 !== u) return u;
          var a = dt(n2[r2[s]], i[o[s]]);
          if (0 !== a) return a;
        }
        return q2(r2.length, o.length);
      }(t2.mapValue, e.mapValue);
    default:
      throw O2();
  }
}
function pt(t2, e) {
  if ("string" == typeof t2 && "string" == typeof e && t2.length === e.length) return q2(t2, e);
  var n = tt(t2), r = tt(e), i = q2(n.seconds, r.seconds);
  return 0 !== i ? i : q2(n.nanos, r.nanos);
}
function yt(t2) {
  return vt(t2);
}
function vt(t2) {
  return "nullValue" in t2 ? "null" : "booleanValue" in t2 ? "" + t2.booleanValue : "integerValue" in t2 ? "" + t2.integerValue : "doubleValue" in t2 ? "" + t2.doubleValue : "timestampValue" in t2 ? function(t3) {
    var e2 = tt(t3);
    return "time(" + e2.seconds + "," + e2.nanos + ")";
  }(t2.timestampValue) : "stringValue" in t2 ? t2.stringValue : "bytesValue" in t2 ? nt(t2.bytesValue).toBase64() : "referenceValue" in t2 ? (n = t2.referenceValue, ct.fromName(n).toString()) : "geoPointValue" in t2 ? "geo(" + (e = t2.geoPointValue).latitude + "," + e.longitude + ")" : "arrayValue" in t2 ? function(t3) {
    for (var e2 = "[", n2 = true, r = 0, i = t3.values || []; r < i.length; r++) {
      n2 ? n2 = false : e2 += ",", e2 += vt(i[r]);
    }
    return e2 + "]";
  }(t2.arrayValue) : "mapValue" in t2 ? function(t3) {
    for (var e2 = "{", n2 = true, r = 0, i = Object.keys(t3.fields || {}).sort(); r < i.length; r++) {
      var o = i[r];
      n2 ? n2 = false : e2 += ",", e2 += o + ":" + vt(t3.fields[o]);
    }
    return e2 + "}";
  }(t2.mapValue) : O2();
  var e, n;
}
function mt(t2, e) {
  return {
    referenceValue: "projects/" + t2.projectId + "/databases/" + t2.database + "/documents/" + e.path.canonicalString()
  };
}
function gt(t2) {
  return !!t2 && "integerValue" in t2;
}
function wt(t2) {
  return !!t2 && "arrayValue" in t2;
}
function bt(t2) {
  return !!t2 && "nullValue" in t2;
}
function It(t2) {
  return !!t2 && "doubleValue" in t2 && isNaN(Number(t2.doubleValue));
}
function Tt(t2) {
  return !!t2 && "mapValue" in t2;
}
function _t(t2) {
  if (t2.geoPointValue) return {
    geoPointValue: Object.assign({}, t2.geoPointValue)
  };
  if (t2.timestampValue && "object" == typeof t2.timestampValue) return {
    timestampValue: Object.assign({}, t2.timestampValue)
  };
  if (t2.mapValue) {
    var e = {
      mapValue: {
        fields: {}
      }
    };
    return Q2(t2.mapValue.fields, function(t3, n2) {
      return e.mapValue.fields[t3] = _t(n2);
    }), e;
  }
  if (t2.arrayValue) {
    for (var n = {
      arrayValue: {
        values: []
      }
    }, r = 0; r < (t2.arrayValue.values || []).length; ++r) n.arrayValue.values[r] = _t(t2.arrayValue.values[r]);
    return n;
  }
  return Object.assign({}, t2);
}
var Et = (
  /** @class */
  function() {
    function t2(t3) {
      this.value = t3;
    }
    return t2.empty = function() {
      return new t2({
        mapValue: {}
      });
    }, /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */
    t2.prototype.field = function(t3) {
      if (t3.isEmpty()) return this.value;
      for (var e = this.value, n = 0; n < t3.length - 1; ++n) if (!Tt(e = (e.mapValue.fields || {})[t3.get(n)])) return null;
      return (e = (e.mapValue.fields || {})[t3.lastSegment()]) || null;
    }, /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */
    t2.prototype.set = function(t3, e) {
      this.getFieldsMap(t3.popLast())[t3.lastSegment()] = _t(e);
    }, /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */
    t2.prototype.setAll = function(t3) {
      var e = this, n = $.emptyPath(), r = {}, i = [];
      t3.forEach(function(t4, o2) {
        if (!n.isImmediateParentOf(o2)) {
          var s = e.getFieldsMap(n);
          e.applyChanges(s, r, i), r = {}, i = [], n = o2.popLast();
        }
        t4 ? r[o2.lastSegment()] = _t(t4) : i.push(o2.lastSegment());
      });
      var o = this.getFieldsMap(n);
      this.applyChanges(o, r, i);
    }, /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */
    t2.prototype.delete = function(t3) {
      var e = this.field(t3.popLast());
      Tt(e) && e.mapValue.fields && delete e.mapValue.fields[t3.lastSegment()];
    }, t2.prototype.isEqual = function(t3) {
      return ft(this.value, t3.value);
    }, /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */
    t2.prototype.getFieldsMap = function(t3) {
      var e = this.value;
      e.mapValue.fields || (e.mapValue = {
        fields: {}
      });
      for (var n = 0; n < t3.length; ++n) {
        var r = e.mapValue.fields[t3.get(n)];
        Tt(r) && r.mapValue.fields || (r = {
          mapValue: {
            fields: {}
          }
        }, e.mapValue.fields[t3.get(n)] = r), e = r;
      }
      return e.mapValue.fields;
    }, /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */
    t2.prototype.applyChanges = function(t3, e, n) {
      Q2(e, function(e2, n2) {
        return t3[e2] = n2;
      });
      for (var r = 0, i = n; r < i.length; r++) {
        var o = i[r];
        delete t3[o];
      }
    }, t2.prototype.clone = function() {
      return new t2(_t(this.value));
    }, t2;
  }()
);
function St(t2) {
  var e = [];
  return Q2(t2.fields, function(t3, n) {
    var r = new $([t3]);
    if (Tt(n)) {
      var i = St(n.mapValue).fields;
      if (0 === i.length)
        e.push(r);
      else
        for (var o = 0, s = i; o < s.length; o++) {
          var u = s[o];
          e.push(r.child(u));
        }
    } else
      e.push(r);
  }), new X2(e);
}
var Nt = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i) {
      this.key = t3, this.documentType = e, this.version = n, this.data = r, this.documentState = i;
    }
    return t2.newInvalidDocument = function(e) {
      return new t2(
        e,
        0,
        K2.min(),
        Et.empty(),
        0
        /* SYNCED */
      );
    }, /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */
    t2.newFoundDocument = function(e, n, r) {
      return new t2(
        e,
        1,
        n,
        r,
        0
        /* SYNCED */
      );
    }, /** Creates a new document that is known to not exist at the given version. */
    t2.newNoDocument = function(e, n) {
      return new t2(
        e,
        2,
        n,
        Et.empty(),
        0
        /* SYNCED */
      );
    }, /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t2.newUnknownDocument = function(e, n) {
      return new t2(
        e,
        3,
        n,
        Et.empty(),
        2
        /* HAS_COMMITTED_MUTATIONS */
      );
    }, /**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */
    t2.prototype.convertToFoundDocument = function(t3, e) {
      return this.version = t3, this.documentType = 1, this.data = e, this.documentState = 0, this;
    }, /**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */
    t2.prototype.convertToNoDocument = function(t3) {
      return this.version = t3, this.documentType = 2, this.data = Et.empty(), this.documentState = 0, this;
    }, /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t2.prototype.convertToUnknownDocument = function(t3) {
      return this.version = t3, this.documentType = 3, this.data = Et.empty(), this.documentState = 2, this;
    }, t2.prototype.setHasCommittedMutations = function() {
      return this.documentState = 2, this;
    }, t2.prototype.setHasLocalMutations = function() {
      return this.documentState = 1, this;
    }, Object.defineProperty(t2.prototype, "hasLocalMutations", {
      get: function() {
        return 1 === this.documentState;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "hasCommittedMutations", {
      get: function() {
        return 2 === this.documentState;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "hasPendingWrites", {
      get: function() {
        return this.hasLocalMutations || this.hasCommittedMutations;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.isValidDocument = function() {
      return 0 !== this.documentType;
    }, t2.prototype.isFoundDocument = function() {
      return 1 === this.documentType;
    }, t2.prototype.isNoDocument = function() {
      return 2 === this.documentType;
    }, t2.prototype.isUnknownDocument = function() {
      return 3 === this.documentType;
    }, t2.prototype.isEqual = function(e) {
      return e instanceof t2 && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data);
    }, t2.prototype.clone = function() {
      return new t2(this.key, this.documentType, this.version, this.data.clone(), this.documentState);
    }, t2.prototype.toString = function() {
      return "Document(" + this.key + ", " + this.version + ", " + JSON.stringify(this.data.value) + ", {documentType: " + this.documentType + "}), {documentState: " + this.documentState + "})";
    }, t2;
  }()
);
var Dt = function(t2, e, n, r, i, o, s) {
  void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), void 0 === i && (i = null), void 0 === o && (o = null), void 0 === s && (s = null), this.path = t2, this.collectionGroup = e, this.orderBy = n, this.filters = r, this.limit = i, this.startAt = o, this.endAt = s, this.h = null;
};
function At(t2, e, n, r, i, o, s) {
  return void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), void 0 === i && (i = null), void 0 === o && (o = null), void 0 === s && (s = null), new Dt(t2, e, n, r, i, o, s);
}
function kt(t2) {
  var e = F2(t2);
  if (null === e.h) {
    var n = e.path.canonicalString();
    null !== e.collectionGroup && (n += "|cg:" + e.collectionGroup), n += "|f:", n += e.filters.map(function(t3) {
      return function(t4) {
        return t4.field.canonicalString() + t4.op.toString() + yt(t4.value);
      }(t3);
    }).join(","), n += "|ob:", n += e.orderBy.map(function(t3) {
      return function(t4) {
        return t4.field.canonicalString() + t4.dir;
      }(t3);
    }).join(","), st(e.limit) || (n += "|l:", n += e.limit), e.startAt && (n += "|lb:", n += jt(e.startAt)), e.endAt && (n += "|ub:", n += jt(e.endAt)), e.h = n;
  }
  return e.h;
}
function Ct(t2, e) {
  if (t2.limit !== e.limit) return false;
  if (t2.orderBy.length !== e.orderBy.length) return false;
  for (var n = 0; n < t2.orderBy.length; n++) if (!Gt(t2.orderBy[n], e.orderBy[n])) return false;
  if (t2.filters.length !== e.filters.length) return false;
  for (var r = 0; r < t2.filters.length; r++) if (i = t2.filters[r], o = e.filters[r], i.op !== o.op || !i.field.isEqual(o.field) || !ft(i.value, o.value)) return false;
  var i, o;
  return t2.collectionGroup === e.collectionGroup && !!t2.path.isEqual(e.path) && !!zt(t2.startAt, e.startAt) && zt(t2.endAt, e.endAt);
}
function xt(t2) {
  return ct.isDocumentKey(t2.path) && null === t2.collectionGroup && 0 === t2.filters.length;
}
var Rt = (
  /** @class */
  function(e) {
    function n(t2, n2, r) {
      var i = this;
      return (i = e.call(this) || this).field = t2, i.op = n2, i.value = r, i;
    }
    return __extends(n, e), n.create = function(t2, e2, r) {
      return t2.isKeyField() ? "in" === e2 || "not-in" === e2 ? this.l(t2, e2, r) : new Lt(t2, e2, r) : "array-contains" === e2 ? new Mt(t2, r) : "in" === e2 ? new Vt(t2, r) : "not-in" === e2 ? new qt(t2, r) : "array-contains-any" === e2 ? new Ut(t2, r) : new n(t2, e2, r);
    }, n.l = function(t2, e2, n2) {
      return "in" === e2 ? new Ot(t2, n2) : new Pt(t2, n2);
    }, n.prototype.matches = function(t2) {
      var e2 = t2.data.field(this.field);
      return "!=" === this.op ? null !== e2 && this.m(dt(e2, this.value)) : null !== e2 && ht(this.value) === ht(e2) && this.m(dt(e2, this.value));
    }, n.prototype.m = function(t2) {
      switch (this.op) {
        case "<":
          return t2 < 0;
        case "<=":
          return t2 <= 0;
        case "==":
          return 0 === t2;
        case "!=":
          return 0 !== t2;
        case ">":
          return t2 > 0;
        case ">=":
          return t2 >= 0;
        default:
          return O2();
      }
    }, n.prototype.g = function() {
      return [
        "<",
        "<=",
        ">",
        ">=",
        "!=",
        "not-in"
        /* NOT_IN */
      ].indexOf(this.op) >= 0;
    }, n;
  }(function() {
  })
);
var Lt = (
  /** @class */
  function(e) {
    function n(t2, n2, r) {
      var i = this;
      return (i = e.call(this, t2, n2, r) || this).key = ct.fromName(r.referenceValue), i;
    }
    return __extends(n, e), n.prototype.matches = function(t2) {
      var e2 = ct.comparator(t2.key, this.key);
      return this.m(e2);
    }, n;
  }(Rt)
);
var Ot = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, t2, "in", n2) || this).keys = Ft("in", n2), r;
    }
    return __extends(n, e), n.prototype.matches = function(t2) {
      return this.keys.some(function(e2) {
        return e2.isEqual(t2.key);
      });
    }, n;
  }(Rt)
);
var Pt = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, t2, "not-in", n2) || this).keys = Ft("not-in", n2), r;
    }
    return __extends(n, e), n.prototype.matches = function(t2) {
      return !this.keys.some(function(e2) {
        return e2.isEqual(t2.key);
      });
    }, n;
  }(Rt)
);
function Ft(t2, e) {
  var n;
  return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map(function(t3) {
    return ct.fromName(t3.referenceValue);
  });
}
var Mt = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      return e.call(this, t2, "array-contains", n2) || this;
    }
    return __extends(n, e), n.prototype.matches = function(t2) {
      var e2 = t2.data.field(this.field);
      return wt(e2) && lt(e2.arrayValue, this.value);
    }, n;
  }(Rt)
);
var Vt = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      return e.call(this, t2, "in", n2) || this;
    }
    return __extends(n, e), n.prototype.matches = function(t2) {
      var e2 = t2.data.field(this.field);
      return null !== e2 && lt(this.value.arrayValue, e2);
    }, n;
  }(Rt)
);
var qt = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      return e.call(this, t2, "not-in", n2) || this;
    }
    return __extends(n, e), n.prototype.matches = function(t2) {
      if (lt(this.value.arrayValue, {
        nullValue: "NULL_VALUE"
      })) return false;
      var e2 = t2.data.field(this.field);
      return null !== e2 && !lt(this.value.arrayValue, e2);
    }, n;
  }(Rt)
);
var Ut = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      return e.call(this, t2, "array-contains-any", n2) || this;
    }
    return __extends(n, e), n.prototype.matches = function(t2) {
      var e2 = this, n2 = t2.data.field(this.field);
      return !(!wt(n2) || !n2.arrayValue.values) && n2.arrayValue.values.some(function(t3) {
        return lt(e2.value.arrayValue, t3);
      });
    }, n;
  }(Rt)
);
var Bt = function(t2, e) {
  this.position = t2, this.before = e;
};
function jt(t2) {
  return (t2.before ? "b" : "a") + ":" + t2.position.map(function(t3) {
    return yt(t3);
  }).join(",");
}
var Kt = function(t2, e) {
  void 0 === e && (e = "asc"), this.field = t2, this.dir = e;
};
function Gt(t2, e) {
  return t2.dir === e.dir && t2.field.isEqual(e.field);
}
function Qt(t2, e, n) {
  for (var r = 0, i = 0; i < t2.position.length; i++) {
    var o = e[i], s = t2.position[i];
    if (r = o.field.isKeyField() ? ct.comparator(ct.fromName(s.referenceValue), n.key) : dt(s, n.data.field(o.field)), "desc" === o.dir && (r *= -1), 0 !== r) break;
  }
  return t2.before ? r <= 0 : r < 0;
}
function zt(t2, e) {
  if (null === t2) return null === e;
  if (null === e) return false;
  if (t2.before !== e.before || t2.position.length !== e.position.length) return false;
  for (var n = 0; n < t2.position.length; n++) if (!ft(t2.position[n], e.position[n])) return false;
  return true;
}
var Wt = (
  /**
       * Initializes a Query with a path and optional additional query constraints.
       * Path must currently be empty if this is a collection group query.
       */
  function(t2, e, n, r, i, o, s, u) {
    void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), void 0 === i && (i = null), void 0 === o && (o = "F"), void 0 === s && (s = null), void 0 === u && (u = null), this.path = t2, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = r, this.limit = i, this.limitType = o, this.startAt = s, this.endAt = u, this.p = null, // The corresponding `Target` of this `Query` instance.
    this.T = null, this.startAt, this.endAt;
  }
);
function Ht(t2, e, n, r, i, o, s, u) {
  return new Wt(t2, e, n, r, i, o, s, u);
}
function Yt(t2) {
  return new Wt(t2);
}
function $t(t2) {
  return !st(t2.limit) && "F" === t2.limitType;
}
function Xt(t2) {
  return !st(t2.limit) && "L" === t2.limitType;
}
function Jt(t2) {
  return t2.explicitOrderBy.length > 0 ? t2.explicitOrderBy[0].field : null;
}
function Zt(t2) {
  for (var e = 0, n = t2.filters; e < n.length; e++) {
    var r = n[e];
    if (r.g()) return r.field;
  }
  return null;
}
function te(t2) {
  return null !== t2.collectionGroup;
}
function ee(t2) {
  var e = F2(t2);
  if (null === e.p) {
    e.p = [];
    var n = Zt(e), r = Jt(e);
    if (null !== n && null === r)
      n.isKeyField() || e.p.push(new Kt(n)), e.p.push(new Kt(
        $.keyField(),
        "asc"
        /* ASCENDING */
      ));
    else {
      for (var i = false, o = 0, s = e.explicitOrderBy; o < s.length; o++) {
        var u = s[o];
        e.p.push(u), u.field.isKeyField() && (i = true);
      }
      if (!i) {
        var a = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc";
        e.p.push(new Kt($.keyField(), a));
      }
    }
  }
  return e.p;
}
function ne(t2) {
  var e = F2(t2);
  if (!e.T) if ("F" === e.limitType) e.T = At(e.path, e.collectionGroup, ee(e), e.filters, e.limit, e.startAt, e.endAt);
  else {
    for (var n = [], r = 0, i = ee(e); r < i.length; r++) {
      var o = i[r], s = "desc" === o.dir ? "asc" : "desc";
      n.push(new Kt(o.field, s));
    }
    var u = e.endAt ? new Bt(e.endAt.position, !e.endAt.before) : null, a = e.startAt ? new Bt(e.startAt.position, !e.startAt.before) : null;
    e.T = At(e.path, e.collectionGroup, n, e.filters, e.limit, u, a);
  }
  return e.T;
}
function re(t2, e, n) {
  return new Wt(t2.path, t2.collectionGroup, t2.explicitOrderBy.slice(), t2.filters.slice(), e, n, t2.startAt, t2.endAt);
}
function ie(t2, e) {
  return Ct(ne(t2), ne(e)) && t2.limitType === e.limitType;
}
function oe(t2) {
  return kt(ne(t2)) + "|lt:" + t2.limitType;
}
function se(t2) {
  return "Query(target=" + function(t3) {
    var e = t3.path.canonicalString();
    return null !== t3.collectionGroup && (e += " collectionGroup=" + t3.collectionGroup), t3.filters.length > 0 && (e += ", filters: [" + t3.filters.map(function(t4) {
      return (e2 = t4).field.canonicalString() + " " + e2.op + " " + yt(e2.value);
      var e2;
    }).join(", ") + "]"), st(t3.limit) || (e += ", limit: " + t3.limit), t3.orderBy.length > 0 && (e += ", orderBy: [" + t3.orderBy.map(function(t4) {
      return function(t5) {
        return t5.field.canonicalString() + " (" + t5.dir + ")";
      }(t4);
    }).join(", ") + "]"), t3.startAt && (e += ", startAt: " + jt(t3.startAt)), t3.endAt && (e += ", endAt: " + jt(t3.endAt)), "Target(" + e + ")";
  }(ne(t2)) + "; limitType=" + t2.limitType + ")";
}
function ue(t2, e) {
  return e.isFoundDocument() && function(t3, e2) {
    var n = e2.key.path;
    return null !== t3.collectionGroup ? e2.key.hasCollectionId(t3.collectionGroup) && t3.path.isPrefixOf(n) : ct.isDocumentKey(t3.path) ? t3.path.isEqual(n) : t3.path.isImmediateParentOf(n);
  }(t2, e) && function(t3, e2) {
    for (var n = 0, r = t3.explicitOrderBy; n < r.length; n++) {
      var i = r[n];
      if (!i.field.isKeyField() && null === e2.data.field(i.field)) return false;
    }
    return true;
  }(t2, e) && function(t3, e2) {
    for (var n = 0, r = t3.filters; n < r.length; n++) {
      if (!r[n].matches(e2)) return false;
    }
    return true;
  }(t2, e) && function(t3, e2) {
    return !(t3.startAt && !Qt(t3.startAt, ee(t3), e2)) && (!t3.endAt || !Qt(t3.endAt, ee(t3), e2));
  }(t2, e);
}
function ae(t2) {
  return function(e, n) {
    for (var r = false, i = 0, o = ee(t2); i < o.length; i++) {
      var s = o[i], u = ce(s, e, n);
      if (0 !== u) return u;
      r = r || s.field.isKeyField();
    }
    return 0;
  };
}
function ce(t2, e, n) {
  var r = t2.field.isKeyField() ? ct.comparator(e.key, n.key) : function(t3, e2, n2) {
    var r2 = e2.data.field(t3), i = n2.data.field(t3);
    return null !== r2 && null !== i ? dt(r2, i) : O2();
  }(t2.field, e, n);
  switch (t2.dir) {
    case "asc":
      return r;
    case "desc":
      return -1 * r;
    default:
      return O2();
  }
}
function he(t2, e) {
  if (t2.I) {
    if (isNaN(e)) return {
      doubleValue: "NaN"
    };
    if (e === 1 / 0) return {
      doubleValue: "Infinity"
    };
    if (e === -1 / 0) return {
      doubleValue: "-Infinity"
    };
  }
  return {
    doubleValue: ut(e) ? "-0" : e
  };
}
function fe(t2) {
  return {
    integerValue: "" + t2
  };
}
function le(t2, e) {
  return at(e) ? fe(e) : he(t2, e);
}
var de = function() {
  this._ = void 0;
};
function pe(t2, e, n) {
  return t2 instanceof me ? function(t3, e2) {
    var n2 = {
      fields: {
        __type__: {
          stringValue: "server_timestamp"
        },
        __local_write_time__: {
          timestampValue: {
            seconds: t3.seconds,
            nanos: t3.nanoseconds
          }
        }
      }
    };
    return e2 && (n2.fields.__previous_value__ = e2), {
      mapValue: n2
    };
  }(n, e) : t2 instanceof ge ? we(t2, e) : t2 instanceof be ? Ie(t2, e) : function(t3, e2) {
    var n2 = ve(t3, e2), r = _e(n2) + _e(t3.A);
    return gt(n2) && gt(t3.A) ? fe(r) : he(t3.R, r);
  }(t2, e);
}
function ye(t2, e, n) {
  return t2 instanceof ge ? we(t2, e) : t2 instanceof be ? Ie(t2, e) : n;
}
function ve(t2, e) {
  return t2 instanceof Te ? gt(n = e) || function(t3) {
    return !!t3 && "doubleValue" in t3;
  }(n) ? e : {
    integerValue: 0
  } : null;
  var n;
}
var me = (
  /** @class */
  function(e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return __extends(n, e), n;
  }(de)
);
var ge = (
  /** @class */
  function(e) {
    function n(t2) {
      var n2 = this;
      return (n2 = e.call(this) || this).elements = t2, n2;
    }
    return __extends(n, e), n;
  }(de)
);
function we(t2, e) {
  for (var n = Ee(e), r = function(t3) {
    n.some(function(e2) {
      return ft(e2, t3);
    }) || n.push(t3);
  }, i = 0, o = t2.elements; i < o.length; i++) {
    r(o[i]);
  }
  return {
    arrayValue: {
      values: n
    }
  };
}
var be = (
  /** @class */
  function(e) {
    function n(t2) {
      var n2 = this;
      return (n2 = e.call(this) || this).elements = t2, n2;
    }
    return __extends(n, e), n;
  }(de)
);
function Ie(t2, e) {
  for (var n = Ee(e), r = function(t3) {
    n = n.filter(function(e2) {
      return !ft(e2, t3);
    });
  }, i = 0, o = t2.elements; i < o.length; i++) {
    r(o[i]);
  }
  return {
    arrayValue: {
      values: n
    }
  };
}
var Te = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this) || this).R = t2, r.A = n2, r;
    }
    return __extends(n, e), n;
  }(de)
);
function _e(t2) {
  return et(t2.integerValue || t2.doubleValue);
}
function Ee(t2) {
  return wt(t2) && t2.arrayValue.values ? t2.arrayValue.values.slice() : [];
}
var Se = function(t2, e) {
  this.field = t2, this.transform = e;
};
var Ne = function(t2, e) {
  this.version = t2, this.transformResults = e;
};
var De = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.updateTime = t3, this.exists = e;
    }
    return t2.none = function() {
      return new t2();
    }, /** Creates a new Precondition with an exists flag. */
    t2.exists = function(e) {
      return new t2(void 0, e);
    }, /** Creates a new Precondition based on a version a document exists at. */
    t2.updateTime = function(e) {
      return new t2(e);
    }, Object.defineProperty(t2.prototype, "isNone", {
      /** Returns whether this Precondition is empty. */
      get: function() {
        return void 0 === this.updateTime && void 0 === this.exists;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.isEqual = function(t3) {
      return this.exists === t3.exists && (this.updateTime ? !!t3.updateTime && this.updateTime.isEqual(t3.updateTime) : !t3.updateTime);
    }, t2;
  }()
);
function Ae(t2, e) {
  return void 0 !== t2.updateTime ? e.isFoundDocument() && e.version.isEqual(t2.updateTime) : void 0 === t2.exists || t2.exists === e.isFoundDocument();
}
var ke = function() {
};
function Ce(t2, e, n) {
  t2 instanceof Pe ? function(t3, e2, n2) {
    var r = t3.value.clone(), i = Ve(t3.fieldTransforms, e2, n2.transformResults);
    r.setAll(i), e2.convertToFoundDocument(n2.version, r).setHasCommittedMutations();
  }(t2, e, n) : t2 instanceof Fe ? function(t3, e2, n2) {
    if (Ae(t3.precondition, e2)) {
      var r = Ve(t3.fieldTransforms, e2, n2.transformResults), i = e2.data;
      i.setAll(Me(t3)), i.setAll(r), e2.convertToFoundDocument(n2.version, i).setHasCommittedMutations();
    } else e2.convertToUnknownDocument(n2.version);
  }(t2, e, n) : function(t3, e2, n2) {
    e2.convertToNoDocument(n2.version).setHasCommittedMutations();
  }(0, e, n);
}
function xe(t2, e, n) {
  t2 instanceof Pe ? function(t3, e2, n2) {
    if (Ae(t3.precondition, e2)) {
      var r = t3.value.clone(), i = qe(t3.fieldTransforms, n2, e2);
      r.setAll(i), e2.convertToFoundDocument(Oe(e2), r).setHasLocalMutations();
    }
  }(t2, e, n) : t2 instanceof Fe ? function(t3, e2, n2) {
    if (Ae(t3.precondition, e2)) {
      var r = qe(t3.fieldTransforms, n2, e2), i = e2.data;
      i.setAll(Me(t3)), i.setAll(r), e2.convertToFoundDocument(Oe(e2), i).setHasLocalMutations();
    }
  }(t2, e, n) : function(t3, e2) {
    Ae(t3.precondition, e2) && // We don't call `setHasLocalMutations()` since we want to be backwards
    // compatible with the existing SDK behavior.
    e2.convertToNoDocument(K2.min());
  }(t2, e);
}
function Re(t2, e) {
  for (var n = null, r = 0, i = t2.fieldTransforms; r < i.length; r++) {
    var o = i[r], s = e.data.field(o.field), u = ve(o.transform, s || null);
    null != u && (null == n && (n = Et.empty()), n.set(o.field, u));
  }
  return n || null;
}
function Le(t2, e) {
  return t2.type === e.type && !!t2.key.isEqual(e.key) && !!t2.precondition.isEqual(e.precondition) && !!function(t3, e2) {
    return void 0 === t3 && void 0 === e2 || !(!t3 || !e2) && U2(t3, e2, function(t4, e3) {
      return function(t5, e4) {
        return t5.field.isEqual(e4.field) && function(t6, e5) {
          return t6 instanceof ge && e5 instanceof ge || t6 instanceof be && e5 instanceof be ? U2(t6.elements, e5.elements, ft) : t6 instanceof Te && e5 instanceof Te ? ft(t6.A, e5.A) : t6 instanceof me && e5 instanceof me;
        }(t5.transform, e4.transform);
      }(t4, e3);
    });
  }(t2.fieldTransforms, e.fieldTransforms) && (0 === t2.type ? t2.value.isEqual(e.value) : 1 !== t2.type || t2.data.isEqual(e.data) && t2.fieldMask.isEqual(e.fieldMask));
}
function Oe(t2) {
  return t2.isFoundDocument() ? t2.version : K2.min();
}
var Pe = (
  /** @class */
  function(e) {
    function n(t2, n2, r, i) {
      void 0 === i && (i = []);
      var o = this;
      return (o = e.call(this) || this).key = t2, o.value = n2, o.precondition = r, o.fieldTransforms = i, o.type = 0, o;
    }
    return __extends(n, e), n;
  }(ke)
);
var Fe = (
  /** @class */
  function(e) {
    function n(t2, n2, r, i, o) {
      void 0 === o && (o = []);
      var s = this;
      return (s = e.call(this) || this).key = t2, s.data = n2, s.fieldMask = r, s.precondition = i, s.fieldTransforms = o, s.type = 1, s;
    }
    return __extends(n, e), n;
  }(ke)
);
function Me(t2) {
  var e = /* @__PURE__ */ new Map();
  return t2.fieldMask.fields.forEach(function(n) {
    if (!n.isEmpty()) {
      var r = t2.data.field(n);
      e.set(n, r);
    }
  }), e;
}
function Ve(t2, e, n) {
  var r = /* @__PURE__ */ new Map();
  P2(t2.length === n.length);
  for (var i = 0; i < n.length; i++) {
    var o = t2[i], s = o.transform, u = e.data.field(o.field);
    r.set(o.field, ye(s, u, n[i]));
  }
  return r;
}
function qe(t2, e, n) {
  for (var r = /* @__PURE__ */ new Map(), i = 0, o = t2; i < o.length; i++) {
    var s = o[i], u = s.transform, a = n.data.field(s.field);
    r.set(s.field, pe(u, a, e));
  }
  return r;
}
var Ue;
var Be;
var je = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this) || this).key = t2, r.precondition = n2, r.type = 2, r.fieldTransforms = [], r;
    }
    return __extends(n, e), n;
  }(ke)
);
var Ke = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this) || this).key = t2, r.precondition = n2, r.type = 3, r.fieldTransforms = [], r;
    }
    return __extends(n, e), n;
  }(ke)
);
var Ge = (
  // TODO(b/33078163): just use simplest form of existence filter for now
  function(t2) {
    this.count = t2;
  }
);
function Qe(t2) {
  switch (t2) {
    case N2.OK:
      return O2();
    case N2.CANCELLED:
    case N2.UNKNOWN:
    case N2.DEADLINE_EXCEEDED:
    case N2.RESOURCE_EXHAUSTED:
    case N2.INTERNAL:
    case N2.UNAVAILABLE:
    // Unauthenticated means something went wrong with our token and we need
    // to retry with new credentials which will happen automatically.
    case N2.UNAUTHENTICATED:
      return false;
    case N2.INVALID_ARGUMENT:
    case N2.NOT_FOUND:
    case N2.ALREADY_EXISTS:
    case N2.PERMISSION_DENIED:
    case N2.FAILED_PRECONDITION:
    // Aborted might be retried in some scenarios, but that is dependant on
    // the context and should handled individually by the calling code.
    // See https://cloud.google.com/apis/design/errors.
    case N2.ABORTED:
    case N2.OUT_OF_RANGE:
    case N2.UNIMPLEMENTED:
    case N2.DATA_LOSS:
      return true;
    default:
      return O2();
  }
}
function ze(t2) {
  if (void 0 === t2)
    return x2("GRPC error has no .code"), N2.UNKNOWN;
  switch (t2) {
    case Ue.OK:
      return N2.OK;
    case Ue.CANCELLED:
      return N2.CANCELLED;
    case Ue.UNKNOWN:
      return N2.UNKNOWN;
    case Ue.DEADLINE_EXCEEDED:
      return N2.DEADLINE_EXCEEDED;
    case Ue.RESOURCE_EXHAUSTED:
      return N2.RESOURCE_EXHAUSTED;
    case Ue.INTERNAL:
      return N2.INTERNAL;
    case Ue.UNAVAILABLE:
      return N2.UNAVAILABLE;
    case Ue.UNAUTHENTICATED:
      return N2.UNAUTHENTICATED;
    case Ue.INVALID_ARGUMENT:
      return N2.INVALID_ARGUMENT;
    case Ue.NOT_FOUND:
      return N2.NOT_FOUND;
    case Ue.ALREADY_EXISTS:
      return N2.ALREADY_EXISTS;
    case Ue.PERMISSION_DENIED:
      return N2.PERMISSION_DENIED;
    case Ue.FAILED_PRECONDITION:
      return N2.FAILED_PRECONDITION;
    case Ue.ABORTED:
      return N2.ABORTED;
    case Ue.OUT_OF_RANGE:
      return N2.OUT_OF_RANGE;
    case Ue.UNIMPLEMENTED:
      return N2.UNIMPLEMENTED;
    case Ue.DATA_LOSS:
      return N2.DATA_LOSS;
    default:
      return O2();
  }
}
(Be = Ue || (Ue = {}))[Be.OK = 0] = "OK", Be[Be.CANCELLED = 1] = "CANCELLED", Be[Be.UNKNOWN = 2] = "UNKNOWN", Be[Be.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", Be[Be.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Be[Be.NOT_FOUND = 5] = "NOT_FOUND", Be[Be.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Be[Be.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", Be[Be.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Be[Be.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", Be[Be.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Be[Be.ABORTED = 10] = "ABORTED", Be[Be.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Be[Be.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", Be[Be.INTERNAL = 13] = "INTERNAL", Be[Be.UNAVAILABLE = 14] = "UNAVAILABLE", Be[Be.DATA_LOSS = 15] = "DATA_LOSS";
var We = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.comparator = t3, this.root = e || Ye.EMPTY;
    }
    return t2.prototype.insert = function(e, n) {
      return new t2(this.comparator, this.root.insert(e, n, this.comparator).copy(null, null, Ye.BLACK, null, null));
    }, // Returns a copy of the map, with the specified key removed.
    t2.prototype.remove = function(e) {
      return new t2(this.comparator, this.root.remove(e, this.comparator).copy(null, null, Ye.BLACK, null, null));
    }, // Returns the value of the node with the given key, or null.
    t2.prototype.get = function(t3) {
      for (var e = this.root; !e.isEmpty(); ) {
        var n = this.comparator(t3, e.key);
        if (0 === n) return e.value;
        n < 0 ? e = e.left : n > 0 && (e = e.right);
      }
      return null;
    }, // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    t2.prototype.indexOf = function(t3) {
      for (var e = 0, n = this.root; !n.isEmpty(); ) {
        var r = this.comparator(t3, n.key);
        if (0 === r) return e + n.left.size;
        r < 0 ? n = n.left : (
          // Count all nodes left of the node plus the node itself
          (e += n.left.size + 1, n = n.right)
        );
      }
      return -1;
    }, t2.prototype.isEmpty = function() {
      return this.root.isEmpty();
    }, Object.defineProperty(t2.prototype, "size", {
      // Returns the total number of nodes in the map.
      get: function() {
        return this.root.size;
      },
      enumerable: false,
      configurable: true
    }), // Returns the minimum key in the map.
    t2.prototype.minKey = function() {
      return this.root.minKey();
    }, // Returns the maximum key in the map.
    t2.prototype.maxKey = function() {
      return this.root.maxKey();
    }, // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t2.prototype.inorderTraversal = function(t3) {
      return this.root.inorderTraversal(t3);
    }, t2.prototype.forEach = function(t3) {
      this.inorderTraversal(function(e, n) {
        return t3(e, n), false;
      });
    }, t2.prototype.toString = function() {
      var t3 = [];
      return this.inorderTraversal(function(e, n) {
        return t3.push(e + ":" + n), false;
      }), "{" + t3.join(", ") + "}";
    }, // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t2.prototype.reverseTraversal = function(t3) {
      return this.root.reverseTraversal(t3);
    }, // Returns an iterator over the SortedMap.
    t2.prototype.getIterator = function() {
      return new He(this.root, null, this.comparator, false);
    }, t2.prototype.getIteratorFrom = function(t3) {
      return new He(this.root, t3, this.comparator, false);
    }, t2.prototype.getReverseIterator = function() {
      return new He(this.root, null, this.comparator, true);
    }, t2.prototype.getReverseIteratorFrom = function(t3) {
      return new He(this.root, t3, this.comparator, true);
    }, t2;
  }()
);
var He = (
  /** @class */
  function() {
    function t2(t3, e, n, r) {
      this.isReverse = r, this.nodeStack = [];
      for (var i = 1; !t3.isEmpty(); ) if (i = e ? n(t3.key, e) : 1, // flip the comparison if we're going in reverse
      r && (i *= -1), i < 0)
        t3 = this.isReverse ? t3.left : t3.right;
      else {
        if (0 === i) {
          this.nodeStack.push(t3);
          break;
        }
        this.nodeStack.push(t3), t3 = this.isReverse ? t3.right : t3.left;
      }
    }
    return t2.prototype.getNext = function() {
      var t3 = this.nodeStack.pop(), e = {
        key: t3.key,
        value: t3.value
      };
      if (this.isReverse) for (t3 = t3.left; !t3.isEmpty(); ) this.nodeStack.push(t3), t3 = t3.right;
      else for (t3 = t3.right; !t3.isEmpty(); ) this.nodeStack.push(t3), t3 = t3.left;
      return e;
    }, t2.prototype.hasNext = function() {
      return this.nodeStack.length > 0;
    }, t2.prototype.peek = function() {
      if (0 === this.nodeStack.length) return null;
      var t3 = this.nodeStack[this.nodeStack.length - 1];
      return {
        key: t3.key,
        value: t3.value
      };
    }, t2;
  }()
);
var Ye = (
  /** @class */
  function() {
    function t2(e, n, r, i, o) {
      this.key = e, this.value = n, this.color = null != r ? r : t2.RED, this.left = null != i ? i : t2.EMPTY, this.right = null != o ? o : t2.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    return t2.prototype.copy = function(e, n, r, i, o) {
      return new t2(null != e ? e : this.key, null != n ? n : this.value, null != r ? r : this.color, null != i ? i : this.left, null != o ? o : this.right);
    }, t2.prototype.isEmpty = function() {
      return false;
    }, // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t2.prototype.inorderTraversal = function(t3) {
      return this.left.inorderTraversal(t3) || t3(this.key, this.value) || this.right.inorderTraversal(t3);
    }, // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t2.prototype.reverseTraversal = function(t3) {
      return this.right.reverseTraversal(t3) || t3(this.key, this.value) || this.left.reverseTraversal(t3);
    }, // Returns the minimum node in the tree.
    t2.prototype.min = function() {
      return this.left.isEmpty() ? this : this.left.min();
    }, // Returns the maximum key in the tree.
    t2.prototype.minKey = function() {
      return this.min().key;
    }, // Returns the maximum key in the tree.
    t2.prototype.maxKey = function() {
      return this.right.isEmpty() ? this.key : this.right.maxKey();
    }, // Returns new tree, with the key/value added.
    t2.prototype.insert = function(t3, e, n) {
      var r = this, i = n(t3, r.key);
      return (r = i < 0 ? r.copy(null, null, null, r.left.insert(t3, e, n), null) : 0 === i ? r.copy(null, e, null, null, null) : r.copy(null, null, null, null, r.right.insert(t3, e, n))).fixUp();
    }, t2.prototype.removeMin = function() {
      if (this.left.isEmpty()) return t2.EMPTY;
      var e = this;
      return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), (e = e.copy(null, null, null, e.left.removeMin(), null)).fixUp();
    }, // Returns new tree, with the specified item removed.
    t2.prototype.remove = function(e, n) {
      var r, i = this;
      if (n(e, i.key) < 0) i.left.isEmpty() || i.left.isRed() || i.left.left.isRed() || (i = i.moveRedLeft()), i = i.copy(null, null, null, i.left.remove(e, n), null);
      else {
        if (i.left.isRed() && (i = i.rotateRight()), i.right.isEmpty() || i.right.isRed() || i.right.left.isRed() || (i = i.moveRedRight()), 0 === n(e, i.key)) {
          if (i.right.isEmpty()) return t2.EMPTY;
          r = i.right.min(), i = i.copy(r.key, r.value, null, null, i.right.removeMin());
        }
        i = i.copy(null, null, null, null, i.right.remove(e, n));
      }
      return i.fixUp();
    }, t2.prototype.isRed = function() {
      return this.color;
    }, // Returns new tree after performing any needed rotations.
    t2.prototype.fixUp = function() {
      var t3 = this;
      return t3.right.isRed() && !t3.left.isRed() && (t3 = t3.rotateLeft()), t3.left.isRed() && t3.left.left.isRed() && (t3 = t3.rotateRight()), t3.left.isRed() && t3.right.isRed() && (t3 = t3.colorFlip()), t3;
    }, t2.prototype.moveRedLeft = function() {
      var t3 = this.colorFlip();
      return t3.right.left.isRed() && (t3 = (t3 = (t3 = t3.copy(null, null, null, null, t3.right.rotateRight())).rotateLeft()).colorFlip()), t3;
    }, t2.prototype.moveRedRight = function() {
      var t3 = this.colorFlip();
      return t3.left.left.isRed() && (t3 = (t3 = t3.rotateRight()).colorFlip()), t3;
    }, t2.prototype.rotateLeft = function() {
      var e = this.copy(null, null, t2.RED, null, this.right.left);
      return this.right.copy(null, null, this.color, e, null);
    }, t2.prototype.rotateRight = function() {
      var e = this.copy(null, null, t2.RED, this.left.right, null);
      return this.left.copy(null, null, this.color, null, e);
    }, t2.prototype.colorFlip = function() {
      var t3 = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
      return this.copy(null, null, !this.color, t3, e);
    }, // For testing.
    t2.prototype.checkMaxDepth = function() {
      var t3 = this.check();
      return Math.pow(2, t3) <= this.size + 1;
    }, // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    t2.prototype.check = function() {
      if (this.isRed() && this.left.isRed()) throw O2();
      if (this.right.isRed()) throw O2();
      var t3 = this.left.check();
      if (t3 !== this.right.check()) throw O2();
      return t3 + (this.isRed() ? 0 : 1);
    }, t2;
  }()
);
Ye.EMPTY = null, Ye.RED = true, Ye.BLACK = false, // end LLRBEmptyNode
Ye.EMPTY = new /** @class */
(function() {
  function t2() {
    this.size = 0;
  }
  return Object.defineProperty(t2.prototype, "key", {
    get: function() {
      throw O2();
    },
    enumerable: false,
    configurable: true
  }), Object.defineProperty(t2.prototype, "value", {
    get: function() {
      throw O2();
    },
    enumerable: false,
    configurable: true
  }), Object.defineProperty(t2.prototype, "color", {
    get: function() {
      throw O2();
    },
    enumerable: false,
    configurable: true
  }), Object.defineProperty(t2.prototype, "left", {
    get: function() {
      throw O2();
    },
    enumerable: false,
    configurable: true
  }), Object.defineProperty(t2.prototype, "right", {
    get: function() {
      throw O2();
    },
    enumerable: false,
    configurable: true
  }), // Returns a copy of the current node.
  t2.prototype.copy = function(t3, e, n, r, i) {
    return this;
  }, // Returns a copy of the tree, with the specified key/value added.
  t2.prototype.insert = function(t3, e, n) {
    return new Ye(t3, e);
  }, // Returns a copy of the tree, with the specified key removed.
  t2.prototype.remove = function(t3, e) {
    return this;
  }, t2.prototype.isEmpty = function() {
    return true;
  }, t2.prototype.inorderTraversal = function(t3) {
    return false;
  }, t2.prototype.reverseTraversal = function(t3) {
    return false;
  }, t2.prototype.minKey = function() {
    return null;
  }, t2.prototype.maxKey = function() {
    return null;
  }, t2.prototype.isRed = function() {
    return false;
  }, // For testing.
  t2.prototype.checkMaxDepth = function() {
    return true;
  }, t2.prototype.check = function() {
    return 0;
  }, t2;
}())();
var $e = (
  /** @class */
  function() {
    function t2(t3) {
      this.comparator = t3, this.data = new We(this.comparator);
    }
    return t2.prototype.has = function(t3) {
      return null !== this.data.get(t3);
    }, t2.prototype.first = function() {
      return this.data.minKey();
    }, t2.prototype.last = function() {
      return this.data.maxKey();
    }, Object.defineProperty(t2.prototype, "size", {
      get: function() {
        return this.data.size;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.indexOf = function(t3) {
      return this.data.indexOf(t3);
    }, /** Iterates elements in order defined by "comparator" */
    t2.prototype.forEach = function(t3) {
      this.data.inorderTraversal(function(e, n) {
        return t3(e), false;
      });
    }, /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */
    t2.prototype.forEachInRange = function(t3, e) {
      for (var n = this.data.getIteratorFrom(t3[0]); n.hasNext(); ) {
        var r = n.getNext();
        if (this.comparator(r.key, t3[1]) >= 0) return;
        e(r.key);
      }
    }, /**
     * Iterates over `elem`s such that: start &lt;= elem until false is returned.
     */
    t2.prototype.forEachWhile = function(t3, e) {
      var n;
      for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext(); ) if (!t3(n.getNext().key)) return;
    }, /** Finds the least element greater than or equal to `elem`. */
    t2.prototype.firstAfterOrEqual = function(t3) {
      var e = this.data.getIteratorFrom(t3);
      return e.hasNext() ? e.getNext().key : null;
    }, t2.prototype.getIterator = function() {
      return new Xe(this.data.getIterator());
    }, t2.prototype.getIteratorFrom = function(t3) {
      return new Xe(this.data.getIteratorFrom(t3));
    }, /** Inserts or updates an element */
    t2.prototype.add = function(t3) {
      return this.copy(this.data.remove(t3).insert(t3, true));
    }, /** Deletes an element */
    t2.prototype.delete = function(t3) {
      return this.has(t3) ? this.copy(this.data.remove(t3)) : this;
    }, t2.prototype.isEmpty = function() {
      return this.data.isEmpty();
    }, t2.prototype.unionWith = function(t3) {
      var e = this;
      return e.size < t3.size && (e = t3, t3 = this), t3.forEach(function(t4) {
        e = e.add(t4);
      }), e;
    }, t2.prototype.isEqual = function(e) {
      if (!(e instanceof t2)) return false;
      if (this.size !== e.size) return false;
      for (var n = this.data.getIterator(), r = e.data.getIterator(); n.hasNext(); ) {
        var i = n.getNext().key, o = r.getNext().key;
        if (0 !== this.comparator(i, o)) return false;
      }
      return true;
    }, t2.prototype.toArray = function() {
      var t3 = [];
      return this.forEach(function(e) {
        t3.push(e);
      }), t3;
    }, t2.prototype.toString = function() {
      var t3 = [];
      return this.forEach(function(e) {
        return t3.push(e);
      }), "SortedSet(" + t3.toString() + ")";
    }, t2.prototype.copy = function(e) {
      var n = new t2(this.comparator);
      return n.data = e, n;
    }, t2;
  }()
);
var Xe = (
  /** @class */
  function() {
    function t2(t3) {
      this.iter = t3;
    }
    return t2.prototype.getNext = function() {
      return this.iter.getNext().key;
    }, t2.prototype.hasNext = function() {
      return this.iter.hasNext();
    }, t2;
  }()
);
var Je = new We(ct.comparator);
function Ze() {
  return Je;
}
var tn = new We(ct.comparator);
function en() {
  return tn;
}
var nn = new We(ct.comparator);
function rn() {
  return nn;
}
var on = new $e(ct.comparator);
function sn() {
  for (var t2 = [], e = 0; e < arguments.length; e++) t2[e] = arguments[e];
  for (var n = on, r = 0, i = t2; r < i.length; r++) {
    var o = i[r];
    n = n.add(o);
  }
  return n;
}
var un = new $e(q2);
function an() {
  return un;
}
var cn = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i) {
      this.snapshotVersion = t3, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = r, this.resolvedLimboDocuments = i;
    }
    return t2.createSynthesizedRemoteEventForCurrentChange = function(e, n) {
      var r = /* @__PURE__ */ new Map();
      return r.set(e, hn.createSynthesizedTargetChangeForCurrentChange(e, n)), new t2(K2.min(), r, an(), Ze(), sn());
    }, t2;
  }()
);
var hn = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i) {
      this.resumeToken = t3, this.current = e, this.addedDocuments = n, this.modifiedDocuments = r, this.removedDocuments = i;
    }
    return t2.createSynthesizedTargetChangeForCurrentChange = function(e, n) {
      return new t2(J2.EMPTY_BYTE_STRING, n, sn(), sn(), sn());
    }, t2;
  }()
);
var fn = function(t2, e, n, r) {
  this.v = t2, this.removedTargetIds = e, this.key = n, this.P = r;
};
var ln = function(t2, e) {
  this.targetId = t2, this.V = e;
};
var dn = function(t2, e, n, r) {
  void 0 === n && (n = J2.EMPTY_BYTE_STRING), void 0 === r && (r = null), this.state = t2, this.targetIds = e, this.resumeToken = n, this.cause = r;
};
var pn = (
  /** @class */
  function() {
    function t2() {
      this.S = 0, /**
           * Keeps track of the document changes since the last raised snapshot.
           *
           * These changes are continuously updated as we receive document updates and
           * always reflect the current set of changes against the last issued snapshot.
           */
      this.D = mn(), /** See public getters for explanations of these fields. */
      this.C = J2.EMPTY_BYTE_STRING, this.N = false, /**
           * Whether this target state should be included in the next snapshot. We
           * initialize to true so that newly-added targets are included in the next
           * RemoteEvent.
           */
      this.k = true;
    }
    return Object.defineProperty(t2.prototype, "current", {
      /**
       * Whether this target has been marked 'current'.
       *
       * 'Current' has special meaning in the RPC protocol: It implies that the
       * Watch backend has sent us all changes up to the point at which the target
       * was added and that the target is consistent with the rest of the watch
       * stream.
       */
      get: function() {
        return this.N;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "resumeToken", {
      /** The last resume token sent to us for this target. */
      get: function() {
        return this.C;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "F", {
      /** Whether this target has pending target adds or target removes. */
      get: function() {
        return 0 !== this.S;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "$", {
      /** Whether we have modified any state that should trigger a snapshot. */
      get: function() {
        return this.k;
      },
      enumerable: false,
      configurable: true
    }), /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */
    t2.prototype.O = function(t3) {
      t3.approximateByteSize() > 0 && (this.k = true, this.C = t3);
    }, /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */
    t2.prototype.M = function() {
      var t3 = sn(), e = sn(), n = sn();
      return this.D.forEach(function(r, i) {
        switch (i) {
          case 0:
            t3 = t3.add(r);
            break;
          case 2:
            e = e.add(r);
            break;
          case 1:
            n = n.add(r);
            break;
          default:
            O2();
        }
      }), new hn(this.C, this.N, t3, e, n);
    }, /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    t2.prototype.L = function() {
      this.k = false, this.D = mn();
    }, t2.prototype.B = function(t3, e) {
      this.k = true, this.D = this.D.insert(t3, e);
    }, t2.prototype.q = function(t3) {
      this.k = true, this.D = this.D.remove(t3);
    }, t2.prototype.U = function() {
      this.S += 1;
    }, t2.prototype.K = function() {
      this.S -= 1;
    }, t2.prototype.j = function() {
      this.k = true, this.N = true;
    }, t2;
  }()
);
var yn = (
  /** @class */
  function() {
    function t2(t3) {
      this.W = t3, /** The internal state of all tracked targets. */
      this.G = /* @__PURE__ */ new Map(), /** Keeps track of the documents to update since the last raised snapshot. */
      this.H = Ze(), /** A mapping of document keys to their set of target IDs. */
      this.J = vn(), /**
           * A list of targets with existence filter mismatches. These targets are
           * known to be inconsistent and their listens needs to be re-established by
           * RemoteStore.
           */
      this.Y = new $e(q2);
    }
    return t2.prototype.X = function(t3) {
      for (var e = 0, n = t3.v; e < n.length; e++) {
        var r = n[e];
        t3.P && t3.P.isFoundDocument() ? this.Z(r, t3.P) : this.tt(r, t3.key, t3.P);
      }
      for (var i = 0, o = t3.removedTargetIds; i < o.length; i++) {
        r = o[i];
        this.tt(r, t3.key, t3.P);
      }
    }, /** Processes and adds the WatchTargetChange to the current set of changes. */
    t2.prototype.et = function(t3) {
      var e = this;
      this.forEachTarget(t3, function(n) {
        var r = e.nt(n);
        switch (t3.state) {
          case 0:
            e.st(n) && r.O(t3.resumeToken);
            break;
          case 1:
            r.K(), r.F || // We have a freshly added target, so we need to reset any state
            // that we had previously. This can happen e.g. when remove and add
            // back a target for existence filter mismatches.
            r.L(), r.O(t3.resumeToken);
            break;
          case 2:
            r.K(), r.F || e.removeTarget(n);
            break;
          case 3:
            e.st(n) && (r.j(), r.O(t3.resumeToken));
            break;
          case 4:
            e.st(n) && // Reset the target and synthesizes removes for all existing
            // documents. The backend will re-add any documents that still
            // match the target before it sends the next global snapshot.
            (e.it(n), r.O(t3.resumeToken));
            break;
          default:
            O2();
        }
      });
    }, /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */
    t2.prototype.forEachTarget = function(t3, e) {
      var n = this;
      t3.targetIds.length > 0 ? t3.targetIds.forEach(e) : this.G.forEach(function(t4, r) {
        n.st(r) && e(r);
      });
    }, /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */
    t2.prototype.rt = function(t3) {
      var e = t3.targetId, n = t3.V.count, r = this.ot(e);
      if (r) {
        var i = r.target;
        if (xt(i)) {
          if (0 === n) {
            var o = new ct(i.path);
            this.tt(e, o, Nt.newNoDocument(o, K2.min()));
          } else P2(1 === n);
        } else this.ct(e) !== n && // Existence filter mismatch: We reset the mapping and raise a new
        // snapshot with `isFromCache:true`.
        (this.it(e), this.Y = this.Y.add(e));
      }
    }, /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */
    t2.prototype.ut = function(t3) {
      var e = this, n = /* @__PURE__ */ new Map();
      this.G.forEach(function(r2, i2) {
        var o = e.ot(i2);
        if (o) {
          if (r2.current && xt(o.target)) {
            var s = new ct(o.target.path);
            null !== e.H.get(s) || e.at(i2, s) || e.tt(i2, s, Nt.newNoDocument(s, t3));
          }
          r2.$ && (n.set(i2, r2.M()), r2.L());
        }
      });
      var r = sn();
      this.J.forEach(function(t4, n2) {
        var i2 = true;
        n2.forEachWhile(function(t5) {
          var n3 = e.ot(t5);
          return !n3 || 2 === n3.purpose || (i2 = false, false);
        }), i2 && (r = r.add(t4));
      });
      var i = new cn(t3, n, this.Y, this.H, r);
      return this.H = Ze(), this.J = vn(), this.Y = new $e(q2), i;
    }, /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    t2.prototype.Z = function(t3, e) {
      if (this.st(t3)) {
        var n = this.at(t3, e.key) ? 2 : 0;
        this.nt(t3).B(e.key, n), this.H = this.H.insert(e.key, e), this.J = this.J.insert(e.key, this.ht(e.key).add(t3));
      }
    }, /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    t2.prototype.tt = function(t3, e, n) {
      if (this.st(t3)) {
        var r = this.nt(t3);
        this.at(t3, e) ? r.B(
          e,
          1
          /* Removed */
        ) : (
          // The document may have entered and left the target before we raised a
          // snapshot, so we can just ignore the change.
          r.q(e)
        ), this.J = this.J.insert(e, this.ht(e).delete(t3)), n && (this.H = this.H.insert(e, n));
      }
    }, t2.prototype.removeTarget = function(t3) {
      this.G.delete(t3);
    }, /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */
    t2.prototype.ct = function(t3) {
      var e = this.nt(t3).M();
      return this.W.getRemoteKeysForTarget(t3).size + e.addedDocuments.size - e.removedDocuments.size;
    }, /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */
    t2.prototype.U = function(t3) {
      this.nt(t3).U();
    }, t2.prototype.nt = function(t3) {
      var e = this.G.get(t3);
      return e || (e = new pn(), this.G.set(t3, e)), e;
    }, t2.prototype.ht = function(t3) {
      var e = this.J.get(t3);
      return e || (e = new $e(q2), this.J = this.J.insert(t3, e)), e;
    }, /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    t2.prototype.st = function(t3) {
      var e = null !== this.ot(t3);
      return e || C2("WatchChangeAggregator", "Detected inactive target", t3), e;
    }, /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    t2.prototype.ot = function(t3) {
      var e = this.G.get(t3);
      return e && e.F ? null : this.W.lt(t3);
    }, /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    t2.prototype.it = function(t3) {
      var e = this;
      this.G.set(t3, new pn()), this.W.getRemoteKeysForTarget(t3).forEach(function(n) {
        e.tt(
          t3,
          n,
          /*updatedDocument=*/
          null
        );
      });
    }, /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */
    t2.prototype.at = function(t3, e) {
      return this.W.getRemoteKeysForTarget(t3).has(e);
    }, t2;
  }()
);
function vn() {
  return new We(ct.comparator);
}
function mn() {
  return new We(ct.comparator);
}
var gn = {
  asc: "ASCENDING",
  desc: "DESCENDING"
};
var wn = {
  "<": "LESS_THAN",
  "<=": "LESS_THAN_OR_EQUAL",
  ">": "GREATER_THAN",
  ">=": "GREATER_THAN_OR_EQUAL",
  "==": "EQUAL",
  "!=": "NOT_EQUAL",
  "array-contains": "ARRAY_CONTAINS",
  in: "IN",
  "not-in": "NOT_IN",
  "array-contains-any": "ARRAY_CONTAINS_ANY"
};
var bn = function(t2, e) {
  this.databaseId = t2, this.I = e;
};
function In(t2, e) {
  return t2.I ? new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "") + "." + ("000000000" + e.nanoseconds).slice(-9) + "Z" : {
    seconds: "" + e.seconds,
    nanos: e.nanoseconds
  };
}
function Tn(t2, e) {
  return t2.I ? e.toBase64() : e.toUint8Array();
}
function _n(t2, e) {
  return In(t2, e.toTimestamp());
}
function En(t2) {
  return P2(!!t2), K2.fromTimestamp(function(t3) {
    var e = tt(t3);
    return new j(e.seconds, e.nanos);
  }(t2));
}
function Sn(t2, e) {
  return function(t3) {
    return new H2(["projects", t3.projectId, "databases", t3.database]);
  }(t2).child("documents").child(e).canonicalString();
}
function Nn(t2) {
  var e = H2.fromString(t2);
  return P2($n(e)), e;
}
function Dn(t2, e) {
  return Sn(t2.databaseId, e.path);
}
function An(t2, e) {
  var n = Nn(e);
  if (n.get(1) !== t2.databaseId.projectId) throw new D2(N2.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t2.databaseId.projectId);
  if (n.get(3) !== t2.databaseId.database) throw new D2(N2.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t2.databaseId.database);
  return new ct(Rn(n));
}
function kn(t2, e) {
  return Sn(t2.databaseId, e);
}
function Cn(t2) {
  var e = Nn(t2);
  return 4 === e.length ? H2.emptyPath() : Rn(e);
}
function xn(t2) {
  return new H2(["projects", t2.databaseId.projectId, "databases", t2.databaseId.database]).canonicalString();
}
function Rn(t2) {
  return P2(t2.length > 4 && "documents" === t2.get(4)), t2.popFirst(5);
}
function Ln(t2, e, n) {
  return {
    name: Dn(t2, e),
    fields: n.value.mapValue.fields
  };
}
function On(t2, e, n) {
  var r = An(t2, e.name), i = En(e.updateTime), o = new Et({
    mapValue: {
      fields: e.fields
    }
  }), s = Nt.newFoundDocument(r, i, o);
  return n && s.setHasCommittedMutations(), n ? s.setHasCommittedMutations() : s;
}
function Pn(t2, e) {
  var n;
  if (e instanceof Pe) n = {
    update: Ln(t2, e.key, e.value)
  };
  else if (e instanceof je) n = {
    delete: Dn(t2, e.key)
  };
  else if (e instanceof Fe) n = {
    update: Ln(t2, e.key, e.data),
    updateMask: Yn(e.fieldMask)
  };
  else {
    if (!(e instanceof Ke)) return O2();
    n = {
      verify: Dn(t2, e.key)
    };
  }
  return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map(function(t3) {
    return function(t4, e2) {
      var n2 = e2.transform;
      if (n2 instanceof me) return {
        fieldPath: e2.field.canonicalString(),
        setToServerValue: "REQUEST_TIME"
      };
      if (n2 instanceof ge) return {
        fieldPath: e2.field.canonicalString(),
        appendMissingElements: {
          values: n2.elements
        }
      };
      if (n2 instanceof be) return {
        fieldPath: e2.field.canonicalString(),
        removeAllFromArray: {
          values: n2.elements
        }
      };
      if (n2 instanceof Te) return {
        fieldPath: e2.field.canonicalString(),
        increment: n2.A
      };
      throw O2();
    }(0, t3);
  })), e.precondition.isNone || (n.currentDocument = function(t3, e2) {
    return void 0 !== e2.updateTime ? {
      updateTime: _n(t3, e2.updateTime)
    } : void 0 !== e2.exists ? {
      exists: e2.exists
    } : O2();
  }(t2, e.precondition)), n;
}
function Fn(t2, e) {
  var n = e.currentDocument ? function(t3) {
    return void 0 !== t3.updateTime ? De.updateTime(En(t3.updateTime)) : void 0 !== t3.exists ? De.exists(t3.exists) : De.none();
  }(e.currentDocument) : De.none(), r = e.updateTransforms ? e.updateTransforms.map(function(e2) {
    return function(t3, e3) {
      var n2 = null;
      if ("setToServerValue" in e3) P2("REQUEST_TIME" === e3.setToServerValue), n2 = new me();
      else if ("appendMissingElements" in e3) {
        var r2 = e3.appendMissingElements.values || [];
        n2 = new ge(r2);
      } else if ("removeAllFromArray" in e3) {
        var i2 = e3.removeAllFromArray.values || [];
        n2 = new be(i2);
      } else "increment" in e3 ? n2 = new Te(t3, e3.increment) : O2();
      var o2 = $.fromServerFormat(e3.fieldPath);
      return new Se(o2, n2);
    }(t2, e2);
  }) : [];
  if (e.update) {
    e.update.name;
    var i = An(t2, e.update.name), o = new Et({
      mapValue: {
        fields: e.update.fields
      }
    });
    if (e.updateMask) {
      var s = function(t3) {
        var e2 = t3.fieldPaths || [];
        return new X2(e2.map(function(t4) {
          return $.fromServerFormat(t4);
        }));
      }(e.updateMask);
      return new Fe(i, o, s, n, r);
    }
    return new Pe(i, o, n, r);
  }
  if (e.delete) {
    var u = An(t2, e.delete);
    return new je(u, n);
  }
  if (e.verify) {
    var a = An(t2, e.verify);
    return new Ke(a, n);
  }
  return O2();
}
function Mn(t2, e) {
  return {
    documents: [kn(t2, e.path)]
  };
}
function Vn(t2, e) {
  var n = {
    structuredQuery: {}
  }, r = e.path;
  null !== e.collectionGroup ? (n.parent = kn(t2, r), n.structuredQuery.from = [{
    collectionId: e.collectionGroup,
    allDescendants: true
  }]) : (n.parent = kn(t2, r.popLast()), n.structuredQuery.from = [{
    collectionId: r.lastSegment()
  }]);
  var i = function(t3) {
    if (0 !== t3.length) {
      var e2 = t3.map(function(t4) {
        return function(t5) {
          if ("==" === t5.op) {
            if (It(t5.value)) return {
              unaryFilter: {
                field: Qn(t5.field),
                op: "IS_NAN"
              }
            };
            if (bt(t5.value)) return {
              unaryFilter: {
                field: Qn(t5.field),
                op: "IS_NULL"
              }
            };
          } else if ("!=" === t5.op) {
            if (It(t5.value)) return {
              unaryFilter: {
                field: Qn(t5.field),
                op: "IS_NOT_NAN"
              }
            };
            if (bt(t5.value)) return {
              unaryFilter: {
                field: Qn(t5.field),
                op: "IS_NOT_NULL"
              }
            };
          }
          return {
            fieldFilter: {
              field: Qn(t5.field),
              op: Gn(t5.op),
              value: t5.value
            }
          };
        }(t4);
      });
      return 1 === e2.length ? e2[0] : {
        compositeFilter: {
          op: "AND",
          filters: e2
        }
      };
    }
  }(e.filters);
  i && (n.structuredQuery.where = i);
  var o = function(t3) {
    if (0 !== t3.length) return t3.map(function(t4) {
      return function(t5) {
        return {
          field: Qn(t5.field),
          direction: Kn(t5.dir)
        };
      }(t4);
    });
  }(e.orderBy);
  o && (n.structuredQuery.orderBy = o);
  var s = function(t3, e2) {
    return t3.I || st(e2) ? e2 : {
      value: e2
    };
  }(t2, e.limit);
  return null !== s && (n.structuredQuery.limit = s), e.startAt && (n.structuredQuery.startAt = Bn(e.startAt)), e.endAt && (n.structuredQuery.endAt = Bn(e.endAt)), n;
}
function qn(t2) {
  var e = Cn(t2.parent), n = t2.structuredQuery, r = n.from ? n.from.length : 0, i = null;
  if (r > 0) {
    P2(1 === r);
    var o = n.from[0];
    o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId);
  }
  var s = [];
  n.where && (s = Un(n.where));
  var u = [];
  n.orderBy && (u = n.orderBy.map(function(t3) {
    return function(t4) {
      return new Kt(
        zn(t4.field),
        // visible for testing
        function(t5) {
          switch (t5) {
            case "ASCENDING":
              return "asc";
            case "DESCENDING":
              return "desc";
            default:
              return;
          }
        }(t4.direction)
      );
    }(t3);
  }));
  var a = null;
  n.limit && (a = function(t3) {
    var e2;
    return st(e2 = "object" == typeof t3 ? t3.value : t3) ? null : e2;
  }(n.limit));
  var c = null;
  n.startAt && (c = jn(n.startAt));
  var h = null;
  return n.endAt && (h = jn(n.endAt)), Ht(e, i, u, s, a, "F", c, h);
}
function Un(t2) {
  return t2 ? void 0 !== t2.unaryFilter ? [Hn(t2)] : void 0 !== t2.fieldFilter ? [Wn(t2)] : void 0 !== t2.compositeFilter ? t2.compositeFilter.filters.map(function(t3) {
    return Un(t3);
  }).reduce(function(t3, e) {
    return t3.concat(e);
  }) : O2() : [];
}
function Bn(t2) {
  return {
    before: t2.before,
    values: t2.position
  };
}
function jn(t2) {
  var e = !!t2.before, n = t2.values || [];
  return new Bt(n, e);
}
function Kn(t2) {
  return gn[t2];
}
function Gn(t2) {
  return wn[t2];
}
function Qn(t2) {
  return {
    fieldPath: t2.canonicalString()
  };
}
function zn(t2) {
  return $.fromServerFormat(t2.fieldPath);
}
function Wn(t2) {
  return Rt.create(zn(t2.fieldFilter.field), function(t3) {
    switch (t3) {
      case "EQUAL":
        return "==";
      case "NOT_EQUAL":
        return "!=";
      case "GREATER_THAN":
        return ">";
      case "GREATER_THAN_OR_EQUAL":
        return ">=";
      case "LESS_THAN":
        return "<";
      case "LESS_THAN_OR_EQUAL":
        return "<=";
      case "ARRAY_CONTAINS":
        return "array-contains";
      case "IN":
        return "in";
      case "NOT_IN":
        return "not-in";
      case "ARRAY_CONTAINS_ANY":
        return "array-contains-any";
      case "OPERATOR_UNSPECIFIED":
      default:
        return O2();
    }
  }(t2.fieldFilter.op), t2.fieldFilter.value);
}
function Hn(t2) {
  switch (t2.unaryFilter.op) {
    case "IS_NAN":
      var e = zn(t2.unaryFilter.field);
      return Rt.create(e, "==", {
        doubleValue: NaN
      });
    case "IS_NULL":
      var n = zn(t2.unaryFilter.field);
      return Rt.create(n, "==", {
        nullValue: "NULL_VALUE"
      });
    case "IS_NOT_NAN":
      var r = zn(t2.unaryFilter.field);
      return Rt.create(r, "!=", {
        doubleValue: NaN
      });
    case "IS_NOT_NULL":
      var i = zn(t2.unaryFilter.field);
      return Rt.create(i, "!=", {
        nullValue: "NULL_VALUE"
      });
    case "OPERATOR_UNSPECIFIED":
    default:
      return O2();
  }
}
function Yn(t2) {
  var e = [];
  return t2.fields.forEach(function(t3) {
    return e.push(t3.canonicalString());
  }), {
    fieldPaths: e
  };
}
function $n(t2) {
  return t2.length >= 4 && "projects" === t2.get(0) && "databases" === t2.get(2);
}
function Xn(t2) {
  for (var e = "", n = 0; n < t2.length; n++) e.length > 0 && (e = Zn(e)), e = Jn(t2.get(n), e);
  return Zn(e);
}
function Jn(t2, e) {
  for (var n = e, r = t2.length, i = 0; i < r; i++) {
    var o = t2.charAt(i);
    switch (o) {
      case "\0":
        n += "";
        break;
      case "":
        n += "";
        break;
      default:
        n += o;
    }
  }
  return n;
}
function Zn(t2) {
  return t2 + "";
}
function tr(t2) {
  var e = t2.length;
  if (P2(e >= 2), 2 === e) return P2("" === t2.charAt(0) && "" === t2.charAt(1)), H2.emptyPath();
  for (var n = e - 2, r = [], i = "", o = 0; o < e; ) {
    var s = t2.indexOf("", o);
    switch ((s < 0 || s > n) && O2(), t2.charAt(s + 1)) {
      case "":
        var u = t2.substring(o, s), a = void 0;
        0 === i.length ? (
          // Avoid copying for the common case of a segment that excludes \0
          // and \001
          a = u
        ) : (a = i += u, i = ""), r.push(a);
        break;
      case "":
        i += t2.substring(o, s), i += "\0";
        break;
      case "":
        i += t2.substring(o, s + 1);
        break;
      default:
        O2();
    }
    o = s + 2;
  }
  return new H2(r);
}
var er = function(t2, e) {
  this.seconds = t2, this.nanoseconds = e;
};
var nr = function(t2, e, n) {
  this.ownerId = t2, this.allowTabSynchronization = e, this.leaseTimestampMs = n;
};
nr.store = "owner", /**
     * The key string used for the single object that exists in the
     * DbPrimaryClient store.
     */
nr.key = "owner";
var rr = function(t2, e, n) {
  this.userId = t2, this.lastAcknowledgedBatchId = e, this.lastStreamToken = n;
};
rr.store = "mutationQueues", /** Keys are automatically assigned via the userId property. */
rr.keyPath = "userId";
var ir = function(t2, e, n, r, i) {
  this.userId = t2, this.batchId = e, this.localWriteTimeMs = n, this.baseMutations = r, this.mutations = i;
};
ir.store = "mutations", /** Keys are automatically assigned via the userId, batchId properties. */
ir.keyPath = "batchId", /** The index name for lookup of mutations by user. */
ir.userMutationsIndex = "userMutationsIndex", /** The user mutations index is keyed by [userId, batchId] pairs. */
ir.userMutationsKeyPath = ["userId", "batchId"];
var or = (
  /** @class */
  function() {
    function t2() {
    }
    return t2.prefixForUser = function(t3) {
      return [t3];
    }, /**
     * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
     * index to iterate over all at document mutations for a given path or lower.
     */
    t2.prefixForPath = function(t3, e) {
      return [t3, Xn(e)];
    }, /**
     * Creates a full index key of [userId, encodedPath, batchId] for inserting
     * and deleting into the DbDocumentMutations index.
     */
    t2.key = function(t3, e, n) {
      return [t3, Xn(e), n];
    }, t2;
  }()
);
or.store = "documentMutations", /**
     * Because we store all the useful information for this store in the key,
     * there is no useful information to store as the value. The raw (unencoded)
     * path cannot be stored because IndexedDb doesn't store prototype
     * information.
     */
or.PLACEHOLDER = new or();
var sr = function(t2, e) {
  this.path = t2, this.readTime = e;
};
var ur = function(t2, e) {
  this.path = t2, this.version = e;
};
var ar = (
  // TODO: We are currently storing full document keys almost three times
  // (once as part of the primary key, once - partly - as `parentPath` and once
  // inside the encoded documents). During our next migration, we should
  // rewrite the primary key as parentPath + document ID which would allow us
  // to drop one value.
  function(t2, e, n, r, i, o) {
    this.unknownDocument = t2, this.noDocument = e, this.document = n, this.hasCommittedMutations = r, this.readTime = i, this.parentPath = o;
  }
);
ar.store = "remoteDocuments", /**
     * An index that provides access to all entries sorted by read time (which
     * corresponds to the last modification time of each row).
     *
     * This index is used to provide a changelog for Multi-Tab.
     */
ar.readTimeIndex = "readTimeIndex", ar.readTimeIndexPath = "readTime", /**
     * An index that provides access to documents in a collection sorted by read
     * time.
     *
     * This index is used to allow the RemoteDocumentCache to fetch newly changed
     * documents in a collection.
     */
ar.collectionReadTimeIndex = "collectionReadTimeIndex", ar.collectionReadTimeIndexPath = ["parentPath", "readTime"];
var cr = (
  /**
       * @param byteSize - Approximately the total size in bytes of all the
       * documents in the document cache.
       */
  function(t2) {
    this.byteSize = t2;
  }
);
cr.store = "remoteDocumentGlobal", cr.key = "remoteDocumentGlobalKey";
var hr = function(t2, e, n, r, i, o, s) {
  this.targetId = t2, this.canonicalId = e, this.readTime = n, this.resumeToken = r, this.lastListenSequenceNumber = i, this.lastLimboFreeSnapshotVersion = o, this.query = s;
};
hr.store = "targets", /** Keys are automatically assigned via the targetId property. */
hr.keyPath = "targetId", /** The name of the queryTargets index. */
hr.queryTargetsIndexName = "queryTargetsIndex", /**
     * The index of all canonicalIds to the targets that they match. This is not
     * a unique mapping because canonicalId does not promise a unique name for all
     * possible queries, so we append the targetId to make the mapping unique.
     */
hr.queryTargetsKeyPath = ["canonicalId", "targetId"];
var fr = function(t2, e, n) {
  this.targetId = t2, this.path = e, this.sequenceNumber = n;
};
fr.store = "targetDocuments", /** Keys are automatically assigned via the targetId, path properties. */
fr.keyPath = ["targetId", "path"], /** The index name for the reverse index. */
fr.documentTargetsIndex = "documentTargetsIndex", /** We also need to create the reverse index for these properties. */
fr.documentTargetsKeyPath = ["path", "targetId"];
var lr = function(t2, e, n, r) {
  this.highestTargetId = t2, this.highestListenSequenceNumber = e, this.lastRemoteSnapshotVersion = n, this.targetCount = r;
};
lr.key = "targetGlobalKey", lr.store = "targetGlobal";
var dr = function(t2, e) {
  this.collectionId = t2, this.parent = e;
};
dr.store = "collectionParents", /** Keys are automatically assigned via the collectionId, parent properties. */
dr.keyPath = ["collectionId", "parent"];
var pr = function(t2, e, n, r) {
  this.clientId = t2, this.updateTimeMs = e, this.networkEnabled = n, this.inForeground = r;
};
pr.store = "clientMetadata", /** Keys are automatically assigned via the clientId properties. */
pr.keyPath = "clientId";
var yr = function(t2, e, n) {
  this.bundleId = t2, this.createTime = e, this.version = n;
};
yr.store = "bundles", yr.keyPath = "bundleId";
var vr = function(t2, e, n) {
  this.name = t2, this.readTime = e, this.bundledQuery = n;
};
vr.store = "namedQueries", vr.keyPath = "name";
var mr = __spreadArray(__spreadArray([], __spreadArray(__spreadArray([], __spreadArray(__spreadArray([], __spreadArray(__spreadArray([], [rr.store, ir.store, or.store, ar.store, hr.store, nr.store, lr.store, fr.store]), [pr.store])), [cr.store])), [dr.store])), [yr.store, vr.store]);
var gr = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
var wr = (
  /** @class */
  function() {
    function t2() {
      this.onCommittedListeners = [];
    }
    return t2.prototype.addOnCommittedListener = function(t3) {
      this.onCommittedListeners.push(t3);
    }, t2.prototype.raiseOnCommittedEvent = function() {
      this.onCommittedListeners.forEach(function(t3) {
        return t3();
      });
    }, t2;
  }()
);
var br = function() {
  var t2 = this;
  this.promise = new Promise(function(e, n) {
    t2.resolve = e, t2.reject = n;
  });
};
var Ir = (
  /** @class */
  function() {
    function t2(t3) {
      var e = this;
      this.nextCallback = null, this.catchCallback = null, // When the operation resolves, we'll set result or error and mark isDone.
      this.result = void 0, this.error = void 0, this.isDone = false, // Set to true when .then() or .catch() are called and prevents additional
      // chaining.
      this.callbackAttached = false, t3(function(t4) {
        e.isDone = true, e.result = t4, e.nextCallback && // value should be defined unless T is Void, but we can't express
        // that in the type system.
        e.nextCallback(t4);
      }, function(t4) {
        e.isDone = true, e.error = t4, e.catchCallback && e.catchCallback(t4);
      });
    }
    return t2.prototype.catch = function(t3) {
      return this.next(void 0, t3);
    }, t2.prototype.next = function(e, n) {
      var r = this;
      return this.callbackAttached && O2(), this.callbackAttached = true, this.isDone ? this.error ? this.wrapFailure(n, this.error) : this.wrapSuccess(e, this.result) : new t2(function(t3, i) {
        r.nextCallback = function(n2) {
          r.wrapSuccess(e, n2).next(t3, i);
        }, r.catchCallback = function(e2) {
          r.wrapFailure(n, e2).next(t3, i);
        };
      });
    }, t2.prototype.toPromise = function() {
      var t3 = this;
      return new Promise(function(e, n) {
        t3.next(e, n);
      });
    }, t2.prototype.wrapUserFunction = function(e) {
      try {
        var n = e();
        return n instanceof t2 ? n : t2.resolve(n);
      } catch (e2) {
        return t2.reject(e2);
      }
    }, t2.prototype.wrapSuccess = function(e, n) {
      return e ? this.wrapUserFunction(function() {
        return e(n);
      }) : t2.resolve(n);
    }, t2.prototype.wrapFailure = function(e, n) {
      return e ? this.wrapUserFunction(function() {
        return e(n);
      }) : t2.reject(n);
    }, t2.resolve = function(e) {
      return new t2(function(t3, n) {
        t3(e);
      });
    }, t2.reject = function(e) {
      return new t2(function(t3, n) {
        n(e);
      });
    }, t2.waitFor = function(e) {
      return new t2(function(t3, n) {
        var r = 0, i = 0, o = false;
        e.forEach(function(e2) {
          ++r, e2.next(function() {
            ++i, o && i === r && t3();
          }, function(t4) {
            return n(t4);
          });
        }), o = true, i === r && t3();
      });
    }, /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */
    t2.or = function(e) {
      for (var n = t2.resolve(false), r = function(e2) {
        n = n.next(function(n2) {
          return n2 ? t2.resolve(n2) : e2();
        });
      }, i = 0, o = e; i < o.length; i++) {
        r(o[i]);
      }
      return n;
    }, t2.forEach = function(t3, e) {
      var n = this, r = [];
      return t3.forEach(function(t4, i) {
        r.push(e.call(n, t4, i));
      }), this.waitFor(r);
    }, t2;
  }()
);
var Tr = (
  /** @class */
  function() {
    function t2(t3, e) {
      var n = this;
      this.action = t3, this.transaction = e, this.aborted = false, /**
           * A `Promise` that resolves with the result of the IndexedDb transaction.
           */
      this.ft = new br(), this.transaction.oncomplete = function() {
        n.ft.resolve();
      }, this.transaction.onabort = function() {
        e.error ? n.ft.reject(new Sr(t3, e.error)) : n.ft.resolve();
      }, this.transaction.onerror = function(e2) {
        var r = Cr(e2.target.error);
        n.ft.reject(new Sr(t3, r));
      };
    }
    return t2.open = function(e, n, r, i) {
      try {
        return new t2(n, e.transaction(i, r));
      } catch (e2) {
        throw new Sr(n, e2);
      }
    }, Object.defineProperty(t2.prototype, "dt", {
      get: function() {
        return this.ft.promise;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.abort = function(t3) {
      t3 && this.ft.reject(t3), this.aborted || (C2("SimpleDb", "Aborting transaction:", t3 ? t3.message : "Client-initiated abort"), this.aborted = true, this.transaction.abort());
    }, /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */
    t2.prototype.store = function(t3) {
      var e = this.transaction.objectStore(t3);
      return new Dr(e);
    }, t2;
  }()
);
var _r = (
  /** @class */
  function() {
    function t2(e, n, r) {
      this.name = e, this.version = n, this.wt = r, // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
      // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
      // whatever reason it's much harder to hit after 12.2 so we only proactively
      // log on 12.2.
      12.2 === t2._t(getUA()) && x2("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
    }
    return t2.delete = function(t3) {
      return C2("SimpleDb", "Removing database:", t3), Ar(window.indexedDB.deleteDatabase(t3)).toPromise();
    }, /** Returns true if IndexedDB is available in the current environment. */
    t2.yt = function() {
      if ("undefined" == typeof indexedDB) return false;
      if (t2.gt()) return true;
      var e = getUA(), n = t2._t(e), r = 0 < n && n < 10, o = t2.Et(e), s = 0 < o && o < 4.5;
      return !(e.indexOf("MSIE ") > 0 || e.indexOf("Trident/") > 0 || e.indexOf("Edge/") > 0 || r || s);
    }, /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */
    t2.gt = function() {
      var t3;
      return "undefined" != typeof process && "YES" === (null === (t3 = process.env) || void 0 === t3 ? void 0 : t3.Tt);
    }, /** Helper to get a typed SimpleDbStore from a transaction. */
    t2.It = function(t3, e) {
      return t3.store(e);
    }, // visible for testing
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    t2._t = function(t3) {
      var e = t3.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
      return Number(n);
    }, // visible for testing
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    t2.Et = function(t3) {
      var e = t3.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
      return Number(n);
    }, /**
     * Opens the specified database, creating or upgrading it if necessary.
     */
    t2.prototype.At = function(t3) {
      return __awaiter(this, void 0, void 0, function() {
        var e, n = this;
        return __generator(this, function(r) {
          switch (r.label) {
            case 0:
              return this.db ? [3, 2] : (C2("SimpleDb", "Opening database:", this.name), e = this, [4, new Promise(function(e2, r2) {
                var i = indexedDB.open(n.name, n.version);
                i.onsuccess = function(t4) {
                  var n2 = t4.target.result;
                  e2(n2);
                }, i.onblocked = function() {
                  r2(new Sr(t3, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
                }, i.onerror = function(e3) {
                  var n2 = e3.target.error;
                  "VersionError" === n2.name ? r2(new D2(N2.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : r2(new Sr(t3, n2));
                }, i.onupgradeneeded = function(t4) {
                  C2("SimpleDb", 'Database "' + n.name + '" requires upgrade from version:', t4.oldVersion);
                  var e3 = t4.target.result;
                  n.wt.Rt(e3, i.transaction, t4.oldVersion, n.version).next(function() {
                    C2("SimpleDb", "Database upgrade to version " + n.version + " complete");
                  });
                };
              })]);
            case 1:
              e.db = r.sent(), r.label = 2;
            case 2:
              return [2, (this.bt && (this.db.onversionchange = function(t4) {
                return n.bt(t4);
              }), this.db)];
          }
        });
      });
    }, t2.prototype.vt = function(t3) {
      this.bt = t3, this.db && (this.db.onversionchange = function(e) {
        return t3(e);
      });
    }, t2.prototype.runTransaction = function(t3, e, i, o) {
      return __awaiter(this, void 0, void 0, function() {
        var n, s, u, a, c;
        return __generator(this, function(h) {
          switch (h.label) {
            case 0:
              n = "readonly" === e, s = 0, u = function() {
                var e2, u2, c2, h2, f;
                return __generator(this, function(r) {
                  switch (r.label) {
                    case 0:
                      ++s, r.label = 1;
                    case 1:
                      return r.trys.push([1, 4, , 5]), [4, a.At(t3)];
                    case 2:
                      return a.db = r.sent(), e2 = Tr.open(a.db, t3, n ? "readonly" : "readwrite", i), u2 = o(e2).catch(function(t4) {
                        return e2.abort(t4), Ir.reject(t4);
                      }).toPromise(), c2 = {}, u2.catch(function() {
                      }), [4, e2.dt];
                    case 3:
                      return [2, (c2.value = // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                      // fire), but still return the original transactionFnResult back to the
                      // caller.
                      (r.sent(), u2), c2)];
                    case 4:
                      return h2 = r.sent(), f = "FirebaseError" !== h2.name && s < 3, C2("SimpleDb", "Transaction failed with error:", h2.message, "Retrying:", f), a.close(), f ? [3, 5] : [2, {
                        value: Promise.reject(h2)
                      }];
                    case 5:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              }, a = this, h.label = 1;
            case 1:
              return [5, u()];
            case 2:
              if ("object" == typeof (c = h.sent())) return [2, c.value];
              h.label = 3;
            case 3:
              return [3, 1];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, t2.prototype.close = function() {
      this.db && this.db.close(), this.db = void 0;
    }, t2;
  }()
);
var Er = (
  /** @class */
  function() {
    function t2(t3) {
      this.Pt = t3, this.Vt = false, this.St = null;
    }
    return Object.defineProperty(t2.prototype, "isDone", {
      get: function() {
        return this.Vt;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "Dt", {
      get: function() {
        return this.St;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "cursor", {
      set: function(t3) {
        this.Pt = t3;
      },
      enumerable: false,
      configurable: true
    }), /**
     * This function can be called to stop iteration at any point.
     */
    t2.prototype.done = function() {
      this.Vt = true;
    }, /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */
    t2.prototype.Ct = function(t3) {
      this.St = t3;
    }, /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */
    t2.prototype.delete = function() {
      return Ar(this.Pt.delete());
    }, t2;
  }()
);
var Sr = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, N2.UNAVAILABLE, "IndexedDB transaction '" + t2 + "' failed: " + n2) || this).name = "IndexedDbTransactionError", r;
    }
    return __extends(n, e), n;
  }(D2)
);
function Nr(t2) {
  return "IndexedDbTransactionError" === t2.name;
}
var Dr = (
  /** @class */
  function() {
    function t2(t3) {
      this.store = t3;
    }
    return t2.prototype.put = function(t3, e) {
      var n;
      return void 0 !== e ? (C2("SimpleDb", "PUT", this.store.name, t3, e), n = this.store.put(e, t3)) : (C2("SimpleDb", "PUT", this.store.name, "<auto-key>", t3), n = this.store.put(t3)), Ar(n);
    }, /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value - The object to write.
     * @returns The key of the value to add.
     */
    t2.prototype.add = function(t3) {
      return C2("SimpleDb", "ADD", this.store.name, t3, t3), Ar(this.store.add(t3));
    }, /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @returns The object with the specified key or null if no object exists.
     */
    t2.prototype.get = function(t3) {
      var e = this;
      return Ar(this.store.get(t3)).next(function(n) {
        return void 0 === n && (n = null), C2("SimpleDb", "GET", e.store.name, t3, n), n;
      });
    }, t2.prototype.delete = function(t3) {
      return C2("SimpleDb", "DELETE", this.store.name, t3), Ar(this.store.delete(t3));
    }, /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */
    t2.prototype.count = function() {
      return C2("SimpleDb", "COUNT", this.store.name), Ar(this.store.count());
    }, t2.prototype.Nt = function(t3, e) {
      var n = this.cursor(this.options(t3, e)), r = [];
      return this.xt(n, function(t4, e2) {
        r.push(e2);
      }).next(function() {
        return r;
      });
    }, t2.prototype.kt = function(t3, e) {
      C2("SimpleDb", "DELETE ALL", this.store.name);
      var n = this.options(t3, e);
      n.Ft = false;
      var r = this.cursor(n);
      return this.xt(r, function(t4, e2, n2) {
        return n2.delete();
      });
    }, t2.prototype.$t = function(t3, e) {
      var n;
      e ? n = t3 : (n = {}, e = t3);
      var r = this.cursor(n);
      return this.xt(r, e);
    }, /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */
    t2.prototype.Ot = function(t3) {
      var e = this.cursor({});
      return new Ir(function(n, r) {
        e.onerror = function(t4) {
          var e2 = Cr(t4.target.error);
          r(e2);
        }, e.onsuccess = function(e2) {
          var r2 = e2.target.result;
          r2 ? t3(r2.primaryKey, r2.value).next(function(t4) {
            t4 ? r2.continue() : n();
          }) : n();
        };
      });
    }, t2.prototype.xt = function(t3, e) {
      var n = [];
      return new Ir(function(r, i) {
        t3.onerror = function(t4) {
          i(t4.target.error);
        }, t3.onsuccess = function(t4) {
          var i2 = t4.target.result;
          if (i2) {
            var o = new Er(i2), s = e(i2.primaryKey, i2.value, o);
            if (s instanceof Ir) {
              var u = s.catch(function(t5) {
                return o.done(), Ir.reject(t5);
              });
              n.push(u);
            }
            o.isDone ? r() : null === o.Dt ? i2.continue() : i2.continue(o.Dt);
          } else r();
        };
      }).next(function() {
        return Ir.waitFor(n);
      });
    }, t2.prototype.options = function(t3, e) {
      var n;
      return void 0 !== t3 && ("string" == typeof t3 ? n = t3 : e = t3), {
        index: n,
        range: e
      };
    }, t2.prototype.cursor = function(t3) {
      var e = "next";
      if (t3.reverse && (e = "prev"), t3.index) {
        var n = this.store.index(t3.index);
        return t3.Ft ? n.openKeyCursor(t3.range, e) : n.openCursor(t3.range, e);
      }
      return this.store.openCursor(t3.range, e);
    }, t2;
  }()
);
function Ar(t2) {
  return new Ir(function(e, n) {
    t2.onsuccess = function(t3) {
      var n2 = t3.target.result;
      e(n2);
    }, t2.onerror = function(t3) {
      var e2 = Cr(t3.target.error);
      n(e2);
    };
  });
}
var kr = false;
function Cr(t2) {
  var e = _r._t(getUA());
  if (e >= 12.2 && e < 13) {
    var n = "An internal error was encountered in the Indexed Database server";
    if (t2.message.indexOf(n) >= 0) {
      var r = new D2("internal", "IOS_INDEXEDDB_BUG1: IndexedDb has thrown '" + n + "'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
      return kr || (kr = true, // Throw a global exception outside of this promise chain, for the user to
      // potentially catch.
      setTimeout(function() {
        throw r;
      }, 0)), r;
    }
  }
  return t2;
}
var xr = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this) || this).Mt = t2, r.currentSequenceNumber = n2, r;
    }
    return __extends(n, e), n;
  }(wr)
);
function Rr(t2, e) {
  var n = F2(t2);
  return _r.It(n.Mt, e);
}
var Lr = (
  /** @class */
  function() {
    function t2(t3, e, n, r) {
      this.batchId = t3, this.localWriteTime = e, this.baseMutations = n, this.mutations = r;
    }
    return t2.prototype.applyToRemoteDocument = function(t3, e) {
      for (var n = e.mutationResults, r = 0; r < this.mutations.length; r++) {
        var i = this.mutations[r];
        i.key.isEqual(t3.key) && Ce(i, t3, n[r]);
      }
    }, /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param document - The document to apply mutations to.
     */
    t2.prototype.applyToLocalView = function(t3) {
      for (var e = 0, n = this.baseMutations; e < n.length; e++) {
        (o = n[e]).key.isEqual(t3.key) && xe(o, t3, this.localWriteTime);
      }
      for (var r = 0, i = this.mutations; r < i.length; r++) {
        var o;
        (o = i[r]).key.isEqual(t3.key) && xe(o, t3, this.localWriteTime);
      }
    }, /**
     * Computes the local view for all provided documents given the mutations in
     * this batch.
     */
    t2.prototype.applyToLocalDocumentSet = function(t3) {
      var e = this;
      this.mutations.forEach(function(n) {
        var r = t3.get(n.key), i = r;
        e.applyToLocalView(i), r.isValidDocument() || i.convertToNoDocument(K2.min());
      });
    }, t2.prototype.keys = function() {
      return this.mutations.reduce(function(t3, e) {
        return t3.add(e.key);
      }, sn());
    }, t2.prototype.isEqual = function(t3) {
      return this.batchId === t3.batchId && U2(this.mutations, t3.mutations, function(t4, e) {
        return Le(t4, e);
      }) && U2(this.baseMutations, t3.baseMutations, function(t4, e) {
        return Le(t4, e);
      });
    }, t2;
  }()
);
var Or = (
  /** @class */
  function() {
    function t2(t3, e, n, r) {
      this.batch = t3, this.commitVersion = e, this.mutationResults = n, this.docVersions = r;
    }
    return t2.from = function(e, n, r) {
      P2(e.mutations.length === r.length);
      for (var i = rn(), o = e.mutations, s = 0; s < o.length; s++) i = i.insert(o[s].key, r[s].version);
      return new t2(e, n, r, i);
    }, t2;
  }()
);
var Pr = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i, o, s) {
      void 0 === i && (i = K2.min()), void 0 === o && (o = K2.min()), void 0 === s && (s = J2.EMPTY_BYTE_STRING), this.target = t3, this.targetId = e, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = o, this.resumeToken = s;
    }
    return t2.prototype.withSequenceNumber = function(e) {
      return new t2(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }, /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */
    t2.prototype.withResumeToken = function(e, n) {
      return new t2(this.target, this.targetId, this.purpose, this.sequenceNumber, n, this.lastLimboFreeSnapshotVersion, e);
    }, /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */
    t2.prototype.withLastLimboFreeSnapshotVersion = function(e) {
      return new t2(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken);
    }, t2;
  }()
);
var Fr = function(t2) {
  this.Lt = t2;
};
function Mr(t2, e) {
  if (e.document) return On(t2.Lt, e.document, !!e.hasCommittedMutations);
  if (e.noDocument) {
    var n = ct.fromSegments(e.noDocument.path), r = jr(e.noDocument.readTime), i = Nt.newNoDocument(n, r);
    return e.hasCommittedMutations ? i.setHasCommittedMutations() : i;
  }
  if (e.unknownDocument) {
    var o = ct.fromSegments(e.unknownDocument.path);
    r = jr(e.unknownDocument.version);
    return Nt.newUnknownDocument(o, r);
  }
  return O2();
}
function Vr(t2, e, n) {
  var r = qr(n), i = e.key.path.popLast().toArray();
  if (e.isFoundDocument()) {
    var o = function(t3, e2) {
      return {
        name: Dn(t3, e2.key),
        fields: e2.data.value.mapValue.fields,
        updateTime: In(t3, e2.version.toTimestamp())
      };
    }(t2.Lt, e), s = e.hasCommittedMutations;
    return new ar(
      /* unknownDocument= */
      null,
      /* noDocument= */
      null,
      o,
      s,
      r,
      i
    );
  }
  if (e.isNoDocument()) {
    var u = e.key.path.toArray(), a = Br(e.version);
    s = e.hasCommittedMutations;
    return new ar(
      /* unknownDocument= */
      null,
      new sr(u, a),
      /* document= */
      null,
      s,
      r,
      i
    );
  }
  if (e.isUnknownDocument()) {
    var c = e.key.path.toArray(), h = Br(e.version);
    return new ar(
      new ur(c, h),
      /* noDocument= */
      null,
      /* document= */
      null,
      /* hasCommittedMutations= */
      true,
      r,
      i
    );
  }
  return O2();
}
function qr(t2) {
  var e = t2.toTimestamp();
  return [e.seconds, e.nanoseconds];
}
function Ur(t2) {
  var e = new j(t2[0], t2[1]);
  return K2.fromTimestamp(e);
}
function Br(t2) {
  var e = t2.toTimestamp();
  return new er(e.seconds, e.nanoseconds);
}
function jr(t2) {
  var e = new j(t2.seconds, t2.nanoseconds);
  return K2.fromTimestamp(e);
}
function Kr(t2, e) {
  for (var n = (e.baseMutations || []).map(function(e2) {
    return Fn(t2.Lt, e2);
  }), r = 0; r < e.mutations.length - 1; ++r) {
    var i = e.mutations[r];
    if (r + 1 < e.mutations.length && void 0 !== e.mutations[r + 1].transform) {
      var o = e.mutations[r + 1];
      i.updateTransforms = o.transform.fieldTransforms, e.mutations.splice(r + 1, 1), ++r;
    }
  }
  var s = e.mutations.map(function(e2) {
    return Fn(t2.Lt, e2);
  }), u = j.fromMillis(e.localWriteTimeMs);
  return new Lr(e.batchId, u, n, s);
}
function Gr(t2) {
  var e, n, r = jr(t2.readTime), i = void 0 !== t2.lastLimboFreeSnapshotVersion ? jr(t2.lastLimboFreeSnapshotVersion) : K2.min();
  return void 0 !== t2.query.documents ? (P2(1 === (n = t2.query).documents.length), e = ne(Yt(Cn(n.documents[0])))) : e = function(t3) {
    return ne(qn(t3));
  }(t2.query), new Pr(e, t2.targetId, 0, t2.lastListenSequenceNumber, r, i, J2.fromBase64String(t2.resumeToken));
}
function Qr(t2, e) {
  var n, r = Br(e.snapshotVersion), i = Br(e.lastLimboFreeSnapshotVersion);
  n = xt(e.target) ? Mn(t2.Lt, e.target) : Vn(t2.Lt, e.target);
  var o = e.resumeToken.toBase64();
  return new hr(e.targetId, kt(e.target), r, o, e.sequenceNumber, i, n);
}
function zr(t2) {
  var e = qn({
    parent: t2.parent,
    structuredQuery: t2.structuredQuery
  });
  return "LAST" === t2.limitType ? re(
    e,
    e.limit,
    "L"
    /* Last */
  ) : e;
}
var Wr = (
  /** @class */
  function() {
    function t2() {
    }
    return t2.prototype.getBundleMetadata = function(t3, e) {
      return Hr(t3).get(e).next(function(t4) {
        if (t4) return {
          id: (e2 = t4).bundleId,
          createTime: jr(e2.createTime),
          version: e2.version
        };
        var e2;
      });
    }, t2.prototype.saveBundleMetadata = function(t3, e) {
      return Hr(t3).put({
        bundleId: (n = e).id,
        createTime: Br(En(n.createTime)),
        version: n.version
      });
      var n;
    }, t2.prototype.getNamedQuery = function(t3, e) {
      return Yr(t3).get(e).next(function(t4) {
        if (t4) return {
          name: (e2 = t4).name,
          query: zr(e2.bundledQuery),
          readTime: jr(e2.readTime)
        };
        var e2;
      });
    }, t2.prototype.saveNamedQuery = function(t3, e) {
      return Yr(t3).put(function(t4) {
        return {
          name: t4.name,
          readTime: Br(En(t4.readTime)),
          bundledQuery: t4.bundledQuery
        };
      }(e));
    }, t2;
  }()
);
function Hr(t2) {
  return Rr(t2, yr.store);
}
function Yr(t2) {
  return Rr(t2, vr.store);
}
var $r = (
  /** @class */
  function() {
    function t2() {
      this.Bt = new Xr();
    }
    return t2.prototype.addToCollectionParentIndex = function(t3, e) {
      return this.Bt.add(e), Ir.resolve();
    }, t2.prototype.getCollectionParents = function(t3, e) {
      return Ir.resolve(this.Bt.getEntries(e));
    }, t2;
  }()
);
var Xr = (
  /** @class */
  function() {
    function t2() {
      this.index = {};
    }
    return t2.prototype.add = function(t3) {
      var e = t3.lastSegment(), n = t3.popLast(), r = this.index[e] || new $e(H2.comparator), i = !r.has(n);
      return this.index[e] = r.add(n), i;
    }, t2.prototype.has = function(t3) {
      var e = t3.lastSegment(), n = t3.popLast(), r = this.index[e];
      return r && r.has(n);
    }, t2.prototype.getEntries = function(t3) {
      return (this.index[t3] || new $e(H2.comparator)).toArray();
    }, t2;
  }()
);
var Jr = (
  /** @class */
  function() {
    function t2() {
      this.qt = new Xr();
    }
    return t2.prototype.addToCollectionParentIndex = function(t3, e) {
      var n = this;
      if (!this.qt.has(e)) {
        var r = e.lastSegment(), i = e.popLast();
        t3.addOnCommittedListener(function() {
          n.qt.add(e);
        });
        var o = {
          collectionId: r,
          parent: Xn(i)
        };
        return Zr(t3).put(o);
      }
      return Ir.resolve();
    }, t2.prototype.getCollectionParents = function(t3, e) {
      var n = [], r = IDBKeyRange.bound(
        [e, ""],
        [B2(e), ""],
        /*lowerOpen=*/
        false,
        /*upperOpen=*/
        true
      );
      return Zr(t3).Nt(r).next(function(t4) {
        for (var r2 = 0, i = t4; r2 < i.length; r2++) {
          var o = i[r2];
          if (o.collectionId !== e) break;
          n.push(tr(o.parent));
        }
        return n;
      });
    }, t2;
  }()
);
function Zr(t2) {
  return Rr(t2, dr.store);
}
var ti = {
  didRun: false,
  sequenceNumbersCollected: 0,
  targetsRemoved: 0,
  documentsRemoved: 0
};
var ei = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.cacheSizeCollectionThreshold = t3, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n;
    }
    return t2.withCacheSize = function(e) {
      return new t2(e, t2.DEFAULT_COLLECTION_PERCENTILE, t2.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
    }, t2;
  }()
);
function ni(t2, e, n) {
  var r = t2.store(ir.store), i = t2.store(or.store), o = [], s = IDBKeyRange.only(n.batchId), u = 0, a = r.$t({
    range: s
  }, function(t3, e2, n2) {
    return u++, n2.delete();
  });
  o.push(a.next(function() {
    P2(1 === u);
  }));
  for (var c = [], h = 0, f = n.mutations; h < f.length; h++) {
    var l2 = f[h], d = or.key(e, l2.key.path, n.batchId);
    o.push(i.delete(d)), c.push(l2.key);
  }
  return Ir.waitFor(o).next(function() {
    return c;
  });
}
function ri(t2) {
  if (!t2) return 0;
  var e;
  if (t2.document) e = t2.document;
  else if (t2.unknownDocument) e = t2.unknownDocument;
  else {
    if (!t2.noDocument) throw O2();
    e = t2.noDocument;
  }
  return JSON.stringify(e).length;
}
ei.DEFAULT_COLLECTION_PERCENTILE = 10, ei.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, ei.DEFAULT = new ei(41943040, ei.DEFAULT_COLLECTION_PERCENTILE, ei.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), ei.DISABLED = new ei(-1, 0, 0);
var ii = (
  /** @class */
  function() {
    function t2(t3, e, n, r) {
      this.userId = t3, this.R = e, this.Ut = n, this.referenceDelegate = r, /**
           * Caches the document keys for pending mutation batches. If the mutation
           * has been removed from IndexedDb, the cached value may continue to
           * be used to retrieve the batch's document keys. To remove a cached value
           * locally, `removeCachedMutationKeys()` should be invoked either directly
           * or through `removeMutationBatches()`.
           *
           * With multi-tab, when the primary client acknowledges or rejects a mutation,
           * this cache is used by secondary clients to invalidate the local
           * view of the documents that were previously affected by the mutation.
           */
      // PORTING NOTE: Multi-tab only.
      this.Kt = {};
    }
    return t2.Qt = function(e, n, r, i) {
      return P2("" !== e.uid), new t2(e.isAuthenticated() ? e.uid : "", n, r, i);
    }, t2.prototype.checkEmpty = function(t3) {
      var e = true, n = IDBKeyRange.bound([this.userId, Number.NEGATIVE_INFINITY], [this.userId, Number.POSITIVE_INFINITY]);
      return si(t3).$t({
        index: ir.userMutationsIndex,
        range: n
      }, function(t4, n2, r) {
        e = false, r.done();
      }).next(function() {
        return e;
      });
    }, t2.prototype.addMutationBatch = function(t3, e, n, r) {
      var i = this, o = ui(t3), s = si(t3);
      return s.add({}).next(function(u) {
        P2("number" == typeof u);
        for (var a = new Lr(u, e, n, r), c = function(t4, e2, n2) {
          var r2 = n2.baseMutations.map(function(e3) {
            return Pn(t4.Lt, e3);
          }), i2 = n2.mutations.map(function(e3) {
            return Pn(t4.Lt, e3);
          });
          return new ir(e2, n2.batchId, n2.localWriteTime.toMillis(), r2, i2);
        }(i.R, i.userId, a), h = [], f = new $e(function(t4, e2) {
          return q2(t4.canonicalString(), e2.canonicalString());
        }), l2 = 0, d = r; l2 < d.length; l2++) {
          var p2 = d[l2], y2 = or.key(i.userId, p2.key.path, u);
          f = f.add(p2.key.path.popLast()), h.push(s.put(c)), h.push(o.put(y2, or.PLACEHOLDER));
        }
        return f.forEach(function(e2) {
          h.push(i.Ut.addToCollectionParentIndex(t3, e2));
        }), t3.addOnCommittedListener(function() {
          i.Kt[u] = a.keys();
        }), Ir.waitFor(h).next(function() {
          return a;
        });
      });
    }, t2.prototype.lookupMutationBatch = function(t3, e) {
      var n = this;
      return si(t3).get(e).next(function(t4) {
        return t4 ? (P2(t4.userId === n.userId), Kr(n.R, t4)) : null;
      });
    }, /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    t2.prototype.jt = function(t3, e) {
      var n = this;
      return this.Kt[e] ? Ir.resolve(this.Kt[e]) : this.lookupMutationBatch(t3, e).next(function(t4) {
        if (t4) {
          var r = t4.keys();
          return n.Kt[e] = r, r;
        }
        return null;
      });
    }, t2.prototype.getNextMutationBatchAfterBatchId = function(t3, e) {
      var n = this, r = e + 1, i = IDBKeyRange.lowerBound([this.userId, r]), o = null;
      return si(t3).$t({
        index: ir.userMutationsIndex,
        range: i
      }, function(t4, e2, i2) {
        e2.userId === n.userId && (P2(e2.batchId >= r), o = Kr(n.R, e2)), i2.done();
      }).next(function() {
        return o;
      });
    }, t2.prototype.getHighestUnacknowledgedBatchId = function(t3) {
      var e = IDBKeyRange.upperBound([this.userId, Number.POSITIVE_INFINITY]), n = -1;
      return si(t3).$t({
        index: ir.userMutationsIndex,
        range: e,
        reverse: true
      }, function(t4, e2, r) {
        n = e2.batchId, r.done();
      }).next(function() {
        return n;
      });
    }, t2.prototype.getAllMutationBatches = function(t3) {
      var e = this, n = IDBKeyRange.bound([this.userId, -1], [this.userId, Number.POSITIVE_INFINITY]);
      return si(t3).Nt(ir.userMutationsIndex, n).next(function(t4) {
        return t4.map(function(t5) {
          return Kr(e.R, t5);
        });
      });
    }, t2.prototype.getAllMutationBatchesAffectingDocumentKey = function(t3, e) {
      var n = this, r = or.prefixForPath(this.userId, e.path), i = IDBKeyRange.lowerBound(r), o = [];
      return ui(t3).$t({
        range: i
      }, function(r2, i2, s) {
        var u = r2[0], a = r2[1], c = r2[2], h = tr(a);
        if (u === n.userId && e.path.isEqual(h))
          return si(t3).get(c).next(function(t4) {
            if (!t4) throw O2();
            P2(t4.userId === n.userId), o.push(Kr(n.R, t4));
          });
        s.done();
      }).next(function() {
        return o;
      });
    }, t2.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t3, e) {
      var n = this, r = new $e(q2), i = [];
      return e.forEach(function(e2) {
        var o = or.prefixForPath(n.userId, e2.path), s = IDBKeyRange.lowerBound(o), u = ui(t3).$t({
          range: s
        }, function(t4, i2, o2) {
          var s2 = t4[0], u2 = t4[1], a = t4[2], c = tr(u2);
          s2 === n.userId && e2.path.isEqual(c) ? r = r.add(a) : o2.done();
        });
        i.push(u);
      }), Ir.waitFor(i).next(function() {
        return n.Wt(t3, r);
      });
    }, t2.prototype.getAllMutationBatchesAffectingQuery = function(t3, e) {
      var n = this, r = e.path, i = r.length + 1, o = or.prefixForPath(this.userId, r), s = IDBKeyRange.lowerBound(o), u = new $e(q2);
      return ui(t3).$t({
        range: s
      }, function(t4, e2, o2) {
        var s2 = t4[0], a = t4[1], c = t4[2], h = tr(a);
        s2 === n.userId && r.isPrefixOf(h) ? (
          // Rows with document keys more than one segment longer than the
          // query path can't be matches. For example, a query on 'rooms'
          // can't match the document /rooms/abc/messages/xyx.
          // TODO(mcg): we'll need a different scanner when we implement
          // ancestor queries.
          h.length === i && (u = u.add(c))
        ) : o2.done();
      }).next(function() {
        return n.Wt(t3, u);
      });
    }, t2.prototype.Wt = function(t3, e) {
      var n = this, r = [], i = [];
      return e.forEach(function(e2) {
        i.push(si(t3).get(e2).next(function(t4) {
          if (null === t4) throw O2();
          P2(t4.userId === n.userId), r.push(Kr(n.R, t4));
        }));
      }), Ir.waitFor(i).next(function() {
        return r;
      });
    }, t2.prototype.removeMutationBatch = function(t3, e) {
      var n = this;
      return ni(t3.Mt, this.userId, e).next(function(r) {
        return t3.addOnCommittedListener(function() {
          n.Gt(e.batchId);
        }), Ir.forEach(r, function(e2) {
          return n.referenceDelegate.markPotentiallyOrphaned(t3, e2);
        });
      });
    }, /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    // PORTING NOTE: Multi-tab only
    t2.prototype.Gt = function(t3) {
      delete this.Kt[t3];
    }, t2.prototype.performConsistencyCheck = function(t3) {
      var e = this;
      return this.checkEmpty(t3).next(function(n) {
        if (!n) return Ir.resolve();
        var r = IDBKeyRange.lowerBound(or.prefixForUser(e.userId)), i = [];
        return ui(t3).$t({
          range: r
        }, function(t4, n2, r2) {
          if (t4[0] === e.userId) {
            var o = tr(t4[1]);
            i.push(o);
          } else r2.done();
        }).next(function() {
          P2(0 === i.length);
        });
      });
    }, t2.prototype.containsKey = function(t3, e) {
      return oi(t3, this.userId, e);
    }, // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    t2.prototype.zt = function(t3) {
      var e = this;
      return ai(t3).get(this.userId).next(function(t4) {
        return t4 || new rr(
          e.userId,
          -1,
          /*lastStreamToken=*/
          ""
        );
      });
    }, t2;
  }()
);
function oi(t2, e, n) {
  var r = or.prefixForPath(e, n.path), i = r[1], o = IDBKeyRange.lowerBound(r), s = false;
  return ui(t2).$t({
    range: o,
    Ft: true
  }, function(t3, n2, r2) {
    var o2 = t3[0], u = t3[1];
    t3[2], o2 === e && u === i && (s = true), r2.done();
  }).next(function() {
    return s;
  });
}
function si(t2) {
  return Rr(t2, ir.store);
}
function ui(t2) {
  return Rr(t2, or.store);
}
function ai(t2) {
  return Rr(t2, rr.store);
}
var ci = (
  /** @class */
  function() {
    function t2(t3) {
      this.Ht = t3;
    }
    return t2.prototype.next = function() {
      return this.Ht += 2, this.Ht;
    }, t2.Jt = function() {
      return new t2(0);
    }, t2.Yt = function() {
      return new t2(-1);
    }, t2;
  }()
);
var hi = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.referenceDelegate = t3, this.R = e;
    }
    return t2.prototype.allocateTargetId = function(t3) {
      var e = this;
      return this.Xt(t3).next(function(n) {
        var r = new ci(n.highestTargetId);
        return n.highestTargetId = r.next(), e.Zt(t3, n).next(function() {
          return n.highestTargetId;
        });
      });
    }, t2.prototype.getLastRemoteSnapshotVersion = function(t3) {
      return this.Xt(t3).next(function(t4) {
        return K2.fromTimestamp(new j(t4.lastRemoteSnapshotVersion.seconds, t4.lastRemoteSnapshotVersion.nanoseconds));
      });
    }, t2.prototype.getHighestSequenceNumber = function(t3) {
      return this.Xt(t3).next(function(t4) {
        return t4.highestListenSequenceNumber;
      });
    }, t2.prototype.setTargetsMetadata = function(t3, e, n) {
      var r = this;
      return this.Xt(t3).next(function(i) {
        return i.highestListenSequenceNumber = e, n && (i.lastRemoteSnapshotVersion = n.toTimestamp()), e > i.highestListenSequenceNumber && (i.highestListenSequenceNumber = e), r.Zt(t3, i);
      });
    }, t2.prototype.addTargetData = function(t3, e) {
      var n = this;
      return this.te(t3, e).next(function() {
        return n.Xt(t3).next(function(r) {
          return r.targetCount += 1, n.ee(e, r), n.Zt(t3, r);
        });
      });
    }, t2.prototype.updateTargetData = function(t3, e) {
      return this.te(t3, e);
    }, t2.prototype.removeTargetData = function(t3, e) {
      var n = this;
      return this.removeMatchingKeysForTargetId(t3, e.targetId).next(function() {
        return fi(t3).delete(e.targetId);
      }).next(function() {
        return n.Xt(t3);
      }).next(function(e2) {
        return P2(e2.targetCount > 0), e2.targetCount -= 1, n.Zt(t3, e2);
      });
    }, /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    t2.prototype.removeTargets = function(t3, e, n) {
      var r = this, i = 0, o = [];
      return fi(t3).$t(function(s, u) {
        var a = Gr(u);
        a.sequenceNumber <= e && null === n.get(a.targetId) && (i++, o.push(r.removeTargetData(t3, a)));
      }).next(function() {
        return Ir.waitFor(o);
      }).next(function() {
        return i;
      });
    }, /**
     * Call provided function with each `TargetData` that we have cached.
     */
    t2.prototype.forEachTarget = function(t3, e) {
      return fi(t3).$t(function(t4, n) {
        var r = Gr(n);
        e(r);
      });
    }, t2.prototype.Xt = function(t3) {
      return li(t3).get(lr.key).next(function(t4) {
        return P2(null !== t4), t4;
      });
    }, t2.prototype.Zt = function(t3, e) {
      return li(t3).put(lr.key, e);
    }, t2.prototype.te = function(t3, e) {
      return fi(t3).put(Qr(this.R, e));
    }, /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    t2.prototype.ee = function(t3, e) {
      var n = false;
      return t3.targetId > e.highestTargetId && (e.highestTargetId = t3.targetId, n = true), t3.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t3.sequenceNumber, n = true), n;
    }, t2.prototype.getTargetCount = function(t3) {
      return this.Xt(t3).next(function(t4) {
        return t4.targetCount;
      });
    }, t2.prototype.getTargetData = function(t3, e) {
      var n = kt(e), r = IDBKeyRange.bound([n, Number.NEGATIVE_INFINITY], [n, Number.POSITIVE_INFINITY]), i = null;
      return fi(t3).$t({
        range: r,
        index: hr.queryTargetsIndexName
      }, function(t4, n2, r2) {
        var o = Gr(n2);
        Ct(e, o.target) && (i = o, r2.done());
      }).next(function() {
        return i;
      });
    }, t2.prototype.addMatchingKeys = function(t3, e, n) {
      var r = this, i = [], o = di(t3);
      return e.forEach(function(e2) {
        var s = Xn(e2.path);
        i.push(o.put(new fr(n, s))), i.push(r.referenceDelegate.addReference(t3, n, e2));
      }), Ir.waitFor(i);
    }, t2.prototype.removeMatchingKeys = function(t3, e, n) {
      var r = this, i = di(t3);
      return Ir.forEach(e, function(e2) {
        var o = Xn(e2.path);
        return Ir.waitFor([i.delete([n, o]), r.referenceDelegate.removeReference(t3, n, e2)]);
      });
    }, t2.prototype.removeMatchingKeysForTargetId = function(t3, e) {
      var n = di(t3), r = IDBKeyRange.bound(
        [e],
        [e + 1],
        /*lowerOpen=*/
        false,
        /*upperOpen=*/
        true
      );
      return n.delete(r);
    }, t2.prototype.getMatchingKeysForTargetId = function(t3, e) {
      var n = IDBKeyRange.bound(
        [e],
        [e + 1],
        /*lowerOpen=*/
        false,
        /*upperOpen=*/
        true
      ), r = di(t3), i = sn();
      return r.$t({
        range: n,
        Ft: true
      }, function(t4, e2, n2) {
        var r2 = tr(t4[1]), o = new ct(r2);
        i = i.add(o);
      }).next(function() {
        return i;
      });
    }, t2.prototype.containsKey = function(t3, e) {
      var n = Xn(e.path), r = IDBKeyRange.bound(
        [n],
        [B2(n)],
        /*lowerOpen=*/
        false,
        /*upperOpen=*/
        true
      ), i = 0;
      return di(t3).$t({
        index: fr.documentTargetsIndex,
        Ft: true,
        range: r
      }, function(t4, e2, n2) {
        var r2 = t4[0];
        t4[1], // Having a sentinel row for a document does not count as containing that document;
        // For the target cache, containing the document means the document is part of some
        // target.
        0 !== r2 && (i++, n2.done());
      }).next(function() {
        return i > 0;
      });
    }, /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId - The target ID of the TargetData entry to look up.
     * @returns The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    // PORTING NOTE: Multi-tab only.
    t2.prototype.lt = function(t3, e) {
      return fi(t3).get(e).next(function(t4) {
        return t4 ? Gr(t4) : null;
      });
    }, t2;
  }()
);
function fi(t2) {
  return Rr(t2, hr.store);
}
function li(t2) {
  return Rr(t2, lr.store);
}
function di(t2) {
  return Rr(t2, fr.store);
}
function pi(t2) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(e) {
      if (t2.code !== N2.FAILED_PRECONDITION || t2.message !== gr) throw t2;
      return C2("LocalStore", "Unexpectedly lost primary lease"), [
        2
        /*return*/
      ];
    });
  });
}
function yi(t2, e) {
  var n = t2[0], r = t2[1], i = e[0], o = e[1], s = q2(n, i);
  return 0 === s ? q2(r, o) : s;
}
var vi = (
  /** @class */
  function() {
    function t2(t3) {
      this.ne = t3, this.buffer = new $e(yi), this.se = 0;
    }
    return t2.prototype.ie = function() {
      return ++this.se;
    }, t2.prototype.re = function(t3) {
      var e = [t3, this.ie()];
      if (this.buffer.size < this.ne) this.buffer = this.buffer.add(e);
      else {
        var n = this.buffer.last();
        yi(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e));
      }
    }, Object.defineProperty(t2.prototype, "maxValue", {
      get: function() {
        return this.buffer.last()[0];
      },
      enumerable: false,
      configurable: true
    }), t2;
  }()
);
var mi = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.garbageCollector = t3, this.asyncQueue = e, this.oe = false, this.ce = null;
    }
    return t2.prototype.start = function(t3) {
      -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.ue(t3);
    }, t2.prototype.stop = function() {
      this.ce && (this.ce.cancel(), this.ce = null);
    }, Object.defineProperty(t2.prototype, "started", {
      get: function() {
        return null !== this.ce;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.ue = function(t3) {
      var e = this, i = this.oe ? 3e5 : 6e4;
      C2("LruGarbageCollector", "Garbage collection scheduled in " + i + "ms"), this.ce = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection", i, function() {
        return __awaiter(e, void 0, void 0, function() {
          var e2;
          return __generator(this, function(n) {
            switch (n.label) {
              case 0:
                this.ce = null, this.oe = true, n.label = 1;
              case 1:
                return n.trys.push([1, 3, , 7]), [4, t3.collectGarbage(this.garbageCollector)];
              case 2:
                return n.sent(), [3, 7];
              case 3:
                return Nr(e2 = n.sent()) ? (C2("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", e2), [3, 6]) : [3, 4];
              case 4:
                return [4, pi(e2)];
              case 5:
                n.sent(), n.label = 6;
              case 6:
                return [3, 7];
              case 7:
                return [4, this.ue(t3)];
              case 8:
                return n.sent(), [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
    }, t2;
  }()
);
var gi = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.ae = t3, this.params = e;
    }
    return t2.prototype.calculateTargetCount = function(t3, e) {
      return this.ae.he(t3).next(function(t4) {
        return Math.floor(e / 100 * t4);
      });
    }, t2.prototype.nthSequenceNumber = function(t3, e) {
      var n = this;
      if (0 === e) return Ir.resolve(S2.o);
      var r = new vi(e);
      return this.ae.forEachTarget(t3, function(t4) {
        return r.re(t4.sequenceNumber);
      }).next(function() {
        return n.ae.le(t3, function(t4) {
          return r.re(t4);
        });
      }).next(function() {
        return r.maxValue;
      });
    }, t2.prototype.removeTargets = function(t3, e, n) {
      return this.ae.removeTargets(t3, e, n);
    }, t2.prototype.removeOrphanedDocuments = function(t3, e) {
      return this.ae.removeOrphanedDocuments(t3, e);
    }, t2.prototype.collect = function(t3, e) {
      var n = this;
      return -1 === this.params.cacheSizeCollectionThreshold ? (C2("LruGarbageCollector", "Garbage collection skipped; disabled"), Ir.resolve(ti)) : this.getCacheSize(t3).next(function(r) {
        return r < n.params.cacheSizeCollectionThreshold ? (C2("LruGarbageCollector", "Garbage collection skipped; Cache size " + r + " is lower than threshold " + n.params.cacheSizeCollectionThreshold), ti) : n.fe(t3, e);
      });
    }, t2.prototype.getCacheSize = function(t3) {
      return this.ae.getCacheSize(t3);
    }, t2.prototype.fe = function(t3, e) {
      var n, r, i, o, s, u, a, c = this, h = Date.now();
      return this.calculateTargetCount(t3, this.params.percentileToCollect).next(function(e2) {
        return e2 > c.params.maximumSequenceNumbersToCollect ? (C2("LruGarbageCollector", "Capping sequence numbers to collect down to the maximum of " + c.params.maximumSequenceNumbersToCollect + " from " + e2), r = c.params.maximumSequenceNumbersToCollect) : r = e2, o = Date.now(), c.nthSequenceNumber(t3, r);
      }).next(function(r2) {
        return n = r2, s = Date.now(), c.removeTargets(t3, n, e);
      }).next(function(e2) {
        return i = e2, u = Date.now(), c.removeOrphanedDocuments(t3, n);
      }).next(function(t4) {
        return a = Date.now(), k2() <= LogLevel.DEBUG && C2("LruGarbageCollector", "LRU Garbage Collection\n	Counted targets in " + (o - h) + "ms\n	Determined least recently used " + r + " in " + (s - o) + "ms\n	Removed " + i + " targets in " + (u - s) + "ms\n	Removed " + t4 + " documents in " + (a - u) + "ms\nTotal Duration: " + (a - h) + "ms"), Ir.resolve({
          didRun: true,
          sequenceNumbersCollected: r,
          targetsRemoved: i,
          documentsRemoved: t4
        });
      });
    }, t2;
  }()
);
var wi = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.db = t3, this.garbageCollector = function(t4, e2) {
        return new gi(t4, e2);
      }(this, e);
    }
    return t2.prototype.he = function(t3) {
      var e = this.de(t3);
      return this.db.getTargetCache().getTargetCount(t3).next(function(t4) {
        return e.next(function(e2) {
          return t4 + e2;
        });
      });
    }, t2.prototype.de = function(t3) {
      var e = 0;
      return this.le(t3, function(t4) {
        e++;
      }).next(function() {
        return e;
      });
    }, t2.prototype.forEachTarget = function(t3, e) {
      return this.db.getTargetCache().forEachTarget(t3, e);
    }, t2.prototype.le = function(t3, e) {
      return this.we(t3, function(t4, n) {
        return e(n);
      });
    }, t2.prototype.addReference = function(t3, e, n) {
      return bi(t3, n);
    }, t2.prototype.removeReference = function(t3, e, n) {
      return bi(t3, n);
    }, t2.prototype.removeTargets = function(t3, e, n) {
      return this.db.getTargetCache().removeTargets(t3, e, n);
    }, t2.prototype.markPotentiallyOrphaned = function(t3, e) {
      return bi(t3, e);
    }, /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */
    t2.prototype._e = function(t3, e) {
      return function(t4, e2) {
        var n = false;
        return ai(t4).Ot(function(r) {
          return oi(t4, r, e2).next(function(t5) {
            return t5 && (n = true), Ir.resolve(!t5);
          });
        }).next(function() {
          return n;
        });
      }(t3, e);
    }, t2.prototype.removeOrphanedDocuments = function(t3, e) {
      var n = this, r = this.db.getRemoteDocumentCache().newChangeBuffer(), i = [], o = 0;
      return this.we(t3, function(s, u) {
        if (u <= e) {
          var a = n._e(t3, s).next(function(e2) {
            if (!e2)
              return o++, r.getEntry(t3, s).next(function() {
                return r.removeEntry(s), di(t3).delete([0, Xn(s.path)]);
              });
          });
          i.push(a);
        }
      }).next(function() {
        return Ir.waitFor(i);
      }).next(function() {
        return r.apply(t3);
      }).next(function() {
        return o;
      });
    }, t2.prototype.removeTarget = function(t3, e) {
      var n = e.withSequenceNumber(t3.currentSequenceNumber);
      return this.db.getTargetCache().updateTargetData(t3, n);
    }, t2.prototype.updateLimboDocument = function(t3, e) {
      return bi(t3, e);
    }, /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    t2.prototype.we = function(t3, e) {
      var n, r = di(t3), i = S2.o;
      return r.$t({
        index: fr.documentTargetsIndex
      }, function(t4, r2) {
        var o = t4[0];
        t4[1];
        var s = r2.path, u = r2.sequenceNumber;
        0 === o ? (
          // if nextToReport is valid, report it, this is a new key so the
          // last one must not be a member of any targets.
          (i !== S2.o && e(new ct(tr(n)), i), // set nextToReport to be this sequence number. It's the next one we
          // might report, if we don't find any targets for this document.
          // Note that the sequence number must be defined when the targetId
          // is 0.
          i = u, n = s)
        ) : (
          // set nextToReport to be invalid, we know we don't need to report
          // this one since we found a target for it.
          i = S2.o
        );
      }).next(function() {
        i !== S2.o && e(new ct(tr(n)), i);
      });
    }, t2.prototype.getCacheSize = function(t3) {
      return this.db.getRemoteDocumentCache().getSize(t3);
    }, t2;
  }()
);
function bi(t2, e) {
  return di(t2).put(
    /**
    * @returns A value suitable for writing a sentinel row in the target-document
    * store.
    */
    function(t3, e2) {
      return new fr(0, Xn(t3.path), e2);
    }(e, t2.currentSequenceNumber)
  );
}
var Ii = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.mapKeyFn = t3, this.equalsFn = e, /**
           * The inner map for a key/value pair. Due to the possibility of collisions we
           * keep a list of entries that we do a linear search through to find an actual
           * match. Note that collisions should be rare, so we still expect near
           * constant time lookups in practice.
           */
      this.inner = {};
    }
    return t2.prototype.get = function(t3) {
      var e = this.mapKeyFn(t3), n = this.inner[e];
      if (void 0 !== n) for (var r = 0, i = n; r < i.length; r++) {
        var o = i[r], s = o[0], u = o[1];
        if (this.equalsFn(s, t3)) return u;
      }
    }, t2.prototype.has = function(t3) {
      return void 0 !== this.get(t3);
    }, /** Put this key and value in the map. */
    t2.prototype.set = function(t3, e) {
      var n = this.mapKeyFn(t3), r = this.inner[n];
      if (void 0 !== r) {
        for (var i = 0; i < r.length; i++) if (this.equalsFn(r[i][0], t3)) return void (r[i] = [t3, e]);
        r.push([t3, e]);
      } else this.inner[n] = [[t3, e]];
    }, /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */
    t2.prototype.delete = function(t3) {
      var e = this.mapKeyFn(t3), n = this.inner[e];
      if (void 0 === n) return false;
      for (var r = 0; r < n.length; r++) if (this.equalsFn(n[r][0], t3)) return 1 === n.length ? delete this.inner[e] : n.splice(r, 1), true;
      return false;
    }, t2.prototype.forEach = function(t3) {
      Q2(this.inner, function(e, n) {
        for (var r = 0, i = n; r < i.length; r++) {
          var o = i[r], s = o[0], u = o[1];
          t3(s, u);
        }
      });
    }, t2.prototype.isEmpty = function() {
      return z2(this.inner);
    }, t2;
  }()
);
var Ti = (
  /** @class */
  function() {
    function t2() {
      this.changes = new Ii(function(t3) {
        return t3.toString();
      }, function(t3, e) {
        return t3.isEqual(e);
      }), this.changesApplied = false;
    }
    return t2.prototype.getReadTime = function(t3) {
      var e = this.changes.get(t3);
      return e ? e.readTime : K2.min();
    }, /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t2.prototype.addEntry = function(t3, e) {
      this.assertNotApplied(), this.changes.set(t3.key, {
        document: t3,
        readTime: e
      });
    }, /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t2.prototype.removeEntry = function(t3, e) {
      void 0 === e && (e = null), this.assertNotApplied(), this.changes.set(t3, {
        document: Nt.newInvalidDocument(t3),
        readTime: e
      });
    }, /**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document or an invalid document if we have nothing
     * cached.
     */
    t2.prototype.getEntry = function(t3, e) {
      this.assertNotApplied();
      var n = this.changes.get(e);
      return void 0 !== n ? Ir.resolve(n.document) : this.getFromCache(t3, e);
    }, /**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys - The keys of the entries to look up.
     * @returns A map of cached documents, indexed by key. If an entry cannot be
     *     found, the corresponding key will be mapped to an invalid document.
     */
    t2.prototype.getEntries = function(t3, e) {
      return this.getAllFromCache(t3, e);
    }, /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */
    t2.prototype.apply = function(t3) {
      return this.assertNotApplied(), this.changesApplied = true, this.applyChanges(t3);
    }, /** Helper to assert this.changes is not null  */
    t2.prototype.assertNotApplied = function() {
    }, t2;
  }()
);
var _i = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.R = t3, this.Ut = e;
    }
    return t2.prototype.addEntry = function(t3, e, n) {
      return Ni(t3).put(Di(e), n);
    }, /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    t2.prototype.removeEntry = function(t3, e) {
      var n = Ni(t3), r = Di(e);
      return n.delete(r);
    }, /**
     * Updates the current cache size.
     *
     * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
     * cache's metadata.
     */
    t2.prototype.updateMetadata = function(t3, e) {
      var n = this;
      return this.getMetadata(t3).next(function(r) {
        return r.byteSize += e, n.me(t3, r);
      });
    }, t2.prototype.getEntry = function(t3, e) {
      var n = this;
      return Ni(t3).get(Di(e)).next(function(t4) {
        return n.ye(e, t4);
      });
    }, /**
     * Looks up an entry in the cache.
     *
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document entry and its size.
     */
    t2.prototype.ge = function(t3, e) {
      var n = this;
      return Ni(t3).get(Di(e)).next(function(t4) {
        return {
          document: n.ye(e, t4),
          size: ri(t4)
        };
      });
    }, t2.prototype.getEntries = function(t3, e) {
      var n = this, r = Ze();
      return this.pe(t3, e, function(t4, e2) {
        var i = n.ye(t4, e2);
        r = r.insert(t4, i);
      }).next(function() {
        return r;
      });
    }, /**
     * Looks up several entries in the cache.
     *
     * @param documentKeys - The set of keys entries to look up.
     * @returns A map of documents indexed by key and a map of sizes indexed by
     *     key (zero if the document does not exist).
     */
    t2.prototype.Ee = function(t3, e) {
      var n = this, r = Ze(), i = new We(ct.comparator);
      return this.pe(t3, e, function(t4, e2) {
        var o = n.ye(t4, e2);
        r = r.insert(t4, o), i = i.insert(t4, ri(e2));
      }).next(function() {
        return {
          documents: r,
          Te: i
        };
      });
    }, t2.prototype.pe = function(t3, e, n) {
      if (e.isEmpty()) return Ir.resolve();
      var r = IDBKeyRange.bound(e.first().path.toArray(), e.last().path.toArray()), i = e.getIterator(), o = i.getNext();
      return Ni(t3).$t({
        range: r
      }, function(t4, e2, r2) {
        for (var s = ct.fromSegments(t4); o && ct.comparator(o, s) < 0; ) n(o, null), o = i.getNext();
        o && o.isEqual(s) && // Key found in cache.
        (n(o, e2), o = i.hasNext() ? i.getNext() : null), // Skip to the next key (if there is one).
        o ? r2.Ct(o.path.toArray()) : r2.done();
      }).next(function() {
        for (; o; ) n(o, null), o = i.hasNext() ? i.getNext() : null;
      });
    }, t2.prototype.getDocumentsMatchingQuery = function(t3, e, n) {
      var r = this, i = Ze(), o = e.path.length + 1, s = {};
      if (n.isEqual(K2.min())) {
        var u = e.path.toArray();
        s.range = IDBKeyRange.lowerBound(u);
      } else {
        var a = e.path.toArray(), c = qr(n);
        s.range = IDBKeyRange.lowerBound(
          [a, c],
          /* open= */
          true
        ), s.index = ar.collectionReadTimeIndex;
      }
      return Ni(t3).$t(s, function(t4, n2, s2) {
        if (t4.length === o) {
          var u2 = Mr(r.R, n2);
          e.path.isPrefixOf(u2.key.path) ? ue(e, u2) && (i = i.insert(u2.key, u2)) : s2.done();
        }
      }).next(function() {
        return i;
      });
    }, t2.prototype.newChangeBuffer = function(t3) {
      return new Ei(this, !!t3 && t3.trackRemovals);
    }, t2.prototype.getSize = function(t3) {
      return this.getMetadata(t3).next(function(t4) {
        return t4.byteSize;
      });
    }, t2.prototype.getMetadata = function(t3) {
      return Si(t3).get(cr.key).next(function(t4) {
        return P2(!!t4), t4;
      });
    }, t2.prototype.me = function(t3, e) {
      return Si(t3).put(cr.key, e);
    }, /**
     * Decodes `remoteDoc` and returns the document (or null, if the document
     * corresponds to the format used for sentinel deletes).
     */
    t2.prototype.ye = function(t3, e) {
      if (e) {
        var n = Mr(this.R, e);
        if (!n.isNoDocument() || !n.version.isEqual(K2.min())) return n;
      }
      return Nt.newInvalidDocument(t3);
    }, t2;
  }()
);
var Ei = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this) || this).Ie = t2, r.trackRemovals = n2, // A map of document sizes prior to applying the changes in this buffer.
      r.Ae = new Ii(function(t3) {
        return t3.toString();
      }, function(t3, e2) {
        return t3.isEqual(e2);
      }), r;
    }
    return __extends(n, e), n.prototype.applyChanges = function(t2) {
      var e2 = this, n2 = [], r = 0, i = new $e(function(t3, e3) {
        return q2(t3.canonicalString(), e3.canonicalString());
      });
      return this.changes.forEach(function(o, s) {
        var u = e2.Ae.get(o);
        if (s.document.isValidDocument()) {
          var a = Vr(e2.Ie.R, s.document, e2.getReadTime(o));
          i = i.add(o.path.popLast());
          var c = ri(a);
          r += c - u, n2.push(e2.Ie.addEntry(t2, o, a));
        } else if (r -= u, e2.trackRemovals) {
          var h = Vr(e2.Ie.R, Nt.newNoDocument(o, K2.min()), e2.getReadTime(o));
          n2.push(e2.Ie.addEntry(t2, o, h));
        } else n2.push(e2.Ie.removeEntry(t2, o));
      }), i.forEach(function(r2) {
        n2.push(e2.Ie.Ut.addToCollectionParentIndex(t2, r2));
      }), n2.push(this.Ie.updateMetadata(t2, r)), Ir.waitFor(n2);
    }, n.prototype.getFromCache = function(t2, e2) {
      var n2 = this;
      return this.Ie.ge(t2, e2).next(function(t3) {
        return n2.Ae.set(e2, t3.size), t3.document;
      });
    }, n.prototype.getAllFromCache = function(t2, e2) {
      var n2 = this;
      return this.Ie.Ee(t2, e2).next(function(t3) {
        var e3 = t3.documents;
        return t3.Te.forEach(function(t4, e4) {
          n2.Ae.set(t4, e4);
        }), e3;
      });
    }, n;
  }(Ti)
);
function Si(t2) {
  return Rr(t2, cr.store);
}
function Ni(t2) {
  return Rr(t2, ar.store);
}
function Di(t2) {
  return t2.path.toArray();
}
var Ai = (
  /** @class */
  function() {
    function t2(t3) {
      this.R = t3;
    }
    return t2.prototype.Rt = function(t3, e, n, r) {
      var i = this;
      P2(n < r && n >= 0 && r <= 11);
      var o = new Tr("createOrUpgrade", e);
      n < 1 && r >= 1 && (function(t4) {
        t4.createObjectStore(nr.store);
      }(t3), function(t4) {
        t4.createObjectStore(rr.store, {
          keyPath: rr.keyPath
        }), t4.createObjectStore(ir.store, {
          keyPath: ir.keyPath,
          autoIncrement: true
        }).createIndex(ir.userMutationsIndex, ir.userMutationsKeyPath, {
          unique: true
        }), t4.createObjectStore(or.store);
      }(t3), ki(t3), function(t4) {
        t4.createObjectStore(ar.store);
      }(t3));
      var s = Ir.resolve();
      return n < 3 && r >= 3 && // Brand new clients don't need to drop and recreate--only clients that
      // potentially have corrupt data.
      (0 !== n && (function(t4) {
        t4.deleteObjectStore(fr.store), t4.deleteObjectStore(hr.store), t4.deleteObjectStore(lr.store);
      }(t3), ki(t3)), s = s.next(function() {
        return function(t4) {
          var e2 = t4.store(lr.store), n2 = new lr(
            /*highestTargetId=*/
            0,
            /*lastListenSequenceNumber=*/
            0,
            K2.min().toTimestamp(),
            /*targetCount=*/
            0
          );
          return e2.put(lr.key, n2);
        }(o);
      })), n < 4 && r >= 4 && (0 !== n && // Schema version 3 uses auto-generated keys to generate globally unique
      // mutation batch IDs (this was previously ensured internally by the
      // client). To migrate to the new schema, we have to read all mutations
      // and write them back out. We preserve the existing batch IDs to guarantee
      // consistency with other object stores. Any further mutation batch IDs will
      // be auto-generated.
      (s = s.next(function() {
        return function(t4, e2) {
          return e2.store(ir.store).Nt().next(function(n2) {
            t4.deleteObjectStore(ir.store), t4.createObjectStore(ir.store, {
              keyPath: ir.keyPath,
              autoIncrement: true
            }).createIndex(ir.userMutationsIndex, ir.userMutationsKeyPath, {
              unique: true
            });
            var r2 = e2.store(ir.store), i2 = n2.map(function(t5) {
              return r2.put(t5);
            });
            return Ir.waitFor(i2);
          });
        }(t3, o);
      })), s = s.next(function() {
        !function(t4) {
          t4.createObjectStore(pr.store, {
            keyPath: pr.keyPath
          });
        }(t3);
      })), n < 5 && r >= 5 && (s = s.next(function() {
        return i.Re(o);
      })), n < 6 && r >= 6 && (s = s.next(function() {
        return function(t4) {
          t4.createObjectStore(cr.store);
        }(t3), i.be(o);
      })), n < 7 && r >= 7 && (s = s.next(function() {
        return i.ve(o);
      })), n < 8 && r >= 8 && (s = s.next(function() {
        return i.Pe(t3, o);
      })), n < 9 && r >= 9 && (s = s.next(function() {
        !function(t4) {
          t4.objectStoreNames.contains("remoteDocumentChanges") && t4.deleteObjectStore("remoteDocumentChanges");
        }(t3), function(t4) {
          var e2 = t4.objectStore(ar.store);
          e2.createIndex(ar.readTimeIndex, ar.readTimeIndexPath, {
            unique: false
          }), e2.createIndex(ar.collectionReadTimeIndex, ar.collectionReadTimeIndexPath, {
            unique: false
          });
        }(e);
      })), n < 10 && r >= 10 && (s = s.next(function() {
        return i.Ve(o);
      })), n < 11 && r >= 11 && (s = s.next(function() {
        !function(t4) {
          t4.createObjectStore(yr.store, {
            keyPath: yr.keyPath
          });
        }(t3), function(t4) {
          t4.createObjectStore(vr.store, {
            keyPath: vr.keyPath
          });
        }(t3);
      })), s;
    }, t2.prototype.be = function(t3) {
      var e = 0;
      return t3.store(ar.store).$t(function(t4, n) {
        e += ri(n);
      }).next(function() {
        var n = new cr(e);
        return t3.store(cr.store).put(cr.key, n);
      });
    }, t2.prototype.Re = function(t3) {
      var e = this, n = t3.store(rr.store), r = t3.store(ir.store);
      return n.Nt().next(function(n2) {
        return Ir.forEach(n2, function(n3) {
          var i = IDBKeyRange.bound([n3.userId, -1], [n3.userId, n3.lastAcknowledgedBatchId]);
          return r.Nt(ir.userMutationsIndex, i).next(function(r2) {
            return Ir.forEach(r2, function(r3) {
              P2(r3.userId === n3.userId);
              var i2 = Kr(e.R, r3);
              return ni(t3, n3.userId, i2).next(function() {
              });
            });
          });
        });
      });
    }, /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */
    t2.prototype.ve = function(t3) {
      var e = t3.store(fr.store), n = t3.store(ar.store);
      return t3.store(lr.store).get(lr.key).next(function(t4) {
        var r = [];
        return n.$t(function(n2, i) {
          var o = new H2(n2), s = function(t5) {
            return [0, Xn(t5)];
          }(o);
          r.push(e.get(s).next(function(n3) {
            return n3 ? Ir.resolve() : function(n4) {
              return e.put(new fr(0, Xn(n4), t4.highestListenSequenceNumber));
            }(o);
          }));
        }).next(function() {
          return Ir.waitFor(r);
        });
      });
    }, t2.prototype.Pe = function(t3, e) {
      t3.createObjectStore(dr.store, {
        keyPath: dr.keyPath
      });
      var n = e.store(dr.store), r = new Xr(), i = function(t4) {
        if (r.add(t4)) {
          var e2 = t4.lastSegment(), i2 = t4.popLast();
          return n.put({
            collectionId: e2,
            parent: Xn(i2)
          });
        }
      };
      return e.store(ar.store).$t({
        Ft: true
      }, function(t4, e2) {
        var n2 = new H2(t4);
        return i(n2.popLast());
      }).next(function() {
        return e.store(or.store).$t({
          Ft: true
        }, function(t4, e2) {
          t4[0];
          var n2 = t4[1];
          t4[2];
          var r2 = tr(n2);
          return i(r2.popLast());
        });
      });
    }, t2.prototype.Ve = function(t3) {
      var e = this, n = t3.store(hr.store);
      return n.$t(function(t4, r) {
        var i = Gr(r), o = Qr(e.R, i);
        return n.put(o);
      });
    }, t2;
  }()
);
function ki(t2) {
  t2.createObjectStore(fr.store, {
    keyPath: fr.keyPath
  }).createIndex(fr.documentTargetsIndex, fr.documentTargetsKeyPath, {
    unique: true
  }), // NOTE: This is unique only because the TargetId is the suffix.
  t2.createObjectStore(hr.store, {
    keyPath: hr.keyPath
  }).createIndex(hr.queryTargetsIndexName, hr.queryTargetsKeyPath, {
    unique: true
  }), t2.createObjectStore(lr.store);
}
var Ci = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
var xi = (
  /** @class */
  function() {
    function t2(e, n, r, i, o, s, u, a, c, h) {
      if (this.allowTabSynchronization = e, this.persistenceKey = n, this.clientId = r, this.Se = o, this.window = s, this.document = u, this.De = c, this.Ce = h, this.Ne = null, this.xe = false, this.isPrimary = false, this.networkEnabled = true, /** Our window.unload handler, if registered. */
      this.ke = null, this.inForeground = false, /** Our 'visibilitychange' listener if registered. */
      this.Fe = null, /** The client metadata refresh task. */
      this.$e = null, /** The last time we garbage collected the client metadata object store. */
      this.Oe = Number.NEGATIVE_INFINITY, /** A listener to notify on primary state changes. */
      this.Me = function(t3) {
        return Promise.resolve();
      }, !t2.yt()) throw new D2(N2.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
      this.referenceDelegate = new wi(this, i), this.Le = n + "main", this.R = new Fr(a), this.Be = new _r(this.Le, 11, new Ai(this.R)), this.qe = new hi(this.referenceDelegate, this.R), this.Ut = new Jr(), this.Ue = function(t3, e2) {
        return new _i(t3, e2);
      }(this.R, this.Ut), this.Ke = new Wr(), this.window && this.window.localStorage ? this.Qe = this.window.localStorage : (this.Qe = null, false === h && x2("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
    }
    return t2.prototype.start = function() {
      var t3 = this;
      return this.je().then(function() {
        if (!t3.isPrimary && !t3.allowTabSynchronization)
          throw new D2(N2.FAILED_PRECONDITION, Ci);
        return t3.We(), t3.Ge(), t3.ze(), t3.runTransaction("getHighestListenSequenceNumber", "readonly", function(e) {
          return t3.qe.getHighestSequenceNumber(e);
        });
      }).then(function(e) {
        t3.Ne = new S2(e, t3.De);
      }).then(function() {
        t3.xe = true;
      }).catch(function(e) {
        return t3.Be && t3.Be.close(), Promise.reject(e);
      });
    }, /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t2.prototype.He = function(t3) {
      var e = this;
      return this.Me = function(i) {
        return __awaiter(e, void 0, void 0, function() {
          return __generator(this, function(e2) {
            return this.started ? [2, t3(i)] : [
              2
              /*return*/
            ];
          });
        });
      }, t3(this.isPrimary);
    }, /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t2.prototype.setDatabaseDeletedListener = function(t3) {
      var e = this;
      this.Be.vt(function(i) {
        return __awaiter(e, void 0, void 0, function() {
          return __generator(this, function(e2) {
            switch (e2.label) {
              case 0:
                return null === i.newVersion ? [4, t3()] : [3, 2];
              case 1:
                e2.sent(), e2.label = 2;
              case 2:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
    }, /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t2.prototype.setNetworkEnabled = function(t3) {
      var e = this;
      this.networkEnabled !== t3 && (this.networkEnabled = t3, // Schedule a primary lease refresh for immediate execution. The eventual
      // lease update will be propagated via `primaryStateListener`.
      this.Se.enqueueAndForget(function() {
        return __awaiter(e, void 0, void 0, function() {
          return __generator(this, function(t4) {
            switch (t4.label) {
              case 0:
                return this.started ? [4, this.je()] : [3, 2];
              case 1:
                t4.sent(), t4.label = 2;
              case 2:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }));
    }, /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */
    t2.prototype.je = function() {
      var t3 = this;
      return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", function(e) {
        return Li(e).put(new pr(t3.clientId, Date.now(), t3.networkEnabled, t3.inForeground)).next(function() {
          if (t3.isPrimary) return t3.Je(e).next(function(e2) {
            e2 || (t3.isPrimary = false, t3.Se.enqueueRetryable(function() {
              return t3.Me(false);
            }));
          });
        }).next(function() {
          return t3.Ye(e);
        }).next(function(n) {
          return t3.isPrimary && !n ? t3.Xe(e).next(function() {
            return false;
          }) : !!n && t3.Ze(e).next(function() {
            return true;
          });
        });
      }).catch(function(e) {
        if (Nr(e))
          return C2("IndexedDbPersistence", "Failed to extend owner lease: ", e), t3.isPrimary;
        if (!t3.allowTabSynchronization) throw e;
        return C2("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", e), /* isPrimary= */
        false;
      }).then(function(e) {
        t3.isPrimary !== e && t3.Se.enqueueRetryable(function() {
          return t3.Me(e);
        }), t3.isPrimary = e;
      });
    }, t2.prototype.Je = function(t3) {
      var e = this;
      return Ri(t3).get(nr.key).next(function(t4) {
        return Ir.resolve(e.tn(t4));
      });
    }, t2.prototype.en = function(t3) {
      return Li(t3).delete(this.clientId);
    }, /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */
    t2.prototype.nn = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3, e, n, i, o = this;
        return __generator(this, function(r) {
          switch (r.label) {
            case 0:
              return !this.isPrimary || this.sn(this.Oe, 18e5) ? [3, 2] : (this.Oe = Date.now(), [4, this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", function(t4) {
                var e2 = Rr(t4, pr.store);
                return e2.Nt().next(function(t5) {
                  var n2 = o.rn(t5, 18e5), r2 = t5.filter(function(t6) {
                    return -1 === n2.indexOf(t6);
                  });
                  return Ir.forEach(r2, function(t6) {
                    return e2.delete(t6.clientId);
                  }).next(function() {
                    return r2;
                  });
                });
              }).catch(function() {
                return [];
              })]);
            case 1:
              if (t3 = r.sent(), this.Qe) for (e = 0, n = t3; e < n.length; e++) i = n[e], this.Qe.removeItem(this.on(i.clientId));
              r.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */
    t2.prototype.ze = function() {
      var t3 = this;
      this.$e = this.Se.enqueueAfterDelay("client_metadata_refresh", 4e3, function() {
        return t3.je().then(function() {
          return t3.nn();
        }).then(function() {
          return t3.ze();
        });
      });
    }, /** Checks whether `client` is the local client. */
    t2.prototype.tn = function(t3) {
      return !!t3 && t3.ownerId === this.clientId;
    }, /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */
    t2.prototype.Ye = function(t3) {
      var e = this;
      return this.Ce ? Ir.resolve(true) : Ri(t3).get(nr.key).next(function(n) {
        if (null !== n && e.sn(n.leaseTimestampMs, 5e3) && !e.cn(n.ownerId)) {
          if (e.tn(n) && e.networkEnabled) return true;
          if (!e.tn(n)) {
            if (!n.allowTabSynchronization)
              throw new D2(N2.FAILED_PRECONDITION, Ci);
            return false;
          }
        }
        return !(!e.networkEnabled || !e.inForeground) || Li(t3).Nt().next(function(t4) {
          return void 0 === e.rn(t4, 5e3).find(function(t5) {
            if (e.clientId !== t5.clientId) {
              var n2 = !e.networkEnabled && t5.networkEnabled, r = !e.inForeground && t5.inForeground, i = e.networkEnabled === t5.networkEnabled;
              if (n2 || r && i) return true;
            }
            return false;
          });
        });
      }).next(function(t4) {
        return e.isPrimary !== t4 && C2("IndexedDbPersistence", "Client " + (t4 ? "is" : "is not") + " eligible for a primary lease."), t4;
      });
    }, t2.prototype.shutdown = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3 = this;
        return __generator(this, function(e) {
          switch (e.label) {
            case 0:
              return this.xe = false, this.un(), this.$e && (this.$e.cancel(), this.$e = null), this.an(), this.hn(), [4, this.Be.runTransaction("shutdown", "readwrite", [nr.store, pr.store], function(e2) {
                var n = new xr(e2, S2.o);
                return t3.Xe(n).next(function() {
                  return t3.en(n);
                });
              })];
            case 1:
              return e.sent(), this.Be.close(), // Remove the entry marking the client as zombied from LocalStorage since
              // we successfully deleted its metadata from IndexedDb.
              this.ln(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */
    t2.prototype.rn = function(t3, e) {
      var n = this;
      return t3.filter(function(t4) {
        return n.sn(t4.updateTimeMs, e) && !n.cn(t4.clientId);
      });
    }, /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t2.prototype.fn = function() {
      var t3 = this;
      return this.runTransaction("getActiveClients", "readonly", function(e) {
        return Li(e).Nt().next(function(e2) {
          return t3.rn(e2, 18e5).map(function(t4) {
            return t4.clientId;
          });
        });
      });
    }, Object.defineProperty(t2.prototype, "started", {
      get: function() {
        return this.xe;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.getMutationQueue = function(t3) {
      return ii.Qt(t3, this.R, this.Ut, this.referenceDelegate);
    }, t2.prototype.getTargetCache = function() {
      return this.qe;
    }, t2.prototype.getRemoteDocumentCache = function() {
      return this.Ue;
    }, t2.prototype.getIndexManager = function() {
      return this.Ut;
    }, t2.prototype.getBundleCache = function() {
      return this.Ke;
    }, t2.prototype.runTransaction = function(t3, e, n) {
      var r = this;
      C2("IndexedDbPersistence", "Starting transaction:", t3);
      var i, o = "readonly" === e ? "readonly" : "readwrite";
      return this.Be.runTransaction(t3, o, mr, function(o2) {
        return i = new xr(o2, r.Ne ? r.Ne.next() : S2.o), "readwrite-primary" === e ? r.Je(i).next(function(t4) {
          return !!t4 || r.Ye(i);
        }).next(function(e2) {
          if (!e2) throw x2("Failed to obtain primary lease for action '" + t3 + "'."), r.isPrimary = false, r.Se.enqueueRetryable(function() {
            return r.Me(false);
          }), new D2(N2.FAILED_PRECONDITION, gr);
          return n(i);
        }).next(function(t4) {
          return r.Ze(i).next(function() {
            return t4;
          });
        }) : r.dn(i).next(function() {
          return n(i);
        });
      }).then(function(t4) {
        return i.raiseOnCommittedEvent(), t4;
      });
    }, /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
    // be turned off.
    t2.prototype.dn = function(t3) {
      var e = this;
      return Ri(t3).get(nr.key).next(function(t4) {
        if (null !== t4 && e.sn(t4.leaseTimestampMs, 5e3) && !e.cn(t4.ownerId) && !e.tn(t4) && !(e.Ce || e.allowTabSynchronization && t4.allowTabSynchronization)) throw new D2(N2.FAILED_PRECONDITION, Ci);
      });
    }, /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    t2.prototype.Ze = function(t3) {
      var e = new nr(this.clientId, this.allowTabSynchronization, Date.now());
      return Ri(t3).put(nr.key, e);
    }, t2.yt = function() {
      return _r.yt();
    }, /** Checks the primary lease and removes it if we are the current primary. */
    t2.prototype.Xe = function(t3) {
      var e = this, n = Ri(t3);
      return n.get(nr.key).next(function(t4) {
        return e.tn(t4) ? (C2("IndexedDbPersistence", "Releasing primary lease."), n.delete(nr.key)) : Ir.resolve();
      });
    }, /** Verifies that `updateTimeMs` is within `maxAgeMs`. */
    t2.prototype.sn = function(t3, e) {
      var n = Date.now();
      return !(t3 < n - e || t3 > n && (x2("Detected an update time that is in the future: " + t3 + " > " + n), 1));
    }, t2.prototype.We = function() {
      var t3 = this;
      null !== this.document && "function" == typeof this.document.addEventListener && (this.Fe = function() {
        t3.Se.enqueueAndForget(function() {
          return t3.inForeground = "visible" === t3.document.visibilityState, t3.je();
        });
      }, this.document.addEventListener("visibilitychange", this.Fe), this.inForeground = "visible" === this.document.visibilityState);
    }, t2.prototype.an = function() {
      this.Fe && (this.document.removeEventListener("visibilitychange", this.Fe), this.Fe = null);
    }, /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */
    t2.prototype.Ge = function() {
      var t3, e = this;
      "function" == typeof (null === (t3 = this.window) || void 0 === t3 ? void 0 : t3.addEventListener) && (this.ke = function() {
        e.un(), isSafari() && navigator.appVersion.match("Version/14") && // On Safari 14, we do not run any cleanup actions as it might trigger
        // a bug that prevents Safari from re-opening IndexedDB during the
        // next page load.
        // See https://bugs.webkit.org/show_bug.cgi?id=226547
        e.Se.enterRestrictedMode(
          /* purgeExistingTasks= */
          true
        ), e.Se.enqueueAndForget(function() {
          return e.shutdown();
        });
      }, this.window.addEventListener("pagehide", this.ke));
    }, t2.prototype.hn = function() {
      this.ke && (this.window.removeEventListener("pagehide", this.ke), this.ke = null);
    }, /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    t2.prototype.cn = function(t3) {
      var e;
      try {
        var n = null !== (null === (e = this.Qe) || void 0 === e ? void 0 : e.getItem(this.on(t3)));
        return C2("IndexedDbPersistence", "Client '" + t3 + "' " + (n ? "is" : "is not") + " zombied in LocalStorage"), n;
      } catch (t4) {
        return x2("IndexedDbPersistence", "Failed to get zombied client id.", t4), false;
      }
    }, /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    t2.prototype.un = function() {
      if (this.Qe) try {
        this.Qe.setItem(this.on(this.clientId), String(Date.now()));
      } catch (t3) {
        x2("Failed to set zombie client id.", t3);
      }
    }, /** Removes the zombied client entry if it exists. */
    t2.prototype.ln = function() {
      if (this.Qe) try {
        this.Qe.removeItem(this.on(this.clientId));
      } catch (t3) {
      }
    }, t2.prototype.on = function(t3) {
      return "firestore_zombie_" + this.persistenceKey + "_" + t3;
    }, t2;
  }()
);
function Ri(t2) {
  return Rr(t2, nr.store);
}
function Li(t2) {
  return Rr(t2, pr.store);
}
function Oi(t2, e) {
  var n = t2.projectId;
  return t2.isDefaultDatabase || (n += "." + t2.database), "firestore/" + e + "/" + n + "/";
}
var Pi = function(t2, e) {
  this.progress = t2, this.wn = e;
};
var Fi = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.Ue = t3, this._n = e, this.Ut = n;
    }
    return t2.prototype.mn = function(t3, e) {
      var n = this;
      return this._n.getAllMutationBatchesAffectingDocumentKey(t3, e).next(function(r) {
        return n.yn(t3, e, r);
      });
    }, /** Internal version of `getDocument` that allows reusing batches. */
    t2.prototype.yn = function(t3, e, n) {
      return this.Ue.getEntry(t3, e).next(function(t4) {
        for (var e2 = 0, r = n; e2 < r.length; e2++) {
          r[e2].applyToLocalView(t4);
        }
        return t4;
      });
    }, // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    t2.prototype.gn = function(t3, e) {
      t3.forEach(function(t4, n) {
        for (var r = 0, i = e; r < i.length; r++) {
          i[r].applyToLocalView(n);
        }
      });
    }, /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */
    t2.prototype.pn = function(t3, e) {
      var n = this;
      return this.Ue.getEntries(t3, e).next(function(e2) {
        return n.En(t3, e2).next(function() {
          return e2;
        });
      });
    }, /**
     * Applies the local view the given `baseDocs` without retrieving documents
     * from the local store.
     */
    t2.prototype.En = function(t3, e) {
      var n = this;
      return this._n.getAllMutationBatchesAffectingDocumentKeys(t3, e).next(function(t4) {
        return n.gn(e, t4);
      });
    }, /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction - The persistence transaction.
     * @param query - The query to match documents against.
     * @param sinceReadTime - If not set to SnapshotVersion.min(), return only
     *     documents that have been read since this snapshot version (exclusive).
     */
    t2.prototype.getDocumentsMatchingQuery = function(t3, e, n) {
      return function(t4) {
        return ct.isDocumentKey(t4.path) && null === t4.collectionGroup && 0 === t4.filters.length;
      }(e) ? this.Tn(t3, e.path) : te(e) ? this.In(t3, e, n) : this.An(t3, e, n);
    }, t2.prototype.Tn = function(t3, e) {
      return this.mn(t3, new ct(e)).next(function(t4) {
        var e2 = en();
        return t4.isFoundDocument() && (e2 = e2.insert(t4.key, t4)), e2;
      });
    }, t2.prototype.In = function(t3, e, n) {
      var r = this, i = e.collectionGroup, o = en();
      return this.Ut.getCollectionParents(t3, i).next(function(s) {
        return Ir.forEach(s, function(s2) {
          var u = function(t4, e2) {
            return new Wt(
              e2,
              /*collectionGroup=*/
              null,
              t4.explicitOrderBy.slice(),
              t4.filters.slice(),
              t4.limit,
              t4.limitType,
              t4.startAt,
              t4.endAt
            );
          }(e, s2.child(i));
          return r.An(t3, u, n).next(function(t4) {
            t4.forEach(function(t5, e2) {
              o = o.insert(t5, e2);
            });
          });
        }).next(function() {
          return o;
        });
      });
    }, t2.prototype.An = function(t3, e, n) {
      var r, i, o = this;
      return this.Ue.getDocumentsMatchingQuery(t3, e, n).next(function(n2) {
        return r = n2, o._n.getAllMutationBatchesAffectingQuery(t3, e);
      }).next(function(e2) {
        return i = e2, o.Rn(t3, i, r).next(function(t4) {
          r = t4;
          for (var e3 = 0, n2 = i; e3 < n2.length; e3++) for (var o2 = n2[e3], s = 0, u = o2.mutations; s < u.length; s++) {
            var a = u[s], c = a.key, h = r.get(c);
            null == h && // Create invalid document to apply mutations on top of
            (h = Nt.newInvalidDocument(c), r = r.insert(c, h)), xe(a, h, o2.localWriteTime), h.isFoundDocument() || (r = r.remove(c));
          }
        });
      }).next(function() {
        return r.forEach(function(t4, n2) {
          ue(e, n2) || (r = r.remove(t4));
        }), r;
      });
    }, t2.prototype.Rn = function(t3, e, n) {
      for (var r = sn(), i = 0, o = e; i < o.length; i++) for (var s = 0, u = o[i].mutations; s < u.length; s++) {
        var a = u[s];
        a instanceof Fe && null === n.get(a.key) && (r = r.add(a.key));
      }
      var c = n;
      return this.Ue.getEntries(t3, r).next(function(t4) {
        return t4.forEach(function(t5, e2) {
          e2.isFoundDocument() && (c = c.insert(t5, e2));
        }), c;
      });
    }, t2;
  }()
);
var Mi = (
  /** @class */
  function() {
    function t2(t3, e, n, r) {
      this.targetId = t3, this.fromCache = e, this.bn = n, this.vn = r;
    }
    return t2.Pn = function(e, n) {
      for (var r = sn(), i = sn(), o = 0, s = n.docChanges; o < s.length; o++) {
        var u = s[o];
        switch (u.type) {
          case 0:
            r = r.add(u.doc.key);
            break;
          case 1:
            i = i.add(u.doc.key);
        }
      }
      return new t2(e, n.fromCache, r, i);
    }, t2;
  }()
);
var Vi = (
  /** @class */
  function() {
    function t2() {
    }
    return t2.prototype.Vn = function(t3) {
      this.Sn = t3;
    }, /** Returns all local documents matching the specified query. */
    t2.prototype.getDocumentsMatchingQuery = function(t3, e, n, r) {
      var i = this;
      return function(t4) {
        return 0 === t4.filters.length && null === t4.limit && null == t4.startAt && null == t4.endAt && (0 === t4.explicitOrderBy.length || 1 === t4.explicitOrderBy.length && t4.explicitOrderBy[0].field.isKeyField());
      }(e) || n.isEqual(K2.min()) ? this.Dn(t3, e) : this.Sn.pn(t3, r).next(function(o) {
        var s = i.Cn(e, o);
        return ($t(e) || Xt(e)) && i.Nn(e.limitType, s, r, n) ? i.Dn(t3, e) : (k2() <= LogLevel.DEBUG && C2("QueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), se(e)), i.Sn.getDocumentsMatchingQuery(t3, e, n).next(function(t4) {
          return s.forEach(function(e2) {
            t4 = t4.insert(e2.key, e2);
          }), t4;
        }));
      });
    }, /** Applies the query filter and sorting to the provided documents.  */
    t2.prototype.Cn = function(t3, e) {
      var n = new $e(ae(t3));
      return e.forEach(function(e2, r) {
        ue(t3, r) && (n = n.add(r));
      }), n;
    }, /**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param sortedPreviousResults - The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys - The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion - The version of the snapshot when the
     * query was last synchronized.
     */
    t2.prototype.Nn = function(t3, e, n, r) {
      if (n.size !== e.size) return true;
      var i = "F" === t3 ? e.last() : e.first();
      return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0);
    }, t2.prototype.Dn = function(t3, e) {
      return k2() <= LogLevel.DEBUG && C2("QueryEngine", "Using full collection scan to execute query:", se(e)), this.Sn.getDocumentsMatchingQuery(t3, e, K2.min());
    }, t2;
  }()
);
var qi = (
  /** @class */
  function() {
    function t2(t3, e, n, r) {
      this.persistence = t3, this.xn = e, this.R = r, /**
           * Maps a targetID to data about its target.
           *
           * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
           * of `applyRemoteEvent()` idempotent.
           */
      this.kn = new We(q2), /** Maps a target to its targetID. */
      // TODO(wuandy): Evaluate if TargetId can be part of Target.
      this.Fn = new Ii(function(t4) {
        return kt(t4);
      }, Ct), /**
           * The read time of the last entry processed by `getNewDocumentChanges()`.
           *
           * PORTING NOTE: This is only used for multi-tab synchronization.
           */
      this.$n = K2.min(), this._n = t3.getMutationQueue(n), this.On = t3.getRemoteDocumentCache(), this.qe = t3.getTargetCache(), this.Mn = new Fi(this.On, this._n, this.persistence.getIndexManager()), this.Ke = t3.getBundleCache(), this.xn.Vn(this.Mn);
    }
    return t2.prototype.collectGarbage = function(t3) {
      var e = this;
      return this.persistence.runTransaction("Collect garbage", "readwrite-primary", function(n) {
        return t3.collect(n, e.kn);
      });
    }, t2;
  }()
);
function Ui(t2, e, n, r) {
  return new qi(t2, e, n, r);
}
function Bi(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i, o, s;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return n = F2(t2), i = n._n, o = n.Mn, [4, n.persistence.runTransaction("Handle user change", "readonly", function(t3) {
            var r2;
            return n._n.getAllMutationBatches(t3).next(function(s2) {
              return r2 = s2, i = n.persistence.getMutationQueue(e), // Recreate our LocalDocumentsView using the new
              // MutationQueue.
              o = new Fi(n.On, i, n.persistence.getIndexManager()), i.getAllMutationBatches(t3);
            }).next(function(e2) {
              for (var n2 = [], i2 = [], s2 = sn(), u = 0, a = r2; u < a.length; u++) {
                var c = a[u];
                n2.push(c.batchId);
                for (var h = 0, f = c.mutations; h < f.length; h++) {
                  var l2 = f[h];
                  s2 = s2.add(l2.key);
                }
              }
              for (var d = 0, p2 = e2; d < p2.length; d++) {
                var y2 = p2[d];
                i2.push(y2.batchId);
                for (var v2 = 0, m = y2.mutations; v2 < m.length; v2++) {
                  var g = m[v2];
                  s2 = s2.add(g.key);
                }
              }
              return o.pn(t3, s2).next(function(t4) {
                return {
                  Ln: t4,
                  removedBatchIds: n2,
                  addedBatchIds: i2
                };
              });
            });
          })];
        case 1:
          return s = r.sent(), [2, (n._n = i, n.Mn = o, n.xn.Vn(n.Mn), s)];
      }
    });
  });
}
function ji(t2, e) {
  var n = F2(t2);
  return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", function(t3) {
    var r = e.batch.keys(), i = n.On.newChangeBuffer({
      trackRemovals: true
    });
    return function(t4, e2, n2, r2) {
      var i2 = n2.batch, o = i2.keys(), s = Ir.resolve();
      return o.forEach(function(t5) {
        s = s.next(function() {
          return r2.getEntry(e2, t5);
        }).next(function(e3) {
          var o2 = n2.docVersions.get(t5);
          P2(null !== o2), e3.version.compareTo(o2) < 0 && (i2.applyToRemoteDocument(e3, n2), e3.isValidDocument() && // We use the commitVersion as the readTime rather than the
          // document's updateTime since the updateTime is not advanced
          // for updates that do not modify the underlying document.
          r2.addEntry(e3, n2.commitVersion));
        });
      }), s.next(function() {
        return t4._n.removeMutationBatch(e2, i2);
      });
    }(n, t3, e, i).next(function() {
      return i.apply(t3);
    }).next(function() {
      return n._n.performConsistencyCheck(t3);
    }).next(function() {
      return n.Mn.pn(t3, r);
    });
  });
}
function Ki(t2) {
  var e = F2(t2);
  return e.persistence.runTransaction("Get last remote snapshot version", "readonly", function(t3) {
    return e.qe.getLastRemoteSnapshotVersion(t3);
  });
}
function Gi(t2, e) {
  var n = F2(t2), r = e.snapshotVersion, i = n.kn;
  return n.persistence.runTransaction("Apply remote event", "readwrite-primary", function(t3) {
    var o = n.On.newChangeBuffer({
      trackRemovals: true
    });
    i = n.kn;
    var s = [];
    e.targetChanges.forEach(function(e2, o2) {
      var u2 = i.get(o2);
      if (u2) {
        s.push(n.qe.removeMatchingKeys(t3, e2.removedDocuments, o2).next(function() {
          return n.qe.addMatchingKeys(t3, e2.addedDocuments, o2);
        }));
        var a2 = e2.resumeToken;
        if (a2.approximateByteSize() > 0) {
          var c = u2.withResumeToken(a2, r).withSequenceNumber(t3.currentSequenceNumber);
          i = i.insert(o2, c), // Update the target data if there are target changes (or if
          // sufficient time has passed since the last update).
          /**
          * Returns true if the newTargetData should be persisted during an update of
          * an active target. TargetData should always be persisted when a target is
          * being released and should not call this function.
          *
          * While the target is active, TargetData updates can be omitted when nothing
          * about the target has changed except metadata like the resume token or
          * snapshot version. Occasionally it's worth the extra write to prevent these
          * values from getting too stale after a crash, but this doesn't have to be
          * too frequent.
          */
          function(t4, e3, n2) {
            return P2(e3.resumeToken.approximateByteSize() > 0), 0 === t4.resumeToken.approximateByteSize() || // Don't allow resume token changes to be buffered indefinitely. This
            // allows us to be reasonably up-to-date after a crash and avoids needing
            // to loop over all active queries on shutdown. Especially in the browser
            // we may not get time to do anything interesting while the current tab is
            // closing.
            e3.snapshotVersion.toMicroseconds() - t4.snapshotVersion.toMicroseconds() >= 3e8 || n2.addedDocuments.size + n2.modifiedDocuments.size + n2.removedDocuments.size > 0;
          }(u2, c, e2) && s.push(n.qe.updateTargetData(t3, c));
        }
      }
    });
    var u = Ze();
    if (e.documentUpdates.forEach(function(r2, i2) {
      e.resolvedLimboDocuments.has(r2) && s.push(n.persistence.referenceDelegate.updateLimboDocument(t3, r2));
    }), // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
    // documents in advance in a single call.
    s.push(Qi(t3, o, e.documentUpdates, r, void 0).next(function(t4) {
      u = t4;
    })), !r.isEqual(K2.min())) {
      var a = n.qe.getLastRemoteSnapshotVersion(t3).next(function(e2) {
        return n.qe.setTargetsMetadata(t3, t3.currentSequenceNumber, r);
      });
      s.push(a);
    }
    return Ir.waitFor(s).next(function() {
      return o.apply(t3);
    }).next(function() {
      return n.Mn.En(t3, u);
    }).next(function() {
      return u;
    });
  }).then(function(t3) {
    return n.kn = i, t3;
  });
}
function Qi(t2, e, n, r, i) {
  var o = sn();
  return n.forEach(function(t3) {
    return o = o.add(t3);
  }), e.getEntries(t2, o).next(function(t3) {
    var o2 = Ze();
    return n.forEach(function(n2, s) {
      var u = t3.get(n2), a = (null == i ? void 0 : i.get(n2)) || r;
      s.isNoDocument() && s.version.isEqual(K2.min()) ? (
        // NoDocuments with SnapshotVersion.min() are used in manufactured
        // events. We remove these documents from cache since we lost
        // access.
        (e.removeEntry(n2, a), o2 = o2.insert(n2, s))
      ) : !u.isValidDocument() || s.version.compareTo(u.version) > 0 || 0 === s.version.compareTo(u.version) && u.hasPendingWrites ? (e.addEntry(s, a), o2 = o2.insert(n2, s)) : C2("LocalStore", "Ignoring outdated watch update for ", n2, ". Current version:", u.version, " Watch version:", s.version);
    }), o2;
  });
}
function zi(t2, e) {
  var n = F2(t2);
  return n.persistence.runTransaction("Get next mutation batch", "readonly", function(t3) {
    return void 0 === e && (e = -1), n._n.getNextMutationBatchAfterBatchId(t3, e);
  });
}
function Wi(t2, e) {
  var n = F2(t2);
  return n.persistence.runTransaction("Allocate target", "readwrite", function(t3) {
    var r;
    return n.qe.getTargetData(t3, e).next(function(i) {
      return i ? (
        // This target has been listened to previously, so reuse the
        // previous targetID.
        // TODO(mcg): freshen last accessed date?
        (r = i, Ir.resolve(r))
      ) : n.qe.allocateTargetId(t3).next(function(i2) {
        return r = new Pr(e, i2, 0, t3.currentSequenceNumber), n.qe.addTargetData(t3, r).next(function() {
          return r;
        });
      });
    });
  }).then(function(t3) {
    var r = n.kn.get(t3.targetId);
    return (null === r || t3.snapshotVersion.compareTo(r.snapshotVersion) > 0) && (n.kn = n.kn.insert(t3.targetId, t3), n.Fn.set(e, t3.targetId)), t3;
  });
}
function Hi(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var n, o, s, u;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          n = F2(t2), o = n.kn.get(e), s = i ? "readwrite" : "readwrite-primary", r.label = 1;
        case 1:
          return r.trys.push([1, 4, , 5]), i ? [3, 3] : [4, n.persistence.runTransaction("Release target", s, function(t3) {
            return n.persistence.referenceDelegate.removeTarget(t3, o);
          })];
        case 2:
          r.sent(), r.label = 3;
        case 3:
          return [3, 5];
        case 4:
          if (!Nr(u = r.sent())) throw u;
          return C2("LocalStore", "Failed to update sequence numbers for target " + e + ": " + u), [3, 5];
        case 5:
          return n.kn = n.kn.remove(e), n.Fn.delete(o.target), [
            2
            /*return*/
          ];
      }
    });
  });
}
function Yi(t2, e, n) {
  var r = F2(t2), i = K2.min(), o = sn();
  return r.persistence.runTransaction("Execute query", "readonly", function(t3) {
    return function(t4, e2, n2) {
      var r2 = F2(t4), i2 = r2.Fn.get(n2);
      return void 0 !== i2 ? Ir.resolve(r2.kn.get(i2)) : r2.qe.getTargetData(e2, n2);
    }(r, t3, ne(e)).next(function(e2) {
      if (e2) return i = e2.lastLimboFreeSnapshotVersion, r.qe.getMatchingKeysForTargetId(t3, e2.targetId).next(function(t4) {
        o = t4;
      });
    }).next(function() {
      return r.xn.getDocumentsMatchingQuery(t3, e, n ? i : K2.min(), n ? o : sn());
    }).next(function(t4) {
      return {
        documents: t4,
        Bn: o
      };
    });
  });
}
function $i(t2, e) {
  var n = F2(t2), r = F2(n.qe), i = n.kn.get(e);
  return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", function(t3) {
    return r.lt(t3, e).next(function(t4) {
      return t4 ? t4.target : null;
    });
  });
}
function Xi(t2) {
  var e = F2(t2);
  return e.persistence.runTransaction("Get new document changes", "readonly", function(t3) {
    return function(t4, e2, n) {
      var r = F2(t4), i = Ze(), o = qr(n), s = Ni(e2), u = IDBKeyRange.lowerBound(o, true);
      return s.$t({
        index: ar.readTimeIndex,
        range: u
      }, function(t5, e3) {
        var n2 = Mr(r.R, e3);
        i = i.insert(n2.key, n2), o = e3.readTime;
      }).next(function() {
        return {
          wn: i,
          readTime: Ur(o)
        };
      });
    }(e.On, t3, e.$n);
  }).then(function(t3) {
    var n = t3.wn, r = t3.readTime;
    return e.$n = r, n;
  });
}
function Ji(t2) {
  return __awaiter(this, void 0, void 0, function() {
    var e;
    return __generator(this, function(n) {
      return [2, (e = F2(t2)).persistence.runTransaction("Synchronize last document change read time", "readonly", function(t3) {
        return function(t4) {
          var e2 = Ni(t4), n2 = K2.min();
          return e2.$t({
            index: ar.readTimeIndex,
            reverse: true
          }, function(t5, e3, r) {
            e3.readTime && (n2 = Ur(e3.readTime)), r.done();
          }).next(function() {
            return n2;
          });
        }(t3);
      }).then(function(t3) {
        e.$n = t3;
      })];
    });
  });
}
function Zi(t2, e, i, o) {
  return __awaiter(this, void 0, void 0, function() {
    var n, s, u, a, c, h, f, l2, d, p2;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          for (n = F2(t2), s = sn(), u = Ze(), a = rn(), c = 0, h = i; c < h.length; c++) f = h[c], l2 = e.qn(f.metadata.name), f.document && (s = s.add(l2)), u = u.insert(l2, e.Un(f)), a = a.insert(l2, e.Kn(f.metadata.readTime));
          return d = n.On.newChangeBuffer({
            trackRemovals: true
          }), [4, Wi(n, function(t3) {
            return ne(Yt(H2.fromString("__bundle__/docs/" + t3)));
          }(o))];
        case 1:
          return p2 = r.sent(), [2, n.persistence.runTransaction("Apply bundle documents", "readwrite", function(t3) {
            return Qi(t3, d, u, K2.min(), a).next(function(e2) {
              return d.apply(t3), e2;
            }).next(function(e2) {
              return n.qe.removeMatchingKeysForTargetId(t3, p2.targetId).next(function() {
                return n.qe.addMatchingKeys(t3, s, p2.targetId);
              }).next(function() {
                return n.Mn.En(t3, e2);
              }).next(function() {
                return e2;
              });
            });
          })];
      }
    });
  });
}
function to(t2, e, i) {
  return void 0 === i && (i = sn()), __awaiter(this, void 0, void 0, function() {
    var n, o;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return [4, Wi(t2, ne(zr(e.bundledQuery)))];
        case 1:
          return n = r.sent(), [2, (o = F2(t2)).persistence.runTransaction("Save named query", "readwrite", function(t3) {
            var r2 = En(e.readTime);
            if (n.snapshotVersion.compareTo(r2) >= 0) return o.Ke.saveNamedQuery(t3, e);
            var s = n.withResumeToken(J2.EMPTY_BYTE_STRING, r2);
            return o.kn = o.kn.insert(s.targetId, s), o.qe.updateTargetData(t3, s).next(function() {
              return o.qe.removeMatchingKeysForTargetId(t3, n.targetId);
            }).next(function() {
              return o.qe.addMatchingKeys(t3, i, n.targetId);
            }).next(function() {
              return o.Ke.saveNamedQuery(t3, e);
            });
          })];
      }
    });
  });
}
var eo = (
  /** @class */
  function() {
    function t2(t3) {
      this.R = t3, this.Qn = /* @__PURE__ */ new Map(), this.jn = /* @__PURE__ */ new Map();
    }
    return t2.prototype.getBundleMetadata = function(t3, e) {
      return Ir.resolve(this.Qn.get(e));
    }, t2.prototype.saveBundleMetadata = function(t3, e) {
      var n;
      return this.Qn.set(e.id, {
        id: (n = e).id,
        version: n.version,
        createTime: En(n.createTime)
      }), Ir.resolve();
    }, t2.prototype.getNamedQuery = function(t3, e) {
      return Ir.resolve(this.jn.get(e));
    }, t2.prototype.saveNamedQuery = function(t3, e) {
      return this.jn.set(e.name, function(t4) {
        return {
          name: t4.name,
          query: zr(t4.bundledQuery),
          readTime: En(t4.readTime)
        };
      }(e)), Ir.resolve();
    }, t2;
  }()
);
var no = (
  /** @class */
  function() {
    function t2() {
      this.Wn = new $e(ro.Gn), // A set of outstanding references to a document sorted by target id.
      this.zn = new $e(ro.Hn);
    }
    return t2.prototype.isEmpty = function() {
      return this.Wn.isEmpty();
    }, /** Adds a reference to the given document key for the given ID. */
    t2.prototype.addReference = function(t3, e) {
      var n = new ro(t3, e);
      this.Wn = this.Wn.add(n), this.zn = this.zn.add(n);
    }, /** Add references to the given document keys for the given ID. */
    t2.prototype.Jn = function(t3, e) {
      var n = this;
      t3.forEach(function(t4) {
        return n.addReference(t4, e);
      });
    }, /**
     * Removes a reference to the given document key for the given
     * ID.
     */
    t2.prototype.removeReference = function(t3, e) {
      this.Yn(new ro(t3, e));
    }, t2.prototype.Xn = function(t3, e) {
      var n = this;
      t3.forEach(function(t4) {
        return n.removeReference(t4, e);
      });
    }, /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */
    t2.prototype.Zn = function(t3) {
      var e = this, n = new ct(new H2([])), r = new ro(n, t3), i = new ro(n, t3 + 1), o = [];
      return this.zn.forEachInRange([r, i], function(t4) {
        e.Yn(t4), o.push(t4.key);
      }), o;
    }, t2.prototype.ts = function() {
      var t3 = this;
      this.Wn.forEach(function(e) {
        return t3.Yn(e);
      });
    }, t2.prototype.Yn = function(t3) {
      this.Wn = this.Wn.delete(t3), this.zn = this.zn.delete(t3);
    }, t2.prototype.es = function(t3) {
      var e = new ct(new H2([])), n = new ro(e, t3), r = new ro(e, t3 + 1), i = sn();
      return this.zn.forEachInRange([n, r], function(t4) {
        i = i.add(t4.key);
      }), i;
    }, t2.prototype.containsKey = function(t3) {
      var e = new ro(t3, 0), n = this.Wn.firstAfterOrEqual(e);
      return null !== n && t3.isEqual(n.key);
    }, t2;
  }()
);
var ro = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.key = t3, this.ns = e;
    }
    return t2.Gn = function(t3, e) {
      return ct.comparator(t3.key, e.key) || q2(t3.ns, e.ns);
    }, /** Compare by ID then by key */
    t2.Hn = function(t3, e) {
      return q2(t3.ns, e.ns) || ct.comparator(t3.key, e.key);
    }, t2;
  }()
);
var io = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.Ut = t3, this.referenceDelegate = e, /**
           * The set of all mutations that have been sent but not yet been applied to
           * the backend.
           */
      this._n = [], /** Next value to use when assigning sequential IDs to each mutation batch. */
      this.ss = 1, /** An ordered mapping between documents and the mutations batch IDs. */
      this.rs = new $e(ro.Gn);
    }
    return t2.prototype.checkEmpty = function(t3) {
      return Ir.resolve(0 === this._n.length);
    }, t2.prototype.addMutationBatch = function(t3, e, n, r) {
      var i = this.ss;
      this.ss++, this._n.length > 0 && this._n[this._n.length - 1];
      var o = new Lr(i, e, n, r);
      this._n.push(o);
      for (var s = 0, u = r; s < u.length; s++) {
        var a = u[s];
        this.rs = this.rs.add(new ro(a.key, i)), this.Ut.addToCollectionParentIndex(t3, a.key.path.popLast());
      }
      return Ir.resolve(o);
    }, t2.prototype.lookupMutationBatch = function(t3, e) {
      return Ir.resolve(this.os(e));
    }, t2.prototype.getNextMutationBatchAfterBatchId = function(t3, e) {
      var n = e + 1, r = this.cs(n), i = r < 0 ? 0 : r;
      return Ir.resolve(this._n.length > i ? this._n[i] : null);
    }, t2.prototype.getHighestUnacknowledgedBatchId = function() {
      return Ir.resolve(0 === this._n.length ? -1 : this.ss - 1);
    }, t2.prototype.getAllMutationBatches = function(t3) {
      return Ir.resolve(this._n.slice());
    }, t2.prototype.getAllMutationBatchesAffectingDocumentKey = function(t3, e) {
      var n = this, r = new ro(e, 0), i = new ro(e, Number.POSITIVE_INFINITY), o = [];
      return this.rs.forEachInRange([r, i], function(t4) {
        var e2 = n.os(t4.ns);
        o.push(e2);
      }), Ir.resolve(o);
    }, t2.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t3, e) {
      var n = this, r = new $e(q2);
      return e.forEach(function(t4) {
        var e2 = new ro(t4, 0), i = new ro(t4, Number.POSITIVE_INFINITY);
        n.rs.forEachInRange([e2, i], function(t5) {
          r = r.add(t5.ns);
        });
      }), Ir.resolve(this.us(r));
    }, t2.prototype.getAllMutationBatchesAffectingQuery = function(t3, e) {
      var n = e.path, r = n.length + 1, i = n;
      ct.isDocumentKey(i) || (i = i.child(""));
      var o = new ro(new ct(i), 0), s = new $e(q2);
      return this.rs.forEachWhile(function(t4) {
        var e2 = t4.key.path;
        return !!n.isPrefixOf(e2) && // Rows with document keys more than one segment longer than the query
        // path can't be matches. For example, a query on 'rooms' can't match
        // the document /rooms/abc/messages/xyx.
        // TODO(mcg): we'll need a different scanner when we implement
        // ancestor queries.
        (e2.length === r && (s = s.add(t4.ns)), true);
      }, o), Ir.resolve(this.us(s));
    }, t2.prototype.us = function(t3) {
      var e = this, n = [];
      return t3.forEach(function(t4) {
        var r = e.os(t4);
        null !== r && n.push(r);
      }), n;
    }, t2.prototype.removeMutationBatch = function(t3, e) {
      var n = this;
      P2(0 === this.hs(e.batchId, "removed")), this._n.shift();
      var r = this.rs;
      return Ir.forEach(e.mutations, function(i) {
        var o = new ro(i.key, e.batchId);
        return r = r.delete(o), n.referenceDelegate.markPotentiallyOrphaned(t3, i.key);
      }).next(function() {
        n.rs = r;
      });
    }, t2.prototype.Gt = function(t3) {
    }, t2.prototype.containsKey = function(t3, e) {
      var n = new ro(e, 0), r = this.rs.firstAfterOrEqual(n);
      return Ir.resolve(e.isEqual(r && r.key));
    }, t2.prototype.performConsistencyCheck = function(t3) {
      return this._n.length, Ir.resolve();
    }, /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId - The batchId to search for
     * @param action - A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */
    t2.prototype.hs = function(t3, e) {
      return this.cs(t3);
    }, /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @returns The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */
    t2.prototype.cs = function(t3) {
      return 0 === this._n.length ? 0 : t3 - this._n[0].batchId;
    }, /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */
    t2.prototype.os = function(t3) {
      var e = this.cs(t3);
      return e < 0 || e >= this._n.length ? null : this._n[e];
    }, t2;
  }()
);
var oo = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.Ut = t3, this.ls = e, /** Underlying cache of documents and their read times. */
      this.docs = new We(ct.comparator), /** Size of all cached documents. */
      this.size = 0;
    }
    return t2.prototype.addEntry = function(t3, e, n) {
      var r = e.key, i = this.docs.get(r), o = i ? i.size : 0, s = this.ls(e);
      return this.docs = this.docs.insert(r, {
        document: e.clone(),
        size: s,
        readTime: n
      }), this.size += s - o, this.Ut.addToCollectionParentIndex(t3, r.path.popLast());
    }, /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    t2.prototype.removeEntry = function(t3) {
      var e = this.docs.get(t3);
      e && (this.docs = this.docs.remove(t3), this.size -= e.size);
    }, t2.prototype.getEntry = function(t3, e) {
      var n = this.docs.get(e);
      return Ir.resolve(n ? n.document.clone() : Nt.newInvalidDocument(e));
    }, t2.prototype.getEntries = function(t3, e) {
      var n = this, r = Ze();
      return e.forEach(function(t4) {
        var e2 = n.docs.get(t4);
        r = r.insert(t4, e2 ? e2.document.clone() : Nt.newInvalidDocument(t4));
      }), Ir.resolve(r);
    }, t2.prototype.getDocumentsMatchingQuery = function(t3, e, n) {
      for (var r = Ze(), i = new ct(e.path.child("")), o = this.docs.getIteratorFrom(i); o.hasNext(); ) {
        var s = o.getNext(), u = s.key, a = s.value, c = a.document, h = a.readTime;
        if (!e.path.isPrefixOf(u.path)) break;
        h.compareTo(n) <= 0 || ue(e, c) && (r = r.insert(c.key, c.clone()));
      }
      return Ir.resolve(r);
    }, t2.prototype.fs = function(t3, e) {
      return Ir.forEach(this.docs, function(t4) {
        return e(t4);
      });
    }, t2.prototype.newChangeBuffer = function(t3) {
      return new so(this);
    }, t2.prototype.getSize = function(t3) {
      return Ir.resolve(this.size);
    }, t2;
  }()
);
var so = (
  /** @class */
  function(e) {
    function n(t2) {
      var n2 = this;
      return (n2 = e.call(this) || this).Ie = t2, n2;
    }
    return __extends(n, e), n.prototype.applyChanges = function(t2) {
      var e2 = this, n2 = [];
      return this.changes.forEach(function(r, i) {
        i.document.isValidDocument() ? n2.push(e2.Ie.addEntry(t2, i.document, e2.getReadTime(r))) : e2.Ie.removeEntry(r);
      }), Ir.waitFor(n2);
    }, n.prototype.getFromCache = function(t2, e2) {
      return this.Ie.getEntry(t2, e2);
    }, n.prototype.getAllFromCache = function(t2, e2) {
      return this.Ie.getEntries(t2, e2);
    }, n;
  }(Ti)
);
var uo = (
  /** @class */
  function() {
    function t2(t3) {
      this.persistence = t3, /**
           * Maps a target to the data about that target
           */
      this.ds = new Ii(function(t4) {
        return kt(t4);
      }, Ct), /** The last received snapshot version. */
      this.lastRemoteSnapshotVersion = K2.min(), /** The highest numbered target ID encountered. */
      this.highestTargetId = 0, /** The highest sequence number encountered. */
      this.ws = 0, /**
           * A ordered bidirectional mapping between documents and the remote target
           * IDs.
           */
      this._s = new no(), this.targetCount = 0, this.ys = ci.Jt();
    }
    return t2.prototype.forEachTarget = function(t3, e) {
      return this.ds.forEach(function(t4, n) {
        return e(n);
      }), Ir.resolve();
    }, t2.prototype.getLastRemoteSnapshotVersion = function(t3) {
      return Ir.resolve(this.lastRemoteSnapshotVersion);
    }, t2.prototype.getHighestSequenceNumber = function(t3) {
      return Ir.resolve(this.ws);
    }, t2.prototype.allocateTargetId = function(t3) {
      return this.highestTargetId = this.ys.next(), Ir.resolve(this.highestTargetId);
    }, t2.prototype.setTargetsMetadata = function(t3, e, n) {
      return n && (this.lastRemoteSnapshotVersion = n), e > this.ws && (this.ws = e), Ir.resolve();
    }, t2.prototype.te = function(t3) {
      this.ds.set(t3.target, t3);
      var e = t3.targetId;
      e > this.highestTargetId && (this.ys = new ci(e), this.highestTargetId = e), t3.sequenceNumber > this.ws && (this.ws = t3.sequenceNumber);
    }, t2.prototype.addTargetData = function(t3, e) {
      return this.te(e), this.targetCount += 1, Ir.resolve();
    }, t2.prototype.updateTargetData = function(t3, e) {
      return this.te(e), Ir.resolve();
    }, t2.prototype.removeTargetData = function(t3, e) {
      return this.ds.delete(e.target), this._s.Zn(e.targetId), this.targetCount -= 1, Ir.resolve();
    }, t2.prototype.removeTargets = function(t3, e, n) {
      var r = this, i = 0, o = [];
      return this.ds.forEach(function(s, u) {
        u.sequenceNumber <= e && null === n.get(u.targetId) && (r.ds.delete(s), o.push(r.removeMatchingKeysForTargetId(t3, u.targetId)), i++);
      }), Ir.waitFor(o).next(function() {
        return i;
      });
    }, t2.prototype.getTargetCount = function(t3) {
      return Ir.resolve(this.targetCount);
    }, t2.prototype.getTargetData = function(t3, e) {
      var n = this.ds.get(e) || null;
      return Ir.resolve(n);
    }, t2.prototype.addMatchingKeys = function(t3, e, n) {
      return this._s.Jn(e, n), Ir.resolve();
    }, t2.prototype.removeMatchingKeys = function(t3, e, n) {
      this._s.Xn(e, n);
      var r = this.persistence.referenceDelegate, i = [];
      return r && e.forEach(function(e2) {
        i.push(r.markPotentiallyOrphaned(t3, e2));
      }), Ir.waitFor(i);
    }, t2.prototype.removeMatchingKeysForTargetId = function(t3, e) {
      return this._s.Zn(e), Ir.resolve();
    }, t2.prototype.getMatchingKeysForTargetId = function(t3, e) {
      var n = this._s.es(e);
      return Ir.resolve(n);
    }, t2.prototype.containsKey = function(t3, e) {
      return Ir.resolve(this._s.containsKey(e));
    }, t2;
  }()
);
var ao = (
  /** @class */
  function() {
    function t2(t3, e) {
      var n = this;
      this.gs = {}, this.Ne = new S2(0), this.xe = false, this.xe = true, this.referenceDelegate = t3(this), this.qe = new uo(this), this.Ut = new $r(), this.Ue = function(t4, e2) {
        return new oo(t4, function(t5) {
          return n.referenceDelegate.ps(t5);
        });
      }(this.Ut), this.R = new Fr(e), this.Ke = new eo(this.R);
    }
    return t2.prototype.start = function() {
      return Promise.resolve();
    }, t2.prototype.shutdown = function() {
      return this.xe = false, Promise.resolve();
    }, Object.defineProperty(t2.prototype, "started", {
      get: function() {
        return this.xe;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.setDatabaseDeletedListener = function() {
    }, t2.prototype.setNetworkEnabled = function() {
    }, t2.prototype.getIndexManager = function() {
      return this.Ut;
    }, t2.prototype.getMutationQueue = function(t3) {
      var e = this.gs[t3.toKey()];
      return e || (e = new io(this.Ut, this.referenceDelegate), this.gs[t3.toKey()] = e), e;
    }, t2.prototype.getTargetCache = function() {
      return this.qe;
    }, t2.prototype.getRemoteDocumentCache = function() {
      return this.Ue;
    }, t2.prototype.getBundleCache = function() {
      return this.Ke;
    }, t2.prototype.runTransaction = function(t3, e, n) {
      var r = this;
      C2("MemoryPersistence", "Starting transaction:", t3);
      var i = new co(this.Ne.next());
      return this.referenceDelegate.Es(), n(i).next(function(t4) {
        return r.referenceDelegate.Ts(i).next(function() {
          return t4;
        });
      }).toPromise().then(function(t4) {
        return i.raiseOnCommittedEvent(), t4;
      });
    }, t2.prototype.Is = function(t3, e) {
      return Ir.or(Object.values(this.gs).map(function(n) {
        return function() {
          return n.containsKey(t3, e);
        };
      }));
    }, t2;
  }()
);
var co = (
  /** @class */
  function(e) {
    function n(t2) {
      var n2 = this;
      return (n2 = e.call(this) || this).currentSequenceNumber = t2, n2;
    }
    return __extends(n, e), n;
  }(wr)
);
var ho = (
  /** @class */
  function() {
    function t2(t3) {
      this.persistence = t3, /** Tracks all documents that are active in Query views. */
      this.As = new no(), /** The list of documents that are potentially GCed after each transaction. */
      this.Rs = null;
    }
    return t2.bs = function(e) {
      return new t2(e);
    }, Object.defineProperty(t2.prototype, "vs", {
      get: function() {
        if (this.Rs) return this.Rs;
        throw O2();
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.addReference = function(t3, e, n) {
      return this.As.addReference(n, e), this.vs.delete(n.toString()), Ir.resolve();
    }, t2.prototype.removeReference = function(t3, e, n) {
      return this.As.removeReference(n, e), this.vs.add(n.toString()), Ir.resolve();
    }, t2.prototype.markPotentiallyOrphaned = function(t3, e) {
      return this.vs.add(e.toString()), Ir.resolve();
    }, t2.prototype.removeTarget = function(t3, e) {
      var n = this;
      this.As.Zn(e.targetId).forEach(function(t4) {
        return n.vs.add(t4.toString());
      });
      var r = this.persistence.getTargetCache();
      return r.getMatchingKeysForTargetId(t3, e.targetId).next(function(t4) {
        t4.forEach(function(t5) {
          return n.vs.add(t5.toString());
        });
      }).next(function() {
        return r.removeTargetData(t3, e);
      });
    }, t2.prototype.Es = function() {
      this.Rs = /* @__PURE__ */ new Set();
    }, t2.prototype.Ts = function(t3) {
      var e = this, n = this.persistence.getRemoteDocumentCache().newChangeBuffer();
      return Ir.forEach(this.vs, function(r) {
        var i = ct.fromPath(r);
        return e.Ps(t3, i).next(function(t4) {
          t4 || n.removeEntry(i);
        });
      }).next(function() {
        return e.Rs = null, n.apply(t3);
      });
    }, t2.prototype.updateLimboDocument = function(t3, e) {
      var n = this;
      return this.Ps(t3, e).next(function(t4) {
        t4 ? n.vs.delete(e.toString()) : n.vs.add(e.toString());
      });
    }, t2.prototype.ps = function(t3) {
      return 0;
    }, t2.prototype.Ps = function(t3, e) {
      var n = this;
      return Ir.or([function() {
        return Ir.resolve(n.As.containsKey(e));
      }, function() {
        return n.persistence.getTargetCache().containsKey(t3, e);
      }, function() {
        return n.persistence.Is(t3, e);
      }]);
    }, t2;
  }()
);
var fo = (
  /** @class */
  function() {
    function t2(t3) {
      this.uid = t3;
    }
    return t2.prototype.isAuthenticated = function() {
      return null != this.uid;
    }, /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    t2.prototype.toKey = function() {
      return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }, t2.prototype.isEqual = function(t3) {
      return t3.uid === this.uid;
    }, t2;
  }()
);
function lo(t2, e) {
  return "firestore_clients_" + t2 + "_" + e;
}
function po(t2, e, n) {
  var r = "firestore_mutations_" + t2 + "_" + n;
  return e.isAuthenticated() && (r += "_" + e.uid), r;
}
function yo(t2, e) {
  return "firestore_targets_" + t2 + "_" + e;
}
fo.UNAUTHENTICATED = new fo(null), // TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
fo.GOOGLE_CREDENTIALS = new fo("google-credentials-uid"), fo.FIRST_PARTY = new fo("first-party-uid"), fo.MOCK_USER = new fo("mock-user");
var vo = (
  /** @class */
  function() {
    function t2(t3, e, n, r) {
      this.user = t3, this.batchId = e, this.state = n, this.error = r;
    }
    return t2.Vs = function(e, n, r) {
      var i, o = JSON.parse(r), s = "object" == typeof o && -1 !== ["pending", "acknowledged", "rejected"].indexOf(o.state) && (void 0 === o.error || "object" == typeof o.error);
      return s && o.error && (s = "string" == typeof o.error.message && "string" == typeof o.error.code) && (i = new D2(o.error.code, o.error.message)), s ? new t2(e, n, o.state, i) : (x2("SharedClientState", "Failed to parse mutation state for ID '" + n + "': " + r), null);
    }, t2.prototype.Ss = function() {
      var t3 = {
        state: this.state,
        updateTimeMs: Date.now()
      };
      return this.error && (t3.error = {
        code: this.error.code,
        message: this.error.message
      }), JSON.stringify(t3);
    }, t2;
  }()
);
var mo = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.targetId = t3, this.state = e, this.error = n;
    }
    return t2.Vs = function(e, n) {
      var r, i = JSON.parse(n), o = "object" == typeof i && -1 !== ["not-current", "current", "rejected"].indexOf(i.state) && (void 0 === i.error || "object" == typeof i.error);
      return o && i.error && (o = "string" == typeof i.error.message && "string" == typeof i.error.code) && (r = new D2(i.error.code, i.error.message)), o ? new t2(e, i.state, r) : (x2("SharedClientState", "Failed to parse target state for ID '" + e + "': " + n), null);
    }, t2.prototype.Ss = function() {
      var t3 = {
        state: this.state,
        updateTimeMs: Date.now()
      };
      return this.error && (t3.error = {
        code: this.error.code,
        message: this.error.message
      }), JSON.stringify(t3);
    }, t2;
  }()
);
var go = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.clientId = t3, this.activeTargetIds = e;
    }
    return t2.Vs = function(e, n) {
      for (var r = JSON.parse(n), i = "object" == typeof r && r.activeTargetIds instanceof Array, o = an(), s = 0; i && s < r.activeTargetIds.length; ++s) i = at(r.activeTargetIds[s]), o = o.add(r.activeTargetIds[s]);
      return i ? new t2(e, o) : (x2("SharedClientState", "Failed to parse client data for instance '" + e + "': " + n), null);
    }, t2;
  }()
);
var wo = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.clientId = t3, this.onlineState = e;
    }
    return t2.Vs = function(e) {
      var n = JSON.parse(e);
      return "object" == typeof n && -1 !== ["Unknown", "Online", "Offline"].indexOf(n.onlineState) && "string" == typeof n.clientId ? new t2(n.clientId, n.onlineState) : (x2("SharedClientState", "Failed to parse online state: " + e), null);
    }, t2;
  }()
);
var bo = (
  /** @class */
  function() {
    function t2() {
      this.activeTargetIds = an();
    }
    return t2.prototype.Ds = function(t3) {
      this.activeTargetIds = this.activeTargetIds.add(t3);
    }, t2.prototype.Cs = function(t3) {
      this.activeTargetIds = this.activeTargetIds.delete(t3);
    }, /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */
    t2.prototype.Ss = function() {
      var t3 = {
        activeTargetIds: this.activeTargetIds.toArray(),
        updateTimeMs: Date.now()
      };
      return JSON.stringify(t3);
    }, t2;
  }()
);
var Io = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i) {
      this.window = t3, this.Se = e, this.persistenceKey = n, this.Ns = r, this.syncEngine = null, this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.xs = this.ks.bind(this), this.Fs = new We(q2), this.started = false, /**
           * Captures WebStorage events that occur before `start()` is called. These
           * events are replayed once `WebStorageSharedClientState` is started.
           */
      this.$s = [];
      var o = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      this.storage = this.window.localStorage, this.currentUser = i, this.Os = lo(this.persistenceKey, this.Ns), this.Ms = /** Assembles the key for the current sequence number. */
      function(t4) {
        return "firestore_sequence_number_" + t4;
      }(this.persistenceKey), this.Fs = this.Fs.insert(this.Ns, new bo()), this.Ls = new RegExp("^firestore_clients_" + o + "_([^_]*)$"), this.Bs = new RegExp("^firestore_mutations_" + o + "_(\\d+)(?:_(.*))?$"), this.qs = new RegExp("^firestore_targets_" + o + "_(\\d+)$"), this.Us = /** Assembles the key for the online state of the primary tab. */
      function(t4) {
        return "firestore_online_state_" + t4;
      }(this.persistenceKey), this.Ks = function(t4) {
        return "firestore_bundle_loaded_" + t4;
      }(this.persistenceKey), // Rather than adding the storage observer during start(), we add the
      // storage observer during initialization. This ensures that we collect
      // events before other components populate their initial state (during their
      // respective start() calls). Otherwise, we might for example miss a
      // mutation that is added after LocalStore's start() processed the existing
      // mutations but before we observe WebStorage events.
      this.window.addEventListener("storage", this.xs);
    }
    return t2.yt = function(t3) {
      return !(!t3 || !t3.localStorage);
    }, t2.prototype.start = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3, e, n, i, o, s, u, a, c, h, f, l2 = this;
        return __generator(this, function(r) {
          switch (r.label) {
            case 0:
              return [4, this.syncEngine.fn()];
            case 1:
              for (t3 = r.sent(), e = 0, n = t3; e < n.length; e++) (i = n[e]) !== this.Ns && (o = this.getItem(lo(this.persistenceKey, i))) && (s = go.Vs(i, o)) && (this.Fs = this.Fs.insert(s.clientId, s));
              for (this.Qs(), (u = this.storage.getItem(this.Us)) && (a = this.js(u)) && this.Ws(a), c = 0, h = this.$s; c < h.length; c++) f = h[c], this.ks(f);
              return this.$s = [], // Register a window unload hook to remove the client metadata entry from
              // WebStorage even if `shutdown()` was not called.
              this.window.addEventListener("pagehide", function() {
                return l2.shutdown();
              }), this.started = true, [
                2
                /*return*/
              ];
          }
        });
      });
    }, t2.prototype.writeSequenceNumber = function(t3) {
      this.setItem(this.Ms, JSON.stringify(t3));
    }, t2.prototype.getAllActiveQueryTargets = function() {
      return this.Gs(this.Fs);
    }, t2.prototype.isActiveQueryTarget = function(t3) {
      var e = false;
      return this.Fs.forEach(function(n, r) {
        r.activeTargetIds.has(t3) && (e = true);
      }), e;
    }, t2.prototype.addPendingMutation = function(t3) {
      this.zs(t3, "pending");
    }, t2.prototype.updateMutationState = function(t3, e, n) {
      this.zs(t3, e, n), // Once a final mutation result is observed by other clients, they no longer
      // access the mutation's metadata entry. Since WebStorage replays events
      // in order, it is safe to delete the entry right after updating it.
      this.Hs(t3);
    }, t2.prototype.addLocalQueryTarget = function(t3) {
      var e = "not-current";
      if (this.isActiveQueryTarget(t3)) {
        var n = this.storage.getItem(yo(this.persistenceKey, t3));
        if (n) {
          var r = mo.Vs(t3, n);
          r && (e = r.state);
        }
      }
      return this.Js.Ds(t3), this.Qs(), e;
    }, t2.prototype.removeLocalQueryTarget = function(t3) {
      this.Js.Cs(t3), this.Qs();
    }, t2.prototype.isLocalQueryTarget = function(t3) {
      return this.Js.activeTargetIds.has(t3);
    }, t2.prototype.clearQueryState = function(t3) {
      this.removeItem(yo(this.persistenceKey, t3));
    }, t2.prototype.updateQueryState = function(t3, e, n) {
      this.Ys(t3, e, n);
    }, t2.prototype.handleUserChange = function(t3, e, n) {
      var r = this;
      e.forEach(function(t4) {
        r.Hs(t4);
      }), this.currentUser = t3, n.forEach(function(t4) {
        r.addPendingMutation(t4);
      });
    }, t2.prototype.setOnlineState = function(t3) {
      this.Xs(t3);
    }, t2.prototype.notifyBundleLoaded = function() {
      this.Zs();
    }, t2.prototype.shutdown = function() {
      this.started && (this.window.removeEventListener("storage", this.xs), this.removeItem(this.Os), this.started = false);
    }, t2.prototype.getItem = function(t3) {
      var e = this.storage.getItem(t3);
      return C2("SharedClientState", "READ", t3, e), e;
    }, t2.prototype.setItem = function(t3, e) {
      C2("SharedClientState", "SET", t3, e), this.storage.setItem(t3, e);
    }, t2.prototype.removeItem = function(t3) {
      C2("SharedClientState", "REMOVE", t3), this.storage.removeItem(t3);
    }, t2.prototype.ks = function(t3) {
      var e = this, i = t3;
      if (i.storageArea === this.storage) {
        if (C2("SharedClientState", "EVENT", i.key, i.newValue), i.key === this.Os) return void x2("Received WebStorage notification for local change. Another client might have garbage-collected our state");
        this.Se.enqueueRetryable(function() {
          return __awaiter(e, void 0, void 0, function() {
            var t4, e2, n, o, s, u;
            return __generator(this, function(r) {
              if (this.started) {
                if (null !== i.key) {
                  if (this.Ls.test(i.key)) {
                    if (null == i.newValue) return t4 = this.ti(i.key), [2, this.ei(t4, null)];
                    if (e2 = this.ni(i.key, i.newValue)) return [2, this.ei(e2.clientId, e2)];
                  } else if (this.Bs.test(i.key)) {
                    if (null !== i.newValue && (n = this.si(i.key, i.newValue))) return [2, this.ii(n)];
                  } else if (this.qs.test(i.key)) {
                    if (null !== i.newValue && (o = this.ri(i.key, i.newValue))) return [2, this.oi(o)];
                  } else if (i.key === this.Us) {
                    if (null !== i.newValue && (s = this.js(i.newValue))) return [2, this.Ws(s)];
                  } else if (i.key === this.Ms) (u = function(t5) {
                    var e3 = S2.o;
                    if (null != t5) try {
                      var n2 = JSON.parse(t5);
                      P2("number" == typeof n2), e3 = n2;
                    } catch (t6) {
                      x2("SharedClientState", "Failed to read sequence number from WebStorage", t6);
                    }
                    return e3;
                  }(i.newValue)) !== S2.o && this.sequenceNumberHandler(u);
                  else if (i.key === this.Ks) return [2, this.syncEngine.ci()];
                }
              } else this.$s.push(i);
              return [
                2
                /*return*/
              ];
            });
          });
        });
      }
    }, Object.defineProperty(t2.prototype, "Js", {
      get: function() {
        return this.Fs.get(this.Ns);
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.Qs = function() {
      this.setItem(this.Os, this.Js.Ss());
    }, t2.prototype.zs = function(t3, e, n) {
      var r = new vo(this.currentUser, t3, e, n), i = po(this.persistenceKey, this.currentUser, t3);
      this.setItem(i, r.Ss());
    }, t2.prototype.Hs = function(t3) {
      var e = po(this.persistenceKey, this.currentUser, t3);
      this.removeItem(e);
    }, t2.prototype.Xs = function(t3) {
      var e = {
        clientId: this.Ns,
        onlineState: t3
      };
      this.storage.setItem(this.Us, JSON.stringify(e));
    }, t2.prototype.Ys = function(t3, e, n) {
      var r = yo(this.persistenceKey, t3), i = new mo(t3, e, n);
      this.setItem(r, i.Ss());
    }, t2.prototype.Zs = function() {
      this.setItem(this.Ks, "value-not-used");
    }, /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */
    t2.prototype.ti = function(t3) {
      var e = this.Ls.exec(t3);
      return e ? e[1] : null;
    }, /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */
    t2.prototype.ni = function(t3, e) {
      var n = this.ti(t3);
      return go.Vs(n, e);
    }, /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t2.prototype.si = function(t3, e) {
      var n = this.Bs.exec(t3), r = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
      return vo.Vs(new fo(i), r, e);
    }, /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t2.prototype.ri = function(t3, e) {
      var n = this.qs.exec(t3), r = Number(n[1]);
      return mo.Vs(r, e);
    }, /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t2.prototype.js = function(t3) {
      return wo.Vs(t3);
    }, t2.prototype.ii = function(t3) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(e) {
          return t3.user.uid === this.currentUser.uid ? [2, this.syncEngine.ui(t3.batchId, t3.state, t3.error)] : (C2("SharedClientState", "Ignoring mutation for non-active user " + t3.user.uid), [
            2
            /*return*/
          ]);
        });
      });
    }, t2.prototype.oi = function(t3) {
      return this.syncEngine.ai(t3.targetId, t3.state, t3.error);
    }, t2.prototype.ei = function(t3, e) {
      var n = this, r = e ? this.Fs.insert(t3, e) : this.Fs.remove(t3), i = this.Gs(this.Fs), o = this.Gs(r), s = [], u = [];
      return o.forEach(function(t4) {
        i.has(t4) || s.push(t4);
      }), i.forEach(function(t4) {
        o.has(t4) || u.push(t4);
      }), this.syncEngine.hi(s, u).then(function() {
        n.Fs = r;
      });
    }, t2.prototype.Ws = function(t3) {
      this.Fs.get(t3.clientId) && this.onlineStateHandler(t3.onlineState);
    }, t2.prototype.Gs = function(t3) {
      var e = an();
      return t3.forEach(function(t4, n) {
        e = e.unionWith(n.activeTargetIds);
      }), e;
    }, t2;
  }()
);
var To = (
  /** @class */
  function() {
    function t2() {
      this.li = new bo(), this.fi = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
    }
    return t2.prototype.addPendingMutation = function(t3) {
    }, t2.prototype.updateMutationState = function(t3, e, n) {
    }, t2.prototype.addLocalQueryTarget = function(t3) {
      return this.li.Ds(t3), this.fi[t3] || "not-current";
    }, t2.prototype.updateQueryState = function(t3, e, n) {
      this.fi[t3] = e;
    }, t2.prototype.removeLocalQueryTarget = function(t3) {
      this.li.Cs(t3);
    }, t2.prototype.isLocalQueryTarget = function(t3) {
      return this.li.activeTargetIds.has(t3);
    }, t2.prototype.clearQueryState = function(t3) {
      delete this.fi[t3];
    }, t2.prototype.getAllActiveQueryTargets = function() {
      return this.li.activeTargetIds;
    }, t2.prototype.isActiveQueryTarget = function(t3) {
      return this.li.activeTargetIds.has(t3);
    }, t2.prototype.start = function() {
      return this.li = new bo(), Promise.resolve();
    }, t2.prototype.handleUserChange = function(t3, e, n) {
    }, t2.prototype.setOnlineState = function(t3) {
    }, t2.prototype.shutdown = function() {
    }, t2.prototype.writeSequenceNumber = function(t3) {
    }, t2.prototype.notifyBundleLoaded = function() {
    }, t2;
  }()
);
var _o = (
  /** @class */
  function() {
    function t2() {
    }
    return t2.prototype.di = function(t3) {
    }, t2.prototype.shutdown = function() {
    }, t2;
  }()
);
var Eo = (
  /** @class */
  function() {
    function t2() {
      var t3 = this;
      this.wi = function() {
        return t3._i();
      }, this.mi = function() {
        return t3.yi();
      }, this.gi = [], this.pi();
    }
    return t2.prototype.di = function(t3) {
      this.gi.push(t3);
    }, t2.prototype.shutdown = function() {
      window.removeEventListener("online", this.wi), window.removeEventListener("offline", this.mi);
    }, t2.prototype.pi = function() {
      window.addEventListener("online", this.wi), window.addEventListener("offline", this.mi);
    }, t2.prototype._i = function() {
      C2("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
      for (var t3 = 0, e = this.gi; t3 < e.length; t3++) {
        (0, e[t3])(
          0
          /* AVAILABLE */
        );
      }
    }, t2.prototype.yi = function() {
      C2("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
      for (var t3 = 0, e = this.gi; t3 < e.length; t3++) {
        (0, e[t3])(
          1
          /* UNAVAILABLE */
        );
      }
    }, // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    t2.yt = function() {
      return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }, t2;
  }()
);
var So = {
  BatchGetDocuments: "batchGet",
  Commit: "commit",
  RunQuery: "runQuery"
};
var No = (
  /** @class */
  function() {
    function t2(t3) {
      this.Ei = t3.Ei, this.Ti = t3.Ti;
    }
    return t2.prototype.Ii = function(t3) {
      this.Ai = t3;
    }, t2.prototype.Ri = function(t3) {
      this.bi = t3;
    }, t2.prototype.onMessage = function(t3) {
      this.vi = t3;
    }, t2.prototype.close = function() {
      this.Ti();
    }, t2.prototype.send = function(t3) {
      this.Ei(t3);
    }, t2.prototype.Pi = function() {
      this.Ai();
    }, t2.prototype.Vi = function(t3) {
      this.bi(t3);
    }, t2.prototype.Si = function(t3) {
      this.vi(t3);
    }, t2;
  }()
);
var Do = (
  /** @class */
  function(e) {
    function n(t2) {
      var n2 = this;
      return (n2 = e.call(this, t2) || this).forceLongPolling = t2.forceLongPolling, n2.autoDetectLongPolling = t2.autoDetectLongPolling, n2.useFetchStreams = t2.useFetchStreams, n2;
    }
    return __extends(n, e), n.prototype.Fi = function(t2, e2, n2, r) {
      return new Promise(function(i, o) {
        var s = new XhrIo();
        s.listenOnce(EventType.COMPLETE, function() {
          try {
            switch (s.getLastErrorCode()) {
              case ErrorCode.NO_ERROR:
                var e3 = s.getResponseJson();
                C2("Connection", "XHR received:", JSON.stringify(e3)), i(e3);
                break;
              case ErrorCode.TIMEOUT:
                C2("Connection", 'RPC "' + t2 + '" timed out'), o(new D2(N2.DEADLINE_EXCEEDED, "Request time out"));
                break;
              case ErrorCode.HTTP_ERROR:
                var n3 = s.getStatus();
                if (C2("Connection", 'RPC "' + t2 + '" failed with status:', n3, "response text:", s.getResponseText()), n3 > 0) {
                  var r2 = s.getResponseJson().error;
                  if (r2 && r2.status && r2.message) {
                    var u2 = function(t3) {
                      var e4 = t3.toLowerCase().replace(/_/g, "-");
                      return Object.values(N2).indexOf(e4) >= 0 ? e4 : N2.UNKNOWN;
                    }(r2.status);
                    o(new D2(u2, r2.message));
                  } else o(new D2(N2.UNKNOWN, "Server responded with status " + s.getStatus()));
                } else
                  o(new D2(N2.UNAVAILABLE, "Connection failed."));
                break;
              default:
                O2();
            }
          } finally {
            C2("Connection", 'RPC "' + t2 + '" completed.');
          }
        });
        var u = JSON.stringify(r);
        s.send(e2, "POST", u, n2, 15);
      });
    }, n.prototype.Oi = function(t2, e2) {
      var n2 = [this.Di, "/", "google.firestore.v1.Firestore", "/", t2, "/channel"], r = createWebChannelTransport(), i = getStatEventTarget(), o = {
        // Required for backend stickiness, routing behavior is based on this
        // parameter.
        httpSessionIdParam: "gsessionid",
        initMessageHeaders: {},
        messageUrlParams: {
          // This param is used to improve routing and project isolation by the
          // backend and must be included in every request.
          database: "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database
        },
        sendRawJson: true,
        supportsCrossDomainXhr: true,
        internalChannelParams: {
          // Override the default timeout (randomized between 10-20 seconds) since
          // a large write batch on a slow internet connection may take a long
          // time to send to the backend. Rather than have WebChannel impose a
          // tight timeout which could lead to infinite timeouts and retries, we
          // set it very large (5-10 minutes) and rely on the browser's builtin
          // timeouts to kick in if the request isn't working.
          forwardChannelRequestTimeoutMs: 6e5
        },
        forceLongPolling: this.forceLongPolling,
        detectBufferingProxy: this.autoDetectLongPolling
      };
      this.useFetchStreams && (o.xmlHttpFactory = new FetchXmlHttpFactory({})), this.ki(o.initMessageHeaders, e2), // Sending the custom headers we just added to request.initMessageHeaders
      // (Authorization, etc.) will trigger the browser to make a CORS preflight
      // request because the XHR will no longer meet the criteria for a "simple"
      // CORS request:
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
      // Therefore to avoid the CORS preflight request (an extra network
      // roundtrip), we use the httpHeadersOverwriteParam option to specify that
      // the headers should instead be encoded into a special "$httpHeaders" query
      // parameter, which is recognized by the webchannel backend. This is
      // formally defined here:
      // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
      // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
      // doesn't have an Origin header. So we have to exclude a few browser environments that are
      // known to (sometimes) not include an Origin. See
      // https://github.com/firebase/firebase-js-sdk/issues/1491.
      isMobileCordova() || isReactNative() || isElectron() || isIE() || isUWP() || isBrowserExtension() || (o.httpHeadersOverwriteParam = "$httpHeaders");
      var l2 = n2.join("");
      C2("Connection", "Creating WebChannel: " + l2, o);
      var d = r.createWebChannel(l2, o), p2 = false, y2 = false, v2 = new No({
        Ei: function(t3) {
          y2 ? C2("Connection", "Not sending because WebChannel is closed:", t3) : (p2 || (C2("Connection", "Opening WebChannel transport."), d.open(), p2 = true), C2("Connection", "WebChannel sending:", t3), d.send(t3));
        },
        Ti: function() {
          return d.close();
        }
      }), m = function(t3, e3, n3) {
        t3.listen(e3, function(t4) {
          try {
            n3(t4);
          } catch (t5) {
            setTimeout(function() {
              throw t5;
            }, 0);
          }
        });
      };
      return m(d, WebChannel.EventType.OPEN, function() {
        y2 || C2("Connection", "WebChannel transport opened.");
      }), m(d, WebChannel.EventType.CLOSE, function() {
        y2 || (y2 = true, C2("Connection", "WebChannel transport closed"), v2.Vi());
      }), m(d, WebChannel.EventType.ERROR, function(t3) {
        y2 || (y2 = true, R2("Connection", "WebChannel transport errored:", t3), v2.Vi(new D2(N2.UNAVAILABLE, "The operation could not be completed")));
      }), m(d, WebChannel.EventType.MESSAGE, function(t3) {
        var e3;
        if (!y2) {
          var n3 = t3.data[0];
          P2(!!n3);
          var r2 = n3, i2 = r2.error || (null === (e3 = r2[0]) || void 0 === e3 ? void 0 : e3.error);
          if (i2) {
            C2("Connection", "WebChannel received error:", i2);
            var o2 = i2.status, s = (
              /**
              * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
              *
              * @returns The Code equivalent to the given status string or undefined if
              *     there is no match.
              */
              function(t4) {
                var e4 = Ue[t4];
                if (void 0 !== e4) return ze(e4);
              }(o2)
            ), u = i2.message;
            void 0 === s && (s = N2.INTERNAL, u = "Unknown error status: " + o2 + " with message " + i2.message), // Mark closed so no further events are propagated
            y2 = true, v2.Vi(new D2(s, u)), d.close();
          } else C2("Connection", "WebChannel received:", n3), v2.Si(n3);
        }
      }), m(i, Event.STAT_EVENT, function(t3) {
        t3.stat === Stat.PROXY ? C2("Connection", "Detected buffering proxy") : t3.stat === Stat.NOPROXY && C2("Connection", "Detected no buffering proxy");
      }), setTimeout(function() {
        v2.Pi();
      }, 0), v2;
    }, n;
  }(
    /** @class */
    function() {
      function t2(t3) {
        this.databaseInfo = t3, this.databaseId = t3.databaseId;
        var e = t3.ssl ? "https" : "http";
        this.Di = e + "://" + t3.host, this.Ci = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
      }
      return t2.prototype.Ni = function(t3, e, n, r) {
        var i = this.xi(t3, e);
        C2("RestConnection", "Sending: ", i, n);
        var o = {};
        return this.ki(o, r), this.Fi(t3, i, o, n).then(function(t4) {
          return C2("RestConnection", "Received: ", t4), t4;
        }, function(e2) {
          throw R2("RestConnection", t3 + " failed with error: ", e2, "url: ", i, "request:", n), e2;
        });
      }, t2.prototype.$i = function(t3, e, n, r) {
        return this.Ni(t3, e, n, r);
      }, /**
       * Modifies the headers for a request, adding any authorization token if
       * present and any additional headers for the request.
       */
      t2.prototype.ki = function(t3, e) {
        if (t3["X-Goog-Api-Client"] = "gl-js/ fire/8.10.1", // Content-Type: text/plain will avoid preflight requests which might
        // mess with CORS and redirects by proxies. If we add custom headers
        // we will need to change this code to potentially use the $httpOverwrite
        // parameter supported by ESF to avoid triggering preflight requests.
        t3["Content-Type"] = "text/plain", this.databaseInfo.appId && (t3["X-Firebase-GMPID"] = this.databaseInfo.appId), e) for (var n in e.authHeaders) e.authHeaders.hasOwnProperty(n) && (t3[n] = e.authHeaders[n]);
      }, t2.prototype.xi = function(t3, e) {
        var n = So[t3];
        return this.Di + "/v1/" + e + ":" + n;
      }, t2;
    }()
  )
);
function Ao() {
  return "undefined" != typeof window ? window : null;
}
function ko() {
  return "undefined" != typeof document ? document : null;
}
function Co(t2) {
  return new bn(
    t2,
    /* useProto3Json= */
    true
  );
}
var xo = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i) {
      void 0 === n && (n = 1e3), void 0 === r && (r = 1.5), void 0 === i && (i = 6e4), this.Se = t3, this.timerId = e, this.Mi = n, this.Li = r, this.Bi = i, this.qi = 0, this.Ui = null, /** The last backoff attempt, as epoch milliseconds. */
      this.Ki = Date.now(), this.reset();
    }
    return t2.prototype.reset = function() {
      this.qi = 0;
    }, /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    t2.prototype.Qi = function() {
      this.qi = this.Bi;
    }, /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    t2.prototype.ji = function(t3) {
      var e = this;
      this.cancel();
      var n = Math.floor(this.qi + this.Wi()), r = Math.max(0, Date.now() - this.Ki), i = Math.max(0, n - r);
      i > 0 && C2("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.qi + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), this.Ui = this.Se.enqueueAfterDelay(this.timerId, i, function() {
        return e.Ki = Date.now(), t3();
      }), // Apply backoff factor to determine next delay and ensure it is within
      // bounds.
      this.qi *= this.Li, this.qi < this.Mi && (this.qi = this.Mi), this.qi > this.Bi && (this.qi = this.Bi);
    }, t2.prototype.Gi = function() {
      null !== this.Ui && (this.Ui.skipDelay(), this.Ui = null);
    }, t2.prototype.cancel = function() {
      null !== this.Ui && (this.Ui.cancel(), this.Ui = null);
    }, /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
    t2.prototype.Wi = function() {
      return (Math.random() - 0.5) * this.qi;
    }, t2;
  }()
);
var Ro = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i, o) {
      this.Se = t3, this.zi = n, this.Hi = r, this.Ji = i, this.listener = o, this.state = 0, /**
           * A close count that's incremented every time the stream is closed; used by
           * getCloseGuardedDispatcher() to invalidate callbacks that happen after
           * close.
           */
      this.Yi = 0, this.Xi = null, this.stream = null, this.Zi = new xo(t3, e);
    }
    return t2.prototype.tr = function() {
      return 1 === this.state || 2 === this.state || 4 === this.state;
    }, /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */
    t2.prototype.er = function() {
      return 2 === this.state;
    }, /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */
    t2.prototype.start = function() {
      3 !== this.state ? this.auth() : this.nr();
    }, /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */
    t2.prototype.stop = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(t3) {
          switch (t3.label) {
            case 0:
              return this.tr() ? [4, this.close(
                0
                /* Initial */
              )] : [3, 2];
            case 1:
              t3.sent(), t3.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */
    t2.prototype.sr = function() {
      this.state = 0, this.Zi.reset();
    }, /**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */
    t2.prototype.ir = function() {
      var t3 = this;
      this.er() && null === this.Xi && (this.Xi = this.Se.enqueueAfterDelay(this.zi, 6e4, function() {
        return t3.rr();
      }));
    }, /** Sends a message to the underlying stream. */
    t2.prototype.cr = function(t3) {
      this.ur(), this.stream.send(t3);
    }, /** Called by the idle timer when the stream should close due to inactivity. */
    t2.prototype.rr = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(t3) {
          return this.er() ? [2, this.close(
            0
            /* Initial */
          )] : [
            2
            /*return*/
          ];
        });
      });
    }, /** Marks the stream as active again. */
    t2.prototype.ur = function() {
      this.Xi && (this.Xi.cancel(), this.Xi = null);
    }, /**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState - the intended state of the stream after closing.
     * @param error - the error the connection was closed with.
     */
    t2.prototype.close = function(t3, e) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(n) {
          switch (n.label) {
            case 0:
              return this.ur(), this.Zi.cancel(), // Invalidates any stream-related callbacks (e.g. from auth or the
              // underlying stream), guaranteeing they won't execute.
              this.Yi++, 3 !== t3 ? (
                // If this is an intentional close ensure we don't delay our next connection attempt.
                this.Zi.reset()
              ) : e && e.code === N2.RESOURCE_EXHAUSTED ? (
                // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
                (x2(e.toString()), x2("Using maximum backoff delay to prevent overloading the backend."), this.Zi.Qi())
              ) : e && e.code === N2.UNAUTHENTICATED && // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
              // just expired.
              this.Ji.invalidateToken(), // Clean up the underlying stream because we are no longer interested in events.
              null !== this.stream && (this.ar(), this.stream.close(), this.stream = null), // This state must be assigned before calling onClose() to allow the callback to
              // inhibit backoff or otherwise manipulate the state in its non-started state.
              this.state = t3, [4, this.listener.Ri(e)];
            case 1:
              return n.sent(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */
    t2.prototype.ar = function() {
    }, t2.prototype.auth = function() {
      var t3 = this;
      this.state = 1;
      var e = this.hr(this.Yi), n = this.Yi;
      this.Ji.getToken().then(function(e2) {
        t3.Yi === n && // Normally we'd have to schedule the callback on the AsyncQueue.
        // However, the following calls are safe to be called outside the
        // AsyncQueue since they don't chain asynchronous calls
        t3.lr(e2);
      }, function(n2) {
        e(function() {
          var e2 = new D2(N2.UNKNOWN, "Fetching auth token failed: " + n2.message);
          return t3.dr(e2);
        });
      });
    }, t2.prototype.lr = function(t3) {
      var e = this, n = this.hr(this.Yi);
      this.stream = this.wr(t3), this.stream.Ii(function() {
        n(function() {
          return e.state = 2, e.listener.Ii();
        });
      }), this.stream.Ri(function(t4) {
        n(function() {
          return e.dr(t4);
        });
      }), this.stream.onMessage(function(t4) {
        n(function() {
          return e.onMessage(t4);
        });
      });
    }, t2.prototype.nr = function() {
      var t3 = this;
      this.state = 4, this.Zi.ji(function() {
        return __awaiter(t3, void 0, void 0, function() {
          return __generator(this, function(t4) {
            return this.state = 0, this.start(), [
              2
              /*return*/
            ];
          });
        });
      });
    }, // Visible for tests
    t2.prototype.dr = function(t3) {
      return C2("PersistentStream", "close with error: " + t3), this.stream = null, this.close(3, t3);
    }, /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */
    t2.prototype.hr = function(t3) {
      var e = this;
      return function(n) {
        e.Se.enqueueAndForget(function() {
          return e.Yi === t3 ? n() : (C2("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve());
        });
      };
    }, t2;
  }()
);
var Lo = (
  /** @class */
  function(e) {
    function n(t2, n2, r, i, o) {
      var s = this;
      return (s = e.call(this, t2, "listen_stream_connection_backoff", "listen_stream_idle", n2, r, o) || this).R = i, s;
    }
    return __extends(n, e), n.prototype.wr = function(t2) {
      return this.Hi.Oi("Listen", t2);
    }, n.prototype.onMessage = function(t2) {
      this.Zi.reset();
      var e2 = function(t3, e3) {
        var n3;
        if ("targetChange" in e3) {
          e3.targetChange;
          var r = function(t4) {
            return "NO_CHANGE" === t4 ? 0 : "ADD" === t4 ? 1 : "REMOVE" === t4 ? 2 : "CURRENT" === t4 ? 3 : "RESET" === t4 ? 4 : O2();
          }(e3.targetChange.targetChangeType || "NO_CHANGE"), i = e3.targetChange.targetIds || [], o = function(t4, e4) {
            return t4.I ? (P2(void 0 === e4 || "string" == typeof e4), J2.fromBase64String(e4 || "")) : (P2(void 0 === e4 || e4 instanceof Uint8Array), J2.fromUint8Array(e4 || new Uint8Array()));
          }(t3, e3.targetChange.resumeToken), s = (u = e3.targetChange.cause) && function(t4) {
            var e4 = void 0 === t4.code ? N2.UNKNOWN : ze(t4.code);
            return new D2(e4, t4.message || "");
          }(u);
          n3 = new dn(r, i, o, s || null);
        } else if ("documentChange" in e3) {
          e3.documentChange, (r = e3.documentChange).document, r.document.name, r.document.updateTime, i = An(t3, r.document.name), o = En(r.document.updateTime);
          var u = new Et({
            mapValue: {
              fields: r.document.fields
            }
          }), a = (s = Nt.newFoundDocument(i, o, u), r.targetIds || []), c = r.removedTargetIds || [];
          n3 = new fn(a, c, s.key, s);
        } else if ("documentDelete" in e3) e3.documentDelete, (r = e3.documentDelete).document, i = An(t3, r.document), o = r.readTime ? En(r.readTime) : K2.min(), u = Nt.newNoDocument(i, o), s = r.removedTargetIds || [], n3 = new fn([], s, u.key, u);
        else if ("documentRemove" in e3) e3.documentRemove, (r = e3.documentRemove).document, i = An(t3, r.document), o = r.removedTargetIds || [], n3 = new fn([], o, i, null);
        else {
          if (!("filter" in e3)) return O2();
          e3.filter;
          var h = e3.filter;
          h.targetId, r = h.count || 0, i = new Ge(r), o = h.targetId, n3 = new ln(o, i);
        }
        return n3;
      }(this.R, t2), n2 = function(t3) {
        if (!("targetChange" in t3)) return K2.min();
        var e3 = t3.targetChange;
        return e3.targetIds && e3.targetIds.length ? K2.min() : e3.readTime ? En(e3.readTime) : K2.min();
      }(t2);
      return this.listener._r(e2, n2);
    }, /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */
    n.prototype.mr = function(t2) {
      var e2 = {};
      e2.database = xn(this.R), e2.addTarget = function(t3, e3) {
        var n3, r = e3.target;
        return (n3 = xt(r) ? {
          documents: Mn(t3, r)
        } : {
          query: Vn(t3, r)
        }).targetId = e3.targetId, e3.resumeToken.approximateByteSize() > 0 ? n3.resumeToken = Tn(t3, e3.resumeToken) : e3.snapshotVersion.compareTo(K2.min()) > 0 && // TODO(wuandy): Consider removing above check because it is most likely true.
        // Right now, many tests depend on this behaviour though (leaving min() out
        // of serialization).
        (n3.readTime = In(t3, e3.snapshotVersion.toTimestamp())), n3;
      }(this.R, t2);
      var n2 = function(t3, e3) {
        var n3 = function(t4, e4) {
          switch (e4) {
            case 0:
              return null;
            case 1:
              return "existence-filter-mismatch";
            case 2:
              return "limbo-document";
            default:
              return O2();
          }
        }(0, e3.purpose);
        return null == n3 ? null : {
          "goog-listen-tags": n3
        };
      }(this.R, t2);
      n2 && (e2.labels = n2), this.cr(e2);
    }, /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */
    n.prototype.yr = function(t2) {
      var e2 = {};
      e2.database = xn(this.R), e2.removeTarget = t2, this.cr(e2);
    }, n;
  }(Ro)
);
var Oo = (
  /** @class */
  function(e) {
    function n(t2, n2, r, i, o) {
      var s = this;
      return (s = e.call(this, t2, "write_stream_connection_backoff", "write_stream_idle", n2, r, o) || this).R = i, s.gr = false, s;
    }
    return __extends(n, e), Object.defineProperty(n.prototype, "pr", {
      /**
       * Tracks whether or not a handshake has been successfully exchanged and
       * the stream is ready to accept mutations.
       */
      get: function() {
        return this.gr;
      },
      enumerable: false,
      configurable: true
    }), // Override of PersistentStream.start
    n.prototype.start = function() {
      this.gr = false, this.lastStreamToken = void 0, e.prototype.start.call(this);
    }, n.prototype.ar = function() {
      this.gr && this.Er([]);
    }, n.prototype.wr = function(t2) {
      return this.Hi.Oi("Write", t2);
    }, n.prototype.onMessage = function(t2) {
      if (
        // Always capture the last stream token.
        P2(!!t2.streamToken), this.lastStreamToken = t2.streamToken, this.gr
      ) {
        this.Zi.reset();
        var e2 = function(t3, e3) {
          return t3 && t3.length > 0 ? (P2(void 0 !== e3), t3.map(function(t4) {
            return function(t5, e4) {
              var n3 = t5.updateTime ? En(t5.updateTime) : En(e4);
              return n3.isEqual(K2.min()) && // The Firestore Emulator currently returns an update time of 0 for
              // deletes of non-existing documents (rather than null). This breaks the
              // test "get deleted doc while offline with source=cache" as NoDocuments
              // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
              // TODO(#2149): Remove this when Emulator is fixed
              (n3 = En(e4)), new Ne(n3, t5.transformResults || []);
            }(t4, e3);
          })) : [];
        }(t2.writeResults, t2.commitTime), n2 = En(t2.commitTime);
        return this.listener.Tr(n2, e2);
      }
      return P2(!t2.writeResults || 0 === t2.writeResults.length), this.gr = true, this.listener.Ir();
    }, /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */
    n.prototype.Ar = function() {
      var t2 = {};
      t2.database = xn(this.R), this.cr(t2);
    }, /** Sends a group of mutations to the Firestore backend to apply. */
    n.prototype.Er = function(t2) {
      var e2 = this, n2 = {
        streamToken: this.lastStreamToken,
        writes: t2.map(function(t3) {
          return Pn(e2.R, t3);
        })
      };
      this.cr(n2);
    }, n;
  }(Ro)
);
var Po = (
  /** @class */
  function(e) {
    function n(t2, n2, r) {
      var i = this;
      return (i = e.call(this) || this).credentials = t2, i.Hi = n2, i.R = r, i.Rr = false, i;
    }
    return __extends(n, e), n.prototype.br = function() {
      if (this.Rr) throw new D2(N2.FAILED_PRECONDITION, "The client has already been terminated.");
    }, /** Gets an auth token and invokes the provided RPC. */
    n.prototype.Ni = function(t2, e2, n2) {
      var r = this;
      return this.br(), this.credentials.getToken().then(function(i) {
        return r.Hi.Ni(t2, e2, n2, i);
      }).catch(function(t3) {
        throw "FirebaseError" === t3.name ? (t3.code === N2.UNAUTHENTICATED && r.credentials.invalidateToken(), t3) : new D2(N2.UNKNOWN, t3.toString());
      });
    }, /** Gets an auth token and invokes the provided RPC with streamed results. */
    n.prototype.$i = function(t2, e2, n2) {
      var r = this;
      return this.br(), this.credentials.getToken().then(function(i) {
        return r.Hi.$i(t2, e2, n2, i);
      }).catch(function(t3) {
        throw "FirebaseError" === t3.name ? (t3.code === N2.UNAUTHENTICATED && r.credentials.invalidateToken(), t3) : new D2(N2.UNKNOWN, t3.toString());
      });
    }, n.prototype.terminate = function() {
      this.Rr = true;
    }, n;
  }(function() {
  })
);
var Fo = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.asyncQueue = t3, this.onlineStateHandler = e, /** The current OnlineState. */
      this.state = "Unknown", /**
           * A count of consecutive failures to open the stream. If it reaches the
           * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
           * Offline.
           */
      this.vr = 0, /**
           * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
           * transition from OnlineState.Unknown to OnlineState.Offline without waiting
           * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
           */
      this.Pr = null, /**
           * Whether the client should log a warning message if it fails to connect to
           * the backend (initially true, cleared after a successful stream, or if we've
           * logged the message already).
           */
      this.Vr = true;
    }
    return t2.prototype.Sr = function() {
      var t3 = this;
      0 === this.vr && (this.Dr(
        "Unknown"
        /* Unknown */
      ), this.Pr = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, function() {
        return t3.Pr = null, t3.Cr("Backend didn't respond within 10 seconds."), t3.Dr(
          "Offline"
          /* Offline */
        ), Promise.resolve();
      }));
    }, /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */
    t2.prototype.Nr = function(t3) {
      "Online" === this.state ? this.Dr(
        "Unknown"
        /* Unknown */
      ) : (this.vr++, this.vr >= 1 && (this.kr(), this.Cr("Connection failed 1 times. Most recent error: " + t3.toString()), this.Dr(
        "Offline"
        /* Offline */
      )));
    }, /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */
    t2.prototype.set = function(t3) {
      this.kr(), this.vr = 0, "Online" === t3 && // We've connected to watch at least once. Don't warn the developer
      // about being offline going forward.
      (this.Vr = false), this.Dr(t3);
    }, t2.prototype.Dr = function(t3) {
      t3 !== this.state && (this.state = t3, this.onlineStateHandler(t3));
    }, t2.prototype.Cr = function(t3) {
      var e = "Could not reach Cloud Firestore backend. " + t3 + "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
      this.Vr ? (x2(e), this.Vr = false) : C2("OnlineStateTracker", e);
    }, t2.prototype.kr = function() {
      null !== this.Pr && (this.Pr.cancel(), this.Pr = null);
    }, t2;
  }()
);
var Mo = function(t2, e, i, o, s) {
  var u = this;
  this.localStore = t2, this.datastore = e, this.asyncQueue = i, this.remoteSyncer = {}, /**
           * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
           * LocalStore via fillWritePipeline() and have or will send to the write
           * stream.
           *
           * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
           * restart the write stream. When the stream is established the writes in the
           * pipeline will be sent in order.
           *
           * Writes remain in writePipeline until they are acknowledged by the backend
           * and thus will automatically be re-sent if the stream is interrupted /
           * restarted before they're acknowledged.
           *
           * Write responses from the backend are linked to their originating request
           * purely based on order, and so we can just shift() writes from the front of
           * the writePipeline as we receive responses.
           */
  this.Fr = [], /**
           * A mapping of watched targets that the client cares about tracking and the
           * user has explicitly called a 'listen' for this target.
           *
           * These targets may or may not have been sent to or acknowledged by the
           * server. On re-establishing the listen stream, these targets should be sent
           * to the server. The targets removed with unlistens are removed eagerly
           * without waiting for confirmation from the listen stream.
           */
  this.$r = /* @__PURE__ */ new Map(), /**
           * A set of reasons for why the RemoteStore may be offline. If empty, the
           * RemoteStore may start its network connections.
           */
  this.Or = /* @__PURE__ */ new Set(), /**
           * Event handlers that get called when the network is disabled or enabled.
           *
           * PORTING NOTE: These functions are used on the Web client to create the
           * underlying streams (to support tree-shakeable streams). On Android and iOS,
           * the streams are created during construction of RemoteStore.
           */
  this.Mr = [], this.Lr = s, this.Lr.di(function(t3) {
    i.enqueueAndForget(function() {
      return __awaiter(u, void 0, void 0, function() {
        return __generator(this, function(t4) {
          switch (t4.label) {
            case 0:
              return zo(this) ? (C2("RemoteStore", "Restarting streams for network reachability change."), [4, function(t5) {
                return __awaiter(this, void 0, void 0, function() {
                  var e2;
                  return __generator(this, function(n) {
                    switch (n.label) {
                      case 0:
                        return (e2 = F2(t5)).Or.add(
                          4
                          /* ConnectivityChange */
                        ), [4, qo(e2)];
                      case 1:
                        return n.sent(), e2.Br.set(
                          "Unknown"
                          /* Unknown */
                        ), e2.Or.delete(
                          4
                          /* ConnectivityChange */
                        ), [4, Vo(e2)];
                      case 2:
                        return n.sent(), [
                          2
                          /*return*/
                        ];
                    }
                  });
                });
              }(this)]) : [3, 2];
            case 1:
              t4.sent(), t4.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    });
  }), this.Br = new Fo(i, o);
};
function Vo(t2) {
  return __awaiter(this, void 0, void 0, function() {
    var e, n;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          if (!zo(t2)) return [3, 4];
          e = 0, n = t2.Mr, r.label = 1;
        case 1:
          return e < n.length ? [4, (0, n[e])(
            /* enabled= */
            true
          )] : [3, 4];
        case 2:
          r.sent(), r.label = 3;
        case 3:
          return e++, [3, 1];
        case 4:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function qo(t2) {
  return __awaiter(this, void 0, void 0, function() {
    var e, n;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          e = 0, n = t2.Mr, r.label = 1;
        case 1:
          return e < n.length ? [4, (0, n[e])(
            /* enabled= */
            false
          )] : [3, 4];
        case 2:
          r.sent(), r.label = 3;
        case 3:
          return e++, [3, 1];
        case 4:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Uo(t2, e) {
  var n = F2(t2);
  n.$r.has(e.targetId) || // Mark this as something the client is currently listening for.
  (n.$r.set(e.targetId, e), Qo(n) ? (
    // The listen will be sent in onWatchStreamOpen
    Go(n)
  ) : us(n).er() && jo(n, e));
}
function Bo(t2, e) {
  var n = F2(t2), r = us(n);
  n.$r.delete(e), r.er() && Ko(n, e), 0 === n.$r.size && (r.er() ? r.ir() : zo(n) && // Revert to OnlineState.Unknown if the watch stream is not open and we
  // have no listeners, since without any listens to send we cannot
  // confirm if the stream is healthy and upgrade to OnlineState.Online.
  n.Br.set(
    "Unknown"
    /* Unknown */
  ));
}
function jo(t2, e) {
  t2.qr.U(e.targetId), us(t2).mr(e);
}
function Ko(t2, e) {
  t2.qr.U(e), us(t2).yr(e);
}
function Go(t2) {
  t2.qr = new yn({
    getRemoteKeysForTarget: function(e) {
      return t2.remoteSyncer.getRemoteKeysForTarget(e);
    },
    lt: function(e) {
      return t2.$r.get(e) || null;
    }
  }), us(t2).start(), t2.Br.Sr();
}
function Qo(t2) {
  return zo(t2) && !us(t2).tr() && t2.$r.size > 0;
}
function zo(t2) {
  return 0 === F2(t2).Or.size;
}
function Wo(t2) {
  t2.qr = void 0;
}
function Ho(t2) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(e) {
      return t2.$r.forEach(function(e2, n) {
        jo(t2, e2);
      }), [
        2
        /*return*/
      ];
    });
  });
}
function Yo(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(n) {
      return Wo(t2), // If we still need the watch stream, retry the connection.
      Qo(t2) ? (t2.Br.Nr(e), Go(t2)) : (
        // No need to restart watch stream because there are no active targets.
        // The online state is set to unknown because there is no active attempt
        // at establishing a connection
        t2.Br.set(
          "Unknown"
          /* Unknown */
        )
      ), [
        2
        /*return*/
      ];
    });
  });
}
function $o(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var o, s, u;
    return __generator(this, function(a) {
      switch (a.label) {
        case 0:
          if (t2.Br.set(
            "Online"
            /* Online */
          ), !(e instanceof dn && 2 === e.state && e.cause))
            return [3, 6];
          a.label = 1;
        case 1:
          return a.trys.push([1, 3, , 5]), [
            4,
            /** Handles an error on a target */
            function(t3, e2) {
              return __awaiter(this, void 0, void 0, function() {
                var n, i2, o2, s2;
                return __generator(this, function(r) {
                  switch (r.label) {
                    case 0:
                      n = e2.cause, i2 = 0, o2 = e2.targetIds, r.label = 1;
                    case 1:
                      return i2 < o2.length ? (s2 = o2[i2], t3.$r.has(s2) ? [4, t3.remoteSyncer.rejectListen(s2, n)] : [3, 3]) : [3, 5];
                    case 2:
                      r.sent(), t3.$r.delete(s2), t3.qr.removeTarget(s2), r.label = 3;
                    case 3:
                      r.label = 4;
                    case 4:
                      return i2++, [3, 1];
                    case 5:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }(t2, e)
          ];
        case 2:
          return a.sent(), [3, 5];
        case 3:
          return o = a.sent(), C2("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), o), [4, Xo(t2, o)];
        case 4:
          return a.sent(), [3, 5];
        case 5:
          return [3, 13];
        case 6:
          if (e instanceof fn ? t2.qr.X(e) : e instanceof ln ? t2.qr.rt(e) : t2.qr.et(e), i.isEqual(K2.min())) return [3, 13];
          a.label = 7;
        case 7:
          return a.trys.push([7, 11, , 13]), [4, Ki(t2.localStore)];
        case 8:
          return s = a.sent(), i.compareTo(s) >= 0 ? [
            4,
            /**
             * Takes a batch of changes from the Datastore, repackages them as a
             * RemoteEvent, and passes that on to the listener, which is typically the
             * SyncEngine.
             */
            function(t3, e2) {
              var n = t3.qr.ut(e2);
              return n.targetChanges.forEach(function(n2, r) {
                if (n2.resumeToken.approximateByteSize() > 0) {
                  var i2 = t3.$r.get(r);
                  i2 && t3.$r.set(r, i2.withResumeToken(n2.resumeToken, e2));
                }
              }), // Re-establish listens for the targets that have been invalidated by
              // existence filter mismatches.
              n.targetMismatches.forEach(function(e3) {
                var n2 = t3.$r.get(e3);
                if (n2) {
                  t3.$r.set(e3, n2.withResumeToken(J2.EMPTY_BYTE_STRING, n2.snapshotVersion)), // Cause a hard reset by unwatching and rewatching immediately, but
                  // deliberately don't send a resume token so that we get a full update.
                  Ko(t3, e3);
                  var r = new Pr(n2.target, e3, 1, n2.sequenceNumber);
                  jo(t3, r);
                }
              }), t3.remoteSyncer.applyRemoteEvent(n);
            }(t2, i)
          ] : [3, 10];
        // We have received a target change with a global snapshot if the snapshot
        // version is not equal to SnapshotVersion.min().
        case 9:
          a.sent(), a.label = 10;
        case 10:
          return [3, 13];
        case 11:
          return C2("RemoteStore", "Failed to raise snapshot:", u = a.sent()), [4, Xo(t2, u)];
        case 12:
          return a.sent(), [3, 13];
        case 13:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Xo(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var o = this;
    return __generator(this, function(s) {
      switch (s.label) {
        case 0:
          if (!Nr(e)) throw e;
          return t2.Or.add(
            1
            /* IndexedDbFailed */
          ), [4, qo(t2)];
        case 1:
          return s.sent(), t2.Br.set(
            "Offline"
            /* Offline */
          ), i || // Use a simple read operation to determine if IndexedDB recovered.
          // Ideally, we would expose a health check directly on SimpleDb, but
          // RemoteStore only has access to persistence through LocalStore.
          (i = function() {
            return Ki(t2.localStore);
          }), // Probe IndexedDB periodically and re-enable network
          t2.asyncQueue.enqueueRetryable(function() {
            return __awaiter(o, void 0, void 0, function() {
              return __generator(this, function(e2) {
                switch (e2.label) {
                  case 0:
                    return C2("RemoteStore", "Retrying IndexedDB access"), [4, i()];
                  case 1:
                    return e2.sent(), t2.Or.delete(
                      1
                      /* IndexedDbFailed */
                    ), [4, Vo(t2)];
                  case 2:
                    return e2.sent(), [
                      2
                      /*return*/
                    ];
                }
              });
            });
          }), [
            2
            /*return*/
          ];
      }
    });
  });
}
function Jo(t2, e) {
  return e().catch(function(n) {
    return Xo(t2, n, e);
  });
}
function Zo(t2) {
  return __awaiter(this, void 0, void 0, function() {
    var e, n, i, o, s;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          e = F2(t2), n = as(e), i = e.Fr.length > 0 ? e.Fr[e.Fr.length - 1].batchId : -1, r.label = 1;
        case 1:
          if (!/**
          * Returns true if we can add to the write pipeline (i.e. the network is
          * enabled and the write pipeline is not full).
          */
          function(t3) {
            return zo(t3) && t3.Fr.length < 10;
          }(e)) return [3, 7];
          r.label = 2;
        case 2:
          return r.trys.push([2, 4, , 6]), [4, zi(e.localStore, i)];
        case 3:
          return null === (o = r.sent()) ? (0 === e.Fr.length && n.ir(), [3, 7]) : (i = o.batchId, function(t3, e2) {
            t3.Fr.push(e2);
            var n2 = as(t3);
            n2.er() && n2.pr && n2.Er(e2.mutations);
          }(e, o), [3, 6]);
        case 4:
          return s = r.sent(), [4, Xo(e, s)];
        case 5:
          return r.sent(), [3, 6];
        case 6:
          return [3, 1];
        case 7:
          return ts(e) && es(e), [
            2
            /*return*/
          ];
      }
    });
  });
}
function ts(t2) {
  return zo(t2) && !as(t2).tr() && t2.Fr.length > 0;
}
function es(t2) {
  as(t2).start();
}
function ns(t2) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(e) {
      return as(t2).Ar(), [
        2
        /*return*/
      ];
    });
  });
}
function rs(t2) {
  return __awaiter(this, void 0, void 0, function() {
    var e, n, i, o;
    return __generator(this, function(r) {
      for (e = as(t2), n = 0, i = t2.Fr; n < i.length; n++) o = i[n], e.Er(o.mutations);
      return [
        2
        /*return*/
      ];
    });
  });
}
function is(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var n, o;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return n = t2.Fr.shift(), o = Or.from(n, e, i), [4, Jo(t2, function() {
            return t2.remoteSyncer.applySuccessfulWrite(o);
          })];
        case 1:
          return r.sent(), [4, Zo(t2)];
        case 2:
          return r.sent(), [
            2
            /*return*/
          ];
      }
    });
  });
}
function os(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(i) {
      switch (i.label) {
        case 0:
          return e && as(t2).pr ? [4, function(t3, e2) {
            return __awaiter(this, void 0, void 0, function() {
              var n, i2;
              return __generator(this, function(r) {
                switch (r.label) {
                  case 0:
                    return Qe(i2 = e2.code) && i2 !== N2.ABORTED ? (n = t3.Fr.shift(), // In this case it's also unlikely that the server itself is melting
                    // down -- this was just a bad request so inhibit backoff on the next
                    // restart.
                    as(t3).sr(), [4, Jo(t3, function() {
                      return t3.remoteSyncer.rejectFailedWrite(n.batchId, e2);
                    })]) : [3, 3];
                  case 1:
                    return r.sent(), [4, Zo(t3)];
                  case 2:
                    r.sent(), r.label = 3;
                  case 3:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          }(t2, e)] : [3, 2];
        // This error affects the actual write.
        case 1:
          i.sent(), i.label = 2;
        case 2:
          return ts(t2) && es(t2), [
            2
            /*return*/
          ];
      }
    });
  });
}
function ss(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return n = F2(t2), e ? (n.Or.delete(
            2
            /* IsSecondary */
          ), [4, Vo(n)]) : [3, 2];
        case 1:
          return r.sent(), [3, 5];
        case 2:
          return e ? [3, 4] : (n.Or.add(
            2
            /* IsSecondary */
          ), [4, qo(n)]);
        case 3:
          r.sent(), n.Br.set(
            "Unknown"
            /* Unknown */
          ), r.label = 4;
        case 4:
          r.label = 5;
        case 5:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function us(t2) {
  var e = this;
  return t2.Ur || // Create stream (but note that it is not started yet).
  (t2.Ur = function(t3, e2, n) {
    var r = F2(t3);
    return r.br(), new Lo(e2, r.Hi, r.credentials, r.R, n);
  }(t2.datastore, t2.asyncQueue, {
    Ii: Ho.bind(null, t2),
    Ri: Yo.bind(null, t2),
    _r: $o.bind(null, t2)
  }), t2.Mr.push(function(i) {
    return __awaiter(e, void 0, void 0, function() {
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return i ? (t2.Ur.sr(), Qo(t2) ? Go(t2) : t2.Br.set(
              "Unknown"
              /* Unknown */
            ), [3, 3]) : [3, 1];
          case 1:
            return [4, t2.Ur.stop()];
          case 2:
            e2.sent(), Wo(t2), e2.label = 3;
          case 3:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  })), t2.Ur;
}
function as(t2) {
  var e = this;
  return t2.Kr || // Create stream (but note that it is not started yet).
  (t2.Kr = function(t3, e2, n) {
    var r = F2(t3);
    return r.br(), new Oo(e2, r.Hi, r.credentials, r.R, n);
  }(t2.datastore, t2.asyncQueue, {
    Ii: ns.bind(null, t2),
    Ri: os.bind(null, t2),
    Ir: rs.bind(null, t2),
    Tr: is.bind(null, t2)
  }), t2.Mr.push(function(i) {
    return __awaiter(e, void 0, void 0, function() {
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return i ? (t2.Kr.sr(), [4, Zo(t2)]) : [3, 2];
          case 1:
            return e2.sent(), [3, 4];
          case 2:
            return [4, t2.Kr.stop()];
          case 3:
            e2.sent(), t2.Fr.length > 0 && (C2("RemoteStore", "Stopping write stream with " + t2.Fr.length + " pending writes"), t2.Fr = []), e2.label = 4;
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  })), t2.Kr;
}
var cs = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i) {
      this.asyncQueue = t3, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new br(), this.then = this.deferred.promise.then.bind(this.deferred.promise), // It's normal for the deferred promise to be canceled (due to cancellation)
      // and so we attach a dummy catch callback to avoid
      // 'UnhandledPromiseRejectionWarning' log spam.
      this.deferred.promise.catch(function(t4) {
      });
    }
    return t2.createAndSchedule = function(e, n, r, i, o) {
      var s = new t2(e, n, Date.now() + r, i, o);
      return s.start(r), s;
    }, /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    t2.prototype.start = function(t3) {
      var e = this;
      this.timerHandle = setTimeout(function() {
        return e.handleDelayElapsed();
      }, t3);
    }, /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    t2.prototype.skipDelay = function() {
      return this.handleDelayElapsed();
    }, /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    t2.prototype.cancel = function(t3) {
      null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new D2(N2.CANCELLED, "Operation cancelled" + (t3 ? ": " + t3 : ""))));
    }, t2.prototype.handleDelayElapsed = function() {
      var t3 = this;
      this.asyncQueue.enqueueAndForget(function() {
        return null !== t3.timerHandle ? (t3.clearTimeout(), t3.op().then(function(e) {
          return t3.deferred.resolve(e);
        })) : Promise.resolve();
      });
    }, t2.prototype.clearTimeout = function() {
      null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
    }, t2;
  }()
);
function hs(t2, e) {
  if (x2("AsyncQueue", e + ": " + t2), Nr(t2)) return new D2(N2.UNAVAILABLE, e + ": " + t2);
  throw t2;
}
var fs = (
  /** @class */
  function() {
    function t2(t3) {
      this.comparator = t3 ? function(e, n) {
        return t3(e, n) || ct.comparator(e.key, n.key);
      } : function(t4, e) {
        return ct.comparator(t4.key, e.key);
      }, this.keyedMap = en(), this.sortedSet = new We(this.comparator);
    }
    return t2.emptySet = function(e) {
      return new t2(e.comparator);
    }, t2.prototype.has = function(t3) {
      return null != this.keyedMap.get(t3);
    }, t2.prototype.get = function(t3) {
      return this.keyedMap.get(t3);
    }, t2.prototype.first = function() {
      return this.sortedSet.minKey();
    }, t2.prototype.last = function() {
      return this.sortedSet.maxKey();
    }, t2.prototype.isEmpty = function() {
      return this.sortedSet.isEmpty();
    }, /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */
    t2.prototype.indexOf = function(t3) {
      var e = this.keyedMap.get(t3);
      return e ? this.sortedSet.indexOf(e) : -1;
    }, Object.defineProperty(t2.prototype, "size", {
      get: function() {
        return this.sortedSet.size;
      },
      enumerable: false,
      configurable: true
    }), /** Iterates documents in order defined by "comparator" */
    t2.prototype.forEach = function(t3) {
      this.sortedSet.inorderTraversal(function(e, n) {
        return t3(e), false;
      });
    }, /** Inserts or updates a document with the same key */
    t2.prototype.add = function(t3) {
      var e = this.delete(t3.key);
      return e.copy(e.keyedMap.insert(t3.key, t3), e.sortedSet.insert(t3, null));
    }, /** Deletes a document with a given key */
    t2.prototype.delete = function(t3) {
      var e = this.get(t3);
      return e ? this.copy(this.keyedMap.remove(t3), this.sortedSet.remove(e)) : this;
    }, t2.prototype.isEqual = function(e) {
      if (!(e instanceof t2)) return false;
      if (this.size !== e.size) return false;
      for (var n = this.sortedSet.getIterator(), r = e.sortedSet.getIterator(); n.hasNext(); ) {
        var i = n.getNext().key, o = r.getNext().key;
        if (!i.isEqual(o)) return false;
      }
      return true;
    }, t2.prototype.toString = function() {
      var t3 = [];
      return this.forEach(function(e) {
        t3.push(e.toString());
      }), 0 === t3.length ? "DocumentSet ()" : "DocumentSet (\n  " + t3.join("  \n") + "\n)";
    }, t2.prototype.copy = function(e, n) {
      var r = new t2();
      return r.comparator = this.comparator, r.keyedMap = e, r.sortedSet = n, r;
    }, t2;
  }()
);
var ls = (
  /** @class */
  function() {
    function t2() {
      this.Qr = new We(ct.comparator);
    }
    return t2.prototype.track = function(t3) {
      var e = t3.doc.key, n = this.Qr.get(e);
      n ? (
        // Merge the new change with the existing change.
        0 !== t3.type && 3 === n.type ? this.Qr = this.Qr.insert(e, t3) : 3 === t3.type && 1 !== n.type ? this.Qr = this.Qr.insert(e, {
          type: n.type,
          doc: t3.doc
        }) : 2 === t3.type && 2 === n.type ? this.Qr = this.Qr.insert(e, {
          type: 2,
          doc: t3.doc
        }) : 2 === t3.type && 0 === n.type ? this.Qr = this.Qr.insert(e, {
          type: 0,
          doc: t3.doc
        }) : 1 === t3.type && 0 === n.type ? this.Qr = this.Qr.remove(e) : 1 === t3.type && 2 === n.type ? this.Qr = this.Qr.insert(e, {
          type: 1,
          doc: n.doc
        }) : 0 === t3.type && 1 === n.type ? this.Qr = this.Qr.insert(e, {
          type: 2,
          doc: t3.doc
        }) : (
          // This includes these cases, which don't make sense:
          // Added->Added
          // Removed->Removed
          // Modified->Added
          // Removed->Modified
          // Metadata->Added
          // Removed->Metadata
          O2()
        )
      ) : this.Qr = this.Qr.insert(e, t3);
    }, t2.prototype.jr = function() {
      var t3 = [];
      return this.Qr.inorderTraversal(function(e, n) {
        t3.push(n);
      }), t3;
    }, t2;
  }()
);
var ds = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i, o, s, u) {
      this.query = t3, this.docs = e, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, this.fromCache = o, this.syncStateChanged = s, this.excludesMetadataChanges = u;
    }
    return t2.fromInitialDocuments = function(e, n, r, i) {
      var o = [];
      return n.forEach(function(t3) {
        o.push({
          type: 0,
          doc: t3
        });
      }), new t2(
        e,
        n,
        fs.emptySet(n),
        o,
        r,
        i,
        /* syncStateChanged= */
        true,
        /* excludesMetadataChanges= */
        false
      );
    }, Object.defineProperty(t2.prototype, "hasPendingWrites", {
      get: function() {
        return !this.mutatedKeys.isEmpty();
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.isEqual = function(t3) {
      if (!(this.fromCache === t3.fromCache && this.syncStateChanged === t3.syncStateChanged && this.mutatedKeys.isEqual(t3.mutatedKeys) && ie(this.query, t3.query) && this.docs.isEqual(t3.docs) && this.oldDocs.isEqual(t3.oldDocs))) return false;
      var e = this.docChanges, n = t3.docChanges;
      if (e.length !== n.length) return false;
      for (var r = 0; r < e.length; r++) if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return false;
      return true;
    }, t2;
  }()
);
var ps = function() {
  this.Wr = void 0, this.listeners = [];
};
var ys = function() {
  this.queries = new Ii(function(t2) {
    return oe(t2);
  }, ie), this.onlineState = "Unknown", this.Gr = /* @__PURE__ */ new Set();
};
function vs(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i, o, s, u, a, c;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          if (n = F2(t2), i = e.query, o = false, (s = n.queries.get(i)) || (o = true, s = new ps()), !o) return [3, 4];
          r.label = 1;
        case 1:
          return r.trys.push([1, 3, , 4]), u = s, [4, n.onListen(i)];
        case 2:
          return u.Wr = r.sent(), [3, 4];
        case 3:
          return a = r.sent(), c = hs(a, "Initialization of query '" + se(e.query) + "' failed"), [2, void e.onError(c)];
        case 4:
          return n.queries.set(i, s), s.listeners.push(e), // Run global snapshot listeners if a consistent snapshot has been emitted.
          e.zr(n.onlineState), s.Wr && e.Hr(s.Wr) && bs(n), [
            2
            /*return*/
          ];
      }
    });
  });
}
function ms(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i, o, s, u;
    return __generator(this, function(r) {
      return n = F2(t2), i = e.query, o = false, (s = n.queries.get(i)) && (u = s.listeners.indexOf(e)) >= 0 && (s.listeners.splice(u, 1), o = 0 === s.listeners.length), o ? [2, (n.queries.delete(i), n.onUnlisten(i))] : [
        2
        /*return*/
      ];
    });
  });
}
function gs(t2, e) {
  for (var n = F2(t2), r = false, i = 0, o = e; i < o.length; i++) {
    var s = o[i], u = s.query, a = n.queries.get(u);
    if (a) {
      for (var c = 0, h = a.listeners; c < h.length; c++) {
        h[c].Hr(s) && (r = true);
      }
      a.Wr = s;
    }
  }
  r && bs(n);
}
function ws(t2, e, n) {
  var r = F2(t2), i = r.queries.get(e);
  if (i) for (var o = 0, s = i.listeners; o < s.length; o++) {
    s[o].onError(n);
  }
  r.queries.delete(e);
}
function bs(t2) {
  t2.Gr.forEach(function(t3) {
    t3.next();
  });
}
var Is = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.query = t3, this.Jr = e, /**
           * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
           * observer. This flag is set to true once we've actually raised an event.
           */
      this.Yr = false, this.Xr = null, this.onlineState = "Unknown", this.options = n || {};
    }
    return t2.prototype.Hr = function(t3) {
      if (!this.options.includeMetadataChanges) {
        for (var e = [], n = 0, r = t3.docChanges; n < r.length; n++) {
          var i = r[n];
          3 !== i.type && e.push(i);
        }
        t3 = new ds(
          t3.query,
          t3.docs,
          t3.oldDocs,
          e,
          t3.mutatedKeys,
          t3.fromCache,
          t3.syncStateChanged,
          /* excludesMetadataChanges= */
          true
        );
      }
      var o = false;
      return this.Yr ? this.Zr(t3) && (this.Jr.next(t3), o = true) : this.eo(t3, this.onlineState) && (this.no(t3), o = true), this.Xr = t3, o;
    }, t2.prototype.onError = function(t3) {
      this.Jr.error(t3);
    }, /** Returns whether a snapshot was raised. */
    t2.prototype.zr = function(t3) {
      this.onlineState = t3;
      var e = false;
      return this.Xr && !this.Yr && this.eo(this.Xr, t3) && (this.no(this.Xr), e = true), e;
    }, t2.prototype.eo = function(t3, e) {
      if (!t3.fromCache) return true;
      var n = "Offline" !== e;
      return !(this.options.so && n || t3.docs.isEmpty() && "Offline" !== e);
    }, t2.prototype.Zr = function(t3) {
      if (t3.docChanges.length > 0) return true;
      var e = this.Xr && this.Xr.hasPendingWrites !== t3.hasPendingWrites;
      return !(!t3.syncStateChanged && !e) && true === this.options.includeMetadataChanges;
    }, t2.prototype.no = function(t3) {
      t3 = ds.fromInitialDocuments(t3.query, t3.docs, t3.mutatedKeys, t3.fromCache), this.Yr = true, this.Jr.next(t3);
    }, t2;
  }()
);
var Ts = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.payload = t3, this.byteLength = e;
    }
    return t2.prototype.io = function() {
      return "metadata" in this.payload;
    }, t2;
  }()
);
var _s = (
  /** @class */
  function() {
    function t2(t3) {
      this.R = t3;
    }
    return t2.prototype.qn = function(t3) {
      return An(this.R, t3);
    }, /**
     * Converts a BundleDocument to a MutableDocument.
     */
    t2.prototype.Un = function(t3) {
      return t3.metadata.exists ? On(this.R, t3.document, false) : Nt.newNoDocument(this.qn(t3.metadata.name), this.Kn(t3.metadata.readTime));
    }, t2.prototype.Kn = function(t3) {
      return En(t3);
    }, t2;
  }()
);
var Es = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.ro = t3, this.localStore = e, this.R = n, /** Batched queries to be saved into storage */
      this.queries = [], /** Batched documents to be saved into storage */
      this.documents = [], this.progress = Ss(t3);
    }
    return t2.prototype.oo = function(t3) {
      this.progress.bytesLoaded += t3.byteLength;
      var e = this.progress.documentsLoaded;
      return t3.payload.namedQuery ? this.queries.push(t3.payload.namedQuery) : t3.payload.documentMetadata ? (this.documents.push({
        metadata: t3.payload.documentMetadata
      }), t3.payload.documentMetadata.exists || ++e) : t3.payload.document && (this.documents[this.documents.length - 1].document = t3.payload.document, ++e), e !== this.progress.documentsLoaded ? (this.progress.documentsLoaded = e, Object.assign({}, this.progress)) : null;
    }, t2.prototype.co = function(t3) {
      for (var e = /* @__PURE__ */ new Map(), n = new _s(this.R), r = 0, i = t3; r < i.length; r++) {
        var o = i[r];
        if (o.metadata.queries) for (var s = n.qn(o.metadata.name), u = 0, a = o.metadata.queries; u < a.length; u++) {
          var c = a[u], h = (e.get(c) || sn()).add(s);
          e.set(c, h);
        }
      }
      return e;
    }, /**
     * Update the progress to 'Success' and return the updated progress.
     */
    t2.prototype.complete = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3, e, n, i, o;
        return __generator(this, function(r) {
          switch (r.label) {
            case 0:
              return [4, Zi(this.localStore, new _s(this.R), this.documents, this.ro.id)];
            case 1:
              t3 = r.sent(), e = this.co(this.documents), n = 0, i = this.queries, r.label = 2;
            case 2:
              return n < i.length ? (o = i[n], [4, to(this.localStore, o, e.get(o.name))]) : [3, 5];
            case 3:
              r.sent(), r.label = 4;
            case 4:
              return n++, [3, 2];
            case 5:
              return [2, (this.progress.taskState = "Success", new Pi(Object.assign({}, this.progress), t3))];
          }
        });
      });
    }, t2;
  }()
);
function Ss(t2) {
  return {
    taskState: "Running",
    documentsLoaded: 0,
    bytesLoaded: 0,
    totalDocuments: t2.totalDocuments,
    totalBytes: t2.totalBytes
  };
}
var Ns = function(t2) {
  this.key = t2;
};
var Ds = function(t2) {
  this.key = t2;
};
var As = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.query = t3, this.uo = e, this.ao = null, /**
           * A flag whether the view is current with the backend. A view is considered
           * current after it has seen the current flag from the backend and did not
           * lose consistency within the watch stream (e.g. because of an existence
           * filter mismatch).
           */
      this.current = false, /** Documents in the view but not in the remote target */
      this.ho = sn(), /** Document Keys that have local changes */
      this.mutatedKeys = sn(), this.lo = ae(t3), this.fo = new fs(this.lo);
    }
    return Object.defineProperty(t2.prototype, "wo", {
      /**
       * The set of remote documents that the server has told us belongs to the target associated with
       * this view.
       */
      get: function() {
        return this.uo;
      },
      enumerable: false,
      configurable: true
    }), /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges - The doc changes to apply to this view.
     * @param previousChanges - If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @returns a new set of docs, changes, and refill flag.
     */
    t2.prototype._o = function(t3, e) {
      var n = this, r = e ? e.mo : new ls(), i = e ? e.fo : this.fo, o = e ? e.mutatedKeys : this.mutatedKeys, s = i, u = false, a = $t(this.query) && i.size === this.query.limit ? i.last() : null, c = Xt(this.query) && i.size === this.query.limit ? i.first() : null;
      if (t3.inorderTraversal(function(t4, e2) {
        var h2 = i.get(t4), f = ue(n.query, e2) ? e2 : null, l2 = !!h2 && n.mutatedKeys.has(h2.key), d = !!f && (f.hasLocalMutations || // We only consider committed mutations for documents that were
        // mutated during the lifetime of the view.
        n.mutatedKeys.has(f.key) && f.hasCommittedMutations), p2 = false;
        h2 && f ? h2.data.isEqual(f.data) ? l2 !== d && (r.track({
          type: 3,
          doc: f
        }), p2 = true) : n.yo(h2, f) || (r.track({
          type: 2,
          doc: f
        }), p2 = true, (a && n.lo(f, a) > 0 || c && n.lo(f, c) < 0) && // This doc moved from inside the limit to outside the limit.
        // That means there may be some other doc in the local cache
        // that should be included instead.
        (u = true)) : !h2 && f ? (r.track({
          type: 0,
          doc: f
        }), p2 = true) : h2 && !f && (r.track({
          type: 1,
          doc: h2
        }), p2 = true, (a || c) && // A doc was removed from a full limit query. We'll need to
        // requery from the local cache to see if we know about some other
        // doc that should be in the results.
        (u = true)), p2 && (f ? (s = s.add(f), o = d ? o.add(t4) : o.delete(t4)) : (s = s.delete(t4), o = o.delete(t4)));
      }), $t(this.query) || Xt(this.query)) for (; s.size > this.query.limit; ) {
        var h = $t(this.query) ? s.last() : s.first();
        s = s.delete(h.key), o = o.delete(h.key), r.track({
          type: 1,
          doc: h
        });
      }
      return {
        fo: s,
        mo: r,
        Nn: u,
        mutatedKeys: o
      };
    }, t2.prototype.yo = function(t3, e) {
      return t3.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
    }, /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges - The set of changes to make to the view's docs.
     * @param updateLimboDocuments - Whether to update limbo documents based on
     *        this change.
     * @param targetChange - A target change to apply for computing limbo docs and
     *        sync state.
     * @returns A new ViewChange with the given docs, changes, and sync state.
     */
    // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
    t2.prototype.applyChanges = function(t3, e, n) {
      var r = this, i = this.fo;
      this.fo = t3.fo, this.mutatedKeys = t3.mutatedKeys;
      var o = t3.mo.jr();
      o.sort(function(t4, e2) {
        return function(t5, e3) {
          var n2 = function(t6) {
            switch (t6) {
              case 0:
                return 1;
              case 2:
              case 3:
                return 2;
              case 1:
                return 0;
              default:
                return O2();
            }
          };
          return n2(t5) - n2(e3);
        }(t4.type, e2.type) || r.lo(t4.doc, e2.doc);
      }), this.po(n);
      var s = e ? this.Eo() : [], u = 0 === this.ho.size && this.current ? 1 : 0, a = u !== this.ao;
      return this.ao = u, 0 !== o.length || a ? {
        snapshot: new ds(
          this.query,
          t3.fo,
          i,
          o,
          t3.mutatedKeys,
          0 === u,
          a,
          /* excludesMetadataChanges= */
          false
        ),
        To: s
      } : {
        To: s
      };
    }, /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */
    t2.prototype.zr = function(t3) {
      return this.current && "Offline" === t3 ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        (this.current = false, this.applyChanges(
          {
            fo: this.fo,
            mo: new ls(),
            mutatedKeys: this.mutatedKeys,
            Nn: false
          },
          /* updateLimboDocuments= */
          false
        ))
      ) : {
        To: []
      };
    }, /**
     * Returns whether the doc for the given key should be in limbo.
     */
    t2.prototype.Io = function(t3) {
      return !this.uo.has(t3) && // The local store doesn't think it's a result, so it shouldn't be in limbo.
      !!this.fo.has(t3) && !this.fo.get(t3).hasLocalMutations;
    }, /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */
    t2.prototype.po = function(t3) {
      var e = this;
      t3 && (t3.addedDocuments.forEach(function(t4) {
        return e.uo = e.uo.add(t4);
      }), t3.modifiedDocuments.forEach(function(t4) {
      }), t3.removedDocuments.forEach(function(t4) {
        return e.uo = e.uo.delete(t4);
      }), this.current = t3.current);
    }, t2.prototype.Eo = function() {
      var t3 = this;
      if (!this.current) return [];
      var e = this.ho;
      this.ho = sn(), this.fo.forEach(function(e2) {
        t3.Io(e2.key) && (t3.ho = t3.ho.add(e2.key));
      });
      var n = [];
      return e.forEach(function(e2) {
        t3.ho.has(e2) || n.push(new Ds(e2));
      }), this.ho.forEach(function(t4) {
        e.has(t4) || n.push(new Ns(t4));
      }), n;
    }, /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @returns The ViewChange that resulted from this synchronization.
     */
    // PORTING NOTE: Multi-tab only.
    t2.prototype.Ao = function(t3) {
      this.uo = t3.Bn, this.ho = sn();
      var e = this._o(t3.documents);
      return this.applyChanges(
        e,
        /*updateLimboDocuments=*/
        true
      );
    }, /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    t2.prototype.Ro = function() {
      return ds.fromInitialDocuments(this.query, this.fo, this.mutatedKeys, 0 === this.ao);
    }, t2;
  }()
);
var ks = function(t2, e, n) {
  this.query = t2, this.targetId = e, this.view = n;
};
var Cs = function(t2) {
  this.key = t2, /**
           * Set to true once we've received a document. This is used in
           * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
           * decide whether it needs to manufacture a delete event for the target once
           * the target is CURRENT.
           */
  this.bo = false;
};
var xs = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i, o) {
      this.localStore = t3, this.remoteStore = e, this.eventManager = n, this.sharedClientState = r, this.currentUser = i, this.maxConcurrentLimboResolutions = o, this.vo = {}, this.Po = new Ii(function(t4) {
        return oe(t4);
      }, ie), this.Vo = /* @__PURE__ */ new Map(), /**
           * The keys of documents that are in limbo for which we haven't yet started a
           * limbo resolution query. The strings in this set are the result of calling
           * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
           *
           * The `Set` type was chosen because it provides efficient lookup and removal
           * of arbitrary elements and it also maintains insertion order, providing the
           * desired queue-like FIFO semantics.
           */
      this.So = /* @__PURE__ */ new Set(), /**
           * Keeps track of the target ID for each document that is in limbo with an
           * active target.
           */
      this.Do = new We(ct.comparator), /**
           * Keeps track of the information about an active limbo resolution for each
           * active target ID that was started for the purpose of limbo resolution.
           */
      this.Co = /* @__PURE__ */ new Map(), this.No = new no(), /** Stores user completion handlers, indexed by User and BatchId. */
      this.xo = {}, /** Stores user callbacks waiting for all pending writes to be acknowledged. */
      this.ko = /* @__PURE__ */ new Map(), this.Fo = ci.Yt(), this.onlineState = "Unknown", // The primary state is set to `true` or `false` immediately after Firestore
      // startup. In the interim, a client should only be considered primary if
      // `isPrimary` is true.
      this.$o = void 0;
    }
    return Object.defineProperty(t2.prototype, "isPrimaryClient", {
      get: function() {
        return true === this.$o;
      },
      enumerable: false,
      configurable: true
    }), t2;
  }()
);
function Rs(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i, o, s, u, a;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return n = uu(t2), (s = n.Po.get(e)) ? (
            // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
            // already exists when EventManager calls us for the first time. This
            // happens when the primary tab is already listening to this query on
            // behalf of another tab and the user of the primary also starts listening
            // to the query. EventManager will not have an assigned target ID in this
            // case and calls `listen` to obtain this ID.
            (i = s.targetId, n.sharedClientState.addLocalQueryTarget(i), o = s.view.Ro(), [3, 4])
          ) : [3, 1];
        case 1:
          return [4, Wi(n.localStore, ne(e))];
        case 2:
          return u = r.sent(), a = n.sharedClientState.addLocalQueryTarget(u.targetId), i = u.targetId, [4, Ls(n, e, i, "current" === a)];
        case 3:
          o = r.sent(), n.isPrimaryClient && Uo(n.remoteStore, u), r.label = 4;
        case 4:
          return [2, o];
      }
    });
  });
}
function Ls(t2, e, i, o) {
  return __awaiter(this, void 0, void 0, function() {
    var s, u, a, c, h, f;
    return __generator(this, function(l2) {
      switch (l2.label) {
        case 0:
          return t2.Oo = function(e2, i2, o2) {
            return function(t3, e3, i3, o3) {
              return __awaiter(this, void 0, void 0, function() {
                var n, s2, u2;
                return __generator(this, function(r) {
                  switch (r.label) {
                    case 0:
                      return n = e3.view._o(i3), n.Nn ? [4, Yi(
                        t3.localStore,
                        e3.query,
                        /* usePreviousResults= */
                        false
                      ).then(function(t4) {
                        var r2 = t4.documents;
                        return e3.view._o(r2, n);
                      })] : [3, 2];
                    case 1:
                      n = r.sent(), r.label = 2;
                    case 2:
                      return s2 = o3 && o3.targetChanges.get(e3.targetId), u2 = e3.view.applyChanges(
                        n,
                        /* updateLimboDocuments= */
                        t3.isPrimaryClient,
                        s2
                      ), [2, (zs(t3, e3.targetId, u2.To), u2.snapshot)];
                  }
                });
              });
            }(t2, e2, i2, o2);
          }, [4, Yi(
            t2.localStore,
            e,
            /* usePreviousResults= */
            true
          )];
        case 1:
          return s = l2.sent(), u = new As(e, s.Bn), a = u._o(s.documents), c = hn.createSynthesizedTargetChangeForCurrentChange(i, o && "Offline" !== t2.onlineState), h = u.applyChanges(
            a,
            /* updateLimboDocuments= */
            t2.isPrimaryClient,
            c
          ), zs(t2, i, h.To), f = new ks(e, i, u), [2, (t2.Po.set(e, f), t2.Vo.has(i) ? t2.Vo.get(i).push(e) : t2.Vo.set(i, [e]), h.snapshot)];
      }
    });
  });
}
function Os(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i, o;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return n = F2(t2), i = n.Po.get(e), (o = n.Vo.get(i.targetId)).length > 1 ? [2, (n.Vo.set(i.targetId, o.filter(function(t3) {
            return !ie(t3, e);
          })), void n.Po.delete(e))] : n.isPrimaryClient ? (
            // We need to remove the local query target first to allow us to verify
            // whether any other client is still interested in this target.
            (n.sharedClientState.removeLocalQueryTarget(i.targetId), n.sharedClientState.isActiveQueryTarget(i.targetId) ? [3, 2] : [4, Hi(
              n.localStore,
              i.targetId,
              /*keepPersistedTargetData=*/
              false
            ).then(function() {
              n.sharedClientState.clearQueryState(i.targetId), Bo(n.remoteStore, i.targetId), Gs(n, i.targetId);
            }).catch(pi)])
          ) : [3, 3];
        case 1:
          r.sent(), r.label = 2;
        case 2:
          return [3, 5];
        case 3:
          return Gs(n, i.targetId), [4, Hi(
            n.localStore,
            i.targetId,
            /*keepPersistedTargetData=*/
            true
          )];
        case 4:
          r.sent(), r.label = 5;
        case 5:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Ps(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var n, o, s, u;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          n = au(t2), r.label = 1;
        case 1:
          return r.trys.push([1, 5, , 6]), [4, function(t3, e2) {
            var n2, r2 = F2(t3), i2 = j.now(), o2 = e2.reduce(function(t4, e3) {
              return t4.add(e3.key);
            }, sn());
            return r2.persistence.runTransaction("Locally write mutations", "readwrite", function(t4) {
              return r2.Mn.pn(t4, o2).next(function(o3) {
                n2 = o3;
                for (var s2 = [], u2 = 0, a = e2; u2 < a.length; u2++) {
                  var c = a[u2], h = Re(c, n2.get(c.key));
                  null != h && // NOTE: The base state should only be applied if there's some
                  // existing document to override, so use a Precondition of
                  // exists=true
                  s2.push(new Fe(c.key, h, St(h.value.mapValue), De.exists(true)));
                }
                return r2._n.addMutationBatch(t4, i2, s2, e2);
              });
            }).then(function(t4) {
              return t4.applyToLocalDocumentSet(n2), {
                batchId: t4.batchId,
                changes: n2
              };
            });
          }(n.localStore, e)];
        case 2:
          return o = r.sent(), n.sharedClientState.addPendingMutation(o.batchId), function(t3, e2, n2) {
            var r2 = t3.xo[t3.currentUser.toKey()];
            r2 || (r2 = new We(q2)), r2 = r2.insert(e2, n2), t3.xo[t3.currentUser.toKey()] = r2;
          }(n, o.batchId, i), [4, Ys(n, o.changes)];
        case 3:
          return r.sent(), [4, Zo(n.remoteStore)];
        case 4:
          return r.sent(), [3, 6];
        case 5:
          return s = r.sent(), u = hs(s, "Failed to persist write"), i.reject(u), [3, 6];
        case 6:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Fs(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          n = F2(t2), r.label = 1;
        case 1:
          return r.trys.push([1, 4, , 6]), [4, Gi(n.localStore, e)];
        case 2:
          return i = r.sent(), // Update `receivedDocument` as appropriate for any limbo targets.
          e.targetChanges.forEach(function(t3, e2) {
            var r2 = n.Co.get(e2);
            r2 && // Since this is a limbo resolution lookup, it's for a single document
            // and it could be added, modified, or removed, but not a combination.
            (P2(t3.addedDocuments.size + t3.modifiedDocuments.size + t3.removedDocuments.size <= 1), t3.addedDocuments.size > 0 ? r2.bo = true : t3.modifiedDocuments.size > 0 ? P2(r2.bo) : t3.removedDocuments.size > 0 && (P2(r2.bo), r2.bo = false));
          }), [4, Ys(n, i, e)];
        case 3:
          return r.sent(), [3, 6];
        case 4:
          return [4, pi(r.sent())];
        case 5:
          return r.sent(), [3, 6];
        case 6:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Ms(t2, e, n) {
  var r = F2(t2);
  if (r.isPrimaryClient && 0 === n || !r.isPrimaryClient && 1 === n) {
    var i = [];
    r.Po.forEach(function(t3, n2) {
      var r2 = n2.view.zr(e);
      r2.snapshot && i.push(r2.snapshot);
    }), function(t3, e2) {
      var n2 = F2(t3);
      n2.onlineState = e2;
      var r2 = false;
      n2.queries.forEach(function(t4, n3) {
        for (var i2 = 0, o = n3.listeners; i2 < o.length; i2++) {
          o[i2].zr(e2) && (r2 = true);
        }
      }), r2 && bs(n2);
    }(r.eventManager, e), i.length && r.vo._r(i), r.onlineState = e, r.isPrimaryClient && r.sharedClientState.setOnlineState(e);
  }
}
function Vs(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var n, o, s, u, a, c;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return (n = F2(t2)).sharedClientState.updateQueryState(e, "rejected", i), o = n.Co.get(e), (s = o && o.key) ? (u = (u = new We(ct.comparator)).insert(s, Nt.newNoDocument(s, K2.min())), a = sn().add(s), c = new cn(
            K2.min(),
            /* targetChanges= */
            /* @__PURE__ */ new Map(),
            /* targetMismatches= */
            new $e(q2),
            u,
            a
          ), [4, Fs(n, c)]) : [3, 2];
        case 1:
          return r.sent(), // Since this query failed, we won't want to manually unlisten to it.
          // We only remove it from bookkeeping after we successfully applied the
          // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
          // this query when the RemoteStore restarts the Watch stream, which should
          // re-trigger the target failure.
          n.Do = n.Do.remove(s), n.Co.delete(e), Hs(n), [3, 4];
        case 2:
          return [4, Hi(
            n.localStore,
            e,
            /* keepPersistedTargetData */
            false
          ).then(function() {
            return Gs(n, e, i);
          }).catch(pi)];
        case 3:
          r.sent(), r.label = 4;
        case 4:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function qs(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i, o;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          n = F2(t2), i = e.batch.batchId, r.label = 1;
        case 1:
          return r.trys.push([1, 4, , 6]), [4, ji(n.localStore, e)];
        case 2:
          return o = r.sent(), // The local store may or may not be able to apply the write result and
          // raise events immediately (depending on whether the watcher is caught
          // up), so we raise user callbacks first so that they consistently happen
          // before listen events.
          Ks(
            n,
            i,
            /*error=*/
            null
          ), js(n, i), n.sharedClientState.updateMutationState(i, "acknowledged"), [4, Ys(n, o)];
        case 3:
          return r.sent(), [3, 6];
        case 4:
          return [4, pi(r.sent())];
        case 5:
          return r.sent(), [3, 6];
        case 6:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Us(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var n, o;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          n = F2(t2), r.label = 1;
        case 1:
          return r.trys.push([1, 4, , 6]), [4, function(t3, e2) {
            var n2 = F2(t3);
            return n2.persistence.runTransaction("Reject batch", "readwrite-primary", function(t4) {
              var r2;
              return n2._n.lookupMutationBatch(t4, e2).next(function(e3) {
                return P2(null !== e3), r2 = e3.keys(), n2._n.removeMutationBatch(t4, e3);
              }).next(function() {
                return n2._n.performConsistencyCheck(t4);
              }).next(function() {
                return n2.Mn.pn(t4, r2);
              });
            });
          }(n.localStore, e)];
        case 2:
          return o = r.sent(), // The local store may or may not be able to apply the write result and
          // raise events immediately (depending on whether the watcher is caught up),
          // so we raise user callbacks first so that they consistently happen before
          // listen events.
          Ks(n, e, i), js(n, e), n.sharedClientState.updateMutationState(e, "rejected", i), [4, Ys(n, o)];
        case 3:
          return r.sent(), [3, 6];
        case 4:
          return [4, pi(r.sent())];
        case 5:
          return r.sent(), [3, 6];
        case 6:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Bs(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i, o, s, u;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          zo((n = F2(t2)).remoteStore) || C2("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."), r.label = 1;
        case 1:
          return r.trys.push([1, 3, , 4]), [4, function(t3) {
            var e2 = F2(t3);
            return e2.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", function(t4) {
              return e2._n.getHighestUnacknowledgedBatchId(t4);
            });
          }(n.localStore)];
        case 2:
          return -1 === (i = r.sent()) ? [2, void e.resolve()] : ((o = n.ko.get(i) || []).push(e), n.ko.set(i, o), [3, 4]);
        case 3:
          return s = r.sent(), u = hs(s, "Initialization of waitForPendingWrites() operation failed"), e.reject(u), [3, 4];
        case 4:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function js(t2, e) {
  (t2.ko.get(e) || []).forEach(function(t3) {
    t3.resolve();
  }), t2.ko.delete(e);
}
function Ks(t2, e, n) {
  var r = F2(t2), i = r.xo[r.currentUser.toKey()];
  if (i) {
    var o = i.get(e);
    o && (n ? o.reject(n) : o.resolve(), i = i.remove(e)), r.xo[r.currentUser.toKey()] = i;
  }
}
function Gs(t2, e, n) {
  void 0 === n && (n = null), t2.sharedClientState.removeLocalQueryTarget(e);
  for (var r = 0, i = t2.Vo.get(e); r < i.length; r++) {
    var o = i[r];
    t2.Po.delete(o), n && t2.vo.Mo(o, n);
  }
  t2.Vo.delete(e), t2.isPrimaryClient && t2.No.Zn(e).forEach(function(e2) {
    t2.No.containsKey(e2) || // We removed the last reference for this key
    Qs(t2, e2);
  });
}
function Qs(t2, e) {
  t2.So.delete(e.path.canonicalString());
  var n = t2.Do.get(e);
  null !== n && (Bo(t2.remoteStore, n), t2.Do = t2.Do.remove(e), t2.Co.delete(n), Hs(t2));
}
function zs(t2, e, n) {
  for (var r = 0, i = n; r < i.length; r++) {
    var o = i[r];
    o instanceof Ns ? (t2.No.addReference(o.key, e), Ws(t2, o)) : o instanceof Ds ? (C2("SyncEngine", "Document no longer in limbo: " + o.key), t2.No.removeReference(o.key, e), t2.No.containsKey(o.key) || // We removed the last reference for this key
    Qs(t2, o.key)) : O2();
  }
}
function Ws(t2, e) {
  var n = e.key, r = n.path.canonicalString();
  t2.Do.get(n) || t2.So.has(r) || (C2("SyncEngine", "New document in limbo: " + n), t2.So.add(r), Hs(t2));
}
function Hs(t2) {
  for (; t2.So.size > 0 && t2.Do.size < t2.maxConcurrentLimboResolutions; ) {
    var e = t2.So.values().next().value;
    t2.So.delete(e);
    var n = new ct(H2.fromString(e)), r = t2.Fo.next();
    t2.Co.set(r, new Cs(n)), t2.Do = t2.Do.insert(n, r), Uo(t2.remoteStore, new Pr(ne(Yt(n.path)), r, 2, S2.o));
  }
}
function Ys(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var o, s, u, a;
    return __generator(this, function(c) {
      switch (c.label) {
        case 0:
          return o = F2(t2), s = [], u = [], a = [], o.Po.isEmpty() ? [3, 3] : (o.Po.forEach(function(t3, n) {
            a.push(o.Oo(n, e, i).then(function(t4) {
              if (t4) {
                o.isPrimaryClient && o.sharedClientState.updateQueryState(n.targetId, t4.fromCache ? "not-current" : "current"), s.push(t4);
                var e2 = Mi.Pn(n.targetId, t4);
                u.push(e2);
              }
            }));
          }), [4, Promise.all(a)]);
        case 1:
          return c.sent(), o.vo._r(s), [4, function(t3, e2) {
            return __awaiter(this, void 0, void 0, function() {
              var n, i2, o2, s2, u2, a2, c2, h, f;
              return __generator(this, function(r) {
                switch (r.label) {
                  case 0:
                    n = F2(t3), r.label = 1;
                  case 1:
                    return r.trys.push([1, 3, , 4]), [4, n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", function(t4) {
                      return Ir.forEach(e2, function(e3) {
                        return Ir.forEach(e3.bn, function(r2) {
                          return n.persistence.referenceDelegate.addReference(t4, e3.targetId, r2);
                        }).next(function() {
                          return Ir.forEach(e3.vn, function(r2) {
                            return n.persistence.referenceDelegate.removeReference(t4, e3.targetId, r2);
                          });
                        });
                      });
                    })];
                  case 2:
                    return r.sent(), [3, 4];
                  case 3:
                    if (!Nr(i2 = r.sent())) throw i2;
                    return C2("LocalStore", "Failed to update sequence numbers: " + i2), [3, 4];
                  case 4:
                    for (o2 = 0, s2 = e2; o2 < s2.length; o2++) u2 = s2[o2], a2 = u2.targetId, u2.fromCache || (c2 = n.kn.get(a2), h = c2.snapshotVersion, f = c2.withLastLimboFreeSnapshotVersion(h), // Advance the last limbo free snapshot version
                    n.kn = n.kn.insert(a2, f));
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          }(o.localStore, u)];
        case 2:
          c.sent(), c.label = 3;
        case 3:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function $s(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return (n = F2(t2)).currentUser.isEqual(e) ? [3, 3] : (C2("SyncEngine", "User change. New user:", e.toKey()), [4, Bi(n.localStore, e)]);
        case 1:
          return i = r.sent(), n.currentUser = e, // Fails tasks waiting for pending writes requested by previous user.
          function(t3, e2) {
            t3.ko.forEach(function(t4) {
              t4.forEach(function(t5) {
                t5.reject(new D2(N2.CANCELLED, "'waitForPendingWrites' promise is rejected due to a user change."));
              });
            }), t3.ko.clear();
          }(n), // TODO(b/114226417): Consider calling this only in the primary tab.
          n.sharedClientState.handleUserChange(e, i.removedBatchIds, i.addedBatchIds), [4, Ys(n, i.Ln)];
        case 2:
          r.sent(), r.label = 3;
        case 3:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Xs(t2, e) {
  var n = F2(t2), r = n.Co.get(e);
  if (r && r.bo) return sn().add(r.key);
  var i = sn(), o = n.Vo.get(e);
  if (!o) return i;
  for (var s = 0, u = o; s < u.length; s++) {
    var a = u[s], c = n.Po.get(a);
    i = i.unionWith(c.view.wo);
  }
  return i;
}
function Js(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i, o;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return [4, Yi(
            (n = F2(t2)).localStore,
            e.query,
            /* usePreviousResults= */
            true
          )];
        case 1:
          return i = r.sent(), o = e.view.Ao(i), [2, (n.isPrimaryClient && zs(n, e.targetId, o.To), o)];
      }
    });
  });
}
function Zs(t2) {
  return __awaiter(this, void 0, void 0, function() {
    var e;
    return __generator(this, function(n) {
      return [2, Xi((e = F2(t2)).localStore).then(function(t3) {
        return Ys(e, t3);
      })];
    });
  });
}
function tu(t2, e, i, o) {
  return __awaiter(this, void 0, void 0, function() {
    var n, s;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return [4, function(t3, e2) {
            var n2 = F2(t3), r2 = F2(n2._n);
            return n2.persistence.runTransaction("Lookup mutation documents", "readonly", function(t4) {
              return r2.jt(t4, e2).next(function(e3) {
                return e3 ? n2.Mn.pn(t4, e3) : Ir.resolve(null);
              });
            });
          }((n = F2(t2)).localStore, e)];
        case 1:
          return null === (s = r.sent()) ? [3, 6] : "pending" !== i ? [3, 3] : [4, Zo(n.remoteStore)];
        case 2:
          return r.sent(), [3, 4];
        case 3:
          "acknowledged" === i || "rejected" === i ? (
            // NOTE: Both these methods are no-ops for batches that originated from
            // other clients.
            (Ks(n, e, o || null), js(n, e), function(t3, e2) {
              F2(F2(t3)._n).Gt(e2);
            }(n.localStore, e))
          ) : O2(), r.label = 4;
        case 4:
          return [4, Ys(n, s)];
        case 5:
          return r.sent(), [3, 7];
        case 6:
          C2("SyncEngine", "Cannot apply mutation batch with id: " + e), r.label = 7;
        case 7:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function eu(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i, o, s, u, a, c, h;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return uu(n = F2(t2)), au(n), true !== e || true === n.$o ? [3, 3] : (i = n.sharedClientState.getAllActiveQueryTargets(), [4, nu(n, i.toArray())]);
        case 1:
          return o = r.sent(), n.$o = true, [4, ss(n.remoteStore, true)];
        case 2:
          for (r.sent(), s = 0, u = o; s < u.length; s++) a = u[s], Uo(n.remoteStore, a);
          return [3, 7];
        case 3:
          return false !== e || false === n.$o ? [3, 7] : (c = [], h = Promise.resolve(), n.Vo.forEach(function(t3, e2) {
            n.sharedClientState.isLocalQueryTarget(e2) ? c.push(e2) : h = h.then(function() {
              return Gs(n, e2), Hi(
                n.localStore,
                e2,
                /*keepPersistedTargetData=*/
                true
              );
            }), Bo(n.remoteStore, e2);
          }), [4, h]);
        case 4:
          return r.sent(), [4, nu(n, c)];
        case 5:
          return r.sent(), // PORTING NOTE: Multi-Tab only.
          function(t3) {
            var e2 = F2(t3);
            e2.Co.forEach(function(t4, n2) {
              Bo(e2.remoteStore, n2);
            }), e2.No.ts(), e2.Co = /* @__PURE__ */ new Map(), e2.Do = new We(ct.comparator);
          }(n), n.$o = false, [4, ss(n.remoteStore, false)];
        case 6:
          r.sent(), r.label = 7;
        case 7:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function nu(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var n, i2, o, s, u, a, c, h, f, l2, d, p2, y2, v2;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          n = F2(t2), i2 = [], o = [], s = 0, u = e, r.label = 1;
        case 1:
          return s < u.length ? (a = u[s], c = void 0, (h = n.Vo.get(a)) && 0 !== h.length ? [4, Wi(n.localStore, ne(h[0]))] : [3, 7]) : [3, 13];
        case 2:
          c = r.sent(), f = 0, l2 = h, r.label = 3;
        case 3:
          return f < l2.length ? (d = l2[f], p2 = n.Po.get(d), [4, Js(n, p2)]) : [3, 6];
        case 4:
          (y2 = r.sent()).snapshot && o.push(y2.snapshot), r.label = 5;
        case 5:
          return f++, [3, 3];
        case 6:
          return [3, 11];
        case 7:
          return [4, $i(n.localStore, a)];
        case 8:
          return v2 = r.sent(), [4, Wi(n.localStore, v2)];
        case 9:
          return c = r.sent(), [4, Ls(
            n,
            ru(v2),
            a,
            /*current=*/
            false
          )];
        case 10:
          r.sent(), r.label = 11;
        case 11:
          i2.push(c), r.label = 12;
        case 12:
          return s++, [3, 1];
        case 13:
          return [2, (n.vo._r(o), i2)];
      }
    });
  });
}
function ru(t2) {
  return Ht(t2.path, t2.collectionGroup, t2.orderBy, t2.filters, t2.limit, "F", t2.startAt, t2.endAt);
}
function iu(t2) {
  var e = F2(t2);
  return F2(F2(e.localStore).persistence).fn();
}
function ou(t2, e, i, o) {
  return __awaiter(this, void 0, void 0, function() {
    var n, s, u;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return (n = F2(t2)).$o ? (
            // If we receive a target state notification via WebStorage, we are
            // either already secondary or another tab has taken the primary lease.
            (C2("SyncEngine", "Ignoring unexpected query state notification."), [3, 8])
          ) : [3, 1];
        case 1:
          if (!n.Vo.has(e)) return [3, 8];
          switch (i) {
            case "current":
            case "not-current":
              return [3, 2];
            case "rejected":
              return [3, 5];
          }
          return [3, 7];
        case 2:
          return [4, Xi(n.localStore)];
        case 3:
          return s = r.sent(), u = cn.createSynthesizedRemoteEventForCurrentChange(e, "current" === i), [4, Ys(n, s, u)];
        case 4:
          return r.sent(), [3, 8];
        case 5:
          return [4, Hi(
            n.localStore,
            e,
            /* keepPersistedTargetData */
            true
          )];
        case 6:
          return r.sent(), Gs(n, e, o), [3, 8];
        case 7:
          O2(), r.label = 8;
        case 8:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function su(t2, e, i) {
  return __awaiter(this, void 0, void 0, function() {
    var n, o, s, u, a, c, h, f, l2, d;
    return __generator(this, function(p2) {
      switch (p2.label) {
        case 0:
          if (!(n = uu(t2)).$o) return [3, 10];
          o = 0, s = e, p2.label = 1;
        case 1:
          return o < s.length ? (u = s[o], n.Vo.has(u) ? (
            // A target might have been added in a previous attempt
            (C2("SyncEngine", "Adding an already active target " + u), [3, 5])
          ) : [4, $i(n.localStore, u)]) : [3, 6];
        case 2:
          return a = p2.sent(), [4, Wi(n.localStore, a)];
        case 3:
          return c = p2.sent(), [4, Ls(
            n,
            ru(a),
            c.targetId,
            /*current=*/
            false
          )];
        case 4:
          p2.sent(), Uo(n.remoteStore, c), p2.label = 5;
        case 5:
          return o++, [3, 1];
        case 6:
          h = function(t3) {
            return __generator(this, function(e2) {
              switch (e2.label) {
                case 0:
                  return n.Vo.has(t3) ? [4, Hi(
                    n.localStore,
                    t3,
                    /* keepPersistedTargetData */
                    false
                  ).then(function() {
                    Bo(n.remoteStore, t3), Gs(n, t3);
                  }).catch(pi)] : [3, 2];
                // Release queries that are still active.
                case 1:
                  e2.sent(), e2.label = 2;
                case 2:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          }, f = 0, l2 = i, p2.label = 7;
        case 7:
          return f < l2.length ? (d = l2[f], [5, h(d)]) : [3, 10];
        case 8:
          p2.sent(), p2.label = 9;
        case 9:
          return f++, [3, 7];
        case 10:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function uu(t2) {
  var e = F2(t2);
  return e.remoteStore.remoteSyncer.applyRemoteEvent = Fs.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = Xs.bind(null, e), e.remoteStore.remoteSyncer.rejectListen = Vs.bind(null, e), e.vo._r = gs.bind(null, e.eventManager), e.vo.Mo = ws.bind(null, e.eventManager), e;
}
function au(t2) {
  var e = F2(t2);
  return e.remoteStore.remoteSyncer.applySuccessfulWrite = qs.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = Us.bind(null, e), e;
}
var hu = (
  /** @class */
  function() {
    function t2() {
      this.synchronizeTabs = false;
    }
    return t2.prototype.initialize = function(t3) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(e) {
          switch (e.label) {
            case 0:
              return this.R = Co(t3.databaseInfo.databaseId), this.sharedClientState = this.Bo(t3), this.persistence = this.qo(t3), [4, this.persistence.start()];
            case 1:
              return e.sent(), this.gcScheduler = this.Uo(t3), this.localStore = this.Ko(t3), [
                2
                /*return*/
              ];
          }
        });
      });
    }, t2.prototype.Uo = function(t3) {
      return null;
    }, t2.prototype.Ko = function(t3) {
      return Ui(this.persistence, new Vi(), t3.initialUser, this.R);
    }, t2.prototype.qo = function(t3) {
      return new ao(ho.bs, this.R);
    }, t2.prototype.Bo = function(t3) {
      return new To();
    }, t2.prototype.terminate = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(t3) {
          switch (t3.label) {
            case 0:
              return this.gcScheduler && this.gcScheduler.stop(), [4, this.sharedClientState.shutdown()];
            case 1:
              return t3.sent(), [4, this.persistence.shutdown()];
            case 2:
              return t3.sent(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, t2;
  }()
);
var fu = (
  /** @class */
  function(e) {
    function i(t2, n, r) {
      var i2 = this;
      return (i2 = e.call(this) || this).Qo = t2, i2.cacheSizeBytes = n, i2.forceOwnership = r, i2.synchronizeTabs = false, i2;
    }
    return __extends(i, e), i.prototype.initialize = function(t2) {
      return __awaiter(this, void 0, void 0, function() {
        var n = this;
        return __generator(this, function(r) {
          switch (r.label) {
            case 0:
              return [4, e.prototype.initialize.call(this, t2)];
            case 1:
              return r.sent(), [4, Ji(this.localStore)];
            case 2:
              return r.sent(), [4, this.Qo.initialize(this, t2)];
            case 3:
              return r.sent(), [4, au(this.Qo.syncEngine)];
            case 4:
              return r.sent(), [4, Zo(this.Qo.remoteStore)];
            case 5:
              return r.sent(), [4, this.persistence.He(function() {
                return n.gcScheduler && !n.gcScheduler.started && n.gcScheduler.start(n.localStore), Promise.resolve();
              })];
            case 6:
              return r.sent(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, i.prototype.Ko = function(t2) {
      return Ui(this.persistence, new Vi(), t2.initialUser, this.R);
    }, i.prototype.Uo = function(t2) {
      var e2 = this.persistence.referenceDelegate.garbageCollector;
      return new mi(e2, t2.asyncQueue);
    }, i.prototype.qo = function(t2) {
      var e2 = Oi(t2.databaseInfo.databaseId, t2.databaseInfo.persistenceKey), n = void 0 !== this.cacheSizeBytes ? ei.withCacheSize(this.cacheSizeBytes) : ei.DEFAULT;
      return new xi(this.synchronizeTabs, e2, t2.clientId, n, t2.asyncQueue, Ao(), ko(), this.R, this.sharedClientState, !!this.forceOwnership);
    }, i.prototype.Bo = function(t2) {
      return new To();
    }, i;
  }(hu)
);
var lu = (
  /** @class */
  function(e) {
    function i(t2, n) {
      var r = this;
      return (r = e.call(
        this,
        t2,
        n,
        /* forceOwnership= */
        false
      ) || this).Qo = t2, r.cacheSizeBytes = n, r.synchronizeTabs = true, r;
    }
    return __extends(i, e), i.prototype.initialize = function(t2) {
      return __awaiter(this, void 0, void 0, function() {
        var i2, o = this;
        return __generator(this, function(s) {
          switch (s.label) {
            case 0:
              return [4, e.prototype.initialize.call(this, t2)];
            case 1:
              return s.sent(), i2 = this.Qo.syncEngine, this.sharedClientState instanceof Io ? (this.sharedClientState.syncEngine = {
                ui: tu.bind(null, i2),
                ai: ou.bind(null, i2),
                hi: su.bind(null, i2),
                fn: iu.bind(null, i2),
                ci: Zs.bind(null, i2)
              }, [4, this.sharedClientState.start()]) : [3, 3];
            case 2:
              s.sent(), s.label = 3;
            case 3:
              return [4, this.persistence.He(function(t3) {
                return __awaiter(o, void 0, void 0, function() {
                  return __generator(this, function(e2) {
                    switch (e2.label) {
                      case 0:
                        return [4, eu(this.Qo.syncEngine, t3)];
                      case 1:
                        return e2.sent(), this.gcScheduler && (t3 && !this.gcScheduler.started ? this.gcScheduler.start(this.localStore) : t3 || this.gcScheduler.stop()), [
                          2
                          /*return*/
                        ];
                    }
                  });
                });
              })];
            case 4:
              return s.sent(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, i.prototype.Bo = function(t2) {
      var e2 = Ao();
      if (!Io.yt(e2)) throw new D2(N2.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
      var n = Oi(t2.databaseInfo.databaseId, t2.databaseInfo.persistenceKey);
      return new Io(e2, t2.asyncQueue, n, t2.clientId, t2.initialUser);
    }, i;
  }(fu)
);
var du = (
  /** @class */
  function() {
    function t2() {
    }
    return t2.prototype.initialize = function(t3, e) {
      return __awaiter(this, void 0, void 0, function() {
        var n = this;
        return __generator(this, function(r) {
          switch (r.label) {
            case 0:
              return this.localStore ? [3, 2] : (this.localStore = t3.localStore, this.sharedClientState = t3.sharedClientState, this.datastore = this.createDatastore(e), this.remoteStore = this.createRemoteStore(e), this.eventManager = this.createEventManager(e), this.syncEngine = this.createSyncEngine(
                e,
                /* startAsPrimary=*/
                !t3.synchronizeTabs
              ), this.sharedClientState.onlineStateHandler = function(t4) {
                return Ms(
                  n.syncEngine,
                  t4,
                  1
                  /* SharedClientState */
                );
              }, this.remoteStore.remoteSyncer.handleCredentialChange = $s.bind(null, this.syncEngine), [4, ss(this.remoteStore, this.syncEngine.isPrimaryClient)]);
            case 1:
              r.sent(), r.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, t2.prototype.createEventManager = function(t3) {
      return new ys();
    }, t2.prototype.createDatastore = function(t3) {
      var e, n = Co(t3.databaseInfo.databaseId), r = (e = t3.databaseInfo, new Do(e));
      return function(t4, e2, n2) {
        return new Po(t4, e2, n2);
      }(t3.credentials, r, n);
    }, t2.prototype.createRemoteStore = function(t3) {
      var e, n, r, i, o, s = this;
      return e = this.localStore, n = this.datastore, r = t3.asyncQueue, i = function(t4) {
        return Ms(
          s.syncEngine,
          t4,
          0
          /* RemoteStore */
        );
      }, o = Eo.yt() ? new Eo() : new _o(), new Mo(e, n, r, i, o);
    }, t2.prototype.createSyncEngine = function(t3, e) {
      return function(t4, e2, n, r, i, o, s) {
        var u = new xs(t4, e2, n, r, i, o);
        return s && (u.$o = true), u;
      }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t3.initialUser, t3.maxConcurrentLimboResolutions, e);
    }, t2.prototype.terminate = function() {
      return function(t3) {
        return __awaiter(this, void 0, void 0, function() {
          var e;
          return __generator(this, function(n) {
            switch (n.label) {
              case 0:
                return e = F2(t3), C2("RemoteStore", "RemoteStore shutting down."), e.Or.add(
                  5
                  /* Shutdown */
                ), [4, qo(e)];
              case 1:
                return n.sent(), e.Lr.shutdown(), // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                // triggering spurious listener events with cached data, etc.
                e.Br.set(
                  "Unknown"
                  /* Unknown */
                ), [
                  2
                  /*return*/
                ];
            }
          });
        });
      }(this.remoteStore);
    }, t2;
  }()
);
var yu = (
  /** @class */
  function() {
    function t2(t3) {
      this.observer = t3, /**
           * When set to true, will not raise future events. Necessary to deal with
           * async detachment of listener.
           */
      this.muted = false;
    }
    return t2.prototype.next = function(t3) {
      this.observer.next && this.jo(this.observer.next, t3);
    }, t2.prototype.error = function(t3) {
      this.observer.error ? this.jo(this.observer.error, t3) : console.error("Uncaught Error in snapshot listener:", t3);
    }, t2.prototype.Wo = function() {
      this.muted = true;
    }, t2.prototype.jo = function(t3, e) {
      var n = this;
      this.muted || setTimeout(function() {
        n.muted || t3(e);
      }, 0);
    }, t2;
  }()
);
var vu = (
  /** @class */
  function() {
    function t2(t3, e) {
      var n = this;
      this.Go = t3, this.R = e, /** Cached bundle metadata. */
      this.metadata = new br(), /**
           * Internal buffer to hold bundle content, accumulating incomplete element
           * content.
           */
      this.buffer = new Uint8Array(), this.zo = new TextDecoder("utf-8"), // Read the metadata (which is the first element).
      this.Ho().then(function(t4) {
        t4 && t4.io() ? n.metadata.resolve(t4.payload.metadata) : n.metadata.reject(new Error("The first element of the bundle is not a metadata, it is\n             " + JSON.stringify(null == t4 ? void 0 : t4.payload)));
      }, function(t4) {
        return n.metadata.reject(t4);
      });
    }
    return t2.prototype.close = function() {
      return this.Go.cancel();
    }, t2.prototype.getMetadata = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(t3) {
          return [2, this.metadata.promise];
        });
      });
    }, t2.prototype.Lo = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(t3) {
          switch (t3.label) {
            case 0:
              return [4, this.getMetadata()];
            case 1:
              return [2, (t3.sent(), this.Ho())];
          }
        });
      });
    }, /**
     * Reads from the head of internal buffer, and pulling more data from
     * underlying stream if a complete element cannot be found, until an
     * element(including the prefixed length and the JSON string) is found.
     *
     * Once a complete element is read, it is dropped from internal buffer.
     *
     * Returns either the bundled element, or null if we have reached the end of
     * the stream.
     */
    t2.prototype.Ho = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3, e, n, i;
        return __generator(this, function(r) {
          switch (r.label) {
            case 0:
              return [4, this.Jo()];
            case 1:
              return null === (t3 = r.sent()) ? [2, null] : (e = this.zo.decode(t3), n = Number(e), isNaN(n) && this.Yo("length string (" + e + ") is not valid number"), [4, this.Xo(n)]);
            case 2:
              return i = r.sent(), [2, new Ts(JSON.parse(i), t3.length + n)];
          }
        });
      });
    }, /** First index of '{' from the underlying buffer. */
    t2.prototype.Zo = function() {
      return this.buffer.findIndex(function(t3) {
        return t3 === "{".charCodeAt(0);
      });
    }, /**
     * Reads from the beginning of the internal buffer, until the first '{', and
     * return the content.
     *
     * If reached end of the stream, returns a null.
     */
    t2.prototype.Jo = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3, e;
        return __generator(this, function(n) {
          switch (n.label) {
            case 0:
              return this.Zo() < 0 ? [4, this.tc()] : [3, 3];
            case 1:
              if (n.sent()) return [3, 3];
              n.label = 2;
            case 2:
              return [3, 0];
            case 3:
              return 0 === this.buffer.length ? [2, null] : (
                // Broke out of the loop because underlying stream is closed, but still
                // cannot find an open bracket.
                ((t3 = this.Zo()) < 0 && this.Yo("Reached the end of bundle when a length string is expected."), e = this.buffer.slice(0, t3), [2, (this.buffer = this.buffer.slice(t3), e)])
              );
          }
        });
      });
    }, /**
     * Reads from a specified position from the internal buffer, for a specified
     * number of bytes, pulling more data from the underlying stream if needed.
     *
     * Returns a string decoded from the read bytes.
     */
    t2.prototype.Xo = function(t3) {
      return __awaiter(this, void 0, void 0, function() {
        var e;
        return __generator(this, function(n) {
          switch (n.label) {
            case 0:
              return this.buffer.length < t3 ? [4, this.tc()] : [3, 3];
            case 1:
              n.sent() && this.Yo("Reached the end of bundle when more is expected."), n.label = 2;
            case 2:
              return [3, 0];
            case 3:
              return e = this.zo.decode(this.buffer.slice(0, t3)), [2, (this.buffer = this.buffer.slice(t3), e)];
          }
        });
      });
    }, t2.prototype.Yo = function(t3) {
      throw this.Go.cancel(), new Error("Invalid bundle format: " + t3);
    }, /**
     * Pulls more data from underlying stream to internal buffer.
     * Returns a boolean indicating whether the stream is finished.
     */
    t2.prototype.tc = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3, e;
        return __generator(this, function(n) {
          switch (n.label) {
            case 0:
              return [4, this.Go.read()];
            case 1:
              return (t3 = n.sent()).done || ((e = new Uint8Array(this.buffer.length + t3.value.length)).set(this.buffer), e.set(t3.value, this.buffer.length), this.buffer = e), [2, t3.done];
          }
        });
      });
    }, t2;
  }()
);
var mu = (
  /** @class */
  function() {
    function t2(t3) {
      this.datastore = t3, // The version of each document that was read during this transaction.
      this.readVersions = /* @__PURE__ */ new Map(), this.mutations = [], this.committed = false, /**
           * A deferred usage error that occurred previously in this transaction that
           * will cause the transaction to fail once it actually commits.
           */
      this.lastWriteError = null, /**
           * Set of documents that have been written in the transaction.
           *
           * When there's more than one write to the same key in a transaction, any
           * writes after the first are handled differently.
           */
      this.writtenDocs = /* @__PURE__ */ new Set();
    }
    return t2.prototype.lookup = function(t3) {
      return __awaiter(this, void 0, void 0, function() {
        var e, i = this;
        return __generator(this, function(o) {
          switch (o.label) {
            case 0:
              if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new D2(N2.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
              return [4, function(t4, e2) {
                return __awaiter(this, void 0, void 0, function() {
                  var n, i2, o2, s, u, a;
                  return __generator(this, function(r) {
                    switch (r.label) {
                      case 0:
                        return n = F2(t4), i2 = xn(n.R) + "/documents", o2 = {
                          documents: e2.map(function(t5) {
                            return Dn(n.R, t5);
                          })
                        }, [4, n.$i("BatchGetDocuments", i2, o2)];
                      case 1:
                        return s = r.sent(), u = /* @__PURE__ */ new Map(), s.forEach(function(t5) {
                          var e3 = function(t6, e4) {
                            return "found" in e4 ? function(t7, e5) {
                              P2(!!e5.found), e5.found.name, e5.found.updateTime;
                              var n2 = An(t7, e5.found.name), r2 = En(e5.found.updateTime), i3 = new Et({
                                mapValue: {
                                  fields: e5.found.fields
                                }
                              });
                              return Nt.newFoundDocument(n2, r2, i3);
                            }(t6, e4) : "missing" in e4 ? function(t7, e5) {
                              P2(!!e5.missing), P2(!!e5.readTime);
                              var n2 = An(t7, e5.missing), r2 = En(e5.readTime);
                              return Nt.newNoDocument(n2, r2);
                            }(t6, e4) : O2();
                          }(n.R, t5);
                          u.set(e3.key.toString(), e3);
                        }), a = [], [2, (e2.forEach(function(t5) {
                          var e3 = u.get(t5.toString());
                          P2(!!e3), a.push(e3);
                        }), a)];
                    }
                  });
                });
              }(this.datastore, t3)];
            case 1:
              return [2, ((e = o.sent()).forEach(function(t4) {
                return i.recordVersion(t4);
              }), e)];
          }
        });
      });
    }, t2.prototype.set = function(t3, e) {
      this.write(e.toMutation(t3, this.precondition(t3))), this.writtenDocs.add(t3.toString());
    }, t2.prototype.update = function(t3, e) {
      try {
        this.write(e.toMutation(t3, this.preconditionForUpdate(t3)));
      } catch (t4) {
        this.lastWriteError = t4;
      }
      this.writtenDocs.add(t3.toString());
    }, t2.prototype.delete = function(t3) {
      this.write(new je(t3, this.precondition(t3))), this.writtenDocs.add(t3.toString());
    }, t2.prototype.commit = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3, e = this;
        return __generator(this, function(i) {
          switch (i.label) {
            case 0:
              if (this.ensureCommitNotCalled(), this.lastWriteError) throw this.lastWriteError;
              return t3 = this.readVersions, // For each mutation, note that the doc was written.
              this.mutations.forEach(function(e2) {
                t3.delete(e2.key.toString());
              }), // For each document that was read but not written to, we want to perform
              // a `verify` operation.
              t3.forEach(function(t4, n) {
                var r = ct.fromPath(n);
                e.mutations.push(new Ke(r, e.precondition(r)));
              }), [4, function(t4, e2) {
                return __awaiter(this, void 0, void 0, function() {
                  var n, i2, o;
                  return __generator(this, function(r) {
                    switch (r.label) {
                      case 0:
                        return n = F2(t4), i2 = xn(n.R) + "/documents", o = {
                          writes: e2.map(function(t5) {
                            return Pn(n.R, t5);
                          })
                        }, [4, n.Ni("Commit", i2, o)];
                      case 1:
                        return r.sent(), [
                          2
                          /*return*/
                        ];
                    }
                  });
                });
              }(this.datastore, this.mutations)];
            case 1:
              return i.sent(), this.committed = true, [
                2
                /*return*/
              ];
          }
        });
      });
    }, t2.prototype.recordVersion = function(t3) {
      var e;
      if (t3.isFoundDocument()) e = t3.version;
      else {
        if (!t3.isNoDocument()) throw O2();
        e = K2.min();
      }
      var n = this.readVersions.get(t3.key.toString());
      if (n) {
        if (!e.isEqual(n))
          throw new D2(N2.ABORTED, "Document version changed between two reads.");
      } else this.readVersions.set(t3.key.toString(), e);
    }, /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    t2.prototype.precondition = function(t3) {
      var e = this.readVersions.get(t3.toString());
      return !this.writtenDocs.has(t3.toString()) && e ? De.updateTime(e) : De.none();
    }, /**
     * Returns the precondition for a document if the operation is an update.
     */
    t2.prototype.preconditionForUpdate = function(t3) {
      var e = this.readVersions.get(t3.toString());
      if (!this.writtenDocs.has(t3.toString()) && e) {
        if (e.isEqual(K2.min()))
          throw new D2(N2.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
        return De.updateTime(e);
      }
      return De.exists(true);
    }, t2.prototype.write = function(t3) {
      this.ensureCommitNotCalled(), this.mutations.push(t3);
    }, t2.prototype.ensureCommitNotCalled = function() {
    }, t2;
  }()
);
var gu = (
  /** @class */
  function() {
    function t2(t3, e, n, r) {
      this.asyncQueue = t3, this.datastore = e, this.updateFunction = n, this.deferred = r, this.ec = 5, this.Zi = new xo(
        this.asyncQueue,
        "transaction_retry"
        /* TransactionRetry */
      );
    }
    return t2.prototype.run = function() {
      this.ec -= 1, this.nc();
    }, t2.prototype.nc = function() {
      var t3 = this;
      this.Zi.ji(function() {
        return __awaiter(t3, void 0, void 0, function() {
          var t4, e, n = this;
          return __generator(this, function(r) {
            return t4 = new mu(this.datastore), (e = this.sc(t4)) && e.then(function(e2) {
              n.asyncQueue.enqueueAndForget(function() {
                return t4.commit().then(function() {
                  n.deferred.resolve(e2);
                }).catch(function(t5) {
                  n.ic(t5);
                });
              });
            }).catch(function(t5) {
              n.ic(t5);
            }), [
              2
              /*return*/
            ];
          });
        });
      });
    }, t2.prototype.sc = function(t3) {
      try {
        var e = this.updateFunction(t3);
        return !st(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), null);
      } catch (t4) {
        return this.deferred.reject(t4), null;
      }
    }, t2.prototype.ic = function(t3) {
      var e = this;
      this.ec > 0 && this.rc(t3) ? (this.ec -= 1, this.asyncQueue.enqueueAndForget(function() {
        return e.nc(), Promise.resolve();
      })) : this.deferred.reject(t3);
    }, t2.prototype.rc = function(t3) {
      if ("FirebaseError" === t3.name) {
        var e = t3.code;
        return "aborted" === e || "failed-precondition" === e || !Qe(e);
      }
      return false;
    }, t2;
  }()
);
var wu = (
  /** @class */
  function() {
    function t2(t3, e, i) {
      var o = this;
      this.credentials = t3, this.asyncQueue = e, this.databaseInfo = i, this.user = fo.UNAUTHENTICATED, this.clientId = V2.u(), this.credentialListener = function() {
        return Promise.resolve();
      }, this.credentials.setChangeListener(e, function(t4) {
        return __awaiter(o, void 0, void 0, function() {
          return __generator(this, function(e2) {
            switch (e2.label) {
              case 0:
                return C2("FirestoreClient", "Received user=", t4.uid), [4, this.credentialListener(t4)];
              case 1:
                return e2.sent(), this.user = t4, [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
    }
    return t2.prototype.getConfiguration = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(t3) {
          return [2, {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            credentials: this.credentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100
          }];
        });
      });
    }, t2.prototype.setCredentialChangeListener = function(t3) {
      this.credentialListener = t3;
    }, /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */
    t2.prototype.verifyNotTerminated = function() {
      if (this.asyncQueue.isShuttingDown) throw new D2(N2.FAILED_PRECONDITION, "The client has already been terminated.");
    }, t2.prototype.terminate = function() {
      var t3 = this;
      this.asyncQueue.enterRestrictedMode();
      var e = new br();
      return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(function() {
        return __awaiter(t3, void 0, void 0, function() {
          var t4, n;
          return __generator(this, function(r) {
            switch (r.label) {
              case 0:
                return r.trys.push([0, 5, , 6]), this.onlineComponents ? [4, this.onlineComponents.terminate()] : [3, 2];
              case 1:
                r.sent(), r.label = 2;
              case 2:
                return this.offlineComponents ? [4, this.offlineComponents.terminate()] : [3, 4];
              case 3:
                r.sent(), r.label = 4;
              case 4:
                return this.credentials.removeChangeListener(), e.resolve(), [3, 6];
              case 5:
                return t4 = r.sent(), n = hs(t4, "Failed to shutdown persistence"), e.reject(n), [3, 6];
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }), e.promise;
    }, t2;
  }()
);
function bu(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var i, o, s = this;
    return __generator(this, function(u) {
      switch (u.label) {
        case 0:
          return t2.asyncQueue.verifyOperationInProgress(), C2("FirestoreClient", "Initializing OfflineComponentProvider"), [4, t2.getConfiguration()];
        case 1:
          return i = u.sent(), [4, e.initialize(i)];
        case 2:
          return u.sent(), o = i.initialUser, t2.setCredentialChangeListener(function(t3) {
            return __awaiter(s, void 0, void 0, function() {
              return __generator(this, function(n) {
                switch (n.label) {
                  case 0:
                    return o.isEqual(t3) ? [3, 2] : [4, Bi(e.localStore, t3)];
                  case 1:
                    n.sent(), o = t3, n.label = 2;
                  case 2:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          }), // When a user calls clearPersistence() in one client, all other clients
          // need to be terminated to allow the delete to succeed.
          e.persistence.setDatabaseDeletedListener(function() {
            return t2.terminate();
          }), t2.offlineComponents = e, [
            2
            /*return*/
          ];
      }
    });
  });
}
function Iu(t2, e) {
  return __awaiter(this, void 0, void 0, function() {
    var i, o;
    return __generator(this, function(s) {
      switch (s.label) {
        case 0:
          return t2.asyncQueue.verifyOperationInProgress(), [4, Tu(t2)];
        case 1:
          return i = s.sent(), C2("FirestoreClient", "Initializing OnlineComponentProvider"), [4, t2.getConfiguration()];
        case 2:
          return o = s.sent(), [4, e.initialize(i, o)];
        case 3:
          return s.sent(), // The CredentialChangeListener of the online component provider takes
          // precedence over the offline component provider.
          t2.setCredentialChangeListener(function(t3) {
            return function(t4, e2) {
              return __awaiter(this, void 0, void 0, function() {
                var n, i2;
                return __generator(this, function(r) {
                  switch (r.label) {
                    case 0:
                      return (n = F2(t4)).asyncQueue.verifyOperationInProgress(), C2("RemoteStore", "RemoteStore received new credentials"), i2 = zo(n), // Tear down and re-create our network streams. This will ensure we get a
                      // fresh auth token for the new user and re-fill the write pipeline with
                      // new mutations from the LocalStore (since mutations are per-user).
                      n.Or.add(
                        3
                        /* CredentialChange */
                      ), [4, qo(n)];
                    case 1:
                      return r.sent(), i2 && // Don't set the network status to Unknown if we are offline.
                      n.Br.set(
                        "Unknown"
                        /* Unknown */
                      ), [4, n.remoteSyncer.handleCredentialChange(e2)];
                    case 2:
                      return r.sent(), n.Or.delete(
                        3
                        /* CredentialChange */
                      ), [4, Vo(n)];
                    case 3:
                      return r.sent(), [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }(e.remoteStore, t3);
          }), t2.onlineComponents = e, [
            2
            /*return*/
          ];
      }
    });
  });
}
function Tu(t2) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(e) {
      switch (e.label) {
        case 0:
          return t2.offlineComponents ? [3, 2] : (C2("FirestoreClient", "Using default OfflineComponentProvider"), [4, bu(t2, new hu())]);
        case 1:
          e.sent(), e.label = 2;
        case 2:
          return [2, t2.offlineComponents];
      }
    });
  });
}
function _u(t2) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(e) {
      switch (e.label) {
        case 0:
          return t2.onlineComponents ? [3, 2] : (C2("FirestoreClient", "Using default OnlineComponentProvider"), [4, Iu(t2, new du())]);
        case 1:
          e.sent(), e.label = 2;
        case 2:
          return [2, t2.onlineComponents];
      }
    });
  });
}
function Eu(t2) {
  return Tu(t2).then(function(t3) {
    return t3.persistence;
  });
}
function Su(t2) {
  return Tu(t2).then(function(t3) {
    return t3.localStore;
  });
}
function Nu(t2) {
  return _u(t2).then(function(t3) {
    return t3.remoteStore;
  });
}
function Du(t2) {
  return _u(t2).then(function(t3) {
    return t3.syncEngine;
  });
}
function Au(t2) {
  return __awaiter(this, void 0, void 0, function() {
    var e, n;
    return __generator(this, function(r) {
      switch (r.label) {
        case 0:
          return [4, _u(t2)];
        case 1:
          return e = r.sent(), [2, ((n = e.eventManager).onListen = Rs.bind(null, e.syncEngine), n.onUnlisten = Os.bind(null, e.syncEngine), n)];
      }
    });
  });
}
function ku(t2, e, i) {
  var o = this;
  void 0 === i && (i = {});
  var s = new br();
  return t2.asyncQueue.enqueueAndForget(function() {
    return __awaiter(o, void 0, void 0, function() {
      var n;
      return __generator(this, function(r) {
        switch (r.label) {
          case 0:
            return n = function(t3, e2, n2, r2, i2) {
              var o2 = new yu({
                next: function(o3) {
                  e2.enqueueAndForget(function() {
                    return ms(t3, s2);
                  });
                  var u = o3.docs.has(n2);
                  !u && o3.fromCache ? (
                    // TODO(dimond): If we're online and the document doesn't
                    // exist then we resolve with a doc.exists set to false. If
                    // we're offline however, we reject the Promise in this
                    // case. Two options: 1) Cache the negative response from
                    // the server so we can deliver that even when you're
                    // offline 2) Actually reject the Promise in the online case
                    // if the document doesn't exist.
                    i2.reject(new D2(N2.UNAVAILABLE, "Failed to get document because the client is offline."))
                  ) : u && o3.fromCache && r2 && "server" === r2.source ? i2.reject(new D2(N2.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i2.resolve(o3);
                },
                error: function(t4) {
                  return i2.reject(t4);
                }
              }), s2 = new Is(Yt(n2.path), o2, {
                includeMetadataChanges: true,
                so: true
              });
              return vs(t3, s2);
            }, [4, Au(t2)];
          case 1:
            return [2, n.apply(void 0, [r.sent(), t2.asyncQueue, e, i, s])];
        }
      });
    });
  }), s.promise;
}
function Cu(t2, e, i) {
  var o = this;
  void 0 === i && (i = {});
  var s = new br();
  return t2.asyncQueue.enqueueAndForget(function() {
    return __awaiter(o, void 0, void 0, function() {
      var n;
      return __generator(this, function(r) {
        switch (r.label) {
          case 0:
            return n = function(t3, e2, n2, r2, i2) {
              var o2 = new yu({
                next: function(n3) {
                  e2.enqueueAndForget(function() {
                    return ms(t3, s2);
                  }), n3.fromCache && "server" === r2.source ? i2.reject(new D2(N2.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i2.resolve(n3);
                },
                error: function(t4) {
                  return i2.reject(t4);
                }
              }), s2 = new Is(n2, o2, {
                includeMetadataChanges: true,
                so: true
              });
              return vs(t3, s2);
            }, [4, Au(t2)];
          case 1:
            return [2, n.apply(void 0, [r.sent(), t2.asyncQueue, e, i, s])];
        }
      });
    });
  }), s.promise;
}
var xu = (
  /**
       * Constructs a DatabaseInfo using the provided host, databaseId and
       * persistenceKey.
       *
       * @param databaseId - The database to use.
       * @param appId - The Firebase App Id.
       * @param persistenceKey - A unique identifier for this Firestore's local
       * storage (used in conjunction with the databaseId).
       * @param host - The Firestore backend host to connect to.
       * @param ssl - Whether to use SSL when connecting.
       * @param forceLongPolling - Whether to use the forceLongPolling option
       * when using WebChannel as the network transport.
       * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
       * option when using WebChannel as the network transport.
       * @param useFetchStreams Whether to use the Fetch API instead of
       * XMLHTTPRequest
       */
  function(t2, e, n, r, i, o, s, u) {
    this.databaseId = t2, this.appId = e, this.persistenceKey = n, this.host = r, this.ssl = i, this.forceLongPolling = o, this.autoDetectLongPolling = s, this.useFetchStreams = u;
  }
);
var Ru = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.projectId = t3, this.database = e || "(default)";
    }
    return Object.defineProperty(t2.prototype, "isDefaultDatabase", {
      get: function() {
        return "(default)" === this.database;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.isEqual = function(e) {
      return e instanceof t2 && e.projectId === this.projectId && e.database === this.database;
    }, t2;
  }()
);
var Lu = /* @__PURE__ */ new Map();
var Ou = function(t2, e) {
  this.user = e, this.type = "OAuth", this.authHeaders = {}, // Set the headers using Object Literal notation to avoid minification
  this.authHeaders.Authorization = "Bearer " + t2;
};
var Pu = (
  /** @class */
  function() {
    function t2() {
      this.changeListener = null;
    }
    return t2.prototype.getToken = function() {
      return Promise.resolve(null);
    }, t2.prototype.invalidateToken = function() {
    }, t2.prototype.setChangeListener = function(t3, e) {
      this.changeListener = e, // Fire with initial user.
      t3.enqueueRetryable(function() {
        return e(fo.UNAUTHENTICATED);
      });
    }, t2.prototype.removeChangeListener = function() {
      this.changeListener = null;
    }, t2;
  }()
);
var Fu = (
  /** @class */
  function() {
    function t2(t3) {
      this.token = t3, /**
           * Stores the listener registered with setChangeListener()
           * This isn't actually necessary since the UID never changes, but we use this
           * to verify the listen contract is adhered to in tests.
           */
      this.changeListener = null;
    }
    return t2.prototype.getToken = function() {
      return Promise.resolve(this.token);
    }, t2.prototype.invalidateToken = function() {
    }, t2.prototype.setChangeListener = function(t3, e) {
      var n = this;
      this.changeListener = e, // Fire with initial user.
      t3.enqueueRetryable(function() {
        return e(n.token.user);
      });
    }, t2.prototype.removeChangeListener = function() {
      this.changeListener = null;
    }, t2;
  }()
);
var Mu = (
  /** @class */
  function() {
    function t2(t3) {
      var e = this;
      this.currentUser = fo.UNAUTHENTICATED, /** Promise that allows blocking on the initialization of Firebase Auth. */
      this.oc = new br(), /**
           * Counter used to detect if the token changed while a getToken request was
           * outstanding.
           */
      this.cc = 0, this.forceRefresh = false, this.auth = null, this.asyncQueue = null, this.uc = function() {
        e.cc++, e.currentUser = e.ac(), e.oc.resolve(), e.changeListener && e.asyncQueue.enqueueRetryable(function() {
          return e.changeListener(e.currentUser);
        });
      };
      var n = function(t4) {
        C2("FirebaseCredentialsProvider", "Auth detected"), e.auth = t4, e.auth.addAuthTokenListener(e.uc);
      };
      t3.onInit(function(t4) {
        return n(t4);
      }), // Our users can initialize Auth right after Firestore, so we give it
      // a chance to register itself with the component framework before we
      // determine whether to start up in unauthenticated mode.
      setTimeout(function() {
        if (!e.auth) {
          var r = t3.getImmediate({
            optional: true
          });
          r ? n(r) : (
            // If auth is still not available, proceed with `null` user
            (C2("FirebaseCredentialsProvider", "Auth not yet detected"), e.oc.resolve())
          );
        }
      }, 0);
    }
    return t2.prototype.getToken = function() {
      var t3 = this, e = this.cc, n = this.forceRefresh;
      return this.forceRefresh = false, this.auth ? this.auth.getToken(n).then(function(n2) {
        return t3.cc !== e ? (C2("FirebaseCredentialsProvider", "getToken aborted due to token change."), t3.getToken()) : n2 ? (P2("string" == typeof n2.accessToken), new Ou(n2.accessToken, t3.currentUser)) : null;
      }) : Promise.resolve(null);
    }, t2.prototype.invalidateToken = function() {
      this.forceRefresh = true;
    }, t2.prototype.setChangeListener = function(t3, e) {
      var i = this;
      this.asyncQueue = t3, // Blocks the AsyncQueue until the next user is available.
      this.asyncQueue.enqueueRetryable(function() {
        return __awaiter(i, void 0, void 0, function() {
          return __generator(this, function(t4) {
            switch (t4.label) {
              case 0:
                return [4, this.oc.promise];
              case 1:
                return t4.sent(), [4, e(this.currentUser)];
              case 2:
                return t4.sent(), this.changeListener = e, [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
    }, t2.prototype.removeChangeListener = function() {
      this.auth && this.auth.removeAuthTokenListener(this.uc), this.changeListener = function() {
        return Promise.resolve();
      };
    }, // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    t2.prototype.ac = function() {
      var t3 = this.auth && this.auth.getUid();
      return P2(null === t3 || "string" == typeof t3), new fo(t3);
    }, t2;
  }()
);
var Vu = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.hc = t3, this.lc = e, this.fc = n, this.type = "FirstParty", this.user = fo.FIRST_PARTY;
    }
    return Object.defineProperty(t2.prototype, "authHeaders", {
      get: function() {
        var t3 = {
          "X-Goog-AuthUser": this.lc
        }, e = this.hc.auth.getAuthHeaderValueForFirstParty([]);
        return e && (t3.Authorization = e), this.fc && (t3["X-Goog-Iam-Authorization-Token"] = this.fc), t3;
      },
      enumerable: false,
      configurable: true
    }), t2;
  }()
);
var qu = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.hc = t3, this.lc = e, this.fc = n;
    }
    return t2.prototype.getToken = function() {
      return Promise.resolve(new Vu(this.hc, this.lc, this.fc));
    }, t2.prototype.setChangeListener = function(t3, e) {
      t3.enqueueRetryable(function() {
        return e(fo.FIRST_PARTY);
      });
    }, t2.prototype.removeChangeListener = function() {
    }, t2.prototype.invalidateToken = function() {
    }, t2;
  }()
);
function Uu(t2, e, n) {
  if (!n) throw new D2(N2.INVALID_ARGUMENT, "Function " + t2 + "() cannot be called with an empty " + e + ".");
}
function Bu(t2, e) {
  if (void 0 === e) return {
    merge: false
  };
  if (void 0 !== e.mergeFields && void 0 !== e.merge) throw new D2(N2.INVALID_ARGUMENT, "Invalid options passed to function " + t2 + '(): You cannot specify both "merge" and "mergeFields".');
  return e;
}
function ju(t2, e, n, r) {
  if (true === e && true === r) throw new D2(N2.INVALID_ARGUMENT, t2 + " and " + n + " cannot be used together.");
}
function Ku(t2) {
  if (!ct.isDocumentKey(t2)) throw new D2(N2.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + t2 + " has " + t2.length + ".");
}
function Gu(t2) {
  if (ct.isDocumentKey(t2)) throw new D2(N2.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + t2 + " has " + t2.length + ".");
}
function Qu(t2) {
  if (void 0 === t2) return "undefined";
  if (null === t2) return "null";
  if ("string" == typeof t2) return t2.length > 20 && (t2 = t2.substring(0, 20) + "..."), JSON.stringify(t2);
  if ("number" == typeof t2 || "boolean" == typeof t2) return "" + t2;
  if ("object" == typeof t2) {
    if (t2 instanceof Array) return "an array";
    var e = (
      /** Hacky method to try to get the constructor name for an object. */
      function(t3) {
        if (t3.constructor) {
          var e2 = /function\s+([^\s(]+)\s*\(/.exec(t3.constructor.toString());
          if (e2 && e2.length > 1) return e2[1];
        }
        return null;
      }(t2)
    );
    return e ? "a custom " + e + " object" : "an object";
  }
  return "function" == typeof t2 ? "a function" : O2();
}
function zu(t2, e) {
  if ("_delegate" in t2 && // Unwrap Compat types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (t2 = t2._delegate), !(t2 instanceof e)) {
    if (e.name === t2.constructor.name) throw new D2(N2.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    var n = Qu(t2);
    throw new D2(N2.INVALID_ARGUMENT, "Expected type '" + e.name + "', but it was: " + n);
  }
  return t2;
}
function Wu(t2, e) {
  if (e <= 0) throw new D2(N2.INVALID_ARGUMENT, "Function " + t2 + "() requires a positive number, but it was: " + e + ".");
}
var Hu = (
  /** @class */
  function() {
    function t2(t3) {
      var e;
      if (void 0 === t3.host) {
        if (void 0 !== t3.ssl) throw new D2(N2.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
        this.host = "firestore.googleapis.com", this.ssl = true;
      } else this.host = t3.host, this.ssl = null === (e = t3.ssl) || void 0 === e || e;
      if (this.credentials = t3.credentials, this.ignoreUndefinedProperties = !!t3.ignoreUndefinedProperties, void 0 === t3.cacheSizeBytes) this.cacheSizeBytes = 41943040;
      else {
        if (-1 !== t3.cacheSizeBytes && t3.cacheSizeBytes < 1048576) throw new D2(N2.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
        this.cacheSizeBytes = t3.cacheSizeBytes;
      }
      this.experimentalForceLongPolling = !!t3.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t3.experimentalAutoDetectLongPolling, this.useFetchStreams = !!t3.useFetchStreams, ju("experimentalForceLongPolling", t3.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t3.experimentalAutoDetectLongPolling);
    }
    return t2.prototype.isEqual = function(t3) {
      return this.host === t3.host && this.ssl === t3.ssl && this.credentials === t3.credentials && this.cacheSizeBytes === t3.cacheSizeBytes && this.experimentalForceLongPolling === t3.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t3.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t3.ignoreUndefinedProperties && this.useFetchStreams === t3.useFetchStreams;
    }, t2;
  }()
);
var Yu = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new Hu({}), this._settingsFrozen = false, t3 instanceof Ru ? (this._databaseId = t3, this._credentials = new Pu()) : (this._app = t3, this._databaseId = function(t4) {
        if (!Object.prototype.hasOwnProperty.apply(t4.options, ["projectId"])) throw new D2(N2.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
        return new Ru(t4.options.projectId);
      }(t3), this._credentials = new Mu(e));
    }
    return Object.defineProperty(t2.prototype, "app", {
      /**
       * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
       * instance.
       */
      get: function() {
        if (!this._app) throw new D2(N2.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
        return this._app;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "_initialized", {
      get: function() {
        return this._settingsFrozen;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "_terminated", {
      get: function() {
        return void 0 !== this._terminateTask;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype._setSettings = function(t3) {
      if (this._settingsFrozen) throw new D2(N2.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
      this._settings = new Hu(t3), void 0 !== t3.credentials && (this._credentials = function(t4) {
        if (!t4) return new Pu();
        switch (t4.type) {
          case "gapi":
            var e = t4.client;
            return P2(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), new qu(e, t4.sessionIndex || "0", t4.iamToken || null);
          case "provider":
            return t4.client;
          default:
            throw new D2(N2.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type");
        }
      }(t3.credentials));
    }, t2.prototype._getSettings = function() {
      return this._settings;
    }, t2.prototype._freezeSettings = function() {
      return this._settingsFrozen = true, this._settings;
    }, t2.prototype._delete = function() {
      return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
    }, /** Returns a JSON-serializable representation of this `Firestore` instance. */
    t2.prototype.toJSON = function() {
      return {
        app: this._app,
        databaseId: this._databaseId,
        settings: this._settings
      };
    }, /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */
    t2.prototype._terminate = function() {
      return t3 = this, (e = Lu.get(t3)) && (C2("ComponentProvider", "Removing Datastore"), Lu.delete(t3), e.terminate()), Promise.resolve();
      var t3, e;
    }, t2;
  }()
);
var $u = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.converter = e, this._key = n, /** The type of this Firestore reference. */
      this.type = "document", this.firestore = t3;
    }
    return Object.defineProperty(t2.prototype, "_path", {
      get: function() {
        return this._key.path;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "id", {
      /**
       * The document's identifier within its collection.
       */
      get: function() {
        return this._key.path.lastSegment();
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "path", {
      /**
       * A string representing the path of the referenced document (relative
       * to the root of the database).
       */
      get: function() {
        return this._key.path.canonicalString();
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "parent", {
      /**
       * The collection this `DocumentReference` belongs to.
       */
      get: function() {
        return new Ju(this.firestore, this.converter, this._key.path.popLast());
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.withConverter = function(e) {
      return new t2(this.firestore, e, this._key);
    }, t2;
  }()
);
var Xu = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.converter = e, this._query = n, /** The type of this Firestore reference. */
      this.type = "query", this.firestore = t3;
    }
    return t2.prototype.withConverter = function(e) {
      return new t2(this.firestore, e, this._query);
    }, t2;
  }()
);
var Ju = (
  /** @class */
  function(e) {
    function n(t2, n2, r) {
      var i = this;
      return (i = e.call(this, t2, n2, Yt(r)) || this)._path = r, /** The type of this Firestore reference. */
      i.type = "collection", i;
    }
    return __extends(n, e), Object.defineProperty(n.prototype, "id", {
      /** The collection's identifier. */
      get: function() {
        return this._query.path.lastSegment();
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(n.prototype, "path", {
      /**
       * A string representing the path of the referenced collection (relative
       * to the root of the database).
       */
      get: function() {
        return this._query.path.canonicalString();
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(n.prototype, "parent", {
      /**
       * A reference to the containing `DocumentReference` if this is a
       * subcollection. If this isn't a subcollection, the reference is null.
       */
      get: function() {
        var t2 = this._path.popLast();
        return t2.isEmpty() ? null : new $u(
          this.firestore,
          /* converter= */
          null,
          new ct(t2)
        );
      },
      enumerable: false,
      configurable: true
    }), n.prototype.withConverter = function(t2) {
      return new n(this.firestore, t2, this._path);
    }, n;
  }(Xu)
);
function Zu(t2, n) {
  for (var r, i = [], o = 2; o < arguments.length; o++) i[o - 2] = arguments[o];
  if (t2 = getModularInstance(t2), Uu("collection", "path", n), t2 instanceof Yu) return Gu(r = H2.fromString.apply(H2, __spreadArray([n], i))), new Ju(
    t2,
    /* converter= */
    null,
    r
  );
  if (!(t2 instanceof $u || t2 instanceof Ju)) throw new D2(N2.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
  return Gu(r = H2.fromString.apply(H2, __spreadArray([t2.path], i)).child(H2.fromString(n))), new Ju(
    t2.firestore,
    /* converter= */
    null,
    r
  );
}
function ta2(t2, n) {
  for (var r, i = [], o = 2; o < arguments.length; o++) i[o - 2] = arguments[o];
  if (t2 = getModularInstance(t2), // We allow omission of 'pathString' but explicitly prohibit passing in both
  // 'undefined' and 'null'.
  1 === arguments.length && (n = V2.u()), Uu("doc", "path", n), t2 instanceof Yu) return Ku(r = H2.fromString.apply(H2, __spreadArray([n], i))), new $u(
    t2,
    /* converter= */
    null,
    new ct(r)
  );
  if (!(t2 instanceof $u || t2 instanceof Ju)) throw new D2(N2.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
  return Ku(r = t2._path.child(H2.fromString.apply(H2, __spreadArray([n], i)))), new $u(t2.firestore, t2 instanceof Ju ? t2.converter : null, new ct(r));
}
function ea2(t2, e) {
  return t2 = getModularInstance(t2), e = getModularInstance(e), (t2 instanceof $u || t2 instanceof Ju) && (e instanceof $u || e instanceof Ju) && t2.firestore === e.firestore && t2.path === e.path && t2.converter === e.converter;
}
function na2(t2, e) {
  return t2 = getModularInstance(t2), e = getModularInstance(e), t2 instanceof Xu && e instanceof Xu && t2.firestore === e.firestore && ie(t2._query, e._query) && t2.converter === e.converter;
}
var ra2 = (
  /** @class */
  function() {
    function t2() {
      var t3 = this;
      this.dc = Promise.resolve(), // A list of retryable operations. Retryable operations are run in order and
      // retried with backoff.
      this.wc = [], // Is this AsyncQueue being shut down? Once it is set to true, it will not
      // be changed again.
      this._c = false, // Operations scheduled to be queued in the future. Operations are
      // automatically removed after they are run or canceled.
      this.mc = [], // visible for testing
      this.yc = null, // Flag set while there's an outstanding AsyncQueue operation, used for
      // assertion sanity-checks.
      this.gc = false, // Enabled during shutdown on Safari to prevent future access to IndexedDB.
      this.Ec = false, // List of TimerIds to fast-forward delays for.
      this.Tc = [], // Backoff timer used to schedule retries for retryable operations
      this.Zi = new xo(
        this,
        "async_queue_retry"
        /* AsyncQueueRetry */
      ), // Visibility handler that triggers an immediate retry of all retryable
      // operations. Meant to speed up recovery when we regain file system access
      // after page comes into foreground.
      this.Ic = function() {
        var e2 = ko();
        e2 && C2("AsyncQueue", "Visibility state changed to " + e2.visibilityState), t3.Zi.Gi();
      };
      var e = ko();
      e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.Ic);
    }
    return Object.defineProperty(t2.prototype, "isShuttingDown", {
      get: function() {
        return this._c;
      },
      enumerable: false,
      configurable: true
    }), /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    t2.prototype.enqueueAndForget = function(t3) {
      this.enqueue(t3);
    }, t2.prototype.enqueueAndForgetEvenWhileRestricted = function(t3) {
      this.Ac(), // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.Rc(t3);
    }, t2.prototype.enterRestrictedMode = function(t3) {
      if (!this._c) {
        this._c = true, this.Ec = t3 || false;
        var e = ko();
        e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.Ic);
      }
    }, t2.prototype.enqueue = function(t3) {
      var e = this;
      if (this.Ac(), this._c)
        return new Promise(function() {
        });
      var n = new br();
      return this.Rc(function() {
        return e._c && e.Ec ? Promise.resolve() : (t3().then(n.resolve, n.reject), n.promise);
      }).then(function() {
        return n.promise;
      });
    }, t2.prototype.enqueueRetryable = function(t3) {
      var e = this;
      this.enqueueAndForget(function() {
        return e.wc.push(t3), e.bc();
      });
    }, /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */
    t2.prototype.bc = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3, e = this;
        return __generator(this, function(n) {
          switch (n.label) {
            case 0:
              if (0 === this.wc.length) return [3, 5];
              n.label = 1;
            case 1:
              return n.trys.push([1, 3, , 4]), [4, this.wc[0]()];
            case 2:
              return n.sent(), this.wc.shift(), this.Zi.reset(), [3, 4];
            case 3:
              if (!Nr(t3 = n.sent())) throw t3;
              return C2("AsyncQueue", "Operation failed with retryable error: " + t3), [3, 4];
            case 4:
              this.wc.length > 0 && // If there are additional operations, we re-schedule `retryNextOp()`.
              // This is necessary to run retryable operations that failed during
              // their initial attempt since we don't know whether they are already
              // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
              // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
              // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
              // call scheduled here.
              // Since `backoffAndRun()` cancels an existing backoff and schedules a
              // new backoff on every call, there is only ever a single additional
              // operation in the queue.
              this.Zi.ji(function() {
                return e.bc();
              }), n.label = 5;
            case 5:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, t2.prototype.Rc = function(t3) {
      var e = this, n = this.dc.then(function() {
        return e.gc = true, t3().catch(function(t4) {
          throw e.yc = t4, e.gc = false, x2(
            "INTERNAL UNHANDLED ERROR: ",
            /**
            * Chrome includes Error.message in Error.stack. Other browsers do not.
            * This returns expected output of message + stack when available.
            * @param error - Error or FirestoreError
            */
            function(t5) {
              var e2 = t5.message || "";
              return t5.stack && (e2 = t5.stack.includes(t5.message) ? t5.stack : t5.message + "\n" + t5.stack), e2;
            }(t4)
          ), t4;
        }).then(function(t4) {
          return e.gc = false, t4;
        });
      });
      return this.dc = n, n;
    }, t2.prototype.enqueueAfterDelay = function(t3, e, n) {
      var r = this;
      this.Ac(), // Fast-forward delays for timerIds that have been overriden.
      this.Tc.indexOf(t3) > -1 && (e = 0);
      var i = cs.createAndSchedule(this, t3, e, n, function(t4) {
        return r.vc(t4);
      });
      return this.mc.push(i), i;
    }, t2.prototype.Ac = function() {
      this.yc && O2();
    }, t2.prototype.verifyOperationInProgress = function() {
    }, /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    t2.prototype.Pc = function() {
      return __awaiter(this, void 0, void 0, function() {
        var t3;
        return __generator(this, function(e) {
          switch (e.label) {
            case 0:
              return [4, t3 = this.dc];
            case 1:
              e.sent(), e.label = 2;
            case 2:
              if (t3 !== this.dc) return [3, 0];
              e.label = 3;
            case 3:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    t2.prototype.Vc = function(t3) {
      for (var e = 0, n = this.mc; e < n.length; e++) {
        if (n[e].timerId === t3) return true;
      }
      return false;
    }, /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    t2.prototype.Sc = function(t3) {
      var e = this;
      return this.Pc().then(function() {
        e.mc.sort(function(t4, e2) {
          return t4.targetTimeMs - e2.targetTimeMs;
        });
        for (var n = 0, r = e.mc; n < r.length; n++) {
          var i = r[n];
          if (i.skipDelay(), "all" !== t3 && i.timerId === t3) break;
        }
        return e.Pc();
      });
    }, /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    t2.prototype.Dc = function(t3) {
      this.Tc.push(t3);
    }, /** Called once a DelayedOperation is run or canceled. */
    t2.prototype.vc = function(t3) {
      var e = this.mc.indexOf(t3);
      this.mc.splice(e, 1);
    }, t2;
  }()
);
function ia2(t2) {
  return function(t3, e) {
    if ("object" != typeof t3 || null === t3) return false;
    for (var n = t3, r = 0, i = ["next", "error", "complete"]; r < i.length; r++) {
      var o = i[r];
      if (o in n && "function" == typeof n[o]) return true;
    }
    return false;
  }(t2);
}
var oa2 = (
  /** @class */
  function() {
    function t2() {
      this._progressObserver = {}, this._taskCompletionResolver = new br(), this._lastProgress = {
        taskState: "Running",
        totalBytes: 0,
        totalDocuments: 0,
        bytesLoaded: 0,
        documentsLoaded: 0
      };
    }
    return t2.prototype.onProgress = function(t3, e, n) {
      this._progressObserver = {
        next: t3,
        error: e,
        complete: n
      };
    }, /**
     * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
     *
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    t2.prototype.catch = function(t3) {
      return this._taskCompletionResolver.promise.catch(t3);
    }, /**
     * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
     *
     * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
     *   The update will always have its `taskState` set to `"Success"`.
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    t2.prototype.then = function(t3, e) {
      return this._taskCompletionResolver.promise.then(t3, e);
    }, /**
     * Notifies all observers that bundle loading has completed, with a provided
     * `LoadBundleTaskProgress` object.
     *
     * @private
     */
    t2.prototype._completeWith = function(t3) {
      this._updateProgress(t3), this._progressObserver.complete && this._progressObserver.complete(), this._taskCompletionResolver.resolve(t3);
    }, /**
     * Notifies all observers that bundle loading has failed, with a provided
     * `Error` as the reason.
     *
     * @private
     */
    t2.prototype._failWith = function(t3) {
      this._lastProgress.taskState = "Error", this._progressObserver.next && this._progressObserver.next(this._lastProgress), this._progressObserver.error && this._progressObserver.error(t3), this._taskCompletionResolver.reject(t3);
    }, /**
     * Notifies a progress update of loading a bundle.
     * @param progress - The new progress.
     *
     * @private
     */
    t2.prototype._updateProgress = function(t3) {
      this._lastProgress = t3, this._progressObserver.next && this._progressObserver.next(t3);
    }, t2;
  }()
);
var sa2 = -1;
var ua2 = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, t2, n2) || this).type = "firestore", r._queue = new ra2(), r._persistenceKey = "name" in t2 ? t2.name : "[DEFAULT]", r;
    }
    return __extends(n, e), n.prototype._terminate = function() {
      return this._firestoreClient || // The client must be initialized to ensure that all subsequent API
      // usage throws an exception.
      ca(this), this._firestoreClient.terminate();
    }, n;
  }(Yu)
);
function aa2(t2) {
  return t2._firestoreClient || ca(t2), t2._firestoreClient.verifyNotTerminated(), t2._firestoreClient;
}
function ca(t2) {
  var e, n = t2._freezeSettings(), r = function(t3, e2, n2, r2) {
    return new xu(t3, e2, n2, r2.host, r2.ssl, r2.experimentalForceLongPolling, r2.experimentalAutoDetectLongPolling, r2.useFetchStreams);
  }(t2._databaseId, (null === (e = t2._app) || void 0 === e ? void 0 : e.options.appId) || "", t2._persistenceKey, n);
  t2._firestoreClient = new wu(t2._credentials, t2._queue, r);
}
function ha2(t2, e, i) {
  var o = this, s = new br();
  return t2.asyncQueue.enqueue(function() {
    return __awaiter(o, void 0, void 0, function() {
      var n;
      return __generator(this, function(r) {
        switch (r.label) {
          case 0:
            return r.trys.push([0, 3, , 4]), [4, bu(t2, i)];
          case 1:
            return r.sent(), [4, Iu(t2, e)];
          case 2:
            return r.sent(), s.resolve(), [3, 4];
          case 3:
            if (!/**
            * Decides whether the provided error allows us to gracefully disable
            * persistence (as opposed to crashing the client).
            */
            function(t3) {
              return "FirebaseError" === t3.name ? t3.code === N2.FAILED_PRECONDITION || t3.code === N2.UNIMPLEMENTED : !("undefined" != typeof DOMException && t3 instanceof DOMException) || 22 === t3.code || 20 === t3.code || // Firefox Private Browsing mode disables IndexedDb and returns
              // INVALID_STATE for any usage.
              11 === t3.code;
            }(n = r.sent())) throw n;
            return console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + n), s.reject(n), [3, 4];
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }).then(function() {
    return s.promise;
  });
}
function fa2(t2) {
  if (t2._initialized || t2._terminated) throw new D2(N2.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
}
var la2 = (
  /** @class */
  function() {
    function t2() {
      for (var t3 = [], e = 0; e < arguments.length; e++) t3[e] = arguments[e];
      for (var n = 0; n < t3.length; ++n) if (0 === t3[n].length) throw new D2(N2.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
      this._internalPath = new $(t3);
    }
    return t2.prototype.isEqual = function(t3) {
      return this._internalPath.isEqual(t3._internalPath);
    }, t2;
  }()
);
var da2 = (
  /** @class */
  function() {
    function t2(t3) {
      this._byteString = t3;
    }
    return t2.fromBase64String = function(e) {
      try {
        return new t2(J2.fromBase64String(e));
      } catch (e2) {
        throw new D2(N2.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e2);
      }
    }, /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */
    t2.fromUint8Array = function(e) {
      return new t2(J2.fromUint8Array(e));
    }, /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */
    t2.prototype.toBase64 = function() {
      return this._byteString.toBase64();
    }, /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */
    t2.prototype.toUint8Array = function() {
      return this._byteString.toUint8Array();
    }, /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */
    t2.prototype.toString = function() {
      return "Bytes(base64: " + this.toBase64() + ")";
    }, /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */
    t2.prototype.isEqual = function(t3) {
      return this._byteString.isEqual(t3._byteString);
    }, t2;
  }()
);
var pa2 = (
  /**
       * @param _methodName - The public API endpoint that returns this class.
       * @hideconstructor
       */
  function(t2) {
    this._methodName = t2;
  }
);
var ya2 = (
  /** @class */
  function() {
    function t2(t3, e) {
      if (!isFinite(t3) || t3 < -90 || t3 > 90) throw new D2(N2.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t3);
      if (!isFinite(e) || e < -180 || e > 180) throw new D2(N2.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
      this._lat = t3, this._long = e;
    }
    return Object.defineProperty(t2.prototype, "latitude", {
      /**
       * The latitude of this `GeoPoint` instance.
       */
      get: function() {
        return this._lat;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "longitude", {
      /**
       * The longitude of this `GeoPoint` instance.
       */
      get: function() {
        return this._long;
      },
      enumerable: false,
      configurable: true
    }), /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */
    t2.prototype.isEqual = function(t3) {
      return this._lat === t3._lat && this._long === t3._long;
    }, /** Returns a JSON-serializable representation of this GeoPoint. */
    t2.prototype.toJSON = function() {
      return {
        latitude: this._lat,
        longitude: this._long
      };
    }, /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    t2.prototype._compareTo = function(t3) {
      return q2(this._lat, t3._lat) || q2(this._long, t3._long);
    }, t2;
  }()
);
var va = /^__.*__$/;
var ma2 = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.data = t3, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t2.prototype.toMutation = function(t3, e) {
      return null !== this.fieldMask ? new Fe(t3, this.data, this.fieldMask, e, this.fieldTransforms) : new Pe(t3, this.data, e, this.fieldTransforms);
    }, t2;
  }()
);
var ga = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.data = t3, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t2.prototype.toMutation = function(t3, e) {
      return new Fe(t3, this.data, this.fieldMask, e, this.fieldTransforms);
    }, t2;
  }()
);
function wa(t2) {
  switch (t2) {
    case 0:
    // fall through
    case 2:
    // fall through
    case 1:
      return true;
    case 3:
    case 4:
      return false;
    default:
      throw O2();
  }
}
var ba2 = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i, o) {
      this.settings = t3, this.databaseId = e, this.R = n, this.ignoreUndefinedProperties = r, // Minor hack: If fieldTransforms is undefined, we assume this is an
      // external call and we need to validate the entire path.
      void 0 === i && this.Cc(), this.fieldTransforms = i || [], this.fieldMask = o || [];
    }
    return Object.defineProperty(t2.prototype, "path", {
      get: function() {
        return this.settings.path;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "Nc", {
      get: function() {
        return this.settings.Nc;
      },
      enumerable: false,
      configurable: true
    }), /** Returns a new context with the specified settings overwritten. */
    t2.prototype.xc = function(e) {
      return new t2(Object.assign(Object.assign({}, this.settings), e), this.databaseId, this.R, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
    }, t2.prototype.kc = function(t3) {
      var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t3), r = this.xc({
        path: n,
        Fc: false
      });
      return r.$c(t3), r;
    }, t2.prototype.Oc = function(t3) {
      var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t3), r = this.xc({
        path: n,
        Fc: false
      });
      return r.Cc(), r;
    }, t2.prototype.Mc = function(t3) {
      return this.xc({
        path: void 0,
        Fc: true
      });
    }, t2.prototype.Lc = function(t3) {
      return Ua2(t3, this.settings.methodName, this.settings.Bc || false, this.path, this.settings.qc);
    }, /** Returns 'true' if 'fieldPath' was traversed when creating this context. */
    t2.prototype.contains = function(t3) {
      return void 0 !== this.fieldMask.find(function(e) {
        return t3.isPrefixOf(e);
      }) || void 0 !== this.fieldTransforms.find(function(e) {
        return t3.isPrefixOf(e.field);
      });
    }, t2.prototype.Cc = function() {
      if (this.path) for (var t3 = 0; t3 < this.path.length; t3++) this.$c(this.path.get(t3));
    }, t2.prototype.$c = function(t3) {
      if (0 === t3.length) throw this.Lc("Document fields must not be empty");
      if (wa(this.Nc) && va.test(t3)) throw this.Lc('Document fields cannot begin and end with "__"');
    }, t2;
  }()
);
var Ia2 = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this.databaseId = t3, this.ignoreUndefinedProperties = e, this.R = n || Co(t3);
    }
    return t2.prototype.Uc = function(t3, e, n, r) {
      return void 0 === r && (r = false), new ba2({
        Nc: t3,
        methodName: e,
        qc: n,
        path: $.emptyPath(),
        Fc: false,
        Bc: r
      }, this.databaseId, this.R, this.ignoreUndefinedProperties);
    }, t2;
  }()
);
function Ta(t2) {
  var e = t2._freezeSettings(), n = Co(t2._databaseId);
  return new Ia2(t2._databaseId, !!e.ignoreUndefinedProperties, n);
}
function _a(t2, e, n, r, i, o) {
  void 0 === o && (o = {});
  var s = t2.Uc(o.merge || o.mergeFields ? 2 : 0, e, n, i);
  Fa2("Data must be an object, but it was:", s, r);
  var u, a, c = Oa(r, s);
  if (o.merge) u = new X2(s.fieldMask), a = s.fieldTransforms;
  else if (o.mergeFields) {
    for (var h = [], f = 0, l2 = o.mergeFields; f < l2.length; f++) {
      var d = Ma2(e, l2[f], n);
      if (!s.contains(d)) throw new D2(N2.INVALID_ARGUMENT, "Field '" + d + "' is specified in your field mask but missing from your input data.");
      Ba(h, d) || h.push(d);
    }
    u = new X2(h), a = s.fieldTransforms.filter(function(t3) {
      return u.covers(t3.field);
    });
  } else u = null, a = s.fieldTransforms;
  return new ma2(new Et(c), u, a);
}
var Ea = (
  /** @class */
  function(e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return __extends(n, e), n.prototype._toFieldTransform = function(t2) {
      if (2 !== t2.Nc) throw 1 === t2.Nc ? t2.Lc(this._methodName + "() can only appear at the top level of your update data") : t2.Lc(this._methodName + "() cannot be used with set() unless you pass {merge:true}");
      return t2.fieldMask.push(t2.path), null;
    }, n.prototype.isEqual = function(t2) {
      return t2 instanceof n;
    }, n;
  }(pa2)
);
function Sa2(t2, e, n) {
  return new ba2({
    Nc: 3,
    qc: e.settings.qc,
    methodName: t2._methodName,
    Fc: n
  }, e.databaseId, e.R, e.ignoreUndefinedProperties);
}
var Na2 = (
  /** @class */
  function(e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return __extends(n, e), n.prototype._toFieldTransform = function(t2) {
      return new Se(t2.path, new me());
    }, n.prototype.isEqual = function(t2) {
      return t2 instanceof n;
    }, n;
  }(pa2)
);
var Da = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, t2) || this).Kc = n2, r;
    }
    return __extends(n, e), n.prototype._toFieldTransform = function(t2) {
      var e2 = Sa2(
        this,
        t2,
        /*array=*/
        true
      ), n2 = this.Kc.map(function(t3) {
        return La2(t3, e2);
      }), r = new ge(n2);
      return new Se(t2.path, r);
    }, n.prototype.isEqual = function(t2) {
      return this === t2;
    }, n;
  }(pa2)
);
var Aa2 = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, t2) || this).Kc = n2, r;
    }
    return __extends(n, e), n.prototype._toFieldTransform = function(t2) {
      var e2 = Sa2(
        this,
        t2,
        /*array=*/
        true
      ), n2 = this.Kc.map(function(t3) {
        return La2(t3, e2);
      }), r = new be(n2);
      return new Se(t2.path, r);
    }, n.prototype.isEqual = function(t2) {
      return this === t2;
    }, n;
  }(pa2)
);
var ka2 = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, t2) || this).Qc = n2, r;
    }
    return __extends(n, e), n.prototype._toFieldTransform = function(t2) {
      var e2 = new Te(t2.R, le(t2.R, this.Qc));
      return new Se(t2.path, e2);
    }, n.prototype.isEqual = function(t2) {
      return this === t2;
    }, n;
  }(pa2)
);
function Ca2(t2, e, n, r) {
  var i = t2.Uc(1, e, n);
  Fa2("Data must be an object, but it was:", i, r);
  var o = [], s = Et.empty();
  Q2(r, function(t3, r2) {
    var u2 = qa2(e, t3, n);
    r2 = getModularInstance(r2);
    var a = i.Oc(u2);
    if (r2 instanceof Ea)
      o.push(u2);
    else {
      var c = La2(r2, a);
      null != c && (o.push(u2), s.set(u2, c));
    }
  });
  var u = new X2(o);
  return new ga(s, u, i.fieldTransforms);
}
function xa2(t2, e, n, r, i, o) {
  var s = t2.Uc(1, e, n), u = [Ma2(e, r, n)], a = [i];
  if (o.length % 2 != 0) throw new D2(N2.INVALID_ARGUMENT, "Function " + e + "() needs to be called with an even number of arguments that alternate between field names and values.");
  for (var c = 0; c < o.length; c += 2) u.push(Ma2(e, o[c])), a.push(o[c + 1]);
  for (var h = [], f = Et.empty(), d = u.length - 1; d >= 0; --d) if (!Ba(h, u[d])) {
    var p2 = u[d], y2 = a[d];
    y2 = getModularInstance(y2);
    var v2 = s.Oc(p2);
    if (y2 instanceof Ea)
      h.push(p2);
    else {
      var m = La2(y2, v2);
      null != m && (h.push(p2), f.set(p2, m));
    }
  }
  var g = new X2(h);
  return new ga(f, g, s.fieldTransforms);
}
function Ra2(t2, e, n, r) {
  return void 0 === r && (r = false), La2(n, t2.Uc(r ? 4 : 3, e));
}
function La2(t2, e) {
  if (Pa(
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    t2 = getModularInstance(t2)
  )) return Fa2("Unsupported field value:", e, t2), Oa(t2, e);
  if (t2 instanceof pa2)
    return function(t3, e2) {
      if (!wa(e2.Nc)) throw e2.Lc(t3._methodName + "() can only be used with update() and set()");
      if (!e2.path) throw e2.Lc(t3._methodName + "() is not currently supported inside arrays");
      var n = t3._toFieldTransform(e2);
      n && e2.fieldTransforms.push(n);
    }(t2, e), null;
  if (void 0 === t2 && e.ignoreUndefinedProperties)
    return null;
  if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.fieldMask.push(e.path), t2 instanceof Array
  ) {
    if (e.settings.Fc && 4 !== e.Nc) throw e.Lc("Nested arrays are not supported");
    return function(t3, e2) {
      for (var n = [], r = 0, i = 0, o = t3; i < o.length; i++) {
        var s = La2(o[i], e2.Mc(r));
        null == s && // Just include nulls in the array for fields being replaced with a
        // sentinel.
        (s = {
          nullValue: "NULL_VALUE"
        }), n.push(s), r++;
      }
      return {
        arrayValue: {
          values: n
        }
      };
    }(t2, e);
  }
  return function(t3, e2) {
    if (null === (t3 = getModularInstance(t3))) return {
      nullValue: "NULL_VALUE"
    };
    if ("number" == typeof t3) return le(e2.R, t3);
    if ("boolean" == typeof t3) return {
      booleanValue: t3
    };
    if ("string" == typeof t3) return {
      stringValue: t3
    };
    if (t3 instanceof Date) {
      var n = j.fromDate(t3);
      return {
        timestampValue: In(e2.R, n)
      };
    }
    if (t3 instanceof j) {
      n = new j(t3.seconds, 1e3 * Math.floor(t3.nanoseconds / 1e3));
      return {
        timestampValue: In(e2.R, n)
      };
    }
    if (t3 instanceof ya2) return {
      geoPointValue: {
        latitude: t3.latitude,
        longitude: t3.longitude
      }
    };
    if (t3 instanceof da2) return {
      bytesValue: Tn(e2.R, t3._byteString)
    };
    if (t3 instanceof $u) {
      n = e2.databaseId;
      var r = t3.firestore._databaseId;
      if (!r.isEqual(n)) throw e2.Lc("Document reference is for database " + r.projectId + "/" + r.database + " but should be for database " + n.projectId + "/" + n.database);
      return {
        referenceValue: Sn(t3.firestore._databaseId || e2.databaseId, t3._key.path)
      };
    }
    throw e2.Lc("Unsupported field value: " + Qu(t3));
  }(t2, e);
}
function Oa(t2, e) {
  var n = {};
  return z2(t2) ? (
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.fieldMask.push(e.path)
  ) : Q2(t2, function(t3, r) {
    var i = La2(r, e.kc(t3));
    null != i && (n[t3] = i);
  }), {
    mapValue: {
      fields: n
    }
  };
}
function Pa(t2) {
  return !("object" != typeof t2 || null === t2 || t2 instanceof Array || t2 instanceof Date || t2 instanceof j || t2 instanceof ya2 || t2 instanceof da2 || t2 instanceof $u || t2 instanceof pa2);
}
function Fa2(t2, e, n) {
  if (!Pa(n) || !function(t3) {
    return "object" == typeof t3 && null !== t3 && (Object.getPrototypeOf(t3) === Object.prototype || null === Object.getPrototypeOf(t3));
  }(n)) {
    var r = Qu(n);
    throw "an object" === r ? e.Lc(t2 + " a custom object") : e.Lc(t2 + " " + r);
  }
}
function Ma2(t2, e, n) {
  if (
    // If required, replace the FieldPath Compat class with with the firestore-exp
    // FieldPath.
    (e = getModularInstance(e)) instanceof la2
  ) return e._internalPath;
  if ("string" == typeof e) return qa2(t2, e);
  throw Ua2(
    "Field path arguments must be of type string or FieldPath.",
    t2,
    /* hasConverter= */
    false,
    /* path= */
    void 0,
    n
  );
}
var Va2 = new RegExp("[~\\*/\\[\\]]");
function qa2(t2, n, r) {
  if (n.search(Va2) >= 0) throw Ua2(
    "Invalid field path (" + n + "). Paths must not contain '~', '*', '/', '[', or ']'",
    t2,
    /* hasConverter= */
    false,
    /* path= */
    void 0,
    r
  );
  try {
    return new (la2.bind.apply(la2, __spreadArray([void 0], n.split("."))))()._internalPath;
  } catch (e) {
    throw Ua2(
      "Invalid field path (" + n + "). Paths must not be empty, begin with '.', end with '.', or contain '..'",
      t2,
      /* hasConverter= */
      false,
      /* path= */
      void 0,
      r
    );
  }
}
function Ua2(t2, e, n, r, i) {
  var o = r && !r.isEmpty(), s = void 0 !== i, u = "Function " + e + "() called with invalid data";
  n && (u += " (via `toFirestore()`)");
  var a = "";
  return (o || s) && (a += " (found", o && (a += " in field " + r), s && (a += " in document " + i), a += ")"), new D2(N2.INVALID_ARGUMENT, (u += ". ") + t2 + a);
}
function Ba(t2, e) {
  return t2.some(function(t3) {
    return t3.isEqual(e);
  });
}
var ja2 = (
  /** @class */
  function() {
    function t2(t3, e, n, r, i) {
      this._firestore = t3, this._userDataWriter = e, this._key = n, this._document = r, this._converter = i;
    }
    return Object.defineProperty(t2.prototype, "id", {
      /** Property of the `DocumentSnapshot` that provides the document's ID. */
      get: function() {
        return this._key.path.lastSegment();
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "ref", {
      /**
       * The `DocumentReference` for the document included in the `DocumentSnapshot`.
       */
      get: function() {
        return new $u(this._firestore, this._converter, this._key);
      },
      enumerable: false,
      configurable: true
    }), /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */
    t2.prototype.exists = function() {
      return null !== this._document;
    }, /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */
    t2.prototype.data = function() {
      if (this._document) {
        if (this._converter) {
          var t3 = new Ka2(
            this._firestore,
            this._userDataWriter,
            this._key,
            this._document,
            /* converter= */
            null
          );
          return this._converter.fromFirestore(t3);
        }
        return this._userDataWriter.convertValue(this._document.data.value);
      }
    }, /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t2.prototype.get = function(t3) {
      if (this._document) {
        var e = this._document.data.field(Ga2("DocumentSnapshot.get", t3));
        if (null !== e) return this._userDataWriter.convertValue(e);
      }
    }, t2;
  }()
);
var Ka2 = (
  /** @class */
  function(e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return __extends(n, e), n.prototype.data = function() {
      return e.prototype.data.call(this);
    }, n;
  }(ja2)
);
function Ga2(t2, e) {
  return "string" == typeof e ? qa2(t2, e) : e instanceof la2 ? e._internalPath : e._delegate._internalPath;
}
var Qa = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.hasPendingWrites = t3, this.fromCache = e;
    }
    return t2.prototype.isEqual = function(t3) {
      return this.hasPendingWrites === t3.hasPendingWrites && this.fromCache === t3.fromCache;
    }, t2;
  }()
);
var za2 = (
  /** @class */
  function(e) {
    function n(t2, n2, r, i, o, s) {
      var u = this;
      return (u = e.call(this, t2, n2, r, i, s) || this)._firestore = t2, u._firestoreImpl = t2, u.metadata = o, u;
    }
    return __extends(n, e), n.prototype.exists = function() {
      return e.prototype.exists.call(this);
    }, /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * By default, `FieldValue.serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document or `undefined` if
     * the document doesn't exist.
     */
    n.prototype.data = function(t2) {
      if (void 0 === t2 && (t2 = {}), this._document) {
        if (this._converter) {
          var e2 = new Wa2(
            this._firestore,
            this._userDataWriter,
            this._key,
            this._document,
            this.metadata,
            /* converter= */
            null
          );
          return this._converter.fromFirestore(e2, t2);
        }
        return this._userDataWriter.convertValue(this._document.data.value, t2.serverTimestamps);
      }
    }, /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * By default, a `FieldValue.serverTimestamp()` that has not yet been set to
     * its final value will be returned as `null`. You can override this by
     * passing an options object.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @param options - An options object to configure how the field is retrieved
     * from the snapshot (for example the desired behavior for server timestamps
     * that have not yet been set to their final value).
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n.prototype.get = function(t2, e2) {
      if (void 0 === e2 && (e2 = {}), this._document) {
        var n2 = this._document.data.field(Ga2("DocumentSnapshot.get", t2));
        if (null !== n2) return this._userDataWriter.convertValue(n2, e2.serverTimestamps);
      }
    }, n;
  }(ja2)
);
var Wa2 = (
  /** @class */
  function(e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return __extends(n, e), n.prototype.data = function(t2) {
      return void 0 === t2 && (t2 = {}), e.prototype.data.call(this, t2);
    }, n;
  }(za2)
);
var Ha2 = (
  /** @class */
  function() {
    function t2(t3, e, n, r) {
      this._firestore = t3, this._userDataWriter = e, this._snapshot = r, this.metadata = new Qa(r.hasPendingWrites, r.fromCache), this.query = n;
    }
    return Object.defineProperty(t2.prototype, "docs", {
      /** An array of all the documents in the `QuerySnapshot`. */
      get: function() {
        var t3 = [];
        return this.forEach(function(e) {
          return t3.push(e);
        }), t3;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "size", {
      /** The number of documents in the `QuerySnapshot`. */
      get: function() {
        return this._snapshot.docs.size;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "empty", {
      /** True if there are no documents in the `QuerySnapshot`. */
      get: function() {
        return 0 === this.size;
      },
      enumerable: false,
      configurable: true
    }), /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */
    t2.prototype.forEach = function(t3, e) {
      var n = this;
      this._snapshot.docs.forEach(function(r) {
        t3.call(e, new Wa2(n._firestore, n._userDataWriter, r.key, r, new Qa(n._snapshot.mutatedKeys.has(r.key), n._snapshot.fromCache), n.query.converter));
      });
    }, /**
     * Returns an array of the documents changes since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as 'added'
     * changes.
     *
     * @param options - `SnapshotListenOptions` that control whether metadata-only
     * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
     * snapshot events.
     */
    t2.prototype.docChanges = function(t3) {
      void 0 === t3 && (t3 = {});
      var e = !!t3.includeMetadataChanges;
      if (e && this._snapshot.excludesMetadataChanges) throw new D2(N2.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
      return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = /** Calculates the array of `DocumentChange`s for a given `ViewSnapshot`. */
      function(t4, e2) {
        if (t4._snapshot.oldDocs.isEmpty()) {
          var n = 0;
          return t4._snapshot.docChanges.map(function(e3) {
            return {
              type: "added",
              doc: new Wa2(t4._firestore, t4._userDataWriter, e3.doc.key, e3.doc, new Qa(t4._snapshot.mutatedKeys.has(e3.doc.key), t4._snapshot.fromCache), t4.query.converter),
              oldIndex: -1,
              newIndex: n++
            };
          });
        }
        var r = t4._snapshot.oldDocs;
        return t4._snapshot.docChanges.filter(function(t5) {
          return e2 || 3 !== t5.type;
        }).map(function(e3) {
          var n2 = new Wa2(t4._firestore, t4._userDataWriter, e3.doc.key, e3.doc, new Qa(t4._snapshot.mutatedKeys.has(e3.doc.key), t4._snapshot.fromCache), t4.query.converter), i = -1, o = -1;
          return 0 !== e3.type && (i = r.indexOf(e3.doc.key), r = r.delete(e3.doc.key)), 1 !== e3.type && (o = (r = r.add(e3.doc)).indexOf(e3.doc.key)), {
            type: Ya2(e3.type),
            doc: n2,
            oldIndex: i,
            newIndex: o
          };
        });
      }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
    }, t2;
  }()
);
function Ya2(t2) {
  switch (t2) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return O2();
  }
}
function $a2(t2, e) {
  return t2 instanceof za2 && e instanceof za2 ? t2._firestore === e._firestore && t2._key.isEqual(e._key) && (null === t2._document ? null === e._document : t2._document.isEqual(e._document)) && t2._converter === e._converter : t2 instanceof Ha2 && e instanceof Ha2 && t2._firestore === e._firestore && na2(t2.query, e.query) && t2.metadata.isEqual(e.metadata) && t2._snapshot.isEqual(e._snapshot);
}
function Xa2(t2) {
  if (Xt(t2) && 0 === t2.explicitOrderBy.length) throw new D2(N2.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}
var Ja2 = function() {
};
function Za2(t2) {
  for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
  for (var r = 0, i = e; r < i.length; r++) {
    var o = i[r];
    t2 = o._apply(t2);
  }
  return t2;
}
var tc2 = (
  /** @class */
  function(e) {
    function n(t2, n2, r) {
      var i = this;
      return (i = e.call(this) || this).jc = t2, i.Wc = n2, i.Gc = r, i.type = "where", i;
    }
    return __extends(n, e), n.prototype._apply = function(t2) {
      var e2 = Ta(t2.firestore), n2 = function(t3, e3, n3, r, i, o, s) {
        var u;
        if (i.isKeyField()) {
          if ("array-contains" === o || "array-contains-any" === o) throw new D2(N2.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + o + "' queries on FieldPath.documentId().");
          if ("in" === o || "not-in" === o) {
            uc2(s, o);
            for (var a = [], c = 0, h = s; c < h.length; c++) {
              var f = h[c];
              a.push(sc2(r, t3, f));
            }
            u = {
              arrayValue: {
                values: a
              }
            };
          } else u = sc2(r, t3, s);
        } else "in" !== o && "not-in" !== o && "array-contains-any" !== o || uc2(s, o), u = Ra2(
          n3,
          "where",
          s,
          /* allowArrays= */
          "in" === o || "not-in" === o
        );
        var l2 = Rt.create(i, o, u);
        return function(t4, e4) {
          if (e4.g()) {
            var n4 = Zt(t4);
            if (null !== n4 && !n4.isEqual(e4.field)) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '" + n4.toString() + "' and '" + e4.field.toString() + "'");
            var r2 = Jt(t4);
            null !== r2 && ac2(t4, e4.field, r2);
          }
          var i2 = function(t5, e5) {
            for (var n5 = 0, r3 = t5.filters; n5 < r3.length; n5++) {
              var i3 = r3[n5];
              if (e5.indexOf(i3.op) >= 0) return i3.op;
            }
            return null;
          }(
            t4,
            /**
            * Given an operator, returns the set of operators that cannot be used with it.
            *
            * Operators in a query must adhere to the following set of rules:
            * 1. Only one array operator is allowed.
            * 2. Only one disjunctive operator is allowed.
            * 3. `NOT_EQUAL` cannot be used with another `NOT_EQUAL` operator.
            * 4. `NOT_IN` cannot be used with array, disjunctive, or `NOT_EQUAL` operators.
            *
            * Array operators: `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ANY`
            * Disjunctive operators: `IN`, `ARRAY_CONTAINS_ANY`, `NOT_IN`
            */
            function(t5) {
              switch (t5) {
                case "!=":
                  return [
                    "!=",
                    "not-in"
                    /* NOT_IN */
                  ];
                case "array-contains":
                  return [
                    "array-contains",
                    "array-contains-any",
                    "not-in"
                    /* NOT_IN */
                  ];
                case "in":
                  return [
                    "array-contains-any",
                    "in",
                    "not-in"
                    /* NOT_IN */
                  ];
                case "array-contains-any":
                  return [
                    "array-contains",
                    "array-contains-any",
                    "in",
                    "not-in"
                    /* NOT_IN */
                  ];
                case "not-in":
                  return [
                    "array-contains",
                    "array-contains-any",
                    "in",
                    "not-in",
                    "!="
                    /* NOT_EQUAL */
                  ];
                default:
                  return [];
              }
            }(e4.op)
          );
          if (null !== i2)
            throw i2 === e4.op ? new D2(N2.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '" + e4.op.toString() + "' filter.") : new D2(N2.INVALID_ARGUMENT, "Invalid query. You cannot use '" + e4.op.toString() + "' filters with '" + i2.toString() + "' filters.");
        }(t3, l2), l2;
      }(t2._query, 0, e2, t2.firestore._databaseId, this.jc, this.Wc, this.Gc);
      return new Xu(t2.firestore, t2.converter, function(t3, e3) {
        var n3 = t3.filters.concat([e3]);
        return new Wt(t3.path, t3.collectionGroup, t3.explicitOrderBy.slice(), n3, t3.limit, t3.limitType, t3.startAt, t3.endAt);
      }(t2._query, n2));
    }, n;
  }(Ja2)
);
var ec2 = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this) || this).jc = t2, r.zc = n2, r.type = "orderBy", r;
    }
    return __extends(n, e), n.prototype._apply = function(t2) {
      var e2 = function(t3, e3, n2) {
        if (null !== t3.startAt) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
        if (null !== t3.endAt) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
        var r = new Kt(e3, n2);
        return function(t4, e4) {
          if (null === Jt(t4)) {
            var n3 = Zt(t4);
            null !== n3 && ac2(t4, n3, e4.field);
          }
        }(t3, r), r;
      }(t2._query, this.jc, this.zc);
      return new Xu(t2.firestore, t2.converter, function(t3, e3) {
        var n2 = t3.explicitOrderBy.concat([e3]);
        return new Wt(t3.path, t3.collectionGroup, n2, t3.filters.slice(), t3.limit, t3.limitType, t3.startAt, t3.endAt);
      }(t2._query, e2));
    }, n;
  }(Ja2)
);
var nc2 = (
  /** @class */
  function(e) {
    function n(t2, n2, r) {
      var i = this;
      return (i = e.call(this) || this).type = t2, i.Hc = n2, i.Jc = r, i;
    }
    return __extends(n, e), n.prototype._apply = function(t2) {
      return new Xu(t2.firestore, t2.converter, re(t2._query, this.Hc, this.Jc));
    }, n;
  }(Ja2)
);
var rc2 = (
  /** @class */
  function(e) {
    function n(t2, n2, r) {
      var i = this;
      return (i = e.call(this) || this).type = t2, i.Yc = n2, i.Xc = r, i;
    }
    return __extends(n, e), n.prototype._apply = function(t2) {
      var e2 = oc2(t2, this.type, this.Yc, this.Xc);
      return new Xu(t2.firestore, t2.converter, function(t3, e3) {
        return new Wt(t3.path, t3.collectionGroup, t3.explicitOrderBy.slice(), t3.filters.slice(), t3.limit, t3.limitType, e3, t3.endAt);
      }(t2._query, e2));
    }, n;
  }(Ja2)
);
var ic2 = (
  /** @class */
  function(e) {
    function n(t2, n2, r) {
      var i = this;
      return (i = e.call(this) || this).type = t2, i.Yc = n2, i.Xc = r, i;
    }
    return __extends(n, e), n.prototype._apply = function(t2) {
      var e2 = oc2(t2, this.type, this.Yc, this.Xc);
      return new Xu(t2.firestore, t2.converter, function(t3, e3) {
        return new Wt(t3.path, t3.collectionGroup, t3.explicitOrderBy.slice(), t3.filters.slice(), t3.limit, t3.limitType, t3.startAt, e3);
      }(t2._query, e2));
    }, n;
  }(Ja2)
);
function oc2(t2, e, n, r) {
  if (n[0] = getModularInstance(n[0]), n[0] instanceof ja2) return function(t3, e2, n2, r2, i2) {
    if (!r2) throw new D2(N2.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + n2 + "().");
    for (var o = [], s = 0, u = ee(t3); s < u.length; s++) {
      var a = u[s];
      if (a.field.isKeyField()) o.push(mt(e2, r2.key));
      else {
        var c = r2.data.field(a.field);
        if (rt(c)) throw new D2(N2.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + a.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
        if (null === c) {
          var h = a.field.canonicalString();
          throw new D2(N2.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + h + "' (used as the orderBy) does not exist.");
        }
        o.push(c);
      }
    }
    return new Bt(o, i2);
  }(t2._query, t2.firestore._databaseId, e, n[0]._document, r);
  var i = Ta(t2.firestore);
  return function(t3, e2, n2, r2, i2, o) {
    var s = t3.explicitOrderBy;
    if (i2.length > s.length) throw new D2(N2.INVALID_ARGUMENT, "Too many arguments provided to " + r2 + "(). The number of arguments must be less than or equal to the number of orderBy() clauses");
    for (var u = [], a = 0; a < i2.length; a++) {
      var c = i2[a];
      if (s[a].field.isKeyField()) {
        if ("string" != typeof c) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + r2 + "(), but got a " + typeof c);
        if (!te(t3) && -1 !== c.indexOf("/")) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to " + r2 + "() must be a plain document ID, but '" + c + "' contains a slash.");
        var h = t3.path.child(H2.fromString(c));
        if (!ct.isDocumentKey(h)) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to " + r2 + "() must result in a valid document path, but '" + h + "' is not because it contains an odd number of segments.");
        var f = new ct(h);
        u.push(mt(e2, f));
      } else {
        var l2 = Ra2(n2, r2, c);
        u.push(l2);
      }
    }
    return new Bt(u, o);
  }(t2._query, t2.firestore._databaseId, i, e, n, r);
}
function sc2(t2, e, n) {
  if ("string" == typeof (n = getModularInstance(n))) {
    if ("" === n) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
    if (!te(e) && -1 !== n.indexOf("/")) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '" + n + "' contains a '/' character.");
    var r = e.path.child(H2.fromString(n));
    if (!ct.isDocumentKey(r)) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" + r + "' is not because it has an odd number of segments (" + r.length + ").");
    return mt(t2, new ct(r));
  }
  if (n instanceof $u) return mt(t2, n._key);
  throw new D2(N2.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + Qu(n) + ".");
}
function uc2(t2, e) {
  if (!Array.isArray(t2) || 0 === t2.length) throw new D2(N2.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '" + e.toString() + "' filters.");
  if (t2.length > 10) throw new D2(N2.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters support a maximum of 10 elements in the value array.");
}
function ac2(t2, e, n) {
  if (!n.isEqual(e)) throw new D2(N2.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '" + e.toString() + "' and so you must also use '" + e.toString() + "' as your first argument to orderBy(), but your first orderBy() is on field '" + n.toString() + "' instead.");
}
var cc2 = (
  /** @class */
  function() {
    function t2() {
    }
    return t2.prototype.convertValue = function(t3, e) {
      switch (void 0 === e && (e = "none"), ht(t3)) {
        case 0:
          return null;
        case 1:
          return t3.booleanValue;
        case 2:
          return et(t3.integerValue || t3.doubleValue);
        case 3:
          return this.convertTimestamp(t3.timestampValue);
        case 4:
          return this.convertServerTimestamp(t3, e);
        case 5:
          return t3.stringValue;
        case 6:
          return this.convertBytes(nt(t3.bytesValue));
        case 7:
          return this.convertReference(t3.referenceValue);
        case 8:
          return this.convertGeoPoint(t3.geoPointValue);
        case 9:
          return this.convertArray(t3.arrayValue, e);
        case 10:
          return this.convertObject(t3.mapValue, e);
        default:
          throw O2();
      }
    }, t2.prototype.convertObject = function(t3, e) {
      var n = this, r = {};
      return Q2(t3.fields, function(t4, i) {
        r[t4] = n.convertValue(i, e);
      }), r;
    }, t2.prototype.convertGeoPoint = function(t3) {
      return new ya2(et(t3.latitude), et(t3.longitude));
    }, t2.prototype.convertArray = function(t3, e) {
      var n = this;
      return (t3.values || []).map(function(t4) {
        return n.convertValue(t4, e);
      });
    }, t2.prototype.convertServerTimestamp = function(t3, e) {
      switch (e) {
        case "previous":
          var n = it(t3);
          return null == n ? null : this.convertValue(n, e);
        case "estimate":
          return this.convertTimestamp(ot(t3));
        default:
          return null;
      }
    }, t2.prototype.convertTimestamp = function(t3) {
      var e = tt(t3);
      return new j(e.seconds, e.nanos);
    }, t2.prototype.convertDocumentKey = function(t3, e) {
      var n = H2.fromString(t3);
      P2($n(n));
      var r = new Ru(n.get(1), n.get(3)), i = new ct(n.popFirst(5));
      return r.isEqual(e) || // TODO(b/64130202): Somehow support foreign references.
      x2("Document " + i + " contains a document reference within a different database (" + r.projectId + "/" + r.database + ") which is not supported. It will be treated as a reference in the current database (" + e.projectId + "/" + e.database + ") instead."), i;
    }, t2;
  }()
);
function hc2(t2, e, n) {
  return t2 ? n && (n.merge || n.mergeFields) ? t2.toFirestore(e, n) : t2.toFirestore(e) : e;
}
var fc2 = (
  /** @class */
  function(e) {
    function n(t2) {
      var n2 = this;
      return (n2 = e.call(this) || this).firestore = t2, n2;
    }
    return __extends(n, e), n.prototype.convertBytes = function(t2) {
      return new da2(t2);
    }, n.prototype.convertReference = function(t2) {
      var e2 = this.convertDocumentKey(t2, this.firestore._databaseId);
      return new $u(
        this.firestore,
        /* converter= */
        null,
        e2
      );
    }, n;
  }(cc2)
);
var lc2 = (
  /** @class */
  function() {
    function t2(t3, e) {
      this._firestore = t3, this._commitHandler = e, this._mutations = [], this._committed = false, this._dataReader = Ta(t3);
    }
    return t2.prototype.set = function(t3, e, n) {
      this._verifyNotCommitted();
      var r = dc2(t3, this._firestore), i = hc2(r.converter, e, n), o = _a(this._dataReader, "WriteBatch.set", r._key, i, null !== r.converter, n);
      return this._mutations.push(o.toMutation(r._key, De.none())), this;
    }, t2.prototype.update = function(t3, e, n) {
      for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
      this._verifyNotCommitted();
      var o, s = dc2(t3, this._firestore);
      return o = "string" == typeof (e = getModularInstance(e)) || e instanceof la2 ? xa2(this._dataReader, "WriteBatch.update", s._key, e, n, r) : Ca2(this._dataReader, "WriteBatch.update", s._key, e), this._mutations.push(o.toMutation(s._key, De.exists(true))), this;
    }, /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    t2.prototype.delete = function(t3) {
      this._verifyNotCommitted();
      var e = dc2(t3, this._firestore);
      return this._mutations = this._mutations.concat(new je(e._key, De.none())), this;
    }, /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `Promise` resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */
    t2.prototype.commit = function() {
      return this._verifyNotCommitted(), this._committed = true, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
    }, t2.prototype._verifyNotCommitted = function() {
      if (this._committed) throw new D2(N2.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }, t2;
  }()
);
function dc2(t2, e) {
  if ((t2 = getModularInstance(t2)).firestore !== e) throw new D2(N2.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
  return t2;
}
var pc2 = (
  /** @class */
  function(e) {
    function n(t2) {
      var n2 = this;
      return (n2 = e.call(this) || this).firestore = t2, n2;
    }
    return __extends(n, e), n.prototype.convertBytes = function(t2) {
      return new da2(t2);
    }, n.prototype.convertReference = function(t2) {
      var e2 = this.convertDocumentKey(t2, this.firestore._databaseId);
      return new $u(
        this.firestore,
        /* converter= */
        null,
        e2
      );
    }, n;
  }(cc2)
);
function yc2(t2, e, n) {
  t2 = zu(t2, $u);
  var r = zu(t2.firestore, ua2), i = hc2(t2.converter, e, n);
  return gc2(r, [_a(Ta(r), "setDoc", t2._key, i, null !== t2.converter, n).toMutation(t2._key, De.none())]);
}
function vc2(t2, e, n) {
  for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
  t2 = zu(t2, $u);
  var o = zu(t2.firestore, ua2), s = Ta(o);
  return gc2(o, [("string" == typeof // For Compat types, we have to "extract" the underlying types before
  // performing validation.
  (e = getModularInstance(e)) || e instanceof la2 ? xa2(s, "updateDoc", t2._key, e, n, r) : Ca2(s, "updateDoc", t2._key, e)).toMutation(t2._key, De.exists(true))]);
}
function mc2(t2) {
  for (var e, i, o, s = [], u = 1; u < arguments.length; u++) s[u - 1] = arguments[u];
  t2 = getModularInstance(t2);
  var a = {
    includeMetadataChanges: false
  }, c = 0;
  "object" != typeof s[c] || ia2(s[c]) || (a = s[c], c++);
  var h, f, d, p2 = {
    includeMetadataChanges: a.includeMetadataChanges
  };
  if (ia2(s[c])) {
    var y2 = s[c];
    s[c] = null === (e = y2.next) || void 0 === e ? void 0 : e.bind(y2), s[c + 1] = null === (i = y2.error) || void 0 === i ? void 0 : i.bind(y2), s[c + 2] = null === (o = y2.complete) || void 0 === o ? void 0 : o.bind(y2);
  }
  if (t2 instanceof $u) f = zu(t2.firestore, ua2), d = Yt(t2._key.path), h = {
    next: function(e2) {
      s[c] && s[c](wc2(f, t2, e2));
    },
    error: s[c + 1],
    complete: s[c + 2]
  };
  else {
    var v2 = zu(t2, Xu);
    f = zu(v2.firestore, ua2), d = v2._query;
    var m = new pc2(f);
    h = {
      next: function(t3) {
        s[c] && s[c](new Ha2(f, m, v2, t3));
      },
      error: s[c + 1],
      complete: s[c + 2]
    }, Xa2(t2._query);
  }
  return function(t3, e2, i2, o2) {
    var s2 = this, u2 = new yu(o2), a2 = new Is(e2, u2, i2);
    return t3.asyncQueue.enqueueAndForget(function() {
      return __awaiter(s2, void 0, void 0, function() {
        var e3;
        return __generator(this, function(n) {
          switch (n.label) {
            case 0:
              return e3 = vs, [4, Au(t3)];
            case 1:
              return [2, e3.apply(void 0, [n.sent(), a2])];
          }
        });
      });
    }), function() {
      u2.Wo(), t3.asyncQueue.enqueueAndForget(function() {
        return __awaiter(s2, void 0, void 0, function() {
          var e3;
          return __generator(this, function(n) {
            switch (n.label) {
              case 0:
                return e3 = ms, [4, Au(t3)];
              case 1:
                return [2, e3.apply(void 0, [n.sent(), a2])];
            }
          });
        });
      });
    };
  }(aa2(f), d, p2, h);
}
function gc2(t2, e) {
  return function(t3, e2) {
    var i = this, o = new br();
    return t3.asyncQueue.enqueueAndForget(function() {
      return __awaiter(i, void 0, void 0, function() {
        var n;
        return __generator(this, function(r) {
          switch (r.label) {
            case 0:
              return n = Ps, [4, Du(t3)];
            case 1:
              return [2, n.apply(void 0, [r.sent(), e2, o])];
          }
        });
      });
    }), o.promise;
  }(aa2(t2), e);
}
function wc2(t2, e, n) {
  var r = n.docs.get(e._key), i = new pc2(t2);
  return new za2(t2, i, e._key, r, new Qa(n.hasPendingWrites, n.fromCache), e.converter);
}
var bc2 = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, t2, n2) || this)._firestore = t2, r;
    }
    return __extends(n, e), n.prototype.get = function(t2) {
      var n2 = this, r = dc2(t2, this._firestore), i = new pc2(this._firestore);
      return e.prototype.get.call(this, t2).then(function(t3) {
        return new za2(n2._firestore, i, r._key, t3._document, new Qa(
          /* hasPendingWrites= */
          false,
          /* fromCache= */
          false
        ), r.converter);
      });
    }, n;
  }(
    /** @class */
    function() {
      function t2(t3, e) {
        this._firestore = t3, this._transaction = e, this._dataReader = Ta(t3);
      }
      return t2.prototype.get = function(t3) {
        var e = this, n = dc2(t3, this._firestore), r = new fc2(this._firestore);
        return this._transaction.lookup([n._key]).then(function(t4) {
          if (!t4 || 1 !== t4.length) return O2();
          var i = t4[0];
          if (i.isFoundDocument()) return new ja2(e._firestore, r, i.key, i, n.converter);
          if (i.isNoDocument()) return new ja2(e._firestore, r, n._key, null, n.converter);
          throw O2();
        });
      }, t2.prototype.set = function(t3, e, n) {
        var r = dc2(t3, this._firestore), i = hc2(r.converter, e, n), o = _a(this._dataReader, "Transaction.set", r._key, i, null !== r.converter, n);
        return this._transaction.set(r._key, o), this;
      }, t2.prototype.update = function(t3, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        var o, s = dc2(t3, this._firestore);
        return o = "string" == typeof (e = getModularInstance(e)) || e instanceof la2 ? xa2(this._dataReader, "Transaction.update", s._key, e, n, r) : Ca2(this._dataReader, "Transaction.update", s._key, e), this._transaction.update(s._key, o), this;
      }, /**
       * Deletes the document referred to by the provided {@link DocumentReference}.
       *
       * @param documentRef - A reference to the document to be deleted.
       * @returns This `Transaction` instance. Used for chaining method calls.
       */
      t2.prototype.delete = function(t3) {
        var e = dc2(t3, this._firestore);
        return this._transaction.delete(e._key), this;
      }, t2;
    }()
  )
);
function Ic2() {
  if ("undefined" == typeof Uint8Array) throw new D2(N2.UNIMPLEMENTED, "Uint8Arrays are not available in this environment.");
}
function Tc2() {
  if ("undefined" == typeof atob) throw new D2(N2.UNIMPLEMENTED, "Blobs are unavailable in Firestore in this environment.");
}
var _c = (
  /** @class */
  function() {
    function t2(t3) {
      this._delegate = t3;
    }
    return t2.fromBase64String = function(e) {
      return Tc2(), new t2(da2.fromBase64String(e));
    }, t2.fromUint8Array = function(e) {
      return Ic2(), new t2(da2.fromUint8Array(e));
    }, t2.prototype.toBase64 = function() {
      return Tc2(), this._delegate.toBase64();
    }, t2.prototype.toUint8Array = function() {
      return Ic2(), this._delegate.toUint8Array();
    }, t2.prototype.isEqual = function(t3) {
      return this._delegate.isEqual(t3._delegate);
    }, t2.prototype.toString = function() {
      return "Blob(base64: " + this.toBase64() + ")";
    }, t2;
  }()
);
var Ec2 = (
  /** @class */
  function() {
    function t2() {
    }
    return t2.prototype.enableIndexedDbPersistence = function(t3, e) {
      return function(t4, e2) {
        fa2(t4 = zu(t4, ua2));
        var n = aa2(t4), r = t4._freezeSettings(), i = new du();
        return ha2(n, i, new fu(i, r.cacheSizeBytes, null == e2 ? void 0 : e2.forceOwnership));
      }(t3._delegate, {
        forceOwnership: e
      });
    }, t2.prototype.enableMultiTabIndexedDbPersistence = function(t3) {
      return function(t4) {
        fa2(t4 = zu(t4, ua2));
        var e = aa2(t4), n = t4._freezeSettings(), r = new du();
        return ha2(e, r, new lu(r, n.cacheSizeBytes));
      }(t3._delegate);
    }, t2.prototype.clearIndexedDbPersistence = function(t3) {
      return function(t4) {
        var e = this;
        if (t4._initialized && !t4._terminated) throw new D2(N2.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
        var i = new br();
        return t4._queue.enqueueAndForgetEvenWhileRestricted(function() {
          return __awaiter(e, void 0, void 0, function() {
            var e2;
            return __generator(this, function(o) {
              switch (o.label) {
                case 0:
                  return o.trys.push([0, 2, , 3]), [4, function(t5) {
                    return __awaiter(this, void 0, void 0, function() {
                      var e3;
                      return __generator(this, function(n) {
                        switch (n.label) {
                          case 0:
                            return _r.yt() ? (e3 = t5 + "main", [4, _r.delete(e3)]) : [2, Promise.resolve()];
                          case 1:
                            return n.sent(), [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  }(Oi(t4._databaseId, t4._persistenceKey))];
                case 1:
                  return o.sent(), i.resolve(), [3, 3];
                case 2:
                  return e2 = o.sent(), i.reject(e2), [3, 3];
                case 3:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }), i.promise;
      }(t3._delegate);
    }, t2;
  }()
);
var Sc2 = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      var r = this;
      this._delegate = e, this.Zc = n, this.INTERNAL = {
        delete: function() {
          return r.terminate();
        }
      }, t3 instanceof Ru || (this.tu = t3);
    }
    return Object.defineProperty(t2.prototype, "_databaseId", {
      get: function() {
        return this._delegate._databaseId;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.settings = function(t3) {
      var e = this._delegate._getSettings();
      t3.merge || e.host === t3.host || R2("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."), t3.merge && // Remove the property from the settings once the merge is completed
      delete (t3 = Object.assign(Object.assign({}, e), t3)).merge, this._delegate._setSettings(t3);
    }, t2.prototype.useEmulator = function(t3, e, n) {
      void 0 === n && (n = {}), function(t4, e2, n2, r) {
        var i;
        void 0 === r && (r = {});
        var o = (t4 = zu(t4, Yu))._getSettings();
        if ("firestore.googleapis.com" !== o.host && o.host !== e2 && R2("Host has been set in both settings() and useEmulator(), emulator host will be used"), t4._setSettings(Object.assign(Object.assign({}, o), {
          host: e2 + ":" + n2,
          ssl: false
        })), r.mockUserToken) {
          var s, u;
          if ("string" == typeof r.mockUserToken) s = r.mockUserToken, u = fo.MOCK_USER;
          else {
            s = createMockUserToken(r.mockUserToken, null === (i = t4._app) || void 0 === i ? void 0 : i.options.projectId);
            var a = r.mockUserToken.sub || r.mockUserToken.user_id;
            if (!a) throw new D2(N2.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
            u = new fo(a);
          }
          t4._credentials = new Fu(new Ou(s, u));
        }
      }(this._delegate, t3, e, n);
    }, t2.prototype.enableNetwork = function() {
      return function(t3) {
        var e = this;
        return t3.asyncQueue.enqueue(function() {
          return __awaiter(e, void 0, void 0, function() {
            var e2, n;
            return __generator(this, function(r) {
              switch (r.label) {
                case 0:
                  return [4, Eu(t3)];
                case 1:
                  return e2 = r.sent(), [4, Nu(t3)];
                case 2:
                  return n = r.sent(), [2, (e2.setNetworkEnabled(true), function(t4) {
                    var e3 = F2(t4);
                    return e3.Or.delete(
                      0
                      /* UserDisabled */
                    ), Vo(e3);
                  }(n))];
              }
            });
          });
        });
      }(aa2(zu(this._delegate, ua2)));
    }, t2.prototype.disableNetwork = function() {
      return function(t3) {
        var e = this;
        return t3.asyncQueue.enqueue(function() {
          return __awaiter(e, void 0, void 0, function() {
            var e2, i;
            return __generator(this, function(o) {
              switch (o.label) {
                case 0:
                  return [4, Eu(t3)];
                case 1:
                  return e2 = o.sent(), [4, Nu(t3)];
                case 2:
                  return i = o.sent(), [2, (e2.setNetworkEnabled(false), function(t4) {
                    return __awaiter(this, void 0, void 0, function() {
                      var e3;
                      return __generator(this, function(n) {
                        switch (n.label) {
                          case 0:
                            return (e3 = F2(t4)).Or.add(
                              0
                              /* UserDisabled */
                            ), [4, qo(e3)];
                          case 1:
                            return n.sent(), // Set the OnlineState to Offline so get()s return from cache, etc.
                            e3.Br.set(
                              "Offline"
                              /* Offline */
                            ), [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  }(i))];
              }
            });
          });
        });
      }(aa2(zu(this._delegate, ua2)));
    }, t2.prototype.enablePersistence = function(t3) {
      var e = false, n = false;
      return t3 && ju("synchronizeTabs", e = !!t3.synchronizeTabs, "experimentalForceOwningTab", n = !!t3.experimentalForceOwningTab), e ? this.Zc.enableMultiTabIndexedDbPersistence(this) : this.Zc.enableIndexedDbPersistence(this, n);
    }, t2.prototype.clearPersistence = function() {
      return this.Zc.clearIndexedDbPersistence(this);
    }, t2.prototype.terminate = function() {
      return this.tu && (this.tu._removeServiceInstance("firestore"), this.tu._removeServiceInstance("firestore-exp")), this._delegate._delete();
    }, t2.prototype.waitForPendingWrites = function() {
      return function(t3) {
        var e = this, i = new br();
        return t3.asyncQueue.enqueueAndForget(function() {
          return __awaiter(e, void 0, void 0, function() {
            var e2;
            return __generator(this, function(n) {
              switch (n.label) {
                case 0:
                  return e2 = Bs, [4, Du(t3)];
                case 1:
                  return [2, e2.apply(void 0, [n.sent(), i])];
              }
            });
          });
        }), i.promise;
      }(aa2(zu(this._delegate, ua2)));
    }, t2.prototype.onSnapshotsInSync = function(t3) {
      return function(t4, e) {
        return function(t5, e2) {
          var i = this, o = new yu(e2);
          return t5.asyncQueue.enqueueAndForget(function() {
            return __awaiter(i, void 0, void 0, function() {
              var e3;
              return __generator(this, function(n) {
                switch (n.label) {
                  case 0:
                    return e3 = function(t6, e4) {
                      F2(t6).Gr.add(e4), // Immediately fire an initial event, indicating all existing listeners
                      // are in-sync.
                      e4.next();
                    }, [4, Au(t5)];
                  case 1:
                    return [2, e3.apply(void 0, [n.sent(), o])];
                }
              });
            });
          }), function() {
            o.Wo(), t5.asyncQueue.enqueueAndForget(function() {
              return __awaiter(i, void 0, void 0, function() {
                var e3;
                return __generator(this, function(n) {
                  switch (n.label) {
                    case 0:
                      return e3 = function(t6, e4) {
                        F2(t6).Gr.delete(e4);
                      }, [4, Au(t5)];
                    case 1:
                      return [2, e3.apply(void 0, [n.sent(), o])];
                  }
                });
              });
            });
          };
        }(aa2(t4 = zu(t4, ua2)), ia2(e) ? e : {
          next: e
        });
      }(this._delegate, t3);
    }, Object.defineProperty(t2.prototype, "app", {
      get: function() {
        if (!this.tu) throw new D2(N2.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
        return this.tu;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.collection = function(t3) {
      try {
        return new Uc2(this, Zu(this._delegate, t3));
      } catch (t4) {
        throw Rc2(t4, "collection()", "Firestore.collection()");
      }
    }, t2.prototype.doc = function(t3) {
      try {
        return new xc2(this, ta2(this._delegate, t3));
      } catch (t4) {
        throw Rc2(t4, "doc()", "Firestore.doc()");
      }
    }, t2.prototype.collectionGroup = function(t3) {
      try {
        return new Mc2(this, function(t4, e) {
          if (t4 = zu(t4, Yu), Uu("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new D2(N2.INVALID_ARGUMENT, "Invalid collection ID '" + e + "' passed to function collectionGroup(). Collection IDs must not contain '/'.");
          return new Xu(
            t4,
            /* converter= */
            null,
            /**
            * Creates a new Query for a collection group query that matches all documents
            * within the provided collection group.
            */
            function(t5) {
              return new Wt(H2.emptyPath(), t5);
            }(e)
          );
        }(this._delegate, t3));
      } catch (t4) {
        throw Rc2(t4, "collectionGroup()", "Firestore.collectionGroup()");
      }
    }, t2.prototype.runTransaction = function(t3) {
      var e = this;
      return function(t4, e2) {
        return function(t5, e3) {
          var i = this, o = new br();
          return t5.asyncQueue.enqueueAndForget(function() {
            return __awaiter(i, void 0, void 0, function() {
              var n;
              return __generator(this, function(r) {
                switch (r.label) {
                  case 0:
                    return [4, function(t6) {
                      return _u(t6).then(function(t7) {
                        return t7.datastore;
                      });
                    }(t5)];
                  case 1:
                    return n = r.sent(), new gu(t5.asyncQueue, n, e3, o).run(), [
                      2
                      /*return*/
                    ];
                }
              });
            });
          }), o.promise;
        }(aa2(t4), function(n) {
          return e2(new bc2(t4, n));
        });
      }(this._delegate, function(n) {
        return t3(new Ac2(e, n));
      });
    }, t2.prototype.batch = function() {
      var t3 = this;
      return aa2(this._delegate), new kc2(new lc2(this._delegate, function(e) {
        return gc2(t3._delegate, e);
      }));
    }, t2.prototype.loadBundle = function(t3) {
      throw new D2(N2.FAILED_PRECONDITION, '"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?');
    }, t2.prototype.namedQuery = function(t3) {
      throw new D2(N2.FAILED_PRECONDITION, '"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?');
    }, t2;
  }()
);
var Nc2 = (
  /** @class */
  function(e) {
    function n(t2) {
      var n2 = this;
      return (n2 = e.call(this) || this).firestore = t2, n2;
    }
    return __extends(n, e), n.prototype.convertBytes = function(t2) {
      return new _c(new da2(t2));
    }, n.prototype.convertReference = function(t2) {
      var e2 = this.convertDocumentKey(t2, this.firestore._databaseId);
      return xc2.eu(
        e2,
        this.firestore,
        /* converter= */
        null
      );
    }, n;
  }(cc2)
);
function Dc2(t2) {
  var e;
  e = t2, A2.setLogLevel(e);
}
var Ac2 = (
  /** @class */
  function() {
    function t2(t3, e) {
      this._firestore = t3, this._delegate = e, this._userDataWriter = new Nc2(t3);
    }
    return t2.prototype.get = function(t3) {
      var e = this, n = Bc2(t3);
      return this._delegate.get(n).then(function(t4) {
        return new Pc2(e._firestore, new za2(e._firestore._delegate, e._userDataWriter, t4._key, t4._document, t4.metadata, n.converter));
      });
    }, t2.prototype.set = function(t3, e, n) {
      var r = Bc2(t3);
      return n ? (Bu("Transaction.set", n), this._delegate.set(r, e, n)) : this._delegate.set(r, e), this;
    }, t2.prototype.update = function(t3, n, r) {
      for (var i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
      var u = Bc2(t3);
      return 2 === arguments.length ? this._delegate.update(u, n) : (i = this._delegate).update.apply(i, __spreadArray([u, n, r], o)), this;
    }, t2.prototype.delete = function(t3) {
      var e = Bc2(t3);
      return this._delegate.delete(e), this;
    }, t2;
  }()
);
var kc2 = (
  /** @class */
  function() {
    function t2(t3) {
      this._delegate = t3;
    }
    return t2.prototype.set = function(t3, e, n) {
      var r = Bc2(t3);
      return n ? (Bu("WriteBatch.set", n), this._delegate.set(r, e, n)) : this._delegate.set(r, e), this;
    }, t2.prototype.update = function(t3, n, r) {
      for (var i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
      var u = Bc2(t3);
      return 2 === arguments.length ? this._delegate.update(u, n) : (i = this._delegate).update.apply(i, __spreadArray([u, n, r], o)), this;
    }, t2.prototype.delete = function(t3) {
      var e = Bc2(t3);
      return this._delegate.delete(e), this;
    }, t2.prototype.commit = function() {
      return this._delegate.commit();
    }, t2;
  }()
);
var Cc2 = (
  /** @class */
  function() {
    function t2(t3, e, n) {
      this._firestore = t3, this._userDataWriter = e, this._delegate = n;
    }
    return t2.prototype.fromFirestore = function(t3, e) {
      var n = new Wa2(
        this._firestore._delegate,
        this._userDataWriter,
        t3._key,
        t3._document,
        t3.metadata,
        /* converter= */
        null
      );
      return this._delegate.fromFirestore(new Fc2(this._firestore, n), null != e ? e : {});
    }, t2.prototype.toFirestore = function(t3, e) {
      return e ? this._delegate.toFirestore(t3, e) : this._delegate.toFirestore(t3);
    }, // Use the same instance of `FirestoreDataConverter` for the given instances
    // of `Firestore` and `PublicFirestoreDataConverter` so that isEqual() will
    // compare equal for two objects created with the same converter instance.
    t2.nu = function(e, n) {
      var r = t2.su, i = r.get(e);
      i || (i = /* @__PURE__ */ new WeakMap(), r.set(e, i));
      var o = i.get(n);
      return o || (o = new t2(e, new Nc2(e), n), i.set(n, o)), o;
    }, t2;
  }()
);
Cc2.su = /* @__PURE__ */ new WeakMap();
var xc2 = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.firestore = t3, this._delegate = e, this._userDataWriter = new Nc2(t3);
    }
    return t2.iu = function(e, n, r) {
      if (e.length % 2 != 0) throw new D2(N2.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + e.canonicalString() + " has " + e.length);
      return new t2(n, new $u(n._delegate, r, new ct(e)));
    }, t2.eu = function(e, n, r) {
      return new t2(n, new $u(n._delegate, r, e));
    }, Object.defineProperty(t2.prototype, "id", {
      get: function() {
        return this._delegate.id;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "parent", {
      get: function() {
        return new Uc2(this.firestore, this._delegate.parent);
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "path", {
      get: function() {
        return this._delegate.path;
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.collection = function(t3) {
      try {
        return new Uc2(this.firestore, Zu(this._delegate, t3));
      } catch (t4) {
        throw Rc2(t4, "collection()", "DocumentReference.collection()");
      }
    }, t2.prototype.isEqual = function(t3) {
      return (t3 = getModularInstance(t3)) instanceof $u && ea2(this._delegate, t3);
    }, t2.prototype.set = function(t3, e) {
      e = Bu("DocumentReference.set", e);
      try {
        return e ? yc2(this._delegate, t3, e) : yc2(this._delegate, t3);
      } catch (t4) {
        throw Rc2(t4, "setDoc()", "DocumentReference.set()");
      }
    }, t2.prototype.update = function(t3, n) {
      for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
      try {
        return 1 === arguments.length ? vc2(this._delegate, t3) : vc2.apply(void 0, __spreadArray([this._delegate, t3, n], r));
      } catch (t4) {
        throw Rc2(t4, "updateDoc()", "DocumentReference.update()");
      }
    }, t2.prototype.delete = function() {
      return gc2(zu((t3 = this._delegate).firestore, ua2), [new je(t3._key, De.none())]);
      var t3;
    }, t2.prototype.onSnapshot = function() {
      for (var t3 = this, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      var r = Lc2(e), i = Oc2(e, function(e2) {
        return new Pc2(t3.firestore, new za2(t3.firestore._delegate, t3._userDataWriter, e2._key, e2._document, e2.metadata, t3._delegate.converter));
      });
      return mc2(this._delegate, r, i);
    }, t2.prototype.get = function(t3) {
      var e = this;
      return ("cache" === (null == t3 ? void 0 : t3.source) ? function(t4) {
        t4 = zu(t4, $u);
        var e2 = zu(t4.firestore, ua2), i = aa2(e2), o = new pc2(e2);
        return function(t5, e3) {
          var i2 = this, o2 = new br();
          return t5.asyncQueue.enqueueAndForget(function() {
            return __awaiter(i2, void 0, void 0, function() {
              var i3;
              return __generator(this, function(s) {
                switch (s.label) {
                  case 0:
                    return i3 = function(t6, e4, i4) {
                      return __awaiter(this, void 0, void 0, function() {
                        var n, o3;
                        return __generator(this, function(r) {
                          switch (r.label) {
                            case 0:
                              return r.trys.push([0, 2, , 3]), [4, function(t7, e5) {
                                var n2 = F2(t7);
                                return n2.persistence.runTransaction("read document", "readonly", function(t8) {
                                  return n2.Mn.mn(t8, e5);
                                });
                              }(t6, e4)];
                            case 1:
                              return (o3 = r.sent()).isFoundDocument() ? i4.resolve(o3) : o3.isNoDocument() ? i4.resolve(null) : i4.reject(new D2(N2.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)")), [3, 3];
                            case 2:
                              return n = r.sent(), o3 = hs(n, "Failed to get document '" + e4 + " from cache"), i4.reject(o3), [3, 3];
                            case 3:
                              return [
                                2
                                /*return*/
                              ];
                          }
                        });
                      });
                    }, [4, Su(t5)];
                  case 1:
                    return [2, i3.apply(void 0, [s.sent(), e3, o2])];
                }
              });
            });
          }), o2.promise;
        }(i, t4._key).then(function(n) {
          return new za2(e2, o, t4._key, n, new Qa(
            null !== n && n.hasLocalMutations,
            /* fromCache= */
            true
          ), t4.converter);
        });
      }(this._delegate) : "server" === (null == t3 ? void 0 : t3.source) ? function(t4) {
        t4 = zu(t4, $u);
        var e2 = zu(t4.firestore, ua2);
        return ku(aa2(e2), t4._key, {
          source: "server"
        }).then(function(n) {
          return wc2(e2, t4, n);
        });
      }(this._delegate) : function(t4) {
        t4 = zu(t4, $u);
        var e2 = zu(t4.firestore, ua2);
        return ku(aa2(e2), t4._key).then(function(n) {
          return wc2(e2, t4, n);
        });
      }(this._delegate)).then(function(t4) {
        return new Pc2(e.firestore, new za2(e.firestore._delegate, e._userDataWriter, t4._key, t4._document, t4.metadata, e._delegate.converter));
      });
    }, t2.prototype.withConverter = function(e) {
      return new t2(this.firestore, e ? this._delegate.withConverter(Cc2.nu(this.firestore, e)) : this._delegate.withConverter(null));
    }, t2;
  }()
);
function Rc2(t2, e, n) {
  return t2.message = t2.message.replace(e, n), t2;
}
function Lc2(t2) {
  for (var e = 0, n = t2; e < n.length; e++) {
    var r = n[e];
    if ("object" == typeof r && !ia2(r)) return r;
  }
  return {};
}
function Oc2(t2, e) {
  var n, r, i;
  return {
    next: function(t3) {
      i.next && i.next(e(t3));
    },
    error: null === (n = (i = ia2(t2[0]) ? t2[0] : ia2(t2[1]) ? t2[1] : "function" == typeof t2[0] ? {
      next: t2[0],
      error: t2[1],
      complete: t2[2]
    } : {
      next: t2[1],
      error: t2[2],
      complete: t2[3]
    }).error) || void 0 === n ? void 0 : n.bind(i),
    complete: null === (r = i.complete) || void 0 === r ? void 0 : r.bind(i)
  };
}
var Pc2 = (
  /** @class */
  function() {
    function t2(t3, e) {
      this._firestore = t3, this._delegate = e;
    }
    return Object.defineProperty(t2.prototype, "ref", {
      get: function() {
        return new xc2(this._firestore, this._delegate.ref);
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "id", {
      get: function() {
        return this._delegate.id;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "metadata", {
      get: function() {
        return this._delegate.metadata;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "exists", {
      get: function() {
        return this._delegate.exists();
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.data = function(t3) {
      return this._delegate.data(t3);
    }, t2.prototype.get = function(t3, e) {
      return this._delegate.get(t3, e);
    }, t2.prototype.isEqual = function(t3) {
      return $a2(this._delegate, t3._delegate);
    }, t2;
  }()
);
var Fc2 = (
  /** @class */
  function(e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return __extends(n, e), n.prototype.data = function(t2) {
      return this._delegate.data(t2);
    }, n;
  }(Pc2)
);
var Mc2 = (
  /** @class */
  function() {
    function t2(t3, e) {
      this.firestore = t3, this._delegate = e, this._userDataWriter = new Nc2(t3);
    }
    return t2.prototype.where = function(e, n, r) {
      try {
        return new t2(this.firestore, Za2(this._delegate, function(t3, e2, n2) {
          var r2 = e2, i = Ga2("where", t3);
          return new tc2(i, r2, n2);
        }(e, n, r)));
      } catch (e2) {
        throw Rc2(e2, /(orderBy|where)\(\)/, "Query.$1()");
      }
    }, t2.prototype.orderBy = function(e, n) {
      try {
        return new t2(this.firestore, Za2(this._delegate, function(t3, e2) {
          void 0 === e2 && (e2 = "asc");
          var n2 = e2, r = Ga2("orderBy", t3);
          return new ec2(r, n2);
        }(e, n)));
      } catch (e2) {
        throw Rc2(e2, /(orderBy|where)\(\)/, "Query.$1()");
      }
    }, t2.prototype.limit = function(e) {
      try {
        return new t2(this.firestore, Za2(this._delegate, function(t3) {
          return Wu("limit", t3), new nc2(
            "limit",
            t3,
            "F"
            /* First */
          );
        }(e)));
      } catch (e2) {
        throw Rc2(e2, "limit()", "Query.limit()");
      }
    }, t2.prototype.limitToLast = function(e) {
      try {
        return new t2(this.firestore, Za2(this._delegate, function(t3) {
          return Wu("limitToLast", t3), new nc2(
            "limitToLast",
            t3,
            "L"
            /* Last */
          );
        }(e)));
      } catch (e2) {
        throw Rc2(e2, "limitToLast()", "Query.limitToLast()");
      }
    }, t2.prototype.startAt = function() {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      try {
        return new t2(this.firestore, Za2(this._delegate, function() {
          for (var t3 = [], e2 = 0; e2 < arguments.length; e2++) t3[e2] = arguments[e2];
          return new rc2(
            "startAt",
            t3,
            /*before=*/
            true
          );
        }.apply(void 0, e)));
      } catch (e2) {
        throw Rc2(e2, "startAt()", "Query.startAt()");
      }
    }, t2.prototype.startAfter = function() {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      try {
        return new t2(this.firestore, Za2(this._delegate, function() {
          for (var t3 = [], e2 = 0; e2 < arguments.length; e2++) t3[e2] = arguments[e2];
          return new rc2(
            "startAfter",
            t3,
            /*before=*/
            false
          );
        }.apply(void 0, e)));
      } catch (e2) {
        throw Rc2(e2, "startAfter()", "Query.startAfter()");
      }
    }, t2.prototype.endBefore = function() {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      try {
        return new t2(this.firestore, Za2(this._delegate, function() {
          for (var t3 = [], e2 = 0; e2 < arguments.length; e2++) t3[e2] = arguments[e2];
          return new ic2(
            "endBefore",
            t3,
            /*before=*/
            true
          );
        }.apply(void 0, e)));
      } catch (e2) {
        throw Rc2(e2, "endBefore()", "Query.endBefore()");
      }
    }, t2.prototype.endAt = function() {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      try {
        return new t2(this.firestore, Za2(this._delegate, function() {
          for (var t3 = [], e2 = 0; e2 < arguments.length; e2++) t3[e2] = arguments[e2];
          return new ic2(
            "endAt",
            t3,
            /*before=*/
            false
          );
        }.apply(void 0, e)));
      } catch (e2) {
        throw Rc2(e2, "endAt()", "Query.endAt()");
      }
    }, t2.prototype.isEqual = function(t3) {
      return na2(this._delegate, t3._delegate);
    }, t2.prototype.get = function(t3) {
      var e = this;
      return ("cache" === (null == t3 ? void 0 : t3.source) ? (
        /**
        * Executes the query and returns the results as a `QuerySnapshot` from cache.
        * Returns an error if the document is not currently cached.
        *
        * @returns A `Promise` that will be resolved with the results of the query.
        */
        function(t4) {
          t4 = zu(t4, Xu);
          var e2 = zu(t4.firestore, ua2), i = aa2(e2), o = new pc2(e2);
          return function(t5, e3) {
            var i2 = this, o2 = new br();
            return t5.asyncQueue.enqueueAndForget(function() {
              return __awaiter(i2, void 0, void 0, function() {
                var i3;
                return __generator(this, function(s) {
                  switch (s.label) {
                    case 0:
                      return i3 = function(t6, e4, i4) {
                        return __awaiter(this, void 0, void 0, function() {
                          var n, o3, s2, u, a;
                          return __generator(this, function(r) {
                            switch (r.label) {
                              case 0:
                                return r.trys.push([0, 2, , 3]), [4, Yi(
                                  t6,
                                  e4,
                                  /* usePreviousResults= */
                                  true
                                )];
                              case 1:
                                return a = r.sent(), n = new As(e4, a.Bn), o3 = n._o(a.documents), s2 = n.applyChanges(
                                  o3,
                                  /* updateLimboDocuments= */
                                  false
                                ), i4.resolve(s2.snapshot), [3, 3];
                              case 2:
                                return u = r.sent(), a = hs(u, "Failed to execute query '" + e4 + " against cache"), i4.reject(a), [3, 3];
                              case 3:
                                return [
                                  2
                                  /*return*/
                                ];
                            }
                          });
                        });
                      }, [4, Su(t5)];
                    case 1:
                      return [2, i3.apply(void 0, [s.sent(), e3, o2])];
                  }
                });
              });
            }), o2.promise;
          }(i, t4._query).then(function(n) {
            return new Ha2(e2, o, t4, n);
          });
        }(this._delegate)
      ) : "server" === (null == t3 ? void 0 : t3.source) ? function(t4) {
        t4 = zu(t4, Xu);
        var e2 = zu(t4.firestore, ua2), n = aa2(e2), r = new pc2(e2);
        return Cu(n, t4._query, {
          source: "server"
        }).then(function(n2) {
          return new Ha2(e2, r, t4, n2);
        });
      }(this._delegate) : function(t4) {
        t4 = zu(t4, Xu);
        var e2 = zu(t4.firestore, ua2), n = aa2(e2), r = new pc2(e2);
        return Xa2(t4._query), Cu(n, t4._query).then(function(n2) {
          return new Ha2(e2, r, t4, n2);
        });
      }(this._delegate)).then(function(t4) {
        return new qc2(e.firestore, new Ha2(e.firestore._delegate, e._userDataWriter, e._delegate, t4._snapshot));
      });
    }, t2.prototype.onSnapshot = function() {
      for (var t3 = this, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      var r = Lc2(e), i = Oc2(e, function(e2) {
        return new qc2(t3.firestore, new Ha2(t3.firestore._delegate, t3._userDataWriter, t3._delegate, e2._snapshot));
      });
      return mc2(this._delegate, r, i);
    }, t2.prototype.withConverter = function(e) {
      return new t2(this.firestore, e ? this._delegate.withConverter(Cc2.nu(this.firestore, e)) : this._delegate.withConverter(null));
    }, t2;
  }()
);
var Vc2 = (
  /** @class */
  function() {
    function t2(t3, e) {
      this._firestore = t3, this._delegate = e;
    }
    return Object.defineProperty(t2.prototype, "type", {
      get: function() {
        return this._delegate.type;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "doc", {
      get: function() {
        return new Fc2(this._firestore, this._delegate.doc);
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "oldIndex", {
      get: function() {
        return this._delegate.oldIndex;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "newIndex", {
      get: function() {
        return this._delegate.newIndex;
      },
      enumerable: false,
      configurable: true
    }), t2;
  }()
);
var qc2 = (
  /** @class */
  function() {
    function t2(t3, e) {
      this._firestore = t3, this._delegate = e;
    }
    return Object.defineProperty(t2.prototype, "query", {
      get: function() {
        return new Mc2(this._firestore, this._delegate.query);
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "metadata", {
      get: function() {
        return this._delegate.metadata;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "size", {
      get: function() {
        return this._delegate.size;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "empty", {
      get: function() {
        return this._delegate.empty;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(t2.prototype, "docs", {
      get: function() {
        var t3 = this;
        return this._delegate.docs.map(function(e) {
          return new Fc2(t3._firestore, e);
        });
      },
      enumerable: false,
      configurable: true
    }), t2.prototype.docChanges = function(t3) {
      var e = this;
      return this._delegate.docChanges(t3).map(function(t4) {
        return new Vc2(e._firestore, t4);
      });
    }, t2.prototype.forEach = function(t3, e) {
      var n = this;
      this._delegate.forEach(function(r) {
        t3.call(e, new Fc2(n._firestore, r));
      });
    }, t2.prototype.isEqual = function(t3) {
      return $a2(this._delegate, t3._delegate);
    }, t2;
  }()
);
var Uc2 = (
  /** @class */
  function(e) {
    function n(t2, n2) {
      var r = this;
      return (r = e.call(this, t2, n2) || this).firestore = t2, r._delegate = n2, r;
    }
    return __extends(n, e), Object.defineProperty(n.prototype, "id", {
      get: function() {
        return this._delegate.id;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(n.prototype, "path", {
      get: function() {
        return this._delegate.path;
      },
      enumerable: false,
      configurable: true
    }), Object.defineProperty(n.prototype, "parent", {
      get: function() {
        var t2 = this._delegate.parent;
        return t2 ? new xc2(this.firestore, t2) : null;
      },
      enumerable: false,
      configurable: true
    }), n.prototype.doc = function(t2) {
      try {
        return new xc2(this.firestore, void 0 === t2 ? ta2(this._delegate) : ta2(this._delegate, t2));
      } catch (t3) {
        throw Rc2(t3, "doc()", "CollectionReference.doc()");
      }
    }, n.prototype.add = function(t2) {
      var e2 = this;
      return function(t3, e3) {
        var n2 = zu(t3.firestore, ua2), r = ta2(t3), i = hc2(t3.converter, e3);
        return gc2(n2, [_a(Ta(t3.firestore), "addDoc", r._key, i, null !== t3.converter, {}).toMutation(r._key, De.exists(false))]).then(function() {
          return r;
        });
      }(this._delegate, t2).then(function(t3) {
        return new xc2(e2.firestore, t3);
      });
    }, n.prototype.isEqual = function(t2) {
      return ea2(this._delegate, t2._delegate);
    }, n.prototype.withConverter = function(t2) {
      return new n(this.firestore, t2 ? this._delegate.withConverter(Cc2.nu(this.firestore, t2)) : this._delegate.withConverter(null));
    }, n;
  }(Mc2)
);
function Bc2(t2) {
  return zu(t2, $u);
}
var jc2 = (
  /** @class */
  function() {
    function t2() {
      for (var t3 = [], n = 0; n < arguments.length; n++) t3[n] = arguments[n];
      this._delegate = new (la2.bind.apply(la2, __spreadArray([void 0], t3)))();
    }
    return t2.documentId = function() {
      return new t2($.keyField().canonicalString());
    }, t2.prototype.isEqual = function(t3) {
      return (t3 = getModularInstance(t3)) instanceof la2 && this._delegate._internalPath.isEqual(t3._internalPath);
    }, t2;
  }()
);
var Kc2 = (
  /** @class */
  function() {
    function t2(t3) {
      this._delegate = t3;
    }
    return t2.serverTimestamp = function() {
      var e = new Na2("serverTimestamp");
      return e._methodName = "FieldValue.serverTimestamp", new t2(e);
    }, t2.delete = function() {
      var e = new Ea("deleteField");
      return e._methodName = "FieldValue.delete", new t2(e);
    }, t2.arrayUnion = function() {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      var r = (
        /**
        * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
        * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
        * value that already exists on the server. Each specified element that doesn't
        * already exist in the array will be added to the end. If the field being
        * modified is not already an array it will be overwritten with an array
        * containing exactly the specified elements.
        *
        * @param elements - The elements to union into the array.
        * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
        * `updateDoc()`.
        */
        function() {
          for (var t3 = [], e2 = 0; e2 < arguments.length; e2++) t3[e2] = arguments[e2];
          return new Da("arrayUnion", t3);
        }.apply(void 0, e)
      );
      return r._methodName = "FieldValue.arrayUnion", new t2(r);
    }, t2.arrayRemove = function() {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      var r = function() {
        for (var t3 = [], e2 = 0; e2 < arguments.length; e2++) t3[e2] = arguments[e2];
        return new Aa2("arrayRemove", t3);
      }.apply(void 0, e);
      return r._methodName = "FieldValue.arrayRemove", new t2(r);
    }, t2.increment = function(e) {
      var n = function(t3) {
        return new ka2("increment", t3);
      }(e);
      return n._methodName = "FieldValue.increment", new t2(n);
    }, t2.prototype.isEqual = function(t3) {
      return this._delegate.isEqual(t3._delegate);
    }, t2;
  }()
);

// node_modules/@firebase/firestore/dist/esm5/index.js
var C3 = {
  Firestore: Sc2,
  GeoPoint: ya2,
  Timestamp: j,
  Blob: _c,
  Transaction: Ac2,
  WriteBatch: kc2,
  DocumentReference: xc2,
  DocumentSnapshot: Pc2,
  Query: Mc2,
  QueryDocumentSnapshot: Fc2,
  QuerySnapshot: qc2,
  CollectionReference: Uc2,
  FieldPath: jc2,
  FieldValue: Kc2,
  setLogLevel: Dc2,
  CACHE_SIZE_UNLIMITED: sa2
};
function I2(e) {
  !/**
  * Configures Firestore as part of the Firebase SDK by calling registerService.
  *
  * @param firebase - The FirebaseNamespace to register Firestore with
  * @param firestoreFactory - A factory function that returns a new Firestore
  *    instance.
  */
  function(e2, r) {
    e2.INTERNAL.registerComponent(new Component(
      "firestore",
      function(e3) {
        var t2 = e3.getProvider("app").getImmediate();
        return r(t2, e3.getProvider("auth-internal"));
      },
      "PUBLIC"
      /* PUBLIC */
    ).setServiceProps(Object.assign({}, C3)));
  }(e, function(e2, s) {
    return new Sc2(e2, new ua2(e2, s), new Ec2());
  }), e.registerVersion("@firebase/firestore", "2.4.1");
}
I2(index_esm_default);

// node_modules/@angular/fire/fesm2015/angular-fire-auth.js
var proxyPolyfillCompat = {
  app: null,
  applyActionCode: null,
  checkActionCode: null,
  confirmPasswordReset: null,
  createUserWithEmailAndPassword: null,
  currentUser: null,
  fetchSignInMethodsForEmail: null,
  isSignInWithEmailLink: null,
  getRedirectResult: null,
  languageCode: null,
  settings: null,
  onAuthStateChanged: null,
  onIdTokenChanged: null,
  sendSignInLinkToEmail: null,
  sendPasswordResetEmail: null,
  setPersistence: null,
  signInAndRetrieveDataWithCredential: null,
  signInAnonymously: null,
  signInWithCredential: null,
  signInWithCustomToken: null,
  signInWithEmailAndPassword: null,
  signInWithPhoneNumber: null,
  signInWithEmailLink: null,
  signInWithPopup: null,
  signInWithRedirect: null,
  signOut: null,
  tenantId: null,
  updateCurrentUser: null,
  useDeviceLanguage: null,
  useEmulator: null,
  verifyPasswordResetCode: null
};
var USE_EMULATOR = new InjectionToken("angularfire2.auth.use-emulator");
var SETTINGS = new InjectionToken("angularfire2.auth.settings");
var TENANT_ID = new InjectionToken("angularfire2.auth.tenant-id");
var LANGUAGE_CODE = new InjectionToken("angularfire2.auth.langugage-code");
var USE_DEVICE_LANGUAGE = new InjectionToken("angularfire2.auth.use-device-language");
var PERSISTENCE = new InjectionToken("angularfire.auth.persistence");
var AngularFireAuth = class {
  constructor(options, nameOrConfig, platformId, zone, _useEmulator, _settings, tenantId, languageCode, useDeviceLanguage, persistence) {
    const schedulers = new ɵAngularFireSchedulers(zone);
    const keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(schedulers);
    const logins = new Subject();
    const auth = of(void 0).pipe(observeOn(schedulers.outsideAngular), switchMap(() => zone.runOutsideAngular(() => import("./index.esm-NRZMCRQZ.js"))), map(() => ɵfirebaseAppFactory(options, zone, nameOrConfig)), map((app) => zone.runOutsideAngular(() => {
      const useEmulator = _useEmulator;
      const settings = _settings;
      return ɵfetchInstance(`${app.name}.auth`, "AngularFireAuth", app, () => {
        const auth2 = zone.runOutsideAngular(() => app.auth());
        if (useEmulator) {
          auth2.useEmulator(`http://${useEmulator.join(":")}`);
        }
        if (tenantId) {
          auth2.tenantId = tenantId;
        }
        auth2.languageCode = languageCode;
        if (useDeviceLanguage) {
          auth2.useDeviceLanguage();
        }
        if (settings) {
          for (const [k3, v2] of Object.entries(settings)) {
            auth2.settings[k3] = v2;
          }
        }
        if (persistence) {
          auth2.setPersistence(persistence);
        }
        return auth2;
      }, [useEmulator, tenantId, languageCode, useDeviceLanguage, settings, persistence]);
    })), shareReplay({
      bufferSize: 1,
      refCount: false
    }));
    if (isPlatformServer(platformId)) {
      this.authState = this.user = this.idToken = this.idTokenResult = this.credential = of(null);
    } else {
      const _ = auth.pipe(first()).subscribe();
      const redirectResult = auth.pipe(switchMap((auth2) => auth2.getRedirectResult().then((it2) => it2, () => null)), keepUnstableUntilFirst, shareReplay({
        bufferSize: 1,
        refCount: false
      }));
      const fromCallback = (cb2) => new Observable((subscriber) => ({
        unsubscribe: zone.runOutsideAngular(() => cb2(subscriber))
      }));
      const authStateChanged = auth.pipe(switchMap((auth2) => fromCallback(auth2.onAuthStateChanged.bind(auth2))));
      const idTokenChanged = auth.pipe(switchMap((auth2) => fromCallback(auth2.onIdTokenChanged.bind(auth2))));
      this.authState = redirectResult.pipe(switchMapTo(authStateChanged), subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
      this.user = redirectResult.pipe(switchMapTo(idTokenChanged), subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
      this.idToken = this.user.pipe(switchMap((user) => user ? from(user.getIdToken()) : of(null)));
      this.idTokenResult = this.user.pipe(switchMap((user) => user ? from(user.getIdTokenResult()) : of(null)));
      this.credential = merge(
        redirectResult,
        logins,
        // pipe in null authState to make credential zipable, just a weird devexp if
        // authState and user go null to still have a credential
        this.authState.pipe(filter((it2) => !it2))
      ).pipe(
        // handle the { user: { } } when a user is already logged in, rather have null
        // TODO handle the type corcersion better
        map((credential) => (credential === null || credential === void 0 ? void 0 : credential.user) ? credential : null),
        subscribeOn(schedulers.outsideAngular),
        observeOn(schedulers.insideAngular)
      );
    }
    return ɵlazySDKProxy(this, auth, zone, {
      spy: {
        apply: (name2, _, val) => {
          if (name2.startsWith("signIn") || name2.startsWith("createUser")) {
            val.then((user) => logins.next(user));
          }
        }
      }
    });
  }
};
AngularFireAuth.ɵprov = ɵɵdefineInjectable({
  factory: function AngularFireAuth_Factory() {
    return new AngularFireAuth(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone), ɵɵinject(USE_EMULATOR, 8), ɵɵinject(SETTINGS, 8), ɵɵinject(TENANT_ID, 8), ɵɵinject(LANGUAGE_CODE, 8), ɵɵinject(USE_DEVICE_LANGUAGE, 8), ɵɵinject(PERSISTENCE, 8));
  },
  token: AngularFireAuth,
  providedIn: "any"
});
AngularFireAuth.decorators = [{
  type: Injectable,
  args: [{
    providedIn: "any"
  }]
}];
AngularFireAuth.ctorParameters = () => [{
  type: void 0,
  decorators: [{
    type: Inject,
    args: [FIREBASE_OPTIONS]
  }]
}, {
  type: void 0,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [FIREBASE_APP_NAME]
  }]
}, {
  type: Object,
  decorators: [{
    type: Inject,
    args: [PLATFORM_ID]
  }]
}, {
  type: NgZone
}, {
  type: void 0,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [USE_EMULATOR]
  }]
}, {
  type: void 0,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [SETTINGS]
  }]
}, {
  type: String,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [TENANT_ID]
  }]
}, {
  type: String,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [LANGUAGE_CODE]
  }]
}, {
  type: Boolean,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [USE_DEVICE_LANGUAGE]
  }]
}, {
  type: String,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [PERSISTENCE]
  }]
}];
ɵapplyMixins(AngularFireAuth, [proxyPolyfillCompat]);
var AngularFireAuthModule = class {
};
AngularFireAuthModule.decorators = [{
  type: NgModule,
  args: [{
    providers: [AngularFireAuth]
  }]
}];

// node_modules/@angular/fire/fesm2015/angular-fire-firestore.js
function _fromRef(ref, scheduler = asyncScheduler) {
  return new Observable((subscriber) => {
    let unsubscribe;
    if (scheduler != null) {
      scheduler.schedule(() => {
        unsubscribe = ref.onSnapshot({
          includeMetadataChanges: true
        }, subscriber);
      });
    } else {
      unsubscribe = ref.onSnapshot({
        includeMetadataChanges: true
      }, subscriber);
    }
    return () => {
      if (unsubscribe != null) {
        unsubscribe();
      }
    };
  });
}
function fromRef(ref, scheduler) {
  return _fromRef(ref, scheduler);
}
function fromDocRef(ref, scheduler) {
  return fromRef(ref, scheduler).pipe(startWith(void 0), pairwise(), map(([priorPayload, payload]) => {
    if (!payload.exists) {
      return {
        payload,
        type: "removed"
      };
    }
    if (!(priorPayload === null || priorPayload === void 0 ? void 0 : priorPayload.exists)) {
      return {
        payload,
        type: "added"
      };
    }
    return {
      payload,
      type: "modified"
    };
  }));
}
function fromCollectionRef(ref, scheduler) {
  return fromRef(ref, scheduler).pipe(map((payload) => ({
    payload,
    type: "query"
  })));
}
function docChanges(query, scheduler) {
  return fromCollectionRef(query, scheduler).pipe(startWith(void 0), pairwise(), map(([priorAction, action]) => {
    const docChanges2 = action.payload.docChanges();
    const actions = docChanges2.map((change) => ({
      type: change.type,
      payload: change
    }));
    if (priorAction && JSON.stringify(priorAction.payload.metadata) !== JSON.stringify(action.payload.metadata)) {
      action.payload.docs.forEach((currentDoc, currentIndex) => {
        const docChange = docChanges2.find((d) => d.doc.ref.isEqual(currentDoc.ref));
        const priorDoc = priorAction === null || priorAction === void 0 ? void 0 : priorAction.payload.docs.find((d) => d.ref.isEqual(currentDoc.ref));
        if (docChange && JSON.stringify(docChange.doc.metadata) === JSON.stringify(currentDoc.metadata) || !docChange && priorDoc && JSON.stringify(priorDoc.metadata) === JSON.stringify(currentDoc.metadata)) {
        } else {
          actions.push({
            type: "modified",
            payload: {
              oldIndex: currentIndex,
              newIndex: currentIndex,
              type: "modified",
              doc: currentDoc
            }
          });
        }
      });
    }
    return actions;
  }));
}
function sortedChanges(query, events, scheduler) {
  return docChanges(query, scheduler).pipe(
    scan((current, changes) => combineChanges(current, changes.map((it2) => it2.payload), events), []),
    distinctUntilChanged(),
    // cut down on unneed change cycles
    map((changes) => changes.map((c) => ({
      type: c.type,
      payload: c
    })))
  );
}
function combineChanges(current, changes, events) {
  changes.forEach((change) => {
    if (events.indexOf(change.type) > -1) {
      current = combineChange(current, change);
    }
  });
  return current;
}
function sliceAndSplice(original, start, deleteCount, ...args) {
  const returnArray = original.slice();
  returnArray.splice(start, deleteCount, ...args);
  return returnArray;
}
function combineChange(combined, change) {
  switch (change.type) {
    case "added":
      if (combined[change.newIndex] && combined[change.newIndex].doc.ref.isEqual(change.doc.ref)) {
      } else {
        return sliceAndSplice(combined, change.newIndex, 0, change);
      }
      break;
    case "modified":
      if (combined[change.oldIndex] == null || combined[change.oldIndex].doc.ref.isEqual(change.doc.ref)) {
        if (change.oldIndex !== change.newIndex) {
          const copiedArray = combined.slice();
          copiedArray.splice(change.oldIndex, 1);
          copiedArray.splice(change.newIndex, 0, change);
          return copiedArray;
        } else {
          return sliceAndSplice(combined, change.newIndex, 1, change);
        }
      }
      break;
    case "removed":
      if (combined[change.oldIndex] && combined[change.oldIndex].doc.ref.isEqual(change.doc.ref)) {
        return sliceAndSplice(combined, change.oldIndex, 1);
      }
      break;
  }
  return combined;
}
function validateEventsArray(events) {
  if (!events || events.length === 0) {
    events = ["added", "removed", "modified"];
  }
  return events;
}
var AngularFirestoreCollection = class {
  /**
   * The constructor takes in a CollectionReference and Query to provide wrapper methods
   * for data operations and data streaming.
   *
   * Note: Data operation methods are done on the reference not the query. This means
   * when you update data it is not updating data to the window of your query unless
   * the data fits the criteria of the query. See the AssociatedRefence type for details
   * on this implication.
   */
  constructor(ref, query, afs) {
    this.ref = ref;
    this.query = query;
    this.afs = afs;
  }
  /**
   * Listen to the latest change in the stream. This method returns changes
   * as they occur and they are not sorted by query order. This allows you to construct
   * your own data structure.
   */
  stateChanges(events) {
    let source = docChanges(this.query, this.afs.schedulers.outsideAngular);
    if (events && events.length > 0) {
      source = source.pipe(map((actions) => actions.filter((change) => events.indexOf(change.type) > -1)));
    }
    return source.pipe(
      // We want to filter out empty arrays, but always emit at first, so the developer knows
      // that the collection has been resolve; even if it's empty
      startWith(void 0),
      pairwise(),
      filter(([prior, current]) => current.length > 0 || !prior),
      map(([prior, current]) => current),
      this.afs.keepUnstableUntilFirst
    );
  }
  /**
   * Create a stream of changes as they occur it time. This method is similar to stateChanges()
   * but it collects each event in an array over time.
   */
  auditTrail(events) {
    return this.stateChanges(events).pipe(scan((current, action) => [...current, ...action], []));
  }
  /**
   * Create a stream of synchronized changes. This method keeps the local array in sorted
   * query order.
   */
  snapshotChanges(events) {
    const validatedEvents = validateEventsArray(events);
    const scheduledSortedChanges$ = sortedChanges(this.query, validatedEvents, this.afs.schedulers.outsideAngular);
    return scheduledSortedChanges$.pipe(this.afs.keepUnstableUntilFirst);
  }
  valueChanges(options = {}) {
    return fromCollectionRef(this.query, this.afs.schedulers.outsideAngular).pipe(map((actions) => actions.payload.docs.map((a) => {
      if (options.idField) {
        return Object.assign(Object.assign({}, a.data()), {
          [options.idField]: a.id
        });
      } else {
        return a.data();
      }
    })), this.afs.keepUnstableUntilFirst);
  }
  /**
   * Retrieve the results of the query once.
   */
  get(options) {
    return from(this.query.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
  }
  /**
   * Add data to a collection reference.
   *
   * Note: Data operation methods are done on the reference not the query. This means
   * when you update data it is not updating data to the window of your query unless
   * the data fits the criteria of the query.
   */
  add(data) {
    return this.ref.add(data);
  }
  /**
   * Create a reference to a single document in a collection.
   */
  doc(path) {
    return new AngularFirestoreDocument(this.ref.doc(path), this.afs);
  }
};
var AngularFirestoreDocument = class {
  /**
   * The constructor takes in a DocumentReference to provide wrapper methods
   * for data operations, data streaming, and Symbol.observable.
   */
  constructor(ref, afs) {
    this.ref = ref;
    this.afs = afs;
  }
  /**
   * Create or overwrite a single document.
   */
  set(data, options) {
    return this.ref.set(data, options);
  }
  /**
   * Update some fields of a document without overwriting the entire document.
   */
  update(data) {
    return this.ref.update(data);
  }
  /**
   * Delete a document.
   */
  delete() {
    return this.ref.delete();
  }
  /**
   * Create a reference to a sub-collection given a path and an optional query
   * function.
   */
  collection(path, queryFn) {
    const collectionRef = this.ref.collection(path);
    const {
      ref,
      query
    } = associateQuery(collectionRef, queryFn);
    return new AngularFirestoreCollection(ref, query, this.afs);
  }
  /**
   * Listen to snapshot updates from the document.
   */
  snapshotChanges() {
    const scheduledFromDocRef$ = fromDocRef(this.ref, this.afs.schedulers.outsideAngular);
    return scheduledFromDocRef$.pipe(this.afs.keepUnstableUntilFirst);
  }
  valueChanges(options = {}) {
    return this.snapshotChanges().pipe(map(({
      payload
    }) => options.idField ? Object.assign(Object.assign({}, payload.data()), {
      [options.idField]: payload.id
    }) : payload.data()));
  }
  /**
   * Retrieve the document once.
   */
  get(options) {
    return from(this.ref.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
  }
};
var AngularFirestoreCollectionGroup = class {
  /**
   * The constructor takes in a CollectionGroupQuery to provide wrapper methods
   * for data operations and data streaming.
   */
  constructor(query, afs) {
    this.query = query;
    this.afs = afs;
  }
  /**
   * Listen to the latest change in the stream. This method returns changes
   * as they occur and they are not sorted by query order. This allows you to construct
   * your own data structure.
   */
  stateChanges(events) {
    if (!events || events.length === 0) {
      return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(this.afs.keepUnstableUntilFirst);
    }
    return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(map((actions) => actions.filter((change) => events.indexOf(change.type) > -1)), filter((changes) => changes.length > 0), this.afs.keepUnstableUntilFirst);
  }
  /**
   * Create a stream of changes as they occur it time. This method is similar to stateChanges()
   * but it collects each event in an array over time.
   */
  auditTrail(events) {
    return this.stateChanges(events).pipe(scan((current, action) => [...current, ...action], []));
  }
  /**
   * Create a stream of synchronized changes. This method keeps the local array in sorted
   * query order.
   */
  snapshotChanges(events) {
    const validatedEvents = validateEventsArray(events);
    const scheduledSortedChanges$ = sortedChanges(this.query, validatedEvents, this.afs.schedulers.outsideAngular);
    return scheduledSortedChanges$.pipe(this.afs.keepUnstableUntilFirst);
  }
  valueChanges(options = {}) {
    const fromCollectionRefScheduled$ = fromCollectionRef(this.query, this.afs.schedulers.outsideAngular);
    return fromCollectionRefScheduled$.pipe(map((actions) => actions.payload.docs.map((a) => {
      if (options.idField) {
        return Object.assign({
          [options.idField]: a.id
        }, a.data());
      } else {
        return a.data();
      }
    })), this.afs.keepUnstableUntilFirst);
  }
  /**
   * Retrieve the results of the query once.
   */
  get(options) {
    return from(this.query.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
  }
};
var ENABLE_PERSISTENCE = new InjectionToken("angularfire2.enableFirestorePersistence");
var PERSISTENCE_SETTINGS = new InjectionToken("angularfire2.firestore.persistenceSettings");
var SETTINGS2 = new InjectionToken("angularfire2.firestore.settings");
var USE_EMULATOR2 = new InjectionToken("angularfire2.firestore.use-emulator");
function associateQuery(collectionRef, queryFn = (ref) => ref) {
  const query = queryFn(collectionRef);
  const ref = collectionRef;
  return {
    query,
    ref
  };
}
var AngularFirestore = class {
  /**
   * Each Feature of AngularFire has a FirebaseApp injected. This way we
   * don't rely on the main Firebase App instance and we can create named
   * apps and use multiple apps.
   */
  constructor(options, nameOrConfig, shouldEnablePersistence, settings, platformId, zone, persistenceSettings, _useEmulator, useAuthEmulator) {
    this.schedulers = new ɵAngularFireSchedulers(zone);
    this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers);
    const app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
    if (!index_esm_default.auth && useAuthEmulator) {
      ɵlogAuthEmulatorError();
    }
    const useEmulator = _useEmulator;
    [this.firestore, this.persistenceEnabled$] = ɵfetchInstance(`${app.name}.firestore`, "AngularFirestore", app, () => {
      const firestore = zone.runOutsideAngular(() => app.firestore());
      if (settings) {
        firestore.settings(settings);
      }
      if (useEmulator) {
        firestore.useEmulator(...useEmulator);
      }
      if (shouldEnablePersistence && !isPlatformServer(platformId)) {
        const enablePersistence = () => {
          try {
            return from(firestore.enablePersistence(persistenceSettings || void 0).then(() => true, () => false));
          } catch (e) {
            if (typeof console !== "undefined") {
              console.warn(e);
            }
            return of(false);
          }
        };
        return [firestore, zone.runOutsideAngular(enablePersistence)];
      } else {
        return [firestore, of(false)];
      }
    }, [settings, useEmulator, shouldEnablePersistence]);
  }
  collection(pathOrRef, queryFn) {
    let collectionRef;
    if (typeof pathOrRef === "string") {
      collectionRef = this.firestore.collection(pathOrRef);
    } else {
      collectionRef = pathOrRef;
    }
    const {
      ref,
      query
    } = associateQuery(collectionRef, queryFn);
    const refInZone = this.schedulers.ngZone.run(() => ref);
    return new AngularFirestoreCollection(refInZone, query, this);
  }
  /**
   * Create a reference to a Firestore Collection Group based on a collectionId
   * and an optional query function to narrow the result
   * set.
   */
  collectionGroup(collectionId, queryGroupFn) {
    const queryFn = queryGroupFn || ((ref) => ref);
    const collectionGroup = this.firestore.collectionGroup(collectionId);
    return new AngularFirestoreCollectionGroup(queryFn(collectionGroup), this);
  }
  doc(pathOrRef) {
    let ref;
    if (typeof pathOrRef === "string") {
      ref = this.firestore.doc(pathOrRef);
    } else {
      ref = pathOrRef;
    }
    const refInZone = this.schedulers.ngZone.run(() => ref);
    return new AngularFirestoreDocument(refInZone, this);
  }
  /**
   * Returns a generated Firestore Document Id.
   */
  createId() {
    return this.firestore.collection("_").doc().id;
  }
};
AngularFirestore.ɵprov = ɵɵdefineInjectable({
  factory: function AngularFirestore_Factory() {
    return new AngularFirestore(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(ENABLE_PERSISTENCE, 8), ɵɵinject(SETTINGS2, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone), ɵɵinject(PERSISTENCE_SETTINGS, 8), ɵɵinject(USE_EMULATOR2, 8), ɵɵinject(USE_EMULATOR, 8));
  },
  token: AngularFirestore,
  providedIn: "any"
});
AngularFirestore.decorators = [{
  type: Injectable,
  args: [{
    providedIn: "any"
  }]
}];
AngularFirestore.ctorParameters = () => [{
  type: void 0,
  decorators: [{
    type: Inject,
    args: [FIREBASE_OPTIONS]
  }]
}, {
  type: void 0,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [FIREBASE_APP_NAME]
  }]
}, {
  type: Boolean,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [ENABLE_PERSISTENCE]
  }]
}, {
  type: void 0,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [SETTINGS2]
  }]
}, {
  type: Object,
  decorators: [{
    type: Inject,
    args: [PLATFORM_ID]
  }]
}, {
  type: NgZone
}, {
  type: void 0,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [PERSISTENCE_SETTINGS]
  }]
}, {
  type: void 0,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [USE_EMULATOR2]
  }]
}, {
  type: void 0,
  decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [USE_EMULATOR]
  }]
}];
var AngularFirestoreModule = class _AngularFirestoreModule {
  /**
   * Attempt to enable persistent storage, if possible
   */
  static enablePersistence(persistenceSettings) {
    return {
      ngModule: _AngularFirestoreModule,
      providers: [{
        provide: ENABLE_PERSISTENCE,
        useValue: true
      }, {
        provide: PERSISTENCE_SETTINGS,
        useValue: persistenceSettings
      }]
    };
  }
};
AngularFirestoreModule.decorators = [{
  type: NgModule,
  args: [{
    providers: [AngularFirestore]
  }]
}];
export {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup,
  AngularFirestoreDocument,
  AngularFirestoreModule,
  ENABLE_PERSISTENCE,
  PERSISTENCE_SETTINGS,
  SETTINGS2 as SETTINGS,
  USE_EMULATOR2 as USE_EMULATOR,
  associateQuery,
  combineChange,
  combineChanges,
  docChanges,
  fromCollectionRef,
  fromDocRef,
  fromRef,
  sortedChanges,
  validateEventsArray
};
/*! Bundled license information:

firebase/app/dist/index.esm.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/index.esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@firebase/firestore/dist/esm5/prebuilt-2d830653-6eee25bb.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/esm5/prebuilt-2d830653-6eee25bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/esm5/prebuilt-2d830653-6eee25bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/esm5/index.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=@angular_fire_firestore.js.map
