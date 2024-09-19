import express from 'express';
import userModel from '../models/userModels.js';

const router = express.Router();

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { favoriteId } = req.body; // Assuming the ID of the favorite item is sent in the request body

    if (!favoriteId) {
        return res.status(400).send('Favorite ID is missing');
    }

    try {
        // Find the user by ID and add the favoriteId to the favoris array
        const updatedUser = await userModel.findOneAndUpdate(
            { userID: id }, 
            { $addToSet: { favoris: favoriteId } }, // $addToSet prevents duplicates
            { new: true } // Return the updated document
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