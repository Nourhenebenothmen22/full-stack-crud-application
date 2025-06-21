const mongoose =require('mongoose')
const userSchema=new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  hireDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports=mongoose.model('user',userSchema)
