import express from 'express';
// import routers
import { messageRouter } from '../v1/message-router.mjs';
// authenticate router
import { authenticateRouter } from '../v1/authenticate.mjs';
// create and export v1Router
export const v1Router = express.Router();
// use authentication router
v1Router.use(authenticateRouter);
// use messageRouter to handle /messages
v1Router.use('/messages', messageRouter);