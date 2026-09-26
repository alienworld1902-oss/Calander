WORLD — SIGN-IN DEBUG BUILD

This build keeps the existing website and adds a defensive authentication bootstrap.

1. Put all files on GitHub in the same folder.
2. Confirm config.js contains:
   window.APP_CONFIG = {
     SUPABASE_URL: "https://YOURPROJECT.supabase.co",
     SUPABASE_ANON_KEY: "YOUR_PUBLISHABLE_OR_ANON_KEY"
   };
3. Do NOT use a service_role/secret key.
4. Open the deployed site in Chrome.
5. Hard refresh once.
6. Click Sign In. The page will now show an actual error instead of silently doing nothing.

If the message says:
- "Supabase is not configured" → config.js is not the version being served.
- "Supabase library did not load" → CDN/network problem.
- "Invalid login credentials" → Supabase rejected the email/password.
- "Email not confirmed" → confirm the email or adjust Supabase Auth email confirmation settings.

The fallback is intentionally visible so a broken dependency cannot make the button appear dead.
