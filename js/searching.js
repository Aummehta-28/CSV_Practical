import { state } from "./state.js";
import { displayTable } from "./table.js";
import { dom } from "./dom.js";
import { savetolocal } from "./storage.js";
export function handleSearch() {
    state.searchValue = dom.searchBtn.value.toLowerCase();

    // Search if any row value matches the search query.

    state.csvJson = []
    for (let obj of state.fulldata) {
        for (let value of Object.values(obj)) {
            if (value.toLowerCase().includes(state.searchValue)) {
                state.csvJson.push(obj);
                break;
            }
        }
    }
    state.currentPage = 1;
    dom.numInput.value = 1;
    state.startIndex = 0;
    let rowsPerPage = Number(dom.rowInput.value);
    let endIndex = state.startIndex + rowsPerPage;
    let currentPageData = state.csvJson.slice(state.startIndex, endIndex);
    dom.totalPages.textContent = `/ ${Math.ceil(state.csvJson.length / rowsPerPage)}`;
    displayTable(currentPageData)
    savetolocal();
}