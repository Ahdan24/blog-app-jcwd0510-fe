import { Skeleton } from "@/components/ui/skeleton"

const SkeletonBlog = () => {
  
  return (
    <main className="container mx-auto max-w-5xl px-4 mt-4">
    BlogDetailPage
    <section className="space-y-2">

    <Skeleton className="h-[22px] w-[10%] rounded-sm"/>
    <Skeleton className="h-[30px] w-[40%] rounded-sm"/>
    <Skeleton className="h-[22px] w-[15%] rounded-sm"/>
    <Skeleton className="h-[200px] rounded-sm md:h-[400px]"/>
      

    </section>
  </main>
  )
  
  
}

export default SkeletonBlog