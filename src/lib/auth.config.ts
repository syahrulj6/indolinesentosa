export const authConfig = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [],
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    authorized({ auth, request }: { auth: any; request: any }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith('/adminform/form/admin');
      const isOnSigninPage = request.nextUrl?.pathname.startsWith('/auth/signin');
      const isOnSignupPage = request.nextUrl?.pathname.startsWith('/auth/signup');

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      if (isOnAdminPanel && !user) {
        return false;
      }
      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (isOnSigninPage && user) {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      if (isOnSignupPage && user) {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      return true;
    },
  },
};
