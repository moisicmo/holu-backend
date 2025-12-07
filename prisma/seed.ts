import { prisma } from '../src/lib/prisma';
import { Gender } from '@/generated/prisma/enums';

// if (process.env.NODE_ENV === 'production') {
//   console.log('Cannot run seed in production!');
//   process.exit(0);
// }

async function main() {
  console.log("Start of Seeding Data - ");
  //Start of users data
  const users = [
    {
      name: 'Admin',
      lastName: '',
      gender: Gender.male,
      email: 'admin@example.com',
      password: 'admin',
      createdBy: 'system',
    },
    {
      name: 'User',
      lastName: '',
      gender: Gender.male,
      email: 'user@example.com',
      password: 'user',
      createdBy: 'system',
    }
  ];

  for (const user of users) {
    const result = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    console.log(`User "${user.name}" (${user.email}) → ${result.id ? 'Created' : 'Already exists'}`);
  }


  await prisma.tenant.upsert({
    where: { subdomain: '/' },
    update: {},
    create: {
      template: {
        create: {
          name: 'saas',
          type: 'service',
          createdBy: 'system'
        }
      },
      name: 'holu',
      colors: [],
      subdomain: '/',
      createdBy: 'system',
    }
  });
  console.log(`tenant holu crate`)

  console.log("Seed done");
}

main().
  catch(e => console.error(e)).
  finally(() => {
    console.log("Disconnected with DB")
    prisma.$disconnect()
  });