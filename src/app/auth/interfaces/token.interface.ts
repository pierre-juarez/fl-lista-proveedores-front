export interface Permission {
  permission_id: number;
  permission_name: string;
}

export interface Role {
  rol_id: number;
  rol_name: string;
}

export interface Token {
  id: number;
  first_name: string;
  last_name: string;
  code: string;
  email: string;
  active: boolean;
  rol: Role;
  permissions: Permission[];
  iat: number; // Fecha de emisión del token (en formato UNIX timestamp)
  exp: number; // Fecha de expiración del token (en formato UNIX timestamp)
  aud: string; // Audiencia del token
}