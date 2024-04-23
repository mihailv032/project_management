import { useState, useEffect } from 'react';
import { DatePicker } from '@mantine/dates';
import getData from '../../components/getData';

export default function GetProjectInDateRange({url,setData}){
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    async function getProjects(){
      const res = await getData(`${url}?start_date=${value[0].toISOString()}&end_date=${value[1].toISOString()}`,"GET")
      console.log(res)
      if(!res.message){return}
      const projects = res.message;
      projects.forEach((project:Project) =>{
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date)
        project.created_at = new Date(project.created_at)
        project.updated_at = new Date(project.updated_at)
      })
      setData(projects)
      
    }
    if (value[0] && value[1]) {
      setOpened(false);
      getProjects();
    }
  }, [value]);
  return (
    <div onFocus={() => setOpened(true)} >
      <input name="" type="text" value={ () => {
	let res = value[0] ? `${value[0]?.getDay()}/${value[0]?.getMonth()+1}/${value[0]?.getFullYear()}` : '';
	res += value[1] ? `- ${value[1]?.getDay()}/${value[1]?.getMonth()+1}/${value[1]?.getFullYear()} ` : '';
	return res;
      }}
	     onFocus={() => setOpened(true)} placeholder='select date range' />
      {opened && <DatePicker type="range" allowSingleDateInRange value={value} onChange={setValue} />}
    </div>
    
  )
}