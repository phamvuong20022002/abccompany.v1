let MADT = null
// ------------------------BASE_URL------------------------
let BASE_URL = readTextFile("../../../assets/data_local.txt")
let url_displayWidgets = BASE_URL + "/partner/generalinfo/"
let url_CustomerData = BASE_URL + "/partner/statiscalcustomerdata/"
let url_displayTable = BASE_URL + "/partner/restaurantrevenue/"
let url_BillData = BASE_URL + "/partner/statiscalbillsstatus/"

// animation
function animateCounter(obj, initVal, lastVal, duration) {
    let startTime = null;

    //get the current timestamp and assign it to the currentTime variable
    let currentTime = Date.now();

    //pass the current timestamp to the step function
    const step = (currentTime) => {

        //if the start time is null, assign the current time to startTime
        if (!startTime) {
            startTime = currentTime;
        }

        //calculate the value to be used in calculating the number to be displayed
        const progress = Math.min((currentTime - startTime) / duration, 1);

        //calculate what to be displayed using the value gotten above
        obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

        //checking to make sure the counter does not exceed the last value (lastVal)
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };
    //start animating
    window.requestAnimationFrame(step);
}
// trafic chart
function TrafficChartInit(labelData, NewCusData, RetCusData, FeedBCusData) {
    var ctx = document.getElementById("TrafficChart");
    ctx.height = 150;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelData,//["Jan", "Feb", "Mar", "Apr"],
            datasets: [
                {
                    label: "KH Mới",
                    borderColor: "rgba(65, 237, 142, 0.9)",
                    borderWidth: "2",
                    backgroundColor: "rgba(65, 237, 142, .5)",
                    data: NewCusData,//[0, 2900, 5000, 3300]
                },
                {
                    label: "KH Quay Lại",
                    borderColor: "rgba(255, 99, 71, 0.9)",
                    borderWidth: "2",
                    backgroundColor: "rgba(255, 99, 71,.5)",
                    pointHighlightStroke: "rgba(255, 99, 71,.5)",
                    data: RetCusData,//[0, 4200, 4500, 1600]
                },
                {
                    label: "KH Đánh Giá Tốt",
                    borderColor: "rgba(4, 73, 203,.09)",
                    borderWidth: "2",
                    backgroundColor: "rgba(4, 73, 203,.5)",
                    pointHighlightStroke: "rgba(40, 169, 46,.5)",
                    data: FeedBCusData, //[1000, 5200, 3600, 2600]
                }
            ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }

        }
    });
}
//doughnut chart
function DoughnutchartInit(dataInit) {
    var ctx = document.getElementById("doughutChart");
    ctx.height = 150;
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: dataInit,//[ 35, 40, 25 ],
                backgroundColor: [
                    "rgba(255, 99, 71,0.9)",
                    "rgba(0, 194, 146,0.7)",
                    "rgba(0,0,0,0.07)"
                ],
                hoverBackgroundColor: [
                    "rgba(255, 99, 71,0.9)",
                    "rgba(0, 194, 146,0.7)",
                    "rgba(0,0,0,0.07)"
                ]

            }],
            labels: [
                "ĐH Đã Huỷ",
                "ĐH Đã Giao Thành Công",
                "ĐH Khác",
            ]
        },
        options: {
            responsive: true
        }
    });
}
// Display Widgets
async function Display_Widgets() {
    await fetch(url_displayWidgets + MADT, {
        headers: {
            "auth-token": getCode1(),
            "role": "DT",
        }
    })
        .then((response) => {
            authenticatePrivateAPIChecking(response)
            return response.json()
        }).then((data) => {
            //storage avatar to local 
            let src_avatar = "https://www.kasandbox.org/programming-images/avatars/starky-seedling.png"
            if(data[0].AVATAR !== null){
                src_avatar = data[0].AVATAR
            }
            localStorage.setItem("AVATAR", src_avatar)
            // set corner avatar
            document.getElementsByClassName("user-avatar rounded-circle")[0].setAttribute("src",src_avatar)
            
            // partner-id
            document.getElementById('partner-id').innerHTML = MADT
            //num-res
            const num_res = document.getElementById('num-res')
            animateCounter(num_res, 0, data[0].SLCH, 1000);
            //num-dish
            const num_dish = document.getElementById('num-dish')
            animateCounter(num_dish, 0, data[0].SLMON, 1000);
            //time-contract
            if (data[0].THHD <= 0) {
                const a = document.createElement('a')
                a.href = "#"
                a.innerHTML = "Đã Hết Hạn"
                document.getElementById('time-contract').appendChild(a)
            }
            else if (data[0].THHD < 30) {
                const a = document.createElement('a')
                a.href = "#"
                a.innerHTML = "Sắp Hết Hạn"
                document.getElementById('time-contract').appendChild(a)
            }
            else {
                const time_contract = document.getElementById('time-contract')
                time_contract.setAttribute('class', 'stat-digit')
                animateCounter(time_contract, 0, data[0].THHD, 1000);
            }
        })
}
function progress(ProcessData) {
    document.getElementById("pct-newcus").style.width = (ProcessData[0].toString() + "%")
    document.getElementById("txt-newcus").innerHTML = ProcessData[3].toString() + " Khách Hàng Mới   (" + (ProcessData[0].toString() + "%)")

    document.getElementById("pct-retcus").style.width = (ProcessData[1].toString() + "%")
    document.getElementById("txt-retcus").innerHTML = ProcessData[4].toString() + " Khách Hàng Quay Lại   (" + (ProcessData[1].toString() + "%)")

    document.getElementById("pct-goodfeedbcus").style.width = (ProcessData[2].toString() + "%")
    document.getElementById("txt-goodfeedbcus").innerHTML = ProcessData[5].toString() + " Khách Hàng Đánh Giá Từ 4-5/5   (" + (ProcessData[2].toString() + "%)")

}
function listenMouse(className, dataCreate) {
    let target = null
    let isMouseHover = false
    className.addEventListener("mouseover", function (event) {
        isMouseHover = true
        showDetailProgressBox(dataCreate, target, isMouseHover)
    }, false);
    className.addEventListener("mouseleave", function (event) {
        isMouseHover = false
        target = event.target.className
        showDetailProgressBox(dataCreate, target, isMouseHover);
    }, false);
}
function addListeningMouseToProgress(DetailProgressData) {
    //add onmouseover
    let progress = document.getElementsByClassName("progress-box")
    listenMouse(progress[0], DetailProgressData)
    listenMouse(progress[1], DetailProgressData)
    listenMouse(progress[2], DetailProgressData)
}
function showDetailProgressBox(DetailProgressData, className, isMouseHover) {

    if (className === "progress-box progress-1") {
        let detail_progress = document.getElementById("detail-progress-new-cus")
        if (isMouseHover) {
            detail_progress.removeAttribute("hidden")
            createDetailProgressBox(DetailProgressData,detail_progress,"badge badge-success pull-right")
        }
        else {
            detail_progress.setAttribute("hidden", "")
        }
    }
    else if (className === "progress-box progress-2") {
        let detail_progress = document.getElementById("detail-progress-return-cus")
        if (isMouseHover) {
            detail_progress.removeAttribute("hidden")
            createDetailProgressBox(DetailProgressData,detail_progress,"badge badge-warning pull-right")
        }
        else {
            detail_progress.setAttribute("hidden", "")
        }
    } else if (className === "progress-box progress-3") {
        let detail_progress = document.getElementById("detail-progress-good-feedb")
        if (isMouseHover) {
            detail_progress.removeAttribute("hidden")
            createDetailProgressBox(DetailProgressData,detail_progress,"badge badge-primary pull-right")
        }
        else {
            detail_progress.setAttribute("hidden", "")
        }
    }
}

