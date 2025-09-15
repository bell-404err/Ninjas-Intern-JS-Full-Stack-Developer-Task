import prismaClient from '../../prisma/prismaClient.js'

class SuperheroService {
  async getAll(page = 1, limit = 5) {
    const skip = (page - 1) * limit;
    return prismaClient.character.findMany({
      skip,
      take: limit,
      include: {
        images: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id) {
    return prismaClient.character.findUnique({
      where: { id },
      include: {
        images: true,
      }
    })
  }

  async create({ nickname, realName, originDescription, superpowers, catchPhrase }, images) {
    return prismaClient.character.create({
      data: {
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
        images: {
          create: images || []
        },
      },
      include: {
        images: true,
      }
    });
  }

  async updateById(id, { nickname, realName, originDescription, superpowers, catchPhrase }, images) {
    return prismaClient.$transaction(async (tx) => {

      await tx.character.update({
        where: { id },
        data: {
          nickname,
          realName,
          originDescription,
          superpowers,
          catchPhrase,
        }
      })

      if (images?.length) {
        await tx.characterImages.deleteMany({
          where: { characterId: id }
        })

        await tx.characterImages.createMany({
          data: images.map((img) => ({
            url: img.url,
            isCover: img.isCover ?? false,
            order: img.order,
            characterId: id,
          })),
        })
      }

      return tx.character.findUnique({
        where: { id },
        include: {
          images: true,
        }
      })
    })
  }

  async deleteById(id) {
    return prismaClient.character.delete({
      where: { id },
      include: { images: true },
    })
  }

}

export default new SuperheroService();