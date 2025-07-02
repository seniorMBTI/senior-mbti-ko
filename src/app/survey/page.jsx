'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';

export default function SurveyPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const { t } = useLanguage();

  // 시니어 최적화 24개 문항 (2지선다)
  const questions = [
    // E/I 차원 - 6문항
    {
      id: 1,
      category: 'E/I',
      text: '평소 친구들이나 지인들과 어떻게 시간을 보내시는 것을 더 선호하십니까?',
      choices: [
        { id: 'A', text: '여러 사람들과 함께 모여서 이야기하고 활동하는 것이 좋습니다', type: 'E' },
        { id: 'B', text: '소수의 친한 분들과 조용히 대화하는 것이 편합니다', type: 'I' }
      ]
    },
    {
      id: 2,
      category: 'E/I',
      text: '하루가 끝나고 피곤하실 때, 어떤 방식으로 기분을 전환하십니까?',
      choices: [
        { id: 'A', text: '가족이나 친구들과 대화하며 함께 시간을 보냅니다', type: 'E' },
        { id: 'B', text: '혼자만의 시간을 가지며 조용히 휴식을 취합니다', type: 'I' }
      ]
    },
    {
      id: 3,
      category: 'E/I',
      text: '새로운 사람들을 만났을 때 어떤 모습이십니까?',
      choices: [
        { id: 'A', text: '먼저 다가가서 인사를 나누고 대화를 시작합니다', type: 'E' },
        { id: 'B', text: '상대방이 먼저 말을 걸어주기를 기다립니다', type: 'I' }
      ]
    },
    {
      id: 4,
      category: 'E/I',
      text: '주말이나 휴일에 어떤 활동을 더 선호하십니까?',
      choices: [
        { id: 'A', text: '친구나 가족과 함께 나들이나 모임에 참여합니다', type: 'E' },
        { id: 'B', text: '집에서 독서, 영화 감상 등 혼자 즈길 일을 합니다', type: 'I' }
      ]
    },
    {
      id: 5,
      category: 'E/I',
      text: '전화통화에 대한 선호도는 어떻습니까?',
      choices: [
        { id: 'A', text: '전화로 이야기하는 것을 좋아하고 자주 통화합니다', type: 'E' },
        { id: 'B', text: '긴급한 일이 아니면 글이나 메시지로 연락하는 것을 선호합니다', type: 'I' }
      ]
    },
    {
      id: 6,
      category: 'E/I',
      text: '강연이나 모임에서는 어떤 모습이십니까?',
      choices: [
        { id: 'A', text: '적극적으로 발언하고 다른 사람들과 의견을 나눗니다', type: 'E' },
        { id: 'B', text: '주로 듣는 편이고 신중하게 생각한 후 말슴니다', type: 'I' }
      ]
    },
    
    // S/N 차원 - 6문항
    {
      id: 7,
      category: 'S/N',
      text: '새로운 것을 배우실 때, 어떤 방식을 더 선호하십니까?',
      choices: [
        { id: 'A', text: '구체적인 사실과 실제 경험을 통해 차근차근 익힙니다', type: 'S' },
        { id: 'B', text: '전체적인 의미와 가능성을 먼저 파악하려고 합니다', type: 'N' }
      ]
    },
    {
      id: 8,
      category: 'S/N',
      text: '문제를 해결할 때 어떤 접근 방식을 선호하십니까?',
      choices: [
        { id: 'A', text: '과거의 경험과 증명된 방법을 활용합니다', type: 'S' },
        { id: 'B', text: '새로운 아이디어와 창의적인 해결책을 찾아보니다', type: 'N' }
      ]
    },
    {
      id: 9,
      category: 'S/N',
      text: '대화할 때 어떤 주제를 더 좋아하십니까?',
      choices: [
        { id: 'A', text: '일상의 구체적인 이야기나 실질적인 정보를 나눗니다', type: 'S' },
        { id: 'B', text: '미래에 대한 꿈이나 철학적인 사고를 나눗니다', type: 'N' }
      ]
    },
    {
      id: 10,
      category: 'S/N',
      text: '여행을 계획하실 때 무엇에 더 중점을 두십니까?',
      choices: [
        { id: 'A', text: '과거에 가본던 곳이나 잘 알려진 장소를 선호합니다', type: 'S' },
        { id: 'B', text: '처음 가보는 곳이나 예상치 못한 발견을 기대합니다', type: 'N' }
      ]
    },
    {
      id: 11,
      category: 'S/N',
      text: '일을 할 때 어떤 방식을 더 선호하십니까?',
      choices: [
        { id: 'A', text: '단계별로 차근차근 진행하며 세부사항을 체크합니다', type: 'S' },
        { id: 'B', text: '전체적인 흐름을 파악하고 큰 그림을 먼저 그립니다', type: 'N' }
      ]
    },
    {
      id: 12,
      category: 'S/N',
      text: '책을 읽거나 영화를 보실 때 어떤 것을 더 좋아하십니까?',
      choices: [
        { id: 'A', text: '현실적이고 실제 경험을 다룬 내용을 선호합니다', type: 'S' },
        { id: 'B', text: '상상력을 자극하고 새로운 세계를 보여주는 내용을 선호합니다', type: 'N' }
      ]
    },
    
    // T/F 차원 - 6문항
    {
      id: 13,
      category: 'T/F',
      text: '중요한 결정을 내리실 때, 무엇을 가장 중요하게 생각하십니까?',
      choices: [
        { id: 'A', text: '객관적인 사실과 논리적인 분석을 바탕으로 판단합니다', type: 'T' },
        { id: 'B', text: '관련된 사람들의 마음과 관계를 우선적으로 고려합니다', type: 'F' }
      ]
    },
    {
      id: 14,
      category: 'T/F',
      text: '다른 사람이 실수를 했을 때 어떻게 대응하십니까?',
      choices: [
        { id: 'A', text: '문제의 원인과 해결 방안에 집중하여 지적합니다', type: 'T' },
        { id: 'B', text: '상대방의 기분을 살피고 격려와 위로를 먼저 합니다', type: 'F' }
      ]
    },
    {
      id: 15,
      category: 'T/F',
      text: '논쟁이나 갈등 상황에서 어떤 태도를 취하십니까?',
      choices: [
        { id: 'A', text: '사실과 논리를 바탕으로 공정한 판단을 내립니다', type: 'T' },
        { id: 'B', text: '모든 사람의 마음을 살피고 조화를 이루려고 노력합니다', type: 'F' }
      ]
    },
    {
      id: 16,
      category: 'T/F',
      text: '조언을 할 때 어떤 방식으로 도움을 주십니까?',
      choices: [
        { id: 'A', text: '미래에 도움이 될 수 있는 실용적인 해결책을 제시합니다', type: 'T' },
        { id: 'B', text: '상대방의 감정을 공감하고 위로와 격려를 해드립니다', type: 'F' }
      ]
    },
    {
      id: 17,
      category: 'T/F',
      text: '다른 사람을 평가할 때 무엇을 더 중요하게 생각하십니까?',
      choices: [
        { id: 'A', text: '그 사람의 능력과 성과, 객관적 성과를 냉정하게 평가합니다', type: 'T' },
        { id: 'B', text: '그 사람의 의도와 노력, 인간적인 면을 먼저 고려합니다', type: 'F' }
      ]
    },
    {
      id: 18,
      category: 'T/F',
      text: '중요한 일을 결정할 때 어떤 기준을 더 중시하십니까?',
      choices: [
        { id: 'A', text: '공정성과 원칙, 일관성 있는 기준을 중시합니다', type: 'T' },
        { id: 'B', text: '인간적인 정서와 개인적 상황을 우선 고려합니다', type: 'F' }
      ]
    },
    
    // J/P 차원 - 6문항
    {
      id: 19,
      category: 'J/P',
      text: '일상생활을 어떻게 관리하시는 것을 선호하십니까?',
      choices: [
        { id: 'A', text: '미리 계획을 세우고 일정에 맞춰 체계적으로 진행합니다', type: 'J' },
        { id: 'B', text: '상황에 따라 유연하게 대응하며 자연스럽게 흘러가도록 합니다', type: 'P' }
      ]
    },
    {
      id: 20,
      category: 'J/P',
      text: '아직 끝나지 않은 일이 있을 때 기분은 어떻습니까?',
      choices: [
        { id: 'A', text: '빨리 끝내고 싶어서 마음이 불편하고 신경이 쓰입니다', type: 'J' },
        { id: 'B', text: '서둡지 않아도 되고 천천히 진행해도 괜찮습니다', type: 'P' }
      ]
    },
    {
      id: 21,
      category: 'J/P',
      text: '약속이나 계획에 대한 생각은 어떻습니까?',
      choices: [
        { id: 'A', text: '약속은 반드시 지켜야 할 중요한 약속이라고 생각합니다', type: 'J' },
        { id: 'B', text: '상황에 따라 변경될 수 있는 유연한 가이드라인이라고 생각합니다', type: 'P' }
      ]
    },
    {
      id: 22,
      category: 'J/P',
      text: '여행을 떠날 때 어떤 스타일을 선호하십니까?',
      choices: [
        { id: 'A', text: '사전에 일정과 숙소, 관광지를 모두 예약하고 갑니다', type: 'J' },
        { id: 'B', text: '대충의 계획만 세우고 여행지에서 즉석에서 결정합니다', type: 'P' }
      ]
    },
    {
      id: 23,
      category: 'J/P',
      text: '일을 진행할 때 어떤 방식을 더 선호하십니까?',
      choices: [
        { id: 'A', text: '첫 번째부터 마지막까지 단계별로 순서대로 진행합니다', type: 'J' },
        { id: 'B', text: '내가 하고 싶은 부분부터 시작하여 자유롭게 진행합니다', type: 'P' }
      ]
    },
    {
      id: 24,
      category: 'J/P',
      text: '선택을 해야 할 상황에서는 어떤 모습이십니까?',
      choices: [
        { id: 'A', text: '충분히 고민한 후 결정하고 나면 바꾸지 않습니다', type: 'J' },
        { id: 'B', text: '선택을 미루다가 마지막 순간에 결정하는 경우가 많습니다', type: 'P' }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleChoiceSelect = (choiceId) => {
    setSelectedChoice(choiceId);
  };

  const handleNext = () => {
    if (selectedChoice === null) return;

    const newAnswers = [...answers, selectedChoice];
    setAnswers(newAnswers);
    setSelectedChoice(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedChoice(answers[currentQuestion - 1] || null);
      const newAnswers = answers.slice(0, -1);
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = async (finalAnswers) => {
    setIsSubmitting(true);
    
    // 시니어 친화적 로딩 시간
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // MBTI 점수 계산 (24개 문항, 각 차원별 6문항)
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    finalAnswers.forEach((answer, index) => {
      const question = questions[index];
      const choice = question.choices.find(c => c.id === answer);
      if (choice) {
        scores[choice.type]++;
      }
    });
    
    // MBTI 유형 결정
    const mbtiType = 
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.S > scores.N ? 'S' : 'N') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P');
    
    console.log('MBTI 점수:', scores);
    console.log('최종 유형:', mbtiType);
    
    router.push(`/result/${mbtiType}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '1') {
        setSelectedChoice('A');
      } else if (e.key === '2') {
        setSelectedChoice('B');
      } else if (e.key === 'Enter' && selectedChoice !== null) {
        handleNext();
      } else if (e.key === 'Escape') {
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedChoice, currentQ, router]);

  return (
    <div className="survey-container">
      {/* 진행도 바 */}
      <div className="progress-header">
        <div className="progress-info">
          <span className="progress-text">제 {currentQuestion + 1} 문 / 총 {questions.length} 문</span>
          <span className="progress-percent">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 질문 카드 */}
      <div className="question-card">
        <div className="question-category">
          {currentQ.category} 차원 · 제 {currentQuestion + 1} 문
        </div>
        
        <h2 className="question-text">
          {currentQ.text}
        </h2>

        <div className="choices-container">
          {currentQ.choices.map((choice) => (
            <button
              key={choice.id}
              className={`choice-button ${selectedChoice === choice.id ? 'selected' : ''}`}
              onClick={() => handleChoiceSelect(choice.id)}
            >
              <div className="choice-label">{choice.id}</div>
              <div className="choice-text">{choice.text}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <div className="navigation-buttons">
        <button
          className="nav-button prev-button"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          이전 문제
        </button>
        
        <button
          className="nav-button next-button"
          onClick={handleNext}
          disabled={selectedChoice === null || isSubmitting}
        >
          {isSubmitting ? '계산중...' : 
           currentQuestion === questions.length - 1 ? '결과 보기' : '다음 문제'}
        </button>
      </div>

      <style jsx>{`
        .survey-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .survey-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 120, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .progress-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          position: relative;
          z-index: 10;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .progress-text {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          background: linear-gradient(45deg, #1F2937, #4F46E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .progress-percent {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(45deg, #4F46E5, #7C3AED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
        }

        .progress-bar {
          width: 100%;
          height: 12px;
          background: rgba(229, 231, 235, 0.8);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899);
          border-radius: 12px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 0 20px rgba(79, 70, 229, 0.5),
            inset 0 1px 2px rgba(255, 255, 255, 0.3);
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 20px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
          animation: shine 2s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(20px); opacity: 0; }
        }

        .question-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 32px;
          padding: 48px;
          margin-bottom: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          flex: 1;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .question-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.5), transparent);
        }

        .question-category {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 32px;
          box-shadow: 
            0 8px 25px rgba(79, 70, 229, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .question-category::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: categoryShine 3s infinite;
        }

        @keyframes categoryShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .question-text {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #1F2937, #4F46E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.3;
          margin-bottom: 48px;
          position: relative;
        }

        .choices-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .choice-button {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 32px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(229, 231, 235, 0.8);
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .choice-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .choice-button:hover {
          border-color: rgba(79, 70, 229, 0.5);
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(79, 70, 229, 0.15),
            0 0 0 1px rgba(79, 70, 229, 0.1);
        }

        .choice-button:hover::before {
          opacity: 1;
        }

        .choice-button.selected {
          border-color: #4F46E5;
          background: linear-gradient(135deg, 
            rgba(238, 242, 255, 0.9), 
            rgba(243, 232, 255, 0.9));
          box-shadow: 
            0 0 0 2px rgba(79, 70, 229, 0.3),
            0 20px 40px rgba(79, 70, 229, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          transform: translateY(-2px) scale(1.01);
        }

        .choice-button.selected::before {
          opacity: 1;
        }

        .choice-label {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 800;
          flex-shrink: 0;
          box-shadow: 
            0 8px 25px rgba(79, 70, 229, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .choice-label::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2));
        }

        .choice-text {
          font-size: 20px;
          font-weight: 600;
          color: #374151;
          line-height: 1.5;
          flex: 1;
        }

        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          position: relative;
          z-index: 10;
        }

        .nav-button {
          flex: 1;
          padding: 20px 32px;
          border: none;
          border-radius: 20px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .prev-button {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          color: #6B7280;
          border: 2px solid rgba(229, 231, 235, 0.8);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .prev-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.95);
          border-color: #D1D5DB;
          color: #374151;
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }

        .prev-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .next-button {
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          box-shadow: 
            0 8px 25px rgba(79, 70, 229, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .next-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .next-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #4338CA, #6D28D9);
          transform: translateY(-4px);
          box-shadow: 
            0 16px 40px rgba(79, 70, 229, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .next-button:hover:not(:disabled)::before {
          opacity: 1;
        }

        .next-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* 반응형 디자인 */
        @media (max-width: 768px) {
          .survey-container {
            padding: 16px;
          }

          .progress-header {
            padding: 24px;
            margin-bottom: 24px;
          }

          .question-card {
            padding: 32px 24px;
          }

          .question-text {
            font-size: 26px;
          }

          .choice-button {
            padding: 24px 20px;
            gap: 20px;
          }

          .choice-label {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }

          .choice-text {
            font-size: 18px;
          }

          .navigation-buttons {
            flex-direction: column;
            gap: 16px;
          }

          .nav-button {
            font-size: 18px;
            padding: 18px 24px;
          }
        }

        /* 접근성 지원 */
        @media (prefers-reduced-motion: reduce) {
          .choice-button,
          .nav-button,
          .progress-fill,
          .question-category::before,
          .progress-fill::after {
            animation: none;
            transition: none;
          }
        }

        /* 고대비 모드 */
        @media (prefers-contrast: high) {
          .choice-button {
            border-width: 3px;
          }
          
          .choice-button.selected {
            border-width: 4px;
          }
          
          .progress-header,
          .question-card {
            border-width: 2px;
          }
        }

        /* 다크모드 지원 */
        @media (prefers-color-scheme: dark) {
          .progress-header,
          .question-card {
            background: rgba(17, 24, 39, 0.95);
            border-color: rgba(75, 85, 99, 0.3);
          }
          
          .choice-button {
            background: rgba(31, 41, 55, 0.9);
            border-color: rgba(75, 85, 99, 0.5);
          }
          
          .choice-text {
            color: #E5E7EB;
          }
          
          .progress-text {
            color: #E5E7EB;
          }
        }
      `}</style>
    </div>
  );
}