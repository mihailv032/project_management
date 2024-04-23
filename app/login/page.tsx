'use client';
import { TextInput, Button, Group, Box,Title,Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import {url} from '../constants'
import getData from '../../components/getData'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useContext } from 'react';
import {AppContext} from '../_components/appContext'

export default function Login(){
  const [showMessage, setShowMessage] = useState(false);
  const {setUser,setLoggedIn} = useContext(AppContext);
  
  const router = useRouter();
  async function handleLogin(values){
    const res = await getData(`${url}api/login`,"POST",values);
    console.log(res)
    if(!res.message) return setShowMessage(res.error ? res.error : "Something went wrong");
    localStorage.setItem('token',res.message.token);
    localStorage.setItem('user',JSON.stringify(res.message.user));
    setUser(res.message.user);
    setLoggedIn(true);
    router.push(`/`)
  }

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      user_name: "",
      password: "",
    },

    validate: {
      user_name: (value) => (value.length > 3 ? null : 'User name is too short'),
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
          type="password"
          label="Password"
          placeholder="password"
	  {...form.getInputProps('password')}
        />
	
        <Group justify="flex-end" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>

      <Group justify="flex-end" mt="md" className='flex-col'>
          <Title order={6}>Do not have an accout ?</Title>
          <Button component={Link} href={`/register`}>Register</Button>
        </Group>
    </Box>
  )
}
