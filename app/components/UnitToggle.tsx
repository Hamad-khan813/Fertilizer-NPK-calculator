'use client';

import React from 'react';
import { useUnitSystem } from './UnitSystemProvider';

export default function UnitToggle() {
  const { system, toggleSystem } = useUnitSystem();

  return (
    <div className="flex items-center space-x-3 mb-6" role="group" aria-labelledby="unit-toggle-label">
      <span id="unit-toggle-label" className="sr-only">Choose unit system</span>
      
      <span 
        className={`text-sm font-medium ${system === 'imperial' ? 'text-gray-900 font-bold' : 'text-gray-500'}`}
        aria-hidden="true"
      >
        Imperial (lbs/sq ft)
      </span>
      
      <button
        type="button"
        role="switch"
        aria-checked={system === 'metric'}
        aria-label="Toggle to Metric System"
        onClick={toggleSystem}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
          system === 'metric' ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            system === 'metric' ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>

      <span 
        className={`text-sm font-medium ${system === 'metric' ? 'text-gray-900 font-bold' : 'text-gray-500'}`}
        aria-hidden="true"
      >
        Metric (kg/sq m)
      </span>
    </div>
  );
}
