"use client"

import {useEffect, useState} from 'react'
import {Project} from '@prisma/client'
import {monthNames,url} from './constants'
import { Title,Button,Flex } from '@mantine/core';
import Link from "next/link";
import GetProjectInDateRange from './_components/datarange'
import getData from '@/components/getData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

export default function Home() {

  return (
    <main className="min-h-screen bg-white space-y-4 px-4 flex items-center flex-col">
      <Title order={1}>Projects</Title>
      <Projects />
    </main>
  );
}


function Projects(){
  const [projects, setProjects] = useState<Project[]>([])
  console.log(projects)
  async function getProjects(){
    console.log('here')
    const res = await getData(`${url}api/getprojects`, "POST",{})
    if(!res.message) return;
    const projects = res.message;
    projects.forEach((project:Project) =>{
      project.start_date = new Date(project.start_date);
      project.end_date = new Date(project.end_date)
      project.created_at = new Date(project.created_at)
      project.updated_at = new Date(project.updated_at)
    })

    console.log(projects)
    setProjects(projects)
  }
  useEffect(() => {
    getProjects()
  }, [])
  if (projects.length === 0) return <div><GetProjectInDateRange onClear={getProjects} setData={setProjects} url={`${url}api/getprojects`}/><h1>No Projects Found</h1></div>
  return (
    <div className='space-y-4'>
      <Flex>
        <GetProjectInDateRange setData={setProjects} url={`${url}api/getprojects`} onClear={getProjects} />
        <FontAwesomeIcon icon={faArrowRotateRight} onClick={getProjects} />
      </Flex>
      {
        projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.name}
            start_date={`${project.start_date.getDate()} ${monthNames[project.start_date.getMonth()]} ${project.start_date.getFullYear()}`}
            description={project.description}
          />
        ))
      }
    </div>
  )
}

function ProjectCard({ id,title, start_date,description}: { title: string, description: string, start_date: string, id: number }) {
  return (
    <Flex className="border-2 p-2 space-x-14 rounded-md max-w-[70vw] md:flex-row flex-col items-baseline px-4">
      <Title className="m-0 w-[200px] overflow-y-auto" order={3}>Title: {title}</Title>
      <Title className="m-0" order={3}>Start Date: {start_date}</Title>
      <textarea  value={description} readOnly className="border-none m-0" />
      <Button component={Link} href={`/projects/${id}`}>See More</Button>
    </Flex>
  )
}
