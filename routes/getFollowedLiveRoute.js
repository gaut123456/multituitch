import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  const clientToken = req.headers.authorization;
  const cursor = req.query.cursor;
  
  if (!clientToken) {
    return res.status(400).send('Client token is required');
  }

  try {
    let url = 'https://api.twitch.tv/helix/streams';
    if (cursor) {
      url += `?after=${cursor}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': clientToken,
        'Client-Id': process.env.CLIENT_ID
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Live channels:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching live channels:', error.message);
    res.status(500).send('Error fetching live channels');
  }
});

export default router;