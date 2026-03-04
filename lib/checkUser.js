import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  try {
    const loggedInUser = await db.user.findUnique({
      where: { ClerkUserId: user.id },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;
    const newUser = await db.user.create({
      data: {
        ClerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: name,
        imageUrl: user.imageUrl,
      },
    });
    return newUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};
