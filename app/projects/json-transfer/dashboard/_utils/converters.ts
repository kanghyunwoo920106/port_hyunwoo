// json 파일을 csv 파일로 변환
export const jsonToCSV = (json: Record<string, any>): string => {
  if (!Array.isArray(json)) {
    json = [json];
  }
  
  // 헤더 추출
  const headers = new Set<string>();
  json.forEach((item: Record<string, any>) => {
    Object.keys(item).forEach(key => headers.add(key));
  });

  // 헤더 행 생성
  const headerRow = Array.from(headers).join(',');
  const rows = json.map((item: Record<string, any>) => {
    return Array.from(headers)
      .map(header => {
        const value = item[header];
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return value ?? '';
      })
      .join(',');
  });

  return [headerRow, ...rows].join('\n');
};

// json 파일을 xml 파일로 변환
export const jsonToXML = (json: Record<string, any>, rootName = 'root'): string => {
  const convert = (data: any, nodeName: string): string => {
    if (data === null) return `<${nodeName}/>`;
    
    if (typeof data !== 'object') {
      return `<${nodeName}>${escapeXML(String(data))}</${nodeName}>`;
    }

    if (Array.isArray(data)) {
      return data
        .map((item, index) => convert(item, 'item'))
        .join('\n');
    }

    const children = Object.entries(data)
      .map(([key, value]) => convert(value, key))
      .join('\n');
    
    return `<${nodeName}>\n${children}\n</${nodeName}>`;
  };

  const escapeXML = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  return `<?xml version="1.0" encoding="UTF-8"?>\n${convert(json, rootName)}`;
};

// 포맷터 목록
export const formatters = {
  json: (data: Record<string, any>) => JSON.stringify(data, null, 2),
  csv: jsonToCSV,
  xml: jsonToXML,
} as const;

// 포맷터 타입
export type FormatType = keyof typeof formatters; 