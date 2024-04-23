import NextResponse from 'next/response'
import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'
import isAuthorized from '../../../lib/auth'

export async function POST(request: NextRequest) {
  try{
    const headersList = headers()
    const token = headersList.get('token')
    if(!token){
      return Response.json({error: "you are not authorised"})
    }
    const isAuth = await isAuthorized(token)
    if(!isAuth){
      return Response.json({error: "you are not authorised"})
    }
    const body = await request.json()
    if(!body.title || !body.startDate || !body.endDate || !body.description || !body.phase){
      return Response.json({error: "please provide all the fields"})
    }
    const data = await prisma.project.create({
      data: {
	name: body.title,
	start_date: body.startDate,
	end_date: body.endDate,
	description: body.description,
	phase: body.phase,
	owner_id: isAuth.user_id,
      },
    })
    return Response.json({ message: data })
  }catch(e){
    console.log(e)
    return Response.json({error: "could add the project"})
  }
  
}
