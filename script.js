// 區塊一開始：顯示今日日期
// 取得今日日期並格式化顯示在主標題區下方
function formatDate(date) {
  // 將日期格式化為 yyyy年mm月dd日
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}年${m}月${d}日`;
}
const today = new Date();
document.getElementById("today-date").textContent =
  "今天日期：" + formatDate(today);
// 區塊一結束

// 區塊二開始：計算狗狗年齡對應人類歲數的工具函式
// 依據理論公式計算：人類歲數 = 16 * ln(狗的年齡) + 31
function dogToHumanAge(dogYears) {
  // 檢查狗的年齡必須大於0
  if (dogYears <= 0) return "無效年齡";
  // 使用數學公式 Math.log() 取自然對數
  const humanAge = 16 * Math.log(dogYears) + 31;
  // 取到小數點第一位
  return humanAge.toFixed(1);
}
// 區塊二結束

// 區塊三開始：顯示我家狗狗(妙麗)的計算結果
// 狗狗出生日期固定為 2023/2/28，計算至今日
function calcDogAgeFromBirthday(birthdayStr) {
  // 取得目前日期
  const today = new Date();
  // 將生日字串轉成日期物件
  const birth = new Date(birthdayStr);
  if (isNaN(birth)) return null; // 無效日期
  // 計算天數間隔
  const diffMs = today - birth;
  const diffY = diffMs / 1000 / 60 / 60 / 24 / 365.25; // 天轉成年
  return Math.max(diffY, 0.01); // 避免年齡為0時出錯
}
// 我家狗狗妙麗出生日期
const myDogBirthday = "2023-02-28";
// 取得狗狗目前年齡
const myDogAge = calcDogAgeFromBirthday(myDogBirthday);
// 計算出人類年齡
const myDogHumanAge = dogToHumanAge(myDogAge);
// 顯示在人類歲數區塊
document.getElementById("mydog-human-age").textContent = myDogHumanAge + " 歲";
// 區塊三結束

// 區塊四開始：處理你家狗狗查詢互動
// 設定日期輸入最大值為今天
document.getElementById("dog-birthday").max = today.toISOString().split("T")[0];

// 取得表單與結果區塊
const form = document.getElementById("dog-form");
const resultDiv = document.getElementById("result");

// 新增：從 LocalStorage 載入上次輸入的資料（如果存在）
const storedName = localStorage.getItem("dogName");
if (storedName) {
  document.getElementById("dog-name").value = storedName;
}
const storedBirthday = localStorage.getItem("dogBirthday");
if (storedBirthday) {
  document.getElementById("dog-birthday").value = storedBirthday;
}
const storedAge = localStorage.getItem("dogAge");
if (storedAge) {
  document.getElementById("dog-age").value = storedAge;
}

// 監聽表單提交事件
form.addEventListener("submit", function (event) {
  event.preventDefault(); // 阻止表單預設送出行為

  // 取得輸入資料
  const name = document.getElementById("dog-name").value.trim();
  const birthday = document.getElementById("dog-birthday").value;
  const ageInput = document.getElementById("dog-age").value;

  let dogAge = null;
  let useBirthday = false;
  let errorMsg = "";

  // 優先判斷出生日期，有填優先
  if (birthday) {
    dogAge = calcDogAgeFromBirthday(birthday);
    useBirthday = true;
    if (dogAge < 0 || isNaN(dogAge)) {
      errorMsg = "出生日期不能為未來或錯誤！";
    }
  } else if (ageInput) {
    dogAge = parseFloat(ageInput);
    if (dogAge < 1 || dogAge > 20) {
      errorMsg = "請輸入正確年齡（1~20）";
    }
  } else {
    errorMsg = "請輸入出生日期或年齡";
  }

  if (errorMsg) {
    resultDiv.textContent = errorMsg;
    resultDiv.style.color = "#d94949";
    return;
  }

  // 計算人類歲數
  const humanAge = dogToHumanAge(dogAge);
  let html = "";
  html += `🐾 <b>${
    name || "狗狗"
  }</b> 換算人類歲數：約 <b>${humanAge}</b> 歲。`;
  html += useBirthday ? `（依出生日期計算）` : `（依輸入年齡計算）`;
  resultDiv.innerHTML = html;
  resultDiv.style.color = "#18914f";

  // 新增：儲存輸入資料到 LocalStorage
  localStorage.setItem("dogName", name);
  localStorage.setItem("dogBirthday", birthday);
  localStorage.setItem("dogAge", ageInput);
});
// 區塊四結束

// 區塊五開始：footer 版權自動顯示區間
// 設定生成與今日日期，版權資訊自動顯示於頁尾
const footer = document.getElementById("footer-copyright");
const genStart = "2025/11/14";
// 顯示版權與日期
footer.textContent = `版權為Andy Li，生成日期為${genStart}～${formatDate(
  today
)}`;
// 區塊五結束
