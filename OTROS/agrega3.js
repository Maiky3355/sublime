
let fragmento3 = document.createDocumentFragment();
let fragmento4 = document.createDocumentFragment();


//cargamos los template del html y creamos los fragmentos
let template = document.getElementById("contTemplate").content;
let fragmento = document.createDocumentFragment();

let template2 = document.getElementById("contTemplate2").content;
let fragmento2 = document.createDocumentFragment();


//creamos un array para guardar los intereses
var interesAgregado = [];

//creamos un array para guardar los precios
let interesPrecioAgregado = [];


//creamos el array con los datos
import data from '../articulos.json' with { type: 'json' };


const datos = Array.from(data);


console.log(datos);


let contenedorId = 0;
//por cada uno de los conjuntos de datos agregamos las variantes de cada etiqueta
datos.forEach((datos) => {

    if (datos.Inventario >=1){
    template.querySelector(".esteSi").setAttribute("id", contenedorId);

    template2.querySelector("img").setAttribute("src", datos.img);
    template2.querySelector("h5").textContent = (datos.Descripción);
    template2.querySelector("p").textContent = (datos.Categoria);
    var precioCatalogo= ("$"+(new Intl.NumberFormat('es-Mx').format(datos.Venta.replace(/,/g, ".")* datos.DOLAR)));
    template2.querySelector("small").textContent = (precioCatalogo);
    template2.querySelector("button").setAttribute("id","idbot"+(datos.Artículo));

    //hacemos un clon y lo subimos al fragmento correspondiente para poder repetirlo. clone 1 contenedor . clone 2 etiquetas restantes
    let clone = document.importNode(template, true);
    fragmento.appendChild(clone);

    let clone2 = document.importNode(template2, true);
    fragmento2.appendChild(clone2);

}


});

document.body.appendChild(fragmento);//agregamos el contenedor padre
document.getElementById(contenedorId).appendChild(fragmento2); //agregamos las cards


let totalCarritoNavb = document.getElementById("totalCarritoNavb");
//cargamos a interes la etiqueta donde mostraremos el titulo de producto
const interes = document.getElementById("interes");

//cargamos a interes2 la etiqueta donde mostraremos el precio unitario
const interes2 = document.getElementById("interes2");


//cargamos a interes2 la etiqueta donde mostraremos la cantidad
const interes3 = document.getElementById("interes3");

//cargamos a interes2 la etiqueta donde mostraremos el precio total
const intprecioTotal = document.getElementById("precioTotal");
escucharBotones();










//ponemos a escuchar todos los botones y mandamos a agregar los datos
function escucharBotones(){
const btns = document.querySelectorAll('button[id^=idbot]');

btns.forEach(btn => {



    btn.addEventListener('click', event => {


        var da = event.target.id;

var regex = /(\d+)/g;
var da2= (da.match(regex));



        var tit = buscarId(parseInt(da2));
        var pre = buscarIdPrecio(parseInt(da2));

        agregar(tit);
        agregarP(pre);
        agregarC();
        EliminarV();
        total();
        // let sumaTotal = 0;
        // interesPrecioAgregado.forEach(tot => {

        //     sumaTotal += Number(tot);


        //     intprecioTotal.textContent = "PRECIO TOTAL: $ " + sumaTotal;
        // });

    });

});

};









//buscamos el id y ponemos el titulo
function buscarId(id) {
    const found = datos.find(elem => elem.Artículo == id);

    return found.Descripción;
};

//buscamos el id y ponemos el precio
function buscarIdPrecio(id) {
    const found = datos.find(elem => elem.Artículo == id);
    //buscamos el  valor del dolar en el array
    
//reemplazamos las , por .
  var precioConPuntos = (found.Venta.replace(/,/g, "."));
  //((new Intl.NumberFormat('es-Mx').format(found.Venta.replace(/,/g, ".")*found.DOLAR)))
    
    return (precioConPuntos);
};




//agregamos a la lista el titulo a precionar de cada boton
function agregar(da) {

    console.log(interesAgregado);
    interesAgregado.push(da);
    actualizarEnlaceWhatsApp();
    let suceso = "Se agrego al carrito";
    let tipoAlert = "alert-success";
    alertAgrego(da, suceso, tipoAlert);


    const conjuntoExistente = new Set();

    interesAgregado.forEach(ia => {

        const parrafoExistente = Array.from(interes.getElementsByTagName("p")).find(
            parrafo => parrafo.textContent === ia);

        if (parrafoExistente) {
            parrafoExistente.textContent = ia;

        }
        else {
            const parrafo = document.createElement("p");
            parrafo.textContent = ia;
            interes.appendChild(parrafo);
        };
    });

};




