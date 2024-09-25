const COHORT = "2408-mattd";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

let parties = [];
const loadParties = async () => {
  try {
    const response = await fetch(API_URL);
    const parsed = await response.json();

    if (!response.ok) {
      throw new Error(parsed.error.message);
    }
    const fetchedData = parsed.data;
    for (party of fetchedData)
      addParty(party.name, party.date, party.location, party.description);
  } catch (e) {
    console.error(e);
  }
};

loadParties();

let initialKey = 0;
function addParty(pname, pdate, plocation, pdescription) {
  const newParty = {};
  newParty.id = initialKey;
  newParty.name = pname;
  newParty.date = pdate;
  newParty.location = plocation;
  newParty.description = pdescription;
  parties.push(newParty);
  console.log(parties);
  addPartyToDatabase(newParty);
  render();
  initialKey++;
  //TODO add to Database
}

const addPartyToDatabase = async (party) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(party),
    });
    if (!response.ok) {
      const parsed = await response.json();
      throw new Error(parsed.error.message);
    }
  } catch (e) {
    console.error(e);
  }
};

function deleteParty(key) {
  const newPartiesSize = parties.length - 1;

  for (let i = key; i < newPartiesSize; i++) {
    parties[i].id == parties[i + 1].id;
    parties[i].name = parties[i + 1].name;
    parties[i].date = parties[i + 1].date;
    parties[i].location = parties[i + 1].location;
    parties[i].description = parties[i + 1].description;

    //TODO delete from Database
  }
  initialKey--;
  parties.pop();
  render();
}

const $form = document.querySelector("form");
$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const $partyName = document.querySelector("#partyName");
  const $partyDate = document.querySelector("#partyDate");

  const $partyLocation = document.querySelector("#partyLocation");
  const $partyDescription = document.querySelector("#partyDescription");

  const pname = $partyName.value;
  const pdate = new Date($partyDate.value).toISOString();
  const plocation = $partyLocation.value;
  const pdescription = $partyDescription.value;

  addParty(pname, pdate, plocation, pdescription);
});

function render() {
  const $parties = parties.map((party) => {
    const $row = document.createElement("tr");
    const $id = party.id;
    const $partyName = document.createElement("td");
    $partyName.textContent = party.name;
    $row.appendChild($partyName);

    const $partyDate = document.createElement("td");
    $partyDate.textContent = party.date;
    $row.appendChild($partyDate);

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
      deleteParty($id);
    });
    $row.appendChild($deleteBTN);

    return $row;
  });

  const $partiesList = document.querySelector(".parties");
  $partiesList.replaceChildren(...$parties);
}
console.log(parties);
