import Image from "next/image";
import Link from "next/link";
import prisma from "../lib/prisma";
import { Project } from "@prisma/client";
import { Title,Button,Flex } from '@mantine/core';
import {monthNames} from './constants'

async function getProjects() {
  const projects = await prisma.project.findMany({
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
      {
        projects.map((project:Project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.name}
            start_date={`${project.start_date.getDay()} ${monthNames[project.start_date.getMonth()]} ${project.start_date.getFullYear() }`}
            description={project.description}
          />
        ))
      }
    </main>
  );
}

function ProjectCard({ id,title, start_date,description}: { title: string, description: string, start_date: string, id: number }) {
  return (
    <Flex className="border-2 p-2 space-x-14 rounded-md max-w-[70vw]">
      <Title order={3}>Title: {title}</Title>
      <Title order={3}>Start Date: {start_date}</Title>
      <textarea  value={description} readOnly className="border-none" />
      <Button component={Link} href={`/projects/${id}`}>See More</Button>
    </Flex>
  )
}
