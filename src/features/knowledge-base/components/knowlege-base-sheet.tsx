"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KnowledgeBaseCardInterface } from "../types/knowledge-base";

const knowledgeBaseSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    description: z.string().optional(),
    vectorStore: z.enum(["Qdrant", "Pinecone", "Weaviate"]),
    llmModel: z.enum([
        "text-embedding-ada-002",
        "text-embedding-3-small",
        "text-embedding-3-large",
    ]),
});

type KnowlegeBaseSheetProps = {
    sheetOpen: boolean;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSave: (data: { name: string; description: string; id?: number }) => void;
    editCard: KnowledgeBaseCardInterface | null;
};

const KnowlegeBaseSheet = ({
    setSheetOpen,
    sheetOpen,
    onSave,
    editCard,
}: KnowlegeBaseSheetProps) => {
    const isEdit = Boolean(editCard);

    type FormData = z.infer<typeof knowledgeBaseSchema>;

    const form = useForm<FormData>({
        resolver: zodResolver(knowledgeBaseSchema),
        defaultValues: {
            name: "",
            description: "",
            vectorStore: "Qdrant",
            llmModel: "text-embedding-ada-002",
        },
    });

    useEffect(() => {
        form.reset({
            name: editCard?.title ?? "",
            description: editCard?.description ?? "",
            vectorStore: "Qdrant",
            llmModel: "text-embedding-ada-002",
        });
    }, [editCard, sheetOpen]);

    const handleSubmit = (data: FormData) => {
        onSave({
            name: data.name,
            description: data.description ?? "",
            id: editCard?.id,
        });

        setSheetOpen(false);
    };

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent
        side="right"
        className="w-115 sm:max-w-115 flex flex-col p-0 gap-0 overflow-hidden"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle>
            {isEdit ? "Edit Knowledge Base" : "Create New Knowledge Base"}
          </SheetTitle>
          <SheetDescription>
            Best for quick answers from documents, websites and text files.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col flex-1 overflow-y-auto"
        >
          <div className="flex flex-col gap-5 px-6 py-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label>
                Name (Cannot be edited later)
                <span className="text-destructive ml-0.5">*</span>
              </Label>

              <Input
                {...form.register("name")}
                placeholder="Name"
                disabled={isEdit}
              />

              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label>Description</Label>

              <Textarea
                {...form.register("description")}
                placeholder="Description"
                rows={4}
                className="resize-none"
              />

              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            {/* Vector Store */}
            <div className="flex flex-col gap-1.5">
              <Label>
                Vector Store <span className="text-destructive">*</span>
              </Label>

              <Select
                value={form.watch("vectorStore")}
                onValueChange={(val) => form.setValue("vectorStore", val as "Qdrant" | "Pinecone" | "Weaviate")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Qdrant">Qdrant</SelectItem>
                  <SelectItem value="Pinecone">Pinecone</SelectItem>
                  <SelectItem value="Weaviate">Weaviate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* LLM Model */}
            <div className="flex flex-col gap-1.5">
              <Label>
                LLM Embedding Model{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Select
                value={form.watch("llmModel")}
                onValueChange={(val) => form.setValue("llmModel", val as "text-embedding-ada-002" | "text-embedding-3-small" | "text-embedding-3-large")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-embedding-ada-002">
                    text-embedding-ada-002
                  </SelectItem>
                  <SelectItem value="text-embedding-3-small">
                    text-embedding-3-small
                  </SelectItem>
                  <SelectItem value="text-embedding-3-large">
                    text-embedding-3-large
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="px-6 py-4 border-t border-border mt-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSheetOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!form.watch("name")?.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isEdit ? "Save Changes" : "Create"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
    );
};

export default KnowlegeBaseSheet;
