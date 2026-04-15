import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const usePageTracking = () => {
  useEffect(() => {
    supabase.from("page_visits").insert({
      page: window.location.pathname,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });
  }, []);
};
