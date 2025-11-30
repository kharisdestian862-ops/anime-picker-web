const btn = document.getElementById("btnGacha");
const card = document.getElementById("resultCard");
const themeBtn = document.getElementById("themeToggle");
const langBtn = document.getElementById("langToggle");
const musicBtn = document.getElementById("musicToggle");
const body = document.body;
const homeView = document.getElementById("homeView");
const historyView = document.getElementById("historyView");
const favoritesView = document.getElementById("favoritesView");
const scanView = document.getElementById("scanView");
const statsView = document.getElementById("statsView");
const sfxClick = document.getElementById("sfxClick");
const sfxSuccess = document.getElementById("sfxSuccess");
const btnFavorite = document.getElementById("btnFavorite");
const dynamicBg = document.getElementById("dynamic-bg");
const filterArea = document.getElementById("filterArea");
const btnModeAnime = document.getElementById("modeAnime");
const btnModeChar = document.getElementById("modeChar");
const btnModeDonghua = document.getElementById("modeDonghua");
const btnVoice = document.getElementById("btnVoice");
const voiceStatus = document.getElementById("voiceStatus");
const trendingList = document.getElementById("trendingList");
const colorPicker = document.getElementById("colorPicker");
const toastContainer = document.getElementById("toast-container");
const quickTagsContainer = document.getElementById("quickTags");
const zenToggle = document.getElementById("zenToggle");
const fabContainer = document.getElementById("fabContainer");

let currentLang = "id";
let currentMode = "anime";
let player;
let isMusicPlaying = false;
let currentAnimeData = null;
let currentQuote = null;
let myChart = null;

const quickTags = [
  { id: "1", name: "Action" },
  { id: "22", name: "Romance" },
  { id: "62", name: "Isekai" },
  { id: "23", name: "School" },
  { id: "4", name: "Comedy" },
  { id: "10", name: "Fantasy" },
];

const malToAnilistGenre = {
  1: "Action",
  2: "Adventure",
  4: "Comedy",
  8: "Drama",
  10: "Fantasy",
  14: "Horror",
  7: "Mystery",
  22: "Romance",
  24: "Sci-Fi",
  36: "Slice of Life",
  30: "Sports",
  37: "Supernatural",
  41: "Thriller",
  18: "Mecha",
  19: "Music",
  40: "Psychological",
};

