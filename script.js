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
    char: "Eren Yeager (AOT)",
  },
  {
    id: "Aku tidak akan menarik kembali kata-kataku!",
    en: "I never go back on my word!",
    char: "Naruto Uzumaki",
  },
  {
    id: "Manusia itu kuat karena bisa mengubah dirinya sendiri.",
    en: "Human strength lies in the ability to change yourself.",
    char: "Saitama (One Punch Man)",
  },
  {
    id: "Kehidupan bukan hanya melakukan hal yang menyenangkan.",
    en: "Life is not just doing things that are fun.",
    char: "L (Death Note)",
  },
  {
    id: "Orang lemah tidak punya hak untuk memilih cara mati.",
    en: "The weak don't get to decide how they die.",
    char: "Trafalgar Law (One Piece)",
  },
  {
    id: "Mimpi manusia tidak akan pernah berakhir!",
    en: "People's dreams... never end!",
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
    opt_random: "Semua Genre (Random)",
    btnSearch: "Carikan Anime",
    btnSearchChar: "Panggil Karakter",
    btnSearchDonghua: "Carikan Donghua",
    btnLoading: "Sedang Mencari...",
    btnAgain: "Cari Lagi",
    linkMal: "Lihat di MAL ↗",
    placeholderYear: "Tahun (Opsional, cth: 2023)",
    alertNotFound: "Tidak ditemukan anime dengan kriteria tersebut.",
    alertError: "Terjadi kesalahan. Coba lagi nanti.",
    btn_trailer: "Tonton Trailer",
    btn_share: "Bagikan",
    btn_save: "Simpan Gambar",
    btn_recommend: "Cari yang Mirip",
    link_mal: "Lihat di MAL ↗",
    hist_title: "Riwayat Pencarian",
    hist_empty: "Belum ada riwayat.",
    fav_title: "Anime Favoritku",
    fav_empty: "Belum ada favorit.",
    btn_clear: "Hapus Semua Riwayat",
    btn_history: "Riwayat",
    btn_fav: "Favorit",
    btn_back: "Kembali",
    btn_scan: "Scan",
    scan_title: "Cari dari Screenshot",
    scan_desc: "Upload screenshot anime, aku kasih tahu judulnya!",
    scan_error: "Gagal memproses gambar.",
    scan_no_result: "Tidak ada kecocokan ditemukan.",
    similarity: "Kemiripan",
    trending_title: "🔥 Sedang Tayang",
    toast_fav_added: "Ditambahkan ke Favorit ❤️",
    toast_fav_removed: "Dihapus dari Favorit 💔",
    toast_saved: "Gambar berhasil disimpan! 📸",
    g_action: "Aksi",
    g_adventure: "Petualangan",
    g_comedy: "Komedi",
    g_drama: "Drama",
    g_fantasy: "Fantasi",
    g_horror: "Horror",
    g_mystery: "Misteri",
    g_romance: "Romantis",
    g_scifi: "Fiksi Ilmiah (Sci-Fi)",
    g_slice: "Kehidupan Sehari-hari (SoL)",
    g_sports: "Olahraga",
    g_supernatural: "Supranatural",
    g_suspense: "Tegang / Thriller",
    t_isekai: "Isekai (Dunia Lain)",
    t_mecha: "Mecha (Robot)",
    t_school: "Sekolah",
    t_historical: "Sejarah",
    t_music: "Musik",
    t_psychological: "Psikologis",
    t_military: "Militer",
    t_racing: "Balapan",
    t_vampire: "Vampir",
    t_superpower: "Kekuatan Super",
    t_martial: "Bela Diri",
    d_shounen: "Shounen (Remaja Cowok)",
    d_shoujo: "Shoujo (Remaja Cewek)",
    d_seinen: "Seinen (Dewasa Pria)",
    d_josei: "Josei (Dewasa Wanita)",
    d_kids: "Kids (Anak-anak)",
  },
  en: {
    title: "Search Anime",
    title_char: "Character Gacha",
    title_donghua: "Search Donghua",
    desc: "Find something based on your taste!",
    desc_char: "Get a random waifu/husbando!",
    desc_donghua: "Discover top Chinese Animation!",
    opt_random: "All Genres (Random)",
    btnSearch: "Find Anime",
    btnSearchChar: "Summon Character",
    btnSearchDonghua: "Find Donghua",
    btnLoading: "Searching...",
    btnAgain: "Find Another",
    linkMal: "View on MAL ↗",
    placeholderYear: "Year (Optional, e.g. 2023)",
    alertNotFound: "No anime found with these criteria.",
    alertError: "Something went wrong. Please try again.",
    btn_trailer: "Watch Trailer",
    btn_share: "Share",
    btn_save: "Save Image",
    btn_recommend: "Find Similar",
    link_mal: "View on MAL ↗",
    hist_title: "Search History",
    hist_empty: "No history yet.",
    fav_title: "My Favorites",
    fav_empty: "No favorites yet.",
    btn_clear: "Clear History",
    btn_history: "History",
    btn_fav: "Favorites",
    btn_back: "Back",
    btn_scan: "Scan",
    scan_title: "Search by Screenshot",
    scan_desc: "Upload an anime screenshot, I'll tell you the title!",
    scan_error: "Failed to process image.",
    scan_no_result: "No matches found.",
    similarity: "Similarity",
    trending_title: "🔥 Top Airing",
    toast_fav_added: "Added to Favorites ❤️",
    toast_fav_removed: "Removed from Favorites 💔",
    toast_saved: "Image saved successfully! 📸",
    g_action: "Action",
    g_adventure: "Adventure",
    g_comedy: "Comedy",
    g_drama: "Drama",
    g_fantasy: "Fantasy",
    g_horror: "Horror",
    g_mystery: "Mystery",
    g_romance: "Romance",
    g_scifi: "Sci-Fi",
    g_slice: "Slice of Life",
    g_sports: "Sports",
    g_supernatural: "Supernatural",
    g_suspense: "Suspense / Thriller",
    t_isekai: "Isekai (Another World)",
    t_mecha: "Mecha (Robots)",
    t_school: "School",
    t_historical: "Historical",
    t_music: "Music",
    t_psychological: "Psychological",
    t_military: "Military",
    t_racing: "Racing",
    t_vampire: "Vampire",
    t_superpower: "Super Power",
    t_martial: "Martial Arts",
    d_shounen: "Shounen (Teen Boys)",
    d_shoujo: "Shoujo (Teen Girls)",
    d_seinen: "Seinen (Adult Men)",
    d_josei: "Josei (Adult Women)",
    d_kids: "Kids",
  },
};

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
  const isZen = body.classList.contains("zen-mode");
  zenToggle.innerHTML = isZen ? icons.eyeOff : icons.eye;
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
    setTimeout(() => {
      toast.remove();
    }, 300);
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

