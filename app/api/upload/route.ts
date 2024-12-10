import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { exec } from "child_process";

// Utility to turn exec into a promise
function execPromise(command: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject({ error, stderr });
      else resolve({ stdout, stderr });
    });
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Create the uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Create a unique filename
    const sanitizedName = file.name.replace(/\s+/g, '');
    const fileName = `${Date.now()}-${sanitizedName}`;
    const filePath = join(uploadDir, fileName);

    // Write the uploaded file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Make the file executable (if it's supposed to be an executable)
    // This step assumes a Unix-like environment.
    // If you're on Windows, you'll have to adjust this logic.
    await execPromise(`chmod +x ${filePath}`);
    
    // Run the uploaded file
    // Be extremely careful with this. Validate the filename and path before running.
    try{
      const { stdout } = await execPromise(filePath);
    }
    catch (error: any){
      console.log("Execution error" + error)
    }

    return NextResponse.json({ 
      success: true,
      fileName: fileName,
      filePath: `/uploads/${fileName}`,
      output: filePath
    });
  } catch (error: any) {
    console.error("Execution error:", error);
    return NextResponse.json(
      { error: "Failed to upload or run file", details: error?.message },
      { status: 500 }
    );
  }
}
