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
const btnScanSearch = document.getElementById("btnScanSearch");
const btnProfile = document.getElementById("btnProfile");
console.log("btnProfile element:", btnProfile);
console.log("btnProfile ID:", document.getElementById("btnProfile"));

let currentLang = "id";
let currentMode = "anime";
let player;
let isMusicPlaying = false;
let currentAnimeData = null;
let currentQuote = null;
let myChart = null;
let lastView = "homeView";
let searchResults = [];

const omikujiData = [
  {
    title: "Daikichi (大吉)",
    desc: "Keberuntungan Besar! Gacha-mu pasti wangy hari ini.",
    color: "#e74c3c",
  },
  {
    title: "Chukichi (中吉)",
    desc: "Lumayan Beruntung. Hati-hati spoiler anime.",
    color: "#e67e22",
  },
  {
    title: "Shokichi (小吉)",
    desc: "Keberuntungan Kecil. Waifu-mu mungkin notice.",
    color: "#f1c40f",
  },
  {
    title: "Kichi (吉)",
    desc: "Biasa Saja. Jangan skip opening anime hari ini.",
    color: "#2ecc71",
  },
  {
    title: "Suekichi (末吉)",
    desc: "Keberuntungan Akhir. Internet mungkin agak lemot.",
    color: "#3498db",
  },
  {
    title: "Kyo (凶)",
    desc: "Sial... Hati-hati sama orang berkacamata hari ini.",
    color: "#9b59b6",
  },
  {
    title: "Daikyo (大凶)",
    desc: "Sial Besar! Jangan gacha dulu, simpan primogem/ticket-mu!",
    color: "#2c3e50",
  },
  {
    title: "Hankichi (半吉)",
    desc: "Setengah Beruntung. Anime favoritmu dapat filler episode.",
    color: "#1abc9c",
  },
  {
    title: "Mikichi (微吉)",
    desc: "Keberuntungan Mini. Karaktermu mungkin kena nerf di next patch.",
    color: "#8e44ad",
  },
  {
    title: "Ultra Kichi (超吉)",
    desc: "Keberuntungan OP! Kamu auto MC hari ini.",
    color: "#ff6f61",
  },
  {
    title: "KiraKichi (煌吉)",
    desc: "Keberuntungan Berkilau! Efek bintang anime menyertaimu.",
    color: "#f39c12",
  },
  {
    title: "Tsundere Kyo (拗凶)",
    desc: "Sial Tsundere. Akan sial, tapi ‘bukan karena kamu spesial atau apa!!’",
    color: "#c0392b",
  },
  {
    title: "Neko Kichi (猫吉)",
    desc: "Keberuntungan Kucing. Kamu akan melihat kucing random hari ini.",
    color: "#ffcc00",
  },
  {
    title: "Weeb Kyo (極凶)",
    desc: "Sial Para Wibu. Hindari debat sub vs dub hari ini.",
    color: "#34495e",
  },
  {
    title: "Yami Kyo (闇凶)",
    desc: "Aura gelap menghampiri… HP-mu mungkin lowbat di saat genting.",
    color: "#000000",
  },
  {
    title: "Ghost Kichi (霊吉)",
    desc: "Keberuntungan Arwah. Jangan kaget kalau pintu kamar bunyi sendiri.",
    color: "#5d6d7e",
  },
  {
    title: "Kowai Daikyo (怖大凶)",
    desc: "Sial menyeramkan. Jangan bercermin tengah malam.",
    color: "#2f3640",
  },

  {
    title: "Waifu Kichi (嫁吉)",
    desc: "Waifu-mu tersenyum hari ini. Imouto vibes meningkat 300%.",
    color: "#ff9ff3",
  },
  {
    title: "Husbando Kichi (夫吉)",
    desc: "Husbando-mu bakal protect kamu dari sial kecil hari ini.",
    color: "#54a0ff",
  },
  {
    title: "TsunWaifu (嫁凶)",
    desc: "Waifu-mu lagi ngambek. Jangan godain waifu lain dulu.",
    color: "#eb3b5a",
  },

  {
    title: "SSR Drop (超幸)",
    desc: "Peluang SSR meningkat 0.0000001% (tetap dicoba).",
    color: "#feca57",
  },
  {
    title: "Rate Up Scam (詐吉)",
    desc: "Rate up ≠ guaranteed. Kamu sudah tahu.",
    color: "#576574",
  },
  {
    title: "Pity Saver (保吉)",
    desc: "Lagi hoki tapi cuma dikit. Pity aman.",
    color: "#10ac84",
  },
  {
    title: "Ultra Pity (極保)",
    desc: "Beruntung… tapi harus 90 pull dulu. Good luck.",
    color: "#222f3e",
  },

  {
    title: "Matsuri Kichi (祭吉)",
    desc: "Ada vibe festival hari ini. Mood OP.",
    color: "#f368e0",
  },
  {
    title: "Takoyaki Kichi (蛸吉)",
    desc: "Takoyaki hari ini lebih enak dari biasanya.",
    color: "#d35400",
  },
  {
    title: "Omatsuri Kyo (祭凶)",
    desc: "Kamu lupa bawa uang cash ke festival… sial kecil.",
    color: "#6c5ce7",
  },

  {
    title: "Warm Kichi (暖吉)",
    desc: "Hari ini bakal ada hal kecil yang bikin senyum.",
    color: "#ffda79",
  },
  {
    title: "Calm Kichi (静吉)",
    desc: "Ketenangan datang. Cocok binge anime healing.",
    color: "#7efff5",
  },
  {
    title: "Coffee Kichi (珈吉)",
    desc: "Minuman panas bakal nge-boost harimu.",
    color: "#a67c52",
  },

  {
    title: "Plot Twist Kyo (捻凶)",
    desc: "Hati-hati, sesuatu bakal berubah tiba-tiba hari ini.",
    color: "#6c757d",
  },
  {
    title: "Isekai Ticket (転吉)",
    desc: "Kamu hampir ke-isekai pas nyebrang jalan.",
    color: "#00cec9",
  },
  {
    title: "Yandere Kyo (病凶)",
    desc: "Jangan terlalu charming… ada yang ngikutin.",
    color: "#c23616",
  },

  {
    title: "Cursed Kichi (呪吉)",
    desc: "Keberuntungan… tapi sensasinya salah.",
    color: "#9b59b6",
  },
  {
    title: "rng.exe (乱吉)",
    desc: "Semua keberuntungan random hari ini. Bisa hoki, bisa nggak.",
    color: "#55efc4",
  },
  {
    title: "404 Luck Not Found",
    desc: "Keberuntunganmu hilang dari server.",
    color: "#636e72",
  },
];

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
  // Attack on Titan
  {
    id: "Jika kau tidak berjuang, kau tidak bisa menang.",
    en: "If you don't fight, you can't win.",
    jp: "戦わなければ勝てない。",
    cn: "如果你不战斗，你就赢不了。",
    char: "Eren Yeager (Attack on Titan)",
  },
  {
    id: "Tidak ada yang bisa mengubah apa pun tanpa melepaskan sesuatu.",
    en: "Nothing can be changed without giving up something.",
    jp: "何かを変えることができる人間がいるとすれば、その人は大事なものを捨てることができる人だ。",
    cn: "如果不放弃什么，就无法改变什么。",
    char: "Armin Arlert (Attack on Titan)",
  },
  {
    id: "Dunia ini kejam, tapi juga sangat indah.",
    en: "The world is cruel, but also very beautiful.",
    jp: "世界は残酷だ。そして、とても美しい。",
    cn: "这个世界很残酷，但也很美丽。",
    char: "Mikasa Ackerman (Attack on Titan)",
  },

  // Naruto Series
  {
    id: "Aku tidak akan menarik kembali kata-kataku!",
    en: "I never go back on my word!",
    jp: "俺は自分の言葉を曲げない！",
    cn: "我绝不食言！",
    char: "Naruto Uzumaki (Naruto)",
  },
  {
    id: "Orang bodoh yang tahu kebodohannya adalah orang bijak.",
    en: "A fool who knows he's a fool is wise.",
    jp: "自分が馬鹿だと知る馬鹿は賢者だ。",
    cn: "知道自己愚蠢的傻瓜是智者。",
    char: "Itachi Uchiha (Naruto)",
  },
  {
    id: "Kau tidak bisa mengubah masa lalu, tapi kau bisa belajar darinya.",
    en: "You can't change the past, but you can learn from it.",
    jp: "過去は変えられないが、学ぶことはできる。",
    cn: "你无法改变过去，但可以从中学习。",
    char: "Kakashi Hatake (Naruto)",
  },
  {
    id: "Mereka yang melanggar aturan adalah sampah, tapi yang mengabaikan teman lebih buruk dari sampah.",
    en: "Those who break the rules are scum, but those who abandon their friends are worse than scum.",
    jp: "ルールを破る奴はクズ呼ばわりされる。けどな、仲間を大切にしない奴はそれ以上のクズだ。",
    cn: "违反规则的人是废物，但抛弃同伴的人比废物更糟。",
    char: "Obito Uchiha (Naruto)",
  },
  {
    id: "Jangan berhenti ketika kamu lelah. Berhentilah ketika kamu selesai.",
    en: "Don't stop when you're tired. Stop when you're done.",
    jp: "疲れた時に止まるな。終わった時に止まれ。",
    cn: "不要在累的时候停下，要在完成时停下。",
    char: "Might Guy (Naruto)",
  },
  {
    id: "Orang yang memaafkan diri sendiri dan hanya mengingat kesalahannya akan terluka.",
    en: "Those who forgive themselves and remember only their mistakes will get hurt.",
    jp: "自分を許し、自分の過ちだけを覚えている者は傷つく。",
    cn: "原谅自己却只记得错误的人会受伤。",
    char: "Nagato (Naruto)",
  },

  // One Piece
  {
    id: "Orang lemah tidak punya hak untuk memilih cara mati.",
    en: "The weak don't get to decide how they die.",
    jp: "弱者に死に方を選ぶ権利はない。",
    cn: "弱者没有选择死法的权利。",
    char: "Trafalgar Law (One Piece)",
  },
  {
    id: "Mimpi manusia tidak akan pernah berakhir!",
    en: "People's dreams never end!",
    jp: "人の夢は終わらねェ！",
    cn: "人的梦想永远不会结束！",
    char: "Marshall D. Teach (One Piece)",
  },
  {
    id: "Jatuh tujuh kali, bangkit delapan kali.",
    en: "Fall down seven times, stand up eight.",
    jp: "七転び八起き。",
    cn: "跌倒七次，站起八次。",
    char: "Roronoa Zoro (One Piece)",
  },
  {
    id: "Jangan pernah melupakan kenapa kau memulai perjalanan ini.",
    en: "Never forget why you started this journey.",
    jp: "なぜこの旅を始めたか忘れるな。",
    cn: "永远不要忘记为什么开始这段旅程。",
    char: "Monkey D. Luffy (One Piece)",
  },
  {
    id: "Raja Bajak Laut adalah yang paling bebas di laut ini!",
    en: "The Pirate King is the freest person on the seas!",
    jp: "海賊王は海で一番自由な奴だ！",
    cn: "海贼王是海上最自由的人！",
    char: "Monkey D. Luffy (One Piece)",
  },
  {
    id: "Tidak ada yang namanya kebetulan di dunia ini.",
    en: "There's no such thing as coincidence in this world.",
    jp: "この世に偶然なんてものはない。",
    cn: "这个世界上没有巧合。",
    char: "Nico Robin (One Piece)",
  },

  // My Hero Academia
  {
    id: "Kau harus menjadi pahlawan dalam hidupmu sendiri.",
    en: "You have to be the hero of your own story.",
    jp: "自分の物語の主人公になれ。",
    cn: "你必须成为自己故事的主角。",
    char: "All Might (My Hero Academia)",
  },
  {
    id: "Jangan takut dengan kegagalan. Takutlah tidak mencoba.",
    en: "Don't be afraid of failure. Be afraid of not trying.",
    jp: "失敗を恐れるな。挑戦しないことを恐れろ。",
    cn: "不要害怕失败，要害怕不去尝试。",
    char: "Izuku Midoriya (My Hero Academia)",
  },
  {
    id: "Kau tidak kalah sampai kau berhenti berusaha.",
    en: "You haven't lost until you stop trying.",
    jp: "諦めなければ負けじゃない。",
    cn: "只要不放弃，就没有失败。",
    char: "Eijiro Kirishima (My Hero Academia)",
  },
  {
    id: "Jika kau merasa tidak bisa menyelamatkan satu orang di depanmu, bagaimana kau bisa jadi pahlawan?",
    en: "If you can't save one person in front of you, how can you be a hero?",
    jp: "目の前の一人を救えないで、どうやってヒーローになれる？",
    cn: "如果你救不了眼前的一个人，怎么能成为英雄？",
    char: "Shoto Todoroki (My Hero Academia)",
  },

  // Demon Slayer
  {
    id: "Aku ingin menjadi lebih kuat, bukan hanya untuk diriku sendiri.",
    en: "I want to become stronger, not just for myself.",
    jp: "強くなりたい。自分のためだけじゃなく。",
    cn: "我想变强，不仅仅是为了自己。",
    char: "Tanjiro Kamado (Demon Slayer)",
  },
  {
    id: "Jangan menyerah! Bergeraklah maju! Kau punya kaki yang kuat untuk berdiri!",
    en: "Don't give up! Move forward! You have strong legs to stand on!",
    jp: "諦めるな！前に進め！立つための強い足がある！",
    cn: "不要放弃！向前走！你有坚强的双腿！",
    char: "Kyojuro Rengoku (Demon Slayer)",
  },
  {
    id: "Lemah bukan masalah. Yang penting adalah tetap berjuang!",
    en: "Being weak is not a problem. What matters is to keep fighting!",
    jp: "弱いことは問題じゃない。大事なのは戦い続けることだ！",
    cn: "软弱不是问题，重要的是继续战斗！",
    char: "Giyu Tomioka (Demon Slayer)",
  },

  // Death Note
  {
    id: "Kehidupan bukan hanya melakukan hal yang menyenangkan.",
    en: "Life is not just doing things that are fun.",
    jp: "人生は楽しいことだけじゃない。",
    cn: "生活不仅仅是做有趣的事。",
    char: "L Lawliet (Death Note)",
  },
  {
    id: "Dunia ini busuk dan mereka yang membuatnya busuk layak mati.",
    en: "This world is rotten and those who make it rotten deserve to die.",
    jp: "この世界は腐っている。腐らせた奴らは死ぬべきだ。",
    cn: "这个世界腐败了，让它腐败的人该死。",
    char: "Light Yagami (Death Note)",
  },

  // Tokyo Ghoul
  {
    id: "Rasa sakit adalah cara terbaik untuk merasa hidup.",
    en: "Pain is the best way to feel alive.",
    jp: "痛みは生きている実感だ。",
    cn: "痛苦是感受活着的最好方式。",
    char: "Kaneki Ken (Tokyo Ghoul)",
  },
  {
    id: "Semua penderitaan yang kualami akan menjadi kekuatanku.",
    en: "All the suffering I experienced will become my strength.",
    jp: "経験した苦しみは全て力になる。",
    cn: "我经历的所有痛苦都会成为我的力量。",
    char: "Kaneki Ken (Tokyo Ghoul)",
  },
  {
    id: "Dunia ini salah, tapi itu bukan alasan untuk menyerah.",
    en: "The world is wrong, but that's not a reason to give up.",
    jp: "世界は間違っているが、諦める理由にはならない。",
    cn: "世界是错的，但这不是放弃的理由。",
    char: "Touka Kirishima (Tokyo Ghoul)",
  },

  // Fullmetal Alchemist
  {
    id: "Hidup adalah tentang menciptakan dirimu sendiri.",
    en: "Life is about creating yourself.",
    jp: "人生は自分を創ることだ。",
    cn: "生活就是创造自己。",
    char: "Edward Elric (Fullmetal Alchemist)",
  },
  {
    id: "Tidak ada yang sempurna. Dunia ini tidak sempurna, tapi itulah yang membuatnya indah.",
    en: "Nothing's perfect. The world isn't perfect, but that's what makes it beautiful.",
    jp: "完璧なものなんてない。世界は不完全だが、だからこそ美しい。",
    cn: "没有什么是完美的。世界不完美，但这就是美。",
    char: "Roy Mustang (Fullmetal Alchemist)",
  },
  {
    id: "Manusia tidak bisa mendapatkan sesuatu tanpa mengorbankan sesuatu yang lain.",
    en: "Humankind cannot gain anything without first giving something in return.",
    jp: "人は何かの犠牲なしに何も得ることはできない。",
    cn: "人类不付出代价就得不到任何东西。",
    char: "Alphonse Elric (Fullmetal Alchemist)",
  },

  // One Punch Man
  {
    id: "Manusia itu kuat karena bisa mengubah dirinya sendiri.",
    en: "Human strength lies in the ability to change yourself.",
    jp: "人間は変われるから強いんだ。",
    cn: "人类之所以强大，是因为他们能改变自己。",
    char: "Saitama (One Punch Man)",
  },
  {
    id: "Aku jadi pahlawan hanya untuk hobi.",
    en: "I'm a hero for fun.",
    jp: "趣味でヒーローをやってる者だ。",
    cn: "我只是兴趣使然的英雄。",
    char: "Saitama (One Punch Man)",
  },

  // Code Geass
  {
    id: "Terkadang kau harus melakukan hal yang salah demi hal yang benar.",
    en: "Sometimes you have to do wrong to do right.",
    jp: "時には間違ったことをして正しいことをする。",
    cn: "有时你必须做错事才能做对事。",
    char: "Lelouch Lamperouge (Code Geass)",
  },
  {
    id: "Orang yang bisa menembakkan senjata adalah orang yang siap ditembak.",
    en: "Those who shoot must be prepared to be shot.",
    jp: "撃っていいのは撃たれる覚悟がある奴だけだ。",
    cn: "只有准备好被射击的人才能开枪。",
    char: "Lelouch Lamperouge (Code Geass)",
  },

  // Fairy Tail
  {
    id: "Ketakutan bukan kejahatan. Itu memberitahu kamu apa kelemahanmu.",
    en: "Fear is not evil. It tells you what your weakness is.",
    jp: "恐怖は悪ではない。弱さを教えてくれる。",
    cn: "恐惧不是邪恶，它告诉你弱点在哪。",
    char: "Gildarts Clive (Fairy Tail)",
  },
  {
    id: "Masa depan adalah milik mereka yang percaya pada keindahan impian mereka.",
    en: "The future belongs to those who believe in the beauty of their dreams.",
    jp: "未来は夢の美しさを信じる者のものだ。",
    cn: "未来属于相信梦想之美的人。",
    char: "Lucy Heartfilia (Fairy Tail)",
  },

  // Haikyuu!!
  {
    id: "Masa lalu itu berharga karena sudah berlalu.",
    en: "The past is precious because it's over.",
    jp: "過去は過ぎたからこそ貴重だ。",
    cn: "过去之所以珍贵，是因为已经过去。",
    char: "Shoyo Hinata (Haikyuu!!)",
  },
  {
    id: "Kalah atau menang tidak penting. Yang penting adalah kau sudah mencoba yang terbaik.",
    en: "Winning or losing doesn't matter. What matters is you did your best.",
    jp: "勝ち負けは関係ない。大事なのは全力を尽くしたかだ。",
    cn: "输赢不重要，重要的是你尽力了。",
    char: "Tobio Kageyama (Haikyuu!!)",
  },

  // Hunter x Hunter
  {
    id: "Kau harus menikmati sensasi kecil kehidupan sehari-hari.",
    en: "You should enjoy the little detours in life.",
    jp: "人生の小さな寄り道を楽しむべきだ。",
    cn: "你应该享受生活中的小曲折。",
    char: "Ging Freecss (Hunter x Hunter)",
  },
  {
    id: "Tidak ada gunanya menyesali apa yang sudah terjadi.",
    en: "There's no point in regretting what's already happened.",
    jp: "起こったことを後悔しても意味がない。",
    cn: "后悔已经发生的事情没有意义。",
    char: "Killua Zoldyck (Hunter x Hunter)",
  },

  // Steins;Gate
  {
    id: "Orang itu adalah ilmuwan gila, sangat keren!",
    en: "I am a mad scientist, so cool!",
    jp: "俺はマッドサイエンティスト、そう、クールなんだ！",
    cn: "我是疯狂科学家，超酷的！",
    char: "Okabe Rintarou (Steins;Gate)",
  },

  // Dr. Stone
  {
    id: "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas.",
    en: "Failure is a chance to start again more intelligently.",
    jp: "失敗はより賢く再出発する機会だ。",
    cn: "失败是更聪明地重新开始的机会。",
    char: "Senku Ishigami (Dr. Stone)",
  },
  {
    id: "Sains adalah kekuatan yang bisa menyelamatkan dunia!",
    en: "Science is the power that can save the world!",
    jp: "科学は世界を救う力だ！",
    cn: "科学是拯救世界的力量！",
    char: "Senku Ishigami (Dr. Stone)",
  },

  // Black Clover
  {
    id: "Keajaiban hanya terjadi pada mereka yang tidak pernah menyerah.",
    en: "Miracles only happen to those who never give up.",
    jp: "奇跡は諦めない者にだけ起こる。",
    cn: "奇迹只发生在永不放弃的人身上。",
    char: "Yuno (Black Clover)",
  },
  {
    id: "Aku tidak akan berhenti sampai aku jadi Wizard King!",
    en: "I won't stop until I become the Wizard King!",
    jp: "魔法帝になるまで止まらない！",
    cn: "我不会停下直到成为魔法帝！",
    char: "Asta (Black Clover)",
  },

  // Gintama
  {
    id: "Jangan menangis karena sudah berakhir, tersenyumlah karena pernah terjadi.",
    en: "Don't cry because it's over, smile because it happened.",
    jp: "終わったから泣くな。起きたから笑え。",
    cn: "不要因为结束而哭泣，要因为曾经发生而微笑。",
    char: "Gintoki Sakata (Gintama)",
  },
  {
    id: "Hidup ini seperti sabuk pengaman. Kadang menjengkelkan tapi akan menyelamatkanmu.",
    en: "Life is like a seatbelt. Sometimes annoying but it will save you.",
    jp: "人生はシートベルトのようだ。時に邪魔だが命を救う。",
    cn: "生活就像安全带，有时讨厌但会救你。",
    char: "Gintoki Sakata (Gintama)",
  },

  // Gurren Lagann
  {
    id: "Tidak ada yang tidak mungkin bagi mereka yang percaya!",
    en: "Nothing is impossible for those who believe!",
    jp: "信じる者には不可能はない！",
    cn: "对于相信的人来说，没有不可能！",
    char: "Kamina (Gurren Lagann)",
  },
  {
    id: "Bukan bintang yang menjadi tujuanmu, tapi masa depan yang kau ciptakan!",
    en: "It's not the stars that are your goal, but the future you create!",
    jp: "目指すのは星じゃない。創る未来だ！",
    cn: "目标不是星星，而是你创造的未来！",
    char: "Simon (Gurren Lagann)",
  },

  // Mob Psycho 100
  {
    id: "Jika semua orang itu tidak spesial, mungkin kau bisa jadi pahlawanmu sendiri.",
    en: "If everyone is not special, maybe you can be your own hero.",
    jp: "みんなが特別じゃないなら、自分のヒーローになれるかもしれない。",
    cn: "如果每个人都不特别，也许你可以成为自己的英雄。",
    char: "Reigen Arataka (Mob Psycho 100)",
  },
  {
    id: "Hidup bukan tentang menjadi yang terbaik, tapi menjadi lebih baik.",
    en: "Life is not about being the best, but being better.",
    jp: "人生は最高になることじゃなく、より良くなることだ。",
    cn: "生活不是成为最好的，而是变得更好。",
    char: "Shigeo Kageyama (Mob Psycho 100)",
  },

  // Assassination Classroom
  {
    id: "Kelemahan bukan masalah selama kau terus berusaha memperbaikinya.",
    en: "Weakness is not a problem as long as you keep trying to improve.",
    jp: "弱点は改善し続ける限り問題じゃない。",
    cn: "只要不断努力改进，弱点就不是问题。",
    char: "Koro-sensei (Assassination Classroom)",
  },
  {
    id: "Masa depan milik mereka yang mempersiapkannya hari ini.",
    en: "The future belongs to those who prepare for it today.",
    jp: "未来は今日準備する者のものだ。",
    cn: "未来属于今天准备的人。",
    char: "Koro-sensei (Assassination Classroom)",
  },

  // Sword Art Online
  {
    id: "Dalam dunia virtual atau nyata, apa yang penting adalah kau hidup.",
    en: "In virtual or real world, what matters is that you live.",
    jp: "仮想でも現実でも、大事なのは生きることだ。",
    cn: "无论虚拟还是现实，重要的是你活着。",
    char: "Kirito (Sword Art Online)",
  },
  {
    id: "Jika kau takut mati, kau tidak akan pernah hidup.",
    en: "If you're afraid to die, you'll never truly live.",
    jp: "死ぬのが怖ければ、本当に生きることはできない。",
    cn: "如果你害怕死亡，你就永远无法真正活着。",
    char: "Asuna Yuuki (Sword Art Online)",
  },

  // Re:Zero
  {
    id: "Bahkan jika kau gagal berkali-kali, kau harus terus maju.",
    en: "Even if you fail many times, you must keep moving forward.",
    jp: "何度失敗しても前に進み続けなければならない。",
    cn: "即使失败多次，也必须继续前进。",
    char: "Subaru Natsuki (Re:Zero)",
  },
  {
    id: "Aku mencintaimu karena kau menyelamatkanku dari kegelapan.",
    en: "I love you because you saved me from darkness.",
    jp: "闇から救ってくれたから愛してる。",
    cn: "我爱你因为你把我从黑暗中拯救出来。",
    char: "Emilia (Re:Zero)",
  },

  // Bleach
  {
    id: "Kami tidak bermain dengan takdir, kami adalah takdir.",
    en: "We don't play with destiny, we are destiny.",
    jp: "運命で遊んでいるのではない。我々が運命だ。",
    cn: "我们不是在玩弄命运，我们就是命运。",
    char: "Ichigo Kurosaki (Bleach)",
  },
  {
    id: "Jika nasib adalah batu gerinda, maka hidupku adalah pisau.",
    en: "If fate is a millstone, then my life is the blade.",
    jp: "運命が砥石なら、俺の人生は刃だ。",
    cn: "如果命运是磨刀石，那我的人生就是刀刃。",
    char: "Ichigo Kurosaki (Bleach)",
  },

  // Dragon Ball
  {
    id: "Kekuatan datang dari kebutuhan, bukan keinginan.",
    en: "Strength comes from need, not desire.",
    jp: "力は欲望ではなく必要から生まれる。",
    cn: "力量来自需要，而不是欲望。",
    char: "Goku (Dragon Ball)",
  },
  {
    id: "Bukan seberapa keras kau memukul, tapi seberapa keras kau bisa dipukul dan tetap maju.",
    en: "It's not how hard you hit, but how hard you can get hit and keep moving forward.",
    jp: "どれだけ強く打つかではなく、どれだけ打たれても前に進めるかだ。",
    cn: "不是你能打多重，而是你能挨多重还能继续前进。",
    char: "Vegeta (Dragon Ball)",
  },

  // Cowboy Bebop
  {
    id: "Aku bukan hidup di masa lalu atau masa depan. Aku hanya hidup di saat ini.",
    en: "I'm not living in the past or future. I'm just living in the present.",
    jp: "過去や未来に生きているのではない。今を生きているだけだ。",
    cn: "我不活在过去或未来，我只活在当下。",
    char: "Spike Spiegel (Cowboy Bebop)",
  },
  {
    id: "Apa yang terjadi, terjadilah. Masa lalu tidak bisa diubah.",
    en: "Whatever happens, happens. The past cannot be changed.",
    jp: "起こることは起こる。過去は変えられない。",
    cn: "发生的就发生了，过去无法改变。",
    char: "Spike Spiegel (Cowboy Bebop)",
  },

  // JoJo's Bizarre Adventure
  {
    id: "Kau pikir kau bisa mengalahkanku hanya dengan kekuatan? Kau salah besar!",
    en: "You think you can defeat me with just strength? You're dead wrong!",
    jp: "力だけで俺を倒せると思うのか？大間違いだ！",
    cn: "你以为只靠力量就能打败我？大错特错！",
    char: "Jotaro Kujo (JoJo)",
  },
  {
    id: "Aku menolak takdirku. Aku akan menciptakan masa depanku sendiri!",
    en: "I reject my fate. I will create my own future!",
    jp: "運命を拒否する。自分の未来を創る！",
    cn: "我拒绝命运，我要创造自己的未来！",
    char: "Giorno Giovanna (JoJo)",
  },

  // Neon Genesis Evangelion
  {
    id: "Selama kau hidup, akan selalu ada kesempatan untuk bahagia.",
    en: "As long as you live, there will always be a chance to be happy.",
    jp: "生きている限り、幸せになるチャンスは常にある。",
    cn: "只要活着，就总有机会幸福。",
    char: "Misato Katsuragi (Evangelion)",
  },

  // Vinland Saga
  {
    id: "Kau tidak punya musuh. Tidak ada yang punya musuh.",
    en: "You have no enemies. No one has enemies.",
    jp: "お前に敵はいない。誰にも敵はいない。",
    cn: "你没有敌人，谁都没有敌人。",
    char: "Thors (Vinland Saga)",
  },
  {
    id: "Seorang prajurit sejati tidak membutuhkan pedang.",
    en: "A true warrior doesn't need a sword.",
    jp: "真の戦士は剣を必要としない。",
    cn: "真正的战士不需要剑。",
    char: "Thorfinn (Vinland Saga)",
  },

  // Anohana
  {
    id: "Kita harus mengucapkan selamat tinggal pada seseorang yang kita cintai.",
    en: "We have to say goodbye to someone we love.",
    jp: "愛する人に別れを告げなければならない。",
    cn: "我们必须向爱的人说再见。",
    char: "Menma (Anohana)",
  },

  // Your Lie in April
  {
    id: "Musik ada untuk membuat orang bahagia.",
    en: "Music exists to make people happy.",
    jp: "音楽は人を幸せにするために存在する。",
    cn: "音乐的存在是为了让人快乐。",
    char: "Kousei Arima (Your Lie in April)",
  },

  // Made in Abyss
  {
    id: "Petualangan selalu dimulai dengan ketidaktahuan.",
    en: "Adventure always begins with ignorance.",
    jp: "冒険は常に無知から始まる。",
    cn: "冒险总是从无知开始。",
    char: "Riko (Made in Abyss)",
  },

  // Mushoku Tensei
  {
    id: "Tidak ada kata terlambat untuk memulai lagi.",
    en: "It's never too late to start over.",
    jp: "やり直すのに遅すぎることはない。",
    cn: "重新开始永远不会太迟。",
    char: "Rudeus Greyrat (Mushoku Tensei)",
  },

  // Chainsaw Man
  {
    id: "Mimpi buruk adalah mimpi juga.",
    en: "Nightmares are dreams too.",
    jp: "悪夢も夢だ。",
    cn: "噩梦也是梦。",
    char: "Denji (Chainsaw Man)",
  },

  // Spy x Family
  {
    id: "Keluarga adalah tempat kau bisa menjadi dirimu sendiri.",
    en: "Family is where you can be yourself.",
    jp: "家族は自分らしくいられる場所だ。",
    cn: "家庭是你可以做自己的地方。",
    char: "Loid Forger (Spy x Family)",
  },

  // Jujutsu Kaisen
  {
    id: "Aku akan menyelamatkan semua orang, bahkan jika itu artinya aku harus mati!",
    en: "I will save everyone, even if it means I have to die!",
    jp: "みんなを救う。たとえ死んでも！",
    cn: "我会拯救所有人，即使要死！",
    char: "Yuji Itadori (Jujutsu Kaisen)",
  },
  {
    id: "Kehidupan tidak adil, tapi kau harus tetap hidup.",
    en: "Life isn't fair, but you must keep living.",
    jp: "人生は不公平だが、生き続けなければならない。",
    cn: "生活不公平，但你必须继续活下去。",
    char: "Satoru Gojo (Jujutsu Kaisen)",
  },

  // Blue Lock
  {
    id: "Untuk menjadi yang terbaik, kau harus egois.",
    en: "To be the best, you must be selfish.",
    jp: "最高になるためにはエゴイストでなければならない。",
    cn: "要成为最好的，你必须自私。",
    char: "Yoichi Isagi (Blue Lock)",
  },
];

