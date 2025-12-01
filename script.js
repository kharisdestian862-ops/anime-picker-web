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

function openDetail(animeData) {
  playSound(sfxClick);
  homeView.style.display = "none";
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
      document.getElementById("detailQuoteChar").innerText = `${q.char}`;
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
  homeView.style.display = "block";
  if (btnProfile) btnProfile.style.display = "flex";
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
  else if (cmd.includes("kembali")) {
    closeHistory();
    closeFavorites();
    closeScan();
    closeStats();
    closeAbout();
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

// Start
renderQuickTags();
getTrendingAnime();
renderHistory();
calculateStats();
updateText();
