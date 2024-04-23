"use client";
import { useEffect, useState, useContext } from 'react';
import { Flex,Title,TextInput, Select, Button, Textarea, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { monthNames,phases,url } from '../../../constants';
import getData from '../../../../components/getData';
import { AppContext } from '@/app/_components/appContext';
import { useRouter } from 'next/navigation'
 

export default function ProjectInfo({project}: {project: {owner_id: number, name: string,start_date: Date,end_date: Date,description: string,phase: string}}){
  const {user,loggedIn} = useContext(AppContext);
  const router = useRouter();
  const [isOwner,setIsOwner] = useState(loggedIn && (project.owner_id === user.id));
  const [data,setData] = useState(project);
  const [editing,setEditing] = useState(false);
  useEffect(() => {
    setIsOwner(loggedIn && (project.owner_id === user.id));
  },[loggedIn]);
  async function handleDelete(){
    const res = await getData(`${url}api/deleteproject`,"POST",{project_id: project.id});
    console.log(res);
    if(res.message){
      router.push("/");
      return;
    }
    console.log(res.error ? res.error : "something went wrong");
  }

  return (
    <div>
      {editing ? <EditProject project={data} setEditing={setEditing} updateProject={setData} /> : <ShowProject setEditing={setEditing} project={data}  isOwner={isOwner} handleDelete={handleDelete} />}
    </div>
  )
}

function ShowProject({project,setEditing,isOwner,handleDelete}: {project: {name: string,start_date: Date,end_date: Date,description: string,
                                                              phase: string},setEditing: Function,isOwner: boolean,handleDelete: MouseEventHandler<HTMLButtonElement>}){
  return (
    <Flex className="p-2 space-y-4 rounded-md max-w-[70vw] flex-col">
      <Title order={3}>Title: {project.name}</Title>
      <Title order={3}>Start Date:
        {`${project.start_date.getDate()} ${monthNames[project.start_date.getMonth()]} ${project.start_date.getFullYear()}`}</Title>
      <Title order={3}>End Date: {`${project.end_date.getDate()} ${monthNames[project.end_date.getMonth()]} ${project.end_date.getFullYear()}`}</Title>
      <Title order={3}>Phase: {project.phase}</Title>
      <textarea  value={project.description} readOnly className="border-none" />
      {isOwner && <Button className="max-w-[150px]" onClick={() => setEditing(true)}>Update</Button>}
      <Button className="bg-[#C92A2A] max-w-[150px]" onClick={handleDelete}>Delete</Button>
    </Flex>
  );

}

function EditProject({project,setEditing,updateProject}: {project: {name: string,start_date: Date,end_date: Date,description: string,phase: string},setEditing: Function,updateProject: Function}){
  const [showMessage,setShowMessage] = useState(false);
  async function handleSubmit(values){
    const res = await getData(``,"POST",values);
    setEditing(false);
    if(res.message){
      updateProject(res.message);
      return;
    }
    setShowMessage(res.error ? res.error : "something went wrong");
  }
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: project.name,
      startDate: project.start_date,
      endDate: project.end_date,
      phase: project.phase,
      description: project.description,
    },

    validate: {
      title: (value) => (value.length > 3 ? null : 'Title is too short'),
      startDate: (value) =>{
        console.log(value)
        return Object.prototype.toString.call(value) === '[object Date]' ? null : 'Invalid date';
      },
      endDate: (value) =>Object.prototype.toString.call(value) === '[object Date]' ? null : 'Invalid date',
      phase: (value:Phase) => (phases.includes(value) ? null : 'Invalid phase selected'),
      description: (value) => (value.length > 10 ? null : 'Description is too short'),
    },
  });

  return (
    <Flex className="p-2 space-y-6 rounded-md max-w-[70vw] flex-col">
      <Modal centered={true} opened={showMessage} onClose={() => setShowMessage(false) } title="Update Project">
        <Title order={2}>{showMessage}</Title>
      </Modal>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
	<TextInput withAsterisk label="Title" placeholder="project title" {...form.getInputProps("title")}/>
	<DateInput withAsterisk valueFormat="DD MMM YYYY" label="Select start date"
		   placeholder={`e.g ${new Date().toString().slice(3,10)}`}
		   {...form.getInputProps("startDate")}
	/>
	<DateInput withAsterisk valueFormat="DD MMM YYYY" label="Select end date"
		   placeholder={`e.g ${new Date().toString().slice(3,10)}`}
		   {...form.getInputProps("endDate")}
	/> 
	<Select withAsterisk label="Phase" placeholder="project phase" data={phases} {...form.getInputProps("phase")}/>
        <Textarea
          withAsterisk
          label="Description"
          placeholder="project description"
	  {...form.getInputProps('description')}
        />
	
        <Button className="max-w-[150px]" type="submit">Update</Button>
        <Button className="bg-[#C92A2A]" onClick={() => setEditing(false) }>Cancel</Button>
      </form>
    </Flex> 
  );
  
}
