# Add events online (Decap CMS)

Your site is static: new posts are Markdown files in GitHub. The **Decap CMS** panel at **`/admin`** (or `/admin/`) is served by `src/pages/admin/index.astro`; config stays at **`public/admin/config.yml`**. Use the panel to add or edit posts in the browser (paste a LinkedIn embed, set title and date, publish). Each save creates a **commit** on `main`; GitHub Actions rebuilds the site.

## 1. One-time: GitHub OAuth + proxy

Decap talks to GitHub through your account. On **GitHub Pages** you need a tiny **OAuth proxy** (GitHub does not allow the CMS to use your client secret in the browser).

Recommended flow (free Cloudflare Worker): **[sterlingwes/decap-proxy](https://github.com/sterlingwes/decap-proxy)**.

1. **Create a GitHub OAuth App**  
   [New OAuth App](https://github.com/settings/applications/new)

   - **Homepage URL:** your **proxy** URL (same as `base_url` below), e.g. `https://kometsoft-decap-proxy.your-account.workers.dev`
   - **Authorization callback URL:** `https://…same-proxy…/callback`
   - Save the **Client ID** and generate a **Client secret**

2. **Deploy the worker** (follow that repo’s README): set secrets `GITHUB_OAUTH_ID` and `GITHUB_OAUTH_SECRET`, then `npx wrangler deploy`.

3. **Point Decap at the proxy**  
   In `public/admin/config.yml`, set:

   ```yaml
   base_url: https://YOUR-WORKER.workers.dev
   auth_endpoint: /auth
   ```

   Commit and push. After deploy, open **`https://kometsoft.com.my/admin/`** (or your real site URL), click login, and authorize GitHub.

Anyone who can log in must have **write access** to `kometsoft/kometsoft.github.io`.

## 2. Every new LinkedIn post (no code)

1. Open **`/admin/`** → collection **“Events & news (online editor)”** → **New post**.
2. Fill **URL slug** (e.g. `partner-award-2026`), **Title**, **Description**, **Publish date**, **Category** (`event` shows under Event on `/blog`).
3. In **Body**, paste the **full `<iframe …></iframe>`** from LinkedIn (**⋯ → Embed this post**). Replace the placeholder `src` if needed.
4. **Publish** → Decap commits `src/content/blog/online-events/<slug>.md` → Actions deploys → the new card appears on **Events** and the post lives at **`/blog/online-events/<slug>/`**.

## 3. Without the proxy (GitHub only)

You can still add posts **entirely on github.com**: create `src/content/blog/online-events/your-slug.md` with the same frontmatter + body, then commit to `main`. No `/admin/` login required.

## 4. Optional hero image

Posts created in Decap omit `image` so the grid uses the **LinkedIn** placeholder tile. To use a photo, add a file under `public/uploads/` (or your asset pipeline), then edit the Markdown frontmatter manually to reference it in a way your Astro schema supports (advanced).
