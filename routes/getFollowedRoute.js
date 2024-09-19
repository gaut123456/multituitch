import express from 'express';
const router = express.Router();

router.get('/followers/:userId', async (req, res) => {
  const userId = req.params.userId;
  const clientToken = req.headers.authorization;

  if (!userId || !clientToken) {
    return res.status(400).send('User ID and client token are required');
  }

  try {
    const response = await fetch(`https://api.twitch.tv/helix/users/follows?user_id=${userId}`, {
      headers: {
        'Authorization': clientToken,
        'Client-Id': process.env.CLIENT_ID
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching followers:', error.message);
    res.status(500).send('Error fetching followers');
  }
});

export default router;