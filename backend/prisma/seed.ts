import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

console.log("DB URL:", process.env.DATABASE_URL);

// Le mot de passe pour tous ces comptes en clair est : password
const HASHED_PASSWORD = bcrypt.hashSync("password", 10);

const users: Prisma.UserCreateInput[] = [
  // Compte administrateur
  {
    email: "admin@irisbank.fr",
    password: HASHED_PASSWORD,
    role: "ADMIN",
    firstName: "Admin",
    lastName: "IRIS Bank",
    phoneNumber: "0600000000",
    address: {
      create: {
        street: "1 Place de la Banque",
        city: "Paris",
        state: "Île-de-France",
        zipCode: "75000",
        country: "France"
      }
    }
  },
  // Comptes clients
  {
    email: "jean.dupont@email.fr",
    password: HASHED_PASSWORD,
    role: "USER",
    firstName: "Jean",
    lastName: "Dupont",
    phoneNumber: "0612345678",
    address: {
      create: {
        street: "15 Rue de la République",
        city: "Paris",
        state: "Île-de-France",
        zipCode: "75001",
        country: "France"
      }
    },
    accounts: {
      create: [
        {
          iban: "FR7630001007941234567890123",
          type: "CHECKING",
          balance: 1450.50,
          status: "ACTIVE",
          transactions: {
            create: [
              { type: "DEPOSIT", amount: 2500, description: "Salaire", date: new Date("2024-03-01T08:00:00Z") },
              { type: "PAYMENT", amount: 65.50, description: "Courses Carrefour", date: new Date("2024-03-02T14:30:00Z") },
              { type: "PAYMENT", amount: 900, description: "Loyer", date: new Date("2024-03-03T09:00:00Z") },
              { type: "WITHDRAWAL", amount: 50, description: "Retrait DAB", date: new Date("2024-03-05T18:15:00Z") },
              { type: "PAYMENT", amount: 29.99, description: "Abonnement Internet", date: new Date("2024-03-07T10:00:00Z") },
              { type: "PAYMENT", amount: 15, description: "Netflix", date: new Date("2024-03-08T20:00:00Z") },
              { type: "TRANSFER", amount: 40, description: "Remboursement resto Luc", date: new Date("2024-03-10T12:00:00Z") },
              { type: "PAYMENT", amount: 120, description: "Facture EDF", date: new Date("2024-03-12T08:45:00Z") },
              { type: "PAYMENT", amount: 80, description: "Essence Total", date: new Date("2024-03-14T17:30:00Z") },
              { type: "DEPOSIT", amount: 35, description: "Remboursement Sécu", date: new Date("2024-03-15T11:20:00Z") }
            ]
          }
        },
        {
          iban: "FR7630001007941234567890999",
          type: "SAVINGS",
          balance: 15000,
          status: "ACTIVE",
          transactions: {
            create: [
              { type: "DEPOSIT", amount: 10000, description: "Ouverture livret", date: new Date("2023-01-10T10:00:00Z") },
              { type: "DEPOSIT", amount: 500, description: "Épargne mars", date: new Date("2023-03-01T10:00:00Z") },
              { type: "DEPOSIT", amount: 500, description: "Épargne avril", date: new Date("2023-04-01T10:00:00Z") },
              { type: "DEPOSIT", amount: 500, description: "Épargne mai", date: new Date("2023-05-01T10:00:00Z") },
              { type: "DEPOSIT", amount: 500, description: "Épargne juin", date: new Date("2023-06-01T10:00:00Z") },
              { type: "DEPOSIT", amount: 500, description: "Épargne juillet", date: new Date("2023-07-01T10:00:00Z") },
              { type: "WITHDRAWAL", amount: 2000, description: "Achat voiture", date: new Date("2023-08-15T14:00:00Z") },
              { type: "DEPOSIT", amount: 500, description: "Épargne septembre", date: new Date("2023-09-01T10:00:00Z") },
              { type: "DEPOSIT", amount: 500, description: "Épargne octobre", date: new Date("2023-10-01T10:00:00Z") },
              { type: "DEPOSIT", amount: 3500, description: "Prime fin d'année", date: new Date("2023-12-20T09:30:00Z") }
            ]
          }
        }
      ]
    }
  },
  {
    email: "marie.martin@email.fr",
    password: HASHED_PASSWORD,
    role: "USER",
    firstName: "Marie",
    lastName: "Martin",
    phoneNumber: "0698765432",
    address: {
      create: {
        street: "8 Avenue des Champs",
        city: "Lyon",
        state: "Auvergne-Rhône-Alpes",
        zipCode: "69002",
        country: "France"
      }
    },
    accounts: {
      create: [
        {
          iban: "FR7620041010050500013M02601",
          type: "CHECKING",
          balance: 890.20,
          status: "ACTIVE",
          transactions: {
            create: [
              { type: "DEPOSIT", amount: 2200, description: "Salaire", date: new Date("2024-03-02T08:00:00Z") },
              { type: "PAYMENT", amount: 800, description: "Loyer", date: new Date("2024-03-04T09:00:00Z") },
              { type: "PAYMENT", amount: 110.50, description: "SNCF", date: new Date("2024-03-05T14:30:00Z") },
              { type: "PAYMENT", amount: 45, description: "Restaurant", date: new Date("2024-03-08T21:15:00Z") },
              { type: "WITHDRAWAL", amount: 60, description: "Retrait DAB", date: new Date("2024-03-10T10:00:00Z") },
              { type: "PAYMENT", amount: 30, description: "Salle de sport", date: new Date("2024-03-11T07:00:00Z") },
              { type: "PAYMENT", amount: 150, description: "Assurance", date: new Date("2024-03-12T08:45:00Z") },
              { type: "PAYMENT", amount: 75, description: "Courses Auchan", date: new Date("2024-03-13T18:30:00Z") },
              { type: "TRANSFER", amount: 50, description: "Cadeau d'anniversaire", date: new Date("2024-03-14T12:20:00Z") },
              { type: "PAYMENT", amount: 20, description: "Pharmacie", date: new Date("2024-03-15T09:10:00Z") }
            ]
          }
        },
        {
          iban: "FR7620041010050500013M02699",
          type: "BUSINESS",
          balance: 5400.00,
          status: "ACTIVE",
          transactions: {
            create: [
              { type: "DEPOSIT", amount: 3000, description: "Facture Client A", date: new Date("2024-02-15T10:00:00Z") },
              { type: "DEPOSIT", amount: 4500, description: "Facture Client B", date: new Date("2024-02-28T14:00:00Z") },
              { type: "PAYMENT", amount: 200, description: "Logiciels pro", date: new Date("2024-03-01T09:00:00Z") },
              { type: "PAYMENT", amount: 450, description: "URSSAF", date: new Date("2024-03-05T10:00:00Z") },
              { type: "PAYMENT", amount: 150, description: "Expert comptable", date: new Date("2024-03-06T11:00:00Z") },
              { type: "WITHDRAWAL", amount: 1000, description: "Rémunération gérant", date: new Date("2024-03-07T12:00:00Z") },
              { type: "PAYMENT", amount: 80, description: "Fournitures bureau", date: new Date("2024-03-08T15:00:00Z") },
              { type: "DEPOSIT", amount: 1200, description: "Facture Client C", date: new Date("2024-03-10T10:00:00Z") },
              { type: "PAYMENT", amount: 300, description: "Frais déplacement", date: new Date("2024-03-12T16:00:00Z") },
              { type: "PAYMENT", amount: 120, description: "Abonnement pro", date: new Date("2024-03-15T09:00:00Z") }
            ]
          }
        }
      ]
    }
  },
  {
    email: "luc.bernard@email.fr",
    password: HASHED_PASSWORD,
    role: "USER",
    firstName: "Luc",
    lastName: "Bernard",
    phoneNumber: "0611223344",
    address: {
      create: {
        street: "24 Boulevard Jaurès",
        city: "Toulouse",
        state: "Occitanie",
        zipCode: "31000",
        country: "France"
      }
    },
    accounts: {
      create: [
        {
          iban: "FR7610096020050500013M02602",
          type: "CHECKING",
          balance: 210.50,
          status: "ACTIVE",
          transactions: {
            create: [
              { type: "DEPOSIT", amount: 1800, description: "Salaire", date: new Date("2024-03-01T09:00:00Z") },
              { type: "PAYMENT", amount: 750, description: "Loyer", date: new Date("2024-03-02T09:00:00Z") },
              { type: "PAYMENT", amount: 120, description: "Courses Super U", date: new Date("2024-03-04T18:30:00Z") },
              { type: "PAYMENT", amount: 60, description: "Jeu vidéo", date: new Date("2024-03-06T20:15:00Z") },
              { type: "WITHDRAWAL", amount: 40, description: "Retrait DAB", date: new Date("2024-03-08T19:00:00Z") },
              { type: "PAYMENT", amount: 25, description: "Spotify", date: new Date("2024-03-09T10:00:00Z") },
              { type: "TRANSFER", amount: 100, description: "Remboursement prêt", date: new Date("2024-03-11T12:00:00Z") },
              { type: "PAYMENT", amount: 50, description: "Mutuelle", date: new Date("2024-03-12T08:45:00Z") },
              { type: "PAYMENT", amount: 90, description: "Billet concert", date: new Date("2024-03-14T14:30:00Z") },
              { type: "DEPOSIT", amount: 15, description: "Virement ami", date: new Date("2024-03-15T16:20:00Z") }
            ]
          }
        }
      ]
    }
  },
  {
    email: "sophie.petit@email.fr",
    password: HASHED_PASSWORD,
    role: "USER",
    firstName: "Sophie",
    lastName: "Petit",
    phoneNumber: "0655667788",
    address: {
      create: {
        street: "10 Place de la Bourse",
        city: "Bordeaux",
        state: "Nouvelle-Aquitaine",
        zipCode: "33000",
        country: "France"
      }
    },
    accounts: {
      create: [
        {
          iban: "FR7610096020050500013M02603",
          type: "CHECKING",
          balance: 3200.00,
          status: "ACTIVE",
          transactions: {
            create: [
              { type: "DEPOSIT", amount: 4500, description: "Salaire", date: new Date("2024-03-03T09:00:00Z") },
              { type: "PAYMENT", amount: 1200, description: "Loyer", date: new Date("2024-03-04T09:00:00Z") },
              { type: "PAYMENT", amount: 300, description: "Courses Leclerc", date: new Date("2024-03-06T15:30:00Z") },
              { type: "PAYMENT", amount: 150, description: "Boutique vêtements", date: new Date("2024-03-08T14:15:00Z") },
              { type: "WITHDRAWAL", amount: 100, description: "Retrait DAB", date: new Date("2024-03-09T11:00:00Z") },
              { type: "PAYMENT", amount: 60, description: "Coiffeur", date: new Date("2024-03-10T16:00:00Z") },
              { type: "TRANSFER", amount: 200, description: "Épargne", date: new Date("2024-03-11T12:00:00Z") },
              { type: "PAYMENT", amount: 80, description: "Restaurant", date: new Date("2024-03-13T21:45:00Z") },
              { type: "PAYMENT", amount: 45, description: "Fleuriste", date: new Date("2024-03-14T10:30:00Z") },
              { type: "DEPOSIT", amount: 25, description: "Remboursement Vinted", date: new Date("2024-03-15T13:20:00Z") }
            ]
          }
        }
      ]
    }
  },
  {
    email: "thomas.robert@email.fr",
    password: HASHED_PASSWORD,
    role: "USER",
    firstName: "Thomas",
    lastName: "Robert",
    phoneNumber: "0699887766",
    address: {
      create: {
        street: "5 Cours Franklin Roosevelt",
        city: "Marseille",
        state: "Provence-Alpes-Côte d'Azur",
        zipCode: "13001",
        country: "France"
      }
    },
    accounts: {
      create: [
        {
          iban: "FR7610096020050500013M02604",
          type: "CHECKING",
          balance: 50.10,
          status: "ACTIVE",
          transactions: {
            create: [
              { type: "DEPOSIT", amount: 1600, description: "Salaire", date: new Date("2024-03-01T09:00:00Z") },
              { type: "PAYMENT", amount: 650, description: "Loyer", date: new Date("2024-03-02T09:00:00Z") },
              { type: "PAYMENT", amount: 90, description: "Courses Lidl", date: new Date("2024-03-04T17:30:00Z") },
              { type: "PAYMENT", amount: 40, description: "Abonnement transport", date: new Date("2024-03-05T08:15:00Z") },
              { type: "WITHDRAWAL", amount: 20, description: "Retrait DAB", date: new Date("2024-03-07T12:00:00Z") },
              { type: "PAYMENT", amount: 15, description: "Fast-food", date: new Date("2024-03-09T13:00:00Z") },
              { type: "TRANSFER", amount: 30, description: "Participation cadeau", date: new Date("2024-03-10T15:00:00Z") },
              { type: "PAYMENT", amount: 120, description: "Garagiste", date: new Date("2024-03-12T10:45:00Z") },
              { type: "PAYMENT", amount: 50, description: "Téléphone", date: new Date("2024-03-14T09:30:00Z") },
              { type: "DEPOSIT", amount: 10, description: "Virement Paylib", date: new Date("2024-03-15T18:20:00Z") }
            ]
          }
        }
      ]
    }
  }
];

const main = async () => {
  console.log("Clearing existing data...");
  await prisma.transaction.deleteMany();
  await prisma.bankAccount.deleteMany();
  await prisma.address.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.beneficiary.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding database...");
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user
    });
    console.log(`Created user: ${createdUser.firstName} ${createdUser.lastName}`);
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });