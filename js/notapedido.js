const notaDePedido = recuperarCarrito()

function recuperarCarrito()
{
    //true retorna el carrito guardado - false retorna un array vacio
    return JSON.parse(localStorage.getItem('NotaPedido')) || [];
}

function cargarNotaDePedido(arrayProductos) {
    const tableHtmlBody = document.querySelector(".tabla-pedido");    

    if (tableHtmlBody !== undefined) {
        if (arrayProductos.length > 0) {
            // Vaciar el cuerpo de la tabla HTML
            tableHtmlBody.innerHTML = "";
        }

        arrayProductos.forEach(producto => {
            let row = document.createElement("tr");
            row.innerHTML = (`
                ${retornarFilaHTML(producto.split(","))}
        `);
            tableHtmlBody.append(row);
        }
        );
    }
    else{
        console.log('No existe tag tbody...');
    }
}

function retornarFilaHTML(producto){
    return `    
        <td>${producto[0]}</td>
        <td>${producto[1]}</td>
        <td>${producto[2]}</td>        
        <td>${producto[3]}</td>
        <td>${producto[4]}</td>
        `;
}

cargarNotaDePedido(notaDePedido);












/*

function activarBotonNotaPedido() {
    const botonNotaPedido = document.getElementById("btnNotaPedido");

    if (botonNotaPedido !== null) {
        botonNotaPedido.addEventListener("click", () => {
            generarNotaDePedido();
        });
    }
}

function generarNotaDePedido(){
    console.log("Nota de pedido generada...");
}

activarBotonNotaPedido();

function mostrarTablaDePedido(){
    const divTablaDePedido = document.querySelector(".tabla-pedido");
    divTablaDePedido.innerHTML = tablaDePedido;    
}

mostrarTablaDePedido();
*/