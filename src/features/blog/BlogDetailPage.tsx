"use client";

import { Badge } from "@/components/ui/badge";
import useGetBlog from "@/hooks/api/blog/useGetBlog";
import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import SkeletonBlog from "./components/SkeletonBlog";
import ModalDelete from "./components/ModalDelete";
import useDeleteBlog from "@/hooks/api/blog/useDeleteBlog";
import { useAppSelector } from "@/redux/hooks";
import Markdown from "@/components/ui/Markdown";
import { useSession } from "next-auth/react";

interface BlogDetailPageProps {
  blogId: number;
}

const BlogDetailPage: FC<BlogDetailPageProps> = ({ blogId }) => {
  const session = useSession();
  const { data, isPending: isPendingGet } = useGetBlog(blogId);

  const { mutateAsync: deleteBlog, isPending: isPendingDelete } =
    useDeleteBlog();

  const onClickDeleteBlog = async () => {
    await deleteBlog(blogId);
  };

  if (isPendingGet) {
    return <SkeletonBlog />;
  }

  if (!data) {
    return <h1 className="text-center">No Data</h1>;
  }

  return (
    <main className="container mx-auto mt-4 max-w-5xl px-4">
      <section className="mb-4 space-y-2">
        <Badge  variant="outline"
            className="rounded-sm bg-green-100 text-green-600">{data.category}</Badge>

        <h1 className="text-3xl font-semibold">{data.title}</h1>
        <div className="flex items-center justify-between">
          <p>
            {format(new Date(data.createdAt), "dd MMM yyyy")} - {data.user.name}
          </p>
          {Number(session.data?.user.id) === data.userId && (
            <ModalDelete
              onClick={onClickDeleteBlog}
              isPending={isPendingDelete}
            />
          )}
        </div>

        <div className="relative h-[200px] bg-gray-500 md:h-[400px]">
          <Image
            src={data.thumbnail}
            alt="thumbnail"
            fill
            className="object-cover"
          />
        </div>
      </section>
      <Markdown content={data.content} />
    </main>
  );
};

export default BlogDetailPage;
