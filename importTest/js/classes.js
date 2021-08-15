export default class User {
    constructor(name = 'Alex') {
        this.name = name
    }
    getName() {
        return this.name
    }
}

document.querySelector('h1').style.color = 'red';
