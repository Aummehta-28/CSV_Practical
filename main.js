//This is entry point of js. This file contains all event listeners.

import { handleNextBtn,handlePageBtn,handlePrevBtn,handleRows } from "./js/pagination.js";
import { handleClose,handlePopup } from "./js/popup.js";
import { handleColumn } from "./js/columns.js";
import { handleSort } from "./js/sorting.js";
import { handleSearch } from "./js/searching.js";
import { handleReset } from "./js/reset.js";
import { handleFile } from "./js/fileHandler.js";
import { dom } from "./js/dom.js";
import { getlocal } from "./js/storage.js";



dom.fileInput.addEventListener("change", handleFile);

dom.rowInput.addEventListener("change", handleRows);

dom.nextBtn.addEventListener("click", handleNextBtn);

dom.prevBtn.addEventListener("click", handlePrevBtn);

dom.numInput.addEventListener("change", handlePageBtn);

dom.thead.addEventListener("click", handleSort);

dom.searchBtn.addEventListener("input", handleSearch);

dom.resetBtn.addEventListener("click", handleReset);

dom.tbody.addEventListener("click", handlePopup);

dom.closeBtn.addEventListener("click", handleClose);

dom.columnBtn.addEventListener("click", handleColumn);

window.addEventListener("load",getlocal);