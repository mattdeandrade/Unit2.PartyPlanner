const COHORT = "2408-matt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}`;

const parties = [];
const newParty = {};

function addParty(Title) {
  newParty.name = Title;

  //render();
  parties.push(newParty);
  console.log(parties);
}

function deleteParty(index) {
  const newPartiesSize = parties.length - 1;
  for (let i = index; i < newPartiesSize; i++) {
    parties[i].name = parties[i + 1];
  }
  parties.pop();
}

const $form = document.querySelector("form");
$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const $partyName = document.querySelector("#partyName");

  const Title = $partyName.value;
  addParty(Title);
});
console.log(parties);

const $deleteBTN=document.querySelector("#delete");
$deleteBTN.addEventListener("submit", (event)=>{
event.preventDefault();


});



console.log(parties);
