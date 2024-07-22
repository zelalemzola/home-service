import { connectdb } from "@/lib/config/db";
import Maid from "@/lib/models/Maid";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectdb();
};
LoadDB();

export async function GET(request, { params }) {
  const { id } = params;
  const maid = await Maid.findById(id).populate('category');
  return NextResponse.json({ maid });
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const maid = await Maid.findById(id);
  const updatedFields = await request.json();
  Object.assign(maid, updatedFields);
  await maid.save();
  return NextResponse.json({ maid });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await Maid.findByIdAndDelete(id);
  return NextResponse.json({ message: "Maid deleted successfully" });
}
