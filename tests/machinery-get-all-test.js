import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20, // 20 virtual users
  duration: '1m', // Test duration
};

export default function () {
  const url = 'http://localhost:8080/api/maquinas'; // Adjust URL as needed

  const response = http.get(url);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
    'returns array': (r) => Array.isArray(r.json()),
  });

  sleep(1);
}