"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";

// 데이터 타입 정의
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link: string;
}

interface Skill {
  name: string;
  icon: string;
  type: "skill" | "tool";
}

// 프로젝트 데이터
const projects: Project[] = [
  {
    id: "json-transfer",
    title: "JSON 변환기",
    description: "개발자 친화적인 JSON 뷰어 & 변환기로 JSON 데이터를 쉽게 분석할 수 있습니다.",
    tags: ["React", "JavaScript", "JSON"],
    link: "/projects/json-transfer",
  },
  {
    id: "markdown-note",
    title: "마크다운 노트",
    description: "마크다운 편집 및 미리보기 도구로 문서를 효율적으로 작성할 수 있습니다.",
    tags: ["React", "Markdown", "에디터"],
    link: "/projects/markdown-note",
  },
  {
    id: "music-visualization",
    title: "음악 시각화",
    description: "오디오 파일을 시각적으로 표현하여 음악을 새로운 방식으로 경험할 수 있습니다.",
    tags: ["React", "Audio API", "시각화"],
    link: "/projects/music-visualization",
  },
];

// 스킬 데이터
const skills: Skill[] = [
  { name: "React", icon: "./react.svg", type: "skill" },
  { name: "Next.js", icon: "./nextjs.svg", type: "skill" },
  { name: "JavaScript", icon: "./javascript.svg", type: "skill" },
  { name: "TypeScript", icon: "./typescript.svg", type: "skill" },
  { name: "HTML5", icon: "./html.svg", type: "skill" },
  { name: "CSS3", icon: "./css.svg", type: "skill" },
  { name: "Tailwind CSS", icon: "./tailwind.svg", type: "skill" },
  { name: "Git", icon: "./git.svg", type: "tool" },
  { name: "VS Code", icon: "./vscode.svg", type: "tool" },
  { name: "Figma", icon: "./figma.svg", type: "tool" },
  { name: "Cursor", icon: "./cursor.svg", type: "tool" },
];

// 인터뷰 데이터
const interviews = [
  {
    question: "프론트엔드 개발자가 된 이유는 무엇인가요?",
    answer: "사용자와 가장 직접적으로 상호작용하는 웹 인터페이스를 만드는 매력에 빠졌습니다. 디자인과 기술의 균형을 맞추고, 사용자 경험을 향상시키는 작업이 저의 창의성과 문제 해결 능력을 발휘하는 데 이상적인 환경을 제공했습니다. 코드 한 줄이 시각적으로 즉각 변화하는 것을 볼 때의 즐거움은 다른 어떤 개발 분야에서도 느끼기 어려운 특별한 만족감입니다."
  },
  {
    question: "개발자로서 당신의 강점은 무엇인가요?",
    answer: "저는 빠른 학습 능력과 적응력이 강점입니다. 새로운 기술과 프레임워크를 신속하게 익히고 실제 프로젝트에 적용할 수 있습니다. 또한 사용자 중심의 사고방식으로 항상 최종 사용자의 편의성과 경험을 고려하며 개발합니다. 팀 프로젝트에서는 명확한 커뮤니케이션과 협업을 통해 효율적인 개발 과정을 이끌어내는 데 주력합니다."
  },
  {
    question: "개발 과정에서 어려움을 극복한 경험이 있나요?",
    answer: "복잡한 상태 관리 문제에 직면했을 때, 기존 방식으로는 해결이 어려웠습니다. 그래서 Redux, Context API, Recoil 등 다양한 상태 관리 라이브러리를 연구하고, 각 프로젝트의 특성에 맞는 최적의 솔루션을 찾아 적용했습니다. 이 과정에서 코드의 유지보수성과 확장성을 크게 향상시켰고, 문제 해결을 위한 체계적인 접근 방식을 개발했습니다."
  }
];

