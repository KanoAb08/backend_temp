import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Employee', 'Admin'], default: 'Employee' },
  },
  { timestamps: true }
);

// Encrypt password before saving (using bcrypt)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash password with 10 rounds of salting
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords (used for login)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
const User = mongoose.model('User', userSchema);
export default User;
