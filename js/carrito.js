let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const carritoVacio = document.getElementById("carrito-vacio");

const productosCarrito = document.getElementById("productos-carrito");

const accionesCarrito = document.getElementById("acciones-carrito")

let botonesEliminar = document.querySelectorAll("eliminar-articulo");

const botonVaciar = document.getElementById("vaciar-carrito");
const contenedorTotal = document.getElementById("total");
const botonComprar = document.getElementById("btn-comprar");
const compraHecha = document.getElementById("compra-hecha");

const numeroCarrito = document.getElementById("numero-carrito")

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".eliminar-articulo");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

}

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        productosCarrito.classList.remove("disabled");
        accionesCarrito.classList.remove("disabled");
        compraHecha.classList.add("disabled");

        productosCarrito.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div")
            div.classList.add("producto-carrito")
            div.innerHTML = `
            <img class="imagen-carrito" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-carrito">
                <h3>${producto.titulo}</h3>
            </div>
            <div class="producto-carrito-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="producto-carrito-precio">
                <small>Precio:</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="eliminar-articulo" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            `

            productosCarrito.append(div);
        });
    
    } else{
        carritoVacio.classList.remove("disabled");
        productosCarrito.classList.add("disabled");
        accionesCarrito.classList.add("disabled");
        compraHecha.classList.add("disabled");
    };

    actualizarBotonesEliminar();
    actualizarTotal();
    actualizarNumeroCarrito();
};

cargarProductosCarrito();

function eliminarDelCarrito(e){
    Toastify({
        text: "Producto Eliminado",
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


    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();


    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    actualizarNumeroCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: 'Estas seguro?',
        text: "Se eliminarán todos los productos.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, seguro'
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
            actualizarNumeroCarrito();
            Swal.fire(
                'Listo',
                'Se eliminaron tus productos.',
                'success'
            )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire(
              'Cancelado',
            )
          }
      }) 
   
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    carritoVacio.classList.add("disabled");
    productosCarrito.classList.add("disabled");
    accionesCarrito.classList.add("disabled");
    compraHecha.classList.remove("disabled");

    actualizarNumeroCarrito();

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
