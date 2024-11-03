'use client';
import { useState } from 'react';

// 日本語の音声タイプの定義
const VOICE_TYPES = [
  // Standard voices (標準)
  { name: '標準音声 A（女性）', value: 'ja-JP-Standard-A', gender: 'FEMALE' },
  { name: '標準音声 B（女性）', value: 'ja-JP-Standard-B', gender: 'FEMALE' },
  { name: '標準音声 C（男性）', value: 'ja-JP-Standard-C', gender: 'MALE' },
  { name: '標準音声 D（男性）', value: 'ja-JP-Standard-D', gender: 'MALE' },
  // Neural2 voices (プレミアム)
  { name: 'Neural2 B（女性）', value: 'ja-JP-Neural2-B', gender: 'FEMALE' },
  { name: 'Neural2 C（男性）', value: 'ja-JP-Neural2-C', gender: 'MALE' },
  { name: 'Neural2 D（男性）', value: 'ja-JP-Neural2-D', gender: 'MALE' },
  // Wavenet voices (プレミアム)
  { name: 'Wavenet A（女性）', value: 'ja-JP-Wavenet-A', gender: 'FEMALE' },
  { name: 'Wavenet B（女性）', value: 'ja-JP-Wavenet-B', gender: 'FEMALE' },
  { name: 'Wavenet C（男性）', value: 'ja-JP-Wavenet-C', gender: 'MALE' },
  { name: 'Wavenet D（男性）', value: 'ja-JP-Wavenet-D', gender: 'MALE' },
];

export default function TTSForm() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceType, setVoiceType] = useState(VOICE_TYPES[0].value);

  const handlePlayPause = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text,
          voiceName: voiceType
        }),
      });

      if (!response.ok) throw new Error('TTS request failed');
      
      const data = await response.json();
      const newAudio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      setAudio(newAudio);
      newAudio.addEventListener('ended', () => setIsPlaying(false));
      newAudio.play();
      setIsPlaying(true);
    } catch (err) {
      setError('音声の生成に失敗しました。もう一度お試しください。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <textarea
        className="w-full p-2 border rounded-md mb-4 h-32 text-black"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="変換したいテキストを入力してください"
        required
      />
      
      <div className="flex gap-4 mb-4 text-black">
        <select
          value={voiceType}
          onChange={(e) => setVoiceType(e.target.value)}
          className="p-2 border rounded-md"
        >
          {VOICE_TYPES.map((voice) => (
            <option key={voice.value} value={voice.value}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? '変換中...' : '音声に変換'}
        </button>

        {audio && (
          <button
            type="button"
            onClick={handlePlayPause}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            {isPlaying ? '停止' : '再生'}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
    </form>
  );
}