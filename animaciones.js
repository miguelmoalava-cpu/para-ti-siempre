function latido(){
    document.body.style.transform = "scale(1.03)";
    setTimeout(()=>{
        document.body.style.transform = "scale(1)";
    },150);
}

function flash(color){
    const original = document.body.style.background;
    document.body.style.background = color;

    setTimeout(()=>{
        document.body.style.background = original;
    },200);
}