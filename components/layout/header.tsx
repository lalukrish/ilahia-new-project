"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import MegaMenu from "./Megaemenu";
import { menuConfig } from "./menu-config";
import Button from "@/commonComponents/button";
import MobileMegaMenu from "./mobile-siderbar";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, MailIcon, Menu, Phone, X } from "lucide-react";

const TOP_HEADER_HEIGHT = 40;

function useHideHeaderOnSection(id: string) {
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShouldHideHeader(false);

    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const attachIntersectionObserver = (el: Element) => {
      intersectionObserver?.disconnect();
      intersectionObserver = new IntersectionObserver(
        ([entry]) => setShouldHideHeader(entry.isIntersecting),
        { threshold: 0, rootMargin: "0px 0px 0px 0px" },
      );
      intersectionObserver.observe(el);
    };

    const el = document.getElementById(id);
    if (el) {
      attachIntersectionObserver(el);
    } else {
      mutationObserver = new MutationObserver(() => {
        const found = document.getElementById(id);
        if (found) {
          mutationObserver?.disconnect();
          mutationObserver = null;
          attachIntersectionObserver(found);
        }
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [id, pathname]);

  return shouldHideHeader;
}

function isMenuActive(menu: any, pathname: string): boolean {
  if (menu.href && pathname === menu.href) return true;
  if (menu.submenu?.length > 0) {
    return menu.submenu.some((item: any) => {
      if (item.href && pathname === item.href) return true;
      if (item.children?.length > 0) {
        return item.children.some(
          (child: any) => child.href && pathname === child.href,
        );
      }
      return false;
    });
  }
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<any>(null);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [menuVisible, setMenuVisible] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isOverNavRef = useRef(false);
  const isOverMegaMenuRef = useRef(false);
  const menuRefs = useRef<
    Record<string, HTMLButtonElement | HTMLAnchorElement | null>
  >({});

  const isHome = pathname === "/";
  const sectionVisible = useHideHeaderOnSection("whitesection");
  const whiteSection = !isHome && sectionVisible;

  const isLight = isScrolled || !!openMenu || whiteSection;
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY >= 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const element = menuRefs.current[openMenu.name];
    const navElement = navRef.current;
    if (!element || !navElement) return;
    const navRect = navElement.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    setUnderlineStyle({
      left: elementRect.left - navRect.left,
      width: elementRect.width,
    });
  }, [openMenu]);

  useEffect(() => {
    if (openMenu) {
      const raf = requestAnimationFrame(() => setMenuVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setMenuVisible(false);
    }
  }, [openMenu]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      if (!isOverNavRef.current && !isOverMegaMenuRef.current) {
        setOpenMenu(null);
        setActiveItem(null);
      }
    }, 80);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleNavEnter = useCallback(() => {
    isOverNavRef.current = true;
    cancelClose();
  }, [cancelClose]);
  const handleNavLeave = useCallback(() => {
    isOverNavRef.current = false;
    scheduleClose();
  }, [scheduleClose]);
  const handleMegaMenuEnter = useCallback(() => {
    isOverMegaMenuRef.current = true;
    cancelClose();
  }, [cancelClose]);
  const handleMegaMenuLeave = useCallback(() => {
    isOverMegaMenuRef.current = false;
    scheduleClose();
  }, [scheduleClose]);

  const handleMenuEnter = useCallback(
    (menu: any) => {
      cancelClose();
      setOpenMenu((prev: any) => {
        if (prev?.name === menu.name) return prev;
        setActiveItem(menu.submenu?.[0] ?? null);
        return menu;
      });
    },
    [cancelClose],
  );

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-500 ease-in-out ${
          isScrolled
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="bg-cyan-900 text-white">
          <div className="mx-auto w-full 2xl:px-20 xl:px-4 lg:px-12 px-6">
            <div className="flex h-10 items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <a
                  target="_blank"
                  aria-label="Facebook"
                  href=""
                  className="inline-flex items-center justify-center transition-transform duration-200 ease-out hover:scale-125 hover:text-black/70"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  target="_blank"
                  aria-label="Instagram"
                  href=""
                  className="inline-flex items-center justify-center transition-transform duration-200 ease-out hover:scale-125 hover:text-black/70"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  target="_blank"
                  aria-label="Twitter"
                  href=""
                  className="inline-flex items-center justify-center transition-transform duration-200 ease-out hover:scale-125 hover:text-black/70"
                >
                  <FaYoutube size={16} />
                </a>
                <a
                  target="_blank"
                  aria-label="LinkedIn"
                  href=""
                  className="inline-flex items-center justify-center transition-transform duration-200 ease-out hover:scale-125 hover:text-black/70"
                >
                  <FaLinkedinIn size={16} />
                </a>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="tel:+91 9400000707"
                  className="flex items-center gap-2 justify-center transition-transform duration-200 ease-out hover:scale-105 hover:text-black/70"
                >
                  <Phone size={14} />
                  <span>+91 960000407</span>
                </a>
                <a
                  href="ilahia@dummy.org.in"
                  className="flex items-center gap-2 justify-center transition-transform duration-200 ease-out hover:scale-105 hover:text-black/70"
                >
                  <Mail size={14} />
                  <span>ilahia@dummy.org.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed left-0 w-full z-40 transition-all duration-500 ease-in-out"
        style={{
          top: isScrolled ? 0 : TOP_HEADER_HEIGHT,
        }}
      >
        <div
          className={`transition-all duration-300 ${
            isLight
              ? "bg-white border-b border-gray-100"
              : " border-transparent"
          }`}
          style={
            isLight
              ? undefined
              : {
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0) 100%)",
                }
          }
        >
          <div
            className={`mx-auto w-full px-4 md:px-10 lg:px-6 xl:px-0 2xl:px-20`}
          >
            <div className="flex h-20 items-center justify-between gap-4 lg:gap-3 xl:gap-4 2xl:gap-4">
              <Link href="/" aria-label="Home" className="flex-shrink-0">
                <Image
                  src={isLight ? "/ilahia-logo3.png" : "/ilahia-logo4.png"}
                  alt="Ilahia"
                  width={80}
                  height={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className={`w-[170px] md:w-[105px] h-[70px] md:h-[80px] 2xl:h-[105px] 2xl:w-[235px]`}
                />
                {/* <h1 className="text-black text-3xl">Ilahia</h1> */}
              </Link>

              <nav
                ref={navRef}
                className="hidden lg:flex items-center gap-4 xl:gap-4 2xl:gap-5 relative h-full flex-1 justify-center"
                onMouseEnter={handleNavEnter}
                onMouseLeave={handleNavLeave}
              >
                {menuConfig.map((menu) => {
                  const hasSubmenu = menu.submenu?.length > 0;
                  const isOpen = openMenu?.name === menu.name;
                  const isActive = isMenuActive(menu, pathname);

                  const activeColor = isLight
                    ? "text-[#B8860B]"
                    : "text-[#FFBE5E]";
                  const defaultColor = isLight ? "text-black" : "text-white";
                  const labelClass = `font-medium font-secondary text-[12px] lg:text-[12px] md:text-[12px] 2xl:text-[13.5px] transition-colors duration-300 ${
                    isActive ? activeColor : defaultColor
                  }`;

                  if (!hasSubmenu) {
                    return (
                      <Link
                        key={menu.name}
                        href={menu?.href ?? "#"}
                        ref={(el) => {
                          menuRefs.current[menu.name] = el;
                        }}
                        className={`relative ${labelClass} ${
                          isActive
                            ? "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:rounded-full after:bg-current"
                            : ""
                        }`}
                      >
                        {menu.name}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={menu.name}
                      ref={(el) => {
                        menuRefs.current[menu.name] = el;
                      }}
                      onMouseEnter={() => handleMenuEnter(menu)}
                      className={`relative flex items-center gap-1 ${labelClass} ${
                        isActive && !isOpen
                          ? "after:absolute after:left-0 after:w-full after:h-[2px] after:rounded-full"
                          : ""
                      }`}
                      aria-expanded={isOpen}
                    >
                      {menu.name}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              <div className="flex items-center gap-4 flex-shrink-0 ">
                {/* <Button
                  variant="ghost"
                  className={`${
                    isLight ? "!text-black " : "!text-white "
                  } hidden lg:flex !bg-transparent !shadow-none transition-colors duration-300`}
                  href="/contact-us"
                  iconRight={<MailIcon strokeWidth={1} />}
                >
                  Contact Us
                </Button> */}
                <Image
                  src={isLight ? "/acc-logo1.png" : "/acc-logo1.png"}
                  alt="Ilahia"
                  width={80}
                  height={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className={`w-[40px] md:w-[25px] h-[40px] md:h-[80px] 2xl:h-[55px] 2xl:w-[55px]`}
                />{" "}
                <Image
                  src={isLight ? "/acc-logo2.png" : "/acc-logo2.png"}
                  alt="Ilahia"
                  width={80}
                  height={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className={`w-[40px] md:w-[105px] h-[40px] md:h-[80px] 2xl:h-[55px] 2xl:w-[55px]`}
                />
                <button
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className={isLight ? "text-black" : "text-white"} />
                  ) : (
                    <Menu className={isLight ? "text-black" : "text-white"} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {openMenu && (
          <div
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
            className={`bg-white transition-all duration-200 ease-in-out ${
              menuVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
            id="mega-menu-container"
          >
            <MegaMenu
              menu={openMenu}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              onClose={() => {
                setOpenMenu(null);
                setActiveItem(null);
              }}
            />
          </div>
        )}
      </div>

      {mobileMenuOpen && (
        <MobileMegaMenu
          menu={menuConfig}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
