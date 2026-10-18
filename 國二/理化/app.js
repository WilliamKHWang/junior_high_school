/**
 * 國二理化 3-1「波的傳播」手繪風白板動畫教室
 * 核心功能：8 幕動畫分鏡、Canvas 物理視覺化、Web Speech API 旁白朗讀、互動例題與小測驗
 */

// 8 大幕分鏡資料庫（嚴格對照講義與自修）
const SCENES = [
  {
    id: 0,
    title: "開場：本章學習目標",
    badge: "SCENE 1 / 8",
    timeStr: "00:00 - 00:20",
    citation: "出處：講義 P.82 / 自修 P.1",
    compareNote: "講義列出 4 大目標；自修分為 6 點重點探究，本片整合為 4 個最核心的觀念骨架。",
    speech: "哈囉同學們！看到海浪拍打、或是甩動跳繩時，你有沒有想過『波』到底是什麼？今天只要花 3 分鐘，跟著老師的塗鴉手繪筆，搞懂這 4 個學習目標，你就能徹底掌握波的秘密囉！",
    summary: [
      "📌 1. 波分成力學波與非力學波（看是否需介質）",
      "📌 2. 力學波依振動方向分成橫波與縱波",
      "📌 3. 認識週期波的 5 大名詞（波長、振幅、週期、頻率、波速）",
      "📌 4. 掌握波速公式 v = f × λ 與『同介質波速不變』鐵則"
    ],
    type: "targets"
  },
  {
    id: 1,
    title: "重點一：波的本質（只傳能量，不傳介質）",
    badge: "SCENE 2 / 8",
    timeStr: "00:20 - 00:55",
    citation: "出處：講義 P.82 焦點1 / 自修 P.2 重點1",
    compareNote: "兩書均舉『繩上的蝴蝶結』只上下振動，以及『水面的落葉』只上下起伏，絕不隨波前進，觀念完全一致。",
    speech: "首先請把這句超常考的黃金口訣記在心裡：『波只傳遞能量，不傳遞介質！』看到這條繩子上的紅蝴蝶結了嗎？當波形向右奔跑時，蝴蝶結只在原地乖乖上下振動，絕不會跟著波衝到右邊！水面的落葉也是一樣喔！",
    summary: [
      "⚡ 波動本質：使物質受擾動產生的『能量』向外傳播",
      "🎯 振源（波源）：產生擾動的來源（例如甩繩子的手）",
      "🌊 介質：傳遞波動的物質（例如繩子、水、彈簧）",
      "⚠️ 核心鐵則：介質只在原地往返振動，絕對不隨波前進！"
    ],
    type: "waveRibbon"
  },
  {
    id: 2,
    title: "重點二：波的分類（力學波 vs 橫波與縱波）",
    badge: "SCENE 3 / 8",
    timeStr: "00:55 - 01:30",
    citation: "出處：講義 P.82 / 自修 P.2-3",
    compareNote: "【名稱小差異】講義稱『力學波』與『非力學波』；自修特別補充別名『力學波（又稱機械波）』與『非力學波（又稱非機械波）』；橫波又稱高低波，縱波又稱疏密波。",
    speech: "波要怎麼分類呢？先問第一句：需不需要介質？需要介質才能傳播的叫做力學波，像繩波、水波、聲波；不需要介質在真空中也能跑的叫非力學波，像光波和電磁波！再看振動方向：垂直的叫橫波，平行的叫縱波！",
    summary: [
      "🟢 依介質需求：力學波（需介質） vs 非力學波（不需介質，真空中可傳播，如光波、電磁波）",
      "📐 依振動方向：橫波（高低波，介質振動 ⟂ 波前進）",
      "📏 依振動方向：縱波（疏密波，介質振動 // 波前進，如彈簧推拉、聲波）"
    ],
    type: "classification"
  },
  {
    id: 3,
    title: "重點三：週期波的五大名詞圖解",
    badge: "SCENE 4 / 8",
    timeStr: "01:30 - 02:05",
    citation: "出處：講義 P.84 焦點2 / 自修 P.3-4 重點3",
    compareNote: "自修特別條列出：完整振動一次 ＝ 振動 4 個振幅 ＝ 經過 1 個週期 ＝ 前進 1 個波長的距離，是非常棒的幾何對照！",
    speech: "連續且規律振動產生的波叫做週期波。波的高點是波峰，最低是波谷；平衡位置到最高點叫振幅，振幅越大能量越大喔！相鄰兩個波峰的距離叫波長；晃一次花幾秒叫週期，一秒能晃幾次叫頻率，兩者互為倒數相乘等於1！",
    summary: [
      "🏔️ 波峰（最高點）、波谷（最低點）",
      "📏 振幅：平衡位置到波峰或波谷的垂直距離（振幅越大，能量越大）",
      "↔️ 波長（λ）：相鄰兩波峰（或兩波谷、兩密部中點）之間的距離",
      "⏱️ 週期（T）：完整振動一次所需時間（單位：秒 s）",
      "⚡ 頻率（f）：每秒內完整振動的次數（單位：赫茲 Hz），f = 1/T"
    ],
    type: "waveFeatures"
  },
  {
    id: 4,
    title: "重點四：波速公式與同介質不變定律",
    badge: "SCENE 5 / 8",
    timeStr: "02:05 - 02:35",
    citation: "出處：講義 P.86 焦點3 / 自修 P.4-5 重點4,5",
    compareNote: "講義與自修均特別註明：水波在『深水區較快、淺水區較慢』；同一介質狀態下，手甩得再快，波速都不會改變，只會使波長變短。",
    speech: "接下來是考試必勝公式！波速就是波長除以週期，也就是頻率乘上波長：v = f × λ！注意這個常見陷阱題：在同一條繩子上，你把手甩得再快，波速都不會變！頻率加倍，波長就縮短一半，波速依然是一樣的喔！",
    summary: [
      "📐 波速公式：v = 波長 / 週期 = 頻率 × 波長（v = f × λ）",
      "🔒 鐵則：力學波的波速只受『介質種類與狀態』影響！",
      "⚖️ 同一介質中波速固定：f 變大，波長 λ 必變短，兩者成反比",
      "🌊 水波特例：深水區波速快、淺水區波速慢（可視為不同介質）"
    ],
    type: "speedFormula"
  },
  {
    id: 5,
    title: "例題示範：講義 P.86 原題拆解",
    badge: "SCENE 6 / 8",
    timeStr: "02:35 - 03:00",
    citation: "出處：講義 P.86 範例",
    compareNote: "題目為講義原題與原解題步驟，未改動任何數值（v = 2 m/s, T = 0.4 s 求波長 λ）。",
    speech: "我們馬上來看講義 P.86 的經典原題！題目給波速 2 公尺每秒，週期 0.4 秒，怎麼求波長？第一步，週期 0.4 秒，倒數就是頻率 2.5 赫茲；第二步，代入 v = f × λ，2 等於 2.5 乘波長，輕鬆算出波長就是 0.8 公尺！",
    summary: [
      "題目：一連續週期繩波波速為 2 m/s，週期為 0.4 秒，求波長？",
      "Step 1：頻率 = 1 / 週期 = 1 / 0.4 = 2.5 Hz",
      "Step 2：速率 = 頻率 × 波長 ➔ 2 = 2.5 × 波長",
      "Step 3：波長 = 2 / 2.5 = 0.8 公尺"
    ],
    type: "example"
  },
  {
    id: 6,
    title: "隨堂小測驗：講義 P.86 焦點即時練原題",
    badge: "SCENE 7 / 8",
    timeStr: "03:00 - 03:25",
    citation: "出處：講義 P.86 焦點即時練 第3題",
    compareNote: "原題與四個選項原汁原味呈現，測驗觀念在於『同一繩波』的波速不變，破解頻率加倍波速加倍的常見錯誤。",
    speech: "來個 3 秒快問快答！頻率變 2 倍，波速跟波長怎麼變？倒數 3、2、1，選好了嗎？答案是 C！你答對了嗎？千萬別選 A 喔！因為在同一條繩子上，波速只看介質，所以波速不變；頻率加倍，波長就只能乖乖減半成一半囉！",
    summary: [
      "考題：將某繩波振動頻率增加為 2 倍，波速與波長如何改變？",
      "關鍵：『某繩波』＝同一介質 ➔ 波速固定不變！",
      "由 v = f × λ，v 不變，f 變成 2 倍，則波長 λ 變為 1/2",
      "正確解答：(C) 波速不改變，波長變為原來的 1/2"
    ],
    type: "quiz"
  },
  {
    id: 7,
    title: "結尾總整理：手繪一頁心智圖 ＆ 易錯坑排查",
    badge: "SCENE 8 / 8",
    timeStr: "03:25 - 03:45",
    citation: "出處：講義 P.82-86 / 自修 P.2-6",
    compareNote: "彙整講義與自修最容易在考試中失分的 3 大觀念陷阱，全部源自課本與評量原題解析。",
    speech: "最後送大家這張手繪一頁重點圖，手機截圖就能隨時複習！特別注意這三大易踩雷區：用力甩只影響振幅不影響波速、繩上紅點絕不隨波前進、深水波速比淺水快！記住這三點，3-1 段考拿滿分！我們下一節見，拜拜！",
    summary: [
      "💣 易錯 1：用力甩繩波速會變快？（錯！用力甩只影響『振幅』，波速不變！）",
      "💣 易錯 2：繩上的紅點會跟著衝到終點？（錯！介質只在『原地往返』振動！）",
      "💣 易錯 3：水波在各處速度都一樣？（錯！水波在『深水區較快、淺水區較慢』！）"
    ],
    type: "mindmap"
  }
];

