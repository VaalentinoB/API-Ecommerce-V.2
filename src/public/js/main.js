const socket = io()

socket.on("productos", (data) => {
    renderProductos(data);
})