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
   FLAPPY LOVE 💛
========================= */

let birdY, velocity, gravity;
let obstaculos = [];
let puntos = 0;
let gameLoop;
let jugando = false;

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
    gravity = 0.5;

    obstaculos = [];
    puntos = 0;
    jugando = true;

    /* CONTROLES */
    document.onclick = saltar;
    document.onkeydown = (e) => {
        if(e.code === "Space") saltar();
    };

    function saltar(){
        velocity = -7;
    }

    /* CREAR OBSTÁCULOS */
    function crearObstaculo(){
        obstaculos.push({
            x: 300,
            gapY: Math.random()*200 + 50
        });
    }

    setInterval(() => {
        if(jugando) crearObstaculo();
    }, 1500);

    /* LOOP PRINCIPAL */
    function loop(){
        ctx.clearRect(0,0,300,400);

        /* FÍSICA */
        velocity += gravity;
        birdY += velocity;

        /* CORAZÓN */
        ctx.font = "20px Arial";
        ctx.fillText("💛", 140, birdY);

        /* OBSTÁCULOS */
        obstaculos.forEach(o => {

            /* DIBUJO */
            ctx.fillStyle = "white";
            ctx.fillRect(o.x, 0, 40, o.gapY);
            ctx.fillRect(o.x, o.gapY + 100, 40, 400);

            /* MOVIMIENTO */
            o.x -= 2;

            /* COLISIÓN */
            if(
                140 < o.x + 40 &&
                160 > o.x &&
                (birdY < o.gapY || birdY > o.gapY + 100)
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
    } else {
        estado.calma++;
        cambiarPantalla(`
        <p>😅 a veces se cae… pero lo levantamos juntos</p>
        <button onclick="siguiente()">Seguir</button>
        `);
    }
}