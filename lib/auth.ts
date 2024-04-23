import prisma from './prisma'

export default async function isAuthentificatd(token: string) {
  try{
    const userSession = await prisma.userSession.findUnique({
      where: {
        token: token,
      },
    })
    console.log('UserSession:', userSession)
    return userSession;
  }catch(err){
    console.log(err)
    return false;
  }
}

