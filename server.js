/* eslint-disable import/extensions */
import config from './config.js';
import app from './app.js';

const { port } = config;

app.listen(port, () => {
  app.log.info('Server listening to port', port);
  // app.log.error('sample error msg');
});
