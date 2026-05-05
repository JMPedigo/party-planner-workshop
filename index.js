// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2604-FTB-ET-WEB-FT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let events = [];
let selectedEvent;

/**Update state with all events from the API
 */
async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

/**Update state with single event from API
 */
async function getEvent() {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}
// === Components ===

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  //I need similar HTML elements as the gala guided practice, changing h1 to Party Planner, 1st h2 to Upcoming Parties, ArtistList to PartyList, 2nd h2 to Party Details, ArtistDetails to PartyDetails
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  render();
}

init();
