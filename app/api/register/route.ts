import NextResponse from 'next/response'
import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';


export async function POST(request: NextRequest) {
  try{
    const body = await request.json()
    if(!body.user_name || !body.password || !body.email){
      return Response.json({error: "missing fields"})
    }
    const data = {
      name: body.user_name,
      email: body.email
    }
    bcrypt.hash(body.password, 10, async (err,hash) => {
      data.password=hash
      if(err){console.log(err);return Response.json({error: "500"})}
      const user = await prisma.user.create({
        data: data,
      })
      return Response.json({ message: "successfully added a new user" })
    })
    return Response.json({ message: "successfully added a new user" })
  }catch(e){
    console.log(e)
    return Response.json({error: "could not add user"})
  }
}
