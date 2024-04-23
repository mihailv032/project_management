import NextResponse from 'next/response'
import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try{
    const body = await request.json()
    const name = body.name
    const start_date = body.start_date
    const where = {
      deleted: false,
    }
    if(start_date){
      const end_date = body.end_date
      if(!end_date) return Response.json({error: "end date is required"})
      console.log("start_date", start_date)
      where.start_date = {
	gte: new Date(start_date),
	lte: new Date(end_date)
      }
    }

    if(name){
      where.name = {
        contains: name
      }
    }
    const data = await prisma.project.findMany({
      where: where,
    })
    if(!data) return Response.json({error: "could not get the  projects"})
    return Response.json({ message: data })
  }catch(e){
    console.log(e)
    return Response.json({error: "could not get the  projects"})
  }
  
}
