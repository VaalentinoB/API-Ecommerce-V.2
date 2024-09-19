document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Escucha cuando se envíen productos desde el servidor
    socket.on("productos", (data) => {
        console.log("Productos recibidos del servidor:", data);
        renderProductos(data);
    });

    // Renderizar productos en el DOM
    const renderProductos = (data) => {
        const container = document.getElementById("container");
        if (container) {
            container.innerHTML = "";

            data.docs.forEach(item => {
                const card = document.createElement("div");
                card.innerHTML = `
                    <p><strong>ID:</strong> ${item._id}</p>
                    <p><strong>Título:</strong> ${item.title}</p>
                    <p><strong>Descripción:</strong> ${item.description}</p>
                    <p><strong>Precio:</strong> $${item.price}</p>
                    <p><strong>Imágenes:</strong> ${item.thumbnails}</p>
                    <p><strong>Código:</strong> ${item.code}</p>
                    <p><strong>Stock:</strong> ${item.stock}</p>
                    <p><strong>Categoría:</strong> ${item.category}</p>
                    <p><strong>Status:</strong> ${item.status ? "Activo" : "Inactivo"}</p>
                    <button class="btnEliminar" data-id="${item._id}">Eliminar</button>
                `;
                container.appendChild(card);

                const eliminarButton = card.querySelector(".btnEliminar");
                eliminarButton.addEventListener("click", () => {
                    const id = eliminarButton.getAttribute("data-id");
                    eliminarProducto(id);
                });
            });
        } else {
            console.error("No se encontró el contenedor en el DOM.");
        }
    };

   

    const agregarProducto = () => {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const price = parseFloat(document.getElementById("price").value);
        const thumbnails = document.getElementById("thumbnails").value.split(','); // Asegúrate de manejar bien los thumbnails
        const code = document.getElementById("code").value;
        const stock = parseInt(document.getElementById("stock").value, 10);
        const category = document.getElementById("category").value;
        const status = document.getElementById("status").value === "true";

        if (!title || !description || isNaN(price) || isNaN(stock) || !code || !category) {
            alert("Todos los campos deben estar completos y en formato correcto.");
            return;
        }

        const producto = {
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status,
        };

        socket.emit("agregarProducto", producto);

        document.getElementById("title").value = '';
        document.getElementById("description").value = '';
        document.getElementById("price").value = '';
        document.getElementById("thumbnails").value = '';
        document.getElementById("code").value = '';
        document.getElementById("stock").value = '';
        document.getElementById("category").value = '';
        document.getElementById("status").value = 'true';
    };
});

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
};

const btnEnviar = document.getElementById("btnEnviar");
btnEnviar.addEventListener("click", () => {
    agregarProducto();
});
