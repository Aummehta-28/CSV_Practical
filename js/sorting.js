// This file handles sorting of data 

import { state } from "./state.js";
import {  showCurrentPageData } from "./table.js";
import { dom } from "./dom.js";
import { savetolocal } from "./storage.js";

// Handles sorting and Display the sorted data
export function handleSort(event) {
    const columnName = event.target.innerHTML;
   
    // Stores the sorting position

    let currentSort = state.sortPos[columnName]==="asc" ? "desc" : "asc";
 
    state.sortPos={}
    state.sortPos[columnName]=currentSort;
    


    state.csvJson.sort((a, b) => {
        let valueA = a[columnName];
        let valueB = b[columnName];

        if (!isNaN(valueA)) {
            valueA = parseInt(valueA);
            valueB = parseInt(valueB);
            return currentSort=== "asc" ? valueA -valueB : valueB -valueA;
           
        } else {
            return currentSort=== "asc" ? valueA.localeCompare(valueB):valueB.localeCompare(valueA) ;
        }
    })


    state.currentPage = 1;
    dom.numInput.value = 1;
    state.startIndex = 0;
    showCurrentPageData();
    savetolocal();
}

