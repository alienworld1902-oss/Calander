
(function () {
  function ready() {
    const signIn = document.getElementById("signInBtn");
    const create = document.getElementById("createAccountBtn");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const status = document.getElementById("authStatus") || document.getElementById("message");

    function setStatus(msg, error) {
      if (status) {
        status.textContent = msg;
        status.style.color = error ? "#ff9b9b" : "";
      } else {
        console.log(msg);
      }
    }

    async function getClient() {
      const cfg = window.APP_CONFIG || {};
      if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY ||
          cfg.SUPABASE_URL.includes("YOUR-") || cfg.SUPABASE_ANON_KEY.includes("YOUR_")) {
        throw new Error("Supabase is not configured in config.js.");
      }
      if (!window.supabase || !window.supabase.createClient) {
        throw new Error("Supabase library did not load. Check your internet connection.");
      }
      if (!window.__worldSupabase) {
        window.__worldSupabase = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
      }
      return window.__worldSupabase;
    }

    async function signIn() {
      try {
        if (!email || !password) throw new Error("Email or password field was not found.");
        setStatus("Signing in…", false);
        const client = await getClient();
        const { error } = await client.auth.signInWithPassword({
          email: email.value.trim(),
          password: password.value
        });
        if (error) throw error;
        setStatus("Signed in successfully.", false);
        setTimeout(() => location.reload(), 350);
      } catch (e) {
        setStatus(e && e.message ? e.message : "Sign in failed.", true);
      }
    }

    async function createAccount() {
      try {
        if (!email || !password) throw new Error("Email or password field was not found.");
        setStatus("Creating account…", false);
        const client = await getClient();
        const { error } = await client.auth.signUp({
          email: email.value.trim(),
          password: password.value
        });
        if (error) throw error;
        setStatus("Account created. Check your email if confirmation is enabled.", false);
      } catch (e) {
        setStatus(e && e.message ? e.message : "Account creation failed.", true);
      }
    }

    if (signIn) {
      signIn.addEventListener("click", function (e) {
        e.preventDefault();
        signIn();
      }, true);
    }
    if (create) {
      create.addEventListener("click", function (e) {
        e.preventDefault();
        createAccount();
      }, true);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
