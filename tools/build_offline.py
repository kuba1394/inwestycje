#!/usr/bin/env python3
"""
Buduje wersję offline strony:
  1) sw.js — service worker z listą wszystkich plików (PWA: po pierwszym otwarciu strona działa bez internetu),
  2) offline.html — jeden samodzielny plik z wbudowanym CSS i JS (do pobrania na telefon).
Uruchom po każdej zmianie treści:  python3 tools/build_offline.py
"""
import re, hashlib, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")
scripts = re.findall(r'<script src="([^"]+)"></script>', html)
assets = ["./", "index.html", "css/style.css", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"] + scripts
digest = hashlib.sha256("".join((root / a).read_text(encoding="utf-8") if a.endswith((".js", ".css", ".html")) else a for a in assets if a != "./").encode()).hexdigest()[:10]

sw = f"""/* Generowany przez tools/build_offline.py — nie edytuj ręcznie. */
const CACHE = "kb-{digest}";
const ASSETS = {assets!r};
self.addEventListener("install", e => {{
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
}});
self.addEventListener("activate", e => {{
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
}});
self.addEventListener("fetch", e => {{
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => {{
      if (r.ok && new URL(e.request.url).origin === location.origin) {{ const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }}
      return r;
    }}).catch(() => caches.match(e.request, {{ ignoreSearch: true }}).then(m => m || caches.match("index.html")))
  );
}});
""".replace("'", '"')
(root / "sw.js").write_text(sw, encoding="utf-8")

# offline.html — wszystko w jednym pliku
css = (root / "css/style.css").read_text(encoding="utf-8")
out = html.replace('<link rel="stylesheet" href="css/style.css">', "<style>\n" + css + "\n</style>")
out = re.sub(r'\s*<link rel="manifest"[^>]*>', "", out)
out = re.sub(r'\s*<link rel="apple-touch-icon"[^>]*>', "", out)
def inline(m):
    src = m.group(1)
    if src == "js/pwa.js": return ""
    code = (root / src).read_text(encoding="utf-8").replace("</script", "<\\/script")
    return "<script>/* " + src + " */\n" + code + "\n</script>"
out = re.sub(r'<script src="([^"]+)"></script>', inline, out)
(root / "offline.html").write_text(out, encoding="utf-8")
print("sw.js:", len(assets), "plików, cache", digest, "| offline.html:", round(len(out.encode()) / 1024), "KB")
