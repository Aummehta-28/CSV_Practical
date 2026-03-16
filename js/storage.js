// This files save to local storage and get data from local storage

import { state } from "./state.js";
import { dom } from "./dom.js";
import { displayTable } from "./table.js";

export function savetolocal() {
    const savedata = {
        fulldata:state.fulldata, csvJson :state.csvJson, currentPage : state.currentPage, searchtext: state.searchValue, sortPos:state.sortPos, rowsPerPage: Number(dom.rowInput.value), startIndex:state.startIndex
    }
    localStorage.setItem("csvState", JSON.stringify(savedata));

}

export function getlocal() {
    const data = localStorage.getItem("csvState");
    
    if (data) {
        const saveddata  = JSON.parse(data);
        state.fulldata = saveddata .fulldata;
        state.csvJson = saveddata .csvJson;
        state.currentPage = saveddata .currentPage;
        dom.rowInput.value = saveddata .rowsPerPage;
        state.sortPos = saveddata .sortPos;
        dom.searchBtn.value = saveddata .searchtext;
        state.startIndex = saveddata .startIndex;
        dom.numInput.value = saveddata.currentPage;
        const endIndex = state.startIndex + Number(dom.rowInput.value);
        const currentPageData = state.csvJson.slice(state.startIndex, endIndex);
        dom.totalPages.textContent = `/ ${Math.ceil(state.csvJson.length / Number(dom.rowInput.value))}`;
        state.visibleColumn = Object.keys(state.csvJson[0]);
        displayTable(currentPageData);

        dom.controls.style.display = "block";
        dom.popup.style.display = "none";
    }
}