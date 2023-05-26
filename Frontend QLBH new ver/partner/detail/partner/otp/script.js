const BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Verify_OTP = BASE_URL + "/partner/changeemail"

function Init(){
    const inputs = document.querySelectorAll("input"),
        button = document.querySelector("button");

    inputs.forEach((input, index1) => {
        input.addEventListener("keyup", (e) => {
            const currentInput = input,
                nextInput = input.nextElementSibling,
                prevInput = input.previousElementSibling;
            if (currentInput.value.length > 1) {
                currentInput.value = currentInput.value.substring(0,1);
                return;
            }
            if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
                nextInput.removeAttribute("disabled");
                nextInput.focus();
            }
            if (e.key === "Backspace") {
                inputs.forEach((input, index2) => {
                    if (index1 <= index2 && prevInput) {
                        input.setAttribute("disabled", true);
                        input.value = "";
                        prevInput.focus();
                    }
                });
            }
            if (!inputs[3].disabled && inputs[3].value !== "") {
                button.classList.add("active");
                return;
            }
            button.classList.remove("active");
        });
    });

    window.addEventListener("load", () => inputs[0].focus());
}
let timerOn = true;
function timer(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s + 's';
    remaining -= 1;

    if (remaining >= 0 && timerOn) {
        setTimeout(function () {
            timer(remaining);
        }, 1000);
        return;
    }

    if (!timerOn) {
        // Do validate stuff here
        return;
    }

    // Do timeout stuff here
    location.reload();
}

// ----------------MAIN ----------------
let text_connect = localStorage.getItem("TEXT_CONNECT_2")
localStorage.setItem("TEXT_CONNECT_2", null)
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
    Init();
    timer(3600);
    document.getElementById("bnt-verify").addEventListener("click", async (e) => {
        e.preventDefault();
        let input = document.getElementsByTagName("input")
        let otp = ''
        for(let i = 0 ; i < input.length; i++) {
            otp += input[i].value.toString()
        }
        if(otp.length !== 4){
            Swal.fire(
                'Xác thực thất bại!',
                'Mã OTP không đúng định dạng. Vui lòng nhập lại!',
                'error',
            ).then(() => {
                localStorage.setItem("TEXT_CONNECT_2", text_connect)
                location.reload()
            }); 
        }else {
            let dataReq = {
                "type": "EMAIL",
                "role": "DT",
                "madt": localStorage.getItem("ACCCODE"),
                "email" : localStorage.getItem("EMAIL_VERIFY"),
                "otpcode": otp
            }
            await fetch(url_Verify_OTP,{
                method: "POST",
                body: JSON.stringify(dataReq),
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCode1(),
                }
            }).then((response)=>{
                authenticatePrivateAPIChecking(response)
                return response.json();
            }).then((data) => {
                console.log(Object.keys(data[0])[0]);
                if(data[0].RESULT === '0'){
                    Swal.fire(
                        'Xác thực Email thất bại!',
                        'Mã OTP không chính xác!',
                        'error',
                    ).then(() => {
                        return 
                    })
                }
                else if(Object.keys(data[0])[0] === "ERROR"){
                    Swal.fire(
                        'Xác thực Email thất bại!',
                        data[0].ERROR,
                        'error',
                    ).then(() => {
                        location.href = '../index.html'
                    })
                }
                else{
                    Swal.fire(
                        'Xác thực Email thành công!',
                        data[0].RESULT,
                        'success',
                    ).then(() => {
                        location.href = '../index.html'
                    })
                }
            })
        }
    })
}
else {
    Swal.fire(
        'Không Thể Xác thực phiên truy cập!',
        'Phiên truy của bạn ở trang này đã hết hạn.',
        'error',
    ).then(() => {
        location.href = '../../../../page-login.html'
    });
}
