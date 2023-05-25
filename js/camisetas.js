let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorCamisetas = document.getElementById("contenedor-camisetas");
let botonesAgregar = document.querySelectorAll(".agregar");
const numeroCarrito = document.getElementById("numero-carrito");
// const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


let productosEnCarrito;

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroCarrito();
} else{
    productosEnCarrito = []; 
}

function cargarProductos() {
    productos.forEach(producto => {
        if (producto.categoria.nombre === "Camisetas") {
            let div = document.createElement("div");
            div.classList.add("prod-camisetas");
            div.innerHTML = `
                <div class="tarjeta-producto">
                    <img class="img-camiseta" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="contenedor-descripcion-producto">
                        <h3>${producto.titulo}</h3>
                        <p>Precio: ${producto.precio}</p>
                    </div>
                    <button class="agregar" id="${producto.id}">Agregar</button>
                </div>
            `;
            contenedorCamisetas.append(div);
        }
    });

    actualizarBotonesAgregar();
}

cargarProductos();

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
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #e758a9, #f9c3d1);",
        },
        onClick: function(){} // Callback after click
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

function actualizarNumeroCarrito () {
    let nuevoNumero = productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = `${nuevoNumero}`
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