function createDetailProgressBox(DetailProgressData, idProgress ,itemClassName) {
    let section = idProgress.querySelectorAll("section")[0]

    let oldUl = section.querySelectorAll("ul")
    if(oldUl.length > 0) {
        section.removeChild(oldUl[0])
    }

    let ul = document.createElement("ul")
    ul.className = "list-group list-group-flush"

    if(itemClassName === "badge badge-success pull-right") {
        for(let i = 0; i < DetailProgressData.length; i++) {
            let li = document.createElement("li")
            li.className = "list-group-item"
            li.innerHTML = "Năm " + DetailProgressData[i].NAM

            let span = document.createElement("span")
            span.className = itemClassName
            span.innerHTML = "SLKHMOI: " + DetailProgressData[i].SLKHMOI
            
            li.appendChild(span)
            ul.appendChild(li)
        }
        section.appendChild(ul)
    }
    else if(itemClassName === "badge badge-warning pull-right"){
        for(let i = 0; i < DetailProgressData.length; i++) {
            let li = document.createElement("li")
            li.className = "list-group-item"
            li.innerHTML = "Năm " + DetailProgressData[i].NAM

            let span = document.createElement("span")
            span.className = itemClassName
            span.innerHTML = "SLKHQL: " + DetailProgressData[i].SLKHQL
            
            li.appendChild(span)
            ul.appendChild(li)
        }
        section.appendChild(ul)
    }
    else if(itemClassName === "badge badge-primary pull-right"){
        for(let i = 0; i < DetailProgressData.length; i++) {
            let li = document.createElement("li")
            li.className = "list-group-item"
            li.innerHTML = "Năm " + DetailProgressData[i].NAM

            let span = document.createElement("span")
            span.className = itemClassName
            span.innerHTML = "SLDONTOT: " + DetailProgressData[i].SLDONTOT
            
            li.appendChild(span)
            ul.appendChild(li)
        }
        section.appendChild(ul)
    }
}

