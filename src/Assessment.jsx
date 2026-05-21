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
  'Career Direction',
  'Income',
  'Mental Wellbeing',
  'Work-Life Balance',
  'Relationships at Work',
  'Professional Development',
  'Workplace Performance',
  'Work Environment'
];

const dimensionQuestions = {
  'Career Direction': [
    'How satisfied are you with the clarity and direction of your career path?'
  ],
  'Income': [
    'How satisfied are you with your current income and financial growth opportunities?'
  ],
  'Mental Wellbeing': [
    'How satisfied are you with your mental wellbeing and stress management at work?'
  ],
  'Work-Life Balance': [
    'How satisfied are you with the balance between your work and personal life?'
  ],
  'Relationships at Work': [
    'How satisfied are you with your relationships and communication with colleagues and managers?'
  ],
  'Professional Development': [
    'How satisfied are you with your opportunities to learn new skills and grow professionally?'
  ],
  'Workplace Performance': [
    'How satisfied are you with your productivity and performance at work?'
  ],
  'Work Environment': [
    'How satisfied are you with your workplace environment and overall company culture?'
  ]
};

const dimensionDescriptions = {
  'Career Direction': 'Your career goals and future growth path.',
  'Income': 'Your salary, financial stability, and earning growth.',
  'Mental Wellbeing': 'Your stress levels, emotional health, and peace of mind.',
  'Work-Life Balance': 'Your ability to balance work and personal life.',
  'Relationships at Work': 'Your connection and communication with coworkers and managers.',
  'Professional Development': 'Your learning opportunities and skill growth.',
  'Workplace Performance': 'Your effectiveness, productivity, and recognition at work.',
  'Work Environment': 'Your workplace culture, comfort, and overall environment.'
};

