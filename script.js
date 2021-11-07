let selecionadas = [];
let jogo = [];
let baralho = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif",
];

let jogadas = 0;

mostrar();


function mostrar() {

    let cartaString = "";
    let quantidade = parseInt(prompt("Escolha um numero par de cartas para jogar entre 4 e 14:"));
    if (quantidade >= 4 && quantidade <= 14 && quantidade % 2 == 0) {
        for (let carta = 0; carta < quantidade / 2; carta++) {
            jogo.push(baralho[carta]);
            jogo.push(baralho[carta]);
        }
        jogo.sort(comparador);
        for (let carta = 0; carta < jogo.length; carta++) {
            cartaString +=
                '<div class="carta" onclick="selecionarcarta(this)">\n<img class="front-face face" src="front.png" />\n<img class="back-face face" src="imagens/' +
                jogo[carta] +
                '"/>\n</div>\n';
        }
        document.querySelector(".cartas").innerHTML = cartaString;
    } else {
        mostrar();
    }
}

function selecionarcarta(carta) {
    togglecarta(carta);
    selecionadas.push(carta);
    jogadas++;
    carta.classList.add("desabilitar");

    if (selecionadas.length === 2) {

        let todas = document.querySelectorAll(".carta");
        for (let i = 0; i < todas.length; i++) {
            todas[i].classList.add("desabilitar");
        }
        comparar();
    }
    if (jogo.length == document.querySelectorAll(".pares").length) {
        setTimeout(acabarjogo, 500);
    }
}
//}

function togglecarta(carta) {
    let frontcarta = carta.querySelector(".front-face");
    let backcarta = carta.querySelector(".back-face");

    if (backcarta.style.transform === 'rotateY(0deg)') {
        frontcarta.style.transform = 'rotateY(0deg)';
        backcarta.style.transform = 'rotateY(180deg)';
    } else {
        backcarta.style.transform = 'rotateY(0deg)';
        frontcarta.style.transform = 'rotateY(180deg)';
    }
}

function comparar() {
    let firstcarta = selecionadas[0].querySelector(".back-face");
    let secondcarta = selecionadas[1].querySelector(".back-face");
    let todas = document.querySelectorAll(".carta");
    if (firstcarta.src !== secondcarta.src) {
        diferentes()
    } else {
        iguais();
        for (let i = 0; i < todas.length; i++) {

            todas[i].classList.remove("desabilitar");
        }
    }
}

function diferentes() {
    let todas = document.querySelectorAll(".carta");
    setTimeout(() => {
        togglecarta(selecionadas[0]);
        togglecarta(selecionadas[1]);
        selecionadas = []

        for (let i = 0; i < todas.length; i++) {
            todas[i].classList.remove("desabilitar");
        }
    }, 1000);

}

function iguais() {

    selecionadas[0].classList.add("pares");
    selecionadas[1].classList.add("pares");


    selecionadas = []
}

function acabarjogo() {
    alert("Você ganhou em " + jogadas + " jogadas!");
}

function comparador() {
    return Math.random() - 0.5;
}