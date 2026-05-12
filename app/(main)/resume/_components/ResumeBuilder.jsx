"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Eye,
  Loader2,
  Monitor,
  Save,
  Sparkles,
  Split,
  PlusCircle,
  X,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Code2,
  Mail,
  Phone,
  LayoutTemplate
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { saveResume, improveWithAI } from "@/actions/resume";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import { EntryForm } from "./EntryForm";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

const inputStyles =
  "border-2 border-brand-primary/10 bg-brand-primary/5 hover:bg-brand-primary/10 hover:border-brand-primary/25 focus:border-brand-primary/50! focus-visible:border-brand-primary/50! focus-visible:ring-brand-primary/30! focus-visible:ring-[3px]! transition-all duration-400 outline-none";

export default function ResumeBuilder({ initialContent, initialFormData }) {
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
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialFormData || {
      contactInfo: {
        email: "",
        mobile: "",
        socialLinks: [
          { platform: "LinkedIn", url: "" },
          { platform: "GitHub", url: "" },
          { platform: "Personal Website", url: "" }
        ]
      },
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

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control,
    name: "contactInfo.socialLinks"
  });

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

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Handle improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("summary", improvedContent);
      toast.success("Summary improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve summary");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  const handleImproveSummary = async () => {
    const summary = getValues("summary");
    if (!summary) {
      toast.error("Please enter a summary first");
      return;
    }

    await improveWithAIFn({
      current: summary,
      type: "summary",
    });
  };

  const getContactMarkdown = useCallback(() => {
    const { contactInfo } = formValues;
    const parts = [];
    
    if (contactInfo.mobile) parts.push(contactInfo.mobile);
    if (contactInfo.email) parts.push(contactInfo.email);
    
    if (contactInfo.socialLinks) {
       contactInfo.socialLinks.forEach(link => {
          if (!link.url) return;
          parts.push(`<a href="${link.url}" style="color:inherit;text-decoration:none;">${link.platform}</a>`);
       });
    }

    return parts.length > 0
      ? `<h1>${user?.fullName || ""}</h1>\n<div style="font-size: 0.9em;">${parts.join(" &nbsp;|&nbsp; ")}</div>`
      : `<h1>${user?.fullName || ""}</h1>`;
  }, [formValues, user?.fullName]);

  const getCombinedContent = useCallback(() => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## PROFESSIONAL SUMMARY\n<hr/>\n${summary}`,
      skills && `## TECHNICAL SKILLS\n<hr/>\n${skills}`,
      entriesToMarkdown(experience, "EXPERIENCE"),
      entriesToMarkdown(education, "EDUCATION"),
      entriesToMarkdown(projects, "PROJECT WORK"),
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
        margin: [10, 15],
        filename: `${user?.fullName ? user.fullName.replace(/\s+/g, '-') : 'User'}-resume-pathwiseai.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          onclone: (doc) => {
            const element = doc.getElementById("resume-pdf");
            if (element) {
              // Apply professional PDF styling explicitly
              element.style.setProperty("background", "white", "important");
              element.style.setProperty("color", "black", "important");
              element.style.setProperty("font-family", "'Times New Roman', Times, serif", "important");
              
              // Remove excessive paddings and center alignments inside the MD wrapper
              const mdDiv = element.querySelector('.wmde-markdown');
              if (mdDiv) {
                 mdDiv.style.padding = "0";
                 mdDiv.style.backgroundColor = "transparent";
                 
                 // Fix headers and hr spacing
                 const headers = mdDiv.querySelectorAll('h1, h2, h3');
                 headers.forEach(h => {
                    h.style.borderBottom = "none";
                    h.style.paddingBottom = "0";
                    h.style.marginTop = "12px";
                    h.style.marginBottom = "4px";
                    if (h.tagName === 'H1') {
                        h.style.textAlign = 'left';
                    }
                 });
                 const hrs = mdDiv.querySelectorAll('hr');
                 hrs.forEach(hr => {
                    hr.style.height = "1px";
                    hr.style.backgroundColor = "black";
                    hr.style.marginTop = "2px";
                    hr.style.marginBottom = "8px";
                 });
                 const paras = mdDiv.querySelectorAll('p');
                 paras.forEach(p => {
                    p.style.marginBottom = "4px";
                    p.style.lineHeight = "1.3";
                 });
               }
            }

            // Remove oklch/lab/custom variables that trip up html2canvas
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
            root.style.setProperty("--brand-primary", "#000000");
            root.style.setProperty("--brand-secondary", "#000000");
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
      // Serialize form values to remove any undefined fields or complex objects 
      // which Next.js Server Actions and Prisma will throw 500 errors on
      const sanitizedData = JSON.parse(JSON.stringify(formValues));
      await saveResumeFn(previewContent, sanitizedData);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="py-6 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start rounded-xl border-3 border-brand-primary/10 bg-brand-primary/5 p-6 md:p-8 lg:p-10 gap-8 w-full hover:border-brand-primary/25 transition-all duration-700 ease-in-out shadow-inner shadow-primary/0 hover:shadow-primary/20"
      >
        <div className="w-full space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-brand-primary/10 pb-8">
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-black tracking-tight md:text-5xl">
                Resume{" "}
                <span className="gradient-title text-3xl leading-tight font-black tracking-tight md:text-5xl">
                  Builder
                </span>
              </h1>
              <p className="text-muted-foreground text-sm font-medium md:text-base mt-2 max-w-2xl leading-relaxed">
                Create a data-driven, professional resume that captures your unique
                story and industry expertise.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
            className="group from-brand-primary relative overflow-hidden bg-linear-to-b to-brand-secondary py-5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:from-brand-hover hover:to-brand-active hover:shadow-lg hover:shadow-brand-active/20 flex-1 md:flex-none rounded-xl h-12 px-8 active:scale-[0.98]"
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
            className="flex-1 md:flex-none rounded-xl font-bold h-12 px-6 border-2 border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10 transition-all duration-300 active:scale-[0.98]"
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

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 w-full md:w-[400px] h-12 p-1 bg-brand-primary/5 backdrop-blur-xl border-2 border-brand-primary/10 rounded-2xl shadow-inner">
          <TabsTrigger
            value="edit"
            className="rounded-xl font-bold transition-all data-[state=active]:bg-brand-primary data-[state=active]:text-white data-[state=active]:shadow-lg active:scale-95"
          >
            Form
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="rounded-xl font-bold transition-all data-[state=active]:bg-brand-primary data-[state=active]:text-white data-[state=active]:shadow-lg active:scale-95"
          >
            Markdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-0">
          <Card className="p-0 border-none shadow-none bg-transparent">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-brand-primary/5 border-2 border-brand-primary/10 shadow-inner">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 flex items-center gap-2"><Mail className="h-4 w-4"/> Email</label>
                    <Input
                      {...register("contactInfo.email")}
                      type="email"
                      placeholder="your@email.com"
                      error={errors.contactInfo?.email}
                      className={cn("h-12 font-medium bg-background", inputStyles)}
                    />
                    {errors.contactInfo?.email && (
                      <p className="text-sm text-destructive font-bold">
                        {errors.contactInfo.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 flex items-center gap-2">
                      <Phone className="h-4 w-4"/> Mobile Number
                    </label>
                    <Input
                      {...register("contactInfo.mobile")}
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className={cn("h-12 font-medium bg-background", inputStyles)}
                    />
                    {errors.contactInfo?.mobile && (
                      <p className="text-sm text-destructive font-bold">
                        {errors.contactInfo.mobile.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <label className="text-sm font-bold ml-1 border-b pb-1 flex justify-between items-center">
                      Social Links
                      {socialFields.length < 4 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => appendSocial({ platform: "Select Platform", url: "" })}
                          className="h-8 border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm rounded-lg px-3"
                        >
                          <PlusCircle className="h-3.5 w-3.5 mr-1" />
                          Add Link
                        </Button>
                      )}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {socialFields.map((field, index) => (
                        <div key={field.id} className="p-3 border-2 border-brand-primary/10 rounded-xl bg-brand-primary/5 flex items-center gap-2">
                          <Controller
                            control={control}
                            name={`contactInfo.socialLinks.${index}.platform`}
                            render={({ field: selectField }) => (
                              <Select value={selectField.value} onValueChange={selectField.onChange}>
                                <SelectTrigger className={cn("w-[150px] border-none shadow-none h-14 font-bold bg-transparent", inputStyles)}>
                                  <SelectValue placeholder="Platform" />
                                </SelectTrigger>
                                <SelectContent className="bg-background/95 border-brand-primary/20 rounded-lg border-2 backdrop-blur-xl">
                                  {[
                                    { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" /> },
                                    { name: "GitHub", icon: <Github className="w-4 h-4" /> },
                                    { name: "Personal Website", icon: <Globe className="w-4 h-4" /> },
                                    { name: "LeetCode", icon: <Code2 className="w-4 h-4" /> },
                                    { name: "CodeChef", icon: <Code2 className="w-4 h-4" /> },
                                    { name: "Twitter", icon: <Twitter className="w-4 h-4" /> },
                                    { name: "Behance", icon: <LayoutTemplate className="w-4 h-4" /> },
                                    { name: "Medium", icon: <LayoutTemplate className="w-4 h-4" /> }
                                  ].map(plat => (
                                    <SelectItem key={plat.name} value={plat.name} className="focus:bg-brand-primary/10 focus:text-primary my-1.5 cursor-pointer rounded-lg font-semibold transition-colors">
                                      <div className="flex items-center gap-2">
                                        {plat.icon}
                                        {plat.name}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <Input
                            {...register(`contactInfo.socialLinks.${index}.url`)}
                            type="url"
                            placeholder="https://..."
                            className={cn("flex-1 h-14 border-none shadow-none bg-transparent", inputStyles)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSocial(index)}
                            className="h-10 w-10 text-rose-500 hover:text-white hover:bg-rose-500/80 shrink-0 transition-colors rounded-lg"
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                    Professional Summary
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleImproveSummary}
                    disabled={isImproving || !watch("summary")}
                    className="rounded-lg h-8 px-3 transition-all border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10 active:scale-95"
                  >
                    {isImproving ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1.5 animate-spin text-brand-primary" />
                        Improving...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3 mr-1.5 text-brand-primary" />
                        Improve with AI
                      </>
                    )}
                  </Button>
                </div>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className={cn("h-32 rounded-xl font-medium", inputStyles)}
                      placeholder="Write a compelling professional summary..."
                      error={errors.summary}
                    />
                  )}
                />
                {errors.summary && (
                  <p className="text-sm text-destructive font-bold">
                    {errors.summary.message}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">
                  Skills
                </h3>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className={cn("h-32 rounded-xl font-medium", inputStyles)}
                      placeholder="List your key skills..."
                      error={errors.skills}
                    />
                  )}
                />
                {errors.skills && (
                  <p className="text-sm text-destructive font-bold">
                    {errors.skills.message}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">
                  Work Experience
                </h3>
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
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">
                  Education
                </h3>
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
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 border-b pb-2">
                  Projects
                </h3>
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

          <Card className="rounded-[32px] border-2 border-brand-primary/10 bg-brand-primary/5 dark:bg-brand-primary/5 hover:border-brand-primary/25 backdrop-blur-xl shadow-2xl shadow-brand-primary/5 overflow-hidden transition-all duration-400">
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
      </div>
      </motion.div>

      {/* Hidden PDF container - always in DOM for generation */}
      <div className="hidden">
        <div id="resume-pdf" className="py-10 px-10 bg-white text-black">
          <style>{`
            .generate-pdf-content {
              color: black !important;
              background-color: white !important;
              font-family: 'Times New Roman', Times, serif; 
              line-height: 1.2;
            }
            .generate-pdf-content h1 {
              font-size: 26pt; font-weight: bold; margin-bottom: 2px; color: black !important;
            }
            .generate-pdf-content h2 {
              font-size: 13pt; font-weight: bold; margin-top: 10px; margin-bottom: 4px; border-bottom: 1px solid black; padding-bottom: 2px; color: black !important; text-transform: uppercase;
            }
            .generate-pdf-content h3 {
              font-size: 11pt; font-weight: bold; margin-top: 6px; margin-bottom: 2px; color: black !important;
            }
            .generate-pdf-content p {
              font-size: 10pt; margin: 2px 0;
            }
            .generate-pdf-content ul {
              margin: 4px 0; padding-left: 16px;
            }
            .generate-pdf-content li {
              font-size: 10pt; margin-bottom: 2px;
            }
            .generate-pdf-content a {
              color: #2563eb !important; text-decoration: none;
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
