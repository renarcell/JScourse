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
});