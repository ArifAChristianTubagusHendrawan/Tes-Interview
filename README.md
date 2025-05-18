# E-commerce Monorepo with React, Express, and Prisma

This is a full-stack e-commerce application built with React (Vite) for the frontend, Express for the backend API, and Prisma ORM for database operations.

## Project Structure

```
├── client/             # React frontend (Vite)
│   ├── src/            # Source code
│   │   ├── components/ # React components
│   │   ├── utils/      # Utility functions
│   │   └── types/      # TypeScript types
├── server/             # Express backend
│   ├── prisma/         # Prisma schema and migrations
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.ts     # Seed script for initial data
│   ├── lib/            # Shared utilities
│   │   └── prisma.ts   # Prisma client instance
│   └── index.ts        # Express server entry point
└── package.json        # Root package.json for monorepo
```

## Requirements Implementation

### Bagian 1: Frontend (70%)

#### Soal 1: React Components (30%)
1. **Fetch data from API**
   - Implemented in `client/src/App.tsx` (lines 15-26) using useEffect to fetch products from fakestoreapi

2. **Display product cards with details**
   - Implemented in `client/src/components/ProductCard.tsx` showing image, title, price, and rating

3. **Search functionality**
   - Implemented in `client/src/App.tsx` (lines 28-36) with real-time filtering

4. **Add to Cart button**
   - Implemented in `client/src/components/ProductCard.tsx` (lines 51-55) and `client/src/App.tsx` (lines 38-49)

5. **Cart item count display**
   - Implemented in `client/src/App.tsx` (line 51) and displayed in header (lines 81-87)

#### Soal 2: Responsive Layout (20%)
1. **Header with navbar and logo**
   - Implemented in `client/src/App.tsx` (lines 55-89)

2. **Sidebar with categories**
   - Implemented in `client/src/components/Sidebar.tsx` with collapsible categories

3. **Main content with product listing**
   - Implemented in `client/src/App.tsx` (lines 92-122)

4. **Footer with copyright**
   - Implemented in `client/src/App.tsx` (lines 125-129)

5. **Responsive design**
   - Implemented throughout using Tailwind CSS responsive classes (sm, md, lg, xl)

#### Soal 3: JavaScript Logic (20%)
1. **Discount calculation function**
   - Implemented in `client/src/utils/discount.ts` with all required rules:
     - 10% discount for orders > 1,000,000
     - 5% additional discount for members
     - 20% discount for promo code "DISKON20"
     - Maximum total discount capped at 50%

### Bagian 2: Backend (30%)

#### Soal 4: REST API (15%)
1. **GET /products endpoint**
   - Implemented in `server/index.ts` (lines 24-32)

2. **POST /cart endpoint**
   - Implemented in `server/index.ts` (lines 35-83)

3. **In-memory cart storage**
   - Initially implemented with in-memory array, then enhanced with Prisma database storage

#### Soal 5: Database Query (15%)
1. **Users with orders > 1,000,000**
   - Implemented in `server/index.ts` (lines 142-156) using Prisma ORM

2. **Average order per user**
   - Implemented in `server/index.ts` (lines 159-179) using Prisma ORM

3. **Update order status for orders > 500,000**
   - Implemented in `server/index.ts` (lines 182-193) using Prisma ORM

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL database

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `server/.env.example` to `server/.env`
   - Update the `DATABASE_URL` with your PostgreSQL connection string

4. Set up the database:
   ```bash
   cd server
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. Start the development servers:
   ```bash
   npm run dev
   ```

This will start both the frontend (Vite) and backend (Express) servers concurrently.

## Features

### Frontend
- Product listing with search functionality
- Shopping cart
- Responsive layout with sidebar navigation
- Discount calculation

### Backend
- REST API for products and cart
- PostgreSQL database with Prisma ORM
- User and order management

## API Endpoints

- `GET /products` - Get all products
- `POST /cart` - Add item to cart
- `GET /cart` - Get cart items
- `GET /api/users/large-orders` - Get users with orders > 1,000,000
- `GET /api/users/average-orders` - Get average order per user
- `POST /api/orders/update-status` - Update order status for orders > 500,000

## Database Schema

The database schema is defined in `server/prisma/schema.prisma` and includes:

- User model
- Product model
- Order model
- OrderItem model
- Cart model

## Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build both client and server
- `npm run start` - Start production servers
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio to view/edit data
- `npm run prisma:seed` - Seed the database with initial data