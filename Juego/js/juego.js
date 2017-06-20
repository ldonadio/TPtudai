//Mi primer codigo en javascript
"use strict"

alert("Donadio esta programando cuidado!");

let ganado = 0;
let indice = 0;


function jugar() {
  //let opcion = document.getElementsByName("opcion").value;
let objeto = {
    "opcion":null,//Aca se almacena la opción tipeada por el usuario.
    "opciones_pc": ["piedra","papel","tijera"], //De aca lista la secuencia de elección de la PC.
    "opcion_pc":null, //Opcion actual seleccionada por la PC.
    "resultado":null, //Según el valor que tome es empate, ganado o perdido.
    "img_usuario":null,//Objeto para la imagen de la seleccion del usuario.
    "img_pc":null //Objeto para la imagen de la seleccion de la PC.
  };
  // let opcion = document.getElementById("opcion").value;
  // let opciones_pc = ["piedra","papel","tijera"];
  // let opcion_pc = opciones_pc[indice];
  // let resultado;
  // let img_usuario = document.getElementById("op_usuario");
  // let img_pc = document.getElementById("opcion_pc");
  objeto.img_usuario = document.getElementById("op_usuario");
  objeto.img_pc = document.getElementById("opcion_pc");
  objeto.opcion = document.getElementById("opcion").value;

  if (objeto.opciones_pc[indice] === objeto.opcion){
    console.log("Entro por igual");
    objeto.resultado = 0;<!--empate-->
  }
  else{
    console.log("Entro por distinto");
    switch (objeto.opcion) {
      case "piedra":
        if (objeto.opciones_pc[indice] === "tijera"){
          objeto.resultado = 1;<!--Gano usuario-->
        }
        else{
          objeto.resultado = 2;<!--Perdio usuario-->
        }
        break;
      case "tijera":
        if (objeto.opciones_pc[indice] === "papel"){
          objeto.resultado = 1;<!--Gano usuario-->
        }
        else{
          objeto.resultado = 2;<!--Perdio usuario-->
        }
        break;
      case "papel":
        if (objeto.opciones_pc[indice] === "piedra"){
          objeto.resultado = 1;<!--Gano usuario-->
        }
        else{
          objeto.resultado = 2;<!--Perdio usuario-->
        }
        break;
        default:
          alert("La palabra ingresada es incorrecta");

    }
 }

 switch (objeto.resultado) {
   case 0: alert("Empate declarado");
          ganado= 0;
          objeto.img_usuario.src = "images/"+objeto.opcion+".jpg";
          objeto.img_pc.src = "images/"+objeto.opciones_pc[indice]+".jpg";
          break;
   case 1: alert("Gano usted, hay revancha?");
          ganado= ganado +1;
          objeto.img_usuario.src = "images/"+objeto.opcion+".jpg";
          objeto.img_pc.src = "images/"+objeto.opciones_pc[indice]+".jpg";
          break;
   case 2: alert("Usted ha sido derrotado");
          ganado= 0;
          objeto.img_usuario.src = "images/"+objeto.opcion+".jpg";
          objeto.img_pc.src = "images/"+objeto.opciones_pc[indice]+".jpg";
          break;
  }
  if (ganado===3){
    alert("Felicitaciones me gano tres veces seguidas!!!")
    ganado= 0;
  }
  indice = indice +1;
  if (indice===3){
    indice = 0;
  }
}

let boton = document.getElementById("jugar");
boton.addEventListener('click',function(){jugar();});
