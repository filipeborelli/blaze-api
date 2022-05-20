import Router from 'express';
import { StartDoubleGameController } from '../controllers/DoubleStartGameController'
const doubleRoutes = Router();

doubleRoutes.post('/new-game/',(request, response) => {
    return new StartDoubleGameController().handler(request, response);
});

export { doubleRoutes };