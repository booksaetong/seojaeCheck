"use client";

import { useState } from "react";
import { likedBook } from "@/types/common";
import { useLikedBookStore } from "@/stores/likedBooks";

interface DropDownProps extends likedBook {
  setShowSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropDown({
  title,
  thumbnail,
  isbn,
  setShowSelect,
}: DropDownProps) {
  const [selectedContainer, setSelectedContainer] = useState<
    "" | "root" | "container1" | "container2"
  >("");

  const { setItems } = useLikedBookStore();

  // 드롭다운 최상위 div에서 이벤트 전파 중단
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedContainer(
      e.target.value as "root" | "container1" | "container2",
    );
  };

  // 추가 버튼 클릭 시 해당 서재에 책 저장
  const handleConfirm = () => {
    if (!selectedContainer) {
      alert("서재를 선택해주세요.");
      return;
    }
    // 새로운 책
    const newBook: likedBook = { title, thumbnail, isbn };
    // 기존 컨테이너
    const containerArray = useLikedBookStore.getState()[selectedContainer];
    // 기존 컨테이너 + 새로운 책
    const updated = [...containerArray, newBook];
    // 저장
    setItems(selectedContainer, updated);

    // 안내 후 닫기
    alert(`[${title}] 책이 ${selectedContainer}에 추가되었습니다.`);
    setShowSelect(false);
    setSelectedContainer("");
  };

  const handleCancel = () => {
    setShowSelect(false);
  };
  return (
    <div
      className="absolute right-5 top-12 z-10 flex flex-col items-center gap-3 rounded border bg-white p-5 shadow-lg"
      onClick={handleContainerClick}
    >
      <label className="mr-2 text-sm font-semibold">
        어느 서재에 담을까요?
      </label>
      <select
        value={selectedContainer}
        onChange={handleSelectChange}
        className="w-full border px-2 py-1 text-sm"
      >
        <option value="">-- 서재 선택 --</option>
        <option value="root">읽고 싶은 책</option>
        <option value="container1">읽고 있는 책</option>
        <option value="container2">다 읽은 책</option>
      </select>
      <div className="flex w-full items-center justify-between gap-2">
        <button
          onClick={handleConfirm}
          className="w-full rounded bg-font-textPrimary px-2 py-1 text-sm text-brown-1"
        >
          추가
        </button>
        <button
          onClick={handleCancel}
          className="w-full rounded bg-gray-300 px-2 py-1 text-sm text-black"
        >
          취소
        </button>
      </div>
    </div>
  );
}
