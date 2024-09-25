'use client'
import Link from 'next/link'
import { useState } from 'react'
import OnboardingHeader from '../onboarding-header'
import OnboardingProgress from '../onboarding-progress'

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
}

export default function Onboarding01() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: 1,
      title: 'Manicure (Example Service)',
      description: 'Indulge in professional nail care with our manicure service. Choose from a variety of stunning designs and enjoy long-lasting, exquisite results.',
      price: 2.00,
      duration: '30 min',
    },
    {
      id: 2,
      title: 'Manicure Test',
      description: 'A special test service for manicures.',
      price: 32.00,
      duration: '30 min',
    },
  ];

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="relative flex flex-col md:flex-row md:justify-between max-w-7xl mx-auto">
        {/* Left Side: Service Selection */}
        <div className="w-full md:w-2/3 p-8">
          <OnboardingHeader />
          <OnboardingProgress step={1} />

          {/* Services List */}
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-6 rounded-lg border transition ${
                  selectedService?.id === service.id
                    ? 'border-violet-500 bg-violet-100 dark:bg-violet-900'
                    : 'border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800'
                }`}
                onClick={() => handleSelectService(service)}
              >
                <h2 className="text-2xl font-semibold">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{service.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold">${service.price.toFixed(2)}</span>
                  <span>{service.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Appointment Summary */}
        <div className="md:fixed md:right-0 w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 p-8 md:h-[100vh] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Appointment Summary</h2>
          {selectedService ? (
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>{selectedService.title}</p>
              <p>{selectedService.duration}</p>
              <p>${selectedService.price.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No services added yet</p>
          )}
          <Link href="/onboarding-02">
            <button
              className={`mt-8 w-full p-4 font-semibold rounded-lg transition ${
                selectedService
                  ? 'bg-violet-500 hover:bg-violet-600 text-white'
                  : 'bg-gray-500 cursor-not-allowed text-white'
              }`}
              disabled={!selectedService}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
