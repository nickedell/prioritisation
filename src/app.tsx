// import React, { useState } from 'react'; // No longer needed, useState is imported directly
import { useState } from 'react';
import { initialTomDimensions } from './constants/dimensions.ts'; // Note the .ts extension
import { TOMDimension, Weights } from './types/index.ts';       // Note the .ts extension
import { usePrioritisation } from './hooks/usePrioritisation.ts';   // Note the .ts extension

import Header from './components/Header.tsx';                     // Note the .tsx extension
import Configuration from './components/Configuration.tsx';       // Note the .tsx extension
import DimensionTable from './components/DimensionTable.tsx';     // Note the .tsx extension
import PrioritisationResults from './components/PrioritisationResults.tsx'; // Note the .tsx extension

const App = () => {
  const [tomDimensions, setTomDimensions] = useState<TOMDimension[]>(initialTomDimensions);
  const [darkMode, setDarkMode] = useState(true);
  
  const [weights, setWeights] = useState<Weights>({
    businessImpact: 35,
    feasibility: 30,
    political: 20,
    foundation: 15
  });

  const prioritisedDimensions = usePrioritisation(tomDimensions, weights);

  const updateScore = (id: number, field: keyof TOMDimension, value: string | number) => {
    setTomDimensions(prev => 
      prev.map(dim => 
        dim.id === id ? { 
          ...dim, 
          [field]: typeof value === 'string' ? (field === 'currentScore' ? parseFloat(value) : parseInt(value)) || 0 : value
        } : dim
      )
    );
  };
  
  return (
    <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="mb-8">
        <Configuration 
            weights={weights} 
            setWeights={setWeights} 
            darkMode={darkMode} 
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Input Scores */}
        <div className="flex-1">
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Input Scores</h2>
          <DimensionTable 
            tomDimensions={tomDimensions} 
            updateScore={updateScore} 
            darkMode={darkMode} 
          />
        </div>

        {/* Right sidebar - Prioritised Results */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="sticky top-6">
            <PrioritisationResults 
              prioritisedDimensions={prioritisedDimensions} 
              darkMode={darkMode} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;