export const createProduct = async (product) =>{
    try{
        const response = await fetch('http://localhost:3000/compras',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(product)
        });
        const  productos = await response.json();
        return productos
    }catch(e){
        console.log("Error",e)
    }
}

export const updateProduct = async(product) =>{
    try{
        const response = await fetch(`http://localhost:3000/usuarios/${product.id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(product)
        });
        const  productos = await response.json();
        return productos
    }catch(e){
        console.log("Error",e)
    }
}

export const listProducts = async () =>{
    try{
        const response = await fetch('http://localhost:3000/productos');
        const productsData = await response.json();
        return productsData;
    }catch(e){
        console.log("Error",e)
    }
}
export const listaProducts = async () =>{
    try{
        const response = await fetch('http://localhost:3000/productos');
        const productsData = await response.json();
        return productsData;
    }catch(e){
        console.log("Error",e)
    }
}
export const deleteProduct = async (id) =>{
    try{
        const response = await fetch(`http://localhost:3000/usuarios/${id}`,{
            method: 'DELETE',
        });
        const  productos = await response.json();
        return productos
    }catch(e){
        console.log("Error",e)
    }
}