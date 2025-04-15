'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import AudioUploader from './components/AudioUploader';
import VisualizerCanvas from './components/VisualizerCanvas';
import VisualizerControls from './components/VisualizerControls';

export default function MusicVisualization() {
  // 상태 관리
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualizationType, setVisualizationType] = useState<'waveform' | 'frequency' | 'circular'>('waveform');
  const [colorScheme, setColorScheme] = useState<'default' | 'rainbow' | 'monochrome'>('default');
  
  // AudioContext 관리
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const isAudioContextClosedRef = useRef(false);
  
  // AudioContext 초기화
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current && !isAudioContextClosedRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioContextRef.current = new AudioContext();
        isAudioContextClosedRef.current = false;
      }
    }

    return () => {
      if (audioContextRef.current && !isAudioContextClosedRef.current) {
        try {
          // AudioContext 상태 확인 후 닫기
          if (audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            isAudioContextClosedRef.current = true;
          }
        } catch (error) {
          console.error('Error closing AudioContext:', error);
        }
        audioContextRef.current = null;
      }
    };
  }, []);

  // 오디오 파일 로드 처리
  const handleAudioLoaded = useCallback((newAudioBuffer: AudioBuffer) => {
    setAudioBuffer(newAudioBuffer);
    setIsPlaying(false);
  }, []);

  // 재생/일시정지 토글
  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // 다시 시작
  const handleRestart = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      // 약간의 지연 후 다시 재생 시작
      setTimeout(() => setIsPlaying(true), 50);
    } else {
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // 페이지를 떠날 때 리소스 정리
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (audioContextRef.current && !isAudioContextClosedRef.current) {
        try {
          if (audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            isAudioContextClosedRef.current = true;
          }
        } catch (error) {
          console.error('Error closing AudioContext on page unload:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">음악 시각화 도구</h1>
            <p className="text-gray-600">
              음악 파일(MP3, WAV 등)을 업로드하여 시각적으로 음파를 확인해보세요
            </p>
          </div>
          <Link href="/" className="mt-4 md:mt-0 text-blue-600 hover:text-blue-800 flex items-center">
            ← 홈으로 돌아가기
          </Link>
        </header>

        <div className="space-y-6">
          {/* 파일 업로드 섹션 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">음악 파일 업로드</h2>
            <AudioUploader onAudioLoaded={handleAudioLoaded} />
          </section>

          {/* 시각화 섹션 (오디오 파일이 로드된 경우에만 표시) */}
          {audioBuffer && (
            <>
              {/* 재생 컨트롤 */}
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">재생 제어</h2>
                <VisualizerControls
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onRestart={handleRestart}
                  visualizationType={visualizationType}
                  setVisualizationType={setVisualizationType}
                  colorScheme={colorScheme}
                  setColorScheme={setColorScheme}
                />
              </section>

              {/* 시각화 캔버스 */}
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">음악 시각화</h2>
                <div className="h-[400px]">
                  <VisualizerCanvas
                    audioContext={audioContextRef.current}
                    audioBuffer={audioBuffer}
                    isPlaying={isPlaying}
                    visualizationType={visualizationType}
                    colorScheme={colorScheme}
                  />
                </div>
              </section>
            </>
          )}

          {/* 사용 방법 안내 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">사용 방법</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>위 섹션에서 음악 파일을 업로드하세요 (MP3, WAV 등 오디오 파일)</li>
              <li>시각화 타입과 색상 스킴을 선택하세요</li>
              <li>재생 버튼을 눌러 시각화를 시작하세요</li>
              <li>다양한 시각화 옵션을 실험해보세요</li>
            </ol>
          </section>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Web Audio API와 Canvas로 구현된 음악 시각화 도구</p>
        </footer>
      </div>
    </main>
  );
}
