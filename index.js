//2308-ACC-ET-WEB-PT-B
const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b';
const EVENTS = `${BASE_URL}/events`;

const FORM = document.querySelector('form');
FORM.addEventListener('submit', async function (event) {
    event.preventDefault();
    const elements = FORM.elements;
    const partyName = elements['partyName'].value;
    const partyDate = elements['partyDate'].value;
    const partyTime = elements['partyTime'].value;
    const partyLocation = elements['partyLocation'].value;
    const partyDescription = elements['partyDescription'].value;
    
    const newParty = {
        name: partyName,
        date: `${partyDate}T${partyTime}:00Z`,
        location: partyLocation,
        description: partyDescription,
    }
    await createEvent(newParty);
    fetchEvents();
})

function createPartyCard(title, date, address, description) {
    const PARTY_CARDS = document.querySelector("#cards");
    const PARTY_CARD = document.createElement("div");
    PARTY_CARD.classList.add('card')
    const PARTY_CARD_TITLE = document.createElement("h2");
    PARTY_CARD_TITLE.classList.add('title')
    PARTY_CARD_TITLE.textContent = title;
    const PARTY_CARD_DATE = document.createElement("p");
    PARTY_CARD_DATE.classList.add('date')
    PARTY_CARD_DATE.textContent = date;
    const PARTY_CARD_ADDRESS = document.createElement("p");
    PARTY_CARD_ADDRESS.classList.add('address')
    PARTY_CARD_ADDRESS.textContent = address;
    const PARTY_CARD_DESCRIPION = document.createElement("p");
    PARTY_CARD_DESCRIPION.classList.add('description')
    PARTY_CARD_DESCRIPION.textContent = description;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => {
        deleteEvent(party.id)
    });

    PARTY_CARD.append(PARTY_CARD_TITLE, PARTY_CARD_DATE, PARTY_CARD_ADDRESS, PARTY_CARD_DESCRIPION, deleteButton);
    PARTY_CARDS.append(PARTY_CARD);
};

function renderPartycards(parties) {
    for(const party of parties) {
        createPartyCard(party.name, party.date, party.location, party.description);
    }
}

async function deleteEvent(id) {
    console.log("deleted");
    try {
        const response = await fetch(`${EVENTS}/$(id)`, {
            method: 'DELETE',
            headers: {'Content-Type': 'applicaiton/json'},
            body: JSON.stringify(id),
        });
        if(!response.ok) {
            console.log('API error', response)
            return
        }
    }catch(err) {
        console.error(err);
    }
}


async function fetchEvents() {
    try {
        const response = await fetch(EVENTS);
        if(!response.ok) {
            console.log('API error', response.status)
            return 
        }
        const jsonResponse = await response.json(); 
        const parties = jsonResponse.data;
        renderPartycards(parties);
    } catch(err) {
        console.error(err);
    }
}

async function createEvent(event) {
    try {
        const response = await fetch(EVENTS, {
            method: 'POST',
            headers: {'Content-Type': 'applicaiton/json'},
            body: JSON.stringify(event),
        });
        if(!response.ok) {
            console.log('API error', response)
            return
        }
        const jsonResponse = await response.json(); 
        const parties = jsonResponse.data;
        console.log(parties);
    }catch(err) {
        console.error(err);
    }
}

fetchEvents()