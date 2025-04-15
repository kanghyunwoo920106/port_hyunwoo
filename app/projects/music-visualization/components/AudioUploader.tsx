import { useState, useCallback, useRef } from 'react';

interface AudioUploaderProps {
  onAudioLoaded: (audioBuffer: AudioBuffer) => void;
}

export default function AudioUploader({ onAudioLoaded }: AudioUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.includes('audio')) {
      setError('오디오 파일만 업로드 가능합니다.');
      return;
    }

    setFileName(file.name);
    setLoading(true);
    setError(null);

    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      onAudioLoaded(audioBuffer);
    } catch (err) {
      setError('오디오 파일을 처리하는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [onAudioLoaded]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg scale-[1.02]' 
            : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="audio-file"
          accept="audio/*"
          onChange={handleChange}
          className="hidden"
        />
        <label 
          htmlFor="audio-file"
          className="block cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            {fileName ? (
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
                  />
                </svg>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-2 ring-4 ring-indigo-50 dark:ring-indigo-900/20">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                {fileName ? (
                  <span className="bg-indigo-100 dark:bg-indigo-900/50 py-1 px-3 rounded-full flex items-center justify-center max-w-full overflow-hidden">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
                      />
                    </svg>
                    <span className="truncate">{fileName}</span>
                  </span>
                ) : (
                  <span>
                    <span className="text-indigo-600 dark:text-indigo-400">클릭</span>하여 파일 선택 또는 여기에 드래그
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MP3, WAV, FLAC 등 지원
              </p>
            </div>
            
            {fileName && !loading && (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFileName(null);
                  setError(null);
                }}
                className="mt-2 text-xs py-1 px-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                다른 파일 선택
              </button>
            )}
          </div>
        </label>
      </div>

      {loading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-sm text-indigo-600 dark:text-indigo-400">
            파일을 처리하는 중...
          </span>
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mx-auto mb-1 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
} 