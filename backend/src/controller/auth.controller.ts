import type { Request, Response } from "express";
import { generateToken } from "../utils/generateToken.js";
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs"

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

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'USER',
      firstName, 
      lastName, 
      phoneNumber,
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

  // Generate JWT token
  const token = generateToken(user.id, res);

  // Success
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
        role: user.role,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: user.address 
      },
      token,
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

export { register, login, logout, getMe };