async function trafficChartData() {
    const spinner = document.getElementById("spinner"); //loader
    spinner.removeAttribute('hidden'); //loader
    const dataReq = {
        "madt": MADT,
        "sonam": 5
    }

    await fetch(url_CustomerData + "id=" + dataReq.madt + "&sonam=" + dataReq.sonam, {
        method: "GET",
        headers: {
            "auth-token": getCode1(),
            "role": "DT",
        },
    }).then((response) => {
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((data) => {
        spinner.setAttribute('hidden', ''); //loader
        //Show detail progress
        addListeningMouseToProgress(data);
        //Show Process
        let labelData = []
        let NewCusData = []
        let RetCusData = []
        let FeedBCusData = []
        for (let i = 0; i < data.length; i++) {
            labelData.push(data[i].NAM)
            NewCusData.push(data[i].SLKHMOI)
            RetCusData.push(data[i].SLKHQL)
            FeedBCusData.push(data[i].SLDONTOT)
        }
        TrafficChartInit(labelData, NewCusData, RetCusData, FeedBCusData)
        let numofCus = (NewCusData.reduce((a, b) => a + b, 0) + RetCusData.reduce((a, b) => a + b, 0))
        let NewCusRate = (NewCusData.reduce((a, b) => a + b, 0) / numofCus) * 100
        let RetCusRate = (RetCusData.reduce((a, b) => a + b, 0) / numofCus) * 100
        let GoodFeedBCusRate = (FeedBCusData.reduce((a, b) => a + b, 0) / numofCus) * 100
        return [NewCusRate.toFixed(2), RetCusRate.toFixed(2), GoodFeedBCusRate.toFixed(2),
        NewCusData.reduce((a, b) => a + b, 0),
        RetCusData.reduce((a, b) => a + b, 0),
        FeedBCusData.reduce((a, b) => a + b, 0)]
    }).then((ProcessData) => {
        // console.log(ProcessData)

        progress(ProcessData)
    })
}
async function doughnutchartData() {
    const dataReq = {
        "madt": MADT,
        "sonam": 5
    }

    await fetch(url_BillData + "id=" + dataReq.madt + "&sonam=" + dataReq.sonam, {
        method: "GET",
        headers: {
            "auth-token": getCode1(),
            "role": "DT",
        },
    }).then((response) => {
        authenticatePrivateAPIChecking(response)
        return response.json()
    }).then((data) => {
        // console.log(data) 
        let numofBills = data[0].SLDHHUY + data[0].SLDHGIAOTHANHCONG + data[0].SLDHKHAC
        let canceledBills = (data[0].SLDHHUY / numofBills) * 100
        let successedBills = (data[0].SLDHGIAOTHANHCONG / numofBills) * 100
        let anotherBills = (data[0].SLDHKHAC / numofBills) * 100
        return [canceledBills.toFixed(2), successedBills.toFixed(2), anotherBills.toFixed(2)]
    }).then((dataInit) => {
        DoughnutchartInit(dataInit)
    })

}
//DISPLAY TABLE
async function Table_Display() {
    const spinner = document.getElementById("spinner"); //loader
    spinner.removeAttribute('hidden');//loader

    const dataReq = {
        "madt": MADT,
        "sonam": 1,
        "sohang": 3
    }

    //display table
    await fetch(url_displayTable + "id=" + dataReq.madt + "&sonam=" + dataReq.sonam + "&sohang=" + dataReq.sohang, {
        method: "GET",
        headers: {
            "auth-token": getCode1(),
            "role": "DT",
        },
    }).then((response) => {
        authenticatePrivateAPIChecking(response);
        return response.json()
    }).then((data) => {
        spinner.setAttribute('hidden', ''); //loader
        // console.log("data:",data)
        const tableBody = document.getElementById("tablebody")
        for (let i = 0; i < data.length; i++) {
            const tr = document.createElement("tr")

            let no_ = i + 1
            let oneData = data[i]
            // no
            const tdnum = document.createElement("td")
            tdnum.setAttribute("class", "serial")
            tdnum.innerHTML = no_.toString() + '.'
            tr.appendChild(tdnum)

            // avatar
            const tdava = document.createElement("td")
            tdava.setAttribute("class", "avatar")
            const div = document.createElement("div")
            div.setAttribute("class", "round-img")
            const a = document.createElement("a")
            a.setAttribute("href", "#")
            a.onclick = () => {
                // localStorage.setItem("oneStaffCode",oneStaff.MANV)
                // localStorage.setItem("type_detailStaff","VIEW")
            }
            const img = document.createElement("img")
            img.setAttribute("class", "rounded-circle")
            img.setAttribute("src", "../images/avatar/" + (no_ % 5 + 1).toString() + ".jpg")
            a.appendChild(img)
            div.appendChild(a)
            tdava.appendChild(div)
            tr.appendChild(tdava)

            // information of Restaurant 
            const keys = Object.keys(oneData)
            for (let i = 0; i < keys.length; i++) {
                const td = document.createElement("td")
                if (i === 3) {
                    const span = document.createElement("span")
                    span.setAttribute("id", oneData.MACUAHANG)
                    span.innerHTML = oneData[keys[i]]
                    td.appendChild(span)
                }
                else if (i === keys.length - 1) {
                    const span = document.createElement("span")
                    if (oneData[keys[i]] === 0) {
                        span.setAttribute("class", "badge badge-pending")
                        span.innerHTML = "Không Hoạt Động"
                    }
                    else if (oneData[keys[i]] === 1) {
                        span.setAttribute("class", "badge badge-complete")
                        span.innerHTML = "Hoạt Động"
                    }
                    else {
                        span.setAttribute("class", "badge badge-primary")
                        span.innerHTML = "Tạm Ngưng"
                    }
                    td.appendChild(span)
                }
                else {
                    td.innerHTML = oneData[keys[i]]
                }
                tr.appendChild(td)
            }
            tableBody.appendChild(tr)
        }
        for (let i = 0; i < data.length; i++) {
            const id = document.getElementById(data[i].MACUAHANG)
            animateCounter(id, 0, data[i].DOANHTHU, 1000)
        }
    })
}
// ---------- MAIN ------------
if (checkAuthentication()) {
    MADT = localStorage.getItem("ACCCODE") // MADT
    Display_Widgets()
    trafficChartData()
    Table_Display()
    doughnutchartData()
}
else {
    localStorage.clear()
    location.href = '../page-login.html'
}
