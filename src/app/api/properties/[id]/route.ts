import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { id } = await params;

    const property = await prisma.property.delete({
      where: { id }
    });

    return NextResponse.json(property);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const property = await prisma.property.update({
      where: { id },
      data: { ...body }
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("PUT Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
