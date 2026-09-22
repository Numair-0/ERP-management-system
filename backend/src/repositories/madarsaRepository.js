import { getDatabase } from '../database/connection.js';

function recordsCollection() {
  return getDatabase().collection('madarsa_records');
}

export const madarsaRepository = {
  async listModules() {
    return getDatabase().collection('madarsa_modules').aggregate([
      { $lookup: { from: 'madarsa_records', localField: 'key', foreignField: 'moduleKey', as: 'records' } },
      { $project: { _id: 0, key: 1, label: 1, count: { $size: '$records' } } },
      { $sort: { key: 1 } },
    ]).toArray();
  },

  async findModule(moduleKey) {
    const module = await getDatabase().collection('madarsa_modules').findOne({ key: moduleKey }, { projection: { _id: 0 } });
    if (!module) return null;
    const records = await recordsCollection().find({ moduleKey }, { projection: { _id: 0, data: 1 }, sort: { createdAt: -1 } }).toArray();
    return { ...module, records: records.map((record) => record.data) };
  },

  async findRecord(moduleKey, recordId) {
    const record = await recordsCollection().findOne({ moduleKey, id: recordId }, { projection: { _id: 0, data: 1 } });
    return record?.data || null;
  },

  async addRecord(moduleKey, record) {
    const newRecord = { id: `${moduleKey.toUpperCase()}-${Date.now()}`, ...record };
    const now = new Date();
    await recordsCollection().insertOne({ id: newRecord.id, moduleKey, data: newRecord, createdAt: now, updatedAt: now });
    return newRecord;
  },

  async updateRecord(moduleKey, recordId, changes) {
    const currentRecord = await this.findRecord(moduleKey, recordId);
    if (!currentRecord) return null;
    const updatedRecord = { ...currentRecord, ...changes, id: recordId };
    await recordsCollection().updateOne({ moduleKey, id: recordId }, { $set: { data: updatedRecord, updatedAt: new Date() } });
    return updatedRecord;
  },

  async deleteRecord(moduleKey, recordId) {
    const record = await this.findRecord(moduleKey, recordId);
    if (!record) return null;
    await recordsCollection().deleteOne({ moduleKey, id: recordId });
    return record;
  },
};
