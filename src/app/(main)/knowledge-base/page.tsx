"use client";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import KnowledgeBaseCard from "@/features/knowledge-base/components/knowledge-base-card";
import KnowlegeBaseSheet from "@/features/knowledge-base/components/knowlege-base-sheet";
import { KnowledgeBaseCardInterface } from "@/features/knowledge-base/types/knowledge-base";
import { FileQuestion, Plus, SearchIcon } from "lucide-react";
import React, { useState } from "react";

const LOREM =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy";

const INITIAL_CARDS: KnowledgeBaseCardInterface[] = Array.from(
    { length: 6 },
    (_, i) => ({
        id: i + 1,
        title: `Knowledge Base ${i + 1}`,
        description: LOREM,
        createdOn: "14/07/2025",
    })
);

const page = () => {
    const [cards, setCards] =
        useState<KnowledgeBaseCardInterface[]>(INITIAL_CARDS);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);
    const [editCard, setEditCard] = useState<KnowledgeBaseCardInterface | null>(
        null
    );
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const today = new Date().toLocaleDateString();

    const filtered = cards.filter(
        (c) =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filtered.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handleCreate = () => {
        setEditCard(null);
        setSheetOpen(true);
    };

    const handleEdit = (card: KnowledgeBaseCardInterface) => {
        setEditCard(card);
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
            setCards((prev) => [
                ...prev,
                { id: Date.now(), title: name, description, createdOn: today },
            ]);
        }
    };

    return (
        <div className="flex flex-col flex-1 gap-4 p-6 overflow-hidden bg-background">
            {/* Page header */}
            <div className="flex items-center justify-between">
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
            {/* Content area */}
            <div className="px-4 py-2 flex flex-col gap-4 border rounded-md shadow-sm">
                {paginated.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3 py-20">
                        <FileQuestion className="size-14 text-muted-foreground/40" />
                        <p className="text-sm">No Knowledge Bases Found</p>
                        {search && (
                            <Button variant="outline" size="sm" onClick={() => setSearch("")}>
                                Clear search
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {paginated.map((card) => (
                            <KnowledgeBaseCard
                                key={card.id}
                                card={card}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                )}
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
