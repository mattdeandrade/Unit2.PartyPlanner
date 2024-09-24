const COHORT = "2408-matt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}`;

const parties = [];
function loadParties() {
  //TODO retrieve parties from Databse
}

//function call loadParties
let initialKey = 0;
function addParty(pname, pdate, ptime, plocation, pdescription) {
  const newParty = {};
  newParty.key = initialKey;
  newParty.name = pname;
  newParty.date = pdate;
  newParty.time = ptime;
  newParty.location = plocation;
  newParty.description = pdescription;
  parties.push(newParty);
  console.log(parties);
  render();
  initialKey++;
  //TODO add to Database
}

function deleteParty(key) {
  const newPartiesSize = parties.length - 1;

  for (let i = key; i < newPartiesSize; i++) {
    parties[i].key == parties[i + 1].key;
    parties[i].name = parties[i + 1].name;
    parties[i].date = parties[i + 1].date;
    parties[i].time = parties[i + 1].time;
    parties[i].location = parties[i + 1].location;
    parties[i].description = parties[i + 1].description;

    //TODO delete from Database
  }
  parties.pop();
  render();
}

const $form = document.querySelector("form");
$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const $partyName = document.querySelector("#partyName");
  const $partyDate = document.querySelector("#partyDate");
  const $partyTime = document.querySelector("#partyTime");
  const $partyLocation = document.querySelector("#partyLocation");
  const $partyDescription = document.querySelector("#partyDescription");

  const pname = $partyName.value;
  const pdate = $partyDate.value;
  const ptime = $partyTime.value;
  const plocation = $partyLocation.value;
  const pdescription = $partyDescription.value;

  addParty(pname, pdate, ptime, plocation, pdescription);
});
console.log(parties);

function render() {
  const $parties = parties.map((party) => {
    const $row = document.createElement("tr");

    const $partyName = document.createElement("td");
    $partyName.textContent = party.name;
    $row.appendChild($partyName);

    const $partyDate = document.createElement("td");
    $partyDate.textContent = party.date;
    $row.appendChild($partyDate);

    const $partyTime = document.createElement("td");
    $partyTime.textContent = party.time;
    $row.appendChild($partyTime);

    const $partyLocation = document.createElement("td");
    $partyLocation.textContent = party.location;
    $row.appendChild($partyLocation);

    const $partyDescription = document.createElement("td");
    $partyDescription.textContent = party.description;
    $row.appendChild($partyDescription);

    const $deleteBTN = document.createElement("button");
    $deleteBTN.textContent = "Delete this Party";
    $deleteBTN.addEventListener("click", (event) => {
      event.preventDefault();
      deleteParty(party.key);
    });
    $row.appendChild($deleteBTN);

    return $row;
  });

  const $partiesList = document.querySelector(".parties");
  $partiesList.replaceChildren(...$parties);
}
console.log(parties);
console.log(initialKey);
