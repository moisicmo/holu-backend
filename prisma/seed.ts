import { prisma } from '../src/lib/prisma';
import { Gender } from '@/generated/prisma/enums';

// if (process.env.NODE_ENV === 'production') {
//   console.log('Cannot run seed in production!');
//   process.exit(0);
// }
const gymNames = [
  "Titan Gym", "PowerHouse Fitness", "Iron Factory", "Muscle Pro Gym",
  "Extreme Fit Club", "Urban Fitness Center", "EnergyZone Gym",
  "MegaForce Gym", "BodyTech Max", "ProActive Gym",
  "FitClub Elite", "The Stronghold", "Spartan Fitness",
  "PumpNation", "BeastMode Gym", "Coliseo Fitness",
  "Evolution Gym", "Athletic Republic", "Oxygen Fitness",
  "GymBox", "FlexLab", "Alpha Fitness", "Barbell Studio",
  "LevelUp Gym", "Peak Performance Gym", "Revive Fitness",
  "PrimeFit Gym", "Magma Fitness", "Urban Iron Gym",
  "SportLife Center", "Endurance Gym", "Gorilla Gym",
  "Fitness Lab Pro", "Muscle Arena", "ApexStrength",
  "The Workout Zone", "Impulse Gym", "Black Diamond Fitness",
  "Victory Gym", "Fitness Hub", "Galaxy Gym", "Next Level Fitness",
  "Impact Fitness", "Iron Temple", "Blade Fitness", "Fortress Gym",
  "Vigor Fitness", "Raptor Gym", "SteelWorks Gym"
];
// Para coordenadas aleatorias dentro de La Paz
function randomCoord(base: number, variation = 0.01) {
  return base + (Math.random() * variation - variation / 2);
}

async function main() {
  console.log("Start of Seeding Data - ");
  // datos de configuración
  await prisma.equipment.createMany({
    data: [
      { name: 'Cinta de correr', type: 'Máquina de cardio', createdBy: 'system' },
      { name: 'Bicicleta estática', type: 'Máquina de cardio', createdBy: 'system' },
      { name: 'Elíptica', type: 'Máquina de cardio', createdBy: 'system' },
      { name: 'Remo', type: 'Máquina de cardio', createdBy: 'system' },
      { name: 'Prensa de piernas', type: 'Máquina de fuerza', createdBy: 'system' },
      { name: 'Máquina de pecho', type: 'Máquina de fuerza', createdBy: 'system' },
      { name: 'Máquina de espalda', type: 'Máquina de fuerza', createdBy: 'system' },
      { name: 'Mancuernas', type: 'Pesas libres', createdBy: 'system' },
      { name: 'Barras olímpicas', type: 'Pesas libres', createdBy: 'system' },
      { name: 'Kettlebells', type: 'Pesas libres', createdBy: 'system' },
      { name: 'Bandas de resistencia', type: 'Accesorios de entrenamiento', createdBy: 'system' },
      { name: 'Balones medicinales', type: 'Accesorios de entrenamiento', createdBy: 'system' },
    ]
  });
  const radioCategory = await prisma.radioCategory.create({
    data: {
      name: 'general',
      createdBy: 'system',
    }
  });
  await prisma.radio.createMany({
    data: [
      {
        stationUUID: '777d14b2-f344-11e9-a96c-52543be04c81',
        name: 'Los 40 Dance',
        url: 'http://playerservices.streamtheworld.com/api/livestream-redirect/LOS40_DANCE_SC',
        resolvedUrl: 'http://25443.live.streamtheworld.com:80/LOS40_DANCE_SC',
        image: 'https://recursosweb.prisaradio.com/fotos/original/010002753887.png',
        categoryId: radioCategory.id,
        bitrate: 128,
        codec: 'MP3',
        createdBy: 'system',
      },
      {
        stationUUID: 'f1174669-b7ad-4668-8369-db995e6ecc8d',
        name: 'NEUERSCHEINUNGEN',
        url: 'https://breakz-high.rautemusik.fm/?ref=rb-neuerscheinungen',
        resolvedUrl: 'https://rautemusik.stream43.radiohost.de/breakz?ref=rb-neuerscheinungen&upd-meta&upd-scheme=https&_art=dD0xNzY1ODI0NDQ0JmQ9NzRjOWMxYjQzZWYwNDdkYzg4NTM',
        image: 'https://i.ibb.co/7J492pjD/neuersachein.jpg',
        categoryId: radioCategory.id,
        bitrate: 192,
        codec: 'MP3',
        createdBy: 'system',
      },
    ]
  });
  const template = await prisma.template.create({
    data: {
      name: 'servicio',
      type: 'gimnasios',
      createdBy: 'system'
    }
  })
  for (let i = 0; i < gymNames.length; i++) {

    const name = gymNames[i] ?? `Gym ${i + 1}`;

    // Dirección aleatoria
    // const address = await prisma.address.create({
    //   data: {
    //     city: "La Paz",
    //     zone: `Zona ${["Sur", "Norte", "Central", "Este", "Oeste"][i % 5]}`,
    //     detail: `Calle ${Math.floor(Math.random() * 200)} Nº ${100 + i}`,
    //     latitude: randomCoord(-16.5),
    //     longitude: randomCoord(-68.15),
    //     createdBy
    //   }
    // });

    const tenant = await prisma.tenant.create({
      data: {
        templateId: template.id,
        name,
        colors: [],
        subdomain: name,
        createdBy: 'system'
      }
    });

    const branch = await prisma.branch.create({
      data: {
        tenantId: tenant.id,
        name: "Sucursal Principal",
        city: "La Paz",
        zone: `Zona ${["Sur", "Norte", "Central", "Este", "Oeste"][i % 5]}`,
        detail: `Calle ${Math.floor(Math.random() * 200)} Nº ${100 + i}`,
        latitude: randomCoord(-16.5),
        longitude: randomCoord(-68.15),
        createdBy: 'system',
      }
    });

    const plan = await prisma.plan.create({
      data: {
        branchId: branch.id,
        name: "Plan Estándar",
        description: "Acceso a máquinas, cardio y áreas comunes.",
        price: 150 + Math.floor(Math.random() * 80),
        duration: 30,
        accessDays: 7,
        createdBy: 'system',
      }
    });

    const schedules = [
      { start: "07:00", end: "22:00" }, // Lunes
      { start: "07:00", end: "22:00" }, // Martes
      { start: "07:00", end: "22:00" }, // Miércoles
      { start: "07:00", end: "22:00" }, // Jueves
      { start: "07:00", end: "22:00" }, // Viernes
      { start: "08:00", end: "20:00" }, // Sábado
      { start: "09:00", end: "14:00" }  // Domingo
    ];

    await prisma.planSchedule.createMany({
      data: schedules.map((s, idx) => ({
        dayOfWeek: idx + 1,
        startTime: s.start,
        endTime: s.end,
        planId: plan.id,
        createdBy: 'system'
      }))
    });

  }
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