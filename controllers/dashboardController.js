import TravelRequest from '../models/TravelRequest.js';

export const getDashboardData = async (req, res) => {
  try {
    // Total expense for accepted requests (for all users)
    const totalExpense = await TravelRequest.aggregate([
      { $match: { status: 'Approved' } },
      { $group: { _id: null, total: { $sum: '$expense' } } }
    ]);

    // Total number of requests made (for all users)
    const totalRequests = await TravelRequest.countDocuments();

    // Total accepted requests (for all users)
    const totalAcceptedRequests = await TravelRequest.countDocuments({
      status: 'Approved'
    });

    // Total pending requests (for all users)
    const totalPendingRequests = await TravelRequest.countDocuments({
      status: 'Pending'
    });

    res.json({
      totalExpense: totalExpense.length > 0 ? totalExpense[0].total : 0,  // If no accepted requests, set expense to 0
      totalRequests,
      totalAcceptedRequests,
      totalPendingRequests,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllTravelRequests = async (req, res) => {
  try {
    // Retrieve all travel requests from all users
    const requests = await TravelRequest.find();

    // If no requests are found, return a message
    if (requests.length === 0) {
      return res.status(404).json({ message: 'No travel requests found' });
    }

    // Return the travel requests
    res.json(requests);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching travel requests:', error);
    
    // Return a server error response
    res.status(500).json({ message: 'Server error' });
  }
};

