"use strict";

var script = document.createElement("script");
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCTO6ndw3DApqJaohZdLLcmdfLH1izMej8&libraries=places&distancematrix&callback=initMap";
script.async = true;

window.initMap = function () {
  var options = {
    types: ["(cities)"],
    componentRestrictions: {
      country: "ua"
    }
  };
  var originAutocomplete = new google.maps.places.Autocomplete(originInput, options);
  var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, options);
  var destinationAddress, originAddress;
  destinationAutocomplete.addListener("place_changed", function () {
    var place = destinationAutocomplete.getPlace();
    destinationAddress = place.formatted_address;
  });
  originAutocomplete.addListener("place_changed", function () {
    var place = originAutocomplete.getPlace();
    originAddress = place.formatted_address;
  });

  function calculateDistance() {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [originAddress],
      destinations: [destinationAddress],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.metric,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
  }

  function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      console.log("error");
    } else {
      var distance = response.rows[0].elements[0].distance;
      var distance_in_kilo = distance.value / 1000;
      TestCalcPrice(distance_in_kilo, quantityInput.value);
    }
  }

  formCalc.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!destinationAddress || !originAddress) {
      var _calcTextMessage = document.querySelector(".calc-text-message");

      if (!_calcTextMessage) {
        calcWrapMessage.insertAdjacentHTML("afterbegin", "<span class=\"calc-text-message\">\n          \u0411\u0443\u0434\u044C-\u043B\u0430\u0441\u043A\u0430, \u043E\u0431\u0435\u0440\u0456\u0442\u044C \u043C\u0456\u0441\u0442\u043E \u0456\u0437 \u0437\u0430\u043F\u0440\u043E\u043F\u043E\u043D\u043E\u0432\u0430\u043D\u043E\u0433\u043E \u0441\u043F\u0438\u0441\u043A\u0443.\n        </span>");

        var _calcTextMessage2 = document.querySelector(".calc-text-message");

        setTimeout(function () {
          return _calcTextMessage2.classList.add("active");
        }, 400);
      }

      return;
    }

    if (destinationAddress === originAddress) {
      var _calcTextMessage3 = document.querySelector(".calc-text-message");

      if (!_calcTextMessage3) {
        calcWrapMessage.insertAdjacentHTML("afterbegin", "<span class=\"calc-text-message\">\n          \u0411\u0443\u0434\u044C-\u043B\u0430\u0441\u043A\u0430, \u043E\u0431\u0435\u0440\u0456\u0442\u044C \u0440\u0456\u0437\u043D\u0456 \u043C\u0456\u0441\u0442\u043E \u0456\u0437 \u0441\u043F\u0438\u0441\u043A\u0443.\n        </span>");

        var _calcTextMessage4 = document.querySelector(".calc-text-message");

        setTimeout(function () {
          return _calcTextMessage4.classList.add("active");
        }, 400);
      }

      return;
    }

    totalPrice.insertAdjacentHTML("beforeend", "<div id=\"spinner\">\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n      </div>");
    var spinner = document.querySelector("#spinner");
    spinner.classList.add("lds-spinner", "lds-spinner--fix");
    calcBtn.disabled = true;
    calculateDistance();
    setTimeout(function () {
      destinationAddress = "";
      originAddress = "";
      originInput.value = "";
      destinationInput.value = "";
      weightInput.value = "";
      volumeInput.value = "";
      quantityInput.value = "";
    }, 2000);
    var calcTextMessage = document.querySelector(".calc-text-message");

    if (calcTextMessage && calcTextMessage.classList.contains("active")) {
      calcTextMessage.remove();
    }
  });

  var TestCalcPrice = function TestCalcPrice(distance, quantity) {
    fetch("https://powerful-dawn-69442.herokuapp.com/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        distance: distance,
        quantity: quantity
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      totalPriceSum.innerText = "".concat(data.firstPrice, " ... ").concat(data.secondPrice, " \u0433\u0440\u043D.");
      formCalc.classList.add("total-price-open");
      totalPrice.classList.add("total-price-open");
    })["catch"](function (error) {
      if (error) {
        console.log(error);
        calculateWrap.insertAdjacentHTML("beforeend", "<p class=\"title-error\">\u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A\uD83D\uDE1F \u041D\u0430 \u0436\u0430\u043B\u044C, \u043C\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435 \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0446\u044E \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044E \u043F\u0440\u044F\u043C\u043E \u0437\u0430\u0440\u0430\u0437. \u0411\u0443\u0434\u044C\n              \u043B\u0430\u0441\u043A\u0430, \u0441\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u0456\u0437\u043D\u0456\u0448\u0435. \u042F\u043A\u0449\u043E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u0431\u0443\u0434\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u044E\u0432\u0430\u0442\u0438\u0441\u044F, \u0437\u0432\u0435\u0440\u043D\u0456\u0442\u044C\u0441\u044F \u0434\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430.</p>");
        formCalc.classList.add("req-error");
        var titleError = document.querySelector(".title-error");
        setTimeout(function () {
          return titleError.classList.add("req-error");
        }, 400);
      }
    })["finally"](function () {
      var spinner = document.querySelector("#spinner");
      setTimeout(function () {
        spinner.classList.add("active");
        totalPriceSum.classList.add("active");
        spinner.remove();
      }, 800);
    });
  };
};

document.head.appendChild(script);