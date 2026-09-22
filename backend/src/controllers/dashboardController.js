import { dashboardService } from '../services/dashboardService.js';

export async function getDashboard(request, response, next) {
  try {
    response.json(await dashboardService.getOverview(request.user));
  } catch (error) {
    next(error);
  }
}