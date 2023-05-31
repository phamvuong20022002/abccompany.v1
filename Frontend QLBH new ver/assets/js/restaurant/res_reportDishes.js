// -----data input ------
let MACH = null;
let BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display = BASE_URL + "/restaurant/reportdishes"
let url_Parent_Chart = BASE_URL + "/restaurant/statictisGeneralDish"
let dataTable 
let typeSearch

//local strorage dataSearch

function changeTableTitle(type){
    typeSearch = type
    let date_1 = document.getElementById("input-date-1").value
    let date_2 = document.getElementById("input-date-2").value
    if(type === "CHOSENTIME"){
        document.getElementById("table-title").innerHTML = "Thống Kê Thông Tin Món Ăn Từ " + date_1.substring(8,10) + "/" + date_1.substring(5,7) + "/" + date_1.substring(0,4) +" Đến " + date_1.substring(8,10) + "/" + date_2.substring(5,7) + "/" + date_2.substring(0,4)
    }
    else if(type === "ALL"){
        document.getElementById("table-title").innerHTML = "Thống Kê Thông Tin Món Ăn Của Các Năm Cho Đến Hiện Tại"
    }
    else if(type === "MONTH"){
        document.getElementById("table-title").innerHTML = "Thống Kê Thông Tin Món Ăn Theo Tháng Từ " + date_1.substring(5,7) + "/" + date_1.substring(0,4) +" Đến " + date_2.substring(5,7) + "/" + date_2.substring(0,4)
    }
    else if(type === "YEAR"){
        document.getElementById("table-title").innerHTML = "Thống Kê Thông Tin Món Ăn Từ Năm " + date_1.substring(0,4) + " Đến " + date_2.substring(0,4)
    }
    else{
        document.getElementById("table-title").innerHTML = ""
    }
}
async function statisticsButton(type){
    changeTableTitle(type)
    let dataReq = {
        "mach": MACH,
        "type": type,
        "date1": document.getElementById("input-date-1").value,
        "date2": document.getElementById("input-date-2").value
    }
    //local storage dataSearch
    localStorage.setItem('dataSearch', JSON.stringify(dataReq));
    if(type !== "ALL"){
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
            // if(type === 'MONTH')
            // {
            //     if(date_1.getFullYear() !== date_2.getFullYear()){
            //         Swal.fire(
            //             'Dữ liệu tìm kiếm không hợp lệ?',
            //             'Thống kê theo tháng phải trong cùng một năm!',
            //             'error'
            //         )
            //         return
            //     }
            // }
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
            "auth-token":getCode1(),
            "role": "CH",
        },
    }).then((response) =>{
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((data) =>{
        DisplayTable(data)
        DisplayWidgets(data, type)
        if(document.getElementsByClassName('btn btn-outline-secondary btn-sm status active')[0] !== undefined){
            drawChart()
        }
    })
    spinner.setAttribute('hidden', ''); //loader
}


async function DisplayWidgets(dataWidgets, type){
    //date Widget
    let date_1 = document.getElementById("input-date-1").value
    let date_2 = document.getElementById("input-date-2").value
    if(type === "ALL"){
        document.getElementById("time").innerHTML = "Các Năm" + "<br /> <br />"
    }
    else if(type ==="MONTH"){
        document.getElementById("time").innerHTML =  date_1.substring(5,7) + "/" + date_1.substring(0,4) +"  " + date_2.substring(5,7) + "/" + date_2.substring(0,4)
    }
    else if(type ==="YEAR"){
        document.getElementById("time").innerHTML = (date_1.substring(0,4)) + "-" + (date_2.substring(0,4)) + "<br /> <br />"
    }
    else{
        document.getElementById("time").innerHTML = date_1.substring(8,10) + "/" + date_1.substring(5,7) + "/" + date_1.substring(0,4) +"  " + date_1.substring(8,10) + "/" + date_2.substring(5,7) + "/" + date_2.substring(0,4)
    }
    // number of bills
    document.getElementById("numof-foods").innerHTML = dataWidgets.length;
    //number of foods
    document.getElementById("numof-customers").innerHTML = dataWidgets.map(dataWidgets => dataWidgets.SLKH).reduce((sum, cus) => sum + cus, 0);
    // console.log(dataWidgets.map(dataWidgets => dataWidgets.SLKH).reduce((sum, cus) => sum + cus, 0))
    // .map(obj => obj.salary).reduce((accumulator, current) => accumulator + current, 0); 
    // revenue
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    let revenueTotal = dataWidgets.map(dataWidgets => dataWidgets.TONGGIA).reduce((total, revenueOneBill) => total + revenueOneBill, 0);
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
                field: 'TENMON',
                title: 'Tên Món',
                align: 'left',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },
            {
                field: 'SLKH',
                title: 'SL Khách Hàng',
                align: 'center',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },
            {
                field: 'SLMUA',
                title: 'SL Đặt Mua',
                align: 'center',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },
            {
                field: 'TONGGIA',
                title: 'Tổng Giá',
                align: 'left',
                valign: 'bottom',
                sortable: true,
                width: '30%'
            },

        ]
    });
}

