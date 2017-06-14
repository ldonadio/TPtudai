$( document ).ready(function() {
"use strict";

//cargaDatosInicial();

$("#guardar-info-rapida").on("click", function(){
  event.preventDefault();
  let ItemsInicio = 3;
  cargaDatosInicial(ItemsInicio);
})

function cargaDatosInicial(Items){
 for (var i = 0; i < Items; i++) {
   let articulo = {cosa: "Pera"};
   let precio = {costo: 123+i};
   let lugar = {sitio: "Mercado"};
   GuardarInformacion(articulo,precio,lugar);
 };
 }


$("#obtener-info").on("click", function(){
  event.preventDefault();
  let cantFilas = 8;
  TraerInfoGrupo(cantFilas);
});

function TraerInfoGrupo(filas){
  //event.preventDefault(); //Consultar porque inhabilita la carga de la tabla inicial?????????????????
    let grupo = 101; //Se lo deja constante en el grupo de prueba $("#groupid").val();
    $.ajax({
       method: "GET",
       dataType: 'JSON',
       url: "https://web-unicen.herokuapp.com/api/thing/group/" + grupo,
       success: function(data) {mostrarDatosLista(data, filas)},
       error:function(jqxml, status, errorThrown){
         console.log(errorThrown);
       }
    });
    $("#datos").html("Cargando..");
  };

$("#guardar-info").on("click", function(){
    event.preventDefault();
    let articulo = {cosa: $("#articulo").val()};
    let precio = {costo: $("#precio").val()};
    let lugar = {sitio: $("#lugar").val()};
    GuardarInformacion(articulo,precio,lugar);
});

function GuardarInformacion(articulo,precio,lugar){
//  event.preventDefault();
  let grupo = 101; //grupo seleccionado de forma estatica antes estaba $("#grupo").val();
  // let articulo = $("#articulo").val();
  // let precio = $("#precio").val();
  // let lugar = $("#lugar").val();
  let info = { //thing puede ser un objeto JSON con tanta información como queramos (en este servicio)
      group: grupo,
      thing: {"articulo": articulo.cosa, "precio": precio.costo, "lugar": lugar.sitio} //es un objeto JSON!
      };
  if (grupo && articulo && precio){ //lugar considero que puede ser vacio
    $.ajax({
       method: "POST",
       dataType: 'JSON',
       //se debe serializar (stringify) la informacion (el "data:" de ida es de tipo string)
       data: JSON.stringify(info),
       contentType: "application/json; charset=utf-8",
       url: "https://web-unicen.herokuapp.com/api/thing",
       success: CargaOK,
       error:function(jqxml, status, errorThrown){
         console.log(errorThrown);
         $("#guardarAlert").addClass("alert-danger")
         $("#guardarAlert").html("Error por favor intente mas tarde");
       }
    });
  }
  else
  {
    $("#guardarAlert").addClass("alert-danger")
    $("#guardarAlert").html("Grupo e Informacion son campos requeridos");
  }
}

function mostrarDatosLista(data, filas){
  let ultimosItems = filas; //Muestra las ultimas XX lineas de datos cargados en el Server
  let html = ""; //HTML dinamico que se carga con los datos traidos en resultData
  for (let i = data.information.length-ultimosItems; i < data.information.length; i++) {
    html += "<tr> <td>" + data.information[i].dateAdded + "</td>";
    html += "<td>" + data.information[i].thing['articulo'] + "</td>";
    html += "<td>" + data.information[i].thing['precio'] + "</td>";
    html += "<td>" + data.information[i].thing['lugar'] + "</td> </tr>";
 }
  $("#datos").html(html);
}

function CargaOK(resultData){
  let filas = 3;
  $("#guardarAlert").removeClass("alert-danger")
  $("#guardarAlert").addClass("alert-success")
  //como le dimos dataType:"JSON" el resultData ya es un objeto
  //la estructura que devuelve es especifica de cada servicio que usemos
  $("#guardarAlert").html("Informacion guardada con fecha=" + resultData.information.dateAdded);
  TraerInfoGrupo(filas);
  console.log(datos);
}



});//cierre Document.ready
// function getInformationByItem(){
//   event.preventDefault();
//   let item = $("#itemid").val();
//   $.ajax({
//      method: "GET",
//      dataType: 'JSON',
//      //si la info va en la URL o se pasa por "data" depende del servicio
//      url: "https://web-unicen.herokuapp.com/api/thing/" + item,
//      success: function(resultData){
//        //al decir que dataType es JSON, ya resultData es un objeto
//        let html = "";
//        html += "Id: " + resultData.information['_id'] + "<br />";
//        html += "Grupo: " + resultData.information['group'] + "<br />";
//        html += "Informacion: " + resultData.information['thing'] + "<br />";
//        html += "--------------------- </br>";
//        $("#infoItem").html(html);
//      },
//      error:function(jqxml, status, errorThrown){
//        console.log(errorThrown);
//      }
//
//   });
// }
