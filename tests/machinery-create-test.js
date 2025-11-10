import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5, // 5 virtual users
  duration: '30s', // Test duration
};

export default function () {
  const url = 'http://localhost:8080/api/maquinas'; // Adjust URL as needed
  const payload = JSON.stringify({
    nombre: 'Excavadora Test',
    descripcion: 'Excavadora para pruebas de carga',
    precioPorDia: 150.0,
    disponible: true,
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