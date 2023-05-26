// -----data input ------
const onePartnerCode = localStorage.getItem("ACCCODE");

// localStorage.removeItem("oneStaffCode");
// const BASE_URL = "http://localhost:8082"
let BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display = BASE_URL + "/staff/getcontract/" + onePartnerCode
let url_StaffInfo = BASE_URL + "/staff/getonestaff/" 
let button_status = null

// -----data input ------

//My profile
function myProfile(){
    localStorage.setItem("oneStaffCode",localStorage.getItem("ACCCODE"))
    localStorage.setItem("type_detailStaff", "EDIT")
}

// ----------------MAIN ----------------
// if(onePartnerCode === null){
//     location.href = '../../../page-login.html'
// }

document.getElementById("btnPrint").onclick = function () {
    this.style.display = "none"
    printElement(document.getElementById("printThis"));
    this.style.display = "block"
}

function printElement(elem) {
    var domClone = elem.cloneNode(true);
    
    var $printSection = document.getElementById("printSection");
    
    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }
    
    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    window.print();
}



