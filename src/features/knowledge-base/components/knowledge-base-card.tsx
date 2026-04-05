import React from "react";
import { KnowledgeBaseCardInterface } from "../types/knowledge-base";
import { Separator } from "@/components/ui/separator";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type KnowledgeBaseCardProps = {
    card: KnowledgeBaseCardInterface;
    onEdit: (card: KnowledgeBaseCardInterface) => void;
};

const KnowledgeBaseCard = ({
    card,
    onEdit
}: KnowledgeBaseCardProps) => {

    return (
        <div className="border rounded-md px-4 py-2 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm text-card-foreground">{card.title}</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" className="text-muted-foreground -mr-1">
                                <MoreVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(card)}>
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <p className="text-xs text-muted-foreground flex-1 leading-relaxed line-clamp-3">
                    {card.description}
                </p>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
                Created On:{" "}
                <span className="font-semibold text-foreground">{card.createdOn}</span>
            </p>
        </div>
    );
};

export default KnowledgeBaseCard;
