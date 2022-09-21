import {
  Low, LowSync, JSONFileSync, Memory,
} from 'lowdb';
import config from '../config.js';

function initDb() {
  let db;
  let adapter;

  if (process.env.NODE_ENV === 'test') {
    adapter = new Memory();

    db = new Low(adapter);

    db.data = { users: [], accounts: [], transactions: [], todolists: [] };
  } else {
    adapter = new JSONFileSync(config.db.file);

    db = new LowSync(adapter);

    db.read();
  }

  return db;
}

export default initDb();
