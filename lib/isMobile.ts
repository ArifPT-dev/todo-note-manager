export function isMobileDevice() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 640; // ตาม Tailwind 'sm'
  }
  