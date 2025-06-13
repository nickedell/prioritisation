import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Weights } from '../types/index.ts';

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

    const getPieSegments = () => {
        let currentAngle = -90;
        const segments = [];
        const criteriaOrder: (keyof Weights)[] = ['businessImpact', 'feasibility', 'political', 'foundation'];
        const colors = darkMode ? ['#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'] : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        
        criteriaOrder.forEach((key, index) => {
            const percentage = weights[key];
            const angle = (percentage / 100) * 360;
            const endAngle = currentAngle + angle;
            const radius = 80, centerX = 100, centerY = 100;
            const startAngleRad = (currentAngle * Math.PI) / 180;
            const endAngleRad = (endAngle * Math.PI) / 180;
            const midAngleRad = ((currentAngle + endAngle) / 2 * Math.PI) / 180;
            const x1 = centerX + radius * Math.cos(startAngleRad);
            const y1 = centerY + radius * Math.sin(startAngleRad);
            const x2 = centerX + radius * Math.cos(endAngleRad);
            const y2 = centerY + radius * Math.sin(endAngleRad);
            const labelX = centerX + (radius * 0.7) * Math.cos(midAngleRad);
            const labelY = centerY + (radius * 0.7) * Math.sin(midAngleRad);
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [`M ${centerX} ${centerY}`, `L ${x1} ${y1}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, 'Z'].join(' ');
            
            segments.push({ key, pathData, color: colors[index], percentage, labelX, labelY });
            currentAngle = endAngle;
        });
        return segments;
    };

    const getBarSegments = () => {
        const criteriaOrder: (keyof Weights)[] = ['businessImpact', 'feasibility', 'political', 'foundation'];
        const colors = darkMode ? ['#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'] : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        const labels = ['Business Impact', 'Feasibility', 'Political Viability', 'Foundation Building'];
        
        let cumulativeWidth = 0;
        return criteriaOrder.map((key, index) => {
            const width = weights[key];
            const segment = { key, width, left: cumulativeWidth, color: colors[index], label: labels[index], percentage: weights[key] };
            cumulativeWidth += width;
            return segment;
        });
    };

    const detailsContent = [
        { title: 'Business Impact Potential', description: 'Measures how significantly this improvement will affect business outcomes, including revenue, risk mitigation, efficiency gains, and strategic objectives.', scale: ['5 - Critical: Directly impacts revenue, risk, or strategic objectives', '4 - High: Significant efficiency gains or cost reduction', '3 - Medium: Moderate improvement in business processes', '2 - Low: Minor operational benefits', '1 - Minimal: Limited business value'], questions: ['Will fixing this meaningfully improve business outcomes?', 'Does this address a major business pain point?', 'Will this improve data trust/reputation?', 'Can we measure ROI within 6-12 months?'] },
        { title: 'Implementation Feasibility', description: 'Assesses how realistic it is to deliver this improvement given available resources, organizational constraints, and technical dependencies.', scale: ['5 - Very Easy: Can implement immediately with existing resources', '4 - Easy: Minor effort, clear solution path', '3 - Moderate: Requires some new processes/tools but achievable', '2 - Hard: Significant effort, multiple dependencies', '1 - Very Hard: Major organizational change or technical overhaul required'], questions: ['Can we realistically deliver this with available resources?', 'Do we control the key levers for change?', 'What\'s the resource requirement (people, time, budget)?', 'Are there technical or regulatory constraints?'] },
        { title: 'Political Viability', description: 'Evaluates the likelihood of gaining necessary stakeholder support and navigating organizational politics to successfully implement this change.', scale: ['5 - Strong Support: Data Office and business actively supportive', '4 - Good Support: Some resistance but overall positive', '3 - Neutral: Mixed views, manageable politics', '2 - Some Resistance: Significant political hurdles to overcome', '1 - Strong Resistance: Major stakeholder opposition expected'], questions: ['Can we get the stakeholder support needed to succeed?', 'Does this step on Data Office territorial concerns?', 'Will the business champion this change?', 'Are there hidden political landmines?'] },
        { title: 'Foundation Building', description: 'Measures how much this improvement enables or unlocks other future improvements, building organizational capability and creating positive momentum.', scale: ['5 - Critical Foundation: Enables multiple other improvements', '4 - Important Enabler: Supports several other initiatives', '3 - Some Enablement: Helps with a few other areas', '