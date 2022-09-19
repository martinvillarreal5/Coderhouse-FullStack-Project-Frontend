import UserRepository from '../data-access/repositories/user.js';

//Cambiar para que no devuelvan informacion delicada
const getUserById = async (id) => {
    return UserRepository.getById(id);
}

const getByUsername = async (username) => {
    return UserRepository.getByUsername(username);
}

const getUsers = async () => {
    const users = await UserRepository.getAll();
    return users
}


const saveUser = async (data) => {
    const user = data;
    //validar cada dato de arriba ? o hacer eso en la squema de moongose
    const savedUserId = UserRepository.save(user);
    return savedUserId; //return saved  id?
}

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const registerUser = async (userData) =>{
    const {username, password, email} = userData
    const newUser = {
        username: username,
        passwordHash: hashPassword(password),
        email: email,
        //firstName: req.body.firstName,
        //lastName: req.body.lastName,
    };

    const createdUser = await UserRepository.save(newUser);
    logger.info(`New User created: ${createdUser.username}, id: ${createdUser._id}`)
    return 
}

const updateUser = async (id, data) => {
    if (!data) {
        throw new Error('update user Data is empty or undefined')
    }
    //Separar en diferentes servicios, para contraseña, correo y nombres
    const updatedUserId = await UserRepository.updateById(id, data);
    return updatedUserId;
}

const deleteUser = async (id) => {
    const deletedUser = await UserRepository.deleteById(id);
    // que no devuelva info sensible
    return deletedUser;
}




export { getUsers, getUserById, getByUsername, saveUser, updateUser, deleteUser, registerUser };