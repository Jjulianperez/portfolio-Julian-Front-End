# Shopian

**Shopian** es una plataforma SaaS multitenancy que permite a pequeños y medianos comerciantes crear y gestionar su propia tienda en línea en minutos, sin necesidad de conocimientos técnicos.

## ¿Qué problema resuelve?

Muchos comerciantes latinoamericanos usan WhatsApp para vender, pero no tienen una presencia digital estructurada. Shopian les da:

- Un **catálogo de productos** público accesible por link único (`/{subdomain}`)
- Un **panel de administración** para gestionar productos, promociones, equipo y métodos de pago
- Integración directa con **WhatsApp** para cerrar ventas sin fricción
- Un sistema de **suscripciones** con trial gratuito para monetizar el servicio

---

## Stack tecnológico

### Backend
| Tecnología | Rol |
|---|---|
| **NestJS** | Framework REST API modular y escalable |
| **Prisma ORM** | Acceso a base de datos con tipado estático |
| **PostgreSQL** | Base de datos relacional principal |
| **JWT + Passport** | Autenticación y autorización por roles |
| **Multer** | Upload de imágenes de productos |
| **@nestjs/throttler** | Rate limiting y protección de endpoints |

### Panel de Administración (`/app`)
| Tecnología | Rol |
|---|---|
| **React 19 + Vite** | UI framework con las últimas mejoras de React |
| **TypeScript** | Tipado estático en todo el proyecto |
| **Zustand** | Estado global (auth, UI, productos, carrito) |
| **React Router v7** | Navegación y rutas protegidas |
| **Axios** | Cliente HTTP para consumo de la API |
| **Recharts** | Gráficos del dashboard |

### Landing Page (`/landing`)
| Tecnología | Rol |
|---|---|
| **React 19 + Vite** | UI framework |
| **TypeScript** | Tipado estático |
| **GSAP** | Animaciones de scroll y entrada complejas |
| **Framer Motion** | Animaciones fluidas de componentes |

---

## Tecnologías aprendidas durante el desarrollo

Durante el desarrollo de Shopian adquirí experiencia real en tecnologías que no había usado antes:

| Nueva tecnología | Qué aprendí |
|---|---|
| **NestJS** | Arquitectura modular, decoradores, guards, interceptors, DTOs |
| **Prisma ORM** | Modelos, migraciones, relaciones y queries tipadas |
| **PostgreSQL** | Diseño de base de datos relacional, relaciones multitenancy |
| **GSAP** | Animaciones basadas en scroll, timelines, triggers |
| **Framer Motion** | Animaciones declarativas en React, `AnimatePresence`, variantes |
| **React Router v7** | Data loaders, rutas anidadas, `FlowGuard` de protección |
| **Multitenancy** | Arquitectura donde múltiples clientes comparten la misma instancia |
| **SaaS architecture** | Flujo registro → suscripción → onboarding → dashboard |

---

## Herramientas de IA utilizadas en el proceso

Una parte fundamental del desarrollo fue el uso productivo de herramientas de inteligencia artificial para acelerar el trabajo, resolver problemas y aprender tecnologías nuevas:

| Herramienta | Uso principal |
|---|---|
| **Claude (Anthropic)** | Arquitectura de código, revisión de lógica, generación de módulos NestJS, debugging |
| **Gemini (Google)** | Investigación de patrones de diseño, consultas de documentación, ideas de features |
| **ChatGPT (OpenAI)** | Resolución de errores, ejemplos de código, explicación de conceptos nuevos |

> El manejo de IA como herramienta de desarrollo es una habilidad que potencia la productividad sin reemplazar el criterio del desarrollador.

---

## Arquitectura

```
Shopian/
├── backend/      # NestJS REST API (puerto 3000)
├── app/          # Panel admin React (puerto 5174)
└── landing/      # Landing page React (puerto 5173)
```

### Modelo de datos (principales)

```
Tenant ─── User[] (ADMIN | EMPLOYEE)
       ─── Product[] ─── ProductImage[]
       ─── Promotion[]
       ─── PaymentMethod[]
       ─── Subscription (TRIAL | ACTIVE | EXPIRED | CANCELLED)
       ─── Order[] ─── OrderItem[]
```

---

## Flujo SaaS

```
/register → /subscribe (elegir plan) → /onboarding (3 pasos) → /dashboard
```

El **FlowGuard** redirige automáticamente según el estado del usuario (no suscrito, en trial, onboarding incompleto, etc.).

### Onboarding Wizard (3 pasos)
1. **Tu tienda**: nombre, subdominio, WhatsApp, descripción
2. **Primer producto**: nombre, descripción, precio, visibilidad
3. **¡Listo!**: link copiable + compartir por WhatsApp

---

## API REST — Endpoints principales

| Módulo | Endpoints |
|---|---|
| **Auth** | `POST /auth/register`, `POST /auth/login` |
| **Tenants** | `GET /tenants/:id`, `PATCH /tenants/:id` |
| **Products** | CRUD `/products` + upload imagen |
| **Promotions** | CRUD `/promotions` |
| **Payment Methods** | CRUD `/payment-methods` |
| **Users/Team** | `GET /users`, `POST /users/invite`, `PATCH /users/:id/role`, `DELETE /users/:id` |
| **Catalog** | `GET /catalog/:subdomain` (público) |
| **Orders** | CRUD `/orders` |
| **Subscriptions** | `POST /subscriptions/trial`, `GET /subscriptions/status` |
| **Stats** | `GET /stats` |

---

## Planes de suscripción

| Plan | Descripción |
|---|---|
| **Starter** | Funcionalidades básicas para empezar |
| **Pro** | Más productos, estadísticas avanzadas |
| **Business** | Equipo ilimitado, integraciones premium |

---

## Instalación local

### Requisitos
- Node.js 18+
- PostgreSQL 14+

### Backend

```bash
cd backend
npm install
cp .env.example .env   # configurar DATABASE_URL y JWT_SECRET
npx prisma migrate dev
npm run start:dev
```

### Panel Admin

```bash
cd app
npm install
npm run dev
```

### Landing

```bash
cd landing
npm install
npm run dev            # VITE_APP_URL apunta al panel admin
```

---

## Variables de entorno

### `backend/.env`
```env
DATABASE_URL="postgresql://user:password@localhost:5432/shopian"
JWT_SECRET="your-secret-key"
```

### `landing/.env`
```env
VITE_APP_URL=http://localhost:5174
```

---

## Características del panel admin

- **Dashboard**: métricas de productos, promociones y equipo
- **Productos**: CRUD con imágenes múltiples y toggle de precio visible
- **Promociones**: descuentos activos/inactivos
- **Equipo**: invitar empleados, cambiar roles, eliminar
- **Métodos de pago**: configurar opciones de cobro
- **Configuración de tienda**: editar datos del negocio
- **Catálogo público**: vista del cliente con integración WhatsApp

---

## Licencia

MIT
