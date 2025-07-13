import React, { useState, useEffect } from 'react';
import { DollarSign, User, Target, TrendingUp, Award, BookOpen, Play, RotateCcw } from 'lucide-react';

const SalaryNegotiationSimulator = () => {
  // ... (state and scenario data remains unchanged) ...
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [playerOffer, setPlayerOffer] = useState('');
  const [negotiationHistory, setNegotiationHistory] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [showTips, setShowTips] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: "Software Engineer - Tech Startup",
      description: "You're interviewing for a senior developer role at a growing startup",
      initialOffer: 85000,
      marketRange: { min: 80000, max: 120000 },
      companyBudget: 105000,
      negotiationStyle: "flexible",
      benefits: ["equity", "flexible hours", "remote work"],
      context: "The company is growing fast and values talent retention"
    },
    {
      id: 2,
      title: "Marketing Manager - Fortune 500",
      description: "Negotiating a promotion within your current large corporation",
      initialOffer: 95000,
      marketRange: { min: 90000, max: 130000 },
      companyBudget: 115000,
      negotiationStyle: "structured",
      benefits: ["health insurance", "401k match", "vacation days"],
      context: "Large company with established salary bands and approval processes"
    },
    {
      id: 3,
      title: "Product Manager - Mid-size Company",
      description: "External hire for a product leadership role",
      initialOffer: 110000,
      marketRange: { min: 100000, max: 150000 },
      companyBudget: 135000,
      negotiationStyle: "moderate",
      benefits: ["stock options", "professional development", "bonus potential"],
      context: "Company is scaling and needs experienced product leadership"
    }
  ];

  const negotiationTips = [
    {
      category: "Research",
      tips: [
        "Research market rates using Glassdoor, PayScale, and industry reports",
        "Know your worth based on experience, skills, and achievements",
        "Understand the company's financial situation and growth stage"
      ]
    },
    {
      category: "Strategy",
      tips: [
        "Aim for the higher end of the market range, but be realistic",
        "Consider the total compensation package, not just base salary",
        "Have a walk-away number in mind before negotiations begin"
      ]
    },
    {
      category: "Communication",
      tips: [
        "Express enthusiasm for the role while negotiating",
        "Use data and market research to support your requests",
        "Be professional and collaborative, not confrontational"
      ]
    },
    {
      category: "Timing",
      tips: [
        "Wait for an offer before discussing salary expectations",
        "Don't accept immediately - take time to consider the offer",
        "Negotiate multiple aspects simultaneously when possible"
      ]
    }
  ];

  const getAIResponse = (offer, scenario, round) => {
    const numericOffer = parseInt(offer.replace(/[^0-9]/g, ''));
    const { initialOffer, companyBudget, negotiationStyle, marketRange } = scenario;
    
    if (round === 1) {
      if (numericOffer > companyBudget * 1.2) {
        return {
          response: "That's significantly above our budget range. The most we could consider is around $" + Math.floor(companyBudget * 0.9).toLocaleString() + ". However, we're open to discussing the overall package.",
          counterOffer: Math.floor(companyBudget * 0.9),
          tone: "concerned"
        };
      } else if (numericOffer > companyBudget) {
        return {
          response: "That's a bit higher than we initially planned. We could potentially go up to $" + Math.floor(companyBudget * 0.95).toLocaleString() + ". What matters most to you in the compensation package?",
          counterOffer: Math.floor(companyBudget * 0.95),
          tone: "negotiating"
        };
      } else if (numericOffer > initialOffer * 1.1) {
        return {
          response: "I appreciate your research on market rates. We can work with $" + Math.min(numericOffer, Math.floor(companyBudget * 0.98)).toLocaleString() + ". Let's also discuss other benefits that might be valuable to you.",
          counterOffer: Math.min(numericOffer, Math.floor(companyBudget * 0.98)),
          tone: "positive"
        };
      } else {
        return {
          response: "We're pleased you're interested! That's very reasonable. We can definitely accommodate $" + numericOffer.toLocaleString() + ". Are there other aspects of the package you'd like to discuss?",
          counterOffer: numericOffer,
          tone: "enthusiastic"
        };
      }
    } else {
      // Second round - company is more flexible
      if (numericOffer <= companyBudget) {
        return {
          response: "Perfect! We can agree on $" + numericOffer.toLocaleString() + ". Welcome to the team! Let's finalize this offer.",
          counterOffer: numericOffer,
          tone: "agreement",
          final: true
        };
      } else {
        return {
          response: "I've spoken with leadership, and $" + companyBudget.toLocaleString() + " is truly our final offer. However, we can add extra vacation days and a signing bonus. What do you think?",
          counterOffer: companyBudget,
          tone: "final",
          final: true
        };
      }
    }
  };

  const handleSubmitOffer = () => {
    if (!playerOffer) return;

    const scenario = scenarios[currentScenario];
    const aiResponse = getAIResponse(playerOffer, scenario, currentRound);
    
    const newEntry = {
      round: currentRound,
      playerOffer: playerOffer,
      aiResponse: aiResponse.response,
      aiCounterOffer: aiResponse.counterOffer,
      tone: aiResponse.tone
    };

    setNegotiationHistory([...negotiationHistory, newEntry]);
    setPlayerOffer('');

    if (aiResponse.final) {
      // Calculate final score
      const numericOffer = parseInt(playerOffer.replace(/[^0-9]/g, ''));
      const finalSalary = Math.min(numericOffer, scenario.companyBudget);
      const scorePercentage = ((finalSalary - scenario.initialOffer) / (scenario.companyBudget - scenario.initialOffer)) * 100;
      
      setFinalResult({
        finalSalary,
        improvement: finalSalary - scenario.initialOffer,
        scorePercentage: Math.max(0, Math.round(scorePercentage)),
        success: finalSalary >= scenario.initialOffer * 1.1
      });
      setShowFeedback(true);
    } else {
      setCurrentRound(currentRound + 1);
    }
  };

  const resetSimulation = () => {
    setCurrentRound(1);
    setPlayerOffer('');
    setNegotiationHistory([]);
    setGameStarted(false);
    setShowFeedback(false);
    setFinalResult(null);
  };

  const startNegotiation = () => {
    resetSimulation();
    setGameStarted(true);
  };

  const scenario = scenarios[currentScenario];


  return (
    <div className="salary-simulator-container">
      <style jsx>{`
        :root {
          --blue-50: #f0f8ff;
          --indigo-100: #e0e7ff;
          --green-600: #16a34a;
          --blue-600: #2563eb;
          --purple-600: #9333ea;
          --gray-50: #f9fafb;
          --gray-100: #f3f4f6;
          --gray-200: #e5e7eb;
          --gray-300: #d1d5db;
          --gray-400: #9ca3af;
          --gray-500: #6b7280;
          --gray-600: #4b5563;
          --gray-700: #374151;
          --gray-800: #1f2937;
          --indigo-50: #eef2ff;
          --green-50: #f0fdf4;
          --blue-50: #eff6ff;
          --purple-50: #faf5ff;
          --yellow-50: #fefce8;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          --rounded-sm: 0.125rem;
          --rounded: 0.25rem;
          --rounded-md: 0.375rem;
          --rounded-lg: 0.5rem;
          --rounded-xl: 0.75rem;
          --rounded-full: 9999px;
        }
        
        .salary-simulator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--blue-50), var(--indigo-100));
          padding: 1.5rem;
        }
        
        .simulator-wrapper {
          max-width: 72rem;
          margin: 0 auto;
        }
        
        .text-center {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .flex-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .flex {
          display: flex;
        }
        
        .flex-col {
          flex-direction: column;
        }
        
        .items-center {
          align-items: center;
        }
        
        .justify-between {
          justify-content: space-between;
        }
        
        .mb-4 {
          margin-bottom: 1rem;
        }
        
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        
        .mb-8 {
          margin-bottom: 2rem;
        }
        
        .text-4xl {
          font-size: 2.25rem;
          line-height: 2.5rem;
          font-weight: 700;
          color: var(--gray-800);
        }
        
        .text-xl {
          font-size: 1.25rem;
          line-height: 1.75rem;
          color: var(--gray-600);
        }
        
        .grid {
          display: grid;
        }
        
        .gap-8 {
          gap: 2rem;
        }
        
        .md-grid-cols-2 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        
        @media (min-width: 768px) {
          .md-grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
        .bg-white {
          background-color: white;
        }
        
        .rounded-xl {
          border-radius: var(--rounded-xl);
        }
        
        .shadow-lg {
          box-shadow: var(--shadow-lg);
        }
        
        .p-6 {
          padding: 1.5rem;
        }
        
        .text-2xl {
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 600;
          color: var(--gray-800);
        }
        
        .space-y-4 {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .p-4 {
          padding: 1rem;
        }
        
        .rounded-lg {
          border-radius: var(--rounded-lg);
        }
        
        .border-2 {
          border-width: 2px;
        }
        
        .border-gray-200 {
          border-color: var(--gray-200);
        }
        
        .border-blue-500 {
          border-color: var(--blue-600);
        }
        
        .bg-blue-50 {
          background-color: var(--blue-50);
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .hover-border-gray-300:hover {
          border-color: var(--gray-300);
        }
        
        .font-semibold {
          font-weight: 600;
        }
        
        .text-lg {
          font-size: 1.125rem;
          line-height: 1.75rem;
        }
        
        .text-sm {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
        
        .mt-1 {
          margin-top: 0.25rem;
        }
        
        .text-green-600 {
          color: var(--green-600);
        }
        
        .text-blue-600 {
          color: var(--blue-600);
        }
        
        .font-medium {
          font-weight: 500;
        }
        
        .w-full {
          width: 100%;
        }
        
        .text-left {
          text-align: left;
        }
        
        .p-3 {
          padding: 0.75rem;
        }
        
        .bg-purple-50 {
          background-color: var(--purple-50);
        }
        
        .hover-bg-purple-100:hover {
          background-color: var(--purple-100);
        }
        
        .space-y-3 {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .max-h-64 {
          max-height: 16rem;
        }
        
        .overflow-y-auto {
          overflow-y: auto;
        }
        
        .border-l-4 {
          border-left: 4px solid;
        }
        
        .border-purple-400 {
          border-color: var(--purple-400);
        }
        
        .pl-4 {
          padding-left: 1rem;
        }
        
        .text-purple-700 {
          color: var(--purple-700);
        }
        
        .text-gray-600 {
          color: var(--gray-600);
        }
        
        .mt-1 {
          margin-top: 0.25rem;
        }
        
        .space-y-1 {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .bg-gradient-to-r {
          background-image: linear-gradient(to right, var(--tw-gradient-stops));
        }
        
        .from-green-500 {
          --tw-gradient-from: #10b981;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(16, 185, 129, 0));
        }
        
        .to-blue-600 {
          --tw-gradient-to: #2563eb;
        }
        
        .text-white {
          color: white;
        }
        
        .px-8 {
          padding-left: 2rem;
          padding-right: 2rem;
        }
        
        .py-3 {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }
        
        .rounded-xl {
          border-radius: var(--rounded-xl);
        }
        
        .font-semibold {
          font-weight: 600;
        }
        
        .text-lg {
          font-size: 1.125rem;
          line-height: 1.75rem;
        }
        
        .hover-from-green-600:hover {
          --tw-gradient-from: #059669;
        }
        
        .hover-to-blue-700:hover {
          --tw-gradient-to: #1d4ed8;
        }
        
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
        
        .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
        }
        
        .from-green-50 {
          --tw-gradient-from: #f0fdf4;
        }
        
        .to-blue-100 {
          --tw-gradient-to: #dbeafe;
        }
        
        .p-8 {
          padding: 2rem;
        }
        
        .text-center {
          text-align: center;
        }
        
        .text-3xl {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        
        .font-bold {
          font-weight: 700;
        }
        
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        
        .md-grid-cols-3 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        
        @media (min-width: 768px) {
          .md-grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        
        .gap-6 {
          gap: 1.5rem;
        }
        
        .bg-green-50 {
          background-color: var(--green-50);
        }
        
        .text-green-700 {
          color: var(--green-700);
        }
        
        .text-3xl {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        
        .text-green-600 {
          color: var(--green-600);
        }
        
        .bg-blue-50 {
          background-color: var(--blue-50);
        }
        
        .text-blue-700 {
          color: var(--blue-700);
        }
        
        .text-blue-600 {
          color: var(--blue-600);
        }
        
        .bg-purple-50 {
          background-color: var(--purple-50);
        }
        
        .text-purple-700 {
          color: var(--purple-700);
        }
        
        .text-purple-600 {
          color: var(--purple-600);
        }
        
        .bg-gray-50 {
          background-color: var(--gray-50);
        }
        
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        
        .text-left {
          text-align: left;
        }
        
        .border-l-4 {
          border-left: 4px solid;
        }
        
        .border-blue-400 {
          border-color: #60a5fa;
        }
        
        .bg-yellow-50 {
          background-color: var(--yellow-50);
        }
        
        .text-gray-700 {
          color: var(--gray-700);
        }
        
        .space-x-4 {
          gap: 1rem;
        }
        
        .py-3 {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }
        
        .rounded-lg {
          border-radius: var(--rounded-lg);
        }
        
        .hover-bg-blue-700:hover {
          background-color: #1d4ed8;
        }
        
        .hover-bg-gray-700:hover {
          background-color: #374151;
        }
        
        .bg-gray-600 {
          background-color: var(--gray-600);
        }
        
        .from-gray-50 {
          --tw-gradient-from: #f9fafb;
        }
        
        .to-blue-50 {
          --tw-gradient-to: #eff6ff;
        }
        
        .p-6 {
          padding: 1.5rem;
        }
        
        .bg-gray-100 {
          background-color: var(--gray-100);
        }
        
        .p-4 {
          padding: 1rem;
        }
        
        .bg-green-50 {
          background-color: var(--green-50);
        }
        
        .text-blue-800 {
          color: var(--blue-800);
        }
        
        .space-y-2 {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .bg-green-100 {
          background-color: #dcfce7;
        }
        
        .text-green-800 {
          color: #166534;
        }
        
        .bg-blue-50 {
          background-color: #dbeafe;
        }
        
        .bg-green-50 {
          background-color: #dcfce7;
        }
        
        .bg-yellow-50 {
          background-color: #fef9c3;
        }
        
        .bg-orange-50 {
          background-color: #fff7ed;
        }
        
        .bg-red-50 {
          background-color: #fef2f2;
        }
        
        .text-blue-800 {
          color: #1e40af;
        }
        
        .text-green-800 {
          color: #166534;
        }
        
        .text-yellow-800 {
          color: #854d0e;
        }
        
        .text-orange-800 {
          color: #9a3412;
        }
        
        .text-red-800 {
          color: #991b1b;
        }
        
        .block {
          display: block;
        }
        
        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        .py-2 {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        
        .border {
          border-width: 1px;
        }
        
        .border-gray-300 {
          border-color: var(--gray-300);
        }
        
        .focus-ring:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
          border-color: #3b82f6;
        }
        
        .disabled-bg-gray-400 {
          background-color: var(--gray-400);
        }
        
        .disabled-cursor-not-allowed {
          cursor: not-allowed;
        }
        
        .mt-4 {
          margin-top: 1rem;
        }
        
        /* Additional custom styles */
        .scenario-card {
          transition: all 0.3s ease;
          border: 2px solid var(--gray-200);
        }
        
        .scenario-card:hover {
          border-color: var(--gray-300);
        }
        
        .scenario-card.selected {
          border-color: var(--blue-600);
          background-color: var(--blue-50);
        }
        
        .start-button {
          background: linear-gradient(to right, #10b981, #2563eb);
          transition: background 0.3s ease;
        }
        
        .start-button:hover {
          background: linear-gradient(to right, #059669, #1d4ed8);
        }
        
        .result-card {
          background-color: white;
          box-shadow: var(--shadow-lg);
          border-radius: var(--rounded-xl);
          padding: 2rem;
          text-align: center;
        }
        
        .feedback-card {
          background-color: var(--yellow-50);
          padding: 1.5rem;
          border-radius: var(--rounded-lg);
          margin-bottom: 1.5rem;
        }
        
        .negotiation-card {
          background-color: white;
          box-shadow: var(--shadow-lg);
          border-radius: var(--rounded-xl);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tip-card {
          background-color: var(--purple-50);
          padding: 1rem;
          border-radius: var(--rounded-lg);
          margin-bottom: 1rem;
        }
        
        .round-badge {
          background-color: var(--blue-100);
          color: var(--blue-700);
          padding: 0.25rem 0.75rem;
          border-radius: var(--rounded-full);
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .context-card {
          background-color: var(--gray-50);
          padding: 1rem;
          border-radius: var(--rounded-lg);
          margin-bottom: 1.5rem;
        }
        
        .market-card {
          background-color: var(--green-50);
          padding: 1rem;
          border-radius: var(--rounded-lg);
        }
      `}</style>

      <div className="simulator-wrapper">
        {!gameStarted ? (
          <div>
            <div className="text-center mb-8">
              <div className="flex-center mb-4">
                <DollarSign className="w-12 h-12 text-green-600 mr-3" />
                <h1 className="text-4xl font-bold">Salary Negotiation Simulator</h1>
              </div>
              <p className="text-xl">Practice your negotiation skills and maximize your compensation</p>
            </div>

            <div className="grid md-grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-blue-600" />
                  Choose Your Scenario
                </h2>
                <div className="space-y-4">
                  {scenarios.map((s, index) => (
                    <div
                      key={s.id}
                      className={`scenario-card p-4 rounded-lg ${
                        currentScenario === index ? 'selected' : ''
                      }`}
                      onClick={() => setCurrentScenario(index)}
                    >
                      <h3 className="font-semibold text-lg">{s.title}</h3>
                      <p className="text-sm mt-1">{s.description}</p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-green-600 font-medium">
                          Initial: ${s.initialOffer.toLocaleString()}
                        </span>
                        <span className="text-blue-600">
                          Market: ${s.marketRange.min.toLocaleString()}-${s.marketRange.max.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
                  Negotiation Tips
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowTips(!showTips)}
                    className="w-full text-left p-3 tip-card"
                  >
                    <span className="font-medium">View Strategy Guide</span>
                  </button>
                  {showTips && (
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {negotiationTips.map((category, index) => (
                        <div key={index} className="border-l-4 border-purple-400 pl-4">
                          <h4 className="font-semibold text-purple-700">{category.category}</h4>
                          <ul className="text-sm mt-1 space-y-1">
                            {category.tips.map((tip, tipIndex) => (
                              <li key={tipIndex}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startNegotiation}
                className="start-button text-white px-8 py-3 rounded-xl font-semibold text-lg flex items-center mx-auto"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Negotiation
              </button>
            </div>
          </div>
        ) : showFeedback && finalResult ? (
          <div className="bg-gradient-to-br from-green-50 to-blue-100">
            <div className="result-card">
              <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-6">Negotiation Complete!</h1>
              
              <div className="grid md-grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-700">Final Salary</h3>
                  <p className="text-3xl font-bold text-green-600">${finalResult.finalSalary.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-700">Improvement</h3>
                  <p className="text-3xl font-bold text-blue-600">+${finalResult.improvement.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-700">Score</h3>
                  <p className="text-3xl font-bold text-purple-600">{finalResult.scorePercentage}%</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Your Negotiation Summary</h3>
                <div className="space-y-3 text-left">
                  {negotiationHistory.map((entry, index) => (
                    <div key={index} className="border-l-4 border-blue-400 pl-4">
                      <p className="font-medium">Round {entry.round}: You offered ${parseInt(entry.playerOffer.replace(/[^0-9]/g, '')).toLocaleString()}</p>
                      <p className="text-sm">{entry.aiResponse}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="feedback-card">
                <h3 className="text-xl font-semibold mb-3">Performance Feedback</h3>
                <p>
                  {finalResult.scorePercentage >= 80 
                    ? "Excellent negotiation! You secured a salary very close to the company's maximum budget."
                    : finalResult.scorePercentage >= 60
                    ? "Good work! You successfully increased your offer above the initial amount."
                    : finalResult.scorePercentage >= 40
                    ? "Decent negotiation. Consider researching market rates more thoroughly next time."
                    : "There's room for improvement. Try starting with a higher counteroffer based on market research."
                  }
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    resetSimulation();
                    setCurrentScenario((currentScenario + 1) % scenarios.length);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover-bg-blue-700"
                >
                  Try Different Scenario
                </button>
                <button
                  onClick={resetSimulation}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover-bg-gray-700 flex items-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Restart This Scenario
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="negotiation-card">
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold flex items-center">
                <User className="w-8 h-8 mr-2 text-blue-600" />
                {scenario.title}
              </h1>
              <span className="round-badge">
                Round {currentRound}/2
              </span>
            </div>
            
            <div className="grid md-grid-cols-2 gap-6 mb-6">
              <div className="context-card">
                <h3 className="font-semibold mb-2">Scenario Context</h3>
                <p className="text-sm mb-2">{scenario.description}</p>
                <p className="text-sm">{scenario.context}</p>
              </div>
              <div className="market-card">
                <h3 className="font-semibold mb-2">Market Information</h3>
                <div className="space-y-1 text-sm">
                  <p>Initial Offer: <span className="font-medium">${scenario.initialOffer.toLocaleString()}</span></p>
                  <p>Market Range: <span className="font-medium">${scenario.marketRange.min.toLocaleString()} - ${scenario.marketRange.max.toLocaleString()}</span></p>
                  <p>Benefits: <span className="font-medium">{scenario.benefits.join(', ')}</span></p>
                </div>
              </div>
            </div>

            {currentRound === 1 && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800">
                  <strong>Hiring Manager:</strong> "We're excited to extend an offer of ${scenario.initialOffer.toLocaleString()} 
                  for this position. We think you'd be a great fit for our team. What are your thoughts on this offer?"
                </p>
              </div>
            )}

            {negotiationHistory.length > 0 && (
              <div className="space-y-4 mb-6">
                {negotiationHistory.map((entry, index) => (
                  <div key={index} className="space-y-2">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-green-800">
                        <strong>You:</strong> "I was hoping for ${parseInt(entry.playerOffer.replace(/[^0-9]/g, '')).toLocaleString()}."
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      entry.tone === 'enthusiastic' ? 'bg-blue-50' :
                      entry.tone === 'positive' ? 'bg-green-50' :
                      entry.tone === 'negotiating' ? 'bg-yellow-50' :
                      entry.tone === 'concerned' ? 'bg-orange-50' :
                      'bg-red-50'
                    }`}>
                      <p className={
                        entry.tone === 'enthusiastic' ? 'text-blue-800' :
                        entry.tone === 'positive' ? 'text-green-800' :
                        entry.tone === 'negotiating' ? 'text-yellow-800' :
                        entry.tone === 'concerned' ? 'text-orange-800' :
                        'text-red-800'
                      }>
                        <strong>Hiring Manager:</strong> "{entry.aiResponse}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Your Counter-Offer (Enter amount):
                </label>
                <input
                  type="text"
                  value={playerOffer}
                  onChange={(e) => setPlayerOffer(e.target.value)}
                  placeholder="e.g., $95,000 or 95000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-ring"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitOffer()}
                />
              </div>
              <button
                onClick={handleSubmitOffer}
                disabled={!playerOffer}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover-bg-blue-700 disabled-bg-gray-400 disabled-cursor-not-allowed flex items-center"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Submit Offer
              </button>
            </div>

            <div className="mt-4 text-sm">
              <p><strong>Tip:</strong> Consider the company's situation, your research, and the market range when making your counter-offer.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryNegotiationSimulator;