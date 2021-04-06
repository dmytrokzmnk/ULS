const formCalc = document.getElementById("calculate-form");
const totalPrice = document.querySelector(".total-price");
const requestCalcBtn = document.querySelector("#request-calculate");
const totalPriceSum = document.querySelector(".total-price__sum");
const originInput = document.getElementById("origin-input");
const destinationInput = document.getElementById("destination-input");
const weightInput = document.querySelector("#weight");
const volumeInput = document.querySelector("#volume");
const quantityInput = document.querySelector("#quantity");
const calcWrapMessage = document.querySelector(".calc-wrap-message");
const browserSafari = !/^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
);
const browserFirefox = typeof window.InstallTrigger !== "undefined";
const arrowDown = document.querySelector("#checkbox-arrow");
const wrapperListPrice = document.querySelector(".wrapper-list");
const arrow = document.querySelector(".price__wrap-arrow");
let priceListHeightOpen, priceListHeightClose;
const mobileW = 640.99;
const clientWidth = document.documentElement.clientWidth;
const backgroundImageArr = document.querySelectorAll(".background-image-js");
const bottomFadeArr = document.querySelectorAll(".bottom-fade-js");
const LeftFadeArr = document.querySelectorAll(".left-fade-js");
const body = document.querySelector("body");
const navIcon = document.querySelector("#nav-icon-js");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const listNav = document.querySelector("#list-nav-js");
const requestBtn = document.querySelector("#request-js");
const applicationForm = document.querySelector("#applicationForm");
const calculateBtn = document.querySelector("#calculate-btn");
const calculateWrap = document.querySelector("#calculate-wrap");
const navCalc = document.querySelector("#nav-calc");
const formUser = document.querySelector("#user-form");
const calcBtn = document.querySelector("#calc-btn");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
let fullName,
  phone,
  email,
  comments,
  weight,
  volume,
  destinationAddress,
  originAddress;
const arrayAllInputs = document.querySelectorAll("input");
const textarea = document.querySelector("#message");
const textareaDecoration = document.querySelector(".textarea-decoration");
const formWrap = document.querySelectorAll(".form-wrap");
const faders = document.querySelectorAll(".fade-in");
const footer = document.querySelector("footer");
const main = document.querySelector("main");
let scriptGoogle = false;
addEventListener("load", function () {
  var viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute(
    "content",
    viewport.content + ", height=" + window.innerHeight
  );
});

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  if (browserSafari) {
    const scrollTop = window.pageYOffset;
    const parallaxLayer = document.querySelectorAll(".parallax-layer");
    parallaxLayer.forEach((el) => {
      const dataSpeed = el.dataset.speed;
      const offsetY = -(scrollTop * dataSpeed);
      const translate = "translate3d(0, " + offsetY + "px, 0)";
      el.style.transform = translate;
    });
  } else {
    const scrollTop = window.pageYOffset;
    const parallaxLayer = document.querySelector("#parallax__title");
    const dataSpeed = parallaxLayer.dataset.speed;
    const offsetY = -(scrollTop * dataSpeed);
    const translate = "translate3d(0, " + offsetY + "px, 0)";
    parallaxLayer.style.transform = translate;
  }
});

