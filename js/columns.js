// This file handles to display only checked column data.


import { state } from "./state.js";
import { displayTable } from "./table.js";
import { dom } from "./dom.js";



// Display the checked column names
export function handleColumn() {
    if (dom.columnList.style.display === "none") {

        dom.columnList.style.display= "block";
        dom.columnList.innerHTML = ""
    } else {
        dom.columnList.style.display = "none";
    }

    let headers = Object.keys(state.csvJson[0]);


    for (let i = 0; i < headers.length; i++) {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${headers[i]}" checked> ${headers[i]} `;
        dom.columnList.appendChild(label)
    }
    
    // Sees if checked then push to visible Column and Display only visible column data
    dom.columnList.addEventListener("click", (e) => {
        if (e.target.type === "checkbox") {
            state.visibleColumn = []
            let a = document.querySelectorAll('input[type="checkbox"]');
            a.forEach((input) => {
                if (input.checked) {
                    state.visibleColumn.push(input.value);
                }
            })


        }

        let rowsPerPage = Number(dom.rowInput.value);
        let endIndex = state.startIndex + rowsPerPage;
        let currentPageData = state.csvJson.slice(state.startIndex, endIndex);
        displayTable(currentPageData);
    })

}
