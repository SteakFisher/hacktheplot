"use client";

import Link from "next/link";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";


const LinkPrefetch = (props: { questionNumber: number; }) => {
    const router = useRouter();

    useEffect(() => {
        router.prefetch(`/questions/${props.questionNumber}`);
    }, [])

    return (
        <Link href={`/questions/${props.questionNumber}`} className="bg-none">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-black dark:text-white flex items-center space-x-4 px-8 sm:w-full"
            >
              <span className="w-full bg-black hover:bg-black text-white">
                Attempt
              </span>
            </HoverBorderGradient>
          </Link>
    )
}

export default LinkPrefetch;