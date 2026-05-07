# Co-op Work Term Reports

Static portfolio site for showcasing co-op work terms. The home page lists three placements (Kal-Polymers, Ontario Public Service, AMD); choosing one swaps the sections below (about the employer, job description, technologies, goals/reflections, and achievements). Content is plain HTML/CSS/JavaScript—no build step.

## How to run

**Option A — open the file**

Open `index.html` in your browser (double-click or drag into a window). Some features behave best over HTTP, so if anything seems off, use Option B.

**Option B — local server (recommended)**

From the project root:

```bash
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).  
(Any static file server works, e.g. `npx serve` or your editor’s “Live Preview”.)

## Structure

- `index.html` — main page and co-op panels  
- `assets/css/main.css` — styles  
- `assets/js/main.js` — navigation, scroll effects, co-op switching  
- `forms/` — PHP form handlers (only if you deploy with PHP)
