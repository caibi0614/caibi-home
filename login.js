// =========================
// 菜比之家・登入系統
// =========================

const SUPABASE_URL = "https://cxoqymugkaqajxzqfvdi.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Hnu6s348Zu7mx5pqU68l4g_Wwfd1dcH";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


const loginButton = document.getElementById("login-button");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");


// =========================
// 按下登入
// =========================

loginButton.addEventListener("click", async function () {

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        alert("帳號和密碼都要填喔 ＞＜");
        return;
    }


    // =========================
    // 把菜比帳號轉成 Supabase Email
    // =========================

    let email;

    // 菜菜保留原本的 Email
    if (username.toLowerCase() === "cai") {
        email = "e0962056600@gmail.com";
    }

    // 其他帳號都使用菜比之家假 Email
    else {
        email = `${username.toLowerCase()}@caibihome.local`;
    }


    // =========================
    // Supabase 登入
    // =========================

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });


    if (error) {

        console.error(error);

        alert(
            "登入失敗啦 ＞＜\n" +
            "請檢查帳號或密碼！"
        );

        return;
    }


    const user = data.user;


    // =========================
    // 讀取自己的住戶資料
    // =========================

    const {
        data: profile,
        error: profileError
    } = await supabaseClient
        .from("profiles")
        .select("username, display_name, role")
        .eq("id", user.id)
        .single();


    if (profileError || !profile) {

        console.error(profileError);

        alert(
            "登入成功，但找不到你的菜比之家住戶資料 ＞＜"
        );

        return;
    }


    // =========================
    // 根據身分進房
    // =========================

    if (profile.role === "cai") {

        alert(
            `🏡 歡迎回家，${profile.display_name}！🥦`
        );

        window.location.href = "cai-room.html";

        return;
    }


    if (profile.role === "bibi") {

        alert(
            `🏡 歡迎回家，${profile.display_name}！🍪`
        );

        window.location.href = "bibi-room.html";

        return;
    }


    if (profile.role === "fan") {

        alert(
            `🏡 歡迎回家，${profile.display_name}！✨`
        );

        window.location.href = "fan-room.html";

        return;
    }


    alert(
        "這個帳號的房間身分設定有問題 ＞＜"
    );

});