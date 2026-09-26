# World — final combined build

This build combines the full calendar/memory website with the readable Thought and animated hourly Mood features.

## Fixed
- Supabase configuration now matches the way `index.html` loads `config.js`.
- Sign in and Create account buttons have visible loading/error feedback.
- The previous ES-module `export` syntax in `config.js` was removed; this was preventing the classic script from loading.
- Dark/light colors are unified with a warm plum/pink palette.
- PWA manifest and service worker were removed as requested.
- Existing calendar, memories, rollback, photos, search, settings, invite, thought and mood features are preserved.

## Supabase
`config.js` contains the Supabase URL and browser-safe anon/publishable key from the supplied project. Never put a `service_role`/secret key in browser code.

## Run
Use GitHub Pages or another HTTPS/static host. Do not use a file:// URL if you want Supabase auth/storage behavior to work reliably.
