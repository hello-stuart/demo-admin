import {
  index_esm_default
} from "./chunk-I5FWUVCI.js";
import "./chunk-55JZBEKM.js";
import "./chunk-EIB7IA3J.js";

// node_modules/@firebase/auth/dist/auth.esm.js
(function() {
  var k, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  };
  function ba(a) {
    a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    return globalThis;
  }
  var ca = ba(this);
  function da(a, b) {
    if (b) {
      var c = ca;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        e in c || (c[e] = {});
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d && null != b && aa(c, a, {
        configurable: true,
        writable: true,
        value: b
      });
    }
  }
  function ea(a) {
    var b = 0;
    return function() {
      return b < a.length ? {
        done: false,
        value: a[b++]
      } : {
        done: true
      };
    };
  }
  function fa(a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : {
      next: ea(a)
    };
  }
  da("Promise", function(a) {
    function b(g) {
      this.b = 0;
      this.c = void 0;
      this.a = [];
      var h = this.f();
      try {
        g(h.resolve, h.reject);
      } catch (m) {
        h.reject(m);
      }
    }
    function c() {
      this.a = null;
    }
    function d(g) {
      return g instanceof b ? g : new b(function(h) {
        h(g);
      });
    }
    if (a) return a;
    c.prototype.b = function(g) {
      if (null == this.a) {
        this.a = [];
        var h = this;
        this.c(function() {
          h.g();
        });
      }
      this.a.push(g);
    };
    var e = ca.setTimeout;
    c.prototype.c = function(g) {
      e(g, 0);
    };
    c.prototype.g = function() {
      for (; this.a && this.a.length; ) {
        var g = this.a;
        this.a = [];
        for (var h = 0; h < g.length; ++h) {
          var m = g[h];
          g[h] = null;
          try {
            m();
          } catch (p) {
            this.f(p);
          }
        }
      }
      this.a = null;
    };
    c.prototype.f = function(g) {
      this.c(function() {
        throw g;
      });
    };
    b.prototype.f = function() {
      function g(p) {
        return function(v) {
          m || (m = true, p.call(h, v));
        };
      }
      var h = this, m = false;
      return {
        resolve: g(this.m),
        reject: g(this.g)
      };
    };
    b.prototype.m = function(g) {
      if (g === this) this.g(new TypeError("A Promise cannot resolve to itself"));
      else if (g instanceof b) this.s(g);
      else {
        a: switch (typeof g) {
          case "object":
            var h = null != g;
            break a;
          case "function":
            h = true;
            break a;
          default:
            h = false;
        }
        h ? this.v(g) : this.h(g);
      }
    };
    b.prototype.v = function(g) {
      var h = void 0;
      try {
        h = g.then;
      } catch (m) {
        this.g(m);
        return;
      }
      "function" == typeof h ? this.u(h, g) : this.h(g);
    };
    b.prototype.g = function(g) {
      this.i(2, g);
    };
    b.prototype.h = function(g) {
      this.i(1, g);
    };
    b.prototype.i = function(g, h) {
      if (0 != this.b) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.b);
      this.b = g;
      this.c = h;
      this.l();
    };
    b.prototype.l = function() {
      if (null != this.a) {
        for (var g = 0; g < this.a.length; ++g) f.b(this.a[g]);
        this.a = null;
      }
    };
    var f = new c();
    b.prototype.s = function(g) {
      var h = this.f();
      g.Ra(h.resolve, h.reject);
    };
    b.prototype.u = function(g, h) {
      var m = this.f();
      try {
        g.call(h, m.resolve, m.reject);
      } catch (p) {
        m.reject(p);
      }
    };
    b.prototype.then = function(g, h) {
      function m(A, Q) {
        return "function" == typeof A ? function(ya) {
          try {
            p(A(ya));
          } catch (Ad) {
            v(Ad);
          }
        } : Q;
      }
      var p, v, B = new b(function(A, Q) {
        p = A;
        v = Q;
      });
      this.Ra(m(g, p), m(h, v));
      return B;
    };
    b.prototype.catch = function(g) {
      return this.then(void 0, g);
    };
    b.prototype.Ra = function(g, h) {
      function m() {
        switch (p.b) {
          case 1:
            g(p.c);
            break;
          case 2:
            h(p.c);
            break;
          default:
            throw Error("Unexpected state: " + p.b);
        }
      }
      var p = this;
      null == this.a ? f.b(m) : this.a.push(m);
    };
    b.resolve = d;
    b.reject = function(g) {
      return new b(function(h, m) {
        m(g);
      });
    };
    b.race = function(g) {
      return new b(function(h, m) {
        for (var p = fa(g), v = p.next(); !v.done; v = p.next()) d(v.value).Ra(h, m);
      });
    };
    b.all = function(g) {
      var h = fa(g), m = h.next();
      return m.done ? d([]) : new b(function(p, v) {
        function B(ya) {
          return function(Ad) {
            A[ya] = Ad;
            Q--;
            0 == Q && p(A);
          };
        }
        var A = [], Q = 0;
        do
          A.push(void 0), Q++, d(m.value).Ra(B(A.length - 1), v), m = h.next();
        while (!m.done);
      });
    };
    return b;
  });
  var ha = ha || {}, l = this || self, ia = /^[\w+/_-]+[=]{0,2}$/, ja = null;
  function ka(a) {
    return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && ia.test(a) ? a : "";
  }
  function la() {
  }
  function ma(a) {
    var b = typeof a;
    return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
  }
  function na(a) {
    var b = ma(a);
    return "array" == b || "object" == b && "number" == typeof a.length;
  }
  function oa(a) {
    return "function" == ma(a);
  }
  function n(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b;
  }
  function pa(a) {
    return Object.prototype.hasOwnProperty.call(a, qa) && a[qa] || (a[qa] = ++ra);
  }
  var qa = "closure_uid_" + (1e9 * Math.random() >>> 0), ra = 0;
  function sa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ta(a, b, c) {
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
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? q = sa : q = ta;
    return q.apply(null, arguments);
  }
  function ua(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  var va = Date.now;
  function r(a, b) {
    function c() {
    }
    c.prototype = b.prototype;
    a.bb = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
  }
  function wa(a) {
    return a;
  }
  ;
  function t(a, b, c) {
    this.code = xa + a;
    this.message = b || za[a] || "";
    this.a = c || null;
  }
  r(t, Error);
  t.prototype.w = function() {
    var a = {
      code: this.code,
      message: this.message
    };
    this.a && (a.serverResponse = this.a);
    return a;
  };
  t.prototype.toJSON = function() {
    return this.w();
  };
  function Aa(a) {
    var b = a && a.code;
    return b ? new t(b.substring(xa.length), a.message, a.serverResponse) : null;
  }
  var xa = "auth/", za = {
    "admin-restricted-operation": "This operation is restricted to administrators only.",
    "argument-error": "",
    "app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
    "app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
    "captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
    "code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
    "cordova-not-ready": "Cordova framework is not ready.",
    "cors-unsupported": "This browser is not supported.",
    "credential-already-in-use": "This credential is already associated with a different user account.",
    "custom-token-mismatch": "The custom token corresponds to a different audience.",
    "requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
    "dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
    "email-change-needs-verification": "Multi-factor users must always have a verified email.",
    "email-already-in-use": "The email address is already in use by another account.",
    "expired-action-code": "The action code has expired. ",
    "cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
    "internal-error": "An internal error has occurred.",
    "invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
    "invalid-app-id": "The mobile app identifier is not registed for the current project.",
    "invalid-user-token": "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
    "invalid-auth-event": "An internal error has occurred.",
    "invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",
    "invalid-continue-uri": "The continue URL provided in the request is invalid.",
    "invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
    "invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
    "invalid-dynamic-link-domain": "The provided dynamic link domain is not configured or authorized for the current project.",
    "invalid-email": "The email address is badly formatted.",
    "invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
    "invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
    "invalid-credential": "The supplied auth credential is malformed or has expired.",
    "invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
    "invalid-multi-factor-session": "The request does not contain a valid proof of first factor successful sign-in.",
    "invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
    "invalid-oauth-client-id": "The OAuth client ID provided is either invalid or does not match the specified API key.",
    "unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
    "invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
    "wrong-password": "The password is invalid or the user does not have a password.",
    "invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
    "invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
    "invalid-provider-id": "The specified provider ID is invalid.",
    "invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
    "invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
    "invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
    "invalid-tenant-id": "The Auth instance's tenant ID is invalid.",
    "multi-factor-info-not-found": "The user does not have a second factor matching the identifier provided.",
    "multi-factor-auth-required": "Proof of ownership of a second factor is required to complete sign-in.",
    "missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
    "auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
    "missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
    "missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
    "missing-continue-uri": "A continue URL must be provided in the request.",
    "missing-iframe-start": "An internal error has occurred.",
    "missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
    "missing-multi-factor-info": "No second factor identifier is provided.",
    "missing-multi-factor-session": "The request is missing proof of first factor successful sign-in.",
    "missing-or-invalid-nonce": "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
    "missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
    "missing-verification-id": "The phone auth credential was created with an empty verification ID.",
    "app-deleted": "This instance of FirebaseApp has been deleted.",
    "account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
    "network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
    "no-auth-event": "An internal error has occurred.",
    "no-such-provider": "User was not linked to an account with the given provider.",
    "null-user": "A null user object was provided as the argument for an operation which requires a non-null user object.",
    "operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
    "operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
    "popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
    "popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
    "provider-already-linked": "User can only be linked to one identity for the given provider.",
    "quota-exceeded": "The project's quota for this operation has been exceeded.",
    "redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
    "redirect-operation-pending": "A redirect sign-in operation is already pending.",
    "rejected-credential": "The request contains malformed or mismatching credentials.",
    "second-factor-already-in-use": "The second factor is already enrolled on this account.",
    "maximum-second-factor-count-exceeded": "The maximum allowed number of second factors on a user has been exceeded.",
    "tenant-id-mismatch": "The provided tenant ID does not match the Auth instance's tenant ID",
    timeout: "The operation has timed out.",
    "user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
    "too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
    "unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
    "unsupported-first-factor": "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
    "unsupported-persistence-type": "The current environment does not support the specified persistence type.",
    "unsupported-tenant-operation": "This operation is not supported in a multi-tenant context.",
    "unverified-email": "The operation requires a verified email.",
    "user-cancelled": "The user did not grant your application the permissions it requested.",
    "user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
    "user-disabled": "The user account has been disabled by an administrator.",
    "user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
    "user-signed-out": "",
    "weak-password": "The password must be 6 characters long or more.",
    "web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled."
  };
  var Ba = {
    ld: {
      Ua: "https://staging-identitytoolkit.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/",
      $a: "https://staging-securetoken.sandbox.googleapis.com/v1/token",
      Xa: "https://staging-identitytoolkit.sandbox.googleapis.com/v2/",
      id: "b"
    },
    sd: {
      Ua: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/",
      $a: "https://securetoken.googleapis.com/v1/token",
      Xa: "https://identitytoolkit.googleapis.com/v2/",
      id: "p"
    },
    ud: {
      Ua: "https://staging-www.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/",
      $a: "https://staging-securetoken.sandbox.googleapis.com/v1/token",
      Xa: "https://staging-identitytoolkit.sandbox.googleapis.com/v2/",
      id: "s"
    },
    vd: {
      Ua: "https://www-googleapis-test.sandbox.google.com/identitytoolkit/v3/relyingparty/",
      $a: "https://test-securetoken.sandbox.googleapis.com/v1/token",
      Xa: "https://test-identitytoolkit.sandbox.googleapis.com/v2/",
      id: "t"
    }
  };
  function Ca(a) {
    for (var b in Ba) if (Ba[b].id === a) return a = Ba[b], {
      firebaseEndpoint: a.Ua,
      secureTokenEndpoint: a.$a,
      identityPlatformEndpoint: a.Xa
    };
    return null;
  }
  var Da;
  Da = Ca("__EID__") ? "__EID__" : void 0;
  function Ea(a) {
    if (!a) return false;
    try {
      return !!a.$goog_Thenable;
    } catch (b) {
      return false;
    }
  }
  ;
  function u(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, u);
    else {
      var b = Error().stack;
      b && (this.stack = b);
    }
    a && (this.message = String(a));
  }
  r(u, Error);
  u.prototype.name = "CustomError";
  function Fa(a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
    u.call(this, c + a[d]);
  }
  r(Fa, u);
  Fa.prototype.name = "AssertionError";
  function Ga(a, b) {
    throw new Fa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
  ;
  function Ha(a, b) {
    this.c = a;
    this.f = b;
    this.b = 0;
    this.a = null;
  }
  Ha.prototype.get = function() {
    if (0 < this.b) {
      this.b--;
      var a = this.a;
      this.a = a.next;
      a.next = null;
    } else a = this.c();
    return a;
  };
  function Ia(a, b) {
    a.f(b);
    100 > a.b && (a.b++, b.next = a.a, a.a = b);
  }
  ;
  function Ja() {
    this.b = this.a = null;
  }
  var La = new Ha(function() {
    return new Ka();
  }, function(a) {
    a.reset();
  });
  Ja.prototype.add = function(a, b) {
    var c = La.get();
    c.set(a, b);
    this.b ? this.b.next = c : this.a = c;
    this.b = c;
  };
  function Ma() {
    var a = Na, b = null;
    a.a && (b = a.a, a.a = a.a.next, a.a || (a.b = null), b.next = null);
    return b;
  }
  function Ka() {
    this.next = this.b = this.a = null;
  }
  Ka.prototype.set = function(a, b) {
    this.a = a;
    this.b = b;
    this.next = null;
  };
  Ka.prototype.reset = function() {
    this.next = this.b = this.a = null;
  };
  var Oa = Array.prototype.indexOf ? function(a, b) {
    return Array.prototype.indexOf.call(a, b, void 0);
  } : function(a, b) {
    if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
    for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
    return -1;
  }, w = Array.prototype.forEach ? function(a, b, c) {
    Array.prototype.forEach.call(a, b, c);
  } : function(a, b, c) {
    for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a);
  };
  function Pa(a, b) {
    for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; --d) d in c && b.call(void 0, c[d], d, a);
  }
  var Qa = Array.prototype.filter ? function(a, b) {
    return Array.prototype.filter.call(a, b, void 0);
  } : function(a, b) {
    for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++) if (g in f) {
      var h = f[g];
      b.call(void 0, h, g, a) && (d[e++] = h);
    }
    return d;
  }, Ra = Array.prototype.map ? function(a, b) {
    return Array.prototype.map.call(a, b, void 0);
  } : function(a, b) {
    for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
    return d;
  }, Sa = Array.prototype.some ? function(a, b) {
    return Array.prototype.some.call(a, b, void 0);
  } : function(a, b) {
    for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) return true;
    return false;
  };
  function Ta(a) {
    a: {
      var b = Ua;
      for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) {
        b = e;
        break a;
      }
      b = -1;
    }
    return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
  }
  function Va(a, b) {
    return 0 <= Oa(a, b);
  }
  function Wa(a, b) {
    b = Oa(a, b);
    var c;
    (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
    return c;
  }
  function Xa(a, b) {
    var c = 0;
    Pa(a, function(d, e) {
      b.call(void 0, d, e, a) && 1 == Array.prototype.splice.call(a, e, 1).length && c++;
    });
  }
  function Ya(a) {
    return Array.prototype.concat.apply([], arguments);
  }
  function Za(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  ;
  var $a = String.prototype.trim ? function(a) {
    return a.trim();
  } : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
  }, ab = /&/g, bb = /</g, cb = />/g, db = /"/g, eb = /'/g, fb = /\x00/g, gb = /[\x00&<>"']/;
  function x(a, b) {
    return -1 != a.indexOf(b);
  }
  function hb(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  ;
  var ib;
  a: {
    var jb = l.navigator;
    if (jb) {
      var kb = jb.userAgent;
      if (kb) {
        ib = kb;
        break a;
      }
    }
    ib = "";
  }
  function y(a) {
    return x(ib, a);
  }
  ;
  function lb(a, b) {
    for (var c in a) b.call(void 0, a[c], c, a);
  }
  function mb(a) {
    for (var b in a) return false;
    return true;
  }
  function nb(a) {
    var b = {}, c;
    for (c in a) b[c] = a[c];
    return b;
  }
  var ob = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
  function z(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (var f = 0; f < ob.length; f++) c = ob[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  ;
  function pb(a, b) {
    a: {
      try {
        var c = a && a.ownerDocument, d = c && (c.defaultView || c.parentWindow);
        d = d || l;
        if (d.Element && d.Location) {
          var e = d;
          break a;
        }
      } catch (g) {
      }
      e = null;
    }
    if (e && "undefined" != typeof e[b] && (!a || !(a instanceof e[b]) && (a instanceof e.Location || a instanceof e.Element))) {
      if (n(a)) try {
        var f = a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a);
      } catch (g) {
        f = "<object could not be stringified>";
      }
      else f = void 0 === a ? "undefined" : null === a ? "null" : typeof a;
      Ga("Argument is not a %s (or a non-Element, non-Location mock); got: %s", b, f);
    }
  }
  ;
  function qb(a, b) {
    this.a = a === rb && b || "";
    this.b = sb;
  }
  qb.prototype.ta = true;
  qb.prototype.sa = function() {
    return this.a;
  };
  qb.prototype.toString = function() {
    return "Const{" + this.a + "}";
  };
  function tb(a) {
    if (a instanceof qb && a.constructor === qb && a.b === sb) return a.a;
    Ga("expected object of type Const, got '" + a + "'");
    return "type_error:Const";
  }
  var sb = {}, rb = {};
  var ub;
  function vb() {
    if (void 0 === ub) {
      var a = null, b = l.trustedTypes;
      if (b && b.createPolicy) {
        try {
          a = b.createPolicy("goog#html", {
            createHTML: wa,
            createScript: wa,
            createScriptURL: wa
          });
        } catch (c) {
          l.console && l.console.error(c.message);
        }
        ub = a;
      } else ub = a;
    }
    return ub;
  }
  ;
  function wb(a, b) {
    this.a = b === xb ? a : "";
  }
  wb.prototype.ta = true;
  wb.prototype.sa = function() {
    return this.a.toString();
  };
  wb.prototype.toString = function() {
    return "TrustedResourceUrl{" + this.a + "}";
  };
  function yb(a) {
    if (a instanceof wb && a.constructor === wb) return a.a;
    Ga("expected object of type TrustedResourceUrl, got '" + a + "' of type " + ma(a));
    return "type_error:TrustedResourceUrl";
  }
  function zb(a, b) {
    var c = tb(a);
    if (!Ab.test(c)) throw Error("Invalid TrustedResourceUrl format: " + c);
    a = c.replace(Bb, function(d, e) {
      if (!Object.prototype.hasOwnProperty.call(b, e)) throw Error('Found marker, "' + e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
      d = b[e];
      return d instanceof qb ? tb(d) : encodeURIComponent(String(d));
    });
    return Cb(a);
  }
  var Bb = /%{(\w+)}/g, Ab = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i, xb = {};
  function Cb(a) {
    var b = vb();
    a = b ? b.createScriptURL(a) : a;
    return new wb(a, xb);
  }
  ;
  function C(a, b) {
    this.a = b === Db ? a : "";
  }
  C.prototype.ta = true;
  C.prototype.sa = function() {
    return this.a.toString();
  };
  C.prototype.toString = function() {
    return "SafeUrl{" + this.a + "}";
  };
  function Eb(a) {
    if (a instanceof C && a.constructor === C) return a.a;
    Ga("expected object of type SafeUrl, got '" + a + "' of type " + ma(a));
    return "type_error:SafeUrl";
  }
  var Fb = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font\/\w+|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i, Gb = /^data:(.*);base64,[a-z0-9+\/]+=*$/i, Hb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
  function Ib(a) {
    if (a instanceof C) return a;
    a = "object" == typeof a && a.ta ? a.sa() : String(a);
    if (Hb.test(a)) a = new C(a, Db);
    else {
      a = String(a);
      a = a.replace(/(%0A|%0D)/g, "");
      var b = a.match(Gb);
      a = b && Fb.test(b[1]) ? new C(a, Db) : null;
    }
    return a;
  }
  function Jb(a) {
    if (a instanceof C) return a;
    a = "object" == typeof a && a.ta ? a.sa() : String(a);
    Hb.test(a) || (a = "about:invalid#zClosurez");
    return new C(a, Db);
  }
  var Db = {}, Kb = new C("about:invalid#zClosurez", Db);
  function Lb(a, b, c) {
    this.a = c === Mb ? a : "";
  }
  Lb.prototype.ta = true;
  Lb.prototype.sa = function() {
    return this.a.toString();
  };
  Lb.prototype.toString = function() {
    return "SafeHtml{" + this.a + "}";
  };
  function Nb(a) {
    if (a instanceof Lb && a.constructor === Lb) return a.a;
    Ga("expected object of type SafeHtml, got '" + a + "' of type " + ma(a));
    return "type_error:SafeHtml";
  }
  var Mb = {};
  function Ob(a, b) {
    pb(a, "HTMLScriptElement");
    a.src = yb(b);
    (b = a.ownerDocument && a.ownerDocument.defaultView) && b != l ? b = ka(b.document) : (null === ja && (ja = ka(l.document)), b = ja);
    b && a.setAttribute("nonce", b);
  }
  function Pb(a, b, c, d) {
    a = a instanceof C ? a : Jb(a);
    b = b || l;
    c = c instanceof qb ? tb(c) : c || "";
    return b.open(Eb(a), c, d, void 0);
  }
  ;
  function Qb(a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length; ) d += c.shift() + e.shift();
    return d + c.join("%s");
  }
  function Rb(a) {
    gb.test(a) && (-1 != a.indexOf("&") && (a = a.replace(ab, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(bb, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(cb, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(db, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(eb, "&#39;")), -1 != a.indexOf("\0") && (a = a.replace(fb, "&#0;")));
    return a;
  }
  ;
  function Sb(a) {
    Sb[" "](a);
    return a;
  }
  Sb[" "] = la;
  function Tb(a, b) {
    var c = Ub;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a);
  }
  ;
  var Vb = y("Opera"), Wb = y("Trident") || y("MSIE"), Xb = y("Edge"), Yb = Xb || Wb, Zb = y("Gecko") && !(x(ib.toLowerCase(), "webkit") && !y("Edge")) && !(y("Trident") || y("MSIE")) && !y("Edge"), $b = x(ib.toLowerCase(), "webkit") && !y("Edge");
  function ac() {
    var a = l.document;
    return a ? a.documentMode : void 0;
  }
  var bc;
  a: {
    var cc = "", dc = function() {
      var a = ib;
      if (Zb) return /rv:([^\);]+)(\)|;)/.exec(a);
      if (Xb) return /Edge\/([\d\.]+)/.exec(a);
      if (Wb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
      if ($b) return /WebKit\/(\S+)/.exec(a);
      if (Vb) return /(?:Version)[ \/]?(\S+)/.exec(a);
    }();
    dc && (cc = dc ? dc[1] : "");
    if (Wb) {
      var ec = ac();
      if (null != ec && ec > parseFloat(cc)) {
        bc = String(ec);
        break a;
      }
    }
    bc = cc;
  }
  var Ub = {};
  function fc(a) {
    return Tb(a, function() {
      for (var b = 0, c = $a(String(bc)).split("."), d = $a(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
        var g = c[f] || "", h = d[f] || "";
        do {
          g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
          h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
          if (0 == g[0].length && 0 == h[0].length) break;
          b = hb(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || hb(0 == g[2].length, 0 == h[2].length) || hb(g[2], h[2]);
          g = g[3];
          h = h[3];
        } while (0 == b);
      }
      return 0 <= b;
    });
  }
  var gc;
  if (l.document && Wb) {
    var hc = ac();
    gc = hc ? hc : parseInt(bc, 10) || void 0;
  } else gc = void 0;
  var ic = gc;
  try {
    new self.OffscreenCanvas(0, 0).getContext("2d");
  } catch (a) {
  }
  var jc = !Wb || 9 <= Number(ic);
  function kc(a) {
    var b = document;
    return "string" === typeof a ? b.getElementById(a) : a;
  }
  function lc(a, b) {
    lb(b, function(c, d) {
      c && "object" == typeof c && c.ta && (c = c.sa());
      "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : mc.hasOwnProperty(d) ? a.setAttribute(mc[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c;
    });
  }
  var mc = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
  };
  function nc(a, b, c) {
    var d = arguments, e = document, f = String(d[0]), g = d[1];
    if (!jc && g && (g.name || g.type)) {
      f = ["<", f];
      g.name && f.push(' name="', Rb(g.name), '"');
      if (g.type) {
        f.push(' type="', Rb(g.type), '"');
        var h = {};
        z(h, g);
        delete h.type;
        g = h;
      }
      f.push(">");
      f = f.join("");
    }
    f = oc(e, f);
    g && ("string" === typeof g ? f.className = g : Array.isArray(g) ? f.className = g.join(" ") : lc(f, g));
    2 < d.length && pc(e, f, d);
    return f;
  }
  function pc(a, b, c) {
    function d(h) {
      h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h);
    }
    for (var e = 2; e < c.length; e++) {
      var f = c[e];
      if (!na(f) || n(f) && 0 < f.nodeType) d(f);
      else {
        a: {
          if (f && "number" == typeof f.length) {
            if (n(f)) {
              var g = "function" == typeof f.item || "string" == typeof f.item;
              break a;
            }
            if (oa(f)) {
              g = "function" == typeof f.item;
              break a;
            }
          }
          g = false;
        }
        w(g ? Za(f) : f, d);
      }
    }
  }
  function oc(a, b) {
    b = String(b);
    "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
    return a.createElement(b);
  }
  ;
  function qc(a) {
    l.setTimeout(function() {
      throw a;
    }, 0);
  }
  var rc;
  function sc() {
    var a = l.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !y("Presto") && (a = function() {
      var e = oc(document, "IFRAME");
      e.style.display = "none";
      document.documentElement.appendChild(e);
      var f = e.contentWindow;
      e = f.document;
      e.open();
      e.close();
      var g = "callImmediate" + Math.random(), h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
      e = q(function(m) {
        if (("*" == h || m.origin == h) && m.data == g) this.port1.onmessage();
      }, this);
      f.addEventListener("message", e, false);
      this.port1 = {};
      this.port2 = {
        postMessage: function() {
          f.postMessage(g, h);
        }
      };
    });
    if ("undefined" !== typeof a && !y("Trident") && !y("MSIE")) {
      var b = new a(), c = {}, d = c;
      b.port1.onmessage = function() {
        if (void 0 !== c.next) {
          c = c.next;
          var e = c.Hb;
          c.Hb = null;
          e();
        }
      };
      return function(e) {
        d.next = {
          Hb: e
        };
        d = d.next;
        b.port2.postMessage(0);
      };
    }
    return function(e) {
      l.setTimeout(e, 0);
    };
  }
  ;
  function tc(a, b) {
    uc || vc();
    wc || (uc(), wc = true);
    Na.add(a, b);
  }
  var uc;
  function vc() {
    if (l.Promise && l.Promise.resolve) {
      var a = l.Promise.resolve(void 0);
      uc = function() {
        a.then(xc);
      };
    } else uc = function() {
      var b = xc;
      !oa(l.setImmediate) || l.Window && l.Window.prototype && !y("Edge") && l.Window.prototype.setImmediate == l.setImmediate ? (rc || (rc = sc()), rc(b)) : l.setImmediate(b);
    };
  }
  var wc = false, Na = new Ja();
  function xc() {
    for (var a; a = Ma(); ) {
      try {
        a.a.call(a.b);
      } catch (b) {
        qc(b);
      }
      Ia(La, a);
    }
    wc = false;
  }
  ;
  function D(a, b) {
    this.a = yc;
    this.i = void 0;
    this.f = this.b = this.c = null;
    this.g = this.h = false;
    if (a != la) try {
      var c = this;
      a.call(b, function(d) {
        zc(c, Ac, d);
      }, function(d) {
        if (!(d instanceof Bc)) try {
          if (d instanceof Error) throw d;
          throw Error("Promise rejected.");
        } catch (e) {
        }
        zc(c, Cc, d);
      });
    } catch (d) {
      zc(this, Cc, d);
    }
  }
  var yc = 0, Ac = 2, Cc = 3;
  function Dc() {
    this.next = this.f = this.b = this.g = this.a = null;
    this.c = false;
  }
  Dc.prototype.reset = function() {
    this.f = this.b = this.g = this.a = null;
    this.c = false;
  };
  var Ec = new Ha(function() {
    return new Dc();
  }, function(a) {
    a.reset();
  });
  function Fc(a, b, c) {
    var d = Ec.get();
    d.g = a;
    d.b = b;
    d.f = c;
    return d;
  }
  function E(a) {
    if (a instanceof D) return a;
    var b = new D(la);
    zc(b, Ac, a);
    return b;
  }
  function F(a) {
    return new D(function(b, c) {
      c(a);
    });
  }
  function Gc(a, b, c) {
    Hc(a, b, c, null) || tc(ua(b, a));
  }
  function Ic(a) {
    return new D(function(b, c) {
      var d = a.length, e = [];
      if (d) for (var f = function(p, v) {
        d--;
        e[p] = v;
        0 == d && b(e);
      }, g = function(p) {
        c(p);
      }, h = 0, m; h < a.length; h++) m = a[h], Gc(m, ua(f, h), g);
      else b(e);
    });
  }
  function Jc(a) {
    return new D(function(b) {
      var c = a.length, d = [];
      if (c) for (var e = function(h, m, p) {
        c--;
        d[h] = m ? {
          Qb: true,
          value: p
        } : {
          Qb: false,
          reason: p
        };
        0 == c && b(d);
      }, f = 0, g; f < a.length; f++) g = a[f], Gc(g, ua(e, f, true), ua(e, f, false));
      else b(d);
    });
  }
  D.prototype.then = function(a, b, c) {
    return Kc(this, oa(a) ? a : null, oa(b) ? b : null, c);
  };
  D.prototype.$goog_Thenable = true;
  k = D.prototype;
  k.oa = function(a, b) {
    a = Fc(a, a, b);
    a.c = true;
    Lc(this, a);
    return this;
  };
  k.o = function(a, b) {
    return Kc(this, null, a, b);
  };
  k.cancel = function(a) {
    if (this.a == yc) {
      var b = new Bc(a);
      tc(function() {
        Mc(this, b);
      }, this);
    }
  };
  function Mc(a, b) {
    if (a.a == yc) if (a.c) {
      var c = a.c;
      if (c.b) {
        for (var d = 0, e = null, f = null, g = c.b; g && (g.c || (d++, g.a == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
        e && (c.a == yc && 1 == d ? Mc(c, b) : (f ? (d = f, d.next == c.f && (c.f = d), d.next = d.next.next) : Nc(c), Oc(c, e, Cc, b)));
      }
      a.c = null;
    } else zc(a, Cc, b);
  }
  function Lc(a, b) {
    a.b || a.a != Ac && a.a != Cc || Pc(a);
    a.f ? a.f.next = b : a.b = b;
    a.f = b;
  }
  function Kc(a, b, c, d) {
    var e = Fc(null, null, null);
    e.a = new D(function(f, g) {
      e.g = b ? function(h) {
        try {
          var m = b.call(d, h);
          f(m);
        } catch (p) {
          g(p);
        }
      } : f;
      e.b = c ? function(h) {
        try {
          var m = c.call(d, h);
          void 0 === m && h instanceof Bc ? g(h) : f(m);
        } catch (p) {
          g(p);
        }
      } : g;
    });
    e.a.c = a;
    Lc(a, e);
    return e.a;
  }
  k.$c = function(a) {
    this.a = yc;
    zc(this, Ac, a);
  };
  k.ad = function(a) {
    this.a = yc;
    zc(this, Cc, a);
  };
  function zc(a, b, c) {
    a.a == yc && (a === c && (b = Cc, c = new TypeError("Promise cannot resolve to itself")), a.a = 1, Hc(c, a.$c, a.ad, a) || (a.i = c, a.a = b, a.c = null, Pc(a), b != Cc || c instanceof Bc || Qc(a, c)));
  }
  function Hc(a, b, c, d) {
    if (a instanceof D) return Lc(a, Fc(b || la, c || null, d)), true;
    if (Ea(a)) return a.then(b, c, d), true;
    if (n(a)) try {
      var e = a.then;
      if (oa(e)) return Rc(a, e, b, c, d), true;
    } catch (f) {
      return c.call(d, f), true;
    }
    return false;
  }
  function Rc(a, b, c, d, e) {
    function f(m) {
      h || (h = true, d.call(e, m));
    }
    function g(m) {
      h || (h = true, c.call(e, m));
    }
    var h = false;
    try {
      b.call(a, g, f);
    } catch (m) {
      f(m);
    }
  }
  function Pc(a) {
    a.h || (a.h = true, tc(a.gc, a));
  }
  function Nc(a) {
    var b = null;
    a.b && (b = a.b, a.b = b.next, b.next = null);
    a.b || (a.f = null);
    return b;
  }
  k.gc = function() {
    for (var a; a = Nc(this); ) Oc(this, a, this.a, this.i);
    this.h = false;
  };
  function Oc(a, b, c, d) {
    if (c == Cc && b.b && !b.c) for (; a && a.g; a = a.c) a.g = false;
    if (b.a) b.a.c = null, Sc(b, c, d);
    else try {
      b.c ? b.g.call(b.f) : Sc(b, c, d);
    } catch (e) {
      Tc.call(null, e);
    }
    Ia(Ec, b);
  }
  function Sc(a, b, c) {
    b == Ac ? a.g.call(a.f, c) : a.b && a.b.call(a.f, c);
  }
  function Qc(a, b) {
    a.g = true;
    tc(function() {
      a.g && Tc.call(null, b);
    });
  }
  var Tc = qc;
  function Bc(a) {
    u.call(this, a);
  }
  r(Bc, u);
  Bc.prototype.name = "cancel";
  function Uc() {
    0 != Vc && (Wc[pa(this)] = this);
    this.ya = this.ya;
    this.pa = this.pa;
  }
  var Vc = 0, Wc = {};
  Uc.prototype.ya = false;
  function Xc(a) {
    if (!a.ya && (a.ya = true, a.Da(), 0 != Vc)) {
      var b = pa(a);
      if (0 != Vc && a.pa && 0 < a.pa.length) throw Error(a + " did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");
      delete Wc[b];
    }
  }
  Uc.prototype.Da = function() {
    if (this.pa) for (; this.pa.length; ) this.pa.shift()();
  };
  var Yc = Object.freeze || function(a) {
    return a;
  };
  var Zc = !Wb || 9 <= Number(ic), $c = Wb && !fc("9"), ad = function() {
    if (!l.addEventListener || !Object.defineProperty) return false;
    var a = false, b = Object.defineProperty({}, "passive", {
      get: function() {
        a = true;
      }
    });
    try {
      l.addEventListener("test", la, b), l.removeEventListener("test", la, b);
    } catch (c) {
    }
    return a;
  }();
  function G(a, b) {
    this.type = a;
    this.b = this.target = b;
    this.defaultPrevented = false;
  }
  G.prototype.preventDefault = function() {
    this.defaultPrevented = true;
  };
  function bd(a, b) {
    G.call(this, a ? a.type : "");
    this.relatedTarget = this.b = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
    this.pointerId = 0;
    this.pointerType = "";
    this.a = null;
    if (a) {
      var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
      this.target = a.target || a.srcElement;
      this.b = b;
      if (b = a.relatedTarget) {
        if (Zb) {
          a: {
            try {
              Sb(b.nodeName);
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
      this.pointerType = "string" === typeof a.pointerType ? a.pointerType : cd[a.pointerType] || "";
      this.a = a;
      a.defaultPrevented && this.preventDefault();
    }
  }
  r(bd, G);
  var cd = Yc({
    2: "touch",
    3: "pen",
    4: "mouse"
  });
  bd.prototype.preventDefault = function() {
    bd.bb.preventDefault.call(this);
    var a = this.a;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = false, $c) try {
      if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1;
    } catch (b) {
    }
  };
  bd.prototype.g = function() {
    return this.a;
  };
  var dd = "closure_listenable_" + (1e6 * Math.random() | 0), ed = 0;
  function fd(a, b, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.Wa = e;
    this.key = ++ed;
    this.wa = this.Qa = false;
  }
  function gd(a) {
    a.wa = true;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.Wa = null;
  }
  ;
  function hd(a) {
    this.src = a;
    this.a = {};
    this.b = 0;
  }
  hd.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.a[f];
    a || (a = this.a[f] = [], this.b++);
    var g = id(a, b, d, e);
    -1 < g ? (b = a[g], c || (b.Qa = false)) : (b = new fd(b, this.src, f, !!d, e), b.Qa = c, a.push(b));
    return b;
  };
  function jd(a, b) {
    var c = b.type;
    c in a.a && Wa(a.a[c], b) && (gd(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
  }
  function id(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.wa && f.listener == b && f.capture == !!c && f.Wa == d) return e;
    }
    return -1;
  }
  ;
  var kd = "closure_lm_" + (1e6 * Math.random() | 0), ld = {}, md = 0;
  function nd(a, b, c, d, e) {
    if (d && d.once) od(a, b, c, d, e);
    else if (Array.isArray(b)) for (var f = 0; f < b.length; f++) nd(a, b[f], c, d, e);
    else c = pd(c), a && a[dd] ? qd(a, b, c, n(d) ? !!d.capture : !!d, e) : rd(a, b, c, false, d, e);
  }
  function rd(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = n(e) ? !!e.capture : !!e, h = sd(a);
    h || (a[kd] = h = new hd(a));
    c = h.add(b, c, d, g, f);
    if (!c.proxy) {
      d = td();
      c.proxy = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener) ad || (e = g), void 0 === e && (e = false), a.addEventListener(b.toString(), d, e);
      else if (a.attachEvent) a.attachEvent(ud(b.toString()), d);
      else if (a.addListener && a.removeListener) a.addListener(d);
      else throw Error("addEventListener and attachEvent are unavailable.");
      md++;
    }
  }
  function td() {
    var a = vd, b = Zc ? function(c) {
      return a.call(b.src, b.listener, c);
    } : function(c) {
      c = a.call(b.src, b.listener, c);
      if (!c) return c;
    };
    return b;
  }
  function od(a, b, c, d, e) {
    if (Array.isArray(b)) for (var f = 0; f < b.length; f++) od(a, b[f], c, d, e);
    else c = pd(c), a && a[dd] ? wd(a, b, c, n(d) ? !!d.capture : !!d, e) : rd(a, b, c, true, d, e);
  }
  function xd(a, b, c, d, e) {
    if (Array.isArray(b)) for (var f = 0; f < b.length; f++) xd(a, b[f], c, d, e);
    else (d = n(d) ? !!d.capture : !!d, c = pd(c), a && a[dd]) ? (a = a.v, b = String(b).toString(), b in a.a && (f = a.a[b], c = id(f, c, d, e), -1 < c && (gd(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.a[b], a.b--)))) : a && (a = sd(a)) && (b = a.a[b.toString()], a = -1, b && (a = id(b, c, d, e)), (c = -1 < a ? b[a] : null) && yd(c));
  }
  function yd(a) {
    if ("number" !== typeof a && a && !a.wa) {
      var b = a.src;
      if (b && b[dd]) jd(b.v, a);
      else {
        var c = a.type, d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(ud(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        md--;
        (c = sd(b)) ? (jd(c, a), 0 == c.b && (c.src = null, b[kd] = null)) : gd(a);
      }
    }
  }
  function ud(a) {
    return a in ld ? ld[a] : ld[a] = "on" + a;
  }
  function zd(a, b, c, d) {
    var e = true;
    if (a = sd(a)) {
      if (b = a.a[b.toString()]) for (b = b.concat(), a = 0; a < b.length; a++) {
        var f = b[a];
        f && f.capture == c && !f.wa && (f = Bd(f, d), e = e && false !== f);
      }
    }
    return e;
  }
  function Bd(a, b) {
    var c = a.listener, d = a.Wa || a.src;
    a.Qa && yd(a);
    return c.call(d, b);
  }
  function vd(a, b) {
    if (a.wa) return true;
    if (!Zc) {
      if (!b) a: {
        b = ["window", "event"];
        for (var c = l, d = 0; d < b.length; d++) if (c = c[b[d]], null == c) {
          b = null;
          break a;
        }
        b = c;
      }
      d = b;
      b = new bd(d, this);
      c = true;
      if (!(0 > d.keyCode || void 0 != d.returnValue)) {
        a: {
          var e = false;
          if (0 == d.keyCode) try {
            d.keyCode = -1;
            break a;
          } catch (g) {
            e = true;
          }
          if (e || void 0 == d.returnValue) d.returnValue = true;
        }
        d = [];
        for (e = b.b; e; e = e.parentNode) d.push(e);
        a = a.type;
        for (e = d.length - 1; 0 <= e; e--) {
          b.b = d[e];
          var f = zd(d[e], a, true, b);
          c = c && f;
        }
        for (e = 0; e < d.length; e++) b.b = d[e], f = zd(d[e], a, false, b), c = c && f;
      }
      return c;
    }
    return Bd(a, new bd(b, this));
  }
  function sd(a) {
    a = a[kd];
    return a instanceof hd ? a : null;
  }
  var Cd = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
  function pd(a) {
    if (oa(a)) return a;
    a[Cd] || (a[Cd] = function(b) {
      return a.handleEvent(b);
    });
    return a[Cd];
  }
  ;
  function H() {
    Uc.call(this);
    this.v = new hd(this);
    this.bc = this;
    this.hb = null;
  }
  r(H, Uc);
  H.prototype[dd] = true;
  H.prototype.addEventListener = function(a, b, c, d) {
    nd(this, a, b, c, d);
  };
  H.prototype.removeEventListener = function(a, b, c, d) {
    xd(this, a, b, c, d);
  };
  H.prototype.dispatchEvent = function(a) {
    var b, c = this.hb;
    if (c) for (b = []; c; c = c.hb) b.push(c);
    c = this.bc;
    var d = a.type || a;
    if ("string" === typeof a) a = new G(a, c);
    else if (a instanceof G) a.target = a.target || c;
    else {
      var e = a;
      a = new G(d, c);
      z(a, e);
    }
    e = true;
    if (b) for (var f = b.length - 1; 0 <= f; f--) {
      var g = a.b = b[f];
      e = Dd(g, d, true, a) && e;
    }
    g = a.b = c;
    e = Dd(g, d, true, a) && e;
    e = Dd(g, d, false, a) && e;
    if (b) for (f = 0; f < b.length; f++) g = a.b = b[f], e = Dd(g, d, false, a) && e;
    return e;
  };
  H.prototype.Da = function() {
    H.bb.Da.call(this);
    if (this.v) {
      var a = this.v, b = 0, c;
      for (c in a.a) {
        for (var d = a.a[c], e = 0; e < d.length; e++) ++b, gd(d[e]);
        delete a.a[c];
        a.b--;
      }
    }
    this.hb = null;
  };
  function qd(a, b, c, d, e) {
    a.v.add(String(b), c, false, d, e);
  }
  function wd(a, b, c, d, e) {
    a.v.add(String(b), c, true, d, e);
  }
  function Dd(a, b, c, d) {
    b = a.v.a[String(b)];
    if (!b) return true;
    b = b.concat();
    for (var e = true, f = 0; f < b.length; ++f) {
      var g = b[f];
      if (g && !g.wa && g.capture == c) {
        var h = g.listener, m = g.Wa || g.src;
        g.Qa && jd(a.v, g);
        e = false !== h.call(m, d) && e;
      }
    }
    return e && !d.defaultPrevented;
  }
  ;
  function Ed(a, b, c) {
    if (oa(a)) c && (a = q(a, c));
    else if (a && "function" == typeof a.handleEvent) a = q(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : l.setTimeout(a, b || 0);
  }
  function Fd(a) {
    var b = null;
    return new D(function(c, d) {
      b = Ed(function() {
        c(void 0);
      }, a);
      -1 == b && d(Error("Failed to schedule timer."));
    }).o(function(c) {
      l.clearTimeout(b);
      throw c;
    });
  }
  ;
  function Gd(a) {
    if (a.X && "function" == typeof a.X) return a.X();
    if ("string" === typeof a) return a.split("");
    if (na(a)) {
      for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
      return b;
    }
    b = [];
    c = 0;
    for (d in a) b[c++] = a[d];
    return b;
  }
  function Hd(a) {
    if (a.Y && "function" == typeof a.Y) return a.Y();
    if (!a.X || "function" != typeof a.X) {
      if (na(a) || "string" === typeof a) {
        var b = [];
        a = a.length;
        for (var c = 0; c < a; c++) b.push(c);
        return b;
      }
      b = [];
      c = 0;
      for (var d in a) b[c++] = d;
      return b;
    }
  }
  function Id(a, b) {
    if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0);
    else if (na(a) || "string" === typeof a) w(a, b, void 0);
    else for (var c = Hd(a), d = Gd(a), e = d.length, f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a);
  }
  ;
  function Jd(a, b) {
    this.b = {};
    this.a = [];
    this.c = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) throw Error("Uneven number of arguments");
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else if (a) if (a instanceof Jd) for (c = a.Y(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
    else for (d in a) this.set(d, a[d]);
  }
  k = Jd.prototype;
  k.X = function() {
    Kd(this);
    for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);
    return a;
  };
  k.Y = function() {
    Kd(this);
    return this.a.concat();
  };
  k.clear = function() {
    this.b = {};
    this.c = this.a.length = 0;
  };
  function Kd(a) {
    if (a.c != a.a.length) {
      for (var b = 0, c = 0; b < a.a.length; ) {
        var d = a.a[b];
        Ld(a.b, d) && (a.a[c++] = d);
        b++;
      }
      a.a.length = c;
    }
    if (a.c != a.a.length) {
      var e = {};
      for (c = b = 0; b < a.a.length; ) d = a.a[b], Ld(e, d) || (a.a[c++] = d, e[d] = 1), b++;
      a.a.length = c;
    }
  }
  k.get = function(a, b) {
    return Ld(this.b, a) ? this.b[a] : b;
  };
  k.set = function(a, b) {
    Ld(this.b, a) || (this.c++, this.a.push(a));
    this.b[a] = b;
  };
  k.forEach = function(a, b) {
    for (var c = this.Y(), d = 0; d < c.length; d++) {
      var e = c[d], f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  function Ld(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  ;
  var Md = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
  function Nd(a, b) {
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
  ;
  function Od(a, b) {
    this.a = this.l = this.c = "";
    this.g = null;
    this.h = this.f = "";
    this.i = false;
    var c;
    a instanceof Od ? (this.i = void 0 !== b ? b : a.i, Pd(this, a.c), this.l = a.l, this.a = a.a, Qd(this, a.g), this.f = a.f, Rd(this, Sd(a.b)), this.h = a.h) : a && (c = String(a).match(Md)) ? (this.i = !!b, Pd(this, c[1] || "", true), this.l = Td(c[2] || ""), this.a = Td(c[3] || "", true), Qd(this, c[4]), this.f = Td(c[5] || "", true), Rd(this, c[6] || "", true), this.h = Td(c[7] || "")) : (this.i = !!b, this.b = new Ud(null, this.i));
  }
  Od.prototype.toString = function() {
    var a = [], b = this.c;
    b && a.push(Vd(b, Wd, true), ":");
    var c = this.a;
    if (c || "file" == b) a.push("//"), (b = this.l) && a.push(Vd(b, Wd, true), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.g, null != c && a.push(":", String(c));
    if (c = this.f) this.a && "/" != c.charAt(0) && a.push("/"), a.push(Vd(c, "/" == c.charAt(0) ? Xd : Yd, true));
    (c = this.b.toString()) && a.push("?", c);
    (c = this.h) && a.push("#", Vd(c, Zd));
    return a.join("");
  };
  Od.prototype.resolve = function(a) {
    var b = new Od(this), c = !!a.c;
    c ? Pd(b, a.c) : c = !!a.l;
    c ? b.l = a.l : c = !!a.a;
    c ? b.a = a.a : c = null != a.g;
    var d = a.f;
    if (c) Qd(b, a.g);
    else if (c = !!a.f) {
      if ("/" != d.charAt(0)) if (this.a && !this.f) d = "/" + d;
      else {
        var e = b.f.lastIndexOf("/");
        -1 != e && (d = b.f.substr(0, e + 1) + d);
      }
      e = d;
      if (".." == e || "." == e) d = "";
      else if (x(e, "./") || x(e, "/.")) {
        d = 0 == e.lastIndexOf("/", 0);
        e = e.split("/");
        for (var f = [], g = 0; g < e.length; ) {
          var h = e[g++];
          "." == h ? d && g == e.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(), d && g == e.length && f.push("")) : (f.push(h), d = true);
        }
        d = f.join("/");
      } else d = e;
    }
    c ? b.f = d : c = "" !== a.b.toString();
    c ? Rd(b, Sd(a.b)) : c = !!a.h;
    c && (b.h = a.h);
    return b;
  };
  function Pd(a, b, c) {
    a.c = c ? Td(b, true) : b;
    a.c && (a.c = a.c.replace(/:$/, ""));
  }
  function Qd(a, b) {
    if (b) {
      b = Number(b);
      if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
      a.g = b;
    } else a.g = null;
  }
  function Rd(a, b, c) {
    b instanceof Ud ? (a.b = b, $d(a.b, a.i)) : (c || (b = Vd(b, ae)), a.b = new Ud(b, a.i));
  }
  function I(a, b, c) {
    a.b.set(b, c);
  }
  function be(a, b) {
    return a.b.get(b);
  }
  function J(a) {
    return a instanceof Od ? new Od(a) : new Od(a, void 0);
  }
  function ce(a, b, c, d) {
    var e = new Od(null, void 0);
    a && Pd(e, a);
    b && (e.a = b);
    c && Qd(e, c);
    d && (e.f = d);
    return e;
  }
  function Td(a, b) {
    return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
  }
  function Vd(a, b, c) {
    return "string" === typeof a ? (a = encodeURI(a).replace(b, de), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
  }
  function de(a) {
    a = a.charCodeAt(0);
    return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
  }
  var Wd = /[#\/\?@]/g, Yd = /[#\?:]/g, Xd = /[#\?]/g, ae = /[#\?@]/g, Zd = /#/g;
  function Ud(a, b) {
    this.b = this.a = null;
    this.c = a || null;
    this.f = !!b;
  }
  function ee(a) {
    a.a || (a.a = new Jd(), a.b = 0, a.c && Nd(a.c, function(b, c) {
      a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
    }));
  }
  function fe(a) {
    var b = Hd(a);
    if ("undefined" == typeof b) throw Error("Keys are undefined");
    var c = new Ud(null, void 0);
    a = Gd(a);
    for (var d = 0; d < b.length; d++) {
      var e = b[d], f = a[d];
      Array.isArray(f) ? ge(c, e, f) : c.add(e, f);
    }
    return c;
  }
  k = Ud.prototype;
  k.add = function(a, b) {
    ee(this);
    this.c = null;
    a = he(this, a);
    var c = this.a.get(a);
    c || this.a.set(a, c = []);
    c.push(b);
    this.b += 1;
    return this;
  };
  function ie(a, b) {
    ee(a);
    b = he(a, b);
    Ld(a.a.b, b) && (a.c = null, a.b -= a.a.get(b).length, a = a.a, Ld(a.b, b) && (delete a.b[b], a.c--, a.a.length > 2 * a.c && Kd(a)));
  }
  k.clear = function() {
    this.a = this.c = null;
    this.b = 0;
  };
  function je(a, b) {
    ee(a);
    b = he(a, b);
    return Ld(a.a.b, b);
  }
  k.forEach = function(a, b) {
    ee(this);
    this.a.forEach(function(c, d) {
      w(c, function(e) {
        a.call(b, e, d, this);
      }, this);
    }, this);
  };
  k.Y = function() {
    ee(this);
    for (var a = this.a.X(), b = this.a.Y(), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c;
  };
  k.X = function(a) {
    ee(this);
    var b = [];
    if ("string" === typeof a) je(this, a) && (b = Ya(b, this.a.get(he(this, a))));
    else {
      a = this.a.X();
      for (var c = 0; c < a.length; c++) b = Ya(b, a[c]);
    }
    return b;
  };
  k.set = function(a, b) {
    ee(this);
    this.c = null;
    a = he(this, a);
    je(this, a) && (this.b -= this.a.get(a).length);
    this.a.set(a, [b]);
    this.b += 1;
    return this;
  };
  k.get = function(a, b) {
    if (!a) return b;
    a = this.X(a);
    return 0 < a.length ? String(a[0]) : b;
  };
  function ge(a, b, c) {
    ie(a, b);
    0 < c.length && (a.c = null, a.a.set(he(a, b), Za(c)), a.b += c.length);
  }
  k.toString = function() {
    if (this.c) return this.c;
    if (!this.a) return "";
    for (var a = [], b = this.a.Y(), c = 0; c < b.length; c++) {
      var d = b[c], e = encodeURIComponent(String(d));
      d = this.X(d);
      for (var f = 0; f < d.length; f++) {
        var g = e;
        "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
        a.push(g);
      }
    }
    return this.c = a.join("&");
  };
  function Sd(a) {
    var b = new Ud();
    b.c = a.c;
    a.a && (b.a = new Jd(a.a), b.b = a.b);
    return b;
  }
  function he(a, b) {
    b = String(b);
    a.f && (b = b.toLowerCase());
    return b;
  }
  function $d(a, b) {
    b && !a.f && (ee(a), a.c = null, a.a.forEach(function(c, d) {
      var e = d.toLowerCase();
      d != e && (ie(this, d), ge(this, e, c));
    }, a));
    a.f = b;
  }
  ;
  function ke(a) {
    var b = [];
    le(new me(), a, b);
    return b.join("");
  }
  function me() {
  }
  function le(a, b, c) {
    if (null == b) c.push("null");
    else {
      if ("object" == typeof b) {
        if (Array.isArray(b)) {
          var d = b;
          b = d.length;
          c.push("[");
          for (var e = "", f = 0; f < b; f++) c.push(e), le(a, d[f], c), e = ",";
          c.push("]");
          return;
        }
        if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
        else {
          c.push("{");
          e = "";
          for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f && (c.push(e), ne(d, c), c.push(":"), le(a, f, c), e = ","));
          c.push("}");
          return;
        }
      }
      switch (typeof b) {
        case "string":
          ne(b, c);
          break;
        case "number":
          c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
          break;
        case "boolean":
          c.push(String(b));
          break;
        case "function":
          c.push("null");
          break;
        default:
          throw Error("Unknown type: " + typeof b);
      }
    }
  }
  var oe = {
    '"': '\\"',
    "\\": "\\\\",
    "/": "\\/",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\v": "\\u000b"
  }, pe = /\uffff/.test("￿") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
  function ne(a, b) {
    b.push('"', a.replace(pe, function(c) {
      var d = oe[c];
      d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).substr(1), oe[c] = d);
      return d;
    }), '"');
  }
  ;
  function qe() {
    var a = K();
    return Wb && !!ic && 11 == ic || /Edge\/\d+/.test(a);
  }
  function re() {
    return l.window && l.window.location.href || self && self.location && self.location.href || "";
  }
  function se(a, b) {
    b = b || l.window;
    var c = "about:blank";
    a && (c = Eb(Ib(a) || Kb));
    b.location.href = c;
  }
  function te(a, b) {
    var c = [], d;
    for (d in a) d in b ? typeof a[d] != typeof b[d] ? c.push(d) : "object" == typeof a[d] && null != a[d] && null != b[d] ? 0 < te(a[d], b[d]).length && c.push(d) : a[d] !== b[d] && c.push(d) : c.push(d);
    for (d in b) d in a || c.push(d);
    return c;
  }
  function ue() {
    var a = K();
    a = ve(a) != we ? null : (a = a.match(/\sChrome\/(\d+)/i)) && 2 == a.length ? parseInt(a[1], 10) : null;
    return a && 30 > a ? false : !Wb || !ic || 9 < ic;
  }
  function xe(a) {
    a = (a || K()).toLowerCase();
    return a.match(/android/) || a.match(/webos/) || a.match(/iphone|ipad|ipod/) || a.match(/blackberry/) || a.match(/windows phone/) || a.match(/iemobile/) ? true : false;
  }
  function ye(a) {
    a = a || l.window;
    try {
      a.close();
    } catch (b) {
    }
  }
  function ze(a, b, c) {
    var d = Math.floor(1e9 * Math.random()).toString();
    b = b || 500;
    c = c || 600;
    var e = (window.screen.availHeight - c) / 2, f = (window.screen.availWidth - b) / 2;
    b = {
      width: b,
      height: c,
      top: 0 < e ? e : 0,
      left: 0 < f ? f : 0,
      location: true,
      resizable: true,
      statusbar: true,
      toolbar: false
    };
    c = K().toLowerCase();
    d && (b.target = d, x(c, "crios/") && (b.target = "_blank"));
    ve(K()) == Ae && (a = a || "http://localhost", b.scrollbars = true);
    c = a || "";
    (a = b) || (a = {});
    d = window;
    b = c instanceof C ? c : Ib("undefined" != typeof c.href ? c.href : String(c)) || Kb;
    c = a.target || c.target;
    e = [];
    for (g in a) switch (g) {
      case "width":
      case "height":
      case "top":
      case "left":
        e.push(g + "=" + a[g]);
        break;
      case "target":
      case "noopener":
      case "noreferrer":
        break;
      default:
        e.push(g + "=" + (a[g] ? 1 : 0));
    }
    var g = e.join(",");
    if ((y("iPhone") && !y("iPod") && !y("iPad") || y("iPad") || y("iPod")) && d.navigator && d.navigator.standalone && c && "_self" != c) g = oc(document, "A"), pb(g, "HTMLAnchorElement"), b = b instanceof C ? b : Jb(b), g.href = Eb(b), g.setAttribute("target", c), a.noreferrer && g.setAttribute("rel", "noreferrer"), a = document.createEvent("MouseEvent"), a.initMouseEvent("click", true, true, d, 1), g.dispatchEvent(a), g = {};
    else if (a.noreferrer) {
      if (g = Pb("", d, c, g), a = Eb(b), g && (Yb && x(a, ";") && (a = "'" + a.replace(/'/g, "%27") + "'"), g.opener = null, a = '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' + Rb(a) + '">', a = (d = vb()) ? d.createHTML(a) : a, a = new Lb(a, null, Mb), d = g.document)) d.write(Nb(a)), d.close();
    } else (g = Pb(b, d, c, g)) && a.noopener && (g.opener = null);
    if (g) try {
      g.focus();
    } catch (h) {
    }
    return g;
  }
  function Be(a) {
    return new D(function(b) {
      function c() {
        Fd(2e3).then(function() {
          if (!a || a.closed) b();
          else return c();
        });
      }
      return c();
    });
  }
  var Ce = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, De = /^[^@]+@[^@]+$/;
  function Ee() {
    var a = null;
    return new D(function(b) {
      "complete" == l.document.readyState ? b() : (a = function() {
        b();
      }, od(window, "load", a));
    }).o(function(b) {
      xd(window, "load", a);
      throw b;
    });
  }
  function Fe() {
    return Ge(void 0) ? Ee().then(function() {
      return new D(function(a, b) {
        var c = l.document, d = setTimeout(function() {
          b(Error("Cordova framework is not ready."));
        }, 1e3);
        c.addEventListener("deviceready", function() {
          clearTimeout(d);
          a();
        }, false);
      });
    }) : F(Error("Cordova must run in an Android or iOS file scheme."));
  }
  function Ge(a) {
    a = a || K();
    return !("file:" !== He() && "ionic:" !== He() || !a.toLowerCase().match(/iphone|ipad|ipod|android/));
  }
  function Ie() {
    var a = l.window;
    try {
      return !(!a || a == a.top);
    } catch (b) {
      return false;
    }
  }
  function Je() {
    return "undefined" !== typeof l.WorkerGlobalScope && "function" === typeof l.importScripts;
  }
  function Ke() {
    return index_esm_default.INTERNAL.hasOwnProperty("reactNative") ? "ReactNative" : index_esm_default.INTERNAL.hasOwnProperty("node") ? "Node" : Je() ? "Worker" : "Browser";
  }
  function Le() {
    var a = Ke();
    return "ReactNative" === a || "Node" === a;
  }
  function Me() {
    for (var a = 50, b = []; 0 < a; ) b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()))), a--;
    return b.join("");
  }
  var Ae = "Firefox", we = "Chrome";
  function ve(a) {
    var b = a.toLowerCase();
    if (x(b, "opera/") || x(b, "opr/") || x(b, "opios/")) return "Opera";
    if (x(b, "iemobile")) return "IEMobile";
    if (x(b, "msie") || x(b, "trident/")) return "IE";
    if (x(b, "edge/")) return "Edge";
    if (x(b, "firefox/")) return Ae;
    if (x(b, "silk/")) return "Silk";
    if (x(b, "blackberry")) return "Blackberry";
    if (x(b, "webos")) return "Webos";
    if (!x(b, "safari/") || x(b, "chrome/") || x(b, "crios/") || x(b, "android")) {
      if (!x(b, "chrome/") && !x(b, "crios/") || x(b, "edge/")) {
        if (x(b, "android")) return "Android";
        if ((a = a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/)) && 2 == a.length) return a[1];
      } else return we;
    } else return "Safari";
    return "Other";
  }
  var Ne = {
    md: "FirebaseCore-web",
    od: "FirebaseUI-web"
  };
  function Oe(a, b) {
    b = b || [];
    var c = [], d = {}, e;
    for (e in Ne) d[Ne[e]] = true;
    for (e = 0; e < b.length; e++) "undefined" !== typeof d[b[e]] && (delete d[b[e]], c.push(b[e]));
    c.sort();
    b = c;
    b.length || (b = ["FirebaseCore-web"]);
    c = Ke();
    "Browser" === c ? (d = K(), c = ve(d)) : "Worker" === c && (d = K(), c = ve(d) + "-" + c);
    return c + "/JsCore/" + a + "/" + b.join(",");
  }
  function K() {
    return l.navigator && l.navigator.userAgent || "";
  }
  function L(a, b) {
    a = a.split(".");
    b = b || l;
    for (var c = 0; c < a.length && "object" == typeof b && null != b; c++) b = b[a[c]];
    c != a.length && (b = void 0);
    return b;
  }
  function Pe() {
    try {
      var a = l.localStorage, b = Qe();
      if (a) return a.setItem(b, "1"), a.removeItem(b), qe() ? !!l.indexedDB : true;
    } catch (c) {
      return Je() && !!l.indexedDB;
    }
    return false;
  }
  function Re() {
    return (Se() || "chrome-extension:" === He() || Ge()) && !Le() && Pe() && !Je();
  }
  function Se() {
    return "http:" === He() || "https:" === He();
  }
  function He() {
    return l.location && l.location.protocol || null;
  }
  function Te(a) {
    a = a || K();
    return xe(a) || ve(a) == Ae ? false : true;
  }
  function Ue(a) {
    return "undefined" === typeof a ? null : ke(a);
  }
  function Ve(a) {
    var b = {}, c;
    for (c in a) a.hasOwnProperty(c) && null !== a[c] && void 0 !== a[c] && (b[c] = a[c]);
    return b;
  }
  function We(a) {
    if (null !== a) return JSON.parse(a);
  }
  function Qe(a) {
    return a ? a : Math.floor(1e9 * Math.random()).toString();
  }
  function Xe(a) {
    a = a || K();
    return "Safari" == ve(a) || a.toLowerCase().match(/iphone|ipad|ipod/) ? false : true;
  }
  function Ye() {
    var a = l.___jsl;
    if (a && a.H) {
      for (var b in a.H) if (a.H[b].r = a.H[b].r || [], a.H[b].L = a.H[b].L || [], a.H[b].r = a.H[b].L.concat(), a.CP) for (var c = 0; c < a.CP.length; c++) a.CP[c] = null;
    }
  }
  function Ze(a, b) {
    if (a > b) throw Error("Short delay should be less than long delay!");
    this.a = a;
    this.c = b;
    a = K();
    b = Ke();
    this.b = xe(a) || "ReactNative" === b;
  }
  Ze.prototype.get = function() {
    var a = l.navigator;
    return (a && "boolean" === typeof a.onLine && (Se() || "chrome-extension:" === He() || "undefined" !== typeof a.connection) ? a.onLine : 1) ? this.b ? this.c : this.a : Math.min(5e3, this.a);
  };
  function $e() {
    var a = l.document;
    return a && "undefined" !== typeof a.visibilityState ? "visible" == a.visibilityState : true;
  }
  function af() {
    var a = l.document, b = null;
    return $e() || !a ? E() : new D(function(c) {
      b = function() {
        $e() && (a.removeEventListener("visibilitychange", b, false), c());
      };
      a.addEventListener("visibilitychange", b, false);
    }).o(function(c) {
      a.removeEventListener("visibilitychange", b, false);
      throw c;
    });
  }
  function bf(a) {
    try {
      var b = new Date(parseInt(a, 10));
      if (!isNaN(b.getTime()) && !/[^0-9]/.test(a)) return b.toUTCString();
    } catch (c) {
    }
    return null;
  }
  function cf() {
    return !(!L("fireauth.oauthhelper", l) && !L("fireauth.iframe", l));
  }
  function df() {
    var a = l.navigator;
    return a && a.serviceWorker && a.serviceWorker.controller || null;
  }
  function ef() {
    var a = l.navigator;
    return a && a.serviceWorker ? E().then(function() {
      return a.serviceWorker.ready;
    }).then(function(b) {
      return b.active || null;
    }).o(function() {
      return null;
    }) : E(null);
  }
  ;
  var ff = {};
  function gf(a) {
    ff[a] || (ff[a] = true, "undefined" !== typeof console && "function" === typeof console.warn && console.warn(a));
  }
  ;
  var hf;
  try {
    var jf = {};
    Object.defineProperty(jf, "abcd", {
      configurable: true,
      enumerable: true,
      value: 1
    });
    Object.defineProperty(jf, "abcd", {
      configurable: true,
      enumerable: true,
      value: 2
    });
    hf = 2 == jf.abcd;
  } catch (a) {
    hf = false;
  }
  function M(a, b, c) {
    hf ? Object.defineProperty(a, b, {
      configurable: true,
      enumerable: true,
      value: c
    }) : a[b] = c;
  }
  function N(a, b) {
    if (b) for (var c in b) b.hasOwnProperty(c) && M(a, c, b[c]);
  }
  function kf(a) {
    var b = {};
    N(b, a);
    return b;
  }
  function lf(a) {
    var b = {}, c;
    for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
    return b;
  }
  function mf(a, b) {
    if (!b || !b.length) return true;
    if (!a) return false;
    for (var c = 0; c < b.length; c++) {
      var d = a[b[c]];
      if (void 0 === d || null === d || "" === d) return false;
    }
    return true;
  }
  function nf(a) {
    var b = a;
    if ("object" == typeof a && null != a) {
      b = "length" in a ? [] : {};
      for (var c in a) M(b, c, nf(a[c]));
    }
    return b;
  }
  ;
  function of(a) {
    var b = a && (a[pf] ? "phone" : null);
    if (b && a && a[qf]) {
      M(this, "uid", a[qf]);
      M(this, "displayName", a[rf] || null);
      var c = null;
      a[sf] && (c = new Date(a[sf]).toUTCString());
      M(this, "enrollmentTime", c);
      M(this, "factorId", b);
    } else throw new t("internal-error", "Internal assert: invalid MultiFactorInfo object");
  }
  of.prototype.w = function() {
    return {
      uid: this.uid,
      displayName: this.displayName,
      factorId: this.factorId,
      enrollmentTime: this.enrollmentTime
    };
  };
  function tf(a) {
    try {
      var b = new uf(a);
    } catch (c) {
      b = null;
    }
    return b;
  }
  var rf = "displayName", sf = "enrolledAt", qf = "mfaEnrollmentId", pf = "phoneInfo";
  function uf(a) {
    of.call(this, a);
    M(this, "phoneNumber", a[pf]);
  }
  r(uf, of);
  uf.prototype.w = function() {
    var a = uf.bb.w.call(this);
    a.phoneNumber = this.phoneNumber;
    return a;
  };
  function vf(a) {
    var b = {}, c = a[wf], d = a[xf], e = a[yf];
    a = tf(a[zf]);
    if (!e || e != Af && e != Bf && !c || e == Bf && !d || e == Cf && !a) throw Error("Invalid checkActionCode response!");
    e == Bf ? (b[Df] = c || null, b[Ef] = c || null, b[Ff] = d) : (b[Df] = d || null, b[Ef] = d || null, b[Ff] = c || null);
    b[Gf] = a || null;
    M(this, Hf, e);
    M(this, If, nf(b));
  }
  var Cf = "REVERT_SECOND_FACTOR_ADDITION", Af = "EMAIL_SIGNIN", Bf = "VERIFY_AND_CHANGE_EMAIL", wf = "email", zf = "mfaInfo", xf = "newEmail", yf = "requestType", Ff = "email", Df = "fromEmail", Gf = "multiFactorInfo", Ef = "previousEmail", If = "data", Hf = "operation";
  function Jf(a) {
    a = J(a);
    var b = be(a, Kf) || null, c = be(a, Lf) || null, d = be(a, Mf) || null;
    d = d ? Nf[d] || null : null;
    if (!b || !c || !d) throw new t("argument-error", Kf + ", " + Lf + "and " + Mf + " are required in a valid action code URL.");
    N(this, {
      apiKey: b,
      operation: d,
      code: c,
      continueUrl: be(a, Of) || null,
      languageCode: be(a, Pf) || null,
      tenantId: be(a, Qf) || null
    });
  }
  var Kf = "apiKey", Lf = "oobCode", Of = "continueUrl", Pf = "languageCode", Mf = "mode", Qf = "tenantId", Nf = {
    recoverEmail: "RECOVER_EMAIL",
    resetPassword: "PASSWORD_RESET",
    revertSecondFactorAddition: Cf,
    signIn: Af,
    verifyAndChangeEmail: Bf,
    verifyEmail: "VERIFY_EMAIL"
  };
  function Rf(a) {
    try {
      return new Jf(a);
    } catch (b) {
      return null;
    }
  }
  ;
  function Sf(a) {
    var b = a[Tf];
    if ("undefined" === typeof b) throw new t("missing-continue-uri");
    if ("string" !== typeof b || "string" === typeof b && !b.length) throw new t("invalid-continue-uri");
    this.h = b;
    this.b = this.a = null;
    this.g = false;
    var c = a[Uf];
    if (c && "object" === typeof c) {
      b = c[Vf];
      var d = c[Wf];
      c = c[Xf];
      if ("string" === typeof b && b.length) {
        this.a = b;
        if ("undefined" !== typeof d && "boolean" !== typeof d) throw new t("argument-error", Wf + " property must be a boolean when specified.");
        this.g = !!d;
        if ("undefined" !== typeof c && ("string" !== typeof c || "string" === typeof c && !c.length)) throw new t("argument-error", Xf + " property must be a non empty string when specified.");
        this.b = c || null;
      } else {
        if ("undefined" !== typeof b) throw new t("argument-error", Vf + " property must be a non empty string when specified.");
        if ("undefined" !== typeof d || "undefined" !== typeof c) throw new t("missing-android-pkg-name");
      }
    } else if ("undefined" !== typeof c) throw new t("argument-error", Uf + " property must be a non null object when specified.");
    this.f = null;
    if ((b = a[Yf]) && "object" === typeof b) {
      if (b = b[Zf], "string" === typeof b && b.length) this.f = b;
      else {
        if ("undefined" !== typeof b) throw new t("argument-error", Zf + " property must be a non empty string when specified.");
      }
    } else if ("undefined" !== typeof b) throw new t("argument-error", Yf + " property must be a non null object when specified.");
    b = a[$f];
    if ("undefined" !== typeof b && "boolean" !== typeof b) throw new t("argument-error", $f + " property must be a boolean when specified.");
    this.c = !!b;
    a = a[ag];
    if ("undefined" !== typeof a && ("string" !== typeof a || "string" === typeof a && !a.length)) throw new t("argument-error", ag + " property must be a non empty string when specified.");
    this.i = a || null;
  }
  var Uf = "android", ag = "dynamicLinkDomain", $f = "handleCodeInApp", Yf = "iOS", Tf = "url", Wf = "installApp", Xf = "minimumVersion", Vf = "packageName", Zf = "bundleId";
  function bg(a) {
    var b = {};
    b.continueUrl = a.h;
    b.canHandleCodeInApp = a.c;
    if (b.androidPackageName = a.a) b.androidMinimumVersion = a.b, b.androidInstallApp = a.g;
    b.iOSBundleId = a.f;
    b.dynamicLinkDomain = a.i;
    for (var c in b) null === b[c] && delete b[c];
    return b;
  }
  ;
  function cg(a) {
    return Ra(a, function(b) {
      b = b.toString(16);
      return 1 < b.length ? b : "0" + b;
    }).join("");
  }
  ;
  var dg = null;
  function eg(a) {
    var b = [];
    fg(a, function(c) {
      b.push(c);
    });
    return b;
  }
  function fg(a, b) {
    function c(m) {
      for (; d < a.length; ) {
        var p = a.charAt(d++), v = dg[p];
        if (null != v) return v;
        if (!/^[\s\xa0]*$/.test(p)) throw Error("Unknown base64 encoding at char: " + p);
      }
      return m;
    }
    gg();
    for (var d = 0; ; ) {
      var e = c(-1), f = c(0), g = c(64), h = c(64);
      if (64 === h && -1 === e) break;
      b(e << 2 | f >> 4);
      64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h));
    }
  }
  function gg() {
    if (!dg) {
      dg = {};
      for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) for (var d = a.concat(b[c].split("")), e = 0; e < d.length; e++) {
        var f = d[e];
        void 0 === dg[f] && (dg[f] = e);
      }
    }
  }
  ;
  function hg(a) {
    var b = ig(a);
    if (!(b && b.sub && b.iss && b.aud && b.exp)) throw Error("Invalid JWT");
    this.h = a;
    this.a = b.exp;
    this.i = b.sub;
    a = Date.now() / 1e3;
    this.g = b.iat || (a > this.a ? this.a : a);
    this.b = b.provider_id || b.firebase && b.firebase.sign_in_provider || null;
    this.f = b.firebase && b.firebase.tenant || null;
    this.c = !!b.is_anonymous || "anonymous" == this.b;
  }
  hg.prototype.T = function() {
    return this.f;
  };
  hg.prototype.l = function() {
    return this.c;
  };
  hg.prototype.toString = function() {
    return this.h;
  };
  function jg(a) {
    try {
      return new hg(a);
    } catch (b) {
      return null;
    }
  }
  function ig(a) {
    if (!a) return null;
    a = a.split(".");
    if (3 != a.length) return null;
    a = a[1];
    for (var b = (4 - a.length % 4) % 4, c = 0; c < b; c++) a += ".";
    try {
      var d = eg(a);
      a = [];
      for (c = b = 0; b < d.length; ) {
        var e = d[b++];
        if (128 > e) a[c++] = String.fromCharCode(e);
        else if (191 < e && 224 > e) {
          var f = d[b++];
          a[c++] = String.fromCharCode((e & 31) << 6 | f & 63);
        } else if (239 < e && 365 > e) {
          f = d[b++];
          var g = d[b++], h = d[b++], m = ((e & 7) << 18 | (f & 63) << 12 | (g & 63) << 6 | h & 63) - 65536;
          a[c++] = String.fromCharCode(55296 + (m >> 10));
          a[c++] = String.fromCharCode(56320 + (m & 1023));
        } else f = d[b++], g = d[b++], a[c++] = String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | g & 63);
      }
      return JSON.parse(a.join(""));
    } catch (p) {
    }
    return null;
  }
  ;
  var kg = "oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "), lg = ["client_id", "response_type", "scope", "redirect_uri", "state"], mg = {
    nd: {
      Ja: "locale",
      va: 700,
      ua: 600,
      fa: "facebook.com",
      Ya: lg
    },
    pd: {
      Ja: null,
      va: 500,
      ua: 750,
      fa: "github.com",
      Ya: lg
    },
    qd: {
      Ja: "hl",
      va: 515,
      ua: 680,
      fa: "google.com",
      Ya: lg
    },
    wd: {
      Ja: "lang",
      va: 485,
      ua: 705,
      fa: "twitter.com",
      Ya: kg
    },
    kd: {
      Ja: "locale",
      va: 640,
      ua: 600,
      fa: "apple.com",
      Ya: []
    }
  };
  function ng(a) {
    for (var b in mg) if (mg[b].fa == a) return mg[b];
    return null;
  }
  ;
  function og(a) {
    var b = {};
    b["facebook.com"] = pg;
    b["google.com"] = qg;
    b["github.com"] = rg;
    b["twitter.com"] = sg;
    var c = a && a[tg];
    try {
      if (c) return b[c] ? new b[c](a) : new ug(a);
      if ("undefined" !== typeof a[vg]) return new wg(a);
    } catch (d) {
    }
    return null;
  }
  var vg = "idToken", tg = "providerId";
  function wg(a) {
    var b = a[tg];
    if (!b && a[vg]) {
      var c = jg(a[vg]);
      c && c.b && (b = c.b);
    }
    if (!b) throw Error("Invalid additional user info!");
    if ("anonymous" == b || "custom" == b) b = null;
    c = false;
    "undefined" !== typeof a.isNewUser ? c = !!a.isNewUser : "identitytoolkit#SignupNewUserResponse" === a.kind && (c = true);
    M(this, "providerId", b);
    M(this, "isNewUser", c);
  }
  function ug(a) {
    wg.call(this, a);
    a = We(a.rawUserInfo || "{}");
    M(this, "profile", nf(a || {}));
  }
  r(ug, wg);
  function pg(a) {
    ug.call(this, a);
    if ("facebook.com" != this.providerId) throw Error("Invalid provider ID!");
  }
  r(pg, ug);
  function rg(a) {
    ug.call(this, a);
    if ("github.com" != this.providerId) throw Error("Invalid provider ID!");
    M(this, "username", this.profile && this.profile.login || null);
  }
  r(rg, ug);
  function qg(a) {
    ug.call(this, a);
    if ("google.com" != this.providerId) throw Error("Invalid provider ID!");
  }
  r(qg, ug);
  function sg(a) {
    ug.call(this, a);
    if ("twitter.com" != this.providerId) throw Error("Invalid provider ID!");
    M(this, "username", a.screenName || null);
  }
  r(sg, ug);
  function xg(a) {
    var b = J(a), c = be(b, "link"), d = be(J(c), "link");
    b = be(b, "deep_link_id");
    return be(J(b), "link") || b || d || c || a;
  }
  ;
  function yg(a, b) {
    if (!a && !b) throw new t("internal-error", "Internal assert: no raw session string available");
    if (a && b) throw new t("internal-error", "Internal assert: unable to determine the session type");
    this.a = a || null;
    this.b = b || null;
    this.type = this.a ? zg : Ag;
  }
  var zg = "enroll", Ag = "signin";
  yg.prototype.Ha = function() {
    return this.a ? E(this.a) : E(this.b);
  };
  yg.prototype.w = function() {
    return this.type == zg ? {
      multiFactorSession: {
        idToken: this.a
      }
    } : {
      multiFactorSession: {
        pendingCredential: this.b
      }
    };
  };
  function Bg() {
  }
  Bg.prototype.ka = function() {
  };
  Bg.prototype.b = function() {
  };
  Bg.prototype.c = function() {
  };
  Bg.prototype.w = function() {
  };
  function Cg(a, b) {
    return a.then(function(c) {
      if (c[Dg]) {
        var d = jg(c[Dg]);
        if (!d || b != d.i) throw new t("user-mismatch");
        return c;
      }
      throw new t("user-mismatch");
    }).o(function(c) {
      throw c && c.code && c.code == xa + "user-not-found" ? new t("user-mismatch") : c;
    });
  }
  function Eg(a, b) {
    if (b) this.a = b;
    else throw new t("internal-error", "failed to construct a credential");
    M(this, "providerId", a);
    M(this, "signInMethod", a);
  }
  Eg.prototype.ka = function(a) {
    return Fg(a, Gg(this));
  };
  Eg.prototype.b = function(a, b) {
    var c = Gg(this);
    c.idToken = b;
    return Hg(a, c);
  };
  Eg.prototype.c = function(a, b) {
    return Cg(Ig(a, Gg(this)), b);
  };
  function Gg(a) {
    return {
      pendingToken: a.a,
      requestUri: "http://localhost"
    };
  }
  Eg.prototype.w = function() {
    return {
      providerId: this.providerId,
      signInMethod: this.signInMethod,
      pendingToken: this.a
    };
  };
  function Jg(a) {
    if (a && a.providerId && a.signInMethod && 0 == a.providerId.indexOf("saml.") && a.pendingToken) try {
      return new Eg(a.providerId, a.pendingToken);
    } catch (b) {
    }
    return null;
  }
  function Kg(a, b, c) {
    this.a = null;
    if (b.idToken || b.accessToken) b.idToken && M(this, "idToken", b.idToken), b.accessToken && M(this, "accessToken", b.accessToken), b.nonce && !b.pendingToken && M(this, "nonce", b.nonce), b.pendingToken && (this.a = b.pendingToken);
    else if (b.oauthToken && b.oauthTokenSecret) M(this, "accessToken", b.oauthToken), M(this, "secret", b.oauthTokenSecret);
    else throw new t("internal-error", "failed to construct a credential");
    M(this, "providerId", a);
    M(this, "signInMethod", c);
  }
  Kg.prototype.ka = function(a) {
    return Fg(a, Lg(this));
  };
  Kg.prototype.b = function(a, b) {
    var c = Lg(this);
    c.idToken = b;
    return Hg(a, c);
  };
  Kg.prototype.c = function(a, b) {
    var c = Lg(this);
    return Cg(Ig(a, c), b);
  };
  function Lg(a) {
    var b = {};
    a.idToken && (b.id_token = a.idToken);
    a.accessToken && (b.access_token = a.accessToken);
    a.secret && (b.oauth_token_secret = a.secret);
    b.providerId = a.providerId;
    a.nonce && !a.a && (b.nonce = a.nonce);
    b = {
      postBody: fe(b).toString(),
      requestUri: "http://localhost"
    };
    a.a && (delete b.postBody, b.pendingToken = a.a);
    return b;
  }
  Kg.prototype.w = function() {
    var a = {
      providerId: this.providerId,
      signInMethod: this.signInMethod
    };
    this.idToken && (a.oauthIdToken = this.idToken);
    this.accessToken && (a.oauthAccessToken = this.accessToken);
    this.secret && (a.oauthTokenSecret = this.secret);
    this.nonce && (a.nonce = this.nonce);
    this.a && (a.pendingToken = this.a);
    return a;
  };
  function Mg(a) {
    if (a && a.providerId && a.signInMethod) {
      var b = {
        idToken: a.oauthIdToken,
        accessToken: a.oauthTokenSecret ? null : a.oauthAccessToken,
        oauthTokenSecret: a.oauthTokenSecret,
        oauthToken: a.oauthTokenSecret && a.oauthAccessToken,
        nonce: a.nonce,
        pendingToken: a.pendingToken
      };
      try {
        return new Kg(a.providerId, b, a.signInMethod);
      } catch (c) {
      }
    }
    return null;
  }
  function Ng(a, b) {
    this.Qc = b || [];
    N(this, {
      providerId: a,
      isOAuthProvider: true
    });
    this.Jb = {};
    this.qb = (ng(a) || {}).Ja || null;
    this.pb = null;
  }
  Ng.prototype.Ka = function(a) {
    this.Jb = nb(a);
    return this;
  };
  function Og(a) {
    if ("string" !== typeof a || 0 != a.indexOf("saml.")) throw new t("argument-error", 'SAML provider IDs must be prefixed with "saml."');
    Ng.call(this, a, []);
  }
  r(Og, Ng);
  function Pg(a) {
    Ng.call(this, a, lg);
    this.a = [];
  }
  r(Pg, Ng);
  Pg.prototype.Ca = function(a) {
    Va(this.a, a) || this.a.push(a);
    return this;
  };
  Pg.prototype.Rb = function() {
    return Za(this.a);
  };
  Pg.prototype.credential = function(a, b) {
    var c;
    n(a) ? c = {
      idToken: a.idToken || null,
      accessToken: a.accessToken || null,
      nonce: a.rawNonce || null
    } : c = {
      idToken: a || null,
      accessToken: b || null
    };
    if (!c.idToken && !c.accessToken) throw new t("argument-error", "credential failed: must provide the ID token and/or the access token.");
    return new Kg(this.providerId, c, this.providerId);
  };
  function Qg() {
    Pg.call(this, "facebook.com");
  }
  r(Qg, Pg);
  M(Qg, "PROVIDER_ID", "facebook.com");
  M(Qg, "FACEBOOK_SIGN_IN_METHOD", "facebook.com");
  function Rg(a) {
    if (!a) throw new t("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
    var b = a;
    n(a) && (b = a.accessToken);
    return new Qg().credential({
      accessToken: b
    });
  }
  function Sg() {
    Pg.call(this, "github.com");
  }
  r(Sg, Pg);
  M(Sg, "PROVIDER_ID", "github.com");
  M(Sg, "GITHUB_SIGN_IN_METHOD", "github.com");
  function Tg(a) {
    if (!a) throw new t("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
    var b = a;
    n(a) && (b = a.accessToken);
    return new Sg().credential({
      accessToken: b
    });
  }
  function Ug() {
    Pg.call(this, "google.com");
    this.Ca("profile");
  }
  r(Ug, Pg);
  M(Ug, "PROVIDER_ID", "google.com");
  M(Ug, "GOOGLE_SIGN_IN_METHOD", "google.com");
  function Vg(a, b) {
    var c = a;
    n(a) && (c = a.idToken, b = a.accessToken);
    return new Ug().credential({
      idToken: c,
      accessToken: b
    });
  }
  function Wg() {
    Ng.call(this, "twitter.com", kg);
  }
  r(Wg, Ng);
  M(Wg, "PROVIDER_ID", "twitter.com");
  M(Wg, "TWITTER_SIGN_IN_METHOD", "twitter.com");
  function Xg(a, b) {
    var c = a;
    n(c) || (c = {
      oauthToken: a,
      oauthTokenSecret: b
    });
    if (!c.oauthToken || !c.oauthTokenSecret) throw new t("argument-error", "credential failed: expected 2 arguments (the OAuth access token and secret).");
    return new Kg("twitter.com", c, "twitter.com");
  }
  function Yg(a, b, c) {
    this.a = a;
    this.f = b;
    M(this, "providerId", "password");
    M(this, "signInMethod", c === Zg.EMAIL_LINK_SIGN_IN_METHOD ? Zg.EMAIL_LINK_SIGN_IN_METHOD : Zg.EMAIL_PASSWORD_SIGN_IN_METHOD);
  }
  Yg.prototype.ka = function(a) {
    return this.signInMethod == Zg.EMAIL_LINK_SIGN_IN_METHOD ? O(a, $g, {
      email: this.a,
      oobCode: this.f
    }) : O(a, ah, {
      email: this.a,
      password: this.f
    });
  };
  Yg.prototype.b = function(a, b) {
    return this.signInMethod == Zg.EMAIL_LINK_SIGN_IN_METHOD ? O(a, bh, {
      idToken: b,
      email: this.a,
      oobCode: this.f
    }) : O(a, ch, {
      idToken: b,
      email: this.a,
      password: this.f
    });
  };
  Yg.prototype.c = function(a, b) {
    return Cg(this.ka(a), b);
  };
  Yg.prototype.w = function() {
    return {
      email: this.a,
      password: this.f,
      signInMethod: this.signInMethod
    };
  };
  function dh(a) {
    return a && a.email && a.password ? new Yg(a.email, a.password, a.signInMethod) : null;
  }
  function Zg() {
    N(this, {
      providerId: "password",
      isOAuthProvider: false
    });
  }
  function eh(a, b) {
    b = fh(b);
    if (!b) throw new t("argument-error", "Invalid email link!");
    return new Yg(a, b.code, Zg.EMAIL_LINK_SIGN_IN_METHOD);
  }
  function fh(a) {
    a = xg(a);
    return (a = Rf(a)) && a.operation === Af ? a : null;
  }
  N(Zg, {
    PROVIDER_ID: "password"
  });
  N(Zg, {
    EMAIL_LINK_SIGN_IN_METHOD: "emailLink"
  });
  N(Zg, {
    EMAIL_PASSWORD_SIGN_IN_METHOD: "password"
  });
  function gh(a) {
    if (!(a.fb && a.eb || a.La && a.ea)) throw new t("internal-error");
    this.a = a;
    M(this, "providerId", "phone");
    this.fa = "phone";
    M(this, "signInMethod", "phone");
  }
  gh.prototype.ka = function(a) {
    return a.gb(hh(this));
  };
  gh.prototype.b = function(a, b) {
    var c = hh(this);
    c.idToken = b;
    return O(a, ih, c);
  };
  gh.prototype.c = function(a, b) {
    var c = hh(this);
    c.operation = "REAUTH";
    a = O(a, jh, c);
    return Cg(a, b);
  };
  gh.prototype.w = function() {
    var a = {
      providerId: "phone"
    };
    this.a.fb && (a.verificationId = this.a.fb);
    this.a.eb && (a.verificationCode = this.a.eb);
    this.a.La && (a.temporaryProof = this.a.La);
    this.a.ea && (a.phoneNumber = this.a.ea);
    return a;
  };
  function kh(a) {
    if (a && "phone" === a.providerId && (a.verificationId && a.verificationCode || a.temporaryProof && a.phoneNumber)) {
      var b = {};
      w(["verificationId", "verificationCode", "temporaryProof", "phoneNumber"], function(c) {
        a[c] && (b[c] = a[c]);
      });
      return new gh(b);
    }
    return null;
  }
  function hh(a) {
    return a.a.La && a.a.ea ? {
      temporaryProof: a.a.La,
      phoneNumber: a.a.ea
    } : {
      sessionInfo: a.a.fb,
      code: a.a.eb
    };
  }
  function lh(a) {
    try {
      this.a = a || index_esm_default.auth();
    } catch (b) {
      throw new t("argument-error", "Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().");
    }
    N(this, {
      providerId: "phone",
      isOAuthProvider: false
    });
  }
  lh.prototype.gb = function(a, b) {
    var c = this.a.a;
    return E(b.verify()).then(function(d) {
      if ("string" !== typeof d) throw new t("argument-error", "An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.");
      switch (b.type) {
        case "recaptcha":
          var e = n(a) ? a.session : null, f = n(a) ? a.phoneNumber : a, g;
          e && e.type == zg ? g = e.Ha().then(function(h) {
            return mh(c, {
              idToken: h,
              phoneEnrollmentInfo: {
                phoneNumber: f,
                recaptchaToken: d
              }
            });
          }) : e && e.type == Ag ? g = e.Ha().then(function(h) {
            return nh(c, {
              mfaPendingCredential: h,
              mfaEnrollmentId: a.multiFactorHint && a.multiFactorHint.uid || a.multiFactorUid,
              phoneSignInInfo: {
                recaptchaToken: d
              }
            });
          }) : g = oh(c, {
            phoneNumber: f,
            recaptchaToken: d
          });
          return g.then(function(h) {
            "function" === typeof b.reset && b.reset();
            return h;
          }, function(h) {
            "function" === typeof b.reset && b.reset();
            throw h;
          });
        default:
          throw new t("argument-error", 'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.');
      }
    });
  };
  function ph(a, b) {
    if (!a) throw new t("missing-verification-id");
    if (!b) throw new t("missing-verification-code");
    return new gh({
      fb: a,
      eb: b
    });
  }
  N(lh, {
    PROVIDER_ID: "phone"
  });
  N(lh, {
    PHONE_SIGN_IN_METHOD: "phone"
  });
  function qh(a) {
    if (a.temporaryProof && a.phoneNumber) return new gh({
      La: a.temporaryProof,
      ea: a.phoneNumber
    });
    var b = a && a.providerId;
    if (!b || "password" === b) return null;
    var c = a && a.oauthAccessToken, d = a && a.oauthTokenSecret, e = a && a.nonce, f = a && a.oauthIdToken, g = a && a.pendingToken;
    try {
      switch (b) {
        case "google.com":
          return Vg(f, c);
        case "facebook.com":
          return Rg(c);
        case "github.com":
          return Tg(c);
        case "twitter.com":
          return Xg(c, d);
        default:
          return c || d || f || g ? g ? 0 == b.indexOf("saml.") ? new Eg(b, g) : new Kg(b, {
            pendingToken: g,
            idToken: a.oauthIdToken,
            accessToken: a.oauthAccessToken
          }, b) : new Pg(b).credential({
            idToken: f,
            accessToken: c,
            rawNonce: e
          }) : null;
      }
    } catch (h) {
      return null;
    }
  }
  function rh(a) {
    if (!a.isOAuthProvider) throw new t("invalid-oauth-provider");
  }
  ;
  function sh(a, b, c, d, e, f, g) {
    this.c = a;
    this.b = b || null;
    this.g = c || null;
    this.f = d || null;
    this.i = f || null;
    this.h = g || null;
    this.a = e || null;
    if (this.g || this.a) {
      if (this.g && this.a) throw new t("invalid-auth-event");
      if (this.g && !this.f) throw new t("invalid-auth-event");
    } else throw new t("invalid-auth-event");
  }
  sh.prototype.getUid = function() {
    var a = [];
    a.push(this.c);
    this.b && a.push(this.b);
    this.f && a.push(this.f);
    this.h && a.push(this.h);
    return a.join("-");
  };
  sh.prototype.T = function() {
    return this.h;
  };
  sh.prototype.w = function() {
    return {
      type: this.c,
      eventId: this.b,
      urlResponse: this.g,
      sessionId: this.f,
      postBody: this.i,
      tenantId: this.h,
      error: this.a && this.a.w()
    };
  };
  function th(a) {
    a = a || {};
    return a.type ? new sh(a.type, a.eventId, a.urlResponse, a.sessionId, a.error && Aa(a.error), a.postBody, a.tenantId) : null;
  }
  ;
  function uh() {
    this.b = null;
    this.a = [];
  }
  var vh = null;
  function wh(a) {
    var b = vh;
    b.a.push(a);
    b.b || (b.b = function(c) {
      for (var d = 0; d < b.a.length; d++) b.a[d](c);
    }, a = L("universalLinks.subscribe", l), "function" === typeof a && a(null, b.b));
  }
  ;
  function xh(a) {
    var b = "unauthorized-domain", c = void 0, d = J(a);
    a = d.a;
    d = d.c;
    "chrome-extension" == d ? c = Qb("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.", a) : "http" == d || "https" == d ? c = Qb("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.", a) : b = "operation-not-supported-in-this-environment";
    t.call(this, b, c);
  }
  r(xh, t);
  function yh(a, b, c) {
    t.call(this, a, c);
    a = b || {};
    a.Kb && M(this, "email", a.Kb);
    a.ea && M(this, "phoneNumber", a.ea);
    a.credential && M(this, "credential", a.credential);
    a.$b && M(this, "tenantId", a.$b);
  }
  r(yh, t);
  yh.prototype.w = function() {
    var a = {
      code: this.code,
      message: this.message
    };
    this.email && (a.email = this.email);
    this.phoneNumber && (a.phoneNumber = this.phoneNumber);
    this.tenantId && (a.tenantId = this.tenantId);
    var b = this.credential && this.credential.w();
    b && z(a, b);
    return a;
  };
  yh.prototype.toJSON = function() {
    return this.w();
  };
  function zh(a) {
    if (a.code) {
      var b = a.code || "";
      0 == b.indexOf(xa) && (b = b.substring(xa.length));
      var c = {
        credential: qh(a),
        $b: a.tenantId
      };
      if (a.email) c.Kb = a.email;
      else if (a.phoneNumber) c.ea = a.phoneNumber;
      else if (!c.credential) return new t(b, a.message || void 0);
      return new yh(b, c, a.message);
    }
    return null;
  }
  ;
  function Ah() {
  }
  Ah.prototype.c = null;
  function Bh(a) {
    return a.c || (a.c = a.b());
  }
  ;
  var Ch;
  function Dh() {
  }
  r(Dh, Ah);
  Dh.prototype.a = function() {
    var a = Eh(this);
    return a ? new ActiveXObject(a) : new XMLHttpRequest();
  };
  Dh.prototype.b = function() {
    var a = {};
    Eh(this) && (a[0] = true, a[1] = true);
    return a;
  };
  function Eh(a) {
    if (!a.f && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
      for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
        var d = b[c];
        try {
          return new ActiveXObject(d), a.f = d;
        } catch (e) {
        }
      }
      throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
    }
    return a.f;
  }
  Ch = new Dh();
  function Fh() {
  }
  r(Fh, Ah);
  Fh.prototype.a = function() {
    var a = new XMLHttpRequest();
    if ("withCredentials" in a) return a;
    if ("undefined" != typeof XDomainRequest) return new Gh();
    throw Error("Unsupported browser");
  };
  Fh.prototype.b = function() {
    return {};
  };
  function Gh() {
    this.a = new XDomainRequest();
    this.readyState = 0;
    this.onreadystatechange = null;
    this.responseType = this.responseText = this.response = "";
    this.status = -1;
    this.statusText = "";
    this.a.onload = q(this.qc, this);
    this.a.onerror = q(this.Tb, this);
    this.a.onprogress = q(this.rc, this);
    this.a.ontimeout = q(this.vc, this);
  }
  k = Gh.prototype;
  k.open = function(a, b, c) {
    if (null != c && !c) throw Error("Only async requests are supported.");
    this.a.open(a, b);
  };
  k.send = function(a) {
    if (a) {
      if ("string" == typeof a) this.a.send(a);
      else throw Error("Only string data is supported");
    } else this.a.send();
  };
  k.abort = function() {
    this.a.abort();
  };
  k.setRequestHeader = function() {
  };
  k.getResponseHeader = function(a) {
    return "content-type" == a.toLowerCase() ? this.a.contentType : "";
  };
  k.qc = function() {
    this.status = 200;
    this.response = this.responseText = this.a.responseText;
    Hh(this, 4);
  };
  k.Tb = function() {
    this.status = 500;
    this.response = this.responseText = "";
    Hh(this, 4);
  };
  k.vc = function() {
    this.Tb();
  };
  k.rc = function() {
    this.status = 200;
    Hh(this, 1);
  };
  function Hh(a, b) {
    a.readyState = b;
    if (a.onreadystatechange) a.onreadystatechange();
  }
  k.getAllResponseHeaders = function() {
    return "content-type: " + this.a.contentType;
  };
  function Ih(a, b, c) {
    this.reset(a, b, c, void 0, void 0);
  }
  Ih.prototype.a = null;
  var Jh = 0;
  Ih.prototype.reset = function(a, b, c, d, e) {
    "number" == typeof e || Jh++;
    d || va();
    delete this.a;
  };
  function Kh(a) {
    this.f = a;
    this.b = this.c = this.a = null;
  }
  function Lh(a, b) {
    this.name = a;
    this.value = b;
  }
  Lh.prototype.toString = function() {
    return this.name;
  };
  var Mh = new Lh("SEVERE", 1e3), Nh = new Lh("WARNING", 900), Oh = new Lh("CONFIG", 700), Ph = new Lh("FINE", 500);
  function Qh(a) {
    if (a.c) return a.c;
    if (a.a) return Qh(a.a);
    Ga("Root logger has no level set.");
    return null;
  }
  Kh.prototype.log = function(a, b, c) {
    if (a.value >= Qh(this).value) for (oa(b) && (b = b()), a = new Ih(a, String(b), this.f), c && (a.a = c), c = this; c; ) c = c.a;
  };
  var Rh = {}, Sh = null;
  function Th(a) {
    Sh || (Sh = new Kh(""), Rh[""] = Sh, Sh.c = Oh);
    var b;
    if (!(b = Rh[a])) {
      b = new Kh(a);
      var c = a.lastIndexOf("."), d = a.substr(c + 1);
      c = Th(a.substr(0, c));
      c.b || (c.b = {});
      c.b[d] = b;
      b.a = c;
      Rh[a] = b;
    }
    return b;
  }
  ;
  function Uh(a, b) {
    a && a.log(Ph, b, void 0);
  }
  ;
  function Vh(a) {
    this.f = a;
  }
  r(Vh, Ah);
  Vh.prototype.a = function() {
    return new Wh(this.f);
  };
  Vh.prototype.b = /* @__PURE__ */ function(a) {
    return function() {
      return a;
    };
  }({});
  function Wh(a) {
    H.call(this);
    this.u = a;
    this.h = void 0;
    this.readyState = Xh;
    this.status = 0;
    this.responseType = this.responseText = this.response = this.statusText = "";
    this.onreadystatechange = null;
    this.l = new Headers();
    this.b = null;
    this.s = "GET";
    this.f = "";
    this.a = false;
    this.i = Th("goog.net.FetchXmlHttp");
    this.m = this.c = this.g = null;
  }
  r(Wh, H);
  var Xh = 0;
  k = Wh.prototype;
  k.open = function(a, b) {
    if (this.readyState != Xh) throw this.abort(), Error("Error reopening a connection");
    this.s = a;
    this.f = b;
    this.readyState = 1;
    Yh(this);
  };
  k.send = function(a) {
    if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
    this.a = true;
    var b = {
      headers: this.l,
      method: this.s,
      credentials: this.h,
      cache: void 0
    };
    a && (b.body = a);
    this.u.fetch(new Request(this.f, b)).then(this.uc.bind(this), this.Va.bind(this));
  };
  k.abort = function() {
    this.response = this.responseText = "";
    this.l = new Headers();
    this.status = 0;
    this.c && this.c.cancel("Request was aborted.");
    1 <= this.readyState && this.a && 4 != this.readyState && (this.a = false, Zh(this));
    this.readyState = Xh;
  };
  k.uc = function(a) {
    this.a && (this.g = a, this.b || (this.status = this.g.status, this.statusText = this.g.statusText, this.b = a.headers, this.readyState = 2, Yh(this)), this.a && (this.readyState = 3, Yh(this), this.a && ("arraybuffer" === this.responseType ? a.arrayBuffer().then(this.sc.bind(this), this.Va.bind(this)) : "undefined" !== typeof l.ReadableStream && "body" in a ? (this.response = this.responseText = "", this.c = a.body.getReader(), this.m = new TextDecoder(), $h(this)) : a.text().then(this.tc.bind(this), this.Va.bind(this)))));
  };
  function $h(a) {
    a.c.read().then(a.pc.bind(a)).catch(a.Va.bind(a));
  }
  k.pc = function(a) {
    if (this.a) {
      var b = this.m.decode(a.value ? a.value : new Uint8Array(0), {
        stream: !a.done
      });
      b && (this.response = this.responseText += b);
      a.done ? Zh(this) : Yh(this);
      3 == this.readyState && $h(this);
    }
  };
  k.tc = function(a) {
    this.a && (this.response = this.responseText = a, Zh(this));
  };
  k.sc = function(a) {
    this.a && (this.response = a, Zh(this));
  };
  k.Va = function(a) {
    var b = this.i;
    b && b.log(Nh, "Failed to fetch url " + this.f, a instanceof Error ? a : Error(a));
    this.a && Zh(this);
  };
  function Zh(a) {
    a.readyState = 4;
    a.g = null;
    a.c = null;
    a.m = null;
    Yh(a);
  }
  k.setRequestHeader = function(a, b) {
    this.l.append(a, b);
  };
  k.getResponseHeader = function(a) {
    return this.b ? this.b.get(a.toLowerCase()) || "" : ((a = this.i) && a.log(Nh, "Attempting to get response header but no headers have been received for url: " + this.f, void 0), "");
  };
  k.getAllResponseHeaders = function() {
    if (!this.b) {
      var a = this.i;
      a && a.log(Nh, "Attempting to get all response headers but no headers have been received for url: " + this.f, void 0);
      return "";
    }
    a = [];
    for (var b = this.b.entries(), c = b.next(); !c.done; ) c = c.value, a.push(c[0] + ": " + c[1]), c = b.next();
    return a.join("\r\n");
  };
  function Yh(a) {
    a.onreadystatechange && a.onreadystatechange.call(a);
  }
  Object.defineProperty(Wh.prototype, "withCredentials", {
    get: function() {
      return "include" === this.h;
    },
    set: function(a) {
      this.h = a ? "include" : "same-origin";
    }
  });
  function ai(a) {
    H.call(this);
    this.headers = new Jd();
    this.D = a || null;
    this.c = false;
    this.C = this.a = null;
    this.h = this.P = this.l = "";
    this.f = this.N = this.i = this.J = false;
    this.g = 0;
    this.s = null;
    this.m = bi;
    this.u = this.S = false;
  }
  r(ai, H);
  var bi = "";
  ai.prototype.b = Th("goog.net.XhrIo");
  var ci = /^https?$/i, di = ["POST", "PUT"];
  function ei(a, b, c, d, e) {
    if (a.a) throw Error("[goog.net.XhrIo] Object is active with another request=" + a.l + "; newUri=" + b);
    c = c ? c.toUpperCase() : "GET";
    a.l = b;
    a.h = "";
    a.P = c;
    a.J = false;
    a.c = true;
    a.a = a.D ? a.D.a() : Ch.a();
    a.C = a.D ? Bh(a.D) : Bh(Ch);
    a.a.onreadystatechange = q(a.Wb, a);
    try {
      Uh(a.b, fi(a, "Opening Xhr")), a.N = true, a.a.open(c, String(b), true), a.N = false;
    } catch (g) {
      Uh(a.b, fi(a, "Error opening Xhr: " + g.message));
      gi(a, g);
      return;
    }
    b = d || "";
    var f = new Jd(a.headers);
    e && Id(e, function(g, h) {
      f.set(h, g);
    });
    e = Ta(f.Y());
    d = l.FormData && b instanceof l.FormData;
    !Va(di, c) || e || d || f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    f.forEach(function(g, h) {
      this.a.setRequestHeader(h, g);
    }, a);
    a.m && (a.a.responseType = a.m);
    "withCredentials" in a.a && a.a.withCredentials !== a.S && (a.a.withCredentials = a.S);
    try {
      hi(a), 0 < a.g && (a.u = ii(a.a), Uh(a.b, fi(a, "Will abort after " + a.g + "ms if incomplete, xhr2 " + a.u)), a.u ? (a.a.timeout = a.g, a.a.ontimeout = q(a.Ma, a)) : a.s = Ed(a.Ma, a.g, a)), Uh(a.b, fi(a, "Sending request")), a.i = true, a.a.send(b), a.i = false;
    } catch (g) {
      Uh(a.b, fi(a, "Send error: " + g.message)), gi(a, g);
    }
  }
  function ii(a) {
    return Wb && fc(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout;
  }
  function Ua(a) {
    return "content-type" == a.toLowerCase();
  }
  k = ai.prototype;
  k.Ma = function() {
    "undefined" != typeof ha && this.a && (this.h = "Timed out after " + this.g + "ms, aborting", Uh(this.b, fi(this, this.h)), this.dispatchEvent("timeout"), this.abort(8));
  };
  function gi(a, b) {
    a.c = false;
    a.a && (a.f = true, a.a.abort(), a.f = false);
    a.h = b;
    ji(a);
    ki(a);
  }
  function ji(a) {
    a.J || (a.J = true, a.dispatchEvent("complete"), a.dispatchEvent("error"));
  }
  k.abort = function() {
    this.a && this.c && (Uh(this.b, fi(this, "Aborting")), this.c = false, this.f = true, this.a.abort(), this.f = false, this.dispatchEvent("complete"), this.dispatchEvent("abort"), ki(this));
  };
  k.Da = function() {
    this.a && (this.c && (this.c = false, this.f = true, this.a.abort(), this.f = false), ki(this, true));
    ai.bb.Da.call(this);
  };
  k.Wb = function() {
    this.ya || (this.N || this.i || this.f ? li(this) : this.Jc());
  };
  k.Jc = function() {
    li(this);
  };
  function li(a) {
    if (a.c && "undefined" != typeof ha) {
      if (a.C[1] && 4 == mi(a) && 2 == ni(a)) Uh(a.b, fi(a, "Local request error detected and ignored"));
      else if (a.i && 4 == mi(a)) Ed(a.Wb, 0, a);
      else if (a.dispatchEvent("readystatechange"), 4 == mi(a)) {
        Uh(a.b, fi(a, "Request complete"));
        a.c = false;
        try {
          var b = ni(a);
          a: switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var c = true;
              break a;
            default:
              c = false;
          }
          var d;
          if (!(d = c)) {
            var e;
            if (e = 0 === b) {
              var f = String(a.l).match(Md)[1] || null;
              if (!f && l.self && l.self.location) {
                var g = l.self.location.protocol;
                f = g.substr(0, g.length - 1);
              }
              e = !ci.test(f ? f.toLowerCase() : "");
            }
            d = e;
          }
          if (d) a.dispatchEvent("complete"), a.dispatchEvent("success");
          else {
            try {
              var h = 2 < mi(a) ? a.a.statusText : "";
            } catch (m) {
              Uh(a.b, "Can not get status: " + m.message), h = "";
            }
            a.h = h + " [" + ni(a) + "]";
            ji(a);
          }
        } finally {
          ki(a);
        }
      }
    }
  }
  function ki(a, b) {
    if (a.a) {
      hi(a);
      var c = a.a, d = a.C[0] ? la : null;
      a.a = null;
      a.C = null;
      b || a.dispatchEvent("ready");
      try {
        c.onreadystatechange = d;
      } catch (e) {
        (a = a.b) && a.log(Mh, "Problem encountered resetting onreadystatechange: " + e.message, void 0);
      }
    }
  }
  function hi(a) {
    a.a && a.u && (a.a.ontimeout = null);
    a.s && (l.clearTimeout(a.s), a.s = null);
  }
  function mi(a) {
    return a.a ? a.a.readyState : 0;
  }
  function ni(a) {
    try {
      return 2 < mi(a) ? a.a.status : -1;
    } catch (b) {
      return -1;
    }
  }
  function oi(a) {
    try {
      return a.a ? a.a.responseText : "";
    } catch (b) {
      return Uh(a.b, "Can not get responseText: " + b.message), "";
    }
  }
  k.getResponse = function() {
    try {
      if (!this.a) return null;
      if ("response" in this.a) return this.a.response;
      switch (this.m) {
        case bi:
        case "text":
          return this.a.responseText;
        case "arraybuffer":
          if ("mozResponseArrayBuffer" in this.a) return this.a.mozResponseArrayBuffer;
      }
      var a = this.b;
      a && a.log(Mh, "Response type " + this.m + " is not supported on this browser", void 0);
      return null;
    } catch (b) {
      return Uh(this.b, "Can not get response: " + b.message), null;
    }
  };
  function fi(a, b) {
    return b + " [" + a.P + " " + a.l + " " + ni(a) + "]";
  }
  ;
  function pi(a) {
    var b = qi;
    this.g = [];
    this.u = b;
    this.s = a || null;
    this.f = this.a = false;
    this.c = void 0;
    this.v = this.C = this.i = false;
    this.h = 0;
    this.b = null;
    this.l = 0;
  }
  pi.prototype.cancel = function(a) {
    if (this.a) this.c instanceof pi && this.c.cancel();
    else {
      if (this.b) {
        var b = this.b;
        delete this.b;
        a ? b.cancel(a) : (b.l--, 0 >= b.l && b.cancel());
      }
      this.u ? this.u.call(this.s, this) : this.v = true;
      this.a || (a = new ri(this), si(this), ti(this, false, a));
    }
  };
  pi.prototype.m = function(a, b) {
    this.i = false;
    ti(this, a, b);
  };
  function ti(a, b, c) {
    a.a = true;
    a.c = c;
    a.f = !b;
    ui(a);
  }
  function si(a) {
    if (a.a) {
      if (!a.v) throw new vi(a);
      a.v = false;
    }
  }
  function wi(a, b) {
    xi(a, null, b, void 0);
  }
  function xi(a, b, c, d) {
    a.g.push([b, c, d]);
    a.a && ui(a);
  }
  pi.prototype.then = function(a, b, c) {
    var d, e, f = new D(function(g, h) {
      d = g;
      e = h;
    });
    xi(this, d, function(g) {
      g instanceof ri ? f.cancel() : e(g);
    });
    return f.then(a, b, c);
  };
  pi.prototype.$goog_Thenable = true;
  function yi(a) {
    return Sa(a.g, function(b) {
      return oa(b[1]);
    });
  }
  function ui(a) {
    if (a.h && a.a && yi(a)) {
      var b = a.h, c = zi[b];
      c && (l.clearTimeout(c.a), delete zi[b]);
      a.h = 0;
    }
    a.b && (a.b.l--, delete a.b);
    b = a.c;
    for (var d = c = false; a.g.length && !a.i; ) {
      var e = a.g.shift(), f = e[0], g = e[1];
      e = e[2];
      if (f = a.f ? g : f) try {
        var h = f.call(e || a.s, b);
        void 0 !== h && (a.f = a.f && (h == b || h instanceof Error), a.c = b = h);
        if (Ea(b) || "function" === typeof l.Promise && b instanceof l.Promise) d = true, a.i = true;
      } catch (m) {
        b = m, a.f = true, yi(a) || (c = true);
      }
    }
    a.c = b;
    d && (h = q(a.m, a, true), d = q(a.m, a, false), b instanceof pi ? (xi(b, h, d), b.C = true) : b.then(h, d));
    c && (b = new Ai(b), zi[b.a] = b, a.h = b.a);
  }
  function vi() {
    u.call(this);
  }
  r(vi, u);
  vi.prototype.message = "Deferred has already fired";
  vi.prototype.name = "AlreadyCalledError";
  function ri() {
    u.call(this);
  }
  r(ri, u);
  ri.prototype.message = "Deferred was canceled";
  ri.prototype.name = "CanceledError";
  function Ai(a) {
    this.a = l.setTimeout(q(this.c, this), 0);
    this.b = a;
  }
  Ai.prototype.c = function() {
    delete zi[this.a];
    throw this.b;
  };
  var zi = {};
  function Bi(a) {
    var b = {}, c = b.document || document, d = yb(a).toString(), e = oc(document, "SCRIPT"), f = {
      Xb: e,
      Ma: void 0
    }, g = new pi(f), h = null, m = null != b.timeout ? b.timeout : 5e3;
    0 < m && (h = window.setTimeout(function() {
      Ci(e, true);
      var p = new Di(Ei, "Timeout reached for loading script " + d);
      si(g);
      ti(g, false, p);
    }, m), f.Ma = h);
    e.onload = e.onreadystatechange = function() {
      e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (Ci(e, b.xd || false, h), si(g), ti(g, true, null));
    };
    e.onerror = function() {
      Ci(e, true, h);
      var p = new Di(Fi, "Error while loading script " + d);
      si(g);
      ti(g, false, p);
    };
    f = b.attributes || {};
    z(f, {
      type: "text/javascript",
      charset: "UTF-8"
    });
    lc(e, f);
    Ob(e, a);
    Gi(c).appendChild(e);
    return g;
  }
  function Gi(a) {
    var b;
    return (b = (a || document).getElementsByTagName("HEAD")) && 0 != b.length ? b[0] : a.documentElement;
  }
  function qi() {
    if (this && this.Xb) {
      var a = this.Xb;
      a && "SCRIPT" == a.tagName && Ci(a, true, this.Ma);
    }
  }
  function Ci(a, b, c) {
    null != c && l.clearTimeout(c);
    a.onload = la;
    a.onerror = la;
    a.onreadystatechange = la;
    b && window.setTimeout(function() {
      a && a.parentNode && a.parentNode.removeChild(a);
    }, 0);
  }
  var Fi = 0, Ei = 1;
  function Di(a, b) {
    var c = "Jsloader error (code #" + a + ")";
    b && (c += ": " + b);
    u.call(this, c);
    this.code = a;
  }
  r(Di, u);
  function Hi(a) {
    this.f = a;
  }
  r(Hi, Ah);
  Hi.prototype.a = function() {
    return new this.f();
  };
  Hi.prototype.b = function() {
    return {};
  };
  function Ii(a, b, c) {
    this.c = a;
    a = b || {};
    this.l = a.secureTokenEndpoint || "https://securetoken.googleapis.com/v1/token";
    this.m = a.secureTokenTimeout || Ji;
    this.g = nb(a.secureTokenHeaders || Ki);
    this.h = a.firebaseEndpoint || "https://www.googleapis.com/identitytoolkit/v3/relyingparty/";
    this.i = a.identityPlatformEndpoint || "https://identitytoolkit.googleapis.com/v2/";
    this.v = a.firebaseTimeout || Li;
    this.a = nb(a.firebaseHeaders || Mi);
    c && (this.a["X-Client-Version"] = c, this.g["X-Client-Version"] = c);
    c = "Node" == Ke();
    c = l.XMLHttpRequest || c && index_esm_default.INTERNAL.node && index_esm_default.INTERNAL.node.XMLHttpRequest;
    if (!c && !Je()) throw new t("internal-error", "The XMLHttpRequest compatibility library was not found.");
    this.f = void 0;
    Je() ? this.f = new Vh(self) : Le() ? this.f = new Hi(c) : this.f = new Fh();
    this.b = null;
  }
  var Ni, Dg = "idToken", Ji = new Ze(3e4, 6e4), Ki = {
    "Content-Type": "application/x-www-form-urlencoded"
  }, Li = new Ze(3e4, 6e4), Mi = {
    "Content-Type": "application/json"
  };
  function Oi(a, b) {
    b ? a.a["X-Firebase-Locale"] = b : delete a.a["X-Firebase-Locale"];
  }
  function Pi(a, b) {
    b && (a.l = Qi("https://securetoken.googleapis.com/v1/token", b), a.h = Qi("https://www.googleapis.com/identitytoolkit/v3/relyingparty/", b), a.i = Qi("https://identitytoolkit.googleapis.com/v2/", b));
  }
  function Qi(a, b) {
    a = J(a);
    b = J(b.url);
    a.f = a.a + a.f;
    Pd(a, b.c);
    a.a = b.a;
    Qd(a, b.g);
    return a.toString();
  }
  function Ri(a, b) {
    b ? (a.a["X-Client-Version"] = b, a.g["X-Client-Version"] = b) : (delete a.a["X-Client-Version"], delete a.g["X-Client-Version"]);
  }
  Ii.prototype.T = function() {
    return this.b;
  };
  function Si(a, b, c, d, e, f, g) {
    ue() || Je() ? a = q(a.u, a) : (Ni || (Ni = new D(function(h, m) {
      Ti(h, m);
    })), a = q(a.s, a));
    a(b, c, d, e, f, g);
  }
  Ii.prototype.u = function(a, b, c, d, e, f) {
    if (Je() && ("undefined" === typeof l.fetch || "undefined" === typeof l.Headers || "undefined" === typeof l.Request)) throw new t("operation-not-supported-in-this-environment", "fetch, Headers and Request native APIs or equivalent Polyfills must be available to support HTTP requests from a Worker environment.");
    var g = new ai(this.f);
    if (f) {
      g.g = Math.max(0, f);
      var h = setTimeout(function() {
        g.dispatchEvent("timeout");
      }, f);
    }
    qd(g, "complete", function() {
      h && clearTimeout(h);
      var m = null;
      try {
        m = JSON.parse(oi(this)) || null;
      } catch (p) {
        m = null;
      }
      b && b(m);
    });
    wd(g, "ready", function() {
      h && clearTimeout(h);
      Xc(this);
    });
    wd(g, "timeout", function() {
      h && clearTimeout(h);
      Xc(this);
      b && b(null);
    });
    ei(g, a, c, d, e);
  };
  var Ui = new qb(rb, "https://apis.google.com/js/client.js?onload=%{onload}"), Vi = "__fcb" + Math.floor(1e6 * Math.random()).toString();
  function Ti(a, b) {
    if (((window.gapi || {}).client || {}).request) a();
    else {
      l[Vi] = function() {
        ((window.gapi || {}).client || {}).request ? a() : b(Error("CORS_UNSUPPORTED"));
      };
      var c = zb(Ui, {
        onload: Vi
      });
      wi(Bi(c), function() {
        b(Error("CORS_UNSUPPORTED"));
      });
    }
  }
  Ii.prototype.s = function(a, b, c, d, e) {
    var f = this;
    Ni.then(function() {
      window.gapi.client.setApiKey(f.c);
      var g = window.gapi.auth.getToken();
      window.gapi.auth.setToken(null);
      window.gapi.client.request({
        path: a,
        method: c,
        body: d,
        headers: e,
        authType: "none",
        callback: function(h) {
          window.gapi.auth.setToken(g);
          b && b(h);
        }
      });
    }).o(function(g) {
      b && b({
        error: {
          message: g && g.message || "CORS_UNSUPPORTED"
        }
      });
    });
  };
  function Wi(a, b) {
    return new D(function(c, d) {
      "refresh_token" == b.grant_type && b.refresh_token || "authorization_code" == b.grant_type && b.code ? Si(a, a.l + "?key=" + encodeURIComponent(a.c), function(e) {
        e ? e.error ? d(Xi(e)) : e.access_token && e.refresh_token ? c(e) : d(new t("internal-error")) : d(new t("network-request-failed"));
      }, "POST", fe(b).toString(), a.g, a.m.get()) : d(new t("internal-error"));
    });
  }
  function Yi(a, b, c, d, e, f, g) {
    var h = J(b + c);
    I(h, "key", a.c);
    g && I(h, "cb", Date.now().toString());
    var m = "GET" == d;
    if (m) for (var p in e) e.hasOwnProperty(p) && I(h, p, e[p]);
    return new D(function(v, B) {
      Si(a, h.toString(), function(A) {
        A ? A.error ? B(Xi(A, f || {})) : v(A) : B(new t("network-request-failed"));
      }, d, m ? void 0 : ke(Ve(e)), a.a, a.v.get());
    });
  }
  function Zi(a) {
    a = a.email;
    if ("string" !== typeof a || !De.test(a)) throw new t("invalid-email");
  }
  function $i(a) {
    "email" in a && Zi(a);
  }
  function aj(a, b) {
    return O(a, bj, {
      identifier: b,
      continueUri: Se() ? re() : "http://localhost"
    }).then(function(c) {
      return c.signinMethods || [];
    });
  }
  function cj(a) {
    return O(a, dj, {}).then(function(b) {
      return b.authorizedDomains || [];
    });
  }
  function P(a) {
    if (!a[Dg]) {
      if (a.mfaPendingCredential) throw new t("multi-factor-auth-required", null, nb(a));
      throw new t("internal-error");
    }
  }
  function ej(a) {
    if (a.phoneNumber || a.temporaryProof) {
      if (!a.phoneNumber || !a.temporaryProof) throw new t("internal-error");
    } else {
      if (!a.sessionInfo) throw new t("missing-verification-id");
      if (!a.code) throw new t("missing-verification-code");
    }
  }
  Ii.prototype.Ab = function() {
    return O(this, fj, {});
  };
  Ii.prototype.Cb = function(a, b) {
    return O(this, gj, {
      idToken: a,
      email: b
    });
  };
  Ii.prototype.Db = function(a, b) {
    return O(this, ch, {
      idToken: a,
      password: b
    });
  };
  var hj = {
    displayName: "DISPLAY_NAME",
    photoUrl: "PHOTO_URL"
  };
  k = Ii.prototype;
  k.Eb = function(a, b) {
    var c = {
      idToken: a
    }, d = [];
    lb(hj, function(e, f) {
      var g = b[f];
      null === g ? d.push(e) : f in b && (c[f] = g);
    });
    d.length && (c.deleteAttribute = d);
    return O(this, gj, c);
  };
  k.wb = function(a, b) {
    a = {
      requestType: "PASSWORD_RESET",
      email: a
    };
    z(a, b);
    return O(this, ij, a);
  };
  k.xb = function(a, b) {
    a = {
      requestType: "EMAIL_SIGNIN",
      email: a
    };
    z(a, b);
    return O(this, jj, a);
  };
  k.vb = function(a, b) {
    a = {
      requestType: "VERIFY_EMAIL",
      idToken: a
    };
    z(a, b);
    return O(this, kj, a);
  };
  k.Fb = function(a, b, c) {
    a = {
      requestType: "VERIFY_AND_CHANGE_EMAIL",
      idToken: a,
      newEmail: b
    };
    z(a, c);
    return O(this, lj, a);
  };
  function oh(a, b) {
    return O(a, mj, b);
  }
  k.gb = function(a) {
    return O(this, nj, a);
  };
  function mh(a, b) {
    return O(a, oj, b).then(function(c) {
      return c.phoneSessionInfo.sessionInfo;
    });
  }
  function pj(a) {
    if (!a.phoneVerificationInfo) throw new t("internal-error");
    if (!a.phoneVerificationInfo.sessionInfo) throw new t("missing-verification-id");
    if (!a.phoneVerificationInfo.code) throw new t("missing-verification-code");
  }
  function nh(a, b) {
    return O(a, qj, b).then(function(c) {
      return c.phoneResponseInfo.sessionInfo;
    });
  }
  function rj(a, b, c) {
    return O(a, sj, {
      idToken: b,
      deleteProvider: c
    });
  }
  function tj(a) {
    if (!a.requestUri || !a.sessionId && !a.postBody && !a.pendingToken) throw new t("internal-error");
  }
  function uj(a, b) {
    b.oauthIdToken && b.providerId && 0 == b.providerId.indexOf("oidc.") && !b.pendingToken && (a.sessionId ? b.nonce = a.sessionId : a.postBody && (a = new Ud(a.postBody), je(a, "nonce") && (b.nonce = a.get("nonce"))));
    return b;
  }
  function vj(a) {
    var b = null;
    a.needConfirmation ? (a.code = "account-exists-with-different-credential", b = zh(a)) : "FEDERATED_USER_ID_ALREADY_LINKED" == a.errorMessage ? (a.code = "credential-already-in-use", b = zh(a)) : "EMAIL_EXISTS" == a.errorMessage ? (a.code = "email-already-in-use", b = zh(a)) : a.errorMessage && (b = wj(a.errorMessage));
    if (b) throw b;
    P(a);
  }
  function Fg(a, b) {
    b.returnIdpCredential = true;
    return O(a, xj, b);
  }
  function Hg(a, b) {
    b.returnIdpCredential = true;
    return O(a, yj, b);
  }
  function Ig(a, b) {
    b.returnIdpCredential = true;
    b.autoCreate = false;
    return O(a, zj, b);
  }
  function Aj(a) {
    if (!a.oobCode) throw new t("invalid-action-code");
  }
  k.ob = function(a, b) {
    return O(this, Bj, {
      oobCode: a,
      newPassword: b
    });
  };
  k.Sa = function(a) {
    return O(this, Cj, {
      oobCode: a
    });
  };
  k.kb = function(a) {
    return O(this, Dj, {
      oobCode: a
    });
  };
  var Dj = {
    endpoint: "setAccountInfo",
    A: Aj,
    Z: "email",
    B: true
  }, Cj = {
    endpoint: "resetPassword",
    A: Aj,
    G: function(a) {
      var b = a.requestType;
      if (!b || !a.email && "EMAIL_SIGNIN" != b && "VERIFY_AND_CHANGE_EMAIL" != b) throw new t("internal-error");
    },
    B: true
  }, Ej = {
    endpoint: "signupNewUser",
    A: function(a) {
      Zi(a);
      if (!a.password) throw new t("weak-password");
    },
    G: P,
    V: true,
    B: true
  }, bj = {
    endpoint: "createAuthUri",
    B: true
  }, Fj = {
    endpoint: "deleteAccount",
    O: ["idToken"]
  }, sj = {
    endpoint: "setAccountInfo",
    O: ["idToken", "deleteProvider"],
    A: function(a) {
      if (!Array.isArray(a.deleteProvider)) throw new t("internal-error");
    }
  }, $g = {
    endpoint: "emailLinkSignin",
    O: ["email", "oobCode"],
    A: Zi,
    G: P,
    V: true,
    B: true
  }, bh = {
    endpoint: "emailLinkSignin",
    O: ["idToken", "email", "oobCode"],
    A: Zi,
    G: P,
    V: true
  }, Gj = {
    endpoint: "accounts/mfaEnrollment:finalize",
    O: ["idToken", "phoneVerificationInfo"],
    A: pj,
    G: P,
    B: true,
    Na: true
  }, Hj = {
    endpoint: "accounts/mfaSignIn:finalize",
    O: ["mfaPendingCredential", "phoneVerificationInfo"],
    A: pj,
    G: P,
    B: true,
    Na: true
  }, Ij = {
    endpoint: "getAccountInfo"
  }, jj = {
    endpoint: "getOobConfirmationCode",
    O: ["requestType"],
    A: function(a) {
      if ("EMAIL_SIGNIN" != a.requestType) throw new t("internal-error");
      Zi(a);
    },
    Z: "email",
    B: true
  }, kj = {
    endpoint: "getOobConfirmationCode",
    O: ["idToken", "requestType"],
    A: function(a) {
      if ("VERIFY_EMAIL" != a.requestType) throw new t("internal-error");
    },
    Z: "email",
    B: true
  }, lj = {
    endpoint: "getOobConfirmationCode",
    O: ["idToken", "newEmail", "requestType"],
    A: function(a) {
      if ("VERIFY_AND_CHANGE_EMAIL" != a.requestType) throw new t("internal-error");
    },
    Z: "email",
    B: true
  }, ij = {
    endpoint: "getOobConfirmationCode",
    O: ["requestType"],
    A: function(a) {
      if ("PASSWORD_RESET" != a.requestType) throw new t("internal-error");
      Zi(a);
    },
    Z: "email",
    B: true
  }, dj = {
    mb: true,
    endpoint: "getProjectConfig",
    Vb: "GET"
  }, Jj = {
    mb: true,
    endpoint: "getRecaptchaParam",
    Vb: "GET",
    G: function(a) {
      if (!a.recaptchaSiteKey) throw new t("internal-error");
    }
  }, Bj = {
    endpoint: "resetPassword",
    A: Aj,
    Z: "email",
    B: true
  }, mj = {
    endpoint: "sendVerificationCode",
    O: ["phoneNumber", "recaptchaToken"],
    Z: "sessionInfo",
    B: true
  }, gj = {
    endpoint: "setAccountInfo",
    O: ["idToken"],
    A: $i,
    V: true
  }, ch = {
    endpoint: "setAccountInfo",
    O: ["idToken"],
    A: function(a) {
      $i(a);
      if (!a.password) throw new t("weak-password");
    },
    G: P,
    V: true
  }, fj = {
    endpoint: "signupNewUser",
    G: P,
    V: true,
    B: true
  }, oj = {
    endpoint: "accounts/mfaEnrollment:start",
    O: ["idToken", "phoneEnrollmentInfo"],
    A: function(a) {
      if (!a.phoneEnrollmentInfo) throw new t("internal-error");
      if (!a.phoneEnrollmentInfo.phoneNumber) throw new t("missing-phone-number");
      if (!a.phoneEnrollmentInfo.recaptchaToken) throw new t("missing-app-credential");
    },
    G: function(a) {
      if (!a.phoneSessionInfo || !a.phoneSessionInfo.sessionInfo) throw new t("internal-error");
    },
    B: true,
    Na: true
  }, qj = {
    endpoint: "accounts/mfaSignIn:start",
    O: ["mfaPendingCredential", "mfaEnrollmentId", "phoneSignInInfo"],
    A: function(a) {
      if (!a.phoneSignInInfo || !a.phoneSignInInfo.recaptchaToken) throw new t("missing-app-credential");
    },
    G: function(a) {
      if (!a.phoneResponseInfo || !a.phoneResponseInfo.sessionInfo) throw new t("internal-error");
    },
    B: true,
    Na: true
  }, xj = {
    endpoint: "verifyAssertion",
    A: tj,
    Za: uj,
    G: vj,
    V: true,
    B: true
  }, zj = {
    endpoint: "verifyAssertion",
    A: tj,
    Za: uj,
    G: function(a) {
      if (a.errorMessage && "USER_NOT_FOUND" == a.errorMessage) throw new t("user-not-found");
      if (a.errorMessage) throw wj(a.errorMessage);
      P(a);
    },
    V: true,
    B: true
  }, yj = {
    endpoint: "verifyAssertion",
    A: function(a) {
      tj(a);
      if (!a.idToken) throw new t("internal-error");
    },
    Za: uj,
    G: vj,
    V: true
  }, Kj = {
    endpoint: "verifyCustomToken",
    A: function(a) {
      if (!a.token) throw new t("invalid-custom-token");
    },
    G: P,
    V: true,
    B: true
  }, ah = {
    endpoint: "verifyPassword",
    A: function(a) {
      Zi(a);
      if (!a.password) throw new t("wrong-password");
    },
    G: P,
    V: true,
    B: true
  }, nj = {
    endpoint: "verifyPhoneNumber",
    A: ej,
    G: P,
    B: true
  }, ih = {
    endpoint: "verifyPhoneNumber",
    A: function(a) {
      if (!a.idToken) throw new t("internal-error");
      ej(a);
    },
    G: function(a) {
      if (a.temporaryProof) throw a.code = "credential-already-in-use", zh(a);
      P(a);
    }
  }, jh = {
    Ib: {
      USER_NOT_FOUND: "user-not-found"
    },
    endpoint: "verifyPhoneNumber",
    A: ej,
    G: P,
    B: true
  }, Lj = {
    endpoint: "accounts/mfaEnrollment:withdraw",
    O: ["idToken", "mfaEnrollmentId"],
    G: function(a) {
      if (!!a[Dg] ^ !!a.refreshToken) throw new t("internal-error");
    },
    B: true,
    Na: true
  };
  function O(a, b, c) {
    if (!mf(c, b.O)) return F(new t("internal-error"));
    var d = !!b.Na, e = b.Vb || "POST", f;
    return E(c).then(b.A).then(function() {
      b.V && (c.returnSecureToken = true);
      b.B && a.b && "undefined" === typeof c.tenantId && (c.tenantId = a.b);
      return d ? Yi(a, a.i, b.endpoint, e, c, b.Ib, b.mb || false) : Yi(a, a.h, b.endpoint, e, c, b.Ib, b.mb || false);
    }).then(function(g) {
      f = g;
      return b.Za ? b.Za(c, f) : f;
    }).then(b.G).then(function() {
      if (!b.Z) return f;
      if (!(b.Z in f)) throw new t("internal-error");
      return f[b.Z];
    });
  }
  function wj(a) {
    return Xi({
      error: {
        errors: [{
          message: a
        }],
        code: 400,
        message: a
      }
    });
  }
  function Xi(a, b) {
    var c = (a.error && a.error.errors && a.error.errors[0] || {}).reason || "";
    var d = {
      keyInvalid: "invalid-api-key",
      ipRefererBlocked: "app-not-authorized"
    };
    if (c = d[c] ? new t(d[c]) : null) return c;
    c = a.error && a.error.message || "";
    d = {
      INVALID_CUSTOM_TOKEN: "invalid-custom-token",
      CREDENTIAL_MISMATCH: "custom-token-mismatch",
      MISSING_CUSTOM_TOKEN: "internal-error",
      INVALID_IDENTIFIER: "invalid-email",
      MISSING_CONTINUE_URI: "internal-error",
      INVALID_EMAIL: "invalid-email",
      INVALID_PASSWORD: "wrong-password",
      USER_DISABLED: "user-disabled",
      MISSING_PASSWORD: "internal-error",
      EMAIL_EXISTS: "email-already-in-use",
      PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
      INVALID_IDP_RESPONSE: "invalid-credential",
      INVALID_PENDING_TOKEN: "invalid-credential",
      FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
      MISSING_OR_INVALID_NONCE: "missing-or-invalid-nonce",
      INVALID_MESSAGE_PAYLOAD: "invalid-message-payload",
      INVALID_RECIPIENT_EMAIL: "invalid-recipient-email",
      INVALID_SENDER: "invalid-sender",
      EMAIL_NOT_FOUND: "user-not-found",
      RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
      EXPIRED_OOB_CODE: "expired-action-code",
      INVALID_OOB_CODE: "invalid-action-code",
      MISSING_OOB_CODE: "internal-error",
      INVALID_PROVIDER_ID: "invalid-provider-id",
      CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
      INVALID_ID_TOKEN: "invalid-user-token",
      TOKEN_EXPIRED: "user-token-expired",
      USER_NOT_FOUND: "user-token-expired",
      CORS_UNSUPPORTED: "cors-unsupported",
      DYNAMIC_LINK_NOT_ACTIVATED: "dynamic-link-not-activated",
      INVALID_APP_ID: "invalid-app-id",
      TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
      WEAK_PASSWORD: "weak-password",
      OPERATION_NOT_ALLOWED: "operation-not-allowed",
      USER_CANCELLED: "user-cancelled",
      CAPTCHA_CHECK_FAILED: "captcha-check-failed",
      INVALID_APP_CREDENTIAL: "invalid-app-credential",
      INVALID_CODE: "invalid-verification-code",
      INVALID_PHONE_NUMBER: "invalid-phone-number",
      INVALID_SESSION_INFO: "invalid-verification-id",
      INVALID_TEMPORARY_PROOF: "invalid-credential",
      MISSING_APP_CREDENTIAL: "missing-app-credential",
      MISSING_CODE: "missing-verification-code",
      MISSING_PHONE_NUMBER: "missing-phone-number",
      MISSING_SESSION_INFO: "missing-verification-id",
      QUOTA_EXCEEDED: "quota-exceeded",
      SESSION_EXPIRED: "code-expired",
      REJECTED_CREDENTIAL: "rejected-credential",
      INVALID_CONTINUE_URI: "invalid-continue-uri",
      MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
      MISSING_IOS_BUNDLE_ID: "missing-ios-bundle-id",
      UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
      INVALID_DYNAMIC_LINK_DOMAIN: "invalid-dynamic-link-domain",
      INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
      INVALID_CERT_HASH: "invalid-cert-hash",
      UNSUPPORTED_TENANT_OPERATION: "unsupported-tenant-operation",
      INVALID_TENANT_ID: "invalid-tenant-id",
      TENANT_ID_MISMATCH: "tenant-id-mismatch",
      ADMIN_ONLY_OPERATION: "admin-restricted-operation",
      INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
      MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
      MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
      MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
      EMAIL_CHANGE_NEEDS_VERIFICATION: "email-change-needs-verification",
      SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
      SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
      UNSUPPORTED_FIRST_FACTOR: "unsupported-first-factor",
      UNVERIFIED_EMAIL: "unverified-email"
    };
    z(d, b || {});
    b = (b = c.match(/^[^\s]+\s*:\s*([\s\S]*)$/)) && 1 < b.length ? b[1] : void 0;
    for (var e in d) if (0 === c.indexOf(e)) return new t(d[e], b);
    !b && a && (b = Ue(a));
    return new t("internal-error", b);
  }
  ;
  function Mj(a) {
    this.b = a;
    this.a = null;
    this.sb = Nj(this);
  }
  function Nj(a) {
    return Oj().then(function() {
      return new D(function(b, c) {
        L("gapi.iframes.getContext")().open({
          where: document.body,
          url: a.b,
          messageHandlersFilter: L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"),
          attributes: {
            style: {
              position: "absolute",
              top: "-100px",
              width: "1px",
              height: "1px"
            }
          },
          dontclear: true
        }, function(d) {
          function e() {
            clearTimeout(f);
            b();
          }
          a.a = d;
          a.a.restyle({
            setHideOnLeave: false
          });
          var f = setTimeout(function() {
            c(Error("Network Error"));
          }, Pj.get());
          d.ping(e).then(e, function() {
            c(Error("Network Error"));
          });
        });
      });
    });
  }
  function Qj(a, b) {
    return a.sb.then(function() {
      return new D(function(c) {
        a.a.send(b.type, b, c, L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"));
      });
    });
  }
  function Rj(a, b) {
    a.sb.then(function() {
      a.a.register("authEvent", b, L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"));
    });
  }
  var Sj = new qb(rb, "https://apis.google.com/js/api.js?onload=%{onload}"), Tj = new Ze(3e4, 6e4), Pj = new Ze(5e3, 15e3), Uj = null;
  function Oj() {
    return Uj ? Uj : Uj = new D(function(a, b) {
      function c() {
        Ye();
        L("gapi.load")("gapi.iframes", {
          callback: a,
          ontimeout: function() {
            Ye();
            b(Error("Network Error"));
          },
          timeout: Tj.get()
        });
      }
      if (L("gapi.iframes.Iframe")) a();
      else if (L("gapi.load")) c();
      else {
        var d = "__iframefcb" + Math.floor(1e6 * Math.random()).toString();
        l[d] = function() {
          L("gapi.load") ? c() : b(Error("Network Error"));
        };
        d = zb(Sj, {
          onload: d
        });
        E(Bi(d)).o(function() {
          b(Error("Network Error"));
        });
      }
    }).o(function(a) {
      Uj = null;
      throw a;
    });
  }
  ;
  function Vj(a, b, c, d) {
    this.l = a;
    this.h = b;
    this.i = c;
    this.g = d;
    this.f = null;
    this.g ? (a = J(this.g.url), a = ce(a.c, a.a, a.g, "/emulator/auth/iframe")) : a = ce("https", this.l, null, "/__/auth/iframe");
    this.a = a;
    I(this.a, "apiKey", this.h);
    I(this.a, "appName", this.i);
    this.b = null;
    this.c = [];
  }
  Vj.prototype.toString = function() {
    this.f ? I(this.a, "v", this.f) : ie(this.a.b, "v");
    this.b ? I(this.a, "eid", this.b) : ie(this.a.b, "eid");
    this.c.length ? I(this.a, "fw", this.c.join(",")) : ie(this.a.b, "fw");
    return this.a.toString();
  };
  function Wj(a, b, c, d, e, f) {
    this.u = a;
    this.s = b;
    this.c = c;
    this.m = d;
    this.v = f;
    this.i = this.g = this.l = null;
    this.a = e;
    this.h = this.f = null;
  }
  Wj.prototype.zb = function(a) {
    this.h = a;
    return this;
  };
  Wj.prototype.toString = function() {
    if (this.v) {
      var a = J(this.v.url);
      a = ce(a.c, a.a, a.g, "/emulator/auth/handler");
    } else a = ce("https", this.u, null, "/__/auth/handler");
    I(a, "apiKey", this.s);
    I(a, "appName", this.c);
    I(a, "authType", this.m);
    if (this.a.isOAuthProvider) {
      var b = this.a;
      try {
        var c = index_esm_default.app(this.c).auth().la();
      } catch (h) {
        c = null;
      }
      b.pb = c;
      I(a, "providerId", this.a.providerId);
      c = this.a;
      b = Ve(c.Jb);
      for (var d in b) b[d] = b[d].toString();
      d = c.Qc;
      b = nb(b);
      for (var e = 0; e < d.length; e++) {
        var f = d[e];
        f in b && delete b[f];
      }
      c.qb && c.pb && !b[c.qb] && (b[c.qb] = c.pb);
      mb(b) || I(a, "customParameters", Ue(b));
    }
    "function" === typeof this.a.Rb && (c = this.a.Rb(), c.length && I(a, "scopes", c.join(",")));
    this.l ? I(a, "redirectUrl", this.l) : ie(a.b, "redirectUrl");
    this.g ? I(a, "eventId", this.g) : ie(a.b, "eventId");
    this.i ? I(a, "v", this.i) : ie(a.b, "v");
    if (this.b) for (var g in this.b) this.b.hasOwnProperty(g) && !be(a, g) && I(a, g, this.b[g]);
    this.h ? I(a, "tid", this.h) : ie(a.b, "tid");
    this.f ? I(a, "eid", this.f) : ie(a.b, "eid");
    g = Xj(this.c);
    g.length && I(a, "fw", g.join(","));
    return a.toString();
  };
  function Xj(a) {
    try {
      return index_esm_default.app(a).auth().Ga();
    } catch (b) {
      return [];
    }
  }
  function Yj(a, b, c, d, e, f) {
    this.s = a;
    this.g = b;
    this.b = c;
    this.f = f;
    this.c = d || null;
    this.i = e || null;
    this.l = this.u = this.C = null;
    this.h = [];
    this.m = this.a = null;
  }
  function Zj(a) {
    var b = re();
    return cj(a).then(function(c) {
      a: {
        var d = J(b), e = d.c;
        d = d.a;
        for (var f = 0; f < c.length; f++) {
          var g = c[f];
          var h = d;
          var m = e;
          0 == g.indexOf("chrome-extension://") ? h = J(g).a == h && "chrome-extension" == m : "http" != m && "https" != m ? h = false : Ce.test(g) ? h = h == g : (g = g.split(".").join("\\."), h = new RegExp("^(.+\\." + g + "|" + g + ")$", "i").test(h));
          if (h) {
            c = true;
            break a;
          }
        }
        c = false;
      }
      if (!c) throw new xh(re());
    });
  }
  function ak(a) {
    if (a.m) return a.m;
    a.m = Ee().then(function() {
      if (!a.u) {
        var b = a.c, c = a.i, d = Xj(a.b), e = new Vj(a.s, a.g, a.b, a.f);
        e.f = b;
        e.b = c;
        e.c = Za(d || []);
        a.u = e.toString();
      }
      a.v = new Mj(a.u);
      bk(a);
    });
    return a.m;
  }
  k = Yj.prototype;
  k.Pb = function(a, b, c) {
    var d = new t("popup-closed-by-user"), e = new t("web-storage-unsupported"), f = this, g = false;
    return this.ma().then(function() {
      ck(f).then(function(h) {
        h || (a && ye(a), b(e), g = true);
      });
    }).o(function() {
    }).then(function() {
      if (!g) return Be(a);
    }).then(function() {
      if (!g) return Fd(c).then(function() {
        b(d);
      });
    });
  };
  k.Yb = function() {
    var a = K();
    return !Te(a) && !Xe(a);
  };
  k.Ub = function() {
    return false;
  };
  k.Nb = function(a, b, c, d, e, f, g, h) {
    if (!a) return F(new t("popup-blocked"));
    if (g && !Te()) return this.ma().o(function(p) {
      ye(a);
      e(p);
    }), d(), E();
    this.a || (this.a = Zj(dk(this)));
    var m = this;
    return this.a.then(function() {
      var p = m.ma().o(function(v) {
        ye(a);
        e(v);
        throw v;
      });
      d();
      return p;
    }).then(function() {
      rh(c);
      if (!g) {
        var p = ek(m.s, m.g, m.b, b, c, null, f, m.c, void 0, m.i, h, m.f);
        se(p, a);
      }
    }).o(function(p) {
      "auth/network-request-failed" == p.code && (m.a = null);
      throw p;
    });
  };
  function dk(a) {
    a.l || (a.C = a.c ? Oe(a.c, Xj(a.b)) : null, a.l = new Ii(a.g, Ca(a.i), a.C), a.f && Pi(a.l, a.f));
    return a.l;
  }
  k.Ob = function(a, b, c, d) {
    this.a || (this.a = Zj(dk(this)));
    var e = this;
    return this.a.then(function() {
      rh(b);
      var f = ek(e.s, e.g, e.b, a, b, re(), c, e.c, void 0, e.i, d, e.f);
      se(f);
    }).o(function(f) {
      "auth/network-request-failed" == f.code && (e.a = null);
      throw f;
    });
  };
  k.ma = function() {
    var a = this;
    return ak(this).then(function() {
      return a.v.sb;
    }).o(function() {
      a.a = null;
      throw new t("network-request-failed");
    });
  };
  k.ac = function() {
    return true;
  };
  function ek(a, b, c, d, e, f, g, h, m, p, v, B) {
    a = new Wj(a, b, c, d, e, B);
    a.l = f;
    a.g = g;
    a.i = h;
    a.b = nb(m || null);
    a.f = p;
    return a.zb(v).toString();
  }
  function bk(a) {
    if (!a.v) throw Error("IfcHandler must be initialized!");
    Rj(a.v, function(b) {
      var c = {};
      if (b && b.authEvent) {
        var d = false;
        b = th(b.authEvent);
        for (c = 0; c < a.h.length; c++) d = a.h[c](b) || d;
        c = {};
        c.status = d ? "ACK" : "ERROR";
        return E(c);
      }
      c.status = "ERROR";
      return E(c);
    });
  }
  function ck(a) {
    var b = {
      type: "webStorageSupport"
    };
    return ak(a).then(function() {
      return Qj(a.v, b);
    }).then(function(c) {
      if (c && c.length && "undefined" !== typeof c[0].webStorageSupport) return c[0].webStorageSupport;
      throw Error();
    });
  }
  k.Ea = function(a) {
    this.h.push(a);
  };
  k.Ta = function(a) {
    Xa(this.h, function(b) {
      return b == a;
    });
  };
  function fk(a) {
    this.a = a || index_esm_default.INTERNAL.reactNative && index_esm_default.INTERNAL.reactNative.AsyncStorage;
    if (!this.a) throw new t("internal-error", "The React Native compatibility library was not found.");
    this.type = "asyncStorage";
  }
  k = fk.prototype;
  k.get = function(a) {
    return E(this.a.getItem(a)).then(function(b) {
      return b && We(b);
    });
  };
  k.set = function(a, b) {
    return E(this.a.setItem(a, Ue(b)));
  };
  k.U = function(a) {
    return E(this.a.removeItem(a));
  };
  k.ca = function() {
  };
  k.ia = function() {
  };
  function gk(a) {
    this.b = a;
    this.a = {};
    this.f = q(this.c, this);
  }
  var hk = [];
  function ik() {
    var a = Je() ? self : null;
    w(hk, function(c) {
      c.b == a && (b = c);
    });
    if (!b) {
      var b = new gk(a);
      hk.push(b);
    }
    return b;
  }
  gk.prototype.c = function(a) {
    var b = a.data.eventType, c = a.data.eventId, d = this.a[b];
    if (d && 0 < d.length) {
      a.ports[0].postMessage({
        status: "ack",
        eventId: c,
        eventType: b,
        response: null
      });
      var e = [];
      w(d, function(f) {
        e.push(E().then(function() {
          return f(a.origin, a.data.data);
        }));
      });
      Jc(e).then(function(f) {
        var g = [];
        w(f, function(h) {
          g.push({
            fulfilled: h.Qb,
            value: h.value,
            reason: h.reason ? h.reason.message : void 0
          });
        });
        w(g, function(h) {
          for (var m in h) "undefined" === typeof h[m] && delete h[m];
        });
        a.ports[0].postMessage({
          status: "done",
          eventId: c,
          eventType: b,
          response: g
        });
      });
    }
  };
  function jk(a, b, c) {
    mb(a.a) && a.b.addEventListener("message", a.f);
    "undefined" === typeof a.a[b] && (a.a[b] = []);
    a.a[b].push(c);
  }
  ;
  function kk(a) {
    this.a = a;
  }
  kk.prototype.postMessage = function(a, b) {
    this.a.postMessage(a, b);
  };
  function lk(a) {
    this.c = a;
    this.b = false;
    this.a = [];
  }
  function mk(a, b, c, d) {
    var e, f = c || {}, g, h, m, p = null;
    if (a.b) return F(Error("connection_unavailable"));
    var v = d ? 800 : 50, B = "undefined" !== typeof MessageChannel ? new MessageChannel() : null;
    return new D(function(A, Q) {
      B ? (e = Math.floor(Math.random() * Math.pow(10, 20)).toString(), B.port1.start(), h = setTimeout(function() {
        Q(Error("unsupported_event"));
      }, v), g = function(ya) {
        ya.data.eventId === e && ("ack" === ya.data.status ? (clearTimeout(h), m = setTimeout(function() {
          Q(Error("timeout"));
        }, 3e3)) : "done" === ya.data.status ? (clearTimeout(m), "undefined" !== typeof ya.data.response ? A(ya.data.response) : Q(Error("unknown_error"))) : (clearTimeout(h), clearTimeout(m), Q(Error("invalid_response"))));
      }, p = {
        messageChannel: B,
        onMessage: g
      }, a.a.push(p), B.port1.addEventListener("message", g), a.c.postMessage({
        eventType: b,
        eventId: e,
        data: f
      }, [B.port2])) : Q(Error("connection_unavailable"));
    }).then(function(A) {
      nk(a, p);
      return A;
    }).o(function(A) {
      nk(a, p);
      throw A;
    });
  }
  function nk(a, b) {
    if (b) {
      var c = b.messageChannel, d = b.onMessage;
      c && (c.port1.removeEventListener("message", d), c.port1.close());
      Xa(a.a, function(e) {
        return e == b;
      });
    }
  }
  lk.prototype.close = function() {
    for (; 0 < this.a.length; ) nk(this, this.a[0]);
    this.b = true;
  };
  function ok() {
    if (!pk()) throw new t("web-storage-unsupported");
    this.c = {};
    this.a = [];
    this.b = 0;
    this.m = l.indexedDB;
    this.type = "indexedDB";
    this.g = this.v = this.f = this.l = null;
    this.s = false;
    this.h = null;
    var a = this;
    Je() && self ? (this.v = ik(), jk(this.v, "keyChanged", function(b, c) {
      return qk(a).then(function(d) {
        0 < d.length && w(a.a, function(e) {
          e(d);
        });
        return {
          keyProcessed: Va(d, c.key)
        };
      });
    }), jk(this.v, "ping", function() {
      return E(["keyChanged"]);
    })) : ef().then(function(b) {
      if (a.h = b) a.g = new lk(new kk(b)), mk(a.g, "ping", null, true).then(function(c) {
        c[0].fulfilled && Va(c[0].value, "keyChanged") && (a.s = true);
      }).o(function() {
      });
    });
  }
  var rk;
  function sk(a) {
    return new D(function(b, c) {
      var d = a.m.deleteDatabase("firebaseLocalStorageDb");
      d.onsuccess = function() {
        b();
      };
      d.onerror = function(e) {
        c(Error(e.target.error));
      };
    });
  }
  function tk(a) {
    return new D(function(b, c) {
      var d = a.m.open("firebaseLocalStorageDb", 1);
      d.onerror = function(e) {
        try {
          e.preventDefault();
        } catch (f) {
        }
        c(Error(e.target.error));
      };
      d.onupgradeneeded = function(e) {
        e = e.target.result;
        try {
          e.createObjectStore("firebaseLocalStorage", {
            keyPath: "fbase_key"
          });
        } catch (f) {
          c(f);
        }
      };
      d.onsuccess = function(e) {
        e = e.target.result;
        e.objectStoreNames.contains("firebaseLocalStorage") ? b(e) : sk(a).then(function() {
          return tk(a);
        }).then(function(f) {
          b(f);
        }).o(function(f) {
          c(f);
        });
      };
    });
  }
  function uk(a) {
    a.i || (a.i = tk(a));
    return a.i;
  }
  function vk(a, b) {
    function c(e, f) {
      uk(a).then(b).then(e).o(function(g) {
        if (3 < ++d) f(g);
        else return uk(a).then(function(h) {
          h.close();
          a.i = void 0;
          return c(e, f);
        }).o(function(h) {
          f(h);
        });
      });
    }
    var d = 0;
    return new D(c);
  }
  function pk() {
    try {
      return !!l.indexedDB;
    } catch (a) {
      return false;
    }
  }
  function wk(a) {
    return a.objectStore("firebaseLocalStorage");
  }
  function xk(a, b) {
    return a.transaction(["firebaseLocalStorage"], b ? "readwrite" : "readonly");
  }
  function yk(a) {
    return new D(function(b, c) {
      a.onsuccess = function(d) {
        d && d.target ? b(d.target.result) : b();
      };
      a.onerror = function(d) {
        c(d.target.error);
      };
    });
  }
  k = ok.prototype;
  k.set = function(a, b) {
    var c = this, d = false;
    return vk(this, function(e) {
      e = wk(xk(e, true));
      return yk(e.get(a));
    }).then(function(e) {
      return vk(c, function(f) {
        f = wk(xk(f, true));
        if (e) return e.value = b, yk(f.put(e));
        c.b++;
        d = true;
        var g = {};
        g.fbase_key = a;
        g.value = b;
        return yk(f.add(g));
      });
    }).then(function() {
      c.c[a] = b;
      return zk(c, a);
    }).oa(function() {
      d && c.b--;
    });
  };
  function zk(a, b) {
    return a.g && a.h && df() === a.h ? mk(a.g, "keyChanged", {
      key: b
    }, a.s).then(function() {
    }).o(function() {
    }) : E();
  }
  k.get = function(a) {
    return vk(this, function(b) {
      return yk(wk(xk(b, false)).get(a));
    }).then(function(b) {
      return b && b.value;
    });
  };
  k.U = function(a) {
    var b = this, c = false;
    return vk(this, function(d) {
      c = true;
      b.b++;
      return yk(wk(xk(d, true))["delete"](a));
    }).then(function() {
      delete b.c[a];
      return zk(b, a);
    }).oa(function() {
      c && b.b--;
    });
  };
  function qk(a) {
    return uk(a).then(function(b) {
      var c = wk(xk(b, false));
      return c.getAll ? yk(c.getAll()) : new D(function(d, e) {
        var f = [], g = c.openCursor();
        g.onsuccess = function(h) {
          (h = h.target.result) ? (f.push(h.value), h["continue"]()) : d(f);
        };
        g.onerror = function(h) {
          e(h.target.error);
        };
      });
    }).then(function(b) {
      var c = {}, d = [];
      if (0 == a.b) {
        for (d = 0; d < b.length; d++) c[b[d].fbase_key] = b[d].value;
        d = te(a.c, c);
        a.c = c;
      }
      return d;
    });
  }
  k.ca = function(a) {
    0 == this.a.length && Ak(this);
    this.a.push(a);
  };
  k.ia = function(a) {
    Xa(this.a, function(b) {
      return b == a;
    });
    0 == this.a.length && Bk(this);
  };
  function Ak(a) {
    function b() {
      a.f = setTimeout(function() {
        a.l = qk(a).then(function(c) {
          0 < c.length && w(a.a, function(d) {
            d(c);
          });
        }).then(function() {
          b();
        }).o(function(c) {
          "STOP_EVENT" != c.message && b();
        });
      }, 800);
    }
    Bk(a);
    b();
  }
  function Bk(a) {
    a.l && a.l.cancel("STOP_EVENT");
    a.f && (clearTimeout(a.f), a.f = null);
  }
  ;
  function Ck(a) {
    var b = this, c = null;
    this.a = [];
    this.type = "indexedDB";
    this.c = a;
    this.b = E().then(function() {
      if (pk()) {
        var d = Qe(), e = "__sak" + d;
        rk || (rk = new ok());
        c = rk;
        return c.set(e, d).then(function() {
          return c.get(e);
        }).then(function(f) {
          if (f !== d) throw Error("indexedDB not supported!");
          return c.U(e);
        }).then(function() {
          return c;
        }).o(function() {
          return b.c;
        });
      }
      return b.c;
    }).then(function(d) {
      b.type = d.type;
      d.ca(function(e) {
        w(b.a, function(f) {
          f(e);
        });
      });
      return d;
    });
  }
  k = Ck.prototype;
  k.get = function(a) {
    return this.b.then(function(b) {
      return b.get(a);
    });
  };
  k.set = function(a, b) {
    return this.b.then(function(c) {
      return c.set(a, b);
    });
  };
  k.U = function(a) {
    return this.b.then(function(b) {
      return b.U(a);
    });
  };
  k.ca = function(a) {
    this.a.push(a);
  };
  k.ia = function(a) {
    Xa(this.a, function(b) {
      return b == a;
    });
  };
  function Dk() {
    this.a = {};
    this.type = "inMemory";
  }
  k = Dk.prototype;
  k.get = function(a) {
    return E(this.a[a]);
  };
  k.set = function(a, b) {
    this.a[a] = b;
    return E();
  };
  k.U = function(a) {
    delete this.a[a];
    return E();
  };
  k.ca = function() {
  };
  k.ia = function() {
  };
  function Ek() {
    if (!Fk()) {
      if ("Node" == Ke()) throw new t("internal-error", "The LocalStorage compatibility library was not found.");
      throw new t("web-storage-unsupported");
    }
    this.a = Gk() || index_esm_default.INTERNAL.node.localStorage;
    this.type = "localStorage";
  }
  function Gk() {
    try {
      var a = l.localStorage, b = Qe();
      a && (a.setItem(b, "1"), a.removeItem(b));
      return a;
    } catch (c) {
      return null;
    }
  }
  function Fk() {
    var a = "Node" == Ke();
    a = Gk() || a && index_esm_default.INTERNAL.node && index_esm_default.INTERNAL.node.localStorage;
    if (!a) return false;
    try {
      return a.setItem("__sak", "1"), a.removeItem("__sak"), true;
    } catch (b) {
      return false;
    }
  }
  k = Ek.prototype;
  k.get = function(a) {
    var b = this;
    return E().then(function() {
      var c = b.a.getItem(a);
      return We(c);
    });
  };
  k.set = function(a, b) {
    var c = this;
    return E().then(function() {
      var d = Ue(b);
      null === d ? c.U(a) : c.a.setItem(a, d);
    });
  };
  k.U = function(a) {
    var b = this;
    return E().then(function() {
      b.a.removeItem(a);
    });
  };
  k.ca = function(a) {
    l.window && nd(l.window, "storage", a);
  };
  k.ia = function(a) {
    l.window && xd(l.window, "storage", a);
  };
  function Hk() {
    this.type = "nullStorage";
  }
  k = Hk.prototype;
  k.get = function() {
    return E(null);
  };
  k.set = function() {
    return E();
  };
  k.U = function() {
    return E();
  };
  k.ca = function() {
  };
  k.ia = function() {
  };
  function Ik() {
    if (!Jk()) {
      if ("Node" == Ke()) throw new t("internal-error", "The SessionStorage compatibility library was not found.");
      throw new t("web-storage-unsupported");
    }
    this.a = Kk() || index_esm_default.INTERNAL.node.sessionStorage;
    this.type = "sessionStorage";
  }
  function Kk() {
    try {
      var a = l.sessionStorage, b = Qe();
      a && (a.setItem(b, "1"), a.removeItem(b));
      return a;
    } catch (c) {
      return null;
    }
  }
  function Jk() {
    var a = "Node" == Ke();
    a = Kk() || a && index_esm_default.INTERNAL.node && index_esm_default.INTERNAL.node.sessionStorage;
    if (!a) return false;
    try {
      return a.setItem("__sak", "1"), a.removeItem("__sak"), true;
    } catch (b) {
      return false;
    }
  }
  k = Ik.prototype;
  k.get = function(a) {
    var b = this;
    return E().then(function() {
      var c = b.a.getItem(a);
      return We(c);
    });
  };
  k.set = function(a, b) {
    var c = this;
    return E().then(function() {
      var d = Ue(b);
      null === d ? c.U(a) : c.a.setItem(a, d);
    });
  };
  k.U = function(a) {
    var b = this;
    return E().then(function() {
      b.a.removeItem(a);
    });
  };
  k.ca = function() {
  };
  k.ia = function() {
  };
  function Lk() {
    var a = {};
    a.Browser = Mk;
    a.Node = Nk;
    a.ReactNative = Ok;
    a.Worker = Pk;
    this.a = a[Ke()];
  }
  var Qk, Mk = {
    F: Ek,
    cb: Ik
  }, Nk = {
    F: Ek,
    cb: Ik
  }, Ok = {
    F: fk,
    cb: Hk
  }, Pk = {
    F: Ek,
    cb: Hk
  };
  var Rk = {
    rd: "local",
    NONE: "none",
    td: "session"
  };
  function Sk(a) {
    var b = new t("invalid-persistence-type"), c = new t("unsupported-persistence-type");
    a: {
      for (d in Rk) if (Rk[d] == a) {
        var d = true;
        break a;
      }
      d = false;
    }
    if (!d || "string" !== typeof a) throw b;
    switch (Ke()) {
      case "ReactNative":
        if ("session" === a) throw c;
        break;
      case "Node":
        if ("none" !== a) throw c;
        break;
      case "Worker":
        if ("session" === a || !pk() && "none" !== a) throw c;
        break;
      default:
        if (!Pe() && "none" !== a) throw c;
    }
  }
  function Tk() {
    var a = !Xe(K()) && Ie() ? true : false, b = Te(), c = Pe();
    this.m = a;
    this.h = b;
    this.l = c;
    this.a = {};
    Qk || (Qk = new Lk());
    a = Qk;
    try {
      this.g = !qe() && cf() || !l.indexedDB ? new a.a.F() : new Ck(Je() ? new Dk() : new a.a.F());
    } catch (d) {
      this.g = new Dk(), this.h = true;
    }
    try {
      this.i = new a.a.cb();
    } catch (d) {
      this.i = new Dk();
    }
    this.v = new Dk();
    this.f = q(this.Zb, this);
    this.b = {};
  }
  var Uk;
  function Vk() {
    Uk || (Uk = new Tk());
    return Uk;
  }
  function Wk(a, b) {
    switch (b) {
      case "session":
        return a.i;
      case "none":
        return a.v;
      default:
        return a.g;
    }
  }
  function Xk(a, b) {
    return "firebase:" + a.name + (b ? ":" + b : "");
  }
  function Yk(a, b, c) {
    var d = Xk(b, c), e = Wk(a, b.F);
    return a.get(b, c).then(function(f) {
      var g = null;
      try {
        g = We(l.localStorage.getItem(d));
      } catch (h) {
      }
      if (g && !f) return l.localStorage.removeItem(d), a.set(b, g, c);
      g && f && "localStorage" != e.type && l.localStorage.removeItem(d);
    });
  }
  k = Tk.prototype;
  k.get = function(a, b) {
    return Wk(this, a.F).get(Xk(a, b));
  };
  function Zk(a, b, c) {
    c = Xk(b, c);
    "local" == b.F && (a.b[c] = null);
    return Wk(a, b.F).U(c);
  }
  k.set = function(a, b, c) {
    var d = Xk(a, c), e = this, f = Wk(this, a.F);
    return f.set(d, b).then(function() {
      return f.get(d);
    }).then(function(g) {
      "local" == a.F && (e.b[d] = g);
    });
  };
  k.addListener = function(a, b, c) {
    a = Xk(a, b);
    this.l && (this.b[a] = l.localStorage.getItem(a));
    mb(this.a) && (Wk(this, "local").ca(this.f), this.h || (qe() || !cf()) && l.indexedDB || !this.l || $k(this));
    this.a[a] || (this.a[a] = []);
    this.a[a].push(c);
  };
  k.removeListener = function(a, b, c) {
    a = Xk(a, b);
    this.a[a] && (Xa(this.a[a], function(d) {
      return d == c;
    }), 0 == this.a[a].length && delete this.a[a]);
    mb(this.a) && (Wk(this, "local").ia(this.f), al(this));
  };
  function $k(a) {
    al(a);
    a.c = setInterval(function() {
      for (var b in a.a) {
        var c = l.localStorage.getItem(b), d = a.b[b];
        c != d && (a.b[b] = c, c = new bd({
          type: "storage",
          key: b,
          target: window,
          oldValue: d,
          newValue: c,
          a: true
        }), a.Zb(c));
      }
    }, 1e3);
  }
  function al(a) {
    a.c && (clearInterval(a.c), a.c = null);
  }
  k.Zb = function(a) {
    if (a && a.g) {
      var b = a.a.key;
      if (null == b) for (var c in this.a) {
        var d = this.b[c];
        "undefined" === typeof d && (d = null);
        var e = l.localStorage.getItem(c);
        e !== d && (this.b[c] = e, this.nb(c));
      }
      else if (0 == b.indexOf("firebase:") && this.a[b]) {
        "undefined" !== typeof a.a.a ? Wk(this, "local").ia(this.f) : al(this);
        if (this.m) {
          if (c = l.localStorage.getItem(b), d = a.a.newValue, d !== c) null !== d ? l.localStorage.setItem(b, d) : l.localStorage.removeItem(b);
          else if (this.b[b] === d && "undefined" === typeof a.a.a) return;
        }
        var f = this;
        c = function() {
          if ("undefined" !== typeof a.a.a || f.b[b] !== l.localStorage.getItem(b)) f.b[b] = l.localStorage.getItem(b), f.nb(b);
        };
        Wb && ic && 10 == ic && l.localStorage.getItem(b) !== a.a.newValue && a.a.newValue !== a.a.oldValue ? setTimeout(c, 10) : c();
      }
    } else w(a, q(this.nb, this));
  };
  k.nb = function(a) {
    this.a[a] && w(this.a[a], function(b) {
      b();
    });
  };
  function bl(a) {
    this.a = a;
    this.b = Vk();
  }
  var cl = {
    name: "authEvent",
    F: "local"
  };
  function dl(a) {
    return a.b.get(cl, a.a).then(function(b) {
      return th(b);
    });
  }
  ;
  function el() {
    this.a = Vk();
  }
  ;
  function fl() {
    this.b = -1;
  }
  ;
  function gl(a, b) {
    this.b = hl;
    this.f = l.Uint8Array ? new Uint8Array(this.b) : Array(this.b);
    this.g = this.c = 0;
    this.a = [];
    this.i = a;
    this.h = b;
    this.l = l.Int32Array ? new Int32Array(64) : Array(64);
    void 0 === il && (l.Int32Array ? il = new Int32Array(jl) : il = jl);
    this.reset();
  }
  var il;
  r(gl, fl);
  for (var hl = 64, kl = hl - 1, ll = [], ml = 0; ml < kl; ml++) ll[ml] = 0;
  var nl = Ya(128, ll);
  gl.prototype.reset = function() {
    this.g = this.c = 0;
    this.a = l.Int32Array ? new Int32Array(this.h) : Za(this.h);
  };
  function ol(a) {
    for (var b = a.f, c = a.l, d = 0, e = 0; e < b.length; ) c[d++] = b[e] << 24 | b[e + 1] << 16 | b[e + 2] << 8 | b[e + 3], e = 4 * d;
    for (b = 16; 64 > b; b++) {
      e = c[b - 15] | 0;
      d = c[b - 2] | 0;
      var f = (c[b - 16] | 0) + ((e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3) | 0, g = (c[b - 7] | 0) + ((d >>> 17 | d << 15) ^ (d >>> 19 | d << 13) ^ d >>> 10) | 0;
      c[b] = f + g | 0;
    }
    d = a.a[0] | 0;
    e = a.a[1] | 0;
    var h = a.a[2] | 0, m = a.a[3] | 0, p = a.a[4] | 0, v = a.a[5] | 0, B = a.a[6] | 0;
    f = a.a[7] | 0;
    for (b = 0; 64 > b; b++) {
      var A = ((d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10)) + (d & e ^ d & h ^ e & h) | 0;
      g = p & v ^ ~p & B;
      f = f + ((p >>> 6 | p << 26) ^ (p >>> 11 | p << 21) ^ (p >>> 25 | p << 7)) | 0;
      g = g + (il[b] | 0) | 0;
      g = f + (g + (c[b] | 0) | 0) | 0;
      f = B;
      B = v;
      v = p;
      p = m + g | 0;
      m = h;
      h = e;
      e = d;
      d = g + A | 0;
    }
    a.a[0] = a.a[0] + d | 0;
    a.a[1] = a.a[1] + e | 0;
    a.a[2] = a.a[2] + h | 0;
    a.a[3] = a.a[3] + m | 0;
    a.a[4] = a.a[4] + p | 0;
    a.a[5] = a.a[5] + v | 0;
    a.a[6] = a.a[6] + B | 0;
    a.a[7] = a.a[7] + f | 0;
  }
  function pl(a, b, c) {
    void 0 === c && (c = b.length);
    var d = 0, e = a.c;
    if ("string" === typeof b) for (; d < c; ) a.f[e++] = b.charCodeAt(d++), e == a.b && (ol(a), e = 0);
    else if (na(b)) for (; d < c; ) {
      var f = b[d++];
      if (!("number" == typeof f && 0 <= f && 255 >= f && f == (f | 0))) throw Error("message must be a byte array");
      a.f[e++] = f;
      e == a.b && (ol(a), e = 0);
    }
    else throw Error("message must be string or array");
    a.c = e;
    a.g += c;
  }
  var jl = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
  function ql() {
    gl.call(this, 8, rl);
  }
  r(ql, gl);
  var rl = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
  function sl(a, b, c, d, e, f) {
    this.v = a;
    this.i = b;
    this.l = c;
    this.m = d || null;
    this.u = e || null;
    this.s = f;
    this.h = b + ":" + c;
    this.C = new el();
    this.g = new bl(this.h);
    this.f = null;
    this.b = [];
    this.a = this.c = null;
  }
  function tl(a) {
    return new t("invalid-cordova-configuration", a);
  }
  k = sl.prototype;
  k.ma = function() {
    return this.Ia ? this.Ia : this.Ia = Fe().then(function() {
      if ("function" !== typeof L("universalLinks.subscribe", l)) throw tl("cordova-universal-links-plugin-fix is not installed");
      if ("undefined" === typeof L("BuildInfo.packageName", l)) throw tl("cordova-plugin-buildinfo is not installed");
      if ("function" !== typeof L("cordova.plugins.browsertab.openUrl", l)) throw tl("cordova-plugin-browsertab is not installed");
      if ("function" !== typeof L("cordova.InAppBrowser.open", l)) throw tl("cordova-plugin-inappbrowser is not installed");
    }, function() {
      throw new t("cordova-not-ready");
    });
  };
  function ul() {
    for (var a = 20, b = []; 0 < a; ) b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()))), a--;
    return b.join("");
  }
  function vl(a) {
    var b = new ql();
    pl(b, a);
    a = [];
    var c = 8 * b.g;
    56 > b.c ? pl(b, nl, 56 - b.c) : pl(b, nl, b.b - (b.c - 56));
    for (var d = 63; 56 <= d; d--) b.f[d] = c & 255, c /= 256;
    ol(b);
    for (d = c = 0; d < b.i; d++) for (var e = 24; 0 <= e; e -= 8) a[c++] = b.a[d] >> e & 255;
    return cg(a);
  }
  k.Pb = function(a, b) {
    b(new t("operation-not-supported-in-this-environment"));
    return E();
  };
  k.Nb = function() {
    return F(new t("operation-not-supported-in-this-environment"));
  };
  k.ac = function() {
    return false;
  };
  k.Yb = function() {
    return true;
  };
  k.Ub = function() {
    return true;
  };
  k.Ob = function(a, b, c, d) {
    if (this.c) return F(new t("redirect-operation-pending"));
    var e = this, f = l.document, g = null, h = null, m = null, p = null;
    return this.c = E().then(function() {
      rh(b);
      return wl(e);
    }).then(function() {
      return xl(e, a, b, c, d);
    }).then(function() {
      return new D(function(v, B) {
        h = function() {
          var A = L("cordova.plugins.browsertab.close", l);
          v();
          "function" === typeof A && A();
          e.a && "function" === typeof e.a.close && (e.a.close(), e.a = null);
          return false;
        };
        e.Ea(h);
        m = function() {
          g || (g = Fd(2e3).then(function() {
            B(new t("redirect-cancelled-by-user"));
          }));
        };
        p = function() {
          $e() && m();
        };
        f.addEventListener("resume", m, false);
        K().toLowerCase().match(/android/) || f.addEventListener("visibilitychange", p, false);
      }).o(function(v) {
        return yl(e).then(function() {
          throw v;
        });
      });
    }).oa(function() {
      m && f.removeEventListener("resume", m, false);
      p && f.removeEventListener("visibilitychange", p, false);
      g && g.cancel();
      h && e.Ta(h);
      e.c = null;
    });
  };
  function xl(a, b, c, d, e) {
    var f = ul(), g = new sh(b, d, null, f, new t("no-auth-event"), null, e), h = L("BuildInfo.packageName", l);
    if ("string" !== typeof h) throw new t("invalid-cordova-configuration");
    var m = L("BuildInfo.displayName", l), p = {};
    if (K().toLowerCase().match(/iphone|ipad|ipod/)) p.ibi = h;
    else if (K().toLowerCase().match(/android/)) p.apn = h;
    else return F(new t("operation-not-supported-in-this-environment"));
    m && (p.appDisplayName = m);
    f = vl(f);
    p.sessionId = f;
    var v = ek(a.v, a.i, a.l, b, c, null, d, a.m, p, a.u, e, a.s);
    return a.ma().then(function() {
      var B = a.h;
      return a.C.a.set(cl, g.w(), B);
    }).then(function() {
      var B = L("cordova.plugins.browsertab.isAvailable", l);
      if ("function" !== typeof B) throw new t("invalid-cordova-configuration");
      var A = null;
      B(function(Q) {
        if (Q) {
          A = L("cordova.plugins.browsertab.openUrl", l);
          if ("function" !== typeof A) throw new t("invalid-cordova-configuration");
          A(v);
        } else {
          A = L("cordova.InAppBrowser.open", l);
          if ("function" !== typeof A) throw new t("invalid-cordova-configuration");
          Q = K();
          a.a = A(v, Q.match(/(iPad|iPhone|iPod).*OS 7_\d/i) || Q.match(/(iPad|iPhone|iPod).*OS 8_\d/i) ? "_blank" : "_system", "location=yes");
        }
      });
    });
  }
  function zl(a, b) {
    for (var c = 0; c < a.b.length; c++) try {
      a.b[c](b);
    } catch (d) {
    }
  }
  function wl(a) {
    a.f || (a.f = a.ma().then(function() {
      return new D(function(b) {
        function c(d) {
          b(d);
          a.Ta(c);
          return false;
        }
        a.Ea(c);
        Al(a);
      });
    }));
    return a.f;
  }
  function yl(a) {
    var b = null;
    return dl(a.g).then(function(c) {
      b = c;
      c = a.g;
      return Zk(c.b, cl, c.a);
    }).then(function() {
      return b;
    });
  }
  function Al(a) {
    function b(g) {
      d = true;
      e && e.cancel();
      yl(a).then(function(h) {
        var m = c;
        if (h && g && g.url) {
          var p = null;
          m = xg(g.url);
          -1 != m.indexOf("/__/auth/callback") && (p = J(m), p = We(be(p, "firebaseError") || null), p = (p = "object" === typeof p ? Aa(p) : null) ? new sh(h.c, h.b, null, null, p, null, h.T()) : new sh(h.c, h.b, m, h.f, null, null, h.T()));
          m = p || c;
        }
        zl(a, m);
      });
    }
    var c = new sh("unknown", null, null, null, new t("no-auth-event")), d = false, e = Fd(500).then(function() {
      return yl(a).then(function() {
        d || zl(a, c);
      });
    }), f = l.handleOpenURL;
    l.handleOpenURL = function(g) {
      0 == g.toLowerCase().indexOf(L("BuildInfo.packageName", l).toLowerCase() + "://") && b({
        url: g
      });
      if ("function" === typeof f) try {
        f(g);
      } catch (h) {
        console.error(h);
      }
    };
    vh || (vh = new uh());
    wh(b);
  }
  k.Ea = function(a) {
    this.b.push(a);
    wl(this).o(function(b) {
      "auth/invalid-cordova-configuration" === b.code && (b = new sh("unknown", null, null, null, new t("no-auth-event")), a(b));
    });
  };
  k.Ta = function(a) {
    Xa(this.b, function(b) {
      return b == a;
    });
  };
  function Bl(a) {
    this.a = a;
    this.b = Vk();
  }
  var Cl = {
    name: "pendingRedirect",
    F: "session"
  };
  function Dl(a) {
    return a.b.set(Cl, "pending", a.a);
  }
  function El(a) {
    return Zk(a.b, Cl, a.a);
  }
  function Fl(a) {
    return a.b.get(Cl, a.a).then(function(b) {
      return "pending" == b;
    });
  }
  ;
  function Gl(a, b, c, d) {
    this.i = {};
    this.u = 0;
    this.D = a;
    this.v = b;
    this.m = c;
    this.J = d;
    this.h = [];
    this.f = false;
    this.l = q(this.s, this);
    this.b = new Hl();
    this.C = new Il();
    this.g = new Bl(Jl(this.v, this.m));
    this.c = {};
    this.c.unknown = this.b;
    this.c.signInViaRedirect = this.b;
    this.c.linkViaRedirect = this.b;
    this.c.reauthViaRedirect = this.b;
    this.c.signInViaPopup = this.C;
    this.c.linkViaPopup = this.C;
    this.c.reauthViaPopup = this.C;
    this.a = Kl(this.D, this.v, this.m, Da, this.J);
  }
  function Kl(a, b, c, d, e) {
    var f = index_esm_default.SDK_VERSION || null;
    return Ge() ? new sl(a, b, c, f, d, e) : new Yj(a, b, c, f, d, e);
  }
  Gl.prototype.reset = function() {
    this.f = false;
    this.a.Ta(this.l);
    this.a = Kl(this.D, this.v, this.m, null, this.J);
    this.i = {};
  };
  function Ll(a) {
    a.f || (a.f = true, a.a.Ea(a.l));
    var b = a.a;
    return a.a.ma().o(function(c) {
      a.a == b && a.reset();
      throw c;
    });
  }
  function Ml(a) {
    a.a.Yb() && Ll(a).o(function(b) {
      var c = new sh("unknown", null, null, null, new t("operation-not-supported-in-this-environment"));
      Nl(b) && a.s(c);
    });
    a.a.Ub() || Ol(a.b);
  }
  function Pl(a, b) {
    Va(a.h, b) || a.h.push(b);
    a.f || Fl(a.g).then(function(c) {
      c ? El(a.g).then(function() {
        Ll(a).o(function(d) {
          var e = new sh("unknown", null, null, null, new t("operation-not-supported-in-this-environment"));
          Nl(d) && a.s(e);
        });
      }) : Ml(a);
    }).o(function() {
      Ml(a);
    });
  }
  function Ql(a, b) {
    Xa(a.h, function(c) {
      return c == b;
    });
  }
  Gl.prototype.s = function(a) {
    if (!a) throw new t("invalid-auth-event");
    6e5 <= Date.now() - this.u && (this.i = {}, this.u = 0);
    if (a && a.getUid() && this.i.hasOwnProperty(a.getUid())) return false;
    for (var b = false, c = 0; c < this.h.length; c++) {
      var d = this.h[c];
      if (d.Gb(a.c, a.b)) {
        if (b = this.c[a.c]) b.h(a, d), a && (a.f || a.b) && (this.i[a.getUid()] = true, this.u = Date.now());
        b = true;
        break;
      }
    }
    Ol(this.b);
    return b;
  };
  var Rl = new Ze(2e3, 1e4), Sl = new Ze(3e4, 6e4);
  Gl.prototype.ra = function() {
    return this.b.ra();
  };
  function Tl(a, b, c, d, e, f, g) {
    return a.a.Nb(b, c, d, function() {
      a.f || (a.f = true, a.a.Ea(a.l));
    }, function() {
      a.reset();
    }, e, f, g);
  }
  function Nl(a) {
    return a && "auth/cordova-not-ready" == a.code ? true : false;
  }
  function Ul(a, b, c, d, e) {
    var f;
    return Dl(a.g).then(function() {
      return a.a.Ob(b, c, d, e).o(function(g) {
        if (Nl(g)) throw new t("operation-not-supported-in-this-environment");
        f = g;
        return El(a.g).then(function() {
          throw f;
        });
      }).then(function() {
        return a.a.ac() ? new D(function() {
        }) : El(a.g).then(function() {
          return a.ra();
        }).then(function() {
        }).o(function() {
        });
      });
    });
  }
  function Vl(a, b, c, d, e) {
    return a.a.Pb(d, function(f) {
      b.na(c, null, f, e);
    }, Rl.get());
  }
  var Wl = {};
  function Jl(a, b, c) {
    a = a + ":" + b;
    c && (a = a + ":" + c.url);
    return a;
  }
  function Xl(a, b, c, d) {
    var e = Jl(b, c, d);
    Wl[e] || (Wl[e] = new Gl(a, b, c, d));
    return Wl[e];
  }
  function Hl() {
    this.b = null;
    this.f = [];
    this.c = [];
    this.a = null;
    this.i = this.g = false;
  }
  Hl.prototype.reset = function() {
    this.b = null;
    this.a && (this.a.cancel(), this.a = null);
  };
  Hl.prototype.h = function(a, b) {
    if (a) {
      this.reset();
      this.g = true;
      var c = a.c, d = a.b, e = a.a && "auth/web-storage-unsupported" == a.a.code, f = a.a && "auth/operation-not-supported-in-this-environment" == a.a.code;
      this.i = !(!e && !f);
      "unknown" != c || e || f ? a.a ? (Yl(this, true, null, a.a), E()) : b.Fa(c, d) ? Zl(this, a, b) : F(new t("invalid-auth-event")) : (Yl(this, false, null, null), E());
    } else F(new t("invalid-auth-event"));
  };
  function Ol(a) {
    a.g || (a.g = true, Yl(a, false, null, null));
  }
  function $l(a) {
    a.g && !a.i && Yl(a, false, null, null);
  }
  function Zl(a, b, c) {
    c = c.Fa(b.c, b.b);
    var d = b.g, e = b.f, f = b.i, g = b.T(), h = !!b.c.match(/Redirect$/);
    c(d, e, g, f).then(function(m) {
      Yl(a, h, m, null);
    }).o(function(m) {
      Yl(a, h, null, m);
    });
  }
  function am(a, b) {
    a.b = function() {
      return F(b);
    };
    if (a.c.length) for (var c = 0; c < a.c.length; c++) a.c[c](b);
  }
  function bm(a, b) {
    a.b = function() {
      return E(b);
    };
    if (a.f.length) for (var c = 0; c < a.f.length; c++) a.f[c](b);
  }
  function Yl(a, b, c, d) {
    b ? d ? am(a, d) : bm(a, c) : bm(a, {
      user: null
    });
    a.f = [];
    a.c = [];
  }
  Hl.prototype.ra = function() {
    var a = this;
    return new D(function(b, c) {
      a.b ? a.b().then(b, c) : (a.f.push(b), a.c.push(c), cm(a));
    });
  };
  function cm(a) {
    var b = new t("timeout");
    a.a && a.a.cancel();
    a.a = Fd(Sl.get()).then(function() {
      a.b || (a.g = true, Yl(a, true, null, b));
    });
  }
  function Il() {
  }
  Il.prototype.h = function(a, b) {
    if (a) {
      var c = a.c, d = a.b;
      a.a ? (b.na(a.c, null, a.a, a.b), E()) : b.Fa(c, d) ? dm(a, b) : F(new t("invalid-auth-event"));
    } else F(new t("invalid-auth-event"));
  };
  function dm(a, b) {
    var c = a.b, d = a.c;
    b.Fa(d, c)(a.g, a.f, a.T(), a.i).then(function(e) {
      b.na(d, e, null, c);
    }).o(function(e) {
      b.na(d, null, e, c);
    });
  }
  ;
  function em() {
    this.jb = false;
    Object.defineProperty(this, "appVerificationDisabled", {
      get: function() {
        return this.jb;
      },
      set: function(a) {
        this.jb = a;
      },
      enumerable: false
    });
  }
  ;
  function fm(a, b) {
    this.a = b;
    M(this, "verificationId", a);
  }
  fm.prototype.confirm = function(a) {
    a = ph(this.verificationId, a);
    return this.a(a);
  };
  function gm(a, b, c, d) {
    return new lh(a).gb(b, c).then(function(e) {
      return new fm(e, d);
    });
  }
  ;
  function hm(a) {
    var b = ig(a);
    if (!(b && b.exp && b.auth_time && b.iat)) throw new t("internal-error", "An internal error occurred. The token obtained by Firebase appears to be malformed. Please retry the operation.");
    N(this, {
      token: a,
      expirationTime: bf(1e3 * b.exp),
      authTime: bf(1e3 * b.auth_time),
      issuedAtTime: bf(1e3 * b.iat),
      signInProvider: b.firebase && b.firebase.sign_in_provider ? b.firebase.sign_in_provider : null,
      signInSecondFactor: b.firebase && b.firebase.sign_in_second_factor ? b.firebase.sign_in_second_factor : null,
      claims: b
    });
  }
  ;
  function im(a, b, c) {
    var d = b && b[jm];
    if (!d) throw new t("argument-error", "Internal assert: Invalid MultiFactorResolver");
    this.a = a;
    this.f = nb(b);
    this.g = c;
    this.c = new yg(null, d);
    this.b = [];
    var e = this;
    w(b[km] || [], function(f) {
      (f = tf(f)) && e.b.push(f);
    });
    M(this, "auth", this.a);
    M(this, "session", this.c);
    M(this, "hints", this.b);
  }
  var km = "mfaInfo", jm = "mfaPendingCredential";
  im.prototype.Rc = function(a) {
    var b = this;
    return a.tb(this.a.a, this.c).then(function(c) {
      var d = nb(b.f);
      delete d[km];
      delete d[jm];
      z(d, c);
      return b.g(d);
    });
  };
  function lm(a, b, c, d) {
    t.call(this, "multi-factor-auth-required", d, b);
    this.b = new im(a, b, c);
    M(this, "resolver", this.b);
  }
  r(lm, t);
  function mm(a, b, c) {
    if (a && n(a.serverResponse) && "auth/multi-factor-auth-required" === a.code) try {
      return new lm(b, a.serverResponse, c, a.message);
    } catch (d) {
    }
    return null;
  }
  ;
  function nm() {
  }
  nm.prototype.tb = function(a, b, c) {
    return b.type == zg ? om(this, a, b, c) : pm(this, a, b);
  };
  function om(a, b, c, d) {
    return c.Ha().then(function(e) {
      e = {
        idToken: e
      };
      "undefined" !== typeof d && (e.displayName = d);
      z(e, {
        phoneVerificationInfo: hh(a.a)
      });
      return O(b, Gj, e);
    });
  }
  function pm(a, b, c) {
    return c.Ha().then(function(d) {
      d = {
        mfaPendingCredential: d
      };
      z(d, {
        phoneVerificationInfo: hh(a.a)
      });
      return O(b, Hj, d);
    });
  }
  function qm(a) {
    M(this, "factorId", a.fa);
    this.a = a;
  }
  r(qm, nm);
  function rm(a) {
    qm.call(this, a);
    if (this.a.fa != lh.PROVIDER_ID) throw new t("argument-error", "firebase.auth.PhoneMultiFactorAssertion requires a valid firebase.auth.PhoneAuthCredential");
  }
  r(rm, qm);
  function sm(a, b) {
    G.call(this, a);
    for (var c in b) this[c] = b[c];
  }
  r(sm, G);
  function tm(a, b) {
    this.a = a;
    this.b = [];
    this.c = q(this.yc, this);
    nd(this.a, "userReloaded", this.c);
    var c = [];
    b && b.multiFactor && b.multiFactor.enrolledFactors && w(b.multiFactor.enrolledFactors, function(d) {
      var e = null, f = {};
      if (d) {
        d.uid && (f[qf] = d.uid);
        d.displayName && (f[rf] = d.displayName);
        d.enrollmentTime && (f[sf] = new Date(d.enrollmentTime).toISOString());
        d.phoneNumber && (f[pf] = d.phoneNumber);
        try {
          e = new uf(f);
        } catch (g) {
        }
        d = e;
      } else d = null;
      d && c.push(d);
    });
    um(this, c);
  }
  function vm(a) {
    var b = [];
    w(a.mfaInfo || [], function(c) {
      (c = tf(c)) && b.push(c);
    });
    return b;
  }
  k = tm.prototype;
  k.yc = function(a) {
    um(this, vm(a.hd));
  };
  function um(a, b) {
    a.b = b;
    M(a, "enrolledFactors", b);
  }
  k.Sb = function() {
    return this.a.I().then(function(a) {
      return new yg(a, null);
    });
  };
  k.fc = function(a, b) {
    var c = this, d = this.a.a;
    return this.Sb().then(function(e) {
      return a.tb(d, e, b);
    }).then(function(e) {
      wm(c.a, e);
      return c.a.reload();
    });
  };
  k.bd = function(a) {
    var b = this, c = "string" === typeof a ? a : a.uid, d = this.a.a;
    return this.a.I().then(function(e) {
      return O(d, Lj, {
        idToken: e,
        mfaEnrollmentId: c
      });
    }).then(function(e) {
      var f = Qa(b.b, function(g) {
        return g.uid != c;
      });
      um(b, f);
      wm(b.a, e);
      return b.a.reload().o(function(g) {
        if ("auth/user-token-expired" != g.code) throw g;
      });
    });
  };
  k.w = function() {
    return {
      multiFactor: {
        enrolledFactors: Ra(this.b, function(a) {
          return a.w();
        })
      }
    };
  };
  function xm(a, b, c) {
    this.h = a;
    this.i = b;
    this.g = c;
    this.c = 3e4;
    this.f = 96e4;
    this.b = null;
    this.a = this.c;
    if (this.f < this.c) throw Error("Proactive refresh lower bound greater than upper bound!");
  }
  xm.prototype.start = function() {
    this.a = this.c;
    ym(this, true);
  };
  function zm(a, b) {
    if (b) return a.a = a.c, a.g();
    b = a.a;
    a.a *= 2;
    a.a > a.f && (a.a = a.f);
    return b;
  }
  function ym(a, b) {
    a.stop();
    a.b = Fd(zm(a, b)).then(function() {
      return af();
    }).then(function() {
      return a.h();
    }).then(function() {
      ym(a, true);
    }).o(function(c) {
      a.i(c) && ym(a, false);
    });
  }
  xm.prototype.stop = function() {
    this.b && (this.b.cancel(), this.b = null);
  };
  function Am(a) {
    this.f = a;
    this.b = this.a = null;
    this.c = Date.now();
  }
  Am.prototype.w = function() {
    return {
      apiKey: this.f.c,
      refreshToken: this.a,
      accessToken: this.b && this.b.toString(),
      expirationTime: this.c
    };
  };
  function Bm(a, b) {
    "undefined" === typeof b && (a.b ? (b = a.b, b = b.a - b.g) : b = 0);
    a.c = Date.now() + 1e3 * b;
  }
  function Cm(a, b) {
    a.b = jg(b[Dg] || "");
    a.a = b.refreshToken;
    b = b.expiresIn;
    Bm(a, "undefined" !== typeof b ? Number(b) : void 0);
  }
  function Dm(a, b) {
    a.b = b.b;
    a.a = b.a;
    a.c = b.c;
  }
  function Em(a, b) {
    return Wi(a.f, b).then(function(c) {
      a.b = jg(c.access_token);
      a.a = c.refresh_token;
      Bm(a, c.expires_in);
      return {
        accessToken: a.b.toString(),
        refreshToken: a.a
      };
    }).o(function(c) {
      "auth/user-token-expired" == c.code && (a.a = null);
      throw c;
    });
  }
  Am.prototype.getToken = function(a) {
    a = !!a;
    return this.b && !this.a ? F(new t("user-token-expired")) : a || !this.b || Date.now() > this.c - 3e4 ? this.a ? Em(this, {
      grant_type: "refresh_token",
      refresh_token: this.a
    }) : E(null) : E({
      accessToken: this.b.toString(),
      refreshToken: this.a
    });
  };
  function Fm(a, b) {
    this.a = a || null;
    this.b = b || null;
    N(this, {
      lastSignInTime: bf(b || null),
      creationTime: bf(a || null)
    });
  }
  function Gm(a) {
    return new Fm(a.a, a.b);
  }
  Fm.prototype.w = function() {
    return {
      lastLoginAt: this.b,
      createdAt: this.a
    };
  };
  function Hm(a, b, c, d, e, f) {
    N(this, {
      uid: a,
      displayName: d || null,
      photoURL: e || null,
      email: c || null,
      phoneNumber: f || null,
      providerId: b
    });
  }
  function Im(a, b, c) {
    this.N = [];
    this.l = a.apiKey;
    this.m = a.appName;
    this.s = a.authDomain || null;
    var d = index_esm_default.SDK_VERSION ? Oe(index_esm_default.SDK_VERSION) : null;
    this.a = new Ii(this.l, Ca(Da), d);
    (this.u = a.emulatorConfig || null) && Pi(this.a, this.u);
    this.h = new Am(this.a);
    Jm(this, b[Dg]);
    Cm(this.h, b);
    M(this, "refreshToken", this.h.a);
    Km(this, c || {});
    H.call(this);
    this.P = false;
    this.s && Re() && (this.b = Xl(this.s, this.l, this.m, this.u));
    this.W = [];
    this.i = null;
    this.D = Lm(this);
    this.ba = q(this.ib, this);
    var e = this;
    this.za = null;
    this.Pa = function(f) {
      e.xa(f.h);
    };
    this.qa = null;
    this.Ba = function(f) {
      Mm(e, f.c);
    };
    this.$ = null;
    this.aa = [];
    this.Oa = function(f) {
      Nm(e, f.f);
    };
    this.ja = null;
    this.S = new tm(this, c);
    M(this, "multiFactor", this.S);
  }
  r(Im, H);
  Im.prototype.xa = function(a) {
    this.za = a;
    Oi(this.a, a);
  };
  function Mm(a, b) {
    a.u = b;
    Pi(a.a, b);
    a.b && (b = a.b, a.b = Xl(a.s, a.l, a.m, a.u), a.P && (Ql(b, a), Pl(a.b, a)));
  }
  Im.prototype.la = function() {
    return this.za;
  };
  function Om(a, b) {
    a.qa && xd(a.qa, "languageCodeChanged", a.Pa);
    (a.qa = b) && nd(b, "languageCodeChanged", a.Pa);
  }
  function Pm(a, b) {
    a.$ && xd(a.$, "emulatorConfigChanged", a.Ba);
    (a.$ = b) && nd(b, "emulatorConfigChanged", a.Ba);
  }
  function Nm(a, b) {
    a.aa = b;
    Ri(a.a, index_esm_default.SDK_VERSION ? Oe(index_esm_default.SDK_VERSION, a.aa) : null);
  }
  Im.prototype.Ga = function() {
    return Za(this.aa);
  };
  function Qm(a, b) {
    a.ja && xd(a.ja, "frameworkChanged", a.Oa);
    (a.ja = b) && nd(b, "frameworkChanged", a.Oa);
  }
  Im.prototype.ib = function() {
    this.D.b && (this.D.stop(), this.D.start());
  };
  function Rm(a) {
    try {
      return index_esm_default.app(a.m).auth();
    } catch (b) {
      throw new t("internal-error", "No firebase.auth.Auth instance is available for the Firebase App '" + a.m + "'!");
    }
  }
  function Lm(a) {
    return new xm(function() {
      return a.I(true);
    }, function(b) {
      return b && "auth/network-request-failed" == b.code ? true : false;
    }, function() {
      var b = a.h.c - Date.now() - 3e5;
      return 0 < b ? b : 0;
    });
  }
  function Sm(a) {
    a.J || a.D.b || (a.D.start(), xd(a, "tokenChanged", a.ba), nd(a, "tokenChanged", a.ba));
  }
  function Tm(a) {
    xd(a, "tokenChanged", a.ba);
    a.D.stop();
  }
  function Jm(a, b) {
    a.Aa = b;
    M(a, "_lat", b);
  }
  function Um(a, b) {
    Xa(a.W, function(c) {
      return c == b;
    });
  }
  function Vm(a) {
    for (var b = [], c = 0; c < a.W.length; c++) b.push(a.W[c](a));
    return Jc(b).then(function() {
      return a;
    });
  }
  function Wm(a) {
    a.b && !a.P && (a.P = true, Pl(a.b, a));
  }
  function Km(a, b) {
    N(a, {
      uid: b.uid,
      displayName: b.displayName || null,
      photoURL: b.photoURL || null,
      email: b.email || null,
      emailVerified: b.emailVerified || false,
      phoneNumber: b.phoneNumber || null,
      isAnonymous: b.isAnonymous || false,
      tenantId: b.tenantId || null,
      metadata: new Fm(b.createdAt, b.lastLoginAt),
      providerData: []
    });
    a.a.b = a.tenantId;
  }
  M(Im.prototype, "providerId", "firebase");
  function Xm() {
  }
  function Ym(a) {
    return E().then(function() {
      if (a.J) throw new t("app-deleted");
    });
  }
  function Zm(a) {
    return Ra(a.providerData, function(b) {
      return b.providerId;
    });
  }
  function $m(a, b) {
    b && (an(a, b.providerId), a.providerData.push(b));
  }
  function an(a, b) {
    Xa(a.providerData, function(c) {
      return c.providerId == b;
    });
  }
  function bn(a, b, c) {
    ("uid" != b || c) && a.hasOwnProperty(b) && M(a, b, c);
  }
  function cn(a, b) {
    a != b && (N(a, {
      uid: b.uid,
      displayName: b.displayName,
      photoURL: b.photoURL,
      email: b.email,
      emailVerified: b.emailVerified,
      phoneNumber: b.phoneNumber,
      isAnonymous: b.isAnonymous,
      tenantId: b.tenantId,
      providerData: []
    }), b.metadata ? M(a, "metadata", Gm(b.metadata)) : M(a, "metadata", new Fm()), w(b.providerData, function(c) {
      $m(a, c);
    }), Dm(a.h, b.h), M(a, "refreshToken", a.h.a), um(a.S, b.S.b));
  }
  k = Im.prototype;
  k.reload = function() {
    var a = this;
    return R(this, Ym(this).then(function() {
      return dn(a).then(function() {
        return Vm(a);
      }).then(Xm);
    }));
  };
  function dn(a) {
    return a.I().then(function(b) {
      var c = a.isAnonymous;
      return en(a, b).then(function() {
        c || bn(a, "isAnonymous", false);
        return b;
      });
    });
  }
  k.oc = function(a) {
    return this.I(a).then(function(b) {
      return new hm(b);
    });
  };
  k.I = function(a) {
    var b = this;
    return R(this, Ym(this).then(function() {
      return b.h.getToken(a);
    }).then(function(c) {
      if (!c) throw new t("internal-error");
      c.accessToken != b.Aa && (Jm(b, c.accessToken), b.dispatchEvent(new sm("tokenChanged")));
      bn(b, "refreshToken", c.refreshToken);
      return c.accessToken;
    }));
  };
  function wm(a, b) {
    b[Dg] && a.Aa != b[Dg] && (Cm(a.h, b), a.dispatchEvent(new sm("tokenChanged")), Jm(a, b[Dg]), bn(a, "refreshToken", a.h.a));
  }
  function en(a, b) {
    return O(a.a, Ij, {
      idToken: b
    }).then(q(a.Kc, a));
  }
  k.Kc = function(a) {
    a = a.users;
    if (!a || !a.length) throw new t("internal-error");
    a = a[0];
    Km(this, {
      uid: a.localId,
      displayName: a.displayName,
      photoURL: a.photoUrl,
      email: a.email,
      emailVerified: !!a.emailVerified,
      phoneNumber: a.phoneNumber,
      lastLoginAt: a.lastLoginAt,
      createdAt: a.createdAt,
      tenantId: a.tenantId
    });
    for (var b = fn(a), c = 0; c < b.length; c++) $m(this, b[c]);
    bn(this, "isAnonymous", !(this.email && a.passwordHash) && !(this.providerData && this.providerData.length));
    this.dispatchEvent(new sm("userReloaded", {
      hd: a
    }));
  };
  function fn(a) {
    return (a = a.providerUserInfo) && a.length ? Ra(a, function(b) {
      return new Hm(b.rawId, b.providerId, b.email, b.displayName, b.photoUrl, b.phoneNumber);
    }) : [];
  }
  k.Lc = function(a) {
    gf("firebase.User.prototype.reauthenticateAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.reauthenticateWithCredential instead.");
    return this.ub(a);
  };
  k.ub = function(a) {
    var b = this, c = null;
    return R(this, a.c(this.a, this.uid).then(function(d) {
      wm(b, d);
      c = gn(b, d, "reauthenticate");
      b.i = null;
      return b.reload();
    }).then(function() {
      return c;
    }), true);
  };
  function hn(a, b) {
    return dn(a).then(function() {
      if (Va(Zm(a), b)) return Vm(a).then(function() {
        throw new t("provider-already-linked");
      });
    });
  }
  k.Cc = function(a) {
    gf("firebase.User.prototype.linkAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.linkWithCredential instead.");
    return this.rb(a);
  };
  k.rb = function(a) {
    var b = this, c = null;
    return R(this, hn(this, a.providerId).then(function() {
      return b.I();
    }).then(function(d) {
      return a.b(b.a, d);
    }).then(function(d) {
      c = gn(b, d, "link");
      return jn(b, d);
    }).then(function() {
      return c;
    }));
  };
  k.Dc = function(a, b) {
    var c = this;
    return R(this, hn(this, "phone").then(function() {
      return gm(Rm(c), a, b, q(c.rb, c));
    }));
  };
  k.Mc = function(a, b) {
    var c = this;
    return R(this, E().then(function() {
      return gm(Rm(c), a, b, q(c.ub, c));
    }), true);
  };
  function gn(a, b, c) {
    var d = qh(b);
    b = og(b);
    return kf({
      user: a,
      credential: d,
      additionalUserInfo: b,
      operationType: c
    });
  }
  function jn(a, b) {
    wm(a, b);
    return a.reload().then(function() {
      return a;
    });
  }
  k.Cb = function(a) {
    var b = this;
    return R(this, this.I().then(function(c) {
      return b.a.Cb(c, a);
    }).then(function(c) {
      wm(b, c);
      return b.reload();
    }));
  };
  k.ed = function(a) {
    var b = this;
    return R(this, this.I().then(function(c) {
      return a.b(b.a, c);
    }).then(function(c) {
      wm(b, c);
      return b.reload();
    }));
  };
  k.Db = function(a) {
    var b = this;
    return R(this, this.I().then(function(c) {
      return b.a.Db(c, a);
    }).then(function(c) {
      wm(b, c);
      return b.reload();
    }));
  };
  k.Eb = function(a) {
    if (void 0 === a.displayName && void 0 === a.photoURL) return Ym(this);
    var b = this;
    return R(this, this.I().then(function(c) {
      return b.a.Eb(c, {
        displayName: a.displayName,
        photoUrl: a.photoURL
      });
    }).then(function(c) {
      wm(b, c);
      bn(b, "displayName", c.displayName || null);
      bn(b, "photoURL", c.photoUrl || null);
      w(b.providerData, function(d) {
        "password" === d.providerId && (M(d, "displayName", b.displayName), M(d, "photoURL", b.photoURL));
      });
      return Vm(b);
    }).then(Xm));
  };
  k.cd = function(a) {
    var b = this;
    return R(this, dn(this).then(function(c) {
      return Va(Zm(b), a) ? rj(b.a, c, [a]).then(function(d) {
        var e = {};
        w(d.providerUserInfo || [], function(f) {
          e[f.providerId] = true;
        });
        w(Zm(b), function(f) {
          e[f] || an(b, f);
        });
        e[lh.PROVIDER_ID] || M(b, "phoneNumber", null);
        return Vm(b);
      }) : Vm(b).then(function() {
        throw new t("no-such-provider");
      });
    }));
  };
  k.delete = function() {
    var a = this;
    return R(this, this.I().then(function(b) {
      return O(a.a, Fj, {
        idToken: b
      });
    }).then(function() {
      a.dispatchEvent(new sm("userDeleted"));
    })).then(function() {
      for (var b = 0; b < a.N.length; b++) a.N[b].cancel("app-deleted");
      Om(a, null);
      Pm(a, null);
      Qm(a, null);
      a.N = [];
      a.J = true;
      Tm(a);
      M(a, "refreshToken", null);
      a.b && Ql(a.b, a);
    });
  };
  k.Gb = function(a, b) {
    return "linkViaPopup" == a && (this.g || null) == b && this.f || "reauthViaPopup" == a && (this.g || null) == b && this.f || "linkViaRedirect" == a && (this.ga || null) == b || "reauthViaRedirect" == a && (this.ga || null) == b ? true : false;
  };
  k.na = function(a, b, c, d) {
    "linkViaPopup" != a && "reauthViaPopup" != a || d != (this.g || null) || (c && this.C ? this.C(c) : b && !c && this.f && this.f(b), this.c && (this.c.cancel(), this.c = null), delete this.f, delete this.C);
  };
  k.Fa = function(a, b) {
    return "linkViaPopup" == a && b == (this.g || null) ? q(this.Lb, this) : "reauthViaPopup" == a && b == (this.g || null) ? q(this.Mb, this) : "linkViaRedirect" == a && (this.ga || null) == b ? q(this.Lb, this) : "reauthViaRedirect" == a && (this.ga || null) == b ? q(this.Mb, this) : null;
  };
  k.Ec = function(a) {
    var b = this;
    return kn(this, "linkViaPopup", a, function() {
      return hn(b, a.providerId).then(function() {
        return Vm(b);
      });
    }, false);
  };
  k.Nc = function(a) {
    return kn(this, "reauthViaPopup", a, function() {
      return E();
    }, true);
  };
  function kn(a, b, c, d, e) {
    if (!Re()) return F(new t("operation-not-supported-in-this-environment"));
    if (a.i && !e) return F(a.i);
    var f = ng(c.providerId), g = Qe(a.uid + ":::"), h = null;
    (!Te() || Ie()) && a.s && c.isOAuthProvider && (h = ek(a.s, a.l, a.m, b, c, null, g, index_esm_default.SDK_VERSION || null, null, null, a.tenantId, a.u));
    var m = ze(h, f && f.va, f && f.ua);
    d = d().then(function() {
      ln(a);
      if (!e) return a.I().then(function() {
      });
    }).then(function() {
      return Tl(a.b, m, b, c, g, !!h, a.tenantId);
    }).then(function() {
      return new D(function(p, v) {
        a.na(b, null, new t("cancelled-popup-request"), a.g || null);
        a.f = p;
        a.C = v;
        a.g = g;
        a.c = Vl(a.b, a, b, m, g);
      });
    }).then(function(p) {
      m && ye(m);
      return p ? kf(p) : null;
    }).o(function(p) {
      m && ye(m);
      throw p;
    });
    return R(a, d, e);
  }
  k.Fc = function(a) {
    var b = this;
    return mn(this, "linkViaRedirect", a, function() {
      return hn(b, a.providerId);
    }, false);
  };
  k.Oc = function(a) {
    return mn(this, "reauthViaRedirect", a, function() {
      return E();
    }, true);
  };
  function mn(a, b, c, d, e) {
    if (!Re()) return F(new t("operation-not-supported-in-this-environment"));
    if (a.i && !e) return F(a.i);
    var f = null, g = Qe(a.uid + ":::");
    d = d().then(function() {
      ln(a);
      if (!e) return a.I().then(function() {
      });
    }).then(function() {
      a.ga = g;
      return Vm(a);
    }).then(function(h) {
      a.ha && (h = a.ha, h = h.b.set(nn, a.w(), h.a));
      return h;
    }).then(function() {
      return Ul(a.b, b, c, g, a.tenantId);
    }).o(function(h) {
      f = h;
      if (a.ha) return on(a.ha);
      throw f;
    }).then(function() {
      if (f) throw f;
    });
    return R(a, d, e);
  }
  function ln(a) {
    if (!a.b || !a.P) {
      if (a.b && !a.P) throw new t("internal-error");
      throw new t("auth-domain-config-required");
    }
  }
  k.Lb = function(a, b, c, d) {
    var e = this;
    this.c && (this.c.cancel(), this.c = null);
    var f = null;
    c = this.I().then(function(g) {
      return Hg(e.a, {
        requestUri: a,
        postBody: d,
        sessionId: b,
        idToken: g
      });
    }).then(function(g) {
      f = gn(e, g, "link");
      return jn(e, g);
    }).then(function() {
      return f;
    });
    return R(this, c);
  };
  k.Mb = function(a, b, c, d) {
    var e = this;
    this.c && (this.c.cancel(), this.c = null);
    var f = null, g = E().then(function() {
      return Cg(Ig(e.a, {
        requestUri: a,
        sessionId: b,
        postBody: d,
        tenantId: c
      }), e.uid);
    }).then(function(h) {
      f = gn(e, h, "reauthenticate");
      wm(e, h);
      e.i = null;
      return e.reload();
    }).then(function() {
      return f;
    });
    return R(this, g, true);
  };
  k.vb = function(a) {
    var b = this, c = null;
    return R(this, this.I().then(function(d) {
      c = d;
      return "undefined" === typeof a || mb(a) ? {} : bg(new Sf(a));
    }).then(function(d) {
      return b.a.vb(c, d);
    }).then(function(d) {
      if (b.email != d) return b.reload();
    }).then(function() {
    }));
  };
  k.Fb = function(a, b) {
    var c = this, d = null;
    return R(this, this.I().then(function(e) {
      d = e;
      return "undefined" === typeof b || mb(b) ? {} : bg(new Sf(b));
    }).then(function(e) {
      return c.a.Fb(d, a, e);
    }).then(function(e) {
      if (c.email != e) return c.reload();
    }).then(function() {
    }));
  };
  function R(a, b, c) {
    var d = pn(a, b, c);
    a.N.push(d);
    d.oa(function() {
      Wa(a.N, d);
    });
    return d.o(function(e) {
      var f = null;
      e && "auth/multi-factor-auth-required" === e.code && (f = mm(e.w(), Rm(a), q(a.jc, a)));
      throw f || e;
    });
  }
  k.jc = function(a) {
    var b = null, c = this;
    a = Cg(E(a), c.uid).then(function(d) {
      b = gn(c, d, "reauthenticate");
      wm(c, d);
      c.i = null;
      return c.reload();
    }).then(function() {
      return b;
    });
    return R(this, a, true);
  };
  function pn(a, b, c) {
    return a.i && !c ? (b.cancel(), F(a.i)) : b.o(function(d) {
      !d || "auth/user-disabled" != d.code && "auth/user-token-expired" != d.code || (a.i || a.dispatchEvent(new sm("userInvalidated")), a.i = d);
      throw d;
    });
  }
  k.toJSON = function() {
    return this.w();
  };
  k.w = function() {
    var a = {
      uid: this.uid,
      displayName: this.displayName,
      photoURL: this.photoURL,
      email: this.email,
      emailVerified: this.emailVerified,
      phoneNumber: this.phoneNumber,
      isAnonymous: this.isAnonymous,
      tenantId: this.tenantId,
      providerData: [],
      apiKey: this.l,
      appName: this.m,
      authDomain: this.s,
      stsTokenManager: this.h.w(),
      redirectEventId: this.ga || null
    };
    this.metadata && z(a, this.metadata.w());
    w(this.providerData, function(b) {
      a.providerData.push(lf(b));
    });
    z(a, this.S.w());
    return a;
  };
  function qn(a) {
    if (!a.apiKey) return null;
    var b = {
      apiKey: a.apiKey,
      authDomain: a.authDomain,
      appName: a.appName,
      emulatorConfig: a.emulatorConfig
    }, c = {};
    if (a.stsTokenManager && a.stsTokenManager.accessToken) {
      c[Dg] = a.stsTokenManager.accessToken;
      c.refreshToken = a.stsTokenManager.refreshToken || null;
      var d = a.stsTokenManager.expirationTime;
      d && (c.expiresIn = (d - Date.now()) / 1e3);
    } else return null;
    var e = new Im(b, c, a);
    a.providerData && w(a.providerData, function(f) {
      f && $m(e, kf(f));
    });
    a.redirectEventId && (e.ga = a.redirectEventId);
    return e;
  }
  function rn(a, b, c, d) {
    var e = new Im(a, b);
    c && (e.ha = c);
    d && Nm(e, d);
    return e.reload().then(function() {
      return e;
    });
  }
  function sn(a, b, c, d) {
    var e = a.h, f = {};
    f[Dg] = e.b && e.b.toString();
    f.refreshToken = e.a;
    b = new Im(b || {
      apiKey: a.l,
      authDomain: a.s,
      appName: a.m
    }, f);
    c && (b.ha = c);
    d && Nm(b, d);
    cn(b, a);
    return b;
  }
  ;
  function tn(a) {
    this.a = a;
    this.b = Vk();
  }
  var nn = {
    name: "redirectUser",
    F: "session"
  };
  function on(a) {
    return Zk(a.b, nn, a.a);
  }
  function un(a, b) {
    return a.b.get(nn, a.a).then(function(c) {
      c && b && (c.authDomain = b);
      return qn(c || {});
    });
  }
  ;
  function vn(a) {
    this.a = a;
    this.b = Vk();
    this.c = null;
    this.f = wn(this);
    this.b.addListener(xn("local"), this.a, q(this.g, this));
  }
  vn.prototype.g = function() {
    var a = this, b = xn("local");
    yn(this, function() {
      return E().then(function() {
        return a.c && "local" != a.c.F ? a.b.get(b, a.a) : null;
      }).then(function(c) {
        if (c) return zn(a, "local").then(function() {
          a.c = b;
        });
      });
    });
  };
  function zn(a, b) {
    var c = [], d;
    for (d in Rk) Rk[d] !== b && c.push(Zk(a.b, xn(Rk[d]), a.a));
    c.push(Zk(a.b, An, a.a));
    return Ic(c);
  }
  function wn(a) {
    var b = xn("local"), c = xn("session"), d = xn("none");
    return Yk(a.b, b, a.a).then(function() {
      return a.b.get(c, a.a);
    }).then(function(e) {
      return e ? c : a.b.get(d, a.a).then(function(f) {
        return f ? d : a.b.get(b, a.a).then(function(g) {
          return g ? b : a.b.get(An, a.a).then(function(h) {
            return h ? xn(h) : b;
          });
        });
      });
    }).then(function(e) {
      a.c = e;
      return zn(a, e.F);
    }).o(function() {
      a.c || (a.c = b);
    });
  }
  var An = {
    name: "persistence",
    F: "session"
  };
  function xn(a) {
    return {
      name: "authUser",
      F: a
    };
  }
  vn.prototype.yb = function(a) {
    var b = null, c = this;
    Sk(a);
    return yn(this, function() {
      return a != c.c.F ? c.b.get(c.c, c.a).then(function(d) {
        b = d;
        return zn(c, a);
      }).then(function() {
        c.c = xn(a);
        if (b) return c.b.set(c.c, b, c.a);
      }) : E();
    });
  };
  function Bn(a) {
    return yn(a, function() {
      return a.b.set(An, a.c.F, a.a);
    });
  }
  function Cn(a, b) {
    return yn(a, function() {
      return a.b.set(a.c, b.w(), a.a);
    });
  }
  function Dn(a) {
    return yn(a, function() {
      return Zk(a.b, a.c, a.a);
    });
  }
  function En(a, b, c) {
    return yn(a, function() {
      return a.b.get(a.c, a.a).then(function(d) {
        d && b && (d.authDomain = b);
        d && c && (d.emulatorConfig = c);
        return qn(d || {});
      });
    });
  }
  function yn(a, b) {
    a.f = a.f.then(b, b);
    return a.f;
  }
  ;
  function Fn(a) {
    this.l = false;
    M(this, "settings", new em());
    M(this, "app", a);
    if (S(this).options && S(this).options.apiKey) a = index_esm_default.SDK_VERSION ? Oe(index_esm_default.SDK_VERSION) : null, this.a = new Ii(S(this).options && S(this).options.apiKey, Ca(Da), a);
    else throw new t("invalid-api-key");
    this.P = [];
    this.s = [];
    this.N = [];
    this.Pa = index_esm_default.INTERNAL.createSubscribe(q(this.zc, this));
    this.W = void 0;
    this.ib = index_esm_default.INTERNAL.createSubscribe(q(this.Ac, this));
    Gn(this, null);
    this.i = new vn(S(this).options.apiKey + ":" + S(this).name);
    this.D = new tn(S(this).options.apiKey + ":" + S(this).name);
    this.$ = T(this, Hn(this));
    this.h = T(this, In(this));
    this.ba = false;
    this.ja = q(this.Zc, this);
    this.Ba = q(this.da, this);
    this.qa = q(this.mc, this);
    this.za = q(this.wc, this);
    this.Aa = q(this.xc, this);
    this.b = null;
    Jn(this);
    this.INTERNAL = {};
    this.INTERNAL["delete"] = q(this.delete, this);
    this.INTERNAL.logFramework = q(this.Gc, this);
    this.u = 0;
    H.call(this);
    Kn(this);
    this.J = [];
    this.R = null;
  }
  r(Fn, H);
  function Ln(a) {
    G.call(this, "languageCodeChanged");
    this.h = a;
  }
  r(Ln, G);
  function Mn(a) {
    G.call(this, "emulatorConfigChanged");
    this.c = a;
  }
  r(Mn, G);
  function Nn(a) {
    G.call(this, "frameworkChanged");
    this.f = a;
  }
  r(Nn, G);
  k = Fn.prototype;
  k.yb = function(a) {
    a = this.i.yb(a);
    return T(this, a);
  };
  k.xa = function(a) {
    this.aa === a || this.l || (this.aa = a, Oi(this.a, this.aa), this.dispatchEvent(new Ln(this.la())));
  };
  k.la = function() {
    return this.aa;
  };
  k.fd = function() {
    var a = l.navigator;
    this.xa(a ? a.languages && a.languages[0] || a.language || a.userLanguage || null : null);
  };
  k.gd = function(a, b) {
    if (!this.R) {
      if (!/^https?:\/\//.test(a)) throw new t("argument-error", "Emulator URL must start with a valid scheme (http:// or https://).");
      b = b ? !!b.disableWarnings : false;
      On(b);
      this.R = {
        url: a,
        ec: b
      };
      this.settings.jb = true;
      Pi(this.a, this.R);
      this.dispatchEvent(new Mn(this.R));
    }
  };
  function On(a) {
    "undefined" !== typeof console && "function" === typeof console.info && console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");
    l.document && !a && Ee().then(function() {
      var b = l.document.createElement("div");
      b.innerText = "Running in emulator mode. Do not use with production credentials.";
      b.style.position = "fixed";
      b.style.width = "100%";
      b.style.backgroundColor = "#ffffff";
      b.style.border = ".1em solid #000000";
      b.style.color = "#b50000";
      b.style.bottom = "0px";
      b.style.left = "0px";
      b.style.margin = "0px";
      b.style.zIndex = 1e4;
      b.style.textAlign = "center";
      b.classList.add("firebase-emulator-warning");
      l.document.body.appendChild(b);
    });
  }
  k.Gc = function(a) {
    this.J.push(a);
    Ri(this.a, index_esm_default.SDK_VERSION ? Oe(index_esm_default.SDK_VERSION, this.J) : null);
    this.dispatchEvent(new Nn(this.J));
  };
  k.Ga = function() {
    return Za(this.J);
  };
  k.zb = function(a) {
    this.S === a || this.l || (this.S = a, this.a.b = this.S);
  };
  k.T = function() {
    return this.S;
  };
  function Kn(a) {
    Object.defineProperty(a, "lc", {
      get: function() {
        return this.la();
      },
      set: function(b) {
        this.xa(b);
      },
      enumerable: false
    });
    a.aa = null;
    Object.defineProperty(a, "ti", {
      get: function() {
        return this.T();
      },
      set: function(b) {
        this.zb(b);
      },
      enumerable: false
    });
    a.S = null;
    Object.defineProperty(a, "emulatorConfig", {
      get: function() {
        if (this.R) {
          var b = J(this.R.url);
          b = kf({
            protocol: b.c,
            host: b.a,
            port: b.g,
            options: kf({
              disableWarnings: this.R.ec
            })
          });
        } else b = null;
        return b;
      },
      enumerable: false
    });
  }
  k.toJSON = function() {
    return {
      apiKey: S(this).options.apiKey,
      authDomain: S(this).options.authDomain,
      appName: S(this).name,
      currentUser: U(this) && U(this).w()
    };
  };
  function Pn(a) {
    return a.Oa || F(new t("auth-domain-config-required"));
  }
  function Jn(a) {
    var b = S(a).options.authDomain, c = S(a).options.apiKey;
    b && Re() && (a.Oa = a.$.then(function() {
      if (!a.l) {
        a.b = Xl(b, c, S(a).name, a.R);
        Pl(a.b, a);
        U(a) && Wm(U(a));
        if (a.m) {
          Wm(a.m);
          var d = a.m;
          d.xa(a.la());
          Om(d, a);
          d = a.m;
          Nm(d, a.J);
          Qm(d, a);
          d = a.m;
          Mm(d, a.R);
          Pm(d, a);
          a.m = null;
        }
        return a.b;
      }
    }));
  }
  k.Gb = function(a, b) {
    switch (a) {
      case "unknown":
      case "signInViaRedirect":
        return true;
      case "signInViaPopup":
        return this.g == b && !!this.f;
      default:
        return false;
    }
  };
  k.na = function(a, b, c, d) {
    "signInViaPopup" == a && this.g == d && (c && this.C ? this.C(c) : b && !c && this.f && this.f(b), this.c && (this.c.cancel(), this.c = null), delete this.f, delete this.C);
  };
  k.Fa = function(a, b) {
    return "signInViaRedirect" == a || "signInViaPopup" == a && this.g == b && this.f ? q(this.ic, this) : null;
  };
  k.ic = function(a, b, c, d) {
    var e = this, f = {
      requestUri: a,
      postBody: d,
      sessionId: b,
      tenantId: c
    };
    this.c && (this.c.cancel(), this.c = null);
    return e.$.then(function() {
      return Qn(e, Fg(e.a, f));
    });
  };
  k.Xc = function(a) {
    if (!Re()) return F(new t("operation-not-supported-in-this-environment"));
    var b = this, c = ng(a.providerId), d = Qe(), e = null;
    (!Te() || Ie()) && S(this).options.authDomain && a.isOAuthProvider && (e = ek(S(this).options.authDomain, S(this).options.apiKey, S(this).name, "signInViaPopup", a, null, d, index_esm_default.SDK_VERSION || null, null, null, this.T(), this.R));
    var f = ze(e, c && c.va, c && c.ua);
    c = Pn(this).then(function(g) {
      return Tl(g, f, "signInViaPopup", a, d, !!e, b.T());
    }).then(function() {
      return new D(function(g, h) {
        b.na("signInViaPopup", null, new t("cancelled-popup-request"), b.g);
        b.f = g;
        b.C = h;
        b.g = d;
        b.c = Vl(b.b, b, "signInViaPopup", f, d);
      });
    }).then(function(g) {
      f && ye(f);
      return g ? kf(g) : null;
    }).o(function(g) {
      f && ye(f);
      throw g;
    });
    return T(this, c);
  };
  k.Yc = function(a) {
    if (!Re()) return F(new t("operation-not-supported-in-this-environment"));
    var b = this, c = Pn(this).then(function() {
      return Bn(b.i);
    }).then(function() {
      return Ul(b.b, "signInViaRedirect", a, void 0, b.T());
    });
    return T(this, c);
  };
  function Rn(a) {
    if (!Re()) return F(new t("operation-not-supported-in-this-environment"));
    var b = Pn(a).then(function() {
      return a.b.ra();
    }).then(function(c) {
      return c ? kf(c) : null;
    });
    return T(a, b);
  }
  k.ra = function() {
    var a = this;
    return Rn(this).then(function(b) {
      a.b && $l(a.b.b);
      return b;
    }).o(function(b) {
      a.b && $l(a.b.b);
      throw b;
    });
  };
  k.dd = function(a) {
    if (!a) return F(new t("null-user"));
    if (this.S != a.tenantId) return F(new t("tenant-id-mismatch"));
    var b = this, c = {};
    c.apiKey = S(this).options.apiKey;
    c.authDomain = S(this).options.authDomain;
    c.appName = S(this).name;
    var d = sn(a, c, b.D, b.Ga());
    return T(this, this.h.then(function() {
      if (S(b).options.apiKey != a.l) return d.reload();
    }).then(function() {
      if (U(b) && a.uid == U(b).uid) return cn(U(b), a), b.da(a);
      Gn(b, d);
      Wm(d);
      return b.da(d);
    }).then(function() {
      Sn(b);
    }));
  };
  function Tn(a, b) {
    var c = {};
    c.apiKey = S(a).options.apiKey;
    c.authDomain = S(a).options.authDomain;
    c.appName = S(a).name;
    a.R && (c.emulatorConfig = a.R);
    return a.$.then(function() {
      return rn(c, b, a.D, a.Ga());
    }).then(function(d) {
      if (U(a) && d.uid == U(a).uid) return cn(U(a), d), a.da(d);
      Gn(a, d);
      Wm(d);
      return a.da(d);
    }).then(function() {
      Sn(a);
    });
  }
  function Gn(a, b) {
    U(a) && (Um(U(a), a.Ba), xd(U(a), "tokenChanged", a.qa), xd(U(a), "userDeleted", a.za), xd(U(a), "userInvalidated", a.Aa), Tm(U(a)));
    b && (b.W.push(a.Ba), nd(b, "tokenChanged", a.qa), nd(b, "userDeleted", a.za), nd(b, "userInvalidated", a.Aa), 0 < a.u && Sm(b));
    M(a, "currentUser", b);
    b && (b.xa(a.la()), Om(b, a), Nm(b, a.J), Qm(b, a), Mm(b, a.R), Pm(b, a));
  }
  k.Bb = function() {
    var a = this, b = this.h.then(function() {
      a.b && $l(a.b.b);
      if (!U(a)) return E();
      Gn(a, null);
      return Dn(a.i).then(function() {
        Sn(a);
      });
    });
    return T(this, b);
  };
  function Un(a) {
    var b = un(a.D, S(a).options.authDomain).then(function(c) {
      if (a.m = c) c.ha = a.D;
      return on(a.D);
    });
    return T(a, b);
  }
  function Hn(a) {
    var b = S(a).options.authDomain, c = Un(a).then(function() {
      return En(a.i, b, a.R);
    }).then(function(d) {
      return d ? (d.ha = a.D, a.m && (a.m.ga || null) == (d.ga || null) ? d : d.reload().then(function() {
        return Cn(a.i, d).then(function() {
          return d;
        });
      }).o(function(e) {
        return "auth/network-request-failed" == e.code ? d : Dn(a.i);
      })) : null;
    }).then(function(d) {
      Gn(a, d || null);
    });
    return T(a, c);
  }
  function In(a) {
    return a.$.then(function() {
      return Rn(a);
    }).o(function() {
    }).then(function() {
      if (!a.l) return a.ja();
    }).o(function() {
    }).then(function() {
      if (!a.l) {
        a.ba = true;
        var b = a.i;
        b.b.addListener(xn("local"), b.a, a.ja);
      }
    });
  }
  k.Zc = function() {
    var a = this;
    return En(this.i, S(this).options.authDomain).then(function(b) {
      if (!a.l) {
        var c;
        if (c = U(a) && b) {
          c = U(a).uid;
          var d = b.uid;
          c = void 0 === c || null === c || "" === c || void 0 === d || null === d || "" === d ? false : c == d;
        }
        if (c) return cn(U(a), b), U(a).I();
        if (U(a) || b) Gn(a, b), b && (Wm(b), b.ha = a.D), a.b && Pl(a.b, a), Sn(a);
      }
    });
  };
  k.da = function(a) {
    return Cn(this.i, a);
  };
  k.mc = function() {
    Sn(this);
    this.da(U(this));
  };
  k.wc = function() {
    this.Bb();
  };
  k.xc = function() {
    this.Bb();
  };
  function Qn(a, b) {
    var c = null, d = null;
    return T(a, b.then(function(e) {
      c = qh(e);
      d = og(e);
      return Tn(a, e);
    }, function(e) {
      var f = null;
      e && "auth/multi-factor-auth-required" === e.code && (f = mm(e.w(), a, q(a.kc, a)));
      throw f || e;
    }).then(function() {
      return kf({
        user: U(a),
        credential: c,
        additionalUserInfo: d,
        operationType: "signIn"
      });
    }));
  }
  k.kc = function(a) {
    var b = this;
    return this.h.then(function() {
      return Qn(b, E(a));
    });
  };
  k.zc = function(a) {
    var b = this;
    this.addAuthTokenListener(function() {
      a.next(U(b));
    });
  };
  k.Ac = function(a) {
    var b = this;
    Vn(this, function() {
      a.next(U(b));
    });
  };
  k.Ic = function(a, b, c) {
    var d = this;
    this.ba && Promise.resolve().then(function() {
      "function" === typeof a ? a(U(d)) : "function" === typeof a.next && a.next(U(d));
    });
    return this.Pa(a, b, c);
  };
  k.Hc = function(a, b, c) {
    var d = this;
    this.ba && Promise.resolve().then(function() {
      d.W = d.getUid();
      "function" === typeof a ? a(U(d)) : "function" === typeof a.next && a.next(U(d));
    });
    return this.ib(a, b, c);
  };
  k.nc = function(a) {
    var b = this, c = this.h.then(function() {
      return U(b) ? U(b).I(a).then(function(d) {
        return {
          accessToken: d
        };
      }) : null;
    });
    return T(this, c);
  };
  k.Tc = function(a) {
    var b = this;
    return this.h.then(function() {
      return Qn(b, O(b.a, Kj, {
        token: a
      }));
    }).then(function(c) {
      var d = c.user;
      bn(d, "isAnonymous", false);
      b.da(d);
      return c;
    });
  };
  k.Uc = function(a, b) {
    var c = this;
    return this.h.then(function() {
      return Qn(c, O(c.a, ah, {
        email: a,
        password: b
      }));
    });
  };
  k.dc = function(a, b) {
    var c = this;
    return this.h.then(function() {
      return Qn(c, O(c.a, Ej, {
        email: a,
        password: b
      }));
    });
  };
  k.ab = function(a) {
    var b = this;
    return this.h.then(function() {
      return Qn(b, a.ka(b.a));
    });
  };
  k.Sc = function(a) {
    gf("firebase.auth.Auth.prototype.signInAndRetrieveDataWithCredential is deprecated. Please use firebase.auth.Auth.prototype.signInWithCredential instead.");
    return this.ab(a);
  };
  k.Ab = function() {
    var a = this;
    return this.h.then(function() {
      var b = U(a);
      if (b && b.isAnonymous) {
        var c = kf({
          providerId: null,
          isNewUser: false
        });
        return kf({
          user: b,
          credential: null,
          additionalUserInfo: c,
          operationType: "signIn"
        });
      }
      return Qn(a, a.a.Ab()).then(function(d) {
        var e = d.user;
        bn(e, "isAnonymous", true);
        a.da(e);
        return d;
      });
    });
  };
  function S(a) {
    return a.app;
  }
  function U(a) {
    return a.currentUser;
  }
  k.getUid = function() {
    return U(this) && U(this).uid || null;
  };
  function Wn(a) {
    return U(a) && U(a)._lat || null;
  }
  function Sn(a) {
    if (a.ba) {
      for (var b = 0; b < a.s.length; b++) if (a.s[b]) a.s[b](Wn(a));
      if (a.W !== a.getUid() && a.N.length) {
        for (a.W = a.getUid(), b = 0; b < a.N.length; b++) if (a.N[b]) a.N[b](Wn(a));
      }
    }
  }
  k.cc = function(a) {
    this.addAuthTokenListener(a);
    this.u++;
    0 < this.u && U(this) && Sm(U(this));
  };
  k.Pc = function(a) {
    var b = this;
    w(this.s, function(c) {
      c == a && b.u--;
    });
    0 > this.u && (this.u = 0);
    0 == this.u && U(this) && Tm(U(this));
    this.removeAuthTokenListener(a);
  };
  k.addAuthTokenListener = function(a) {
    var b = this;
    this.s.push(a);
    T(this, this.h.then(function() {
      b.l || Va(b.s, a) && a(Wn(b));
    }));
  };
  k.removeAuthTokenListener = function(a) {
    Xa(this.s, function(b) {
      return b == a;
    });
  };
  function Vn(a, b) {
    a.N.push(b);
    T(a, a.h.then(function() {
      !a.l && Va(a.N, b) && a.W !== a.getUid() && (a.W = a.getUid(), b(Wn(a)));
    }));
  }
  k.delete = function() {
    this.l = true;
    for (var a = 0; a < this.P.length; a++) this.P[a].cancel("app-deleted");
    this.P = [];
    this.i && (a = this.i, a.b.removeListener(xn("local"), a.a, this.ja));
    this.b && (Ql(this.b, this), $l(this.b.b));
    return Promise.resolve();
  };
  function T(a, b) {
    a.P.push(b);
    b.oa(function() {
      Wa(a.P, b);
    });
    return b;
  }
  k.hc = function(a) {
    return T(this, aj(this.a, a));
  };
  k.Bc = function(a) {
    return !!fh(a);
  };
  k.xb = function(a, b) {
    var c = this;
    return T(this, E().then(function() {
      var d = new Sf(b);
      if (!d.c) throw new t("argument-error", $f + " must be true when sending sign in link to email");
      return bg(d);
    }).then(function(d) {
      return c.a.xb(a, d);
    }).then(function() {
    }));
  };
  k.jd = function(a) {
    return this.Sa(a).then(function(b) {
      return b.data.email;
    });
  };
  k.ob = function(a, b) {
    return T(this, this.a.ob(a, b).then(function() {
    }));
  };
  k.Sa = function(a) {
    return T(this, this.a.Sa(a).then(function(b) {
      return new vf(b);
    }));
  };
  k.kb = function(a) {
    return T(this, this.a.kb(a).then(function() {
    }));
  };
  k.wb = function(a, b) {
    var c = this;
    return T(this, E().then(function() {
      return "undefined" === typeof b || mb(b) ? {} : bg(new Sf(b));
    }).then(function(d) {
      return c.a.wb(a, d);
    }).then(function() {
    }));
  };
  k.Wc = function(a, b) {
    return T(this, gm(this, a, b, q(this.ab, this)));
  };
  k.Vc = function(a, b) {
    var c = this;
    return T(this, E().then(function() {
      var d = b || re(), e = eh(a, d);
      d = fh(d);
      if (!d) throw new t("argument-error", "Invalid email link!");
      if (d.tenantId !== c.T()) throw new t("tenant-id-mismatch");
      return c.ab(e);
    }));
  };
  function Xn() {
  }
  Xn.prototype.render = function() {
  };
  Xn.prototype.reset = function() {
  };
  Xn.prototype.getResponse = function() {
  };
  Xn.prototype.execute = function() {
  };
  function Yn() {
    this.a = {};
    this.b = 1e12;
  }
  var Zn = null;
  Yn.prototype.render = function(a, b) {
    this.a[this.b.toString()] = new $n(a, b);
    return this.b++;
  };
  Yn.prototype.reset = function(a) {
    var b = ao(this, a);
    a = bo(a);
    b && a && (b.delete(), delete this.a[a]);
  };
  Yn.prototype.getResponse = function(a) {
    return (a = ao(this, a)) ? a.getResponse() : null;
  };
  Yn.prototype.execute = function(a) {
    (a = ao(this, a)) && a.execute();
  };
  function ao(a, b) {
    return (b = bo(b)) ? a.a[b] || null : null;
  }
  function bo(a) {
    return (a = "undefined" === typeof a ? 1e12 : a) ? a.toString() : null;
  }
  function $n(a, b) {
    this.g = false;
    this.c = b;
    this.a = this.b = null;
    this.h = "invisible" !== this.c.size;
    this.f = kc(a);
    var c = this;
    this.i = function() {
      c.execute();
    };
    this.h ? this.execute() : nd(this.f, "click", this.i);
  }
  $n.prototype.getResponse = function() {
    co(this);
    return this.b;
  };
  $n.prototype.execute = function() {
    co(this);
    var a = this;
    this.a || (this.a = setTimeout(function() {
      a.b = Me();
      var b = a.c.callback, c = a.c["expired-callback"];
      if (b) try {
        b(a.b);
      } catch (d) {
      }
      a.a = setTimeout(function() {
        a.a = null;
        a.b = null;
        if (c) try {
          c();
        } catch (d) {
        }
        a.h && a.execute();
      }, 6e4);
    }, 500));
  };
  $n.prototype.delete = function() {
    co(this);
    this.g = true;
    clearTimeout(this.a);
    this.a = null;
    xd(this.f, "click", this.i);
  };
  function co(a) {
    if (a.g) throw Error("reCAPTCHA mock was already deleted!");
  }
  ;
  function eo() {
  }
  M(eo, "FACTOR_ID", "phone");
  function fo() {
  }
  fo.prototype.g = function() {
    Zn || (Zn = new Yn());
    return E(Zn);
  };
  fo.prototype.c = function() {
  };
  var go = null;
  function ho() {
    this.b = l.grecaptcha ? Infinity : 0;
    this.f = null;
    this.a = "__rcb" + Math.floor(1e6 * Math.random()).toString();
  }
  var io = new qb(rb, "https://www.google.com/recaptcha/api.js?onload=%{onload}&render=explicit&hl=%{hl}"), jo = new Ze(3e4, 6e4);
  ho.prototype.g = function(a) {
    var b = this;
    return new D(function(c, d) {
      var e = setTimeout(function() {
        d(new t("network-request-failed"));
      }, jo.get());
      if (!l.grecaptcha || a !== b.f && !b.b) {
        l[b.a] = function() {
          if (l.grecaptcha) {
            b.f = a;
            var g = l.grecaptcha.render;
            l.grecaptcha.render = function(h, m) {
              h = g(h, m);
              b.b++;
              return h;
            };
            clearTimeout(e);
            c(l.grecaptcha);
          } else clearTimeout(e), d(new t("internal-error"));
          delete l[b.a];
        };
        var f = zb(io, {
          onload: b.a,
          hl: a || ""
        });
        E(Bi(f)).o(function() {
          clearTimeout(e);
          d(new t("internal-error", "Unable to load external reCAPTCHA dependencies!"));
        });
      } else clearTimeout(e), c(l.grecaptcha);
    });
  };
  ho.prototype.c = function() {
    this.b--;
  };
  var ko = null;
  function lo(a, b, c, d, e, f, g) {
    M(this, "type", "recaptcha");
    this.c = this.f = null;
    this.J = false;
    this.v = b;
    this.g = null;
    g ? (go || (go = new fo()), g = go) : (ko || (ko = new ho()), g = ko);
    this.m = g;
    this.a = c || {
      theme: "light",
      type: "image"
    };
    this.h = [];
    if (this.a[mo]) throw new t("argument-error", "sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");
    this.i = "invisible" === this.a[no];
    if (!l.document) throw new t("operation-not-supported-in-this-environment", "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment with DOM support.");
    if (!kc(b) || !this.i && kc(b).hasChildNodes()) throw new t("argument-error", "reCAPTCHA container is either not found or already contains inner elements!");
    this.s = new Ii(a, f || null, e || null);
    this.u = d || function() {
      return null;
    };
    var h = this;
    this.l = [];
    var m = this.a[oo];
    this.a[oo] = function(v) {
      po(h, v);
      if ("function" === typeof m) m(v);
      else if ("string" === typeof m) {
        var B = L(m, l);
        "function" === typeof B && B(v);
      }
    };
    var p = this.a[qo];
    this.a[qo] = function() {
      po(h, null);
      if ("function" === typeof p) p();
      else if ("string" === typeof p) {
        var v = L(p, l);
        "function" === typeof v && v();
      }
    };
  }
  var oo = "callback", qo = "expired-callback", mo = "sitekey", no = "size";
  function po(a, b) {
    for (var c = 0; c < a.l.length; c++) try {
      a.l[c](b);
    } catch (d) {
    }
  }
  function ro(a, b) {
    Xa(a.l, function(c) {
      return c == b;
    });
  }
  function so(a, b) {
    a.h.push(b);
    b.oa(function() {
      Wa(a.h, b);
    });
    return b;
  }
  k = lo.prototype;
  k.Ia = function() {
    var a = this;
    return this.f ? this.f : this.f = so(this, E().then(function() {
      if (Se() && !Je()) return Ee();
      throw new t("operation-not-supported-in-this-environment", "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.");
    }).then(function() {
      return a.m.g(a.u());
    }).then(function(b) {
      a.g = b;
      return O(a.s, Jj, {});
    }).then(function(b) {
      a.a[mo] = b.recaptchaSiteKey;
    }).o(function(b) {
      a.f = null;
      throw b;
    }));
  };
  k.render = function() {
    to(this);
    var a = this;
    return so(this, this.Ia().then(function() {
      if (null === a.c) {
        var b = a.v;
        if (!a.i) {
          var c = kc(b);
          b = nc("DIV");
          c.appendChild(b);
        }
        a.c = a.g.render(b, a.a);
      }
      return a.c;
    }));
  };
  k.verify = function() {
    to(this);
    var a = this;
    return so(this, this.render().then(function(b) {
      return new D(function(c) {
        var d = a.g.getResponse(b);
        if (d) c(d);
        else {
          var e = function(f) {
            f && (ro(a, e), c(f));
          };
          a.l.push(e);
          a.i && a.g.execute(a.c);
        }
      });
    }));
  };
  k.reset = function() {
    to(this);
    null !== this.c && this.g.reset(this.c);
  };
  function to(a) {
    if (a.J) throw new t("internal-error", "RecaptchaVerifier instance has been destroyed.");
  }
  k.clear = function() {
    to(this);
    this.J = true;
    this.m.c();
    for (var a = 0; a < this.h.length; a++) this.h[a].cancel("RecaptchaVerifier instance has been destroyed.");
    if (!this.i) {
      a = kc(this.v);
      for (var b; b = a.firstChild; ) a.removeChild(b);
    }
  };
  function uo(a, b, c) {
    var d = false;
    try {
      this.b = c || index_esm_default.app();
    } catch (g) {
      throw new t("argument-error", "No firebase.app.App instance is currently initialized.");
    }
    if (this.b.options && this.b.options.apiKey) c = this.b.options.apiKey;
    else throw new t("invalid-api-key");
    var e = this, f = null;
    try {
      f = this.b.auth().Ga();
    } catch (g) {
    }
    try {
      d = this.b.auth().settings.appVerificationDisabledForTesting;
    } catch (g) {
    }
    f = index_esm_default.SDK_VERSION ? Oe(index_esm_default.SDK_VERSION, f) : null;
    lo.call(this, c, a, b, function() {
      try {
        var g = e.b.auth().la();
      } catch (h) {
        g = null;
      }
      return g;
    }, f, Ca(Da), d);
  }
  r(uo, lo);
  function vo(a, b, c, d) {
    a: {
      c = Array.prototype.slice.call(c);
      var e = 0;
      for (var f = false, g = 0; g < b.length; g++) if (b[g].optional) f = true;
      else {
        if (f) throw new t("internal-error", "Argument validator encountered a required argument after an optional argument.");
        e++;
      }
      f = b.length;
      if (c.length < e || f < c.length) d = "Expected " + (e == f ? 1 == e ? "1 argument" : e + " arguments" : e + "-" + f + " arguments") + " but got " + c.length + ".";
      else {
        for (e = 0; e < c.length; e++) if (f = b[e].optional && void 0 === c[e], !b[e].M(c[e]) && !f) {
          b = b[e];
          if (0 > e || e >= wo.length) throw new t("internal-error", "Argument validator received an unsupported number of arguments.");
          c = wo[e];
          d = (d ? "" : c + " argument ") + (b.name ? '"' + b.name + '" ' : "") + "must be " + b.K + ".";
          break a;
        }
        d = null;
      }
    }
    if (d) throw new t("argument-error", a + " failed: " + d);
  }
  var wo = "First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" ");
  function V(a, b) {
    return {
      name: a || "",
      K: "a valid string",
      optional: !!b,
      M: function(c) {
        return "string" === typeof c;
      }
    };
  }
  function xo(a, b) {
    return {
      name: a || "",
      K: "a boolean",
      optional: !!b,
      M: function(c) {
        return "boolean" === typeof c;
      }
    };
  }
  function W(a, b) {
    return {
      name: a || "",
      K: "a valid object",
      optional: !!b,
      M: n
    };
  }
  function yo(a, b) {
    return {
      name: a || "",
      K: "a function",
      optional: !!b,
      M: function(c) {
        return "function" === typeof c;
      }
    };
  }
  function zo(a, b) {
    return {
      name: a || "",
      K: "null",
      optional: !!b,
      M: function(c) {
        return null === c;
      }
    };
  }
  function Ao() {
    return {
      name: "",
      K: "an HTML element",
      optional: false,
      M: function(a) {
        return !!(a && a instanceof Element);
      }
    };
  }
  function Bo() {
    return {
      name: "auth",
      K: "an instance of Firebase Auth",
      optional: true,
      M: function(a) {
        return !!(a && a instanceof Fn);
      }
    };
  }
  function Co() {
    return {
      name: "app",
      K: "an instance of Firebase App",
      optional: true,
      M: function(a) {
        return !!(a && a instanceof index_esm_default.app.App);
      }
    };
  }
  function Do(a) {
    return {
      name: a ? a + "Credential" : "credential",
      K: a ? "a valid " + a + " credential" : "a valid credential",
      optional: false,
      M: function(b) {
        if (!b) return false;
        var c = !a || b.providerId === a;
        return !(!b.ka || !c);
      }
    };
  }
  function Eo() {
    return {
      name: "multiFactorAssertion",
      K: "a valid multiFactorAssertion",
      optional: false,
      M: function(a) {
        return a ? !!a.tb : false;
      }
    };
  }
  function Fo() {
    return {
      name: "authProvider",
      K: "a valid Auth provider",
      optional: false,
      M: function(a) {
        return !!(a && a.providerId && a.hasOwnProperty && a.hasOwnProperty("isOAuthProvider"));
      }
    };
  }
  function Go(a, b) {
    return n(a) && "string" === typeof a.type && a.type === b && "function" === typeof a.Ha;
  }
  function Ho(a) {
    return n(a) && "string" === typeof a.uid;
  }
  function Io() {
    return {
      name: "applicationVerifier",
      K: "an implementation of firebase.auth.ApplicationVerifier",
      optional: false,
      M: function(a) {
        return !(!a || "string" !== typeof a.type || "function" !== typeof a.verify);
      }
    };
  }
  function X(a, b, c, d) {
    return {
      name: c || "",
      K: a.K + " or " + b.K,
      optional: !!d,
      M: function(e) {
        return a.M(e) || b.M(e);
      }
    };
  }
  ;
  function Y(a, b) {
    for (var c in b) {
      var d = b[c].name;
      a[d] = Jo(d, a[c], b[c].j);
    }
  }
  function Ko(a, b) {
    for (var c in b) {
      var d = b[c].name;
      d !== c && Object.defineProperty(a, d, {
        get: ua(function(e) {
          return this[e];
        }, c),
        set: ua(function(e, f, g, h) {
          vo(e, [g], [h], true);
          this[f] = h;
        }, d, c, b[c].lb),
        enumerable: true
      });
    }
  }
  function Z(a, b, c, d) {
    a[b] = Jo(b, c, d);
  }
  function Jo(a, b, c) {
    function d() {
      var g = Array.prototype.slice.call(arguments);
      vo(e, c, g);
      return b.apply(this, g);
    }
    if (!c) return b;
    var e = Lo(a), f;
    for (f in b) d[f] = b[f];
    for (f in b.prototype) d.prototype[f] = b.prototype[f];
    return d;
  }
  function Lo(a) {
    a = a.split(".");
    return a[a.length - 1];
  }
  ;
  Y(Fn.prototype, {
    kb: {
      name: "applyActionCode",
      j: [V("code")]
    },
    Sa: {
      name: "checkActionCode",
      j: [V("code")]
    },
    ob: {
      name: "confirmPasswordReset",
      j: [V("code"), V("newPassword")]
    },
    dc: {
      name: "createUserWithEmailAndPassword",
      j: [V("email"), V("password")]
    },
    hc: {
      name: "fetchSignInMethodsForEmail",
      j: [V("email")]
    },
    ra: {
      name: "getRedirectResult",
      j: []
    },
    Bc: {
      name: "isSignInWithEmailLink",
      j: [V("emailLink")]
    },
    Hc: {
      name: "onAuthStateChanged",
      j: [X(W(), yo(), "nextOrObserver"), yo("opt_error", true), yo("opt_completed", true)]
    },
    Ic: {
      name: "onIdTokenChanged",
      j: [X(W(), yo(), "nextOrObserver"), yo("opt_error", true), yo("opt_completed", true)]
    },
    wb: {
      name: "sendPasswordResetEmail",
      j: [V("email"), X(W("opt_actionCodeSettings", true), zo(null, true), "opt_actionCodeSettings", true)]
    },
    xb: {
      name: "sendSignInLinkToEmail",
      j: [V("email"), W("actionCodeSettings")]
    },
    yb: {
      name: "setPersistence",
      j: [V("persistence")]
    },
    Sc: {
      name: "signInAndRetrieveDataWithCredential",
      j: [Do()]
    },
    Ab: {
      name: "signInAnonymously",
      j: []
    },
    ab: {
      name: "signInWithCredential",
      j: [Do()]
    },
    Tc: {
      name: "signInWithCustomToken",
      j: [V("token")]
    },
    Uc: {
      name: "signInWithEmailAndPassword",
      j: [V("email"), V("password")]
    },
    Vc: {
      name: "signInWithEmailLink",
      j: [V("email"), V("emailLink", true)]
    },
    Wc: {
      name: "signInWithPhoneNumber",
      j: [V("phoneNumber"), Io()]
    },
    Xc: {
      name: "signInWithPopup",
      j: [Fo()]
    },
    Yc: {
      name: "signInWithRedirect",
      j: [Fo()]
    },
    dd: {
      name: "updateCurrentUser",
      j: [X(/* @__PURE__ */ function(a) {
        return {
          name: "user",
          K: "an instance of Firebase User",
          optional: !!a,
          M: function(b) {
            return !!(b && b instanceof Im);
          }
        };
      }(), zo(), "user")]
    },
    Bb: {
      name: "signOut",
      j: []
    },
    toJSON: {
      name: "toJSON",
      j: [V(null, true)]
    },
    fd: {
      name: "useDeviceLanguage",
      j: []
    },
    gd: {
      name: "useEmulator",
      j: [V("url"), W("options", true)]
    },
    jd: {
      name: "verifyPasswordResetCode",
      j: [V("code")]
    }
  });
  Ko(Fn.prototype, {
    lc: {
      name: "languageCode",
      lb: X(V(), zo(), "languageCode")
    },
    ti: {
      name: "tenantId",
      lb: X(V(), zo(), "tenantId")
    }
  });
  Fn.Persistence = Rk;
  Fn.Persistence.LOCAL = "local";
  Fn.Persistence.SESSION = "session";
  Fn.Persistence.NONE = "none";
  Y(Im.prototype, {
    "delete": {
      name: "delete",
      j: []
    },
    oc: {
      name: "getIdTokenResult",
      j: [xo("opt_forceRefresh", true)]
    },
    I: {
      name: "getIdToken",
      j: [xo("opt_forceRefresh", true)]
    },
    Cc: {
      name: "linkAndRetrieveDataWithCredential",
      j: [Do()]
    },
    rb: {
      name: "linkWithCredential",
      j: [Do()]
    },
    Dc: {
      name: "linkWithPhoneNumber",
      j: [V("phoneNumber"), Io()]
    },
    Ec: {
      name: "linkWithPopup",
      j: [Fo()]
    },
    Fc: {
      name: "linkWithRedirect",
      j: [Fo()]
    },
    Lc: {
      name: "reauthenticateAndRetrieveDataWithCredential",
      j: [Do()]
    },
    ub: {
      name: "reauthenticateWithCredential",
      j: [Do()]
    },
    Mc: {
      name: "reauthenticateWithPhoneNumber",
      j: [V("phoneNumber"), Io()]
    },
    Nc: {
      name: "reauthenticateWithPopup",
      j: [Fo()]
    },
    Oc: {
      name: "reauthenticateWithRedirect",
      j: [Fo()]
    },
    reload: {
      name: "reload",
      j: []
    },
    vb: {
      name: "sendEmailVerification",
      j: [X(W("opt_actionCodeSettings", true), zo(null, true), "opt_actionCodeSettings", true)]
    },
    toJSON: {
      name: "toJSON",
      j: [V(null, true)]
    },
    cd: {
      name: "unlink",
      j: [V("provider")]
    },
    Cb: {
      name: "updateEmail",
      j: [V("email")]
    },
    Db: {
      name: "updatePassword",
      j: [V("password")]
    },
    ed: {
      name: "updatePhoneNumber",
      j: [Do("phone")]
    },
    Eb: {
      name: "updateProfile",
      j: [W("profile")]
    },
    Fb: {
      name: "verifyBeforeUpdateEmail",
      j: [V("email"), X(W("opt_actionCodeSettings", true), zo(null, true), "opt_actionCodeSettings", true)]
    }
  });
  Y(Yn.prototype, {
    execute: {
      name: "execute"
    },
    render: {
      name: "render"
    },
    reset: {
      name: "reset"
    },
    getResponse: {
      name: "getResponse"
    }
  });
  Y(Xn.prototype, {
    execute: {
      name: "execute"
    },
    render: {
      name: "render"
    },
    reset: {
      name: "reset"
    },
    getResponse: {
      name: "getResponse"
    }
  });
  Y(D.prototype, {
    oa: {
      name: "finally"
    },
    o: {
      name: "catch"
    },
    then: {
      name: "then"
    }
  });
  Ko(em.prototype, {
    appVerificationDisabled: {
      name: "appVerificationDisabledForTesting",
      lb: xo("appVerificationDisabledForTesting")
    }
  });
  Y(fm.prototype, {
    confirm: {
      name: "confirm",
      j: [V("verificationCode")]
    }
  });
  Z(Bg, "fromJSON", function(a) {
    a = "string" === typeof a ? JSON.parse(a) : a;
    for (var b, c = [Mg, dh, kh, Jg], d = 0; d < c.length; d++) if (b = c[d](a)) return b;
    return null;
  }, [X(V(), W(), "json")]);
  Z(Zg, "credential", function(a, b) {
    return new Yg(a, b);
  }, [V("email"), V("password")]);
  Y(Yg.prototype, {
    w: {
      name: "toJSON",
      j: [V(null, true)]
    }
  });
  Y(Qg.prototype, {
    Ca: {
      name: "addScope",
      j: [V("scope")]
    },
    Ka: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Z(Qg, "credential", Rg, [X(V(), W(), "token")]);
  Z(Zg, "credentialWithLink", eh, [V("email"), V("emailLink")]);
  Y(Sg.prototype, {
    Ca: {
      name: "addScope",
      j: [V("scope")]
    },
    Ka: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Z(Sg, "credential", Tg, [X(V(), W(), "token")]);
  Y(Ug.prototype, {
    Ca: {
      name: "addScope",
      j: [V("scope")]
    },
    Ka: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Z(Ug, "credential", Vg, [X(V(), X(W(), zo()), "idToken"), X(V(), zo(), "accessToken", true)]);
  Y(Wg.prototype, {
    Ka: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Z(Wg, "credential", Xg, [X(V(), W(), "token"), V("secret", true)]);
  Y(Pg.prototype, {
    Ca: {
      name: "addScope",
      j: [V("scope")]
    },
    credential: {
      name: "credential",
      j: [X(V(), X(W(), zo()), "optionsOrIdToken"), X(V(), zo(), "accessToken", true)]
    },
    Ka: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Y(Kg.prototype, {
    w: {
      name: "toJSON",
      j: [V(null, true)]
    }
  });
  Y(Eg.prototype, {
    w: {
      name: "toJSON",
      j: [V(null, true)]
    }
  });
  Z(lh, "credential", ph, [V("verificationId"), V("verificationCode")]);
  Y(lh.prototype, {
    gb: {
      name: "verifyPhoneNumber",
      j: [X(V(), /* @__PURE__ */ function(a, b) {
        return {
          name: a || "phoneInfoOptions",
          K: "valid phone info options",
          optional: !!b,
          M: function(c) {
            return c ? c.session && c.phoneNumber ? Go(c.session, zg) && "string" === typeof c.phoneNumber : c.session && c.multiFactorHint ? Go(c.session, Ag) && Ho(c.multiFactorHint) : c.session && c.multiFactorUid ? Go(c.session, Ag) && "string" === typeof c.multiFactorUid : c.phoneNumber ? "string" === typeof c.phoneNumber : false : false;
          }
        };
      }(), "phoneInfoOptions"), Io()]
    }
  });
  Y(gh.prototype, {
    w: {
      name: "toJSON",
      j: [V(null, true)]
    }
  });
  Y(t.prototype, {
    toJSON: {
      name: "toJSON",
      j: [V(null, true)]
    }
  });
  Y(yh.prototype, {
    toJSON: {
      name: "toJSON",
      j: [V(null, true)]
    }
  });
  Y(xh.prototype, {
    toJSON: {
      name: "toJSON",
      j: [V(null, true)]
    }
  });
  Y(lm.prototype, {
    toJSON: {
      name: "toJSON",
      j: [V(null, true)]
    }
  });
  Y(im.prototype, {
    Rc: {
      name: "resolveSignIn",
      j: [Eo()]
    }
  });
  Y(tm.prototype, {
    Sb: {
      name: "getSession",
      j: []
    },
    fc: {
      name: "enroll",
      j: [Eo(), V("displayName", true)]
    },
    bd: {
      name: "unenroll",
      j: [X({
        name: "multiFactorInfo",
        K: "a valid multiFactorInfo",
        optional: false,
        M: Ho
      }, V(), "multiFactorInfoIdentifier")]
    }
  });
  Y(uo.prototype, {
    clear: {
      name: "clear",
      j: []
    },
    render: {
      name: "render",
      j: []
    },
    verify: {
      name: "verify",
      j: []
    }
  });
  Z(Jf, "parseLink", Rf, [V("link")]);
  Z(eo, "assertion", function(a) {
    return new rm(a);
  }, [Do("phone")]);
  (function() {
    if ("undefined" !== typeof index_esm_default && index_esm_default.INTERNAL && index_esm_default.INTERNAL.registerComponent) {
      var a = {
        ActionCodeInfo: {
          Operation: {
            EMAIL_SIGNIN: Af,
            PASSWORD_RESET: "PASSWORD_RESET",
            RECOVER_EMAIL: "RECOVER_EMAIL",
            REVERT_SECOND_FACTOR_ADDITION: Cf,
            VERIFY_AND_CHANGE_EMAIL: Bf,
            VERIFY_EMAIL: "VERIFY_EMAIL"
          }
        },
        Auth: Fn,
        AuthCredential: Bg,
        Error: t
      };
      Z(a, "EmailAuthProvider", Zg, []);
      Z(a, "FacebookAuthProvider", Qg, []);
      Z(a, "GithubAuthProvider", Sg, []);
      Z(a, "GoogleAuthProvider", Ug, []);
      Z(a, "TwitterAuthProvider", Wg, []);
      Z(a, "OAuthProvider", Pg, [V("providerId")]);
      Z(a, "SAMLAuthProvider", Og, [V("providerId")]);
      Z(a, "PhoneAuthProvider", lh, [Bo()]);
      Z(a, "RecaptchaVerifier", uo, [X(V(), Ao(), "recaptchaContainer"), W("recaptchaParameters", true), Co()]);
      Z(a, "ActionCodeURL", Jf, []);
      Z(a, "PhoneMultiFactorGenerator", eo, []);
      index_esm_default.INTERNAL.registerComponent({
        name: "auth",
        instanceFactory: function(b) {
          b = b.getProvider("app").getImmediate();
          return new Fn(b);
        },
        multipleInstances: false,
        serviceProps: a,
        instantiationMode: "LAZY",
        type: "PUBLIC",
        onInstanceCreated: function(b) {
          b.getProvider("auth-internal").initialize();
        }
      });
      index_esm_default.INTERNAL.registerComponent({
        name: "auth-internal",
        instanceFactory: function(b) {
          b = b.getProvider("auth").getImmediate();
          return {
            getUid: q(b.getUid, b),
            getToken: q(b.nc, b),
            addAuthTokenListener: q(b.cc, b),
            removeAuthTokenListener: q(b.Pc, b)
          };
        },
        multipleInstances: false,
        instantiationMode: "LAZY",
        type: "PRIVATE"
      });
      index_esm_default.registerVersion("@firebase/auth", "0.16.8");
      index_esm_default.INTERNAL.extendNamespace({
        User: Im
      });
    } else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");
  })();
}).apply(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
//# sourceMappingURL=index.esm-NRZMCRQZ.js.map
