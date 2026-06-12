import React from "react";
import { TEMPLATES } from "@/lib/templates";

interface TemplateRendererProps {
  templateId: string;
  data: any;
}

export default function TemplateRenderer({ templateId, data }: TemplateRendererProps) {
  const selectedTemplate = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
  const Component = selectedTemplate.component;

  return <Component data={data} />;
}
