export interface LoginConfiguration {
  typeIdentification: string;
  modeIdentification: string;
  libelleIdentifiant: string;
  adminConfig: {
    login: string;
    password: string;
  };
  gestionnaires: Array<{
    login: string;
    password: string;
  }>;
}

export enum ModeIdentification {
  MATRICULE = 'matricule',
  BADGE = 'badge',
  BADGE_VISIBLE = 'badge_visible',
  CODE_CLIENT = 'code_client',
  EMAIL = 'email'
}