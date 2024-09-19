const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.get('/:username', async (req, res) => {
    const clientToken = `Bearer ${process.env.CLIENT_TOKEN}`;
    const username = req.params.username;

    try {
        const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
            headers: {
                'Authorization': clientToken,
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
        res.status(500).json({ error: 'Error fetching user data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
