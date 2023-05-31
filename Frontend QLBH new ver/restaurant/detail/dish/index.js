// -----data input ------
let MACH = null;
let oneDish = null;
const type_detail = localStorage.getItem("type_detail");
// localStorage.removeItem("oneStaffCode");
let BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display = BASE_URL + "/restaurant/detaildish/"
let url_Update = BASE_URL + "/restaurant/updatedishstatus"
let update_button_status = "on"
update_button_status = localStorage.getItem("update_button_status")
// -----data input ------

//My profile
function myProfile() {
    localStorage.setItem("oneStaffCode", localStorage.getItem("ACCCODE"))
    localStorage.setItem("type_detail", "EDIT")
}

//click update button
function submit_button() {
    Swal.fire({
        title: 'Cập Nhật Tình Trạng Món Ăn Của Cửa Hàng',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Cập nhật',
        showLoaderOnConfirm: true,
        preConfirm: (status) => {
            let dataReq = {
                "mach": MACH,
                "tenmon": oneDish,
                "tinhtrang": status
            }
            return fetch(url_Update, {
                method: "POST",
                body: JSON.stringify(dataReq),
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCode1(),
                    "role": "CH",
                },
            }).then(response => {
                authenticatePrivateAPIChecking(response)

                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.dismiss !== 'cancel' && result.dismiss !== 'backdrop') {
            // console.log(result.value)
            const keys = Object.keys(result.value[0])
            if (keys[0] === "ERROR") {
                //alert error
                Swal.fire({
                    title: "Cập Nhật Không Thành Công!",
                    text: result.value[0][keys[0]],
                    icon: "error",
                    button: "Click me!",
                    footer: '<a href="">Tìm hiểu về lỗi này?</a>'
                }).then(function () {
                    location.reload();
                }
                );
            }
            else {
                //alert success
                Swal.fire({
                    title: "SUCCESS!",
                    text: result.value[0][keys[0]],
                    icon: "success",
                    button: "Click me!"
                }).then(function () {
                    location.reload();
                }
                );
            }
        }
    })
}

async function form_Display() {
    // console.log(update_button_status, type_detailStaff)
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
    await fetch(url_Display + "id=" + MACH + "&tenmon=" + oneDish)
    .then(response => {
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((data) => {
        //display
        let input = document.getElementsByTagName("input")
        const keys = Object.keys(data[0])
        for (let i = input.length - 1; i >= 0; i--) {
            input[i] = input[i].setAttribute("readonly", "")
            input[i].setAttribute("value", data[0][keys[i - 1]])
        }
    })
}
// ----------------MAIN ----------------
if (checkAuthentication()) {
    MACH = localStorage.getItem("ACCCODE") // MACH
    oneDish = localStorage.getItem("oneDish") // Ten Mon
    document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",localStorage.getItem("AVATAR"))
    form_Display()
}
else {
    location.href = '../page-login.html'
}
