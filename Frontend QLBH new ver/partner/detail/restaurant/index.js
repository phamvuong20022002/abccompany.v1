// -----data input ------
let oneRestaurant = null;
const type_detail = localStorage.getItem("type_detail");
// localStorage.removeItem("oneStaffCode");
const BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display = BASE_URL + "/partner/detailrestaurant/"
let url_Update = BASE_URL + "/partner/updaterestaurant"
let url_ViewPass = BASE_URL + "/partner/viewrespass/"
let url_ChangePass = BASE_URL + "/partner/updaterespass"
let url_VerifyPass = BASE_URL + "/partner/verifypass/update"
let url_ChangeAvatarRes = BASE_URL + "/partner/changeavatar/res"
let url_LineChartRevenue = BASE_URL + "/partner/viewrevenueres/"
let update_button_status = "off"
update_button_status = localStorage.getItem("update_button_status")
// -----data input ------

// css for avatar
function css_Avatar(myWidget){
    // show update icon on avatar
    let avatar = document.querySelector(".avatar")
    //if hover on avatar
    avatar.addEventListener("mouseenter", function (e) {
        document.getElementById("uploadBnt").removeAttribute("hidden")
    })
    //if hover out avatar
    avatar.addEventListener("mouseleave", function (e) {
        document.getElementById("uploadBnt").setAttribute("hidden", "")
    })
    //if click on change icon
    document.querySelector("#uploadBnt").addEventListener(
        "click",
        function () {
            myWidget.open();
        },
        false
    );
}

//update button
function update_button() {
    localStorage.setItem("update_button_status", "on")
    location.reload()
}


function getData(form) {
    var formData = new FormData(form);
    return Object.fromEntries(formData)
}
 
//fetch update data
async function updateData(dataRep){
    await fetch(url_Update, {
        method: "PUT",
        body: JSON.stringify(dataRep),
        headers: {
            "Content-Type": "application/json",
            "auth-token": getCode1(),
            "role": "DT"
        },
    }).then((response) => {
        authenticatePrivateAPIChecking(response)
        return response.json();
    }).then((data) => {
        const keys = Object.keys(data[0])
        if (keys[0] === "ERROR") {
            //alert error
            Swal.fire({
                title: "ERROR!",
                text: data[0][keys[0]],
                icon: "error",
                button: "Click me!"
            }).then(function () {
                location.reload();
            }
            );
        }
        else {
            //alert success
            Swal.fire({
                title: "SUCCESS!",
                text: data[0][keys[0]],
                icon: "success",
                button: "Click me!"
            }).then(function () {
                location.reload();
            }
            );
        }
    });
}

//click update button
function submit_button(){
    const sending = document.getElementById("payment-button-sending")
    sending.style.display = "inline-block"
    const update = document.getElementById("payment-button-amount")
    update.style.display = "none"

    document.getElementById("dataForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let dataUpdate = getData(e.target);
        let MADT = localStorage.getItem("ACCCODE");
        dataUpdate["madt"] = MADT;
        dataUpdate["mota"] = document.getElementsByTagName("textarea")[0].value;
        delete dataUpdate["danhgia"]
        delete dataUpdate["diachi"]
        delete dataUpdate["tenquan"]
        // console.log(dataUpdate);
        updateData(dataUpdate)
    })
}

