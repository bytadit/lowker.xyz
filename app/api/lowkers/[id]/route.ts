import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lowker = await prisma.lowker.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(lowker);
  } catch (error) {
    console.log("ERROR DELETING LOWKER: ", error);
    return NextResponse.json({ error: "Error deleting lowker", status: 500 });
  }
}
