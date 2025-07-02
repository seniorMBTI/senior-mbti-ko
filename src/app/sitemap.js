export default function sitemap() {
  const baseUrl = 'https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app';
  
  // MBTI 16개 유형
  const mbtiTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP', 
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  // 기본 페이지들
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/survey`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // MBTI 결과 페이지들 (동적 생성)
  const resultPages = mbtiTypes.map((type) => ({
    url: `${baseUrl}/result/${type.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly', 
    priority: 0.8,
  }));

  // 추가 SEO 페이지들
  const seoPages = [
    {
      url: `${baseUrl}/mbti-compatibility`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/senior-lifestyle`,
      lastModified: new Date(), 
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/retirement-planning`,
      lastModified: new Date(),
      changeFrequency: 'weekly', 
      priority: 0.6,
    }
  ];

  return [...routes, ...resultPages, ...seoPages];
}