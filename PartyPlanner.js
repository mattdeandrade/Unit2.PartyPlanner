const COHORT = "2408-mattd";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;

const parties = [];
const init = async () => {
  try {
    const response = await fetch(API_URL);
    const parsed = await response.json();

    if (!response.ok) {
      throw new Error(parsed.error.message);
    }
    let theData = parsed.data;
    for (party of theData) {
      parties.push(party);
    }
  } catch (e) {
    console.error(e);
  }
  render();
};

const $partyForm = document.querySelector("form");
$partyForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const $partyFormName = document.querySelector("#partyName");
  const $partyFormDate = document.querySelector("#partyDate");
  const $partyFormLocation = document.querySelector("#partyLocation");
  const $partyFormDescription = document.querySelector("#partyDescription");

  const party = {
    name: $partyFormName.value,
    date: new Date($partyFormDate.value).toISOString(),
    location: $partyFormLocation.value,
    description: $partyFormDescription.value,
  };
  await addPartyToDatabase(party);
});

/* const thing = {
  name: "holiday",
  description: "festivus for the rest of us",
  location: "000 street",
  date: "2011-10-05T14:48:00.000Z",
}; */

const addPartyToDatabase = async (party) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(party),
    });
    const result = await response.json();
    console.log(result);

    if (result.success) {
      parties.push(result.data);
    }
  } catch (e) {
    console.error(e);
  }
  render();
};

function render() {
  const $parties = parties.map((party) => {
    const $row = document.createElement("tr");
    const readDate = new Date(party.date);

    const $partyName = document.createElement("td");
    $partyName.textContent = party.name;
    $row.appendChild($partyName);

    const $partyDate = document.createElement("td");
    $partyDate.textContent = readDate;
    $row.appendChild($partyDate);

    const $partyLocation = document.createElement("td");
    $partyLocation.textContent = party.location;
    $row.appendChild($partyLocation);

    const $partyDescription = document.createElement("td");
    $partyDescription.textContent = party.description;
    $row.appendChild($partyDescription);

    const $deleteBTN = document.createElement("button");
    $deleteBTN.textContent = "Delete this Party";
    $deleteBTN.addEventListener("click", async (event) => {
      event.preventDefault();
      await deleteFromDatabase(party);
      render();
    });
    $row.appendChild($deleteBTN);
    return $row;
  });
  const $partiesList = document.querySelector(".parties");
  $partiesList.replaceChildren(...$parties);
}

async function deleteFromDatabase(party) {
  fetch(API_URL + party.id, {
    method: "DELETE",
  });
  try {
    const response = await fetch(API_URL + party.id, {
      method: "DELETE",
    });

    if (!response.ok) {
      const parsed = await response.json();
      throw new Error(parsed.error.message);
    }
  } catch (e) {
    console.error(e);
  }
  deleteFromArray(party);
  render();
}

function deleteFromArray(party) {
  let index;
  for (let i = 0; i < parties.length; i++) {
    if (parties[i].id === party.id) index = i;
  }
  for (let i = index; i < parties.length - 1; i++) {
    parties[i] = parties[i + 1];
  }
  parties.pop();
}

init();
console.log(parties);
