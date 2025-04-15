interface VisualizerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onRestart: () => void;
  visualizationType: 'waveform' | 'frequency' | 'circular';
  setVisualizationType: (type: 'waveform' | 'frequency' | 'circular') => void;
  colorScheme: 'default' | 'rainbow' | 'monochrome';
  setColorScheme: (scheme: 'default' | 'rainbow' | 'monochrome') => void;
}

export default function VisualizerControls({
  isPlaying,
  onPlayPause,
  onRestart,
  visualizationType,
  setVisualizationType,
  colorScheme,
  setColorScheme
}: VisualizerControlsProps) {
  return (
    <div className="w-full backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 재생 제어 */}
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            재생 제어
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={onPlayPause}
              className={`relative flex items-center justify-center w-14 h-14 rounded-full focus:outline-none transition-all duration-300 ${
                isPlaying 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-800/60'
              }`}
              aria-label={isPlaying ? '일시정지' : '재생'}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
              
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {isPlaying ? '일시정지' : '재생'}
              </span>
            </button>
            
            <button
              onClick={onRestart}
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none transition-all duration-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="다시 시작"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34A8.014 8.014 0 0 0 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91z" />
              </svg>
              
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                다시 시작
              </span>
            </button>
          </div>
        </div>

        {/* 시각화 타입 선택 */}
        <div className="flex flex-col space-y-3">
          <label htmlFor="visualizer-type" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            시각화 타입
          </label>
          <div className="relative">
            <select
              id="visualizer-type"
              value={visualizationType}
              onChange={(e) => setVisualizationType(e.target.value as any)}
              className="block w-full pl-4 pr-10 py-3 text-base text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none dark:text-gray-200"
            >
              <option value="waveform" className="text-gray-900">파형 (Waveform)</option>
              <option value="frequency" className="text-gray-900">주파수 (Frequency)</option>
              <option value="circular" className="text-gray-900">원형 (Circular)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex justify-between px-1">
            <button 
              onClick={() => setVisualizationType('waveform')}
              className={`inline-flex items-center justify-center p-1 rounded-md ${
                visualizationType === 'waveform' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            
            <button 
              onClick={() => setVisualizationType('frequency')}
              className={`inline-flex items-center justify-center p-1 rounded-md ${
                visualizationType === 'frequency' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
            
            <button 
              onClick={() => setVisualizationType('circular')}
              className={`inline-flex items-center justify-center p-1 rounded-md ${
                visualizationType === 'circular' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 색상 스킴 선택 */}
        <div className="flex flex-col space-y-3">
          <label htmlFor="color-scheme" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            색상 스킴
          </label>
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <select
                id="color-scheme"
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value as any)}
                className="block w-full pl-4 pr-10 py-3 text-base text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none dark:text-gray-200"
              >
                <option value="default" className="text-gray-900">기본 (Default)</option>
                <option value="rainbow" className="text-gray-900">무지개 (Rainbow)</option>
                <option value="monochrome" className="text-gray-900">흑백 (Monochrome)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="flex justify-between px-1">
              <button 
                onClick={() => setColorScheme('default')}
                className={`flex items-center justify-center p-1 ${
                  colorScheme === 'default' ? 'opacity-100 ring-2 ring-indigo-500' : 'opacity-70 hover:opacity-100'
                } rounded-md overflow-hidden w-8 h-8 transition-all duration-200`}
                style={{ background: 'linear-gradient(135deg, #0d6efd, #0dcaf0)' }}
              />
              
              <button 
                onClick={() => setColorScheme('rainbow')}
                className={`flex items-center justify-center p-1 ${
                  colorScheme === 'rainbow' ? 'opacity-100 ring-2 ring-indigo-500' : 'opacity-70 hover:opacity-100'
                } rounded-md overflow-hidden w-8 h-8 transition-all duration-200`}
                style={{ background: 'linear-gradient(135deg, red, orange, yellow, green, blue, indigo, violet)' }}
              />
              
              <button 
                onClick={() => setColorScheme('monochrome')}
                className={`flex items-center justify-center p-1 ${
                  colorScheme === 'monochrome' ? 'opacity-100 ring-2 ring-indigo-500' : 'opacity-70 hover:opacity-100'
                } rounded-md overflow-hidden w-8 h-8 transition-all duration-200`}
                style={{ background: 'linear-gradient(135deg, black, #888, white)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 