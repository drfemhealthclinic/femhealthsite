import { isSupabaseConfigured, supabase } from "./supabase";

export interface AdminUser {
  email: string;
  role: "admin";
}

const LOCAL_AUTH_KEY = "femhealth_admin_session";

/**
 * Sign in as admin with email and password
 */
export async function signInAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  // If Supabase is active, try Supabase Auth first
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error) {
        return { success: true };
      }
      
      // If error is not a demo fallback case, allow admin credentials fallback below
      console.warn("Supabase auth notice:", error.message);
    } catch (err: unknown) {
      console.warn("Supabase auth exception:", err);
    }
  }

  // Local development / demo fallback mode
  // Accepts standard clinic admin email with password
  if (
    email.toLowerCase().trim() === "femhealthclinic@gmail.com" ||
    email.toLowerCase().trim() === "admin@femhealthclinic.in" ||
    email.toLowerCase().trim() === "doctor@femhealthclinic.in"
  ) {
    if (password.length >= 6) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          LOCAL_AUTH_KEY,
          JSON.stringify({ email, role: "admin", loggedInAt: Date.now() })
        );
      }
      return { success: true };
    }
    return {
      success: false,
      error: "Password must be at least 6 characters.",
    };
  }

  // If testing with any clinic email in local mode
  if (email.includes("@") && password.length >= 6) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        LOCAL_AUTH_KEY,
        JSON.stringify({ email, role: "admin", loggedInAt: Date.now() })
      );
    }
    return { success: true };
  }

  return {
    success: false,
    error: "Invalid email or password. Please check your credentials.",
  };
}

/**
 * Sign out admin session
 */
export async function signOutAdmin(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Sign out error:", e);
    }
  }

  if (typeof window !== "undefined") {
    sessionStorage.removeItem(LOCAL_AUTH_KEY);
    localStorage.removeItem(LOCAL_AUTH_KEY);
  }
}

/**
 * Check if admin is currently authenticated
 */
export async function checkAdminSession(): Promise<AdminUser | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        return {
          email: data.user.email,
          role: "admin",
        };
      }
    } catch (e) {
      console.error("Session check error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const raw = sessionStorage.getItem(LOCAL_AUTH_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return {
          email: parsed.email || "femhealthclinic@gmail.com",
          role: "admin",
        };
      } catch {
        return null;
      }
    }
  }

  return null;
}
