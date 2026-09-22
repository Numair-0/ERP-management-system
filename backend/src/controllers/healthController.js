import { healthService } from '../services/healthService.js';

export function getHealth(_request, response) {
  response.json(healthService.getStatus());
}