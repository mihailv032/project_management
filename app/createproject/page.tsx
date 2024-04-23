"use client"

import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';

export default function CreateProject(){
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
	return null;
      },
      endDate: (value) =>{
	return null;
      },
      phase: (value) => (value.length > 3 ? null : 'Phase is too short'),
      description: (value) => (value.length > 10 ? null : 'Description is too short'),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
	<TextInput withAsterisk label="Title" placeholder="project title" />
	<DateInput withAsterisk valueFormat="DD MMM YYYY" label="Select start date"
		   placeholder={`e.g ${new Date().toString().slice(3,10)}`}
		   {...form.getInputProps("startDate")}
	/>
	<DateInput withAsterisk valueFormat="DD MMM YYYY" label="Select end date"
		   placeholder={`e.g ${new Date().toString().slice(3,10)}`}
		   {...form.getInputProps("endDate")}
	/> 
	
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
