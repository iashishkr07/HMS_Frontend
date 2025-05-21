export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axios.put(
      `${API_URL}/bookings/${bookingId}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
