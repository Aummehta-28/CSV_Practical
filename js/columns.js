// This file handles to display only checked column data.


import { state } from "./state.js";
import { showCurrentPageData } from "./table.js";
import { dom } from "./dom.js";
import { handleSearch } from "./searching.js";


// Display the checked column names
export function handleColumn() {
    if (dom.columnList.style.display === "none") {

        dom.columnList.style.display = "block";
        dom.columnList.innerHTML = ""
    } else {
        dom.columnList.style.display = "none";
    }

    const headers = Object.keys(state.csvJson[0]);


    for (let i = 0; i < headers.length; i++) {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${headers[i]}" checked> ${headers[i]} `;
        dom.columnList.appendChild(label)
    }

    // Sees if checked then push to visible Column and Display only visible column data
    dom.columnList.addEventListener("click", (e) => {
        if (e.target.type === "checkbox") {
            state.visibleColumn = []
            let allInputs = document.querySelectorAll('input[type="checkbox"]');
            allInputs.forEach((input) => {
                if (input.checked) {
                    state.visibleColumn.push(input.value);
                }
            })


        }

        state.searchValue = dom.searchBtn.value.toLowerCase();

        state.searchValue ? handleSearch() : showCurrentPageData();

      
    })

}
