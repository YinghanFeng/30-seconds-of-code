export default class QueryResult extends Array {
  where(query) {
    return QueryResult.from(
      this.filter(model => {
        return Object.keys(query).every(key => {
          if (typeof query[key] === 'function') return query[key](model[key]);
          return model[key] === query[key];
        });
      })
    );
  }
}
