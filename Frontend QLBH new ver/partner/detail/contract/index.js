// -----data input ------
let MADT = null

let BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display = BASE_URL + "/partner/getcontract/"
let url_StaffInfo = BASE_URL + "/staff/getonestaff/" 
let button_status = null

button_status = localStorage.getItem("button_status")
// -----data input ------

//My profile
function myProfile(){
    localStorage.setItem("oneStaffCode",localStorage.getItem("ACCCODE"))
    localStorage.setItem("type_detailStaff", "EDIT")
}
//request extension of contract
async function requestExtension() {
    Swal.fire({
        title: 'Yêu Cầu Gia Hạn Hợp Đồng ',
        html:
            '<label >Gia Hạn Thêm (Tháng): &nbsp</label>' +
            '<input id="extension" class="swal2-input" type = "number"  min = 3> </br></br>' +
            '<p>Thời gian gia hạn thêm phải trên 3 tháng.   </p>',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Yêu Cầu Gia Hạn',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            if(document.getElementById('extension').value !== undefined){
                let dataUpdate = {
                    "madt": MADT,
                    "giahan": document.getElementById('extension').value
                }
                // console.log(dataUpdate)
            }
        },
    }).then( async (result) =>{
        if (result.dismiss !== "cancel" && result.dismiss !== "backdrop") {
            //get email staff
            const MANV = document.getElementById('manv').value
            await fetch(url_StaffInfo + MANV).then((response) => {
                return response.json()
            }).then((InfoStaff) => {
                Swal.fire(
                    'Gửi Yêu Cầu Thành Công!',
                    'Yêu Cầu Gia Hạn Đã Được Gửi Đến Email Nhân Viên Quản Lý: ' + InfoStaff[0].EMAIL + ' Vui Lòng Chờ Xét Duyệt Trong Khoảng Từ 3-5 Ngày!',
                    'success'
                )
            })
        } 
    })
}
// view staff info
async function viewStaffInfo(){
    const MANV = document.getElementById('manv').value
    await fetch(url_StaffInfo + MANV)
    .then((response) => {
        return response.json()
    }).then((data) =>{
        // console.log(data[0])
        const l_staffCode = `<label style='float: left'>${MANV.toString()}</label>`;
        const l_staffName = `<label style='float: left'> ${data[0].HOTEN} </label>`;
        const l_staffEmail = `<label style='float: left'> ${data[0].EMAIL} </label>`;
        const l_staffPhone = `<label style='float: left'> ${data[0].SDT} </label>`;
        Swal.fire({
            title: 'Thông Tin Nhân Viên',
            html:
            '<label style="float: left" > <strong> Mã Nhân Viên: &nbsp </strong></label>' + l_staffCode  + '</br> </br>'+
            '<label style="float: left"><strong> Tên Nhân Viên:  &nbsp </strong></label>' + l_staffName + '</br> </br>'+
            '<label >---Thông Tin Liên Lạc--- </label> </br> </br>'+
            '<label style="float: left"><strong>SĐT: &nbsp</strong></label>' + l_staffPhone + '</br> </br>'+
            '<label style="float: left"><strong>Email: &nbsp</strong></label>' + l_staffEmail ,
            confirmButtonText: 'OK',  
        })
    })  
}
//Display form
async function form_Display(){
    //get data from database
    await fetch(url_Display + MADT,{
        headers: {
            "auth-token": getCode1(),
        }
    }).then((response) => {
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((data) => {
        delete data[0].EMAIL
        //display
        let input = document.getElementsByTagName("input")
        const keys = Object.keys(data[0])
        for(let i = input.length - 1; i >= 0; i--){
            input[i].setAttribute("value", data[0][keys[i-1]])
            //check status of contract
            if(i === keys.length -1 ){
                const contractstatus = document.getElementById("contractstatus")
                const strong = document.createElement("strong")
                if(data[0][keys[i]] > 30){
                    strong.innerHTML = "Thời Gian Còn Lại " + data[0][keys[i]].toString() + " ngày"
                    contractstatus.appendChild(strong)
                }
                else {
                    strong.innerHTML = "Đã Hết Hạn!  " 
                    contractstatus.appendChild(strong)
                }
            }
        }
        //set up for view staff info
        const viewinfo = document.getElementById('viewinfo')
        viewinfo.onclick = () => {
            viewStaffInfo()
        }
    })
}
// ----------------MAIN ----------------
if(checkAuthentication()){
    MADT =  localStorage.getItem("ACCCODE")
    // set corner avatar
    document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",localStorage.getItem("AVATAR"))
    form_Display()
}else{
    location.href = '../../../page-login.html'
}