async function form_Display(){
    // console.log(update_button_status, type_detailStaff)
    // display alert
    if((update_button_status === "on") && (type_detail === "VIEW")){ 
        localStorage.setItem("update_button_status", "off")
        const div = document.getElementById("alert-no-display")
        div.style = "display: block"
        div.innerHTML = "Bạn Đang Ở Chế Độ VIEW. Không Được Chỉnh Sửa Thông Tin Của Tài Khoản Khác!"
    }

    if(update_button_status === "on" && type_detail !== "VIEW") {
        const display_div = document.getElementById("no-display")
        display_div.style = "display: inline"
    }

    //get data from database
    document.getElementById("login-res").setAttribute("hidden","")
    const spinner = document.getElementById("spinner"); //loader
    spinner.removeAttribute('hidden'); //loader
    await fetch(url_Display + oneRestaurant).then((response) =>{
        return response.json()
    }).then((data) =>{
        const keys = Object.keys(data[0])
        if(keys[0] !== "ERROR"){
            //display
            let input = document.getElementsByClassName("form-control input")
            for(let i = 0; i < input.length; i++){
                if(i === 0 || i === 1 || i === 4 || i === 7){
                    input[i] = input[i].setAttribute("readonly", "")
                }
                input[i].setAttribute("value", data[0][keys[i]])
                if(input[i].name === "mk"){
                    input[i].value = "*************"
                    document.getElementById("view-pass").onclick = function(){verifyPass(data[0].MACUAHANG, data[0].MASOTHUE)}
                }
                if(i === input.length - 1){
                    let textarea = document.getElementsByTagName("textarea")
                    textarea[0].value = data[0][keys[i]]
                }
            }
            //avatar
            let dataUpdate = {
                "madt": data[0].MASOTHUE,
                "mach": data[0].MACUAHANG,
            }
            document.getElementById("photo").setAttribute("src",data[0].AVATAR)
            css_Avatar(changeAvatar(dataUpdate, url_ChangeAvatarRes, false, "DT"));

            spinner.setAttribute("hidden", ""); //loader
            
            document.getElementById("login-res").removeAttribute("hidden")
            document.getElementById("login-res").onclick = function(){loginToRes(data[0].MACUAHANG, data[0].MASOTHUE)}
        }
        else{
            Swal.fire(
                'Tải Thông Tin Cửa Hàng Thất Bại',
                data[0].ERROR,
                'error',
            )
        }
    })
}
async function verifyPass(MACH,MADT) {
    await Swal.fire({
        title: 'Nhập Mật Khẩu Để Xác Nhận',
        html:
            '<label style="float: left">Mật Khẩu </label>' +
            '<input id="pass" class="swal2-input" type = "password" >',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Xác Nhận',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let dataUpdate = {
                "madt": MADT,
                "mk": document.getElementById('pass').value,
            }

            return fetch(url_VerifyPass, {
                method: "POST",
                body: JSON.stringify(dataUpdate),
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCode1(),
                    "role": "DT"
                },
            })
                .then(response => {
                    authenticatePrivateAPIChecking(response);
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                }).then((data) => {
                    if (data[0].RESULT === '1') {
                        return data[0].TEXT_CONNECT
                    }
                    else {
                        return 0
                    }
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.dismiss === 'cancel' || result.dismiss === 'backdrop') {
            return
        }
        if (!result.value) {
            Swal.fire(
                'Xác Nhận Không Thành Công!',
                'Mật Khẩu Không Chính Xác',
                'error',
            )
        }
        else {
            viewPass(MACH,MADT, result.value)
        }
    })
}
async function viewPass(MACH,MADT, text_connect){
    await fetch(url_ViewPass + "id=" + MADT + "&mach=" + MACH,{
        headers: {
            "auth-token": getCode1()
        }
    }).then((response) => {
        authenticatePrivateAPIChecking(response)
        return response.json();
    }).then((data) => {
        if(Object.keys(data[0])[0] === "ERROR") {
            Swal.fire(
                "Không Thể Load Mật Khẩu",
                data[0].ERROR,
                'error',
            ).then(()=>{
                location.reload();
            })
        }
        else {
            let pass = data[0].MK
            Swal.fire({
                title: 'Hiển Thị Mật Khẩu',
                icon: 'info',
                html:
                '<label> <strong>Mật khẩu: </strong> </label> ' +
                '<input value = '+ pass + ' readonly="" style=";"</input>' ,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                '<i class="fa fa-unlock-alt"> Đổi Mật Khẩu</i> ',
                cancelButtonText:
                '<i class="fa fa-mail-reply"> Quay lại</i>',
            }).then((result) => {
                if(result.value){
                    Swal.fire({
                        title: 'Submit your Github username',
                        html:
                        '<div style="position: relative; float:left;"><label> <strong>Mật khẩu Mới: </strong> </label> ' +
                        '<input id="new-pass" name="newpass" style="position: relative; left: 50px"></div>'+
                        '<div style="position: relative; float:left;"><label> <strong>Nhập lại Mật khẩu: </strong> </label> ' +
                        '<input id="re-type-pass" name="retypepass" style="position: relative;left: 10px"></div>',
                        
                        showCloseButton: true,
                        showCancelButton: true,
                        confirmButtonText:'Cập Nhật',
                        cancelButtonText: 'Huỷ Bỏ',
                    })
                    .then(async (result) => {
                        if(result.value){
                            let newPass = document.getElementById("new-pass").value
                            let reTypePass = document.getElementById("re-type-pass").value
                            if(newPass.length === 0){
                                Swal.fire({
                                    title: 'Đổi Mật Khẩu Không Thành Công!',
                                    icon: 'error',
                                    text: 'Vui lòng nhập mật khẩu mới vào ô Mật Khẩu Mới'
                                })
                            }
                            else if(reTypePass !== newPass){
                                Swal.fire({
                                    title: 'Đổi Mật Khẩu Không Thành Công!',
                                    icon: 'error',
                                    text: 'Mật khẩu nhập lại không khớp'
                                })
                            }
                            else {
                                let data_Req = {
                                    "madt" : MADT,
                                    "mach": MACH,
                                    "newpass" : reTypePass
                                }
                                await fetch(url_ChangePass,{
                                    method: "PUT",
                                    body: JSON.stringify(data_Req),
                                    headers: {
                                        "Content-Type": "application/json",
                                        "auth-token": getCode1(),
                                        "key": text_connect,
                                        "role": "DT"
                                    },
                                }).then((response) => {
                                    authenticatePrivateAPIChecking(response);
                                    return response.json();
                                }).then((data) =>{
                                    if(Object.keys(data[0])[0] === "ERROR"){
                                        Swal.fire({
                                        title: 'Đổi Mật Khẩu Không Thành Công!',
                                        icon: 'error',
                                        text: data[0].ERROR,
                                    })}
                                    else {
                                        Swal.fire({
                                        title: 'Đổi Mật Khẩu Thành Công!',
                                        icon: 'success',
                                        text: data[0].RESUST,
                                        })
                                    }
                                    
                                })
                            }
                        }
                    })
                }
            })
        }
    })
    
}

