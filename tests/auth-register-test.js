import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5, // 5 virtual users
  duration: '20s', // Test duration
};

export default function () {
  const url = 'http://localhost:8080/api/auth/register'; // Adjust URL as needed
  const payload = JSON.stringify({
    email: `user${__VU}@example.com`, // Unique email per VU
    password: 'password123',
    name: 'Test User',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
    'registration successful': (r) => r.body.includes('successfully'),
  });

  sleep(1);
}