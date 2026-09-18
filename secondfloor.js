// =========================
// 菜比之家・二樓房門系統
// =========================

const SUPABASE_URL = "https://cxoqymugkaqajxzqfvdi.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Hnu6s348Zu7mx5pqU68l4g_Wwfd1dcH";

const secondfloorSupabase = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// =========================
// 找到畫面元件
// =========================

const caiDoor = document.querySelector(".cai-door");
const bibiDoor = document.querySelector(".bibi-door");
const fanDoor = document.querySelector(".fan-door");

const fanRoomSign = document.getElementById("fan-room-sign");

const roomMessage = document.getElementById("room-message");
const roomMessageContent = document.getElementById("room-message-content");
const roomMessageClose = document.getElementById("room-message-close");

const logoutButton = document.getElementById("logout-button");
const currentUserStatus =
    document.getElementById("current-user-status");


// =========================
// 取得目前登入住戶
// =========================

async function getCurrentProfile() {

    const {
        data: { user },
        error: userError
    } = await secondfloorSupabase.auth.getUser();


    // 沒登入
    if (userError || !user) {
        return null;
    }


    // 找自己的住戶資料
    const {
        data: profile,
        error: profileError
    } = await secondfloorSupabase
        .from("profiles")
        .select("username, display_name, role")
        .eq("id", user.id)
        .single();


    if (profileError || !profile) {

        console.error("讀取 profile 失敗：", profileError);

        return null;
    }


    return profile;
}


// =========================
// 更新二樓登入狀態＋門牌
// =========================

async function updateSecondFloor() {

    const profile = await getCurrentProfile();


    // =========================
    // 未登入
    // =========================

    if (!profile) {

        fanRoomSign.textContent = "🏠 小可愛";

        if (currentUserStatus) {
            currentUserStatus.style.display = "none";
        }

        if (logoutButton) {
            logoutButton.style.display = "none";
        }

        return;
    }


    // =========================
    // 已登入
    // =========================

    if (currentUserStatus) {

        currentUserStatus.style.display = "block";

        currentUserStatus.textContent =
            `🔐 ${profile.display_name}`;
    }


    if (logoutButton) {
        logoutButton.style.display = "block";
    }


    // 小可愛登入 → 第三間門牌顯示自己的名字
    if (profile.role === "fan") {

        fanRoomSign.textContent =
            `🏠 ${profile.display_name}`;

        return;
    }


    // 菜菜 / 比比登入
    fanRoomSign.textContent = "🏠 小可愛";
}


// =========================
// 菜菜房
// =========================

caiDoor.addEventListener("click", async function () {

    const profile = await getCurrentProfile();


    // 菜菜本人
    if (profile && profile.role === "cai") {

        window.location.href = "cai-room.html";

        return;
    }


    // 其他人
    roomMessageContent.innerHTML =
        "<strong>不可以偷看啦 ＞＜ 🔒</strong>";

    roomMessage.style.display = "block";
});


// =========================
// 比比房
// =========================

bibiDoor.addEventListener("click", async function () {

    const profile = await getCurrentProfile();


    // 比比本人
    if (profile && profile.role === "bibi") {

        window.location.href = "bibi-room.html";

        return;
    }


    // 其他人
    roomMessageContent.innerHTML =
        "<strong>不可以偷看啦 ＞＜ 🔒</strong>";

    roomMessage.style.display = "block";
});


// =========================
// 小可愛房
// =========================

fanDoor.addEventListener("click", async function () {

    const profile = await getCurrentProfile();


    // 小可愛本人
    if (profile && profile.role === "fan") {

        window.location.href = "fan-room.html";

        return;
    }


    // 已登入，但是菜菜 / 比比
    if (profile) {

        roomMessageContent.innerHTML =
            "<strong>不可以偷看啦 ＞＜ 🔒</strong>";

        roomMessage.style.display = "block";

        return;
    }


    // =========================
    // 尚未登入
    // =========================

    roomMessageContent.innerHTML = `
        <h2>🏠 這間房間還沒有主人喔！</h2>

        <p>
            小可愛，你還沒有登入菜比帳號喔！(｡•́︿•̀｡)<br>
            已經有菜比帳號的話，可以先登入～<br>
            還沒有帳號，有問題可以找菜菜喔！
        </p>

        <a
            href="#"
            class="discord-link"
            target="_blank"
            rel="noopener noreferrer"
        >
            💬 找菜菜（Discord）
        </a>

        <a
            href="login.html"
            class="discord-link"
        >
            🔐 登入菜比帳號
        </a>
    `;

    roomMessage.style.display = "block";
});


// =========================
// 關閉提示
// =========================

roomMessageClose.addEventListener("click", function () {

    roomMessage.style.display = "none";

});


// =========================
// 登出菜比之家
// =========================

if (logoutButton) {

    logoutButton.addEventListener("click", async function () {

        const { error } =
            await secondfloorSupabase.auth.signOut();


        if (error) {

            console.error(error);

            alert("登出失敗啦 ＞＜");

            return;
        }


        alert("🚪 已經登出菜比之家囉～");

        window.location.href = "secondfloor.html";
    });

}


// =========================
// 頁面載入
// =========================

updateSecondFloor();