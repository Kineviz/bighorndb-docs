function fixImgAndLinks() {
  var base = "/kuzu-docs";
  document.querySelectorAll("img").forEach(function (img) {
    // 只替换src属性（不含origin）
    if (img.hasAttribute("src")) {
      var src = img.getAttribute("src");
      if (src && src.startsWith("/img/")) {
        img.setAttribute("src", base + src);
      }
    }
  });
  document.querySelectorAll("a").forEach(function (a) {
    if (a.hasAttribute("href")) {
      var href = a.getAttribute("href");
      if (href && href.startsWith("/img/")) {
        a.setAttribute("href", base + href);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fixImgAndLinks();
  // 监听后续DOM变化，动态修正新增img/a
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            if (node.tagName === "IMG" || node.tagName === "A") {
              fixImgAndLinks();
            } else if (node.querySelectorAll) {
              if (node.querySelectorAll("img, a").length > 0) {
                fixImgAndLinks();
              }
            }
          }
        });
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
