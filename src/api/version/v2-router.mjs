import express from 'express';
// import routers
import { messageRouter } from '../v2/message-router.mjs';
// create and export v1Router
export const v2Router = express.Router();
// use messageRouter
v2Router.use('/messages', messageRouter);