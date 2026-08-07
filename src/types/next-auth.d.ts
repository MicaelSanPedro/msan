import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    login?: string;
  }
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      accessToken?: string;
      login?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    login?: string;
  }
}
