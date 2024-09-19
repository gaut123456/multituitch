import express from 'express';
import axios from 'axios';  // Import axios for HTTP requests
import cors from 'cors';    // Import cors for handling CORS

const app = express();
app.use(express.json());
app.use(cors());  // Allow CORS requests

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});localhosty

// Handle the OAuth callback
app.post('/callback', async (req, res) => {
    const { token } = req.body; // Expecting token in request body

    if (!token) {
        return res.status(400).send('Token is missing');
    }

    try {
        // Validate the token with Twitch (optional step)
        const response = await axios.get('https://id.twitch.tv/oauth2/validate', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Token is valid:', `${response.data} `);
        console.log(token)
        res.json({ message: 'Token is valid', tokenInfo: response.data });
    } catch (error) {
        console.error('Error validating token:', error);
        res.status(500).send('Error validating token');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');

});