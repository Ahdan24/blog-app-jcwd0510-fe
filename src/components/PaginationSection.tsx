"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationMeta } from "@/types/pagination";
import { FC } from "react";

interface PaginationSectionProps extends PaginationMeta {
    onChangePage: (page: number) => void
}

const PaginationSection: FC<PaginationSectionProps> = ({
  page,
  take,
  total,
  onChangePage,
}) => {

const hadlePrev = () => {
    if (page > 1) {
        onChangePage(page=-1)
    }
}

const hadleNext = () => {
    if (page > Math.ceil(total/take)) {
        onChangePage(page=+1)
    }
}

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={hadlePrev} />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={hadleNext}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSection;