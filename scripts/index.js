// DONE: Create a submit button
// DONE: Add event listener to submit button
// DONE: Create function to make getYelpObj a call
// TODO: Update weather function to call only the next 3 hour increment
// TODO: 

createButton();
addInputEventListener();
// creates submit button for html

function createButton() {
    let inputContainer = document.querySelector(".userInput");
    let submitButton = document.createElement("button");
    submitButton.addEventListener("click", submitYelpCall);
    submitButton.textContent = "Submit";
    inputContainer.appendChild(submitButton);
}

function addInputEventListener() {
    let input = document.getElementById("locationInput");
    input.addEventListener("change", submitYelpCall);
    // console.log("added");
    // return input;
}

function getCurrentTime () { // gets time in seconds rather than milliseconds due to backend restrictions
    const today = new Date();
    let currentTime = parseInt(today.getTime()/1000);
    return currentTime;
}

function getEndTime(currentTime) {
    const fourDaysSeconds = 345600;
    return currentTime + fourDaysSeconds;
}

function submitYelpCall() {
    let userInput = document.getElementById("locationInput");
    let cityName = userInput.value;
    let date = getDate();
    let currentTime = getCurrentTime();
    let endTime = getEndTime(currentTime);
    const newUrl = `https://yelp-events-helper.herokuapp.com/${cityName}/${yelpapiKey}/${currentTime}/${endTime}`;
    if (cityName) {
        waitingAnimation();
        getYelpObj(newUrl);
    } else {
        ifNoResults();
    }
}

function ifNoResults() {
    let resultContainer = document.querySelector(".js-resultContainer");
        resultContainer.textContent = "Couldn't find any results";
        resultContainer.style.textAlign = "center";
        resultContainer.style.fontSize = "30px";
        resultContainer.style.padding = "100px";
        resultContainer.style.margin = "20px";
        resultContainer.style.borderRadius = "20px";
}

function clearResultContainer(obj) {
    let resultContainer = document.querySelector(".js-resultContainer");
    resultContainer.textContent = "";
    resultContainer.style.fontSize = "";
    resultContainer.style.padding = "";
    resultContainer.style.margin = "";
    resultContainer.style.borderRadius = "";
    // console.log('clearing result container');
    return obj;
}

function waitingAnimation() {
    let resultContainer = document.querySelector(".js-resultContainer");
    resultContainer.textContent = "Fetching your events. Please wait.";
    resultContainer.style.fontSize = "30px";
    resultContainer.style.padding = "100px";
    resultContainer.style.margin = "20px";
    resultContainer.style.borderRadius = "20px";
}