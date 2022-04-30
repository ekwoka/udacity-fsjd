import { activeUsers, mostExpensive } from './dashboard';
import { Router } from 'express';

const Services = Router();

Services.get('/most_expensive', mostExpensive);
Services.get('/active_users', activeUsers);

export { Services };
