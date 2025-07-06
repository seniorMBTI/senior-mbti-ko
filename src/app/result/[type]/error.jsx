'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // 에러 로깅
    console.error('Result page error:', error);
  }, [error]);

  return (
    <div className="error-container">
      <style jsx>{`
        .error-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }
        
        .error-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 48px;
          max-width: 500px;
          width: 100%;
        }
        
        .error-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .error-message {
          font-size: 18px;
          margin-bottom: 32px;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .error-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .error-button {
          padding: 12px 24px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
        }
        
        .retry-button {
          background: linear-gradient(45deg, #4F46E5, #7C3AED);
          color: white;
        }
        
        .home-button {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .error-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .error-card {
            padding: 32px 24px;
          }
          
          .error-title {
            font-size: 24px;
          }
          
          .error-message {
            font-size: 16px;
          }
          
          .error-buttons {
            flex-direction: column;
          }
        }
      `}</style>
      
      <div className="error-card">
        <h2 className="error-title">결과를 불러오는 중 오류가 발생했습니다</h2>
        <p className="error-message">
          MBTI 결과 페이지를 표시하는 중 예상치 못한 문제가 발생했습니다.<br />
          잠시 후 다시 시도해주시거나 홈으로 돌아가 주세요.
        </p>
        
        <div className="error-buttons">
          <button
            className="error-button retry-button"
            onClick={() => reset()}
          >
            다시 시도
          </button>
          <button
            className="error-button home-button"
            onClick={() => window.location.href = '/'}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}