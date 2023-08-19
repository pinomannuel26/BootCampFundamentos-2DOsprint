var params = new URLSearchParams(window.location.search);
var param1 = params.get('param1');
var param2 = params.get('param2');
var param3 = params.get('param3');
var param4 = params.get('param4');
var param5 = params.get('param5');
var param6 = params.get('param6');
var param6 = params.get('param6');
var param7 = params.get('param7');
var param8 = params.get('param8');
var param9 = params.get('param9');

var nombre,cantidad,precio,nombre_comprador,cedula,tarjeta_credito;
const product = {}

const MostrarElementos = () => {
    let html = ``;
    const imgs = `        
    <div class="gallery__image-container">
    <img class="gallery__previus" src="./images/icon-previous.svg" alt="previus">
    <img class="gallery__next" src="./images/icon-next.svg" alt="next">
  </div>
  <div class="gallery__thumnails">
    <img id="1" class="gallery__thumnail" src="./${param6}" alt="thumnail">
    <img id="2" class="gallery__thumnail" src="./${param7}" alt="thumnail">
    <img id="3" class="gallery__thumnail" src="./${param8}"  alt="thumnail">
    <img id="4" class="gallery__thumnail" src="./${param9}"  alt="thumnail">
  </div>`
    const div = document.getElementById('carrusel')
    div.innerHTML = imgs;
    const texto= 
            `<h2 class="details__title">${param2}</h2>
            <p class="details__description">${param5}.</p>
            <div class="details__prices">
            <p class="details__now">  ${ param3* (param4/100)} <span class="details__discount">${param4}%</span> </p>
            <p class="details__before">$${param3}</p>
            </div>
            <div class="details__product-quantity">
            <div class="input">
                <img class="input__minus" src="./images/icon-minus.svg" alt="minus">
                <input class="input__number" type="text" value="0">
                <img class="input__plus" src="./images/icon-plus.svg" alt="plus">
            </div>
            <button class="details__button"> <img src="./images/icon-cart-white.svg" alt=""> Add to cart</button>
            </div>`
    const text = document.getElementById('details')
    text.innerHTML = texto;

    const img_zoom =`        
    <img id="m1" class="modal-gallery__thumnail" src="./${param6}" alt="thumnail">
    <img id="m2" class="modal-gallery__thumnail" src="./${param7}" alt="thumnail">
    <img id="m3" class="modal-gallery__thumnail" src="./${param8}" alt="thumnail">
    <img id="m4" class="modal-gallery__thumnail" src="./${param9}" alt="thumnail">
    `
    const cont_img_zoom = document.getElementById('cont-img-zoom')
    cont_img_zoom.innerHTML = img_zoom;
}

MostrarElementos();
// Cambio de cantidad de articulos ingresado por el usuario.
const minusBtn = document.querySelector('.input__minus');
const plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click', () => {
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log(userInputNumber);
});

minusBtn.addEventListener('click', () => {
    userInputNumber--;
    if (userInputNumber <= 0) {
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    console.log(userInputNumber);
});

// Agregar el total de productos al carrito cuando se presiona el boton ADD TO CART
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', () => {
    lastValue = lastValue + userInputNumber;

    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    Swal.fire({
        title: "Añadido al carrito de compras",
        icon: 'success'
      });
    drawProductInModal();

});

//Registrar la comprar 
const addToCartCarrito = document.querySelector('.cart-modal__chekount');

document.addEventListener('click', (event) => {
    if(event.target.classList.contains('cart-modal__chekount')){
        location.href =`formulario.html?param1=${nombre}+&param2=${precio}+&param3=${cantidad}`;
    }
});

//Mostrar el modal con el detalle del carrito
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
// let priceModal = document.querySelector('.cart-modal__price');
const productContainer = document.querySelector('.cart-modal__chekout-container');

cartIconBtn.addEventListener('click', () => {
    cartModal.classList.toggle('show');

    if (lastValue === 0) {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        drawProductInModal();
    }

});

