"use client";

import { useState, useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const initialState = { error: '', status: 'Initial' };

const StartupForm = () => {
  const [pitch, setPitch] = useState("");
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const handleFormSubmission = async (prevState, formData) => {
    const formValues = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      link: formData.get("link"),
      pitch,
    };

    try {
      await formSchema.parseAsync(formValues);

      if(Result.status == 'SUCCESS'){
        
      }

      setPitch("");
      setErrors({});

      return { error: "", status: "Success" };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        const flatErrors = {};
        for (const key in fieldErrors) {
          flatErrors[key] = fieldErrors[key]?.[0];
        }
        setErrors(flatErrors);

        toast({
          title: "Error",
          description: "Please check your input and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "Error" };
      }

      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "Error",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmission, initialState);

  return (
    <form action={formAction} className="startup-form">
      {state.status === "Success" && (
        <p className="text-green-600 font-semibold">✅ Your pitch was submitted!</p>
      )}
      {state.status === "Error" && (
        <p className="text-red-500 font-semibold">{state.error}</p>
      )}

      <div>
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input id="title" name="title" className="startup-form_input" placeholder="Startup title" />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">Description</label>
        <Textarea id="description" name="description" className="startup-form_textarea" placeholder="Startup description" />
        {errors.description && <p className="startup-form_error">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">Category</label>
        <Input id="category" name="category" className="startup-form_input" placeholder="Startup category (Tech, Health, ...)" />
        {errors.category && <p className="startup-form_error">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">Image URL</label>
        <Input id="link" name="link" className="startup-form_input" placeholder="Startup Image URL" />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">Pitch</label>
        <MDEditor
          value={pitch}
          onChange={(v) => setPitch(v)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{ placeholder: "Briefly describe your idea and what problem it solves" }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
      </div>

      <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
