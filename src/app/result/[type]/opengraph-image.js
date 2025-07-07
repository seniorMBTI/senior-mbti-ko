import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'MBTI 성격유형 결과 - 시니어 MBTI'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// MBTI Type 정보
const mbtiInfo = {
  'INTJ': { emoji: '🏛️', name: '건축가', color: '#6C5CE7' },
  'INTP': { emoji: '🔬', name: '논리술사', color: '#A29BFE' },
  'ENTJ': { emoji: '👑', name: '통솔자', color: '#E17055' },
  'ENTP': { emoji: '🚀', name: '변론가', color: '#00B894' },
  'INFJ': { emoji: '🌟', name: '옹호자', color: '#00CEC9' },
  'INFP': { emoji: '🎨', name: '중재자', color: '#FD79A8' },
  'ENFJ': { emoji: '🤝', name: '주인공', color: '#FDCB6E' },
  'ENFP': { emoji: '🎭', name: '활동가', color: '#E84393' },
  'ISTJ': { emoji: '🛡️', name: '현실주의자', color: '#2D3436' },
  'ISFJ': { emoji: '💝', name: '수호자', color: '#636E72' },
  'ESTJ': { emoji: '💼', name: '경영자', color: '#74B9FF' },
  'ESFJ': { emoji: '❤️', name: '집정관', color: '#FF7675' },
  'ISTP': { emoji: '🔧', name: '장인', color: '#00B894' },
  'ISFP': { emoji: '🌸', name: '모험가', color: '#FD79A8' },
  'ESTP': { emoji: '⚡', name: '사업가', color: '#FDCB6E' },
  'ESFP': { emoji: '🎪', name: '연예인', color: '#E84393' }
}

export default async function Image({ params }) {
  const mbtiType = params.type.toUpperCase()
  const typeInfo = mbtiInfo[mbtiType] || { emoji: '🌟', name: '성격유형', color: '#667eea' }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '50px',
            padding: '12px 24px',
            marginBottom: '40px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
            color: 'white',
            fontWeight: '500',
          }}
        >
          시니어 MBTI 결과
        </div>

        {/* MBTI Type with Emoji */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <div style={{ fontSize: '80px', marginRight: '20px' }}>
            {typeInfo.emoji}
          </div>
          <div
            style={{
              fontSize: '96px',
              fontWeight: 'bold',
              color: typeInfo.color,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {mbtiType}
          </div>
        </div>

        {/* Type Name */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          {typeInfo.name}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: '1.4',
          }}
        >
          나와 잘 맞는 MBTI 유형과 조심해야 할 유형을 확인해보세요
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}