//Borrar el contenido del carrito
function deleteProduct() {
    const deleteProductBtn = document.querySelector('.cart-modal__delete');
    deleteProductBtn.addEventListener('click', () => {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
    });
}

// Cambiar imagenes cuando se presione los botones flecha.
const imageContainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previus');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', () => {
    changeNextImage(imageContainer);
});

previusGalleryBtn.addEventListener('click', () => {
    changePreviusImage(imageContainer);
});


//Mostrar el modal de imagenes cuando hago click en la imagen principal.
const imagesModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', () => {
    if (window.innerWidth >= 1115) {
        imagesModal.style.display = 'grid';
    }

});

closeModalBtn.addEventListener('click', () => {
    imagesModal.style.display = 'none';
});

//Cambiar las imagenes principales desde los thumbnails
let thumbnails = document.querySelectorAll('.gallery__thumnail')
thumbnails = [...thumbnails]
imageContainer.style.backgroundImage = `url(${param6})`
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event => {
        console.log(event.target.id)
        imageContainer.style.backgroundImage = `url('${param6.slice(0,param6.length-6)}${event.target.id.slice(-1)}.png')`
    });
});

//Cambiar las imagenes principales desde los thumbnails en el MODAL
let modalthumbnails = document.querySelectorAll('.modal-gallery__thumnail');
const modalImageContainer = document.querySelector('.modal-gallery__image-container')
modalImageContainer.style.backgroundImage = `url(${param6})`
modalthumbnails = [...modalthumbnails]

modalthumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener('click', event => {
        console.log(event.target.id.slice(-1))
        modalImageContainer.style.backgroundImage = `url('${param6.slice(0,param6.length-6)}${event.target.id.slice(-1)}.png')`
    });
});

// Cambiar imagen principal de modal desde flechas en el modal
const previusModalBtn = document.querySelector('.modal-gallery__previus');
const nextModalBtn = document.querySelector('.modal-gallery__next');

nextModalBtn.addEventListener('click', () => {
    changeNextImage(modalImageContainer);
});

previusModalBtn.addEventListener('click', () => {
    changePreviusImage(modalImageContainer);
});

// Mostrar el navbar cuando presiono el menu de hamburgesa
const hamburgerMenu = document.querySelector('.header__menu');
const modalNavbar = document.querySelector('.modal-navbar__background');
const closeModalNavbar = document.querySelector('.modal-navbar__close-icon');

modalNavbar.style.display = 'none'

hamburgerMenu.addEventListener('click', () => {
    console.log('abrir modal');
    modalNavbar.style.display = 'block';
});

closeModalNavbar.addEventListener('click', () => {
    modalNavbar.style.display = 'none';
});

// FUNCIONES
function drawProductInModal() {
    productContainer.innerHTML = `
        <div class="cart-modal__details-container">
            <img class="cart-modal__image" src="./${param6}" alt="">
            <div>
            <p class="cart-modal__product">${param2}</p>
            <p class="cart-modal__price">$125 x3 <span>$375.00</span> </p>
            </div>
            <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
        </div>
        <button class="cart-modal__chekount" >Checkout</button>`
    deleteProduct()
    let priceModal = document.querySelector('.cart-modal__price');
    priceModal.innerHTML = `${(param3*(param4/100))} x${lastValue} <span>$${lastValue * (param3*(param4/100))}</span>`;
    nombre = param2;
    precio = param3*(param4/100)
    cantidad = lastValue
}

function changeNextImage(imgContainer) {
    if (imgIndex === 4) {
        imgIndex = 1;
    } else {
        imgIndex++;
    }
    imgContainer.style.backgroundImage = `url('${param6.slice(0,param6.length-6)}${imgIndex}.png')`
}

function changePreviusImage(imgContainer) {
    if (imgIndex === 1) {
        imgIndex = 4;
    } else {
        imgIndex--;
    }
    imgContainer.style.backgroundImage = `url('${param6.slice(0,param6.length-6)}${imgIndex}.png')`
}