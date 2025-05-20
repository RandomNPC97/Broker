import axios from 'axios';

const sendNotification = async (message, options = {}) => {
  const url = `https://ntfy.sh/gibber`;

  try {
    await axios.post(url, message, {
      headers: {
        ...(options.title && { Title: options.title }),
        ...(options.priority && { Priority: options.priority }), // 1 (low) to 5 (high)
      },
    });

  } catch (error) {
    
  }
};

export default sendNotification;
