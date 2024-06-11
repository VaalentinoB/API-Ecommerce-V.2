import fs from 'fs';
import path from 'path';

const cartsFilePath = path.resolve('data/carts.json');
let carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
const products = JSON.parse(fs.readFileSync(path.resolve('data/products.json'), 'utf-8'));

export const createCart = (req, res) => {
    const newCart = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products: []
    };
    carts.push(newCart);
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
};

export const getCartById = (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Cart not found');
    }
};

export const addProductToCart = (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (!cart) {
        return res.status(404).send('Cart not found');
    }

    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (!product) {
        return res.status(404).send('Product not found');
    }

    const cartProduct = cart.products.find(p => p.product === product.id);
    if (cartProduct) {
        cartProduct.quantity += 1;
    } else {
        cart.products.push({ product: product.id, quantity: 1 });
    }

    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.status(201).json(cart);
};
