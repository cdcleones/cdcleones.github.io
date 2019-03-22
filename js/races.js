const MAXROWS = 10;

var arrAnios = [{"anio":2018,"activo":true},
				{"anio":2019,"activo":true}
			   ];

var anioSelected;
var arrSocios=[];
var arrConcursos=[];
var arrCarreras=[];

function dimeNombreSocio(sSocio){
  for (var i=0; i<arrSocios.length; i++){
	if (arrSocios[i].socio==sSocio){
	  return(arrSocios[i].nombre.toUpperCase());
	}
  }
}

function dimeNombreConcurso(sConcurso){
  for (var i=0; i<arrConcursos.length; i++){
	if (arrConcursos[i].codigo==sConcurso){
	  return(arrConcursos[i].nombre.toUpperCase());
	}
  }
}

function escribeAnios() {
  for (var i=0; i<arrAnios.length; i++){
	if (arrAnios[i].activo == true){
	  document.write("<button type='button' class='btn btn-lg btn-red enabled' id='btn" + arrAnios[i].anio +"'>" + arrAnios[i].anio + "</button>");
	}
	else {
	  document.write("<button type='button' class='btn btn-lg btn-red disabled' id='btn" + arrAnios[i].anio +"'>" + arrAnios[i].anio + "</button>");
	}
  }
}

function Procesar(anio){
  var html=$.parseHTML('<h3>Nacional '+anioSelected+'</h3>',true);
  var $clave = $("#infodate");
  $clave.empty();
  $clave.append(html);
  $clave=$('#nacional');
  $clave.empty();
  $clave=$('#regional');
  $clave.empty();
  $clave=$('#concursos');
  $clave.empty();
  html=$.parseHTML('<h3>Mejor paloma nacional '+anioSelected+'</h3><br>Sin datos',true);
  $clave=$('#divmejorpalomanacional');
  $clave.empty();
  $clave.append(html);
  html=$.parseHTML('<h3>Mejor paloma regional '+anioSelected+'</h3><br>Sin datos',true);
  $clave=$('#divmejorpalomaregional');
  $clave.empty();
  $clave.append(html);

  ProcesaAnio(anioSelected);

  $('#infoanio').show(); 
  $('#regional').hide(); 
  $('#nacional').show(); 
  $('#divmejorpalomanacional').hide();
  $('#divmejorpalomaregional').hide();
}

