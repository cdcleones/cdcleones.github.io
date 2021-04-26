const MAXROWS = 10;

var arrAnios = [{"anio":2016,"activo":true},
				{"anio":2017,"activo":true},
				{"anio":2018,"activo":true},
				{"anio":2019,"activo":true},
				{"anio":2021,"activo":true}
			   ];

var anioSelected;
var arrSocios=[];
var arrConcursos=[];
var arrCarreras=[];
var arrAnillas=[];

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
  var html=$.parseHTML('<h3>Nacional '+anio+'</h3>',true);
  var $clave = $("#infodate");
  $clave.empty();
  $clave.append(html);
  $clave=$('#nacional');
  $clave.empty();
  $clave=$('#regional');
  $clave.empty();
  $clave=$('#concursos');
  $clave.empty();
  html=$.parseHTML('<h3>Mejor paloma nacional '+anio+'</h3><br>Sin datos',true);
  $clave=$('#divmejorpalomanacional');
  $clave.empty();
  $clave.append(html);
  html=$.parseHTML('<h3>Mejor paloma regional '+anio+'</h3><br>Sin datos',true);
  $clave=$('#divmejorpalomaregional');
  $clave.empty();
  $clave.append(html);

  ProcesaAnio(anio);

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
		  var nuevo = {anio:datosSocios[i].anio,club:datosSocios[i].club,socio:datosSocios[i].socio,nombre:datosSocios[i].nombre,activo:datosSocios[i].activo};
		  arrSocios.push(nuevo);
		}
	  }
	  var req1 = $.getJSON('data/'+anio+'/concursos.txt', function(datosConcursos){
		req1.done(function(response){
		  for (var i=0; i<datosConcursos.length; i++){
			if (datosConcursos[i].anio==anio){
			  var nuevo1 = {anio:datosConcursos[i].anio,club:datosConcursos[i].club,codigo:datosConcursos[i].codigo,nombre:datosConcursos[i].nombre,fenceste:datosConcursos[i].fenceste,fsuelta:datosConcursos[i].fsuelta,categoria:datosConcursos[i].categoria,fichero:'data/'+anio+'/'+datosConcursos[i].fichero,provincia:datosConcursos[i].provincia,hsuelta:datosConcursos[i].hsuelta,campeonato:datosConcursos[i].campeonato,colectivo:datosConcursos[i].colectivo,socios:datosConcursos[i].socios,encestadas:datosConcursos[i].encestadas,clasif:datosConcursos[i].clasif,noclasif:datosConcursos[i].noclasif,km0:datosConcursos[i].km0,km1:datosConcursos[i].km1,activo:datosConcursos[i].activo};
			  arrConcursos.push(nuevo1);
			}
		  }
		  var req2 = $.getJSON('data/'+anio+'/carreras.txt', function(datosCarreras){
			req2.done(function(response){
			  for (var i=0; i<datosCarreras.length; i++){
				if (datosCarreras[i].anio==anio){
				  var nuevo2 = {anio:datosCarreras[i].anio,club:datosCarreras[i].club,concurso:datosCarreras[i].concurso,pos:datosCarreras[i].pos,pais:datosCarreras[i].pais,anilla:datosCarreras[i].anilla,a1:datosCarreras[i].a1,a2:datosCarreras[i].a2,a3:datosCarreras[i].a3,socio:datosCarreras[i].socio,a4:datosCarreras[i].a4,a5:datosCarreras[i].a5,a6:datosCarreras[i].a6,a7:datosCarreras[i].a7,puntos:datosCarreras[i].puntos,a8:datosCarreras[i].a8};
				  arrCarreras.push(nuevo2);
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
			  /* 2016 */
			  $('#btnLV1R6').click(function(){ if ($('#LV1R6').is (':hidden')){ $('#LV2R6').hide(); $('#LVN6').hide(); $('#LMFN6').hide(); $('#LMFR6').hide(); $('#LF1N6').hide(); $('#LF1R6').hide(); $('#LJN6').hide(); $('#LJR6').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LV1R6').show(); } else $('#LV1R6').hide(); });
			  $('#btnLV2R6').click(function(){ if ($('#LV2R6').is (':hidden')){ $('#LV1R6').hide(); $('#LVN6').hide(); $('#LMFN6').hide(); $('#LMFR6').hide(); $('#LF1N6').hide(); $('#LF1R6').hide(); $('#LJN6').hide(); $('#LJR6').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LV2R6').show(); } else $('#LV2R6').hide(); });
			  $('#btnLVN6').click(function(){ if ($('#LVN6').is (':hidden')){ $('#LV1R6').hide(); $('#LV2R6').hide(); $('#LMFN6').hide(); $('#LMFR6').hide(); $('#LF1N6').hide(); $('#LF1R6').hide(); $('#LJN6').hide(); $('#LJR6').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LVN6').show(); } else $('#LVN6').hide(); });
			  $('#btnLMFN6').click(function(){ if ($('#LMFN6').is (':hidden')){ $('#LV1R6').hide(); $('#LV2R6').hide(); $('#LVN6').hide(); $('#LMFR6').hide(); $('#LF1N6').hide(); $('#LF1R6').hide(); $('#LJN6').hide(); $('#LJR6').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LMFN6').show(); } else $('#LMFN6').hide(); });
			  $('#btnLMFR6').click(function(){ if ($('#LMFR6').is (':hidden')){ $('#LV1R6').hide(); $('#LV2R6').hide(); $('#LVN6').hide(); $('#LMFN6').hide(); $('#LF1N6').hide(); $('#LF1R6').hide(); $('#LJN6').hide(); $('#LJR6').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LMFR6').show(); } else $('#LMFR6').hide(); });
			  $('#btnLF1N6').click(function(){ if ($('#LF1N6').is (':hidden')){ $('#LV1R6').hide(); $('#LV2R6').hide(); $('#LVN6').hide(); $('#LMFN6').hide(); $('#LMFR6').hide(); $('#LF1R6').hide(); $('#LJN6').hide(); $('#LJR6').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LF1N6').show(); } else $('#LF1N6').hide(); });
			  $('#btnLF1R6').click(function(){ if ($('#LF1R6').is (':hidden')){ $('#LV1R6').hide(); $('#LV2R6').hide(); $('#LVN6').hide(); $('#LMFN6').hide(); $('#LMFR6').hide(); $('#LF1N6').hide(); $('#LJN6').hide(); $('#LJR6').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LF1R6').show(); } else $('#LF1R6').hide(); });
			  $('#btnLJN6').click(function(){ if ($('#LJN6').is (':hidden')){ $('#LV1R6').hide(); $('#LV2R6').hide(); $('#LVN6').hide(); $('#LMFN6').hide(); $('#LMFR6').hide(); $('#LF1N6').hide(); $('#LF1R6').hide(); $('#LJR6').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LJN6').show(); } else $('#LJN6').hide(); });
			  $('#btnLJR6').click(function(){ if ($('#LJR6').is (':hidden')){ $('#LV1R6').hide(); $('#LV2R6').hide(); $('#LVN6').hide(); $('#LMFN6').hide(); $('#LMFR6').hide(); $('#LF1N6').hide(); $('#LF1R6').hide(); $('#LJN6').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#').hide(); $('#LJR6').show(); } else $('#LJR6').hide(); });

			  /* 2017 */
			  $('#btnLV1R7').click(function(){ if ($('#LV1R7').is (':hidden')){ $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LV1R7').show(); } else $('#LV1R7').hide(); });
			  $('#btnLJ1N7').click(function(){ if ($('#LJ1N7').is (':hidden')){ $('#LV1R7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LJ1N7').show(); } else $('#LJ1N7').hide(); });
			  $('#btnLVN7').click(function(){ if ($('#LVN7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LVN7').show(); } else $('#LVN7').hide(); });
			  $('#btnLJR17').click(function(){ if ($('#LJR17').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LJR17').show(); } else $('#LJR17').hide(); });
			  $('#btnLJ1R7').click(function(){ if ($('#LJ1R7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LJ1R7').show(); } else $('#LJ1R7').hide(); });
			  $('#btnLV3R7').click(function(){ if ($('#LV3R7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LV3R7').show(); } else $('#LV3R7').hide(); });
			  $('#btnLMFN7').click(function(){ if ($('#LMFN7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LMFN7').show(); } else $('#LMFN7').hide(); });
			  $('#btnLJ2N7').click(function(){ if ($('#LJ2N7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LJ2N7').show(); } else $('#LJ2N7').hide(); });
			  $('#btnLJ2R7').click(function(){ if ($('#LJ2R7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LJ2R7').show(); } else $('#LJ2R7').hide(); });
			  $('#btnLV4R7').click(function(){ if ($('#LV4R7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LV4R7').show(); } else $('#LV4R7').hide(); });
			  $('#btnLF1R7').click(function(){ if ($('#LF1R7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LF1R7').show(); } else $('#LF1R7').hide(); });
			  $('#btnLF1N7').click(function(){ if ($('#LF1N7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LF1N7').show(); } else $('#LF1N7').hide(); });
			  $('#btnLF2R7').click(function(){ if ($('#LF2R7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LF2R7').show(); } else $('#LF2R7').hide(); });
			  $('#btnLF2N7').click(function(){ if ($('#LF2N7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LF2N7').show(); } else $('#LF2N7').hide(); });
			  $('#btnLGF1R7').click(function(){ if ($('#LGF1R7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LGF1R7').show(); } else $('#LGF1R7').hide(); });
			  $('#btnLGF1N7').click(function(){ if ($('#LGF1N7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF2R7').hide(); $('#LGF1N7').show(); } else $('#LGF1N7').hide(); });
			  $('#btnLGF2R7').click(function(){ if ($('#LGF2R7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').show(); } else $('#LGF2R7').hide(); });
			  $('#btnLGF2N7').click(function(){ if ($('#LGF2N7').is (':hidden')){ $('#LV1R7').hide(); $('#LJ1N7').hide(); $('#LVN7').hide(); $('#LJR17').hide(); $('#LJ1R7').hide(); $('#LV3R7').hide(); $('#LMFN7').hide(); $('#LJ2N7').hide(); $('#LJ2R7').hide(); $('#LV4R7').hide(); $('#LF1R7').hide(); $('#LF1N7').hide(); $('#LF2R7').hide(); $('#LF2N7').hide(); $('#LGF1R7').hide(); $('#LGF1N7').hide(); $('#LGF2R7').hide(); $('#LGF2N7').show(); } else $('#LGF2N7').hide(); });

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
			  $('#btnLV1R9').click(function(){ if ($('#LV1R9').is (':hidden')){ $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LV1R9').show(); } else $('#LV1R9').hide(); });
			  $('#btnLV2R9').click(function(){ if ($('#LV2R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LV2R9').show(); } else $('#LV2R9').hide(); });
			  $('#btnLV1N9').click(function(){ if ($('#LV1N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LV1N9').show(); } else $('#LV1N9').hide(); });
			  $('#btnLJ1N9').click(function(){ if ($('#LJ1N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LJ1N9').show(); } else $('#LJ1N9').hide(); });
			  $('#btnLV2N9').click(function(){ if ($('#LV2N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LV2N9').show(); } else $('#LV2N9').hide(); });
			  $('#btnLV3R9').click(function(){ if ($('#LV3R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LV3R9').show(); } else $('#LV3R9').hide(); });
			  $('#btnLV4R9').click(function(){ if ($('#LV4R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LV4R9').show(); } else $('#LV4R9').hide(); });
			  $('#btnLJ2N9').click(function(){ if ($('#LJ2N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LJ2N9').show(); } else $('#LJ2N9').hide(); });
			  $('#btnLV5R9').click(function(){ if ($('#LV5R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LV5R9').show(); } else $('#LV5R9').hide(); });
			  $('#btnLF1N9').click(function(){ if ($('#LF1N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LF1N9').show(); } else $('#LF1N9').hide(); });
			  $('#btnLF1R9').click(function(){ if ($('#LF1R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LF1R9').show(); } else $('#LF1R9').hide(); });
			  $('#btnLF2N9').click(function(){ if ($('#LF2N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LF2N9').show(); } else $('#LF2N9').hide(); });
			  $('#btnLF2R9').click(function(){ if ($('#LF2R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LF2R9').show(); } else $('#LF2R9').hide(); });
			  $('#btnLGF1N9').click(function(){ if ($('#LGF1N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LGF1N9').show(); } else $('#LGF1N9').hide(); });
			  $('#btnLGF1R9').click(function(){ if ($('#LGF1R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').hide(); $('#LGF1R9').show(); } else $('#LGF1R9').hide(); });
			  $('#btnLGF2N9').click(function(){ if ($('#LGF2N9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2R9').hide(); $('#LGF2N9').show(); } else $('#LGF2N9').hide(); });
			  $('#btnLGF2R9').click(function(){ if ($('#LGF2R9').is (':hidden')){ $('#LV1R9').hide(); $('#LV2R9').hide(); $('#LV1N9').hide(); $('#LJ1N9').hide(); $('#LV2N9').hide(); $('#LV3R9').hide(); $('#LV4R9').hide(); $('#LJ2N9').hide(); $('#LV5R9').hide(); $('#LF1N9').hide(); $('#LF1R9').hide(); $('#LF2N9').hide(); $('#LF2R9').hide(); $('#LGF1N9').hide(); $('#LGF1R9').hide(); $('#LGF2N9').hide(); $('#LGF2R9').show(); } else $('#LGF2R9').hide(); });

			  /* 2021 */
			  $('#btnRLV121').click(function(){ if ($('#RLV121').is (':hidden')){ $('#LV1N21').hide(); $('#RLV221').hide(); $('#LV2N21').hide(); $('#LJ1N21').hide(); $('#RLV321').hide(); $('#RLV121').show(); } else $('#RLV121').hide(); });
			  $('#btnLV1N21').click(function(){ if ($('#LV1N21').is (':hidden')){ $('#RLV121').hide(); $('#RLV221').hide(); $('#LV2N21').hide(); ('#LJ1N21').hide(); $('#RLV321').hide(); $('#LV1N21').show(); } else $('#LV1N21').hide(); });
			  $('#btnRLV221').click(function(){ if ($('#RLV221').is (':hidden')){ $('#RLV121').hide(); $('#LV1N21').hide(); $('#LV2N21').hide(); $('#LJ1N21').hide(); $('#RLV321').hide(); $('#RLV221').show(); } else $('#RLV221').hide(); });
			  $('#btnLV2N21').click(function(){ if ($('#LV2N21').is (':hidden')){ $('#RLV121').hide(); $('#LV1N21').hide(); $('#RLV221').hide(); $('#LJ1N21').hide(); $('#RLV321').hide(); $('#LV2N21').show(); } else $('#LV2N21').hide(); });
			  $('#btnLJ1N21').click(function(){ if ($('#LJ1N21').is (':hidden')){ $('#RLV121').hide(); $('#LV1N21').hide(); $('#RLV221').hide(); $('#LV2N21').hide(); $('#RLV321').hide(); $('#LJ1N21').show(); } else $('#LJ1N21').hide(); });
			  $('#btnRLV321').click(function(){ if ($('#RLV321').is (':hidden')){ $('#RLV121').hide(); $('#LV1N21').hide(); $('#RLV221').hide(); $('#LV2N21').hide(); $('#LJ1N21').hide(); $('#RLV321').show(); } else $('#RLV321').hide(); });
			  
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
	/* Calcula la suma de puntos de todas las palomas de cada socio */
	/*for (var i=0;i<arrPuntos.length;i++){
	  for (var j=0;j<arrCarreras.length;j++){
		if ((arrPuntos[i].socio==arrCarreras[j].socio)&&(arrCarreras[j].anio == anio)){
		  if (arrCarreras[j].concurso.includes('N')){
			arrPuntos[i].puntosnacional += arrCarreras[j].puntos;
		  }
		  else{
			arrPuntos[i].puntosregional += arrCarreras[j].puntos;
		  }
		}
	  }
	}*/
	/* Calcula la suma de puntos de las 10 primeras palomas de cada socio por cada carrera */
	var cuantosN;
	var cuantosR;
	var i=-1;
	
	for(i=0;i<arrPuntos.length;i++){
	  for (var j=0;j<arrConcursos.length;j++){
		exit_kn:{
		  cuantosN=0;
		  for (var k=0;k<arrCarreras.length;k++){
			if ((arrPuntos[i].socio==arrCarreras[k].socio)&&(arrCarreras[k].anio==anio)&&(arrConcursos[j].codigo==arrCarreras[k].concurso)){
			  if (arrCarreras[k].concurso.includes('N')){
				arrPuntos[i].puntosnacional += arrCarreras[k].puntos;
				cuantosN+=1;
				if (cuantosN==10){
				  break exit_kn;
				}
			  }
			}
		  }
		}
	  }
	}
	
	for(i=0;i<arrPuntos.length;i++){
	  for (var j=0;j<arrConcursos.length;j++){
		exit_kr:{
		  cuantosR=0;
		  for (var k=0;k<arrCarreras.length;k++){
			if ((arrPuntos[i].socio==arrCarreras[k].socio)&&(arrCarreras[k].anio==anio)&&(arrConcursos[j].codigo==arrCarreras[k].concurso)){
			  if (arrCarreras[k].concurso.includes('R')){
				arrPuntos[i].puntosregional += arrCarreras[k].puntos;
				cuantosR+=1;
				if (cuantosR==10){
				  break exit_kr;
				}
			  }
			}
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
	  htmlPuntos+="<p>La puntuaci&oacuten es la suma de puntos de las 10 primeras palomas clasificadas de cada concurso</p><br />";
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
	  htmlPuntos+="<p>La puntuaci&oacuten es la suma de puntos de las 10 primeras palomas clasificadas de cada concurso</p><br />";
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
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'><abbr title='Distancia al palomar m&aacute;s cercano'>Km cerca:</abbr> " + Number(arrConcursos[j].km0).toFixed(2) + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Fecha suelta: " + arrConcursos[j].fsuelta +"</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'>Colectivo: " + arrConcursos[j].colectivo + "</div>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'><a target='_blank' href='" + arrConcursos[j].fichero + "'>Listado clasificadas</a> <abbr title='Listado conjunto CDCL y CDCSF'>?</abbr></div>";
		htmlConcursos+="</div >";
		htmlConcursos+="<div class='row'>";
		htmlConcursos+="<div class='col-md-3 col-sm-6 col-xs-12 izda'><abbr title='Distancia al palomar m&aacute;s lejano'>Km lejos:</abbr> " + Number(arrConcursos[j].km1).toFixed(2) + "</div>";
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
	  if (arrCarreras[i].concurso.includes('N')){
		var nueva = {anilla:arrCarreras[i].anilla,pais:arrCarreras[i].pais,socio:arrCarreras[i].socio,misdatos:"<abbr title='"+dimeNombreConcurso(arrCarreras[i].concurso)+"'>"+arrCarreras[i].concurso+"</abbr>: "+arrCarreras[i].pos+"ª",puntos_nac:arrCarreras[i].puntos};
		arrPalomas.push(nueva);
	  }
	}
	else{
	  if (arrCarreras[i].concurso.includes('N')){
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
		"infoFiltered": "(Filtrando de un total de _MAX_ registros)",
		"zeroRecords": "No se han encontrado datos"
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
	  if (arrCarreras[i].concurso.includes('R')){
		var nueva = {anilla:arrCarreras[i].anilla,pais:arrCarreras[i].pais,socio:arrCarreras[i].socio,misdatos:"<abbr title='"+dimeNombreConcurso(arrCarreras[i].concurso)+"'>"+arrCarreras[i].concurso+"</abbr>: "+arrCarreras[i].pos+"ª",puntos_nac:arrCarreras[i].puntos};
		arrPalomas.push(nueva);
	  }
	}
	else{
 	  if (arrCarreras[i].concurso.includes('R')){
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
		"infoFiltered": "(Filtrando de un total de _MAX_ registros)",
		"zeroRecords": "No se han encontrado datos"
	},
	columnDefs: [
		{ targets: [0,5], className: 'dt-body-right' }
	]
  } );

}

function ProcesarAnilla(anilla,anio) {
  var html="";
  if (anilla==''){
	html=$.parseHTML('Sin datos',true);
	$clave=$('#infoanilla');
	$clave.empty();
	$clave.append(html);
	return;
  }
  if (isNaN(anio)){
	anio=new Date().getFullYear();
  }
  if (anio==anioSelected){
	//Hay que cargar las anillas de dicho año
	arrAnillas.length = 0;
	var req3 = $.getJSON('data/'+anio+'/anillas.txt', function(datosAnillas){
	  req3.done(function(response){
		for (var i=0; i<datosAnillas.length; i++){
		  if (datosAnillas[i].anio==anio){
			var nuevo = {anio:datosAnillas[i].anio,club:datosAnillas[i].club,concurso:datosAnillas[i].concurso,anilla:datosAnillas[i].anilla,pais:datosAnillas[i].pais,sexo:datosAnillas[i].sexo,color:datosAnillas[i].color,nombre:datosAnillas[i].nombre};
			arrAnillas.push(nuevo);
		  }
		}
		var htmlAnillas="";
		if (existeAnilla(anio,anilla)==true){
		  htmlAnillas=getDatosAnilla(anio,anilla);
		  html=$.parseHTML(htmlAnillas,true);
		  $clave=$('#infoanilla');
		  $clave.empty();
		  $clave.append(html);
		  escribeChartNacional(anilla,anio);
		  escribeChartRegional(anilla,anio);
		}
		else{
		  htmlAnillas="<br />Anilla no encontrada";
		  html=$.parseHTML(htmlAnillas,true);
		  $clave=$('#infoanilla');
		  $clave.empty();
		  $clave.append(html);
		}
	  });
	}); //anillas
  } else {
	//Hay que cargar todos los datos de dicho año
	arrSocios.length = 0;
	arrConcursos.length = 0;
	arrCarreras.length = 0;
	arrAnillas.length = 0;
	anioSelected = anio;
	var req = $.getJSON('data/'+anio+'/socios.txt', function(datosSocios){
	  req.done(function(response){
		for (var i=0; i<datosSocios.length; i++){
		  if (datosSocios[i].anio==anio){
			var nuevo = {anio:datosSocios[i].anio,club:datosSocios[i].club,socio:datosSocios[i].socio,nombre:datosSocios[i].nombre,activo:datosSocios[i].activo};
			arrSocios.push(nuevo);
		  }
		}
		var req1 = $.getJSON('data/'+anio+'/concursos.txt', function(datosConcursos){
		  req1.done(function(response){
			for (var i=0; i<datosConcursos.length; i++){
			  if (datosConcursos[i].anio==anio){
				var nuevo1 = {anio:datosConcursos[i].anio,club:datosConcursos[i].club,codigo:datosConcursos[i].codigo,nombre:datosConcursos[i].nombre,fenceste:datosConcursos[i].fenceste,fsuelta:datosConcursos[i].fsuelta,categoria:datosConcursos[i].categoria,fichero:'data/'+anio+'/'+datosConcursos[i].fichero,provincia:datosConcursos[i].provincia,hsuelta:datosConcursos[i].hsuelta,campeonato:datosConcursos[i].campeonato,colectivo:datosConcursos[i].colectivo,socios:datosConcursos[i].socios,encestadas:datosConcursos[i].encestadas,clasif:datosConcursos[i].clasif,noclasif:datosConcursos[i].noclasif,km0:datosConcursos[i].km0,km1:datosConcursos[i].km1,activo:datosConcursos[i].activo};
				arrConcursos.push(nuevo1);
			  }
			}
			var req2 = $.getJSON('data/'+anio+'/carreras.txt', function(datosCarreras){
			  req2.done(function(response){
				for (var i=0; i<datosCarreras.length; i++){
				  if (datosCarreras[i].anio==anio){
					var nuevo2 = {anio:datosCarreras[i].anio,club:datosCarreras[i].club,concurso:datosCarreras[i].concurso,pos:datosCarreras[i].pos,pais:datosCarreras[i].pais,anilla:datosCarreras[i].anilla,a1:datosCarreras[i].a1,a2:datosCarreras[i].a2,a3:datosCarreras[i].a3,socio:datosCarreras[i].socio,a4:datosCarreras[i].a4,a5:datosCarreras[i].a5,a6:datosCarreras[i].a6,a7:datosCarreras[i].a7,puntos:datosCarreras[i].puntos,a8:datosCarreras[i].a8};
					arrCarreras.push(nuevo2);
				  }
				}
				var req3 = $.getJSON('data/'+anio+'/anillas.txt', function(datosAnillas){
				  req3.done(function(response){
					for (var i=0; i<datosAnillas.length; i++){
					  if (datosAnillas[i].anio==anio){
						var nuevo3 = {anio:datosAnillas[i].anio,club:datosAnillas[i].club,concurso:datosAnillas[i].concurso,anilla:datosAnillas[i].anilla,pais:datosAnillas[i].pais,sexo:datosAnillas[i].sexo,color:datosAnillas[i].color,nombre:datosAnillas[i].nombre};
						arrAnillas.push(nuevo3);
					  }
					}
					var htmlAnillas="";
					if (existeAnilla(anio,anilla)==true){
					  htmlAnillas=getDatosAnilla(anio,anilla);
					  html=$.parseHTML(htmlAnillas,true);
					  $clave=$('#infoanilla');
					  $clave.empty();
					  $clave.append(html);
					  escribeChartNacional(anilla,anio);
					  escribeChartRegional(anilla,anio);
					}
					else{
					  htmlAnillas="<br />Anilla no encontrada";
					  html=$.parseHTML(htmlAnillas,true);
					  $clave=$('#infoanilla');
					  $clave.empty();
					  $clave.append(html);
					}
				  });
				}); //anillas

			});
		  }); //carreras

		});
	  }); //concursos
  
	});
  }); //socios
	
  }
  
}

function existeAnilla(anio,anilla){
  for (var i=0; i<arrAnillas.length; i++){
	if ((arrAnillas[i].anio==anio)&&(arrAnillas[i].anilla==anilla)){
	  return true;
	  break;
	}
  }
  return false;
}

function getDatosAnilla(anio,anilla){
  var propietario="";
  var color="";
  var sexo="";
  var pais="";
  var datosAnilla="";
  for (var i=0; i<arrAnillas.length; i++){
	if ((arrAnillas[i].anio==anio)&&(arrAnillas[i].anilla==anilla)){
	  propietario=arrAnillas[i].nombre;
	  color=arrAnillas[i].color;
	  sexo=arrAnillas[i].sexo;
	  pais=arrAnillas[i].pais;
	  break;
	}
  }
  datosAnilla="<div class='infocarrera'>";
  datosAnilla+="<div class='row'>";
  datosAnilla+="<h3>Anilla "+anilla+"</h3>";
  datosAnilla+="</div><br />";
  datosAnilla+="<div class='row'>";
  datosAnilla+="<div class='col-md-6 izda'>Propietario: " + propietario + "</div>";
  datosAnilla+="<div class='col-md-6 izda'>Pais: " + pais + "</div>";
  datosAnilla+="<div class='col-md-6 izda'>Color: " + color + "</div>";
  datosAnilla+="<div class='col-md-6 izda'>Sexo: " + sexo + "</div>";
  datosAnilla+="</div>";
  datosAnilla+="</div>";
  datosAnilla+="<h3>Nacional</h3>";
  datosAnilla+="<div><canvas id='myChartNacional'></canvas></div>";
  datosAnilla+="<br /><h3>Regional</h3>";
  datosAnilla+="<div><canvas id='myChartRegional'></canvas></div>";
  return datosAnilla;
}

function dimeCodigos(esNacional){
  var arrCodigos=[];
  var j=0;
  for (var i=0; i<arrConcursos.length; i++){
	if (arrConcursos[i].activo==true){
	  if (esNacional==true){ //Nacional
		if (arrConcursos[i].codigo.includes('N')){
		  arrCodigos[j++]=arrConcursos[i].codigo;
		}
	  }
	  else{ //Regional
		if (arrConcursos[i].codigo.includes('R')){
		  arrCodigos[j++]=arrConcursos[i].codigo;
		}
	  }
	}
  }
  return arrCodigos;
}

function dimePosiciones(anilla,arrCodigos){
  var arrPosiciones=[];
  for (var i=0; i<arrCodigos.length; i++){
	var encontrada=false;
	for (var j=0; j<arrCarreras.length; j++){
	  if ((arrCarreras[j].concurso==arrCodigos[i])&&(arrCarreras[j].anilla==anilla)){
		encontrada=true;
		break
	  }
	}
	if (encontrada==true){
	  arrPosiciones[i]=arrCarreras[j].pos;
	}
	else{
	  arrPosiciones[i]=null;
	}
  }
  return arrPosiciones;
}

function dimeClasificadas(esNacional){
  var arrClasificadas=[];
  var j=0;
  for (var i=0; i<arrConcursos.length; i++){
	if (arrConcursos[i].activo==true){
	  if (esNacional==true){ //Nacional
		if (arrConcursos[i].codigo.includes('N')){
		  arrClasificadas[j++]=arrConcursos[i].clasif;
		}
	  }
	  else{ //Regional
		if (arrConcursos[i].codigo.includes('R')){
		  arrClasificadas[j++]=arrConcursos[i].clasif;
		}
	  }
	}
  }
  return arrClasificadas;
}

function dimeNoClasificadas(esNacional){
  var arrNoClasificadas=[];
  var j=0;
  for (var i=0; i<arrConcursos.length; i++){
	if (arrConcursos[i].activo==true){
	  if (esNacional==true){ //Nacional
		if (arrConcursos[i].codigo.includes('N')){
		  arrNoClasificadas[j++]=arrConcursos[i].noclasif;
		}
	  }
	  else{ //Regional
		if (arrConcursos[i].codigo.includes('R')){
		  arrNoClasificadas[j++]=arrConcursos[i].noclasif;
		}
	  }
	}
  }
  return arrNoClasificadas;
}

function escribeChartRegional(anilla,anio){
  Chart.defaults.global.elements.line.fill = false;
  var arrCodigos=dimeCodigos(false);
  var arrPosiciones=dimePosiciones(anilla,arrCodigos);
  var arrEncestada=dimeEncestada(anilla,anio,arrCodigos);
  var arrClasificadas=dimeClasificadas(false);
  var arrNoClasificadas=dimeNoClasificadas(false);
  //data: [0,0,0,0,0,0,0,0,0]
  var barChartData = {
	labels: arrCodigos,
	datasets: [{
	  type: 'line',
	  label: 'Posición',
	  id: "y-axis-1",
	  lineTension: 0,
	  borderWidth: 5,
	  backgroundColor: "rgba(0,0,255,0.5)",
	  borderColor: "rgba(0,0,255,0.5)",
	  data: arrPosiciones
	}, {
	  type: 'bubble',
	  label: 'Encestada',
	  id: "y-axis-1",
	  borderWidth: 8,
	  backgroundColor: "rgba(255,0,0,0.7)",
	  borderColor: "rgba(255,0,0,0.7)",
	  data: arrEncestada
	}, {
	  type: 'bar',
	  label: 'Clasificadas',
	  id: "y-axis-0",
	  backgroundColor: "rgba(0,198,79,0.75)",
	  data: arrClasificadas
	}, {
	  type: 'bar',
	  label: 'No clasificadas',
	  id: "y-axis-0",
	  backgroundColor: "rgba(187,187,187,0.75)",
	  data: arrNoClasificadas
	}]
  };

  var ctx = document.getElementById("myChartRegional").getContext("2d");
  var ch = new Chart(ctx, {
	type: 'bar',
	data: barChartData,
	options: {
	  animation: true,
	  //responsive: true,
	  title: {
		display: true,
		padding: 10,
		text: [anilla,anio],
		position: 'top'
	  },
	  tooltips: {
		mode: 'index'
	  },
	  legend: {
		//position: 'right'
	  },
	  showTooltips: true,
	  scales: {
		xAxes: [{
		  stacked: true
		}],
		yAxes: [{
		  stacked: true,
		  position: "left",
		  id: "y-axis-0",
		}]
	  },
	  animation: {
		//duration: 0,
		onComplete: function () {
		  
		  var ctx = this.chart.ctx;
		  ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
		  ctx.textAlign = 'center';
		  ctx.textBaseline = 'bottom';
		  ctx.fillStyle = "#000";
		  this.data.datasets.forEach(function (dataset) {
			if (dataset.label == 'Posición'){
			  for (var i = 0; i < dataset.data.length; i++) {
				for (var key in dataset._meta) {
				  var model = dataset._meta[key].data[i]._model;
				  ctx.fillText(dataset.data[i] + 'ª', model.x, model.y - 10);
				}
			  }
			}
		  });
		}
	  }
	  
	}
  });
}

function escribeChartNacional(anilla,anio){
  Chart.defaults.global.elements.line.fill = false;
  var arrCodigos=dimeCodigos(true);
  var arrPosiciones=dimePosiciones(anilla,arrCodigos);
  var arrEncestada=dimeEncestada(anilla,anio,arrCodigos);
  var arrClasificadas=dimeClasificadas(true);
  var arrNoClasificadas=dimeNoClasificadas(true);
  //data: [0,0,0,0,0,0,0,0,0]
  var barChartData = {
	labels: arrCodigos,
	datasets: [{
	  type: 'line',
	  label: 'Posición',
	  id: "y-axis-1",
	  lineTension: 0,
	  borderWidth: 5,
	  backgroundColor: "rgba(0,0,255,0.5)",
	  borderColor: "rgba(0,0,255,0.5)",
	  data: arrPosiciones
	}, {
	  type: 'bubble',
	  label: 'Encestada',
	  id: "y-axis-1",
	  borderWidth: 8,
	  backgroundColor: "rgba(255,0,0,0.7)",
	  borderColor: "rgba(255,0,0,0.7)",
	  data: arrEncestada
	}, {
	  type: 'bar',
	  label: 'Clasificadas',
	  id: "y-axis-0",
	  backgroundColor: "rgba(0,198,79,0.75)",
	  data: arrClasificadas
	}, {
	  type: 'bar',
	  label: 'No clasificadas',
	  id: "y-axis-0",
	  backgroundColor: "rgba(187,187,187,0.75)",
	  data: arrNoClasificadas
	}]
  };

  var ctx = document.getElementById("myChartNacional").getContext("2d");
  var ch = new Chart(ctx, {
	type: 'bar',
	data: barChartData,
	options: {
	  animation: true,
	  //responsive: true,
	  title: {
		display: true,
		padding: 10,
		text: [anilla,anio],
		position: 'top'
	  },
	  tooltips: {
		mode: 'index'
	  },
	  legend: {
		//position: 'right'
	  },
	  showTooltips: true,
	  scales: {
		xAxes: [{
		  stacked: true
		}],
		yAxes: [{
		  stacked: true,
		  position: "left",
		  id: "y-axis-0",
		}]
	  },
	  animation: {
		//duration: 0,
		onComplete: function () {
		  
		  var ctx = this.chart.ctx;
		  ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
		  ctx.textAlign = 'center';
		  ctx.textBaseline = 'bottom';
		  ctx.fillStyle = "#000";
		  this.data.datasets.forEach(function (dataset) {
			if (dataset.label == 'Posición'){
			  for (var i = 0; i < dataset.data.length; i++) {
				for (var key in dataset._meta) {
				  var model = dataset._meta[key].data[i]._model;
				  ctx.fillText(dataset.data[i] + 'ª', model.x, model.y - 10);
				}
			  }
			}
		  });
		}
	  }
	  
	}
  });
}

function RellenaAnios(){
  for (i=0; i<arrAnios.length;i++){
	if (arrAnios[i].activo == true){
	  document.getElementById("anioconcurso").options[document.getElementById("anioconcurso").options.length]=new Option(arrAnios[i].anio,arrAnios[i].anio);
	}
  }
  var anioActual=new Date().getFullYear();
  for (i=0; i<arrAnios.length;i++){
	if (anioActual==arrAnios[i].anio){
	  document.getElementById("anioconcurso").selectedIndex = i;
	  return;
	}
  }
}

function dimeEncestada(anilla,anio,arrCodigos){
  var arrEnceste=[];
  for (var i=0; i<arrCodigos.length; i++){
	var encontrada=false;
	bucle1:
	for (var j=0; j<arrAnillas.length; j++){
	  if ((arrCodigos[i]==arrAnillas[j].concurso)&&(arrAnillas[j].anio==anio)&&(arrAnillas[j].anilla==anilla)){
		encontrada=true;
		break bucle1;
	  }
	}
	if (encontrada==true){
	  arrEnceste[i]=0;
	}
  }
  return arrEnceste;
}