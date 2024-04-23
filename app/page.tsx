"use client"

import { Title } from '@mantine/core';
import Projects from "./_components/projects";


export default function Home() {

  return (
    <main className="min-h-screen bg-white space-y-4 px-4 flex items-center flex-col">
      <Title order={1}>Projects</Title>
      <Projects />
    </main>
  );
}


