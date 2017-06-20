$(document).ready(function(){
"use strict";

alert("Donadio esta programando cuidado!");

class Jugador {
  constructor(nombre) {
    this.nombre= nombre; //Se puede llamar variable igual que la clase?
    this.credito=100;
    this.part_ganadas=0;
    }
  darNombre(nom_nuevo){
    this.nombre= nom_nuevo;
  }
  restarCredito(){
    this.credito = this.credito-5;
  }
  sumarCredito(){
    this.credito = this.credito+10;
  }
  ValidarOpcion(opcion){
    let valida = 0;
    switch (opcion) {
      case "piedra": valida = 1;
            break;
      case "papel": valida = 1;
            break;
      case "tijera": valida = 1;
            break;
      case "lagarto": valida = 1;
            break;
      case "spock": valida = 1;
            break;
      default: alert("LA OPCION INGRESADA NO ES VALIDA");
    }
    return valida;
  }
}

class maquina {
  constructor(){
    this.part_ganadas=0;
  }
  OpcionPartida(){
    let opciones_maq = ["piedra","papel","tijera","lagarto","spock"];
    let i = Math.floor((Math.random() *4) + 1);//Selecciona al azar indice
    return opciones_maq[i];
  }
}

class Partida {
  constructor(){
    //this.resultado = 0;
  }
  evaluarJuego(opcion1,opcion2){
    let resultado;
    if (opcion1===opcion2){
      resultado = 0;
      }
    else{
      switch (opcion1) {
        case "piedra":
            resultado = (opcion2 === "papel" || opcion2 === "spock") ? 1 : 2; //1 pierde opcion1, 2 gana opcion1
            break;
        case "papel":
            resultado = (opcion2 === "tijera" || opcion2 === "lagarto") ? 1 : 2;
            break;
        case "tijera":
            resultado = (opcion2 === "piedra" || opcion2 === "spock") ? 1 : 2;
            break;
        case "lagarto":
            resultado = (opcion2 === "piedra" || opcion2 === "tijera") ? 1 : 2;
            break;
        case "spock":
            resultado = (opcion2 === "papel" || opcion2 === "lagarto") ? 1 : 2;
            break;
        default:
        }
      }
      return resultado;
  }
  }
class Torneo {
  constructor(){
    this.cant_partidas_jugadas = 0;
    this.part_ganadas_Humano = 0;
    this.part_ganadas_maquina = 0;
    this.gano_anterior_H = 0;
    this.gano_anterior_M = 0;
  }
  asignarModo(modo){
    this.modo = modo;
  }
  asignarNroPartidas(numero){
    this.cant_partidas = numero;
  }
  incrementarGanoHum(){
    if (this.modo==='Simple'){
      this.part_ganadas_Humano = this.part_ganadas_Humano+1;
    }
    else{
      if (this.gano_anterior_H===1){
        this.part_ganadas_Humano = this.part_ganadas_Humano+1;
      }
      this.gano_anterior_H = 1;
      this.gano_anterior_M = 0;
      }
  }
  incrementarGanoMaq(){
    if (this.modo==='Simple'){
      this.part_ganadas_maquina = this.part_ganadas_maquina+1;
    }
    else{
      if (this.gano_anterior_M===1){
        this.part_ganadas_maquina = this.part_ganadas_maquina+1;
      }
      this.gano_anterior_H = 0 ;
      this.gano_anterior_M = 1;
    }

  }
  evaluarTorneo(){
    if ((this.cant_partidas === this.part_ganadas_Humano + this.part_ganadas_maquina) && (this.cant_partidas!==0)){
      if (this.part_ganadas_Humano===this.part_ganadas_maquina){
        alert("TORNEO EMPATADO");
      }
      if (this.part_ganadas_Humano>this.part_ganadas_maquina){
        alert("TONEO GANADO");
      }
      if (this.part_ganadas_Humano<this.part_ganadas_maquina){
        alert("TONEO PERDIDO");
      }
      this.part_ganadas_Humano = 0;
      this.part_ganadas_maquina = 0;
    }
  }
}


//Inicio del Juego

let Maquina1 = new maquina();
let Jugador1 = new Jugador();
let Partida1 = new Partida();
let Torneo1 = new Torneo();


$("#comenzar").on("click",function () {
  event.preventDefault();
  let nro_partidas = Number($("#cant_partidas").val());
  Torneo1.asignarNroPartidas(nro_partidas);
  if ($("input[name=selec]:checked").val()==='Simple'){
    Torneo1.asignarModo('Simple');
  }
  if ($("input[name=selec]:checked").val()==='MejorDe3'){
    Torneo1.asignarModo('MejorDe3');
  }
  let html ="<form>Ingrese su opción de juego: <input type='text' id='opcion' value=''></form>";
      html += "<table><tr><img id='op_usuario' src='imagenes/signo.jpg' alt=''></img>";
      html +="<button id = 'jugar'>Jugar</button>";
      html +="<img id='opcion_pc' src='imagenes/signo.jpg' alt=''></img></tr></table>";
      html +="<table clase='tablero'><tr><td>Partidas jugadas</td><td>Partidas ganadas</td><td>Credito</td></tr>";
      html +="<tr><td id='Partidas-jugadas'>X</td><td id='Partidas-ganadas'>X</td><td id='Credito'>X</td></tr></table>";
  $(".htmldinamico").html(html);
  $("#jugar").on("click",function(){
      event.preventDefault();
        if (Jugador1.ValidarOpcion($("#opcion").val())){
            let op_maq = Maquina1.OpcionPartida();
            let op_humano = $("#opcion").val();
            let caso = Partida1.evaluarJuego(op_humano,op_maq);
            switch (caso) {
                case 0:
                    alert("EMPATE!!");
                    break;
                case 1:
                    alert("PERDIO!!");
                    Torneo1.incrementarGanoMaq();
                    Jugador1.restarCredito();
                    break;
                case 2:
                    alert("GANO!!");
                    Torneo1.incrementarGanoHum();
                    Jugador1.sumarCredito();
                    break;
                  default:
              }
                Torneo1.cant_partidas_jugadas +=1;
                $("#Partidas-jugadas").html(Torneo1.cant_partidas_jugadas);
                $("#Partidas-ganadas").html(Torneo1.part_ganadas_Humano);
                $("#Credito").html(Jugador1.credito);
                Torneo1.evaluarTorneo();


            }
          });
})

});//Fin document ready
