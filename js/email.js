// Inicializa la API de EmailJS
emailjs.init('MldhQyYtPXIoHtZqy');

// Crea un evento de escucha para el evento `click` del button-enviar-pedido    
document.getElementById("button-enviar-pedido").addEventListener("click", function (event) {
    // Detiene el envío del formulario
    event.preventDefault();

    var msg = document.getElementById("tabla-pedido");
    msg.setAttribute('style', "width: 100%; border-collapse: collapse; border: 1px solid black;font-size: 18px;color: #000;border-color: #000;");
    var params = {
        //name: document.getElementById("name").value,
        user_email: document.getElementById("user_email").value,
        message: msg.outerHTML
    };

    msg.setAttribute('style', "");

    const serviceID = "service_5y5fwyh";
    const templateID = "template_7rfcayz";

    console.log(params);

    emailjs.send(serviceID, templateID, params)
        .then(res => {            
            console.log(res);
            alert("Se ha enviado la lista de pedido!!");
        })
        .catch(err => console.log(err));
});