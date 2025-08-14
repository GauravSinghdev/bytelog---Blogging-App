
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { emailSchema, nameSchema, passwordSchema } from "@/lib/cred-schema";
import prisma from "@/lib/db";

export async function GET(){
  return NextResponse.json({
    message: "API for register"
  })
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: "Username, Email or password are requried",
        },
        { status: 400 }
      );
    }

    const nameValidation = nameSchema.safeParse(username)

    if (!nameValidation.success) {
      return NextResponse.json(
        {
          error: nameValidation.error.issues[0].message
        },
        { status: 400 }
      );
    }

    const emailValidation = emailSchema.safeParse(email);

    if (!emailValidation.success) {
      return NextResponse.json(
        {
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already present",
        },
        { status: 400 }
      );
    }

    const passwordValidation = passwordSchema.safeParse(password);

    if (!passwordValidation.success) {
      return NextResponse.json(
        {
          error: passwordValidation.error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(passwordValidation.data, 10);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
        role: "User",
        provider: "Credentials",
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully.",
        newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json(
      {
        message: "Failed to register user",
      },
      { status: 501 }
    );
  }
}