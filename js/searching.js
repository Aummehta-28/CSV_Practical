import { state } from "./state.js";
import { showCurrentPageData } from "./table.js";
import { dom } from "./dom.js";
import { savetolocal } from "./storage.js";
export function handleSearch() {
    state.searchValue = dom.searchBtn.value.toLowerCase();

    // Search if any row value matches the search query.

    state.csvJson = []
    state.fulldata.forEach((obj) => {
        for (let col of state.visibleColumn) {
       
            const value = obj[col];
 
            if (value && value.toLowerCase().includes(state.searchValue)) {
                state.csvJson.push(obj);
                break;
            }
        }
    });
    const column = Object.keys(state.sortPos)[0];
    if (column) {
        const order = state.sortPos[column];
        state.csvJson.sort((a, b) => {
            let valueA = a[column];
            let valueB = b[column];
 
            if (!isNaN(valueA)) {
                valueA = parseInt(valueA);
                valueB = parseInt(valueB);
                return order==="asc" ? valueA -valueB : valueB -valueA;
            } else {
                return order=== "asc" ? valueA.localeCompare(valueB):valueB.localeCompare(valueA) ;
            }
        })
    }
    state.currentPage = 1;
    dom.numInput.value = 1;
    state.startIndex = 0;
    const rowsPerPage = Number(dom.rowInput.value);
    dom.totalPages.textContent = `/ ${Math.ceil(state.csvJson.length / rowsPerPage)}`;
    showCurrentPageData();
    savetolocal();
}