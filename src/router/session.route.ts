import { sessionsController } from '../controllers/session.controller';

import express from "express";

export default (router: express.Router) => {
    router.post('/track-user-event', sessionsController.trackUserEvent);
};