function drawChart(){
    let canvas_tag = document.getElementsByTagName('canvas');
    // console.log(canvas_tag.length)
    if(canvas_tag.length > 0){
        document.getElementsByClassName('btn btn-outline-secondary btn-sm status')[0].classList.remove('active')
        removeChart(canvas_tag)
        document.getElementsByClassName('bootstrap-table bootstrap4')[0].style.display = ''
        document.getElementById('mytable').style.display = ''
    }
    else{
        let lineChart_Canvas = document.createElement('canvas')
        lineChart_Canvas.setAttribute('id','lines-chart')
        document.getElementsByClassName('lines-chart')[0].appendChild(lineChart_Canvas)
        document.getElementsByClassName('btn btn-outline-secondary btn-sm status')[0].classList.add('active')
        document.getElementById('mytable').style.display = 'none'
        document.getElementsByClassName('bootstrap-table bootstrap4')[0].style.display = 'none'
        document.getElementsByClassName('card-body lines-chart')[0].style.display = 'block'
        getDataInitLinesChart(url_Parent_Chart)
    }
    
}

function removeChart(canvas_tag){
    document.getElementsByClassName('card-body lines-chart')[0].style.display = 'none'
    for(let i = canvas_tag.length - 1; i >= 0; i--){
        canvas_tag[i].remove()
    }
    document.getElementsByClassName('btn btn-outline-secondary btn-sm status')[0].classList.remove('active')
}

function getRgba(index) {
    let tableColor = [ 
    {
        "name": "IndianRed",
        "value": "RGBA( 205, 92, 92, 1 )"
    },
    {
        "name": "KHAKI",
        "value": "RGBA( 240, 230, 140, 1 )"
    },
    {
        "name": "GREEN",
        "value": "RGBA( 0, 128, 0, 1 )"
    },
    {
        "name": "LightSkyBlue",
        "value": "RGBA( 135, 206, 250, 1 )"
    },
    {
        "name": "PaleVioletRed",
        "value": "RGBA( 219, 112, 147, 1 )"
    },
    {
        "name": "midnightblue",
        "value": "RGBA( 25, 25, 112, 1 )"
    },
    {
        "name": "cyan",
        "value": "RGBA( 0, 255, 255, 1 )"
    },
    {
        "name": "CHARTREUSE",
        "value": "RGBA( 127, 255, 0, 1 )"
    },
    {
        "name": "Gold",
        "value": "RGBA( 255, 215, 0, 1 )"
    },
    {
        "name": "sandybrown",
        "value": "RGBA( 244, 164, 96, 1 )"
    },
    {
        "name": "Yellow",
        "value": "RGBA( 255, 255, 0, 1 )"
    },
    {
        "name": "Aquamarine",
        "value": "RGBA( 127, 255, 212, 1 )"
    },
    {
        "name": "LIGHTSLATEGRAY",
        "value": "RGBA( 119, 136, 153, 1 )"
    },
    {
        "name": "Olive",
        "value": "RGBA( 128, 128, 0, 1 )"
    },
]
    return tableColor[index]
}

