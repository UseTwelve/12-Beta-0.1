"use client";
import React, { useState } from "react";
import Link from "next/link";
import OnboardingHeader from "../onboarding-header";

interface PaymentOption {
  id: number;
  label: string;
  description: string;
  link: string; // New field to handle different flows
}

export default function PaymentChoicePage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption | null>(null);

  // Updated payment options with redirect links
  const paymentOptions: PaymentOption[] = [
    {
      id: 1,
      label: "Pay with Credit Card (Square)",
      description:
        "You will be directed to the Square platform to book your appointment and pay with a credit card.",
      link: "https://squareup.com/appointments/book/hcicx6bzlu8l1x/LMVN8DRYPKNKE/start", // Placeholder Square booking link
    },
    {
      id: 2,
      label: "Pay with Zelle",
      description: "You will continue booking your appointment on our platform and pay with Zelle.",
      link: "/onboarding-01", // Link to your domain's booking flow
    },
  ];

  const handlePaymentSelect = (option: PaymentOption) => {
    setSelectedPayment(option);
  };

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm rounded-xl relative min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <OnboardingHeader />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            How do you plan to pay for your appointment after booking?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
            Please select your preferred payment method. Based on your choice, you will be guided to the respective booking flow.
          </p>

          {/* Payment Options */}
          <div className="space-y-6">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className={`p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transition hover:bg-violet-100 dark:hover:bg-violet-600 cursor-pointer ${
                  selectedPayment?.id === option.id
                    ? "border-violet-500 border-2"
                    : "border border-gray-300 dark:border-gray-700"
                }`}
                onClick={() => handlePaymentSelect(option)}
              >
                <h2 className="text-2xl font-semibold">{option.label}</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{option.description}</p>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="mt-8 text-center">
            {selectedPayment ? (
              <Link href={selectedPayment.link} target={selectedPayment.id === 1 ? "_blank" : "_self"}>
                <button className="px-8 py-4 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg shadow-lg">
                  Continue with {selectedPayment.label}
                </button>
              </Link>
            ) : (
              <button
                className="px-8 py-4 bg-gray-500 text-white font-semibold rounded-lg cursor-not-allowed"
                disabled
              >
                Select a Payment Method to Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
