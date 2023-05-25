let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorPantalones = document.getElementById("contenedor-pantalones");
let botonesAgregar = document.querySelectorAll(".agregar");
const numeroCarrito = document.getElementById("numero-carrito");
// const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
let productosEnCarrito;

function cargarProductos() {
    productos.forEach(producto => {
        if (producto.categoria.nombre === "Pantalones") {
            let div = document.createElement("div");
            div.classList.add("prod-pantalones");
            div.innerHTML = `
                <div class="tarjeta-producto">
                    <img class="img-pantalon" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="contenedor-descripcion-producto">
                        <h3>${producto.titulo}</h3>
                        <p>Precio: ${producto.precio}</p>
                    </div>
                    <button class="agregar" id="${producto.id}">Agregar</button>
                </div>
            `;
            contenedorPantalones.append(div);
        }
    });

    actualizarBotonesAgregar();
}

cargarProductos();

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroCarrito();
} else{
    productosEnCarrito = []; 
}


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });

}


function agregarAlCarrito(e){
    Toastify({
        text: "Añadido exitosamente",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #e758a9, #f9c3d1);", /** no me toma los colores que puse */
        },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumeroCarrito() {
    let nuevoNumero = productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumero
}

const formulario = document.getElementById("formulario");
const formularioInput = document.getElementById("formulario-input");
const formularioSubmit = document.getElementById("formulario-submit");


formularioSubmit.addEventListener("click", (event) => {
    event.preventDefault();  
    Swal.fire(`Enviado correctamente a ${formularioInput.value}`);
    formulario.reset();
    formularioInput.reset()
    formularioInput.focus();

});
