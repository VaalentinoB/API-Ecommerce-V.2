import userDao from "../dao/user.dao.js";
import UsuarioModel from "../models/usuario.model.js";

class UserRepository {
    async createUser(userData) {
        try {
            const newUser = new UsuarioModel(userData);
            const savedUser = await newUser.save();
            console.log("Usuario guardado en UserRepository:", savedUser);
            return savedUser;
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            throw error;
        }
    }

    async getUserbyId(id) {
        return await userDao.findById(id)
    }

    async getUserByEmail(email) {
        return await userDao.findOne({ email })
    }
}

export default new UserRepository();