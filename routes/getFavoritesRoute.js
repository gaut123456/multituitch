import express from 'express';
import userModel from '../models/userModels.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Authentication token is missing');
  }

  try {
    const response = await fetch('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error validating token');
    }

    const data = await response.json();

    if (data.user_id !== id) {
      return res.status(403).send('You are not authorized to perform this action');
    }

    const user = await userModel.findOne({ userID: id });

    if (!user) {
      return res.status(404).send('User not found');
    }
    console.log('User favorites:', user.favoris);
    res.status(200).json(user.favoris || []);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).send('Error fetching favorites');
  }
});

export default router;
