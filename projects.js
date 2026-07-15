/* Project listing: original card design with PM-first evidence tags. */
(function() {
  var grid = document.getElementById('projectsGrid');
  var filterButtons = document.querySelectorAll('.filter-btn');
  if (!grid || typeof projects === 'undefined') return;

  function createElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    return element;
  }

  function createImage(project) {
    var image = document.createElement('img');
    image.src = project.thumbnail;
    image.alt = project.title + ' 대표 화면';
    image.loading = 'lazy';
    image.decoding = 'async';
    return image;
  }

  function renderCards(filter) {
    grid.textContent = '';
    var filtered = projects
      .filter(function(project) { return filter === 'all' || project.category === filter; })
      .sort(function(a, b) {
        var categoryDifference = categoryOrder[a.category] - categoryOrder[b.category];
        if (categoryDifference !== 0) return categoryDifference;
        return Number(b.featured) - Number(a.featured);
      });

    filtered.forEach(function(project, index) {
      var card = document.createElement('a');
      card.href = '/projects/' + project.id + '/';
      card.className = 'project-card animate-in';
      card.style.setProperty('--delay', (index * 80) + 'ms');
      card.setAttribute('aria-label', project.title + ' 프로젝트 상세 보기');

      var thumbnail = createElement('div', 'card-thumb');
      thumbnail.appendChild(createImage(project));
      card.appendChild(thumbnail);

      var info = createElement('div', 'card-info');
      info.appendChild(createElement('span', 'card-category', categoryLabels[project.category]));
      info.appendChild(createElement('h2', 'card-title', project.title));
      info.appendChild(createElement('p', 'card-subtitle', project.subtitle));

      var tags = createElement('div', 'card-tags');
      project.outcomes.slice(0, 3).forEach(function(item) {
        tags.appendChild(createElement('span', 'tag', item.value + ' · ' + item.label));
      });
      info.appendChild(tags);
      card.appendChild(info);
      grid.appendChild(card);

      requestAnimationFrame(function() { card.classList.add('visible'); });
    });

    if (!filtered.length) grid.appendChild(createElement('p', 'empty-state', '이 역할에 해당하는 프로젝트가 아직 없습니다.'));
  }

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var selectedFilter = button.dataset.filter;
      filterButtons.forEach(function(item) {
        var selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });

      grid.querySelectorAll('.project-card').forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
      });
      window.setTimeout(function() { renderCards(selectedFilter); }, 200);
    });
  });

  renderCards('all');
})();
