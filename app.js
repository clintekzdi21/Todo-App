/* eslint-disable import/extensions */
import server from 'express';
import bunyan from 'bunyan';
import config from './config.js';
import appDb from './db/lowdb.js';

// handlers
import todolist from './handlers/todolist.js';

const log = bunyan.createLogger(config.log);

const app = server();

app.use(server.json());

app.db = appDb;
app.log = log;

// Request logging
app.use((req, res, next) => {
  log.info(req.url);
  next();
});

// Error logging
app.use((err, req, res, next) => {
  log.error(err);
  next();
});

app.use(async (req, res, next) => {
  req.db = appDb;

  todolist(app);

  return next();
});

app.get('/echo', (req, res) => {
  res.send('todo-list');
});

export default app;
