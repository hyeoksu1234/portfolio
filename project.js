/* Legacy query route → clean, indexable project route. */
(function() {
  var id = new URLSearchParams(window.location.search).get('id');
  var exists = typeof projects !== 'undefined' && projects.some(function(project) { return project.id === id; });
  window.location.replace(exists ? '/projects/' + id + '/' : '/not-found');
})();
