// -----data input ------
const MACH = localStorage.getItem("ACCCODE");
let BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display = BASE_URL + "/restaurant/managebills"
let dataTable 
let typeSearch

function changeTableTitle(type){
    typeSearch = type
    if(type === "CHOSENTIME"){
        let date_1 = document.getElementById("input-date-1").value
        let date_2 = document.getElementById("input-date-2").value
        document.getElementById("table-title").innerHTML = "Danh Sách Đơn Hàng Từ " + date_1 + " đến " + date_2 
    }
    else if(type === "ALL"){
        document.getElementById("table-title").innerHTML = "Danh Sách Đơn Hàng Của Các Năm Cho Đến Hiện Tại"
    }
    else if(type === "TODAY"){
        document.getElementById("table-title").innerHTML = "Danh Sách Đơn Hàng Của Hôm Nay"
    }
    else if(type === "MONTH"){
        document.getElementById("table-title").innerHTML = "Danh Sách Đơn Hàng Của Tháng Này"
    }
    else if(type === "YEAR"){
        document.getElementById("table-title").innerHTML = "Danh Sách Đơn Hàng Của Năm Này"
    }
    else{
        document.getElementById("table-title").innerHTML = "Danh Sách Đơn Hàng..."
    }
}
async function statisticsButton(type){
    changeTableTitle(type)
    let dataReq = {
        "mach": MACH,
        "type": type,
        "date_1": document.getElementById("input-date-1").value,
        "date_2": document.getElementById("input-date-2").value
    }
    if(type === "CHOSENTIME"){
        let date_1 = new Date(document.getElementById("input-date-1").value)
        let date_2 = new Date(document.getElementById("input-date-2").value)
        if( isNaN(date_1) === true || isNaN(date_2) === true || date_1 > date_2 ){
            Swal.fire(
                'Dữ liệu tìm kiếm không hợp lệ?',
                'Ngày đã chọn không phù hợp hoặc bị để trống',
                'error'
            )
            return
        }else {
            let date_1_string = date_1.getDate().toString() + '-' +  date_1.getMonth().toString() + '-' + date_1.getFullYear().toString()
            let date_2_string = date_2.getDate().toString() + '-' +  date_2.getMonth().toString() + '-' + date_2.getFullYear().toString()
        }
    }
    const spinner = document.getElementById("spinner"); //loader
    spinner.removeAttribute('hidden'); //loader
    await fetch(url_Display, {
        method: "POST",
        body: JSON.stringify(dataReq),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) =>{
        return response.json()
    }).then((data) =>{
        dataTable = data;
        arrangeTable("all")
    })
    spinner.setAttribute('hidden', ''); //loader
}
function ArrangeData(data, status){
    switch(status){
        case "status_1":
            return data.filter(function (el) {
                return el.TINHTRANG === 1 
            });
        case "status_2":
            return data.filter(function (el) {
                return el.TINHTRANG === 2 
            });
        case "status_3":
            return data.filter(function (el) {
                return el.TINHTRANG === 3 
            });
        case "status_4":
            return data.filter(function (el) {
                return el.TINHTRANG === 4 
            });
        case "status_5":
            return data.filter(function (el) {
                return el.TINHTRANG === 5 
            });
        case "all":
            return data
    }
}
function arrangeTable(typeArrange){
    let arrangedData = ArrangeData(dataTable, typeArrange)
    let statusButtons = document.getElementsByClassName("btn btn-sm status")
    for(let i = statusButtons.length - 1; i >= 0; i--){
        statusButtons[i].classList.remove("active")
    }
    if(typeArrange === "status_1") {
        document.getElementById("btn-status-1").className += " active"
    }
    else if(typeArrange === "status_2"){
        document.getElementById("btn-status-2").className += " active"
    }
    else if(typeArrange === "status_3"){
        document.getElementById("btn-status-3").className += " active"
    }
    else if(typeArrange === "status_4"){
        document.getElementById("btn-status-4").className += " active"
    }
    else if(typeArrange === "status_5"){
        document.getElementById("btn-status-5").className += " active"
    }
    else {
        document.getElementById("btn-status-all").className += " active"
    }
    //display table
    DisplayTable(arrangedData)
    DisplayWidgets(arrangedData, typeSearch)
}

async function DisplayWidgets(dataWidgets, type){
    //date Widget
    let date = new Date()
    if(type === "ALL"){
        document.getElementById("time").innerHTML = "Các Năm" + "<br /> <br />"
    }
    else if(type ==="TODAY"){
        document.getElementById("time").innerHTML = date.toLocaleString().split(',')[0] + "<br /> <br />"
    }
    else if(type ==="MONTH"){
        document.getElementById("time").innerHTML = (date.getMonth()+ 1) + "/" + date.getFullYear() + "<br /> <br />"
    }
    else if(type ==="YEAR"){
        document.getElementById("time").innerHTML = date.getFullYear() + "<br /> <br />"
    }
    else{
    document.getElementById("time").innerHTML = document.getElementById("input-date-1").value + " " + document.getElementById("input-date-2").value
    }
    // number of bills
    document.getElementById("numof-bills").innerHTML = dataWidgets.length;
    //number of foods
    document.getElementById("numof-foods").innerHTML = dataWidgets.map(dataWidgets => dataWidgets.SLMON).reduce((sum, food) => sum + food, 0);
    // .map(obj => obj.salary).reduce((accumulator, current) => accumulator + current, 0); 
    // revenue
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    let revenueTotal = dataWidgets.map(dataWidgets => dataWidgets.DONGIA).reduce((total, revenueOneBill) => total + revenueOneBill, 0);
    document.getElementById('revenue').innerHTML = formatter.format(revenueTotal)
}

function DisplayTable(dataInit){
    $('#mytable').bootstrapTable('destroy');
    $('#mytable').bootstrapTable({
        data: dataInit,
        pagination: true,
        pageSize: 5,
        pageList: [5, 10, 20, 50, 100],
        search: true,
        cache: false,
        showExport: true,
        exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
        columns: [
            {
                field: 'MADH',
                title: 'Mã Đơn',
                align: 'left',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },
            {
                field: 'SLMON',
                title: 'SL Món',
                align: 'center',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },
            {
                field: 'NGAYLAP',
                title: 'Ngày đặt',
                align: 'center',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },
            {
                field: 'LIENHE',
                title: 'Liên Hệ',
                align: 'left',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },
            {
                field: 'DIACHI',
                title: 'Địa Chỉ',
                align: 'left',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },
            {
                field: 'DONGIA',
                title: 'Đơn Giá',
                align: 'left',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },
            {
                field: 'TINHTRANG',
                title: 'Tình Trạng',
                align: 'left',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            }
        ]
    });
}

// --------------MAIN----------------
window.setInterval(function(){
    if(checklogin(MACH) === false){
        location.href = '../page-login.html'
    } 
}, 1000);
if(MACH === null){
    location.href = '../page-login.html'
}else
{   
    statisticsButton('ALL')
}

