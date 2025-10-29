import { hash } from "bcryptjs";
import { prisma } from "lib/prisma";

async function main() {
    await prisma.users.create({
        data: {
            email: "johndoe@example.com",
            name: "John Doe",
            passwordHash: await hash('password123', 10),
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })