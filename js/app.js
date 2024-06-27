let btn = document.querySelector("#btn");
const countryList = document.querySelectorAll(".inners select");
let flag1 = document.querySelector("#from-img");
let flag2 = document.querySelector("#to-img");
let from_value = "USD";
let to_value = "INR";
const amount = document.querySelector("#amount");

for (let select of countryList) {
    for (let currency_code in country_list) {
        let newOption = document.createElement("option");
        newOption.innerText = currency_code;
        newOption.value = currency_code;
        // To choose the selected options
        if (select.name === "from-currency" && currency_code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to-currency" && currency_code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        if (evt.target.name === "from-currency") {
            updateFlag1(evt.target);
        } else if (evt.target.name === "to-currency") {
            updateFlag2(evt.target);
        }
    });
}

const updateFlag1 = (elem) => {
    let currCode1 = elem.value;
    from_value = currCode1;
    console.log(`From: ${currCode1}`);
    let countryCode1 = country_list[currCode1];
    let flagLink = `https://flagsapi.com/${countryCode1}/shiny/64.png`;
    flag1.src = flagLink;
};

const updateFlag2 = (elem) => {
    let currCode2 = elem.value;
    to_value = currCode2;
    console.log(`To: ${currCode2}`);
    let countryCode2 = country_list[currCode2];
    let flagLink = `https://flagsapi.com/${countryCode2}/shiny/64.png`;
    flag2.src = flagLink;
};

async function getExchangeRate() {
    let amountVal = amount.value;
    if (amountVal == "" || amountVal <= "0") {
        amount.value = "1";
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/cc040e6b7d28f91b5972fa21/latest/${from_value}`;
    console.log(url);
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let result = await response.json();
        let exchangedData = result.conversion_rates[to_value];
        let totalExchangedData = (amountVal * exchangedData).toFixed(2);
        console.log(exchangedData);
        let display = document.querySelector("#response");
        display.innerText = `1 ${from_value} = ${exchangedData} ${to_value}\n${amountVal} ${from_value} = ${totalExchangedData} ${to_value}`;
    } catch (error) {
        console.error("Fetch error:", error);
        let display = document.querySelector("#response");
        display.innerText = "Error fetching exchange rate data.";
    }
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    let display = document.querySelector("#response");
    document.getElementById("response").style.display = "block";
    console.log("btn pressed.");
    getExchangeRate();
});

amount.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      getExchangeRate();
    console.log("enter key pressed.");
    }
  });