// 應用程式狀態
let currentSceneIndex = 0;
let isPlaying = false;
let isVoiceEnabled = true;
let playbackSpeed = 1.0;
let animFrameId = null;
let wavePhase = 0;
let timerSeconds = 3;
let timerInterval = null;
let currentUtterance = null;

// DOM 元素引用
const canvas = document.getElementById("doodleCanvas");
const ctx = canvas.getContext("2d");
const canvasContainer = document.getElementById("canvasContainer");
const interactiveOverlay = document.getElementById("interactiveOverlay");
const sceneBadge = document.getElementById("sceneBadge");
const sceneTitle = document.getElementById("sceneTitle");
const sourceCitation = document.getElementById("sourceCitation");
const speechText = document.getElementById("speechText");
const speechProgress = document.getElementById("speechProgress");
const timeReadout = document.getElementById("timeReadout");
const sceneScrubber = document.getElementById("sceneScrubber");
const btnPlayPause = document.getElementById("btnPlayPause");
const playIcon = document.getElementById("playIcon");
const btnPrevScene = document.getElementById("btnPrevScene");
const btnNextScene = document.getElementById("btnNextScene");
const btnResetScene = document.getElementById("btnResetScene");
const btnVoiceToggle = document.getElementById("btnVoiceToggle");
const btnViewScript = document.getElementById("btnViewScript");
const sceneNavList = document.getElementById("sceneNavList");
const summaryBody = document.getElementById("summaryBody");
const compareDesc = document.getElementById("compareDesc");
const scriptModal = document.getElementById("scriptModal");
const btnCloseModal = document.getElementById("btnCloseModal");
const scriptModalBody = document.getElementById("scriptModalBody");

