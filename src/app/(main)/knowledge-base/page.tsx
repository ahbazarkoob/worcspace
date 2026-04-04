"use client";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import KnowlegeBaseSheet from "@/features/knowledge-base/knowlege-base-sheet";
import { KnowledgeBaseCardInterface } from "@/features/knowledge-base/types/knowledge-base";
import { Plus, SearchIcon } from "lucide-react";
import React, { useState } from "react";

const LOREM =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy";

const INITIAL_CARDS: KnowledgeBaseCardInterface[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Knowledge Base ${i + 1}`,
  description: LOREM,
  createdOn: "14/07/2025",
}));


const page = () => {
    const [cards, setCards] = useState<KnowledgeBaseCardInterface[]>(INITIAL_CARDS);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);
    const [editCard, setEditCard] = useState<KnowledgeBaseCardInterface | null>(
        null
    );

    const handleCreate = () => {
        setEditCard(null);
        setSheetOpen(true);
    };

    const handleSave = ({
        name,
        description,
        id,
    }: {
        name: string;
        description: string;
        id?: number;
    }) => {
        if (id) {
            setCards((prev) =>
                prev.map((c) => (c.id === id ? { ...c, title: name, description } : c))
            );
        } else {
            const today = new Date().toLocaleDateString();
            setCards((prev) => [
                ...prev,
                { id: Date.now(), title: name, description, createdOn: today },
            ]);
        }
    };

    return (
        <div className="flex flex-col flex-1 overflow-hidden bg-background">
            {/* Page header */}
            <div className="flex items-center justify-between px-6 py-4">
                <h1 className="text-xl font-bold text-foreground">Knowledge Base</h1>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <InputGroup>
                        <InputGroupInput
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search..."
                        />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>

                    {/* Create New */}
                    <Button
                        onClick={handleCreate}
                        size="default"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
                    >
                        <Plus />
                        Create New
                    </Button>
                </div>
            </div>
            <KnowlegeBaseSheet
                sheetOpen={sheetOpen}
                setSheetOpen={setSheetOpen}
                onSave={handleSave}
                editCard={editCard}
            />

        </div>
    );
};

export default page;
