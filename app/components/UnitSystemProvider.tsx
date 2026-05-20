'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UnitSystem = 'imperial' | 'metric';

interface UnitSystemContextType {
  system: UnitSystem;
  toggleSystem: () => void;
  setSystem: (system: UnitSystem) => void;
}

const UnitSystemContext = createContext<UnitSystemContextType | undefined>(undefined);

export function UnitSystemProvider({ 
  children, 
  initialSystem = 'metric' 
}: { 
  children: React.ReactNode;
  initialSystem?: UnitSystem;
}) {
  const [system, setSystemState] = useState<UnitSystem>(initialSystem);

  // Sync state with cookie when toggled client-side
  const setSystem = (newSystem: UnitSystem) => {
    setSystemState(newSystem);
    document.cookie = `unit-system=${newSystem}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  };

  const toggleSystem = () => {
    setSystem(system === 'imperial' ? 'metric' : 'imperial');
  };

  // Allow hydrating from client-side cookie if server missed it (fallback)
  useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )unit-system=([^;]+)'));
    if (match) {
      const cookieVal = match[2] as UnitSystem;
      if (cookieVal === 'imperial' || cookieVal === 'metric') {
        setSystemState(cookieVal);
      }
    }
  }, []);

  return (
    <UnitSystemContext.Provider value={{ system, toggleSystem, setSystem }}>
      {children}
    </UnitSystemContext.Provider>
  );
}

export function useUnitSystem() {
  const context = useContext(UnitSystemContext);
  if (context === undefined) {
    throw new Error('useUnitSystem must be used within a UnitSystemProvider');
  }
  return context;
}
