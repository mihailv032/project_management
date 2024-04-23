
export default async function getData(url:string,method:string,body:any){
  try{
    const options = {
      mode: 'cors',
      method: method,
      headers: { 'Content-Type': 'application/json'},
      
    };
    method !== "GET" ? options.body = JSON.stringify(body) : null;
    const req = await fetch(url,options)
    
    return await req.json()
  }catch(err){
    console.log(url)
    console.log(err)
    return false
  }
}
