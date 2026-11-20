/* Rejestracja service workera — po pierwszym otwarciu strony online działa ona także bez internetu. */
(function () {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").then(function (reg) {
      // Pokaż informację, gdy całość jest zapisana do użytku offline
      navigator.serviceWorker.ready.then(function () {
        try { if (!localStorage.getItem("kb.offlineNote")) { localStorage.setItem("kb.offlineNote", "1"); note("Strona zapisana do użytku offline. Dodaj ją do ekranu głównego, aby otwierać jak aplikację."); } } catch (e) {}
      });
    }).catch(function () {});
  });
  function note(t) {
    var d = document.createElement("div"); d.className = "g-toast"; d.textContent = t; document.body.appendChild(d);
    setTimeout(function () { d.classList.add("out"); }, 4000); setTimeout(function () { d.remove(); }, 4600);
  }
})();
