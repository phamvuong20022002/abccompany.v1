// const { data } = require("@tensorflow/tfjs-node");

// ------------Data input-------
let MACH = null
let BASE_URL = readTextFile("../../../assets/data_local.txt")
let url_displayWidgets = BASE_URL + "/restaurant/generalinfo/"
let url_displayTable = BASE_URL + "/restaurant/getwaitingbill/"
let url_updateBillStatus = BASE_URL + "/restaurant/updatebillstatus" 
let dataWaitingBills = ((JSON.parse(localStorage.getItem('dataWaitingBillsLocal'))) === null ) ? [] : JSON.parse(localStorage.getItem('dataWaitingBillsLocal')); 
let numOfBills

//My Profile
function myProfile(){
    localStorage.setItem("oneRestaurant",localStorage.getItem("ACCCODE"))
    localStorage.setItem("type_detail", "EDIT")
    location.href = "./detail/restaurant"
}


//Display Widgets
async function DisplayWidget(){
    const spinner = document.getElementById("spinner"); //loader
    spinner.removeAttribute('hidden'); //loader
    await fetch(url_displayWidgets + MACH, {
        headers: {
            'auth-token':getCode1(),
        }
    })
    .then((response) =>{
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((result) =>{
        console.log(result[0]);

        //storage avatar to local 
        let src_avatar = "https://www.kasandbox.org/programming-images/avatars/starky-seedling.png"
        if(result[0].AVATAR !== null){
            src_avatar = result[0].AVATAR
        }
        localStorage.setItem("AVATAR", src_avatar)
        // set corner avatar
        document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",src_avatar)

        spinner.setAttribute('hidden', ''); //loader
        document.getElementById('widget-resCode').innerHTML = result[0].MACUAHANG
        document.getElementById('widget-time').innerHTML = result[0].GIOMOCUA + " - " +  result[0].GIODONGCUA
        if(result[0].TINHTRANG === 'HĐ'){
            document.getElementById('widget-status').innerHTML =  'Hoạt Động'
        }
        else if (result[0].TINHTRANG === 'TN'){
            document.getElementById('widget-status').innerHTML = 'Tạm Ngưng Kinh Doanh'
        }else{
            document.getElementById('widget-status').innerHTML = 'Không Hoạt Động'
        }
        
        document.getElementById('widget-countBill').innerHTML = result[0].SODONCHO + " Đơn"
        numOfBills = result[0].SODONCHO
    })
}

function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }

    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}
