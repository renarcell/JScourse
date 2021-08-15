export function hideChilden(el, className = 'active') {
    for (let child of el) {
        if (child.classList.contains(className)) {
            child.classList.remove(className);
        };
        if (child.classList.contains('fade')) {
            child.classList.remove('fade');
        };
    }
}

export function setActive(el, isAddFade = true, className = 'active') {
    el.classList.add(className);
    if (isAddFade) {
        el.classList.add('fade');
    }
}