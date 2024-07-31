import Model from '../core/model.js';

export default class Snippet extends Model {
  static indexes = ['cid'];

  constructor(data) {
    super(data);
    this.cid = data.cid;
    this.title = data.title;
    this.shortTitle = data.shortTitle;
    this.content = data.content;
    this.description = data.description;
    this.listed = data.listed || false;
    this.cover = data.cover;
    this.tokens = data.tokens.split(';');
    this.ranking = data.ranking;
    this.tags = data.tags.split(';');
    this.dateModified = new Date(data.dateModified);
    this.tableOfContents = data.tableOfContents;
    this.languageCid = data.languageCid;
  }
}