//calculamos el precio total y lo mostramos en canvas
function total() {

    let sumaTotal = 0;
    interesPrecioAgregado.forEach(tot => {

        sumaTotal += Number(tot);


    });
    intprecioTotal.textContent = "PRECIO TOTAL: $ " + sumaTotal.toFixed(2);
    totalCarritoNavb.textContent = "$ " + sumaTotal.toFixed(2);
};




//agregamos el precio unitario
function agregarP(da) {

    interesPrecioAgregado.push(da);
    
    const conjuntoExistente = new Set();

    interesPrecioAgregado.forEach(ia => {
        const parrafoExistente = Array.from(interes2.getElementsByTagName("p")).find(
            parrafo => parrafo.textContent === ia
        );

        if (parrafoExistente) {
            parrafoExistente.textContent = ia; //aca multiplicar
        } else {
            const parrafo = document.createElement("p");
            parrafo.textContent = ia;
            interes2.appendChild(parrafo);
        }

        conjuntoExistente.add(ia); // Agregar el valor al conjunto existente
    });

    // Eliminar los párrafos sobrantes del contenedor
    Array.from(interes2.getElementsByTagName("p")).forEach(parrafo => {
        if (!conjuntoExistente.has(parrafo.textContent)) {
            interes2.removeChild(parrafo);

        };
    });
};







//agregamos la cantidad de cada producto

function agregarC() {

    const repeticionesMap = new Map();

    interesAgregado.forEach(dato => {
        if (repeticionesMap.has(dato)) {
            // Incrementar la cantidad de repeticiones para el dato existente
            repeticionesMap.set(dato, repeticionesMap.get(dato) + 1);
        } else {
            // Inicializar la cantidad de repeticiones para un nuevo dato
            repeticionesMap.set(dato, 1);
        };
    });

    // Crear el contenido para el párrafo interes3
    let contenidoInteres3 = "";
    repeticionesMap.forEach((repeticiones, dato) => {
        contenidoInteres3 += `<p id="${dato}"> ${repeticiones}</p>`;
    });

    // Agregar o reemplazar el contenido en el elemento con id="interes3"
    interes3.innerHTML = contenidoInteres3;
};













//cargamos los valores de canvas y botones

let canvasInteres = document.getElementById("offcanvasDark");

let botonInteres = document.getElementById("listaInteres");

//cambiamos el hide por show del canvas al apretar boton
botonInteres.addEventListener("click", event => {

    canvasInteres.classList.remove("hide", "show");

    canvasInteres.classList.add("show");


});

//cambiamos el show por hide al apretar la x cerrar del canvas
let botonInteresC = document.getElementById("cerrarCanvas");

botonInteresC.addEventListener("click", event2 => {

    canvasInteres.classList.replace("show", "hide");

});





//eliminamos las ventas que tocamos
function EliminarV() {


    const parrafos = interes.querySelectorAll('p');

    parrafos.forEach(parrafo => {
        parrafo.addEventListener('click', event => {
            // const dato = parrafo.textContent;
            const dato = event.target.textContent;
            //hacemos visible el alert con su titulo y color
            let suceso = "Se elimino del carrito";
            let tipoAlert = "alert-danger";
            alertAgrego(dato, suceso, tipoAlert);

            const index = interesAgregado.indexOf(dato);


            if (index > -1) {

                interesAgregado.splice(index, 1);
                interesPrecioAgregado.splice(index, 1);

                actualizarCarrito();
                actualizarEnlaceWhatsApp();
                
            }
            else {
                console.log("no se elimino");

            };


            // Eliminar el elemento <p> del contenedor
            parrafo.parentNode.removeChild(parrafo);
        });
    });


};





//actualizamos el carrito

function actualizarCarrito() {

    total();
    agregarC();
    const conjuntoExistente = new Set();

    interesPrecioAgregado.forEach(ia => {
        const parrafoExistente = Array.from(interes2.getElementsByTagName("p")).find(
            parrafo => parrafo.textContent === ia
        );

        if (parrafoExistente) {
            parrafoExistente.textContent = ia;
        } else {
            const parrafo = document.createElement("p");
            parrafo.textContent = ia;
            interes2.appendChild(parrafo);
        }

        conjuntoExistente.add(ia); // Agregar el valor al conjunto existente
    });

    // Eliminar los párrafos sobrantes del contenedor
    Array.from(interes2.getElementsByTagName("p")).forEach(parrafo => {
        if (!conjuntoExistente.has(parrafo.textContent)) {
            interes2.removeChild(parrafo);

        };
    });
};



//funcion alert personalizada

