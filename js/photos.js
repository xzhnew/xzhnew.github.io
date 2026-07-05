(function() {
  var BATCH_SIZE = 12;
  var GUTTER = 12;
  var SCROLL_THRESHOLD = 200;

  var container = document.getElementById('photos-container');
  var loadingEl = document.getElementById('loading-more');
  var currentIndex = 0;
  var isLoading = false;
  var masonry = null;
  var scrollTimer = null;

  function getColumnWidth() {
    return window.innerWidth >= 768 ? 260 : 160;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  function renderBatch() {
    if (currentIndex >= window.masonryImages.length) {
      if (loadingEl) loadingEl.style.display = 'none';
      return;
    }
    var end = Math.min(currentIndex + BATCH_SIZE, window.masonryImages.length);
    var batch = window.masonryImages.slice(currentIndex, end);
    for (var i = 0; i < batch.length; i++) {
      var imgData = batch[i];
      var item = document.createElement('div');
      item.className = 'photo-item';
      item.innerHTML = '<img src="' + imgData.image + '" loading="lazy" alt="' + escapeHtml(imgData.title || '') + '">' +
        '<div class="photo-title">' + escapeHtml(imgData.title || '') + '</div>' +
        '<div class="photo-description">' + escapeHtml(imgData.description || '') + '</div>';
      container.appendChild(item);
    }
    currentIndex = end;
    if (!masonry) {
      masonry = new MiniMasonry({
        baseWidth: getColumnWidth(),
        container: container,
        gutterX: GUTTER,
        gutterY: GUTTER,
        surroundingGutter: false
      });
    } else {
      masonry.layout();
    }
    var newImgs = container.querySelectorAll('.photo-item img');
    for (var j = 0; j < newImgs.length; j++) {
      var img = newImgs[j];
      if (!img.complete) {
        img.addEventListener('load', function() { if (masonry) masonry.layout(); });
      }
    }
    if (currentIndex < window.masonryImages.length && loadingEl) {
      loadingEl.style.display = 'block';
      loadingEl.innerHTML = '加载更多...';
    } else if (loadingEl) {
      loadingEl.style.display = 'none';
    }
  }

  function checkAndLoad() {
    if (isLoading) return;
    if (currentIndex >= window.masonryImages.length) return;
    var scrollY = window.scrollY;
    var windowHeight = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight + SCROLL_THRESHOLD >= docHeight) {
      isLoading = true;
      if (loadingEl) loadingEl.innerHTML = '加载中...';
      renderBatch();
      isLoading = false;
      if (loadingEl && currentIndex < window.masonryImages.length) loadingEl.innerHTML = '加载更多...';
    }
  }

  function onScrollStop() {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      if (masonry) masonry.layout();
      checkAndLoad();
    }, 150);
  }

  function init() {
    if (!container) return;
    container.innerHTML = '';
    currentIndex = 0;
    isLoading = false;
    masonry = null;
    renderBatch();
    window.addEventListener('scroll', onScrollStop);
    window.addEventListener('resize', function() {
      if (masonry) {
        masonry.baseWidth = getColumnWidth();
        masonry.layout();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();