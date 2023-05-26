// -----data input ------
let oneRestaurant = null;
const type_detail = localStorage.getItem("type_detail");
// localStorage.removeItem("oneStaffCode");
const BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display = BASE_URL + "/partner/detailrestaurant/"
let url_Update = BASE_URL + "/partner/updaterestaurant"
let url_ViewPass = BASE_URL + "/partner/viewrespass/"
let url_ChangePass = BASE_URL + "/partner/updaterespass"
let update_button_status = "off"
update_button_status = localStorage.getItem("update_button_status")
// -----data input ------

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
        },
    }).then((response) => {
        authenticatePrivateAPIChecking(response)
        return response.json();
    }).then((data) => {
        const keys = Object.keys(data[0])
        console.log("respone:", keys[0]);
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
    await fetch(url_Display + oneRestaurant).then((response) =>{
        return response.json()
    }).then((data) =>{
        //display
        let input = document.getElementsByTagName("input")
        const keys = Object.keys(data[0])
        for(let i = input.length - 2; i > 0; i--){
            if(i === 1 || i === 2 || i === 5 || i === 8){
                input[i] = input[i].setAttribute("readonly", "")
            }
            input[i].setAttribute("value", data[0][keys[i - 1]])
            if(input[i].name === "mk"){
                input[i].value = "*************"
                document.getElementById("view-pass").onclick = function(){viewPass(data[0].MACUAHANG, data[0].MASOTHUE)}
            }
            if(i === input.length - 3){
                let textarea = document.getElementsByTagName("textarea")
                textarea[0].value = data[0][keys[i]]
            }
        }
    })
}

async function viewPass(MACH,MADT){
    await fetch(url_ViewPass + "id=" + MADT + "&mach=" + MACH,{
        headers: {
            "auth-token": getCode1()
        }
    }).then((response) => {
        authenticatePrivateAPIChecking(response)
        return response.json();
    }).then((data) => {
        if(Object.keys(data[0]) === "ERROR") {
            console.log(Object.keys(data[0]))
        }
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
    })
    
}
// ----------------MAIN ----------------
if(checkAuthentication()){
    oneRestaurant = localStorage.getItem("oneRestaurant")
    // set corner avatar
    document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",localStorage.getItem("AVATAR"))
    form_Display()
}
else{
    location.href = '../../../page-login.html'
}

