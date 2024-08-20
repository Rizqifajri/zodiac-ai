import { authConfig } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authConfig as any);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ posts });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authConfig as any);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try{
    const body = await request.json();
    const { title, content } = body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            // @ts-ignore
            id: session?.user.id,
          },
        },
      },
    });
    return NextResponse.json({
      post
    })
  }catch(error){
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

