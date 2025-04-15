import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">강현우의 포트폴리오</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <ProjectCard 
            title="JSON 변환기" 
            description="개발자 친화적인 JSON 뷰어 & 변환기" 
            link="/projects/json-transfer"
          />
          <ProjectCard 
            title="마크다운 노트" 
            description="마크다운 편집 및 미리보기 도구" 
            link="/projects/markdown-note"
          />
          <ProjectCard 
            title="음악 시각화" 
            description="오디오 파일을 시각적으로 표현" 
            link="/projects/music-visualization"
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/kanghyunwoo920106"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          GitHub
        </a>
      </footer>
    </div>
  );
}

function ProjectCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link href={link}>
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
        <div className="mt-4 text-blue-500 dark:text-blue-400">자세히 보기 →</div>
      </div>
    </Link>
  );
}
