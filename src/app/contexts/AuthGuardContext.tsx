"use client";

import { PagePath } from "../enums/page-path.enum";
import useAuthStore from "../(Page)/(Authentication)/login/hooks/useAuthStore";
import { createContext, useEffect, type PropsWithChildren } from "react";
import { useRouter, usePathname } from "next/navigation";
import { App } from "antd";

type UserRole = "Customer" | "Manager" | "Staff" | "Therapist" | "Admin";

type AuthGuardContextType = Record<string, unknown>;

type AuthGuardProviderProps = PropsWithChildren;

const AuthGuardContext = createContext<AuthGuardContextType>({});

export function AuthGuardProvider({ children }: AuthGuardProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { message } = App.useApp();
  const { user } = useAuthStore();

  useEffect(() => {
    const publicPages: PagePath[] = [
      PagePath.LOGIN,
      PagePath.VERIFY_EMAIL,
      PagePath.VERIFY_OTP,
      PagePath.HOME_PAGE,
      PagePath.BLOG,
      PagePath.SKIN_THERAPIST,
      PagePath.PRICE_SERVICE,
      PagePath.SKIN_SERVICE,
      PagePath.SKIN_TYPE,
    ];

    if (!user || !user.role) {
      if (!publicPages.includes(pathname as PagePath)) {
        router.replace(PagePath.LOGIN);
        // message.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      }
      return;
    }

    const role = user.role as UserRole;
    const restrictedPages: Record<UserRole, string[]> = {
      Admin: [
        PagePath.USER,
        PagePath.USER_DETAIL,
        PagePath.HOME,
        PagePath.PROFILE,
        PagePath.PROFILE_DETAIL,
      ],
      Staff: [
        PagePath.HOME,
        PagePath.BOOKING,
        PagePath.BOOKING_DETAIL.replace(":bookingId", ""),
      ],
      Therapist: [
        PagePath.HOME,
        PagePath.BOOKING,
        PagePath.BOOKING_DETAIL.replace(":bookingId", ""),
      ],
      Customer: [
        PagePath.BLOG,
        PagePath.BLOG_DETAIL,
        PagePath.COMPLETE_RESULT,
        PagePath.BOOKING_SERVICE,
        PagePath.SKIN_SERVICE,
        PagePath.SKIN_SERVICE_DETAIL.replace(":serviceId", ""),
        PagePath.SKIN_THERAPIST,
        PagePath.PRICE_SERVICE,
        PagePath.QUIZ,
        PagePath.SKIN_TYPE,
      ],
      Manager: [],
    };

    const isAllowed = restrictedPages[role]?.some((allowedPath) =>
      pathname.startsWith(allowedPath)
    );

    if (!publicPages.includes(pathname as PagePath) && !isAllowed) {
      router.replace(PagePath.FORBIDDEN);
    }
  }, [user, pathname, message, router]);

  return (
    <AuthGuardContext.Provider value={{}}>{children}</AuthGuardContext.Provider>
  );
}

export default AuthGuardContext;
