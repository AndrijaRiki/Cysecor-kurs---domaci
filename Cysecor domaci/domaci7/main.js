let logo = document.querySelector('.lnXdpd')
let navBar = document.querySelector('.sfbg')
let logo2 = document.querySelector('#logo img')

if(logo != null) {
    logo.src = chrome.runtime.getURL("images/cysecor_logo.png");
    logo.srcset = chrome.runtime.getURL("images/cysecor_logo.png");
}
if(logo2 != null) {
    logo2.src = chrome.runtime.getURL("images/cysecor_logo.png");
    logo2.srcset = chrome.runtime.getURL("images/cysecor_logo.png");
    logo2.style = "width: 30px; height: 30px;"
}

window.onscroll = () => {
    if(this.oldScroll < this.scrollY)
        navBar.style.borderBottom = '2px solid #b1d237'
    else if(this.scrollY == 0)
        navBar.style.borderBottom = 'none'
    this.oldScroll = this.scrollY;
}