"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { Button } from "@/components";
import { ToastProvider, useToast } from "@/components/ui/toast";

function ToastDemoButtons() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="primary"
        onClick={() =>
          toast({
            title: "Success",
            message: "Item saved successfully!",
            variant: "success",
          })
        }
      >
        Success Toast
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            title: "Error",
            message: "Something went wrong.",
            variant: "error",
          })
        }
      >
        Error Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Warning",
            message: "Your session expires in 5 minutes.",
            variant: "warning",
          })
        }
      >
        Warning Toast
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast({
            title: "Info",
            message: "A new update is available.",
            variant: "info",
          })
        }
      >
        Info Toast
      </Button>
    </div>
  );
}

export function ToastsSection() {
  return (
    <SectionWrapper id="toasts" title="Toasts" description="Non-intrusive notification messages for user feedback.">
      <div className="space-y-8">
        <ComponentPreview
          title="Toast Variants"
          code={`import { ToastProvider, useToast } from "@/components/ui/toast";

// Wrap your app (or section) with ToastProvider:
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Then use the hook anywhere:
const { toast } = useToast();

toast({ title: "Success", message: "Item saved!", variant: "success" });
toast({ title: "Error", message: "Something went wrong.", variant: "error" });
toast({ title: "Warning", message: "Session expires soon.", variant: "warning" });
toast({ title: "Info", message: "New update available.", variant: "info" });`}
        >
          <ToastProvider position="top-right">
            <ToastDemoButtons />
          </ToastProvider>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
