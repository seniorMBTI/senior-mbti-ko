import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'

// 애드센스 최적화 SEO 메타데이터
export const metadata = {
  title: '시니어 MBTI | 중장년 성격 유형 테스트 | 은퇴 후 인생 설계 가이드',
  description: '60대+ 시니어를 위한 전문 MBTI 테스트. 은퇴 후 새로운 인생과 인간관계를 위한 성격 분석. 무료 심리 테스트로 나에게 맞는 동반자를 찾아보세요. 중장년 맞춤 상성 분석과 생활 가이드 제공.',
  keywords: '시니어 MBTI, 중장년 성격테스트, 은퇴 후 인생설계, 60대 심리테스트, 시니어 상성분석, 중장년 인간관계, 은퇴생활 가이드, 황금기 성격분석, 노년기 심리검사, 시니어 라이프스타일',
  authors: [{ name: '시니어 MBTI 전문연구팀' }],
  creator: '시니어 MBTI 전문연구팀',
  publisher: '시니어 MBTI',
  category: '심리테스트, 성격분석, 시니어 라이프',
  classification: 'Psychology, Personality Assessment, Senior Lifestyle',
  openGraph: {
    title: '시니어 MBTI - 내 MBTI와 상성 관계 확인하기',
    description: '내 MBTI를 확인하고 상성 관계의 MBTI를 찾아보세요! 앞으로 남은 인생 동안 나와 인연을 맺으며 함께 살아갈 성향이 잘 맞는 사람을 파악할 수 있어요.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app',
    siteName: '시니어 MBTI',
    images: [
      {
        url: '/images/senior-mbti-og-ko.jpg',
        width: 1200,
        height: 630,
        alt: '시니어 MBTI 성격 유형 테스트 - 내 MBTI와 상성 관계 확인하기'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '시니어 MBTI - 내 MBTI와 상성 관계 확인하기',
    description: '내 MBTI를 확인하고 상성 관계의 MBTI를 찾아보세요! 앞으로 남은 인생 동안 나와 인연을 맺으며 함께 살아갈 성향이 잘 맞는 사람을 파악할 수 있어요.',
    images: ['/images/senior-mbti-og-ko.jpg']
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

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        
        {/* 애드센스 최적화 메타 태그 */}
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* SEO 최적화 */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        
        {/* 다국어 SEO 최적화 */}
        <link rel="alternate" hrefLang="ko" href="https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app/" />
        <link rel="alternate" hrefLang="en" href="https://senior-mbti-l3zee5a4g-seniormbtis-projects.vercel.app/" />
        <link rel="alternate" hrefLang="zh" href="https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app/" />
        <link rel="alternate" hrefLang="ja" href="https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/" />
        <link rel="alternate" hrefLang="x-default" href="https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app/" />
        
        {/* 성능 최적화 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3506846365049386"
          crossOrigin="anonymous"
        />
        
        {/* 구조화 데이터 (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "시니어 MBTI",
              "alternateName": "중장년 성격 유형 테스트",
              "description": "60대+ 시니어를 위한 전문 MBTI 성격 유형 테스트. 은퇴 후 인생 설계와 인간관계 개선을 위한 심리 분석 도구",
              "url": "https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW",
                "availability": "https://schema.org/InStock"
              },
              "provider": {
                "@type": "Organization",
                "name": "시니어 MBTI 전문연구팀",
                "url": "https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "시니어, 중장년층",
                "geographicArea": {
                  "@type": "Country",
                  "name": "대한민국"
                }
              },
              "inLanguage": "ko-KR",
              "isAccessibleForFree": true,
              "mainEntity": {
                "@type": "Quiz",
                "name": "시니어 MBTI 성격 유형 테스트",
                "description": "24개 질문으로 구성된 시니어 맞춤 MBTI 심리 테스트",
                "educationalLevel": "Adult",
                "timeRequired": "PT5M",
                "assesses": "성격 유형, MBTI, 인간관계 상성"
              }
            })
          }}
        />
        
        {/* FAQ 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "시니어 MBTI 테스트는 무료인가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "네, 시니어 MBTI 테스트는 완전 무료로 제공됩니다. 별도의 회원가입이나 결제 없이 바로 테스트를 받으실 수 있습니다."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "시니어 MBTI는 일반 MBTI와 어떻게 다른가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "시니어 MBTI는 60대 이상 중장년층의 특별한 인생 경험과 가치관을 반영하여 설계되었습니다. 은퇴 후 생활, 인간관계, 건강 관리 등 시니어 특화 조언을 제공합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "테스트 시간은 얼마나 걸리나요?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "시니어 MBTI 테스트는 약 5분 정도 소요됩니다. 24개의 간단한 질문으로 구성되어 있어 부담 없이 완료하실 수 있습니다."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-gradient-to-br min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}