// This file displays the data in table format

import { state } from "./state.js";
import { dom } from "./dom.js";

export function showCurrentPageData(){
    const rowsPerPage = Number(dom.rowInput.value);
    const endIndex = state.startIndex + rowsPerPage;
    const currentPageData = state.csvJson.slice(state.startIndex, endIndex);
    displayTable(currentPageData);
}

export function displayTable(currentData) {
    dom.tbody.innerHTML = "";
    dom.thead.innerHTML = "";

    const tr = document.createElement("tr");

    // Appending headers from visible columns
    state.visibleColumn.forEach((value) => {
        const th = document.createElement("th");
        th.innerHTML = value;
        tr.appendChild(th);
    })

    dom.thead.appendChild(tr);

    // Appending the values from visible columns

    currentData.forEach((obj) => {
        const tr = document.createElement("tr");
        state.visibleColumn.forEach((col) => {
            const td = document.createElement("td");
            td.innerHTML = obj[col];
            tr.appendChild(td);
        })
        dom.tbody.appendChild(tr)
    })
}
