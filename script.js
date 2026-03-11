const fileInput = document.querySelector("#csvFile");
const thead = document.querySelector("#thead");
const tbody = document.querySelector("#tbody");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");

const input = document.querySelector("#numInput")
const pageBtn = document.querySelector("#submit");

const rowBtn = document.querySelector("#rows");
const rowInput = document.querySelector("#rowInput")

const searchBtn = document.querySelector("#searchText")
const resetBtn = document.querySelector("#reset")
let startIndex = 0;
let currentPage = 1;
let sortDirection = "asc"
let csvJson;

fileInput.addEventListener("change", handleFile);

rowInput.addEventListener("change", handleRows);

nextBtn.addEventListener("click", handleNextBtn);

prevBtn.addEventListener("click", handlePrevBtn);

pageBtn.addEventListener("click", handlePageBtn);

thead.addEventListener("click", handleSort);

searchBtn.addEventListener("change", handleSearch);

resetBtn.addEventListener("click", handleReset);

tbody.addEventListener("click", handlePopup);


function handleRows() {
    let rowsPerPage = setrows();

    let endIndex = startIndex + rowsPerPage;

    currentPage = Math.ceil(startIndex / rowsPerPage) + 1;
    input.value = currentPage;

    let currentPageData = csvJson.slice(startIndex, endIndex);
    displayTable(currentPageData);
}

function handleNextBtn() {

    currentPage++;
    input.value = currentPage;
    let rowsPerPage = setrows();
    startIndex = startIndex + rowsPerPage;
    endIndex = startIndex + rowsPerPage;

    let currentPageData = csvJson.slice(startIndex, endIndex);
    displayTable(currentPageData);

}

function handlePrevBtn() {
    currentPage--;
    if (currentPage < 1) {
        return;
    }
    input.value = currentPage;

    let rowsPerPage = setrows();

    startIndex = startIndex - rowsPerPage;
    if (startIndex < 0) {
        startIndex = 0;
    }
    endIndex = startIndex + rowsPerPage;

    let currentPageData = csvJson.slice(startIndex, endIndex);
    displayTable(currentPageData);
}

function handlePageBtn() {
    let rowsPerPage = setrows();
    startIndex = (Number(numInput.value) - 1) * rowsPerPage;
    endIndex = startIndex + rowsPerPage;
    let currentPageData = csvJson.slice(startIndex, endIndex);
    displayTable(currentPageData);
}

function handleSort(event) {
    let columnName = event.target.innerHTML;

    csvJson.sort((a, b) => {
        let valueA = a[columnName];
        let valueB = b[columnName];

        if (!isNaN(valueA)) {
            valueA = parseInt(valueA);
            valueb = parseInt(valueB);
            if (sortDirection === "asc") {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        } else {
            if (sortDirection === "asc") {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        }
    })
    if (sortDirection === "asc") {
        sortDirection = "des";
    } else {
        sortDirection = "asc";
    }

    currentPage = 1;
    input.value = 1;
    startIndex = 0;
    let rowsPerPage = setrows();
    let endIndex = startIndex + rowsPerPage;
    let currentPageData = csvJson.slice(startIndex, endIndex);
    displayTable(currentPageData);
}

function setrows() {

    if (Number(rowInput.value)) {
        return Number(rowInput.value);
    } else {
        return 10;
    }
}

function handleSearch() {
    searchValue = searchBtn.value;


    csvJson = []
    for (let obj of fulldata) {
        for (let value of Object.values(obj)) {
            if (value.toLowerCase().includes(searchValue)) {
                csvJson.push(obj);
                break;
            }
        }
    }
    currentPage = 1;
    input.value = 1;
    startIndex = 0;
    let rowsPerPage = setrows();
    let endIndex = startIndex + rowsPerPage;
    let currentPageData = csvJson.slice(startIndex, endIndex);

    displayTable(currentPageData)
}

function handleReset() {
    searchBtn.value="";

    let currentPageData = original.slice(0,10);
    csvJson=original;
    displayTable(currentPageData);
}

function handlePopup(event){
    let row= event.target.closest("tr");
    console.log(row)
}

function handleFile(event) {

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsText(file)

    reader.onload = function (e) {
        const csvText = e.target.result;
        fulldata = csvToJson(csvText)
        original=[...fulldata]
        csvJson = fulldata;
        const currentPageData = csvJson.slice(0, 10);
        displayTable(currentPageData);

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


function displayTable(csvJson) {
    tbody.innerHTML = "";
    thead.innerHTML = "";
    const headers = csvJson[0];
    const headerKeys = Object.keys(headers);

    const tr = document.createElement("tr");
    headerKeys.forEach((keys) => {
        const th = document.createElement("th");
        th.innerHTML = keys;
        tr.appendChild(th);
    })

    thead.appendChild(tr);

    csvJson.forEach((obj) => {
        const tr = document.createElement("tr");
        Object.values(obj).forEach((value) => {
            const td = document.createElement("td");
            td.innerHTML = value;
            tr.appendChild(td);
        })
        tbody.appendChild(tr)
    })

}