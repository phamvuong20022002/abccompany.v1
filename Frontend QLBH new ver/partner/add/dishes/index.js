let MADT = null
const BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Add = BASE_URL + "/partner/adddishes"


//My profile --Error
function myProfile(){
    localStorage.setItem("oneStaffCode",localStorage.getItem("ACCCODE"))
    localStorage.setItem("type_detail", "EDIT")
}

 
//fetch add data
async function FetchData(dataRep){
    await fetch(url_Add, {
        method: "POST",
        body: JSON.stringify(dataRep),
        headers: {
            "Content-Type": "application/json",
            "auth-token" : getCode1(),
        },
    }).then((response) => {
        authenticatePrivateAPIChecking(response)
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
            });
        }
        else {
            //alert success
            Swal.fire({
                title: "SUCCESS!",
                text: data[0][keys[0]],
                icon: "success",
                showCancelButton: true,
                cancelButtonText: "Quay Lại Menu",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#A9A9A9',
                confirmButtonText: 'Thêm Món Mới',
                reverseButtons: true,
              }).then((result) => {
                if(result.value){
                    location.reload()
                }else{
                    location.href = "../../partner_manageDishes.html"
                }
            })
        }
    });
}

function getData(requireFields) {
    var elements = document.getElementById("dataForm").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    for(let i = 0; i < requireFields.length; i++){
        if(obj[requireFields[i]].length === 0){
            return null
        }
    }
    return obj
}

//click update button
function submit_button() {
    let requireFields = ["tenmon", "mieuta", "gia", "tinhtrang"]
    let dataAdd =  getData(requireFields)
    if(dataAdd !== null){
        //turn sending button on
        const sending = document.getElementById("payment-button-sending")
        sending.style.display = "inline-block"
        const update = document.getElementById("payment-button-amount")
        update.style.display = "none"
        //fetch data
        dataAdd["madt"] = MADT;
        FetchData(dataAdd)
        // console.log(dataAdd)
    }
}


// ----------------MAIN ----------------
if(checkAuthentication()){
    MADT = localStorage.getItem("onePartnerCode");
    // set corner avatar
    document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",localStorage.getItem("AVATAR"))
}
else{
    location.href = '../../../page-login.html'
}

