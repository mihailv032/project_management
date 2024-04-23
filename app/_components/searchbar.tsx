"use client"
import { useState,  memo, useEffect } from 'react'
import getData from '../../components/getData'
import { Project } from '@prisma/client'
import Link from 'next/link'
import {url} from '../constants'

export default function SearchBar(){
  const [name,setName] = useState("")

  function handleSetName(e: React.ChangeEvent<HTMLInputElement>){
    setName(e.target.value)
  }

  return(
    <div >
      <input value={name} onChange={(e) => handleSetName(e)} placeholder="Search For Project By Name" className='border-2 rounded-md p-1' />
      <div style={{position: 'relative'}}>
	<FindProject project_name={name}  />
      </div>
    </div>
  )
}

export const FindProject = memo(({project_name}) => {
  const [projects,setProjects] = useState([])
  const [opened,setOpened] = useState(false)

  useEffect( () => {
    async function getProjects(){
      const  res = await getData(`${url}api/getprojects?name=${project_name}`,"GET")
      console.log(res)
      if(!res.message){return}
      const projects = res.message;
      setOpened(true)
      setProjects(projects)
    }
    if (project_name.length >= 3) getProjects()
    if(project_name.length < 3 && opened){setOpened(false);setProjects([])}
  },[project_name]) 
  if(!opened) return;
  return (
    <div >
      {projects.length === 0 && <div >No Project found</div>}
      {projects.map(project =><Link href={`/projects/${project.id}`} key={project.name} onClick={() =>{setOpened(false);}}>{project.name}</Link>)}
    </div>
  )
})