async function getDataInitLinesChart(url_Parent_Chart){
    const spinner = document.getElementsByClassName("loader")[0]; //loader
    spinner.removeAttribute('hidden'); //loader
    await fetch(url_Parent_Chart, {
        method: "POST",
        body: JSON.stringify(JSON.parse(localStorage.getItem('dataSearch'))),
        headers: {
            "Content-Type": "application/json",
            "auth-token":getCode1(),
            "role": "CH",
        },
    }).then((response) =>{
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((data) =>{
        
        //labelString_x
        let labelString_x 
        //labelString_y
        let labelString_y = "Doanh Thu"
        //times of chart (x)
        let X_axisLineChart 
        //list lable of chart  
        let objLineChart = [... new Set(data.map(d => d.TENMON))]
        //data set of chart 
        let datasetLineChart = []
        let keys = Object.keys(data[0])
        if(keys[2] === 'NAM'){
            //set labelString_x
            labelString_x = 'Năm'
            //get year into X_axisLineChart
            X_axisLineChart = [... new Set(data.map(d => parseInt(d.NAM)))].sort(function(a, b){return a-b})
            for(let i = 0; i < objLineChart.length; i++){
                // color of one line 
                let color = getRgba(i).value
                // X_axisLineChart
                let Y_axisLineChart = []
                for(let j = 0; j < X_axisLineChart.length; j++){
                    let index_ = data.findIndex(dish => dish.TENMON === objLineChart[i] && dish.NAM === X_axisLineChart[j])
                    if(data[index_] !== undefined){
                        Y_axisLineChart.push(data[index_].DOANHTHU)
                    }
                    else{
                        Y_axisLineChart.push(0)
                    }
                }
                let oneDatasetChart = {
                    label: objLineChart[i],
                    data: Y_axisLineChart,
                    backgroundColor: 'transparent',
                    borderColor: color,
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: color,
                }
                datasetLineChart.push(oneDatasetChart)
            }
        }
        else if(keys[2] === 'THANG'){
            //set labelString_x
            labelString_x = 'Tháng'
            //get year into X_axisLineChart
            X_axisLineChart = [... new Set(data.map(d => d.THANG))]
            X_axisLineChart = X_axisLineChart.sort(function (a, b) {
                a = a.toString().split('/');
                b = b.toString().split('/');
                return a[1] - b[1] || a[0] - b[0];
            });
            for(let i = 0; i < objLineChart.length; i++){
                // color of one line 
                let color = getRgba(i).value
                // X_axisLineChart
                let Y_axisLineChart = []
                for(let j = 0; j < X_axisLineChart.length; j++){
                    let index_ = data.findIndex(dish => dish.TENMON === objLineChart[i] && dish.THANG === X_axisLineChart[j])
                    if(data[index_] !== undefined){
                        Y_axisLineChart.push(data[index_].DOANHTHU)
                    }
                    else{
                        Y_axisLineChart.push(0)
                    }
                }
                let oneDatasetChart = {
                    label: objLineChart[i],
                    data: Y_axisLineChart,
                    backgroundColor: 'transparent',
                    borderColor: color,
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: color,
                }
                datasetLineChart.push(oneDatasetChart)
            }
        }
        else{
            
            //set labelString_x
            labelString_x = 'Ngày'
            //get year into X_axisLineChart
            X_axisLineChart = [... new Set(data.map(d => parseInt(d.NGAY)))].sort(function(a, b){return a-b})
            
            for(let i = 0; i < objLineChart.length; i++){
                // color of one line 
                let color = getRgba(i).value
                // X_axisLineChart
                let Y_axisLineChart = []
                for(let j = 0; j < X_axisLineChart.length; j++){
                    let index_ = data.findIndex(dish => dish.TENMON === objLineChart[i] && dish.NGAY === X_axisLineChart[j])
                    if(data[index_] !== undefined){
                        Y_axisLineChart.push(data[index_].DOANHTHU)
                    }
                    else{
                        Y_axisLineChart.push(0)
                    }
                }
                let oneDatasetChart = {
                    label: objLineChart[i],
                    data: Y_axisLineChart,
                    backgroundColor: 'transparent',
                    borderColor: color,
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: color,
                }
                datasetLineChart.push(oneDatasetChart)
            }
        }
        let dataInit = {
            labels: X_axisLineChart ,//[ "2012", "2013", "2014", "2015", "2016", "2017", "2018" ],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: datasetLineChart
        }
        linesChartInit(dataInit, labelString_x, labelString_y)
        spinner.setAttribute('hidden', ''); //loader
    })

}

function linesChartInit(dataInit, labelString_x, labelString_y) {
    //Sales chart
    var ctx = document.getElementById( "lines-chart" );
    ctx.height = 150;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: dataInit,
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: true,
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },
            },
            scales: {
                xAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: labelString_x
                    }
                        } ],
                yAxes: [ {
                    display: true,
                    gridLines: {
                        display: true,
                        drawBorder: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: labelString_y
                    }
                        } ]
            },
            title: {
                display: false,
                text: 'Normal Legend'
            }
        }
    } );
}
// --------------MAIN----------------
if(checkAuthentication()){
    MACH = localStorage.getItem("ACCCODE") // MACH
    document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",localStorage.getItem("AVATAR"))
    statisticsButton('ALL')
}
else {
    location.href = '../page-login.html'
}


