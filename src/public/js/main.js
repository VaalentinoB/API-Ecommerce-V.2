const socket = io()








socket.on("products", (data) => {
    renderProductos(data);
})


const renderProductos = (data) => {
    const containerProducts = document.getElementById("containerProducts")


    data.forEach(item => {
        const card = document.createElement("div")



        card.innerHTML = `<p> ${item.id} </p>
                        <p> ${item.title} </p>
                        <p> ${item.price} </p>
                        <button> Eliminar </button> `

        containerProducts.appendChild(card)
    });



}