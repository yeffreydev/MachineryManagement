# Pruebas de Aceptación - Machinery Management

## UAT-001: Registro de Usuario
| Campo | Detalle |
|-------|---------|
| ID del caso | UAT-001 |
| Descripción | Verificar que un nuevo usuario puede registrarse exitosamente |
| Precondición | Usuario no registrado en el sistema |
| Datos de prueba | Email: nuevo@usuario.com, Password: pass123, Nombre: Usuario Test |
| Pasos | 1. Ir al módulo de autenticación<br>2. Hacer clic en "Registrarse"<br>3. Ingresar datos de prueba<br>4. Enviar formulario |
| Resultado esperado | Sistema muestra "User registered successfully!" |
| Resultado obtenido |  |
| Estado | Pendiente |

## UAT-002: Inicio de Sesión
| Campo | Detalle |
|-------|---------|
| ID del caso | UAT-002 |
| Descripción | Verificar que un usuario registrado puede iniciar sesión |
| Precondición | Usuario registrado en el sistema |
| Datos de prueba | Email: test@example.com, Password: password123 |
| Pasos | 1. Ir al módulo de autenticación<br>2. Hacer clic en "Iniciar Sesión"<br>3. Ingresar credenciales<br>4. Enviar formulario |
| Resultado esperado | Sistema devuelve token JWT y mensaje "Login successful" |
| Resultado obtenido |  |
| Estado | Pendiente |

## UAT-003: Crear Máquina
| Campo | Detalle |
|-------|---------|
| ID del caso | UAT-003 |
| Descripción | Verificar que se puede crear una nueva máquina |
| Precondición | Usuario autenticado con permisos de administrador |
| Datos de prueba | Nombre: Excavadora Test, Descripción: Máquina de prueba, Precio: 150.0 |
| Pasos | 1. Ir al módulo de máquinas<br>2. Hacer clic en "Nueva Máquina"<br>3. Ingresar datos<br>4. Guardar |
| Resultado esperado | Sistema crea máquina y devuelve objeto con ID generado |
| Resultado obtenido |  |
| Estado | Pendiente |

## UAT-004: Listar Máquinas
| Campo | Detalle |
|-------|---------|
| ID del caso | UAT-004 |
| Descripción | Verificar que se pueden listar todas las máquinas disponibles |
| Precondición | Usuario autenticado |
| Datos de prueba | Ninguno |
| Pasos | 1. Ir al módulo de máquinas<br>2. Hacer clic en "Ver Todas"<br>3. Revisar lista |
| Resultado esperado | Sistema muestra array de máquinas con datos completos |
| Resultado obtenido |  |
| Estado | Pendiente |

## UAT-005: Crear Alquiler
| Campo | Detalle |
|-------|---------|
| ID del caso | UAT-005 |
| Descripción | Verificar que se puede crear un nuevo alquiler |
| Precondición | Usuario autenticado, máquina disponible |
| Datos de prueba | ID Máquina: uuid-valido, Fechas: 2023-10-01 a 2023-10-05, Costo: 750.0 |
| Pasos | 1. Ir al módulo de alquileres<br>2. Hacer clic en "Nuevo Alquiler"<br>3. Seleccionar máquina y fechas<br>4. Confirmar |
| Resultado esperado | Sistema crea alquiler y devuelve objeto con ID generado |
| Resultado obtenido |  |
| Estado | Pendiente |

## UAT-006: Crear Mantenimiento
| Campo | Detalle |
|-------|---------|
| ID del caso | UAT-006 |
| Descripción | Verificar que se puede registrar un mantenimiento |
| Precondición | Usuario autenticado con permisos técnicos |
| Datos de prueba | ID Máquina: uuid-valido, Descripción: Mantenimiento preventivo, Fecha: 2023-10-01, Costo: 200.0 |
| Pasos | 1. Ir al módulo de mantenimientos<br>2. Hacer clic en "Nuevo Mantenimiento"<br>3. Ingresar datos<br>4. Guardar |
| Resultado esperado | Sistema crea registro de mantenimiento y devuelve objeto con ID generado |
| Resultado obtenido |  |
| Estado | Pendiente |