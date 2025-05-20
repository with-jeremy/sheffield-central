"use client"

import React, { useState } from "react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { prints } from "@/lib/data"

export default function PrintDetailActions({ print }: { print: typeof prints[0] }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paypalError, setPaypalError] = useState("")
  const PRICE = 12.00

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: PRICE.toFixed(2),
            currency_code: 'USD',
          },
          description: print.title,
          custom_id: print.id.toString(),
        },
      ],
    })
  }

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true)
    setPaypalError("")
    try {
      const order = await actions.order.get()
      console.log('PayPal order details:', order)
      const payerName = order.payer?.name?.given_name || ''
      const payerEmail = order.payer?.email_address || ''
      const paymentData = {
        name: payerName,
        email: payerEmail,
        amount: PRICE.toFixed(2),
        orderID: data.orderID,
        printId: print.id,
      }
      console.log('Sending payment data to /api/payment:', paymentData)
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      })
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API error response:', errorText)
        setPaypalError(`Payment processing failed: ${errorText}`)
        return
      }
      const result = await response.json()
      console.log('API response:', result)
      alert('Payment processed successfully!')
    } catch (error: any) {
      console.error('Payment failed:', error)
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
      clientId:"test",
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