// pagination for table
function pagination(){
    $(function () {
        var numberOfItems = $("#table-body .table-row").length;
        var limitPerPage = 8; //How many card items visible per a page
        var totalPages = Math.ceil(numberOfItems / limitPerPage);
        var paginationSize = 7; //How many page elements visible in the pagination
        var currentPage;

        function showPage(whichPage) {
            if (whichPage < 1 || whichPage > totalPages) return false;

            currentPage = whichPage;

            $("#table-body .table-row").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

            $(".p-pagination li").slice(1, -1).remove();

            getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                $("<li>").addClass("p-page-item").addClass(item ? "p-current-page" : "p-dots")
                    .toggleClass("p-active", item === currentPage).append($("<a>")
                        .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".p-next-page");
            });

            $(".p-previous-page").toggleClass("p-disable", currentPage === 1);
            $(".p-next-page").toggleClass("p-disable", currentPage === totalPages);
            return true;
        }

        $(".p-pagination").append(
            $("<li>").addClass("p-page-item").addClass("p-previous-page").append($("<a>").attr({ href: "javascript:void(0)" }).text("Prev")),
            $("<li>").addClass("p-page-item").addClass("p-next-page").append($("<a>").attr({ href: "javascript:void(0)" }).text("Next"))
        );

        $("#table-body").show();
        showPage(1);

        $(document).on("click", ".p-pagination li.p-current-page:not(.p-active)", function () {
            return showPage(+$(this).text());
        });

        $(".p-next-page").on("click", function () {
            return showPage(currentPage + 1);
        });

        $(".p-previous-page").on("click", function () {
            return showPage(currentPage - 1);
        });
    });
}
//remove bill from waiting box when remove icon is clicked
function removeBillWaiting(currentRow, id_bill) {
    //remove chosen bill
    
    // currentRow.target.closest("tr").remove()
    currentRow.target.closest("tr").style.opacity = '0';
    window.setTimeout(
        function removethis()
        {
            currentRow.target.closest("tr").remove()
        }, 300);
        
    //remove spacer
    let spacer = document.getElementsByClassName(id_bill)
    spacer[0].remove()
    //pagination after removing
    pagination()

    // console.log("xoá ", id_bill)
}
// detail bill
function toBillDetail() {
    let currentRow = window.event
    let elem
    if (currentRow === undefined) {
        return
    }
    else {
        elem = currentRow.target
    }
    let id_bill = elem.closest("tr").getElementsByClassName("bill-detail")[0].innerText;
    //if check box is checked then return 
    let checkbox = elem.closest("tr").getElementsByClassName("check-id-bill")[0]
    if (checkbox.checked) {
        return
    }
    // if click on checkbox, div tag then return 
    if (elem.tagName === "INPUT" || elem.tagName === "DIV") {
        return
    }
    // when clicking on remove icon, remove this tag and pagination again
    else if (elem.tagName === "I") {
        removeBillWaiting(currentRow, id_bill)
    }
    else {
        localStorage.setItem('oneBillCode',id_bill)
        // console.log("chuyển trang ", id_bill);
        window.open("./detail/bill") 
    }
}
//css checked or unchecked on row in table
function cssRowsBilltable(){
    $(function() {
        $('.js-check-all').on('click', function() {
      
          if ( $(this).prop('checked') ) {
            $('th input[type="checkbox"]').each(function() {
              $(this).prop('checked', true);
              $(this).closest('tr').addClass('active');
            })
          } else {
            $('th input[type="checkbox"]').each(function() {
              $(this).prop('checked', false);
              $(this).closest('tr').removeClass('active');
            })
          }
      
        });
      
        $('th[scope="row"] input[type="checkbox"]').on('click', function() {
          if ( $(this).closest('tr').hasClass('active') ) {
            $(this).closest('tr').removeClass('active');
          } else {
            $(this).closest('tr').addClass('active');
          }
        });
      });
}
//get bill ID when check and pass to dataWaitingBills array
function getIDWhenChecked(numOfBills){
    if(dataWaitingBills.length > 0){
        waitingBill(numOfBills)
        // console.log(dataWaitingBills)
        let input = document.getElementsByClassName('check-id-bill')
        for(let i = 0; i< dataWaitingBills.length; i++){
            for(let z = 0; z < input.length; z++){
                if(dataWaitingBills[i] === input[z].value){
                    // console.log(input[z])
                    input[z].checked = true
                    // console.log(input[z].closest('tr'))
                    input[z].closest('tr').classList.add("active");    
                }
            }
        }
    }
    $('[id="checkbox_id"]').click(function () {
        if (this.value === '0') {
            const check_id_bill = document.getElementsByClassName('check-id-bill')
            for (let i = 0; i < check_id_bill.length; i++) {
                dataWaitingBills.push(check_id_bill[i].value);
            }
            dataWaitingBills = [...new Set(dataWaitingBills)];
            this.value = '-1'
        }
        else if (this.value === '-1') {
            dataWaitingBills = []
            this.value = '0'
        }
        else if (dataWaitingBills.includes(this.value)) {
            dataWaitingBills = dataWaitingBills.filter(item => item !== this.value)
        }
        else {
            dataWaitingBills.push(this.value)
        }
        // console.log(dataWaitingBills)
        //display checked bill in waiting bill box
        localStorage.setItem('dataWaitingBillsLocal',JSON.stringify(dataWaitingBills))
        waitingBill(numOfBills)
    })
}
//Display table
async function DisplayTable() {
    const spinner = document.getElementById("spinner table"); //loader
    spinner.removeAttribute('hidden'); //loader
    await fetch(url_displayTable + MACH,{
        headers:{
            'auth-token': getCode1(),
        }
    })
    .then((response) =>{
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((listWaitingBills) =>{
        for (let countBill = 0; countBill < listWaitingBills.length; countBill++) {
            // let oneData = {
            //     "MADH": "DH0",
            //     "SLMON": 5,
            //     "NGAYDAT": "12/12/2023",
            //     "THOIGIANDADAT": 1,
            //     "SDT": "0919489085",
            //     "EMAIL": "phamvuong@gmail.com",
            //     "DIACHI": "123 Trần Xuân Soạn, Quận 7"
            // }
            let oneData = listWaitingBills[countBill]
            let table_body = document.getElementById("table-body")
            // tr
            let tr = document.createElement("tr")
            tr.scope = "row"
            tr.className = "table-row"
            tr.onclick = function () { toBillDetail() }
            //th checkbox
            let th = document.createElement("th")
            th.scope = "row"
            let label = document.createElement("label")
            label.className = "control control--checkbox"
            let input = document.createElement("input")
            input.className = "check-id-bill"
            input.id = "checkbox_id"
            input.value = oneData.MADH
            input.type = "checkbox"
            
            // input.onclick = function(){ waitingBill() }
            let div = document.createElement("div")
            div.className = "control__indicator"
    
            label.appendChild(input)
            label.appendChild(div)
            th.appendChild(label)
            tr.appendChild(th)
            //td 
            let keys = Object.keys(oneData)
            for (let i = 0; i < keys.length; i++) {
                let td = document.createElement("td")
                if (i === 0) {
                    td.className = "bill-detail"
                    td.innerHTML = oneData[keys[i]]
                    tr.appendChild(td)
                }
                else if (i === 2) {
                    let small = document.createElement("small")
                    small.className = "d-block"
                    if (oneData[keys[i]] === 0) {
                        small.innerHTML = "Hôm nay"
                    }
                    else {
                        small.innerHTML = "Cách đây " + oneData[keys[i + 1]].toString() + " ngày"
                    }
                    td.innerHTML = oneData[keys[i]]
                    td.appendChild(small)
                    tr.appendChild(td)
                    i++
                }
                else if (i === 4) {
                    td.innerHTML = oneData[keys[i]] + " / " + oneData[keys[i + 1]]
                    let small = document.createElement("small")
                    small.className = "d-block"
                    small.innerHTML = "Số điện thoại / Email của Khách hàng"
                    td.appendChild(small)
                    tr.appendChild(td)
                    i++
                }
                else {
                    td.innerHTML = oneData[keys[i]]
                    tr.appendChild(td)
                }
            }
            // delete button
            let td = document.createElement("td")
            let a = document.createElement("a")
            a.href = "javascript:void(0)"
            a.className = "text-danger"
            a.setAttribute("data-mdb-toggle", "tooltip")
            a.title = "Delete Bill"
            a.onclick = function(){
                updateBillStatus(oneData.MADH,"TEST_2")
            }
            let i = document.createElement("i")
            i.className = "fa fa-trash-o"
    
            a.appendChild(i)
            td.appendChild(a)
            tr.appendChild(td)
    
            table_body.appendChild(tr)
            //spacer
            let tr_spacer = document.createElement("tr")
            tr_spacer.className = "spacer table-row" + " " + oneData.MADH
            let td_spacer = document.createElement("td")
            td_spacer.colspan = "100"
            tr_spacer.appendChild(td_spacer)
    
            table_body.appendChild(tr_spacer)
        }
        return listWaitingBills.length // retutn number of bills
    }).then((numOfBills) =>{
        // css active or inactive for rows
        cssRowsBilltable()
        // get bill id when tick a checkbox
        getIDWhenChecked(numOfBills)
        // pagination after creating table
        pagination()
        spinner.setAttribute('hidden', ''); //loader
    })
}
//update waiting bill
function waitingBill(numOfBills) {
    // console.log("from waiting bill", dataWaitingBills)
    let row = document.getElementById("waiting-bill")
    let oldCard = row.getElementsByClassName("col-lg-3 col-md-6 animation__flyBottom")
    let oldJumbotron = row.getElementsByClassName("jumbotron")
    
    //remove old cards
    for (let countOldCard = oldCard.length - 1; countOldCard >= 0; countOldCard--) {
        oldCard[countOldCard].remove()
    }
    //remove old Jumbotron
    if (oldJumbotron.length > 0) {
        oldJumbotron[0].remove()
    }

    // too many cards are chosen
    if (dataWaitingBills.length > 12) {
        let div_annotation = document.createElement("div")
        div_annotation.className = "h5 jumbotron col-lg-12 text-center font-weight-bold alert-primary animation__flyBottom"
        // maximum display bills (12 widget on waiting bills box)
        if(dataWaitingBills.length === numOfBills ){
            div_annotation.innerHTML = "Tất Cả Đơn Hàng Đã Chuyển Sang Trạng Thái Đang Thực Hiện"
        }
        else{
            div_annotation.innerHTML = (dataWaitingBills.length).toString() + " Đơn Hàng Đã Chuyển Sang Trạng Thái Đang Thực Hiện"
        }
        // div_annotation.innerHTML = "Tất Cả Đơn Hàng Đã Chuyển Sang Trạng Thái Đang Thực Hiện"
        let strong = document.createElement("strong")
        strong.innerHTML = " Đang Thực Hiện"
        strong.className = "text-uppercase"
        div_annotation.appendChild(strong)
        row.appendChild(div_annotation)
        return
    }

    // row.load(window.location.href + " #waiting-bill" );
    // $("#waiting-bill").load(" #waiting-bill > *");
    for (let count = 0; count < dataWaitingBills.length; count++) {
        let div_lg_md = document.createElement("div")
        div_lg_md.className = "col-lg-3 col-md-6 animation__flyBottom"
        let card = document.createElement("div")
        card.className = "card"
        let card_body = document.createElement("div")
        card_body.className = "card-body alert-primary"
        //content of card
        //remove waiting widget (x)
        let remove_button = document.createElement("div")
        remove_button.className = "h4 text-right mb-0"
        a = document.createElement("a")
        a.href = "javascript:void(0)"
        a.className = "text-dark"
        a.onclick = function () {
            // get card that contain this bill
            this.closest('.animation__flyBottom').remove()
            //get billID of this bill
            let UncheckedBillId = this.closest('.animation__flyBottom').getElementsByClassName("font-weight-bold d-block")[0].innerText
            //get list input check box
            let checkbox = document.getElementsByClassName("check-id-bill")
            let UncheckedInput
            //check box have billID = UncheckedBillId
            for(let z = 0; z < checkbox.length; z++){
                if(checkbox[z].value === UncheckedBillId){
                    UncheckedInput = checkbox[z]
                }
            }
            //unchecked
            UncheckedInput.checked = false
            // inactive row 
            UncheckedInput.closest('tr').className = "table-row"
            //remove billID in waiting bill list
            dataWaitingBills = dataWaitingBills.filter(item => item !== UncheckedBillId)
            localStorage.setItem('dataWaitingBillsLocal', JSON.stringify(dataWaitingBills))
        }
        let i = document.createElement("i")
        i.className = "fa fa-times"

        a.appendChild(i)
        remove_button.appendChild(a)
        card_body.appendChild(remove_button)
        // text content
        let div_text = document.createElement("div")
        div_text.className = "h5 mb-0"
        let small_t1 = document.createElement("small")
        small_t1.className = "font-weight-bold d-block"
        small_t1.innerHTML = dataWaitingBills[count]

        div_text.appendChild(small_t1)
        card_body.appendChild(div_text)
        //small text
        let small_t2 = document.createElement("small")
        small_t2.className = "text-muted text-uppercase font-weight-bold d-block"
        small_t2.innerHTML = "Mã đơn hàng"

        card_body.appendChild(small_t2)

        card.appendChild(card_body)
        div_lg_md.appendChild(card)
        row.appendChild(div_lg_md)
    }
}

function updateBillStatusToWaitingShipping(event) {
    event.preventDefault();
    if (dataWaitingBills.length === 0) {
        Swal.fire(
            'Lỗi Cập Nhật Trạng Thái!',
            'Không Có Đơn Hàng Nào Được Chọn!',
            'error'
        )
    } 
    else {
        let selectBox = document.querySelector("select")
        let selectedValue = selectBox.options[selectBox.selectedIndex].value
        // console.log(selectedValue)
        if (selectedValue === "status_1") {
            Swal.fire({
                title: 'Bạn có chắc chắn muốn cập nhật trạng thái đơn hàng sang CHỜ VẬN CHUYỂN?',
                showCancelButton: true,
                confirmButtonText: 'Cập Nhật',
                showLoaderOnConfirm: true,
                preConfirm: async() =>{
                    let resultUpdate = [] 
                    for(let i = dataWaitingBills.length - 1; i >= 0 ; i--){
                        let status = "TEST"
                        let keys = await updateBillStatus(dataWaitingBills[i],status)
                        if (keys === "RESULT") {
                            //remove checked rows
                            let input_tabs = document.getElementsByClassName("check-id-bill")
                            for(let inputCount = input_tabs.length - 1;inputCount >= 0; inputCount--) {
                                if(input_tabs[inputCount].value === dataWaitingBills[i]){
                                    (input_tabs[inputCount].closest("tr")).remove()
                                    //remove spacer
                                    let spacer = document.getElementsByClassName(dataWaitingBills[i])
                                    spacer[0].remove()
                                    //pagination again
                                    pagination()
                                }
                            }
                            //updated result list
                            resultUpdate.push(keys[0])
                            //remove waiting bill id after updating
                            dataWaitingBills = dataWaitingBills.filter(item => item !== dataWaitingBills[i])
                        }
                        !Swal.isLoading()
                    }
                    localStorage.setItem('dataWaitingBillsLocal',JSON.stringify(dataWaitingBills))
                    return resultUpdate.length
                }  
            }).then((result) => {
                if (result.dismiss !== 'cancel') {
                    //get chosen bills
                    // console.log("log from updatebills",result.value)
                    Swal.fire({
                        title: (result.value).toString() + " Đơn Hàng Đã Cập Nhật Sang Trạng Thái CHỜ VẬN CHUYỂN", 
                        icon: 'success',
                    }).then(() =>{
                        //update array waiting bills
                        dataWaitingBills = []
                        //update waiting bills box
                        waitingBill(numOfBills)
                        // location.reload()
                        
                    })  
                }
            })
        }
        else if (selectedValue === "status_2"){
            Swal.fire({
                title: 'Bạn có chắc chắn muốn HUỶ đơn hàng?',
                showCancelButton: true,
                confirmButtonText: 'Cập Nhật',
                showLoaderOnConfirm: true,
                preConfirm: async() =>{
                    let resultUpdate = [] 
                    for(let i = dataWaitingBills.length - 1; i >= 0 ; i--){
                        let status = "TEST_2"
                        let keys = await updateBillStatus(dataWaitingBills[i],status)
                        if (keys === "RESULT") {
                            //remove checked rows
                            let input_tabs = document.getElementsByClassName("check-id-bill")
                            for(let inputCount = input_tabs.length - 1;inputCount >= 0; inputCount--) {
                                if(input_tabs[inputCount].value === dataWaitingBills[i]){
                                    (input_tabs[inputCount].closest("tr")).remove()
                                    //remove spacer
                                    let spacer = document.getElementsByClassName(dataWaitingBills[i])
                                    spacer[0].remove()
                                    //pagination again
                                    pagination()
                                }
                            }
                            //updated result list
                            resultUpdate.push(keys[0])
                            //remove waiting bill id after updating
                            dataWaitingBills = dataWaitingBills.filter(item => item !== dataWaitingBills[i])
                        }
                        !Swal.isLoading()
                    }
                    localStorage.setItem('dataWaitingBillsLocal',JSON.stringify(dataWaitingBills))
                    return resultUpdate.length
                }  
            }).then((result) => {
                if (result.dismiss !== 'cancel') {
                    //get chosen bills
                    // console.log("log from updatebills",result.value)
                    Swal.fire({
                        title: (result.value).toString() + " Đơn Hàng Đã Cập Nhật Sang Trạng Thái ĐÃ HUỶ", 
                        icon: 'success',
                    }).then(() =>{
                        //update array waiting bills
                        dataWaitingBills = []
                        //update waiting bills box
                        waitingBill(numOfBills)
                        // location.reload()
                        
                    })  
                }
            })
        }
        else{
            //uncheck and inactive rows in Waiting bills table
            document.getElementsByClassName('js-check-all')[0].checked = false
            let checkbox = document.getElementsByClassName("check-id-bill")
            for(let z = 0; z < checkbox.length; z++){
                //unchecked
                checkbox[z].checked = false
                // inactive row 
                checkbox[z].closest('tr').className = "table-row"
            }
            //set dataWaitingBills is empty array
            dataWaitingBills = []
            localStorage.setItem('dataWaitingBillsLocal', JSON.stringify(dataWaitingBills))
            waitingBill(numOfBills)
            //reload waiting bills table
            $( "#mytable" ).load( "index.html #mytable" );
            DisplayTable()  
            // location.reload()
            
        }
    }
}


//update waiting bills status
async function updateBillStatus(madh,status){
    let dataUpdate = {
        "mach" : MACH,
        "madh": madh,
        "tinhtrang": status
    }
    return await fetch(url_updateBillStatus, {
        method: "POST",
        body: JSON.stringify(dataUpdate),
        headers: {
            "Content-Type": "application/json",
            "auth-token": getCode1(),
            "role": "CH"
        },
    }).then((response) =>{
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((result) =>{
        //return result
        let keys = Object.keys(result[0])
        return keys[0] 
    }).then((value_result) =>{
        if(value_result !== "ERROR"){
            //update widgets
            DisplayWidget()
        }   
        return value_result
    })
}
// -----------------MAIN ----------------
if(checkAuthentication()){
    MACH = localStorage.getItem("ACCCODE") // MACH
    DisplayWidget()
    DisplayTable()
}
else
{   
    location.href = '../page-login.html'
}


