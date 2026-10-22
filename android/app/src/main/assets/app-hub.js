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
  style.textContent = `
    #pg-root{width:min(100%,560px);margin:auto;padding:22px 18px 30px;color:#f8fafc}
    #pg-root .brand{background:linear-gradient(100deg,#f9a8d4,#c4b5fd 52%,#67e8f9);-webkit-background-clip:text;background-clip:text;color:transparent}
    #pg-root .panel{border:1px solid rgba(255,255,255,.14);background:linear-gradient(145deg,rgba(47,37,82,.96),rgba(22,29,54,.97));border-radius:23px;padding:18px;box-shadow:0 14px 34px rgba(0,0,0,.2)}
    #pg-root .primary{background:linear-gradient(110deg,#ec4899,#8b5cf6 55%,#3b82f6);box-shadow:0 9px 24px rgba(139,92,246,.25);color:white}
    #pg-root .field{display:block;width:100%;margin-top:7px;padding:13px 14px;border:1px solid rgba(255,255,255,.17);border-radius:13px;background:#10172b;color:white}
    #pg-root .tile{min-height:128px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;border:1px solid rgba(255,255,255,.13);background:linear-gradient(145deg,rgba(47,37,82,.96),rgba(22,29,54,.97));border-radius:20px;padding:15px}
    #pg-root .pill{font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;padding:4px 8px;border-radius:99px;background:#ffffff16;color:#ddd6fe}
    #pg-root .nav{display:flex;justify-content:space-around;margin-top:20px;padding:10px;border:1px solid #ffffff20;border-radius:17px;background:#0b1020}
    #pg-root .nav button{background:transparent;color:#c4b5fd;font-size:12px;padding:8px}
    #pg-root .hub-topbar{display:flex;justify-content:flex-start;margin-bottom:14px}
    #pg-root .hub-topbar button{border:1px solid #ffffff24;background:#11182b;color:#ddd6fe;border-radius:12px;padding:9px 13px;font-weight:700;font-size:12px}
  `;
  document.head.appendChild(style);
  const root = document.createElement("main");
  root.id = "pg-root";
  root.innerHTML = `
    <section id="pg-auth">
      <header class="text-center mb-7">
        <div class="text-5xl mb-3">🎉</div>
        <p class="text-xs uppercase tracking-widest text-fuchsia-300 font-bold">Play together, anywhere</p>
        <h1 class="brand text-4xl font-black mt-2">Party Games</h1>
        <p class="text-sm text-slate-400 mt-2">Online with friends. Offline with everyone.</p>
      </header>
      <div class="panel">
        <div class="grid grid-cols-2 gap-2 mb-5">
          <button id="pg-login-tab" class="primary rounded-xl py-3 font-bold">Log in</button>
          <button id="pg-signup-tab" class="rounded-xl py-3 bg-slate-800 text-slate-300 font-bold">Sign up</button>
        </div>
        <form id="pg-auth-form" class="space-y-3">
          <label class="block text-xs text-slate-300">Email<input id="pg-email" class="field" type="email" autocomplete="email" placeholder="you@example.com" required></label>
          <label class="block text-xs text-slate-300">Password<input id="pg-password" class="field" type="password" minlength="6" autocomplete="current-password" placeholder="At least 6 characters" required></label>
          <button id="pg-submit" class="primary w-full rounded-xl py-3.5 font-extrabold" type="submit">Log in</button>
        </form>
        <p id="pg-auth-message" class="text-xs text-center text-amber-300 mt-3" aria-live="polite"></p>
        <div class="flex items-center gap-3 my-5"><span class="h-px bg-slate-700 flex-1"></span><span class="text-xs text-slate-500">OR</span><span class="h-px bg-slate-700 flex-1"></span></div>
        <button id="pg-guest" class="w-full rounded-xl py-3.5 border border-cyan-300/30 bg-cyan-400/10 text-cyan-200 font-bold">Continue as Guest</button>
        <p class="text-[10px] text-slate-500 text-center mt-3">Guest progress is tied to the guest session on this device.</p>
      </div>
    </section>
    <section id="pg-home" class="hidden">
      <header class="text-center mb-6">
        <div class="text-5xl mb-2">🎊</div>
        <p class="text-xs uppercase tracking-widest text-fuchsia-300 font-bold">Your game night starts here</p>
        <h1 class="brand text-3xl font-black mt-2">Party Games</h1>
        <p id="pg-welcome" class="text-sm text-slate-400 mt-2">Pick a game and invite your friends.</p>
      </header>
      <div class="panel mb-5 flex items-center justify-between">
        <div><p class="text-xs uppercase tracking-wider text-violet-300 font-bold">Player hub</p><p id="pg-player" class="text-lg font-extrabold">Guest Player</p><p id="pg-account-type" class="text-xs text-slate-400">Guest session</p></div><span class="text-4xl">🧑‍🚀</span>
      </div>
      <div class="flex justify-between items-end mb-3"><div><p class="text-xs uppercase tracking-widest text-cyan-300 font-bold">Game library</p><h2 class="text-xl font-extrabold">Pick your game</h2></div><span class="pill">New games arriving</span></div>
      <button id="pg-undercover" class="tile w-full mb-3 border-fuchsia-300/30">
        <div class="flex justify-between"><span class="text-4xl">🕵️</span><span class="pill">Playable now</span></div>
        <div><h3 class="text-lg font-extrabold">Undercover Imposter</h3><p class="text-xs text-slate-400 mt-1">Find the imposter · Online or Pass &amp; Play</p></div>
      </button>
      <div class="grid grid-cols-2 gap-3">
        <div class="tile"><div class="flex justify-between"><span class="text-3xl">🐺</span><span class="pill">Coming soon</span></div><div><h3 class="font-extrabold">Mafia / Werewolf</h3><p class="text-[11px] text-slate-400">Trust no one.</p></div></div>
        <div class="tile"><div class="flex justify-between"><span class="text-3xl">🗺️</span><span class="pill">Coming soon</span></div><div><h3 class="font-extrabold">Spyfall</h3><p class="text-[11px] text-slate-400">Find the spy.</p></div></div>
        <div class="tile"><div class="flex justify-between"><span class="text-3xl">🎭</span><span class="pill">Coming soon</span></div><div><h3 class="font-extrabold">Dumb Charades</h3><p class="text-[11px] text-slate-400">Act it out.</p></div></div>
        <div class="tile"><div class="flex justify-between"><span class="text-3xl">🧠</span><span class="pill">Coming soon</span></div><div><h3 class="font-extrabold">Quiz Battle</h3><p class="text-[11px] text-slate-400">Challenge friends.</p></div></div>
        <div class="tile"><div class="flex justify-between"><span class="text-3xl">✊</span><span class="pill">Coming soon</span></div><div><h3 class="font-extrabold">Rock Paper Scissors</h3><p class="text-[11px] text-slate-400">Quick duels.</p></div></div>
        <button id="pg-tictactoe" class="tile text-left border-cyan-300/30"><div class="flex justify-between"><span class="text-3xl">❎</span><span class="pill">Playable · Offline bots</span></div><div><h3 class="font-extrabold">Tic Tac Toe</h3><p class="text-[11px] text-slate-400">Play locally against a bot.</p></div></button>
        <button id="pg-rps-card" class="tile text-left border-cyan-300/30"><div class="flex justify-between"><span class="text-3xl">✊</span><span class="pill">Playable · Offline bots</span></div><div><h3 class="font-extrabold">Rock Paper Scissors</h3><p class="text-[11px] text-slate-400">Best of 5 against a bot.</p></div></button>
        <button id="pg-quiz-card" class="tile text-left border-cyan-300/30"><div class="flex justify-between"><span class="text-3xl">🧠</span><span class="pill">Playable · Offline bots</span></div><div><h3 class="font-extrabold">Quiz Battle</h3><p class="text-[11px] text-slate-400">10 questions · Beat the bot.</p></div></button>
      </div>
      <nav class="nav"><button id="pg-home-nav">🏠 Home</button><button id="pg-profile-nav">👤 Profile</button><button id="pg-signout">↪ Sign out</button></nav>
      <p id="pg-home-message" class="text-center text-[10px] text-slate-500 mt-3"></p>
    </section>
    <section id="pg-profile-view" class="hidden">
      <div class="hub-topbar"><button id="pg-profile-back">← Back to Home</button></div>
      <div class="panel"><p class="text-xs uppercase tracking-widest text-violet-300 font-bold">Player profile</p><h2 id="pg-profile-title" class="text-2xl font-black mt-1">Your Profile</h2><p class="text-xs text-slate-400 mt-1 mb-4">Your game progress and stats</p><div id="pg-profile-stats"></div></div>
    </section>`;
  document.body.insertBefore(root, legacy);
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
  document.getElementById("pg-tictactoe").addEventListener("click",()=>{homeView.classList.add("hidden");ttt.classList.remove("hidden");tttNewGame();window.scrollTo({top:0,behavior:"smooth"});});
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
      <div id="pg-snl-board" class="grid grid-cols-10 gap-1 mt-4"></div>
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
    ["pg-stop-card","🔤","Name Place Animal Thing","Pass & Play · timed rounds","stop"],
    ["pg-20q-card","❓","20 Questions","Guess the secret object","twenty"],
    ["pg-who-card","🪪","Who Am I?","Clues · Pass & Play","who"],
    ["pg-charades-card","🎭","Dumb Charades","Movie prompts · teams","charades"],
    ["pg-dialogue-card","🎬","Bollywood Dialogue Challenge","Guess the film or actor","dialogue"],
    ["pg-music-card","🎵","Bollywood Music Quiz","Song trivia · no audio","music"],
    ["pg-snl-card","🐍","Snakes & Ladders","2–4 players · bots optional","snl"],
    ["pg-ludo-card","🎲","Ludo","2–4 players · local play","ludo"]
  ];
  const gameGrid=root.querySelector("#pg-home .grid.grid-cols-2");
  if(gameGrid){
    gameGrid.innerHTML="";
    extraCards.forEach(([id,emoji,name,desc])=>{
      const b=document.createElement("button");b.id=id;b.type="button";b.className="tile text-left border-cyan-300/30";
      b.innerHTML='<div class="flex justify-between"><span class="text-3xl">'+emoji+'</span><span class="pill">Playable · Offline</span></div><div><h3 class="font-extrabold">'+name+'</h3><p class="text-[11px] text-slate-400">'+desc+'</p></div>';
      gameGrid.appendChild(b);
    });
    const existing=["pg-tictactoe","pg-rps-card","pg-quiz-card"];
    existing.forEach(id=>{const el=document.getElementById(id);if(el)gameGrid.appendChild(el);});
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
  let snlPlayers=[],snlTurn=0,snlDone=false;
  function snlDraw(){
    const board=$id("pg-snl-board");board.innerHTML="";
    for(let row=9;row>=0;row--){const nums=Array.from({length:10},(_,i)=>row%2===0?row*10+i+1:row*10+10-i);nums.forEach(n=>{const cell=document.createElement("div");cell.className="aspect-square rounded-md bg-slate-800 border border-white/10 flex flex-col items-center justify-center text-[9px]";cell.innerHTML='<span>'+n+'</span><b class="text-[10px]">'+snlPlayers.filter(p=>p.pos===n).map(p=>p.name[0]).join("")+'</b>';if(snlJumps[n])cell.classList.add(snlJumps[n]>n?"bg-emerald-900":"bg-rose-950");board.appendChild(cell);});}
    const controls=$id("pg-snl-controls");controls.innerHTML=snlPlayers.map((p,i)=>'<p class="text-xs py-1">'+p.name+': '+p.pos+'/100 '+(p.bot?"🤖":"👤")+'</p>').join("");
    if(!snlDone){const p=snlPlayers[snlTurn];$id("pg-snl-status").textContent=p.name+"'s turn";const b=document.createElement("button");b.className="primary w-full rounded-xl py-3 font-bold";b.textContent="🎲 Roll dice";b.onclick=snlRoll;controls.appendChild(b);}
  }
  function snlRoll(){if(snlDone)return;const p=snlPlayers[snlTurn],d=1+Math.floor(Math.random()*6);let msg=p.name+" rolled "+d+". ";if(p.pos+d<=100){p.pos+=d;if(snlJumps[p.pos]){msg+=snlJumps[p.pos]>p.pos?"Ladder! ":"Snake! ";p.pos=snlJumps[p.pos];}}else msg+="Need exact roll to reach 100. ";if(p.pos===100){snlDone=true;msg+=p.name+" wins! 🏆";}$id("pg-snl-status").textContent=msg;if(!snlDone)snlTurn=(snlTurn+1)%snlPlayers.length;snlDraw();if(!snlDone&&snlPlayers[snlTurn].bot)window.setTimeout(snlRoll,650);}
  function launchSnl(){homeView.classList.add("hidden");$id("pg-snl-game").classList.remove("hidden");snlPlayers=[];snlTurn=0;snlDone=false;$id("pg-snl-board").innerHTML="";$id("pg-snl-status").textContent="Choose players";$id("pg-snl-controls").innerHTML='<label class="block text-sm">Players (2–4)<select id="snl-count" class="field"><option>2</option><option>3</option><option>4</option></select></label><label class="block text-sm">Bot opponents<select id="snl-bots" class="field"><option value="0">None · Pass & Play</option><option value="1">1 bot</option><option value="2">2 bots</option><option value="3">3 bots</option></select></label><button id="snl-begin" class="primary w-full rounded-xl py-3">Start game</button>';$id("snl-begin").onclick=()=>{const n=Number($id("snl-count").value),bots=Math.min(n-1,Number($id("snl-bots").value));snlPlayers=Array.from({length:n},(_,i)=>({name:"Player "+(i+1),pos:0,bot:i>=n-bots}));snlTurn=0;snlDone=false;snlDraw();};}
  document.getElementById("pg-snl-card").onclick=launchSnl;

  // Ludo local board: four tokens per seat, classic 52-step loop plus home lane.
  const ludoColors=["#ef4444","#22c55e","#eab308","#3b82f6"];
  let ludoPlayers=[],ludoTurn=0,ludoDice=0,ludoFinished=false;
  function ludoRender(){
    $id("pg-ludo-players").innerHTML=ludoPlayers.map((p,i)=>'<div class="rounded-xl p-2 text-center text-xs" style="background:'+ludoColors[i]+'22;border:1px solid '+ludoColors[i]+'66">'+p.name+'<br><b>'+p.tokens.map(t=>t<0?"🏠":t>=56?"🏁":t+1).join(" · ")+'</b></div>').join("");
    const track=$id("pg-ludo-track");track.innerHTML="";for(let i=0;i<52;i++){const c=document.createElement("div");c.className="aspect-square rounded bg-slate-800 border border-white/10 text-[9px] flex items-center justify-center";const occupants=[];ludoPlayers.forEach((p,pi)=>p.tokens.forEach((t,ti)=>{if(t>=0&&t<52&&((t+pi*13)%52)===i)occupants.push(String(pi+1));}));c.textContent=occupants.join("")||((i%13===0)?"★":"");track.appendChild(c);}
    $id("pg-ludo-status").textContent=ludoFinished?"Game finished":ludoPlayers[ludoTurn].name+"'s turn"+(ludoDice?" · Dice "+ludoDice:"");
    const controls=$id("pg-ludo-controls");controls.innerHTML="";
    if(ludoFinished)return;
    const roll=document.createElement("button");roll.className="primary w-full rounded-xl py-3 font-bold";roll.textContent=ludoDice?"Dice: "+ludoDice:"🎲 Roll dice";roll.disabled=!!ludoDice||ludoPlayers[ludoTurn].bot;roll.onclick=()=>{ludoDice=1+Math.floor(Math.random()*6);ludoRender();};controls.appendChild(roll);
    ludoPlayers[ludoTurn].tokens.forEach((t,i)=>{const b=document.createElement("button");b.className="w-full rounded-xl py-2 bg-slate-800 text-sm";b.textContent="Move token "+(i+1)+(t<0?" (yard)": " (position "+(t+1)+")");b.disabled=ludoPlayers[ludoTurn].bot||!ludoDice||!(t<0?ludoDice===6:t+ludoDice<=56);b.onclick=()=>ludoMove(i);controls.appendChild(b);});
    const hint=document.createElement("p");hint.className="text-[10px] text-slate-400 text-center";hint.textContent="A six brings a token out. Reach 56 exactly to finish. Safe stars cannot be captured.";controls.appendChild(hint);
  }
  function ludoMove(index){const p=ludoPlayers[ludoTurn],old=p.tokens[index];if(old<0)p.tokens[index]=0;else p.tokens[index]+=ludoDice;const global=(p.tokens[index]+ludoTurn*13)%52;
    if(p.tokens[index]<52&&![0,8,13,21,26,34,39,47].includes(global)){ludoPlayers.forEach((other,pi)=>{if(pi!==ludoTurn)other.tokens=other.tokens.map(t=>t>=0&&t<52&&((t+pi*13)%52)===global?-1:t);});}
    ludoDice=0;if(p.tokens.every(t=>t===56)){ludoFinished=true;$id("pg-ludo-status").textContent=p.name+" wins! 🏆";}else if(arguments.length)ludoTurn=(ludoTurn+1)%ludoPlayers.length;ludoRender();
  }
  function launchLudo(){homeView.classList.add("hidden");$id("pg-ludo-game").classList.remove("hidden");ludoPlayers=[];ludoTurn=0;ludoDice=0;ludoFinished=false;$id("pg-ludo-players").innerHTML="";$id("pg-ludo-status").textContent="Choose players";$id("pg-ludo-controls").innerHTML='<label class="block text-sm">Players (2–4)<select id="ludo-count" class="field"><option>2</option><option>3</option><option>4</option></select></label><label class="block text-sm">Bot opponents<select id="ludo-bots" class="field"><option value="0">None · Pass & Play</option><option value="1">1 bot</option><option value="2">2 bots</option><option value="3">3 bots</option></select></label><button id="ludo-begin" class="primary w-full rounded-xl py-3">Start game</button>';$id("ludo-track").innerHTML="";$id("ludo-begin").onclick=()=>{const n=Number($id("ludo-count").value),bots=Math.min(n-1,Number($id("ludo-bots").value));ludoPlayers=Array.from({length:n},(_,i)=>({name:"Player "+(i+1),tokens:[-1,-1,-1,-1],bot:i>=n-bots}));ludoTurn=0;ludoDice=0;ludoFinished=false;ludoRender();};}
  document.getElementById("pg-ludo-card").onclick=launchLudo;

    let mode = "login";
  let session = null;
  const authView = document.getElementById("pg-auth");
  const homeView = document.getElementById("pg-home");
  const message = document.getElementById("pg-auth-message");
  function showHome(nextSession) {
    session = nextSession;
    authView.classList.add("hidden");
    homeView.classList.remove("hidden");
    legacy.classList.add("pg-hidden");
    footer.classList.add("pg-hidden");
    const user = session && session.user;
    const label = user && user.email ? user.email.split("@")[0] : "Guest Player";
    document.getElementById("pg-player").textContent = label;
    document.getElementById("pg-account-type").textContent = user && user.email ? "Registered account" : "Guest session";
    document.getElementById("pg-welcome").textContent = "Welcome, " + label + "!";
  }
  function setMode(next) {
    mode = next;
    const login = mode === "login";
    document.getElementById("pg-login-tab").className = (login ? "primary " : "bg-slate-800 text-slate-300 ") + "rounded-xl py-3 font-bold";
    document.getElementById("pg-signup-tab").className = (!login ? "primary " : "bg-slate-800 text-slate-300 ") + "rounded-xl py-3 font-bold";
    document.getElementById("pg-submit").textContent = login ? "Log in" : "Create account";
    document.getElementById("pg-password").autocomplete = login ? "current-password" : "new-password";
    message.textContent = "";
  }
  document.getElementById("pg-login-tab").addEventListener("click", () => setMode("login"));
  document.getElementById("pg-signup-tab").addEventListener("click", () => setMode("signup"));
  document.getElementById("pg-auth-form").addEventListener("submit", async event => {
    event.preventDefault();
    const submit = document.getElementById("pg-submit");
    submit.disabled = true; message.textContent = "Please wait…";
    try {
      const email = document.getElementById("pg-email").value.trim();
      const password = document.getElementById("pg-password").value;
      const result = mode === "signup"
        ? await client.auth.signUp({ email, password })
        : await client.auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      if (mode === "signup" && !result.data.session) {
        message.textContent = "Account created. Confirm your email, then log in.";
        return;
      }
      showHome(result.data.session);
    } catch (error) { message.textContent = error.message || "Authentication failed."; }
    finally { submit.disabled = false; }
  });
  document.getElementById("pg-guest").addEventListener("click", async () => {
    message.textContent = "Starting guest session…";
    try {
      const current = await client.auth.getSession();
      let active = current.data.session;
      if (!active) {
        const result = await client.auth.signInAnonymously();
        if (result.error) throw result.error;
        active = result.data.session;
      }
      showHome(active);
    } catch (error) { message.textContent = error.message || "Guest mode unavailable."; }
  });
  document.getElementById("pg-undercover").addEventListener("click", () => {
    homeView.classList.add("hidden"); legacy.classList.remove("pg-hidden"); footer.classList.remove("pg-hidden");
    window.scrollTo({top:0,behavior:"smooth"});
  });
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
  document.getElementById("pg-signout").addEventListener("click", async () => {
    await client.auth.signOut();
    session = null; homeView.classList.add("hidden"); authView.classList.remove("hidden");
    legacy.classList.add("pg-hidden"); footer.classList.add("pg-hidden");
    document.getElementById("pg-email").value = ""; document.getElementById("pg-password").value = "";
    setMode("login");
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