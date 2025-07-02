// 애드센스 최적화 SEO 메타데이터
export const metadata = {
  title: '시니어 MBTI 성격 테스트 | 중장년 심리 분석 설문조사 | 은퇴 후 자아 발견',
  description: '60대+ 시니어를 위한 24문항 MBTI 성격 유형 테스트입니다. 은퇴 후 새로운 인생과 라이프스타일을 위한 전문 심리 분석을 받아보세요. 시니어 맞춤 질문으로 정확한 성격 진단을 제공합니다.',
  keywords: '시니어 MBTI 테스트, 중장년 심리테스트, 60대 성격분석, 은퇴 후 심리검사, 시니어 자아발견, 황금기 성격진단, 중장년 심리상담, 시니어 라이프코칭',
  openGraph: {
    title: '시니어 MBTI 성격 테스트 - 24문항으로 알아보는 나의 성격 유형',
    description: '60대+ 시니어를 위한 전문 MBTI 테스트입니다. 24개의 간단한 질문으로 나의 성격 유형과 상성을 알아보세요.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app/survey',
    siteName: '시니어 MBTI',
    images: [
      {
        url: '/images/senior-mbti-survey-ko.jpg',
        width: 1200,
        height: 630,
        alt: '시니어 MBTI 성격 테스트 설문조사 - 24문항으로 알아보는 나의 성격 유형'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '시니어 MBTI 성격 테스트 - 24문항으로 알아보는 나의 성격 유형',
    description: '60대+ 시니어를 위한 전문 MBTI 테스트입니다. 24개의 간단한 질문으로 나의 성격 유형과 상성을 알아보세요.',
    images: ['/images/senior-mbti-survey-ko.jpg']
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
  alternates: {
    canonical: 'https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app/survey',
    languages: {
      'ko-KR': 'https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app/survey',
      'en-US': 'https://senior-mbti-l3zee5a4g-seniormbtis-projects.vercel.app/survey',
      'zh-CN': 'https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app/survey',
      'ja-JP': 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/survey'
    }
  }
};

export default function SurveyLayout({ children }) {
  return (
    <>
      {/* Google AdSense 스크립트 */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
        crossOrigin="anonymous"
      />
      
      {/* Google AdSense 자동 광고 활성화 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-YOUR_PUBLISHER_ID",
              enable_page_level_ads: true,
              page_level_ads_config: {
                level: "minor"
              }
            });
          `
        }}
      />
      
      {/* 구조화된 데이터 - 설문조사 Quiz Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "시니어 MBTI 성격 유형 테스트",
            "description": "60대 이상 중장년층을 위한 24문항 MBTI 성격 유형 테스트",
            "about": {
              "@type": "Thing",
              "name": "MBTI 성격 유형",
              "description": "마이어스-브릭스 성격 유형 지표"
            },
            "numberOfQuestions": 24,
            "timeRequired": "PT5M",
            "educationalLevel": "Adult",
            "audience": {
              "@type": "Audience",
              "audienceType": "시니어, 중장년층, 60세 이상"
            },
            "provider": {
              "@type": "Organization",
              "name": "시니어 MBTI 전문연구팀",
              "url": "https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "KRW",
              "availability": "https://schema.org/InStock"
            },
            "inLanguage": "ko-KR",
            "isAccessibleForFree": true,
            "learningResourceType": "Assessment",
            "assesses": [
              "성격 유형",
              "MBTI 성격 분석",
              "인간관계 상성",
              "라이프스타일 적합성"
            ]
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
                "item": "https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "성격 테스트 설문조사",
                "item": "https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app/survey"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}