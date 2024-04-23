import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'
import isAuthorized from '../../../lib/auth'

export async function POST(request: NextRequest) {
  try{
    const body = await request.json()
    console.log("body ",body)
    if(!body.project_id){
      return Response.json({error: "missing fields"})
    }
    if(!body.values.name || !body.values.description || !body.values.start_date || !body.values.end_date || !body.values.phase){
      return Response.json({error: "missing fields"})
    }
    const headersList = headers()
    const token = headersList.get('token')
    if(!token){
      return Response.json({error: "you are not authorised"})
    }
    const authorised = await isAuthorized(token)
    console.log("authorised ",authorised)
    if(!authorised){
      return Response.json({error: "you are not authorised"})
    }
    const project = await prisma.project.findUnique({
      where: {
        id: body.project_id
      }
    })
    if(!project){
      return Response.json({error: "project not found"})
    }
    if(project.owner_id !== authorised.user_id){
      return Response.json({error: "project not found"})
    }
    const res = await prisma.project.update({
      data: body.values,
      where: {
        id: body.project_id
      }
    })
    return Response.json({ message: res })
  }catch(e){
    console.log(e)
    return Response.json({error: "could not delete project"})
  }
}
