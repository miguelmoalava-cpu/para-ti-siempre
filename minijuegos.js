function miniReaccion(){
    estado.acto++;

    cambiarPantalla(`
    ${progreso()}
    <p>Espera… y toca cuando aparezca 💛</p>
    <button id="btn" disabled>...</button>
    `);

    let tiempo = Math.random() * 2000 + 1000;

    setTimeout(()=>{
        const btn = document.getElementById("btn");
        btn.disabled = false;
        btn.textContent = "💛";

        let inicio = Date.now();

        btn.onclick = () => {
            let reaccion = Date.now() - inicio;

            if(reaccion < 400){
                estado.amor++;
                cambiarPantalla(`<p>⚡ rapidísima… como cuando piensas en mí</p><button onclick="siguiente()">Seguir</button>`);
            } else {
                estado.calma++;
                cambiarPantalla(`<p>😴 lenta… pero igual te amo</p><button onclick="siguiente()">Seguir</button>`);
            }
        };

    }, tiempo);
}

function miniDecision(){
    estado.acto++;

    cambiarPantalla(`
    ${progreso()}
    <p>Estamos juntos y yo estoy callado…</p>

    <button onclick="decision(1)">Me abrazas</button>
    <button onclick="decision(2)">Me preguntas qué pasa</button>
    <button onclick="decision(3)">Me ignoras</button>
    `);
}

function decision(op){

    if(op === 1){
        estado.amor++;
        fondo("#f8bbd0");
        cambiarPantalla(`<p>💗 eso era justo lo que necesitaba</p><button onclick="siguiente()">Seguir</button>`);
    }

    if(op === 2){
        estado.apoyo++;
        fondo("#66bb6a");
        cambiarPantalla(`<p>💚 gracias por preocuparte</p><button onclick="siguiente()">Seguir</button>`);
    }

    if(op === 3){
        estado.calma++;
        fondo("#64b5f6");
        cambiarPantalla(`<p>😅 igual me quedo contigo</p><button onclick="siguiente()">Seguir</button>`);
    }
}

/* =========================
   FLAPPY LOVE 💛 (MEJORADO)
========================= */

let vidas = 3;
let esperando = false;

let birdY, velocity, gravity;
let obstaculos = [];
let puntos = 0;
let gameLoop;
let jugando = false;
let tiempoObs;

/* PANTALLA INICIAL */
function miniFlappyReal(){
    estado.acto++;

    cambiarPantalla(`
    ${progreso()}
    <p>No dejes caer nuestro amor 💛</p>
    <button onclick="iniciarFlappy()">Jugar</button>
    `);
}

/* INICIAR JUEGO */
function iniciarFlappy(){
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.style.display = "block";

    birdY = 200;
    velocity = 0;
    gravity = 0.35; // 🔥 más suave

    obstaculos = [];

    if(!esperando){
        puntos = 0;
    }

    jugando = true;
    esperando = false;

    /* CONTROLES */
    document.onclick = saltar;
    document.onkeydown = (e) => {
        if(e.code === "Space") saltar();
    };

    function saltar(){
        velocity = -6; // 🔥 salto más controlable
    }

    /* OBSTÁCULOS SUAVES */
    let ultimoGapY = 150;

    function crearObstaculo(){
        let nuevoGap = ultimoGapY + (Math.random()*100 - 50);

        if(nuevoGap < 80) nuevoGap = 80;
        if(nuevoGap > 220) nuevoGap = 220;

        obstaculos.push({
            x: 300,
            gapY: nuevoGap
        });

        ultimoGapY = nuevoGap;
    }

    /* GENERACIÓN CONTROLADA */
    tiempoObs = setInterval(() => {
        if(jugando && (obstaculos.length === 0 || obstaculos[obstaculos.length-1].x < 180)){
            crearObstaculo();
        }
    }, 500);

    /* LOOP */
    function loop(){
        ctx.clearRect(0,0,300,400);

        velocity += gravity;
        birdY += velocity;

        /* CORAZÓN */
        ctx.font = "20px Arial";
        ctx.fillText("💛", 140, birdY);
        ctx.fillText("❤️ " + vidas, 240, 20);

        /* OBSTÁCULOS */
        obstaculos.forEach(o => {

            ctx.fillStyle = "white";

            /* ARRIBA */
            ctx.fillRect(o.x, 0, 40, o.gapY);

            /* ABAJO (más espacio 🔥) */
            ctx.fillRect(o.x, o.gapY + 130, 40, 400);

            /* CAMINO DE PUNTOS ✨ */
            ctx.fillStyle = "rgba(255,255,255,0.6)";
            for(let i = 0; i < 5; i++){
                ctx.beginPath();
                ctx.arc(o.x + 20, o.gapY + 25 + i*20, 3, 0, Math.PI*2);
                ctx.fill();
            }

            /* MOVIMIENTO */
            o.x -= 2;

            /* COLISIÓN */
            if(
                140 < o.x + 40 &&
                160 > o.x &&
                (birdY < o.gapY || birdY > o.gapY + 130)
            ){
                terminarFlappy(false);
            }

            /* PUNTOS */
            if(o.x === 100){
                puntos++;
            }
        });

        /* SUELO */
        if(birdY > 380){
            terminarFlappy(false);
            return;
        }

        /* PUNTAJE */
        ctx.fillText("💛 " + puntos, 10, 20);

        /* GANAR */
        if(puntos >= 5){
            terminarFlappy(true);
            return;
        }

        if(jugando){
            gameLoop = requestAnimationFrame(loop);
        }
    }

    loop();
}

