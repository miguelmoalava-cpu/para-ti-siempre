let estado = {
    acto: 1,
    amor: 0,
    apoyo: 0,
    alegria: 0,
    calma: 0
};

const app = document.getElementById("app");

/* UTILIDADES */
function fondo(color) {
    document.body.style.background = color;
}

function cambiarPantalla(html){
    app.style.opacity = 0;
    setTimeout(()=>{
        app.innerHTML = html;
        app.style.opacity = 1;
    },300);
}

function progreso(){
    return `<div style="
        width:100%;
        height:6px;
        background:rgba(255,255,255,0.2);
        border-radius:10px;
        margin-bottom:15px;
    ">
        <div style="
            width:${(estado.acto-1)*10}%;
            height:100%;
            background:white;
            border-radius:10px;
        "></div>
    </div>`;
}

function sumar(tipo, color) {
    estado[tipo]++;
    fondo(color);
    estado.acto++;
    siguiente();
}

function continuar(){
    siguiente();
}

/* INICIO */
function inicio(){
    fondo("#ffe082");

    cambiarPantalla(`
    <h2>💛</h2>
    <p>
    Hice esto para ti…<br><br>
    puedes abrirlo cuando me necesites
    </p>
    <button onclick="siguiente()">Entrar</button>
    `);
}

/* CONTROL */
function siguiente() {
    const a = estado.acto;

    if (a === 1) acto1();
    else if (a === 2) acto2();
    else if (a === 3) mini1();
    else if (a === 4) acto4();
    else if (a === 5) acto5();
    else if (a === 6) miniFlappyReal();
    else if (a === 7) miniDecision();
    else if (a === 8) mini2();
    else if (a === 9) acto7();
    else if (a === 10) acto8();
    else if (a === 11) acto9();
    else if (a === 12) final();
}

/* ACTO 1 */
function acto1(){
cambiarPantalla(`
${progreso()}
<h2>💛</h2>
<p>¿Por qué abriste esto mi amor?</p>
<button onclick="sumar('amor','#f8bbd0')">Te extraño</button>
<button onclick="sumar('alegria','#ffe082')">Estoy aburrida</button>
<button onclick="sumar('calma','#64b5f6')">¿que no puedo?</button>
`);
}

/* ACTO 2 */
function acto2(){
cambiarPantalla(`
${progreso()}
<p>¿Qué es lo que necesitas ahora mi amor?</p>
<button onclick="sumar('amor','#f8bbd0')">Un abrazo</button>
<button onclick="sumar('apoyo','#66bb6a')">Que te escuchen</button>
<button onclick="sumar('alegria','#ffe082')">Distraerte</button>
`);
}

/* MINI JUEGO 1 */
function mini1(){
    estado.acto++;

    cambiarPantalla(`
    ${progreso()}
    <p>¿Qué te recuerda más a mí? 💭</p>
    <button onclick="mini1Res('bosque')">🌳 El bosque</button>
    <button onclick="mini1Res('risa')">😄 Tu risa</button>
    <button onclick="mini1Res('abrazo')">🤍 Un abrazo</button>
    `);
}

function mini1Res(tipo){

if(tipo === "bosque"){
    estado.amor++;
    fondo("#f8bbd0");

    cambiarPantalla(`
    <p>
    A mí también me recuerda a ti…<br><br>
    esos momentos caminando juntos,<br>
    donde todo se sentía más bonito
    </p>
    <button onclick="siguiente()">Seguir</button>
    `);
}

if(tipo === "risa"){
    estado.alegria++;
    fondo("#ffe082");

    cambiarPantalla(`
    <p>
    Tu risa es de mis cosas favoritas…<br><br>
    podría escucharla todo el día
    </p>
    <button onclick="siguiente()">Seguir</button>
    `);
}

if(tipo === "abrazo"){
    estado.calma++;
    fondo("#64b5f6");

    cambiarPantalla(`
    <p>
    Un abrazo tuyo…<br><br>
    es de los lugares donde más tranquilo me siento
    </p>
    <button onclick="siguiente()">Seguir</button>
    `);
}
}

/* ACTO 4 */
function acto4(){
cambiarPantalla(`
${progreso()}
<p>¿Qué prefieres recordar en este momento?</p>
<button onclick="recuerdo('bonito')">Un momento bonito</button>
<button onclick="recuerdo('tranquilo')">Algo tranquilo</button>
<button onclick="recuerdo('risa')">Una risa</button>
`);
}

