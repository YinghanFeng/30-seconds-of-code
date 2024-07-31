import Model from '../core/model.js';

export default class Collection extends Model {
  static indexes = ['cid'];

  constructor(data) {
    super(data);
    this.cid = data.cid;
    this.title = data.title;
    this.shortTitle = data.shortTitle;
    this.miniTitle = data.miniTitle;
    this.content = data.content;
    this.description = data.description;
    this.listed = data.listed || false;
    this.cover = data.cover;
    this.tokens = data.tokens.split(';');
    this.ranking = data.ranking;
    this.featuredIndex = data.featuredIndex;
    this.topLevel = data.topLevel || false;
    this.parentCid = data.parentCid;
  }
}
