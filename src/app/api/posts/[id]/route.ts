import { authConfig } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig as any);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: true,
      }
    });

    if (!post) {
      return new NextResponse('Post not found', { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (err) {
    console.error(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE (request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig as any);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const post = await prisma.post.delete({
      where: {
        id: params.id,
      }
    })
    return NextResponse.json({"message": "Successfully deleted", post });
  }catch(error){
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
