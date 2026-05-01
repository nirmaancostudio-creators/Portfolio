export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeInOutQuart: [number, number, number, number] = [0.76, 0, 0.24, 1];
export const easeOutQuart: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const easeStudio: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const lenisEase = (t: number): number =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));
