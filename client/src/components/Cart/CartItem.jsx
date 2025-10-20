import React from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'

const CartItem = ({cart , descreaseQuality ,increaseQuantity , removeCartItem ,productMessageInput , handleQuantityInput}) => {
  return (
    <div>
        <div className="bg-white border border-gray-200 rounded-xl shadow mb-12 overflow-hidden">
                <div className="hidden sm:grid grid-cols-[120px_1fr_140px_1fr] bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700">
                  <div>Product</div>
                  <div>Description</div>
                  <div>Quantity</div>
                  <div>Message</div>
                </div>
        
                {/* Sample Item */}
                {cart.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 text-sm">
                    🛒 Your cart is empty.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-1 sm:grid-cols-[120px_1fr_140px_1fr] gap-4 p-4 sm:p-6 border-t border-gray-200 hover:bg-gray-50 transition-all"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt="Product"
                          className="w-16 h-16 rounded object-cover shadow-sm"
                        />
                      </div>
                      <div className="flex items-center text-gray-800 text-sm sm:text-base font-medium">
                        {item.name}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1 shadow-inner">
                          <button
                            onClick={() => descreaseQuality(item._id)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityInput(item._id, e.target.value)
                            }
                            className="w-10 mx-1 text-center bg-transparent text-sm border-none focus:outline-none"
                          />
                          <button
                            onClick={() => increaseQuantity(item._id)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeCartItem(item._id)}
                          className="text-red-500 hover:text-red-600 p-1"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div>
                        <textarea
                          rows="2"
                          placeholder="Add a note or specification"
                          value={item.message}
                          onChange={(e) =>
                            productMessageInput(item._id, e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
    </div>
  )
}

export default CartItem