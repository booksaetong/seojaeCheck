import authors from "@/data/authors";

export const todayAuthors = async (index: number) => {
  const query = authors[index];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}v3/search/book?query=${query}&target=person`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
      },
      next: { tags: ["homeData"] },
    },
  );

  const data = await res.json();

  return data.documents;
};
