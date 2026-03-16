// This file display detailed of particular row that user selects

import { state } from "./state.js";
import { dom } from "./dom.js";

// Display indivudial Row and create a popup for that row
export function handlePopup(event) {
    dom.popChild.innerHTML = ""
    const tableRow = event.target.closest("tr");
    const headers = Object.keys(state.csvJson[0]);

    const obj = {};

    // Creates obj and assigning each column name its value
    for (let i = 0; i < tableRow.cells.length; i++) {
        let cell = tableRow.cells[i];
        obj[headers[i]] = cell.textContent;

    }

    // Appending the the object to div 
    for (const [key, value] of Object.entries(obj)) {
        const div = document.createElement("div");
        div.innerHTML = `${key} :${value}`
        dom.popChild.appendChild(div);
    }
    dom.popup.style.display = "block";
    document.querySelector("#tableDisplay").classList.add("blur")
}


// Handles for closing popup
export function handleClose() {

    dom.popup.style.display = "none";
    document.querySelector("#tableDisplay").classList.remove("blur")
}