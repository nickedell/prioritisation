import React from 'react';

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
    return (
        <>
            <div className="flex justify-end mb-4">
                <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                >
                <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}>
                    <div className={`w-3 h-3 rounded-full absolute top-0.5 transition-transform ${
                    darkMode 
                        ? 'bg-white translate-x-4' 
                        : 'bg-gray-600 translate-x-0.5'
                    }`} />
                </div>
                </button>
            </div>
            <div className="mb-8">
                <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>TOM Prioritisation Tool</h1>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Score each dimension on a 1-5 scale. The tool will automatically calculate priorities and apply special filters.</p>
            </div>
        </>
    );
};

export default Header;