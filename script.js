const chicken = document.getElementById("chicken");
const chickenDialogue = document.getElementById("chicken-dialogue");

const cat = document.getElementById("cat");
const catDialogue = document.getElementById("cat-dialogue");

const loveHeart = document.getElementById("love-heart");
const meetDialogue = document.getElementById("meet-dialogue");


// 小菜雞對話
const chickenText = [
    "啾啾～我是小菜雞！🐥",
    "今天也要一起玩嗎？✨",
    "農場那邊好像有新東西喔🌱",
    "再點我要收飼料費了🤣"
];


// 小比乾對話
const catText = [
    "喵～我是小比乾 ฅ^•ﻌ•^ฅ",
    "今天想吃餅乾嗎？🍪",
    "烘焙坊好像有香味飄過來了～",
    "再摸我要收罐罐費了😼"
];


// 兩隻貼貼時的特殊對話
const meetText = [
    "今天也要一起顧家！🐥🐱",
    "啾！喵～今天也和平營業中✨",
    "小菜雞和小比乾貼貼成功❤️",
    "菜比之家今日感情良好🤣"
];


let chickenIndex = 0;
let catIndex = 0;

let chickenPaused = false;
let catPaused = false;


// ==========================
// 小菜雞點擊對話
// ==========================

chicken.addEventListener("click", function () {

    chickenPaused = true;

    chickenDialogue.style.display = "block";
    catDialogue.style.display = "none";

    chickenDialogue.textContent = chickenText[chickenIndex];

    chickenIndex++;

    if (chickenIndex >= chickenText.length) {
        chickenIndex = 0;
    }

});


// ==========================
// 小比乾點擊對話
// ==========================

cat.addEventListener("click", function () {

    catPaused = true;

    catDialogue.style.display = "block";
    chickenDialogue.style.display = "none";

    catDialogue.textContent = catText[catIndex];

    catIndex++;

    if (catIndex >= catText.length) {
        catIndex = 0;
    }

});


// ==========================
// 滑鼠離開後關閉對話
// ==========================

chicken.addEventListener("mouseleave", function () {

    chickenDialogue.style.display = "none";
    chickenPaused = false;

});

cat.addEventListener("mouseleave", function () {

    catDialogue.style.display = "none";
    catPaused = false;

});


// ==========================
// 隨機散步
// ==========================

function randomWalk(character, paused) {

    if (paused) {
        return;
    }

    const x = Math.floor(Math.random() * 80) - 40;
    const y = Math.floor(Math.random() * 20) - 10;

    character.style.translate = `${x}px ${y}px`;

}


// 小菜雞每 2.5 秒走一下
setInterval(function () {

    randomWalk(chicken, chickenPaused);

}, 2500);


// 小比乾每 3.2 秒走一下
setInterval(function () {

    randomWalk(cat, catPaused);

}, 3200);


// ==========================
// 小菜雞、小比乾貼貼
// ==========================

function meetEachOther() {

    // 有一隻正在跟玩家說話，就不貼貼
    if (chickenPaused || catPaused) {
        return;
    }

    // 暫停兩隻散步
    chickenPaused = true;
    catPaused = true;

    // 往彼此靠近
    chicken.style.translate = "60px 0px";
    cat.style.translate = "-60px 0px";

    // 隨機選一段貼貼對話
    const randomText =
        Math.floor(Math.random() * meetText.length);

    meetDialogue.textContent = meetText[randomText];

    // 顯示愛心＋貼貼對話
    loveHeart.style.display = "block";
    meetDialogue.style.display = "block";

    // 兩隻一起發光
    chicken.classList.add("meeting");
    cat.classList.add("meeting");


    // 停留 2 秒
    setTimeout(function () {

        // 收起愛心＋對話
        loveHeart.style.display = "none";
        meetDialogue.style.display = "none";

        // 關掉發光
        chicken.classList.remove("meeting");
        cat.classList.remove("meeting");

        // 回原本位置
        chicken.style.translate = "0px 0px";
        cat.style.translate = "0px 0px";

        // 等移動完成後再恢復散步
        setTimeout(function () {

            chickenPaused = false;
            catPaused = false;

        }, 800);

    }, 2000);

}


// ==========================
// 隨機決定什麼時候貼貼
// ==========================

function randomMeet() {

    // 隨機等待 10～20 秒
    const waitTime =
        Math.floor(Math.random() * 10000) + 10000;

    setTimeout(function () {

        // 50% 機率貼貼
        if (Math.random() < 0.5) {
            meetEachOther();
        }

        // 重新計算下一次時間
        randomMeet();

    }, waitTime);

}


// 啟動隨機貼貼
randomMeet();