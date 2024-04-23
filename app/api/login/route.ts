import NextResponse from 'next/response'
import prisma from '../../../lib/prisma'
import { type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';


export async function POST(request: NextRequest) {
  try{
    const body = await request.json()
    if(!body.user_name || !body.password){ return Response.json({error: "missing fields"})};
    const user_data = await prisma.user.findUnique({
      where: {
        name: body.user_name
      }
    })
    if(!user_data){ return Response.json({error: "user not found"})};
    console.log(user_data)
    console.log(body)
    if(!bcrypt.compareSync(body.password,user_data.password)){ return Response.json({error: "incorrect password"})};
    const sessionId=uuidv4();
    const session = await prisma.userSession.create({
      data: {
        token: sessionId,
        user_id: user_data.id
      }
    })
    return Response.json({ message: {user: user_data,token:session.token} })
  }catch(e){
    console.log(e)
    return Response.json({error: "could add the project"})
  }
  
}
