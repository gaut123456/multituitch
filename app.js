import express from 'express';
import connectDB from './config/db.js';
import callbackRoutes from './routes/callbackRoute.js';
import getFollowedRoutes from './routes/getFollowedRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());

connectDB();
app.use(express.json());

app.use('/callback', callbackRoutes);
app.use('/getFollowed', getFollowedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