/* FINAL */
function terminarFlappy(gano){
    jugando = false;
    cancelAnimationFrame(gameLoop);
    clearInterval(tiempoObs); // 🔥 importante

    const canvas = document.getElementById("gameCanvas");
    canvas.style.display = "none";

    document.onclick = null;
    document.onkeydown = null;

    if(gano){
        estado.amor++;
        cambiarPantalla(`
        <p>💛 cuidaste nuestro amor</p>
        <button onclick="siguiente()">Seguir</button>
        `);
        return;
    }

    /* VIDA */
    vidas--;

    if(vidas > 0){
        esperando = true;

        cambiarPantalla(`
        <p>💔 se cayó… pero aún nos quedan ${vidas} vidas</p>
        <p>intentando de nuevo en 3...</p>
        `);

        let cuenta = 3;

        const intervalo = setInterval(()=>{
            cuenta--;

            if(cuenta > 0){
                cambiarPantalla(`
                <p>💔 se cayó… pero aún nos quedan ${vidas} vidas</p>
                <p>intentando de nuevo en ${cuenta}...</p>
                `);
            } else {
                clearInterval(intervalo);
                iniciarFlappy();
            }
        },1000);

    } else {
        estado.calma++;
        cambiarPantalla(`
        <p>😅 se cayó… pero igual seguimos intentando 💛</p>
        <button onclick="siguiente()">Seguir</button>
        `);
    }
}

/* =========================
   MEMORIA PRO 💛 (MEJORADA)
========================= */

let secuenciaMem = [];
let inputUsuario = [];
let mostrando = false;

function miniMemoriaPro(){
    estado.acto++;

    secuenciaMem = [];
    inputUsuario = [];

    cambiarPantalla(`
    ${progreso()}
    <p>Memoriza la secuencia 💛</p>
    <button onclick="empezarMemoria()">Empezar</button>
    <div id="zona"></div>
    `);
}

function empezarMemoria(){
    agregarPaso();
    setTimeout(()=>{
        mostrarSecuencia();
    }, 300);
}

function agregarPaso(){
    const opciones = ["🌸","🌼","🌙","💛","⭐","🍀","🔥"];
    secuenciaMem.push(opciones[Math.floor(Math.random()*opciones.length)]);
}

function mostrarSecuencia(){
    mostrando = true;
    let i = 0;
    const zona = document.getElementById("zona");

    const intervalo = setInterval(()=>{
        zona.innerHTML = `<h2>${secuenciaMem[i]}</h2>`;
        i++;

        if(i >= secuenciaMem.length){
            clearInterval(intervalo);
            setTimeout(()=>{
                zona.innerHTML = `
                <button onclick="clickMem('🌸')">🌸</button>
                <button onclick="clickMem('🌼')">🌼</button>
                <button onclick="clickMem('🌙')">🌙</button>
                <button onclick="clickMem('💛')">💛</button>
                <button onclick="clickMem('⭐')">⭐</button>
                <button onclick="clickMem('🍀')">🍀</button>
                <button onclick="clickMem('🔥')">🔥</button>
                `;
                mostrando = false;
            },800);
        }
    },800);
}

