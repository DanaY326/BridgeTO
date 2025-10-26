/**
 * Scale the radius of a circle marker based on open prayer requests
 * @param openRequests - Number of open prayer requests
 * @param maxOpen - Maximum number of open requests across all churches
 * @returns Radius in pixels (min 10, max 40)
 */
export function scaleRadius(openRequests: number, maxOpen: number): number {
  if (maxOpen === 0) return 10;
  const normalized = openRequests / maxOpen;
  return Math.max(10, Math.min(40, 10 + normalized * 30));
}

/**
 * Test object for scaleRadius function
 */
export const __tests__ = {
  scaleRadius: {
    "returns minimum for zero": scaleRadius(0, 100) === 10,
    "returns maximum for max value": scaleRadius(100, 100) === 40,
    "scales proportionally": scaleRadius(50, 100) === 25,
    "handles edge case of zero max": scaleRadius(10, 0) === 10,
  }
};