async function getTrendingAnime() {
  try {
    const response = await fetch(
      "https://api.jikan.moe/v4/top/anime?filter=airing&limit=10"
    );
    const data = await response.json();
    const trendingData = data.data;

    trendingList.innerHTML = trendingData
      .map(
        (item) => `
            <div class="trending-item" onclick="fetchAndShowDetails(${item.mal_id})">
                <img src="${item.images.jpg.image_url}" alt="${item.title}" class="trending-poster">
                <div class="trending-title">${item.title}</div>
            </div>
        `
      )
      .join("");
  } catch (error) {
    trendingList.innerHTML =
      "<p style='color: #777; padding: 10px;'>Gagal memuat trending.</p>";
  }
}

async function fetchAndShowDetails(id) {
  playSound(sfxClick);
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (currentMode !== "anime") {
    switchMode("anime");
  }

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await response.json();
    const anime = data.data;
    displayAnimeDetails(anime);
  } catch (error) {
    showToast(translations[currentLang].alertError, "error");
  }
}

async function getData() {
  playSound(sfxClick);
  btn.disabled = true;
  btn.innerText = translations[currentLang].btnLoading;
  card.style.display = "none";

  if (currentMode === "character") {
    await getCharacter();
  } else if (currentMode === "donghua") {
    await getDonghua();
  } else {
    await getAnime();
  }
}

