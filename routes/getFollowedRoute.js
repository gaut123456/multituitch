import express from 'express';

const router = express.Router();

router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(400).json({ error: 'Bearer token is required' });
  }

  try {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        'Authorization': bearerToken,
        'Client-Id': process.env.CLIENT_ID
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch user data' });
    }

    const data = await response.json();
    const userData = data.data[0];

    if (userData?.profile_image_url) {
      res.json({ profile_picture: userData.profile_image_url });
    } else {
      res.status(404).json({ message: 'User not found or no profile picture available' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

export default router;