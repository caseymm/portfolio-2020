Object.freeze({
  initialize: function ({
    modulePath: t = '.',
    importFunctionName: e = '__import__',
  } = {}) {
    try {
      self[e] = new Function('u', 'return import(u)');
    } catch (o) {
      const n = new URL(t, location),
        i = (t) => {
          URL.revokeObjectURL(t.src), t.remove();
        };
      (self[e] = (t) =>
        new Promise((o, r) => {
          const s = new URL(t, n);
          if (self[e].moduleMap[s]) return o(self[e].moduleMap[s]);
          const c = new Blob(
              [`import * as m from '${s}';`, `${e}.moduleMap['${s}']=m;`],
              { type: 'text/javascript' }
            ),
            h = Object.assign(document.createElement('script'), {
              type: 'module',
              src: URL.createObjectURL(c),
              onerror() {
                r(new Error('Failed to import: ' + t)), i(h);
              },
              onload() {
                o(self[e].moduleMap[s]), i(h);
              },
            });
          document.head.appendChild(h);
        })),
        (self[e].moduleMap = {});
    }
  },
}).initialize({ modulePath: 'scripts/' }),
  (function () {
    if ('object' == typeof window)
      if (
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      )
        'isIntersecting' in window.IntersectionObserverEntry.prototype ||
          Object.defineProperty(
            window.IntersectionObserverEntry.prototype,
            'isIntersecting',
            {
              get: function () {
                return this.intersectionRatio > 0;
              },
            }
          );
      else {
        var t = window.document,
          e = [],
          o = null,
          n = null;
        (r.prototype.THROTTLE_TIMEOUT = 100),
          (r.prototype.POLL_INTERVAL = null),
          (r.prototype.USE_MUTATION_OBSERVER = !0),
          (r._setupCrossOriginUpdater = function () {
            return (
              o ||
                (o = function (t, o) {
                  (n =
                    t && o
                      ? a(t, o)
                      : {
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          width: 0,
                          height: 0,
                        }),
                    e.forEach(function (t) {
                      t._checkForIntersections();
                    });
                }),
              o
            );
          }),
          (r._resetCrossOriginUpdater = function () {
            (o = null), (n = null);
          }),
          (r.prototype.observe = function (t) {
            if (
              !this._observationTargets.some(function (e) {
                return e.element == t;
              })
            ) {
              if (!t || 1 != t.nodeType)
                throw new Error('target must be an Element');
              this._registerInstance(),
                this._observationTargets.push({ element: t, entry: null }),
                this._monitorIntersections(t.ownerDocument),
                this._checkForIntersections();
            }
          }),
          (r.prototype.unobserve = function (t) {
            (this._observationTargets = this._observationTargets.filter(
              function (e) {
                return e.element != t;
              }
            )),
              this._unmonitorIntersections(t.ownerDocument),
              0 == this._observationTargets.length &&
                this._unregisterInstance();
          }),
          (r.prototype.disconnect = function () {
            (this._observationTargets = []),
              this._unmonitorAllIntersections(),
              this._unregisterInstance();
          }),
          (r.prototype.takeRecords = function () {
            var t = this._queuedEntries.slice();
            return (this._queuedEntries = []), t;
          }),
          (r.prototype._initThresholds = function (t) {
            var e = t || [0];
            return (
              Array.isArray(e) || (e = [e]),
              e.sort().filter(function (t, e, o) {
                if ('number' != typeof t || isNaN(t) || t < 0 || t > 1)
                  throw new Error(
                    'threshold must be a number between 0 and 1 inclusively'
                  );
                return t !== o[e - 1];
              })
            );
          }),
          (r.prototype._parseRootMargin = function (t) {
            var e = (t || '0px').split(/\s+/).map(function (t) {
              var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
              if (!e)
                throw new Error(
                  'rootMargin must be specified in pixels or percent'
                );
              return { value: parseFloat(e[1]), unit: e[2] };
            });
            return (
              (e[1] = e[1] || e[0]),
              (e[2] = e[2] || e[0]),
              (e[3] = e[3] || e[1]),
              e
            );
          }),
          (r.prototype._monitorIntersections = function (e) {
            var o = e.defaultView;
            if (o && -1 == this._monitoringDocuments.indexOf(e)) {
              var n = this._checkForIntersections,
                i = null,
                r = null;
              if (
                (this.POLL_INTERVAL
                  ? (i = o.setInterval(n, this.POLL_INTERVAL))
                  : (s(o, 'resize', n, !0),
                    s(e, 'scroll', n, !0),
                    this.USE_MUTATION_OBSERVER &&
                      'MutationObserver' in o &&
                      (r = new o.MutationObserver(n)).observe(e, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0,
                      })),
                this._monitoringDocuments.push(e),
                this._monitoringUnsubscribes.push(function () {
                  var t = e.defaultView;
                  t && (i && t.clearInterval(i), c(t, 'resize', n, !0)),
                    c(e, 'scroll', n, !0),
                    r && r.disconnect();
                }),
                e != ((this.root && this.root.ownerDocument) || t))
              ) {
                var h = f(e);
                h && this._monitorIntersections(h.ownerDocument);
              }
            }
          }),
          (r.prototype._unmonitorIntersections = function (e) {
            var o = this._monitoringDocuments.indexOf(e);
            if (-1 != o) {
              var n = (this.root && this.root.ownerDocument) || t;
              if (
                !this._observationTargets.some(function (t) {
                  var o = t.element.ownerDocument;
                  if (o == e) return !0;
                  for (; o && o != n; ) {
                    var i = f(o);
                    if ((o = i && i.ownerDocument) == e) return !0;
                  }
                  return !1;
                })
              ) {
                var i = this._monitoringUnsubscribes[o];
                if (
                  (this._monitoringDocuments.splice(o, 1),
                  this._monitoringUnsubscribes.splice(o, 1),
                  i(),
                  e != n)
                ) {
                  var r = f(e);
                  r && this._unmonitorIntersections(r.ownerDocument);
                }
              }
            }
          }),
          (r.prototype._unmonitorAllIntersections = function () {
            var t = this._monitoringUnsubscribes.slice(0);
            (this._monitoringDocuments.length = 0),
              (this._monitoringUnsubscribes.length = 0);
            for (var e = 0; e < t.length; e++) t[e]();
          }),
          (r.prototype._checkForIntersections = function () {
            if (this.root || !o || n) {
              var t = this._rootIsInDom(),
                e = t
                  ? this._getRootRect()
                  : {
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      width: 0,
                      height: 0,
                    };
              this._observationTargets.forEach(function (n) {
                var r = n.element,
                  s = h(r),
                  c = this._rootContainsTarget(r),
                  u = n.entry,
                  a = t && c && this._computeTargetAndRootIntersection(r, s, e),
                  l = (n.entry = new i({
                    time:
                      window.performance &&
                      performance.now &&
                      performance.now(),
                    target: r,
                    boundingClientRect: s,
                    rootBounds: o && !this.root ? null : e,
                    intersectionRect: a,
                  }));
                u
                  ? t && c
                    ? this._hasCrossedThreshold(u, l) &&
                      this._queuedEntries.push(l)
                    : u && u.isIntersecting && this._queuedEntries.push(l)
                  : this._queuedEntries.push(l);
              }, this),
                this._queuedEntries.length &&
                  this._callback(this.takeRecords(), this);
            }
          }),
          (r.prototype._computeTargetAndRootIntersection = function (e, i, r) {
            if ('none' != window.getComputedStyle(e).display) {
              for (
                var s, c, u, l, f, p, m, g, v = i, b = d(e), w = !1;
                !w && b;

              ) {
                var _ = null,
                  y = 1 == b.nodeType ? window.getComputedStyle(b) : {};
                if ('none' == y.display) return null;
                if (b == this.root || 9 == b.nodeType)
                  if (((w = !0), b == this.root || b == t))
                    o && !this.root
                      ? !n || (0 == n.width && 0 == n.height)
                        ? ((b = null), (_ = null), (v = null))
                        : (_ = n)
                      : (_ = r);
                  else {
                    var I = d(b),
                      E = I && h(I),
                      R = I && this._computeTargetAndRootIntersection(I, E, r);
                    E && R
                      ? ((b = I), (_ = a(E, R)))
                      : ((b = null), (v = null));
                  }
                else {
                  var T = b.ownerDocument;
                  b != T.body &&
                    b != T.documentElement &&
                    'visible' != y.overflow &&
                    (_ = h(b));
                }
                if (
                  (_ &&
                    ((s = _),
                    (c = v),
                    (u = void 0),
                    (l = void 0),
                    (f = void 0),
                    (p = void 0),
                    (m = void 0),
                    (g = void 0),
                    (u = Math.max(s.top, c.top)),
                    (l = Math.min(s.bottom, c.bottom)),
                    (f = Math.max(s.left, c.left)),
                    (p = Math.min(s.right, c.right)),
                    (g = l - u),
                    (v =
                      ((m = p - f) >= 0 &&
                        g >= 0 && {
                          top: u,
                          bottom: l,
                          left: f,
                          right: p,
                          width: m,
                          height: g,
                        }) ||
                      null)),
                  !v)
                )
                  break;
                b = b && d(b);
              }
              return v;
            }
          }),
          (r.prototype._getRootRect = function () {
            var e;
            if (this.root) e = h(this.root);
            else {
              var o = t.documentElement,
                n = t.body;
              e = {
                top: 0,
                left: 0,
                right: o.clientWidth || n.clientWidth,
                width: o.clientWidth || n.clientWidth,
                bottom: o.clientHeight || n.clientHeight,
                height: o.clientHeight || n.clientHeight,
              };
            }
            return this._expandRectByRootMargin(e);
          }),
          (r.prototype._expandRectByRootMargin = function (t) {
            var e = this._rootMarginValues.map(function (e, o) {
                return 'px' == e.unit
                  ? e.value
                  : (e.value * (o % 2 ? t.width : t.height)) / 100;
              }),
              o = {
                top: t.top - e[0],
                right: t.right + e[1],
                bottom: t.bottom + e[2],
                left: t.left - e[3],
              };
            return (
              (o.width = o.right - o.left), (o.height = o.bottom - o.top), o
            );
          }),
          (r.prototype._hasCrossedThreshold = function (t, e) {
            var o = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
              n = e.isIntersecting ? e.intersectionRatio || 0 : -1;
            if (o !== n)
              for (var i = 0; i < this.thresholds.length; i++) {
                var r = this.thresholds[i];
                if (r == o || r == n || r < o != r < n) return !0;
              }
          }),
          (r.prototype._rootIsInDom = function () {
            return !this.root || l(t, this.root);
          }),
          (r.prototype._rootContainsTarget = function (e) {
            return (
              l(this.root || t, e) &&
              (!this.root || this.root.ownerDocument == e.ownerDocument)
            );
          }),
          (r.prototype._registerInstance = function () {
            e.indexOf(this) < 0 && e.push(this);
          }),
          (r.prototype._unregisterInstance = function () {
            var t = e.indexOf(this);
            -1 != t && e.splice(t, 1);
          }),
          (window.IntersectionObserver = r),
          (window.IntersectionObserverEntry = i);
      }
    function i(t) {
      (this.time = t.time),
        (this.target = t.target),
        (this.rootBounds = u(t.rootBounds)),
        (this.boundingClientRect = u(t.boundingClientRect)),
        (this.intersectionRect = u(
          t.intersectionRect || {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
          }
        )),
        (this.isIntersecting = !!t.intersectionRect);
      var e = this.boundingClientRect,
        o = e.width * e.height,
        n = this.intersectionRect,
        i = n.width * n.height;
      this.intersectionRatio = o
        ? Number((i / o).toFixed(4))
        : this.isIntersecting
        ? 1
        : 0;
    }
    function r(t, e) {
      var o,
        n,
        i,
        r = e || {};
      if ('function' != typeof t)
        throw new Error('callback must be a function');
      if (r.root && 1 != r.root.nodeType)
        throw new Error('root must be an Element');
      (this._checkForIntersections =
        ((o = this._checkForIntersections.bind(this)),
        (n = this.THROTTLE_TIMEOUT),
        (i = null),
        function () {
          i ||
            (i = setTimeout(function () {
              o(), (i = null);
            }, n));
        })),
        (this._callback = t),
        (this._observationTargets = []),
        (this._queuedEntries = []),
        (this._rootMarginValues = this._parseRootMargin(r.rootMargin)),
        (this.thresholds = this._initThresholds(r.threshold)),
        (this.root = r.root || null),
        (this.rootMargin = this._rootMarginValues
          .map(function (t) {
            return t.value + t.unit;
          })
          .join(' ')),
        (this._monitoringDocuments = []),
        (this._monitoringUnsubscribes = []);
    }
    function s(t, e, o, n) {
      'function' == typeof t.addEventListener
        ? t.addEventListener(e, o, n || !1)
        : 'function' == typeof t.attachEvent && t.attachEvent('on' + e, o);
    }
    function c(t, e, o, n) {
      'function' == typeof t.removeEventListener
        ? t.removeEventListener(e, o, n || !1)
        : 'function' == typeof t.detatchEvent && t.detatchEvent('on' + e, o);
    }
    function h(t) {
      var e;
      try {
        e = t.getBoundingClientRect();
      } catch (o) {}
      return e
        ? ((e.width && e.height) ||
            (e = {
              top: e.top,
              right: e.right,
              bottom: e.bottom,
              left: e.left,
              width: e.right - e.left,
              height: e.bottom - e.top,
            }),
          e)
        : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    }
    function u(t) {
      return !t || 'x' in t
        ? t
        : {
            top: t.top,
            y: t.top,
            bottom: t.bottom,
            left: t.left,
            x: t.left,
            right: t.right,
            width: t.width,
            height: t.height,
          };
    }
    function a(t, e) {
      var o = e.top - t.top,
        n = e.left - t.left;
      return {
        top: o,
        left: n,
        height: e.height,
        width: e.width,
        bottom: o + e.height,
        right: n + e.width,
      };
    }
    function l(t, e) {
      for (var o = e; o; ) {
        if (o == t) return !0;
        o = d(o);
      }
      return !1;
    }
    function d(e) {
      var o = e.parentNode;
      return 9 == e.nodeType && e != t
        ? f(e)
        : o && 11 == o.nodeType && o.host
        ? o.host
        : o && o.assignedSlot
        ? o.assignedSlot.parentNode
        : o;
    }
    function f(t) {
      try {
        return (t.defaultView && t.defaultView.frameElement) || null;
      } catch (e) {
        return null;
      }
    }
  })(),
  document.addEventListener('DOMContentLoaded', function (t) {
    const e = (t = t || {}).lazyClass || 'lazy',
      o = t.lazyBackgroundClass || 'lazy-bg',
      n = 'idleLoadTimeout' in t ? t.idleLoadTimeout : 200,
      i = t.observeChanges || !1,
      r = t.events || {},
      s = t.noPolyfill || !1,
      c = window,
      h = 'requestIdleCallback',
      u = 'IntersectionObserver',
      a = u in c && u + 'Entry' in c,
      l = /baidu|(?:google|bing|yandex|duckduck)bot/i.test(navigator.userAgent),
      d = ['srcset', 'src', 'poster'],
      f = [],
      p = (t, n) =>
        f.slice.call(
          (n || document).querySelectorAll(
            t || `img.${e},video.${e},iframe.${e},.${o}`
          )
        ),
      m = (e) => {
        const n = e.parentNode;
        'PICTURE' == n.nodeName && b(p('source', n), v),
          'VIDEO' == e.nodeName && b(p('source', e), v),
          v(e);
        const i = e.classList;
        i.contains(o) &&
          (i.remove(o), i.add(t.lazyBackgroundLoaded || 'lazy-bg-loaded'));
      },
      g = (t) => {
        for (let e in r)
          t.addEventListener(e, r[e].listener || r[e], r[e].options || void 0);
      },
      v = (t) => {
        for (let o in d)
          if (d[o] in t.dataset) {
            t.setAttribute(d[o], t.dataset[d[o]]);
            const n = t.parentNode;
            'SOURCE' === t.nodeName &&
              n.autoplay &&
              (n.load(),
              /Trident/.test(navigator.userAgent) && n.play(),
              n.classList.remove(e)),
              t.classList.remove(e);
          }
      },
      b = (t, e) => {
        for (let o = 0; o < t.length; o++)
          c[u] && e instanceof c[u] ? e.observe(t[o]) : e(t[o]);
      },
      w = (e) => {
        new MutationObserver(() => {
          b(p(), (t) => {
            _.indexOf(t) < 0 &&
              (_.push(t), g(t), a && !l ? y.observe(t) : (s || l) && b(_, m));
          });
        }).observe(
          e,
          t.mutationObserverOptions || { childList: !0, subtree: !0 }
        );
      };
    let _ = p();
    if ((b(_, g), a && !l)) {
      var y = new c[u](
        (t) => {
          b(t, (t) => {
            if (t.isIntersecting || t.intersectionRatio) {
              const e = t.target;
              h in c && n
                ? c[h](
                    () => {
                      m(e);
                    },
                    { timeout: n }
                  )
                : m(e),
                y.unobserve(e),
                (_ = _.filter((t) => t != e)),
                _.length || i || y.disconnect();
            }
          });
        },
        { rootMargin: ('threshold' in t ? t.threshold : 200) + 'px 0%' }
      );
      b(_, y), i && b(p(t.observeRootSelector || 'body'), w);
    } else (s || l) && b(_, m);
  }),
  console.log('Hello, world!');
//# sourceMappingURL=app.2e404879.js.map