function recuerdo(tipo){

if(tipo === "bonito"){
    estado.amor++;
    latido();
    fondo("#f8bbd0");

    cambiarPantalla(`
    <p>
    ¿Recuerdas cuando caminábamos en el bosque al terminar las clases…?<br><br>
    hablar, besarnos cada 20 metros…<br><br>
    o reírnos por nuestra esquizofrenia de pareja<br><br>
    te amo bb 💛
    </p>
    <button onclick="continuar()">Seguir</button>
    `);
}

if(tipo === "tranquilo"){
    estado.calma++;
    fondo("#64b5f6");

    cambiarPantalla(`
    <p>
    ¿Recuerdas cuando me dormía en tu regazo…?<br><br>
    nadie decía nada,<br>
    pero estábamos juntos
    </p>
    <button onclick="continuar()">Seguir</button>
    `);
}

if(tipo === "risa"){
    estado.alegria++;
    fondo("#ffe082");

    cambiarPantalla(`
    <p>
    ¿Te acuerdas cuando estornudé y salté al mismo tiempo? 😂<br><br>
    parecía Mario JASJAS 🍄
    </p>
    <button onclick="continuar()">Seguir</button>
    `);
}

estado.acto++;
}

/* ACTO 5 */
function acto5(){
cambiarPantalla(`
${progreso()}
<p>¿Qué soy para ti ahora?</p>
<button onclick="sumar('alegria','#ffe082')">Alguien que te hace feliz</button>
<button onclick="sumar('calma','#64b5f6')">Alguien que te calma</button>
<button onclick="sumar('amor','#f8bbd0')">Alguien que te importa</button>
`);
}

/* MINI JUEGO 2 */
let secuencia = [];
let paso = 0;

function mini2(){
    estado.acto++;
    secuencia = generarSecuencia();
    paso = 0;

    cambiarPantalla(`
    ${progreso()}
    <p>Mira esta secuencia 👀</p>
    <h2>${secuencia.join(" ")}</h2>
    <button onclick="jugarMemoria()">Continuar</button>
    `);
}

function generarSecuencia(){
    const opciones = ["🌸","🌼","🌙"];
    let arr = [];
    for(let i=0;i<3;i++){
        arr.push(opciones[Math.floor(Math.random()*3)]);
    }
    return arr;
}

function jugarMemoria(){
    cambiarPantalla(`
    ${progreso()}
    <p>Repite la secuencia</p>
    <div id="opciones"></div>
    `);

    setTimeout(() => {
        const cont = document.getElementById("opciones");

        ["🌸","🌼","🌙"].forEach(e => {
            const b = document.createElement("button");
            b.textContent = e;
            b.onclick = () => verificar(e);
            cont.appendChild(b);
        });
    }, 350);
}

function verificar(eleccion){
    if(eleccion === secuencia[paso]){
        paso++;
        if(paso === secuencia.length){
            estado.amor++;
            fondo("#f8bbd0");
            cambiarPantalla(`<p>💛 Lo hiciste perfecto</p><button onclick="siguiente()">Continuar</button>`);
        }
    } else {
        estado.calma++;
        fondo("#64b5f6");
        cambiarPantalla(`<p>😅 casi… pero igual me encantas</p><button onclick="siguiente()">Continuar</button>`);
    }
}

/* ACTOS FINALES */
function acto7(){
cambiarPantalla(`
${progreso()}
<p>Si pudieras decirme algo ahora…</p>
<button onclick="sumar('amor','#f8bbd0')">Te extraño</button>
<button onclick="sumar('apoyo','#66bb6a')">Quédate</button>
<button onclick="sumar('calma','#64b5f6')">Gracias</button>
`);
}

function acto8(){
cambiarPantalla(`
${progreso()}
<p>Si estuviéramos juntos ahora…</p>
<button onclick="sumar('amor','#f8bbd0')">Abrazados</button>
<button onclick="sumar('calma','#64b5f6')">Hablando</button>
<button onclick="sumar('alegria','#ffe082')">Riendo</button>
`);
}

function acto9(){
cambiarPantalla(`
${progreso()}
<p>¿Qué quieres de mí?</p>
<button onclick="sumar('amor','#f8bbd0')">Que esté contigo</button>
<button onclick="sumar('alegria','#ffe082')">Que te haga feliz</button>
<button onclick="sumar('apoyo','#66bb6a')">Que no me vaya</button>
`);
}

/* FINAL */
function final(){
let max = Math.max(estado.amor,estado.apoyo,estado.alegria,estado.calma);

if(max===estado.amor){
fondo("#f8bbd0");
cambiarPantalla(`<h2>💗 Yo también te extraño… más de lo que digo 💛</h2>`);
}
else if(max===estado.apoyo){
fondo("#66bb6a");
cambiarPantalla(`<h2>💚 Siempre voy a estar para ti</h2>`);
}
else if(max===estado.alegria){
fondo("#ffe082");
cambiarPantalla(`<h2>💛 Me encanta hacerte feliz</h2>`);
}
else{
fondo("#64b5f6");
cambiarPantalla(`<h2>💙 Contigo todo se siente en calma</h2>`);
}
}

/* START */
inicio();