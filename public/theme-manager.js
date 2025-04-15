// 테마 관리 유틸리티
(function() {
  // 마크다운 노트 페이지에서는 항상 다크 모드 사용
  if (window.location.pathname.includes('/projects/markdown-note')) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } 
  // 다른 페이지에서는 기존 테마를 사용하거나 시스템 설정 따름
  else {
    const storedTheme = localStorage.getItem('theme');
    const pageExits = window.location.pathname !== '/projects/markdown-note' && 
                      localStorage.getItem('lastVisitedPage') === '/projects/markdown-note';
    
    // 마크다운 노트 페이지에서 나온 경우 다크 모드 해제
    if (pageExits) {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    }
    // 저장된 테마가 있는 경우
    else if (storedTheme) {
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
  
  // 현재 페이지 URL 저장
  localStorage.setItem('lastVisitedPage', window.location.pathname);
})(); 