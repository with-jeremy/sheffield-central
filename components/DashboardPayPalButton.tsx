"use client"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState } from "react"

interface DashboardPayPalButtonProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
}

export default function DashboardPayPalButton({ product }: DashboardPayPalButtonProps) {
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)

  const createOrder = async () => {
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          price: product.price,
          title: product.title,
        }),
      })
      const data = await res.json()
      if (!data.id) throw new Error("No order ID returned")
      return data.id
    } catch (err: any) {
      setError("Failed to create PayPal order: " + (err?.message || ""))
      throw err
    }
  }

  const onApprove = async (data: any, actions: any) => {
    setProcessing(true)
    setError("")
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID, productId: product.id }),
      })
      const details = await res.json()
      if (details.error) throw new Error(details.error)
      alert("Transaction completed!")
    } catch (err: any) {
      setError("Payment failed: " + (err?.message || ""))
    } finally {
      setProcessing(false)
    }
  }

  return (
    <PayPalScriptProvider options={{
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
      currency: "USD",
      intent: "capture",
    }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={err => setError("PayPal error: " + (err?.message || ""))}
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
        disabled={processing}
      />
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </PayPalScriptProvider>
  )
}
