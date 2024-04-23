import Image from "next/image";
import Link from "next/link";
import prisma from "../lib/prisma";
import { Project } from "@prisma/client";
import { Title,Textarea } from '@mantine/core';

async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return projects;
}

export default async function Home() {
  const projects = await getProjects();
  return (
    <main className="min-h-screen bg-white">
      {
        projects.map((project:Project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.name}
            start_date={project.start_date}
            description={project.description}
          />
        ))
      }
    </main>
  );
}

function ProjectCard({ id,title, start_date,description}: { title: string, description: string, start_date: string, id: number }) {
  return (
    <Link href={`/${id}`}>
          <Title order={3}>{title}</Title>
          <Title order={3}>{start_date}</Title>
          <Textarea description="description" value={description} />
    </Link>
  )
}
