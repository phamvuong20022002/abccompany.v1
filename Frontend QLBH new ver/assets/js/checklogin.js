function checklogin(username){
    if(username === localStorage.getItem("ACCCODE")){
        return true
    }
    return false
}

function checkAuthentication(){
    try {
        localStorage.getItem("code-1").toString()
    } catch (error) {
        return false;
    }
    if(localStorage.getItem("code-1") === 'undefined'){
        return false
    }
    if(localStorage.getItem("code-1") !== null && localStorage.getItem("code-1").toString() !== "undefined"
    && localStorage.getItem("code-2") && localStorage.getItem("ACCCODE") !== null){
        return true
    }
    return false
}

function getCode1(){
    if(checkAuthentication()){
        return localStorage.getItem("code-1")
    }
    return null
}

// check Authentication private API
function authenticatePrivateAPIChecking(response) {
    let check = response.statusText
    if (check === "Unauthorized" || check === "Bad Request") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Không Thể Xác Thực! Vui Lòng Đăng Nhập...',
            footer: '<a href="">Tìm Hiểu Lỗi Không Thể Xác Thực?</a>'
        }).then(() => {
            localStorage.clear(),
                location.reload();
        })
    }
}
// hide console logs
// console.log = function(){}
