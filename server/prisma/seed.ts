import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create users
  const john = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "john@example.com",
    },
  })

  const jane = await prisma.user.upsert({
    where: { email: "jane@example.com" },
    update: {},
    create: {
      name: "Jane Smith",
      email: "jane@example.com",
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      name: "Bob Johnson",
      email: "bob@example.com",
    },
  })

  // Create products
  const laptop = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Laptop",
      price: 1200000,
      description: "High-performance laptop",
      category: "Electronics",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
  })

  const smartphone = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Smartphone",
      price: 800000,
      description: "Latest smartphone model",
      category: "Electronics",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
  })

  const tshirt = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "T-shirt",
      price: 150000,
      description: "Cotton t-shirt",
      category: "Clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
  })

  // Create orders
  await prisma.order.upsert({
    where: { id: 1 },
    update: {},
    create: {
      total: 1200000,
      status: "pending",
      userId: john.id,
      items: {
        create: {
          quantity: 1,
          productId: laptop.id,
        },
      },
    },
  })

  await prisma.order.upsert({
    where: { id: 2 },
    update: {},
    create: {
      total: 450000,
      status: "pending",
      userId: john.id,
      items: {
        create: [
          {
            quantity: 3,
            productId: tshirt.id,
          },
        ],
      },
    },
  })

  await prisma.order.upsert({
    where: { id: 3 },
    update: {},
    create: {
      total: 1500000,
      status: "pending",
      userId: jane.id,
      items: {
        create: [
          {
            quantity: 1,
            productId: laptop.id,
          },
          {
            quantity: 2,
            productId: tshirt.id,
          },
        ],
      },
    },
  })

  await prisma.order.upsert({
    where: { id: 4 },
    update: {},
    create: {
      total: 300000,
      status: "pending",
      userId: jane.id,
      items: {
        create: {
          quantity: 2,
          productId: tshirt.id,
        },
      },
    },
  })

  await prisma.order.upsert({
    where: { id: 5 },
    update: {},
    create: {
      total: 750000,
      status: "pending",
      userId: bob.id,
      items: {
        create: {
          quantity: 5,
          productId: tshirt.id,
        },
      },
    },
  })

  console.log("Database seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
