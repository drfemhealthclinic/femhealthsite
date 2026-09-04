import { isSupabaseConfigured, supabase } from "./supabase";

export interface AdminUser {
  email: string;
  role: "admin";
}

const LOCAL_AUTH_KEY = "femhealth_admin_session";

/**
 * Sign in as admin with email and password
 * Authenticates directly with Supabase Auth to ensure cryptographic credential verification.
 */
export async function signInAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  // If Supabase is active, strictly enforce Supabase Auth
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return {
          success: false,
          error: "Authentication failed. No user found.",
        };
      }

      // Clear any legacy mock session keys
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(LOCAL_AUTH_KEY);
        localStorage.removeItem(LOCAL_AUTH_KEY);
      }

      return { success: true };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Authentication failed.";
      return { success: false, error: message };
    }
  }

  // If Supabase is NOT configured, reject login attempt
  return {
    success: false,
    error:
      "Authentication service is not configured. Please check your Supabase configuration.",
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
      // 1. Check local session from browser client first (fast & reliable)
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user?.email) {
        return {
          email: sessionData.session.user.email,
          role: "admin",
        };
      }

      // 2. Validate directly with Supabase server
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (!userError && userData?.user?.email) {
        return {
          email: userData.user.email,
          role: "admin",
        };
      }

      if (typeof window !== "undefined") {
        sessionStorage.removeItem(LOCAL_AUTH_KEY);
      }
      return null;
    } catch (e) {
      console.error("Session check error:", e);
      return null;
    }
  }

  return null;
}
