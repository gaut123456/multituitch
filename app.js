import express from 'express';
import connectDB from './config/db.js';
import callbackRoutes from './routes/callbackRoute.js';
import getFollowedRoutes from './routes/getFollowedRoute.js';
import addFavoritesRoutes from './routes/addFavoritesRoute.js';
import deleteFavoritesRoutes from './routes/deleteFavoritesRoute.js';
import getFollowedLiveRoutes from './routes/getFollowedLiveRoute.js';
import getFavoritesRoute from './routes/getFavoritesRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());

connectDB();
app.use(express.json());

app.use('/callback', callbackRoutes);
app.use('/getFollowed', getFollowedRoutes);
app.use('/addFavorites', addFavoritesRoutes);
app.use('/deleteFavorites', deleteFavoritesRoutes);
app.use('/getFollowedLive', getFollowedLiveRoutes);
app.use('/getFavoritesRoute', getFavoritesRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
