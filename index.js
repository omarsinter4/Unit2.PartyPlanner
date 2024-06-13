const API_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ftb-et-web-ft/events";
const partyList = document.getElementById("partyList");
const newPartyForm = document.getElementById("newPartyForm");

// Fetch and display parties
async function fetchParties() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const parties = data.data; // Access the array of parties

    partyList.innerHTML = "";
    parties.forEach((party) => {
      partyList.innerHTML += `
        <div class="party">
          <h3>${party.name}</h3>
          <p>Date: ${party.date}</p>
          <p>Time: ${party.time}</p>
          <p>Location: ${party.location}</p>
          <p>Description: ${party.description}</p>
          <button onclick="deleteParty(${party.id})">Delete</button>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching parties:", error);
    partyList.innerHTML = "<p>Error loading parties. Please try again.</p>";
  }
}

// Add new party (with basic validation)
newPartyForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Basic validation
  if (!document.getElementById("name").value) {
    alert("Please enter a party name.");
    return;
  }

  const newParty = {
    name: document.getElementById("name").value,
    // ... rest of the party data from the form
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newParty),
    });
    fetchParties(); // Refresh the party list
    newPartyForm.reset(); // Clear the form
  } catch (error) {
    console.error("Error adding party:", error);
    alert("Error adding party. Please try again.");
  }
});

// Delete party
async function deleteParty(partyId) {
  try {
    await fetch(`${API_URL}/${partyId}`, { method: "DELETE" });
    fetchParties(); // Refresh the party list
  } catch (error) {
    console.error("Error deleting party:", error);
    alert("Error deleting party. Please try again.");
  }
}

// Initial fetch
fetchParties();
