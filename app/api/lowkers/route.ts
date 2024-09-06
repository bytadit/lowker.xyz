import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { now } from "moment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const {
      title,
      company,
      description,
      qualification,
      deadline,
      duration,
      type,
      location,
      salary,
      experience,
      source,
    } = await req.json();

    if (
      !title ||
      !company ||
      !deadline ||
      !duration ||
      !type ||
      !location ||
      !salary ||
      !experience ||
      !source
    ) {
      return NextResponse.json({
        error: "Missing Required fields",
        status: 400,
      });
    }

    const lowker = await prisma.lowker.create({
      data: {
        title,
        company,
        description,
        qualification,
        deadline: new Date(deadline), // Ensure deadline is passed as a Date
        datePosted: new Date(),
        duration: parseInt(duration), // Ensure duration is an integer
        type,
        location,
        salary,
        experience,
        source,
        createdBy: userId,
      },
    });

    return NextResponse.json(lowker);
  } catch (error) {
    console.log("ERROR CREATING LOWKER: ", error);
    return NextResponse.json({ error: error, status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const lowkers = await prisma.lowker.findMany();
    return NextResponse.json(lowkers);
  } catch (error) {
    console.log("ERROR GETTING LOWKERS: ", error);
    return NextResponse.json({ error: "Error updating lowker", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const {id, title, company, description, qualification, deadline, duration, type, location, salary, experience, source } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const lowker = await prisma.lowker.update({
      where: {
        id,
      },
      data: {
        title,
        company,
        description,
        qualification,
        deadline,
        duration,
        type,
        location,
        salary,
        experience,
        source,
      },
    });

    return NextResponse.json(lowker);
  } catch (error) {
    console.log("ERROR UPDATING LOWKER: ", error);
    return NextResponse.json({ error: "Error deleting lowker", status: 500 });
  }
}
