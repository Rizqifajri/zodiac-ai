import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';

// Handler for GET requests
export async function GET(req: NextRequest) {
  const session = await getServerSession(authConfig as any);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
    return NextResponse.json({ comments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig as any);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { postId, content } = await req.json();

    if (!postId || !content) {
      return NextResponse.json({ error: 'Post ID and content are required' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        //@ts-ignore
        authorId: session.user.id,
      },
      include: { author: true },
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