// 初始化
function initApp() {
  setupSceneNav();
  setupEventListeners();
  loadScene(0);
  startRenderLoop();
}

// 建立右側 8 幕導覽
function setupSceneNav() {
  sceneNavList.innerHTML = "";
  SCENES.forEach((scene, idx) => {
    const btn = document.createElement("button");
    btn.className = `nav-item-btn ${idx === 0 ? "active" : ""}`;
    btn.innerHTML = `
      <span>${scene.title}</span>
      <span class="nav-num">${idx + 1}</span>
    `;
    btn.addEventListener("click", () => {
      loadScene(idx);
    });
    sceneNavList.appendChild(btn);
  });
}

// 事件監聽綁定
function setupEventListeners() {
  btnPlayPause.addEventListener("click", togglePlayPause);
  btnPrevScene.addEventListener("click", () => {
    if (currentSceneIndex > 0) loadScene(currentSceneIndex - 1);
  });
  btnNextScene.addEventListener("click", () => {
    if (currentSceneIndex < SCENES.length - 1) loadScene(currentSceneIndex + 1);
  });
  btnResetScene.addEventListener("click", () => {
    loadScene(currentSceneIndex);
  });

  sceneScrubber.addEventListener("input", (e) => {
    loadScene(parseInt(e.target.value, 10));
  });

  btnVoiceToggle.addEventListener("click", () => {
    isVoiceEnabled = !isVoiceEnabled;
    btnVoiceToggle.classList.toggle("active", isVoiceEnabled);
    btnVoiceToggle.querySelector(".label").textContent = `語音朗讀：${isVoiceEnabled ? "開" : "關"}`;
    if (!isVoiceEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    } else if (isVoiceEnabled) {
      speakSceneNarration(SCENES[currentSceneIndex].speech);
    }
  });

  // 速度切換
  document.querySelectorAll(".btn-speed").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".btn-speed").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      playbackSpeed = parseFloat(btn.dataset.speed);
    });
  });

  // 分鏡腳本彈窗
  btnViewScript.addEventListener("click", openScriptModal);
  btnCloseModal.addEventListener("click", () => scriptModal.close());
  scriptModal.addEventListener("click", (e) => {
    if (e.target === scriptModal) scriptModal.close();
  });
}

// 超擬真自然人聲播放器
let currentAudioPlayer = null;

// 切換播放與暫停
function togglePlayPause() {
  isPlaying = !isPlaying;
  playIcon.textContent = isPlaying ? "⏸️" : "▶️";
  if (isPlaying) {
    if (isVoiceEnabled) {
      playSceneAudio(currentSceneIndex);
    }
  } else {
    stopCurrentAudio();
  }
}

