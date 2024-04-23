import NextResponse from 'next/response'
import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try{
    const body = await request.json()
    console.log("here")
    console.log(body)
    const data = await prisma.project.create({
      data: {
	name: body.title,
	start_date: body.startDate,
	end_date: body.endDate,
	description: body.description,
	phase: body.phase,
	owner_id: 1,
      },
    })
    console.log("here")
    console.log(data)
    return Response.json({ message: data })
  }catch(e){
    console.log(e)
    return Response.json({error: "could add the project"})
  }
  
}
