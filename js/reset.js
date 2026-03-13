// This files resets to default settings

import { state } from "./state.js";
import { dom } from "./dom.js";

import { displayTable } from "./table.js";

export function handleReset() {
    dom.searchBtn.value = "";
    dom.numInput.value = 1;
    state.currentPage = 1;
    dom.rowInput.value = 10
    let currentPageData = state.fulldata.slice(0, 10);
    state.csvJson = [...state.fulldata];
    dom.totalPages.textContent = `/ ${Math.ceil(state.csvJson.length / 10)}`;
    displayTable(currentPageData);
}