/*
1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против...",
        "Зек №1",
    ]
};

const filmList = document.querySelector('.promo__interactive-list');
//1
document.querySelector('.promo__adv').innerHTML = '';
//2
document.querySelector('.promo__genre').textContent = 'ДРАМА';
//3
document.querySelector('.promo__bg').style['background-image'] = "url('img/bg.jpg')"; 
//4
function updateList() {
    filmList.innerHTML = '';
    movieDB.movies.sort().forEach((element, i) => {
        let listItem = `<li data-count="${i}" class="promo__interactive-item">${i + 1}. ${element}<div class="delete"></div></li>`;
        filmList.insertAdjacentHTML('beforeend', listItem);
    });
    // document.querySelectorAll('li .delete').forEach(function(item, i) {
    //     item.addEventListener('click', DeleteFilm);
    // });
};
updateList();

document.querySelector('.promo__interactive-list').addEventListener('click', function(e) {
    if (e.target && e.target.matches('div.delete')){
        console.log('1');
        DeleteFilm(e);
    }
});


let formBtnSubmit = document.querySelector('form.add button'),
    filmInput = document.querySelector('.adding__input');

function addFilm(e) {
    e.preventDefault();
    if (document.querySelector('form.add [type=checkbox]').checked) {
        console.log("Добавляем любимый фильм");
    };
    let filmName = filmInput.value;
    if (filmName.length > 21) {
        filmName = filmName.slice(0,21) + '...';
    };
    movieDB.movies.push(filmName);
    updateList();
}

formBtnSubmit.addEventListener('click', addFilm);

function DeleteFilm(e) {
    try {
        e.preventDefault();
        let filmCount = e.target.parentElement.getAttribute('data-count');
        delete movieDB.movies[filmCount];
        movieDB.movies = movieDB.movies.filter(item => item != undefined ? true : false);
        console.log('Element Deleted!');
        updateList();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    };
};



