import express from 'express';
import userModel from '../models/userModels.js';

const router = express.Router();

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { favoriteId } = req.body;
  const token = req.headers.authorization;

  if (!favoriteId) {
    return res.status(400).send('Favorite ID is missing');
  }

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

    const updatedUser = await userModel.findOneAndUpdate(
      { userID: id },
      { $addToSet: { favoris: favoriteId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).send('Error adding favorite');
  }
});

export default router;