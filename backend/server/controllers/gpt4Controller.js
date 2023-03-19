const { getCompletion } = require('../utils/gpt4Api');

const messageCounter = {};

exports.handleGpt4Request = async (req, res) => {
  try {
    const token = req.headers['x-auth-token'];
    const messages = req.body.messages;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!messageCounter[token]) {
      messageCounter[token] = 0;
    }

    if (messageCounter[token] >= 10) {
      return res.status(403).json({ error: 'Message limit reached' });
    }

    messageCounter[token] += 1;

    const completion = await getCompletion(messages);
    res.status(200).json(completion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process GPT-4 request' });
  }
};

  