const translations = {
  id: {
    title: "Cari Anime",
    title_char: "Gacha Karakter",
    title_donghua: "Cari Donghua",
    anime_btn: "Anime",
    donghua_btn: "Donghua",
    Karakter_btn: "Karakter",
    desc_atas: "Sesuaikan dengan seleramu hari ini!",
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
    about_title: "Tentang Developer",
    about_role: "Web Developer",
    about_msg: "Terima kasih sudah menggunakan website ini!",
    greet_morning: "Ohayou! Pagi yang cerah ☀️",
    greet_afternoon: "Konnichiwa! Jangan lupa istirahat ☕",
    greet_evening: "Konbanwa! Waktunya nonton anime 🌙",
  },
  en: {
    title: "Search Anime",
    title_char: "Character Gacha",
    title_donghua: "Search Donghua",
    anime_btn: "Anime",
    donghua_btn: "Donghua",
    Karakter_btn: "Character",
    desc_atas: "Find something for today!",
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
    about_title: "About Developer",
    about_role: "Web Developer",
    about_msg: "Thank you for using this website!",
    greet_morning: "Ohayou! Good Morning ☀️",
    greet_afternoon: "Konnichiwa! Good Afternoon ☕",
    greet_evening: "Konbanwa! Anime Time 🌙",
  },
  jp: {
    title: "アニメ検索",
    title_char: "キャラガチャ",
    title_donghua: "中国アニメ",
    anime_btn: "アニメ",
    donghua_btn: "中国アニメ",
    Karakter_btn: "キャラクター",
    desc_atas: "今日の気分に合わせて！",
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
    about_title: "開発者について",
    about_role: "ウェブ開発者",
    about_msg: "このウェブサイトをご利用いただきありがとうございます！",
    greet_morning: "おはようございます ☀️",
    greet_afternoon: "こんにちは ☕",
    greet_evening: "こんばんは 🌙",
  },
  cn: {
    title: "动漫搜索",
    title_char: "角色抽卡",
    title_donghua: "搜索国漫",
    anime_btn: "动漫",
    donghua_btn: "国漫",
    Karakter_btn: "角色",
    desc_atas: "根据你的心情选择！",
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
    about_title: "关于开发者",
    about_role: "网站开发者",
    about_msg: "感谢您使用本网站！",
    greet_morning: "早上好 ☀️",
    greet_afternoon: "下午好 ☕",
    greet_evening: "晚上好 🌙",
  },
};

