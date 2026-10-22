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
        <div class="tile"><div class="flex justify-between"><span class="text-3xl">❎</span><span class="pill">Coming soon</span></div><div><h3 class="font-extrabold">Tic Tac Toe</h3><p class="text-[11px] text-slate-400">Classic face-off.</p></div></div>
      </div>
      <nav class="nav"><button id="pg-home-nav">🏠 Home</button><button id="pg-profile-nav">👤 Profile</button><button id="pg-signout">↪ Sign out</button></nav>
      <p id="pg-home-message" class="text-center text-[10px] text-slate-500 mt-3"></p>
    </section>`;
  document.body.insertBefore(root, legacy);

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
  document.getElementById("pg-profile-nav").addEventListener("click", () => {
    homeView.classList.add("hidden"); legacy.classList.remove("pg-hidden"); footer.classList.remove("pg-hidden");
    document.getElementById("stats-panel").classList.remove("hidden");
    document.getElementById("stats-panel").scrollIntoView({behavior:"smooth",block:"start"});
  });
  document.getElementById("pg-signout").addEventListener("click", async () => {
    await client.auth.signOut();
    session = null; homeView.classList.add("hidden"); authView.classList.remove("hidden");
    legacy.classList.add("pg-hidden"); footer.classList.add("pg-hidden");
    document.getElementById("pg-email").value = ""; document.getElementById("pg-password").value = "";
    setMode("login");
  });
  client.auth.getSession().then(({data}) => {
    if (data.session) showHome(data.session);
  }).catch(() => {});
})();