// 停止當前聲音
function stopCurrentAudio() {
  if (currentAudioPlayer) {
    currentAudioPlayer.pause();
    currentAudioPlayer.currentTime = 0;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// 載入指定幕次
function loadScene(index) {
  if (index < 0 || index >= SCENES.length) return;
  currentSceneIndex = index;
  const scene = SCENES[index];

  // 清除舊定時器與聲音
  if (timerInterval) clearInterval(timerInterval);
  stopCurrentAudio();

  // 更新介面文字
  sceneBadge.textContent = scene.badge;
  sceneTitle.textContent = scene.title;
  sourceCitation.innerHTML = `<span class="pin">📌</span> ${scene.citation}`;
  speechText.textContent = scene.speech;
  timeReadout.textContent = scene.timeStr;
  sceneScrubber.value = index;
  compareDesc.textContent = scene.compareNote;

  // 更新側邊欄高亮
  document.querySelectorAll(".nav-item-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === index);
  });

  // 更新本幕摘要卡
  summaryBody.innerHTML = scene.summary
    .map((item) => `<div class="summary-bullet"><span>${item}</span></div>`)
    .join("");

  // 重置進度條
  speechProgress.style.width = "0%";

  // 構建互動覆蓋層
  renderOverlayContent(scene);

  // 語音朗讀
  if (isVoiceEnabled && isPlaying) {
    playSceneAudio(currentSceneIndex);
  }
}

// 播放自然台灣女老師原聲（優先使用高擬真音訊檔，降級使用 Web Speech）
function playSceneAudio(sceneIdx) {
  stopCurrentAudio();
  const audioSrc = `audio/scene_${sceneIdx}.mp3`;
  currentAudioPlayer = new Audio(audioSrc);
  currentAudioPlayer.playbackRate = playbackSpeed;

  currentAudioPlayer.addEventListener("timeupdate", () => {
    if (currentAudioPlayer && currentAudioPlayer.duration) {
      const pct = Math.min(100, (currentAudioPlayer.currentTime / currentAudioPlayer.duration) * 100);
      speechProgress.style.width = `${pct}%`;
    }
  });

  currentAudioPlayer.addEventListener("ended", () => {
    speechProgress.style.width = "100%";
    if (isPlaying && currentSceneIndex < SCENES.length - 1) {
      setTimeout(() => {
        if (isPlaying) loadScene(currentSceneIndex + 1);
      }, 1200);
    } else if (currentSceneIndex === SCENES.length - 1) {
      isPlaying = false;
      playIcon.textContent = "▶️";
    }
  });

  currentAudioPlayer.play().catch((err) => {
    console.warn("音訊檔自動播放受限或失敗，嘗試 Web Speech 備用方案:", err);
    fallbackWebSpeech(SCENES[sceneIdx].speech);
  });
}

// 備用語音朗讀（Web Speech API）
function fallbackWebSpeech(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-TW";
  utterance.rate = 1.0 * playbackSpeed;
  utterance.pitch = 1.05;

  const voices = window.speechSynthesis.getVoices();
  const twVoice = voices.find((v) => v.name.includes("Meijia") || v.name.includes("Sandy") || v.lang === "zh-TW" || v.lang.includes("zh"));
  if (twVoice) utterance.voice = twVoice;

  const totalChars = text.length;
  utterance.onboundary = (e) => {
    if (e.charIndex !== undefined) {
      const pct = Math.min(100, Math.round((e.charIndex / totalChars) * 100));
      speechProgress.style.width = `${pct}%`;
    }
  };

  utterance.onend = () => {
    speechProgress.style.width = "100%";
    if (isPlaying && currentSceneIndex < SCENES.length - 1) {
      setTimeout(() => {
        if (isPlaying) loadScene(currentSceneIndex + 1);
      }, 1200);
    } else if (currentSceneIndex === SCENES.length - 1) {
      isPlaying = false;
      playIcon.textContent = "▶️";
    }
  };

  window.speechSynthesis.speak(utterance);
}

// 動態覆蓋層內容生成
function renderOverlayContent(scene) {
  interactiveOverlay.innerHTML = "";

  if (scene.type === "targets") {
    const list = document.createElement("div");
    list.className = "target-list";
    list.innerHTML = `
      <div class="target-item done"><span>🎨 1. 波的分類（力學波 vs 非力學波）</span><span>✅</span></div>
      <div class="target-item done"><span>〰️ 2. 振動方式（橫波/高低波 vs 縱波/疏密波）</span><span>✅</span></div>
      <div class="target-item done"><span>📐 3. 波動五大性質（波長、振幅、週期、頻率）</span><span>✅</span></div>
      <div class="target-item done"><span>⚡ 4. 波速計算公式（v = f × λ 與同介質不變）</span><span>✅</span></div>
    `;
    interactiveOverlay.appendChild(list);
  } else if (scene.type === "example") {
    const card = document.createElement("div");
    card.className = "example-card";
    card.innerHTML = `
      <div class="example-title">📝 講義 P.86 經典範例（原題與原解題步驟）</div>
      <div class="example-question">
        題目：一連續週期繩波，已知其波速為 <strong>2 m/s</strong>，波形如圖（波源振動一次需 <strong>0.4 秒</strong>），求此繩波的波長為多少公尺？
      </div>
      <div class="step-flow">
        <div class="step-card active">
          <span class="badge">步驟 1</span> 找頻率：週期 T = 0.4 秒 ➔ <strong>頻率 f = 1 / T = 1 / 0.4 = 2.5 赫茲 (Hz)</strong>
        </div>
        <div class="step-card active">
          <span class="badge">步驟 2</span> 代入公式：<strong>波速 v = 頻率 f × 波長 λ</strong> ➔ 2 = 2.5 × 波長
        </div>
        <div class="step-card active" style="background:#d1fae5; border-left-color:#059669; font-weight:700; color:#065f46;">
          <span class="badge" style="background:#059669;">步驟 3</span> 計算結果：<strong>波長 λ = 2 ÷ 2.5 = 0.8 公尺 (m)</strong> 🎉
        </div>
      </div>
    `;
    interactiveOverlay.appendChild(card);
  } else if (scene.type === "quiz") {
    const card = document.createElement("div");
    card.className = "quiz-card";
    card.innerHTML = `
      <div class="quiz-header">
        <span class="quiz-badge">章節即時挑戰（講義 P.86 第 3 題）</span>
        <div class="timer-box">
          <span>⏳ 倒數思考：</span><span id="quizTimerVal">3</span> 秒
        </div>
      </div>
      <div class="quiz-question">
        將某繩波的振動頻率增加為兩倍，則此繩子的波速與波長將會如何改變？
      </div>
      <div class="quiz-options">
        <button class="quiz-btn" data-opt="A">(A) 波速增為兩倍，波長變 1/2</button>
        <button class="quiz-btn" data-opt="B">(B) 波速增為兩倍，波長不變</button>
        <button class="quiz-btn" data-opt="C" id="optC">(C) 波速不變，波長變 1/2（正確解答）</button>
        <button class="quiz-btn" data-opt="D">(D) 波速與波長皆增為兩倍</button>
      </div>
      <div class="quiz-explain" id="quizExplain" style="display:none;">
        💡 <strong>【解題思路】</strong>：<br>
        1. 看到『某繩波』＝同一條繩子（同一介質）！<br>
        2. <strong>同一介質中波速固定不變！</strong><br>
        3. 由公式 v = f × λ，波速 v 不變，頻率 f 增加為 2 倍，波長 λ 就必須縮減為原來的 1/2（兩者成反比）！
      </div>
    `;
    interactiveOverlay.appendChild(card);

    // 啟動 3 秒倒數計時
    timerSeconds = 3;
    const timerVal = card.querySelector("#quizTimerVal");
    const explainBox = card.querySelector("#quizExplain");
    const optCBtn = card.querySelector("#optC");

    timerInterval = setInterval(() => {
      timerSeconds--;
      if (timerVal) timerVal.textContent = timerSeconds;
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        if (explainBox) explainBox.style.display = "block";
        if (optCBtn) optCBtn.classList.add("correct");
      }
    }, 1000);

    // 選項點擊互動
    card.querySelectorAll(".quiz-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        clearInterval(timerInterval);
        if (btn.dataset.opt === "C") {
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");
          optCBtn.classList.add("correct");
        }
        explainBox.style.display = "block";
      });
    });
  } else if (scene.type === "mindmap") {
    const card = document.createElement("div");
    card.className = "mindmap-overlay-card";
    card.innerHTML = `
      <div class="mindmap-grid">
        <div class="mind-box b1">
          <h4>〰️ 波的傳播本質</h4>
          <p>• 只傳能量，不傳介質<br>• 繩上蝴蝶結只原地上下晃動，不前進</p>
        </div>
        <div class="mind-box b2">
          <h4>🏷️ 兩大分類維度</h4>
          <p>• 需介質：力學波 vs 非力學波<br>• 振動方向：橫波(垂直) vs 縱波(平行)</p>
        </div>
        <div class="mind-box b3">
          <h4>📐 五大基本名詞</h4>
          <p>• 波峰、波谷、振幅(能量大小)<br>• 波長 λ、週期 T、頻率 f (互為倒數)</p>
        </div>
        <div class="mind-box b4">
          <h4>⚡ 波速黃金鐵則</h4>
          <p>• v = f × λ = λ / T<br>• <strong>同介質波速不變！</strong>深水快、淺水慢</p>
        </div>
      </div>
      <div class="pitfall-box">
        <h4>🚨 考試 3 大易踩地雷大排查</h4>
        <ul>
          <li>⚠️ <strong>誤區 1：</strong>手用力甩繩子波速變快？（錯！用力只改變「振幅」，波速不變！）</li>
          <li>⚠️ <strong>誤區 2：</strong>水波傳遞時落葉會被推走？（錯！落葉只在原地隨水波上下起伏！）</li>
          <li>⚠️ <strong>誤區 3：</strong>頻率越大波速越快？（錯！同介質波速固定，頻率大只會讓波長縮短！）</li>
        </ul>
      </div>
    `;
    interactiveOverlay.appendChild(card);
  }
}

