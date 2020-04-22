const name = document.querySelector('.entry-title').textContent;
const episode = document.querySelector('.rls-label > strong').textContent;
const magnetLink = document.querySelector('.hs-magnet-link > a').href;
const fullUrl = location.href;
const pageUrl = fullUrl.split('#')[0];

const jsonContent = { name, episode, magnetLink, fullUrl, pageUrl };

jsonContent;