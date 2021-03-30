"use strict";

var formCalc = document.getElementById("calculate-form");
var totalPrice = document.querySelector(".total-price");
var requestCalcBtn = document.querySelector("#request-calculate");
var totalPriceSum = document.querySelector(".total-price__sum");
var originInput = document.getElementById("origin-input");
var destinationInput = document.getElementById("destination-input");
var weightInput = document.querySelector("#weight");
var volumeInput = document.querySelector("#volume");
var quantityInput = document.querySelector("#quantity");
var calcWrapMessage = document.querySelector(".calc-wrap-message");
var browserSafari = !/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var browserFirefox = typeof window.InstallTrigger !== "undefined";
var arrowDown = document.querySelector("#checkbox-arrow");
var wrapperListPrice = document.querySelector(".wrapper-list");
var arrow = document.querySelector(".price__wrap-arrow");
var priceListHeightOpen, priceListHeightClose;
var mobileW = 640.99;
var clientWidth = document.documentElement.clientWidth;
var backgroundImageArr = document.querySelectorAll(".background-image-js");
var bottomFadeArr = document.querySelectorAll(".bottom-fade-js");
var LeftFadeArr = document.querySelectorAll(".left-fade-js");
var body = document.querySelector("body");
var navIcon = document.querySelector("#nav-icon-js");
var nav = document.querySelector("nav");
var header = document.querySelector("header");
var listNav = document.querySelector("#list-nav-js");
var requestBtn = document.querySelector("#request-js");
var applicationForm = document.querySelector("#applicationForm");
var calculateBtn = document.querySelector("#calculate-btn");
var calculateWrap = document.querySelector("#calculate-wrap");
var navCalc = document.querySelector("#nav-calc");
var formUser = document.querySelector("#user-form");
var calcBtn = document.querySelector("#calc-btn");
var phoneInput = document.querySelector("#phone");
var emailInput = document.querySelector("#email");
var fullName, phone, email, comments, weight, volume;
var arrayAllInputs = document.querySelectorAll("input");
var textarea = document.querySelector("#message");
var textareaDecoration = document.querySelector(".textarea-decoration");
var formWrap = document.querySelectorAll(".form-wrap");
var faders = document.querySelectorAll(".fade-in");
var footer = document.querySelector("footer");
var main = document.querySelector("main");
addEventListener("load", function () {
  var viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
});
var appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px"
};
var appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach(function (fader) {
  appearOnScroll.observe(fader);
});
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 500) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (browserSafari) {
    var scrollTop = window.pageYOffset;
    var parallaxLayer = document.querySelectorAll(".parallax-layer");
    parallaxLayer.forEach(function (el) {
      var dataSpeed = el.dataset.speed;
      var offsetY = -(scrollTop * dataSpeed);
      var translate = "translate3d(0, " + offsetY + "px, 0)";
      el.style.transform = translate;
    });
  } else {
    var _scrollTop = window.pageYOffset;

    var _parallaxLayer = document.querySelector("#parallax__title");

    var dataSpeed = _parallaxLayer.dataset.speed;
    var offsetY = -(_scrollTop * dataSpeed);
    var translate = "translate3d(0, " + offsetY + "px, 0)";
    _parallaxLayer.style.transform = translate;
  }
});

var resizeFixScreen = function resizeFixScreen() {
  var clientWidthResize = document.documentElement.clientWidth;

  if (clientWidthResize < mobileW) {
    priceListHeightOpen = "780px";
    priceListHeightClose = "206px";
    wrapperListPrice.style.height = priceListHeightClose;
  } else {
    priceListHeightOpen = "400px";
    priceListHeightClose = "130px";
    wrapperListPrice.style.height = priceListHeightClose;
  }
};

resizeFixScreen();
window.addEventListener("resize", function () {
  resizeFixScreen();
});

var modalHandler = function modalHandler(display) {
  main.style.display = display;
  footer.style.display = display;
  header.style.display = display;
};

