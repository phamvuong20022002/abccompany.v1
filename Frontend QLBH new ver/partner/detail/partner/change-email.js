const BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Request_OTP = BASE_URL + "/account/verify/email"
// ----------------MAIN ----------------
let text_connect = localStorage.getItem("TEXT_CONNECT")
localStorage.setItem("TEXT_CONNECT", null)
let text_1
let text_2
let text_connect_check
try {
    text_1 = text_connect.slice(-5)
    text_2 = text_connect.substring(0, text_connect.length - text_1.length)
    text_connect_check = getCode1().substring(text_2.length, text_2.length + 5)
} catch (error) {
    Swal.fire(
        'Không Thể Xác thực phiên truy cập!',
        'Phiên truy của bạn ở trang này đã hết hạn.',
        'error',
    ).then(() => {
        window.location.replace('./index.html')
    });
    // location.href('./index.html')
}

if (text_connect !== undefined && text_connect !== null && checkAuthentication() && text_connect_check === text_1) {
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
        const spinner = document.getElementById("spinner"); //loader
        spinner.removeAttribute('hidden'); //loader
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
                spinner.setAttribute("hidden", "");
                Swal.fire(
                    'Mã Xác Thực Đã Được Gửi Thành Công!',
                    'Mã xác thực đã được gửi đến email ' + data[0].EMAIL,
                    'success' 
                ).then(() => {
                    localStorage.setItem("TEXT_CONNECT_2", text_connect)
                    localStorage.setItem("EMAIL_VERIFY", data[0].EMAIL)
                    location.href = "./otp/index.html";
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
    Swal.fire(
        'Không Thể Xác thực phiên truy cập!',
        'Phiên truy của bạn ở trang này đã hết hạn.',
        'error',
    ).then(() => {
        location.href = '../../../page-login.html' 
    });
}