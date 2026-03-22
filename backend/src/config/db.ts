import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn"] 
    : ["error"],
});

const connectDb = async () => {
    try {
        console.log("Connecting to the database...");
        await prisma.$connect();
        console.log("Database connection established successfully.");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

const disconnectDb = async () => {
    await prisma.$disconnect();
    console.log("Database connection closed.");
}

export { prisma, connectDb, disconnectDb };
