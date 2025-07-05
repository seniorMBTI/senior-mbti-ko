/**
 * MBTI 설문조사 → 결과 페이지 리디렉션 테스트
 * 4개 언어별 16개 MBTI 유형 테스트 (총 64개 시나리오)
 */

const { chromium } = require('playwright');

// 테스트할 사이트 URL들
const SITES = {
  ko: 'https://senior-mbti-kdfzyx2wf-seniormbtis-projects.vercel.app',
  en: 'https://senior-mbti-gxtyv914i-seniormbtis-projects.vercel.app',
  zh: 'https://senior-mbti-6qrmngxdf-seniormbtis-projects.vercel.app',
  ja: 'https://senior-mbti-5u56z4umh-seniormbtis-projects.vercel.app'
};

// 16개 MBTI 유형과 각각의 답변 패턴
const MBTI_PATTERNS = {
  'INTJ': { E: 0, I: 6, S: 0, N: 6, T: 6, F: 0, J: 6, P: 0 },
  'INTP': { E: 0, I: 6, S: 0, N: 6, T: 6, F: 0, J: 0, P: 6 },
  'ENTJ': { E: 6, I: 0, S: 0, N: 6, T: 6, F: 0, J: 6, P: 0 },
  'ENTP': { E: 6, I: 0, S: 0, N: 6, T: 6, F: 0, J: 0, P: 6 },
  'INFJ': { E: 0, I: 6, S: 0, N: 6, T: 0, F: 6, J: 6, P: 0 },
  'INFP': { E: 0, I: 6, S: 0, N: 6, T: 0, F: 6, J: 0, P: 6 },
  'ENFJ': { E: 6, I: 0, S: 0, N: 6, T: 0, F: 6, J: 6, P: 0 },
  'ENFP': { E: 6, I: 0, S: 0, N: 6, T: 0, F: 6, J: 0, P: 6 },
  'ISTJ': { E: 0, I: 6, S: 6, N: 0, T: 6, F: 0, J: 6, P: 0 },
  'ISFJ': { E: 0, I: 6, S: 6, N: 0, T: 0, F: 6, J: 6, P: 0 },
  'ESTJ': { E: 6, I: 0, S: 6, N: 0, T: 6, F: 0, J: 6, P: 0 },
  'ESFJ': { E: 6, I: 0, S: 6, N: 0, T: 0, F: 6, J: 6, P: 0 },
  'ISTP': { E: 0, I: 6, S: 6, N: 0, T: 6, F: 0, J: 0, P: 6 },
  'ISFP': { E: 0, I: 6, S: 6, N: 0, T: 0, F: 6, J: 0, P: 6 },
  'ESTP': { E: 6, I: 0, S: 6, N: 0, T: 6, F: 0, J: 0, P: 6 },
  'ESFP': { E: 6, I: 0, S: 6, N: 0, T: 0, F: 6, J: 0, P: 6 }
};

// 24개 문항의 카테고리 순서
const QUESTION_CATEGORIES = [
  'E/I', 'E/I', 'E/I', 'E/I', 'E/I', 'E/I',
  'S/N', 'S/N', 'S/N', 'S/N', 'S/N', 'S/N',
  'T/F', 'T/F', 'T/F', 'T/F', 'T/F', 'T/F',
  'J/P', 'J/P', 'J/P', 'J/P', 'J/P', 'J/P'
];

// 각 언어별 테스트 시작 버튼 선택자
const START_BUTTON_SELECTORS = {
  ko: 'button:has-text("지금 시작하기")',
  en: 'button:has-text("Start Now")',
  zh: 'button:has-text("立即开始")',
  ja: 'button:has-text("今すぐ始める")'
};

// 테스트 결과 저장
const testResults = [];

