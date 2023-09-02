const rutaListaLocal = "./data/lista.csv";

function loadCSVFromFile() {
    fetch(rutaListaLocal)
        .then(response => {
            if (response.status === 200) {
                return response.text();
            } else {
                const divErrorArchivo = document.querySelector(".archivo-error");
                divErrorArchivo.classList.remove("ocultar");
                throw new Error("El archivo no existe en la ruta" + rutaListaLocal);
            }
        })
        .then(contenidoCSV => {
            const lista = contenidoCSV.split('\n');
            crearTabla(lista);
        })
        .catch(error => console.error('Error al obtener archivo: ', error));
}

//Carga automaticamente si detecta la tabla de referencia
loadCSVFromFile();


function loadCSVFromInput() {
    // Obtener el archivo CSV seleccionado
    const archivo = document.querySelector("input[name='archivo']")
        .files[0];

    // Leer el archivo CSV
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        // Convertir el contenido del archivo CSV en un array
        const datos = event.target.result.split("\n");

        const divErrorArchivo = document.querySelector(".archivo-error");
        divErrorArchivo.classList.add("ocultar");
        crearTabla(datos);
    });
    reader.readAsText(archivo);
}

function crearTabla(datos) {
    // Crear la tabla
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    crearEncabezados(datos[0].split(","), tabla);
    crearFilasConDatos(datos.slice(1), tabla);
}

function crearEncabezados(filaEncabezados, tabla) {
    // Crear una fila en la tabla
    const filaElemento = document.createElement("tr");

    // Agrega encabezado Cantidad
    const columnCantidad = document.createElement("th");
    columnCantidad.textContent = "Cantidad";
    filaElemento.appendChild(columnCantidad);

    // Agregar las columnas que trae el archivo CSV a la fila
    for (let j = 0; j < filaEncabezados.length; j++) {
        const columna = document.createElement("th");
        columna.textContent = filaEncabezados[j];
        filaElemento.appendChild(columna);
    }

    // Agrega encabezado Subtotal
    const columnSubtotal = document.createElement("th");
    columnSubtotal.textContent = "Subtotal";
    filaElemento.appendChild(columnSubtotal);

    // Agregar la fila a la tabla
    tabla.appendChild(filaElemento);
}

function crearFilasConDatos(filaDatos, tabla) {

    // Iterar por los datos del archivo CSV sin el encabezado
    for (let i = 0; i < filaDatos.length; i++) {
        // Obtener la fila actual del archivo CSV
        const fila = filaDatos[i].split(",");

        // Crear una fila en la tabla
        const filaElemento = document.createElement("tr");

        // Agregar input de numeros enteros primera columna
        const cantidadInput = document.createElement('input');
        cantidadInput.type = 'number';
        cantidadInput.value = 0;
        cantidadInput.min = 0; // Valor mínimo permitido
        cantidadInput.pattern = "\\d+"; // Patrón para números enteros
        const tdCantidad = document.createElement('td');
        tdCantidad.appendChild(cantidadInput);
        filaElemento.appendChild(tdCantidad);

        // Agregar las columnas a la fila
        for (let j = 0; j < fila.length; j++) {
            const columna = document.createElement("td");
            columna.textContent = fila[j];
            filaElemento.appendChild(columna);
        }

        //Agrego ultima columna a la fila con Subtotal
        const tdCantidad2 = document.createElement('td');
        tdCantidad2.textContent = "0";
        filaElemento.appendChild(tdCantidad2);

        // Agregar la fila a la tabla
        tabla.appendChild(filaElemento);
    }
}

// Agrega el evento change al elemento input
document.querySelector("input[name='archivo']").addEventListener("change", loadCSVFromInput);