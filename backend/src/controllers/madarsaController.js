import { canAccessModule } from '../config/roles.js';
import { madarsaService } from '../services/madarsaService.js';

export async function listMadarsaModules(request, response, next) {
  try {
    const modules = await madarsaService.listModules();
    response.json({ modules: modules.filter((module) => canAccessModule(request.user.role, module.key)) });
  } catch (error) {
    next(error);
  }
}

export async function getMadarsaModule(request, response, next) {
  try {
    response.json({ data: await madarsaService.getModule(request.params.moduleKey) });
  } catch (error) {
    next(error);
  }
}

export async function createMadarsaRecord(request, response, next) {
  try {
    const record = await madarsaService.createRecord(request.params.moduleKey, request.body);
    response.status(201).json({ data: record, message: 'Record created successfully.' });
  } catch (error) {
    next(error);
  }
}

export async function getMadarsaRecord(request, response, next) {
  try {
    const { moduleKey, recordId } = request.params;
    response.json({ data: await madarsaService.getRecord(moduleKey, recordId) });
  } catch (error) {
    next(error);
  }
}

export async function updateMadarsaRecord(request, response, next) {
  try {
    const { moduleKey, recordId } = request.params;
    response.json({ data: await madarsaService.updateRecord(moduleKey, recordId, request.body), message: 'Record updated successfully.' });
  } catch (error) {
    next(error);
  }
}

export async function deleteMadarsaRecord(request, response, next) {
  try {
    const { moduleKey, recordId } = request.params;
    response.json({ data: await madarsaService.deleteRecord(moduleKey, recordId), message: 'Record deleted successfully.' });
  } catch (error) {
    next(error);
  }
}