const icons = {
  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  music: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
  pause: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  eyeOff: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`,
};

const animeQuotes = [
  {
    id: "Jika kau tidak berjuang, kau tidak bisa menang.",
    en: "If you don't fight, you can't win.",
    jp: "戦わなければ勝てない。",
    cn: "如果你不战斗，你就赢不了。",
    char: "Eren Yeager (AOT)",
  },
  {
    id: "Aku tidak akan menarik kembali kata-kataku!",
    en: "I never go back on my word!",
    jp: "俺は自分の言葉を曲げない！",
    cn: "我绝不食言！",
    char: "Naruto Uzumaki",
  },
  {
    id: "Manusia itu kuat karena bisa mengubah dirinya sendiri.",
    en: "Human strength lies in the ability to change yourself.",
    jp: "人間は変われるから強いんだ。",
    cn: "人类之所以强大，是因为他们能改变自己。",
    char: "Saitama (One Punch Man)",
  },
  {
    id: "Kehidupan bukan hanya melakukan hal yang menyenangkan.",
    en: "Life is not just doing things that are fun.",
    jp: "人生は楽しいことだけじゃない。",
    cn: "生活不仅仅是做有趣的事。",
    char: "L (Death Note)",
  },
  {
    id: "Orang lemah tidak punya hak untuk memilih cara mati.",
    en: "The weak don't get to decide how they die.",
    jp: "弱者に死に方を選ぶ権利はない。",
    cn: "弱者没有选择死法的权利。",
    char: "Trafalgar Law (One Piece)",
  },
  {
    id: "Mimpi manusia tidak akan pernah berakhir!",
    en: "People's dreams... never end!",
    jp: "人の夢は!!! 終わらねェ!!!!",
    cn: "人的梦想...永远不会结束！",
    char: "Marshall D. Teach (One Piece)",
  },
];

const translations = {
  id: {
    title: "Cari Anime",
    title_char: "Gacha Karakter",
    title_donghua: "Cari Donghua",
    desc: "Sesuaikan dengan seleramu hari ini!",
    desc_char: "Dapatkan karakter waifu/husbu acak!",
    desc_donghua: "Temukan animasi China terbaik!",
    opt_random: "Semua Genre",
    btnSearch: "Carikan Anime",
    btnSearchChar: "Panggil Karakter",
    btnSearchDonghua: "Carikan Donghua",
    btnLoading: "Sedang Mencari...",
    btnAgain: "Cari Lagi",
    linkMal: "Lihat di MAL ↗",
    placeholderYear: "Tahun",
    alertNotFound: "Tidak ditemukan.",
    alertError: "Terjadi kesalahan.",
    btn_trailer: "Trailer",
    btn_share: "Bagikan",
    btn_save: "Simpan",
    btn_recommend: "Mirip",
    link_mal: "MAL",
    hist_title: "Riwayat",
    hist_empty: "Kosong.",
    fav_title: "Favorit",
    fav_empty: "Kosong.",
    btn_clear: "Hapus Semua",
    btn_history: "Riwayat",
    btn_fav: "Favorit",
    btn_back: "Kembali",
    btn_scan: "Scan",
    scan_title: "Scan Gambar",
    scan_desc: "Upload gambar anime!",
    scan_error: "Gagal memproses.",
    scan_no_result: "Tidak ada hasil.",
    similarity: "Mirip",
    trending_title: "🔥 Sedang Tayang",
    toast_fav_added: "Tersimpan di Favorit ❤️",
    toast_fav_removed: "Dihapus dari Favorit 💔",
    toast_saved: "Gambar tersimpan! 📸",
  },
  en: {
    title: "Search Anime",
    title_char: "Character Gacha",
    title_donghua: "Search Donghua",
    desc: "Find something for today!",
    desc_char: "Get random waifu/husbando!",
    desc_donghua: "Discover top Chinese Animation!",
    opt_random: "All Genres",
    btnSearch: "Find Anime",
    btnSearchChar: "Summon Char",
    btnSearchDonghua: "Find Donghua",
    btnLoading: "Searching...",
    btnAgain: "Find Another",
    linkMal: "View on MAL ↗",
    placeholderYear: "Year",
    alertNotFound: "Not found.",
    alertError: "Error occurred.",
    btn_trailer: "Trailer",
    btn_share: "Share",
    btn_save: "Save",
    btn_recommend: "Similar",
    link_mal: "MAL",
    hist_title: "History",
    hist_empty: "Empty.",
    fav_title: "Favorites",
    fav_empty: "Empty.",
    btn_clear: "Clear All",
    btn_history: "History",
    btn_fav: "Favorites",
    btn_back: "Back",
    btn_scan: "Scan",
    scan_title: "Scan Image",
    scan_desc: "Upload anime image!",
    scan_error: "Failed.",
    scan_no_result: "No match.",
    similarity: "Similarity",
    trending_title: "🔥 Top Airing",
    toast_fav_added: "Saved to Favorites ❤️",
    toast_fav_removed: "Removed from Favorites 💔",
    toast_saved: "Image saved! 📸",
  },
  jp: {
    title: "アニメ検索",
    title_char: "キャラガチャ",
    title_donghua: "中国アニメ",
    desc: "今日の気分に合わせて！",
    desc_char: "ランダムなキャラをゲット！",
    desc_donghua: "最高のアニメーションを発見！",
    opt_random: "全ジャンル",
    btnSearch: "検索",
    btnSearchChar: "召喚",
    btnSearchDonghua: "検索",
    btnLoading: "検索中...",
    btnAgain: "もう一度",
    linkMal: "MALで見る",
    placeholderYear: "年",
    alertNotFound: "なし。",
    alertError: "エラー。",
    btn_trailer: "予告",
    btn_share: "共有",
    btn_save: "保存",
    btn_recommend: "似たアニメ",
    link_mal: "MAL",
    hist_title: "履歴",
    hist_empty: "なし",
    fav_title: "お気に入り",
    fav_empty: "なし",
    btn_clear: "削除",
    btn_history: "履歴",
    btn_fav: "お気に入り",
    btn_back: "戻る",
    btn_scan: "スキャン",
    scan_title: "スクショ検索",
    scan_desc: "画像をアップロード！",
    scan_error: "失敗。",
    scan_no_result: "一致なし。",
    similarity: "一致率",
    trending_title: "🔥 放送中",
    toast_fav_added: "保存しました ❤️",
    toast_fav_removed: "削除しました 💔",
    toast_saved: "保存完了！ 📸",
  },
  cn: {
    title: "动漫搜索",
    title_char: "角色抽卡",
    title_donghua: "搜索国漫",
    desc: "根据你的心情选择！",
    desc_char: "获取随机角色！",
    desc_donghua: "发现精彩国漫！",
    opt_random: "所有类型",
    btnSearch: "搜索",
    btnSearchChar: "召唤",
    btnSearchDonghua: "搜索",
    btnLoading: "搜索中...",
    btnAgain: "再试一次",
    linkMal: "查看MAL",
    placeholderYear: "年份",
    alertNotFound: "未找到。",
    alertError: "错误。",
    btn_trailer: "预告",
    btn_share: "分享",
    btn_save: "保存",
    btn_recommend: "相似",
    link_mal: "MAL",
    hist_title: "历史",
    hist_empty: "无",
    fav_title: "收藏",
    fav_empty: "无",
    btn_clear: "清空",
    btn_history: "历史",
    btn_fav: "收藏",
    btn_back: "返回",
    btn_scan: "扫描",
    scan_title: "截图搜索",
    scan_desc: "上传图片！",
    scan_error: "失败。",
    scan_no_result: "无匹配。",
    similarity: "相似度",
    trending_title: "🔥 热播中",
    toast_fav_added: "已收藏 ❤️",
    toast_fav_removed: "已取消 💔",
    toast_saved: "已保存！ 📸",
  },
};

function toggleFabMenu() {
  fabContainer.classList.toggle("active");
  playSound(sfxClick);
}

document.addEventListener("click", (e) => {
  if (!fabContainer.contains(e.target)) fabContainer.classList.remove("active");
});

function renderQuickTags() {
  quickTagsContainer.innerHTML = quickTags
    .map(
      (tag) =>
        `<button class="tag-btn" onclick="selectQuickTag('${tag.id}')">${tag.name}</button>`
    )
    .join("");
}

function selectQuickTag(id) {
  document.getElementById("inputGenre").value = id;
  playSound(sfxClick);
  getData();
}

function toggleZenMode() {
  body.classList.toggle("zen-mode");
}

function playSound(audio) {
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch((e) => console.log(e));
  }
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "toastOut 0.3s forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    height: "0",
    width: "0",
    videoId: "jfKfPfyJRdk",
    playerVars: { playsinline: 1, loop: 1 },
    events: { onReady: onPlayerReady },
  });
}

function onPlayerReady(event) {
  event.target.setVolume(50);
}

musicBtn.addEventListener("click", () => {
  if (!player) return;
  if (isMusicPlaying) {
    player.pauseVideo();
    musicBtn.innerHTML = icons.music;
    isMusicPlaying = false;
  } else {
    player.playVideo();
    musicBtn.innerHTML = icons.pause;
    isMusicPlaying = true;
  }
});

function switchMode(mode) {
  currentMode = mode;
  card.style.display = "none";
  const t = translations[currentLang];

  btnModeAnime.classList.remove("active");
  btnModeChar.classList.remove("active");
  btnModeDonghua.classList.remove("active");

  if (mode === "character") {
    btnModeChar.classList.add("active");
    filterArea.style.display = "none";
    quickTagsContainer.style.display = "none";
    document.querySelector('[data-lang="title"]').innerText = t.title_char;
    document.querySelector('[data-lang="desc"]').innerText = t.desc_char;
    btn.innerText = t.btnSearchChar;
  } else if (mode === "donghua") {
    btnModeDonghua.classList.add("active");
    filterArea.style.display = "flex";
    quickTagsContainer.style.display = "flex";
    document.querySelector('[data-lang="title"]').innerText = t.title_donghua;
    document.querySelector('[data-lang="desc"]').innerText = t.desc_donghua;
    btn.innerText = t.btnSearchDonghua;
  } else {
    btnModeAnime.classList.add("active");
    filterArea.style.display = "flex";
    quickTagsContainer.style.display = "flex";
    document.querySelector('[data-lang="title"]').innerText = t.title;
    document.querySelector('[data-lang="desc"]').innerText = t.desc;
    btn.innerText = t.btnSearch;
  }
}

// --- HELPER UNTUK PILIH UNIK (NO DUPLICATE) ---
function pickRandomUnique(items, keyName) {
  let seenList = JSON.parse(localStorage.getItem(`seen_${currentMode}`)) || [];

  // Filter item yang belum pernah dilihat
  let unseen = items.filter((item) => !seenList.includes(item[keyName]));

  // Jika semua sudah dilihat, Reset!
  if (unseen.length === 0) {
    seenList = [];
    localStorage.removeItem(`seen_${currentMode}`);
    unseen = items; // Pakai semua item lagi
  }

  // Pilih acak dari yang belum dilihat
  const selected = unseen[Math.floor(Math.random() * unseen.length)];

  // Simpan ID ke daftar seen
  seenList.push(selected[keyName]);
  localStorage.setItem(`seen_${currentMode}`, JSON.stringify(seenList));

  return selected;
}

async function getTrendingAnime() {
  try {
    const response = await fetch(
      "https://api.jikan.moe/v4/top/anime?filter=airing&limit=10"
    );
    const data = await response.json();
    trendingList.innerHTML = data.data
      .map(
        (item) => `
        <div class="trending-item" onclick="fetchAndShowDetails(${item.mal_id})">
            <img src="${item.images.jpg.image_url}" class="trending-poster">
            <div class="trending-title">${item.title}</div>
        </div>
    `
      )
      .join("");
  } catch (error) {}
}

async function fetchAndShowDetails(id) {
  playSound(sfxClick);
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (currentMode !== "anime") switchMode("anime");
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await response.json();
    displayAnimeDetails(data.data);
  } catch (error) {
    showToast(translations[currentLang].alertError, "error");
  }
}

async function getData() {
  playSound(sfxClick);
  btn.disabled = true;
  btn.innerText = translations[currentLang].btnLoading;
  card.style.display = "none";

  if (currentMode === "character") await getCharacter();
  else if (currentMode === "donghua") await getDonghua();
  else await getAnime();
}

async function getDonghua() {
  const genreId = document.getElementById("inputGenre").value;
  let genreFilter =
    genreId && malToAnilistGenre[genreId]
      ? `, genre: "${malToAnilistGenre[genreId]}"`
      : "";
  // Random Page 1-20 untuk variasi
  const randomPage = Math.floor(Math.random() * 20) + 1;
  const query = `query { Page(page: ${randomPage}, perPage: 50) { media(countryOfOrigin: "CN", type: ANIME, sort: POPULARITY_DESC ${genreFilter}) { id title { romaji native } coverImage { large } description averageScore siteUrl status episodes trailer { id site } } } }`;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    const items = result.data.Page.media;
    if (!items.length) {
      showToast(translations[currentLang].alertNotFound, "error");
      return;
    }

    // GUNAKAN FUNGSI UNIK
    const anime = pickRandomUnique(items, "id");

    currentAnimeData = {
      mal_id: anime.id,
      title: anime.title.romaji,
      image: anime.coverImage.large,
      url: anime.siteUrl,
      score: "⭐ " + (anime.averageScore / 10).toFixed(1),
    };

    document.getElementById("imgPoster").src = currentAnimeData.image;
    document.getElementById("titleMain").innerText = currentAnimeData.title;
    document.getElementById("titleJp").innerText = anime.title.native;
    document.getElementById("txtScore").innerText = currentAnimeData.score;
    document.getElementById("txtSynopsis").innerText = anime.description
      ? anime.description.replace(/<[^>]*>?/gm, "")
      : "No desc";
    document.getElementById("linkMal").href = anime.siteUrl;

    addToHistory(currentAnimeData);
    checkFavoriteStatus(currentAnimeData.mal_id);
    playSound(sfxSuccess);
    card.style.display = "block";
  } catch (e) {
    showToast("Error", "error");
  } finally {
    btn.disabled = false;
    btn.innerText = translations[currentLang].btnAgain;
  }
}

async function getCharacter() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/random/characters");
    const data = await response.json();
    const char = data.data;
    // Random character API Jikan selalu random, jadi sulit dilacak uniknya per batch,
    // tapi kita bisa simpan ID nya juga.
    currentAnimeData = {
      mal_id: char.mal_id,
      title: char.name,
      image: char.images.jpg.image_url,
      url: char.url,
      score: "❤️ " + (char.favorites || 0),
    };

    document.getElementById("imgPoster").src = currentAnimeData.image;
    document.getElementById("titleMain").innerText = char.name;
    document.getElementById("titleJp").innerText = char.name_kanji;
    document.getElementById("txtScore").innerText = currentAnimeData.score;
    document.getElementById("txtSynopsis").innerText = char.about
      ? char.about.substring(0, 200) + "..."
      : "-";

    addToHistory(currentAnimeData);
    checkFavoriteStatus(currentAnimeData.mal_id);
    playSound(sfxSuccess);
    card.style.display = "block";
  } catch (e) {
    showToast("Error", "error");
  } finally {
    btn.disabled = false;
    btn.innerText = translations[currentLang].btnAgain;
  }
}

async function getAnime() {
  const genre = document.getElementById("inputGenre").value;
  const year = document.getElementById("inputYear").value;
  // Random Page 1-25 agar tidak selalu page 1
  const randomPage = Math.floor(Math.random() * 25) + 1;

  try {
    let url = `https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&sfw=true&page=${randomPage}`;
    if (genre) url += `&genres=${genre}`;
    if (year) url += `&start_date=${year}-01-01&end_date=${year}-12-31`;

    const response = await fetch(url);
    const data = await response.json();
    if (!data.data.length) {
      showToast(translations[currentLang].alertNotFound, "error");
      return;
    }

    // GUNAKAN FUNGSI UNIK
    const selected = pickRandomUnique(data.data, "mal_id");
    displayAnimeDetails(selected);
  } catch (e) {
    showToast("Error/Limit API", "error");
  } finally {
    btn.disabled = false;
    btn.innerText = translations[currentLang].btnAgain;
  }
}

async function getSimilarAnime() {
  if (!currentAnimeData) return;
  btn.disabled = true;
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${currentAnimeData.mal_id}/recommendations`
    );
    const data = await response.json();
    if (!data.data.length) {
      showToast("Tidak ada mirip", "info");
      btn.disabled = false;
      return;
    }

    // GUNAKAN FUNGSI UNIK UTK MIRIP
    // Tapi API rekomen strukturnya beda (entry.mal_id), jadi ambil manual
    const items = data.data.map((i) => i.entry);
    const selected = pickRandomUnique(items, "mal_id");
    fetchAndShowDetails(selected.mal_id);
  } catch (e) {
    btn.disabled = false;
  }
}

