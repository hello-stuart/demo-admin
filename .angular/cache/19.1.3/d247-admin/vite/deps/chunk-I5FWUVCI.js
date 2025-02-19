import {
  __assign,
  __awaiter,
  __extends,
  __generator,
  __read,
  __spreadArray,
  __values
} from "./chunk-55JZBEKM.js";

// node_modules/@firebase/util/dist/index.esm.js
var stringToByteArray$1 = function(str) {
  var out = [];
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
var byteArrayToString = function(bytes) {
  var out = [];
  var pos = 0, c = 0;
  while (pos < bytes.length) {
    var c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      var c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      var c2 = bytes[pos++];
      var c3 = bytes[pos++];
      var c4 = bytes[pos++];
      var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
      out[c++] = String.fromCharCode(55296 + (u >> 10));
      out[c++] = String.fromCharCode(56320 + (u & 1023));
    } else {
      var c2 = bytes[pos++];
      var c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }
  return out.join("");
};
var base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + "+/=";
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + "-_.";
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === "function",
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray: function(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error("encodeByteArray takes an array as a parameter");
    }
    this.init_();
    var byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    var output = [];
    for (var i = 0; i < input.length; i += 3) {
      var byte1 = input[i];
      var haveByte2 = i + 1 < input.length;
      var byte2 = haveByte2 ? input[i + 1] : 0;
      var haveByte3 = i + 2 < input.length;
      var byte3 = haveByte3 ? input[i + 2] : 0;
      var outByte1 = byte1 >> 2;
      var outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
      var outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
      var outByte4 = byte3 & 63;
      if (!haveByte3) {
        outByte4 = 64;
        if (!haveByte2) {
          outByte3 = 64;
        }
      }
      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }
    return output.join("");
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString: function(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }
    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString: function(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }
    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray: function(input, webSafe) {
    this.init_();
    var charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    var output = [];
    for (var i = 0; i < input.length; ) {
      var byte1 = charToByteMap[input.charAt(i++)];
      var haveByte2 = i < input.length;
      var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      var haveByte3 = i < input.length;
      var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      var haveByte4 = i < input.length;
      var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw Error();
      }
      var outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);
      if (byte3 !== 64) {
        var outByte2 = byte2 << 4 & 240 | byte3 >> 2;
        output.push(outByte2);
        if (byte4 !== 64) {
          var outByte3 = byte3 << 6 & 192 | byte4;
          output.push(outByte3);
        }
      }
    }
    return output;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_: function() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {};
      for (var i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }
};
var base64Encode = function(str) {
  var utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
var base64urlEncodeWithoutPadding = function(str) {
  return base64Encode(str).replace(/\./g, "");
};
function deepCopy(value) {
  return deepExtend(void 0, value);
}
function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }
  switch (source.constructor) {
    case Date:
      var dateValue = source;
      return new Date(dateValue.getTime());
    case Object:
      if (target === void 0) {
        target = {};
      }
      break;
    case Array:
      target = [];
      break;
    default:
      return source;
  }
  for (var prop in source) {
    if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
      continue;
    }
    target[prop] = deepExtend(target[prop], source[prop]);
  }
  return target;
}
function isValidKey(key) {
  return key !== "__proto__";
}
var Deferred = (
  /** @class */
  function() {
    function Deferred2() {
      var _this = this;
      this.reject = function() {
      };
      this.resolve = function() {
      };
      this.promise = new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
    }
    Deferred2.prototype.wrapCallback = function(callback) {
      var _this = this;
      return function(error, value) {
        if (error) {
          _this.reject(error);
        } else {
          _this.resolve(value);
        }
        if (typeof callback === "function") {
          _this.promise.catch(function() {
          });
          if (callback.length === 1) {
            callback(error);
          } else {
            callback(error, value);
          }
        }
      };
    };
    return Deferred2;
  }()
);
function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  }
  var header = {
    alg: "none",
    type: "JWT"
  };
  var project = projectId || "demo-project";
  var iat = token.iat || 0;
  var sub = token.sub || token.user_id;
  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }
  var payload = __assign({
    // Set all required fields to decent defaults
    iss: "https://securetoken.google.com/" + project,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: "custom",
      identities: {}
    }
  }, token);
  var signature = "";
  return [base64urlEncodeWithoutPadding(JSON.stringify(header)), base64urlEncodeWithoutPadding(JSON.stringify(payload)), signature].join(".");
}
function getUA() {
  if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") {
    return navigator["userAgent"];
  } else {
    return "";
  }
}
function isMobileCordova() {
  return typeof window !== "undefined" && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
function isNode() {
  try {
    return Object.prototype.toString.call(global.process) === "[object process]";
  } catch (e) {
    return false;
  }
}
function isBrowser() {
  return typeof self === "object" && self.self === self;
}
function isBrowserExtension() {
  var runtime = typeof chrome === "object" ? chrome.runtime : typeof browser === "object" ? browser.runtime : void 0;
  return typeof runtime === "object" && runtime.id !== void 0;
}
function isReactNative() {
  return typeof navigator === "object" && navigator["product"] === "ReactNative";
}
function isElectron() {
  return getUA().indexOf("Electron/") >= 0;
}
function isIE() {
  var ua = getUA();
  return ua.indexOf("MSIE ") >= 0 || ua.indexOf("Trident/") >= 0;
}
function isUWP() {
  return getUA().indexOf("MSAppHost/") >= 0;
}
function isSafari() {
  return !isNode() && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
}
var ERROR_NAME = "FirebaseError";
var FirebaseError = (
  /** @class */
  function(_super) {
    __extends(FirebaseError2, _super);
    function FirebaseError2(code, message, customData) {
      var _this = _super.call(this, message) || this;
      _this.code = code;
      _this.customData = customData;
      _this.name = ERROR_NAME;
      Object.setPrototypeOf(_this, FirebaseError2.prototype);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(_this, ErrorFactory.prototype.create);
      }
      return _this;
    }
    return FirebaseError2;
  }(Error)
);
var ErrorFactory = (
  /** @class */
  function() {
    function ErrorFactory2(service, serviceName, errors) {
      this.service = service;
      this.serviceName = serviceName;
      this.errors = errors;
    }
    ErrorFactory2.prototype.create = function(code) {
      var data = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
      }
      var customData = data[0] || {};
      var fullCode = this.service + "/" + code;
      var template = this.errors[code];
      var message = template ? replaceTemplate(template, customData) : "Error";
      var fullMessage = this.serviceName + ": " + message + " (" + fullCode + ").";
      var error = new FirebaseError(fullCode, fullMessage, customData);
      return error;
    };
    return ErrorFactory2;
  }()
);
function replaceTemplate(template, data) {
  return template.replace(PATTERN, function(_, key) {
    var value = data[key];
    return value != null ? String(value) : "<" + key + "?>";
  });
}
var PATTERN = /\{\$([^}]+)}/g;
function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
var Sha1 = (
  /** @class */
  function() {
    function Sha12() {
      this.chain_ = [];
      this.buf_ = [];
      this.W_ = [];
      this.pad_ = [];
      this.inbuf_ = 0;
      this.total_ = 0;
      this.blockSize = 512 / 8;
      this.pad_[0] = 128;
      for (var i = 1; i < this.blockSize; ++i) {
        this.pad_[i] = 0;
      }
      this.reset();
    }
    Sha12.prototype.reset = function() {
      this.chain_[0] = 1732584193;
      this.chain_[1] = 4023233417;
      this.chain_[2] = 2562383102;
      this.chain_[3] = 271733878;
      this.chain_[4] = 3285377520;
      this.inbuf_ = 0;
      this.total_ = 0;
    };
    Sha12.prototype.compress_ = function(buf, offset) {
      if (!offset) {
        offset = 0;
      }
      var W = this.W_;
      if (typeof buf === "string") {
        for (var i = 0; i < 16; i++) {
          W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
          offset += 4;
        }
      } else {
        for (var i = 0; i < 16; i++) {
          W[i] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
          offset += 4;
        }
      }
      for (var i = 16; i < 80; i++) {
        var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
        W[i] = (t << 1 | t >>> 31) & 4294967295;
      }
      var a = this.chain_[0];
      var b = this.chain_[1];
      var c = this.chain_[2];
      var d = this.chain_[3];
      var e = this.chain_[4];
      var f, k;
      for (var i = 0; i < 80; i++) {
        if (i < 40) {
          if (i < 20) {
            f = d ^ b & (c ^ d);
            k = 1518500249;
          } else {
            f = b ^ c ^ d;
            k = 1859775393;
          }
        } else {
          if (i < 60) {
            f = b & c | d & (b | c);
            k = 2400959708;
          } else {
            f = b ^ c ^ d;
            k = 3395469782;
          }
        }
        var t = (a << 5 | a >>> 27) + f + e + k + W[i] & 4294967295;
        e = d;
        d = c;
        c = (b << 30 | b >>> 2) & 4294967295;
        b = a;
        a = t;
      }
      this.chain_[0] = this.chain_[0] + a & 4294967295;
      this.chain_[1] = this.chain_[1] + b & 4294967295;
      this.chain_[2] = this.chain_[2] + c & 4294967295;
      this.chain_[3] = this.chain_[3] + d & 4294967295;
      this.chain_[4] = this.chain_[4] + e & 4294967295;
    };
    Sha12.prototype.update = function(bytes, length) {
      if (bytes == null) {
        return;
      }
      if (length === void 0) {
        length = bytes.length;
      }
      var lengthMinusBlock = length - this.blockSize;
      var n = 0;
      var buf = this.buf_;
      var inbuf = this.inbuf_;
      while (n < length) {
        if (inbuf === 0) {
          while (n <= lengthMinusBlock) {
            this.compress_(bytes, n);
            n += this.blockSize;
          }
        }
        if (typeof bytes === "string") {
          while (n < length) {
            buf[inbuf] = bytes.charCodeAt(n);
            ++inbuf;
            ++n;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              break;
            }
          }
        } else {
          while (n < length) {
            buf[inbuf] = bytes[n];
            ++inbuf;
            ++n;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              break;
            }
          }
        }
      }
      this.inbuf_ = inbuf;
      this.total_ += length;
    };
    Sha12.prototype.digest = function() {
      var digest = [];
      var totalBits = this.total_ * 8;
      if (this.inbuf_ < 56) {
        this.update(this.pad_, 56 - this.inbuf_);
      } else {
        this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
      }
      for (var i = this.blockSize - 1; i >= 56; i--) {
        this.buf_[i] = totalBits & 255;
        totalBits /= 256;
      }
      this.compress_(this.buf_);
      var n = 0;
      for (var i = 0; i < 5; i++) {
        for (var j = 24; j >= 0; j -= 8) {
          digest[n] = this.chain_[i] >> j & 255;
          ++n;
        }
      }
      return digest;
    };
    return Sha12;
  }()
);
function createSubscribe(executor, onNoObservers) {
  var proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
var ObserverProxy = (
  /** @class */
  function() {
    function ObserverProxy2(executor, onNoObservers) {
      var _this = this;
      this.observers = [];
      this.unsubscribes = [];
      this.observerCount = 0;
      this.task = Promise.resolve();
      this.finalized = false;
      this.onNoObservers = onNoObservers;
      this.task.then(function() {
        executor(_this);
      }).catch(function(e) {
        _this.error(e);
      });
    }
    ObserverProxy2.prototype.next = function(value) {
      this.forEachObserver(function(observer) {
        observer.next(value);
      });
    };
    ObserverProxy2.prototype.error = function(error) {
      this.forEachObserver(function(observer) {
        observer.error(error);
      });
      this.close(error);
    };
    ObserverProxy2.prototype.complete = function() {
      this.forEachObserver(function(observer) {
        observer.complete();
      });
      this.close();
    };
    ObserverProxy2.prototype.subscribe = function(nextOrObserver, error, complete) {
      var _this = this;
      var observer;
      if (nextOrObserver === void 0 && error === void 0 && complete === void 0) {
        throw new Error("Missing Observer.");
      }
      if (implementsAnyMethods(nextOrObserver, ["next", "error", "complete"])) {
        observer = nextOrObserver;
      } else {
        observer = {
          next: nextOrObserver,
          error,
          complete
        };
      }
      if (observer.next === void 0) {
        observer.next = noop;
      }
      if (observer.error === void 0) {
        observer.error = noop;
      }
      if (observer.complete === void 0) {
        observer.complete = noop;
      }
      var unsub = this.unsubscribeOne.bind(this, this.observers.length);
      if (this.finalized) {
        this.task.then(function() {
          try {
            if (_this.finalError) {
              observer.error(_this.finalError);
            } else {
              observer.complete();
            }
          } catch (e) {
          }
          return;
        });
      }
      this.observers.push(observer);
      return unsub;
    };
    ObserverProxy2.prototype.unsubscribeOne = function(i) {
      if (this.observers === void 0 || this.observers[i] === void 0) {
        return;
      }
      delete this.observers[i];
      this.observerCount -= 1;
      if (this.observerCount === 0 && this.onNoObservers !== void 0) {
        this.onNoObservers(this);
      }
    };
    ObserverProxy2.prototype.forEachObserver = function(fn) {
      if (this.finalized) {
        return;
      }
      for (var i = 0; i < this.observers.length; i++) {
        this.sendOne(i, fn);
      }
    };
    ObserverProxy2.prototype.sendOne = function(i, fn) {
      var _this = this;
      this.task.then(function() {
        if (_this.observers !== void 0 && _this.observers[i] !== void 0) {
          try {
            fn(_this.observers[i]);
          } catch (e) {
            if (typeof console !== "undefined" && console.error) {
              console.error(e);
            }
          }
        }
      });
    };
    ObserverProxy2.prototype.close = function(err) {
      var _this = this;
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      if (err !== void 0) {
        this.finalError = err;
      }
      this.task.then(function() {
        _this.observers = void 0;
        _this.onNoObservers = void 0;
      });
    };
    return ObserverProxy2;
  }()
);
function implementsAnyMethods(obj, methods) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
    var method = methods_1[_i];
    if (method in obj && typeof obj[method] === "function") {
      return true;
    }
  }
  return false;
}
function noop() {
}
var MAX_VALUE_MILLIS = 4 * 60 * 60 * 1e3;
function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}

