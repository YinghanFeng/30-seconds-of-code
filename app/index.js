import repl from 'node:repl';
import { readFile } from 'node:fs/promises';

import models from './models/models.js';
import Model from './core/model.js';

const importData = filePath => {
  return readFile(filePath, 'utf8').then(data => {
    return JSON.parse(data, (key, value) => {
      if (!value?.model) return value;
      return new models[value.model](value);
    });
  });
};

const replServer = repl.start();

await importData('.content/content.json').then(data => {
  replServer.context.data = data;
  Object.keys(models).forEach(model => {
    replServer.context[model] = models[model];
  });
  replServer.context.Model = Model;
  replServer.setupHistory('console.log', () => {});
  console.log('Models loaded!');
});
