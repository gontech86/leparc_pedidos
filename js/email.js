(function () {
    // Inicializa la API de EmailJS
    emailjs.init('MldhQyYtPXIoHtZqy');

    // Crea un evento de escucha para el evento `submit` del formulario `contact-form`
    //document.getElementById('contact-form').addEventListener('submit', function (event) {
        document.getElementById("button-enviar-pedido").addEventListener("click", function (event) {
        // Detiene el envío del formulario
        event.preventDefault();

        // Genera un número de teléfono de cinco dígitos aleatorio para la variable `contact_number`
        //this.contact_number.value = Math.random() * 100000 | 0;
        //this.message.value = document.getElementById('tabla-pedido').innerHTML;

        // Envía el formulario a través de la API de EmailJS
        /*emailjs.sendForm('service_5y5fwyh', 'contact_form', this)
            .then(function () {
                console.log('SUCCESS!');
            })
            .catch(function (error) {
                console.log('FAILED...', error);
            });*/
        var msg = document.getElementById("tabla-pedido");
        msg.setAttribute('style', "width: 100%; border-collapse: collapse; border: 1px solid black;font-size: 18px;color: #000;border-color: #000;background-color: #ccc;");
        var params = {
            //name: document.getElementById("name").value,
            user_email: document.getElementById("user_email").value,
            message: msg.outerHTML
        };

        const serviceID = "service_5y5fwyh";
        const templateID = "template_7rfcayz";

        console.log(params);

        emailjs.send(serviceID, templateID, params)
            .then(res => {
                //document.getElementById("name").value = "";
                //document.getElementById("email").value = "";
                //document.getElementById("message").value = "";
                console.log(res);
                //alert("Se ha enviado la lista de pedido!!")

            })
            .catch(err => console.log(err));
        
    });

})();