// 主 Canvas 物理動畫渲染循環
function startRenderLoop() {
  function render() {
    wavePhase += 0.05 * playbackSpeed;
    drawSceneCanvas(currentSceneIndex);
    animFrameId = requestAnimationFrame(render);
  }
  render();
}

// 根據當前幕繪製 Canvas 背景手繪圖解
function drawSceneCanvas(sceneIdx) {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // 背景輕柔白板微格線
  ctx.strokeStyle = "#f1f5f9";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const scene = SCENES[sceneIdx];

  if (scene.type === "waveRibbon") {
    drawWaveRibbonPhysics(w, h);
  } else if (scene.type === "classification") {
    drawClassificationDiagram(w, h);
  } else if (scene.type === "waveFeatures") {
    drawWaveFeaturesDiagram(w, h);
  } else if (scene.type === "speedFormula") {
    drawSpeedFormulaDiagram(w, h);
  }
}

// 【物理動畫 1】：繩波前進 ＋ 紅色蝴蝶結原地上下振動
function drawWaveRibbonPhysics(w, h) {
  const centerY = h * 0.45;
  const amp = 55;
  const wavelength = 220;

  // 1. 繪製平衡位置虛線
  ctx.save();
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(40, centerY);
  ctx.lineTo(w - 40, centerY);
  ctx.stroke();
  ctx.restore();

  // 2. 波前進方向箭頭標籤
  ctx.fillStyle = "#0284c7";
  ctx.font = "bold 16px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("波前進方向 ➔ 向右傳播", w - 240, centerY - amp - 35);
  ctx.strokeStyle = "#0284c7";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w - 240, centerY - amp - 25);
  ctx.lineTo(w - 60, centerY - amp - 25);
  ctx.stroke();

  // 3. 繪製手繪藍色彈力繩
  ctx.strokeStyle = "#0284c7";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let x = 40; x <= w - 40; x += 3) {
    const y = centerY + Math.sin((x / wavelength) * 2 * Math.PI - wavePhase) * amp;
    if (x === 40) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // 4. 固定位置（x = w * 0.42）上的紅色蝴蝶結
  const ribbonX = w * 0.42;
  const ribbonY = centerY + Math.sin((ribbonX / wavelength) * 2 * Math.PI - wavePhase) * amp;

  // 蝴蝶結上下運動軌跡垂直輔助線
  ctx.save();
  ctx.strokeStyle = "#f43f5e";
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(ribbonX, centerY - amp - 20);
  ctx.lineTo(ribbonX, centerY + amp + 20);
  ctx.stroke();
  ctx.restore();

  // 蝴蝶結本體手繪圖案（紅色緞帶）
  ctx.save();
  ctx.fillStyle = "#e11d48";
  ctx.strokeStyle = "#9f1239";
  ctx.lineWidth = 2;
  // 左翼
  ctx.beginPath();
  ctx.moveTo(ribbonX, ribbonY);
  ctx.lineTo(ribbonX - 18, ribbonY - 12);
  ctx.lineTo(ribbonX - 18, ribbonY + 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // 右翼
  ctx.beginPath();
  ctx.moveTo(ribbonX, ribbonY);
  ctx.lineTo(ribbonX + 18, ribbonY - 12);
  ctx.lineTo(ribbonX + 18, ribbonY + 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // 中心結
  ctx.fillStyle = "#ffe4e6";
  ctx.beginPath();
  ctx.arc(ribbonX, ribbonY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // 蝴蝶結說明氣泡
  ctx.fillStyle = "#e11d48";
  ctx.font = "bold 15px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("📍 蝴蝶結只上下往返振動", ribbonX - 85, centerY + amp + 45);
  ctx.fillStyle = "#64748b";
  ctx.font = "13px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("❌ 絕不隨波往右跑！（講義 P.82）", ribbonX - 95, centerY + amp + 65);
}

// 【物理動畫 2】：分類對照圖（橫波 vs 縱波）
function drawClassificationDiagram(w, h) {
  // 橫波示意區（上方）
  const y1 = h * 0.28;
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 17px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("1. 橫波（高低波）：介質振動方向 ⟂ 波前進方向（垂直 90°）", 40, y1 - 45);

  // 畫橫波波形
  ctx.strokeStyle = "#0284c7";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let x = 60; x <= w - 60; x += 3) {
    const y = y1 + Math.sin((x / 140) * 2 * Math.PI - wavePhase) * 25;
    if (x === 60) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // 垂直直角標記
  const markerX = 180;
  ctx.fillStyle = "#e11d48";
  ctx.font = "bold 14px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("↕️ 介質上下振動", markerX - 40, y1 + 50);
  ctx.fillStyle = "#0284c7";
  ctx.fillText("➡️ 波向前進", markerX + 70, y1 + 5);

  // 縱波示意區（下方）
  const y2 = h * 0.72;
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 17px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("2. 縱波（疏密波）：介質振動方向 // 波前進方向（互相平行）", 40, y2 - 40);

  // 畫彈簧縱波（疏密分佈圈）
  const coils = 50;
  ctx.strokeStyle = "#7c3aed";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i < coils; i++) {
    // 疏密位移調變
    const baseX = 60 + i * ((w - 120) / coils);
    const shift = Math.sin((i / 7) - wavePhase) * 12;
    const x = baseX + shift;
    ctx.moveTo(x, y2 - 20);
    ctx.lineTo(x, y2 + 20);
  }
  ctx.stroke();

  // 標註密部與疏部
  ctx.fillStyle = "#7c3aed";
  ctx.font = "bold 14px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("【密部中心】", 160, y2 + 40);
  ctx.fillText("【疏部中心】", 330, y2 + 40);
  ctx.fillText("↔️ 介質左右推拉 // ➡️ 波向前進", 500, y2 + 40);
}

// 【物理動畫 3】：波動五大幾何要素
function drawWaveFeaturesDiagram(w, h) {
  const centerY = h * 0.45;
  const amp = 70;
  const wavelength = 260;

  // 基準平衡線
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(50, centerY);
  ctx.lineTo(w - 50, centerY);
  ctx.stroke();
  ctx.setLineDash([]);

  // 靜態標準弦波
  ctx.strokeStyle = "#059669";
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let x = 60; x <= w - 60; x += 3) {
    const y = centerY - Math.sin(((x - 60) / wavelength) * 2 * Math.PI) * amp;
    if (x === 60) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // 標註：波峰 (Crest)
  const crestX = 60 + wavelength * 0.25;
  const crestY = centerY - amp;
  ctx.fillStyle = "#e11d48";
  ctx.beginPath();
  ctx.arc(crestX, crestY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "bold 16px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("🔴 波峰（最高點）", crestX - 60, crestY - 14);

  // 標註：波谷 (Trough)
  const troughX = 60 + wavelength * 0.75;
  const troughY = centerY + amp;
  ctx.fillStyle = "#0284c7";
  ctx.beginPath();
  ctx.arc(troughX, troughY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText("🔵 波谷（最低點）", troughX - 60, troughY + 24);

  // 標註：振幅 (Amplitude) 垂直雙向箭頭
  const ampX = crestX + 50;
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ampX, centerY);
  ctx.lineTo(ampX, centerY - amp);
  ctx.stroke();
  ctx.fillStyle = "#d97706";
  ctx.font = "bold 14px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("振幅（能量）", ampX + 8, centerY - amp / 2);

  // 標註：波長 λ 水平雙向箭頭（相鄰兩波峰）
  const nextCrestX = crestX + wavelength;
  ctx.strokeStyle = "#7c3aed";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(crestX, crestY - 30);
  ctx.lineTo(nextCrestX, crestY - 30);
  ctx.stroke();
  ctx.fillStyle = "#7c3aed";
  ctx.font = "bold 16px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("↔️ 波長 λ（相鄰兩波峰間距）", crestX + 30, crestY - 40);

  // 下方備註口訣
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 15px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("⏱️ 完整振動一次花的時間 ＝ 週期 T (秒)   |   ⚡ 每秒完整振動次數 ＝ 頻率 f (赫茲 Hz)", 80, h - 30);
}

// 【物理動畫 4】：波速公式與天平對比
function drawSpeedFormulaDiagram(w, h) {
  const centerY = h * 0.42;

  // 大公式卡牌
  ctx.fillStyle = "#fef3c7";
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 3;
  ctx.roundRect(80, 50, w - 160, 110, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#78350f";
  ctx.font = "bold 24px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("波速公式： v ＝ 波長 ÷ 週期 ＝ 頻率 × 波長 （ v ＝ f × λ ）", 120, 115);

  // 同介質波速不變天秤
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 18px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("⚖️ 同一介質中波速固定不變：頻率與波長成反比！", 80, 210);

  // 上圖：手甩得慢（頻率小，波長長）
  ctx.fillStyle = "#0284c7";
  ctx.font = "bold 15px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("手甩得慢 ➔ 頻率 f 小 ➔ 波長 λ 較長：", 80, 255);
  ctx.strokeStyle = "#0284c7";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let x = 400; x <= w - 80; x += 3) {
    const y = 250 + Math.sin(((x - 400) / 160) * 2 * Math.PI - wavePhase * 0.5) * 16;
    if (x === 400) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // 下圖：手甩得快（頻率大，波長短）
  ctx.fillStyle = "#e11d48";
  ctx.font = "bold 15px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("手甩得快 ➔ 頻率 f 大 ➔ 波長 λ 較短：", 80, 325);
  ctx.strokeStyle = "#e11d48";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let x = 400; x <= w - 80; x += 3) {
    const y = 320 + Math.sin(((x - 400) / 80) * 2 * Math.PI - wavePhase * 1.5) * 16;
    if (x === 400) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.fillStyle = "#059669";
  ctx.font = "bold 16px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("💡 重點提醒：兩者的波速 v 乘積完全相同！（波速只看介質種類與狀態）", 80, 385);
}

// 彈出視窗：顯示完整分鏡腳本
function openScriptModal() {
  scriptModalBody.innerHTML = `
    <h2>🎬 國二理化 3-1「波的傳播」手繪風白板動畫完整分鏡腳本</h2>
    <p><strong>片長預估：</strong>約 3 分 20 秒 | <strong>語言：</strong>台灣繁體中文 | <strong>教學口吻：</strong>親切理化老師</p>
    <p><strong>出處依據：</strong>《理化-講義-3-1.pdf》P.82~86 與《理化-自修-3-1.pdf》P.1~6</p>
    <hr style="margin: 14px 0;">
    <h3>八大分鏡架構摘要：</h3>
    <table>
      <thead>
        <tr><th>幕次</th><th>時間碼</th><th>主題焦點</th><th>出處標註</th></tr>
      </thead>
      <tbody>
        <tr><td>第 1 幕</td><td>0:00 - 0:20</td><td>開場學習目標（4大骨架）</td><td>講義 P.82 / 自修 P.1</td></tr>
        <tr><td>第 2 幕</td><td>0:20 - 0:55</td><td>波的本質（只傳能量不傳介質，紅蝴蝶結原地上下晃）</td><td>講義 P.82 / 自修 P.2</td></tr>
        <tr><td>第 3 幕</td><td>0:55 - 1:30</td><td>波的分類（力學波/非力學波、橫波/縱波）</td><td>講義 P.82 / 自修 P.2-3</td></tr>
        <tr><td>第 4 幕</td><td>01:30 - 02:05</td><td>週期波五大基本名詞圖解（波峰波谷/振幅/波長/週期/頻率）</td><td>講義 P.84 / 自修 P.3-4</td></tr>
        <tr><td>第 5 幕</td><td>02:05 - 02:35</td><td>波速公式與同介質不變定律（v = f × λ）</td><td>講義 P.86 / 自修 P.4-5</td></tr>
        <tr><td>第 6 幕</td><td>02:35 - 03:00</td><td>講義 P.86 經典例題示範（已知 T=0.4s, v=2m/s 求 λ=0.8m）</td><td>講義 P.86 範例</td></tr>
        <tr><td>第 7 幕</td><td>03:00 - 03:25</td><td>講義 P.86 焦點即時練第3題（頻率加倍波速如何改變？）</td><td>講義 P.86 即時練3</td></tr>
        <tr><td>第 8 幕</td><td>03:25 - 03:45</td><td>手繪一頁心智圖總整理 ＆ 考試 3 大易踩地雷大排查</td><td>講義 P.82-86 / 自修 P.2-6</td></tr>
      </tbody>
    </table>
    <p style="margin-top:16px;">完整逐字腳本已儲存在專案 Artifact 文檔：<code>storyboard_script.md</code> 中，歡迎隨時參閱拍片或製圖！</p>
  `;
  scriptModal.showModal();
}

// 啟動應用程式
window.addEventListener("DOMContentLoaded", initApp);
