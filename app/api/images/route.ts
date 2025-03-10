import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public/images");
  let imageFiles = fs.readdirSync(imagesDir);
  imageFiles = imageFiles.sort((a: string, b: string) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
  return NextResponse.json(imageFiles);
}
