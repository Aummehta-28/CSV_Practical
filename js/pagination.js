// This file handles Next Page , Prev Page , Jump to Page , No of Rows in Current Page

import { state } from "./state.js";
import { dom } from "./dom.js";
import { showCurrentPageData } from "./table.js";
import { savetolocal } from "./storage.js";

export function handleNextBtn() {
  
    const rowsPerPage = Number(dom.rowInput.value);
    
    // Handles the next Page for out of range Page
    if (state.currentPage >= state.csvJson.length / rowsPerPage) {
        return;
    }
    state.currentPage++;
    dom.numInput.value = state.currentPage;
   
    state.startIndex = state.startIndex + rowsPerPage;
    showCurrentPageData();
    savetolocal();

}


// Handles the Prev Button and Display Previous Page Data
export function handlePrevBtn() {
    if (state.currentPage <= 1) {
        return;
    }
    state.currentPage--;

    dom.numInput.value = state.currentPage;

    const rowsPerPage = Number(dom.rowInput.value);

    state.startIndex = state.startIndex - rowsPerPage;

    // Handles Negative index for prev Button
    if (state.startIndex < 0) {
        state.startIndex = 0;
    }
    showCurrentPageData();
    savetolocal();
}


// It moves to particular page that user inputs it
export function handlePageBtn() {

    const rowsPerPage = Number(dom.rowInput.value);
    if (dom.numInput.value > state.csvJson.length / rowsPerPage) {
        dom.numInput.value = state.csvJson.length / rowsPerPage
    }
    // Handles negative value.
    if (dom.numInput.value < 1) {
        state.currentPage = 1;
        dom.numInput.value = 1;

    }

    state.currentPage = Number(dom.numInput.value);

    state.startIndex = (Number(dom.numInput.value) - 1) * rowsPerPage;
    showCurrentPageData();
    savetolocal();
}


// Display no of rows that user selects

export function handleRows() {
    const rowsPerPage = Number(dom.rowInput.value);

    state.currentPage = Math.floor(state.startIndex / rowsPerPage) + 1;
    dom.numInput.value = state.currentPage;

    state.startIndex = (state.currentPage - 1) * rowsPerPage;

    
    dom.totalPages.textContent = `/ ${Math.ceil(state.csvJson.length / rowsPerPage)}`;
    showCurrentPageData();
    savetolocal();
}
