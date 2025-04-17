import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.link} className="block group">
      <div className="border border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-all hover:border-primary">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-800 border-t border-gray-700 flex justify-between items-center">
          <span className="text-sm text-gray-400">자세히 보기</span>
          <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
} 