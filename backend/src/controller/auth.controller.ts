import type { Request, Response } from "express";
import { generateToken } from "../utils/generateToken.js";
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../services/email.service.js";

const register = async (req: Request, res: Response) => {
  const body = req.body;
  const { email, password, firstName, lastName, phoneNumber, address } = body;

  const userExists = await prisma.user.findUnique({
    where: { email }
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate 6-digit verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationCodeExp = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'USER',
      firstName,
      lastName,
      phoneNumber,
      emailVerified: false,
      verificationCode,
      verificationCodeExp,
      address: {
        create: {
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country
        }
      }
    },
    include: {
      address: true
    }
  });

  // Send verification email
  await sendVerificationEmail(email, verificationCode, firstName);

  // Success - Return user ID for verification step
  res.status(201).json({
    status: "success",
    message: "Un code de vérification a été envoyé à votre email",
    data: {
      userId: user.id,
      email: email,
      requiresVerification: true
    },
  });
};


const login = async (req: Request, res: Response) => {
	const {email, password} = req.body;

	const user = await prisma.user.findUnique({
		where: {email: email},
	});

	if (!user) {
		return res
			.status(401)
			.json({ error: "Invalid email or password" });
	}

	// Verify password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return res
			.status(401)
			.json({ error: "Invalid email or password" });
	}

	// Generate JWT token
	const token = generateToken(user.id, res);

	res.status(201).json({
		status: "success",
		data: {
			user: {
			  id: user.id,
				email: email,
				role: user.role,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			token,
		},
	});
};


const logout = async (req: Request, res: Response) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0)
	});

	res.status(200).json({
		status: "success",
		message: "Logged out successfully",
	});
};

const getMe = async (req: Request, res: Response) => {
  const user = req.user; 

	if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    }
  });
};

const verifyEmail = async (req: Request, res: Response) => {
  const { userId, code } = req.body;

  if (!userId || !code) {
    return res.status(400).json({
      error: "userId et code sont requis"
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    include: { address: true }
  });

  if (!user) {
    return res.status(404).json({
      error: "Utilisateur non trouvé"
    });
  }

  if (user.emailVerified) {
    return res.status(400).json({
      error: "Email déjà vérifié"
    });
  }

  if (!user.verificationCode || !user.verificationCodeExp) {
    return res.status(400).json({
      error: "Aucun code de vérification trouvé"
    });
  }

  if (new Date() > user.verificationCodeExp) {
    return res.status(400).json({
      error: "Le code de vérification a expiré"
    });
  }

  if (user.verificationCode !== code) {
    return res.status(400).json({
      error: "Code de vérification incorrect"
    });
  }

  // Mark email as verified and clear verification code
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationCode: null,
      verificationCodeExp: null,
    },
    include: { address: true }
  });

  // Generate JWT token
  const token = generateToken(updatedUser.id, res);

  // Success
  res.status(200).json({
    status: "success",
    message: "Email vérifié avec succès",
    data: {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address
      },
      token,
    },
  });
};

const resendVerificationCode = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: "userId est requis"
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) }
  });

  if (!user) {
    return res.status(404).json({
      error: "Utilisateur non trouvé"
    });
  }

  if (user.emailVerified) {
    return res.status(400).json({
      error: "Email déjà vérifié"
    });
  }

  // Generate new code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationCodeExp = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationCode,
      verificationCodeExp,
    },
  });

  // Send verification email
  await sendVerificationEmail(user.email, verificationCode, user.firstName);

  res.status(200).json({
    status: "success",
    message: "Un nouveau code de vérification a été envoyé",
  });
};

export { register, login, logout, getMe, verifyEmail, resendVerificationCode };