"use client"
import { useState, useRef, memo, useEffect } from 'react'
import getData from '../../components/getData'
import { Project } from '@prisma/client'

export default function SearchBar({setData,url}: {setData: Function,url: string}){
  const [selectedProject,setSelectedProject] = useState({})
  const [name,setName] = useState("")
  const timeoutRef = useRef()

  function handleSetName(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.value.length === 0) timeoutRef.current = setTimeout(() => setData([]),500)
    else if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setName(e.target.value)
  }

  return(
    <div >
      <input value={name} onChange={(e) => handleSetName(e)} placeholder="Project Name" />
      <div style={{position: 'relative'}}>
	<FindProject selectedProject={selectedProject} setSelectedProject={(val:Project) =>{setSelectedProject(val.name);setData(val)}} project_name={name} url={url}  />
      </div>
    </div>

  )
}

export const FindProject = memo(({project_name,selectedProject,setSelectedProject,url}) => {
  const [projects,setProjects] = useState([])
  const [opened,setOpened] = useState(false)

  useEffect( () => {
    async function getProjects(){
      const  res = await getData(`${url}?name=${project_name}`,"GET")
      console.log(res)
      if(!res.message){return}
      const projects = res.message;
      projects.forEach((project:Project) =>{
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date)
        project.created_at = new Date(project.created_at)
        project.updated_at = new Date(project.updated_at)
      })
      setOpened(true)
      setProjects(projects)
    }
    if (project_name.length >= 3 && selectedProject[0]?.name !== project_name) getProjects()
    if(project_name.length < 3 && opened){setOpened(false);setProjects([])}
  },[project_name]) 
  if(!opened) return;
  return (
    <div >
      {projects.length === 0 && <div >No Project found</div>}
      {projects.map(project =><div key={project.name} onClick={() =>{setOpened(false);setSelectedProject([project])}}>{project.name}</div>)}
    </div>
  )
})
