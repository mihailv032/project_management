import prisma from "@/lib/prisma";
import { Title } from '@mantine/core';
import ProjectInfo from './_components/projectInfo';

async function getProject(id:number) {
  if(isNaN(id)){
    return null;
  }
  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
    include: {
      owner: {
        select: { name: true,email:true },
      },
    },
  });

  return project;
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(Number(params.id));
  console.log(project);
  if(!project){
    return <div>Project not found</div>
  }

  return (
    <main className="flex px-10 flex-col">
      <Title order={1} className="border-b-2">{project.name}</Title>
      <OwnerInfo user={project.owner} />
      <ProjectInfo project={project} />
    </main>
  );
}

function OwnerInfo({user}: {user: {name: string,email: string}}){
  return (
    <div className="my-10">
      <Title order={3}>Created By: {user.name}</Title>
      <Title order={3}>Owner Email: {user.email}</Title>
    </div>
  );
}

