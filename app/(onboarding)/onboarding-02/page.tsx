"use client";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/app/css/style.css'; // Path to your custom styles
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
  available: boolean;
}

export default function Onboarding02() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const selectedService: Service = {
    id: 1,
    title: 'Manicure (Example Service)',
    price: 2.00,
    duration: '30 min',
  };

  const morningSlots: TimeSlot[] = [
    { id: 1, time: '9:00 AM', available: true },
    { id: 2, time: '9:30 AM', available: true },
    { id: 3, time: '10:00 AM', available: true },
    { id: 4, time: '10:30 AM', available: true },
    { id: 5, time: '11:00 AM', available: true },
  ];

  const handleTimeSlotClick = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot);
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="relative flex flex-col md:flex-row md:justify-between max-w-7xl mx-auto">
        {/* Left Side: Date and Time Selection */}
        <div className="w-full md:w-2/3 p-8">
          <OnboardingHeader />
          <OnboardingProgress step={2} />

          {/* Date Picker Integration */}
          <div className="max-w-md mx-auto mb-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-lg text-white font-semibold mb-4 p-4">Select a Date</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()} // Disable past dates
              inline
              className="custom-datepicker"  // Apply custom styles
            />
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="max-w-md mx-auto mb-6">
              <h2 className="text-lg font-semibold mb-4">
                Available Time Slots for {selectedDate.toLocaleDateString()}
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {morningSlots.map((slot) => (
                  <button
                    key={slot.id}
                    className={`p-3 rounded-lg transition hover:bg-violet-200 hover:text-violet-500 ${
                      selectedTimeSlot?.id === slot.id ?
                        ' ring-2 ring-violet-300 bg-violet-50 text-violet-500'
                        : 'bg-violet-500 text-white'
                    }`}
                    disabled={!slot.available}
                    onClick={() => handleTimeSlotClick(slot)}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Appointment Summary */}
        <div className="md:fixed md:right-0 w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 p-8 md:h-[100vh] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Appointment Summary</h2>

          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>{selectedService.title}</p>
            <p>{selectedService.duration}</p>
            <p>${selectedService.price.toFixed(2)}</p>

            {selectedDate ? <p>Date: {selectedDate.toLocaleDateString()}</p> : <p>Date: Not selected</p>}
            {selectedTimeSlot ? <p>Time: {selectedTimeSlot.time}</p> : <p>Time: Not selected</p>}
          </div>

          <Link href="/onboarding-03">
            <button
              className={`mt-8 w-full p-4 font-semibold rounded-lg transition ${
                selectedDate && selectedTimeSlot
                  ? 'bg-violet-500 hover:bg-violet-600 text-white'
                  : 'bg-gray-500 cursor-not-allowed'
              }`}
              disabled={!selectedDate || !selectedTimeSlot}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
