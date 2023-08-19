var params = new URLSearchParams(window.location.search);
var nombre = params.get('param1');
var precio = params.get('param2');
var cantidad = params.get('param3');


let formulario = document.getElementById('formulario')
let btnCorreo = document.getElementById('btnCorreo')
let btnEditar = document.getElementById('btnEditar')
let btnEliminar = document.getElementById('btnEliminar')

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('id').style.display ='none'
    document.getElementById('label-edit').style.display ='none'
    document.getElementById('id').readOnly = true

    document.getElementById('nameProducto').style.display ='none'
    document.getElementById('label-nameProducto').style.display ='none'
    document.getElementById('nameProducto').readOnly = true

    document.getElementById('cantidadProducto').style.display ='none'
    document.getElementById('label-cantidadProducto').style.display ='none'
    document.getElementById('cantidadProducto').readOnly = true
    
    document.getElementById('precioProducto').style.display ='none'
    document.getElementById('label-precioProducto').style.display ='none'
    document.getElementById('precioProducto').readOnly = true
   
    document.getElementById('precioProductoT').style.display ='none'
    document.getElementById('label-precioProductoT').style.display ='none'
    document.getElementById('precioProductoT').readOnly = true
})
let email = document.getElementById('email')

email.addEventListener('input', ()=>{
    document.getElementById('id').style.display ='none'
    document.getElementById('label-edit').style.display ='none'
})

formulario.addEventListener('submit', async e =>{
    e.preventDefault()
    
    let name = document.getElementById('name').value
    let lastname = document.getElementById('lastName').value
    let email = document.getElementById('email').value
    let targeta = document.getElementById('targeta').value

    resp = await fetch('http://localhost:3000/ventas/',{
        method: 'POST',
        body: JSON.stringify({
            Nombre_producto: nombre,
            precio_unidad: precio,
            cantidad: cantidad,
            nombre_comprador: name,
            apellido: lastname,
            correo: email,
            n_targeta: targeta,
            precio_total: (precio * cantidad)
            
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
            
        }
    })
    
    console.log(resp);
    data = resp.json()
    console.log(data);
    

})

btnCorreo.addEventListener('click', async () => {

    document.getElementById('id').style.display = 'block'
    document.getElementById('label-edit').style.display = 'block'

    document.getElementById('nameProducto').style.display = 'block'
    document.getElementById('label-nameProducto').style.display = 'block'

    document.getElementById('cantidadProducto').style.display = 'block'
    document.getElementById('label-cantidadProducto').style.display = 'block'

    document.getElementById('precioProducto').style.display = 'block'
    document.getElementById('label-precioProducto').style.display = 'block'
    
    document.getElementById('precioProductoT').style.display = 'block'
    document.getElementById('label-precioProductoT').style.display = 'block'
    let email = document.getElementById('email').value

    let resp = await fetch('http://localhost:3000/ventas')
    let data = await resp.json()

    let modificar = data.find(user => user.correo === email)
    console.log(modificar);

    const { nombre_comprador, apellido, correo, n_targeta, id, Nombre_producto, cantidad, precio_unidad, precio_total } = modificar

    document.getElementById('name').value = nombre_comprador
    document.getElementById('lastName').value = apellido
    document.getElementById('email').value = correo
    document.getElementById('id').value = id
    document.getElementById('targeta').value =n_targeta
    document.getElementById('nameProducto').value=Nombre_producto
    document.getElementById('cantidadProducto').value = cantidad
    document.getElementById('precioProducto').value=precio_unidad
    document.getElementById('precioProductoT').value=precio_total
   
})

btnEditar.addEventListener('click', async () => {
    let idModificar = document.getElementById('id').value
    let nameModificar = document.getElementById('name').value
    let lastNameModificar = document.getElementById('lastName').value
    let emailModificar = document.getElementById('email').value
    let targeta = document.getElementById('targeta').value
    let nomProduct = document.getElementById('nameProducto').value   
    let cantidad = document.getElementById('cantidadProducto').value 
    let precio=  document.getElementById('precioProducto').value
    let precioTotal = document.getElementById('precioProductoT').value

    let resp = await fetch(`http://localhost:3000/ventas/${idModificar}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: idModificar,
            nombre_comprador: nameModificar,
            apellido: lastNameModificar,
            correo: emailModificar,
            n_targeta: targeta,
            precio_unidad: precio,
            Nombre_producto: nomProduct,
            cantidad:cantidad,
            precio_total: precioTotal
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    let data = resp.json()
    console.log(data);
})

btnEliminar.addEventListener('click',()=>{

    let idEliminar = document.getElementById('id').value 
    console.log(idEliminar)
    let resp = fetch(`http://localhost:3000/ventas/${idEliminar}`,{
        method: 'DELETE'
    })
    let data = resp.json()
    console.log(data);
})
