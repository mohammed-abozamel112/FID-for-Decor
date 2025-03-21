!(function (m) {
  var u = [],
    e = {
      options: {
        prependExistingHelpBlock: !1,
        sniffHtml: !0,
        preventSubmit: !0,
        submitError: !1,
        submitSuccess: !1,
        semanticallyStrict: !1,
        autoAdd: { helpBlocks: !0 },
        filter: function () {
          return !0;
        },
      },
      methods: {
        init: function (a) {
          var c = m.extend(!0, {}, e);
          c.options = m.extend(!0, c.options, a);
          a = m.unique(
            this.map(function () {
              return m(this).parents("form")[0];
            }).toArray()
          );
          return (
            m(a).bind("submit", function (a) {
              var e = m(this),
                t = 0,
                i = e
                  .find("input,textarea,select")
                  .not("[type=submit],[type=image]")
                  .filter(c.options.filter);
              i
                .trigger("submit.validation")
                .trigger("validationLostFocus.validation"),
                i.each(function (a, e) {
                  e = m(e).parents(".form-group").first();
                  e.hasClass("warning") &&
                    (e.removeClass("warning").addClass("error"), t++);
                }),
                i.trigger("validationLostFocus.validation"),
                t
                  ? (c.options.preventSubmit && a.preventDefault(),
                    e.addClass("error"),
                    m.isFunction(c.options.submitError) &&
                      c.options.submitError(
                        e,
                        a,
                        i.jqBootstrapValidation("collectErrors", !0)
                      ))
                  : (e.removeClass("error"),
                    m.isFunction(c.options.submitSuccess) &&
                      c.options.submitSuccess(e, a));
            }),
            this.each(function () {
              var a,
                e,
                l = m(this),
                t = l.parents(".form-group").first(),
                o = t.find(".help-block").first(),
                r = l.parents("form").first(),
                i = [];
              !o.length &&
                c.options.autoAdd &&
                c.options.autoAdd.helpBlocks &&
                ((o = m('<div class="help-block" />')),
                t.find(".controls").append(o),
                u.push(o[0])),
                c.options.sniffHtml &&
                  ((a = ""),
                  void 0 !== l.attr("pattern") &&
                    ((a =
                      "Not in the expected format\x3c!-- data-validation-pattern-message to override --\x3e"),
                    l.data("validationPatternMessage") &&
                      (a = l.data("validationPatternMessage")),
                    l.data("validationPatternMessage", a),
                    l.data("validationPatternRegex", l.attr("pattern"))),
                  (void 0 === l.attr("max") &&
                    void 0 === l.attr("aria-valuemax")) ||
                    ((a =
                      "Too high: Maximum of '" +
                      (e =
                        void 0 !== l.attr("max")
                          ? l.attr("max")
                          : l.attr("aria-valuemax")) +
                      "'\x3c!-- data-validation-max-message to override --\x3e"),
                    l.data("validationMaxMessage") &&
                      (a = l.data("validationMaxMessage")),
                    l.data("validationMaxMessage", a),
                    l.data("validationMaxMax", e)),
                  (void 0 === l.attr("min") &&
                    void 0 === l.attr("aria-valuemin")) ||
                    ((a =
                      "Too low: Minimum of '" +
                      (e =
                        void 0 !== l.attr("min")
                          ? l.attr("min")
                          : l.attr("aria-valuemin")) +
                      "'\x3c!-- data-validation-min-message to override --\x3e"),
                    l.data("validationMinMessage") &&
                      (a = l.data("validationMinMessage")),
                    l.data("validationMinMessage", a),
                    l.data("validationMinMin", e)),
                  void 0 !== l.attr("maxlength") &&
                    ((a =
                      "Too long: Maximum of '" +
                      l.attr("maxlength") +
                      "' characters\x3c!-- data-validation-maxlength-message to override --\x3e"),
                    l.data("validationMaxlengthMessage") &&
                      (a = l.data("validationMaxlengthMessage")),
                    l.data("validationMaxlengthMessage", a),
                    l.data(
                      "validationMaxlengthMaxlength",
                      l.attr("maxlength")
                    )),
                  void 0 !== l.attr("minlength") &&
                    ((a =
                      "Too short: Minimum of '" +
                      l.attr("minlength") +
                      "' characters\x3c!-- data-validation-minlength-message to override --\x3e"),
                    l.data("validationMinlengthMessage") &&
                      (a = l.data("validationMinlengthMessage")),
                    l.data("validationMinlengthMessage", a),
                    l.data(
                      "validationMinlengthMinlength",
                      l.attr("minlength")
                    )),
                  (void 0 === l.attr("required") &&
                    void 0 === l.attr("aria-required")) ||
                    ((a = c.builtInValidators.required.message),
                    l.data("validationRequiredMessage") &&
                      (a = l.data("validationRequiredMessage")),
                    l.data("validationRequiredMessage", a)),
                  void 0 !== l.attr("type") &&
                    "number" === l.attr("type").toLowerCase() &&
                    ((a = c.builtInValidators.number.message),
                    l.data("validationNumberMessage") &&
                      (a = l.data("validationNumberMessage")),
                    l.data("validationNumberMessage", a)),
                  void 0 !== l.attr("type") &&
                    "email" === l.attr("type").toLowerCase() &&
                    ((a =
                      "Not a valid email address\x3c!-- data-validator-validemail-message to override --\x3e"),
                    l.data("validationValidemailMessage")
                      ? (a = l.data("validationValidemailMessage"))
                      : l.data("validationEmailMessage") &&
                        (a = l.data("validationEmailMessage")),
                    l.data("validationValidemailMessage", a)),
                  void 0 !== l.attr("minchecked") &&
                    ((a =
                      "Not enough options checked; Minimum of '" +
                      l.attr("minchecked") +
                      "' required\x3c!-- data-validation-minchecked-message to override --\x3e"),
                    l.data("validationMincheckedMessage") &&
                      (a = l.data("validationMincheckedMessage")),
                    l.data("validationMincheckedMessage", a),
                    l.data(
                      "validationMincheckedMinchecked",
                      l.attr("minchecked")
                    )),
                  void 0 !== l.attr("maxchecked") &&
                    ((a =
                      "Too many options checked; Maximum of '" +
                      l.attr("maxchecked") +
                      "' required\x3c!-- data-validation-maxchecked-message to override --\x3e"),
                    l.data("validationMaxcheckedMessage") &&
                      (a = l.data("validationMaxcheckedMessage")),
                    l.data("validationMaxcheckedMessage", a),
                    l.data(
                      "validationMaxcheckedMaxchecked",
                      l.attr("maxchecked")
                    ))),
                void 0 !== l.data("validation") &&
                  (i = l.data("validation").split(",")),
                m.each(l.data(), function (a, e) {
                  a = a.replace(/([A-Z])/g, ",$1").split(",");
                  "validation" === a[0] && a[1] && i.push(a[1]);
                });
              for (
                var n = i, s = [];
                m.each(i, function (a, e) {
                  i[a] = v(e);
                }),
                  (i = m.unique(i)),
                  (s = []),
                  m.each(n, function (a, e) {
                    void 0 !== l.data("validation" + e + "Shortcut")
                      ? m.each(
                          l.data("validation" + e + "Shortcut").split(","),
                          function (a, e) {
                            s.push(e);
                          }
                        )
                      : !c.builtInValidators[e.toLowerCase()] ||
                        ("shortcut" ===
                          (e =
                            c.builtInValidators[
                              e.toLowerCase()
                            ]).type.toLowerCase() &&
                          m.each(e.shortcut.split(","), function (a, e) {
                            (e = v(e)), s.push(e), i.push(e);
                          }));
                  }),
                  (n = s),
                  0 < n.length;

              );
              var d = {};
              m.each(i, function (a, t) {
                var i,
                  n,
                  e = void 0 !== (r = l.data("validation" + t + "Message")),
                  o = !1,
                  r =
                    r ||
                    "'" +
                      t +
                      "' validation failed \x3c!-- Add attribute 'data-validation-" +
                      t.toLowerCase() +
                      "-message' to input to change this message --\x3e";
                m.each(c.validatorTypes, function (a, e) {
                  void 0 === d[a] && (d[a] = []),
                    o ||
                      void 0 === l.data("validation" + t + v(e.name)) ||
                      (d[a].push(
                        m.extend(
                          !0,
                          { name: v(e.name), message: r },
                          e.init(l, t)
                        )
                      ),
                      (o = !0));
                }),
                  !o &&
                    c.builtInValidators[t.toLowerCase()] &&
                    ((i = m.extend(
                      !0,
                      {},
                      c.builtInValidators[t.toLowerCase()]
                    )),
                    e && (i.message = r),
                    "shortcut" === (n = i.type.toLowerCase())
                      ? (o = !0)
                      : m.each(c.validatorTypes, function (a, e) {
                          void 0 === d[a] && (d[a] = []),
                            o ||
                              n !== a.toLowerCase() ||
                              (l.data(
                                "validation" + t + v(e.name),
                                i[e.name.toLowerCase()]
                              ),
                              d[n].push(m.extend(i, e.init(l, t))),
                              (o = !0));
                        })),
                  o || m.error("Cannot find validation info for '" + t + "'");
              }),
                o.data(
                  "original-contents",
                  o.data("original-contents")
                    ? o.data("original-contents")
                    : o.html()
                ),
                o.data(
                  "original-role",
                  o.data("original-role")
                    ? o.data("original-role")
                    : o.attr("role")
                ),
                t.data(
                  "original-classes",
                  t.data("original-clases")
                    ? t.data("original-classes")
                    : t.attr("class")
                ),
                l.data(
                  "original-aria-invalid",
                  l.data("original-aria-invalid")
                    ? l.data("original-aria-invalid")
                    : l.attr("aria-invalid")
                ),
                l.bind("validation.validation", function (a, e) {
                  var i = g(l),
                    n = [];
                  return (
                    m.each(d, function (t, a) {
                      (i ||
                        i.length ||
                        (e && e.includeEmpty) ||
                        (c.validatorTypes[t].blockSubmit &&
                          e &&
                          e.submitting)) &&
                        m.each(a, function (a, e) {
                          c.validatorTypes[t].validate(l, i, e) &&
                            n.push(e.message);
                        });
                    }),
                    n
                  );
                }),
                l.bind("getValidators.validation", function () {
                  return d;
                }),
                l.bind("submit.validation", function () {
                  return l.triggerHandler("change.validation", {
                    submitting: !0,
                  });
                }),
                l.bind(
                  [
                    "keyup",
                    "focus",
                    "blur",
                    "click",
                    "keydown",
                    "keypress",
                    "change",
                  ].join(".validation ") + ".validation",
                  function (a, i) {
                    var e = g(l),
                      n = [];
                    t.find("input,textarea,select").each(function (a, e) {
                      var t = n.length;
                      m.each(
                        m(e).triggerHandler("validation.validation", i),
                        function (a, e) {
                          n.push(e);
                        }
                      ),
                        n.length > t
                          ? m(e).attr("aria-invalid", "true")
                          : ((t = l.data("original-aria-invalid")),
                            m(e).attr("aria-invalid", void 0 !== t && t));
                    }),
                      r
                        .find("input,select,textarea")
                        .not(l)
                        .not('[name="' + l.attr("name") + '"]')
                        .trigger("validationLostFocus.validation"),
                      (n = m.unique(n.sort())).length
                        ? (t.removeClass("success error").addClass("warning"),
                          c.options.semanticallyStrict && 1 === n.length
                            ? o.html(
                                n[0] +
                                  (c.options.prependExistingHelpBlock
                                    ? o.data("original-contents")
                                    : "")
                              )
                            : o.html(
                                '<ul role="alert"><li>' +
                                  n.join("</li><li>") +
                                  "</li></ul>" +
                                  (c.options.prependExistingHelpBlock
                                    ? o.data("original-contents")
                                    : "")
                              ))
                        : (t.removeClass("warning error success"),
                          0 < e.length && t.addClass("success"),
                          o.html(o.data("original-contents"))),
                      "blur" === a.type && t.removeClass("success");
                  }
                ),
                l.bind("validationLostFocus.validation", function () {
                  t.removeClass("success");
                });
            })
          );
        },
        destroy: function () {
          return this.each(function () {
            var a = m(this),
              e = a.parents(".form-group").first(),
              t = e.find(".help-block").first();
            a.unbind(".validation"),
              t.html(t.data("original-contents")),
              e.attr("class", e.data("original-classes")),
              a.attr("aria-invalid", a.data("original-aria-invalid")),
              t.attr("role", a.data("original-role")),
              -1 < u.indexOf(t[0]) && t.remove();
          });
        },
        collectErrors: function (a) {
          var i = {};
          return (
            this.each(function (a, e) {
              var t = m(e),
                e = t.attr("name"),
                t = t.triggerHandler("validation.validation", {
                  includeEmpty: !0,
                });
              i[e] = m.extend(!0, t, i[e]);
            }),
            m.each(i, function (a, e) {
              0 === e.length && delete i[a];
            }),
            i
          );
        },
        hasErrors: function () {
          var t = [];
          return (
            this.each(function (a, e) {
              t = t.concat(
                m(e).triggerHandler("getValidators.validation")
                  ? m(e).triggerHandler("validation.validation", {
                      submitting: !0,
                    })
                  : []
              );
            }),
            0 < t.length
          );
        },
        override: function (a) {
          e = m.extend(!0, e, a);
        },
      },
      validatorTypes: {
        callback: {
          name: "callback",
          init: function (a, e) {
            return {
              validatorName: e,
              callback: a.data("validation" + e + "Callback"),
              lastValue: a.val(),
              lastValid: !0,
              lastFinished: !0,
            };
          },
          validate: function (a, e, t) {
            return t.lastValue === e && t.lastFinished
              ? !t.lastValid
              : (!0 === t.lastFinished &&
                  ((t.lastValue = e),
                  (t.lastValid = !0),
                  (t.lastFinished = !1),
                  (n = a),
                  (function (a, e) {
                    for (
                      var t = Array.prototype.slice.call(arguments).splice(2),
                        i = a.split("."),
                        n = i.pop(),
                        o = 0;
                      o < i.length;
                      o++
                    )
                      e = e[i[o]];
                    e[n].apply(this, t);
                  })((i = t).callback, window, a, e, function (a) {
                    i.lastValue === a.value &&
                      ((i.lastValid = a.valid),
                      a.message && (i.message = a.message),
                      (i.lastFinished = !0),
                      n.data(
                        "validation" + i.validatorName + "Message",
                        i.message
                      ),
                      setTimeout(function () {
                        n.trigger("change.validation");
                      }, 1));
                  })),
                !1);
            var i, n;
          },
        },
        ajax: {
          name: "ajax",
          init: function (a, e) {
            return {
              validatorName: e,
              url: a.data("validation" + e + "Ajax"),
              lastValue: a.val(),
              lastValid: !0,
              lastFinished: !0,
            };
          },
          validate: function (e, a, t) {
            return "" + t.lastValue == "" + a && !0 === t.lastFinished
              ? !1 === t.lastValid
              : (!0 === t.lastFinished &&
                  ((t.lastValue = a),
                  (t.lastValid = !0),
                  (t.lastFinished = !1),
                  m.ajax({
                    url: t.url,
                    data: "value=" + a + "&field=" + e.attr("name"),
                    dataType: "json",
                    success: function (a) {
                      "" + t.lastValue == "" + a.value &&
                        ((t.lastValid = !!a.valid),
                        a.message && (t.message = a.message),
                        (t.lastFinished = !0),
                        e.data(
                          "validation" + t.validatorName + "Message",
                          t.message
                        ),
                        setTimeout(function () {
                          e.trigger("change.validation");
                        }, 1));
                    },
                    failure: function () {
                      (t.lastValid = !0),
                        (t.message = "ajax call failed"),
                        (t.lastFinished = !0),
                        e.data(
                          "validation" + t.validatorName + "Message",
                          t.message
                        ),
                        setTimeout(function () {
                          e.trigger("change.validation");
                        }, 1);
                    },
                  })),
                !1);
          },
        },
        regex: {
          name: "regex",
          init: function (a, e) {
            return {
              regex:
                ((e = a.data("validation" + e + "Regex")),
                new RegExp("^" + e + "$")),
            };
          },
          validate: function (a, e, t) {
            return (
              (!t.regex.test(e) && !t.negative) ||
              (t.regex.test(e) && t.negative)
            );
          },
        },
        required: {
          name: "required",
          init: function (a, e) {
            return {};
          },
          validate: function (a, e, t) {
            return (
              !(0 !== e.length || t.negative) || !!(0 < e.length && t.negative)
            );
          },
          blockSubmit: !0,
        },
        match: {
          name: "match",
          init: function (a, e) {
            e = a
              .parents("form")
              .first()
              .find('[name="' + a.data("validation" + e + "Match") + '"]')
              .first();
            return (
              e.bind("validation.validation", function () {
                a.trigger("change.validation", { submitting: !0 });
              }),
              { element: e }
            );
          },
          validate: function (a, e, t) {
            return (
              (e !== t.element.val() && !t.negative) ||
              (e === t.element.val() && t.negative)
            );
          },
          blockSubmit: !0,
        },
        max: {
          name: "max",
          init: function (a, e) {
            return { max: a.data("validation" + e + "Max") };
          },
          validate: function (a, e, t) {
            return (
              (parseFloat(e, 10) > parseFloat(t.max, 10) && !t.negative) ||
              (parseFloat(e, 10) <= parseFloat(t.max, 10) && t.negative)
            );
          },
        },
        min: {
          name: "min",
          init: function (a, e) {
            return { min: a.data("validation" + e + "Min") };
          },
          validate: function (a, e, t) {
            return (
              (parseFloat(e) < parseFloat(t.min) && !t.negative) ||
              (parseFloat(e) >= parseFloat(t.min) && t.negative)
            );
          },
        },
        maxlength: {
          name: "maxlength",
          init: function (a, e) {
            return { maxlength: a.data("validation" + e + "Maxlength") };
          },
          validate: function (a, e, t) {
            return (
              (e.length > t.maxlength && !t.negative) ||
              (e.length <= t.maxlength && t.negative)
            );
          },
        },
        minlength: {
          name: "minlength",
          init: function (a, e) {
            return { minlength: a.data("validation" + e + "Minlength") };
          },
          validate: function (a, e, t) {
            return (
              (e.length < t.minlength && !t.negative) ||
              (e.length >= t.minlength && t.negative)
            );
          },
        },
        maxchecked: {
          name: "maxchecked",
          init: function (a, e) {
            var t = a
              .parents("form")
              .first()
              .find('[name="' + a.attr("name") + '"]');
            return (
              t.bind("click.validation", function () {
                a.trigger("change.validation", { includeEmpty: !0 });
              }),
              {
                maxchecked: a.data("validation" + e + "Maxchecked"),
                elements: t,
              }
            );
          },
          validate: function (a, e, t) {
            return (
              (t.elements.filter(":checked").length > t.maxchecked &&
                !t.negative) ||
              (t.elements.filter(":checked").length <= t.maxchecked &&
                t.negative)
            );
          },
          blockSubmit: !0,
        },
        minchecked: {
          name: "minchecked",
          init: function (a, e) {
            var t = a
              .parents("form")
              .first()
              .find('[name="' + a.attr("name") + '"]');
            return (
              t.bind("click.validation", function () {
                a.trigger("change.validation", { includeEmpty: !0 });
              }),
              {
                minchecked: a.data("validation" + e + "Minchecked"),
                elements: t,
              }
            );
          },
          validate: function (a, e, t) {
            return (
              (t.elements.filter(":checked").length < t.minchecked &&
                !t.negative) ||
              (t.elements.filter(":checked").length >= t.minchecked &&
                t.negative)
            );
          },
          blockSubmit: !0,
        },
      },
      builtInValidators: {
        email: { name: "Email", type: "shortcut", shortcut: "validemail" },
        validemail: {
          name: "Validemail",
          type: "regex",
          regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}",
          message:
            "Not a valid email address\x3c!-- data-validator-validemail-message to override --\x3e",
        },
        passwordagain: {
          name: "Passwordagain",
          type: "match",
          match: "password",
          message:
            "Does not match the given password\x3c!-- data-validator-paswordagain-message to override --\x3e",
        },
        positive: {
          name: "Positive",
          type: "shortcut",
          shortcut: "number,positivenumber",
        },
        negative: {
          name: "Negative",
          type: "shortcut",
          shortcut: "number,negativenumber",
        },
        number: {
          name: "Number",
          type: "regex",
          regex: "([+-]?\\d+(\\.\\d*)?([eE][+-]?[0-9]+)?)?",
          message:
            "Must be a number\x3c!-- data-validator-number-message to override --\x3e",
        },
        integer: {
          name: "Integer",
          type: "regex",
          regex: "[+-]?\\d+",
          message:
            "No decimal places allowed\x3c!-- data-validator-integer-message to override --\x3e",
        },
        positivenumber: {
          name: "Positivenumber",
          type: "min",
          min: 0,
          message:
            "Must be a positive number\x3c!-- data-validator-positivenumber-message to override --\x3e",
        },
        negativenumber: {
          name: "Negativenumber",
          type: "max",
          max: 0,
          message:
            "Must be a negative number\x3c!-- data-validator-negativenumber-message to override --\x3e",
        },
        required: {
          name: "Required",
          type: "required",
          message:
            "This is required\x3c!-- data-validator-required-message to override --\x3e",
        },
        checkone: {
          name: "Checkone",
          type: "minchecked",
          minchecked: 1,
          message:
            "Check at least one option\x3c!-- data-validation-checkone-message to override --\x3e",
        },
      },
    },
    v = function (a) {
      return a.toLowerCase().replace(/(^|\s)([a-z])/g, function (a, e, t) {
        return e + t.toUpperCase();
      });
    },
    g = function (a) {
      var e = a.val(),
        t = a.attr("type");
      return (
        "checkbox" === t && (e = a.is(":checked") ? e : ""),
        "radio" === t &&
          (e =
            0 < m('input[name="' + a.attr("name") + '"]:checked').length
              ? e
              : ""),
        e
      );
    };
  (m.fn.jqBootstrapValidation = function (a) {
    return e.methods[a]
      ? e.methods[a].apply(this, Array.prototype.slice.call(arguments, 1))
      : "object" != typeof a && a
      ? (m.error(
          "Method " + a + " does not exist on jQuery.jqBootstrapValidation"
        ),
        null)
      : e.methods.init.apply(this, arguments);
  }),
    (m.jqBootstrapValidation = function (a) {
      m(":input")
        .not("[type=image],[type=submit]")
        .jqBootstrapValidation.apply(this, arguments);
    });
})(jQuery);
