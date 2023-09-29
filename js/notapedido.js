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
}

function cargarNotaDePedido(arrayProductos) {
    const tableHtmlBody = document.querySelector(".tabla-pedido");    

    if (tableHtmlBody !== undefined) {
        if (arrayProductos.length > 1) {
            // Vaciar el cuerpo de la tabla HTML
            tableHtmlBody.innerHTML = "";
        }

        let caption = document.createElement("caption");
        caption.innerHTML = (`
        ${'Nota de Pedido de <span class="nombre-vivero">Vivero </span> '}
        `);
        tableHtmlBody.append(caption);
        
        let header = document.createElement("tr");
        header.innerHTML = (`
        ${retornarHeaderHTML(arrayProductos[0].split(","))}
        `);
        tableHtmlBody.append(header);

        let total=0;

        arrayProductos.slice(1).forEach(producto => {
            let row = document.createElement("tr");
            
            let elements = producto.split(",");            
            total += parseInt(elements[4]);

            row.innerHTML = (`
                ${retornarFilaHTML(elements)}
        `);
            tableHtmlBody.append(row);            
        }
        );

        let rowTotal = document.createElement("tr");
        rowTotal.innerHTML = (`
        ${retornarTotalHTML(total)}
        `);
        tableHtmlBody.append(rowTotal);
    }
    else{
        console.log('No existe tag tbody...');
    }
}

function retornarTotalHTML(total){
    return `
    <td colspan="3" class="hide-cells"></td>
                <td>TOTAL</td>
                <td>${total}</td>
        `;
}

function retornarHeaderHTML(producto){
    return `
        <th>${producto[0]}</th>
        <th>${producto[1]}</th>
        <th>${producto[2]}</th>
        <th>${producto[3]}</th>
        <th>${producto[4]}</th>
        `;
}
function retornarFilaHTML(producto){
    return `    
        <td data-cell="cantidad">${producto[0]}</td>
        <td data-cell="cod">${producto[1]}</td>
        <td data-cell="descripcion">${producto[2]}</td>        
        <td data-cell="precios">${producto[3]}</td>
        <td data-cell="subtotal">${producto[4]}</td>
        `;
}

cargarNotaDePedido(notaDePedido);
cargarNombreVivero(nombreVivero);

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
    const fecha = new Date();
    
    doc.setFontSize(18);
    doc.text('Le Parc - Nota de Pedido '+'- '+fecha.toLocaleDateString(), 10, 10);
    doc.setFontSize(14);
    doc.text('Vivero: '+ nombreVivero.toString(), 10, 20);
    doc.setTextColor(100);
    doc.line(10,12,200,12);
    doc.autoTable({ startY:25, 
                    html: '.tabla-pedido',
                    headStyles: { fillColor: [155, 89, 182] } 
                });
    doc.save('notapedido_'+nombreVivero+'.pdf');
}