// --- HELPER FUNCTIONS ---
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
    audio.play().catch((e) => console.log("Audio blocked:", e));
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
  updateText();
}

// --- PICK UNIQUE LOGIC ---
function pickRandomUnique(items, keyName) {
  let seenList = JSON.parse(localStorage.getItem(`seen_${currentMode}`)) || [];
  let unseen = items.filter((item) => !seenList.includes(item[keyName]));

  if (unseen.length === 0) {
    seenList = [];
    localStorage.removeItem(`seen_${currentMode}`);
    unseen = items;
  }

  const selected = unseen[Math.floor(Math.random() * unseen.length)];
  seenList.push(selected[keyName]);
  localStorage.setItem(`seen_${currentMode}`, JSON.stringify(seenList));

  return selected;
}

// --- DATA FETCHING ---

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
    const anime = data.data;

    const formattedData = {
      mal_id: anime.mal_id,
      title: anime.title,
      native: anime.title_japanese,
      image: anime.images.jpg.large_image_url,
      url: anime.url,
      score: "⭐ " + (anime.score || "N/A"),
      episodes: anime.episodes,
      status: anime.status,
      synopsis: anime.synopsis,
      trailerUrl: anime.trailer ? anime.trailer.url : null,
    };

    displayAnimeDetails(formattedData);
  } catch (error) {
    showToast(translations[currentLang].alertError, "error");
  }
}

async function getData() {
  playSound(sfxClick);
  const btn = document.getElementById("btnGacha");
  const card = document.getElementById("resultCard");
  const skeleton = document.getElementById("skeletonCard");
  btn.disabled = true;
  btn.innerText = translations[currentLang].btnLoading;

  card.style.display = "none";
  skeleton.style.display = "block";

  if (currentMode === "character") await getCharacter();
  else if (currentMode === "donghua") await getDonghua();
  else await getAnime();
}

async function getDonghua() {
  const genreId = document.getElementById("inputGenre").value;
  const year = document.getElementById("inputYear").value;

  let genreFilter =
    genreId && malToAnilistGenre[genreId]
      ? `, genre: "${malToAnilistGenre[genreId]}"`
      : "";

  // Filter tahun untuk donghua - pakai startDate dan endDate
  let yearFilter = "";
  if (year) {
    const startDate = parseInt(year) * 10000 + 101; // Format: 20230101
    const endDate = parseInt(year) * 10000 + 1231; // Format: 20231231
    yearFilter = `, startDate_greater: ${startDate}, startDate_lesser: ${endDate}`;
  }

  // Jangan pakai random page kalau ada filter tahun
  const randomPage = year ? 1 : Math.floor(Math.random() * 10) + 1;
  const perPage = year ? 50 : 50;

  const query = `query { 
    Page(page: ${randomPage}, perPage: ${perPage}) { 
      media(
        countryOfOrigin: "CN", 
        type: ANIME, 
        sort: POPULARITY_DESC 
        ${genreFilter}
        ${yearFilter}
      ) { 
        id 
        title { 
          romaji 
          native 
        } 
        coverImage { 
          large 
        } 
        description 
        averageScore 
        siteUrl 
        status 
        episodes 
        trailer { 
          id 
          site 
        }
        startDate {
          year
        }
      } 
    } 
  }`;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();

    console.log("Donghua API Response:", result); // Debug

    const items = result.data.Page.media;
    if (!items || items.length === 0) {
      showToast(translations[currentLang].alertNotFound, "error");
      btn.disabled = false;
      btn.innerText = translations[currentLang].btnAgain;
      return;
    }

    const anime = pickRandomUnique(items, "id");

    // STANDARDIZE ANILIST DATA
    const formattedData = {
      mal_id: anime.id,
      title: anime.title.romaji,
      native: anime.title.native,
      image: anime.coverImage.large,
      url: anime.siteUrl,
      score: anime.averageScore
        ? "⭐ " + (anime.averageScore / 10).toFixed(1)
        : "⭐ N/A",
      episodes: anime.episodes,
      status: anime.status,
      synopsis: anime.description
        ? anime.description.replace(/<[^>]*>?/gm, "")
        : "No description",
      trailerUrl:
        anime.trailer && anime.trailer.site === "youtube"
          ? `https://www.youtube.com/watch?v=${anime.trailer.id}`
          : null,
      isDonghua: true,
    };

    displayAnimeDetails(formattedData);
  } catch (e) {
    console.error("Donghua Error:", e); // Debug
    showToast("Error: " + e.message, "error");
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

    // STANDARDIZE CHAR DATA
    const formattedData = {
      mal_id: char.mal_id,
      title: char.name,
      native: char.name_kanji,
      image: char.images.jpg.image_url,
      url: char.url,
      score: "❤️ " + (char.favorites || 0),
      episodes: null, // Karakter ga punya episode
      status: null,
      synopsis: char.about ? char.about.substring(0, 200) + "..." : "No info",
      trailerUrl: null,
      isCharacter: true, // Flag khusus
    };

    displayAnimeDetails(formattedData);
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

  try {
    let url = `https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&sfw=true`;
    if (genre) url += `&genres=${genre}`;
    if (year) url += `&start_date=${year}-01-01&end_date=${year}-12-31`;

    // Jangan pakai random page kalau ada filter tahun
    if (!year) {
      const randomPage = Math.floor(Math.random() * 25) + 1;
      url += `&page=${randomPage}`;
    } else {
      url += `&page=1&limit=25`; // Ambil 25 hasil pertama
    }

    const response = await fetch(url);
    const data = await response.json();
    if (!data.data.length) {
      showToast(translations[currentLang].alertNotFound, "error");
      document.getElementById("skeletonCard").style.display = "none";
      btn.disabled = false;
      btn.innerText = translations[currentLang].btnAgain;
      return;
    }

    const anime = pickRandomUnique(data.data, "mal_id");

    // STANDARDIZE JIKAN DATA
    const formattedData = {
      mal_id: anime.mal_id,
      title: anime.title,
      native: anime.title_japanese,
      image: anime.images.jpg.large_image_url,
      url: anime.url,
      score: "⭐ " + (anime.score || "N/A"),
      episodes: anime.episodes,
      status: anime.status,
      synopsis: anime.synopsis,
      trailerUrl: anime.trailer ? anime.trailer.url : null,
    };

    displayAnimeDetails(formattedData);
  } catch (e) {
    showToast("Error/Limit API", "error");
    document.getElementById("skeletonCard").style.display = "none";
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

    const items = data.data.map((i) => i.entry);
    const selected = pickRandomUnique(items, "mal_id");
    fetchAndShowDetails(selected.mal_id);
  } catch (e) {
    btn.disabled = false;
  }
}

// --- FUNGSI RENDER UTAMA (FIX CARD HIDDEN) ---
function displayAnimeDetails(data) {
  document.getElementById("skeletonCard").style.display = "none";

  card.style.display = "block";

  currentAnimeData = data;

  // 1. Background & Poster
  document.getElementById(
    "dynamic-bg"
  ).style.backgroundImage = `url('${data.image}')`;
  document.getElementById("imgPoster").src = data.image;

  // 2. Judul
  document.getElementById("titleMain").innerText = data.title;
  document.getElementById("titleJp").innerText = data.native || "";

  // 3. Score & Info (Episode & Status) -> FIX EPISODE HILANG
  document.getElementById("txtScore").innerText = data.score;

  const epsEl = document.getElementById("txtEps");
  const statEl = document.getElementById("txtStatus");

  if (data.isCharacter) {
    epsEl.style.display = "none";
    statEl.style.display = "none";
  } else {
    epsEl.style.display = "inline-block";
    statEl.style.display = "inline-block";
    epsEl.innerText = data.episodes ? `${data.episodes} Eps` : "? Eps";
    statEl.innerText = data.status || "Unknown";
  }

  // 4. Synopsis
  document.getElementById("txtSynopsis").innerText = data.synopsis || "-";

  // 5. Tombol Aksi
  document.getElementById("linkMal").href = data.url;

  const trailerBtn = document.getElementById("btnTrailer");
  if (data.trailerUrl) {
    trailerBtn.href = data.trailerUrl;
    trailerBtn.style.display = "flex";
  } else {
    trailerBtn.style.display = "none";
  }

  // Share Button Logic (FIX RELOAD ISSUE)
  const shareBtn = document.getElementById("btnShare");
  const shareText = `Cek anime ini: ${data.title} ${data.url}`;
  shareBtn.href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  // Tombol Rekomendasi & Quote
  const btnRec = document.getElementById("btnRecommend");
  const quoteBox = document.querySelector(".quote-box");

  if (data.isDonghua || data.isCharacter) {
    btnRec.style.display = "none";
    quoteBox.style.display = "none";
  } else {
    btnRec.style.display = "flex";
    quoteBox.style.display = "block";
    showRandomQuote();
  }

  card.style.cursor = "pointer";
  card.onclick = () => openDetail(data);

  addToHistory(data);
  checkFavoriteStatus(data.mal_id);
  playSound(sfxSuccess);

  btn.disabled = false;
  btn.innerText = translations[currentLang].btnAgain;
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
  const isFav = favorites.some((item) => item.mal_id == id);
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
    (item) => item.mal_id == currentAnimeData.mal_id
  );

  if (index !== -1) {
    favorites.splice(index, 1);
    showToast(translations[currentLang].toast_fav_removed, "error");
  } else {
    favorites.unshift(currentAnimeData);
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
            `<a href="${i.url}" target="_blank" class="history-item"><img src="${i.image}" class="history-thumb"><div class="history-info"><h4>${i.title}</h4><span>${i.score}</span></div></a>`
        )
        .join("")
    : "<p>Kosong</p>";
  if (btnProfile) btnProfile.style.display = "none";
}
function closeFavorites() {
  playSound(sfxClick);
  favoritesView.style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
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
            `<a href="${i.url}" target="_blank" class="history-item"><img src="${i.image}" class="history-thumb"><div class="history-info"><h4>${i.title}</h4><span>${i.score}</span></div></a>`
        )
        .join("")
    : "<p>Kosong</p>";
  if (btnProfile) btnProfile.style.display = "none";
}
function closeHistory() {
  playSound(sfxClick);
  historyView.style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
}

function openScan() {
  playSound(sfxClick);
  homeView.style.display = "none";
  scanView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "none";
}
function closeScan() {
  playSound(sfxClick);
  scanView.style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
}
function openStats() {
  playSound(sfxClick);
  homeView.style.display = "none";
  statsView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "none";
  calculateStats();
}

function closeStats() {
  playSound(sfxClick);
  statsView.style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
}

function openFeedback() {
  playSound(sfxClick);
  hideAllViews();
  document.getElementById("feedbackView").style.display = "block";
  if (btnProfile) btnProfile.style.display = "none"; // Hide Profile
}

function closeFeedback() {
  playSound(sfxClick);
  document.getElementById("feedbackView").style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex"; // Show Profile
}