async function getDonghua() {
  const genreId = document.getElementById("inputGenre").value;
  const yearVal = document.getElementById("inputYear").value;

  let genreFilter = "";
  let yearFilter = "";

  if (genreId && malToAnilistGenre[genreId]) {
    genreFilter = `, genre: "${malToAnilistGenre[genreId]}"`;
  }

  if (yearVal) {
    yearFilter = `, seasonYear: ${yearVal}`;
  }

  let pageParam = "";
  if (!genreId && !yearVal) {
    const randomPage = Math.floor(Math.random() * 20) + 1;
    pageParam = `page: ${randomPage},`;
  } else {
    pageParam = `page: 1,`;
  }

  const query = `
    query {
      Page(${pageParam} perPage: 50) {
        media(countryOfOrigin: "CN", type: ANIME, sort: POPULARITY_DESC ${genreFilter} ${yearFilter}) {
          id
          title { romaji native }
          coverImage { large }
          description
          averageScore
          siteUrl
          status
          episodes
          trailer { id site }
        }
      }
    }
    `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: query }),
    });

    if (!response.ok) throw new Error("Gagal");
    const result = await response.json();
    const items = result.data.Page.media;

    if (!items || items.length === 0) {
      showToast(translations[currentLang].alertNotFound, "error");
      return;
    }

    const anime = items[Math.floor(Math.random() * items.length)];

    currentAnimeData = {
      mal_id: anime.id,
      title: anime.title.romaji || anime.title.native,
      image: anime.coverImage.large,
      url: anime.siteUrl,
      score: anime.averageScore
        ? `⭐ ${(anime.averageScore / 10).toFixed(1)}`
        : "⭐ N/A",
    };

    const imgUrl = currentAnimeData.image;
    dynamicBg.style.backgroundImage = `url('${imgUrl}')`;
    document.getElementById("imgPoster").src = imgUrl;
    document.getElementById("titleMain").innerText = currentAnimeData.title;
    document.getElementById("titleJp").innerText = anime.title.native || "";

    document.getElementById("txtScore").innerText = currentAnimeData.score;
    document.getElementById("txtEps").innerText = anime.episodes
      ? `${anime.episodes} Eps`
      : "? Eps";
    document.getElementById("txtEps").style.display = "inline-block";
    document.getElementById("txtStatus").innerText = anime.status;
    document.getElementById("txtStatus").style.display = "inline-block";

    let cleanDesc = anime.description
      ? anime.description.replace(/<[^>]*>?/gm, "")
      : "No synopsis available.";
    document.getElementById("txtSynopsis").innerText = cleanDesc;

    document.getElementById("linkMal").href = anime.siteUrl;

    const trailerBtn = document.getElementById("btnTrailer");
    if (anime.trailer && anime.trailer.site === "youtube") {
      trailerBtn.href = `https://www.youtube.com/watch?v=${anime.trailer.id}`;
      trailerBtn.style.display = "flex";
    } else {
      trailerBtn.style.display = "none";
    }

    document.querySelector(".quote-box").style.display = "none";
    document.getElementById("btnRecommend").style.display = "none";

    const shareBtn = document.getElementById("btnShare");
    shareBtn.href = `https://wa.me/?text=${encodeURIComponent(
      "Check this Donghua: " +
        currentAnimeData.title +
        " " +
        currentAnimeData.url
    )}`;

    addToHistory(currentAnimeData);
    checkFavoriteStatus(currentAnimeData.mal_id);
    playSound(sfxSuccess);
    card.style.display = "block";
  } catch (error) {
    showToast(translations[currentLang].alertError, "error");
  } finally {
    btn.disabled = false;
    btn.innerText = translations[currentLang].btnAgain;
  }
}

