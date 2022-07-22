function film(naslov, cena, dugme) {
    this.naslov = naslov;
    this.cena = cena;
    this.dugme = dugme;
}

var naslovi = document.querySelectorAll('.item h3');
var cene = document.querySelectorAll('.item .cena');
var dugmad = document.querySelectorAll('.item .gledaj');
var ukupno = document.querySelector('#novac');
var gledani = document.querySelector('#naslovi')
var items = document.querySelectorAll('.item')
var filmovi = []

for(let i = 0; i < naslovi.length; i ++) {
    let c = cene[i].innerText;
    c = c.substr(1);

    filmovi.push(new film(naslovi[i].innerText, parseInt(c), dugmad[i]));
}

filmovi.forEach(f => {
    f.dugme.addEventListener('click', () => {
        ukupno.innerText = parseInt(ukupno.innerText) + f.cena;
        f.dugme.setAttribute('disabled', 'true')
        f.dugme.classList.add('kliknuto');

        let kupljeni = document.createElement('div');
        let naslov = document.createElement('h3')
        let placeno = document.createElement('span');
        //let ukloni = document.createElement('button');

        kupljeni.classList.add("kupljeni");
        naslov.innerHTML = f.naslov;
        placeno.classList.add('placeno');
        placeno.innerHTML = '$' + f.cena

        /* ukloni.addEventListener('click', () => {
            let par = ukloni.parentElement;
            let n = par.firstChild.innerHTML
            let c = par.querySelector('.placeno');
            c = parseInt(c.innerText.substr(1));
            gledani.removeChild(par);
            ukupno.innerHTML = parseInt(ukupno.innerHTML) - c;
            
        }) */

        kupljeni.appendChild(naslov);
        kupljeni.appendChild(placeno);
        //kupljeni.appendChild(ukloni);

        gledani.appendChild(kupljeni);

        let par = f.dugme.parentElement;
        
        var lbl = document.createElement("span")
        lbl.classList.add('gledaoSam');
        lbl.innerHTML = "GLEDAO SAM";
        par.appendChild(lbl)

        console.log(par.querySelector('.kliknuto'))
    })
})