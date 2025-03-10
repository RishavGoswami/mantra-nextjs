import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public/images");
  const imageFiles = fs.readdirSync(imagesDir);

  return NextResponse.json(imageFiles);
}
