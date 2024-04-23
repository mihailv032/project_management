import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'


export async function POST(request: NextRequest) {
  try{
    const body = await request.json()
    console.log(body)
    if(!body.token || !body.user_id){
      return Response.json({error: "missing fields"})
    }

    const res = await prisma.userSession.delete({
      where: {
        user_id_token: {
	  user_id: body.user_id,
	  token: body.token
        }
      }
    })
    return Response.json({ message: "successfully logged out user" })
  }catch(e){
    console.log(e)
    return Response.json({error: "could not logout user"})
  }
}
