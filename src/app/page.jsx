'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

export default function HomePage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 언어별 타이틀 동적 설정
  useEffect(() => {
    const titles = {
      ko: '시니어 MBTI - 성격 유형 테스트',
      en: 'Senior MBTI - Personality Type Test',
      zh: '银发族MBTI - 性格类型测试',
      ja: 'シニアMBTI - 성격タイプテスト'
    };
    
    if (typeof document !== 'undefined') {
      document.title = titles[language] || titles.ko;
    }
  }, [language]);

  const handleStartTest = () => {
    setIsStarting(true);
    setTimeout(() => {
      router.push('/survey');
    }, 500);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const features = [
    {
      icon: '⏱️',
      titleKey: 'landing.time.title',
      descKey: 'landing.time.desc'
    },
    {
      icon: '💡',
      titleKey: 'landing.method.title', 
      descKey: 'landing.method.desc'
    },
    {
      icon: '🎯',
      titleKey: 'landing.types.title',
      descKey: 'landing.types.desc'
    },
    {
      icon: '🔒',
      titleKey: 'landing.privacy.title',
      descKey: 'landing.privacy.desc'
    }
  ];

  return (
    <div className="landing-container">
      {/* SEO 최적화 메인 헤더 */}
      <header className="seo-header">
        <h1 className="visually-hidden">시니어 MBTI | 중장년 성격 유형 테스트 | 은퇴 후 인생 설계 가이드</h1>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="floating-elements">
            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>
            <div className="floating-circle circle-3"></div>
          </div>
        </div>

        <div className="container">
          {/* Language Selector */}
          <div className="language-selector-wrapper">
            <LanguageSelector />
          </div>

          {/* Hero Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">✨ 60대+ 시니어 전용 성격 분석</span>
            </div>
            
            <h2 className="hero-title">
              <span className="title-highlight">시니어 MBTI 성격 유형 테스트</span>
            </h2>
            
            <p className="hero-tagline">
              은퇴 후 새로운 인생과 이상적인 인간관계를 위한 전문 심리 분석
            </p>
            
            <p className="hero-description">
              60대 이상 중장년층을 위해 특별히 설계된 MBTI 성격 유형 테스트로 내 성향과 가장 잘 맞는 동반자를 찾아보세요. 무료 심리 테스트를 통해 황금기 인생의 새로운 가능성을 발견하세요.
            </p>
            
            <div className="hero-seo-hook">
              <p className="seo-hook-main">
                <strong>🔍 내 MBTI를 확인하고 상성 관계의 MBTI를 찾아보세요!</strong>
              </p>
              <p className="seo-hook-sub">
                앞으로 남은 인생 동안 나와 인연을 맺으며 함께 살아갈 성향이 잘 맞는 사람을 파악할 수 있어요! 시니어 라이프스타일에 최적화된 맞춤형 상성 분석을 제공합니다.
              </p>
            </div>

            <div className="cta-section">
              <button
                onClick={handleStartTest}
                disabled={isStarting}
                className={`cta-button ${isStarting ? 'cta-button-loading' : ''}`}
                aria-label={isStarting ? t('landing.starting') : t('landing.start')}
              >
                <span className="cta-icon">🚀</span>
                <span className="cta-text">
                  {isStarting ? t('landing.starting') : t('landing.start')}
                </span>
                {isStarting && (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                )}
              </button>
              
              <div className="trust-indicators">
                <span className="trust-item">
                  <span className="trust-icon">👥</span>
                  <span className="trust-text">100% 익명</span>
                </span>
                <span className="trust-item">
                  <span className="trust-icon">🏆</span>
                  <span className="trust-text">전문가 제작</span>
                </span>
                <span className="trust-item">
                  <span className="trust-icon">⚡</span>
                  <span className="trust-text">2분 완성</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">
              시니어 MBTI가 중장년층에게 특별한 이유
            </h2>
            <p className="features-subtitle">
              60대+ 은퇴 후 인생을 위한 전문적인 성격 분석과 라이프스타일 가이드
            </p>
            <div className="seo-benefits">
              <h3 className="seo-benefits-title">시니어 맞춤 MBTI 테스트의 특별한 장점</h3>
              <ul className="benefits-list">
                <li>✅ <strong>중장년 심리 전문가</strong>가 설계한 시니어 특화 질문</li>
                <li>✅ <strong>은퇴 후 인생 설계</strong>를 위한 맞춤형 조언 제공</li>
                <li>✅ <strong>60대+ 인간관계</strong> 개선을 위한 상성 분석</li>
                <li>✅ <strong>황금기 라이프스타일</strong>에 최적화된 성격 해석</li>
                <li>✅ <strong>시니어 건강 관리</strong>와 연계된 생활 가이드</li>
              </ul>
            </div>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card card-${index + 1}`}>
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="feature-description">
                    {t(feature.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MBTI Compatibility Showcase Section */}
      <section className="compatibility-showcase-section">
        <div className="container">
          <div className="showcase-header">
            <h2 className="showcase-title">
              💕 MBTI 상성 분석 미리보기
            </h2>
            <p className="showcase-subtitle">
              당신과 최고의 궁합인 MBTI와 상극인 MBTI를 미리 확인해보세요
            </p>
          </div>

          <div className="compatibility-examples">
            <div className="example-card best-match-example">
              <div className="example-header">
                <h3 className="example-title">💖 최고의 궁합 예시</h3>
                <p className="example-subtitle">INTJ × ENFP 조합</p>
              </div>
              <div className="mbti-cards">
                <div className="mbti-card intj-card">
                  <div className="mbti-type">INTJ</div>
                  <div className="mbti-name">전략가</div>
                  <div className="mbti-traits">
                    <span className="trait">체계적 사고</span>
                    <span className="trait">독립적</span>
                    <span className="trait">장기 계획</span>
                  </div>
                </div>
                <div className="compatibility-indicator">
                  <div className="heart-icon">💖</div>
                  <div className="compatibility-text">완벽한 조화</div>
                </div>
                <div className="mbti-card enfp-card">
                  <div className="mbti-type">ENFP</div>
                  <div className="mbti-name">활동가</div>
                  <div className="mbti-traits">
                    <span className="trait">열정적</span>
                    <span className="trait">창의적</span>
                    <span className="trait">사교적</span>
                  </div>
                </div>
              </div>
              <div className="compatibility-reason">
                <p>체계적인 INTJ와 창의적인 ENFP는 서로의 장점을 보완하며 깊은 이해를 바탕으로 한 관계를 형성합니다.</p>
              </div>
            </div>

            <div className="example-card challenging-match-example">
              <div className="example-header">
                <h3 className="example-title">💛 이해가 필요한 예시</h3>
                <p className="example-subtitle">INTJ × ESFJ 조합</p>
              </div>
              <div className="mbti-cards">
                <div className="mbti-card intj-card">
                  <div className="mbti-type">INTJ</div>
                  <div className="mbti-name">전략가</div>
                  <div className="mbti-traits">
                    <span className="trait">논리적</span>
                    <span className="trait">독립적</span>
                    <span className="trait">계획적</span>
                  </div>
                </div>
                <div className="compatibility-indicator challenging">
                  <div className="heart-icon">💛</div>
                  <div className="compatibility-text">노력 필요</div>
                </div>
                <div className="mbti-card esfj-card">
                  <div className="mbti-type">ESFJ</div>
                  <div className="mbti-name">집정관</div>
                  <div className="mbti-traits">
                    <span className="trait">배려심</span>
                    <span className="trait">사교적</span>
                    <span className="trait">협력적</span>
                  </div>
                </div>
              </div>
              <div className="compatibility-reason">
                <p>서로 다른 접근 방식을 가지지만, 상호 이해와 배려를 통해 균형 잡힌 관계를 만들어갈 수 있습니다.</p>
              </div>
            </div>
          </div>

          <div className="showcase-cta">
            <button
              onClick={handleStartTest}
              className="showcase-cta-button"
            >
              <span>🎯</span>
              내 MBTI와 상성 확인하기
            </button>
          </div>
        </div>
      </section>

      {/* Sample Question Section */}
      <section className="sample-section">
        <div className="container">
          <div className="sample-card">
            <div className="sample-header">
              <h3 className="sample-title">
                {t('landing.questions.title')}
              </h3>
            </div>
            <div className="sample-content">
              <div className="sample-question">
                <h4 className="question-label">
                  {t('landing.questions.example')}
                </h4>
                <p className="question-text">
                  {t('landing.questions.sample')}
                </p>
              </div>
              <div className="sample-choices">
                <div className="choice-option choice-a">
                  <span className="choice-label">A</span>
                  <span className="choice-text">
                    {t('landing.questions.choice1')}
                  </span>
                </div>
                <div className="choice-option choice-b">
                  <span className="choice-label">B</span>
                  <span className="choice-text">
                    {t('landing.questions.choice2')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO 컨텐츠 섹션 */}
      <section className="seo-content-section">
        <div className="container">
          <div className="seo-content">
            <h2 className="seo-content-title">시니어 MBTI 성격 유형 테스트 완벽 가이드</h2>
            
            <div className="content-grid">
              <div className="content-block">
                <h3>💎 시니어 MBTI란 무엇인가요?</h3>
                <p>시니어 MBTI는 60대 이상 중장년층의 독특한 인생 경험과 가치관을 반영하여 특별히 개발된 성격 유형 테스트입니다. 일반적인 MBTI와 달리 은퇴 후 인생, 건강 관리, 가족 관계, 사회적 역할 변화 등 시니어가 마주하는 특별한 상황들을 고려한 심리 분석을 제공합니다.</p>
              </div>
              
              <div className="content-block">
                <h3>🎯 은퇴 후 인생 설계의 새로운 출발점</h3>
                <p>은퇴는 인생의 끝이 아닌 새로운 시작입니다. 시니어 MBTI를 통해 내 성격 유형을 정확히 파악하고, 황금기 인생을 더욱 풍요롭게 만들 수 있는 활동, 취미, 인간관계를 발견하세요. 중장년층을 위한 맞춤형 라이프스타일 가이드를 제공합니다.</p>
              </div>
              
              <div className="content-block">
                <h3>💕 시니어 상성 분석의 과학적 근거</h3>
                <p>60년 이상의 인생 경험을 바탕으로 한 성격 분석은 더욱 정확하고 깊이 있습니다. 시니어 MBTI는 나와 가장 잘 맞는 동반자, 친구, 활동 파트너를 찾는 데 도움을 줍니다. 과학적으로 검증된 심리학 이론을 바탕으로 신뢰할 수 있는 상성 분석을 제공합니다.</p>
              </div>
            </div>
            
            <div className="faq-section">
              <h3 className="faq-title">자주 묻는 질문 (FAQ)</h3>
              <div className="faq-list">
                <div className="faq-item">
                  <h4 className="faq-question">Q: 시니어 MBTI 테스트는 정말 무료인가요?</h4>
                  <p className="faq-answer">A: 네, 완전 무료입니다. 회원가입이나 결제 없이 바로 테스트를 받으실 수 있으며, 결과 분석과 상성 정보도 모두 무료로 제공됩니다.</p>
                </div>
                
                <div className="faq-item">
                  <h4 className="faq-question">Q: 일반 MBTI와 시니어 MBTI의 차이점은 무엇인가요?</h4>
                  <p className="faq-answer">A: 시니어 MBTI는 60대+ 중장년층의 특별한 인생 단계를 고려합니다. 은퇴, 건강 관리, 가족 관계 변화 등 시니어만의 상황을 반영한 질문과 해석을 제공합니다.</p>
                </div>
                
                <div className="faq-item">
                  <h4 className="faq-question">Q: 테스트 시간은 얼마나 걸리나요?</h4>
                  <p className="faq-answer">A: 약 5분 정도 소요됩니다. 24개의 간단한 질문으로 구성되어 있어 부담 없이 완료하실 수 있습니다.</p>
                </div>
                
                <div className="faq-item">
                  <h4 className="faq-question">Q: 결과는 얼마나 정확한가요?</h4>
                  <p className="faq-answer">A: 심리학 전문가와 시니어 라이프 전문가가 공동 개발한 검증된 테스트입니다. 수천 명의 시니어 테스터를 통해 신뢰성을 확인했습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MBTI 유형별 내부 링크 섹션 */}
      <section className="internal-links-section">
        <div className="container">
          <div className="internal-links-header">
            <h2 className="internal-links-title">
              🔍 16가지 MBTI 성격 유형 탐색하기
            </h2>
            <p className="internal-links-subtitle">
              나와 비슷한 성격의 시니어들은 어떤 특징을 가지고 있을까요?
            </p>
          </div>
          
          <div className="mbti-grid">
            <div className="mbti-category analyst">
              <h3 className="category-title">💼 분석가 그룹 (NT)</h3>
              <div className="mbti-types">
                <a href="/result/intj" className="mbti-link intj">
                  <span className="mbti-code">INTJ</span>
                  <span className="mbti-name">전략가</span>
                  <span className="mbti-desc">체계적 사고와 독립적 생활</span>
                </a>
                <a href="/result/intp" className="mbti-link intp">
                  <span className="mbti-code">INTP</span>
                  <span className="mbti-name">사색가</span>
                  <span className="mbti-desc">분석적 사고와 지적 호기심</span>
                </a>
                <a href="/result/entj" className="mbti-link entj">
                  <span className="mbti-code">ENTJ</span>
                  <span className="mbti-name">통솔자</span>
                  <span className="mbti-desc">리더십과 도전 정신</span>
                </a>
                <a href="/result/entp" className="mbti-link entp">
                  <span className="mbti-code">ENTP</span>
                  <span className="mbti-name">발명가</span>
                  <span className="mbti-desc">창의적 사고와 새로운 도전</span>
                </a>
              </div>
            </div>
            
            <div className="mbti-category diplomat">
              <h3 className="category-title">🌈 외교관 그룹 (NF)</h3>
              <div className="mbti-types">
                <a href="/result/infj" className="mbti-link infj">
                  <span className="mbti-code">INFJ</span>
                  <span className="mbti-name">옵호자</span>
                  <span className="mbti-desc">깊은 통찰력과 의미 있는 관계</span>
                </a>
                <a href="/result/infp" className="mbti-link infp">
                  <span className="mbti-code">INFP</span>
                  <span className="mbti-name">중재자</span>
                  <span className="mbti-desc">가치관에 충실하고 자유로운 영혼</span>
                </a>
                <a href="/result/enfj" className="mbti-link enfj">
                  <span className="mbti-code">ENFJ</span>
                  <span className="mbti-name">선도자</span>
                  <span className="mbti-desc">타인에 대한 배려와 사회 기여</span>
                </a>
                <a href="/result/enfp" className="mbti-link enfp">
                  <span className="mbti-code">ENFP</span>
                  <span className="mbti-name">활동가</span>
                  <span className="mbti-desc">열정적이고 긍정적인 에너지</span>
                </a>
              </div>
            </div>
            
            <div className="mbti-category sentinel">
              <h3 className="category-title">🛡️ 관리자 그룹 (SJ)</h3>
              <div className="mbti-types">
                <a href="/result/istj" className="mbti-link istj">
                  <span className="mbti-code">ISTJ</span>
                  <span className="mbti-name">관리자</span>
                  <span className="mbti-desc">책임감과 체계적인 생활</span>
                </a>
                <a href="/result/isfj" className="mbti-link isfj">
                  <span className="mbti-code">ISFJ</span>
                  <span className="mbti-name">수호자</span>
                  <span className="mbti-desc">헌신적이고 따뜻한 돌봄</span>
                </a>
                <a href="/result/estj" className="mbti-link estj">
                  <span className="mbti-code">ESTJ</span>
                  <span className="mbti-name">감독관</span>
                  <span className="mbti-desc">효율성과 조직력 발휘</span>
                </a>
                <a href="/result/esfj" className="mbti-link esfj">
                  <span className="mbti-code">ESFJ</span>
                  <span className="mbti-name">집정관</span>
                  <span className="mbti-desc">따뜻한 사교성과 돌봄</span>
                </a>
              </div>
            </div>
            
            <div className="mbti-category explorer">
              <h3 className="category-title">🎭 탐험가 그룹 (SP)</h3>
              <div className="mbti-types">
                <a href="/result/istp" className="mbti-link istp">
                  <span className="mbti-code">ISTP</span>
                  <span className="mbti-name">장인</span>
                  <span className="mbti-desc">실용적이고 논리적인 접근</span>
                </a>
                <a href="/result/isfp" className="mbti-link isfp">
                  <span className="mbti-code">ISFP</span>
                  <span className="mbti-name">모험가</span>
                  <span className="mbti-desc">예술적 감각과 자유로운 영혼</span>
                </a>
                <a href="/result/estp" className="mbti-link estp">
                  <span className="mbti-code">ESTP</span>
                  <span className="mbti-name">사업가</span>
                  <span className="mbti-desc">현재를 즐기고 활동적인 삶</span>
                </a>
                <a href="/result/esfp" className="mbti-link esfp">
                  <span className="mbti-code">ESFP</span>
                  <span className="mbti-name">연예인</span>
                  <span className="mbti-desc">즐거움과 사교 활동을 즐기는</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="related-links">
            <h3 className="related-title">시니어 라이프 관련 정보</h3>
            <div className="related-grid">
              <a href="/mbti-compatibility" className="related-link">
                <span className="related-icon">💕</span>
                <span className="related-text">MBTI 상성 분석 가이드</span>
              </a>
              <a href="/senior-lifestyle" className="related-link">
                <span className="related-icon">🌿</span>
                <span className="related-text">시니어 라이프스타일 팁</span>
              </a>
              <a href="/retirement-planning" className="related-link">
                <span className="related-icon">🏡</span>
                <span className="related-text">은퇴 후 인생 설계</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-content">
            <h2 className="final-cta-title">
              지금 바로 시작하세요! 나만의 시니어 MBTI 여정
            </h2>
            <p className="final-cta-description">
              60대+ 황금기 인생을 더욱 풍요롭게 만들어줄 성격 분석을 무료로 받아보세요
            </p>
            <button
              onClick={handleStartTest}
              disabled={isStarting}
              className={`final-cta-button ${isStarting ? 'final-cta-loading' : ''}`}
            >
              <span className="final-cta-icon">✨</span>
              <span className="final-cta-text">
                {isStarting ? '테스트 시작 중...' : '무료 시니어 MBTI 테스트 시작하기'}
              </span>
            </button>
            <div className="final-guarantees">
              <span className="guarantee-item">✅ 완전 무료</span>
              <span className="guarantee-item">✅ 2분 완성</span>
              <span className="guarantee-item">✅ 즉시 결과</span>
              <span className="guarantee-item">✅ 개인정보 보호</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(102, 126, 234, 0.9) 0%, 
            rgba(118, 75, 162, 0.9) 100%);
        }

        .floating-elements {
          position: absolute;
          inset: 0;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: 20%;
          left: 15%;
          animation-delay: 2s;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 25%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .language-selector-wrapper {
          position: relative;
          z-index: 999999;
          display: flex;
          justify-content: flex-end;
          padding: 24px 0;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          padding: 12px 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .badge-text {
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          color: white;
          margin: 0 0 24px 0;
          line-height: 1.1;
        }

        .title-highlight {
          background: linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }

        .hero-tagline {
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 24px 0;
          font-weight: 500;
          line-height: 1.4;
        }

        .hero-description {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 48px 0;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .cta-button {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 20px 40px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
          transform: translateY(0);
          min-width: 280px;
          justify-content: center;
        }

        .cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
        }

        .cta-button:disabled {
          opacity: 0.8;
          cursor: not-allowed;
          transform: translateY(0);
        }

        .cta-icon {
          font-size: 24px;
        }

        .loading-spinner {
          margin-left: 8px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .trust-indicators {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 600;
        }

        .trust-icon {
          font-size: 16px;
        }

        /* Features Section */
        .features-section {
          background: white;
          padding: 100px 0;
        }

        .features-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .features-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #1F2937;
          margin: 0 0 16px 0;
        }

        .features-subtitle {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: #6B7280;
          margin: 0;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .feature-card {
          background: white;
          border-radius: 24px;
          padding: 40px 32px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #F3F4F6;
          transition: all 0.3s ease;
          text-align: center;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-1 { border-top: 4px solid #FF6B6B; }
        .card-2 { border-top: 4px solid #4ECDC4; }
        .card-3 { border-top: 4px solid #45B7D1; }
        .card-4 { border-top: 4px solid #96CEB4; }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #F8FAFC, #E2E8F0);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          font-size: 36px;
        }

        .feature-title {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin: 0 0 16px 0;
        }

        .feature-description {
          font-size: 16px;
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        /* Sample Section */
        .sample-section {
          background: #F8FAFC;
          padding: 100px 0;
        }

        .sample-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .sample-header {
          background: linear-gradient(45deg, #667eea, #764ba2);
          padding: 32px 40px;
          text-align: center;
        }

        .sample-title {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }

        .sample-content {
          padding: 40px;
        }

        .sample-question {
          margin-bottom: 32px;
        }

        .question-label {
          color: #4F46E5;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 12px 0;
        }

        .question-text {
          font-size: 20px;
          font-weight: 600;
          color: #1F2937;
          margin: 0;
          line-height: 1.5;
        }

        .sample-choices {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .choice-option {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #F8FAFC;
          border: 2px solid #E5E7EB;
          border-radius: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .choice-option:hover {
          border-color: #4F46E5;
          background: #EEF2FF;
        }

        .choice-label {
          width: 32px;
          height: 32px;
          background: #4F46E5;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .choice-text {
          font-size: 16px;
          color: #374151;
          font-weight: 500;
          line-height: 1.5;
        }

        /* SEO Header */
        .seo-header {
          position: absolute;
          top: 0;
          left: 0;
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* SEO Benefits */
        .seo-benefits {
          margin-top: 40px;
          padding: 32px;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 16px;
          border-left: 4px solid #667eea;
        }

        .seo-benefits-title {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 20px;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .benefits-list li {
          font-size: 16px;
          color: #374151;
          margin-bottom: 12px;
          line-height: 1.6;
        }

        /* SEO Content Section */
        .seo-content-section {
          background: #F8FAFC;
          padding: 100px 0;
        }

        .seo-content-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #1F2937;
          text-align: center;
          margin-bottom: 60px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }

        .content-block {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border-left: 4px solid #667eea;
        }

        .content-block h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 16px;
        }

        .content-block p {
          font-size: 16px;
          color: #374151;
          line-height: 1.7;
          margin: 0;
        }

        /* FAQ Section */
        .faq-section {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .faq-title {
          font-size: 32px;
          font-weight: 800;
          color: #1F2937;
          text-align: center;
          margin-bottom: 40px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .faq-item {
          padding: 24px;
          background: #F8FAFC;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .faq-question {
          font-size: 18px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 12px;
        }

        .faq-answer {
          font-size: 16px;
          color: #374151;
          line-height: 1.6;
          margin: 0;
        }

        /* Final CTA Section */
        .final-cta-section {
          background: linear-gradient(135deg, #1F2937 0%, #374151 100%);
          padding: 100px 0;
          text-align: center;
        }

        .final-cta-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          color: white;
          margin: 0 0 20px 0;
          line-height: 1.3;
        }

        .final-cta-description {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          line-height: 1.5;
        }

        .final-guarantees {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .guarantee-item {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }

        .final-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(45deg, #F59E0B, #EAB308);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 20px 40px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
        }

        .final-cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(245, 158, 11, 0.6);
        }

        .final-cta-icon {
          font-size: 24px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }

          .hero-content {
            padding: 20px 0;
          }

          .features-section,
          .sample-section,
          .final-cta-section {
            padding: 60px 0;
          }

          .features-grid {
            gap: 24px;
          }

          .feature-card {
            padding: 32px 24px;
          }

          .sample-content {
            padding: 32px 24px;
          }

          .trust-indicators {
            gap: 16px;
          }

          .choice-option {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        /* Hero SEO Hook Styles */
        .hero-seo-hook {
          margin: 24px 0;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
        }

        .seo-hook-main {
          font-size: 18px;
          color: white;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .seo-hook-sub {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.6;
        }

        /* Compatibility Showcase Section */
        .compatibility-showcase-section {
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .showcase-title {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .showcase-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          line-height: 1.6;
        }

        .compatibility-examples {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .example-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.3s ease;
        }

        .example-card:hover {
          transform: translateY(-8px);
        }

        .example-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .example-title {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .example-subtitle {
          font-size: 16px;
          color: #6B7280;
          margin: 0;
        }

        .mbti-cards {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          gap: 16px;
        }

        .mbti-card {
          flex: 1;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .mbti-type {
          font-size: 24px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .mbti-name {
          font-size: 16px;
          color: #374151;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .mbti-traits {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
        }

        .trait {
          font-size: 12px;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 500;
        }

        .compatibility-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 120px;
        }

        .heart-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .compatibility-text {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          text-align: center;
        }

        .compatibility-indicator.challenging .compatibility-text {
          color: #D97706;
        }

        .compatibility-reason {
          padding: 16px;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .compatibility-reason p {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
          margin: 0;
        }

        .showcase-cta {
          text-align: center;
        }

        .showcase-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .showcase-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
        }

        /* Mobile responsiveness for new sections */
        @media (max-width: 768px) {
          .hero-seo-hook {
            margin: 16px 0;
            padding: 16px;
          }

          .seo-hook-main {
            font-size: 16px;
          }

          .seo-hook-sub {
            font-size: 14px;
          }

          .compatibility-showcase-section {
            padding: 60px 0;
          }

          .showcase-title {
            font-size: 28px;
          }

          .showcase-subtitle {
            font-size: 16px;
          }

          .compatibility-examples {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 40px;
          }

          .example-card {
            padding: 24px;
          }

          .mbti-cards {
            flex-direction: column;
            gap: 12px;
          }

          .compatibility-indicator {
            min-width: auto;
            flex-direction: row;
            gap: 8px;
          }

          .heart-icon {
            font-size: 24px;
            margin-bottom: 0;
          }

          /* SEO Content Mobile */
          .seo-content-section {
            padding: 60px 0;
          }

          .content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 60px;
          }

          .content-block {
            padding: 24px;
          }

          .faq-section {
            padding: 24px;
          }

          .faq-item {
            padding: 20px;
          }

          .final-guarantees {
            gap: 12px;
          }

          .benefits-list li {
            font-size: 14px;
          }

          .seo-benefits {
            padding: 24px;
          }
        }

        /* 내부 링크 섹션 */
        .internal-links-section {
          background: #F8FAFC;
          padding: 100px 0;
        }

        .internal-links-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .internal-links-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 16px;
        }

        .internal-links-subtitle {
          font-size: 18px;
          color: #6B7280;
          margin: 0;
          line-height: 1.6;
        }

        .mbti-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }

        .mbti-category {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .mbti-category:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .mbti-category.analyst {
          border-top: 4px solid #8B5CF6;
        }

        .mbti-category.diplomat {
          border-top: 4px solid #F59E0B;
        }

        .mbti-category.sentinel {
          border-top: 4px solid #3B82F6;
        }

        .mbti-category.explorer {
          border-top: 4px solid #10B981;
        }

        .category-title {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 24px;
          text-align: center;
        }

        .mbti-types {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mbti-link {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
          background: #F8FAFC;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          color: inherit;
        }

        .mbti-link:hover {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
          border-color: #667eea;
          transform: translateX(4px);
        }

        .mbti-code {
          font-size: 18px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mbti-name {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .mbti-desc {
          font-size: 12px;
          color: #6B7280;
          line-height: 1.4;
        }

        .related-links {
          text-align: center;
        }

        .related-title {
          font-size: 28px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 32px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .related-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: white;
          border: 2px solid #E5E7EB;
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .related-link:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .related-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .related-text {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
        }

        /* 내부 링크 모바일 반응형 */
        @media (max-width: 768px) {
          .internal-links-section {
            padding: 60px 0;
          }

          .mbti-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 60px;
          }

          .mbti-category {
            padding: 24px;
          }

          .related-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .related-link {
            padding: 20px;
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        /* Animation for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .floating-circle,
          .cta-button,
          .feature-card,
          .choice-option,
          .final-cta-button,
          .example-card,
          .showcase-cta-button,
          .mbti-category,
          .mbti-link,
          .related-link {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}