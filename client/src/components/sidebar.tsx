"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, Menu, Tag, Layers } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    subcategories: ["Laptops", "Smartphones", "Tablets", "Accessories"],
    icon: "Cpu",
  },
  {
    name: "Clothing",
    subcategories: ["Men's", "Women's", "Kids", "Accessories"],
    icon: "Shirt",
  },
  {
    name: "Home & Kitchen",
    subcategories: ["Appliances", "Furniture", "Decor", "Kitchenware"],
    icon: "Home", 
  },
  {
    name: "Beauty & Personal Care",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances"],
    icon: "Sparkles",
  },
  {
    name: "Sports & Outdoors",
    subcategories: ["Fitness", "Camping", "Team Sports", "Water Sports"],
    icon: "Dumbbell",
  },
]

function Sidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)

  // Measure the header height to properly position the sidebar
  useEffect(() => {
    const header = document.querySelector('header')
    if (header) {
      const height = header.getBoundingClientRect().height
      setHeaderHeight(height)
    }
    
    const handleResize = () => {
      const header = document.querySelector('header')
      if (header) {
        const height = header.getBoundingClientRect().height
        setHeaderHeight(height)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }
  
  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="fixed bottom-6 right-6 md:hidden z-40 bg-black text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar - Fixed position with proper top offset */}
      <aside
        style={{ top: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }}
        className={`w-72 bg-white/95 backdrop-blur-sm border-r border-gray-100 shrink-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? "fixed left-0 z-30 translate-x-0 shadow-lg"
            : "fixed left-0 z-30 -translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center space-x-3 mb-8">
            <Layers className="h-6 w-6 text-black" />
            <h2 className="text-xl font-medium">Browse</h2>
          </div>
          
          <nav className="flex-1 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>                    
                  <button
                      className={`flex items-center justify-between w-full py-2.5 px-3 text-left rounded-lg transition-all ${
                        expandedCategories.includes(category.name)
                          ? "bg-black/5 text-black"
                          : "hover:bg-black/5 text-gray-700"
                      }`}
                      onClick={() => toggleCategory(category.name)}
                    >
                      <span className="flex items-center">
                        <Tag className="h-4 w-4 mr-3 opacity-70" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </span>
                      {expandedCategories.includes(category.name) ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    {expandedCategories.includes(category.name) && (
                      <ul className="mt-1 ml-7 space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory}>                            <a 
                              href="#" 
                              className="block py-1.5 px-3 text-sm text-gray-600 hover:text-black rounded-md hover:bg-black/5 transition-colors"
                            >
                              {subcategory}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-4">Filters</h3>
              <div className="space-y-4">
                <div className="px-3">
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$0</span>
                    <span>$1000</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 px-3">
                  <h4 className="text-sm font-medium mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-black focus:ring-black" />
                        <span className="text-sm">{rating}+ Stars</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
