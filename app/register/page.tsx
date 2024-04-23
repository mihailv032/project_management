'use client';
import { TextInput, Button, Group, Box, Title,Modal} from '@mantine/core';
import { useForm } from '@mantine/form';
import {url} from '../constants'
import getData from '../../components/getData'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Login(){
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();
  async function handleLogin(values){
    
    const res = await getData(`${url}api/register`,"POST",values);
    console.log(res)
    if(!res.message) return setShowMessage(res.error ? res.error : "Something went wrong");  
    router.push(`/login`)
  }

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      user_name: "",
      email: "",
      password: "",
    },

    validate: {
      user_name: (value) => (value.length > 3 ? null : 'User name is too short'),
      email: (value) => (value.includes('@') ? null : 'Invalid email'),
      password: (value) => (value.length > 3 ? null : 'Password is too short'),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <Modal centered={true} opened={showMessage} onClose={() => setShowMessage(false) } title="Login">
        <Title order={2}>{showMessage}</Title>
      </Modal>
      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
	<TextInput withAsterisk label="User Name" placeholder="User Name" {...form.getInputProps("user_name")}/>
         <TextInput
          withAsterisk
          label="Email"
          placeholder="example@domain.com"
	  {...form.getInputProps('email')}
        />
       
        <TextInput
          withAsterisk
          type="password"
          label="Password"
          placeholder="password"
	  {...form.getInputProps('password')}
        />
	
        <Group justify="flex-end" mt="md">
          <Button type="submit">Register</Button>
        </Group>
      </form>
    </Box>
  )
}
