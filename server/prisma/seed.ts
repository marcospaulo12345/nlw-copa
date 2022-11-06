import { PrismaClient } from '@prisma/client'
import { getPrismaClient } from '@prisma/client/runtime'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "John.doe.@getPrismaClient.com",
            avatarUrl: "https://github.com/marcospaulo12345.png"
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: "Exemple Pool",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-04T12:00:00.661Z",
            fisrtTeamCountryCode: "DE",
            secondTeamCoutryCode: "BR",
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-05T12:00:00.661Z",
            fisrtTeamCountryCode: "BR",
            secondTeamCoutryCode: "AR",

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()