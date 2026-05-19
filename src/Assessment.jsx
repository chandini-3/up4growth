import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const dimensionsKey = [
  'Workplace Performance',
  'Work Environment',
  'Career Direction',
  'Income',
  'Mental Wellbeing',
  'Work-Life Balance',
  'Relationships at Work',
  'Skillset'
];

const dimensionQuestions = {
  'Workplace Performance': [
    'How satisfied are you with your promotion opportunities?',
    'How recognized is your expertise in your team?',
    'How would you rate your visibility to leadership?',
    'How would you rate your overall productivity?',
    'How satisfied are you with the recognition you receive?'
  ],
  'Work Environment': [
    'How aligns the office culture with your values?',
    'How satisfied are you with work location flexibility?',
    'How acceptable is your daily travel time/commute?',
    'How positive is your immediate team environment?',
    'How would you rate the safety and comfort of your workspace?'
  ],
  'Career Direction': [
    'How satisfied are you with your current career trajectory?',
    'How clear is your path for career navigation?',
    'How satisfied are you with your growth opportunities?',
    'How aligned is your role with your long-term goals?',
    'How would you rate the career support you receive at work?'
  ],
  'Income': [
    'How satisfied are you with your current salary?',
    'How would you rate your financial stability from this job?',
    'How satisfied are you with your pension and benefits?',
    'How optimal is your residual/bonus income potential?',
    'How would you rate the fairness of your compensation?'
  ],
  'Mental Wellbeing': [
    'How manageable are your stress levels at work?',
    'How well does your job allow for quality sleep?',
    'How much does your role allow for self-care routines?',
    'How would you rate your emotional balance during work?',
    'How well can you relax after a workday?'
  ],
  'Work-Life Balance': [
    'How well does your schedule allow for leisure activities?',
    'How satisfied are you with the time available for family?',
    'How appropriate is the amount of time spent at work?',
    'How well can you pursue personal hobbies?',
    'How effectively are you managing burnout?'
  ],
  'Relationships at Work': [
    'How positive are your team relationships?',
    'How effective is communication within your workplace?',
    'How would you rate the internal support you receive?',
    'How satisfied are you with your external networking opportunities?',
    'How strong is the trust and collaboration in your team?'
  ],
  'Skillset': [
    'How satisfied are you with the training provided?',
    'How much passion do you feel for your daily tasks?',
    'How confident are you in your current expertise?',
    'How strongly does your environment foster a learning mindset?',
    'How satisfied are you with your professional development?'
  ]
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="font-semibold text-gray-800">{payload[0].payload.dimension}</p>
        <p className="text-primary font-bold">Score: {payload[0].value.toFixed(1)} / 10</p>
      </div>
    );
  }
  return null;
};

export default function Assessment({ onClose }) {
  const [step, setStep] = useState('intro'); // intro, questions, results
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState([]);

  const handleStart = () => setStep('questions');

  const handleAnswer = (questionIndex, value) => {
    const dimension = dimensionsKey[currentDimensionIndex];
    setAnswers(prev => ({
      ...prev,
      [dimension]: {
        ...prev[dimension],
        [questionIndex]: value
      }
    }));
  };

  const currentDimension = dimensionsKey[currentDimensionIndex];
  const currentQuestions = dimensionQuestions[currentDimension];
  const currentDimensionAnswers = answers[currentDimension] || {};
  const isCurrentDimensionComplete = Object.keys(currentDimensionAnswers).length === currentQuestions.length;

  const handleNext = () => {
    if (currentDimensionIndex < dimensionsKey.length - 1) {
      setCurrentDimensionIndex(prev => prev + 1);
    } else {
      calculateScores();
      setStep('results');
    }
  };

  const handlePrev = () => {
    if (currentDimensionIndex > 0) {
      setCurrentDimensionIndex(prev => prev - 1);
    }
  };

  const calculateScores = () => {
    const finalScores = dimensionsKey.map(dim => {
      const dimAnswers = answers[dim] || {};
      const values = Object.values(dimAnswers);
      const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      return {
        dimension: dim,
        score: avg,
        fullMark: 10
      };
    });
    setScores(finalScores);
  };

  const getRecommendations = () => {
    if (!scores.length) return [];
    const sorted = [...scores].sort((a, b) => a.score - b.score);
    return sorted.slice(0, 3).map(s => s.dimension);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Career Wheel of Life</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-grow flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Discover Your True Career Balance
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Take our comprehensive assessment across 8 vital dimensions to visualize your career satisfaction and identify areas for growth.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full">
                {dimensionsKey.slice(0, 4).map((dim, i) => (
                  <div key={i} className="bg-orange-50 p-3 rounded-lg text-sm font-medium text-orange-800">
                    {dim}
                  </div>
                ))}
              </div>

              <button
                onClick={handleStart}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                Start Assessment <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow flex flex-col"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Dimension {currentDimensionIndex + 1} of {dimensionsKey.length}</span>
                  <span>{Math.round(((currentDimensionIndex) / dimensionsKey.length) * 100)}% Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${((currentDimensionIndex) / dimensionsKey.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentDimension}</h3>
                <p className="text-gray-500 mb-8">Rate your satisfaction from 1 (lowest) to 10 (highest)</p>

                <div className="space-y-8">
                  {currentQuestions.map((q, idx) => (
                    <div key={idx} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                      <p className="text-lg text-gray-800 mb-4">{q}</p>
                      <div className="flex justify-between gap-1 md:gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <button
                            key={num}
                            onClick={() => handleAnswer(idx, num)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-medium transition-all
                              ${currentDimensionAnswers[idx] === num 
                                ? 'bg-orange-500 text-white shadow-md transform scale-110' 
                                : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                              }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentDimensionIndex === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
                    ${currentDimensionIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ArrowLeft className="w-5 h-5" /> Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isCurrentDimensionComplete}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all
                    ${!isCurrentDimensionComplete 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'}`}
                >
                  {currentDimensionIndex === dimensionsKey.length - 1 ? 'See Results' : 'Next'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-grow flex flex-col items-center"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-500 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
                <p className="text-gray-600">Here is your tailored Career Wheel of Life visualization.</p>
              </div>

              <div className="w-full flex flex-col md:flex-row gap-8 items-center md:items-start max-w-5xl">
                {/* Chart Container */}
                <div className="w-full md:w-1/2 md:mt-24 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-[400px] md:h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={scores}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="dimension" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#9ca3af' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Radar
                        name="Career Score"
                        dataKey="score"
                        stroke="#f97316"
                        fill="#f97316"
                        fillOpacity={0.4}
                        animationDuration={1500}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Analysis */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Based on your responses, we've identified some key focus areas for your career growth. A balanced wheel indicates steady career satisfaction, while indented areas represent opportunities for development.
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Recommended Focus Areas:</h4>
                      <ul className="space-y-2">
                        {getRecommendations().map((req, i) => (
                          <li key={i} className="flex items-center gap-2 text-orange-800 bg-white px-4 py-2 rounded-lg text-sm font-medium border border-orange-100 shadow-sm">
                            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">{i+1}</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}