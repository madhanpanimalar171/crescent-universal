export type Hub = {
  name: string;
  lat: number;
  lng: number;
  origin?: boolean;
};

// Chennai is the origin hub; the rest are illustrative "go global" reach points.
export const hubs: Hub[] = [
  { name: 'Chennai', lat: 13.08, lng: 80.27, origin: true },
  { name: 'Dubai', lat: 25.2, lng: 55.3 },
  { name: 'London', lat: 51.5, lng: -0.12 },
  { name: 'New York', lat: 40.7, lng: -74.0 },
  { name: 'Singapore', lat: 1.35, lng: 103.8 },
  { name: 'Tokyo', lat: 35.7, lng: 139.7 },
  { name: 'Sydney', lat: -33.9, lng: 151.2 },
];

/** Converts lat/lng (degrees) to a point on a sphere of the given radius. */
export function latLngToVec3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}
