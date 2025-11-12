export const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const s = 60 + Math.random() * 30;
  const l = 40 + Math.random() * 40;
  return `hsl(${hue} ${s}% ${l}%)`;
};
