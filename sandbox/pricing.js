onload = initPricing();

function initPicing() {
  console.log('working')
  // Delete the "Feature" text
  var div = document.querySelector("header");

  // Get all the child nodes of the div
  var nodes = div.childNodes;

  // Loop through child nodes to find and remove text nodes
  for (var i = 0; i < nodes.length; i++) {
    // Node type 3 is a text node
    if (nodes[i].nodeType === Node.TEXT_NODE) {
      // Remove the text node
      div.removeChild(nodes[i]);

      // We have to decrement i because the childNodes list is live
      i--;
    }
  }
  var geoip;
  let isGeoIp;
  var countrycode;
  let euElements = document.querySelectorAll("[loc=eu]");
  euElements.forEach(element=>{
  element.prevDisplay = element.style.display
  element.style.display = 'none'
  })
  let usElements = document.querySelectorAll("[loc=us]");
  usElements.forEach(element=>{
  element.prevDisplay = element.style.display
  element.style.display = 'none'
  })
  
  let isEurope = false;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://get.geojs.io/v1/ip/geo.js";
  document.body.appendChild(script);
  function geoip(json) {
    var userip = json.ip;
    countrycode = json.country_code;
    var timezone = json.timezone;
    var country = json.country;
    var city = json.city;
    var latitude = json.latitude;
    var longitude = json.longitude;

    console.log(json.country_code);
    console.log(json.ip);

    european_countries = [
      "AT",
      "BE",
      "BG",
      "HR",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "FR",
      "DE",
      "GR",
      "HU",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MT",
      "NL",
      "PL",
      "PT",
      "RO",
      "SK",
      "SI",
      "ES",
      "SE",
      "UK",
      "GB",
      "AR"
    ];
    counter = 0;

    european_countries.forEach((country) => {
      if (countrycode == country) counter++;
    });

    setTimeout(function () {
      if (counter > 0) {
        isEurope = true;
        usElements.forEach((element) => {
          element.style.display = "none";
        });
        euElements.forEach((element) => {
        element.style.display = element.prevDisplay
        });
      } else {
        isEurope = false;
        usElements.forEach((element) => {
         element.style.display = element.prevDisplay
        });
        euElements.forEach((element) => {
          element.style.display = "none";
        });
      }
    }, 1500);
  }

  /* 

<script>
  var geoip;
</script>
<script type="application/javascript">
  //let isGeoIp;
  var countrycode;
  let light_plan = document.querySelector("#light_plan");
  let standard_plan = document.querySelector("#standard_plan");
  let pro_plan = document.querySelector("#pro_plan");
  let light_descr = document.querySelector("#light_descr");
  let standard_descr = document.querySelector("#standard_descr");
  let pro_descr = document.querySelector("#pro_descr");
  let packAddons = document.querySelectorAll(".apps-addon");
  let addonPrice = document.querySelector("#addon-price");
  let changeBank = document.querySelector("#change-bank");
  let changeAppsAddon = document.querySelectorAll(".change-apps-addon");
  let changeAppsEngage = document.querySelectorAll(".change-apps-engage");
  let changeCashback = document.querySelectorAll(".change-cashback");
  let showEu = document.querySelectorAll(".show-eu");
  //let isEurope = false;
  let cashbackChange = document.querySelector('#cashback-change')

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://get.geojs.io/v1/ip/geo.js";
  document.body.appendChild(script);

  function geoip(json) {
    var userip = json.ip;
    countrycode = json.country_code;
    var timezone = json.timezone;
    var country = json.country;
    var city = json.city;
    var latitude = json.latitude;
    var longitude = json.longitude;

    console.log(json.country_code);
    console.log(json.ip);

    european_countries = [
      "AT",
      "BE",
      "BG",
      "HR",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "FR",
      "DE",
      "GR",
      "HU",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MT",
      "NL",
      "PL",
      "PT",
      "RO",
      "SK",
      "SI",
      "ES",
      "SE",
      "UK",
      "GB",
    ];
    counter = 0;
    european_countries.forEach((country) => {
      if (countrycode == country) counter++;
    });
	console.log("Counter: ", counter);
    if (counter > 0) {
      isEurope = true;
      light_plan.textContent = "£271/mo";
      standard_plan.textContent = "£542/mo";
      pro_plan.textContent = "Call us";
      showEu.forEach((element) => {
        element.style.display = "block";
      });

      changeAppsAddon.forEach(function (thing) {
        thing.textContent = "Add 15 applications for £50/month";
        thing.style.opacity = 100;
      });
      changeAppsEngage.forEach(function (thing) {
        thing.textContent = "Additional users £2.5/month";
        thing.style.opacity = 100;

        changeCashback.forEach(function (thing) {
          thing.textContent =
            "2% cashback on all software up to the price of your plan";
          thing.style.opacity = 100;
        });

        light_plan.style.opacity = 100;
        standard_plan.style.opacity = 100;
        pro_plan.style.opacity = 100;

        changeBank.style.display = "flex";
        
        cashbackChange.textContent = "2% cashback on all software up to the price of your plan"
      });

    }
      // Yearly/monthly button switcher

      let switchBtns = document.querySelectorAll(".switch-button");
      // When click on monthly
      switchBtns[0].addEventListener("click", function () {
        this.classList.add("on");
        this.classList.remove("off");
        switchBtns[1].classList.remove("on");
        switchBtns[1].classList.add("off");

        if (isEurope) {
          document.querySelector("#light_plan").textContent = "£325/mo";
          document.querySelector("#standard_plan").textContent = "£650/mo";
          document.querySelector("#pro_plan").textContent = "Call us";
        } else {
          document.querySelector("#light_plan").textContent = "$325/mo";
          document.querySelector("#standard_plan").textContent = "$650/mo";
          document.querySelector("#pro_plan").textContent = "Call us";
        }

        document.querySelectorAll(".change-annual").forEach(function (item) {
          item.textContent = "or go annual and get two months free";
        });
      });

    // When click on yearly

    switchBtns[1].addEventListener("click", function () {
      this.classList.add("on");
      this.classList.remove("off");
      switchBtns[0].classList.remove("on");
      switchBtns[0].classList.add("off");
      if (isEurope) {
        document.querySelector("#light_plan").textContent = "£271/mo";
        document.querySelector("#standard_plan").textContent = "£542/mo";
        document.querySelector("#pro_plan").textContent = "Call us";
      } else {
        document.querySelector("#light_plan").textContent = "$271/mo";
        document.querySelector("#standard_plan").textContent = "$542/mo";
        document.querySelector("#pro_plan").textContent = "Call us";
      }

      document.querySelectorAll(".change-annual").forEach(function (item) {
        item.textContent = "Paid annually (16% savings)";
      });
    });

    setTimeout(function () {
      light_plan.style.opacity = 100;
      standard_plan.style.opacity = 100;
      pro_plan.style.opacity = 100;

      packAddons.forEach((text) => {
        text.style.opacity = 100;
        console.log("addon" + text);
      });
    }, 1500);
  }
</script>

<script>
  // create urlParams variable (constant) from URLSearchParams class using current window
  const urlParams = new URLSearchParams(window.location.search);

  // set UTM medium, source and campaign variables (constants) based on results of URSearchParams
  const utm_medium = urlParams.get("utm_medium");
  const utm_source = urlParams.get("utm_source");
  const utm_campaign = urlParams.get("utm_campaign");

  // get the RSVP button element
  var button = document.querySelector("#signup-button");
  var button2 = document.querySelector("#signup-button2");

  // edit RSVP button element property by appending the URL parameters
  button.href +=
    "&utm_medium=" +
    utm_medium +
    "&utm_source=" +
    utm_source +
    "&utm_campaign=" +
    utm_campaign;
  button2.href +=
    "&utm_medium=" +
    utm_medium +
    "&utm_source=" +
    utm_source +
    "&utm_campaign=" +
    utm_campaign;

  // log final RSVP button link to console
  console.log(button.href);
</script>

<style>
  .w-slider-dot.w-active {
    background-color: #54c8d2;
  }

  .w-slider-dot {
    background-color: #1a9c9c;
  }
</style>


*/
