import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET() {
  try {
    const imageBuffer = await sharp('public/image.png')
      .resize({ width: 36 * 192 / 72, height: 644 * 192 / 72, fit: 'contain' }) // Scale to 192 PPI
      .jpeg({ quality: 77 }) // Approx 23% compression for RGB, adjusted for smask
      .toBuffer();
    return new NextResponse(imageBuffer, {
      headers: { 'Content-Type': 'image/jpeg' },
    });
  } catch (error) {
    console.error('Image processing failed:', error);
    return new NextResponse(JSON.stringify({ error: 'Image processing failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}