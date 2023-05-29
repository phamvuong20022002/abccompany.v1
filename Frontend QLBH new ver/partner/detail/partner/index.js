// -----data input ------
MADT = null;
const type_detail = localStorage.getItem("type_detail");
// localStorage.removeItem("oneStaffCode");
const BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display = BASE_URL + "/partner/getinfo/"
let url_Update = BASE_URL + "/partner/updateinfo"
let url_ChangePass = BASE_URL + "/partner/changepassword"
let url_VerifyPass = BASE_URL + "/partner/verifypass/update"
let url_ChangeAvatar = BASE_URL + "/partner/changeavatar"
let url_StaffInfo = BASE_URL + "/staff/getonestaff/"
let url_Request_OTP = BASE_URL + "/account/verify/email"
let update_button_status = "off"
update_button_status = localStorage.getItem("update_button_status")
// -----data input ------

//My profile
function myProfile() {
    window.location.reload()
}

//update button
function update_button() {
    localStorage.setItem("update_button_status", "on")
    location.reload()
}


function getData(form) {
    var formData = new FormData(form);
    //console.log(Object.fromEntries(formData));
    return Object.fromEntries(formData)
}
async function viewStaffInfo() {
    const MANV = document.getElementById('manv').value
    await fetch(url_StaffInfo + MANV)
        .then((response) => {
            return response.json()
        }).then((data) => {
            // console.log(data[0])
            const l_staffCode = `<label style='float: left'>${MANV.toString()}</label>`;
            const l_staffName = `<label style='float: left'> ${data[0].HOTEN} </label>`;
            const l_staffEmail = `<label style='float: left'> ${data[0].EMAIL} </label>`;
            const l_staffPhone = `<label style='float: left'> ${data[0].SDT} </label>`;
            Swal.fire({
                title: 'Thông Tin Nhân Viên',
                html:
                    '<label style="float: left" > <strong> Mã Nhân Viên: &nbsp </strong></label>' + l_staffCode + '</br> </br>' +
                    '<label style="float: left"><strong> Tên Nhân Viên:  &nbsp </strong></label>' + l_staffName + '</br> </br>' +
                    '<label >---Thông Tin Liên Lạc--- </label> </br> </br>' +
                    '<label style="float: left"><strong>SĐT: &nbsp</strong></label>' + l_staffPhone + '</br> </br>' +
                    '<label style="float: left"><strong>Email: &nbsp</strong></label>' + l_staffEmail,
                confirmButtonText: 'OK',
            })
        })
}
async function changePassword() {
    await Swal.fire({
        title: 'Đổi Mật Khẩu',
        html:
            '<label style="float: left">Mật Khẩu Cũ </label>' +
            '<input id="oldpass" class="swal2-input" type = "password">' +
            '<label style="float: left">Mật Khẩu Mới </label>' +
            '<input id="newpass" class="swal2-input" type = "password">' +
            '<label style="float: left">Nhập Lại Mật Khẩu Mới </label>' +
            '<input id="againNewpass" class="swal2-input" type = "password">',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Thay Đổi',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let dataUpdate = {
                "madt": MADT,
                "mk": document.getElementById('oldpass').value,
                "mkmoi": document.getElementById('newpass').value,
                "mknhaplai": document.getElementById('againNewpass').value
            }
            if (dataUpdate.mknhaplai !== dataUpdate.mkmoi) {
                return 1
            }
            else {
                return fetch(url_ChangePass, {
                    method: "PUT",
                    body: JSON.stringify(dataUpdate),
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": getCode1(),
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
                    })
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value !== undefined) {
            if (result.value === 1) {
                Swal.fire(
                    'Mật Khẩu Nhập Lại Không Trùng Với Mật Khẩu Mới!',
                    'Vui lòng thực hiện lại!',
                    'error'
                )
            }
            else {
                const keys = Object.keys(result.value[0])
                if (keys[0] === "ERROR") {
                    Swal.fire(
                        result.value[0][keys[0]],
                        'Vui lòng thực hiện lại!',
                        'error'
                    )
                }
                else {
                    Swal.fire(
                        result.value[0][keys[0]],
                        'Vui lòng thực hiện lại!',
                        'success'
                    )
                }
            }
        }
    })
}
//fetch update data
async function updateData(dataRep) {
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
        // console.log("respone:", keys[0]);
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
function submit_button() {
    const sending = document.getElementById("payment-button-sending")
    sending.style.display = "inline-block"
    const update = document.getElementById("payment-button-amount")
    update.style.display = "none"

    document.getElementById("dataForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let dataUpdate = getData(e.target);
        delete dataUpdate.nvql
        delete dataUpdate.mk
        delete dataUpdate.slcn
        delete dataUpdate.email
        delete dataUpdate.sdt
        // console.log(dataUpdate)

        updateData(dataUpdate)
    })
}

