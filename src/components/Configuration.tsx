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
    
    // Chart rendering logic from the original component
    const getPieSegments = () => {
        let currentAngle = -90;
        const segments = [];
        const criteriaOrder: (keyof Weights)[] = ['businessImpact', 'feasibility', 'political', 'foundation'];
        const colors = darkMode ? ['#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'] : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        
        criteriaOrder.forEach((key, index) => {
            const percentage = weights[key];
            const angle = (percentage / 100) * 360;
            const pathData = `...`; // Full path calculation logic needed here
            // This is a complex calculation; for a real app, a chart library is better.
            // But we are recreating the original logic.
            segments.push({ key, pathData, color: colors[index], percentage });
        });
        return segments; // This is a simplified placeholder
    };

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
                    <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Adjust Criteria Weights</h4>
                        <div className="flex items-center space-x-3">
                            <button onClick={resetToDefaults} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Reset to Default</button>
                            {/* Chart Type Toggle UI would go here */}
                        </div>
                    </div>
                    {/* Placeholder for chart */}
                    <div className="text-center py-8">[Chart UI would be rendered here]</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(Object.keys(weights) as Array<keyof Weights>).map(criterion => (
                            <div key={criterion}>
                                <label className={`block text-xs mb-1 capitalize ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{criterion.replace(/([A-Z])/g, ' $1').trim()}</label>
                                <input type="number" min="1" max="97" value={weights[criterion]} onChange={(e) => handleWeightChange(criterion, e.target.value)} className={`w-full px-2 py-1 text-xs border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                            </div>
                        ))}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total: {Object.values(weights).reduce((s, v) => s + v, 0)}%</div>
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
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Measures how significantly this improvement will affect business outcomes, including revenue, risk mitigation, efficiency gains, and strategic objectives.</p>
                        {/* Rating descriptions and key questions */}
                    </div>
                    {/* Implementation Feasibility Details */}
                    <div className="flex flex-col space-y-3">
                        <h4 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Implementation Feasibility</h4>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Assesses how realistic it is to deliver this improvement given available resources, organizational constraints, and technical dependencies.</p>
                        {/* Rating descriptions and key questions */}
                    </div>
                    {/* Political Viability Details */}
                    <div className="flex flex-col space-y-3">
                        <h4 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Political Viability</h4>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Evaluates the likelihood of gaining necessary stakeholder support and navigating organizational politics to successfully implement this change.</p>
                        {/* Rating descriptions and key questions */}
                    </div>
                    {/* Foundation Building Details */}
                    <div className="flex flex-col space-y-3">
                        <h4 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Foundation Building</h4>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Measures how much this improvement enables or unlocks other future improvements, building organizational capability and creating positive momentum.</p>
                        {/* Rating descriptions and key questions */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Configuration;