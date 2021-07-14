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
});