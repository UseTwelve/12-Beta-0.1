import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

 
 type TokenType = {
  accessToken: string;
  refreshToken: string;
};

type UserType = {
  id: number;
  name: string;
};

type ChurchType = {
  id: number;
  name: string;
  logo: string;
  physicalAddress: string;
  googleSheetLink: string;
  spreadsheetId: string;
  hasCrm: boolean;
};

type ChurchInfoType = {
  id: number;
  active: boolean;
  userId: number;
  churchId: number;
  roleId: number;
  church: ChurchType;
};

type UserTypeDetails = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  isVerified: boolean;
  active: boolean;
  userType: UserType;
  churchInfo?: ChurchInfoType;
};

type Session = {
  tokens: TokenType;
  user: UserTypeDetails;
};

}