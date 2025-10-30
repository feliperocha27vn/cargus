import { hash } from 'bcryptjs'
import { prisma } from 'lib/prisma'

async function main() {
  await prisma.users.create({
    data: {
      email: 'felipe@example.com',
      name: 'Felipe',
      passwordHash: await hash('123456', 10),
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
