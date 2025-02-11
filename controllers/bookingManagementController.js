import TravelRequest from '../models/TravelRequest.js';

// Booking management for Admin: View only pending requests
export const pendingRequests = async (req, res) => {
  try {
    // Fetch all pending travel requests (admin view)
    const pendingRequests = await TravelRequest.find({ status: 'Pending' });

    res.json({
      message: 'All pending travel requests fetched successfully',
      requests: pendingRequests,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Accept or Reject a Travel Request
export const changeRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;  // Status can be 'Approved' or 'Rejected'

  // Validate the status value
  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Must be "Approved" or "Rejected".' });
  }

  try {
    // Find the travel request by its ID
    const request = await TravelRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Travel request not found' });
    }

    // Ensure the request is in "Pending" status before updating
    if (request.status !== 'Pending') {
      return res.status(400).json({ message: 'Request is already processed (either accepted or rejected)' });
    }

    // Update the request status to 'Approved' or 'Rejected'
    request.status = status;

    // Save the updated request
    await request.save();

    res.json({
      message: `Travel request status updated to ${status}`,
      request: request,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
