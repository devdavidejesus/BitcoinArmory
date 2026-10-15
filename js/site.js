// Small progressive enhancements. Every page works the same without JavaScript.
(function () {
  "use strict";

  // One polite live region, so screen readers hear "Copied to clipboard".
  var status = document.createElement("span");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");
  document.body.appendChild(status);
  function announce(text) {
    status.textContent = "";
    setTimeout(function () { status.textContent = text; }, 50);
  }

  // Code blocks that scroll sideways must be reachable with the keyboard.
  var wide = 0;
  Array.prototype.forEach.call(document.querySelectorAll(".entry pre"), function (pre) {
    if (pre.scrollWidth > pre.clientWidth) {
      wide += 1;
      pre.tabIndex = 0;
      pre.setAttribute("role", "region");
      pre.setAttribute("aria-label", "Code block " + wide + ", scrolls sideways");
    }
  });

  // "Copy" buttons, only on command blocks (shell and PowerShell), not on sample output.
  if (navigator.clipboard) {
    var commands = document.querySelectorAll(".entry .language-bash, .entry .language-powershell, .entry .language-shell");
    Array.prototype.forEach.call(commands, function (block) {
      var pre = block.querySelector("pre");
      if (!pre || block.querySelector(".copy-btn")) return;
      block.classList.add("code-wrap");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        var code = pre.querySelector("code") || pre;
        navigator.clipboard.writeText(code.innerText.replace(/\n$/, "")).then(function () {
          btn.textContent = "Copied";
          announce("Copied to clipboard");
          setTimeout(function () { btn.textContent = "Copy"; }, 2000);
        }, function () {
          announce("Copy failed. Select the text and copy it.");
        });
      });
      block.appendChild(btn);
    });
  }

  // Escape closes an open sub menu in the header (they open on hover and focus).
  Array.prototype.forEach.call(document.querySelectorAll(".site-nav .has-sub"), function (item) {
    var parentLink = item.querySelector("a");
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        item.classList.add("is-dismissed");
        parentLink.focus();
      }
    });
    item.addEventListener("focusout", function (e) {
      if (!item.contains(e.relatedTarget)) item.classList.remove("is-dismissed");
    });
    item.addEventListener("mouseleave", function () { item.classList.remove("is-dismissed"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    Array.prototype.forEach.call(document.querySelectorAll(".site-nav .has-sub:hover"), function (item) {
      item.classList.add("is-dismissed");
    });
  });
})();
