var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/underscore/underscore-node-f.cjs
var require_underscore_node_f = __commonJS({
  "node_modules/underscore/underscore-node-f.cjs"(exports2) {
    Object.defineProperty(exports2, "__esModule", { value: true });
    var VERSION = "1.13.1";
    var root = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {};
    var ArrayProto = Array.prototype;
    var ObjProto = Object.prototype;
    var SymbolProto = typeof Symbol !== "undefined" ? Symbol.prototype : null;
    var push = ArrayProto.push;
    var slice = ArrayProto.slice;
    var toString = ObjProto.toString;
    var hasOwnProperty = ObjProto.hasOwnProperty;
    var supportsArrayBuffer = typeof ArrayBuffer !== "undefined";
    var supportsDataView = typeof DataView !== "undefined";
    var nativeIsArray = Array.isArray;
    var nativeKeys = Object.keys;
    var nativeCreate = Object.create;
    var nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;
    var _isNaN = isNaN;
    var _isFinite = isFinite;
    var hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
    var nonEnumerableProps = [
      "valueOf",
      "isPrototypeOf",
      "toString",
      "propertyIsEnumerable",
      "hasOwnProperty",
      "toLocaleString"
    ];
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    function restArguments(func, startIndex) {
      startIndex = startIndex == null ? func.length - 1 : +startIndex;
      return function() {
        var length = Math.max(arguments.length - startIndex, 0), rest2 = Array(length), index = 0;
        for (; index < length; index++) {
          rest2[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
          case 0:
            return func.call(this, rest2);
          case 1:
            return func.call(this, arguments[0], rest2);
          case 2:
            return func.call(this, arguments[0], arguments[1], rest2);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
          args[index] = arguments[index];
        }
        args[startIndex] = rest2;
        return func.apply(this, args);
      };
    }
    function isObject(obj) {
      var type = typeof obj;
      return type === "function" || type === "object" && !!obj;
    }
    function isNull(obj) {
      return obj === null;
    }
    function isUndefined(obj) {
      return obj === void 0;
    }
    function isBoolean(obj) {
      return obj === true || obj === false || toString.call(obj) === "[object Boolean]";
    }
    function isElement(obj) {
      return !!(obj && obj.nodeType === 1);
    }
    function tagTester(name) {
      var tag = "[object " + name + "]";
      return function(obj) {
        return toString.call(obj) === tag;
      };
    }
    var isString = tagTester("String");
    var isNumber = tagTester("Number");
    var isDate = tagTester("Date");
    var isRegExp = tagTester("RegExp");
    var isError = tagTester("Error");
    var isSymbol = tagTester("Symbol");
    var isArrayBuffer = tagTester("ArrayBuffer");
    var isFunction = tagTester("Function");
    var nodelist = root.document && root.document.childNodes;
    if (typeof /./ != "function" && typeof Int8Array != "object" && typeof nodelist != "function") {
      isFunction = function(obj) {
        return typeof obj == "function" || false;
      };
    }
    var isFunction$1 = isFunction;
    var hasObjectTag = tagTester("Object");
    var hasStringTagBug = supportsDataView && hasObjectTag(new DataView(new ArrayBuffer(8)));
    var isIE11 = typeof Map !== "undefined" && hasObjectTag(new Map());
    var isDataView = tagTester("DataView");
    function ie10IsDataView(obj) {
      return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
    }
    var isDataView$1 = hasStringTagBug ? ie10IsDataView : isDataView;
    var isArray = nativeIsArray || tagTester("Array");
    function has$1(obj, key) {
      return obj != null && hasOwnProperty.call(obj, key);
    }
    var isArguments = tagTester("Arguments");
    (function() {
      if (!isArguments(arguments)) {
        isArguments = function(obj) {
          return has$1(obj, "callee");
        };
      }
    })();
    var isArguments$1 = isArguments;
    function isFinite$1(obj) {
      return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
    }
    function isNaN$1(obj) {
      return isNumber(obj) && _isNaN(obj);
    }
    function constant(value) {
      return function() {
        return value;
      };
    }
    function createSizePropertyCheck(getSizeProperty) {
      return function(collection) {
        var sizeProperty = getSizeProperty(collection);
        return typeof sizeProperty == "number" && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
      };
    }
    function shallowProperty(key) {
      return function(obj) {
        return obj == null ? void 0 : obj[key];
      };
    }
    var getByteLength = shallowProperty("byteLength");
    var isBufferLike = createSizePropertyCheck(getByteLength);
    var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
    function isTypedArray(obj) {
      return nativeIsView ? nativeIsView(obj) && !isDataView$1(obj) : isBufferLike(obj) && typedArrayPattern.test(toString.call(obj));
    }
    var isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false);
    var getLength = shallowProperty("length");
    function emulatedSet(keys2) {
      var hash = {};
      for (var l = keys2.length, i = 0; i < l; ++i)
        hash[keys2[i]] = true;
      return {
        contains: function(key) {
          return hash[key];
        },
        push: function(key) {
          hash[key] = true;
          return keys2.push(key);
        }
      };
    }
    function collectNonEnumProps(obj, keys2) {
      keys2 = emulatedSet(keys2);
      var nonEnumIdx = nonEnumerableProps.length;
      var constructor = obj.constructor;
      var proto = isFunction$1(constructor) && constructor.prototype || ObjProto;
      var prop = "constructor";
      if (has$1(obj, prop) && !keys2.contains(prop))
        keys2.push(prop);
      while (nonEnumIdx--) {
        prop = nonEnumerableProps[nonEnumIdx];
        if (prop in obj && obj[prop] !== proto[prop] && !keys2.contains(prop)) {
          keys2.push(prop);
        }
      }
    }
    function keys(obj) {
      if (!isObject(obj))
        return [];
      if (nativeKeys)
        return nativeKeys(obj);
      var keys2 = [];
      for (var key in obj)
        if (has$1(obj, key))
          keys2.push(key);
      if (hasEnumBug)
        collectNonEnumProps(obj, keys2);
      return keys2;
    }
    function isEmpty(obj) {
      if (obj == null)
        return true;
      var length = getLength(obj);
      if (typeof length == "number" && (isArray(obj) || isString(obj) || isArguments$1(obj)))
        return length === 0;
      return getLength(keys(obj)) === 0;
    }
    function isMatch(object2, attrs) {
      var _keys = keys(attrs), length = _keys.length;
      if (object2 == null)
        return !length;
      var obj = Object(object2);
      for (var i = 0; i < length; i++) {
        var key = _keys[i];
        if (attrs[key] !== obj[key] || !(key in obj))
          return false;
      }
      return true;
    }
    function _$1(obj) {
      if (obj instanceof _$1)
        return obj;
      if (!(this instanceof _$1))
        return new _$1(obj);
      this._wrapped = obj;
    }
    _$1.VERSION = VERSION;
    _$1.prototype.value = function() {
      return this._wrapped;
    };
    _$1.prototype.valueOf = _$1.prototype.toJSON = _$1.prototype.value;
    _$1.prototype.toString = function() {
      return String(this._wrapped);
    };
    function toBufferView(bufferSource) {
      return new Uint8Array(bufferSource.buffer || bufferSource, bufferSource.byteOffset || 0, getByteLength(bufferSource));
    }
    var tagDataView = "[object DataView]";
    function eq(a, b, aStack, bStack) {
      if (a === b)
        return a !== 0 || 1 / a === 1 / b;
      if (a == null || b == null)
        return false;
      if (a !== a)
        return b !== b;
      var type = typeof a;
      if (type !== "function" && type !== "object" && typeof b != "object")
        return false;
      return deepEq(a, b, aStack, bStack);
    }
    function deepEq(a, b, aStack, bStack) {
      if (a instanceof _$1)
        a = a._wrapped;
      if (b instanceof _$1)
        b = b._wrapped;
      var className = toString.call(a);
      if (className !== toString.call(b))
        return false;
      if (hasStringTagBug && className == "[object Object]" && isDataView$1(a)) {
        if (!isDataView$1(b))
          return false;
        className = tagDataView;
      }
      switch (className) {
        case "[object RegExp]":
        case "[object String]":
          return "" + a === "" + b;
        case "[object Number]":
          if (+a !== +a)
            return +b !== +b;
          return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case "[object Date]":
        case "[object Boolean]":
          return +a === +b;
        case "[object Symbol]":
          return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
        case "[object ArrayBuffer]":
        case tagDataView:
          return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
      }
      var areArrays = className === "[object Array]";
      if (!areArrays && isTypedArray$1(a)) {
        var byteLength = getByteLength(a);
        if (byteLength !== getByteLength(b))
          return false;
        if (a.buffer === b.buffer && a.byteOffset === b.byteOffset)
          return true;
        areArrays = true;
      }
      if (!areArrays) {
        if (typeof a != "object" || typeof b != "object")
          return false;
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(isFunction$1(aCtor) && aCtor instanceof aCtor && isFunction$1(bCtor) && bCtor instanceof bCtor) && ("constructor" in a && "constructor" in b)) {
          return false;
        }
      }
      aStack = aStack || [];
      bStack = bStack || [];
      var length = aStack.length;
      while (length--) {
        if (aStack[length] === a)
          return bStack[length] === b;
      }
      aStack.push(a);
      bStack.push(b);
      if (areArrays) {
        length = a.length;
        if (length !== b.length)
          return false;
        while (length--) {
          if (!eq(a[length], b[length], aStack, bStack))
            return false;
        }
      } else {
        var _keys = keys(a), key;
        length = _keys.length;
        if (keys(b).length !== length)
          return false;
        while (length--) {
          key = _keys[length];
          if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack)))
            return false;
        }
      }
      aStack.pop();
      bStack.pop();
      return true;
    }
    function isEqual(a, b) {
      return eq(a, b);
    }
    function allKeys(obj) {
      if (!isObject(obj))
        return [];
      var keys2 = [];
      for (var key in obj)
        keys2.push(key);
      if (hasEnumBug)
        collectNonEnumProps(obj, keys2);
      return keys2;
    }
    function ie11fingerprint(methods) {
      var length = getLength(methods);
      return function(obj) {
        if (obj == null)
          return false;
        var keys2 = allKeys(obj);
        if (getLength(keys2))
          return false;
        for (var i = 0; i < length; i++) {
          if (!isFunction$1(obj[methods[i]]))
            return false;
        }
        return methods !== weakMapMethods || !isFunction$1(obj[forEachName]);
      };
    }
    var forEachName = "forEach";
    var hasName = "has";
    var commonInit = ["clear", "delete"];
    var mapTail = ["get", hasName, "set"];
    var mapMethods = commonInit.concat(forEachName, mapTail);
    var weakMapMethods = commonInit.concat(mapTail);
    var setMethods = ["add"].concat(commonInit, forEachName, hasName);
    var isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester("Map");
    var isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester("WeakMap");
    var isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester("Set");
    var isWeakSet = tagTester("WeakSet");
    function values(obj) {
      var _keys = keys(obj);
      var length = _keys.length;
      var values2 = Array(length);
      for (var i = 0; i < length; i++) {
        values2[i] = obj[_keys[i]];
      }
      return values2;
    }
    function pairs(obj) {
      var _keys = keys(obj);
      var length = _keys.length;
      var pairs2 = Array(length);
      for (var i = 0; i < length; i++) {
        pairs2[i] = [_keys[i], obj[_keys[i]]];
      }
      return pairs2;
    }
    function invert(obj) {
      var result2 = {};
      var _keys = keys(obj);
      for (var i = 0, length = _keys.length; i < length; i++) {
        result2[obj[_keys[i]]] = _keys[i];
      }
      return result2;
    }
    function functions(obj) {
      var names = [];
      for (var key in obj) {
        if (isFunction$1(obj[key]))
          names.push(key);
      }
      return names.sort();
    }
    function createAssigner(keysFunc, defaults2) {
      return function(obj) {
        var length = arguments.length;
        if (defaults2)
          obj = Object(obj);
        if (length < 2 || obj == null)
          return obj;
        for (var index = 1; index < length; index++) {
          var source = arguments[index], keys2 = keysFunc(source), l = keys2.length;
          for (var i = 0; i < l; i++) {
            var key = keys2[i];
            if (!defaults2 || obj[key] === void 0)
              obj[key] = source[key];
          }
        }
        return obj;
      };
    }
    var extend = createAssigner(allKeys);
    var extendOwn = createAssigner(keys);
    var defaults = createAssigner(allKeys, true);
    function ctor() {
      return function() {
      };
    }
    function baseCreate(prototype) {
      if (!isObject(prototype))
        return {};
      if (nativeCreate)
        return nativeCreate(prototype);
      var Ctor = ctor();
      Ctor.prototype = prototype;
      var result2 = new Ctor();
      Ctor.prototype = null;
      return result2;
    }
    function create(prototype, props) {
      var result2 = baseCreate(prototype);
      if (props)
        extendOwn(result2, props);
      return result2;
    }
    function clone(obj) {
      if (!isObject(obj))
        return obj;
      return isArray(obj) ? obj.slice() : extend({}, obj);
    }
    function tap(obj, interceptor) {
      interceptor(obj);
      return obj;
    }
    function toPath$1(path) {
      return isArray(path) ? path : [path];
    }
    _$1.toPath = toPath$1;
    function toPath(path) {
      return _$1.toPath(path);
    }
    function deepGet(obj, path) {
      var length = path.length;
      for (var i = 0; i < length; i++) {
        if (obj == null)
          return void 0;
        obj = obj[path[i]];
      }
      return length ? obj : void 0;
    }
    function get(object2, path, defaultValue) {
      var value = deepGet(object2, toPath(path));
      return isUndefined(value) ? defaultValue : value;
    }
    function has(obj, path) {
      path = toPath(path);
      var length = path.length;
      for (var i = 0; i < length; i++) {
        var key = path[i];
        if (!has$1(obj, key))
          return false;
        obj = obj[key];
      }
      return !!length;
    }
    function identity(value) {
      return value;
    }
    function matcher(attrs) {
      attrs = extendOwn({}, attrs);
      return function(obj) {
        return isMatch(obj, attrs);
      };
    }
    function property(path) {
      path = toPath(path);
      return function(obj) {
        return deepGet(obj, path);
      };
    }
    function optimizeCb(func, context, argCount) {
      if (context === void 0)
        return func;
      switch (argCount == null ? 3 : argCount) {
        case 1:
          return function(value) {
            return func.call(context, value);
          };
        case 3:
          return function(value, index, collection) {
            return func.call(context, value, index, collection);
          };
        case 4:
          return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
          };
      }
      return function() {
        return func.apply(context, arguments);
      };
    }
    function baseIteratee(value, context, argCount) {
      if (value == null)
        return identity;
      if (isFunction$1(value))
        return optimizeCb(value, context, argCount);
      if (isObject(value) && !isArray(value))
        return matcher(value);
      return property(value);
    }
    function iteratee(value, context) {
      return baseIteratee(value, context, Infinity);
    }
    _$1.iteratee = iteratee;
    function cb(value, context, argCount) {
      if (_$1.iteratee !== iteratee)
        return _$1.iteratee(value, context);
      return baseIteratee(value, context, argCount);
    }
    function mapObject(obj, iteratee2, context) {
      iteratee2 = cb(iteratee2, context);
      var _keys = keys(obj), length = _keys.length, results = {};
      for (var index = 0; index < length; index++) {
        var currentKey = _keys[index];
        results[currentKey] = iteratee2(obj[currentKey], currentKey, obj);
      }
      return results;
    }
    function noop() {
    }
    function propertyOf(obj) {
      if (obj == null)
        return noop;
      return function(path) {
        return get(obj, path);
      };
    }
    function times(n, iteratee2, context) {
      var accum = Array(Math.max(0, n));
      iteratee2 = optimizeCb(iteratee2, context, 1);
      for (var i = 0; i < n; i++)
        accum[i] = iteratee2(i);
      return accum;
    }
    function random(min2, max2) {
      if (max2 == null) {
        max2 = min2;
        min2 = 0;
      }
      return min2 + Math.floor(Math.random() * (max2 - min2 + 1));
    }
    var now = Date.now || function() {
      return new Date().getTime();
    };
    function createEscaper(map2) {
      var escaper = function(match) {
        return map2[match];
      };
      var source = "(?:" + keys(map2).join("|") + ")";
      var testRegexp = RegExp(source);
      var replaceRegexp = RegExp(source, "g");
      return function(string) {
        string = string == null ? "" : "" + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
      };
    }
    var escapeMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;"
    };
    var _escape = createEscaper(escapeMap);
    var unescapeMap = invert(escapeMap);
    var _unescape = createEscaper(unescapeMap);
    var templateSettings = _$1.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
      "'": "'",
      "\\": "\\",
      "\r": "r",
      "\n": "n",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
    function escapeChar(match) {
      return "\\" + escapes[match];
    }
    var bareIdentifier = /^\s*(\w|\$)+\s*$/;
    function template(text, settings, oldSettings) {
      if (!settings && oldSettings)
        settings = oldSettings;
      settings = defaults({}, settings, _$1.templateSettings);
      var matcher2 = RegExp([
        (settings.escape || noMatch).source,
        (settings.interpolate || noMatch).source,
        (settings.evaluate || noMatch).source
      ].join("|") + "|$", "g");
      var index = 0;
      var source = "__p+='";
      text.replace(matcher2, function(match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
        index = offset + match.length;
        if (escape) {
          source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        } else if (interpolate) {
          source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        } else if (evaluate) {
          source += "';\n" + evaluate + "\n__p+='";
        }
        return match;
      });
      source += "';\n";
      var argument = settings.variable;
      if (argument) {
        if (!bareIdentifier.test(argument))
          throw new Error("variable is not a bare identifier: " + argument);
      } else {
        source = "with(obj||{}){\n" + source + "}\n";
        argument = "obj";
      }
      source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
      var render;
      try {
        render = new Function(argument, "_", source);
      } catch (e) {
        e.source = source;
        throw e;
      }
      var template2 = function(data) {
        return render.call(this, data, _$1);
      };
      template2.source = "function(" + argument + "){\n" + source + "}";
      return template2;
    }
    function result(obj, path, fallback) {
      path = toPath(path);
      var length = path.length;
      if (!length) {
        return isFunction$1(fallback) ? fallback.call(obj) : fallback;
      }
      for (var i = 0; i < length; i++) {
        var prop = obj == null ? void 0 : obj[path[i]];
        if (prop === void 0) {
          prop = fallback;
          i = length;
        }
        obj = isFunction$1(prop) ? prop.call(obj) : prop;
      }
      return obj;
    }
    var idCounter = 0;
    function uniqueId(prefix) {
      var id = ++idCounter + "";
      return prefix ? prefix + id : id;
    }
    function chain(obj) {
      var instance = _$1(obj);
      instance._chain = true;
      return instance;
    }
    function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
      if (!(callingContext instanceof boundFunc))
        return sourceFunc.apply(context, args);
      var self2 = baseCreate(sourceFunc.prototype);
      var result2 = sourceFunc.apply(self2, args);
      if (isObject(result2))
        return result2;
      return self2;
    }
    var partial = restArguments(function(func, boundArgs) {
      var placeholder = partial.placeholder;
      var bound = function() {
        var position = 0, length = boundArgs.length;
        var args = Array(length);
        for (var i = 0; i < length; i++) {
          args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
        }
        while (position < arguments.length)
          args.push(arguments[position++]);
        return executeBound(func, bound, this, this, args);
      };
      return bound;
    });
    partial.placeholder = _$1;
    var bind = restArguments(function(func, context, args) {
      if (!isFunction$1(func))
        throw new TypeError("Bind must be called on a function");
      var bound = restArguments(function(callArgs) {
        return executeBound(func, bound, context, this, args.concat(callArgs));
      });
      return bound;
    });
    var isArrayLike = createSizePropertyCheck(getLength);
    function flatten$1(input, depth, strict, output) {
      output = output || [];
      if (!depth && depth !== 0) {
        depth = Infinity;
      } else if (depth <= 0) {
        return output.concat(input);
      }
      var idx = output.length;
      for (var i = 0, length = getLength(input); i < length; i++) {
        var value = input[i];
        if (isArrayLike(value) && (isArray(value) || isArguments$1(value))) {
          if (depth > 1) {
            flatten$1(value, depth - 1, strict, output);
            idx = output.length;
          } else {
            var j = 0, len = value.length;
            while (j < len)
              output[idx++] = value[j++];
          }
        } else if (!strict) {
          output[idx++] = value;
        }
      }
      return output;
    }
    var bindAll = restArguments(function(obj, keys2) {
      keys2 = flatten$1(keys2, false, false);
      var index = keys2.length;
      if (index < 1)
        throw new Error("bindAll must be passed function names");
      while (index--) {
        var key = keys2[index];
        obj[key] = bind(obj[key], obj);
      }
      return obj;
    });
    function memoize(func, hasher) {
      var memoize2 = function(key) {
        var cache = memoize2.cache;
        var address = "" + (hasher ? hasher.apply(this, arguments) : key);
        if (!has$1(cache, address))
          cache[address] = func.apply(this, arguments);
        return cache[address];
      };
      memoize2.cache = {};
      return memoize2;
    }
    var delay = restArguments(function(func, wait, args) {
      return setTimeout(function() {
        return func.apply(null, args);
      }, wait);
    });
    var defer = partial(delay, _$1, 1);
    function throttle(func, wait, options) {
      var timeout, context, args, result2;
      var previous = 0;
      if (!options)
        options = {};
      var later = function() {
        previous = options.leading === false ? 0 : now();
        timeout = null;
        result2 = func.apply(context, args);
        if (!timeout)
          context = args = null;
      };
      var throttled = function() {
        var _now = now();
        if (!previous && options.leading === false)
          previous = _now;
        var remaining = wait - (_now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = _now;
          result2 = func.apply(context, args);
          if (!timeout)
            context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result2;
      };
      throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
      };
      return throttled;
    }
    function debounce(func, wait, immediate) {
      var timeout, previous, args, result2, context;
      var later = function() {
        var passed = now() - previous;
        if (wait > passed) {
          timeout = setTimeout(later, wait - passed);
        } else {
          timeout = null;
          if (!immediate)
            result2 = func.apply(context, args);
          if (!timeout)
            args = context = null;
        }
      };
      var debounced = restArguments(function(_args) {
        context = this;
        args = _args;
        previous = now();
        if (!timeout) {
          timeout = setTimeout(later, wait);
          if (immediate)
            result2 = func.apply(context, args);
        }
        return result2;
      });
      debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = args = context = null;
      };
      return debounced;
    }
    function wrap(func, wrapper) {
      return partial(wrapper, func);
    }
    function negate(predicate) {
      return function() {
        return !predicate.apply(this, arguments);
      };
    }
    function compose() {
      var args = arguments;
      var start = args.length - 1;
      return function() {
        var i = start;
        var result2 = args[start].apply(this, arguments);
        while (i--)
          result2 = args[i].call(this, result2);
        return result2;
      };
    }
    function after(times2, func) {
      return function() {
        if (--times2 < 1) {
          return func.apply(this, arguments);
        }
      };
    }
    function before(times2, func) {
      var memo;
      return function() {
        if (--times2 > 0) {
          memo = func.apply(this, arguments);
        }
        if (times2 <= 1)
          func = null;
        return memo;
      };
    }
    var once = partial(before, 2);
    function findKey(obj, predicate, context) {
      predicate = cb(predicate, context);
      var _keys = keys(obj), key;
      for (var i = 0, length = _keys.length; i < length; i++) {
        key = _keys[i];
        if (predicate(obj[key], key, obj))
          return key;
      }
    }
    function createPredicateIndexFinder(dir) {
      return function(array, predicate, context) {
        predicate = cb(predicate, context);
        var length = getLength(array);
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < length; index += dir) {
          if (predicate(array[index], index, array))
            return index;
        }
        return -1;
      };
    }
    var findIndex = createPredicateIndexFinder(1);
    var findLastIndex = createPredicateIndexFinder(-1);
    function sortedIndex(array, obj, iteratee2, context) {
      iteratee2 = cb(iteratee2, context, 1);
      var value = iteratee2(obj);
      var low = 0, high = getLength(array);
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee2(array[mid]) < value)
          low = mid + 1;
        else
          high = mid;
      }
      return low;
    }
    function createIndexFinder(dir, predicateFind, sortedIndex2) {
      return function(array, item, idx) {
        var i = 0, length = getLength(array);
        if (typeof idx == "number") {
          if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
          } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
          }
        } else if (sortedIndex2 && idx && length) {
          idx = sortedIndex2(array, item);
          return array[idx] === item ? idx : -1;
        }
        if (item !== item) {
          idx = predicateFind(slice.call(array, i, length), isNaN$1);
          return idx >= 0 ? idx + i : -1;
        }
        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
          if (array[idx] === item)
            return idx;
        }
        return -1;
      };
    }
    var indexOf = createIndexFinder(1, findIndex, sortedIndex);
    var lastIndexOf = createIndexFinder(-1, findLastIndex);
    function find(obj, predicate, context) {
      var keyFinder = isArrayLike(obj) ? findIndex : findKey;
      var key = keyFinder(obj, predicate, context);
      if (key !== void 0 && key !== -1)
        return obj[key];
    }
    function findWhere(obj, attrs) {
      return find(obj, matcher(attrs));
    }
    function each(obj, iteratee2, context) {
      iteratee2 = optimizeCb(iteratee2, context);
      var i, length;
      if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; i++) {
          iteratee2(obj[i], i, obj);
        }
      } else {
        var _keys = keys(obj);
        for (i = 0, length = _keys.length; i < length; i++) {
          iteratee2(obj[_keys[i]], _keys[i], obj);
        }
      }
      return obj;
    }
    function map(obj, iteratee2, context) {
      iteratee2 = cb(iteratee2, context);
      var _keys = !isArrayLike(obj) && keys(obj), length = (_keys || obj).length, results = Array(length);
      for (var index = 0; index < length; index++) {
        var currentKey = _keys ? _keys[index] : index;
        results[index] = iteratee2(obj[currentKey], currentKey, obj);
      }
      return results;
    }
    function createReduce(dir) {
      var reducer = function(obj, iteratee2, memo, initial2) {
        var _keys = !isArrayLike(obj) && keys(obj), length = (_keys || obj).length, index = dir > 0 ? 0 : length - 1;
        if (!initial2) {
          memo = obj[_keys ? _keys[index] : index];
          index += dir;
        }
        for (; index >= 0 && index < length; index += dir) {
          var currentKey = _keys ? _keys[index] : index;
          memo = iteratee2(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
      };
      return function(obj, iteratee2, memo, context) {
        var initial2 = arguments.length >= 3;
        return reducer(obj, optimizeCb(iteratee2, context, 4), memo, initial2);
      };
    }
    var reduce = createReduce(1);
    var reduceRight = createReduce(-1);
    function filter(obj, predicate, context) {
      var results = [];
      predicate = cb(predicate, context);
      each(obj, function(value, index, list) {
        if (predicate(value, index, list))
          results.push(value);
      });
      return results;
    }
    function reject(obj, predicate, context) {
      return filter(obj, negate(cb(predicate)), context);
    }
    function every(obj, predicate, context) {
      predicate = cb(predicate, context);
      var _keys = !isArrayLike(obj) && keys(obj), length = (_keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = _keys ? _keys[index] : index;
        if (!predicate(obj[currentKey], currentKey, obj))
          return false;
      }
      return true;
    }
    function some(obj, predicate, context) {
      predicate = cb(predicate, context);
      var _keys = !isArrayLike(obj) && keys(obj), length = (_keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = _keys ? _keys[index] : index;
        if (predicate(obj[currentKey], currentKey, obj))
          return true;
      }
      return false;
    }
    function contains(obj, item, fromIndex, guard) {
      if (!isArrayLike(obj))
        obj = values(obj);
      if (typeof fromIndex != "number" || guard)
        fromIndex = 0;
      return indexOf(obj, item, fromIndex) >= 0;
    }
    var invoke = restArguments(function(obj, path, args) {
      var contextPath, func;
      if (isFunction$1(path)) {
        func = path;
      } else {
        path = toPath(path);
        contextPath = path.slice(0, -1);
        path = path[path.length - 1];
      }
      return map(obj, function(context) {
        var method = func;
        if (!method) {
          if (contextPath && contextPath.length) {
            context = deepGet(context, contextPath);
          }
          if (context == null)
            return void 0;
          method = context[path];
        }
        return method == null ? method : method.apply(context, args);
      });
    });
    function pluck(obj, key) {
      return map(obj, property(key));
    }
    function where(obj, attrs) {
      return filter(obj, matcher(attrs));
    }
    function max(obj, iteratee2, context) {
      var result2 = -Infinity, lastComputed = -Infinity, value, computed;
      if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
        obj = isArrayLike(obj) ? obj : values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value != null && value > result2) {
            result2 = value;
          }
        }
      } else {
        iteratee2 = cb(iteratee2, context);
        each(obj, function(v, index, list) {
          computed = iteratee2(v, index, list);
          if (computed > lastComputed || computed === -Infinity && result2 === -Infinity) {
            result2 = v;
            lastComputed = computed;
          }
        });
      }
      return result2;
    }
    function min(obj, iteratee2, context) {
      var result2 = Infinity, lastComputed = Infinity, value, computed;
      if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
        obj = isArrayLike(obj) ? obj : values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value != null && value < result2) {
            result2 = value;
          }
        }
      } else {
        iteratee2 = cb(iteratee2, context);
        each(obj, function(v, index, list) {
          computed = iteratee2(v, index, list);
          if (computed < lastComputed || computed === Infinity && result2 === Infinity) {
            result2 = v;
            lastComputed = computed;
          }
        });
      }
      return result2;
    }
    function sample(obj, n, guard) {
      if (n == null || guard) {
        if (!isArrayLike(obj))
          obj = values(obj);
        return obj[random(obj.length - 1)];
      }
      var sample2 = isArrayLike(obj) ? clone(obj) : values(obj);
      var length = getLength(sample2);
      n = Math.max(Math.min(n, length), 0);
      var last2 = length - 1;
      for (var index = 0; index < n; index++) {
        var rand = random(index, last2);
        var temp = sample2[index];
        sample2[index] = sample2[rand];
        sample2[rand] = temp;
      }
      return sample2.slice(0, n);
    }
    function shuffle(obj) {
      return sample(obj, Infinity);
    }
    function sortBy(obj, iteratee2, context) {
      var index = 0;
      iteratee2 = cb(iteratee2, context);
      return pluck(map(obj, function(value, key, list) {
        return {
          value,
          index: index++,
          criteria: iteratee2(value, key, list)
        };
      }).sort(function(left, right) {
        var a = left.criteria;
        var b = right.criteria;
        if (a !== b) {
          if (a > b || a === void 0)
            return 1;
          if (a < b || b === void 0)
            return -1;
        }
        return left.index - right.index;
      }), "value");
    }
    function group(behavior, partition2) {
      return function(obj, iteratee2, context) {
        var result2 = partition2 ? [[], []] : {};
        iteratee2 = cb(iteratee2, context);
        each(obj, function(value, index) {
          var key = iteratee2(value, index, obj);
          behavior(result2, value, key);
        });
        return result2;
      };
    }
    var groupBy = group(function(result2, value, key) {
      if (has$1(result2, key))
        result2[key].push(value);
      else
        result2[key] = [value];
    });
    var indexBy = group(function(result2, value, key) {
      result2[key] = value;
    });
    var countBy = group(function(result2, value, key) {
      if (has$1(result2, key))
        result2[key]++;
      else
        result2[key] = 1;
    });
    var partition = group(function(result2, value, pass) {
      result2[pass ? 0 : 1].push(value);
    }, true);
    var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    function toArray(obj) {
      if (!obj)
        return [];
      if (isArray(obj))
        return slice.call(obj);
      if (isString(obj)) {
        return obj.match(reStrSymbol);
      }
      if (isArrayLike(obj))
        return map(obj, identity);
      return values(obj);
    }
    function size(obj) {
      if (obj == null)
        return 0;
      return isArrayLike(obj) ? obj.length : keys(obj).length;
    }
    function keyInObj(value, key, obj) {
      return key in obj;
    }
    var pick = restArguments(function(obj, keys2) {
      var result2 = {}, iteratee2 = keys2[0];
      if (obj == null)
        return result2;
      if (isFunction$1(iteratee2)) {
        if (keys2.length > 1)
          iteratee2 = optimizeCb(iteratee2, keys2[1]);
        keys2 = allKeys(obj);
      } else {
        iteratee2 = keyInObj;
        keys2 = flatten$1(keys2, false, false);
        obj = Object(obj);
      }
      for (var i = 0, length = keys2.length; i < length; i++) {
        var key = keys2[i];
        var value = obj[key];
        if (iteratee2(value, key, obj))
          result2[key] = value;
      }
      return result2;
    });
    var omit = restArguments(function(obj, keys2) {
      var iteratee2 = keys2[0], context;
      if (isFunction$1(iteratee2)) {
        iteratee2 = negate(iteratee2);
        if (keys2.length > 1)
          context = keys2[1];
      } else {
        keys2 = map(flatten$1(keys2, false, false), String);
        iteratee2 = function(value, key) {
          return !contains(keys2, key);
        };
      }
      return pick(obj, iteratee2, context);
    });
    function initial(array, n, guard) {
      return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    }
    function first(array, n, guard) {
      if (array == null || array.length < 1)
        return n == null || guard ? void 0 : [];
      if (n == null || guard)
        return array[0];
      return initial(array, array.length - n);
    }
    function rest(array, n, guard) {
      return slice.call(array, n == null || guard ? 1 : n);
    }
    function last(array, n, guard) {
      if (array == null || array.length < 1)
        return n == null || guard ? void 0 : [];
      if (n == null || guard)
        return array[array.length - 1];
      return rest(array, Math.max(0, array.length - n));
    }
    function compact(array) {
      return filter(array, Boolean);
    }
    function flatten(array, depth) {
      return flatten$1(array, depth, false);
    }
    var difference = restArguments(function(array, rest2) {
      rest2 = flatten$1(rest2, true, true);
      return filter(array, function(value) {
        return !contains(rest2, value);
      });
    });
    var without = restArguments(function(array, otherArrays) {
      return difference(array, otherArrays);
    });
    function uniq(array, isSorted, iteratee2, context) {
      if (!isBoolean(isSorted)) {
        context = iteratee2;
        iteratee2 = isSorted;
        isSorted = false;
      }
      if (iteratee2 != null)
        iteratee2 = cb(iteratee2, context);
      var result2 = [];
      var seen = [];
      for (var i = 0, length = getLength(array); i < length; i++) {
        var value = array[i], computed = iteratee2 ? iteratee2(value, i, array) : value;
        if (isSorted && !iteratee2) {
          if (!i || seen !== computed)
            result2.push(value);
          seen = computed;
        } else if (iteratee2) {
          if (!contains(seen, computed)) {
            seen.push(computed);
            result2.push(value);
          }
        } else if (!contains(result2, value)) {
          result2.push(value);
        }
      }
      return result2;
    }
    var union = restArguments(function(arrays) {
      return uniq(flatten$1(arrays, true, true));
    });
    function intersection(array) {
      var result2 = [];
      var argsLength = arguments.length;
      for (var i = 0, length = getLength(array); i < length; i++) {
        var item = array[i];
        if (contains(result2, item))
          continue;
        var j;
        for (j = 1; j < argsLength; j++) {
          if (!contains(arguments[j], item))
            break;
        }
        if (j === argsLength)
          result2.push(item);
      }
      return result2;
    }
    function unzip(array) {
      var length = array && max(array, getLength).length || 0;
      var result2 = Array(length);
      for (var index = 0; index < length; index++) {
        result2[index] = pluck(array, index);
      }
      return result2;
    }
    var zip = restArguments(unzip);
    function object(list, values2) {
      var result2 = {};
      for (var i = 0, length = getLength(list); i < length; i++) {
        if (values2) {
          result2[list[i]] = values2[i];
        } else {
          result2[list[i][0]] = list[i][1];
        }
      }
      return result2;
    }
    function range(start, stop, step) {
      if (stop == null) {
        stop = start || 0;
        start = 0;
      }
      if (!step) {
        step = stop < start ? -1 : 1;
      }
      var length = Math.max(Math.ceil((stop - start) / step), 0);
      var range2 = Array(length);
      for (var idx = 0; idx < length; idx++, start += step) {
        range2[idx] = start;
      }
      return range2;
    }
    function chunk(array, count) {
      if (count == null || count < 1)
        return [];
      var result2 = [];
      var i = 0, length = array.length;
      while (i < length) {
        result2.push(slice.call(array, i, i += count));
      }
      return result2;
    }
    function chainResult(instance, obj) {
      return instance._chain ? _$1(obj).chain() : obj;
    }
    function mixin(obj) {
      each(functions(obj), function(name) {
        var func = _$1[name] = obj[name];
        _$1.prototype[name] = function() {
          var args = [this._wrapped];
          push.apply(args, arguments);
          return chainResult(this, func.apply(_$1, args));
        };
      });
      return _$1;
    }
    each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
      var method = ArrayProto[name];
      _$1.prototype[name] = function() {
        var obj = this._wrapped;
        if (obj != null) {
          method.apply(obj, arguments);
          if ((name === "shift" || name === "splice") && obj.length === 0) {
            delete obj[0];
          }
        }
        return chainResult(this, obj);
      };
    });
    each(["concat", "join", "slice"], function(name) {
      var method = ArrayProto[name];
      _$1.prototype[name] = function() {
        var obj = this._wrapped;
        if (obj != null)
          obj = method.apply(obj, arguments);
        return chainResult(this, obj);
      };
    });
    var allExports = {
      __proto__: null,
      VERSION,
      restArguments,
      isObject,
      isNull,
      isUndefined,
      isBoolean,
      isElement,
      isString,
      isNumber,
      isDate,
      isRegExp,
      isError,
      isSymbol,
      isArrayBuffer,
      isDataView: isDataView$1,
      isArray,
      isFunction: isFunction$1,
      isArguments: isArguments$1,
      isFinite: isFinite$1,
      isNaN: isNaN$1,
      isTypedArray: isTypedArray$1,
      isEmpty,
      isMatch,
      isEqual,
      isMap,
      isWeakMap,
      isSet,
      isWeakSet,
      keys,
      allKeys,
      values,
      pairs,
      invert,
      functions,
      methods: functions,
      extend,
      extendOwn,
      assign: extendOwn,
      defaults,
      create,
      clone,
      tap,
      get,
      has,
      mapObject,
      identity,
      constant,
      noop,
      toPath: toPath$1,
      property,
      propertyOf,
      matcher,
      matches: matcher,
      times,
      random,
      now,
      escape: _escape,
      unescape: _unescape,
      templateSettings,
      template,
      result,
      uniqueId,
      chain,
      iteratee,
      partial,
      bind,
      bindAll,
      memoize,
      delay,
      defer,
      throttle,
      debounce,
      wrap,
      negate,
      compose,
      after,
      before,
      once,
      findKey,
      findIndex,
      findLastIndex,
      sortedIndex,
      indexOf,
      lastIndexOf,
      find,
      detect: find,
      findWhere,
      each,
      forEach: each,
      map,
      collect: map,
      reduce,
      foldl: reduce,
      inject: reduce,
      reduceRight,
      foldr: reduceRight,
      filter,
      select: filter,
      reject,
      every,
      all: every,
      some,
      any: some,
      contains,
      includes: contains,
      include: contains,
      invoke,
      pluck,
      where,
      max,
      min,
      shuffle,
      sample,
      sortBy,
      groupBy,
      indexBy,
      countBy,
      partition,
      toArray,
      size,
      pick,
      omit,
      first,
      head: first,
      take: first,
      initial,
      last,
      rest,
      tail: rest,
      drop: rest,
      compact,
      flatten,
      without,
      uniq,
      unique: uniq,
      union,
      intersection,
      difference,
      unzip,
      transpose: unzip,
      zip,
      object,
      range,
      chunk,
      mixin,
      "default": _$1
    };
    var _ = mixin(allExports);
    _._ = _;
    exports2.VERSION = VERSION;
    exports2._ = _;
    exports2._escape = _escape;
    exports2._unescape = _unescape;
    exports2.after = after;
    exports2.allKeys = allKeys;
    exports2.before = before;
    exports2.bind = bind;
    exports2.bindAll = bindAll;
    exports2.chain = chain;
    exports2.chunk = chunk;
    exports2.clone = clone;
    exports2.compact = compact;
    exports2.compose = compose;
    exports2.constant = constant;
    exports2.contains = contains;
    exports2.countBy = countBy;
    exports2.create = create;
    exports2.debounce = debounce;
    exports2.defaults = defaults;
    exports2.defer = defer;
    exports2.delay = delay;
    exports2.difference = difference;
    exports2.each = each;
    exports2.every = every;
    exports2.extend = extend;
    exports2.extendOwn = extendOwn;
    exports2.filter = filter;
    exports2.find = find;
    exports2.findIndex = findIndex;
    exports2.findKey = findKey;
    exports2.findLastIndex = findLastIndex;
    exports2.findWhere = findWhere;
    exports2.first = first;
    exports2.flatten = flatten;
    exports2.functions = functions;
    exports2.get = get;
    exports2.groupBy = groupBy;
    exports2.has = has;
    exports2.identity = identity;
    exports2.indexBy = indexBy;
    exports2.indexOf = indexOf;
    exports2.initial = initial;
    exports2.intersection = intersection;
    exports2.invert = invert;
    exports2.invoke = invoke;
    exports2.isArguments = isArguments$1;
    exports2.isArray = isArray;
    exports2.isArrayBuffer = isArrayBuffer;
    exports2.isBoolean = isBoolean;
    exports2.isDataView = isDataView$1;
    exports2.isDate = isDate;
    exports2.isElement = isElement;
    exports2.isEmpty = isEmpty;
    exports2.isEqual = isEqual;
    exports2.isError = isError;
    exports2.isFinite = isFinite$1;
    exports2.isFunction = isFunction$1;
    exports2.isMap = isMap;
    exports2.isMatch = isMatch;
    exports2.isNaN = isNaN$1;
    exports2.isNull = isNull;
    exports2.isNumber = isNumber;
    exports2.isObject = isObject;
    exports2.isRegExp = isRegExp;
    exports2.isSet = isSet;
    exports2.isString = isString;
    exports2.isSymbol = isSymbol;
    exports2.isTypedArray = isTypedArray$1;
    exports2.isUndefined = isUndefined;
    exports2.isWeakMap = isWeakMap;
    exports2.isWeakSet = isWeakSet;
    exports2.iteratee = iteratee;
    exports2.keys = keys;
    exports2.last = last;
    exports2.lastIndexOf = lastIndexOf;
    exports2.map = map;
    exports2.mapObject = mapObject;
    exports2.matcher = matcher;
    exports2.max = max;
    exports2.memoize = memoize;
    exports2.min = min;
    exports2.mixin = mixin;
    exports2.negate = negate;
    exports2.noop = noop;
    exports2.now = now;
    exports2.object = object;
    exports2.omit = omit;
    exports2.once = once;
    exports2.pairs = pairs;
    exports2.partial = partial;
    exports2.partition = partition;
    exports2.pick = pick;
    exports2.pluck = pluck;
    exports2.property = property;
    exports2.propertyOf = propertyOf;
    exports2.random = random;
    exports2.range = range;
    exports2.reduce = reduce;
    exports2.reduceRight = reduceRight;
    exports2.reject = reject;
    exports2.rest = rest;
    exports2.restArguments = restArguments;
    exports2.result = result;
    exports2.sample = sample;
    exports2.shuffle = shuffle;
    exports2.size = size;
    exports2.some = some;
    exports2.sortBy = sortBy;
    exports2.sortedIndex = sortedIndex;
    exports2.tap = tap;
    exports2.template = template;
    exports2.templateSettings = templateSettings;
    exports2.throttle = throttle;
    exports2.times = times;
    exports2.toArray = toArray;
    exports2.toPath = toPath$1;
    exports2.union = union;
    exports2.uniq = uniq;
    exports2.uniqueId = uniqueId;
    exports2.unzip = unzip;
    exports2.values = values;
    exports2.where = where;
    exports2.without = without;
    exports2.wrap = wrap;
    exports2.zip = zip;
  }
});

// node_modules/underscore/underscore-node.cjs
var require_underscore_node = __commonJS({
  "node_modules/underscore/underscore-node.cjs"(exports2, module2) {
    var underscoreNodeF = require_underscore_node_f();
    module2.exports = underscoreNodeF._;
  }
});

// node_modules/adal-node/lib/constants.js
var require_constants = __commonJS({
  "node_modules/adal-node/lib/constants.js"(exports2, module2) {
    "use strict";
    var Constants = {
      OAuth2: {
        Parameters: {
          GRANT_TYPE: "grant_type",
          CLIENT_ASSERTION: "client_assertion",
          CLIENT_ASSERTION_TYPE: "client_assertion_type",
          CLIENT_ID: "client_id",
          CLIENT_SECRET: "client_secret",
          REDIRECT_URI: "redirect_uri",
          RESOURCE: "resource",
          CODE: "code",
          SCOPE: "scope",
          ASSERTION: "assertion",
          AAD_API_VERSION: "api-version",
          USERNAME: "username",
          PASSWORD: "password",
          REFRESH_TOKEN: "refresh_token",
          LANGUAGE: "mkt",
          DEVICE_CODE: "device_code"
        },
        GrantType: {
          AUTHORIZATION_CODE: "authorization_code",
          REFRESH_TOKEN: "refresh_token",
          CLIENT_CREDENTIALS: "client_credentials",
          JWT_BEARER: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          PASSWORD: "password",
          SAML1: "urn:ietf:params:oauth:grant-type:saml1_1-bearer",
          SAML2: "urn:ietf:params:oauth:grant-type:saml2-bearer",
          DEVICE_CODE: "device_code"
        },
        ResponseParameters: {
          CODE: "code",
          TOKEN_TYPE: "token_type",
          ACCESS_TOKEN: "access_token",
          ID_TOKEN: "id_token",
          REFRESH_TOKEN: "refresh_token",
          CREATED_ON: "created_on",
          EXPIRES_ON: "expires_on",
          EXPIRES_IN: "expires_in",
          RESOURCE: "resource",
          ERROR: "error",
          ERROR_DESCRIPTION: "error_description"
        },
        DeviceCodeResponseParameters: {
          USER_CODE: "user_code",
          DEVICE_CODE: "device_code",
          VERIFICATION_URL: "verification_url",
          EXPIRES_IN: "expires_in",
          INTERVAL: "interval",
          MESSAGE: "message",
          ERROR: "error",
          ERROR_DESCRIPTION: "error_description"
        },
        Scope: {
          OPENID: "openid"
        },
        IdTokenMap: {
          "tid": "tenantId",
          "given_name": "givenName",
          "family_name": "familyName",
          "idp": "identityProvider",
          "oid": "oid"
        }
      },
      TokenResponseFields: {
        TOKEN_TYPE: "tokenType",
        ACCESS_TOKEN: "accessToken",
        REFRESH_TOKEN: "refreshToken",
        CREATED_ON: "createdOn",
        EXPIRES_ON: "expiresOn",
        EXPIRES_IN: "expiresIn",
        RESOURCE: "resource",
        USER_ID: "userId",
        ERROR: "error",
        ERROR_DESCRIPTION: "errorDescription"
      },
      UserCodeResponseFields: {
        USER_CODE: "userCode",
        DEVICE_CODE: "deviceCode",
        VERIFICATION_URL: "verificationUrl",
        EXPIRES_IN: "expiresIn",
        INTERVAL: "interval",
        MESSAGE: "message",
        ERROR: "error",
        ERROR_DESCRIPTION: "errorDescription"
      },
      IdTokenFields: {
        USER_ID: "userId",
        IS_USER_ID_DISPLAYABLE: "isUserIdDisplayable",
        TENANT_ID: "tenantId",
        GIVE_NAME: "givenName",
        FAMILY_NAME: "familyName",
        IDENTITY_PROVIDER: "identityProvider"
      },
      Misc: {
        MAX_DATE: 4294967295,
        CLOCK_BUFFER: 5
      },
      Jwt: {
        SELF_SIGNED_JWT_LIFETIME: 10,
        AUDIENCE: "aud",
        ISSUER: "iss",
        SUBJECT: "sub",
        NOT_BEFORE: "nbf",
        EXPIRES_ON: "exp",
        JWT_ID: "jti"
      },
      AADConstants: {
        WORLD_WIDE_AUTHORITY: "login.windows.net",
        WELL_KNOWN_AUTHORITY_HOSTS: ["login.windows.net", "login.microsoftonline.com", "login.chinacloudapi.cn", "login-us.microsoftonline.com", "login.microsoftonline.de", "login.microsoftonline.us"],
        INSTANCE_DISCOVERY_ENDPOINT_TEMPLATE: "https://{authorize_host}/common/discovery/instance?authorization_endpoint={authorize_endpoint}&api-version=1.0",
        AUTHORIZE_ENDPOINT_PATH: "/oauth2/authorize",
        TOKEN_ENDPOINT_PATH: "/oauth2/token",
        DEVICE_ENDPOINT_PATH: "/oauth2/devicecode"
      },
      UserRealm: {
        FederationProtocolType: {
          WSFederation: "wstrust",
          SAML2: "saml20",
          Unknown: "unknown"
        },
        AccountType: {
          Federated: "federated",
          Managed: "managed",
          Unknown: "unknown"
        }
      },
      Saml: {
        TokenTypeV1: "urn:oasis:names:tc:SAML:1.0:assertion",
        TokenTypeV2: "urn:oasis:names:tc:SAML:2.0:assertion"
      },
      XmlNamespaces: {
        wsdl: "http://schemas.xmlsoap.org/wsdl/",
        sp: "http://docs.oasis-open.org/ws-sx/ws-securitypolicy/200702",
        sp2005: "http://schemas.xmlsoap.org/ws/2005/07/securitypolicy",
        wsu: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
        wsa10: "http://www.w3.org/2005/08/addressing",
        http: "http://schemas.microsoft.com/ws/06/2004/policy/http",
        soap12: "http://schemas.xmlsoap.org/wsdl/soap12/",
        wsp: "http://schemas.xmlsoap.org/ws/2004/09/policy",
        s: "http://www.w3.org/2003/05/soap-envelope",
        wsa: "http://www.w3.org/2005/08/addressing",
        wst: "http://docs.oasis-open.org/ws-sx/ws-trust/200512",
        t: "http://schemas.xmlsoap.org/ws/2005/02/trust"
      },
      Cache: {
        HASH_ALGORITHM: "sha256"
      },
      HttpError: {
        UNAUTHORIZED: 401
      },
      AdalIdParameters: {
        SKU: "x-client-SKU",
        VERSION: "x-client-Ver",
        OS: "x-client-OS",
        CPU: "x-client-CPU",
        NODE_SKU: "Node"
      },
      WSTrustVersion: {
        UNDEFINED: "undefined",
        WSTRUST13: "wstrust13",
        WSTRUST2005: "wstrust2005"
      }
    };
    module2.exports = Constants;
  }
});

// node_modules/adal-node/lib/argument.js
var require_argument = __commonJS({
  "node_modules/adal-node/lib/argument.js"(exports2, module2) {
    "use strict";
    var _ = require_underscore_node();
    var constants = require_constants();
    var UserCodeResponseFields = constants.UserCodeResponseFields;
    var argumentValidation = {
      validateStringParameter: function(param, name) {
        if (!param) {
          throw new Error("The " + name + " parameter is required.");
        }
        if (!_.isString(param)) {
          throw new Error("The " + name + " parameter must be of type String.");
        }
      },
      validateCallbackType: function(callback) {
        if (!callback || !_.isFunction(callback)) {
          throw new Error("acquireToken requires a function callback parameter.");
        }
      },
      validateUserCodeInfo: function(userCodeInfo) {
        if (!userCodeInfo) {
          throw new Error("The userCodeInfo parameter is required");
        }
        if (!userCodeInfo.hasOwnProperty(UserCodeResponseFields.DEVICE_CODE)) {
          throw new Error("The userCodeInfo is missing device_code");
        }
        if (!userCodeInfo.hasOwnProperty(UserCodeResponseFields.INTERVAL)) {
          throw new Error("The userCodeInfo is missing interval");
        }
        if (!userCodeInfo.hasOwnProperty(UserCodeResponseFields.EXPIRES_IN)) {
          throw new Error("The userCodeInfo is missing expires_in");
        }
      }
    };
    module2.exports = argumentValidation;
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports2, module2) {
    "use strict";
    module2.exports = function bind(fn2, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn2.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports2, module2) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn2) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn2.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn2.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module2.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn2) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn2(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports2, module2) {
    "use strict";
    module2.exports = function enhanceError(error2, config, code, request, response) {
      error2.config = config;
      if (code) {
        error2.code = code;
      }
      error2.request = request;
      error2.response = response;
      error2.isAxiosError = true;
      error2.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return error2;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports2, module2) {
    "use strict";
    var enhanceError = require_enhanceError();
    module2.exports = function createError(message, config, code, request, response) {
      var error2 = new Error(message);
      return enhanceError(error2, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports2, module2) {
    "use strict";
    var createError = require_createError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports2, module2) {
    "use strict";
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports2, module2) {
    "use strict";
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports2, module2) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(resolve, reject, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, config.transitional && config.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            request = null;
          });
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports2, module2) {
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require("debug")("follow-redirects");
        } catch (error2) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports2, module2) {
    var url = require("url");
    var URL = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "");
    var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
    var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
    var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self2 = this;
      this._onNativeResponse = function(response) {
        self2._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (typeof data === "function") {
        callback = data;
        data = encoding = null;
      } else if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self2 = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self2._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self2 = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
        }
        self2._timeout = setTimeout(function() {
          self2.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
          self2._timeout = null;
        }
        if (callback) {
          self2.removeListener("timeout", callback);
        }
        if (!self2.socket) {
          self2._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.once("response", clearTimer);
      this.once("error", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.substr(0, protocol.length - 1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      this._currentUrl = url.format(this._options);
      request._redirectable = this;
      for (var e = 0; e < events.length; e++) {
        request.on(events[e], eventHandlers[events[e]]);
      }
      if (this._isRedirect) {
        var i = 0;
        var self2 = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error2) {
          if (request === self2._currentRequest) {
            if (error2) {
              self2.emit("error", error2);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self2._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (location && this._options.followRedirects !== false && statusCode >= 300 && statusCode < 400) {
        abortRequest(this._currentRequest);
        response.destroy();
        if (++this._redirectCount > this._options.maxRedirects) {
          this.emit("error", new TooManyRedirectsError());
          return;
        }
        if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
          this._options.method = "GET";
          this._requestBodyBuffers = [];
          removeMatchingHeaders(/^content-/i, this._options.headers);
        }
        var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) || url.parse(this._currentUrl).hostname;
        var redirectUrl = url.resolve(this._currentUrl, location);
        debug("redirecting to", redirectUrl);
        this._isRedirect = true;
        var redirectUrlParts = url.parse(redirectUrl);
        Object.assign(this._options, redirectUrlParts);
        if (redirectUrlParts.hostname !== previousHostName) {
          removeMatchingHeaders(/^authorization$/i, this._options.headers);
        }
        if (typeof this._options.beforeRedirect === "function") {
          var responseDetails = { headers: response.headers };
          try {
            this._options.beforeRedirect.call(null, this._options, responseDetails);
          } catch (err) {
            this.emit("error", err);
            return;
          }
          this._sanitizeOptions(this._options);
        }
        try {
          this._performRequest();
        } catch (cause) {
          var error2 = new RedirectionError("Redirected request failed: " + cause.message);
          error2.cause = cause;
          this.emit("error", error2);
        }
      } else {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
      }
    };
    function wrap(protocols) {
      var exports3 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports3[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (typeof input === "string") {
            var urlStr = input;
            try {
              input = urlToOptions(new URL(urlStr));
            } catch (err) {
              input = url.parse(urlStr);
            }
          } else if (URL && input instanceof URL) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (typeof options === "function") {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports3.maxRedirects,
            maxBodyLength: exports3.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports3;
    }
    function noop() {
    }
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue;
    }
    function createErrorType(code, defaultMessage) {
      function CustomError(message) {
        Error.captureStackTrace(this, this.constructor);
        this.message = message || defaultMessage;
      }
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      CustomError.prototype.code = code;
      return CustomError;
    }
    function abortRequest(request) {
      for (var e = 0; e < events.length; e++) {
        request.removeListener(events[e], eventHandlers[events[e]]);
      }
      request.on("error", noop);
      request.abort();
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/package.json
var require_package = __commonJS({
  "node_modules/axios/package.json"(exports2, module2) {
    module2.exports = {
      _from: "axios@^0.21.1",
      _id: "axios@0.21.4",
      _inBundle: false,
      _integrity: "sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==",
      _location: "/axios",
      _phantomChildren: {},
      _requested: {
        type: "range",
        registry: true,
        raw: "axios@^0.21.1",
        name: "axios",
        escapedName: "axios",
        rawSpec: "^0.21.1",
        saveSpec: null,
        fetchSpec: "^0.21.1"
      },
      _requiredBy: [
        "/adal-node"
      ],
      _resolved: "https://registry.npmjs.org/axios/-/axios-0.21.4.tgz",
      _shasum: "c67b90dc0568e5c1cf2b0b858c43ba28e2eda575",
      _spec: "axios@^0.21.1",
      _where: "C:\\Users\\benedict.hawthorn\\Desktop\\test\\node_modules\\adal-node",
      author: {
        name: "Matt Zabriskie"
      },
      browser: {
        "./lib/adapters/http.js": "./lib/adapters/xhr.js"
      },
      bugs: {
        url: "https://github.com/axios/axios/issues"
      },
      bundleDependencies: false,
      bundlesize: [
        {
          path: "./dist/axios.min.js",
          threshold: "5kB"
        }
      ],
      dependencies: {
        "follow-redirects": "^1.14.0"
      },
      deprecated: false,
      description: "Promise based HTTP client for the browser and node.js",
      devDependencies: {
        coveralls: "^3.0.0",
        "es6-promise": "^4.2.4",
        grunt: "^1.3.0",
        "grunt-banner": "^0.6.0",
        "grunt-cli": "^1.2.0",
        "grunt-contrib-clean": "^1.1.0",
        "grunt-contrib-watch": "^1.0.0",
        "grunt-eslint": "^23.0.0",
        "grunt-karma": "^4.0.0",
        "grunt-mocha-test": "^0.13.3",
        "grunt-ts": "^6.0.0-beta.19",
        "grunt-webpack": "^4.0.2",
        "istanbul-instrumenter-loader": "^1.0.0",
        "jasmine-core": "^2.4.1",
        karma: "^6.3.2",
        "karma-chrome-launcher": "^3.1.0",
        "karma-firefox-launcher": "^2.1.0",
        "karma-jasmine": "^1.1.1",
        "karma-jasmine-ajax": "^0.1.13",
        "karma-safari-launcher": "^1.0.0",
        "karma-sauce-launcher": "^4.3.6",
        "karma-sinon": "^1.0.5",
        "karma-sourcemap-loader": "^0.3.8",
        "karma-webpack": "^4.0.2",
        "load-grunt-tasks": "^3.5.2",
        minimist: "^1.2.0",
        mocha: "^8.2.1",
        sinon: "^4.5.0",
        "terser-webpack-plugin": "^4.2.3",
        typescript: "^4.0.5",
        "url-search-params": "^0.10.0",
        webpack: "^4.44.2",
        "webpack-dev-server": "^3.11.0"
      },
      homepage: "https://axios-http.com",
      jsdelivr: "dist/axios.min.js",
      keywords: [
        "xhr",
        "http",
        "ajax",
        "promise",
        "node"
      ],
      license: "MIT",
      main: "index.js",
      name: "axios",
      repository: {
        type: "git",
        url: "git+https://github.com/axios/axios.git"
      },
      scripts: {
        build: "NODE_ENV=production grunt build",
        coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
        examples: "node ./examples/server.js",
        fix: "eslint --fix lib/**/*.js",
        postversion: "git push && git push --tags",
        preversion: "npm test",
        start: "node ./sandbox/server.js",
        test: "grunt test",
        version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"
      },
      typings: "./index.d.ts",
      unpkg: "dist/axios.min.js",
      version: "0.21.4"
    };
  }
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/axios/lib/adapters/http.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = require("http");
    var https = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = require("url");
    var zlib = require("zlib");
    var pkg = require_package();
    var createError = require_createError();
    var enhanceError = require_enhanceError();
    var isHttps = /https:?/;
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var resolve = function resolve2(value) {
          resolvePromise(value);
        };
        var reject = function reject2(value) {
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        if ("User-Agent" in headers || "user-agent" in headers) {
          if (!headers["User-Agent"] && !headers["user-agent"]) {
            delete headers["User-Agent"];
            delete headers["user-agent"];
          }
        } else {
          headers["User-Agent"] = "axios/" + pkg.version;
        }
        if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
          }
          headers["Content-Length"] = data.length;
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth) {
          delete headers.Authorization;
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        var options = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth
        };
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s) {
                return s.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                stream.destroy();
                reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
              }
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(enhanceError(err, config, null, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              var responseData = Buffer.concat(responseBuffer);
              if (config.responseType !== "arraybuffer") {
                responseData = responseData.toString(config.responseEncoding);
                if (!config.responseEncoding || config.responseEncoding === "utf8") {
                  responseData = utils.stripBOM(responseData);
                }
              }
              response.data = responseData;
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
            return;
          reject(enhanceError(err, config, null, req));
        });
        if (config.timeout) {
          var timeout = parseInt(config.timeout, 10);
          if (isNaN(timeout)) {
            reject(createError("error trying to parse `config.timeout` to int", config, "ERR_PARSE_TIMEOUT", req));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            reject(createError("timeout of " + timeout + "ms exceeded", config, config.transitional && config.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", req));
          });
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(cancel);
          });
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(enhanceError(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module2.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn2) {
        data = fn2.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports2, module2) {
    "use strict";
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ["url", "method", "data"];
      var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
      var defaultToConfig2Keys = [
        "baseURL",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "timeoutMessage",
        "withCredentials",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "onUploadProgress",
        "onDownloadProgress",
        "decompress",
        "maxContentLength",
        "maxBodyLength",
        "maxRedirects",
        "transport",
        "httpAgent",
        "httpsAgent",
        "cancelToken",
        "socketPath",
        "responseEncoding"
      ];
      var directMergeKeys = ["validateStatus"];
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      }
      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        }
      });
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils.forEach(otherKeys, mergeDeepProperties);
      return config;
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports2, module2) {
    "use strict";
    var pkg = require_package();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    var currentVerArr = pkg.version.split(".");
    function isOlderVersion(version, thanVersion) {
      var pkgVersionArr = thanVersion ? thanVersion.split(".") : currentVerArr;
      var destVer = version.split(".");
      for (var i = 0; i < 3; i++) {
        if (pkgVersionArr[i] > destVer[i]) {
          return true;
        } else if (pkgVersionArr[i] < destVer[i]) {
          return false;
        }
      }
      return false;
    }
    validators.transitional = function transitional(validator, version, message) {
      var isDeprecated = version && isOlderVersion(version);
      function formatMessage(opt, desc) {
        return "[Axios v" + pkg.version + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed in " + version));
        }
        if (isDeprecated && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module2.exports = {
      isOlderVersion,
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
          forcedJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
          clarifyTimeoutError: validators.transitional(validators.boolean, "1.0.0")
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error2) {
          onRejected(error2);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error2) {
        return Promise.reject(error2);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module2.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports2, module2) {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module2.exports = Cancel;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports2, module2) {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports2, module2) {
    "use strict";
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports2, module2) {
    "use strict";
    module2.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios.defaults, instanceConfig));
    };
    axios.Cancel = require_Cancel();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module2.exports = axios;
    module2.exports.default = axios;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports2, module2) {
    module2.exports = require_axios();
  }
});

// node_modules/adal-node/node_modules/uuid/lib/rng.js
var require_rng = __commonJS({
  "node_modules/adal-node/node_modules/uuid/lib/rng.js"(exports2, module2) {
    var crypto = require("crypto");
    module2.exports = function nodeRNG() {
      return crypto.randomBytes(16);
    };
  }
});

// node_modules/adal-node/node_modules/uuid/lib/bytesToUuid.js
var require_bytesToUuid = __commonJS({
  "node_modules/adal-node/node_modules/uuid/lib/bytesToUuid.js"(exports2, module2) {
    var byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 256).toString(16).substr(1);
    }
    var i;
    function bytesToUuid(buf, offset) {
      var i2 = offset || 0;
      var bth = byteToHex;
      return [
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]]
      ].join("");
    }
    module2.exports = bytesToUuid;
  }
});

// node_modules/adal-node/node_modules/uuid/v1.js
var require_v1 = __commonJS({
  "node_modules/adal-node/node_modules/uuid/v1.js"(exports2, module2) {
    var rng = require_rng();
    var bytesToUuid = require_bytesToUuid();
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];
      options = options || {};
      var node = options.node || _nodeId;
      var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        var seedBytes = rng();
        if (node == null) {
          node = _nodeId = [
            seedBytes[0] | 1,
            seedBytes[1],
            seedBytes[2],
            seedBytes[3],
            seedBytes[4],
            seedBytes[5]
          ];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      var msecs = options.msecs !== void 0 ? options.msecs : new Date().getTime();
      var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      var tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf ? buf : bytesToUuid(b);
    }
    module2.exports = v1;
  }
});

// node_modules/adal-node/node_modules/uuid/v4.js
var require_v4 = __commonJS({
  "node_modules/adal-node/node_modules/uuid/v4.js"(exports2, module2) {
    var rng = require_rng();
    var bytesToUuid = require_bytesToUuid();
    function v4(options, buf, offset) {
      var i = buf && offset || 0;
      if (typeof options == "string") {
        buf = options === "binary" ? new Array(16) : null;
        options = null;
      }
      options = options || {};
      var rnds = options.random || (options.rng || rng)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }
      return buf || bytesToUuid(rnds);
    }
    module2.exports = v4;
  }
});

// node_modules/adal-node/node_modules/uuid/index.js
var require_uuid = __commonJS({
  "node_modules/adal-node/node_modules/uuid/index.js"(exports2, module2) {
    var v1 = require_v1();
    var v4 = require_v4();
    var uuid = v4;
    uuid.v1 = v1;
    uuid.v4 = v4;
    module2.exports = uuid;
  }
});

// node_modules/adal-node/lib/log.js
var require_log = __commonJS({
  "node_modules/adal-node/lib/log.js"(exports2, module2) {
    "use strict";
    var _ = require_underscore_node();
    var uuid = require_uuid();
    var LEVEL_STRING_MAP = {
      0: "ERROR:",
      1: "WARNING:",
      2: "INFO:",
      3: "VERBOSE:"
    };
    var Logging = {
      LOGGING_LEVEL: {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        VERBOSE: 3
      },
      setLoggingOptions: function(options) {
        if (!options) {
          options = {};
        }
        if (options.log) {
          if (!_.isFunction(options.log)) {
            throw new Error("setLogOptions expects the log key in the options parameter to be a function");
          }
        } else {
          options.log = function() {
          };
        }
        if (options.level) {
          var level = options.level;
          if (level < 0 || level > 3) {
            throw new Error("setLogOptions expects the level key to be in the range 0 to 3 inclusive");
          }
        } else {
          options.level = this.LOGGING_LEVEL.ERROR;
        }
        if (options.loggingWithPII != true) {
          options.loggingWithPII = false;
        }
        this.LogOptions = options;
      },
      getLoggingOptions: function() {
        return this.LogOptions;
      },
      LogOptions: {
        log: function() {
        },
        level: 0,
        loggingWithPII: false
      }
    };
    function Logger(componentName, logContext) {
      if (!logContext) {
        throw new Error("Logger: logContext is a required parameter");
      }
      this._componentName = componentName;
      this._logContext = logContext;
    }
    Object.defineProperty(Logger.prototype, "context", {
      get: function() {
        return this._logContext;
      }
    });
    Logger.prototype.log = function(level, message, error2, containsPII) {
      if (containsPII == true && !Logging.LogOptions.loggingWithPII) {
        return;
      }
      if (level <= Logging.LogOptions.level) {
        if (_.isFunction(message)) {
          message = message();
        }
        var correlationId = this._logContext.correlationId || "<no correlation id>";
        var timeStamp = new Date().toUTCString();
        var formattedMessage = timeStamp + ":" + correlationId + " - " + this._componentName + ": " + LEVEL_STRING_MAP[level] + " " + message;
        if (error2) {
          formattedMessage += "\nStack:\n" + error2.stack;
        }
        Logging.LogOptions.log(level, formattedMessage, error2);
      }
    };
    Logger.prototype.error = function(message, error2, containsPII) {
      this.log(Logging.LOGGING_LEVEL.ERROR, message, error2, containsPII);
    };
    Logger.prototype.warn = function(message, containsPII) {
      this.log(Logging.LOGGING_LEVEL.WARN, message, null, containsPII);
    };
    Logger.prototype.info = function(message, containsPII) {
      this.log(Logging.LOGGING_LEVEL.INFO, message, null, containsPII);
    };
    Logger.prototype.verbose = function(message, containsPII) {
      this.log(Logging.LOGGING_LEVEL.VERBOSE, message, null, containsPII);
    };
    Logger.prototype.createError = function(message, containsPII) {
      var err = new Error(message);
      this.error(message, err, containsPII);
      return err;
    };
    module2.exports = exports2;
  }
});

// node_modules/adal-node/package.json
var require_package2 = __commonJS({
  "node_modules/adal-node/package.json"(exports2, module2) {
    module2.exports = {
      _from: "adal-node@^0.2.2",
      _id: "adal-node@0.2.3",
      _inBundle: false,
      _integrity: "sha512-gMKr8RuYEYvsj7jyfCv/4BfKToQThz20SP71N3AtFn3ia3yAR8Qt2T3aVQhuJzunWs2b38ZsQV0qsZPdwZr7VQ==",
      _location: "/adal-node",
      _phantomChildren: {},
      _requested: {
        type: "range",
        registry: true,
        raw: "adal-node@^0.2.2",
        name: "adal-node",
        escapedName: "adal-node",
        rawSpec: "^0.2.2",
        saveSpec: null,
        fetchSpec: "^0.2.2"
      },
      _requiredBy: [
        "/@azure/ms-rest-nodeauth"
      ],
      _resolved: "https://registry.npmjs.org/adal-node/-/adal-node-0.2.3.tgz",
      _shasum: "87ed3dbed344f6e114e36bf18fe1c4e7d3cc6069",
      _spec: "adal-node@^0.2.2",
      _where: "C:\\Users\\benedict.hawthorn\\Desktop\\test\\node_modules\\@azure\\ms-rest-nodeauth",
      author: {
        name: "Microsoft Open Technologies Inc",
        email: "msopentech@microsoft.com",
        url: "http://msopentech.com/"
      },
      bugs: {
        url: "https://github.com/AzureAD/microsoft-authentication-library-for-js/issues"
      },
      bundleDependencies: false,
      dependencies: {
        "@xmldom/xmldom": "^0.7.0",
        async: "^2.6.3",
        axios: "^0.21.1",
        "date-utils": "*",
        jws: "3.x.x",
        underscore: ">= 1.3.1",
        uuid: "^3.1.0",
        "xpath.js": "~1.1.0"
      },
      deprecated: false,
      description: "Windows Azure Active Directory Client Library for node",
      devDependencies: {
        "@types/mocha": "^2.2.44",
        "@types/nock": "^8.2.1",
        "@types/node": "^14.17.10",
        "@types/sinon": "^2.3.7",
        "@types/underscore": "^1.8.4",
        jshint: "^2.10.2",
        mocha: "*",
        nock: "^10.0.6",
        sinon: "^7.3.2",
        typescript: "^3.9.10"
      },
      engines: {
        node: ">= 0.6.15"
      },
      homepage: "https://github.com/AzureAD/microsoft-authentication-library-for-js#readme",
      keywords: [
        "node",
        "azure",
        "AAD",
        "adal",
        "adfs",
        "oauth"
      ],
      license: "Apache-2.0",
      main: "./lib/adal.js",
      name: "adal-node",
      repository: {
        type: "git",
        url: "git+https://github.com/AzureAD/microsoft-authentication-library-for-js.git"
      },
      scripts: {
        cover: "./test/util/cover",
        doc: "jsdoc lib",
        test: "npm run tsc && mocha -R spec --ui tdd test",
        tsc: "tsc -p tsconfig.json"
      },
      types: "./lib/adal.d.ts",
      version: "0.2.3"
    };
  }
});

// node_modules/adal-node/lib/util.js
var require_util = __commonJS({
  "node_modules/adal-node/lib/util.js"(exports2, module2) {
    "use strict";
    var _ = require_underscore_node();
    var adalIdConstants = require_constants().AdalIdParameters;
    var os = require("os");
    var url = require("url");
    var ADAL_VERSION;
    function loadAdalVersion() {
      ADAL_VERSION = require_package2().version;
    }
    function adalInit() {
      loadAdalVersion();
    }
    function isHttpSuccess(statusCode) {
      return statusCode >= 200 && statusCode < 300;
    }
    function addDefaultRequestHeaders(self2, options) {
      if (!options.headers) {
        options.headers = {};
      }
      var headers = options.headers;
      if (!headers["Accept-Charset"]) {
        headers["Accept-Charset"] = "utf-8";
      }
      headers["client-request-id"] = self2._callContext._logContext.correlationId;
      headers["return-client-request-id"] = "true";
      headers[adalIdConstants.SKU] = adalIdConstants.NODE_SKU;
      headers[adalIdConstants.VERSION] = ADAL_VERSION;
      headers[adalIdConstants.OS] = os.platform();
      headers[adalIdConstants.CPU] = os.arch();
    }
    function createRequestOptions(self2, options) {
      var defaultOptions = {};
      var mergedOptions = defaultOptions;
      if (options) {
        _.extend(mergedOptions, options);
      }
      if (self2._callContext.options && self2._callContext.options.http) {
        _.extend(mergedOptions, self2._callContext.options.http);
      }
      addDefaultRequestHeaders(self2, mergedOptions);
      return mergedOptions;
    }
    function logReturnCorrelationId(log, operationMessage, response) {
      if (response && response.headers && response.headers["client-request-id"]) {
        log.info(operationMessage + "Server returned this correlationId: " + response.headers["client-request-id"], true);
      }
    }
    function createRequestHandler(operationMessage, log, errorCallback, successCallback) {
      return function(err, response, body) {
        logReturnCorrelationId(log, operationMessage, response);
        if (err) {
          log.error(operationMessage + " request failed with", err, true);
          errorCallback(err);
          return;
        }
        if (!isHttpSuccess(response.statusCode)) {
          var returnErrorString = operationMessage + " request returned http error: " + response.statusCode;
          var errorResponse;
          if (body) {
            returnErrorString += " and server response: " + body;
            try {
              errorResponse = JSON.parse(body);
            } catch (e) {
            }
          }
          errorCallback(log.createError(returnErrorString, true), errorResponse);
          return;
        }
        successCallback(response, body);
      };
    }
    function copyUrl(urlSource) {
      return url.parse(url.format(urlSource));
    }
    function convertUrlSafeToRegularBase64EncodedString(str) {
      return str.replace(/-/g, "+").replace(/_/g, "/");
    }
    function convertRegularToUrlSafeBase64EncodedString(str) {
      return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
    function base64DecodeStringUrlSafe(str) {
      var base64 = convertUrlSafeToRegularBase64EncodedString(str);
      return new Buffer(base64, "base64").toString("utf8");
    }
    function base64EncodeStringUrlSafe(str) {
      var base64 = new Buffer(str, "utf8").toString("base64");
      var converted = convertRegularToUrlSafeBase64EncodedString(base64);
      return converted;
    }
    module2.exports.adalInit = adalInit;
    module2.exports.isHttpSuccess = isHttpSuccess;
    module2.exports.logReturnCorrelationId = logReturnCorrelationId;
    module2.exports.createRequestHandler = createRequestHandler;
    module2.exports.createRequestOptions = createRequestOptions;
    module2.exports.copyUrl = copyUrl;
    module2.exports.base64DecodeStringUrlSafe = base64DecodeStringUrlSafe;
    module2.exports.base64EncodeStringUrlSafe = base64EncodeStringUrlSafe;
    module2.exports.convertRegularToUrlSafeBase64EncodedString = convertRegularToUrlSafeBase64EncodedString;
  }
});

// node_modules/adal-node/lib/authority.js
var require_authority = __commonJS({
  "node_modules/adal-node/lib/authority.js"(exports2, module2) {
    "use strict";
    var axios = require_axios2();
    var url = require("url");
    var _ = require_underscore_node();
    var AADConstants = require_constants().AADConstants;
    var Logger = require_log().Logger;
    var util = require_util();
    function Authority(authorityUrl, validateAuthority) {
      this._log = null;
      this._url = url.parse(authorityUrl);
      this._validateAuthorityUrl();
      this._validated = !validateAuthority;
      this._host = null;
      this._tenant = null;
      this._parseAuthority();
      this._authorizationEndpoint = null;
      this._tokenEndpoint = null;
      this._deviceCodeEndpoint = null;
      this._isAdfsAuthority = this._tenant.toLowerCase() === "adfs";
    }
    Object.defineProperty(Authority.prototype, "url", {
      get: function() {
        return url.format(this._url);
      }
    });
    Object.defineProperty(Authority.prototype, "tokenEndpoint", {
      get: function() {
        return this._tokenEndpoint;
      }
    });
    Object.defineProperty(Authority.prototype, "deviceCodeEndpoint", {
      get: function() {
        return this._deviceCodeEndpoint;
      }
    });
    Authority.prototype._validateAuthorityUrl = function() {
      if (this._url.protocol !== "https:") {
        throw new Error("The authority url must be an https endpoint.");
      }
      if (this._url.query) {
        throw new Error("The authority url must not have a query string.");
      }
    };
    Authority.prototype._parseAuthority = function() {
      this._host = this._url.host;
      var pathParts = this._url.pathname.split("/");
      this._tenant = pathParts[1];
      if (!this._tenant) {
        throw new Error("Could not determine tenant.");
      }
    };
    Authority.prototype._performStaticInstanceDiscovery = function() {
      this._log.verbose("Performing static instance discovery");
      var hostIndex = _.indexOf(AADConstants.WELL_KNOWN_AUTHORITY_HOSTS, this._url.hostname);
      var found = hostIndex > -1;
      if (found) {
        this._log.verbose("Authority validated via static instance discovery.");
      }
      return found;
    };
    Authority.prototype._createAuthorityUrl = function() {
      return "https://" + this._url.host + "/" + encodeURIComponent(this._tenant) + AADConstants.AUTHORIZE_ENDPOINT_PATH;
    };
    Authority.prototype._createInstanceDiscoveryEndpointFromTemplate = function(authorityHost) {
      var discoveryEndpoint = AADConstants.INSTANCE_DISCOVERY_ENDPOINT_TEMPLATE;
      discoveryEndpoint = discoveryEndpoint.replace("{authorize_host}", authorityHost);
      discoveryEndpoint = discoveryEndpoint.replace("{authorize_endpoint}", encodeURIComponent(this._createAuthorityUrl()));
      return url.parse(discoveryEndpoint);
    };
    Authority.prototype._performDynamicInstanceDiscovery = function(callback) {
      try {
        var self2 = this;
        var discoveryEndpoint = this._createInstanceDiscoveryEndpointFromTemplate(AADConstants.WORLD_WIDE_AUTHORITY);
        var getOptions = util.createRequestOptions(self2);
        this._log.verbose("Attempting instance discover");
        this._log.verbose("Attempting instance discover at: " + url.format(discoveryEndpoint), true);
        axios.get(discoveryEndpoint, getOptions).then((response) => {
          util.logReturnCorrelationId(this._log, "Instance Discovery", response);
          if (!util.isHttpSuccess(response.status)) {
            var returnErrorString = "Instance Discovery request returned http error: " + response.status + " and server response: " + JSON.stringify(error.response.data);
            callback(this._log.createError(returnErrorString, true), response.data);
          }
          var discoveryResponse = response.data;
          if (discoveryResponse["tenant_discovery_endpoint"]) {
            callback(null, discoveryResponse["tenant_discovery_endpoint"]);
          } else {
            callback(self2._log.createError("Failed to parse instance discovery response"));
          }
        }).catch((error2) => {
          if (error2.response) {
            util.logReturnCorrelationId(this._log, "Instance Discovery", error2.response);
            this._log.error("Instance Discovery request failed with", error2.response.status, true);
            var returnErrorString = "Instance Discovery request returned http error: " + error2.response.status + " and server response: " + JSON.stringify(error2.response.data);
            callback(self2._log.createError(returnErrorString, true), error2.response.data);
          } else if (error2.request) {
            this._log.error("Instance Discovery request was made but no response was received", error2.request, true);
            callback(self2._log.createError("No response from the server"));
          } else {
            this._log.error("Instance Discovery request was never made, please check", error2.message, true);
            callback(error2.message);
          }
        });
      } catch (e) {
        callback(e);
      }
    };
    Authority.prototype._validateViaInstanceDiscovery = function(callback) {
      if (this._performStaticInstanceDiscovery()) {
        callback();
      } else {
        this._performDynamicInstanceDiscovery(callback);
      }
    };
    Authority.prototype._getOAuthEndpoints = function(tenantDiscoveryEndpoint, callback) {
      if (this._tokenEndpoint && this._deviceCodeEndpoint) {
        callback();
        return;
      } else {
        if (!this._tokenEndpoint) {
          this._tokenEndpoint = url.format("https://" + this._url.host + "/" + encodeURIComponent(this._tenant)) + AADConstants.TOKEN_ENDPOINT_PATH;
        }
        if (!this._deviceCodeEndpoint) {
          this._deviceCodeEndpoint = url.format("https://" + this._url.host + "/" + encodeURIComponent(this._tenant)) + AADConstants.DEVICE_ENDPOINT_PATH;
        }
        callback();
        return;
      }
    };
    Authority.prototype.validate = function(callContext, callback) {
      this._log = new Logger("Authority", callContext._logContext);
      this._callContext = callContext;
      var self2 = this;
      if (!this._validated) {
        this._log.verbose("Performing instance discovery");
        this._log.verbose("Performing instance discovery: " + url.format(this._url), true);
        this._validateViaInstanceDiscovery(function(err, tenantDiscoveryEndpoint) {
          if (err) {
            callback(err);
          } else {
            self2._validated = true;
            self2._getOAuthEndpoints(tenantDiscoveryEndpoint, callback);
            return;
          }
        });
      } else {
        this._log.verbose("Instance discovery/validation has either already been completed or is turned off");
        this._log.verbose("Instance discovery/validation has either already been completed or is turned off: " + url.format(this._url), true);
        this._getOAuthEndpoints(null, callback);
        return;
      }
    };
    module2.exports.Authority = Authority;
  }
});

// node_modules/date-utils/lib/date-utils.js
var require_date_utils = __commonJS({
  "node_modules/date-utils/lib/date-utils.js"(exports2, module2) {
    (function() {
      var monthsAbbr = [], monthsFull = [], daysAbbr = [], daysFull = [], dayNames = {}, monthsAll, daysAll = [], monthNames = [];
      monthsAbbr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      monthsFull = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      daysAbbr = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ];
      daysFull = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      dayNames = {
        "su": 0,
        "sun": 0,
        "sunday": 0,
        "mo": 1,
        "mon": 1,
        "monday": 1,
        "tu": 2,
        "tue": 2,
        "tuesday": 2,
        "we": 3,
        "wed": 3,
        "wednesday": 3,
        "th": 4,
        "thu": 4,
        "thursday": 4,
        "fr": 5,
        "fri": 5,
        "friday": 5,
        "sa": 6,
        "sat": 6,
        "saturday": 6
      };
      monthsAll = monthsFull.concat(monthsAbbr);
      daysAll = [
        "su",
        "sun",
        "sunday",
        "mo",
        "mon",
        "monday",
        "tu",
        "tue",
        "tuesday",
        "we",
        "wed",
        "wednesday",
        "th",
        "thu",
        "thursday",
        "fr",
        "fri",
        "friday",
        "sa",
        "sat",
        "saturday"
      ];
      monthNames = {
        "jan": 0,
        "january": 0,
        "feb": 1,
        "february": 1,
        "mar": 2,
        "march": 2,
        "apr": 3,
        "april": 3,
        "may": 4,
        "jun": 5,
        "june": 5,
        "jul": 6,
        "july": 6,
        "aug": 7,
        "august": 7,
        "sep": 8,
        "september": 8,
        "oct": 9,
        "october": 9,
        "nov": 10,
        "november": 10,
        "dec": 11,
        "december": 11
      };
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function pad(str, length) {
        str = String(str);
        while (str.length < length) {
          str = "0" + str;
        }
        return str;
      }
      var isInteger = function(str) {
        if (str.match(/^(\d+)$/)) {
          return true;
        }
        return false;
      };
      var getInt = function(str, i, minlength, maxlength) {
        for (var x = maxlength; x >= minlength; x--) {
          var token = str.substring(i, i + x);
          if (token.length < minlength) {
            return null;
          }
          if (isInteger(token)) {
            return token;
          }
        }
        return null;
      };
      var origParse = Date.parse;
      var getDateFromFormat = function(val, format) {
        val = val + "";
        format = format + "";
        var iVal = 0;
        var iFormat = 0;
        var c = "";
        var token = "";
        var token2 = "";
        var x, y;
        var now = new Date();
        var year = now.getYear();
        var month = now.getMonth() + 1;
        var date = 1;
        var hh = 0;
        var mm = 0;
        var ss = 0;
        var ampm = "";
        while (iFormat < format.length) {
          c = format.charAt(iFormat);
          token = "";
          while (format.charAt(iFormat) === c && iFormat < format.length) {
            token += format.charAt(iFormat++);
          }
          if (token === "yyyy" || token === "yy" || token === "y") {
            if (token === "yyyy") {
              x = 4;
              y = 4;
            }
            if (token === "yy") {
              x = 2;
              y = 2;
            }
            if (token === "y") {
              x = 2;
              y = 4;
            }
            year = getInt(val, iVal, x, y);
            if (year === null) {
              return NaN;
            }
            iVal += year.length;
            if (year.length === 2) {
              if (year > 70) {
                year = 1900 + (year - 0);
              } else {
                year = 2e3 + (year - 0);
              }
            }
          } else if (token === "MMM" || token === "NNN") {
            month = 0;
            for (var i = 0; i < monthsAll.length; i++) {
              var monthName = monthsAll[i];
              if (val.substring(iVal, iVal + monthName.length).toLowerCase() === monthName.toLowerCase()) {
                if (token === "MMM" || token === "NNN" && i > 11) {
                  month = i + 1;
                  if (month > 12) {
                    month -= 12;
                  }
                  iVal += monthName.length;
                  break;
                }
              }
            }
            if (month < 1 || month > 12) {
              return NaN;
            }
          } else if (token === "EE" || token === "E") {
            for (var n = 0; n < daysAll.length; n++) {
              var dayName = daysAll[n];
              if (val.substring(iVal, iVal + dayName.length).toLowerCase() === dayName.toLowerCase()) {
                iVal += dayName.length;
                break;
              }
            }
          } else if (token === "MM" || token === "M") {
            month = getInt(val, iVal, token.length, 2);
            if (month === null || month < 1 || month > 12) {
              return NaN;
            }
            iVal += month.length;
          } else if (token === "dd" || token === "d") {
            date = getInt(val, iVal, token.length, 2);
            if (date === null || date < 1 || date > 31) {
              return NaN;
            }
            iVal += date.length;
          } else if (token === "hh" || token === "h") {
            hh = getInt(val, iVal, token.length, 2);
            if (hh === null || hh < 1 || hh > 12) {
              return NaN;
            }
            iVal += hh.length;
          } else if (token === "HH" || token === "H") {
            hh = getInt(val, iVal, token.length, 2);
            if (hh === null || hh < 0 || hh > 23) {
              return NaN;
            }
            iVal += hh.length;
          } else if (token === "KK" || token === "K") {
            hh = getInt(val, iVal, token.length, 2);
            if (hh === null || hh < 0 || hh > 11) {
              return NaN;
            }
            iVal += hh.length;
          } else if (token === "kk" || token === "k") {
            hh = getInt(val, iVal, token.length, 2);
            if (hh === null || hh < 1 || hh > 24) {
              return NaN;
            }
            iVal += hh.length;
            hh--;
          } else if (token === "mm" || token === "m") {
            mm = getInt(val, iVal, token.length, 2);
            if (mm === null || mm < 0 || mm > 59) {
              return NaN;
            }
            iVal += mm.length;
          } else if (token === "ss" || token === "s") {
            ss = getInt(val, iVal, token.length, 2);
            if (ss === null || ss < 0 || ss > 59) {
              return NaN;
            }
            iVal += ss.length;
          } else if (token === "a") {
            if (val.substring(iVal, iVal + 2).toLowerCase() === "am") {
              ampm = "AM";
            } else if (val.substring(iVal, iVal + 2).toLowerCase() === "pm") {
              ampm = "PM";
            } else {
              return NaN;
            }
            iVal += 2;
          } else {
            if (val.substring(iVal, iVal + token.length) !== token) {
              return NaN;
            } else {
              iVal += token.length;
            }
          }
        }
        if (iVal !== val.length) {
          return NaN;
        }
        if (month === 2) {
          if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            if (date > 29) {
              return NaN;
            }
          } else {
            if (date > 28) {
              return NaN;
            }
          }
        }
        if (month === 4 || month === 6 || month === 9 || month === 11) {
          if (date > 30) {
            return NaN;
          }
        }
        if (hh < 12 && ampm === "PM") {
          hh = hh - 0 + 12;
        } else if (hh > 11 && ampm === "AM") {
          hh -= 12;
        }
        var newdate = new Date(year, month - 1, date, hh, mm, ss);
        return newdate.getTime();
      };
      Date.parse = function(date, format) {
        if (format) {
          return getDateFromFormat(date, format);
        }
        var timestamp = origParse(date), minutesOffset = 0, match;
        if (isNaN(timestamp) && (match = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(date))) {
          if (match[8] !== "Z") {
            minutesOffset = +match[10] * 60 + +match[11];
            if (match[9] === "+") {
              minutesOffset = 0 - minutesOffset;
            }
          }
          match[7] = match[7] || "000";
          timestamp = Date.UTC(+match[1], +match[2] - 1, +match[3], +match[4], +match[5] + minutesOffset, +match[6], +match[7].substr(0, 3));
        }
        return timestamp;
      };
      function polyfill(name, func) {
        if (Date.prototype[name] === void 0) {
          Date.prototype[name] = func;
        }
      }
      Date.today = function() {
        return new Date().clearTime();
      };
      Date.UTCtoday = function() {
        return new Date().clearUTCTime();
      };
      Date.tomorrow = function() {
        return Date.today().add({ days: 1 });
      };
      Date.UTCtomorrow = function() {
        return Date.UTCtoday().add({ days: 1 });
      };
      Date.yesterday = function() {
        return Date.today().add({ days: -1 });
      };
      Date.UTCyesterday = function() {
        return Date.UTCtoday().add({ days: -1 });
      };
      Date.validateDay = function(day, year, month) {
        var date = new Date(year, month, day);
        return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
      };
      Date.validateYear = function(year) {
        return year >= 0 && year <= 9999;
      };
      Date.validateSecond = function(second) {
        return second >= 0 && second < 60;
      };
      Date.validateMonth = function(month) {
        return month >= 0 && month < 12;
      };
      Date.validateMinute = function(minute) {
        return minute >= 0 && minute < 60;
      };
      Date.validateMillisecond = function(milli) {
        return milli >= 0 && milli < 1e3;
      };
      Date.validateHour = function(hour) {
        return hour >= 0 && hour < 24;
      };
      Date.compare = function(date1, date2) {
        if (date1.valueOf() < date2.valueOf()) {
          return -1;
        } else if (date1.valueOf() > date2.valueOf()) {
          return 1;
        }
        return 0;
      };
      Date.equals = function(date1, date2) {
        return date1.valueOf() === date2.valueOf();
      };
      Date.equalsDay = function(date1, date2) {
        return date1.toYMD() === date2.toYMD();
      };
      Date.getDayNumberFromName = function(name) {
        return dayNames[name.toLowerCase()];
      };
      Date.getMonthNumberFromName = function(name) {
        return monthNames[name.toLowerCase()];
      };
      Date.getMonthNameFromNumber = function(number) {
        return monthsFull[number];
      };
      Date.getMonthAbbrFromNumber = function(number) {
        return monthsAbbr[number];
      };
      Date.isLeapYear = function(year) {
        return new Date(year, 1, 29).getDate() === 29;
      };
      Date.getDaysInMonth = function(year, month) {
        if (month === 1) {
          return Date.isLeapYear(year) ? 29 : 28;
        }
        return daysInMonth[month];
      };
      polyfill("getMonthAbbr", function() {
        return monthsAbbr[this.getMonth()];
      });
      polyfill("getMonthName", function() {
        return monthsFull[this.getMonth()];
      });
      polyfill("getLastMonthName", function() {
        var i = this.getMonth();
        i = i === 0 ? 11 : i - 1;
        return monthsFull[i];
      });
      polyfill("getUTCOffset", function() {
        var tz = pad(Math.abs(this.getTimezoneOffset() / 0.6), 4);
        if (this.getTimezoneOffset() > 0) {
          tz = "-" + tz;
        }
        return tz;
      });
      polyfill("toCLFString", function() {
        return pad(this.getDate(), 2) + "/" + this.getMonthAbbr() + "/" + this.getFullYear() + ":" + pad(this.getHours(), 2) + ":" + pad(this.getMinutes(), 2) + ":" + pad(this.getSeconds(), 2) + " " + this.getUTCOffset();
      });
      polyfill("toYMD", function(separator) {
        separator = typeof separator === "undefined" ? "-" : separator;
        return this.getFullYear() + separator + pad(this.getMonth() + 1, 2) + separator + pad(this.getDate(), 2);
      });
      polyfill("toDBString", function() {
        return this.getUTCFullYear() + "-" + pad(this.getUTCMonth() + 1, 2) + "-" + pad(this.getUTCDate(), 2) + " " + pad(this.getUTCHours(), 2) + ":" + pad(this.getUTCMinutes(), 2) + ":" + pad(this.getUTCSeconds(), 2);
      });
      polyfill("clearTime", function() {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
      });
      polyfill("clearUTCTime", function() {
        this.setUTCHours(0);
        this.setUTCMinutes(0);
        this.setUTCSeconds(0);
        this.setUTCMilliseconds(0);
        return this;
      });
      polyfill("add", function(obj) {
        if (obj.milliseconds !== void 0) {
          this.setMilliseconds(this.getMilliseconds() + obj.milliseconds);
        }
        if (obj.seconds !== void 0) {
          this.setSeconds(this.getSeconds() + obj.seconds);
        }
        if (obj.minutes !== void 0) {
          this.setMinutes(this.getMinutes() + obj.minutes);
        }
        if (obj.hours !== void 0) {
          this.setHours(this.getHours() + obj.hours);
        }
        if (obj.days !== void 0) {
          this.setDate(this.getDate() + obj.days);
        }
        if (obj.weeks !== void 0) {
          this.setDate(this.getDate() + obj.weeks * 7);
        }
        if (obj.months !== void 0) {
          this.setMonth(this.getMonth() + obj.months);
        }
        if (obj.years !== void 0) {
          this.setFullYear(this.getFullYear() + obj.years);
        }
        return this;
      });
      polyfill("addMilliseconds", function(milliseconds) {
        return this.add({ milliseconds });
      });
      polyfill("addSeconds", function(seconds) {
        return this.add({ seconds });
      });
      polyfill("addMinutes", function(minutes) {
        return this.add({ minutes });
      });
      polyfill("addHours", function(hours) {
        return this.add({ hours });
      });
      polyfill("addDays", function(days) {
        return this.add({ days });
      });
      polyfill("addWeeks", function(weeks) {
        return this.add({ days: weeks * 7 });
      });
      polyfill("addMonths", function(months) {
        return this.add({ months });
      });
      polyfill("addYears", function(years) {
        return this.add({ years });
      });
      polyfill("remove", function(obj) {
        if (obj.seconds !== void 0) {
          this.setSeconds(this.getSeconds() - obj.seconds);
        }
        if (obj.minutes !== void 0) {
          this.setMinutes(this.getMinutes() - obj.minutes);
        }
        if (obj.hours !== void 0) {
          this.setHours(this.getHours() - obj.hours);
        }
        if (obj.days !== void 0) {
          this.setDate(this.getDate() - obj.days);
        }
        if (obj.weeks !== void 0) {
          this.setDate(this.getDate() - obj.weeks * 7);
        }
        if (obj.months !== void 0) {
          this.setMonth(this.getMonth() - obj.months);
        }
        if (obj.years !== void 0) {
          this.setFullYear(this.getFullYear() - obj.years);
        }
        return this;
      });
      polyfill("removeMilliseconds", function(milliseconds) {
        throw new Error("Not implemented");
      });
      polyfill("removeSeconds", function(seconds) {
        return this.remove({ seconds });
      });
      polyfill("removeMinutes", function(minutes) {
        return this.remove({ minutes });
      });
      polyfill("removeHours", function(hours) {
        return this.remove({ hours });
      });
      polyfill("removeDays", function(days) {
        return this.remove({ days });
      });
      polyfill("removeWeeks", function(weeks) {
        return this.remove({ days: weeks * 7 });
      });
      polyfill("removeMonths", function(months) {
        return this.remove({ months });
      });
      polyfill("removeYears", function(years) {
        return this.remove({ years });
      });
      polyfill("addWeekdays", function(weekdays) {
        var day = this.getDay();
        if (day === 0) {
          day = 7;
        }
        var daysOffset = weekdays;
        var weekspan = Math.floor((weekdays + day - 1) / 5);
        if (weekdays > 0) {
          daysOffset += weekspan * 2;
          if (day > 5) {
            daysOffset -= day - 5;
          }
        } else {
          daysOffset += Math.min(weekspan * 2, 0);
          if (day > 6) {
            daysOffset -= 1;
          }
        }
        return this.addDays(daysOffset);
      });
      polyfill("setTimeToNow", function() {
        var n = new Date();
        this.setMilliseconds(n.getMilliseconds());
        this.setSeconds(n.getSeconds());
        this.setMinutes(n.getMinutes());
        this.setHours(n.getHours());
      });
      polyfill("clone", function() {
        return new Date(this.valueOf());
      });
      polyfill("between", function(start, end) {
        return this.valueOf() >= start.valueOf() && this.valueOf() <= end.valueOf();
      });
      polyfill("compareTo", function(date) {
        return Date.compare(this, date);
      });
      polyfill("equals", function(date) {
        return Date.equals(this, date);
      });
      polyfill("equalsDay", function(date) {
        return Date.equalsDay(this, date);
      });
      polyfill("isToday", function() {
        return Date.equalsDay(this, Date.today());
      });
      polyfill("isAfter", function(date) {
        date = date ? date : new Date();
        return this.compareTo(date) > 0;
      });
      polyfill("isBefore", function(date) {
        date = date ? date : new Date();
        return this.compareTo(date) < 0;
      });
      polyfill("isWeekend", function(date) {
        return this.getDay() % 6 === 0;
      });
      polyfill("getDaysBetween", function(date) {
        return (date.clone().valueOf() - this.valueOf()) / 864e5 | 0;
      });
      polyfill("getHoursBetween", function(date) {
        return (date.clone().valueOf() - this.valueOf()) / 36e5 | 0;
      });
      polyfill("getMinutesBetween", function(date) {
        return (date.clone().valueOf() - this.valueOf()) / 6e4 | 0;
      });
      polyfill("getSecondsBetween", function(date) {
        return (date.clone().valueOf() - this.valueOf()) / 1e3 | 0;
      });
      polyfill("getMillisecondsBetween", function(date) {
        return date.clone().valueOf() - this.valueOf() | 0;
      });
      polyfill("getMonthsBetween", function(date) {
        var daysDiff = Math.abs(+this / (86400 * 1e3) - +date / (86400 * 1e3));
        var start = new Date(+date < +this ? +date : +this);
        var end = new Date(date > +this ? +date : +this);
        var months = 0;
        while (+start < +end) {
          months++;
          start = start.addMonths(1);
        }
        var days = Math.abs(+start / (86400 * 1e3) - +end / (86400 * 1e3));
        return months - days / 31;
      });
      polyfill("getOrdinalNumber", function() {
        return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 864e5) + 1;
      });
      polyfill("toFormat", function(format) {
        return toFormat(format, getReplaceMap(this));
      });
      polyfill("toUTCFormat", function(format) {
        return toFormat(format, getUTCReplaceMap(this));
      });
      polyfill("getWeekNumber", function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil(((this - onejan) / 864e5 + onejan.getDay() + 1) / 7);
      });
      polyfill("getFullWeekNumber", function() {
        var weekNumber = "" + this.getWeekNumber();
        if (weekNumber.length === 1) {
          weekNumber = "0" + weekNumber;
        }
        return weekNumber;
      });
      var toFormat = function(format, replaceMap) {
        var f = [format], i, l, s;
        var replace = function(str, rep) {
          var i2 = 0, l2 = f.length, j, ll, t, n = [];
          for (; i2 < l2; i2++) {
            if (typeof f[i2] == "string") {
              t = f[i2].split(str);
              for (j = 0, ll = t.length - 1; j < ll; j++) {
                n.push(t[j]);
                n.push([rep]);
              }
              n.push(t[ll]);
            } else {
              n.push(f[i2]);
            }
          }
          f = n;
        };
        for (i in replaceMap) {
          replace(i, replaceMap[i]);
        }
        s = "";
        for (i = 0, l = f.length; i < l; i++)
          s += typeof f[i] == "string" ? f[i] : f[i][0];
        return f.join("");
      };
      var getReplaceMap = function(date) {
        var hours = date.getHours() % 12 ? date.getHours() % 12 : 12;
        return {
          "YYYY": date.getFullYear(),
          "YY": String(date.getFullYear()).slice(-2),
          "MMMM": monthsFull[date.getMonth()],
          "MMM": monthsAbbr[date.getMonth()],
          "MM": pad(date.getMonth() + 1, 2),
          "MI": pad(date.getMinutes(), 2),
          "M": date.getMonth() + 1,
          "DDDD": daysFull[date.getDay()],
          "DDD": daysAbbr[date.getDay()],
          "DD": pad(date.getDate(), 2),
          "D": date.getDate(),
          "HH24": pad(date.getHours(), 2),
          "HH": pad(hours, 2),
          "H": hours,
          "SS": pad(date.getSeconds(), 2),
          "PP": date.getHours() >= 12 ? "PM" : "AM",
          "P": date.getHours() >= 12 ? "pm" : "am",
          "LL": pad(date.getMilliseconds(), 3)
        };
      };
      var getUTCReplaceMap = function(date) {
        var hours = date.getUTCHours() % 12 ? date.getUTCHours() % 12 : 12;
        return {
          "YYYY": date.getUTCFullYear(),
          "YY": String(date.getUTCFullYear()).slice(-2),
          "MMMM": monthsFull[date.getUTCMonth()],
          "MMM": monthsAbbr[date.getUTCMonth()],
          "MM": pad(date.getUTCMonth() + 1, 2),
          "MI": pad(date.getUTCMinutes(), 2),
          "M": date.getUTCMonth() + 1,
          "DDDD": daysFull[date.getUTCDay()],
          "DDD": daysAbbr[date.getUTCDay()],
          "DD": pad(date.getUTCDate(), 2),
          "D": date.getUTCDate(),
          "HH24": pad(date.getUTCHours(), 2),
          "HH": pad(hours, 2),
          "H": hours,
          "SS": pad(date.getUTCSeconds(), 2),
          "PP": date.getUTCHours() >= 12 ? "PM" : "AM",
          "P": date.getUTCHours() >= 12 ? "pm" : "am",
          "LL": pad(date.getUTCMilliseconds(), 3)
        };
      };
      var language = function(lang) {
        if (lang == "es") {
          monthsAbbr = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic"
          ];
          monthsFull = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
          ];
          daysAbbr = [
            "Dom",
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab"
          ];
          daysFull = [
            "Domingo",
            "Lunes",
            "Martes",
            "Mi\xE9rcoles",
            "Jueves",
            "Viernes",
            "S\xE1bado"
          ];
          dayNames = {
            "do": 0,
            "dom": 0,
            "domingo": 0,
            "lu": 1,
            "lun": 1,
            "lunes": 1,
            "ma": 2,
            "mar": 2,
            "martes": 2,
            "mi": 3,
            "mie": 3,
            "miercoles": 3,
            "ju": 4,
            "jue": 4,
            "jueves": 4,
            "vi": 5,
            "vie": 5,
            "viernes": 5,
            "sa": 6,
            "sab": 6,
            "sabado": 6
          };
          monthsAll = monthsFull.concat(monthsAbbr);
          daysAll = [
            "do",
            "dom",
            "domingo",
            "lu",
            "lun",
            "lunes",
            "ma",
            "mar",
            "martes",
            "mi",
            "mie",
            "mi\xE9rcoles",
            "ju",
            "jue",
            "jueves",
            "vi",
            "vie",
            "viernes",
            "sa",
            "sab",
            "s\xE1bado"
          ];
          monthNames = {
            "ene": 0,
            "enero": 0,
            "feb": 1,
            "febrero": 1,
            "mar": 2,
            "marzo": 2,
            "abr": 3,
            "abril": 3,
            "may": 4,
            "mayo": 4,
            "jun": 5,
            "junio": 5,
            "jul": 6,
            "julio": 6,
            "ago": 7,
            "agosto": 7,
            "sep": 8,
            "septiembre": 8,
            "oct": 9,
            "octubre": 9,
            "nov": 10,
            "noviembre": 10,
            "dic": 11,
            "diciembre": 11
          };
        } else if (lang == "fr") {
          monthsAbbr = [
            "Jan",
            "F\xE9v",
            "Mar",
            "Avr",
            "Mai",
            "Jui",
            "Jul",
            "Ao\xFB",
            "Sep",
            "Oct",
            "Nov",
            "D\xE9c"
          ];
          monthsFull = [
            "Janvier",
            "F\xE9vrier",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Ao\xFBt",
            "Septembre",
            "Octobre",
            "Novembre",
            "D\xE9cembre"
          ];
          daysAbbr = [
            "Dim",
            "Lun",
            "Mar",
            "Mer",
            "Jeu",
            "Ven",
            "Sam"
          ];
          daysFull = [
            "Dimanchi",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi"
          ];
          dayNames = {
            "di": 0,
            "dim": 0,
            "dimanchi": 0,
            "lu": 1,
            "lun": 1,
            "lundi": 1,
            "ma": 2,
            "mar": 2,
            "mardi": 2,
            "me": 3,
            "mer": 3,
            "mercredi": 3,
            "je": 4,
            "jeu": 4,
            "jeudi": 4,
            "ve": 5,
            "ven": 5,
            "vendredi": 5,
            "sa": 6,
            "sam": 6,
            "samedi": 6
          };
          monthsAll = monthsFull.concat(monthsAbbr);
          daysAll = [
            "di",
            "dim",
            "dimanchi",
            "lu",
            "lun",
            "lundi",
            "ma",
            "mar",
            "mardi",
            "me",
            "mer",
            "mercredi",
            "je",
            "jeu",
            "jeudi",
            "ve",
            "ven",
            "vendredi",
            "sa",
            "sam",
            "samedi"
          ];
          monthNames = {
            "jan": 0,
            "janvier": 0,
            "f\xE9v": 1,
            "f\xE9vrier": 1,
            "mar": 2,
            "mars": 2,
            "avr": 3,
            "avril": 3,
            "mai": 4,
            "jui": 5,
            "juin": 5,
            "jul": 6,
            "juillet": 6,
            "ao\xFB": 7,
            "ao\xFBt": 7,
            "sep": 8,
            "septembre": 8,
            "oct": 9,
            "octobre": 9,
            "nov": 10,
            "novembre": 10,
            "d\xE9c": 11,
            "d\xE9cembre": 11
          };
        } else if (lang == "pt-BR") {
          monthsAbbr = [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
          ];
          monthsFull = [
            "Janeiro",
            "Fevereiro",
            "Mar\xE7o",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
          ];
          daysAbbr = [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sab"
          ];
          daysFull = [
            "Domingo",
            "Segunda",
            "Ter\xE7a",
            "Quarta",
            "Quinta",
            "Sexta",
            "S\xE1bado"
          ];
          dayNames = {
            "do": 0,
            "dom": 0,
            "domingo": 0,
            "se": 1,
            "seg": 1,
            "segunda": 1,
            "te": 2,
            "ter": 2,
            "terca": 2,
            "qa": 3,
            "qua": 3,
            "quarta": 3,
            "qi": 4,
            "qui": 4,
            "quinta": 4,
            "se": 5,
            "sex": 5,
            "sexta": 5,
            "sa": 6,
            "sab": 6,
            "sabado": 6
          };
          monthsAll = monthsFull.concat(monthsAbbr);
          daysAll = [
            "do",
            "dom",
            "domingo",
            "se",
            "seg",
            "segunda",
            "te",
            "ter",
            "ter\xE7a",
            "qa",
            "qua",
            "quarta",
            "qi",
            "qui",
            "quinta",
            "se",
            "sex",
            "sexta",
            "sa",
            "sab",
            "s\xE1bado"
          ];
          monthNames = {
            "jan": 0,
            "janeiro": 0,
            "fev": 1,
            "fevereiro": 1,
            "mar": 2,
            "mar\xE7o": 2,
            "abr": 3,
            "abril": 3,
            "mai": 4,
            "jun": 5,
            "junho": 5,
            "jul": 6,
            "julho": 6,
            "ago": 7,
            "agosto": 7,
            "set": 8,
            "setembro": 8,
            "out": 9,
            "outubro": 9,
            "nov": 10,
            "novembro": 10,
            "dez": 11,
            "dezembro": 11
          };
        }
      };
      if (typeof module2 !== "undefined" && typeof module2.exports === "object") {
        module2.exports.language = language;
      } else if (typeof exports2 === "object") {
        exports2.language = language;
      } else if (typeof Date.language === "undefined") {
        Date.language = language;
      }
    })();
  }
});

// node_modules/adal-node/lib/cache-driver.js
var require_cache_driver = __commonJS({
  "node_modules/adal-node/lib/cache-driver.js"(exports2, module2) {
    "use strict";
    var _ = require_underscore_node();
    var crypto = require("crypto");
    require_date_utils();
    var Logger = require_log().Logger;
    var constants = require_constants();
    var cacheConstants = constants.Cache;
    var TokenResponseFields = constants.TokenResponseFields;
    var METADATA_CLIENTID = "_clientId";
    var METADATA_AUTHORITY = "_authority";
    function nop(placeHolder, callback) {
      callback();
    }
    var nopCache = {
      add: nop,
      addMany: nop,
      remove: nop,
      removeMany: nop,
      find: nop
    };
    function createTokenHash(token) {
      var hashAlg = crypto.createHash(cacheConstants.HASH_ALGORITHM);
      hashAlg.update(token, "utf8");
      return hashAlg.digest("base64");
    }
    function createTokenIdMessage(entry) {
      var accessTokenHash = createTokenHash(entry[TokenResponseFields.ACCESS_TOKEN]);
      var message = "AccessTokenId: " + accessTokenHash;
      if (entry[TokenResponseFields.REFRESH_TOKEN]) {
        var refreshTokenHash = createTokenHash(entry[TokenResponseFields.REFRESH_TOKEN]);
        message += ", RefreshTokenId: " + refreshTokenHash;
      }
      return message;
    }
    function CacheDriver(callContext, authority, resource, clientId, cache, refreshFunction) {
      this._callContext = callContext;
      this._log = new Logger("CacheDriver", callContext._logContext);
      this._authority = authority;
      this._resource = resource;
      this._clientId = clientId;
      this._cache = cache || nopCache;
      this._refreshFunction = refreshFunction;
    }
    CacheDriver.prototype._find = function(query, callback) {
      this._cache.find(query, callback);
    };
    CacheDriver.prototype._getPotentialEntries = function(query, callback) {
      var self2 = this;
      var potentialEntriesQuery = {};
      if (query.clientId) {
        potentialEntriesQuery[METADATA_CLIENTID] = query.clientId;
      }
      if (query.userId) {
        potentialEntriesQuery[TokenResponseFields.USER_ID] = query.userId;
      }
      this._log.verbose("Looking for potential cache entries:");
      this._log.verbose(JSON.stringify(potentialEntriesQuery), true);
      this._find(potentialEntriesQuery, function(err, entries) {
        self2._log.verbose("Found " + entries.length + " potential entries.");
        callback(err, entries);
        return;
      });
    };
    CacheDriver.prototype._findMRRTTokensForUser = function(user, callback) {
      this._find({ isMRRT: true, userId: user, _clientId: this._clientId }, callback);
    };
    CacheDriver.prototype._loadSingleEntryFromCache = function(query, callback) {
      var self2 = this;
      this._getPotentialEntries(query, function(err, potentialEntries) {
        if (err) {
          callback(err);
          return;
        }
        var returnVal;
        var isResourceTenantSpecific;
        if (potentialEntries && 0 < potentialEntries.length) {
          var resourceTenantSpecificEntries = _.where(potentialEntries, { resource: self2._resource, _authority: self2._authority });
          if (!resourceTenantSpecificEntries || resourceTenantSpecificEntries.length === 0) {
            self2._log.verbose("No resource specific cache entries found.");
            var mrrtTokens = _.where(potentialEntries, { isMRRT: true });
            if (mrrtTokens && mrrtTokens.length > 0) {
              self2._log.verbose("Found an MRRT token.");
              returnVal = mrrtTokens[0];
            } else {
              self2._log.verbose("No MRRT tokens found.");
            }
          } else if (resourceTenantSpecificEntries.length === 1) {
            self2._log.verbose("Resource specific token found.");
            returnVal = resourceTenantSpecificEntries[0];
            isResourceTenantSpecific = true;
          } else {
            callback(self2._log.createError("More than one token matches the criteria.  The result is ambiguous."));
            return;
          }
        }
        if (returnVal) {
          self2._log.verbose("Returning token from cache lookup");
          self2._log.verbose("Returning token from cache lookup, " + createTokenIdMessage(returnVal), true);
        }
        callback(null, returnVal, isResourceTenantSpecific);
      });
    };
    CacheDriver.prototype._createEntryFromRefresh = function(entry, refreshResponse) {
      var newEntry = _.clone(entry);
      newEntry = _.extend(newEntry, refreshResponse);
      if (entry.isMRRT && this._authority !== entry[METADATA_AUTHORITY]) {
        newEntry[METADATA_AUTHORITY] = this._authority;
      }
      this._log.verbose("Created new cache entry from refresh response.");
      return newEntry;
    };
    CacheDriver.prototype._replaceEntry = function(entryToReplace, newEntry, callback) {
      var self2 = this;
      this.remove(entryToReplace, function(err) {
        if (err) {
          callback(err);
          return;
        }
        self2.add(newEntry, callback);
      });
    };
    CacheDriver.prototype._refreshExpiredEntry = function(entry, callback) {
      var self2 = this;
      this._refreshFunction(entry, null, function(err, tokenResponse) {
        if (err) {
          callback(err);
          return;
        }
        var newEntry = self2._createEntryFromRefresh(entry, tokenResponse);
        self2._replaceEntry(entry, newEntry, function(err2) {
          if (err2) {
            self2._log.error("error refreshing expired token", err2, true);
          } else {
            self2._log.info("Returning token refreshed after expiry.");
          }
          callback(err2, newEntry);
        });
      });
    };
    CacheDriver.prototype._acquireNewTokenFromMrrt = function(entry, callback) {
      var self2 = this;
      this._refreshFunction(entry, this._resource, function(err, tokenResponse) {
        if (err) {
          callback(err);
          return;
        }
        var newEntry = self2._createEntryFromRefresh(entry, tokenResponse);
        self2.add(newEntry, function(err2) {
          if (err2) {
            self2._log.error("error refreshing mrrt", err2, true);
          } else {
            self2._log.info("Returning token derived from mrrt refresh.");
          }
          callback(err2, newEntry);
        });
      });
    };
    CacheDriver.prototype._refreshEntryIfNecessary = function(entry, isResourceSpecific, callback) {
      var expiryDate = entry[TokenResponseFields.EXPIRES_ON];
      var nowPlusBuffer = new Date().addMinutes(constants.Misc.CLOCK_BUFFER);
      if (isResourceSpecific && nowPlusBuffer.isAfter(expiryDate)) {
        this._log.info("Cached token is expired.  Refreshing: " + expiryDate);
        this._refreshExpiredEntry(entry, callback);
        return;
      } else if (!isResourceSpecific && entry.isMRRT) {
        this._log.info("Acquiring new access token from MRRT token.");
        this._acquireNewTokenFromMrrt(entry, callback);
        return;
      } else {
        callback(null, entry);
      }
    };
    CacheDriver.prototype.find = function(query, callback) {
      var self2 = this;
      query = query || {};
      this._log.verbose("finding using query");
      this._log.verbose("finding with query:" + JSON.stringify(query), true);
      this._loadSingleEntryFromCache(query, function(err, entry, isResourceTenantSpecific) {
        if (err) {
          callback(err);
          return;
        }
        if (!entry) {
          callback();
          return;
        }
        self2._refreshEntryIfNecessary(entry, isResourceTenantSpecific, function(err2, newEntry) {
          callback(err2, newEntry);
          return;
        });
      });
    };
    CacheDriver.prototype.remove = function(entry, callback) {
      this._log.verbose("Removing entry.");
      return this._cache.remove([entry], function(err) {
        callback(err);
        return;
      });
    };
    CacheDriver.prototype._removeMany = function(entries, callback) {
      this._log.verbose("Remove many: " + entries.length);
      this._cache.remove(entries, function(err) {
        callback(err);
        return;
      });
    };
    CacheDriver.prototype._addMany = function(entries, callback) {
      this._log.verbose("Add many: " + entries.length);
      this._cache.add(entries, function(err) {
        callback(err);
        return;
      });
    };
    function isMRRT(entry) {
      return entry.resource ? true : false;
    }
    CacheDriver.prototype._updateRefreshTokens = function(entry, callback) {
      var self2 = this;
      if (isMRRT(entry)) {
        this._findMRRTTokensForUser(entry.userId, function(err, mrrtTokens) {
          if (err) {
            callback(err);
            return;
          }
          if (!mrrtTokens || mrrtTokens.length === 0) {
            callback();
            return;
          }
          self2._log.verbose("Updating " + mrrtTokens.length + " cached refresh tokens.");
          self2._removeMany(mrrtTokens, function(err2) {
            if (err2) {
              callback(err2);
              return;
            }
            for (var i = 0; i < mrrtTokens.length; i++) {
              mrrtTokens[i][TokenResponseFields.REFRESH_TOKEN] = entry[TokenResponseFields.REFRESH_TOKEN];
            }
            self2._addMany(mrrtTokens, function(err3) {
              callback(err3);
              return;
            });
          });
        });
      } else {
        callback();
        return;
      }
    };
    CacheDriver.prototype._entryHasMetadata = function(entry) {
      return _.has(entry, METADATA_CLIENTID) && _.has(entry, METADATA_AUTHORITY);
    };
    CacheDriver.prototype._augmentEntryWithCacheMetadata = function(entry) {
      if (this._entryHasMetadata(entry)) {
        return;
      }
      if (isMRRT(entry)) {
        this._log.verbose("Added entry is MRRT");
        entry.isMRRT = true;
      } else {
        entry.resource = this._resource;
      }
      entry[METADATA_CLIENTID] = this._clientId;
      entry[METADATA_AUTHORITY] = this._authority;
    };
    CacheDriver.prototype.add = function(entry, callback) {
      var self2 = this;
      this._log.verbose("Adding entry");
      this._log.verbose("Adding entry, " + createTokenIdMessage(entry));
      this._augmentEntryWithCacheMetadata(entry);
      this._updateRefreshTokens(entry, function(err) {
        if (err) {
          callback(err);
          return;
        }
        self2._cache.add([entry], function(err2) {
          callback(err2);
          return;
        });
      });
    };
    module2.exports = CacheDriver;
  }
});

// node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS({
  "node_modules/@xmldom/xmldom/lib/conventions.js"(exports2) {
    "use strict";
    function freeze(object, oc) {
      if (oc === void 0) {
        oc = Object;
      }
      return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
    }
    var MIME_TYPE = freeze({
      HTML: "text/html",
      isHTML: function(value) {
        return value === MIME_TYPE.HTML;
      },
      XML_APPLICATION: "application/xml",
      XML_TEXT: "text/xml",
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      XML_SVG_IMAGE: "image/svg+xml"
    });
    var NAMESPACE = freeze({
      HTML: "http://www.w3.org/1999/xhtml",
      isHTML: function(uri) {
        return uri === NAMESPACE.HTML;
      },
      SVG: "http://www.w3.org/2000/svg",
      XML: "http://www.w3.org/XML/1998/namespace",
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
    exports2.freeze = freeze;
    exports2.MIME_TYPE = MIME_TYPE;
    exports2.NAMESPACE = NAMESPACE;
  }
});

// node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom.js"(exports2) {
    var conventions = require_conventions();
    var NAMESPACE = conventions.NAMESPACE;
    function notEmptyString(input) {
      return input !== "";
    }
    function splitOnASCIIWhitespace(input) {
      return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
    }
    function orderedSetReducer(current, element) {
      if (!current.hasOwnProperty(element)) {
        current[element] = true;
      }
      return current;
    }
    function toOrderedSet(input) {
      if (!input)
        return [];
      var list = splitOnASCIIWhitespace(input);
      return Object.keys(list.reduce(orderedSetReducer, {}));
    }
    function arrayIncludes(list) {
      return function(element) {
        return list && list.indexOf(element) !== -1;
      };
    }
    function copy(src, dest) {
      for (var p in src) {
        dest[p] = src[p];
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (!(pt instanceof Super)) {
        let t2 = function() {
        };
        var t = t2;
        ;
        t2.prototype = Super.prototype;
        t2 = new t2();
        copy(pt, t2);
        Class.prototype = pt = t2;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknown Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var ExceptionCode = {};
    var ExceptionMessage = {};
    var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
    var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
    var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
    var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
    var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
    var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
    var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
    var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
    var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
    var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
    var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
    var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
    var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
    var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
    var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
    function DOMException(code, message) {
      if (message instanceof Error) {
        var error2 = message;
      } else {
        error2 = this;
        Error.call(this, ExceptionMessage[code]);
        this.message = ExceptionMessage[code];
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, DOMException);
      }
      error2.code = code;
      if (message)
        this.message = this.message + ": " + message;
      return error2;
    }
    DOMException.prototype = Error.prototype;
    copy(ExceptionCode, DOMException);
    function NodeList() {
    }
    NodeList.prototype = {
      length: 0,
      item: function(index) {
        return this[index] || null;
      },
      toString: function(isHTML, nodeFilter) {
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, isHTML, nodeFilter);
        }
        return buf.join("");
      }
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc != inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i];
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = list.length;
      while (i--) {
        if (list[i] === node) {
          return i;
        }
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length++] = newAttr;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i < lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
            attr.ownerElement = null;
          }
        }
      } else {
        throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      getNamedItem: function(key) {
        var i = this.length;
        while (i--) {
          var attr = this[i];
          if (attr.nodeName == key) {
            return attr;
          }
        }
      },
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItem(attr.nodeName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      setNamedItemNS: function(attr) {
        var el = attr.ownerElement, oldAttr;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      removeNamedItem: function(key) {
        var attr = this.getNamedItem(key);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      getNamedItemNS: function(namespaceURI, localName) {
        var i = this.length;
        while (i--) {
          var node = this[i];
          if (node.localName == localName && node.namespaceURI == namespaceURI) {
            return node;
          }
        }
        return null;
      }
    };
    function DOMImplementation() {
    }
    DOMImplementation.prototype = {
      hasFeature: function(feature, version) {
        return true;
      },
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var doc = new Document();
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype || null;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      createDocumentType: function(qualifiedName, publicId, systemId) {
        var node = new DocumentType();
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId || "";
        node.systemId = systemId || "";
        return node;
      }
    };
    function Node() {
    }
    Node.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      replaceChild: function(newChild, oldChild) {
        this.insertBefore(newChild, oldChild);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      normalize: function() {
        var child = this.firstChild;
        while (child) {
          var next = child.nextSibling;
          if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
            this.removeChild(next);
            child.appendData(next.data);
          } else {
            child.normalize();
            child = next;
          }
        }
      },
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      hasAttributes: function() {
        return this.attributes.length > 0;
      },
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (map[n] == namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (prefix in map) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node);
    copy(NodeType, Node.prototype);
    function _visitNode(node, callback) {
      if (callback(node)) {
        return true;
      }
      if (node = node.firstChild) {
        do {
          if (_visitNode(node, callback)) {
            return true;
          }
        } while (node = node.nextSibling);
      }
    }
    function Document() {
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, el, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var cs = el.childNodes;
        if (newChild) {
          cs[cs.length++] = newChild;
        } else {
          var child = el.firstChild;
          var i = 0;
          while (child) {
            cs[i++] = child;
            child = child.nextSibling;
          }
          cs.length = i;
        }
      }
    }
    function _removeChild(parentNode, child) {
      var previous = child.previousSibling;
      var next = child.nextSibling;
      if (previous) {
        previous.nextSibling = next;
      } else {
        parentNode.firstChild = next;
      }
      if (next) {
        next.previousSibling = previous;
      } else {
        parentNode.lastChild = previous;
      }
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      return child;
    }
    function _insertBefore(parentNode, newChild, nextChild) {
      var cp = newChild.parentNode;
      if (cp) {
        cp.removeChild(newChild);
      }
      if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = newChild.firstChild;
        if (newFirst == null) {
          return newChild;
        }
        var newLast = newChild.lastChild;
      } else {
        newFirst = newLast = newChild;
      }
      var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = nextChild;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parentNode.firstChild = newFirst;
      }
      if (nextChild == null) {
        parentNode.lastChild = newLast;
      } else {
        nextChild.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parentNode;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode);
      if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
        newChild.firstChild = newChild.lastChild = null;
      }
      return newChild;
    }
    function _appendSingleChild(parentNode, newChild) {
      var cp = newChild.parentNode;
      if (cp) {
        var pre = parentNode.lastChild;
        cp.removeChild(newChild);
        var pre = parentNode.lastChild;
      }
      var pre = parentNode.lastChild;
      newChild.parentNode = parentNode;
      newChild.previousSibling = pre;
      newChild.nextSibling = null;
      if (pre) {
        pre.nextSibling = newChild;
      } else {
        parentNode.firstChild = newChild;
      }
      parentNode.lastChild = newChild;
      _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
      return newChild;
    }
    Document.prototype = {
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
      },
      removeChild: function(oldChild) {
        if (this.documentElement == oldChild) {
          this.documentElement = null;
        }
        return _removeChild(this, oldChild);
      },
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      getElementsByClassName: function(classNames) {
        var classNamesSet = toOrderedSet(classNames);
        return new LiveNodeList(this, function(base) {
          var ls = [];
          if (classNamesSet.length > 0) {
            _visitNode(base.documentElement, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  if (matches) {
                    ls.push(node);
                  }
                }
              }
            });
          }
          return ls;
        });
      },
      createElement: function(tagName) {
        var node = new Element();
        node.ownerDocument = this;
        node.nodeName = tagName;
        node.tagName = tagName;
        node.localName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      createDocumentFragment: function() {
        var node = new DocumentFragment();
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      createTextNode: function(data) {
        var node = new Text();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createComment: function(data) {
        var node = new Comment();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createCDATASection: function(data) {
        var node = new CDATASection();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction();
        node.ownerDocument = this;
        node.tagName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      createAttribute: function(name) {
        var node = new Attr();
        node.ownerDocument = this;
        node.name = name;
        node.nodeName = name;
        node.localName = name;
        node.specified = true;
        return node;
      },
      createEntityReference: function(name) {
        var node = new EntityReference();
        node.ownerDocument = this;
        node.nodeName = name;
        return node;
      },
      createElementNS: function(namespaceURI, qualifiedName) {
        var node = new Element();
        var pl = qualifiedName.split(":");
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = namespaceURI;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        attrs._ownerElement = node;
        return node;
      },
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var node = new Attr();
        var pl = qualifiedName.split(":");
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.namespaceURI = namespaceURI;
        node.specified = true;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        return node;
      }
    };
    _extends(Document, Node);
    function Element() {
      this._nsMap = {};
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE,
      hasAttribute: function(name) {
        return this.getAttributeNode(name) != null;
      },
      getAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        return attr && attr.value || "";
      },
      getAttributeNode: function(name) {
        return this.attributes.getNamedItem(name);
      },
      setAttribute: function(name, value) {
        var attr = this.ownerDocument.createAttribute(name);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      removeAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        attr && this.removeAttributeNode(attr);
      },
      appendChild: function(newChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          return this.insertBefore(newChild, null);
        } else {
          return _appendSingleChild(this, newChild);
        }
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr && attr.value || "";
      },
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      getElementsByTagName: function(tagName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node);
    function Attr() {
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node);
    function CharacterData() {
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      appendChild: function(newChild) {
        throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node);
    function Text() {
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment() {
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection() {
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, CharacterData);
    function DocumentType() {
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node);
    function Notation() {
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node);
    function Entity() {
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node);
    function EntityReference() {
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node);
    function DocumentFragment() {
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node);
    function ProcessingInstruction() {
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, Node);
    function XMLSerializer() {
    }
    XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
      return nodeSerializeToString.call(node, isHtml, nodeFilter);
    };
    Node.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(isHtml, nodeFilter) {
      var buf = [];
      var refNode = this.nodeType == 9 && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
          ];
        }
      }
      serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!uri) {
        return false;
      }
      if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix === prefix) {
          return ns.namespace !== uri;
        }
      }
      return true;
    }
    function addSerializedAttribute(buf, qualifiedName, value) {
      buf.push(" ", qualifiedName, '="', value.replace(/[<&"]/g, _xmlEncoder), '"');
    }
    function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
      if (!visibleNamespaces) {
        visibleNamespaces = [];
      }
      if (nodeFilter) {
        node = nodeFilter(node);
        if (node) {
          if (typeof node == "string") {
            buf.push(node);
            return;
          }
        } else {
          return;
        }
      }
      switch (node.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var len = attrs.length;
          var child = node.firstChild;
          var nodeName = node.tagName;
          isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;
          var prefixedNodeName = nodeName;
          if (!isHTML && !node.prefix && node.namespaceURI) {
            var defaultNS;
            for (var ai = 0; ai < attrs.length; ai++) {
              if (attrs.item(ai).name === "xmlns") {
                defaultNS = attrs.item(ai).value;
                break;
              }
            }
            if (!defaultNS) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                  defaultNS = namespace.namespace;
                  break;
                }
              }
            }
            if (defaultNS !== node.namespaceURI) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.namespace === node.namespaceURI) {
                  if (namespace.prefix) {
                    prefixedNodeName = namespace.prefix + ":" + nodeName;
                  }
                  break;
                }
              }
            }
          }
          buf.push("<", prefixedNodeName);
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (attr.prefix == "xmlns") {
              visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
            } else if (attr.nodeName == "xmlns") {
              visibleNamespaces.push({ prefix: "", namespace: attr.value });
            }
          }
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
              var prefix = attr.prefix || "";
              var uri = attr.namespaceURI;
              addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
          }
          if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
            var prefix = node.prefix || "";
            var uri = node.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
            buf.push(">");
            if (isHTML && /^script$/i.test(nodeName)) {
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                }
                child = child.nextSibling;
              }
            } else {
              while (child) {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                child = child.nextSibling;
              }
            }
            buf.push("</", prefixedNodeName, ">");
          } else {
            buf.push("/>");
          }
          return;
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var child = node.firstChild;
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            child = child.nextSibling;
          }
          return;
        case ATTRIBUTE_NODE:
          return addSerializedAttribute(buf, node.name, node.value);
        case TEXT_NODE:
          return buf.push(node.data.replace(/[<&]/g, _xmlEncoder).replace(/]]>/g, "]]&gt;"));
        case CDATA_SECTION_NODE:
          return buf.push("<![CDATA[", node.data, "]]>");
        case COMMENT_NODE:
          return buf.push("<!--", node.data, "-->");
        case DOCUMENT_TYPE_NODE:
          var pubid = node.publicId;
          var sysid = node.systemId;
          buf.push("<!DOCTYPE ", node.name);
          if (pubid) {
            buf.push(" PUBLIC ", pubid);
            if (sysid && sysid != ".") {
              buf.push(" ", sysid);
            }
            buf.push(">");
          } else if (sysid && sysid != ".") {
            buf.push(" SYSTEM ", sysid, ">");
          } else {
            var sub = node.internalSubset;
            if (sub) {
              buf.push(" [", sub, "]");
            }
            buf.push(">");
          }
          return;
        case PROCESSING_INSTRUCTION_NODE:
          return buf.push("<?", node.target, " ", node.data, "?>");
        case ENTITY_REFERENCE_NODE:
          return buf.push("&", node.nodeName, ";");
        default:
          buf.push("??", node.nodeName);
      }
    }
    function importNode(doc, node, deep) {
      var node2;
      switch (node.nodeType) {
        case ELEMENT_NODE:
          node2 = node.cloneNode(false);
          node2.ownerDocument = doc;
        case DOCUMENT_FRAGMENT_NODE:
          break;
        case ATTRIBUTE_NODE:
          deep = true;
          break;
      }
      if (!node2) {
        node2 = node.cloneNode(false);
      }
      node2.ownerDocument = doc;
      node2.parentNode = null;
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(importNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function cloneNode(doc, node, deep) {
      var node2 = new node.constructor();
      for (var n in node) {
        var v = node[n];
        if (typeof v != "object") {
          if (v != node2[n]) {
            node2[n] = v;
          }
        }
      }
      if (node.childNodes) {
        node2.childNodes = new NodeList();
      }
      node2.ownerDocument = doc;
      switch (node2.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var attrs2 = node2.attributes = new NamedNodeMap();
          var len = attrs.length;
          attrs2._ownerElement = node2;
          for (var i = 0; i < len; i++) {
            node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
          }
          break;
          ;
        case ATTRIBUTE_NODE:
          deep = true;
      }
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(cloneNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    try {
      if (Object.defineProperty) {
        let getTextContent2 = function(node) {
          switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              var buf = [];
              node = node.firstChild;
              while (node) {
                if (node.nodeType !== 7 && node.nodeType !== 8) {
                  buf.push(getTextContent2(node));
                }
                node = node.nextSibling;
              }
              return buf.join("");
            default:
              return node.nodeValue;
          }
        };
        getTextContent = getTextContent2;
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            return getTextContent2(this);
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    var getTextContent;
    exports2.DocumentType = DocumentType;
    exports2.DOMException = DOMException;
    exports2.DOMImplementation = DOMImplementation;
    exports2.Element = Element;
    exports2.Node = Node;
    exports2.NodeList = NodeList;
    exports2.XMLSerializer = XMLSerializer;
  }
});

// node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/@xmldom/xmldom/lib/entities.js"(exports2) {
    var freeze = require_conventions().freeze;
    exports2.XML_ENTITIES = freeze({ amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' });
    exports2.HTML_ENTITIES = freeze({
      lt: "<",
      gt: ">",
      amp: "&",
      quot: '"',
      apos: "'",
      Agrave: "\xC0",
      Aacute: "\xC1",
      Acirc: "\xC2",
      Atilde: "\xC3",
      Auml: "\xC4",
      Aring: "\xC5",
      AElig: "\xC6",
      Ccedil: "\xC7",
      Egrave: "\xC8",
      Eacute: "\xC9",
      Ecirc: "\xCA",
      Euml: "\xCB",
      Igrave: "\xCC",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Iuml: "\xCF",
      ETH: "\xD0",
      Ntilde: "\xD1",
      Ograve: "\xD2",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Otilde: "\xD5",
      Ouml: "\xD6",
      Oslash: "\xD8",
      Ugrave: "\xD9",
      Uacute: "\xDA",
      Ucirc: "\xDB",
      Uuml: "\xDC",
      Yacute: "\xDD",
      THORN: "\xDE",
      szlig: "\xDF",
      agrave: "\xE0",
      aacute: "\xE1",
      acirc: "\xE2",
      atilde: "\xE3",
      auml: "\xE4",
      aring: "\xE5",
      aelig: "\xE6",
      ccedil: "\xE7",
      egrave: "\xE8",
      eacute: "\xE9",
      ecirc: "\xEA",
      euml: "\xEB",
      igrave: "\xEC",
      iacute: "\xED",
      icirc: "\xEE",
      iuml: "\xEF",
      eth: "\xF0",
      ntilde: "\xF1",
      ograve: "\xF2",
      oacute: "\xF3",
      ocirc: "\xF4",
      otilde: "\xF5",
      ouml: "\xF6",
      oslash: "\xF8",
      ugrave: "\xF9",
      uacute: "\xFA",
      ucirc: "\xFB",
      uuml: "\xFC",
      yacute: "\xFD",
      thorn: "\xFE",
      yuml: "\xFF",
      nbsp: "\xA0",
      iexcl: "\xA1",
      cent: "\xA2",
      pound: "\xA3",
      curren: "\xA4",
      yen: "\xA5",
      brvbar: "\xA6",
      sect: "\xA7",
      uml: "\xA8",
      copy: "\xA9",
      ordf: "\xAA",
      laquo: "\xAB",
      not: "\xAC",
      shy: "\xAD\xAD",
      reg: "\xAE",
      macr: "\xAF",
      deg: "\xB0",
      plusmn: "\xB1",
      sup2: "\xB2",
      sup3: "\xB3",
      acute: "\xB4",
      micro: "\xB5",
      para: "\xB6",
      middot: "\xB7",
      cedil: "\xB8",
      sup1: "\xB9",
      ordm: "\xBA",
      raquo: "\xBB",
      frac14: "\xBC",
      frac12: "\xBD",
      frac34: "\xBE",
      iquest: "\xBF",
      times: "\xD7",
      divide: "\xF7",
      forall: "\u2200",
      part: "\u2202",
      exist: "\u2203",
      empty: "\u2205",
      nabla: "\u2207",
      isin: "\u2208",
      notin: "\u2209",
      ni: "\u220B",
      prod: "\u220F",
      sum: "\u2211",
      minus: "\u2212",
      lowast: "\u2217",
      radic: "\u221A",
      prop: "\u221D",
      infin: "\u221E",
      ang: "\u2220",
      and: "\u2227",
      or: "\u2228",
      cap: "\u2229",
      cup: "\u222A",
      "int": "\u222B",
      there4: "\u2234",
      sim: "\u223C",
      cong: "\u2245",
      asymp: "\u2248",
      ne: "\u2260",
      equiv: "\u2261",
      le: "\u2264",
      ge: "\u2265",
      sub: "\u2282",
      sup: "\u2283",
      nsub: "\u2284",
      sube: "\u2286",
      supe: "\u2287",
      oplus: "\u2295",
      otimes: "\u2297",
      perp: "\u22A5",
      sdot: "\u22C5",
      Alpha: "\u0391",
      Beta: "\u0392",
      Gamma: "\u0393",
      Delta: "\u0394",
      Epsilon: "\u0395",
      Zeta: "\u0396",
      Eta: "\u0397",
      Theta: "\u0398",
      Iota: "\u0399",
      Kappa: "\u039A",
      Lambda: "\u039B",
      Mu: "\u039C",
      Nu: "\u039D",
      Xi: "\u039E",
      Omicron: "\u039F",
      Pi: "\u03A0",
      Rho: "\u03A1",
      Sigma: "\u03A3",
      Tau: "\u03A4",
      Upsilon: "\u03A5",
      Phi: "\u03A6",
      Chi: "\u03A7",
      Psi: "\u03A8",
      Omega: "\u03A9",
      alpha: "\u03B1",
      beta: "\u03B2",
      gamma: "\u03B3",
      delta: "\u03B4",
      epsilon: "\u03B5",
      zeta: "\u03B6",
      eta: "\u03B7",
      theta: "\u03B8",
      iota: "\u03B9",
      kappa: "\u03BA",
      lambda: "\u03BB",
      mu: "\u03BC",
      nu: "\u03BD",
      xi: "\u03BE",
      omicron: "\u03BF",
      pi: "\u03C0",
      rho: "\u03C1",
      sigmaf: "\u03C2",
      sigma: "\u03C3",
      tau: "\u03C4",
      upsilon: "\u03C5",
      phi: "\u03C6",
      chi: "\u03C7",
      psi: "\u03C8",
      omega: "\u03C9",
      thetasym: "\u03D1",
      upsih: "\u03D2",
      piv: "\u03D6",
      OElig: "\u0152",
      oelig: "\u0153",
      Scaron: "\u0160",
      scaron: "\u0161",
      Yuml: "\u0178",
      fnof: "\u0192",
      circ: "\u02C6",
      tilde: "\u02DC",
      ensp: "\u2002",
      emsp: "\u2003",
      thinsp: "\u2009",
      zwnj: "\u200C",
      zwj: "\u200D",
      lrm: "\u200E",
      rlm: "\u200F",
      ndash: "\u2013",
      mdash: "\u2014",
      lsquo: "\u2018",
      rsquo: "\u2019",
      sbquo: "\u201A",
      ldquo: "\u201C",
      rdquo: "\u201D",
      bdquo: "\u201E",
      dagger: "\u2020",
      Dagger: "\u2021",
      bull: "\u2022",
      hellip: "\u2026",
      permil: "\u2030",
      prime: "\u2032",
      Prime: "\u2033",
      lsaquo: "\u2039",
      rsaquo: "\u203A",
      oline: "\u203E",
      euro: "\u20AC",
      trade: "\u2122",
      larr: "\u2190",
      uarr: "\u2191",
      rarr: "\u2192",
      darr: "\u2193",
      harr: "\u2194",
      crarr: "\u21B5",
      lceil: "\u2308",
      rceil: "\u2309",
      lfloor: "\u230A",
      rfloor: "\u230B",
      loz: "\u25CA",
      spades: "\u2660",
      clubs: "\u2663",
      hearts: "\u2665",
      diams: "\u2666"
    });
    exports2.entityMap = exports2.HTML_ENTITIES;
  }
});

// node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/@xmldom/xmldom/lib/sax.js"(exports2) {
    var NAMESPACE = require_conventions().NAMESPACE;
    var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
    var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function ParseError(message, locator) {
      this.message = message;
      this.locator = locator;
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, ParseError);
    }
    ParseError.prototype = new Error();
    ParseError.prototype.name = ParseError.name;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = {});
        parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
        domBuilder.endDocument();
      }
    };
    function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var k = a2.slice(1, -1);
        if (k in entityMap) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = m.index;
          lineEnd = lineStart + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /.*(?:\r\n?|\n)|.*$/g;
      var locator = domBuilder.locator;
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var closeMap = {};
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!source.substr(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substr(start));
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            appendText(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 3);
              var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
              var config = parseStack.pop();
              if (end < 0) {
                tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
                end = tagStart + 1 + tagName.length;
              } else if (tagName.match(/\s</)) {
                tagName = tagName.replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " maybe not complete");
                end = tagStart + 1 + tagName.length;
              }
              var localNSMap = config.localNSMap;
              var endMatch = config.tagName == tagName;
              var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
              if (endIgnoreCaseMach) {
                domBuilder.endElement(config.uri, config.localName, tagName);
                if (localNSMap) {
                  for (var prefix in localNSMap) {
                    domBuilder.endPrefixMapping(prefix);
                  }
                }
                if (!endMatch) {
                  errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
                }
              } else {
                parseStack.push(config);
              }
              end++;
              break;
            case "?":
              locator && position(tagStart);
              end = parseInstruction(source, tagStart, domBuilder);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDCC(source, tagStart, domBuilder, errorHandler);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
              var len = el.length;
              if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                el.closed = true;
                if (!entityMap.nbsp) {
                  errorHandler.warning("unclosed xml attribute");
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (NAMESPACE.isHTML(el.uri) && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
      function addAttribute(qname, value2, startIndex) {
        if (el.attributeNames.hasOwnProperty(qname)) {
          errorHandler.fatalError("Attribute " + qname + " redefined");
        }
        el.addValue(qname, value2, startIndex);
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source.charAt(p);
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c, start);
              if (p > 0) {
                value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
              case S_ATTR_SPACE:
                break;
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
                } else {
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                throw new Error("attribute value missed!!");
            }
            return p;
          case "\x80":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                case S_ATTR_SPACE:
                  var tagName = el.tagName;
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = {};
            _copy(currentNSMap, currentNSMap = {});
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = NAMESPACE.XMLNS;
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        var prefix = a.prefix;
        if (prefix) {
          if (prefix === "xml") {
            a.uri = NAMESPACE.XML;
          }
          if (prefix !== "xmlns") {
            a.uri = currentNSMap[prefix || ""];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            domBuilder.endPrefixMapping(prefix);
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      if (/^(?:script|textarea)$/i.test(tagName)) {
        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (/[&<]/.test(text)) {
          if (/^script$/i.test(tagName)) {
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
          text = text.replace(/&#?\w+;/g, entityReplacer);
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
      }
      return elStartEnd + 1;
    }
    function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
      var pos = closeMap[tagName];
      if (pos == null) {
        pos = source.lastIndexOf("</" + tagName + ">");
        if (pos < elStartEnd) {
          pos = source.lastIndexOf("</" + tagName);
        }
        closeMap[tagName] = pos;
      }
      return pos < elStartEnd;
    }
    function _copy(source, target) {
      for (var n in source) {
        target[n] = source[n];
      }
    }
    function parseDCC(source, start, domBuilder, errorHandler) {
      var next = source.charAt(start + 2);
      switch (next) {
        case "-":
          if (source.charAt(start + 3) === "-") {
            var end = source.indexOf("-->", start + 4);
            if (end > start) {
              domBuilder.comment(source, start + 4, end - start - 4);
              return end + 3;
            } else {
              errorHandler.error("Unclosed comment");
              return -1;
            }
          } else {
            return -1;
          }
        default:
          if (source.substr(start + 3, 6) == "CDATA[") {
            var end = source.indexOf("]]>", start + 9);
            domBuilder.startCDATA();
            domBuilder.characters(source, start + 9, end - start - 9);
            domBuilder.endCDATA();
            return end + 3;
          }
          var matchs = split(source, start);
          var len = matchs.length;
          if (len > 1 && /!doctype/i.test(matchs[0][0])) {
            var name = matchs[1][0];
            var pubid = false;
            var sysid = false;
            if (len > 3) {
              if (/^public$/i.test(matchs[2][0])) {
                pubid = matchs[3][0];
                sysid = len > 4 && matchs[4][0];
              } else if (/^system$/i.test(matchs[2][0])) {
                sysid = matchs[3][0];
              }
            }
            var lastMatch = matchs[len - 1];
            domBuilder.startDTD(name, pubid, sysid);
            domBuilder.endDTD();
            return lastMatch.index + lastMatch[0].length;
          }
      }
      return -1;
    }
    function parseInstruction(source, start, domBuilder) {
      var end = source.indexOf("?>", start);
      if (end) {
        var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        if (match) {
          var len = match[0].length;
          domBuilder.processingInstruction(match[1], match[2]);
          return end + 2;
        } else {
          return -1;
        }
      }
      return -1;
    }
    function ElementAttributes() {
      this.attributeNames = {};
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!tagNamePattern.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!tagNamePattern.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
    };
    function split(source, start) {
      var match;
      var buf = [];
      var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
      reg.lastIndex = start;
      reg.exec(source);
      while (match = reg.exec(source)) {
        buf.push(match);
        if (match[1])
          return buf;
      }
    }
    exports2.XMLReader = XMLReader;
    exports2.ParseError = ParseError;
  }
});

// node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports2) {
    var conventions = require_conventions();
    var dom = require_dom();
    var entities = require_entities();
    var sax = require_sax();
    var DOMImplementation = dom.DOMImplementation;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = sax.ParseError;
    var XMLReader = sax.XMLReader;
    function DOMParser(options) {
      this.options = options || { locator: {} };
    }
    DOMParser.prototype.parseFromString = function(source, mimeType) {
      var options = this.options;
      var sax2 = new XMLReader();
      var domBuilder = options.domBuilder || new DOMHandler();
      var errorHandler = options.errorHandler;
      var locator = options.locator;
      var defaultNSMap = options.xmlns || {};
      var isHTML = /\/x?html?$/.test(mimeType);
      var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
      if (locator) {
        domBuilder.setDocumentLocator(locator);
      }
      sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
      sax2.domBuilder = options.domBuilder || domBuilder;
      if (isHTML) {
        defaultNSMap[""] = NAMESPACE.HTML;
      }
      defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
      if (source && typeof source === "string") {
        sax2.parse(source, defaultNSMap, entityMap);
      } else {
        sax2.errorHandler.error("invalid doc source");
      }
      return domBuilder.doc;
    };
    function buildErrorHandler(errorImpl, domBuilder, locator) {
      if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
          return domBuilder;
        }
        errorImpl = domBuilder;
      }
      var errorHandler = {};
      var isCallback = errorImpl instanceof Function;
      locator = locator || {};
      function build(key) {
        var fn2 = errorImpl[key];
        if (!fn2 && isCallback) {
          fn2 = errorImpl.length == 2 ? function(msg) {
            errorImpl(key, msg);
          } : errorImpl;
        }
        errorHandler[key] = fn2 && function(msg) {
          fn2("[xmldom " + key + "]	" + msg + _locator(locator));
        } || function() {
        };
      }
      build("warning");
      build("error");
      build("fatalError");
      return errorHandler;
    }
    function DOMHandler() {
      this.cdata = false;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      startDocument: function() {
        this.doc = new DOMImplementation().createDocument(null, null, null);
        if (this.locator) {
          this.doc.documentURI = this.locator.systemId;
        }
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        var current = this.currentElement;
        var tagName = current.tagName;
        this.currentElement = current.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      setDocumentLocator: function(locator) {
        if (this.locator = locator) {
          locator.lineNumber = 0;
        }
      },
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name, publicId, systemId) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
          this.doc.doctype = dt;
        }
      },
      warning: function(error2) {
        console.warn("[xmldom warning]	" + error2, _locator(this.locator));
      },
      error: function(error2) {
        console.error("[xmldom error]	" + error2, _locator(this.locator));
      },
      fatalError: function(error2) {
        throw new ParseError(error2, this.locator);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
      DOMHandler.prototype[key] = function() {
        return null;
      };
    });
    function appendElement(hander, node) {
      if (!hander.currentElement) {
        hander.doc.appendChild(node);
      } else {
        hander.currentElement.appendChild(node);
      }
    }
    exports2.__DOMHandler = DOMHandler;
    exports2.DOMParser = DOMParser;
    exports2.DOMImplementation = dom.DOMImplementation;
    exports2.XMLSerializer = dom.XMLSerializer;
  }
});

// node_modules/@xmldom/xmldom/lib/index.js
var require_lib = __commonJS({
  "node_modules/@xmldom/xmldom/lib/index.js"(exports2) {
    var dom = require_dom();
    exports2.DOMImplementation = dom.DOMImplementation;
    exports2.XMLSerializer = dom.XMLSerializer;
    exports2.DOMParser = require_dom_parser().DOMParser;
  }
});

// node_modules/xpath.js/xpath.js
var require_xpath = __commonJS({
  "node_modules/xpath.js/xpath.js"(exports2, module2) {
    XPathParser.prototype = new Object();
    XPathParser.prototype.constructor = XPathParser;
    XPathParser.superclass = Object.prototype;
    function XPathParser() {
      this.init();
    }
    XPathParser.prototype.init = function() {
      this.reduceActions = [];
      this.reduceActions[3] = function(rhs) {
        return new OrOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[5] = function(rhs) {
        return new AndOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[7] = function(rhs) {
        return new EqualsOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[8] = function(rhs) {
        return new NotEqualOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[10] = function(rhs) {
        return new LessThanOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[11] = function(rhs) {
        return new GreaterThanOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[12] = function(rhs) {
        return new LessThanOrEqualOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[13] = function(rhs) {
        return new GreaterThanOrEqualOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[15] = function(rhs) {
        return new PlusOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[16] = function(rhs) {
        return new MinusOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[18] = function(rhs) {
        return new MultiplyOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[19] = function(rhs) {
        return new DivOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[20] = function(rhs) {
        return new ModOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[22] = function(rhs) {
        return new UnaryMinusOperation(rhs[1]);
      };
      this.reduceActions[24] = function(rhs) {
        return new BarOperation(rhs[0], rhs[2]);
      };
      this.reduceActions[25] = function(rhs) {
        return new PathExpr(void 0, void 0, rhs[0]);
      };
      this.reduceActions[27] = function(rhs) {
        rhs[0].locationPath = rhs[2];
        return rhs[0];
      };
      this.reduceActions[28] = function(rhs) {
        rhs[0].locationPath = rhs[2];
        rhs[0].locationPath.steps.unshift(new Step(Step.DESCENDANTORSELF, new NodeTest(NodeTest.NODE, void 0), []));
        return rhs[0];
      };
      this.reduceActions[29] = function(rhs) {
        return new PathExpr(rhs[0], [], void 0);
      };
      this.reduceActions[30] = function(rhs) {
        if (Utilities.instance_of(rhs[0], PathExpr)) {
          if (rhs[0].filterPredicates == void 0) {
            rhs[0].filterPredicates = [];
          }
          rhs[0].filterPredicates.push(rhs[1]);
          return rhs[0];
        } else {
          return new PathExpr(rhs[0], [rhs[1]], void 0);
        }
      };
      this.reduceActions[32] = function(rhs) {
        return rhs[1];
      };
      this.reduceActions[33] = function(rhs) {
        return new XString(rhs[0]);
      };
      this.reduceActions[34] = function(rhs) {
        return new XNumber(rhs[0]);
      };
      this.reduceActions[36] = function(rhs) {
        return new FunctionCall(rhs[0], []);
      };
      this.reduceActions[37] = function(rhs) {
        return new FunctionCall(rhs[0], rhs[2]);
      };
      this.reduceActions[38] = function(rhs) {
        return [rhs[0]];
      };
      this.reduceActions[39] = function(rhs) {
        rhs[2].unshift(rhs[0]);
        return rhs[2];
      };
      this.reduceActions[43] = function(rhs) {
        return new LocationPath(true, []);
      };
      this.reduceActions[44] = function(rhs) {
        rhs[1].absolute = true;
        return rhs[1];
      };
      this.reduceActions[46] = function(rhs) {
        return new LocationPath(false, [rhs[0]]);
      };
      this.reduceActions[47] = function(rhs) {
        rhs[0].steps.push(rhs[2]);
        return rhs[0];
      };
      this.reduceActions[49] = function(rhs) {
        return new Step(rhs[0], rhs[1], []);
      };
      this.reduceActions[50] = function(rhs) {
        return new Step(Step.CHILD, rhs[0], []);
      };
      this.reduceActions[51] = function(rhs) {
        return new Step(rhs[0], rhs[1], rhs[2]);
      };
      this.reduceActions[52] = function(rhs) {
        return new Step(Step.CHILD, rhs[0], rhs[1]);
      };
      this.reduceActions[54] = function(rhs) {
        return [rhs[0]];
      };
      this.reduceActions[55] = function(rhs) {
        rhs[1].unshift(rhs[0]);
        return rhs[1];
      };
      this.reduceActions[56] = function(rhs) {
        if (rhs[0] == "ancestor") {
          return Step.ANCESTOR;
        } else if (rhs[0] == "ancestor-or-self") {
          return Step.ANCESTORORSELF;
        } else if (rhs[0] == "attribute") {
          return Step.ATTRIBUTE;
        } else if (rhs[0] == "child") {
          return Step.CHILD;
        } else if (rhs[0] == "descendant") {
          return Step.DESCENDANT;
        } else if (rhs[0] == "descendant-or-self") {
          return Step.DESCENDANTORSELF;
        } else if (rhs[0] == "following") {
          return Step.FOLLOWING;
        } else if (rhs[0] == "following-sibling") {
          return Step.FOLLOWINGSIBLING;
        } else if (rhs[0] == "namespace") {
          return Step.NAMESPACE;
        } else if (rhs[0] == "parent") {
          return Step.PARENT;
        } else if (rhs[0] == "preceding") {
          return Step.PRECEDING;
        } else if (rhs[0] == "preceding-sibling") {
          return Step.PRECEDINGSIBLING;
        } else if (rhs[0] == "self") {
          return Step.SELF;
        }
        return -1;
      };
      this.reduceActions[57] = function(rhs) {
        return Step.ATTRIBUTE;
      };
      this.reduceActions[59] = function(rhs) {
        if (rhs[0] == "comment") {
          return new NodeTest(NodeTest.COMMENT, void 0);
        } else if (rhs[0] == "text") {
          return new NodeTest(NodeTest.TEXT, void 0);
        } else if (rhs[0] == "processing-instruction") {
          return new NodeTest(NodeTest.PI, void 0);
        } else if (rhs[0] == "node") {
          return new NodeTest(NodeTest.NODE, void 0);
        }
        return new NodeTest(-1, void 0);
      };
      this.reduceActions[60] = function(rhs) {
        return new NodeTest(NodeTest.PI, rhs[2]);
      };
      this.reduceActions[61] = function(rhs) {
        return rhs[1];
      };
      this.reduceActions[63] = function(rhs) {
        rhs[1].absolute = true;
        rhs[1].steps.unshift(new Step(Step.DESCENDANTORSELF, new NodeTest(NodeTest.NODE, void 0), []));
        return rhs[1];
      };
      this.reduceActions[64] = function(rhs) {
        rhs[0].steps.push(new Step(Step.DESCENDANTORSELF, new NodeTest(NodeTest.NODE, void 0), []));
        rhs[0].steps.push(rhs[2]);
        return rhs[0];
      };
      this.reduceActions[65] = function(rhs) {
        return new Step(Step.SELF, new NodeTest(NodeTest.NODE, void 0), []);
      };
      this.reduceActions[66] = function(rhs) {
        return new Step(Step.PARENT, new NodeTest(NodeTest.NODE, void 0), []);
      };
      this.reduceActions[67] = function(rhs) {
        return new VariableReference(rhs[1]);
      };
      this.reduceActions[68] = function(rhs) {
        return new NodeTest(NodeTest.NAMETESTANY, void 0);
      };
      this.reduceActions[69] = function(rhs) {
        var prefix = rhs[0].substring(0, rhs[0].indexOf(":"));
        return new NodeTest(NodeTest.NAMETESTPREFIXANY, prefix);
      };
      this.reduceActions[70] = function(rhs) {
        return new NodeTest(NodeTest.NAMETESTQNAME, rhs[0]);
      };
    };
    XPathParser.actionTable = [
      " s s        sssssssss    s ss  s  ss",
      "                 s                  ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "                rrrrr               ",
      " s s        sssssssss    s ss  s  ss",
      "rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
      " s s        sssssssss    s ss  s  ss",
      "                            s       ",
      "                            s       ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "  s                                 ",
      "                            s       ",
      " s           s  sssss          s  s ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "a                                   ",
      "r       s                    rr  r  ",
      "r      sr                    rr  r  ",
      "r   s  rr            s       rr  r  ",
      "r   rssrr            rss     rr  r  ",
      "r   rrrrr            rrrss   rr  r  ",
      "r   rrrrrsss         rrrrr   rr  r  ",
      "r   rrrrrrrr         rrrrr   rr  r  ",
      "r   rrrrrrrr         rrrrrs  rr  r  ",
      "r   rrrrrrrr         rrrrrr  rr  r  ",
      "r   rrrrrrrr         rrrrrr  rr  r  ",
      "r  srrrrrrrr         rrrrrrs rr sr  ",
      "r  srrrrrrrr         rrrrrrs rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r   rrrrrrrr         rrrrrr  rr  r  ",
      "r   rrrrrrrr         rrrrrr  rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "                sssss               ",
      "r  rrrrrrrrr         rrrrrrr rr sr  ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "                             s      ",
      "r  srrrrrrrr         rrrrrrs rr  r  ",
      "r   rrrrrrrr         rrrrr   rr  r  ",
      "              s                     ",
      "                             s      ",
      "                rrrrr               ",
      " s s        sssssssss    s sss s  ss",
      "r  srrrrrrrr         rrrrrrs rr  r  ",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s s        sssssssss      ss  s  ss",
      " s s        sssssssss    s ss  s  ss",
      " s           s  sssss          s  s ",
      " s           s  sssss          s  s ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      " s           s  sssss          s  s ",
      " s           s  sssss          s  s ",
      "r  rrrrrrrrr         rrrrrrr rr sr  ",
      "r  rrrrrrrrr         rrrrrrr rr sr  ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "                             s      ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "                             rr     ",
      "                             s      ",
      "                             rs     ",
      "r      sr                    rr  r  ",
      "r   s  rr            s       rr  r  ",
      "r   rssrr            rss     rr  r  ",
      "r   rssrr            rss     rr  r  ",
      "r   rrrrr            rrrss   rr  r  ",
      "r   rrrrr            rrrss   rr  r  ",
      "r   rrrrr            rrrss   rr  r  ",
      "r   rrrrr            rrrss   rr  r  ",
      "r   rrrrrsss         rrrrr   rr  r  ",
      "r   rrrrrsss         rrrrr   rr  r  ",
      "r   rrrrrrrr         rrrrr   rr  r  ",
      "r   rrrrrrrr         rrrrr   rr  r  ",
      "r   rrrrrrrr         rrrrr   rr  r  ",
      "r   rrrrrrrr         rrrrrr  rr  r  ",
      "                                 r  ",
      "                                 s  ",
      "r  srrrrrrrr         rrrrrrs rr  r  ",
      "r  srrrrrrrr         rrrrrrs rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr  r  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      " s s        sssssssss    s ss  s  ss",
      "r  rrrrrrrrr         rrrrrrr rr rr  ",
      "                             r      "
    ];
    XPathParser.actionTableNumber = [
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      "                 J                  ",
      "a  aaaaaaaaa         aaaaaaa aa  a  ",
      "                YYYYY               ",
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      `K1  KKKKKKKK .  +*)('KKKKKK  KK# K" `,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      "                            N       ",
      "                            O       ",
      "e  eeeeeeeee         eeeeeee ee ee  ",
      "f  fffffffff         fffffff ff ff  ",
      "d  ddddddddd         ddddddd dd dd  ",
      "B  BBBBBBBBB         BBBBBBB BB BB  ",
      "A  AAAAAAAAA         AAAAAAA AA AA  ",
      "  P                                 ",
      "                            Q       ",
      ` 1           .  +*)('          #  " `,
      "b  bbbbbbbbb         bbbbbbb bb  b  ",
      "                                    ",
      "!       S                    !!  !  ",
      '"      T"                    ""  "  ',
      "$   V  $$            U       $$  $  ",
      "&   &ZY&&            &XW     &&  &  ",
      ")   )))))            )))\\[   ))  )  ",
      ".   ....._^]         .....   ..  .  ",
      "1   11111111         11111   11  1  ",
      "5   55555555         55555`  55  5  ",
      "7   77777777         777777  77  7  ",
      "9   99999999         999999  99  9  ",
      ":  c::::::::         ::::::b :: a:  ",
      "I  fIIIIIIII         IIIIIIe II  I  ",
      "=  =========         ======= == ==  ",
      "?  ?????????         ??????? ?? ??  ",
      "C  CCCCCCCCC         CCCCCCC CC CC  ",
      "J   JJJJJJJJ         JJJJJJ  JJ  J  ",
      "M   MMMMMMMM         MMMMMM  MM  M  ",
      "N  NNNNNNNNN         NNNNNNN NN  N  ",
      "P  PPPPPPPPP         PPPPPPP PP  P  ",
      "                +*)('               ",
      "R  RRRRRRRRR         RRRRRRR RR aR  ",
      "U  UUUUUUUUU         UUUUUUU UU  U  ",
      "Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ",
      "c  ccccccccc         ccccccc cc cc  ",
      "                             j      ",
      "L  fLLLLLLLL         LLLLLLe LL  L  ",
      "6   66666666         66666   66  6  ",
      "              k                     ",
      "                             l      ",
      "                XXXXX               ",
      ` 1 0        /.-,+*)('    & %$m #  "!`,
      "_  f________         ______e __  _  ",
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1 0        /.-,+*)('      %$  #  "!`,
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      ` 1           .  +*)('          #  " `,
      ` 1           .  +*)('          #  " `,
      ">  >>>>>>>>>         >>>>>>> >> >>  ",
      ` 1           .  +*)('          #  " `,
      ` 1           .  +*)('          #  " `,
      "Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ",
      "V  VVVVVVVVV         VVVVVVV VV aV  ",
      "T  TTTTTTTTT         TTTTTTT TT  T  ",
      "@  @@@@@@@@@         @@@@@@@ @@ @@  ",
      "                             \x87      ",
      "[  [[[[[[[[[         [[[[[[[ [[ [[  ",
      "D  DDDDDDDDD         DDDDDDD DD DD  ",
      "                             HH     ",
      "                             \x88      ",
      "                             F\x89     ",
      "#      T#                    ##  #  ",
      "%   V  %%            U       %%  %  ",
      "'   'ZY''            'XW     ''  '  ",
      "(   (ZY((            (XW     ((  (  ",
      "+   +++++            +++\\[   ++  +  ",
      "*   *****            ***\\[   **  *  ",
      "-   -----            ---\\[   --  -  ",
      ",   ,,,,,            ,,,\\[   ,,  ,  ",
      "0   00000_^]         00000   00  0  ",
      "/   /////_^]         /////   //  /  ",
      "2   22222222         22222   22  2  ",
      "3   33333333         33333   33  3  ",
      "4   44444444         44444   44  4  ",
      "8   88888888         888888  88  8  ",
      "                                 ^  ",
      "                                 \x8A  ",
      ";  f;;;;;;;;         ;;;;;;e ;;  ;  ",
      "<  f<<<<<<<<         <<<<<<e <<  <  ",
      "O  OOOOOOOOO         OOOOOOO OO  O  ",
      "`  `````````         ``````` ``  `  ",
      "S  SSSSSSSSS         SSSSSSS SS  S  ",
      "W  WWWWWWWWW         WWWWWWW WW  W  ",
      "\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ",
      "E  EEEEEEEEE         EEEEEEE EE EE  ",
      ` 1 0        /.-,+*)('    & %$  #  "!`,
      "]  ]]]]]]]]]         ]]]]]]] ]] ]]  ",
      "                             G      "
    ];
    XPathParser.gotoTable = [
      "3456789:;<=>?@ AB  CDEFGH IJ ",
      "                             ",
      "                             ",
      "                             ",
      "L456789:;<=>?@ AB  CDEFGH IJ ",
      "            M        EFGH IJ ",
      "       N;<=>?@ AB  CDEFGH IJ ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "            S        EFGH IJ ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "              e              ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                        h  J ",
      "              i          j   ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "o456789:;<=>?@ ABpqCDEFGH IJ ",
      "                             ",
      "  r6789:;<=>?@ AB  CDEFGH IJ ",
      "   s789:;<=>?@ AB  CDEFGH IJ ",
      "    t89:;<=>?@ AB  CDEFGH IJ ",
      "    u89:;<=>?@ AB  CDEFGH IJ ",
      "     v9:;<=>?@ AB  CDEFGH IJ ",
      "     w9:;<=>?@ AB  CDEFGH IJ ",
      "     x9:;<=>?@ AB  CDEFGH IJ ",
      "     y9:;<=>?@ AB  CDEFGH IJ ",
      "      z:;<=>?@ AB  CDEFGH IJ ",
      "      {:;<=>?@ AB  CDEFGH IJ ",
      "       |;<=>?@ AB  CDEFGH IJ ",
      "       };<=>?@ AB  CDEFGH IJ ",
      "       ~;<=>?@ AB  CDEFGH IJ ",
      "         \x7F=>?@ AB  CDEFGH IJ ",
      "\x80456789:;<=>?@ AB  CDEFGH IJ\x81",
      "            \x82        EFGH IJ ",
      "            \x83        EFGH IJ ",
      "                             ",
      "                     \x84 GH IJ ",
      "                     \x85 GH IJ ",
      "              i          \x86   ",
      "              i          \x87   ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "                             ",
      "o456789:;<=>?@ AB\x8CqCDEFGH IJ ",
      "                             ",
      "                             "
    ];
    XPathParser.productions = [
      [1, 1, 2],
      [2, 1, 3],
      [3, 1, 4],
      [3, 3, 3, -9, 4],
      [4, 1, 5],
      [4, 3, 4, -8, 5],
      [5, 1, 6],
      [5, 3, 5, -22, 6],
      [5, 3, 5, -5, 6],
      [6, 1, 7],
      [6, 3, 6, -23, 7],
      [6, 3, 6, -24, 7],
      [6, 3, 6, -6, 7],
      [6, 3, 6, -7, 7],
      [7, 1, 8],
      [7, 3, 7, -25, 8],
      [7, 3, 7, -26, 8],
      [8, 1, 9],
      [8, 3, 8, -12, 9],
      [8, 3, 8, -11, 9],
      [8, 3, 8, -10, 9],
      [9, 1, 10],
      [9, 2, -26, 9],
      [10, 1, 11],
      [10, 3, 10, -27, 11],
      [11, 1, 12],
      [11, 1, 13],
      [11, 3, 13, -28, 14],
      [11, 3, 13, -4, 14],
      [13, 1, 15],
      [13, 2, 13, 16],
      [15, 1, 17],
      [15, 3, -29, 2, -30],
      [15, 1, -15],
      [15, 1, -16],
      [15, 1, 18],
      [18, 3, -13, -29, -30],
      [18, 4, -13, -29, 19, -30],
      [19, 1, 20],
      [19, 3, 20, -31, 19],
      [20, 1, 2],
      [12, 1, 14],
      [12, 1, 21],
      [21, 1, -28],
      [21, 2, -28, 14],
      [21, 1, 22],
      [14, 1, 23],
      [14, 3, 14, -28, 23],
      [14, 1, 24],
      [23, 2, 25, 26],
      [23, 1, 26],
      [23, 3, 25, 26, 27],
      [23, 2, 26, 27],
      [23, 1, 28],
      [27, 1, 16],
      [27, 2, 16, 27],
      [25, 2, -14, -3],
      [25, 1, -32],
      [26, 1, 29],
      [26, 3, -20, -29, -30],
      [26, 4, -21, -29, -15, -30],
      [16, 3, -33, 30, -34],
      [30, 1, 2],
      [22, 2, -4, 14],
      [24, 3, 14, -4, 23],
      [28, 1, -35],
      [28, 1, -2],
      [17, 2, -36, -18],
      [29, 1, -17],
      [29, 1, -19],
      [29, 1, -18]
    ];
    XPathParser.DOUBLEDOT = 2;
    XPathParser.DOUBLECOLON = 3;
    XPathParser.DOUBLESLASH = 4;
    XPathParser.NOTEQUAL = 5;
    XPathParser.LESSTHANOREQUAL = 6;
    XPathParser.GREATERTHANOREQUAL = 7;
    XPathParser.AND = 8;
    XPathParser.OR = 9;
    XPathParser.MOD = 10;
    XPathParser.DIV = 11;
    XPathParser.MULTIPLYOPERATOR = 12;
    XPathParser.FUNCTIONNAME = 13;
    XPathParser.AXISNAME = 14;
    XPathParser.LITERAL = 15;
    XPathParser.NUMBER = 16;
    XPathParser.ASTERISKNAMETEST = 17;
    XPathParser.QNAME = 18;
    XPathParser.NCNAMECOLONASTERISK = 19;
    XPathParser.NODETYPE = 20;
    XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL = 21;
    XPathParser.EQUALS = 22;
    XPathParser.LESSTHAN = 23;
    XPathParser.GREATERTHAN = 24;
    XPathParser.PLUS = 25;
    XPathParser.MINUS = 26;
    XPathParser.BAR = 27;
    XPathParser.SLASH = 28;
    XPathParser.LEFTPARENTHESIS = 29;
    XPathParser.RIGHTPARENTHESIS = 30;
    XPathParser.COMMA = 31;
    XPathParser.AT = 32;
    XPathParser.LEFTBRACKET = 33;
    XPathParser.RIGHTBRACKET = 34;
    XPathParser.DOT = 35;
    XPathParser.DOLLAR = 36;
    XPathParser.prototype.tokenize = function(s1) {
      var types = [];
      var values = [];
      var s = s1 + "\0";
      var pos = 0;
      var c = s.charAt(pos++);
      while (1) {
        while (c == " " || c == "	" || c == "\r" || c == "\n") {
          c = s.charAt(pos++);
        }
        if (c == "\0" || pos >= s.length) {
          break;
        }
        if (c == "(") {
          types.push(XPathParser.LEFTPARENTHESIS);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == ")") {
          types.push(XPathParser.RIGHTPARENTHESIS);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == "[") {
          types.push(XPathParser.LEFTBRACKET);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == "]") {
          types.push(XPathParser.RIGHTBRACKET);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == "@") {
          types.push(XPathParser.AT);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == ",") {
          types.push(XPathParser.COMMA);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == "|") {
          types.push(XPathParser.BAR);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == "+") {
          types.push(XPathParser.PLUS);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == "-") {
          types.push(XPathParser.MINUS);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == "=") {
          types.push(XPathParser.EQUALS);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == "$") {
          types.push(XPathParser.DOLLAR);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == ".") {
          c = s.charAt(pos++);
          if (c == ".") {
            types.push(XPathParser.DOUBLEDOT);
            values.push("..");
            c = s.charAt(pos++);
            continue;
          }
          if (c >= "0" && c <= "9") {
            var number = "." + c;
            c = s.charAt(pos++);
            while (c >= "0" && c <= "9") {
              number += c;
              c = s.charAt(pos++);
            }
            types.push(XPathParser.NUMBER);
            values.push(number);
            continue;
          }
          types.push(XPathParser.DOT);
          values.push(".");
          continue;
        }
        if (c == "'" || c == '"') {
          var delimiter = c;
          var literal = "";
          while ((c = s.charAt(pos++)) != delimiter) {
            literal += c;
          }
          types.push(XPathParser.LITERAL);
          values.push(literal);
          c = s.charAt(pos++);
          continue;
        }
        if (c >= "0" && c <= "9") {
          var number = c;
          c = s.charAt(pos++);
          while (c >= "0" && c <= "9") {
            number += c;
            c = s.charAt(pos++);
          }
          if (c == ".") {
            if (s.charAt(pos) >= "0" && s.charAt(pos) <= "9") {
              number += c;
              number += s.charAt(pos++);
              c = s.charAt(pos++);
              while (c >= "0" && c <= "9") {
                number += c;
                c = s.charAt(pos++);
              }
            }
          }
          types.push(XPathParser.NUMBER);
          values.push(number);
          continue;
        }
        if (c == "*") {
          if (types.length > 0) {
            var last = types[types.length - 1];
            if (last != XPathParser.AT && last != XPathParser.DOUBLECOLON && last != XPathParser.LEFTPARENTHESIS && last != XPathParser.LEFTBRACKET && last != XPathParser.AND && last != XPathParser.OR && last != XPathParser.MOD && last != XPathParser.DIV && last != XPathParser.MULTIPLYOPERATOR && last != XPathParser.SLASH && last != XPathParser.DOUBLESLASH && last != XPathParser.BAR && last != XPathParser.PLUS && last != XPathParser.MINUS && last != XPathParser.EQUALS && last != XPathParser.NOTEQUAL && last != XPathParser.LESSTHAN && last != XPathParser.LESSTHANOREQUAL && last != XPathParser.GREATERTHAN && last != XPathParser.GREATERTHANOREQUAL) {
              types.push(XPathParser.MULTIPLYOPERATOR);
              values.push(c);
              c = s.charAt(pos++);
              continue;
            }
          }
          types.push(XPathParser.ASTERISKNAMETEST);
          values.push(c);
          c = s.charAt(pos++);
          continue;
        }
        if (c == ":") {
          if (s.charAt(pos) == ":") {
            types.push(XPathParser.DOUBLECOLON);
            values.push("::");
            pos++;
            c = s.charAt(pos++);
            continue;
          }
        }
        if (c == "/") {
          c = s.charAt(pos++);
          if (c == "/") {
            types.push(XPathParser.DOUBLESLASH);
            values.push("//");
            c = s.charAt(pos++);
            continue;
          }
          types.push(XPathParser.SLASH);
          values.push("/");
          continue;
        }
        if (c == "!") {
          if (s.charAt(pos) == "=") {
            types.push(XPathParser.NOTEQUAL);
            values.push("!=");
            pos++;
            c = s.charAt(pos++);
            continue;
          }
        }
        if (c == "<") {
          if (s.charAt(pos) == "=") {
            types.push(XPathParser.LESSTHANOREQUAL);
            values.push("<=");
            pos++;
            c = s.charAt(pos++);
            continue;
          }
          types.push(XPathParser.LESSTHAN);
          values.push("<");
          c = s.charAt(pos++);
          continue;
        }
        if (c == ">") {
          if (s.charAt(pos) == "=") {
            types.push(XPathParser.GREATERTHANOREQUAL);
            values.push(">=");
            pos++;
            c = s.charAt(pos++);
            continue;
          }
          types.push(XPathParser.GREATERTHAN);
          values.push(">");
          c = s.charAt(pos++);
          continue;
        }
        if (c == "_" || Utilities.isLetter(c.charCodeAt(0))) {
          var name = c;
          c = s.charAt(pos++);
          while (Utilities.isNCNameChar(c.charCodeAt(0))) {
            name += c;
            c = s.charAt(pos++);
          }
          if (types.length > 0) {
            var last = types[types.length - 1];
            if (last != XPathParser.AT && last != XPathParser.DOUBLECOLON && last != XPathParser.LEFTPARENTHESIS && last != XPathParser.LEFTBRACKET && last != XPathParser.AND && last != XPathParser.OR && last != XPathParser.MOD && last != XPathParser.DIV && last != XPathParser.MULTIPLYOPERATOR && last != XPathParser.SLASH && last != XPathParser.DOUBLESLASH && last != XPathParser.BAR && last != XPathParser.PLUS && last != XPathParser.MINUS && last != XPathParser.EQUALS && last != XPathParser.NOTEQUAL && last != XPathParser.LESSTHAN && last != XPathParser.LESSTHANOREQUAL && last != XPathParser.GREATERTHAN && last != XPathParser.GREATERTHANOREQUAL) {
              if (name == "and") {
                types.push(XPathParser.AND);
                values.push(name);
                continue;
              }
              if (name == "or") {
                types.push(XPathParser.OR);
                values.push(name);
                continue;
              }
              if (name == "mod") {
                types.push(XPathParser.MOD);
                values.push(name);
                continue;
              }
              if (name == "div") {
                types.push(XPathParser.DIV);
                values.push(name);
                continue;
              }
            }
          }
          if (c == ":") {
            if (s.charAt(pos) == "*") {
              types.push(XPathParser.NCNAMECOLONASTERISK);
              values.push(name + ":*");
              pos++;
              c = s.charAt(pos++);
              continue;
            }
            if (s.charAt(pos) == "_" || Utilities.isLetter(s.charCodeAt(pos))) {
              name += ":";
              c = s.charAt(pos++);
              while (Utilities.isNCNameChar(c.charCodeAt(0))) {
                name += c;
                c = s.charAt(pos++);
              }
              if (c == "(") {
                types.push(XPathParser.FUNCTIONNAME);
                values.push(name);
                continue;
              }
              types.push(XPathParser.QNAME);
              values.push(name);
              continue;
            }
            if (s.charAt(pos) == ":") {
              types.push(XPathParser.AXISNAME);
              values.push(name);
              continue;
            }
          }
          if (c == "(") {
            if (name == "comment" || name == "text" || name == "node") {
              types.push(XPathParser.NODETYPE);
              values.push(name);
              continue;
            }
            if (name == "processing-instruction") {
              if (s.charAt(pos) == ")") {
                types.push(XPathParser.NODETYPE);
              } else {
                types.push(XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL);
              }
              values.push(name);
              continue;
            }
            types.push(XPathParser.FUNCTIONNAME);
            values.push(name);
            continue;
          }
          types.push(XPathParser.QNAME);
          values.push(name);
          continue;
        }
        throw new Error("Unexpected character " + c);
      }
      types.push(1);
      values.push("[EOF]");
      return [types, values];
    };
    XPathParser.SHIFT = "s";
    XPathParser.REDUCE = "r";
    XPathParser.ACCEPT = "a";
    XPathParser.prototype.parse = function(s) {
      var types;
      var values;
      var res = this.tokenize(s);
      if (res == void 0) {
        return void 0;
      }
      types = res[0];
      values = res[1];
      var tokenPos = 0;
      var state = [];
      var tokenType = [];
      var tokenValue = [];
      var s;
      var a;
      var t;
      state.push(0);
      tokenType.push(1);
      tokenValue.push("_S");
      a = types[tokenPos];
      t = values[tokenPos++];
      while (1) {
        s = state[state.length - 1];
        switch (XPathParser.actionTable[s].charAt(a - 1)) {
          case XPathParser.SHIFT:
            tokenType.push(-a);
            tokenValue.push(t);
            state.push(XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32);
            a = types[tokenPos];
            t = values[tokenPos++];
            break;
          case XPathParser.REDUCE:
            var num = XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][1];
            var rhs = [];
            for (var i = 0; i < num; i++) {
              tokenType.pop();
              rhs.unshift(tokenValue.pop());
              state.pop();
            }
            var s_ = state[state.length - 1];
            tokenType.push(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0]);
            if (this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32] == void 0) {
              tokenValue.push(rhs[0]);
            } else {
              tokenValue.push(this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32](rhs));
            }
            state.push(XPathParser.gotoTable[s_].charCodeAt(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0] - 2) - 33);
            break;
          case XPathParser.ACCEPT:
            return new XPath(tokenValue.pop());
          default:
            throw new Error("XPath parse error");
        }
      }
    };
    XPath.prototype = new Object();
    XPath.prototype.constructor = XPath;
    XPath.superclass = Object.prototype;
    function XPath(e) {
      this.expression = e;
    }
    XPath.prototype.toString = function() {
      return this.expression.toString();
    };
    XPath.prototype.evaluate = function(c) {
      c.contextNode = c.expressionContextNode;
      c.contextSize = 1;
      c.contextPosition = 1;
      c.caseInsensitive = false;
      if (c.contextNode != null) {
        var doc = c.contextNode;
        if (doc.nodeType != 9) {
          doc = doc.ownerDocument;
        }
        try {
          c.caseInsensitive = doc.implementation.hasFeature("HTML", "2.0");
        } catch (e) {
          c.caseInsensitive = true;
        }
      }
      return this.expression.evaluate(c);
    };
    XPath.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
    XPath.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";
    Expression.prototype = new Object();
    Expression.prototype.constructor = Expression;
    Expression.superclass = Object.prototype;
    function Expression() {
    }
    Expression.prototype.init = function() {
    };
    Expression.prototype.toString = function() {
      return "<Expression>";
    };
    Expression.prototype.evaluate = function(c) {
      throw new Error("Could not evaluate expression.");
    };
    UnaryOperation.prototype = new Expression();
    UnaryOperation.prototype.constructor = UnaryOperation;
    UnaryOperation.superclass = Expression.prototype;
    function UnaryOperation(rhs) {
      if (arguments.length > 0) {
        this.init(rhs);
      }
    }
    UnaryOperation.prototype.init = function(rhs) {
      this.rhs = rhs;
    };
    UnaryMinusOperation.prototype = new UnaryOperation();
    UnaryMinusOperation.prototype.constructor = UnaryMinusOperation;
    UnaryMinusOperation.superclass = UnaryOperation.prototype;
    function UnaryMinusOperation(rhs) {
      if (arguments.length > 0) {
        this.init(rhs);
      }
    }
    UnaryMinusOperation.prototype.init = function(rhs) {
      UnaryMinusOperation.superclass.init.call(this, rhs);
    };
    UnaryMinusOperation.prototype.evaluate = function(c) {
      return this.rhs.evaluate(c).number().negate();
    };
    UnaryMinusOperation.prototype.toString = function() {
      return "-" + this.rhs.toString();
    };
    BinaryOperation.prototype = new Expression();
    BinaryOperation.prototype.constructor = BinaryOperation;
    BinaryOperation.superclass = Expression.prototype;
    function BinaryOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    BinaryOperation.prototype.init = function(lhs, rhs) {
      this.lhs = lhs;
      this.rhs = rhs;
    };
    OrOperation.prototype = new BinaryOperation();
    OrOperation.prototype.constructor = OrOperation;
    OrOperation.superclass = BinaryOperation.prototype;
    function OrOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    OrOperation.prototype.init = function(lhs, rhs) {
      OrOperation.superclass.init.call(this, lhs, rhs);
    };
    OrOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")";
    };
    OrOperation.prototype.evaluate = function(c) {
      var b = this.lhs.evaluate(c).bool();
      if (b.booleanValue()) {
        return b;
      }
      return this.rhs.evaluate(c).bool();
    };
    AndOperation.prototype = new BinaryOperation();
    AndOperation.prototype.constructor = AndOperation;
    AndOperation.superclass = BinaryOperation.prototype;
    function AndOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    AndOperation.prototype.init = function(lhs, rhs) {
      AndOperation.superclass.init.call(this, lhs, rhs);
    };
    AndOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")";
    };
    AndOperation.prototype.evaluate = function(c) {
      var b = this.lhs.evaluate(c).bool();
      if (!b.booleanValue()) {
        return b;
      }
      return this.rhs.evaluate(c).bool();
    };
    EqualsOperation.prototype = new BinaryOperation();
    EqualsOperation.prototype.constructor = EqualsOperation;
    EqualsOperation.superclass = BinaryOperation.prototype;
    function EqualsOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    EqualsOperation.prototype.init = function(lhs, rhs) {
      EqualsOperation.superclass.init.call(this, lhs, rhs);
    };
    EqualsOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")";
    };
    EqualsOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).equals(this.rhs.evaluate(c));
    };
    NotEqualOperation.prototype = new BinaryOperation();
    NotEqualOperation.prototype.constructor = NotEqualOperation;
    NotEqualOperation.superclass = BinaryOperation.prototype;
    function NotEqualOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    NotEqualOperation.prototype.init = function(lhs, rhs) {
      NotEqualOperation.superclass.init.call(this, lhs, rhs);
    };
    NotEqualOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")";
    };
    NotEqualOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).notequal(this.rhs.evaluate(c));
    };
    LessThanOperation.prototype = new BinaryOperation();
    LessThanOperation.prototype.constructor = LessThanOperation;
    LessThanOperation.superclass = BinaryOperation.prototype;
    function LessThanOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    LessThanOperation.prototype.init = function(lhs, rhs) {
      LessThanOperation.superclass.init.call(this, lhs, rhs);
    };
    LessThanOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).lessthan(this.rhs.evaluate(c));
    };
    LessThanOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")";
    };
    GreaterThanOperation.prototype = new BinaryOperation();
    GreaterThanOperation.prototype.constructor = GreaterThanOperation;
    GreaterThanOperation.superclass = BinaryOperation.prototype;
    function GreaterThanOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    GreaterThanOperation.prototype.init = function(lhs, rhs) {
      GreaterThanOperation.superclass.init.call(this, lhs, rhs);
    };
    GreaterThanOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).greaterthan(this.rhs.evaluate(c));
    };
    GreaterThanOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")";
    };
    LessThanOrEqualOperation.prototype = new BinaryOperation();
    LessThanOrEqualOperation.prototype.constructor = LessThanOrEqualOperation;
    LessThanOrEqualOperation.superclass = BinaryOperation.prototype;
    function LessThanOrEqualOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    LessThanOrEqualOperation.prototype.init = function(lhs, rhs) {
      LessThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
    };
    LessThanOrEqualOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).lessthanorequal(this.rhs.evaluate(c));
    };
    LessThanOrEqualOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")";
    };
    GreaterThanOrEqualOperation.prototype = new BinaryOperation();
    GreaterThanOrEqualOperation.prototype.constructor = GreaterThanOrEqualOperation;
    GreaterThanOrEqualOperation.superclass = BinaryOperation.prototype;
    function GreaterThanOrEqualOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    GreaterThanOrEqualOperation.prototype.init = function(lhs, rhs) {
      GreaterThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
    };
    GreaterThanOrEqualOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).greaterthanorequal(this.rhs.evaluate(c));
    };
    GreaterThanOrEqualOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")";
    };
    PlusOperation.prototype = new BinaryOperation();
    PlusOperation.prototype.constructor = PlusOperation;
    PlusOperation.superclass = BinaryOperation.prototype;
    function PlusOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    PlusOperation.prototype.init = function(lhs, rhs) {
      PlusOperation.superclass.init.call(this, lhs, rhs);
    };
    PlusOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).number().plus(this.rhs.evaluate(c).number());
    };
    PlusOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")";
    };
    MinusOperation.prototype = new BinaryOperation();
    MinusOperation.prototype.constructor = MinusOperation;
    MinusOperation.superclass = BinaryOperation.prototype;
    function MinusOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    MinusOperation.prototype.init = function(lhs, rhs) {
      MinusOperation.superclass.init.call(this, lhs, rhs);
    };
    MinusOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).number().minus(this.rhs.evaluate(c).number());
    };
    MinusOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")";
    };
    MultiplyOperation.prototype = new BinaryOperation();
    MultiplyOperation.prototype.constructor = MultiplyOperation;
    MultiplyOperation.superclass = BinaryOperation.prototype;
    function MultiplyOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    MultiplyOperation.prototype.init = function(lhs, rhs) {
      MultiplyOperation.superclass.init.call(this, lhs, rhs);
    };
    MultiplyOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).number().multiply(this.rhs.evaluate(c).number());
    };
    MultiplyOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")";
    };
    DivOperation.prototype = new BinaryOperation();
    DivOperation.prototype.constructor = DivOperation;
    DivOperation.superclass = BinaryOperation.prototype;
    function DivOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    DivOperation.prototype.init = function(lhs, rhs) {
      DivOperation.superclass.init.call(this, lhs, rhs);
    };
    DivOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).number().div(this.rhs.evaluate(c).number());
    };
    DivOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")";
    };
    ModOperation.prototype = new BinaryOperation();
    ModOperation.prototype.constructor = ModOperation;
    ModOperation.superclass = BinaryOperation.prototype;
    function ModOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    ModOperation.prototype.init = function(lhs, rhs) {
      ModOperation.superclass.init.call(this, lhs, rhs);
    };
    ModOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).number().mod(this.rhs.evaluate(c).number());
    };
    ModOperation.prototype.toString = function() {
      return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")";
    };
    BarOperation.prototype = new BinaryOperation();
    BarOperation.prototype.constructor = BarOperation;
    BarOperation.superclass = BinaryOperation.prototype;
    function BarOperation(lhs, rhs) {
      if (arguments.length > 0) {
        this.init(lhs, rhs);
      }
    }
    BarOperation.prototype.init = function(lhs, rhs) {
      BarOperation.superclass.init.call(this, lhs, rhs);
    };
    BarOperation.prototype.evaluate = function(c) {
      return this.lhs.evaluate(c).nodeset().union(this.rhs.evaluate(c).nodeset());
    };
    BarOperation.prototype.toString = function() {
      return this.lhs.toString() + " | " + this.rhs.toString();
    };
    PathExpr.prototype = new Expression();
    PathExpr.prototype.constructor = PathExpr;
    PathExpr.superclass = Expression.prototype;
    function PathExpr(filter, filterPreds, locpath) {
      if (arguments.length > 0) {
        this.init(filter, filterPreds, locpath);
      }
    }
    PathExpr.prototype.init = function(filter, filterPreds, locpath) {
      PathExpr.superclass.init.call(this);
      this.filter = filter;
      this.filterPredicates = filterPreds;
      this.locationPath = locpath;
    };
    PathExpr.prototype.evaluate = function(c) {
      var nodes;
      var xpc = new XPathContext();
      xpc.variableResolver = c.variableResolver;
      xpc.functionResolver = c.functionResolver;
      xpc.namespaceResolver = c.namespaceResolver;
      xpc.expressionContextNode = c.expressionContextNode;
      xpc.virtualRoot = c.virtualRoot;
      xpc.caseInsensitive = c.caseInsensitive;
      if (this.filter == null) {
        nodes = [c.contextNode];
      } else {
        var ns = this.filter.evaluate(c);
        if (!Utilities.instance_of(ns, XNodeSet)) {
          if (this.filterPredicates != null && this.filterPredicates.length > 0 || this.locationPath != null) {
            throw new Error("Path expression filter must evaluate to a nodset if predicates or location path are used");
          }
          return ns;
        }
        nodes = ns.toArray();
        if (this.filterPredicates != null) {
          for (var j = 0; j < this.filterPredicates.length; j++) {
            var pred = this.filterPredicates[j];
            var newNodes = [];
            xpc.contextSize = nodes.length;
            for (xpc.contextPosition = 1; xpc.contextPosition <= xpc.contextSize; xpc.contextPosition++) {
              xpc.contextNode = nodes[xpc.contextPosition - 1];
              if (this.predicateMatches(pred, xpc)) {
                newNodes.push(xpc.contextNode);
              }
            }
            nodes = newNodes;
          }
        }
      }
      if (this.locationPath != null) {
        if (this.locationPath.absolute) {
          if (nodes[0].nodeType != 9) {
            if (xpc.virtualRoot != null) {
              nodes = [xpc.virtualRoot];
            } else {
              if (nodes[0].ownerDocument == null) {
                var n = nodes[0];
                while (n.parentNode != null) {
                  n = n.parentNode;
                }
                nodes = [n];
              } else {
                nodes = [nodes[0].ownerDocument];
              }
            }
          } else {
            nodes = [nodes[0]];
          }
        }
        for (var i = 0; i < this.locationPath.steps.length; i++) {
          var step = this.locationPath.steps[i];
          var newNodes = [];
          var newLocalContext = [];
          for (var j = 0; j < nodes.length; j++) {
            xpc.contextNode = nodes[j];
            switch (step.axis) {
              case Step.ANCESTOR:
                if (xpc.contextNode === xpc.virtualRoot) {
                  break;
                }
                var m;
                if (xpc.contextNode.nodeType == 2) {
                  m = this.getOwnerElement(xpc.contextNode);
                } else {
                  m = xpc.contextNode.parentNode;
                }
                while (m != null) {
                  if (step.nodeTest.matches(m, xpc)) {
                    newNodes.push(m);
                  }
                  if (m === xpc.virtualRoot) {
                    break;
                  }
                  m = m.parentNode;
                }
                break;
              case Step.ANCESTORORSELF:
                for (var m = xpc.contextNode; m != null; m = m.nodeType == 2 ? this.getOwnerElement(m) : m.parentNode) {
                  if (step.nodeTest.matches(m, xpc)) {
                    newNodes.push(m);
                  }
                  if (m === xpc.virtualRoot) {
                    break;
                  }
                }
                break;
              case Step.ATTRIBUTE:
                var nnm = xpc.contextNode.attributes;
                if (nnm != null) {
                  for (var k = 0; k < nnm.length; k++) {
                    var m = nnm.item(k);
                    if (step.nodeTest.matches(m, xpc)) {
                      newNodes.push(m);
                    }
                  }
                }
                break;
              case Step.CHILD:
                var pos = 0;
                var tmpContext = [];
                for (var m = xpc.contextNode.firstChild; m != null; m = m.nextSibling) {
                  if (step.nodeTest.matches(m, xpc)) {
                    newNodes.push(m);
                    tmpContext.push({ contextPosition: ++pos });
                  }
                }
                for (var k = 0; k < tmpContext.length; k++) {
                  tmpContext[k].contextSize = pos;
                  newLocalContext.push(tmpContext[k]);
                }
                break;
              case Step.DESCENDANT:
                var st = [xpc.contextNode.firstChild];
                while (st.length > 0) {
                  for (var m = st.pop(); m != null; ) {
                    if (step.nodeTest.matches(m, xpc)) {
                      newNodes.push(m);
                    }
                    if (m.firstChild != null) {
                      st.push(m.nextSibling);
                      m = m.firstChild;
                    } else {
                      m = m.nextSibling;
                    }
                  }
                }
                break;
              case Step.DESCENDANTORSELF:
                if (step.nodeTest.matches(xpc.contextNode, xpc)) {
                  newNodes.push(xpc.contextNode);
                }
                var st = [xpc.contextNode.firstChild];
                while (st.length > 0) {
                  for (var m = st.pop(); m != null; ) {
                    if (step.nodeTest.matches(m, xpc)) {
                      newNodes.push(m);
                    }
                    if (m.firstChild != null) {
                      st.push(m.nextSibling);
                      m = m.firstChild;
                    } else {
                      m = m.nextSibling;
                    }
                  }
                }
                break;
              case Step.FOLLOWING:
                if (xpc.contextNode === xpc.virtualRoot) {
                  break;
                }
                var st = [];
                if (xpc.contextNode.firstChild != null) {
                  st.unshift(xpc.contextNode.firstChild);
                } else {
                  st.unshift(xpc.contextNode.nextSibling);
                }
                for (var m = xpc.contextNode; m != null && m.nodeType != 9 && m !== xpc.virtualRoot; m = m.parentNode) {
                  st.unshift(m.nextSibling);
                }
                do {
                  for (var m = st.pop(); m != null; ) {
                    if (step.nodeTest.matches(m, xpc)) {
                      newNodes.push(m);
                    }
                    if (m.firstChild != null) {
                      st.push(m.nextSibling);
                      m = m.firstChild;
                    } else {
                      m = m.nextSibling;
                    }
                  }
                } while (st.length > 0);
                break;
              case Step.FOLLOWINGSIBLING:
                if (xpc.contextNode === xpc.virtualRoot) {
                  break;
                }
                for (var m = xpc.contextNode.nextSibling; m != null; m = m.nextSibling) {
                  if (step.nodeTest.matches(m, xpc)) {
                    newNodes.push(m);
                  }
                }
                break;
              case Step.NAMESPACE:
                var n = {};
                if (xpc.contextNode.nodeType == 1) {
                  n["xml"] = XPath.XML_NAMESPACE_URI;
                  n["xmlns"] = XPath.XMLNS_NAMESPACE_URI;
                  for (var m = xpc.contextNode; m != null && m.nodeType == 1; m = m.parentNode) {
                    for (var k = 0; k < m.attributes.length; k++) {
                      var attr = m.attributes.item(k);
                      var nm = String(attr.name);
                      if (nm == "xmlns") {
                        if (n[""] == void 0) {
                          n[""] = attr.value;
                        }
                      } else if (nm.length > 6 && nm.substring(0, 6) == "xmlns:") {
                        var pre = nm.substring(6, nm.length);
                        if (n[pre] == void 0) {
                          n[pre] = attr.value;
                        }
                      }
                    }
                  }
                  for (var pre in n) {
                    var nsn = new NamespaceNode(pre, n[pre], xpc.contextNode);
                    if (step.nodeTest.matches(nsn, xpc)) {
                      newNodes.push(nsn);
                    }
                  }
                }
                break;
              case Step.PARENT:
                m = null;
                if (xpc.contextNode !== xpc.virtualRoot) {
                  if (xpc.contextNode.nodeType == 2) {
                    m = this.getOwnerElement(xpc.contextNode);
                  } else {
                    m = xpc.contextNode.parentNode;
                  }
                }
                if (m != null && step.nodeTest.matches(m, xpc)) {
                  newNodes.push(m);
                }
                break;
              case Step.PRECEDING:
                var st;
                if (xpc.virtualRoot != null) {
                  st = [xpc.virtualRoot];
                } else {
                  st = xpc.contextNode.nodeType == 9 ? [xpc.contextNode] : [xpc.contextNode.ownerDocument];
                }
                outer:
                  while (st.length > 0) {
                    for (var m = st.pop(); m != null; ) {
                      if (m == xpc.contextNode) {
                        break outer;
                      }
                      if (step.nodeTest.matches(m, xpc)) {
                        newNodes.unshift(m);
                      }
                      if (m.firstChild != null) {
                        st.push(m.nextSibling);
                        m = m.firstChild;
                      } else {
                        m = m.nextSibling;
                      }
                    }
                  }
                break;
              case Step.PRECEDINGSIBLING:
                if (xpc.contextNode === xpc.virtualRoot) {
                  break;
                }
                for (var m = xpc.contextNode.previousSibling; m != null; m = m.previousSibling) {
                  if (step.nodeTest.matches(m, xpc)) {
                    newNodes.push(m);
                  }
                }
                break;
              case Step.SELF:
                if (step.nodeTest.matches(xpc.contextNode, xpc)) {
                  newNodes.push(xpc.contextNode);
                }
                break;
              default:
            }
          }
          nodes = newNodes;
          for (var j = 0; j < step.predicates.length; j++) {
            var pred = step.predicates[j];
            var newNodes = [];
            xpc.contextSize = nodes.length;
            for (xpc.contextPosition = 1; xpc.contextPosition <= xpc.contextSize; xpc.contextPosition++) {
              xpc.contextNode = nodes[xpc.contextPosition - 1];
              var localCtx = newLocalContext.length > 0 ? this.getLocalCtx(xpc, newLocalContext[xpc.contextPosition - 1]) : xpc;
              if (this.predicateMatches(pred, localCtx)) {
                newNodes.push(xpc.contextNode);
              } else {
              }
            }
            nodes = newNodes;
          }
        }
      }
      var ns = new XNodeSet();
      ns.addArray(nodes);
      return ns;
    };
    PathExpr.prototype.getLocalCtx = function(xpc, localCtx, length) {
      var res = new XPathContext();
      res.variableResolver = xpc.variableResolver;
      res.functionResolver = xpc.functionResolver;
      res.namespaceResolver = xpc.namespaceResolver;
      res.expressionContextNode = xpc.expressionContextNode;
      res.virtualRoot = xpc.virtualRoot;
      res.caseInsensitive = xpc.caseInsensitive;
      res.contextNode = xpc.contextNode;
      res.contextPosition = localCtx.contextPosition;
      res.contextSize = localCtx.contextSize;
      return res;
    };
    PathExpr.prototype.predicateMatches = function(pred, c) {
      var res = pred.evaluate(c);
      if (Utilities.instance_of(res, XNumber)) {
        var val = c.contextPosition == res.numberValue();
        return val;
      }
      return res.booleanValue();
    };
    PathExpr.prototype.toString = function() {
      if (this.filter != void 0) {
        var s = this.filter.toString();
        if (Utilities.instance_of(this.filter, XString)) {
          s = "'" + s + "'";
        }
        if (this.filterPredicates != void 0) {
          for (var i = 0; i < this.filterPredicates.length; i++) {
            s = s + "[" + this.filterPredicates[i].toString() + "]";
          }
        }
        if (this.locationPath != void 0) {
          if (!this.locationPath.absolute) {
            s += "/";
          }
          s += this.locationPath.toString();
        }
        return s;
      }
      return this.locationPath.toString();
    };
    PathExpr.prototype.getOwnerElement = function(n) {
      if (n.ownerElement) {
        return n.ownerElement;
      }
      try {
        if (n.selectSingleNode) {
          return n.selectSingleNode("..");
        }
      } catch (e) {
      }
      var doc = n.nodeType == 9 ? n : n.ownerDocument;
      var elts = doc.getElementsByTagName("*");
      for (var i = 0; i < elts.length; i++) {
        var elt = elts.item(i);
        var nnm = elt.attributes;
        for (var j = 0; j < nnm.length; j++) {
          var an = nnm.item(j);
          if (an === n) {
            return elt;
          }
        }
      }
      return null;
    };
    LocationPath.prototype = new Object();
    LocationPath.prototype.constructor = LocationPath;
    LocationPath.superclass = Object.prototype;
    function LocationPath(abs, steps) {
      if (arguments.length > 0) {
        this.init(abs, steps);
      }
    }
    LocationPath.prototype.init = function(abs, steps) {
      this.absolute = abs;
      this.steps = steps;
    };
    LocationPath.prototype.toString = function() {
      var s;
      if (this.absolute) {
        s = "/";
      } else {
        s = "";
      }
      for (var i = 0; i < this.steps.length; i++) {
        if (i != 0) {
          s += "/";
        }
        s += this.steps[i].toString();
      }
      return s;
    };
    Step.prototype = new Object();
    Step.prototype.constructor = Step;
    Step.superclass = Object.prototype;
    function Step(axis, nodetest, preds) {
      if (arguments.length > 0) {
        this.init(axis, nodetest, preds);
      }
    }
    Step.prototype.init = function(axis, nodetest, preds) {
      this.axis = axis;
      this.nodeTest = nodetest;
      this.predicates = preds;
    };
    Step.prototype.toString = function() {
      var s;
      switch (this.axis) {
        case Step.ANCESTOR:
          s = "ancestor";
          break;
        case Step.ANCESTORORSELF:
          s = "ancestor-or-self";
          break;
        case Step.ATTRIBUTE:
          s = "attribute";
          break;
        case Step.CHILD:
          s = "child";
          break;
        case Step.DESCENDANT:
          s = "descendant";
          break;
        case Step.DESCENDANTORSELF:
          s = "descendant-or-self";
          break;
        case Step.FOLLOWING:
          s = "following";
          break;
        case Step.FOLLOWINGSIBLING:
          s = "following-sibling";
          break;
        case Step.NAMESPACE:
          s = "namespace";
          break;
        case Step.PARENT:
          s = "parent";
          break;
        case Step.PRECEDING:
          s = "preceding";
          break;
        case Step.PRECEDINGSIBLING:
          s = "preceding-sibling";
          break;
        case Step.SELF:
          s = "self";
          break;
      }
      s += "::";
      s += this.nodeTest.toString();
      for (var i = 0; i < this.predicates.length; i++) {
        s += "[" + this.predicates[i].toString() + "]";
      }
      return s;
    };
    Step.ANCESTOR = 0;
    Step.ANCESTORORSELF = 1;
    Step.ATTRIBUTE = 2;
    Step.CHILD = 3;
    Step.DESCENDANT = 4;
    Step.DESCENDANTORSELF = 5;
    Step.FOLLOWING = 6;
    Step.FOLLOWINGSIBLING = 7;
    Step.NAMESPACE = 8;
    Step.PARENT = 9;
    Step.PRECEDING = 10;
    Step.PRECEDINGSIBLING = 11;
    Step.SELF = 12;
    NodeTest.prototype = new Object();
    NodeTest.prototype.constructor = NodeTest;
    NodeTest.superclass = Object.prototype;
    function NodeTest(type, value) {
      if (arguments.length > 0) {
        this.init(type, value);
      }
    }
    NodeTest.prototype.init = function(type, value) {
      this.type = type;
      this.value = value;
    };
    NodeTest.prototype.toString = function() {
      switch (this.type) {
        case NodeTest.NAMETESTANY:
          return "*";
        case NodeTest.NAMETESTPREFIXANY:
          return this.value + ":*";
        case NodeTest.NAMETESTRESOLVEDANY:
          return "{" + this.value + "}*";
        case NodeTest.NAMETESTQNAME:
          return this.value;
        case NodeTest.NAMETESTRESOLVEDNAME:
          return "{" + this.namespaceURI + "}" + this.value;
        case NodeTest.COMMENT:
          return "comment()";
        case NodeTest.TEXT:
          return "text()";
        case NodeTest.PI:
          if (this.value != void 0) {
            return 'processing-instruction("' + this.value + '")';
          }
          return "processing-instruction()";
        case NodeTest.NODE:
          return "node()";
      }
      return "<unknown nodetest type>";
    };
    NodeTest.prototype.matches = function(n, xpc) {
      switch (this.type) {
        case NodeTest.NAMETESTANY:
          if (n.nodeType == 2 || n.nodeType == 1 || n.nodeType == XPathNamespace.XPATH_NAMESPACE_NODE) {
            return true;
          }
          return false;
        case NodeTest.NAMETESTPREFIXANY:
          if (n.nodeType == 2 || n.nodeType == 1) {
            var ns = xpc.namespaceResolver.getNamespace(this.value, xpc.expressionContextNode);
            if (ns == null) {
              throw new Error("Cannot resolve QName " + this.value);
            }
            return true;
          }
          return false;
        case NodeTest.NAMETESTQNAME:
          if (n.nodeType == 2 || n.nodeType == 1 || n.nodeType == XPathNamespace.XPATH_NAMESPACE_NODE) {
            var test = Utilities.resolveQName(this.value, xpc.namespaceResolver, xpc.expressionContextNode, false);
            if (test[0] == null) {
              throw new Error("Cannot resolve QName " + this.value);
            }
            test[0] = String(test[0]);
            test[1] = String(test[1]);
            if (test[0] == "") {
              test[0] = null;
            }
            var node = Utilities.resolveQName(n.nodeName, xpc.namespaceResolver, n, n.nodeType == 1);
            node[0] = String(node[0]);
            node[1] = String(node[1]);
            if (node[0] == "") {
              node[0] = null;
            }
            if (xpc.caseInsensitive) {
              return test[0] == node[0] && String(test[1]).toLowerCase() == String(node[1]).toLowerCase();
            }
            return test[0] == node[0] && test[1] == node[1];
          }
          return false;
        case NodeTest.COMMENT:
          return n.nodeType == 8;
        case NodeTest.TEXT:
          return n.nodeType == 3 || n.nodeType == 4;
        case NodeTest.PI:
          return n.nodeType == 7 && (this.value == null || n.nodeName == this.value);
        case NodeTest.NODE:
          return n.nodeType == 9 || n.nodeType == 1 || n.nodeType == 2 || n.nodeType == 3 || n.nodeType == 4 || n.nodeType == 8 || n.nodeType == 7;
      }
      return false;
    };
    NodeTest.NAMETESTANY = 0;
    NodeTest.NAMETESTPREFIXANY = 1;
    NodeTest.NAMETESTQNAME = 2;
    NodeTest.COMMENT = 3;
    NodeTest.TEXT = 4;
    NodeTest.PI = 5;
    NodeTest.NODE = 6;
    VariableReference.prototype = new Expression();
    VariableReference.prototype.constructor = VariableReference;
    VariableReference.superclass = Expression.prototype;
    function VariableReference(v) {
      if (arguments.length > 0) {
        this.init(v);
      }
    }
    VariableReference.prototype.init = function(v) {
      this.variable = v;
    };
    VariableReference.prototype.toString = function() {
      return "$" + this.variable;
    };
    VariableReference.prototype.evaluate = function(c) {
      return c.variableResolver.getVariable(this.variable, c);
    };
    FunctionCall.prototype = new Expression();
    FunctionCall.prototype.constructor = FunctionCall;
    FunctionCall.superclass = Expression.prototype;
    function FunctionCall(fn2, args) {
      if (arguments.length > 0) {
        this.init(fn2, args);
      }
    }
    FunctionCall.prototype.init = function(fn2, args) {
      this.functionName = fn2;
      this.arguments = args;
    };
    FunctionCall.prototype.toString = function() {
      var s = this.functionName + "(";
      for (var i = 0; i < this.arguments.length; i++) {
        if (i > 0) {
          s += ", ";
        }
        s += this.arguments[i].toString();
      }
      return s + ")";
    };
    FunctionCall.prototype.evaluate = function(c) {
      var f = c.functionResolver.getFunction(this.functionName, c);
      if (f == void 0) {
        throw new Error("Unknown function " + this.functionName);
      }
      var a = [c].concat(this.arguments);
      return f.apply(c.functionResolver.thisArg, a);
    };
    XString.prototype = new Expression();
    XString.prototype.constructor = XString;
    XString.superclass = Expression.prototype;
    function XString(s) {
      if (arguments.length > 0) {
        this.init(s);
      }
    }
    XString.prototype.init = function(s) {
      this.str = s;
    };
    XString.prototype.toString = function() {
      return this.str;
    };
    XString.prototype.evaluate = function(c) {
      return this;
    };
    XString.prototype.string = function() {
      return this;
    };
    XString.prototype.number = function() {
      return new XNumber(this.str);
    };
    XString.prototype.bool = function() {
      return new XBoolean(this.str);
    };
    XString.prototype.nodeset = function() {
      throw new Error("Cannot convert string to nodeset");
    };
    XString.prototype.stringValue = function() {
      return this.str;
    };
    XString.prototype.numberValue = function() {
      return this.number().numberValue();
    };
    XString.prototype.booleanValue = function() {
      return this.bool().booleanValue();
    };
    XString.prototype.equals = function(r) {
      if (Utilities.instance_of(r, XBoolean)) {
        return this.bool().equals(r);
      }
      if (Utilities.instance_of(r, XNumber)) {
        return this.number().equals(r);
      }
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithString(this, Operators.equals);
      }
      return new XBoolean(this.str == r.str);
    };
    XString.prototype.notequal = function(r) {
      if (Utilities.instance_of(r, XBoolean)) {
        return this.bool().notequal(r);
      }
      if (Utilities.instance_of(r, XNumber)) {
        return this.number().notequal(r);
      }
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithString(this, Operators.notequal);
      }
      return new XBoolean(this.str != r.str);
    };
    XString.prototype.lessthan = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this.number(), Operators.greaterthanorequal);
      }
      return this.number().lessthan(r.number());
    };
    XString.prototype.greaterthan = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this.number(), Operators.lessthanorequal);
      }
      return this.number().greaterthan(r.number());
    };
    XString.prototype.lessthanorequal = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this.number(), Operators.greaterthan);
      }
      return this.number().lessthanorequal(r.number());
    };
    XString.prototype.greaterthanorequal = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this.number(), Operators.lessthan);
      }
      return this.number().greaterthanorequal(r.number());
    };
    XNumber.prototype = new Expression();
    XNumber.prototype.constructor = XNumber;
    XNumber.superclass = Expression.prototype;
    function XNumber(n) {
      if (arguments.length > 0) {
        this.init(n);
      }
    }
    XNumber.prototype.init = function(n) {
      this.num = Number(n);
    };
    XNumber.prototype.toString = function() {
      return this.num;
    };
    XNumber.prototype.evaluate = function(c) {
      return this;
    };
    XNumber.prototype.string = function() {
      return new XString(this.num);
    };
    XNumber.prototype.number = function() {
      return this;
    };
    XNumber.prototype.bool = function() {
      return new XBoolean(this.num);
    };
    XNumber.prototype.nodeset = function() {
      throw new Error("Cannot convert number to nodeset");
    };
    XNumber.prototype.stringValue = function() {
      return this.string().stringValue();
    };
    XNumber.prototype.numberValue = function() {
      return this.num;
    };
    XNumber.prototype.booleanValue = function() {
      return this.bool().booleanValue();
    };
    XNumber.prototype.negate = function() {
      return new XNumber(-this.num);
    };
    XNumber.prototype.equals = function(r) {
      if (Utilities.instance_of(r, XBoolean)) {
        return this.bool().equals(r);
      }
      if (Utilities.instance_of(r, XString)) {
        return this.equals(r.number());
      }
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this, Operators.equals);
      }
      return new XBoolean(this.num == r.num);
    };
    XNumber.prototype.notequal = function(r) {
      if (Utilities.instance_of(r, XBoolean)) {
        return this.bool().notequal(r);
      }
      if (Utilities.instance_of(r, XString)) {
        return this.notequal(r.number());
      }
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this, Operators.notequal);
      }
      return new XBoolean(this.num != r.num);
    };
    XNumber.prototype.lessthan = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this, Operators.greaterthanorequal);
      }
      if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
        return this.lessthan(r.number());
      }
      return new XBoolean(this.num < r.num);
    };
    XNumber.prototype.greaterthan = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this, Operators.lessthanorequal);
      }
      if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
        return this.greaterthan(r.number());
      }
      return new XBoolean(this.num > r.num);
    };
    XNumber.prototype.lessthanorequal = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this, Operators.greaterthan);
      }
      if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
        return this.lessthanorequal(r.number());
      }
      return new XBoolean(this.num <= r.num);
    };
    XNumber.prototype.greaterthanorequal = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this, Operators.lessthan);
      }
      if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
        return this.greaterthanorequal(r.number());
      }
      return new XBoolean(this.num >= r.num);
    };
    XNumber.prototype.plus = function(r) {
      return new XNumber(this.num + r.num);
    };
    XNumber.prototype.minus = function(r) {
      return new XNumber(this.num - r.num);
    };
    XNumber.prototype.multiply = function(r) {
      return new XNumber(this.num * r.num);
    };
    XNumber.prototype.div = function(r) {
      return new XNumber(this.num / r.num);
    };
    XNumber.prototype.mod = function(r) {
      return new XNumber(this.num % r.num);
    };
    XBoolean.prototype = new Expression();
    XBoolean.prototype.constructor = XBoolean;
    XBoolean.superclass = Expression.prototype;
    function XBoolean(b) {
      if (arguments.length > 0) {
        this.init(b);
      }
    }
    XBoolean.prototype.init = function(b) {
      this.b = Boolean(b);
    };
    XBoolean.prototype.toString = function() {
      return this.b.toString();
    };
    XBoolean.prototype.evaluate = function(c) {
      return this;
    };
    XBoolean.prototype.string = function() {
      return new XString(this.b);
    };
    XBoolean.prototype.number = function() {
      return new XNumber(this.b);
    };
    XBoolean.prototype.bool = function() {
      return this;
    };
    XBoolean.prototype.nodeset = function() {
      throw new Error("Cannot convert boolean to nodeset");
    };
    XBoolean.prototype.stringValue = function() {
      return this.string().stringValue();
    };
    XBoolean.prototype.numberValue = function() {
      return this.num().numberValue();
    };
    XBoolean.prototype.booleanValue = function() {
      return this.b;
    };
    XBoolean.prototype.not = function() {
      return new XBoolean(!this.b);
    };
    XBoolean.prototype.equals = function(r) {
      if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
        return this.equals(r.bool());
      }
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithBoolean(this, Operators.equals);
      }
      return new XBoolean(this.b == r.b);
    };
    XBoolean.prototype.notequal = function(r) {
      if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
        return this.notequal(r.bool());
      }
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithBoolean(this, Operators.notequal);
      }
      return new XBoolean(this.b != r.b);
    };
    XBoolean.prototype.lessthan = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this.number(), Operators.greaterthanorequal);
      }
      return this.number().lessthan(r.number());
    };
    XBoolean.prototype.greaterthan = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this.number(), Operators.lessthanorequal);
      }
      return this.number().greaterthan(r.number());
    };
    XBoolean.prototype.lessthanorequal = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this.number(), Operators.greaterthan);
      }
      return this.number().lessthanorequal(r.number());
    };
    XBoolean.prototype.greaterthanorequal = function(r) {
      if (Utilities.instance_of(r, XNodeSet)) {
        return r.compareWithNumber(this.number(), Operators.lessthan);
      }
      return this.number().greaterthanorequal(r.number());
    };
    AVLTree.prototype = new Object();
    AVLTree.prototype.constructor = AVLTree;
    AVLTree.superclass = Object.prototype;
    function AVLTree(n) {
      this.init(n);
    }
    AVLTree.prototype.init = function(n) {
      this.left = null;
      this.right = null;
      this.node = n;
      this.depth = 1;
    };
    AVLTree.prototype.balance = function() {
      var ldepth = this.left == null ? 0 : this.left.depth;
      var rdepth = this.right == null ? 0 : this.right.depth;
      if (ldepth > rdepth + 1) {
        var lldepth = this.left.left == null ? 0 : this.left.left.depth;
        var lrdepth = this.left.right == null ? 0 : this.left.right.depth;
        if (lldepth < lrdepth) {
          this.left.rotateRR();
        }
        this.rotateLL();
      } else if (ldepth + 1 < rdepth) {
        var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
        var rldepth = this.right.left == null ? 0 : this.right.left.depth;
        if (rldepth > rrdepth) {
          this.right.rotateLL();
        }
        this.rotateRR();
      }
    };
    AVLTree.prototype.rotateLL = function() {
      var nodeBefore = this.node;
      var rightBefore = this.right;
      this.node = this.left.node;
      this.right = this.left;
      this.left = this.left.left;
      this.right.left = this.right.right;
      this.right.right = rightBefore;
      this.right.node = nodeBefore;
      this.right.updateInNewLocation();
      this.updateInNewLocation();
    };
    AVLTree.prototype.rotateRR = function() {
      var nodeBefore = this.node;
      var leftBefore = this.left;
      this.node = this.right.node;
      this.left = this.right;
      this.right = this.right.right;
      this.left.right = this.left.left;
      this.left.left = leftBefore;
      this.left.node = nodeBefore;
      this.left.updateInNewLocation();
      this.updateInNewLocation();
    };
    AVLTree.prototype.updateInNewLocation = function() {
      this.getDepthFromChildren();
    };
    AVLTree.prototype.getDepthFromChildren = function() {
      this.depth = this.node == null ? 0 : 1;
      if (this.left != null) {
        this.depth = this.left.depth + 1;
      }
      if (this.right != null && this.depth <= this.right.depth) {
        this.depth = this.right.depth + 1;
      }
    };
    AVLTree.prototype.order = function(n1, n2) {
      if (n1 === n2) {
        return 0;
      }
      var d1 = 0;
      var d2 = 0;
      for (var m1 = n1; m1 != null; m1 = m1.parentNode) {
        d1++;
      }
      for (var m2 = n2; m2 != null; m2 = m2.parentNode) {
        d2++;
      }
      if (d1 > d2) {
        while (d1 > d2) {
          n1 = n1.parentNode;
          d1--;
        }
        if (n1 == n2) {
          return 1;
        }
      } else if (d2 > d1) {
        while (d2 > d1) {
          n2 = n2.parentNode;
          d2--;
        }
        if (n1 == n2) {
          return -1;
        }
      }
      while (n1.parentNode != n2.parentNode) {
        n1 = n1.parentNode;
        n2 = n2.parentNode;
      }
      while (n1.previousSibling != null && n2.previousSibling != null) {
        n1 = n1.previousSibling;
        n2 = n2.previousSibling;
      }
      if (n1.previousSibling == null) {
        return -1;
      }
      return 1;
    };
    AVLTree.prototype.add = function(n) {
      if (n === this.node) {
        return false;
      }
      var o = this.order(n, this.node);
      var ret = false;
      if (o == -1) {
        if (this.left == null) {
          this.left = new AVLTree(n);
          ret = true;
        } else {
          ret = this.left.add(n);
          if (ret) {
            this.balance();
          }
        }
      } else if (o == 1) {
        if (this.right == null) {
          this.right = new AVLTree(n);
          ret = true;
        } else {
          ret = this.right.add(n);
          if (ret) {
            this.balance();
          }
        }
      }
      if (ret) {
        this.getDepthFromChildren();
      }
      return ret;
    };
    XNodeSet.prototype = new Expression();
    XNodeSet.prototype.constructor = XNodeSet;
    XNodeSet.superclass = Expression.prototype;
    function XNodeSet() {
      this.init();
    }
    XNodeSet.prototype.init = function() {
      this.tree = null;
      this.size = 0;
    };
    XNodeSet.prototype.toString = function() {
      var p = this.first();
      if (p == null) {
        return "";
      }
      return this.stringForNode(p);
    };
    XNodeSet.prototype.evaluate = function(c) {
      return this;
    };
    XNodeSet.prototype.string = function() {
      return new XString(this.toString());
    };
    XNodeSet.prototype.stringValue = function() {
      return this.toString();
    };
    XNodeSet.prototype.number = function() {
      return new XNumber(this.string());
    };
    XNodeSet.prototype.numberValue = function() {
      return Number(this.string());
    };
    XNodeSet.prototype.bool = function() {
      return new XBoolean(this.tree != null);
    };
    XNodeSet.prototype.booleanValue = function() {
      return this.tree != null;
    };
    XNodeSet.prototype.nodeset = function() {
      return this;
    };
    XNodeSet.prototype.stringForNode = function(n) {
      if (n.nodeType == 9) {
        n = n.documentElement;
      }
      if (n.nodeType == 1) {
        return this.stringForNodeRec(n);
      }
      if (n.isNamespaceNode) {
        return n.namespace;
      }
      return n.nodeValue;
    };
    XNodeSet.prototype.stringForNodeRec = function(n) {
      var s = "";
      for (var n2 = n.firstChild; n2 != null; n2 = n2.nextSibling) {
        if (n2.nodeType == 3) {
          s += n2.nodeValue;
        } else if (n2.nodeType == 1) {
          s += this.stringForNodeRec(n2);
        }
      }
      return s;
    };
    XNodeSet.prototype.first = function() {
      var p = this.tree;
      if (p == null) {
        return null;
      }
      while (p.left != null) {
        p = p.left;
      }
      return p.node;
    };
    XNodeSet.prototype.add = function(n) {
      var added;
      if (this.tree == null) {
        this.tree = new AVLTree(n);
        added = true;
      } else {
        added = this.tree.add(n);
      }
      if (added) {
        this.size++;
      }
    };
    XNodeSet.prototype.addArray = function(ns) {
      for (var i = 0; i < ns.length; i++) {
        this.add(ns[i]);
      }
    };
    XNodeSet.prototype.toArray = function() {
      var a = [];
      this.toArrayRec(this.tree, a);
      return a;
    };
    XNodeSet.prototype.toArrayRec = function(t, a) {
      if (t != null) {
        this.toArrayRec(t.left, a);
        a.push(t.node);
        this.toArrayRec(t.right, a);
      }
    };
    XNodeSet.prototype.compareWithString = function(r, o) {
      var a = this.toArray();
      for (var i = 0; i < a.length; i++) {
        var n = a[i];
        var l = new XString(this.stringForNode(n));
        var res = o(l, r);
        if (res.booleanValue()) {
          return res;
        }
      }
      return new XBoolean(false);
    };
    XNodeSet.prototype.compareWithNumber = function(r, o) {
      var a = this.toArray();
      for (var i = 0; i < a.length; i++) {
        var n = a[i];
        var l = new XNumber(this.stringForNode(n));
        var res = o(l, r);
        if (res.booleanValue()) {
          return res;
        }
      }
      return new XBoolean(false);
    };
    XNodeSet.prototype.compareWithBoolean = function(r, o) {
      return o(this.bool(), r);
    };
    XNodeSet.prototype.compareWithNodeSet = function(r, o) {
      var a = this.toArray();
      for (var i = 0; i < a.length; i++) {
        var n = a[i];
        var l = new XString(this.stringForNode(n));
        var b = r.toArray();
        for (var j = 0; j < b.length; j++) {
          var n2 = b[j];
          var r = new XString(this.stringForNode(n2));
          var res = o(l, r);
          if (res.booleanValue()) {
            return res;
          }
        }
      }
      return new XBoolean(false);
    };
    XNodeSet.prototype.equals = function(r) {
      if (Utilities.instance_of(r, XString)) {
        return this.compareWithString(r, Operators.equals);
      }
      if (Utilities.instance_of(r, XNumber)) {
        return this.compareWithNumber(r, Operators.equals);
      }
      if (Utilities.instance_of(r, XBoolean)) {
        return this.compareWithBoolean(r, Operators.equals);
      }
      return this.compareWithNodeSet(r, Operators.equals);
    };
    XNodeSet.prototype.notequal = function(r) {
      if (Utilities.instance_of(r, XString)) {
        return this.compareWithString(r, Operators.notequal);
      }
      if (Utilities.instance_of(r, XNumber)) {
        return this.compareWithNumber(r, Operators.notequal);
      }
      if (Utilities.instance_of(r, XBoolean)) {
        return this.compareWithBoolean(r, Operators.notequal);
      }
      return this.compareWithNodeSet(r, Operators.notequal);
    };
    XNodeSet.prototype.lessthan = function(r) {
      if (Utilities.instance_of(r, XString)) {
        return this.compareWithNumber(r.number(), Operators.lessthan);
      }
      if (Utilities.instance_of(r, XNumber)) {
        return this.compareWithNumber(r, Operators.lessthan);
      }
      if (Utilities.instance_of(r, XBoolean)) {
        return this.compareWithBoolean(r, Operators.lessthan);
      }
      return this.compareWithNodeSet(r, Operators.lessthan);
    };
    XNodeSet.prototype.greaterthan = function(r) {
      if (Utilities.instance_of(r, XString)) {
        return this.compareWithNumber(r.number(), Operators.greaterthan);
      }
      if (Utilities.instance_of(r, XNumber)) {
        return this.compareWithNumber(r, Operators.greaterthan);
      }
      if (Utilities.instance_of(r, XBoolean)) {
        return this.compareWithBoolean(r, Operators.greaterthan);
      }
      return this.compareWithNodeSet(r, Operators.greaterthan);
    };
    XNodeSet.prototype.lessthanorequal = function(r) {
      if (Utilities.instance_of(r, XString)) {
        return this.compareWithNumber(r.number(), Operators.lessthanorequal);
      }
      if (Utilities.instance_of(r, XNumber)) {
        return this.compareWithNumber(r, Operators.lessthanorequal);
      }
      if (Utilities.instance_of(r, XBoolean)) {
        return this.compareWithBoolean(r, Operators.lessthanorequal);
      }
      return this.compareWithNodeSet(r, Operators.lessthanorequal);
    };
    XNodeSet.prototype.greaterthanorequal = function(r) {
      if (Utilities.instance_of(r, XString)) {
        return this.compareWithNumber(r.number(), Operators.greaterthanorequal);
      }
      if (Utilities.instance_of(r, XNumber)) {
        return this.compareWithNumber(r, Operators.greaterthanorequal);
      }
      if (Utilities.instance_of(r, XBoolean)) {
        return this.compareWithBoolean(r, Operators.greaterthanorequal);
      }
      return this.compareWithNodeSet(r, Operators.greaterthanorequal);
    };
    XNodeSet.prototype.union = function(r) {
      var ns = new XNodeSet();
      ns.tree = this.tree;
      ns.size = this.size;
      ns.addArray(r.toArray());
      return ns;
    };
    XPathNamespace.prototype = new Object();
    XPathNamespace.prototype.constructor = XPathNamespace;
    XPathNamespace.superclass = Object.prototype;
    function XPathNamespace(pre, ns, p) {
      this.isXPathNamespace = true;
      this.ownerDocument = p.ownerDocument;
      this.nodeName = "#namespace";
      this.prefix = pre;
      this.localName = pre;
      this.namespaceURI = ns;
      this.nodeValue = ns;
      this.ownerElement = p;
      this.nodeType = XPathNamespace.XPATH_NAMESPACE_NODE;
    }
    XPathNamespace.prototype.toString = function() {
      return '{ "' + this.prefix + '", "' + this.namespaceURI + '" }';
    };
    var Operators = new Object();
    Operators.equals = function(l, r) {
      return l.equals(r);
    };
    Operators.notequal = function(l, r) {
      return l.notequal(r);
    };
    Operators.lessthan = function(l, r) {
      return l.lessthan(r);
    };
    Operators.greaterthan = function(l, r) {
      return l.greaterthan(r);
    };
    Operators.lessthanorequal = function(l, r) {
      return l.lessthanorequal(r);
    };
    Operators.greaterthanorequal = function(l, r) {
      return l.greaterthanorequal(r);
    };
    XPathContext.prototype = new Object();
    XPathContext.prototype.constructor = XPathContext;
    XPathContext.superclass = Object.prototype;
    function XPathContext(vr, nr, fr) {
      this.variableResolver = vr != null ? vr : new VariableResolver();
      this.namespaceResolver = nr != null ? nr : new NamespaceResolver();
      this.functionResolver = fr != null ? fr : new FunctionResolver();
    }
    VariableResolver.prototype = new Object();
    VariableResolver.prototype.constructor = VariableResolver;
    VariableResolver.superclass = Object.prototype;
    function VariableResolver() {
    }
    VariableResolver.prototype.getVariable = function(vn, c) {
      var parts = Utilities.splitQName(vn);
      if (parts[0] != null) {
        parts[0] = c.namespaceResolver.getNamespace(parts[0], c.expressionContextNode);
        if (parts[0] == null) {
          throw new Error("Cannot resolve QName " + fn);
        }
      }
      return this.getVariableWithName(parts[0], parts[1], c.expressionContextNode);
    };
    VariableResolver.prototype.getVariableWithName = function(ns, ln, c) {
      return null;
    };
    FunctionResolver.prototype = new Object();
    FunctionResolver.prototype.constructor = FunctionResolver;
    FunctionResolver.superclass = Object.prototype;
    function FunctionResolver(thisArg) {
      this.thisArg = thisArg != null ? thisArg : Functions;
      this.functions = new Object();
      this.addStandardFunctions();
    }
    FunctionResolver.prototype.addStandardFunctions = function() {
      this.functions["{}last"] = Functions.last;
      this.functions["{}position"] = Functions.position;
      this.functions["{}count"] = Functions.count;
      this.functions["{}id"] = Functions.id;
      this.functions["{}local-name"] = Functions.localName;
      this.functions["{}namespace-uri"] = Functions.namespaceURI;
      this.functions["{}name"] = Functions.name;
      this.functions["{}string"] = Functions.string;
      this.functions["{}concat"] = Functions.concat;
      this.functions["{}starts-with"] = Functions.startsWith;
      this.functions["{}contains"] = Functions.contains;
      this.functions["{}substring-before"] = Functions.substringBefore;
      this.functions["{}substring-after"] = Functions.substringAfter;
      this.functions["{}substring"] = Functions.substring;
      this.functions["{}string-length"] = Functions.stringLength;
      this.functions["{}normalize-space"] = Functions.normalizeSpace;
      this.functions["{}translate"] = Functions.translate;
      this.functions["{}boolean"] = Functions.boolean_;
      this.functions["{}not"] = Functions.not;
      this.functions["{}true"] = Functions.true_;
      this.functions["{}false"] = Functions.false_;
      this.functions["{}lang"] = Functions.lang;
      this.functions["{}number"] = Functions.number;
      this.functions["{}sum"] = Functions.sum;
      this.functions["{}floor"] = Functions.floor;
      this.functions["{}ceiling"] = Functions.ceiling;
      this.functions["{}round"] = Functions.round;
    };
    FunctionResolver.prototype.addFunction = function(ns, ln, f) {
      this.functions["{" + ns + "}" + ln] = f;
    };
    FunctionResolver.prototype.getFunction = function(fn2, c) {
      var parts = Utilities.resolveQName(fn2, c.namespaceResolver, c.contextNode, false);
      if (parts[0] == null) {
        throw new Error("Cannot resolve QName " + fn2);
      }
      return this.getFunctionWithName(parts[0], parts[1], c.contextNode);
    };
    FunctionResolver.prototype.getFunctionWithName = function(ns, ln, c) {
      return this.functions["{" + ns + "}" + ln];
    };
    NamespaceResolver.prototype = new Object();
    NamespaceResolver.prototype.constructor = NamespaceResolver;
    NamespaceResolver.superclass = Object.prototype;
    function NamespaceResolver() {
    }
    NamespaceResolver.prototype.getNamespace = function(prefix, n) {
      if (prefix == "xml") {
        return XPath.XML_NAMESPACE_URI;
      } else if (prefix == "xmlns") {
        return XPath.XMLNS_NAMESPACE_URI;
      }
      if (n.nodeType == 9) {
        n = n.documentElement;
      } else if (n.nodeType == 2) {
        n = PathExpr.prototype.getOwnerElement(n);
      } else if (n.nodeType != 1) {
        n = n.parentNode;
      }
      while (n != null && n.nodeType == 1) {
        var nnm = n.attributes;
        for (var i = 0; i < nnm.length; i++) {
          var a = nnm.item(i);
          var aname = a.nodeName;
          if (aname == "xmlns" && prefix == "" || aname == "xmlns:" + prefix) {
            return String(a.nodeValue);
          }
        }
        n = n.parentNode;
      }
      return null;
    };
    var Functions = new Object();
    Functions.last = function() {
      var c = arguments[0];
      if (arguments.length != 1) {
        throw new Error("Function last expects ()");
      }
      return new XNumber(c.contextSize);
    };
    Functions.position = function() {
      var c = arguments[0];
      if (arguments.length != 1) {
        throw new Error("Function position expects ()");
      }
      return new XNumber(c.contextPosition);
    };
    Functions.count = function() {
      var c = arguments[0];
      var ns;
      if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
        throw new Error("Function count expects (node-set)");
      }
      return new XNumber(ns.size);
    };
    Functions.id = function() {
      var c = arguments[0];
      var id;
      if (arguments.length != 2) {
        throw new Error("Function id expects (object)");
      }
      id = arguments[1].evaluate(c);
      if (Utilities.instance_of(id, XNodeSet)) {
        id = id.toArray().join(" ");
      } else {
        id = id.stringValue();
      }
      var ids = id.split(/[\x0d\x0a\x09\x20]+/);
      var count = 0;
      var ns = new XNodeSet();
      var doc = c.contextNode.nodeType == 9 ? c.contextNode : c.contextNode.ownerDocument;
      for (var i = 0; i < ids.length; i++) {
        var n;
        if (doc.getElementById) {
          n = doc.getElementById(ids[i]);
        } else {
          n = Utilities.getElementById(doc, ids[i]);
        }
        if (n != null) {
          ns.add(n);
          count++;
        }
      }
      return ns;
    };
    Functions.localName = function() {
      var c = arguments[0];
      var n;
      if (arguments.length == 1) {
        n = c.contextNode;
      } else if (arguments.length == 2) {
        n = arguments[1].evaluate(c).first();
      } else {
        throw new Error("Function local-name expects (node-set?)");
      }
      if (n == null) {
        return new XString("");
      }
      return new XString(n.localName ? n.localName : n.baseName);
    };
    Functions.namespaceURI = function() {
      var c = arguments[0];
      var n;
      if (arguments.length == 1) {
        n = c.contextNode;
      } else if (arguments.length == 2) {
        n = arguments[1].evaluate(c).first();
      } else {
        throw new Error("Function namespace-uri expects (node-set?)");
      }
      if (n == null) {
        return new XString("");
      }
      return new XString(n.namespaceURI);
    };
    Functions.name = function() {
      var c = arguments[0];
      var n;
      if (arguments.length == 1) {
        n = c.contextNode;
      } else if (arguments.length == 2) {
        n = arguments[1].evaluate(c).first();
      } else {
        throw new Error("Function name expects (node-set?)");
      }
      if (n == null) {
        return new XString("");
      }
      if (n.nodeType == 1 || n.nodeType == 2) {
        return new XString(n.nodeName);
      } else if (n.localName == null) {
        return new XString("");
      } else {
        return new XString(n.localName);
      }
    };
    Functions.string = function() {
      var c = arguments[0];
      if (arguments.length == 1) {
        return XNodeSet.prototype.stringForNode(c.contextNode);
      } else if (arguments.length == 2) {
        return arguments[1].evaluate(c).string();
      }
      throw new Error("Function string expects (object?)");
    };
    Functions.concat = function() {
      var c = arguments[0];
      if (arguments.length < 3) {
        throw new Error("Function concat expects (string, string, string*)");
      }
      var s = "";
      for (var i = 1; i < arguments.length; i++) {
        s += arguments[i].evaluate(c).stringValue();
      }
      return new XString(s);
    };
    Functions.startsWith = function() {
      var c = arguments[0];
      if (arguments.length != 3) {
        throw new Error("Function startsWith expects (string, string)");
      }
      var s1 = arguments[1].evaluate(c).stringValue();
      var s2 = arguments[2].evaluate(c).stringValue();
      return new XBoolean(s1.substring(0, s2.length) == s2);
    };
    Functions.contains = function() {
      var c = arguments[0];
      if (arguments.length != 3) {
        throw new Error("Function contains expects (string, string)");
      }
      var s1 = arguments[1].evaluate(c).stringValue();
      var s2 = arguments[2].evaluate(c).stringValue();
      return new XBoolean(s1.indexOf(s2) != -1);
    };
    Functions.substringBefore = function() {
      var c = arguments[0];
      if (arguments.length != 3) {
        throw new Error("Function substring-before expects (string, string)");
      }
      var s1 = arguments[1].evaluate(c).stringValue();
      var s2 = arguments[2].evaluate(c).stringValue();
      return new XString(s1.substring(0, s1.indexOf(s2)));
    };
    Functions.substringAfter = function() {
      var c = arguments[0];
      if (arguments.length != 3) {
        throw new Error("Function substring-after expects (string, string)");
      }
      var s1 = arguments[1].evaluate(c).stringValue();
      var s2 = arguments[2].evaluate(c).stringValue();
      if (s2.length == 0) {
        return new XString(s1);
      }
      var i = s1.indexOf(s2);
      if (i == -1) {
        return new XString("");
      }
      return new XString(s1.substring(s1.indexOf(s2) + 1));
    };
    Functions.substring = function() {
      var c = arguments[0];
      if (!(arguments.length == 3 || arguments.length == 4)) {
        throw new Error("Function substring expects (string, number, number?)");
      }
      var s = arguments[1].evaluate(c).stringValue();
      var n1 = Math.round(arguments[2].evaluate(c).numberValue()) - 1;
      var n2 = arguments.length == 4 ? n1 + Math.round(arguments[3].evaluate(c).numberValue()) : void 0;
      return new XString(s.substring(n1, n2));
    };
    Functions.stringLength = function() {
      var c = arguments[0];
      var s;
      if (arguments.length == 1) {
        s = XNodeSet.prototype.stringForNode(c.contextNode);
      } else if (arguments.length == 2) {
        s = arguments[1].evaluate(c).stringValue();
      } else {
        throw new Error("Function string-length expects (string?)");
      }
      return new XNumber(s.length);
    };
    Functions.normalizeSpace = function() {
      var c = arguments[0];
      var s;
      if (arguments.length == 1) {
        s = XNodeSet.prototype.stringForNode(c.contextNode);
      } else if (arguments.length == 2) {
        s = arguments[1].evaluate(c).stringValue();
      } else {
        throw new Error("Function normalize-space expects (string?)");
      }
      var i = 0;
      var j = s.length - 1;
      while (Utilities.isSpace(s.charCodeAt(j))) {
        j--;
      }
      var t = "";
      while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
        i++;
      }
      while (i <= j) {
        if (Utilities.isSpace(s.charCodeAt(i))) {
          t += " ";
          while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
            i++;
          }
        } else {
          t += s.charAt(i);
          i++;
        }
      }
      return new XString(t);
    };
    Functions.translate = function() {
      var c = arguments[0];
      if (arguments.length != 4) {
        throw new Error("Function translate expects (string, string, string)");
      }
      var s1 = arguments[1].evaluate(c).stringValue();
      var s2 = arguments[2].evaluate(c).stringValue();
      var s3 = arguments[3].evaluate(c).stringValue();
      var map = [];
      for (var i = 0; i < s2.length; i++) {
        var j = s2.charCodeAt(i);
        if (map[j] == void 0) {
          var k = i > s3.length ? "" : s3.charAt(i);
          map[j] = k;
        }
      }
      var t = "";
      for (var i = 0; i < s1.length; i++) {
        var c = s1.charCodeAt(i);
        var r = map[c];
        if (r == void 0) {
          t += s1.charAt(i);
        } else {
          t += r;
        }
      }
      return new XString(t);
    };
    Functions.boolean_ = function() {
      var c = arguments[0];
      if (arguments.length != 2) {
        throw new Error("Function boolean expects (object)");
      }
      return arguments[1].evaluate(c).bool();
    };
    Functions.not = function() {
      var c = arguments[0];
      if (arguments.length != 2) {
        throw new Error("Function not expects (object)");
      }
      return arguments[1].evaluate(c).bool().not();
    };
    Functions.true_ = function() {
      if (arguments.length != 1) {
        throw new Error("Function true expects ()");
      }
      return new XBoolean(true);
    };
    Functions.false_ = function() {
      if (arguments.length != 1) {
        throw new Error("Function false expects ()");
      }
      return new XBoolean(false);
    };
    Functions.lang = function() {
      var c = arguments[0];
      if (arguments.length != 2) {
        throw new Error("Function lang expects (string)");
      }
      var lang;
      for (var n = c.contextNode; n != null && n.nodeType != 9; n = n.parentNode) {
        var a = n.getAttributeNS(XPath.XML_NAMESPACE_URI, "lang");
        if (a != null) {
          lang = String(a);
          break;
        }
      }
      if (lang == null) {
        return new XBoolean(false);
      }
      var s = arguments[1].evaluate(c).stringValue();
      return new XBoolean(lang.substring(0, s.length) == s && (lang.length == s.length || lang.charAt(s.length) == "-"));
    };
    Functions.number = function() {
      var c = arguments[0];
      if (!(arguments.length == 1 || arguments.length == 2)) {
        throw new Error("Function number expects (object?)");
      }
      if (arguments.length == 1) {
        return new XNumber(XNodeSet.prototype.stringForNode(c.contextNode));
      }
      return arguments[1].evaluate(c).number();
    };
    Functions.sum = function() {
      var c = arguments[0];
      var ns;
      if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
        throw new Error("Function sum expects (node-set)");
      }
      ns = ns.toArray();
      var n = 0;
      for (var i = 0; i < ns.length; i++) {
        n += new XNumber(XNodeSet.prototype.stringForNode(ns[i])).numberValue();
      }
      return new XNumber(n);
    };
    Functions.floor = function() {
      var c = arguments[0];
      if (arguments.length != 2) {
        throw new Error("Function floor expects (number)");
      }
      return new XNumber(Math.floor(arguments[1].evaluate(c).numberValue()));
    };
    Functions.ceiling = function() {
      var c = arguments[0];
      if (arguments.length != 2) {
        throw new Error("Function ceiling expects (number)");
      }
      return new XNumber(Math.ceil(arguments[1].evaluate(c).numberValue()));
    };
    Functions.round = function() {
      var c = arguments[0];
      if (arguments.length != 2) {
        throw new Error("Function round expects (number)");
      }
      return new XNumber(Math.round(arguments[1].evaluate(c).numberValue()));
    };
    var Utilities = new Object();
    Utilities.splitQName = function(qn) {
      var i = qn.indexOf(":");
      if (i == -1) {
        return [null, qn];
      }
      return [qn.substring(0, i), qn.substring(i + 1)];
    };
    Utilities.resolveQName = function(qn, nr, n, useDefault) {
      var parts = Utilities.splitQName(qn);
      if (parts[0] != null) {
        parts[0] = nr.getNamespace(parts[0], n);
      } else {
        if (useDefault) {
          parts[0] = nr.getNamespace("", n);
          if (parts[0] == null) {
            parts[0] = "";
          }
        } else {
          parts[0] = "";
        }
      }
      return parts;
    };
    Utilities.isSpace = function(c) {
      return c == 9 || c == 13 || c == 10 || c == 32;
    };
    Utilities.isLetter = function(c) {
      return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 255 || c >= 256 && c <= 305 || c >= 308 && c <= 318 || c >= 321 && c <= 328 || c >= 330 && c <= 382 || c >= 384 && c <= 451 || c >= 461 && c <= 496 || c >= 500 && c <= 501 || c >= 506 && c <= 535 || c >= 592 && c <= 680 || c >= 699 && c <= 705 || c == 902 || c >= 904 && c <= 906 || c == 908 || c >= 910 && c <= 929 || c >= 931 && c <= 974 || c >= 976 && c <= 982 || c == 986 || c == 988 || c == 990 || c == 992 || c >= 994 && c <= 1011 || c >= 1025 && c <= 1036 || c >= 1038 && c <= 1103 || c >= 1105 && c <= 1116 || c >= 1118 && c <= 1153 || c >= 1168 && c <= 1220 || c >= 1223 && c <= 1224 || c >= 1227 && c <= 1228 || c >= 1232 && c <= 1259 || c >= 1262 && c <= 1269 || c >= 1272 && c <= 1273 || c >= 1329 && c <= 1366 || c == 1369 || c >= 1377 && c <= 1414 || c >= 1488 && c <= 1514 || c >= 1520 && c <= 1522 || c >= 1569 && c <= 1594 || c >= 1601 && c <= 1610 || c >= 1649 && c <= 1719 || c >= 1722 && c <= 1726 || c >= 1728 && c <= 1742 || c >= 1744 && c <= 1747 || c == 1749 || c >= 1765 && c <= 1766 || c >= 2309 && c <= 2361 || c == 2365 || c >= 2392 && c <= 2401 || c >= 2437 && c <= 2444 || c >= 2447 && c <= 2448 || c >= 2451 && c <= 2472 || c >= 2474 && c <= 2480 || c == 2482 || c >= 2486 && c <= 2489 || c >= 2524 && c <= 2525 || c >= 2527 && c <= 2529 || c >= 2544 && c <= 2545 || c >= 2565 && c <= 2570 || c >= 2575 && c <= 2576 || c >= 2579 && c <= 2600 || c >= 2602 && c <= 2608 || c >= 2610 && c <= 2611 || c >= 2613 && c <= 2614 || c >= 2616 && c <= 2617 || c >= 2649 && c <= 2652 || c == 2654 || c >= 2674 && c <= 2676 || c >= 2693 && c <= 2699 || c == 2701 || c >= 2703 && c <= 2705 || c >= 2707 && c <= 2728 || c >= 2730 && c <= 2736 || c >= 2738 && c <= 2739 || c >= 2741 && c <= 2745 || c == 2749 || c == 2784 || c >= 2821 && c <= 2828 || c >= 2831 && c <= 2832 || c >= 2835 && c <= 2856 || c >= 2858 && c <= 2864 || c >= 2866 && c <= 2867 || c >= 2870 && c <= 2873 || c == 2877 || c >= 2908 && c <= 2909 || c >= 2911 && c <= 2913 || c >= 2949 && c <= 2954 || c >= 2958 && c <= 2960 || c >= 2962 && c <= 2965 || c >= 2969 && c <= 2970 || c == 2972 || c >= 2974 && c <= 2975 || c >= 2979 && c <= 2980 || c >= 2984 && c <= 2986 || c >= 2990 && c <= 2997 || c >= 2999 && c <= 3001 || c >= 3077 && c <= 3084 || c >= 3086 && c <= 3088 || c >= 3090 && c <= 3112 || c >= 3114 && c <= 3123 || c >= 3125 && c <= 3129 || c >= 3168 && c <= 3169 || c >= 3205 && c <= 3212 || c >= 3214 && c <= 3216 || c >= 3218 && c <= 3240 || c >= 3242 && c <= 3251 || c >= 3253 && c <= 3257 || c == 3294 || c >= 3296 && c <= 3297 || c >= 3333 && c <= 3340 || c >= 3342 && c <= 3344 || c >= 3346 && c <= 3368 || c >= 3370 && c <= 3385 || c >= 3424 && c <= 3425 || c >= 3585 && c <= 3630 || c == 3632 || c >= 3634 && c <= 3635 || c >= 3648 && c <= 3653 || c >= 3713 && c <= 3714 || c == 3716 || c >= 3719 && c <= 3720 || c == 3722 || c == 3725 || c >= 3732 && c <= 3735 || c >= 3737 && c <= 3743 || c >= 3745 && c <= 3747 || c == 3749 || c == 3751 || c >= 3754 && c <= 3755 || c >= 3757 && c <= 3758 || c == 3760 || c >= 3762 && c <= 3763 || c == 3773 || c >= 3776 && c <= 3780 || c >= 3904 && c <= 3911 || c >= 3913 && c <= 3945 || c >= 4256 && c <= 4293 || c >= 4304 && c <= 4342 || c == 4352 || c >= 4354 && c <= 4355 || c >= 4357 && c <= 4359 || c == 4361 || c >= 4363 && c <= 4364 || c >= 4366 && c <= 4370 || c == 4412 || c == 4414 || c == 4416 || c == 4428 || c == 4430 || c == 4432 || c >= 4436 && c <= 4437 || c == 4441 || c >= 4447 && c <= 4449 || c == 4451 || c == 4453 || c == 4455 || c == 4457 || c >= 4461 && c <= 4462 || c >= 4466 && c <= 4467 || c == 4469 || c == 4510 || c == 4520 || c == 4523 || c >= 4526 && c <= 4527 || c >= 4535 && c <= 4536 || c == 4538 || c >= 4540 && c <= 4546 || c == 4587 || c == 4592 || c == 4601 || c >= 7680 && c <= 7835 || c >= 7840 && c <= 7929 || c >= 7936 && c <= 7957 || c >= 7960 && c <= 7965 || c >= 7968 && c <= 8005 || c >= 8008 && c <= 8013 || c >= 8016 && c <= 8023 || c == 8025 || c == 8027 || c == 8029 || c >= 8031 && c <= 8061 || c >= 8064 && c <= 8116 || c >= 8118 && c <= 8124 || c == 8126 || c >= 8130 && c <= 8132 || c >= 8134 && c <= 8140 || c >= 8144 && c <= 8147 || c >= 8150 && c <= 8155 || c >= 8160 && c <= 8172 || c >= 8178 && c <= 8180 || c >= 8182 && c <= 8188 || c == 8486 || c >= 8490 && c <= 8491 || c == 8494 || c >= 8576 && c <= 8578 || c >= 12353 && c <= 12436 || c >= 12449 && c <= 12538 || c >= 12549 && c <= 12588 || c >= 44032 && c <= 55203 || c >= 19968 && c <= 40869 || c == 12295 || c >= 12321 && c <= 12329;
    };
    Utilities.isNCNameChar = function(c) {
      return c >= 48 && c <= 57 || c >= 1632 && c <= 1641 || c >= 1776 && c <= 1785 || c >= 2406 && c <= 2415 || c >= 2534 && c <= 2543 || c >= 2662 && c <= 2671 || c >= 2790 && c <= 2799 || c >= 2918 && c <= 2927 || c >= 3047 && c <= 3055 || c >= 3174 && c <= 3183 || c >= 3302 && c <= 3311 || c >= 3430 && c <= 3439 || c >= 3664 && c <= 3673 || c >= 3792 && c <= 3801 || c >= 3872 && c <= 3881 || c == 46 || c == 45 || c == 95 || Utilities.isLetter(c) || c >= 768 && c <= 837 || c >= 864 && c <= 865 || c >= 1155 && c <= 1158 || c >= 1425 && c <= 1441 || c >= 1443 && c <= 1465 || c >= 1467 && c <= 1469 || c == 1471 || c >= 1473 && c <= 1474 || c == 1476 || c >= 1611 && c <= 1618 || c == 1648 || c >= 1750 && c <= 1756 || c >= 1757 && c <= 1759 || c >= 1760 && c <= 1764 || c >= 1767 && c <= 1768 || c >= 1770 && c <= 1773 || c >= 2305 && c <= 2307 || c == 2364 || c >= 2366 && c <= 2380 || c == 2381 || c >= 2385 && c <= 2388 || c >= 2402 && c <= 2403 || c >= 2433 && c <= 2435 || c == 2492 || c == 2494 || c == 2495 || c >= 2496 && c <= 2500 || c >= 2503 && c <= 2504 || c >= 2507 && c <= 2509 || c == 2519 || c >= 2530 && c <= 2531 || c == 2562 || c == 2620 || c == 2622 || c == 2623 || c >= 2624 && c <= 2626 || c >= 2631 && c <= 2632 || c >= 2635 && c <= 2637 || c >= 2672 && c <= 2673 || c >= 2689 && c <= 2691 || c == 2748 || c >= 2750 && c <= 2757 || c >= 2759 && c <= 2761 || c >= 2763 && c <= 2765 || c >= 2817 && c <= 2819 || c == 2876 || c >= 2878 && c <= 2883 || c >= 2887 && c <= 2888 || c >= 2891 && c <= 2893 || c >= 2902 && c <= 2903 || c >= 2946 && c <= 2947 || c >= 3006 && c <= 3010 || c >= 3014 && c <= 3016 || c >= 3018 && c <= 3021 || c == 3031 || c >= 3073 && c <= 3075 || c >= 3134 && c <= 3140 || c >= 3142 && c <= 3144 || c >= 3146 && c <= 3149 || c >= 3157 && c <= 3158 || c >= 3202 && c <= 3203 || c >= 3262 && c <= 3268 || c >= 3270 && c <= 3272 || c >= 3274 && c <= 3277 || c >= 3285 && c <= 3286 || c >= 3330 && c <= 3331 || c >= 3390 && c <= 3395 || c >= 3398 && c <= 3400 || c >= 3402 && c <= 3405 || c == 3415 || c == 3633 || c >= 3636 && c <= 3642 || c >= 3655 && c <= 3662 || c == 3761 || c >= 3764 && c <= 3769 || c >= 3771 && c <= 3772 || c >= 3784 && c <= 3789 || c >= 3864 && c <= 3865 || c == 3893 || c == 3895 || c == 3897 || c == 3902 || c == 3903 || c >= 3953 && c <= 3972 || c >= 3974 && c <= 3979 || c >= 3984 && c <= 3989 || c == 3991 || c >= 3993 && c <= 4013 || c >= 4017 && c <= 4023 || c == 4025 || c >= 8400 && c <= 8412 || c == 8417 || c >= 12330 && c <= 12335 || c == 12441 || c == 12442 || c == 183 || c == 720 || c == 721 || c == 903 || c == 1600 || c == 3654 || c == 3782 || c == 12293 || c >= 12337 && c <= 12341 || c >= 12445 && c <= 12446 || c >= 12540 && c <= 12542;
    };
    Utilities.coalesceText = function(n) {
      for (var m = n.firstChild; m != null; m = m.nextSibling) {
        if (m.nodeType == 3 || m.nodeType == 4) {
          var s = m.nodeValue;
          var first = m;
          m = m.nextSibling;
          while (m != null && (m.nodeType == 3 || m.nodeType == 4)) {
            s += m.nodeValue;
            var del = m;
            m = m.nextSibling;
            del.parentNode.removeChild(del);
          }
          if (first.nodeType == 4) {
            var p = first.parentNode;
            if (first.nextSibling == null) {
              p.removeChild(first);
              p.appendChild(p.ownerDocument.createTextNode(s));
            } else {
              var next = first.nextSibling;
              p.removeChild(first);
              p.insertBefore(p.ownerDocument.createTextNode(s), next);
            }
          } else {
            first.nodeValue = s;
          }
          if (m == null) {
            break;
          }
        } else if (m.nodeType == 1) {
          Utilities.coalesceText(m);
        }
      }
    };
    Utilities.instance_of = function(o, c) {
      while (o != null) {
        if (o.constructor === c) {
          return true;
        }
        if (o === Object) {
          return false;
        }
        o = o.constructor.superclass;
      }
      return false;
    };
    Utilities.getElementById = function(n, id) {
      if (n.nodeType == 1) {
        if (n.getAttribute("id") == id || n.getAttributeNS(null, "id") == id) {
          return n;
        }
      }
      for (var m = n.firstChild; m != null; m = m.nextSibling) {
        var res = Utilities.getElementById(m, id);
        if (res != null) {
          return res;
        }
      }
      return null;
    };
    XPathException.prototype = {};
    XPathException.prototype.constructor = XPathException;
    XPathException.superclass = Object.prototype;
    function XPathException(c, e) {
      this.code = c;
      this.exception = e;
    }
    XPathException.prototype.toString = function() {
      var msg = this.exception ? ": " + this.exception.toString() : "";
      switch (this.code) {
        case XPathException.INVALID_EXPRESSION_ERR:
          return "Invalid expression" + msg;
        case XPathException.TYPE_ERR:
          return "Type error" + msg;
      }
    };
    XPathException.INVALID_EXPRESSION_ERR = 51;
    XPathException.TYPE_ERR = 52;
    XPathExpression.prototype = {};
    XPathExpression.prototype.constructor = XPathExpression;
    XPathExpression.superclass = Object.prototype;
    function XPathExpression(e, r, p) {
      this.xpath = p.parse(e);
      this.context = new XPathContext();
      this.context.namespaceResolver = new XPathNSResolverWrapper(r);
    }
    XPathExpression.prototype.evaluate = function(n, t, res) {
      this.context.expressionContextNode = n;
      var result = this.xpath.evaluate(this.context);
      return new XPathResult(result, t);
    };
    XPathNSResolverWrapper.prototype = {};
    XPathNSResolverWrapper.prototype.constructor = XPathNSResolverWrapper;
    XPathNSResolverWrapper.superclass = Object.prototype;
    function XPathNSResolverWrapper(r) {
      this.xpathNSResolver = r;
    }
    XPathNSResolverWrapper.prototype.getNamespace = function(prefix, n) {
      if (this.xpathNSResolver == null) {
        return null;
      }
      return this.xpathNSResolver.lookupNamespaceURI(prefix);
    };
    NodeXPathNSResolver.prototype = {};
    NodeXPathNSResolver.prototype.constructor = NodeXPathNSResolver;
    NodeXPathNSResolver.superclass = Object.prototype;
    function NodeXPathNSResolver(n) {
      this.node = n;
      this.namespaceResolver = new NamespaceResolver();
    }
    NodeXPathNSResolver.prototype.lookupNamespaceURI = function(prefix) {
      return this.namespaceResolver.getNamespace(prefix, this.node);
    };
    XPathResult.prototype = {};
    XPathResult.prototype.constructor = XPathResult;
    XPathResult.superclass = Object.prototype;
    function XPathResult(v, t) {
      if (t == XPathResult.ANY_TYPE) {
        if (v.constructor === XString) {
          t = XPathResult.STRING_TYPE;
        } else if (v.constructor === XNumber) {
          t = XPathResult.NUMBER_TYPE;
        } else if (v.constructor === XBoolean) {
          t = XPathResult.BOOLEAN_TYPE;
        } else if (v.constructor === XNodeSet) {
          t = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
        }
      }
      this.resultType = t;
      switch (t) {
        case XPathResult.NUMBER_TYPE:
          this.numberValue = v.numberValue();
          return;
        case XPathResult.STRING_TYPE:
          this.stringValue = v.stringValue();
          return;
        case XPathResult.BOOLEAN_TYPE:
          this.booleanValue = v.booleanValue();
          return;
        case XPathResult.ANY_UNORDERED_NODE_TYPE:
        case XPathResult.FIRST_ORDERED_NODE_TYPE:
          if (v.constructor === XNodeSet) {
            this.singleNodeValue = v.first();
            return;
          }
          break;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
          if (v.constructor === XNodeSet) {
            this.invalidIteratorState = false;
            this.nodes = v.toArray();
            this.iteratorIndex = 0;
            return;
          }
          break;
        case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
        case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
          if (v.constructor === XNodeSet) {
            this.nodes = v.toArray();
            this.snapshotLength = this.nodes.length;
            return;
          }
          break;
      }
      throw new XPathException(XPathException.TYPE_ERR);
    }
    XPathResult.prototype.iterateNext = function() {
      if (this.resultType != XPathResult.UNORDERED_NODE_ITERATOR_TYPE && this.resultType != XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
        throw new XPathException(XPathException.TYPE_ERR);
      }
      return this.nodes[this.iteratorIndex++];
    };
    XPathResult.prototype.snapshotItem = function(i) {
      if (this.resultType != XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE && this.resultType != XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
        throw new XPathException(XPathException.TYPE_ERR);
      }
      return this.nodes[i];
    };
    XPathResult.ANY_TYPE = 0;
    XPathResult.NUMBER_TYPE = 1;
    XPathResult.STRING_TYPE = 2;
    XPathResult.BOOLEAN_TYPE = 3;
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
    XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
    XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
    XPathResult.FIRST_ORDERED_NODE_TYPE = 9;
    function installDOM3XPathSupport(doc, p) {
      doc.createExpression = function(e, r) {
        try {
          return new XPathExpression(e, r, p);
        } catch (e2) {
          throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, e2);
        }
      };
      doc.createNSResolver = function(n) {
        return new NodeXPathNSResolver(n);
      };
      doc.evaluate = function(e, cn, r, t, res) {
        if (t < 0 || t > 9) {
          throw { code: 0, toString: function() {
            return "Request type not supported";
          } };
        }
        return doc.createExpression(e, r, p).evaluate(cn, t, res);
      };
    }
    try {
      shouldInstall = true;
      try {
        if (document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("XPath", null)) {
          shouldInstall = false;
        }
      } catch (e) {
      }
      if (shouldInstall) {
        installDOM3XPathSupport(document, new XPathParser());
      }
    } catch (e) {
    }
    var shouldInstall;
    function SelectNodes(doc, xpath) {
      var parser = new XPathParser();
      var xpath = parser.parse(xpath);
      var context = new XPathContext();
      if (doc.documentElement) {
        context.expressionContextNode = doc.documentElement;
      } else {
        context.expressionContextNode = doc;
      }
      var res = xpath.evaluate(context);
      return res.toArray();
    }
    module2.exports = SelectNodes;
  }
});

// node_modules/adal-node/lib/xmlutil.js
var require_xmlutil = __commonJS({
  "node_modules/adal-node/lib/xmlutil.js"(exports2, module2) {
    "use strict";
    var _ = require_underscore_node();
    var select = require_xpath();
    var XMLSerializer = require_lib().XMLSerializer;
    var constants = require_constants();
    module2.exports = exports2;
  }
});

// node_modules/adal-node/lib/mex.js
var require_mex = __commonJS({
  "node_modules/adal-node/lib/mex.js"(exports2, module2) {
    "use strict";
    var axios = require_axios2();
    var url = require("url");
    var DOMParser = require_lib().DOMParser;
    var _ = require_underscore_node();
    var Logger = require_log().Logger;
    var util = require_util();
    var xmlutil = require_xmlutil();
    var select = xmlutil.xpathSelect;
    var Namespaces = require_constants().XmlNamespaces;
    var WSTrustVersion = require_constants().WSTrustVersion;
    function Mex(callContext, url2) {
      this._log = new Logger("MEX", callContext._logContext);
      this._callContext = callContext;
      this._url = url2;
      this._dom = null;
      this._mexDoc = null;
      this._usernamePasswordPolicy = {};
      this._log.verbose("Mex created");
      this._log.verbose("Mex created with url: " + url2, true);
    }
    Object.defineProperty(Mex.prototype, "usernamePasswordPolicy", {
      get: function() {
        return this._usernamePasswordPolicy;
      }
    });
    Mex.prototype.discover = function(callback) {
      this._log.verbose("Retrieving mex");
      this._log.verbose("Retrieving mex at: " + this._url);
      var self2 = this;
      var options = util.createRequestOptions(self2, { headers: { "Content-Type": "application/soap+xml" } });
      axios.get(this._url, options).then((response) => {
        util.logReturnCorrelationId(this._log, "Mex Get", response);
        if (!util.isHttpSuccess(response.status)) {
          var returnErrorString = "Mex Get request returned http error: " + response.status + " and server response: " + response.status;
          ;
          callback(this._log.createError(returnErrorString, true), response.data);
        }
        try {
          self2._mexDoc = response.data;
          var options2 = {
            errorHandler: self2._log.error
          };
          self2._dom = new DOMParser(options2).parseFromString(self2._mexDoc);
          self2._parse(callback);
          return;
        } catch (err) {
          self2._log.error("Failed to parse mex response in to DOM", err, true);
          callback(err);
        }
      }).catch((error2) => {
        if (error2.response) {
          this._log.error("Mex Get request failed with", error2.response.status, true);
          util.logReturnCorrelationId(this._log, "Mex Get", error2.response);
          var returnErrorString = "Mex Get request returned http error: " + error2.response.status + " and server response: " + JSON.stringify(error2.response.data);
          ;
          callback(self2._log.createError(returnErrorString, true), error2.response.data);
        } else if (error2.request) {
          this._log.error("Mex Get request was made but no response was received", error2.request, true);
          callback(self2._log.createError("No response from the server"));
        } else {
          this._log.error("Mex Get request was never made, please check", error2.message, true);
          callback(error2.message);
        }
      });
    };
    var TRANSPORT_BINDING_XPATH = "wsp:ExactlyOne/wsp:All/sp:TransportBinding";
    var TRANSPORT_BINDING_2005_XPATH = "wsp:ExactlyOne/wsp:All/sp2005:TransportBinding";
    Mex.prototype._checkPolicy = function(policyNode) {
      var policyId = null;
      var id = policyNode.getAttributeNS(Namespaces.wsu, "Id");
      var transportBindingNodes = select(policyNode, TRANSPORT_BINDING_XPATH);
      if (transportBindingNodes.length === 0) {
        transportBindingNodes = select(policyNode, TRANSPORT_BINDING_2005_XPATH);
      }
      if (transportBindingNodes.length !== 0) {
        if (id) {
          policyId = id;
        }
      }
      if (policyId) {
        this._log.verbose("found matching policy id");
        this._log.verbose("found matching policy id: " + policyId, true);
      } else {
        if (!id) {
          id = "<no id>";
        }
        this._log.verbose("potential policy did not match required transport binding");
        this._log.verbose("potential policy did not match required transport binding: " + id, true);
      }
      return policyId;
    };
    Mex.prototype._selectUsernamePasswordPolicies = function(xpath) {
      var policies = {};
      var usernameTokenNodes = select(this._dom, xpath);
      if (!usernameTokenNodes.length) {
        this._log.warn("no username token policy nodes found");
        return;
      }
      for (var i = 0; i < usernameTokenNodes.length; i++) {
        var policyNode = usernameTokenNodes[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        var id = this._checkPolicy(policyNode);
        if (id) {
          var idRef = "#" + id;
          policies[idRef] = { id: idRef };
        }
      }
      return _.isEmpty(policies) ? null : policies;
    };
    var SOAP_ACTION_XPATH = "wsdl:operation/soap12:operation/@soapAction";
    var RST_SOAP_ACTION_13 = "http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue";
    var RST_SOAP_ACTION_2005 = "http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue";
    var SOAP_TRANSPORT_XPATH = "soap12:binding/@transport";
    var SOAP_HTTP_TRANSPORT_VALUE = "http://schemas.xmlsoap.org/soap/http";
    Mex.prototype._checkSoapActionAndTransport = function(bindingNode) {
      var soapTransportAttributes;
      var soapAction;
      var soapTransport;
      var bindingName = bindingNode.getAttribute("name");
      var soapActionAttributes = select(bindingNode, SOAP_ACTION_XPATH);
      if (soapActionAttributes.length) {
        soapAction = soapActionAttributes[0].value;
        soapTransportAttributes = select(bindingNode, SOAP_TRANSPORT_XPATH);
      }
      if (soapTransportAttributes.length) {
        soapTransport = soapTransportAttributes[0].value;
      }
      if (soapTransport === SOAP_HTTP_TRANSPORT_VALUE) {
        if (soapAction === RST_SOAP_ACTION_13) {
          this._log.verbose("foud binding matching Action and Transport: " + bindingName);
          return WSTrustVersion.WSTRUST13;
        } else if (soapAction === RST_SOAP_ACTION_2005) {
          this._log.verbose("found binding matching Action and Transport: " + bindingName);
          return WSTrustVersion.WSTRUST2005;
        }
      }
      this._log.verbose("binding node did not match soap Action or Transport: " + bindingName);
      return WSTrustVersion.UNDEFINED;
    };
    Mex.prototype._getMatchingBindings = function(policies) {
      var bindings = {};
      var bindingPolicyRefNodes = select(this._dom, "//wsdl:definitions/wsdl:binding/wsp:PolicyReference");
      for (var i = 0; i < bindingPolicyRefNodes.length; i++) {
        var node = bindingPolicyRefNodes[i];
        var uri = node.getAttribute("URI");
        var policy = policies[uri];
        if (policy) {
          var bindingNode = node.parentNode;
          var bindingName = bindingNode.getAttribute("name");
          var version = this._checkSoapActionAndTransport(bindingNode);
          if (version !== WSTrustVersion.UNDEFINED) {
            var bindingPolicy = {};
            bindingPolicy.url = uri;
            bindingPolicy.version = version;
            bindings[bindingName] = bindingPolicy;
          }
        }
      }
      return _.isEmpty(bindings) ? null : bindings;
    };
    Mex.prototype._urlIsSecure = function(endpointUrl) {
      var parsedUrl = url.parse(endpointUrl);
      return parsedUrl.protocol === "https:";
    };
    var PORT_XPATH = "//wsdl:definitions/wsdl:service/wsdl:port";
    var ADDRESS_XPATH = "wsa10:EndpointReference/wsa10:Address";
    Mex.prototype._getPortsForPolicyBindings = function(bindings, policies) {
      var portNodes = select(this._dom, PORT_XPATH);
      if (portNodes.length === 0) {
        this._log.warning("no ports found");
      }
      for (var i = 0; i < portNodes.length; i++) {
        var portNode = portNodes[i];
        var bindingId = portNode.getAttribute("binding");
        var bindingIdParts = bindingId.split(":");
        bindingId = bindingIdParts[bindingIdParts.length - 1];
        var trustPolicy = bindings[bindingId];
        if (trustPolicy) {
          var bindingPolicy = policies[trustPolicy.url];
          if (bindingPolicy && !bindingPolicy.url) {
            bindingPolicy.version = trustPolicy.version;
            var addressNode = select(portNode, ADDRESS_XPATH);
            if (addressNode === 0) {
              throw this._log.createError("no address nodes on port.");
            }
            var address = xmlutil.findElementText(addressNode[0]);
            if (this._urlIsSecure(address)) {
              bindingPolicy.url = address;
            } else {
              this._log.warn("skipping insecure endpoint: " + address);
            }
          }
        }
      }
    };
    Mex.prototype._selectSingleMatchingPolicy = function(policies) {
      var matchingPolicies = _.filter(policies, function(policy) {
        return policy.url ? true : false;
      });
      if (!matchingPolicies) {
        this._log.warn("no policies found with an url");
        return;
      }
      var wstrust13Policy = null, wstrust2005Policy = null;
      for (var i = 0; i < matchingPolicies.length; ++i) {
        var matchingPolicy = matchingPolicies[i];
        if (WSTrustVersion.WSTRUST13 === matchingPolicy.version) {
          wstrust13Policy = matchingPolicy;
        } else if (WSTrustVersion.WSTRUST2005 === matchingPolicy.version) {
          wstrust2005Policy = matchingPolicy;
        }
      }
      if (!wstrust13Policy && !wstrust2005Policy) {
        this._log.warn("no policies found with an url");
        this._usernamePasswordPolicy = null;
        return;
      }
      this._usernamePasswordPolicy = wstrust13Policy ? wstrust13Policy : wstrust2005Policy;
    };
    Mex.prototype._parse = function(callback) {
      var self2 = this;
      var xpathExpression = "//wsdl:definitions/wsp:Policy/wsp:ExactlyOne/wsp:All/sp:SignedEncryptedSupportingTokens/wsp:Policy/sp:UsernameToken/wsp:Policy/sp:WssUsernameToken10";
      var policies = self2._selectUsernamePasswordPolicies(xpathExpression);
      xpathExpression = "//wsdl:definitions/wsp:Policy/wsp:ExactlyOne/wsp:All/sp2005:SignedSupportingTokens/wsp:Policy/sp2005:UsernameToken/wsp:Policy/sp2005:WssUsernameToken10";
      if (policies) {
        _.extend(policies, self2._selectUsernamePasswordPolicies(xpathExpression));
      } else {
        policies = self2._selectUsernamePasswordPolicies(xpathExpression);
      }
      if (!policies) {
        callback(self2._log.createError("No matching policies"));
        return;
      }
      var bindings = self2._getMatchingBindings(policies);
      if (!bindings) {
        callback(self2._log.createError("No matching bindings"));
        return;
      }
      self2._getPortsForPolicyBindings(bindings, policies);
      self2._selectSingleMatchingPolicy(policies);
      var err = this._url ? void 0 : this._log.createError("No ws-trust endpoints match requirements.");
      callback(err);
    };
    module2.exports = Mex;
  }
});

// node_modules/async/dist/async.js
var require_async = __commonJS({
  "node_modules/async/dist/async.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.async = global2.async || {});
    })(exports2, function(exports3) {
      "use strict";
      function slice(arrayLike, start) {
        start = start | 0;
        var newLen = Math.max(arrayLike.length - start, 0);
        var newArr = Array(newLen);
        for (var idx = 0; idx < newLen; idx++) {
          newArr[idx] = arrayLike[start + idx];
        }
        return newArr;
      }
      var apply = function(fn2) {
        var args = slice(arguments, 1);
        return function() {
          var callArgs = slice(arguments);
          return fn2.apply(null, args.concat(callArgs));
        };
      };
      var initialParams = function(fn2) {
        return function() {
          var args = slice(arguments);
          var callback = args.pop();
          fn2.call(this, args, callback);
        };
      };
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      var hasSetImmediate = typeof setImmediate === "function" && setImmediate;
      var hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
      function fallback(fn2) {
        setTimeout(fn2, 0);
      }
      function wrap(defer) {
        return function(fn2) {
          var args = slice(arguments, 1);
          defer(function() {
            fn2.apply(null, args);
          });
        };
      }
      var _defer;
      if (hasSetImmediate) {
        _defer = setImmediate;
      } else if (hasNextTick) {
        _defer = process.nextTick;
      } else {
        _defer = fallback;
      }
      var setImmediate$1 = wrap(_defer);
      function asyncify(func) {
        return initialParams(function(args, callback) {
          var result;
          try {
            result = func.apply(this, args);
          } catch (e) {
            return callback(e);
          }
          if (isObject(result) && typeof result.then === "function") {
            result.then(function(value) {
              invokeCallback(callback, null, value);
            }, function(err) {
              invokeCallback(callback, err.message ? err : new Error(err));
            });
          } else {
            callback(null, result);
          }
        });
      }
      function invokeCallback(callback, error2, value) {
        try {
          callback(error2, value);
        } catch (e) {
          setImmediate$1(rethrow, e);
        }
      }
      function rethrow(error2) {
        throw error2;
      }
      var supportsSymbol = typeof Symbol === "function";
      function isAsync(fn2) {
        return supportsSymbol && fn2[Symbol.toStringTag] === "AsyncFunction";
      }
      function wrapAsync(asyncFn) {
        return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
      }
      function applyEach$1(eachfn) {
        return function(fns) {
          var args = slice(arguments, 1);
          var go = initialParams(function(args2, callback) {
            var that = this;
            return eachfn(fns, function(fn2, cb) {
              wrapAsync(fn2).apply(that, args2.concat(cb));
            }, callback);
          });
          if (args.length) {
            return go.apply(this, args);
          } else {
            return go;
          }
        };
      }
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var Symbol$1 = root.Symbol;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
        try {
          value[symToStringTag$1] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag$1] = tag;
          } else {
            delete value[symToStringTag$1];
          }
        }
        return result;
      }
      var objectProto$1 = Object.prototype;
      var nativeObjectToString$1 = objectProto$1.toString;
      function objectToString(value) {
        return nativeObjectToString$1.call(value);
      }
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      var breakLoop = {};
      function noop() {
      }
      function once(fn2) {
        return function() {
          if (fn2 === null)
            return;
          var callFn = fn2;
          fn2 = null;
          callFn.apply(this, arguments);
        };
      }
      var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator;
      var getIterator = function(coll) {
        return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
      };
      function baseTimes(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var argsTag = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      var objectProto$3 = Object.prototype;
      var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
      var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array.isArray;
      function stubFalse() {
        return false;
      }
      var freeExports = typeof exports3 == "object" && exports3 && !exports3.nodeType && exports3;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      var MAX_SAFE_INTEGER$1 = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER$1 : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      var argsTag$1 = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag$1 = "[object Function]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      var freeExports$1 = typeof exports3 == "object" && exports3 && !exports3.nodeType && exports3;
      var freeModule$1 = freeExports$1 && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
      var freeProcess = moduleExports$1 && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      var objectProto$2 = Object.prototype;
      var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      var objectProto$5 = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
        return value === proto;
      }
      function overArg(func, transform2) {
        return function(arg) {
          return func(transform2(arg));
        };
      }
      var nativeKeys = overArg(Object.keys, Object);
      var objectProto$4 = Object.prototype;
      var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty$3.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function createArrayIterator(coll) {
        var i = -1;
        var len = coll.length;
        return function next() {
          return ++i < len ? { value: coll[i], key: i } : null;
        };
      }
      function createES2015Iterator(iterator2) {
        var i = -1;
        return function next() {
          var item = iterator2.next();
          if (item.done)
            return null;
          i++;
          return { value: item.value, key: i };
        };
      }
      function createObjectIterator(obj) {
        var okeys = keys(obj);
        var i = -1;
        var len = okeys.length;
        return function next() {
          var key = okeys[++i];
          return i < len ? { value: obj[key], key } : null;
        };
      }
      function iterator(coll) {
        if (isArrayLike(coll)) {
          return createArrayIterator(coll);
        }
        var iterator2 = getIterator(coll);
        return iterator2 ? createES2015Iterator(iterator2) : createObjectIterator(coll);
      }
      function onlyOnce(fn2) {
        return function() {
          if (fn2 === null)
            throw new Error("Callback was already called.");
          var callFn = fn2;
          fn2 = null;
          callFn.apply(this, arguments);
        };
      }
      function _eachOfLimit(limit) {
        return function(obj, iteratee, callback) {
          callback = once(callback || noop);
          if (limit <= 0 || !obj) {
            return callback(null);
          }
          var nextElem = iterator(obj);
          var done = false;
          var running = 0;
          var looping = false;
          function iterateeCallback(err, value) {
            running -= 1;
            if (err) {
              done = true;
              callback(err);
            } else if (value === breakLoop || done && running <= 0) {
              done = true;
              return callback(null);
            } else if (!looping) {
              replenish();
            }
          }
          function replenish() {
            looping = true;
            while (running < limit && !done) {
              var elem = nextElem();
              if (elem === null) {
                done = true;
                if (running <= 0) {
                  callback(null);
                }
                return;
              }
              running += 1;
              iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
          }
          replenish();
        };
      }
      function eachOfLimit(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
      }
      function doLimit(fn2, limit) {
        return function(iterable, iteratee, callback) {
          return fn2(iterable, limit, iteratee, callback);
        };
      }
      function eachOfArrayLike(coll, iteratee, callback) {
        callback = once(callback || noop);
        var index2 = 0, completed = 0, length = coll.length;
        if (length === 0) {
          callback(null);
        }
        function iteratorCallback(err, value) {
          if (err) {
            callback(err);
          } else if (++completed === length || value === breakLoop) {
            callback(null);
          }
        }
        for (; index2 < length; index2++) {
          iteratee(coll[index2], index2, onlyOnce(iteratorCallback));
        }
      }
      var eachOfGeneric = doLimit(eachOfLimit, Infinity);
      var eachOf = function(coll, iteratee, callback) {
        var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
        eachOfImplementation(coll, wrapAsync(iteratee), callback);
      };
      function doParallel(fn2) {
        return function(obj, iteratee, callback) {
          return fn2(eachOf, obj, wrapAsync(iteratee), callback);
        };
      }
      function _asyncMap(eachfn, arr, iteratee, callback) {
        callback = callback || noop;
        arr = arr || [];
        var results = [];
        var counter = 0;
        var _iteratee = wrapAsync(iteratee);
        eachfn(arr, function(value, _, callback2) {
          var index2 = counter++;
          _iteratee(value, function(err, v) {
            results[index2] = v;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
      var map = doParallel(_asyncMap);
      var applyEach = applyEach$1(map);
      function doParallelLimit(fn2) {
        return function(obj, limit, iteratee, callback) {
          return fn2(_eachOfLimit(limit), obj, wrapAsync(iteratee), callback);
        };
      }
      var mapLimit = doParallelLimit(_asyncMap);
      var mapSeries = doLimit(mapLimit, 1);
      var applyEachSeries = applyEach$1(mapSeries);
      function arrayEach(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (iteratee(array[index2], index2, array) === false) {
            break;
          }
        }
        return array;
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index2];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      var baseFor = createBaseFor();
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index2-- : ++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var auto = function(tasks, concurrency, callback) {
        if (typeof concurrency === "function") {
          callback = concurrency;
          concurrency = null;
        }
        callback = once(callback || noop);
        var keys$$1 = keys(tasks);
        var numTasks = keys$$1.length;
        if (!numTasks) {
          return callback(null);
        }
        if (!concurrency) {
          concurrency = numTasks;
        }
        var results = {};
        var runningTasks = 0;
        var hasError = false;
        var listeners = Object.create(null);
        var readyTasks = [];
        var readyToCheck = [];
        var uncheckedDependencies = {};
        baseForOwn(tasks, function(task, key) {
          if (!isArray(task)) {
            enqueueTask(key, [task]);
            readyToCheck.push(key);
            return;
          }
          var dependencies = task.slice(0, task.length - 1);
          var remainingDependencies = dependencies.length;
          if (remainingDependencies === 0) {
            enqueueTask(key, task);
            readyToCheck.push(key);
            return;
          }
          uncheckedDependencies[key] = remainingDependencies;
          arrayEach(dependencies, function(dependencyName) {
            if (!tasks[dependencyName]) {
              throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
            }
            addListener(dependencyName, function() {
              remainingDependencies--;
              if (remainingDependencies === 0) {
                enqueueTask(key, task);
              }
            });
          });
        });
        checkForDeadlocks();
        processQueue();
        function enqueueTask(key, task) {
          readyTasks.push(function() {
            runTask(key, task);
          });
        }
        function processQueue() {
          if (readyTasks.length === 0 && runningTasks === 0) {
            return callback(null, results);
          }
          while (readyTasks.length && runningTasks < concurrency) {
            var run = readyTasks.shift();
            run();
          }
        }
        function addListener(taskName, fn2) {
          var taskListeners = listeners[taskName];
          if (!taskListeners) {
            taskListeners = listeners[taskName] = [];
          }
          taskListeners.push(fn2);
        }
        function taskComplete(taskName) {
          var taskListeners = listeners[taskName] || [];
          arrayEach(taskListeners, function(fn2) {
            fn2();
          });
          processQueue();
        }
        function runTask(key, task) {
          if (hasError)
            return;
          var taskCallback = onlyOnce(function(err, result) {
            runningTasks--;
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            }
            if (err) {
              var safeResults = {};
              baseForOwn(results, function(val, rkey) {
                safeResults[rkey] = val;
              });
              safeResults[key] = result;
              hasError = true;
              listeners = Object.create(null);
              callback(err, safeResults);
            } else {
              results[key] = result;
              taskComplete(key);
            }
          });
          runningTasks++;
          var taskFn = wrapAsync(task[task.length - 1]);
          if (task.length > 1) {
            taskFn(results, taskCallback);
          } else {
            taskFn(taskCallback);
          }
        }
        function checkForDeadlocks() {
          var currentTask;
          var counter = 0;
          while (readyToCheck.length) {
            currentTask = readyToCheck.pop();
            counter++;
            arrayEach(getDependents(currentTask), function(dependent) {
              if (--uncheckedDependencies[dependent] === 0) {
                readyToCheck.push(dependent);
              }
            });
          }
          if (counter !== numTasks) {
            throw new Error("async.auto cannot execute tasks due to a recursive dependency");
          }
        }
        function getDependents(taskName) {
          var result = [];
          baseForOwn(tasks, function(task, key) {
            if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
              result.push(key);
            }
          });
          return result;
        }
      };
      function arrayMap(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var INFINITY = 1 / 0;
      var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function baseSlice(array, start, end) {
        var index2 = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index2 < length) {
          result[index2] = array[index2 + start];
        }
        return result;
      }
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === void 0 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index2 = strSymbols.length;
        while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index2 = -1, length = strSymbols.length;
        while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function asciiToArray(string) {
        return string.split("");
      }
      var rsAstralRange = "\\ud800-\\udfff";
      var rsComboMarksRange = "\\u0300-\\u036f";
      var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
      var rsComboSymbolsRange = "\\u20d0-\\u20ff";
      var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
      var rsVarRange = "\\ufe0e\\ufe0f";
      var rsZWJ = "\\u200d";
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      var rsAstralRange$1 = "\\ud800-\\udfff";
      var rsComboMarksRange$1 = "\\u0300-\\u036f";
      var reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f";
      var rsComboSymbolsRange$1 = "\\u20d0-\\u20ff";
      var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
      var rsVarRange$1 = "\\ufe0e\\ufe0f";
      var rsAstral = "[" + rsAstralRange$1 + "]";
      var rsCombo = "[" + rsComboRange$1 + "]";
      var rsFitz = "\\ud83c[\\udffb-\\udfff]";
      var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
      var rsNonAstral = "[^" + rsAstralRange$1 + "]";
      var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
      var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
      var rsZWJ$1 = "\\u200d";
      var reOptMod = rsModifier + "?";
      var rsOptVar = "[" + rsVarRange$1 + "]?";
      var rsOptJoin = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
      var rsSeq = rsOptVar + reOptMod + rsOptJoin;
      var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var reTrim = /^\s+|\s+$/g;
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === void 0)) {
          return string.replace(reTrim, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      var FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
      var FN_ARG_SPLIT = /,/;
      var FN_ARG = /(=.+)?(\s*)$/;
      var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
      function parseParams(func) {
        func = func.toString().replace(STRIP_COMMENTS, "");
        func = func.match(FN_ARGS)[2].replace(" ", "");
        func = func ? func.split(FN_ARG_SPLIT) : [];
        func = func.map(function(arg) {
          return trim(arg.replace(FN_ARG, ""));
        });
        return func;
      }
      function autoInject(tasks, callback) {
        var newTasks = {};
        baseForOwn(tasks, function(taskFn, key) {
          var params;
          var fnIsAsync = isAsync(taskFn);
          var hasNoDeps = !fnIsAsync && taskFn.length === 1 || fnIsAsync && taskFn.length === 0;
          if (isArray(taskFn)) {
            params = taskFn.slice(0, -1);
            taskFn = taskFn[taskFn.length - 1];
            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
          } else if (hasNoDeps) {
            newTasks[key] = taskFn;
          } else {
            params = parseParams(taskFn);
            if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
              throw new Error("autoInject task functions require explicit parameters.");
            }
            if (!fnIsAsync)
              params.pop();
            newTasks[key] = params.concat(newTask);
          }
          function newTask(results, taskCb) {
            var newArgs = arrayMap(params, function(name) {
              return results[name];
            });
            newArgs.push(taskCb);
            wrapAsync(taskFn).apply(null, newArgs);
          }
        });
        auto(newTasks, callback);
      }
      function DLL() {
        this.head = this.tail = null;
        this.length = 0;
      }
      function setInitial(dll, node) {
        dll.length = 1;
        dll.head = dll.tail = node;
      }
      DLL.prototype.removeLink = function(node) {
        if (node.prev)
          node.prev.next = node.next;
        else
          this.head = node.next;
        if (node.next)
          node.next.prev = node.prev;
        else
          this.tail = node.prev;
        node.prev = node.next = null;
        this.length -= 1;
        return node;
      };
      DLL.prototype.empty = function() {
        while (this.head)
          this.shift();
        return this;
      };
      DLL.prototype.insertAfter = function(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next)
          node.next.prev = newNode;
        else
          this.tail = newNode;
        node.next = newNode;
        this.length += 1;
      };
      DLL.prototype.insertBefore = function(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev)
          node.prev.next = newNode;
        else
          this.head = newNode;
        node.prev = newNode;
        this.length += 1;
      };
      DLL.prototype.unshift = function(node) {
        if (this.head)
          this.insertBefore(this.head, node);
        else
          setInitial(this, node);
      };
      DLL.prototype.push = function(node) {
        if (this.tail)
          this.insertAfter(this.tail, node);
        else
          setInitial(this, node);
      };
      DLL.prototype.shift = function() {
        return this.head && this.removeLink(this.head);
      };
      DLL.prototype.pop = function() {
        return this.tail && this.removeLink(this.tail);
      };
      DLL.prototype.toArray = function() {
        var arr = Array(this.length);
        var curr = this.head;
        for (var idx = 0; idx < this.length; idx++) {
          arr[idx] = curr.data;
          curr = curr.next;
        }
        return arr;
      };
      DLL.prototype.remove = function(testFn) {
        var curr = this.head;
        while (!!curr) {
          var next = curr.next;
          if (testFn(curr)) {
            this.removeLink(curr);
          }
          curr = next;
        }
        return this;
      };
      function queue(worker, concurrency, payload) {
        if (concurrency == null) {
          concurrency = 1;
        } else if (concurrency === 0) {
          throw new Error("Concurrency must not be zero");
        }
        var _worker = wrapAsync(worker);
        var numRunning = 0;
        var workersList = [];
        var processingScheduled = false;
        function _insert(data, insertAtFront, callback) {
          if (callback != null && typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!isArray(data)) {
            data = [data];
          }
          if (data.length === 0 && q.idle()) {
            return setImmediate$1(function() {
              q.drain();
            });
          }
          for (var i = 0, l = data.length; i < l; i++) {
            var item = {
              data: data[i],
              callback: callback || noop
            };
            if (insertAtFront) {
              q._tasks.unshift(item);
            } else {
              q._tasks.push(item);
            }
          }
          if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(function() {
              processingScheduled = false;
              q.process();
            });
          }
        }
        function _next(tasks) {
          return function(err) {
            numRunning -= 1;
            for (var i = 0, l = tasks.length; i < l; i++) {
              var task = tasks[i];
              var index2 = baseIndexOf(workersList, task, 0);
              if (index2 === 0) {
                workersList.shift();
              } else if (index2 > 0) {
                workersList.splice(index2, 1);
              }
              task.callback.apply(task, arguments);
              if (err != null) {
                q.error(err, task.data);
              }
            }
            if (numRunning <= q.concurrency - q.buffer) {
              q.unsaturated();
            }
            if (q.idle()) {
              q.drain();
            }
            q.process();
          };
        }
        var isProcessing = false;
        var q = {
          _tasks: new DLL(),
          concurrency,
          payload,
          saturated: noop,
          unsaturated: noop,
          buffer: concurrency / 4,
          empty: noop,
          drain: noop,
          error: noop,
          started: false,
          paused: false,
          push: function(data, callback) {
            _insert(data, false, callback);
          },
          kill: function() {
            q.drain = noop;
            q._tasks.empty();
          },
          unshift: function(data, callback) {
            _insert(data, true, callback);
          },
          remove: function(testFn) {
            q._tasks.remove(testFn);
          },
          process: function() {
            if (isProcessing) {
              return;
            }
            isProcessing = true;
            while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
              var tasks = [], data = [];
              var l = q._tasks.length;
              if (q.payload)
                l = Math.min(l, q.payload);
              for (var i = 0; i < l; i++) {
                var node = q._tasks.shift();
                tasks.push(node);
                workersList.push(node);
                data.push(node.data);
              }
              numRunning += 1;
              if (q._tasks.length === 0) {
                q.empty();
              }
              if (numRunning === q.concurrency) {
                q.saturated();
              }
              var cb = onlyOnce(_next(tasks));
              _worker(data, cb);
            }
            isProcessing = false;
          },
          length: function() {
            return q._tasks.length;
          },
          running: function() {
            return numRunning;
          },
          workersList: function() {
            return workersList;
          },
          idle: function() {
            return q._tasks.length + numRunning === 0;
          },
          pause: function() {
            q.paused = true;
          },
          resume: function() {
            if (q.paused === false) {
              return;
            }
            q.paused = false;
            setImmediate$1(q.process);
          }
        };
        return q;
      }
      function cargo(worker, payload) {
        return queue(worker, 1, payload);
      }
      var eachOfSeries = doLimit(eachOfLimit, 1);
      function reduce(coll, memo, iteratee, callback) {
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        eachOfSeries(coll, function(x, i, callback2) {
          _iteratee(memo, x, function(err, v) {
            memo = v;
            callback2(err);
          });
        }, function(err) {
          callback(err, memo);
        });
      }
      function seq() {
        var _functions = arrayMap(arguments, wrapAsync);
        return function() {
          var args = slice(arguments);
          var that = this;
          var cb = args[args.length - 1];
          if (typeof cb == "function") {
            args.pop();
          } else {
            cb = noop;
          }
          reduce(_functions, args, function(newargs, fn2, cb2) {
            fn2.apply(that, newargs.concat(function(err) {
              var nextargs = slice(arguments, 1);
              cb2(err, nextargs);
            }));
          }, function(err, results) {
            cb.apply(that, [err].concat(results));
          });
        };
      }
      var compose = function() {
        return seq.apply(null, slice(arguments).reverse());
      };
      var _concat = Array.prototype.concat;
      var concatLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback2) {
          _iteratee(val, function(err) {
            if (err)
              return callback2(err);
            return callback2(null, slice(arguments, 1));
          });
        }, function(err, mapResults) {
          var result = [];
          for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
              result = _concat.apply(result, mapResults[i]);
            }
          }
          return callback(err, result);
        });
      };
      var concat = doLimit(concatLimit, Infinity);
      var concatSeries = doLimit(concatLimit, 1);
      var constant = function() {
        var values = slice(arguments);
        var args = [null].concat(values);
        return function() {
          var callback = arguments[arguments.length - 1];
          return callback.apply(this, args);
        };
      };
      function identity(value) {
        return value;
      }
      function _createTester(check, getResult) {
        return function(eachfn, arr, iteratee, cb) {
          cb = cb || noop;
          var testPassed = false;
          var testResult;
          eachfn(arr, function(value, _, callback) {
            iteratee(value, function(err, result) {
              if (err) {
                callback(err);
              } else if (check(result) && !testResult) {
                testPassed = true;
                testResult = getResult(true, value);
                callback(null, breakLoop);
              } else {
                callback();
              }
            });
          }, function(err) {
            if (err) {
              cb(err);
            } else {
              cb(null, testPassed ? testResult : getResult(false));
            }
          });
        };
      }
      function _findGetResult(v, x) {
        return x;
      }
      var detect = doParallel(_createTester(identity, _findGetResult));
      var detectLimit = doParallelLimit(_createTester(identity, _findGetResult));
      var detectSeries = doLimit(detectLimit, 1);
      function consoleFunc(name) {
        return function(fn2) {
          var args = slice(arguments, 1);
          args.push(function(err) {
            var args2 = slice(arguments, 1);
            if (typeof console === "object") {
              if (err) {
                if (console.error) {
                  console.error(err);
                }
              } else if (console[name]) {
                arrayEach(args2, function(x) {
                  console[name](x);
                });
              }
            }
          });
          wrapAsync(fn2).apply(null, args);
        };
      }
      var dir = consoleFunc("dir");
      function doDuring(fn2, test, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn2);
        var _test = wrapAsync(test);
        function next(err) {
          if (err)
            return callback(err);
          var args = slice(arguments, 1);
          args.push(check);
          _test.apply(this, args);
        }
        function check(err, truth) {
          if (err)
            return callback(err);
          if (!truth)
            return callback(null);
          _fn(next);
        }
        check(null, true);
      }
      function doWhilst(iteratee, test, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        var next = function(err) {
          if (err)
            return callback(err);
          var args = slice(arguments, 1);
          if (test.apply(this, args))
            return _iteratee(next);
          callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
      }
      function doUntil(iteratee, test, callback) {
        doWhilst(iteratee, function() {
          return !test.apply(this, arguments);
        }, callback);
      }
      function during(test, fn2, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn2);
        var _test = wrapAsync(test);
        function next(err) {
          if (err)
            return callback(err);
          _test(check);
        }
        function check(err, truth) {
          if (err)
            return callback(err);
          if (!truth)
            return callback(null);
          _fn(next);
        }
        _test(check);
      }
      function _withoutIndex(iteratee) {
        return function(value, index2, callback) {
          return iteratee(value, callback);
        };
      }
      function eachLimit(coll, iteratee, callback) {
        eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      function eachLimit$1(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      var eachSeries = doLimit(eachLimit$1, 1);
      function ensureAsync(fn2) {
        if (isAsync(fn2))
          return fn2;
        return initialParams(function(args, callback) {
          var sync = true;
          args.push(function() {
            var innerArgs = arguments;
            if (sync) {
              setImmediate$1(function() {
                callback.apply(null, innerArgs);
              });
            } else {
              callback.apply(null, innerArgs);
            }
          });
          fn2.apply(this, args);
          sync = false;
        });
      }
      function notId(v) {
        return !v;
      }
      var every = doParallel(_createTester(notId, notId));
      var everyLimit = doParallelLimit(_createTester(notId, notId));
      var everySeries = doLimit(everyLimit, 1);
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      function filterArray(eachfn, arr, iteratee, callback) {
        var truthValues = new Array(arr.length);
        eachfn(arr, function(x, index2, callback2) {
          iteratee(x, function(err, v) {
            truthValues[index2] = !!v;
            callback2(err);
          });
        }, function(err) {
          if (err)
            return callback(err);
          var results = [];
          for (var i = 0; i < arr.length; i++) {
            if (truthValues[i])
              results.push(arr[i]);
          }
          callback(null, results);
        });
      }
      function filterGeneric(eachfn, coll, iteratee, callback) {
        var results = [];
        eachfn(coll, function(x, index2, callback2) {
          iteratee(x, function(err, v) {
            if (err) {
              callback2(err);
            } else {
              if (v) {
                results.push({ index: index2, value: x });
              }
              callback2();
            }
          });
        }, function(err) {
          if (err) {
            callback(err);
          } else {
            callback(null, arrayMap(results.sort(function(a, b) {
              return a.index - b.index;
            }), baseProperty("value")));
          }
        });
      }
      function _filter(eachfn, coll, iteratee, callback) {
        var filter2 = isArrayLike(coll) ? filterArray : filterGeneric;
        filter2(eachfn, coll, wrapAsync(iteratee), callback || noop);
      }
      var filter = doParallel(_filter);
      var filterLimit = doParallelLimit(_filter);
      var filterSeries = doLimit(filterLimit, 1);
      function forever(fn2, errback) {
        var done = onlyOnce(errback || noop);
        var task = wrapAsync(ensureAsync(fn2));
        function next(err) {
          if (err)
            return done(err);
          task(next);
        }
        next();
      }
      var groupByLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback2) {
          _iteratee(val, function(err, key) {
            if (err)
              return callback2(err);
            return callback2(null, { key, val });
          });
        }, function(err, mapResults) {
          var result = {};
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
              var key = mapResults[i].key;
              var val = mapResults[i].val;
              if (hasOwnProperty2.call(result, key)) {
                result[key].push(val);
              } else {
                result[key] = [val];
              }
            }
          }
          return callback(err, result);
        });
      };
      var groupBy = doLimit(groupByLimit, Infinity);
      var groupBySeries = doLimit(groupByLimit, 1);
      var log = consoleFunc("log");
      function mapValuesLimit(obj, limit, iteratee, callback) {
        callback = once(callback || noop);
        var newObj = {};
        var _iteratee = wrapAsync(iteratee);
        eachOfLimit(obj, limit, function(val, key, next) {
          _iteratee(val, key, function(err, result) {
            if (err)
              return next(err);
            newObj[key] = result;
            next();
          });
        }, function(err) {
          callback(err, newObj);
        });
      }
      var mapValues = doLimit(mapValuesLimit, Infinity);
      var mapValuesSeries = doLimit(mapValuesLimit, 1);
      function has(obj, key) {
        return key in obj;
      }
      function memoize(fn2, hasher) {
        var memo = Object.create(null);
        var queues = Object.create(null);
        hasher = hasher || identity;
        var _fn = wrapAsync(fn2);
        var memoized = initialParams(function memoized2(args, callback) {
          var key = hasher.apply(null, args);
          if (has(memo, key)) {
            setImmediate$1(function() {
              callback.apply(null, memo[key]);
            });
          } else if (has(queues, key)) {
            queues[key].push(callback);
          } else {
            queues[key] = [callback];
            _fn.apply(null, args.concat(function() {
              var args2 = slice(arguments);
              memo[key] = args2;
              var q = queues[key];
              delete queues[key];
              for (var i = 0, l = q.length; i < l; i++) {
                q[i].apply(null, args2);
              }
            }));
          }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn2;
        return memoized;
      }
      var _defer$1;
      if (hasNextTick) {
        _defer$1 = process.nextTick;
      } else if (hasSetImmediate) {
        _defer$1 = setImmediate;
      } else {
        _defer$1 = fallback;
      }
      var nextTick = wrap(_defer$1);
      function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = isArrayLike(tasks) ? [] : {};
        eachfn(tasks, function(task, key, callback2) {
          wrapAsync(task)(function(err, result) {
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            }
            results[key] = result;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
      function parallelLimit(tasks, callback) {
        _parallel(eachOf, tasks, callback);
      }
      function parallelLimit$1(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
      }
      var queue$1 = function(worker, concurrency) {
        var _worker = wrapAsync(worker);
        return queue(function(items, cb) {
          _worker(items[0], cb);
        }, concurrency, 1);
      };
      var priorityQueue = function(worker, concurrency) {
        var q = queue$1(worker, concurrency);
        q.push = function(data, priority, callback) {
          if (callback == null)
            callback = noop;
          if (typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!isArray(data)) {
            data = [data];
          }
          if (data.length === 0) {
            return setImmediate$1(function() {
              q.drain();
            });
          }
          priority = priority || 0;
          var nextNode = q._tasks.head;
          while (nextNode && priority >= nextNode.priority) {
            nextNode = nextNode.next;
          }
          for (var i = 0, l = data.length; i < l; i++) {
            var item = {
              data: data[i],
              priority,
              callback
            };
            if (nextNode) {
              q._tasks.insertBefore(nextNode, item);
            } else {
              q._tasks.push(item);
            }
          }
          setImmediate$1(q.process);
        };
        delete q.unshift;
        return q;
      };
      function race(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks))
          return callback(new TypeError("First argument to race must be an array of functions"));
        if (!tasks.length)
          return callback();
        for (var i = 0, l = tasks.length; i < l; i++) {
          wrapAsync(tasks[i])(callback);
        }
      }
      function reduceRight(array, memo, iteratee, callback) {
        var reversed = slice(array).reverse();
        reduce(reversed, memo, iteratee, callback);
      }
      function reflect(fn2) {
        var _fn = wrapAsync(fn2);
        return initialParams(function reflectOn(args, reflectCallback) {
          args.push(function callback(error2, cbArg) {
            if (error2) {
              reflectCallback(null, { error: error2 });
            } else {
              var value;
              if (arguments.length <= 2) {
                value = cbArg;
              } else {
                value = slice(arguments, 1);
              }
              reflectCallback(null, { value });
            }
          });
          return _fn.apply(this, args);
        });
      }
      function reflectAll(tasks) {
        var results;
        if (isArray(tasks)) {
          results = arrayMap(tasks, reflect);
        } else {
          results = {};
          baseForOwn(tasks, function(task, key) {
            results[key] = reflect.call(this, task);
          });
        }
        return results;
      }
      function reject$1(eachfn, arr, iteratee, callback) {
        _filter(eachfn, arr, function(value, cb) {
          iteratee(value, function(err, v) {
            cb(err, !v);
          });
        }, callback);
      }
      var reject = doParallel(reject$1);
      var rejectLimit = doParallelLimit(reject$1);
      var rejectSeries = doLimit(rejectLimit, 1);
      function constant$1(value) {
        return function() {
          return value;
        };
      }
      function retry(opts, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;
        var options = {
          times: DEFAULT_TIMES,
          intervalFunc: constant$1(DEFAULT_INTERVAL)
        };
        function parseTimes(acc, t) {
          if (typeof t === "object") {
            acc.times = +t.times || DEFAULT_TIMES;
            acc.intervalFunc = typeof t.interval === "function" ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
            acc.errorFilter = t.errorFilter;
          } else if (typeof t === "number" || typeof t === "string") {
            acc.times = +t || DEFAULT_TIMES;
          } else {
            throw new Error("Invalid arguments for async.retry");
          }
        }
        if (arguments.length < 3 && typeof opts === "function") {
          callback = task || noop;
          task = opts;
        } else {
          parseTimes(options, opts);
          callback = callback || noop;
        }
        if (typeof task !== "function") {
          throw new Error("Invalid arguments for async.retry");
        }
        var _task = wrapAsync(task);
        var attempt = 1;
        function retryAttempt() {
          _task(function(err) {
            if (err && attempt++ < options.times && (typeof options.errorFilter != "function" || options.errorFilter(err))) {
              setTimeout(retryAttempt, options.intervalFunc(attempt));
            } else {
              callback.apply(null, arguments);
            }
          });
        }
        retryAttempt();
      }
      var retryable = function(opts, task) {
        if (!task) {
          task = opts;
          opts = null;
        }
        var _task = wrapAsync(task);
        return initialParams(function(args, callback) {
          function taskFn(cb) {
            _task.apply(null, args.concat(cb));
          }
          if (opts)
            retry(opts, taskFn, callback);
          else
            retry(taskFn, callback);
        });
      };
      function series(tasks, callback) {
        _parallel(eachOfSeries, tasks, callback);
      }
      var some = doParallel(_createTester(Boolean, identity));
      var someLimit = doParallelLimit(_createTester(Boolean, identity));
      var someSeries = doLimit(someLimit, 1);
      function sortBy(coll, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        map(coll, function(x, callback2) {
          _iteratee(x, function(err, criteria) {
            if (err)
              return callback2(err);
            callback2(null, { value: x, criteria });
          });
        }, function(err, results) {
          if (err)
            return callback(err);
          callback(null, arrayMap(results.sort(comparator), baseProperty("value")));
        });
        function comparator(left, right) {
          var a = left.criteria, b = right.criteria;
          return a < b ? -1 : a > b ? 1 : 0;
        }
      }
      function timeout(asyncFn, milliseconds, info) {
        var fn2 = wrapAsync(asyncFn);
        return initialParams(function(args, callback) {
          var timedOut = false;
          var timer;
          function timeoutCallback() {
            var name = asyncFn.name || "anonymous";
            var error2 = new Error('Callback function "' + name + '" timed out.');
            error2.code = "ETIMEDOUT";
            if (info) {
              error2.info = info;
            }
            timedOut = true;
            callback(error2);
          }
          args.push(function() {
            if (!timedOut) {
              callback.apply(null, arguments);
              clearTimeout(timer);
            }
          });
          timer = setTimeout(timeoutCallback, milliseconds);
          fn2.apply(null, args);
        });
      }
      var nativeCeil = Math.ceil;
      var nativeMax = Math.max;
      function baseRange(start, end, step, fromRight) {
        var index2 = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
        while (length--) {
          result[fromRight ? length : ++index2] = start;
          start += step;
        }
        return result;
      }
      function timeLimit(count, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        mapLimit(baseRange(0, count, 1), limit, _iteratee, callback);
      }
      var times = doLimit(timeLimit, Infinity);
      var timesSeries = doLimit(timeLimit, 1);
      function transform(coll, accumulator, iteratee, callback) {
        if (arguments.length <= 3) {
          callback = iteratee;
          iteratee = accumulator;
          accumulator = isArray(coll) ? [] : {};
        }
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        eachOf(coll, function(v, k, cb) {
          _iteratee(accumulator, v, k, cb);
        }, function(err) {
          callback(err, accumulator);
        });
      }
      function tryEach(tasks, callback) {
        var error2 = null;
        var result;
        callback = callback || noop;
        eachSeries(tasks, function(task, callback2) {
          wrapAsync(task)(function(err, res) {
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            } else {
              result = res;
            }
            error2 = err;
            callback2(!err);
          });
        }, function() {
          callback(error2, result);
        });
      }
      function unmemoize(fn2) {
        return function() {
          return (fn2.unmemoized || fn2).apply(null, arguments);
        };
      }
      function whilst(test, iteratee, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        if (!test())
          return callback(null);
        var next = function(err) {
          if (err)
            return callback(err);
          if (test())
            return _iteratee(next);
          var args = slice(arguments, 1);
          callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
      }
      function until(test, iteratee, callback) {
        whilst(function() {
          return !test.apply(this, arguments);
        }, iteratee, callback);
      }
      var waterfall = function(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks))
          return callback(new Error("First argument to waterfall must be an array of functions"));
        if (!tasks.length)
          return callback();
        var taskIndex = 0;
        function nextTask(args) {
          var task = wrapAsync(tasks[taskIndex++]);
          args.push(onlyOnce(next));
          task.apply(null, args);
        }
        function next(err) {
          if (err || taskIndex === tasks.length) {
            return callback.apply(null, arguments);
          }
          nextTask(slice(arguments, 1));
        }
        nextTask([]);
      };
      var index = {
        apply,
        applyEach,
        applyEachSeries,
        asyncify,
        auto,
        autoInject,
        cargo,
        compose,
        concat,
        concatLimit,
        concatSeries,
        constant,
        detect,
        detectLimit,
        detectSeries,
        dir,
        doDuring,
        doUntil,
        doWhilst,
        during,
        each: eachLimit,
        eachLimit: eachLimit$1,
        eachOf,
        eachOfLimit,
        eachOfSeries,
        eachSeries,
        ensureAsync,
        every,
        everyLimit,
        everySeries,
        filter,
        filterLimit,
        filterSeries,
        forever,
        groupBy,
        groupByLimit,
        groupBySeries,
        log,
        map,
        mapLimit,
        mapSeries,
        mapValues,
        mapValuesLimit,
        mapValuesSeries,
        memoize,
        nextTick,
        parallel: parallelLimit,
        parallelLimit: parallelLimit$1,
        priorityQueue,
        queue: queue$1,
        race,
        reduce,
        reduceRight,
        reflect,
        reflectAll,
        reject,
        rejectLimit,
        rejectSeries,
        retry,
        retryable,
        seq,
        series,
        setImmediate: setImmediate$1,
        some,
        someLimit,
        someSeries,
        sortBy,
        timeout,
        times,
        timesLimit: timeLimit,
        timesSeries,
        transform,
        tryEach,
        unmemoize,
        until,
        waterfall,
        whilst,
        all: every,
        allLimit: everyLimit,
        allSeries: everySeries,
        any: some,
        anyLimit: someLimit,
        anySeries: someSeries,
        find: detect,
        findLimit: detectLimit,
        findSeries: detectSeries,
        forEach: eachLimit,
        forEachSeries: eachSeries,
        forEachLimit: eachLimit$1,
        forEachOf: eachOf,
        forEachOfSeries: eachOfSeries,
        forEachOfLimit: eachOfLimit,
        inject: reduce,
        foldl: reduce,
        foldr: reduceRight,
        select: filter,
        selectLimit: filterLimit,
        selectSeries: filterSeries,
        wrapSync: asyncify
      };
      exports3["default"] = index;
      exports3.apply = apply;
      exports3.applyEach = applyEach;
      exports3.applyEachSeries = applyEachSeries;
      exports3.asyncify = asyncify;
      exports3.auto = auto;
      exports3.autoInject = autoInject;
      exports3.cargo = cargo;
      exports3.compose = compose;
      exports3.concat = concat;
      exports3.concatLimit = concatLimit;
      exports3.concatSeries = concatSeries;
      exports3.constant = constant;
      exports3.detect = detect;
      exports3.detectLimit = detectLimit;
      exports3.detectSeries = detectSeries;
      exports3.dir = dir;
      exports3.doDuring = doDuring;
      exports3.doUntil = doUntil;
      exports3.doWhilst = doWhilst;
      exports3.during = during;
      exports3.each = eachLimit;
      exports3.eachLimit = eachLimit$1;
      exports3.eachOf = eachOf;
      exports3.eachOfLimit = eachOfLimit;
      exports3.eachOfSeries = eachOfSeries;
      exports3.eachSeries = eachSeries;
      exports3.ensureAsync = ensureAsync;
      exports3.every = every;
      exports3.everyLimit = everyLimit;
      exports3.everySeries = everySeries;
      exports3.filter = filter;
      exports3.filterLimit = filterLimit;
      exports3.filterSeries = filterSeries;
      exports3.forever = forever;
      exports3.groupBy = groupBy;
      exports3.groupByLimit = groupByLimit;
      exports3.groupBySeries = groupBySeries;
      exports3.log = log;
      exports3.map = map;
      exports3.mapLimit = mapLimit;
      exports3.mapSeries = mapSeries;
      exports3.mapValues = mapValues;
      exports3.mapValuesLimit = mapValuesLimit;
      exports3.mapValuesSeries = mapValuesSeries;
      exports3.memoize = memoize;
      exports3.nextTick = nextTick;
      exports3.parallel = parallelLimit;
      exports3.parallelLimit = parallelLimit$1;
      exports3.priorityQueue = priorityQueue;
      exports3.queue = queue$1;
      exports3.race = race;
      exports3.reduce = reduce;
      exports3.reduceRight = reduceRight;
      exports3.reflect = reflect;
      exports3.reflectAll = reflectAll;
      exports3.reject = reject;
      exports3.rejectLimit = rejectLimit;
      exports3.rejectSeries = rejectSeries;
      exports3.retry = retry;
      exports3.retryable = retryable;
      exports3.seq = seq;
      exports3.series = series;
      exports3.setImmediate = setImmediate$1;
      exports3.some = some;
      exports3.someLimit = someLimit;
      exports3.someSeries = someSeries;
      exports3.sortBy = sortBy;
      exports3.timeout = timeout;
      exports3.times = times;
      exports3.timesLimit = timeLimit;
      exports3.timesSeries = timesSeries;
      exports3.transform = transform;
      exports3.tryEach = tryEach;
      exports3.unmemoize = unmemoize;
      exports3.until = until;
      exports3.waterfall = waterfall;
      exports3.whilst = whilst;
      exports3.all = every;
      exports3.allLimit = everyLimit;
      exports3.allSeries = everySeries;
      exports3.any = some;
      exports3.anyLimit = someLimit;
      exports3.anySeries = someSeries;
      exports3.find = detect;
      exports3.findLimit = detectLimit;
      exports3.findSeries = detectSeries;
      exports3.forEach = eachLimit;
      exports3.forEachSeries = eachSeries;
      exports3.forEachLimit = eachLimit$1;
      exports3.forEachOf = eachOf;
      exports3.forEachOfSeries = eachOfSeries;
      exports3.forEachOfLimit = eachOfLimit;
      exports3.inject = reduce;
      exports3.foldl = reduce;
      exports3.foldr = reduceRight;
      exports3.select = filter;
      exports3.selectLimit = filterLimit;
      exports3.selectSeries = filterSeries;
      exports3.wrapSync = asyncify;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// node_modules/adal-node/lib/oauth2client.js
var require_oauth2client = __commonJS({
  "node_modules/adal-node/lib/oauth2client.js"(exports2, module2) {
    "use strict";
    var _ = require_underscore_node();
    require_date_utils();
    var querystring = require("querystring");
    var uuid = require_uuid();
    var axios = require_axios2();
    var url = require("url");
    var async = require_async();
    var constants = require_constants();
    var Logger = require_log().Logger;
    var util = require_util();
    var OAuth2Parameters = constants.OAuth2.Parameters;
    var OAuth2ResponseParameters = constants.OAuth2.ResponseParameters;
    var DeviceCodeResponseParameters = constants.OAuth2.DeviceCodeResponseParameters;
    var IdTokenMap = constants.OAuth2.IdTokenMap;
    var TokenResponseFields = constants.TokenResponseFields;
    var UserCodeResponseFields = constants.UserCodeResponseFields;
    var IdTokenFields = constants.IdTokenFields;
    var TOKEN_RESPONSE_MAP = {};
    TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.TOKEN_TYPE] = TokenResponseFields.TOKEN_TYPE;
    TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.ACCESS_TOKEN] = TokenResponseFields.ACCESS_TOKEN;
    TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.REFRESH_TOKEN] = TokenResponseFields.REFRESH_TOKEN;
    TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.CREATED_ON] = TokenResponseFields.CREATED_ON;
    TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.EXPIRES_ON] = TokenResponseFields.EXPIRES_ON;
    TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.EXPIRES_IN] = TokenResponseFields.EXPIRES_IN;
    TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.RESOURCE] = TokenResponseFields.RESOURCE;
    TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.ERROR] = TokenResponseFields.ERROR;
    TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.ERROR_DESCRIPTION] = TokenResponseFields.ERROR_DESCRIPTION;
    var DEVICE_CODE_RESPONSE_MAP = {};
    DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.DEVICE_CODE] = UserCodeResponseFields.DEVICE_CODE;
    DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.USER_CODE] = UserCodeResponseFields.USER_CODE;
    DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.VERIFICATION_URL] = UserCodeResponseFields.VERIFICATION_URL;
    DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.INTERVAL] = UserCodeResponseFields.INTERVAL;
    DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.EXPIRES_IN] = UserCodeResponseFields.EXPIRES_IN;
    DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.MESSAGE] = UserCodeResponseFields.MESSAGE;
    DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.ERROR] = UserCodeResponseFields.ERROR;
    DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.ERROR_DESCRIPTION] = UserCodeResponseFields.ERROR_DESCRIPTION;
    function OAuth2Client(callContext, authority) {
      this._aadApiVersion = authority.aadApiVersion === void 0 ? "1.0" : authority.aadApiVersion;
      this._tokenEndpoint = authority.tokenEndpoint;
      this._deviceCodeEndpoint = authority.deviceCodeEndpoint;
      this._log = new Logger("OAuth2Client", callContext._logContext);
      this._callContext = callContext;
      this._cancelPollingRequest = false;
    }
    OAuth2Client.prototype._createTokenUrl = function() {
      var tokenUrl = url.parse(this._tokenEndpoint);
      var parameters = {};
      parameters[OAuth2Parameters.AAD_API_VERSION] = this._aadApiVersion;
      tokenUrl.search = querystring.stringify(parameters);
      return tokenUrl;
    };
    OAuth2Client.prototype._createDeviceCodeUrl = function() {
      var deviceCodeUrl = url.parse(this._deviceCodeEndpoint);
      var parameters = {};
      parameters[OAuth2Parameters.AAD_API_VERSION] = this._aadApiVersion;
      deviceCodeUrl.search = querystring.stringify(parameters);
      return deviceCodeUrl;
    };
    OAuth2Client.prototype._parseOptionalInts = function(obj, keys) {
      var self2 = this;
      keys.forEach(function(element) {
        if (_.has(obj, element)) {
          obj[element] = parseInt(obj[element], 10);
          if (isNaN(obj[element])) {
            throw self2._log.createError(element + " could not be parsed as an int.");
          }
        }
      });
    };
    OAuth2Client.prototype._crackJwt = function(jwtToken) {
      var idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
      var matches = idTokenPartsRegex.exec(jwtToken);
      if (!matches || matches.length < 4) {
        this._log.warn("The returned id_token is not parseable.");
        return;
      }
      var crackedToken = {
        header: matches[1],
        JWSPayload: matches[2],
        JWSSig: matches[3]
      };
      return crackedToken;
    };
    OAuth2Client.prototype._getUserId = function(idToken) {
      var userId;
      var isDisplayable;
      if (idToken.upn) {
        userId = idToken.upn;
        isDisplayable = true;
      } else if (idToken.email) {
        userId = idToken.email;
        isDisplayable = true;
      } else if (idToken.sub) {
        userId = idToken.sub;
      }
      if (!userId) {
        userId = uuid.v4();
      }
      var userIdVals = {};
      userIdVals[IdTokenFields.USER_ID] = userId;
      if (isDisplayable) {
        userIdVals[IdTokenFields.IS_USER_ID_DISPLAYABLE] = true;
      }
      return userIdVals;
    };
    function mapFields(inObj, outObj, map) {
      for (var key in inObj) {
        if (map[key]) {
          var mappedKey = map[key];
          outObj[mappedKey] = inObj[key];
        }
      }
    }
    OAuth2Client.prototype._extractIdTokenValues = function(idToken) {
      var extractedValues = {};
      _.extend(extractedValues, this._getUserId(idToken));
      mapFields(idToken, extractedValues, IdTokenMap);
      return extractedValues;
    };
    OAuth2Client.prototype._parseIdToken = function(encodedIdToken) {
      var crackedToken = this._crackJwt(encodedIdToken);
      if (!crackedToken) {
        return;
      }
      var idToken;
      try {
        var base64IdToken = crackedToken.JWSPayload;
        var base64Decoded = util.base64DecodeStringUrlSafe(base64IdToken);
        if (!base64Decoded) {
          this._log.warn("The returned id_token could not be base64 url safe decoded.");
          return;
        }
        idToken = JSON.parse(base64Decoded);
      } catch (err) {
        this._log.warn("the returned id_token could not be decoded");
        this._log.warn("The returned id_token could not be decoded: " + err.stack, true);
        return;
      }
      return this._extractIdTokenValues(idToken);
    };
    OAuth2Client.prototype._validateTokenResponse = function(body) {
      var wireResponse;
      var tokenResponse = {};
      try {
        wireResponse = body;
      } catch (e) {
        throw new Error("The token response returned from the server is unparseable as JSON");
      }
      var intKeys = [
        OAuth2ResponseParameters.EXPIRES_ON,
        OAuth2ResponseParameters.EXPIRES_IN,
        OAuth2ResponseParameters.CREATED_ON
      ];
      this._parseOptionalInts(wireResponse, intKeys);
      if (wireResponse[OAuth2ResponseParameters.EXPIRES_IN]) {
        var expiresIn = wireResponse[OAuth2ResponseParameters.EXPIRES_IN];
        var now = new Date();
        wireResponse[OAuth2ResponseParameters.EXPIRES_ON] = now.add({ seconds: expiresIn });
      }
      if (wireResponse[OAuth2ResponseParameters.CREATED_ON]) {
        var tempDate = new Date();
        var createdOn = wireResponse[OAuth2ResponseParameters.CREATED_ON];
        tempDate.setTime(createdOn);
        wireResponse[OAuth2ResponseParameters.CREATED_ON] = tempDate;
      }
      if (!wireResponse[OAuth2ResponseParameters.TOKEN_TYPE]) {
        throw this._log.createError("wireResponse is missing token_type");
      }
      if (!wireResponse[OAuth2ResponseParameters.ACCESS_TOKEN]) {
        throw this._log.createError("wireResponse missing access_token");
      }
      mapFields(wireResponse, tokenResponse, TOKEN_RESPONSE_MAP);
      if (wireResponse[OAuth2ResponseParameters.ID_TOKEN]) {
        var idToken = this._parseIdToken(wireResponse[OAuth2ResponseParameters.ID_TOKEN]);
        if (idToken) {
          _.extend(tokenResponse, idToken);
        }
      }
      return tokenResponse;
    };
    OAuth2Client.prototype._validateDeviceCodeResponse = function(body) {
      var wireResponse;
      var deviceCodeResponse = {};
      try {
        wireResponse = body;
      } catch (e) {
        throw new Error("The device code response returned from the server is unparseable as JSON.");
      }
      var intKeys = [
        DeviceCodeResponseParameters.EXPIRES_IN,
        DeviceCodeResponseParameters.INTERVAL
      ];
      this._parseOptionalInts(wireResponse, intKeys);
      if (!wireResponse[DeviceCodeResponseParameters.EXPIRES_IN]) {
        throw this._log.createError("wireResponse is missing expires_in");
      }
      if (!wireResponse[DeviceCodeResponseParameters.DEVICE_CODE]) {
        throw this._log.createError("wireResponse is missing device code");
      }
      if (!wireResponse[DeviceCodeResponseParameters.USER_CODE]) {
        throw this._log.createError("wireResponse is missing user code");
      }
      mapFields(wireResponse, deviceCodeResponse, DEVICE_CODE_RESPONSE_MAP);
      return deviceCodeResponse;
    };
    OAuth2Client.prototype._handlePollingResponse = function(body) {
      var tokenResponse = this._handlePollingRequestErrorResponse(body);
      if (_.isEmpty(tokenResponse)) {
        tokenResponse = this._validateTokenResponse(body);
      }
      return tokenResponse;
    };
    OAuth2Client.prototype._handlePollingRequestErrorResponse = function(body) {
      var wireResponse;
      var tokenResponse = {};
      try {
        wireResponse = body;
      } catch (e) {
        throw new Error("The token response returned from the server is unparsable as JSON");
      }
      if (wireResponse[OAuth2ResponseParameters.ERROR]) {
        mapFields(wireResponse, tokenResponse, TOKEN_RESPONSE_MAP);
      }
      return tokenResponse;
    };
    OAuth2Client.prototype._handleGetTokenResponse = function(body, callback) {
      var tokenResponse;
      try {
        tokenResponse = this._validateTokenResponse(body);
      } catch (e) {
        this._log.error("Error validating get token response", e, true);
        callback(e);
        return;
      }
      callback(null, tokenResponse);
    };
    OAuth2Client.prototype._handleGetDeviceCodeResponse = function(body, callback) {
      var deviceCodeResponse;
      try {
        deviceCodeResponse = this._validateDeviceCodeResponse(body);
      } catch (e) {
        this._log.error("Error validating get user code response", e, true);
        callback(e);
        return;
      }
      callback(null, deviceCodeResponse);
    };
    OAuth2Client.prototype._getTokenWithPolling = function(postOptions, callback) {
      var self2 = this;
      if (self2._cancelPollingRequest === true) {
        callback(null, new Error("Polling_Request_Cancelled"));
        return;
      }
      axios(postOptions).then((response) => {
        var tokenResponse;
        util.logReturnCorrelationId(this._log, "GetToken", response);
        try {
          tokenResponse = self2._handlePollingResponse(response.data);
        } catch (e) {
          self2._log.error("Error validating get token response", e, true);
          callback(null, e);
          return;
        }
        callback(null, tokenResponse);
      }).catch((error2) => {
        if (error2.response) {
          util.logReturnCorrelationId(this._log, "GetToken", error2.response);
          if (error2.response && error2.response.data.hasOwnProperty(TokenResponseFields.ERROR) && error2.response.data[TokenResponseFields.ERROR] === "authorization_pending") {
            callback(new Error(error2.response.data[TokenResponseFields.ERROR]), error2.response.data);
          }
        } else if (error2.request) {
          self2._log.error("GetToken request was made but no response was received", error2.request, true);
          callback(self2._log.createError("No response from the server"));
        } else if (error2.message) {
          self2._log.error("GetToken http get failed. request was never made, please check", error2.message, true);
          callback(error2.message);
        } else {
          self2._log.error("GetToken failed with unknown error", "unknown error", true);
          callback(self2._log.createError("failed with an unknown error"));
        }
      });
    };
    OAuth2Client.prototype._createPostOption = function(postUrl, urlEncodedRequestForm) {
      var postOptions = util.createRequestOptions(this, {
        method: "POST",
        url: url.format(postUrl),
        data: urlEncodedRequestForm,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        maxRedirects: 0,
        encoding: "utf8"
      });
      return postOptions;
    };
    OAuth2Client.prototype.getToken = function(oauthParameters, callback) {
      var self2 = this;
      var tokenUrl = self2._createTokenUrl();
      var urlEncodedTokenRequestForm = querystring.stringify(oauthParameters);
      var postOptions = self2._createPostOption(tokenUrl, urlEncodedTokenRequestForm);
      axios(postOptions).then((response) => {
        util.logReturnCorrelationId(this._log, "Get Token", response);
        if (!util.isHttpSuccess(response.status)) {
          var returnErrorString = "Get Token request returned http error: " + response.status + " and server response: " + JSON.stringify(error.response.data);
          callback(this._log.createError(returnErrorString, true), response.data);
        }
        self2._handleGetTokenResponse(response.data, callback);
      }).catch((error2) => {
        if (error2.response) {
          util.logReturnCorrelationId(this._log, "Get Token", error2.response);
          this._log.error("Get Token request failed with", error2.response.status, true);
          var returnErrorString = "Get Token request returned http error: " + error2.response.status + " and server response: " + JSON.stringify(error2.response.data);
          callback(self2._log.createError(returnErrorString, true), error2.response.data);
        } else if (error2.request) {
          this._log.error("Get Token request was made but no response was received", error2.request, true);
          callback(self2._log.createError("No response from the server"));
        } else if (error2.message) {
          this._log.error("Get Token request was never made, please check", error2.message, true);
          callback(error2.message);
        } else {
          self2._log.error("GetToken failed with unknown error", "unknown error", true);
          callback(self2._log.createError("failed with an unknown error"));
        }
      });
    };
    OAuth2Client.prototype.getTokenWithPolling = function(oauthParameters, refresh_interval, expires_in, callback) {
      var self2 = this;
      var maxTimesForRetry = Math.floor(expires_in / refresh_interval);
      var tokenUrl = self2._createTokenUrl();
      var urlEncodedTokenRequestForm = querystring.stringify(oauthParameters);
      var postOptions = self2._createPostOption(tokenUrl, urlEncodedTokenRequestForm);
      var optionsForRetry = { times: maxTimesForRetry, interval: refresh_interval * 1e3 };
      async.retry(optionsForRetry, function(retryCallback, response) {
        self2._getTokenWithPolling(postOptions, retryCallback);
      }, function(err, response) {
        if (response && response instanceof Error) {
          callback(response);
          return;
        } else if (response && response.hasOwnProperty(DeviceCodeResponseParameters.ERROR)) {
          callback(response);
          return;
        }
        callback(err, response);
      });
    };
    OAuth2Client.prototype.getUserCodeInfo = function(oauthParameters, callback) {
      var self2 = this;
      var deviceCodeUrl = self2._createDeviceCodeUrl();
      var urlEncodedDeviceCodeRequestForm = querystring.stringify(oauthParameters);
      var postOptions = self2._createPostOption(deviceCodeUrl, urlEncodedDeviceCodeRequestForm);
      axios(postOptions).then((response) => {
        util.logReturnCorrelationId(this._log, "Get Device Code", response);
        if (!util.isHttpSuccess(response.status)) {
          var returnErrorString = "Get Device Code request returned http error: " + response.status + " and server response: " + JSON.stringify(error.response.data);
          callback(this._log.createError(returnErrorString, true), response.data);
        }
        self2._handleGetDeviceCodeResponse(response.data, callback);
      }).catch((error2) => {
        if (error2.response) {
          util.logReturnCorrelationId(this._log, "Get Device Code", error2.response);
          this._log.error("Get Device Code request failed with", error2.response.status, true);
          var returnErrorString = "Get Device Code request returned http error: " + error2.response.status + " and server response: " + JSON.stringify(error2.response.data);
          callback(self2._log.createError(returnErrorString, true), error2.response.data);
        } else if (error2.request) {
          this._log.error("Get Device Code request was made but no response was received", error2.request, true);
          callback(self2._log.createError("No response from the server"));
        } else if (error2.message) {
          this._log.error("Get Device Code request was never made, please check", error2.message, true);
          callback(error2.message);
        } else {
          self2._log.error("Get Device Code failed with unknown error", "unknown error", true);
          callback(self2._log.createError("failed with an unknown error"));
        }
      });
    };
    OAuth2Client.prototype.cancelPollingRequest = function() {
      this._cancelPollingRequest = true;
    };
    module2.exports = OAuth2Client;
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/jws/lib/data-stream.js
var require_data_stream = __commonJS({
  "node_modules/jws/lib/data-stream.js"(exports2, module2) {
    var Buffer2 = require_safe_buffer().Buffer;
    var Stream = require("stream");
    var util = require("util");
    function DataStream(data) {
      this.buffer = null;
      this.writable = true;
      this.readable = true;
      if (!data) {
        this.buffer = Buffer2.alloc(0);
        return this;
      }
      if (typeof data.pipe === "function") {
        this.buffer = Buffer2.alloc(0);
        data.pipe(this);
        return this;
      }
      if (data.length || typeof data === "object") {
        this.buffer = data;
        this.writable = false;
        process.nextTick(function() {
          this.emit("end", data);
          this.readable = false;
          this.emit("close");
        }.bind(this));
        return this;
      }
      throw new TypeError("Unexpected data type (" + typeof data + ")");
    }
    util.inherits(DataStream, Stream);
    DataStream.prototype.write = function write(data) {
      this.buffer = Buffer2.concat([this.buffer, Buffer2.from(data)]);
      this.emit("data", data);
    };
    DataStream.prototype.end = function end(data) {
      if (data)
        this.write(data);
      this.emit("end", data);
      this.emit("close");
      this.writable = false;
      this.readable = false;
    };
    module2.exports = DataStream;
  }
});

// node_modules/buffer-equal-constant-time/index.js
var require_buffer_equal_constant_time = __commonJS({
  "node_modules/buffer-equal-constant-time/index.js"(exports2, module2) {
    "use strict";
    var Buffer2 = require("buffer").Buffer;
    var SlowBuffer = require("buffer").SlowBuffer;
    module2.exports = bufferEq;
    function bufferEq(a, b) {
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        c |= a[i] ^ b[i];
      }
      return c === 0;
    }
    bufferEq.install = function() {
      Buffer2.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
        return bufferEq(this, that);
      };
    };
    var origBufEqual = Buffer2.prototype.equal;
    var origSlowBufEqual = SlowBuffer.prototype.equal;
    bufferEq.restore = function() {
      Buffer2.prototype.equal = origBufEqual;
      SlowBuffer.prototype.equal = origSlowBufEqual;
    };
  }
});

// node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
var require_param_bytes_for_alg = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports2, module2) {
    "use strict";
    function getParamSize(keySize) {
      var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
      return result;
    }
    var paramBytesForAlg = {
      ES256: getParamSize(256),
      ES384: getParamSize(384),
      ES512: getParamSize(521)
    };
    function getParamBytesForAlg(alg) {
      var paramBytes = paramBytesForAlg[alg];
      if (paramBytes) {
        return paramBytes;
      }
      throw new Error('Unknown algorithm "' + alg + '"');
    }
    module2.exports = getParamBytesForAlg;
  }
});

// node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
var require_ecdsa_sig_formatter = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports2, module2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var getParamBytesForAlg = require_param_bytes_for_alg();
    var MAX_OCTET = 128;
    var CLASS_UNIVERSAL = 0;
    var PRIMITIVE_BIT = 32;
    var TAG_SEQ = 16;
    var TAG_INT = 2;
    var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
    var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
    function base64Url(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function signatureAsBuffer(signature) {
      if (Buffer2.isBuffer(signature)) {
        return signature;
      } else if (typeof signature === "string") {
        return Buffer2.from(signature, "base64");
      }
      throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
    }
    function derToJose(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var maxEncodedParamLength = paramBytes + 1;
      var inputLength = signature.length;
      var offset = 0;
      if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
      }
      var seqLength = signature[offset++];
      if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
      }
      if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
      }
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
      }
      var rLength = signature[offset++];
      if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
      }
      if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var rOffset = offset;
      offset += rLength;
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
      }
      var sLength = signature[offset++];
      if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
      }
      if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var sOffset = offset;
      offset += sLength;
      if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
      }
      var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
      var dst = Buffer2.allocUnsafe(rPadding + rLength + sPadding + sLength);
      for (offset = 0; offset < rPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
      offset = paramBytes;
      for (var o = offset; offset < o + sPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
      dst = dst.toString("base64");
      dst = base64Url(dst);
      return dst;
    }
    function countPadding(buf, start, stop) {
      var padding = 0;
      while (start + padding < stop && buf[start + padding] === 0) {
        ++padding;
      }
      var needsSign = buf[start + padding] >= MAX_OCTET;
      if (needsSign) {
        --padding;
      }
      return padding;
    }
    function joseToDer(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var signatureBytes = signature.length;
      if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
      }
      var rPadding = countPadding(signature, 0, paramBytes);
      var sPadding = countPadding(signature, paramBytes, signature.length);
      var rLength = paramBytes - rPadding;
      var sLength = paramBytes - sPadding;
      var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
      var shortLength = rsBytes < MAX_OCTET;
      var dst = Buffer2.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
      var offset = 0;
      dst[offset++] = ENCODED_TAG_SEQ;
      if (shortLength) {
        dst[offset++] = rsBytes;
      } else {
        dst[offset++] = MAX_OCTET | 1;
        dst[offset++] = rsBytes & 255;
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = rLength;
      if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
      } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = sLength;
      if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
      } else {
        signature.copy(dst, offset, paramBytes + sPadding);
      }
      return dst;
    }
    module2.exports = {
      derToJose,
      joseToDer
    };
  }
});

// node_modules/jwa/index.js
var require_jwa = __commonJS({
  "node_modules/jwa/index.js"(exports2, module2) {
    var bufferEqual = require_buffer_equal_constant_time();
    var Buffer2 = require_safe_buffer().Buffer;
    var crypto = require("crypto");
    var formatEcdsa = require_ecdsa_sig_formatter();
    var util = require("util");
    var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
    var MSG_INVALID_SECRET = "secret must be a string or buffer";
    var MSG_INVALID_VERIFIER_KEY = "key must be a string or a buffer";
    var MSG_INVALID_SIGNER_KEY = "key must be a string, a buffer or an object";
    var supportsKeyObjects = typeof crypto.createPublicKey === "function";
    if (supportsKeyObjects) {
      MSG_INVALID_VERIFIER_KEY += " or a KeyObject";
      MSG_INVALID_SECRET += "or a KeyObject";
    }
    function checkIsPublicKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.type !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.asymmetricKeyType !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
    }
    function checkIsPrivateKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (typeof key === "object") {
        return;
      }
      throw typeError(MSG_INVALID_SIGNER_KEY);
    }
    function checkIsSecretKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return key;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (key.type !== "secret") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_SECRET);
      }
    }
    function fromBase64(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function toBase64(base64url) {
      base64url = base64url.toString();
      var padding = 4 - base64url.length % 4;
      if (padding !== 4) {
        for (var i = 0; i < padding; ++i) {
          base64url += "=";
        }
      }
      return base64url.replace(/\-/g, "+").replace(/_/g, "/");
    }
    function typeError(template) {
      var args = [].slice.call(arguments, 1);
      var errMsg = util.format.bind(util, template).apply(null, args);
      return new TypeError(errMsg);
    }
    function bufferOrString(obj) {
      return Buffer2.isBuffer(obj) || typeof obj === "string";
    }
    function normalizeInput(thing) {
      if (!bufferOrString(thing))
        thing = JSON.stringify(thing);
      return thing;
    }
    function createHmacSigner(bits) {
      return function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto.createHmac("sha" + bits, secret);
        var sig = (hmac.update(thing), hmac.digest("base64"));
        return fromBase64(sig);
      };
    }
    function createHmacVerifier(bits) {
      return function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return bufferEqual(Buffer2.from(signature), Buffer2.from(computedSig));
      };
    }
    function createKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, "base64"));
        return fromBase64(sig);
      };
    }
    function createKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, "base64");
      };
    }
    function createPSSKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign({
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, "base64"));
        return fromBase64(sig);
      };
    }
    function createPSSKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify({
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, "base64");
      };
    }
    function createECDSASigner(bits) {
      var inner = createKeySigner(bits);
      return function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, "ES" + bits);
        return signature;
      };
    }
    function createECDSAVerifer(bits) {
      var inner = createKeyVerifier(bits);
      return function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, "ES" + bits).toString("base64");
        var result = inner(thing, signature, publicKey);
        return result;
      };
    }
    function createNoneSigner() {
      return function sign() {
        return "";
      };
    }
    function createNoneVerifier() {
      return function verify(thing, signature) {
        return signature === "";
      };
    }
    module2.exports = function jwa(algorithm) {
      var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
      };
      var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
      };
      var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
      if (!match)
        throw typeError(MSG_INVALID_ALGORITHM, algorithm);
      var algo = (match[1] || match[3]).toLowerCase();
      var bits = match[2];
      return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
      };
    };
  }
});

// node_modules/jws/lib/tostring.js
var require_tostring = __commonJS({
  "node_modules/jws/lib/tostring.js"(exports2, module2) {
    var Buffer2 = require("buffer").Buffer;
    module2.exports = function toString(obj) {
      if (typeof obj === "string")
        return obj;
      if (typeof obj === "number" || Buffer2.isBuffer(obj))
        return obj.toString();
      return JSON.stringify(obj);
    };
  }
});

// node_modules/jws/lib/sign-stream.js
var require_sign_stream = __commonJS({
  "node_modules/jws/lib/sign-stream.js"(exports2, module2) {
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require("stream");
    var toString = require_tostring();
    var util = require("util");
    function base64url(string, encoding) {
      return Buffer2.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function jwsSecuredInput(header, payload, encoding) {
      encoding = encoding || "utf8";
      var encodedHeader = base64url(toString(header), "binary");
      var encodedPayload = base64url(toString(payload), encoding);
      return util.format("%s.%s", encodedHeader, encodedPayload);
    }
    function jwsSign(opts) {
      var header = opts.header;
      var payload = opts.payload;
      var secretOrKey = opts.secret || opts.privateKey;
      var encoding = opts.encoding;
      var algo = jwa(header.alg);
      var securedInput = jwsSecuredInput(header, payload, encoding);
      var signature = algo.sign(securedInput, secretOrKey);
      return util.format("%s.%s", securedInput, signature);
    }
    function SignStream(opts) {
      var secret = opts.secret || opts.privateKey || opts.key;
      var secretStream = new DataStream(secret);
      this.readable = true;
      this.header = opts.header;
      this.encoding = opts.encoding;
      this.secret = this.privateKey = this.key = secretStream;
      this.payload = new DataStream(opts.payload);
      this.secret.once("close", function() {
        if (!this.payload.writable && this.readable)
          this.sign();
      }.bind(this));
      this.payload.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.sign();
      }.bind(this));
    }
    util.inherits(SignStream, Stream);
    SignStream.prototype.sign = function sign() {
      try {
        var signature = jwsSign({
          header: this.header,
          payload: this.payload.buffer,
          secret: this.secret.buffer,
          encoding: this.encoding
        });
        this.emit("done", signature);
        this.emit("data", signature);
        this.emit("end");
        this.readable = false;
        return signature;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    SignStream.sign = jwsSign;
    module2.exports = SignStream;
  }
});

// node_modules/jws/lib/verify-stream.js
var require_verify_stream = __commonJS({
  "node_modules/jws/lib/verify-stream.js"(exports2, module2) {
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require("stream");
    var toString = require_tostring();
    var util = require("util");
    var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
    function isObject(thing) {
      return Object.prototype.toString.call(thing) === "[object Object]";
    }
    function safeJsonParse(thing) {
      if (isObject(thing))
        return thing;
      try {
        return JSON.parse(thing);
      } catch (e) {
        return void 0;
      }
    }
    function headerFromJWS(jwsSig) {
      var encodedHeader = jwsSig.split(".", 1)[0];
      return safeJsonParse(Buffer2.from(encodedHeader, "base64").toString("binary"));
    }
    function securedInputFromJWS(jwsSig) {
      return jwsSig.split(".", 2).join(".");
    }
    function signatureFromJWS(jwsSig) {
      return jwsSig.split(".")[2];
    }
    function payloadFromJWS(jwsSig, encoding) {
      encoding = encoding || "utf8";
      var payload = jwsSig.split(".")[1];
      return Buffer2.from(payload, "base64").toString(encoding);
    }
    function isValidJws(string) {
      return JWS_REGEX.test(string) && !!headerFromJWS(string);
    }
    function jwsVerify(jwsSig, algorithm, secretOrKey) {
      if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
      }
      jwsSig = toString(jwsSig);
      var signature = signatureFromJWS(jwsSig);
      var securedInput = securedInputFromJWS(jwsSig);
      var algo = jwa(algorithm);
      return algo.verify(securedInput, signature, secretOrKey);
    }
    function jwsDecode(jwsSig, opts) {
      opts = opts || {};
      jwsSig = toString(jwsSig);
      if (!isValidJws(jwsSig))
        return null;
      var header = headerFromJWS(jwsSig);
      if (!header)
        return null;
      var payload = payloadFromJWS(jwsSig);
      if (header.typ === "JWT" || opts.json)
        payload = JSON.parse(payload, opts.encoding);
      return {
        header,
        payload,
        signature: signatureFromJWS(jwsSig)
      };
    }
    function VerifyStream(opts) {
      opts = opts || {};
      var secretOrKey = opts.secret || opts.publicKey || opts.key;
      var secretStream = new DataStream(secretOrKey);
      this.readable = true;
      this.algorithm = opts.algorithm;
      this.encoding = opts.encoding;
      this.secret = this.publicKey = this.key = secretStream;
      this.signature = new DataStream(opts.signature);
      this.secret.once("close", function() {
        if (!this.signature.writable && this.readable)
          this.verify();
      }.bind(this));
      this.signature.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.verify();
      }.bind(this));
    }
    util.inherits(VerifyStream, Stream);
    VerifyStream.prototype.verify = function verify() {
      try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit("done", valid, obj);
        this.emit("data", valid);
        this.emit("end");
        this.readable = false;
        return valid;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    VerifyStream.decode = jwsDecode;
    VerifyStream.isValid = isValidJws;
    VerifyStream.verify = jwsVerify;
    module2.exports = VerifyStream;
  }
});

// node_modules/jws/index.js
var require_jws = __commonJS({
  "node_modules/jws/index.js"(exports2) {
    var SignStream = require_sign_stream();
    var VerifyStream = require_verify_stream();
    var ALGORITHMS = [
      "HS256",
      "HS384",
      "HS512",
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES384",
      "ES512"
    ];
    exports2.ALGORITHMS = ALGORITHMS;
    exports2.sign = SignStream.sign;
    exports2.verify = VerifyStream.verify;
    exports2.decode = VerifyStream.decode;
    exports2.isValid = VerifyStream.isValid;
    exports2.createSign = function createSign(opts) {
      return new SignStream(opts);
    };
    exports2.createVerify = function createVerify(opts) {
      return new VerifyStream(opts);
    };
  }
});

// node_modules/adal-node/lib/self-signed-jwt.js
var require_self_signed_jwt = __commonJS({
  "node_modules/adal-node/lib/self-signed-jwt.js"(exports2, module2) {
    "use strict";
    var jwtConstants = require_constants().Jwt;
    var Logger = require_log().Logger;
    var util = require_util();
    require_date_utils();
    var jws = require_jws();
    var uuid = require_uuid();
    function dateGetTimeInSeconds(date) {
      return Math.floor(date.getTime() / 1e3);
    }
    function SelfSignedJwt(callContext, authority, clientId) {
      this._log = new Logger("SelfSignedJwt", callContext._logContext);
      this._callContext = callContext;
      this._authority = authority;
      this._tokenEndpoint = authority.tokenEndpoint;
      this._clientId = clientId;
    }
    SelfSignedJwt.prototype._getDateNow = function() {
      return new Date();
    };
    SelfSignedJwt.prototype._getNewJwtId = function() {
      return uuid.v4();
    };
    SelfSignedJwt.prototype._createx5tValue = function(thumbprint) {
      var hexString = thumbprint.replace(/:/g, "").replace(/ /g, "");
      var base64 = new Buffer(hexString, "hex").toString("base64");
      return util.convertRegularToUrlSafeBase64EncodedString(base64);
    };
    SelfSignedJwt.prototype._createHeader = function(thumbprint) {
      var x5t = this._createx5tValue(thumbprint);
      var header = { typ: "JWT", alg: "RS256", x5t };
      this._log.verbose("Creating self signed JWT header");
      this._log.verbose("Creating self signed JWT header.  x5t: " + x5t, true);
      return header;
    };
    SelfSignedJwt.prototype._createPayload = function() {
      var now = this._getDateNow();
      var expires = new Date(now.getTime()).addMinutes(jwtConstants.SELF_SIGNED_JWT_LIFETIME);
      this._log.verbose("Creating self signed JWT payload.  Expires: " + expires + " NotBefore: " + now);
      var jwtPayload = {};
      jwtPayload[jwtConstants.AUDIENCE] = this._tokenEndpoint;
      jwtPayload[jwtConstants.ISSUER] = this._clientId;
      jwtPayload[jwtConstants.SUBJECT] = this._clientId;
      jwtPayload[jwtConstants.NOT_BEFORE] = dateGetTimeInSeconds(now);
      jwtPayload[jwtConstants.EXPIRES_ON] = dateGetTimeInSeconds(expires);
      jwtPayload[jwtConstants.JWT_ID] = this._getNewJwtId();
      return jwtPayload;
    };
    SelfSignedJwt.prototype._throwOnInvalidJwtSignature = function(jwt) {
      var jwtSegments = jwt.split(".");
      if (3 > jwtSegments.length || !jwtSegments[2]) {
        throw this._log.createError("Failed to sign JWT.  This is most likely due to an invalid certificate.");
      }
      return;
    };
    SelfSignedJwt.prototype._signJwt = function(header, payload, certificate) {
      var jwt;
      try {
        jwt = jws.sign({ header, payload, secret: certificate });
      } catch (err) {
        this._log.error(err, true);
        throw this._log.createError("Failed to sign JWT.This is most likely due to an invalid certificate.");
      }
      this._throwOnInvalidJwtSignature(jwt);
      return jwt;
    };
    SelfSignedJwt.prototype._reduceThumbprint = function(thumbprint) {
      var canonical = thumbprint.toLowerCase().replace(/ /g, "").replace(/:/g, "");
      this._throwOnInvalidThumbprint(canonical);
      return canonical;
    };
    var numCharIn128BitHexString = 128 / 8 * 2;
    var numCharIn160BitHexString = 160 / 8 * 2;
    var thumbprintSizes = {};
    thumbprintSizes[numCharIn128BitHexString] = true;
    thumbprintSizes[numCharIn160BitHexString] = true;
    var thumbprintRegExp = /^[a-f\d]*$/;
    SelfSignedJwt.prototype._throwOnInvalidThumbprint = function(thumbprint) {
      if (!thumbprintSizes[thumbprint.length] || !thumbprintRegExp.test(thumbprint)) {
        throw this._log.createError("The thumbprint does not match a known format");
      }
    };
    SelfSignedJwt.prototype.create = function(certificate, thumbprint) {
      thumbprint = this._reduceThumbprint(thumbprint);
      var header = this._createHeader(thumbprint);
      var payload = this._createPayload();
      var jwt = this._signJwt(header, payload, certificate);
      return jwt;
    };
    module2.exports = SelfSignedJwt;
  }
});

// node_modules/adal-node/lib/user-realm.js
var require_user_realm = __commonJS({
  "node_modules/adal-node/lib/user-realm.js"(exports2, module2) {
    "use strict";
    var querystring = require("querystring");
    var axios = require_axios2();
    var _ = require_underscore_node();
    var url = require("url");
    var constants = require_constants();
    var Logger = require_log().Logger;
    var util = require_util();
    var AccountType = constants.UserRealm.AccountType;
    var FederationProtocolType = constants.UserRealm.FederationProtocolType;
    var USER_REALM_PATH_TEMPLATE = "common/UserRealm/<user>";
    function UserRealm(callContext, userPrinciple, authority) {
      this._log = new Logger("UserRealm", callContext._logContext);
      this._callContext = callContext;
      this._apiVersion = "1.0";
      this._federationProtocol = null;
      this._accountType = null;
      this._federationMetadataUrl = null;
      this._federationActiveAuthUrl = null;
      this._userPrinciple = userPrinciple;
      this._authority = authority;
    }
    Object.defineProperty(UserRealm.prototype, "apiVersion", {
      get: function() {
        return this._apiVersion;
      }
    });
    Object.defineProperty(UserRealm.prototype, "federationProtocol", {
      get: function() {
        return this._federationProtocol;
      }
    });
    Object.defineProperty(UserRealm.prototype, "accountType", {
      get: function() {
        return this._accountType;
      }
    });
    Object.defineProperty(UserRealm.prototype, "federationMetadataUrl", {
      get: function() {
        return this._federationMetadataUrl;
      }
    });
    Object.defineProperty(UserRealm.prototype, "federationActiveAuthUrl", {
      get: function() {
        return this._federationActiveAuthUrl;
      }
    });
    UserRealm.prototype._getUserRealmUrl = function() {
      var userRealmUrl = util.copyUrl(this._authority);
      var urlEncodedUser = encodeURIComponent(this._userPrinciple);
      userRealmUrl.pathname = USER_REALM_PATH_TEMPLATE.replace("<user>", urlEncodedUser);
      var userRealmQuery = {
        "api-version": this._apiVersion
      };
      userRealmUrl.search = querystring.stringify(userRealmQuery);
      userRealmUrl = util.copyUrl(userRealmUrl);
      return userRealmUrl;
    };
    UserRealm.prototype._validateConstantValue = function(constants2, value, caseSensitive) {
      if (!value) {
        return false;
      }
      if (!caseSensitive) {
        value = value.toLowerCase();
      }
      return _.contains(_.values(constants2), value) ? value : false;
    };
    UserRealm.prototype._validateAccountType = function(type) {
      return this._validateConstantValue(AccountType, type);
    };
    UserRealm.prototype._validateFederationProtocol = function(protocol) {
      return this._validateConstantValue(FederationProtocolType, protocol);
    };
    UserRealm.prototype._logParsedResponse = function() {
      this._log.verbose("UserRealm response:");
      this._log.verbose(" AccountType:             " + this.accountType);
      this._log.verbose(" FederationProtocol:      " + this.federationProtocol);
      this._log.verbose(" FederationMetatdataUrl:  " + this.federationMetadataUrl, true);
      this._log.verbose(" FederationActiveAuthUrl: " + this.federationActiveAuthUrl, true);
    };
    UserRealm.prototype._parseDiscoveryResponse = function(body, callback) {
      this._log.verbose("Discovery response:\n" + body, true);
      var response;
      try {
        response = body;
      } catch (err) {
        callback(this._log.createError("Parsing realm discovery respone JSON failed: " + body, true));
        return;
      }
      var accountType = this._validateAccountType(response["account_type"]);
      if (!accountType) {
        callback(this._log.createError("Cannot parse account_type: " + accountType));
        return;
      }
      this._accountType = accountType;
      if (this._accountType === AccountType.Federated) {
        var protocol = this._validateFederationProtocol(response["federation_protocol"]);
        if (!protocol) {
          callback(this._log.createError("Cannot parse federation protocol: " + protocol));
          return;
        }
        this._federationProtocol = protocol;
        this._federationMetadataUrl = response["federation_metadata_url"];
        this._federationActiveAuthUrl = response["federation_active_auth_url"];
      }
      this._logParsedResponse();
      callback();
    };
    UserRealm.prototype.discover = function(callback) {
      var self2 = this;
      var options = util.createRequestOptions(this, {
        headers: {
          Accept: "application/json"
        }
      });
      var userRealmUrl = this._getUserRealmUrl();
      this._log.verbose("Performing user realm discovery at: " + url.format(userRealmUrl), true);
      axios.get(userRealmUrl, options).then((response) => {
        util.logReturnCorrelationId(this._log, "User Realm Discovery", response);
        if (!util.isHttpSuccess(response.status)) {
          var returnErrorString = "User Realm Discovery request returned http error: " + response.status + " and server response: " + response.status;
          callback(this._log.createError(returnErrorString, true), response.data);
        }
        self2._parseDiscoveryResponse(response.data, callback);
      }).catch((error2) => {
        if (error2.response) {
          util.logReturnCorrelationId(this._log, "User Realm Discovery", error2.response);
          this._log.error("User Realm Discovery request failed with", error2.response.status, true);
          var returnErrorString = "User Realm Discovery request returned http error: " + error2.response.status + " and server response: " + JSON.stringify(error2.response.data);
          callback(this._log.createError(returnErrorString, true), error2.response.data);
        } else if (error2.request) {
          this._log.error("User Realm Discovery request was made but no response was received", error2.request, true);
          callback(self2._log.createError("No response from the server"));
        } else {
          this._log.error("User Realm Discovery request was never made, please check", error2.message, true);
          callback(error2.message);
        }
      });
    };
    module2.exports = UserRealm;
  }
});

// node_modules/adal-node/lib/wstrust-response.js
var require_wstrust_response = __commonJS({
  "node_modules/adal-node/lib/wstrust-response.js"(exports2, module2) {
    "use strict";
    var xmldom = require_lib();
    var xmlutil = require_xmlutil();
    var Logger = require_log().Logger;
    var WSTrustVersion = require_constants().WSTrustVersion;
    var select = xmlutil.xpathSelect;
    var DOMParser = xmldom.DOMParser;
    var assertionRegEx = /RequestedSecurityToken.*?((<.*?:Assertion.*?>).*<\/.*?Assertion>).*?/;
    function scrubRSTRLogMessage(RSTR) {
      var scrubbedRSTR = null;
      var singleLineRSTR = RSTR.replace(/(\r\n|\n|\r)/gm, "");
      var matchResult = assertionRegEx.exec(singleLineRSTR);
      if (matchResult === null) {
        scrubbedRSTR = singleLineRSTR;
      } else {
        var samlAssertion = matchResult[1];
        var samlAssertionStartTag = matchResult[2];
        scrubbedRSTR = singleLineRSTR.replace(samlAssertion, samlAssertionStartTag + "ASSERTION CONTENTS REDACTED</saml:Assertion>");
      }
      return "RSTR Response: " + scrubbedRSTR;
    }
    function WSTrustResponse(callContext, response, wstrustVersion) {
      this._log = new Logger("WSTrustResponse", callContext._logContext);
      this._callContext = callContext;
      this._response = response;
      this._dom = null;
      this._errorCode = null;
      this._faultMessage = null;
      this._tokenType = null;
      this._token = null;
      this._wstrustVersion = wstrustVersion;
      this._log.verbose(function() {
        return scrubRSTRLogMessage(response);
      });
    }
    Object.defineProperty(WSTrustResponse.prototype, "errorCode", {
      get: function() {
        return this._errorCode;
      }
    });
    Object.defineProperty(WSTrustResponse.prototype, "faultMessage", {
      get: function() {
        return this._faultMessage;
      }
    });
    Object.defineProperty(WSTrustResponse.prototype, "tokenType", {
      get: function() {
        return this._tokenType;
      }
    });
    Object.defineProperty(WSTrustResponse.prototype, "token", {
      get: function() {
        return this._token;
      }
    });
    WSTrustResponse.prototype._parseError = function() {
      var errorFound = false;
      var faultNode = select(this._dom, "//s:Envelope/s:Body/s:Fault/s:Reason");
      if (faultNode.length) {
        this._faultMessage = xmlutil.serializeNodeChildren(faultNode[0]);
        if (this._faultMessage) {
          errorFound = true;
        }
      }
      var subcodeNode = select(this._dom, "//s:Envelope/s:Body/s:Fault/s:Code/s:Subcode/s:Value");
      if (1 < subcodeNode.length) {
        throw this._log.createError("Found too many fault code values:" + subcodeNode.length);
      }
      if (subcodeNode.length) {
        var errorCode = subcodeNode[0].firstChild.data;
        this._errorCode = errorCode.split(":")[1];
        errorFound = true;
      }
      return errorFound;
    };
    WSTrustResponse.prototype._parseToken = function() {
      var xPath = this._wstrustVersion === WSTrustVersion.WSTRUST2005 ? "//s:Envelope/s:Body/t:RequestSecurityTokenResponse/t:TokenType" : "//s:Envelope/s:Body/wst:RequestSecurityTokenResponseCollection/wst:RequestSecurityTokenResponse/wst:TokenType";
      var tokenTypeNodes = select(this._dom, xPath);
      if (!tokenTypeNodes.length) {
        this._log.warn("No TokenType elements found in RSTR");
      }
      for (var i = 0, length = tokenTypeNodes.length; i < length; i++) {
        if (this._token) {
          this._log.warn("Found more than one returned token.  Using the first.");
          break;
        }
        var tokenTypeNode = tokenTypeNodes[i];
        var tokenType = xmlutil.findElementText(tokenTypeNode);
        if (!tokenType) {
          this._log.warn("Could not find token type in RSTR token");
        }
        var securityTokenPath = this._wstrustVersion === WSTrustVersion.WSTRUST2005 ? "t:RequestedSecurityToken" : "wst:RequestedSecurityToken";
        var requestedTokenNode = select(tokenTypeNode.parentNode, securityTokenPath);
        if (1 < requestedTokenNode) {
          throw this._log.createError("Found too many RequestedSecurityToken nodes for token type: " + tokenType);
        }
        if (!requestedTokenNode.length) {
          this._log.warn("Unable to find RequestsSecurityToken element associated with TokenType element: " + tokenType);
          continue;
        }
        var token = xmlutil.serializeNodeChildren(requestedTokenNode[0]);
        if (!token) {
          this._log.warn("Unable to find token associated with TokenType element: " + tokenType);
          continue;
        }
        this._token = token;
        this._tokenType = tokenType;
        this._log.info("Found token of type: " + this._tokenType);
      }
      if (!this._token) {
        throw this._log.createError("Unable to find any tokens in RSTR.");
      }
    };
    WSTrustResponse.prototype.parse = function() {
      if (!this._response) {
        throw this._log.createError("Received empty RSTR response body.");
      }
      try {
        try {
          var options = {
            errorHandler: this._log.error
          };
          this._dom = new DOMParser(options).parseFromString(this._response);
        } catch (err) {
          throw this._log.createError("Failed to parse RSTR in to DOM", err, true);
        }
        var errorFound = this._parseError();
        if (errorFound) {
          var stringErrorCode = this.ErrorCode || "NONE";
          var stringFaultMessage = this.FaultMessage || "NONE";
          throw this._log.createError("Server returned error in RSTR - ErrorCode: " + stringErrorCode + " : FaultMessage: " + stringFaultMessage, true);
        }
        this._parseToken();
      } catch (err) {
        delete this._dom;
        throw err;
      }
    };
    module2.exports = WSTrustResponse;
  }
});

// node_modules/adal-node/lib/wstrust-request.js
var require_wstrust_request = __commonJS({
  "node_modules/adal-node/lib/wstrust-request.js"(exports2, module2) {
    "use strict";
    var axios = require_axios2();
    var uuid = require_uuid();
    var Logger = require_log().Logger;
    var util = require_util();
    var WSTrustResponse = require_wstrust_response();
    var WSTrustVersion = require_constants().WSTrustVersion;
    var USERNAME_PLACEHOLDER = "{UsernamePlaceHolder}";
    var PASSWORD_PLACEHOLDER = "{PasswordPlaceHolder}";
    function WSTrustRequest(callContext, wstrustEndpointUrl, appliesTo, wstrustEndpointVersion) {
      this._log = new Logger("WSTrustRequest", callContext._logContext);
      this._callContext = callContext;
      this._wstrustEndpointUrl = wstrustEndpointUrl;
      this._appliesTo = appliesTo;
      this._wstrustEndpointVersion = wstrustEndpointVersion;
    }
    function _datePlusMinutes(date, minutes) {
      var minutesInMilliSeconds = minutes * 60 * 1e3;
      var epochTime = date.getTime() + minutesInMilliSeconds;
      return new Date(epochTime);
    }
    WSTrustRequest.prototype._buildSecurityHeader = function() {
      var timeNow = new Date();
      var expireTime = _datePlusMinutes(timeNow, 10);
      var timeNowString = timeNow.toISOString();
      var expireTimeString = expireTime.toISOString();
      var securityHeaderXml = "<wsse:Security s:mustUnderstand='1' xmlns:wsse='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'>    <wsu:Timestamp wsu:Id='_0'>      <wsu:Created>" + timeNowString + "</wsu:Created>      <wsu:Expires>" + expireTimeString + "</wsu:Expires>    </wsu:Timestamp>    <wsse:UsernameToken wsu:Id='ADALUsernameToken'>      <wsse:Username>" + USERNAME_PLACEHOLDER + "</wsse:Username>      <wsse:Password>" + PASSWORD_PLACEHOLDER + "</wsse:Password>    </wsse:UsernameToken>    </wsse:Security>";
      return securityHeaderXml;
    };
    WSTrustRequest.prototype._populateRSTUsernamePassword = function(RSTTemplate, username, password) {
      var RST = RSTTemplate.replace(USERNAME_PLACEHOLDER, username).replace(PASSWORD_PLACEHOLDER, this._populatedEscapedPassword(password));
      return RST;
    };
    WSTrustRequest.prototype._populatedEscapedPassword = function(password) {
      var escapedPassword = password;
      return escapedPassword.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
    WSTrustRequest.prototype._buildRST = function(username, password) {
      var messageID = uuid.v4();
      var schemaLocation = "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd";
      var soapAction = "http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue";
      var rstTrustNamespace = "http://docs.oasis-open.org/ws-sx/ws-trust/200512";
      var keyType = "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer";
      var requestType = "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue";
      if (this._wstrustEndpointVersion === WSTrustVersion.WSTRUST2005) {
        soapAction = "http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue";
        rstTrustNamespace = "http://schemas.xmlsoap.org/ws/2005/02/trust";
        keyType = "http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey";
        requestType = "http://schemas.xmlsoap.org/ws/2005/02/trust/Issue";
      }
      var RSTTemplate = "<s:Envelope xmlns:s='http://www.w3.org/2003/05/soap-envelope' xmlns:wsa='http://www.w3.org/2005/08/addressing' xmlns:wsu='" + schemaLocation + "'>      <s:Header>        <wsa:Action s:mustUnderstand='1'>" + soapAction + "</wsa:Action>        <wsa:messageID>urn:uuid:" + messageID + "</wsa:messageID>        <wsa:ReplyTo>          <wsa:Address>http://www.w3.org/2005/08/addressing/anonymous</wsa:Address>        </wsa:ReplyTo>        <wsa:To s:mustUnderstand='1'>" + this._wstrustEndpointUrl + "</wsa:To>        " + this._buildSecurityHeader() + "      </s:Header>      <s:Body>        <wst:RequestSecurityToken xmlns:wst='" + rstTrustNamespace + "'>          <wsp:AppliesTo xmlns:wsp='http://schemas.xmlsoap.org/ws/2004/09/policy'>            <wsa:EndpointReference>              <wsa:Address>" + this._appliesTo + "</wsa:Address>            </wsa:EndpointReference>          </wsp:AppliesTo>          <wst:KeyType>" + keyType + "</wst:KeyType>          <wst:RequestType>" + requestType + "</wst:RequestType>        </wst:RequestSecurityToken>      </s:Body>    </s:Envelope>";
      this._log.verbose("Created RST: \n" + RSTTemplate, true);
      var RST = this._populateRSTUsernamePassword(RSTTemplate, username, password);
      return RST;
    };
    WSTrustRequest.prototype._handleRSTR = function(body, callback) {
      var err;
      var wstrustResponse = new WSTrustResponse(this._callContext, body, this._wstrustEndpointVersion);
      try {
        wstrustResponse.parse();
      } catch (error2) {
        err = error2;
      }
      callback(err, wstrustResponse);
    };
    WSTrustRequest.prototype.acquireToken = function(username, password, callback) {
      if (this._wstrustEndpointVersion === WSTrustVersion.UNDEFINED) {
        var err = this._log.createError("Unsupported wstrust endpoint version. Current support version is wstrust2005 or wstrust13.");
        callback(err);
        return;
      }
      var self2 = this;
      var RST = this._buildRST(username, password);
      var soapAction = this._wstrustEndpointVersion === WSTrustVersion.WSTRUST2005 ? "http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue" : "http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue";
      var options = util.createRequestOptions(this, {
        method: "POST",
        url: this._wstrustEndpointUrl,
        headers: {
          "Content-Type": "application/soap+xml; charset=utf-8",
          "SOAPAction": soapAction
        },
        data: RST,
        maxRedirects: 0,
        encoding: "utf8"
      });
      this._log.verbose("Sending RST to: " + this._wstrustEndpointUrl, true);
      axios(options).then((response) => {
        util.logReturnCorrelationId(this._log, "WS-Trust RST", response);
        if (!util.isHttpSuccess(response.status)) {
          var returnErrorString = "WS-Trust RST request returned http error: " + response.status + " and server response: " + JSON.stringify(error.response.data);
          callback(this._log.createError(returnErrorString, true), response.data);
        }
        self2._handleRSTR(response.data, callback);
      }).catch((error2) => {
        if (error2.response) {
          util.logReturnCorrelationId(this._log, "WS-Trust RST", error2.response);
          this._log.error("WS-Trust RST request failed with", error2.response.status, true);
          var returnErrorString = "WS-Trust RST request returned http error: " + error2.response.status + " and server response: " + JSON.stringify(error2.response.data);
          callback(self2._log.createError(returnErrorString, true), error2.response.data);
        } else if (error2.request) {
          this._log.error("WS-Trust RST request was made but no response was received", error2.request, true);
          callback(self2._log.createError("No response from the server"));
        } else if (error2.message) {
          this._log.error("WS-Trust RST request was never made, please check", error2.message, true);
          callback(error2.message);
        } else {
          self2._log.error("WS-Trust RST failed with unknown error", "unknown error", true);
          callback(self2._log.createError("failed with an unknown error"));
        }
      });
    };
    module2.exports = WSTrustRequest;
  }
});

// node_modules/adal-node/lib/token-request.js
var require_token_request = __commonJS({
  "node_modules/adal-node/lib/token-request.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var CacheDriver = require_cache_driver();
    var Logger = require_log().Logger;
    var Mex = require_mex();
    var OAuth2Client = require_oauth2client();
    var SelfSignedJwt = require_self_signed_jwt();
    var UserRealm = require_user_realm();
    var WSTrustRequest = require_wstrust_request();
    var OAuth2Parameters = constants.OAuth2.Parameters;
    var TokenResponseFields = constants.TokenResponseFields;
    var OAuth2GrantType = constants.OAuth2.GrantType;
    var OAuth2Scope = constants.OAuth2.Scope;
    var Saml = constants.Saml;
    var AccountType = constants.UserRealm.AccountType;
    var WSTrustVersion = constants.WSTrustVersion;
    var DeviceCodeResponseParameters = constants.UserCodeResponseFields;
    function TokenRequest(callContext, authenticationContext, clientId, resource, redirectUri) {
      this._log = new Logger("TokenRequest", callContext._logContext);
      this._callContext = callContext;
      this._authenticationContext = authenticationContext;
      this._resource = resource;
      this._clientId = clientId;
      this._redirectUri = redirectUri;
      this._userId = null;
      this._userRealm = null;
      this._pollingClient = {};
    }
    TokenRequest.prototype._createUserRealmRequest = function(username) {
      return new UserRealm(this._callContext, username, this._authenticationContext.authority);
    };
    TokenRequest.prototype._createMex = function(mexEndpoint) {
      return new Mex(this._callContext, mexEndpoint);
    };
    TokenRequest.prototype._createWSTrustRequest = function(wstrustEndpoint, appliesTo, wstrustEndpointVersion) {
      return new WSTrustRequest(this._callContext, wstrustEndpoint, appliesTo, wstrustEndpointVersion);
    };
    TokenRequest.prototype._createOAuth2Client = function() {
      return new OAuth2Client(this._callContext, this._authenticationContext._authority);
    };
    TokenRequest.prototype._createSelfSignedJwt = function() {
      return new SelfSignedJwt(this._callContext, this._authenticationContext._authority, this._clientId);
    };
    TokenRequest.prototype._oauthGetToken = function(oauthParameters, callback) {
      var client = this._createOAuth2Client();
      client.getToken(oauthParameters, callback);
    };
    TokenRequest.prototype._oauthGetTokenByPolling = function(oauthParameters, refresh_interval, expires_in, callback) {
      var client = this._createOAuth2Client();
      client.getTokenWithPolling(oauthParameters, refresh_interval, expires_in, callback);
      this._pollingClient = client;
    };
    TokenRequest.prototype._createCacheDriver = function() {
      return new CacheDriver(this._callContext, this._authenticationContext.authority, this._resource, this._clientId, this._authenticationContext.cache, this._getTokenWithTokenResponse.bind(this));
    };
    TokenRequest.prototype._getTokenWithTokenResponse = function(entry, resource, callback) {
      this._log.verbose("Called to refresh a token from the cache.");
      var refreshToken = entry[TokenResponseFields.REFRESH_TOKEN];
      this._getTokenWithRefreshToken(refreshToken, resource, null, callback);
    };
    TokenRequest.prototype._createCacheQuery = function() {
      var query = {
        clientId: this._clientId
      };
      if (this._userId) {
        query.userId = this._userId;
      } else {
        this._log.verbose("No userId passed for cache query.");
      }
      return query;
    };
    TokenRequest.prototype._getTokenWithCacheWrapper = function(callback, getTokenFunc) {
      var self2 = this;
      this._cacheDriver = this._createCacheDriver();
      var cacheQuery = this._createCacheQuery();
      this._cacheDriver.find(cacheQuery, function(err, token) {
        if (err) {
          self2._log.warn("Attempt to look for token in cahce resulted in Error");
          self2._log.warn("Attempt to look for token in cache resulted in Error: " + err.stack, true);
        }
        if (!token) {
          self2._log.verbose("No appropriate cached token found.");
          getTokenFunc.call(self2, function(err2, tokenResponse) {
            if (err2) {
              self2._log.verbose("getTokenFunc returned with err");
              callback(err2, tokenResponse);
              return;
            }
            self2._log.verbose("Successfully retrieved token from authority");
            self2._cacheDriver.add(tokenResponse, function() {
              callback(null, tokenResponse);
            });
          });
        } else {
          self2._log.info("Returning cached token.");
          callback(err, token);
        }
      });
    };
    TokenRequest.prototype._addTokenIntoCache = function(tokenResponse, callback) {
      this._cacheDriver = this._createCacheDriver();
      this._log.verbose("Storing retrieved token into cache");
      this._cacheDriver.add(tokenResponse, function(err) {
        callback(err, tokenResponse);
      });
    };
    function _addParameterIfAvailable(parameters, key, value) {
      if (value) {
        parameters[key] = value;
      }
    }
    TokenRequest.prototype._createOAuthParameters = function(grantType) {
      var oauthParameters = {};
      oauthParameters[OAuth2Parameters.GRANT_TYPE] = grantType;
      if (OAuth2GrantType.AUTHORIZATION_CODE !== grantType && OAuth2GrantType.CLIENT_CREDENTIALS !== grantType && OAuth2GrantType.DEVICE_CODE != grantType) {
        oauthParameters[OAuth2Parameters.SCOPE] = OAuth2Scope.OPENID;
      }
      _addParameterIfAvailable(oauthParameters, OAuth2Parameters.CLIENT_ID, this._clientId);
      _addParameterIfAvailable(oauthParameters, OAuth2Parameters.RESOURCE, this._resource);
      _addParameterIfAvailable(oauthParameters, OAuth2Parameters.REDIRECT_URI, this._redirectUri);
      return oauthParameters;
    };
    TokenRequest.prototype._getTokenUsernamePasswordManaged = function(username, password, callback) {
      this._log.verbose("Acquiring token with username password for managed user");
      var oauthParameters = this._createOAuthParameters(OAuth2GrantType.PASSWORD);
      oauthParameters[OAuth2Parameters.PASSWORD] = password;
      oauthParameters[OAuth2Parameters.USERNAME] = username;
      this._oauthGetToken(oauthParameters, callback);
    };
    TokenRequest.prototype._getSamlGrantType = function(wstrustResponse) {
      var tokenType = wstrustResponse.tokenType;
      switch (tokenType) {
        case Saml.TokenTypeV1:
          return OAuth2GrantType.SAML1;
        case Saml.TokenTypeV2:
          return OAuth2GrantType.SAML2;
        default:
          throw this._log.createError("RSTR returned unknown token type: " + tokenType);
      }
    };
    TokenRequest.prototype._performWSTrustAssertionOAuthExchange = function(wstrustResponse, callback) {
      this._log.verbose("Performing OAuth assertion grant type exchange.");
      var oauthParameters;
      try {
        var grantType = this._getSamlGrantType(wstrustResponse);
        var assertion = new Buffer(wstrustResponse.token).toString("base64");
        oauthParameters = this._createOAuthParameters(grantType);
        oauthParameters[OAuth2Parameters.ASSERTION] = assertion;
      } catch (err) {
        callback(err);
        return;
      }
      this._oauthGetToken(oauthParameters, callback);
    };
    TokenRequest.prototype._performWSTrustExchange = function(wstrustEndpoint, wstrustEndpointVersion, username, password, callback) {
      var self2 = this;
      var wstrust = this._createWSTrustRequest(wstrustEndpoint, "urn:federation:MicrosoftOnline", wstrustEndpointVersion);
      wstrust.acquireToken(username, password, function(rstErr, response) {
        if (rstErr) {
          callback(rstErr);
          return;
        }
        if (!response.token) {
          var rstrErr = self2._log.createError("Unsucessful RSTR.\n	error code: " + response.errorCode + "\n	faultMessage: " + response.faultMessage, true);
          callback(rstrErr);
          return;
        }
        callback(null, response);
      });
    };
    TokenRequest.prototype._performUsernamePasswordForAccessTokenExchange = function(wstrustEndpoint, wstrustEndpointVersion, username, password, callback) {
      var self2 = this;
      this._performWSTrustExchange(wstrustEndpoint, wstrustEndpointVersion, username, password, function(err, wstrustResponse) {
        if (err) {
          callback(err);
          return;
        }
        self2._performWSTrustAssertionOAuthExchange(wstrustResponse, callback);
      });
    };
    TokenRequest.prototype._createADWSTrustEndpointError = function() {
      return this._log.createError("AAD did not return a WSTrust endpoint.  Unable to proceed.");
    };
    TokenRequest.prototype._getTokenUsernamePasswordFederated = function(username, password, callback) {
      this._log.verbose("Acquiring token with username password for federated user");
      var self2 = this;
      if (!this._userRealm.federationMetadataUrl) {
        this._log.warn("Unable to retrieve federationMetadataUrl from AAD.  Attempting fallback to AAD supplied endpoint.");
        if (!this._userRealm.federationActiveAuthUrl) {
          callback(this._createADWSTrustEndpointError());
          return;
        }
        var wstrustVersion = this._parseWStrustVersionFromFederationActiveAuthUrl(this._userRealm.federationActiveAuthUrl);
        this._log.verbose("Wstrust endpoint version is: " + wstrustVersion);
        this._performUsernamePasswordForAccessTokenExchange(this._userRealm.federationActiveAuthUrl, wstrustVersion, username, password, callback);
        return;
      } else {
        var mexEndpoint = this._userRealm.federationMetadataUrl;
        this._log.verbose("Attempting mex");
        this._log.verbose("Attempting mex at: " + mexEndpoint, true);
        var mex = this._createMex(mexEndpoint);
        mex.discover(function(mexErr) {
          var wstrustEndpoint;
          wstrustVersion = WSTrustVersion.UNDEFINED;
          if (mexErr) {
            self2._log.warn("MEX exchange failed.  Attempting fallback to AAD supplied endpoint.");
            wstrustEndpoint = self2._userRealm.federationActiveAuthUrl;
            wstrustVersion = self2._parseWStrustVersionFromFederationActiveAuthUrl(self2._userRealm.federationActiveAuthUrl);
            if (!wstrustEndpoint) {
              callback(self2._createADWSTrustEndpointError());
              return;
            }
          } else {
            wstrustEndpoint = mex.usernamePasswordPolicy.url;
            wstrustVersion = mex.usernamePasswordPolicy.version;
          }
          self2._performUsernamePasswordForAccessTokenExchange(wstrustEndpoint, wstrustVersion, username, password, callback);
          return;
        });
      }
    };
    TokenRequest.prototype._parseWStrustVersionFromFederationActiveAuthUrl = function(federationActiveAuthUrl) {
      var wstrust2005Regex = /[/trust]?[2005][/usernamemixed]?/;
      var wstrust13Regex = /[/trust]?[13][/usernamemixed]?/;
      if (wstrust2005Regex.exec(federationActiveAuthUrl)) {
        return WSTrustVersion.WSTRUST2005;
      } else if (wstrust13Regex.exec(federationActiveAuthUrl)) {
        return WSTrustVersion.WSTRUST13;
      }
      return WSTrustVersion.UNDEFINED;
    };
    TokenRequest.prototype.getTokenWithUsernamePassword = function(username, password, callback) {
      this._log.info("Acquiring token with username password");
      this._userId = username;
      this._getTokenWithCacheWrapper(callback, function(getTokenCompleteCallback) {
        var self2 = this;
        if (this._authenticationContext._authority._isAdfsAuthority) {
          this._log.info("Skipping user realm discovery for ADFS authority");
          self2._getTokenUsernamePasswordManaged(username, password, getTokenCompleteCallback);
          return;
        }
        this._userRealm = this._createUserRealmRequest(username);
        this._userRealm.discover(function(err) {
          if (err) {
            getTokenCompleteCallback(err);
            return;
          }
          switch (self2._userRealm.accountType) {
            case AccountType.Managed:
              self2._getTokenUsernamePasswordManaged(username, password, getTokenCompleteCallback);
              return;
            case AccountType.Federated:
              self2._getTokenUsernamePasswordFederated(username, password, getTokenCompleteCallback);
              return;
            default:
              getTokenCompleteCallback(self2._log.createError("Server returned an unknown AccountType: " + self2._userRealm.AccountType));
          }
        });
      });
    };
    TokenRequest.prototype.getTokenWithClientCredentials = function(clientSecret, callback) {
      this._log.info("Getting token with client credentials.");
      this._getTokenWithCacheWrapper(callback, function(getTokenCompleteCallback) {
        var oauthParameters = this._createOAuthParameters(OAuth2GrantType.CLIENT_CREDENTIALS);
        oauthParameters[OAuth2Parameters.CLIENT_SECRET] = clientSecret;
        this._oauthGetToken(oauthParameters, getTokenCompleteCallback);
      });
    };
    TokenRequest.prototype.getTokenWithAuthorizationCode = function(authorizationCode, clientSecret, callback) {
      this._log.info("Getting token with auth code.");
      var oauthParameters = this._createOAuthParameters(OAuth2GrantType.AUTHORIZATION_CODE);
      oauthParameters[OAuth2Parameters.CODE] = authorizationCode;
      oauthParameters[OAuth2Parameters.CLIENT_SECRET] = clientSecret;
      this._oauthGetToken(oauthParameters, callback);
    };
    TokenRequest.prototype._getTokenWithRefreshToken = function(refreshToken, resource, clientSecret, callback) {
      this._log.info("Getting a new token from a refresh token.");
      var oauthParameters = this._createOAuthParameters(OAuth2GrantType.REFRESH_TOKEN);
      if (resource) {
        oauthParameters[OAuth2Parameters.RESOURCE] = resource;
      }
      if (clientSecret) {
        oauthParameters[OAuth2Parameters.CLIENT_SECRET] = clientSecret;
      }
      oauthParameters[OAuth2Parameters.REFRESH_TOKEN] = refreshToken;
      this._oauthGetToken(oauthParameters, callback);
    };
    TokenRequest.prototype.getTokenWithRefreshToken = function(refreshToken, clientSecret, callback) {
      this._getTokenWithRefreshToken(refreshToken, null, clientSecret, callback);
    };
    TokenRequest.prototype.getTokenFromCacheWithRefresh = function(userId, callback) {
      var self2 = this;
      this._log.info("Getting token from cache with refresh if necessary.");
      this._userId = userId;
      this._getTokenWithCacheWrapper(callback, function(getTokenCompleteCallback) {
        getTokenCompleteCallback(self2._log.createError("Entry not found in cache."));
      });
    };
    TokenRequest.prototype._createJwt = function(authorityUrl, certificate, thumbprint) {
      var jwt;
      var ssj = this._createSelfSignedJwt();
      jwt = ssj.create(certificate, thumbprint);
      if (!jwt) {
        throw this._log.createError("Failed to create JWT");
      }
      return jwt;
    };
    TokenRequest.prototype.getTokenWithCertificate = function(certificate, thumbprint, callback) {
      this._log.info("Getting a token via certificate.");
      var authorityUrl = this._authenticationContext._authority;
      var jwt;
      try {
        jwt = this._createJwt(authorityUrl, certificate, thumbprint);
      } catch (err) {
        callback(err);
        return;
      }
      var oauthParameters = this._createOAuthParameters(OAuth2GrantType.CLIENT_CREDENTIALS);
      oauthParameters[OAuth2Parameters.CLIENT_ASSERTION_TYPE] = OAuth2GrantType.JWT_BEARER;
      oauthParameters[OAuth2Parameters.CLIENT_ASSERTION] = jwt;
      this._getTokenWithCacheWrapper(callback, function(getTokenCompleteCallback) {
        this._oauthGetToken(oauthParameters, getTokenCompleteCallback);
      });
    };
    TokenRequest.prototype.getTokenWithDeviceCode = function(userCodeInfo, callback) {
      this._log.info("Getting a token via device code");
      var self2 = this;
      var oauthParameters = this._createOAuthParameters(OAuth2GrantType.DEVICE_CODE);
      oauthParameters[OAuth2Parameters.CODE] = userCodeInfo[DeviceCodeResponseParameters.DEVICE_CODE];
      var interval = userCodeInfo[DeviceCodeResponseParameters.INTERVAL];
      var expires_in = userCodeInfo[DeviceCodeResponseParameters.EXPIRES_IN];
      if (interval <= 0) {
        callback(new Error("invalid refresh interval"));
        return;
      }
      this._oauthGetTokenByPolling(oauthParameters, interval, expires_in, function(err, tokenResponse) {
        if (err) {
          self2._log.verbose("Token polling request returend with err.");
          callback(err, tokenResponse);
        } else {
          self2._addTokenIntoCache(tokenResponse, callback);
        }
      });
    };
    TokenRequest.prototype.cancelTokenRequestWithDeviceCode = function() {
      this._pollingClient.cancelPollingRequest();
    };
    module2.exports = TokenRequest;
  }
});

// node_modules/adal-node/lib/code-request.js
var require_code_request = __commonJS({
  "node_modules/adal-node/lib/code-request.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var Logger = require_log().Logger;
    var Mex = require_mex();
    var OAuth2Client = require_oauth2client();
    var OAuth2Parameters = constants.OAuth2.Parameters;
    var TokenResponseFields = constants.TokenResponseFields;
    var OAuth2GrantType = constants.OAuth2.GrantType;
    var OAuth2Scope = constants.OAuth2.Scope;
    function CodeRequest(callContext, authenticationContext, clientId, resource) {
      this._log = new Logger("DeviceCodeRequest", callContext._logContext);
      this._callContext = callContext;
      this._authenticationContext = authenticationContext;
      this._resource = resource;
      this._clientId = clientId;
      this._userId = null;
    }
    CodeRequest.prototype._getUserCodeInfo = function(oauthParameters, callback) {
      var oauth2Client = this._createOAuth2Client();
      oauth2Client.getUserCodeInfo(oauthParameters, callback);
    };
    CodeRequest.prototype._createOAuth2Client = function() {
      return new OAuth2Client(this._callContext, this._authenticationContext._authority);
    };
    CodeRequest.prototype._createOAuthParameters = function() {
      var oauthParameters = {};
      oauthParameters[OAuth2Parameters.CLIENT_ID] = this._clientId;
      oauthParameters[OAuth2Parameters.RESOURCE] = this._resource;
      return oauthParameters;
    };
    CodeRequest.prototype.getUserCodeInfo = function(language, callback) {
      this._log.info("Getting user code info.");
      var oauthParameters = this._createOAuthParameters();
      if (language) {
        oauthParameters[OAuth2Parameters.LANGUAGE] = language;
      }
      this._getUserCodeInfo(oauthParameters, callback);
    };
    module2.exports = CodeRequest;
  }
});

// node_modules/adal-node/lib/memory-cache.js
var require_memory_cache = __commonJS({
  "node_modules/adal-node/lib/memory-cache.js"(exports2, module2) {
    "use strict";
    var _ = require_underscore_node();
    function MemoryCache() {
      this._entries = [];
    }
    MemoryCache.prototype.remove = function(entries, callback) {
      var updatedEntries = _.filter(this._entries, function(element) {
        if (_.findWhere(entries, element)) {
          return false;
        }
        return true;
      });
      this._entries = updatedEntries;
      callback();
    };
    MemoryCache.prototype.add = function(entries, callback) {
      _.each(this._entries, function(element) {
        _.each(entries, function(addElement, index) {
          if (_.isEqual(element, addElement)) {
            entries[index] = null;
          }
        });
      });
      entries = _.compact(entries);
      for (var i = 0; i < entries.length; i++) {
        this._entries.push(entries[i]);
      }
      callback(null, true);
    };
    MemoryCache.prototype.find = function(query, callback) {
      var results = _.where(this._entries, query);
      callback(null, results);
    };
    module2.exports = MemoryCache;
  }
});

// node_modules/adal-node/lib/authentication-context.js
var require_authentication_context = __commonJS({
  "node_modules/adal-node/lib/authentication-context.js"(exports2, module2) {
    "use strict";
    var argument = require_argument();
    var Authority = require_authority().Authority;
    var TokenRequest = require_token_request();
    var CodeRequest = require_code_request();
    var createLogContext = require_log().createLogContext;
    var MemoryCache = require_memory_cache();
    var util = require_util();
    var constants = require_constants();
    var globalADALOptions = {};
    var globalCache = new MemoryCache();
    function AuthenticationContext(authority, validateAuthority, cache, aadApiVersion) {
      var validate = validateAuthority === void 0 || validateAuthority === null || validateAuthority;
      this._authority = new Authority(authority, validate);
      this._authority.aadApiVersion = aadApiVersion;
      this._oauth2client = null;
      this._correlationId = null;
      this._callContext = { options: globalADALOptions };
      this._cache = cache || globalCache;
      this._tokenRequestWithUserCode = {};
    }
    Object.defineProperty(AuthenticationContext.prototype, "authority", {
      get: function() {
        return this._authority.url;
      }
    });
    Object.defineProperty(AuthenticationContext.prototype, "correlationId", {
      get: function() {
        return this._correlationId;
      },
      set: function(id) {
        this._correlationId = id;
      }
    });
    Object.defineProperty(AuthenticationContext.prototype, "options", {
      get: function() {
        return this._callContext.options;
      },
      set: function(value) {
        this._callContext.options = value;
      }
    });
    Object.defineProperty(AuthenticationContext.prototype, "cache", {
      get: function() {
        return this._cache;
      }
    });
    AuthenticationContext.prototype._acquireToken = function(callback, tokenFunction) {
      var self2 = this;
      this._callContext._logContext = createLogContext(this.correlationId);
      this._authority.validate(this._callContext, function(err) {
        if (err) {
          callback(err);
          return;
        }
        tokenFunction.call(self2);
      });
    };
    AuthenticationContext.prototype._acquireUserCode = function(callback, codeFunction) {
      var self2 = this;
      this._callContext._logContext = createLogContext(this.correlationId);
      this._authority.validate(this._callContext, function(err) {
        if (err) {
          callback(err);
          return;
        }
        codeFunction.call(self2);
      });
    };
    AuthenticationContext.prototype.acquireToken = function(resource, userId, clientId, callback) {
      argument.validateCallbackType(callback);
      try {
        argument.validateStringParameter(resource, "resource");
        argument.validateStringParameter(clientId, "clientId");
      } catch (err) {
        callback(err);
        return;
      }
      this._acquireToken(callback, function() {
        var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource);
        tokenRequest.getTokenFromCacheWithRefresh(userId, callback);
      });
    };
    AuthenticationContext.prototype.acquireTokenWithUsernamePassword = function(resource, username, password, clientId, callback) {
      argument.validateCallbackType(callback);
      try {
        argument.validateStringParameter(resource, "resource");
        argument.validateStringParameter(username, "username");
        argument.validateStringParameter(password, "password");
        argument.validateStringParameter(clientId, "clientId");
      } catch (err) {
        callback(err);
        return;
      }
      this._acquireToken(callback, function() {
        var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource);
        tokenRequest.getTokenWithUsernamePassword(username, password, callback);
      });
    };
    AuthenticationContext.prototype.acquireTokenWithClientCredentials = function(resource, clientId, clientSecret, callback) {
      argument.validateCallbackType(callback);
      try {
        argument.validateStringParameter(resource, "resource");
        argument.validateStringParameter(clientId, "clientId");
        argument.validateStringParameter(clientSecret, "clientSecret");
      } catch (err) {
        callback(err);
        return;
      }
      this._acquireToken(callback, function() {
        var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource);
        tokenRequest.getTokenWithClientCredentials(clientSecret, callback);
      });
    };
    AuthenticationContext.prototype.acquireTokenWithAuthorizationCode = function(authorizationCode, redirectUri, resource, clientId, clientSecret, callback) {
      argument.validateCallbackType(callback);
      try {
        argument.validateStringParameter(resource, "resource");
        argument.validateStringParameter(authorizationCode, "authorizationCode");
        argument.validateStringParameter(redirectUri, "redirectUri");
        argument.validateStringParameter(clientId, "clientId");
      } catch (err) {
        callback(err);
        return;
      }
      this._acquireToken(callback, function() {
        var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource, redirectUri);
        tokenRequest.getTokenWithAuthorizationCode(authorizationCode, clientSecret, callback);
      });
    };
    AuthenticationContext.prototype.acquireTokenWithRefreshToken = function(refreshToken, clientId, clientSecret, resource, callback) {
      var clientSecretPresent = arguments.length === 5;
      var actualClientSecret = clientSecretPresent ? clientSecret : null;
      var actualCallback = clientSecretPresent ? arguments[4] : arguments[3];
      var actualResource = clientSecretPresent ? arguments[3] : arguments[2];
      argument.validateCallbackType(actualCallback);
      try {
        argument.validateStringParameter(refreshToken, "refreshToken");
        argument.validateStringParameter(clientId, "clientId");
      } catch (err) {
        callback(err);
        return;
      }
      this._acquireToken(callback, function() {
        var tokenRequest = new TokenRequest(this._callContext, this, clientId, actualResource);
        tokenRequest.getTokenWithRefreshToken(refreshToken, actualClientSecret, actualCallback);
      });
    };
    AuthenticationContext.prototype.acquireTokenWithClientCertificate = function(resource, clientId, certificate, thumbprint, callback) {
      argument.validateCallbackType(callback);
      try {
        argument.validateStringParameter(resource, "resource");
        argument.validateStringParameter(certificate, "certificate");
        argument.validateStringParameter(thumbprint, "thumbprint");
      } catch (err) {
        callback(err);
        return;
      }
      this._acquireToken(callback, function() {
        var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource);
        tokenRequest.getTokenWithCertificate(certificate, thumbprint, callback);
      });
    };
    AuthenticationContext.prototype.acquireUserCode = function(resource, clientId, language, callback) {
      argument.validateCallbackType(callback);
      try {
        argument.validateStringParameter(resource, "resource");
        argument.validateStringParameter(clientId, "clientId");
      } catch (err) {
        callback(err);
        return;
      }
      this._acquireUserCode(callback, function() {
        var codeRequest = new CodeRequest(this._callContext, this, clientId, resource);
        codeRequest.getUserCodeInfo(language, callback);
      });
    };
    AuthenticationContext.prototype.acquireTokenWithDeviceCode = function(resource, clientId, userCodeInfo, callback) {
      argument.validateCallbackType(callback);
      try {
        argument.validateUserCodeInfo(userCodeInfo);
      } catch (err) {
        callback(err);
        return;
      }
      var self2 = this;
      this._acquireToken(callback, function() {
        var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource, null);
        self2._tokenRequestWithUserCode[userCodeInfo[constants.UserCodeResponseFields.DEVICE_CODE]] = tokenRequest;
        tokenRequest.getTokenWithDeviceCode(userCodeInfo, callback);
      });
    };
    AuthenticationContext.prototype.cancelRequestToGetTokenWithDeviceCode = function(userCodeInfo, callback) {
      argument.validateCallbackType(callback);
      try {
        argument.validateUserCodeInfo(userCodeInfo);
      } catch (err) {
        callback(err);
        return;
      }
      if (!this._tokenRequestWithUserCode || !this._tokenRequestWithUserCode[userCodeInfo[constants.UserCodeResponseFields.DEVICE_CODE]]) {
        callback(new Error("No acquireTokenWithDeviceCodeRequest existed to be cancelled"));
        return;
      }
      var tokenRequestToBeCancelled = this._tokenRequestWithUserCode[userCodeInfo[constants.UserCodeResponseFields.DEVICE_CODE]];
      tokenRequestToBeCancelled.cancelTokenRequestWithDeviceCode();
      delete this._tokenRequestWithUserCode[constants.UserCodeResponseFields.DEVICE_CODE];
    };
    util.adalInit();
    module2.exports = exports2;
  }
});

// index.js
var import_authentication_context = __toModule(require_authentication_context());
console.log(new import_authentication_context.default.AuthenticationContext());
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
