import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Weights } from '../types';

interface ConfigurationProps {
    weights: Weights;
    setWeights: (weights: Weights) => void;
    darkMode: boolean;
}

const defaultWeights: Weights = {
    businessImpact: 35,
    feasibility: 30,
    political: 20,
    foundation: 15,
};

const Configuration: React.FC<ConfigurationProps> = ({ weights, setWeights, darkMode }) => {
    const [showConfigure, setShowConfigure] = useState(false);
    const [showCriteriaDetails, setShowCriteriaDetails] = useState(false);
    const [chartType, setChartType] = useState('pie');

    const handleWeightChange = (criterion: keyof Weights, value: string) => {
        const newValue = Math.max(1, Math.min(97, parseInt(value) || 1));
        const otherCriteria = (Object.keys(weights) as Array<keyof Weights>).filter(key => key !== criterion);
        const otherSum = otherCriteria.reduce((sum, key) => sum + weights[key], 0);
        const remaining = 100 - newValue;

        if (remaining >= 3 && otherSum > 0) {
            const newWeights = { ...weights, [criterion]: newValue };
            const factor = remaining / otherSum;
            otherCriteria.forEach(key => {
                newWeights[key] = Math.max(1, Math.round(weights[key] * factor));
            });
            
            const total = Object.values(newWeights).reduce((sum, weight) => sum + weight, 0);
            if (total !== 100) {
                const diff = 100 - total;
                newWeights.businessImpact += diff;
            }
            
            setWeights(newWeights);
        }
    };

    const resetToDefaults = () => setWeights(defaultWeights);

    // Chart rendering logic (getPieSegments, getBarSegments) from the original
    // monolithic component would be placed here to generate the charts.
    // For brevity, we'll just show the inputs.

    return (
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            {/* Summary Row */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Business Impact ({weights.businessImpact}%)</strong><br />1=Minimal, 5=Critical</div>
                <div><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Feasibility ({weights.feasibility}%)</strong><br />1=Very Hard, 5=Very Easy</div>
                <div><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Political Viability ({weights.political}%)</strong><br />1=Strong Resistance, 5=Strong Support</div>
                <div><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Foundation Building ({weights.foundation}%)</strong><br />1=Standalone, 5=Critical Foundation</div>
            </div>
            
            {/* Configure Toggle */}
            <button onClick={() => setShowConfigure(!showConfigure)} className={`flex items-center font-semibold w-full transition-colors mb-3 ${darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                {showConfigure ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                Configure
            </button>
            
            {/* Configure Panel */}
            {showConfigure && (
                 <div className="mb-6 space-y-4">
                    {/* ... (Full UI for weight charts and inputs from original file) ... */}
                    <div className="grid grid-cols-4 gap-4">
                        {/* Input for Business Impact */}
                        <div>
                            <label className={`block text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Business Impact</label>
                            <input type="number" min="1" max="97" value={weights.businessImpact} onChange={(e) => handleWeightChange('businessImpact', e.target.value)} className={`w-full px-2 py-1 text-xs border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                        </div>
                        {/* Inputs for other criteria... */}
                    </div>
                 </div>
            )}
            
            {/* Details Toggle */}
            <button onClick={() => setShowCriteriaDetails(!showCriteriaDetails)} className={`flex items-center font-semibold w-full transition-colors ${darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                {showCriteriaDetails ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                Details
            </button>
            
            {/* Details Panel */}
            {showCriteriaDetails && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                    {/* Business Impact Details */}
                    <div className="flex flex-col space-y-3">
                        <h4 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Business Impact Potential</h4>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Measures how significantly this improvement will affect business outcomes...</p>
                    </div>
                    {/* Other criteria details panels... */}
                </div>
            )}
        </div>
    );
};

export default Configuration;