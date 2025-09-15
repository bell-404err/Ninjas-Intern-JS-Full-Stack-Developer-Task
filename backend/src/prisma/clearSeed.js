import prismaClient from  './prismaClient.js'

const clearingSeed = async () => {
  await prismaClient.characterImages.deleteMany();
  await prismaClient.character.deleteMany();
  console.log("Deleting data finished.");
}

clearingSeed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
