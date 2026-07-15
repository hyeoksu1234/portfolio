const fs = require('fs');
const path = require('path');
const { projects } = require('../data.js');

const root = path.resolve(__dirname, '..');
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

const ids = new Set();
projects.forEach((project) => {
  check(!ids.has(project.id), `Duplicate project id: ${project.id}`);
  ids.add(project.id);

  ['title', 'subtitle', 'role', 'period', 'summary', 'contribution', 'problem', 'decisions', 'process', 'outcomes', 'evidence', 'repository'].forEach((field) => {
    check(Boolean(project[field]), `${project.id}: missing ${field}`);
  });

  check(project.decisions.length > 0, `${project.id}: at least one decision is required`);
  check(project.process.length > 0, `${project.id}: at least one process step is required`);
  check(project.outcomes.length > 0, `${project.id}: at least one outcome is required`);
  check(project.evidence.length > 0, `${project.id}: at least one evidence item is required`);

  [...(project.images || []), project.thumbnail].forEach((asset) => {
    const relative = asset.replace(/^\//, '');
    check(fs.existsSync(path.join(root, relative)), `${project.id}: missing asset ${asset}`);
  });

  const generatedPage = path.join(root, 'projects', project.id, 'index.html');
  check(fs.existsSync(generatedPage), `${project.id}: generated page is missing`);
  if (fs.existsSync(generatedPage)) {
    const html = fs.readFileSync(generatedPage, 'utf8');
    check(html.includes(`<link rel="canonical" href="https://portfolio-hyeoksu.vercel.app/projects/${project.id}/">`), `${project.id}: canonical mismatch`);
    check(html.includes('<h1 class="project-title">'), `${project.id}: h1 missing`);
    check(html.includes('application/ld+json'), `${project.id}: JSON-LD missing`);
  }
});

['index.html', 'projects/index.html', 'sitemap.xml', 'robots.txt', '404.html', 'vercel.json'].forEach((file) => {
  check(fs.existsSync(path.join(root, file)), `Missing required file: ${file}`);
});

const textFiles = ['index.html', 'projects/index.html', 'project.html'];
textFiles.forEach((file) => {
  const target = path.join(root, file);
  if (!fs.existsSync(target)) return;
  const content = fs.readFileSync(target, 'utf8');
  check(!content.includes('hyeoksu1234.github.io/portfolio_website'), `${file}: old GitHub Pages URL remains`);
});

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Site checks passed: ${projects.length} projects, assets, routes, and SEO metadata.`);
