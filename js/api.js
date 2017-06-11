$(document).ready(function(){
"use strict";

//   $('#consultar').click(function(){
//      $.ajax({
//           method: "GET",
//           url: "http://web-unicen.herokuapp.com/api/thing/group/100",
//           dataType: "JSON",
//           success: function(datos){
//             console.log(datos);
//             let html = "<h2>Datos</h2>";
//             for (let i = 0; i < datos.information.length;i++) {
//               html = html + "<p>"+ datos.information[i].thing +"</p>";
//             }
//             $('.datos').append(html);
//           },
//           error: function(){
//             alert('error');
//           }
//         });
//     });
//
// });

$('#grabar').on("click", function(event){
  event.preventDefault();
  let articulo = $('.articuloNuevo').val();
  let numGrupo = $('.numGrupo').val();
  let objCarga = {
                  "group":numGrupo,
                  "thing":articulo
                  };
  console.log(objCarga);
  $.ajax(
    {
    "url":"http://web-unicen.herokuapp.com/api/thing",
    "method": "POST",
    "contentType": "application/json; charset=utf-8",
    "data": JSON.stringify(objCarga),
    "dataType": "JSON",
    "success": guardadoOk,
    "error": errorTransacc

  });
});

function guardadoOk(){
  alert("Transacción exitosa!!");
}

function errorTransacc(){
  alert("fallo la transacción");
}

function createTr(thing){
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  td.innerHTML = thing;
  tr.append(td);
  return tr
}
)};
// for (info of datos.information) {
  //  $('.tbody').append(createTr(info.thing));
// }
