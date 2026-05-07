// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2604-FTB-ET-WEB-FT";
const API = BASE + COHORT;

// === State ===
let events = [];
let selectedEvent;
let rsvps = [];
let guests = [];

/**Update state with all events from the API
 */
async function getEvents() {
  try {
    const response = await fetch(API + "/events");
    const result = await response.json();
    events = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

/**Update state with single event from API
 */
async function getEvent(id) {
  try {
    const response = await fetch(API + "/events" + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

/** Update state with RSVPs from API */
async function getRsvps() {
  try {
    const response = await fetch(API + "/rsvps");
    const result = await response.json();
    rsvps = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

/** Update state with guests from API */
async function getGuests() {
  try {
    const response = await fetch(API + "/guests");
    const result = await response.json();
    guests = result.data;
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

/** I need a function to show selected event information */
function SelectedEvent() {
  if (!selectEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a event to learn more.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <time datetime="${selectedEvent.date}">
      ${selectedEvent.date.slice(0, 10)}
    </time>
    <address>${selectedEvent.location}<?address>
    <p>&{selectedEvent.description}</p>
    <GuestList></GuestList>
    `;
  $event.querySelector("GuestList").replaceWith(GuestList());

  return $event;
}

/** I need a list of guests for the SelectedEvent */
function GuestList() {
  const $ul = document.createElement("ul");
  const selectedGuestList = guests.filter((guest) =>
    rsvps.find(
      (rsvp) => rsvp.guestId === guest.id && rsvp.eventId === selectedEvent.id,
    ),
  );
}
// === Render ===

function render() {
  const $app = document.querySelector("#app");
  //I need similar HTML elements as the gala guided practice, changing h1 to event Planner, 1st h2 to Upcoming Parties, ArtistList to eventList, 2nd h2 to event Details, ArtistDetails to eventDetails
  $app.innerHTML = `
    <h1>event Planner</h1>
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