function clickMem(valor){
    if(mostrando) return;

    inputUsuario.push(valor);

    let index = inputUsuario.length - 1;

    if(inputUsuario[index] !== secuenciaMem[index]){
        estado.calma++;
        cambiarPantalla(`<p>😅 casi…</p><button onclick="siguiente()">Seguir</button>`);
        return;
    }

    if(inputUsuario.length === secuenciaMem.length){
        if(secuenciaMem.length === 4){
            estado.amor++;
            cambiarPantalla(`<p>💛 recuerdas todo de mí</p><button onclick="siguiente()">Seguir</button>`);
        } else {
            inputUsuario = [];
            agregarPaso();
            mostrarSecuencia();
        }
    }
}


/* =========================
   PUZZLE 💛 (CON BOTÓN)
========================= */

let ordenActualPuzzle = 0;
const historia = [
    "Te pedi apuntes",
    "Nos conocimos",
    "Nos enamoramos",
    "Salimos",
    "Fui directo",
    "Seguimos juntos"
];

function miniPuzzlePro(){
    estado.acto++;

    cambiarPantalla(`
    ${progreso()}
    <p>Ordena nuestra historia 💛</p>
    <button onclick="empezarPuzzle()">Jugar</button>
    <div id="puzzle"></div>
    `);
}

function empezarPuzzle(){
    ordenActualPuzzle = 0;

    setTimeout(()=>{
        renderPuzzle();
    },300);
}

function renderPuzzle(){
    const cont = document.getElementById("puzzle");
    cont.innerHTML = "";

    let opciones = [...historia].sort(()=>Math.random()-0.5);

    opciones.forEach(texto=>{
        const btn = document.createElement("button");
        btn.textContent = texto;
        btn.onclick = ()=>clickPuzzle(texto);
        cont.appendChild(btn);
    });
}

function clickPuzzle(texto){
    if(texto === historia[ordenActualPuzzle]){
        ordenActualPuzzle++;

        if(ordenActualPuzzle === historia.length){
            estado.amor++;
            cambiarPantalla(`<p>💛 así exactamente pasó</p><button onclick="siguiente()">Seguir</button>`);
        }
    } else {
        estado.calma++;
        cambiarPantalla(`<p>😅 casi… pero seguimos escribiéndola</p><button onclick="siguiente()">Seguir</button>`);
    }
}


/* =========================
   LABERINTO 💛 (CON BOTÓN)
========================= */

let jugador = {x:1,y:1};

const mapa = [
[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,1,0,0,0,0,0,0,1],
[1,0,1,0,1,0,1,1,1,1,0,1],
[1,0,1,0,0,0,0,0,0,1,0,1],
[1,0,1,1,1,1,1,1,0,1,0,1],
[1,0,0,0,0,0,0,1,0,1,0,1],
[1,1,1,1,1,1,0,1,0,1,0,1],
[1,0,0,0,0,1,0,0,0,1,0,1],
[1,0,1,1,0,1,1,1,0,1,0,1],
[1,0,1,0,0,0,0,1,0,0,0,1],
[1,0,0,0,1,1,0,0,0,1,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1]
];

function miniLaberinto(){
    estado.acto++;

    cambiarPantalla(`
    ${progreso()}
    <p>Encuéntrame 💛</p>
    <button onclick="empezarLaberinto()">Jugar</button>
    <canvas id="maze" width="280" height="280"></canvas>
    `);
}

function empezarLaberinto(){
    jugador = {x:1,y:1};

    setTimeout(()=>{
        dibujarMapa();
        document.onkeydown = mover;
    },300);
}

function dibujarMapa(){
    const canvas = document.getElementById("maze");
    const ctx = canvas.getContext("2d");

    const size = 20;

    ctx.clearRect(0,0,280,280);

    for(let y=0;y<mapa.length;y++){
        for(let x=0;x<mapa[y].length;x++){

            if(mapa[y][x] === 1){
                ctx.fillStyle = "white";
                ctx.fillRect(x*size,y*size,size,size);
            }
        }
    }
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = size + "px Arial";
        ctx.fillText("💛", 10*size + size/2, 10*size + size/2);
        ctx.fillText("🙂", jugador.x*size + size/2, jugador.y*size + size/2);
}

function mover(e){
    let nx = jugador.x;
    let ny = jugador.y;

    if(e.key === "ArrowUp") ny--;
    if(e.key === "ArrowDown") ny++;
    if(e.key === "ArrowLeft") nx--;
    if(e.key === "ArrowRight") nx++;

    if(mapa[ny][nx] === 0){
        jugador.x = nx;
        jugador.y = ny;
    }

    dibujarMapa();

    if(jugador.x === 10 && jugador.y === 10){
        document.onkeydown = null;
        estado.amor++;
        cambiarPantalla(`<p>💛 me encontraste</p><button onclick="siguiente()">Seguir</button>`);
    }
}
