console.warn('Why are you looking in the terminal? Just go look at the GitHub! :D https://github.com/theinfamouscoder5/about-me');


$(function() {
  const $container = $('#draggable-container');
  let activeData = null;

  $container.on('mousedown', '.window', function(e) {
    $('.window').css('z-index', 1);
    $(this).css('z-index', 10);
  });

  $container.on('mousedown', '.window .top .title', function(e) {
    if ($(e.target).is('button')) return;

    const $titleBar = $(this);
    const $window = $titleBar.closest('.window');

    $('.window').css('z-index', 1);
    $window.css('z-index', 10);

    $titleBar.add('body').css('cursor', 'grabbing');

    const winPos = $window.position();
    activeData = {
      $win: $window,
      $title: $titleBar,
      offsetX: e.clientX - winPos.left,
      offsetY: e.clientY - winPos.top,
      maxX: $container.width() - $window.outerWidth(),
      maxY: $container.height() - $window.outerHeight()
    };
    
    e.preventDefault();
  });

  $(window).on('mousemove', function(e) {
    if (!activeData) return;

    const newX = Math.max(0, Math.min(e.clientX - activeData.offsetX, activeData.maxX));
    const newY = Math.max(0, Math.min(e.clientY - activeData.offsetY, activeData.maxY));

    activeData.$win.css({ left: newX, top: newY });
  });

  $(window).on('mouseup', function() {
    if (!activeData) return;

    activeData.$title.css('cursor', 'grab');
    $('body').css('cursor', '');

    activeData = null;
  });

  let pendingUrl = null;

  document.querySelector('#taskbar').addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (!button) return;

    const url = button.getAttribute('hx-get');
    if (!url) return;

    const existing = document.querySelector(`.window[data-window-url="${url}"]`);
    if (existing) {
      e.preventDefault();
      e.stopPropagation();
      $('.window').css('z-index', 1);
      $(existing).css('z-index', 10);
      pendingUrl = null;
    } else {
      pendingUrl = url;
    }
  }, true);

  const observer = new MutationObserver(function(mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1 && node.classList.contains('window') && pendingUrl) {
          node.setAttribute('data-window-url', pendingUrl);
          pendingUrl = null;
        }
      }
    }
  });

  observer.observe($container[0], { childList: true });
});
