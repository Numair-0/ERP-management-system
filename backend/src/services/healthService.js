export const healthService = {
  getStatus() {
    return {
      status: 'ok',
      service: 'madarsa-management-api',
      timestamp: new Date().toISOString(),
    };
  },
};