document.addEventListener("DOMContentLoaded", function () {
  body.addEventListener("click", function _callee(event) {
    var titleSubmit, titleError, calcTextMessage, _titleError;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!event.target.closest("#nav-icon-js")) {
              _context.next = 8;
              break;
            }

            if (!formUser.classList.contains("req-success") && !formUser.classList.contains("req-error") && applicationForm.classList.contains("active")) {
              applicationForm.classList.remove("active");
              modalHandler("block");
              applicationForm.style.position = "fixed";
              applicationForm.style.height = "".concat(document.documentElement.clientHeight, "px");
              navIcon.classList.remove("active");
              header.classList.remove("active");
              requestBtn.classList.remove("active");
              setTimeout(function () {
                arrayAllInputs.forEach(function (input) {
                  return input.value = "";
                });
                textarea.value = "";
                textareaDecoration.style.top = "44px";
                phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
                emailInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
              }, 400);

              if (!browserFirefox) {
                body.classList.remove("active");
              }
            } else if (calculateWrap.classList.contains("active")) {
              if (nav.classList.contains("active")) {
                nav.classList.remove("active");
              }

              modalHandler("block");
              calculateWrap.style.position = "fixed";
              calculateWrap.style.height = "".concat(document.documentElement.clientHeight, "px");
              calculateWrap.classList.remove("active");
              navIcon.classList.remove("active");
              header.classList.remove("active");
              requestBtn.classList.remove("active");
              totalPriceSum.classList.remove("active");
              setTimeout(function () {
                destinationAddress = "";
                originAddress = "";
                originInput.value = "";
                destinationInput.value = "";
                weightInput.value = "";
                volumeInput.value = "";
                quantityInput.value = "";
              }, 400);

              if (!browserFirefox) {
                body.classList.remove("active");
              }
            } else if (formUser.classList.contains("req-success") && applicationForm.classList.contains("active")) {
              applicationForm.classList.remove("active");
              modalHandler("block");
              applicationForm.style.position = "fixed";
              applicationForm.style.height = "".concat(document.documentElement.clientHeight, "px");
              formUser.classList.remove("req-success");
              setTimeout(function () {
                titleSubmit.remove();
              }, 400);
              formUser.classList.remove("req-success");
              titleSubmit = document.querySelector(".title-submit");
              titleSubmit.classList.remove("req-success");
              applicationForm.classList.remove("active");
              header.classList.remove("active");
              navIcon.classList.remove("active");
              requestBtn.classList.remove("active");
            } else if (formUser.classList.contains("req-error") && applicationForm.classList.contains("active")) {
              applicationForm.classList.remove("active");
              modalHandler("block");
              applicationForm.style.position = "fixed";
              applicationForm.style.height = "".concat(document.documentElement.clientHeight, "px");
              formUser.classList.remove("req-error");
              titleError = document.querySelector(".title-error");
              setTimeout(function () {
                return titleError.remove();
              }, 400);
              titleError.classList.remove("req-error");
              header.classList.remove("active");
              navIcon.classList.remove("active");
              requestBtn.classList.remove("active");
            } else {
              navIcon.classList.toggle("active");
              nav.classList.toggle("active");
              header.classList.toggle("active");
              requestBtn.classList.toggle("active");

              if (!browserFirefox) {
                body.classList.toggle("active");
              }
            }

            calcTextMessage = document.querySelector(".calc-text-message");

            if (formCalc.classList.contains("total-price-open")) {
              formCalc.classList.remove("total-price-open");
            }

            if (totalPrice.classList.contains("total-price-open")) {
              totalPrice.classList.remove("total-price-open");
              totalPriceSum.classList.remove("active");
            }

            if (calcTextMessage && calcTextMessage.classList.contains("active")) {
              calcTextMessage.remove();
            }

            if (calculateWrap.classList.contains("active") && formCalc.classList.contains("req-error")) {
              modalHandler("block");
              calculateWrap.style.position = "fixed";
              calculateWrap.style.height = "".concat(document.documentElement.clientHeight, "px");
              _titleError = document.querySelector(".title-error");
              setTimeout(function () {
                return _titleError.remove();
              }, 400);

              _titleError.classList.remove("req-error");

              formCalc.classList.remove("req-error");
            }

            return _context.abrupt("return");

          case 8:
            if (!event.target.closest("#request-js")) {
              _context.next = 17;
              break;
            }

            setTimeout(function () {
              applicationForm.classList.add("active");
            }, 500);
            setTimeout(function () {
              modalHandler("none");
              applicationForm.style.position = "absolute";
              applicationForm.style.height = "".concat(document.documentElement.clientHeight + 300, "px");
            }, 1000);
            applicationForm.style.display = "flex";
            header.classList.add("active");
            navIcon.classList.add("active");
            requestBtn.classList.add("active");

            if (!browserFirefox) {
              body.classList.add("active");
            }

            return _context.abrupt("return");

          case 17:
            if (!event.target.closest("#calculate-btn")) {
              _context.next = 27;
              break;
            }

            setTimeout(function () {
              calculateWrap.classList.add("active");
            }, 500);
            setTimeout(function () {
              modalHandler("none");
              calculateWrap.style.position = "absolute";
              calculateWrap.style.height = "".concat(document.documentElement.clientHeight + 300, "px");
            }, 1000);
            calculateWrap.style.display = "flex";
            header.classList.add("active");
            navIcon.classList.add("active");
            requestBtn.classList.add("active");
            calcBtn.disabled = false;

            if (!browserFirefox) {
              body.classList.add("active");
            }

            return _context.abrupt("return");

          case 27:
            if (!event.target.closest("#nav-calc")) {
              _context.next = 35;
              break;
            }

            setTimeout(function () {
              calculateWrap.classList.add("active");
            }, 500);
            setTimeout(function () {
              modalHandler("none");
              calculateWrap.style.position = "absolute";
              calculateWrap.style.height = "".concat(document.documentElement.clientHeight + 300, "px");
            }, 1000);
            calculateWrap.style.display = "flex";
            requestBtn.classList.add("active");
            calcBtn.disabled = false;

            if (!browserFirefox) {
              body.classList.add("active");
            }

            return _context.abrupt("return");

          case 35:
            if (!event.target.closest("#list-nav-js")) {
              _context.next = 40;
              break;
            }

            nav.classList.remove("active");
            body.classList.remove("active");

            if (!calculateWrap.classList.contains("active")) {
              navIcon.classList.remove("active");
              requestBtn.classList.remove("active");
            }

            return _context.abrupt("return");

          case 40:
            if (!event.target.closest("#checkbox-arrow")) {
              _context.next = 45;
              break;
            }

            checked = arrowDown.checked;

            if (checked === false) {
              wrapperListPrice.animate([{
                height: priceListHeightOpen
              }, {
                height: priceListHeightClose
              }], {
                duration: 400,
                easing: "ease-in",
                fill: "forwards"
              });
              arrow.animate([{
                transform: "rotateX(180deg)"
              }, {
                transform: "rotateX(0)"
              }], {
                duration: 400,
                easing: "ease-in-out",
                fill: "forwards"
              });
            }

            if (checked === true) {
              wrapperListPrice.animate([{
                height: priceListHeightClose
              }, {
                height: priceListHeightOpen
              }], {
                duration: 400,
                easing: "ease-in-out",
                fill: "forwards"
              });
              arrow.animate([{
                transform: "rotateX(0)"
              }, {
                transform: "rotateX(180deg)"
              }], {
                duration: 400,
                easing: "ease-in-out",
                fill: "forwards"
              });
            }

            return _context.abrupt("return");

          case 45:
            if (!event.target.closest("#request-calculate")) {
              _context.next = 54;
              break;
            }

            totalPriceSum.classList.remove("active");
            formCalc.classList.remove("total-price-open");
            totalPrice.classList.remove("total-price-open");
            applicationForm.classList.add("active");
            navIcon.classList.add("active");
            requestBtn.classList.add("active");
            calculateWrap.classList.remove("active");
            return _context.abrupt("return");

          case 54:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});
textarea.addEventListener("focus", function () {
  textareaDecoration.style.top = "98px";
});
phoneInput.addEventListener("focus", function (e) {
  if (e.target.value.length === 0) {
    phoneInput.value = "+38";
    return;
  }
});
textarea.addEventListener("blur", function () {
  if (textarea.value.length === 0) {
    textareaDecoration.style.top = "44px";
  }
});
var phoneFirstIndex = phoneInput.value[0];
var phoneSecondIndex = phoneInput.value[1];
body.addEventListener("input", function (e) {
  if (phoneFirstIndex === "0" && phoneInput.value.length === 10) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
    return;
  }

  if (phoneFirstIndex === "3" && phoneSecondIndex === "8" && phoneInput.value.length === 12) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
    return;
  }

  if (phoneInput.value.includes("+38") && phoneInput.value.length === 13) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
    return;
  }

  if (phoneFirstIndex === "8" && phoneInput.value.length === 11) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
    return;
  }

  if (emailInput.value.includes(".")) {
    emailInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
    return;
  }

  if (e.target.name === "name") {
    fullName = e.target.value;
    return;
  }

  if (e.target.name === "phone") {
    phoneInput.value = e.target.value.replace(/[^\d\s,+]+/gi, "");
    phone = e.target.value;
    return;
  }

  if (e.target.localName === "textarea") {
    comments = e.target.value;
    return;
  }

  if (e.target.name === "email") {
    email = e.target.value;
    return;
  }

  if (e.target.name === "weight") {
    weight = e.target.value;
    return;
  }

  if (e.target.name === "volume") {
    volume = e.target.value;
    return;
  }
});
var formBtn = document.querySelector("#form-user__btn");
formUser.addEventListener("submit", function _callee2(e) {
  var spinner, bodyPost;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          e.preventDefault();

          if (!(phoneFirstIndex === "0" && phoneInput.value.length !== 10)) {
            _context2.next = 4;
            break;
          }

          phoneInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
          return _context2.abrupt("return");

        case 4:
          if (!(phoneFirstIndex === "3" && phoneSecondIndex === "8" && phoneInput.value.length !== 12)) {
            _context2.next = 7;
            break;
          }

          phoneInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
          return _context2.abrupt("return");

        case 7:
          if (!(phoneInput.value.includes("+38") && phoneInput.value.length !== 13)) {
            _context2.next = 10;
            break;
          }

          phoneInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
          return _context2.abrupt("return");

        case 10:
          if (!(phoneFirstIndex === "8" && phoneInput.value.length !== 11)) {
            _context2.next = 13;
            break;
          }

          phoneInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
          return _context2.abrupt("return");

        case 13:
          if (emailInput.value.includes(".")) {
            _context2.next = 16;
            break;
          }

          emailInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
          return _context2.abrupt("return");

        case 16:
          applicationForm.insertAdjacentHTML("beforeend", "<div id=\"spinner\">\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n  </div>");
          spinner = document.querySelector("#spinner");
          spinner.classList.add("lds-spinner");
          formBtn.disabled = true;
          bodyPost = {
            email: email,
            name: fullName,
            phone: phone,
            text: comments,
            originCity: originAddress ? originAddress : null,
            destinationCity: destinationAddress ? destinationAddress : null,
            weight: weight ? weight : null,
            volume: volume ? volume : null
          };
          fetch("https://powerful-dawn-69442.herokuapp.com/sendtome", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(bodyPost)
          }).then(function () {
            formUser.insertAdjacentHTML("afterend", "<p class=\"title-submit\">\u0414\u044F\u043A\u0443\u0454\u043C\u043E \u0437\u0430 \u0412\u0430\u0448\u0443 \u0437\u0430\u044F\u0432\u043A\u0443\uD83D\uDD25 \u041D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0437\u0432'\u044F\u0436\u0435\u0442\u044C\u0441\u044F \u0437 \u0412\u0430\u043C\u0438 \u043D\u0430\u0439\u0431\u043B\u0438\u0436\u0447\u0438\u043C \u0447\u0430\u0441\u043E\u043C.</p>");
            formUser.classList.add("req-success");
            var titleSubmit = document.querySelector(".title-submit");
            setTimeout(function () {
              return titleSubmit.classList.add("req-success");
            }, 400);
          })["catch"](function (error) {
            console.log(error);
            formUser.insertAdjacentHTML("afterend", "<p class=\"title-error\">\u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A\uD83D\uDE1F \u041D\u0430 \u0436\u0430\u043B\u044C, \u043C\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435 \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0446\u044E \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044E \u043F\u0440\u044F\u043C\u043E \u0437\u0430\u0440\u0430\u0437. \u0411\u0443\u0434\u044C\n          \u043B\u0430\u0441\u043A\u0430, \u0441\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u0456\u0437\u043D\u0456\u0448\u0435. \u042F\u043A\u0449\u043E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u0431\u0443\u0434\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u044E\u0432\u0430\u0442\u0438\u0441\u044F, \u0437\u0432\u0435\u0440\u043D\u0456\u0442\u044C\u0441\u044F \u0434\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430.</p>");
            formUser.classList.add("req-error");
            var titleError = document.querySelector(".title-error");
            setTimeout(function () {
              return titleError.classList.add("req-error");
            }, 400);
          })["finally"](function () {
            spinner.remove();
            arrayAllInputs.forEach(function (input) {
              return input.value = "";
            });
            textarea.value = "";
            formBtn.disabled = false;
            body.classList.remove("active");
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  });
});