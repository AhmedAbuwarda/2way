import express from 'express';
// routers
import { v1Router } from './version/v1-router.mjs';
import { v2Router } from './version/v2-router.mjs';

export const apiRouter = express.Router();

// use v1Router to handle requests to /api/v1
apiRouter.use('/v1', v1Router);
// use v2Router to handle requests to /api/v2
apiRouter.use('/v2', v2Router);