function hideAllViews() {
  homeView.style.display = "none";
  favoritesView.style.display = "none";
  historyView.style.display = "none";
  scanView.style.display = "none";
  statsView.style.display = "none";

  // TAMBAHAN:
  const feedbackEl = document.getElementById("feedbackView");
  if (feedbackEl) feedbackEl.style.display = "none";

  const aboutEl = document.getElementById("aboutView");
  if (aboutEl) aboutEl.style.display = "none";
  if (document.getElementById("detailView"))
    document.getElementById("detailView").style.display = "none";
  if (document.getElementById("searchView"))
    document.getElementById("searchView").style.display = "none";
  if (document.getElementById("scheduleView"))
    document.getElementById("scheduleView").style.display = "none";
  if (document.getElementById("learningView"))
    document.getElementById("learningView").style.display = "none";
  if (document.getElementById("novelMenuView"))
    document.getElementById("novelMenuView").style.display = "none";
  if (document.getElementById("novelReaderView"))
    document.getElementById("novelReaderView").style.display = "none";
  if (document.getElementById("omikujiView"))
    document.getElementById("omikujiView").style.display = "none";
}

function openDetail(animeData) {
  playSound(sfxClick);

  if (
    document.getElementById("searchView") &&
    document.getElementById("searchView").style.display === "block"
  ) {
    lastView = "searchView";
  } else if (
    document.getElementById("scheduleView") &&
    document.getElementById("scheduleView").style.display === "block"
  ) {
    lastView = "scheduleView"; // <--- TAMBAHAN: Deteksi halaman Jadwal
  } else if (
    document.getElementById("favoritesView").style.display === "block"
  ) {
    lastView = "favoritesView";
  } else if (document.getElementById("historyView").style.display === "block") {
    lastView = "historyView";
  } else {
    lastView = "homeView";
  }

  // TUTUP SEMUA HALAMAN LAIN (Termasuk Search & Home)
  hideAllViews();

  document.getElementById("detailView").style.display = "block";
  if (btnProfile) btnProfile.style.display = "none";

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Set data
  document.getElementById("detailPoster").src = animeData.image;
  document.getElementById("detailTitle").innerText = animeData.title;
  document.getElementById("detailTitleNative").innerText =
    animeData.native || "";

  // Clean stats format
  const scoreValue = animeData.score.replace("⭐ ", "");
  document.getElementById("detailScore").innerText = scoreValue;
  document.getElementById("detailEpisodes").innerText =
    animeData.episodes || "?";
  document.getElementById("detailStatus").innerText =
    animeData.status || "Unknown";

  document.getElementById("detailSynopsis").innerText =
    animeData.synopsis || "No synopsis available.";

  // Links
  document.getElementById("detailBtnMAL").href = animeData.url;

  // Trailer
  const trailerBtn = document.getElementById("detailBtnTrailer");
  if (animeData.trailerUrl) {
    trailerBtn.href = animeData.trailerUrl;
    trailerBtn.style.display = "flex";
  } else {
    trailerBtn.style.display = "none";
  }

  // Quote & Similar (hide untuk Character/Donghua)
  const quoteSection = document.getElementById("detailQuoteSection");
  const similarBtn = document.getElementById("detailBtnSimilar");

  if (animeData.isCharacter || animeData.isDonghua) {
    quoteSection.style.display = "none";
    similarBtn.style.display = "none";
  } else {
    quoteSection.style.display = "block";
    similarBtn.style.display = "flex";

    // Random quote
    if (animeQuotes && animeQuotes.length) {
      const q = animeQuotes[Math.floor(Math.random() * animeQuotes.length)];
      const quoteKey =
        currentLang === "id"
          ? "id"
          : currentLang === "jp"
          ? "jp"
          : currentLang === "cn"
          ? "cn"
          : "en";
      document.getElementById("detailQuoteText").innerText = `"${
        q[quoteKey] || q.id
      }"`;
      document.getElementById("detailQuoteChar").innerText = `- ${q.char}`;
    }
  }

  // Simpan data untuk fungsi lain
  currentAnimeData = animeData;
  checkFavoriteStatusDetail(animeData.mal_id);
}

// Close Detail
function closeDetail() {
  playSound(sfxClick);
  document.getElementById("detailView").style.display = "none";

  // --- LOGIKA KEMBALI (UPDATE) ---
  if (lastView === "searchView") {
    document.getElementById("searchView").style.display = "block";
    if (btnProfile) btnProfile.style.display = "none";
  } else if (lastView === "scheduleView") {
    // <--- TAMBAHAN: Balik ke Jadwal
    document.getElementById("scheduleView").style.display = "block";
    if (btnProfile) btnProfile.style.display = "none";
  } else if (lastView === "favoritesView") {
    document.getElementById("favoritesView").style.display = "block";
    if (btnProfile) btnProfile.style.display = "none";
  } else if (lastView === "historyView") {
    document.getElementById("historyView").style.display = "block";
    if (btnProfile) btnProfile.style.display = "none";
  } else {
    // Default balik ke Home
    homeView.style.display = "block";
    if (btnProfile) btnProfile.style.display = "flex";
  }
}

function checkFavoriteStatusDetail(id) {
  const favorites = JSON.parse(localStorage.getItem("animeFavorites")) || [];
  const isFav = favorites.some((item) => item.mal_id == id);
  const btn = document.getElementById("detailBtnFav");
  const icon = btn.querySelector("i");

  if (isFav) {
    icon.classList.replace("far", "fas");
    btn.classList.add("active");
  } else {
    icon.classList.replace("fas", "far");
    btn.classList.remove("active");
  }
}

function toggleFavoriteFromDetail() {
  toggleFavorite();
  checkFavoriteStatusDetail(currentAnimeData.mal_id);
}

function downloadDetailCard() {
  const wrapper = document.querySelector(".detail-wrapper");
  html2canvas(wrapper, {
    useCORS: true,
    backgroundColor: getComputedStyle(document.body).backgroundColor,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = `${currentAnimeData.title}-detail.png`;
    link.href = canvas.toDataURL();
    link.click();
    showToast(translations[currentLang].toast_saved || "Saved!", "success");
  });
}

function getSimilarFromDetail() {
  getSimilarAnime();
  closeDetail();
}

function calculateStats() {
  const history = JSON.parse(localStorage.getItem("animeHistory")) || [];
  const favorites = JSON.parse(localStorage.getItem("animeFavorites")) || [];

  const histCount = history.length;
  const favCount = favorites.length;

  // --- BAGIAN INI YANG HILANG SEBELUMNYA ---
  if (document.getElementById("statHistory")) {
    document.getElementById("statHistory").innerText = histCount;
  }
  if (document.getElementById("statFav")) {
    document.getElementById("statFav").innerText = favCount;
  }

  // Update Level Wibu
  let level = "Newbie";
  const total = histCount + favCount;
  if (total > 5) level = "Anime Fan";
  if (total > 20) level = "Otaku";
  if (total > 50) level = "Wibu Sepuh";
  if (total > 100) level = "Kami-sama";

  if (document.getElementById("wibuLevel")) {
    document.getElementById("wibuLevel").innerText = level;
  }
  // ------------------------------------------

  // Update Chart
  const ctx = document.getElementById("wibuChart").getContext("2d");
  if (myChart) myChart.destroy();

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

function addToHistory(item) {
  let history = JSON.parse(localStorage.getItem("animeHistory")) || [];

  history = history.filter((h) => h.mal_id !== item.mal_id);

  history.unshift(item);

  if (history.length > 50) history.pop();

  localStorage.setItem("animeHistory", JSON.stringify(history));

  calculateStats();
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
  const quoteCharEl = document.querySelector(".quote-char");
  if (quoteCharEl) {
    quoteCharEl.innerText = `- ${currentQuote.char}`;
  }
  updateText();
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
});
langBtn.addEventListener("click", () => {
  const langs = ["id", "en", "jp", "cn"];
  currentLang = langs[(langs.indexOf(currentLang) + 1) % langs.length];
  langBtn.innerText = currentLang.toUpperCase();
  updateText();
});

function updateText() {
  const t = translations[currentLang];
  if (currentMode === "character") {
    document.querySelector('[data-lang="title"]').innerText = t.title_char;
    btn.innerText = t.btnSearchChar;
  } else if (currentMode === "donghua") {
    document.querySelector('[data-lang="title"]').innerText = t.title_donghua;
    btn.innerText = t.btnSearchDonghua;
  } else {
    document.querySelector('[data-lang="title"]').innerText = t.title;
    btn.innerText = t.btnSearch;
  }

  document.querySelectorAll("[data-lang]").forEach((el) => {
    const k = el.getAttribute("data-lang");
    if (t[k] && !["title", "desc", "btn_search"].includes(k))
      el.innerText = t[k];
  });

  if (currentQuote) {
    const q = document.querySelector(".quote-text");
    if (currentLang === "id") q.innerText = `"${currentQuote.id}"`;
    else if (currentLang === "jp") q.innerText = `"${currentQuote.jp}"`;
    else if (currentLang === "cn") q.innerText = `"${currentQuote.cn}"`;
    else q.innerText = `"${currentQuote.en}"`;
  }

  const hour = new Date().getHours();
  let timeKey = "greet_morning";
  if (hour >= 12 && hour < 18) timeKey = "greet_afternoon";
  else if (hour >= 18) timeKey = "greet_evening";

  // Buat elemen sapaan kalau belum ada
  let greetEl = document.getElementById("greetingText");
  if (!greetEl) {
    greetEl = document.createElement("h3");
    greetEl.id = "greetingText";
    greetEl.style.marginBottom = "5px";
    greetEl.style.color = "var(--main-color)";
    // Sisipkan di bawah judul
    const titleEl = document.querySelector('h1[data-lang="title"]');
    titleEl.insertAdjacentElement("afterend", greetEl);
  }
  greetEl.innerText = t[timeKey];
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

// Voice
function startVoiceCommand() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    showToast("Browser tidak mendukung fitur suara.", "error");
    return;
  }
  const rec = new SR();
  rec.lang = "id-ID";
  rec.onstart = () => {
    btnVoice.classList.add("listening");
    voiceStatus.style.opacity = "1";
  };
  rec.onend = () => {
    btnVoice.classList.remove("listening");
    voiceStatus.style.opacity = "0";
  };
  rec.onresult = (e) =>
    processVoiceCommand(e.results[0][0].transcript.toLowerCase());
  rec.start();
}

function processVoiceCommand(cmd) {
  if (cmd.includes("cari anime")) getData();
  else if (cmd.includes("riwayat")) openHistory();
  else if (cmd.includes("favorit")) openFavorites();
  else if (cmd.includes("scan")) openScan();
  else if (cmd.includes("feedback") || cmd.includes("masukan")) openFeedback();
  else if (cmd.includes("cari") || cmd.includes("search")) openSearchPage();
  else if (cmd.includes("kembali")) {
    closeHistory();
    closeFavorites();
    closeScan();
    closeStats();
    closeAbout();
    closeFeedback(); // Tambahkan closeFeedback
  }
}

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("imagePreview").src = e.target.result;
      document.getElementById("imagePreview").style.display = "block";
      document.getElementById("uploadPlaceholder").style.display = "none";
      if (btnScanSearch) {
        btnScanSearch.style.display = "inline-block";
        btnScanSearch.disabled = false;
      }
    };
    reader.readAsDataURL(file);
  }
}

async function searchByImage() {
  const fileInput = document.getElementById("imageInput");
  if (!fileInput.files[0]) return;
  playSound(sfxClick);
  btnScanSearch.disabled = true;
  btnScanSearch.innerText = "Scanning...";
  document.getElementById("scanLoading").style.display = "block";

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  try {
    const response = await fetch(
      "https://api.trace.moe/search?cutBorders&anilistInfo",
      { method: "POST", body: formData }
    );
    const data = await response.json();
    document.getElementById("scanLoading").style.display = "none";

    btnScanSearch.disabled = false;
    btnScanSearch.innerText = "🔍 Scan Anime";
    btnScanSearch.style.display = "inline-block";

    if (!data.result || !data.result.length) {
      showToast(translations[currentLang].scan_no_result, "info");
      return;
    }
    displayScanResults(data.result);
    playSound(sfxSuccess);
  } catch (e) {
    showToast(translations[currentLang].scan_error, "error");
    document.getElementById("scanLoading").style.display = "none";
    btnScanSearch.disabled = false;
  }
}

function displayScanResults(results) {
  const container = document.getElementById("scanResult");
  container.innerHTML = results
    .slice(0, 3)
    .map(
      (item) => `
      <div class="scan-result-card">
        <video class="scan-video" src="${
          item.video
        }" autoplay loop muted></video>
        <div class="scan-info">
            <h3 class="scan-title">${
              item.anilist.title.romaji || item.anilist.title.native
            }</h3>
            <p class="scan-meta">Eps: ${item.episode} | Sim: ${(
        item.similarity * 100
      ).toFixed(1)}%</p>
        </div>
      </div>
    `
    )
    .join("");
}

function openAbout() {
  playSound(sfxClick);
  homeView.style.display = "none";
  favoritesView.style.display = "none";
  historyView.style.display = "none";
  scanView.style.display = "none";
  statsView.style.display = "none";

  const aboutEl = document.getElementById("aboutView");
  if (aboutEl) aboutEl.style.display = "block";
  if (btnProfile) btnProfile.style.display = "none";
}

function closeAbout() {
  playSound(sfxClick);
  const aboutEl = document.getElementById("aboutView");
  if (aboutEl) aboutEl.style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
}

let eggCount = 0;
let eggTimer;

function triggerEasterEgg() {
  const avatar = document.querySelector(".profile-avatar");
  const audio = document.getElementById("sfxAra");

  eggCount++;

  // Reset hitungan kalau tidak diklik lagi dalam 1 detik
  clearTimeout(eggTimer);
  eggTimer = setTimeout(() => {
    eggCount = 0;
  }, 800);

  // Efek 'Boing' kecil tiap klik
  avatar.style.transform = `scale(${1 + eggCount * 0.05})`;
  setTimeout(() => (avatar.style.transform = "scale(1)"), 100);

  // Jika sudah klik 5x cepat
  if (eggCount >= 5) {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((e) => console.log("Audio error:", e));
    }

    // Tambahkan kelas animasi getar
    avatar.classList.add("shake-anim");

    // Hapus kelas animasi setelah selesai
    setTimeout(() => {
      avatar.classList.remove("shake-anim");
    }, 500);

    eggCount = 0; // Reset hitungan
  }
}

function openSearchPage() {
  playSound(sfxClick);
  hideAllViews(); // Pastikan fungsi ini ada (sudah ada di kode sebelumnya)
  document.getElementById("searchView").style.display = "block";

  if (typeof btnProfile !== "undefined" && btnProfile)
    btnProfile.style.display = "none";

  // Load data awal (Top Airing, Populer, Rating) jika belum ada isinya
  if (document.getElementById("listAiring").innerHTML.includes("Memuat")) {
    fetchSearchPageData();
  }
}

// 2. Tutup Halaman Search
function closeSearchPage() {
  playSound(sfxClick);
  document.getElementById("searchView").style.display = "none";
  homeView.style.display = "block";
  if (typeof btnProfile !== "undefined" && btnProfile)
    btnProfile.style.display = "flex";
}

