// -----data input ------
const MACH = localStorage.getItem('ACCCODE');
const oneBillCode = localStorage.getItem("oneBillCode");
let BASE_URL = readTextFile("../../../../assets/data_local.txt")
let url_Display_Dishes = BASE_URL + "/restaurant/detailbill/" + oneBillCode
let url_Get_Order_Items = BASE_URL + "/restaurant/getorderitems/" + oneBillCode
//My profile
function myProfile(){
    localStorage.setItem("oneRestaurant",localStorage.getItem("ACCCODE"))
    localStorage.setItem("type_detailStaff", "EDIT")
    location.href = "../restaurant/"
}

//print button
document.getElementById("btnPrint").onclick = function () {
    this.style.display = "none"
    printElement(document.getElementById("printThis"));
    this.style.display = "block"
}

function printElement(elem) {
    var domClone = elem.cloneNode(true);
    
    var $printSection = document.getElementById("printSection");
    
    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }
    
    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    window.print();
}
//display bill info
async function displayBillInfo(){
    await fetch(url_Display_Dishes).then((response) => {
        return response.json();
    }).then((data) => {
        //customer name
        document.getElementById('customer-name').innerHTML = data[0].HOTEN
        //contact information
        document.getElementById('customer-contact').innerHTML = data[0].THONGTINLIENLAC
        //ordered date
        document.getElementById('ordered-date').innerHTML = data[0].NGAYDAT
        // bill code 
        document.getElementById('bill-code').innerHTML = data[0].MADH
        // address
        document.getElementById('bill-address').innerHTML = data[0].DIACHI
        //subtotal
        document.getElementById('subtotal').innerHTML = data[0].TONGGIA.toFixed(0).toString() + ' VNĐ'
        //shipping fee 
        document.getElementById('shipping-fee').innerHTML = data[0].PHIVANCHUYEN.toFixed(0).toString() + ' VNĐ'
        //total 
        document.getElementById('total').innerHTML = (data[0].TONGGIA + data[0].PHIVANCHUYEN).toFixed(0).toString() + ' VNĐ'
        //bill status
        document.getElementById('bill-status').innerHTML = data[0].TINHTRANG
        
    })
}
//display ordered items
async function displayOrderedItems(){
    await fetch(url_Get_Order_Items).then((response) => {
        return response.json()
    }).then((data) =>{
        let dishesContainer = document.getElementById('dishes-container')
        for(let i = 0; i< data.length; i++) {
            //create card to contain content and price 
            let divCard = document.createElement('div')
            divCard.className = 'd-flex justify-content-between align-items-center product-details'
            //content product
            let divContent = document.createElement('div')
            divContent.className = "d-flex flex-row product-name-image"
                //content-image (random image)
                let img = document.createElement('img')
                img.className = "rounded"
                img.src = "../../../images/dishes/" + "dish" + (Math.floor(Math.random() * 11)).toString() +".png"
                img.width = 120
                //content-text
                let divText = document.createElement('div')
                divText.className = "d-flex flex-column justify-content-between ml-2"
                //div text child
                let divTextChild = document.createElement('div')
                let Span_Name_of_divTextChild = document.createElement('span')
                Span_Name_of_divTextChild.className = "d-block font-weight-bold p-name"
                Span_Name_of_divTextChild.innerHTML = data[i].TENMON // Name of ordered dish
                let Span_Note_of_divTextChild = document.createElement("span")
                Span_Note_of_divTextChild.className = "fs-11"
                if(data[i].GHICHU === null){ // Note of ordered dish
                    Span_Note_of_divTextChild.innerHTML = "GHI CHÚ: Không Có"
                }
                else{
                    Span_Note_of_divTextChild.innerHTML = "GHI CHÚ: " + data[i].GHICHU
                }
                //appendChild of divTextChild
                divTextChild.appendChild(Span_Name_of_divTextChild)
                divTextChild.appendChild(Span_Note_of_divTextChild)
                // span text child
                let spanTextChild = document.createElement("span")
                spanTextChild.className = "fs-11"
                spanTextChild.innerHTML = "Số Lượng: " + data[i].SOLUONG // quantity
                //appendChild of divText
                divText.appendChild(divTextChild)
                divText.appendChild(spanTextChild)

            //appendChild of div Content
            divContent.appendChild(img)
            divContent.appendChild(divText)
            //price product
            let divPrice = document.createElement('div')
            divPrice.className = 'product-price'
            let h5_price = document.createElement('h5')
            h5_price.innerHTML = data[i].DONGIA + " VNĐ" // Price 
            divPrice.appendChild(h5_price)
            // appendChild divCard
            divCard.appendChild(divContent)
            divCard.appendChild(divPrice)
            //appendChild of dishesContainer
            dishesContainer.appendChild(divCard)
            dishesContainer.appendChild(document.createElement('br'))
        }
    })
}
// ----------------MAIN ----------------
window.setInterval(function(){
    if(checklogin(MACH) === false){
        location.href = '../../../page-login.html'
    } 
}, 1000);
if(MACH.substring(0,2) !== 'CH' || MACH === null){
    location.href = '../../../page-login.html'
}
else{
    displayBillInfo()
    displayOrderedItems()
}

