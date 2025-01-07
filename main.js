const time = document.getElementById("time");
const konular = document.getElementById("konular");
const baslatBtn = document.getElementById("baslat");
const settings = document.querySelector(".settings");
const timerCon = document.querySelector(".timer-con");
const ders = document.querySelector(".ders-name");
const sContainer = document.querySelector(".con");

const yanlisSes = new Audio();
yanlisSes.src = './assets/yanlis.mp3';
const dogruSes = new Audio();
dogruSes.src = "./assets/dogru.mp3";


let timeValue = time.value;
let konuValue = konular.value;

let soruNum = 0;
let dogru = 0;
dogru.toFixed(3);
let yanlis = 0;
yanlis.toFixed(3);


let sorular = [];
let diff = '';
baslatSonra();
time.onchange = function () {
    timeValue = time.value;
    timerCon.innerHTML = `<span class="timer">${timeValue}:00</span><i class="fa-solid fa-stopwatch"></i>`;

}
konular.onchange = function () {
    konuValue = konular.value;
    ders.innerHTML = konuValue;


}

baslatBtn.onclick = function () {
    settings.style.display = 'none';
    baslatBtn.style.display = 'none';
    addSoruForArray();
    timer()


}
function baslatSonra() {
    timer.innerHTML = timeValue + ':00';
    ders.innerHTML = konuValue;
}

function addSoruForArray() {
    fetch("./JSONS/tarih.json").then((res) => res.json()).then((data) => {
        for (soru in data.questions) {
            if (konuValue == data.questions[soru].topic) {
                sorular.push(data.questions[soru]);
            };

        }
        getSoruFromArray();

    })


}
function getSoruFromArray() {
    let totalSoru = sorular.length;


    if (soruNum == totalSoru) {
        bitiş();
    }
    else {
        if(sorular[soruNum].difficulty == "Zor"){
            diff = 'zor';
        }
        if(sorular[soruNum].difficulty == "Orta"){
            diff = 'orta';
        }
        if(sorular[soruNum].difficulty == "Kolay"){
            diff = 'kolay';
        }
        
        sContainer.innerHTML = `

        <span class="${diff}">${sorular[soruNum].difficulty}</span>
        <div class="soru-con">
        <span>${sorular[soruNum].question}</span>
        </div>
            <div class="answers">
                <div id="A" onclick="checkSoru(this.id)">A-) ${sorular[soruNum].options.A}</div>
                <div id="B" onclick="checkSoru(this.id)">B-) ${sorular[soruNum].options.B}</div>
                <div id="C" onclick="checkSoru(this.id)">C-) ${sorular[soruNum].options.C}</div>
                <div id="D" onclick="checkSoru(this.id)">D-) ${sorular[soruNum].options.D}</div>
                <div id="E" onclick="checkSoru(this.id)">E-) ${sorular[soruNum].options.E}</div>
            </div>
        `
    }
}

function checkSoru(id) {

    fetch("./JSONS/tarih.json").then((res) => res.json()).then((data) => {
        if (id == sorular[soruNum].correct_answer) {
            dogruSes.play();
            document.getElementById(id).style.backgroundColor = "#00ff00";
            dogru++;
        } else {
            yanlisSes.play();
            document.getElementById(id).style.backgroundColor = 'red';
            yanlis++;
        }
        document.getElementById("A").removeAttribute("onclick");
        document.getElementById("B").removeAttribute("onclick");
        document.getElementById("C").removeAttribute("onclick");
        document.getElementById("D").removeAttribute("onclick");
        document.getElementById("E").removeAttribute("onclick");
        soruNum++
        setTimeout(() => {
            getSoruFromArray();
        }, 1000)
    })
}

function bitiş() {
    let net = Math.abs(dogru - (yanlis / 4));
    sContainer.innerHTML = `<div>
                <span class="bilgilendirme">${sorular.length} Sorudan <span class="dogru">${dogru} Doğru</span>, <span class="yanlis">${yanlis} Yanlış</span></span>
                <span class="net">= ${net} Net</span>
                <span class="author"><a href="https://khalid-safi207.github.io/portfolio/" target="_blank">Halit SAFİ</a> tarafından kodlandı.</span>

            </div>`;

    setTimeout(() => {
        window.location.reload();
    }, 15000)
}


function timer() {
    let m = timeValue;
    let s = 0;

    setInterval(() => {
        if (m != -1) {
            s--;
        }
        if (s == -1) {
            m--;
            s = 59;
        }
        if (m == -1) {
            bitiş();
            timerCon.innerHTML = `<span class="timer">0:00</span><i class="fa-solid fa-stopwatch"></i>`;

        } else {
            timerCon.innerHTML = `<span class="timer">${m}:${s}</span><i class="fa-solid fa-stopwatch"></i>`;

        }
    }, 1000)

}
