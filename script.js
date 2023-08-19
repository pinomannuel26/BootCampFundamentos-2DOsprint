
import { createProduct, listProducts, updateProduct, deleteProduct } from './services/api.js';
var params = new URLSearchParams(window.location.search);
var param1 = params.get('param1');
console.log(param1)

const formulario = document.querySelector('form');
let arrProductos = [];
let editbutton = null;
let idSelectedProduct = null;

const mostrarProductos = async (fitrlo, tipo) => {

    //Utilizamos la funcion que va traer los datos de los prodcutos
    arrProductos = await listProducts();
    if (!fitrlo) {
        escribirHtml(arrProductos);
    } else {
        escribirHtmlconTipo(arrProductos,tipo)
    }
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('boton-item')) {
        idSelectedProduct = event.target.attributes['data-id'].value;
        console.log(idSelectedProduct)
        const product = arrProductos.find(item => item.id == idSelectedProduct)
        console.log(product)
    }
})

const escribirHtml = (arrProductos) => {
    let html = ``;
    arrProductos.forEach(item => {
        const div2 = `<div class="item">
                        <span class="titulo-item">${item.nombre}</span>
                        <img src="${item.imagen1}" alt="" class="img-item">
                        <span class="precio-item">${item.precio}</span>
                        <button class="boton-item" data-id="${item.id}"  >${item.descuentoPorcentaje}%</button>
                        <a href="detalles.html?param1=${item.id}+&param2=${item.nombre}+&param3=${item.precio}+&param4=${item.descuentoPorcentaje}+&param5=${item.descripcion}+&param6=${item.imagen1}+&param7=${item.imagen2}+&param8=${item.imagen3}+&param9=${item.imagen4}"  "class="btn"  >MÁS DETALLES</a>
                    </div>`
        html += div2
    });
    const div = document.getElementById('cont-items')
    div.innerHTML = html;
    editbutton = document.querySelector(".editProduct")
}

const escribirHtmlconTipo = (arrProductos,tipo) => {
    let html = ``;
    arrProductos.forEach(item => {
        if (item.tipo === tipo) {
            const div2 = `<div class="item">
            <span class="titulo-item">${item.nombre}</span>
            <img src="${item.imagen1}" alt="" class="img-item">
            <span class="precio-item">${item.precio}</span>
            <button class="boton-item" data-id="${item.id}"  >${item.descuentoPorcentaje}%</button>
            <a href="detalles.html?param1=${item.id}+&param2=${item.nombre}+&param3=${item.precio}+&param4=${item.descuentoPorcentaje}+&param5=${item.descripcion}+&param6=${item.imagen1}+&param7=${item.imagen2}+&param8=${item.imagen3}+&param9=${item.imagen4}"  "class="btn"  >MÁS DETALLES</a>
        </div>`
            html += div2
        }
    });
    const div = document.getElementById('cont-items')
    div.innerHTML = html;
    editbutton = document.querySelector(".editProduct")
}

if(param1 === null){
    mostrarProductos(false);
}else{
    mostrarProductos(true,param1);
}

