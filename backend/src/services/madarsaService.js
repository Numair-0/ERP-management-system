import { madarsaRepository } from '../repositories/madarsaRepository.js';

export const madarsaService = {
  async listModules() {
    return madarsaRepository.listModules();
  },

  async getModule(moduleKey) {
    const module = await madarsaRepository.findModule(moduleKey);
    if (!module) {
      const error = new Error(`Madarsa module not found: ${moduleKey}`);
      error.statusCode = 404;
      throw error;
    }
    return { key: moduleKey, label: module.label, count: module.records.length, records: module.records };
  },

  async createRecord(moduleKey, payload) {
    if (!payload || Object.keys(payload).length === 0) {
      const error = new Error('Request body cannot be empty.');
      error.statusCode = 400;
      throw error;
    }
    await this.getModule(moduleKey);
    return madarsaRepository.addRecord(moduleKey, payload);
  },

  async getRecord(moduleKey, recordId) {
    await this.getModule(moduleKey);
    const record = await madarsaRepository.findRecord(moduleKey, recordId);
    if (!record) throw this.recordNotFound(recordId);
    return record;
  },

  async updateRecord(moduleKey, recordId, payload) {
    if (!payload || Object.keys(payload).length === 0) {
      const error = new Error('Request body cannot be empty.');
      error.statusCode = 400;
      throw error;
    }
    await this.getModule(moduleKey);
    const record = await madarsaRepository.updateRecord(moduleKey, recordId, payload);
    if (!record) throw this.recordNotFound(recordId);
    return record;
  },

  async deleteRecord(moduleKey, recordId) {
    await this.getModule(moduleKey);
    const record = await madarsaRepository.deleteRecord(moduleKey, recordId);
    if (!record) throw this.recordNotFound(recordId);
    return record;
  },

  recordNotFound(recordId) {
    const error = new Error(`Madarsa record not found: ${recordId}`);
    error.statusCode = 404;
    return error;
  },
};