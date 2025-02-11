import TravelRequest from '../models/TravelRequest.js';
import User from '../models/User.js';

// Submit new travel request
export const createTravelRequest = async (req, res) => {
  const { destination, startDate, endDate, purpose, expenseType, expense } = req.body;

  try {
    const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Get the user's name from the User schema
  const uname = user.name;
    console.log(uname);
    
    // Create a new travel request with all required fields, including the new ones
    const newRequest = new TravelRequest({
      user: req.user.id,
      userName: uname,
      destination,
      startDate,
      endDate,
      purpose,
      expenseType,   // Adding expenseType
      expense,       // Adding expense
    });

    console.log(newRequest);

    // Save the new travel request to the database
    await newRequest.save();

    // Return the created travel request in the response
    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);  // Log the error to get more details in the server logs
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get status of travel requests
export const getTravelRequestStatus = async (req, res) => {
  try {
    const requests = await TravelRequest.find({ user: req.user.id });
    console.log(requests);
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
