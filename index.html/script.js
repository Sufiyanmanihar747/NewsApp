const API_KEY = "8a6b525c9925801914d2702fe4683567";
const url = 'https://gnews.io/api/v4/search?q=';

window.addEventListener('load', () => fetchNews('India'));

async function fetchNews(query) {
        const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
}

function bindData(articles) {
        const cardContainer = document.getElementById('cards-container')
        const newsCardTemplate = document.getElementById('template-news-card')
        cardContainer.innerHTML = "";
        articles.forEach((article) => {
                if (!article.image) return;
                const cardClone = newsCardTemplate.content.cloneNode(true);
                fillDataInCard(cardClone, article);
                cardContainer.appendChild(cardClone);
        });
}
function fillDataInCard(cardClone, article) {
        const newsImg = cardClone.querySelector('#news-img');
        const newsTitle = cardClone.querySelector('#news-title');
        const newsSource = cardClone.querySelector('#news-source');
        const newsDescription = cardClone.querySelector('#news-desc');

        newsImg.src = article.image;
        console.log(newsImg);
        newsTitle.innerHTML = article.title;
        newsDescription.innerHTML = article.description;

        const date = new Date(article.publishedAt).toLocaleString('en-US', {
                timeZone: 'Asia/Jakarta'
        });

        newsSource.innerHTML = `${article.source.name} ${date}`;
        cardClone.firstElementChild.addEventListener('click', () => {
                window.open(article.url, '_blank');
        });
}

// NAVBAR BUTTON 

function category(id) {
        fetchNews(id);
}

// SEARCH BOX

const searchBtn = document.getElementById('search-button');
const searchTxt = document.getElementById('search-text');
searchBtn.addEventListener('click', () => {
        const query = searchTxt.value;
        if (!query) return;
        fetchNews(query);
});

// DARK THEME

const toggle = document.getElementById('toggle-dark');
const body = document.querySelector('body');
const header = document.getElementById('nav');
const navList = document.querySelector('.navbar-nav');
const homeLink = document.getElementsByTagName('b');
const card = document.getElementsByClassName('card-body')
const mobNav = document.getElementById('mob-nav');
const logo = document.getElementById('logo');
toggle.addEventListener('click', function () {
        if (toggle.classList.contains('bi-moon-fill')) {
                toggle.classList.remove('bi-moon-fill');
                toggle.classList.add('bi-brightness-high-fill');
                body.style.background = "black";
                body.style.color = "white";
                header.classList.remove("bg-light");
                header.classList.add("bg-dark");
                navList.classList.remove("bg-light");
                navList.classList.add("bg-dark");
                mobNav.style.background = "white";
                logo.style.filter = "invert(1)";
                for (const element of homeLink) {
                        element.style.color = 'white';
                }
                for (const element of card) {
                        element.style.color = 'white';
                        element.style.background = "black";
                }
                body.style.transition = "2s";
        } else {
                toggle.classList.remove('bi-brightness-high-fill');
                toggle.classList.add('bi-moon-fill');
                body.style.background = "white";
                body.style.color = "black";
                header.classList.remove("bg-dark");
                header.classList.add("bg-light");
                navList.classList.remove("bg-dark");
                navList.classList.add("bg-light");
                logo.style.filter = "";
                for (const element of homeLink) {
                        element.style.color = '';
                }
                for (const element of card) {
                        element.style.color = '';
                        element.style.background = "";
                }
                body.style.transition = "2s";
        }
});






