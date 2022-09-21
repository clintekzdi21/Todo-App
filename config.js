import devNull from 'dev-null';

export default {
  name: process.env.APP_NAME,
  env: process.env.NODE_ENV,
  log: {
    name: process.env.APP_NAME,
    streams: [{
      stream: (process.env.NODE_ENV !== 'test') ? process.stdout : devNull(),
      level: process.env.NODE_DEBUG,
    }],
  },
  db: {
    file: process.env.DBFILE,
  },
  port: process.env.PORT,
};
