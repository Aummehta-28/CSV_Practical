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

const controls = document.querySelector("#controls");
const popup = document.querySelector("#popup")
const popChild = document.querySelector("#popchild")
const closeBtn = document.querySelector("#close")

const columnBtn = document.querySelector("#columns");
const columnList = document.querySelector("#columnlist")

let startIndex = 0;
let currentPage = 1;

let csvJson;
let visibleColumn;
let allColumns;
let sortPos = {}

fileInput.addEventListener("change", handleFile);

rowInput.addEventListener("change", handleRows);

nextBtn.addEventListener("click", handleNextBtn);

prevBtn.addEventListener("click", handlePrevBtn);

pageBtn.addEventListener("click", handlePageBtn);

thead.addEventListener("click", handleSort);

searchBtn.addEventListener("change", handleSearch);

resetBtn.addEventListener("click", handleReset);

tbody.addEventListener("click", handlePopup);

closeBtn.addEventListener("click", handleClose);

columnBtn.addEventListener("click", handleColumn);


function handleRows() {
    let rowsPerPage = setrows();

    let endIndex = startIndex + rowsPerPage;

    currentPage = Math.ceil(startIndex / rowsPerPage) + 1;
    input.value = currentPage;

    let currentPageData = csvJson.slice(startIndex, endIndex);
    displayTable(currentPageData);
}

function handleNextBtn() {
    let rowsPerPage = setrows();
    
    if (currentPage > csvJson.length / rowsPerPage) {
        return;
    }
    currentPage++;
    input.value = currentPage;

    startIndex = startIndex + rowsPerPage;
    endIndex = startIndex + rowsPerPage;
    
    let currentPageData = csvJson.slice(startIndex, endIndex);

    displayTable(currentPageData);

}

function handlePrevBtn() {
    if (currentPage <= 1) {
        return;
    }
    currentPage--;

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
    if (numInput.value > csvJson.length / rowsPerPage) {
        numInput.value = csvJson.length / rowsPerPage
    }
    if (numInput.value < 1) {
        currentPage = 1;
        input.value = 1;
        return;
    }

    currentPage = Number(numInput.value);

    startIndex = (Number(numInput.value) - 1) * rowsPerPage;
    endIndex = startIndex + rowsPerPage;
    let currentPageData = csvJson.slice(startIndex, endIndex);
    displayTable(currentPageData);
}

function handleSort(event) {
    let columnName = event.target.innerHTML;
    if (sortPos[columnName] === "asc") {
        sortPos[columnName] = "desc";
    } else {
        sortPos[columnName] = "asc";
    }
    csvJson.sort((a, b) => {
        let valueA = a[columnName];
        let valueB = b[columnName];

        if (!isNaN(valueA)) {
            valueA = parseInt(valueA);
            valueB = parseInt(valueB);
            if (sortPos[columnName] === "asc") {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        } else {
            if (sortPos[columnName] === "asc") {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        }
    })


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
    searchValue = searchBtn.value.toLowerCase();

    
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
    searchBtn.value = "";
    input.value=1;
    currentPage=1;
    rowInput.value=10
    let currentPageData = fulldata.slice(0, 10);
    csvJson = [...fulldata];
    displayTable(currentPageData);
}

function handleColumn() {
    if(columnList.style.display==="none"){
        
        columnList.style.display= "block";
        columnList.innerHTML=""
    }else{
        columnList.style.display= "none";
    }

    let headers = Object.keys(csvJson[0]);


    for (let i = 0; i < headers.length; i++) {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${headers[i]}" checked> ${headers[i]} `;
        columnList.appendChild(label)
    }

    columnList.addEventListener("click", (e) => {
        if (e.target.type === "checkbox") {
            visibleColumn=[]
            let a=document.querySelectorAll('input[type="checkbox"]');
            a.forEach((input)=>{
                if(input.checked){
                    visibleColumn.push(input.value);
                }
            })
            

        }
   
        let rowsPerPage = setrows();
        let endIndex = startIndex + rowsPerPage;
        let currentPageData = csvJson.slice(startIndex, endIndex);
        displayTable(currentPageData);
    })

}

function handlePopup(event) {
    popChild.innerHTML = ""
    let tableRow = event.target.closest("tr");
    let headers = Object.keys(csvJson[0]);

    const obj = {};


    for (let i = 0; i < tableRow.cells.length; i++) {
        let cell = tableRow.cells[i];
        obj[headers[i]] = cell.textContent;

    }

    for (const [key, value] of Object.entries(obj)) {
        const div = document.createElement("div");
        div.innerHTML = `${key} :${value}`
        popChild.appendChild(div);
    }
    popup.style.display = "block";
    document.querySelector("#tableDisplay").classList.add("blur")
}
function handleClose() {

    popup.style.display = "none";
    document.querySelector("#tableDisplay").classList.remove("blur")
}

function handleFile(event) {

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsText(file)

    reader.onload = function (e) {
        const csvText = e.target.result;
        fulldata = csvToJson(csvText)
        visibleColumn = Object.keys(fulldata[0]);
        original = [...fulldata]
        csvJson = [...fulldata];
        const currentPageData = csvJson.slice(0, 10);
        displayTable(currentPageData);

    };

    reader.onloadend = function () {
        controls.style.display = "block";
        popup.style.display = "none";
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
    // const headers = csvJson[0];
    // const headerKeys = Object.keys(headers);

    const tr = document.createElement("tr");
    visibleColumn.forEach((value) => {
        const th = document.createElement("th");
        th.innerHTML = value;
        tr.appendChild(th);
    })

    thead.appendChild(tr);

    csvJson.forEach((obj) => {
        const tr = document.createElement("tr");
        visibleColumn.forEach((col) => {
            const td = document.createElement("td");
            td.innerHTML = obj[col];
            tr.appendChild(td);
        })
        tbody.appendChild(tr)
    })
}

