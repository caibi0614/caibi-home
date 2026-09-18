// =========================
// 菜比之家・私人房間共用權限
// =========================

const SUPABASE_URL = "https://cxoqymugkaqajxzqfvdi.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Hnu6s348Zu7mx5pqU68l4g_Wwfd1dcH";

const roomSupabase = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// 判斷目前是哪一間房
const currentPage = window.location.pathname.split("/").pop();

let requiredRole = null;

if (currentPage === "cai-room.html") {
    requiredRole = "cai";
}

if (currentPage === "bibi-room.html") {
    requiredRole = "bibi";
}

if (currentPage === "fan-room.html") {
    requiredRole = "fan";
}


// =========================
// 檢查房間權限
// =========================

async function checkRoomAccess() {

    const {
        data: { user },
        error: userError
    } = await roomSupabase.auth.getUser();


    // 沒登入
    if (userError || !user) {

        alert("🔒 不可以偷看啦 ＞＜");

        window.location.href = "secondfloor.html";

        return;
    }


    // 找自己的 profile
    const {
        data: profile,
        error: profileError
    } = await roomSupabase
        .from("profiles")
        .select("display_name, role")
        .eq("id", user.id)
        .single();


    if (profileError || !profile) {

        console.error(profileError);

        alert("找不到你的菜比之家住戶資料 ＞＜");

        window.location.href = "secondfloor.html";

        return;
    }


    // 房間權限不符
    if (profile.role !== requiredRole) {

        alert("🔒 不可以偷看啦 ＞＜");

        window.location.href = "secondfloor.html";

        return;
    }


    console.log(
        `✅ ${profile.display_name} 房間權限驗證成功`
    );
   
}


// 開頁面就檢查
checkRoomAccess();