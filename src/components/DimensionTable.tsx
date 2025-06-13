import React, { useState, useMemo } from 'react';
import { TOMDimension } from '../types/index.ts';
import { dimensionDescriptions } from '../constants/dimensions.ts';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DimensionTableProps {
    tomDimensions: TOMDimension[];
    updateScore: (id: number, field: keyof TOMDimension, value: string) => void;
    darkMode: boolean;
}

const DimensionTable: React.FC<DimensionTableProps> = ({ tomDimensions, updateScore, darkMode }) => {
    // ... (all existing logic remains the same) ...

    const renderDimensionRow = (dim: TOMDimension, isSubItem = false) => (
        // ... (this function remains the same) ...
    );

    // UPDATE: The top value for the sticky header is adjusted to make space for the caption
    const headerClasses = `sticky top-[68px] z-10 border p-3 text-center ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-gray-100 border-gray-300 text-gray-900'}`;

    return (
        <table className={`w-full border-collapse border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            {/* UPDATE: Added a sticky caption to act as the table title */}
            <caption className={`sticky top-0 z-20 p-4 text-xl font-semibold text-left ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                Input Scores
            </caption>
            <thead>
                <tr>
                    <th className={`${headerClasses} text-left`}>TOM Dimension</th>
                    <th className={headerClasses}>Maturity Score</th>
                    <th className={headerClasses}>Business Impact</th>
                    <th className={headerClasses}>Feasibility</th>
                    <th className={headerClasses}>Political Viability</th>
                    <th className={headerClasses}>Foundation Building</th>
                </tr>
            </thead>
            <tbody className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                {/* ... (rest of the table body remains the same) ... */}
            </tbody>
        </table>
    );
};

export default DimensionTable;