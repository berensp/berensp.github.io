// Filters rows of table.filterable by the tag in the URL hash (e.g. /systems/#economics).
// Without JS every row stays visible.
(function () {
  var rows = document.querySelectorAll('table.filterable tbody tr');
  var buttons = document.querySelectorAll('.tag-filter');

  function apply() {
    var tag = decodeURIComponent(location.hash.slice(1));
    var known = Array.prototype.some.call(buttons, function (b) { return b.dataset.tag === tag; });
    if (!known) tag = '';

    rows.forEach(function (row) {
      row.hidden = tag !== '' && row.dataset.tags.split(' ').indexOf(tag) === -1;
    });
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.tag === tag ? 'true' : 'false');
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.tag) {
        location.hash = b.dataset.tag;
      } else {
        history.replaceState(null, '', location.pathname);
        apply();
      }
    });
  });

  window.addEventListener('hashchange', apply);
  apply();
})();
