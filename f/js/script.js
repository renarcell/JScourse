import $ from 'jquery';
import {hideChilden, setActive} from './section/libs';

$(function() {
    console.log('re!');
    }
);
document.addEventListener('DOMContentLoaded', function() {
    // let tabs = document.querySelectorAll('.tabheader__items .tabheader__item');
    function getTabNumber(colection, element) {
        let k = -1;
        colection.forEach(function(item, i) {
            if (element == item) {
                k = i;
            }
        });
        return k;
    }

    function switchTab(num) {
        document.querySelectorAll('.tabcontent').forEach((item, i) => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }
            if (item.classList.contains('fade')) {
                item.classList.remove('fade');
            }
            if (num == i) {
                item.classList.add('fade', 'active');
            }
        });
    }
    
    let tabs = document.querySelectorAll('.tabcontent');
    document.querySelectorAll('.tabheader__items .tabheader__item').forEach(function(item, i) {
        item.addEventListener('click', function(e) {
            if(e.target && e.target.classList.contains('tabheader__item_active')) {
                console.log('!!!');
            } else {
                let num = getTabNumber(document.querySelectorAll('.tabheader__items .tabheader__item'), e.target);
                document.querySelector('.tabheader__item_active').classList.remove('tabheader__item_active');
                e.target.classList.add('tabheader__item_active');
                switchTab(num);
            };
        });
    });

    //timer
    function setTimeTimer(elementSelector, endDateStr) {
        let endDateObj = Date.parse(endDateStr),
            dateNow = new Date();

        let offset = Math.floor((endDateObj - dateNow)/1000),
            days = Math.floor((offset / (60 * 60 * 24)) % 365),
            hours = Math.floor((offset / (60 * 60)) % 24),
            minutes = Math.floor((offset / (60)) % 60),
            seconds = Math.floor(offset % 60);
        
        let el = document.querySelector(elementSelector);
        el.querySelector('#days').textContent = (days);
        el.querySelector('#hours').textContent = (hours);
        el.querySelector('#minutes').textContent = (minutes);
        el.querySelector('#seconds').textContent = (seconds);

    };
    setTimeTimer('.promotion__timer', '2021-08-14');
    setInterval(() => {
        setTimeTimer('.promotion__timer', '2021-08-14');
    }, 1000);

    //modals
    function showModal() {
        document.querySelector('.modal').style.display = 'block';
        document.querySelector('.modal').classList.add('fade');
        document.body.style.overflow = 'hidden';
    };

    function hideModal() {
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.modal').classList.remove('fade');
        document.body.style.overflow = '';
    };


    document.querySelectorAll("[data-modal]").forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            showModal()
        });
    });
    document.querySelectorAll("[data-close]").forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            hideModal();
        });
    });

    document.querySelector('.modal').addEventListener('click', function(e) {
        console.log(e.currentTarget);
        console.log(e.target);
        if (e.target.classList.contains('modal')) {
            hideModal();
        }
    });
    //show modal after 30 sec or scroll
    function openScrollModal(e) {
        if (document.documentElement.scrollTop > 2900) {
            showModal();
            document.removeEventListener('scroll', openScrollModal)
        };
    }
    document.addEventListener('scroll', openScrollModal);

    //cards
    class MenuCard {
        constructor(src, alt, subtitle, descr, price, containerSelector) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.containerElement = document.querySelector(containerSelector);
    }

        render() {
            const item = `
            <div class="menu__item">
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            this.containerElement.insertAdjacentHTML("beforeend", item);
        }
    }

    //requests
    function getMenuCardsPromise() {
        const urlCards = 'http://localhost:3000/menu';
        let json = fetch(urlCards)
        .then(data =>  data.json());
        return json;
    }
    //render cards from backend
    getMenuCardsPromise()
    .then(data => {
            data.forEach(function({img, altimg, title, descr, price}) {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        })
    });


    //slider
    
    const prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          slideWrapper = document.querySelector('.offer__slider-wrapper'),
          slides = slideWrapper.children,
          maxSlides = slides.length - 1,
          dotsWrapper = document.querySelector('.carousel-indicators'),
          dots = [];
    let slideCounter = Number.parseInt(document.querySelector('.offer__slider #current').innerHTML);

    installNumber(maxSlides, '.offer__slider #total');
        //dots

    for (let i = 0;i < maxSlides; i++) {
        let dotElement = document.createElement('div');
        dotElement.classList.add('dot');
        dotElement.setAttribute('data-dot-count', i + 1);
        dots.push(dotElement);
        dotsWrapper.append(dotElement);
    }
    function updateCurrentDot() {
        dots.forEach(function(item, i) {
            item.style.opacity = .5;
        });
        dots[slideCounter - 1].style.opacity = 1;
    }

    
    


    function installNumber(num, selector) {
        document.querySelector(selector).innerHTML = num < 10 ? `0${num}` : num;
    };
    

    prevBtn.addEventListener('click', function(e) {
        --slideCounter;
        if (slideCounter < 1) {
            slideCounter = slides.length - 1;
        }
        hideChilden(slides);
        setActive(slides[slideCounter]);

        installNumber(slideCounter, `.offer__slider #current`);
        updateCurrentDot();
    });
    nextBtn.addEventListener('click', function(e) {
        ++slideCounter;
        if (!slides[slideCounter - 1]) {
            slideCounter = 1;
        }
        hideChilden(slides);
        setActive(slides[slideCounter]);

        installNumber(slideCounter, `.offer__slider #current`);
        updateCurrentDot();
    });


    // calculator calories
    const calcField = document.querySelector('.calculating__field'),
          calcInputList = document.querySelectorAll('.calculating__field input'),
          sexWrapper = document.querySelector('#gender'),
          inputsWrapper = document.querySelector('.calculating__choose_medium'),
          activeWrapper = document.querySelector('.calculating__choose_big'),
          greenBtns = document.querySelectorAll(".calculating__choose-item");
    greenBtns.forEach((item, i) => {
        if (!item.parentElement.classList.contains('calculating__choose_medium')) {
            item.addEventListener('click', e => {
                hideChilden(item.parentElement.children, 'calculating__choose-item_active');
                setActive(item, false, 'calculating__choose-item_active');
            });
        }
    });



    calcField.addEventListener('click', e => {
        updateCalories();
    });
    for (let item of calcInputList) {
        item.addEventListener('input', e => {
        if (!+e.target.value) {
            e.target.style.border = 'solid red';
        } else {
            updateCalories();
            e.target.style.border = 'none';
        }
        })
    };


    function getCalories(obj) {
        let BMR = 0;
        if (obj.sex == 'male') {
            BMR = 88.36 + (13.4 * obj.weight) + (4.8 * obj.height) - (5.7 * obj.age);
        } else if (obj.sex == 'female') {
            BMR = 447.6 + (9.2 * obj.weight) + (3.1 * obj.height) - (4.3 * obj.age)
        }
        return (BMR * obj.active);
    }
    updateCalories();
    function updateCalories() {
        const sex = document.querySelector('#gender .calculating__choose-item_active').getAttribute('id'),
              height = +document.querySelector('.calculating #height').value,
              weight = +document.querySelector('.calculating #weight').value,
              age = +document.querySelector('.calculating #age').value;
              console.log();
        if (sex && height && weight && age) {
            let obj = {};
            obj.sex = sex;
            obj.height = height;
            obj.weight = weight;
            obj.age = age;
            const active = document.querySelector('.calculating__choose_big .calculating__choose-item_active')
            .getAttribute('id');
            switch (active) {
                case 'low':
                    obj.active = 1.375;
                    break;
                case 'small':
                    obj.active = 1.55;
                    break;
                case 'medium':
                    obj.active = 1.725;
                    break;
                case 'high':
                    obj.active = 1.9;
                    break;
            }
            document.querySelector('.calculating__result span').textContent = getCalories(obj).toFixed(0);
        } else {
            document.querySelector('.calculating__result span').textContent = "_____";
        }
    }
});