// 3. Fetch Data untuk 3 Kategori (Airing, Popular, Favorite)
async function fetchSearchPageData() {
  try {
    // Fetch Top Airing
    const resAiring = await fetch(
      "https://api.jikan.moe/v4/top/anime?filter=airing&limit=10"
    );
    const dataAiring = await resAiring.json();
    renderHorizontalList("listAiring", dataAiring.data);

    // Fetch Most Popular (Delay dikit biar API ga error)
    setTimeout(async () => {
      const resPop = await fetch(
        "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10"
      );
      const dataPop = await resPop.json();
      renderHorizontalList("listPopular", dataPop.data);
    }, 1000);

    // Fetch Top Rated (Favorite)
    setTimeout(async () => {
      const resRate = await fetch(
        "https://api.jikan.moe/v4/top/anime?filter=favorite&limit=10"
      );
      const dataRate = await resRate.json();
      renderHorizontalList("listUpcoming", dataRate.data);
    }, 2000);
  } catch (error) {
    console.error(error);
  }
}

// Helper untuk render list horizontal
function renderHorizontalList(elementId, data) {
  const container = document.getElementById(elementId);
  if (!data || data.length === 0) {
    container.innerHTML = "<p>Gagal memuat.</p>";
    return;
  }
  container.innerHTML = data
    .map(
      (item) => `
        <div class="trending-item" onclick="fetchAndShowDetails(${
          item.mal_id
        })">
            <img src="${item.images.jpg.image_url}" class="trending-poster">
            <div class="trending-title">${item.title}</div>
            <span class="badge badge-score" style="font-size:0.6rem; position:absolute; top:5px; left:5px;">⭐ ${
              item.score || "?"
            }</span>
        </div>
    `
    )
    .join("");
}

// 4. Fungsi Eksekusi Pencarian (Saat tombol search diklik)
async function executeSearch() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  playSound(sfxClick);
  const preContent = document.getElementById("preSearchContent");
  const resultContainer = document.getElementById("searchResultContainer");
  const resultList = document.getElementById("searchResultList");

  // Reset tampilan
  preContent.style.display = "none";
  resultContainer.style.display = "block";
  resultList.innerHTML = '<div class="loading-trending">Mencari...</div>';

  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&sfw=true&limit=24`
    );
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      resultList.innerHTML = "<p>Tidak ditemukan.</p>";
      return;
    }

    // 1. SIMPAN DATA KE VARIABEL GLOBAL (Supaya aman diklik)
    searchResults = data.data;

    // 2. RENDER KARTU (Panggil index-nya saja)
    resultList.innerHTML = data.data
      .map(
        (item, index) => `
        <div class="trending-item" onclick="selectSearchResult(${index})">
            <img src="${
              item.images.jpg.image_url
            }" class="trending-poster" alt="${item.title}">
            <div class="trending-title">${item.title}</div>
            <span class="badge badge-score" style="position:absolute; top:5px; left:5px; font-size:0.7rem; padding:2px 6px;">⭐ ${
              item.score || "?"
            }</span>
        </div>
    `
      )
      .join("");
  } catch (error) {
    resultList.innerHTML = "<p>Error koneksi.</p>";
  }
}

function selectSearchResult(index) {
  const item = searchResults[index]; // Ambil data asli dari array
  if (!item) return;

  // Format data agar cocok dengan halaman detail kita
  const formattedData = {
    mal_id: item.mal_id,
    title: item.title,
    native: item.title_japanese,
    image: item.images.jpg.large_image_url,
    url: item.url,
    score: "⭐ " + (item.score || "N/A"),
    episodes: item.episodes,
    status: item.status,
    synopsis: item.synopsis,
    trailerUrl: item.trailer ? item.trailer.url : null,
    isCharacter: false,
    isDonghua: false,
  };

  // Buka Halaman Detail
  openDetail(formattedData);
}

function openSchedule() {
  playSound(sfxClick);
  hideAllViews();
  document.getElementById("scheduleView").style.display = "block";
  if (btnProfile) btnProfile.style.display = "none";

  // Otomatis load hari ini saat dibuka
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = days[new Date().getDay()];
  loadSchedule(today);
}

function closeSchedule() {
  playSound(sfxClick);
  document.getElementById("scheduleView").style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
}

async function loadSchedule(day) {
  playSound(sfxClick);

  // Update tampilan tombol aktif
  document.querySelectorAll(".day-btn").forEach((btn) => {
    btn.classList.remove("active");
    // Cek teks tombol (bisa bahasa indo/inggris tergantung settingan,
    // tapi logic class active-nya manual aja biar simpel)
    if (btn.onclick.toString().includes(day)) btn.classList.add("active");
  });

  const list = document.getElementById("scheduleList");
  list.innerHTML = '<div class="loading-trending">Memuat Jadwal...</div>';

  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/schedules?filter=${day}`
    );
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      list.innerHTML = "<p style='color:#aaa'>Libur tayang hari ini.</p>";
      return;
    }

    // RENDER KARTU (Grid System yang Rapi)
    list.innerHTML = data.data
      .map((item) => {
        // Data untuk Open Detail
        const animeObj = {
          mal_id: item.mal_id,
          title: item.title.replace(/'/g, "\\'"),
          native: item.title_japanese,
          image: item.images.jpg.large_image_url,
          url: item.url,
          score: "⭐ " + (item.score || "N/A"),
          episodes: item.episodes,
          status: item.status,
          synopsis: item.synopsis
            ? item.synopsis.replace(/'/g, "\\'").replace(/\n/g, " ")
            : "-",
          trailerUrl: item.trailer ? item.trailer.url : null,
          isCharacter: false,
          isDonghua: false,
        };
        // Encode biar aman
        const dataStr = encodeURIComponent(JSON.stringify(animeObj));

        // Format Jam (Jikan kasih waktu Jepang JST, kita tampilkan mentah aja atau sesuaikan nanti)
        const time = item.broadcast.time || "??:??";

        return `
            <div class="trending-item" onclick="openDetail(JSON.parse(decodeURIComponent('${dataStr}')))">
                <img src="${item.images.jpg.image_url}" class="trending-poster">
                <div class="trending-title">${item.title}</div>
                <span class="schedule-time">⏰ ${time}</span>
            </div>
            `;
      })
      .join("");
  } catch (e) {
    list.innerHTML = "<p>Gagal memuat jadwal.</p>";
  }
}

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const clockEl = document.getElementById("realTimeClock");
  if (clockEl) {
    clockEl.innerText = `${hours}:${minutes}`;
  }
}

// Jalankan jam setiap detik
setInterval(updateClock, 1000);
updateClock();

// --- FITUR NAME GENERATOR (UPDATE: GACHA RANDOM) ---

const jpSurnames = [
  "Sato (佐藤)",
  "Suzuki (鈴木)",
  "Takahashi (高橋)",
  "Tanaka (田中)",
  "Watanabe (渡辺)",
  "Ito (伊藤)",
  "Yamamoto (山本)",
  "Nakamura (中村)",
  "Kobayashi (小林)",
  "Kato (加藤)",
  "Yoshida (吉田)",
  "Yamada (山田)",
  "Sasaki (佐々木)",
  "Yamaguchi (山口)",
  "Matsumoto (松本)",
  "Inoue (井上)",
  "Kimura (木村)",
  "Hayashi (林)",
  "Shimizu (清水)",
  "Saito (斉藤)",

  "Hasegawa (長谷川)",
  "Saito (斎藤)",
  "Abe (阿部)",
  "Ono (小野)",
  "Ishikawa (石川)",
  "Nakajima (中島)",
  "Harada (原田)",
  "Fujita (藤田)",
  "Ogawa (小川)",
  "Maeda (前田)",
  "Okada (岡田)",
  "Fukuda (福田)",
  "Ueda (上田)",
  "Ishii (石井)",
  "Hashimoto (橋本)",
  "Mori (森)",
  "Shibata (柴田)",
  "Aoki (青木)",
  "Endo (遠藤)",
  "Kubo (久保)",

  "Kondo (近藤)",
  "Murakami (村上)",
  "Miyazaki (宮崎)",
  "Hirano (平野)",
  "Ota (太田)",
  "Nakagawa (中川)",
  "Kawakami (川上)",
  "Sugiyama (杉山)",
  "Higuchi (樋口)",
  "Matsuda (松田)",
  "Tsuchiya (土屋)",
  "Kojima (小島)",
  "Noguchi (野口)",
  "Kaneko (金子)",
  "Mizuno (水野)",
  "Honda (本田)",
  "Masuda (増田)",
  "Kawamoto (川本)",
  "Takeda (武田)",
  "Tsuchida (土田)",

  "Morita (森田)",
  "Sakurai (桜井)",
  "Ikeda (池田)",
  "Tamura (田村)",
  "Sugimoto (杉本)",
  "Takeuchi (竹内)",
  "Iwata (岩田)",
  "Miyamoto (宮本)",
  "Kudo (工藤)",
  "Oshima (大島)",
  "Saito (西藤)",
  "Nishimura (西村)",
  "Kinoshita (木下)",
  "Ogiwara (荻原)",
  "Suenaga (末永)",
  "Okamoto (岡本)",
  "Oikawa (及川)",
  "Tachibana (橘)",
  "Fujimoto (藤本)",
  "Hattori (服部)",

  "Kuroda (黒田)",
  "Onishi (大西)",
  "Itakura (板倉)",
  "Nagai (永井)",
  "Furukawa (古川)",
  "Kawaguchi (川口)",
  "Tada (多田)",
  "Sudo (須藤)",
  "Tanimoto (谷本)",
  "Hori (堀)",
  "Kamata (鎌田)",
  "Kurokawa (黒川)",
  "Shindo (新堂)",
  "Sakai (坂井)",
  "Ishida (石田)",
  "Kusano (草野)",
  "Amemiya (雨宮)",
  "Shinoda (篠田)",
  "Shimura (志村)",
  "Kawai (河合)",

  "Wada (和田)",
  "Tsuchiyama (土山)",
  "Nomura (野村)",
  "Iida (飯田)",
  "Hirano (平野)",
  "Kawakami (川上)",
  "Uchimura (内村)",
  "Kikuchi (菊池)",
  "Tsunoda (角田)",
  "Soma (相馬)",
  "Iwasaki (岩崎)",
  "Matsuo (松尾)",
  "Otsuka (大塚)",
  "Kumagai (熊谷)",
  "Kayama (加山)",
  "Nakano (中野)",
  "Ando (安藤)",
  "Soma (相馬)",
  "Takayama (高山)",
  "Koyama (小山)",

  "Tsukamoto (塚本)",
  "Kirigaya (桐ヶ谷)",
  "Ogasawara (小笠原)",
  "Asano (浅野)",
  "Amano (天野)",
  "Mochizuki (望月)",
  "Tsunemi (常見)",
  "Shirakawa (白川)",
  "Kurobane (黒羽)",
  "Kamitani (上谷)",
  "Okui (奥井)",
  "Masaki (正木)",
  "Saeki (佐伯)",
  "Komatsu (小松)",
  "Nagata (永田)",
  "Fujisawa (藤沢)",
  "Kishimoto (岸本)",
  "Kuga (久我)",
  "Mido (御堂)",
  "Aizawa (相沢)",

  "Tsuchimura (土村)",
  "Sakaguchi (坂口)",
  "Takizawa (滝沢)",
  "Shirogane (白銀)",
  "Kuga (久我)",
  "Yokoyama (横山)",
  "Kawahara (河原)",
  "Miyake (三宅)",
  "Tokugawa (徳川)",
  "Kiryu (桐生)",
  "Sonoda (園田)",
  "Shimazu (島津)",
  "Minamoto (源)",
  "Taira (平)",
  "Suenaga (末永)",
  "Shindo (進藤)",
  "Arakawa (荒川)",
  "Tanimizu (谷水)",
  "Hoshino (星野)",

  "Takane (高嶺)",
  "Kujo (九条)",
  "Nanjo (南条)",
  "Saionji (西園寺)",
  "Seike (清家)",
  "Hino (日野)",
  "Kuga (久賀)",
  "Mibu (壬生)",
  "Matsunaga (松永)",
  "Toda (戸田)",
  "Akechi (明智)",
  "Tsuda (津田)",
  "Oda (織田)",
  "Toyotomi (豊臣)",
  "Shibasaki (柴崎)",
  "Naruse (成瀬)",
  "Kaneshiro (金城)",
  "Sumeragi (皇)",
  "Misawa (三沢)",
  "Uesugi (上杉)",
];

const jpFirstNames = [
  "Haruto (陽斗)",
  "Yuto (悠斗)",
  "Sota (颯太)",
  "Minato (湊)",
  "Riku (陸)",
  "Kaito (海斗)",
  "Asahi (朝日)",
  "Hinata (陽向)",
  "Arata (新)",
  "Ren (蓮)",
  "Yui (結衣)",
  "Akari (あかり)",
  "Hina (陽菜)",
  "Mei (芽依)",
  "Sakura (咲良)",
  "Mio (美桜)",
  "Aoi (葵)",
  "Rin (凛)",
  "Himari (陽葵)",
  "Kanna (栞奈)",

  "Takumi (匠)",
  "Rei (怜)",
  "Haru (春)",
  "Itsuki (一樹)",
  "Yuya (悠也)",
  "Shun (俊)",
  "Ryota (涼太)",
  "Keita (慧太)",
  "Shiro (四郎)",
  "Kazuki (和輝)",
  "Ayaka (彩花)",
  "Natsumi (夏美)",
  "Misaki (美咲)",
  "Haruka (遥)",
  "Ayane (彩音)",
  "Miyu (美優)",
  "Nanase (七瀬)",
  "Chihiro (千尋)",
  "Kokoro (心)",
  "Ema (絵馬)",

  "Daiki (大輝)",
  "Naoki (直樹)",
  "Tatsuya (達也)",
  "Kazuma (一真)",
  "Makoto (誠)",
  "Toru (徹)",
  "Shoya (翔也)",
  "Kosei (康生)",
  "Ayato (綾人)",
  "Haruki (春樹)",
  "Noa (乃愛)",
  "Miyuki (美雪)",
  "Hinano (陽菜乃)",
  "Yume (夢)",
  "Sumire (菫)",
  "Kaho (夏穂)",
  "Kaede (楓)",
  "Arisa (有紗)",
  "Ririka (莉々花)",
  "Sara (沙羅)",

  "Shinji (慎二)",
  "Akira (明)",
  "Ayumu (歩夢)",
  "Shion (紫苑)",
  "Ichika (一花)",
  "Miku (美久)",
  "Hana (花)",
  "Ai (愛)",
  "Miki (美紀)",
  "Ami (亜美)",
  "Ryo (涼)",
  "Sora (空)",
  "Yoru (夜)",
  "Reina (玲奈)",
  "Kanon (花音)",
  "Sayaka (沙耶香)",
  "Yoshino (佳乃)",
  "Reona (玲音)",
  "Yuna (優奈)",
  "Maho (真帆)",

  "Kenji (健二)",
  "Hiroshi (博)",
  "Kenta (健太)",
  "Jun (純)",
  "Goro (五郎)",
  "Takeru (武)",
  "Satoru (悟)",
  "Hideo (英夫)",
  "Yuji (雄二)",
  "Osamu (修)",
  "Atsushi (篤志)",
  "Katsuo (勝男)",
  "Shigeru (茂)",
  "Masaru (勝)",
  "Fumio (文雄)",
  "Noboru (昇)",
  "Ryohei (涼平)",
  "Koji (浩二)",
  "Masashi (雅志)",
  "Shuhei (周平)",

  "Minami (美波)",
  "Koharu (小春)",
  "Yukina (雪奈)",
  "Ayu (亜由)",
  "Hiori (日和)",
  "Mizuki (瑞希)",
  "Ayame (菖蒲)",
  "Tsukasa (司)",
  "Yura (由良)",
  "Akane (茜)",
  "Hotaru (蛍)",
  "Nazuna (なずな)",
  "Rikka (立夏)",
  "Towa (永遠)",
  "Yozora (夜空)",

  "Hikaru (光)",
  "Kaoru (薫)",
  "Nao (直)",
  "Sei (誠)",
  "Rui (瑠衣)",
  "Haruya (春也)",
  "Kazuto (和人)",
  "Shoma (将馬)",
  "Kou (光)",
  "Yuuto (優斗)",
  "Momoka (桃花)",
  "Yurika (百合香)",
  "Harumi (春美)",
  "Riko (莉子)",
  "Rina (里奈)",
  "Maya (麻耶)",
  "Kira (綺羅)",
  "Rion (莉音)",
  "Hikari (ひかり)",
  "Meari (芽亜里)",

  "Taiga (大雅)",
  "Yoshito (義人)",
  "Ranmaru (蘭丸)",
  "Hayato (隼人)",
  "Kakeru (翔)",
  "Natsuo (夏生)",
  "Ryunosuke (竜之介)",
  "Shunpei (俊平)",
  "Issei (一誠)",
  "Kaito (魁斗)",
  "Kohaku (琥珀)",
  "Shizuku (雫)",
  "Asuka (明日香)",
  "Kagura (神楽)",
  "Suzu (鈴)",
  "Kuro (黒)",
  "Shiori (栞)",
  "Aira (愛羅)",
  "Minori (実乃里)",
  "Kokoa (心愛)",

  "Touma (冬馬)",
  "Reiji (礼二)",
  "Iori (伊織)",
  "Fuma (風真)",
  "Kazehaya (風早)",
  "Mido (翠)",
  "Shido (司堂)",
  "Kyouka (響華)",
  "Yotsuba (四葉)",
  "Itsuki (五月)",
  "Amane (天音)",
  "Reito (礼人)",
  "Kousuke (幸介)",
  "Jiro (次郎)",
  "Taichi (太一)",
  "Mirei (未来)",
  "Asahi (旭)",
  "Suzume (雀)",
  "Mitsuki (光月)",
  "Himeno (姫乃)",

  "Atsumi (温美)",
  "Rio (莉央)",
  "Nozomi (望)",
  "Ayumi (歩美)",
  "Kotori (小鳥)",
  "Miyako (都)",
  "Kaho (花帆)",
  "Shuka (朱夏)",
  "Yukari (由香里)",
  "Aine (愛音)",
  "Kanon (奏音)",
  "Satsuki (皐月)",
  "Mahiro (真広)",
  "Kiyoko (清子)",
  "Ritsu (律)",
  "Tsumugi (紬)",
  "Yukito (雪人)",
  "Kaito (海翔)",
  "Shuya (修也)",
  "Hizuki (陽月)",
];