const resizeFixScreen = () => {
  const clientWidthResize = document.documentElement.clientWidth;
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
window.addEventListener("resize", () => {
  resizeFixScreen();
});
const modalHandler = (display) => {
  main.style.display = display;
  footer.style.display = display;
  // header.style.display = display;
};
let scrollTo;
document.addEventListener("DOMContentLoaded", () => {
  body.addEventListener("click", async (event) => {
    if (event.target.closest("#nav-icon-js")) {
      if (
        !formUser.classList.contains("req-success") &&
        !formUser.classList.contains("req-error") &&
        applicationForm.classList.contains("active")
      ) {
        applicationForm.classList.remove("active");
        applicationForm.style.height = "100vh";
        applicationForm.style.position = `fixed`;
        modalHandler("block");
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
        navIcon.classList.remove("active");
        header.classList.remove("active");
        requestBtn.classList.remove("active");
        setTimeout(() => {
          arrayAllInputs.forEach((input) => (input.value = ""));
          textarea.value = "";
          textareaDecoration.style.top = "44px";
          phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
          emailInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
        }, 400);
      } else if (calculateWrap.classList.contains("active")) {
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
        }
        calculateWrap.style.height = "100vh";
        applicationForm.style.position = `fixed`;

        modalHandler("block");
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
        calculateWrap.style.position = `fixed`;
        calculateWrap.classList.remove("active");
        navIcon.classList.remove("active");
        header.classList.remove("active");
        requestBtn.classList.remove("active");
        totalPriceSum.classList.remove("active");
        setTimeout(() => {
          destinationAddress = "";
          originAddress = "";
          originInput.value = "";
          destinationInput.value = "";
          weightInput.value = "";
          volumeInput.value = "";
          quantityInput.value = "";
        }, 400);
      } else if (
        formUser.classList.contains("req-success") &&
        applicationForm.classList.contains("active")
      ) {
        applicationForm.classList.remove("active");
        applicationForm.style.height = "100vh";
        applicationForm.style.position = `fixed`;
        modalHandler("block");
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
        applicationForm.style.position = `fixed`;
        formUser.classList.remove("req-success");
        setTimeout(() => {
          titleSubmit.remove();
        }, 400);
        formUser.classList.remove("req-success");
        const titleSubmit = document.querySelector(".title-submit");
        titleSubmit.classList.remove("req-success");
        applicationForm.classList.remove("active");
        header.classList.remove("active");
        navIcon.classList.remove("active");
        requestBtn.classList.remove("active");
      } else if (
        formUser.classList.contains("req-error") &&
        applicationForm.classList.contains("active")
      ) {
        applicationForm.classList.remove("active");
        applicationForm.style.height = "100vh";
        calculateWrap.style.position = `fixed`;

        modalHandler("block");
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
        applicationForm.style.position = `fixed`;
        formUser.classList.remove("req-error");
        const titleError = document.querySelector(".title-error");
        setTimeout(() => titleError.remove(), 400);
        titleError.classList.remove("req-error");
        header.classList.remove("active");
        navIcon.classList.remove("active");
        requestBtn.classList.remove("active");
      } else {
        navIcon.classList.toggle("active");
        nav.classList.toggle("active");
        header.classList.toggle("active");
        requestBtn.classList.toggle("active");
      }
      const calcTextMessage = document.querySelector(".calc-text-message");

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
      if (
        calculateWrap.classList.contains("active") &&
        formCalc.classList.contains("req-error")
      ) {
        calculateWrap.style.height = "100vh";
        calculateWrap.style.position = `fixed`;

        modalHandler("block");
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
        calculateWrap.style.position = `fixed`;
        const titleError = document.querySelector(".title-error");
        setTimeout(() => titleError.remove(), 400);
        titleError.classList.remove("req-error");
        formCalc.classList.remove("req-error");
      }
      return;
    }
    if (event.target.closest("#request-js")) {
      scrollTo = window.scrollY;
      setTimeout(() => {
        applicationForm.classList.add("active");
      }, 400);
      setTimeout(() => {
        modalHandler("none");
        applicationForm.style.position = `absolute`;
        applicationForm.style.height = "150vh";
      }, 1000);
      applicationForm.style.display = "flex";
      header.classList.add("active");
      navIcon.classList.add("active");
      requestBtn.classList.add("active");
      return;
    }
    if (event.target.closest("#calculate-btn")) {
      document.head.appendChild(script);
      scriptGoogle = true;
      scrollTo = window.scrollY;
      setTimeout(() => {
        calculateWrap.classList.add("active");
      }, 400);
      setTimeout(() => {
        modalHandler("none");
        calculateWrap.style.height = "150vh";
        calculateWrap.style.position = `absolute`;
      }, 1000);
      calculateWrap.style.display = "flex";
      header.classList.add("active");
      navIcon.classList.add("active");
      requestBtn.classList.add("active");
      calcBtn.disabled = false;
      return;
    }
    if (event.target.closest("#nav-calc")) {
      scrollTo = window.scrollY;
      setTimeout(() => {
        calculateWrap.classList.add("active");
      }, 400);
      setTimeout(() => {
        modalHandler("none");
        calculateWrap.style.height = "150vh";
        calculateWrap.style.position = `absolute`;
      }, 1000);
      calculateWrap.style.display = "flex";
      requestBtn.classList.add("active");
      calcBtn.disabled = false;
      return;
    }
    if (event.target.closest("#list-nav-js")) {
      nav.classList.remove("active");
      if (!calculateWrap.classList.contains("active")) {
        navIcon.classList.remove("active");
        requestBtn.classList.remove("active");
      }
      return;
    }
    if (event.target.closest("#checkbox-arrow")) {
      checked = arrowDown.checked;
      if (checked === false) {
        wrapperListPrice.animate(
          [
            {
              height: priceListHeightOpen,
            },
            {
              height: priceListHeightClose,
            },
          ],
          {
            duration: 400,
            easing: "ease-in",
            fill: "forwards",
          }
        );
        arrow.animate(
          [
            {
              transform: "rotateX(180deg)",
            },
            {
              transform: "rotateX(0)",
            },
          ],
          {
            duration: 400,
            easing: "ease-in-out",
            fill: "forwards",
          }
        );
      }
      if (checked === true) {
        wrapperListPrice.animate(
          [
            {
              height: priceListHeightClose,
            },
            {
              height: priceListHeightOpen,
            },
          ],
          {
            duration: 400,
            easing: "ease-in-out",
            fill: "forwards",
          }
        );
        arrow.animate(
          [
            {
              transform: "rotateX(0)",
            },
            {
              transform: "rotateX(180deg)",
            },
          ],
          {
            duration: 400,
            easing: "ease-in-out",
            fill: "forwards",
          }
        );
      }
      return;
    }

    if (event.target.closest("#request-calculate")) {
      scrollTo = window.scrollY;
      setTimeout(() => {
        applicationForm.classList.add("active");
      }, 400);
      setTimeout(() => {
        applicationForm.style.position = `absolute`;
        applicationForm.style.height = "150vh";
        calculateWrap.classList.remove("active");
        totalPriceSum.classList.remove("active");
        formCalc.classList.remove("total-price-open");
        totalPrice.classList.remove("total-price-open");
        calculateWrap.style.height = "100vh";
        calculateWrap.style.position = `fixed`;
      }, 1000);
      applicationForm.style.display = "flex";

      navIcon.classList.add("active");
      requestBtn.classList.add("active");
      return;
    }
  });
});

