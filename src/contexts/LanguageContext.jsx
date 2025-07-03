'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(undefined);

// 완전한 번역 데이터
const translations = {
  ko: {
    // 공통
    'site.title': '시니어 MBTI',
    'site.subtitle': '당신만의 특별한 성격 유형을 찾아보세요',
    
    // 랜딩페이지
    'landing.title': '시니어 MBTI',
    'landing.tagline': '인생의 경험이 만든 당신만의 특별한 성격',
    'landing.welcome': '환영합니다!',
    'landing.description': '평생의 풍부한 경험을 쌓아오신 당신을 위한 특별한 성격 유형 테스트입니다.\n24개의 간단한 질문을 통해 당신만의 독특한 성격과 지혜를 발견해보세요.',
    'landing.start': '✨ 테스트 시작하기',
    'landing.starting': '시작하는 중...',
    'landing.closing': '지금 바로 당신만의 성격 유형을 발견해보세요!',
    
    // Meta information
    'meta.title': '시니어 MBTI - 성격 유형 테스트',
    'meta.seo.title': '시니어 MBTI | 중장년 성격 유형 테스트 | 은퇴 후 인생 설계 가이드',
    
    // Trust indicators
    'trust.anonymous': '100% 익명',
    'trust.expert': '전문가 제작',
    'trust.quick': '2분 완성',
    
    // Hero section
    'hero.badge': '✨ 60대+ 시니어 전용 성격 분석',
    'hero.title': '시니어 MBTI 성격 유형 테스트',
    'hero.tagline': '은퇴 후 새로운 인생과 이상적인 인간관계를 위한 전문 심리 분석',
    'hero.description': '60대 이상 중장년층을 위해 특별히 설계된 MBTI 성격 유형 테스트로 내 성향과 가장 잘 맞는 동반자를 찾아보세요. 무료 심리 테스트를 통해 황금기 인생의 새로운 가능성을 발견하세요.',
    'hero.seo.hook.main': '🔍 내 MBTI를 확인하고 상성 관계의 MBTI를 찾아보세요!',
    'hero.seo.hook.sub': '앞으로 남은 인생 동안 나와 인연을 맺으며 함께 살아갈 성향이 잘 맞는 사람을 파악할 수 있어요! 시니어 라이프스타일에 최적화된 맞춤형 상성 분석을 제공합니다.',
    
    // Features 섹션
    'landing.time.title': '빠른 완성',
    'landing.time.desc': '단 2분만에 완료되는 간단하고 정확한 성격 유형 테스트',
    'landing.method.title': '과학적 방법',
    'landing.method.desc': '심리학 전문가들이 개발한 검증된 성격 분석 방법론',
    'landing.types.title': '16가지 유형',
    'landing.types.desc': '당신의 독특한 성격을 16가지 상세한 유형으로 분석',
    'landing.privacy.title': '완전 익명',
    'landing.privacy.desc': '개인정보 수집 없이 안전하게 진행되는 익명 테스트',
    
    'features.section.title': '시니어 MBTI가 중장년층에게 특별한 이유',
    'features.section.subtitle': '60대+ 은퇴 후 인생을 위한 전문적인 성격 분석과 라이프스타일 가이드',
    
    // SEO Benefits
    'seo.benefits.title': '시니어 맞춤 MBTI 테스트의 특별한 장점',
    'seo.benefits.item1.highlight': '중장년 심리 전문가',
    'seo.benefits.item1.text': '가 설계한 시니어 특화 질문',
    'seo.benefits.item2.highlight': '은퇴 후 인생 설계',
    'seo.benefits.item2.text': '를 위한 맞춤형 조언 제공',
    'seo.benefits.item3.highlight': '60대+ 인간관계',
    'seo.benefits.item3.text': ' 개선을 위한 상성 분석',
    'seo.benefits.item4.highlight': '황금기 라이프스타일',
    'seo.benefits.item4.text': '에 최적화된 성격 해석',
    'seo.benefits.item5.highlight': '시니어 건강 관리',
    'seo.benefits.item5.text': '와 연계된 생활 가이드',
    
    // MBTI Compatibility Showcase
    'compatibility.showcase.title': '💕 MBTI 상성 분석 미리보기',
    'compatibility.showcase.subtitle': '당신과 최고의 궁합인 MBTI와 상극인 MBTI를 미리 확인해보세요',
    
    'compatibility.best.title': '💖 최고의 궁합 예시',
    'compatibility.best.example': 'INTJ × ENFP 조합',
    'compatibility.best.reason': '체계적인 INTJ와 창의적인 ENFP는 서로의 장점을 보완하며 깊은 이해를 바탕으로 한 관계를 형성합니다.',
    
    'compatibility.challenging.title': '💛 이해가 필요한 예시',
    'compatibility.challenging.example': 'INTJ × ESFJ 조합',
    'compatibility.challenging.reason': '서로 다른 접근 방식을 가지지만, 상호 이해와 배려를 통해 균형 잡힌 관계를 만들어갈 수 있습니다.',
    
    'compatibility.perfect': '완벽한 조화',
    'compatibility.effort': '노력 필요',
    'compatibility.cta': '내 MBTI와 상성 확인하기',
    
    // MBTI Types
    'mbti.intj.name': '전략가',
    'mbti.intj.desc': '체계적 사고와 독립적 생활',
    'mbti.intj.trait1': '체계적 사고',
    'mbti.intj.trait2': '독립적',
    'mbti.intj.trait3': '장기 계획',
    
    'mbti.intp.name': '사색가',
    'mbti.intp.desc': '분석적 사고와 지적 호기심',
    'mbti.intp.trait1': '분석적',
    'mbti.intp.trait2': '호기심',
    'mbti.intp.trait3': '논리적',
    
    'mbti.entj.name': '통솔자',
    'mbti.entj.desc': '리더십과 도전 정신',
    'mbti.entj.trait1': '리더십',
    'mbti.entj.trait2': '도전적',
    'mbti.entj.trait3': '추진력',
    
    'mbti.entp.name': '발명가',
    'mbti.entp.desc': '창의적 사고와 새로운 도전',
    'mbti.entp.trait1': '창의적',
    'mbti.entp.trait2': '혁신적',
    'mbti.entp.trait3': '활발함',
    
    'mbti.infj.name': '옹호자',
    'mbti.infj.desc': '깊은 통찰력과 의미 있는 관계',
    'mbti.infj.trait1': '통찰력',
    'mbti.infj.trait2': '이상주의',
    'mbti.infj.trait3': '배려심',
    
    'mbti.infp.name': '중재자',
    'mbti.infp.desc': '가치관에 충실하고 자유로운 영혼',
    'mbti.infp.trait1': '가치 중심',
    'mbti.infp.trait2': '자유로움',
    'mbti.infp.trait3': '창의성',
    
    'mbti.enfj.name': '선도자',
    'mbti.enfj.desc': '타인에 대한 배려와 사회 기여',
    'mbti.enfj.trait1': '배려심',
    'mbti.enfj.trait2': '사회적',
    'mbti.enfj.trait3': '영감력',
    
    'mbti.enfp.name': '활동가',
    'mbti.enfp.desc': '열정적이고 긍정적인 에너지',
    'mbti.enfp.trait1': '열정적',
    'mbti.enfp.trait2': '창의적',
    'mbti.enfp.trait3': '사교적',
    
    'mbti.istj.name': '관리자',
    'mbti.istj.desc': '책임감과 체계적인 생활',
    'mbti.istj.trait1': '책임감',
    'mbti.istj.trait2': '체계적',
    'mbti.istj.trait3': '신뢰성',
    
    'mbti.isfj.name': '수호자',
    'mbti.isfj.desc': '헌신적이고 따뜻한 돌봄',
    'mbti.isfj.trait1': '헌신적',
    'mbti.isfj.trait2': '따뜻함',
    'mbti.isfj.trait3': '보호적',
    
    'mbti.estj.name': '감독관',
    'mbti.estj.desc': '효율성과 조직력 발휘',
    'mbti.estj.trait1': '효율성',
    'mbti.estj.trait2': '조직력',
    'mbti.estj.trait3': '실용성',
    
    'mbti.esfj.name': '집정관',
    'mbti.esfj.desc': '따뜻한 사교성과 돌봄',
    'mbti.esfj.trait1': '배려심',
    'mbti.esfj.trait2': '사교적',
    'mbti.esfj.trait3': '협력적',
    
    'mbti.istp.name': '장인',
    'mbti.istp.desc': '실용적이고 논리적인 접근',
    'mbti.istp.trait1': '실용적',
    'mbti.istp.trait2': '논리적',
    'mbti.istp.trait3': '유연함',
    
    'mbti.isfp.name': '모험가',
    'mbti.isfp.desc': '예술적 감각과 자유로운 영혼',
    'mbti.isfp.trait1': '예술적',
    'mbti.isfp.trait2': '자유로움',
    'mbti.isfp.trait3': '온화함',
    
    'mbti.estp.name': '사업가',
    'mbti.estp.desc': '현재를 즐기고 활동적인 삶',
    'mbti.estp.trait1': '활동적',
    'mbti.estp.trait2': '현실적',
    'mbti.estp.trait3': '사교적',
    
    'mbti.esfp.name': '연예인',
    'mbti.esfp.desc': '즐거움과 사교 활동을 즐기는',
    'mbti.esfp.trait1': '즐거움',
    'mbti.esfp.trait2': '사교적',
    'mbti.esfp.trait3': '활발함',
    
    // MBTI Categories
    'mbti.analyst.title': '💼 분석가 그룹 (NT)',
    'mbti.diplomat.title': '🌈 외교관 그룹 (NF)',
    'mbti.sentinel.title': '🛡️ 관리자 그룹 (SJ)',
    'mbti.explorer.title': '🎭 탐험가 그룹 (SP)',
    
    // 샘플 질문 섹션
    'landing.questions.title': '테스트 미리보기',
    'landing.questions.example': '예시 질문',
    'landing.questions.sample': '새로운 사람들과의 모임에서 당신은 어떤 편인가요?',
    'landing.questions.choice1': '먼저 다가가서 대화를 시작하는 편입니다',
    'landing.questions.choice2': '누군가 먼저 말을 걸어올 때까지 기다리는 편입니다',
    
    // SEO Content
    'seo.content.title': '시니어 MBTI 성격 유형 테스트 완벽 가이드',
    'seo.content.block1.title': '💎 시니어 MBTI란 무엇인가요?',
    'seo.content.block1.text': '시니어 MBTI는 60대 이상 중장년층의 독특한 인생 경험과 가치관을 반영하여 특별히 개발된 성격 유형 테스트입니다. 일반적인 MBTI와 달리 은퇴 후 인생, 건강 관리, 가족 관계, 사회적 역할 변화 등 시니어가 마주하는 특별한 상황들을 고려한 심리 분석을 제공합니다.',
    'seo.content.block2.title': '🎯 은퇴 후 인생 설계의 새로운 출발점',
    'seo.content.block2.text': '은퇴는 인생의 끝이 아닌 새로운 시작입니다. 시니어 MBTI를 통해 내 성격 유형을 정확히 파악하고, 황금기 인생을 더욱 풍요롭게 만들 수 있는 활동, 취미, 인간관계를 발견하세요. 중장년층을 위한 맞춤형 라이프스타일 가이드를 제공합니다.',
    'seo.content.block3.title': '💕 시니어 상성 분석의 과학적 근거',
    'seo.content.block3.text': '60년 이상의 인생 경험을 바탕으로 한 성격 분석은 더욱 정확하고 깊이 있습니다. 시니어 MBTI는 나와 가장 잘 맞는 동반자, 친구, 활동 파트너를 찾는 데 도움을 줍니다. 과학적으로 검증된 심리학 이론을 바탕으로 신뢰할 수 있는 상성 분석을 제공합니다.',
    
    // FAQ
    'faq.title': '자주 묻는 질문 (FAQ)',
    'faq.q1': 'Q: 시니어 MBTI 테스트는 정말 무료인가요?',
    'faq.a1': 'A: 네, 완전 무료입니다. 회원가입이나 결제 없이 바로 테스트를 받으실 수 있으며, 결과 분석과 상성 정보도 모두 무료로 제공됩니다.',
    'faq.q2': 'Q: 일반 MBTI와 시니어 MBTI의 차이점은 무엇인가요?',
    'faq.a2': 'A: 시니어 MBTI는 60대+ 중장년층의 특별한 인생 단계를 고려합니다. 은퇴, 건강 관리, 가족 관계 변화 등 시니어만의 상황을 반영한 질문과 해석을 제공합니다.',
    'faq.q3': 'Q: 테스트 시간은 얼마나 걸리나요?',
    'faq.a3': 'A: 약 5분 정도 소요됩니다. 24개의 간단한 질문으로 구성되어 있어 부담 없이 완료하실 수 있습니다.',
    'faq.q4': 'Q: 결과는 얼마나 정확한가요?',
    'faq.a4': 'A: 심리학 전문가와 시니어 라이프 전문가가 공동 개발한 검증된 테스트입니다. 수천 명의 시니어 테스터를 통해 신뢰성을 확인했습니다.',
    
    // Internal Links
    'internal.title': '🔍 16가지 MBTI 성격 유형 탐색하기',
    'internal.subtitle': '나와 비슷한 성격의 시니어들은 어떤 특징을 가지고 있을까요?',
    'internal.related.title': '시니어 라이프 관련 정보',
    'internal.related.compatibility': 'MBTI 상성 분석 가이드',
    'internal.related.lifestyle': '시니어 라이프스타일 팁',
    'internal.related.retirement': '은퇴 후 인생 설계',
    
    // Final CTA
    'final.title': '지금 바로 시작하세요! 나만의 시니어 MBTI 여정',
    'final.description': '60대+ 황금기 인생을 더욱 풍요롭게 만들어줄 성격 분석을 무료로 받아보세요',
    'final.cta': '무료 시니어 MBTI 테스트 시작하기',
    'final.starting': '테스트 시작 중...',
    'final.guarantee1': '완전 무료',
    'final.guarantee2': '2분 완성',
    'final.guarantee3': '즉시 결과',
    'final.guarantee4': '개인정보 보호',
  },
  
  en: {
    // 공통
    'site.title': 'Senior MBTI',
    'site.subtitle': 'Discover your unique personality type',
    
    // 랜딩페이지
    'landing.title': 'Senior MBTI',
    'landing.tagline': 'Your distinctive personality shaped by a lifetime of experience',
    'landing.welcome': 'Welcome!',
    'landing.description': 'A thoughtfully designed personality assessment for mature adults with rich life experiences.\nDiscover your unique character and wisdom through 24 simple questions.',
    'landing.start': '✨ Start Test',
    'landing.starting': 'Starting...',
    'landing.closing': 'Discover your unique personality type right now!',
    
    // Meta information
    'meta.title': 'Senior MBTI - Personality Type Test',
    'meta.seo.title': 'Senior MBTI | Personality Type Test for Mature Adults | Retirement Life Guide',
    
    // Trust indicators
    'trust.anonymous': '100% Anonymous',
    'trust.expert': 'Expert Made',
    'trust.quick': '2 Min Test',
    
    // Hero section
    'hero.badge': '✨ Exclusive personality analysis for seniors 60+',
    'hero.title': 'Senior MBTI Personality Type Test',
    'hero.tagline': 'Professional psychological analysis for new life and ideal relationships after retirement',
    'hero.description': 'MBTI personality type test specially designed for mature adults aged 60+. Find companions who match your temperament best. Discover new possibilities for your golden years through free psychological testing.',
    'hero.seo.hook.main': '🔍 Check your MBTI and find compatible personality types!',
    'hero.seo.hook.sub': 'Identify people with compatible personalities who will make great companions for the rest of your life journey. We provide personalized compatibility analysis optimized for senior lifestyles.',
    
    // Features 섹션
    'landing.time.title': 'Quick Completion',
    'landing.time.desc': 'Complete this simple and accurate personality test in just 2 minutes',
    'landing.method.title': 'Scientific Method',
    'landing.method.desc': 'Validated personality analysis methodology developed by psychology experts',
    'landing.types.title': '16 Types',
    'landing.types.desc': 'Analyze your unique personality through 16 detailed types',
    'landing.privacy.title': 'Completely Anonymous',
    'landing.privacy.desc': 'Safe anonymous test conducted without collecting personal information',
    
    'features.section.title': 'Why Senior MBTI is Special for Mature Adults',
    'features.section.subtitle': 'Professional personality analysis and lifestyle guide for life after retirement at 60+',
    
    // SEO Benefits
    'seo.benefits.title': 'Special Benefits of Senior-Tailored MBTI Test',
    'seo.benefits.item1.highlight': 'Psychology experts for mature adults',
    'seo.benefits.item1.text': ' designed senior-specific questions',
    'seo.benefits.item2.highlight': 'Post-retirement life planning',
    'seo.benefits.item2.text': ' with personalized advice',
    'seo.benefits.item3.highlight': '60+ relationship',
    'seo.benefits.item3.text': ' improvement through compatibility analysis',
    'seo.benefits.item4.highlight': 'Golden years lifestyle',
    'seo.benefits.item4.text': ' optimized personality interpretation',
    'seo.benefits.item5.highlight': 'Senior health management',
    'seo.benefits.item5.text': ' integrated lifestyle guide',
    
    // MBTI Compatibility Showcase
    'compatibility.showcase.title': '💕 MBTI Compatibility Analysis Preview',
    'compatibility.showcase.subtitle': 'Preview the MBTI types that are most and least compatible with you',
    
    'compatibility.best.title': '💖 Perfect Match Example',
    'compatibility.best.example': 'INTJ × ENFP Combination',
    'compatibility.best.reason': 'Systematic INTJ and creative ENFP complement each other\'s strengths and form relationships based on deep understanding.',
    
    'compatibility.challenging.title': '💛 Understanding Required Example',
    'compatibility.challenging.example': 'INTJ × ESFJ Combination',
    'compatibility.challenging.reason': 'Though they have different approaches, they can create a balanced relationship through mutual understanding and consideration.',
    
    'compatibility.perfect': 'Perfect Harmony',
    'compatibility.effort': 'Effort Required',
    'compatibility.cta': 'Check Compatibility with My MBTI',
    
    // MBTI Types
    'mbti.intj.name': 'Architect',
    'mbti.intj.desc': 'Systematic thinking and independent living',
    'mbti.intj.trait1': 'Systematic',
    'mbti.intj.trait2': 'Independent',
    'mbti.intj.trait3': 'Strategic',
    
    'mbti.intp.name': 'Thinker',
    'mbti.intp.desc': 'Analytical thinking and intellectual curiosity',
    'mbti.intp.trait1': 'Analytical',
    'mbti.intp.trait2': 'Curious',
    'mbti.intp.trait3': 'Logical',
    
    'mbti.entj.name': 'Commander',
    'mbti.entj.desc': 'Leadership and challenging spirit',
    'mbti.entj.trait1': 'Leadership',
    'mbti.entj.trait2': 'Challenging',
    'mbti.entj.trait3': 'Driven',
    
    'mbti.entp.name': 'Debater',
    'mbti.entp.desc': 'Creative thinking and new challenges',
    'mbti.entp.trait1': 'Creative',
    'mbti.entp.trait2': 'Innovative',
    'mbti.entp.trait3': 'Energetic',
    
    'mbti.infj.name': 'Advocate',
    'mbti.infj.desc': 'Deep insight and meaningful relationships',
    'mbti.infj.trait1': 'Insightful',
    'mbti.infj.trait2': 'Idealistic',
    'mbti.infj.trait3': 'Caring',
    
    'mbti.infp.name': 'Mediator',
    'mbti.infp.desc': 'Value-driven and free spirit',
    'mbti.infp.trait1': 'Value-based',
    'mbti.infp.trait2': 'Free-spirited',
    'mbti.infp.trait3': 'Creative',
    
    'mbti.enfj.name': 'Protagonist',
    'mbti.enfj.desc': 'Care for others and social contribution',
    'mbti.enfj.trait1': 'Caring',
    'mbti.enfj.trait2': 'Social',
    'mbti.enfj.trait3': 'Inspiring',
    
    'mbti.enfp.name': 'Campaigner',
    'mbti.enfp.desc': 'Passionate and positive energy',
    'mbti.enfp.trait1': 'Passionate',
    'mbti.enfp.trait2': 'Creative',
    'mbti.enfp.trait3': 'Social',
    
    'mbti.istj.name': 'Logistician',
    'mbti.istj.desc': 'Responsibility and systematic living',
    'mbti.istj.trait1': 'Responsible',
    'mbti.istj.trait2': 'Systematic',
    'mbti.istj.trait3': 'Reliable',
    
    'mbti.isfj.name': 'Protector',
    'mbti.isfj.desc': 'Devoted and warm care',
    'mbti.isfj.trait1': 'Devoted',
    'mbti.isfj.trait2': 'Warm',
    'mbti.isfj.trait3': 'Protective',
    
    'mbti.estj.name': 'Executive',
    'mbti.estj.desc': 'Efficiency and organizational skills',
    'mbti.estj.trait1': 'Efficient',
    'mbti.estj.trait2': 'Organized',
    'mbti.estj.trait3': 'Practical',
    
    'mbti.esfj.name': 'Consul',
    'mbti.esfj.desc': 'Warm sociability and care',
    'mbti.esfj.trait1': 'Caring',
    'mbti.esfj.trait2': 'Social',
    'mbti.esfj.trait3': 'Cooperative',
    
    'mbti.istp.name': 'Virtuoso',
    'mbti.istp.desc': 'Practical and logical approach',
    'mbti.istp.trait1': 'Practical',
    'mbti.istp.trait2': 'Logical',
    'mbti.istp.trait3': 'Flexible',
    
    'mbti.isfp.name': 'Adventurer',
    'mbti.isfp.desc': 'Artistic sense and free spirit',
    'mbti.isfp.trait1': 'Artistic',
    'mbti.isfp.trait2': 'Free-spirited',
    'mbti.isfp.trait3': 'Gentle',
    
    'mbti.estp.name': 'Entrepreneur',
    'mbti.estp.desc': 'Enjoying the present and active life',
    'mbti.estp.trait1': 'Active',
    'mbti.estp.trait2': 'Realistic',
    'mbti.estp.trait3': 'Social',
    
    'mbti.esfp.name': 'Entertainer',
    'mbti.esfp.desc': 'Enjoying fun and social activities',
    'mbti.esfp.trait1': 'Fun-loving',
    'mbti.esfp.trait2': 'Social',
    'mbti.esfp.trait3': 'Energetic',
    
    // MBTI Categories
    'mbti.analyst.title': '💼 Analyst Group (NT)',
    'mbti.diplomat.title': '🌈 Diplomat Group (NF)',
    'mbti.sentinel.title': '🛡️ Sentinel Group (SJ)',
    'mbti.explorer.title': '🎭 Explorer Group (SP)',
    
    // 샘플 질문 섹션
    'landing.questions.title': 'Test Preview',
    'landing.questions.example': 'Sample Question',
    'landing.questions.sample': 'At a gathering with new people, which are you more likely to do?',
    'landing.questions.choice1': 'Approach first and start conversations',
    'landing.questions.choice2': 'Wait for someone else to initiate conversation',
    
    // SEO Content
    'seo.content.title': 'Complete Guide to Senior MBTI Personality Type Test',
    'seo.content.block1.title': '💎 What is Senior MBTI?',
    'seo.content.block1.text': 'Senior MBTI is a personality type test specially developed to reflect the unique life experiences and values of mature adults aged 60 and above. Unlike regular MBTI, it provides psychological analysis considering special situations that seniors face, such as post-retirement life, health management, family relationships, and social role changes.',
    'seo.content.block2.title': '🎯 A New Starting Point for Post-Retirement Life Planning',
    'seo.content.block2.text': 'Retirement is not the end of life but a new beginning. Through Senior MBTI, accurately identify your personality type and discover activities, hobbies, and relationships that can enrich your golden years. We provide personalized lifestyle guides for mature adults.',
    'seo.content.block3.title': '💕 Scientific Basis of Senior Compatibility Analysis',
    'seo.content.block3.text': 'Personality analysis based on over 60 years of life experience is more accurate and profound. Senior MBTI helps you find the best-matching companions, friends, and activity partners. We provide reliable compatibility analysis based on scientifically validated psychological theories.',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions (FAQ)',
    'faq.q1': 'Q: Is the Senior MBTI test really free?',
    'faq.a1': 'A: Yes, it\'s completely free. You can take the test immediately without any registration or payment, and all result analysis and compatibility information are provided free of charge.',
    'faq.q2': 'Q: What\'s the difference between regular MBTI and Senior MBTI?',
    'faq.a2': 'A: Senior MBTI considers the special life stage of mature adults aged 60+. It provides questions and interpretations reflecting senior-specific situations such as retirement, health management, and family relationship changes.',
    'faq.q3': 'Q: How long does the test take?',
    'faq.a3': 'A: It takes approximately 5 minutes. It consists of 24 simple questions that you can complete without burden.',
    'faq.q4': 'Q: How accurate are the results?',
    'faq.a4': 'A: It\'s a validated test co-developed by psychology experts and senior life specialists. Reliability has been confirmed through thousands of senior testers.',
    
    // Internal Links
    'internal.title': '🔍 Explore 16 MBTI Personality Types',
    'internal.subtitle': 'What characteristics do seniors with personalities similar to yours have?',
    'internal.related.title': 'Senior Life Related Information',
    'internal.related.compatibility': 'MBTI Compatibility Analysis Guide',
    'internal.related.lifestyle': 'Senior Lifestyle Tips',
    'internal.related.retirement': 'Post-Retirement Life Planning',
    
    // Final CTA
    'final.title': 'Start Now! Your Senior MBTI Journey',
    'final.description': 'Get a free personality analysis that will enrich your golden years at 60+',
    'final.cta': 'Start Free Senior MBTI Test',
    'final.starting': 'Starting test...',
    'final.guarantee1': 'Completely Free',
    'final.guarantee2': '2 Min Complete',
    'final.guarantee3': 'Instant Results',
    'final.guarantee4': 'Privacy Protected',
  },
  
  zh: {
    // 공통
    'site.title': '银发族MBTI',
    'site.subtitle': '发现您独特的性格类型',
    
    // 랜딩페이지
    'landing.title': '银发族MBTI',
    'landing.tagline': '您丰富人生阅历塑造的独特性格',
    'landing.welcome': '欢迎您，尊敬的长者！',
    'landing.description': '专为拥有丰富人生阅历的长者们精心设计的性格类型测试。\n通过24个简单问题，发现您独特的性格魅力和人生智慧。',
    'landing.start': '✨ 开始测试',
    'landing.starting': '正在开始...',
    'landing.closing': '立即发现您独特的性格类型！',
    
    // Meta information
    'meta.title': '银发族MBTI - 性格类型测试',
    'meta.seo.title': '银发族MBTI | 中老年性格类型测试 | 退休后人生规划指南',
    
    // Trust indicators
    'trust.anonymous': '100% 匿名',
    'trust.expert': '专家制作',
    'trust.quick': '2分钟完成',
    
    // Hero section
    'hero.badge': '✨ 60岁以上银发族专属性格分析',
    'hero.title': '银发族MBTI性格类型测试',
    'hero.tagline': '退休后新生活和理想人际关系的专业心理分析',
    'hero.description': '专为60岁以上中老年人特别设计的MBTI性格类型测试，帮您找到最合适的人生伴侣。通过免费心理测试，发现黄金年华的新可能。',
    'hero.seo.hook.main': '🔍 确认我的MBTI，找到相配的MBTI类型！',
    'hero.seo.hook.sub': '了解在今后的人生中与您相伴同行、性格相配的人！提供专为银发族生活方式优化的个性化相性分析。',
    
    // Features 섹션
    'landing.time.title': '快速完成',
    'landing.time.desc': '仅需2分钟即可完成的简单而准确的性格类型测试',
    'landing.method.title': '科学方法',
    'landing.method.desc': '由心理学专家开发的经过验证的性格分析方法论',
    'landing.types.title': '16种类型',
    'landing.types.desc': '通过16种详细类型分析您独特的性格',
    'landing.privacy.title': '完全匿名',
    'landing.privacy.desc': '无需收集个人信息的安全匿名测试',
    
    'features.section.title': '为什么银发族MBTI对中老年人特别有意义',
    'features.section.subtitle': '专为60岁以上退休后生活设计的专业性格分析和生活方式指南',
    
    // SEO Benefits
    'seo.benefits.title': '银发族专属MBTI测试的特殊优势',
    'seo.benefits.item1.highlight': '中老年心理专家',
    'seo.benefits.item1.text': '设计的银发族专属问题',
    'seo.benefits.item2.highlight': '退休后人生规划',
    'seo.benefits.item2.text': '个性化建议提供',
    'seo.benefits.item3.highlight': '60岁以上人际关系',
    'seo.benefits.item3.text': '改善的相性分析',
    'seo.benefits.item4.highlight': '黄金年华生活方式',
    'seo.benefits.item4.text': '优化的性格解释',
    'seo.benefits.item5.highlight': '银发族健康管理',
    'seo.benefits.item5.text': '关联的生活指南',
    
    // MBTI Compatibility Showcase
    'compatibility.showcase.title': '💕 MBTI相性分析预览',
    'compatibility.showcase.subtitle': '提前确认与您最配和不配的MBTI类型',
    
    'compatibility.best.title': '💖 最佳配对示例',
    'compatibility.best.example': 'INTJ × ENFP 组合',
    'compatibility.best.reason': '系统性的INTJ和创造性的ENFP互补优势，形成基于深度理解的关系。',
    
    'compatibility.challenging.title': '💛 需要理解的示例',
    'compatibility.challenging.example': 'INTJ × ESFJ 组合',
    'compatibility.challenging.reason': '虽然有不同的处理方式，但通过相互理解和关怀可以建立平衡的关系。',
    
    'compatibility.perfect': '完美和谐',
    'compatibility.effort': '需要努力',
    'compatibility.cta': '确认我的MBTI相性',
    
    // MBTI Types
    'mbti.intj.name': '建筑师',
    'mbti.intj.desc': '系统思考和独立生活',
    'mbti.intj.trait1': '系统性',
    'mbti.intj.trait2': '独立性',
    'mbti.intj.trait3': '战略性',
    
    'mbti.intp.name': '思想家',
    'mbti.intp.desc': '分析思考和知识好奇心',
    'mbti.intp.trait1': '分析性',
    'mbti.intp.trait2': '好奇心',
    'mbti.intp.trait3': '逻辑性',
    
    'mbti.entj.name': '指挥官',
    'mbti.entj.desc': '领导力和挑战精神',
    'mbti.entj.trait1': '领导力',
    'mbti.entj.trait2': '挑战性',
    'mbti.entj.trait3': '推动力',
    
    'mbti.entp.name': '辩论家',
    'mbti.entp.desc': '创造性思考和新挑战',
    'mbti.entp.trait1': '创造性',
    'mbti.entp.trait2': '创新性',
    'mbti.entp.trait3': '活跃性',
    
    'mbti.infj.name': '提倡者',
    'mbti.infj.desc': '深度洞察和有意义的关系',
    'mbti.infj.trait1': '洞察力',
    'mbti.infj.trait2': '理想主义',
    'mbti.infj.trait3': '关怀心',
    
    'mbti.infp.name': '调停者',
    'mbti.infp.desc': '忠于价值观的自由灵魂',
    'mbti.infp.trait1': '价值导向',
    'mbti.infp.trait2': '自由精神',
    'mbti.infp.trait3': '创造性',
    
    'mbti.enfj.name': '主人公',
    'mbti.enfj.desc': '对他人的关怀和社会贡献',
    'mbti.enfj.trait1': '关怀心',
    'mbti.enfj.trait2': '社交性',
    'mbti.enfj.trait3': '启发力',
    
    'mbti.enfp.name': '竞选者',
    'mbti.enfp.desc': '热情和积极的能量',
    'mbti.enfp.trait1': '热情',
    'mbti.enfp.trait2': '创造性',
    'mbti.enfp.trait3': '社交性',
    
    'mbti.istj.name': '物流师',
    'mbti.istj.desc': '责任感和系统化生活',
    'mbti.istj.trait1': '责任感',
    'mbti.istj.trait2': '系统性',
    'mbti.istj.trait3': '可靠性',
    
    'mbti.isfj.name': '守护者',
    'mbti.isfj.desc': '献身和温暖关怀',
    'mbti.isfj.trait1': '献身精神',
    'mbti.isfj.trait2': '温暖',
    'mbti.isfj.trait3': '保护性',
    
    'mbti.estj.name': '总经理',
    'mbti.estj.desc': '效率和组织能力',
    'mbti.estj.trait1': '效率',
    'mbti.estj.trait2': '组织力',
    'mbti.estj.trait3': '实用性',
    
    'mbti.esfj.name': '领事',
    'mbti.esfj.desc': '温暖的社交性和关怀',
    'mbti.esfj.trait1': '关怀心',
    'mbti.esfj.trait2': '社交性',
    'mbti.esfj.trait3': '合作性',
    
    'mbti.istp.name': '鉴赏家',
    'mbti.istp.desc': '实用和逻辑的方法',
    'mbti.istp.trait1': '实用性',
    'mbti.istp.trait2': '逻辑性',
    'mbti.istp.trait3': '灵活性',
    
    'mbti.isfp.name': '探险家',
    'mbti.isfp.desc': '艺术感觉和自由灵魂',
    'mbti.isfp.trait1': '艺术性',
    'mbti.isfp.trait2': '自由精神',
    'mbti.isfp.trait3': '温和',
    
    'mbti.estp.name': '企业家',
    'mbti.estp.desc': '享受现在和活跃生活',
    'mbti.estp.trait1': '活跃性',
    'mbti.estp.trait2': '现实性',
    'mbti.estp.trait3': '社交性',
    
    'mbti.esfp.name': '娱乐家',
    'mbti.esfp.desc': '享受乐趣和社交活动',
    'mbti.esfp.trait1': '乐趣',
    'mbti.esfp.trait2': '社交性',
    'mbti.esfp.trait3': '活跃性',
    
    // MBTI Categories
    'mbti.analyst.title': '💼 分析家组 (NT)',
    'mbti.diplomat.title': '🌈 外交家组 (NF)',
    'mbti.sentinel.title': '🛡️ 守护者组 (SJ)',
    'mbti.explorer.title': '🎭 探险家组 (SP)',
    
    // 샘플 질문 섹션
    'landing.questions.title': '测试预览',
    'landing.questions.example': '示例问题',
    'landing.questions.sample': '在与新朋友的聚会上，您更倾向于：',
    'landing.questions.choice1': '主动接近并开始对话',
    'landing.questions.choice2': '等待别人先开口交谈',
    
    // SEO Content
    'seo.content.title': '银发族MBTI性格类型测试完整指南',
    'seo.content.block1.title': '💎 什么是银发族MBTI？',
    'seo.content.block1.text': '银发族MBTI是专门为反映60岁以上中老年人独特的人生经历和价值观而开发的性格类型测试。与一般MBTI不同，它考虑退休后生活、健康管理、家庭关系、社会角色变化等银发族面临的特殊情况，提供心理分析。',
    'seo.content.block2.title': '🎯 退休后人生规划的新起点',
    'seo.content.block2.text': '退休不是人生的终点，而是新的开始。通过银发族MBTI准确把握自己的性格类型，发现能让黄金年华更加充实的活动、爱好、人际关系。为中老年人提供个性化生活方式指南。',
    'seo.content.block3.title': '💕 银发族相性分析的科学根据',
    'seo.content.block3.text': '基于60多年人生经验的性格分析更加准确和深入。银发族MBTI帮助找到与您最匹配的伴侣、朋友、活动伙伴。基于科学验证的心理学理论，提供可信赖的相性分析。',
    
    // FAQ
    'faq.title': '常见问题 (FAQ)',
    'faq.q1': 'Q: 银发族MBTI测试真的免费吗？',
    'faq.a1': 'A: 是的，完全免费。无需注册或付费即可立即进行测试，结果分析和相性信息也全部免费提供。',
    'faq.q2': 'Q: 一般MBTI和银发族MBTI有什么区别？',
    'faq.a2': 'A: 银发族MBTI考虑60岁以上中老年人的特殊人生阶段。提供反映退休、健康管理、家庭关系变化等银发族特有情况的问题和解释。',
    'faq.q3': 'Q: 测试需要多长时间？',
    'faq.a3': 'A: 大约需要5分钟。由24个简单问题组成，您可以轻松完成。',
    'faq.q4': 'Q: 结果有多准确？',
    'faq.a4': 'A: 这是由心理学专家和银发族生活专家共同开发的验证测试。通过数千名银发族测试者确认了可靠性。',
    
    // Internal Links
    'internal.title': '🔍 探索16种MBTI性格类型',
    'internal.subtitle': '和我性格相似的银发族有什么特征？',
    'internal.related.title': '银发族生活相关信息',
    'internal.related.compatibility': 'MBTI相性分析指南',
    'internal.related.lifestyle': '银发族生活方式建议',
    'internal.related.retirement': '退休后人生规划',
    
    // Final CTA
    'final.title': '立即开始！我的银发族MBTI之旅',
    'final.description': '免费获得让60岁以上黄金年华更加充实的性格分析',
    'final.cta': '开始免费银发族MBTI测试',
    'final.starting': '测试开始中...',
    'final.guarantee1': '完全免费',
    'final.guarantee2': '2分钟完成',
    'final.guarantee3': '即时结果',
    'final.guarantee4': '个人信息保护',
  },
  
  ja: {
    // 공통
    'site.title': 'シニアMBTI',
    'site.subtitle': 'あなただけの特別な性格タイプを見つけましょう',
    
    // 랜딩페이지
    'landing.title': 'シニアMBTI',
    'landing.tagline': '人生の経験が作ったあなただけの特別な性格',
    'landing.welcome': 'ようこそ！',
    'landing.description': '豊富な人生経験を積まれたあなたのための特別な性格タイプテストです。\n24の簡単な質問を通じて、あなただけの独特な性格と知恵を発見してください。',
    'landing.start': '✨ テスト開始',
    'landing.starting': '開始中...',
    'landing.closing': '今すぐあなただけの性格タイプを発見してください！',
    
    // Meta information
    'meta.title': 'シニアMBTI - 性格タイプテスト',
    'meta.seo.title': 'シニアMBTI | 中高年性格タイプテスト | 退職後人生設計ガイド',
    
    // Trust indicators
    'trust.anonymous': '100% 匿名',
    'trust.expert': '専門家制作',
    'trust.quick': '2分で完了',
    
    // Hero section
    'hero.badge': '✨ 60歳以上シニア専用性格分析',
    'hero.title': 'シニアMBTI性格タイプテスト',
    'hero.tagline': '退職後の新しい人生と理想的な人間関係のための専門心理分析',
    'hero.description': '60歳以上の中高年層のために特別に設計されたMBTI性格タイプテストで、あなたの性向と最も合う人生のパートナーを見つけてください。無料心理テストを通じて黄金期人生の新たな可能性を発見してください。',
    'hero.seo.hook.main': '🔍 私のMBTIを確認し、相性の良いMBTIを見つけてください！',
    'hero.seo.hook.sub': 'これからの人生で縁を結び、一緒に歩んでいく性格の合う人を把握できます！シニアライフスタイルに最適化されたオーダーメイド相性分析を提供します。',
    
    // Features 섹션
    'landing.time.title': '迅速完了',
    'landing.time.desc': 'たった2分で完了する簡単で正確な性格タイプテスト',
    'landing.method.title': '科学的方法',
    'landing.method.desc': '心理学専門家が開発した検証済み性格分析方法論',
    'landing.types.title': '16タイプ',
    'landing.types.desc': 'あなたの独特な性格を16の詳細なタイプで分析',
    'landing.privacy.title': '完全匿名',
    'landing.privacy.desc': '個人情報収集なしで安全に進行される匿名テスト',
    
    'features.section.title': 'シニアMBTIが中高年層に特別な理由',
    'features.section.subtitle': '60歳以上退職後人生のための専門的な性格分析とライフスタイルガイド',
    
    // SEO Benefits
    'seo.benefits.title': 'シニア向けMBTIテストの特別な利点',
    'seo.benefits.item1.highlight': '中高年心理専門家',
    'seo.benefits.item1.text': 'が設計したシニア特化質問',
    'seo.benefits.item2.highlight': '退職後人生設計',
    'seo.benefits.item2.text': 'のためのオーダーメイドアドバイス提供',
    'seo.benefits.item3.highlight': '60歳以上人間関係',
    'seo.benefits.item3.text': ' 改善のための相性分析',
    'seo.benefits.item4.highlight': '黄金期ライフスタイル',
    'seo.benefits.item4.text': 'に最適化された性格解釈',
    'seo.benefits.item5.highlight': 'シニア健康管理',
    'seo.benefits.item5.text': 'と連携した生活ガイド',
    
    // MBTI Compatibility Showcase
    'compatibility.showcase.title': '💕 MBTI相性分析プレビュー',
    'compatibility.showcase.subtitle': 'あなたと最高の相性のMBTIと相性の悪いMBTIを事前に確認してください',
    
    'compatibility.best.title': '💖 最高の相性例',
    'compatibility.best.example': 'INTJ × ENFP 組み合わせ',
    'compatibility.best.reason': '体系的なINTJと創造的なENFPはお互いの長所を補完し、深い理解に基づいた関係を形成します。',
    
    'compatibility.challenging.title': '💛 理解が必要な例',
    'compatibility.challenging.example': 'INTJ × ESFJ 組み合わせ',
    'compatibility.challenging.reason': '異なるアプローチを持ちますが、相互理解と配慮を通じてバランスの取れた関係を築くことができます。',
    
    'compatibility.perfect': '完璧な調和',
    'compatibility.effort': '努力が必要',
    'compatibility.cta': '私のMBTIとの相性確認',
    
    // MBTI Types
    'mbti.intj.name': '建築家',
    'mbti.intj.desc': '体系的思考と独立した生活',
    'mbti.intj.trait1': '体系的',
    'mbti.intj.trait2': '独立的',
    'mbti.intj.trait3': '戦略的',
    
    'mbti.intp.name': '思想家',
    'mbti.intp.desc': '分析的思考と知的好奇心',
    'mbti.intp.trait1': '分析的',
    'mbti.intp.trait2': '好奇心',
    'mbti.intp.trait3': '論理的',
    
    'mbti.entj.name': '指揮官',
    'mbti.entj.desc': 'リーダーシップと挑戦精神',
    'mbti.entj.trait1': 'リーダーシップ',
    'mbti.entj.trait2': '挑戦的',
    'mbti.entj.trait3': '推進力',
    
    'mbti.entp.name': '討論者',
    'mbti.entp.desc': '創造的思考と新しい挑戦',
    'mbti.entp.trait1': '創造的',
    'mbti.entp.trait2': '革新的',
    'mbti.entp.trait3': '活発',
    
    'mbti.infj.name': '提唱者',
    'mbti.infj.desc': '深い洞察力と意味のある関係',
    'mbti.infj.trait1': '洞察力',
    'mbti.infj.trait2': '理想主義',
    'mbti.infj.trait3': '思いやり',
    
    'mbti.infp.name': '仲裁者',
    'mbti.infp.desc': '価値観に忠実で自由な魂',
    'mbti.infp.trait1': '価値中心',
    'mbti.infp.trait2': '自由な精神',
    'mbti.infp.trait3': '創造性',
    
    'mbti.enfj.name': '主人公',
    'mbti.enfj.desc': '他人への配慮と社会貢献',
    'mbti.enfj.trait1': '思いやり',
    'mbti.enfj.trait2': '社交的',
    'mbti.enfj.trait3': '感化力',
    
    'mbti.enfp.name': '活動家',
    'mbti.enfp.desc': '情熱的で前向きなエネルギー',
    'mbti.enfp.trait1': '情熱的',
    'mbti.enfp.trait2': '創造的',
    'mbti.enfp.trait3': '社交的',
    
    'mbti.istj.name': '管理者',
    'mbti.istj.desc': '責任感と体系的な生活',
    'mbti.istj.trait1': '責任感',
    'mbti.istj.trait2': '体系的',
    'mbti.istj.trait3': '信頼性',
    
    'mbti.isfj.name': '擁護者',
    'mbti.isfj.desc': '献身的で温かいケア',
    'mbti.isfj.trait1': '献身的',
    'mbti.isfj.trait2': '温かさ',
    'mbti.isfj.trait3': '保護的',
    
    'mbti.estj.name': '幹部',
    'mbti.estj.desc': '効率性と組織力の発揮',
    'mbti.estj.trait1': '効率性',
    'mbti.estj.trait2': '組織力',
    'mbti.estj.trait3': '実用性',
    
    'mbti.esfj.name': '領事',
    'mbti.esfj.desc': '温かい社交性とケア',
    'mbti.esfj.trait1': '思いやり',
    'mbti.esfj.trait2': '社交的',
    'mbti.esfj.trait3': '協力的',
    
    'mbti.istp.name': '巨匠',
    'mbti.istp.desc': '実用的で論理的なアプローチ',
    'mbti.istp.trait1': '実用的',
    'mbti.istp.trait2': '論理的',
    'mbti.istp.trait3': '柔軟性',
    
    'mbti.isfp.name': '冒険家',
    'mbti.isfp.desc': '芸術的感覚と自由な魂',
    'mbti.isfp.trait1': '芸術的',
    'mbti.isfp.trait2': '自由な精神',
    'mbti.isfp.trait3': '穏やか',
    
    'mbti.estp.name': '起業家',
    'mbti.estp.desc': '現在を楽しみ活動的な人生',
    'mbti.estp.trait1': '活動的',
    'mbti.estp.trait2': '現実的',
    'mbti.estp.trait3': '社交的',
    
    'mbti.esfp.name': 'エンターテイナー',
    'mbti.esfp.desc': '楽しさと社交活動を楽しむ',
    'mbti.esfp.trait1': '楽しさ',
    'mbti.esfp.trait2': '社交的',
    'mbti.esfp.trait3': '活発',
    
    // MBTI Categories
    'mbti.analyst.title': '💼 分析家グループ (NT)',
    'mbti.diplomat.title': '🌈 外交官グループ (NF)',
    'mbti.sentinel.title': '🛡️ 番人グループ (SJ)',
    'mbti.explorer.title': '🎭 探検家グループ (SP)',
    
    // 샘플 질문 섹션
    'landing.questions.title': 'テストプレビュー',
    'landing.questions.example': '例題',
    'landing.questions.sample': '新しい人たちとの集まりで、あなたはどちらのタイプですか？',
    'landing.questions.choice1': '先に近づいて会話を始める方です',
    'landing.questions.choice2': '誰かが先に話しかけてくるまで待つ方です',
    
    // SEO Content
    'seo.content.title': 'シニアMBTI性格タイプテスト完全ガイド',
    'seo.content.block1.title': '💎 シニアMBTIとは何ですか？',
    'seo.content.block1.text': 'シニアMBTIは60歳以上の中高年層の独特な人生経験と価値観を反映して特別に開発された性格タイプテストです。一般的なMBTIとは異なり、退職後の人生、健康管理、家族関係、社会的役割の変化などシニアが直面する特別な状況を考慮した心理分析を提供します。',
    'seo.content.block2.title': '🎯 退職後人生設計の新しい出発点',
    'seo.content.block2.text': '退職は人生の終わりではなく新しい始まりです。シニアMBTIを通じて自分の性格タイプを正確に把握し、黄金期人生をより豊かにできる活動、趣味、人間関係を発見してください。中高年層のためのオーダーメイドライフスタイルガイドを提供します。',
    'seo.content.block3.title': '💕 シニア相性分析の科学的根拠',
    'seo.content.block3.text': '60年以上の人生経験に基づく性格分析はより正確で深いものです。シニアMBTIはあなたと最も合うパートナー、友人、活動パートナーを見つけるのに役立ちます。科学的に検証された心理学理論に基づいて信頼できる相性分析を提供します。',
    
    // FAQ
    'faq.title': 'よくある質問 (FAQ)',
    'faq.q1': 'Q: シニアMBTIテストは本当に無料ですか？',
    'faq.a1': 'A: はい、完全に無料です。会員登録や支払いなしですぐにテストを受けることができ、結果分析と相性情報もすべて無料で提供されます。',
    'faq.q2': 'Q: 一般的なMBTIとシニアMBTIの違いは何ですか？',
    'faq.a2': 'A: シニアMBTIは60歳以上中高年層の特別な人生段階を考慮します。退職、健康管理、家族関係の変化などシニアだけの状況を反映した質問と解釈を提供します。',
    'faq.q3': 'Q: テスト時間はどのくらいかかりますか？',
    'faq.a3': 'A: 約5分程度かかります。24の簡単な質問で構成されており、負担なく完了できます。',
    'faq.q4': 'Q: 結果はどの程度正確ですか？',
    'faq.a4': 'A: 心理学専門家とシニアライフ専門家が共同開発した検証済みテストです。数千名のシニアテスターを通じて信頼性を確認しました。',
    
    // Internal Links
    'internal.title': '🔍 16のMBTI性格タイプを探索',
    'internal.subtitle': '私と似た性格のシニアはどんな特徴を持っているのでしょうか？',
    'internal.related.title': 'シニアライフ関連情報',
    'internal.related.compatibility': 'MBTI相性分析ガイド',
    'internal.related.lifestyle': 'シニアライフスタイルのヒント',
    'internal.related.retirement': '退職後人生設計',
    
    // Final CTA
    'final.title': '今すぐ始めましょう！私だけのシニアMBTI旅路',
    'final.description': '60歳以上の黄金期人生をより豊かにしてくれる性格分析を無料で受けてください',
    'final.cta': '無料シニアMBTIテスト開始',
    'final.starting': 'テスト開始中...',
    'final.guarantee1': '完全無料',
    'final.guarantee2': '2分完了',
    'final.guarantee3': '即座に結果',
    'final.guarantee4': '個人情報保護',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ko');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 브라우저에서 저장된 언어 설정 로드
    const savedLanguage = localStorage.getItem('mbti-language') || 'ko';
    setLanguage(savedLanguage);
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('mbti-language', newLanguage);
  };

  const t = (key) => {
    if (!mounted) return '';
    return translations[language]?.[key] || translations['ko'][key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    mounted
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}