// node_modules/@firebase/component/dist/index.esm.js
var Component = (
  /** @class */
  function() {
    function Component2(name2, instanceFactory, type) {
      this.name = name2;
      this.instanceFactory = instanceFactory;
      this.type = type;
      this.multipleInstances = false;
      this.serviceProps = {};
      this.instantiationMode = "LAZY";
      this.onInstanceCreated = null;
    }
    Component2.prototype.setInstantiationMode = function(mode) {
      this.instantiationMode = mode;
      return this;
    };
    Component2.prototype.setMultipleInstances = function(multipleInstances) {
      this.multipleInstances = multipleInstances;
      return this;
    };
    Component2.prototype.setServiceProps = function(props) {
      this.serviceProps = props;
      return this;
    };
    Component2.prototype.setInstanceCreatedCallback = function(callback) {
      this.onInstanceCreated = callback;
      return this;
    };
    return Component2;
  }()
);
var DEFAULT_ENTRY_NAME = "[DEFAULT]";
var Provider = (
  /** @class */
  function() {
    function Provider2(name2, container) {
      this.name = name2;
      this.container = container;
      this.component = null;
      this.instances = /* @__PURE__ */ new Map();
      this.instancesDeferred = /* @__PURE__ */ new Map();
      this.instancesOptions = /* @__PURE__ */ new Map();
      this.onInitCallbacks = /* @__PURE__ */ new Map();
    }
    Provider2.prototype.get = function(identifier) {
      var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
      if (!this.instancesDeferred.has(normalizedIdentifier)) {
        var deferred = new Deferred();
        this.instancesDeferred.set(normalizedIdentifier, deferred);
        if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
          try {
            var instance = this.getOrInitializeService({
              instanceIdentifier: normalizedIdentifier
            });
            if (instance) {
              deferred.resolve(instance);
            }
          } catch (e) {
          }
        }
      }
      return this.instancesDeferred.get(normalizedIdentifier).promise;
    };
    Provider2.prototype.getImmediate = function(options) {
      var _a3;
      var normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
      var optional = (_a3 = options === null || options === void 0 ? void 0 : options.optional) !== null && _a3 !== void 0 ? _a3 : false;
      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        try {
          return this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
        } catch (e) {
          if (optional) {
            return null;
          } else {
            throw e;
          }
        }
      } else {
        if (optional) {
          return null;
        } else {
          throw Error("Service " + this.name + " is not available");
        }
      }
    };
    Provider2.prototype.getComponent = function() {
      return this.component;
    };
    Provider2.prototype.setComponent = function(component) {
      var e_1, _a3;
      if (component.name !== this.name) {
        throw Error("Mismatching Component " + component.name + " for Provider " + this.name + ".");
      }
      if (this.component) {
        throw Error("Component for " + this.name + " has already been provided");
      }
      this.component = component;
      if (!this.shouldAutoInitialize()) {
        return;
      }
      if (isComponentEager(component)) {
        try {
          this.getOrInitializeService({
            instanceIdentifier: DEFAULT_ENTRY_NAME
          });
        } catch (e) {
        }
      }
      try {
        for (var _b = __values(this.instancesDeferred.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var _d = __read(_c.value, 2), instanceIdentifier = _d[0], instanceDeferred = _d[1];
          var normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
          try {
            var instance = this.getOrInitializeService({
              instanceIdentifier: normalizedIdentifier
            });
            instanceDeferred.resolve(instance);
          } catch (e) {
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a3 = _b.return)) _a3.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    };
    Provider2.prototype.clearInstance = function(identifier) {
      if (identifier === void 0) {
        identifier = DEFAULT_ENTRY_NAME;
      }
      this.instancesDeferred.delete(identifier);
      this.instancesOptions.delete(identifier);
      this.instances.delete(identifier);
    };
    Provider2.prototype.delete = function() {
      return __awaiter(this, void 0, void 0, function() {
        var services;
        return __generator(this, function(_a3) {
          switch (_a3.label) {
            case 0:
              services = Array.from(this.instances.values());
              return [4, Promise.all(__spreadArray(__spreadArray([], __read(services.filter(function(service) {
                return "INTERNAL" in service;
              }).map(function(service) {
                return service.INTERNAL.delete();
              }))), __read(services.filter(function(service) {
                return "_delete" in service;
              }).map(function(service) {
                return service._delete();
              }))))];
            case 1:
              _a3.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    Provider2.prototype.isComponentSet = function() {
      return this.component != null;
    };
    Provider2.prototype.isInitialized = function(identifier) {
      if (identifier === void 0) {
        identifier = DEFAULT_ENTRY_NAME;
      }
      return this.instances.has(identifier);
    };
    Provider2.prototype.getOptions = function(identifier) {
      if (identifier === void 0) {
        identifier = DEFAULT_ENTRY_NAME;
      }
      return this.instancesOptions.get(identifier) || {};
    };
    Provider2.prototype.initialize = function(opts) {
      var e_2, _a3;
      if (opts === void 0) {
        opts = {};
      }
      var _b = opts.options, options = _b === void 0 ? {} : _b;
      var normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
      if (this.isInitialized(normalizedIdentifier)) {
        throw Error(this.name + "(" + normalizedIdentifier + ") has already been initialized");
      }
      if (!this.isComponentSet()) {
        throw Error("Component " + this.name + " has not been registered yet");
      }
      var instance = this.getOrInitializeService({
        instanceIdentifier: normalizedIdentifier,
        options
      });
      try {
        for (var _c = __values(this.instancesDeferred.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
          var _e = __read(_d.value, 2), instanceIdentifier = _e[0], instanceDeferred = _e[1];
          var normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
          if (normalizedIdentifier === normalizedDeferredIdentifier) {
            instanceDeferred.resolve(instance);
          }
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_d && !_d.done && (_a3 = _c.return)) _a3.call(_c);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
      return instance;
    };
    Provider2.prototype.onInit = function(callback, identifier) {
      var _a3;
      var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
      var existingCallbacks = (_a3 = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a3 !== void 0 ? _a3 : /* @__PURE__ */ new Set();
      existingCallbacks.add(callback);
      this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
      var existingInstance = this.instances.get(normalizedIdentifier);
      if (existingInstance) {
        callback(existingInstance, normalizedIdentifier);
      }
      return function() {
        existingCallbacks.delete(callback);
      };
    };
    Provider2.prototype.invokeOnInitCallbacks = function(instance, identifier) {
      var e_3, _a3;
      var callbacks = this.onInitCallbacks.get(identifier);
      if (!callbacks) {
        return;
      }
      try {
        for (var callbacks_1 = __values(callbacks), callbacks_1_1 = callbacks_1.next(); !callbacks_1_1.done; callbacks_1_1 = callbacks_1.next()) {
          var callback = callbacks_1_1.value;
          try {
            callback(instance, identifier);
          } catch (_b) {
          }
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (callbacks_1_1 && !callbacks_1_1.done && (_a3 = callbacks_1.return)) _a3.call(callbacks_1);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
    };
    Provider2.prototype.getOrInitializeService = function(_a3) {
      var instanceIdentifier = _a3.instanceIdentifier, _b = _a3.options, options = _b === void 0 ? {} : _b;
      var instance = this.instances.get(instanceIdentifier);
      if (!instance && this.component) {
        instance = this.component.instanceFactory(this.container, {
          instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
          options
        });
        this.instances.set(instanceIdentifier, instance);
        this.instancesOptions.set(instanceIdentifier, options);
        this.invokeOnInitCallbacks(instance, instanceIdentifier);
        if (this.component.onInstanceCreated) {
          try {
            this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
          } catch (_c) {
          }
        }
      }
      return instance || null;
    };
    Provider2.prototype.normalizeInstanceIdentifier = function(identifier) {
      if (identifier === void 0) {
        identifier = DEFAULT_ENTRY_NAME;
      }
      if (this.component) {
        return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
      } else {
        return identifier;
      }
    };
    Provider2.prototype.shouldAutoInitialize = function() {
      return !!this.component && this.component.instantiationMode !== "EXPLICIT";
    };
    return Provider2;
  }()
);
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? void 0 : identifier;
}
function isComponentEager(component) {
  return component.instantiationMode === "EAGER";
}
var ComponentContainer = (
  /** @class */
  function() {
    function ComponentContainer2(name2) {
      this.name = name2;
      this.providers = /* @__PURE__ */ new Map();
    }
    ComponentContainer2.prototype.addComponent = function(component) {
      var provider = this.getProvider(component.name);
      if (provider.isComponentSet()) {
        throw new Error("Component " + component.name + " has already been registered with " + this.name);
      }
      provider.setComponent(component);
    };
    ComponentContainer2.prototype.addOrOverwriteComponent = function(component) {
      var provider = this.getProvider(component.name);
      if (provider.isComponentSet()) {
        this.providers.delete(component.name);
      }
      this.addComponent(component);
    };
    ComponentContainer2.prototype.getProvider = function(name2) {
      if (this.providers.has(name2)) {
        return this.providers.get(name2);
      }
      var provider = new Provider(name2, this);
      this.providers.set(name2, provider);
      return provider;
    };
    ComponentContainer2.prototype.getProviders = function() {
      return Array.from(this.providers.values());
    };
    return ComponentContainer2;
  }()
);

// node_modules/@firebase/logger/dist/index.esm.js
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
}
var _a;
var instances = [];
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
  LogLevel2[LogLevel2["VERBOSE"] = 1] = "VERBOSE";
  LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
  LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
  LogLevel2[LogLevel2["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));
var levelStringToEnum = {
  "debug": LogLevel.DEBUG,
  "verbose": LogLevel.VERBOSE,
  "info": LogLevel.INFO,
  "warn": LogLevel.WARN,
  "error": LogLevel.ERROR,
  "silent": LogLevel.SILENT
};
var defaultLogLevel = LogLevel.INFO;
var ConsoleMethod = (_a = {}, _a[LogLevel.DEBUG] = "log", _a[LogLevel.VERBOSE] = "log", _a[LogLevel.INFO] = "info", _a[LogLevel.WARN] = "warn", _a[LogLevel.ERROR] = "error", _a);
var defaultLogHandler = function(instance, logType) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  if (logType < instance.logLevel) {
    return;
  }
  var now = (/* @__PURE__ */ new Date()).toISOString();
  var method = ConsoleMethod[logType];
  if (method) {
    console[method].apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
  } else {
    throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
  }
};
var Logger = (
  /** @class */
  function() {
    function Logger2(name2) {
      this.name = name2;
      this._logLevel = defaultLogLevel;
      this._logHandler = defaultLogHandler;
      this._userLogHandler = null;
      instances.push(this);
    }
    Object.defineProperty(Logger2.prototype, "logLevel", {
      get: function() {
        return this._logLevel;
      },
      set: function(val) {
        if (!(val in LogLevel)) {
          throw new TypeError('Invalid value "' + val + '" assigned to `logLevel`');
        }
        this._logLevel = val;
      },
      enumerable: false,
      configurable: true
    });
    Logger2.prototype.setLogLevel = function(val) {
      this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
    };
    Object.defineProperty(Logger2.prototype, "logHandler", {
      get: function() {
        return this._logHandler;
      },
      set: function(val) {
        if (typeof val !== "function") {
          throw new TypeError("Value assigned to `logHandler` must be a function");
        }
        this._logHandler = val;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Logger2.prototype, "userLogHandler", {
      get: function() {
        return this._userLogHandler;
      },
      set: function(val) {
        this._userLogHandler = val;
      },
      enumerable: false,
      configurable: true
    });
    Logger2.prototype.debug = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
      this._logHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
    };
    Logger2.prototype.log = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
      this._logHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
    };
    Logger2.prototype.info = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
      this._logHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
    };
    Logger2.prototype.warn = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
      this._logHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
    };
    Logger2.prototype.error = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
      this._logHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
    };
    return Logger2;
  }()
);
function setLogLevel(level) {
  instances.forEach(function(inst) {
    inst.setLogLevel(level);
  });
}
function setUserLogHandler(logCallback, options) {
  var _loop_1 = function(instance2) {
    var customLogLevel = null;
    if (options && options.level) {
      customLogLevel = levelStringToEnum[options.level];
    }
    if (logCallback === null) {
      instance2.userLogHandler = null;
    } else {
      instance2.userLogHandler = function(instance3, level) {
        var args = [];
        for (var _i2 = 2; _i2 < arguments.length; _i2++) {
          args[_i2 - 2] = arguments[_i2];
        }
        var message = args.map(function(arg) {
          if (arg == null) {
            return null;
          } else if (typeof arg === "string") {
            return arg;
          } else if (typeof arg === "number" || typeof arg === "boolean") {
            return arg.toString();
          } else if (arg instanceof Error) {
            return arg.message;
          } else {
            try {
              return JSON.stringify(arg);
            } catch (ignored) {
              return null;
            }
          }
        }).filter(function(arg) {
          return arg;
        }).join(" ");
        if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance3.logLevel)) {
          logCallback({
            level: LogLevel[level].toLowerCase(),
            message,
            args,
            type: instance3.name
          });
        }
      };
    }
  };
  for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
    var instance = instances_1[_i];
    _loop_1(instance);
  }
}

// node_modules/@firebase/app/dist/index.esm.js
var _a$1;
var ERRORS = (_a$1 = {}, _a$1[
  "no-app"
  /* NO_APP */
] = "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()", _a$1[
  "bad-app-name"
  /* BAD_APP_NAME */
] = "Illegal App name: '{$appName}", _a$1[
  "duplicate-app"
  /* DUPLICATE_APP */
] = "Firebase App named '{$appName}' already exists", _a$1[
  "app-deleted"
  /* APP_DELETED */
] = "Firebase App named '{$appName}' already deleted", _a$1[
  "invalid-app-argument"
  /* INVALID_APP_ARGUMENT */
] = "firebase.{$appName}() takes either no argument or a Firebase App instance.", _a$1[
  "invalid-log-argument"
  /* INVALID_LOG_ARGUMENT */
] = "First argument to `onLog` must be null or a function.", _a$1);
var ERROR_FACTORY = new ErrorFactory("app", "Firebase", ERRORS);
var name$c = "@firebase/app";
var version$1 = "0.6.30";
var name$b = "@firebase/analytics";
var name$a = "@firebase/app-check";
var name$9 = "@firebase/auth";
var name$8 = "@firebase/database";
var name$7 = "@firebase/functions";
var name$6 = "@firebase/installations";
var name$5 = "@firebase/messaging";
var name$4 = "@firebase/performance";
var name$3 = "@firebase/remote-config";
var name$2 = "@firebase/storage";
var name$1 = "@firebase/firestore";
var name = "firebase-wrapper";
var _a2;
var DEFAULT_ENTRY_NAME2 = "[DEFAULT]";
var PLATFORM_LOG_STRING = (_a2 = {}, _a2[name$c] = "fire-core", _a2[name$b] = "fire-analytics", _a2[name$a] = "fire-app-check", _a2[name$9] = "fire-auth", _a2[name$8] = "fire-rtdb", _a2[name$7] = "fire-fn", _a2[name$6] = "fire-iid", _a2[name$5] = "fire-fcm", _a2[name$4] = "fire-perf", _a2[name$3] = "fire-rc", _a2[name$2] = "fire-gcs", _a2[name$1] = "fire-fst", _a2["fire-js"] = "fire-js", _a2[name] = "fire-js-all", _a2);
var logger = new Logger("@firebase/app");
var FirebaseAppImpl = (
  /** @class */
  function() {
    function FirebaseAppImpl2(options, config, firebase_) {
      var _this = this;
      this.firebase_ = firebase_;
      this.isDeleted_ = false;
      this.name_ = config.name;
      this.automaticDataCollectionEnabled_ = config.automaticDataCollectionEnabled || false;
      this.options_ = deepCopy(options);
      this.container = new ComponentContainer(config.name);
      this._addComponent(new Component(
        "app",
        function() {
          return _this;
        },
        "PUBLIC"
        /* PUBLIC */
      ));
      this.firebase_.INTERNAL.components.forEach(function(component) {
        return _this._addComponent(component);
      });
    }
    Object.defineProperty(FirebaseAppImpl2.prototype, "automaticDataCollectionEnabled", {
      get: function() {
        this.checkDestroyed_();
        return this.automaticDataCollectionEnabled_;
      },
      set: function(val) {
        this.checkDestroyed_();
        this.automaticDataCollectionEnabled_ = val;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FirebaseAppImpl2.prototype, "name", {
      get: function() {
        this.checkDestroyed_();
        return this.name_;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FirebaseAppImpl2.prototype, "options", {
      get: function() {
        this.checkDestroyed_();
        return this.options_;
      },
      enumerable: false,
      configurable: true
    });
    FirebaseAppImpl2.prototype.delete = function() {
      var _this = this;
      return new Promise(function(resolve) {
        _this.checkDestroyed_();
        resolve();
      }).then(function() {
        _this.firebase_.INTERNAL.removeApp(_this.name_);
        return Promise.all(_this.container.getProviders().map(function(provider) {
          return provider.delete();
        }));
      }).then(function() {
        _this.isDeleted_ = true;
      });
    };
    FirebaseAppImpl2.prototype._getService = function(name2, instanceIdentifier) {
      var _a3;
      if (instanceIdentifier === void 0) {
        instanceIdentifier = DEFAULT_ENTRY_NAME2;
      }
      this.checkDestroyed_();
      var provider = this.container.getProvider(name2);
      if (!provider.isInitialized() && ((_a3 = provider.getComponent()) === null || _a3 === void 0 ? void 0 : _a3.instantiationMode) === "EXPLICIT") {
        provider.initialize();
      }
      return provider.getImmediate({
        identifier: instanceIdentifier
      });
    };
    FirebaseAppImpl2.prototype._removeServiceInstance = function(name2, instanceIdentifier) {
      if (instanceIdentifier === void 0) {
        instanceIdentifier = DEFAULT_ENTRY_NAME2;
      }
      this.container.getProvider(name2).clearInstance(instanceIdentifier);
    };
    FirebaseAppImpl2.prototype._addComponent = function(component) {
      try {
        this.container.addComponent(component);
      } catch (e) {
        logger.debug("Component " + component.name + " failed to register with FirebaseApp " + this.name, e);
      }
    };
    FirebaseAppImpl2.prototype._addOrOverwriteComponent = function(component) {
      this.container.addOrOverwriteComponent(component);
    };
    FirebaseAppImpl2.prototype.toJSON = function() {
      return {
        name: this.name,
        automaticDataCollectionEnabled: this.automaticDataCollectionEnabled,
        options: this.options
      };
    };
    FirebaseAppImpl2.prototype.checkDestroyed_ = function() {
      if (this.isDeleted_) {
        throw ERROR_FACTORY.create("app-deleted", {
          appName: this.name_
        });
      }
    };
    return FirebaseAppImpl2;
  }()
);
FirebaseAppImpl.prototype.name && FirebaseAppImpl.prototype.options || FirebaseAppImpl.prototype.delete || console.log("dc");
var version = "8.10.0";
function createFirebaseNamespaceCore(firebaseAppImpl) {
  var apps = {};
  var components = /* @__PURE__ */ new Map();
  var namespace = {
    // Hack to prevent Babel from modifying the object returned
    // as the firebase namespace.
    // @ts-ignore
    __esModule: true,
    initializeApp: initializeApp2,
    // @ts-ignore
    app,
    registerVersion,
    setLogLevel,
    onLog,
    // @ts-ignore
    apps: null,
    SDK_VERSION: version,
    INTERNAL: {
      registerComponent,
      removeApp,
      components,
      useAsService
    }
  };
  namespace["default"] = namespace;
  Object.defineProperty(namespace, "apps", {
    get: getApps
  });
  function removeApp(name2) {
    delete apps[name2];
  }
  function app(name2) {
    name2 = name2 || DEFAULT_ENTRY_NAME2;
    if (!contains(apps, name2)) {
      throw ERROR_FACTORY.create("no-app", {
        appName: name2
      });
    }
    return apps[name2];
  }
  app["App"] = firebaseAppImpl;
  function initializeApp2(options, rawConfig) {
    if (rawConfig === void 0) {
      rawConfig = {};
    }
    if (typeof rawConfig !== "object" || rawConfig === null) {
      var name_1 = rawConfig;
      rawConfig = {
        name: name_1
      };
    }
    var config = rawConfig;
    if (config.name === void 0) {
      config.name = DEFAULT_ENTRY_NAME2;
    }
    var name2 = config.name;
    if (typeof name2 !== "string" || !name2) {
      throw ERROR_FACTORY.create("bad-app-name", {
        appName: String(name2)
      });
    }
    if (contains(apps, name2)) {
      throw ERROR_FACTORY.create("duplicate-app", {
        appName: name2
      });
    }
    var app2 = new firebaseAppImpl(options, config, namespace);
    apps[name2] = app2;
    return app2;
  }
  function getApps() {
    return Object.keys(apps).map(function(name2) {
      return apps[name2];
    });
  }
  function registerComponent(component) {
    var componentName = component.name;
    if (components.has(componentName)) {
      logger.debug("There were multiple attempts to register component " + componentName + ".");
      return component.type === "PUBLIC" ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        namespace[componentName]
      ) : null;
    }
    components.set(componentName, component);
    if (component.type === "PUBLIC") {
      var serviceNamespace = function(appArg) {
        if (appArg === void 0) {
          appArg = app();
        }
        if (typeof appArg[componentName] !== "function") {
          throw ERROR_FACTORY.create("invalid-app-argument", {
            appName: componentName
          });
        }
        return appArg[componentName]();
      };
      if (component.serviceProps !== void 0) {
        deepExtend(serviceNamespace, component.serviceProps);
      }
      namespace[componentName] = serviceNamespace;
      firebaseAppImpl.prototype[componentName] = // TODO: The eslint disable can be removed and the 'ignoreRestArgs'
      // option added to the no-explicit-any rule when ESlint releases it.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function() {
        var args = [];
        for (var _i2 = 0; _i2 < arguments.length; _i2++) {
          args[_i2] = arguments[_i2];
        }
        var serviceFxn = this._getService.bind(this, componentName);
        return serviceFxn.apply(this, component.multipleInstances ? args : []);
      };
    }
    for (var _i = 0, _a3 = Object.keys(apps); _i < _a3.length; _i++) {
      var appName = _a3[_i];
      apps[appName]._addComponent(component);
    }
    return component.type === "PUBLIC" ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      namespace[componentName]
    ) : null;
  }
  function registerVersion(libraryKeyOrName, version2, variant) {
    var _a3;
    var library = (_a3 = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a3 !== void 0 ? _a3 : libraryKeyOrName;
    if (variant) {
      library += "-" + variant;
    }
    var libraryMismatch = library.match(/\s|\//);
    var versionMismatch = version2.match(/\s|\//);
    if (libraryMismatch || versionMismatch) {
      var warning = ['Unable to register library "' + library + '" with version "' + version2 + '":'];
      if (libraryMismatch) {
        warning.push('library name "' + library + '" contains illegal characters (whitespace or "/")');
      }
      if (libraryMismatch && versionMismatch) {
        warning.push("and");
      }
      if (versionMismatch) {
        warning.push('version name "' + version2 + '" contains illegal characters (whitespace or "/")');
      }
      logger.warn(warning.join(" "));
      return;
    }
    registerComponent(new Component(
      library + "-version",
      function() {
        return {
          library,
          version: version2
        };
      },
      "VERSION"
      /* VERSION */
    ));
  }
  function onLog(logCallback, options) {
    if (logCallback !== null && typeof logCallback !== "function") {
      throw ERROR_FACTORY.create(
        "invalid-log-argument"
        /* INVALID_LOG_ARGUMENT */
      );
    }
    setUserLogHandler(logCallback, options);
  }
  function useAsService(app2, name2) {
    if (name2 === "serverAuth") {
      return null;
    }
    var useService = name2;
    return useService;
  }
  return namespace;
}
function createFirebaseNamespace() {
  var namespace = createFirebaseNamespaceCore(FirebaseAppImpl);
  namespace.INTERNAL = __assign(__assign({}, namespace.INTERNAL), {
    createFirebaseNamespace,
    extendNamespace,
    createSubscribe,
    ErrorFactory,
    deepExtend
  });
  function extendNamespace(props) {
    deepExtend(namespace, props);
  }
  return namespace;
}
var firebase$1 = createFirebaseNamespace();
var PlatformLoggerService = (
  /** @class */
  function() {
    function PlatformLoggerService2(container) {
      this.container = container;
    }
    PlatformLoggerService2.prototype.getPlatformInfoString = function() {
      var providers = this.container.getProviders();
      return providers.map(function(provider) {
        if (isVersionServiceProvider(provider)) {
          var service = provider.getImmediate();
          return service.library + "/" + service.version;
        } else {
          return null;
        }
      }).filter(function(logString) {
        return logString;
      }).join(" ");
    };
    return PlatformLoggerService2;
  }()
);
function isVersionServiceProvider(provider) {
  var component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION";
}
function registerCoreComponents(firebase2, variant) {
  firebase2.INTERNAL.registerComponent(new Component(
    "platform-logger",
    function(container) {
      return new PlatformLoggerService(container);
    },
    "PRIVATE"
    /* PRIVATE */
  ));
  firebase2.registerVersion(name$c, version$1, variant);
  firebase2.registerVersion("fire-js", "");
}
if (isBrowser() && self.firebase !== void 0) {
  logger.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");
  sdkVersion = self.firebase.SDK_VERSION;
  if (sdkVersion && sdkVersion.indexOf("LITE") >= 0) {
    logger.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ");
  }
}
var sdkVersion;
var initializeApp = firebase$1.initializeApp;
firebase$1.initializeApp = function() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  if (isNode()) {
    logger.warn(`
      Warning: This is a browser-targeted Firebase bundle but it appears it is being
      run in a Node environment.  If running in a Node environment, make sure you
      are using the bundle specified by the "main" field in package.json.
      
      If you are using Webpack, you can specify "main" as the first item in
      "resolve.mainFields":
      https://webpack.js.org/configuration/resolve/#resolvemainfields
      
      If using Rollup, use the @rollup/plugin-node-resolve plugin and specify "main"
      as the first item in "mainFields", e.g. ['main', 'module'].
      https://github.com/rollup/@rollup/plugin-node-resolve
      `);
  }
  return initializeApp.apply(void 0, args);
};
var firebase = firebase$1;
registerCoreComponents(firebase);
var index_esm_default = firebase;

export {
  createMockUserToken,
  getUA,
  isMobileCordova,
  isBrowserExtension,
  isReactNative,
  isElectron,
  isIE,
  isUWP,
  isSafari,
  getModularInstance,
  Component,
  LogLevel,
  Logger,
  index_esm_default
};
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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
   * Copyright 2021 Google LLC
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
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

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
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

@firebase/component/dist/index.esm.js:
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

@firebase/logger/dist/index.esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
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

@firebase/app/dist/index.esm.js:
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
//# sourceMappingURL=chunk-I5FWUVCI.js.map