function displayAnimeDetails(anime) {
  currentAnimeData = {
    mal_id: anime.mal_id,
    title: anime.title,
    image: anime.images.jpg.large_image_url,
    url: anime.url,
    score: "⭐ " + (anime.score || "N/A"),
  };

  document.getElementById(
    "dynamic-bg"
  ).style.backgroundImage = `url('${currentAnimeData.image}')`;
  document.getElementById("imgPoster").src = currentAnimeData.image;
  document.getElementById("titleMain").innerText = anime.title;
  document.getElementById("titleJp").innerText = anime.title_japanese;
  document.getElementById("txtScore").innerText = currentAnimeData.score;
  document.getElementById("txtSynopsis").innerText = anime.synopsis
    ? anime.synopsis
    : "-";
  document.getElementById("linkMal").href = anime.url;

  addToHistory(currentAnimeData);
  checkFavoriteStatus(anime.mal_id);
  playSound(sfxSuccess);
  card.style.display = "block";
  btn.disabled = false;
  btn.innerText = translations[currentLang].btnAgain;
  showRandomQuote();
}

function downloadCard() {
  html2canvas(document.getElementById("resultCard"), {
    useCORS: true,
    backgroundColor: "#1b1b1f",
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = `anime-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    showToast(translations[currentLang].toast_saved, "success");
  });
}

function checkFavoriteStatus(id) {
  const favorites = JSON.parse(localStorage.getItem("animeFavorites")) || [];
  const isFav = favorites.some((item) => item.id == id);
  const icon = btnFavorite.querySelector("i");
  if (isFav) {
    icon.classList.replace("far", "fas");
    icon.classList.add("filled-heart");
  } else {
    icon.classList.replace("fas", "far");
    icon.classList.remove("filled-heart");
  }
}

function toggleFavorite() {
  if (!currentAnimeData) return;
  playSound(sfxClick);
  let favorites = JSON.parse(localStorage.getItem("animeFavorites")) || [];
  const index = favorites.findIndex(
    (item) => item.id == currentAnimeData.mal_id
  );

  if (index !== -1) {
    favorites.splice(index, 1);
    showToast(translations[currentLang].toast_fav_removed, "error");
  } else {
    favorites.unshift({ id: currentAnimeData.mal_id, ...currentAnimeData });
    showToast(translations[currentLang].toast_fav_added, "success");
  }
  localStorage.setItem("animeFavorites", JSON.stringify(favorites));
  checkFavoriteStatus(currentAnimeData.mal_id);
  if (favoritesView.style.display === "block") renderFavorites();
  calculateStats();
}

function openFavorites() {
  playSound(sfxClick);
  homeView.style.display = "none";
  favoritesView.style.display = "block";
  const list = document.getElementById("favoritesList");
  const favs = JSON.parse(localStorage.getItem("animeFavorites")) || [];
  list.innerHTML = favs.length
    ? favs
        .map(
          (i) =>
            `<a href="${i.url}" class="history-item"><img src="${i.image}" class="history-thumb"><div class="history-info"><h4>${i.title}</h4><span>${i.score}</span></div></a>`
        )
        .join("")
    : "<p>Kosong</p>";
}
function closeFavorites() {
  playSound(sfxClick);
  favoritesView.style.display = "none";
  homeView.style.display = "block";
}

function openHistory() {
  playSound(sfxClick);
  homeView.style.display = "none";
  historyView.style.display = "block";
  const list = document.getElementById("historyList");
  const hists = JSON.parse(localStorage.getItem("animeHistory")) || [];
  list.innerHTML = hists.length
    ? hists
        .map(
          (i) =>
            `<a href="${i.url}" class="history-item"><img src="${i.image}" class="history-thumb"><div class="history-info"><h4>${i.title}</h4><span>${i.score}</span></div></a>`
        )
        .join("")
    : "<p>Kosong</p>";
}
function closeHistory() {
  playSound(sfxClick);
  historyView.style.display = "none";
  homeView.style.display = "block";
}

function openScan() {
  playSound(sfxClick);
  homeView.style.display = "none";
  scanView.style.display = "block";
}
function closeScan() {
  playSound(sfxClick);
  scanView.style.display = "none";
  homeView.style.display = "block";
}
function openStats() {
  playSound(sfxClick);
  homeView.style.display = "none";
  statsView.style.display = "block";
  calculateStats();
}
function closeStats() {
  playSound(sfxClick);
  statsView.style.display = "none";
  homeView.style.display = "block";
}

function calculateStats() {
  const ctx = document.getElementById("wibuChart").getContext("2d");
  if (myChart) myChart.destroy();
  const h = (JSON.parse(localStorage.getItem("animeHistory")) || []).length;
  const f = (JSON.parse(localStorage.getItem("animeFavorites")) || []).length;
  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Riwayat", "Favorit"],
      datasets: [{ data: [h, f], backgroundColor: ["#4b7bec", "#ff5252"] }],
    },
  });
}

function addToHistory(item) {
  let history = JSON.parse(localStorage.getItem("animeHistory")) || [];
  history = history.filter((h) => h.id !== item.mal_id);
  history.unshift({ id: item.mal_id, ...item });
  if (history.length > 20) history.pop();
  localStorage.setItem("animeHistory", JSON.stringify(history));
}

function clearHistory() {
  playSound(sfxClick);
  if (confirm("Hapus?")) {
    localStorage.removeItem("animeHistory");
    renderHistory();
  }
}

function showRandomQuote() {
  if (!animeQuotes.length) return;
  const idx = Math.floor(Math.random() * animeQuotes.length);
  currentQuote = animeQuotes[idx];
  updateText();
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
});

langBtn.addEventListener("click", () => {
  const langs = ["id", "en", "jp", "cn"];
  let idx = langs.indexOf(currentLang);
  currentLang = langs[(idx + 1) % langs.length];
  langBtn.innerText = currentLang.toUpperCase();
  updateText();
});

function updateText() {
  const t = translations[currentLang];

  if (currentMode === "character") {
    document.querySelector('[data-lang="title"]').innerText = t.title_char;
    document.querySelector('[data-lang="desc"]').innerText = t.desc_char;
    btn.innerText = t.btnSearchChar;
  } else if (currentMode === "donghua") {
    document.querySelector('[data-lang="title"]').innerText = t.title_donghua;
    document.querySelector('[data-lang="desc"]').innerText = t.desc_donghua;
    btn.innerText = t.btnSearchDonghua;
  } else {
    document.querySelector('[data-lang="title"]').innerText = t.title;
    document.querySelector('[data-lang="desc"]').innerText = t.desc;
    btn.innerText = t.btnSearch;
  }

  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (t[key]) {
      if (!["title", "desc", "btn_search"].includes(key)) el.innerText = t[key];
    }
  });

  document.getElementById("inputYear").placeholder = t.placeholderYear;

  if (currentQuote) {
    const quoteText = document.querySelector(".quote-text");
    const quoteChar = document.querySelector(".quote-char");
    if (currentLang === "id") quoteText.innerText = `"${currentQuote.id}"`;
    else if (currentLang === "jp") quoteText.innerText = `"${currentQuote.jp}"`;
    else if (currentLang === "cn") quoteText.innerText = `"${currentQuote.cn}"`;
    else quoteText.innerText = `"${currentQuote.en}"`;
    quoteChar.innerText = `- ${currentQuote.char}`;
  }
}

colorPicker.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--main-color", e.target.value);
});

function startVoiceCommand() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    showToast("Browser tidak mendukung fitur suara.", "error");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "id-ID";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function () {
    btnVoice.classList.add("listening");
    voiceStatus.style.opacity = "1";
  };

  recognition.onend = function () {
    btnVoice.classList.remove("listening");
    voiceStatus.style.opacity = "0";
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    processVoiceCommand(transcript);
  };

  recognition.onerror = function (event) {
    btnVoice.classList.remove("listening");
    voiceStatus.style.opacity = "0";
    if (event.error === "not-allowed") {
      showToast("Izin mikrofon ditolak.", "error");
    } else if (event.error === "no-speech") {
    } else {
      showToast("Error suara: " + event.error, "error");
    }
  };

  recognition.start();
}

function processVoiceCommand(cmd) {
  if (cmd.includes("cari anime") || cmd.includes("carikan")) {
    getData();
    return;
  }

  if (cmd.includes("buka riwayat")) openHistory();
  if (cmd.includes("buka favorit")) openFavorites();
  if (cmd.includes("scan")) openScan();
  if (cmd.includes("kembali")) {
    closeHistory();
    closeFavorites();
    closeScan();
  }

  if (cmd.includes("tahun")) {
    const yearMatch = cmd.match(/\d{4}/);
    if (yearMatch) {
      document.getElementById("inputYear").value = yearMatch[0];
    }
  }

  const genreMap = {
    aksi: "1",
    action: "1",
    petualangan: "2",
    adventure: "2",
    komedi: "4",
    comedy: "4",
    drama: "8",
    fantasi: "10",
    fantasy: "10",
    horor: "14",
    horror: "14",
    misteri: "7",
    mystery: "7",
    romantis: "22",
    romance: "22",
    sekolah: "23",
    school: "23",
    musik: "19",
    music: "19",
  };

  for (let key in genreMap) {
    if (cmd.includes(key)) {
      document.getElementById("inputGenre").value = genreMap[key];
      break;
    }
  }
}

// Initial Call
renderQuickTags();
getTrendingAnime();
renderHistory();
updateText();
showRandomQuote();
calculateStats();
