// app/resume/_components/entry-form.jsx
"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Pencil, Save, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { cn } from "@/lib/utils";

const inputStyles =
  "border-2 border-brand-primary/10 bg-brand-primary/5 hover:bg-brand-primary/10 hover:border-brand-primary/25 focus:border-brand-primary/50! focus-visible:border-brand-primary/50! focus-visible:ring-brand-primary/30! focus-visible:ring-[3px]! transition-all duration-400 outline-none";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = parse(dateString, "yyyy-MM", new Date());
    return format(date, "MMM yyyy");
  } catch {
    return dateString;
  }
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
    control,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = useWatch({
    control,
    name: "current",
  });

  const description = useWatch({
    control,
    name: "description",
  });

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    onChange([...entries, formattedEntry]);

    reset({
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    });
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Add this effect to handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  // Replace handleImproveDescription with this
  const handleImproveDescription = async () => {
    const description = getValues("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(), // 'experience', 'education', or 'project'
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {entries.map((item, index) => (
          <Card
            key={index}
            className="rounded-2xl border-2 border-brand-primary/10 bg-brand-primary/5 shadow-brand-primary/5 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-tight">
                {item.title} @ {item.organization}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="h-8 w-8 text-rose-500 hover:text-white hover:bg-rose-500/80 shrink-0 transition-colors rounded-lg bg-transparent border-none"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-primary/70 animate-pulse" />
                {item.current
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>
              <p className="mt-3 text-sm whitespace-pre-wrap text-muted-foreground/80 leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAdding && (
        <Card className="rounded-[32px] border-2 border-brand-primary/10 bg-brand-primary/5 backdrop-blur-sm shadow-xl shadow-brand-primary/5 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-black">Add {type}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Title/Position</label>
                <Input
                  placeholder="Software Engineer"
                  {...register("title")}
                  className={cn("h-14 font-medium", inputStyles)}
                  aria-invalid={!!errors.title}
                />
                {errors.title && (
                  <p className="text-xs text-destructive font-bold ml-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Company/Org</label>
                <Input
                  placeholder="Organization"
                  {...register("organization")}
                  className={cn("h-14 font-medium", inputStyles)}
                  aria-invalid={!!errors.organization}
                />
                {errors.organization && (
                  <p className="text-xs text-destructive font-bold ml-1">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Start Date</label>
                <Input
                  type="month"
                  {...register("startDate")}
                  className={cn("h-14 font-medium", inputStyles)}
                  aria-invalid={!!errors.startDate}
                />
                {errors.startDate && (
                  <p className="text-xs text-destructive font-bold ml-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">End Date</label>
                <Input
                  type="month"
                  {...register("endDate")}
                  disabled={current}
                  className={cn("h-14 font-medium", inputStyles)}
                  aria-invalid={!!errors.endDate}
                />
                {errors.endDate && (
                  <p className="text-xs text-destructive font-bold ml-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-brand-primary/5 p-4 rounded-xl border-2 border-brand-primary/10">
              <input
                type="checkbox"
                id={`current-${type}`}
                {...register("current")}
                className="h-5 w-5 rounded-lg border-brand-primary/20 text-brand-primary cursor-pointer transition-all duration-200 focus:ring-brand-primary"
              />
              <label
                htmlFor={`current-${type}`}
                className="text-sm font-bold cursor-pointer select-none"
              >
                Currently working/studying here
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold">Description</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleImproveDescription}
                    disabled={isImproving || !description}
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
              <Textarea
                placeholder={`Tell us about your ${type.toLowerCase()}...`}
                className={cn("h-36 resize-none leading-relaxed", inputStyles)}
                {...register("description")}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="text-xs text-destructive font-bold ml-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
              className="rounded-xl border-brand-primary/20 hover:bg-brand-primary/10"
            >
              Cancel
            </Button>
            <Button 
               type="button" 
               onClick={handleAdd}
               className="rounded-xl bg-brand-primary hover:bg-brand-hover text-white shadow-brand-primary/20"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full rounded-xl border-2 border-dashed border-brand-primary/30 bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary/50 transition-all duration-300 h-14"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}
