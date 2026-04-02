import { CategoryBrowseSection } from "@/components/features/category/CategoryBrowseSection";

type PageProps = {
  params: Promise<{ path?: string[] }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { path } = await params;
  return <CategoryBrowseSection segments={path} />;
}
