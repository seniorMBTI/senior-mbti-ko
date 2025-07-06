'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

// MBTI 유형별 상성 정보를 모듈 레벨로 이동
const mbtiCompatibility = {
  'INTJ': {
    bestMatch: ['ENFP', 'ENTP', 'INFJ'],
    goodMatch: ['INTJ', 'INFP', 'ENTJ'],
    challengingMatch: ['ESFJ', 'ISFJ', 'ESTJ']
  },
  'INTP': {
    bestMatch: ['ENFJ', 'ENTJ', 'INFJ'],
    goodMatch: ['INTP', 'ENTP', 'INTJ'],
    challengingMatch: ['ESFJ', 'ISFJ', 'ESTJ']
  },
  'ENTJ': {
    bestMatch: ['INFP', 'INTP', 'ENFP'],
    goodMatch: ['ENTJ', 'INTJ', 'ENTP'],
    challengingMatch: ['ISFP', 'INFP', 'ESFP']
  },
  'ENTP': {
    bestMatch: ['INFJ', 'INTJ', 'ENFJ'],
    goodMatch: ['ENTP', 'ENFP', 'ENTJ'],
    challengingMatch: ['ISTJ', 'ISFJ', 'ESTJ']
  },
  'INFJ': {
    bestMatch: ['ENTP', 'ENFP', 'INTJ'],
    goodMatch: ['INFJ', 'INFP', 'ENFJ'],
    challengingMatch: ['ESTP', 'ESFP', 'ISTP']
  },
  'INFP': {
    bestMatch: ['ENFJ', 'ENTJ', 'ENFP'],
    goodMatch: ['INFP', 'INFJ', 'ISFP'],
    challengingMatch: ['ESTJ', 'ENTJ', 'ESTP']
  },
  'ENFJ': {
    bestMatch: ['INFP', 'ISFP', 'INTP'],
    goodMatch: ['ENFJ', 'ENFP', 'INFJ'],
    challengingMatch: ['ISTP', 'ESTP', 'ISTJ']
  },
  'ENFP': {
    bestMatch: ['INTJ', 'INFJ', 'ENFJ'],
    goodMatch: ['ENFP', 'ENTP', 'INFP'],
    challengingMatch: ['ISTJ', 'ESTJ', 'ISTP']
  },
  'ISTJ': {
    bestMatch: ['ESFP', 'ESTP', 'ISFP'],
    goodMatch: ['ISTJ', 'ISFJ', 'ESTJ'],
    challengingMatch: ['ENFP', 'ENTP', 'INFP']
  },
  'ISFJ': {
    bestMatch: ['ESFP', 'ESTP', 'ENFP'],
    goodMatch: ['ISFJ', 'ISTJ', 'ESFJ'],
    challengingMatch: ['ENTP', 'ENTJ', 'INTP']
  },
  'ESTJ': {
    bestMatch: ['ISFP', 'INFP', 'ISTP'],
    goodMatch: ['ESTJ', 'ISTJ', 'ESFJ'],
    challengingMatch: ['INFP', 'ENFP', 'INTP']
  },
  'ESFJ': {
    bestMatch: ['ISFP', 'INFP', 'ISTP'],
    goodMatch: ['ESFJ', 'ISFJ', 'ESTJ'],
    challengingMatch: ['INTP', 'INTJ', 'ENTP']
  },
  'ISTP': {
    bestMatch: ['ESFJ', 'ESTJ', 'ENFJ'],
    goodMatch: ['ISTP', 'ESTP', 'ISFP'],
    challengingMatch: ['ENFJ', 'INFJ', 'ENFP']
  },
  'ISFP': {
    bestMatch: ['ENFJ', 'ESFJ', 'ESTJ'],
    goodMatch: ['ISFP', 'INFP', 'ESFP'],
    challengingMatch: ['ENTJ', 'ESTJ', 'ENTP']
  },
  'ESTP': {
    bestMatch: ['ISFJ', 'ISTJ', 'INFJ'],
    goodMatch: ['ESTP', 'ESFP', 'ISTP'],
    challengingMatch: ['INFJ', 'INTJ', 'INFP']
  },
  'ESFP': {
    bestMatch: ['ISFJ', 'ISTJ', 'INFJ'],
    goodMatch: ['ESFP', 'ENFP', 'ISFP'],
    challengingMatch: ['INTJ', 'INTP', 'ENTJ']
  }
};

