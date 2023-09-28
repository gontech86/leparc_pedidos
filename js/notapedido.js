const notaDePedido = recuperarNotaPedido();
const nombreVivero = recuperarNombreVivero();

function recuperarNotaPedido()
{
    //true retorna el carrito guardado - false retorna un array vacio
    return JSON.parse(localStorage.getItem('NotaPedido')) || [];
}

function recuperarNombreVivero()
{
    //true retorna el carrito guardado - false retorna un array vacio
    return localStorage.getItem('NombreVivero') || [];
}

function cargarNombreVivero(nombre){
    const nombreViveroHtml = document.querySelector(".nombre-vivero");
    nombreViveroHtml.innerHTML = "Vivero: "+ nombre;
    //nombreViveroHtml.innerHTML = "Vivero Japones";
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

cargarNombreVivero(nombreVivero)
cargarNotaDePedido(notaDePedido);

function activarBotonNotaPedido() {
    const botonNotaPedido = document.querySelector(".button-generar-pedido");

    if (botonNotaPedido !== null) {
        botonNotaPedido.addEventListener("click", () => {
            generarNotaDePedido();
        });
    }
}
activarBotonNotaPedido();

function generarNotaDePedido(){  
    console.log("Nota de pedido generada: "); 
    var doc = new jspdf.jsPDF();
    
    doc.setFontSize(18);
    doc.text('Le Parc', 10, 10);
    doc.setFontSize(14);
    doc.text('Vivero: '+ nombreVivero, 10, 20);
    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.line(10,12,180,12);
    doc.autoTable({ startY:25, html: '.tabla-pedido' });
    doc.save('table.pdf');
}