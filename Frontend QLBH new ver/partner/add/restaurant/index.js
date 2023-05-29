// -----data input ------
let MADT = null
const type_detail = localStorage.getItem("type_detail");
const BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Add = BASE_URL + "/partner/createrestaurant"
let avatarDefault = "https://res.cloudinary.com/dayrqfwxo/image/upload/v1685382341/samples/default_image/ole3j6zhy63dfykv7ftx.jpg"
let update_button_status = "off"
update_button_status = localStorage.getItem("update_button_status")
// -----data input ------

//My profile
function myProfile(){
    localStorage.setItem("oneStaffCode",localStorage.getItem("ACCCODE"))
    localStorage.setItem("type_detail", "EDIT")
}

//update button
function update_button() {
    localStorage.setItem("update_button_status", "on")
    location.reload()
}

//Random string function
function randomString(len) {
    var str = "";                                // String result
    for (var i = 0; i < len; i++) {              // Loop `len` times
        var rand = Math.floor(Math.random() * 62); // random: 0..61
        var charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48; // Get correct charCode
        str += String.fromCharCode(charCode);      // add Character to str
    }
    return str; // After all loops are done, return the concatenated string
}
 
//fetch update data
async function FetchData(dataRep){
    await fetch(url_Add, {
        method: "POST",
        body: JSON.stringify(dataRep),
        headers: {
            "Content-Type": "application/json",
            "auth-token": getCode1()
        },
    }).then((response) => {
        authenticatePrivateAPIChecking(response)
        return response.json();
    }).then((data) => {
        const keys = Object.keys(data[0])
        console.log("respone:", keys[0]);
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
                buttons: {
                  cancel: "Thêm Mới",
                  back: "Quản Lý Cửa Hàng",
                  detail: "Chi Tiết CH",
                }
              })
              .then((value) => {
                  switch (value) {

                      case "back":
                          location.href = "../../partner_manageRestaurants.html";
                          break;
                      case "detail":
                        {   
                            localStorage.setItem("oneRestaurant", dataRep.mach);
                            location.href = "../../detail/restaurant/index.html";
                            break;
                        }
                            
                  default:
                          location.reload();
                  }
              });
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
    let requireFields = ["tenquan", "stk", "nganhang","giomocua", "giodongcua", "tinhtrang", "diachi"]
    let dataAdd =  getData(requireFields)
    if(dataAdd !== null){
        //turn sending button on
        const sending = document.getElementById("payment-button-sending")
        sending.style.display = "inline-block"
        const update = document.getElementById("payment-button-amount")
        update.style.display = "none"
        //fetch data
        dataAdd["madt"] = MADT;
        dataAdd["mach"] = "CH" + MADT.substring(3, MADT.length) + randomString(2).toUpperCase();
        dataAdd["mota"] = document.getElementsByTagName("textarea")[0].value;
        dataAdd["avatar"] = avatarDefault
        delete dataAdd[""];

        FetchData(dataAdd)
        console.log(dataAdd)
    }
}


// ----------------MAIN ----------------
if(checkAuthentication()){
    MADT = localStorage.getItem("onePartnerCode");
    // set corner avatar
    document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",localStorage.getItem("AVATAR"))
}
else {
    location.href = '../../../page-login.html'
}


