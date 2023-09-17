const notaDePedido = recuperarNotaPedido()

function recuperarNotaPedido()
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
    
    doc.setFontSize(18)
    doc.text('Le Parc', 14, 22)
    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.line(10,10,180,10);
    doc.autoTable({ html: '.tabla-pedido' })
    doc.save('table.pdf')
}