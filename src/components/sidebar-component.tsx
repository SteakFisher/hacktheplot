"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconLinkPlus,
  IconPhone,
  IconTrophy,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Payload } from "@/types/Payload";
import { AnimatedTooltip } from "./ui/animated-tooltip";

export default function SidebarDemo({
  children,
  user,
}: {
  children: ReactNode;
  user: Payload;
}) {
  const links = [
    {
      label: "Questions",
      href: "/questions",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "ScoreBoard",
      href: "/scoreboard",
      icon: (
        <IconTrophy className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Rasputin",
      href: "/rasputin",
      icon: (
        <IconLinkPlus
          className={
            "text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
          }
        />
      ),
    },
    user.role === "admin" && {
      label: "Users",
      href: "/admin/users",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
  ];

  const [open, setOpen] = useState(false);
  const [showExpandedAvatars, setShowExpandedAvatars] = useState<boolean>(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (open) {
      // Opening: expand avatars immediately
      setShowExpandedAvatars(true);
    } else {
      // Closing: wait for the text to fade out before collapsing avatars
      timer = setTimeout(() => setShowExpandedAvatars(false), 250);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [open]);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-scroll md:overflow-hidden",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map(
                (link, idx) => link && <SidebarLink key={idx} link={link} />,
              )}
            </div>
          </div>
          <div>
            {/*<SidebarLink*/}
            {/*  link={{*/}
            {/*    label: "Made with ❤️ by \nJaydeep | Devyash | Kunj | Srishti",*/}
            {/*    href: "https://github.com/SteakFisher/hacktheplot",*/}
            {/*    icon: (*/}
            {/*      <Image*/}
            {/*        src="/placeholder.jpg"*/}
            {/*        className="h-7 w-7 flex-shrink-0 rounded-full"*/}
            {/*        width={50}*/}
            {/*        height={50}*/}
            {/*        alt="Avatar"*/}
            {/*      />*/}
            {/*    ),*/}
            {/*  }}*/}
            {/*/>*/}
            {/* open ? "h-10 w-10" : "h-7 w-7" */}
            <div className="flex flex-row gap-2 items-center">
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="made-with-love"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.25, delay: 0.25, ease: "easeOut" }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-xs text-neutral-500 mb-1 whitespace-nowrap">Made with ❤️ by</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatedTooltip
                items={showExpandedAvatars ? people : people.slice(0, 2)}
                size={showExpandedAvatars ? 40 : 20}
                isExpanded={showExpandedAvatars}
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src={"https://i.imgur.com/XDemAsx.png"}
        alt={"HTP"}
        width={2880}
        height={2880}
        className="w-6"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Hack the Plot
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src={"https://i.imgur.com/XDemAsx.png"}
        alt={"HTP"}
        width={2880}
        height={2880}
        className="w-6"
      />
    </Link>
  );
};
