function leerCSV() {
    // Obtener el archivo CSV seleccionado
    const archivo = document.querySelector("input[name='archivo']")
        .files[0];

    // Leer el archivo CSV
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        // Convertir el contenido del archivo CSV en un array
        const datos = event.target.result.split("\n");
        crearTabla(datos);
    });
    reader.readAsText(archivo);
}

function crearTabla(datos) {
    // Crear la tabla
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    // Iterar por los datos del archivo CSV
    for (let i = 0; i < datos.length; i++) {
        // Obtener la fila actual del archivo CSV
        const fila = datos[i].split(",");

        // Crear una fila en la tabla
        const filaElemento = document.createElement("tr");

        // Agregar las columnas a la fila
        for (let j = 0; j < fila.length; j++) {
            const columna = document.createElement("td");
            columna.textContent = fila[j];
            filaElemento.appendChild(columna);
        }

        // Agregar la fila a la tabla
        tabla.appendChild(filaElemento);
    }
}

// Agrega el evento change al elemento input
document.querySelector("input[name='archivo']").addEventListener("change", leerCSV);