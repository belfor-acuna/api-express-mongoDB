import Message from "../models/messages.model.js";
import User from "../models/user.model.js";

async function createMessage(req,res){
    try{
    const inputMessage = req.body.message;
    const inputUserId = req.body.id;
    if(!inputMessage || !inputUserId){
        return res.status(400).send({error:'Es necesario completar todos los campos'});
    }
    const existingUser = await User.findById(inputUserId);
    if(existingUser){
        await Message.create({userId:inputUserId,message:inputMessage});
        return res.status(200).send({succes:true})
    }else{
        return res.status(400).send({success:false,error:"El usuario no existe"})
    }
    }
    catch(error){
        console.log(error);
        return res.status(400).send({success:false,error:error.message})

    }
    
}

async function getMessageByUser(req,res){
    try{
    const userId = req.params.userId;
    const existingUser = await User.findById(userId);
    if(existingUser){
       const messages= await Message.find({userId:userId});
        return res.status(200).send({messages})
    }else{
        return res.status(400).send({success:false,error:"Usuario no existe"})
    }
    }
    catch(error){
        console.log(error);
        return res.status(400).send({success:false,error:error.message})

    }
    
}

export {createMessage,getMessageByUser};