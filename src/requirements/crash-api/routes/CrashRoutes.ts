import Router from 'express';
import { StartGameController } from '../controllers/StartGameController'
const crashRoutes = Router();

crashRoutes.post('/new-game/',(request, response) => {
    return new StartGameController().handler(request, response);
});

export { crashRoutes };