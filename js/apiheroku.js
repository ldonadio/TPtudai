function getInformationByGroup(){
  event.preventDefault();
  let grupo = 101; //Se lo deja constante en el grupo de prueba $("#groupid").val();
  $.ajax({
     method: "GET",
     dataType: 'JSON',
     url: "https://web-unicen.herokuapp.com/api/thing/group/" + grupo,
     success: mostrarDatosLista,
     error:function(jqxml, status, errorThrown){
       console.log(errorThrown);
     }
  });
}

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

function guardarInformacion(){
  event.preventDefault();
  let grupo = 101; //grupo seleccionado de forma estatica antes estaba $("#grupo").val();
  let articulo = $("#articulo").val();
  let precio = $("#precio").val();
  let lugar = $("#lugar").val();
  //la estructura que debemos enviar es especifica de cada servicio que usemos
  //en este caso un hay que enviar un objeto con el numero de grupo y con lo que queramos guardarInformacion
  //thing puede ser un objeto JSON con tanta información como queramos (en este servicio)
  let info = {
      group: grupo,
      thing: {"articulo": articulo, "precio": precio, "lugar": lugar} //es un objeto JSON!
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

function mostrarDatosLista(resultData){
  let ultimosDiez = 10; //Muestra las ultimas diez lineas de datos cargados en el Server
  let html = "";
  for (let i = resultData.information.length-ultimosDiez; i < resultData.information.length; i++) {
    html += "<tr> <td>" + resultData.information[i].dateAdded + "</td>";
    html += "<td>" + resultData.information[i].thing['articulo'] + "</td>";
    html += "<td>" + resultData.information[i].thing['precio'] + "</td>";
    html += "<td>" + resultData.information[i].thing['lugar'] + "</td> </tr>";
 }
  $("#datos").html(html);
}

function CargaOK(resultData){
  $("#guardarAlert").removeClass("alert-danger")
  $("#guardarAlert").addClass("alert-success")
  //como le dimos dataType:"JSON" el resultData ya es un objeto
  //la estructura que devuelve es especifica de cada servicio que usemos
  $("#guardarAlert").html("Informacion guardada con fecha=" + resultData.information.dateAdded);
  getInformationByGroup();
  console.log(datos);
}
