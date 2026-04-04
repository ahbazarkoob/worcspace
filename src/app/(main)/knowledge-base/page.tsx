"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Plus, Search, SearchIcon } from 'lucide-react';
import React, { useState } from 'react'

const page = () => {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const handleCreate = () => {
    };

    return (
        <div className="flex flex-col flex-1 overflow-hidden bg-background">
            {/* Page header */}
            <div className="flex items-center justify-between px-6 py-4">
                <h1 className="text-xl font-bold text-foreground">Knowledge Base</h1>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <InputGroup>
                        <InputGroupInput value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }} placeholder="Search..." />
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
        </div>
    )
}

export default page