export const maxDuration = 60; // This function can run for a maximum of 60 seconds
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextResponse } from 'next/server';

const client = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_APPLICATION_API_KEY
});

export async function POST(request: Request) {
  try {
    const { text, voiceName } = await request.json();
    
    const request_tts = {
      input: { text },
      voice: { 
        languageCode: 'ja-JP',
        name: voiceName
      },
      audioConfig: { audioEncoding: 'MP3' as const },
    };

    const [response] = await client.synthesizeSpeech(request_tts);
    const audioContent = response.audioContent?.toString();
    
    return NextResponse.json({ audioContent });
  } catch (error) {
    console.error('Error in TTS:', error);
    return NextResponse.json({ error: 'TTS processing failed' }, { status: 500 });
  }
}