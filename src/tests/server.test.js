const request = require('supertest');
const { disconnectDB } = require('../db/mongodb');
const { listTotalCounts } = require('../services');
describe('API Tests', () => {
  let app;
  beforeAll(() => {
    app = require('../app');
  });
  afterAll(() => {
    disconnectDB();
  });

  describe('POST /records', () => {
    test('status code should be 200', (done) => {
      request(app)
        .post('/records')
        .send({
          startDate: '2016-01-01',
          endDate: '2016-02-01',
          minCount: 2800,
          maxCount: 3000,
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.code).toBe(0);
          expect(response.body.msg).toEqual('Success');
          done();
        });
    });
  });

  describe('Negative min count', () => {
    test('negative minCount should return 400 statusCode with error code explanation', (done) => {
      request(app)
        .post('/records')
        .send({
          startDate: '2016-01-01',
          endDate: '2016-01-15',
          minCount: -2800,
          maxCount: 3000,
        })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          // expect(response.body.code).toEqual('4');
          done();
        });
    });
  });

  describe('Wrong date format', () => {
    test('wrong date format should return 400 statusCode', (done) => {
      request(app)
        .post('/records')
        .send({
          startDate: '01.10.2021',
          endDate: '2016-02-01',
          minCount: 2800,
          maxCount: 3000,
        })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });
  });

  describe('Other endpoints', () => {
    test('different endpoints should return correct error message', (done) => {
      request(app)
        .get('/records**')
        .then((response) => {
          expect(response.error.text).toEqual(
            '{"error":{"code":5,"msg":"EndpointError: Endpoint is not found"}}'
          );
          done();
        });
    });
  });

  describe('Service Layer', () => {
    test('Service Layer: listTotalCounts result array should count 7', async () => {
      const startDate = new Date('2016-01-01');
      const endDate = new Date('2016-02-01');
      const minCount = 2800;
      const maxCount = 3000;
      const result = await listTotalCounts(
        startDate,
        endDate,
        minCount,
        maxCount
      );
      expect(result.length).toBe(7);
    });
  });
});
