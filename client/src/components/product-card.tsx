"use client"

import { useState } from "react"
import { Star, ShoppingCart, Plus } from "lucide-react"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden flex flex-col h-full border border-gray-100 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 bg-gray-50 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className={`object-contain p-6 w-full h-full transition-all duration-500 transform ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-105" : "scale-100"}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className={`absolute top-3 right-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(product.rating.rate) ? "text-amber-400 fill-amber-400" : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1.5">({product.rating.count})</span>
          </div>
        </div>
        <h3 className="font-medium text-gray-900 mb-1.5 line-clamp-1 text-sm">{product.title}</h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-medium text-lg">${product.price.toFixed(2)}</span>
          <button
            onClick={onAddToCart}
            className="group flex items-center space-x-1 bg-gray-100 hover:bg-black text-gray-800 hover:text-white px-3 py-1.5 rounded-full text-xs transition-all duration-300"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span className="font-medium">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
