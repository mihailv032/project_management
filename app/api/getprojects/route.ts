import NextResponse from 'next/response'
import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try{
    const searchParams = request.nextUrl.searchParams
    const name = searchParams.get('name')
    const start_date = searchParams.get('start_date')
    const where = {
      deleted: false,
    }
    if(start_date){
      const end_date = searchParams.get('end_date')
      if(!end_date) return Response.json({error: "end date is required"})
      console.log("start_date", start_date)
      where.start_date = {
	gte: new Date(start_date),
	lte: new Date(end_date)
      }
      where.end_date = {
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
    return Response.json({ message: data })
  }catch(e){
    console.log(e)
    return Response.json({error: "could not get the  projects"})
  }
  
}
