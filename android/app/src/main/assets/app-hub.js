(() => {
  "use strict";
  const SUPABASE_URL = "https://bzrostyxnljehnxfdene.supabase.co";
  const SUPABASE_KEY = "sb_publishable_4oRADljIbDPFQsQwQMEB4w_LMrppdLQ";
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
  });
  const legacy = document.getElementById("legacy-game-shell");
  const footer = document.getElementById("legacy-footer");
  if (!legacy || !footer) return;

  const style = document.createElement("style");
  style.textContent = "\n:root{--party-ink:#20325f;--party-muted:#667899;--party-blue:#22b9df;--party-coral:#ff635f;--party-lime:#8bd34e;--party-gold:#ffc33b;--party-purple:#a85be2}\nbody{font-family:system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif!important;background:#eaf5ff!important;color:var(--party-ink)!important}\nbody:before{content:\"\";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;background-image:radial-gradient(#bfd8eb 1px,transparent 1px);background-size:19px 19px}\n#pg-root{position:relative;z-index:1;width:min(100%,620px);margin:auto;padding:22px 17px calc(105px + env(safe-area-inset-bottom));color:var(--party-ink)}\n#pg-root button{-webkit-tap-highlight-color:transparent;touch-action:manipulation}\n#pg-root button:focus-visible,#pg-root input:focus-visible{outline:3px solid #23b9df;outline-offset:3px}\n#pg-root .brand{color:var(--party-ink);letter-spacing:-.055em;font-weight:1000}\n#pg-root .panel{border:2px solid #fff;background:rgba(255,255,255,.94);border-radius:24px;padding:19px;box-shadow:0 5px 0 #c6daec,0 12px 26px rgba(51,91,132,.09)}\n#pg-root .primary{background:linear-gradient(110deg,#ff625f,#f04d80);box-shadow:0 4px 0 #cc455d;color:#fff;border:0}\n#pg-root .field{display:block;width:100%;margin-top:7px;padding:13px 14px;border:2px solid #d8e7f3;border-radius:14px;background:#fff;color:var(--party-ink);font:inherit}\n#pg-root .field::placeholder{color:#96a7bd}\n#pg-root #pg-auth-panel #pg-username,#pg-root #pg-username{background:#fff!important;background-color:#fff!important;color:#20325f!important;-webkit-text-fill-color:#20325f!important;caret-color:#20325f!important;border:2px solid #22b9df!important;font-size:18px!important;font-weight:800!important;opacity:1!important;filter:none!important}\n#pg-root #pg-username::placeholder{color:#8293aa!important;-webkit-text-fill-color:#8293aa!important;opacity:1}\n#pg-root .tile{min-height:128px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;border:4px solid #fff;outline:2px solid #263969;background:#fff;border-radius:20px;padding:0;overflow:hidden;box-shadow:0 5px 0 #263969;transition:transform .16s ease,box-shadow .16s ease}\n#pg-root .tile:active{transform:translateY(3px) scale(.985);box-shadow:0 2px 0 #263969}\n#pg-root .pill{font-size:9px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;padding:5px 9px;border-radius:99px;background:#eaf4fb;color:#31436e}\n#pg-root .nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;margin-top:22px;padding:8px;border:2px solid #fff;border-radius:21px;background:rgba(255,255,255,.96);box-shadow:0 5px 0 #c6daec,0 10px 28px rgba(51,91,132,.12);position:sticky;bottom:calc(env(safe-area-inset-bottom) + 8px);z-index:15}\n#pg-root .nav button{display:flex;flex-direction:column;align-items:center;gap:3px;background:transparent;color:#586b8d;font-size:11px;font-weight:850;padding:9px 3px;border-radius:14px}\n#pg-root .nav button span{font-size:20px;line-height:1.1}\n#pg-root .nav button:active{background:#eaf6ff;transform:scale(.97)}\n#pg-root .hub-topbar{display:flex;justify-content:flex-start;margin-bottom:14px}\n#pg-root .hub-topbar button{border:2px solid #d7e7f3;background:#fff;color:var(--party-ink);border-radius:14px;padding:9px 13px;font-weight:800;font-size:12px;box-shadow:0 3px 0 #c6daec}\n#pg-root .pg-auth-brand{text-align:center;margin:18px auto 26px}\n#pg-root #pg-auth{background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:0!important}\n#pg-root .pg-brand-mark{width:76px;height:76px;margin:0 auto 12px;border:4px solid #fff;border-radius:25px;background:linear-gradient(145deg,#29c4e5,#168dc7);box-shadow:0 5px 0 #263969;display:grid;place-items:center;font-size:39px;transform:rotate(-5deg)}\n#pg-root .pg-kicker{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#39728f;font-weight:1000}\n#pg-root .pg-auth-brand h1{font-size:clamp(34px,9vw,48px);line-height:.98;margin:9px 0 11px}\n#pg-root .pg-color-line{display:flex;gap:4px;width:180px;height:7px;margin:14px auto;border-radius:9px;overflow:hidden}\n#pg-root .pg-color-line i{flex:1}\n#pg-root .pg-color-line i:nth-child(1){background:#ff625f}\n#pg-root .pg-color-line i:nth-child(2){background:#19b9e1}\n#pg-root .pg-color-line i:nth-child(3){background:#8bd34e}\n#pg-root .pg-color-line i:nth-child(4){background:#ffc33b}\n#pg-root .pg-auth-subtitle{color:#687c9a;font-size:13px;font-weight:650}\n#pg-root .pg-auth-panel{max-width:480px;margin:auto;padding:20px}\n#pg-root .pg-auth-panel h2{font-size:21px;font-weight:950;color:var(--party-ink)}\n#pg-root .pg-auth-panel label{color:#526987!important;font-weight:800}\n#pg-root .pg-auth-panel .grid button{min-height:44px;border-radius:13px}\n#pg-root #pg-guest{background:#e4f8ff;border:2px solid #bdeafa;color:#17789c}\n#pg-root .pg-home-header{margin:2px 0 20px;text-align:left}\n#pg-root .pg-home-brand{display:flex;align-items:center;gap:10px;margin-bottom:20px}\n#pg-root .pg-home-brand-mark{width:40px;height:40px;border:2px solid #fff;border-radius:13px;background:#fff;box-shadow:0 3px 0 #263969;display:grid;place-items:center;font-size:23px}\n#pg-root .pg-home-brand-name{font-size:14px;font-weight:1000;letter-spacing:.05em;color:var(--party-ink)}\n#pg-root .pg-home-eyebrow{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#4686a3;font-weight:950}\n#pg-root .pg-home-title{font-size:clamp(29px,7vw,38px);line-height:1.03;letter-spacing:-.05em;font-weight:1000;color:var(--party-ink);margin:7px 0}\n#pg-root #pg-welcome{font-size:13px;color:#6a7c98}\n#pg-root .pg-player-strip{display:flex;align-items:center;gap:13px;padding:13px 16px;margin-bottom:24px;border:3px solid #fff;border-radius:19px;background:linear-gradient(100deg,#fff,#effaff);box-shadow:0 4px 0 #c6daec}\n#pg-root .pg-avatar{width:48px;height:48px;border:3px solid #24376b;border-radius:15px;background:#ffd66b;display:grid;place-items:center;font-size:27px;flex-shrink:0}\n#pg-root .pg-player-meta{min-width:0;display:flex;flex-direction:column;gap:2px}\n#pg-root .pg-player-meta small{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#7190a6;font-weight:950}\n#pg-root #pg-player{font-size:16px;line-height:1.1;font-weight:1000;color:var(--party-ink);overflow:hidden;text-overflow:ellipsis}\n#pg-root #pg-account-type{font-size:11px;color:#70829c}\n#pg-root .pg-player-burst{margin-left:auto;font-size:27px}\n#pg-root .pg-library-heading{display:flex;align-items:end;justify-content:space-between;gap:10px;margin-bottom:12px}\n#pg-root .pg-library-heading p{font-size:10px;letter-spacing:.16em;text-transform:uppercase;font-weight:950;color:#4686a3}\n#pg-root .pg-library-heading h2{font-size:22px;line-height:1.1;font-weight:1000;letter-spacing:-.04em;color:var(--party-ink);margin-top:4px}\n#pg-root .pg-featured-game{width:100%;min-height:142px;margin-bottom:21px;padding:15px 16px;display:flex;flex-direction:row;align-items:center;gap:15px;text-align:left;position:relative;border:4px solid #fff;outline:2px solid #263969;border-radius:22px;background:linear-gradient(110deg,#ff6b64,#f34e87 58%,#a753da);box-shadow:0 6px 0 #263969;overflow:hidden;color:#fff}\n#pg-root .pg-featured-game:after{content:\"\";position:absolute;width:170px;height:170px;border:20px solid rgba(255,255,255,.13);border-radius:50%;right:-44px;top:-54px}\n#pg-root .pg-featured-art{width:88px;height:96px;flex-shrink:0;border:3px solid rgba(255,255,255,.85);border-radius:21px;background:rgba(255,255,255,.19);display:grid;place-items:center;font-size:55px;transform:rotate(-4deg);z-index:1}\n#pg-root .pg-featured-copy{min-width:0;position:relative;z-index:1}\n#pg-root .pg-featured-copy .pill{display:inline-block;background:rgba(255,255,255,.22);color:white;margin-bottom:8px}\n#pg-root .pg-featured-copy h3{font-size:20px;line-height:1.08;font-weight:1000;color:white}\n#pg-root .pg-featured-copy p{font-size:11px;line-height:1.35;color:#fff;margin-top:7px;opacity:.94}\n#pg-root .pg-game-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}\n#pg-root .pg-game-card{min-width:0;min-height:157px;animation:pg-card-in .35s both}\n#pg-root .pg-card-art{height:91px;min-height:91px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;border-bottom:2px solid #fff}\n#pg-root .pg-card-art:before{content:\"\";position:absolute;width:100px;height:100px;border:9px solid rgba(255,255,255,.28);border-radius:50%;right:-28px;top:-35px}\n#pg-root .pg-card-emoji{position:relative;z-index:1;font-size:48px;line-height:1;filter:drop-shadow(0 3px 0 rgba(26,43,83,.14));transform:rotate(-4deg)}\n#pg-root .pg-card-sticker{position:absolute;right:7px;top:7px;background:rgba(255,255,255,.78);border:1px solid rgba(32,50,95,.15);border-radius:99px;padding:3px 6px;color:#293966;font-size:8px;font-weight:1000;letter-spacing:.08em}\n#pg-root .pg-card-info{display:flex;flex-direction:column;gap:4px;padding:9px 9px 10px;min-height:59px;background:#fff;color:var(--party-ink)}\n#pg-root .pg-card-info strong{font-size:12px;line-height:1.15;font-weight:1000;letter-spacing:-.02em}\n#pg-root .pg-card-info small{font-size:9px;line-height:1.2;color:#71819b;font-weight:750}\n#pg-root .pg-game-card[data-tone=\"coral\"] .pg-card-art{background:#ffbcb5}\n#pg-root .pg-game-card[data-tone=\"cyan\"] .pg-card-art{background:#9be8f5}\n#pg-root .pg-game-card[data-tone=\"lime\"] .pg-card-art{background:#b9eb87}\n#pg-root .pg-game-card[data-tone=\"yellow\"] .pg-card-art{background:#ffe08a}\n#pg-root .pg-game-card[data-tone=\"purple\"] .pg-card-art{background:#d8b4f3}\n#pg-root .pg-game-card[data-tone=\"blue\"] .pg-card-art{background:#a8c8f7}\n#pg-root .pg-game-card[data-tone=\"pink\"] .pg-card-art{background:#f5b5d5}\n#pg-root .pg-game-card[data-tone=\"mint\"] .pg-card-art{background:#a5e4d0}\n#pg-root .pg-home-message{color:#7487a3}\n#pg-root #pg-profile-view .panel{margin-bottom:20px}\n#pg-root #pg-profile-stats{color:var(--party-ink)}\n#pg-root #pg-profile-stats .text-slate-400,#pg-root #pg-profile-stats .text-slate-500{color:#7789a4!important}\n#pg-root #pg-profile-stats .bg-slate-900{background:#eff7fc!important;border-color:#d7e7f3!important}\n#pg-root #pg-profile-stats .text-white,#pg-root #pg-profile-stats .text-slate-200{color:var(--party-ink)!important}\n#pg-root .pg-bottom-label{font-size:9px;line-height:1;font-weight:950}\n#pg-root .hidden{display:none!important}\n@keyframes pg-card-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}\n@media(max-width:360px){#pg-root{padding-left:12px;padding-right:12px}#pg-root .pg-game-grid{gap:10px}#pg-root .pg-card-info strong{font-size:11px}#pg-root .pg-featured-art{width:72px;height:84px;font-size:47px}}\n@media(prefers-reduced-motion:reduce){#pg-root *,#pg-root *:before,#pg-root *:after{animation:none!important;transition:none!important}}\n";
  document.head.appendChild(style);
  const root = document.createElement("main");
  root.id = "pg-root";
  root.innerHTML = "\n    <section id=\"pg-auth\">\n      <header class=\"pg-auth-brand\"><div class=\"pg-brand-mark\">🎲</div><p class=\"pg-kicker\">EVERYONE'S INVITED</p><h1 class=\"brand\">PARTY GAMES</h1><div class=\"pg-color-line\"><i></i><i></i><i></i><i></i></div><p class=\"pg-auth-subtitle\">Quick games. Big laughs. One phone or all your friends online.</p></header>\n      <div class=\"panel pg-auth-panel\">\n        <div class=\"mb-4\"><h2>What should we call you?</h2><p class=\"text-xs mt-1\" style=\"color:#7487a3\">Choose a player name and jump straight into the fun.</p></div>\n        <form id=\"pg-name-form\" class=\"space-y-3\"><label class=\"block text-xs\">YOUR PLAYER NAME<input id=\"pg-username\" class=\"field\" type=\"text\" maxlength=\"18\" autocomplete=\"nickname\" placeholder=\"e.g. Lalit\" required></label><button id=\"pg-start\" class=\"primary w-full rounded-xl py-3.5 font-extrabold\" type=\"submit\">LET'S PLAY 🎉</button></form>\n        <p id=\"pg-auth-message\" class=\"text-xs text-center mt-3\" style=\"color:#b56b34\" aria-live=\"polite\"></p><p class=\"text-[10px] text-center mt-4\" style=\"color:#8292a8\">No account. No password. Your name is saved on this device.</p>\n      </div>\n    </section>\n    <section id=\"pg-home\" class=\"hidden\">\n      <header class=\"pg-home-header\">\n        <div class=\"pg-home-brand\"><span class=\"pg-home-brand-mark\">🎲</span><span class=\"pg-home-brand-name\">PARTY GAMES</span></div>\n        <p class=\"pg-home-eyebrow\">YOUR GAME NIGHT STARTS HERE</p>\n        <h1 class=\"pg-home-title\">Pick a game.<br>Make some noise!</h1>\n        <p id=\"pg-welcome\" class=\"text-sm mt-2\">Pick a game and invite your friends.</p>\n      </header>\n      <div class=\"pg-player-strip\">\n        <span class=\"pg-avatar\">🎮</span>\n        <span class=\"pg-player-meta\"><small>YOUR PLAYER CARD</small><strong id=\"pg-player\">Guest Player</strong><span id=\"pg-account-type\">Guest session</span></span>\n        <span class=\"pg-player-burst\">⭐</span>\n      </div>\n      <div class=\"pg-library-heading\"><div><p>THE GAME LIBRARY</p><h2>What are we playing?</h2></div><span class=\"pill\">Play & laugh</span></div>\n      <button id=\"pg-undercover\" class=\"tile pg-featured-game\">\n        <span class=\"pg-featured-art\">🕵️</span>\n        <span class=\"pg-featured-copy\"><span class=\"pill\">ONLINE + OFFLINE</span><h3>Undercover Imposter</h3><p>Find the imposter · Bluff, clue and vote with your crew.</p></span>\n      </button>\n      <div class=\"grid grid-cols-2 gap-3 pg-game-grid\">\n        <div class=\"tile\"><div class=\"flex justify-between\"><span class=\"text-3xl\">🐺</span><span class=\"pill\">Coming soon</span></div><div><h3 class=\"font-extrabold\">Mafia / Werewolf</h3><p class=\"text-[11px] text-slate-400\">Trust no one.</p></div></div>\n        <div class=\"tile\"><div class=\"flex justify-between\"><span class=\"text-3xl\">🗺️</span><span class=\"pill\">Coming soon</span></div><div><h3 class=\"font-extrabold\">Spyfall</h3><p class=\"text-[11px] text-slate-400\">Find the spy.</p></div></div>\n      </div>\n      <nav class=\"nav\">\n        <button id=\"pg-home-nav\"><span>🏠</span><small class=\"pg-bottom-label\">HOME</small></button>\n        <button id=\"pg-games-nav\"><span>🎲</span><small class=\"pg-bottom-label\">GAMES</small></button>\n        <button id=\"pg-profile-nav\"><span>🏆</span><small class=\"pg-bottom-label\">PROFILE</small></button>\n        <button id=\"pg-signout\"><span>✏️</span><small class=\"pg-bottom-label\">CHANGE NAME</small></button>\n      </nav>\n      <p id=\"pg-home-message\" class=\"text-center text-[10px] mt-3\"></p>\n    </section>\n    <section id=\"pg-profile-view\" class=\"hidden\">\n      <div class=\"hub-topbar\"><button id=\"pg-profile-back\">← Back to Home</button></div>\n      <div class=\"panel\"><p class=\"text-xs uppercase tracking-widest font-bold\" style=\"color:#5590a8\">PLAYER PROFILE</p><h2 id=\"pg-profile-title\" class=\"text-2xl font-black mt-1\">Your Profile</h2><p class=\"text-xs mt-1 mb-4\" style=\"color:#71839d\">Your wins, match history and game-night stats</p><div id=\"pg-profile-stats\"></div></div>\n    </section>\n";

  document.body.insertBefore(root, legacy);
  // Register the welcome-screen handlers immediately after inserting the UI,
  // before optional game widgets can throw and interrupt later initialization.
  let session = null;
  const authView = document.getElementById("pg-auth");
  const homeView = document.getElementById("pg-home");
  const message = document.getElementById("pg-auth-message");
  const PLAYER_NAME_KEY = "party_games_player_name_v1";
  function showHome(nextSession, playerName) {
    session = nextSession || session || null;
    const label = (playerName || localStorage.getItem(PLAYER_NAME_KEY) || "Player").trim().slice(0,18);
    authView.classList.add("hidden"); homeView.classList.remove("hidden");
    legacy.classList.add("pg-hidden"); footer.classList.add("pg-hidden");
    document.getElementById("pg-player").textContent = label;
    document.getElementById("pg-account-type").textContent = "Ready to play · local profile";
    document.getElementById("pg-welcome").textContent = "Welcome, " + label + "! Pick your game.";
  }
  const nameForm = document.getElementById("pg-name-form");
  const nameInput = document.getElementById("pg-username");
  const startButton = document.getElementById("pg-start");
  document.getElementById("pg-undercover").addEventListener("click", () => {
    homeView.classList.add("hidden");
    legacy.classList.remove("pg-hidden");
    footer.classList.remove("pg-hidden");
    window.scrollTo({top:0,behavior:"smooth"});
  });
  window.__partyHubReady = true;
  function startWithPlayerName(event) {
    if (event) event.preventDefault();
    const label = nameInput.value.trim().replace(/\s+/g," ").slice(0,18);
    if (label.length < 2) {
      message.textContent = "Please enter at least 2 characters.";
      nameInput.focus();
      return;
    }
    localStorage.setItem(PLAYER_NAME_KEY,label);
    message.textContent = "";
    showHome(session,label);
    // Cloud sign-in is intentionally detached from the local launch path.
    Promise.resolve().then(() => client.auth.getSession()).then(async ({data}) => {
      session = data && data.session || null;
      if (!session) {
        const result = await client.auth.signInAnonymously();
        if (!result.error) session = result.data.session || null;
      }
    }).catch(() => {});
  }
  nameForm.addEventListener("submit", startWithPlayerName);
  startButton.addEventListener("click", startWithPlayerName);
  const savedPlayerName = localStorage.getItem(PLAYER_NAME_KEY);
  if (savedPlayerName) document.getElementById("pg-username").value = savedPlayerName;
  client.auth.getSession().then(({data}) => { session = data && data.session || null; if (savedPlayerName) showHome(session,savedPlayerName); })
    .catch(() => { if (savedPlayerName) showHome(null,savedPlayerName); });


  const legacyNav=document.createElement("div");
  legacyNav.className="flex items-center justify-between mb-3";
  legacyNav.innerHTML=`<button id="pg-return-home" type="button" class="px-3 py-2 rounded-xl bg-violet-900/60 border border-violet-400/30 text-violet-100 text-xs font-bold">← Party Games Home</button><span class="text-[10px] text-slate-500">Undercover Imposter</span>`;
  legacy.insertBefore(legacyNav,legacy.firstChild);

  const ttt = document.createElement("section");
  ttt.id = "pg-ttt";
  ttt.className = "hidden";
  ttt.innerHTML = `
    <div class="panel">
      <div class="flex items-center justify-between mb-4">
        <button id="pg-ttt-back" class="text-sm text-violet-200 font-bold">← Games</button>
        <span class="pill">OFFLINE · NO INTERNET</span>
      </div>
      <h2 class="text-2xl font-black text-center">❎ Tic Tac Toe</h2>
      <p class="text-xs text-slate-400 text-center mt-1">You are X · Bot is O</p>
      <div class="grid grid-cols-2 gap-2 mt-5">
        <label class="text-xs text-slate-300">Bot difficulty
          <select id="pg-ttt-level" class="field"><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option></select>
        </label>
        <label class="text-xs text-slate-300">Who starts?
          <select id="pg-ttt-start" class="field"><option value="human">You</option><option value="bot">Bot</option></select>
        </label>
      </div>
      <p id="pg-ttt-status" class="text-center font-bold text-lg mt-5" aria-live="polite">Your turn</p>
      <div id="pg-ttt-board" class="grid grid-cols-3 gap-2 max-w-xs mx-auto mt-4" role="group" aria-label="Tic Tac Toe board"></div>
      <div class="grid grid-cols-2 gap-2 mt-5">
        <button id="pg-ttt-new" class="primary rounded-xl py-3 font-bold">New game</button>
        <button id="pg-ttt-reset" class="rounded-xl py-3 font-bold bg-slate-700">Reset score</button>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-4 text-center">
        <div class="rounded-xl bg-slate-900/70 p-3"><p class="text-[10px] text-slate-400">YOU</p><p id="pg-ttt-you-score" class="text-xl font-black">0</p></div>
        <div class="rounded-xl bg-slate-900/70 p-3"><p class="text-[10px] text-slate-400">DRAWS</p><p id="pg-ttt-draw-score" class="text-xl font-black">0</p></div>
        <div class="rounded-xl bg-slate-900/70 p-3"><p class="text-[10px] text-slate-400">BOT</p><p id="pg-ttt-bot-score" class="text-xl font-black">0</p></div>
      </div>
    </div>`;
  root.appendChild(ttt);
  const tttStyle = document.createElement("style");
  tttStyle.textContent = `#pg-ttt .ttt-cell{aspect-ratio:1;border:1px solid #ffffff24;border-radius:16px;background:#10172b;font-size:clamp(2.5rem,12vw,4rem);font-weight:900;color:#e9d5ff}#pg-ttt .ttt-cell:disabled{opacity:1}#pg-ttt .ttt-cell.x{color:#67e8f9}#pg-ttt .ttt-cell.o{color:#f9a8d4}`;
  document.head.appendChild(tttStyle);
  let tttBoard=Array(9).fill("");
  let tttOver=false, tttTurn="X";
  const tttScore={you:0,draw:0,bot:0};
  const tttWins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const tttWinner=b=>{for(const line of tttWins){const [a,c,d]=line;if(b[a]&&b[a]===b[c]&&b[a]===b[d])return b[a];}return b.every(Boolean)?"draw":null;};
  function tttMinimax(b,player){
    const result=tttWinner(b);if(result==="O")return {score:10};if(result==="X")return {score:-10};if(result==="draw")return {score:0};
    const moves=[];for(let i=0;i<9;i++)if(!b[i]){b[i]=player;const next=tttMinimax(b,player==="O"?"X":"O");moves.push({index:i,score:next.score});b[i]="";}
    return moves.reduce((best,m)=>!best||(player==="O"?m.score>best.score:m.score<best.score)?m:best,null);
  }
  function tttBotMove(){
    const empty=tttBoard.map((v,i)=>v?null:i).filter(v=>v!==null);if(!empty.length)return;
    const level=document.getElementById("pg-ttt-level").value;
    let move;
    if(level==="hard")move=tttMinimax(tttBoard.slice(),"O").index;
    else {
      const winOrBlock=mark=>{for(const i of empty){const b=tttBoard.slice();b[i]=mark;if(tttWinner(b)===mark)return i;}return null;};
      if(level==="medium")move=winOrBlock("O")??winOrBlock("X");
      if(move===undefined||move===null){
        if(level==="medium"&&tttBoard[4]==="")move=4;
        else if(level==="medium"){const corners=[0,2,6,8].filter(i=>!tttBoard[i]);move=corners.length?corners[Math.floor(Math.random()*corners.length)]:empty[Math.floor(Math.random()*empty.length)];}
        else move=empty[Math.floor(Math.random()*empty.length)];
      }
    }
    tttBoard[move]="O";tttTurn="X";tttRender();
  }
  function tttFinish(){
    const result=tttWinner(tttBoard);if(!result)return false;tttOver=true;
    if(result==="X"){tttScore.you++;document.getElementById("pg-ttt-status").textContent="🎉 You win!";}
    else if(result==="O"){tttScore.bot++;document.getElementById("pg-ttt-status").textContent="🤖 Bot wins this round.";}
    else{tttScore.draw++;document.getElementById("pg-ttt-status").textContent="🤝 It's a draw.";}
    document.getElementById("pg-ttt-you-score").textContent=tttScore.you;
    document.getElementById("pg-ttt-draw-score").textContent=tttScore.draw;
    document.getElementById("pg-ttt-bot-score").textContent=tttScore.bot;return true;
  }
  function tttRender(){
    const board=document.getElementById("pg-ttt-board");board.innerHTML="";
    tttBoard.forEach((mark,i)=>{const btn=document.createElement("button");btn.type="button";btn.className="ttt-cell "+(mark==="X"?"x":mark==="O"?"o":"");btn.textContent=mark;btn.setAttribute("aria-label","Cell "+(i+1)+(mark?", "+mark:" empty"));btn.disabled=!!mark||tttOver||tttTurn!=="X";btn.addEventListener("click",()=>{if(tttOver||tttTurn!=="X"||tttBoard[i])return;tttBoard[i]="X";if(tttFinish()){tttRender();return;}tttTurn="O";document.getElementById("pg-ttt-status").textContent="Bot is thinking…";tttRender();window.setTimeout(()=>{if(!tttOver){tttBotMove();if(!tttFinish())document.getElementById("pg-ttt-status").textContent="Your turn";tttRender();}},320);});board.appendChild(btn);});
    if(!tttOver)document.getElementById("pg-ttt-status").textContent=tttTurn==="X"?"Your turn":"Bot is thinking…";
  }
  function tttNewGame(){
    tttBoard=Array(9).fill("");tttOver=false;tttTurn="X";tttRender();
    if(document.getElementById("pg-ttt-start").value==="bot"){tttTurn="O";tttRender();window.setTimeout(()=>{if(!tttOver){tttBotMove();tttRender();}},320);}
  }
  root.addEventListener("click",event=>{const card=event.target.closest&&event.target.closest("#pg-tictactoe");if(!card)return;homeView.classList.add("hidden");ttt.classList.remove("hidden");tttNewGame();window.scrollTo({top:0,behavior:"smooth"});});
  document.getElementById("pg-ttt-back").addEventListener("click",()=>{ttt.classList.add("hidden");homeView.classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"});});
  document.getElementById("pg-ttt-new").addEventListener("click",tttNewGame);
  document.getElementById("pg-ttt-reset").addEventListener("click",()=>{tttScore.you=tttScore.draw=tttScore.bot=0;document.getElementById("pg-ttt-you-score").textContent="0";document.getElementById("pg-ttt-draw-score").textContent="0";document.getElementById("pg-ttt-bot-score").textContent="0";tttNewGame();});


  const miniGames=document.createElement("div");
  miniGames.className="mt-3";
  miniGames.innerHTML=`
    <section id="pg-rps-game" class="hidden panel">
      <div class="flex justify-between"><button id="pg-rps-back" class="text-sm text-violet-200 font-bold">← Games</button><span class="pill">OFFLINE · BOT</span></div>
      <h2 class="text-2xl font-black text-center mt-4">✊ Rock Paper Scissors</h2>
      <p class="text-xs text-slate-400 text-center">First to 3 points wins</p>
      <p id="pg-rps-status" class="text-center text-lg font-bold mt-5">Choose your move</p>
      <div class="grid grid-cols-3 gap-2 mt-4">
        <button class="pg-rps-choice rounded-2xl bg-slate-900 p-4 text-3xl" data-move="rock">✊<span class="block text-xs">Rock</span></button>
        <button class="pg-rps-choice rounded-2xl bg-slate-900 p-4 text-3xl" data-move="paper">✋<span class="block text-xs">Paper</span></button>
        <button class="pg-rps-choice rounded-2xl bg-slate-900 p-4 text-3xl" data-move="scissors">✌️<span class="block text-xs">Scissors</span></button>
      </div>
      <div class="grid grid-cols-2 gap-3 text-center mt-5">
        <div class="rounded-xl bg-slate-900 p-3"><p class="text-xs text-cyan-300">YOU</p><p id="pg-rps-you" class="text-3xl font-black">0</p></div>
        <div class="rounded-xl bg-slate-900 p-3"><p class="text-xs text-pink-300">BOT</p><p id="pg-rps-bot" class="text-3xl font-black">0</p></div>
      </div>
      <p id="pg-rps-last" class="text-center text-sm mt-4">Best of five rounds</p>
      <button id="pg-rps-new" class="primary w-full rounded-xl py-3 mt-4 font-bold">New match</button>
    </section>
    <section id="pg-quiz-game" class="hidden panel">
      <div class="flex justify-between"><button id="pg-quiz-back" class="text-sm text-violet-200 font-bold">← Games</button><span class="pill">OFFLINE · BOT</span></div>
      <h2 class="text-2xl font-black text-center mt-4">🧠 Quiz Battle</h2>
      <p class="text-xs text-slate-400 text-center">10 general knowledge questions</p>
      <div class="flex justify-between text-xs mt-5"><span id="pg-quiz-progress">Question 1 / 10</span><span id="pg-quiz-score">You 0 · Bot 0</span></div>
      <div class="h-1.5 bg-slate-800 rounded-full mt-2"><div id="pg-quiz-bar" class="h-1.5 bg-fuchsia-400 rounded-full" style="width:0%"></div></div>
      <p id="pg-quiz-question" class="font-bold text-lg mt-5 min-h-14"></p>
      <div id="pg-quiz-options" class="grid gap-2 mt-4"></div>
      <p id="pg-quiz-feedback" class="text-sm text-center mt-4 min-h-10" aria-live="polite"></p>
      <button id="pg-quiz-next" class="primary w-full rounded-xl py-3 mt-3 font-bold" disabled>Next question</button>
      <div id="pg-quiz-result" class="hidden text-center mt-5"><p class="text-2xl font-black">Match complete</p><p id="pg-quiz-final" class="text-sm mt-2"></p><button id="pg-quiz-again" class="primary w-full rounded-xl py-3 mt-4 font-bold">Play again</button></div>
    </section>`;
  root.appendChild(miniGames);
  let rpsHuman=0,rpsMachine=0,rpsFinished=false;
  const rpsSymbols={rock:"✊",paper:"✋",scissors:"✌️"};
  function rpsPaint(){
    document.getElementById("pg-rps-you").textContent=rpsHuman;
    document.getElementById("pg-rps-bot").textContent=rpsMachine;
    document.querySelectorAll(".pg-rps-choice").forEach(b=>b.disabled=rpsFinished);
  }
  function rpsReset(){
    rpsHuman=0;rpsMachine=0;rpsFinished=false;
    document.getElementById("pg-rps-status").textContent="Choose your move";
    document.getElementById("pg-rps-last").textContent="First to 3 points wins";
    rpsPaint();
  }
  document.querySelectorAll(".pg-rps-choice").forEach(btn=>btn.addEventListener("click",()=>{
    if(rpsFinished)return;
    const human=btn.dataset.move;
    const options=["rock","paper","scissors"];
    const bot=options[Math.floor(Math.random()*3)];
    let outcome="draw";
    if(human!==bot)outcome=({rock:"scissors",paper:"rock",scissors:"paper"}[human]===bot)?"win":"lose";
    if(outcome==="win")rpsHuman++;if(outcome==="lose")rpsMachine++;
    document.getElementById("pg-rps-last").textContent="You "+rpsSymbols[human]+" · Bot "+rpsSymbols[bot]+" — "+(outcome==="draw"?"Draw":outcome==="win"?"You win this round":"Bot wins this round");
    if(rpsHuman>=3||rpsMachine>=3){rpsFinished=true;document.getElementById("pg-rps-status").textContent=rpsHuman>=3?"🏆 You won the match!":"🤖 Bot won the match!";}
    else document.getElementById("pg-rps-status").textContent=outcome==="draw"?"Tie — try again":outcome==="win"?"Good move!":"Next round!";
    rpsPaint();
  }));
  document.getElementById("pg-rps-new").addEventListener("click",rpsReset);

  const quizBank=[
    {q:"Which is the largest planet in our solar system?",a:["Earth","Jupiter","Saturn","Mars"],c:1},
    {q:"What is the capital of Rajasthan?",a:["Udaipur","Jodhpur","Jaipur","Kota"],c:2},
    {q:"How many sides does a hexagon have?",a:["Five","Six","Seven","Eight"],c:1},
    {q:"Which gas do plants absorb?",a:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],c:2},
    {q:"Who wrote India's national anthem?",a:["Bankim Chandra","Rabindranath Tagore","Sarojini Naidu","Premchand"],c:1},
    {q:"What is the chemical symbol for gold?",a:["Ag","Gd","Go","Au"],c:3},
    {q:"Which is the fastest land animal?",a:["Lion","Cheetah","Horse","Leopard"],c:1},
    {q:"How many minutes are in 2.5 hours?",a:["120","135","150","180"],c:2},
    {q:"Which ocean is the largest?",a:["Atlantic","Indian","Arctic","Pacific"],c:3},
    {q:"What is the square root of 144?",a:["10","11","12","14"],c:2},
    {q:"Which city is called the Pink City?",a:["Jaipur","Jaisalmer","Bikaner","Ajmer"],c:0},
    {q:"Which part is known as a computer's brain?",a:["RAM","CPU","SSD","Monitor"],c:1},
    {q:"At sea level, water boils at?",a:["90°C","95°C","100°C","110°C"],c:2},
    {q:"What is India's national animal?",a:["Elephant","Lion","Bengal tiger","Peacock"],c:2},
    {q:"How many players per team are on a football field?",a:["9","10","11","12"],c:2}
  ];
  let quizSet=[],quizAt=0,quizHuman=0,quizMachine=0,quizAnswered=false;
  function quizScore(){document.getElementById("pg-quiz-score").textContent="You "+quizHuman+" · Bot "+quizMachine;}
  function quizStart(){
    quizSet=quizBank.slice().sort(()=>Math.random()-.5).slice(0,10);
    quizAt=0;quizHuman=0;quizMachine=0;quizAnswered=false;
    document.getElementById("pg-quiz-result").classList.add("hidden");
    document.getElementById("pg-quiz-next").classList.remove("hidden");
    quizRender();
  }
  function quizRender(){
    const q=quizSet[quizAt];
    quizAnswered=false;
    document.getElementById("pg-quiz-progress").textContent="Question "+(quizAt+1)+" / 10";
    document.getElementById("pg-quiz-bar").style.width=(quizAt*10)+"%";
    document.getElementById("pg-quiz-question").textContent=q.q;
    document.getElementById("pg-quiz-feedback").textContent="";
    const area=document.getElementById("pg-quiz-options");area.innerHTML="";
    q.a.forEach((answer,i)=>{
      const b=document.createElement("button");b.type="button";
      b.className="w-full text-left rounded-xl bg-slate-900 border border-white/10 p-3 text-sm";
      b.textContent=String.fromCharCode(65+i)+". "+answer;
      b.addEventListener("click",()=>quizAnswer(i));area.appendChild(b);
    });
    const next=document.getElementById("pg-quiz-next");next.disabled=true;
    next.textContent=quizAt===9?"Show results":"Next question";quizScore();
  }
  function quizAnswer(choice){
    if(quizAnswered)return;quizAnswered=true;
    const q=quizSet[quizAt];
    const botChance=quizAt<4?.5:quizAt<7?.7:.85;
    const botRight=Math.random()<botChance;
    if(choice===q.c)quizHuman++;if(botRight)quizMachine++;
    document.querySelectorAll("#pg-quiz-options button").forEach((b,i)=>{
      b.disabled=true;
      if(i===q.c)b.classList.add("border-emerald-400");
      else if(i===choice)b.classList.add("border-rose-400");
    });
    document.getElementById("pg-quiz-feedback").textContent=(choice===q.c?"Correct! ":"Not quite. Answer: "+q.a[q.c]+". ")+"Bot "+(botRight?"answered correctly.":"got it wrong.");
    quizScore();document.getElementById("pg-quiz-next").disabled=false;
  }
  function quizNext(){
    if(!quizAnswered)return;
    if(quizAt<9){quizAt++;quizRender();return;}
    document.getElementById("pg-quiz-bar").style.width="100%";
    document.getElementById("pg-quiz-options").innerHTML="";
    document.getElementById("pg-quiz-question").textContent="";
    document.getElementById("pg-quiz-feedback").textContent="";
    document.getElementById("pg-quiz-next").classList.add("hidden");
    document.getElementById("pg-quiz-result").classList.remove("hidden");
    document.getElementById("pg-quiz-final").textContent="You: "+quizHuman+"/10 · Bot: "+quizMachine+"/10 — "+(quizHuman>quizMachine?"You win! 🎉":quizHuman<quizMachine?"Bot wins this time. 🤖":"It's a draw! 🤝");
  }
  document.getElementById("pg-quiz-next").addEventListener("click",quizNext);
  document.getElementById("pg-quiz-again").addEventListener("click",quizStart);
  function openMiniGame(id){
    homeView.classList.add("hidden");
    document.getElementById(id).classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function closeMiniGame(id){
    document.getElementById(id).classList.add("hidden");
    homeView.classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
  }
  document.getElementById("pg-rps-card").addEventListener("click",()=>{openMiniGame("pg-rps-game");rpsReset();});
  document.getElementById("pg-quiz-card").addEventListener("click",()=>{openMiniGame("pg-quiz-game");quizStart();});
  document.getElementById("pg-rps-back").addEventListener("click",()=>closeMiniGame("pg-rps-game"));
  document.getElementById("pg-quiz-back").addEventListener("click",()=>closeMiniGame("pg-quiz-game"));

  // Offline party games: local-only engines and bundled prompt/question packs.
  const offlineSection=document.createElement("div");
  offlineSection.id="pg-offline-extra";
  offlineSection.className="mt-3 space-y-3";
  offlineSection.innerHTML=`
    <section id="pg-simple-game" class="hidden panel">
      <div class="flex justify-between"><button id="pg-simple-back" class="text-sm text-violet-200 font-bold">← Games</button><span class="pill">OFFLINE · LOCAL</span></div>
      <h2 id="pg-simple-title" class="text-2xl font-black text-center mt-4"></h2>
      <p id="pg-simple-instructions" class="text-xs text-slate-400 text-center mt-2"></p>
      <div id="pg-simple-setup" class="mt-4 space-y-3"></div>
      <div id="pg-simple-play" class="mt-4 space-y-3"></div>
    </section>
    <section id="pg-snl-game" class="hidden panel">
      <div class="flex justify-between"><button class="pg-extra-back text-sm text-violet-200 font-bold">← Games</button><span class="pill">OFFLINE · 2–4 PLAYERS</span></div>
      <h2 class="text-2xl font-black text-center mt-3">🐍 Snakes & Ladders</h2>
      <div id="pg-snl-wrap" class="relative mt-4"><div id="pg-snl-board" class="grid grid-cols-10 gap-1"></div><svg id="pg-snl-art" class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none"></svg></div>
      <p id="pg-snl-status" class="text-center font-bold mt-4">Set up players</p>
      <div id="pg-snl-controls" class="mt-3 space-y-2"></div>
    </section>
    <section id="pg-ludo-game" class="hidden panel">
      <div class="flex justify-between"><button class="pg-extra-back text-sm text-violet-200 font-bold">← Games</button><span class="pill">OFFLINE · 2–4 PLAYERS</span></div>
      <h2 class="text-2xl font-black text-center mt-3">🎲 Ludo</h2>
      <p class="text-xs text-slate-400 text-center">Local Pass & Play · Six to enter · Exact roll to finish</p>
      <div id="pg-ludo-players" class="grid grid-cols-2 gap-2 mt-4"></div>
      <p id="pg-ludo-status" class="text-center font-bold mt-4">Set up players</p>
      <div id="pg-ludo-controls" class="mt-3 space-y-2"></div>
      <div id="pg-ludo-track" class="grid grid-cols-7 gap-1 mt-4"></div>
    </section>`;
  root.appendChild(offlineSection);
  const extraCards=[
    ["pg-stop-card","🔤","Name Place Animal Thing","Pass & Play · timed rounds","coral"],
    ["pg-20q-card","❓","20 Questions","Guess the secret object","cyan"],
    ["pg-who-card","🪪","Who Am I?","Clues · Pass & Play","purple"],
    ["pg-charades-card","🎭","Dumb Charades","Movie prompts · teams","pink"],
    ["pg-dialogue-card","🎬","Bollywood Dialogue Challenge","Guess the film or actor","yellow"],
    ["pg-music-card","🎵","Bollywood Music Quiz","Song trivia · no audio","blue"],
    ["pg-snl-card","🐍","Snakes & Ladders","2–4 players · bots optional","lime"],
    ["pg-ludo-card","🎲","Ludo","2–4 players · local play","mint"],
    ["pg-memory-card","🧠","Memory Match","Find matching pairs · solo","cyan"],
    ["pg-connect-card","🔴","Connect Four","2 players or vs bot","coral"],
    ["pg-wordchain-card","🔗","Word Chain","Take turns · last letter wins","purple"],
    ["pg-number-card","🔢","Number Challenge","Quick mental maths · 10 rounds","yellow"],
    ["pg-tictactoe","❎","Tic Tac Toe","Solo bot · quick rounds","blue"],
    ["pg-rps-card","✊","Rock Paper Scissors","First to 3 · play vs bot","pink"],
    ["pg-quiz-card","🧠","Quiz Battle","10 questions · beat the bot","lime"]
  ];
  const gameGrid=root.querySelector("#pg-home .grid.grid-cols-2");
  if(gameGrid){
    gameGrid.innerHTML="";
    extraCards.forEach(([id,emoji,name,desc,tone])=>{
      const b=document.createElement("button");b.id=id;b.type="button";b.className="tile pg-game-card";b.dataset.tone=tone;
      b.innerHTML='<span class="pg-card-art"><span class="pg-card-emoji">'+emoji+'</span><span class="pg-card-sticker">PLAY</span></span><span class="pg-card-info"><strong>'+name+'</strong><small>'+desc+'</small></span>';
      gameGrid.appendChild(b);
    });
  }
  const extraBack=()=>{["pg-simple-game","pg-snl-game","pg-ludo-game"].forEach(id=>document.getElementById(id).classList.add("hidden"));homeView.classList.remove("hidden");window.scrollTo(0,0);};
  document.getElementById("pg-simple-back").addEventListener("click",extraBack);
  document.querySelectorAll(".pg-extra-back").forEach(b=>b.addEventListener("click",extraBack));
  function showSimple(title,description,setupHTML){
    ["pg-ttt","pg-rps-game","pg-quiz-game","pg-snl-game","pg-ludo-game"].forEach(id=>{const e=document.getElementById(id);if(e)e.classList.add("hidden");});
    homeView.classList.add("hidden");const sec=document.getElementById("pg-simple-game");sec.classList.remove("hidden");
    document.getElementById("pg-simple-title").textContent=title;document.getElementById("pg-simple-instructions").textContent=description;
    document.getElementById("pg-simple-setup").innerHTML=setupHTML;document.getElementById("pg-simple-play").innerHTML="";window.scrollTo(0,0);
  }
  const $id=id=>document.getElementById(id);
  const stopLetters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  function launchStop(){
    showSimple("🔤 Name Place Animal Thing","Everyone writes answers for the same letter. Score 10 unique, 5 repeated, 0 blank.",'<label class="block text-sm">Players (2–8)<input id="stop-count" class="field" type="number" min="2" max="8" value="3"></label><button id="stop-start" class="primary w-full rounded-xl py-3 font-bold">Start round</button>');
    $id("stop-start").onclick=()=>{
      const n=Math.max(2,Math.min(8,Number($id("stop-count").value)||3)),letter=stopLetters[Math.floor(Math.random()*26)];
      const cats=["Name","Place","Animal","Thing"];
      $id("pg-simple-play").innerHTML='<p class="text-center text-3xl font-black">'+letter+'</p><p class="text-xs text-slate-400 text-center">Pass the device between players. Enter answers for '+letter+'.</p>'+Array.from({length:n},(_,p)=>'<div class="panel"><h3 class="font-bold">Player '+(p+1)+'</h3>'+cats.map(c=>'<label class="block text-xs mt-2">'+c+'<input class="field stop-answer" data-player="'+p+'" data-cat="'+c+'" placeholder="'+c+' starting with '+letter+'"></label>').join("")+'</div>').join("")+'<button id="stop-score" class="primary w-full rounded-xl py-3 font-bold">Reveal scores</button><div id="stop-results" class="mt-3"></div>';
      $id("stop-score").onclick=()=>{
        const vals=[...document.querySelectorAll(".stop-answer")],answers=vals.map(x=>x.value.trim().toLowerCase()),scores=Array(n).fill(0);
        vals.forEach((x,i)=>{const v=answers[i];if(!v||v[0]!==letter.toLowerCase())return;const same=answers.filter(a=>a===v).length;scores[Number(x.dataset.player)]+=same===1?10:5;});
        $id("stop-results").innerHTML=scores.map((v,i)=>'<p class="flex justify-between border-b border-white/10 py-2">Player '+(i+1)+' <b>'+v+' points</b></p>').join("")+'<button id="stop-again" class="primary w-full rounded-xl py-3 mt-3">Next round</button>';
        $id("stop-again").onclick=launchStop;
      };
    };
  }
  const twentyDeck=[
    {w:"elephant",a:{living:true,animal:true,food:false,place:false,manmade:false,bigger:true,water:false,transport:false}},
    {w:"bicycle",a:{living:false,animal:false,food:false,place:false,manmade:true,bigger:false,water:false,transport:true}},
    {w:"Taj Mahal",a:{living:false,animal:false,food:false,place:true,manmade:true,bigger:true,water:false,transport:false}},
    {w:"mango",a:{living:true,animal:false,food:true,place:false,manmade:false,bigger:false,water:false,transport:false}},
    {w:"cricket",a:{living:false,animal:false,food:false,place:false,manmade:false,bigger:false,water:false,transport:false}},
    {w:"umbrella",a:{living:false,animal:false,food:false,place:false,manmade:true,bigger:false,water:false,transport:false}},
    {w:"train",a:{living:false,animal:false,food:false,place:false,manmade:true,bigger:true,water:false,transport:true}},
    {w:"tiger",a:{living:true,animal:true,food:false,place:false,manmade:false,bigger:true,water:false,transport:false}},
    {w:"pizza",a:{living:false,animal:false,food:true,place:false,manmade:true,bigger:false,water:false,transport:false}},
    {w:"ocean",a:{living:false,animal:false,food:false,place:true,manmade:false,bigger:true,water:true,transport:false}},
    {w:"car",a:{living:false,animal:false,food:false,place:false,manmade:true,bigger:true,water:false,transport:true}},
    {w:"dog",a:{living:true,animal:true,food:false,place:false,manmade:false,bigger:false,water:false,transport:false}},
    {w:"school",a:{living:false,animal:false,food:false,place:true,manmade:true,bigger:true,water:false,transport:false}},
    {w:"banana",a:{living:true,animal:false,food:true,place:false,manmade:false,bigger:false,water:false,transport:false}},
    {w:"airplane",a:{living:false,animal:false,food:false,place:false,manmade:true,bigger:true,water:false,transport:true}}
  ];
  function launchTwenty(){
    showSimple("❓ 20 Questions","The app picks a secret word. Ask one of the 20 yes/no questions, then guess it.",'<button id="twenty-start" class="primary w-full rounded-xl py-3">Start guessing</button>');
    $id("twenty-start").onclick=()=>{
      const item=twentyDeck[Math.floor(Math.random()*twentyDeck.length)],keys=[["Is it alive?","living"],["Is it an animal?","animal"],["Can you eat it?","food"],["Is it a place?","place"],["Is it made by humans?","manmade"],["Is it bigger than a person?","bigger"],["Is it related to water?","water"],["Can it be used for transport?","transport"]];
      let asked=0,used=new Set();
      const render=()=>{
        const available=keys.filter(k=>!used.has(k[1]));
        $id("pg-simple-play").innerHTML='<p class="text-sm text-center">Questions used: '+asked+'/20</p><div class="grid gap-2">'+available.map(k=>'<button class="twenty-question text-left rounded-xl bg-slate-900 p-3 text-sm" data-key="'+k[1]+'">'+k[0]+'</button>').join("")+'</div><div class="panel mt-3"><label class="block text-sm">Your guess<input id="twenty-guess" class="field" placeholder="What is the secret word?"></label><button id="twenty-submit" class="primary w-full rounded-xl py-3 mt-3">Check guess</button></div><p id="twenty-feedback" class="text-center mt-3"></p>';
        document.querySelectorAll(".twenty-question").forEach(b=>b.onclick=()=>{if(asked>=20)return;asked++;used.add(b.dataset.key);$id("twenty-feedback").textContent=b.textContent+" "+(item.a[b.dataset.key]?"Yes":"No");renderQuestionCount();});
        $id("twenty-submit").onclick=()=>{$id("twenty-feedback").textContent=$id("twenty-guess").value.trim().toLowerCase()===item.w.toLowerCase()?"Correct! 🎉":"Not quite. The word was "+item.w+".";document.querySelectorAll(".twenty-question,#twenty-submit").forEach(b=>b.disabled=true);};
      };
      const renderQuestionCount=()=>{const p=$id("pg-simple-play").querySelector("p");if(p)p.textContent="Questions used: "+asked+"/20";};
      render();
    };
  }
  const identityDeck=["Mahatma Gandhi","Albert Einstein","Virat Kohli","A famous chef","A movie director","A doctor","A school teacher","A cricket umpire","A pilot","A singer","A scientist","A freedom fighter","A detective","A photographer","A footballer","A painter"];
  function launchWho(){
    showSimple("🪪 Who Am I?","Pass the device. One player sees their identity, then gives the device to the group for yes/no questions.",'<label class="block text-sm">Players (2–8)<input id="who-count" class="field" type="number" min="2" max="8" value="4"></label><button id="who-start" class="primary w-full rounded-xl py-3">Start</button>');
    $id("who-start").onclick=()=>{const n=Math.max(2,Math.min(8,Number($id("who-count").value)||4)),deck=identityDeck.slice().sort(()=>Math.random()-.5).slice(0,n);let p=0;
      const render=()=>{$id("pg-simple-play").innerHTML='<div class="panel text-center"><p>Player '+(p+1)+' — look privately</p><button id="who-reveal" class="primary rounded-xl px-5 py-3 mt-3">Reveal my identity</button><p id="who-word" class="text-2xl font-black mt-4"></p></div><button id="who-next" class="bg-slate-700 w-full rounded-xl py-3 mt-3">'+(p===n-1?"Finish setup":"Next player")+'</button>';
        $id("who-reveal").onclick=()=>{$id("who-word").textContent=deck[p];$id("who-reveal").disabled=true;};
        $id("who-next").onclick=()=>{p++;if(p<n)render();else $id("pg-simple-play").innerHTML='<p class="text-center font-bold">Everyone has received an identity. Start asking yes/no questions!</p><button class="primary w-full rounded-xl py-3" onclick="document.getElementById(\'pg-simple-back\').click()">Back to games</button>';};
      };render();
    };
  }
  const moviePrompts=["3 Idiots","Sholay","Dangal","Lagaan","Dilwale Dulhania Le Jayenge","Chak De! India","Munna Bhai M.B.B.S.","Queen","Zindagi Na Milegi Dobara","Bajrangi Bhaijaan","PK","Hera Pheri","Taare Zameen Par","Jab We Met","Andaz Apna Apna","Koi... Mil Gaya"];
  const dialoguePrompts=[
    ["Mere paas maa hai","Deewaar"],["Kitne aadmi the?","Sholay"],["All is well","3 Idiots"],["Bade bade deshon mein","Dilwale Dulhania Le Jayenge"],["Mogambo khush hua","Mr. India"],["Don ko pakadna mushkil hi nahi","Don"],["Picture abhi baaki hai","Om Shanti Om"],["How's the josh?","Uri: The Surgical Strike"],["Utha le re baba","Hera Pheri"],["Tension lene ka nahi, dene ka","Munnabhai M.B.B.S."]
  ];
  const musicPrompts=[["Who sang the title track of Aashiqui 2?","Arijit Singh"],["Which film features the song 'Chaiyya Chaiyya'?","Dil Se"],["Who composed the music for 'Kal Ho Naa Ho'?","Shankar–Ehsaan–Loy"],["Which film features 'Kesariya'?","Brahmastra"],["Who sang 'Tum Hi Ho'?","Arijit Singh"],["Which film features 'Jai Ho'?","Slumdog Millionaire"],["Who composed music for DDLJ?","Jatin–Lalit"],["Which singer is known for 'Why This Kolaveri Di'?","Dhanush"],["Which film features 'Gallan Goodiyaan'?","Dil Dhadakne Do"],["Who sang 'Tujh Mein Rab Dikhta Hai'?","Roop Kumar Rathod"]];
  function launchPromptQuiz(kind){
    const isDialogue=kind==="dialogue",bank=isDialogue?dialoguePrompts:musicPrompts;
    showSimple(isDialogue?"🎬 Bollywood Dialogue Challenge":"🎵 Bollywood Music Quiz",isDialogue?"Guess the movie from a famous dialogue (text clue only).":"Bollywood music trivia. No copyrighted audio is bundled.",'<label class="block text-sm">Rounds (5–10)<input id="prompt-rounds" class="field" type="number" min="5" max="10" value="5"></label><button id="prompt-start" class="primary w-full rounded-xl py-3">Start quiz</button>');
    $id("prompt-start").onclick=()=>{const n=Math.max(5,Math.min(10,Number($id("prompt-rounds").value)||5)),set=bank.slice().sort(()=>Math.random()-.5).slice(0,n);let at=0,score=0;
      const render=()=>{if(at>=set.length){$id("pg-simple-play").innerHTML='<p class="text-center text-2xl font-black">Score: '+score+'/'+n+'</p><button id="prompt-again" class="primary w-full rounded-xl py-3">Play again</button>';$id("prompt-again").onclick=()=>launchPromptQuiz(kind);return;}
        const item=set[at];$id("pg-simple-play").innerHTML='<p class="text-xs text-slate-400">Question '+(at+1)+' / '+n+'</p><p class="text-lg font-bold mt-3">'+(isDialogue?"“"+item[0]+"”":"🎼 "+item[0])+'</p><input id="prompt-answer" class="field" placeholder="'+(isDialogue?"Movie name":"Answer")+'"><button id="prompt-check" class="primary w-full rounded-xl py-3 mt-3">Check answer</button><p id="prompt-feedback" class="text-center mt-3"></p>';
        $id("prompt-check").onclick=()=>{const ok=$id("prompt-answer").value.trim().toLowerCase()===item[1].toLowerCase();if(ok)score++;$id("prompt-feedback").textContent=(ok?"Correct! ":"Answer: ")+item[1];$id("prompt-check").textContent="Next";$id("prompt-check").onclick=()=>{at++;render();};};
      };render();
    };
  }
  document.getElementById("pg-stop-card").onclick=launchStop;
  document.getElementById("pg-20q-card").onclick=launchTwenty;
  document.getElementById("pg-who-card").onclick=launchWho;
  document.getElementById("pg-charades-card").onclick=()=>{
    showSimple("🎭 Dumb Charades","Act without speaking. Pass the device to the actor to privately reveal the movie prompt.",'<label class="block text-sm">Team / player count<input id="charades-count" class="field" type="number" min="2" max="8" value="4"></label><button id="charades-start" class="primary w-full rounded-xl py-3">Get a prompt</button>');
    $id("charades-start").onclick=()=>{const p=moviePrompts[Math.floor(Math.random()*moviePrompts.length)];$id("pg-simple-play").innerHTML='<div class="panel text-center"><p class="text-sm">Actor only — show privately</p><p id="charades-word" class="text-2xl font-black blur-md mt-3">'+p+'</p><button id="charades-reveal" class="primary rounded-xl px-5 py-3 mt-4">Reveal prompt</button></div><button id="charades-next" class="bg-slate-700 w-full rounded-xl py-3 mt-3">Next prompt</button>';$id("charades-reveal").onclick=()=>$id("charades-word").classList.remove("blur-md");$id("charades-next").onclick=()=>{$id("charades-start").click();};};
  };
  document.getElementById("pg-dialogue-card").onclick=()=>launchPromptQuiz("dialogue");
  document.getElementById("pg-music-card").onclick=()=>launchPromptQuiz("music");

  // Snakes & Ladders: local hot-seat players and optional bot seats.
  const snlJumps={4:14,9:31,17:7,20:38,28:84,40:59,51:67,54:34,62:19,63:81,64:60,71:91,87:24,93:73,95:75,99:78};
  let snlPlayers=[],snlTurn=0,snlDone=false,snlRolling=false,snlLastRoll=0,snlMessage="";
  const diceFaces=["⚀","⚁","⚂","⚃","⚄","⚅"];
  const snlPoint=n=>{const row=Math.floor((n-1)/10),offset=(n-1)%10,col=row%2===0?offset:9-offset;return {x:col*10+5,y:(9-row)*10+5};};
  function snlArtwork(){const svg=$id("pg-snl-art");let out="";Object.entries(snlJumps).forEach(([fs,ts])=>{const from=snlPoint(+fs),to=snlPoint(ts),ladder=ts>+fs,dx=to.x-from.x,dy=to.y-from.y;if(ladder){const len=Math.hypot(dx,dy)||1,ox=-dy/len*1.7,oy=dx/len*1.7;out+='<g stroke="#fbbf24" stroke-width="1.05" stroke-linecap="round"><path d="M '+(from.x+ox)+' '+(from.y+oy)+' L '+(to.x+ox)+' '+(to.y+oy)+'"/><path d="M '+(from.x-ox)+' '+(from.y-oy)+' L '+(to.x-ox)+' '+(to.y-oy)+'"/>';for(let t=.12;t<.95;t+=.16){const x=from.x+dx*t,y=from.y+dy*t;out+='<path d="M '+(x+ox)+' '+(y+oy)+' L '+(x-ox)+' '+(y-oy)+'"/>';}out+='</g>';}else{const len=Math.hypot(dx,dy)||1,cx=(from.x+to.x)/2+(dy/len)*Math.min(12,len*.22),cy=(from.y+to.y)/2-(dx/len)*Math.min(12,len*.22);out+='<g><path d="M '+from.x+' '+from.y+' Q '+cx+' '+cy+' '+to.x+' '+to.y+'" fill="none" stroke="#fb7185" stroke-width="2.5" stroke-linecap="round"/><path d="M '+from.x+' '+from.y+' Q '+cx+' '+cy+' '+to.x+' '+to.y+'" fill="none" stroke="#fecdd3" stroke-width=".7" stroke-dasharray="1 2"/><circle cx="'+from.x+'" cy="'+from.y+'" r="2.2" fill="#fb7185"/><path d="M '+(to.x-1.7)+' '+(to.y-1)+' Q '+to.x+' '+(to.y-3)+' '+(to.x+1.7)+' '+(to.y-1)+' L '+(to.x+1.2)+' '+(to.y+1.5)+' L '+(to.x-1.2)+' '+(to.y+1.5)+' Z" fill="#fb7185"/></g>';}});svg.innerHTML=out;}
  function snlDieFace(n){const pip={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]}[n]||[4];return '<div class="mx-auto w-14 h-14 rounded-xl flex items-center justify-center shadow-lg" style="background:linear-gradient(145deg,#fb7185,#8b5cf6 58%,#3b82f6);border:2px solid #ffffff88"><div class="grid grid-cols-3 grid-rows-3 gap-1 w-9 h-9">'+Array.from({length:9},(_,i)=>'<i class="rounded-full '+(pip.includes(i)?'bg-white shadow':'bg-transparent')+'"></i>').join("")+'</div></div>';}
  const wait=ms=>new Promise(resolve=>window.setTimeout(resolve,ms));
  function snlDraw(){
    const board=$id("pg-snl-board");board.innerHTML="";
    for(let row=9;row>=0;row--){const nums=Array.from({length:10},(_,i)=>row%2===0?row*10+i+1:row*10+10-i);nums.forEach(n=>{const cell=document.createElement("div");cell.className="aspect-square rounded-md border border-white/10 flex flex-col items-center justify-center text-[9px] relative overflow-hidden bg-slate-800/90";const players=snlPlayers.filter(p=>p.pos===n);cell.innerHTML='<span class="font-bold relative z-[1]">'+n+'</span>'+(players.length?'<span class="text-sm relative z-[1]">'+players.map(p=>p.bot?"🤖":"🔵").join("")+'</span>':"");board.appendChild(cell);});}
    snlArtwork();const controls=$id("pg-snl-controls");controls.innerHTML=snlPlayers.map(p=>'<p class="text-xs py-1">'+p.name+': '+p.pos+'/100 '+(p.bot?"🤖":"👤")+'</p>').join("")+'<div class="rounded-xl bg-slate-900/80 border border-white/10 p-3 text-center"><div class="text-xs text-slate-400">LAST DICE ROLL</div><div class="my-2">'+snlDieFace(snlLastRoll||1)+'</div><div class="text-sm font-bold">'+(snlMessage||"Ready to roll")+'</div></div>';
    if(!snlDone&&!snlRolling&&snlPlayers.length){const p=snlPlayers[snlTurn],btn=document.createElement("button");btn.className="primary w-full rounded-xl py-3 font-bold mt-2";btn.textContent=p.bot?"🤖 Bot turn…":"🎲 Roll dice";btn.disabled=p.bot;btn.onclick=snlRoll;controls.appendChild(btn);}if(snlDone){const again=document.createElement("button");again.className="primary w-full rounded-xl py-3 mt-2";again.textContent="Play again";again.onclick=launchSnl;controls.appendChild(again);}if(snlPlayers.length&&!snlDone)$id("pg-snl-status").textContent=snlRolling?"Moving…":snlPlayers[snlTurn].name+"'s turn";
  }
  async function snlRoll(){if(snlDone||snlRolling||!snlPlayers.length)return;snlRolling=true;const p=snlPlayers[snlTurn],d=1+Math.floor(Math.random()*6);for(let i=0;i<7;i++){snlLastRoll=1+Math.floor(Math.random()*6);snlMessage="Rolling…";snlDraw();await wait(75);}snlLastRoll=d;snlMessage=p.name+" rolled "+d;snlDraw();await wait(450);if(p.pos+d<=100){for(let step=0;step<d;step++){p.pos++;snlMessage=p.name+" moved to "+p.pos;snlDraw();await wait(170);}if(snlJumps[p.pos]){const from=p.pos,to=snlJumps[from];snlMessage=to>from?"🪜 Climbing ladder "+from+" → "+to:"🐍 Snake bite! "+from+" → "+to;snlDraw();await wait(900);p.pos=to;snlDraw();await wait(350);}}else snlMessage="Need an exact roll to reach 100";if(p.pos===100){snlDone=true;snlMessage="🏆 "+p.name+" wins!";}snlRolling=false;if(!snlDone)snlTurn=(snlTurn+1)%snlPlayers.length;snlDraw();if(!snlDone&&snlPlayers[snlTurn].bot)window.setTimeout(snlRoll,650);}
  function launchSnl(){
    homeView.classList.add("hidden");$id("pg-snl-game").classList.remove("hidden");snlPlayers=[];snlTurn=0;snlDone=false;snlRolling=false;snlLastRoll=0;snlMessage="";
    $id("pg-snl-board").innerHTML="";$id("pg-snl-status").textContent="Choose players";
    $id("pg-snl-controls").innerHTML='<label class="block text-sm">Players (2–4)<select id="snl-count" class="field"><option>2</option><option>3</option><option>4</option></select></label><label class="block text-sm">Bot opponents<select id="snl-bots" class="field"><option value="0">None · Pass & Play</option><option value="1">1 bot</option><option value="2">2 bots</option><option value="3">3 bots</option></select></label><button id="snl-begin" class="primary w-full rounded-xl py-3">Start game</button>';
    $id("snl-begin").onclick=()=>{const n=Number($id("snl-count").value),bots=Math.min(n-1,Number($id("snl-bots").value));snlPlayers=Array.from({length:n},(_,i)=>({name:"Player "+(i+1),pos:1,bot:i>=n-bots}));snlTurn=0;snlDone=false;snlLastRoll=0;snlMessage="Game started";snlDraw();};
  }
  document.getElementById("pg-snl-card").onclick=launchSnl;

  const ludoColors=["#ef4444","#22c55e","#eab308","#3b82f6"],ludoStarts=[0,13,26,39],ludoSafe=[0,8,13,21,26,34,39,47];
  let ludoPlayers=[],ludoTurn=0,ludoDice=0,ludoFinished=false,ludoRolling=false,ludoLastMessage="";
  function ludoRender(){
    $id("pg-ludo-players").innerHTML=ludoPlayers.map((p,i)=>'<div class="rounded-xl p-2 text-center text-xs" style="background:'+ludoColors[i]+'22;border:1px solid '+ludoColors[i]+'66">'+p.name+(p.bot?' 🤖':' 👤')+'<br><b>'+p.tokens.map(t=>t<0?'🏠':t>=56?'🏁':t+1).join(' · ')+'</b></div>').join("");
    const track=$id("pg-ludo-track");track.innerHTML="";
    for(let i=0;i<52;i++){const c=document.createElement("div");c.className="aspect-square rounded bg-slate-800 border border-white/10 text-[10px] flex flex-col items-center justify-center";const occupants=[];ludoPlayers.forEach((p,pi)=>p.tokens.forEach(t=>{if(t>=0&&t<52&&(ludoStarts[pi]+t)%52===i)occupants.push('<span style="color:'+ludoColors[pi]+'">●</span>');}));c.innerHTML=occupants.join("")||(ludoSafe.includes(i)?"★":"");if(ludoStarts.includes(i))c.style.borderColor="#facc15";track.appendChild(c);}
    if(!ludoPlayers.length)return;
    $id("pg-ludo-status").textContent=ludoFinished?ludoLastMessage:ludoPlayers[ludoTurn].name+"'s turn"+(ludoDice?" · Dice "+ludoDice:"")+(ludoLastMessage?" · "+ludoLastMessage:"");
    const controls=$id("pg-ludo-controls");controls.innerHTML='<div class="rounded-xl bg-slate-900/80 border border-white/10 p-3 text-center"><div class="text-xs text-slate-400">DICE</div><div class="text-5xl my-1">'+(ludoDice?diceFaces[ludoDice-1]:(ludoLastMessage||"🎲"))+'</div></div>';
    if(ludoFinished){const again=document.createElement("button");again.className="primary w-full rounded-xl py-3";again.textContent="Play again";again.onclick=launchLudo;controls.appendChild(again);return;}
    const roll=document.createElement("button");roll.className="primary w-full rounded-xl py-3 font-bold";roll.textContent=ludoPlayers[ludoTurn].bot?"🤖 Bot turn…":(ludoDice?"Choose a token":"🎲 Roll dice");roll.disabled=!!ludoDice||ludoRolling||ludoPlayers[ludoTurn].bot;roll.onclick=ludoHumanRoll;controls.appendChild(roll);
    ludoPlayers[ludoTurn].tokens.forEach((t,i)=>{const btn=document.createElement("button");btn.className="w-full rounded-xl py-2 bg-slate-800 text-sm";btn.textContent="Move token "+(i+1)+(t<0?" (yard)":t>=56?" (home)":" (position "+(t+1)+")");btn.disabled=ludoPlayers[ludoTurn].bot||!ludoDice||!(t<0?ludoDice===6:t+ludoDice<=56);btn.onclick=()=>ludoMove(i);controls.appendChild(btn);});
    const hint=document.createElement("p");hint.className="text-[10px] text-slate-400 text-center";hint.textContent="Roll 6 to enter. Land on an opponent to send it home. Safe stars protect tokens. Exact roll to finish.";controls.appendChild(hint);
  }
  function ludoHumanRoll(){if(ludoRolling||ludoDice||ludoFinished)return;ludoDice=1+Math.floor(Math.random()*6);ludoLastMessage="Rolled "+ludoDice;ludoRender();}
  async function ludoMove(index){
    if(!ludoDice||ludoFinished||ludoRolling)return;ludoRolling=true;const p=ludoPlayers[ludoTurn],roll=ludoDice,old=p.tokens[index];p.tokens[index]=old<0?0:old+roll;ludoLastMessage=p.name+" moved token "+(index+1);ludoRender();await wait(450);
    const global=(ludoStarts[ludoTurn]+p.tokens[index])%52;let captured=false;
    if(p.tokens[index]<52&&!ludoSafe.includes(global)){ludoPlayers.forEach((other,pi)=>{if(pi!==ludoTurn)other.tokens=other.tokens.map(t=>{if(t>=0&&t<52&&(ludoStarts[pi]+t)%52===global){captured=true;return -1;}return t;});});}
    if(captured)ludoLastMessage="Capture! Bonus turn";
    ludoDice=0;if(p.tokens.every(t=>t===56)){ludoFinished=true;ludoLastMessage="🏆 "+p.name+" wins!";}
    else if(roll!==6&&!captured)ludoTurn=(ludoTurn+1)%ludoPlayers.length;
    ludoRolling=false;ludoRender();if(!ludoFinished&&ludoPlayers[ludoTurn].bot)window.setTimeout(ludoBotTurn,550);
  }
  async function ludoBotTurn(){
    if(ludoFinished||ludoRolling||!ludoPlayers.length||!ludoPlayers[ludoTurn].bot)return;
    ludoRolling=true;await wait(350);ludoDice=1+Math.floor(Math.random()*6);ludoLastMessage="Bot rolled "+ludoDice;ludoRolling=false;ludoRender();await wait(500);
    const p=ludoPlayers[ludoTurn],moves=p.tokens.map((t,i)=>({t,i})).filter(x=>x.t<0?ludoDice===6:x.t+ludoDice<=56);
    if(!moves.length){ludoDice=0;ludoTurn=(ludoTurn+1)%ludoPlayers.length;ludoRender();if(ludoPlayers[ludoTurn].bot)window.setTimeout(ludoBotTurn,500);return;}
    moves.sort((a,b)=>b.t-a.t);ludoMove(moves[0].i);
  }
  function launchLudo(){
    homeView.classList.add("hidden");$id("pg-ludo-game").classList.remove("hidden");ludoPlayers=[];ludoTurn=0;ludoDice=0;ludoFinished=false;ludoRolling=false;ludoLastMessage="";
    $id("pg-ludo-players").innerHTML="";$id("pg-ludo-status").textContent="Choose players";
    $id("pg-ludo-controls").innerHTML='<label class="block text-sm">Players (2–4)<select id="ludo-count" class="field"><option>2</option><option>3</option><option>4</option></select></label><label class="block text-sm">Bot opponents<select id="ludo-bots" class="field"><option value="0">None · Pass & Play</option><option value="1">1 bot</option><option value="2">2 bots</option><option value="3">3 bots</option></select></label><button id="ludo-begin" class="primary w-full rounded-xl py-3">Start game</button>';$id("ludo-track").innerHTML="";
    $id("ludo-begin").onclick=()=>{const n=Number($id("ludo-count").value),bots=Math.min(n-1,Number($id("ludo-bots").value));ludoPlayers=Array.from({length:n},(_,i)=>({name:"Player "+(i+1),tokens:[-1,-1,-1,-1],bot:i>=n-bots}));ludoTurn=0;ludoDice=0;ludoFinished=false;ludoRender();if(ludoPlayers[0].bot)window.setTimeout(ludoBotTurn,500);};
  }
  document.getElementById("pg-ludo-card").onclick=launchLudo;

  // Easy/medium offline games: Memory Match, Connect Four, Word Chain and Number Challenge.
  const memoryDeck=["🍎","🍌","🍇","🍉","🍒","🥝","🍍","🥑","🍎","🍌","🍇","🍉","🍒","🥝","🍍","🥑"];
  function launchMemory(){
    showSimple("🧠 Memory Match","Find all matching pairs. Tap two cards at a time and try to finish in fewer moves.",'<button id="memory-start" class="primary w-full rounded-xl py-3">Start game</button>');
    $id("memory-start").onclick=()=>{
      const deck=memoryDeck.slice().sort(()=>Math.random()-.5);let open=[],matched=new Set(),moves=0,lock=false;
      const render=()=>{
        $id("pg-simple-play").innerHTML='<div class="flex justify-between text-sm"><b>Moves: '+moves+'</b><b>Pairs: '+matched.size+'/8</b></div><div class="grid grid-cols-4 gap-2">'+deck.map((v,i)=>'<button data-i="'+i+'" class="memory-tile aspect-square rounded-xl text-2xl font-bold bg-slate-800 border border-white/10">'+(matched.has(i)||open.includes(i)?v:"?")+'</button>').join("")+'</div>'+(matched.size===8?'<p class="text-center font-bold text-xl">🎉 Completed in '+moves+' moves!</p><button id="memory-again" class="primary w-full rounded-xl py-3">Play again</button>':"");
        document.querySelectorAll(".memory-tile").forEach(btn=>btn.onclick=()=>{const i=Number(btn.dataset.i);if(lock||matched.has(i)||open.includes(i))return;open.push(i);if(open.length===2){moves++;const [a,b]=open;if(deck[a]===deck[b]){matched.add(a);matched.add(b);open=[];render();}else{lock=true;render();window.setTimeout(()=>{open=[];lock=false;render();},850);}}else render();});
        const again=$id("memory-again");if(again)again.onclick=launchMemory;
      };render();
    };
  }
  const connectLines=[[0,1,2,3],[1,2,3,4],[2,3,4,5],[3,4,5,6]];
  function launchConnect(){
    showSimple("🔴 Connect Four","Drop four discs in a row horizontally, vertically or diagonally. Play with a friend or local bot.",'<label class="block text-sm">Opponent<select id="connect-mode" class="field"><option value="bot">Play vs Bot</option><option value="human">2 players · Pass & Play</option></select></label><button id="connect-start" class="primary w-full rounded-xl py-3">Start game</button>');
    $id("connect-start").onclick=()=>{
      let board=Array(42).fill(0),turn=1,done=false,mode=$id("connect-mode").value;
      const wins=()=>{for(let r=0;r<6;r++)for(let c=0;c<7;c++){const v=board[r*7+c];if(!v)continue;for(const [dr,dc] of [[0,1],[1,0],[1,1],[1,-1]]){let ok=true;for(let k=1;k<4;k++){let rr=r+dr*k,cc=c+dc*k;if(rr<0||rr>=6||cc<0||cc>=7||board[rr*7+cc]!==v){ok=false;break;}}if(ok)return v;}}return 0;};
      const drop=(col,bot=false)=>{if(done)return;let row=-1;for(let r=5;r>=0;r--)if(!board[r*7+col]){row=r;break;}if(row<0)return;board[row*7+col]=turn;const win=wins();if(win)done=true;else if(board.every(Boolean))done=true;else turn=3-turn;render();if(!done&&mode==="bot"&&turn===2)window.setTimeout(botMove,500);};
      const botMove=()=>{const valid=Array.from({length:7},(_,c)=>c).filter(c=>board[c]===0);if(!valid.length)return;let choice=null;for(const player of [2,1]){for(const c of valid){const copy=board.slice();let rr=-1;for(let r=5;r>=0;r--)if(!copy[r*7+c]){rr=r;break;}copy[rr*7+c]=player;const save=board;board=copy;const won=wins()===player;board=save;if(won){choice=c;break;}}if(choice!==null)break;}if(choice===null)choice=valid.sort((a,b)=>Math.abs(a-3)-Math.abs(b-3))[0];drop(choice,true);};
      const render=()=>{$id("pg-simple-play").innerHTML='<p class="text-center font-bold">'+(done?(wins()?"Player "+wins()+" wins! 🏆":"Draw!"):("Player "+turn+"'s turn · "+(turn===1?"🔴":"🟡")))+'</p><div class="grid grid-cols-7 gap-1">'+board.map((v,i)=>'<button data-col="'+(i%7)+'" class="aspect-square rounded-full border border-white/20 '+(v===1?"bg-red-500":v===2?"bg-yellow-400":"bg-slate-800")+'" '+(done|| (mode==="bot"&&turn===2)?"disabled":"")+'></button>').join("")+'</div>'+(done?'<button id="connect-again" class="primary w-full rounded-xl py-3">Play again</button>':"");document.querySelectorAll("[data-col]").forEach(b=>b.onclick=()=>drop(Number(b.dataset.col)));const again=$id("connect-again");if(again)again.onclick=launchConnect;};
      render();
    };
  }
  const wordBank=["apple","eagle","engine","elephant","tiger","rabbit","table","earth","house","river","rose","energy","yellow","window","orange","grape","school","lamp","planet","train","night","tree","envelope","egg","garden","nest","tea","ant","tomato","owl"];
  function launchWordChain(){
    showSimple("🔗 Word Chain","Take turns saying a word that starts with the last letter of the previous word. No repeats. Play with a friend or bot.",'<label class="block text-sm">Opponent<select id="chain-mode" class="field"><option value="bot">Play vs Bot</option><option value="human">2 players · Pass & Play</option></select></label><button id="chain-start" class="primary w-full rounded-xl py-3">Start</button>');
    $id("chain-start").onclick=()=>{let used=[],turn=1,mode=$id("chain-mode").value,need="",round=0,done=false;const render=()=>{$id("pg-simple-play").innerHTML='<p class="text-center">Round '+round+' · '+(need?'Word must start with <b class="text-xl">'+need.toUpperCase()+'</b>':"Start with any word")+'</p><p class="text-sm">Player '+turn+"'s turn"+(mode==="bot"&&turn===2?" 🤖":"")+'</p><p class="text-xs text-slate-400 break-words">Used: '+used.join(", ")+'</p><input id="chain-word" class="field" placeholder="Enter a word"><button id="chain-submit" class="primary w-full rounded-xl py-3">Submit word</button><p id="chain-msg" class="text-sm text-center"></p>'; $id("chain-submit").onclick=()=>{const w=$id("chain-word").value.trim().toLowerCase();if(!/^[a-z]+$/.test(w)||used.includes(w)||(need&&w[0]!==need)){$id("chain-msg").textContent="Invalid word, repeated word, or wrong starting letter.";return;}play(w);};};const play=w=>{used.push(w);need=w[w.length-1];round++;turn=3-turn;if(round>=20){done=true;$id("pg-simple-play").innerHTML='<p class="text-center font-bold">20 turns completed! 🎉</p><button id="chain-again" class="primary w-full rounded-xl py-3">Play again</button>';$id("chain-again").onclick=launchWordChain;return;}render();if(mode==="bot"&&turn===2)window.setTimeout(()=>{const choice=wordBank.find(x=>x[0]===need&&!used.includes(x));if(choice)play(choice);else{$id("pg-simple-play").innerHTML='<p class="text-center font-bold">🤖 Bot has no word. You win!</p><button id="chain-again" class="primary w-full rounded-xl py-3">Play again</button>';$id("chain-again").onclick=launchWordChain;}},650);};render();};
  }
  function launchNumber(){
    showSimple("🔢 Number Challenge","Solve 10 quick mental-maths questions. Beat your best score!",'<button id="number-start" class="primary w-full rounded-xl py-3">Start challenge</button>');
    $id("number-start").onclick=()=>{let q=0,score=0,current=null;const next=()=>{if(q>=10){$id("pg-simple-play").innerHTML='<div class="text-center panel"><p class="text-sm">Final score</p><p class="text-4xl font-black">'+score+'/10</p><button id="number-again" class="primary w-full rounded-xl py-3 mt-3">Play again</button></div>';$id("number-again").onclick=launchNumber;return;}const a=2+Math.floor(Math.random()*18),b=2+Math.floor(Math.random()*12),op=["+","−","×"][Math.floor(Math.random()*3)];current={a,b,op,answer:op==="+"?a+b:op==="−"?a-b:a*b};$id("pg-simple-play").innerHTML='<p class="text-center text-sm">Question '+(q+1)+'/10 · Score '+score+'</p><p class="text-center text-4xl font-black my-5">'+a+' '+op+' '+b+' = ?</p><input id="number-answer" class="field text-center" type="number" placeholder="Your answer"><button id="number-check" class="primary w-full rounded-xl py-3">Check</button><p id="number-feedback" class="text-center text-sm"></p>';$id("number-check").onclick=()=>{const ok=Number($id("number-answer").value)===current.answer;if(ok)score++;q++;$id("number-feedback").textContent=ok?"Correct!":"Answer: "+current.answer;$id("number-check").disabled=true;const n=document.createElement("button");n.className="primary w-full rounded-xl py-3 mt-2";n.textContent=q===10?"See score":"Next question";n.onclick=next;$id("pg-simple-play").appendChild(n);};};next();};
  }
  document.getElementById("pg-memory-card").onclick=launchMemory;
  document.getElementById("pg-connect-card").onclick=launchConnect;
  document.getElementById("pg-wordchain-card").onclick=launchWordChain;
  document.getElementById("pg-number-card").onclick=launchNumber;


  document.getElementById("pg-games-nav").addEventListener("click",()=>{const grid=document.querySelector("#pg-home .pg-game-grid");if(grid)grid.scrollIntoView({behavior:"smooth",block:"start"});});
  document.getElementById("pg-home-nav").addEventListener("click", () => {
    legacy.classList.add("pg-hidden"); footer.classList.add("pg-hidden"); homeView.classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
  });
  const profileView=document.getElementById("pg-profile-view");
  const profileStats=document.getElementById("stats-panel");
  if(profileStats) document.getElementById("pg-profile-stats").appendChild(profileStats);
  document.getElementById("pg-profile-nav").addEventListener("click", () => {
    homeView.classList.add("hidden"); profileView.classList.remove("hidden");
    document.getElementById("pg-profile-title").textContent=document.getElementById("pg-player").textContent+"’s Profile";
    if(profileStats) profileStats.classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
  });
  document.getElementById("pg-profile-back").addEventListener("click",()=>{profileView.classList.add("hidden");homeView.classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"});});
  document.getElementById("pg-return-home").addEventListener("click",()=>window.pgHandleBack());
  document.getElementById("pg-signout").addEventListener("click", () => {
    homeView.classList.add("hidden"); profileView.classList.add("hidden"); authView.classList.remove("hidden");
    legacy.classList.add("pg-hidden"); footer.classList.add("pg-hidden");
    const input = document.getElementById("pg-username"); input.value = localStorage.getItem(PLAYER_NAME_KEY) || "";
    input.focus(); window.scrollTo({top:0,behavior:"smooth"});
  });
  window.pgHandleBack=function(){
    if(!profileView.classList.contains("hidden")){profileView.classList.add("hidden");homeView.classList.remove("hidden");window.scrollTo(0,0);return true;}
    if(!homeView.classList.contains("hidden"))return false;
    if(!legacy.classList.contains("pg-hidden")){legacy.classList.add("pg-hidden");footer.classList.add("pg-hidden");homeView.classList.remove("hidden");profileView.classList.add("hidden");window.scrollTo(0,0);return true;}
    const visibleMini=["pg-ttt","pg-rps-game","pg-quiz-game","pg-simple-game","pg-snl-game","pg-ludo-game"].find(id=>{const el=document.getElementById(id);return el&&!el.classList.contains("hidden");});
    if(visibleMini){document.getElementById(visibleMini).classList.add("hidden");homeView.classList.remove("hidden");window.scrollTo(0,0);return true;}
    return false;
  };
  client.auth.getSession().then(({data}) => {
    if (data.session) showHome(data.session);
  }).catch(() => {});
})();