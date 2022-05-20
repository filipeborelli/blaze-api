import Router from 'express';
import { LoginController } from '../controllers/LoginController'
const loginRoutes = Router();

loginRoutes.post('/login/',(request, response) => {
    return new LoginController().handler(request, response);
});

export { loginRoutes };