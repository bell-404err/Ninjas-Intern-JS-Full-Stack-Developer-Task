import prismaClient from  './prismaClient.js'

const superheroSeed = async () => {

  const characters = [
    {
      nickname: 'Batman',
      realName: 'Bruce Wayne',
      originDescription: 'A billionaire vigilante protecting Gotham.',
      superpowers: 'Martial arts, detective skills, gadgets',
      catchPhrase: 'I am Batman!',
      images: [
        {
          url: '/uploads/batman.webp',
          isCover: true,
          order: 0
        },
        {
          url: '/uploads/batman1.webp',
          isCover: false,
          order: 1
        },
        {
          url: '/uploads/batman2.webp',
          isCover: false,
          order: 2
        }
      ]
    },
    {
      nickname: 'Superman',
      realName: 'Clark Kent',
      originDescription: 'An alien from Krypton with superhuman powers.',
      superpowers: 'Super strength, flight, heat vision',
      catchPhrase: 'Truth, justice, and a better tomorrow!',
      images: [
        {
          url: '/uploads/superman.png',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Spider-Man',
      realName: 'Peter Parker',
      originDescription: 'A teenager bitten by a radioactive spider.',
      superpowers: 'Wall-crawling, spider-sense, super agility',
      catchPhrase: 'With great power comes great responsibility.',
      images: [
        {
          url: '/uploads/spiderman.png',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Iron Man',
      realName: 'Tony Stark',
      originDescription: 'A genius billionaire in a powered suit of armor.',
      superpowers: 'Powered armor, genius-level intellect',
      catchPhrase: 'I am Iron Man.',
      images: [
        {
          url: '/uploads/ironman.png',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Wonder Woman',
      realName: 'Diana Prince',
      originDescription: 'An Amazon warrior princess.',
      superpowers: 'Super strength, combat skills, Lasso of Truth',
      catchPhrase: 'In the name of all that is good!',
      images: [
        {
          url: '/uploads/wonderwoman.webp',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Hulk',
      realName: 'Bruce Banner',
      originDescription: 'A scientist who transforms when angry.',
      superpowers: 'Superhuman strength, regeneration',
      catchPhrase: 'Hulk smash!',
      images: [
        {
          url: '/uploads/hulk.png',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Thor',
      realName: 'Thor Odinson',
      originDescription: 'The Norse God of Thunder.',
      superpowers: 'Godly strength, thunder, Mjolnir',
      catchPhrase: 'For Asgard!',
      images: [
        {
          url: '/uploads/thor.webp',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Flash',
      realName: 'Barry Allen',
      originDescription: 'The fastest man alive.',
      superpowers: 'Super speed, time travel',
      catchPhrase: 'Fastest man alive!',
      images: [
        {
          url: '/uploads/flash.jpg',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Doctor Strange',
      realName: 'Stephen Strange',
      originDescription: 'The Sorcerer Supreme.',
      superpowers: 'Magic, dimensional travel',
      catchPhrase: 'By the Hoary Hosts of Hoggoth!',
      images: [
        {
          url: '/uploads/doctorstrange.jpg',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Deadpool',
      realName: 'Wade Wilson',
      originDescription: 'The merc with a mouth.',
      superpowers: 'Regeneration, martial arts',
      catchPhrase: 'Maximum effort!',
      images: [
        {
          url: '/uploads/deadpool.webp',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Black Panther',
      realName: 'T’Challa',
      originDescription: 'The king of Wakanda.',
      superpowers: 'Enhanced senses, combat skills, vibranium suit',
      catchPhrase: 'Wakanda forever!',
      images: [
        {
          url: '/uploads/blackpanther.png',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Green Lantern',
      realName: 'Hal Jordan',
      originDescription: 'A fearless test pilot chosen by the ring.',
      superpowers: 'Power ring constructs, flight',
      catchPhrase: 'In brightest day, in blackest night...',
      images: [
        {
          url: '/uploads/greenlathern.webp',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Aquaman',
      realName: 'Arthur Curry',
      originDescription: 'King of Atlantis.',
      superpowers: 'Control over sea life, super strength',
      catchPhrase: 'The sea is my kingdom!',
      images: [
        {
          url: '/uploads/aquaman.webp',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Wolverine',
      realName: 'Logan',
      originDescription: 'A mutant with claws and healing factor.',
      superpowers: 'Adamantium claws, regeneration, senses',
      catchPhrase: 'I’m the best at what I do.',
      images: [
        {
          url: '/uploads/wolverine.jpg',
          isCover: true,
          order: 0
        }
      ]
    },
    {
      nickname: 'Captain America',
      realName: 'Steve Rogers',
      originDescription: 'A super-soldier from WWII.',
      superpowers: 'Enhanced strength, shield mastery',
      catchPhrase: 'I can do this all day.',
      images: [
        {
          url: '/uploads/captainamerica.webp',
          isCover: true,
          order: 0
        }
      ]
    },
  ];

  for (const char of characters) {
    await prismaClient.character.create({
      data: {
        nickname: char.nickname,
        realName: char.realName,
        originDescription: char.originDescription,
        superpowers: char.superpowers,
        catchPhrase: char.catchPhrase,
        images: char.images ? { create: char.images } : undefined,
      },
    });
  }
}

superheroSeed()
  .then(async () => {
    console.log('Seeding finished.');
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
