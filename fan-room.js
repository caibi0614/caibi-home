// =========================
// 小可愛房・人物移動
// =========================

const roomScene =
    document.querySelector(".private-room-scene");

const playerCharacter =
    document.getElementById("player-character");


// 預設人物目前位置
playerCharacter.dataset.x = "50";


// =========================
// 點擊房間 → 人物移動
// =========================

roomScene.addEventListener("click", function (event) {

    const roomRect =
        roomScene.getBoundingClientRect();


    // 點擊位置換算成百分比
    const x =
        ((event.clientX - roomRect.left) / roomRect.width) * 100;

    const y =
        ((event.clientY - roomRect.top) / roomRect.height) * 100;


    // 暫時只允許走房間下半部
    // 避免人物直接走到床、書桌、窗戶上
    if (y < 45) {
        return;
    }


    // 記住人物原本位置
    const oldX =
        parseFloat(playerCharacter.dataset.x || "50");


    // =========================
    // 判斷左右方向
    // =========================

    if (x < oldX) {

        playerCharacter.style.transform =
            "translateX(-50%) scaleX(-1)";

    } else {

        playerCharacter.style.transform =
            "translateX(-50%) scaleX(1)";
    }


    // 記錄新位置
    playerCharacter.dataset.x = x;


    // =========================
    // 移動人物
    // =========================

    playerCharacter.style.left =
        `${x}%`;

    playerCharacter.style.bottom =
        `${100 - y}%`;
});