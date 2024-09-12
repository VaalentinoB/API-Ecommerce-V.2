import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";



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


async loginUser(email,password) {

    const user = await userRepository.getUserByEmail(email);
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!user || !isValidPassword) {
        throw new Error("Credenciales incorrectas");
    }
    
    return user;
}  





}


export default new UserService();