// 완전한 16개 MBTI 유형 데이터
const mbtiTypes = {
  'INTJ': {
    type: 'INTJ',
    title: '시니어 전략적 설계자',
    subtitle: '미래를 내다보는 지혜로운 전략가',
    description: '오랜 경험으로 쌓인 지혜를 바탕으로 체계적이고 논리적인 사고를 하시며, 미래를 내다보는 통찰력을 가지고 계십니다.',
    strengths: ['뛰어난 전략적 사고', '독립적 판단력', '체계적 계획 수립', '깊이 있는 통찰력', '목표 지향적 실행력'],
    challenges: ['완벽주의 성향', '감정 표현의 어려움', '비판적 시각', '변화에 대한 저항'],
    careers: ['컨설턴트', '연구원', '기획자', '작가', '투자 전문가'],
    relationships: '신뢰할 수 있는 소수의 깊은 관계를 선호하며, 지적 교감을 중요하게 생각합니다.',
    emoji: '🔮',
    color: '#6366f1',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    seniorTips: ['정기적인 지적 활동으로 뇌 건강을 유지하세요', '계획적인 자산 관리와 투자로 안정적인 노후를 준비하세요', '신뢰할 수 있는 전문가와의 네트워크를 구축하세요'],
    healthTips: ['규칙적인 독서로 인지 기능을 유지하세요', '스트레스 관리를 위한 명상이나 요가를 실천하세요', '정기적인 건강검진으로 예방 중심의 건강관리를 하세요']
  },
  'INTP': {
    type: 'INTP', 
    title: '시니어 사색하는 학자',
    subtitle: '호기심 많은 지식 탐구자',
    description: '평생에 걸친 학습과 탐구를 통해 깊이 있는 지식을 쌓아오셨으며, 새로운 아이디어를 탐구하는 것을 즐기십니다.',
    strengths: ['뛰어난 분석력', '창의적 사고', '논리적 추론', '지적 호기심', '객관적 판단'],
    challenges: ['현실적 적용의 어려움', '감정적 소통 부족', '우유부단함', '세부사항 놓침'],
    careers: ['연구원', '교수', '분석가', '철학자', '발명가'],
    relationships: '지적 대화를 나눌 수 있는 상대를 선호하며, 개인 공간을 중요하게 생각합니다.',
    emoji: '🤔',
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    seniorTips: ['새로운 분야의 학습으로 지적 호기심을 계속 충족시키세요', '온라인 강의나 세미나에 참여하여 최신 지식을 습득하세요', '연구나 분석 능력을 활용한 자원봉사를 고려해보세요'],
    healthTips: ['뇌 운동을 위한 퍼즐이나 체스 등을 즐겨보세요', '혼자만의 시간을 충분히 가져 정신적 에너지를 충전하세요', '관심 분야의 연구로 성취감을 느끼며 우울감을 예방하세요']
  },
  'ENTJ': {
    type: 'ENTJ',
    title: '시니어 지도자',
    subtitle: '경험이 풍부한 리더십의 귀감',
    description: '오랜 경험을 통해 쌓인 리더십으로 주변 사람들을 이끌어가며, 명확한 목표 달성을 위해 체계적으로 행동하십니다.',
    strengths: ['강력한 리더십', '전략적 사고', '결단력', '조직 운영 능력', '효율적 실행력'],
    challenges: ['완고함', '감정 고려 부족', '권위적 성향', '세부사항 간과'],
    careers: ['경영진', '프로젝트 관리자', '강사', '상담사', '단체 리더'],
    relationships: '목표 지향적이며 서로 성장할 수 있는 관계를 추구하고, 솔직한 의사소통을 선호합니다.',
    emoji: '👑',
    color: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    seniorTips: ['경험을 살려 후배들을 멘토링하는 역할을 찾아보세요', '지역사회 단체나 봉사활동에서 리더십을 발휘하세요', '평생 축적한 지식과 경험을 책이나 강연으로 공유하세요'],
    healthTips: ['규칙적인 운동으로 체력과 에너지를 유지하세요', '스트레스 해소를 위한 적절한 휴식과 취미활동을 하세요', '정기적인 사회활동으로 정신적 활력을 유지하세요']
  },
  'ENTP': {
    type: 'ENTP',
    title: '시니어 혁신가',
    subtitle: '창의적 아이디어의 원천',
    description: '풍부한 경험을 바탕으로 새로운 아이디어를 끊임없이 창출하며, 변화와 혁신을 통해 활력을 얻으십니다.',
    strengths: ['창의적 발상', '적응력', '설득력', '도전 정신', '폭넓은 관심사'],
    challenges: ['집중력 부족', '일관성 결여', '세부사항 소홀', '현실성 부족'],
    careers: ['창업가', '발명가', '강연자', '기획자', '문화예술 활동가'],
    relationships: '지적 자극을 주는 다양한 사람들과의 교류를 즐기며, 새로운 아이디어를 공유하는 것을 좋아합니다.',
    emoji: '💡',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    seniorTips: ['새로운 기술이나 트렌드를 학습하여 시대 변화에 적응하세요', '창의적인 프로젝트나 창업 아이템을 개발해보세요', '다양한 세대와의 교류를 통해 새로운 관점을 얻으세요'],
    healthTips: ['변화하는 환경에 유연하게 적응하며 스트레스를 관리하세요', '새로운 활동이나 여행으로 자극을 받고 활력을 유지하세요', '창의적 활동으로 뇌의 활성화를 도모하세요']
  },
  'INFJ': {
    type: 'INFJ',
    title: '시니어 현자',
    subtitle: '깊은 통찰력을 가진 조언자',
    description: '평생의 경험으로 쌓인 깊은 통찰력으로 타인을 이해하고 돕는데 헌신하며, 의미 있는 가치를 추구하십니다.',
    strengths: ['깊은 통찰력', '공감 능력', '이상주의', '헌신적 태도', '창의적 사고'],
    challenges: ['과도한 완벽주의', '번아웃 위험', '갈등 회피', '현실성 부족'],
    careers: ['상담사', '교육자', '작가', '사회봉사자', '예술가'],
    relationships: '진정성 있는 깊은 관계를 추구하며, 상대방의 성장과 행복을 진심으로 바랍니다.',
    emoji: '🌟',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    seniorTips: ['인생 경험을 바탕으로 한 상담이나 코칭 활동을 시작해보세요', '의미 있는 사회봉사나 자선활동에 참여하세요', '자서전이나 회고록 작성으로 인생의 의미를 정리해보세요'],
    healthTips: ['명상이나 영성 활동으로 내면의 평화를 찾으세요', '감정적 소진을 예방하기 위한 적절한 경계 설정을 하세요', '자연과 함께하는 시간으로 정신적 안정을 찾으세요']
  },
  'INFP': {
    type: 'INFP',
    title: '시니어 중재자',
    subtitle: '따뜻한 마음의 평화주의자',
    description: '평생에 걸친 인간에 대한 깊은 이해로 조화로운 환경을 만들어가며, 개인의 가치와 신념을 소중히 여기십니다.',
    strengths: ['높은 공감 능력', '창의성', '개인적 가치 추구', '적응력', '조화 추구'],
    challenges: ['지나친 이상주의', '갈등 회피', '우유부단함', '현실 도피'],
    careers: ['작가', '예술가', '상담사', '교육자', '사회복지사'],
    relationships: '진실하고 의미 있는 관계를 중시하며, 상대방의 개성과 가치를 존중합니다.',
    emoji: '🕊️',
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
    seniorTips: ['예술이나 창작 활동을 통해 자신만의 작품세계를 만들어보세요', '개인의 가치와 신념을 지키면서도 타인과 조화롭게 지내는 방법을 찾으세요', '조용한 환경에서 충분한 휴식과 성찰의 시간을 가지세요'],
    healthTips: ['스트레스에 민감하므로 평화로운 환경을 조성하세요', '감정을 표현할 수 있는 창작활동이나 일기쓰기를 해보세요', '갈등 상황을 피하고 안정적인 인간관계를 유지하세요']
  },
  'ENFJ': {
    type: 'ENFJ',
    title: '시니어 선생님',
    subtitle: '따뜻한 마음의 인생 멘토',
    description: '풍부한 인생 경험을 바탕으로 타인의 성장을 도우며, 공동체의 화합과 발전을 위해 헌신하십니다.',
    strengths: ['뛰어난 소통 능력', '타인에 대한 관심', '리더십', '공감 능력', '동기 부여'],
    challenges: ['자기 희생적 성향', '비판에 민감', '과도한 개입', '경계 설정 어려움'],
    careers: ['교육자', '상담사', '사회봉사자', '강사', '종교인'],
    relationships: '타인의 잠재력을 끌어내고 성장을 돕는 것을 기쁨으로 여기며, 따뜻하고 지지적인 관계를 만듭니다.',
    emoji: '🌻',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
    seniorTips: ['후배 양성이나 교육 프로그램 운영으로 경험을 전수하세요', '지역사회 발전을 위한 활동이나 위원회에 참여하세요', '소외된 이웃을 돕는 봉사활동으로 보람을 찾으세요'],
    healthTips: ['타인을 돕는 일에 과도하게 몰두하지 않도록 주의하세요', '자신만의 시간과 공간을 확보하여 재충전하세요', '정기적인 운동과 사회활동으로 에너지를 유지하세요']
  },
  'ENFP': {
    type: 'ENFP',
    title: '시니어 활동가',
    subtitle: '열정적인 삶의 응원자',
    description: '넘치는 열정과 긍정 에너지로 주변 사람들에게 영감을 주며, 새로운 가능성을 발견하고 실현하는데 탁월하십니다.',
    strengths: ['뛰어난 의사소통', '창의적 문제해결', '열정과 에너지', '타인 동기부여', '적응력'],
    challenges: ['집중력 부족', '일관성 결여', '과도한 낙관주의', '실무 처리 어려움'],
    careers: ['강연자', '문화기획자', '상담사', '교육자', '예술가'],
    relationships: '다양한 사람들과 에너지를 나누며 서로 영감을 주고받는 활기찬 관계를 선호합니다.',
    emoji: '🎪',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    seniorTips: ['다양한 사람들과의 만남과 교류를 통해 활력을 얻으세요', '새로운 취미나 활동을 시작하여 지속적인 자극을 받으세요', '긍정적인 에너지로 주변 사람들에게 영감을 주는 역할을 하세요'],
    healthTips: ['활발한 사회활동으로 외로움과 우울감을 예방하세요', '다양한 신체활동으로 에너지를 발산하고 건강을 유지하세요', '새로운 경험과 도전으로 뇌의 활성화를 도모하세요']
  },
  'ISTJ': {
    type: 'ISTJ',
    title: '시니어 수호자',
    subtitle: '신뢰할 수 있는 전통의 지킴이',
    description: '평생에 걸친 성실함과 책임감으로 주변 사람들의 든든한 버팀목이 되어주며, 안정적이고 체계적인 삶을 추구하십니다.',
    strengths: ['높은 책임감', '체계적 접근', '신뢰성', '꼼꼼함', '인내력'],
    challenges: ['변화에 대한 저항', '융통성 부족', '감정 표현 어려움', '새로운 아이디어 수용 어려움'],
    careers: ['관리자', '회계사', '공무원', '교육자', '전문 기술자'],
    relationships: '신뢰와 안정성을 바탕으로 한 장기적이고 깊은 관계를 중시하며, 약속을 지키는 것을 중요하게 생각합니다.',
    emoji: '🏛️',
    color: '#374151',
    bgGradient: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)',
    seniorTips: ['오랜 경험으로 축적된 전문 지식을 후배들에게 전수하세요', '안정적이고 체계적인 일상 루틴을 유지하세요', '전통적인 가치와 지혜를 보존하고 전달하는 역할을 하세요'],
    healthTips: ['규칙적인 생활 패턴으로 신체 리듬을 안정화하세요', '점진적인 변화를 통해 새로운 환경에 적응하세요', '정기적인 건강검진과 예방 중심의 건강관리를 하세요']
  },
  'ISFJ': {
    type: 'ISFJ',
    title: '시니어 보호자',
    subtitle: '따뜻한 마음의 돌봄이',
    description: '평생에 걸친 헌신과 봉사로 가족과 공동체를 돌보며, 타인의 필요를 먼저 생각하는 따뜻한 마음을 가지고 계십니다.',
    strengths: ['뛰어난 돌봄 능력', '세심한 배려', '책임감', '협력적 태도', '전통 중시'],
    challenges: ['자기 주장 부족', '과도한 자기희생', '변화 적응 어려움', '갈등 회피'],
    careers: ['간병인', '사회복지사', '교육자', '상담사', '종교인'],
    relationships: '상대방을 세심하게 배려하고 지원하는 것을 기쁨으로 여기며, 안정적이고 신뢰할 수 있는 관계를 추구합니다.',
    emoji: '🤱',
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    seniorTips: ['가족과 지역사회를 위한 돌봄 활동에서 보람을 찾으세요', '전통적인 요리나 수공예 기술을 젊은 세대에게 전수하세요', '조용하고 평화로운 환경에서 안정적인 일상을 유지하세요'],
    healthTips: ['과도한 희생을 피하고 자신의 건강도 챙기세요', '스트레스를 줄이기 위해 충분한 휴식을 취하세요', '가까운 사람들과의 정서적 유대감으로 마음의 안정을 찾으세요']
  },
  'ESTJ': {
    type: 'ESTJ',
    title: '시니어 관리자',
    subtitle: '경험 많은 조직의 기둥',
    description: '오랜 경험으로 쌓인 조직 운영 능력으로 효율적인 시스템을 만들고 관리하며, 실용적이고 현실적인 접근을 추구하십니다.',
    strengths: ['뛰어난 조직력', '실용적 사고', '리더십', '결단력', '책임감'],
    challenges: ['고집스러움', '감정 고려 부족', '변화 저항', '세부사항 집착'],
    careers: ['관리자', '사업가', '공무원', '교육 행정가', '단체 운영자'],
    relationships: '명확한 역할과 책임을 바탕으로 한 체계적인 관계를 선호하며, 상호 존중과 신뢰를 중시합니다.',
    emoji: '📊',
    color: '#b91c1c',
    bgGradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    seniorTips: ['조직 운영 경험을 살려 단체나 기관의 자문 역할을 하세요', '효율적인 시스템과 절차를 만드는 컨설팅 활동을 고려해보세요', '실용적인 문제 해결 능력으로 지역사회에 기여하세요'],
    healthTips: ['과도한 스트레스를 피하고 업무와 휴식의 균형을 맞추세요', '규칙적인 운동으로 체력과 정신력을 동시에 관리하세요', '완벽주의 성향을 조절하여 심리적 부담을 줄이세요']
  },
  'ESFJ': {
    type: 'ESFJ',
    title: '시니어 협력자',
    subtitle: '공동체의 따뜻한 구심점',
    description: '풍부한 인간관계 경험으로 공동체의 화합을 도모하며, 모든 사람이 편안하고 행복할 수 있도록 세심하게 배려하십니다.',
    strengths: ['뛰어난 대인관계', '협력적 태도', '책임감', '실용적 도움', '조화 추구'],
    challenges: ['비판에 민감', '갈등 스트레스', '자기 주장 부족', '변화 적응 어려움'],
    careers: ['교육자', '상담사', '사회봉사자', '이벤트 기획자', '접객업'],
    relationships: '모든 사람이 포함되고 소중히 여겨지는 따뜻하고 조화로운 관계를 만들어가는 것을 중시합니다.',
    emoji: '🤗',
    color: '#d97706',
    bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    seniorTips: ['사람들을 모으고 화합시키는 능력으로 모임이나 행사를 기획해보세요', '세대 간의 소통을 돕는 가교 역할을 해보세요', '따뜻한 인간관계를 바탕으로 한 네트워크를 유지하세요'],
    healthTips: ['과도한 스트레스를 받지 않도록 적절한 경계를 설정하세요', '긍정적인 사회활동으로 정신적 만족감을 얻으세요', '갈등 상황에서 벗어나 평화로운 환경을 추구하세요']
  },
  'ISTP': {
    type: 'ISTP',
    title: '시니어 장인',
    subtitle: '실용적 지혜의 소유자',
    description: '평생에 걸친 실무 경험으로 실용적인 문제 해결 능력을 갖추었으며, 손으로 직접 만들고 고치는 것을 즐기십니다.',
    strengths: ['뛰어난 문제해결력', '실용적 사고', '손재주', '독립성', '침착함'],
    challenges: ['감정 표현 어려움', '장기 계획 부족', '팀워크 어려움', '루틴 업무 지루함'],
    careers: ['기술자', '수리 전문가', '공예가', '농업인', '기계 조작원'],
    relationships: '실질적인 도움을 통해 관심을 표현하며, 상대방의 독립성을 존중하는 편안한 관계를 선호합니다.',
    emoji: '🔧',
    color: '#7c2d12',
    bgGradient: 'linear-gradient(135deg, #a3a3a3 0%, #525252 100%)',
    seniorTips: ['손재주를 활용한 공예나 수리 활동으로 성취감을 얻으세요', '실용적인 기술이나 노하우를 젊은 세대에게 전수하세요', '독립적이고 자유로운 라이프스타일을 유지하세요'],
    healthTips: ['혼자만의 시간을 충분히 가져 정신적 에너지를 재충전하세요', '손을 사용하는 활동으로 뇌의 활성화를 도모하세요', '규칙적인 신체활동으로 건강을 유지하되 과도하지 않게 하세요']
  },
  'ISFP': {
    type: 'ISFP',
    title: '시니어 예술가',
    subtitle: '조용한 아름다움의 창조자',
    description: '평생에 걸친 미적 감각과 섬세한 감성으로 아름다움을 창조하며, 개인의 가치와 조화로운 삶을 추구하십니다.',
    strengths: ['예술적 감각', '공감 능력', '유연성', '개인적 가치 추구', '세심한 관찰력'],
    challenges: ['자기 주장 부족', '갈등 회피', '현실적 문제 해결 어려움', '스트레스에 민감'],
    careers: ['예술가', '디자이너', '음악가', '작가', '치료사'],
    relationships: '진실하고 깊은 감정적 연결을 중시하며, 상대방의 개성과 감정을 세심하게 배려합니다.',
    emoji: '🎨',
    color: '#7c3aed',
    bgGradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
    seniorTips: ['예술 창작 활동이나 문화 활동을 통해 아름다움을 추구하세요', '개인의 가치와 신념을 지키면서 타인을 존중하는 삶을 살아가세요', '조용하고 평화로운 환경에서 충분한 휴식을 취하세요'],
    healthTips: ['스트레스에 민감하므로 평온한 환경을 조성하세요', '창작활동이나 예술 감상으로 정서적 안정을 찾으세요', '자연과 가까운 곳에서 시간을 보내며 마음의 평화를 얻으세요']
  },
  'ESTP': {
    type: 'ESTP',
    title: '시니어 모험가',
    subtitle: '활동적인 인생의 즐김이',
    description: '풍부한 인생 경험을 바탕으로 현재 순간을 즐기며, 실용적이고 유연한 접근으로 문제를 해결하십니다.',
    strengths: ['뛰어난 적응력', '실용적 문제해결', '사교성', '현실 감각', '행동력'],
    challenges: ['계획성 부족', '충동적 행동', '장기적 관점 부족', '세부사항 놓침'],
    careers: ['영업직', '서비스업', '운동 코치', '이벤트 기획자', '응급 대응 요원'],
    relationships: '활동적이고 재미있는 경험을 함께 나누는 것을 즐기며, 자연스럽고 편안한 관계를 선호합니다.',
    emoji: '🏃',
    color: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
    seniorTips: ['활동적인 라이프스타일을 유지하며 새로운 경험을 즐기세요', '실용적인 문제 해결 능력으로 주변 사람들을 도와주세요', '현재 순간을 즐기며 긍정적인 마인드를 유지하세요'],
    healthTips: ['규칙적인 신체활동으로 체력과 활력을 유지하세요', '즉흥적인 결정보다는 건강을 고려한 신중한 선택을 하세요', '사회활동을 통해 외로움을 예방하고 활력을 얻으세요']
  },
  'ESFP': {
    type: 'ESFP',
    title: '시니어 연예인',
    subtitle: '따뜻한 마음의 분위기 메이커',
    description: '넘치는 에너지와 따뜻한 마음으로 주변 사람들에게 기쁨을 선사하며, 현재 순간을 소중히 여기고 즐기십니다.',
    strengths: ['뛰어난 사교성', '긍정적 에너지', '공감 능력', '유연성', '실용적 도움'],
    challenges: ['계획성 부족', '비판에 민감', '갈등 스트레스', '장기적 목표 설정 어려움'],
    careers: ['교육자', '상담사', '연예인', '이벤트 기획자', '서비스업'],
    relationships: '모든 사람이 행복하고 즐거워하는 것을 보는 것을 기쁨으로 여기며, 따뜻하고 활기찬 관계를 만듭니다.',
    emoji: '🌈',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #fde047 0%, #f59e0b 100%)',
    seniorTips: ['긍정적인 에너지로 주변 사람들에게 활력을 주는 역할을 하세요', '다양한 사람들과의 만남을 통해 지속적인 자극을 받으세요', '현재 순간을 즐기며 행복한 추억을 많이 만드세요'],
    healthTips: ['활발한 사회활동으로 우울감을 예방하세요', '다양한 취미활동으로 정신적 자극을 유지하세요', '과도한 스트레스를 피하고 즐거운 활동에 집중하세요']
  }
};

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const shareButtonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%' });

  // 클라이언트 마운트 상태 설정
  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트 완료 후 데이터 처리
  useEffect(() => {
    if (!mounted) return; // 클라이언트에서만 실행
    
    // URL 파라미터에서 직접 MBTI 타입 가져오기
    const mbtiType = params.type?.toUpperCase();
    console.log('URL MBTI Type:', mbtiType);
    
    if (mbtiType) {
      // 유효한 MBTI 타입인지 확인
      const validTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                         'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
      
      if (validTypes.includes(mbtiType)) {
        console.log('Valid MBTI Type, setting result data:', mbtiType);
        
        // localStorage에서 기존 결과 확인 (클라이언트에서만)
        let storedResult = null;
        try {
          if (typeof window !== 'undefined') {
            storedResult = localStorage.getItem(`mbti-result-${mbtiType}`);
            if (storedResult) {
              storedResult = JSON.parse(storedResult);
            }
          }
        } catch (error) {
          console.warn('Error reading localStorage:', error);
        }
        
        // MBTI 타입 파라미터로부터 결과 데이터 생성
        setResultData({
          mbtiType: mbtiType,
          timestamp: storedResult?.timestamp || Date.now(),
          isDirectLink: true,
          scores: storedResult?.scores || null,
          answers: storedResult?.answers || null
        });
      } else {
        console.log('Invalid MBTI Type, redirecting to home');
        // 유효하지 않은 MBTI 타입이면 홈으로 리디렉션
        router.push('/');
      }
    } else {
      console.log('No MBTI Type in URL, redirecting to home');
      router.push('/');
    }
  }, [mounted, params.type, router]);

  // MBTI 결과에 따른 동적 메타태그 업데이트
  useEffect(() => {
    if (resultData && mounted) {
      const mbtiType = resultData.mbtiType;
      const mbtiInfo = mbtiTypes[mbtiType];
      
      if (mbtiInfo) {
        // 페이지 제목 업데이트
        document.title = `${mbtiType} ${mbtiInfo.title} - 시니어 MBTI 결과`;
        
        // 오픈 그래프 메타태그 업데이트
        const updateMetaTag = (property, content) => {
          let meta = document.querySelector(`meta[property="${property}"]`);
          if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
          }
          meta.setAttribute('content', content);
        };

        const updateNameMetaTag = (name, content) => {
          let meta = document.querySelector(`meta[name="${name}"]`);
          if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
          }
          meta.setAttribute('content', content);
        };

        // MBTI 유형별 개별 이미지로 메타태그 업데이트 (프로덕션 도메인 사용)
        updateMetaTag('og:title', `${mbtiType} ${mbtiInfo.title} - 시니어 MBTI 결과`);
        updateMetaTag('og:description', `당신의 MBTI는 ${mbtiType} ${mbtiInfo.title}입니다. ${mbtiInfo.subtitle} ${mbtiInfo.description.substring(0, 100)}...`);
        updateMetaTag('og:image', `https://kr.seniormbti.com/${mbtiType}-kr.png`);
        updateMetaTag('og:url', window.location.href);
        updateMetaTag('og:type', 'website');
        
        updateNameMetaTag('description', `당신의 MBTI는 ${mbtiType} ${mbtiInfo.title}입니다. ${mbtiInfo.subtitle} ${mbtiInfo.description.substring(0, 100)}...`);
        updateNameMetaTag('twitter:title', `${mbtiType} ${mbtiInfo.title} - 시니어 MBTI 결과`);
        updateNameMetaTag('twitter:description', `당신의 MBTI는 ${mbtiType} ${mbtiInfo.title}입니다. ${mbtiInfo.subtitle}`);
        updateNameMetaTag('twitter:image', `https://kr.seniormbti.com/${mbtiType}-kr.png`);
        updateNameMetaTag('twitter:card', 'summary_large_image');
      }
    }
  }, [resultData, mounted]);


  const copyResultLink = () => {
    if (mounted && typeof window !== 'undefined' && resultData) {
      // 깔끔한 MBTI 타입 URL로 공유
      const shareUrl = `${window.location.origin}/result/${resultData.mbtiType.toLowerCase()}`;
      navigator.clipboard.writeText(shareUrl);
      setShowCopySuccess(true);
      setTimeout(() => {
        setShowCopySuccess(false);
        setShowShareDialog(false);
      }, 2000);
    }
  };

  const handleShareClick = () => {
    if (shareButtonRef.current) {
      const rect = shareButtonRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // 모바일에서도 버튼 중심으로 표시하되, 화면 경계 고려
      let top = rect.top + scrollTop + rect.height / 2;
      let left = rect.left + scrollLeft + rect.width / 2;
      
      // 모바일 화면에서 경계를 벗어나지 않도록 조정
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        const modalWidth = Math.min(400, window.innerWidth - 40);
        const modalHeight = 200; // 대략적인 모달 높이
        
        // 좌우 경계 체크
        if (left - modalWidth / 2 < 20) {
          left = modalWidth / 2 + 20;
        } else if (left + modalWidth / 2 > window.innerWidth - 20) {
          left = window.innerWidth - modalWidth / 2 - 20;
        }
        
        // 상하 경계 체크
        if (top - modalHeight / 2 < 20) {
          top = modalHeight / 2 + 20;
        } else if (top + modalHeight / 2 > window.innerHeight + scrollTop - 20) {
          top = window.innerHeight + scrollTop - modalHeight / 2 - 20;
        }
      }
      
      setModalPosition({ top, left });
    }
    setShowShareDialog(true);
  };

  if (!mounted || !resultData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>결과를 불러오는 중...</p>
        
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const typeInfo = mbtiTypes[resultData?.mbtiType] || mbtiTypes['INTJ'];

  return (
    <div className="result-container">
      {/* 히어로 섹션 */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="type-badge">
            <span className="type-emoji">{typeInfo.emoji}</span>
            <div className="type-info">
              <h1 className="type-title">{typeInfo.type}</h1>
              <p className="type-subtitle">{typeInfo.title}</p>
            </div>
          </div>
          
          <h2 className="hero-title">{typeInfo.subtitle}</h2>
          <p className="hero-description">{typeInfo.description}</p>
          
          <div className="action-buttons">
            <button 
              ref={shareButtonRef}
              className="share-button"
              onClick={handleShareClick}
            >
              <span>🔗</span> 결과 공유하기
            </button>
            <button 
              className="home-button"
              onClick={() => router.push('/')}
            >
              <span>🏠</span> 다시 테스트
            </button>
          </div>
        </div>
      </div>

      {/* 상세 분석 섹션 */}
      <div className="analysis-section">
        <div className="analysis-grid">
          {/* 강점 카드 */}
          <div className="analysis-card strengths-card">
            <div className="card-header">
              <h3>💪 주요 강점</h3>
            </div>
            <div className="card-content">
              {typeInfo.strengths.map((strength, index) => (
                <div key={index} className="strength-item">
                  <span className="bullet">✨</span>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 도전과제 카드 */}
          <div className="analysis-card challenges-card">
            <div className="card-header">
              <h3>🎯 성장 포인트</h3>
            </div>
            <div className="card-content">
              {typeInfo.challenges.map((challenge, index) => (
                <div key={index} className="challenge-item">
                  <span className="bullet">🔍</span>
                  <span>{challenge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 추천 활동 카드 */}
          <div className="analysis-card careers-card">
            <div className="card-header">
              <h3>🌟 추천 활동</h3>
            </div>
            <div className="card-content">
              {typeInfo.careers.map((career, index) => (
                <div key={index} className="career-item">
                  <span className="bullet">🎨</span>
                  <span>{career}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 관계 카드 */}
          <div className="analysis-card relationships-card">
            <div className="card-header">
              <h3>❤️ 인간관계</h3>
            </div>
            <div className="card-content">
              <p className="relationship-text">{typeInfo.relationships}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 상성 정보 섹션 */}
      <div className="compatibility-section">
        <div className="section-header">
          <h2 className="section-title">💕 나와 잘 맞는 MBTI 유형</h2>
          <p className="section-subtitle">시니어 시기에 더욱 소중한 인간관계, 어떤 성향의 분과 잘 맞으실까요?</p>
        </div>
        
        <div className="compatibility-grid">
          {/* 최고 궁합 */}
          <div className="compatibility-card best-match">
            <div className="card-header">
              <h3>💖 최고 궁합</h3>
              <p>깊이 있고 의미 있는 관계를 만들어갈 수 있는 유형</p>
            </div>
            <div className="card-content">
              {mbtiCompatibility[resultData.mbtiType]?.bestMatch.map((type, index) => (
                <div key={index} className="compatibility-item">
                  <span className="type-badge-small">{type}</span>
                  <span className="type-name">{mbtiTypes[type]?.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 좋은 궁합 */}
          <div className="compatibility-card good-match">
            <div className="card-header">
              <h3>😊 좋은 궁합</h3>
              <p>편안하고 안정적인 관계를 유지할 수 있는 유형</p>
            </div>
            <div className="card-content">
              {mbtiCompatibility[resultData.mbtiType]?.goodMatch.map((type, index) => (
                <div key={index} className="compatibility-item">
                  <span className="type-badge-small">{type}</span>
                  <span className="type-name">{mbtiTypes[type]?.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 최악 궁합 */}
          <div className="compatibility-card challenging-match">
            <div className="card-header">
              <h3>💔 최악 궁합</h3>
              <p>서로 다른 점을 이해하며 성장할 수 있는 유형</p>
            </div>
            <div className="card-content">
              {mbtiCompatibility[resultData.mbtiType]?.challengingMatch.map((type, index) => (
                <div key={index} className="compatibility-item">
                  <span className="type-badge-small">{type}</span>
                  <span className="type-name">{mbtiTypes[type]?.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 시니어 맞춤 조언 섹션 */}
      <div className="senior-advice-section">
        <div className="section-header">
          <h2 className="section-title">🎯 시니어 맞춤 생활 가이드</h2>
          <p className="section-subtitle">귀하의 성향에 맞는 시니어 라이프 조언을 제공합니다</p>
        </div>
        
        <div className="advice-grid">
          {/* 생활 조언 카드 */}
          <div className="advice-card lifestyle-card">
            <div className="card-header">
              <h3>🌟 라이프스타일 조언</h3>
            </div>
            <div className="card-content">
              {typeInfo.seniorTips?.map((tip, index) => (
                <div key={index} className="advice-item">
                  <span className="bullet">💡</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 건강 관리 카드 */}
          <div className="advice-card health-card">
            <div className="card-header">
              <h3>🏥 건강 관리 조언</h3>
            </div>
            <div className="card-content">
              {typeInfo.healthTips?.map((tip, index) => (
                <div key={index} className="advice-item">
                  <span className="bullet">🌿</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 공유 모달 */}
      {showShareDialog && (
        <div className="modal-overlay" onClick={() => setShowShareDialog(false)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`
            }}
          >
            <div className="modal-header">
              <h3>결과 공유하기</h3>
              <button 
                className="close-button"
                onClick={() => setShowShareDialog(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {showCopySuccess ? (
                <div className="success-message">
                  <span className="success-icon">✅</span>
                  <p>링크가 클립보드에 복사되었습니다!</p>
                </div>
              ) : (
                <button className="copy-button" onClick={copyResultLink}>
                  <span>📋</span> 링크 복사하기
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="result-footer">
        <div className="footer-content">
          <p className="footer-text">
            광고문의: <a href="mailto:seniorMBTI@gmail.com" className="footer-email">seniorMBTI@gmail.com</a>
          </p>
        </div>
      </footer>

      <style jsx>{`
        .result-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow-x: hidden;
        }

        .result-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 120, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-section {
          position: relative;
          z-index: 10;
          padding: 60px 20px 80px;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 30px;
          padding: 24px 40px;
          margin-bottom: 40px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .type-emoji {
          font-size: 48px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .type-info {
          text-align: left;
        }

        .type-title {
          font-size: 48px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          letter-spacing: -1px;
        }

        .type-subtitle {
          font-size: 18px;
          color: #6B7280;
          margin: 8px 0 0 0;
          font-weight: 600;
        }

        .hero-title {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 24px;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .hero-description {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 48px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .action-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .share-button, .home-button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          border: none;
          border-radius: 20px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .share-button {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .home-button {
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .share-button:hover, .home-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(102, 126, 234, 0.5);
        }

        .analysis-section {
          position: relative;
          z-index: 10;
          padding: 0 20px 80px;
        }

        .analysis-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .analysis-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transition: transform 0.3s ease;
        }

        .analysis-card:hover {
          transform: translateY(-8px);
        }

        .card-header {
          margin-bottom: 24px;
        }

        .card-header h3 {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .card-content {
          space-y: 16px;
        }

        .strength-item, .challenge-item, .career-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 16px;
          line-height: 1.6;
          color: #374151;
        }

        .bullet {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .relationship-text {
          font-size: 16px;
          line-height: 1.6;
          color: #374151;
          margin: 0;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1000;
        }

        .modal-content {
          position: absolute;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 32px;
          min-width: 400px;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);
          transform: translate(-50%, -50%);
          max-width: 90vw;
          max-height: 90vh;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 {
          font-size: 24px;
          font-weight: 800;
          color: #374151;
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          color: #6B7280;
          cursor: pointer;
          padding: 4px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s ease;
        }

        .close-button:hover {
          background: rgba(107, 114, 128, 0.1);
        }

        .copy-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .copy-button:hover {
          transform: translateY(-2px);
        }

        .success-message {
          text-align: center;
          padding: 20px;
        }

        .success-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 16px;
        }

        .success-message p {
          font-size: 18px;
          color: #10B981;
          font-weight: 600;
          margin: 0;
        }

        /* 상성 정보 섹션 스타일 */
        .compatibility-section, .senior-advice-section {
          position: relative;
          z-index: 10;
          padding: 60px 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-title {
          font-size: 32px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .section-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .compatibility-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .advice-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 32px;
        }

        .compatibility-card, .advice-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transition: transform 0.3s ease;
        }

        .compatibility-card:hover, .advice-card:hover {
          transform: translateY(-8px);
        }

        .compatibility-card.best-match {
          border-left: 4px solid #f97316;
        }

        .compatibility-card.good-match {
          border-left: 4px solid #10b981;
        }

        .compatibility-card.challenging-match {
          border-left: 4px solid #8b5cf6;
        }

        .compatibility-card .card-header p,
        .advice-card .card-header p {
          font-size: 14px;
          color: #6B7280;
          margin: 8px 0 0 0;
          line-height: 1.4;
        }

        .compatibility-item, .advice-item {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
          padding: 12px;
          background: rgba(248, 250, 252, 0.8);
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .compatibility-item:hover, .advice-item:hover {
          background: rgba(241, 245, 249, 0.9);
          transform: translateX(4px);
        }

        .type-badge-small {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 32px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 800;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .type-name {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          flex: 1;
        }

        .advice-item .bullet {
          font-size: 20px;
          flex-shrink: 0;
        }

        .advice-item span:last-child {
          font-size: 16px;
          line-height: 1.6;
          color: #374151;
          flex: 1;
        }

        .lifestyle-card {
          border-left: 4px solid #f59e0b;
        }

        .health-card {
          border-left: 4px solid #059669;
        }

        /* 모바일 반응형 */
        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 16px 60px;
          }

          .type-badge {
            flex-direction: column;
            gap: 16px;
            padding: 20px;
          }

          .type-info {
            text-align: center;
          }

          .type-title {
            font-size: 36px;
          }

          .hero-title {
            font-size: 28px;
          }

          .hero-description {
            font-size: 18px;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .share-button, .home-button {
            width: 100%;
            max-width: 300px;
          }

          .analysis-section {
            padding: 0 16px 60px;
          }

          .analysis-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .analysis-card {
            padding: 24px;
          }

          .modal-content {
            margin: 0;
            min-width: unset;
            width: calc(100% - 40px);
            max-width: 400px;
          }

          .compatibility-section, .senior-advice-section {
            padding: 40px 16px;
          }

          .section-title {
            font-size: 26px;
          }

          .section-subtitle {
            font-size: 16px;
          }

          .compatibility-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .advice-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .compatibility-card, .advice-card {
            padding: 24px;
          }

          .compatibility-item, .advice-item {
            gap: 12px;
            padding: 16px 12px;
          }

          .type-badge-small {
            width: 40px;
            height: 28px;
            font-size: 11px;
          }

          .type-name {
            font-size: 14px;
          }

          .advice-item span:last-child {
            font-size: 15px;
          }
        }

        /* Result Footer Styles */
        .result-footer {
          background: #1e293b;
          color: white;
          padding: 40px 20px;
          margin-top: 60px;
          text-align: center;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-text {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          color: #e2e8f0;
        }

        .footer-email {
          color: #60a5fa;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .footer-email:hover {
          color: #93c5fd;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .result-footer {
            padding: 30px 20px;
            margin-top: 40px;
          }

          .footer-text {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}