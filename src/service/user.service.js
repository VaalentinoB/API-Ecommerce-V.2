import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { createHash, isValidPassword } from "../util/util.js";
import cartRepository from "../repositories/cart.repository.js";

class UserService { 

    async registerUser(userData) {
        const existeUsuario = await userRepository.getUserByEmail(userData.email);
    
        if (existeUsuario) {
            throw new Error("El usuario ya existe");
        }
    
        const nuevoCarrito = await cartRepository.crearCarrito();
        console.log("Carrito DTO creado y retornado:", nuevoCarrito); 
    
        userData.cart = nuevoCarrito.id; 
        console.log("User data con carrito asignado:", userData); 
    
        userData.password = bcrypt.hashSync(userData.password, 10);
    
        const user = await userRepository.createUser(userData);
        console.log("Usuario creado:", user); 
        return user;
    }
    

//Utilizar isvalidpassword de utils
    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email);
        
        if (!user) {
            throw new Error("Credenciales incorrectas");
        }
    
        const isValidPassword = bcrypt.compareSync(password, user.password);
        
        if (!isValidPassword) {
            throw new Error("Credenciales incorrectas");
        }
        
        return user;
    }
    
    





}


export default new UserService();