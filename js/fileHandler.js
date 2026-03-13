// This file reads file as text, converted into json and display in tabular format

import { state } from "./state.js";
import { displayTable } from "./table.js";
import { dom } from "./dom.js";

export function handleFile(event) {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file)

    reader.onload = function (e) {
        const csvText = e.target.result;
        state.fulldata = csvToJson(csvText)
        
        state.visibleColumn = Object.keys(state.fulldata[0]);

        state.csvJson = [...state.fulldata];
        const currentPageData = state.csvJson.slice(0, 10);
        displayTable(currentPageData);

    };

    reader.onloadend = function () {
        dom.controls.style.display = "block";
        dom.popup.style.display = "none";
    };

}

function csvToJson(csvText) {

    const rows = csvText.split("\n");
    const headers = rows[0].split(",")
    let data = []
    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(",");
        let obj = {}
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
        }
        data.push(obj)
    }
    return data;
}