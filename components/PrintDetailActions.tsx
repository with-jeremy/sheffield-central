"use client"

import React, { useState } from "react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { prints } from "@/lib/data"

export default function PrintDetailActions({ print }: { print: typeof prints[0] }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paypalError, setPaypalError] = useState("")
  const PRICE = 12.00

  const createOrder = async (data: any, actions: any) => {
    try {
      const res = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: PRICE.toFixed(2),
          description: print.title,
          custom_id: print.id.toString(),
        }),
      });
      const order = await res.json();
      if (!order.id) throw new Error('No order ID returned from backend');
      return order.id;
    } catch (err: any) {
      setPaypalError('Failed to create PayPal order. ' + (err?.message || ''));
      throw err;
    }
  }

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true)
    setPaypalError("")
    try {
      const order = await actions.order.get()
      const payerName = order.payer?.name?.given_name || ''
      const payerEmail = order.payer?.email_address || ''
      const paymentData = {
        name: payerName,
        email: payerEmail,
        amount: PRICE.toFixed(2),
        orderID: data.orderID,
        printId: print.id,
        size: 'default', // No size on print, so use default
      }
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      })
      if (!response.ok) {
        const errorText = await response.text()
        setPaypalError(`Payment processing failed: ${errorText}`)
        return
      }
      const result = await response.json()
      // Redirect to completed order page with order details
      window.location.href = `/prints/order-complete?orderId=${result.order.id}`
    } catch (error: any) {
      setPaypalError(`Payment failed. ${error?.message || ''}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const onError = (err: any) => {
    console.error('PayPal error:', err)
    setPaypalError('An error occurred with PayPal. Please try again. ' + (err?.message || ''))
  }

  return (
    <PayPalScriptProvider options={{
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
      currency: 'USD',
      intent: 'capture',
    }}>
      <div className="flex flex-row gap-4 mb-6">
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
          disabled={isProcessing}
        />
      </div>
      {paypalError && (
        <div className="text-red-600 mt-2">{paypalError}</div>
      )}
    </PayPalScriptProvider>
  )
}
