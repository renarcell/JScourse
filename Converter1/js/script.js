"use strict";

document.querySelector('#uah').addEventListener('input', (e) =>  {
    const uahInput = document.querySelector('#uah'),
          usdInput = document.querySelector("#usd");
    const uahValue = e.target.value;
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(data => {
        return data.json();
    })
    .then(
        data => {
            console.log(data);
            for (let o in data) {
                if (data[o]['r030'] == 840) {
                    let usdCourse = data[o]['rate'];
                    usdInput.value = (uahValue / usdCourse).toFixed(3);
                };
            };
        }).catch(reason => {
            console.log('Fail!');
        });
});