async function getCharacter() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/random/characters");
    if (!response.ok) throw new Error("Gagal");
    const data = await response.json();
    const char = data.data;

    currentAnimeData = {
      mal_id: char.mal_id,
      title: char.name,
      image: char.images.jpg.image_url,
      url: char.url,
      score: "❤️ " + (char.favorites || 0),
    };

    const imgUrl = currentAnimeData.image;
    dynamicBg.style.backgroundImage = `url('${imgUrl}')`;
    document.getElementById("imgPoster").src = imgUrl;
    document.getElementById("titleMain").innerText = char.name;
    document.getElementById("titleJp").innerText = char.name_kanji || "";

    document.getElementById("txtScore").innerText = currentAnimeData.score;
    document.getElementById("txtEps").style.display = "none";
    document.getElementById("txtStatus").style.display = "none";

    document.getElementById("txtSynopsis").innerText = char.about
      ? char.about.substring(0, 300) + "..."
      : "No description.";
    document.getElementById("linkMal").href = char.url;
    document.getElementById("btnTrailer").style.display = "none";

    document.querySelector(".quote-box").style.display = "none";
    document.getElementById("btnRecommend").style.display = "none";

    const shareBtn = document.getElementById("btnShare");
    shareBtn.href = `https://wa.me/?text=${encodeURIComponent(
      "Check this character: " + char.name + " " + char.url
    )}`;

    addToHistory(currentAnimeData);
    checkFavoriteStatus(currentAnimeData.mal_id);
    playSound(sfxSuccess);
    card.style.display = "block";
  } catch (error) {
    showToast(translations[currentLang].alertError, "error");
  } finally {
    btn.disabled = false;
    btn.innerText = translations[currentLang].btnAgain;
  }
}

async function getAnime() {
  const genre = document.getElementById("inputGenre").value;
  const year = document.getElementById("inputYear").value;

  try {
    let url =
      "https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&sfw=true";
    if (genre) url += `&genres=${genre}`;
    if (year) url += `&start_date=${year}-01-01&end_date=${year}-12-31`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Gagal mengambil data");
    const data = await response.json();

    if (data.data.length === 0) {
      showToast(translations[currentLang].alertNotFound, "error");
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.data.length);
    const anime = data.data[randomIndex];

    displayAnimeDetails(anime);
  } catch (error) {
    showToast(translations[currentLang].alertError, "error");
  } finally {
    btn.disabled = false;
    btn.innerText = translations[currentLang].btnAgain;
  }
}

async function getSimilarAnime() {
  if (!currentAnimeData || !currentAnimeData.mal_id) return;

  playSound(sfxClick);
  btn.disabled = true;
  btn.innerText = translations[currentLang].btnLoading;

  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${currentAnimeData.mal_id}/recommendations`
    );
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      showToast("Tidak ada rekomendasi yang mirip.", "info");
      btn.disabled = false;
      btn.innerText = translations[currentLang].btnAgain;
      return;
    }

    const randomRec = data.data[Math.floor(Math.random() * data.data.length)];
    fetchAndShowDetails(randomRec.entry.mal_id);
  } catch (error) {
    showToast(translations[currentLang].alertError, "error");
    btn.disabled = false;
    btn.innerText = translations[currentLang].btnAgain;
  }
}

function displayAnimeDetails(anime) {
  currentAnimeData = {
    mal_id: anime.mal_id,
    title: anime.title,
    image: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
    url: anime.url,
    score: anime.score,
  };

  const imgUrl = currentAnimeData.image;
  dynamicBg.style.backgroundImage = `url('${imgUrl}')`;

  document.getElementById("imgPoster").src = imgUrl;
  document.getElementById("titleMain").innerText = anime.title;
  document.getElementById("titleJp").innerText = anime.title_japanese || "";

  document.getElementById("txtScore").innerText = anime.score
    ? `⭐ ${anime.score}`
    : "⭐ N/A";
  document.getElementById("txtEps").innerText = anime.episodes
    ? `${anime.episodes} Eps`
    : "? Eps";
  document.getElementById("txtEps").style.display = "inline-block";

  document.getElementById("txtStatus").innerText = anime.status;
  document.getElementById("txtStatus").style.display = "inline-block";

  document.getElementById("txtSynopsis").innerText = anime.synopsis
    ? anime.synopsis
    : "No synopsis available.";
  document.getElementById("linkMal").href = anime.url;

  const trailerBtn = document.getElementById("btnTrailer");
  if (anime.trailer && anime.trailer.url) {
    trailerBtn.href = anime.trailer.url;
    trailerBtn.style.display = "flex";
  } else {
    trailerBtn.style.display = "none";
  }

  const shareBtn = document.getElementById("btnShare");
  const msg = currentLang === "id" ? "Cek anime ini: " : "Check this anime: ";
  shareBtn.href = `https://wa.me/?text=${encodeURIComponent(
    msg + anime.title + " " + anime.url
  )}`;

  document.querySelector(".quote-box").style.display = "block";
  document.getElementById("btnRecommend").style.display = "flex";
  showRandomQuote();

  addToHistory(currentAnimeData);
  checkFavoriteStatus(anime.mal_id);
  playSound(sfxSuccess);
  card.style.display = "block";

  btn.disabled = false;
  btn.innerText = translations[currentLang].btnAgain;
}

function downloadCard() {
  const node = document.getElementById("resultCard");

  html2canvas(node, {
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#1b1b1f",
  })
    .then((canvas) => {
      const link = document.createElement("a");
      link.download = `anime-card-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      showToast(translations[currentLang].toast_saved, "success");
    })
    .catch((err) => {
      showToast("Gagal menyimpan gambar.", "error");
    });
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * animeQuotes.length);
  currentQuote = animeQuotes[randomIndex];

  const textEl = document.querySelector(".quote-text");
  const charEl = document.querySelector(".quote-char");

  if (currentLang === "id") {
    textEl.innerText = `"${currentQuote.id}"`;
  } else {
    textEl.innerText = `"${currentQuote.en}"`;
  }
  charEl.innerText = `- ${currentQuote.char}`;
}

