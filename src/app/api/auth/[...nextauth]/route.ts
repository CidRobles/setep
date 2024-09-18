// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectDB, dbConnect } from "@/lib/mongodb";
import Agremiado from "@/lib/models/Agremiado";
import bcrypt from 'bcrypt'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                expediente: { label: "Expediente", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Connect to MongoDB
                await connectDB()

                // Fetch user by email
                const agremiado = await Agremiado.findOne({ expediente: credentials.expediente });
                if (!agremiado) {
                    throw new Error(`El expediente ${credentials.expediente} no está registrado en el sistema.`);
                }

                // Compare password
                const isValidPassword = await bcrypt.compare(String(credentials.password).toUpperCase(), agremiado.password)
                if (!isValidPassword) {
                    throw new Error("La contraseña es incorrecta.");
                }

                // If everything is fine, return the user object
                return agremiado
            },
        }),
    ],
    adapter: MongoDBAdapter(dbConnect),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login", // Custom sign-in page
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
