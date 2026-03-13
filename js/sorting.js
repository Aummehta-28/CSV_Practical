// This file handles sorting of data 

import { state } from "./state.js";
import { displayTable } from "./table.js";
import { dom } from "./dom.js";
import { savetolocal } from "./storage.js";

// Handles sorting and Display the sorted data
export function handleSort(event) {
    let columnName = event.target.innerHTML;

    // Stores the sorting position
    if (state.sortPos[columnName] === "asc") {
        state.sortPos[columnName] = "desc";
    } else {
        state.sortPos[columnName] = "asc";
    }


    state.csvJson.sort((a, b) => {
        let valueA = a[columnName];
        let valueB = b[columnName];

        if (!isNaN(valueA)) {
            valueA = parseInt(valueA);
            valueB = parseInt(valueB);
            if (state.sortPos[columnName] === "asc") {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        } else {
            if (state.sortPos[columnName] === "asc") {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        }
    })


    state.currentPage = 1;
    dom.numInput.value = 1;
    state.startIndex = 0;
    let rowsPerPage = Number(dom.rowInput.value);
    let endIndex = state.startIndex + rowsPerPage;
    let currentPageData = state.csvJson.slice(state.startIndex, endIndex);
    displayTable(currentPageData);
    savetolocal();
}

