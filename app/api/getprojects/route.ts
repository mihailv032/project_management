import NextResponse from 'next/response'
import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try{
    const searchParams = request.nextUrl.searchParams
    const name = searchParams.get('name')
    const where = {
      deleted: false,
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
