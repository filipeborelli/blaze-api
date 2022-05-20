import express from "express"
import { crashRoutes } from './requirements/crash-api/routes/CrashRoutes'
import { loginRoutes } from './requirements/blaze/routes/LoginRoutes'
import { doubleRoutes } from './requirements/double-api/routes/DoubleRoutes'
const serverRouter = express.Router();

serverRouter.use('/crash/', crashRoutes)
serverRouter.use('/blaze/', loginRoutes)
serverRouter.use('/double/', doubleRoutes)

export { serverRouter };