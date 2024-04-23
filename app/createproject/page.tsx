"use client"

import { TextInput, Select, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import {phases,url} from '../constants'
import getData from '../../components/getData'
import { useRouter } from 'next/navigation'

export default function CreateProject(){
  const router = useRouter();
  async function handleAddProject(values){
    const res = await getData(`${url}api/addproject`,"POST",values);
    console.log(res)
    if(!res.message) return; 
    router.push(`/projects/${res.message.id}}`)
  }

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: "",
      startDate: "",
      endDate: "",
      phase: "",
      description: '',
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
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleAddProject(values))}>
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
        <TextInput
          withAsterisk
          label="Description"
          placeholder="project description"
	  {...form.getInputProps('description')}
        />
	
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
    
  )
}
