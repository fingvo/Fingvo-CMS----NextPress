import { ContentEditor } from "@/components/nextpress/content-editor";

export default function EditorPage({ params }: { params: { slug: string[] } }) {
  const [type, id] = params.slug;
  const isNew = type.startsWith("new");
  const contentType = isNew ? type.split("-")[1] : type.slice(0, -1); // 'post' or 'page'

  return (
    <ContentEditor
      isNew={isNew}
      contentType={contentType}
      contentId={id}
    />
  );
}
