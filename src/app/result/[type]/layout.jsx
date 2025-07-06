// MBTI 유형별 시니어 맞춤 키워드
const mbtiKeywords = {
  'INTJ': '전략가 INTJ, 시니어 INTJ, 중장년 INTJ, 은퇴 후 INTJ, INTJ 성격, INTJ 특징, INTJ 직업, INTJ 상성, INTJ 궁합',
  'INTP': '사색가 INTP, 시니어 INTP, 중장년 INTP, 은퇴 후 INTP, INTP 성격, INTP 특징, INTP 직업, INTP 상성, INTP 궁합',
  'ENTJ': '통솔자 ENTJ, 시니어 ENTJ, 중장년 ENTJ, 은퇴 후 ENTJ, ENTJ 성격, ENTJ 특징, ENTJ 직업, ENTJ 상성, ENTJ 궁합',
  'ENTP': '발명가 ENTP, 시니어 ENTP, 중장년 ENTP, 은퇴 후 ENTP, ENTP 성격, ENTP 특징, ENTP 직업, ENTP 상성, ENTP 궁합',
  'INFJ': '옹호자 INFJ, 시니어 INFJ, 중장년 INFJ, 은퇴 후 INFJ, INFJ 성격, INFJ 특징, INFJ 직업, INFJ 상성, INFJ 궁합',
  'INFP': '중재자 INFP, 시니어 INFP, 중장년 INFP, 은퇴 후 INFP, INFP 성격, INFP 특징, INFP 직업, INFP 상성, INFP 궁합',
  'ENFJ': '선도자 ENFJ, 시니어 ENFJ, 중장년 ENFJ, 은퇴 후 ENFJ, ENFJ 성격, ENFJ 특징, ENFJ 직업, ENFJ 상성, ENFJ 궁합',
  'ENFP': '활동가 ENFP, 시니어 ENFP, 중장년 ENFP, 은퇴 후 ENFP, ENFP 성격, ENFP 특징, ENFP 직업, ENFP 상성, ENFP 궁합',
  'ISTJ': '관리자 ISTJ, 시니어 ISTJ, 중장년 ISTJ, 은퇴 후 ISTJ, ISTJ 성격, ISTJ 특징, ISTJ 직업, ISTJ 상성, ISTJ 궁합',
  'ISFJ': '수호자 ISFJ, 시니어 ISFJ, 중장년 ISFJ, 은퇴 후 ISFJ, ISFJ 성격, ISFJ 특징, ISFJ 직업, ISFJ 상성, ISFJ 궁합',
  'ESTJ': '감독관 ESTJ, 시니어 ESTJ, 중장년 ESTJ, 은퇴 후 ESTJ, ESTJ 성격, ESTJ 특징, ESTJ 직업, ESTJ 상성, ESTJ 궁합',
  'ESFJ': '집정관 ESFJ, 시니어 ESFJ, 중장년 ESFJ, 은퇴 후 ESFJ, ESFJ 성격, ESFJ 특징, ESFJ 직업, ESFJ 상성, ESFJ 궁합',
  'ISTP': '장인 ISTP, 시니어 ISTP, 중장년 ISTP, 은퇴 후 ISTP, ISTP 성격, ISTP 특징, ISTP 직업, ISTP 상성, ISTP 궁합',
  'ISFP': '모험가 ISFP, 시니어 ISFP, 중장년 ISFP, 은퇴 후 ISFP, ISFP 성격, ISFP 특징, ISFP 직업, ISFP 상성, ISFP 궁합',
  'ESTP': '사업가 ESTP, 시니어 ESTP, 중장년 ESTP, 은퇴 후 ESTP, ESTP 성격, ESTP 특징, ESTP 직업, ESTP 상성, ESTP 궁합',
  'ESFP': '연예인 ESFP, 시니어 ESFP, 중장년 ESFP, 은퇴 후 ESFP, ESFP 성격, ESFP 특징, ESFP 직업, ESFP 상성, ESFP 궁합'
};

