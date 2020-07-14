var image= document.getElementById("image");
var txt = document.getElementById("text");

image.addEventListener("mouseover", ()=>{
     image.style.background="#000000";
     image.style.opacity="0.3";
     txt.style.display = "inline-block";
});
image.addEventListener("mouseout", ()=>{
    image.style.opacity= "1.0";
    txt.style.display = "none";
});