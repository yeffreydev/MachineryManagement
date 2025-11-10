import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp up to 10 users
    { duration: '1m', target: 50 },  // Ramp up to 50 users
    { duration: '30s', target: 0 },  // Ramp down to 0 users
  ],
};

export default function () {
  // Test login
  const loginUrl = 'http://localhost:8080/api/auth/login';
  const loginPayload = JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
  });
  const loginResponse = http.post(loginUrl, loginPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(loginResponse, { 'login status is 200': (r) => r.status === 200 });

  // Test get all machines
  const machinesUrl = 'http://localhost:8080/api/maquinas';
  const machinesResponse = http.get(machinesUrl);
  check(machinesResponse, { 'machines status is 200': (r) => r.status === 200 });

  // Test get all rentals
  const rentalsUrl = 'http://localhost:8080/api/alquileres';
  const rentalsResponse = http.get(rentalsUrl);
  check(rentalsResponse, { 'rentals status is 200': (r) => r.status === 200 });

  // Test get all maintenances
  const maintenancesUrl = 'http://localhost:8080/api/mantenimientos';
  const maintenancesResponse = http.get(maintenancesUrl);
  check(maintenancesResponse, { 'maintenances status is 200': (r) => r.status === 200 });

  sleep(1);
}