// routes/callbackRoutes.js
import express from 'express';
import userModel from '../models/userModels.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).send('Token is missing');
    }

    try {
        const response = await fetch('https://id.twitch.tv/oauth2/validate', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error validating token');
        }
        const data = await response.json();

        try {
            const user = await userModel.findOne({ userID: data.user_id }).exec();
            if (user) {
                console.log("User already exists, skipping registration.");
            } else {
                try {
                    const newUser = await userModel.create({ pseudo: data.login, userID: data.user_id, favoris: [] });
                    console.log("New user registered:", newUser);
                } catch (createErr) {
                    console.error("Error creating new user:", createErr);
                }
            }
        } catch (err) {
            console.error("Error checking for existing user:", err);
        }

        console.log('Token is valid:', data);

        // Send token, user_id, expires_in, login
        res.send({
            token: token,
            user_id: data.user_id,
            expires_in: data.expires_in,
            login: data.login
        });
    } catch (error) {
        console.error('Error validating token:', error.message);
        res.status(500).send('Error validating token');
    }
});

export default router;