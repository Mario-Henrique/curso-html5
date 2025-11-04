const cards = document.getElementsByClassName('card');

Object.values(cards).forEach(card => {
    card.addEventListener('click', cardClick);
})

function cardClick(){
    const url = this.getAttribute('data-url');

    if(url)
        window.location.href = url;
}