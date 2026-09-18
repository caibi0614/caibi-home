const broccoli = document.getElementById("broccoli");
const broccoliCard = document.getElementById("broccoli-card");
const broccoliClose = document.getElementById("broccoli-close");
const cardOverlay = document.getElementById("card-overlay");


// 點花椰菜 → 打開角色卡
broccoli.addEventListener("click", function () {

broccoliCard.classList.add("card-show");
    cardOverlay.style.display = "block";

});


// 點 × → 關閉角色卡
broccoliClose.addEventListener("click", function () {

    broccoliCard.classList.remove("card-show");
    cardOverlay.style.display = "none";

});


// 點黑色背景也可以關閉
cardOverlay.addEventListener("click", function () {

    broccoliCard.classList.remove("card-show");
    cardOverlay.style.display = "none";

});