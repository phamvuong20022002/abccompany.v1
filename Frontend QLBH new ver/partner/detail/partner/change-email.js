const BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Request_OTP = BASE_URL + "/account/verify/email"
// ----------------MAIN ----------------
if (checkAuthentication()) {
    document.querySelector("form").addEventListener("submit", async (e)=>{
        e.preventDefault();
        let code = localStorage.getItem("ACCCODE")
        let dataReq
        if(code.substring(0,3) === "TAX"){
            dataReq = {
                "role":"DT",
                "madt": code,
                "email":document.getElementById("email").value,
            }
        }
        else if(code.substring(0,2) === "NV"){
            dataReq = {
                "role":"NV",
                "manv": code,
                "email": document.getElementById("email").value,
            }
        }
        // request OTP
        await fetch(url_Request_OTP, {
            method: "POST",
            body: JSON.stringify(dataReq),
            headers: {
                "Content-Type": "application/json",
                "auth-token": getCode1(),
            },
        }).then((response) => {
            authenticatePrivateAPIChecking(response)
            return response.json()
        }).then((data) => {
            if(data[0].OTPCODE){
                Swal.fire(
                    'Mã Xác Thực Đã Được Gửi Thành Công!',
                    'Mã xác thực đã được gửi đến email ' + data[0].EMAIL,
                    'success' 
                ).then(() => {
                    // OTP PAGE
                })
            }else{
                Swal.fire(
                    'Gửi Mã Xác Thực Không Thành Công!',
                    'Vui lòng thực hiện xác thực lại Email',
                    'error' 
                ).then(() => {
                    location.href = './index.html'
                })
            }
        });
    })
}
else {
    location.href = '../../../page-login.html'   
}