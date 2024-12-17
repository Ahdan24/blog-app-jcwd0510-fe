"use client";

import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import BlogCard from "./BlogCard";
import PaginationSection from "@/components/PaginationSection";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { FileMinus2 } from "lucide-react";
import { parseAsInteger, useQueryState } from 'nuqs'

const BlogList = () => {
  const [page, setPage] = useQueryState("page",parseAsInteger.withDefault(1) );

  const [search, setSearch] = useQueryState("search", {defaultValue: ""});

  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetBlogs({ page, search: debouncedValue });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Input
        className="mx-auto my-4 max-w-2xl rounded-full p-6 border border-orange-500"
        placeholder="Search"
        onChange={(e) =>{
          setPage(1)
          setSearch(e.target.value)
        }}
        value={search}
      />

      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="text-center">Loading bentar ye...</h1>
        </div>
      )}

      {!data?.data.length ? (
        <div className="flex h-[30vh] items-center justify-center">
          <FileMinus2 />
          <h1 className="text-center">No Data Cok!</h1>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {data.data.map((blog, index) => {
              return <BlogCard key={index} blog={blog} />;
            })}
          </div>

          <PaginationSection
            onChangePage={onChangePage}
            page={page}
            take={data.meta.take}
            total={data.meta.total}
          />
        </>
      )}
    </>
  );
};

export default BlogList;