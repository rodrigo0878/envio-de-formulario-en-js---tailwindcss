//variables
const btnEnviar = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//variables para campos del formulario
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');




eventListeners();
function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reiniciar el formulario
    resetBtn.addEventListener('click', resetearFormulario)

    //enviar email
    formulario.addEventListener('submit', enviarEmail);
    
}



//funciones

function iniciarApp(){
    //console.log('iniciando...')
    //desabilitando el boton de enviar con tailwin
    btnEnviar.disable = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');

}

//valida el formulario

function validarFormulario(e){
    //console.log(e.target.value)
    //console.log(e.target.type);
    
    
    

    
    
    
    //chequeamos que el campo este vasio con un if
    if(e.target.value.length > 0){

        //elimina los errores en la validacion de formularios
        const error =document.querySelector('p.error');
        if(error){
            error.remove();
        }
       
        //console.log('si hay algo')
        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');

    } else {
        //agrega una clase al borde al salir del campo sin escribir nada
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');
        mostrarError('todos los campos son obligatorios');
    }





    if(e.target.type ==='email'){
        //validacion de un campo email de forma profesional con una exprecion regular
        
        //validacion rustica
        //const resultado = e.target.value.indexOf('@');
        /*if(resultado < 0) {
            mostrarError('introduce un email valido')
        }*/
        if(er.test(e.target.value)){
            const error =document.querySelector('p.error');
            //error.remove();
            if(error){
                error.remove();
            }
            
            //console.log('si hay algo')
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        }else {
            
           
            //agrega una clase al borde al salir del campo sin escribir nada
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('email no valido');
        }
    }

    //hacemos un if para revisar si estan los campos llenos
    if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
        //console.log('pasaste las pruebas');
        //quitamos la clase que inabilita el boton si los campos estan llenos
        btnEnviar.disable = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }else{
        //reponemos la clase si existen campos vacios
        btnEnviar.disable = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    }

    
}

function enviarEmail(e){
    e.preventDefault();
    
    //console.log('enviando..');

    //mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display ='flex';

    /*set interval se ejecuta cada sierto segundos que le pongamos
    setInterval(() => {
        console.log('se ejecuta cada intervalos de 2 segundos)
    }, 2000);*/ 
    
    setTimeout(() => {
        //console.log('esta funcion se ejecuta dentro de 3 segundos')    
        spinner.style.display ='none';

        //mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'el mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10','p-2', 'bg-green-500','text-white','font-bold','uppercase')

        //inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner)
        setTimeout(() => {
            parrafo.remove();//elimina el mensaje de exito
            
            formulario.reset();
            //reiniciamos la app
            iniciarApp()

        }, 5000);
    }, 3000);
}

//function que resetea formulario
function resetearFormulario(){
    e.preventDefault()

    //spinner.remove();
    
   
    //reseteamos el formulario
    formulario.reset();
    //reiniciamos la app
    iniciarApp()
}


function mostrarError(mensaje){
    //creamos el parrafo en el html
    const mensajeError = document.createElement('p');
    //le agregamos texto al parrafo que se mostrara en el html
    mensajeError.textContent = mensaje;
    //le agregamos una clase para que se vea bonito
    mensajeError.classList.add('border','border-red-500', 'background-red-100', 'text-red-500', 'p-3','mt-5','text-center', 'error');

    const errorres = document.querySelectorAll('.error')
    if(errorres.length === 0 ){
        //agregando un hijo nuevo al formulario
        formulario.appendChild(mensajeError);
    }
    
    
}
