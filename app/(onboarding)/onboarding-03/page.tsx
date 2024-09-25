'use client';

import { useState } from 'react';
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

export default function Onboarding03() {
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!name || !email || !phone) {
      e.preventDefault();
      setShowErrors(true);
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="relative flex flex-col md:flex-row md:justify-between max-w-7xl mx-auto">
        {/* Left Side: Personal Details Form */}
        <div className="w-full md:w-2/3 p-8">
          <OnboardingHeader />
          <OnboardingProgress step={3} />

          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6">Enter Your Personal Details</h1>
            <form>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="full-name">Full Name</label>
                <input
                  id="full-name"
                  className="form-input w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {showErrors && !name && <p className="text-red-500 text-sm">Full Name is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  className="form-input w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {showErrors && !email && <p className="text-red-500 text-sm">Email is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  className="form-input w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {showErrors && !phone && <p className="text-red-500 text-sm">Phone is required</p>}
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Appointment Summary */}
        <div className="md:fixed md:right-0 w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 p-8 md:h-[100vh] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Appointment Summary</h2>

          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>{selectedService.title}</p>
            <p>{selectedService.duration}</p>
            <p>${selectedService.price.toFixed(2)}</p>

            <p>Date: {selectedDate.toLocaleDateString()}</p>
            <p>Time: {selectedTimeSlot.time}</p>
          </div>

          <Link href="/onboarding-04">
            <button
              className={`mt-8 w-full p-4 font-semibold rounded-lg transition ${
                name && email && phone ? 'bg-violet-500 hover:bg-violet-600 text-white' : 'bg-gray-500 cursor-not-allowed'
              }`}
              onClick={handleNextClick}
              disabled={!name || !email || !phone}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
