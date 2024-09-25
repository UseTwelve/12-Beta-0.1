'use client';
import Link from 'next/link';
import OnboardingHeader from '../onboarding-header';
import OnboardingProgress from '../onboarding-progress';

interface Service {
  id: number;
  title: string;
  price: number;
  duration: string;
}

interface TimeSlot {
  id: number;
  time: string;
}

export default function Onboarding04() {
  const selectedService: Service = {
    id: 1,
    title: 'Manicure (Example Service)',
    price: 2.00,
    duration: '30 min',
  };

  const selectedDate = new Date();
  const selectedTimeSlot: TimeSlot = {
    id: 1,
    time: '9:00 AM',
  };

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="relative flex flex-col md:flex-row md:justify-between max-w-7xl mx-auto">
        {/* Left Side: Zelle Payment Instructions */}
        <div className="w-full md:w-2/3 p-8">
          <OnboardingHeader />
          <OnboardingProgress step={4} />

          <div className="max-w-md mx-auto text-center">
            <svg className="inline-flex w-16 h-16 fill-current mb-6 text-green-700" viewBox="0 0 64 64">
              <circle className="text-green-500/20" cx="32" cy="32" r="32" />
              <path d="M37.22 26.375a1 1 0 1 1 1.56 1.25l-8 10a1 1 0 0 1-1.487.082l-4-4a1 1 0 0 1 1.414-1.414l3.21 3.21 7.302-9.128Z" />
            </svg>
            <h1 className="text-3xl font-bold mb-8">Complete Your Payment via Zelle</h1>
            <div className="mb-8 text-left text-gray-700 dark:text-gray-300">
              <p>
                Please complete your payment via Zelle using the following details:
              </p>
              <ul className="mt-4 mb-8 space-y-4">
                <li><strong>Zelle Account:</strong> payment@youremail.com</li>
                <li><strong>Amount:</strong> ${selectedService.price.toFixed(2)}</li>
                <li><strong>Appointment ID:</strong> [appointment-ID] (Please include this in the memo)</li>
              </ul>
              <p>
                Once we receive your Zelle payment, we will confirm your appointment. If you have any questions, feel free to contact us.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Appointment Summary */}
        <div className="md:fixed md:right-0 w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 p-8 md:h-[100vh] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Appointment Summary</h2>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>{selectedService.title}</p>
            <p>{selectedService.duration}</p>
            <p>${selectedService.price.toFixed(2)}</p>

            <p>Date: {selectedDate.toLocaleDateString()}</p>
            <p>Time: {selectedTimeSlot.time}</p>
          </div>

          <Link href="zelle://" target="_blank" rel="noopener noreferrer">
            <button className="mt-8 w-full p-4 font-semibold rounded-lg transition bg-violet-500 hover:bg-violet-600 text-white">
              Book Appointment
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