const jpSuffixes = [
  "no Kami (の神)",
  "Zerol (ゼロ)",
  "San (さん)",
  "Sama (様)",
  "Kun (君)",
  "Chan (ちゃん)",
  "Senpai (先輩)",
  "Sensei (先生)",
  "Dono (殿)",
  "Hime (姫)",
  "Ouji (王子)",
  "Taichou (隊長)",
  "Shogun (将軍)",
  "Tenshi (天使)",
  "Akuma (悪魔)",
  "Ryuu (竜)",
  "Kage (影)",

  // --- Tambahan sampai 200 ---
  "Kami (神)",
  "Hikari (光)",
  "Yami (闇)",
  "Tsuki (月)",
  "Taiyou (太陽)",
  "Koori (氷)",
  "Honoō (炎)",
  "Kitsune (狐)",
  "Ookami (狼)",
  "Tora (虎)",
  "Neko (猫)",
  "Majin (魔人)",
  "Shinigami (死神)",
  "Ninja (忍者)",
  "Ronin (浪人)",
  "Onmyoji (陰陽師)",
  "Kensei (剣聖)",
  "Kenshi (剣士)",
  "Seijin (聖人)",
  "Kaijin (怪人)",
  "Seiryu (青龍)",
  "Suzaku (朱雀)",
  "Byakko (白虎)",
  "Genbu (玄武)",
  "Arashi (嵐)",
  "Hayate (疾風)",
  "Kaminari (雷)",
  "Raijin (雷神)",
  "Fujin (風神)",
  "Kuro (黒)",
  "Shiro (白)",
  "Aoi (青)",
  "Midori (緑)",
  "Kurenai (紅)",
  "Murasaki (紫)",
  "Gin (銀)",
  "Kin (金)",
  "Yoroi (鎧)",
  "Tsurugi (剣)",
  "Katana (刀)",
  "Hana (花)",
  "Kazehana (風花)",
  "Yukihana (雪花)",
  "Hoshizora (星空)",
  "Ginga (銀河)",
  "Yoru (夜)",
  "Asa (朝)",
  "Himawari (向日葵)",
  "Kagerou (陽炎)",
  "Akebono (曙)",
  "Gekkou (月光)",
  "Tenshiou (天将)",
  "Yukimura (雪村)",
  "Yukine (雪音)",
  "Hanabira (花びら)",
  "Inari (稲荷)",
  "Mikoto (命)",
  "Miko (巫女)",
  "Mikado (帝)",
  "Reikon (霊魂)",
  "Tamashii (魂)",
  "Seishin (精神)",
  "Reiki (霊気)",
  "Shizuku (雫)",
  "Shigure (時雨)",
  "Ame (雨)",
  "Kurogane (黒金)",
  "Shirogane (白銀)",
  "Aogane (青金)",
  "Tsubasa (翼)",
  "Oni (鬼)",
  "Oniwaka (鬼若)",
  "Kaede (楓)",
  "Rikka (六花)",
  "Haru (春)",
  "Natsu (夏)",
  "Aki (秋)",
  "Fuyu (冬)",
  "Miyabi (雅)",
  "Kazuki (一樹)",
  "Reisen (霊仙)",
  "Kazama (風間)",
  "Homura (焔)",
  "Kurohana (黒花)",
  "Amehana (雨花)",
  "Hoshino (星野)",
  "Yukino (雪乃)",
  "Kuroyuki (黒雪)",
  "Amaterasu (天照)",
  "Susanoo (須佐之男)",
  "Tsukuyomi (月読)",
  "Kemono (獣)",
  "Mahou (魔法)",
  "Tenshiou (天翔)",
  "Seika (聖火)",
  "Hibana (火花)",
  "Enma (閻魔)",
  "Reaper (死神/リーパー)",
  "Knight (騎士)",
  "Blade (ブレード)",
  "Storm (ストーム)",
  "Zero (ゼロ)",
  "Omega (オメガ)",
  "Alpha (アルファ)",
  "Sigma (シグマ)",
  "Kagehana (影花)",
  "Yukikage (雪影)",
  "Ameboshi (雨星)",
  "Kazekage (風影)",
  "Hoshikage (星影)",
  "Tsukinowa (月輪)",
  "Ryuusei (流星)",
  "Tenshou (天照)",
  "Kamigami (神々)",
  "Seiya (聖夜)",
  "Hajime (始め)",
  "Itsuki (樹)",
  "Rin (凛)",
  "Rion (リオン)",
  "Kaoru (薫)",
  "Makoto (誠)",
  "Satsuki (皐月)",
  "Shigurehana (時雨花)",
  "Arisawa (有沢)",
  "Momiji (紅葉)",
  "Sakura (桜)",
  "Kurotsuki (黒月)",
  "Shirotsuki (白月)",
  "Aotsuki (青月)",
  "Hoshitsuki (星月)",
  "Kaminarihana (雷花)",
  "Todoroki (轟)",
  "Kaien (海炎)",
  "Kaiten (回天)",
  "Kurousagi (黒兎)",
  "Usagi (兎)",
  "Tenshihana (天使花)",
  "Kurokami (黒髪)",
  "Shirokami (白髪)",
  "Aokami (青髪)",
  "Tsukihana (月花)",
  "Amakaze (天風)",
  "Yukikaze (雪風)",
  "Genkai (限界)",
  "Shura (修羅)",
  "Gouka (豪火)",
  "Katon (火遁)",
  "Suiton (水遁)",
  "Doton (土遁)",
  "Raiton (雷遁)",
  "Fuuton (風遁)",
  "Makaze (魔風)",
  "Rekka (烈火)",
  "Torao (虎王)",
  "Ou (王)",
  "Meiou (冥王)",
  "Kishi (騎士)",
  "Tenshiou (天将)",
  "Shinsei (神聖)",
  "Kokuou (黒王)",
  "Hakuou (白王)",
  "Kinzoku (金属)",
  "Seiraku (清楽)",
  "Kageou (影王)",
  "Akatsuki (暁)",
  "Tensei (転生)",
  "Shinsei (新星)",
  "Shuraou (修羅王)",
  "Rekkaou (烈火王)",
  "Yasai (野菜)", // bonus random lucu
  "Pandora (パンドラ)",
  "Kiseki (奇跡)",
  "Shunkan (瞬間)",
  "Kuronuma (黒沼)",
  "Shion (紫苑)",
  "Kagutsuchi (迦具土)",
  "Kirin (麒麟)",
  "Hakuryuu (白竜)",
  "Kokuryuu (黒竜)",
  "Seiryuuou (青龍王)",
  "Tenshin (天心)",
  "Seiryou (清涼)",
  "Kokoro (心)",

  // biar pas 200
  "Yukishiro (雪白)",
  "Shiroyuki (白雪)",
  "Hane (羽)",
  "Toki (時)",
  "Rei (霊)",
  "Kyojin (巨人)",
  "Kibou (希望)",
  "Tsukikage (月影)",
  "Akakage (赤影)",
  "Aokage (青影)",
  "Kurokage (黒影)",
  "Shinkai (深海)",
  "Kaigan (海岸)",
  "Ryuukaze (竜風)",
  "Ametsuki (雨月)",
  "Hoshiai (星愛)",
  "Gekkouhana (月光花)",
  "Senkou (閃光)",
  "Seikou (成功)",
];

function openNameGen() {
  playSound(sfxClick);
  hideAllViews(); // Pastikan fungsi hideAllViews sudah ada & menutup view lain
  document.getElementById("nameGenView").style.display = "block";
  if (btnProfile) btnProfile.style.display = "none";
}

function closeNameGen() {
  playSound(sfxClick);
  document.getElementById("nameGenView").style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
}

function generateJapaneseName() {
  playSound(sfxClick);

  // 1. Ambil Surname Acak
  const surname = jpSurnames[Math.floor(Math.random() * jpSurnames.length)];

  // 2. Ambil First Name Acak
  const firstName =
    jpFirstNames[Math.floor(Math.random() * jpFirstNames.length)];

  // 🔥 20% kemungkinan (3 kata), 80% (2 kata)
  const isThreeWords = Math.random() < 0.2;

  let fullName = "";
  let meaning = "";

  if (isThreeWords) {
    const suffix = jpSuffixes[Math.floor(Math.random() * jpSuffixes.length)];
    fullName = `${surname} ${firstName} ${suffix}`;
    meaning = "✨ Nama Legendaris (3 Kata) ✨";
  } else {
    fullName = `${surname} ${firstName}`;
    meaning = "Nama Standar";
  }

  // Tampilkan Hasil
  const resultBox = document.getElementById("nameResult");
  resultBox.style.display = "block";

  // Efek Animasi Reset
  resultBox.style.animation = "none";
  resultBox.offsetHeight;
  resultBox.style.animation = "popUp 0.3s ease";

  document.getElementById("jpNameResult").innerText = fullName;
  document.getElementById("jpNameMeaning").innerText = meaning;

  if (isThreeWords) {
    document.getElementById("jpNameMeaning").style.color = "#f1c40f";
    playSound(sfxSuccess);
  } else {
    document.getElementById("jpNameMeaning").style.color = "var(--main-color)";
  }
}

