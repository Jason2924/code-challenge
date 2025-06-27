import { Menu, Repeat, X } from "lucide-react"
import { useState } from "react";
import { Button } from "../ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 border-b border-gray-700">
      <div className="w-7xl max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Repeat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CryptoSwap</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">How it works</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Currencies</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About us</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button className="cursor-pointer" variant={"secondary"} type="button">Log up</Button>
          </div>

          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            <a href="#" className="block text-gray-300 hover:text-white">How it works</a>
            <a href="#" className="block text-gray-300 hover:text-white">Currencies</a>
            <a href="#" className="block text-gray-300 hover:text-white">About us</a>
            <div className="border-t border-gray-800 pt-4 space-y-2">
              <button className="block w-full text-left text-gray-300 hover:text-white">Log in</button>
              <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Get an account
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