// 강점 키워드
const strengths = [
  "창의적 문제 해결", "세심한 UX 디자인", "신속한 학습 능력", 
  "최신 기술 트렌드", "효율적인 코드 작성", "팀 협업"
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  // 클라이언트 사이드에서만 애니메이션 적용
  useEffect(() => {
    setMounted(true);
    
    // 인트로 애니메이션이 끝난 후 상태 업데이트
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 2000); // 인트로 애니메이션 시간과 동일하게 설정

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="overflow-x-hidden">
      {/* 첫 번째 섹션 - 인트로 및 프로필 */}
      <section className="fullscreen-section sticky-section textured-bg">
        <div className="flex flex-col items-center justify-center min-h-screen w-full relative">
          {/* 인트로 텍스트 - 정중앙에 크게 나타났다가 위로 이동 */}
          <h1 className="intro-text">
            <span className="font-light">프론트엔드 개발자 </span>
            <span className="font-bold">강현우</span>
            <span className="font-light">입니다</span>
          </h1>
          
          {/* 서브 내용 컨테이너 - 순차적으로 나타남 */}
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="intro-subtext max-w-4xl mx-auto px-6 text-center mt-32">
              <div className="max-w-xl mx-auto mb-8">
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  사용자 중심의 인터페이스와 직관적인 경험을 만듭니다.<br/>
                  문제를 창의적으로 해결하며 최신 기술에 빠르게 적응합니다.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {strengths.map((strength, index) => (
                  <span 
                    key={index}
                    className="strength-badge"
                  >
                    {strength}
                  </span>
                ))}
              </div>
              
              <div className="intro-profile w-72 h-72 md:w-96 md:h-96 relative rounded-xl overflow-hidden shadow-lg mx-auto">
                <Image 
                  src="./photo.jpg" 
                  alt="강현우 프로필" 
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              
              <div className="mt-12 show-after-intro">
                <div className="flex flex-wrap justify-center gap-5 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Image src="./location.svg" alt="위치" width={16} height={16} />
                    <span>경기도 성남시</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Image src="./email.svg" alt="이메일" width={16} height={16} />
                    <span>xkaizew12@gmail.com</span>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  {/* <a
                    href="https://github.com/kanghyunwoo920106"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    GitHub
                  </a> */}
                  <a
                    href="#"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-colors"
                  >
                    이력서 보기
                  </a>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 w-full text-center show-after-intro">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mx-auto mt-2 text-gray-500 animate-bounce"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 두 번째 섹션 - About Me */}
      <section className="scroll-section" ref={aboutSectionRef}>
        <div className="scroll-content">
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
          
          <div className="bg-secondary bg-opacity-10 p-6 md:p-8 rounded-lg mb-16">
            <p className="text-lg mb-4">
              안녕하세요! 사용자 경험을 중요시하는 프론트엔드 개발자 강현우입니다.
              저는 웹 애플리케이션 개발에 열정을 가지고 있으며, 새로운 기술을 배우고 적용하는 것을 좋아합니다.
            </p>
            <p className="text-lg">
              React, Next.js, TypeScript를 주로 사용하여 개발하고 있으며, 직관적이고 아름다운 UI/UX를 구현하는 데 관심이 많습니다.
              프로젝트를 통해 문제 해결 능력과 창의적인 사고를 발휘하고 있습니다.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-6">Interview</h3>
          <div className="mb-16">
            {interviews.map((interview, index) => (
              <div key={index} className="interview-card">
                <p className="interview-question">{interview.question}</p>
                <p className="text-secondary-foreground">{interview.answer}</p>
              </div>
            ))}
          </div>
          
          <h3 className="text-2xl font-semibold mb-8">Skills & Tools</h3>
          <div className="mb-12">
            <h4 className="text-xl font-medium mb-4">Skills</h4>
            <div className="skill-grid mb-10">
              {skills
                .filter(skill => skill.type === "skill")
                .map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-icon">
                      <Image 
                        src={skill.icon} 
                        alt={skill.name} 
                        width={32} 
                        height={32} 
                      />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))
              }
            </div>
            
            <h4 className="text-xl font-medium mb-4">Tools</h4>
            <div className="skill-grid">
              {skills
                .filter(skill => skill.type === "tool")
                .map((tool) => (
                  <div key={tool.name} className="skill-item">
                    <div className="skill-icon">
                      <Image 
                        src={tool.icon} 
                        alt={tool.name} 
                        width={32} 
                        height={32} 
                      />
                    </div>
                    <span className="skill-name">{tool.name}</span>
                  </div>
                ))
              }
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-6">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <footer className="pt-16 pb-8 text-center text-muted-foreground">
            <p>© 2023 강현우. All rights reserved.</p>
          </footer>
        </div>
      </section>
    </div>
  );
}
