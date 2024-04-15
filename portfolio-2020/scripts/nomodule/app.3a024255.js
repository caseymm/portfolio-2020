!(function () {
  'use strict';
  !(function () {
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
          n = null,
          o = null;
        (r.prototype.THROTTLE_TIMEOUT = 100),
          (r.prototype.POLL_INTERVAL = null),
          (r.prototype.USE_MUTATION_OBSERVER = !0),
          (r._setupCrossOriginUpdater = function () {
            return (
              n ||
                (n = function (t, n) {
                  (o =
                    t && n
                      ? a(t, n)
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
              n
            );
          }),
          (r._resetCrossOriginUpdater = function () {
            (n = null), (o = null);
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
              e.sort().filter(function (t, e, n) {
                if ('number' != typeof t || isNaN(t) || t < 0 || t > 1)
                  throw new Error(
                    'threshold must be a number between 0 and 1 inclusively'
                  );
                return t !== n[e - 1];
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
            var n = e.defaultView;
            if (n && -1 == this._monitoringDocuments.indexOf(e)) {
              var o = this._checkForIntersections,
                i = null,
                r = null;
              if (
                (this.POLL_INTERVAL
                  ? (i = n.setInterval(o, this.POLL_INTERVAL))
                  : (s(n, 'resize', o, !0),
                    s(e, 'scroll', o, !0),
                    this.USE_MUTATION_OBSERVER &&
                      'MutationObserver' in n &&
                      (r = new n.MutationObserver(o)).observe(e, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0,
                      })),
                this._monitoringDocuments.push(e),
                this._monitoringUnsubscribes.push(function () {
                  var t = e.defaultView;
                  t && (i && t.clearInterval(i), h(t, 'resize', o, !0)),
                    h(e, 'scroll', o, !0),
                    r && r.disconnect();
                }),
                e != ((this.root && this.root.ownerDocument) || t))
              ) {
                var c = f(e);
                c && this._monitorIntersections(c.ownerDocument);
              }
            }
          }),
          (r.prototype._unmonitorIntersections = function (e) {
            var n = this._monitoringDocuments.indexOf(e);
            if (-1 != n) {
              var o = (this.root && this.root.ownerDocument) || t;
              if (
                !this._observationTargets.some(function (t) {
                  var n = t.element.ownerDocument;
                  if (n == e) return !0;
                  for (; n && n != o; ) {
                    var i = f(n);
                    if ((n = i && i.ownerDocument) == e) return !0;
                  }
                  return !1;
                })
              ) {
                var i = this._monitoringUnsubscribes[n];
                if (
                  (this._monitoringDocuments.splice(n, 1),
                  this._monitoringUnsubscribes.splice(n, 1),
                  i(),
                  e != o)
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
            if (this.root || !n || o) {
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
              this._observationTargets.forEach(function (o) {
                var r = o.element,
                  s = c(r),
                  h = this._rootContainsTarget(r),
                  u = o.entry,
                  a = t && h && this._computeTargetAndRootIntersection(r, s, e),
                  l = (o.entry = new i({
                    time:
                      window.performance &&
                      performance.now &&
                      performance.now(),
                    target: r,
                    boundingClientRect: s,
                    rootBounds: n && !this.root ? null : e,
                    intersectionRect: a,
                  }));
                u
                  ? t && h
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
                var s, h, u, l, f, g, p, m, v = i, b = d(e), _ = !1;
                !_ && b;

              ) {
                var w = null,
                  y = 1 == b.nodeType ? window.getComputedStyle(b) : {};
                if ('none' == y.display) return null;
                if (b == this.root || 9 == b.nodeType)
                  if (((_ = !0), b == this.root || b == t))
                    n && !this.root
                      ? !o || (0 == o.width && 0 == o.height)
                        ? ((b = null), (w = null), (v = null))
                        : (w = o)
                      : (w = r);
                  else {
                    var I = d(b),
                      E = I && c(I),
                      T = I && this._computeTargetAndRootIntersection(I, E, r);
                    E && T
                      ? ((b = I), (w = a(E, T)))
                      : ((b = null), (v = null));
                  }
                else {
                  var R = b.ownerDocument;
                  b != R.body &&
                    b != R.documentElement &&
                    'visible' != y.overflow &&
                    (w = c(b));
                }
                if (
                  (w &&
                    ((s = w),
                    (h = v),
                    (u = void 0),
                    (l = void 0),
                    (f = void 0),
                    (g = void 0),
                    (p = void 0),
                    (m = void 0),
                    (u = Math.max(s.top, h.top)),
                    (l = Math.min(s.bottom, h.bottom)),
                    (f = Math.max(s.left, h.left)),
                    (g = Math.min(s.right, h.right)),
                    (m = l - u),
                    (v =
                      ((p = g - f) >= 0 &&
                        m >= 0 && {
                          top: u,
                          bottom: l,
                          left: f,
                          right: g,
                          width: p,
                          height: m,
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
            if (this.root) e = c(this.root);
            else {
              var n = t.documentElement,
                o = t.body;
              e = {
                top: 0,
                left: 0,
                right: n.clientWidth || o.clientWidth,
                width: n.clientWidth || o.clientWidth,
                bottom: n.clientHeight || o.clientHeight,
                height: n.clientHeight || o.clientHeight,
              };
            }
            return this._expandRectByRootMargin(e);
          }),
          (r.prototype._expandRectByRootMargin = function (t) {
            var e = this._rootMarginValues.map(function (e, n) {
                return 'px' == e.unit
                  ? e.value
                  : (e.value * (n % 2 ? t.width : t.height)) / 100;
              }),
              n = {
                top: t.top - e[0],
                right: t.right + e[1],
                bottom: t.bottom + e[2],
                left: t.left - e[3],
              };
            return (
              (n.width = n.right - n.left), (n.height = n.bottom - n.top), n
            );
          }),
          (r.prototype._hasCrossedThreshold = function (t, e) {
            var n = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
              o = e.isIntersecting ? e.intersectionRatio || 0 : -1;
            if (n !== o)
              for (var i = 0; i < this.thresholds.length; i++) {
                var r = this.thresholds[i];
                if (r == n || r == o || r < n != r < o) return !0;
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
        n = e.width * e.height,
        o = this.intersectionRect,
        i = o.width * o.height;
      this.intersectionRatio = n
        ? Number((i / n).toFixed(4))
        : this.isIntersecting
        ? 1
        : 0;
    }
    function r(t, e) {
      var n,
        o,
        i,
        r = e || {};
      if ('function' != typeof t)
        throw new Error('callback must be a function');
      if (r.root && 1 != r.root.nodeType)
        throw new Error('root must be an Element');
      (this._checkForIntersections =
        ((n = this._checkForIntersections.bind(this)),
        (o = this.THROTTLE_TIMEOUT),
        (i = null),
        function () {
          i ||
            (i = setTimeout(function () {
              n(), (i = null);
            }, o));
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
    function s(t, e, n, o) {
      'function' == typeof t.addEventListener
        ? t.addEventListener(e, n, o || !1)
        : 'function' == typeof t.attachEvent && t.attachEvent('on' + e, n);
    }
    function h(t, e, n, o) {
      'function' == typeof t.removeEventListener
        ? t.removeEventListener(e, n, o || !1)
        : 'function' == typeof t.detatchEvent && t.detatchEvent('on' + e, n);
    }
    function c(t) {
      var e;
      try {
        e = t.getBoundingClientRect();
      } catch (n) {}
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
      var n = e.top - t.top,
        o = e.left - t.left;
      return {
        top: n,
        left: o,
        height: e.height,
        width: e.width,
        bottom: n + e.height,
        right: o + e.width,
      };
    }
    function l(t, e) {
      for (var n = e; n; ) {
        if (n == t) return !0;
        n = d(n);
      }
      return !1;
    }
    function d(e) {
      var n = e.parentNode;
      return 9 == e.nodeType && e != t
        ? f(e)
        : n && 11 == n.nodeType && n.host
        ? n.host
        : n && n.assignedSlot
        ? n.assignedSlot.parentNode
        : n;
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
        n = t.lazyBackgroundClass || 'lazy-bg',
        o = 'idleLoadTimeout' in t ? t.idleLoadTimeout : 200,
        i = t.observeChanges || !1,
        r = t.events || {},
        s = t.noPolyfill || !1,
        h = window,
        c = 'requestIdleCallback',
        u = 'IntersectionObserver',
        a = u in h && u + 'Entry' in h,
        l = /baidu|(?:google|bing|yandex|duckduck)bot/i.test(
          navigator.userAgent
        ),
        d = ['srcset', 'src', 'poster'],
        f = [],
        g = (t, o) =>
          f.slice.call(
            (o || document).querySelectorAll(
              t || `img.${e},video.${e},iframe.${e},.${n}`
            )
          ),
        p = (e) => {
          const o = e.parentNode;
          'PICTURE' == o.nodeName && b(g('source', o), v),
            'VIDEO' == e.nodeName && b(g('source', e), v),
            v(e);
          const i = e.classList;
          i.contains(n) &&
            (i.remove(n), i.add(t.lazyBackgroundLoaded || 'lazy-bg-loaded'));
        },
        m = (t) => {
          for (let e in r)
            t.addEventListener(
              e,
              r[e].listener || r[e],
              r[e].options || void 0
            );
        },
        v = (t) => {
          for (let n in d)
            if (d[n] in t.dataset) {
              t.setAttribute(d[n], t.dataset[d[n]]);
              const o = t.parentNode;
              'SOURCE' === t.nodeName &&
                o.autoplay &&
                (o.load(),
                /Trident/.test(navigator.userAgent) && o.play(),
                o.classList.remove(e)),
                t.classList.remove(e);
            }
        },
        b = (t, e) => {
          for (let n = 0; n < t.length; n++)
            h[u] && e instanceof h[u] ? e.observe(t[n]) : e(t[n]);
        },
        _ = (e) => {
          new MutationObserver(() => {
            b(g(), (t) => {
              w.indexOf(t) < 0 &&
                (w.push(t), m(t), a && !l ? y.observe(t) : (s || l) && b(w, p));
            });
          }).observe(
            e,
            t.mutationObserverOptions || { childList: !0, subtree: !0 }
          );
        };
      let w = g();
      if ((b(w, m), a && !l)) {
        var y = new h[u](
          (t) => {
            b(t, (t) => {
              if (t.isIntersecting || t.intersectionRatio) {
                const e = t.target;
                c in h && o
                  ? h[c](
                      () => {
                        p(e);
                      },
                      { timeout: o }
                    )
                  : p(e),
                  y.unobserve(e),
                  (w = w.filter((t) => t != e)),
                  w.length || i || y.disconnect();
              }
            });
          },
          { rootMargin: ('threshold' in t ? t.threshold : 200) + 'px 0%' }
        );
        b(w, y), i && b(g(t.observeRootSelector || 'body'), _);
      } else (s || l) && b(w, p);
    }),
    console.log('Hello, world!');
})();
//# sourceMappingURL=app.3a024255.js.map
