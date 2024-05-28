import UserModel from "../models/userModel.js";

//get all users
export const getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    res.send(users);
  };
  //update user roll as admin
  export const carRental_Admin_User_Role_Update = async(req, res)=>{
    const {role}=req.body;
    const id=req.params.id;
    console.log(id)

const updateduser = await UserModel.findOneAndUpdate(
    { _id: id },
    { role },
    {
      new: true,
    }
  );
  if (!updateduser) {
    return res.send("USer is not updated");
  }
  console.log(updateduser);
  return res.send(updateduser);
}
//delete a user
export const carRental_Admin_Delete_User_Account = async(req, res)=>{
    const user = await UserModel.findById(req.params.id);

    if(!user) {
        return res.send(`User doesn't exist with id: ${req.params.id}`, 404)
    }

    await UserModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        success: true
    });
}