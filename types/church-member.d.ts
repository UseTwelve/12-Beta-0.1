export type Church = {
  id: number;
  name: string;
  logo: string;
  physicalAddress: string;
  googleSheetLink: string;
  spreadsheetId: string;
  hasCrm: boolean;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  isVerified: boolean;
  verificationToken: string | null;
  password: string;
  passwordResetToken: string | null;
  passwordChangedAt: string | null;
  passwordResetExpires: string | null;
  userTypeId: number;
  createdAt: string;
};

export type Role = {
  id: number;
  name: string;
};

export type Member = {
  id: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  churchId: number;
  roleId: number;
  church: Church;
  user: User;
  role: Role;
};
