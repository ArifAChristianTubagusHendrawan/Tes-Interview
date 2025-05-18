import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { prisma } from "./lib/prisma"

dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// In-memory cart (for simplicity, we'll keep this in memory for now)
// In a real app, you'd use the Cart model in Prisma
const cart: { id: number; productId: number; product: any; quantity: number }[] = []

// Routes
// GET /products - Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    res.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ error: "Failed to fetch products" })
  }
})

// POST /cart - Add item to cart
app.post("/cart", async (req, res) => {
  const { productId, quantity, sessionId = "default-session" } = req.body

  if (!productId || !quantity) {
    return res.status(400).json({ error: "productId and quantity are required" })
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        productId,
        sessionId,
      },
    })

    let cartItem

    if (existingCartItem) {
      // Update existing cart item
      cartItem = await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      })
    } else {
      // Create new cart item
      cartItem = await prisma.cart.create({
        data: {
          productId,
          quantity,
          sessionId,
        },
      })
    }

    // Return cart item with product details
    const result = {
      ...cartItem,
      product,
    }

    return res.status(existingCartItem ? 200 : 201).json(result)
  } catch (error) {
    console.error("Error adding item to cart:", error)
    return res.status(500).json({ error: "Failed to add item to cart" })
  }
})

// GET /cart - Get cart items
app.get("/cart", async (req, res) => {
  const { sessionId = "default-session" } = req.query

  try {
    const cartItems = await prisma.cart.findMany({
      where: {
        sessionId: sessionId as string,
      },
    })

    // Get product details for each cart item
    const cartItemsWithProducts = await Promise.all(
      cartItems.map(async (item: { productId: any }) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        })
        return {
          ...item,
          product,
        }
      }),
    )

    res.json(cartItemsWithProducts)
  } catch (error) {
    console.error("Error fetching cart:", error)
    res.status(500).json({ error: "Failed to fetch cart" })
  }
})

// Database queries using Prisma
// These would typically be in separate controller/service files

// API endpoint to get users with large orders
app.get("/api/users/large-orders", async (req, res) => {
  try {
    const users = await getUsersWithLargeOrders()
    res.json(users)
  } catch (error) {
    console.error("Error fetching users with large orders:", error)
    res.status(500).json({ error: "Failed to fetch users with large orders" })
  }
})

// API endpoint to get average order per user
app.get("/api/users/average-orders", async (req, res) => {
  try {
    const averageOrders = await getAverageOrderPerUser()
    res.json(averageOrders)
  } catch (error) {
    console.error("Error calculating average orders:", error)
    res.status(500).json({ error: "Failed to calculate average orders" })
  }
})

// API endpoint to update order status
app.post("/api/orders/update-status", async (req, res) => {
  try {
    const updatedCount = await updateOrderStatus()
    res.json({ updatedCount })
  } catch (error) {
    console.error("Error updating order status:", error)
    res.status(500).json({ error: "Failed to update order status" })
  }
})

// -------------------------------------------------------------------------------------
// 1. Query to find users who placed orders with total > 1,000,000
const getUsersWithLargeOrders = async () => {
  return prisma.user.findMany({
    where: {
      orders: {
        some: {
          total: {
            gt: 1000000,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
    distinct: ["id"],
  })
}

// 2. Query to calculate average order per user
const getAverageOrderPerUser = async () => {
  const users = await prisma.user.findMany({
    include: {
      orders: {
        select: {
          total: true,
        },
      },
    },
  })

  return users.map((user: { orders: any[]; id: any; name: any }) => {
    const totalOrders = user.orders.reduce((sum, order) => sum + Number(order.total), 0)
    const averageOrder = user.orders.length > 0 ? totalOrders / user.orders.length : 0

    return {
      id: user.id,
      name: user.name,
      average_order: averageOrder,
    }
  })
}

// 3. Update order status to "completed" if total > 500,000
const updateOrderStatus = async () => {
  const result = await prisma.order.updateMany({
    where: {
      total: {
        gt: 500000,
      },
    },
    data: {
      status: "completed",
    },
  })

  return result.count
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app