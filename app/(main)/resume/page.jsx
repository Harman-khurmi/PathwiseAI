import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/ResumeBuilder";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="py-8 md:py-12">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
