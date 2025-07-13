import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
  }
`;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const Header = styled.div`
  background: linear-gradient(45deg, #4f46e5, #7c3aed);
  color: white;
  padding: 40px 30px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const Content = styled.div`
  padding: 40px 30px;
`;

const StartScreen = styled.div`
  text-align: center;
  padding: 40px 0;

  h2 {
    color: #1f2937;
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  p {
    color: #6b7280;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 30px;
  }
`;

const TestContent = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ProgressContainer = styled.div`
  margin-bottom: 30px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const ProgressText = styled.div`
  text-align: center;
  margin-top: 10px;
  color: #6b7280;
  font-weight: 500;
`;

const QuestionContainer = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  animation: ${fadeIn} 0.5s ease-in;
`;

const Question = styled.div`
  background: #f8fafc;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 25px;
  border-left: 5px solid #4f46e5;

  h3 {
    font-size: 1.3rem;
    color: #1f2937;
    margin-bottom: 20px;
    line-height: 1.4;
  }
`;

const Options = styled.div`
  display: grid;
  gap: 12px;
`;

const Option = styled.label`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(79, 70, 229, 0.2);
  }

  &.selected {
    border-color: #4f46e5;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    transform: scale(1.02);
  }

  input[type="radio"] {
    display: none;
  }
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.btn-primary {
    background: linear-gradient(45deg, #4f46e5, #7c3aed);
    color: white;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
    }
  }

  &.btn-secondary {
    background: #e5e7eb;
    color: #6b7280;

    &:hover:not(:disabled) {
      background: #d1d5db;
    }
  }

  &.restart-btn {
    margin-top: 30px;
    background: linear-gradient(45deg, #f59e0b, #d97706);
    color: white;
  }
`;

const Results = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in;
`;

const CareerType = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin: 20px 0;

  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const CareerMatches = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const CareerCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h4 {
    color: #4f46e5;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    color: #6b7280;
    line-height: 1.5;
  }
`;

const MatchPercentage = styled.span`
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 10px;
  display: inline-block;
`;

// Data
const questions = [
  {
    id: 1,
    question: "What energizes you most?",
    options: [
      { text: "Working with people and building relationships", traits: { social: 3, leadership: 2 } },
      { text: "Solving complex problems and puzzles", traits: { analytical: 3, detail: 2 } },
      { text: "Creating something new and original", traits: { creative: 3, independent: 2 } },
      { text: "Being in nature or working with your hands", traits: { practical: 3, outdoor: 2 } }
    ]
  },
  // ... (include all your questions here)
  {
    id: 20,
    question: "Looking ahead, what matters most to you in a career?",
    options: [
      { text: "Building meaningful relationships and helping others grow", traits: { social: 3, empathetic: 2, growth: 1, meaningful: 1 } },
      { text: "Continuous learning and intellectual stimulation", traits: { analytical: 3, intellectual: 2, learning: 1, growth: 1 } },
      { text: "Creative expression and innovative contribution", traits: { creative: 3, expression: 2, innovative: 1, contribution: 1 } },
      { text: "Stability, practical impact, and tangible achievements", traits: { practical: 3, stability: 2, impact: 1, achievement: 1 } }
    ]
  }
];

const careerProfiles = {
  social: {
    name: "The People-Focused Professional",
    description: "You thrive on human interaction and making a positive impact on others' lives. Your natural empathy and communication skills make you excel in roles that involve helping, teaching, or leading people.",
    careers: [
      { name: "Human Resources Manager", description: "Lead talent acquisition, employee development, and organizational culture initiatives.", match: 95 },
      { name: "Counselor/Therapist", description: "Help individuals overcome challenges and improve their mental health and well-being.", match: 90 },
      { name: "Teacher/Educator", description: "Inspire and educate students, helping them reach their full potential.", match: 88 },
      { name: "Social Worker", description: "Advocate for vulnerable populations and provide support for those in need.", match: 85 },
      { name: "Sales Manager", description: "Build relationships with clients and lead sales teams to achieve targets.", match: 82 },
      { name: "Event Coordinator", description: "Plan and execute memorable events that bring people together.", match: 80 }
    ]
  },
  // ... (include all your career profiles here)
  practical: {
    name: "The Results-Driven Implementer",
    description: "You focus on practical solutions and tangible results. Your hands-on approach and ability to get things done make you excel in roles that require implementation and execution.",
    careers: [
      { name: "Project Manager", description: "Coordinate resources and timelines to deliver projects successfully and on schedule.", match: 95 },
      { name: "Operations Manager", description: "Optimize business processes and ensure efficient day-to-day operations.", match: 92 },
      { name: "Construction Manager", description: "Oversee construction projects from planning through completion, ensuring quality and safety.", match: 88 },
      { name: "Supply Chain Manager", description: "Manage the flow of goods and services to optimize efficiency and reduce costs.", match: 85 },
      { name: "Business Analyst", description: "Analyze business processes and recommend practical improvements and solutions.", match: 83 },
      { name: "Manufacturing Engineer", description: "Design and optimize manufacturing processes to improve productivity and quality.", match: 80 }
    ]
  }
};

// Main Component
const CareerAptitudeTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({
    social: 0,
    analytical: 0,
    creative: 0,
    practical: 0
  });
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [dominantType, setDominantType] = useState(null);

  const startTest = () => {
    setTestStarted(true);
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const newScores = { social: 0, analytical: 0, creative: 0, practical: 0 };
    
    Object.keys(answers).forEach(questionId => {
      const questionIndex = questions.findIndex(q => q.id == questionId);
      const question = questions[questionIndex];
      const selectedOption = question.options[answers[questionId]];
      
      Object.keys(selectedOption.traits).forEach(trait => {
        if (newScores.hasOwnProperty(trait)) {
          newScores[trait] += selectedOption.traits[trait];
        }
      });
    });
    
    setScores(newScores);
    const dominant = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
    setDominantType(dominant);
    setTestCompleted(true);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScores({ social: 0, analytical: 0, creative: 0, practical: 0 });
    setTestStarted(false);
    setTestCompleted(false);
    setDominantType(null);
  };

  const getProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const hasAnswerForCurrentQuestion = () => {
    return answers.hasOwnProperty(questions[currentQuestion].id);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <h1>Career Aptitude Test</h1>
          <p>Discover your ideal career path based on your personality and preferences</p>
        </Header>

        <Content>
          {!testStarted && !testCompleted && (
            <StartScreen>
              <h2>Ready to Find Your Perfect Career?</h2>
              <p>This comprehensive assessment will analyze your personality traits, work preferences, and natural inclinations to match you with careers that align with who you are. Take your time and answer honestly for the most accurate results.</p>
              <Button className="btn-primary" onClick={startTest}>Start Assessment</Button>
            </StartScreen>
          )}

          <TestContent visible={testStarted && !testCompleted}>
            <ProgressContainer>
              <ProgressBar>
                <ProgressFill progress={getProgress()} />
              </ProgressBar>
              <ProgressText>Question {currentQuestion + 1} of {questions.length}</ProgressText>
            </ProgressContainer>

            {questions.map((q, index) => (
              <QuestionContainer key={q.id} active={index === currentQuestion}>
                <Question>
                  <h3>{q.question}</h3>
                  <Options>
                    {q.options.map((option, optIndex) => (
                      <Option
                        key={optIndex}
                        className={answers[q.id] === optIndex ? 'selected' : ''}
                        onClick={() => handleOptionSelect(q.id, optIndex)}
                      >
                        <input
                          type="radio"
                          id={`q${q.id}_${optIndex}`}
                          name={`q${q.id}`}
                          checked={answers[q.id] === optIndex}
                          onChange={() => {}}
                        />
                        {option.text}
                      </Option>
                    ))}
                  </Options>
                </Question>
              </QuestionContainer>
            ))}

            <NavButtons>
              <Button
                className="btn-secondary"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                className="btn-primary"
                onClick={nextQuestion}
                disabled={!hasAnswerForCurrentQuestion()}
              >
                {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
              </Button>
            </NavButtons>
          </TestContent>

          <Results visible={testCompleted}>
            {dominantType && (
              <>
                <CareerType>
                  <h2>{careerProfiles[dominantType].name}</h2>
                  <p>{careerProfiles[dominantType].description}</p>
                </CareerType>
                <CareerMatches>
                  {careerProfiles[dominantType].careers.map((career, index) => (
                    <CareerCard key={index}>
                      <h4>{career.name}</h4>
                      <p>{career.description}</p>
                      <MatchPercentage>{career.match}% Match</MatchPercentage>
                    </CareerCard>
                  ))}
                </CareerMatches>
              </>
            )}
            <Button className="btn-primary restart-btn" onClick={restartTest}>
              Take Test Again
            </Button>
          </Results>
        </Content>
      </Container>
    </>
  );
};

export default CareerAptitudeTest;