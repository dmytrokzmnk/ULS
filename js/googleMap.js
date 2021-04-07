var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCTO6ndw3DApqJaohZdLLcmdfLH1izMej8&libraries=places&distancematrix&callback=initMap";
script.async = true;

window.initMap = function () {
  const options = {
    types: ["(cities)"],
    componentRestrictions: {
      country: "ua",
    },
  };

  const originAutocomplete = new google.maps.places.Autocomplete(
    originInput,
    options
  );
  const destinationAutocomplete = new google.maps.places.Autocomplete(
    destinationInput,
    options
  );

  destinationAutocomplete.addListener("place_changed", () => {
    const place = destinationAutocomplete.getPlace();
    destinationAddress = place.formatted_address;
  });

  originAutocomplete.addListener("place_changed", () => {
    const place = originAutocomplete.getPlace();
    originAddress = place.formatted_address;
  });

  function calculateDistance() {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [originAddress],
        destinations: [destinationAddress],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.metric,
        avoidHighways: false,
        avoidTolls: false,
      },
      callback
    );
  }

  function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      console.log("error");
    } else {
      const distance = response.rows[0].elements[0].distance;
      const distance_in_kilo = distance.value / 1000;
      TestCalcPrice(distance_in_kilo, quantityInput.value);
    }
  }

  formCalc.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!destinationAddress || !originAddress) {
      const calcTextMessage = document.querySelector(".calc-text-message");
      if (!calcTextMessage) {
        calcWrapMessage.insertAdjacentHTML(
          "afterbegin",
          `<span class="calc-text-message">
          Будь-ласка, оберіть місто із запропонованого списку.
        </span>`
        );
        const calcTextMessage = document.querySelector(".calc-text-message");
        setTimeout(() => calcTextMessage.classList.add("active"), 400);
      }
      return;
    }
    if (destinationAddress === originAddress) {
      const calcTextMessage = document.querySelector(".calc-text-message");
      if (!calcTextMessage) {
        calcWrapMessage.insertAdjacentHTML(
          "afterbegin",
          `<span class="calc-text-message">
          Будь-ласка, оберіть різні місто із списку.
        </span>`
        );
        const calcTextMessage = document.querySelector(".calc-text-message");
        setTimeout(() => calcTextMessage.classList.add("active"), 400);
      }
      return;
    }
    calculateWrap.insertAdjacentHTML(
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
    calcBtn.disabled = true;
    calculateDistance();
    const calcTextMessage = document.querySelector(".calc-text-message");
    if (calcTextMessage && calcTextMessage.classList.contains("active")) {
      calcTextMessage.remove();
    }
  });

  const TestCalcPrice = (distance, quantity) => {
    fetch("https://powerful-dawn-69442.herokuapp.com/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        distance,
        quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        totalPriceSum.innerText = `${data.firstPrice} ... ${data.secondPrice} грн.`;
        const spinner = document.querySelector("#spinner");
        setTimeout(() => {
          spinner.classList.add("active");
          spinner.remove();
        }, 400);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          calculateWrap.insertAdjacentHTML(
            "beforeend",
            `<p class="title-error">Щось пішло не так😟 На жаль, ми не може отримати цю інформацію прямо зараз. Будь
              ласка, спробуйте пізніше. Якщо проблема буде повторюватися, зверніться до менеджера.</p>`
          );
          formCalc.classList.add("req-error");
          const titleError = document.querySelector(".title-error");
          setTimeout(() => titleError.classList.add("req-error"), 400);
        }
      })
      .finally(() => {
        setTimeout(() => {
          formCalc.classList.add("total-price-open");
          totalPrice.classList.add("total-price-open");
          originInput.value = "";
          destinationInput.value = "";
          weightInput.value = "";
          volumeInput.value = "";
          quantityInput.value = "";
        }, 400);
      });
  };
};
