/* Project listing: native links, role filters, and evidence status. */
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

  function repositoryLabel(project) {
    if (project.repository.status === 'public' || project.repository.status === 'public-shell') return 'GitHub 공개';
    if (project.repository.status === 'private') return 'Private repo';
    if (project.repository.status === 'verifying') return 'Repo 검증 중';
    return '근거 범위 표시';
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
      card.style.setProperty('--delay', (index * 60) + 'ms');
      card.setAttribute('aria-label', project.title + ' 프로젝트 상세 보기');

      var thumb = createElement('div', 'card-thumb');
      thumb.appendChild(createImage(project));
      card.appendChild(thumb);

      var info = createElement('div', 'card-info');
      var topline = createElement('div', 'card-topline');
      topline.appendChild(createElement('span', 'card-category', categoryLabels[project.category]));
      topline.appendChild(createElement('span', 'card-status', project.status));
      info.appendChild(topline);
      info.appendChild(createElement('h2', 'card-title', project.title));
      info.appendChild(createElement('p', 'card-subtitle', project.subtitle));
      info.appendChild(createElement('p', 'card-role', project.role));

      var tags = createElement('div', 'card-tags');
      project.stack.slice(0, 3).forEach(function(item) { tags.appendChild(createElement('span', 'tag', item)); });
      info.appendChild(tags);

      var proof = createElement('div', 'card-proof');
      proof.appendChild(createElement('span', null, project.evidence.length + ' evidence'));
      proof.appendChild(createElement('span', null, repositoryLabel(project)));
      proof.appendChild(createElement('span', 'card-arrow', 'View case →'));
      info.appendChild(proof);

      card.appendChild(info);
      grid.appendChild(card);
      requestAnimationFrame(function() { card.classList.add('visible'); });
    });

    if (!filtered.length) grid.appendChild(createElement('p', 'empty-state', '이 역할에 해당하는 프로젝트가 아직 없습니다.'));
  }

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      filterButtons.forEach(function(item) {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      renderCards(button.dataset.filter);
    });
  });

  renderCards('all');
})();
