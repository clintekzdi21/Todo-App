/* eslint-disable import/extensions */
import supertest from 'supertest';
import chai from 'chai';
import uuid from 'short-uuid';
import app from '../app.js';

global.app = app;
global.uuid = uuid;
global.expect = chai.expect;
global.request = supertest(app);
