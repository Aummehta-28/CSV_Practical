const fileInput = document.querySelector("#csvFile");
const thead = document.querySelector("#thead");
const tbody = document.querySelector("#tbody");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");

const input = document.querySelector("#numInput")
const pageBtn = document.querySelector("#submit");

const rowBtn = document.querySelector("#rows");
const rowInput = document.querySelector("#rowInput")

let startIndex=0;
let currentPage =1;

fileInput.addEventListener("change", handleFile);

rowBtn.addEventListener("click",()=>{
    let rowsPerPage ;
    if(Number(rowInput.value)){
        rowsPerPage=Number(rowInput.value);
    }else{
        rowsPerPage=10;
    }

    let endIndex = startIndex + rowsPerPage;
    
    currentPage = Math.ceil(startIndex / rowsPerPage) +1;
    input.value = currentPage;

    let currentPageData = csvJson.slice(startIndex,endIndex);
    displayTable(currentPageData);
})

nextBtn.addEventListener("click", ()=>{

    currentPage++;
    input.value =currentPage;
    let rowsPerPage ;
    if(Number(rowInput.value)){
        rowsPerPage=Number(rowInput.value);
    }else{
        rowsPerPage=10;
    }
    startIndex =startIndex + rowsPerPage; 
    endIndex = startIndex + rowsPerPage;

    let currentPageData = csvJson.slice(startIndex,endIndex);
    displayTable(currentPageData);

})

prevBtn.addEventListener("click",()=>{
    currentPage--;
    if(currentPage<1){
        return;
    }
    input.value =currentPage;
   
    let rowsPerPage ;
    if(Number(rowInput.value)){
        rowsPerPage=Number(rowInput.value);
    }else{
        rowsPerPage=10;
    } 
    
    startIndex = startIndex - rowsPerPage;
    if(startIndex <0){
        startIndex =0;
    }
    endIndex = startIndex + rowsPerPage;

    let currentPageData = csvJson.slice(startIndex,endIndex);
    displayTable(currentPageData);
})

pageBtn.addEventListener("click" , ()=>{
    let rowsPerPage ;
    if(Number(rowInput.value)){
        rowsPerPage=Number(rowInput.value);
    }else{
        rowsPerPage=10;
    } 
    startIndex = (Number(numInput.value) -1 )* rowsPerPage;
    endIndex = startIndex + rowsPerPage;
    let currentPageData = csvJson.slice(startIndex,endIndex);
    displayTable(currentPageData);
})

function handleFile(event) {

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsText(file)

    reader.onload = function (e) {
        const csvText = e.target.result;
        csvJson = csvToJson(csvText)
        const currentPageData = csvJson.slice(0,10);
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