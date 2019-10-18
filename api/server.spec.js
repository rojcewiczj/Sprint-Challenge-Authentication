const request = require('supertest');

const server = require('./server.js');

const Users = require('./usersModel.js');

const db = require('../data/dbConfig.js');

describe('GET /api/jokes', () => {
  
    it('should return 200 http status code', () => {
      return request(server)
        .get('/api/jokes/')
        .then(response => {
          expect(response.status).toBe(200);
        });
    });
  
   
    test('should return JSON', async () => {
      const response = await request(server).get('/api/jokes/');
  
     
      expect(response.type).toMatch(/json/i);
    });
  
    test('should return JSON using .then()', () => {
      return request(server)
        .get('/api/jokes/')
        .then(response => {
         
          expect(response.type).toMatch(/json/i);
        });
    });
  
    
    it('should return { api: "up" }', async () => {
      const response = await request(server).get('/api/jokes');
  
      expect(response.body).toEqual({ api: 'up' });
      expect(response.body.api).toBe('up');
    });
  
    it('toEqual', () => {
      expect({}).toEqual({});
      expect([]).toEqual([]);
      expect([1, 2, 3]).toEqual([1, 2, 3]);
    });
  });

  it('should set testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
  
  describe('users model', () => {
   
    beforeEach(async () => {
      await db('users').truncate();
    });
   
  
    describe('add()', () => {
      it('should add user to database', async () => {
        // check that table is empty
        const records = await db('users');
        expect(records).toHaveLength(0);
  
        // insert one record
        await Users.add({ name: 'Jane' });
  
        // check we now have one record in the table
        const users = await db('users');
        expect(users).toHaveLength(1);
      });
    });
  
    it('should add the provided user to database ', async () => {
      let user = await Users.add({ name: 'Jane' });
      expect(user.name).toBe('Jane');
  
      user = await Users.add({ name: 'Jason' });
      expect(user.name).toBe('Jason');
  
      const users = await db('users');
      expect(users).toHaveLength(2);
  
    });
    it('should remove the provided user from database ', async () => {
      let user = await Users.add({ name: 'Jane' });
      expect(user.name).toBe('Jane');
  
       await Users.remove({ id: '1' });
      
  
      const users = await db('users');
      expect(users).toHaveLength(1);
  
    });
  
  });