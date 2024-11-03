import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextResponse } from 'next/server';

const client = new TextToSpeechClient({
  // credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!)
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
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request_tts);
    const audioContent = response.audioContent?.toString('base64');
    
    return NextResponse.json({ audioContent });
  } catch (error) {
    console.error('Error in TTS:', error);
    return NextResponse.json({ error: 'TTS processing failed' }, { status: 500 });
  }
}