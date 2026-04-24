# Relic Siege

Relic Siege is a static browser action RPG. There is no build step, so it is easy to preview locally and publish on most static hosts.

## Local Preview

1. Run `npm start`
2. Open `http://127.0.0.1:4173`

## Quick Publish Options

### GitHub Pages

1. Create a new GitHub repository for this folder.
2. Upload these files to the repository and push to the `main` branch.
3. In GitHub, open `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `GitHub Actions`.
5. The included workflow at `.github/workflows/deploy-pages.yml` will publish the site automatically on the next push.

Your share link will look like:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

This project already includes:

- `.github/workflows/deploy-pages.yml` for automatic Pages deploys
- `.nojekyll` so static assets are served cleanly
- `404.html` as a simple fallback redirect
- `favicon.svg` so the shared site has a cleaner browser tab identity

### Netlify

1. Create a new site from this folder or connect the repository.
2. Netlify will detect it as a static site.
3. The included `netlify.toml` publishes the project root directly.

### Vercel

1. Import the folder or repository into Vercel.
2. Vercel can deploy it as a static site without a build command.
3. The included `vercel.json` keeps the config minimal.

## Important Notes

- The old `file:///...` path only works on your own computer.
- Once hosted, you can send people the normal `https://...` link instead.
- Relative file paths are already set up so the game works from a repository subfolder on GitHub Pages.
- If you want a nicer share link later, you can attach a custom domain in GitHub Pages, Netlify, or Vercel.
