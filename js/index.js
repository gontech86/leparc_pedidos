const rutaListaLocal = "./data/lista.csv";
let tabla;
let productos;

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
            productos = contenidoCSV.split('\n');
            crearTabla(productos);
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
        productos = event.target.result.split("\n");

        const divErrorArchivo = document.querySelector(".archivo-error");
        divErrorArchivo.classList.add("ocultar");
        crearTabla(productos);
    });
    reader.readAsText(archivo);
}

function crearTabla(datos) {
    // Crear la tabla
    tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    crearEncabezados(datos[0].split(","), tabla);
    crearFilasConDatos(datos.slice(1), tabla);// comienza luego de los encabezados
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

        const filaElemento = document.createElement("tr");
        filaElemento.setAttribute("id", fila[0]);
        filaElemento.setAttribute("class", "fila-dato");

        filaElemento.innerHTML = (`
                ${retornarFila(fila)}
        `)

        // Agregar la fila a la tabla
        tabla.append(filaElemento);
        activarSubtotal(filaElemento);

    }
}

function retornarFila(fila) {
    let filaHtml = `    
    <td>
    <input type="number" value="0" min="0" pattern="\\d+" class="inputEntero">
    </td>
    <td class="codigo">
     ${fila[0]}
    </td>
    <td class="producto">
     ${fila[1]}
    </td>
    <td class="precio-unitario">
    ${fila[2]}
    </td>
    <td class="subtotal">
    0
    </td>    
    `
    return filaHtml;
}

function activarSubtotal(filaElemento) {
    /*
    Obtengo la clase del input, precio unitario y subtotal.
    Activo el Evento para cuando detecte cambios en input.
    Realizo la multiplicacion del input x precio unitario y hago una modificacion del subtotal.
    */

    const input = filaElemento.querySelector(".inputEntero");
    const precioUnitario = filaElemento.querySelector(".precio-unitario");
    const subtotal = filaElemento.querySelector(".subtotal");

    // Agregar evento de cambio al input
    input.addEventListener("change", (event) => {
        const valor = event.target.value;
        const resultado = valor * precioUnitario.textContent;
        subtotal.textContent = resultado;
        //obtenerTablaNotaPedido();
    });
}

function obtenerTablaNotaPedido() {
    const filas = tabla.querySelectorAll(".fila-dato");
    const array = [];

    for (const fila of filas) {
        const cantidad = parseInt(fila.querySelector(".inputEntero").value);

        if (cantidad > 0) {
            const codigo = parseInt(fila.querySelector(".codigo").textContent);            
            const descripcion = fila.querySelector(".producto").innerHTML;
            const precioUnitario = parseInt(fila.querySelector(".precio-unitario").textContent);            
            const subtotal = parseInt(fila.querySelector(".subtotal").textContent);            
            
            const producto = cantidad + ',' + codigo + ',' + descripcion + ',' + precioUnitario + ',' + subtotal;            
            array.push(producto);
        }
    }    

    if(array.length > 0){
        localStorage.setItem('NotaPedido', JSON.stringify(array));
    }
    else{        
        console.warn("La lista esta vacia...");
    }
}

function activarBotonNotaPedido() {
    const botonNotaPedido = document.querySelector(".button-NotaPedido");
    console.log("activarBotonNotaPedido");

    botonNotaPedido.addEventListener("click", (event) => {
        obtenerTablaNotaPedido();
    });
}

// Agrega el evento change al elemento input
document.querySelector("input[name='archivo']").addEventListener("change", loadCSVFromInput);

activarBotonNotaPedido();