async function loginToRes(MACH, MADT){
    console.log(MACH, MADT)
}
// ----------------Base Infomation-----------------------------
function Init_RaderChart() {
    //radar chart
    var ctx = document.getElementById("radarChart");
    ctx.height = 160;
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    data: [65, 70, 66, 45, 5, 55, 40],
                    borderColor: "rgba(255, 174, 66, 1)",
                    borderWidth: "3",
                    backgroundColor: "rgba(255, 174, 66, 0.5)"
                },
                {
                    label: "My Second dataset",
                    data: [28, 5, 55, 19, 63, 27, 68],
                    borderColor: "rgba(13, 152, 168, 1)",
                    borderWidth: "3",
                    backgroundColor: "rgba(13, 152, 168, 0.5)"
                },
                {
                    label: "My Third dataset",
                    data: [15, 50, 100, 50, 25, 27, 45],
                    borderColor: "rgba(255, 87, 51, 1)",
                    borderWidth: "3",
                    backgroundColor: "rgba(255, 87, 51, 0.5)"
                }
            ]
        },
        options: {
            legend: {
                position: 'left'
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                }
            }
        }
    });
}
function Init_DoughutChart() {
    //doughut chart
    var ctx = document.getElementById("doughutChart");
    ctx.height = 150;
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [35, 40, 20, 5],
                backgroundColor: [
                    "RGBA(54, 162, 235, 1)",
                    "RGBA(255, 99, 132, 1)",
                    "RGBA(75, 192, 192, 1)",
                    "rgba(0,0,0,0.07)"
                ],
                hoverBackgroundColor: [
                    "RGBA(54, 162, 235, 0.8)",
                    "RGBA(255, 99, 132, 0.8)",
                    "RGBA(75, 192, 192, 0.8)",
                    "rgba(0,0,0,0.07)"
                ]

            }],
            labels: [
                "Đơn Hàng Chờ",
                "Đơn Hàng Đã Huỷ",
                "Đơn Hàng Đã Giao",
                "Đơn Hàng Khác"
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'left'
            },
        }
    });
}
function Init_BarChart() {
    //bar chart
    var ctx = document.getElementById("barChart");
    //    ctx.height = 200;
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Ngày 1", "Ngày 2", "Ngày 3", "Ngày 4", "Ngày 5", "Ngày 6", "Ngày 7"],
            datasets: [
                {
                    label: "Số Lượng Khách Hàng",
                    data: [65, 59, 80, 81, 56, 55, 45],
                    borderColor: "rgba(0, 194, 146, 0.9)",
                    borderWidth: "0",
                    backgroundColor: "RGBA(52, 152, 219, 0.8)"
                },
                {
                    label: "Số Lượng Đơn Hàng",
                    data: [28, 48, 40, 19, 86, 27, 76],
                    borderColor: "rgba(0,0,0,0.09)",
                    borderWidth: "0",
                    backgroundColor: "RGBA(231, 76, 60, 0.8)"
                }
            ]
        },
        options: {
            legend: {
                position: 'left'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function Init_LineChart(labelsInput, dataInput) {
    //Sales chart
    var ctx = document.getElementById("sales-chart");
    ctx.height = 150;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsInput,
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [{
                label: "Doanh Thu",
                data: dataInput,
                backgroundColor: 'transparent',
                borderColor: 'rgba(40,167,69,0.75)',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 6,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(40,167,69,0.75)',
            }]
        },
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
                intersect: true,
            },
            legend: {
                display: true,
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: true,
                        drawBorder: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: true,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Doanh Thu'
                    }
                }]
            },
            title: {
                display: false,
            }
        }
    });
}
async function CreateChart(type, url_getAPI, MADT, MACH){
    await fetch(url_getAPI + "id=" + MADT + "&mach=" + MACH, {
        headers: {
            "auth-token": getCode1(),
            "role": "DT"
        }
    }).then((response) =>{
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((data) =>{
        if(type === 1){
            let labelsInput = data.map(object => object.THANG)
            let dataInput = data.map(object => object.DOANHTHU)
            Init_LineChart(labelsInput, dataInput)
        }
    })
}
// ----------------MAIN ----------------
if(checkAuthentication()){
    oneRestaurant = localStorage.getItem("oneRestaurant")
    // set corner avatar
    document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",localStorage.getItem("AVATAR"))
    form_Display() // form 
    // --------Chart-------------
    Init_RaderChart()
    Init_DoughutChart()
    Init_BarChart()
    
    CreateChart(1,url_LineChartRevenue, localStorage.getItem('ACCCODE'), oneRestaurant)
}
else{
    location.href = '../../../page-login.html'
}

