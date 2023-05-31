// -----------------input data-------------------
let ACCOUNTCODE = localStorage.getItem("ACCCODE")
// const BASE_URL = "http://172.29.87.174:8082"
let BASE_URL = readTextFile("../../assets/data_local.txt")
let url_Signin = BASE_URL + "/account/signin"

function Routes(ID, code1, code2){
    if(code1 === null || code2 === false ){
        swal({
            title: "ERROR!",
            text: "Không Thể Xác Thực! Vui Lòng Đăng Nhập Lại...",
            icon: "error",
            button: "Click me!"
        }).then(function () {
            location.reload();
        }) 
    }
    if(ID.substring(0,2) === "NV"){
        // console.log("Nhân Viên")
        localStorage.setItem("ACCCODE",ID)
        localStorage.setItem("code-1",code1)
        localStorage.setItem("code-2",code2)
        location.href = "/staff/"
    }
    else if(ID.substring(0,2) === "TX"){
        // console.log("Tài Xế")
        localStorage.setItem("ACCCODE",ID)
        localStorage.setItem("code-1",code1)
        localStorage.setItem("code-2",code2)
        location.href = "/driver/"
    }
    else if(ID.substring(0,3) === "TAX"){
        // console.log("Đối tác")
        localStorage.setItem("ACCCODE",ID)
        localStorage.setItem("code-1",code1)
        localStorage.setItem("code-2",code2)
        location.href = "/partner/"
    }
    else if(ID.substring(0,2) === "CH"){
        // console.log("Cửa Hàng")
        localStorage.setItem("ACCCODE",ID)
        localStorage.setItem("code-1",code1)
        localStorage.setItem("code-2",code2)
        location.href = "/restaurant/"
    }
    else {
        return
    }
}

async function fetch_SigninData(data){
    try {
        const spinner = document.getElementById("spinner"); //loader
        spinner.removeAttribute('hidden'); //loader
        await fetch(url_Signin, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            spinner.setAttribute('hidden', ''); //loader
            const keys = Object.keys(data[0])
            console.log("respone:", data[0]);
            if (keys[0] === "ERROR") {
                //alert error
                Swal.fire({
                    title: "ERROR!",
                    text: data[0][keys[0]],
                    icon: "error",
                    button: "Click me!"
                }).then(function () {
                    location.reload();
                });
            }
            else {
                Routes(data[0][keys[0]],data[0][keys[1]], data[0][keys[2]])
            }
        });
    } catch (error) {
        if(error.message === "Failed to fetch"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Không thể kết nối với máy chủ. Vui lòng kiểm tra lại đường truyền hoặc liên hệ với nhân viên kỹ thuật!',
                footer: '<a href="">Tìm hiểu về lỗi này?</a>'
            }).then(() =>{
                const spinner = document.getElementById("spinner"); //loader
                spinner.setAttribute('hidden', ''); //loader
            })
        }else
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
                // footer: '<a href="">Tìm hiểu về lỗi này?</a>'
            }).then(() =>{
                const spinner = document.getElementById("spinner"); //loader
                spinner.setAttribute('hidden', ''); //loader
            })
        }       
    }
    
}

function sign_in(){
    document.getElementById("dataForm").addEventListener("submit", async function (e){
        e.preventDefault();
        var form = new FormData(e.target)
        dataSignin = Object.fromEntries(form)
        fetch_SigninData(dataSignin)
        // Routes("NV174318I")
    })
}
// ----------------MAIN---------------
if (checkAuthentication()) {
    Routes(ACCOUNTCODE)
}


