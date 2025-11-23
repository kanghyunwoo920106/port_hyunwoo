"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";

// SVG 파일 import
import ReactIcon from '../public/react.svg';
import NextjsIcon from '../public/nextjs.svg';
import JavaScriptIcon from '../public/javascript.svg';
import TypeScriptIcon from '../public/typescript.svg';
import HtmlIcon from '../public/html.svg';
import CssIcon from '../public/css.svg';
import TailwindIcon from '../public/tailwind.svg';
import GitIcon from '../public/git.svg';
import VscodeIcon from '../public/vscode.svg';
import FigmaIcon from '../public/figma.svg';
import CursorIcon from '../public/cursor.svg';
import LocationIcon from '../public/location.svg';
import EmailIcon from '../public/email.svg';
import NodejsIcon from '../public/nodejs.svg';
import MongodbIcon from '../public/mongodb.svg';
import AwsIcon from '../public/aws.svg';
import ReduxIcon from '../public/redux.svg';
import Web3Icon from '../public/web3.svg';
import EthereumIcon from '../public/ethereum.svg';
import CsharpIcon from '../public/csharp.svg';
import WpfIcon from '../public/wpf.svg';
import DotnetIcon from '../public/dotnet.svg';
import VisualstudioIcon from '../public/visualstudio.svg';
import DirectxIcon from '../public/directx.svg';
import JqueryIcon from '../public/jquery.svg';
import PhotoshopIcon from '../public/photoshop.svg';
import IllustratorIcon from '../public/illustrator.svg';

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
  { name: "React", icon: ReactIcon, type: "skill" },
  { name: "Next.js", icon: NextjsIcon, type: "skill" },
  { name: "JavaScript", icon: JavaScriptIcon, type: "skill" },
  { name: "TypeScript", icon: TypeScriptIcon, type: "skill" },
  { name: "HTML5", icon: HtmlIcon, type: "skill" },
  { name: "CSS3", icon: CssIcon, type: "skill" },
  { name: "Tailwind CSS", icon: TailwindIcon, type: "skill" },
  { name: "Git", icon: GitIcon, type: "tool" },
  { name: "VS Code", icon: VscodeIcon, type: "tool" },
  { name: "Figma", icon: FigmaIcon, type: "tool" },
  { name: "Cursor", icon: CursorIcon, type: "tool" },
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
  const [activeSection, setActiveSection] = useState('intro');
  
  const introSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const careerSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const fadeElements = useRef<HTMLElement[]>([]);

  // 클라이언트 사이드에서만 애니메이션 적용
  useEffect(() => {
    setMounted(true);
    
    // 인트로 애니메이션이 끝난 후 상태 업데이트
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 2000); // 인트로 애니메이션 시간과 동일하게 설정

    return () => clearTimeout(timer);
  }, []);

  // 스크롤 애니메이션 효과 설정
  useEffect(() => {
    if (!mounted) return;

    // 모든 fade-in-up 클래스를 가진 요소들을 수집
    fadeElements.current = Array.from(document.querySelectorAll('.fade-in-up'));

    // IntersectionObserver 설정
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 요소가 뷰포트에 들어왔을 때만 appear 클래스 추가하고 관찰 중단
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          // 한 번 나타난 요소는 더 이상 관찰하지 않음
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null, // viewport를 root로 사용
      threshold: 0.1, // 10% 이상 보일 때 실행
      rootMargin: '-50px' // 요소가 화면 하단에서 50px 위로 올라왔을 때 실행
    });

    // 모든 요소 관찰 시작
    fadeElements.current.forEach(element => {
      observer.observe(element);
    });

    // 스크롤에 따라 액티브 섹션 업데이트와 네비게이션 색상 변경 및 표시/숨김
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const navElement = document.querySelector('.side-navigation');
      
      // 각 섹션의 위치 확인
      const introRect = introSectionRef.current?.getBoundingClientRect();
      const aboutRect = aboutSectionRef.current?.getBoundingClientRect();
      const careerRect = careerSectionRef.current?.getBoundingClientRect();
      const projectsRect = projectsSectionRef.current?.getBoundingClientRect();
      
      // 소개 섹션에서는 네비게이션 숨기고, About Me 섹션부터 표시
      if (navElement) {
        if (aboutRect && aboutRect.top <= 0 || careerRect && careerRect.top <= 0 || projectsRect && projectsRect.top <= 0) {
          navElement.classList.remove('hidden');
        } else {
          navElement.classList.add('hidden');
        }

        // 어두운 섹션 진입 감지 (about, career, projects 섹션)
        if (aboutRect && aboutRect.top <= 0 || careerRect && careerRect.top <= 0 || projectsRect && projectsRect.top <= 0) {
          // 어두운 배경에서는 흰색 텍스트로 변경
          navElement.classList.add('dark-section');
        } else {
          // 밝은 배경에서는 검은색 텍스트로 변경
          navElement.classList.remove('dark-section');
        }
      }
   
      // 스크롤 위치에 따라 액티브 섹션 설정
      if (introRect && introRect.top <= scrollPosition && introRect.bottom > scrollPosition) {
        setActiveSection('intro');
      } else if (aboutRect && aboutRect.top + window.scrollY <= scrollPosition && aboutRect.bottom + window.scrollY > scrollPosition) {
        setActiveSection('about');
      } else if (careerRect && careerRect.top + window.scrollY <= scrollPosition && careerRect.bottom + window.scrollY > scrollPosition) {
        setActiveSection('career');
      } else if (projectsRect && projectsRect.top + window.scrollY <= scrollPosition && projectsRect.bottom + window.scrollY > scrollPosition) {
        setActiveSection('projects');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 초기 실행
    handleScroll();

    // 클린업 함수
    return () => {
      if (fadeElements.current.length > 0) {
        fadeElements.current.forEach(element => {
          observer.unobserve(element);
        });
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted]);

  // 섹션으로 스크롤 함수
  const scrollToSection = (sectionId: string) => {
    let targetRef;
    
    switch (sectionId) {
      case 'intro':
        targetRef = introSectionRef;
        break;
      case 'about':
        targetRef = aboutSectionRef;
        break;
      case 'career':
        targetRef = careerSectionRef;
        break;
      case 'projects':
        targetRef = projectsSectionRef;
        break;
      default:
        targetRef = introSectionRef;
    }
    
    if (targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="overflow-x-hidden">
      {/* 좌측 네비게이션 메뉴 */}
      <nav className="side-navigation hidden">
        <a 
          href="#intro" 
          className={`nav-item ${activeSection === 'intro' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('intro');
          }}
        >
          <span className="nav-text">소개</span>
        </a>
        <a 
          href="#about" 
          className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
          }}
        >
          <span className="nav-text">About Me</span>
        </a>
        <a 
          href="#career" 
          className={`nav-item ${activeSection === 'career' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('career');
          }}
        >
          <span className="nav-text">Career</span>
        </a>
        <a 
          href="#projects" 
          className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('projects');
          }}
        >
          <span className="nav-text">토이 프로젝트</span>
        </a>
      </nav>

      {/* 첫 번째 섹션 - 인트로 및 프로필 */}
      <section id="intro" className="fullscreen-section sticky-section textured-bg" ref={introSectionRef}>
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
                    <Image src={LocationIcon} alt="위치" width={16} height={16} />
                    <span>경기도 성남시</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Image src={EmailIcon} alt="이메일" width={16} height={16} />
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
      <section id="about" className="scroll-section" ref={aboutSectionRef}>
        <div className="scroll-content">
          <h2 className="text-4xl font-bold mb-12 text-center fade-in-up">About Me</h2>
          
          <div className="bg-secondary bg-opacity-10 p-6 md:p-8 rounded-lg mb-16 fade-in-up delay-100">
            <p className="text-lg mb-4">
              안녕하세요! 사용자 경험을 중요시하는 프론트엔드 개발자 강현우입니다.
              저는 웹 애플리케이션 개발에 열정을 가지고 있으며, 새로운 기술을 배우고 적용하는 것을 좋아합니다.
            </p>
            <p className="text-lg">
              React, Next.js, TypeScript를 주로 사용하여 개발하고 있으며, 직관적이고 아름다운 UI/UX를 구현하는 데 관심이 많습니다.
              프로젝트를 통해 문제 해결 능력과 창의적인 사고를 발휘하고 있습니다.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-6 fade-in-up delay-200">Interview</h3>
          <div className="mb-16">
            {interviews.map((interview, index) => (
              <div key={index} className={`interview-card fade-in-up delay-${(index + 3) * 100}`}>
                <p className="interview-question">{interview.question}</p>
                <p className="text-secondary-foreground">{interview.answer}</p>
              </div>
            ))}
          </div>
          
          <h3 className="text-2xl font-semibold mb-8 fade-in-up delay-600">Skills & Tools</h3>
          <div className="mb-12">
            <h4 className="text-xl font-medium mb-4 fade-in-up delay-700">Skills</h4>
            <div className="skill-grid mb-10 fade-in-up delay-700">
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
            
            <h4 className="text-xl font-medium mb-4 fade-in-up delay-800">Tools</h4>
            <div className="skill-grid fade-in-up delay-800">
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
        </div>
      </section>

      {/* 경력 섹션 추가 */}
      <section id="career" className="career-section" ref={careerSectionRef}>
        <div className="scroll-content">
          <h2 className="text-4xl font-bold mb-12 text-center fade-in-up">Career</h2>
          
          <div className="space-y-8 fade-in-up delay-100">
            {/* 투썬챌린지 */}
            <div className="career-card">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">투썬챌린지 마르코unit</h3>
                  <p className="text-gray-400">프론트엔드 개발자 / 대리</p>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-gray-400">2023.06 - 현재</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="tech-icon">
                  <Image src={ReactIcon} alt="React" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={NextjsIcon} alt="Next.js" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={TypeScriptIcon} alt="TypeScript" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={JavaScriptIcon} alt="JavaScript" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={NodejsIcon} alt="Node.js" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={MongodbIcon} alt="MongoDB" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={AwsIcon} alt="AWS" width={24} height={24} />
                </div>
              </div>
              
              <div className="space-y-4">
                <p>React 및 Next.js를 활용한 기업용 솔루션 개발을 담당하고 있습니다. 서버 사이드 렌더링과 클라이언트 사이드 렌더링의 적절한 조합을 통해 최적의 성능과 사용자 경험을 제공하는 애플리케이션을 구축하고 있습니다.</p>
                
                <div className="project-item">
                  <h4 className="text-lg font-semibold">제약 정보 관리 플랫폼 개발</h4>
                  <p className="text-sm text-gray-400 mb-2">React, Next.js, Redux, JavaScript, Ag-grid API, PHP, Laravel, Docker</p>
                  
                  <p className="mb-3">주요 개발 내용:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Next.js 15 기반 서버 컴포넌트와 클라이언트 컴포넌트 분리로 초기 로딩 성능 50% 개선</li>
                    <li>Redux-Toolkit과 RTK Query를 활용한 전역 상태 관리 및 API 요청 최적화</li>
                    <li>Ag-grid의 복잡한 데이터 조작 및 필터링 기능 커스터마이징</li>
                    <li>CSV 및 Excel 파일 일괄 업로드 및 데이터 처리 기능 구현</li>
                    <li>PHP Laravel 백엔드와의 API 통합 및 데이터 정합성 검증 로직 개발</li>
                    <li>Docker 컨테이너를 활용한 개발 및 배포 환경 구성</li>
                  </ul>
                  
                  <p className="mt-4 mb-3">트러블슈팅 경험:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>200,000개 이상의 약품 데이터를 효율적으로 처리하기 위한 가상화 스크롤 구현</li>
                    <li>고용량 데이터 필터링 시 UI 응답성 향상을 위한 웹 워커 도입</li>
                    <li>Next.js와 Ag-grid 라이센스 호환성 문제 해결 및 동적 로딩 최적화</li>
                    <li>복잡한 폼 상태 관리를 위한 React-Hook-Form과 Redux 통합 패턴 개발</li>
                    <li>브라우저 호환성 문제 해결 및 IE11 지원을 위한 폴리필 최적화</li>
                    <li>API 요청 병목 현상 해결을 위한 배치 처리 및 쓰로틀링 구현</li>
                  </ul>
                </div>

                <div className="project-item">
                  <h4 className="text-lg font-semibold">문서 관리 및 공유 플랫폼 개발</h4>
                  <p className="text-sm text-gray-400 mb-2">React, Next.js, TypeScript, SpreadJS, Node.js, MongoDB, AWS</p>
                  
                  <p className="mb-3">주요 개발 내용:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Next.js 15 App Router 기반의 서버 사이드 렌더링 아키텍처 설계 및 구현</li>
                    <li>TypeScript와 Zod를 활용한 타입 안전성 확보 및 런타임 데이터 유효성 검증</li>
                    <li>React의 Suspense와 ErrorBoundary를 활용한 안정적인 데이터 로딩 처리</li>
                    <li>SpreadJS를 Next.js 환경에 최적화하여 통합하고 고성능 엑셀 기능 구현</li>
                    <li>MongoDB 애그리게이션 파이프라인을 활용한 실시간 문서 통계 집계 구현</li>
                    <li>AWS S3와 CloudFront를 활용한 문서 보관 및 배포 시스템 구축</li>
                  </ul>
                  
                  <p className="mt-4 mb-3">트러블슈팅 경험:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Next.js 환경에서 SpreadJS 라이센스 검증 문제 해결을 위한 커스텀 로더 구현</li>
                    <li>대용량 엑셀 파일 처리 시 메모리 사용량 최적화를 위한 스트리밍 방식 도입</li>
                    <li>SSR과 CSR을 혼합 사용 시 발생하는 hydration 불일치 문제 해결</li>
                    <li>동시 편집 시 충돌 방지를 위한 낙관적 동시성 제어(OCC) 구현</li>
                    <li>문서 변경 사항 실시간 동기화를 위한 웹소켓 연결 안정성 개선</li>
                    <li>사용자 권한에 따른 문서 접근 제어 시스템 설계 및 보안 취약점 개선</li>
                  </ul>
                </div>
                
                
                
                <div className="project-item">
                  <h4 className="text-lg font-semibold">화훼 도매 및 배송 플랫폼 개발</h4>
                  <p className="text-sm text-gray-400 mb-2">React, Next.js, React Query, JavaScript, Ag-grid API, PHP, CodeIgniter, Docker</p>
                  
                  <p className="mb-3">주요 개발 내용:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Next.js와 React를 활용한 반응형 화훼 도매 및 배송 플랫폼 구축</li>
                    <li>React Query를 도입하여 서버 상태 관리 및 데이터 캐싱 최적화</li>
                    <li>실시간 배송 현황 추적을 위한 WebSocket 연동 및 상태 관리</li>
                    <li>카카오맵 API 연동을 통한 배송 경로 최적화 및 시각화 기능 구현</li>
                    <li>배송 기사용 모바일 앱과 관리자용 대시보드 UI/UX 설계 및 구현</li>
                    <li>PHP CodeIgniter 백엔드와의 API 통합 및 오프라인 지원 기능 개발</li>
                  </ul>
                  
                  <p className="mt-4 mb-3">트러블슈팅 경험:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>GPS 신호 불안정 지역에서의 위치 추적 정확도 향상을 위한 알고리즘 개발</li>
                    <li>네트워크 연결 불안정 상황에서 데이터 손실 방지를 위한 오프라인 저장소 구현</li>
                    <li>대용량 배송 데이터의 효율적 처리를 위한 인덱싱 및 쿼리 최적화</li>
                    <li>배터리 소모 최적화를 위한 위치 업데이트 주기 조정 및 백그라운드 처리 개선</li>
                    <li>동시 다발적 배송 요청 처리 시 발생하는 경쟁 상태(race condition) 해결</li>
                    <li>지역별 특성에 맞는 배송 경로 추천 알고리즘 구현 및 최적화</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 위즈클라쓰 */}
            <div className="career-card fade-in-up delay-200">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">위즈클라쓰</h3>
                  <p className="text-gray-400">프론트엔드 개발자 / 대리</p>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-gray-400">2020.11 - 2022.12 (2년 2개월)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="tech-icon">
                  <Image src={ReactIcon} alt="React" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={NextjsIcon} alt="Next.js" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={TypeScriptIcon} alt="TypeScript" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={JavaScriptIcon} alt="JavaScript" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={ReduxIcon} alt="Redux" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={Web3Icon} alt="Web3.js" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={EthereumIcon} alt="Ethereum" width={24} height={24} />
                </div>
              </div>
              
              <div className="space-y-4">
                <p>React 및 Next.js를 활용한 블록체인 기반 코인 지갑 프로젝트 개발을 담당했습니다. Web3.js와 React를 결합하여 이더리움 및 다양한 암호화폐를 지원하는 지갑 서비스를 구현했습니다.</p>
                
                <div className="project-item">
                  <h4 className="text-lg font-semibold">블록체인 지갑 서비스 개발</h4>
                  <p className="text-sm text-gray-400 mb-2">React, Next.js, TypeScript, Redux, Web3.js, Ethers.js</p>
                  
                  <p className="mb-3">주요 개발 내용:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Next.js와 React를 활용한 암호화폐 지갑 서비스의 프론트엔드 아키텍처 설계 및 구현</li>
                    <li>Web3.js 및 Ethers.js를 통한 이더리움 스마트 컨트랙트 연동 및 트랜잭션 처리 구현</li>
                    <li>React Hooks와 Context API를 활용한 지갑 상태 관리 시스템 설계</li>
                    <li>Redux를 활용한 복잡한 지갑 데이터 및 트랜잭션 상태 관리</li>
                    <li>TypeScript를 도입하여 코드 안정성 및 개발 생산성 향상</li>
                    <li>반응형 디자인 적용으로 모바일 및 데스크톱 환경 모두 최적화된 UX 제공</li>
                  </ul>
                  
                  <p className="mt-4 mb-3">트러블슈팅 경험:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>블록체인 네트워크 지연 시 사용자 경험 개선을 위한 비동기 상태 관리 패턴 구현</li>
                    <li>메타마스크 연동 시 발생하는 브라우저 호환성 문제 해결 및 폴백 메커니즘 구현</li>
                    <li>가스비 변동에 따른 트랜잭션 실패 대응을 위한 자동 가스비 조정 기능 개발</li>
                    <li>멀티체인 지원을 위한 네트워크 스위칭 로직 구현 및 최적화</li>
                    <li>대용량 트랜잭션 히스토리 처리를 위한 가상화 리스트 및 페이지네이션 구현</li>
                    <li>보안 취약점 방지를 위한 입력값 검증 및 트랜잭션 서명 프로세스 개선</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 누리콘 */}
            {/* <div className="career-card fade-in-up delay-300">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">누리콘</h3>
                  <p className="text-gray-400">응용 프로그램 개발자 / 대리</p>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-gray-400">2018.11 - 2019.08 (10개월)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="tech-icon">
                  <Image src={CsharpIcon} alt="C#" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={WpfIcon} alt="WPF" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={DotnetIcon} alt=".NET" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={VisualstudioIcon} alt="Visual Studio" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={DirectxIcon} alt="DirectX" width={24} height={24} />
                </div>
              </div>
              
              <div className="space-y-4">
                <p>WPF와 C#을 기반으로 한 영상표출제어 프로그램 개발을 담당했습니다. 사용자 중심의 UI/UX 설계 및 구현을 통해 직관적인 인터페이스를 제공하고, 다양한 영상 시스템과의 연동을 통해 통합 관제 환경을 구축했습니다.</p>
                
                <div className="project-item">
                  <h4 className="text-lg font-semibold">영상표출 제어 프로그램 개발</h4>
                  <p className="text-sm text-gray-400 mb-2">WPF, C#, MVVM 패턴, DirectX</p>
                  
                  <p className="mb-3">주요 개발 내용:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>MVVM 아키텍처 패턴을 적용한 WPF 기반 UI 설계 및 구현</li>
                    <li>다양한 해상도와 비율의 영상을 처리하기 위한 레이아웃 관리 시스템 개발</li>
                    <li>사용자 인터랙션에 반응하는 실시간 영상 제어 기능 구현</li>
                    <li>DirectX를 활용한 고성능 영상 렌더링 및 표출 시스템 개발</li>
                    <li>영상 소스 관리 및 레이아웃 저장/불러오기 기능 구현</li>
                    <li>다중 디스플레이 환경에서의 영상 표출 시스템 최적화</li>
                  </ul>
                  
                  <p className="mt-4 mb-3">트러블슈팅 경험:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>다양한 해상도와 화면 비율 처리를 위한 동적 레이아웃 알고리즘 개발</li>
                    <li>고용량 영상 처리 시 메모리 누수 문제 해결 및 성능 최적화</li>
                    <li>Windows 버전 간 호환성 문제 해결 및 적절한 폴백 메커니즘 구현</li>
                    <li>다중 스레드 환경에서의 UI 업데이트 충돌 문제 해결</li>
                    <li>다양한 영상 소스와의 연동 과정에서 발생하는 동기화 이슈 해결</li>
                    <li>사용자 피드백을 반영한 인터페이스 개선 및 UX 최적화</li>
                  </ul>
                </div>
              </div>
            </div> */}
            
            {/* 위즈도메인 */}
            {/* <div className="career-card fade-in-up delay-400">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">위즈도메인</h3>
                  <p className="text-gray-400">웹 디자이너 / 웹 퍼블리셔</p>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-gray-400">2016.12 - 2018.05 (1년 6개월)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="tech-icon">
                  <Image src={HtmlIcon} alt="HTML5" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={CssIcon} alt="CSS3" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={JavaScriptIcon} alt="JavaScript" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={JqueryIcon} alt="jQuery" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={PhotoshopIcon} alt="Photoshop" width={24} height={24} />
                </div>
                <div className="tech-icon">
                  <Image src={IllustratorIcon} alt="Illustrator" width={24} height={24} />
                </div>
              </div>
              
              <div className="space-y-4">
                <p>웹사이트 UI/UX 디자인 및 퍼블리싱을 담당했습니다. 웹 표준과 접근성을 준수한 HTML, CSS, JavaScript 코드 작성과 반응형 웹 구현을 통해 다양한 디바이스에서 최적의 사용자 경험을 제공했습니다.</p>
                
                <div className="project-item">
                  <h4 className="text-lg font-semibold">기업 웹사이트 및 서비스 디자인/퍼블리싱</h4>
                  <p className="text-sm text-gray-400 mb-2">HTML5, CSS3, JavaScript, jQuery, Responsive Web Design, Adobe Photoshop</p>
                  
                  <p className="mb-3">주요 업무 내용:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Photoshop을 활용한 웹사이트 UI/UX 디자인 및 프로토타입 제작</li>
                    <li>HTML5, CSS3 기반의 웹 표준 및 접근성을 준수한 마크업 구현</li>
                    <li>JavaScript와 jQuery를 활용한 동적 UI 요소 개발</li>
                    <li>미디어 쿼리와 유동형 그리드를 활용한 반응형 웹 구현</li>
                    <li>크로스 브라우징 테스트 및 이슈 해결(IE8 이상 지원)</li>
                    <li>웹사이트 성능 최적화 및 로딩 속도 개선</li>
                  </ul>
                  
                  <p className="mt-4 mb-3">주요 프로젝트:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>회사 메인 웹사이트 리뉴얼 - 반응형 디자인 적용 및 UX 개선</li>
                    <li>다국어 지원 웹 애플리케이션 디자인 및 개발</li>
                    <li>기업 고객을 위한 도메인 관리 대시보드 UI 구현</li>
                    <li>다양한 웹 프로모션 페이지 디자인 및 퍼블리싱</li>
                    <li>SEO 최적화를 위한 시맨틱 마크업 구조 개선</li>
                    <li>애니메이션 효과를 활용한 사용자 인터랙션 개선</li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* 프로젝트 섹션 추가 - 기존 프로젝트 부분을 별도 섹션으로 분리 */}
      <section id="projects" className="project-section" ref={projectsSectionRef}>
        <div className="scroll-content">
          <h2 className="text-4xl font-bold mb-12 text-center fade-in-up">토이 프로젝트</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up delay-100">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <footer className="pt-16 pb-8 text-center text-muted-foreground fade-in-up delay-200">
            <p>© 2023 강현우. All rights reserved.</p>
          </footer>
        </div>
      </section>
    </div>
  );
}
