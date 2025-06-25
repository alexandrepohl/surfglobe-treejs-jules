import { useMemo } from 'react';
import SunCalc from 'suncalc';
import * as THREE from 'three';

// Helper function to convert spherical coordinates (azimuth, altitude) to Cartesian
const sphericalToCartesian = (azimuth: number, altitude: number, distance: number): THREE.Vector3 => {
  // Convert altitude (angle above horizon) and azimuth (angle around horizon) to standard spherical coordinates
  // Theta is polar angle (from Y-axis), Phi is azimuthal angle (around Y-axis in XZ plane)
  // Altitude: 0 at horizon, PI/2 at zenith. Azimuth: 0 at North, increases eastward.

  // Three.js Spherical coordinates:
  // radius: distance from origin
  // phi: polar angle from positive Y axis (0 to PI)
  // theta: azimuthal angle around Y axis (from positive Z axis, positive towards positive X axis)

  // Convert SunCalc azimuth/altitude to Three.js spherical coordinates
  // SunCalc azimuth: 0 = South, Math.PI/2 = West, Math.PI = North, 3*Math.PI/2 = East (solar azimuth)
  // We'll use a common convention: 0 = North, Math.PI/2 = East, Math.PI = South, 3*Math.PI/2 = West
  // Adjust SunCalc azimuth: (azimuth + Math.PI) % (2 * Math.PI) to align South (0) to North (PI)
  const correctedAzimuth = azimuth + Math.PI; // SunCalc's azimuth is from South, clockwise. We want from North, counter-clockwise for standard spherical.
                                           // Or, more simply, if light is directional, its position represents where it's coming FROM.
                                           // So if sun is at South (azimuth 0 in SunCalc), light comes from South.

  const phi = Math.PI / 2 - altitude; // polar angle from Y+
  const theta = correctedAzimuth;     // azimuthal angle around Y+ from X+ (or Z+ depending on convention)
                                      // Let's assume standard math convention for now, adjust if needed
                                      // Theta for Three.js is angle in XZ plane from positive Z axis.
                                      // SunCalc azimuth is from South, clockwise.
                                      // A common lighting setup might have sun position represent the direction TO the sun.
                                      // DirectionalLight position is where the light is.

  // Let's use a simpler approach: position the light source in the sky
  // X towards East, Y towards Zenith (Up), Z towards South (this is a common setup)
  // Altitude: angle with XY plane (horizon). 0 = on horizon, PI/2 = zenith.
  // Azimuth: angle in XY plane from Z+ (South). 0 = South, PI/2 = West, PI = North, 3PI/2 = East.

  const x = distance * Math.cos(altitude) * Math.sin(azimuth); // sin(azimuth) for X if Z is North/South
  const y = distance * Math.sin(altitude);
  const z = distance * Math.cos(altitude) * Math.cos(azimuth); // cos(azimuth) for Z if Z is North/South

  // SunCalc azimuth: south is 0, west is PI/2, north is PI, east is 3PI/2
  // If we want X East, Y Up, Z South:
  // x = R * cos(alt) * sin(azi)  (azi=0 (S) -> x=0; azi=PI/2 (W) -> x=-R*cos(alt); azi=PI (N) -> x=0; azi=3PI/2 (E) -> x=R*cos(alt))
  // This means positive X is East if azimuth is measured clockwise from South.
  // So, let's adjust:
  const finalX = -distance * Math.cos(altitude) * Math.sin(azimuth); // Make positive X towards East
  const finalY = distance * Math.sin(altitude);
  const finalZ = -distance * Math.cos(altitude) * Math.cos(azimuth); // Make positive Z towards North (if sun is at South, light comes from -Z)

  return new THREE.Vector3(finalX, finalY, finalZ);
};


const useSunPosition = (
  date: Date = new Date(),
  latitude: number = 0, // Default to equator
  longitude: number = 0, // Default to prime meridian
  lightDistance: number = 10 // Distance of the light source from the origin
): THREE.Vector3 => {
  const sunPosition = useMemo(() => {
    const times = SunCalc.getTimes(date, latitude, longitude);
    const sunPos = SunCalc.getPosition(date, latitude, longitude); // Returns azimuth and altitude

    // sunPos.azimuth: from south, clockwise. South=0, West=PI/2, North=PI, East=3PI/2
    // sunPos.altitude: angle above horizon.

    // We need to position the directional light. The position is where the light is.
    // If the sun is in the south-east, the light rays come from the south-east.
    // Let's assume a coordinate system for the scene: Y is up. X and Z are horizontal.
    // A common setup: +X right, +Y up, +Z towards camera (if camera is at [0,0,D])
    // Or +X East, +Y Zenith, +Z South for geographic visualization.
    // If +X is East, +Y is Up, +Z is South:
    // Azimuth 0 (South): light should be at (0, Y_s, D_s) where D_s is positive Z
    // Azimuth PI/2 (West): light should be at (-X_w, Y_w, 0)
    // Azimuth PI (North): light should be at (0, Y_n, -D_n)
    // Azimuth 3PI/2 (East): light should be at (X_e, Y_e, 0)

    // Convert SunCalc's azimuth (from South, clockwise) and altitude to a 3D vector
    // In a Y-up system:
    // x = -cos(altitude) * sin(azimuth) * distance  (negative because SunCalc azimuth increases clockwise)
    // y = sin(altitude) * distance
    // z = -cos(altitude) * cos(azimuth) * distance  (negative because SunCalc azimuth starts at South)
    // This places the light source correctly in a Y-up, X-right, Z-forward system,
    // where azimuth=0 (South) means light comes from Z+, azimuth=PI/2 (West) from X-.

    const x = -lightDistance * Math.cos(sunPos.altitude) * Math.sin(sunPos.azimuth);
    const y = lightDistance * Math.sin(sunPos.altitude);
    const z = -lightDistance * Math.cos(sunPos.altitude) * Math.cos(sunPos.azimuth);

    return new THREE.Vector3(x, y, z);

  }, [date, latitude, longitude, lightDistance]);

  return sunPosition;
};

export default useSunPosition;
