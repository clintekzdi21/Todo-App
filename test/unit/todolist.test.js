/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import _ from 'lodash';
import fixtures from '../fixtures/db.js';

describe('Todo API', () => {
  let fixture;
  let todolist;

  beforeEach(() => {
    fixture = _.cloneDeep(fixtures);
    app.db.data = fixture;

    [todolist] = fixture.todolists;
    
  });
  it('GET /todo should retrieve todo items with pagination', (done) => {
    request
      .get(`/todo?limit=${5}&offset=${1}`)
      .send(todolist)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.not.equal(null);
        done(err);
      });
  });

  it('GET /todo should retrieve todo items with no pagination', (done) => {
    request
      .get(`/todo`)
      .send(todolist)
      .expect(200)
      .end((err, res) => {
        
        expect(res.body).to.not.equal(null);
        done(err);
      });
  });

  it('POST /todo should create a task', (done) => {
    const newTodo = {
      title: 'Coding all day',
      done: false
    };

    request
      .post('/todo')
      .send(newTodo)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.include(newTodo);

        done(err);
      });
  });

  it('PUT /todo should update a todo item', (done) => {
    const itemCopy = _.clone(todolist);
    const itemUpdate = {
      id: itemCopy.id,
      title: 'Laundry',
      done: true
    };

    request
      .put('/todo')
      .send(itemUpdate)
      .expect(200)
      .end((err, res) => {

        expect(res.body).to.include(itemUpdate);
        expect(res.body.updatedAt).to.not.eql(itemCopy.updatedAt);

        done(err);
      });
  });

  it('PUT /todo Error Todo item not found.', (done) => {
    const itemUpdate = {
      id: 1,
      title: 'Laundry',
      done: true
    };

    request
      .put('/todo')
      .send(itemUpdate)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.include({
          message: 'Error: Todo Item does not exist',
        });

        done(err);
      });
  });

  it('DELETE /todo should delete a task', (done) => {
    request
      .delete(`/todo/${todolist.id}`)
      .send()
      .expect(200)
      .end((err) => {

        done(err);
      });
  });
});
