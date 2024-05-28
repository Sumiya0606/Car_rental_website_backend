import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    lastName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20

    },
    hashPassword:{
        type:String,
        required:true,
        minlength:8
  },
  email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  address: {
    type:String,
    default: ''
},
city: {
    type:String,
    default: ''
},
state: {
    type:String,
    default: ''
},
country: {
    type:String,
    default: ''                                                         
},
pin: {
    type: Number,
},
countryCode: {
    type: Number,
},
contactNumber: {
    type: Number,
},
profilePicture: {
    type:String,
},
role: {
    type: String,
    default: 'customer',
},
 
} ,
 { timestamps: true }
  );
  const UserModel = mongoose.model('Usermodel', userSchema);
  export default UserModel;