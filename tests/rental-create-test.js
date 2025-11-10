import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5, // 5 virtual users
  duration: '30s', // Test duration
};

export default function () {
  const url = 'http://localhost:8080/api/alquileres'; // Adjust URL as needed
  const payload = JSON.stringify({
    maquinaId: '550e8400-e29b-41d4-a716-446655440000', // Example UUID, adjust as needed
    usuarioId: '550e8400-e29b-41d4-a716-446655440001', // Example UUID, adjust as needed
    fechaInicio: '2023-10-01',
    fechaFin: '2023-10-05',
    costoTotal: 750.0,
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
    'has id': (r) => r.json().id !== undefined,
  });

  sleep(1);
}