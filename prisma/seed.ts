import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Senha123!', 10);

  await prisma.user.upsert({
    where: { login: 'client_user' },
    update: {},
    create: {
      login: 'client_user',
      password: passwordHash,
      name: 'Cliente',
      role: Role.CLIENT,
    },
  });

  await prisma.user.upsert({
    where: { login: 'admin_user' },
    update: {},
    create: {
      login: 'admin_user',
      password: passwordHash,
      name: 'Administrador',
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { login: 'root_user' },
    update: {},
    create: {
      login: 'root_user',
      password: passwordHash,
      name: 'Root User',
      role: Role.ROOT,
    },
  });

  console.log('Seed executada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
