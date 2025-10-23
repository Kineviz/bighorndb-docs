function fixImgAndLinks() {
  const base = window.BASE_PATH;
  if (!base || base === "/") {
    return;
  }
  document.querySelectorAll("img").forEach(function (img) {
    if (img.hasAttribute("src")) {
      const src = img.getAttribute("src");
      if (src && src.startsWith("/") && !src.startsWith(base)) {
        img.setAttribute("src", base + src);
      }
    }
  });
  document.querySelectorAll("a").forEach(function (a) {
    if (a.hasAttribute("href")) {
      const href = a.getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith(base)) {
        a.setAttribute("href", base + href);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fixImgAndLinks();
  fixImgAndLinks();
  const observer = new MutationObserver(function () {
    fixImgAndLinks();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
});