function checkFavoriteStatus(id) {
  const favorites = JSON.parse(localStorage.getItem("animeFavorites")) || [];
  const isFav = favorites.some((item) => item.id == id); // Pake == biar aman string/number
  const icon = btnFavorite.querySelector("i");

  if (isFav) {
    icon.classList.remove("far");
    icon.classList.add("fas", "filled-heart");
  } else {
    icon.classList.remove("fas", "filled-heart");
    icon.classList.add("far");
  }
}

function toggleFavorite() {
  if (!currentAnimeData) return;
  playSound(sfxClick);

  let favorites = JSON.parse(localStorage.getItem("animeFavorites")) || [];
  const id = currentAnimeData.mal_id;

  const existingIndex = favorites.findIndex((item) => item.id == id);

  if (existingIndex !== -1) {
    // SUDAH ADA -> HAPUS
    favorites.splice(existingIndex, 1);
    showToast(translations[currentLang].toast_fav_removed, "error");
  } else {
    // BELUM ADA -> TAMBAH
    const newItem = {
      id: currentAnimeData.mal_id,
      title: currentAnimeData.title,
      image: currentAnimeData.images
        ? currentAnimeData.images.jpg.large_image_url ||
          currentAnimeData.images.jpg.image_url
        : currentAnimeData.image,
      url: currentAnimeData.url,
      score: currentAnimeData.score,
    };
    favorites.unshift(newItem);
    showToast(translations[currentLang].toast_fav_added, "success");
  }

  localStorage.setItem("animeFavorites", JSON.stringify(favorites));
  checkFavoriteStatus(id);

  // Kalau lagi di halaman favorit, refresh listnya
  if (favoritesView.style.display === "block") {
    renderFavorites();
  }
  calculateStats();
}

function openFavorites() {
  playSound(sfxClick);
  homeView.style.display = "none";
  historyView.style.display = "none";
  scanView.style.display = "none";
  statsView.style.display = "none";
  favoritesView.style.display = "block";
  renderFavorites();
}

function closeFavorites() {
  playSound(sfxClick);
  favoritesView.style.display = "none";
  homeView.style.display = "block";
}

