export interface LatLng {
    latitude: number;
    longitude: number;
  }
  
  export interface Polyline {
    encodedPolyline: string;
  }
  
  export interface NavigationInstruction {
    maneuver: string;
    instructions: string;
  }
  
  export interface LocalizedValue {
    text: string;
  }
  
  export interface LocalizedValues {
    distance?: LocalizedValue;
    duration?: LocalizedValue;
    staticDuration?: LocalizedValue;
  }
  
  export interface Step {
    distanceMeters: number;
    staticDuration: string;
    polyline: Polyline;
    startLocation: {
      latLng: LatLng;
    };
    endLocation: {
      latLng: LatLng;
    };
    navigationInstruction: NavigationInstruction;
    localizedValues: LocalizedValues;
    travelMode: string;
  }
  
  export interface Leg {
    distanceMeters: number;
    duration: string;
    staticDuration: string;
    polyline: Polyline;
    startLocation: {
      latLng: LatLng;
    };
    endLocation: {
      latLng: LatLng;
    };
    steps: Step[];
    localizedValues: LocalizedValues;
  }
  
  export interface Viewport {
    low: LatLng;
    high: LatLng;
  }
  
  export interface Route {
    legs: Leg[];
    distanceMeters: number;
    duration: string;
    staticDuration: string;
    polyline: Polyline;
    description: string;
    warnings: string[];
    viewport: Viewport;
    travelAdvisory: Record<string, unknown>;
    localizedValues: LocalizedValues;
    routeLabels: string[];
  }
  
  export interface GoogleRoutesResponse {
    routes: Route[];
  }