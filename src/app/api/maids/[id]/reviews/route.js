// app/api/maids/[id]/review.js
import { connectdb } from "@/lib/config/db";
import Maid from "@/lib/models/Maid";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectdb();
};
LoadDB();

export async function PATCH(request, { params }) {
  const { id } = params;
  const { review } = await request.json();
  const maid = await Maid.findById(id);

  if (!maid) {
    return NextResponse.json({ error: "Maid not found" }, { status: 404 });
  }

  maid.review.push(review);
  await maid.save();

  return NextResponse.json({ maid });
}
