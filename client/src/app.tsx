"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingCart } from "lucide-react"
import ProductCard from "./components/product-card"
import Sidebar from "./components/sidebar"
//import { calculateDiscount } from "./utils/discount"
import type { Product } from "./types"

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredProducts(filtered)
    }
  }, [searchQuery, products])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Example of using the discount calculator
  //const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  //const discountedTotal = calculateDiscount(totalAmount, true, "DISKON20")  
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold tracking-tight">ShopMart</h1>
            <nav className="ml-12 hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a href="#" className="text-black font-medium text-sm hover:text-gray-600 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 font-medium text-sm hover:text-black transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 font-medium text-sm hover:text-black transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 font-medium text-sm hover:text-black transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-5">
            <div className="relative">
              <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white w-56">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none w-full text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
              </div>
            </div>
            <div className="relative">
              <button className="relative bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full transition-colors">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 py-8 pl-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-4 h-80 animate-pulse shadow-sm" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">No products found matching your search.</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-4 text-sm font-medium text-black hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">© 2025 ShopMart. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App