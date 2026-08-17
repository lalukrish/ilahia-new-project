"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MoveRight } from "lucide-react";
import { iconMap } from "@/lib/iconMap";
import { usePathname } from "next/navigation";

interface MegaMenuProps {
  menu: any;
  activeItem: any;
  setActiveItem: (item: any) => void;
  onClose: () => void;
}

export default function MegaMenu({
  menu,
  activeItem,
  setActiveItem,
  onClose,
}: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    setActiveItem(null);
    setSelectedParent(null);
    setShowSubmenu(false);
  }, [menu]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }

      if (target.closest("nav") || target.closest("button[aria-expanded]")) {
        return;
      }

      onClose();
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  const handleItemClick = (item: any) => {
    if (item.children?.length > 0) {
      setSelectedParent(item);
      setShowSubmenu(true);
      setActiveItem(null);
    } else {
      setActiveItem(item);
      setSelectedParent(null);
      setShowSubmenu(false);
    }
  };

  const handleBackClick = () => {
    setShowSubmenu(false);
    setSelectedParent(null);
    setActiveItem(null);
  };

  const isActiveMainItem = (item: any): boolean => {
    if (item.href && pathname === item.href) return true;
    if (item.children?.length > 0) {
      return item.children.some(
        (child: any) => child.href && pathname === child.href,
      );
    }
    return false;
  };

  const isActiveChildItem = (child: any): boolean => {
    return child.href && pathname === child.href;
  };

  const displayItem = selectedParent || activeItem;
  const isInitialState = !selectedParent && !activeItem;

  return (
    <div className="left-0 right-0 top-full z-30 ">
      <div
        ref={menuRef}
        className="mx-auto xl:px-10 2xl:max-w-[1500px] 2xl:border-x border-b bg-white transition-all duration-200 ease-in-out"
      >
        <div className="grid grid-cols-12">
          <div className="col-span-8 p-8">
            {showSubmenu && (
              <button
                onClick={handleBackClick}
                className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
              >
                <ArrowLeft size={16} />
                Back to main menu
              </button>
            )}

            <div className="grid grid-cols-2 md:gap-2 xl:gap-6 lg:grid-cols-4">
              {!showSubmenu
                ? menu.submenu.map((item: any) => {
                    const Icon = iconMap[item.icon];
                    const isRouteActive = isActiveMainItem(item);
                    const isSelected =
                      selectedParent?.name === item.name ||
                      activeItem?.name === item.name;

                    return (
                      <button
                        key={item.name}
                        onClick={() => handleItemClick(item)}
                        className={`rounded-xl p-5 text-left transition hover:bg-[#FCF2E8] 
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900
                      ${
                        isSelected
                          ? "bg-[#FCF2E8] "
                          : isRouteActive
                            ? "bg-[#FCF2E8] "
                            : ""
                      }`}
                      >
                        <div
                          className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full transition
                          ${isRouteActive ? "bg-[#F6E8D8]" : "bg-[#F6E8D8]"}`}
                        >
                          {Icon && (
                            <Icon
                              size={18}
                              className={
                                isRouteActive
                                  ? "text-[#4A3520]"
                                  : "text-[#6B5444]"
                              }
                            />
                          )}
                        </div>

                        <h4
                          className={`text-sm font-medium font-secondary transition
                          ${isRouteActive ? "text-[#57422b]" : "text-gray-900"}`}
                        >
                          {item.name}
                        </h4>
                        <p className="mt-1 text-xs text-gray-500 font-secondary">
                          {item.description1}
                        </p>
                      </button>
                    );
                  })
                : selectedParent?.children?.map((child: any) => {
                    const ChildIcon = iconMap[child.icon];
                    const isRouteActive = isActiveChildItem(child);
                    const isSelected = activeItem?.name === child.name;

                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={onClose}
                        className={`rounded-xl p-5 text-left transition hover:bg-[#FCF2E8] 
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900
                      ${
                        isSelected
                          ? "bg-[#FCF2E8]"
                          : isRouteActive
                            ? "bg-[#F0E0CC] ring-1 ring-[#C9A882]"
                            : ""
                      }`}
                      >
                        <div
                          className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full transition
                          ${isRouteActive ? "bg-[#E8CCB0]" : "bg-[#F6E8D8]"}`}
                        >
                          {ChildIcon && (
                            <ChildIcon
                              size={18}
                              className={
                                isRouteActive
                                  ? "text-[#4A3520]"
                                  : "text-[#6B5444]"
                              }
                            />
                          )}
                        </div>

                        <h4
                          className={`text-sm font-medium font-secondary transition
                          ${isRouteActive ? "text-[#42321A]" : "text-gray-900"}`}
                        >
                          {child.name}
                        </h4>
                        <p className="mt-1 text-xs text-gray-500 font-secondary">
                          {child.description}
                        </p>
                      </Link>
                    );
                  })}
            </div>
          </div>

          <div className="col-span-4 border-l p-8">
            <div className="rounded-xl bg-[#FCF2E8] p-6">
              {(isInitialState ? menu?.image : displayItem?.image) && (
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={
                      (isInitialState ? menu : displayItem)?.image ||
                      "/no-image.jpg"
                    }
                    alt={(isInitialState ? menu : displayItem)?.name || ""}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <h4 className="text-sm font-semibold text-gray-900 font-secondary">
                {isInitialState ? menu?.name : displayItem?.name}
              </h4>

              <p className="mt-1 text-xs text-gray-600 font-secondary">
                {isInitialState ? menu?.description : displayItem?.description2}
              </p>

              {!isInitialState && displayItem?.href && (
                <Link
                  href={displayItem.href}
                  onClick={onClose}
                  className="!font-secondary pt-3 inline-flex items-center gap-3 text-[#42321A] font-normal text-sm md:text-sm hover:gap-4 transition-all duration-300 group"
                >
                  Visit Page <MoveRight size={30} strokeWidth={1} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
