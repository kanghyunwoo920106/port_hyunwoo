export const getTemplates = () => {
    return {
      default: `# 마크다운 템플릿\n\n- 할 일\n- 노트\n- 코드 블록 예시:\n\n\`\`\`js\nconsole.log('Hello!');\n\`\`\`\n`,
      meeting: `# 회의록 템플릿\n\n## 날짜: \n## 참석자:\n## 내용:\n- [ ] 안건 정리\n- [ ] 다음 회의 일정 정하기\n`,
    };
  };