import { useState } from "react";
import { PostArticleBody } from "../api";

export function usePostForm(
  initialData: PostArticleBody = { title: "", content: "", image: "" }
) {
  const [preview, setPreview] = useState<string>(initialData.image ?? "");
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const [file, setFile] = useState<File | null>(null);

  return {
    preview,
    setPreview,
    title,
    setTitle,
    content,
    setContent,
    file,
    setFile,
  };
}
