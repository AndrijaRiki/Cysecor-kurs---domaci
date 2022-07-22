let textTag = document.querySelector('.section1 h1')
let text = textTag.textContent;
let splitedText = text.split("");

textTag.innerHTML = '';

for(let i = 0; i < splitedText.length; i ++) {
    if(splitedText[i] == " ") {
        splitedText[i] = "&nbsp";
    }
    textTag.innerHTML += `<span>${splitedText[i]}</span>`;
}

let k = 0;
let spans = textTag.querySelectorAll('span');
let interval = setInterval(() => {
    let singleSpan = spans[k++]
    singleSpan.className = "fadeMove";

    if(k === spans.length) {
        clearInterval(interval);
    }
}, 100)

let border = document.querySelector('.border-line');
let animWidth = 0;
let sectionForAnimation = document.querySelector('.section2 .images')
let leftImage = document.querySelector('.slideFromLeft');
let rightImage = document.querySelector(".slideFromRight");

window.onscroll = () => {
    if(this.oldScroll > this.scrollY) animWidth -= 1.5;
    else animWidth += 1.5;

    if(animWidth >= 100) animWidth = 100;
    if(animWidth <= 0) animWidth = 0;

    border.style.width = animWidth + "%";

    this.oldScroll = this.scrollY;
    imageAnimation();
}

const imageAnimation = () => {
    let sectionPos = sectionForAnimation.getBoundingClientRect().top;
    let screenPos = window.innerHeight;
    
    if(sectionPos < screenPos) {
        leftImage.classList.add('animated')
        rightImage.classList.add('animated')
    }
}

/* ************************** */
document.querySelector('.buttonLeft').addEventListener('click', () => {
    if(leftImage.classList.contains('animated')) {
        leftImage.classList.remove('animated');
    } else {
        leftImage.classList.add('animated')
    }
});
document.querySelector('.buttonRight').addEventListener('click', () => {
    if(rightImage.classList.contains('animated')) {
        rightImage.classList.remove('animated');
    } else {
        rightImage.classList.add('animated')
    }
});