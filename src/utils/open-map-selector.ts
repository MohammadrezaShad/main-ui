export const openMapSelector = (lat: any, lng: any) => {
  if (!lat || !lng) return;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.open(`geo:${lat},${lng}?q=${lat},${lng}`);
  } else {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`);
  }
};
