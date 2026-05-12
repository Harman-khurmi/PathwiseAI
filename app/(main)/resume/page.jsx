import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/ResumeBuilder";

export default async function ResumePage() {
  const resume = await getResume();
  const serializedFormData = resume?.formData ? JSON.parse(JSON.stringify(resume.formData)) : null;

  return (
    <div className="py-8 md:py-12">
      <ResumeBuilder initialContent={resume?.content} initialFormData={serializedFormData} />
    </div>
  );
}