function ProcesaAnio(anio){
  arrSocios.length = 0;
  arrConcursos.length = 0;
  arrCarreras.length = 0;
  var req = $.getJSON('data/'+anio+'/socios.txt', function(datosSocios){
	req.done(function(response){
	  for (var i=0; i<datosSocios.length; i++){
		if (datosSocios[i].anio==anio){
		  var nuevo = {anio:datosSocios[i].anio,socio:datosSocios[i].socio,nombre:datosSocios[i].nombre,activo:datosSocios[i].activo};
		  arrSocios.push(nuevo);
		}
	  }
	  var req1 = $.getJSON('data/'+anio+'/concursos.txt', function(datosConcursos){
		req1.done(function(response){
		  for (var i=0; i<datosConcursos.length; i++){
			if (datosConcursos[i].anio==anio){
			  var nuevo = {anio:datosConcursos[i].anio,codigo:datosConcursos[i].codigo,nombre:datosConcursos[i].nombre,fenceste:datosConcursos[i].fenceste,fsuelta:datosConcursos[i].fsuelta,categoria:datosConcursos[i].categoria,fichero:'data/'+anio+'/'+datosConcursos[i].fichero,provincia:datosConcursos[i].provincia,hsuelta:datosConcursos[i].hsuelta,campeonato:datosConcursos[i].campeonato,colectivo:datosConcursos[i].colectivo,socios:datosConcursos[i].socios,encestadas:datosConcursos[i].encestadas,clasif:datosConcursos[i].clasif,noclasif:datosConcursos[i].noclasif,activo:datosConcursos[i].activo,km0:datosConcursos[i].km0,km1:datosConcursos[i].km1};
			  arrConcursos.push(nuevo);
			}
		  }
		  var req2 = $.getJSON('data/'+anio+'/carreras.txt', function(datosCarreras){
			req2.done(function(response){
			  for (var i=0; i<datosCarreras.length; i++){
				if (datosCarreras[i].anio==anio){
				  var nuevo = {anio:datosCarreras[i].anio,concurso:datosCarreras[i].concurso,pos:datosCarreras[i].pos,pais:datosCarreras[i].pais,anilla:datosCarreras[i].anilla,a1:datosCarreras[i].a1,a2:datosCarreras[i].a2,a3:datosCarreras[i].a3,socio:datosCarreras[i].socio,a4:datosCarreras[i].a4,a5:datosCarreras[i].a5,a6:datosCarreras[i].a6,a7:datosCarreras[i].a7,puntos:datosCarreras[i].puntos,a8:datosCarreras[i].a8};
				  arrCarreras.push(nuevo);
				}
			  }
			  var html=crearPodium(anio,true);
			  var $clave = $('#nacional');
			  $clave.empty();
			  $clave.append(html);
			  html=crearPodium(anio,false);
			  $clave = $('#regional');
			  $clave.empty();
			  $clave.append(html);
			  html=crearConcursos(anio);
			  $clave = $('#concursos');
			  $clave.empty();
			  $clave.append(html);
			  for (var i=0; i<arrConcursos.length; i++){
				$('#' + arrConcursos[i].codigo).hide();
			  }
			  /* Insertar de EXCEL los concursos */
			  /* 2017 */
			  
			  /* 2018 */
			  $('#btnLV1R8').click(function(){ if ($('#LV1R8').is (':hidden')){ $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LV1R8').show(); } else $('#LV1R8').hide(); });
			  $('#btnLV1N8').click(function(){ if ($('#LV1N8').is (':hidden')){ $('#LV1R8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LV1N8').show(); } else $('#LV1N8').hide(); });
			  $('#btnLV2R8').click(function(){ if ($('#LV2R8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LV2R8').show(); } else $('#LV2R8').hide(); });
			  $('#btnLV3R8').click(function(){ if ($('#LV3R8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LV3R8').show(); } else $('#LV3R8').hide(); });
			  $('#btnLJ1N8').click(function(){ if ($('#LJ1N8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LJ1N8').show(); } else $('#LJ1N8').hide(); });
			  $('#btnLMFN8').click(function(){ if ($('#LMFN8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LMFN8').show(); } else $('#LMFN8').hide(); });
			  $('#btnLJ2N8').click(function(){ if ($('#LJ2N8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LJ2N8').show(); } else $('#LJ2N8').hide(); });
			  $('#btnLV5R8').click(function(){ if ($('#LV5R8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LV5R8').show(); } else $('#LV5R8').hide(); });
			  $('#btnLF1N8').click(function(){ if ($('#LF1N8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LF1N8').show(); } else $('#LF1N8').hide(); });
			  $('#btnLF1R8').click(function(){ if ($('#LF1R8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LF1R8').show(); } else $('#LF1R8').hide(); });
			  $('#btnLF2R8').click(function(){ if ($('#LF2R8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LF2R8').show(); } else $('#LF2R8').hide(); });
			  $('#btnLF2N8').click(function(){ if ($('#LF2N8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LF2N8').show(); } else $('#LF2N8').hide(); });
			  $('#btnLG1R8').click(function(){ if ($('#LG1R8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LG1R8').show(); } else $('#LG1R8').hide(); });
			  $('#btnLG1N8').click(function(){ if ($('#LG1N8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG2N8').hide(); $('#LG2R8').hide(); $('#LG1N8').show(); } else $('#LG1N8').hide(); });
			  $('#btnLG2N8').click(function(){ if ($('#LG2N8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2R8').hide(); $('#LG2N8').show(); } else $('#LG2N8').hide(); });
			  $('#btnLG2R8').click(function(){ if ($('#LG2R8').is (':hidden')){ $('#LV1R8').hide(); $('#LV1N8').hide(); $('#LV2R8').hide(); $('#LV3R8').hide(); $('#LJ1N8').hide(); $('#LMFN8').hide(); $('#LJ2N8').hide(); $('#LV5R8').hide(); $('#LF1N8').hide(); $('#LF1R8').hide(); $('#LF2R8').hide(); $('#LF2N8').hide(); $('#LG1R8').hide(); $('#LG1N8').hide(); $('#LG2N8').hide(); $('#LG2R8').show(); } else $('#LG2R8').hide(); });
			  
			  /* 2019 */
			  $('#btnLV1R9').click(function(){ if ($('#LV1R9').is (':hidden')){ $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LV3R9').hide(); $('#LJ1N9').hide(); $('#LV4R9').hide(); $('#LV2N9').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LV1R9').show(); } else $('#LV1R9').hide(); });
			  $('#btnLV2R9').click(function(){ if ($('#LV2R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV1N9').hide(); $('#LV3R9').hide(); $('#LJ1N9').hide(); $('#LV4R9').hide(); $('#LV2N9').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LV2R9').show(); } else $('#LV2R9').hide(); });
			  $('#btnLV1N9').click(function(){ if ($('#LV1N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV3R9').hide(); $('#LJ1N9').hide(); $('#LV4R9').hide(); $('#LV2N9').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LV1N9').show(); } else $('#LV1N9').hide(); });
			  $('#btnLV3R9').click(function(){ if ($('#LV3R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV4R9').hide(); $('#LV2N9').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LV3R9').show(); } else $('#LV3R9').hide(); });
			  $('#btnLJ1N9').click(function(){ if ($('#LJ1N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LV2N9').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LJ1N9').show(); } else $('#LJ1N9').hide(); });
			  $('#btnLV4R9').click(function(){ if ($('#LV4R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LV3R9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LV4R9').show(); } else $('#LV4R9').hide(); });
			  $('#btnLV2N9').click(function(){ if ($('#LV2N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LV3R9').hide(); $('#LJ1N9').hide(); $('#LV4R9').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LV2N9').show(); } else $('#LV2N9').hide(); });
			  
			  /* 2020 */
			  
			  crearMejoresPalomasNacional();
			  crearMejoresPalomasRegional();
			});
		  });

		});
	  });
  
	});
  });

}

function crearPodium(anio,clave){
	arrSocios.sort(function (a, b){
	  return a.nombre.localeCompare(b.nombre);
	});

	var arrPuntos = [];
	for (var i=0; i<arrSocios.length; i++){
	  if ((arrSocios[i].anio==anio)&&(arrSocios[i].activo==true)){
		var nuevo = {socio:arrSocios[i].socio,nombre:arrSocios[i].nombre,puntosnacional:0.00,puntosregional:0.00};
		arrPuntos.push(nuevo);
	  }
	}
	for (var i=0;i<arrPuntos.length;i++){
	  for (var j=0;j<arrCarreras.length;j++){
		if ((arrPuntos[i].socio==arrCarreras[j].socio)&&(arrCarreras[j].anio == anio)){
		  if (arrCarreras[j].concurso.charAt(arrCarreras[j].concurso.length-2)=='N'){
			arrPuntos[i].puntosnacional += arrCarreras[j].puntos;
		  }
		  else{
			arrPuntos[i].puntosregional += arrCarreras[j].puntos;
		  }
		}
	  }
	}
	var htmlPuntos = "";
	if (clave==true){ //Nacional
	  arrPuntos.sort(function (a, b) {
		//return a.nombre.localeCompare(b.nombre);
		return b.puntosnacional - a.puntosnacional;
	  });
	  
	  htmlPuntos+="<table id='tablepodium" + anio +"' class='table table-striped'>";
	  htmlPuntos+="<thead><tr><th class='dcha'>Nº</th><th class='izqda'>Socio</th><th class='dcha'>Puntos</th></tr></thead>";
	  htmlPuntos+="<tbody>";
	  for (var i=0; i<arrPuntos.length; i++){
		htmlPuntos+="<tr>";
		htmlPuntos+="<th scope='row' class='dcha'>" + (i+1) +"</th>";
		htmlPuntos+="<td class='izda'>" + arrPuntos[i].nombre + "</td>";
		htmlPuntos+="<td class='dcha'>" + Number(arrPuntos[i].puntosnacional).toFixed(2) + "</td>";
		htmlPuntos+="</tr>";
	  }
	  htmlPuntos+="</tbody>";
	  htmlPuntos+="</table>";
	}
	else{ //regional
	  arrPuntos.sort(function (a, b) {
		//return a.nombre.localeCompare(b.nombre);
		return b.puntosregional - a.puntosregional;
	  });
	  htmlPuntos+="<table id='tablepodium'" + anio +" class='table table-striped'>";
	  htmlPuntos+="<thead><tr><th class='dcha'>Nº</th><th class='izqda'>Socio</th><th class='dcha'>Puntos</th></tr></thead>";
	  htmlPuntos+="<tbody>";
	  for (var i=0; i<arrPuntos.length; i++){
		htmlPuntos+="<tr>";
		htmlPuntos+="<th scope='row' class='dcha'>" + (i+1) +"</th>";
		htmlPuntos+="<td class='izda'>" + arrPuntos[i].nombre + "</td>";
		htmlPuntos+="<td class='dcha'>" + Number(arrPuntos[i].puntosregional).toFixed(2) + "</td>";
		htmlPuntos+="</tr>";
	  }
	  htmlPuntos+="</tbody>";
	  htmlPuntos+="</table>";
	}
  return htmlPuntos;
}

function crearConcursos(anio){
  var htmlConcursos="";
  for (var j=0; j<arrConcursos.length; j++){
	if (arrConcursos[j].anio == anio){
	  if (arrConcursos[j].activo){
		htmlConcursos+="<button type='button' class='btn btn-lg btn-block btn-red' id='btn" + arrConcursos[j].codigo + "'>" + arrConcursos[j].nombre + "</button>"
		htmlConcursos+="<div id='" + arrConcursos[j].codigo + "'>"; //concurso
		htmlConcursos+="<div class='table-responsive'>";
		htmlConcursos+="<div class='container-fluid infocarrera'>"; //infocarrera
		htmlConcursos+="<div class='row'>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>C&oacute;digo: " + arrConcursos[j].codigo + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Fecha enceste: " + arrConcursos[j].fenceste +"</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Categor&iacute;a: " + arrConcursos[j].categoria + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Clasificadas: " + arrConcursos[j].clasif + "</div>";
		htmlConcursos+="</div >";
		htmlConcursos+="<div class='row'>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Provincia: " + arrConcursos[j].provincia + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Encestadas: " + arrConcursos[j].encestadas + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Modalidad: " + arrConcursos[j].campeonato + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>No clasificadas: " + arrConcursos[j].noclasif + "</div>";
		htmlConcursos+="</div >";
		htmlConcursos+="<div class='row'>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'><abbr title='Distancia al palomar m&aacute;s cercano'>Km cerca:</abbr> " + arrConcursos[j].km0 + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Fecha suelta: " + arrConcursos[j].fsuelta +"</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Colectivo: " + arrConcursos[j].colectivo + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'><a target='_blank' href='" + arrConcursos[j].fichero + "'>Listado clasificadas</a></div>";
		htmlConcursos+="</div >";
		htmlConcursos+="<div class='row'>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'><abbr title='Distancia al palomar m&aacute;s lejano'>Km lejos:</abbr> " + arrConcursos[j].km1 + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Hora suelta: " + arrConcursos[j].hsuelta + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Socios: " + arrConcursos[j].socios + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>&nbsp;</div>";
		htmlConcursos+="</div >";
		
		htmlConcursos+="</div>"; //infocarrera

		htmlConcursos+="<table class='table table-striped'>";
		htmlConcursos+="<thead><tr><th>Nº</th><th>Pais</th><th>Anilla</th><th>O/Cl</th><th>D</th><th>ZIf</th><th>Socio</th><th>Hora</th><th>Dia</th><th>Dist</th><th>Veloc</th><th>Puntos</th><th>Coef</th></tr></thead>";
		htmlConcursos+="<tbody>";
		var m=0;
		for (var k=0; k<arrCarreras.length; k++){
		  if ((anio == arrConcursos[j].anio) && (arrConcursos[j].anio == arrCarreras[k].anio) && (arrConcursos[j].codigo == arrCarreras[k].concurso) && (m < MAXROWS)){
			htmlConcursos+="<tr><th scope='row' class='dcha'>" + arrCarreras[k].pos + "</th>";
			htmlConcursos+="<td>" + arrCarreras[k].pais + "</td>";
			htmlConcursos+="<td>" + arrCarreras[k].anilla + "</td>";
			htmlConcursos+="<td class='dcha'>" + arrCarreras[k].a1 + "</td>";
			htmlConcursos+="<td>" + arrCarreras[k].a2 + "</td>";
			htmlConcursos+="<td>" + arrCarreras[k].a3 + "</td>";
			htmlConcursos+="<td class='izda'>" + arrCarreras[k].socio +"</td>";
			htmlConcursos+="<td>" + arrCarreras[k].a4 +"</td>";
			htmlConcursos+="<td class='dcha'>" + arrCarreras[k].a5 + "</td>";
			htmlConcursos+="<td class='dcha'>" + arrCarreras[k].a6 + "</td>";
			htmlConcursos+="<td class='dcha'>" + arrCarreras[k].a7 + "</td>";
			htmlConcursos+="<td class='dcha'>" + arrCarreras[k].puntos +"</td>";
			htmlConcursos+="<td class='dcha'>" + arrCarreras[k].a8 +"</td></tr>";
			m = m+1;
		  }
		}
		htmlConcursos+="</tbody>";
		htmlConcursos+="</table>";

		htmlConcursos+="</div>";
		htmlConcursos+="</div>"; //concurso
	  }
	}
  }
  return htmlConcursos;
}

function crearMejoresPalomasNacional(){
  var arrPalomas = [];
  var encontrada;
  for (var i=0; i<arrCarreras.length; i++){
	encontrada=false;
	for (var j=0; j<arrPalomas.length; j++){
	  if (arrCarreras[i].anilla==arrPalomas[j].anilla){
		encontrada=true;
		break;
	  }
	}
	if (!encontrada){
	  if (arrCarreras[i].concurso.charAt(arrCarreras[i].concurso.length-2)=='N'){
		var nueva = {anilla:arrCarreras[i].anilla,pais:arrCarreras[i].pais,socio:arrCarreras[i].socio,misdatos:"<abbr title='"+dimeNombreConcurso(arrCarreras[i].concurso)+"'>"+arrCarreras[i].concurso+"</abbr>: "+arrCarreras[i].pos+"ª",puntos_nac:arrCarreras[i].puntos};
		arrPalomas.push(nueva);
	  }
	}
	else{
	  if (arrCarreras[i].concurso.charAt(arrCarreras[i].concurso.length-2)=='N'){
		arrPalomas[j].misdatos+=", "+"<abbr title='"+dimeNombreConcurso(arrCarreras[i].concurso)+"'>"+arrCarreras[i].concurso+"</abbr>: "+arrCarreras[i].pos+"ª";
		arrPalomas[j].puntos_nac+=arrCarreras[i].puntos;
	  }
	}
  }
  arrPalomas.sort(function (a, b) {
	return b.puntos_nac - a.puntos_nac;
  });
  
  var myTableDiv = document.getElementById("divmejorpalomanacional");
  
  var table = document.createElement('TABLE');
  table.id='mejorespalomasnacional';
  table.setAttribute("class", "display text-left");
  table.style='width:100%';
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(1);
  var cell4 = row.insertCell(1);
  var cell5 = row.insertCell(1);
  var cell6 = row.insertCell(1);
  cell1.innerHTML = "#";
  cell6.innerHTML = "País";
  cell5.innerHTML = "Anilla";
  cell4.innerHTML = "Nombre";
  cell3.innerHTML = "Posiciones";
  cell2.innerHTML = "Puntos";
  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);
  
  for (var i=0; i<arrPalomas.length; i++){
	var tr = document.createElement('TR');
	tableBody.appendChild(tr);
	for (var j=0; j<6; j++){
	  var td = document.createElement('TD');
	  switch(j) {
		case 0:
		  td.appendChild(document.createTextNode(i+1));
		  break;
		case 1:
		  td.appendChild(document.createTextNode(arrPalomas[i].pais));
		  break;
		case 2:
		  td.appendChild(document.createTextNode(arrPalomas[i].anilla));
		  break;
		case 3:
		  td.appendChild(document.createTextNode(dimeNombreSocio(arrPalomas[i].socio)));
		  break;
		case 4:
		  //td.appendChild(document.createTextNode(arrPalomas[i].misdatos));
		  td.id='posn'+i;
		  break;
		case 5:
		  td.appendChild(document.createTextNode(Number(arrPalomas[i].puntos_nac).toFixed(2)));
		  break;
	  } 
	  tr.appendChild(td);
	}
  }
  
  $('#divmejorpalomanacional').empty();
  var tituloh3=document.createElement("H3");
  tituloh3.appendChild(document.createTextNode("Mejor paloma nacional "+anioSelected));
  myTableDiv.appendChild(tituloh3);
  myTableDiv.appendChild(table);

  for (var i=0; i<arrPalomas.length; i++){
	var $mipos = $("#posn"+i);
	var html = $.parseHTML(arrPalomas[i].misdatos,true);
	$mipos.append(html);
  }
  
  $('#mejorespalomasnacional').DataTable( {
	retrieve: true,
	responsive: true,
	paging: true,
	"autoWidth": false,
	"language": {
		"emptyTable": "No hay datos disponibles en la tabla",
		"infoEmpty": "Mostrando 0 a 0 de 0 registros",
		"decimal": ",",
		"thousands": ".",
		"lengthMenu": "Mostrar _MENU_ registros por página",
		"search" : "Buscar",
		"paginate": {
			"first": "Primero",
			"last": "Último",
			"next": "Siguiente",
			"previous": "Anterior"
		},
		"info": "Mostrando página _PAGE_ de _PAGES_",
		"infoFiltered": "(Filtrando de un total de _MAX_ registros)"
	},
	columnDefs: [
		{ targets: [0,5], className: 'dt-body-right' }
	]
  } );

}

function crearMejoresPalomasRegional(){
  var arrPalomas = [];
  var encontrada;
  for (var i=0; i<arrCarreras.length; i++){
	encontrada=false;
	for (var j=0; j<arrPalomas.length; j++){
	  if (arrCarreras[i].anilla==arrPalomas[j].anilla){
		encontrada=true;
		break;
	  }
	}
	if (!encontrada){
	  if (arrCarreras[i].concurso.charAt(arrCarreras[i].concurso.length-2)!='N'){
		var nueva = {anilla:arrCarreras[i].anilla,pais:arrCarreras[i].pais,socio:arrCarreras[i].socio,misdatos:"<abbr title='"+dimeNombreConcurso(arrCarreras[i].concurso)+"'>"+arrCarreras[i].concurso+"</abbr>: "+arrCarreras[i].pos+"ª",puntos_nac:arrCarreras[i].puntos};
		arrPalomas.push(nueva);
	  }
	}
	else{
	  if (arrCarreras[i].concurso.charAt(arrCarreras[i].concurso.length-2)!='N'){
		arrPalomas[j].misdatos+=", "+"<abbr title='"+dimeNombreConcurso(arrCarreras[i].concurso)+"'>"+arrCarreras[i].concurso+"</abbr>: "+arrCarreras[i].pos+"ª";
		arrPalomas[j].puntos_nac+=arrCarreras[i].puntos;
	  }
	}
  }
  arrPalomas.sort(function (a, b) {
	return b.puntos_nac - a.puntos_nac;
  });
  
  var myTableDiv = document.getElementById("divmejorpalomaregional");
  
  var table = document.createElement('TABLE');
  table.id='mejorespalomasregional';
  table.setAttribute("class", "display text-left");
  table.style='width:100%';
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(1);
  var cell4 = row.insertCell(1);
  var cell5 = row.insertCell(1);
  var cell6 = row.insertCell(1);
  cell1.innerHTML = "#";
  cell6.innerHTML = "País";
  cell5.innerHTML = "Anilla";
  cell4.innerHTML = "Nombre";
  cell3.innerHTML = "Posiciones";
  cell2.innerHTML = "Puntos";
  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);
  
  for (var i=0; i<arrPalomas.length; i++){
	var tr = document.createElement('TR');
	tableBody.appendChild(tr);
	for (var j=0; j<6; j++){
	  var td = document.createElement('TD');
	  switch(j) {
		case 0:
		  td.appendChild(document.createTextNode(i+1));
		  break;
		case 1:
		  td.appendChild(document.createTextNode(arrPalomas[i].pais));
		  break;
		case 2:
		  td.appendChild(document.createTextNode(arrPalomas[i].anilla));
		  break;
		case 3:
		  td.appendChild(document.createTextNode(dimeNombreSocio(arrPalomas[i].socio)));
		  break;
		case 4:
		  //td.appendChild(document.createTextNode(arrPalomas[i].misdatos));
		  td.id='posr'+i;
		  break;
		case 5:
		  td.appendChild(document.createTextNode(Number(arrPalomas[i].puntos_nac).toFixed(2)));
		  break;
	  } 
	  tr.appendChild(td);
	}
  }
  
  $('#divmejorpalomaregional').empty();
  var tituloh3=document.createElement("H3");
  tituloh3.appendChild(document.createTextNode("Mejor paloma regional "+anioSelected));
  myTableDiv.appendChild(tituloh3);
  myTableDiv.appendChild(table);

  for (var i=0; i<arrPalomas.length; i++){
	var $mipos = $("#posr"+i);
	var html = $.parseHTML(arrPalomas[i].misdatos,true);
	$mipos.append(html);
  }
  
  $('#mejorespalomasregional').DataTable( {
	retrieve: true,
	responsive: true,
	paging: true,
	"autoWidth": false,
	"language": {
		"emptyTable": "No hay datos disponibles en la tabla",
		"infoEmpty": "Mostrando 0 a 0 de 0 registros",
		"decimal": ",",
		"thousands": ".",
		"lengthMenu": "Mostrar _MENU_ registros por página",
		"search" : "Buscar",
		"paginate": {
			"first": "Primero",
			"last": "Último",
			"next": "Siguiente",
			"previous": "Anterior"
		},
		"info": "Mostrando página _PAGE_ de _PAGES_",
		"infoFiltered": "(Filtrando de un total de _MAX_ registros)"
	},
	columnDefs: [
		{ targets: [0,5], className: 'dt-body-right' }
	]
  } );

}