textarea.addEventListener("focus", () => {
  textareaDecoration.style.top = "98px";
});

phoneInput.addEventListener("focus", (e) => {
  if (e.target.value.length === 0) {
    phoneInput.value = "+38";
    return;
  }
});

textarea.addEventListener("blur", () => {
  if (textarea.value.length === 0) {
    textareaDecoration.style.top = "44px";
  }
});

let phoneFirstIndex = phoneInput.value[0];
let phoneSecondIndex = phoneInput.value[1];

body.addEventListener("input", (e) => {
  if (phoneFirstIndex === "0" && phoneInput.value.length === 10) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
  }
  if (
    phoneFirstIndex === "3" &&
    phoneSecondIndex === "8" &&
    phoneInput.value.length === 12
  ) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
  }
  if (phoneInput.value.includes("+38") && phoneInput.value.length === 13) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
  }
  if (phoneFirstIndex === "8" && phoneInput.value.length === 11) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
  }
  if (
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
      emailInput.value
    )
  ) {
    emailInput.style.borderBottom = "1px solid rgba(255, 255, 255)";
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

const formBtn = document.querySelector("#form-user__btn");

formUser.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (phoneFirstIndex === "0" && phoneInput.value.length !== 10) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
    return;
  }

  if (
    phoneFirstIndex === "3" &&
    phoneSecondIndex === "8" &&
    phoneInput.value.length !== 12
  ) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
    return;
  }

  if (phoneInput.value.includes("+38") && phoneInput.value.length !== 13) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
    return;
  }

  if (phoneFirstIndex === "8" && phoneInput.value.length !== 11) {
    phoneInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
    return;
  }

  if (
    !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
      emailInput.value
    )
  ) {
    emailInput.style.borderBottom = "1px solid rgba(255, 0, 0)";
    return;
  }

  applicationForm.insertAdjacentHTML(
    "beforeend",
    `<div id="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`
  );
  const spinner = document.querySelector("#spinner");
  spinner.classList.add("lds-spinner");
  formBtn.disabled = true;
  let bodyPost;
  if (scriptGoogle) {
    bodyPost = {
      email,
      name: fullName,
      phone,
      text: comments,
      originCity: originAddress,
      destinationCity: destinationAddress,
      weight: weight ? weight : null,
      volume: volume ? volume : null,
    };
  } else {
    bodyPost = {
      email,
      name: fullName,
      phone,
      text: comments,
    };
  }

  fetch("https://powerful-dawn-69442.herokuapp.com/sendtome", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(bodyPost),
  })
    .then(() => {
      formUser.insertAdjacentHTML(
        "afterend",
        `<p class="title-submit">Дякуємо за Вашу заявку🔥 Наш менеджер зв'яжеться з Вами найближчим часом.</p>`
      );
      formUser.classList.add("req-success");
      const titleSubmit = document.querySelector(".title-submit");
      setTimeout(() => titleSubmit.classList.add("req-success"), 400);
    })
    .catch((error) => {
      console.log(error);
      formUser.insertAdjacentHTML(
        "afterend",
        `<p class="title-error">Щось пішло не так😟 На жаль, ми не може отримати цю інформацію прямо зараз. Будь
          ласка, спробуйте пізніше. Якщо проблема буде повторюватися, зверніться до менеджера.</p>`
      );
      formUser.classList.add("req-error");
      const titleError = document.querySelector(".title-error");
      setTimeout(() => titleError.classList.add("req-error"), 400);
    })
    .finally(() => {
      spinner.remove();
      arrayAllInputs.forEach((input) => (input.value = ""));
      textarea.value = "";
      textareaDecoration.style.top = "44px";
      formBtn.disabled = false;
    });
});