async function form_Display() {
    // display alert
    if ((update_button_status === "on") && (type_detail === "VIEW")) {
        localStorage.setItem("update_button_status", "off")
        const div = document.getElementById("alert-no-display")
        div.style = "display: block"
        div.innerHTML = "Bạn Đang Ở Chế Độ VIEW. Không Được Chỉnh Sửa Thông Tin Của Tài Khoản Khác!"
    }

    if (update_button_status === "on" && type_detail !== "VIEW") {
        const display_div = document.getElementById("no-display")
        display_div.style = "display: inline"
    }

    //get data from database
    await fetch(url_Display + MADT).then((response) => {
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((data) => {
        //set Avatar
        let avatar = document.getElementById("photo")
        if (data[0].AVATAR === null) {
            let src = "https://www.kasandbox.org/programming-images/avatars/starky-seedling.png"
            avatar.setAttribute("src", src)
        }
        else {
            avatar.setAttribute("src", data[0].AVATAR)
        }
        document.getElementById("partner-name").innerHTML = data[0].TENDOITAC

        //display body
        let input = document.getElementsByTagName("input")
        const keys = Object.keys(data[0])
        for (let i = input.length - 1; i >= 0; i--) {
            if (i === 2 || i === 3 || i === 5 || i === 12 || i === 7 || i === 8 || i === 13) {
                input[i] = input[i].setAttribute("readonly", "")
            }
            input[i].setAttribute("value", data[0][keys[i - 1]])
            if (i === 5) {
                if (data[0].XACTHUCEMAIL === null) {
                    //text
                    let strong = document.getElementById("small-strong-email")
                    strong.innerHTML = "Email chưa được xác thực"
                    input[i].classList.add("is-invalid")
                    //change button
                    let changeemail = document.getElementById("changeemail")
                    changeemail.className = " fa fa-exclamation-circle fa-lg"
                    changeemail.onclick = () => {
                        verifyEmail(data[0].EMAIL)
                    }
                }
                else {
                    //text
                    let label_email = document.getElementById("label-i-email")
                    label_email.className = "text-success fa fa-check-square-o"
                    //change button
                    let changeemail = document.getElementById("changeemail")
                    changeemail.onclick = () => {
                        changeEmail()
                    }
                }
            }
            if (i === 12) {
                if (data[0].XACTHUCSDT === null) {
                    //text
                    let strong = document.getElementById("small-strong-phone")
                    strong.innerHTML = "SĐT chưa được xác thực"
                    input[i].classList.add("is-invalid")
                    //change button
                    let changephone = document.getElementById("changephone")
                    changephone.className = " fa fa-exclamation-circle fa-lg"
                }
                else {
                    //text
                    let label_email = document.getElementById("label-i-phone")
                    label_email.className = "text-success fa fa-check-square-o"
                    //change button
                    let changephone = document.getElementById("changephone")
                }
            }

        }
        //set up for change password button
        const changepass = document.getElementById('changepass')
        changepass.onclick = () => {
            changePassword()
        }
        //set up for view staff info
        const viewinfo = document.getElementById('viewinfo')
        viewinfo.onclick = () => {
            viewStaffInfo()
        }
    }).then(() => {
        changeAvatar()
    });
}

async function verifyEmail(email) {
    Swal.fire({
        title: "Xác Thực Email",
        text: "Nhấn Xác Thực để nhận mã OTP bằng Email: " + email,
        icon: "info",
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#343a40',
        cancelButtonText: "Sử dụng một Email khác",
        confirmButtonText: 'Xác Thực'
    }).then(async (result) => {
        if (result.value) {
            let dataReq = {
                "role": "DT",
                "madt": MADT,
                "email": email
            }
            const spinner = document.getElementById("spinner"); //loader
            spinner.removeAttribute('hidden'); //loader
            await fetch(url_Request_OTP, {
                method: "POST",
                body: JSON.stringify(dataReq),
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCode1(),
                },
            })
            .then((response) => {
                authenticatePrivateAPIChecking(response)
                return response.json();
            }).then((data)=>{
                spinner.setAttribute("hidden", ""); //loader
                if(data[0].OTPCODE){
                    Swal.fire(
                        'Mã Xác Thực Đã Được Gửi Thành Công!',
                        'Mã xác thực đã được gửi đến email ' + data[0].EMAIL,
                        'success' 
                    ).then(() => {
                        localStorage.setItem("JSON_CONNECT",JSON.stringify(dataReq));
                        let num = Math.floor(Math.random() * 13) + 2
                        let key = Math.random().toString(num).slice(2)
                        let TEXT_CONNECT = key + getCode1().substring( key.length, key.length + 5)

                        localStorage.setItem("TEXT_CONNECT_2", TEXT_CONNECT)
                        localStorage.setItem("EMAIL_VERIFY", data[0].EMAIL)
                        localStorage.setItem("TYPE_VERIFY_PARTNER", "VERIFYEMAIL")
                        location.href = "./otp/index.html";
                    })
                }   
            })
        }
        else if(result.dismiss === 'cancel'){
            changeEmail()
        }   
    })
}
async function changeEmail() {
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
                        localStorage.setItem('TEXT_CONNECT', data[0].TEXT_CONNECT)
                        location.href = './change-email.html'
                        return 1
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
    })

}

