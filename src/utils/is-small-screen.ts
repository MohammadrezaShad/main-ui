export function isSmallScreen(): boolean {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 1024;
  }
  return false;
}
