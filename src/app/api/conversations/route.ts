import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Session } from "next-auth";

export const POST = async (req: Request) => {
  const session: Session | null = await getServerSession(authConfig as any);
  if (!session || !session.user || !session.user.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { messages, type } = body;

    const conversation = await prisma.conversation.create({
      // @ts-ignore
      data: {
        userId: session.user.id,
        messages,
        type,
      },
    });

    return NextResponse.json(
      {
        message: "Success Create Conversation",
        conversation,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Failed to create conversation:", err);
    return NextResponse.json(
      {
        message: "Failed Create Conversation",
        error: err.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextResponse) => {
  // @ts-ignore
  const bot = req.url.split("?")[1];
  try {
    const session: Session | null = await getServerSession(authConfig as any);
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      const conversations = await prisma.conversation.findMany({
        where: {
          userId: session.user.id,
          type: bot,
        },
      });

      console.log(conversations);

      // @ts-ignore
      let conversationsUser = [];

      conversations.map((conversation) => {
        const messages = conversation.messages.map((message) => {
          conversationsUser.push(message);
        });

        return { messages };
      });

      // @ts-ignore
      console.log(conversationsUser);
      return NextResponse.json(
        {
          message: "Success Get Conversation",
          // @ts-ignore
          conversations: conversationsUser,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Failed to get conversation:", error);
    return NextResponse.json(
      {
        message: "Failed Get Conversation",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
