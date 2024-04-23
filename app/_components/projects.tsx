"use client"
import {useEffect, useState} from 'react'
import {Project} from '@prisma/client'
import {monthNames,url} from '../constants'
import { Title,Button,Flex } from '@mantine/core';
import Link from "next/link";
import SearchBar from '../_components/searchbar'
import getData from '@/components/getData';

export default function Projects({prj}: {projects: Project[]}){
  const [projects, setProjects] = useState<Project[]>(prj)
  console.log(projects)
  async function getProjects(){
    console.log('here')
    const res = await getData(`${url}/api/getprojects`, "GET")
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
  if (projects.length === 0) return <h1>No Projects Found</h1>
  return (
    <div className='space-y-4'>
      <SearchBar setData={(project:Project) =>{ project.length == 0 ? getProjects() : setProjects(project)}} url={`${url}api/getprojects`} />
      {
        projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.name}
            start_date={`${project.start_date.getDay()} ${monthNames[project.start_date.getMonth()]} ${project.start_date.getFullYear()}`}
            description={project.description}
          />
        ))
      }
    </div>
  )
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
