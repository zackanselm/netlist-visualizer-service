import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Users', () => {
  it('should get all users', () =>
    request(Server)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(0);
      }));
});
