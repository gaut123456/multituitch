import express from 'express';
import connectDB from './config/db.js';
import callbackRoutes from './routes/callbackRoute.js';
import getFollowedRoutes from './routes/getFollowedRoute.js';
import addFavoritesRoutes from './routes/addFavoritesRoute.js';
import getFollowedLiveRoutes from './routes/getFollowedLiveRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());

connectDB();
app.use(express.json());

app.use('/callback', callbackRoutes);
app.use('/getFollowed', getFollowedRoutes);
app.use('/addFavorites', addFavoritesRoutes);
app.use('/getFollowedLive', getFollowedLiveRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