const jlptData = {
  n5: {
    title: "JLPT N5 (Pemula)",
    topics: [
      { id: "grammar", title: "Tata Bahasa (Grammar)", icon: "fa-book" },
      { id: "vocab", title: "Kosa Kata (Vocabulary)", icon: "fa-font" },
      { id: "kanji", title: "Kanji Dasar", icon: "fa-pen-nib" },
    ],
    content: {
      grammar: [
        {
          id: "wa-vs-ga",
          title: "Partikel: は (Wa) vs が (Ga)",
          summary: "は menandakan topik, が menandakan subjek/penekanan.",
          details: `
                        <div class="lesson-section">
                            <h3 class="lesson-h3">Penjelasan Singkat</h3>
                            <p><strong>は (Wa)</strong> digunakan untuk topik. <strong>が (Ga)</strong> menekankan subjek baru.</p>
                        </div>
                        <div class="lesson-section">
                            <h3 class="lesson-h3">Contoh</h3>
                            <div class="example-box">
                                <span class="jp-text">私は学生です。</span>
                                <span class="ro-text">Watashi wa gakusei desu.</span>
                                <span class="id-text">Saya adalah siswa.</span>
                            </div>
                            <div class="example-box">
                                <span class="jp-text">誰が来ますか？</span>
                                <span class="ro-text">Dare ga kimasu ka?</span>
                                <span class="id-text">Siapa yang datang?</span>
                            </div>
                        </div>
                    `,
        },
        {
          id: "particle-wo",
          title: "Partikel: を (Wo/O)",
          summary: "Digunakan untuk objek langsung.",
          details: `
                        <div class="example-box">
                            <span class="jp-text">パンを食べます。</span>
                            <span class="ro-text">Pan o tabemasu.</span>
                            <span class="id-text">Saya makan roti.</span>
                        </div>
                    `,
        },
        {
          id: "particle-ni",
          title: "Partikel: に (Ni)",
          summary: "Menunjukkan waktu, lokasi, tujuan.",
          details: `
                        <div class="example-box">
                            <span class="jp-text">学校に行きます。</span>
                            <span class="ro-text">Gakkou ni ikimasu.</span>
                            <span class="id-text">Pergi ke sekolah.</span>
                        </div>
                    `,
        },
        {
          id: "particle-de",
          title: "Partikel: で (De)",
          summary: "Tempat terjadinya aktivitas.",
          details: `
                        <div class="example-box">
                            <span class="jp-text">家で勉強します。</span>
                            <span class="ro-text">Ie de benkyou shimasu.</span>
                            <span class="id-text">Belajar di rumah.</span>
                        </div>
                    `,
        },
        {
          id: "tai-form",
          title: "Bentuk 〜たい (Ingin ...)",
          summary: "Menyatakan keinginan.",
          details: `
                        <div class="example-box">
                            <span class="jp-text">寿司を食べたい。</span>
                            <span class="ro-text">Sushi o tabetai.</span>
                            <span class="id-text">Ingin makan sushi.</span>
                        </div>
                    `,
        },
        {
          id: "masenka-invite",
          title: "Bentuk 〜ませんか (Ayo ...?)",
          summary: "Ajakan sopan.",
          details: `
                        <div class="example-box">
                            <span class="jp-text">一緒に行きませんか？</span>
                            <span class="ro-text">Issho ni ikimasen ka?</span>
                            <span class="id-text">Mau pergi bareng?</span>
                        </div>
                    `,
        },
        {
          id: "mashou",
          title: "Bentuk 〜ましょう (Mari ...)",
          summary: "Mengajak melakukan sesuatu.",
          details: `
                        <div class="example-box">
                            <span class="jp-text">始めましょう！</span>
                            <span class="ro-text">Hajimemashou!</span>
                            <span class="id-text">Ayo mulai!</span>
                        </div>
                    `,
        },
        {
          id: "adjectives",
          title: "Kata Sifat: い-Adjective & な-Adjective",
          summary: "Dua tipe dasar sifat.",
          details: `
                        <div class="example-box">
                            <span class="jp-text">大きい犬</span>
                            <span class="ro-text">Ookii inu</span>
                            <span class="id-text">Anjing besar</span>
                        </div>
                        <div class="example-box">
                            <span class="jp-text">静かな町</span>
                            <span class="ro-text">Shizuka na machi</span>
                            <span class="id-text">Kota yang tenang</span>
                        </div>
                    `,
        },
        {
          id: "wa-ga-adj",
          title: "Pola: A は B が Adjective",
          summary: "Menyatakan 'A memiliki B yang ...'",
          details: `
                        <div class="example-box">
                            <span class="jp-text">日本は山が多いです。</span>
                            <span class="ro-text">Nihon wa yama ga ooi desu.</span>
                            <span class="id-text">Jepang memiliki banyak gunung.</span>
                        </div>
                    `,
        },
        {
          id: "te-form",
          title: "Bentuk 〜て (Te-form)",
          summary: "Menyambung kalimat atau permintaan.",
          details: `
                        <div class="example-box">
                            <span class="jp-text">待ってください。</span>
                            <span class="ro-text">Matte kudasai.</span>
                            <span class="id-text">Tolong tunggu.</span>
                        </div>
                    `,
        },
      ],

      vocab: [
        { kanji: "私", kana: "わたし", romaji: "Watashi", mean: "Saya" },
        { kanji: "あなた", kana: "あなた", romaji: "Anata", mean: "Kamu" },
        { kanji: "人", kana: "ひと", romaji: "Hito", mean: "Orang" },
        { kanji: "友達", kana: "ともだち", romaji: "Tomodachi", mean: "Teman" },
        { kanji: "猫", kana: "ねこ", romaji: "Neko", mean: "Kucing" },
        { kanji: "犬", kana: "いぬ", romaji: "Inu", mean: "Anjing" },
        { kanji: "水", kana: "みず", romaji: "Mizu", mean: "Air" },
        { kanji: "火", kana: "ひ", romaji: "Hi", mean: "Api" },
        { kanji: "食べる", kana: "たべる", romaji: "Taberu", mean: "Makan" },
        { kanji: "飲む", kana: "のむ", romaji: "Nomu", mean: "Minum" },
        { kanji: "行く", kana: "いく", romaji: "Iku", mean: "Pergi" },
        { kanji: "来る", kana: "くる", romaji: "Kuru", mean: "Datang" },
        { kanji: "見る", kana: "みる", romaji: "Miru", mean: "Melihat" },
        { kanji: "聞く", kana: "きく", romaji: "Kiku", mean: "Mendengar" },
        { kanji: "大きい", kana: "おおきい", romaji: "Ookii", mean: "Besar" },
        { kanji: "小さい", kana: "ちいさい", romaji: "Chiisai", mean: "Kecil" },
        {
          kanji: "新しい",
          kana: "あたらしい",
          romaji: "Atarashii",
          mean: "Baru",
        },
        { kanji: "古い", kana: "ふるい", romaji: "Furui", mean: "Lama" },
        {
          kanji: "高い",
          kana: "たかい",
          romaji: "Takai",
          mean: "Tinggi/Mahal",
        },
        { kanji: "安い", kana: "やすい", romaji: "Yasui", mean: "Murah" },
        { kanji: "好き", kana: "すき", romaji: "Suki", mean: "Suka" },
        { kanji: "嫌い", kana: "きらい", romaji: "Kirai", mean: "Tidak suka" },
        { kanji: "学校", kana: "がっこう", romaji: "Gakkou", mean: "Sekolah" },
        { kanji: "先生", kana: "せんせい", romaji: "Sensei", mean: "Guru" },
        { kanji: "学生", kana: "がくせい", romaji: "Gakusei", mean: "Pelajar" },
        { kanji: "車", kana: "くるま", romaji: "Kuruma", mean: "Mobil" },
        { kanji: "本", kana: "ほん", romaji: "Hon", mean: "Buku" },
        { kanji: "家", kana: "いえ", romaji: "Ie", mean: "Rumah" },
        { kanji: "駅", kana: "えき", romaji: "Eki", mean: "Stasiun" },
        { kanji: "道", kana: "みち", romaji: "Michi", mean: "Jalan" },
        { kanji: "雨", kana: "あめ", romaji: "Ame", mean: "Hujan" },
        { kanji: "雪", kana: "ゆき", romaji: "Yuki", mean: "Salju" },
        { kanji: "山", kana: "やま", romaji: "Yama", mean: "Gunung" },
        { kanji: "川", kana: "かわ", romaji: "Kawa", mean: "Sungai" },
        { kanji: "海", kana: "うみ", romaji: "Umi", mean: "Laut" },
        { kanji: "空", kana: "そら", romaji: "Sora", mean: "Langit" },
        { kanji: "朝", kana: "あさ", romaji: "Asa", mean: "Pagi" },
        { kanji: "昼", kana: "ひる", romaji: "Hiru", mean: "Siang" },
        { kanji: "夜", kana: "よる", romaji: "Yoru", mean: "Malam" },
        { kanji: "今日", kana: "きょう", romaji: "Kyou", mean: "Hari ini" },
        { kanji: "明日", kana: "あした", romaji: "Ashita", mean: "Besok" },
        { kanji: "昨日", kana: "きのう", romaji: "Kinou", mean: "Kemarin" },
      ],

      kanji: [
        {
          kanji: "日",
          kana: "ひ/にち",
          romaji: "hi/nichi",
          mean: "Hari/Matahari",
        },
        {
          kanji: "月",
          kana: "つき/げつ",
          romaji: "tsuki/getsu",
          mean: "Bulan",
        },
        { kanji: "火", kana: "ひ/か", romaji: "hi/ka", mean: "Api" },
        { kanji: "水", kana: "みず/すい", romaji: "mizu/sui", mean: "Air" },
        { kanji: "木", kana: "き/もく", romaji: "ki/moku", mean: "Pohon" },
        {
          kanji: "金",
          kana: "かね/きん",
          romaji: "kane/kin",
          mean: "Emas/Uang",
        },
        { kanji: "土", kana: "つち/ど", romaji: "tsuchi/do", mean: "Tanah" },
        { kanji: "山", kana: "やま", romaji: "yama", mean: "Gunung" },
        { kanji: "川", kana: "かわ", romaji: "kawa", mean: "Sungai" },
        { kanji: "人", kana: "ひと", romaji: "hito", mean: "Orang" },
        { kanji: "口", kana: "くち", romaji: "kuchi", mean: "Mulut" },
        { kanji: "目", kana: "め", romaji: "me", mean: "Mata" },
        { kanji: "手", kana: "て", romaji: "te", mean: "Tangan" },
        { kanji: "足", kana: "あし", romaji: "ashi", mean: "Kaki" },
        { kanji: "力", kana: "ちから", romaji: "chikara", mean: "Kekuatan" },
        { kanji: "気", kana: "き", romaji: "ki", mean: "Energi" },
        { kanji: "車", kana: "くるま", romaji: "kuruma", mean: "Mobil" },
        { kanji: "門", kana: "もん", romaji: "mon", mean: "Gerbang" },
        { kanji: "本", kana: "ほん", romaji: "hon", mean: "Buku" },
        { kanji: "学", kana: "がく", romaji: "gaku", mean: "Belajar" },
        { kanji: "生", kana: "せい", romaji: "sei", mean: "Hidup" },
        { kanji: "先", kana: "せん", romaji: "sen", mean: "Sebelumnya" },
        {
          kanji: "大",
          kana: "だい/おおきい",
          romaji: "dai/ookii",
          mean: "Besar",
        },
        {
          kanji: "小",
          kana: "しょう/ちいさい",
          romaji: "shou/chiisai",
          mean: "Kecil",
        },
        {
          kanji: "中",
          kana: "ちゅう/なか",
          romaji: "chuu/naka",
          mean: "Tengah",
        },
        { kanji: "上", kana: "うえ", romaji: "ue", mean: "Atas" },
        { kanji: "下", kana: "した", romaji: "shita", mean: "Bawah" },
        { kanji: "左", kana: "ひだり", romaji: "hidari", mean: "Kiri" },
        { kanji: "右", kana: "みぎ", romaji: "migi", mean: "Kanan" },
        { kanji: "何", kana: "なに", romaji: "nani", mean: "Apa" },
        { kanji: "名", kana: "な/めい", romaji: "na/mei", mean: "Nama" },
        { kanji: "年", kana: "とし/ねん", romaji: "toshi/nen", mean: "Tahun" },
        { kanji: "時", kana: "とき/じ", romaji: "toki/ji", mean: "Waktu/Jam" },
        {
          kanji: "間",
          kana: "あいだ/かん",
          romaji: "aida/kan",
          mean: "Antara",
        },
        { kanji: "先", kana: "さき", romaji: "saki", mean: "Depan" },
        { kanji: "円", kana: "えん", romaji: "en", mean: "Yen" },
        { kanji: "休", kana: "やすむ", romaji: "yasumu", mean: "Istirahat" },
        { kanji: "食", kana: "たべる", romaji: "taberu", mean: "Makan" },
        { kanji: "飲", kana: "のむ", romaji: "nomu", mean: "Minum" },
      ],
    },
  },
  n4: { title: "JLPT N4 (Dasar Lanjutan)", topics: [] },
  n3: { title: "JLPT N3 (Menengah)", topics: [] },
  n2: { title: "JLPT N2 (Bisnis)", topics: [] },
  n1: { title: "JLPT N1 (Ahli)", topics: [] },
};

// 2. NAVIGASI LEARNING
function openLearning() {
  playSound(sfxClick);
  hideAllViews();
  document.getElementById("learningView").style.display = "block";
  if (btnProfile) btnProfile.style.display = "none";
  renderLevels(); // Tampilkan menu awal
}

function closeLearning() {
  playSound(sfxClick);
  document.getElementById("learningView").style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
}

// 3. RENDERER (PENAMPIL KONTEN)

// Tampilan Awal: Pilih Level N5-N1
function renderLevels() {
  const container = document.getElementById("learningContent");
  const bread = document.getElementById("learningBreadcrumb");

  bread.innerHTML = "<span>Home</span>";
  document.getElementById("learningTitle").innerText = "Pilih Level JLPT";

  let html = '<div class="level-grid">';
  Object.keys(jlptData).forEach((key) => {
    const lvl = jlptData[key];
    html += `
            <div class="level-card" onclick="renderTopics('${key}')">
                <span class="level-badge-big">${key.toUpperCase()}</span>
                <p>${lvl.title}</p>
            </div>
        `;
  });
  html += "</div>";
  container.innerHTML = html;
}

// Tampilan Kedua: Pilih Topik (Grammar/Vocab)
function renderTopics(levelKey) {
  playSound(sfxClick);
  const container = document.getElementById("learningContent");
  const bread = document.getElementById("learningBreadcrumb");
  const data = jlptData[levelKey];

  bread.innerHTML = `<span onclick="renderLevels()">Home</span> > <span>${levelKey.toUpperCase()}</span>`;
  document.getElementById("learningTitle").innerText = data.title;

  if (!data.topics || data.topics.length === 0) {
    container.innerHTML =
      "<p style='text-align:center; margin-top:20px;'>Materi belum tersedia (Coming Soon).</p>";
    return;
  }

  let html = '<div class="level-grid">';
  data.topics.forEach((topic) => {
    html += `
            <div class="level-card" onclick="renderLessonList('${levelKey}', '${topic.id}')">
                <i class="fas ${topic.icon}" style="font-size: 2rem; color: var(--main-color); margin-bottom:10px;"></i>
                <p><strong>${topic.title}</strong></p>
            </div>
        `;
  });
  html += "</div>";
  container.innerHTML = html;
}