async function testMBTIRedirection(language, mbtiType) {
  const browser = await chromium.launch({ 
    headless: true,
    timeout: 60000 
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    
    console.log(`\n테스트 시작: ${language.toUpperCase()} - ${mbtiType}`);
    
    // 1. 홈페이지 접속
    await page.goto(SITES[language], { waitUntil: 'networkidle' });
    console.log(`  ✓ 홈페이지 로드 완료`);
    
    // 2. 설문조사 시작
    await page.click(START_BUTTON_SELECTORS[language]);
    await page.waitForURL('**/survey');
    console.log(`  ✓ 설문조사 페이지 진입`);
    
    // 3. 24개 문항에 답변
    const pattern = MBTI_PATTERNS[mbtiType];
    for (let i = 0; i < 24; i++) {
      const category = QUESTION_CATEGORIES[i];
      const [dimension1, dimension2] = category.split('/');
      
      // 해당 유형에 맞는 답변 선택 (A 또는 B)
      const shouldChooseA = pattern[dimension1] > 0;
      const choiceSelector = shouldChooseA ? 
        'button[aria-label*="Choice A"], button:has-text("A"), div.choice-box:has-text("A")' : 
        'button[aria-label*="Choice B"], button:has-text("B"), div.choice-box:has-text("B")';
      
      await page.waitForSelector(choiceSelector, { timeout: 5000 });
      await page.click(choiceSelector);
      
      // 다음 버튼 클릭 또는 자동 진행 대기
      if (i < 23) {
        // 자동으로 다음 문항으로 넘어가는지 확인
        try {
          await page.waitForTimeout(300); // 짧은 대기
        } catch (e) {
          // 다음 버튼이 있다면 클릭
          const nextButton = await page.$('button:has-text("다음"), button:has-text("Next"), button:has-text("下一个"), button:has-text("次へ")');
          if (nextButton) {
            await nextButton.click();
          }
        }
      }
    }
    
    console.log(`  ✓ 24개 문항 답변 완료`);
    
    // 4. 결과 페이지로 리디렉션 확인 (최대 10초 대기)
    const startTime = Date.now();
    let redirected = false;
    let finalUrl = '';
    
    while (Date.now() - startTime < 10000 && !redirected) {
      await page.waitForTimeout(500);
      const currentUrl = page.url();
      
      if (currentUrl.includes('/result/')) {
        redirected = true;
        finalUrl = currentUrl;
        
        // 결과 페이지 로드 대기
        await page.waitForLoadState('networkidle');
        
        // MBTI 유형이 올바르게 표시되는지 확인
        const typeElement = await page.$(`text=${mbtiType}`);
        const typeDisplayed = !!typeElement;
        
        testResults.push({
          language,
          mbtiType,
          success: true,
          redirected: true,
          typeDisplayed,
          finalUrl,
          duration: Date.now() - startTime
        });
        
        console.log(`  ✓ 결과 페이지 리디렉션 성공!`);
        console.log(`  ✓ URL: ${finalUrl}`);
        console.log(`  ✓ MBTI 유형 표시: ${typeDisplayed ? '성공' : '실패'}`);
        console.log(`  ✓ 소요 시간: ${Date.now() - startTime}ms`);
        
        break;
      }
    }
    
    if (!redirected) {
      testResults.push({
        language,
        mbtiType,
        success: false,
        redirected: false,
        error: '10초 내에 리디렉션되지 않음',
        finalUrl: page.url()
      });
      
      console.log(`  ✗ 리디렉션 실패!`);
      console.log(`  ✗ 현재 URL: ${page.url()}`);
    }
    
  } catch (error) {
    testResults.push({
      language,
      mbtiType,
      success: false,
      error: error.message
    });
    
    console.log(`  ✗ 테스트 실패: ${error.message}`);
  } finally {
    await browser.close();
  }
}

async function runAllTests() {
  console.log('='.repeat(80));
  console.log('MBTI 설문조사 → 결과 페이지 리디렉션 자동화 테스트');
  console.log('='.repeat(80));
  
  const startTime = Date.now();
  
  // 각 언어별로 16개 MBTI 유형 테스트
  for (const [lang, url] of Object.entries(SITES)) {
    console.log(`\n${'='.repeat(40)}`);
    console.log(`${lang.toUpperCase()} 버전 테스트 시작`);
    console.log(`URL: ${url}`);
    console.log('='.repeat(40));
    
    for (const mbtiType of Object.keys(MBTI_PATTERNS)) {
      await testMBTIRedirection(lang, mbtiType);
      
      // 서버 부하 방지를 위한 대기
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // 최종 결과 집계
  console.log('\n' + '='.repeat(80));
  console.log('테스트 결과 요약');
  console.log('='.repeat(80));
  
  const totalTests = testResults.length;
  const successfulTests = testResults.filter(r => r.success && r.redirected && r.typeDisplayed).length;
  const redirectedButNoType = testResults.filter(r => r.redirected && !r.typeDisplayed).length;
  const failedTests = testResults.filter(r => !r.success || !r.redirected).length;
  
  console.log(`\n총 테스트: ${totalTests}개`);
  console.log(`성공 (리디렉션 + MBTI 표시): ${successfulTests}개 (${(successfulTests/totalTests*100).toFixed(1)}%)`);
  console.log(`부분 성공 (리디렉션만): ${redirectedButNoType}개`);
  console.log(`실패: ${failedTests}개`);
  
  // 언어별 성공률
  console.log('\n언어별 성공률:');
  ['ko', 'en', 'zh', 'ja'].forEach(lang => {
    const langResults = testResults.filter(r => r.language === lang);
    const langSuccess = langResults.filter(r => r.success && r.redirected).length;
    console.log(`  ${lang.toUpperCase()}: ${langSuccess}/${langResults.length} (${(langSuccess/langResults.length*100).toFixed(1)}%)`);
  });
  
  // 실패한 케이스 상세 정보
  if (failedTests > 0) {
    console.log('\n실패한 테스트 상세:');
    testResults.filter(r => !r.success || !r.redirected).forEach(r => {
      console.log(`  - ${r.language.toUpperCase()} ${r.mbtiType}: ${r.error || '리디렉션 실패'}`);
    });
  }
  
  const totalDuration = Date.now() - startTime;
  console.log(`\n총 소요 시간: ${Math.round(totalDuration / 1000)}초`);
  
  // 결과를 JSON 파일로 저장
  const fs = require('fs').promises;
  await fs.writeFile(
    'test-results.json', 
    JSON.stringify(testResults, null, 2)
  );
  
  console.log('\n상세 결과가 test-results.json 파일에 저장되었습니다.');
}

// Playwright 설치 확인
async function checkPlaywright() {
  try {
    require('playwright');
    return true;
  } catch (e) {
    console.log('Playwright가 설치되어 있지 않습니다.');
    console.log('다음 명령어로 설치해주세요:');
    console.log('npm install playwright');
    console.log('npx playwright install chromium');
    return false;
  }
}

// 메인 실행
(async () => {
  if (await checkPlaywright()) {
    await runAllTests();
  }
})();