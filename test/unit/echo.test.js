/* eslint-disable no-undef */
describe('Echo API', () => {
  it('GET /echo should respond with 200', () => {
    request
      .get('/echo')
      .expect(200);
  });

  it('GET /echo should respond with message', (done) => {
    request
      .get('/echo')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.eql('todo-list');
        done();
      });
  });
});