function alertAgrego(titAlert, suceso, tipoAlert) {
    //ponemos el titulo del producto en el alert
    let alertTitulo = document.getElementById("alertTit");
    alertTitulo.textContent = `${titAlert} `;

    //ponemos el suceso del alert- sea danger o sucess
    let alertSuceso = document.getElementById("alertSuceso");
    alertSuceso.textContent = `${suceso} `;

    let alertAgrego = document.getElementById("alertAgrego");
    //hacemos el alert visible 
    alertAgrego.classList.remove("hide", "show");
    alertAgrego.style.cssText='z-index: -50 !important;';

    alertAgrego.classList.remove("alert-success", "alert-danger");
    alertAgrego.classList.add(tipoAlert);

    alertAgrego.classList.add("show");
    alertAgrego.style.cssText='z-index: 50 !important;';
    //Colocamos el timpo del alert antes de desactivarse
    setTimeout(() => {
        alertAgrego.classList.remove("hide", "show");
        alertAgrego.style.cssText='z-index: -50 !important;';
        alertAgrego.classList.add("hide");


    }, 2000);





function cargarDatosBack(){

    
}
};




















// Función para generar el enlace de WhatsApp
function generarEnlaceWhatsApp() {
    const telefono = "5491125275189"; // Reemplaza con el número de teléfono deseado
  
    // Objeto para realizar el seguimiento de los elementos duplicados
    const duplicados = {};
    const preciosMultiplicados = {}; // Objeto para almacenar los precios multiplicados
  
    // Recorrer el array y contar los elementos duplicados
    interesAgregado.forEach((item, index) => {
      if (duplicados[item]) {
        duplicados[item].cantidad += 1;
      } else {
        duplicados[item] = { cantidad: 1, index: index };
      }
    });
  
    // Construir el texto del mensaje con la información de los duplicados y los precios
    let textoCarrito = "Hola! Me interesan estos productos de la web:\n\n";
    Object.keys(duplicados).forEach(item => {
      const { cantidad, index } = duplicados[item];
      const precio = (interesPrecioAgregado[index] * cantidad).toFixed(2);
  
      textoCarrito += `${item} (x${cantidad}) - Precio: ${precio}, \n\n`; // Agregar un salto de línea adicional
  
      preciosMultiplicados[index] = precio; // Almacenar el precio multiplicado en el objeto preciosMultiplicados
    });
  
    const enlace = `https://wa.me/${telefono}/?text=${encodeURIComponent(textoCarrito)}`;
    return enlace;
  }

// Función para actualizar el enlace de WhatsApp
function actualizarEnlaceWhatsApp() {
  const enlace = generarEnlaceWhatsApp();


  enlaceWhatsApp.setAttribute("href", enlace);
  enlaceWhatsApp.style.cssText= '  font-weight: bold;font-size: 17px; color: yellow;   background-color: rgb(10, 100, 10);';

}

// Agregamos el enlace de WhatsApp al documento
const enlaceWhatsApp = document.createElement("a");
enlaceWhatsApp.addEventListener('click', function(event) {
  event.preventDefault(); // Evita la redirección
  window.open(enlaceWhatsApp.getAttribute("href"), '_blank');
});
enlaceWhatsApp.textContent = "Mandar carrito por WhatsApp";
document.getElementById("whats").appendChild(enlaceWhatsApp);

// Ejemplo de modificación del array y actualización del enlace

actualizarEnlaceWhatsApp(); // Actualizar el enlace

















  //buscador

    const formulario= document.querySelector('#formulario');

    const filtrar = () =>{
        console.log("se busco:"+formulario.value)

const texto= formulario.value.toLowerCase();
for(let producto of datos){


let Descripcion= producto.Descripción.toLowerCase();

if(Descripcion.indexOf(texto) !== -1 && producto.Inventario >=1){
 
const element = document.querySelector(".esteSi");
element.remove();




template.querySelector('.esteSi').setAttribute("id", contenedorId);

template2.querySelector("img").setAttribute("src", producto.img);
template2.querySelector("h5").textContent = (producto.Descripción);
template2.querySelector("p").textContent = (producto.Categoria);
var precioCatalogo= ("$"+(new Intl.NumberFormat('es-Mx').format(producto.Venta.replace(/,/g, ".")* producto.DOLAR)));
template2.querySelector("small").textContent = (precioCatalogo);
template2.querySelector("button").setAttribute("id","idbot"+(producto.Artículo));

//hacemos un clon y lo subimos al fragmento correspondiente para poder repetirlo. clone 1 contenedor . clone 2 etiquetas restantes

let clone = document.importNode(template, true);
fragmento3.appendChild(clone);

let clone2 = document.importNode(template2, true);
fragmento4.appendChild(clone2);

}
document.body.appendChild(fragmento3);//agregamos el contenedor padre



}
document.getElementById(contenedorId).appendChild(fragmento4); //agregamos las cards

escucharBotones();
subir();
    };

formulario.addEventListener('keydown', filtrar);
formulario.addEventListener('click', filtrar);
formulario.addEventListener('change', filtrar);
formulario.addEventListener('inputType', filtrar);


function subir(){
    console.log(interesAgregado);
 
      window.scrollTo({
        top:0, behavior:"smooth"
      })
    }
  

    