'use strict';

//DECLARAR VARIABLES // 

const userInput = document.querySelector('.js_inputUser');

const searchBtn = document.querySelector('.js_btn');

const seriesListHtml = document.querySelector('.js_movielist');

const favoriteListHtml = document.querySelector('.js_favoriteList');

const placeholderImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

const errorMessage = document.querySelector('.js_errorMessage');

let listSeries = [];
let favoriteSeries = [];

//CREAR FUNCTION FETCH 

function handleApiFetch(e) {
  e.preventDefault();

  fetch(`https://api.tvmaze.com/search/shows?q=:${userInput.value}`)
    .then(response => response.json())

    .then(dataShows => {
      listSeries = dataShows.map(data => {

        return {
          id: data.show.id,
          name: data.show.name,
          image: data.show.image
        };
      });

      renderListShow();

    })

    .catch(error => errorMessage.innerHTML = `Ha sucedido un error: ${error}`);
}

//pintar la seie de  la busqueda
function renderListShow() {
  seriesListHtml.innerHTML = '';

  for (let eleInList of listSeries) {

    const movieName = eleInList.name;
    const movieId = eleInList.id;

    const newItemList = document.createElement('li');
    const img = document.createElement('img');
    const textName = document.createElement('p');
    const textField = document.createTextNode(movieName);

    newItemList.id = movieId;
    newItemList.className = 'styleList js_li';

    if (eleInList.image !== null) {
      let getImage = eleInList.image.medium;
      img.src = getImage;
    } else {
      img.src = placeholderImage;
    }

    img.alt = movieName;
    textName.appendChild(textField);
    newItemList.append(textName, img);
    seriesListHtml.appendChild(newItemList);

  }
  /* hay que llamar esta funcion de llamada del li dentro del render pq queremos 
  poner el listener sobre los li, sin esta funcion pues no hace nada, no pinta la selccion favorita clikada por la usuaria */

  handleClickLi();
}


searchBtn.addEventListener('click', handleApiFetch);

