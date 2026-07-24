// Obtener el elemento select de regiones y comunas
const regionSelect = document.getElementById("regionSelect");
const comunaSelect = document.getElementById("comunaSelect");
const botonBuscar = document.getElementById("boton2");
const tablaElementos = document.getElementById("tablaElementos");
const tbody = tablaElementos.querySelector("tbody");
const alert = document.getElementById("alert");

// Cargar las opciones de las regiones desde el archivo JSON
fetch("json/regiones.json")
  .then(response => response.json())
  .then(data => {
     regionSelect.innerHTML = '<option value="">Selecciona una región</option>';
    // Recorrer las regiones y agregar opciones al select
    data.regiones.forEach(region => {
      const option = document.createElement("option");
      option.value = region.nombre;
      option.text = region.nombre;
      regionSelect.appendChild(option);
    });
  })
  .catch(error => console.error(error));

   // Función para cargar las comunas según la región seleccionada
function cargarComunas() {
  const regionSeleccionada = regionSelect.value;

  // Limpiar las opciones anteriores de las comunas
  comunaSelect.disabled=true;
  botonBuscar.disabled=true;
  comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';
  tablaElementos.classList.add('d-none');
  tbody.innerHTML = "";
  alert.classList.add('d-none');

  if (regionSeleccionada) {
    // Obtener las comunas correspondientes a la región seleccionada desde el archivo JSON
    fetch("json/regiones.json")
      .then(response => response.json())
      .then(data => {
        const region = data.regiones.find(region => region.nombre === regionSeleccionada);
        region.comunas
          .slice() // copia para no modificar el original
          .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
          .forEach(comuna => {
            const option = document.createElement("option");
            option.value = comuna;
            option.text = comuna;
            comunaSelect.appendChild(option);
          });
       
        comunaSelect.disabled=false;
      })
      .catch(error => console.error(error));
  }
}

comunaSelect.addEventListener("change", habilitar);

function habilitar(){
  tablaElementos.classList.add('d-none');
  tbody.innerHTML = "";
  alert.classList.add('d-none');
  botonBuscar.disabled=false;
}

botonBuscar.addEventListener("click", traerDatos2);  

function traerDatos2() {
  const comunaSeleccionada = comunaSelect.value.toUpperCase();
  let url2 ="json/eepae.json";
  fetch(url2)
    .then(response => response.json())
    .then(data => {
      let miPerro = data.filter(({COMUNA}) => COMUNA === comunaSeleccionada);
      if (miPerro.length === 0){
        alert.classList.remove('d-none');
      }else{
        alert.classList.add('d-none');
          // Ordenar alfabéticamente por nombre del establecimiento
        miPerro.sort((a, b) => 
          a.NOMBRE_ESTABLECIMIENTO.localeCompare(b.NOMBRE_ESTABLECIMIENTO, 'es', { sensitivity: 'base' })
        );

      miPerro.forEach(mostrarEE);
      }
    })
    .catch(error => {
      // Manejo de errores
      console.error('Error:', error);
    }); 
}
function mostrarEE(item){

  const fila = document.createElement("tr");
  const celdaNombreEE = document.createElement("td");
  const celdaDireccion = document.createElement("td");
  const celdaFI = document.createElement("td");
  const celdaFF = document.createElement("td");
  const celdaHI = document.createElement("td");
  const celdaHF = document.createElement("td");

  celdaNombreEE.textContent =  item.NOMBRE_ESTABLECIMIENTO;
  celdaDireccion.textContent =  item.Dirección;
  celdaFI.textContent = item.FECHA_INICIO_COLEGIO_ABIERTO;
  celdaHI.textContent = item.FECHA_CIERRE_COLEGIO_ABIERTO;
  celdaFF.textContent = item.HORA_INICIO_COLEGIO_ABIERTO ;
  celdaHF.textContent = item.HORA_CIERRE_COLEGIO_ABIERTO;

  fila.appendChild(celdaNombreEE);
  fila.appendChild(celdaDireccion);
  fila.appendChild(celdaFI);
  fila.appendChild(celdaHI);
  fila.appendChild(celdaFF);
  fila.appendChild(celdaHF);
  
  tbody.appendChild(fila);
  tablaElementos.classList.remove('d-none');
  tablaElementos.classList.add('table');
}