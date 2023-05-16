import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export default withAuth(
  async function middleware(req: NextRequest) {
    //xac dinh xem user dang o trang nao
    const pathname = req.nextUrl.pathname;
    //kiem tra xem user da dang nhap chua
    const isAuth = await getToken({ req });
    //kien tra xem user co dang o trang login hay khong
    const isLoginPage = pathname.startsWith("/login");
    //sensitive page la trang ma neu chua dang nhap thi se khong co quyen truy cap
    const sensitiveRoutes = ["/dashboard"];
    //kiem tra xem user co dang o trang sensitive hay khong
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

//quy dinh nhung trang se goi middleware run
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
