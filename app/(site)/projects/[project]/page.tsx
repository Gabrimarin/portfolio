"use client";
import { myPortableTextComponents } from "@/app/components/richTextComponents";
import { getProject } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";
import { Tool } from "@/types/Tool";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  params: {
    project: string;
  };
};

export default function Project({ params }: Props) {
  const slug = params.project;
  // const project = await getProject(slug);
  const [project, setProject] = useState<Project | null>(null);
  const tools = project?.tools;
  console.log(project);
  useEffect(() => {
    getProject(slug).then((project) => setProject(project));
  }, []);

  if (!project) return null;
  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
          {project.name}
        </h1>
        <div className="flex items-center gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              title="View Code"
              className="flex items-center bg-gray-100 rounded-lf text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-gray-200 transition rounded-lg"
            >
              <Image
                src="/images/github-mark.svg"
                width={20}
                height={20}
                style={{
                  objectFit: "contain",
                  marginRight: "0.5rem",
                }}
                alt="github"
              />
              View Code
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              title="View Project"
              className="bg-gray-100 rounded-lf text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-blue-500 hover:text-pink-100 transition rounded-lg"
            >
              View Project
            </a>
          )}
        </div>
      </header>

      <div className="flex items-center mt-5 gap-2">
        {tools?.map((tool) => (
          <Link
            href={tool.url}
            target="_blank"
            rel="noreferrer noopener"
            key={tool._id}
            className="flex items-center border p-2 rounded-lg hover:bg-gray-100 transition h-15"
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              width={40}
              height={40}
              style={{
                objectFit: "cover",
              }}
            />
            <p className="text-gray-700 text-lg ml-2">{tool.name}</p>
          </Link>
        ))}
      </div>

      <Image
        src={project.image}
        alt={project.name}
        height={1080}
        width={1920}
        className="mt-10 border-2 border-gray-700 object-cover rounded-xl h-[500px]"
      />
      <div className="text-lg text-gray-700 mt-5">
        <PortableText
          value={project.content}
          components={myPortableTextComponents}
        />
      </div>
    </div>
  );
}
