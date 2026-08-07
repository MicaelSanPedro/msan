"use client";

import { useState, useEffect } from "react";
import { SignInModal, SIGNIN_OPEN_EVENT } from "./SignInModal";

/**
 * Drop this component once in the layout to make openSignInModal() work globally.
 * It listens for the custom event and renders the SignInModal.
 */
export function GlobalSignInModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(SIGNIN_OPEN_EVENT, handler);
    return () => window.removeEventListener(SIGNIN_OPEN_EVENT, handler);
  }, []);

  return <SignInModal open={open} onClose={() => setOpen(false)} />;
}
