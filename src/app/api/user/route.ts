//api/user

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import bcrypt from "bcrypt";

export const GET = async (req: Request) => {

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createAt: true,
        updateAt: true,
        conversations: {
          select: {
            id: true,
            messages: true,
            createAt: true,
          },
        },
        sessions: {
          select: {
            id: true,
            sessionToken: true,
            expires: true,
          },
        },
        accounts: {
          select: {
            id: true,
            type: true,
            provider: true,
            providerAccountId: true,
            refresh_token: true,
            access_token: true,
            expires_at: true,
            token_type: true,
            scope: true,
            id_token: true,
            session_state: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        message: "Success Get User",
        users,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed Get User",
        err,
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Success Create User",
        user,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed Create User",
        err,
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: Request) => {
  const session = await getServerSession(authConfig as any);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, email, password } = body;
    const hashPassword = await bcrypt.hash(password, 12);
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        email,
        password: hashPassword,
      },
    });
    return NextResponse.json(
      {
        message: "Success Update User",
        updateUser,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed Update User",
        err,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await prisma.user.delete({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json(
      {
        message: "Success Delete User",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed Delete User",
        err,
      },
      { status: 500 }
    );
  }
};