function changeAvatar() {
    let cloudName = "dayrqfwxo"
    let uploadPreset = "lmcv3avs"
    //config cloud connection
    const myWidget = cloudinary.createUploadWidget({
        cloudName: cloudName,
        uploadPreset: uploadPreset,
    }, async (error, result) => {
        // if updated successfully
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            document.getElementById("photo").setAttribute("src", result.info.secure_url);
            // update new image url to db
            let dataUpdate = {
                "madt": MADT,
                "newurl": result.info.secure_url
            }
            await fetch(url_ChangeAvatar, {
                method: "PUT",
                body: JSON.stringify(dataUpdate),
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCode1(),
                }
            }).then((respone) => {
                authenticatePrivateAPIChecking(respone)
                return respone.json()
            }).then((data) => {
                if (Object.keys(data[0]) === "ERROR") {
                    Swal.fire(
                        'Thay đổi ảnh đại diện thất bại!',
                        'Vui lòng thực hiện lại!',
                        'error'
                    ).then(() => {
                        location.reload();
                    })
                } else {
                    localStorage.setItem("AVATAR", result.info.secure_url)
                    Swal.fire(
                        'Thay đổi ảnh đại diện thành công!',
                        data[0].RESULT,
                        'success'
                    ).then(() => {
                        location.reload();
                    })
                }
            })
        }
    })

    css_Avatar(myWidget)
}

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


// ----------------MAIN ----------------
if (checkAuthentication()) {
    MADT = localStorage.getItem("ACCCODE")
    // set corner avatar
    document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src", localStorage.getItem("AVATAR"))
    form_Display()
}
else {
    location.href = '../../../page-login.html'
}

