import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

export const dbFunctions = {
  findAll: async (collectionName, filter = {}) => {
    return await getDB().collection(collectionName).find(filter).toArray();
  },

  insertOne: async (collectionName, doc) => {
    return await getDB().collection(collectionName).insertOne(doc);
  },

  updateOneById: async (collectionName, id, updateObj) => {
    return await getDB().collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: updateObj }
    );
  },

  deleteOneById: async (collectionName, id) => {
    return await getDB().collection(collectionName).deleteOne({ _id: new ObjectId(id) });
  }
};

