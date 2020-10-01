import { Router } from 'express';

const routes = Router();
import appointmentsRouter from './appointments.routes';

import usersRouter from './users.routes';
import sessionRouter from './session.routes';

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;