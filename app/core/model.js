import QueryResult from './queryResult.js';

export default class Model {
  static instances = {};
  static indexedInstances = {};

  constructor(data) {
    const modelName = this.constructor.name;
    // this.model = modelName;

    if (!Model.instances[modelName]) Model.instances[modelName] = [];
    Model.instances[modelName].push(this);

    const modelIndexes = this.constructor.indexes || [];
    if (!modelIndexes.length) return;

    if (!Model.indexedInstances[modelName]) {
      Model.indexedInstances[modelName] = this.constructor.indexes.reduce(
        (acc, index) => {
          acc[index] = new Map();
          return acc;
        },
        {}
      );
    }

    modelIndexes.forEach(index => {
      Model.indexedInstances[modelName][index].set(data[index], this);
    });
  }

  static get all() {
    return QueryResult.from(Model.instances[this.name] || []);
  }

  static where(query) {
    return this.all.where(query);
  }

  static scope(...scopes) {
    return scopes.reduce((acc, scope) => acc.where(this[scope]), this.all);
  }

  static find(cid) {
    return Model.indexedInstances[this.name].cid.get(cid);
  }
}
