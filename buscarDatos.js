//import { datos } from './jADatos.js'; SACAMOS ESTE Y PROBAMOS CON EL FETCH
import datos from './jADatos.js';

//buscamos el id y ponemos el titulo
export function buscarId(id) {
    const found = datos.find(elem => elem.Artículo == id);

    return found.Descripción;
};



//buscamos el id y ponemos el dolar
export function buscarIdDol(id) {
    const found = datos.find(elem => elem.Artículo == id);

    return found.DOLAR;
};


//buscamos el id y ponemos el precio
export function buscarIdPrecio(id) {
    const found = datos.find(elem => elem.Artículo == id);
    //buscamos el  valor del dolar en el array

    //reemplazamos las , por .
    var precioConPuntos = (found.Venta.replace(/,/g, "."));
    //((new Intl.NumberFormat('es-Mx').format(found.Venta.replace(/,/g, ".")*found.DOLAR)))

    return (precioConPuntos);
};


//buscamos el stock
export function buscarStock(id) {
    const found = datos.find(elem => elem.Artículo == id);

    return found.Inventario;
};


//buscamos si tienen descuentos
//los numeros vienen con "," y hay q pasarlos a "." y multiplicar x100
export function buscarDescuento(id) {
    const found = datos.find(elem => elem.Artículo == id);
    let valor = ((found.Descuento.replace(/,/g, ".")) * 100)
    return valor
};