function renderFavorites() {
  const list = document.getElementById("favoritesList");
  const favorites = JSON.parse(localStorage.getItem("animeFavorites")) || [];
  const emptyMsg = document.getElementById("favEmptyMsg");

  if (favorites.length === 0) {
    list.innerHTML = "";
    emptyMsg.style.display = "block";
    emptyMsg.innerText = translations[currentLang].fav_empty;
    return;
  }

  emptyMsg.style.display = "none";
  list.innerHTML = favorites
    .map(
      (item) => `
        <a href="${item.url}" target="_blank" class="history-item">
            <img src="${item.image}" alt="thumb" class="history-thumb">
            <div class="history-info">
                <h4 class="history-title">${item.title}</h4>
                <span class="history-score">${
                  item.score && item.score.toString().includes("❤")
                    ? item.score
                    : item.score
                    ? "⭐ " + item.score
                    : "N/A"
                }</span>
            </div>
        </a>
    `
    )
    .join("");
}

function openHistory() {
  playSound(sfxClick);
  homeView.style.display = "none";
  favoritesView.style.display = "none";
  scanView.style.display = "none";
  statsView.style.display = "none";
  historyView.style.display = "block";
  renderHistory();
}

function closeHistory() {
  playSound(sfxClick);
  historyView.style.display = "none";
  homeView.style.display = "block";
}

function renderHistory() {
  const list = document.getElementById("historyList");
  const history = JSON.parse(localStorage.getItem("animeHistory")) || [];

  if (history.length === 0) {
    const emptyText = translations[currentLang].hist_empty;
    list.innerHTML = `<p class="empty-msg" data-lang="hist_empty">${emptyText}</p>`;
    return;
  }

  list.innerHTML = history
    .map(
      (item) => `
        <a href="${item.url}" target="_blank" class="history-item">
            <img src="${item.image}" alt="thumb" class="history-thumb">
            <div class="history-info">
                <h4 class="history-title">${item.title}</h4>
                <span class="history-score">${
                  item.score && item.score.toString().includes("❤")
                    ? item.score
                    : item.score
                    ? "⭐ " + item.score
                    : "N/A"
                }</span>
            </div>
        </a>
    `
    )
    .join("");
}

function addToHistory(itemData) {
  let history = JSON.parse(localStorage.getItem("animeHistory")) || [];

  history = history.filter((item) => item.id !== itemData.mal_id);

  const historyItem = {
    id: itemData.mal_id,
    title: itemData.title,
    image:
      itemData.image || (itemData.images ? itemData.images.jpg.image_url : ""),
    url: itemData.url,
    score: itemData.score,
  };

  history.unshift(historyItem);

  if (history.length > 20) {
    history.pop();
  }

  localStorage.setItem("animeHistory", JSON.stringify(history));
  calculateStats();
}

function clearHistory() {
  playSound(sfxClick);
  if (confirm("Hapus semua riwayat?")) {
    localStorage.removeItem("animeHistory");
    renderHistory();
    calculateStats();
  }
}

function openScan() {
  playSound(sfxClick);
  homeView.style.display = "none";
  historyView.style.display = "none";
  favoritesView.style.display = "none";
  statsView.style.display = "none";
  scanView.style.display = "block";
}

function closeScan() {
  playSound(sfxClick);
  scanView.style.display = "none";
  homeView.style.display = "block";
}

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById("imagePreview");
      img.src = e.target.result;
      img.style.display = "block";
      document.getElementById("uploadPlaceholder").style.display = "none";
      document.getElementById("btnScanSearch").style.display = "inline-block";
    };
    reader.readAsDataURL(file);
  }
}

