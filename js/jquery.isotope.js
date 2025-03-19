!(function (i, p) {
  "use strict";
  function o(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  function e(t) {
    var i,
      s = r.documentElement.style;
    if ("string" == typeof s[t]) return t;
    t = o(t);
    for (var e = 0, n = a.length; e < n; e++)
      if ("string" == typeof s[(i = a[e] + t)]) return i;
  }
  var t,
    h,
    s,
    y,
    g,
    r = i.document,
    _ = i.Modernizr,
    a = "Moz Webkit O Ms".split(" "),
    l = e("transform"),
    n = e("transitionProperty"),
    u = {
      csstransforms: function () {
        return !!l;
      },
      csstransforms3d: function () {
        var t,
          i,
          s = !!e("perspective");
        return (
          s &&
            ((i =
              "@media (" +
              " -o- -moz- -ms- -webkit- -khtml- "
                .split(" ")
                .join("transform-3d),(") +
              "modernizr)"),
            (t = p("<style>" + i + "{#modernizr{height:3px}}</style>").appendTo(
              "head"
            )),
            (s =
              3 ===
              (i = p('<div id="modernizr" />').appendTo("html")).height()),
            i.remove(),
            t.remove()),
          s
        );
      },
      csstransitions: function () {
        return !!n;
      },
    };
  if (_) for (t in u) _.hasOwnProperty(t) || _.addTest(t, u[t]);
  else {
    _ = i.Modernizr = { _version: "1.6ish: miniModernizr for Isotope" };
    var c,
      d = " ";
    for (t in u) (c = u[t]()), (d += " " + ((_[t] = c) ? "" : "no-") + t);
    p("html").addClass(d);
  }
  _.csstransforms &&
    ((h = _.csstransforms3d
      ? {
          translate: function (t) {
            return "translate3d(" + t[0] + "px, " + t[1] + "px, 0) ";
          },
          scale: function (t) {
            return "scale3d(" + t + ", " + t + ", 1) ";
          },
        }
      : {
          translate: function (t) {
            return "translate(" + t[0] + "px, " + t[1] + "px) ";
          },
          scale: function (t) {
            return "scale(" + t + ") ";
          },
        }),
    (s = function (t, i, s) {
      var e,
        n,
        o = p.data(t, "isoTransform") || {},
        r = {},
        a = {};
      for (e in ((r[i] = s), p.extend(o, r), o)) (n = o[e]), (a[e] = h[e](n));
      r = (a.translate || "") + (a.scale || "");
      p.data(t, "isoTransform", o), (t.style[l] = r);
    }),
    (p.cssNumber.scale = !0),
    (p.cssHooks.scale = {
      set: function (t, i) {
        s(t, "scale", i);
      },
      get: function (t, i) {
        t = p.data(t, "isoTransform");
        return t && t.scale ? t.scale : 1;
      },
    }),
    (p.fx.step.scale = function (t) {
      p.cssHooks.scale.set(t.elem, t.now + t.unit);
    }),
    (p.cssNumber.translate = !0),
    (p.cssHooks.translate = {
      set: function (t, i) {
        s(t, "translate", i);
      },
      get: function (t, i) {
        t = p.data(t, "isoTransform");
        return t && t.translate ? t.translate : [0, 0];
      },
    })),
    _.csstransitions &&
      ((y = {
        WebkitTransitionProperty: "webkitTransitionEnd",
        MozTransitionProperty: "transitionend",
        OTransitionProperty: "oTransitionEnd otransitionend",
        transitionProperty: "transitionend",
      }[n]),
      (g = e("transitionDuration")));
  var f,
    m = p.event,
    v = p.event.handle ? "handle" : "dispatch";
  (m.special.smartresize = {
    setup: function () {
      p(this).bind("resize", m.special.smartresize.handler);
    },
    teardown: function () {
      p(this).unbind("resize", m.special.smartresize.handler);
    },
    handler: function (t, i) {
      var s = this,
        e = arguments;
      (t.type = "smartresize"),
        f && clearTimeout(f),
        (f = setTimeout(
          function () {
            m[v].apply(s, e);
          },
          "execAsap" === i ? 0 : 100
        ));
    },
  }),
    (p.fn.smartresize = function (t) {
      return t
        ? this.bind("smartresize", t)
        : this.trigger("smartresize", ["execAsap"]);
    }),
    (p.Isotope = function (t, i, s) {
      (this.element = p(i)), this._create(t), this._init(s);
    });
  var A = ["width", "height"],
    w = p(i);
  function C(t) {
    i.console && i.console.error(t);
  }
  (p.Isotope.settings = {
    resizable: !0,
    layoutMode: "masonry",
    containerClass: "isotope",
    itemClass: "isotope-item",
    hiddenClass: "isotope-hidden",
    hiddenStyle: { opacity: 0, scale: 0.001 },
    visibleStyle: { opacity: 1, scale: 1 },
    containerStyle: { position: "relative", overflow: "hidden" },
    animationEngine: "best-available",
    animationOptions: { queue: !1, duration: 800 },
    sortBy: "original-order",
    sortAscending: !0,
    resizesContainer: !0,
    transformsEnabled: !0,
    itemPositionDataEnabled: !1,
  }),
    (p.Isotope.prototype = {
      _create: function (t) {
        (this.options = p.extend({}, p.Isotope.settings, t)),
          (this.styleQueue = []),
          (this.elemCount = 0);
        var i = this.element[0].style;
        this.originalStyle = {};
        var s,
          e = A.slice(0);
        for (s in this.options.containerStyle) e.push(s);
        for (var n = 0, o = e.length; n < o; n++)
          (s = e[n]), (this.originalStyle[s] = i[s] || "");
        this.element.css(this.options.containerStyle),
          this._updateAnimationEngine(),
          this._updateUsingTransforms();
        t = {
          "original-order": function (t, i) {
            return i.elemCount++, i.elemCount;
          },
          random: function () {
            return Math.random();
          },
        };
        (this.options.getSortData = p.extend(this.options.getSortData, t)),
          this.reloadItems(),
          (this.offset = {
            left: parseInt(this.element.css("padding-left") || 0, 10),
            top: parseInt(this.element.css("padding-top") || 0, 10),
          });
        var r = this;
        setTimeout(function () {
          r.element.addClass(r.options.containerClass);
        }, 0),
          this.options.resizable &&
            w.bind("smartresize.isotope", function () {
              r.resize();
            }),
          this.element.delegate(
            "." + this.options.hiddenClass,
            "click",
            function () {
              return !1;
            }
          );
      },
      _getAtoms: function (t) {
        var i = this.options.itemSelector,
          s = { position: "absolute" },
          t = (t = i ? t.filter(i).add(t.find(i)) : t).filter(function (t, i) {
            return 1 === i.nodeType;
          });
        return (
          this.usingTransforms && ((s.left = 0), (s.top = 0)),
          t.css(s).addClass(this.options.itemClass),
          this.updateSortData(t, !0),
          t
        );
      },
      _init: function (t) {
        (this.$filteredAtoms = this._filter(this.$allAtoms)),
          this._sort(),
          this.reLayout(t);
      },
      option: function (t) {
        var i, s;
        if (p.isPlainObject(t))
          for (s in ((this.options = p.extend(!0, this.options, t)), t))
            this[(i = "_update" + o(s))] && this[i]();
      },
      _updateAnimationEngine: function () {
        var t;
        switch (
          this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, "")
        ) {
          case "css":
          case "none":
            t = !1;
            break;
          case "jquery":
            t = !0;
            break;
          default:
            t = !_.csstransitions;
        }
        (this.isUsingJQueryAnimation = t), this._updateUsingTransforms();
      },
      _updateTransformsEnabled: function () {
        this._updateUsingTransforms();
      },
      _updateUsingTransforms: function () {
        var t = (this.usingTransforms =
          this.options.transformsEnabled &&
          _.csstransforms &&
          _.csstransitions &&
          !this.isUsingJQueryAnimation);
        t ||
          (delete this.options.hiddenStyle.scale,
          delete this.options.visibleStyle.scale),
          (this.getPositionStyles = t ? this._translate : this._positionAbs);
      },
      _filter: function (t) {
        var i = "" === this.options.filter ? "*" : this.options.filter;
        if (!i) return t;
        var s = this.options.hiddenClass,
          e = "." + s,
          n = t.filter(e),
          o = n;
        return (
          "*" !== i &&
            ((o = n.filter(i)),
            (e = t.not(e).not(i).addClass(s)),
            this.styleQueue.push({ $el: e, style: this.options.hiddenStyle })),
          this.styleQueue.push({ $el: o, style: this.options.visibleStyle }),
          o.removeClass(s),
          t.filter(i)
        );
      },
      updateSortData: function (t, i) {
        var s,
          e,
          n = this,
          o = this.options.getSortData;
        t.each(function () {
          for (var t in ((s = p(this)), (e = {}), o))
            e[t] =
              i || "original-order" !== t
                ? o[t](s, n)
                : p.data(this, "isotope-sort-data")[t];
          p.data(this, "isotope-sort-data", e);
        });
      },
      _sort: function () {
        var n = this.options.sortBy,
          o = this._getSorter,
          r = this.options.sortAscending ? 1 : -1;
        this.$filteredAtoms.sort(function (t, i) {
          var s = o(t, n),
            e = o(i, n);
          return (
            s === e &&
              "original-order" !== n &&
              ((s = o(t, "original-order")), (e = o(i, "original-order"))),
            (e < s ? 1 : s < e ? -1 : 0) * r
          );
        });
      },
      _getSorter: function (t, i) {
        return p.data(t, "isotope-sort-data")[i];
      },
      _translate: function (t, i) {
        return { translate: [t, i] };
      },
      _positionAbs: function (t, i) {
        return { left: t, top: i };
      },
      _pushPosition: function (t, i, s) {
        (i = Math.round(i + this.offset.left)),
          (s = Math.round(s + this.offset.top));
        var e = this.getPositionStyles(i, s);
        this.styleQueue.push({ $el: t, style: e }),
          this.options.itemPositionDataEnabled &&
            t.data("isotope-item-position", { x: i, y: s });
      },
      layout: function (t, i) {
        var s = this.options.layoutMode;
        this["_" + s + "Layout"](t),
          this.options.resizesContainer &&
            ((s = this["_" + s + "GetContainerSize"]()),
            this.styleQueue.push({ $el: this.element, style: s })),
          this._processStyleQueue(t, i),
          (this.isLaidOut = !0);
      },
      _processStyleQueue: function (e, t) {
        var s,
          n = this.isLaidOut && this.isUsingJQueryAnimation ? "animate" : "css",
          o = this.options.animationOptions,
          i = this.options.onLayout,
          r = function (t, i) {
            i.$el[n](i.style, o);
          };
        if (this._isInserting && this.isUsingJQueryAnimation)
          r = function (t, i) {
            (s = i.$el.hasClass("no-transition") ? "css" : n),
              i.$el[s](i.style, o);
          };
        else if (t || i || o.complete) {
          var a = !1,
            h = [t, i, o.complete],
            l = this,
            u = !0,
            c = function () {
              if (!a) {
                for (var t, i = 0, s = h.length; i < s; i++)
                  "function" == typeof (t = h[i]) && t.call(l.element, e, l);
                a = !0;
              }
            };
          if (this.isUsingJQueryAnimation && "animate" == n)
            (o.complete = c), (u = !1);
          else if (_.csstransitions) {
            for (
              var d, f = 0, i = this.styleQueue[0], m = i && i.$el;
              !m || !m.length;

            ) {
              if (!(d = this.styleQueue[f++])) return;
              m = d.$el;
            }
            0 < parseFloat(getComputedStyle(m[0])[g]) &&
              (u = !(r = function (t, i) {
                i.$el[n](i.style, o).one(y, c);
              }));
          }
        }
        p.each(this.styleQueue, r), u && c(), (this.styleQueue = []);
      },
      resize: function () {
        this["_" + this.options.layoutMode + "ResizeChanged"]() &&
          this.reLayout();
      },
      reLayout: function (t) {
        this["_" + this.options.layoutMode + "Reset"](),
          this.layout(this.$filteredAtoms, t);
      },
      addItems: function (t, i) {
        t = this._getAtoms(t);
        (this.$allAtoms = this.$allAtoms.add(t)), i && i(t);
      },
      insert: function (t, i) {
        this.element.append(t);
        var s = this;
        this.addItems(t, function (t) {
          t = s._filter(t);
          s._addHideAppended(t),
            s._sort(),
            s.reLayout(),
            s._revealAppended(t, i);
        });
      },
      appended: function (t, i) {
        var s = this;
        this.addItems(t, function (t) {
          s._addHideAppended(t), s.layout(t), s._revealAppended(t, i);
        });
      },
      _addHideAppended: function (t) {
        (this.$filteredAtoms = this.$filteredAtoms.add(t)),
          t.addClass("no-transition"),
          (this._isInserting = !0),
          this.styleQueue.push({ $el: t, style: this.options.hiddenStyle });
      },
      _revealAppended: function (t, i) {
        var s = this;
        setTimeout(function () {
          t.removeClass("no-transition"),
            s.styleQueue.push({ $el: t, style: s.options.visibleStyle }),
            (s._isInserting = !1),
            s._processStyleQueue(t, i);
        }, 10);
      },
      reloadItems: function () {
        this.$allAtoms = this._getAtoms(this.element.children());
      },
      remove: function (t, i) {
        (this.$allAtoms = this.$allAtoms.not(t)),
          (this.$filteredAtoms = this.$filteredAtoms.not(t));
        function s() {
          t.remove(), i && i.call(e.element);
        }
        var e = this;
        t.filter(":not(." + this.options.hiddenClass + ")").length
          ? (this.styleQueue.push({ $el: t, style: this.options.hiddenStyle }),
            this._sort(),
            this.reLayout(s))
          : s();
      },
      shuffle: function (t) {
        this.updateSortData(this.$allAtoms),
          (this.options.sortBy = "random"),
          this._sort(),
          this.reLayout(t);
      },
      destroy: function () {
        var i = this.usingTransforms,
          t = this.options;
        this.$allAtoms
          .removeClass(t.hiddenClass + " " + t.itemClass)
          .each(function () {
            var t = this.style;
            (t.position = ""),
              (t.top = ""),
              (t.left = ""),
              (t.opacity = ""),
              i && (t[l] = "");
          });
        var s,
          e = this.element[0].style;
        for (s in this.originalStyle) e[s] = this.originalStyle[s];
        this.element
          .unbind(".isotope")
          .undelegate("." + t.hiddenClass, "click")
          .removeClass(t.containerClass)
          .removeData("isotope"),
          w.unbind(".isotope");
      },
      _getSegments: function (t) {
        var i = this.options.layoutMode,
          s = t ? "rowHeight" : "columnWidth",
          e = t ? "height" : "width",
          n = t ? "rows" : "cols",
          t = this.element[e](),
          e =
            (this.options[i] && this.options[i][s]) ||
            this.$filteredAtoms["outer" + o(e)](!0) ||
            t,
          t = Math.floor(t / e);
        (t = Math.max(t, 1)), (this[i][n] = t), (this[i][s] = e);
      },
      _checkIfSegmentsChanged: function (t) {
        var i = this.options.layoutMode,
          s = t ? "rows" : "cols",
          e = this[i][s];
        return this._getSegments(t), this[i][s] !== e;
      },
      _masonryReset: function () {
        (this.masonry = {}), this._getSegments();
        var t = this.masonry.cols;
        for (this.masonry.colYs = []; t--; ) this.masonry.colYs.push(0);
      },
      _masonryLayout: function (t) {
        var r = this,
          a = r.masonry;
        t.each(function () {
          var t = p(this),
            i = Math.ceil(t.outerWidth(!0) / a.columnWidth);
          if (1 === (i = Math.min(i, a.cols))) r._masonryPlaceBrick(t, a.colYs);
          else {
            for (var s, e = a.cols + 1 - i, n = [], o = 0; o < e; o++)
              (s = a.colYs.slice(o, o + i)), (n[o] = Math.max.apply(Math, s));
            r._masonryPlaceBrick(t, n);
          }
        });
      },
      _masonryPlaceBrick: function (t, i) {
        for (
          var s = Math.min.apply(Math, i), e = 0, n = 0, o = i.length;
          n < o;
          n++
        )
          if (i[n] === s) {
            e = n;
            break;
          }
        var r = this.masonry.columnWidth * e;
        this._pushPosition(t, r, s);
        for (
          var a = s + t.outerHeight(!0), h = this.masonry.cols + 1 - o, n = 0;
          n < h;
          n++
        )
          this.masonry.colYs[e + n] = a;
      },
      _masonryGetContainerSize: function () {
        return { height: Math.max.apply(Math, this.masonry.colYs) };
      },
      _masonryResizeChanged: function () {
        return this._checkIfSegmentsChanged();
      },
      _fitRowsReset: function () {
        this.fitRows = { x: 0, y: 0, height: 0 };
      },
      _fitRowsLayout: function (t) {
        var e = this,
          n = this.element.width(),
          o = this.fitRows;
        t.each(function () {
          var t = p(this),
            i = t.outerWidth(!0),
            s = t.outerHeight(!0);
          0 !== o.x && i + o.x > n && ((o.x = 0), (o.y = o.height)),
            e._pushPosition(t, o.x, o.y),
            (o.height = Math.max(o.y + s, o.height)),
            (o.x += i);
        });
      },
      _fitRowsGetContainerSize: function () {
        return { height: this.fitRows.height };
      },
      _fitRowsResizeChanged: function () {
        return !0;
      },
      _cellsByRowReset: function () {
        (this.cellsByRow = { index: 0 }),
          this._getSegments(),
          this._getSegments(!0);
      },
      _cellsByRowLayout: function (t) {
        var e = this,
          n = this.cellsByRow;
        t.each(function () {
          var t = p(this),
            i = n.index % n.cols,
            s = Math.floor(n.index / n.cols),
            i = (0.5 + i) * n.columnWidth - t.outerWidth(!0) / 2,
            s = (s + 0.5) * n.rowHeight - t.outerHeight(!0) / 2;
          e._pushPosition(t, i, s), n.index++;
        });
      },
      _cellsByRowGetContainerSize: function () {
        return {
          height:
            Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) *
              this.cellsByRow.rowHeight +
            this.offset.top,
        };
      },
      _cellsByRowResizeChanged: function () {
        return this._checkIfSegmentsChanged();
      },
      _straightDownReset: function () {
        this.straightDown = { y: 0 };
      },
      _straightDownLayout: function (t) {
        var s = this;
        t.each(function (t) {
          var i = p(this);
          s._pushPosition(i, 0, s.straightDown.y),
            (s.straightDown.y += i.outerHeight(!0));
        });
      },
      _straightDownGetContainerSize: function () {
        return { height: this.straightDown.y };
      },
      _straightDownResizeChanged: function () {
        return !0;
      },
      _masonryHorizontalReset: function () {
        (this.masonryHorizontal = {}), this._getSegments(!0);
        var t = this.masonryHorizontal.rows;
        for (this.masonryHorizontal.rowXs = []; t--; )
          this.masonryHorizontal.rowXs.push(0);
      },
      _masonryHorizontalLayout: function (t) {
        var r = this,
          a = r.masonryHorizontal;
        t.each(function () {
          var t = p(this),
            i = Math.ceil(t.outerHeight(!0) / a.rowHeight);
          if (1 === (i = Math.min(i, a.rows)))
            r._masonryHorizontalPlaceBrick(t, a.rowXs);
          else {
            for (var s, e = a.rows + 1 - i, n = [], o = 0; o < e; o++)
              (s = a.rowXs.slice(o, o + i)), (n[o] = Math.max.apply(Math, s));
            r._masonryHorizontalPlaceBrick(t, n);
          }
        });
      },
      _masonryHorizontalPlaceBrick: function (t, i) {
        for (
          var s = Math.min.apply(Math, i), e = 0, n = 0, o = i.length;
          n < o;
          n++
        )
          if (i[n] === s) {
            e = n;
            break;
          }
        var r = this.masonryHorizontal.rowHeight * e;
        this._pushPosition(t, s, r);
        for (
          var a = s + t.outerWidth(!0),
            h = this.masonryHorizontal.rows + 1 - o,
            n = 0;
          n < h;
          n++
        )
          this.masonryHorizontal.rowXs[e + n] = a;
      },
      _masonryHorizontalGetContainerSize: function () {
        return { width: Math.max.apply(Math, this.masonryHorizontal.rowXs) };
      },
      _masonryHorizontalResizeChanged: function () {
        return this._checkIfSegmentsChanged(!0);
      },
      _fitColumnsReset: function () {
        this.fitColumns = { x: 0, y: 0, width: 0 };
      },
      _fitColumnsLayout: function (t) {
        var e = this,
          n = this.element.height(),
          o = this.fitColumns;
        t.each(function () {
          var t = p(this),
            i = t.outerWidth(!0),
            s = t.outerHeight(!0);
          0 !== o.y && s + o.y > n && ((o.x = o.width), (o.y = 0)),
            e._pushPosition(t, o.x, o.y),
            (o.width = Math.max(o.x + i, o.width)),
            (o.y += s);
        });
      },
      _fitColumnsGetContainerSize: function () {
        return { width: this.fitColumns.width };
      },
      _fitColumnsResizeChanged: function () {
        return !0;
      },
      _cellsByColumnReset: function () {
        (this.cellsByColumn = { index: 0 }),
          this._getSegments(),
          this._getSegments(!0);
      },
      _cellsByColumnLayout: function (t) {
        var e = this,
          n = this.cellsByColumn;
        t.each(function () {
          var t = p(this),
            i = Math.floor(n.index / n.rows),
            s = n.index % n.rows,
            i = (i + 0.5) * n.columnWidth - t.outerWidth(!0) / 2,
            s = (0.5 + s) * n.rowHeight - t.outerHeight(!0) / 2;
          e._pushPosition(t, i, s), n.index++;
        });
      },
      _cellsByColumnGetContainerSize: function () {
        return {
          width:
            Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) *
            this.cellsByColumn.columnWidth,
        };
      },
      _cellsByColumnResizeChanged: function () {
        return this._checkIfSegmentsChanged(!0);
      },
      _straightAcrossReset: function () {
        this.straightAcross = { x: 0 };
      },
      _straightAcrossLayout: function (t) {
        var s = this;
        t.each(function (t) {
          var i = p(this);
          s._pushPosition(i, s.straightAcross.x, 0),
            (s.straightAcross.x += i.outerWidth(!0));
        });
      },
      _straightAcrossGetContainerSize: function () {
        return { width: this.straightAcross.x };
      },
      _straightAcrossResizeChanged: function () {
        return !0;
      },
    }),
    (p.fn.imagesLoaded = function (t) {
      var i = this,
        s = i.find("img").add(i.filter("img")),
        e = s.length,
        n =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        o = [];
      function r() {
        t.call(i, s);
      }
      return (
        e || r(),
        s
          .bind("load.imagesLoaded error.imagesLoaded", function t(i) {
            i = i.target;
            i.src !== n &&
              -1 === p.inArray(i, o) &&
              (o.push(i),
              --e <= 0 && (setTimeout(r), s.unbind(".imagesLoaded", t)));
          })
          .each(function () {
            var t = this.src;
            (this.src = n), (this.src = t);
          }),
        i
      );
    }),
    (p.fn.isotope = function (i, s) {
      var e;
      return (
        "string" == typeof i
          ? ((e = Array.prototype.slice.call(arguments, 1)),
            this.each(function () {
              var t = p.data(this, "isotope");
              t
                ? p.isFunction(t[i]) && "_" !== i.charAt(0)
                  ? t[i].apply(t, e)
                  : C("no such method '" + i + "' for isotope instance")
                : C(
                    "cannot call methods on isotope prior to initialization; attempted to call method '" +
                      i +
                      "'"
                  );
            }))
          : this.each(function () {
              var t = p.data(this, "isotope");
              t
                ? (t.option(i), t._init(s))
                : p.data(this, "isotope", new p.Isotope(i, this, s));
            }),
        this
      );
    });
})(window, jQuery);