// Tampilan Ketiga: List Pelajaran
function renderLessonList(levelKey, topicId) {
  playSound(sfxClick);
  const container = document.getElementById("learningContent");
  const bread = document.getElementById("learningBreadcrumb");
  const contentData = jlptData[levelKey].content[topicId];

  bread.innerHTML = `<span onclick="renderLevels()">Home</span> > <span onclick="renderTopics('${levelKey}')">${levelKey.toUpperCase()}</span> > <span>${topicId}</span>`;

  // LOGIKA KHUSUS TAMPILAN VOCABULARY (TABEL)
  if (topicId === "vocab") {
    let html = `
            <div class="lesson-section">
                <table class="vocab-table">
                    <thead>
                        <tr>
                            <th>Kanji</th><th>Kana</th><th>Arti</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
    contentData.forEach((word) => {
      html += `
                <tr>
                    <td class="jp-text">${word.kanji}</td>
                    <td>${word.kana}<br><small>${word.romaji}</small></td>
                    <td>${word.mean}</td>
                </tr>
            `;
    });
    html += `</tbody></table></div>`;
    container.innerHTML = html;
    return;
  }

  if (topicId === "kanji") {
    let html = '<div style="display:flex; flex-direction:column; gap:10px;">';

    contentData.forEach((k) => {
      html += `
            <div class="lesson-section">
                <h3 class="jp-text" style="margin:0; font-size:2rem;">${k.kanji}</h3>
                <p>${k.kana} ・ ${k.romaji}</p>
                <p style="color:#aaa;">${k.mean}</p>
            </div>
        `;
    });

    html += "</div>";
    container.innerHTML = html;
    return;
  }

  // LOGIKA STANDAR (LIST PELAJARAN SEPERTI GRAMMAR)
  if (!contentData) {
    container.innerHTML = "<p>Belum ada materi.</p>";
    return;
  }

  let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';
  contentData.forEach((lesson, index) => {
    html += `
            <div class="lesson-section" style="cursor: pointer;" onclick="renderLessonDetail('${levelKey}', '${topicId}', ${index})">
                <h3 style="margin:0;">${lesson.title}</h3>
                <p style="color:#aaa; font-size:0.9rem;">${lesson.summary}</p>
            </div>
        `;
  });
  html += "</div>";
  container.innerHTML = html;
}

// Tampilan Keempat: Detail Pelajaran (Isi Materi)
function renderLessonDetail(levelKey, topicId, index) {
  playSound(sfxClick);
  const container = document.getElementById("learningContent");
  const data = jlptData[levelKey].content[topicId][index];

  // Render HTML Materi
  container.innerHTML = `
        <h2 style="margin-bottom:20px; color:var(--main-color);">${data.title}</h2>
        ${data.details}
    `;
}

// Fungsi Cek Kuis Sederhana
function checkQuiz(element, isCorrect) {
  if (isCorrect) {
    element.classList.add("correct");
    element.innerHTML += " ✅ Benar!";
    playSound(sfxSuccess);
  } else {
    element.classList.add("wrong");
    element.innerHTML += " ❌ Salah, coba lagi.";
  }
  // Disable klik lagi
  element.onclick = null;
}

const novels = [
  {
    id: 1,
    title: "Reinkarnasi Slime",
    cover: "https://cdn.myanimelist.net/images/anime/1258/126929.jpg",
    story: [
      "Gelap. Sunyi. Hening seperti ruang kosong tanpa udara. Kesadaranku perlahan mengapung kembali, seolah-olah aku terbangun dari tidur panjang yang tidak pernah kuminta.",
      "Ketika akhirnya aku bisa membuka mata, cahaya matahari menembus celah dedaunan di atas kepalaku. Hangat. Terang. Menyilaukan. Tapi… ada yang aneh.",
      "Aku mencoba mengangkat tanganku—atau setidaknya, aku *berusaha*. Tapi sesuatu terasa salah. Tidak ada jari. Tidak ada tangan. Tidak ada tubuh.",
      "Yang kurasakan hanya tubuh kenyal, dingin, dan… melar?",
      "Aku melihat ke bawah. Sosok bulat biru transparan memantulkan cahaya. Aku bergeming. Tidak percaya. Tidak menerima.",
      "Aku… jadi slime? SERIUS?",
      "Otakku langsung overload. Ini bukan mimpi, kan? Tidak ada tombol logout. Tidak ada cutscene pembuka. Tidak ada tutorial. Hanya aku… dan tubuh lendir aneh ini.",
      "Saat aku mencoba bergerak, tubuhku melompat tanpa kendali, memantul seperti jeli. Rasanya memalukan tapi juga lucu… mungkin.",
      "Di kejauhan, terdengar gemuruh. Sesuatu yang besar bergerak di balik pepohonan. Aku menelan ludah—atau setidaknya mencoba, walaupun aku bahkan tidak punya tenggorokan.",
      "Jika aku benar-benar reinkarnasi jadi slime, maka aku harus bertahan hidup. Caranya? Aku juga nggak tahu.",
      "Tapi satu hal jelas: petualanganku baru saja dimulai.",
      "(Tamat Prolog)",
      "Tubuhku bergoyang-goyang kecil ketika aku mencoba menenangkan diri. Rasanya aneh, seperti balon air yang gelisah. Tapi aku harus fokus. Panik nggak bakal bantu.",
      "Aku mencoba mengingat hal terakhir sebelum keadaan ini. Jalanan ramai. Suara klakson. Cahaya berkelebat. Dan… rasa sakit yang singkat.",
      "Oke, jadi kemungkinan besar: aku mati. Dan kini aku hidup lagi. Sebagai slime. Dunia memang suka bercanda.",
      "Aku memaksa tubuhku bergerak maju. Setiap ‘langkah’ terasa seperti melompat kecil tanpa kendali—lebih mirip jelly cube dilepar ke lantai.",
      "Tiba-tiba ada suara napas berat dari balik semak. Tubuhku refleks mengkerut. Suara itu dalam. Berat. Terlalu dekat.",
      "Dari balik rimbunan muncul seekor serigala raksasa dengan mata kuning menyala. Bulunya kusut, tapi taringnya terlihat sangat… sangat tajam.",
      "Aku ingin kabur, tapi tubuh slime ini lebih lambat dari buffering WiFi murahan.",
      "Serigala itu mendekatkan kepalanya. Nafas hangatnya menyapu tubuhku, membuat permukaan slime bergetar.",
      "‘Jangan makan aku… Jangan makan aku…’ pikirku, walau aku nggak yakin slime punya ekspresi takut.",
      "Serigala itu menggeram rendah. Ia membuka mulutnya—tepat pada detik itu, sesuatu terjadi.",
      "Tubuhku mengeluarkan cahaya biru kecil, seperti percikan listrik tipis yang menari di permukaanku.",
      "Serigala itu berhenti. Tergagap. Lalu *mundur*.",
      "Hah?! Aku ngeluarin… aura? Skill? Apa ini cheat karakter utama?",
      "Sebelum aku sempat bereaksi, sebuah suara bergema di dalam kepalaku. Bukan dari luar. Dari *dalam*.",
      "“Analisis selesai. Kemampuan unik terdeteksi: Adaptive Gel.”",
      "Aku terdiam. ‘Siapa itu?!’",
      "“Sistem internal teraktivasi. Memulai sinkronisasi.”",
      "Oke, jadi selain jadi slime, aku juga punya *sistem*. Ini semakin mirip game RPG. Dan anehnya… aku nggak keberatan.",
      "Serigala itu sudah kabur entah ke mana. Mungkin dia kira aku monster kelas tinggi. Yah, biarin.",
      "Aku mulai mengeksplorasi sekeliling. Hutan ini luas. Pepohonannya tinggi dan cahaya matahari jatuh seperti tirai keemasan. Suara sungai kecil terdengar tidak jauh.",
      "Saat aku bergerak ke arah suara air, sistem kembali berbicara.",
      "“Rekomendasi pertama: konsumsi sumber daya untuk meningkatkan massa dan energi.”",
      "Makan? Tapi aku slime. Makan apa? Rumput? Batu? Serangga?",
      "Aku mendekat ke sebuah batu kecil. Tubuhku menyentuhnya—dan batu itu *larut* seperti dimakan asam.",
      "“Item terserap. Energi +1.”",
      "HAHA. Oke, ini lumayan satisfying.",
      "Aku mulai menyerap apapun yang kubisa: daun, kerikil, jamur kecil (yang semoga nggak beracun), bahkan sepotong kayu.",
      "Setiap kali sesuatu terserap, tubuhku makin stabil, nggak terlalu jelly-jelly lagi. Rasanya seperti naik level pelan-pelan.",
      "Lalu aku mendengar suara gemericik sungai semakin dekat. Aku bergerak ke sana… dan apa yang kulihat membuatku terpaku.",
      "Ada bayangan besar di balik air. Sesuatu yang bernafas keras. Sesuatu yang kelihatannya jauh lebih berbahaya dari serigala tadi.",
      "Jika ini dunia baru, maka sepertinya ujian pertamaku belum selesai.",
      "(Bersambung)",
    ],
  },
  {
    id: 2,
    title: "Kisah Cinta Sekolah",
    cover: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
    story: [
      "Bel sekolah berbunyi, memecah keheningan kelas yang sudah sejak tadi membuatku mengantuk. Siswa-siswa lain langsung bergegas merapikan buku dan keluar dari kelas, tapi aku tetap duduk menatap jendela.",
      "Hujan turun deras. Sangat deras. Langit gelap dan suara rintikannya memenuhi udara seperti musik latar film romantis yang kelewat dramatis.",
      "Masalahnya sederhana: aku lupa bawa payung. Lagi.",
      "Saat aku memandangi halaman sekolah yang dipenuhi genangan air, tiba-tiba payung berwarna kuning cerah muncul di sisi pandanganku.",
      "Seseorang memegangnya. Seseorang yang… ya, jelas bukan orang sembarangan bagiku.",
      "Dia tersenyum seperti biasanya, senyum yang entah kenapa selalu sukses bikin jantungku nge-lag setengah detik.",
      "“Pakai ini,” katanya. Sederhana, tapi suaranya terdengar hangat seperti teh manis di hari hujan.",
      "Aku hendak menolak, tapi dia menatapku seolah berkata 'udah terima aja'. Dan jujur, siapa sih yang bisa nolak tatapan itu?",
      "Kami berjalan berdampingan melewati lorong sekolah. Payung kuning itu terlalu kecil untuk dua orang, sehingga jarak kami… ya, sangat dekat.",
      "Hujan terasa lebih pelan. Langkah kaki terdengar lebih lembut. Dan entah kenapa, dunia di luar payung itu rasanya memudar.",
      "Untuk pertama kalinya, aku merasa ini bukan sekadar kebetulan. Mungkin… ini awal cerita kami.",
      "Saat kami keluar dari gedung sekolah, udara terasa lebih dingin daripada yang kukira. Hujan masih turun deras, tapi suara rintiknya terdengar jauh lebih lembut ketika kami berjalan berdua.",
      "Payung kuning kecil itu memaksa kami berjalan sangat dekat. Saking dekatnya, aku bisa mendengar napasnya, bahkan aroma sampo rambutnya yang wangi banget.",
      "Aku mencoba berjalan lurus, tapi jujur aja—otakku sedang error. Buffering. Freeze. Crash. Semua jadi satu.",
      "“Kamu nggak keberatan, kan?” tanyanya tiba-tiba.",
      "Aku hampir tersedak udara. “H-ha? Keberatan apa?”",
      "Dia mengangkat payung sedikit, seperti memastikan wajahku terlihat. “Berjalan bareng begini.”",
      "Duh. Pertanyaan mematikan.",
      "“Nggak,” jawabku cepat. Mungkin terlalu cepat. “Malah… senang.”",
      "Dia tertawa kecil. Suara yang bikin seluruh dunia kayak berhenti satu detik.",
      "Kami melewati taman sekolah. Genangan air memantulkan cahaya lampu warna kuning keemasan. Cantik. Tenang. Sedikit dramatis. Tapi aku suka.",
      "“Kamu sering lupa bawa payung,” katanya sambil tersenyum kecil.",
      "“Iya…” Aku nyengir. “Padahal udah niat dari rumah.”",
      "“Mulai besok aku bawain dua, deh.” Ucapannya santai, tapi jantungku langsung jungkir balik.",
      "Aku menoleh. Ekspresinya polos, tulus, seolah-olah apa yang ia katakan bukan big deal sama sekali.",
      "Kami berjalan pelan sampai gerbang sekolah. Hujan belum mau berhenti, jadi kami berteduh di bawah atap kecil dekat pintu pagar.",
      "Angin berhembus, membawa aroma tanah basah. Dia menggenggam gagang payung, memainkannya pelan.",
      "“Kamu ada waktu sebentar?” tanyanya.",
      "“Ada,” jawabku tanpa pikir panjang. Jelas ada. Untuk dia, ada waktu sepanjang hari juga gas.",
      "“Aku mau bilang sesuatu.”",
      "Jantungku berhenti. Mati. Reboot. Restart.",
      "Dia menatapku. Tatapan yang bikin lutut lemes.",
      "“Aku… sebenarnya sudah lama ingin ngomong ini.”",
      "Hujan berhenti. Dunia hening. Hanya suara detak jantungku yang terasa terlalu keras.",
      "“Aku suka kamu.”",
      "Kalimat itu jatuh sederhana. Tapi dampaknya? Kayak meteor nabrak bumi.",
      "Aku membeku. Bibirku kering. Otakku kosong.",
      "Dia tersenyum kecil. “Nggak apa-apa kalau kamu butuh waktu mikir. Aku cuma… pengin kamu tahu.”",
      "Payung itu menutup perlahan. Hujan mulai reda, dan kami hanya berdiri saling menatap.",
      "Hari itu, di bawah payung kuning kecil, hidupku berubah.",
      "(Bersambung)",
    ],
  },
];

let currentNovel = null;
let currentParagraphIndex = 0;
let isTyping = false; // Cek apakah teks masih ngetik
let typeInterval;

// --- NAVIGASI MENU NOVEL ---
function openNovelMenu() {
  playSound(sfxClick);
  hideAllViews();
  document.getElementById("novelMenuView").style.display = "block";
  if (btnProfile) btnProfile.style.display = "none";
  renderNovelList();
}

function closeNovelMenu() {
  playSound(sfxClick);
  document.getElementById("novelMenuView").style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
}

function renderNovelList() {
  const list = document.getElementById("novelList");
  list.innerHTML = novels
    .map(
      (novel) => `
        <div class="novel-item" onclick="startReading(${novel.id})">
            <img src="${novel.cover}" class="novel-cover">
            <div class="novel-title">${novel.title}</div>
        </div>
    `
    )
    .join("");
}

// --- LOGIKA READER (BACA) ---

function startReading(id) {
  playSound(sfxClick);
  const novel = novels.find((n) => n.id === id);
  if (!novel) return;

  currentNovel = novel;
  currentParagraphIndex = 0;

  // Sembunyikan menu, buka reader
  document.getElementById("novelMenuView").style.display = "none";
  document.getElementById("novelReaderView").style.display = "flex"; // Pakai flex biar tengah

  showParagraph();
}

function showParagraph() {
  const textEl = document.getElementById("novelText");
  const indicator = document.getElementById("nextIndicator");

  // Reset
  textEl.innerText = "";
  indicator.style.display = "none";
  isTyping = true;

  // Ambil teks saat ini
  const text = currentNovel.story[currentParagraphIndex];
  let i = 0;

  // Efek Ketikan
  clearInterval(typeInterval);
  typeInterval = setInterval(() => {
    textEl.innerText += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
      isTyping = false;
      indicator.style.display = "block"; // Munculkan segitiga setelah selesai ngetik
    }
  }, 30); // Kecepatan ngetik (makin kecil makin cepat)
}

function nextParagraph() {
  // Kalau sedang ngetik, jangan bisa di-skip (atau bisa diubah logicnya jadi instant finish)
  if (isTyping) {
    // Opsi: Klik saat ngetik = langsung munculin semua teks
    clearInterval(typeInterval);
    document.getElementById("novelText").innerText =
      currentNovel.story[currentParagraphIndex];
    isTyping = false;
    document.getElementById("nextIndicator").style.display = "block";
    return;
  }

  playSound(sfxClick);
  currentParagraphIndex++;

  // Cek apakah cerita habis
  if (currentParagraphIndex >= currentNovel.story.length) {
    closeNovelReader(); // Balik ke menu
  } else {
    showParagraph(); // Lanjut paragraf
  }
}

function closeNovelReader(event) {
  // Mencegah event bubbling (supaya pas klik tombol back, gak dianggap klik layar buat next)
  if (event) event.stopPropagation();

  playSound(sfxClick);
  document.getElementById("novelReaderView").style.display = "none";
  document.getElementById("novelMenuView").style.display = "block"; // Balik ke menu novel
}

function openOmikuji() {
  playSound(sfxClick);
  hideAllViews();
  document.getElementById("omikujiView").style.display = "block";
  if (btnProfile) btnProfile.style.display = "none";

  // Reset tampilan saat dibuka
  document.getElementById("omikujiPaper").classList.remove("show");
  document.getElementById("omikujiBox").classList.remove("shaking");
  document.getElementById("btnDrawOmi").disabled = false;
  document.getElementById("btnDrawOmi").innerText = "Kocok Ramalan!";
}

function closeOmikuji() {
  playSound(sfxClick);
  document.getElementById("omikujiView").style.display = "none";
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
}

function drawOmikuji() {
  const box = document.getElementById("omikujiBox");
  const paper = document.getElementById("omikujiPaper");
  const btn = document.getElementById("btnDrawOmi");

  // Cegah klik double
  if (box.classList.contains("shaking") || paper.classList.contains("show")) {
    // Reset kalau mau kocok ulang
    paper.classList.remove("show");
    btn.innerText = "Kocok Ramalan!";
    return;
  }

  playSound(sfxClick);
  btn.disabled = true;
  btn.innerText = "Mengocok...";

  // 1. Animasi Shake
  box.classList.add("shaking");

  // 2. Tunggu 1.5 detik lalu muncul hasil
  setTimeout(() => {
    box.classList.remove("shaking");

    // Gacha Result
    const result = omikujiData[Math.floor(Math.random() * omikujiData.length)];

    document.getElementById("omiResultTitle").innerText =
      result.title.split(" ")[0]; // Ambil Romaji
    document.getElementById("omiResultTitle").style.color = result.color;
    document.getElementById("omiResultJp").innerText =
      result.title.split(" ")[1]; // Ambil Kanji
    document.getElementById("omiResultText").innerText = result.desc;

    // Animasi Kertas Keluar
    paper.classList.add("show");
    playSound(sfxSuccess);

    btn.disabled = false;
    btn.innerText = "Coba Lagi";
  }, 1500);
}

// Start
renderQuickTags();
getTrendingAnime();
renderHistory();
calculateStats();
updateText();
