"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeft, X, MoveRight, ChevronDown, ChevronUp } from "lucide-react";
import { iconMap } from "@/lib/iconMap";

interface MenuGrand {
  name: string;
  href?: string;
  icon?: string;
}

interface MenuChild {
  name: string;
  href?: string;
  icon?: string;
  description?: string;
  children?: MenuGrand[];
}

interface MenuItem {
  name: string;
  href?: string;
  icon?: string;
  description?: string;
  submenu?: MenuChild[];
}

interface MobileMegaMenuProps {
  menu: MenuItem[];
  onClose: () => void;
}

const contactDetails: MenuItem = {
  name: "Contact Us",
  icon: "phone",
  description: "Get in touch with Ilahia.",
  href: "/contact-us",
  submenu: [],
};

export default function MobileMegaMenu({ menu, onClose }: MobileMegaMenuProps) {
  const [activeParent, setActiveParent] = useState<MenuItem | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<MenuChild | null>(null);
  const [openChild, setOpenChild] = useState<string | null>(null);
  const pathname = usePathname();

  const mobileMenuItems: MenuItem[] = [...menu, contactDetails];

  const isItemActive = (item: MenuItem): boolean => {
    if (item.href && pathname === item.href) return true;
    if (item.submenu?.length) {
      return item.submenu.some((child: MenuChild) => {
        if (child.href && pathname === child.href) return true;
        if (child.children?.length) {
          return child.children.some(
            (grand: MenuGrand) => grand.href && pathname === grand.href,
          );
        }
        return false;
      });
    }
    return false;
  };

  const isChildActive = (child: MenuChild): boolean => {
    if (child.href && pathname === child.href) return true;
    if (child.children?.length) {
      return child.children.some(
        (grand: MenuGrand) => grand.href && pathname === grand.href,
      );
    }
    return false;
  };

  const isGrandActive = (grand: MenuGrand): boolean =>
    !!grand.href && pathname === grand.href;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!menu) return null;

  const bottomContext = activeSubmenu ?? activeParent;

  return (
    <div className="fixed inset-0 z-[999] bg-white lg:hidden flex flex-col h-screen">
      <div className="flex items-center justify-between px-5 py-1 border-b">
        {activeParent ? (
          <button
            onClick={() => {
              if (activeSubmenu) {
                setActiveSubmenu(null);
                setOpenChild(null);
              } else {
                setActiveParent(null);
              }
            }}
            className="flex items-center gap-2 h-10 font-secondary"
          >
            <ArrowLeft size={18} /> Back
          </button>
        ) : (
          <Link href="/" onClick={onClose}>
            <Image
              src="https://icas.ac.in/uploads/downloads/assets/icaslogo.jpeg"
              alt="Ilahia Logo"
              width={80}
              height={20}
              className="h-[65px] w-auto"
            />
          </Link>
        )}

        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center border"
        >
          <X size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 min-h-0">
        {!activeParent &&
          mobileMenuItems.map((item) => {
            const Icon = item.icon ? iconMap[item.icon] : undefined;
            const hasSubmenu = (item.submenu?.length ?? 0) > 0;
            const isActive = isItemActive(item);

            return hasSubmenu ? (
              <button
                key={item.name}
                onClick={() => setActiveParent(item)}
                className="flex gap-4 text-left w-full justify-between"
              >
                <div className="flex gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-secondary text-white  ${
                      isActive ? "bg-cyan-900" : "bg-cyan-600"
                    }`}
                  >
                    {Icon && <Icon size={18} className="text-white" />}
                  </div>
                  <p
                    className={`font-secondary mt-2 ${
                      isActive ? "font-normal text-[#B07D3A]" : "font-light"
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
                <div className="mt-3">
                  {hasSubmenu ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronUp size={16} />
                  )}
                </div>
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.href ?? "#"}
                onClick={onClose}
                className="flex gap-4"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-secondary text-white  ${
                    isActive ? "bg-cyan-900" : "bg-cyan-600"
                  }`}
                >
                  {Icon && <Icon size={18} />}
                </div>
                <p
                  className={`font-secondary mt-2 ${
                    isActive ? "font-normal text-[#B07D3A]" : "font-light"
                  }`}
                >
                  {item.name}
                </p>
              </Link>
            );
          })}

        {activeParent &&
          activeParent.submenu?.map((child) => {
            const Icon = child.icon ? iconMap[child.icon] : undefined;
            const hasChildren = (child.children?.length ?? 0) > 0;
            const isOpen = openChild === child.name;
            const isActive = isChildActive(child);

            return (
              <div key={child.name} className="space-y-2">
                <button
                  onClick={() => {
                    if (!hasChildren) {
                      onClose();
                      return;
                    }

                    if (isOpen) {
                      setOpenChild(null);
                      setActiveSubmenu(null);
                    } else {
                      setOpenChild(child.name);
                      setActiveSubmenu(child);
                    }
                  }}
                  className="flex gap-4 w-full text-left"
                >
                  {!hasChildren && (
                    <Link
                      href={child.href ?? "#"}
                      onClick={onClose}
                      className="flex gap-4 w-full"
                    >
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center font-secondary ${
                          isActive ? "bg-[#E8C9A0]" : "bg-[#F6E8D8]"
                        }`}
                      >
                        {Icon && <Icon size={18} />}
                      </div>
                      <div
                        className={`flex-1 font-secondary mt-1.5 ${
                          isActive ? "font-normal text-[#B07D3A]" : "font-light"
                        }`}
                      >
                        {child.name}
                      </div>
                    </Link>
                  )}

                  {hasChildren && (
                    <>
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center font-secondary ${
                          isActive ? "bg-[#E8C9A0]" : "bg-[#F6E8D8]"
                        }`}
                      >
                        {Icon && <Icon size={18} />}
                      </div>
                      <div
                        className={`flex-1 font-secondary mt-1.5 ${
                          isActive ? "font-normal text-[#B07D3A]" : "font-light"
                        }`}
                      >
                        {child.name}
                      </div>
                      <div className="mt-3">
                        {isOpen ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </>
                  )}
                </button>

                {hasChildren && isOpen && (
                  <div className="ml-14 space-y-2 border-l pl-4">
                    {child.children?.map((grand) => {
                      const GrandIcon = grand.icon
                        ? iconMap[grand.icon]
                        : undefined;
                      const isGrandCurrentPage = isGrandActive(grand);
                      return (
                        <Link
                          key={grand.name}
                          href={grand.href ?? "#"}
                          onClick={onClose}
                          className="flex gap-3 py-1"
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center font-secondary ${
                              isGrandCurrentPage
                                ? "bg-[#E8C9A0]"
                                : "bg-[#FCF2E8]"
                            }`}
                          >
                            {GrandIcon && <GrandIcon size={14} />}
                          </div>
                          <p
                            className={`text-sm font-secondary mt-1.5 ${
                              isGrandCurrentPage
                                ? "font-semibold text-[#B07D3A]"
                                : ""
                            }`}
                          >
                            {grand.name}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {bottomContext && (
        <div className="border-t px-5 py-4">
          <div className="bg-[#FCF2E8] rounded-xl p-4">
            <p className="font-semibold">{bottomContext.name}</p>
            <p className="text-xs text-gray-600 mt-1 !font-secondary">
              {bottomContext.description}
            </p>

            {bottomContext.href && (
              <Link
                href={bottomContext.href}
                onClick={onClose}
                className="inline-flex items-center gap-2 mt-3 text-sm font-secondary"
              >
                Visit Page <MoveRight size={16} />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
