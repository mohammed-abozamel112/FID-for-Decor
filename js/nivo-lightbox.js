!(function (g, v, t) {
  var o = "nivoLightbox",
    e = {
      effect: "fade",
      theme: "default",
      keyboardNav: !0,
      clickOverlayToClose: !0,
      onInit: function () {},
      beforeShowLightbox: function () {},
      afterShowLightbox: function (t) {},
      beforeHideLightbox: function () {},
      afterHideLightbox: function () {},
      onPrev: function (t) {},
      onNext: function (t) {},
      errorMessage:
        "The requested content cannot be loaded. Please try again later.",
    };
  function i(t, i) {
    (this.el = t),
      (this.$el = g(this.el)),
      (this.options = g.extend({}, e, i)),
      (this._defaults = e),
      (this._name = o),
      this.init();
  }
  (i.prototype = {
    init: function () {
      var i = this;
      g("html").hasClass("nivo-lightbox-notouch") ||
        g("html").addClass("nivo-lightbox-notouch"),
        "ontouchstart" in t && g("html").removeClass("nivo-lightbox-notouch"),
        this.$el.on("click", function (t) {
          i.showLightbox(t);
        }),
        this.options.keyboardNav &&
          g("body")
            .off("keyup")
            .on("keyup", function (t) {
              t = t.keyCode || t.which;
              27 == t && i.destructLightbox(),
                37 == t && g(".nivo-lightbox-prev").trigger("click"),
                39 == t && g(".nivo-lightbox-next").trigger("click");
            }),
        this.options.onInit.call(this);
    },
    showLightbox: function (t) {
      var i,
        o,
        e,
        n = this,
        l = this.$el;
      this.checkContent(l) &&
        (t.preventDefault(),
        this.options.beforeShowLightbox.call(this),
        !(i = this.constructLightbox()) ||
          ((o = i.find(".nivo-lightbox-content")) &&
            (g("body").addClass(
              "nivo-lightbox-body-effect-" + this.options.effect
            ),
            this.processContent(o, l),
            this.$el.attr("data-lightbox-gallery") &&
              ((e = g(
                '[data-lightbox-gallery="' +
                  this.$el.attr("data-lightbox-gallery") +
                  '"]'
              )),
              g(".nivo-lightbox-nav").show(),
              g(".nivo-lightbox-prev")
                .off("click")
                .on("click", function (t) {
                  t.preventDefault();
                  t = e.index(l);
                  (l = e.eq(t - 1)),
                    g(l).length || (l = e.last()),
                    n.processContent(o, l),
                    n.options.onPrev.call(this, [l]);
                }),
              g(".nivo-lightbox-next")
                .off("click")
                .on("click", function (t) {
                  t.preventDefault();
                  t = e.index(l);
                  (l = e.eq(t + 1)),
                    g(l).length || (l = e.first()),
                    n.processContent(o, l),
                    n.options.onNext.call(this, [l]);
                })),
            setTimeout(function () {
              i.addClass("nivo-lightbox-open"),
                n.options.afterShowLightbox.call(this, [i]);
            }, 1))));
    },
    checkContent: function (t) {
      var i = t.attr("href"),
        o = i.match(
          /(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/
        );
      return (
        null !== i.match(/\.(jpeg|jpg|gif|png)$/i) ||
        !!o ||
        "ajax" == t.attr("data-lightbox-type") ||
        ("#" == i.substring(0, 1) &&
          "inline" == t.attr("data-lightbox-type")) ||
        "iframe" == t.attr("data-lightbox-type")
      );
    },
    processContent: function (o, t) {
      var i,
        e = this,
        n = t.attr("href"),
        l = n.match(
          /(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/
        );
      if (
        (o.html("").addClass("nivo-lightbox-loading"),
        this.isHidpi() &&
          t.attr("data-lightbox-hidpi") &&
          (n = t.attr("data-lightbox-hidpi")),
        null !== n.match(/\.(jpeg|jpg|gif|png)$/i))
      ) {
        var a = g("<img>", { src: n });
        a
          .one("load", function () {
            var t = g('<div class="nivo-lightbox-image" />');
            t.append(a),
              o.html(t).removeClass("nivo-lightbox-loading"),
              t.css({
                "line-height": g(".nivo-lightbox-content").height() + "px",
                height: g(".nivo-lightbox-content").height() + "px",
              }),
              g(v).resize(function () {
                t.css({
                  "line-height": g(".nivo-lightbox-content").height() + "px",
                  height: g(".nivo-lightbox-content").height() + "px",
                });
              });
          })
          .each(function () {
            this.complete && g(this).load();
          }),
          a.error(function () {
            var t = g(
              '<div class="nivo-lightbox-error"><p>' +
                e.options.errorMessage +
                "</p></div>"
            );
            o.html(t).removeClass("nivo-lightbox-loading");
          });
      } else if (l) {
        var h,
          s = "",
          r = "nivo-lightbox-video";
        "youtube" == l[1] &&
          ((s = "http://www.youtube.com/embed/" + l[4]),
          (r = "nivo-lightbox-youtube")),
          "youtu" == l[1] &&
            ((s = "http://www.youtube.com/embed/" + l[3]),
            (r = "nivo-lightbox-youtube")),
          "vimeo" == l[1] &&
            ((s = "http://player.vimeo.com/video/" + l[3]),
            (r = "nivo-lightbox-vimeo")),
          s &&
            ((h = g("<iframe>", {
              src: s,
              class: r,
              frameborder: 0,
              vspace: 0,
              hspace: 0,
              scrolling: "auto",
            })),
            o.html(h),
            h.load(function () {
              o.removeClass("nivo-lightbox-loading");
            }));
      } else if ("ajax" == t.attr("data-lightbox-type"))
        g.ajax({
          url: n,
          cache: !1,
          success: function (t) {
            var i = g('<div class="nivo-lightbox-ajax" />');
            i.append(t),
              o.html(i).removeClass("nivo-lightbox-loading"),
              i.outerHeight() < o.height() &&
                i.css({
                  position: "relative",
                  top: "50%",
                  "margin-top": -i.outerHeight() / 2 + "px",
                }),
              g(v).resize(function () {
                i.outerHeight() < o.height() &&
                  i.css({
                    position: "relative",
                    top: "50%",
                    "margin-top": -i.outerHeight() / 2 + "px",
                  });
              });
          },
          error: function () {
            var t = g(
              '<div class="nivo-lightbox-error"><p>' +
                e.options.errorMessage +
                "</p></div>"
            );
            o.html(t).removeClass("nivo-lightbox-loading");
          },
        });
      else if (
        "#" == n.substring(0, 1) &&
        "inline" == t.attr("data-lightbox-type")
      )
        g(n).length
          ? ((i = g('<div class="nivo-lightbox-inline" />')).append(
              g(n).clone().show()
            ),
            o.html(i).removeClass("nivo-lightbox-loading"),
            i.outerHeight() < o.height() &&
              i.css({
                position: "relative",
                top: "50%",
                "margin-top": -i.outerHeight() / 2 + "px",
              }),
            g(v).resize(function () {
              i.outerHeight() < o.height() &&
                i.css({
                  position: "relative",
                  top: "50%",
                  "margin-top": -i.outerHeight() / 2 + "px",
                });
            }))
          : ((h = g(
              '<div class="nivo-lightbox-error"><p>' +
                e.options.errorMessage +
                "</p></div>"
            )),
            o.html(h).removeClass("nivo-lightbox-loading"));
      else {
        if ("iframe" != t.attr("data-lightbox-type")) return !1;
        var c = g("<iframe>", {
          src: n,
          class: "nivo-lightbox-item",
          frameborder: 0,
          vspace: 0,
          hspace: 0,
          scrolling: "auto",
        });
        o.html(c),
          c.load(function () {
            o.removeClass("nivo-lightbox-loading");
          });
      }
      t.attr("title")
        ? ((c = g("<span>", { class: "nivo-lightbox-title" })).text(
            t.attr("title")
          ),
          g(".nivo-lightbox-title-wrap").html(c))
        : g(".nivo-lightbox-title-wrap").html("");
    },
    constructLightbox: function () {
      if (g(".nivo-lightbox-overlay").length)
        return g(".nivo-lightbox-overlay");
      var t = g("<div>", {
          class:
            "nivo-lightbox-overlay nivo-lightbox-theme-" +
            this.options.theme +
            " nivo-lightbox-effect-" +
            this.options.effect,
        }),
        i = g("<div>", { class: "nivo-lightbox-wrap" }),
        o = g("<div>", { class: "nivo-lightbox-content" }),
        e = g(
          '<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'
        ),
        n = g(
          '<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'
        ),
        l = g("<div>", { class: "nivo-lightbox-title-wrap" });
      i.append(o),
        i.append(l),
        t.append(i),
        t.append(e),
        t.append(n),
        g("body").append(t);
      var a = this;
      return (
        a.options.clickOverlayToClose &&
          t.on("click", function (t) {
            (t.target === this ||
              g(t.target).hasClass("nivo-lightbox-content") ||
              g(t.target).hasClass("nivo-lightbox-image")) &&
              a.destructLightbox();
          }),
        n.on("click", function (t) {
          t.preventDefault(), a.destructLightbox();
        }),
        t
      );
    },
    destructLightbox: function () {
      this.options.beforeHideLightbox.call(this),
        g(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"),
        g(".nivo-lightbox-nav").hide(),
        g("body").removeClass(
          "nivo-lightbox-body-effect-" + this.options.effect
        );
      g(".nivo-lightbox-prev").off("click"),
        g(".nivo-lightbox-next").off("click"),
        g(".nivo-lightbox-content").empty(),
        this.options.afterHideLightbox.call(this);
    },
    isHidpi: function () {
      return (
        1 < v.devicePixelRatio ||
        !(
          !v.matchMedia ||
          !v.matchMedia(
            "(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)"
          ).matches
        )
      );
    },
  }),
    (g.fn[o] = function (t) {
      return this.each(function () {
        g.data(this, o) || g.data(this, o, new i(this, t));
      });
    });
})(jQuery, window, document);
