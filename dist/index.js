var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/tone/build/Tone.js
var require_Tone = __commonJS({
  "node_modules/tone/build/Tone.js"(exports2, module2) {
    !function(t, e) {
      typeof exports2 == "object" && typeof module2 == "object" ? module2.exports = e() : typeof define == "function" && define.amd ? define([], e) : typeof exports2 == "object" ? exports2.Tone = e() : t.Tone = e();
    }(typeof self != "undefined" ? self : exports2, function() {
      return function(t) {
        var e = {};
        function s(n) {
          if (e[n])
            return e[n].exports;
          var i = e[n] = {i: n, l: false, exports: {}};
          return t[n].call(i.exports, i, i.exports, s), i.l = true, i.exports;
        }
        return s.m = t, s.c = e, s.d = function(t2, e2, n) {
          s.o(t2, e2) || Object.defineProperty(t2, e2, {enumerable: true, get: n});
        }, s.r = function(t2) {
          typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t2, "__esModule", {value: true});
        }, s.t = function(t2, e2) {
          if (1 & e2 && (t2 = s(t2)), 8 & e2)
            return t2;
          if (4 & e2 && typeof t2 == "object" && t2 && t2.__esModule)
            return t2;
          var n = Object.create(null);
          if (s.r(n), Object.defineProperty(n, "default", {enumerable: true, value: t2}), 2 & e2 && typeof t2 != "string")
            for (var i in t2)
              s.d(n, i, function(e3) {
                return t2[e3];
              }.bind(null, i));
          return n;
        }, s.n = function(t2) {
          var e2 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return s.d(e2, "a", e2), e2;
        }, s.o = function(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }, s.p = "", s(s.s = 9);
      }([function(t, e, s) {
        !function(t2, e2, s2, n) {
          "use strict";
          function i(t3) {
            return t3 && typeof t3 == "object" && "default" in t3 ? t3 : {default: t3};
          }
          var o = i(e2), r = i(s2), a = i(n), c = function(t3, e3, s3) {
            return {endTime: e3, insertTime: s3, type: "exponentialRampToValue", value: t3};
          }, h = function(t3, e3, s3) {
            return {endTime: e3, insertTime: s3, type: "linearRampToValue", value: t3};
          }, u = function(t3, e3) {
            return {startTime: e3, type: "setValue", value: t3};
          }, l = function(t3, e3, s3) {
            return {duration: s3, startTime: e3, type: "setValueCurve", values: t3};
          }, p = function(t3, e3, s3) {
            var n2 = s3.startTime, i2 = s3.target, o2 = s3.timeConstant;
            return i2 + (e3 - i2) * Math.exp((n2 - t3) / o2);
          }, d = function(t3) {
            return t3.type === "exponentialRampToValue";
          }, f = function(t3) {
            return t3.type === "linearRampToValue";
          }, _ = function(t3) {
            return d(t3) || f(t3);
          }, m = function(t3) {
            return t3.type === "setValue";
          }, g = function(t3) {
            return t3.type === "setValueCurve";
          }, v = function t3(e3, s3, n2, i2) {
            var o2 = e3[s3];
            return o2 === void 0 ? i2 : _(o2) || m(o2) ? o2.value : g(o2) ? o2.values[o2.values.length - 1] : p(n2, t3(e3, s3 - 1, o2.startTime, i2), o2);
          }, y = function(t3, e3, s3, n2, i2) {
            return s3 === void 0 ? [n2.insertTime, i2] : _(s3) ? [s3.endTime, s3.value] : m(s3) ? [s3.startTime, s3.value] : g(s3) ? [s3.startTime + s3.duration, s3.values[s3.values.length - 1]] : [s3.startTime, v(t3, e3 - 1, s3.startTime, i2)];
          }, x = function(t3) {
            return t3.type === "cancelAndHold";
          }, w = function(t3) {
            return t3.type === "cancelScheduledValues";
          }, b = function(t3) {
            return x(t3) || w(t3) ? t3.cancelTime : d(t3) || f(t3) ? t3.endTime : t3.startTime;
          }, T = function(t3, e3, s3, n2) {
            var i2 = n2.endTime, o2 = n2.value;
            return s3 === o2 ? o2 : 0 < s3 && 0 < o2 || s3 < 0 && o2 < 0 ? s3 * Math.pow(o2 / s3, (t3 - e3) / (i2 - e3)) : 0;
          }, S = function(t3, e3, s3, n2) {
            return s3 + (t3 - e3) / (n2.endTime - e3) * (n2.value - s3);
          }, k = function(t3, e3) {
            var s3 = e3.duration, n2 = e3.startTime, i2 = e3.values;
            return function(t4, e4) {
              var s4 = Math.floor(e4), n3 = Math.ceil(e4);
              return s4 === n3 ? t4[s4] : (1 - (e4 - s4)) * t4[s4] + (1 - (n3 - e4)) * t4[n3];
            }(i2, (t3 - n2) / s3 * (i2.length - 1));
          }, C = function(t3) {
            return t3.type === "setTarget";
          }, A = function() {
            function t3(e3) {
              r.default(this, t3), this._automationEvents = [], this._currenTime = 0, this._defaultValue = e3;
            }
            return a.default(t3, [{key: Symbol.iterator, value: function() {
              return this._automationEvents[Symbol.iterator]();
            }}, {key: "add", value: function(t4) {
              var e3 = b(t4);
              if (x(t4) || w(t4)) {
                var s3 = this._automationEvents.findIndex(function(s4) {
                  return w(t4) && g(s4) ? s4.startTime + s4.duration >= e3 : b(s4) >= e3;
                }), n2 = this._automationEvents[s3];
                if (s3 !== -1 && (this._automationEvents = this._automationEvents.slice(0, s3)), x(t4)) {
                  var i2 = this._automationEvents[this._automationEvents.length - 1];
                  if (n2 !== void 0 && _(n2)) {
                    if (C(i2))
                      throw new Error("The internal list is malformed.");
                    var o2 = g(i2) ? i2.startTime + i2.duration : b(i2), r2 = g(i2) ? i2.values[i2.values.length - 1] : i2.value, a2 = d(n2) ? T(e3, o2, r2, n2) : S(e3, o2, r2, n2), p2 = d(n2) ? c(a2, e3, this._currenTime) : h(a2, e3, this._currenTime);
                    this._automationEvents.push(p2);
                  }
                  i2 !== void 0 && C(i2) && this._automationEvents.push(u(this.getValue(e3), e3)), i2 !== void 0 && g(i2) && i2.startTime + i2.duration > e3 && (this._automationEvents[this._automationEvents.length - 1] = l(new Float32Array([6, 7]), i2.startTime, e3 - i2.startTime));
                }
              } else {
                var m2 = this._automationEvents.findIndex(function(t5) {
                  return b(t5) > e3;
                }), v2 = m2 === -1 ? this._automationEvents[this._automationEvents.length - 1] : this._automationEvents[m2 - 1];
                if (v2 !== void 0 && g(v2) && b(v2) + v2.duration > e3)
                  return false;
                var y2 = d(t4) ? c(t4.value, t4.endTime, this._currenTime) : f(t4) ? h(t4.value, e3, this._currenTime) : t4;
                if (m2 === -1)
                  this._automationEvents.push(y2);
                else {
                  if (g(t4) && e3 + t4.duration > b(this._automationEvents[m2]))
                    return false;
                  this._automationEvents.splice(m2, 0, y2);
                }
              }
              return true;
            }}, {key: "flush", value: function(t4) {
              var e3 = this._automationEvents.findIndex(function(e4) {
                return b(e4) > t4;
              });
              if (e3 > 1) {
                var s3 = this._automationEvents.slice(e3 - 1), n2 = s3[0];
                C(n2) && s3.unshift(u(v(this._automationEvents, e3 - 2, n2.startTime, this._defaultValue), n2.startTime)), this._automationEvents = s3;
              }
            }}, {key: "getValue", value: function(t4) {
              if (this._automationEvents.length === 0)
                return this._defaultValue;
              var e3 = this._automationEvents[this._automationEvents.length - 1], s3 = this._automationEvents.findIndex(function(e4) {
                return b(e4) > t4;
              }), n2 = this._automationEvents[s3], i2 = b(e3) <= t4 ? e3 : this._automationEvents[s3 - 1];
              if (i2 !== void 0 && C(i2) && (n2 === void 0 || !_(n2) || n2.insertTime > t4))
                return p(t4, v(this._automationEvents, s3 - 2, i2.startTime, this._defaultValue), i2);
              if (i2 !== void 0 && m(i2) && (n2 === void 0 || !_(n2)))
                return i2.value;
              if (i2 !== void 0 && g(i2) && (n2 === void 0 || !_(n2) || i2.startTime + i2.duration > t4))
                return t4 < i2.startTime + i2.duration ? k(t4, i2) : i2.values[i2.values.length - 1];
              if (i2 !== void 0 && _(i2) && (n2 === void 0 || !_(n2)))
                return i2.value;
              if (n2 !== void 0 && d(n2)) {
                var r2 = y(this._automationEvents, s3 - 1, i2, n2, this._defaultValue), a2 = o.default(r2, 2), c2 = a2[0], h2 = a2[1];
                return T(t4, c2, h2, n2);
              }
              if (n2 !== void 0 && f(n2)) {
                var u2 = y(this._automationEvents, s3 - 1, i2, n2, this._defaultValue), l2 = o.default(u2, 2), x2 = l2[0], w2 = l2[1];
                return S(t4, x2, w2, n2);
              }
              return this._defaultValue;
            }}]), t3;
          }();
          t2.AutomationEventList = A, t2.createCancelAndHoldAutomationEvent = function(t3) {
            return {cancelTime: t3, type: "cancelAndHold"};
          }, t2.createCancelScheduledValuesAutomationEvent = function(t3) {
            return {cancelTime: t3, type: "cancelScheduledValues"};
          }, t2.createExponentialRampToValueAutomationEvent = function(t3, e3) {
            return {endTime: e3, type: "exponentialRampToValue", value: t3};
          }, t2.createLinearRampToValueAutomationEvent = function(t3, e3) {
            return {endTime: e3, type: "linearRampToValue", value: t3};
          }, t2.createSetTargetAutomationEvent = function(t3, e3, s3) {
            return {startTime: e3, target: t3, timeConstant: s3, type: "setTarget"};
          }, t2.createSetValueAutomationEvent = u, t2.createSetValueCurveAutomationEvent = l, Object.defineProperty(t2, "__esModule", {value: true});
        }(e, s(1), s(7), s(8));
      }, function(t, e, s) {
        var n = s(2), i = s(3), o = s(4), r = s(6);
        t.exports = function(t2, e2) {
          return n(t2) || i(t2, e2) || o(t2, e2) || r();
        };
      }, function(t, e) {
        t.exports = function(t2) {
          if (Array.isArray(t2))
            return t2;
        };
      }, function(t, e) {
        t.exports = function(t2, e2) {
          if (typeof Symbol != "undefined" && Symbol.iterator in Object(t2)) {
            var s = [], n = true, i = false, o = void 0;
            try {
              for (var r, a = t2[Symbol.iterator](); !(n = (r = a.next()).done) && (s.push(r.value), !e2 || s.length !== e2); n = true)
                ;
            } catch (t3) {
              i = true, o = t3;
            } finally {
              try {
                n || a.return == null || a.return();
              } finally {
                if (i)
                  throw o;
              }
            }
            return s;
          }
        };
      }, function(t, e, s) {
        var n = s(5);
        t.exports = function(t2, e2) {
          if (t2) {
            if (typeof t2 == "string")
              return n(t2, e2);
            var s2 = Object.prototype.toString.call(t2).slice(8, -1);
            return s2 === "Object" && t2.constructor && (s2 = t2.constructor.name), s2 === "Map" || s2 === "Set" ? Array.from(t2) : s2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s2) ? n(t2, e2) : void 0;
          }
        };
      }, function(t, e) {
        t.exports = function(t2, e2) {
          (e2 == null || e2 > t2.length) && (e2 = t2.length);
          for (var s = 0, n = new Array(e2); s < e2; s++)
            n[s] = t2[s];
          return n;
        };
      }, function(t, e) {
        t.exports = function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        };
      }, function(t, e) {
        t.exports = function(t2, e2) {
          if (!(t2 instanceof e2))
            throw new TypeError("Cannot call a class as a function");
        };
      }, function(t, e) {
        function s(t2, e2) {
          for (var s2 = 0; s2 < e2.length; s2++) {
            var n = e2[s2];
            n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t2, n.key, n);
          }
        }
        t.exports = function(t2, e2, n) {
          return e2 && s(t2.prototype, e2), n && s(t2, n), t2;
        };
      }, function(t, e, s) {
        "use strict";
        s.r(e), s.d(e, "getContext", function() {
          return Ji;
        }), s.d(e, "setContext", function() {
          return Ki;
        }), s.d(e, "Clock", function() {
          return qo;
        }), s.d(e, "Context", function() {
          return Gi;
        }), s.d(e, "BaseContext", function() {
          return Wi;
        }), s.d(e, "Delay", function() {
          return Fo;
        }), s.d(e, "Gain", function() {
          return ko;
        }), s.d(e, "Offline", function() {
          return Io;
        }), s.d(e, "OfflineContext", function() {
          return Yi;
        }), s.d(e, "Param", function() {
          return xo;
        }), s.d(e, "ToneAudioBuffer", function() {
          return Xi;
        }), s.d(e, "ToneAudioBuffers", function() {
          return Vo;
        }), s.d(e, "ToneAudioNode", function() {
          return wo;
        }), s.d(e, "connectSeries", function() {
          return bo;
        }), s.d(e, "connect", function() {
          return To;
        }), s.d(e, "disconnect", function() {
          return So;
        }), s.d(e, "FrequencyClass", function() {
          return lo;
        }), s.d(e, "Frequency", function() {
          return _o;
        }), s.d(e, "MidiClass", function() {
          return No;
        }), s.d(e, "Midi", function() {
          return Po;
        }), s.d(e, "TimeClass", function() {
          return ho;
        }), s.d(e, "Time", function() {
          return uo;
        }), s.d(e, "TicksClass", function() {
          return jo;
        }), s.d(e, "Ticks", function() {
          return Lo;
        }), s.d(e, "TransportTimeClass", function() {
          return mo;
        }), s.d(e, "TransportTime", function() {
          return go;
        }), s.d(e, "Emitter", function() {
          return Bi;
        }), s.d(e, "IntervalTimeline", function() {
          return Bo;
        }), s.d(e, "StateTimeline", function() {
          return yo;
        }), s.d(e, "Timeline", function() {
          return Ni;
        }), s.d(e, "isUndef", function() {
          return ai;
        }), s.d(e, "isDefined", function() {
          return ci;
        }), s.d(e, "isFunction", function() {
          return hi;
        }), s.d(e, "isNumber", function() {
          return ui;
        }), s.d(e, "isObject", function() {
          return li;
        }), s.d(e, "isBoolean", function() {
          return pi;
        }), s.d(e, "isArray", function() {
          return di;
        }), s.d(e, "isString", function() {
          return fi;
        }), s.d(e, "isNote", function() {
          return _i;
        }), s.d(e, "dbToGain", function() {
          return eo;
        }), s.d(e, "gainToDb", function() {
          return so;
        }), s.d(e, "intervalToFrequencyRatio", function() {
          return no;
        }), s.d(e, "ftom", function() {
          return oo;
        }), s.d(e, "mtof", function() {
          return ao;
        }), s.d(e, "optionsFromArguments", function() {
          return Di;
        }), s.d(e, "defaultArg", function() {
          return Oi;
        }), s.d(e, "Unit", function() {
          return i;
        }), s.d(e, "debug", function() {
          return n;
        }), s.d(e, "Noise", function() {
          return Jo;
        }), s.d(e, "UserMedia", function() {
          return er;
        }), s.d(e, "Oscillator", function() {
          return ir;
        }), s.d(e, "AMOscillator", function() {
          return hr;
        }), s.d(e, "FMOscillator", function() {
          return ur;
        }), s.d(e, "PulseOscillator", function() {
          return lr;
        }), s.d(e, "FatOscillator", function() {
          return pr;
        }), s.d(e, "PWMOscillator", function() {
          return dr;
        }), s.d(e, "OmniOscillator", function() {
          return _r;
        }), s.d(e, "ToneOscillatorNode", function() {
          return nr;
        }), s.d(e, "LFO", function() {
          return yr;
        }), s.d(e, "ToneBufferSource", function() {
          return $o;
        }), s.d(e, "Player", function() {
          return br;
        }), s.d(e, "Players", function() {
          return Tr;
        }), s.d(e, "GrainPlayer", function() {
          return Sr;
        }), s.d(e, "Add", function() {
          return mr;
        }), s.d(e, "Abs", function() {
          return kr;
        }), s.d(e, "AudioToGain", function() {
          return ar;
        }), s.d(e, "GainToAudio", function() {
          return Cr;
        }), s.d(e, "GreaterThan", function() {
          return Mr;
        }), s.d(e, "GreaterThanZero", function() {
          return Or;
        }), s.d(e, "Multiply", function() {
          return cr;
        }), s.d(e, "Negate", function() {
          return Ar;
        }), s.d(e, "Pow", function() {
          return Er;
        }), s.d(e, "Signal", function() {
          return Do;
        }), s.d(e, "connectSignal", function() {
          return Oo;
        }), s.d(e, "Scale", function() {
          return gr;
        }), s.d(e, "ScaleExp", function() {
          return Rr;
        }), s.d(e, "Subtract", function() {
          return Dr;
        }), s.d(e, "SyncedSignal", function() {
          return qr;
        }), s.d(e, "WaveShaper", function() {
          return rr;
        }), s.d(e, "Zero", function() {
          return vr;
        }), s.d(e, "AMSynth", function() {
          return zr;
        }), s.d(e, "DuoSynth", function() {
          return Qr;
        }), s.d(e, "FMSynth", function() {
          return Zr;
        }), s.d(e, "MetalSynth", function() {
          return Yr;
        }), s.d(e, "MembraneSynth", function() {
          return Hr;
        }), s.d(e, "MonoSynth", function() {
          return Ur;
        }), s.d(e, "NoiseSynth", function() {
          return $r;
        }), s.d(e, "PluckSynth", function() {
          return oa;
        }), s.d(e, "PolySynth", function() {
          return ra;
        }), s.d(e, "Sampler", function() {
          return aa;
        }), s.d(e, "Synth", function() {
          return jr;
        }), s.d(e, "Loop", function() {
          return ha;
        }), s.d(e, "Part", function() {
          return ua;
        }), s.d(e, "Pattern", function() {
          return xa;
        }), s.d(e, "Sequence", function() {
          return wa;
        }), s.d(e, "ToneEvent", function() {
          return ca;
        }), s.d(e, "AutoFilter", function() {
          return ka;
        }), s.d(e, "AutoPanner", function() {
          return Aa;
        }), s.d(e, "AutoWah", function() {
          return Oa;
        }), s.d(e, "BitCrusher", function() {
          return Ma;
        }), s.d(e, "Chebyshev", function() {
          return Ra;
        }), s.d(e, "Chorus", function() {
          return Na;
        }), s.d(e, "Distortion", function() {
          return Pa;
        }), s.d(e, "FeedbackDelay", function() {
          return La;
        }), s.d(e, "FrequencyShifter", function() {
          return Ba;
        }), s.d(e, "Freeverb", function() {
          return Ua;
        }), s.d(e, "JCReverb", function() {
          return Ya;
        }), s.d(e, "PingPongDelay", function() {
          return $a;
        }), s.d(e, "PitchShift", function() {
          return Ja;
        }), s.d(e, "Phaser", function() {
          return Ka;
        }), s.d(e, "Reverb", function() {
          return tc;
        }), s.d(e, "StereoWidener", function() {
          return ic;
        }), s.d(e, "Tremolo", function() {
          return oc;
        }), s.d(e, "Vibrato", function() {
          return rc;
        }), s.d(e, "Analyser", function() {
          return ac;
        }), s.d(e, "Meter", function() {
          return hc;
        }), s.d(e, "FFT", function() {
          return uc;
        }), s.d(e, "DCMeter", function() {
          return lc;
        }), s.d(e, "Waveform", function() {
          return pc;
        }), s.d(e, "Follower", function() {
          return Da;
        }), s.d(e, "Channel", function() {
          return _c;
        }), s.d(e, "CrossFade", function() {
          return ba;
        }), s.d(e, "Merge", function() {
          return Fa;
        }), s.d(e, "MidSideMerge", function() {
          return sc;
        }), s.d(e, "MidSideSplit", function() {
          return ec;
        }), s.d(e, "Mono", function() {
          return mc;
        }), s.d(e, "MultibandSplit", function() {
          return gc;
        }), s.d(e, "Panner", function() {
          return Ca;
        }), s.d(e, "Panner3D", function() {
          return yc;
        }), s.d(e, "PanVol", function() {
          return fc;
        }), s.d(e, "Recorder", function() {
          return xc;
        }), s.d(e, "Solo", function() {
          return dc;
        }), s.d(e, "Split", function() {
          return qa;
        }), s.d(e, "Volume", function() {
          return Go;
        }), s.d(e, "Compressor", function() {
          return wc;
        }), s.d(e, "Gate", function() {
          return bc;
        }), s.d(e, "Limiter", function() {
          return Tc;
        }), s.d(e, "MidSideCompressor", function() {
          return Sc;
        }), s.d(e, "MultibandCompressor", function() {
          return kc;
        }), s.d(e, "AmplitudeEnvelope", function() {
          return Pr;
        }), s.d(e, "Envelope", function() {
          return Fr;
        }), s.d(e, "FrequencyEnvelope", function() {
          return Gr;
        }), s.d(e, "EQ3", function() {
          return Cc;
        }), s.d(e, "Filter", function() {
          return Wr;
        }), s.d(e, "OnePoleFilter", function() {
          return na;
        }), s.d(e, "FeedbackCombFilter", function() {
          return sa;
        }), s.d(e, "LowpassCombFilter", function() {
          return ia;
        }), s.d(e, "Convolver", function() {
          return Ac;
        }), s.d(e, "BiquadFilter", function() {
          return Br;
        }), s.d(e, "version", function() {
          return o;
        }), s.d(e, "start", function() {
          return to;
        }), s.d(e, "supported", function() {
          return Kn;
        }), s.d(e, "now", function() {
          return Dc;
        }), s.d(e, "immediate", function() {
          return Oc;
        }), s.d(e, "Transport", function() {
          return Mc;
        }), s.d(e, "getTransport", function() {
          return Ec;
        }), s.d(e, "Destination", function() {
          return Rc;
        }), s.d(e, "Master", function() {
          return qc;
        }), s.d(e, "getDestination", function() {
          return Fc;
        }), s.d(e, "Listener", function() {
          return Ic;
        }), s.d(e, "getListener", function() {
          return Vc;
        }), s.d(e, "Draw", function() {
          return Nc;
        }), s.d(e, "getDraw", function() {
          return Pc;
        }), s.d(e, "context", function() {
          return jc;
        }), s.d(e, "loaded", function() {
          return Lc;
        }), s.d(e, "Buffer", function() {
          return zc;
        }), s.d(e, "Buffers", function() {
          return Bc;
        }), s.d(e, "BufferSource", function() {
          return Wc;
        });
        var n = {};
        s.r(n), s.d(n, "assert", function() {
          return ti;
        }), s.d(n, "assertRange", function() {
          return ei;
        }), s.d(n, "assertContextRunning", function() {
          return si;
        }), s.d(n, "setLogger", function() {
          return ii;
        }), s.d(n, "log", function() {
          return oi;
        }), s.d(n, "warn", function() {
          return ri;
        });
        var i = {};
        s.r(i);
        const o = "14.7.77";
        var r = s(0);
        const a = new WeakSet(), c = new WeakMap(), h = new WeakMap(), u = new WeakMap(), l = new WeakMap(), p = new WeakMap(), d = new WeakMap(), f = new WeakMap(), _ = new WeakMap(), m = new WeakMap(), g = {construct: () => g}, v = /^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/, y = (t2, e2) => {
          const s2 = [];
          let n2 = t2.replace(/^[\s]+/, ""), i2 = n2.match(v);
          for (; i2 !== null; ) {
            const t3 = i2[1].slice(1, -1), o2 = i2[0].replace(/([\s]+)?;?$/, "").replace(t3, new URL(t3, e2).toString());
            s2.push(o2), n2 = n2.slice(i2[0].length).replace(/^[\s]+/, ""), i2 = n2.match(v);
          }
          return [s2.join(";"), n2];
        }, x = (t2) => {
          if (t2 !== void 0 && !Array.isArray(t2))
            throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.");
        }, w = (t2) => {
          if (!((t3) => {
            try {
              new new Proxy(t3, g)();
            } catch {
              return false;
            }
            return true;
          })(t2))
            throw new TypeError("The given value for processorCtor should be a constructor.");
          if (t2.prototype === null || typeof t2.prototype != "object")
            throw new TypeError("The given value for processorCtor should have a prototype.");
        }, b = (t2, e2) => {
          const s2 = t2.get(e2);
          if (s2 === void 0)
            throw new Error("A value with the given key could not be found.");
          return s2;
        }, T = (t2, e2) => {
          const s2 = Array.from(t2).filter(e2);
          if (s2.length > 1)
            throw Error("More than one element was found.");
          if (s2.length === 0)
            throw Error("No element was found.");
          const [n2] = s2;
          return t2.delete(n2), n2;
        }, S = (t2, e2, s2, n2) => {
          const i2 = b(t2, e2), o2 = T(i2, (t3) => t3[0] === s2 && t3[1] === n2);
          return i2.size === 0 && t2.delete(e2), o2;
        }, k = (t2) => b(d, t2), C = (t2) => {
          if (a.has(t2))
            throw new Error("The AudioNode is already stored.");
          a.add(t2), k(t2).forEach((t3) => t3(true));
        }, A = (t2) => "port" in t2, D = (t2) => {
          if (!a.has(t2))
            throw new Error("The AudioNode is not stored.");
          a.delete(t2), k(t2).forEach((t3) => t3(false));
        }, O = (t2, e2) => {
          !A(t2) && e2.every((t3) => t3.size === 0) && D(t2);
        }, M = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", fftSize: 2048, maxDecibels: -30, minDecibels: -100, smoothingTimeConstant: 0.8}, E = (t2, e2) => t2.context === e2, R = (t2) => {
          try {
            t2.copyToChannel(new Float32Array(1), 0, -1);
          } catch {
            return false;
          }
          return true;
        }, q = () => new DOMException("", "IndexSizeError"), F = (t2) => {
          var e2;
          t2.getChannelData = (e2 = t2.getChannelData, (s2) => {
            try {
              return e2.call(t2, s2);
            } catch (t3) {
              if (t3.code === 12)
                throw q();
              throw t3;
            }
          });
        }, I = {numberOfChannels: 1}, V = -34028234663852886e22, N = -V, P = (t2) => a.has(t2), j = {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}, L = (t2) => b(c, t2), z = (t2) => b(u, t2), B = (t2, e2) => {
          const {activeInputs: s2} = L(t2);
          s2.forEach((s3) => s3.forEach(([s4]) => {
            e2.includes(t2) || B(s4, [...e2, t2]);
          }));
          const n2 = ((t3) => "playbackRate" in t3)(t2) ? [t2.playbackRate] : A(t2) ? Array.from(t2.parameters.values()) : ((t3) => "frequency" in t3 && "gain" in t3)(t2) ? [t2.Q, t2.detune, t2.frequency, t2.gain] : ((t3) => "offset" in t3)(t2) ? [t2.offset] : ((t3) => !("frequency" in t3) && "gain" in t3)(t2) ? [t2.gain] : ((t3) => "detune" in t3 && "frequency" in t3)(t2) ? [t2.detune, t2.frequency] : ((t3) => "pan" in t3)(t2) ? [t2.pan] : [];
          for (const t3 of n2) {
            const s3 = z(t3);
            s3 !== void 0 && s3.activeInputs.forEach(([t4]) => B(t4, e2));
          }
          P(t2) && D(t2);
        }, W = (t2) => {
          B(t2.destination, []);
        }, G = (t2) => t2 === void 0 || typeof t2 == "number" || typeof t2 == "string" && (t2 === "balanced" || t2 === "interactive" || t2 === "playback"), U = (t2) => "context" in t2, Q = (t2) => U(t2[0]), Z = (t2, e2, s2, n2) => {
          for (const e3 of t2)
            if (s2(e3)) {
              if (n2)
                return false;
              throw Error("The set contains at least one similar element.");
            }
          return t2.add(e2), true;
        }, X = (t2, e2, [s2, n2], i2) => {
          Z(t2, [e2, s2, n2], (t3) => t3[0] === e2 && t3[1] === s2, i2);
        }, Y = (t2, [e2, s2, n2], i2) => {
          const o2 = t2.get(e2);
          o2 === void 0 ? t2.set(e2, new Set([[s2, n2]])) : Z(o2, [s2, n2], (t3) => t3[0] === s2, i2);
        }, H = (t2) => "inputs" in t2, $ = (t2, e2, s2, n2) => {
          if (H(e2)) {
            const i2 = e2.inputs[n2];
            return t2.connect(i2, s2, 0), [i2, s2, 0];
          }
          return t2.connect(e2, s2, n2), [e2, s2, n2];
        }, J = (t2, e2, s2) => {
          for (const n2 of t2)
            if (n2[0] === e2 && n2[1] === s2)
              return t2.delete(n2), n2;
          return null;
        }, K = (t2, e2) => {
          if (!k(t2).delete(e2))
            throw new Error("Missing the expected event listener.");
        }, tt = (t2, e2, s2) => {
          const n2 = b(t2, e2), i2 = T(n2, (t3) => t3[0] === s2);
          return n2.size === 0 && t2.delete(e2), i2;
        }, et = (t2, e2, s2, n2) => {
          H(e2) ? t2.disconnect(e2.inputs[n2], s2, 0) : t2.disconnect(e2, s2, n2);
        }, st = (t2) => b(h, t2), nt = (t2) => b(l, t2), it = (t2) => f.has(t2), ot = (t2) => !a.has(t2), rt = (t2) => new Promise((e2) => {
          const s2 = t2.createScriptProcessor(256, 1, 1), n2 = t2.createGain(), i2 = t2.createBuffer(1, 2, 44100), o2 = i2.getChannelData(0);
          o2[0] = 1, o2[1] = 1;
          const r2 = t2.createBufferSource();
          r2.buffer = i2, r2.loop = true, r2.connect(s2).connect(t2.destination), r2.connect(n2), r2.disconnect(n2), s2.onaudioprocess = (n3) => {
            const i3 = n3.inputBuffer.getChannelData(0);
            Array.prototype.some.call(i3, (t3) => t3 === 1) ? e2(true) : e2(false), r2.stop(), s2.onaudioprocess = null, r2.disconnect(s2), s2.disconnect(t2.destination);
          }, r2.start();
        }), at = (t2, e2) => {
          const s2 = new Map();
          for (const e3 of t2)
            for (const t3 of e3) {
              const e4 = s2.get(t3);
              s2.set(t3, e4 === void 0 ? 1 : e4 + 1);
            }
          s2.forEach((t3, s3) => e2(s3, t3));
        }, ct = (t2) => "context" in t2, ht = (t2, e2, s2, n2) => {
          const {activeInputs: i2, passiveInputs: o2} = z(e2), {outputs: r2} = L(t2), a2 = k(t2), c2 = (r3) => {
            const a3 = st(t2), c3 = nt(e2);
            if (r3) {
              const e3 = tt(o2, t2, s2);
              X(i2, t2, e3, false), n2 || it(t2) || a3.connect(c3, s2);
            } else {
              const e3 = ((t3, e4, s3) => T(t3, (t4) => t4[0] === e4 && t4[1] === s3))(i2, t2, s2);
              Y(o2, e3, false), n2 || it(t2) || a3.disconnect(c3, s2);
            }
          };
          return !!Z(r2, [e2, s2], (t3) => t3[0] === e2 && t3[1] === s2, true) && (a2.add(c2), P(t2) ? X(i2, t2, [s2, c2], true) : Y(o2, [t2, s2, c2], true), true);
        }, ut = (t2, e2, s2, n2, i2) => {
          const [o2, r2] = ((t3, e3, s3, n3) => {
            const {activeInputs: i3, passiveInputs: o3} = L(e3), r3 = J(i3[n3], t3, s3);
            if (r3 === null) {
              return [S(o3, t3, s3, n3)[2], false];
            }
            return [r3[2], true];
          })(t2, s2, n2, i2);
          if (o2 !== null && (K(t2, o2), !r2 || e2 || it(t2) || et(st(t2), st(s2), n2, i2)), P(s2)) {
            const {activeInputs: t3} = L(s2);
            O(s2, t3);
          }
        }, lt = (t2, e2, s2, n2) => {
          const [i2, o2] = ((t3, e3, s3) => {
            const {activeInputs: n3, passiveInputs: i3} = z(e3), o3 = J(n3, t3, s3);
            if (o3 === null) {
              return [tt(i3, t3, s3)[1], false];
            }
            return [o3[2], true];
          })(t2, s2, n2);
          i2 !== null && (K(t2, i2), !o2 || e2 || it(t2) || st(t2).disconnect(nt(s2), n2));
        };
        class pt {
          constructor(t2) {
            this._map = new Map(t2);
          }
          get size() {
            return this._map.size;
          }
          entries() {
            return this._map.entries();
          }
          forEach(t2, e2 = null) {
            return this._map.forEach((s2, n2) => t2.call(e2, s2, n2, this));
          }
          get(t2) {
            return this._map.get(t2);
          }
          has(t2) {
            return this._map.has(t2);
          }
          keys() {
            return this._map.keys();
          }
          values() {
            return this._map.values();
          }
        }
        const dt = {channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 1, numberOfOutputs: 1, parameterData: {}, processorOptions: {}};
        function ft(t2, e2, s2, n2, i2) {
          if (typeof t2.copyFromChannel == "function")
            e2[s2].byteLength === 0 && (e2[s2] = new Float32Array(128)), t2.copyFromChannel(e2[s2], n2, i2);
          else {
            const o2 = t2.getChannelData(n2);
            if (e2[s2].byteLength === 0)
              e2[s2] = o2.slice(i2, i2 + 128);
            else {
              const t3 = new Float32Array(o2.buffer, i2 * Float32Array.BYTES_PER_ELEMENT, 128);
              e2[s2].set(t3);
            }
          }
        }
        const _t = (t2, e2, s2, n2, i2) => {
          typeof t2.copyToChannel == "function" ? e2[s2].byteLength !== 0 && t2.copyToChannel(e2[s2], n2, i2) : e2[s2].byteLength !== 0 && t2.getChannelData(n2).set(e2[s2], i2);
        }, mt = (t2, e2) => {
          const s2 = [];
          for (let n2 = 0; n2 < t2; n2 += 1) {
            const t3 = [], i2 = typeof e2 == "number" ? e2 : e2[n2];
            for (let e3 = 0; e3 < i2; e3 += 1)
              t3.push(new Float32Array(128));
            s2.push(t3);
          }
          return s2;
        }, gt = async (t2, e2, s2, n2, i2, o2, r2) => {
          const a2 = e2 === null ? 128 * Math.ceil(t2.context.length / 128) : e2.length, c2 = n2.channelCount * n2.numberOfInputs, h2 = i2.reduce((t3, e3) => t3 + e3, 0), u2 = h2 === 0 ? null : s2.createBuffer(h2, a2, s2.sampleRate);
          if (o2 === void 0)
            throw new Error("Missing the processor constructor.");
          const l2 = L(t2), p2 = await ((t3, e3) => {
            const s3 = b(m, t3), n3 = st(e3);
            return b(s3, n3);
          })(s2, t2), d2 = mt(n2.numberOfInputs, n2.channelCount), f2 = mt(n2.numberOfOutputs, i2), _2 = Array.from(t2.parameters.keys()).reduce((t3, e3) => ({...t3, [e3]: new Float32Array(128)}), {});
          for (let h3 = 0; h3 < a2; h3 += 128) {
            if (n2.numberOfInputs > 0 && e2 !== null)
              for (let t3 = 0; t3 < n2.numberOfInputs; t3 += 1)
                for (let s3 = 0; s3 < n2.channelCount; s3 += 1)
                  ft(e2, d2[t3], s3, s3, h3);
            o2.parameterDescriptors !== void 0 && e2 !== null && o2.parameterDescriptors.forEach(({name: t3}, s3) => {
              ft(e2, _2, t3, c2 + s3, h3);
            });
            for (let t3 = 0; t3 < n2.numberOfInputs; t3 += 1)
              for (let e3 = 0; e3 < i2[t3]; e3 += 1)
                f2[t3][e3].byteLength === 0 && (f2[t3][e3] = new Float32Array(128));
            try {
              const t3 = d2.map((t4, e4) => l2.activeInputs[e4].size === 0 ? [] : t4), e3 = r2(h3 / s2.sampleRate, s2.sampleRate, () => p2.process(t3, f2, _2));
              if (u2 !== null)
                for (let t4 = 0, e4 = 0; t4 < n2.numberOfOutputs; t4 += 1) {
                  for (let s3 = 0; s3 < i2[t4]; s3 += 1)
                    _t(u2, f2[t4], s3, e4 + s3, h3);
                  e4 += i2[t4];
                }
              if (!e3)
                break;
            } catch (e3) {
              t2.dispatchEvent(new ErrorEvent("processorerror", {colno: e3.colno, filename: e3.filename, lineno: e3.lineno, message: e3.message}));
              break;
            }
          }
          return u2;
        }, vt = {Q: 1, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", detune: 0, frequency: 350, gain: 0, type: "lowpass"}, yt = {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 6}, xt = {channelCount: 6, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: 6}, wt = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", offset: 1}, bt = {buffer: null, channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", disableNormalization: false}, Tt = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", delayTime: 0, maxDelayTime: 1}, St = (t2, e2, s2) => {
          const n2 = e2[s2];
          if (n2 === void 0)
            throw t2();
          return n2;
        }, kt = {attack: 3e-3, channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", knee: 30, ratio: 12, release: 0.25, threshold: -24}, Ct = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", gain: 1}, At = () => new DOMException("", "InvalidStateError"), Dt = () => new DOMException("", "InvalidAccessError"), Ot = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers"}, Mt = (t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2) => {
          const l2 = h2.length;
          let p2 = a2;
          for (let a3 = 0; a3 < l2; a3 += 1) {
            let l3 = s2[0] * h2[a3];
            for (let e3 = 1; e3 < i2; e3 += 1) {
              const n3 = p2 - e3 & c2 - 1;
              l3 += s2[e3] * o2[n3], l3 -= t2[e3] * r2[n3];
            }
            for (let t3 = i2; t3 < n2; t3 += 1)
              l3 += s2[t3] * o2[p2 - t3 & c2 - 1];
            for (let s3 = i2; s3 < e2; s3 += 1)
              l3 -= t2[s3] * r2[p2 - s3 & c2 - 1];
            o2[p2] = h2[a3], r2[p2] = l3, p2 = p2 + 1 & c2 - 1, u2[a3] = l3;
          }
          return p2;
        }, Et = {channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers"}, Rt = (t2) => {
          const e2 = new Uint32Array([1179011410, 40, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 4, 0]);
          try {
            const s2 = t2.decodeAudioData(e2.buffer, () => {
            });
            return s2 !== void 0 && (s2.catch(() => {
            }), true);
          } catch {
          }
          return false;
        }, qt = {numberOfChannels: 1}, Ft = (t2, e2, s2) => {
          const n2 = e2[s2];
          n2 !== void 0 && n2 !== t2[s2] && (t2[s2] = n2);
        }, It = (t2, e2) => {
          Ft(t2, e2, "channelCount"), Ft(t2, e2, "channelCountMode"), Ft(t2, e2, "channelInterpretation");
        }, Vt = (t2) => typeof t2.getFloatTimeDomainData == "function", Nt = (t2, e2, s2) => {
          const n2 = e2[s2];
          n2 !== void 0 && n2 !== t2[s2].value && (t2[s2].value = n2);
        }, Pt = (t2) => {
          var e2;
          t2.start = (e2 = t2.start, (s2 = 0, n2 = 0, i2) => {
            if (typeof i2 == "number" && i2 < 0 || n2 < 0 || s2 < 0)
              throw new RangeError("The parameters can't be negative.");
            e2.call(t2, s2, n2, i2);
          });
        }, jt = (t2) => {
          var e2;
          t2.stop = (e2 = t2.stop, (s2 = 0) => {
            if (s2 < 0)
              throw new RangeError("The parameter can't be negative.");
            e2.call(t2, s2);
          });
        }, Lt = (t2, e2) => t2 === null ? 512 : Math.max(512, Math.min(16384, Math.pow(2, Math.round(Math.log2(t2 * e2))))), zt = async (t2, e2) => new t2(await ((t3) => new Promise((e3, s2) => {
          const {port1: n2, port2: i2} = new MessageChannel();
          n2.onmessage = ({data: t4}) => {
            n2.close(), i2.close(), e3(t4);
          }, n2.onmessageerror = ({data: t4}) => {
            n2.close(), i2.close(), s2(t4);
          }, i2.postMessage(t3);
        }))(e2)), Bt = (t2, e2) => {
          const s2 = t2.createBiquadFilter();
          return It(s2, e2), Nt(s2, e2, "Q"), Nt(s2, e2, "detune"), Nt(s2, e2, "frequency"), Nt(s2, e2, "gain"), Ft(s2, e2, "type"), s2;
        }, Wt = (t2, e2) => {
          const s2 = t2.createChannelSplitter(e2.numberOfOutputs);
          return It(s2, e2), ((t3) => {
            const e3 = t3.numberOfOutputs;
            Object.defineProperty(t3, "channelCount", {get: () => e3, set: (t4) => {
              if (t4 !== e3)
                throw At();
            }}), Object.defineProperty(t3, "channelCountMode", {get: () => "explicit", set: (t4) => {
              if (t4 !== "explicit")
                throw At();
            }}), Object.defineProperty(t3, "channelInterpretation", {get: () => "discrete", set: (t4) => {
              if (t4 !== "discrete")
                throw At();
            }});
          })(s2), s2;
        }, Gt = (t2, e2) => (t2.connect = e2.connect.bind(e2), t2.disconnect = e2.disconnect.bind(e2), t2), Ut = (t2, e2) => {
          const s2 = t2.createDelay(e2.maxDelayTime);
          return It(s2, e2), Nt(s2, e2, "delayTime"), s2;
        }, Qt = (t2, e2) => {
          const s2 = t2.createGain();
          return It(s2, e2), Nt(s2, e2, "gain"), s2;
        };
        function Zt(t2, e2) {
          const s2 = e2[0] * e2[0] + e2[1] * e2[1];
          return [(t2[0] * e2[0] + t2[1] * e2[1]) / s2, (t2[1] * e2[0] - t2[0] * e2[1]) / s2];
        }
        function Xt(t2, e2) {
          let s2 = [0, 0];
          for (let o2 = t2.length - 1; o2 >= 0; o2 -= 1)
            i2 = e2, s2 = [(n2 = s2)[0] * i2[0] - n2[1] * i2[1], n2[0] * i2[1] + n2[1] * i2[0]], s2[0] += t2[o2];
          var n2, i2;
          return s2;
        }
        const Yt = (t2, e2, s2, n2) => t2.createScriptProcessor(e2, s2, n2), Ht = () => new DOMException("", "NotSupportedError"), $t = {numberOfChannels: 1}, Jt = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", detune: 0, frequency: 440, periodicWave: void 0, type: "sine"}, Kt = {channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", coneInnerAngle: 360, coneOuterAngle: 360, coneOuterGain: 0, distanceModel: "inverse", maxDistance: 1e4, orientationX: 1, orientationY: 0, orientationZ: 0, panningModel: "equalpower", positionX: 0, positionY: 0, positionZ: 0, refDistance: 1, rolloffFactor: 1}, te = {disableNormalization: false}, ee = {channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers", pan: 0}, se = () => new DOMException("", "UnknownError"), ne = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", curve: null, oversample: "none"}, ie = (t2) => {
          if (t2 === null)
            return false;
          const e2 = t2.length;
          return e2 % 2 != 0 ? t2[Math.floor(e2 / 2)] !== 0 : t2[e2 / 2 - 1] + t2[e2 / 2] !== 0;
        }, oe = (t2, e2, s2, n2) => {
          let i2 = Object.getPrototypeOf(t2);
          for (; !i2.hasOwnProperty(e2); )
            i2 = Object.getPrototypeOf(i2);
          const {get: o2, set: r2} = Object.getOwnPropertyDescriptor(i2, e2);
          Object.defineProperty(t2, e2, {get: s2(o2), set: n2(r2)});
        }, re = (t2, e2, s2) => {
          try {
            t2.setValueAtTime(e2, s2);
          } catch (n2) {
            if (n2.code !== 9)
              throw n2;
            re(t2, e2, s2 + 1e-7);
          }
        }, ae = (t2) => {
          const e2 = t2.createOscillator();
          try {
            e2.start(-1);
          } catch (t3) {
            return t3 instanceof RangeError;
          }
          return false;
        }, ce = (t2) => {
          const e2 = t2.createBuffer(1, 1, 44100), s2 = t2.createBufferSource();
          s2.buffer = e2, s2.start(), s2.stop();
          try {
            return s2.stop(), true;
          } catch {
            return false;
          }
        }, he = (t2) => {
          const e2 = t2.createOscillator();
          try {
            e2.stop(-1);
          } catch (t3) {
            return t3 instanceof RangeError;
          }
          return false;
        }, ue = () => {
          try {
            new DOMException();
          } catch {
            return false;
          }
          return true;
        }, le = () => new Promise((t2) => {
          const e2 = new ArrayBuffer(0), {port1: s2, port2: n2} = new MessageChannel();
          s2.onmessage = ({data: e3}) => t2(e3 !== null), n2.postMessage(e2, [e2]);
        }), pe = (t2, e2) => {
          const s2 = e2.createGain();
          t2.connect(s2);
          const n2 = (i2 = t2.disconnect, () => {
            i2.call(t2, s2), t2.removeEventListener("ended", n2);
          });
          var i2;
          t2.addEventListener("ended", n2), Gt(t2, s2), t2.stop = ((e3) => {
            let n3 = false;
            return (i3 = 0) => {
              if (n3)
                try {
                  e3.call(t2, i3);
                } catch {
                  s2.gain.setValueAtTime(0, i3);
                }
              else
                e3.call(t2, i3), n3 = true;
            };
          })(t2.stop);
        }, de = (t2, e2) => (s2) => {
          const n2 = {value: t2};
          return Object.defineProperties(s2, {currentTarget: n2, target: n2}), typeof e2 == "function" ? e2.call(t2, s2) : e2.handleEvent.call(t2, s2);
        }, fe = (_e = Z, (t2, e2, [s2, n2, i2], o2) => {
          _e(t2[n2], [e2, s2, i2], (t3) => t3[0] === e2 && t3[1] === s2, o2);
        });
        var _e;
        const me = ((t2) => (e2, s2, [n2, i2, o2], r2) => {
          const a2 = e2.get(n2);
          a2 === void 0 ? e2.set(n2, new Set([[i2, s2, o2]])) : t2(a2, [i2, s2, o2], (t3) => t3[0] === i2 && t3[1] === s2, r2);
        })(Z), ge = ((t2) => (e2, s2, n2, i2) => t2(e2[i2], (t3) => t3[0] === s2 && t3[1] === n2))(T), ve = new WeakMap(), ye = ((t2) => (e2) => {
          var s2;
          return (s2 = t2.get(e2)) !== null && s2 !== void 0 ? s2 : 0;
        })(ve), xe = (we = new Map(), be = new WeakMap(), (t2, e2) => {
          const s2 = be.get(t2);
          if (s2 !== void 0)
            return s2;
          const n2 = we.get(t2);
          if (n2 !== void 0)
            return n2;
          try {
            const s3 = e2();
            return s3 instanceof Promise ? (we.set(t2, s3), s3.catch(() => false).then((e3) => (we.delete(t2), be.set(t2, e3), e3))) : (be.set(t2, s3), s3);
          } catch {
            return be.set(t2, false), false;
          }
        });
        var we, be;
        const Te = typeof window == "undefined" ? null : window, Se = (ke = xe, Ce = q, (t2, e2) => {
          const s2 = t2.createAnalyser();
          if (It(s2, e2), !(e2.maxDecibels > e2.minDecibels))
            throw Ce();
          return Ft(s2, e2, "fftSize"), Ft(s2, e2, "maxDecibels"), Ft(s2, e2, "minDecibels"), Ft(s2, e2, "smoothingTimeConstant"), ke(Vt, () => Vt(s2)) || ((t3) => {
            t3.getFloatTimeDomainData = (e3) => {
              const s3 = new Uint8Array(e3.length);
              t3.getByteTimeDomainData(s3);
              const n2 = Math.max(s3.length, t3.fftSize);
              for (let t4 = 0; t4 < n2; t4 += 1)
                e3[t4] = 78125e-7 * (s3[t4] - 128);
              return e3;
            };
          })(s2), s2;
        });
        var ke, Ce;
        const Ae = (De = L, (t2) => {
          const e2 = De(t2);
          if (e2.renderer === null)
            throw new Error("Missing the renderer of the given AudioNode in the audio graph.");
          return e2.renderer;
        });
        var De;
        const Oe = ((t2, e2, s2) => async (n2, i2, o2, r2) => {
          const a2 = t2(n2), c2 = [...r2, n2];
          await Promise.all(a2.activeInputs.map((t3, r3) => Array.from(t3).filter(([t4]) => !c2.includes(t4)).map(async ([t4, a3]) => {
            const h2 = e2(t4), u2 = await h2.render(t4, i2, c2), l2 = n2.context.destination;
            s2(t4) || n2 === l2 && s2(n2) || u2.connect(o2, a3, r3);
          })).reduce((t3, e3) => [...t3, ...e3], []));
        })(L, Ae, it), Me = (Ee = Se, Re = st, qe = Oe, () => {
          const t2 = new WeakMap();
          return {render(e2, s2, n2) {
            const i2 = t2.get(s2);
            return i2 !== void 0 ? Promise.resolve(i2) : (async (e3, s3, n3) => {
              let i3 = Re(e3);
              if (!E(i3, s3)) {
                const t3 = {channelCount: i3.channelCount, channelCountMode: i3.channelCountMode, channelInterpretation: i3.channelInterpretation, fftSize: i3.fftSize, maxDecibels: i3.maxDecibels, minDecibels: i3.minDecibels, smoothingTimeConstant: i3.smoothingTimeConstant};
                i3 = Ee(s3, t3);
              }
              return t2.set(s3, i3), await qe(e3, s3, i3, n3), i3;
            })(e2, s2, n2);
          }};
        });
        var Ee, Re, qe;
        const Fe = (Ie = p, (t2) => {
          const e2 = Ie.get(t2);
          if (e2 === void 0)
            throw At();
          return e2;
        });
        var Ie;
        const Ve = ((t2) => t2 === null ? null : t2.hasOwnProperty("OfflineAudioContext") ? t2.OfflineAudioContext : t2.hasOwnProperty("webkitOfflineAudioContext") ? t2.webkitOfflineAudioContext : null)(Te), Ne = (Pe = Ve, (t2) => Pe !== null && t2 instanceof Pe);
        var Pe;
        const je = new WeakMap(), Le = (ze = de, class {
          constructor(t2) {
            this._nativeEventTarget = t2, this._listeners = new WeakMap();
          }
          addEventListener(t2, e2, s2) {
            if (e2 !== null) {
              let n2 = this._listeners.get(e2);
              n2 === void 0 && (n2 = ze(this, e2), typeof e2 == "function" && this._listeners.set(e2, n2)), this._nativeEventTarget.addEventListener(t2, n2, s2);
            }
          }
          dispatchEvent(t2) {
            return this._nativeEventTarget.dispatchEvent(t2);
          }
          removeEventListener(t2, e2, s2) {
            const n2 = e2 === null ? void 0 : this._listeners.get(e2);
            this._nativeEventTarget.removeEventListener(t2, n2 === void 0 ? null : n2, s2);
          }
        });
        var ze;
        const Be = ((t2) => t2 === null ? null : t2.hasOwnProperty("AudioContext") ? t2.AudioContext : t2.hasOwnProperty("webkitAudioContext") ? t2.webkitAudioContext : null)(Te), We = (Ge = Be, (t2) => Ge !== null && t2 instanceof Ge);
        var Ge;
        const Ue = ((t2) => (e2) => t2 !== null && typeof t2.AudioNode == "function" && e2 instanceof t2.AudioNode)(Te), Qe = ((t2) => (e2) => t2 !== null && typeof t2.AudioParam == "function" && e2 instanceof t2.AudioParam)(Te), Ze = ((t2, e2, s2, n2, i2, o2, r2, a2, c2, u2, l2, p2, f2, _2, m2) => class extends u2 {
          constructor(e3, n3, i3, o3) {
            super(i3), this._context = e3, this._nativeAudioNode = i3;
            const r3 = l2(e3);
            p2(r3) && s2(rt, () => rt(r3)) !== true && ((t3) => {
              const e4 = new Map();
              var s3, n4;
              t3.connect = (s3 = t3.connect.bind(t3), (t4, n5 = 0, i4 = 0) => {
                const o4 = ct(t4) ? s3(t4, n5, i4) : s3(t4, n5), r4 = e4.get(t4);
                return r4 === void 0 ? e4.set(t4, [{input: i4, output: n5}]) : r4.every((t5) => t5.input !== i4 || t5.output !== n5) && r4.push({input: i4, output: n5}), o4;
              }), t3.disconnect = (n4 = t3.disconnect, (s4, i4, o4) => {
                if (n4.apply(t3), s4 === void 0)
                  e4.clear();
                else if (typeof s4 == "number")
                  for (const [t4, n5] of e4) {
                    const i5 = n5.filter((t5) => t5.output !== s4);
                    i5.length === 0 ? e4.delete(t4) : e4.set(t4, i5);
                  }
                else if (e4.has(s4))
                  if (i4 === void 0)
                    e4.delete(s4);
                  else {
                    const t4 = e4.get(s4);
                    if (t4 !== void 0) {
                      const n5 = t4.filter((t5) => t5.output !== i4 && (t5.input !== o4 || o4 === void 0));
                      n5.length === 0 ? e4.delete(s4) : e4.set(s4, n5);
                    }
                  }
                for (const [s5, n5] of e4)
                  n5.forEach((e5) => {
                    ct(s5) ? t3.connect(s5, e5.output, e5.input) : t3.connect(s5, e5.output);
                  });
              });
            })(i3), h.set(this, i3), d.set(this, new Set()), e3.state !== "closed" && n3 && C(this), t2(this, o3, i3);
          }
          get channelCount() {
            return this._nativeAudioNode.channelCount;
          }
          set channelCount(t3) {
            this._nativeAudioNode.channelCount = t3;
          }
          get channelCountMode() {
            return this._nativeAudioNode.channelCountMode;
          }
          set channelCountMode(t3) {
            this._nativeAudioNode.channelCountMode = t3;
          }
          get channelInterpretation() {
            return this._nativeAudioNode.channelInterpretation;
          }
          set channelInterpretation(t3) {
            this._nativeAudioNode.channelInterpretation = t3;
          }
          get context() {
            return this._context;
          }
          get numberOfInputs() {
            return this._nativeAudioNode.numberOfInputs;
          }
          get numberOfOutputs() {
            return this._nativeAudioNode.numberOfOutputs;
          }
          connect(t3, s3 = 0, a3 = 0) {
            if (s3 < 0 || s3 >= this._nativeAudioNode.numberOfOutputs)
              throw i2();
            const h2 = l2(this._context), u3 = m2(h2);
            if (f2(t3) || _2(t3))
              throw o2();
            if (U(t3)) {
              const i3 = st(t3);
              try {
                const e3 = $(this._nativeAudioNode, i3, s3, a3), n3 = ot(this);
                (u3 || n3) && this._nativeAudioNode.disconnect(...e3), this.context.state !== "closed" && !n3 && ot(t3) && C(t3);
              } catch (t4) {
                if (t4.code === 12)
                  throw o2();
                throw t4;
              }
              if (e2(this, t3, s3, a3, u3)) {
                const e3 = c2([this], t3);
                at(e3, n2(u3));
              }
              return t3;
            }
            const p3 = nt(t3);
            if (p3.name === "playbackRate")
              throw r2();
            try {
              this._nativeAudioNode.connect(p3, s3), (u3 || ot(this)) && this._nativeAudioNode.disconnect(p3, s3);
            } catch (t4) {
              if (t4.code === 12)
                throw o2();
              throw t4;
            }
            if (ht(this, t3, s3, u3)) {
              const e3 = c2([this], t3);
              at(e3, n2(u3));
            }
          }
          disconnect(t3, e3, s3) {
            let n3;
            const r3 = l2(this._context), h2 = m2(r3);
            if (t3 === void 0)
              n3 = ((t4, e4) => {
                const s4 = L(t4), n4 = [];
                for (const i3 of s4.outputs)
                  Q(i3) ? ut(t4, e4, ...i3) : lt(t4, e4, ...i3), n4.push(i3[0]);
                return s4.outputs.clear(), n4;
              })(this, h2);
            else if (typeof t3 == "number") {
              if (t3 < 0 || t3 >= this.numberOfOutputs)
                throw i2();
              n3 = ((t4, e4, s4) => {
                const n4 = L(t4), i3 = [];
                for (const o3 of n4.outputs)
                  o3[1] === s4 && (Q(o3) ? ut(t4, e4, ...o3) : lt(t4, e4, ...o3), i3.push(o3[0]), n4.outputs.delete(o3));
                return i3;
              })(this, h2, t3);
            } else {
              if (e3 !== void 0 && (e3 < 0 || e3 >= this.numberOfOutputs))
                throw i2();
              if (U(t3) && s3 !== void 0 && (s3 < 0 || s3 >= t3.numberOfInputs))
                throw i2();
              if (n3 = ((t4, e4, s4, n4, i3) => {
                const o3 = L(t4);
                return Array.from(o3.outputs).filter((t5) => !(t5[0] !== s4 || n4 !== void 0 && t5[1] !== n4 || i3 !== void 0 && t5[2] !== i3)).map((s5) => (Q(s5) ? ut(t4, e4, ...s5) : lt(t4, e4, ...s5), o3.outputs.delete(s5), s5[0]));
              })(this, h2, t3, e3, s3), n3.length === 0)
                throw o2();
            }
            for (const t4 of n3) {
              const e4 = c2([this], t4);
              at(e4, a2);
            }
          }
        })((Xe = c, (t2, e2, s2) => {
          const n2 = [];
          for (let t3 = 0; t3 < s2.numberOfInputs; t3 += 1)
            n2.push(new Set());
          Xe.set(t2, {activeInputs: n2, outputs: new Set(), passiveInputs: new WeakMap(), renderer: e2});
        }), ((t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2, l2, p2) => (d2, f2, _2, m2, g2) => {
          const {activeInputs: v2, passiveInputs: y2} = o2(f2), {outputs: x2} = o2(d2), w2 = a2(d2), b2 = (o3) => {
            const a3 = c2(f2), h3 = c2(d2);
            if (o3) {
              const e3 = S(y2, d2, _2, m2);
              t2(v2, d2, e3, false), g2 || l2(d2) || s2(h3, a3, _2, m2), p2(f2) && C(f2);
            } else {
              const t3 = n2(v2, d2, _2, m2);
              e2(y2, m2, t3, false), g2 || l2(d2) || i2(h3, a3, _2, m2);
              const s3 = r2(f2);
              s3 === 0 ? u2(f2) && O(f2, v2) : setTimeout(() => {
                u2(f2) && O(f2, v2);
              }, 1e3 * s3);
            }
          };
          return !!h2(x2, [f2, _2, m2], (t3) => t3[0] === f2 && t3[1] === _2 && t3[2] === m2, true) && (w2.add(b2), u2(d2) ? t2(v2, d2, [_2, m2, b2], true) : e2(y2, m2, [d2, _2, b2], true), true);
        })(fe, me, $, ge, et, L, ye, k, st, Z, P, it, ot), xe, ((t2, e2, s2, n2, i2, o2) => (r2) => (a2, c2) => {
          const h2 = t2.get(a2);
          if (h2 === void 0) {
            if (!r2 && o2(a2)) {
              const t3 = n2(a2), {outputs: o3} = s2(a2);
              for (const s3 of o3)
                if (Q(s3)) {
                  const i3 = n2(s3[0]);
                  e2(t3, i3, s3[1], s3[2]);
                } else {
                  const e3 = i2(s3[0]);
                  t3.disconnect(e3, s3[1]);
                }
            }
            t2.set(a2, c2);
          } else
            t2.set(a2, h2 + c2);
        })(f, et, L, st, nt, P), q, Dt, Ht, ((t2, e2, s2, n2, i2, o2, r2, a2) => (c2, h2) => {
          const u2 = e2.get(c2);
          if (u2 === void 0)
            throw new Error("Missing the expected cycle count.");
          const l2 = o2(c2.context), p2 = a2(l2);
          if (u2 === h2) {
            if (e2.delete(c2), !p2 && r2(c2)) {
              const e3 = n2(c2), {outputs: o3} = s2(c2);
              for (const s3 of o3)
                if (Q(s3)) {
                  const i3 = n2(s3[0]);
                  t2(e3, i3, s3[1], s3[2]);
                } else {
                  const t3 = i2(s3[0]);
                  e3.connect(t3, s3[1]);
                }
            }
          } else
            e2.set(c2, u2 - h2);
        })($, f, L, st, nt, Fe, P, Ne), ((t2, e2, s2) => function n2(i2, o2) {
          const r2 = U(o2) ? o2 : s2(t2, o2);
          if (((t3) => "delayTime" in t3)(r2))
            return [];
          if (i2[0] === r2)
            return [i2];
          if (i2.includes(r2))
            return [];
          const {outputs: a2} = e2(r2);
          return Array.from(a2).map((t3) => n2([...i2, r2], t3[0])).reduce((t3, e3) => t3.concat(e3), []);
        })(je, L, b), Le, Fe, We, Ue, Qe, Ne);
        var Xe;
        const Ye = ((t2, e2, s2, n2, i2, o2) => class extends t2 {
          constructor(t3, s3) {
            const r2 = i2(t3), a2 = {...M, ...s3}, c2 = n2(r2, a2);
            super(t3, false, c2, o2(r2) ? e2() : null), this._nativeAnalyserNode = c2;
          }
          get fftSize() {
            return this._nativeAnalyserNode.fftSize;
          }
          set fftSize(t3) {
            this._nativeAnalyserNode.fftSize = t3;
          }
          get frequencyBinCount() {
            return this._nativeAnalyserNode.frequencyBinCount;
          }
          get maxDecibels() {
            return this._nativeAnalyserNode.maxDecibels;
          }
          set maxDecibels(t3) {
            const e3 = this._nativeAnalyserNode.maxDecibels;
            if (this._nativeAnalyserNode.maxDecibels = t3, !(t3 > this._nativeAnalyserNode.minDecibels))
              throw this._nativeAnalyserNode.maxDecibels = e3, s2();
          }
          get minDecibels() {
            return this._nativeAnalyserNode.minDecibels;
          }
          set minDecibels(t3) {
            const e3 = this._nativeAnalyserNode.minDecibels;
            if (this._nativeAnalyserNode.minDecibels = t3, !(this._nativeAnalyserNode.maxDecibels > t3))
              throw this._nativeAnalyserNode.minDecibels = e3, s2();
          }
          get smoothingTimeConstant() {
            return this._nativeAnalyserNode.smoothingTimeConstant;
          }
          set smoothingTimeConstant(t3) {
            this._nativeAnalyserNode.smoothingTimeConstant = t3;
          }
          getByteFrequencyData(t3) {
            this._nativeAnalyserNode.getByteFrequencyData(t3);
          }
          getByteTimeDomainData(t3) {
            this._nativeAnalyserNode.getByteTimeDomainData(t3);
          }
          getFloatFrequencyData(t3) {
            this._nativeAnalyserNode.getFloatFrequencyData(t3);
          }
          getFloatTimeDomainData(t3) {
            this._nativeAnalyserNode.getFloatTimeDomainData(t3);
          }
        })(Ze, Me, q, Se, Fe, Ne), He = new WeakSet(), $e = ((t2) => t2 === null ? null : t2.hasOwnProperty("AudioBuffer") ? t2.AudioBuffer : null)(Te), Je = (Ke = new Uint32Array(1), (t2) => (Ke[0] = t2, Ke[0]));
        var Ke;
        const ts = ((t2, e2) => (s2) => {
          s2.copyFromChannel = (n2, i2, o2 = 0) => {
            const r2 = t2(o2), a2 = t2(i2);
            if (a2 >= s2.numberOfChannels)
              throw e2();
            const c2 = s2.length, h2 = s2.getChannelData(a2), u2 = n2.length;
            for (let t3 = r2 < 0 ? -r2 : 0; t3 + r2 < c2 && t3 < u2; t3 += 1)
              n2[t3] = h2[t3 + r2];
          }, s2.copyToChannel = (n2, i2, o2 = 0) => {
            const r2 = t2(o2), a2 = t2(i2);
            if (a2 >= s2.numberOfChannels)
              throw e2();
            const c2 = s2.length, h2 = s2.getChannelData(a2), u2 = n2.length;
            for (let t3 = r2 < 0 ? -r2 : 0; t3 + r2 < c2 && t3 < u2; t3 += 1)
              h2[t3 + r2] = n2[t3];
          };
        })(Je, q), es = ((t2) => (e2) => {
          e2.copyFromChannel = ((s2) => (n2, i2, o2 = 0) => {
            const r2 = t2(o2), a2 = t2(i2);
            if (r2 < e2.length)
              return s2.call(e2, n2, a2, r2);
          })(e2.copyFromChannel), e2.copyToChannel = ((s2) => (n2, i2, o2 = 0) => {
            const r2 = t2(o2), a2 = t2(i2);
            if (r2 < e2.length)
              return s2.call(e2, n2, a2, r2);
          })(e2.copyToChannel);
        })(Je), ss = ((t2, e2, s2, n2, i2, o2, r2, a2) => {
          let c2 = null;
          return class h2 {
            constructor(h3) {
              if (i2 === null)
                throw new Error("Missing the native OfflineAudioContext constructor.");
              const {length: u2, numberOfChannels: l2, sampleRate: p2} = {...I, ...h3};
              c2 === null && (c2 = new i2(1, 1, 44100));
              const d2 = n2 !== null && e2(o2, o2) ? new n2({length: u2, numberOfChannels: l2, sampleRate: p2}) : c2.createBuffer(l2, u2, p2);
              if (d2.numberOfChannels === 0)
                throw s2();
              return typeof d2.copyFromChannel != "function" ? (r2(d2), F(d2)) : e2(R, () => R(d2)) || a2(d2), t2.add(d2), d2;
            }
            static [Symbol.hasInstance](e3) {
              return e3 !== null && typeof e3 == "object" && Object.getPrototypeOf(e3) === h2.prototype || t2.has(e3);
            }
          };
        })(He, xe, Ht, $e, Ve, (ns = $e, () => {
          if (ns === null)
            return false;
          try {
            new ns({length: 1, sampleRate: 44100});
          } catch {
            return false;
          }
          return true;
        }), ts, es);
        var ns;
        const is = (os = Qt, (t2, e2) => {
          const s2 = os(t2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0});
          e2.connect(s2).connect(t2.destination);
          const n2 = () => {
            e2.removeEventListener("ended", n2), e2.disconnect(s2), s2.disconnect();
          };
          e2.addEventListener("ended", n2);
        });
        var os;
        const rs = ((t2, e2, s2) => async (n2, i2, o2, r2) => {
          const a2 = e2(n2);
          await Promise.all(Array.from(a2.activeInputs).map(async ([e3, n3]) => {
            const a3 = t2(e3), c2 = await a3.render(e3, i2, r2);
            s2(e3) || c2.connect(o2, n3);
          }));
        })(Ae, z, it), as = ((t2) => (e2, s2, n2, i2) => t2(s2, e2, n2, i2))(rs), cs = ((t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2) => (l2, p2) => {
          const d2 = l2.createBufferSource();
          return It(d2, p2), Nt(d2, p2, "playbackRate"), Ft(d2, p2, "buffer"), Ft(d2, p2, "loop"), Ft(d2, p2, "loopEnd"), Ft(d2, p2, "loopStart"), e2(s2, () => s2(l2)) || ((t3) => {
            t3.start = ((e3) => {
              let s3 = false;
              return (n3 = 0, i3 = 0, o3) => {
                if (s3)
                  throw At();
                e3.call(t3, n3, i3, o3), s3 = true;
              };
            })(t3.start);
          })(d2), e2(n2, () => n2(l2)) || c2(d2), e2(i2, () => i2(l2)) || h2(d2, l2), e2(o2, () => o2(l2)) || Pt(d2), e2(r2, () => r2(l2)) || u2(d2, l2), e2(a2, () => a2(l2)) || jt(d2), t2(l2, d2), d2;
        })(is, xe, (t2) => {
          const e2 = t2.createBufferSource();
          e2.start();
          try {
            e2.start();
          } catch {
            return true;
          }
          return false;
        }, (t2) => {
          const e2 = t2.createBufferSource(), s2 = t2.createBuffer(1, 1, 44100);
          e2.buffer = s2;
          try {
            e2.start(0, 1);
          } catch {
            return false;
          }
          return true;
        }, (t2) => {
          const e2 = t2.createBufferSource();
          e2.start();
          try {
            e2.stop();
          } catch {
            return false;
          }
          return true;
        }, ae, ce, he, (t2) => {
          var e2;
          t2.start = (e2 = t2.start, (s2 = 0, n2 = 0, i2) => {
            const o2 = t2.buffer, r2 = o2 === null ? n2 : Math.min(o2.duration, n2);
            o2 !== null && r2 > o2.duration - 0.5 / t2.context.sampleRate ? e2.call(t2, s2, 0, 0) : e2.call(t2, s2, r2, i2);
          });
        }, (hs = oe, (t2, e2) => {
          const s2 = e2.createBuffer(1, 1, 44100);
          t2.buffer === null && (t2.buffer = s2), hs(t2, "buffer", (e3) => () => {
            const n2 = e3.call(t2);
            return n2 === s2 ? null : n2;
          }, (e3) => (n2) => e3.call(t2, n2 === null ? s2 : n2));
        }), pe);
        var hs;
        const us = ((t2, e2) => (s2, n2, i2, o2) => (t2(n2).replay(i2), e2(n2, s2, i2, o2)))(((t2) => (e2) => {
          const s2 = t2(e2);
          if (s2.renderer === null)
            throw new Error("Missing the renderer of the given AudioParam in the audio graph.");
          return s2.renderer;
        })(z), rs), ls = ((t2, e2, s2, n2, i2) => () => {
          const o2 = new WeakMap();
          let r2 = null, a2 = null;
          return {set start(t3) {
            r2 = t3;
          }, set stop(t3) {
            a2 = t3;
          }, render(c2, h2, u2) {
            const l2 = o2.get(h2);
            return l2 !== void 0 ? Promise.resolve(l2) : (async (c3, h3, u3) => {
              let l3 = s2(c3);
              const p2 = E(l3, h3);
              if (!p2) {
                const t3 = {buffer: l3.buffer, channelCount: l3.channelCount, channelCountMode: l3.channelCountMode, channelInterpretation: l3.channelInterpretation, loop: l3.loop, loopEnd: l3.loopEnd, loopStart: l3.loopStart, playbackRate: l3.playbackRate.value};
                l3 = e2(h3, t3), r2 !== null && l3.start(...r2), a2 !== null && l3.stop(a2);
              }
              return o2.set(h3, l3), p2 ? await t2(h3, c3.playbackRate, l3.playbackRate, u3) : await n2(h3, c3.playbackRate, l3.playbackRate, u3), await i2(c3, h3, l3, u3), l3;
            })(c2, h2, u2);
          }};
        })(as, cs, st, us, Oe), ps = ((t2, e2, s2, n2, i2, o2, a2, c2, h2, u2, l2, p2, d2) => (f2, _2, m2, g2 = null, v2 = null) => {
          const y2 = new r.AutomationEventList(m2.defaultValue), x2 = _2 ? n2(y2) : null, w2 = {get defaultValue() {
            return m2.defaultValue;
          }, get maxValue() {
            return g2 === null ? m2.maxValue : g2;
          }, get minValue() {
            return v2 === null ? m2.minValue : v2;
          }, get value() {
            return m2.value;
          }, set value(t3) {
            m2.value = t3, w2.setValueAtTime(t3, f2.context.currentTime);
          }, cancelAndHoldAtTime(t3) {
            if (typeof m2.cancelAndHoldAtTime == "function")
              x2 === null && y2.flush(f2.context.currentTime), y2.add(i2(t3)), m2.cancelAndHoldAtTime(t3);
            else {
              const e3 = Array.from(y2).pop();
              x2 === null && y2.flush(f2.context.currentTime), y2.add(i2(t3));
              const s3 = Array.from(y2).pop();
              m2.cancelScheduledValues(t3), e3 !== s3 && s3 !== void 0 && (s3.type === "exponentialRampToValue" ? m2.exponentialRampToValueAtTime(s3.value, s3.endTime) : s3.type === "linearRampToValue" ? m2.linearRampToValueAtTime(s3.value, s3.endTime) : s3.type === "setValue" ? m2.setValueAtTime(s3.value, s3.startTime) : s3.type === "setValueCurve" && m2.setValueCurveAtTime(s3.values, s3.startTime, s3.duration));
            }
            return w2;
          }, cancelScheduledValues: (t3) => (x2 === null && y2.flush(f2.context.currentTime), y2.add(o2(t3)), m2.cancelScheduledValues(t3), w2), exponentialRampToValueAtTime(t3, e3) {
            if (t3 === 0)
              throw new RangeError();
            if (!Number.isFinite(e3) || e3 < 0)
              throw new RangeError();
            return x2 === null && y2.flush(f2.context.currentTime), y2.add(a2(t3, e3)), m2.exponentialRampToValueAtTime(t3, e3), w2;
          }, linearRampToValueAtTime: (t3, e3) => (x2 === null && y2.flush(f2.context.currentTime), y2.add(c2(t3, e3)), m2.linearRampToValueAtTime(t3, e3), w2), setTargetAtTime: (t3, e3, s3) => (x2 === null && y2.flush(f2.context.currentTime), y2.add(h2(t3, e3, s3)), m2.setTargetAtTime(t3, e3, s3), w2), setValueAtTime: (t3, e3) => (x2 === null && y2.flush(f2.context.currentTime), y2.add(u2(t3, e3)), m2.setValueAtTime(t3, e3), w2), setValueCurveAtTime(t3, e3, s3) {
            const n3 = t3 instanceof Float32Array ? t3 : new Float32Array(t3);
            if (p2 !== null && p2.name === "webkitAudioContext") {
              const t4 = e3 + s3, i3 = f2.context.sampleRate, o3 = Math.ceil(e3 * i3), r2 = Math.floor(t4 * i3), a3 = r2 - o3, c3 = new Float32Array(a3);
              for (let t5 = 0; t5 < a3; t5 += 1) {
                const r3 = (n3.length - 1) / s3 * ((o3 + t5) / i3 - e3), a4 = Math.floor(r3), h4 = Math.ceil(r3);
                c3[t5] = a4 === h4 ? n3[a4] : (1 - (r3 - a4)) * n3[a4] + (1 - (h4 - r3)) * n3[h4];
              }
              x2 === null && y2.flush(f2.context.currentTime), y2.add(l2(c3, e3, s3)), m2.setValueCurveAtTime(c3, e3, s3);
              const h3 = r2 / i3;
              h3 < t4 && d2(w2, c3[c3.length - 1], h3), d2(w2, n3[n3.length - 1], t4);
            } else
              x2 === null && y2.flush(f2.context.currentTime), y2.add(l2(n3, e3, s3)), m2.setValueCurveAtTime(n3, e3, s3);
            return w2;
          }};
          return s2.set(w2, m2), e2.set(w2, f2), t2(w2, x2), w2;
        })((ds = u, (t2, e2) => {
          ds.set(t2, {activeInputs: new Set(), passiveInputs: new WeakMap(), renderer: e2});
        }), je, l, (t2) => ({replay(e2) {
          for (const s2 of t2)
            if (s2.type === "exponentialRampToValue") {
              const {endTime: t3, value: n2} = s2;
              e2.exponentialRampToValueAtTime(n2, t3);
            } else if (s2.type === "linearRampToValue") {
              const {endTime: t3, value: n2} = s2;
              e2.linearRampToValueAtTime(n2, t3);
            } else if (s2.type === "setTarget") {
              const {startTime: t3, target: n2, timeConstant: i2} = s2;
              e2.setTargetAtTime(n2, t3, i2);
            } else if (s2.type === "setValue") {
              const {startTime: t3, value: n2} = s2;
              e2.setValueAtTime(n2, t3);
            } else {
              if (s2.type !== "setValueCurve")
                throw new Error("Can't apply an unknown automation.");
              {
                const {duration: t3, startTime: n2, values: i2} = s2;
                e2.setValueCurveAtTime(i2, n2, t3);
              }
            }
        }}), r.createCancelAndHoldAutomationEvent, r.createCancelScheduledValuesAutomationEvent, r.createExponentialRampToValueAutomationEvent, r.createLinearRampToValueAutomationEvent, r.createSetTargetAutomationEvent, r.createSetValueAutomationEvent, r.createSetValueCurveAutomationEvent, Be, re);
        var ds;
        const fs = ((t2, e2, s2, n2, i2, o2, r2, a2) => class extends t2 {
          constructor(t3, n3) {
            const a3 = o2(t3), c2 = {...j, ...n3}, h2 = i2(a3, c2), u2 = r2(a3), l2 = u2 ? e2() : null;
            super(t3, false, h2, l2), this._audioBufferSourceNodeRenderer = l2, this._isBufferNullified = false, this._isBufferSet = c2.buffer !== null, this._nativeAudioBufferSourceNode = h2, this._onended = null, this._playbackRate = s2(this, u2, h2.playbackRate, N, V);
          }
          get buffer() {
            return this._isBufferNullified ? null : this._nativeAudioBufferSourceNode.buffer;
          }
          set buffer(t3) {
            if (this._nativeAudioBufferSourceNode.buffer = t3, t3 !== null) {
              if (this._isBufferSet)
                throw n2();
              this._isBufferSet = true;
            }
          }
          get loop() {
            return this._nativeAudioBufferSourceNode.loop;
          }
          set loop(t3) {
            this._nativeAudioBufferSourceNode.loop = t3;
          }
          get loopEnd() {
            return this._nativeAudioBufferSourceNode.loopEnd;
          }
          set loopEnd(t3) {
            this._nativeAudioBufferSourceNode.loopEnd = t3;
          }
          get loopStart() {
            return this._nativeAudioBufferSourceNode.loopStart;
          }
          set loopStart(t3) {
            this._nativeAudioBufferSourceNode.loopStart = t3;
          }
          get onended() {
            return this._onended;
          }
          set onended(t3) {
            const e3 = typeof t3 == "function" ? a2(this, t3) : null;
            this._nativeAudioBufferSourceNode.onended = e3;
            const s3 = this._nativeAudioBufferSourceNode.onended;
            this._onended = s3 !== null && s3 === e3 ? t3 : s3;
          }
          get playbackRate() {
            return this._playbackRate;
          }
          start(t3 = 0, e3 = 0, s3) {
            if (this._nativeAudioBufferSourceNode.start(t3, e3, s3), this._audioBufferSourceNodeRenderer !== null && (this._audioBufferSourceNodeRenderer.start = s3 === void 0 ? [t3, e3] : [t3, e3, s3]), this.context.state !== "closed") {
              C(this);
              const t4 = () => {
                this._nativeAudioBufferSourceNode.removeEventListener("ended", t4), P(this) && D(this);
              };
              this._nativeAudioBufferSourceNode.addEventListener("ended", t4);
            }
          }
          stop(t3 = 0) {
            this._nativeAudioBufferSourceNode.stop(t3), this._audioBufferSourceNodeRenderer !== null && (this._audioBufferSourceNodeRenderer.stop = t3);
          }
        })(Ze, ls, ps, At, cs, Fe, Ne, de), _s = ((t2, e2, s2, n2, i2, o2, r2, a2) => class extends t2 {
          constructor(t3, s3) {
            const n3 = o2(t3), c2 = r2(n3), h2 = i2(n3, s3, c2);
            super(t3, false, h2, c2 ? e2(a2) : null), this._isNodeOfNativeOfflineAudioContext = c2, this._nativeAudioDestinationNode = h2;
          }
          get channelCount() {
            return this._nativeAudioDestinationNode.channelCount;
          }
          set channelCount(t3) {
            if (this._isNodeOfNativeOfflineAudioContext)
              throw n2();
            if (t3 > this._nativeAudioDestinationNode.maxChannelCount)
              throw s2();
            this._nativeAudioDestinationNode.channelCount = t3;
          }
          get channelCountMode() {
            return this._nativeAudioDestinationNode.channelCountMode;
          }
          set channelCountMode(t3) {
            if (this._isNodeOfNativeOfflineAudioContext)
              throw n2();
            this._nativeAudioDestinationNode.channelCountMode = t3;
          }
          get maxChannelCount() {
            return this._nativeAudioDestinationNode.maxChannelCount;
          }
        })(Ze, (t2) => {
          let e2 = null;
          return {render: (s2, n2, i2) => (e2 === null && (e2 = (async (e3, s3, n3) => {
            const i3 = s3.destination;
            return await t2(e3, s3, i3, n3), i3;
          })(s2, n2, i2)), e2)};
        }, q, At, ((t2, e2) => (s2, n2, i2) => {
          const o2 = s2.destination;
          if (o2.channelCount !== n2)
            try {
              o2.channelCount = n2;
            } catch {
            }
          i2 && o2.channelCountMode !== "explicit" && (o2.channelCountMode = "explicit"), o2.maxChannelCount === 0 && Object.defineProperty(o2, "maxChannelCount", {value: n2});
          const r2 = t2(s2, {channelCount: n2, channelCountMode: o2.channelCountMode, channelInterpretation: o2.channelInterpretation, gain: 1});
          return e2(r2, "channelCount", (t3) => () => t3.call(r2), (t3) => (e3) => {
            t3.call(r2, e3);
            try {
              o2.channelCount = e3;
            } catch (t4) {
              if (e3 > o2.maxChannelCount)
                throw t4;
            }
          }), e2(r2, "channelCountMode", (t3) => () => t3.call(r2), (t3) => (e3) => {
            t3.call(r2, e3), o2.channelCountMode = e3;
          }), e2(r2, "channelInterpretation", (t3) => () => t3.call(r2), (t3) => (e3) => {
            t3.call(r2, e3), o2.channelInterpretation = e3;
          }), Object.defineProperty(r2, "maxChannelCount", {get: () => o2.maxChannelCount}), r2.connect(o2), r2;
        })(Qt, oe), Fe, Ne, Oe), ms = ((t2, e2, s2, n2, i2) => () => {
          const o2 = new WeakMap();
          return {render(r2, a2, c2) {
            const h2 = o2.get(a2);
            return h2 !== void 0 ? Promise.resolve(h2) : (async (r3, a3, c3) => {
              let h3 = s2(r3);
              const u2 = E(h3, a3);
              if (!u2) {
                const t3 = {Q: h3.Q.value, channelCount: h3.channelCount, channelCountMode: h3.channelCountMode, channelInterpretation: h3.channelInterpretation, detune: h3.detune.value, frequency: h3.frequency.value, gain: h3.gain.value, type: h3.type};
                h3 = e2(a3, t3);
              }
              return o2.set(a3, h3), u2 ? (await t2(a3, r3.Q, h3.Q, c3), await t2(a3, r3.detune, h3.detune, c3), await t2(a3, r3.frequency, h3.frequency, c3), await t2(a3, r3.gain, h3.gain, c3)) : (await n2(a3, r3.Q, h3.Q, c3), await n2(a3, r3.detune, h3.detune, c3), await n2(a3, r3.frequency, h3.frequency, c3), await n2(a3, r3.gain, h3.gain, c3)), await i2(r3, a3, h3, c3), h3;
            })(r2, a2, c2);
          }};
        })(as, Bt, st, us, Oe), gs = ((t2) => (e2, s2) => t2.set(e2, s2))(ve), vs = (ys = Ze, xs = ps, ws = ms, bs = Dt, Ts = Bt, Ss = Fe, ks = Ne, Cs = gs, class extends ys {
          constructor(t2, e2) {
            const s2 = Ss(t2), n2 = {...vt, ...e2}, i2 = Ts(s2, n2), o2 = ks(s2);
            super(t2, false, i2, o2 ? ws() : null), this._Q = xs(this, o2, i2.Q, N, V), this._detune = xs(this, o2, i2.detune, 1200 * Math.log2(N), -1200 * Math.log2(N)), this._frequency = xs(this, o2, i2.frequency, t2.sampleRate / 2, 0), this._gain = xs(this, o2, i2.gain, 40 * Math.log10(N), V), this._nativeBiquadFilterNode = i2, Cs(this, 1);
          }
          get detune() {
            return this._detune;
          }
          get frequency() {
            return this._frequency;
          }
          get gain() {
            return this._gain;
          }
          get Q() {
            return this._Q;
          }
          get type() {
            return this._nativeBiquadFilterNode.type;
          }
          set type(t2) {
            this._nativeBiquadFilterNode.type = t2;
          }
          getFrequencyResponse(t2, e2, s2) {
            try {
              this._nativeBiquadFilterNode.getFrequencyResponse(t2, e2, s2);
            } catch (t3) {
              if (t3.code === 11)
                throw bs();
              throw t3;
            }
            if (t2.length !== e2.length || e2.length !== s2.length)
              throw bs();
          }
        });
        var ys, xs, ws, bs, Ts, Ss, ks, Cs;
        const As = ((t2, e2) => (s2, n2, i2) => {
          const o2 = new Set();
          var r2, a2;
          return s2.connect = (r2 = s2.connect, (i3, a3 = 0, c2 = 0) => {
            const h2 = o2.size === 0;
            if (e2(i3))
              return r2.call(s2, i3, a3, c2), t2(o2, [i3, a3, c2], (t3) => t3[0] === i3 && t3[1] === a3 && t3[2] === c2, true), h2 && n2(), i3;
            r2.call(s2, i3, a3), t2(o2, [i3, a3], (t3) => t3[0] === i3 && t3[1] === a3, true), h2 && n2();
          }), s2.disconnect = (a2 = s2.disconnect, (t3, n3, r3) => {
            const c2 = o2.size > 0;
            if (t3 === void 0)
              a2.apply(s2), o2.clear();
            else if (typeof t3 == "number") {
              a2.call(s2, t3);
              for (const e3 of o2)
                e3[1] === t3 && o2.delete(e3);
            } else {
              e2(t3) ? a2.call(s2, t3, n3, r3) : a2.call(s2, t3, n3);
              for (const e3 of o2)
                e3[0] !== t3 || n3 !== void 0 && e3[1] !== n3 || r3 !== void 0 && e3[2] !== r3 || o2.delete(e3);
            }
            const h2 = o2.size === 0;
            c2 && h2 && i2();
          }), s2;
        })(Z, Ue), Ds = (Os = At, Ms = As, (t2, e2) => {
          e2.channelCount = 1, e2.channelCountMode = "explicit", Object.defineProperty(e2, "channelCount", {get: () => 1, set: () => {
            throw Os();
          }}), Object.defineProperty(e2, "channelCountMode", {get: () => "explicit", set: () => {
            throw Os();
          }});
          const s2 = t2.createBufferSource();
          Ms(e2, () => {
            const t3 = e2.numberOfInputs;
            for (let n2 = 0; n2 < t3; n2 += 1)
              s2.connect(e2, 0, n2);
          }, () => s2.disconnect(e2));
        });
        var Os, Ms;
        const Es = ((t2, e2) => (s2, n2) => {
          const i2 = s2.createChannelMerger(n2.numberOfInputs);
          return t2 !== null && t2.name === "webkitAudioContext" && e2(s2, i2), It(i2, n2), i2;
        })(Be, Ds), Rs = ((t2, e2, s2, n2, i2) => class extends t2 {
          constructor(t3, o2) {
            const r2 = n2(t3), a2 = {...yt, ...o2};
            super(t3, false, s2(r2, a2), i2(r2) ? e2() : null);
          }
        })(Ze, ((t2, e2, s2) => () => {
          const n2 = new WeakMap();
          return {render(i2, o2, r2) {
            const a2 = n2.get(o2);
            return a2 !== void 0 ? Promise.resolve(a2) : (async (i3, o3, r3) => {
              let a3 = e2(i3);
              if (!E(a3, o3)) {
                const e3 = {channelCount: a3.channelCount, channelCountMode: a3.channelCountMode, channelInterpretation: a3.channelInterpretation, numberOfInputs: a3.numberOfInputs};
                a3 = t2(o3, e3);
              }
              return n2.set(o3, a3), await s2(i3, o3, a3, r3), a3;
            })(i2, o2, r2);
          }};
        })(Es, st, Oe), Es, Fe, Ne), qs = ((t2, e2, s2, n2, i2, o2) => class extends t2 {
          constructor(t3, r2) {
            const a2 = n2(t3), c2 = o2({...xt, ...r2});
            super(t3, false, s2(a2, c2), i2(a2) ? e2() : null);
          }
        })(Ze, ((t2, e2, s2) => () => {
          const n2 = new WeakMap();
          return {render(i2, o2, r2) {
            const a2 = n2.get(o2);
            return a2 !== void 0 ? Promise.resolve(a2) : (async (i3, o3, r3) => {
              let a3 = e2(i3);
              if (!E(a3, o3)) {
                const e3 = {channelCount: a3.channelCount, channelCountMode: a3.channelCountMode, channelInterpretation: a3.channelInterpretation, numberOfOutputs: a3.numberOfOutputs};
                a3 = t2(o3, e3);
              }
              return n2.set(o3, a3), await s2(i3, o3, a3, r3), a3;
            })(i2, o2, r2);
          }};
        })(Wt, st, Oe), Wt, Fe, Ne, (t2) => ({...t2, channelCount: t2.numberOfOutputs})), Fs = ((t2, e2, s2, n2) => (i2, {offset: o2, ...r2}) => {
          const a2 = i2.createBuffer(1, 2, 44100), c2 = e2(i2, {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}), h2 = s2(i2, {...r2, gain: o2}), u2 = a2.getChannelData(0);
          u2[0] = 1, u2[1] = 1, c2.buffer = a2, c2.loop = true;
          const l2 = {get bufferSize() {
          }, get channelCount() {
            return h2.channelCount;
          }, set channelCount(t3) {
            h2.channelCount = t3;
          }, get channelCountMode() {
            return h2.channelCountMode;
          }, set channelCountMode(t3) {
            h2.channelCountMode = t3;
          }, get channelInterpretation() {
            return h2.channelInterpretation;
          }, set channelInterpretation(t3) {
            h2.channelInterpretation = t3;
          }, get context() {
            return h2.context;
          }, get inputs() {
            return [];
          }, get numberOfInputs() {
            return c2.numberOfInputs;
          }, get numberOfOutputs() {
            return h2.numberOfOutputs;
          }, get offset() {
            return h2.gain;
          }, get onended() {
            return c2.onended;
          }, set onended(t3) {
            c2.onended = t3;
          }, addEventListener: (...t3) => c2.addEventListener(t3[0], t3[1], t3[2]), dispatchEvent: (...t3) => c2.dispatchEvent(t3[0]), removeEventListener: (...t3) => c2.removeEventListener(t3[0], t3[1], t3[2]), start(t3 = 0) {
            c2.start.call(c2, t3);
          }, stop(t3 = 0) {
            c2.stop.call(c2, t3);
          }};
          return t2(i2, c2), n2(Gt(l2, h2), () => c2.connect(h2), () => c2.disconnect(h2));
        })(is, cs, Qt, As), Is = ((t2, e2, s2, n2, i2) => (o2, r2) => {
          if (o2.createConstantSource === void 0)
            return s2(o2, r2);
          const a2 = o2.createConstantSource();
          return It(a2, r2), Nt(a2, r2, "offset"), e2(n2, () => n2(o2)) || Pt(a2), e2(i2, () => i2(o2)) || jt(a2), t2(o2, a2), a2;
        })(is, xe, Fs, ae, he), Vs = ((t2, e2, s2, n2, i2, o2, r2) => class extends t2 {
          constructor(t3, r3) {
            const a2 = i2(t3), c2 = {...wt, ...r3}, h2 = n2(a2, c2), u2 = o2(a2), l2 = u2 ? s2() : null;
            super(t3, false, h2, l2), this._constantSourceNodeRenderer = l2, this._nativeConstantSourceNode = h2, this._offset = e2(this, u2, h2.offset, N, V), this._onended = null;
          }
          get offset() {
            return this._offset;
          }
          get onended() {
            return this._onended;
          }
          set onended(t3) {
            const e3 = typeof t3 == "function" ? r2(this, t3) : null;
            this._nativeConstantSourceNode.onended = e3;
            const s3 = this._nativeConstantSourceNode.onended;
            this._onended = s3 !== null && s3 === e3 ? t3 : s3;
          }
          start(t3 = 0) {
            if (this._nativeConstantSourceNode.start(t3), this._constantSourceNodeRenderer !== null && (this._constantSourceNodeRenderer.start = t3), this.context.state !== "closed") {
              C(this);
              const t4 = () => {
                this._nativeConstantSourceNode.removeEventListener("ended", t4), P(this) && D(this);
              };
              this._nativeConstantSourceNode.addEventListener("ended", t4);
            }
          }
          stop(t3 = 0) {
            this._nativeConstantSourceNode.stop(t3), this._constantSourceNodeRenderer !== null && (this._constantSourceNodeRenderer.stop = t3);
          }
        })(Ze, ps, ((t2, e2, s2, n2, i2) => () => {
          const o2 = new WeakMap();
          let r2 = null, a2 = null;
          return {set start(t3) {
            r2 = t3;
          }, set stop(t3) {
            a2 = t3;
          }, render(c2, h2, u2) {
            const l2 = o2.get(h2);
            return l2 !== void 0 ? Promise.resolve(l2) : (async (c3, h3, u3) => {
              let l3 = s2(c3);
              const p2 = E(l3, h3);
              if (!p2) {
                const t3 = {channelCount: l3.channelCount, channelCountMode: l3.channelCountMode, channelInterpretation: l3.channelInterpretation, offset: l3.offset.value};
                l3 = e2(h3, t3), r2 !== null && l3.start(r2), a2 !== null && l3.stop(a2);
              }
              return o2.set(h3, l3), p2 ? await t2(h3, c3.offset, l3.offset, u3) : await n2(h3, c3.offset, l3.offset, u3), await i2(c3, h3, l3, u3), l3;
            })(c2, h2, u2);
          }};
        })(as, Is, st, us, Oe), Is, Fe, Ne, de), Ns = ((t2, e2) => (s2, n2) => {
          const i2 = s2.createConvolver();
          if (It(i2, n2), n2.disableNormalization === i2.normalize && (i2.normalize = !n2.disableNormalization), Ft(i2, n2, "buffer"), n2.channelCount > 2)
            throw t2();
          if (e2(i2, "channelCount", (t3) => () => t3.call(i2), (e3) => (s3) => {
            if (s3 > 2)
              throw t2();
            return e3.call(i2, s3);
          }), n2.channelCountMode === "max")
            throw t2();
          return e2(i2, "channelCountMode", (t3) => () => t3.call(i2), (e3) => (s3) => {
            if (s3 === "max")
              throw t2();
            return e3.call(i2, s3);
          }), i2;
        })(Ht, oe), Ps = ((t2, e2, s2, n2, i2, o2) => class extends t2 {
          constructor(t3, r2) {
            const a2 = n2(t3), c2 = {...bt, ...r2}, h2 = s2(a2, c2);
            super(t3, false, h2, i2(a2) ? e2() : null), this._isBufferNullified = false, this._nativeConvolverNode = h2, c2.buffer !== null && o2(this, c2.buffer.duration);
          }
          get buffer() {
            return this._isBufferNullified ? null : this._nativeConvolverNode.buffer;
          }
          set buffer(t3) {
            if (this._nativeConvolverNode.buffer = t3, t3 === null && this._nativeConvolverNode.buffer !== null) {
              const t4 = this._nativeConvolverNode.context;
              this._nativeConvolverNode.buffer = t4.createBuffer(1, 1, 44100), this._isBufferNullified = true, o2(this, 0);
            } else
              this._isBufferNullified = false, o2(this, this._nativeConvolverNode.buffer === null ? 0 : this._nativeConvolverNode.buffer.duration);
          }
          get normalize() {
            return this._nativeConvolverNode.normalize;
          }
          set normalize(t3) {
            this._nativeConvolverNode.normalize = t3;
          }
        })(Ze, ((t2, e2, s2) => () => {
          const n2 = new WeakMap();
          return {render(i2, o2, r2) {
            const a2 = n2.get(o2);
            return a2 !== void 0 ? Promise.resolve(a2) : (async (i3, o3, r3) => {
              let a3 = e2(i3);
              if (!E(a3, o3)) {
                const e3 = {buffer: a3.buffer, channelCount: a3.channelCount, channelCountMode: a3.channelCountMode, channelInterpretation: a3.channelInterpretation, disableNormalization: !a3.normalize};
                a3 = t2(o3, e3);
              }
              return n2.set(o3, a3), H(a3) ? await s2(i3, o3, a3.inputs[0], r3) : await s2(i3, o3, a3, r3), a3;
            })(i2, o2, r2);
          }};
        })(Ns, st, Oe), Ns, Fe, Ne, gs), js = ((t2, e2, s2, n2, i2, o2, r2) => class extends t2 {
          constructor(t3, a2) {
            const c2 = i2(t3), h2 = {...Tt, ...a2}, u2 = n2(c2, h2), l2 = o2(c2);
            super(t3, false, u2, l2 ? s2(h2.maxDelayTime) : null), this._delayTime = e2(this, l2, u2.delayTime), r2(this, h2.maxDelayTime);
          }
          get delayTime() {
            return this._delayTime;
          }
        })(Ze, ps, ((t2, e2, s2, n2, i2) => (o2) => {
          const r2 = new WeakMap();
          return {render(a2, c2, h2) {
            const u2 = r2.get(c2);
            return u2 !== void 0 ? Promise.resolve(u2) : (async (a3, c3, h3) => {
              let u3 = s2(a3);
              const l2 = E(u3, c3);
              if (!l2) {
                const t3 = {channelCount: u3.channelCount, channelCountMode: u3.channelCountMode, channelInterpretation: u3.channelInterpretation, delayTime: u3.delayTime.value, maxDelayTime: o2};
                u3 = e2(c3, t3);
              }
              return r2.set(c3, u3), l2 ? await t2(c3, a3.delayTime, u3.delayTime, h3) : await n2(c3, a3.delayTime, u3.delayTime, h3), await i2(a3, c3, u3, h3), u3;
            })(a2, c2, h2);
          }};
        })(as, Ut, st, us, Oe), Ut, Fe, Ne, gs), Ls = (zs = Ht, (t2, e2) => {
          const s2 = t2.createDynamicsCompressor();
          if (It(s2, e2), e2.channelCount > 2)
            throw zs();
          if (e2.channelCountMode === "max")
            throw zs();
          return Nt(s2, e2, "attack"), Nt(s2, e2, "knee"), Nt(s2, e2, "ratio"), Nt(s2, e2, "release"), Nt(s2, e2, "threshold"), s2;
        });
        var zs;
        const Bs = ((t2, e2, s2, n2, i2, o2, r2, a2) => class extends t2 {
          constructor(t3, i3) {
            const c2 = o2(t3), h2 = {...kt, ...i3}, u2 = n2(c2, h2), l2 = r2(c2);
            super(t3, false, u2, l2 ? s2() : null), this._attack = e2(this, l2, u2.attack), this._knee = e2(this, l2, u2.knee), this._nativeDynamicsCompressorNode = u2, this._ratio = e2(this, l2, u2.ratio), this._release = e2(this, l2, u2.release), this._threshold = e2(this, l2, u2.threshold), a2(this, 6e-3);
          }
          get attack() {
            return this._attack;
          }
          get channelCount() {
            return this._nativeDynamicsCompressorNode.channelCount;
          }
          set channelCount(t3) {
            const e3 = this._nativeDynamicsCompressorNode.channelCount;
            if (this._nativeDynamicsCompressorNode.channelCount = t3, t3 > 2)
              throw this._nativeDynamicsCompressorNode.channelCount = e3, i2();
          }
          get channelCountMode() {
            return this._nativeDynamicsCompressorNode.channelCountMode;
          }
          set channelCountMode(t3) {
            const e3 = this._nativeDynamicsCompressorNode.channelCountMode;
            if (this._nativeDynamicsCompressorNode.channelCountMode = t3, t3 === "max")
              throw this._nativeDynamicsCompressorNode.channelCountMode = e3, i2();
          }
          get knee() {
            return this._knee;
          }
          get ratio() {
            return this._ratio;
          }
          get reduction() {
            return typeof this._nativeDynamicsCompressorNode.reduction.value == "number" ? this._nativeDynamicsCompressorNode.reduction.value : this._nativeDynamicsCompressorNode.reduction;
          }
          get release() {
            return this._release;
          }
          get threshold() {
            return this._threshold;
          }
        })(Ze, ps, ((t2, e2, s2, n2, i2) => () => {
          const o2 = new WeakMap();
          return {render(r2, a2, c2) {
            const h2 = o2.get(a2);
            return h2 !== void 0 ? Promise.resolve(h2) : (async (r3, a3, c3) => {
              let h3 = s2(r3);
              const u2 = E(h3, a3);
              if (!u2) {
                const t3 = {attack: h3.attack.value, channelCount: h3.channelCount, channelCountMode: h3.channelCountMode, channelInterpretation: h3.channelInterpretation, knee: h3.knee.value, ratio: h3.ratio.value, release: h3.release.value, threshold: h3.threshold.value};
                h3 = e2(a3, t3);
              }
              return o2.set(a3, h3), u2 ? (await t2(a3, r3.attack, h3.attack, c3), await t2(a3, r3.knee, h3.knee, c3), await t2(a3, r3.ratio, h3.ratio, c3), await t2(a3, r3.release, h3.release, c3), await t2(a3, r3.threshold, h3.threshold, c3)) : (await n2(a3, r3.attack, h3.attack, c3), await n2(a3, r3.knee, h3.knee, c3), await n2(a3, r3.ratio, h3.ratio, c3), await n2(a3, r3.release, h3.release, c3), await n2(a3, r3.threshold, h3.threshold, c3)), await i2(r3, a3, h3, c3), h3;
            })(r2, a2, c2);
          }};
        })(as, Ls, st, us, Oe), Ls, Ht, Fe, Ne, gs), Ws = ((t2, e2, s2, n2, i2, o2) => class extends t2 {
          constructor(t3, r2) {
            const a2 = i2(t3), c2 = {...Ct, ...r2}, h2 = n2(a2, c2), u2 = o2(a2);
            super(t3, false, h2, u2 ? s2() : null), this._gain = e2(this, u2, h2.gain, N, V);
          }
          get gain() {
            return this._gain;
          }
        })(Ze, ps, ((t2, e2, s2, n2, i2) => () => {
          const o2 = new WeakMap();
          return {render(r2, a2, c2) {
            const h2 = o2.get(a2);
            return h2 !== void 0 ? Promise.resolve(h2) : (async (r3, a3, c3) => {
              let h3 = s2(r3);
              const u2 = E(h3, a3);
              if (!u2) {
                const t3 = {channelCount: h3.channelCount, channelCountMode: h3.channelCountMode, channelInterpretation: h3.channelInterpretation, gain: h3.gain.value};
                h3 = e2(a3, t3);
              }
              return o2.set(a3, h3), u2 ? await t2(a3, r3.gain, h3.gain, c3) : await n2(a3, r3.gain, h3.gain, c3), await i2(r3, a3, h3, c3), h3;
            })(r2, a2, c2);
          }};
        })(as, Qt, st, us, Oe), Qt, Fe, Ne), Gs = ((t2, e2, s2, n2) => (i2, o2, {channelCount: r2, channelCountMode: a2, channelInterpretation: c2, feedback: h2, feedforward: u2}) => {
          const l2 = Lt(o2, i2.sampleRate), p2 = h2 instanceof Float64Array ? h2 : new Float64Array(h2), d2 = u2 instanceof Float64Array ? u2 : new Float64Array(u2), f2 = p2.length, _2 = d2.length, m2 = Math.min(f2, _2);
          if (f2 === 0 || f2 > 20)
            throw n2();
          if (p2[0] === 0)
            throw e2();
          if (_2 === 0 || _2 > 20)
            throw n2();
          if (d2[0] === 0)
            throw e2();
          if (p2[0] !== 1) {
            for (let t3 = 0; t3 < _2; t3 += 1)
              d2[t3] /= p2[0];
            for (let t3 = 1; t3 < f2; t3 += 1)
              p2[t3] /= p2[0];
          }
          const g2 = s2(i2, l2, r2, r2);
          g2.channelCount = r2, g2.channelCountMode = a2, g2.channelInterpretation = c2;
          const v2 = [], y2 = [], x2 = [];
          for (let t3 = 0; t3 < r2; t3 += 1) {
            v2.push(0);
            const t4 = new Float32Array(32), e3 = new Float32Array(32);
            t4.fill(0), e3.fill(0), y2.push(t4), x2.push(e3);
          }
          g2.onaudioprocess = (t3) => {
            const e3 = t3.inputBuffer, s3 = t3.outputBuffer, n3 = e3.numberOfChannels;
            for (let t4 = 0; t4 < n3; t4 += 1) {
              const n4 = e3.getChannelData(t4), i3 = s3.getChannelData(t4);
              v2[t4] = Mt(p2, f2, d2, _2, m2, y2[t4], x2[t4], v2[t4], 32, n4, i3);
            }
          };
          const w2 = i2.sampleRate / 2;
          return Gt({get bufferSize() {
            return l2;
          }, get channelCount() {
            return g2.channelCount;
          }, set channelCount(t3) {
            g2.channelCount = t3;
          }, get channelCountMode() {
            return g2.channelCountMode;
          }, set channelCountMode(t3) {
            g2.channelCountMode = t3;
          }, get channelInterpretation() {
            return g2.channelInterpretation;
          }, set channelInterpretation(t3) {
            g2.channelInterpretation = t3;
          }, get context() {
            return g2.context;
          }, get inputs() {
            return [g2];
          }, get numberOfInputs() {
            return g2.numberOfInputs;
          }, get numberOfOutputs() {
            return g2.numberOfOutputs;
          }, addEventListener: (...t3) => g2.addEventListener(t3[0], t3[1], t3[2]), dispatchEvent: (...t3) => g2.dispatchEvent(t3[0]), getFrequencyResponse(e3, s3, n3) {
            if (e3.length !== s3.length || s3.length !== n3.length)
              throw t2();
            const i3 = e3.length;
            for (let t3 = 0; t3 < i3; t3 += 1) {
              const i4 = -Math.PI * (e3[t3] / w2), o3 = [Math.cos(i4), Math.sin(i4)], r3 = Zt(Xt(d2, o3), Xt(p2, o3));
              s3[t3] = Math.sqrt(r3[0] * r3[0] + r3[1] * r3[1]), n3[t3] = Math.atan2(r3[1], r3[0]);
            }
          }, removeEventListener: (...t3) => g2.removeEventListener(t3[0], t3[1], t3[2])}, g2);
        })(Dt, At, Yt, Ht), Us = ((t2, e2, s2, n2) => (i2) => t2(Rt, () => Rt(i2)) ? Promise.resolve(t2(n2, n2)).then((t3) => {
          if (!t3) {
            const t4 = s2(i2, 512, 0, 1);
            i2.oncomplete = () => {
              t4.onaudioprocess = null, t4.disconnect();
            }, t4.onaudioprocess = () => i2.currentTime, t4.connect(i2.destination);
          }
          return i2.startRendering();
        }) : new Promise((t3) => {
          const s3 = e2(i2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0});
          i2.oncomplete = (e3) => {
            s3.disconnect(), t3(e3.renderedBuffer);
          }, s3.connect(i2.destination), i2.startRendering();
        }))(xe, Qt, Yt, ((t2, e2) => () => {
          if (e2 === null)
            return Promise.resolve(false);
          const s2 = new e2(1, 1, 44100), n2 = t2(s2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0});
          return new Promise((t3) => {
            s2.oncomplete = () => {
              n2.disconnect(), t3(s2.currentTime !== 0);
            }, s2.startRendering();
          });
        })(Qt, Ve)), Qs = ((t2, e2, s2, n2, i2) => (o2, r2) => {
          const a2 = new WeakMap();
          let c2 = null;
          const h2 = async (h3, u2, l2) => {
            let p2 = null, d2 = e2(h3);
            const f2 = E(d2, u2);
            if (u2.createIIRFilter === void 0 ? p2 = t2(u2, {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}) : f2 || (d2 = u2.createIIRFilter(r2, o2)), a2.set(u2, p2 === null ? d2 : p2), p2 !== null) {
              if (c2 === null) {
                if (s2 === null)
                  throw new Error("Missing the native OfflineAudioContext constructor.");
                const t4 = new s2(h3.context.destination.channelCount, h3.context.length, u2.sampleRate);
                c2 = (async () => {
                  await n2(h3, t4, t4.destination, l2);
                  return ((t5, e3, s3, n3) => {
                    const i3 = s3 instanceof Float64Array ? s3 : new Float64Array(s3), o3 = n3 instanceof Float64Array ? n3 : new Float64Array(n3), r3 = i3.length, a3 = o3.length, c3 = Math.min(r3, a3);
                    if (i3[0] !== 1) {
                      for (let t6 = 0; t6 < r3; t6 += 1)
                        o3[t6] /= i3[0];
                      for (let t6 = 1; t6 < a3; t6 += 1)
                        i3[t6] /= i3[0];
                    }
                    const h4 = new Float32Array(32), u3 = new Float32Array(32), l3 = e3.createBuffer(t5.numberOfChannels, t5.length, t5.sampleRate), p3 = t5.numberOfChannels;
                    for (let e4 = 0; e4 < p3; e4 += 1) {
                      const s4 = t5.getChannelData(e4), n4 = l3.getChannelData(e4);
                      h4.fill(0), u3.fill(0), Mt(i3, r3, o3, a3, c3, h4, u3, 0, 32, s4, n4);
                    }
                    return l3;
                  })(await i2(t4), u2, o2, r2);
                })();
              }
              const t3 = await c2;
              return p2.buffer = t3, p2.start(0), p2;
            }
            return await n2(h3, u2, d2, l2), d2;
          };
          return {render(t3, e3, s3) {
            const n3 = a2.get(e3);
            return n3 !== void 0 ? Promise.resolve(n3) : h2(t3, e3, s3);
          }};
        })(cs, st, Ve, Oe, Us);
        var Zs;
        const Xs = ((t2, e2, s2, n2, i2, o2) => class extends t2 {
          constructor(t3, r2) {
            const a2 = n2(t3), c2 = i2(a2), h2 = {...Ot, ...r2}, u2 = e2(a2, c2 ? null : t3.baseLatency, h2);
            super(t3, false, u2, c2 ? s2(h2.feedback, h2.feedforward) : null), ((t4) => {
              var e3;
              t4.getFrequencyResponse = (e3 = t4.getFrequencyResponse, (s3, n3, i3) => {
                if (s3.length !== n3.length || n3.length !== i3.length)
                  throw Dt();
                return e3.call(t4, s3, n3, i3);
              });
            })(u2), this._nativeIIRFilterNode = u2, o2(this, 1);
          }
          getFrequencyResponse(t3, e3, s3) {
            return this._nativeIIRFilterNode.getFrequencyResponse(t3, e3, s3);
          }
        })(Ze, (Zs = Gs, (t2, e2, s2) => {
          if (t2.createIIRFilter === void 0)
            return Zs(t2, e2, s2);
          const n2 = t2.createIIRFilter(s2.feedforward, s2.feedback);
          return It(n2, s2), n2;
        }), Qs, Fe, Ne, gs), Ys = ((t2, e2, s2, n2, i2) => (o2, r2) => {
          const a2 = r2.listener, {forwardX: c2, forwardY: h2, forwardZ: u2, positionX: l2, positionY: p2, positionZ: d2, upX: f2, upY: _2, upZ: m2} = a2.forwardX === void 0 ? (() => {
            const c3 = e2(r2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 9}), h3 = i2(r2), u3 = n2(r2, 256, 9, 0), l3 = (e3, n3) => {
              const i3 = s2(r2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: n3});
              return i3.connect(c3, 0, e3), i3.start(), Object.defineProperty(i3.offset, "defaultValue", {get: () => n3}), t2({context: o2}, h3, i3.offset, N, V);
            };
            let p3 = [0, 0, -1, 0, 1, 0], d3 = [0, 0, 0];
            return u3.onaudioprocess = ({inputBuffer: t3}) => {
              const e3 = [t3.getChannelData(0)[0], t3.getChannelData(1)[0], t3.getChannelData(2)[0], t3.getChannelData(3)[0], t3.getChannelData(4)[0], t3.getChannelData(5)[0]];
              e3.some((t4, e4) => t4 !== p3[e4]) && (a2.setOrientation(...e3), p3 = e3);
              const s3 = [t3.getChannelData(6)[0], t3.getChannelData(7)[0], t3.getChannelData(8)[0]];
              s3.some((t4, e4) => t4 !== d3[e4]) && (a2.setPosition(...s3), d3 = s3);
            }, c3.connect(u3), {forwardX: l3(0, 0), forwardY: l3(1, 0), forwardZ: l3(2, -1), positionX: l3(6, 0), positionY: l3(7, 0), positionZ: l3(8, 0), upX: l3(3, 0), upY: l3(4, 1), upZ: l3(5, 0)};
          })() : a2;
          return {get forwardX() {
            return c2;
          }, get forwardY() {
            return h2;
          }, get forwardZ() {
            return u2;
          }, get positionX() {
            return l2;
          }, get positionY() {
            return p2;
          }, get positionZ() {
            return d2;
          }, get upX() {
            return f2;
          }, get upY() {
            return _2;
          }, get upZ() {
            return m2;
          }};
        })(ps, Es, Is, Yt, Ne), Hs = new WeakMap(), $s = ((t2, e2, s2, n2, i2, o2) => class extends s2 {
          constructor(s3, o3) {
            super(s3), this._nativeContext = s3, p.set(this, s3), n2(s3) && i2.set(s3, new Set()), this._destination = new t2(this, o3), this._listener = e2(this, s3), this._onstatechange = null;
          }
          get currentTime() {
            return this._nativeContext.currentTime;
          }
          get destination() {
            return this._destination;
          }
          get listener() {
            return this._listener;
          }
          get onstatechange() {
            return this._onstatechange;
          }
          set onstatechange(t3) {
            const e3 = typeof t3 == "function" ? o2(this, t3) : null;
            this._nativeContext.onstatechange = e3;
            const s3 = this._nativeContext.onstatechange;
            this._onstatechange = s3 !== null && s3 === e3 ? t3 : s3;
          }
          get sampleRate() {
            return this._nativeContext.sampleRate;
          }
          get state() {
            return this._nativeContext.state;
          }
        })(_s, Ys, Le, Ne, Hs, de), Js = ((t2, e2, s2, n2, i2, o2) => (r2, a2) => {
          const c2 = r2.createOscillator();
          return It(c2, a2), Nt(c2, a2, "detune"), Nt(c2, a2, "frequency"), a2.periodicWave !== void 0 ? c2.setPeriodicWave(a2.periodicWave) : Ft(c2, a2, "type"), e2(s2, () => s2(r2)) || Pt(c2), e2(n2, () => n2(r2)) || o2(c2, r2), e2(i2, () => i2(r2)) || jt(c2), t2(r2, c2), c2;
        })(is, xe, ae, ce, he, pe), Ks = ((t2, e2, s2, n2, i2, o2, r2) => class extends t2 {
          constructor(t3, r3) {
            const a2 = i2(t3), c2 = {...Jt, ...r3}, h2 = s2(a2, c2), u2 = o2(a2), l2 = u2 ? n2() : null, p2 = t3.sampleRate / 2;
            super(t3, false, h2, l2), this._detune = e2(this, u2, h2.detune, 153600, -153600), this._frequency = e2(this, u2, h2.frequency, p2, -p2), this._nativeOscillatorNode = h2, this._onended = null, this._oscillatorNodeRenderer = l2, this._oscillatorNodeRenderer !== null && c2.periodicWave !== void 0 && (this._oscillatorNodeRenderer.periodicWave = c2.periodicWave);
          }
          get detune() {
            return this._detune;
          }
          get frequency() {
            return this._frequency;
          }
          get onended() {
            return this._onended;
          }
          set onended(t3) {
            const e3 = typeof t3 == "function" ? r2(this, t3) : null;
            this._nativeOscillatorNode.onended = e3;
            const s3 = this._nativeOscillatorNode.onended;
            this._onended = s3 !== null && s3 === e3 ? t3 : s3;
          }
          get type() {
            return this._nativeOscillatorNode.type;
          }
          set type(t3) {
            this._nativeOscillatorNode.type = t3, this._oscillatorNodeRenderer !== null && (this._oscillatorNodeRenderer.periodicWave = null);
          }
          setPeriodicWave(t3) {
            this._nativeOscillatorNode.setPeriodicWave(t3), this._oscillatorNodeRenderer !== null && (this._oscillatorNodeRenderer.periodicWave = t3);
          }
          start(t3 = 0) {
            if (this._nativeOscillatorNode.start(t3), this._oscillatorNodeRenderer !== null && (this._oscillatorNodeRenderer.start = t3), this.context.state !== "closed") {
              C(this);
              const t4 = () => {
                this._nativeOscillatorNode.removeEventListener("ended", t4), P(this) && D(this);
              };
              this._nativeOscillatorNode.addEventListener("ended", t4);
            }
          }
          stop(t3 = 0) {
            this._nativeOscillatorNode.stop(t3), this._oscillatorNodeRenderer !== null && (this._oscillatorNodeRenderer.stop = t3);
          }
        })(Ze, ps, Js, ((t2, e2, s2, n2, i2) => () => {
          const o2 = new WeakMap();
          let r2 = null, a2 = null, c2 = null;
          return {set periodicWave(t3) {
            r2 = t3;
          }, set start(t3) {
            a2 = t3;
          }, set stop(t3) {
            c2 = t3;
          }, render(h2, u2, l2) {
            const p2 = o2.get(u2);
            return p2 !== void 0 ? Promise.resolve(p2) : (async (h3, u3, l3) => {
              let p3 = s2(h3);
              const d2 = E(p3, u3);
              if (!d2) {
                const t3 = {channelCount: p3.channelCount, channelCountMode: p3.channelCountMode, channelInterpretation: p3.channelInterpretation, detune: p3.detune.value, frequency: p3.frequency.value, periodicWave: r2 === null ? void 0 : r2, type: p3.type};
                p3 = e2(u3, t3), a2 !== null && p3.start(a2), c2 !== null && p3.stop(c2);
              }
              return o2.set(u3, p3), d2 ? (await t2(u3, h3.detune, p3.detune, l3), await t2(u3, h3.frequency, p3.frequency, l3)) : (await n2(u3, h3.detune, p3.detune, l3), await n2(u3, h3.frequency, p3.frequency, l3)), await i2(h3, u3, p3, l3), p3;
            })(h2, u2, l2);
          }};
        })(as, Js, st, us, Oe), Fe, Ne, de), tn = (en = cs, (t2, e2) => {
          const s2 = en(t2, {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}), n2 = t2.createBuffer(1, 2, 44100);
          return s2.buffer = n2, s2.loop = true, s2.connect(e2), s2.start(), () => {
            s2.stop(), s2.disconnect(e2);
          };
        });
        var en;
        const sn = ((t2, e2, s2, n2, i2) => (o2, {curve: r2, oversample: a2, ...c2}) => {
          const h2 = o2.createWaveShaper(), u2 = o2.createWaveShaper();
          It(h2, c2), It(u2, c2);
          const l2 = s2(o2, {...c2, gain: 1}), p2 = s2(o2, {...c2, gain: -1}), d2 = s2(o2, {...c2, gain: 1}), f2 = s2(o2, {...c2, gain: -1});
          let _2 = null, m2 = false, g2 = null;
          const v2 = {get bufferSize() {
          }, get channelCount() {
            return h2.channelCount;
          }, set channelCount(t3) {
            l2.channelCount = t3, p2.channelCount = t3, h2.channelCount = t3, d2.channelCount = t3, u2.channelCount = t3, f2.channelCount = t3;
          }, get channelCountMode() {
            return h2.channelCountMode;
          }, set channelCountMode(t3) {
            l2.channelCountMode = t3, p2.channelCountMode = t3, h2.channelCountMode = t3, d2.channelCountMode = t3, u2.channelCountMode = t3, f2.channelCountMode = t3;
          }, get channelInterpretation() {
            return h2.channelInterpretation;
          }, set channelInterpretation(t3) {
            l2.channelInterpretation = t3, p2.channelInterpretation = t3, h2.channelInterpretation = t3, d2.channelInterpretation = t3, u2.channelInterpretation = t3, f2.channelInterpretation = t3;
          }, get context() {
            return h2.context;
          }, get curve() {
            return g2;
          }, set curve(s3) {
            if (s3 !== null && s3.length < 2)
              throw e2();
            if (s3 === null)
              h2.curve = s3, u2.curve = s3;
            else {
              const t3 = s3.length, e3 = new Float32Array(t3 + 2 - t3 % 2), n3 = new Float32Array(t3 + 2 - t3 % 2);
              e3[0] = s3[0], n3[0] = -s3[t3 - 1];
              const i3 = Math.ceil((t3 + 1) / 2), o3 = (t3 + 1) / 2 - 1;
              for (let r3 = 1; r3 < i3; r3 += 1) {
                const a3 = r3 / i3 * o3, c3 = Math.floor(a3), h3 = Math.ceil(a3);
                e3[r3] = c3 === h3 ? s3[c3] : (1 - (a3 - c3)) * s3[c3] + (1 - (h3 - a3)) * s3[h3], n3[r3] = c3 === h3 ? -s3[t3 - 1 - c3] : -(1 - (a3 - c3)) * s3[t3 - 1 - c3] - (1 - (h3 - a3)) * s3[t3 - 1 - h3];
              }
              e3[i3] = t3 % 2 == 1 ? s3[i3 - 1] : (s3[i3 - 2] + s3[i3 - 1]) / 2, h2.curve = e3, u2.curve = n3;
            }
            g2 = s3, m2 && (n2(g2) && _2 === null ? _2 = t2(o2, l2) : _2 !== null && (_2(), _2 = null));
          }, get inputs() {
            return [l2];
          }, get numberOfInputs() {
            return h2.numberOfInputs;
          }, get numberOfOutputs() {
            return h2.numberOfOutputs;
          }, get oversample() {
            return h2.oversample;
          }, set oversample(t3) {
            h2.oversample = t3, u2.oversample = t3;
          }, addEventListener: (...t3) => l2.addEventListener(t3[0], t3[1], t3[2]), dispatchEvent: (...t3) => l2.dispatchEvent(t3[0]), removeEventListener: (...t3) => l2.removeEventListener(t3[0], t3[1], t3[2])};
          r2 !== null && (v2.curve = r2 instanceof Float32Array ? r2 : new Float32Array(r2)), a2 !== v2.oversample && (v2.oversample = a2);
          return i2(Gt(v2, d2), () => {
            l2.connect(h2).connect(d2), l2.connect(p2).connect(u2).connect(f2).connect(d2), m2 = true, n2(g2) && (_2 = t2(o2, l2));
          }, () => {
            l2.disconnect(h2), h2.disconnect(d2), l2.disconnect(p2), p2.disconnect(u2), u2.disconnect(f2), f2.disconnect(d2), m2 = false, _2 !== null && (_2(), _2 = null);
          });
        })(tn, At, Qt, ie, As), nn = ((t2, e2, s2, n2, i2, o2, r2) => (a2, c2) => {
          const h2 = a2.createWaveShaper();
          if (o2 !== null && o2.name === "webkitAudioContext" && a2.createGain().gain.automationRate === void 0)
            return s2(a2, c2);
          It(h2, c2);
          const u2 = c2.curve === null || c2.curve instanceof Float32Array ? c2.curve : new Float32Array(c2.curve);
          if (u2 !== null && u2.length < 2)
            throw e2();
          Ft(h2, {curve: u2}, "curve"), Ft(h2, c2, "oversample");
          let l2 = null, p2 = false;
          r2(h2, "curve", (t3) => () => t3.call(h2), (e3) => (s3) => (e3.call(h2, s3), p2 && (n2(s3) && l2 === null ? l2 = t2(a2, h2) : n2(s3) || l2 === null || (l2(), l2 = null)), s3));
          return i2(h2, () => {
            p2 = true, n2(h2.curve) && (l2 = t2(a2, h2));
          }, () => {
            p2 = false, l2 !== null && (l2(), l2 = null);
          });
        })(tn, At, sn, ie, As, Be, oe), on = ((t2, e2, s2, n2, i2, o2, r2, a2, c2) => (h2, {coneInnerAngle: u2, coneOuterAngle: l2, coneOuterGain: p2, distanceModel: d2, maxDistance: f2, orientationX: _2, orientationY: m2, orientationZ: g2, panningModel: v2, positionX: y2, positionY: x2, positionZ: w2, refDistance: b2, rolloffFactor: T2, ...S2}) => {
          const k2 = h2.createPanner();
          if (S2.channelCount > 2)
            throw r2();
          if (S2.channelCountMode === "max")
            throw r2();
          It(k2, S2);
          const C2 = {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete"}, A2 = s2(h2, {...C2, channelInterpretation: "speakers", numberOfInputs: 6}), D2 = n2(h2, {...S2, gain: 1}), O2 = n2(h2, {...C2, gain: 1}), M2 = n2(h2, {...C2, gain: 0}), E2 = n2(h2, {...C2, gain: 0}), R2 = n2(h2, {...C2, gain: 0}), q2 = n2(h2, {...C2, gain: 0}), F2 = n2(h2, {...C2, gain: 0}), I2 = i2(h2, 256, 6, 1), V2 = o2(h2, {...C2, curve: new Float32Array([1, 1]), oversample: "none"});
          let N2 = [_2, m2, g2], P2 = [y2, x2, w2];
          I2.onaudioprocess = ({inputBuffer: t3}) => {
            const e3 = [t3.getChannelData(0)[0], t3.getChannelData(1)[0], t3.getChannelData(2)[0]];
            e3.some((t4, e4) => t4 !== N2[e4]) && (k2.setOrientation(...e3), N2 = e3);
            const s3 = [t3.getChannelData(3)[0], t3.getChannelData(4)[0], t3.getChannelData(5)[0]];
            s3.some((t4, e4) => t4 !== P2[e4]) && (k2.setPosition(...s3), P2 = s3);
          }, Object.defineProperty(M2.gain, "defaultValue", {get: () => 0}), Object.defineProperty(E2.gain, "defaultValue", {get: () => 0}), Object.defineProperty(R2.gain, "defaultValue", {get: () => 0}), Object.defineProperty(q2.gain, "defaultValue", {get: () => 0}), Object.defineProperty(F2.gain, "defaultValue", {get: () => 0});
          const j2 = {get bufferSize() {
          }, get channelCount() {
            return k2.channelCount;
          }, set channelCount(t3) {
            if (t3 > 2)
              throw r2();
            D2.channelCount = t3, k2.channelCount = t3;
          }, get channelCountMode() {
            return k2.channelCountMode;
          }, set channelCountMode(t3) {
            if (t3 === "max")
              throw r2();
            D2.channelCountMode = t3, k2.channelCountMode = t3;
          }, get channelInterpretation() {
            return k2.channelInterpretation;
          }, set channelInterpretation(t3) {
            D2.channelInterpretation = t3, k2.channelInterpretation = t3;
          }, get coneInnerAngle() {
            return k2.coneInnerAngle;
          }, set coneInnerAngle(t3) {
            k2.coneInnerAngle = t3;
          }, get coneOuterAngle() {
            return k2.coneOuterAngle;
          }, set coneOuterAngle(t3) {
            k2.coneOuterAngle = t3;
          }, get coneOuterGain() {
            return k2.coneOuterGain;
          }, set coneOuterGain(t3) {
            if (t3 < 0 || t3 > 1)
              throw e2();
            k2.coneOuterGain = t3;
          }, get context() {
            return k2.context;
          }, get distanceModel() {
            return k2.distanceModel;
          }, set distanceModel(t3) {
            k2.distanceModel = t3;
          }, get inputs() {
            return [D2];
          }, get maxDistance() {
            return k2.maxDistance;
          }, set maxDistance(t3) {
            if (t3 < 0)
              throw new RangeError();
            k2.maxDistance = t3;
          }, get numberOfInputs() {
            return k2.numberOfInputs;
          }, get numberOfOutputs() {
            return k2.numberOfOutputs;
          }, get orientationX() {
            return O2.gain;
          }, get orientationY() {
            return M2.gain;
          }, get orientationZ() {
            return E2.gain;
          }, get panningModel() {
            return k2.panningModel;
          }, set panningModel(t3) {
            k2.panningModel = t3;
          }, get positionX() {
            return R2.gain;
          }, get positionY() {
            return q2.gain;
          }, get positionZ() {
            return F2.gain;
          }, get refDistance() {
            return k2.refDistance;
          }, set refDistance(t3) {
            if (t3 < 0)
              throw new RangeError();
            k2.refDistance = t3;
          }, get rolloffFactor() {
            return k2.rolloffFactor;
          }, set rolloffFactor(t3) {
            if (t3 < 0)
              throw new RangeError();
            k2.rolloffFactor = t3;
          }, addEventListener: (...t3) => D2.addEventListener(t3[0], t3[1], t3[2]), dispatchEvent: (...t3) => D2.dispatchEvent(t3[0]), removeEventListener: (...t3) => D2.removeEventListener(t3[0], t3[1], t3[2])};
          u2 !== j2.coneInnerAngle && (j2.coneInnerAngle = u2), l2 !== j2.coneOuterAngle && (j2.coneOuterAngle = l2), p2 !== j2.coneOuterGain && (j2.coneOuterGain = p2), d2 !== j2.distanceModel && (j2.distanceModel = d2), f2 !== j2.maxDistance && (j2.maxDistance = f2), _2 !== j2.orientationX.value && (j2.orientationX.value = _2), m2 !== j2.orientationY.value && (j2.orientationY.value = m2), g2 !== j2.orientationZ.value && (j2.orientationZ.value = g2), v2 !== j2.panningModel && (j2.panningModel = v2), y2 !== j2.positionX.value && (j2.positionX.value = y2), x2 !== j2.positionY.value && (j2.positionY.value = x2), w2 !== j2.positionZ.value && (j2.positionZ.value = w2), b2 !== j2.refDistance && (j2.refDistance = b2), T2 !== j2.rolloffFactor && (j2.rolloffFactor = T2), N2[0] === 1 && N2[1] === 0 && N2[2] === 0 || k2.setOrientation(...N2), P2[0] === 0 && P2[1] === 0 && P2[2] === 0 || k2.setPosition(...P2);
          return c2(Gt(j2, k2), () => {
            D2.connect(k2), t2(D2, V2, 0, 0), V2.connect(O2).connect(A2, 0, 0), V2.connect(M2).connect(A2, 0, 1), V2.connect(E2).connect(A2, 0, 2), V2.connect(R2).connect(A2, 0, 3), V2.connect(q2).connect(A2, 0, 4), V2.connect(F2).connect(A2, 0, 5), A2.connect(I2).connect(h2.destination);
          }, () => {
            D2.disconnect(k2), a2(D2, V2, 0, 0), V2.disconnect(O2), O2.disconnect(A2), V2.disconnect(M2), M2.disconnect(A2), V2.disconnect(E2), E2.disconnect(A2), V2.disconnect(R2), R2.disconnect(A2), V2.disconnect(q2), q2.disconnect(A2), V2.disconnect(F2), F2.disconnect(A2), A2.disconnect(I2), I2.disconnect(h2.destination);
          });
        })($, At, Es, Qt, Yt, nn, Ht, et, As), rn = (an = on, (t2, e2) => {
          const s2 = t2.createPanner();
          return s2.orientationX === void 0 ? an(t2, e2) : (It(s2, e2), Nt(s2, e2, "orientationX"), Nt(s2, e2, "orientationY"), Nt(s2, e2, "orientationZ"), Nt(s2, e2, "positionX"), Nt(s2, e2, "positionY"), Nt(s2, e2, "positionZ"), Ft(s2, e2, "coneInnerAngle"), Ft(s2, e2, "coneOuterAngle"), Ft(s2, e2, "coneOuterGain"), Ft(s2, e2, "distanceModel"), Ft(s2, e2, "maxDistance"), Ft(s2, e2, "panningModel"), Ft(s2, e2, "refDistance"), Ft(s2, e2, "rolloffFactor"), s2);
        });
        var an;
        const cn = ((t2, e2, s2, n2, i2, o2, r2) => class extends t2 {
          constructor(t3, a2) {
            const c2 = i2(t3), h2 = {...Kt, ...a2}, u2 = s2(c2, h2), l2 = o2(c2);
            super(t3, false, u2, l2 ? n2() : null), this._nativePannerNode = u2, this._orientationX = e2(this, l2, u2.orientationX, N, V), this._orientationY = e2(this, l2, u2.orientationY, N, V), this._orientationZ = e2(this, l2, u2.orientationZ, N, V), this._positionX = e2(this, l2, u2.positionX, N, V), this._positionY = e2(this, l2, u2.positionY, N, V), this._positionZ = e2(this, l2, u2.positionZ, N, V), r2(this, 1);
          }
          get coneInnerAngle() {
            return this._nativePannerNode.coneInnerAngle;
          }
          set coneInnerAngle(t3) {
            this._nativePannerNode.coneInnerAngle = t3;
          }
          get coneOuterAngle() {
            return this._nativePannerNode.coneOuterAngle;
          }
          set coneOuterAngle(t3) {
            this._nativePannerNode.coneOuterAngle = t3;
          }
          get coneOuterGain() {
            return this._nativePannerNode.coneOuterGain;
          }
          set coneOuterGain(t3) {
            this._nativePannerNode.coneOuterGain = t3;
          }
          get distanceModel() {
            return this._nativePannerNode.distanceModel;
          }
          set distanceModel(t3) {
            this._nativePannerNode.distanceModel = t3;
          }
          get maxDistance() {
            return this._nativePannerNode.maxDistance;
          }
          set maxDistance(t3) {
            this._nativePannerNode.maxDistance = t3;
          }
          get orientationX() {
            return this._orientationX;
          }
          get orientationY() {
            return this._orientationY;
          }
          get orientationZ() {
            return this._orientationZ;
          }
          get panningModel() {
            return this._nativePannerNode.panningModel;
          }
          set panningModel(t3) {
            this._nativePannerNode.panningModel = t3;
          }
          get positionX() {
            return this._positionX;
          }
          get positionY() {
            return this._positionY;
          }
          get positionZ() {
            return this._positionZ;
          }
          get refDistance() {
            return this._nativePannerNode.refDistance;
          }
          set refDistance(t3) {
            this._nativePannerNode.refDistance = t3;
          }
          get rolloffFactor() {
            return this._nativePannerNode.rolloffFactor;
          }
          set rolloffFactor(t3) {
            this._nativePannerNode.rolloffFactor = t3;
          }
        })(Ze, ps, rn, ((t2, e2, s2, n2, i2, o2, r2, a2, c2, h2) => () => {
          const u2 = new WeakMap();
          let l2 = null;
          return {render(p2, d2, f2) {
            const _2 = u2.get(d2);
            return _2 !== void 0 ? Promise.resolve(_2) : (async (p3, d3, f3) => {
              let _3 = null, m2 = o2(p3);
              const g2 = {channelCount: m2.channelCount, channelCountMode: m2.channelCountMode, channelInterpretation: m2.channelInterpretation}, v2 = {...g2, coneInnerAngle: m2.coneInnerAngle, coneOuterAngle: m2.coneOuterAngle, coneOuterGain: m2.coneOuterGain, distanceModel: m2.distanceModel, maxDistance: m2.maxDistance, panningModel: m2.panningModel, refDistance: m2.refDistance, rolloffFactor: m2.rolloffFactor}, y2 = E(m2, d3);
              if ("bufferSize" in m2)
                _3 = n2(d3, {...g2, gain: 1});
              else if (!y2) {
                const t3 = {...v2, orientationX: m2.orientationX.value, orientationY: m2.orientationY.value, orientationZ: m2.orientationZ.value, positionX: m2.positionX.value, positionY: m2.positionY.value, positionZ: m2.positionZ.value};
                m2 = i2(d3, t3);
              }
              if (u2.set(d3, _3 === null ? m2 : _3), _3 !== null) {
                if (l2 === null) {
                  if (r2 === null)
                    throw new Error("Missing the native OfflineAudioContext constructor.");
                  const t4 = new r2(6, p3.context.length, d3.sampleRate), n3 = e2(t4, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 6});
                  n3.connect(t4.destination), l2 = (async () => {
                    const e3 = await Promise.all([p3.orientationX, p3.orientationY, p3.orientationZ, p3.positionX, p3.positionY, p3.positionZ].map(async (e4, n4) => {
                      const i3 = s2(t4, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: n4 === 0 ? 1 : 0});
                      return await a2(t4, e4, i3.offset, f3), i3;
                    }));
                    for (let t5 = 0; t5 < 6; t5 += 1)
                      e3[t5].connect(n3, 0, t5), e3[t5].start(0);
                    return h2(t4);
                  })();
                }
                const t3 = await l2, o3 = n2(d3, {...g2, gain: 1});
                await c2(p3, d3, o3, f3);
                const u3 = [];
                for (let e3 = 0; e3 < t3.numberOfChannels; e3 += 1)
                  u3.push(t3.getChannelData(e3));
                let m3 = [u3[0][0], u3[1][0], u3[2][0]], y3 = [u3[3][0], u3[4][0], u3[5][0]], x2 = n2(d3, {...g2, gain: 1}), w2 = i2(d3, {...v2, orientationX: m3[0], orientationY: m3[1], orientationZ: m3[2], positionX: y3[0], positionY: y3[1], positionZ: y3[2]});
                o3.connect(x2).connect(w2.inputs[0]), w2.connect(_3);
                for (let e3 = 128; e3 < t3.length; e3 += 128) {
                  const t4 = [u3[0][e3], u3[1][e3], u3[2][e3]], s3 = [u3[3][e3], u3[4][e3], u3[5][e3]];
                  if (t4.some((t5, e4) => t5 !== m3[e4]) || s3.some((t5, e4) => t5 !== y3[e4])) {
                    m3 = t4, y3 = s3;
                    const r3 = e3 / d3.sampleRate;
                    x2.gain.setValueAtTime(0, r3), x2 = n2(d3, {...g2, gain: 0}), w2 = i2(d3, {...v2, orientationX: m3[0], orientationY: m3[1], orientationZ: m3[2], positionX: y3[0], positionY: y3[1], positionZ: y3[2]}), x2.gain.setValueAtTime(1, r3), o3.connect(x2).connect(w2.inputs[0]), w2.connect(_3);
                  }
                }
                return _3;
              }
              return y2 ? (await t2(d3, p3.orientationX, m2.orientationX, f3), await t2(d3, p3.orientationY, m2.orientationY, f3), await t2(d3, p3.orientationZ, m2.orientationZ, f3), await t2(d3, p3.positionX, m2.positionX, f3), await t2(d3, p3.positionY, m2.positionY, f3), await t2(d3, p3.positionZ, m2.positionZ, f3)) : (await a2(d3, p3.orientationX, m2.orientationX, f3), await a2(d3, p3.orientationY, m2.orientationY, f3), await a2(d3, p3.orientationZ, m2.orientationZ, f3), await a2(d3, p3.positionX, m2.positionX, f3), await a2(d3, p3.positionY, m2.positionY, f3), await a2(d3, p3.positionZ, m2.positionZ, f3)), H(m2) ? await c2(p3, d3, m2.inputs[0], f3) : await c2(p3, d3, m2, f3), m2;
            })(p2, d2, f2);
          }};
        })(as, Es, Is, Qt, rn, st, Ve, us, Oe, Us), Fe, Ne, gs), hn = ((t2, e2, s2, n2) => class i2 {
          constructor(i3, o2) {
            const r2 = e2(i3), a2 = n2({...te, ...o2}), c2 = t2(r2, a2);
            return s2.add(c2), c2;
          }
          static [Symbol.hasInstance](t3) {
            return t3 !== null && typeof t3 == "object" && Object.getPrototypeOf(t3) === i2.prototype || s2.has(t3);
          }
        })(((t2) => (e2, {disableNormalization: s2, imag: n2, real: i2}) => {
          const o2 = n2 instanceof Float32Array ? n2 : new Float32Array(n2), r2 = i2 instanceof Float32Array ? i2 : new Float32Array(i2), a2 = e2.createPeriodicWave(r2, o2, {disableNormalization: s2});
          if (Array.from(n2).length < 2)
            throw t2();
          return a2;
        })(q), Fe, new WeakSet(), (t2) => {
          const {imag: e2, real: s2} = t2;
          return e2 === void 0 ? s2 === void 0 ? {...t2, imag: [0, 0], real: [0, 0]} : {...t2, imag: Array.from(s2, () => 0), real: s2} : s2 === void 0 ? {...t2, imag: e2, real: Array.from(e2, () => 0)} : {...t2, imag: e2, real: s2};
        }), un = ((t2, e2) => (s2, n2) => {
          const i2 = n2.channelCountMode;
          if (i2 === "clamped-max")
            throw e2();
          if (s2.createStereoPanner === void 0)
            return t2(s2, n2);
          const o2 = s2.createStereoPanner();
          return It(o2, n2), Nt(o2, n2, "pan"), Object.defineProperty(o2, "channelCountMode", {get: () => i2, set: (t3) => {
            if (t3 !== i2)
              throw e2();
          }}), o2;
        })(((t2, e2, s2, n2, i2, o2) => {
          const r2 = new Float32Array([1, 1]), a2 = Math.PI / 2, c2 = {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete"}, h2 = {...c2, oversample: "none"}, u2 = (t3, o3, u3, l2, p2) => {
            if (o3 === 1)
              return ((t4, e3, i3, o4) => {
                const u4 = new Float32Array(16385), l3 = new Float32Array(16385);
                for (let t5 = 0; t5 < 16385; t5 += 1) {
                  const e4 = t5 / 16384 * a2;
                  u4[t5] = Math.cos(e4), l3[t5] = Math.sin(e4);
                }
                const p3 = s2(t4, {...c2, gain: 0}), d2 = n2(t4, {...h2, curve: u4}), f2 = n2(t4, {...h2, curve: r2}), _2 = s2(t4, {...c2, gain: 0}), m2 = n2(t4, {...h2, curve: l3});
                return {connectGraph() {
                  e3.connect(p3), e3.connect(f2.inputs === void 0 ? f2 : f2.inputs[0]), e3.connect(_2), f2.connect(i3), i3.connect(d2.inputs === void 0 ? d2 : d2.inputs[0]), i3.connect(m2.inputs === void 0 ? m2 : m2.inputs[0]), d2.connect(p3.gain), m2.connect(_2.gain), p3.connect(o4, 0, 0), _2.connect(o4, 0, 1);
                }, disconnectGraph() {
                  e3.disconnect(p3), e3.disconnect(f2.inputs === void 0 ? f2 : f2.inputs[0]), e3.disconnect(_2), f2.disconnect(i3), i3.disconnect(d2.inputs === void 0 ? d2 : d2.inputs[0]), i3.disconnect(m2.inputs === void 0 ? m2 : m2.inputs[0]), d2.disconnect(p3.gain), m2.disconnect(_2.gain), p3.disconnect(o4, 0, 0), _2.disconnect(o4, 0, 1);
                }};
              })(t3, u3, l2, p2);
            if (o3 === 2)
              return ((t4, i3, o4, u4) => {
                const l3 = new Float32Array(16385), p3 = new Float32Array(16385), d2 = new Float32Array(16385), f2 = new Float32Array(16385), _2 = Math.floor(8192.5);
                for (let t5 = 0; t5 < 16385; t5 += 1)
                  if (t5 > _2) {
                    const e3 = (t5 - _2) / (16384 - _2) * a2;
                    l3[t5] = Math.cos(e3), p3[t5] = Math.sin(e3), d2[t5] = 0, f2[t5] = 1;
                  } else {
                    const e3 = t5 / (16384 - _2) * a2;
                    l3[t5] = 1, p3[t5] = 0, d2[t5] = Math.cos(e3), f2[t5] = Math.sin(e3);
                  }
                const m2 = e2(t4, {channelCount: 2, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: 2}), g2 = s2(t4, {...c2, gain: 0}), v2 = n2(t4, {...h2, curve: l3}), y2 = s2(t4, {...c2, gain: 0}), x2 = n2(t4, {...h2, curve: p3}), w2 = n2(t4, {...h2, curve: r2}), b2 = s2(t4, {...c2, gain: 0}), T2 = n2(t4, {...h2, curve: d2}), S2 = s2(t4, {...c2, gain: 0}), k2 = n2(t4, {...h2, curve: f2});
                return {connectGraph() {
                  i3.connect(m2), i3.connect(w2.inputs === void 0 ? w2 : w2.inputs[0]), m2.connect(g2, 0), m2.connect(y2, 0), m2.connect(b2, 1), m2.connect(S2, 1), w2.connect(o4), o4.connect(v2.inputs === void 0 ? v2 : v2.inputs[0]), o4.connect(x2.inputs === void 0 ? x2 : x2.inputs[0]), o4.connect(T2.inputs === void 0 ? T2 : T2.inputs[0]), o4.connect(k2.inputs === void 0 ? k2 : k2.inputs[0]), v2.connect(g2.gain), x2.connect(y2.gain), T2.connect(b2.gain), k2.connect(S2.gain), g2.connect(u4, 0, 0), b2.connect(u4, 0, 0), y2.connect(u4, 0, 1), S2.connect(u4, 0, 1);
                }, disconnectGraph() {
                  i3.disconnect(m2), i3.disconnect(w2.inputs === void 0 ? w2 : w2.inputs[0]), m2.disconnect(g2, 0), m2.disconnect(y2, 0), m2.disconnect(b2, 1), m2.disconnect(S2, 1), w2.disconnect(o4), o4.disconnect(v2.inputs === void 0 ? v2 : v2.inputs[0]), o4.disconnect(x2.inputs === void 0 ? x2 : x2.inputs[0]), o4.disconnect(T2.inputs === void 0 ? T2 : T2.inputs[0]), o4.disconnect(k2.inputs === void 0 ? k2 : k2.inputs[0]), v2.disconnect(g2.gain), x2.disconnect(y2.gain), T2.disconnect(b2.gain), k2.disconnect(S2.gain), g2.disconnect(u4, 0, 0), b2.disconnect(u4, 0, 0), y2.disconnect(u4, 0, 1), S2.disconnect(u4, 0, 1);
                }};
              })(t3, u3, l2, p2);
            throw i2();
          };
          return (e3, {channelCount: n3, channelCountMode: r3, pan: a3, ...c3}) => {
            if (r3 === "max")
              throw i2();
            const h3 = t2(e3, {...c3, channelCount: 1, channelCountMode: r3, numberOfInputs: 2}), l2 = s2(e3, {...c3, channelCount: n3, channelCountMode: r3, gain: 1}), p2 = s2(e3, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: a3});
            let {connectGraph: d2, disconnectGraph: f2} = u2(e3, n3, l2, p2, h3);
            Object.defineProperty(p2.gain, "defaultValue", {get: () => 0}), Object.defineProperty(p2.gain, "maxValue", {get: () => 1}), Object.defineProperty(p2.gain, "minValue", {get: () => -1});
            const _2 = {get bufferSize() {
            }, get channelCount() {
              return l2.channelCount;
            }, set channelCount(t3) {
              l2.channelCount !== t3 && (m2 && f2(), {connectGraph: d2, disconnectGraph: f2} = u2(e3, t3, l2, p2, h3), m2 && d2()), l2.channelCount = t3;
            }, get channelCountMode() {
              return l2.channelCountMode;
            }, set channelCountMode(t3) {
              if (t3 === "clamped-max" || t3 === "max")
                throw i2();
              l2.channelCountMode = t3;
            }, get channelInterpretation() {
              return l2.channelInterpretation;
            }, set channelInterpretation(t3) {
              l2.channelInterpretation = t3;
            }, get context() {
              return l2.context;
            }, get inputs() {
              return [l2];
            }, get numberOfInputs() {
              return l2.numberOfInputs;
            }, get numberOfOutputs() {
              return l2.numberOfOutputs;
            }, get pan() {
              return p2.gain;
            }, addEventListener: (...t3) => l2.addEventListener(t3[0], t3[1], t3[2]), dispatchEvent: (...t3) => l2.dispatchEvent(t3[0]), removeEventListener: (...t3) => l2.removeEventListener(t3[0], t3[1], t3[2])};
            let m2 = false;
            return o2(Gt(_2, h3), () => {
              d2(), m2 = true;
            }, () => {
              f2(), m2 = false;
            });
          };
        })(Es, Wt, Qt, nn, Ht, As), Ht), ln = ((t2, e2, s2, n2, i2, o2) => class extends t2 {
          constructor(t3, r2) {
            const a2 = i2(t3), c2 = {...ee, ...r2}, h2 = s2(a2, c2), u2 = o2(a2);
            super(t3, false, h2, u2 ? n2() : null), this._pan = e2(this, u2, h2.pan);
          }
          get pan() {
            return this._pan;
          }
        })(Ze, ps, un, ((t2, e2, s2, n2, i2) => () => {
          const o2 = new WeakMap();
          return {render(r2, a2, c2) {
            const h2 = o2.get(a2);
            return h2 !== void 0 ? Promise.resolve(h2) : (async (r3, a3, c3) => {
              let h3 = s2(r3);
              const u2 = E(h3, a3);
              if (!u2) {
                const t3 = {channelCount: h3.channelCount, channelCountMode: h3.channelCountMode, channelInterpretation: h3.channelInterpretation, pan: h3.pan.value};
                h3 = e2(a3, t3);
              }
              return o2.set(a3, h3), u2 ? await t2(a3, r3.pan, h3.pan, c3) : await n2(a3, r3.pan, h3.pan, c3), H(h3) ? await i2(r3, a3, h3.inputs[0], c3) : await i2(r3, a3, h3, c3), h3;
            })(r2, a2, c2);
          }};
        })(as, un, st, us, Oe), Fe, Ne), pn = ((t2, e2, s2) => () => {
          const n2 = new WeakMap();
          return {render(i2, o2, r2) {
            const a2 = n2.get(o2);
            return a2 !== void 0 ? Promise.resolve(a2) : (async (i3, o3, r3) => {
              let a3 = e2(i3);
              if (!E(a3, o3)) {
                const e3 = {channelCount: a3.channelCount, channelCountMode: a3.channelCountMode, channelInterpretation: a3.channelInterpretation, curve: a3.curve, oversample: a3.oversample};
                a3 = t2(o3, e3);
              }
              return n2.set(o3, a3), H(a3) ? await s2(i3, o3, a3.inputs[0], r3) : await s2(i3, o3, a3, r3), a3;
            })(i2, o2, r2);
          }};
        })(nn, st, Oe), dn = ((t2, e2, s2, n2, i2, o2, r2) => class extends t2 {
          constructor(t3, e3) {
            const a2 = i2(t3), c2 = {...ne, ...e3}, h2 = s2(a2, c2);
            super(t3, true, h2, o2(a2) ? n2() : null), this._isCurveNullified = false, this._nativeWaveShaperNode = h2, r2(this, 1);
          }
          get curve() {
            return this._isCurveNullified ? null : this._nativeWaveShaperNode.curve;
          }
          set curve(t3) {
            if (t3 === null)
              this._isCurveNullified = true, this._nativeWaveShaperNode.curve = new Float32Array([0, 0]);
            else {
              if (t3.length < 2)
                throw e2();
              this._isCurveNullified = false, this._nativeWaveShaperNode.curve = t3;
            }
          }
          get oversample() {
            return this._nativeWaveShaperNode.oversample;
          }
          set oversample(t3) {
            this._nativeWaveShaperNode.oversample = t3;
          }
        })(Ze, At, nn, pn, Fe, Ne, gs), fn = ((t2) => t2 !== null && t2.isSecureContext)(Te), _n = ((t2) => (e2, s2, n2) => {
          Object.defineProperties(t2, {currentFrame: {configurable: true, get: () => Math.round(e2 * s2)}, currentTime: {configurable: true, get: () => e2}});
          try {
            return n2();
          } finally {
            t2 !== null && (delete t2.currentFrame, delete t2.currentTime);
          }
        })(Te), mn = new WeakMap(), gn = ((t2, e2) => (s2) => {
          let n2 = t2.get(s2);
          if (n2 !== void 0)
            return n2;
          if (e2 === null)
            throw new Error("Missing the native OfflineAudioContext constructor.");
          return n2 = new e2(1, 1, 8e3), t2.set(s2, n2), n2;
        })(mn, Ve), vn = ((t2) => t2 === null ? null : t2.hasOwnProperty("AudioWorkletNode") ? t2.AudioWorkletNode : null)(Te), yn = fn ? ((t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2, l2) => (p2, d2, f2 = {credentials: "omit"}) => {
          const m2 = o2(p2);
          if (m2.audioWorklet !== void 0)
            return Promise.all([i2(d2), Promise.resolve(t2(u2, u2))]).then(([[t3, e3], s3]) => {
              const [n3, i3] = y(t3, e3), o3 = s3 ? i3 : i3.replace(/\s+extends\s+AudioWorkletProcessor\s*{/, " extends (class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}){"), c3 = new Blob([`${n3};(registerProcessor=>{${o3}
})((n,p)=>registerProcessor(n,class extends p{${s3 ? "" : "__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${s3 ? "" : "i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}))`], {type: "application/javascript; charset=utf-8"}), h3 = URL.createObjectURL(c3);
              return m2.audioWorklet.addModule(h3, f2).then(() => {
                if (a2(m2))
                  return;
                return r2(m2).audioWorklet.addModule(h3, f2);
              }).finally(() => URL.revokeObjectURL(h3));
            });
          const g2 = h2.get(p2);
          if (g2 !== void 0 && g2.has(d2))
            return Promise.resolve();
          const v2 = c2.get(p2);
          if (v2 !== void 0) {
            const t3 = v2.get(d2);
            if (t3 !== void 0)
              return t3;
          }
          const b2 = i2(d2).then(([t3, e3]) => {
            const [n3, i3] = y(t3, e3);
            return s2(`${n3};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${i3}
})})(window,'_AWGS')`);
          }).then(() => {
            const t3 = l2._AWGS.pop();
            if (t3 === void 0)
              throw new SyntaxError();
            n2(m2.currentTime, m2.sampleRate, () => t3(class {
            }, void 0, (t4, s3) => {
              if (t4.trim() === "")
                throw e2();
              const n3 = _.get(m2);
              if (n3 !== void 0) {
                if (n3.has(t4))
                  throw e2();
                w(s3), x(s3.parameterDescriptors), n3.set(t4, s3);
              } else
                w(s3), x(s3.parameterDescriptors), _.set(m2, new Map([[t4, s3]]));
            }, m2.sampleRate, void 0, void 0));
          });
          return v2 === void 0 ? c2.set(p2, new Map([[d2, b2]])) : v2.set(d2, b2), b2.then(() => {
            const t3 = h2.get(p2);
            t3 === void 0 ? h2.set(p2, new Set([d2])) : t3.add(d2);
          }).finally(() => {
            const t3 = c2.get(p2);
            t3 !== void 0 && t3.delete(d2);
          }), b2;
        })(xe, Ht, ((t2) => (e2) => new Promise((s2, n2) => {
          if (t2 === null)
            return void n2(new SyntaxError());
          const i2 = t2.document.head;
          if (i2 === null)
            n2(new SyntaxError());
          else {
            const o2 = t2.document.createElement("script"), r2 = new Blob([e2], {type: "application/javascript"}), a2 = URL.createObjectURL(r2), c2 = t2.onerror, h2 = () => {
              t2.onerror = c2, URL.revokeObjectURL(a2);
            };
            t2.onerror = (e3, s3, i3, o3, r3) => s3 === a2 || s3 === t2.location.href && i3 === 1 && o3 === 1 ? (h2(), n2(r3), false) : c2 !== null ? c2(e3, s3, i3, o3, r3) : void 0, o2.onerror = () => {
              h2(), n2(new SyntaxError());
            }, o2.onload = () => {
              h2(), s2();
            }, o2.src = a2, o2.type = "module", i2.appendChild(o2);
          }
        }))(Te), _n, ((t2) => async (e2) => {
          try {
            const t3 = await fetch(e2);
            if (t3.ok)
              return [await t3.text(), t3.url];
          } catch {
          }
          throw t2();
        })(() => new DOMException("", "AbortError")), Fe, gn, Ne, new WeakMap(), new WeakMap(), ((t2, e2) => async () => {
          if (t2 === null)
            return true;
          if (e2 === null)
            return false;
          const s2 = new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'], {type: "application/javascript; charset=utf-8"}), n2 = new e2(1, 128, 8e3), i2 = URL.createObjectURL(s2);
          let o2 = false, r2 = false;
          try {
            await n2.audioWorklet.addModule(i2);
            const e3 = new t2(n2, "a", {numberOfOutputs: 0}), s3 = n2.createOscillator();
            e3.port.onmessage = () => o2 = true, e3.onprocessorerror = () => r2 = true, s3.connect(e3), await n2.startRendering();
          } catch {
          } finally {
            URL.revokeObjectURL(i2);
          }
          return o2 && !r2;
        })(vn, Ve), Te) : void 0, xn = ((t2, e2) => (s2) => t2(s2) || e2(s2))(We, Ne), wn = ((t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2, l2, p2, d2, f2, _2, m2, g2, v2, y2) => class extends f2 {
          constructor(e3, s3) {
            super(e3, s3), this._nativeContext = e3, this._audioWorklet = t2 === void 0 ? void 0 : {addModule: (e4, s4) => t2(this, e4, s4)};
          }
          get audioWorklet() {
            return this._audioWorklet;
          }
          createAnalyser() {
            return new e2(this);
          }
          createBiquadFilter() {
            return new i2(this);
          }
          createBuffer(t3, e3, n3) {
            return new s2({length: e3, numberOfChannels: t3, sampleRate: n3});
          }
          createBufferSource() {
            return new n2(this);
          }
          createChannelMerger(t3 = 6) {
            return new o2(this, {numberOfInputs: t3});
          }
          createChannelSplitter(t3 = 6) {
            return new r2(this, {numberOfOutputs: t3});
          }
          createConstantSource() {
            return new a2(this);
          }
          createConvolver() {
            return new c2(this);
          }
          createDelay(t3 = 1) {
            return new u2(this, {maxDelayTime: t3});
          }
          createDynamicsCompressor() {
            return new l2(this);
          }
          createGain() {
            return new p2(this);
          }
          createIIRFilter(t3, e3) {
            return new d2(this, {feedback: e3, feedforward: t3});
          }
          createOscillator() {
            return new _2(this);
          }
          createPanner() {
            return new m2(this);
          }
          createPeriodicWave(t3, e3, s3 = {disableNormalization: false}) {
            return new g2(this, {...s3, imag: e3, real: t3});
          }
          createStereoPanner() {
            return new v2(this);
          }
          createWaveShaper() {
            return new y2(this);
          }
          decodeAudioData(t3, e3, s3) {
            return h2(this._nativeContext, t3).then((t4) => (typeof e3 == "function" && e3(t4), t4)).catch((t4) => {
              throw typeof s3 == "function" && s3(t4), t4;
            });
          }
        })(yn, Ye, ss, fs, vs, Rs, qs, Vs, Ps, ((t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2) => (l2, p2) => {
          const d2 = r2(l2) ? l2 : o2(l2);
          if (i2.has(p2)) {
            const t3 = s2();
            return Promise.reject(t3);
          }
          try {
            i2.add(p2);
          } catch {
          }
          return e2(c2, () => c2(d2)) ? d2.decodeAudioData(p2).then((s3) => (e2(a2, () => a2(s3)) || u2(s3), t2.add(s3), s3)) : new Promise((e3, s3) => {
            const i3 = () => {
              try {
                ((t3) => {
                  const {port1: e4} = new MessageChannel();
                  e4.postMessage(t3, [t3]);
                })(p2);
              } catch {
              }
            }, o3 = (t3) => {
              s3(t3), i3();
            };
            try {
              d2.decodeAudioData(p2, (s4) => {
                typeof s4.copyFromChannel != "function" && (h2(s4), F(s4)), t2.add(s4), i3(), e3(s4);
              }, (t3) => {
                o3(t3 === null ? n2() : t3);
              });
            } catch (t3) {
              o3(t3);
            }
          });
        })(He, xe, () => new DOMException("", "DataCloneError"), () => new DOMException("", "EncodingError"), new WeakSet(), Fe, xn, R, Rt, ts, es), js, Bs, Ws, Xs, $s, Ks, cn, hn, ln, dn), bn = ((t2, e2, s2, n2) => class extends t2 {
          constructor(t3, i2) {
            const o2 = s2(t3), r2 = e2(o2, i2);
            if (n2(o2))
              throw TypeError();
            super(t3, true, r2, null), this._nativeMediaElementAudioSourceNode = r2;
          }
          get mediaElement() {
            return this._nativeMediaElementAudioSourceNode.mediaElement;
          }
        })(Ze, (t2, e2) => t2.createMediaElementSource(e2.mediaElement), Fe, Ne), Tn = ((t2, e2, s2, n2) => class extends t2 {
          constructor(t3, i2) {
            const o2 = s2(t3);
            if (n2(o2))
              throw new TypeError();
            const r2 = {...Et, ...i2}, a2 = e2(o2, r2);
            super(t3, false, a2, null), this._nativeMediaStreamAudioDestinationNode = a2;
          }
          get stream() {
            return this._nativeMediaStreamAudioDestinationNode.stream;
          }
        })(Ze, (t2, e2) => {
          const s2 = t2.createMediaStreamDestination();
          return It(s2, e2), s2.numberOfOutputs === 1 && Object.defineProperty(s2, "numberOfOutputs", {get: () => 0}), s2;
        }, Fe, Ne), Sn = ((t2, e2, s2, n2) => class extends t2 {
          constructor(t3, i2) {
            const o2 = s2(t3), r2 = e2(o2, i2);
            if (n2(o2))
              throw new TypeError();
            super(t3, true, r2, null), this._nativeMediaStreamAudioSourceNode = r2;
          }
          get mediaStream() {
            return this._nativeMediaStreamAudioSourceNode.mediaStream;
          }
        })(Ze, (t2, {mediaStream: e2}) => {
          const s2 = e2.getAudioTracks();
          s2.sort((t3, e3) => t3.id < e3.id ? -1 : t3.id > e3.id ? 1 : 0);
          const n2 = s2.slice(0, 1), i2 = t2.createMediaStreamSource(new MediaStream(n2));
          return Object.defineProperty(i2, "mediaStream", {value: e2}), i2;
        }, Fe, Ne), kn = ((t2, e2, s2) => class extends t2 {
          constructor(t3, n2) {
            const i2 = s2(t3);
            super(t3, true, e2(i2, n2), null);
          }
        })(Ze, ((t2, e2) => (s2, {mediaStreamTrack: n2}) => {
          if (typeof s2.createMediaStreamTrackSource == "function")
            return s2.createMediaStreamTrackSource(n2);
          const i2 = new MediaStream([n2]), o2 = s2.createMediaStreamSource(i2);
          if (n2.kind !== "audio")
            throw t2();
          if (e2(s2))
            throw new TypeError();
          return o2;
        })(At, Ne), Fe), Cn = ((t2, e2, s2, n2, i2, o2, r2, a2, c2) => class extends t2 {
          constructor(t3 = {}) {
            if (c2 === null)
              throw new Error("Missing the native AudioContext constructor.");
            const e3 = new c2(t3);
            if (e3 === null)
              throw n2();
            if (!G(t3.latencyHint))
              throw new TypeError(`The provided value '${t3.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);
            if (t3.sampleRate !== void 0 && e3.sampleRate !== t3.sampleRate)
              throw s2();
            super(e3, 2);
            const {latencyHint: i3} = t3, {sampleRate: o3} = e3;
            if (this._baseLatency = typeof e3.baseLatency == "number" ? e3.baseLatency : i3 === "balanced" ? 512 / o3 : i3 === "interactive" || i3 === void 0 ? 256 / o3 : i3 === "playback" ? 1024 / o3 : 128 * Math.max(2, Math.min(128, Math.round(i3 * o3 / 128))) / o3, this._nativeAudioContext = e3, c2.name === "webkitAudioContext" ? (this._nativeGainNode = e3.createGain(), this._nativeOscillatorNode = e3.createOscillator(), this._nativeGainNode.gain.value = 1e-37, this._nativeOscillatorNode.connect(this._nativeGainNode).connect(e3.destination), this._nativeOscillatorNode.start()) : (this._nativeGainNode = null, this._nativeOscillatorNode = null), this._state = null, e3.state === "running") {
              this._state = "suspended";
              const t4 = () => {
                this._state === "suspended" && (this._state = null), e3.removeEventListener("statechange", t4);
              };
              e3.addEventListener("statechange", t4);
            }
          }
          get baseLatency() {
            return this._baseLatency;
          }
          get state() {
            return this._state !== null ? this._state : this._nativeAudioContext.state;
          }
          close() {
            return this.state === "closed" ? this._nativeAudioContext.close().then(() => {
              throw e2();
            }) : (this._state === "suspended" && (this._state = null), this._nativeAudioContext.close().then(() => {
              this._nativeGainNode !== null && this._nativeOscillatorNode !== null && (this._nativeOscillatorNode.stop(), this._nativeGainNode.disconnect(), this._nativeOscillatorNode.disconnect()), W(this);
            }));
          }
          createMediaElementSource(t3) {
            return new i2(this, {mediaElement: t3});
          }
          createMediaStreamDestination() {
            return new o2(this);
          }
          createMediaStreamSource(t3) {
            return new r2(this, {mediaStream: t3});
          }
          createMediaStreamTrackSource(t3) {
            return new a2(this, {mediaStreamTrack: t3});
          }
          resume() {
            return this._state === "suspended" ? new Promise((t3, e3) => {
              const s3 = () => {
                this._nativeAudioContext.removeEventListener("statechange", s3), this._nativeAudioContext.state === "running" ? t3() : this.resume().then(t3, e3);
              };
              this._nativeAudioContext.addEventListener("statechange", s3);
            }) : this._nativeAudioContext.resume().catch((t3) => {
              if (t3 === void 0 || t3.code === 15)
                throw e2();
              throw t3;
            });
          }
          suspend() {
            return this._nativeAudioContext.suspend().catch((t3) => {
              if (t3 === void 0)
                throw e2();
              throw t3;
            });
          }
        })(wn, At, Ht, se, bn, Tn, Sn, kn, Be), An = (Dn = Hs, (t2) => {
          const e2 = Dn.get(t2);
          if (e2 === void 0)
            throw new Error("The context has no set of AudioWorkletNodes.");
          return e2;
        });
        var Dn;
        const On = (Mn = An, (t2, e2) => {
          Mn(t2).add(e2);
        });
        var Mn;
        const En = ((t2) => (e2, s2, n2 = 0, i2 = 0) => {
          const o2 = e2[n2];
          if (o2 === void 0)
            throw t2();
          return ct(s2) ? o2.connect(s2, 0, i2) : o2.connect(s2, 0);
        })(q), Rn = ((t2) => (e2, s2) => {
          t2(e2).delete(s2);
        })(An), qn = ((t2) => (e2, s2, n2, i2 = 0) => s2 === void 0 ? e2.forEach((t3) => t3.disconnect()) : typeof s2 == "number" ? St(t2, e2, s2).disconnect() : ct(s2) ? n2 === void 0 ? e2.forEach((t3) => t3.disconnect(s2)) : i2 === void 0 ? St(t2, e2, n2).disconnect(s2, 0) : St(t2, e2, n2).disconnect(s2, 0, i2) : n2 === void 0 ? e2.forEach((t3) => t3.disconnect(s2)) : St(t2, e2, n2).disconnect(s2, 0))(q), Fn = new WeakMap(), In = ((t2, e2) => (s2) => e2(t2, s2))(Fn, b), Vn = ((t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2, l2, p2) => (d2, f2, _2, g2) => {
          if (g2.numberOfInputs === 0 && g2.numberOfOutputs === 0)
            throw c2();
          const v2 = Array.isArray(g2.outputChannelCount) ? g2.outputChannelCount : Array.from(g2.outputChannelCount);
          if (v2.some((t3) => t3 < 1))
            throw c2();
          if (v2.length !== g2.numberOfOutputs)
            throw e2();
          if (g2.channelCountMode !== "explicit")
            throw c2();
          const y2 = g2.channelCount * g2.numberOfInputs, x2 = v2.reduce((t3, e3) => t3 + e3, 0), w2 = _2.parameterDescriptors === void 0 ? 0 : _2.parameterDescriptors.length;
          if (y2 + w2 > 6 || x2 > 6)
            throw c2();
          const b2 = new MessageChannel(), T2 = [], S2 = [];
          for (let t3 = 0; t3 < g2.numberOfInputs; t3 += 1)
            T2.push(r2(d2, {channelCount: g2.channelCount, channelCountMode: g2.channelCountMode, channelInterpretation: g2.channelInterpretation, gain: 1})), S2.push(i2(d2, {channelCount: g2.channelCount, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: g2.channelCount}));
          const k2 = [];
          if (_2.parameterDescriptors !== void 0)
            for (const {defaultValue: t3, maxValue: e3, minValue: s3, name: n3} of _2.parameterDescriptors) {
              const i3 = o2(d2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: g2.parameterData[n3] !== void 0 ? g2.parameterData[n3] : t3 === void 0 ? 0 : t3});
              Object.defineProperties(i3.offset, {defaultValue: {get: () => t3 === void 0 ? 0 : t3}, maxValue: {get: () => e3 === void 0 ? N : e3}, minValue: {get: () => s3 === void 0 ? V : s3}}), k2.push(i3);
            }
          const C2 = n2(d2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: Math.max(1, y2 + w2)}), A2 = Lt(f2, d2.sampleRate), D2 = a2(d2, A2, y2 + w2, Math.max(1, x2)), O2 = i2(d2, {channelCount: Math.max(1, x2), channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: Math.max(1, x2)}), M2 = [];
          for (let t3 = 0; t3 < g2.numberOfOutputs; t3 += 1)
            M2.push(n2(d2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: v2[t3]}));
          for (let t3 = 0; t3 < g2.numberOfInputs; t3 += 1) {
            T2[t3].connect(S2[t3]);
            for (let e3 = 0; e3 < g2.channelCount; e3 += 1)
              S2[t3].connect(C2, e3, t3 * g2.channelCount + e3);
          }
          const E2 = new pt(_2.parameterDescriptors === void 0 ? [] : _2.parameterDescriptors.map(({name: t3}, e3) => {
            const s3 = k2[e3];
            return s3.connect(C2, 0, y2 + e3), s3.start(0), [t3, s3.offset];
          }));
          C2.connect(D2);
          let R2 = g2.channelInterpretation, q2 = null;
          const F2 = g2.numberOfOutputs === 0 ? [D2] : M2, I2 = {get bufferSize() {
            return A2;
          }, get channelCount() {
            return g2.channelCount;
          }, set channelCount(t3) {
            throw s2();
          }, get channelCountMode() {
            return g2.channelCountMode;
          }, set channelCountMode(t3) {
            throw s2();
          }, get channelInterpretation() {
            return R2;
          }, set channelInterpretation(t3) {
            for (const e3 of T2)
              e3.channelInterpretation = t3;
            R2 = t3;
          }, get context() {
            return D2.context;
          }, get inputs() {
            return T2;
          }, get numberOfInputs() {
            return g2.numberOfInputs;
          }, get numberOfOutputs() {
            return g2.numberOfOutputs;
          }, get onprocessorerror() {
            return q2;
          }, set onprocessorerror(t3) {
            typeof q2 == "function" && I2.removeEventListener("processorerror", q2), q2 = typeof t3 == "function" ? t3 : null, typeof q2 == "function" && I2.addEventListener("processorerror", q2);
          }, get parameters() {
            return E2;
          }, get port() {
            return b2.port2;
          }, addEventListener: (...t3) => D2.addEventListener(t3[0], t3[1], t3[2]), connect: t2.bind(null, F2), disconnect: h2.bind(null, F2), dispatchEvent: (...t3) => D2.dispatchEvent(t3[0]), removeEventListener: (...t3) => D2.removeEventListener(t3[0], t3[1], t3[2])}, P2 = new Map();
          var j2, L2;
          b2.port1.addEventListener = (j2 = b2.port1.addEventListener, (...t3) => {
            if (t3[0] === "message") {
              const e3 = typeof t3[1] == "function" ? t3[1] : typeof t3[1] == "object" && t3[1] !== null && typeof t3[1].handleEvent == "function" ? t3[1].handleEvent : null;
              if (e3 !== null) {
                const s3 = P2.get(t3[1]);
                s3 !== void 0 ? t3[1] = s3 : (t3[1] = (t4) => {
                  u2(d2.currentTime, d2.sampleRate, () => e3(t4));
                }, P2.set(e3, t3[1]));
              }
            }
            return j2.call(b2.port1, t3[0], t3[1], t3[2]);
          }), b2.port1.removeEventListener = (L2 = b2.port1.removeEventListener, (...t3) => {
            if (t3[0] === "message") {
              const e3 = P2.get(t3[1]);
              e3 !== void 0 && (P2.delete(t3[1]), t3[1] = e3);
            }
            return L2.call(b2.port1, t3[0], t3[1], t3[2]);
          });
          let z2 = null;
          Object.defineProperty(b2.port1, "onmessage", {get: () => z2, set: (t3) => {
            typeof z2 == "function" && b2.port1.removeEventListener("message", z2), z2 = typeof t3 == "function" ? t3 : null, typeof z2 == "function" && (b2.port1.addEventListener("message", z2), b2.port1.start());
          }}), _2.prototype.port = b2.port1;
          let B2 = null;
          ((t3, e3, s3, n3) => {
            let i3 = m.get(t3);
            i3 === void 0 && (i3 = new WeakMap(), m.set(t3, i3));
            const o3 = zt(s3, n3);
            return i3.set(e3, o3), o3;
          })(d2, I2, _2, g2).then((t3) => B2 = t3);
          const W2 = mt(g2.numberOfInputs, g2.channelCount), G2 = mt(g2.numberOfOutputs, v2), U2 = _2.parameterDescriptors === void 0 ? [] : _2.parameterDescriptors.reduce((t3, {name: e3}) => ({...t3, [e3]: new Float32Array(128)}), {});
          let Q2 = true;
          const Z2 = () => {
            g2.numberOfOutputs > 0 && D2.disconnect(O2);
            for (let t3 = 0, e3 = 0; t3 < g2.numberOfOutputs; t3 += 1) {
              const s3 = M2[t3];
              for (let n3 = 0; n3 < v2[t3]; n3 += 1)
                O2.disconnect(s3, e3 + n3, n3);
              e3 += v2[t3];
            }
          }, X2 = new Map();
          D2.onaudioprocess = ({inputBuffer: t3, outputBuffer: e3}) => {
            if (B2 !== null) {
              const s3 = l2(I2);
              for (let n3 = 0; n3 < A2; n3 += 128) {
                for (let e4 = 0; e4 < g2.numberOfInputs; e4 += 1)
                  for (let s4 = 0; s4 < g2.channelCount; s4 += 1)
                    ft(t3, W2[e4], s4, s4, n3);
                _2.parameterDescriptors !== void 0 && _2.parameterDescriptors.forEach(({name: e4}, s4) => {
                  ft(t3, U2, e4, y2 + s4, n3);
                });
                for (let t4 = 0; t4 < g2.numberOfInputs; t4 += 1)
                  for (let e4 = 0; e4 < v2[t4]; e4 += 1)
                    G2[t4][e4].byteLength === 0 && (G2[t4][e4] = new Float32Array(128));
                try {
                  const t4 = W2.map((t5, e4) => {
                    if (s3[e4].size > 0)
                      return X2.set(e4, A2 / 128), t5;
                    const n4 = X2.get(e4);
                    return n4 === void 0 ? [] : (t5.every((t6) => t6.every((t7) => t7 === 0)) && (n4 === 1 ? X2.delete(e4) : X2.set(e4, n4 - 1)), t5);
                  }), i3 = u2(d2.currentTime + n3 / d2.sampleRate, d2.sampleRate, () => B2.process(t4, G2, U2));
                  Q2 = i3;
                  for (let t5 = 0, s4 = 0; t5 < g2.numberOfOutputs; t5 += 1) {
                    for (let i4 = 0; i4 < v2[t5]; i4 += 1)
                      _t(e3, G2[t5], i4, s4 + i4, n3);
                    s4 += v2[t5];
                  }
                } catch (t4) {
                  Q2 = false, I2.dispatchEvent(new ErrorEvent("processorerror", {colno: t4.colno, filename: t4.filename, lineno: t4.lineno, message: t4.message}));
                }
                if (!Q2) {
                  for (let t4 = 0; t4 < g2.numberOfInputs; t4 += 1) {
                    T2[t4].disconnect(S2[t4]);
                    for (let e4 = 0; e4 < g2.channelCount; e4 += 1)
                      S2[n3].disconnect(C2, e4, t4 * g2.channelCount + e4);
                  }
                  if (_2.parameterDescriptors !== void 0) {
                    const t4 = _2.parameterDescriptors.length;
                    for (let e4 = 0; e4 < t4; e4 += 1) {
                      const t5 = k2[e4];
                      t5.disconnect(C2, 0, y2 + e4), t5.stop();
                    }
                  }
                  C2.disconnect(D2), D2.onaudioprocess = null, Y2 ? Z2() : J2();
                  break;
                }
              }
            }
          };
          let Y2 = false;
          const H2 = r2(d2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0}), $2 = () => D2.connect(H2).connect(d2.destination), J2 = () => {
            D2.disconnect(H2), H2.disconnect();
          };
          return $2(), p2(I2, () => {
            if (Q2) {
              J2(), g2.numberOfOutputs > 0 && D2.connect(O2);
              for (let t3 = 0, e3 = 0; t3 < g2.numberOfOutputs; t3 += 1) {
                const s3 = M2[t3];
                for (let n3 = 0; n3 < v2[t3]; n3 += 1)
                  O2.connect(s3, e3 + n3, n3);
                e3 += v2[t3];
              }
            }
            Y2 = true;
          }, () => {
            Q2 && ($2(), Z2()), Y2 = false;
          });
        })(En, q, At, Es, Wt, Is, Qt, Yt, Ht, qn, _n, In, As), Nn = ((t2, e2, s2, n2, i2) => (o2, r2, a2, c2, h2, u2) => {
          if (a2 !== null)
            try {
              const e3 = new a2(o2, c2, u2), n3 = new Map();
              let r3 = null;
              if (Object.defineProperties(e3, {channelCount: {get: () => u2.channelCount, set: () => {
                throw t2();
              }}, channelCountMode: {get: () => "explicit", set: () => {
                throw t2();
              }}, onprocessorerror: {get: () => r3, set: (t3) => {
                typeof r3 == "function" && e3.removeEventListener("processorerror", r3), r3 = typeof t3 == "function" ? t3 : null, typeof r3 == "function" && e3.addEventListener("processorerror", r3);
              }}}), e3.addEventListener = (p2 = e3.addEventListener, (...t3) => {
                if (t3[0] === "processorerror") {
                  const e4 = typeof t3[1] == "function" ? t3[1] : typeof t3[1] == "object" && t3[1] !== null && typeof t3[1].handleEvent == "function" ? t3[1].handleEvent : null;
                  if (e4 !== null) {
                    const s3 = n3.get(t3[1]);
                    s3 !== void 0 ? t3[1] = s3 : (t3[1] = (s4) => {
                      s4.type === "error" ? (Object.defineProperties(s4, {type: {value: "processorerror"}}), e4(s4)) : e4(new ErrorEvent(t3[0], {...s4}));
                    }, n3.set(e4, t3[1]));
                  }
                }
                return p2.call(e3, "error", t3[1], t3[2]), p2.call(e3, ...t3);
              }), e3.removeEventListener = (l2 = e3.removeEventListener, (...t3) => {
                if (t3[0] === "processorerror") {
                  const e4 = n3.get(t3[1]);
                  e4 !== void 0 && (n3.delete(t3[1]), t3[1] = e4);
                }
                return l2.call(e3, "error", t3[1], t3[2]), l2.call(e3, t3[0], t3[1], t3[2]);
              }), u2.numberOfOutputs !== 0) {
                const t3 = s2(o2, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0});
                e3.connect(t3).connect(o2.destination);
                return i2(e3, () => t3.disconnect(), () => t3.connect(o2.destination));
              }
              return e3;
            } catch (t3) {
              if (t3.code === 11)
                throw n2();
              throw t3;
            }
          var l2, p2;
          if (h2 === void 0)
            throw n2();
          return ((t3) => {
            const {port1: e3} = new MessageChannel();
            try {
              e3.postMessage(t3);
            } finally {
              e3.close();
            }
          })(u2), e2(o2, r2, h2, u2);
        })(At, Vn, Qt, Ht, As), Pn = ((t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2, l2, p2, d2, f2, _2) => (m2, g2, v2) => {
          const y2 = new WeakMap();
          let x2 = null;
          return {render(w2, b2, T2) {
            a2(b2, w2);
            const S2 = y2.get(b2);
            return S2 !== void 0 ? Promise.resolve(S2) : (async (a3, w3, b3) => {
              let T3 = u2(a3), S3 = null;
              const k2 = E(T3, w3), C2 = Array.isArray(g2.outputChannelCount) ? g2.outputChannelCount : Array.from(g2.outputChannelCount);
              if (l2 === null) {
                const t3 = C2.reduce((t4, e3) => t4 + e3, 0), s3 = i2(w3, {channelCount: Math.max(1, t3), channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: Math.max(1, t3)}), o3 = [];
                for (let t4 = 0; t4 < a3.numberOfOutputs; t4 += 1)
                  o3.push(n2(w3, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: C2[t4]}));
                const h3 = r2(w3, {channelCount: g2.channelCount, channelCountMode: g2.channelCountMode, channelInterpretation: g2.channelInterpretation, gain: 1});
                h3.connect = e2.bind(null, o3), h3.disconnect = c2.bind(null, o3), S3 = [s3, o3, h3];
              } else
                k2 || (T3 = new l2(w3, m2));
              if (y2.set(w3, S3 === null ? T3 : S3[2]), S3 !== null) {
                if (x2 === null) {
                  if (v2 === void 0)
                    throw new Error("Missing the processor constructor.");
                  if (p2 === null)
                    throw new Error("Missing the native OfflineAudioContext constructor.");
                  const t4 = a3.channelCount * a3.numberOfInputs, e4 = v2.parameterDescriptors === void 0 ? 0 : v2.parameterDescriptors.length, s3 = t4 + e4, c4 = async () => {
                    const c5 = new p2(s3, 128 * Math.ceil(a3.context.length / 128), w3.sampleRate), h3 = [], u4 = [];
                    for (let t5 = 0; t5 < g2.numberOfInputs; t5 += 1)
                      h3.push(r2(c5, {channelCount: g2.channelCount, channelCountMode: g2.channelCountMode, channelInterpretation: g2.channelInterpretation, gain: 1})), u4.push(i2(c5, {channelCount: g2.channelCount, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: g2.channelCount}));
                    const l4 = await Promise.all(Array.from(a3.parameters.values()).map(async (t5) => {
                      const e5 = o2(c5, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: t5.value});
                      return await d2(c5, t5, e5.offset, b3), e5;
                    })), m3 = n2(c5, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: Math.max(1, t4 + e4)});
                    for (let t5 = 0; t5 < g2.numberOfInputs; t5 += 1) {
                      h3[t5].connect(u4[t5]);
                      for (let e5 = 0; e5 < g2.channelCount; e5 += 1)
                        u4[t5].connect(m3, e5, t5 * g2.channelCount + e5);
                    }
                    for (const [e5, s4] of l4.entries())
                      s4.connect(m3, 0, t4 + e5), s4.start(0);
                    return m3.connect(c5.destination), await Promise.all(h3.map((t5) => f2(a3, c5, t5, b3))), _2(c5);
                  };
                  x2 = gt(a3, s3 === 0 ? null : await c4(), w3, g2, C2, v2, h2);
                }
                const t3 = await x2, e3 = s2(w3, {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}), [c3, u3, l3] = S3;
                t3 !== null && (e3.buffer = t3, e3.start(0)), e3.connect(c3);
                for (let t4 = 0, e4 = 0; t4 < a3.numberOfOutputs; t4 += 1) {
                  const s3 = u3[t4];
                  for (let n3 = 0; n3 < C2[t4]; n3 += 1)
                    c3.connect(s3, e4 + n3, n3);
                  e4 += C2[t4];
                }
                return l3;
              }
              if (k2)
                for (const [e3, s3] of a3.parameters.entries())
                  await t2(w3, s3, T3.parameters.get(e3), b3);
              else
                for (const [t3, e3] of a3.parameters.entries())
                  await d2(w3, e3, T3.parameters.get(t3), b3);
              return await f2(a3, w3, T3, b3), T3;
            })(w2, b2, T2);
          }};
        })(as, En, cs, Es, Wt, Is, Qt, Rn, qn, _n, st, vn, Ve, us, Oe, Us), jn = ((t2) => (e2) => t2.get(e2))(mn), Ln = ((t2) => (e2, s2) => {
          t2.set(e2, s2);
        })(Fn), zn = fn ? ((t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2, l2, p2) => class extends e2 {
          constructor(e3, p3, d2) {
            var f2;
            const m2 = a2(e3), g2 = c2(m2), v2 = u2({...dt, ...d2}), y2 = _.get(m2), x2 = y2 == null ? void 0 : y2.get(p3), w2 = g2 || m2.state !== "closed" ? m2 : (f2 = r2(m2)) !== null && f2 !== void 0 ? f2 : m2, b2 = i2(w2, g2 ? null : e3.baseLatency, h2, p3, x2, v2);
            super(e3, true, b2, g2 ? n2(p3, v2, x2) : null);
            const T2 = [];
            b2.parameters.forEach((t3, e4) => {
              const n3 = s2(this, g2, t3);
              T2.push([e4, n3]);
            }), this._nativeAudioWorkletNode = b2, this._onprocessorerror = null, this._parameters = new pt(T2), g2 && t2(m2, this);
            const {activeInputs: S2} = o2(this);
            l2(b2, S2);
          }
          get onprocessorerror() {
            return this._onprocessorerror;
          }
          set onprocessorerror(t3) {
            const e3 = typeof t3 == "function" ? p2(this, t3) : null;
            this._nativeAudioWorkletNode.onprocessorerror = e3;
            const s3 = this._nativeAudioWorkletNode.onprocessorerror;
            this._onprocessorerror = s3 !== null && s3 === e3 ? t3 : s3;
          }
          get parameters() {
            return this._parameters === null ? this._nativeAudioWorkletNode.parameters : this._parameters;
          }
          get port() {
            return this._nativeAudioWorkletNode.port;
          }
        })(On, Ze, ps, Pn, Nn, L, jn, Fe, Ne, vn, (t2) => ({...t2, outputChannelCount: t2.outputChannelCount !== void 0 ? t2.outputChannelCount : t2.numberOfInputs === 1 && t2.numberOfOutputs === 1 ? [t2.channelCount] : Array.from({length: t2.numberOfOutputs}, () => 1)}), Ln, de) : void 0, Bn = (((t2, e2, s2, n2, i2) => {
        })(At, Ht, se, $s, Be), ((t2, e2) => (s2, n2, i2) => {
          if (e2 === null)
            throw new Error("Missing the native OfflineAudioContext constructor.");
          try {
            return new e2(s2, n2, i2);
          } catch (e3) {
            if (e3.name === "SyntaxError")
              throw t2();
            throw e3;
          }
        })(Ht, Ve)), Wn = ((t2, e2, s2, n2, i2, o2, r2, a2) => {
          const c2 = [];
          return (h2, u2) => s2(h2).render(h2, u2, c2).then(() => Promise.all(Array.from(n2(u2)).map((t3) => s2(t3).render(t3, u2, c2)))).then(() => i2(u2)).then((s3) => (typeof s3.copyFromChannel != "function" ? (r2(s3), F(s3)) : e2(o2, () => o2(s3)) || a2(s3), t2.add(s3), s3));
        })(He, xe, Ae, An, Us, R, ts, es), Gn = (((t2, e2, s2, n2, i2) => {
        })(xe, At, Bn, $s, Wn), ((t2, e2, s2, n2, i2) => class extends t2 {
          constructor(t3, s3, i3) {
            let o2;
            if (typeof t3 == "number" && s3 !== void 0 && i3 !== void 0)
              o2 = {length: s3, numberOfChannels: t3, sampleRate: i3};
            else {
              if (typeof t3 != "object")
                throw new Error("The given parameters are not valid.");
              o2 = t3;
            }
            const {length: r2, numberOfChannels: a2, sampleRate: c2} = {...$t, ...o2}, h2 = n2(a2, r2, c2);
            e2(Rt, () => Rt(h2)) || h2.addEventListener("statechange", (() => {
              let t4 = 0;
              const e3 = (s4) => {
                this._state === "running" && (t4 > 0 ? (h2.removeEventListener("statechange", e3), s4.stopImmediatePropagation(), this._waitForThePromiseToSettle(s4)) : t4 += 1);
              };
              return e3;
            })()), super(h2, a2), this._length = r2, this._nativeOfflineAudioContext = h2, this._state = null;
          }
          get length() {
            return this._nativeOfflineAudioContext.length === void 0 ? this._length : this._nativeOfflineAudioContext.length;
          }
          get state() {
            return this._state === null ? this._nativeOfflineAudioContext.state : this._state;
          }
          startRendering() {
            return this._state === "running" ? Promise.reject(s2()) : (this._state = "running", i2(this.destination, this._nativeOfflineAudioContext).finally(() => {
              this._state = null, W(this);
            }));
          }
          _waitForThePromiseToSettle(t3) {
            this._state === null ? this._nativeOfflineAudioContext.dispatchEvent(t3) : setTimeout(() => this._waitForThePromiseToSettle(t3));
          }
        })(wn, xe, At, Bn, Wn)), Un = ((t2, e2) => (s2) => {
          const n2 = t2.get(s2);
          return e2(n2) || e2(s2);
        })(p, We), Qn = (Zn = h, Xn = Ue, (t2) => Zn.has(t2) || Xn(t2));
        var Zn, Xn;
        const Yn = (Hn = l, $n = Qe, (t2) => Hn.has(t2) || $n(t2));
        var Hn, $n;
        const Jn = ((t2, e2) => (s2) => {
          const n2 = t2.get(s2);
          return e2(n2) || e2(s2);
        })(p, Ne), Kn = () => (async (t2, e2, s2, n2, i2, o2, r2, a2, c2, h2, u2, l2, p2, d2, f2, _2) => {
          if (t2(e2, e2) && t2(s2, s2) && t2(i2, i2) && t2(o2, o2) && t2(a2, a2) && t2(c2, c2) && t2(h2, h2) && t2(u2, u2) && t2(l2, l2) && t2(p2, p2) && t2(d2, d2)) {
            return (await Promise.all([t2(n2, n2), t2(r2, r2), t2(f2, f2), t2(_2, _2)])).every((t3) => t3);
          }
          return false;
        })(xe, ((t2) => () => {
          if (t2 === null)
            return false;
          const e2 = new t2(1, 1, 44100).createBuffer(1, 1, 44100);
          if (e2.copyToChannel === void 0)
            return true;
          const s2 = new Float32Array(2);
          try {
            e2.copyFromChannel(s2, 0, 0);
          } catch {
            return false;
          }
          return true;
        })(Ve), ((t2) => () => {
          if (t2 === null)
            return false;
          if (t2.prototype !== void 0 && t2.prototype.close !== void 0)
            return true;
          const e2 = new t2(), s2 = e2.close !== void 0;
          try {
            e2.close();
          } catch {
          }
          return s2;
        })(Be), ((t2) => () => {
          if (t2 === null)
            return Promise.resolve(false);
          const e2 = new t2(1, 1, 44100);
          return new Promise((t3) => {
            let s2 = true;
            const n2 = (n3) => {
              s2 && (s2 = false, e2.startRendering(), t3(n3 instanceof TypeError));
            };
            let i2;
            try {
              i2 = e2.decodeAudioData(null, () => {
              }, n2);
            } catch (t4) {
              n2(t4);
            }
            i2 !== void 0 && i2.catch(n2);
          });
        })(Ve), ((t2) => () => {
          if (t2 === null)
            return false;
          let e2;
          try {
            e2 = new t2({latencyHint: "balanced"});
          } catch {
            return false;
          }
          return e2.close(), true;
        })(Be), ((t2) => () => {
          if (t2 === null)
            return false;
          const e2 = new t2(1, 1, 44100).createGain(), s2 = e2.connect(e2) === e2;
          return e2.disconnect(e2), s2;
        })(Ve), ((t2, e2) => async () => {
          if (t2 === null)
            return true;
          if (e2 === null)
            return false;
          const s2 = new Blob(['class A extends AudioWorkletProcessor{process(){this.port.postMessage(0)}}registerProcessor("a",A)'], {type: "application/javascript; charset=utf-8"}), n2 = new e2(1, 128, 8e3), i2 = URL.createObjectURL(s2);
          let o2 = false;
          try {
            await n2.audioWorklet.addModule(i2);
            const e3 = new t2(n2, "a", {numberOfOutputs: 0}), s3 = n2.createOscillator();
            e3.port.onmessage = () => o2 = true, s3.connect(e3), s3.start(0), await n2.startRendering(), o2 || await new Promise((t3) => setTimeout(t3, 5));
          } catch {
          } finally {
            URL.revokeObjectURL(i2);
          }
          return o2;
        })(vn, Ve), ((t2) => () => {
          if (t2 === null)
            return false;
          const e2 = new t2(1, 1, 44100).createChannelMerger();
          if (e2.channelCountMode === "max")
            return true;
          try {
            e2.channelCount = 2;
          } catch {
            return true;
          }
          return false;
        })(Ve), ((t2) => () => {
          if (t2 === null)
            return false;
          const e2 = new t2(1, 1, 44100);
          if (e2.createConstantSource === void 0)
            return true;
          return e2.createConstantSource().offset.maxValue !== Number.POSITIVE_INFINITY;
        })(Ve), ((t2) => () => {
          if (t2 === null)
            return false;
          const e2 = new t2(1, 1, 44100), s2 = e2.createConvolver();
          s2.buffer = e2.createBuffer(1, 1, e2.sampleRate);
          try {
            s2.buffer = e2.createBuffer(1, 1, e2.sampleRate);
          } catch {
            return false;
          }
          return true;
        })(Ve), ((t2) => () => {
          if (t2 === null)
            return false;
          const e2 = new t2(1, 1, 44100).createConvolver();
          try {
            e2.channelCount = 1;
          } catch {
            return false;
          }
          return true;
        })(Ve), ue, ((t2) => () => t2 !== null && t2.hasOwnProperty("isSecureContext"))(Te), ((t2) => () => {
          if (t2 === null)
            return false;
          const e2 = new t2();
          try {
            return e2.createMediaStreamSource(new MediaStream()), false;
          } catch (t3) {
            return true;
          }
        })(Be), ((t2) => () => {
          if (t2 === null)
            return Promise.resolve(false);
          const e2 = new t2(1, 1, 44100);
          if (e2.createStereoPanner === void 0)
            return Promise.resolve(true);
          if (e2.createConstantSource === void 0)
            return Promise.resolve(true);
          const s2 = e2.createConstantSource(), n2 = e2.createStereoPanner();
          return s2.channelCount = 1, s2.offset.value = 1, n2.channelCount = 1, s2.start(), s2.connect(n2).connect(e2.destination), e2.startRendering().then((t3) => t3.getChannelData(0)[0] !== 1);
        })(Ve), le);
        function ti(t2, e2) {
          if (!t2)
            throw new Error(e2);
        }
        function ei(t2, e2, s2 = 1 / 0) {
          if (!(e2 <= t2 && t2 <= s2))
            throw new RangeError(`Value must be within [${e2}, ${s2}], got: ${t2}`);
        }
        function si(t2) {
          t2.isOffline || t2.state === "running" || ri('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.');
        }
        let ni = console;
        function ii(t2) {
          ni = t2;
        }
        function oi(...t2) {
          ni.log(...t2);
        }
        function ri(...t2) {
          ni.warn(...t2);
        }
        function ai(t2) {
          return t2 === void 0;
        }
        function ci(t2) {
          return !ai(t2);
        }
        function hi(t2) {
          return typeof t2 == "function";
        }
        function ui(t2) {
          return typeof t2 == "number";
        }
        function li(t2) {
          return Object.prototype.toString.call(t2) === "[object Object]" && t2.constructor === Object;
        }
        function pi(t2) {
          return typeof t2 == "boolean";
        }
        function di(t2) {
          return Array.isArray(t2);
        }
        function fi(t2) {
          return typeof t2 == "string";
        }
        function _i(t2) {
          return fi(t2) && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(t2);
        }
        const mi = typeof self == "object" ? self : null, gi = mi && (mi.hasOwnProperty("AudioContext") || mi.hasOwnProperty("webkitAudioContext"));
        function vi(t2, e2, s2, n2) {
          var i2, o2 = arguments.length, r2 = o2 < 3 ? e2 : n2 === null ? n2 = Object.getOwnPropertyDescriptor(e2, s2) : n2;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
            r2 = Reflect.decorate(t2, e2, s2, n2);
          else
            for (var a2 = t2.length - 1; a2 >= 0; a2--)
              (i2 = t2[a2]) && (r2 = (o2 < 3 ? i2(r2) : o2 > 3 ? i2(e2, s2, r2) : i2(e2, s2)) || r2);
          return o2 > 3 && r2 && Object.defineProperty(e2, s2, r2), r2;
        }
        function yi(t2, e2, s2, n2) {
          return new (s2 || (s2 = Promise))(function(i2, o2) {
            function r2(t3) {
              try {
                c2(n2.next(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function a2(t3) {
              try {
                c2(n2.throw(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function c2(t3) {
              var e3;
              t3.done ? i2(t3.value) : (e3 = t3.value, e3 instanceof s2 ? e3 : new s2(function(t4) {
                t4(e3);
              })).then(r2, a2);
            }
            c2((n2 = n2.apply(t2, e2 || [])).next());
          });
        }
        Object.create;
        Object.create;
        class xi {
          constructor(t2, e2, s2) {
            this._callback = t2, this._type = e2, this._updateInterval = s2, this._createClock();
          }
          _createWorker() {
            const t2 = new Blob([`
			// the initial timeout time
			let timeoutTime =  ${(1e3 * this._updateInterval).toFixed(1)};
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`], {type: "text/javascript"}), e2 = URL.createObjectURL(t2), s2 = new Worker(e2);
            s2.onmessage = this._callback.bind(this), this._worker = s2;
          }
          _createTimeout() {
            this._timeout = setTimeout(() => {
              this._createTimeout(), this._callback();
            }, 1e3 * this._updateInterval);
          }
          _createClock() {
            if (this._type === "worker")
              try {
                this._createWorker();
              } catch (t2) {
                this._type = "timeout", this._createClock();
              }
            else
              this._type === "timeout" && this._createTimeout();
          }
          _disposeClock() {
            this._timeout && (clearTimeout(this._timeout), this._timeout = 0), this._worker && (this._worker.terminate(), this._worker.onmessage = null);
          }
          get updateInterval() {
            return this._updateInterval;
          }
          set updateInterval(t2) {
            this._updateInterval = Math.max(t2, 128 / 44100), this._type === "worker" && this._worker.postMessage(Math.max(1e3 * t2, 1));
          }
          get type() {
            return this._type;
          }
          set type(t2) {
            this._disposeClock(), this._type = t2, this._createClock();
          }
          dispose() {
            this._disposeClock();
          }
        }
        function wi(t2) {
          return Yn(t2);
        }
        function bi(t2) {
          return Qn(t2);
        }
        function Ti(t2) {
          return Jn(t2);
        }
        function Si(t2) {
          return Un(t2);
        }
        function ki(t2) {
          return t2 instanceof AudioBuffer;
        }
        function Ci(t2, e2) {
          return t2 === "value" || wi(e2) || bi(e2) || ki(e2);
        }
        function Ai(t2, ...e2) {
          if (!e2.length)
            return t2;
          const s2 = e2.shift();
          if (li(t2) && li(s2))
            for (const e3 in s2)
              Ci(e3, s2[e3]) ? t2[e3] = s2[e3] : li(s2[e3]) ? (t2[e3] || Object.assign(t2, {[e3]: {}}), Ai(t2[e3], s2[e3])) : Object.assign(t2, {[e3]: s2[e3]});
          return Ai(t2, ...e2);
        }
        function Di(t2, e2, s2 = [], n2) {
          const i2 = {}, o2 = Array.from(e2);
          if (li(o2[0]) && n2 && !Reflect.has(o2[0], n2)) {
            Object.keys(o2[0]).some((e3) => Reflect.has(t2, e3)) || (Ai(i2, {[n2]: o2[0]}), s2.splice(s2.indexOf(n2), 1), o2.shift());
          }
          if (o2.length === 1 && li(o2[0]))
            Ai(i2, o2[0]);
          else
            for (let t3 = 0; t3 < s2.length; t3++)
              ci(o2[t3]) && (i2[s2[t3]] = o2[t3]);
          return Ai(t2, i2);
        }
        function Oi(t2, e2) {
          return ai(t2) ? e2 : t2;
        }
        function Mi(t2, e2) {
          return e2.forEach((e3) => {
            Reflect.has(t2, e3) && delete t2[e3];
          }), t2;
        }
        class Ei {
          constructor() {
            this.debug = false, this._wasDisposed = false;
          }
          static getDefaults() {
            return {};
          }
          log(...t2) {
            (this.debug || mi && this.toString() === mi.TONE_DEBUG_CLASS) && oi(this, ...t2);
          }
          dispose() {
            return this._wasDisposed = true, this;
          }
          get disposed() {
            return this._wasDisposed;
          }
          toString() {
            return this.name;
          }
        }
        Ei.version = o;
        function Ri(t2, e2) {
          return t2 > e2 + 1e-6;
        }
        function qi(t2, e2) {
          return Ri(t2, e2) || Ii(t2, e2);
        }
        function Fi(t2, e2) {
          return t2 + 1e-6 < e2;
        }
        function Ii(t2, e2) {
          return Math.abs(t2 - e2) < 1e-6;
        }
        function Vi(t2, e2, s2) {
          return Math.max(Math.min(t2, s2), e2);
        }
        class Ni extends Ei {
          constructor() {
            super(), this.name = "Timeline", this._timeline = [];
            const t2 = Di(Ni.getDefaults(), arguments, ["memory"]);
            this.memory = t2.memory, this.increasing = t2.increasing;
          }
          static getDefaults() {
            return {memory: 1 / 0, increasing: false};
          }
          get length() {
            return this._timeline.length;
          }
          add(t2) {
            if (ti(Reflect.has(t2, "time"), "Timeline: events must have a time attribute"), t2.time = t2.time.valueOf(), this.increasing && this.length) {
              const e2 = this._timeline[this.length - 1];
              ti(qi(t2.time, e2.time), "The time must be greater than or equal to the last scheduled time"), this._timeline.push(t2);
            } else {
              const e2 = this._search(t2.time);
              this._timeline.splice(e2 + 1, 0, t2);
            }
            if (this.length > this.memory) {
              const t3 = this.length - this.memory;
              this._timeline.splice(0, t3);
            }
            return this;
          }
          remove(t2) {
            const e2 = this._timeline.indexOf(t2);
            return e2 !== -1 && this._timeline.splice(e2, 1), this;
          }
          get(t2, e2 = "time") {
            const s2 = this._search(t2, e2);
            return s2 !== -1 ? this._timeline[s2] : null;
          }
          peek() {
            return this._timeline[0];
          }
          shift() {
            return this._timeline.shift();
          }
          getAfter(t2, e2 = "time") {
            const s2 = this._search(t2, e2);
            return s2 + 1 < this._timeline.length ? this._timeline[s2 + 1] : null;
          }
          getBefore(t2) {
            const e2 = this._timeline.length;
            if (e2 > 0 && this._timeline[e2 - 1].time < t2)
              return this._timeline[e2 - 1];
            const s2 = this._search(t2);
            return s2 - 1 >= 0 ? this._timeline[s2 - 1] : null;
          }
          cancel(t2) {
            if (this._timeline.length > 1) {
              let e2 = this._search(t2);
              if (e2 >= 0)
                if (Ii(this._timeline[e2].time, t2)) {
                  for (let s2 = e2; s2 >= 0 && Ii(this._timeline[s2].time, t2); s2--)
                    e2 = s2;
                  this._timeline = this._timeline.slice(0, e2);
                } else
                  this._timeline = this._timeline.slice(0, e2 + 1);
              else
                this._timeline = [];
            } else
              this._timeline.length === 1 && qi(this._timeline[0].time, t2) && (this._timeline = []);
            return this;
          }
          cancelBefore(t2) {
            const e2 = this._search(t2);
            return e2 >= 0 && (this._timeline = this._timeline.slice(e2 + 1)), this;
          }
          previousEvent(t2) {
            const e2 = this._timeline.indexOf(t2);
            return e2 > 0 ? this._timeline[e2 - 1] : null;
          }
          _search(t2, e2 = "time") {
            if (this._timeline.length === 0)
              return -1;
            let s2 = 0;
            const n2 = this._timeline.length;
            let i2 = n2;
            if (n2 > 0 && this._timeline[n2 - 1][e2] <= t2)
              return n2 - 1;
            for (; s2 < i2; ) {
              let n3 = Math.floor(s2 + (i2 - s2) / 2);
              const o2 = this._timeline[n3], r2 = this._timeline[n3 + 1];
              if (Ii(o2[e2], t2)) {
                for (let s3 = n3; s3 < this._timeline.length; s3++) {
                  if (!Ii(this._timeline[s3][e2], t2))
                    break;
                  n3 = s3;
                }
                return n3;
              }
              if (Fi(o2[e2], t2) && Ri(r2[e2], t2))
                return n3;
              Ri(o2[e2], t2) ? i2 = n3 : s2 = n3 + 1;
            }
            return -1;
          }
          _iterate(t2, e2 = 0, s2 = this._timeline.length - 1) {
            this._timeline.slice(e2, s2 + 1).forEach(t2);
          }
          forEach(t2) {
            return this._iterate(t2), this;
          }
          forEachBefore(t2, e2) {
            const s2 = this._search(t2);
            return s2 !== -1 && this._iterate(e2, 0, s2), this;
          }
          forEachAfter(t2, e2) {
            const s2 = this._search(t2);
            return this._iterate(e2, s2 + 1), this;
          }
          forEachBetween(t2, e2, s2) {
            let n2 = this._search(t2), i2 = this._search(e2);
            return n2 !== -1 && i2 !== -1 ? (this._timeline[n2].time !== t2 && (n2 += 1), this._timeline[i2].time === e2 && (i2 -= 1), this._iterate(s2, n2, i2)) : n2 === -1 && this._iterate(s2, 0, i2), this;
          }
          forEachFrom(t2, e2) {
            let s2 = this._search(t2);
            for (; s2 >= 0 && this._timeline[s2].time >= t2; )
              s2--;
            return this._iterate(e2, s2 + 1), this;
          }
          forEachAtTime(t2, e2) {
            const s2 = this._search(t2);
            if (s2 !== -1 && Ii(this._timeline[s2].time, t2)) {
              let n2 = s2;
              for (let e3 = s2; e3 >= 0 && Ii(this._timeline[e3].time, t2); e3--)
                n2 = e3;
              this._iterate((t3) => {
                e2(t3);
              }, n2, s2);
            }
            return this;
          }
          dispose() {
            return super.dispose(), this._timeline = [], this;
          }
        }
        const Pi = [];
        function ji(t2) {
          Pi.push(t2);
        }
        const Li = [];
        function zi(t2) {
          Li.push(t2);
        }
        class Bi extends Ei {
          constructor() {
            super(...arguments), this.name = "Emitter";
          }
          on(t2, e2) {
            return t2.split(/\W+/).forEach((t3) => {
              ai(this._events) && (this._events = {}), this._events.hasOwnProperty(t3) || (this._events[t3] = []), this._events[t3].push(e2);
            }), this;
          }
          once(t2, e2) {
            const s2 = (...n2) => {
              e2(...n2), this.off(t2, s2);
            };
            return this.on(t2, s2), this;
          }
          off(t2, e2) {
            return t2.split(/\W+/).forEach((s2) => {
              if (ai(this._events) && (this._events = {}), this._events.hasOwnProperty(t2))
                if (ai(e2))
                  this._events[t2] = [];
                else {
                  const s3 = this._events[t2];
                  for (let t3 = s3.length - 1; t3 >= 0; t3--)
                    s3[t3] === e2 && s3.splice(t3, 1);
                }
            }), this;
          }
          emit(t2, ...e2) {
            if (this._events && this._events.hasOwnProperty(t2)) {
              const s2 = this._events[t2].slice(0);
              for (let t3 = 0, n2 = s2.length; t3 < n2; t3++)
                s2[t3].apply(this, e2);
            }
            return this;
          }
          static mixin(t2) {
            ["on", "once", "off", "emit"].forEach((e2) => {
              const s2 = Object.getOwnPropertyDescriptor(Bi.prototype, e2);
              Object.defineProperty(t2.prototype, e2, s2);
            });
          }
          dispose() {
            return super.dispose(), this._events = void 0, this;
          }
        }
        class Wi extends Bi {
          constructor() {
            super(...arguments), this.isOffline = false;
          }
          toJSON() {
            return {};
          }
        }
        class Gi extends Wi {
          constructor() {
            super(), this.name = "Context", this._constants = new Map(), this._timeouts = new Ni(), this._timeoutIds = 0, this._initialized = false, this.isOffline = false, this._workletModules = new Map();
            const t2 = Di(Gi.getDefaults(), arguments, ["context"]);
            t2.context ? this._context = t2.context : this._context = function(t3) {
              return new Cn(t3);
            }({latencyHint: t2.latencyHint}), this._ticker = new xi(this.emit.bind(this, "tick"), t2.clockSource, t2.updateInterval), this.on("tick", this._timeoutLoop.bind(this)), this._context.onstatechange = () => {
              this.emit("statechange", this.state);
            }, this._setLatencyHint(t2.latencyHint), this.lookAhead = t2.lookAhead;
          }
          static getDefaults() {
            return {clockSource: "worker", latencyHint: "interactive", lookAhead: 0.1, updateInterval: 0.05};
          }
          initialize() {
            var t2;
            return this._initialized || (t2 = this, Pi.forEach((e2) => e2(t2)), this._initialized = true), this;
          }
          createAnalyser() {
            return this._context.createAnalyser();
          }
          createOscillator() {
            return this._context.createOscillator();
          }
          createBufferSource() {
            return this._context.createBufferSource();
          }
          createBiquadFilter() {
            return this._context.createBiquadFilter();
          }
          createBuffer(t2, e2, s2) {
            return this._context.createBuffer(t2, e2, s2);
          }
          createChannelMerger(t2) {
            return this._context.createChannelMerger(t2);
          }
          createChannelSplitter(t2) {
            return this._context.createChannelSplitter(t2);
          }
          createConstantSource() {
            return this._context.createConstantSource();
          }
          createConvolver() {
            return this._context.createConvolver();
          }
          createDelay(t2) {
            return this._context.createDelay(t2);
          }
          createDynamicsCompressor() {
            return this._context.createDynamicsCompressor();
          }
          createGain() {
            return this._context.createGain();
          }
          createIIRFilter(t2, e2) {
            return this._context.createIIRFilter(t2, e2);
          }
          createPanner() {
            return this._context.createPanner();
          }
          createPeriodicWave(t2, e2, s2) {
            return this._context.createPeriodicWave(t2, e2, s2);
          }
          createStereoPanner() {
            return this._context.createStereoPanner();
          }
          createWaveShaper() {
            return this._context.createWaveShaper();
          }
          createMediaStreamSource(t2) {
            ti(Si(this._context), "Not available if OfflineAudioContext");
            return this._context.createMediaStreamSource(t2);
          }
          createMediaElementSource(t2) {
            ti(Si(this._context), "Not available if OfflineAudioContext");
            return this._context.createMediaElementSource(t2);
          }
          createMediaStreamDestination() {
            ti(Si(this._context), "Not available if OfflineAudioContext");
            return this._context.createMediaStreamDestination();
          }
          decodeAudioData(t2) {
            return this._context.decodeAudioData(t2);
          }
          get currentTime() {
            return this._context.currentTime;
          }
          get state() {
            return this._context.state;
          }
          get sampleRate() {
            return this._context.sampleRate;
          }
          get listener() {
            return this.initialize(), this._listener;
          }
          set listener(t2) {
            ti(!this._initialized, "The listener cannot be set after initialization."), this._listener = t2;
          }
          get transport() {
            return this.initialize(), this._transport;
          }
          set transport(t2) {
            ti(!this._initialized, "The transport cannot be set after initialization."), this._transport = t2;
          }
          get draw() {
            return this.initialize(), this._draw;
          }
          set draw(t2) {
            ti(!this._initialized, "Draw cannot be set after initialization."), this._draw = t2;
          }
          get destination() {
            return this.initialize(), this._destination;
          }
          set destination(t2) {
            ti(!this._initialized, "The destination cannot be set after initialization."), this._destination = t2;
          }
          createAudioWorkletNode(t2, e2) {
            return function(t3, e3, s2) {
              return ti(ci(zn), "This node only works in a secure context (https or localhost)"), new zn(t3, e3, s2);
            }(this.rawContext, t2, e2);
          }
          addAudioWorkletModule(t2, e2) {
            return yi(this, void 0, void 0, function* () {
              ti(ci(this.rawContext.audioWorklet), "AudioWorkletNode is only available in a secure context (https or localhost)"), this._workletModules.has(e2) || this._workletModules.set(e2, this.rawContext.audioWorklet.addModule(t2)), yield this._workletModules.get(e2);
            });
          }
          workletsAreReady() {
            return yi(this, void 0, void 0, function* () {
              const t2 = [];
              this._workletModules.forEach((e2) => t2.push(e2)), yield Promise.all(t2);
            });
          }
          get updateInterval() {
            return this._ticker.updateInterval;
          }
          set updateInterval(t2) {
            this._ticker.updateInterval = t2;
          }
          get clockSource() {
            return this._ticker.type;
          }
          set clockSource(t2) {
            this._ticker.type = t2;
          }
          get latencyHint() {
            return this._latencyHint;
          }
          _setLatencyHint(t2) {
            let e2 = 0;
            if (this._latencyHint = t2, fi(t2))
              switch (t2) {
                case "interactive":
                  e2 = 0.1;
                  break;
                case "playback":
                  e2 = 0.5;
                  break;
                case "balanced":
                  e2 = 0.25;
              }
            this.lookAhead = e2, this.updateInterval = e2 / 2;
          }
          get rawContext() {
            return this._context;
          }
          now() {
            return this._context.currentTime + this.lookAhead;
          }
          immediate() {
            return this._context.currentTime;
          }
          resume() {
            return Si(this._context) ? this._context.resume() : Promise.resolve();
          }
          close() {
            return yi(this, void 0, void 0, function* () {
              var t2;
              Si(this._context) && (yield this._context.close()), this._initialized && (t2 = this, Li.forEach((e2) => e2(t2)));
            });
          }
          getConstant(t2) {
            if (this._constants.has(t2))
              return this._constants.get(t2);
            {
              const e2 = this._context.createBuffer(1, 128, this._context.sampleRate), s2 = e2.getChannelData(0);
              for (let e3 = 0; e3 < s2.length; e3++)
                s2[e3] = t2;
              const n2 = this._context.createBufferSource();
              return n2.channelCount = 1, n2.channelCountMode = "explicit", n2.buffer = e2, n2.loop = true, n2.start(0), this._constants.set(t2, n2), n2;
            }
          }
          dispose() {
            return super.dispose(), this._ticker.dispose(), this._timeouts.dispose(), Object.keys(this._constants).map((t2) => this._constants[t2].disconnect()), this;
          }
          _timeoutLoop() {
            const t2 = this.now();
            let e2 = this._timeouts.peek();
            for (; this._timeouts.length && e2 && e2.time <= t2; )
              e2.callback(), this._timeouts.shift(), e2 = this._timeouts.peek();
          }
          setTimeout(t2, e2) {
            this._timeoutIds++;
            const s2 = this.now();
            return this._timeouts.add({callback: t2, id: this._timeoutIds, time: s2 + e2}), this._timeoutIds;
          }
          clearTimeout(t2) {
            return this._timeouts.forEach((e2) => {
              e2.id === t2 && this._timeouts.remove(e2);
            }), this;
          }
          clearInterval(t2) {
            return this.clearTimeout(t2);
          }
          setInterval(t2, e2) {
            const s2 = ++this._timeoutIds, n2 = () => {
              const i2 = this.now();
              this._timeouts.add({callback: () => {
                t2(), n2();
              }, id: s2, time: i2 + e2});
            };
            return n2(), s2;
          }
        }
        function Ui(t2, e2) {
          di(e2) ? e2.forEach((e3) => Ui(t2, e3)) : Object.defineProperty(t2, e2, {enumerable: true, writable: false});
        }
        function Qi(t2, e2) {
          di(e2) ? e2.forEach((e3) => Qi(t2, e3)) : Object.defineProperty(t2, e2, {writable: true});
        }
        const Zi = () => {
        };
        class Xi extends Ei {
          constructor() {
            super(), this.name = "ToneAudioBuffer", this.onload = Zi;
            const t2 = Di(Xi.getDefaults(), arguments, ["url", "onload", "onerror"]);
            this.reverse = t2.reverse, this.onload = t2.onload, t2.url && ki(t2.url) || t2.url instanceof Xi ? this.set(t2.url) : fi(t2.url) && this.load(t2.url).catch(t2.onerror);
          }
          static getDefaults() {
            return {onerror: Zi, onload: Zi, reverse: false};
          }
          get sampleRate() {
            return this._buffer ? this._buffer.sampleRate : Ji().sampleRate;
          }
          set(t2) {
            return t2 instanceof Xi ? t2.loaded ? this._buffer = t2.get() : t2.onload = () => {
              this.set(t2), this.onload(this);
            } : this._buffer = t2, this._reversed && this._reverse(), this;
          }
          get() {
            return this._buffer;
          }
          load(t2) {
            return yi(this, void 0, void 0, function* () {
              const e2 = Xi.load(t2).then((t3) => {
                this.set(t3), this.onload(this);
              });
              Xi.downloads.push(e2);
              try {
                yield e2;
              } finally {
                const t3 = Xi.downloads.indexOf(e2);
                Xi.downloads.splice(t3, 1);
              }
              return this;
            });
          }
          dispose() {
            return super.dispose(), this._buffer = void 0, this;
          }
          fromArray(t2) {
            const e2 = di(t2) && t2[0].length > 0, s2 = e2 ? t2.length : 1, n2 = e2 ? t2[0].length : t2.length, i2 = Ji(), o2 = i2.createBuffer(s2, n2, i2.sampleRate), r2 = e2 || s2 !== 1 ? t2 : [t2];
            for (let t3 = 0; t3 < s2; t3++)
              o2.copyToChannel(r2[t3], t3);
            return this._buffer = o2, this;
          }
          toMono(t2) {
            if (ui(t2))
              this.fromArray(this.toArray(t2));
            else {
              let t3 = new Float32Array(this.length);
              const e2 = this.numberOfChannels;
              for (let s2 = 0; s2 < e2; s2++) {
                const e3 = this.toArray(s2);
                for (let s3 = 0; s3 < e3.length; s3++)
                  t3[s3] += e3[s3];
              }
              t3 = t3.map((t4) => t4 / e2), this.fromArray(t3);
            }
            return this;
          }
          toArray(t2) {
            if (ui(t2))
              return this.getChannelData(t2);
            if (this.numberOfChannels === 1)
              return this.toArray(0);
            {
              const t3 = [];
              for (let e2 = 0; e2 < this.numberOfChannels; e2++)
                t3[e2] = this.getChannelData(e2);
              return t3;
            }
          }
          getChannelData(t2) {
            return this._buffer ? this._buffer.getChannelData(t2) : new Float32Array(0);
          }
          slice(t2, e2 = this.duration) {
            const s2 = Math.floor(t2 * this.sampleRate), n2 = Math.floor(e2 * this.sampleRate);
            ti(s2 < n2, "The start time must be less than the end time");
            const i2 = n2 - s2, o2 = Ji().createBuffer(this.numberOfChannels, i2, this.sampleRate);
            for (let t3 = 0; t3 < this.numberOfChannels; t3++)
              o2.copyToChannel(this.getChannelData(t3).subarray(s2, n2), t3);
            return new Xi(o2);
          }
          _reverse() {
            if (this.loaded)
              for (let t2 = 0; t2 < this.numberOfChannels; t2++)
                this.getChannelData(t2).reverse();
            return this;
          }
          get loaded() {
            return this.length > 0;
          }
          get duration() {
            return this._buffer ? this._buffer.duration : 0;
          }
          get length() {
            return this._buffer ? this._buffer.length : 0;
          }
          get numberOfChannels() {
            return this._buffer ? this._buffer.numberOfChannels : 0;
          }
          get reverse() {
            return this._reversed;
          }
          set reverse(t2) {
            this._reversed !== t2 && (this._reversed = t2, this._reverse());
          }
          static fromArray(t2) {
            return new Xi().fromArray(t2);
          }
          static fromUrl(t2) {
            return yi(this, void 0, void 0, function* () {
              const e2 = new Xi();
              return yield e2.load(t2);
            });
          }
          static load(t2) {
            return yi(this, void 0, void 0, function* () {
              const e2 = t2.match(/\[([^\]\[]+\|.+)\]$/);
              if (e2) {
                const s3 = e2[1].split("|");
                let n3 = s3[0];
                for (const t3 of s3)
                  if (Xi.supportsType(t3)) {
                    n3 = t3;
                    break;
                  }
                t2 = t2.replace(e2[0], n3);
              }
              const s2 = Xi.baseUrl === "" || Xi.baseUrl.endsWith("/") ? Xi.baseUrl : Xi.baseUrl + "/", n2 = yield fetch(s2 + t2);
              if (!n2.ok)
                throw new Error("could not load url: " + t2);
              const i2 = yield n2.arrayBuffer();
              return yield Ji().decodeAudioData(i2);
            });
          }
          static supportsType(t2) {
            const e2 = t2.split("."), s2 = e2[e2.length - 1];
            return document.createElement("audio").canPlayType("audio/" + s2) !== "";
          }
          static loaded() {
            return yi(this, void 0, void 0, function* () {
              for (yield Promise.resolve(); Xi.downloads.length; )
                yield Xi.downloads[0];
            });
          }
        }
        Xi.baseUrl = "", Xi.downloads = [];
        class Yi extends Gi {
          constructor() {
            var t2, e2, s2;
            super({clockSource: "offline", context: Ti(arguments[0]) ? arguments[0] : (t2 = arguments[0], e2 = arguments[1] * arguments[2], s2 = arguments[2], new Gn(t2, e2, s2)), lookAhead: 0, updateInterval: Ti(arguments[0]) ? 128 / arguments[0].sampleRate : 128 / arguments[2]}), this.name = "OfflineContext", this._currentTime = 0, this.isOffline = true, this._duration = Ti(arguments[0]) ? arguments[0].length / arguments[0].sampleRate : arguments[1];
          }
          now() {
            return this._currentTime;
          }
          get currentTime() {
            return this._currentTime;
          }
          _renderClock(t2) {
            return yi(this, void 0, void 0, function* () {
              let e2 = 0;
              for (; this._duration - this._currentTime >= 0; ) {
                this.emit("tick"), this._currentTime += 128 / this.sampleRate, e2++;
                const s2 = Math.floor(this.sampleRate / 128);
                t2 && e2 % s2 == 0 && (yield new Promise((t3) => setTimeout(t3, 1)));
              }
            });
          }
          render(t2 = true) {
            return yi(this, void 0, void 0, function* () {
              yield this.workletsAreReady(), yield this._renderClock(t2);
              const e2 = yield this._context.startRendering();
              return new Xi(e2);
            });
          }
          close() {
            return Promise.resolve();
          }
        }
        const Hi = new class extends Wi {
          constructor() {
            super(...arguments), this.lookAhead = 0, this.latencyHint = 0, this.isOffline = false;
          }
          createAnalyser() {
            return {};
          }
          createOscillator() {
            return {};
          }
          createBufferSource() {
            return {};
          }
          createBiquadFilter() {
            return {};
          }
          createBuffer(t2, e2, s2) {
            return {};
          }
          createChannelMerger(t2) {
            return {};
          }
          createChannelSplitter(t2) {
            return {};
          }
          createConstantSource() {
            return {};
          }
          createConvolver() {
            return {};
          }
          createDelay(t2) {
            return {};
          }
          createDynamicsCompressor() {
            return {};
          }
          createGain() {
            return {};
          }
          createIIRFilter(t2, e2) {
            return {};
          }
          createPanner() {
            return {};
          }
          createPeriodicWave(t2, e2, s2) {
            return {};
          }
          createStereoPanner() {
            return {};
          }
          createWaveShaper() {
            return {};
          }
          createMediaStreamSource(t2) {
            return {};
          }
          createMediaElementSource(t2) {
            return {};
          }
          createMediaStreamDestination() {
            return {};
          }
          decodeAudioData(t2) {
            return Promise.resolve({});
          }
          createAudioWorkletNode(t2, e2) {
            return {};
          }
          get rawContext() {
            return {};
          }
          addAudioWorkletModule(t2, e2) {
            return yi(this, void 0, void 0, function* () {
              return Promise.resolve();
            });
          }
          resume() {
            return Promise.resolve();
          }
          setTimeout(t2, e2) {
            return 0;
          }
          clearTimeout(t2) {
            return this;
          }
          setInterval(t2, e2) {
            return 0;
          }
          clearInterval(t2) {
            return this;
          }
          getConstant(t2) {
            return {};
          }
          get currentTime() {
            return 0;
          }
          get state() {
            return {};
          }
          get sampleRate() {
            return 0;
          }
          get listener() {
            return {};
          }
          get transport() {
            return {};
          }
          get draw() {
            return {};
          }
          set draw(t2) {
          }
          get destination() {
            return {};
          }
          set destination(t2) {
          }
          now() {
            return 0;
          }
          immediate() {
            return 0;
          }
        }();
        let $i = Hi;
        function Ji() {
          return $i === Hi && gi && Ki(new Gi()), $i;
        }
        function Ki(t2) {
          $i = Si(t2) ? new Gi(t2) : Ti(t2) ? new Yi(t2) : t2;
        }
        function to() {
          return $i.resume();
        }
        if (mi && !mi.TONE_SILENCE_LOGGING) {
          let t2 = "v";
          o === "dev" && (t2 = "");
          const e2 = ` * Tone.js ${t2}${o} * `;
          console.log("%c" + e2, "background: #000; color: #fff");
        }
        function eo(t2) {
          return Math.pow(10, t2 / 20);
        }
        function so(t2) {
          return Math.log(t2) / Math.LN10 * 20;
        }
        function no(t2) {
          return Math.pow(2, t2 / 12);
        }
        let io = 440;
        function oo(t2) {
          return Math.round(ro(t2));
        }
        function ro(t2) {
          return 69 + 12 * Math.log2(t2 / io);
        }
        function ao(t2) {
          return io * Math.pow(2, (t2 - 69) / 12);
        }
        class co extends Ei {
          constructor(t2, e2, s2) {
            super(), this.defaultUnits = "s", this._val = e2, this._units = s2, this.context = t2, this._expressions = this._getExpressions();
          }
          _getExpressions() {
            return {hz: {method: (t2) => this._frequencyToUnits(parseFloat(t2)), regexp: /^(\d+(?:\.\d+)?)hz$/i}, i: {method: (t2) => this._ticksToUnits(parseInt(t2, 10)), regexp: /^(\d+)i$/i}, m: {method: (t2) => this._beatsToUnits(parseInt(t2, 10) * this._getTimeSignature()), regexp: /^(\d+)m$/i}, n: {method: (t2, e2) => {
              const s2 = parseInt(t2, 10), n2 = e2 === "." ? 1.5 : 1;
              return s2 === 1 ? this._beatsToUnits(this._getTimeSignature()) * n2 : this._beatsToUnits(4 / s2) * n2;
            }, regexp: /^(\d+)n(\.?)$/i}, number: {method: (t2) => this._expressions[this.defaultUnits].method.call(this, t2), regexp: /^(\d+(?:\.\d+)?)$/}, s: {method: (t2) => this._secondsToUnits(parseFloat(t2)), regexp: /^(\d+(?:\.\d+)?)s$/}, samples: {method: (t2) => parseInt(t2, 10) / this.context.sampleRate, regexp: /^(\d+)samples$/}, t: {method: (t2) => {
              const e2 = parseInt(t2, 10);
              return this._beatsToUnits(8 / (3 * Math.floor(e2)));
            }, regexp: /^(\d+)t$/i}, tr: {method: (t2, e2, s2) => {
              let n2 = 0;
              return t2 && t2 !== "0" && (n2 += this._beatsToUnits(this._getTimeSignature() * parseFloat(t2))), e2 && e2 !== "0" && (n2 += this._beatsToUnits(parseFloat(e2))), s2 && s2 !== "0" && (n2 += this._beatsToUnits(parseFloat(s2) / 4)), n2;
            }, regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}};
          }
          valueOf() {
            if (this._val instanceof co && this.fromType(this._val), ai(this._val))
              return this._noArg();
            if (fi(this._val) && ai(this._units)) {
              for (const t2 in this._expressions)
                if (this._expressions[t2].regexp.test(this._val.trim())) {
                  this._units = t2;
                  break;
                }
            } else if (li(this._val)) {
              let t2 = 0;
              for (const e2 in this._val)
                if (ci(this._val[e2])) {
                  const s2 = this._val[e2];
                  t2 += new this.constructor(this.context, e2).valueOf() * s2;
                }
              return t2;
            }
            if (ci(this._units)) {
              const t2 = this._expressions[this._units], e2 = this._val.toString().trim().match(t2.regexp);
              return e2 ? t2.method.apply(this, e2.slice(1)) : t2.method.call(this, this._val);
            }
            return fi(this._val) ? parseFloat(this._val) : this._val;
          }
          _frequencyToUnits(t2) {
            return 1 / t2;
          }
          _beatsToUnits(t2) {
            return 60 / this._getBpm() * t2;
          }
          _secondsToUnits(t2) {
            return t2;
          }
          _ticksToUnits(t2) {
            return t2 * this._beatsToUnits(1) / this._getPPQ();
          }
          _noArg() {
            return this._now();
          }
          _getBpm() {
            return this.context.transport.bpm.value;
          }
          _getTimeSignature() {
            return this.context.transport.timeSignature;
          }
          _getPPQ() {
            return this.context.transport.PPQ;
          }
          fromType(t2) {
            switch (this._units = void 0, this.defaultUnits) {
              case "s":
                this._val = t2.toSeconds();
                break;
              case "i":
                this._val = t2.toTicks();
                break;
              case "hz":
                this._val = t2.toFrequency();
                break;
              case "midi":
                this._val = t2.toMidi();
            }
            return this;
          }
          toFrequency() {
            return 1 / this.toSeconds();
          }
          toSamples() {
            return this.toSeconds() * this.context.sampleRate;
          }
          toMilliseconds() {
            return 1e3 * this.toSeconds();
          }
        }
        class ho extends co {
          constructor() {
            super(...arguments), this.name = "TimeClass";
          }
          _getExpressions() {
            return Object.assign(super._getExpressions(), {now: {method: (t2) => this._now() + new this.constructor(this.context, t2).valueOf(), regexp: /^\+(.+)/}, quantize: {method: (t2) => {
              const e2 = new ho(this.context, t2).valueOf();
              return this._secondsToUnits(this.context.transport.nextSubdivision(e2));
            }, regexp: /^@(.+)/}});
          }
          quantize(t2, e2 = 1) {
            const s2 = new this.constructor(this.context, t2).valueOf(), n2 = this.valueOf();
            return n2 + (Math.round(n2 / s2) * s2 - n2) * e2;
          }
          toNotation() {
            const t2 = this.toSeconds(), e2 = ["1m"];
            for (let t3 = 1; t3 < 9; t3++) {
              const s3 = Math.pow(2, t3);
              e2.push(s3 + "n."), e2.push(s3 + "n"), e2.push(s3 + "t");
            }
            e2.push("0");
            let s2 = e2[0], n2 = new ho(this.context, e2[0]).toSeconds();
            return e2.forEach((e3) => {
              const i2 = new ho(this.context, e3).toSeconds();
              Math.abs(i2 - t2) < Math.abs(n2 - t2) && (s2 = e3, n2 = i2);
            }), s2;
          }
          toBarsBeatsSixteenths() {
            const t2 = this._beatsToUnits(1);
            let e2 = this.valueOf() / t2;
            e2 = parseFloat(e2.toFixed(4));
            const s2 = Math.floor(e2 / this._getTimeSignature());
            let n2 = e2 % 1 * 4;
            e2 = Math.floor(e2) % this._getTimeSignature();
            const i2 = n2.toString();
            i2.length > 3 && (n2 = parseFloat(parseFloat(i2).toFixed(3)));
            return [s2, e2, n2].join(":");
          }
          toTicks() {
            const t2 = this._beatsToUnits(1), e2 = this.valueOf() / t2;
            return Math.round(e2 * this._getPPQ());
          }
          toSeconds() {
            return this.valueOf();
          }
          toMidi() {
            return oo(this.toFrequency());
          }
          _now() {
            return this.context.now();
          }
        }
        function uo(t2, e2) {
          return new ho(Ji(), t2, e2);
        }
        class lo extends ho {
          constructor() {
            super(...arguments), this.name = "Frequency", this.defaultUnits = "hz";
          }
          static get A4() {
            return io;
          }
          static set A4(t2) {
            !function(t3) {
              io = t3;
            }(t2);
          }
          _getExpressions() {
            return Object.assign({}, super._getExpressions(), {midi: {regexp: /^(\d+(?:\.\d+)?midi)/, method(t2) {
              return this.defaultUnits === "midi" ? t2 : lo.mtof(t2);
            }}, note: {regexp: /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, method(t2, e2) {
              const s2 = po[t2.toLowerCase()] + 12 * (parseInt(e2, 10) + 1);
              return this.defaultUnits === "midi" ? s2 : lo.mtof(s2);
            }}, tr: {regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/, method(t2, e2, s2) {
              let n2 = 1;
              return t2 && t2 !== "0" && (n2 *= this._beatsToUnits(this._getTimeSignature() * parseFloat(t2))), e2 && e2 !== "0" && (n2 *= this._beatsToUnits(parseFloat(e2))), s2 && s2 !== "0" && (n2 *= this._beatsToUnits(parseFloat(s2) / 4)), n2;
            }}});
          }
          transpose(t2) {
            return new lo(this.context, this.valueOf() * no(t2));
          }
          harmonize(t2) {
            return t2.map((t3) => this.transpose(t3));
          }
          toMidi() {
            return oo(this.valueOf());
          }
          toNote() {
            const t2 = this.toFrequency(), e2 = Math.log2(t2 / lo.A4);
            let s2 = Math.round(12 * e2) + 57;
            const n2 = Math.floor(s2 / 12);
            n2 < 0 && (s2 += -12 * n2);
            return fo[s2 % 12] + n2.toString();
          }
          toSeconds() {
            return 1 / super.toSeconds();
          }
          toTicks() {
            const t2 = this._beatsToUnits(1), e2 = this.valueOf() / t2;
            return Math.floor(e2 * this._getPPQ());
          }
          _noArg() {
            return 0;
          }
          _frequencyToUnits(t2) {
            return t2;
          }
          _ticksToUnits(t2) {
            return 1 / (60 * t2 / (this._getBpm() * this._getPPQ()));
          }
          _beatsToUnits(t2) {
            return 1 / super._beatsToUnits(t2);
          }
          _secondsToUnits(t2) {
            return 1 / t2;
          }
          static mtof(t2) {
            return ao(t2);
          }
          static ftom(t2) {
            return oo(t2);
          }
        }
        const po = {cbb: -2, cb: -1, c: 0, "c#": 1, cx: 2, dbb: 0, db: 1, d: 2, "d#": 3, dx: 4, ebb: 2, eb: 3, e: 4, "e#": 5, ex: 6, fbb: 3, fb: 4, f: 5, "f#": 6, fx: 7, gbb: 5, gb: 6, g: 7, "g#": 8, gx: 9, abb: 7, ab: 8, a: 9, "a#": 10, ax: 11, bbb: 9, bb: 10, b: 11, "b#": 12, bx: 13}, fo = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        function _o(t2, e2) {
          return new lo(Ji(), t2, e2);
        }
        class mo extends ho {
          constructor() {
            super(...arguments), this.name = "TransportTime";
          }
          _now() {
            return this.context.transport.seconds;
          }
        }
        function go(t2, e2) {
          return new mo(Ji(), t2, e2);
        }
        class vo extends Ei {
          constructor() {
            super();
            const t2 = Di(vo.getDefaults(), arguments, ["context"]);
            this.defaultContext ? this.context = this.defaultContext : this.context = t2.context;
          }
          static getDefaults() {
            return {context: Ji()};
          }
          now() {
            return this.context.currentTime + this.context.lookAhead;
          }
          immediate() {
            return this.context.currentTime;
          }
          get sampleTime() {
            return 1 / this.context.sampleRate;
          }
          get blockTime() {
            return 128 / this.context.sampleRate;
          }
          toSeconds(t2) {
            return new ho(this.context, t2).toSeconds();
          }
          toFrequency(t2) {
            return new lo(this.context, t2).toFrequency();
          }
          toTicks(t2) {
            return new mo(this.context, t2).toTicks();
          }
          _getPartialProperties(t2) {
            const e2 = this.get();
            return Object.keys(e2).forEach((s2) => {
              ai(t2[s2]) && delete e2[s2];
            }), e2;
          }
          get() {
            const t2 = this.constructor.getDefaults();
            return Object.keys(t2).forEach((e2) => {
              if (Reflect.has(this, e2)) {
                const s2 = this[e2];
                ci(s2) && ci(s2.value) && ci(s2.setValueAtTime) ? t2[e2] = s2.value : s2 instanceof vo ? t2[e2] = s2._getPartialProperties(t2[e2]) : di(s2) || ui(s2) || fi(s2) || pi(s2) ? t2[e2] = s2 : delete t2[e2];
              }
            }), t2;
          }
          set(t2) {
            return Object.keys(t2).forEach((e2) => {
              Reflect.has(this, e2) && ci(this[e2]) && (this[e2] && ci(this[e2].value) && ci(this[e2].setValueAtTime) ? this[e2].value !== t2[e2] && (this[e2].value = t2[e2]) : this[e2] instanceof vo ? this[e2].set(t2[e2]) : this[e2] = t2[e2]);
            }), this;
          }
        }
        class yo extends Ni {
          constructor(t2 = "stopped") {
            super(), this.name = "StateTimeline", this._initial = t2, this.setStateAtTime(this._initial, 0);
          }
          getValueAtTime(t2) {
            const e2 = this.get(t2);
            return e2 !== null ? e2.state : this._initial;
          }
          setStateAtTime(t2, e2, s2) {
            return ei(e2, 0), this.add(Object.assign({}, s2, {state: t2, time: e2})), this;
          }
          getLastState(t2, e2) {
            for (let s2 = this._search(e2); s2 >= 0; s2--) {
              const e3 = this._timeline[s2];
              if (e3.state === t2)
                return e3;
            }
          }
          getNextState(t2, e2) {
            const s2 = this._search(e2);
            if (s2 !== -1)
              for (let e3 = s2; e3 < this._timeline.length; e3++) {
                const s3 = this._timeline[e3];
                if (s3.state === t2)
                  return s3;
              }
          }
        }
        class xo extends vo {
          constructor() {
            super(Di(xo.getDefaults(), arguments, ["param", "units", "convert"])), this.name = "Param", this.overridden = false, this._minOutput = 1e-7;
            const t2 = Di(xo.getDefaults(), arguments, ["param", "units", "convert"]);
            for (ti(ci(t2.param) && (wi(t2.param) || t2.param instanceof xo), "param must be an AudioParam"); !wi(t2.param); )
              t2.param = t2.param._param;
            this._swappable = !!ci(t2.swappable) && t2.swappable, this._swappable ? (this.input = this.context.createGain(), this._param = t2.param, this.input.connect(this._param)) : this._param = this.input = t2.param, this._events = new Ni(1e3), this._initialValue = this._param.defaultValue, this.units = t2.units, this.convert = t2.convert, this._minValue = t2.minValue, this._maxValue = t2.maxValue, ci(t2.value) && t2.value !== this._toType(this._initialValue) && this.setValueAtTime(t2.value, 0);
          }
          static getDefaults() {
            return Object.assign(vo.getDefaults(), {convert: true, units: "number"});
          }
          get value() {
            const t2 = this.now();
            return this.getValueAtTime(t2);
          }
          set value(t2) {
            this.cancelScheduledValues(this.now()), this.setValueAtTime(t2, this.now());
          }
          get minValue() {
            return ci(this._minValue) ? this._minValue : this.units === "time" || this.units === "frequency" || this.units === "normalRange" || this.units === "positive" || this.units === "transportTime" || this.units === "ticks" || this.units === "bpm" || this.units === "hertz" || this.units === "samples" ? 0 : this.units === "audioRange" ? -1 : this.units === "decibels" ? -1 / 0 : this._param.minValue;
          }
          get maxValue() {
            return ci(this._maxValue) ? this._maxValue : this.units === "normalRange" || this.units === "audioRange" ? 1 : this._param.maxValue;
          }
          _is(t2, e2) {
            return this.units === e2;
          }
          _assertRange(t2) {
            return ci(this.maxValue) && ci(this.minValue) && ei(t2, this._fromType(this.minValue), this._fromType(this.maxValue)), t2;
          }
          _fromType(t2) {
            return this.convert && !this.overridden ? this._is(t2, "time") ? this.toSeconds(t2) : this._is(t2, "decibels") ? eo(t2) : this._is(t2, "frequency") ? this.toFrequency(t2) : t2 : this.overridden ? 0 : t2;
          }
          _toType(t2) {
            return this.convert && this.units === "decibels" ? so(t2) : t2;
          }
          setValueAtTime(t2, e2) {
            const s2 = this.toSeconds(e2), n2 = this._fromType(t2);
            return ti(isFinite(n2) && isFinite(s2), `Invalid argument(s) to setValueAtTime: ${JSON.stringify(t2)}, ${JSON.stringify(e2)}`), this._assertRange(n2), this.log(this.units, "setValueAtTime", t2, s2), this._events.add({time: s2, type: "setValueAtTime", value: n2}), this._param.setValueAtTime(n2, s2), this;
          }
          getValueAtTime(t2) {
            const e2 = Math.max(this.toSeconds(t2), 0), s2 = this._events.getAfter(e2), n2 = this._events.get(e2);
            let i2 = this._initialValue;
            if (n2 === null)
              i2 = this._initialValue;
            else if (n2.type !== "setTargetAtTime" || s2 !== null && s2.type !== "setValueAtTime")
              if (s2 === null)
                i2 = n2.value;
              else if (s2.type === "linearRampToValueAtTime" || s2.type === "exponentialRampToValueAtTime") {
                let t3 = n2.value;
                if (n2.type === "setTargetAtTime") {
                  const e3 = this._events.getBefore(n2.time);
                  t3 = e3 === null ? this._initialValue : e3.value;
                }
                i2 = s2.type === "linearRampToValueAtTime" ? this._linearInterpolate(n2.time, t3, s2.time, s2.value, e2) : this._exponentialInterpolate(n2.time, t3, s2.time, s2.value, e2);
              } else
                i2 = n2.value;
            else {
              const t3 = this._events.getBefore(n2.time);
              let s3;
              s3 = t3 === null ? this._initialValue : t3.value, n2.type === "setTargetAtTime" && (i2 = this._exponentialApproach(n2.time, s3, n2.value, n2.constant, e2));
            }
            return this._toType(i2);
          }
          setRampPoint(t2) {
            t2 = this.toSeconds(t2);
            let e2 = this.getValueAtTime(t2);
            return this.cancelAndHoldAtTime(t2), this._fromType(e2) === 0 && (e2 = this._toType(this._minOutput)), this.setValueAtTime(e2, t2), this;
          }
          linearRampToValueAtTime(t2, e2) {
            const s2 = this._fromType(t2), n2 = this.toSeconds(e2);
            return ti(isFinite(s2) && isFinite(n2), `Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(t2)}, ${JSON.stringify(e2)}`), this._assertRange(s2), this._events.add({time: n2, type: "linearRampToValueAtTime", value: s2}), this.log(this.units, "linearRampToValueAtTime", t2, n2), this._param.linearRampToValueAtTime(s2, n2), this;
          }
          exponentialRampToValueAtTime(t2, e2) {
            let s2 = this._fromType(t2);
            s2 = Ii(s2, 0) ? this._minOutput : s2, this._assertRange(s2);
            const n2 = this.toSeconds(e2);
            return ti(isFinite(s2) && isFinite(n2), `Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(t2)}, ${JSON.stringify(e2)}`), this._events.add({time: n2, type: "exponentialRampToValueAtTime", value: s2}), this.log(this.units, "exponentialRampToValueAtTime", t2, n2), this._param.exponentialRampToValueAtTime(s2, n2), this;
          }
          exponentialRampTo(t2, e2, s2) {
            return s2 = this.toSeconds(s2), this.setRampPoint(s2), this.exponentialRampToValueAtTime(t2, s2 + this.toSeconds(e2)), this;
          }
          linearRampTo(t2, e2, s2) {
            return s2 = this.toSeconds(s2), this.setRampPoint(s2), this.linearRampToValueAtTime(t2, s2 + this.toSeconds(e2)), this;
          }
          targetRampTo(t2, e2, s2) {
            return s2 = this.toSeconds(s2), this.setRampPoint(s2), this.exponentialApproachValueAtTime(t2, s2, e2), this;
          }
          exponentialApproachValueAtTime(t2, e2, s2) {
            e2 = this.toSeconds(e2), s2 = this.toSeconds(s2);
            const n2 = Math.log(s2 + 1) / Math.log(200);
            return this.setTargetAtTime(t2, e2, n2), this.cancelAndHoldAtTime(e2 + 0.9 * s2), this.linearRampToValueAtTime(t2, e2 + s2), this;
          }
          setTargetAtTime(t2, e2, s2) {
            const n2 = this._fromType(t2);
            ti(isFinite(s2) && s2 > 0, "timeConstant must be a number greater than 0");
            const i2 = this.toSeconds(e2);
            return this._assertRange(n2), ti(isFinite(n2) && isFinite(i2), `Invalid argument(s) to setTargetAtTime: ${JSON.stringify(t2)}, ${JSON.stringify(e2)}`), this._events.add({constant: s2, time: i2, type: "setTargetAtTime", value: n2}), this.log(this.units, "setTargetAtTime", t2, i2, s2), this._param.setTargetAtTime(n2, i2, s2), this;
          }
          setValueCurveAtTime(t2, e2, s2, n2 = 1) {
            s2 = this.toSeconds(s2), e2 = this.toSeconds(e2);
            const i2 = this._fromType(t2[0]) * n2;
            this.setValueAtTime(this._toType(i2), e2);
            const o2 = s2 / (t2.length - 1);
            for (let s3 = 1; s3 < t2.length; s3++) {
              const i3 = this._fromType(t2[s3]) * n2;
              this.linearRampToValueAtTime(this._toType(i3), e2 + s3 * o2);
            }
            return this;
          }
          cancelScheduledValues(t2) {
            const e2 = this.toSeconds(t2);
            return ti(isFinite(e2), "Invalid argument to cancelScheduledValues: " + JSON.stringify(t2)), this._events.cancel(e2), this._param.cancelScheduledValues(e2), this.log(this.units, "cancelScheduledValues", e2), this;
          }
          cancelAndHoldAtTime(t2) {
            const e2 = this.toSeconds(t2), s2 = this._fromType(this.getValueAtTime(e2));
            ti(isFinite(e2), "Invalid argument to cancelAndHoldAtTime: " + JSON.stringify(t2)), this.log(this.units, "cancelAndHoldAtTime", e2, "value=" + s2);
            const n2 = this._events.get(e2), i2 = this._events.getAfter(e2);
            return n2 && Ii(n2.time, e2) ? i2 ? (this._param.cancelScheduledValues(i2.time), this._events.cancel(i2.time)) : (this._param.cancelAndHoldAtTime(e2), this._events.cancel(e2 + this.sampleTime)) : i2 && (this._param.cancelScheduledValues(i2.time), this._events.cancel(i2.time), i2.type === "linearRampToValueAtTime" ? this.linearRampToValueAtTime(this._toType(s2), e2) : i2.type === "exponentialRampToValueAtTime" && this.exponentialRampToValueAtTime(this._toType(s2), e2)), this._events.add({time: e2, type: "setValueAtTime", value: s2}), this._param.setValueAtTime(s2, e2), this;
          }
          rampTo(t2, e2 = 0.1, s2) {
            return this.units === "frequency" || this.units === "bpm" || this.units === "decibels" ? this.exponentialRampTo(t2, e2, s2) : this.linearRampTo(t2, e2, s2), this;
          }
          apply(t2) {
            const e2 = this.context.currentTime;
            t2.setValueAtTime(this.getValueAtTime(e2), e2);
            const s2 = this._events.get(e2);
            if (s2 && s2.type === "setTargetAtTime") {
              const n2 = this._events.getAfter(s2.time), i2 = n2 ? n2.time : e2 + 2, o2 = (i2 - e2) / 10;
              for (let s3 = e2; s3 < i2; s3 += o2)
                t2.linearRampToValueAtTime(this.getValueAtTime(s3), s3);
            }
            return this._events.forEachAfter(this.context.currentTime, (e3) => {
              e3.type === "cancelScheduledValues" ? t2.cancelScheduledValues(e3.time) : e3.type === "setTargetAtTime" ? t2.setTargetAtTime(e3.value, e3.time, e3.constant) : t2[e3.type](e3.value, e3.time);
            }), this;
          }
          setParam(t2) {
            ti(this._swappable, "The Param must be assigned as 'swappable' in the constructor");
            const e2 = this.input;
            return e2.disconnect(this._param), this.apply(t2), this._param = t2, e2.connect(this._param), this;
          }
          dispose() {
            return super.dispose(), this._events.dispose(), this;
          }
          get defaultValue() {
            return this._toType(this._param.defaultValue);
          }
          _exponentialApproach(t2, e2, s2, n2, i2) {
            return s2 + (e2 - s2) * Math.exp(-(i2 - t2) / n2);
          }
          _linearInterpolate(t2, e2, s2, n2, i2) {
            return e2 + (i2 - t2) / (s2 - t2) * (n2 - e2);
          }
          _exponentialInterpolate(t2, e2, s2, n2, i2) {
            return e2 * Math.pow(n2 / e2, (i2 - t2) / (s2 - t2));
          }
        }
        class wo extends vo {
          constructor() {
            super(...arguments), this.name = "ToneAudioNode", this._internalChannels = [];
          }
          get numberOfInputs() {
            return ci(this.input) ? wi(this.input) || this.input instanceof xo ? 1 : this.input.numberOfInputs : 0;
          }
          get numberOfOutputs() {
            return ci(this.output) ? this.output.numberOfOutputs : 0;
          }
          _isAudioNode(t2) {
            return ci(t2) && (t2 instanceof wo || bi(t2));
          }
          _getInternalNodes() {
            const t2 = this._internalChannels.slice(0);
            return this._isAudioNode(this.input) && t2.push(this.input), this._isAudioNode(this.output) && this.input !== this.output && t2.push(this.output), t2;
          }
          _setChannelProperties(t2) {
            this._getInternalNodes().forEach((e2) => {
              e2.channelCount = t2.channelCount, e2.channelCountMode = t2.channelCountMode, e2.channelInterpretation = t2.channelInterpretation;
            });
          }
          _getChannelProperties() {
            const t2 = this._getInternalNodes();
            ti(t2.length > 0, "ToneAudioNode does not have any internal nodes");
            const e2 = t2[0];
            return {channelCount: e2.channelCount, channelCountMode: e2.channelCountMode, channelInterpretation: e2.channelInterpretation};
          }
          get channelCount() {
            return this._getChannelProperties().channelCount;
          }
          set channelCount(t2) {
            const e2 = this._getChannelProperties();
            this._setChannelProperties(Object.assign(e2, {channelCount: t2}));
          }
          get channelCountMode() {
            return this._getChannelProperties().channelCountMode;
          }
          set channelCountMode(t2) {
            const e2 = this._getChannelProperties();
            this._setChannelProperties(Object.assign(e2, {channelCountMode: t2}));
          }
          get channelInterpretation() {
            return this._getChannelProperties().channelInterpretation;
          }
          set channelInterpretation(t2) {
            const e2 = this._getChannelProperties();
            this._setChannelProperties(Object.assign(e2, {channelInterpretation: t2}));
          }
          connect(t2, e2 = 0, s2 = 0) {
            return To(this, t2, e2, s2), this;
          }
          toDestination() {
            return this.connect(this.context.destination), this;
          }
          toMaster() {
            return ri("toMaster() has been renamed toDestination()"), this.toDestination();
          }
          disconnect(t2, e2 = 0, s2 = 0) {
            return So(this, t2, e2, s2), this;
          }
          chain(...t2) {
            return bo(this, ...t2), this;
          }
          fan(...t2) {
            return t2.forEach((t3) => this.connect(t3)), this;
          }
          dispose() {
            return super.dispose(), ci(this.input) && (this.input instanceof wo ? this.input.dispose() : bi(this.input) && this.input.disconnect()), ci(this.output) && (this.output instanceof wo ? this.output.dispose() : bi(this.output) && this.output.disconnect()), this._internalChannels = [], this;
          }
        }
        function bo(...t2) {
          const e2 = t2.shift();
          t2.reduce((t3, e3) => (t3 instanceof wo ? t3.connect(e3) : bi(t3) && To(t3, e3), e3), e2);
        }
        function To(t2, e2, s2 = 0, n2 = 0) {
          for (ti(ci(t2), "Cannot connect from undefined node"), ti(ci(e2), "Cannot connect to undefined node"), (e2 instanceof wo || bi(e2)) && ti(e2.numberOfInputs > 0, "Cannot connect to node with no inputs"), ti(t2.numberOfOutputs > 0, "Cannot connect from node with no outputs"); e2 instanceof wo || e2 instanceof xo; )
            ci(e2.input) && (e2 = e2.input);
          for (; t2 instanceof wo; )
            ci(t2.output) && (t2 = t2.output);
          wi(e2) ? t2.connect(e2, s2) : t2.connect(e2, s2, n2);
        }
        function So(t2, e2, s2 = 0, n2 = 0) {
          if (ci(e2))
            for (; e2 instanceof wo; )
              e2 = e2.input;
          for (; !bi(t2); )
            ci(t2.output) && (t2 = t2.output);
          wi(e2) ? t2.disconnect(e2, s2) : bi(e2) ? t2.disconnect(e2, s2, n2) : t2.disconnect();
        }
        class ko extends wo {
          constructor() {
            super(Di(ko.getDefaults(), arguments, ["gain", "units"])), this.name = "Gain", this._gainNode = this.context.createGain(), this.input = this._gainNode, this.output = this._gainNode;
            const t2 = Di(ko.getDefaults(), arguments, ["gain", "units"]);
            this.gain = new xo({context: this.context, convert: t2.convert, param: this._gainNode.gain, units: t2.units, value: t2.gain, minValue: t2.minValue, maxValue: t2.maxValue}), Ui(this, "gain");
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {convert: true, gain: 1, units: "gain"});
          }
          dispose() {
            return super.dispose(), this._gainNode.disconnect(), this.gain.dispose(), this;
          }
        }
        class Co extends wo {
          constructor(t2) {
            super(t2), this.onended = Zi, this._startTime = -1, this._stopTime = -1, this._timeout = -1, this.output = new ko({context: this.context, gain: 0}), this._gainNode = this.output, this.getStateAtTime = function(t3) {
              const e2 = this.toSeconds(t3);
              return this._startTime !== -1 && e2 >= this._startTime && (this._stopTime === -1 || e2 <= this._stopTime) ? "started" : "stopped";
            }, this._fadeIn = t2.fadeIn, this._fadeOut = t2.fadeOut, this._curve = t2.curve, this.onended = t2.onended;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {curve: "linear", fadeIn: 0, fadeOut: 0, onended: Zi});
          }
          _startGain(t2, e2 = 1) {
            ti(this._startTime === -1, "Source cannot be started more than once");
            const s2 = this.toSeconds(this._fadeIn);
            return this._startTime = t2 + s2, this._startTime = Math.max(this._startTime, this.context.currentTime), s2 > 0 ? (this._gainNode.gain.setValueAtTime(0, t2), this._curve === "linear" ? this._gainNode.gain.linearRampToValueAtTime(e2, t2 + s2) : this._gainNode.gain.exponentialApproachValueAtTime(e2, t2, s2)) : this._gainNode.gain.setValueAtTime(e2, t2), this;
          }
          stop(t2) {
            return this.log("stop", t2), this._stopGain(this.toSeconds(t2)), this;
          }
          _stopGain(t2) {
            ti(this._startTime !== -1, "'start' must be called before 'stop'"), this.cancelStop();
            const e2 = this.toSeconds(this._fadeOut);
            return this._stopTime = this.toSeconds(t2) + e2, this._stopTime = Math.max(this._stopTime, this.context.currentTime), e2 > 0 ? this._curve === "linear" ? this._gainNode.gain.linearRampTo(0, e2, t2) : this._gainNode.gain.targetRampTo(0, e2, t2) : (this._gainNode.gain.cancelAndHoldAtTime(t2), this._gainNode.gain.setValueAtTime(0, t2)), this.context.clearTimeout(this._timeout), this._timeout = this.context.setTimeout(() => {
              const t3 = this._curve === "exponential" ? 2 * e2 : 0;
              this._stopSource(this.now() + t3), this._onended();
            }, this._stopTime - this.context.currentTime), this;
          }
          _onended() {
            if (this.onended !== Zi && (this.onended(this), this.onended = Zi, !this.context.isOffline)) {
              const t2 = () => this.dispose();
              window.requestIdleCallback !== void 0 ? window.requestIdleCallback(t2) : setTimeout(t2, 1e3);
            }
          }
          get state() {
            return this.getStateAtTime(this.now());
          }
          cancelStop() {
            return this.log("cancelStop"), ti(this._startTime !== -1, "Source is not started"), this._gainNode.gain.cancelScheduledValues(this._startTime + this.sampleTime), this.context.clearTimeout(this._timeout), this._stopTime = -1, this;
          }
          dispose() {
            return super.dispose(), this._gainNode.disconnect(), this;
          }
        }
        class Ao extends Co {
          constructor() {
            super(Di(Ao.getDefaults(), arguments, ["offset"])), this.name = "ToneConstantSource", this._source = this.context.createConstantSource();
            const t2 = Di(Ao.getDefaults(), arguments, ["offset"]);
            To(this._source, this._gainNode), this.offset = new xo({context: this.context, convert: t2.convert, param: this._source.offset, units: t2.units, value: t2.offset, minValue: t2.minValue, maxValue: t2.maxValue});
          }
          static getDefaults() {
            return Object.assign(Co.getDefaults(), {convert: true, offset: 1, units: "number"});
          }
          start(t2) {
            const e2 = this.toSeconds(t2);
            return this.log("start", e2), this._startGain(e2), this._source.start(e2), this;
          }
          _stopSource(t2) {
            this._source.stop(t2);
          }
          dispose() {
            return super.dispose(), this.state === "started" && this.stop(), this._source.disconnect(), this.offset.dispose(), this;
          }
        }
        class Do extends wo {
          constructor() {
            super(Di(Do.getDefaults(), arguments, ["value", "units"])), this.name = "Signal", this.override = true;
            const t2 = Di(Do.getDefaults(), arguments, ["value", "units"]);
            this.output = this._constantSource = new Ao({context: this.context, convert: t2.convert, offset: t2.value, units: t2.units, minValue: t2.minValue, maxValue: t2.maxValue}), this._constantSource.start(0), this.input = this._param = this._constantSource.offset;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {convert: true, units: "number", value: 0});
          }
          connect(t2, e2 = 0, s2 = 0) {
            return Oo(this, t2, e2, s2), this;
          }
          dispose() {
            return super.dispose(), this._param.dispose(), this._constantSource.dispose(), this;
          }
          setValueAtTime(t2, e2) {
            return this._param.setValueAtTime(t2, e2), this;
          }
          getValueAtTime(t2) {
            return this._param.getValueAtTime(t2);
          }
          setRampPoint(t2) {
            return this._param.setRampPoint(t2), this;
          }
          linearRampToValueAtTime(t2, e2) {
            return this._param.linearRampToValueAtTime(t2, e2), this;
          }
          exponentialRampToValueAtTime(t2, e2) {
            return this._param.exponentialRampToValueAtTime(t2, e2), this;
          }
          exponentialRampTo(t2, e2, s2) {
            return this._param.exponentialRampTo(t2, e2, s2), this;
          }
          linearRampTo(t2, e2, s2) {
            return this._param.linearRampTo(t2, e2, s2), this;
          }
          targetRampTo(t2, e2, s2) {
            return this._param.targetRampTo(t2, e2, s2), this;
          }
          exponentialApproachValueAtTime(t2, e2, s2) {
            return this._param.exponentialApproachValueAtTime(t2, e2, s2), this;
          }
          setTargetAtTime(t2, e2, s2) {
            return this._param.setTargetAtTime(t2, e2, s2), this;
          }
          setValueCurveAtTime(t2, e2, s2, n2) {
            return this._param.setValueCurveAtTime(t2, e2, s2, n2), this;
          }
          cancelScheduledValues(t2) {
            return this._param.cancelScheduledValues(t2), this;
          }
          cancelAndHoldAtTime(t2) {
            return this._param.cancelAndHoldAtTime(t2), this;
          }
          rampTo(t2, e2, s2) {
            return this._param.rampTo(t2, e2, s2), this;
          }
          get value() {
            return this._param.value;
          }
          set value(t2) {
            this._param.value = t2;
          }
          get convert() {
            return this._param.convert;
          }
          set convert(t2) {
            this._param.convert = t2;
          }
          get units() {
            return this._param.units;
          }
          get overridden() {
            return this._param.overridden;
          }
          set overridden(t2) {
            this._param.overridden = t2;
          }
          get maxValue() {
            return this._param.maxValue;
          }
          get minValue() {
            return this._param.minValue;
          }
          apply(t2) {
            return this._param.apply(t2), this;
          }
        }
        function Oo(t2, e2, s2, n2) {
          (e2 instanceof xo || wi(e2) || e2 instanceof Do && e2.override) && (e2.cancelScheduledValues(0), e2.setValueAtTime(0, 0), e2 instanceof Do && (e2.overridden = true)), To(t2, e2, s2, n2);
        }
        class Mo extends xo {
          constructor() {
            super(Di(Mo.getDefaults(), arguments, ["value"])), this.name = "TickParam", this._events = new Ni(1 / 0), this._multiplier = 1;
            const t2 = Di(Mo.getDefaults(), arguments, ["value"]);
            this._multiplier = t2.multiplier, this._events.cancel(0), this._events.add({ticks: 0, time: 0, type: "setValueAtTime", value: this._fromType(t2.value)}), this.setValueAtTime(t2.value, 0);
          }
          static getDefaults() {
            return Object.assign(xo.getDefaults(), {multiplier: 1, units: "hertz", value: 1});
          }
          setTargetAtTime(t2, e2, s2) {
            e2 = this.toSeconds(e2), this.setRampPoint(e2);
            const n2 = this._fromType(t2), i2 = this._events.get(e2), o2 = Math.round(Math.max(1 / s2, 1));
            for (let t3 = 0; t3 <= o2; t3++) {
              const o3 = s2 * t3 + e2, r2 = this._exponentialApproach(i2.time, i2.value, n2, s2, o3);
              this.linearRampToValueAtTime(this._toType(r2), o3);
            }
            return this;
          }
          setValueAtTime(t2, e2) {
            const s2 = this.toSeconds(e2);
            super.setValueAtTime(t2, e2);
            const n2 = this._events.get(s2), i2 = this._events.previousEvent(n2), o2 = this._getTicksUntilEvent(i2, s2);
            return n2.ticks = Math.max(o2, 0), this;
          }
          linearRampToValueAtTime(t2, e2) {
            const s2 = this.toSeconds(e2);
            super.linearRampToValueAtTime(t2, e2);
            const n2 = this._events.get(s2), i2 = this._events.previousEvent(n2), o2 = this._getTicksUntilEvent(i2, s2);
            return n2.ticks = Math.max(o2, 0), this;
          }
          exponentialRampToValueAtTime(t2, e2) {
            e2 = this.toSeconds(e2);
            const s2 = this._fromType(t2), n2 = this._events.get(e2), i2 = Math.round(Math.max(10 * (e2 - n2.time), 1)), o2 = (e2 - n2.time) / i2;
            for (let t3 = 0; t3 <= i2; t3++) {
              const i3 = o2 * t3 + n2.time, r2 = this._exponentialInterpolate(n2.time, n2.value, e2, s2, i3);
              this.linearRampToValueAtTime(this._toType(r2), i3);
            }
            return this;
          }
          _getTicksUntilEvent(t2, e2) {
            if (t2 === null)
              t2 = {ticks: 0, time: 0, type: "setValueAtTime", value: 0};
            else if (ai(t2.ticks)) {
              const e3 = this._events.previousEvent(t2);
              t2.ticks = this._getTicksUntilEvent(e3, t2.time);
            }
            const s2 = this._fromType(this.getValueAtTime(t2.time));
            let n2 = this._fromType(this.getValueAtTime(e2));
            const i2 = this._events.get(e2);
            return i2 && i2.time === e2 && i2.type === "setValueAtTime" && (n2 = this._fromType(this.getValueAtTime(e2 - this.sampleTime))), 0.5 * (e2 - t2.time) * (s2 + n2) + t2.ticks;
          }
          getTicksAtTime(t2) {
            const e2 = this.toSeconds(t2), s2 = this._events.get(e2);
            return Math.max(this._getTicksUntilEvent(s2, e2), 0);
          }
          getDurationOfTicks(t2, e2) {
            const s2 = this.toSeconds(e2), n2 = this.getTicksAtTime(e2);
            return this.getTimeOfTick(n2 + t2) - s2;
          }
          getTimeOfTick(t2) {
            const e2 = this._events.get(t2, "ticks"), s2 = this._events.getAfter(t2, "ticks");
            if (e2 && e2.ticks === t2)
              return e2.time;
            if (e2 && s2 && s2.type === "linearRampToValueAtTime" && e2.value !== s2.value) {
              const n2 = this._fromType(this.getValueAtTime(e2.time)), i2 = (this._fromType(this.getValueAtTime(s2.time)) - n2) / (s2.time - e2.time), o2 = Math.sqrt(Math.pow(n2, 2) - 2 * i2 * (e2.ticks - t2)), r2 = (-n2 + o2) / i2, a2 = (-n2 - o2) / i2;
              return (r2 > 0 ? r2 : a2) + e2.time;
            }
            return e2 ? e2.value === 0 ? 1 / 0 : e2.time + (t2 - e2.ticks) / e2.value : t2 / this._initialValue;
          }
          ticksToTime(t2, e2) {
            return this.getDurationOfTicks(t2, e2);
          }
          timeToTicks(t2, e2) {
            const s2 = this.toSeconds(e2), n2 = this.toSeconds(t2), i2 = this.getTicksAtTime(s2);
            return this.getTicksAtTime(s2 + n2) - i2;
          }
          _fromType(t2) {
            return this.units === "bpm" && this.multiplier ? 1 / (60 / t2 / this.multiplier) : super._fromType(t2);
          }
          _toType(t2) {
            return this.units === "bpm" && this.multiplier ? t2 / this.multiplier * 60 : super._toType(t2);
          }
          get multiplier() {
            return this._multiplier;
          }
          set multiplier(t2) {
            const e2 = this.value;
            this._multiplier = t2, this.cancelScheduledValues(0), this.setValueAtTime(e2, 0);
          }
        }
        class Eo extends Do {
          constructor() {
            super(Di(Eo.getDefaults(), arguments, ["value"])), this.name = "TickSignal";
            const t2 = Di(Eo.getDefaults(), arguments, ["value"]);
            this.input = this._param = new Mo({context: this.context, convert: t2.convert, multiplier: t2.multiplier, param: this._constantSource.offset, units: t2.units, value: t2.value});
          }
          static getDefaults() {
            return Object.assign(Do.getDefaults(), {multiplier: 1, units: "hertz", value: 1});
          }
          ticksToTime(t2, e2) {
            return this._param.ticksToTime(t2, e2);
          }
          timeToTicks(t2, e2) {
            return this._param.timeToTicks(t2, e2);
          }
          getTimeOfTick(t2) {
            return this._param.getTimeOfTick(t2);
          }
          getDurationOfTicks(t2, e2) {
            return this._param.getDurationOfTicks(t2, e2);
          }
          getTicksAtTime(t2) {
            return this._param.getTicksAtTime(t2);
          }
          get multiplier() {
            return this._param.multiplier;
          }
          set multiplier(t2) {
            this._param.multiplier = t2;
          }
          dispose() {
            return super.dispose(), this._param.dispose(), this;
          }
        }
        class Ro extends vo {
          constructor() {
            super(Di(Ro.getDefaults(), arguments, ["frequency"])), this.name = "TickSource", this._state = new yo(), this._tickOffset = new Ni();
            const t2 = Di(Ro.getDefaults(), arguments, ["frequency"]);
            this.frequency = new Eo({context: this.context, units: t2.units, value: t2.frequency}), Ui(this, "frequency"), this._state.setStateAtTime("stopped", 0), this.setTicksAtTime(0, 0);
          }
          static getDefaults() {
            return Object.assign({frequency: 1, units: "hertz"}, vo.getDefaults());
          }
          get state() {
            return this.getStateAtTime(this.now());
          }
          start(t2, e2) {
            const s2 = this.toSeconds(t2);
            return this._state.getValueAtTime(s2) !== "started" && (this._state.setStateAtTime("started", s2), ci(e2) && this.setTicksAtTime(e2, s2)), this;
          }
          stop(t2) {
            const e2 = this.toSeconds(t2);
            if (this._state.getValueAtTime(e2) === "stopped") {
              const t3 = this._state.get(e2);
              t3 && t3.time > 0 && (this._tickOffset.cancel(t3.time), this._state.cancel(t3.time));
            }
            return this._state.cancel(e2), this._state.setStateAtTime("stopped", e2), this.setTicksAtTime(0, e2), this;
          }
          pause(t2) {
            const e2 = this.toSeconds(t2);
            return this._state.getValueAtTime(e2) === "started" && this._state.setStateAtTime("paused", e2), this;
          }
          cancel(t2) {
            return t2 = this.toSeconds(t2), this._state.cancel(t2), this._tickOffset.cancel(t2), this;
          }
          getTicksAtTime(t2) {
            const e2 = this.toSeconds(t2), s2 = this._state.getLastState("stopped", e2), n2 = {state: "paused", time: e2};
            this._state.add(n2);
            let i2 = s2, o2 = 0;
            return this._state.forEachBetween(s2.time, e2 + this.sampleTime, (t3) => {
              let e3 = i2.time;
              const s3 = this._tickOffset.get(t3.time);
              s3 && s3.time >= i2.time && (o2 = s3.ticks, e3 = s3.time), i2.state === "started" && t3.state !== "started" && (o2 += this.frequency.getTicksAtTime(t3.time) - this.frequency.getTicksAtTime(e3)), i2 = t3;
            }), this._state.remove(n2), o2;
          }
          get ticks() {
            return this.getTicksAtTime(this.now());
          }
          set ticks(t2) {
            this.setTicksAtTime(t2, this.now());
          }
          get seconds() {
            return this.getSecondsAtTime(this.now());
          }
          set seconds(t2) {
            const e2 = this.now(), s2 = this.frequency.timeToTicks(t2, e2);
            this.setTicksAtTime(s2, e2);
          }
          getSecondsAtTime(t2) {
            t2 = this.toSeconds(t2);
            const e2 = this._state.getLastState("stopped", t2), s2 = {state: "paused", time: t2};
            this._state.add(s2);
            let n2 = e2, i2 = 0;
            return this._state.forEachBetween(e2.time, t2 + this.sampleTime, (t3) => {
              let e3 = n2.time;
              const s3 = this._tickOffset.get(t3.time);
              s3 && s3.time >= n2.time && (i2 = s3.seconds, e3 = s3.time), n2.state === "started" && t3.state !== "started" && (i2 += t3.time - e3), n2 = t3;
            }), this._state.remove(s2), i2;
          }
          setTicksAtTime(t2, e2) {
            return e2 = this.toSeconds(e2), this._tickOffset.cancel(e2), this._tickOffset.add({seconds: this.frequency.getDurationOfTicks(t2, e2), ticks: t2, time: e2}), this;
          }
          getStateAtTime(t2) {
            return t2 = this.toSeconds(t2), this._state.getValueAtTime(t2);
          }
          getTimeOfTick(t2, e2 = this.now()) {
            const s2 = this._tickOffset.get(e2), n2 = this._state.get(e2), i2 = Math.max(s2.time, n2.time), o2 = this.frequency.getTicksAtTime(i2) + t2 - s2.ticks;
            return this.frequency.getTimeOfTick(o2);
          }
          forEachTickBetween(t2, e2, s2) {
            let n2 = this._state.get(t2);
            this._state.forEachBetween(t2, e2, (e3) => {
              n2 && n2.state === "started" && e3.state !== "started" && this.forEachTickBetween(Math.max(n2.time, t2), e3.time - this.sampleTime, s2), n2 = e3;
            });
            let i2 = null;
            if (n2 && n2.state === "started") {
              const o2 = Math.max(n2.time, t2), r2 = this.frequency.getTicksAtTime(o2), a2 = r2 - this.frequency.getTicksAtTime(n2.time);
              let c2 = Math.ceil(a2) - a2;
              c2 = Ii(c2, 1) ? 0 : c2;
              let h2 = this.frequency.getTimeOfTick(r2 + c2);
              for (; h2 < e2; ) {
                try {
                  s2(h2, Math.round(this.getTicksAtTime(h2)));
                } catch (t3) {
                  i2 = t3;
                  break;
                }
                h2 += this.frequency.getDurationOfTicks(1, h2);
              }
            }
            if (i2)
              throw i2;
            return this;
          }
          dispose() {
            return super.dispose(), this._state.dispose(), this._tickOffset.dispose(), this.frequency.dispose(), this;
          }
        }
        class qo extends vo {
          constructor() {
            super(Di(qo.getDefaults(), arguments, ["callback", "frequency"])), this.name = "Clock", this.callback = Zi, this._lastUpdate = 0, this._state = new yo("stopped"), this._boundLoop = this._loop.bind(this);
            const t2 = Di(qo.getDefaults(), arguments, ["callback", "frequency"]);
            this.callback = t2.callback, this._tickSource = new Ro({context: this.context, frequency: t2.frequency, units: t2.units}), this._lastUpdate = 0, this.frequency = this._tickSource.frequency, Ui(this, "frequency"), this._state.setStateAtTime("stopped", 0), this.context.on("tick", this._boundLoop);
          }
          static getDefaults() {
            return Object.assign(vo.getDefaults(), {callback: Zi, frequency: 1, units: "hertz"});
          }
          get state() {
            return this._state.getValueAtTime(this.now());
          }
          start(t2, e2) {
            si(this.context);
            const s2 = this.toSeconds(t2);
            return this.log("start", s2), this._state.getValueAtTime(s2) !== "started" && (this._state.setStateAtTime("started", s2), this._tickSource.start(s2, e2), s2 < this._lastUpdate && this.emit("start", s2, e2)), this;
          }
          stop(t2) {
            const e2 = this.toSeconds(t2);
            return this.log("stop", e2), this._state.cancel(e2), this._state.setStateAtTime("stopped", e2), this._tickSource.stop(e2), e2 < this._lastUpdate && this.emit("stop", e2), this;
          }
          pause(t2) {
            const e2 = this.toSeconds(t2);
            return this._state.getValueAtTime(e2) === "started" && (this._state.setStateAtTime("paused", e2), this._tickSource.pause(e2), e2 < this._lastUpdate && this.emit("pause", e2)), this;
          }
          get ticks() {
            return Math.ceil(this.getTicksAtTime(this.now()));
          }
          set ticks(t2) {
            this._tickSource.ticks = t2;
          }
          get seconds() {
            return this._tickSource.seconds;
          }
          set seconds(t2) {
            this._tickSource.seconds = t2;
          }
          getSecondsAtTime(t2) {
            return this._tickSource.getSecondsAtTime(t2);
          }
          setTicksAtTime(t2, e2) {
            return this._tickSource.setTicksAtTime(t2, e2), this;
          }
          getTimeOfTick(t2, e2 = this.now()) {
            return this._tickSource.getTimeOfTick(t2, e2);
          }
          getTicksAtTime(t2) {
            return this._tickSource.getTicksAtTime(t2);
          }
          nextTickTime(t2, e2) {
            const s2 = this.toSeconds(e2), n2 = this.getTicksAtTime(s2);
            return this._tickSource.getTimeOfTick(n2 + t2, s2);
          }
          _loop() {
            const t2 = this._lastUpdate, e2 = this.now();
            this._lastUpdate = e2, this.log("loop", t2, e2), t2 !== e2 && (this._state.forEachBetween(t2, e2, (t3) => {
              switch (t3.state) {
                case "started":
                  const e3 = this._tickSource.getTicksAtTime(t3.time);
                  this.emit("start", t3.time, e3);
                  break;
                case "stopped":
                  t3.time !== 0 && this.emit("stop", t3.time);
                  break;
                case "paused":
                  this.emit("pause", t3.time);
              }
            }), this._tickSource.forEachTickBetween(t2, e2, (t3, e3) => {
              this.callback(t3, e3);
            }));
          }
          getStateAtTime(t2) {
            const e2 = this.toSeconds(t2);
            return this._state.getValueAtTime(e2);
          }
          dispose() {
            return super.dispose(), this.context.off("tick", this._boundLoop), this._tickSource.dispose(), this._state.dispose(), this;
          }
        }
        Bi.mixin(qo);
        class Fo extends wo {
          constructor() {
            super(Di(Fo.getDefaults(), arguments, ["delayTime", "maxDelay"])), this.name = "Delay";
            const t2 = Di(Fo.getDefaults(), arguments, ["delayTime", "maxDelay"]), e2 = this.toSeconds(t2.maxDelay);
            this._maxDelay = Math.max(e2, this.toSeconds(t2.delayTime)), this._delayNode = this.input = this.output = this.context.createDelay(e2), this.delayTime = new xo({context: this.context, param: this._delayNode.delayTime, units: "time", value: t2.delayTime, minValue: 0, maxValue: this.maxDelay}), Ui(this, "delayTime");
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {delayTime: 0, maxDelay: 1});
          }
          get maxDelay() {
            return this._maxDelay;
          }
          dispose() {
            return super.dispose(), this._delayNode.disconnect(), this.delayTime.dispose(), this;
          }
        }
        function Io(t2, e2, s2 = 2, n2 = Ji().sampleRate) {
          return yi(this, void 0, void 0, function* () {
            const i2 = Ji(), o2 = new Yi(s2, e2, n2);
            Ki(o2), yield t2(o2);
            const r2 = o2.render();
            Ki(i2);
            const a2 = yield r2;
            return new Xi(a2);
          });
        }
        class Vo extends Ei {
          constructor() {
            super(), this.name = "ToneAudioBuffers", this._buffers = new Map(), this._loadingCount = 0;
            const t2 = Di(Vo.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls");
            this.baseUrl = t2.baseUrl, Object.keys(t2.urls).forEach((e2) => {
              this._loadingCount++;
              const s2 = t2.urls[e2];
              this.add(e2, s2, this._bufferLoaded.bind(this, t2.onload), t2.onerror);
            });
          }
          static getDefaults() {
            return {baseUrl: "", onerror: Zi, onload: Zi, urls: {}};
          }
          has(t2) {
            return this._buffers.has(t2.toString());
          }
          get(t2) {
            return ti(this.has(t2), "ToneAudioBuffers has no buffer named: " + t2), this._buffers.get(t2.toString());
          }
          _bufferLoaded(t2) {
            this._loadingCount--, this._loadingCount === 0 && t2 && t2();
          }
          get loaded() {
            return Array.from(this._buffers).every(([t2, e2]) => e2.loaded);
          }
          add(t2, e2, s2 = Zi, n2 = Zi) {
            return fi(e2) ? this._buffers.set(t2.toString(), new Xi(this.baseUrl + e2, s2, n2)) : this._buffers.set(t2.toString(), new Xi(e2, s2, n2)), this;
          }
          dispose() {
            return super.dispose(), this._buffers.forEach((t2) => t2.dispose()), this._buffers.clear(), this;
          }
        }
        class No extends lo {
          constructor() {
            super(...arguments), this.name = "MidiClass", this.defaultUnits = "midi";
          }
          _frequencyToUnits(t2) {
            return oo(super._frequencyToUnits(t2));
          }
          _ticksToUnits(t2) {
            return oo(super._ticksToUnits(t2));
          }
          _beatsToUnits(t2) {
            return oo(super._beatsToUnits(t2));
          }
          _secondsToUnits(t2) {
            return oo(super._secondsToUnits(t2));
          }
          toMidi() {
            return this.valueOf();
          }
          toFrequency() {
            return ao(this.toMidi());
          }
          transpose(t2) {
            return new No(this.context, this.toMidi() + t2);
          }
        }
        function Po(t2, e2) {
          return new No(Ji(), t2, e2);
        }
        class jo extends mo {
          constructor() {
            super(...arguments), this.name = "Ticks", this.defaultUnits = "i";
          }
          _now() {
            return this.context.transport.ticks;
          }
          _beatsToUnits(t2) {
            return this._getPPQ() * t2;
          }
          _secondsToUnits(t2) {
            return Math.floor(t2 / (60 / this._getBpm()) * this._getPPQ());
          }
          _ticksToUnits(t2) {
            return t2;
          }
          toTicks() {
            return this.valueOf();
          }
          toSeconds() {
            return this.valueOf() / this._getPPQ() * (60 / this._getBpm());
          }
        }
        function Lo(t2, e2) {
          return new jo(Ji(), t2, e2);
        }
        class zo extends vo {
          constructor() {
            super(...arguments), this.name = "Draw", this.expiration = 0.25, this.anticipation = 8e-3, this._events = new Ni(), this._boundDrawLoop = this._drawLoop.bind(this), this._animationFrame = -1;
          }
          schedule(t2, e2) {
            return this._events.add({callback: t2, time: this.toSeconds(e2)}), this._events.length === 1 && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop)), this;
          }
          cancel(t2) {
            return this._events.cancel(this.toSeconds(t2)), this;
          }
          _drawLoop() {
            const t2 = this.context.currentTime;
            for (; this._events.length && this._events.peek().time - this.anticipation <= t2; ) {
              const e2 = this._events.shift();
              e2 && t2 - e2.time <= this.expiration && e2.callback();
            }
            this._events.length > 0 && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop));
          }
          dispose() {
            return super.dispose(), this._events.dispose(), cancelAnimationFrame(this._animationFrame), this;
          }
        }
        ji((t2) => {
          t2.draw = new zo({context: t2});
        }), zi((t2) => {
          t2.draw.dispose();
        });
        class Bo extends Ei {
          constructor() {
            super(...arguments), this.name = "IntervalTimeline", this._root = null, this._length = 0;
          }
          add(t2) {
            ti(ci(t2.time), "Events must have a time property"), ti(ci(t2.duration), "Events must have a duration parameter"), t2.time = t2.time.valueOf();
            let e2 = new Wo(t2.time, t2.time + t2.duration, t2);
            for (this._root === null ? this._root = e2 : this._root.insert(e2), this._length++; e2 !== null; )
              e2.updateHeight(), e2.updateMax(), this._rebalance(e2), e2 = e2.parent;
            return this;
          }
          remove(t2) {
            if (this._root !== null) {
              const e2 = [];
              this._root.search(t2.time, e2);
              for (const s2 of e2)
                if (s2.event === t2) {
                  this._removeNode(s2), this._length--;
                  break;
                }
            }
            return this;
          }
          get length() {
            return this._length;
          }
          cancel(t2) {
            return this.forEachFrom(t2, (t3) => this.remove(t3)), this;
          }
          _setRoot(t2) {
            this._root = t2, this._root !== null && (this._root.parent = null);
          }
          _replaceNodeInParent(t2, e2) {
            t2.parent !== null ? (t2.isLeftChild() ? t2.parent.left = e2 : t2.parent.right = e2, this._rebalance(t2.parent)) : this._setRoot(e2);
          }
          _removeNode(t2) {
            if (t2.left === null && t2.right === null)
              this._replaceNodeInParent(t2, null);
            else if (t2.right === null)
              this._replaceNodeInParent(t2, t2.left);
            else if (t2.left === null)
              this._replaceNodeInParent(t2, t2.right);
            else {
              let e2, s2 = null;
              if (t2.getBalance() > 0)
                if (t2.left.right === null)
                  e2 = t2.left, e2.right = t2.right, s2 = e2;
                else {
                  for (e2 = t2.left.right; e2.right !== null; )
                    e2 = e2.right;
                  e2.parent && (e2.parent.right = e2.left, s2 = e2.parent, e2.left = t2.left, e2.right = t2.right);
                }
              else if (t2.right.left === null)
                e2 = t2.right, e2.left = t2.left, s2 = e2;
              else {
                for (e2 = t2.right.left; e2.left !== null; )
                  e2 = e2.left;
                e2.parent && (e2.parent.left = e2.right, s2 = e2.parent, e2.left = t2.left, e2.right = t2.right);
              }
              t2.parent !== null ? t2.isLeftChild() ? t2.parent.left = e2 : t2.parent.right = e2 : this._setRoot(e2), s2 && this._rebalance(s2);
            }
            t2.dispose();
          }
          _rotateLeft(t2) {
            const e2 = t2.parent, s2 = t2.isLeftChild(), n2 = t2.right;
            n2 && (t2.right = n2.left, n2.left = t2), e2 !== null ? s2 ? e2.left = n2 : e2.right = n2 : this._setRoot(n2);
          }
          _rotateRight(t2) {
            const e2 = t2.parent, s2 = t2.isLeftChild(), n2 = t2.left;
            n2 && (t2.left = n2.right, n2.right = t2), e2 !== null ? s2 ? e2.left = n2 : e2.right = n2 : this._setRoot(n2);
          }
          _rebalance(t2) {
            const e2 = t2.getBalance();
            e2 > 1 && t2.left ? t2.left.getBalance() < 0 ? this._rotateLeft(t2.left) : this._rotateRight(t2) : e2 < -1 && t2.right && (t2.right.getBalance() > 0 ? this._rotateRight(t2.right) : this._rotateLeft(t2));
          }
          get(t2) {
            if (this._root !== null) {
              const e2 = [];
              if (this._root.search(t2, e2), e2.length > 0) {
                let t3 = e2[0];
                for (let s2 = 1; s2 < e2.length; s2++)
                  e2[s2].low > t3.low && (t3 = e2[s2]);
                return t3.event;
              }
            }
            return null;
          }
          forEach(t2) {
            if (this._root !== null) {
              const e2 = [];
              this._root.traverse((t3) => e2.push(t3)), e2.forEach((e3) => {
                e3.event && t2(e3.event);
              });
            }
            return this;
          }
          forEachAtTime(t2, e2) {
            if (this._root !== null) {
              const s2 = [];
              this._root.search(t2, s2), s2.forEach((t3) => {
                t3.event && e2(t3.event);
              });
            }
            return this;
          }
          forEachFrom(t2, e2) {
            if (this._root !== null) {
              const s2 = [];
              this._root.searchAfter(t2, s2), s2.forEach((t3) => {
                t3.event && e2(t3.event);
              });
            }
            return this;
          }
          dispose() {
            return super.dispose(), this._root !== null && this._root.traverse((t2) => t2.dispose()), this._root = null, this;
          }
        }
        class Wo {
          constructor(t2, e2, s2) {
            this._left = null, this._right = null, this.parent = null, this.height = 0, this.event = s2, this.low = t2, this.high = e2, this.max = this.high;
          }
          insert(t2) {
            t2.low <= this.low ? this.left === null ? this.left = t2 : this.left.insert(t2) : this.right === null ? this.right = t2 : this.right.insert(t2);
          }
          search(t2, e2) {
            t2 > this.max || (this.left !== null && this.left.search(t2, e2), this.low <= t2 && this.high > t2 && e2.push(this), this.low > t2 || this.right !== null && this.right.search(t2, e2));
          }
          searchAfter(t2, e2) {
            this.low >= t2 && (e2.push(this), this.left !== null && this.left.searchAfter(t2, e2)), this.right !== null && this.right.searchAfter(t2, e2);
          }
          traverse(t2) {
            t2(this), this.left !== null && this.left.traverse(t2), this.right !== null && this.right.traverse(t2);
          }
          updateHeight() {
            this.left !== null && this.right !== null ? this.height = Math.max(this.left.height, this.right.height) + 1 : this.right !== null ? this.height = this.right.height + 1 : this.left !== null ? this.height = this.left.height + 1 : this.height = 0;
          }
          updateMax() {
            this.max = this.high, this.left !== null && (this.max = Math.max(this.max, this.left.max)), this.right !== null && (this.max = Math.max(this.max, this.right.max));
          }
          getBalance() {
            let t2 = 0;
            return this.left !== null && this.right !== null ? t2 = this.left.height - this.right.height : this.left !== null ? t2 = this.left.height + 1 : this.right !== null && (t2 = -(this.right.height + 1)), t2;
          }
          isLeftChild() {
            return this.parent !== null && this.parent.left === this;
          }
          get left() {
            return this._left;
          }
          set left(t2) {
            this._left = t2, t2 !== null && (t2.parent = this), this.updateHeight(), this.updateMax();
          }
          get right() {
            return this._right;
          }
          set right(t2) {
            this._right = t2, t2 !== null && (t2.parent = this), this.updateHeight(), this.updateMax();
          }
          dispose() {
            this.parent = null, this._left = null, this._right = null, this.event = null;
          }
        }
        class Go extends wo {
          constructor() {
            super(Di(Go.getDefaults(), arguments, ["volume"])), this.name = "Volume";
            const t2 = Di(Go.getDefaults(), arguments, ["volume"]);
            this.input = this.output = new ko({context: this.context, gain: t2.volume, units: "decibels"}), this.volume = this.output.gain, Ui(this, "volume"), this._unmutedVolume = t2.volume, this.mute = t2.mute;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {mute: false, volume: 0});
          }
          get mute() {
            return this.volume.value === -1 / 0;
          }
          set mute(t2) {
            !this.mute && t2 ? (this._unmutedVolume = this.volume.value, this.volume.value = -1 / 0) : this.mute && !t2 && (this.volume.value = this._unmutedVolume);
          }
          dispose() {
            return super.dispose(), this.input.dispose(), this.volume.dispose(), this;
          }
        }
        class Uo extends wo {
          constructor() {
            super(Di(Uo.getDefaults(), arguments)), this.name = "Destination", this.input = new Go({context: this.context}), this.output = new ko({context: this.context}), this.volume = this.input.volume;
            const t2 = Di(Uo.getDefaults(), arguments);
            bo(this.input, this.output, this.context.rawContext.destination), this.mute = t2.mute, this._internalChannels = [this.input, this.context.rawContext.destination, this.output];
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {mute: false, volume: 0});
          }
          get mute() {
            return this.input.mute;
          }
          set mute(t2) {
            this.input.mute = t2;
          }
          chain(...t2) {
            return this.input.disconnect(), t2.unshift(this.input), t2.push(this.output), bo(...t2), this;
          }
          get maxChannelCount() {
            return this.context.rawContext.destination.maxChannelCount;
          }
          dispose() {
            return super.dispose(), this.volume.dispose(), this;
          }
        }
        ji((t2) => {
          t2.destination = new Uo({context: t2});
        }), zi((t2) => {
          t2.destination.dispose();
        });
        class Qo extends Ei {
          constructor(t2) {
            super(), this.name = "TimelineValue", this._timeline = new Ni({memory: 10}), this._initialValue = t2;
          }
          set(t2, e2) {
            return this._timeline.add({value: t2, time: e2}), this;
          }
          get(t2) {
            const e2 = this._timeline.get(t2);
            return e2 ? e2.value : this._initialValue;
          }
        }
        class Zo {
          constructor(t2, e2) {
            this.id = Zo._eventId++;
            const s2 = Object.assign(Zo.getDefaults(), e2);
            this.transport = t2, this.callback = s2.callback, this._once = s2.once, this.time = s2.time;
          }
          static getDefaults() {
            return {callback: Zi, once: false, time: 0};
          }
          invoke(t2) {
            this.callback && (this.callback(t2), this._once && this.transport.clear(this.id));
          }
          dispose() {
            return this.callback = void 0, this;
          }
        }
        Zo._eventId = 0;
        class Xo extends Zo {
          constructor(t2, e2) {
            super(t2, e2), this._currentId = -1, this._nextId = -1, this._nextTick = this.time, this._boundRestart = this._restart.bind(this);
            const s2 = Object.assign(Xo.getDefaults(), e2);
            this.duration = new jo(t2.context, s2.duration).valueOf(), this._interval = new jo(t2.context, s2.interval).valueOf(), this._nextTick = s2.time, this.transport.on("start", this._boundRestart), this.transport.on("loopStart", this._boundRestart), this.context = this.transport.context, this._restart();
          }
          static getDefaults() {
            return Object.assign({}, Zo.getDefaults(), {duration: 1 / 0, interval: 1, once: false});
          }
          invoke(t2) {
            this._createEvents(t2), super.invoke(t2);
          }
          _createEvents(t2) {
            const e2 = this.transport.getTicksAtTime(t2);
            e2 >= this.time && e2 >= this._nextTick && this._nextTick + this._interval < this.time + this.duration && (this._nextTick += this._interval, this._currentId = this._nextId, this._nextId = this.transport.scheduleOnce(this.invoke.bind(this), new jo(this.context, this._nextTick).toSeconds()));
          }
          _restart(t2) {
            this.transport.clear(this._currentId), this.transport.clear(this._nextId), this._nextTick = this.time;
            const e2 = this.transport.getTicksAtTime(t2);
            e2 > this.time && (this._nextTick = this.time + Math.ceil((e2 - this.time) / this._interval) * this._interval), this._currentId = this.transport.scheduleOnce(this.invoke.bind(this), new jo(this.context, this._nextTick).toSeconds()), this._nextTick += this._interval, this._nextId = this.transport.scheduleOnce(this.invoke.bind(this), new jo(this.context, this._nextTick).toSeconds());
          }
          dispose() {
            return super.dispose(), this.transport.clear(this._currentId), this.transport.clear(this._nextId), this.transport.off("start", this._boundRestart), this.transport.off("loopStart", this._boundRestart), this;
          }
        }
        class Yo extends vo {
          constructor() {
            super(Di(Yo.getDefaults(), arguments)), this.name = "Transport", this._loop = new Qo(false), this._loopStart = 0, this._loopEnd = 0, this._scheduledEvents = {}, this._timeline = new Ni(), this._repeatedEvents = new Bo(), this._syncedSignals = [], this._swingAmount = 0;
            const t2 = Di(Yo.getDefaults(), arguments);
            this._ppq = t2.ppq, this._clock = new qo({callback: this._processTick.bind(this), context: this.context, frequency: 0, units: "bpm"}), this._bindClockEvents(), this.bpm = this._clock.frequency, this._clock.frequency.multiplier = t2.ppq, this.bpm.setValueAtTime(t2.bpm, 0), Ui(this, "bpm"), this._timeSignature = t2.timeSignature, this._swingTicks = t2.ppq / 2;
          }
          static getDefaults() {
            return Object.assign(vo.getDefaults(), {bpm: 120, loopEnd: "4m", loopStart: 0, ppq: 192, swing: 0, swingSubdivision: "8n", timeSignature: 4});
          }
          _processTick(t2, e2) {
            if (this._loop.get(t2) && e2 >= this._loopEnd && (this.emit("loopEnd", t2), this._clock.setTicksAtTime(this._loopStart, t2), e2 = this._loopStart, this.emit("loopStart", t2, this._clock.getSecondsAtTime(t2)), this.emit("loop", t2)), this._swingAmount > 0 && e2 % this._ppq != 0 && e2 % (2 * this._swingTicks) != 0) {
              const s2 = e2 % (2 * this._swingTicks) / (2 * this._swingTicks), n2 = Math.sin(s2 * Math.PI) * this._swingAmount;
              t2 += new jo(this.context, 2 * this._swingTicks / 3).toSeconds() * n2;
            }
            this._timeline.forEachAtTime(e2, (e3) => e3.invoke(t2));
          }
          schedule(t2, e2) {
            const s2 = new Zo(this, {callback: t2, time: new mo(this.context, e2).toTicks()});
            return this._addEvent(s2, this._timeline);
          }
          scheduleRepeat(t2, e2, s2, n2 = 1 / 0) {
            const i2 = new Xo(this, {callback: t2, duration: new ho(this.context, n2).toTicks(), interval: new ho(this.context, e2).toTicks(), time: new mo(this.context, s2).toTicks()});
            return this._addEvent(i2, this._repeatedEvents);
          }
          scheduleOnce(t2, e2) {
            const s2 = new Zo(this, {callback: t2, once: true, time: new mo(this.context, e2).toTicks()});
            return this._addEvent(s2, this._timeline);
          }
          clear(t2) {
            if (this._scheduledEvents.hasOwnProperty(t2)) {
              const e2 = this._scheduledEvents[t2.toString()];
              e2.timeline.remove(e2.event), e2.event.dispose(), delete this._scheduledEvents[t2.toString()];
            }
            return this;
          }
          _addEvent(t2, e2) {
            return this._scheduledEvents[t2.id.toString()] = {event: t2, timeline: e2}, e2.add(t2), t2.id;
          }
          cancel(t2 = 0) {
            const e2 = this.toTicks(t2);
            return this._timeline.forEachFrom(e2, (t3) => this.clear(t3.id)), this._repeatedEvents.forEachFrom(e2, (t3) => this.clear(t3.id)), this;
          }
          _bindClockEvents() {
            this._clock.on("start", (t2, e2) => {
              e2 = new jo(this.context, e2).toSeconds(), this.emit("start", t2, e2);
            }), this._clock.on("stop", (t2) => {
              this.emit("stop", t2);
            }), this._clock.on("pause", (t2) => {
              this.emit("pause", t2);
            });
          }
          get state() {
            return this._clock.getStateAtTime(this.now());
          }
          start(t2, e2) {
            let s2;
            return ci(e2) && (s2 = this.toTicks(e2)), this._clock.start(t2, s2), this;
          }
          stop(t2) {
            return this._clock.stop(t2), this;
          }
          pause(t2) {
            return this._clock.pause(t2), this;
          }
          toggle(t2) {
            return t2 = this.toSeconds(t2), this._clock.getStateAtTime(t2) !== "started" ? this.start(t2) : this.stop(t2), this;
          }
          get timeSignature() {
            return this._timeSignature;
          }
          set timeSignature(t2) {
            di(t2) && (t2 = t2[0] / t2[1] * 4), this._timeSignature = t2;
          }
          get loopStart() {
            return new ho(this.context, this._loopStart, "i").toSeconds();
          }
          set loopStart(t2) {
            this._loopStart = this.toTicks(t2);
          }
          get loopEnd() {
            return new ho(this.context, this._loopEnd, "i").toSeconds();
          }
          set loopEnd(t2) {
            this._loopEnd = this.toTicks(t2);
          }
          get loop() {
            return this._loop.get(this.now());
          }
          set loop(t2) {
            this._loop.set(t2, this.now());
          }
          setLoopPoints(t2, e2) {
            return this.loopStart = t2, this.loopEnd = e2, this;
          }
          get swing() {
            return this._swingAmount;
          }
          set swing(t2) {
            this._swingAmount = t2;
          }
          get swingSubdivision() {
            return new jo(this.context, this._swingTicks).toNotation();
          }
          set swingSubdivision(t2) {
            this._swingTicks = this.toTicks(t2);
          }
          get position() {
            const t2 = this.now(), e2 = this._clock.getTicksAtTime(t2);
            return new jo(this.context, e2).toBarsBeatsSixteenths();
          }
          set position(t2) {
            const e2 = this.toTicks(t2);
            this.ticks = e2;
          }
          get seconds() {
            return this._clock.seconds;
          }
          set seconds(t2) {
            const e2 = this.now(), s2 = this._clock.frequency.timeToTicks(t2, e2);
            this.ticks = s2;
          }
          get progress() {
            if (this.loop) {
              const t2 = this.now();
              return (this._clock.getTicksAtTime(t2) - this._loopStart) / (this._loopEnd - this._loopStart);
            }
            return 0;
          }
          get ticks() {
            return this._clock.ticks;
          }
          set ticks(t2) {
            if (this._clock.ticks !== t2) {
              const e2 = this.now();
              if (this.state === "started") {
                const s2 = this._clock.getTicksAtTime(e2), n2 = e2 + this._clock.frequency.getDurationOfTicks(Math.ceil(s2) - s2, e2);
                this.emit("stop", n2), this._clock.setTicksAtTime(t2, n2), this.emit("start", n2, this._clock.getSecondsAtTime(n2));
              } else
                this._clock.setTicksAtTime(t2, e2);
            }
          }
          getTicksAtTime(t2) {
            return Math.round(this._clock.getTicksAtTime(t2));
          }
          getSecondsAtTime(t2) {
            return this._clock.getSecondsAtTime(t2);
          }
          get PPQ() {
            return this._clock.frequency.multiplier;
          }
          set PPQ(t2) {
            this._clock.frequency.multiplier = t2;
          }
          nextSubdivision(t2) {
            if (t2 = this.toTicks(t2), this.state !== "started")
              return 0;
            {
              const e2 = this.now(), s2 = t2 - this.getTicksAtTime(e2) % t2;
              return this._clock.nextTickTime(s2, e2);
            }
          }
          syncSignal(t2, e2) {
            if (!e2) {
              const s3 = this.now();
              if (t2.getValueAtTime(s3) !== 0) {
                const n2 = 1 / (60 / this.bpm.getValueAtTime(s3) / this.PPQ);
                e2 = t2.getValueAtTime(s3) / n2;
              } else
                e2 = 0;
            }
            const s2 = new ko(e2);
            return this.bpm.connect(s2), s2.connect(t2._param), this._syncedSignals.push({initial: t2.value, ratio: s2, signal: t2}), t2.value = 0, this;
          }
          unsyncSignal(t2) {
            for (let e2 = this._syncedSignals.length - 1; e2 >= 0; e2--) {
              const s2 = this._syncedSignals[e2];
              s2.signal === t2 && (s2.ratio.dispose(), s2.signal.value = s2.initial, this._syncedSignals.splice(e2, 1));
            }
            return this;
          }
          dispose() {
            return super.dispose(), this._clock.dispose(), Qi(this, "bpm"), this._timeline.dispose(), this._repeatedEvents.dispose(), this;
          }
        }
        Bi.mixin(Yo), ji((t2) => {
          t2.transport = new Yo({context: t2});
        }), zi((t2) => {
          t2.transport.dispose();
        });
        class Ho extends wo {
          constructor(t2) {
            super(t2), this.input = void 0, this._state = new yo("stopped"), this._synced = false, this._scheduled = [], this._syncedStart = Zi, this._syncedStop = Zi, this._state.memory = 100, this._state.increasing = true, this._volume = this.output = new Go({context: this.context, mute: t2.mute, volume: t2.volume}), this.volume = this._volume.volume, Ui(this, "volume"), this.onstop = t2.onstop;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {mute: false, onstop: Zi, volume: 0});
          }
          get state() {
            return this._synced ? this.context.transport.state === "started" ? this._state.getValueAtTime(this.context.transport.seconds) : "stopped" : this._state.getValueAtTime(this.now());
          }
          get mute() {
            return this._volume.mute;
          }
          set mute(t2) {
            this._volume.mute = t2;
          }
          _clampToCurrentTime(t2) {
            return this._synced ? t2 : Math.max(t2, this.context.currentTime);
          }
          start(t2, e2, s2) {
            let n2 = ai(t2) && this._synced ? this.context.transport.seconds : this.toSeconds(t2);
            if (n2 = this._clampToCurrentTime(n2), this._synced || this._state.getValueAtTime(n2) !== "started")
              if (this.log("start", n2), this._state.setStateAtTime("started", n2), this._synced) {
                const t3 = this._state.get(n2);
                t3 && (t3.offset = this.toSeconds(Oi(e2, 0)), t3.duration = s2 ? this.toSeconds(s2) : void 0);
                const i2 = this.context.transport.schedule((t4) => {
                  this._start(t4, e2, s2);
                }, n2);
                this._scheduled.push(i2), this.context.transport.state === "started" && this.context.transport.getSecondsAtTime(this.immediate()) > n2 && this._syncedStart(this.now(), this.context.transport.seconds);
              } else
                si(this.context), this._start(n2, e2, s2);
            else
              ti(Ri(n2, this._state.get(n2).time), "Start time must be strictly greater than previous start time"), this._state.cancel(n2), this._state.setStateAtTime("started", n2), this.log("restart", n2), this.restart(n2, e2, s2);
            return this;
          }
          stop(t2) {
            let e2 = ai(t2) && this._synced ? this.context.transport.seconds : this.toSeconds(t2);
            if (e2 = this._clampToCurrentTime(e2), this._state.getValueAtTime(e2) === "started" || ci(this._state.getNextState("started", e2))) {
              if (this.log("stop", e2), this._synced) {
                const t3 = this.context.transport.schedule(this._stop.bind(this), e2);
                this._scheduled.push(t3);
              } else
                this._stop(e2);
              this._state.cancel(e2), this._state.setStateAtTime("stopped", e2);
            }
            return this;
          }
          restart(t2, e2, s2) {
            return t2 = this.toSeconds(t2), this._state.getValueAtTime(t2) === "started" && (this._state.cancel(t2), this._restart(t2, e2, s2)), this;
          }
          sync() {
            return this._synced || (this._synced = true, this._syncedStart = (t2, e2) => {
              if (e2 > 0) {
                const s2 = this._state.get(e2);
                if (s2 && s2.state === "started" && s2.time !== e2) {
                  const n2 = e2 - this.toSeconds(s2.time);
                  let i2;
                  s2.duration && (i2 = this.toSeconds(s2.duration) - n2), this._start(t2, this.toSeconds(s2.offset) + n2, i2);
                }
              }
            }, this._syncedStop = (t2) => {
              const e2 = this.context.transport.getSecondsAtTime(Math.max(t2 - this.sampleTime, 0));
              this._state.getValueAtTime(e2) === "started" && this._stop(t2);
            }, this.context.transport.on("start", this._syncedStart), this.context.transport.on("loopStart", this._syncedStart), this.context.transport.on("stop", this._syncedStop), this.context.transport.on("pause", this._syncedStop), this.context.transport.on("loopEnd", this._syncedStop)), this;
          }
          unsync() {
            return this._synced && (this.context.transport.off("stop", this._syncedStop), this.context.transport.off("pause", this._syncedStop), this.context.transport.off("loopEnd", this._syncedStop), this.context.transport.off("start", this._syncedStart), this.context.transport.off("loopStart", this._syncedStart)), this._synced = false, this._scheduled.forEach((t2) => this.context.transport.clear(t2)), this._scheduled = [], this._state.cancel(0), this._stop(0), this;
          }
          dispose() {
            return super.dispose(), this.onstop = Zi, this.unsync(), this._volume.dispose(), this._state.dispose(), this;
          }
        }
        class $o extends Co {
          constructor() {
            super(Di($o.getDefaults(), arguments, ["url", "onload"])), this.name = "ToneBufferSource", this._source = this.context.createBufferSource(), this._internalChannels = [this._source], this._sourceStarted = false, this._sourceStopped = false;
            const t2 = Di($o.getDefaults(), arguments, ["url", "onload"]);
            To(this._source, this._gainNode), this._source.onended = () => this._stopSource(), this.playbackRate = new xo({context: this.context, param: this._source.playbackRate, units: "positive", value: t2.playbackRate}), this.loop = t2.loop, this.loopStart = t2.loopStart, this.loopEnd = t2.loopEnd, this._buffer = new Xi(t2.url, t2.onload, t2.onerror), this._internalChannels.push(this._source);
          }
          static getDefaults() {
            return Object.assign(Co.getDefaults(), {url: new Xi(), loop: false, loopEnd: 0, loopStart: 0, onload: Zi, onerror: Zi, playbackRate: 1});
          }
          get fadeIn() {
            return this._fadeIn;
          }
          set fadeIn(t2) {
            this._fadeIn = t2;
          }
          get fadeOut() {
            return this._fadeOut;
          }
          set fadeOut(t2) {
            this._fadeOut = t2;
          }
          get curve() {
            return this._curve;
          }
          set curve(t2) {
            this._curve = t2;
          }
          start(t2, e2, s2, n2 = 1) {
            ti(this.buffer.loaded, "buffer is either not set or not loaded");
            const i2 = this.toSeconds(t2);
            this._startGain(i2, n2), e2 = this.loop ? Oi(e2, this.loopStart) : Oi(e2, 0);
            let o2 = Math.max(this.toSeconds(e2), 0);
            if (this.loop) {
              const t3 = this.toSeconds(this.loopEnd) || this.buffer.duration, e3 = this.toSeconds(this.loopStart), s3 = t3 - e3;
              qi(o2, t3) && (o2 = (o2 - e3) % s3 + e3), Ii(o2, this.buffer.duration) && (o2 = 0);
            }
            if (this._source.buffer = this.buffer.get(), this._source.loopEnd = this.toSeconds(this.loopEnd) || this.buffer.duration, Fi(o2, this.buffer.duration) && (this._sourceStarted = true, this._source.start(i2, o2)), ci(s2)) {
              let t3 = this.toSeconds(s2);
              t3 = Math.max(t3, 0), this.stop(i2 + t3);
            }
            return this;
          }
          _stopSource(t2) {
            !this._sourceStopped && this._sourceStarted && (this._sourceStopped = true, this._source.stop(this.toSeconds(t2)), this._onended());
          }
          get loopStart() {
            return this._source.loopStart;
          }
          set loopStart(t2) {
            this._source.loopStart = this.toSeconds(t2);
          }
          get loopEnd() {
            return this._source.loopEnd;
          }
          set loopEnd(t2) {
            this._source.loopEnd = this.toSeconds(t2);
          }
          get buffer() {
            return this._buffer;
          }
          set buffer(t2) {
            this._buffer.set(t2);
          }
          get loop() {
            return this._source.loop;
          }
          set loop(t2) {
            this._source.loop = t2, this._sourceStarted && this.cancelStop();
          }
          dispose() {
            return super.dispose(), this._source.onended = null, this._source.disconnect(), this._buffer.dispose(), this.playbackRate.dispose(), this;
          }
        }
        class Jo extends Ho {
          constructor() {
            super(Di(Jo.getDefaults(), arguments, ["type"])), this.name = "Noise", this._source = null;
            const t2 = Di(Jo.getDefaults(), arguments, ["type"]);
            this._playbackRate = t2.playbackRate, this.type = t2.type, this._fadeIn = t2.fadeIn, this._fadeOut = t2.fadeOut;
          }
          static getDefaults() {
            return Object.assign(Ho.getDefaults(), {fadeIn: 0, fadeOut: 0, playbackRate: 1, type: "white"});
          }
          get type() {
            return this._type;
          }
          set type(t2) {
            if (ti(t2 in tr, "Noise: invalid type: " + t2), this._type !== t2 && (this._type = t2, this.state === "started")) {
              const t3 = this.now();
              this._stop(t3), this._start(t3);
            }
          }
          get playbackRate() {
            return this._playbackRate;
          }
          set playbackRate(t2) {
            this._playbackRate = t2, this._source && (this._source.playbackRate.value = t2);
          }
          _start(t2) {
            const e2 = tr[this._type];
            this._source = new $o({url: e2, context: this.context, fadeIn: this._fadeIn, fadeOut: this._fadeOut, loop: true, onended: () => this.onstop(this), playbackRate: this._playbackRate}).connect(this.output), this._source.start(this.toSeconds(t2), Math.random() * (e2.duration - 1e-3));
          }
          _stop(t2) {
            this._source && (this._source.stop(this.toSeconds(t2)), this._source = null);
          }
          get fadeIn() {
            return this._fadeIn;
          }
          set fadeIn(t2) {
            this._fadeIn = t2, this._source && (this._source.fadeIn = this._fadeIn);
          }
          get fadeOut() {
            return this._fadeOut;
          }
          set fadeOut(t2) {
            this._fadeOut = t2, this._source && (this._source.fadeOut = this._fadeOut);
          }
          _restart(t2) {
            this._stop(t2), this._start(t2);
          }
          dispose() {
            return super.dispose(), this._source && this._source.disconnect(), this;
          }
        }
        const Ko = {brown: null, pink: null, white: null}, tr = {get brown() {
          if (!Ko.brown) {
            const t2 = [];
            for (let e2 = 0; e2 < 2; e2++) {
              const s2 = new Float32Array(220500);
              t2[e2] = s2;
              let n2 = 0;
              for (let t3 = 0; t3 < 220500; t3++) {
                const e3 = 2 * Math.random() - 1;
                s2[t3] = (n2 + 0.02 * e3) / 1.02, n2 = s2[t3], s2[t3] *= 3.5;
              }
            }
            Ko.brown = new Xi().fromArray(t2);
          }
          return Ko.brown;
        }, get pink() {
          if (!Ko.pink) {
            const t2 = [];
            for (let e2 = 0; e2 < 2; e2++) {
              const s2 = new Float32Array(220500);
              let n2, i2, o2, r2, a2, c2, h2;
              t2[e2] = s2, n2 = i2 = o2 = r2 = a2 = c2 = h2 = 0;
              for (let t3 = 0; t3 < 220500; t3++) {
                const e3 = 2 * Math.random() - 1;
                n2 = 0.99886 * n2 + 0.0555179 * e3, i2 = 0.99332 * i2 + 0.0750759 * e3, o2 = 0.969 * o2 + 0.153852 * e3, r2 = 0.8665 * r2 + 0.3104856 * e3, a2 = 0.55 * a2 + 0.5329522 * e3, c2 = -0.7616 * c2 - 0.016898 * e3, s2[t3] = n2 + i2 + o2 + r2 + a2 + c2 + h2 + 0.5362 * e3, s2[t3] *= 0.11, h2 = 0.115926 * e3;
              }
            }
            Ko.pink = new Xi().fromArray(t2);
          }
          return Ko.pink;
        }, get white() {
          if (!Ko.white) {
            const t2 = [];
            for (let e2 = 0; e2 < 2; e2++) {
              const s2 = new Float32Array(220500);
              t2[e2] = s2;
              for (let t3 = 0; t3 < 220500; t3++)
                s2[t3] = 2 * Math.random() - 1;
            }
            Ko.white = new Xi().fromArray(t2);
          }
          return Ko.white;
        }};
        class er extends wo {
          constructor() {
            super(Di(er.getDefaults(), arguments, ["volume"])), this.name = "UserMedia";
            const t2 = Di(er.getDefaults(), arguments, ["volume"]);
            this._volume = this.output = new Go({context: this.context, volume: t2.volume}), this.volume = this._volume.volume, Ui(this, "volume"), this.mute = t2.mute;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {mute: false, volume: 0});
          }
          open(t2) {
            return yi(this, void 0, void 0, function* () {
              ti(er.supported, "UserMedia is not supported"), this.state === "started" && this.close();
              const e2 = yield er.enumerateDevices();
              ui(t2) ? this._device = e2[t2] : (this._device = e2.find((e3) => e3.label === t2 || e3.deviceId === t2), !this._device && e2.length > 0 && (this._device = e2[0]), ti(ci(this._device), "No matching device " + t2));
              const s2 = {audio: {echoCancellation: false, sampleRate: this.context.sampleRate, noiseSuppression: false, mozNoiseSuppression: false}};
              this._device && (s2.audio.deviceId = this._device.deviceId);
              const n2 = yield navigator.mediaDevices.getUserMedia(s2);
              if (!this._stream) {
                this._stream = n2;
                const t3 = this.context.createMediaStreamSource(n2);
                To(t3, this.output), this._mediaStream = t3;
              }
              return this;
            });
          }
          close() {
            return this._stream && this._mediaStream && (this._stream.getAudioTracks().forEach((t2) => {
              t2.stop();
            }), this._stream = void 0, this._mediaStream.disconnect(), this._mediaStream = void 0), this._device = void 0, this;
          }
          static enumerateDevices() {
            return yi(this, void 0, void 0, function* () {
              return (yield navigator.mediaDevices.enumerateDevices()).filter((t2) => t2.kind === "audioinput");
            });
          }
          get state() {
            return this._stream && this._stream.active ? "started" : "stopped";
          }
          get deviceId() {
            return this._device ? this._device.deviceId : void 0;
          }
          get groupId() {
            return this._device ? this._device.groupId : void 0;
          }
          get label() {
            return this._device ? this._device.label : void 0;
          }
          get mute() {
            return this._volume.mute;
          }
          set mute(t2) {
            this._volume.mute = t2;
          }
          dispose() {
            return super.dispose(), this.close(), this._volume.dispose(), this.volume.dispose(), this;
          }
          static get supported() {
            return ci(navigator.mediaDevices) && ci(navigator.mediaDevices.getUserMedia);
          }
        }
        function sr(t2, e2) {
          return yi(this, void 0, void 0, function* () {
            const s2 = e2 / t2.context.sampleRate, n2 = new Yi(1, s2, t2.context.sampleRate);
            new t2.constructor(Object.assign(t2.get(), {frequency: 2 / s2, detune: 0, context: n2})).toDestination().start(0);
            return (yield n2.render()).getChannelData(0);
          });
        }
        class nr extends Co {
          constructor() {
            super(Di(nr.getDefaults(), arguments, ["frequency", "type"])), this.name = "ToneOscillatorNode", this._oscillator = this.context.createOscillator(), this._internalChannels = [this._oscillator];
            const t2 = Di(nr.getDefaults(), arguments, ["frequency", "type"]);
            To(this._oscillator, this._gainNode), this.type = t2.type, this.frequency = new xo({context: this.context, param: this._oscillator.frequency, units: "frequency", value: t2.frequency}), this.detune = new xo({context: this.context, param: this._oscillator.detune, units: "cents", value: t2.detune}), Ui(this, ["frequency", "detune"]);
          }
          static getDefaults() {
            return Object.assign(Co.getDefaults(), {detune: 0, frequency: 440, type: "sine"});
          }
          start(t2) {
            const e2 = this.toSeconds(t2);
            return this.log("start", e2), this._startGain(e2), this._oscillator.start(e2), this;
          }
          _stopSource(t2) {
            this._oscillator.stop(t2);
          }
          setPeriodicWave(t2) {
            return this._oscillator.setPeriodicWave(t2), this;
          }
          get type() {
            return this._oscillator.type;
          }
          set type(t2) {
            this._oscillator.type = t2;
          }
          dispose() {
            return super.dispose(), this.state === "started" && this.stop(), this._oscillator.disconnect(), this.frequency.dispose(), this.detune.dispose(), this;
          }
        }
        class ir extends Ho {
          constructor() {
            super(Di(ir.getDefaults(), arguments, ["frequency", "type"])), this.name = "Oscillator", this._oscillator = null;
            const t2 = Di(ir.getDefaults(), arguments, ["frequency", "type"]);
            this.frequency = new Do({context: this.context, units: "frequency", value: t2.frequency}), Ui(this, "frequency"), this.detune = new Do({context: this.context, units: "cents", value: t2.detune}), Ui(this, "detune"), this._partials = t2.partials, this._partialCount = t2.partialCount, this._type = t2.type, t2.partialCount && t2.type !== "custom" && (this._type = this.baseType + t2.partialCount.toString()), this.phase = t2.phase;
          }
          static getDefaults() {
            return Object.assign(Ho.getDefaults(), {detune: 0, frequency: 440, partialCount: 0, partials: [], phase: 0, type: "sine"});
          }
          _start(t2) {
            const e2 = this.toSeconds(t2), s2 = new nr({context: this.context, onended: () => this.onstop(this)});
            this._oscillator = s2, this._wave ? this._oscillator.setPeriodicWave(this._wave) : this._oscillator.type = this._type, this._oscillator.connect(this.output), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.start(e2);
          }
          _stop(t2) {
            const e2 = this.toSeconds(t2);
            this._oscillator && this._oscillator.stop(e2);
          }
          _restart(t2) {
            const e2 = this.toSeconds(t2);
            return this.log("restart", e2), this._oscillator && this._oscillator.cancelStop(), this._state.cancel(e2), this;
          }
          syncFrequency() {
            return this.context.transport.syncSignal(this.frequency), this;
          }
          unsyncFrequency() {
            return this.context.transport.unsyncSignal(this.frequency), this;
          }
          _getCachedPeriodicWave() {
            if (this._type === "custom") {
              return ir._periodicWaveCache.find((t2) => {
                return t2.phase === this._phase && (e2 = t2.partials, s2 = this._partials, e2.length === s2.length && e2.every((t3, e3) => s2[e3] === t3));
                var e2, s2;
              });
            }
            {
              const t2 = ir._periodicWaveCache.find((t3) => t3.type === this._type && t3.phase === this._phase);
              return this._partialCount = t2 ? t2.partialCount : this._partialCount, t2;
            }
          }
          get type() {
            return this._type;
          }
          set type(t2) {
            this._type = t2;
            const e2 = ["sine", "square", "sawtooth", "triangle"].indexOf(t2) !== -1;
            if (this._phase === 0 && e2)
              this._wave = void 0, this._partialCount = 0, this._oscillator !== null && (this._oscillator.type = t2);
            else {
              const e3 = this._getCachedPeriodicWave();
              if (ci(e3)) {
                const {partials: t3, wave: s2} = e3;
                this._wave = s2, this._partials = t3, this._oscillator !== null && this._oscillator.setPeriodicWave(this._wave);
              } else {
                const [e4, s2] = this._getRealImaginary(t2, this._phase), n2 = this.context.createPeriodicWave(e4, s2);
                this._wave = n2, this._oscillator !== null && this._oscillator.setPeriodicWave(this._wave), ir._periodicWaveCache.push({imag: s2, partialCount: this._partialCount, partials: this._partials, phase: this._phase, real: e4, type: this._type, wave: this._wave}), ir._periodicWaveCache.length > 100 && ir._periodicWaveCache.shift();
              }
            }
          }
          get baseType() {
            return this._type.replace(this.partialCount.toString(), "");
          }
          set baseType(t2) {
            this.partialCount && this._type !== "custom" && t2 !== "custom" ? this.type = t2 + this.partialCount : this.type = t2;
          }
          get partialCount() {
            return this._partialCount;
          }
          set partialCount(t2) {
            ei(t2, 0);
            let e2 = this._type;
            const s2 = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);
            if (s2 && (e2 = s2[1]), this._type !== "custom")
              this.type = t2 === 0 ? e2 : e2 + t2.toString();
            else {
              const e3 = new Float32Array(t2);
              this._partials.forEach((t3, s3) => e3[s3] = t3), this._partials = Array.from(e3), this.type = this._type;
            }
          }
          _getRealImaginary(t2, e2) {
            let s2 = 2048;
            const n2 = new Float32Array(s2), i2 = new Float32Array(s2);
            let o2 = 1;
            if (t2 === "custom") {
              if (o2 = this._partials.length + 1, this._partialCount = this._partials.length, s2 = o2, this._partials.length === 0)
                return [n2, i2];
            } else {
              const e3 = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(t2);
              e3 ? (o2 = parseInt(e3[2], 10) + 1, this._partialCount = parseInt(e3[2], 10), t2 = e3[1], o2 = Math.max(o2, 2), s2 = o2) : this._partialCount = 0, this._partials = [];
            }
            for (let r2 = 1; r2 < s2; ++r2) {
              const s3 = 2 / (r2 * Math.PI);
              let a2;
              switch (t2) {
                case "sine":
                  a2 = r2 <= o2 ? 1 : 0, this._partials[r2 - 1] = a2;
                  break;
                case "square":
                  a2 = 1 & r2 ? 2 * s3 : 0, this._partials[r2 - 1] = a2;
                  break;
                case "sawtooth":
                  a2 = s3 * (1 & r2 ? 1 : -1), this._partials[r2 - 1] = a2;
                  break;
                case "triangle":
                  a2 = 1 & r2 ? s3 * s3 * 2 * (r2 - 1 >> 1 & 1 ? -1 : 1) : 0, this._partials[r2 - 1] = a2;
                  break;
                case "custom":
                  a2 = this._partials[r2 - 1];
                  break;
                default:
                  throw new TypeError("Oscillator: invalid type: " + t2);
              }
              a2 !== 0 ? (n2[r2] = -a2 * Math.sin(e2 * r2), i2[r2] = a2 * Math.cos(e2 * r2)) : (n2[r2] = 0, i2[r2] = 0);
            }
            return [n2, i2];
          }
          _inverseFFT(t2, e2, s2) {
            let n2 = 0;
            const i2 = t2.length;
            for (let o2 = 0; o2 < i2; o2++)
              n2 += t2[o2] * Math.cos(o2 * s2) + e2[o2] * Math.sin(o2 * s2);
            return n2;
          }
          getInitialValue() {
            const [t2, e2] = this._getRealImaginary(this._type, 0);
            let s2 = 0;
            const n2 = 2 * Math.PI;
            for (let i2 = 0; i2 < 32; i2++)
              s2 = Math.max(this._inverseFFT(t2, e2, i2 / 32 * n2), s2);
            return Vi(-this._inverseFFT(t2, e2, this._phase) / s2, -1, 1);
          }
          get partials() {
            return this._partials.slice(0, this.partialCount);
          }
          set partials(t2) {
            this._partials = t2, this._partialCount = this._partials.length, t2.length && (this.type = "custom");
          }
          get phase() {
            return this._phase * (180 / Math.PI);
          }
          set phase(t2) {
            this._phase = t2 * Math.PI / 180, this.type = this._type;
          }
          asArray(t2 = 1024) {
            return yi(this, void 0, void 0, function* () {
              return sr(this, t2);
            });
          }
          dispose() {
            return super.dispose(), this._oscillator !== null && this._oscillator.dispose(), this._wave = void 0, this.frequency.dispose(), this.detune.dispose(), this;
          }
        }
        ir._periodicWaveCache = [];
        class or extends wo {
          constructor() {
            super(Object.assign(Di(or.getDefaults(), arguments, ["context"])));
          }
          connect(t2, e2 = 0, s2 = 0) {
            return Oo(this, t2, e2, s2), this;
          }
        }
        class rr extends or {
          constructor() {
            super(Object.assign(Di(rr.getDefaults(), arguments, ["mapping", "length"]))), this.name = "WaveShaper", this._shaper = this.context.createWaveShaper(), this.input = this._shaper, this.output = this._shaper;
            const t2 = Di(rr.getDefaults(), arguments, ["mapping", "length"]);
            di(t2.mapping) || t2.mapping instanceof Float32Array ? this.curve = Float32Array.from(t2.mapping) : hi(t2.mapping) && this.setMap(t2.mapping, t2.length);
          }
          static getDefaults() {
            return Object.assign(Do.getDefaults(), {length: 1024});
          }
          setMap(t2, e2 = 1024) {
            const s2 = new Float32Array(e2);
            for (let n2 = 0, i2 = e2; n2 < i2; n2++) {
              const e3 = n2 / (i2 - 1) * 2 - 1;
              s2[n2] = t2(e3, n2);
            }
            return this.curve = s2, this;
          }
          get curve() {
            return this._shaper.curve;
          }
          set curve(t2) {
            this._shaper.curve = t2;
          }
          get oversample() {
            return this._shaper.oversample;
          }
          set oversample(t2) {
            ti(["none", "2x", "4x"].some((e2) => e2.includes(t2)), "oversampling must be either 'none', '2x', or '4x'"), this._shaper.oversample = t2;
          }
          dispose() {
            return super.dispose(), this._shaper.disconnect(), this;
          }
        }
        class ar extends or {
          constructor() {
            super(...arguments), this.name = "AudioToGain", this._norm = new rr({context: this.context, mapping: (t2) => (t2 + 1) / 2}), this.input = this._norm, this.output = this._norm;
          }
          dispose() {
            return super.dispose(), this._norm.dispose(), this;
          }
        }
        class cr extends Do {
          constructor() {
            super(Object.assign(Di(cr.getDefaults(), arguments, ["value"]))), this.name = "Multiply", this.override = false;
            const t2 = Di(cr.getDefaults(), arguments, ["value"]);
            this._mult = this.input = this.output = new ko({context: this.context, minValue: t2.minValue, maxValue: t2.maxValue}), this.factor = this._param = this._mult.gain, this.factor.setValueAtTime(t2.value, 0);
          }
          static getDefaults() {
            return Object.assign(Do.getDefaults(), {value: 0});
          }
          dispose() {
            return super.dispose(), this._mult.dispose(), this;
          }
        }
        class hr extends Ho {
          constructor() {
            super(Di(hr.getDefaults(), arguments, ["frequency", "type", "modulationType"])), this.name = "AMOscillator", this._modulationScale = new ar({context: this.context}), this._modulationNode = new ko({context: this.context});
            const t2 = Di(hr.getDefaults(), arguments, ["frequency", "type", "modulationType"]);
            this._carrier = new ir({context: this.context, detune: t2.detune, frequency: t2.frequency, onstop: () => this.onstop(this), phase: t2.phase, type: t2.type}), this.frequency = this._carrier.frequency, this.detune = this._carrier.detune, this._modulator = new ir({context: this.context, phase: t2.phase, type: t2.modulationType}), this.harmonicity = new cr({context: this.context, units: "positive", value: t2.harmonicity}), this.frequency.chain(this.harmonicity, this._modulator.frequency), this._modulator.chain(this._modulationScale, this._modulationNode.gain), this._carrier.chain(this._modulationNode, this.output), Ui(this, ["frequency", "detune", "harmonicity"]);
          }
          static getDefaults() {
            return Object.assign(ir.getDefaults(), {harmonicity: 1, modulationType: "square"});
          }
          _start(t2) {
            this._modulator.start(t2), this._carrier.start(t2);
          }
          _stop(t2) {
            this._modulator.stop(t2), this._carrier.stop(t2);
          }
          _restart(t2) {
            this._modulator.restart(t2), this._carrier.restart(t2);
          }
          get type() {
            return this._carrier.type;
          }
          set type(t2) {
            this._carrier.type = t2;
          }
          get baseType() {
            return this._carrier.baseType;
          }
          set baseType(t2) {
            this._carrier.baseType = t2;
          }
          get partialCount() {
            return this._carrier.partialCount;
          }
          set partialCount(t2) {
            this._carrier.partialCount = t2;
          }
          get modulationType() {
            return this._modulator.type;
          }
          set modulationType(t2) {
            this._modulator.type = t2;
          }
          get phase() {
            return this._carrier.phase;
          }
          set phase(t2) {
            this._carrier.phase = t2, this._modulator.phase = t2;
          }
          get partials() {
            return this._carrier.partials;
          }
          set partials(t2) {
            this._carrier.partials = t2;
          }
          asArray(t2 = 1024) {
            return yi(this, void 0, void 0, function* () {
              return sr(this, t2);
            });
          }
          dispose() {
            return super.dispose(), this.frequency.dispose(), this.detune.dispose(), this.harmonicity.dispose(), this._carrier.dispose(), this._modulator.dispose(), this._modulationNode.dispose(), this._modulationScale.dispose(), this;
          }
        }
        class ur extends Ho {
          constructor() {
            super(Di(ur.getDefaults(), arguments, ["frequency", "type", "modulationType"])), this.name = "FMOscillator", this._modulationNode = new ko({context: this.context, gain: 0});
            const t2 = Di(ur.getDefaults(), arguments, ["frequency", "type", "modulationType"]);
            this._carrier = new ir({context: this.context, detune: t2.detune, frequency: 0, onstop: () => this.onstop(this), phase: t2.phase, type: t2.type}), this.detune = this._carrier.detune, this.frequency = new Do({context: this.context, units: "frequency", value: t2.frequency}), this._modulator = new ir({context: this.context, phase: t2.phase, type: t2.modulationType}), this.harmonicity = new cr({context: this.context, units: "positive", value: t2.harmonicity}), this.modulationIndex = new cr({context: this.context, units: "positive", value: t2.modulationIndex}), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.frequency.chain(this.modulationIndex, this._modulationNode), this._modulator.connect(this._modulationNode.gain), this._modulationNode.connect(this._carrier.frequency), this._carrier.connect(this.output), this.detune.connect(this._modulator.detune), Ui(this, ["modulationIndex", "frequency", "detune", "harmonicity"]);
          }
          static getDefaults() {
            return Object.assign(ir.getDefaults(), {harmonicity: 1, modulationIndex: 2, modulationType: "square"});
          }
          _start(t2) {
            this._modulator.start(t2), this._carrier.start(t2);
          }
          _stop(t2) {
            this._modulator.stop(t2), this._carrier.stop(t2);
          }
          _restart(t2) {
            return this._modulator.restart(t2), this._carrier.restart(t2), this;
          }
          get type() {
            return this._carrier.type;
          }
          set type(t2) {
            this._carrier.type = t2;
          }
          get baseType() {
            return this._carrier.baseType;
          }
          set baseType(t2) {
            this._carrier.baseType = t2;
          }
          get partialCount() {
            return this._carrier.partialCount;
          }
          set partialCount(t2) {
            this._carrier.partialCount = t2;
          }
          get modulationType() {
            return this._modulator.type;
          }
          set modulationType(t2) {
            this._modulator.type = t2;
          }
          get phase() {
            return this._carrier.phase;
          }
          set phase(t2) {
            this._carrier.phase = t2, this._modulator.phase = t2;
          }
          get partials() {
            return this._carrier.partials;
          }
          set partials(t2) {
            this._carrier.partials = t2;
          }
          asArray(t2 = 1024) {
            return yi(this, void 0, void 0, function* () {
              return sr(this, t2);
            });
          }
          dispose() {
            return super.dispose(), this.frequency.dispose(), this.harmonicity.dispose(), this._carrier.dispose(), this._modulator.dispose(), this._modulationNode.dispose(), this.modulationIndex.dispose(), this;
          }
        }
        class lr extends Ho {
          constructor() {
            super(Di(lr.getDefaults(), arguments, ["frequency", "width"])), this.name = "PulseOscillator", this._widthGate = new ko({context: this.context, gain: 0}), this._thresh = new rr({context: this.context, mapping: (t3) => t3 <= 0 ? -1 : 1});
            const t2 = Di(lr.getDefaults(), arguments, ["frequency", "width"]);
            this.width = new Do({context: this.context, units: "audioRange", value: t2.width}), this._triangle = new ir({context: this.context, detune: t2.detune, frequency: t2.frequency, onstop: () => this.onstop(this), phase: t2.phase, type: "triangle"}), this.frequency = this._triangle.frequency, this.detune = this._triangle.detune, this._triangle.chain(this._thresh, this.output), this.width.chain(this._widthGate, this._thresh), Ui(this, ["width", "frequency", "detune"]);
          }
          static getDefaults() {
            return Object.assign(Ho.getDefaults(), {detune: 0, frequency: 440, phase: 0, type: "pulse", width: 0.2});
          }
          _start(t2) {
            t2 = this.toSeconds(t2), this._triangle.start(t2), this._widthGate.gain.setValueAtTime(1, t2);
          }
          _stop(t2) {
            t2 = this.toSeconds(t2), this._triangle.stop(t2), this._widthGate.gain.cancelScheduledValues(t2), this._widthGate.gain.setValueAtTime(0, t2);
          }
          _restart(t2) {
            this._triangle.restart(t2), this._widthGate.gain.cancelScheduledValues(t2), this._widthGate.gain.setValueAtTime(1, t2);
          }
          get phase() {
            return this._triangle.phase;
          }
          set phase(t2) {
            this._triangle.phase = t2;
          }
          get type() {
            return "pulse";
          }
          get baseType() {
            return "pulse";
          }
          get partials() {
            return [];
          }
          get partialCount() {
            return 0;
          }
          set carrierType(t2) {
            this._triangle.type = t2;
          }
          asArray(t2 = 1024) {
            return yi(this, void 0, void 0, function* () {
              return sr(this, t2);
            });
          }
          dispose() {
            return super.dispose(), this._triangle.dispose(), this.width.dispose(), this._widthGate.dispose(), this._thresh.dispose(), this;
          }
        }
        class pr extends Ho {
          constructor() {
            super(Di(pr.getDefaults(), arguments, ["frequency", "type", "spread"])), this.name = "FatOscillator", this._oscillators = [];
            const t2 = Di(pr.getDefaults(), arguments, ["frequency", "type", "spread"]);
            this.frequency = new Do({context: this.context, units: "frequency", value: t2.frequency}), this.detune = new Do({context: this.context, units: "cents", value: t2.detune}), this._spread = t2.spread, this._type = t2.type, this._phase = t2.phase, this._partials = t2.partials, this._partialCount = t2.partialCount, this.count = t2.count, Ui(this, ["frequency", "detune"]);
          }
          static getDefaults() {
            return Object.assign(ir.getDefaults(), {count: 3, spread: 20, type: "sawtooth"});
          }
          _start(t2) {
            t2 = this.toSeconds(t2), this._forEach((e2) => e2.start(t2));
          }
          _stop(t2) {
            t2 = this.toSeconds(t2), this._forEach((e2) => e2.stop(t2));
          }
          _restart(t2) {
            this._forEach((e2) => e2.restart(t2));
          }
          _forEach(t2) {
            for (let e2 = 0; e2 < this._oscillators.length; e2++)
              t2(this._oscillators[e2], e2);
          }
          get type() {
            return this._type;
          }
          set type(t2) {
            this._type = t2, this._forEach((e2) => e2.type = t2);
          }
          get spread() {
            return this._spread;
          }
          set spread(t2) {
            if (this._spread = t2, this._oscillators.length > 1) {
              const e2 = -t2 / 2, s2 = t2 / (this._oscillators.length - 1);
              this._forEach((t3, n2) => t3.detune.value = e2 + s2 * n2);
            }
          }
          get count() {
            return this._oscillators.length;
          }
          set count(t2) {
            if (ei(t2, 1), this._oscillators.length !== t2) {
              this._forEach((t3) => t3.dispose()), this._oscillators = [];
              for (let e2 = 0; e2 < t2; e2++) {
                const s2 = new ir({context: this.context, volume: -6 - 1.1 * t2, type: this._type, phase: this._phase + e2 / t2 * 360, partialCount: this._partialCount, onstop: e2 === 0 ? () => this.onstop(this) : Zi});
                this.type === "custom" && (s2.partials = this._partials), this.frequency.connect(s2.frequency), this.detune.connect(s2.detune), s2.detune.overridden = false, s2.connect(this.output), this._oscillators[e2] = s2;
              }
              this.spread = this._spread, this.state === "started" && this._forEach((t3) => t3.start());
            }
          }
          get phase() {
            return this._phase;
          }
          set phase(t2) {
            this._phase = t2, this._forEach((t3, e2) => t3.phase = this._phase + e2 / this.count * 360);
          }
          get baseType() {
            return this._oscillators[0].baseType;
          }
          set baseType(t2) {
            this._forEach((e2) => e2.baseType = t2), this._type = this._oscillators[0].type;
          }
          get partials() {
            return this._oscillators[0].partials;
          }
          set partials(t2) {
            this._partials = t2, this._partialCount = this._partials.length, t2.length && (this._type = "custom", this._forEach((e2) => e2.partials = t2));
          }
          get partialCount() {
            return this._oscillators[0].partialCount;
          }
          set partialCount(t2) {
            this._partialCount = t2, this._forEach((e2) => e2.partialCount = t2), this._type = this._oscillators[0].type;
          }
          asArray(t2 = 1024) {
            return yi(this, void 0, void 0, function* () {
              return sr(this, t2);
            });
          }
          dispose() {
            return super.dispose(), this.frequency.dispose(), this.detune.dispose(), this._forEach((t2) => t2.dispose()), this;
          }
        }
        class dr extends Ho {
          constructor() {
            super(Di(dr.getDefaults(), arguments, ["frequency", "modulationFrequency"])), this.name = "PWMOscillator", this.sourceType = "pwm", this._scale = new cr({context: this.context, value: 2});
            const t2 = Di(dr.getDefaults(), arguments, ["frequency", "modulationFrequency"]);
            this._pulse = new lr({context: this.context, frequency: t2.modulationFrequency}), this._pulse.carrierType = "sine", this.modulationFrequency = this._pulse.frequency, this._modulator = new ir({context: this.context, detune: t2.detune, frequency: t2.frequency, onstop: () => this.onstop(this), phase: t2.phase}), this.frequency = this._modulator.frequency, this.detune = this._modulator.detune, this._modulator.chain(this._scale, this._pulse.width), this._pulse.connect(this.output), Ui(this, ["modulationFrequency", "frequency", "detune"]);
          }
          static getDefaults() {
            return Object.assign(Ho.getDefaults(), {detune: 0, frequency: 440, modulationFrequency: 0.4, phase: 0, type: "pwm"});
          }
          _start(t2) {
            t2 = this.toSeconds(t2), this._modulator.start(t2), this._pulse.start(t2);
          }
          _stop(t2) {
            t2 = this.toSeconds(t2), this._modulator.stop(t2), this._pulse.stop(t2);
          }
          _restart(t2) {
            this._modulator.restart(t2), this._pulse.restart(t2);
          }
          get type() {
            return "pwm";
          }
          get baseType() {
            return "pwm";
          }
          get partials() {
            return [];
          }
          get partialCount() {
            return 0;
          }
          get phase() {
            return this._modulator.phase;
          }
          set phase(t2) {
            this._modulator.phase = t2;
          }
          asArray(t2 = 1024) {
            return yi(this, void 0, void 0, function* () {
              return sr(this, t2);
            });
          }
          dispose() {
            return super.dispose(), this._pulse.dispose(), this._scale.dispose(), this._modulator.dispose(), this;
          }
        }
        const fr = {am: hr, fat: pr, fm: ur, oscillator: ir, pulse: lr, pwm: dr};
        class _r extends Ho {
          constructor() {
            super(Di(_r.getDefaults(), arguments, ["frequency", "type"])), this.name = "OmniOscillator";
            const t2 = Di(_r.getDefaults(), arguments, ["frequency", "type"]);
            this.frequency = new Do({context: this.context, units: "frequency", value: t2.frequency}), this.detune = new Do({context: this.context, units: "cents", value: t2.detune}), Ui(this, ["frequency", "detune"]), this.set(t2);
          }
          static getDefaults() {
            return Object.assign(ir.getDefaults(), ur.getDefaults(), hr.getDefaults(), pr.getDefaults(), lr.getDefaults(), dr.getDefaults());
          }
          _start(t2) {
            this._oscillator.start(t2);
          }
          _stop(t2) {
            this._oscillator.stop(t2);
          }
          _restart(t2) {
            return this._oscillator.restart(t2), this;
          }
          get type() {
            let t2 = "";
            return ["am", "fm", "fat"].some((t3) => this._sourceType === t3) && (t2 = this._sourceType), t2 + this._oscillator.type;
          }
          set type(t2) {
            t2.substr(0, 2) === "fm" ? (this._createNewOscillator("fm"), this._oscillator = this._oscillator, this._oscillator.type = t2.substr(2)) : t2.substr(0, 2) === "am" ? (this._createNewOscillator("am"), this._oscillator = this._oscillator, this._oscillator.type = t2.substr(2)) : t2.substr(0, 3) === "fat" ? (this._createNewOscillator("fat"), this._oscillator = this._oscillator, this._oscillator.type = t2.substr(3)) : t2 === "pwm" ? (this._createNewOscillator("pwm"), this._oscillator = this._oscillator) : t2 === "pulse" ? this._createNewOscillator("pulse") : (this._createNewOscillator("oscillator"), this._oscillator = this._oscillator, this._oscillator.type = t2);
          }
          get partials() {
            return this._oscillator.partials;
          }
          set partials(t2) {
            this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || (this._oscillator.partials = t2);
          }
          get partialCount() {
            return this._oscillator.partialCount;
          }
          set partialCount(t2) {
            this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || (this._oscillator.partialCount = t2);
          }
          set(t2) {
            return Reflect.has(t2, "type") && t2.type && (this.type = t2.type), super.set(t2), this;
          }
          _createNewOscillator(t2) {
            if (t2 !== this._sourceType) {
              this._sourceType = t2;
              const e2 = fr[t2], s2 = this.now();
              if (this._oscillator) {
                const t3 = this._oscillator;
                t3.stop(s2), this.context.setTimeout(() => t3.dispose(), this.blockTime);
              }
              this._oscillator = new e2({context: this.context}), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.connect(this.output), this._oscillator.onstop = () => this.onstop(this), this.state === "started" && this._oscillator.start(s2);
            }
          }
          get phase() {
            return this._oscillator.phase;
          }
          set phase(t2) {
            this._oscillator.phase = t2;
          }
          get sourceType() {
            return this._sourceType;
          }
          set sourceType(t2) {
            let e2 = "sine";
            this._oscillator.type !== "pwm" && this._oscillator.type !== "pulse" && (e2 = this._oscillator.type), t2 === "fm" ? this.type = "fm" + e2 : t2 === "am" ? this.type = "am" + e2 : t2 === "fat" ? this.type = "fat" + e2 : t2 === "oscillator" ? this.type = e2 : t2 === "pulse" ? this.type = "pulse" : t2 === "pwm" && (this.type = "pwm");
          }
          _getOscType(t2, e2) {
            return t2 instanceof fr[e2];
          }
          get baseType() {
            return this._oscillator.baseType;
          }
          set baseType(t2) {
            this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || t2 === "pulse" || t2 === "pwm" || (this._oscillator.baseType = t2);
          }
          get width() {
            return this._getOscType(this._oscillator, "pulse") ? this._oscillator.width : void 0;
          }
          get count() {
            return this._getOscType(this._oscillator, "fat") ? this._oscillator.count : void 0;
          }
          set count(t2) {
            this._getOscType(this._oscillator, "fat") && ui(t2) && (this._oscillator.count = t2);
          }
          get spread() {
            return this._getOscType(this._oscillator, "fat") ? this._oscillator.spread : void 0;
          }
          set spread(t2) {
            this._getOscType(this._oscillator, "fat") && ui(t2) && (this._oscillator.spread = t2);
          }
          get modulationType() {
            return this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am") ? this._oscillator.modulationType : void 0;
          }
          set modulationType(t2) {
            (this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am")) && fi(t2) && (this._oscillator.modulationType = t2);
          }
          get modulationIndex() {
            return this._getOscType(this._oscillator, "fm") ? this._oscillator.modulationIndex : void 0;
          }
          get harmonicity() {
            return this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am") ? this._oscillator.harmonicity : void 0;
          }
          get modulationFrequency() {
            return this._getOscType(this._oscillator, "pwm") ? this._oscillator.modulationFrequency : void 0;
          }
          asArray(t2 = 1024) {
            return yi(this, void 0, void 0, function* () {
              return sr(this, t2);
            });
          }
          dispose() {
            return super.dispose(), this.detune.dispose(), this.frequency.dispose(), this._oscillator.dispose(), this;
          }
        }
        class mr extends Do {
          constructor() {
            super(Object.assign(Di(mr.getDefaults(), arguments, ["value"]))), this.override = false, this.name = "Add", this._sum = new ko({context: this.context}), this.input = this._sum, this.output = this._sum, this.addend = this._param, bo(this._constantSource, this._sum);
          }
          static getDefaults() {
            return Object.assign(Do.getDefaults(), {value: 0});
          }
          dispose() {
            return super.dispose(), this._sum.dispose(), this;
          }
        }
        class gr extends or {
          constructor() {
            super(Object.assign(Di(gr.getDefaults(), arguments, ["min", "max"]))), this.name = "Scale";
            const t2 = Di(gr.getDefaults(), arguments, ["min", "max"]);
            this._mult = this.input = new cr({context: this.context, value: t2.max - t2.min}), this._add = this.output = new mr({context: this.context, value: t2.min}), this._min = t2.min, this._max = t2.max, this.input.connect(this.output);
          }
          static getDefaults() {
            return Object.assign(or.getDefaults(), {max: 1, min: 0});
          }
          get min() {
            return this._min;
          }
          set min(t2) {
            this._min = t2, this._setRange();
          }
          get max() {
            return this._max;
          }
          set max(t2) {
            this._max = t2, this._setRange();
          }
          _setRange() {
            this._add.value = this._min, this._mult.value = this._max - this._min;
          }
          dispose() {
            return super.dispose(), this._add.dispose(), this._mult.dispose(), this;
          }
        }
        class vr extends or {
          constructor() {
            super(Object.assign(Di(vr.getDefaults(), arguments))), this.name = "Zero", this._gain = new ko({context: this.context}), this.output = this._gain, this.input = void 0, To(this.context.getConstant(0), this._gain);
          }
          dispose() {
            return super.dispose(), So(this.context.getConstant(0), this._gain), this;
          }
        }
        class yr extends wo {
          constructor() {
            super(Di(yr.getDefaults(), arguments, ["frequency", "min", "max"])), this.name = "LFO", this._stoppedValue = 0, this._units = "number", this.convert = true, this._fromType = xo.prototype._fromType, this._toType = xo.prototype._toType, this._is = xo.prototype._is, this._clampValue = xo.prototype._clampValue;
            const t2 = Di(yr.getDefaults(), arguments, ["frequency", "min", "max"]);
            this._oscillator = new ir(t2), this.frequency = this._oscillator.frequency, this._amplitudeGain = new ko({context: this.context, gain: t2.amplitude, units: "normalRange"}), this.amplitude = this._amplitudeGain.gain, this._stoppedSignal = new Do({context: this.context, units: "audioRange", value: 0}), this._zeros = new vr({context: this.context}), this._a2g = new ar({context: this.context}), this._scaler = this.output = new gr({context: this.context, max: t2.max, min: t2.min}), this.units = t2.units, this.min = t2.min, this.max = t2.max, this._oscillator.chain(this._amplitudeGain, this._a2g, this._scaler), this._zeros.connect(this._a2g), this._stoppedSignal.connect(this._a2g), Ui(this, ["amplitude", "frequency"]), this.phase = t2.phase;
          }
          static getDefaults() {
            return Object.assign(ir.getDefaults(), {amplitude: 1, frequency: "4n", max: 1, min: 0, type: "sine", units: "number"});
          }
          start(t2) {
            return t2 = this.toSeconds(t2), this._stoppedSignal.setValueAtTime(0, t2), this._oscillator.start(t2), this;
          }
          stop(t2) {
            return t2 = this.toSeconds(t2), this._stoppedSignal.setValueAtTime(this._stoppedValue, t2), this._oscillator.stop(t2), this;
          }
          sync() {
            return this._oscillator.sync(), this._oscillator.syncFrequency(), this;
          }
          unsync() {
            return this._oscillator.unsync(), this._oscillator.unsyncFrequency(), this;
          }
          _setStoppedValue() {
            this._stoppedValue = this._oscillator.getInitialValue(), this._stoppedSignal.value = this._stoppedValue;
          }
          get min() {
            return this._toType(this._scaler.min);
          }
          set min(t2) {
            t2 = this._fromType(t2), this._scaler.min = t2;
          }
          get max() {
            return this._toType(this._scaler.max);
          }
          set max(t2) {
            t2 = this._fromType(t2), this._scaler.max = t2;
          }
          get type() {
            return this._oscillator.type;
          }
          set type(t2) {
            this._oscillator.type = t2, this._setStoppedValue();
          }
          get partials() {
            return this._oscillator.partials;
          }
          set partials(t2) {
            this._oscillator.partials = t2, this._setStoppedValue();
          }
          get phase() {
            return this._oscillator.phase;
          }
          set phase(t2) {
            this._oscillator.phase = t2, this._setStoppedValue();
          }
          get units() {
            return this._units;
          }
          set units(t2) {
            const e2 = this.min, s2 = this.max;
            this._units = t2, this.min = e2, this.max = s2;
          }
          get state() {
            return this._oscillator.state;
          }
          connect(t2, e2, s2) {
            return (t2 instanceof xo || t2 instanceof Do) && (this.convert = t2.convert, this.units = t2.units), Oo(this, t2, e2, s2), this;
          }
          dispose() {
            return super.dispose(), this._oscillator.dispose(), this._stoppedSignal.dispose(), this._zeros.dispose(), this._scaler.dispose(), this._a2g.dispose(), this._amplitudeGain.dispose(), this.amplitude.dispose(), this;
          }
        }
        function xr(t2, e2 = 1 / 0) {
          const s2 = new WeakMap();
          return function(n2, i2) {
            Reflect.defineProperty(n2, i2, {configurable: true, enumerable: true, get: function() {
              return s2.get(this);
            }, set: function(n3) {
              ei(n3, t2, e2), s2.set(this, n3);
            }});
          };
        }
        function wr(t2, e2 = 1 / 0) {
          const s2 = new WeakMap();
          return function(n2, i2) {
            Reflect.defineProperty(n2, i2, {configurable: true, enumerable: true, get: function() {
              return s2.get(this);
            }, set: function(n3) {
              ei(this.toSeconds(n3), t2, e2), s2.set(this, n3);
            }});
          };
        }
        class br extends Ho {
          constructor() {
            super(Di(br.getDefaults(), arguments, ["url", "onload"])), this.name = "Player", this._activeSources = new Set();
            const t2 = Di(br.getDefaults(), arguments, ["url", "onload"]);
            this._buffer = new Xi({onload: this._onload.bind(this, t2.onload), onerror: t2.onerror, reverse: t2.reverse, url: t2.url}), this.autostart = t2.autostart, this._loop = t2.loop, this._loopStart = t2.loopStart, this._loopEnd = t2.loopEnd, this._playbackRate = t2.playbackRate, this.fadeIn = t2.fadeIn, this.fadeOut = t2.fadeOut;
          }
          static getDefaults() {
            return Object.assign(Ho.getDefaults(), {autostart: false, fadeIn: 0, fadeOut: 0, loop: false, loopEnd: 0, loopStart: 0, onload: Zi, onerror: Zi, playbackRate: 1, reverse: false});
          }
          load(t2) {
            return yi(this, void 0, void 0, function* () {
              return yield this._buffer.load(t2), this._onload(), this;
            });
          }
          _onload(t2 = Zi) {
            t2(), this.autostart && this.start();
          }
          _onSourceEnd(t2) {
            this.onstop(this), this._activeSources.delete(t2), this._activeSources.size !== 0 || this._synced || this._state.getValueAtTime(this.now()) !== "started" || (this._state.cancel(this.now()), this._state.setStateAtTime("stopped", this.now()));
          }
          start(t2, e2, s2) {
            return super.start(t2, e2, s2), this;
          }
          _start(t2, e2, s2) {
            e2 = this._loop ? Oi(e2, this._loopStart) : Oi(e2, 0);
            const n2 = this.toSeconds(e2), i2 = s2;
            s2 = Oi(s2, Math.max(this._buffer.duration - n2, 0));
            let o2 = this.toSeconds(s2);
            o2 /= this._playbackRate, t2 = this.toSeconds(t2);
            const r2 = new $o({url: this._buffer, context: this.context, fadeIn: this.fadeIn, fadeOut: this.fadeOut, loop: this._loop, loopEnd: this._loopEnd, loopStart: this._loopStart, onended: this._onSourceEnd.bind(this), playbackRate: this._playbackRate}).connect(this.output);
            this._loop || this._synced || (this._state.cancel(t2 + o2), this._state.setStateAtTime("stopped", t2 + o2, {implicitEnd: true})), this._activeSources.add(r2), this._loop && ai(i2) ? r2.start(t2, n2) : r2.start(t2, n2, o2 - this.toSeconds(this.fadeOut));
          }
          _stop(t2) {
            const e2 = this.toSeconds(t2);
            this._activeSources.forEach((t3) => t3.stop(e2));
          }
          restart(t2, e2, s2) {
            return super.restart(t2, e2, s2), this;
          }
          _restart(t2, e2, s2) {
            this._stop(t2), this._start(t2, e2, s2);
          }
          seek(t2, e2) {
            const s2 = this.toSeconds(e2);
            if (this._state.getValueAtTime(s2) === "started") {
              const e3 = this.toSeconds(t2);
              this._stop(s2), this._start(s2, e3);
            }
            return this;
          }
          setLoopPoints(t2, e2) {
            return this.loopStart = t2, this.loopEnd = e2, this;
          }
          get loopStart() {
            return this._loopStart;
          }
          set loopStart(t2) {
            this._loopStart = t2, this.buffer.loaded && ei(this.toSeconds(t2), 0, this.buffer.duration), this._activeSources.forEach((e2) => {
              e2.loopStart = t2;
            });
          }
          get loopEnd() {
            return this._loopEnd;
          }
          set loopEnd(t2) {
            this._loopEnd = t2, this.buffer.loaded && ei(this.toSeconds(t2), 0, this.buffer.duration), this._activeSources.forEach((e2) => {
              e2.loopEnd = t2;
            });
          }
          get buffer() {
            return this._buffer;
          }
          set buffer(t2) {
            this._buffer.set(t2);
          }
          get loop() {
            return this._loop;
          }
          set loop(t2) {
            if (this._loop !== t2 && (this._loop = t2, this._activeSources.forEach((e2) => {
              e2.loop = t2;
            }), t2)) {
              const t3 = this._state.getNextState("stopped", this.now());
              t3 && this._state.cancel(t3.time);
            }
          }
          get playbackRate() {
            return this._playbackRate;
          }
          set playbackRate(t2) {
            this._playbackRate = t2;
            const e2 = this.now(), s2 = this._state.getNextState("stopped", e2);
            s2 && s2.implicitEnd && (this._state.cancel(s2.time), this._activeSources.forEach((t3) => t3.cancelStop())), this._activeSources.forEach((s3) => {
              s3.playbackRate.setValueAtTime(t2, e2);
            });
          }
          get reverse() {
            return this._buffer.reverse;
          }
          set reverse(t2) {
            this._buffer.reverse = t2;
          }
          get loaded() {
            return this._buffer.loaded;
          }
          dispose() {
            return super.dispose(), this._activeSources.forEach((t2) => t2.dispose()), this._activeSources.clear(), this._buffer.dispose(), this;
          }
        }
        vi([wr(0)], br.prototype, "fadeIn", void 0), vi([wr(0)], br.prototype, "fadeOut", void 0);
        class Tr extends wo {
          constructor() {
            super(Di(Tr.getDefaults(), arguments, ["urls", "onload"], "urls")), this.name = "Players", this.input = void 0, this._players = new Map();
            const t2 = Di(Tr.getDefaults(), arguments, ["urls", "onload"], "urls");
            this._volume = this.output = new Go({context: this.context, volume: t2.volume}), this.volume = this._volume.volume, Ui(this, "volume"), this._buffers = new Vo({urls: t2.urls, onload: t2.onload, baseUrl: t2.baseUrl, onerror: t2.onerror}), this.mute = t2.mute, this._fadeIn = t2.fadeIn, this._fadeOut = t2.fadeOut;
          }
          static getDefaults() {
            return Object.assign(Ho.getDefaults(), {baseUrl: "", fadeIn: 0, fadeOut: 0, mute: false, onload: Zi, onerror: Zi, urls: {}, volume: 0});
          }
          get mute() {
            return this._volume.mute;
          }
          set mute(t2) {
            this._volume.mute = t2;
          }
          get fadeIn() {
            return this._fadeIn;
          }
          set fadeIn(t2) {
            this._fadeIn = t2, this._players.forEach((e2) => {
              e2.fadeIn = t2;
            });
          }
          get fadeOut() {
            return this._fadeOut;
          }
          set fadeOut(t2) {
            this._fadeOut = t2, this._players.forEach((e2) => {
              e2.fadeOut = t2;
            });
          }
          get state() {
            return Array.from(this._players).some(([t2, e2]) => e2.state === "started") ? "started" : "stopped";
          }
          has(t2) {
            return this._buffers.has(t2);
          }
          player(t2) {
            if (ti(this.has(t2), `No Player with the name ${t2} exists on this object`), !this._players.has(t2)) {
              const e2 = new br({context: this.context, fadeIn: this._fadeIn, fadeOut: this._fadeOut, url: this._buffers.get(t2)}).connect(this.output);
              this._players.set(t2, e2);
            }
            return this._players.get(t2);
          }
          get loaded() {
            return this._buffers.loaded;
          }
          add(t2, e2, s2) {
            return ti(!this._buffers.has(t2), "A buffer with that name already exists on this object"), this._buffers.add(t2, e2, s2), this;
          }
          stopAll(t2) {
            return this._players.forEach((e2) => e2.stop(t2)), this;
          }
          dispose() {
            return super.dispose(), this._volume.dispose(), this.volume.dispose(), this._players.forEach((t2) => t2.dispose()), this._buffers.dispose(), this;
          }
        }
        class Sr extends Ho {
          constructor() {
            super(Di(Sr.getDefaults(), arguments, ["url", "onload"])), this.name = "GrainPlayer", this._loopStart = 0, this._loopEnd = 0, this._activeSources = [];
            const t2 = Di(Sr.getDefaults(), arguments, ["url", "onload"]);
            this.buffer = new Xi({onload: t2.onload, onerror: t2.onerror, reverse: t2.reverse, url: t2.url}), this._clock = new qo({context: this.context, callback: this._tick.bind(this), frequency: 1 / t2.grainSize}), this._playbackRate = t2.playbackRate, this._grainSize = t2.grainSize, this._overlap = t2.overlap, this.detune = t2.detune, this.overlap = t2.overlap, this.loop = t2.loop, this.playbackRate = t2.playbackRate, this.grainSize = t2.grainSize, this.loopStart = t2.loopStart, this.loopEnd = t2.loopEnd, this.reverse = t2.reverse, this._clock.on("stop", this._onstop.bind(this));
          }
          static getDefaults() {
            return Object.assign(Ho.getDefaults(), {onload: Zi, onerror: Zi, overlap: 0.1, grainSize: 0.2, playbackRate: 1, detune: 0, loop: false, loopStart: 0, loopEnd: 0, reverse: false});
          }
          _start(t2, e2, s2) {
            e2 = Oi(e2, 0), e2 = this.toSeconds(e2), t2 = this.toSeconds(t2);
            const n2 = 1 / this._clock.frequency.getValueAtTime(t2);
            this._clock.start(t2, e2 / n2), s2 && this.stop(t2 + this.toSeconds(s2));
          }
          restart(t2, e2, s2) {
            return super.restart(t2, e2, s2), this;
          }
          _restart(t2, e2, s2) {
            this._stop(t2), this._start(t2, e2, s2);
          }
          _stop(t2) {
            this._clock.stop(t2);
          }
          _onstop(t2) {
            this._activeSources.forEach((e2) => {
              e2.fadeOut = 0, e2.stop(t2);
            }), this.onstop(this);
          }
          _tick(t2) {
            const e2 = this._clock.getTicksAtTime(t2), s2 = e2 * this._grainSize;
            if (this.log("offset", s2), !this.loop && s2 > this.buffer.duration)
              return void this.stop(t2);
            const n2 = s2 < this._overlap ? 0 : this._overlap, i2 = new $o({context: this.context, url: this.buffer, fadeIn: n2, fadeOut: this._overlap, loop: this.loop, loopStart: this._loopStart, loopEnd: this._loopEnd, playbackRate: no(this.detune / 100)}).connect(this.output);
            i2.start(t2, this._grainSize * e2), i2.stop(t2 + this._grainSize / this.playbackRate), this._activeSources.push(i2), i2.onended = () => {
              const t3 = this._activeSources.indexOf(i2);
              t3 !== -1 && this._activeSources.splice(t3, 1);
            };
          }
          get playbackRate() {
            return this._playbackRate;
          }
          set playbackRate(t2) {
            ei(t2, 1e-3), this._playbackRate = t2, this.grainSize = this._grainSize;
          }
          get loopStart() {
            return this._loopStart;
          }
          set loopStart(t2) {
            this.buffer.loaded && ei(this.toSeconds(t2), 0, this.buffer.duration), this._loopStart = this.toSeconds(t2);
          }
          get loopEnd() {
            return this._loopEnd;
          }
          set loopEnd(t2) {
            this.buffer.loaded && ei(this.toSeconds(t2), 0, this.buffer.duration), this._loopEnd = this.toSeconds(t2);
          }
          get reverse() {
            return this.buffer.reverse;
          }
          set reverse(t2) {
            this.buffer.reverse = t2;
          }
          get grainSize() {
            return this._grainSize;
          }
          set grainSize(t2) {
            this._grainSize = this.toSeconds(t2), this._clock.frequency.setValueAtTime(this._playbackRate / this._grainSize, this.now());
          }
          get overlap() {
            return this._overlap;
          }
          set overlap(t2) {
            const e2 = this.toSeconds(t2);
            ei(e2, 0), this._overlap = e2;
          }
          get loaded() {
            return this.buffer.loaded;
          }
          dispose() {
            return super.dispose(), this.buffer.dispose(), this._clock.dispose(), this._activeSources.forEach((t2) => t2.dispose()), this;
          }
        }
        class kr extends or {
          constructor() {
            super(...arguments), this.name = "Abs", this._abs = new rr({context: this.context, mapping: (t2) => Math.abs(t2) < 1e-3 ? 0 : Math.abs(t2)}), this.input = this._abs, this.output = this._abs;
          }
          dispose() {
            return super.dispose(), this._abs.dispose(), this;
          }
        }
        class Cr extends or {
          constructor() {
            super(...arguments), this.name = "GainToAudio", this._norm = new rr({context: this.context, mapping: (t2) => 2 * Math.abs(t2) - 1}), this.input = this._norm, this.output = this._norm;
          }
          dispose() {
            return super.dispose(), this._norm.dispose(), this;
          }
        }
        class Ar extends or {
          constructor() {
            super(...arguments), this.name = "Negate", this._multiply = new cr({context: this.context, value: -1}), this.input = this._multiply, this.output = this._multiply;
          }
          dispose() {
            return super.dispose(), this._multiply.dispose(), this;
          }
        }
        class Dr extends Do {
          constructor() {
            super(Object.assign(Di(Dr.getDefaults(), arguments, ["value"]))), this.override = false, this.name = "Subtract", this._sum = new ko({context: this.context}), this.input = this._sum, this.output = this._sum, this._neg = new Ar({context: this.context}), this.subtrahend = this._param, bo(this._constantSource, this._neg, this._sum);
          }
          static getDefaults() {
            return Object.assign(Do.getDefaults(), {value: 0});
          }
          dispose() {
            return super.dispose(), this._neg.dispose(), this._sum.dispose(), this;
          }
        }
        class Or extends or {
          constructor() {
            super(Object.assign(Di(Or.getDefaults(), arguments))), this.name = "GreaterThanZero", this._thresh = this.output = new rr({context: this.context, length: 127, mapping: (t2) => t2 <= 0 ? 0 : 1}), this._scale = this.input = new cr({context: this.context, value: 1e4}), this._scale.connect(this._thresh);
          }
          dispose() {
            return super.dispose(), this._scale.dispose(), this._thresh.dispose(), this;
          }
        }
        class Mr extends Do {
          constructor() {
            super(Object.assign(Di(Mr.getDefaults(), arguments, ["value"]))), this.name = "GreaterThan", this.override = false;
            const t2 = Di(Mr.getDefaults(), arguments, ["value"]);
            this._subtract = this.input = new Dr({context: this.context, value: t2.value}), this._gtz = this.output = new Or({context: this.context}), this.comparator = this._param = this._subtract.subtrahend, Ui(this, "comparator"), this._subtract.connect(this._gtz);
          }
          static getDefaults() {
            return Object.assign(Do.getDefaults(), {value: 0});
          }
          dispose() {
            return super.dispose(), this._gtz.dispose(), this._subtract.dispose(), this.comparator.dispose(), this;
          }
        }
        class Er extends or {
          constructor() {
            super(Object.assign(Di(Er.getDefaults(), arguments, ["value"]))), this.name = "Pow";
            const t2 = Di(Er.getDefaults(), arguments, ["value"]);
            this._exponentScaler = this.input = this.output = new rr({context: this.context, mapping: this._expFunc(t2.value), length: 8192}), this._exponent = t2.value;
          }
          static getDefaults() {
            return Object.assign(or.getDefaults(), {value: 1});
          }
          _expFunc(t2) {
            return (e2) => Math.pow(Math.abs(e2), t2);
          }
          get value() {
            return this._exponent;
          }
          set value(t2) {
            this._exponent = t2, this._exponentScaler.setMap(this._expFunc(this._exponent));
          }
          dispose() {
            return super.dispose(), this._exponentScaler.dispose(), this;
          }
        }
        class Rr extends gr {
          constructor() {
            super(Object.assign(Di(Rr.getDefaults(), arguments, ["min", "max", "exponent"]))), this.name = "ScaleExp";
            const t2 = Di(Rr.getDefaults(), arguments, ["min", "max", "exponent"]);
            this.input = this._exp = new Er({context: this.context, value: t2.exponent}), this._exp.connect(this._mult);
          }
          static getDefaults() {
            return Object.assign(gr.getDefaults(), {exponent: 1});
          }
          get exponent() {
            return this._exp.value;
          }
          set exponent(t2) {
            this._exp.value = t2;
          }
          dispose() {
            return super.dispose(), this._exp.dispose(), this;
          }
        }
        class qr extends Do {
          constructor() {
            super(Di(Do.getDefaults(), arguments, ["value", "units"])), this.name = "SyncedSignal", this.override = false;
            const t2 = Di(Do.getDefaults(), arguments, ["value", "units"]);
            this._lastVal = t2.value, this._synced = this.context.transport.scheduleRepeat(this._onTick.bind(this), "1i"), this._syncedCallback = this._anchorValue.bind(this), this.context.transport.on("start", this._syncedCallback), this.context.transport.on("pause", this._syncedCallback), this.context.transport.on("stop", this._syncedCallback), this._constantSource.disconnect(), this._constantSource.stop(0), this._constantSource = this.output = new Ao({context: this.context, offset: t2.value, units: t2.units}).start(0), this.setValueAtTime(t2.value, 0);
          }
          _onTick(t2) {
            const e2 = super.getValueAtTime(this.context.transport.seconds);
            this._lastVal !== e2 && (this._lastVal = e2, this._constantSource.offset.setValueAtTime(e2, t2));
          }
          _anchorValue(t2) {
            const e2 = super.getValueAtTime(this.context.transport.seconds);
            this._lastVal = e2, this._constantSource.offset.cancelAndHoldAtTime(t2), this._constantSource.offset.setValueAtTime(e2, t2);
          }
          getValueAtTime(t2) {
            const e2 = new mo(this.context, t2).toSeconds();
            return super.getValueAtTime(e2);
          }
          setValueAtTime(t2, e2) {
            const s2 = new mo(this.context, e2).toSeconds();
            return super.setValueAtTime(t2, s2), this;
          }
          linearRampToValueAtTime(t2, e2) {
            const s2 = new mo(this.context, e2).toSeconds();
            return super.linearRampToValueAtTime(t2, s2), this;
          }
          exponentialRampToValueAtTime(t2, e2) {
            const s2 = new mo(this.context, e2).toSeconds();
            return super.exponentialRampToValueAtTime(t2, s2), this;
          }
          setTargetAtTime(t2, e2, s2) {
            const n2 = new mo(this.context, e2).toSeconds();
            return super.setTargetAtTime(t2, n2, s2), this;
          }
          cancelScheduledValues(t2) {
            const e2 = new mo(this.context, t2).toSeconds();
            return super.cancelScheduledValues(e2), this;
          }
          setValueCurveAtTime(t2, e2, s2, n2) {
            const i2 = new mo(this.context, e2).toSeconds();
            return s2 = this.toSeconds(s2), super.setValueCurveAtTime(t2, i2, s2, n2), this;
          }
          cancelAndHoldAtTime(t2) {
            const e2 = new mo(this.context, t2).toSeconds();
            return super.cancelAndHoldAtTime(e2), this;
          }
          setRampPoint(t2) {
            const e2 = new mo(this.context, t2).toSeconds();
            return super.setRampPoint(e2), this;
          }
          exponentialRampTo(t2, e2, s2) {
            const n2 = new mo(this.context, s2).toSeconds();
            return super.exponentialRampTo(t2, e2, n2), this;
          }
          linearRampTo(t2, e2, s2) {
            const n2 = new mo(this.context, s2).toSeconds();
            return super.linearRampTo(t2, e2, n2), this;
          }
          targetRampTo(t2, e2, s2) {
            const n2 = new mo(this.context, s2).toSeconds();
            return super.targetRampTo(t2, e2, n2), this;
          }
          dispose() {
            return super.dispose(), this.context.transport.clear(this._synced), this.context.transport.off("start", this._syncedCallback), this.context.transport.off("pause", this._syncedCallback), this.context.transport.off("stop", this._syncedCallback), this._constantSource.dispose(), this;
          }
        }
        class Fr extends wo {
          constructor() {
            super(Di(Fr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), this.name = "Envelope", this._sig = new Do({context: this.context, value: 0}), this.output = this._sig, this.input = void 0;
            const t2 = Di(Fr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]);
            this.attack = t2.attack, this.decay = t2.decay, this.sustain = t2.sustain, this.release = t2.release, this.attackCurve = t2.attackCurve, this.releaseCurve = t2.releaseCurve, this.decayCurve = t2.decayCurve;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {attack: 0.01, attackCurve: "linear", decay: 0.1, decayCurve: "exponential", release: 1, releaseCurve: "exponential", sustain: 0.5});
          }
          get value() {
            return this.getValueAtTime(this.now());
          }
          _getCurve(t2, e2) {
            if (fi(t2))
              return t2;
            {
              let s2;
              for (s2 in Ir)
                if (Ir[s2][e2] === t2)
                  return s2;
              return t2;
            }
          }
          _setCurve(t2, e2, s2) {
            if (fi(s2) && Reflect.has(Ir, s2)) {
              const n2 = Ir[s2];
              li(n2) ? t2 !== "_decayCurve" && (this[t2] = n2[e2]) : this[t2] = n2;
            } else {
              if (!di(s2) || t2 === "_decayCurve")
                throw new Error("Envelope: invalid curve: " + s2);
              this[t2] = s2;
            }
          }
          get attackCurve() {
            return this._getCurve(this._attackCurve, "In");
          }
          set attackCurve(t2) {
            this._setCurve("_attackCurve", "In", t2);
          }
          get releaseCurve() {
            return this._getCurve(this._releaseCurve, "Out");
          }
          set releaseCurve(t2) {
            this._setCurve("_releaseCurve", "Out", t2);
          }
          get decayCurve() {
            return this._decayCurve;
          }
          set decayCurve(t2) {
            ti(["linear", "exponential"].some((e2) => e2 === t2), "Invalid envelope curve: " + t2), this._decayCurve = t2;
          }
          triggerAttack(t2, e2 = 1) {
            this.log("triggerAttack", t2, e2), t2 = this.toSeconds(t2);
            let s2 = this.toSeconds(this.attack);
            const n2 = this.toSeconds(this.decay), i2 = this.getValueAtTime(t2);
            if (i2 > 0) {
              s2 = (1 - i2) / (1 / s2);
            }
            if (s2 < this.sampleTime)
              this._sig.cancelScheduledValues(t2), this._sig.setValueAtTime(e2, t2);
            else if (this._attackCurve === "linear")
              this._sig.linearRampTo(e2, s2, t2);
            else if (this._attackCurve === "exponential")
              this._sig.targetRampTo(e2, s2, t2);
            else {
              this._sig.cancelAndHoldAtTime(t2);
              let n3 = this._attackCurve;
              for (let t3 = 1; t3 < n3.length; t3++)
                if (n3[t3 - 1] <= i2 && i2 <= n3[t3]) {
                  n3 = this._attackCurve.slice(t3), n3[0] = i2;
                  break;
                }
              this._sig.setValueCurveAtTime(n3, t2, s2, e2);
            }
            if (n2 && this.sustain < 1) {
              const i3 = e2 * this.sustain, o2 = t2 + s2;
              this.log("decay", o2), this._decayCurve === "linear" ? this._sig.linearRampToValueAtTime(i3, n2 + o2) : this._sig.exponentialApproachValueAtTime(i3, o2, n2);
            }
            return this;
          }
          triggerRelease(t2) {
            this.log("triggerRelease", t2), t2 = this.toSeconds(t2);
            const e2 = this.getValueAtTime(t2);
            if (e2 > 0) {
              const s2 = this.toSeconds(this.release);
              s2 < this.sampleTime ? this._sig.setValueAtTime(0, t2) : this._releaseCurve === "linear" ? this._sig.linearRampTo(0, s2, t2) : this._releaseCurve === "exponential" ? this._sig.targetRampTo(0, s2, t2) : (ti(di(this._releaseCurve), "releaseCurve must be either 'linear', 'exponential' or an array"), this._sig.cancelAndHoldAtTime(t2), this._sig.setValueCurveAtTime(this._releaseCurve, t2, s2, e2));
            }
            return this;
          }
          getValueAtTime(t2) {
            return this._sig.getValueAtTime(t2);
          }
          triggerAttackRelease(t2, e2, s2 = 1) {
            return e2 = this.toSeconds(e2), this.triggerAttack(e2, s2), this.triggerRelease(e2 + this.toSeconds(t2)), this;
          }
          cancel(t2) {
            return this._sig.cancelScheduledValues(this.toSeconds(t2)), this;
          }
          connect(t2, e2 = 0, s2 = 0) {
            return Oo(this, t2, e2, s2), this;
          }
          asArray(t2 = 1024) {
            return yi(this, void 0, void 0, function* () {
              const e2 = t2 / this.context.sampleRate, s2 = new Yi(1, e2, this.context.sampleRate), n2 = this.toSeconds(this.attack) + this.toSeconds(this.decay), i2 = n2 + this.toSeconds(this.release), o2 = 0.1 * i2, r2 = i2 + o2, a2 = new this.constructor(Object.assign(this.get(), {attack: e2 * this.toSeconds(this.attack) / r2, decay: e2 * this.toSeconds(this.decay) / r2, release: e2 * this.toSeconds(this.release) / r2, context: s2}));
              a2._sig.toDestination(), a2.triggerAttackRelease(e2 * (n2 + o2) / r2, 0);
              return (yield s2.render()).getChannelData(0);
            });
          }
          dispose() {
            return super.dispose(), this._sig.dispose(), this;
          }
        }
        vi([wr(0)], Fr.prototype, "attack", void 0), vi([wr(0)], Fr.prototype, "decay", void 0), vi([xr(0, 1)], Fr.prototype, "sustain", void 0), vi([wr(0)], Fr.prototype, "release", void 0);
        const Ir = (() => {
          let t2, e2;
          const s2 = [];
          for (t2 = 0; t2 < 128; t2++)
            s2[t2] = Math.sin(t2 / 127 * (Math.PI / 2));
          const n2 = [];
          for (t2 = 0; t2 < 127; t2++) {
            e2 = t2 / 127;
            const s3 = Math.sin(e2 * (2 * Math.PI) * 6.4 - Math.PI / 2) + 1;
            n2[t2] = s3 / 10 + 0.83 * e2;
          }
          n2[127] = 1;
          const i2 = [];
          for (t2 = 0; t2 < 128; t2++)
            i2[t2] = Math.ceil(t2 / 127 * 5) / 5;
          const o2 = [];
          for (t2 = 0; t2 < 128; t2++)
            e2 = t2 / 127, o2[t2] = 0.5 * (1 - Math.cos(Math.PI * e2));
          const r2 = [];
          for (t2 = 0; t2 < 128; t2++) {
            e2 = t2 / 127;
            const s3 = 4 * Math.pow(e2, 3) + 0.2, n3 = Math.cos(s3 * Math.PI * 2 * e2);
            r2[t2] = Math.abs(n3 * (1 - e2));
          }
          function a2(t3) {
            const e3 = new Array(t3.length);
            for (let s3 = 0; s3 < t3.length; s3++)
              e3[s3] = 1 - t3[s3];
            return e3;
          }
          return {bounce: {In: a2(r2), Out: r2}, cosine: {In: s2, Out: (c2 = s2, c2.slice(0).reverse())}, exponential: "exponential", linear: "linear", ripple: {In: n2, Out: a2(n2)}, sine: {In: o2, Out: a2(o2)}, step: {In: i2, Out: a2(i2)}};
          var c2;
        })();
        class Vr extends wo {
          constructor() {
            super(Di(Vr.getDefaults(), arguments)), this._scheduledEvents = [], this._synced = false, this._original_triggerAttack = this.triggerAttack, this._original_triggerRelease = this.triggerRelease;
            const t2 = Di(Vr.getDefaults(), arguments);
            this._volume = this.output = new Go({context: this.context, volume: t2.volume}), this.volume = this._volume.volume, Ui(this, "volume");
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {volume: 0});
          }
          sync() {
            return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 0)), this;
          }
          _syncState() {
            let t2 = false;
            return this._synced || (this._synced = true, t2 = true), t2;
          }
          _syncMethod(t2, e2) {
            const s2 = this["_original_" + t2] = this[t2];
            this[t2] = (...t3) => {
              const n2 = t3[e2], i2 = this.context.transport.schedule((n3) => {
                t3[e2] = n3, s2.apply(this, t3);
              }, n2);
              this._scheduledEvents.push(i2);
            };
          }
          unsync() {
            return this._scheduledEvents.forEach((t2) => this.context.transport.clear(t2)), this._scheduledEvents = [], this._synced && (this._synced = false, this.triggerAttack = this._original_triggerAttack, this.triggerRelease = this._original_triggerRelease), this;
          }
          triggerAttackRelease(t2, e2, s2, n2) {
            const i2 = this.toSeconds(s2), o2 = this.toSeconds(e2);
            return this.triggerAttack(t2, i2, n2), this.triggerRelease(i2 + o2), this;
          }
          dispose() {
            return super.dispose(), this._volume.dispose(), this.unsync(), this._scheduledEvents = [], this;
          }
        }
        class Nr extends Vr {
          constructor() {
            super(Di(Nr.getDefaults(), arguments));
            const t2 = Di(Nr.getDefaults(), arguments);
            this.portamento = t2.portamento, this.onsilence = t2.onsilence;
          }
          static getDefaults() {
            return Object.assign(Vr.getDefaults(), {detune: 0, onsilence: Zi, portamento: 0});
          }
          triggerAttack(t2, e2, s2 = 1) {
            this.log("triggerAttack", t2, e2, s2);
            const n2 = this.toSeconds(e2);
            return this._triggerEnvelopeAttack(n2, s2), this.setNote(t2, n2), this;
          }
          triggerRelease(t2) {
            this.log("triggerRelease", t2);
            const e2 = this.toSeconds(t2);
            return this._triggerEnvelopeRelease(e2), this;
          }
          setNote(t2, e2) {
            const s2 = this.toSeconds(e2), n2 = t2 instanceof lo ? t2.toFrequency() : t2;
            if (this.portamento > 0 && this.getLevelAtTime(s2) > 0.05) {
              const t3 = this.toSeconds(this.portamento);
              this.frequency.exponentialRampTo(n2, t3, s2);
            } else
              this.frequency.setValueAtTime(n2, s2);
            return this;
          }
        }
        vi([wr(0)], Nr.prototype, "portamento", void 0);
        class Pr extends Fr {
          constructor() {
            super(Di(Pr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), this.name = "AmplitudeEnvelope", this._gainNode = new ko({context: this.context, gain: 0}), this.output = this._gainNode, this.input = this._gainNode, this._sig.connect(this._gainNode.gain), this.output = this._gainNode, this.input = this._gainNode;
          }
          dispose() {
            return super.dispose(), this._gainNode.dispose(), this;
          }
        }
        class jr extends Nr {
          constructor() {
            super(Di(jr.getDefaults(), arguments)), this.name = "Synth";
            const t2 = Di(jr.getDefaults(), arguments);
            this.oscillator = new _r(Object.assign({context: this.context, detune: t2.detune, onstop: () => this.onsilence(this)}, t2.oscillator)), this.frequency = this.oscillator.frequency, this.detune = this.oscillator.detune, this.envelope = new Pr(Object.assign({context: this.context}, t2.envelope)), this.oscillator.chain(this.envelope, this.output), Ui(this, ["oscillator", "frequency", "detune", "envelope"]);
          }
          static getDefaults() {
            return Object.assign(Nr.getDefaults(), {envelope: Object.assign(Mi(Fr.getDefaults(), Object.keys(wo.getDefaults())), {attack: 5e-3, decay: 0.1, release: 1, sustain: 0.3}), oscillator: Object.assign(Mi(_r.getDefaults(), [...Object.keys(Ho.getDefaults()), "frequency", "detune"]), {type: "triangle"})});
          }
          _triggerEnvelopeAttack(t2, e2) {
            if (this.envelope.triggerAttack(t2, e2), this.oscillator.start(t2), this.envelope.sustain === 0) {
              const e3 = this.toSeconds(this.envelope.attack), s2 = this.toSeconds(this.envelope.decay);
              this.oscillator.stop(t2 + e3 + s2);
            }
          }
          _triggerEnvelopeRelease(t2) {
            this.envelope.triggerRelease(t2), this.oscillator.stop(t2 + this.toSeconds(this.envelope.release));
          }
          getLevelAtTime(t2) {
            return t2 = this.toSeconds(t2), this.envelope.getValueAtTime(t2);
          }
          dispose() {
            return super.dispose(), this.oscillator.dispose(), this.envelope.dispose(), this;
          }
        }
        class Lr extends Nr {
          constructor() {
            super(Di(Lr.getDefaults(), arguments)), this.name = "ModulationSynth";
            const t2 = Di(Lr.getDefaults(), arguments);
            this._carrier = new jr({context: this.context, oscillator: t2.oscillator, envelope: t2.envelope, onsilence: () => this.onsilence(this), volume: -10}), this._modulator = new jr({context: this.context, oscillator: t2.modulation, envelope: t2.modulationEnvelope, volume: -10}), this.oscillator = this._carrier.oscillator, this.envelope = this._carrier.envelope, this.modulation = this._modulator.oscillator, this.modulationEnvelope = this._modulator.envelope, this.frequency = new Do({context: this.context, units: "frequency"}), this.detune = new Do({context: this.context, value: t2.detune, units: "cents"}), this.harmonicity = new cr({context: this.context, value: t2.harmonicity, minValue: 0}), this._modulationNode = new ko({context: this.context, gain: 0}), Ui(this, ["frequency", "harmonicity", "oscillator", "envelope", "modulation", "modulationEnvelope", "detune"]);
          }
          static getDefaults() {
            return Object.assign(Nr.getDefaults(), {harmonicity: 3, oscillator: Object.assign(Mi(_r.getDefaults(), [...Object.keys(Ho.getDefaults()), "frequency", "detune"]), {type: "sine"}), envelope: Object.assign(Mi(Fr.getDefaults(), Object.keys(wo.getDefaults())), {attack: 0.01, decay: 0.01, sustain: 1, release: 0.5}), modulation: Object.assign(Mi(_r.getDefaults(), [...Object.keys(Ho.getDefaults()), "frequency", "detune"]), {type: "square"}), modulationEnvelope: Object.assign(Mi(Fr.getDefaults(), Object.keys(wo.getDefaults())), {attack: 0.5, decay: 0, sustain: 1, release: 0.5})});
          }
          _triggerEnvelopeAttack(t2, e2) {
            this._carrier._triggerEnvelopeAttack(t2, e2), this._modulator._triggerEnvelopeAttack(t2, e2);
          }
          _triggerEnvelopeRelease(t2) {
            return this._carrier._triggerEnvelopeRelease(t2), this._modulator._triggerEnvelopeRelease(t2), this;
          }
          getLevelAtTime(t2) {
            return t2 = this.toSeconds(t2), this.envelope.getValueAtTime(t2);
          }
          dispose() {
            return super.dispose(), this._carrier.dispose(), this._modulator.dispose(), this.frequency.dispose(), this.detune.dispose(), this.harmonicity.dispose(), this._modulationNode.dispose(), this;
          }
        }
        class zr extends Lr {
          constructor() {
            super(Di(zr.getDefaults(), arguments)), this.name = "AMSynth", this._modulationScale = new ar({context: this.context}), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.detune.fan(this._carrier.detune, this._modulator.detune), this._modulator.chain(this._modulationScale, this._modulationNode.gain), this._carrier.chain(this._modulationNode, this.output);
          }
          dispose() {
            return super.dispose(), this._modulationScale.dispose(), this;
          }
        }
        class Br extends wo {
          constructor() {
            super(Di(Br.getDefaults(), arguments, ["frequency", "type"])), this.name = "BiquadFilter";
            const t2 = Di(Br.getDefaults(), arguments, ["frequency", "type"]);
            this._filter = this.context.createBiquadFilter(), this.input = this.output = this._filter, this.Q = new xo({context: this.context, units: "number", value: t2.Q, param: this._filter.Q}), this.frequency = new xo({context: this.context, units: "frequency", value: t2.frequency, param: this._filter.frequency}), this.detune = new xo({context: this.context, units: "cents", value: t2.detune, param: this._filter.detune}), this.gain = new xo({context: this.context, units: "decibels", convert: false, value: t2.gain, param: this._filter.gain}), this.type = t2.type;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {Q: 1, type: "lowpass", frequency: 350, detune: 0, gain: 0});
          }
          get type() {
            return this._filter.type;
          }
          set type(t2) {
            ti(["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"].indexOf(t2) !== -1, "Invalid filter type: " + t2), this._filter.type = t2;
          }
          getFrequencyResponse(t2 = 128) {
            const e2 = new Float32Array(t2);
            for (let s3 = 0; s3 < t2; s3++) {
              const n3 = 19980 * Math.pow(s3 / t2, 2) + 20;
              e2[s3] = n3;
            }
            const s2 = new Float32Array(t2), n2 = new Float32Array(t2), i2 = this.context.createBiquadFilter();
            return i2.type = this.type, i2.Q.value = this.Q.value, i2.frequency.value = this.frequency.value, i2.gain.value = this.gain.value, i2.getFrequencyResponse(e2, s2, n2), s2;
          }
          dispose() {
            return super.dispose(), this._filter.disconnect(), this.Q.dispose(), this.frequency.dispose(), this.gain.dispose(), this.detune.dispose(), this;
          }
        }
        class Wr extends wo {
          constructor() {
            super(Di(Wr.getDefaults(), arguments, ["frequency", "type", "rolloff"])), this.name = "Filter", this.input = new ko({context: this.context}), this.output = new ko({context: this.context}), this._filters = [];
            const t2 = Di(Wr.getDefaults(), arguments, ["frequency", "type", "rolloff"]);
            this._filters = [], this.Q = new Do({context: this.context, units: "positive", value: t2.Q}), this.frequency = new Do({context: this.context, units: "frequency", value: t2.frequency}), this.detune = new Do({context: this.context, units: "cents", value: t2.detune}), this.gain = new Do({context: this.context, units: "decibels", convert: false, value: t2.gain}), this._type = t2.type, this.rolloff = t2.rolloff, Ui(this, ["detune", "frequency", "gain", "Q"]);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {Q: 1, detune: 0, frequency: 350, gain: 0, rolloff: -12, type: "lowpass"});
          }
          get type() {
            return this._type;
          }
          set type(t2) {
            ti(["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"].indexOf(t2) !== -1, "Invalid filter type: " + t2), this._type = t2, this._filters.forEach((e2) => e2.type = t2);
          }
          get rolloff() {
            return this._rolloff;
          }
          set rolloff(t2) {
            const e2 = ui(t2) ? t2 : parseInt(t2, 10), s2 = [-12, -24, -48, -96];
            let n2 = s2.indexOf(e2);
            ti(n2 !== -1, "rolloff can only be " + s2.join(", ")), n2 += 1, this._rolloff = e2, this.input.disconnect(), this._filters.forEach((t3) => t3.disconnect()), this._filters = new Array(n2);
            for (let t3 = 0; t3 < n2; t3++) {
              const e3 = new Br({context: this.context});
              e3.type = this._type, this.frequency.connect(e3.frequency), this.detune.connect(e3.detune), this.Q.connect(e3.Q), this.gain.connect(e3.gain), this._filters[t3] = e3;
            }
            this._internalChannels = this._filters, bo(this.input, ...this._internalChannels, this.output);
          }
          getFrequencyResponse(t2 = 128) {
            const e2 = new Br({frequency: this.frequency.value, gain: this.gain.value, Q: this.Q.value, type: this._type, detune: this.detune.value}), s2 = new Float32Array(t2).map(() => 1);
            return this._filters.forEach(() => {
              e2.getFrequencyResponse(t2).forEach((t3, e3) => s2[e3] *= t3);
            }), e2.dispose(), s2;
          }
          dispose() {
            return super.dispose(), this._filters.forEach((t2) => {
              t2.dispose();
            }), Qi(this, ["detune", "frequency", "gain", "Q"]), this.frequency.dispose(), this.Q.dispose(), this.detune.dispose(), this.gain.dispose(), this;
          }
        }
        class Gr extends Fr {
          constructor() {
            super(Di(Gr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), this.name = "FrequencyEnvelope";
            const t2 = Di(Gr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]);
            this._octaves = t2.octaves, this._baseFrequency = this.toFrequency(t2.baseFrequency), this._exponent = this.input = new Er({context: this.context, value: t2.exponent}), this._scale = this.output = new gr({context: this.context, min: this._baseFrequency, max: this._baseFrequency * Math.pow(2, this._octaves)}), this._sig.chain(this._exponent, this._scale);
          }
          static getDefaults() {
            return Object.assign(Fr.getDefaults(), {baseFrequency: 200, exponent: 1, octaves: 4});
          }
          get baseFrequency() {
            return this._baseFrequency;
          }
          set baseFrequency(t2) {
            const e2 = this.toFrequency(t2);
            ei(e2, 0), this._baseFrequency = e2, this._scale.min = this._baseFrequency, this.octaves = this._octaves;
          }
          get octaves() {
            return this._octaves;
          }
          set octaves(t2) {
            this._octaves = t2, this._scale.max = this._baseFrequency * Math.pow(2, t2);
          }
          get exponent() {
            return this._exponent.value;
          }
          set exponent(t2) {
            this._exponent.value = t2;
          }
          dispose() {
            return super.dispose(), this._exponent.dispose(), this._scale.dispose(), this;
          }
        }
        class Ur extends Nr {
          constructor() {
            super(Di(Ur.getDefaults(), arguments)), this.name = "MonoSynth";
            const t2 = Di(Ur.getDefaults(), arguments);
            this.oscillator = new _r(Object.assign(t2.oscillator, {context: this.context, detune: t2.detune, onstop: () => this.onsilence(this)})), this.frequency = this.oscillator.frequency, this.detune = this.oscillator.detune, this.filter = new Wr(Object.assign(t2.filter, {context: this.context})), this.filterEnvelope = new Gr(Object.assign(t2.filterEnvelope, {context: this.context})), this.envelope = new Pr(Object.assign(t2.envelope, {context: this.context})), this.oscillator.chain(this.filter, this.envelope, this.output), this.filterEnvelope.connect(this.filter.frequency), Ui(this, ["oscillator", "frequency", "detune", "filter", "filterEnvelope", "envelope"]);
          }
          static getDefaults() {
            return Object.assign(Nr.getDefaults(), {envelope: Object.assign(Mi(Fr.getDefaults(), Object.keys(wo.getDefaults())), {attack: 5e-3, decay: 0.1, release: 1, sustain: 0.9}), filter: Object.assign(Mi(Wr.getDefaults(), Object.keys(wo.getDefaults())), {Q: 1, rolloff: -12, type: "lowpass"}), filterEnvelope: Object.assign(Mi(Gr.getDefaults(), Object.keys(wo.getDefaults())), {attack: 0.6, baseFrequency: 200, decay: 0.2, exponent: 2, octaves: 3, release: 2, sustain: 0.5}), oscillator: Object.assign(Mi(_r.getDefaults(), Object.keys(Ho.getDefaults())), {type: "sawtooth"})});
          }
          _triggerEnvelopeAttack(t2, e2 = 1) {
            if (this.envelope.triggerAttack(t2, e2), this.filterEnvelope.triggerAttack(t2), this.oscillator.start(t2), this.envelope.sustain === 0) {
              const e3 = this.toSeconds(this.envelope.attack), s2 = this.toSeconds(this.envelope.decay);
              this.oscillator.stop(t2 + e3 + s2);
            }
          }
          _triggerEnvelopeRelease(t2) {
            this.envelope.triggerRelease(t2), this.filterEnvelope.triggerRelease(t2), this.oscillator.stop(t2 + this.toSeconds(this.envelope.release));
          }
          getLevelAtTime(t2) {
            return t2 = this.toSeconds(t2), this.envelope.getValueAtTime(t2);
          }
          dispose() {
            return super.dispose(), this.oscillator.dispose(), this.envelope.dispose(), this.filterEnvelope.dispose(), this.filter.dispose(), this;
          }
        }
        class Qr extends Nr {
          constructor() {
            super(Di(Qr.getDefaults(), arguments)), this.name = "DuoSynth";
            const t2 = Di(Qr.getDefaults(), arguments);
            this.voice0 = new Ur(Object.assign(t2.voice0, {context: this.context, onsilence: () => this.onsilence(this)})), this.voice1 = new Ur(Object.assign(t2.voice1, {context: this.context})), this.harmonicity = new cr({context: this.context, units: "positive", value: t2.harmonicity}), this._vibrato = new yr({frequency: t2.vibratoRate, context: this.context, min: -50, max: 50}), this._vibrato.start(), this.vibratoRate = this._vibrato.frequency, this._vibratoGain = new ko({context: this.context, units: "normalRange", gain: t2.vibratoAmount}), this.vibratoAmount = this._vibratoGain.gain, this.frequency = new Do({context: this.context, units: "frequency", value: 440}), this.detune = new Do({context: this.context, units: "cents", value: t2.detune}), this.frequency.connect(this.voice0.frequency), this.frequency.chain(this.harmonicity, this.voice1.frequency), this._vibrato.connect(this._vibratoGain), this._vibratoGain.fan(this.voice0.detune, this.voice1.detune), this.detune.fan(this.voice0.detune, this.voice1.detune), this.voice0.connect(this.output), this.voice1.connect(this.output), Ui(this, ["voice0", "voice1", "frequency", "vibratoAmount", "vibratoRate"]);
          }
          getLevelAtTime(t2) {
            return t2 = this.toSeconds(t2), this.voice0.envelope.getValueAtTime(t2) + this.voice1.envelope.getValueAtTime(t2);
          }
          static getDefaults() {
            return Ai(Nr.getDefaults(), {vibratoAmount: 0.5, vibratoRate: 5, harmonicity: 1.5, voice0: Ai(Mi(Ur.getDefaults(), Object.keys(Nr.getDefaults())), {filterEnvelope: {attack: 0.01, decay: 0, sustain: 1, release: 0.5}, envelope: {attack: 0.01, decay: 0, sustain: 1, release: 0.5}}), voice1: Ai(Mi(Ur.getDefaults(), Object.keys(Nr.getDefaults())), {filterEnvelope: {attack: 0.01, decay: 0, sustain: 1, release: 0.5}, envelope: {attack: 0.01, decay: 0, sustain: 1, release: 0.5}})});
          }
          _triggerEnvelopeAttack(t2, e2) {
            this.voice0._triggerEnvelopeAttack(t2, e2), this.voice1._triggerEnvelopeAttack(t2, e2);
          }
          _triggerEnvelopeRelease(t2) {
            return this.voice0._triggerEnvelopeRelease(t2), this.voice1._triggerEnvelopeRelease(t2), this;
          }
          dispose() {
            return super.dispose(), this.voice0.dispose(), this.voice1.dispose(), this.frequency.dispose(), this.detune.dispose(), this._vibrato.dispose(), this.vibratoRate.dispose(), this._vibratoGain.dispose(), this.harmonicity.dispose(), this;
          }
        }
        class Zr extends Lr {
          constructor() {
            super(Di(Zr.getDefaults(), arguments)), this.name = "FMSynth";
            const t2 = Di(Zr.getDefaults(), arguments);
            this.modulationIndex = new cr({context: this.context, value: t2.modulationIndex}), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.frequency.chain(this.modulationIndex, this._modulationNode), this.detune.fan(this._carrier.detune, this._modulator.detune), this._modulator.connect(this._modulationNode.gain), this._modulationNode.connect(this._carrier.frequency), this._carrier.connect(this.output);
          }
          static getDefaults() {
            return Object.assign(Lr.getDefaults(), {modulationIndex: 10});
          }
          dispose() {
            return super.dispose(), this.modulationIndex.dispose(), this;
          }
        }
        const Xr = [1, 1.483, 1.932, 2.546, 2.63, 3.897];
        class Yr extends Nr {
          constructor() {
            super(Di(Yr.getDefaults(), arguments)), this.name = "MetalSynth", this._oscillators = [], this._freqMultipliers = [];
            const t2 = Di(Yr.getDefaults(), arguments);
            this.detune = new Do({context: this.context, units: "cents", value: t2.detune}), this.frequency = new Do({context: this.context, units: "frequency"}), this._amplitude = new ko({context: this.context, gain: 0}).connect(this.output), this._highpass = new Wr({Q: 0, context: this.context, type: "highpass"}).connect(this._amplitude);
            for (let e2 = 0; e2 < Xr.length; e2++) {
              const s2 = new ur({context: this.context, harmonicity: t2.harmonicity, modulationIndex: t2.modulationIndex, modulationType: "square", onstop: e2 === 0 ? () => this.onsilence(this) : Zi, type: "square"});
              s2.connect(this._highpass), this._oscillators[e2] = s2;
              const n2 = new cr({context: this.context, value: Xr[e2]});
              this._freqMultipliers[e2] = n2, this.frequency.chain(n2, s2.frequency), this.detune.connect(s2.detune);
            }
            this._filterFreqScaler = new gr({context: this.context, max: 7e3, min: this.toFrequency(t2.resonance)}), this.envelope = new Fr({attack: t2.envelope.attack, attackCurve: "linear", context: this.context, decay: t2.envelope.decay, release: t2.envelope.release, sustain: 0}), this.envelope.chain(this._filterFreqScaler, this._highpass.frequency), this.envelope.connect(this._amplitude.gain), this._octaves = t2.octaves, this.octaves = t2.octaves;
          }
          static getDefaults() {
            return Ai(Nr.getDefaults(), {envelope: Object.assign(Mi(Fr.getDefaults(), Object.keys(wo.getDefaults())), {attack: 1e-3, decay: 1.4, release: 0.2}), harmonicity: 5.1, modulationIndex: 32, octaves: 1.5, resonance: 4e3});
          }
          _triggerEnvelopeAttack(t2, e2 = 1) {
            return this.envelope.triggerAttack(t2, e2), this._oscillators.forEach((e3) => e3.start(t2)), this.envelope.sustain === 0 && this._oscillators.forEach((e3) => {
              e3.stop(t2 + this.toSeconds(this.envelope.attack) + this.toSeconds(this.envelope.decay));
            }), this;
          }
          _triggerEnvelopeRelease(t2) {
            return this.envelope.triggerRelease(t2), this._oscillators.forEach((e2) => e2.stop(t2 + this.toSeconds(this.envelope.release))), this;
          }
          getLevelAtTime(t2) {
            return t2 = this.toSeconds(t2), this.envelope.getValueAtTime(t2);
          }
          get modulationIndex() {
            return this._oscillators[0].modulationIndex.value;
          }
          set modulationIndex(t2) {
            this._oscillators.forEach((e2) => e2.modulationIndex.value = t2);
          }
          get harmonicity() {
            return this._oscillators[0].harmonicity.value;
          }
          set harmonicity(t2) {
            this._oscillators.forEach((e2) => e2.harmonicity.value = t2);
          }
          get resonance() {
            return this._filterFreqScaler.min;
          }
          set resonance(t2) {
            this._filterFreqScaler.min = this.toFrequency(t2), this.octaves = this._octaves;
          }
          get octaves() {
            return this._octaves;
          }
          set octaves(t2) {
            this._octaves = t2, this._filterFreqScaler.max = this._filterFreqScaler.min * Math.pow(2, t2);
          }
          dispose() {
            return super.dispose(), this._oscillators.forEach((t2) => t2.dispose()), this._freqMultipliers.forEach((t2) => t2.dispose()), this.frequency.dispose(), this.detune.dispose(), this._filterFreqScaler.dispose(), this._amplitude.dispose(), this.envelope.dispose(), this._highpass.dispose(), this;
          }
        }
        class Hr extends jr {
          constructor() {
            super(Di(Hr.getDefaults(), arguments)), this.name = "MembraneSynth", this.portamento = 0;
            const t2 = Di(Hr.getDefaults(), arguments);
            this.pitchDecay = t2.pitchDecay, this.octaves = t2.octaves, Ui(this, ["oscillator", "envelope"]);
          }
          static getDefaults() {
            return Ai(Nr.getDefaults(), jr.getDefaults(), {envelope: {attack: 1e-3, attackCurve: "exponential", decay: 0.4, release: 1.4, sustain: 0.01}, octaves: 10, oscillator: {type: "sine"}, pitchDecay: 0.05});
          }
          setNote(t2, e2) {
            const s2 = this.toSeconds(e2), n2 = this.toFrequency(t2 instanceof lo ? t2.toFrequency() : t2), i2 = n2 * this.octaves;
            return this.oscillator.frequency.setValueAtTime(i2, s2), this.oscillator.frequency.exponentialRampToValueAtTime(n2, s2 + this.toSeconds(this.pitchDecay)), this;
          }
          dispose() {
            return super.dispose(), this;
          }
        }
        vi([xr(0)], Hr.prototype, "octaves", void 0), vi([wr(0)], Hr.prototype, "pitchDecay", void 0);
        class $r extends Vr {
          constructor() {
            super(Di($r.getDefaults(), arguments)), this.name = "NoiseSynth";
            const t2 = Di($r.getDefaults(), arguments);
            this.noise = new Jo(Object.assign({context: this.context}, t2.noise)), this.envelope = new Pr(Object.assign({context: this.context}, t2.envelope)), this.noise.chain(this.envelope, this.output);
          }
          static getDefaults() {
            return Object.assign(Vr.getDefaults(), {envelope: Object.assign(Mi(Fr.getDefaults(), Object.keys(wo.getDefaults())), {decay: 0.1, sustain: 0}), noise: Object.assign(Mi(Jo.getDefaults(), Object.keys(Ho.getDefaults())), {type: "white"})});
          }
          triggerAttack(t2, e2 = 1) {
            return t2 = this.toSeconds(t2), this.envelope.triggerAttack(t2, e2), this.noise.start(t2), this.envelope.sustain === 0 && this.noise.stop(t2 + this.toSeconds(this.envelope.attack) + this.toSeconds(this.envelope.decay)), this;
          }
          triggerRelease(t2) {
            return t2 = this.toSeconds(t2), this.envelope.triggerRelease(t2), this.noise.stop(t2 + this.toSeconds(this.envelope.release)), this;
          }
          sync() {
            return this._syncState() && (this._syncMethod("triggerAttack", 0), this._syncMethod("triggerRelease", 0)), this;
          }
          triggerAttackRelease(t2, e2, s2 = 1) {
            return e2 = this.toSeconds(e2), t2 = this.toSeconds(t2), this.triggerAttack(e2, s2), this.triggerRelease(e2 + t2), this;
          }
          dispose() {
            return super.dispose(), this.noise.dispose(), this.envelope.dispose(), this;
          }
        }
        const Jr = new Set();
        function Kr(t2) {
          Jr.add(t2);
        }
        function ta(t2, e2) {
          const s2 = `registerProcessor("${t2}", ${e2})`;
          Jr.add(s2);
        }
        class ea extends wo {
          constructor(t2) {
            super(t2), this.name = "ToneAudioWorklet", this.workletOptions = {}, this.onprocessorerror = Zi;
            const e2 = URL.createObjectURL(new Blob([Array.from(Jr).join("\n")], {type: "text/javascript"})), s2 = this._audioWorkletName();
            this._dummyGain = this.context.createGain(), this._dummyParam = this._dummyGain.gain, this.context.addAudioWorkletModule(e2, s2).then(() => {
              this.disposed || (this._worklet = this.context.createAudioWorkletNode(s2, this.workletOptions), this._worklet.onprocessorerror = this.onprocessorerror.bind(this), this.onReady(this._worklet));
            });
          }
          dispose() {
            return super.dispose(), this._dummyGain.disconnect(), this._worklet && (this._worklet.port.postMessage("dispose"), this._worklet.disconnect()), this;
          }
        }
        Kr(`
	/**
	 * The base AudioWorkletProcessor for use in Tone.js. Works with the [[ToneAudioWorklet]]. 
	 */
	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {

		constructor(options) {
			
			super(options);
			/**
			 * If the processor was disposed or not. Keep alive until it's disposed.
			 */
			this.disposed = false;
		   	/** 
			 * The number of samples in the processing block
			 */
			this.blockSize = 128;
			/**
			 * the sample rate
			 */
			this.sampleRate = sampleRate;

			this.port.onmessage = (event) => {
				// when it receives a dispose 
				if (event.data === "dispose") {
					this.disposed = true;
				}
			};
		}
	}
`);
        Kr("\n	/**\n	 * Abstract class for a single input/output processor. \n	 * has a 'generate' function which processes one sample at a time\n	 */\n	class SingleIOProcessor extends ToneAudioWorkletProcessor {\n\n		constructor(options) {\n			super(Object.assign(options, {\n				numberOfInputs: 1,\n				numberOfOutputs: 1\n			}));\n			/**\n			 * Holds the name of the parameter and a single value of that\n			 * parameter at the current sample\n			 * @type { [name: string]: number }\n			 */\n			this.params = {}\n		}\n\n		/**\n		 * Generate an output sample from the input sample and parameters\n		 * @abstract\n		 * @param input number\n		 * @param channel number\n		 * @param parameters { [name: string]: number }\n		 * @returns number\n		 */\n		generate(){}\n\n		/**\n		 * Update the private params object with the \n		 * values of the parameters at the given index\n		 * @param parameters { [name: string]: Float32Array },\n		 * @param index number\n		 */\n		updateParams(parameters, index) {\n			for (const paramName in parameters) {\n				const param = parameters[paramName];\n				if (param.length > 1) {\n					this.params[paramName] = parameters[paramName][index];\n				} else {\n					this.params[paramName] = parameters[paramName][0];\n				}\n			}\n		}\n\n		/**\n		 * Process a single frame of the audio\n		 * @param inputs Float32Array[][]\n		 * @param outputs Float32Array[][]\n		 */\n		process(inputs, outputs, parameters) {\n			const input = inputs[0];\n			const output = outputs[0];\n			// get the parameter values\n			const channelCount = Math.max(input && input.length || 0, output.length);\n			for (let sample = 0; sample < this.blockSize; sample++) {\n				this.updateParams(parameters, sample);\n				for (let channel = 0; channel < channelCount; channel++) {\n					const inputSample = input && input.length ? input[channel][sample] : 0;\n					output[channel][sample] = this.generate(inputSample, channel, this.params);\n				}\n			}\n			return !this.disposed;\n		}\n	};\n");
        Kr("\n	/**\n	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line\n	 */\n	class DelayLine {\n		\n		constructor(size, channels) {\n			this.buffer = [];\n			this.writeHead = []\n			this.size = size;\n\n			// create the empty channels\n			for (let i = 0; i < channels; i++) {\n				this.buffer[i] = new Float32Array(this.size);\n				this.writeHead[i] = 0;\n			}\n		}\n\n		/**\n		 * Push a value onto the end\n		 * @param channel number\n		 * @param value number\n		 */\n		push(channel, value) {\n			this.writeHead[channel] += 1;\n			if (this.writeHead[channel] > this.size) {\n				this.writeHead[channel] = 0;\n			}\n			this.buffer[channel][this.writeHead[channel]] = value;\n		}\n\n		/**\n		 * Get the recorded value of the channel given the delay\n		 * @param channel number\n		 * @param delay number delay samples\n		 */\n		get(channel, delay) {\n			let readHead = this.writeHead[channel] - Math.floor(delay);\n			if (readHead < 0) {\n				readHead += this.size;\n			}\n			return this.buffer[channel][readHead];\n		}\n	}\n");
        ta("feedback-comb-filter", '\n	class FeedbackCombFilterWorklet extends SingleIOProcessor {\n\n		constructor(options) {\n			super(options);\n			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);\n		}\n\n		static get parameterDescriptors() {\n			return [{\n				name: "delayTime",\n				defaultValue: 0.1,\n				minValue: 0,\n				maxValue: 1,\n				automationRate: "k-rate"\n			}, {\n				name: "feedback",\n				defaultValue: 0.5,\n				minValue: 0,\n				maxValue: 0.9999,\n				automationRate: "k-rate"\n			}];\n		}\n\n		generate(input, channel, parameters) {\n			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);\n			this.delayLine.push(channel, input + delayedSample * parameters.feedback);\n			return delayedSample;\n		}\n	}\n');
        class sa extends ea {
          constructor() {
            super(Di(sa.getDefaults(), arguments, ["delayTime", "resonance"])), this.name = "FeedbackCombFilter";
            const t2 = Di(sa.getDefaults(), arguments, ["delayTime", "resonance"]);
            this.input = new ko({context: this.context}), this.output = new ko({context: this.context}), this.delayTime = new xo({context: this.context, value: t2.delayTime, units: "time", minValue: 0, maxValue: 1, param: this._dummyParam, swappable: true}), this.resonance = new xo({context: this.context, value: t2.resonance, units: "normalRange", param: this._dummyParam, swappable: true}), Ui(this, ["resonance", "delayTime"]);
          }
          _audioWorkletName() {
            return "feedback-comb-filter";
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {delayTime: 0.1, resonance: 0.5});
          }
          onReady(t2) {
            bo(this.input, t2, this.output);
            const e2 = t2.parameters.get("delayTime");
            this.delayTime.setParam(e2);
            const s2 = t2.parameters.get("feedback");
            this.resonance.setParam(s2);
          }
          dispose() {
            return super.dispose(), this.input.dispose(), this.output.dispose(), this.delayTime.dispose(), this.resonance.dispose(), this;
          }
        }
        class na extends wo {
          constructor() {
            super(Di(na.getDefaults(), arguments, ["frequency", "type"])), this.name = "OnePoleFilter";
            const t2 = Di(na.getDefaults(), arguments, ["frequency", "type"]);
            this._frequency = t2.frequency, this._type = t2.type, this.input = new ko({context: this.context}), this.output = new ko({context: this.context}), this._createFilter();
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {frequency: 880, type: "lowpass"});
          }
          _createFilter() {
            const t2 = this._filter, e2 = this.toFrequency(this._frequency), s2 = 1 / (2 * Math.PI * e2);
            if (this._type === "lowpass") {
              const t3 = 1 / (s2 * this.context.sampleRate), e3 = t3 - 1;
              this._filter = this.context.createIIRFilter([t3, 0], [1, e3]);
            } else {
              const t3 = 1 / (s2 * this.context.sampleRate) - 1;
              this._filter = this.context.createIIRFilter([1, -1], [1, t3]);
            }
            this.input.chain(this._filter, this.output), t2 && this.context.setTimeout(() => {
              this.disposed || (this.input.disconnect(t2), t2.disconnect());
            }, this.blockTime);
          }
          get frequency() {
            return this._frequency;
          }
          set frequency(t2) {
            this._frequency = t2, this._createFilter();
          }
          get type() {
            return this._type;
          }
          set type(t2) {
            this._type = t2, this._createFilter();
          }
          getFrequencyResponse(t2 = 128) {
            const e2 = new Float32Array(t2);
            for (let s3 = 0; s3 < t2; s3++) {
              const n3 = 19980 * Math.pow(s3 / t2, 2) + 20;
              e2[s3] = n3;
            }
            const s2 = new Float32Array(t2), n2 = new Float32Array(t2);
            return this._filter.getFrequencyResponse(e2, s2, n2), s2;
          }
          dispose() {
            return super.dispose(), this.input.dispose(), this.output.dispose(), this._filter.disconnect(), this;
          }
        }
        class ia extends wo {
          constructor() {
            super(Di(ia.getDefaults(), arguments, ["delayTime", "resonance", "dampening"])), this.name = "LowpassCombFilter";
            const t2 = Di(ia.getDefaults(), arguments, ["delayTime", "resonance", "dampening"]);
            this._combFilter = this.output = new sa({context: this.context, delayTime: t2.delayTime, resonance: t2.resonance}), this.delayTime = this._combFilter.delayTime, this.resonance = this._combFilter.resonance, this._lowpass = this.input = new na({context: this.context, frequency: t2.dampening, type: "lowpass"}), this._lowpass.connect(this._combFilter);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {dampening: 3e3, delayTime: 0.1, resonance: 0.5});
          }
          get dampening() {
            return this._lowpass.frequency;
          }
          set dampening(t2) {
            this._lowpass.frequency = t2;
          }
          dispose() {
            return super.dispose(), this._combFilter.dispose(), this._lowpass.dispose(), this;
          }
        }
        class oa extends Vr {
          constructor() {
            super(Di(oa.getDefaults(), arguments)), this.name = "PluckSynth";
            const t2 = Di(oa.getDefaults(), arguments);
            this._noise = new Jo({context: this.context, type: "pink"}), this.attackNoise = t2.attackNoise, this._lfcf = new ia({context: this.context, dampening: t2.dampening, resonance: t2.resonance}), this.resonance = t2.resonance, this.release = t2.release, this._noise.connect(this._lfcf), this._lfcf.connect(this.output);
          }
          static getDefaults() {
            return Ai(Vr.getDefaults(), {attackNoise: 1, dampening: 4e3, resonance: 0.7, release: 1});
          }
          get dampening() {
            return this._lfcf.dampening;
          }
          set dampening(t2) {
            this._lfcf.dampening = t2;
          }
          triggerAttack(t2, e2) {
            const s2 = this.toFrequency(t2);
            e2 = this.toSeconds(e2);
            const n2 = 1 / s2;
            return this._lfcf.delayTime.setValueAtTime(n2, e2), this._noise.start(e2), this._noise.stop(e2 + n2 * this.attackNoise), this._lfcf.resonance.cancelScheduledValues(e2), this._lfcf.resonance.setValueAtTime(this.resonance, e2), this;
          }
          triggerRelease(t2) {
            return this._lfcf.resonance.linearRampTo(0, this.release, t2), this;
          }
          dispose() {
            return super.dispose(), this._noise.dispose(), this._lfcf.dispose(), this;
          }
        }
        class ra extends Vr {
          constructor() {
            super(Di(ra.getDefaults(), arguments, ["voice", "options"])), this.name = "PolySynth", this._availableVoices = [], this._activeVoices = [], this._voices = [], this._gcTimeout = -1, this._averageActiveVoices = 0;
            const t2 = Di(ra.getDefaults(), arguments, ["voice", "options"]);
            ti(!ui(t2.voice), "DEPRECATED: The polyphony count is no longer the first argument.");
            const e2 = t2.voice.getDefaults();
            this.options = Object.assign(e2, t2.options), this.voice = t2.voice, this.maxPolyphony = t2.maxPolyphony, this._dummyVoice = this._getNextAvailableVoice();
            const s2 = this._voices.indexOf(this._dummyVoice);
            this._voices.splice(s2, 1), this._gcTimeout = this.context.setInterval(this._collectGarbage.bind(this), 1);
          }
          static getDefaults() {
            return Object.assign(Vr.getDefaults(), {maxPolyphony: 32, options: {}, voice: jr});
          }
          get activeVoices() {
            return this._activeVoices.length;
          }
          _makeVoiceAvailable(t2) {
            this._availableVoices.push(t2);
            const e2 = this._activeVoices.findIndex((e3) => e3.voice === t2);
            this._activeVoices.splice(e2, 1);
          }
          _getNextAvailableVoice() {
            if (this._availableVoices.length)
              return this._availableVoices.shift();
            if (this._voices.length < this.maxPolyphony) {
              const t2 = new this.voice(Object.assign(this.options, {context: this.context, onsilence: this._makeVoiceAvailable.bind(this)}));
              return t2.connect(this.output), this._voices.push(t2), t2;
            }
            ri("Max polyphony exceeded. Note dropped.");
          }
          _collectGarbage() {
            if (this._averageActiveVoices = Math.max(0.95 * this._averageActiveVoices, this.activeVoices), this._availableVoices.length && this._voices.length > Math.ceil(this._averageActiveVoices + 1)) {
              const t2 = this._availableVoices.shift(), e2 = this._voices.indexOf(t2);
              this._voices.splice(e2, 1), this.context.isOffline || t2.dispose();
            }
          }
          _triggerAttack(t2, e2, s2) {
            t2.forEach((t3) => {
              const n2 = new No(this.context, t3).toMidi(), i2 = this._getNextAvailableVoice();
              i2 && (i2.triggerAttack(t3, e2, s2), this._activeVoices.push({midi: n2, voice: i2, released: false}), this.log("triggerAttack", t3, e2));
            });
          }
          _triggerRelease(t2, e2) {
            t2.forEach((t3) => {
              const s2 = new No(this.context, t3).toMidi(), n2 = this._activeVoices.find(({midi: t4, released: e3}) => t4 === s2 && !e3);
              n2 && (n2.voice.triggerRelease(e2), n2.released = true, this.log("triggerRelease", t3, e2));
            });
          }
          _scheduleEvent(t2, e2, s2, n2) {
            ti(!this.disposed, "Synth was already disposed"), s2 <= this.now() ? t2 === "attack" ? this._triggerAttack(e2, s2, n2) : this._triggerRelease(e2, s2) : this.context.setTimeout(() => {
              this._scheduleEvent(t2, e2, s2, n2);
            }, s2 - this.now());
          }
          triggerAttack(t2, e2, s2) {
            Array.isArray(t2) || (t2 = [t2]);
            const n2 = this.toSeconds(e2);
            return this._scheduleEvent("attack", t2, n2, s2), this;
          }
          triggerRelease(t2, e2) {
            Array.isArray(t2) || (t2 = [t2]);
            const s2 = this.toSeconds(e2);
            return this._scheduleEvent("release", t2, s2), this;
          }
          triggerAttackRelease(t2, e2, s2, n2) {
            const i2 = this.toSeconds(s2);
            if (this.triggerAttack(t2, i2, n2), di(e2)) {
              ti(di(t2), "If the duration is an array, the notes must also be an array"), t2 = t2;
              for (let s3 = 0; s3 < t2.length; s3++) {
                const n3 = e2[Math.min(s3, e2.length - 1)], o2 = this.toSeconds(n3);
                ti(o2 > 0, "The duration must be greater than 0"), this.triggerRelease(t2[s3], i2 + o2);
              }
            } else {
              const s3 = this.toSeconds(e2);
              ti(s3 > 0, "The duration must be greater than 0"), this.triggerRelease(t2, i2 + s3);
            }
            return this;
          }
          sync() {
            return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1)), this;
          }
          set(t2) {
            const e2 = Mi(t2, ["onsilence", "context"]);
            return this.options = Ai(this.options, e2), this._voices.forEach((t3) => t3.set(e2)), this._dummyVoice.set(e2), this;
          }
          get() {
            return this._dummyVoice.get();
          }
          releaseAll(t2) {
            const e2 = this.toSeconds(t2);
            return this._activeVoices.forEach(({voice: t3}) => {
              t3.triggerRelease(e2);
            }), this;
          }
          dispose() {
            return super.dispose(), this._dummyVoice.dispose(), this._voices.forEach((t2) => t2.dispose()), this._activeVoices = [], this._availableVoices = [], this.context.clearInterval(this._gcTimeout), this;
          }
        }
        class aa extends Vr {
          constructor() {
            super(Di(aa.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls")), this.name = "Sampler", this._activeSources = new Map();
            const t2 = Di(aa.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls"), e2 = {};
            Object.keys(t2.urls).forEach((s2) => {
              const n2 = parseInt(s2, 10);
              if (ti(_i(s2) || ui(n2) && isFinite(n2), "url key is neither a note or midi pitch: " + s2), _i(s2)) {
                const n3 = new lo(this.context, s2).toMidi();
                e2[n3] = t2.urls[s2];
              } else
                ui(n2) && isFinite(n2) && (e2[n2] = t2.urls[n2]);
            }), this._buffers = new Vo({urls: e2, onload: t2.onload, baseUrl: t2.baseUrl, onerror: t2.onerror}), this.attack = t2.attack, this.release = t2.release, this.curve = t2.curve, this._buffers.loaded && Promise.resolve().then(t2.onload);
          }
          static getDefaults() {
            return Object.assign(Vr.getDefaults(), {attack: 0, baseUrl: "", curve: "exponential", onload: Zi, onerror: Zi, release: 0.1, urls: {}});
          }
          _findClosest(t2) {
            let e2 = 0;
            for (; e2 < 96; ) {
              if (this._buffers.has(t2 + e2))
                return -e2;
              if (this._buffers.has(t2 - e2))
                return e2;
              e2++;
            }
            throw new Error("No available buffers for note: " + t2);
          }
          triggerAttack(t2, e2, s2 = 1) {
            return this.log("triggerAttack", t2, e2, s2), Array.isArray(t2) || (t2 = [t2]), t2.forEach((t3) => {
              const n2 = ro(new lo(this.context, t3).toFrequency()), i2 = Math.round(n2), o2 = n2 - i2, r2 = this._findClosest(i2), a2 = i2 - r2, c2 = this._buffers.get(a2), h2 = no(r2 + o2), u2 = new $o({url: c2, context: this.context, curve: this.curve, fadeIn: this.attack, fadeOut: this.release, playbackRate: h2}).connect(this.output);
              u2.start(e2, 0, c2.duration / h2, s2), di(this._activeSources.get(i2)) || this._activeSources.set(i2, []), this._activeSources.get(i2).push(u2), u2.onended = () => {
                if (this._activeSources && this._activeSources.has(i2)) {
                  const t4 = this._activeSources.get(i2), e3 = t4.indexOf(u2);
                  e3 !== -1 && t4.splice(e3, 1);
                }
              };
            }), this;
          }
          triggerRelease(t2, e2) {
            return this.log("triggerRelease", t2, e2), Array.isArray(t2) || (t2 = [t2]), t2.forEach((t3) => {
              const s2 = new lo(this.context, t3).toMidi();
              if (this._activeSources.has(s2) && this._activeSources.get(s2).length) {
                const t4 = this._activeSources.get(s2);
                e2 = this.toSeconds(e2), t4.forEach((t5) => {
                  t5.stop(e2);
                }), this._activeSources.set(s2, []);
              }
            }), this;
          }
          releaseAll(t2) {
            const e2 = this.toSeconds(t2);
            return this._activeSources.forEach((t3) => {
              for (; t3.length; ) {
                t3.shift().stop(e2);
              }
            }), this;
          }
          sync() {
            return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1)), this;
          }
          triggerAttackRelease(t2, e2, s2, n2 = 1) {
            const i2 = this.toSeconds(s2);
            return this.triggerAttack(t2, i2, n2), di(e2) ? (ti(di(t2), "notes must be an array when duration is array"), t2.forEach((t3, s3) => {
              const n3 = e2[Math.min(s3, e2.length - 1)];
              this.triggerRelease(t3, i2 + this.toSeconds(n3));
            })) : this.triggerRelease(t2, i2 + this.toSeconds(e2)), this;
          }
          add(t2, e2, s2) {
            if (ti(_i(t2) || isFinite(t2), "note must be a pitch or midi: " + t2), _i(t2)) {
              const n2 = new lo(this.context, t2).toMidi();
              this._buffers.add(n2, e2, s2);
            } else
              this._buffers.add(t2, e2, s2);
            return this;
          }
          get loaded() {
            return this._buffers.loaded;
          }
          dispose() {
            return super.dispose(), this._buffers.dispose(), this._activeSources.forEach((t2) => {
              t2.forEach((t3) => t3.dispose());
            }), this._activeSources.clear(), this;
          }
        }
        vi([wr(0)], aa.prototype, "attack", void 0), vi([wr(0)], aa.prototype, "release", void 0);
        class ca extends vo {
          constructor() {
            super(Di(ca.getDefaults(), arguments, ["callback", "value"])), this.name = "ToneEvent", this._state = new yo("stopped"), this._startOffset = 0;
            const t2 = Di(ca.getDefaults(), arguments, ["callback", "value"]);
            this._loop = t2.loop, this.callback = t2.callback, this.value = t2.value, this._loopStart = this.toTicks(t2.loopStart), this._loopEnd = this.toTicks(t2.loopEnd), this._playbackRate = t2.playbackRate, this._probability = t2.probability, this._humanize = t2.humanize, this.mute = t2.mute, this._playbackRate = t2.playbackRate, this._state.increasing = true, this._rescheduleEvents();
          }
          static getDefaults() {
            return Object.assign(vo.getDefaults(), {callback: Zi, humanize: false, loop: false, loopEnd: "1m", loopStart: 0, mute: false, playbackRate: 1, probability: 1, value: null});
          }
          _rescheduleEvents(t2 = -1) {
            this._state.forEachFrom(t2, (t3) => {
              let e2;
              if (t3.state === "started") {
                t3.id !== -1 && this.context.transport.clear(t3.id);
                const s2 = t3.time + Math.round(this.startOffset / this._playbackRate);
                if (this._loop === true || ui(this._loop) && this._loop > 1) {
                  e2 = 1 / 0, ui(this._loop) && (e2 = this._loop * this._getLoopDuration());
                  const n2 = this._state.getAfter(s2);
                  n2 !== null && (e2 = Math.min(e2, n2.time - s2)), e2 !== 1 / 0 && (this._state.setStateAtTime("stopped", s2 + e2 + 1, {id: -1}), e2 = new jo(this.context, e2));
                  const i2 = new jo(this.context, this._getLoopDuration());
                  t3.id = this.context.transport.scheduleRepeat(this._tick.bind(this), i2, new jo(this.context, s2), e2);
                } else
                  t3.id = this.context.transport.schedule(this._tick.bind(this), new jo(this.context, s2));
              }
            });
          }
          get state() {
            return this._state.getValueAtTime(this.context.transport.ticks);
          }
          get startOffset() {
            return this._startOffset;
          }
          set startOffset(t2) {
            this._startOffset = t2;
          }
          get probability() {
            return this._probability;
          }
          set probability(t2) {
            this._probability = t2;
          }
          get humanize() {
            return this._humanize;
          }
          set humanize(t2) {
            this._humanize = t2;
          }
          start(t2) {
            const e2 = this.toTicks(t2);
            return this._state.getValueAtTime(e2) === "stopped" && (this._state.add({id: -1, state: "started", time: e2}), this._rescheduleEvents(e2)), this;
          }
          stop(t2) {
            this.cancel(t2);
            const e2 = this.toTicks(t2);
            if (this._state.getValueAtTime(e2) === "started") {
              this._state.setStateAtTime("stopped", e2, {id: -1});
              const t3 = this._state.getBefore(e2);
              let s2 = e2;
              t3 !== null && (s2 = t3.time), this._rescheduleEvents(s2);
            }
            return this;
          }
          cancel(t2) {
            t2 = Oi(t2, -1 / 0);
            const e2 = this.toTicks(t2);
            return this._state.forEachFrom(e2, (t3) => {
              this.context.transport.clear(t3.id);
            }), this._state.cancel(e2), this;
          }
          _tick(t2) {
            const e2 = this.context.transport.getTicksAtTime(t2);
            if (!this.mute && this._state.getValueAtTime(e2) === "started") {
              if (this.probability < 1 && Math.random() > this.probability)
                return;
              if (this.humanize) {
                let e3 = 0.02;
                pi(this.humanize) || (e3 = this.toSeconds(this.humanize)), t2 += (2 * Math.random() - 1) * e3;
              }
              this.callback(t2, this.value);
            }
          }
          _getLoopDuration() {
            return Math.round((this._loopEnd - this._loopStart) / this._playbackRate);
          }
          get loop() {
            return this._loop;
          }
          set loop(t2) {
            this._loop = t2, this._rescheduleEvents();
          }
          get playbackRate() {
            return this._playbackRate;
          }
          set playbackRate(t2) {
            this._playbackRate = t2, this._rescheduleEvents();
          }
          get loopEnd() {
            return new jo(this.context, this._loopEnd).toSeconds();
          }
          set loopEnd(t2) {
            this._loopEnd = this.toTicks(t2), this._loop && this._rescheduleEvents();
          }
          get loopStart() {
            return new jo(this.context, this._loopStart).toSeconds();
          }
          set loopStart(t2) {
            this._loopStart = this.toTicks(t2), this._loop && this._rescheduleEvents();
          }
          get progress() {
            if (this._loop) {
              const t2 = this.context.transport.ticks, e2 = this._state.get(t2);
              if (e2 !== null && e2.state === "started") {
                const s2 = this._getLoopDuration();
                return (t2 - e2.time) % s2 / s2;
              }
              return 0;
            }
            return 0;
          }
          dispose() {
            return super.dispose(), this.cancel(), this._state.dispose(), this;
          }
        }
        class ha extends vo {
          constructor() {
            super(Di(ha.getDefaults(), arguments, ["callback", "interval"])), this.name = "Loop";
            const t2 = Di(ha.getDefaults(), arguments, ["callback", "interval"]);
            this._event = new ca({context: this.context, callback: this._tick.bind(this), loop: true, loopEnd: t2.interval, playbackRate: t2.playbackRate, probability: t2.probability}), this.callback = t2.callback, this.iterations = t2.iterations;
          }
          static getDefaults() {
            return Object.assign(vo.getDefaults(), {interval: "4n", callback: Zi, playbackRate: 1, iterations: 1 / 0, probability: 1, mute: false, humanize: false});
          }
          start(t2) {
            return this._event.start(t2), this;
          }
          stop(t2) {
            return this._event.stop(t2), this;
          }
          cancel(t2) {
            return this._event.cancel(t2), this;
          }
          _tick(t2) {
            this.callback(t2);
          }
          get state() {
            return this._event.state;
          }
          get progress() {
            return this._event.progress;
          }
          get interval() {
            return this._event.loopEnd;
          }
          set interval(t2) {
            this._event.loopEnd = t2;
          }
          get playbackRate() {
            return this._event.playbackRate;
          }
          set playbackRate(t2) {
            this._event.playbackRate = t2;
          }
          get humanize() {
            return this._event.humanize;
          }
          set humanize(t2) {
            this._event.humanize = t2;
          }
          get probability() {
            return this._event.probability;
          }
          set probability(t2) {
            this._event.probability = t2;
          }
          get mute() {
            return this._event.mute;
          }
          set mute(t2) {
            this._event.mute = t2;
          }
          get iterations() {
            return this._event.loop === true ? 1 / 0 : this._event.loop;
          }
          set iterations(t2) {
            this._event.loop = t2 === 1 / 0 || t2;
          }
          dispose() {
            return super.dispose(), this._event.dispose(), this;
          }
        }
        class ua extends ca {
          constructor() {
            super(Di(ua.getDefaults(), arguments, ["callback", "events"])), this.name = "Part", this._state = new yo("stopped"), this._events = new Set();
            const t2 = Di(ua.getDefaults(), arguments, ["callback", "events"]);
            this._state.increasing = true, t2.events.forEach((t3) => {
              di(t3) ? this.add(t3[0], t3[1]) : this.add(t3);
            });
          }
          static getDefaults() {
            return Object.assign(ca.getDefaults(), {events: []});
          }
          start(t2, e2) {
            const s2 = this.toTicks(t2);
            if (this._state.getValueAtTime(s2) !== "started") {
              e2 = Oi(e2, this._loop ? this._loopStart : 0), e2 = this._loop ? Oi(e2, this._loopStart) : Oi(e2, 0);
              const t3 = this.toTicks(e2);
              this._state.add({id: -1, offset: t3, state: "started", time: s2}), this._forEach((e3) => {
                this._startNote(e3, s2, t3);
              });
            }
            return this;
          }
          _startNote(t2, e2, s2) {
            e2 -= s2, this._loop ? t2.startOffset >= this._loopStart && t2.startOffset < this._loopEnd ? (t2.startOffset < s2 && (e2 += this._getLoopDuration()), t2.start(new jo(this.context, e2))) : t2.startOffset < this._loopStart && t2.startOffset >= s2 && (t2.loop = false, t2.start(new jo(this.context, e2))) : t2.startOffset >= s2 && t2.start(new jo(this.context, e2));
          }
          get startOffset() {
            return this._startOffset;
          }
          set startOffset(t2) {
            this._startOffset = t2, this._forEach((t3) => {
              t3.startOffset += this._startOffset;
            });
          }
          stop(t2) {
            const e2 = this.toTicks(t2);
            return this._state.cancel(e2), this._state.setStateAtTime("stopped", e2), this._forEach((e3) => {
              e3.stop(t2);
            }), this;
          }
          at(t2, e2) {
            const s2 = new mo(this.context, t2).toTicks(), n2 = new jo(this.context, 1).toSeconds(), i2 = this._events.values();
            let o2 = i2.next();
            for (; !o2.done; ) {
              const t3 = o2.value;
              if (Math.abs(s2 - t3.startOffset) < n2)
                return ci(e2) && (t3.value = e2), t3;
              o2 = i2.next();
            }
            return ci(e2) ? (this.add(t2, e2), this.at(t2)) : null;
          }
          add(t2, e2) {
            t2 instanceof Object && Reflect.has(t2, "time") && (t2 = (e2 = t2).time);
            const s2 = this.toTicks(t2);
            let n2;
            return e2 instanceof ca ? (n2 = e2, n2.callback = this._tick.bind(this)) : n2 = new ca({callback: this._tick.bind(this), context: this.context, value: e2}), n2.startOffset = s2, n2.set({humanize: this.humanize, loop: this.loop, loopEnd: this.loopEnd, loopStart: this.loopStart, playbackRate: this.playbackRate, probability: this.probability}), this._events.add(n2), this._restartEvent(n2), this;
          }
          _restartEvent(t2) {
            this._state.forEach((e2) => {
              e2.state === "started" ? this._startNote(t2, e2.time, e2.offset) : t2.stop(new jo(this.context, e2.time));
            });
          }
          remove(t2, e2) {
            return li(t2) && t2.hasOwnProperty("time") && (t2 = (e2 = t2).time), t2 = this.toTicks(t2), this._events.forEach((s2) => {
              s2.startOffset === t2 && (ai(e2) || ci(e2) && s2.value === e2) && (this._events.delete(s2), s2.dispose());
            }), this;
          }
          clear() {
            return this._forEach((t2) => t2.dispose()), this._events.clear(), this;
          }
          cancel(t2) {
            return this._forEach((e2) => e2.cancel(t2)), this._state.cancel(this.toTicks(t2)), this;
          }
          _forEach(t2) {
            return this._events && this._events.forEach((e2) => {
              e2 instanceof ua ? e2._forEach(t2) : t2(e2);
            }), this;
          }
          _setAll(t2, e2) {
            this._forEach((s2) => {
              s2[t2] = e2;
            });
          }
          _tick(t2, e2) {
            this.mute || this.callback(t2, e2);
          }
          _testLoopBoundries(t2) {
            this._loop && (t2.startOffset < this._loopStart || t2.startOffset >= this._loopEnd) ? t2.cancel(0) : t2.state === "stopped" && this._restartEvent(t2);
          }
          get probability() {
            return this._probability;
          }
          set probability(t2) {
            this._probability = t2, this._setAll("probability", t2);
          }
          get humanize() {
            return this._humanize;
          }
          set humanize(t2) {
            this._humanize = t2, this._setAll("humanize", t2);
          }
          get loop() {
            return this._loop;
          }
          set loop(t2) {
            this._loop = t2, this._forEach((e2) => {
              e2.loopStart = this.loopStart, e2.loopEnd = this.loopEnd, e2.loop = t2, this._testLoopBoundries(e2);
            });
          }
          get loopEnd() {
            return new jo(this.context, this._loopEnd).toSeconds();
          }
          set loopEnd(t2) {
            this._loopEnd = this.toTicks(t2), this._loop && this._forEach((e2) => {
              e2.loopEnd = t2, this._testLoopBoundries(e2);
            });
          }
          get loopStart() {
            return new jo(this.context, this._loopStart).toSeconds();
          }
          set loopStart(t2) {
            this._loopStart = this.toTicks(t2), this._loop && this._forEach((t3) => {
              t3.loopStart = this.loopStart, this._testLoopBoundries(t3);
            });
          }
          get playbackRate() {
            return this._playbackRate;
          }
          set playbackRate(t2) {
            this._playbackRate = t2, this._setAll("playbackRate", t2);
          }
          get length() {
            return this._events.size;
          }
          dispose() {
            return super.dispose(), this.clear(), this;
          }
        }
        function* la(t2) {
          let e2 = 0;
          for (; e2 < t2.length; )
            e2 = fa(e2, t2), yield t2[e2], e2++;
        }
        function* pa(t2) {
          let e2 = t2.length - 1;
          for (; e2 >= 0; )
            e2 = fa(e2, t2), yield t2[e2], e2--;
        }
        function* da(t2, e2) {
          for (; ; )
            yield* e2(t2);
        }
        function fa(t2, e2) {
          return Vi(t2, 0, e2.length - 1);
        }
        function* _a(t2, e2) {
          let s2 = e2 ? 0 : t2.length - 1;
          for (; ; )
            s2 = fa(s2, t2), yield t2[s2], e2 ? (s2++, s2 >= t2.length - 1 && (e2 = false)) : (s2--, s2 <= 0 && (e2 = true));
        }
        function* ma(t2) {
          let e2 = 0, s2 = 0;
          for (; e2 < t2.length; )
            e2 = fa(e2, t2), yield t2[e2], s2++, e2 += s2 % 2 ? 2 : -1;
        }
        function* ga(t2) {
          let e2 = t2.length - 1, s2 = 0;
          for (; e2 >= 0; )
            e2 = fa(e2, t2), yield t2[e2], s2++, e2 += s2 % 2 ? -2 : 1;
        }
        function* va(t2) {
          const e2 = [];
          for (let s2 = 0; s2 < t2.length; s2++)
            e2.push(s2);
          for (; e2.length > 0; ) {
            const s2 = fa(e2.splice(Math.floor(e2.length * Math.random()), 1)[0], t2);
            yield t2[s2];
          }
        }
        function* ya(t2, e2 = "up", s2 = 0) {
          switch (ti(t2.length > 0, "The array must have more than one value in it"), e2) {
            case "up":
              yield* da(t2, la);
            case "down":
              yield* da(t2, pa);
            case "upDown":
              yield* _a(t2, true);
            case "downUp":
              yield* _a(t2, false);
            case "alternateUp":
              yield* da(t2, ma);
            case "alternateDown":
              yield* da(t2, ga);
            case "random":
              yield* function* (t3) {
                for (; ; ) {
                  const e3 = Math.floor(Math.random() * t3.length);
                  yield t3[e3];
                }
              }(t2);
            case "randomOnce":
              yield* da(t2, va);
            case "randomWalk":
              yield* function* (t3) {
                let e3 = Math.floor(Math.random() * t3.length);
                for (; ; )
                  e3 === 0 ? e3++ : e3 === t3.length - 1 || Math.random() < 0.5 ? e3-- : e3++, yield t3[e3];
              }(t2);
          }
        }
        class xa extends ha {
          constructor() {
            super(Di(xa.getDefaults(), arguments, ["callback", "values", "pattern"])), this.name = "Pattern";
            const t2 = Di(xa.getDefaults(), arguments, ["callback", "values", "pattern"]);
            this.callback = t2.callback, this._values = t2.values, this._pattern = ya(t2.values, t2.pattern), this._type = t2.pattern;
          }
          static getDefaults() {
            return Object.assign(ha.getDefaults(), {pattern: "up", values: [], callback: Zi});
          }
          _tick(t2) {
            const e2 = this._pattern.next();
            this._value = e2.value, this.callback(t2, this._value);
          }
          get values() {
            return this._values;
          }
          set values(t2) {
            this._values = t2, this.pattern = this._type;
          }
          get value() {
            return this._value;
          }
          get pattern() {
            return this._type;
          }
          set pattern(t2) {
            this._type = t2, this._pattern = ya(this._values, this._type);
          }
        }
        class wa extends ca {
          constructor() {
            super(Di(wa.getDefaults(), arguments, ["callback", "events", "subdivision"])), this.name = "Sequence", this._part = new ua({callback: this._seqCallback.bind(this), context: this.context}), this._events = [], this._eventsArray = [];
            const t2 = Di(wa.getDefaults(), arguments, ["callback", "events", "subdivision"]);
            this._subdivision = this.toTicks(t2.subdivision), this.events = t2.events, this.loop = t2.loop, this.loopStart = t2.loopStart, this.loopEnd = t2.loopEnd, this.playbackRate = t2.playbackRate, this.probability = t2.probability, this.humanize = t2.humanize, this.mute = t2.mute, this.playbackRate = t2.playbackRate;
          }
          static getDefaults() {
            return Object.assign(Mi(ca.getDefaults(), ["value"]), {events: [], loop: true, loopEnd: 0, loopStart: 0, subdivision: "8n"});
          }
          _seqCallback(t2, e2) {
            e2 !== null && this.callback(t2, e2);
          }
          get events() {
            return this._events;
          }
          set events(t2) {
            this.clear(), this._eventsArray = t2, this._events = this._createSequence(this._eventsArray), this._eventsUpdated();
          }
          start(t2, e2) {
            return this._part.start(t2, e2 ? this._indexTime(e2) : e2), this;
          }
          stop(t2) {
            return this._part.stop(t2), this;
          }
          get subdivision() {
            return new jo(this.context, this._subdivision).toSeconds();
          }
          _createSequence(t2) {
            return new Proxy(t2, {get: (t3, e2) => t3[e2], set: (t3, e2, s2) => (fi(e2) && isFinite(parseInt(e2, 10)) && di(s2) ? t3[e2] = this._createSequence(s2) : t3[e2] = s2, this._eventsUpdated(), true)});
          }
          _eventsUpdated() {
            this._part.clear(), this._rescheduleSequence(this._eventsArray, this._subdivision, this.startOffset), this.loopEnd = this.loopEnd;
          }
          _rescheduleSequence(t2, e2, s2) {
            t2.forEach((t3, n2) => {
              const i2 = n2 * e2 + s2;
              if (di(t3))
                this._rescheduleSequence(t3, e2 / t3.length, i2);
              else {
                const e3 = new jo(this.context, i2, "i").toSeconds();
                this._part.add(e3, t3);
              }
            });
          }
          _indexTime(t2) {
            return new jo(this.context, t2 * this._subdivision + this.startOffset).toSeconds();
          }
          clear() {
            return this._part.clear(), this;
          }
          dispose() {
            return super.dispose(), this._part.dispose(), this;
          }
          get loop() {
            return this._part.loop;
          }
          set loop(t2) {
            this._part.loop = t2;
          }
          get loopStart() {
            return this._loopStart;
          }
          set loopStart(t2) {
            this._loopStart = t2, this._part.loopStart = this._indexTime(t2);
          }
          get loopEnd() {
            return this._loopEnd;
          }
          set loopEnd(t2) {
            this._loopEnd = t2, this._part.loopEnd = t2 === 0 ? this._indexTime(this._eventsArray.length) : this._indexTime(t2);
          }
          get startOffset() {
            return this._part.startOffset;
          }
          set startOffset(t2) {
            this._part.startOffset = t2;
          }
          get playbackRate() {
            return this._part.playbackRate;
          }
          set playbackRate(t2) {
            this._part.playbackRate = t2;
          }
          get probability() {
            return this._part.probability;
          }
          set probability(t2) {
            this._part.probability = t2;
          }
          get progress() {
            return this._part.progress;
          }
          get humanize() {
            return this._part.humanize;
          }
          set humanize(t2) {
            this._part.humanize = t2;
          }
          get length() {
            return this._part.length;
          }
        }
        class ba extends wo {
          constructor() {
            super(Object.assign(Di(ba.getDefaults(), arguments, ["fade"]))), this.name = "CrossFade", this._panner = this.context.createStereoPanner(), this._split = this.context.createChannelSplitter(2), this._g2a = new Cr({context: this.context}), this.a = new ko({context: this.context, gain: 0}), this.b = new ko({context: this.context, gain: 0}), this.output = new ko({context: this.context}), this._internalChannels = [this.a, this.b];
            const t2 = Di(ba.getDefaults(), arguments, ["fade"]);
            this.fade = new Do({context: this.context, units: "normalRange", value: t2.fade}), Ui(this, "fade"), this.context.getConstant(1).connect(this._panner), this._panner.connect(this._split), this._panner.channelCount = 1, this._panner.channelCountMode = "explicit", To(this._split, this.a.gain, 0), To(this._split, this.b.gain, 1), this.fade.chain(this._g2a, this._panner.pan), this.a.connect(this.output), this.b.connect(this.output);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {fade: 0.5});
          }
          dispose() {
            return super.dispose(), this.a.dispose(), this.b.dispose(), this.output.dispose(), this.fade.dispose(), this._g2a.dispose(), this._panner.disconnect(), this._split.disconnect(), this;
          }
        }
        class Ta extends wo {
          constructor(t2) {
            super(t2), this.name = "Effect", this._dryWet = new ba({context: this.context}), this.wet = this._dryWet.fade, this.effectSend = new ko({context: this.context}), this.effectReturn = new ko({context: this.context}), this.input = new ko({context: this.context}), this.output = this._dryWet, this.input.fan(this._dryWet.a, this.effectSend), this.effectReturn.connect(this._dryWet.b), this.wet.setValueAtTime(t2.wet, 0), this._internalChannels = [this.effectReturn, this.effectSend], Ui(this, "wet");
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {wet: 1});
          }
          connectEffect(t2) {
            return this._internalChannels.push(t2), this.effectSend.chain(t2, this.effectReturn), this;
          }
          dispose() {
            return super.dispose(), this._dryWet.dispose(), this.effectSend.dispose(), this.effectReturn.dispose(), this.wet.dispose(), this;
          }
        }
        class Sa extends Ta {
          constructor(t2) {
            super(t2), this.name = "LFOEffect", this._lfo = new yr({context: this.context, frequency: t2.frequency, amplitude: t2.depth}), this.depth = this._lfo.amplitude, this.frequency = this._lfo.frequency, this.type = t2.type, Ui(this, ["frequency", "depth"]);
          }
          static getDefaults() {
            return Object.assign(Ta.getDefaults(), {frequency: 1, type: "sine", depth: 1});
          }
          start(t2) {
            return this._lfo.start(t2), this;
          }
          stop(t2) {
            return this._lfo.stop(t2), this;
          }
          sync() {
            return this._lfo.sync(), this;
          }
          unsync() {
            return this._lfo.unsync(), this;
          }
          get type() {
            return this._lfo.type;
          }
          set type(t2) {
            this._lfo.type = t2;
          }
          dispose() {
            return super.dispose(), this._lfo.dispose(), this.frequency.dispose(), this.depth.dispose(), this;
          }
        }
        class ka extends Sa {
          constructor() {
            super(Di(ka.getDefaults(), arguments, ["frequency", "baseFrequency", "octaves"])), this.name = "AutoFilter";
            const t2 = Di(ka.getDefaults(), arguments, ["frequency", "baseFrequency", "octaves"]);
            this.filter = new Wr(Object.assign(t2.filter, {context: this.context})), this.connectEffect(this.filter), this._lfo.connect(this.filter.frequency), this.octaves = t2.octaves, this.baseFrequency = t2.baseFrequency;
          }
          static getDefaults() {
            return Object.assign(Sa.getDefaults(), {baseFrequency: 200, octaves: 2.6, filter: {type: "lowpass", rolloff: -12, Q: 1}});
          }
          get baseFrequency() {
            return this._lfo.min;
          }
          set baseFrequency(t2) {
            this._lfo.min = this.toFrequency(t2), this.octaves = this._octaves;
          }
          get octaves() {
            return this._octaves;
          }
          set octaves(t2) {
            this._octaves = t2, this._lfo.max = this._lfo.min * Math.pow(2, t2);
          }
          dispose() {
            return super.dispose(), this.filter.dispose(), this;
          }
        }
        class Ca extends wo {
          constructor() {
            super(Object.assign(Di(Ca.getDefaults(), arguments, ["pan"]))), this.name = "Panner", this._panner = this.context.createStereoPanner(), this.input = this._panner, this.output = this._panner;
            const t2 = Di(Ca.getDefaults(), arguments, ["pan"]);
            this.pan = new xo({context: this.context, param: this._panner.pan, value: t2.pan, minValue: -1, maxValue: 1}), this._panner.channelCount = t2.channelCount, this._panner.channelCountMode = "explicit", Ui(this, "pan");
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {pan: 0, channelCount: 1});
          }
          dispose() {
            return super.dispose(), this._panner.disconnect(), this.pan.dispose(), this;
          }
        }
        class Aa extends Sa {
          constructor() {
            super(Di(Aa.getDefaults(), arguments, ["frequency"])), this.name = "AutoPanner";
            const t2 = Di(Aa.getDefaults(), arguments, ["frequency"]);
            this._panner = new Ca({context: this.context, channelCount: t2.channelCount}), this.connectEffect(this._panner), this._lfo.connect(this._panner.pan), this._lfo.min = -1, this._lfo.max = 1;
          }
          static getDefaults() {
            return Object.assign(Sa.getDefaults(), {channelCount: 1});
          }
          dispose() {
            return super.dispose(), this._panner.dispose(), this;
          }
        }
        class Da extends wo {
          constructor() {
            super(Di(Da.getDefaults(), arguments, ["smoothing"])), this.name = "Follower";
            const t2 = Di(Da.getDefaults(), arguments, ["smoothing"]);
            this._abs = this.input = new kr({context: this.context}), this._lowpass = this.output = new na({context: this.context, frequency: 1 / this.toSeconds(t2.smoothing), type: "lowpass"}), this._abs.connect(this._lowpass), this._smoothing = t2.smoothing;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {smoothing: 0.05});
          }
          get smoothing() {
            return this._smoothing;
          }
          set smoothing(t2) {
            this._smoothing = t2, this._lowpass.frequency = 1 / this.toSeconds(this.smoothing);
          }
          dispose() {
            return super.dispose(), this._abs.dispose(), this._lowpass.dispose(), this;
          }
        }
        class Oa extends Ta {
          constructor() {
            super(Di(Oa.getDefaults(), arguments, ["baseFrequency", "octaves", "sensitivity"])), this.name = "AutoWah";
            const t2 = Di(Oa.getDefaults(), arguments, ["baseFrequency", "octaves", "sensitivity"]);
            this._follower = new Da({context: this.context, smoothing: t2.follower}), this._sweepRange = new Rr({context: this.context, min: 0, max: 1, exponent: 0.5}), this._baseFrequency = this.toFrequency(t2.baseFrequency), this._octaves = t2.octaves, this._inputBoost = new ko({context: this.context}), this._bandpass = new Wr({context: this.context, rolloff: -48, frequency: 0, Q: t2.Q}), this._peaking = new Wr({context: this.context, type: "peaking"}), this._peaking.gain.value = t2.gain, this.gain = this._peaking.gain, this.Q = this._bandpass.Q, this.effectSend.chain(this._inputBoost, this._follower, this._sweepRange), this._sweepRange.connect(this._bandpass.frequency), this._sweepRange.connect(this._peaking.frequency), this.effectSend.chain(this._bandpass, this._peaking, this.effectReturn), this._setSweepRange(), this.sensitivity = t2.sensitivity, Ui(this, ["gain", "Q"]);
          }
          static getDefaults() {
            return Object.assign(Ta.getDefaults(), {baseFrequency: 100, octaves: 6, sensitivity: 0, Q: 2, gain: 2, follower: 0.2});
          }
          get octaves() {
            return this._octaves;
          }
          set octaves(t2) {
            this._octaves = t2, this._setSweepRange();
          }
          get follower() {
            return this._follower.smoothing;
          }
          set follower(t2) {
            this._follower.smoothing = t2;
          }
          get baseFrequency() {
            return this._baseFrequency;
          }
          set baseFrequency(t2) {
            this._baseFrequency = this.toFrequency(t2), this._setSweepRange();
          }
          get sensitivity() {
            return so(1 / this._inputBoost.gain.value);
          }
          set sensitivity(t2) {
            this._inputBoost.gain.value = 1 / eo(t2);
          }
          _setSweepRange() {
            this._sweepRange.min = this._baseFrequency, this._sweepRange.max = Math.min(this._baseFrequency * Math.pow(2, this._octaves), this.context.sampleRate / 2);
          }
          dispose() {
            return super.dispose(), this._follower.dispose(), this._sweepRange.dispose(), this._bandpass.dispose(), this._peaking.dispose(), this._inputBoost.dispose(), this;
          }
        }
        ta("bit-crusher", `
	class BitCrusherWorklet extends SingleIOProcessor {

		static get parameterDescriptors() {
			return [{
				name: "bits",
				defaultValue: 12,
				minValue: 1,
				maxValue: 16,
				automationRate: 'k-rate'
			}];
		}

		generate(input, _channel, parameters) {
			const step = Math.pow(0.5, parameters.bits - 1);
			const val = step * Math.floor(input / step + 0.5);
			return val;
		}
	}
`);
        class Ma extends Ta {
          constructor() {
            super(Di(Ma.getDefaults(), arguments, ["bits"])), this.name = "BitCrusher";
            const t2 = Di(Ma.getDefaults(), arguments, ["bits"]);
            this._bitCrusherWorklet = new Ea({context: this.context, bits: t2.bits}), this.connectEffect(this._bitCrusherWorklet), this.bits = this._bitCrusherWorklet.bits;
          }
          static getDefaults() {
            return Object.assign(Ta.getDefaults(), {bits: 4});
          }
          dispose() {
            return super.dispose(), this._bitCrusherWorklet.dispose(), this;
          }
        }
        class Ea extends ea {
          constructor() {
            super(Di(Ea.getDefaults(), arguments)), this.name = "BitCrusherWorklet";
            const t2 = Di(Ea.getDefaults(), arguments);
            this.input = new ko({context: this.context}), this.output = new ko({context: this.context}), this.bits = new xo({context: this.context, value: t2.bits, units: "positive", minValue: 1, maxValue: 16, param: this._dummyParam, swappable: true});
          }
          static getDefaults() {
            return Object.assign(ea.getDefaults(), {bits: 12});
          }
          _audioWorkletName() {
            return "bit-crusher";
          }
          onReady(t2) {
            bo(this.input, t2, this.output);
            const e2 = t2.parameters.get("bits");
            this.bits.setParam(e2);
          }
          dispose() {
            return super.dispose(), this.input.dispose(), this.output.dispose(), this.bits.dispose(), this;
          }
        }
        class Ra extends Ta {
          constructor() {
            super(Di(Ra.getDefaults(), arguments, ["order"])), this.name = "Chebyshev";
            const t2 = Di(Ra.getDefaults(), arguments, ["order"]);
            this._shaper = new rr({context: this.context, length: 4096}), this._order = t2.order, this.connectEffect(this._shaper), this.order = t2.order, this.oversample = t2.oversample;
          }
          static getDefaults() {
            return Object.assign(Ta.getDefaults(), {order: 1, oversample: "none"});
          }
          _getCoefficient(t2, e2, s2) {
            return s2.has(e2) || (e2 === 0 ? s2.set(e2, 0) : e2 === 1 ? s2.set(e2, t2) : s2.set(e2, 2 * t2 * this._getCoefficient(t2, e2 - 1, s2) - this._getCoefficient(t2, e2 - 2, s2))), s2.get(e2);
          }
          get order() {
            return this._order;
          }
          set order(t2) {
            this._order = t2, this._shaper.setMap((e2) => this._getCoefficient(e2, t2, new Map()));
          }
          get oversample() {
            return this._shaper.oversample;
          }
          set oversample(t2) {
            this._shaper.oversample = t2;
          }
          dispose() {
            return super.dispose(), this._shaper.dispose(), this;
          }
        }
        class qa extends wo {
          constructor() {
            super(Di(qa.getDefaults(), arguments, ["channels"])), this.name = "Split";
            const t2 = Di(qa.getDefaults(), arguments, ["channels"]);
            this._splitter = this.input = this.output = this.context.createChannelSplitter(t2.channels), this._internalChannels = [this._splitter];
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {channels: 2});
          }
          dispose() {
            return super.dispose(), this._splitter.disconnect(), this;
          }
        }
        class Fa extends wo {
          constructor() {
            super(Di(Fa.getDefaults(), arguments, ["channels"])), this.name = "Merge";
            const t2 = Di(Fa.getDefaults(), arguments, ["channels"]);
            this._merger = this.output = this.input = this.context.createChannelMerger(t2.channels);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {channels: 2});
          }
          dispose() {
            return super.dispose(), this._merger.disconnect(), this;
          }
        }
        class Ia extends wo {
          constructor(t2) {
            super(t2), this.name = "StereoEffect", this.input = new ko({context: this.context}), this.input.channelCount = 2, this.input.channelCountMode = "explicit", this._dryWet = this.output = new ba({context: this.context, fade: t2.wet}), this.wet = this._dryWet.fade, this._split = new qa({context: this.context, channels: 2}), this._merge = new Fa({context: this.context, channels: 2}), this.input.connect(this._split), this.input.connect(this._dryWet.a), this._merge.connect(this._dryWet.b), Ui(this, ["wet"]);
          }
          connectEffectLeft(...t2) {
            this._split.connect(t2[0], 0, 0), bo(...t2), To(t2[t2.length - 1], this._merge, 0, 0);
          }
          connectEffectRight(...t2) {
            this._split.connect(t2[0], 1, 0), bo(...t2), To(t2[t2.length - 1], this._merge, 0, 1);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {wet: 1});
          }
          dispose() {
            return super.dispose(), this._dryWet.dispose(), this._split.dispose(), this._merge.dispose(), this;
          }
        }
        class Va extends Ia {
          constructor(t2) {
            super(t2), this.feedback = new Do({context: this.context, value: t2.feedback, units: "normalRange"}), this._feedbackL = new ko({context: this.context}), this._feedbackR = new ko({context: this.context}), this._feedbackSplit = new qa({context: this.context, channels: 2}), this._feedbackMerge = new Fa({context: this.context, channels: 2}), this._merge.connect(this._feedbackSplit), this._feedbackMerge.connect(this._split), this._feedbackSplit.connect(this._feedbackL, 0, 0), this._feedbackL.connect(this._feedbackMerge, 0, 0), this._feedbackSplit.connect(this._feedbackR, 1, 0), this._feedbackR.connect(this._feedbackMerge, 0, 1), this.feedback.fan(this._feedbackL.gain, this._feedbackR.gain), Ui(this, ["feedback"]);
          }
          static getDefaults() {
            return Object.assign(Ia.getDefaults(), {feedback: 0.5});
          }
          dispose() {
            return super.dispose(), this.feedback.dispose(), this._feedbackL.dispose(), this._feedbackR.dispose(), this._feedbackSplit.dispose(), this._feedbackMerge.dispose(), this;
          }
        }
        class Na extends Va {
          constructor() {
            super(Di(Na.getDefaults(), arguments, ["frequency", "delayTime", "depth"])), this.name = "Chorus";
            const t2 = Di(Na.getDefaults(), arguments, ["frequency", "delayTime", "depth"]);
            this._depth = t2.depth, this._delayTime = t2.delayTime / 1e3, this._lfoL = new yr({context: this.context, frequency: t2.frequency, min: 0, max: 1}), this._lfoR = new yr({context: this.context, frequency: t2.frequency, min: 0, max: 1, phase: 180}), this._delayNodeL = new Fo({context: this.context}), this._delayNodeR = new Fo({context: this.context}), this.frequency = this._lfoL.frequency, Ui(this, ["frequency"]), this._lfoL.frequency.connect(this._lfoR.frequency), this.connectEffectLeft(this._delayNodeL), this.connectEffectRight(this._delayNodeR), this._lfoL.connect(this._delayNodeL.delayTime), this._lfoR.connect(this._delayNodeR.delayTime), this.depth = this._depth, this.type = t2.type, this.spread = t2.spread;
          }
          static getDefaults() {
            return Object.assign(Va.getDefaults(), {frequency: 1.5, delayTime: 3.5, depth: 0.7, type: "sine", spread: 180, feedback: 0, wet: 0.5});
          }
          get depth() {
            return this._depth;
          }
          set depth(t2) {
            this._depth = t2;
            const e2 = this._delayTime * t2;
            this._lfoL.min = Math.max(this._delayTime - e2, 0), this._lfoL.max = this._delayTime + e2, this._lfoR.min = Math.max(this._delayTime - e2, 0), this._lfoR.max = this._delayTime + e2;
          }
          get delayTime() {
            return 1e3 * this._delayTime;
          }
          set delayTime(t2) {
            this._delayTime = t2 / 1e3, this.depth = this._depth;
          }
          get type() {
            return this._lfoL.type;
          }
          set type(t2) {
            this._lfoL.type = t2, this._lfoR.type = t2;
          }
          get spread() {
            return this._lfoR.phase - this._lfoL.phase;
          }
          set spread(t2) {
            this._lfoL.phase = 90 - t2 / 2, this._lfoR.phase = t2 / 2 + 90;
          }
          start(t2) {
            return this._lfoL.start(t2), this._lfoR.start(t2), this;
          }
          stop(t2) {
            return this._lfoL.stop(t2), this._lfoR.stop(t2), this;
          }
          sync() {
            return this._lfoL.sync(), this._lfoR.sync(), this;
          }
          unsync() {
            return this._lfoL.unsync(), this._lfoR.unsync(), this;
          }
          dispose() {
            return super.dispose(), this._lfoL.dispose(), this._lfoR.dispose(), this._delayNodeL.dispose(), this._delayNodeR.dispose(), this.frequency.dispose(), this;
          }
        }
        class Pa extends Ta {
          constructor() {
            super(Di(Pa.getDefaults(), arguments, ["distortion"])), this.name = "Distortion";
            const t2 = Di(Pa.getDefaults(), arguments, ["distortion"]);
            this._shaper = new rr({context: this.context, length: 4096}), this._distortion = t2.distortion, this.connectEffect(this._shaper), this.distortion = t2.distortion, this.oversample = t2.oversample;
          }
          static getDefaults() {
            return Object.assign(Ta.getDefaults(), {distortion: 0.4, oversample: "none"});
          }
          get distortion() {
            return this._distortion;
          }
          set distortion(t2) {
            this._distortion = t2;
            const e2 = 100 * t2, s2 = Math.PI / 180;
            this._shaper.setMap((t3) => Math.abs(t3) < 1e-3 ? 0 : (3 + e2) * t3 * 20 * s2 / (Math.PI + e2 * Math.abs(t3)));
          }
          get oversample() {
            return this._shaper.oversample;
          }
          set oversample(t2) {
            this._shaper.oversample = t2;
          }
          dispose() {
            return super.dispose(), this._shaper.dispose(), this;
          }
        }
        class ja extends Ta {
          constructor(t2) {
            super(t2), this.name = "FeedbackEffect", this._feedbackGain = new ko({context: this.context, gain: t2.feedback, units: "normalRange"}), this.feedback = this._feedbackGain.gain, Ui(this, "feedback"), this.effectReturn.chain(this._feedbackGain, this.effectSend);
          }
          static getDefaults() {
            return Object.assign(Ta.getDefaults(), {feedback: 0.125});
          }
          dispose() {
            return super.dispose(), this._feedbackGain.dispose(), this.feedback.dispose(), this;
          }
        }
        class La extends ja {
          constructor() {
            super(Di(La.getDefaults(), arguments, ["delayTime", "feedback"])), this.name = "FeedbackDelay";
            const t2 = Di(La.getDefaults(), arguments, ["delayTime", "feedback"]);
            this._delayNode = new Fo({context: this.context, delayTime: t2.delayTime, maxDelay: t2.maxDelay}), this.delayTime = this._delayNode.delayTime, this.connectEffect(this._delayNode), Ui(this, "delayTime");
          }
          static getDefaults() {
            return Object.assign(ja.getDefaults(), {delayTime: 0.25, maxDelay: 1});
          }
          dispose() {
            return super.dispose(), this._delayNode.dispose(), this.delayTime.dispose(), this;
          }
        }
        class za extends wo {
          constructor(t2) {
            super(t2), this.name = "PhaseShiftAllpass", this.input = new ko({context: this.context}), this.output = new ko({context: this.context}), this.offset90 = new ko({context: this.context});
            this._bank0 = this._createAllPassFilterBank([0.6923878, 0.9360654322959, 0.988229522686, 0.9987488452737]), this._bank1 = this._createAllPassFilterBank([0.4021921162426, 0.856171088242, 0.9722909545651, 0.9952884791278]), this._oneSampleDelay = this.context.createIIRFilter([0, 1], [1, 0]), bo(this.input, ...this._bank0, this._oneSampleDelay, this.output), bo(this.input, ...this._bank1, this.offset90);
          }
          _createAllPassFilterBank(t2) {
            return t2.map((t3) => {
              const e2 = [[t3 * t3, 0, -1], [1, 0, -t3 * t3]];
              return this.context.createIIRFilter(e2[0], e2[1]);
            });
          }
          dispose() {
            return super.dispose(), this.input.dispose(), this.output.dispose(), this.offset90.dispose(), this._bank0.forEach((t2) => t2.disconnect()), this._bank1.forEach((t2) => t2.disconnect()), this._oneSampleDelay.disconnect(), this;
          }
        }
        class Ba extends Ta {
          constructor() {
            super(Di(Ba.getDefaults(), arguments, ["frequency"])), this.name = "FrequencyShifter";
            const t2 = Di(Ba.getDefaults(), arguments, ["frequency"]);
            this.frequency = new Do({context: this.context, units: "frequency", value: t2.frequency, minValue: -this.context.sampleRate / 2, maxValue: this.context.sampleRate / 2}), this._sine = new nr({context: this.context, type: "sine"}), this._cosine = new ir({context: this.context, phase: -90, type: "sine"}), this._sineMultiply = new cr({context: this.context}), this._cosineMultiply = new cr({context: this.context}), this._negate = new Ar({context: this.context}), this._add = new mr({context: this.context}), this._phaseShifter = new za({context: this.context}), this.effectSend.connect(this._phaseShifter), this.frequency.fan(this._sine.frequency, this._cosine.frequency), this._phaseShifter.offset90.connect(this._cosineMultiply), this._cosine.connect(this._cosineMultiply.factor), this._phaseShifter.connect(this._sineMultiply), this._sine.connect(this._sineMultiply.factor), this._sineMultiply.connect(this._negate), this._cosineMultiply.connect(this._add), this._negate.connect(this._add.addend), this._add.connect(this.effectReturn);
            const e2 = this.immediate();
            this._sine.start(e2), this._cosine.start(e2);
          }
          static getDefaults() {
            return Object.assign(Ta.getDefaults(), {frequency: 0});
          }
          dispose() {
            return super.dispose(), this.frequency.dispose(), this._add.dispose(), this._cosine.dispose(), this._cosineMultiply.dispose(), this._negate.dispose(), this._phaseShifter.dispose(), this._sine.dispose(), this._sineMultiply.dispose(), this;
          }
        }
        const Wa = [1557 / 44100, 1617 / 44100, 1491 / 44100, 1422 / 44100, 1277 / 44100, 1356 / 44100, 1188 / 44100, 1116 / 44100], Ga = [225, 556, 441, 341];
        class Ua extends Ia {
          constructor() {
            super(Di(Ua.getDefaults(), arguments, ["roomSize", "dampening"])), this.name = "Freeverb", this._combFilters = [], this._allpassFiltersL = [], this._allpassFiltersR = [];
            const t2 = Di(Ua.getDefaults(), arguments, ["roomSize", "dampening"]);
            this.roomSize = new Do({context: this.context, value: t2.roomSize, units: "normalRange"}), this._allpassFiltersL = Ga.map((t3) => {
              const e2 = this.context.createBiquadFilter();
              return e2.type = "allpass", e2.frequency.value = t3, e2;
            }), this._allpassFiltersR = Ga.map((t3) => {
              const e2 = this.context.createBiquadFilter();
              return e2.type = "allpass", e2.frequency.value = t3, e2;
            }), this._combFilters = Wa.map((e2, s2) => {
              const n2 = new ia({context: this.context, dampening: t2.dampening, delayTime: e2});
              return s2 < Wa.length / 2 ? this.connectEffectLeft(n2, ...this._allpassFiltersL) : this.connectEffectRight(n2, ...this._allpassFiltersR), this.roomSize.connect(n2.resonance), n2;
            }), Ui(this, ["roomSize"]);
          }
          static getDefaults() {
            return Object.assign(Ia.getDefaults(), {roomSize: 0.7, dampening: 3e3});
          }
          get dampening() {
            return this._combFilters[0].dampening;
          }
          set dampening(t2) {
            this._combFilters.forEach((e2) => e2.dampening = t2);
          }
          dispose() {
            return super.dispose(), this._allpassFiltersL.forEach((t2) => t2.disconnect()), this._allpassFiltersR.forEach((t2) => t2.disconnect()), this._combFilters.forEach((t2) => t2.dispose()), this.roomSize.dispose(), this;
          }
        }
        const Qa = [0.06748, 0.06404, 0.08212, 0.09004], Za = [0.773, 0.802, 0.753, 0.733], Xa = [347, 113, 37];
        class Ya extends Ia {
          constructor() {
            super(Di(Ya.getDefaults(), arguments, ["roomSize"])), this.name = "JCReverb", this._allpassFilters = [], this._feedbackCombFilters = [];
            const t2 = Di(Ya.getDefaults(), arguments, ["roomSize"]);
            this.roomSize = new Do({context: this.context, value: t2.roomSize, units: "normalRange"}), this._scaleRoomSize = new gr({context: this.context, min: -0.733, max: 0.197}), this._allpassFilters = Xa.map((t3) => {
              const e2 = this.context.createBiquadFilter();
              return e2.type = "allpass", e2.frequency.value = t3, e2;
            }), this._feedbackCombFilters = Qa.map((t3, e2) => {
              const s2 = new sa({context: this.context, delayTime: t3});
              return this._scaleRoomSize.connect(s2.resonance), s2.resonance.value = Za[e2], e2 < Qa.length / 2 ? this.connectEffectLeft(...this._allpassFilters, s2) : this.connectEffectRight(...this._allpassFilters, s2), s2;
            }), this.roomSize.connect(this._scaleRoomSize), Ui(this, ["roomSize"]);
          }
          static getDefaults() {
            return Object.assign(Ia.getDefaults(), {roomSize: 0.5});
          }
          dispose() {
            return super.dispose(), this._allpassFilters.forEach((t2) => t2.disconnect()), this._feedbackCombFilters.forEach((t2) => t2.dispose()), this.roomSize.dispose(), this._scaleRoomSize.dispose(), this;
          }
        }
        class Ha extends Va {
          constructor(t2) {
            super(t2), this._feedbackL.disconnect(), this._feedbackL.connect(this._feedbackMerge, 0, 1), this._feedbackR.disconnect(), this._feedbackR.connect(this._feedbackMerge, 0, 0), Ui(this, ["feedback"]);
          }
        }
        class $a extends Ha {
          constructor() {
            super(Di($a.getDefaults(), arguments, ["delayTime", "feedback"])), this.name = "PingPongDelay";
            const t2 = Di($a.getDefaults(), arguments, ["delayTime", "feedback"]);
            this._leftDelay = new Fo({context: this.context, maxDelay: t2.maxDelay}), this._rightDelay = new Fo({context: this.context, maxDelay: t2.maxDelay}), this._rightPreDelay = new Fo({context: this.context, maxDelay: t2.maxDelay}), this.delayTime = new Do({context: this.context, units: "time", value: t2.delayTime}), this.connectEffectLeft(this._leftDelay), this.connectEffectRight(this._rightPreDelay, this._rightDelay), this.delayTime.fan(this._leftDelay.delayTime, this._rightDelay.delayTime, this._rightPreDelay.delayTime), this._feedbackL.disconnect(), this._feedbackL.connect(this._rightDelay), Ui(this, ["delayTime"]);
          }
          static getDefaults() {
            return Object.assign(Ha.getDefaults(), {delayTime: 0.25, maxDelay: 1});
          }
          dispose() {
            return super.dispose(), this._leftDelay.dispose(), this._rightDelay.dispose(), this._rightPreDelay.dispose(), this.delayTime.dispose(), this;
          }
        }
        class Ja extends ja {
          constructor() {
            super(Di(Ja.getDefaults(), arguments, ["pitch"])), this.name = "PitchShift";
            const t2 = Di(Ja.getDefaults(), arguments, ["pitch"]);
            this._frequency = new Do({context: this.context}), this._delayA = new Fo({maxDelay: 1, context: this.context}), this._lfoA = new yr({context: this.context, min: 0, max: 0.1, type: "sawtooth"}).connect(this._delayA.delayTime), this._delayB = new Fo({maxDelay: 1, context: this.context}), this._lfoB = new yr({context: this.context, min: 0, max: 0.1, type: "sawtooth", phase: 180}).connect(this._delayB.delayTime), this._crossFade = new ba({context: this.context}), this._crossFadeLFO = new yr({context: this.context, min: 0, max: 1, type: "triangle", phase: 90}).connect(this._crossFade.fade), this._feedbackDelay = new Fo({delayTime: t2.delayTime, context: this.context}), this.delayTime = this._feedbackDelay.delayTime, Ui(this, "delayTime"), this._pitch = t2.pitch, this._windowSize = t2.windowSize, this._delayA.connect(this._crossFade.a), this._delayB.connect(this._crossFade.b), this._frequency.fan(this._lfoA.frequency, this._lfoB.frequency, this._crossFadeLFO.frequency), this.effectSend.fan(this._delayA, this._delayB), this._crossFade.chain(this._feedbackDelay, this.effectReturn);
            const e2 = this.now();
            this._lfoA.start(e2), this._lfoB.start(e2), this._crossFadeLFO.start(e2), this.windowSize = this._windowSize;
          }
          static getDefaults() {
            return Object.assign(ja.getDefaults(), {pitch: 0, windowSize: 0.1, delayTime: 0, feedback: 0});
          }
          get pitch() {
            return this._pitch;
          }
          set pitch(t2) {
            this._pitch = t2;
            let e2 = 0;
            t2 < 0 ? (this._lfoA.min = 0, this._lfoA.max = this._windowSize, this._lfoB.min = 0, this._lfoB.max = this._windowSize, e2 = no(t2 - 1) + 1) : (this._lfoA.min = this._windowSize, this._lfoA.max = 0, this._lfoB.min = this._windowSize, this._lfoB.max = 0, e2 = no(t2) - 1), this._frequency.value = e2 * (1.2 / this._windowSize);
          }
          get windowSize() {
            return this._windowSize;
          }
          set windowSize(t2) {
            this._windowSize = this.toSeconds(t2), this.pitch = this._pitch;
          }
          dispose() {
            return super.dispose(), this._frequency.dispose(), this._delayA.dispose(), this._delayB.dispose(), this._lfoA.dispose(), this._lfoB.dispose(), this._crossFade.dispose(), this._crossFadeLFO.dispose(), this._feedbackDelay.dispose(), this;
          }
        }
        class Ka extends Ia {
          constructor() {
            super(Di(Ka.getDefaults(), arguments, ["frequency", "octaves", "baseFrequency"])), this.name = "Phaser";
            const t2 = Di(Ka.getDefaults(), arguments, ["frequency", "octaves", "baseFrequency"]);
            this._lfoL = new yr({context: this.context, frequency: t2.frequency, min: 0, max: 1}), this._lfoR = new yr({context: this.context, frequency: t2.frequency, min: 0, max: 1, phase: 180}), this._baseFrequency = this.toFrequency(t2.baseFrequency), this._octaves = t2.octaves, this.Q = new Do({context: this.context, value: t2.Q, units: "positive"}), this._filtersL = this._makeFilters(t2.stages, this._lfoL), this._filtersR = this._makeFilters(t2.stages, this._lfoR), this.frequency = this._lfoL.frequency, this.frequency.value = t2.frequency, this.connectEffectLeft(...this._filtersL), this.connectEffectRight(...this._filtersR), this._lfoL.frequency.connect(this._lfoR.frequency), this.baseFrequency = t2.baseFrequency, this.octaves = t2.octaves, this._lfoL.start(), this._lfoR.start(), Ui(this, ["frequency", "Q"]);
          }
          static getDefaults() {
            return Object.assign(Ia.getDefaults(), {frequency: 0.5, octaves: 3, stages: 10, Q: 10, baseFrequency: 350});
          }
          _makeFilters(t2, e2) {
            const s2 = [];
            for (let n2 = 0; n2 < t2; n2++) {
              const t3 = this.context.createBiquadFilter();
              t3.type = "allpass", this.Q.connect(t3.Q), e2.connect(t3.frequency), s2.push(t3);
            }
            return s2;
          }
          get octaves() {
            return this._octaves;
          }
          set octaves(t2) {
            this._octaves = t2;
            const e2 = this._baseFrequency * Math.pow(2, t2);
            this._lfoL.max = e2, this._lfoR.max = e2;
          }
          get baseFrequency() {
            return this._baseFrequency;
          }
          set baseFrequency(t2) {
            this._baseFrequency = this.toFrequency(t2), this._lfoL.min = this._baseFrequency, this._lfoR.min = this._baseFrequency, this.octaves = this._octaves;
          }
          dispose() {
            return super.dispose(), this.Q.dispose(), this._lfoL.dispose(), this._lfoR.dispose(), this._filtersL.forEach((t2) => t2.disconnect()), this._filtersR.forEach((t2) => t2.disconnect()), this.frequency.dispose(), this;
          }
        }
        class tc extends Ta {
          constructor() {
            super(Di(tc.getDefaults(), arguments, ["decay"])), this.name = "Reverb", this._convolver = this.context.createConvolver(), this.ready = Promise.resolve();
            const t2 = Di(tc.getDefaults(), arguments, ["decay"]);
            this._decay = t2.decay, this._preDelay = t2.preDelay, this.generate(), this.connectEffect(this._convolver);
          }
          static getDefaults() {
            return Object.assign(Ta.getDefaults(), {decay: 1.5, preDelay: 0.01});
          }
          get decay() {
            return this._decay;
          }
          set decay(t2) {
            ei(t2 = this.toSeconds(t2), 1e-3), this._decay = t2, this.generate();
          }
          get preDelay() {
            return this._preDelay;
          }
          set preDelay(t2) {
            ei(t2 = this.toSeconds(t2), 0), this._preDelay = t2, this.generate();
          }
          generate() {
            return yi(this, void 0, void 0, function* () {
              const t2 = this.ready, e2 = new Yi(2, this._decay + this._preDelay, this.context.sampleRate), s2 = new Jo({context: e2}), n2 = new Jo({context: e2}), i2 = new Fa({context: e2});
              s2.connect(i2, 0, 0), n2.connect(i2, 0, 1);
              const o2 = new ko({context: e2}).toDestination();
              i2.connect(o2), s2.start(0), n2.start(0), o2.gain.setValueAtTime(0, 0), o2.gain.setValueAtTime(1, this._preDelay), o2.gain.exponentialApproachValueAtTime(0, this._preDelay, this.decay);
              const r2 = e2.render();
              return this.ready = r2.then(Zi), yield t2, this._convolver.buffer = (yield r2).get(), this;
            });
          }
          dispose() {
            return super.dispose(), this._convolver.disconnect(), this;
          }
        }
        class ec extends wo {
          constructor() {
            super(Di(ec.getDefaults(), arguments)), this.name = "MidSideSplit", this._split = this.input = new qa({channels: 2, context: this.context}), this._midAdd = new mr({context: this.context}), this.mid = new cr({context: this.context, value: Math.SQRT1_2}), this._sideSubtract = new Dr({context: this.context}), this.side = new cr({context: this.context, value: Math.SQRT1_2}), this._split.connect(this._midAdd, 0), this._split.connect(this._midAdd.addend, 1), this._split.connect(this._sideSubtract, 0), this._split.connect(this._sideSubtract.subtrahend, 1), this._midAdd.connect(this.mid), this._sideSubtract.connect(this.side);
          }
          dispose() {
            return super.dispose(), this.mid.dispose(), this.side.dispose(), this._midAdd.dispose(), this._sideSubtract.dispose(), this._split.dispose(), this;
          }
        }
        class sc extends wo {
          constructor() {
            super(Di(sc.getDefaults(), arguments)), this.name = "MidSideMerge", this.mid = new ko({context: this.context}), this.side = new ko({context: this.context}), this._left = new mr({context: this.context}), this._leftMult = new cr({context: this.context, value: Math.SQRT1_2}), this._right = new Dr({context: this.context}), this._rightMult = new cr({context: this.context, value: Math.SQRT1_2}), this._merge = this.output = new Fa({context: this.context}), this.mid.fan(this._left), this.side.connect(this._left.addend), this.mid.connect(this._right), this.side.connect(this._right.subtrahend), this._left.connect(this._leftMult), this._right.connect(this._rightMult), this._leftMult.connect(this._merge, 0, 0), this._rightMult.connect(this._merge, 0, 1);
          }
          dispose() {
            return super.dispose(), this.mid.dispose(), this.side.dispose(), this._leftMult.dispose(), this._rightMult.dispose(), this._left.dispose(), this._right.dispose(), this;
          }
        }
        class nc extends Ta {
          constructor(t2) {
            super(t2), this.name = "MidSideEffect", this._midSideMerge = new sc({context: this.context}), this._midSideSplit = new ec({context: this.context}), this._midSend = this._midSideSplit.mid, this._sideSend = this._midSideSplit.side, this._midReturn = this._midSideMerge.mid, this._sideReturn = this._midSideMerge.side, this.effectSend.connect(this._midSideSplit), this._midSideMerge.connect(this.effectReturn);
          }
          connectEffectMid(...t2) {
            this._midSend.chain(...t2, this._midReturn);
          }
          connectEffectSide(...t2) {
            this._sideSend.chain(...t2, this._sideReturn);
          }
          dispose() {
            return super.dispose(), this._midSideSplit.dispose(), this._midSideMerge.dispose(), this._midSend.dispose(), this._sideSend.dispose(), this._midReturn.dispose(), this._sideReturn.dispose(), this;
          }
        }
        class ic extends nc {
          constructor() {
            super(Di(ic.getDefaults(), arguments, ["width"])), this.name = "StereoWidener";
            const t2 = Di(ic.getDefaults(), arguments, ["width"]);
            this.width = new Do({context: this.context, value: t2.width, units: "normalRange"}), Ui(this, ["width"]), this._twoTimesWidthMid = new cr({context: this.context, value: 2}), this._twoTimesWidthSide = new cr({context: this.context, value: 2}), this._midMult = new cr({context: this.context}), this._twoTimesWidthMid.connect(this._midMult.factor), this.connectEffectMid(this._midMult), this._oneMinusWidth = new Dr({context: this.context}), this._oneMinusWidth.connect(this._twoTimesWidthMid), To(this.context.getConstant(1), this._oneMinusWidth), this.width.connect(this._oneMinusWidth.subtrahend), this._sideMult = new cr({context: this.context}), this.width.connect(this._twoTimesWidthSide), this._twoTimesWidthSide.connect(this._sideMult.factor), this.connectEffectSide(this._sideMult);
          }
          static getDefaults() {
            return Object.assign(nc.getDefaults(), {width: 0.5});
          }
          dispose() {
            return super.dispose(), this.width.dispose(), this._midMult.dispose(), this._sideMult.dispose(), this._twoTimesWidthMid.dispose(), this._twoTimesWidthSide.dispose(), this._oneMinusWidth.dispose(), this;
          }
        }
        class oc extends Ia {
          constructor() {
            super(Di(oc.getDefaults(), arguments, ["frequency", "depth"])), this.name = "Tremolo";
            const t2 = Di(oc.getDefaults(), arguments, ["frequency", "depth"]);
            this._lfoL = new yr({context: this.context, type: t2.type, min: 1, max: 0}), this._lfoR = new yr({context: this.context, type: t2.type, min: 1, max: 0}), this._amplitudeL = new ko({context: this.context}), this._amplitudeR = new ko({context: this.context}), this.frequency = new Do({context: this.context, value: t2.frequency, units: "frequency"}), this.depth = new Do({context: this.context, value: t2.depth, units: "normalRange"}), Ui(this, ["frequency", "depth"]), this.connectEffectLeft(this._amplitudeL), this.connectEffectRight(this._amplitudeR), this._lfoL.connect(this._amplitudeL.gain), this._lfoR.connect(this._amplitudeR.gain), this.frequency.fan(this._lfoL.frequency, this._lfoR.frequency), this.depth.fan(this._lfoR.amplitude, this._lfoL.amplitude), this.spread = t2.spread;
          }
          static getDefaults() {
            return Object.assign(Ia.getDefaults(), {frequency: 10, type: "sine", depth: 0.5, spread: 180});
          }
          start(t2) {
            return this._lfoL.start(t2), this._lfoR.start(t2), this;
          }
          stop(t2) {
            return this._lfoL.stop(t2), this._lfoR.stop(t2), this;
          }
          sync() {
            return this._lfoL.sync(), this._lfoR.sync(), this.context.transport.syncSignal(this.frequency), this;
          }
          unsync() {
            return this._lfoL.unsync(), this._lfoR.unsync(), this.context.transport.unsyncSignal(this.frequency), this;
          }
          get type() {
            return this._lfoL.type;
          }
          set type(t2) {
            this._lfoL.type = t2, this._lfoR.type = t2;
          }
          get spread() {
            return this._lfoR.phase - this._lfoL.phase;
          }
          set spread(t2) {
            this._lfoL.phase = 90 - t2 / 2, this._lfoR.phase = t2 / 2 + 90;
          }
          dispose() {
            return super.dispose(), this._lfoL.dispose(), this._lfoR.dispose(), this._amplitudeL.dispose(), this._amplitudeR.dispose(), this.frequency.dispose(), this.depth.dispose(), this;
          }
        }
        class rc extends Ta {
          constructor() {
            super(Di(rc.getDefaults(), arguments, ["frequency", "depth"])), this.name = "Vibrato";
            const t2 = Di(rc.getDefaults(), arguments, ["frequency", "depth"]);
            this._delayNode = new Fo({context: this.context, delayTime: 0, maxDelay: t2.maxDelay}), this._lfo = new yr({context: this.context, type: t2.type, min: 0, max: t2.maxDelay, frequency: t2.frequency, phase: -90}).start().connect(this._delayNode.delayTime), this.frequency = this._lfo.frequency, this.depth = this._lfo.amplitude, this.depth.value = t2.depth, Ui(this, ["frequency", "depth"]), this.effectSend.chain(this._delayNode, this.effectReturn);
          }
          static getDefaults() {
            return Object.assign(Ta.getDefaults(), {maxDelay: 5e-3, frequency: 5, depth: 0.1, type: "sine"});
          }
          get type() {
            return this._lfo.type;
          }
          set type(t2) {
            this._lfo.type = t2;
          }
          dispose() {
            return super.dispose(), this._delayNode.dispose(), this._lfo.dispose(), this.frequency.dispose(), this.depth.dispose(), this;
          }
        }
        class ac extends wo {
          constructor() {
            super(Di(ac.getDefaults(), arguments, ["type", "size"])), this.name = "Analyser", this._analysers = [], this._buffers = [];
            const t2 = Di(ac.getDefaults(), arguments, ["type", "size"]);
            this.input = this.output = this._gain = new ko({context: this.context}), this._split = new qa({context: this.context, channels: t2.channels}), this.input.connect(this._split), ei(t2.channels, 1);
            for (let e2 = 0; e2 < t2.channels; e2++)
              this._analysers[e2] = this.context.createAnalyser(), this._split.connect(this._analysers[e2], e2, 0);
            this.size = t2.size, this.type = t2.type;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {size: 1024, smoothing: 0.8, type: "fft", channels: 1});
          }
          getValue() {
            return this._analysers.forEach((t2, e2) => {
              const s2 = this._buffers[e2];
              this._type === "fft" ? t2.getFloatFrequencyData(s2) : this._type === "waveform" && t2.getFloatTimeDomainData(s2);
            }), this.channels === 1 ? this._buffers[0] : this._buffers;
          }
          get size() {
            return this._analysers[0].frequencyBinCount;
          }
          set size(t2) {
            this._analysers.forEach((e2, s2) => {
              e2.fftSize = 2 * t2, this._buffers[s2] = new Float32Array(t2);
            });
          }
          get channels() {
            return this._analysers.length;
          }
          get type() {
            return this._type;
          }
          set type(t2) {
            ti(t2 === "waveform" || t2 === "fft", "Analyser: invalid type: " + t2), this._type = t2;
          }
          get smoothing() {
            return this._analysers[0].smoothingTimeConstant;
          }
          set smoothing(t2) {
            this._analysers.forEach((e2) => e2.smoothingTimeConstant = t2);
          }
          dispose() {
            return super.dispose(), this._analysers.forEach((t2) => t2.disconnect()), this._split.dispose(), this._gain.dispose(), this;
          }
        }
        class cc extends wo {
          constructor() {
            super(Di(cc.getDefaults(), arguments)), this.name = "MeterBase", this.input = this.output = this._analyser = new ac({context: this.context, size: 256, type: "waveform"});
          }
          dispose() {
            return super.dispose(), this._analyser.dispose(), this;
          }
        }
        class hc extends cc {
          constructor() {
            super(Di(hc.getDefaults(), arguments, ["smoothing"])), this.name = "Meter", this._rms = 0;
            const t2 = Di(hc.getDefaults(), arguments, ["smoothing"]);
            this.input = this.output = this._analyser = new ac({context: this.context, size: 256, type: "waveform", channels: t2.channels}), this.smoothing = t2.smoothing, this.normalRange = t2.normalRange;
          }
          static getDefaults() {
            return Object.assign(cc.getDefaults(), {smoothing: 0.8, normalRange: false, channels: 1});
          }
          getLevel() {
            return ri("'getLevel' has been changed to 'getValue'"), this.getValue();
          }
          getValue() {
            const t2 = this._analyser.getValue(), e2 = (this.channels === 1 ? [t2] : t2).map((t3) => {
              const e3 = t3.reduce((t4, e4) => t4 + e4 * e4, 0), s2 = Math.sqrt(e3 / t3.length);
              return this._rms = Math.max(s2, this._rms * this.smoothing), this.normalRange ? this._rms : so(this._rms);
            });
            return this.channels === 1 ? e2[0] : e2;
          }
          get channels() {
            return this._analyser.channels;
          }
          dispose() {
            return super.dispose(), this._analyser.dispose(), this;
          }
        }
        class uc extends cc {
          constructor() {
            super(Di(uc.getDefaults(), arguments, ["size"])), this.name = "FFT";
            const t2 = Di(uc.getDefaults(), arguments, ["size"]);
            this.normalRange = t2.normalRange, this._analyser.type = "fft", this.size = t2.size;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {normalRange: false, size: 1024, smoothing: 0.8});
          }
          getValue() {
            return this._analyser.getValue().map((t2) => this.normalRange ? eo(t2) : t2);
          }
          get size() {
            return this._analyser.size;
          }
          set size(t2) {
            this._analyser.size = t2;
          }
          get smoothing() {
            return this._analyser.smoothing;
          }
          set smoothing(t2) {
            this._analyser.smoothing = t2;
          }
          getFrequencyOfIndex(t2) {
            return ti(0 <= t2 && t2 < this.size, "index must be greater than or equal to 0 and less than " + this.size), t2 * this.context.sampleRate / (2 * this.size);
          }
        }
        class lc extends cc {
          constructor() {
            super(Di(lc.getDefaults(), arguments)), this.name = "DCMeter", this._analyser.type = "waveform", this._analyser.size = 256;
          }
          getValue() {
            return this._analyser.getValue()[0];
          }
        }
        class pc extends cc {
          constructor() {
            super(Di(pc.getDefaults(), arguments, ["size"])), this.name = "Waveform";
            const t2 = Di(pc.getDefaults(), arguments, ["size"]);
            this._analyser.type = "waveform", this.size = t2.size;
          }
          static getDefaults() {
            return Object.assign(cc.getDefaults(), {size: 1024});
          }
          getValue() {
            return this._analyser.getValue();
          }
          get size() {
            return this._analyser.size;
          }
          set size(t2) {
            this._analyser.size = t2;
          }
        }
        class dc extends wo {
          constructor() {
            super(Di(dc.getDefaults(), arguments, ["solo"])), this.name = "Solo";
            const t2 = Di(dc.getDefaults(), arguments, ["solo"]);
            this.input = this.output = new ko({context: this.context}), dc._allSolos.has(this.context) || dc._allSolos.set(this.context, new Set()), dc._allSolos.get(this.context).add(this), this.solo = t2.solo;
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {solo: false});
          }
          get solo() {
            return this._isSoloed();
          }
          set solo(t2) {
            t2 ? this._addSolo() : this._removeSolo(), dc._allSolos.get(this.context).forEach((t3) => t3._updateSolo());
          }
          get muted() {
            return this.input.gain.value === 0;
          }
          _addSolo() {
            dc._soloed.has(this.context) || dc._soloed.set(this.context, new Set()), dc._soloed.get(this.context).add(this);
          }
          _removeSolo() {
            dc._soloed.has(this.context) && dc._soloed.get(this.context).delete(this);
          }
          _isSoloed() {
            return dc._soloed.has(this.context) && dc._soloed.get(this.context).has(this);
          }
          _noSolos() {
            return !dc._soloed.has(this.context) || dc._soloed.has(this.context) && dc._soloed.get(this.context).size === 0;
          }
          _updateSolo() {
            this._isSoloed() || this._noSolos() ? this.input.gain.value = 1 : this.input.gain.value = 0;
          }
          dispose() {
            return super.dispose(), dc._allSolos.get(this.context).delete(this), this._removeSolo(), this;
          }
        }
        dc._allSolos = new Map(), dc._soloed = new Map();
        class fc extends wo {
          constructor() {
            super(Di(fc.getDefaults(), arguments, ["pan", "volume"])), this.name = "PanVol";
            const t2 = Di(fc.getDefaults(), arguments, ["pan", "volume"]);
            this._panner = this.input = new Ca({context: this.context, pan: t2.pan, channelCount: t2.channelCount}), this.pan = this._panner.pan, this._volume = this.output = new Go({context: this.context, volume: t2.volume}), this.volume = this._volume.volume, this._panner.connect(this._volume), this.mute = t2.mute, Ui(this, ["pan", "volume"]);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {mute: false, pan: 0, volume: 0, channelCount: 1});
          }
          get mute() {
            return this._volume.mute;
          }
          set mute(t2) {
            this._volume.mute = t2;
          }
          dispose() {
            return super.dispose(), this._panner.dispose(), this.pan.dispose(), this._volume.dispose(), this.volume.dispose(), this;
          }
        }
        class _c extends wo {
          constructor() {
            super(Di(_c.getDefaults(), arguments, ["volume", "pan"])), this.name = "Channel";
            const t2 = Di(_c.getDefaults(), arguments, ["volume", "pan"]);
            this._solo = this.input = new dc({solo: t2.solo, context: this.context}), this._panVol = this.output = new fc({context: this.context, pan: t2.pan, volume: t2.volume, mute: t2.mute, channelCount: t2.channelCount}), this.pan = this._panVol.pan, this.volume = this._panVol.volume, this._solo.connect(this._panVol), Ui(this, ["pan", "volume"]);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {pan: 0, volume: 0, mute: false, solo: false, channelCount: 1});
          }
          get solo() {
            return this._solo.solo;
          }
          set solo(t2) {
            this._solo.solo = t2;
          }
          get muted() {
            return this._solo.muted || this.mute;
          }
          get mute() {
            return this._panVol.mute;
          }
          set mute(t2) {
            this._panVol.mute = t2;
          }
          _getBus(t2) {
            return _c.buses.has(t2) || _c.buses.set(t2, new ko({context: this.context})), _c.buses.get(t2);
          }
          send(t2, e2 = 0) {
            const s2 = this._getBus(t2), n2 = new ko({context: this.context, units: "decibels", gain: e2});
            return this.connect(n2), n2.connect(s2), n2;
          }
          receive(t2) {
            return this._getBus(t2).connect(this), this;
          }
          dispose() {
            return super.dispose(), this._panVol.dispose(), this.pan.dispose(), this.volume.dispose(), this._solo.dispose(), this;
          }
        }
        _c.buses = new Map();
        class mc extends wo {
          constructor() {
            super(Di(mc.getDefaults(), arguments)), this.name = "Mono", this.input = new ko({context: this.context}), this._merge = this.output = new Fa({channels: 2, context: this.context}), this.input.connect(this._merge, 0, 0), this.input.connect(this._merge, 0, 1);
          }
          dispose() {
            return super.dispose(), this._merge.dispose(), this.input.dispose(), this;
          }
        }
        class gc extends wo {
          constructor() {
            super(Di(gc.getDefaults(), arguments, ["lowFrequency", "highFrequency"])), this.name = "MultibandSplit", this.input = new ko({context: this.context}), this.output = void 0, this.low = new Wr({context: this.context, frequency: 0, type: "lowpass"}), this._lowMidFilter = new Wr({context: this.context, frequency: 0, type: "highpass"}), this.mid = new Wr({context: this.context, frequency: 0, type: "lowpass"}), this.high = new Wr({context: this.context, frequency: 0, type: "highpass"}), this._internalChannels = [this.low, this.mid, this.high];
            const t2 = Di(gc.getDefaults(), arguments, ["lowFrequency", "highFrequency"]);
            this.lowFrequency = new Do({context: this.context, units: "frequency", value: t2.lowFrequency}), this.highFrequency = new Do({context: this.context, units: "frequency", value: t2.highFrequency}), this.Q = new Do({context: this.context, units: "positive", value: t2.Q}), this.input.fan(this.low, this.high), this.input.chain(this._lowMidFilter, this.mid), this.lowFrequency.fan(this.low.frequency, this._lowMidFilter.frequency), this.highFrequency.fan(this.mid.frequency, this.high.frequency), this.Q.connect(this.low.Q), this.Q.connect(this._lowMidFilter.Q), this.Q.connect(this.mid.Q), this.Q.connect(this.high.Q), Ui(this, ["high", "mid", "low", "highFrequency", "lowFrequency"]);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {Q: 1, highFrequency: 2500, lowFrequency: 400});
          }
          dispose() {
            return super.dispose(), Qi(this, ["high", "mid", "low", "highFrequency", "lowFrequency"]), this.low.dispose(), this._lowMidFilter.dispose(), this.mid.dispose(), this.high.dispose(), this.lowFrequency.dispose(), this.highFrequency.dispose(), this.Q.dispose(), this;
          }
        }
        class vc extends wo {
          constructor() {
            super(...arguments), this.name = "Listener", this.positionX = new xo({context: this.context, param: this.context.rawContext.listener.positionX}), this.positionY = new xo({context: this.context, param: this.context.rawContext.listener.positionY}), this.positionZ = new xo({context: this.context, param: this.context.rawContext.listener.positionZ}), this.forwardX = new xo({context: this.context, param: this.context.rawContext.listener.forwardX}), this.forwardY = new xo({context: this.context, param: this.context.rawContext.listener.forwardY}), this.forwardZ = new xo({context: this.context, param: this.context.rawContext.listener.forwardZ}), this.upX = new xo({context: this.context, param: this.context.rawContext.listener.upX}), this.upY = new xo({context: this.context, param: this.context.rawContext.listener.upY}), this.upZ = new xo({context: this.context, param: this.context.rawContext.listener.upZ});
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {positionX: 0, positionY: 0, positionZ: 0, forwardX: 0, forwardY: 0, forwardZ: -1, upX: 0, upY: 1, upZ: 0});
          }
          dispose() {
            return super.dispose(), this.positionX.dispose(), this.positionY.dispose(), this.positionZ.dispose(), this.forwardX.dispose(), this.forwardY.dispose(), this.forwardZ.dispose(), this.upX.dispose(), this.upY.dispose(), this.upZ.dispose(), this;
          }
        }
        ji((t2) => {
          t2.listener = new vc({context: t2});
        }), zi((t2) => {
          t2.listener.dispose();
        });
        class yc extends wo {
          constructor() {
            super(Di(yc.getDefaults(), arguments, ["positionX", "positionY", "positionZ"])), this.name = "Panner3D";
            const t2 = Di(yc.getDefaults(), arguments, ["positionX", "positionY", "positionZ"]);
            this._panner = this.input = this.output = this.context.createPanner(), this.panningModel = t2.panningModel, this.maxDistance = t2.maxDistance, this.distanceModel = t2.distanceModel, this.coneOuterGain = t2.coneOuterGain, this.coneOuterAngle = t2.coneOuterAngle, this.coneInnerAngle = t2.coneInnerAngle, this.refDistance = t2.refDistance, this.rolloffFactor = t2.rolloffFactor, this.positionX = new xo({context: this.context, param: this._panner.positionX, value: t2.positionX}), this.positionY = new xo({context: this.context, param: this._panner.positionY, value: t2.positionY}), this.positionZ = new xo({context: this.context, param: this._panner.positionZ, value: t2.positionZ}), this.orientationX = new xo({context: this.context, param: this._panner.orientationX, value: t2.orientationX}), this.orientationY = new xo({context: this.context, param: this._panner.orientationY, value: t2.orientationY}), this.orientationZ = new xo({context: this.context, param: this._panner.orientationZ, value: t2.orientationZ});
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {coneInnerAngle: 360, coneOuterAngle: 360, coneOuterGain: 0, distanceModel: "inverse", maxDistance: 1e4, orientationX: 0, orientationY: 0, orientationZ: 0, panningModel: "equalpower", positionX: 0, positionY: 0, positionZ: 0, refDistance: 1, rolloffFactor: 1});
          }
          setPosition(t2, e2, s2) {
            return this.positionX.value = t2, this.positionY.value = e2, this.positionZ.value = s2, this;
          }
          setOrientation(t2, e2, s2) {
            return this.orientationX.value = t2, this.orientationY.value = e2, this.orientationZ.value = s2, this;
          }
          get panningModel() {
            return this._panner.panningModel;
          }
          set panningModel(t2) {
            this._panner.panningModel = t2;
          }
          get refDistance() {
            return this._panner.refDistance;
          }
          set refDistance(t2) {
            this._panner.refDistance = t2;
          }
          get rolloffFactor() {
            return this._panner.rolloffFactor;
          }
          set rolloffFactor(t2) {
            this._panner.rolloffFactor = t2;
          }
          get distanceModel() {
            return this._panner.distanceModel;
          }
          set distanceModel(t2) {
            this._panner.distanceModel = t2;
          }
          get coneInnerAngle() {
            return this._panner.coneInnerAngle;
          }
          set coneInnerAngle(t2) {
            this._panner.coneInnerAngle = t2;
          }
          get coneOuterAngle() {
            return this._panner.coneOuterAngle;
          }
          set coneOuterAngle(t2) {
            this._panner.coneOuterAngle = t2;
          }
          get coneOuterGain() {
            return this._panner.coneOuterGain;
          }
          set coneOuterGain(t2) {
            this._panner.coneOuterGain = t2;
          }
          get maxDistance() {
            return this._panner.maxDistance;
          }
          set maxDistance(t2) {
            this._panner.maxDistance = t2;
          }
          dispose() {
            return super.dispose(), this._panner.disconnect(), this.orientationX.dispose(), this.orientationY.dispose(), this.orientationZ.dispose(), this.positionX.dispose(), this.positionY.dispose(), this.positionZ.dispose(), this;
          }
        }
        class xc extends wo {
          constructor() {
            super(Di(xc.getDefaults(), arguments)), this.name = "Recorder";
            const t2 = Di(xc.getDefaults(), arguments);
            this.input = new ko({context: this.context}), ti(xc.supported, "Media Recorder API is not available"), this._stream = this.context.createMediaStreamDestination(), this.input.connect(this._stream), this._recorder = new MediaRecorder(this._stream.stream, {mimeType: t2.mimeType});
          }
          static getDefaults() {
            return wo.getDefaults();
          }
          get mimeType() {
            return this._recorder.mimeType;
          }
          static get supported() {
            return mi !== null && Reflect.has(mi, "MediaRecorder");
          }
          get state() {
            return this._recorder.state === "inactive" ? "stopped" : this._recorder.state === "paused" ? "paused" : "started";
          }
          start() {
            return yi(this, void 0, void 0, function* () {
              ti(this.state !== "started", "Recorder is already started");
              const t2 = new Promise((t3) => {
                const e2 = () => {
                  this._recorder.removeEventListener("start", e2, false), t3();
                };
                this._recorder.addEventListener("start", e2, false);
              });
              return this._recorder.start(), yield t2;
            });
          }
          stop() {
            return yi(this, void 0, void 0, function* () {
              ti(this.state !== "stopped", "Recorder is not started");
              const t2 = new Promise((t3) => {
                const e2 = (s2) => {
                  this._recorder.removeEventListener("dataavailable", e2, false), t3(s2.data);
                };
                this._recorder.addEventListener("dataavailable", e2, false);
              });
              return this._recorder.stop(), yield t2;
            });
          }
          pause() {
            return ti(this.state === "started", "Recorder must be started"), this._recorder.pause(), this;
          }
          dispose() {
            return super.dispose(), this.input.dispose(), this._stream.disconnect(), this;
          }
        }
        class wc extends wo {
          constructor() {
            super(Di(wc.getDefaults(), arguments, ["threshold", "ratio"])), this.name = "Compressor", this._compressor = this.context.createDynamicsCompressor(), this.input = this._compressor, this.output = this._compressor;
            const t2 = Di(wc.getDefaults(), arguments, ["threshold", "ratio"]);
            this.threshold = new xo({minValue: this._compressor.threshold.minValue, maxValue: this._compressor.threshold.maxValue, context: this.context, convert: false, param: this._compressor.threshold, units: "decibels", value: t2.threshold}), this.attack = new xo({minValue: this._compressor.attack.minValue, maxValue: this._compressor.attack.maxValue, context: this.context, param: this._compressor.attack, units: "time", value: t2.attack}), this.release = new xo({minValue: this._compressor.release.minValue, maxValue: this._compressor.release.maxValue, context: this.context, param: this._compressor.release, units: "time", value: t2.release}), this.knee = new xo({minValue: this._compressor.knee.minValue, maxValue: this._compressor.knee.maxValue, context: this.context, convert: false, param: this._compressor.knee, units: "decibels", value: t2.knee}), this.ratio = new xo({minValue: this._compressor.ratio.minValue, maxValue: this._compressor.ratio.maxValue, context: this.context, convert: false, param: this._compressor.ratio, units: "positive", value: t2.ratio}), Ui(this, ["knee", "release", "attack", "ratio", "threshold"]);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {attack: 3e-3, knee: 30, ratio: 12, release: 0.25, threshold: -24});
          }
          get reduction() {
            return this._compressor.reduction;
          }
          dispose() {
            return super.dispose(), this._compressor.disconnect(), this.attack.dispose(), this.release.dispose(), this.threshold.dispose(), this.ratio.dispose(), this.knee.dispose(), this;
          }
        }
        class bc extends wo {
          constructor() {
            super(Object.assign(Di(bc.getDefaults(), arguments, ["threshold", "smoothing"]))), this.name = "Gate";
            const t2 = Di(bc.getDefaults(), arguments, ["threshold", "smoothing"]);
            this._follower = new Da({context: this.context, smoothing: t2.smoothing}), this._gt = new Mr({context: this.context, value: eo(t2.threshold)}), this.input = new ko({context: this.context}), this._gate = this.output = new ko({context: this.context}), this.input.connect(this._gate), this.input.chain(this._follower, this._gt, this._gate.gain);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {smoothing: 0.1, threshold: -40});
          }
          get threshold() {
            return so(this._gt.value);
          }
          set threshold(t2) {
            this._gt.value = eo(t2);
          }
          get smoothing() {
            return this._follower.smoothing;
          }
          set smoothing(t2) {
            this._follower.smoothing = t2;
          }
          dispose() {
            return super.dispose(), this.input.dispose(), this._follower.dispose(), this._gt.dispose(), this._gate.dispose(), this;
          }
        }
        class Tc extends wo {
          constructor() {
            super(Object.assign(Di(Tc.getDefaults(), arguments, ["threshold"]))), this.name = "Limiter";
            const t2 = Di(Tc.getDefaults(), arguments, ["threshold"]);
            this._compressor = this.input = this.output = new wc({context: this.context, ratio: 20, attack: 3e-3, release: 0.01, threshold: t2.threshold}), this.threshold = this._compressor.threshold, Ui(this, "threshold");
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {threshold: -12});
          }
          get reduction() {
            return this._compressor.reduction;
          }
          dispose() {
            return super.dispose(), this._compressor.dispose(), this.threshold.dispose(), this;
          }
        }
        class Sc extends wo {
          constructor() {
            super(Object.assign(Di(Sc.getDefaults(), arguments))), this.name = "MidSideCompressor";
            const t2 = Di(Sc.getDefaults(), arguments);
            this._midSideSplit = this.input = new ec({context: this.context}), this._midSideMerge = this.output = new sc({context: this.context}), this.mid = new wc(Object.assign(t2.mid, {context: this.context})), this.side = new wc(Object.assign(t2.side, {context: this.context})), this._midSideSplit.mid.chain(this.mid, this._midSideMerge.mid), this._midSideSplit.side.chain(this.side, this._midSideMerge.side), Ui(this, ["mid", "side"]);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {mid: {ratio: 3, threshold: -24, release: 0.03, attack: 0.02, knee: 16}, side: {ratio: 6, threshold: -30, release: 0.25, attack: 0.03, knee: 10}});
          }
          dispose() {
            return super.dispose(), this.mid.dispose(), this.side.dispose(), this._midSideSplit.dispose(), this._midSideMerge.dispose(), this;
          }
        }
        class kc extends wo {
          constructor() {
            super(Object.assign(Di(kc.getDefaults(), arguments))), this.name = "MultibandCompressor";
            const t2 = Di(kc.getDefaults(), arguments);
            this._splitter = this.input = new gc({context: this.context, lowFrequency: t2.lowFrequency, highFrequency: t2.highFrequency}), this.lowFrequency = this._splitter.lowFrequency, this.highFrequency = this._splitter.highFrequency, this.output = new ko({context: this.context}), this.low = new wc(Object.assign(t2.low, {context: this.context})), this.mid = new wc(Object.assign(t2.mid, {context: this.context})), this.high = new wc(Object.assign(t2.high, {context: this.context})), this._splitter.low.chain(this.low, this.output), this._splitter.mid.chain(this.mid, this.output), this._splitter.high.chain(this.high, this.output), Ui(this, ["high", "mid", "low", "highFrequency", "lowFrequency"]);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {lowFrequency: 250, highFrequency: 2e3, low: {ratio: 6, threshold: -30, release: 0.25, attack: 0.03, knee: 10}, mid: {ratio: 3, threshold: -24, release: 0.03, attack: 0.02, knee: 16}, high: {ratio: 3, threshold: -24, release: 0.03, attack: 0.02, knee: 16}});
          }
          dispose() {
            return super.dispose(), this._splitter.dispose(), this.low.dispose(), this.mid.dispose(), this.high.dispose(), this.output.dispose(), this;
          }
        }
        class Cc extends wo {
          constructor() {
            super(Di(Cc.getDefaults(), arguments, ["low", "mid", "high"])), this.name = "EQ3", this.output = new ko({context: this.context}), this._internalChannels = [];
            const t2 = Di(Cc.getDefaults(), arguments, ["low", "mid", "high"]);
            this.input = this._multibandSplit = new gc({context: this.context, highFrequency: t2.highFrequency, lowFrequency: t2.lowFrequency}), this._lowGain = new ko({context: this.context, gain: t2.low, units: "decibels"}), this._midGain = new ko({context: this.context, gain: t2.mid, units: "decibels"}), this._highGain = new ko({context: this.context, gain: t2.high, units: "decibels"}), this.low = this._lowGain.gain, this.mid = this._midGain.gain, this.high = this._highGain.gain, this.Q = this._multibandSplit.Q, this.lowFrequency = this._multibandSplit.lowFrequency, this.highFrequency = this._multibandSplit.highFrequency, this._multibandSplit.low.chain(this._lowGain, this.output), this._multibandSplit.mid.chain(this._midGain, this.output), this._multibandSplit.high.chain(this._highGain, this.output), Ui(this, ["low", "mid", "high", "lowFrequency", "highFrequency"]), this._internalChannels = [this._multibandSplit];
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {high: 0, highFrequency: 2500, low: 0, lowFrequency: 400, mid: 0});
          }
          dispose() {
            return super.dispose(), Qi(this, ["low", "mid", "high", "lowFrequency", "highFrequency"]), this._multibandSplit.dispose(), this.lowFrequency.dispose(), this.highFrequency.dispose(), this._lowGain.dispose(), this._midGain.dispose(), this._highGain.dispose(), this.low.dispose(), this.mid.dispose(), this.high.dispose(), this.Q.dispose(), this;
          }
        }
        class Ac extends wo {
          constructor() {
            super(Di(Ac.getDefaults(), arguments, ["url", "onload"])), this.name = "Convolver", this._convolver = this.context.createConvolver();
            const t2 = Di(Ac.getDefaults(), arguments, ["url", "onload"]);
            this._buffer = new Xi(t2.url, (e2) => {
              this.buffer = e2, t2.onload();
            }), this.input = new ko({context: this.context}), this.output = new ko({context: this.context}), this._buffer.loaded && (this.buffer = this._buffer), this.normalize = t2.normalize, this.input.chain(this._convolver, this.output);
          }
          static getDefaults() {
            return Object.assign(wo.getDefaults(), {normalize: true, onload: Zi});
          }
          load(t2) {
            return yi(this, void 0, void 0, function* () {
              this.buffer = yield this._buffer.load(t2);
            });
          }
          get buffer() {
            return this._buffer.length ? this._buffer : null;
          }
          set buffer(t2) {
            t2 && this._buffer.set(t2), this._convolver.buffer && (this.input.disconnect(), this._convolver.disconnect(), this._convolver = this.context.createConvolver(), this.input.chain(this._convolver, this.output));
            const e2 = this._buffer.get();
            this._convolver.buffer = e2 || null;
          }
          get normalize() {
            return this._convolver.normalize;
          }
          set normalize(t2) {
            this._convolver.normalize = t2;
          }
          dispose() {
            return super.dispose(), this._buffer.dispose(), this._convolver.disconnect(), this;
          }
        }
        function Dc() {
          return Ji().now();
        }
        function Oc() {
          return Ji().immediate();
        }
        const Mc = Ji().transport;
        function Ec() {
          return Ji().transport;
        }
        const Rc = Ji().destination, qc = Ji().destination;
        function Fc() {
          return Ji().destination;
        }
        const Ic = Ji().listener;
        function Vc() {
          return Ji().listener;
        }
        const Nc = Ji().draw;
        function Pc() {
          return Ji().draw;
        }
        const jc = Ji();
        function Lc() {
          return Xi.loaded();
        }
        const zc = Xi, Bc = Vo, Wc = $o;
      }]);
    });
  }
});

// src/index.ts
var import_tone = __toModule(require_Tone());
var synth = new import_tone.default.Synth().toDestination();
synth.triggerAttackRelease("C4", "8n");
/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2019 Yotam Mann
 */
