"use client";

import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PrintSizeSelector from "./PrintSizeSelector";

// Define the Print interface based on the properties used in the component
interface Print {
  id: number | string;
  title: string;
}

interface ProductActionsProps {
  print: Print;
  pricing: Array<{ id: number; description: string; amount: number }>;
}

export default function ProductActions({
  print,
  pricing,
}: ProductActionsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const handleSizeSelect = (size: string, price: number) => {
    setSelectedSize(size);
    setSelectedPrice(price);
  };

  const createOrder = async (data: any, actions: any) => {
    if (selectedPrice == null || !selectedSize)
      throw new Error("No size selected");
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(selectedPrice).toFixed(2),
          description: `${print.title} (${selectedSize})`,
          custom_id: print.id.toString(),
        }),
      });
      const order = await res.json();
      if (!order.id) throw new Error("No order ID returned from backend");
      return order.id;
    } catch (err: any) {
      setPaypalError("Failed to create PayPal order. " + (err?.message || ""));
      throw err;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true);
    setPaypalError("");
    try {
      const order = await actions.order.get();
      const payerName = order.payer?.name?.given_name || "";
      const payerEmail = order.payer?.email_address || "";
      const paymentData = {
        name: payerName,
        email: payerEmail,
        amount: Number(selectedPrice).toFixed(2),
        orderID: data.orderID,
        printId: print.id,
        size: selectedSize,
      };
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        setPaypalError(`Payment processing failed: ${errorText}`);
        return;
      }
      const result = await response.json();
      window.location.href = `/prints/order-complete?orderId=${result.order.id}`;
    } catch (error: any) {
      setPaypalError(`Payment failed. ${error?.message || ""}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (err: any) => {
    console.error("PayPal error:", err);
    setPaypalError(
      "An error occurred with PayPal. Please try again. " + (err?.message || "")
    );
  };

  return (
    <>
      <PrintSizeSelector
        selectedSize={selectedSize}
        onSelect={handleSizeSelect}
        pricing={pricing}
      />
      {selectedSize && (
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
            currency: "USD",
            intent: "capture",
          }}
        >
          <div className="flex flex-row gap-4 mb-6">
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "paypal",
              }}
              disabled={isProcessing}
            />
          </div>
        </PayPalScriptProvider>
      )}
      {paypalError && <div className="text-red-600 mt-2">{paypalError}</div>}
    </>
  );
}
