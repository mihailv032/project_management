import prisma from "../lib/prisma";
import { Title } from '@mantine/core';
import Projects from "./_components/projects";


async function getProjects() {
  const projects = await prisma.project.findMany({
    where: {
     deleted: false,
    },
    select: {
      description: true,
      start_date: true,
      id: true,
      name: true,
    },
    orderBy: {
      start_date: "desc",
    },
  });
  return projects;
}

export default async function Home() {
  const projects = await getProjects();
  console.log(projects)

  return (
    <main className="min-h-screen bg-white space-y-4 px-4 flex items-center flex-col">
      <Title order={1}>Projects</Title>
      <Projects prj={projects} />
    </main>
  );
}


