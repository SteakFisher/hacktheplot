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
      name: "Devyash Saini",
      designation: "",
      image: "/team/devyash.jpg"
    },
    {
      id: 2,
      name: "Jayadeep Bejoy",
      designation: "",
      image: "/team/jayadeep1.jpeg"
    },
    {
      id: 3,
      name: "Shreetej Meshram",
      designation: "",
      image: "/team/shreetej.jpeg"
    },
    {
      id: 4,
      name: "Abhijith Viju",
      designation: "",
      image: "/team/abhijith.jpeg"
    },
    {
      id: 5,
      name: "Kunj Thakkar",
      designation: "",
      image: "/team/kunj.jpeg"
    }
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
