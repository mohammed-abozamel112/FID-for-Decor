if ("undefined" == typeof jQuery)
  throw new Error("Bootstrap's JavaScript requires jQuery");
!(function () {
  "use strict";
  var t = jQuery.fn.jquery.split(" ")[0].split(".");
  if ((t[0] < 2 && t[1] < 9) || (1 == t[0] && 9 == t[1] && t[2] < 1))
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher"
    );
})(),
  (function (o) {
    "use strict";
    (o.fn.emulateTransitionEnd = function (t) {
      var e = !1,
        i = this;
      o(this).one("bsTransitionEnd", function () {
        e = !0;
      });
      return (
        setTimeout(function () {
          e || o(i).trigger(o.support.transition.end);
        }, t),
        this
      );
    }),
      o(function () {
        (o.support.transition = (function () {
          var t,
            e = document.createElement("bootstrap"),
            i = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              transition: "transitionend",
            };
          for (t in i) if (void 0 !== e.style[t]) return { end: i[t] };
          return !1;
        })()),
          o.support.transition &&
            (o.event.special.bsTransitionEnd = {
              bindType: o.support.transition.end,
              delegateType: o.support.transition.end,
              handle: function (t) {
                if (o(t.target).is(this))
                  return t.handleObj.handler.apply(this, arguments);
              },
            });
      });
  })(jQuery),
  (function (s) {
    "use strict";
    function a(t) {
      s(t).on("click", e, this.close);
    }
    var e = '[data-dismiss="alert"]';
    (a.VERSION = "3.3.4"),
      (a.TRANSITION_DURATION = 150),
      (a.prototype.close = function (t) {
        var e = s(this),
          i =
            (i = e.attr("data-target")) ||
            ((i = e.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")),
          o = s(i);
        function n() {
          o.detach().trigger("closed.bs.alert").remove();
        }
        t && t.preventDefault(),
          o.length || (o = e.closest(".alert")),
          o.trigger((t = s.Event("close.bs.alert"))),
          t.isDefaultPrevented() ||
            (o.removeClass("in"),
            s.support.transition && o.hasClass("fade")
              ? o
                  .one("bsTransitionEnd", n)
                  .emulateTransitionEnd(a.TRANSITION_DURATION)
              : n());
      });
    var t = s.fn.alert;
    (s.fn.alert = function (i) {
      return this.each(function () {
        var t = s(this),
          e = t.data("bs.alert");
        e || t.data("bs.alert", (e = new a(this))),
          "string" == typeof i && e[i].call(t);
      });
    }),
      (s.fn.alert.Constructor = a),
      (s.fn.alert.noConflict = function () {
        return (s.fn.alert = t), this;
      }),
      s(document).on("click.bs.alert.data-api", e, a.prototype.close);
  })(jQuery),
  (function (s) {
    "use strict";
    var n = function (t, e) {
      (this.$element = s(t)),
        (this.options = s.extend({}, n.DEFAULTS, e)),
        (this.isLoading = !1);
    };
    function i(o) {
      return this.each(function () {
        var t = s(this),
          e = t.data("bs.button"),
          i = "object" == typeof o && o;
        e || t.data("bs.button", (e = new n(this, i))),
          "toggle" == o ? e.toggle() : o && e.setState(o);
      });
    }
    (n.VERSION = "3.3.4"),
      (n.DEFAULTS = { loadingText: "loading..." }),
      (n.prototype.setState = function (t) {
        var e = "disabled",
          i = this.$element,
          o = i.is("input") ? "val" : "html",
          n = i.data();
        (t += "Text"),
          null == n.resetText && i.data("resetText", i[o]()),
          setTimeout(
            s.proxy(function () {
              i[o]((null == n[t] ? this.options : n)[t]),
                "loadingText" == t
                  ? ((this.isLoading = !0), i.addClass(e).attr(e, e))
                  : this.isLoading &&
                    ((this.isLoading = !1), i.removeClass(e).removeAttr(e));
            }, this),
            0
          );
      }),
      (n.prototype.toggle = function () {
        var t,
          e = !0,
          i = this.$element.closest('[data-toggle="buttons"]');
        i.length
          ? ("radio" == (t = this.$element.find("input")).prop("type") &&
              (t.prop("checked") && this.$element.hasClass("active")
                ? (e = !1)
                : i.find(".active").removeClass("active")),
            e &&
              t
                .prop("checked", !this.$element.hasClass("active"))
                .trigger("change"))
          : this.$element.attr(
              "aria-pressed",
              !this.$element.hasClass("active")
            ),
          e && this.$element.toggleClass("active");
      });
    var t = s.fn.button;
    (s.fn.button = i),
      (s.fn.button.Constructor = n),
      (s.fn.button.noConflict = function () {
        return (s.fn.button = t), this;
      }),
      s(document)
        .on(
          "click.bs.button.data-api",
          '[data-toggle^="button"]',
          function (t) {
            var e = s(t.target);
            e.hasClass("btn") || (e = e.closest(".btn")),
              i.call(e, "toggle"),
              t.preventDefault();
          }
        )
        .on(
          "focus.bs.button.data-api blur.bs.button.data-api",
          '[data-toggle^="button"]',
          function (t) {
            s(t.target)
              .closest(".btn")
              .toggleClass("focus", /^focus(in)?$/.test(t.type));
          }
        );
  })(jQuery),
  (function (h) {
    "use strict";
    function d(t, e) {
      (this.$element = h(t)),
        (this.$indicators = this.$element.find(".carousel-indicators")),
        (this.options = e),
        (this.paused = null),
        (this.sliding = null),
        (this.interval = null),
        (this.$active = null),
        (this.$items = null),
        this.options.keyboard &&
          this.$element.on("keydown.bs.carousel", h.proxy(this.keydown, this)),
        "hover" != this.options.pause ||
          "ontouchstart" in document.documentElement ||
          this.$element
            .on("mouseenter.bs.carousel", h.proxy(this.pause, this))
            .on("mouseleave.bs.carousel", h.proxy(this.cycle, this));
    }
    function n(n) {
      return this.each(function () {
        var t = h(this),
          e = t.data("bs.carousel"),
          i = h.extend({}, d.DEFAULTS, t.data(), "object" == typeof n && n),
          o = "string" == typeof n ? n : i.slide;
        e || t.data("bs.carousel", (e = new d(this, i))),
          "number" == typeof n
            ? e.to(n)
            : o
            ? e[o]()
            : i.interval && e.pause().cycle();
      });
    }
    (d.VERSION = "3.3.4"),
      (d.TRANSITION_DURATION = 600),
      (d.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }),
      (d.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
          switch (t.which) {
            case 37:
              this.prev();
              break;
            case 39:
              this.next();
              break;
            default:
              return;
          }
          t.preventDefault();
        }
      }),
      (d.prototype.cycle = function (t) {
        return (
          t || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              h.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      }),
      (d.prototype.getItemIndex = function (t) {
        return (
          (this.$items = t.parent().children(".item")),
          this.$items.index(t || this.$active)
        );
      }),
      (d.prototype.getItemForDirection = function (t, e) {
        var i = this.getItemIndex(e);
        if (
          (("prev" == t && 0 === i) ||
            ("next" == t && i == this.$items.length - 1)) &&
          !this.options.wrap
        )
          return e;
        t = (i + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(t);
      }),
      (d.prototype.to = function (t) {
        var e = this,
          i = this.getItemIndex(
            (this.$active = this.$element.find(".item.active"))
          );
        if (!(t > this.$items.length - 1 || t < 0))
          return this.sliding
            ? this.$element.one("slid.bs.carousel", function () {
                e.to(t);
              })
            : i == t
            ? this.pause().cycle()
            : this.slide(i < t ? "next" : "prev", this.$items.eq(t));
      }),
      (d.prototype.pause = function (t) {
        return (
          t || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            h.support.transition &&
            (this.$element.trigger(h.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (d.prototype.next = function () {
        if (!this.sliding) return this.slide("next");
      }),
      (d.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev");
      }),
      (d.prototype.slide = function (t, e) {
        var i = this.$element.find(".item.active"),
          o = e || this.getItemForDirection(t, i),
          n = this.interval,
          s = "next" == t ? "left" : "right",
          a = this;
        if (o.hasClass("active")) return (this.sliding = !1);
        var r = o[0],
          e = h.Event("slide.bs.carousel", { relatedTarget: r, direction: s });
        if ((this.$element.trigger(e), !e.isDefaultPrevented())) {
          (this.sliding = !0),
            n && this.pause(),
            this.$indicators.length &&
              (this.$indicators.find(".active").removeClass("active"),
              (e = h(this.$indicators.children()[this.getItemIndex(o)])) &&
                e.addClass("active"));
          var l = h.Event("slid.bs.carousel", {
            relatedTarget: r,
            direction: s,
          });
          return (
            h.support.transition && this.$element.hasClass("slide")
              ? (o.addClass(t),
                o[0].offsetWidth,
                i.addClass(s),
                o.addClass(s),
                i
                  .one("bsTransitionEnd", function () {
                    o.removeClass([t, s].join(" ")).addClass("active"),
                      i.removeClass(["active", s].join(" ")),
                      (a.sliding = !1),
                      setTimeout(function () {
                        a.$element.trigger(l);
                      }, 0);
                  })
                  .emulateTransitionEnd(d.TRANSITION_DURATION))
              : (i.removeClass("active"),
                o.addClass("active"),
                (this.sliding = !1),
                this.$element.trigger(l)),
            n && this.cycle(),
            this
          );
        }
      });
    var t = h.fn.carousel;
    function e(t) {
      var e,
        i = h(this),
        o = h(
          i.attr("data-target") ||
            ((e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""))
        );
      o.hasClass("carousel") &&
        ((e = h.extend({}, o.data(), i.data())),
        (i = i.attr("data-slide-to")) && (e.interval = !1),
        n.call(o, e),
        i && o.data("bs.carousel").to(i),
        t.preventDefault());
    }
    (h.fn.carousel = n),
      (h.fn.carousel.Constructor = d),
      (h.fn.carousel.noConflict = function () {
        return (h.fn.carousel = t), this;
      }),
      h(document)
        .on("click.bs.carousel.data-api", "[data-slide]", e)
        .on("click.bs.carousel.data-api", "[data-slide-to]", e),
      h(window).on("load", function () {
        h('[data-ride="carousel"]').each(function () {
          var t = h(this);
          n.call(t, t.data());
        });
      });
  })(jQuery),
  (function (n) {
    "use strict";
    var s = function (t, e) {
      (this.$element = n(t)),
        (this.options = n.extend({}, s.DEFAULTS, e)),
        (this.$trigger = n(
          '[data-toggle="collapse"][href="#' +
            t.id +
            '"],[data-toggle="collapse"][data-target="#' +
            t.id +
            '"]'
        )),
        (this.transitioning = null),
        this.options.parent
          ? (this.$parent = this.getParent())
          : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    function i(t) {
      var e =
        t.attr("data-target") ||
        ((e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""));
      return n(e);
    }
    function a(o) {
      return this.each(function () {
        var t = n(this),
          e = t.data("bs.collapse"),
          i = n.extend({}, s.DEFAULTS, t.data(), "object" == typeof o && o);
        !e && i.toggle && /show|hide/.test(o) && (i.toggle = !1),
          e || t.data("bs.collapse", (e = new s(this, i))),
          "string" == typeof o && e[o]();
      });
    }
    (s.VERSION = "3.3.4"),
      (s.TRANSITION_DURATION = 350),
      (s.DEFAULTS = { toggle: !0 }),
      (s.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height";
      }),
      (s.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var t =
            this.$parent &&
            this.$parent.children(".panel").children(".in, .collapsing");
          if (
            !(t && t.length && (o = t.data("bs.collapse")) && o.transitioning)
          ) {
            var e = n.Event("show.bs.collapse");
            if ((this.$element.trigger(e), !e.isDefaultPrevented())) {
              t &&
                t.length &&
                (a.call(t, "hide"), o || t.data("bs.collapse", null));
              var i = this.dimension();
              this.$element
                .removeClass("collapse")
                .addClass("collapsing")
                [i](0)
                .attr("aria-expanded", !0),
                this.$trigger
                  .removeClass("collapsed")
                  .attr("aria-expanded", !0),
                (this.transitioning = 1);
              var o = function () {
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse in")
                  [i](""),
                  (this.transitioning = 0),
                  this.$element.trigger("shown.bs.collapse");
              };
              if (!n.support.transition) return o.call(this);
              t = n.camelCase(["scroll", i].join("-"));
              this.$element
                .one("bsTransitionEnd", n.proxy(o, this))
                .emulateTransitionEnd(s.TRANSITION_DURATION)
                [i](this.$element[0][t]);
            }
          }
        }
      }),
      (s.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var t = n.Event("hide.bs.collapse");
          if ((this.$element.trigger(t), !t.isDefaultPrevented())) {
            var e = this.dimension();
            this.$element[e](this.$element[e]())[0].offsetHeight,
              this.$element
                .addClass("collapsing")
                .removeClass("collapse in")
                .attr("aria-expanded", !1),
              this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
              (this.transitioning = 1);
            t = function () {
              (this.transitioning = 0),
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse")
                  .trigger("hidden.bs.collapse");
            };
            if (!n.support.transition) return t.call(this);
            this.$element[e](0)
              .one("bsTransitionEnd", n.proxy(t, this))
              .emulateTransitionEnd(s.TRANSITION_DURATION);
          }
        }
      }),
      (s.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      }),
      (s.prototype.getParent = function () {
        return n(this.options.parent)
          .find(
            '[data-toggle="collapse"][data-parent="' +
              this.options.parent +
              '"]'
          )
          .each(
            n.proxy(function (t, e) {
              e = n(e);
              this.addAriaAndCollapsedClass(i(e), e);
            }, this)
          )
          .end();
      }),
      (s.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i),
          e.toggleClass("collapsed", !i).attr("aria-expanded", i);
      });
    var t = n.fn.collapse;
    (n.fn.collapse = a),
      (n.fn.collapse.Constructor = s),
      (n.fn.collapse.noConflict = function () {
        return (n.fn.collapse = t), this;
      }),
      n(document).on(
        "click.bs.collapse.data-api",
        '[data-toggle="collapse"]',
        function (t) {
          var e = n(this);
          e.attr("data-target") || t.preventDefault();
          (t = i(e)), (e = t.data("bs.collapse") ? "toggle" : e.data());
          a.call(t, e);
        }
      );
  })(jQuery),
  (function (n) {
    "use strict";
    function o(t) {
      n(t).on("click.bs.dropdown", this.toggle);
    }
    var s = '[data-toggle="dropdown"]';
    function a(o) {
      (o && 3 === o.which) ||
        (n(".dropdown-backdrop").remove(),
        n(s).each(function () {
          var t = n(this),
            e = r(t),
            i = { relatedTarget: this };
          e.hasClass("open") &&
            (e.trigger((o = n.Event("hide.bs.dropdown", i))),
            o.isDefaultPrevented() ||
              (t.attr("aria-expanded", "false"),
              e.removeClass("open").trigger("hidden.bs.dropdown", i)));
        }));
    }
    function r(t) {
      var e = t.attr("data-target"),
        e =
          (e =
            e ||
            ((e = t.attr("href")) &&
              /#[A-Za-z]/.test(e) &&
              e.replace(/.*(?=#[^\s]*$)/, ""))) && n(e);
      return e && e.length ? e : t.parent();
    }
    (o.VERSION = "3.3.4"),
      (o.prototype.toggle = function (t) {
        var e = n(this);
        if (!e.is(".disabled, :disabled")) {
          var i = r(e),
            o = i.hasClass("open");
          if ((a(), !o)) {
            "ontouchstart" in document.documentElement &&
              !i.closest(".navbar-nav").length &&
              n('<div class="dropdown-backdrop"/>')
                .insertAfter(n(this))
                .on("click", a);
            o = { relatedTarget: this };
            if (
              (i.trigger((t = n.Event("show.bs.dropdown", o))),
              t.isDefaultPrevented())
            )
              return;
            e.trigger("focus").attr("aria-expanded", "true"),
              i.toggleClass("open").trigger("shown.bs.dropdown", o);
          }
          return !1;
        }
      }),
      (o.prototype.keydown = function (t) {
        if (
          /(38|40|27|32)/.test(t.which) &&
          !/input|textarea/i.test(t.target.tagName)
        ) {
          var e = n(this);
          if (
            (t.preventDefault(),
            t.stopPropagation(),
            !e.is(".disabled, :disabled"))
          ) {
            var i = r(e),
              o = i.hasClass("open");
            if ((!o && 27 != t.which) || (o && 27 == t.which))
              return (
                27 == t.which && i.find(s).trigger("focus"), e.trigger("click")
              );
            (e = " li:not(.disabled):visible a"),
              (i = i.find('[role="menu"]' + e + ', [role="listbox"]' + e));
            i.length &&
              ((e = i.index(t.target)),
              38 == t.which && 0 < e && e--,
              40 == t.which && e < i.length - 1 && e++,
              ~e || (e = 0),
              i.eq(e).trigger("focus"));
          }
        }
      });
    var t = n.fn.dropdown;
    (n.fn.dropdown = function (i) {
      return this.each(function () {
        var t = n(this),
          e = t.data("bs.dropdown");
        e || t.data("bs.dropdown", (e = new o(this))),
          "string" == typeof i && e[i].call(t);
      });
    }),
      (n.fn.dropdown.Constructor = o),
      (n.fn.dropdown.noConflict = function () {
        return (n.fn.dropdown = t), this;
      }),
      n(document)
        .on("click.bs.dropdown.data-api", a)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
          t.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", s, o.prototype.toggle)
        .on("keydown.bs.dropdown.data-api", s, o.prototype.keydown)
        .on(
          "keydown.bs.dropdown.data-api",
          '[role="menu"]',
          o.prototype.keydown
        )
        .on(
          "keydown.bs.dropdown.data-api",
          '[role="listbox"]',
          o.prototype.keydown
        );
  })(jQuery),
  (function (s) {
    "use strict";
    function a(t, e) {
      (this.options = e),
        (this.$body = s(document.body)),
        (this.$element = s(t)),
        (this.$dialog = this.$element.find(".modal-dialog")),
        (this.$backdrop = null),
        (this.isShown = null),
        (this.originalBodyPad = null),
        (this.scrollbarWidth = 0),
        (this.ignoreBackdropClick = !1),
        this.options.remote &&
          this.$element.find(".modal-content").load(
            this.options.remote,
            s.proxy(function () {
              this.$element.trigger("loaded.bs.modal");
            }, this)
          );
    }
    function n(o, n) {
      return this.each(function () {
        var t = s(this),
          e = t.data("bs.modal"),
          i = s.extend({}, a.DEFAULTS, t.data(), "object" == typeof o && o);
        e || t.data("bs.modal", (e = new a(this, i))),
          "string" == typeof o ? e[o](n) : i.show && e.show(n);
      });
    }
    (a.VERSION = "3.3.4"),
      (a.TRANSITION_DURATION = 300),
      (a.BACKDROP_TRANSITION_DURATION = 150),
      (a.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (a.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t);
      }),
      (a.prototype.show = function (i) {
        var o = this,
          t = s.Event("show.bs.modal", { relatedTarget: i });
        this.$element.trigger(t),
          this.isShown ||
            t.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.setScrollbar(),
            this.$body.addClass("modal-open"),
            this.escape(),
            this.resize(),
            this.$element.on(
              "click.dismiss.bs.modal",
              '[data-dismiss="modal"]',
              s.proxy(this.hide, this)
            ),
            this.$dialog.on("mousedown.dismiss.bs.modal", function () {
              o.$element.one("mouseup.dismiss.bs.modal", function (t) {
                s(t.target).is(o.$element) && (o.ignoreBackdropClick = !0);
              });
            }),
            this.backdrop(function () {
              var t = s.support.transition && o.$element.hasClass("fade");
              o.$element.parent().length || o.$element.appendTo(o.$body),
                o.$element.show().scrollTop(0),
                o.adjustDialog(),
                t && o.$element[0].offsetWidth,
                o.$element.addClass("in").attr("aria-hidden", !1),
                o.enforceFocus();
              var e = s.Event("shown.bs.modal", { relatedTarget: i });
              t
                ? o.$dialog
                    .one("bsTransitionEnd", function () {
                      o.$element.trigger("focus").trigger(e);
                    })
                    .emulateTransitionEnd(a.TRANSITION_DURATION)
                : o.$element.trigger("focus").trigger(e);
            }));
      }),
      (a.prototype.hide = function (t) {
        t && t.preventDefault(),
          (t = s.Event("hide.bs.modal")),
          this.$element.trigger(t),
          this.isShown &&
            !t.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            s(document).off("focusin.bs.modal"),
            this.$element
              .removeClass("in")
              .attr("aria-hidden", !0)
              .off("click.dismiss.bs.modal")
              .off("mouseup.dismiss.bs.modal"),
            this.$dialog.off("mousedown.dismiss.bs.modal"),
            s.support.transition && this.$element.hasClass("fade")
              ? this.$element
                  .one("bsTransitionEnd", s.proxy(this.hideModal, this))
                  .emulateTransitionEnd(a.TRANSITION_DURATION)
              : this.hideModal());
      }),
      (a.prototype.enforceFocus = function () {
        s(document)
          .off("focusin.bs.modal")
          .on(
            "focusin.bs.modal",
            s.proxy(function (t) {
              this.$element[0] === t.target ||
                this.$element.has(t.target).length ||
                this.$element.trigger("focus");
            }, this)
          );
      }),
      (a.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              "keydown.dismiss.bs.modal",
              s.proxy(function (t) {
                27 == t.which && this.hide();
              }, this)
            )
          : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
      }),
      (a.prototype.resize = function () {
        this.isShown
          ? s(window).on("resize.bs.modal", s.proxy(this.handleUpdate, this))
          : s(window).off("resize.bs.modal");
      }),
      (a.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(),
          this.backdrop(function () {
            t.$body.removeClass("modal-open"),
              t.resetAdjustments(),
              t.resetScrollbar(),
              t.$element.trigger("hidden.bs.modal");
          });
      }),
      (a.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (a.prototype.backdrop = function (t) {
        var e,
          i = this,
          o = this.$element.hasClass("fade") ? "fade" : "";
        this.isShown && this.options.backdrop
          ? ((e = s.support.transition && o),
            (this.$backdrop = s(
              '<div class="modal-backdrop ' + o + '" />'
            ).appendTo(this.$body)),
            this.$element.on(
              "click.dismiss.bs.modal",
              s.proxy(function (t) {
                this.ignoreBackdropClick
                  ? (this.ignoreBackdropClick = !1)
                  : t.target === t.currentTarget &&
                    ("static" == this.options.backdrop
                      ? this.$element[0].focus()
                      : this.hide());
              }, this)
            ),
            e && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            t &&
              (e
                ? this.$backdrop
                    .one("bsTransitionEnd", t)
                    .emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION)
                : t()))
          : !this.isShown && this.$backdrop
          ? (this.$backdrop.removeClass("in"),
            (e = function () {
              i.removeBackdrop(), t && t();
            }),
            s.support.transition && this.$element.hasClass("fade")
              ? this.$backdrop
                  .one("bsTransitionEnd", e)
                  .emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION)
              : e())
          : t && t();
      }),
      (a.prototype.handleUpdate = function () {
        this.adjustDialog();
      }),
      (a.prototype.adjustDialog = function () {
        var t =
          this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
          paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : "",
        });
      }),
      (a.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: "", paddingRight: "" });
      }),
      (a.prototype.checkScrollbar = function () {
        var t,
          e = window.innerWidth;
        e ||
          (e =
            (t = document.documentElement.getBoundingClientRect()).right -
            Math.abs(t.left)),
          (this.bodyIsOverflowing = document.body.clientWidth < e),
          (this.scrollbarWidth = this.measureScrollbar());
      }),
      (a.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        (this.originalBodyPad = document.body.style.paddingRight || ""),
          this.bodyIsOverflowing &&
            this.$body.css("padding-right", t + this.scrollbarWidth);
      }),
      (a.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad);
      }),
      (a.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        (t.className = "modal-scrollbar-measure"), this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e;
      });
    var t = s.fn.modal;
    (s.fn.modal = n),
      (s.fn.modal.Constructor = a),
      (s.fn.modal.noConflict = function () {
        return (s.fn.modal = t), this;
      }),
      s(document).on(
        "click.bs.modal.data-api",
        '[data-toggle="modal"]',
        function (t) {
          var e = s(this),
            i = e.attr("href"),
            o = s(
              e.attr("data-target") || (i && i.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            i = o.data("bs.modal")
              ? "toggle"
              : s.extend({ remote: !/#/.test(i) && i }, o.data(), e.data());
          e.is("a") && t.preventDefault(),
            o.one("show.bs.modal", function (t) {
              t.isDefaultPrevented() ||
                o.one("hidden.bs.modal", function () {
                  e.is(":visible") && e.trigger("focus");
                });
            }),
            n.call(o, i, this);
        }
      );
  })(jQuery),
  (function (l) {
    "use strict";
    function h(t, e) {
      (this.type = null),
        (this.options = null),
        (this.enabled = null),
        (this.timeout = null),
        (this.hoverState = null),
        (this.$element = null),
        this.init("tooltip", t, e);
    }
    (h.VERSION = "3.3.4"),
      (h.TRANSITION_DURATION = 150),
      (h.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
      }),
      (h.prototype.init = function (t, e, i) {
        if (
          ((this.enabled = !0),
          (this.type = t),
          (this.$element = l(e)),
          (this.options = this.getOptions(i)),
          (this.$viewport =
            this.options.viewport &&
            l(this.options.viewport.selector || this.options.viewport)),
          this.$element[0] instanceof document.constructor &&
            !this.options.selector)
        )
          throw new Error(
            "`selector` option must be specified when initializing " +
              this.type +
              " on the window.document object!"
          );
        for (var o = this.options.trigger.split(" "), n = o.length; n--; ) {
          var s,
            a = o[n];
          "click" == a
            ? this.$element.on(
                "click." + this.type,
                this.options.selector,
                l.proxy(this.toggle, this)
              )
            : "manual" != a &&
              ((s = "hover" == a ? "mouseenter" : "focusin"),
              (a = "hover" == a ? "mouseleave" : "focusout"),
              this.$element.on(
                s + "." + this.type,
                this.options.selector,
                l.proxy(this.enter, this)
              ),
              this.$element.on(
                a + "." + this.type,
                this.options.selector,
                l.proxy(this.leave, this)
              ));
        }
        this.options.selector
          ? (this._options = l.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (h.prototype.getDefaults = function () {
        return h.DEFAULTS;
      }),
      (h.prototype.getOptions = function (t) {
        return (
          (t = l.extend({}, this.getDefaults(), this.$element.data(), t))
            .delay &&
            "number" == typeof t.delay &&
            (t.delay = { show: t.delay, hide: t.delay }),
          t
        );
      }),
      (h.prototype.getDelegateOptions = function () {
        var i = {},
          o = this.getDefaults();
        return (
          this._options &&
            l.each(this._options, function (t, e) {
              o[t] != e && (i[t] = e);
            }),
          i
        );
      }),
      (h.prototype.enter = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : l(t.currentTarget).data("bs." + this.type);
        if (e && e.$tip && e.$tip.is(":visible")) e.hoverState = "in";
        else {
          if (
            (e ||
              ((e = new this.constructor(
                t.currentTarget,
                this.getDelegateOptions()
              )),
              l(t.currentTarget).data("bs." + this.type, e)),
            clearTimeout(e.timeout),
            (e.hoverState = "in"),
            !e.options.delay || !e.options.delay.show)
          )
            return e.show();
          e.timeout = setTimeout(function () {
            "in" == e.hoverState && e.show();
          }, e.options.delay.show);
        }
      }),
      (h.prototype.leave = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : l(t.currentTarget).data("bs." + this.type);
        if (
          (e ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            l(t.currentTarget).data("bs." + this.type, e)),
          clearTimeout(e.timeout),
          (e.hoverState = "out"),
          !e.options.delay || !e.options.delay.hide)
        )
          return e.hide();
        e.timeout = setTimeout(function () {
          "out" == e.hoverState && e.hide();
        }, e.options.delay.hide);
      }),
      (h.prototype.show = function () {
        var e,
          t,
          i,
          o,
          n,
          s,
          a,
          r = l.Event("show.bs." + this.type);
        this.hasContent() &&
          this.enabled &&
          (this.$element.trigger(r),
          (i = l.contains(
            this.$element[0].ownerDocument.documentElement,
            this.$element[0]
          )),
          !r.isDefaultPrevented() &&
            i &&
            ((t = (e = this).tip()),
            (s = this.getUID(this.type)),
            this.setContent(),
            t.attr("id", s),
            this.$element.attr("aria-describedby", s),
            this.options.animation && t.addClass("fade"),
            (a =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, t[0], this.$element[0])
                : this.options.placement),
            (n = (o = /\s?auto?\s?/i).test(a)) &&
              (a = a.replace(o, "") || "top"),
            t
              .detach()
              .css({ top: 0, left: 0, display: "block" })
              .addClass(a)
              .data("bs." + this.type, this),
            this.options.container
              ? t.appendTo(this.options.container)
              : t.insertAfter(this.$element),
            (r = this.getPosition()),
            (i = t[0].offsetWidth),
            (s = t[0].offsetHeight),
            n &&
              ((o = a),
              (n = this.options.container
                ? l(this.options.container)
                : this.$element.parent()),
              (n = this.getPosition(n)),
              (a =
                "bottom" == a && r.bottom + s > n.bottom
                  ? "top"
                  : "top" == a && r.top - s < n.top
                  ? "bottom"
                  : "right" == a && r.right + i > n.width
                  ? "left"
                  : "left" == a && r.left - i < n.left
                  ? "right"
                  : a),
              t.removeClass(o).addClass(a)),
            (s = this.getCalculatedOffset(a, r, i, s)),
            this.applyPlacement(s, a),
            (a = function () {
              var t = e.hoverState;
              e.$element.trigger("shown.bs." + e.type),
                (e.hoverState = null),
                "out" == t && e.leave(e);
            }),
            l.support.transition && this.$tip.hasClass("fade")
              ? t
                  .one("bsTransitionEnd", a)
                  .emulateTransitionEnd(h.TRANSITION_DURATION)
              : a()));
      }),
      (h.prototype.applyPlacement = function (t, e) {
        var i = this.tip(),
          o = i[0].offsetWidth,
          n = i[0].offsetHeight,
          s = parseInt(i.css("margin-top"), 10),
          a = parseInt(i.css("margin-left"), 10);
        isNaN(s) && (s = 0),
          isNaN(a) && (a = 0),
          (t.top = t.top + s),
          (t.left = t.left + a),
          l.offset.setOffset(
            i[0],
            l.extend(
              {
                using: function (t) {
                  i.css({ top: Math.round(t.top), left: Math.round(t.left) });
                },
              },
              t
            ),
            0
          ),
          i.addClass("in");
        var r = i[0].offsetWidth,
          s = i[0].offsetHeight;
        "top" == e && s != n && (t.top = t.top + n - s);
        a = this.getViewportAdjustedDelta(e, t, r, s);
        a.left ? (t.left += a.left) : (t.top += a.top);
        (e = /top|bottom/.test(e)),
          (n = e ? 2 * a.left - o + r : 2 * a.top - n + s),
          (s = e ? "offsetWidth" : "offsetHeight");
        i.offset(t), this.replaceArrow(n, i[0][s], e);
      }),
      (h.prototype.replaceArrow = function (t, e, i) {
        this.arrow()
          .css(i ? "left" : "top", 50 * (1 - t / e) + "%")
          .css(i ? "top" : "left", "");
      }),
      (h.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
          t.removeClass("fade in top bottom left right");
      }),
      (h.prototype.hide = function (t) {
        var e = this,
          i = l(this.$tip),
          o = l.Event("hide.bs." + this.type);
        function n() {
          "in" != e.hoverState && i.detach(),
            e.$element
              .removeAttr("aria-describedby")
              .trigger("hidden.bs." + e.type),
            t && t();
        }
        if ((this.$element.trigger(o), !o.isDefaultPrevented()))
          return (
            i.removeClass("in"),
            l.support.transition && i.hasClass("fade")
              ? i
                  .one("bsTransitionEnd", n)
                  .emulateTransitionEnd(h.TRANSITION_DURATION)
              : n(),
            (this.hoverState = null),
            this
          );
      }),
      (h.prototype.fixTitle = function () {
        var t = this.$element;
        (!t.attr("title") &&
          "string" == typeof t.attr("data-original-title")) ||
          t
            .attr("data-original-title", t.attr("title") || "")
            .attr("title", "");
      }),
      (h.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (h.prototype.getPosition = function (t) {
        var e = (t = t || this.$element)[0],
          i = "BODY" == e.tagName,
          o = e.getBoundingClientRect();
        null == o.width &&
          (o = l.extend({}, o, {
            width: o.right - o.left,
            height: o.bottom - o.top,
          }));
        (e = i ? { top: 0, left: 0 } : t.offset()),
          (t = {
            scroll: i
              ? document.documentElement.scrollTop || document.body.scrollTop
              : t.scrollTop(),
          }),
          (i = i
            ? { width: l(window).width(), height: l(window).height() }
            : null);
        return l.extend({}, o, t, i, e);
      }),
      (h.prototype.getCalculatedOffset = function (t, e, i, o) {
        return "bottom" == t
          ? { top: e.top + e.height, left: e.left + e.width / 2 - i / 2 }
          : "top" == t
          ? { top: e.top - o, left: e.left + e.width / 2 - i / 2 }
          : "left" == t
          ? { top: e.top + e.height / 2 - o / 2, left: e.left - i }
          : { top: e.top + e.height / 2 - o / 2, left: e.left + e.width };
      }),
      (h.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
        var n = { top: 0, left: 0 };
        if (!this.$viewport) return n;
        var s,
          a = (this.options.viewport && this.options.viewport.padding) || 0,
          r = this.getPosition(this.$viewport);
        return (
          /right|left/.test(t)
            ? ((t = e.top - a - r.scroll),
              (s = e.top + a - r.scroll + o),
              t < r.top
                ? (n.top = r.top - t)
                : s > r.top + r.height && (n.top = r.top + r.height - s))
            : ((s = e.left - a),
              (i = e.left + a + i),
              s < r.left
                ? (n.left = r.left - s)
                : i > r.width && (n.left = r.left + r.width - i)),
          n
        );
      }),
      (h.prototype.getTitle = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr("data-original-title") ||
          ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
        );
      }),
      (h.prototype.getUID = function (t) {
        for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
        return t;
      }),
      (h.prototype.tip = function () {
        return (this.$tip = this.$tip || l(this.options.template));
      }),
      (h.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (h.prototype.enable = function () {
        this.enabled = !0;
      }),
      (h.prototype.disable = function () {
        this.enabled = !1;
      }),
      (h.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (h.prototype.toggle = function (t) {
        var e = this;
        t &&
          ((e = l(t.currentTarget).data("bs." + this.type)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            l(t.currentTarget).data("bs." + this.type, e))),
          e.tip().hasClass("in") ? e.leave(e) : e.enter(e);
      }),
      (h.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout),
          this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type);
          });
      });
    var t = l.fn.tooltip;
    (l.fn.tooltip = function (o) {
      return this.each(function () {
        var t = l(this),
          e = t.data("bs.tooltip"),
          i = "object" == typeof o && o;
        (!e && /destroy|hide/.test(o)) ||
          (e || t.data("bs.tooltip", (e = new h(this, i))),
          "string" == typeof o && e[o]());
      });
    }),
      (l.fn.tooltip.Constructor = h),
      (l.fn.tooltip.noConflict = function () {
        return (l.fn.tooltip = t), this;
      });
  })(jQuery),
  (function (n) {
    "use strict";
    function s(t, e) {
      this.init("popover", t, e);
    }
    if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (s.VERSION = "3.3.4"),
      (s.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (((s.prototype = n.extend(
        {},
        n.fn.tooltip.Constructor.prototype
      )).constructor = s).prototype.getDefaults = function () {
        return s.DEFAULTS;
      }),
      (s.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle(),
          i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e),
          t
            .find(".popover-content")
            .children()
            .detach()
            .end()
            [
              this.options.html
                ? "string" == typeof i
                  ? "html"
                  : "append"
                : "text"
            ](i),
          t.removeClass("fade top bottom left right in"),
          t.find(".popover-title").html() || t.find(".popover-title").hide();
      }),
      (s.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (s.prototype.getContent = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr("data-content") ||
          ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
        );
      }),
      (s.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      });
    var t = n.fn.popover;
    (n.fn.popover = function (o) {
      return this.each(function () {
        var t = n(this),
          e = t.data("bs.popover"),
          i = "object" == typeof o && o;
        (!e && /destroy|hide/.test(o)) ||
          (e || t.data("bs.popover", (e = new s(this, i))),
          "string" == typeof o && e[o]());
      });
    }),
      (n.fn.popover.Constructor = s),
      (n.fn.popover.noConflict = function () {
        return (n.fn.popover = t), this;
      });
  })(jQuery),
  (function (n) {
    "use strict";
    function s(t, e) {
      (this.$body = n(document.body)),
        (this.$scrollElement = n(t).is(document.body) ? n(window) : n(t)),
        (this.options = n.extend({}, s.DEFAULTS, e)),
        (this.selector = (this.options.target || "") + " .nav li > a"),
        (this.offsets = []),
        (this.targets = []),
        (this.activeTarget = null),
        (this.scrollHeight = 0),
        this.$scrollElement.on(
          "scroll.bs.scrollspy",
          n.proxy(this.process, this)
        ),
        this.refresh(),
        this.process();
    }
    function e(o) {
      return this.each(function () {
        var t = n(this),
          e = t.data("bs.scrollspy"),
          i = "object" == typeof o && o;
        e || t.data("bs.scrollspy", (e = new s(this, i))),
          "string" == typeof o && e[o]();
      });
    }
    (s.VERSION = "3.3.4"),
      (s.DEFAULTS = { offset: 10 }),
      (s.prototype.getScrollHeight = function () {
        return (
          this.$scrollElement[0].scrollHeight ||
          Math.max(
            this.$body[0].scrollHeight,
            document.documentElement.scrollHeight
          )
        );
      }),
      (s.prototype.refresh = function () {
        var t = this,
          i = "offset",
          o = 0;
        (this.offsets = []),
          (this.targets = []),
          (this.scrollHeight = this.getScrollHeight()),
          n.isWindow(this.$scrollElement[0]) ||
            ((i = "position"), (o = this.$scrollElement.scrollTop())),
          this.$body
            .find(this.selector)
            .map(function () {
              var t = n(this),
                e = t.data("target") || t.attr("href"),
                t = /^#./.test(e) && n(e);
              return t && t.length && t.is(":visible")
                ? [[t[i]().top + o, e]]
                : null;
            })
            .sort(function (t, e) {
              return t[0] - e[0];
            })
            .each(function () {
              t.offsets.push(this[0]), t.targets.push(this[1]);
            });
      }),
      (s.prototype.process = function () {
        var t,
          e = this.$scrollElement.scrollTop() + this.options.offset,
          i = this.getScrollHeight(),
          o = this.options.offset + i - this.$scrollElement.height(),
          n = this.offsets,
          s = this.targets,
          a = this.activeTarget;
        if ((this.scrollHeight != i && this.refresh(), o <= e))
          return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0]) return (this.activeTarget = null), this.clear();
        for (t = n.length; t--; )
          a != s[t] &&
            e >= n[t] &&
            (void 0 === n[t + 1] || e < n[t + 1]) &&
            this.activate(s[t]);
      }),
      (s.prototype.activate = function (t) {
        (this.activeTarget = t), this.clear();
        (t =
          this.selector +
          '[data-target="' +
          t +
          '"],' +
          this.selector +
          '[href="' +
          t +
          '"]'),
          (t = n(t).parents("li").addClass("active"));
        t.parent(".dropdown-menu").length &&
          (t = t.closest("li.dropdown").addClass("active")),
          t.trigger("activate.bs.scrollspy");
      }),
      (s.prototype.clear = function () {
        n(this.selector)
          .parentsUntil(this.options.target, ".active")
          .removeClass("active");
      });
    var t = n.fn.scrollspy;
    (n.fn.scrollspy = e),
      (n.fn.scrollspy.Constructor = s),
      (n.fn.scrollspy.noConflict = function () {
        return (n.fn.scrollspy = t), this;
      }),
      n(window).on("load.bs.scrollspy.data-api", function () {
        n('[data-spy="scroll"]').each(function () {
          var t = n(this);
          e.call(t, t.data());
        });
      });
  })(jQuery),
  (function (a) {
    "use strict";
    function r(t) {
      this.element = a(t);
    }
    function e(i) {
      return this.each(function () {
        var t = a(this),
          e = t.data("bs.tab");
        e || t.data("bs.tab", (e = new r(this))),
          "string" == typeof i && e[i]();
      });
    }
    (r.VERSION = "3.3.4"),
      (r.TRANSITION_DURATION = 150),
      (r.prototype.show = function () {
        var t,
          e,
          i,
          o = this.element,
          n = o.closest("ul:not(.dropdown-menu)"),
          s =
            (s = o.data("target")) ||
            ((s = o.attr("href")) && s.replace(/.*(?=#[^\s]*$)/, ""));
        o.parent("li").hasClass("active") ||
          ((t = n.find(".active:last a")),
          (e = a.Event("hide.bs.tab", { relatedTarget: o[0] })),
          (i = a.Event("show.bs.tab", { relatedTarget: t[0] })),
          t.trigger(e),
          o.trigger(i),
          i.isDefaultPrevented() ||
            e.isDefaultPrevented() ||
            ((s = a(s)),
            this.activate(o.closest("li"), n),
            this.activate(s, s.parent(), function () {
              t.trigger({ type: "hidden.bs.tab", relatedTarget: o[0] }),
                o.trigger({ type: "shown.bs.tab", relatedTarget: t[0] });
            })));
      }),
      (r.prototype.activate = function (t, e, i) {
        var o = e.find("> .active"),
          n =
            i &&
            a.support.transition &&
            ((o.length && o.hasClass("fade")) || !!e.find("> .fade").length);
        function s() {
          o
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active")
            .end()
            .find('[data-toggle="tab"]')
            .attr("aria-expanded", !1),
            t
              .addClass("active")
              .find('[data-toggle="tab"]')
              .attr("aria-expanded", !0),
            n ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"),
            t.parent(".dropdown-menu").length &&
              t
                .closest("li.dropdown")
                .addClass("active")
                .end()
                .find('[data-toggle="tab"]')
                .attr("aria-expanded", !0),
            i && i();
        }
        o.length && n
          ? o
              .one("bsTransitionEnd", s)
              .emulateTransitionEnd(r.TRANSITION_DURATION)
          : s(),
          o.removeClass("in");
      });
    var t = a.fn.tab;
    function i(t) {
      t.preventDefault(), e.call(a(this), "show");
    }
    (a.fn.tab = e),
      (a.fn.tab.Constructor = r),
      (a.fn.tab.noConflict = function () {
        return (a.fn.tab = t), this;
      }),
      a(document)
        .on("click.bs.tab.data-api", '[data-toggle="tab"]', i)
        .on("click.bs.tab.data-api", '[data-toggle="pill"]', i);
  })(jQuery),
  (function (a) {
    "use strict";
    var r = function (t, e) {
      (this.options = a.extend({}, r.DEFAULTS, e)),
        (this.$target = a(this.options.target)
          .on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this))
          .on(
            "click.bs.affix.data-api",
            a.proxy(this.checkPositionWithEventLoop, this)
          )),
        (this.$element = a(t)),
        (this.affixed = null),
        (this.unpin = null),
        (this.pinnedOffset = null),
        this.checkPosition();
    };
    function i(o) {
      return this.each(function () {
        var t = a(this),
          e = t.data("bs.affix"),
          i = "object" == typeof o && o;
        e || t.data("bs.affix", (e = new r(this, i))),
          "string" == typeof o && e[o]();
      });
    }
    (r.VERSION = "3.3.4"),
      (r.RESET = "affix affix-top affix-bottom"),
      (r.DEFAULTS = { offset: 0, target: window }),
      (r.prototype.getState = function (t, e, i, o) {
        var n = this.$target.scrollTop(),
          s = this.$element.offset(),
          a = this.$target.height();
        if (null != i && "top" == this.affixed) return n < i && "top";
        if ("bottom" == this.affixed)
          return null != i
            ? !(n + this.unpin <= s.top) && "bottom"
            : !(n + a <= t - o) && "bottom";
        var r = null == this.affixed,
          s = r ? n : s.top;
        return null != i && n <= i
          ? "top"
          : null != o && t - o <= s + (r ? a : e) && "bottom";
      }),
      (r.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(r.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
          e = this.$element.offset();
        return (this.pinnedOffset = e.top - t);
      }),
      (r.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1);
      }),
      (r.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
          var t = this.$element.height(),
            e = this.options.offset,
            i = e.top,
            o = e.bottom,
            n = a(document.body).height();
          "object" != typeof e && (o = i = e),
            "function" == typeof i && (i = e.top(this.$element)),
            "function" == typeof o && (o = e.bottom(this.$element));
          var s = this.getState(n, t, i, o);
          if (this.affixed != s) {
            null != this.unpin && this.$element.css("top", "");
            (e = "affix" + (s ? "-" + s : "")), (i = a.Event(e + ".bs.affix"));
            if ((this.$element.trigger(i), i.isDefaultPrevented())) return;
            (this.affixed = s),
              (this.unpin = "bottom" == s ? this.getPinnedOffset() : null),
              this.$element
                .removeClass(r.RESET)
                .addClass(e)
                .trigger(e.replace("affix", "affixed") + ".bs.affix");
          }
          "bottom" == s && this.$element.offset({ top: n - t - o });
        }
      });
    var t = a.fn.affix;
    (a.fn.affix = i),
      (a.fn.affix.Constructor = r),
      (a.fn.affix.noConflict = function () {
        return (a.fn.affix = t), this;
      }),
      a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
          var t = a(this),
            e = t.data();
          (e.offset = e.offset || {}),
            null != e.offsetBottom && (e.offset.bottom = e.offsetBottom),
            null != e.offsetTop && (e.offset.top = e.offsetTop),
            i.call(t, e);
        });
      });
  })(jQuery);