const allQuestions = dimensionsKey.flatMap(dim => 
  dimensionQuestions[dim].map((q, idx) => ({ 
    dimension: dim, 
    question: q, 
    questionIndexInDimension: idx 
  }))
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="font-semibold text-gray-800">{payload[0].payload.dimension}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-bold">
            {entry.name}: {entry.value} / 6
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Assessment({ onClose }) {
  const [step, setStep] = useState('intro'); // intro, questions, results
  const [currentQuestionGlobalIndex, setCurrentQuestionGlobalIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState([]);

  const handleStart = () => setStep('questions');

  const handleAnswer = (type, value) => {
    const { dimension, questionIndexInDimension } = allQuestions[currentQuestionGlobalIndex];
    setAnswers(prev => {
      const updatedDimension = { ...prev[dimension] };
      const currentAns = updatedDimension[questionIndexInDimension] || {};
      const newAns = { ...currentAns, [type]: value };
      updatedDimension[questionIndexInDimension] = newAns;
      
      if (newAns.current !== undefined && newAns.target !== undefined) {
        setTimeout(() => {
          const nextBtn = document.getElementById('next-question-btn');
          if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
          }
        }, 500);
      }

      return {
        ...prev,
        [dimension]: updatedDimension
      };
    });
  };

  const currentQ = allQuestions[currentQuestionGlobalIndex] || allQuestions[0];
  const { dimension: currentDimension, question: currentQuestionText, questionIndexInDimension } = currentQ;
  const currentDimensionAnswers = answers[currentDimension] || {};
  const currentAnswerObj = currentDimensionAnswers[questionIndexInDimension] || {};
  const { current: currentScore, target: targetScore } = currentAnswerObj;

  const isCurrentComplete = currentScore !== undefined && targetScore !== undefined;
  const isLastQuestion = currentQuestionGlobalIndex === allQuestions.length - 1;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionGlobalIndex(prev => prev + 1);
    } else {
      calculateScores();
      setStep('results');
    }
  };

  const handlePrev = () => {
    if (currentQuestionGlobalIndex > 0) {
      setCurrentQuestionGlobalIndex(prev => prev - 1);
    }
  };

  const calculateScores = () => {
    const finalScores = dimensionsKey.map(dim => {
      const dimAnswers = answers[dim] || {};
      const answerList = Object.values(dimAnswers);
      
      const avgCurrent = answerList.length 
        ? answerList.reduce((acc, val) => acc + (val.current || 0), 0) / answerList.length 
        : 0;
      const avgTarget = answerList.length 
        ? answerList.reduce((acc, val) => acc + (val.target || 0), 0) / answerList.length 
        : 0;

      return {
        dimension: dim,
        currentScore: avgCurrent,
        futureScore: avgTarget,
        fullMark: 6
      };
    });
    setScores(finalScores);
  };

  const getRecommendations = () => {
    if (!scores.length) return [];
    // Recommend areas with the biggest gap between current and target scores
    const sorted = [...scores]
      .filter(s => s.futureScore > s.currentScore)
      .sort((a, b) => (b.futureScore - b.currentScore) - (a.futureScore - a.currentScore));
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
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Take our comprehensive assessment across 8 vital dimensions to visualize your career satisfaction and identify areas for growth.
              </p>
              
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
                <div className="flex justify-between text-sm text-gray-500 mb-2 font-medium">
                  <span>Question {currentQuestionGlobalIndex + 1} of {allQuestions.length}</span>
                  <span>{Math.round((currentQuestionGlobalIndex / allQuestions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentQuestionGlobalIndex / allQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-10 flex-grow flex flex-col justify-center text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 tracking-wider uppercase mb-3">{currentDimension}</h3>
                <p className="text-gray-500 mb-8 md:mb-10 text-base sm:text-lg md:text-xl">{dimensionDescriptions[currentDimension]}</p>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 leading-tight">
                  {currentQuestionText}
                </h2>

                <div className="mb-6 md:mb-8 w-full max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      <p className="text-base sm:text-lg text-gray-800 font-semibold">Current Satisfaction</p>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-orange-800 bg-orange-50 px-3 py-1 rounded">Where are you now?</span>
                  </div>
                  <div className="flex flex-nowrap justify-between md:justify-center gap-1 sm:gap-2 lg:gap-3 px-0 lg:px-4 mb-2">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button
                        key={num}
                        onClick={() => handleAnswer('current', num)}
                        className={`w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 shrink-0 rounded-full flex items-center justify-center font-bold text-base sm:text-lg md:text-xl transition-all focus:outline-none
                          ${currentScore === num 
                            ? 'bg-orange-500 text-white shadow-md ring-2 ring-orange-200 transform scale-110' 
                            : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500'
                          }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center px-0 lg:px-8 text-xs sm:text-sm text-gray-400 font-medium w-full max-w-[210px] sm:max-w-full mx-auto sm:mx-0">
                    <span>Very Dissatisfied</span>
                    <span>Very Satisfied</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 mb-6 md:mb-8 max-w-3xl mx-auto w-full"></div>

                <div className="mb-4 w-full max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <p className="text-base sm:text-lg text-gray-800 font-semibold">Target Satisfaction</p>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-blue-800 bg-blue-50 px-3 py-1 rounded">Where do you want to be?</span>
                  </div>
                  <div className="flex flex-nowrap justify-between md:justify-center gap-1 sm:gap-2 lg:gap-3 px-0 lg:px-4 mb-2">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button
                        key={num}
                        onClick={() => handleAnswer('target', num)}
                        className={`w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 shrink-0 rounded-full flex items-center justify-center font-bold text-base sm:text-lg md:text-xl transition-all focus:outline-none
                          ${targetScore === num 
                            ? 'bg-blue-500 text-white shadow-md ring-2 ring-blue-200 transform scale-110' 
                            : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500'
                          }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center px-0 lg:px-8 text-xs sm:text-sm text-gray-400 font-medium w-full max-w-[210px] sm:max-w-full mx-auto sm:mx-0">
                    <span>Very Dissatisfied</span>
                    <span>Very Satisfied</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionGlobalIndex === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
                    ${currentQuestionGlobalIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                  <ArrowLeft className="w-5 h-5" /> Previous
                </button>
                <button
                  id="next-question-btn"
                  onClick={handleNext}
                  disabled={!isCurrentComplete}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-sm
                    ${!isCurrentComplete
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200 shadow-lg'}`}
                >
                   {isLastQuestion ? 'See Results' : 'Next'} <ArrowRight className="w-5 h-5" />
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

              <div className="w-full flex flex-col gap-8 items-center max-w-4xl mx-auto">
                {/* Chart Container */}
                <div className="w-full bg-white p-2 sm:p-4 rounded-2xl shadow-sm border border-gray-100 h-[350px] sm:h-[400px] md:h-[600px] overflow-visible">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius={window.innerWidth < 768 ? "40%" : "65%"} data={scores} margin={{ top: 20, right: window.innerWidth < 768 ? 45 : 30, bottom: 20, left: window.innerWidth < 768 ? 45 : 30 }}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis 
                        dataKey="dimension" 
                        tick={(props) => {
                          const { x, y, payload, textAnchor } = props;
                          const words = payload.value.split(' ');
                          const isMobile = window.innerWidth < 768;

                          // Shift texts slightly inwards on the far left and far right so they never touch the phone's edge
                          let shiftX = 0;
                          if (isMobile) {
                            if (textAnchor === "end") shiftX = 12; // Far Left: Push inwards to the right
                            if (textAnchor === "start") shiftX = -12; // Far Right: Push inwards to the left
                          }
                          
                          // Break long text into two lines if needed on mobile
                          if (isMobile && words.length > 1) {
                            return (
                              <text x={x + shiftX} y={y} textAnchor={textAnchor} fill="#4b5563" fontSize={9} fontWeight={500}>
                                <tspan x={x + shiftX} dy="-0.5em">{words[0]}</tspan>
                                <tspan x={x + shiftX} dy="1.2em">{words.slice(1).join(' ')}</tspan>
                              </text>
                            );
                          }
                          return (
                            <text x={x + shiftX} y={y} dy={4} textAnchor={textAnchor} fill="#4b5563" fontSize={isMobile ? 9 : 12} fontWeight={500}>
                              {payload.value}
                            </text>
                          );
                        }} 
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 6]} tick={{ fill: '#9ca3af' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Radar
                        name="Current"
                        dataKey="currentScore"
                        stroke="#f97316"
                        fill="#f97316"
                        fillOpacity={0.4}
                        animationDuration={1500}
                      />
                      <Radar
                        name="Target (Future)"
                        dataKey="futureScore"
                        stroke="#0ea5e9"
                        fill="#0ea5e9"
                        fillOpacity={0.2}
                        animationDuration={1500}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Analysis */}
                <div className="w-full space-y-6">
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