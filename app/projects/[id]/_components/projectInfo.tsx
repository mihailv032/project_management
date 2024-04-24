"use client";
import { useEffect, useState, useContext } from 'react';
import { Flex,Title,TextInput, Select, Button, Textarea, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { monthNames,phases,url } from '../../../constants';
import getData from '../../../../components/getData';
import { AppContext } from '@/app/_components/appContext';
import { useRouter } from 'next/navigation'

export default function ProjectInfo({project}: {project: {owner_id: number, name: string,start_date: Date,end_date: Date,description: string,phase: string}}){
  const [showMessage,setShowMessage] = useState(false);
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
      <Modal centered={true} opened={showMessage} onClose={() => setShowMessage(false) } title="Update Project">
        <Title order={2}>{showMessage}</Title>
      </Modal>

      {editing ? <EditProject setShowMessage={setShowMessage} project={data} setEditing={setEditing} updateProject={setData} /> : <ShowProject setEditing={setEditing} project={data}  isOwner={isOwner} handleDelete={handleDelete} />}
    </div>
  )
}

function ShowProject({project,setEditing,isOwner,handleDelete}: {project: {name: string,start_date: Date,end_date: Date,description: string,
                                                              phase: string},setEditing: Function,isOwner: boolean,handleDelete: MouseEventHandler<HTMLButtonElement>}){
  return (
    <Flex className="p-2 space-y-4 rounded-md max-w-[70vw] flex-col items-baseline align-baseline">
      <Title order={3} >Title: {project.name}</Title>
      <Title order={3}>Start Date:
        {`${project.start_date?.getDate()} ${monthNames[project.start_date?.getMonth()]} ${project.start_date?.getFullYear()}`}</Title>
      <Title order={3}>End Date: {`${project.end_date?.getDate()} ${monthNames[project.end_date?.getMonth()]} ${project.end_date?.getFullYear()}`}</Title>
      <Title order={3}>Phase: {project.phase}</Title>
      <textarea  value={project.description} readOnly className="border-none" />
      {isOwner && <Button className="max-w-[150px]" onClick={() => setEditing(true)}>Update</Button>}
      {isOwner && <Button className="bg-[#C92A2A] max-w-[150px]" onClick={handleDelete}>Delete</Button>}
    </Flex>
  );

}

function EditProject({project,setEditing,updateProject,setShowMessage}: {project: {name: string,id:number,start_date: Date,end_date: Date,description: string,phase: string},setEditing: Function,updateProject: Function,setShowMessage: Function}){
  async function handleSubmit(values){
    console.log(project.project_id);
    const res = await getData(`${url}api/updateproject`,"POST",{project_id: project.id, values: values});
    console.log(res);
    setEditing(false);
    if(res.message){
      res.message.start_date = new Date(res.message.start_date);
      res.message.end_date = new Date(res.message.end_date);
      updateProject(res.message);
      return;
    }
    setShowMessage(res.error ? res.error : "something went wrong");
  }
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: project.name,
      start_date: project.start_date,
      end_date: project.end_date,
      phase: project.phase,
      description: project.description,
    },

    validate: {
      name: (value) => (value.length > 3 ? null : 'Title is too short'),
      start_date: (value) =>{
        console.log(value)
        return Object.prototype.toString.call(value) === '[object Date]' ? null : 'Invalid date';
      },
      end_date: (value) =>Object.prototype.toString.call(value) === '[object Date]' ? null : 'Invalid date',
      phase: (value:Phase) => (phases.includes(value) ? null : 'Invalid phase selected'),
      description: (value) => (value.length > 10 ? null : 'Description is too short'),
    },
  });

  return (
    <Flex className="p-2 space-y-6 rounded-md max-w-[70vw] flex-col">
      <form onSubmit={form.onSubmit(handleSubmit)}>
	<TextInput withAsterisk label="Title" placeholder="project title" {...form.getInputProps("name")}/>
	<DateInput withAsterisk valueFormat="DD MMM YYYY" label="Select start date"
		   placeholder={`e.g ${new Date().toString().slice(3,10)}`}
		   {...form.getInputProps("start_date")}
	/>
	<DateInput withAsterisk valueFormat="DD MMM YYYY" label="Select end date"
		   placeholder={`e.g ${new Date().toString().slice(3,10)}`}
		   {...form.getInputProps("end_date")}
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
