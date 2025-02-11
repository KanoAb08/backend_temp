import mongoose from 'mongoose';

const travelRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName:{
    type:String
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  expenseType: {
    type: String,
    enum: ['Hotel', 'Flight', 'Both'],
    required: true
  },
  expense:
  {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }},
  { timestamps: true }
);

// Export the model
const TravelRequest = mongoose.model('TravelRequest', travelRequestSchema);
export default TravelRequest;