// MBTI 유형별 세부 설명
const mbtiDescriptions = {
  'INTJ': '60대+ 시니어 INTJ 전략가 성격 유형의 상세 분석입니다. 은퇴 후 체계적인 사고와 독립적인 라이프스타일을 선호하는 INTJ의 특징, 강점, 상성 분석을 확인하세요.',
  'INTP': '60대+ 시니어 INTP 사색가 성격 유형의 상세 분석입니다. 은퇴 후 분석적 사고와 지적 호기심을 유지하는 INTP의 특징, 강점, 상성 분석을 확인하세요.',
  'ENTJ': '60대+ 시니어 ENTJ 통솔자 성격 유형의 상세 분석입니다. 은퇴 후도 리더십과 도전 정신을 유지하는 ENTJ의 특징, 강점, 상성 분석을 확인하세요.',
  'ENTP': '60대+ 시니어 ENTP 발명가 성격 유형의 상세 분석입니다. 은퇴 후 창의적 사고와 새로운 도전을 즐기는 ENTP의 특징, 강점, 상성 분석을 확인하세요.',
  'INFJ': '60대+ 시니어 INFJ 옹호자 성격 유형의 상세 분석입니다. 은퇴 후 깊은 통찰력과 의미 있는 인간관계를 추구하는 INFJ의 특징, 강점, 상성 분석을 확인하세요.',
  'INFP': '60대+ 시니어 INFP 중재자 성격 유형의 상세 분석입니다. 은퇴 후 가치관에 충실하고 자유로운 영혼을 유지하는 INFP의 특징, 강점, 상성 분석을 확인하세요.',
  'ENFJ': '60대+ 시니어 ENFJ 선도자 성격 유형의 상세 분석입니다. 은퇴 후 타인에 대한 배려와 사회 기여를 지속하는 ENFJ의 특징, 강점, 상성 분석을 확인하세요.',
  'ENFP': '60대+ 시니어 ENFP 활동가 성격 유형의 상세 분석입니다. 은퇴 후도 열정적이고 긍정적인 에너지를 유지하는 ENFP의 특징, 강점, 상성 분석을 확인하세요.',
  'ISTJ': '60대+ 시니어 ISTJ 관리자 성격 유형의 상세 분석입니다. 은퇴 후 책임감과 체계적인 생활을 선호하는 ISTJ의 특징, 강점, 상성 분석을 확인하세요.',
  'ISFJ': '60대+ 시니어 ISFJ 수호자 성격 유형의 상세 분석입니다. 은퇴 후 헌신적이고 따뜻한 돌봄을 제공하는 ISFJ의 특징, 강점, 상성 분석을 확인하세요.',
  'ESTJ': '60대+ 시니어 ESTJ 감독관 성격 유형의 상세 분석입니다. 은퇴 후도 효율성과 조직력을 발휘하는 ESTJ의 특징, 강점, 상성 분석을 확인하세요.',
  'ESFJ': '60대+ 시니어 ESFJ 집정관 성격 유형의 상세 분석입니다. 은퇴 후 따뜻한 사교성과 돌봄을 지속하는 ESFJ의 특징, 강점, 상성 분석을 확인하세요.',
  'ISTP': '60대+ 시니어 ISTP 장인 성격 유형의 상세 분석입니다. 은퇴 후 실용적이고 논리적인 접근을 선호하는 ISTP의 특징, 강점, 상성 분석을 확인하세요.',
  'ISFP': '60대+ 시니어 ISFP 모험가 성격 유형의 상세 분석입니다. 은퇴 후 예술적 감각과 자유로운 영혼을 유지하는 ISFP의 특징, 강점, 상성 분석을 확인하세요.',
  'ESTP': '60대+ 시니어 ESTP 사업가 성격 유형의 상세 분석입니다. 은퇴 후도 현재를 즐기고 활동적인 삶을 사는 ESTP의 특징, 강점, 상성 분석을 확인하세요.',
  'ESFP': '60대+ 시니어 ESFP 연예인 성격 유형의 상세 분석입니다. 은퇴 후도 즐거움과 사교 활동을 즐기는 ESFP의 특징, 강점, 상성 분석을 확인하세요.'
};

export async function generateMetadata({ params }) {
  const resultId = params.type.toUpperCase();
  const keywords = mbtiKeywords[resultId] || `${resultId}, MBTI 결과, 시니어 MBTI, 성격 유형, MBTI 상성, 궁합`;
  const description = mbtiDescriptions[resultId] || `${resultId} 성격 유형의 상세한 분석 결과입니다. 내 MBTI와 잘 맞는 성향, 잘 맞지 않는 성향을 확인하고 앞으로 남은 인생 동안 함께할 이상적인 동반자를 찾아보세요.`;
  
  return {
    title: `시니어 MBTI ${resultId} 성격 유형 결과 | 중장년 ${resultId} 특징 및 상성 분석`,
    description,
    keywords,
    openGraph: {
      title: `시니어 MBTI 결과 - ${resultId} 유형`,
      description: `${resultId} 성격 유형의 상세한 분석 결과입니다. 내 MBTI와 잘 맞는 성향, 잘 맞지 않는 성향을 확인해보세요.`,
      type: 'website',
      locale: 'ko_KR',
      url: `https://kr.seniormbti.com/result/${resultId}`,
      siteName: '시니어 MBTI',
      images: [
        {
          url: `/${resultId}-kr.png`,
          width: 1200,
          height: 630,
          alt: `${resultId} 성격 유형 결과 - 시니어 MBTI`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `시니어 MBTI 결과 - ${resultId} 유형`,
      description: `${resultId} 성격 유형의 상세한 분석 결과입니다. 내 MBTI와 잘 맞는 성향, 잘 맞지 않는 성향을 확인해보세요.`,
      images: [`/${resultId}-kr.png`]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function ResultLayout({ children, params }) {
  const resultId = params.type.toUpperCase();
  
  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3506846365049386"
        crossOrigin="anonymous"
      />
      
      {/* 구조화된 데이터 - TestResults Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TestResults",
            "name": `시니어 MBTI ${resultId} 성격 유형 결과`,
            "description": mbtiDescriptions[resultId] || `${resultId} 성격 유형 결과`,
            "result": {
              "@type": "PsychologicalTrait",
              "name": `MBTI ${resultId} 유형`,
              "description": `마이어스-브릭스 성격 유형 ${resultId}`
            },
            "mainEntity": {
              "@type": "Person",
              "description": `${resultId} 성격 유형을 가진 시니어`
            },
            "provider": {
              "@type": "Organization",
              "name": "시니어 MBTI 전문연구팀",
              "url": "https://kr.seniormbti.com"
            },
            "datePublished": new Date().toISOString(),
            "inLanguage": "ko-KR",
            "isAccessibleForFree": true
          })
        }}
      />
      
      {/* BreadcrumbList 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "시니어 MBTI 홈",
                "item": "https://kr.seniormbti.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "성격 테스트 설문조사",
                "item": "https://kr.seniormbti.com/survey"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": `${resultId} 유형 결과`,
                "item": `https://kr.seniormbti.com/result/${resultId.toLowerCase()}`
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}