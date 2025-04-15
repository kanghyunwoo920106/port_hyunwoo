export const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return "";
    const text = await file.text();
    return text;
  };
  