import fs from 'fs';
import path from 'path';

const productsFilePath = path.resolve('data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

export const getAllProducts = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
};

export const getProductById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
};

export const createProduct = (req, res) => {
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        ...req.body,
        status: req.body.status !== undefined ? req.body.status : true
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.pid));
    if (index !== -1) {
        const updatedProduct = { ...products[index], ...req.body };
        products[index] = updatedProduct;
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
};

export const deleteProduct = (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.pid));
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.json(deletedProduct);
    } else {
        res.status(404).send('Product not found');
    }
};