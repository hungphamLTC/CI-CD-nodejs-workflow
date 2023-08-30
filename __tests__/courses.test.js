const request = require('supertest');
const express = require('express');
const app = express();

const router = require('../routes/courses'); 

app.use(express.json());
app.use('/courses', router);

describe('Course API', () => {
  // Test GET /courses
  it('should return all courses', async () => {
    const response = await request(app).get('/courses');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  // Test GET /courses/:id
  it('should return a course by ID', async () => {
    const response = await request(app).get('/courses/1');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Introduction to Programming');
  });

  // Test POST /courses
  it('should create a new course', async () => {
    const newCourse = { name: 'New Course' };
    const response = await request(app).post('/courses').send(newCourse);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('New Course');
  });

  // Test PUT /courses/:id
  it('should update a course by ID', async () => {
    const updatedCourse = { name: 'Updated Course' };
    const response = await request(app).put('/courses/1').send(updatedCourse);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Course');
  });

  // Test DELETE /courses/:id
  it('should delete a course by ID', async () => {
    const response = await request(app).delete('/courses/1');
    expect(response.status).toBe(200);
  });
});
