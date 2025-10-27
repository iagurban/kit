// Define your app's User type
export interface AppUser {
  id: string; // From the 'sub' claim
  email: string;
  roles: string[];
  username: string;
}

// Define the expected payload structure from Keycloak
export interface KeycloakPayload {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  realm_access?: {
    roles: string[];
  };
}
