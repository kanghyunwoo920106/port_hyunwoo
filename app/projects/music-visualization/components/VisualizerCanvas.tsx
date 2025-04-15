import { useEffect, useRef } from 'react';

interface VisualizerCanvasProps {
  audioContext: AudioContext | null;
  audioBuffer: AudioBuffer | null;
  isPlaying: boolean;
  visualizationType?: 'waveform' | 'frequency' | 'circular';
  colorScheme?: 'default' | 'rainbow' | 'monochrome';
}

export default function VisualizerCanvas({
  audioContext,
  audioBuffer,
  isPlaying,
  visualizationType = 'waveform',
  colorScheme = 'default'
}: VisualizerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // 색상 설정
  const getColor = (i: number, max: number) => {
    if (colorScheme === 'rainbow') {
      return `hsl(${(i / max) * 360}, 100%, 50%)`;
    } else if (colorScheme === 'monochrome') {
      const brightness = Math.round((i / max) * 100);
      return `rgb(${brightness}%, ${brightness}%, ${brightness}%)`;
    } else {
      // 기본 색상 (파란색 계열)
      return `rgb(16, ${Math.round(70 + (i / max) * 130)}, ${Math.round(150 + (i / max) * 105)})`;
    }
  };

  // 그라데이션 색상 설정
  const getGradient = (ctx: CanvasRenderingContext2D, height: number) => {
    if (colorScheme === 'rainbow') {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(0.17, 'orange');
      gradient.addColorStop(0.33, 'yellow');
      gradient.addColorStop(0.5, 'green');
      gradient.addColorStop(0.67, 'blue');
      gradient.addColorStop(0.83, 'indigo');
      gradient.addColorStop(1, 'violet');
      return gradient;
    } else if (colorScheme === 'monochrome') {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, 'black');
      return gradient;
    } else {
      // 기본 색상 (파란색 계열)
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(66, 153, 225, 0.9)');
      gradient.addColorStop(0.5, 'rgba(49, 130, 206, 0.7)');
      gradient.addColorStop(1, 'rgba(49, 130, 206, 0.3)');
      return gradient;
    }
  };

  // 리소스 정리 함수
  const cleanupResources = () => {
    // 애니메이션 중지
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // 오디오 소스 중지 및 연결 해제
    if (sourceRef.current) {
      try {
        if (isPlayingRef.current) {
          sourceRef.current.stop();
          isPlayingRef.current = false;
        }
        sourceRef.current.disconnect();
      } catch (error) {
        console.error('Error stopping audio source:', error);
      }
      sourceRef.current = null;
    }

    // 분석기 연결 해제
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch (error) {
        console.error('Error disconnecting analyser:', error);
      }
      analyserRef.current = null;
    }
  };

  // 시각화 시작
  useEffect(() => {
    if (!audioContext || !audioBuffer || !isPlaying || !canvasRef.current) {
      // 재생 중이 아니면 리소스 정리
      if (!isPlaying) {
        cleanupResources();
      }
      return;
    }

    // 기존 리소스 정리
    cleanupResources();

    try {
      // 오디오 소스 생성
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      
      // 분석기 노드 생성
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      
      // 연결: 소스 -> 분석기 -> 출력
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      source.start(0);
      sourceRef.current = source;
      analyserRef.current = analyser;
      isPlayingRef.current = true;
      
      // 애니메이션 시작
      renderFrame();
    } catch (error) {
      console.error('Error starting audio visualization:', error);
    }

    return cleanupResources;
  }, [audioContext, audioBuffer, isPlaying, visualizationType, colorScheme]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return cleanupResources;
  }, []);

  // 페이지 가시성 변경 시 정리
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cleanupResources();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 시각화 렌더링
  const renderFrame = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 캔버스 크기 설정
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    const analyser = analyserRef.current;
    const width = canvas.width;
    const height = canvas.height;
    
    // 배경 지우기
    ctx.fillStyle = 'rgba(10, 15, 30, 0.2)';
    ctx.fillRect(0, 0, width, height);
    
    // 선택된 시각화 타입에 따라 다른 렌더링 실행
    if (visualizationType === 'waveform') {
      renderWaveform(ctx, analyser, width, height);
    } else if (visualizationType === 'frequency') {
      renderFrequency(ctx, analyser, width, height);
    } else if (visualizationType === 'circular') {
      renderCircular(ctx, analyser, width, height);
    }
    
    // 다음 프레임 요청
    animationRef.current = requestAnimationFrame(renderFrame);
  };
  
  // 파형 시각화
  const renderWaveform = (
    ctx: CanvasRenderingContext2D,
    analyser: AnalyserNode,
    width: number,
    height: number
  ) => {
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    
    // 그림자 효과
    ctx.shadowBlur = 10;
    ctx.shadowColor = colorScheme === 'default' ? 'rgba(66, 153, 225, 0.7)' : 
                      colorScheme === 'rainbow' ? 'rgba(255, 255, 255, 0.5)' : 
                      'rgba(255, 255, 255, 0.5)';
    
    // 선 스타일 설정                  
    ctx.lineWidth = 3;
    ctx.strokeStyle = getColor(128, 255);
    ctx.beginPath();
    
    const sliceWidth = width / bufferLength;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // 그림자 초기화
    ctx.shadowBlur = 0;
    
    // 반사 효과 추가
    ctx.globalAlpha = 0.2;
    ctx.scale(1, -1);
    ctx.translate(0, -height);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.resetTransform();
  };
  
  // 주파수 시각화
  const renderFrequency = (
    ctx: CanvasRenderingContext2D,
    analyser: AnalyserNode,
    width: number,
    height: number
  ) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    
    const barWidth = width / (bufferLength / 2.5);
    let x = 0;
    
    // 그림자 효과
    ctx.shadowBlur = 10;
    ctx.shadowColor = colorScheme === 'default' ? 'rgba(66, 153, 225, 0.7)' : 
                      colorScheme === 'rainbow' ? 'rgba(255, 255, 255, 0.5)' : 
                      'rgba(255, 255, 255, 0.5)';
                      
    // 그라데이션 설정
    const gradient = getGradient(ctx, height);
    
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * height;
      
      if (barHeight > 5) { // 노이즈 무시
        // 개별 색상 또는 그라데이션 사용
        ctx.fillStyle = colorScheme === 'rainbow' ? getColor(dataArray[i], 255) : gradient;
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
        
        // 반사 효과 추가
        ctx.globalAlpha = 0.2;
        ctx.fillRect(x, height, barWidth - 1, barHeight * 0.3);
        ctx.globalAlpha = 1;
      }
      
      x += barWidth;
    }
    
    // 그림자 초기화
    ctx.shadowBlur = 0;
  };
  
  // 원형 시각화
  const renderCircular = (
    ctx: CanvasRenderingContext2D,
    analyser: AnalyserNode,
    width: number,
    height: number
  ) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    
    const center = { x: width / 2, y: height / 2 };
    const radius = Math.min(width, height) / 3;
    
    // 그림자 효과
    ctx.shadowBlur = 15;
    ctx.shadowColor = colorScheme === 'default' ? 'rgba(66, 153, 225, 0.7)' : 
                      colorScheme === 'rainbow' ? 'rgba(255, 255, 255, 0.5)' : 
                      'rgba(255, 255, 255, 0.5)';
    
    // 배경 원 그리기
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
    
    // 주파수 라인 그리기
    for (let i = 0; i < bufferLength; i += 3) { // 성능을 위해 모든 값을 그리지 않음
      const barHeight = (dataArray[i] / 255) * (radius * 0.8);
      if (barHeight < 5) continue; // 노이즈 무시
      
      const angle = (i / bufferLength) * Math.PI * 2;
      
      const x1 = center.x + Math.cos(angle) * radius * 0.6;
      const y1 = center.y + Math.sin(angle) * radius * 0.6;
      const x2 = center.x + Math.cos(angle) * (radius * 0.6 + barHeight);
      const y2 = center.y + Math.sin(angle) * (radius * 0.6 + barHeight);
      
      ctx.strokeStyle = getColor(dataArray[i], 255);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      // 끝부분에 작은 원 추가
      if (dataArray[i] > 200) { // 강한 주파수에만 추가
        ctx.beginPath();
        ctx.arc(x2, y2, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }
    }
    
    // 중앙 원 그리기
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius * 0.3, 0, Math.PI * 2);
    
    // 그라데이션
    const gradient = ctx.createRadialGradient(
      center.x, center.y, 0,
      center.x, center.y, radius * 0.3
    );
    
    if (colorScheme === 'default') {
      gradient.addColorStop(0, 'rgba(66, 153, 225, 0.9)');
      gradient.addColorStop(1, 'rgba(49, 130, 206, 0.4)');
    } else if (colorScheme === 'rainbow') {
      gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
      gradient.addColorStop(0.3, 'rgba(255, 165, 0, 0.8)');
      gradient.addColorStop(0.6, 'rgba(0, 128, 0, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 255, 0.8)');
    } else {
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(1, 'rgba(50, 50, 50, 0.4)');
    }
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // 그림자 초기화
    ctx.shadowBlur = 0;
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg overflow-hidden relative">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      {!isPlaying && audioBuffer && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
} 