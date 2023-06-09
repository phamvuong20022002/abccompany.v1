// -----data input ------
let oneRestaurant = null;
const type_detail = localStorage.getItem("type_detail");
// localStorage.removeItem("oneStaffCode");
const BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display = BASE_URL + "/partner/detailrestaurant/"
let url_Update = BASE_URL + "/restaurant/updaterestaurant"
let url_ChangeAvatar = BASE_URL + "/partner/changeavatar/res"
let update_button_status = "off"
update_button_status = localStorage.getItem("update_button_status")
// -----data input ------

//My profile
function myProfile(){
    location.reload()
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
    Swal.fire({
        title: 'Nhập mật khẩu của cửa hàng',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Cập Nhật',
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
            dataRep["mk"] = password
            !Swal.isLoading()
            return dataRep
        }
    }).then(async(dataRep) => {
        await fetch(url_Update, {
            method: "POST",
            body: JSON.stringify(dataRep.value),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
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
    })

    
    
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
        delete dataUpdate["madt"]
        delete dataUpdate["nganhang"]
        delete dataUpdate["stk"]
        // console.log(dataUpdate);
        updateData(dataUpdate)
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
    await fetch(url_Display + oneRestaurant).then((response) => {
        return response.json();
    }).then((data) => {

        //display
        let input = document.getElementsByTagName("input")
        const keys = Object.keys(data[0])
        for (let i = input.length - 1; i > 0; i--) {
            if (i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 8 || i === 10) {
                input[i] = input[i].setAttribute("readonly", "")
            }
            input[i].setAttribute("value", data[0][keys[i - 1]])
            if (i === input.length - 1) {
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
        css_Avatar(changeAvatar(dataUpdate, url_ChangeAvatar, true, "CH"));
    })
}

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
// ----------------MAIN ----------------
if(checkAuthentication()){
    oneRestaurant = localStorage.getItem("ACCCODE");// MACH
    document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",localStorage.getItem("AVATAR"))
    form_Display()
}
else{
    location.href = '../../../page-login.html'
}

