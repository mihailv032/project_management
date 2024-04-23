import NextResponse from 'next/response'
import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';


export async function POST(request: NextRequest) {
  try{
    const body = await request.json()
    console.log(body)
    if(!body.token || !body.user_id){
      return Response.json({error: "missing fields"})
    }

    const user = await prisma.userSession.findUnique({
      where: {
        user_id: body.user_id,
        token: body.token
      }
    })
    console.log(user)
    if(!user){
      return Response.json({error: "invalid token"})
    }
    return Response.json({ message: "successfully added a new user" })
  }catch(e){
    console.log(e)
    return Response.json({error: "could not add user"})
  }
}
