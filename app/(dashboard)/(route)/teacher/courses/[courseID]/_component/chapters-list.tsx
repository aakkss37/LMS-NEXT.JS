"use client";
import { Chapter } from '@prisma/client';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Grip, Pencil } from 'lucide-react';


interface ChaptersListProps {
    items: Chapter[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
}
/**
@param items - The list of chapters for a course. to display
@param onReorder - Function to call when the user reorders the list
@param onEdit - Function to call when the user wants to edit a chapter
 */
const ChaptersList: React.FC<ChaptersListProps> = ({ items, onReorder, onEdit }) => {
    const [chapters, setChapters] = useState(items);
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapters = items.slice(startIndex, endIndex + 1);

        setChapters(items);

        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id)
        }));

        onReorder(bulkUpdateData);
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div
                        className="grid grid-cols-1 gap-4"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {chapters.map((chapter, index) => (
                            <Draggable
                                key={chapter.id}
                                draggableId={chapter.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className={cn(
                                            `flex items-center gap-2 rounded-md border p-1 mb-2
                                            text-sm bg-neutral-100 border-neutral-300
                                            text-slate-700 shadow-lg`,
                                            chapter.isPublished && 'bg-neutral-100 border-neutral-300 text-neutral-700 '
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(
                                                `px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300
                                                rounded-l-md transition`,
                                                chapter.isPublished && 'border-r-neutral-200 hover:bg-neutral-200'
                                            )}
                                            {...provided.dragHandleProps}
                                        >
                                            <Grip className='h-4 w-4' />
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto pr-2 flex item-center gap-x-2">
                                            {chapter.isFree && (
                                                <Badge>
                                                    Free
                                                </Badge>
                                            )}
                                            <Badge
                                                className={cn(
                                                    "bg-neutral-500",
                                                    chapter.isPublished && "bg-[#DADFF7] text-neutral-700"
                                                )}
                                            >
                                                {chapter.isPublished ? "Published" : "Draft"}
                                            </Badge>
                                            <Pencil
                                                onClick={() => onEdit(chapter.id)}
                                                className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                                            />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default ChaptersList