// --- [Fetch and Display Data] ---
// build url and fetch data
const search = val => {

  // concat
  const artist = val.replace(/ /g,"_");
  const apiKey = '5028223c04409f0558c57862d1afdb24';
  const path = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&limit=10&api_key=${apiKey}&format=json`;

  // clear results and show new

  clearResults()
    .then(() => fetch(path))
    .then(res => res.json())
    .then(res => display(res));
};

// clear any previous results
const clearResults = () => {
  return new Promise((resolve, reject) => {
    const list = document.querySelector('.results-cards');
    for (let x of document.querySelectorAll('.items')) list.removeChild(x);
    resolve();
  });
};

// display data
const display = val => {

  // no results and results elements
  const noResults = document.querySelector('.no-results');
  const results = document.querySelector('.results');

  if (!val.error) {

    // store results in localStorage
    localStorage.setItem('lastResults', JSON.stringify(val));

    // show results and hide error
    noResults.style.display = 'none';
    results.style.display = 'block';

    // display artist name
    document.querySelector('.searchTerm').textContent = val.topalbums['@attr'].artist.replace(/_/g," ");

    // top 9 albums
    const albums = val.topalbums.album;
    for (let x of albums) {

      // list item and placehold img for missing images
      const item = document.createElement('li');
      const img = x.image[2]['#text'] ? x.image[2]['#text'] : '../images/missing.png';
      item.className = `items`;
      item.innerHTML = 
      `
        <a target="_blank" href="${x.url}">
          <img src="${img}" alt="album photo">
          ${x.name}
        </a>
      `;
      document.querySelector('.results-cards').appendChild(item);
    }
  } else {

    // hide results and show error
    noResults.style.display = 'block';
    results.style.display = 'none';
    
    // display error 
    const searchTerm = document.getElementById('searchBox').value;
    document.querySelector('.missingTerm').textContent = searchTerm;
  }
};


// --- [Event Listeners] ---
// page load listener to load last results
document.addEventListener("DOMContentLoaded", e => {

  // if results, load them
  const lastResults = localStorage.getItem('lastResults');
  if (lastResults) display(JSON.parse(lastResults));
});

// listen for enter keypress and submit button to search
document.querySelector('form').addEventListener('submit', e => {

  // stop page from reloading and search for artist
  e.preventDefault();
  const artist = document.querySelector('#searchBox').value.trim();
  if (artist) search(artist);
});

// listen for top artist select
document.querySelector('#one').addEventListener('click', () => search('Foo Fighters'));
document.querySelector('#two').addEventListener('click', () => search('Avenged Sevenfold'));
document.querySelector('#three').addEventListener('click', () => search('Red Hot Chili Peppers'));

// listen for last fm button
document.querySelector('#lastFm').addEventListener('click', e => {

  // create url and open in new tab
  const artist = document.querySelector('.searchTerm').innerText.replace(/ /g,"+");
  const url = `https://www.last.fm/music/${artist}`;
  window.open(url, "_blank");
});

// listen for hamburger menu click
document.querySelector('.menu-btn').addEventListener('click', () => {

  // fade out header content
  for (let x of document.querySelectorAll('.header-content')) {
    x.classList.remove('fade-in');
    x.classList.add('fade-out');
  }

  // fade in menu
  const nav = document.querySelector('.navigation');
  nav.classList.remove('fade-out');
  nav.classList.add('fade-in');
});

// listen for hamburger menu close
document.querySelector('.close-btn').addEventListener('click', () => {

  // fade out menu 
  const nav = document.querySelector('.navigation');
  nav.classList.remove('fade-in');
  nav.classList.add('fade-out');

  // fade in header content
  for (let x of document.querySelectorAll('.header-content')) {
    x.classList.remove('fade-out');
    x.classList.add('fade-in');
  }
});