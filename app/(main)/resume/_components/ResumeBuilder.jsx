"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Eye,
  Loader2,
  Monitor,
  Save,
  Split,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { saveResume } from "@/actions/resume";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import { EntryForm } from "./EntryForm";
import { useCallback } from "react";

export default function ResumeBuilder({ initialContent }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");

  useEffect(() => {
    setMounted(true);
  }, []);

  const [previewContent, setPreviewContent] = useState(initialContent || "");
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch form fields for preview updates
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = useCallback(() => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user?.fullName || ""}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  }, [formValues, user?.fullName]);

  const getCombinedContent = useCallback(() => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  }, [formValues, getContactMarkdown]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent || "");
    }
  }, [formValues, activeTab, getCombinedContent, initialContent]);

  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          onclone: (doc) => {
            const element = doc.getElementById("resume-pdf");
            if (element) {
              element.style.setProperty("background", "white", "important");
              element.style.setProperty("color", "black", "important");
            }
            // Remove oklch/lab variables that trip up html2canvas
            const root = doc.documentElement;
            root.style.setProperty("--background", "white");
            root.style.setProperty("--foreground", "black");
            root.style.setProperty("--primary", "#000000");
            root.style.setProperty("--primary-dark", "#000000");
            root.style.setProperty("--muted", "#f8fafc");
            root.style.setProperty("--muted-foreground", "#64748b");
            root.style.setProperty("--border", "#e2e8f0");
            root.style.setProperty("--card", "white");
            root.style.setProperty("--popover", "white");
          },
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async () => {
    try {
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            Resume <span className="gradient-title">Builder</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Create a data-driven, professional resume that captures your unique
            story and industry expertise.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
            className="flex-1 md:flex-none rounded-xl font-bold h-12 px-8 shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Resume
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex-1 md:flex-none rounded-xl font-bold h-12 px-6 border-2 hover:bg-muted transition-all duration-300 active:scale-[0.98]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full md:w-[400px] h-12 p-1 bg-muted/50 backdrop-blur-xl border-2 border-muted/20 rounded-2xl shadow-inner">
          <TabsTrigger 
            value="edit" 
            className="rounded-xl font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg active:scale-95"
          >
            Form
          </TabsTrigger>
          <TabsTrigger 
            value="preview" 
            className="rounded-xl font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg active:scale-95"
          >
            Markdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <Card className="p-6 md:p-8 rounded-[32px] border-2 border-muted/30 bg-muted/5 dark:bg-white/5 backdrop-blur-xl shadow-xl shadow-primary/5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-background/50 border-2 shadow-inner">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Email</label>
                    <Input
                      {...register("contactInfo.email")}
                      type="email"
                      placeholder="your@email.com"
                      error={errors.contactInfo?.email}
                    />
                    {errors.contactInfo?.email && (
                      <p className="text-sm text-destructive font-bold">{errors.contactInfo.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Mobile Number</label>
                    <Input
                      {...register("contactInfo.mobile")}
                      type="tel"
                      placeholder="+1 234 567 8900"
                    />
                    {errors.contactInfo?.mobile && (
                      <p className="text-sm text-destructive font-bold">{errors.contactInfo.mobile.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">LinkedIn URL</label>
                    <Input
                      {...register("contactInfo.linkedin")}
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                    {errors.contactInfo?.linkedin && (
                      <p className="text-sm text-destructive font-bold">{errors.contactInfo.linkedin.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Twitter/X Profile</label>
                    <Input
                      {...register("contactInfo.twitter")}
                      type="url"
                      placeholder="https://twitter.com/your-handle"
                    />
                    {errors.contactInfo?.twitter && (
                      <p className="text-sm text-destructive font-bold">{errors.contactInfo.twitter.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">Professional Summary</h3>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="h-32 rounded-xl border-muted/40 font-medium"
                      placeholder="Write a compelling professional summary..."
                      error={errors.summary}
                    />
                  )}
                />
                {errors.summary && (
                  <p className="text-sm text-destructive font-bold">{errors.summary.message}</p>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">Skills</h3>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="h-32 rounded-xl border-muted/40 font-medium"
                      placeholder="List your key skills..."
                      error={errors.skills}
                    />
                  )}
                />
                {errors.skills && (
                  <p className="text-sm text-destructive font-bold">{errors.skills.message}</p>
                )}
              </div>

              {/* Experience */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">Work Experience</h3>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Experience"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.experience && (
                  <p className="text-sm text-destructive font-bold">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              {/* Education */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">Education</h3>
                <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Education"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.education && (
                  <p className="text-sm text-destructive font-bold">
                    {errors.education.message}
                  </p>
                )}
              </div>

              {/* Projects */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">Projects</h3>
                <Controller
                  name="projects"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Project"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.projects && (
                  <p className="text-sm text-destructive font-bold">
                    {errors.projects.message}
                  </p>
                )}
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <div className="flex items-center justify-between gap-4 bg-muted/5 dark:bg-white/5 backdrop-blur-xl border-2 border-muted/30 p-2 rounded-2xl">
            <div className="flex items-center gap-1.5 bg-background p-1 rounded-xl border shadow-sm">
              <Button
                variant={resumeMode === "edit" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setResumeMode("edit")}
                className={`rounded-lg px-4 font-bold transition-all duration-200 ${resumeMode === "edit" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted"}`}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant={resumeMode === "live" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setResumeMode("live")}
                className={`rounded-lg px-4 font-bold transition-all duration-200 ${resumeMode === "live" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted"}`}
              >
                <Split className="h-4 w-4 mr-2" />
                Split
              </Button>
              <Button
                variant={resumeMode === "preview" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setResumeMode("preview")}
                className={`rounded-lg px-4 font-bold transition-all duration-200 ${resumeMode === "preview" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted"}`}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-muted-foreground font-medium text-sm">
              <Monitor className="h-4 w-4" />
              Responsive Preview
            </div>
          </div>

          {resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600/30 bg-yellow-600/5 text-yellow-700 dark:text-yellow-500 rounded-xl animate-in fade-in duration-300">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-medium">
                Custom editied markdown will be reset if you update the form data.
              </span>
            </div>
          )}

          <Card className="rounded-[32px] border-2 border-muted/30 bg-muted/5 dark:bg-white/5 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden">
            <div
              data-color-mode={
                mounted ? (theme === "dark" ? "dark" : "light") : "light"
              }
            >
              <MDEditor
                value={previewContent}
                onChange={setPreviewContent}
                height={800}
                preview={resumeMode}
                className="border-none bg-transparent!"
                previewOptions={{
                  className: "prose dark:prose-invert max-w-none p-8 md:p-12",
                }}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Hidden PDF container - always in DOM for generation */}
      <div className="hidden">
        <div id="resume-pdf" className="py-10 px-10 bg-white text-black">
          <style>{`
            .generate-pdf-content {
              color: black !important;
              background-color: white !important;
              font-family: Arial, sans-serif;
            }
            .generate-pdf-content h1, 
            .generate-pdf-content h2, 
            .generate-pdf-content h3 {
              color: black !important;
            }
            .generate-pdf-content a {
              color: #2563eb !important;
              text-decoration: underline;
            }
          `}</style>
          <div className="generate-pdf-content">
            <MDEditor.Markdown
              source={previewContent}
              style={{
                background: "white",
                color: "black",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
