document.querySelector('#btn1').addEventListener('click', () => {
    console.log("Uspesno si pritisnuo dugme na vrhu")
});

document.querySelector('#range').addEventListener('input', e => {
    document.querySelector('#value').innerHTML = e.target.value;
});

document.querySelector('#btn1').addEventListener('mouseover', () => {
    console.log("Presao si preko dugmeta na vrhu");
});

document.querySelector('#btn1').addEventListener('dblclick', () => {
    console.log("Dvaput si kliknuo dugme na vrhu");
});

document.querySelector('#racunaj').addEventListener('click', e => {
    e.preventDefault();

    document.querySelector("#resenje").innerHTML = parseInt(document.querySelector('#prvi').value) + parseInt(document.querySelector('#drugi').value);
});