async function searchByImage() {
  const fileInput = document.getElementById("imageInput");
  if (!fileInput.files[0]) return;

  playSound(sfxClick);
  document.getElementById("btnScanSearch").disabled = true;
  document.getElementById("scanLoading").style.display = "block";
  document.getElementById("scanResult").innerHTML = "";

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  try {
    const response = await fetch(
      "https://api.trace.moe/search?cutBorders&anilistInfo",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("API Error");
    const data = await response.json();

    document.getElementById("scanLoading").style.display = "none";
    document.getElementById("btnScanSearch").disabled = false;

    if (!data.result || data.result.length === 0) {
      showToast(translations[currentLang].scan_no_result, "info");
      return;
    }

    displayScanResults(data.result);
    playSound(sfxSuccess);
  } catch (err) {
    showToast(translations[currentLang].scan_error, "error");
    document.getElementById("scanLoading").style.display = "none";
    document.getElementById("btnScanSearch").disabled = false;
  }
}

function displayScanResults(results) {
  const container = document.getElementById("scanResult");
  const topResults = results.slice(0, 3);

  container.innerHTML = topResults
    .map(
      (item) => `
    <div class="scan-result-card">
      <video class="scan-video" src="${item.video}" autoplay loop muted></video>
      <div class="scan-info">
        <h3 class="scan-title">${
          item.anilist.title.romaji || item.anilist.title.native
        }</h3>
        <p class="scan-meta">Episode: ${item.episode || "?"}</p>
        <p class="scan-meta">${translations[currentLang].similarity}: ${(
        item.similarity * 100
      ).toFixed(1)}%</p>
      </div>
    </div>
  `
    )
    .join("");
}

function openStats() {
  playSound(sfxClick);
  homeView.style.display = "none";
  historyView.style.display = "none";
  favoritesView.style.display = "none";
  scanView.style.display = "none";
  statsView.style.display = "block";
  calculateStats();
}

function closeStats() {
  playSound(sfxClick);
  statsView.style.display = "none";
  homeView.style.display = "block";
}

function calculateStats() {
  const history = JSON.parse(localStorage.getItem("animeHistory")) || [];
  const favorites = JSON.parse(localStorage.getItem("animeFavorites")) || [];

  const histCount = history.length;
  const favCount = favorites.length;
  const total = histCount + favCount;

  document.getElementById("statHistory").innerText = histCount;
  document.getElementById("statFav").innerText = favCount;

  let level = "Newbie";
  if (total > 5) level = "Anime Fan";
  if (total > 20) level = "Otaku";
  if (total > 50) level = "Wibu Sepuh";
  if (total > 100) level = "Kami-sama";

  document.getElementById("wibuLevel").innerText = level;

  if (myChart) {
    myChart.destroy();
  }

  const ctx = document.getElementById("wibuChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Riwayat", "Favorit"],
      datasets: [
        {
          data: [histCount, favCount],
          backgroundColor: ["#4b7bec", "#ff5252"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#aaa" },
        },
      },
    },
  });
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    themeBtn.innerHTML = icons.moon;
    themeBtn.style.backgroundColor = "#2e51a2";
  } else {
    themeBtn.innerHTML = icons.sun;
    themeBtn.style.backgroundColor = "#4b7bec";
  }
});

langBtn.addEventListener("click", () => {
  if (currentLang === "id") {
    currentLang = "en";
    langBtn.innerText = "EN";
  } else {
    currentLang = "id";
    langBtn.innerText = "ID";
  }
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

  if (currentLang === "id") {
    document.getElementById("grpGenre").label = "Genre Utama";
    document.getElementById("grpTheme").label = "Tema";
    document.getElementById("grpDemographic").label = "Target Penonton";
  } else {
    document.getElementById("grpGenre").label = "Main Genres";
    document.getElementById("grpTheme").label = "Themes";
    document.getElementById("grpDemographic").label = "Demographics";
  }

  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (t[key]) {
      if (!["title", "desc", "btn_search"].includes(key)) {
        el.innerText = t[key];
      }
    }
  });

  document.getElementById("inputYear").placeholder = t.placeholderYear;

  const histEmpty = document.querySelector("#historyList .empty-msg");
  if (histEmpty) histEmpty.innerText = t.hist_empty;

  const favEmpty = document.getElementById("favEmptyMsg");
  if (favEmpty) favEmpty.innerText = t.fav_empty;

  if (currentQuote) {
    const quoteText = document.querySelector(".quote-text");
    if (currentLang === "id") {
      quoteText.innerText = `"${currentQuote.id}"`;
    } else {
      quoteText.innerText = `"${currentQuote.en}"`;
    }
  }
}

colorPicker.addEventListener("input", (e) => {
  const newColor = e.target.value;
  document.documentElement.style.setProperty("--main-color", newColor);
  localStorage.setItem("themeColor", newColor);
});

const savedColor = localStorage.getItem("themeColor");
if (savedColor) {
  document.documentElement.style.setProperty("--main-color", savedColor);
  colorPicker.value = savedColor;
}

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
