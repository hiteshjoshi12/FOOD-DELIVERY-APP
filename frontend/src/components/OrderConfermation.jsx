import React from 'react'

const OrderConfermation = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
    <div className="bg-white p-8 rounded-lg text-center">
      <p className="text-xl font-medium">Order Placed</p>
      <p>Your order will be delivered in 30 minutes.</p>
      <p>Redirecting in 3 seconds...</p>
    </div>
  </div>
  )
}

export default OrderConfermation