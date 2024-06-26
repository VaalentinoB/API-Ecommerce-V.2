const socket = io()








socket.on("products", (data) => {
    renderProductos(data);
})


const renderProductos = (data) => {
    const containerProducts = document.getElementById("containerProducts")
    containerProducts.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div")



        card.innerHTML = `
        <div class="product-card">
        <p> ${item.id} </p>
                        <p> ${item.title} </p>
                        <p> ${item.price} </p>
                        <button> Eliminar </button> 
                        </div>`

        containerProducts.appendChild(card)

        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        })



    });



}
const deleteProduct = (id) => {
    socket.emit("deleteProduct", id)

}


document.getElementById("btnEnviar").addEventListener("click", () => {
    updateProduct();
})

const updateProduct = () => {
    const NewProduct = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value,

    }
    socket.emit("updateProduct", NewProduct);
}

