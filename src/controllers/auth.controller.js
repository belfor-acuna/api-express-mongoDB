import User from "../models/user.model.js";
import bcrypt from "bcrypt";

async function registerUser(req, res) {
    try {
        const userName = req.body.name;
        const userEmail = req.body.email;
        const userDni = req.body.dni;
        const password = req.body.password;
        const userPassword = bcrypt.hashSync(password, 2);
        if (!userName) { return res.status(400).send({ success: false, error: 'Falta campo nombre' }); }
        if (!userEmail) { return res.status(400).send({ success: false, error: 'Falta campo email' }) }
        if (!userDni) { return res.status(400).send({ success: false, error: 'Falta campo dni' }) }
        if (!password) { return res.status(400).send({ success: false, error: 'Falta campo contraseña' }) }
        await User.create({
            name: userName,
            email: userEmail,
            dni: userDni,
            password: userPassword,
        });
        return res.status(201).send({
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ succes: false, error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const inputEmail = req.body.email;
        const inputPassword = req.body.password;
        const existingUser = await User.findOne({ email: inputEmail });
        if (!inputEmail) {
            return res.status(400).send({ error: 'Falta campo email' });
        }
        if (!inputPassword) {
            return   res.status(400).send({ error: 'Falta campo password' });
        }
        if (!existingUser) {
            return res.status(404).send({ logged: false });

        }
        const isMatch = await bcrypt.compare(inputPassword,existingUser.password)
        if(isMatch){
            return  res.status(200).send({logged:true});
        }else{
            return  res.status(401).send({ logged:false });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}


export { registerUser, loginUser }