"use client";
import React, { ReactNode, useState } from "react";
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
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Payload } from "@/types/Payload";

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

  const [open, setOpen] = useState(false);
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
            <SidebarLink
              link={{
                label: "Made with ❤️ by \nJaydeep | Devyash | Kunj | Srishti",
                href: "https://github.com/SteakFisher/hacktheplot",
                icon: (
                  <Image
                    src="/placeholder.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />

            {/* <AnimatedTooltip items={people} /> */}
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
