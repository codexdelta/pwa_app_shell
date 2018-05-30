// const apiKey = '7918fb08b57a48afbb3bdafc509324a3';
// const main = document.querySelector('main');
// const sourceSelector = document.querySelector('#sourceSelector');
// const defaultSource = 'the-washington-post';

// window.addEventListener('load', async e => {
//     updateNews();
//     await updateSources();
//     sourceSelector.value = defaultSource;

//     sourceSelector.addEventListener('change', e => {
//         updateNews(e.target.value);
//     });

//     if('serviceWorker' in navigator){
//         try {
//             navigator.serviceWorker.register('sw.js');
//             console.log('SW registered');
//         } catch (error) {
//             console.log('SW registeration failed');
//         }
//     }
// })

// async function updateNews(source = defaultSource) {
//     const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
//     const json = await res.json();

//     main.innerHTML = json.articles.map(createArticle).join('\n');
// }

// async function updateSources(){
//     const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
//     const json = await res.json();

//     sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">
//     ${src.name}</option>`)
//     .join('\n');
// }

// function createArticle(article) {
//     return `
//         <div class="article">
//             <a href="${article.url}">
//                 <h2>${article.title}</h2>
//                 <img src="${article.urlToImage}" alt="">
//                 <p>${article.description}</p>
//             </a>
//         </div>
//     `
// }



// begining of the end 
const apiKey = '7918fb08b57a48afbb3bdafc509324a3';
const defaultSource = 'the-washington-post';
const sourceSelector = document.querySelector('#sourceSelector');
const newsArticles = document.querySelector('main');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(err => 'SW registration failed'));
}

window.addEventListener('load', e => {
    sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
    updateNewsSources().then(() => {
        sourceSelector.value = defaultSource;
        updateNews();
    });
});

window.addEventListener('online', () => updateNews(sourceSelector.value));

async function updateNewsSources() {
    const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await response.json();
    sourceSelector.innerHTML =
        json.sources
            .map(source => `<option value="${source.id}">${source.name}</option>`)
            .join('\n');
}

async function updateNews(source = defaultSource) {
    newsArticles.innerHTML = '';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
    const json = await response.json();
    newsArticles.innerHTML =
        json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
    <div class="article">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
      </a>
    </div>
  `;
}