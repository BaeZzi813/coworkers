import { Button } from "@/components/button";
import { Alert } from "@/components/modal";
import { PostArticleBody, postImage } from "@/features/boards/api";
import PostContent from "@/features/boards/post-form/PostContent";
import PostHeader from "@/features/boards/post-form/PostHeader";
import PostImage from "@/features/boards/post-form/PostImage";
import { useMutation } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import { ChangeEvent } from "react";
import { usePostForm } from "../hooks/use-postform";

interface PostFormProps {
  mode: "post" | "edit";
  initialData?: PostArticleBody;
  onSubmit: (data: {
    title: string;
    content: string;
    image?: string;
  }) => Promise<void>;
}

export default function PostForm({
  mode,
  initialData,
  onSubmit,
}: PostFormProps) {
  const {
    preview,
    setPreview,
    title,
    setTitle,
    content,
    setContent,
    file,
    setFile,
  } = usePostForm(initialData);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }
    const selectedImage = files[0];
    setPreview(URL.createObjectURL(selectedImage));
    setFile(selectedImage);
  };

  const handleImageDelete = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview("");
    setFile(null);
  };

  const postImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      return postImage(formData);
    },
  });

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      overlay.open(({ isOpen, close, unmount }) => (
        <Alert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="필수 입력 항목을 기입해 주세요"
          actions={[<Button key="alert-close" title="확인" onClick={close} />]}
        />
      ));
      return;
    }
    try {
      let imageUrl = preview;
      if (file) {
        const uploadImage = await postImageMutation.mutateAsync(file);
        imageUrl = uploadImage.url;
      }
      await onSubmit({
        title,
        content,
        image: imageUrl || undefined,
      });
    } catch (error) {
      console.log("업로드 실패:", error);
    }
  };

  return (
    <section className="min-h-screen w-full bg-background-secondary py-5 tablet:py-[68px]">
      <div className="relative mx-auto w-[343px] rounded-[20px] bg-background-primary tablet:w-[620px] desktop:w-[900px]">
        <div className="mx-auto w-[300px] py-11 tablet:w-[540px] tablet:py-[72px] desktop:w-[760px]">
          <h1 className="mb-6 text-xl-b">
            {mode === "post" ? "게시글 쓰기" : "게시글 수정"}
          </h1>
          <div className="flex flex-col gap-6">
            <PostHeader value={title} onChange={handleTitleChange} />
            <PostContent value={content} onChange={handleContentChange} />
            <PostImage
              preview={preview}
              onChange={handleImageChange}
              onDelete={handleImageDelete}
            />
          </div>
          <Button
            title={mode === "post" ? "등록하기" : "수정하기"}
            className="mt-12"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
