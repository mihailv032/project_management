import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'


export async function POST(request: NextRequest) {
  try{
    const body = await request.json()
    const headersList = headers()
    const token = headersList.get('token')

    if(!body.project_id || !body.owner_id){
      return Response.json({error: "missing fields"})
    }
    const user = await prisma.userSession.findUnique({
      where: {
        user_id: body.owner_id,
        token: token
      }
    })
    if(!user){
      return Response.json({error: "you are not authorised"})
    }
    const res = await prisma.project.delete({
      where: {
	  id: body.project_id
        }
    })
    return Response.json({ message: "successfully deleted project" })
  }catch(e){
    console.log(e)
    return Response.json({error: "could not delete project"})
  }
}
