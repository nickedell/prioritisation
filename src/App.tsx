import { useState } from 'react';
import { initialTomDimensions } from './constants/dimensions.ts';
import { TOMDimension, Weights } from './types/index.ts';
import { usePrioritisation } from './hooks/usePrioritisation.ts';

import Header from './components/Header.tsx';
import Configuration from './components/Configuration.tsx';
import DimensionTable from './components/DimensionTable.tsx';
import PrioritisationResults from './components/PrioritisationResults.tsx';

const App = () => {
    // ... (all existing logic remains the same) ...

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    onExportClick={handleExport}
                    onImportFileSelect={handleImport}
                />
                <div className="mb-8">
                    <Configuration
                        weights={weights}
                        setWeights={setWeights}
                        darkMode={darkMode}
                    />
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        {/* UPDATE: The h2 title has been removed from here */}
                        <div className="overflow-x-auto">
                            <DimensionTable
                                tomDimensions={tomDimensions}
                                updateScore={updateScore}
                                darkMode={darkMode}
                            />
                        </div>
                    </div>
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
        </div>
    );
};

export default App;