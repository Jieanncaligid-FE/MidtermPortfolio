import { ArchiveDateFilterSection } from "@/components/features/archive/ArchiveDateFilterSection";

type PageProps = {
  params: Promise<{ date?: string[] }>;
};

export default async function ArchivePage({ params }: PageProps) {
  const { date } = await params;
  return <ArchiveDateFilterSection dateParts={date} />;
}
