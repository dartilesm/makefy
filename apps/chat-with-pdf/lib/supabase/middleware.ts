import { createMiddlewareClient } from "@makify/supabase";
import { protectedPaths, authPaths } from "lib/constants";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const { supabase, response } = await createMiddlewareClient(request);
  const user = await supabase.auth.getUser();
  const url = new URL(request.url);
  const next = url.searchParams.get("next");

  if (user.error && !authPaths.includes(url.pathname)) {
    return NextResponse.redirect(
      new URL("/login?next=" + (next || url.pathname), request.url),
    );
  }

  if (user.data.user?.id) {
    if (authPaths.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  } else {
    if (protectedPaths.includes(url.pathname)) {
      return NextResponse.redirect(
        new URL("/login?next=" + (next || url.pathname), request.url),
      );
    }
    return response;
  }
}
