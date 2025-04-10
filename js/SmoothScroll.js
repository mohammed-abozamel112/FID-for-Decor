!(function () {
  var u,
    e = {
      frameRate: 150,
      animationTime: 400,
      stepSize: 120,
      pulseAlgorithm: !0,
      pulseScale: 8,
      pulseNormalize: 1,
      accelerationDelta: 20,
      accelerationMax: 1,
      keyboardSupport: !0,
      arrowScroll: 50,
      touchpadSupport: !0,
      fixedBackground: !0,
      excluded: "",
    },
    m = e,
    o = !1,
    n = !1,
    r = { x: 0, y: 0 },
    l = !1,
    i = document.documentElement,
    c = [120, 120, 120],
    s = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
    },
    m = e;
  function d() {
    m.keyboardSupport && x("keydown", t);
  }
  function f() {
    var e, t, r, a;
    document.body &&
      ((e = document.body),
      (t = document.documentElement),
      (a = window.innerHeight),
      (r = e.scrollHeight),
      (i = 0 <= document.compatMode.indexOf("CSS") ? t : e),
      (u = e),
      d(),
      (l = !0),
      top != self
        ? (n = !0)
        : a < r &&
          (e.offsetHeight <= a || t.offsetHeight <= a) &&
          ((t.style.height = "auto"),
          setTimeout(refresh, 10),
          i.offsetHeight <= a &&
            (((a = document.createElement("div")).style.clear = "both"),
            e.appendChild(a))),
      m.fixedBackground ||
        o ||
        ((e.style.backgroundAttachment = "scroll"),
        (t.style.backgroundAttachment = "scroll")));
  }
  var w = [],
    g = !1,
    a = +new Date();
  function p(c, s, d, f) {
    var e, t, p, h;
    (f = f || 1e3),
      (e = 0 < (e = s) ? 1 : -1),
      (t = 0 < (t = d) ? 1 : -1),
      (r.x === e && r.y === t) || ((r.x = e), (r.y = t), (w = []), (a = 0)),
      1 != m.accelerationMax &&
        ((t = +new Date() - a) < m.accelerationDelta &&
          1 < (t = (1 + 30 / t) / 2) &&
          ((t = Math.min(t, m.accelerationMax)), (s *= t), (d *= t)),
        (a = +new Date())),
      w.push({
        x: s,
        y: d,
        lastX: s < 0 ? 0.99 : -0.99,
        lastY: d < 0 ? 0.99 : -0.99,
        start: +new Date(),
      }),
      g ||
        ((p = c === document.body),
        (h = function (e) {
          for (var t = +new Date(), r = 0, a = 0, o = 0; o < w.length; o++) {
            var n = w[o],
              l = t - n.start,
              i = l >= m.animationTime,
              u = i ? 1 : l / m.animationTime;
            m.pulseAlgorithm &&
              (u = (function (e) {
                if (1 <= e) return 1;
                if (e <= 0) return 0;
                1 == m.pulseNormalize && (m.pulseNormalize /= C(1));
                return C(e);
              })(u));
            (l = (n.x * u - n.lastX) >> 0), (u = (n.y * u - n.lastY) >> 0);
            (r += l),
              (a += u),
              (n.lastX += l),
              (n.lastY += u),
              i && (w.splice(o, 1), o--);
          }
          p
            ? window.scrollBy(r, a)
            : (r && (c.scrollLeft += r), a && (c.scrollTop += a)),
            s || d || (w = []),
            w.length ? M(h, c, f / m.frameRate + 1) : (g = !1);
        }),
        M(h, c, 0),
        (g = !0));
  }
  function t(e) {
    var t = e.target,
      r =
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        (e.shiftKey && e.keyCode !== s.spacebar);
    if (
      /input|textarea|select|embed/i.test(t.nodeName) ||
      t.isContentEditable ||
      e.defaultPrevented ||
      r
    )
      return !0;
    if (D(t, "button") && e.keyCode === s.spacebar) return !0;
    var a = 0,
      o = 0,
      n = S(u),
      l = n.clientHeight;
    switch ((n == document.body && (l = window.innerHeight), e.keyCode)) {
      case s.up:
        o = -m.arrowScroll;
        break;
      case s.down:
        o = m.arrowScroll;
        break;
      case s.spacebar:
        o = -(e.shiftKey ? 1 : -1) * l * 0.9;
        break;
      case s.pageup:
        o = 0.9 * -l;
        break;
      case s.pagedown:
        o = 0.9 * l;
        break;
      case s.home:
        o = -n.scrollTop;
        break;
      case s.end:
        var i = n.scrollHeight - n.scrollTop - l,
          o = 0 < i ? 10 + i : 0;
        break;
      case s.left:
        a = -m.arrowScroll;
        break;
      case s.right:
        a = m.arrowScroll;
        break;
      default:
        return !0;
    }
    p(n, a, o), e.preventDefault();
  }
  var h = {};
  setInterval(function () {
    h = {};
  }, 1e4);
  var b,
    v,
    y =
      ((b = 0),
      function (e) {
        return e.uniqueID || (e.uniqueID = b++);
      });
  function k(e, t) {
    for (var r = e.length; r--; ) h[y(e[r])] = t;
    return t;
  }
  function S(e) {
    var t = [],
      r = i.scrollHeight;
    do {
      var a = h[y(e)];
      if (a) return k(t, a);
      if ((t.push(e), r === e.scrollHeight)) {
        if (!n || i.clientHeight + 10 < r) return k(t, document.body);
      } else if (
        e.clientHeight + 10 < e.scrollHeight &&
        ((overflow = getComputedStyle(e, "").getPropertyValue("overflow-y")),
        "scroll" === overflow || "auto" === overflow)
      )
        return k(t, e);
    } while ((e = e.parentNode));
  }
  function x(e, t, r) {
    window.addEventListener(e, t, r || !1);
  }
  function D(e, t) {
    return (e.nodeName || "").toLowerCase() === t.toLowerCase();
  }
  function H(e, t) {
    return Math.floor(e / t) == e / t;
  }
  var M =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (e, t, r) {
      window.setTimeout(e, r || 1e3 / 60);
    };
  function C(e) {
    var t;
    return (
      ((e *= m.pulseScale) < 1
        ? e - (1 - Math.exp(-e))
        : (--e, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) *
      m.pulseNormalize
    );
  }
  (e = /chrome/i.test(window.navigator.userAgent)),
    "onmousewheel" in document &&
      e &&
      (x("mousedown", function (e) {
        u = e.target;
      }),
      x("mousewheel", function (e) {
        l || f();
        var t = S((a = e.target));
        if (
          !t ||
          e.defaultPrevented ||
          D(u, "embed") ||
          (D(a, "embed") && /\.pdf/i.test(a.src))
        )
          return !0;
        var r = e.wheelDeltaX || 0,
          a = e.wheelDeltaY || 0;
        if (
          (r || a || (a = e.wheelDelta || 0),
          !m.touchpadSupport &&
            (function (e) {
              if (!e) return;
              (e = Math.abs(e)), c.push(e), c.shift(), clearTimeout(v);
              var t = c[0] == c[1] && c[1] == c[2],
                e = H(c[0], 120) && H(c[1], 120) && H(c[2], 120);
              return !(t || e);
            })(a))
        )
          return !0;
        1.2 < Math.abs(r) && (r *= m.stepSize / 120),
          1.2 < Math.abs(a) && (a *= m.stepSize / 120),
          p(t, -r, -a),
          e.preventDefault();
      }),
      x("load", f));
})();
