export function initMasonry() {
  var n = document.querySelector(".loading-placeholder");
  var e = document.querySelector("#masonry-container");
  if (!n || !e) return;

  n.style.display = "none";
  e.style.display = "block";
  e.style.opacity = 1;

  var t = null;
  var scrollTimer = null;

  function o() {
    if (t) {
      t.layout();
    } else {
      t = window.innerWidth >= 768 ? 255 : 150;
      t = new MiniMasonry({
        baseWidth: t,
        container: e,
        gutterX: 10,
        gutterY: 10,
        surroundingGutter: !1
      });
      t.layout();
    }
  }

  function refreshOnScroll() {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      if (t) t.layout();
    }, 150);
  }

  o();

  var a = document.querySelectorAll("#masonry-container .masonry-item img");
  for (var i = 0; i < a.length; i++) {
    var r = a[i];
    if (r.complete) {
      o();
    } else {
      r.addEventListener("load", o);
    }
  }

  // 监听滚动停止，重新布局（解决回滚后图片消失问题）
  window.addEventListener("scroll", refreshOnScroll);
}

if (data.masonry) {
  try {
    swup.hooks.on("page:view", initMasonry);
  } catch (n) {}
  document.addEventListener("DOMContentLoaded", initMasonry);
}

//# sourceMappingURL=masonry.js.map