import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // 10 virtual users
  duration: '30s', // Test duration
};

export default function () {
  const url = 'http://localhost:8080/api/auth/login'; // Adjust URL as needed
  const payload = JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has token': (r) => r.json().token !== undefined,
  });

  sleep(1);
}