// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2604-FTB-ET-WEB-FT";
const API = BASE + COHORT;

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
/**I need a single list item containing details about the event when clicked */
function EventListItem() {
  const $li = document.createElement("li");

  if (event.id === selectedEvent.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `<a href="#selected">${event.name}</a>
  `;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

/**I need a list of event names */
function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("events");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);

  return $ul;
}

function SelectedEvent() {
  if (!selectEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }
}
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
  $app.querySelector("PartyList").replaceWith(EventList());
  $app.querySelector("PartyDetails").replaceWith(EventDetails());
}

async function init() {
  render();
}

init();
