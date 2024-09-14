import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { createHash, isValidPassword } from "../util/util.js";


class UserService { 

    async registerUser(userData) {

        const existeUsuario = await userRepository.getUserByEmail(userData.email);

        if (existeUsuario) {
            throw new Error("El usuario ya existe");
        }
        userData.password = bcrypt.hashSync(userData.password, 10);
        
    const user = await userRepository.createUser(userData);
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