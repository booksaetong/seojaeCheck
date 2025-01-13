"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { likedBook } from "@/types/common";
import Image from "next/image";

import { useModalStore } from "@/stores/modal";

interface SortableItemProps {
  id: string;
  book: likedBook;
}

function SortableItem({ id, book }: SortableItemProps) {
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id,
    });
  const { openModal } = useModalStore();

  if (!book.thumbnail) {
    return (
      <div className="flexCenter h-[180px] w-[121px] border border-black">
        {book.title}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...listeners}
    >
      <figure
        className={`relative h-[180px] w-[121px] ${isDragging ? "opacity-50" : "opacity-100"}`}
        key={book.isbn}
        onClick={() => {
          openModal(book.isbn);
        }}
      >
        <Image
          src={book.thumbnail}
          fill
          alt={book.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        />
      </figure>
    </div>
  );
}

export default SortableItem;
