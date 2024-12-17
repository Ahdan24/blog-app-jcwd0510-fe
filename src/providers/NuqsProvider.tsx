"use client"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import {FC, PropsWithChildren, Suspense} from "react"

const NuqProvider: FC<PropsWithChildren> = ({children}) => {
    return(
        <NuqsAdapter>
            <Suspense>{children}</Suspense>
        </NuqsAdapter>
    )
}

export default NuqProvider