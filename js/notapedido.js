function activarBotonNotaPedido() {
    const botonNotaPedido = document.getElementById("btnNotaPedido");

    if (botonNotaPedido !== null) {
        botonNotaPedido.addEventListener("click", () => {
            generarNotaDePedido();
        });
    }
}

function generarNotaDePedido(){

}

activarBotonNotaPedido();