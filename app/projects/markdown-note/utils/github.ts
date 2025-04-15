export const uploadToGitHub = async (
  content: string,
  token: string,
  username: string,
  repo: string,
  path: string
) => {
  const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "upload markdown from memo app",
      content: btoa(unescape(encodeURIComponent(content))),
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "GitHub 업로드에 실패했습니다.");
  }

  return await res.json();
};