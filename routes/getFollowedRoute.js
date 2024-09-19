import express from 'express';
const router = express.Router();

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const clientToken = req.headers.authorization;
  const cursor = req.query.cursor;

  if (!userId || !clientToken) {
    return res.status(400).send('User ID and client token are required');
  }

  try {
    let url = `https://api.twitch.tv/helix/channels/followed?user_id=${userId}`;
    if (cursor) {
      url += `&after=${cursor}`;
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
    res.json(data);
    console.log('Followed channels:', data);
  } catch (error) {
    console.error('Error fetching followed channels:', error.message);
    res.status(500).send('Error fetching followed channels');
  }
});

export default router;