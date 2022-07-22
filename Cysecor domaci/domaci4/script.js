//Ovo je responsive meni
let menuBtn = document.querySelector('.header button')

const mobileMenu = () => {
    let menu = document.querySelector('.header ul')
    let btn = document.querySelector('.header button')

    if(btn.innerHTML == "MENU") {
        menu.style.display = "block"
        btn.innerHTML = "CLOSE"
    }
    else {
        menu.style.display = "none"
        btn.innerHTML = "MENU"
    }
}
menuBtn.addEventListener('click', mobileMenu)

//ovo je galerija
let rightBtn = document.querySelector("#right-btn")
let leftBtn = document.querySelector("#left-btn")
let pictures = document.querySelectorAll('.slider-images img')
let imgNum = 0

//funkcije za pomeranje slika
const moveRight = () => {
    displayNone()
    imgNum ++
    if(imgNum === pictures.length)
        imgNum = 0

    pictures[imgNum].style.display = "block"
}
const moveLeft = () => {
    displayNone()
    imgNum --
    if(imgNum === -1)
        imgNum = pictures.length - 1

    pictures[imgNum].style.display = "block"
}

rightBtn.addEventListener('click', moveRight)
leftBtn.addEventListener('click', moveLeft)

//sve se stavlja na display = "none"
const displayNone = () => {
    pictures.forEach((img) => {
        img.style.display = "none"
    })
}

//Portfolio
let portfolioBtns = document.querySelectorAll('.portfolio-categories button')

const portfolioSort = (button) => {
    let category = button.target.getAttribute('data-category');
    let portfolioItems = document.querySelectorAll('.portfolio-single-item')

    portfolioItems.forEach((item) => {
        item.style.display = "none"
    })

    if(category === "sve") {
        portfolioItems.forEach((item) => {
            item.style.display = "block"
        })
    }
    portfolioItems.forEach((item) => {
        if(item.getAttribute('data-category').includes(category)) {
            item.style.display = "block"
        }
    })
}
portfolioBtns.forEach((it) => {
    it.addEventListener('click', portfolioSort)
})

let modalWindow = document.querySelector('.popup-modal')
let overlay = document.querySelector('.overlay')

let modalBtn = document.querySelector('.modal-section button')
let closeModalBtn = document.querySelector('#closeModal')

//Otvaramo modal
const openModal = () => {
    overlay.style.display = "block"
    modalWindow.style.display = "block"
}

//Zatvaramo modal
const closeModal = () => {
    overlay.style.display = "none"
    modalWindow.style.display = "none"
}

modalBtn.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal)

/* *********** */

let modalBtn2 = document.querySelector('.modal2 button');
let closeModalBtn2 = document.querySelector('#closeModal2');
let modalWindow2 = document.querySelector('.popup2');

const openModal2 = () => {
    overlay.style.display = "block";
    modalWindow2.style.display = "block";
}

const closeModal2 = () => {
    overlay.style.display = "none"
    modalWindow2.style.display = "none"
}

modalBtn2.addEventListener('click', openModal2)
closeModalBtn2.addEventListener('click', closeModal2)