import { DateTime } from 'luxon';
import uuid from 'short-uuid';
import _ from 'lodash';

export default function (app) {
  /**
     * Retrieves Todo Items with pagination
     * @param {number} limit - page limit
     * @param {number} offset - starting index
     * @return {array} - The todo item details
     */
  app.get('/todo', async (req, res) => {
    const {
      todolists,
    } = req.db.data;
    let result = null;
    const { limit , offset } = req.query;
    if(limit && offset) {
      result = todolists.slice((offset - 1) * limit, offset * limit);
    } else {
      result = todolists;
    }

    return res.send(result);
  });

  /**
     * Creates a new todo item
     * @param {string} title - title of task
     * @param {boolean} done - status
     * @return {object} - The todo item created
     */
  app.post('/todo', async (req, res) => {
    const {
      todolists,
    } = req.db.data;

    const itemRec = {
      id: uuid.generate(),
      createdAt: DateTime.utc().toISO(),
      updatedAt: DateTime.utc().toISO(),
      ...req.body,
    };

    const user = todolists.push(itemRec);

    app.log.info({
      id: user.id,
    }, 'User created');

    req.db.write();

    res.status(201).json(itemRec);
  });

  app.put('/todo', async (req, res) => {
    const TodoId = req.body.id;

    const {
      todolists,
    } = req.db.data;

    const checkTodo = todolists.find((r) => r.id === TodoId);
    if (!checkTodo) return res.status(404).json({ message: 'Error: Todo Item does not exist' });

    const fieldsToUpdate = {
      updatedAt: DateTime.utc().toISO(),
      ...req.body,
    };

    // Update record
    let updatedItem;
    todolists.map((r) => {
      if (r.id === TodoId) {
        updatedItem = _.assign(r, fieldsToUpdate);
      }
      return r;
    });

    app.log.info({
      id: updatedItem.id,
    }, 'User updated');

    req.db.write();

    return res.status(200).json(updatedItem);
  });

  app.delete('/todo/:id', async (req, res) => {
    const TodoId = req.params.id;
    console.log('TodoId', TodoId);
    const {
      todolists,
    } = req.db.data;

    const item = todolists.find((r) => r.id === TodoId);
    if (!item) return res.status(404).json({ message: 'Error: Todo Item does not exist' });

    _.remove(todolists, (r) => r.id === TodoId);

    app.log.info({
      id: item.id,
    }, 'Todo item deleted');

    req.db.write();

    return res.sendStatus(200);
  });
}
