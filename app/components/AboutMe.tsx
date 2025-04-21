"use client";

import { useRef } from 'react';
import Image from 'next/image';

interface Interview {
  question: string;
  answer: string;
}

interface Skill {
  name: string;
  icon: string;
  type: "skill" | "tool";
}

interface AboutMeProps {
  interviews: Interview[];
  skills: Skill[];
}

export default function AboutMe({ interviews, skills }: AboutMeProps) {
  return (
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
  );
} 