import { CharacterType } from 'models/character'
import Models from '../models'

export const getOne = async (characterId: string): Promise<void | CharacterType> => {
    return await Models.Character.findById(characterId).lean() as CharacterType
}

// TODO: Update data in db so that sheets have their template blocks nested the same as game.templateBlocks
// (e.g. "Default Moves" and "Playbook Moves" should be nested under "Moves")
export const create = async (userId: string | null, gameId: string | null, sheetId?: string): Promise<CharacterType> => {
    if (!userId) {
        throw Error('userId not provided')
    }
    if (!gameId) {
        throw Error('gameId not provided')
    }

    const game = await Models.Game.findById(gameId).lean()
    if (!game) {
        throw Error(`game ${gameId} not found`)
    }
    const newCharacter = await Models.Character.create({
        userId,
        gameId,
        sheetId,
    })

    if (!sheetId) {
        newCharacter.set('blocks', game.sheetTemplate)
    } else {
        const sheet = await Models.Sheet.findById(sheetId).select(['templateBlocks', 'blocks']).lean()
        if (!sheet) {
            throw Error(`sheet ${sheetId} not found`)
        }
        const mergedBlocks = game.sheetTemplate.map((block) => block.blockType === 'blocks'
            ? sheet.blocks
            : {
                ...block,
                ...sheet.templateBlocks[block.name],
            }
        )
        console.log(mergedBlocks)
        newCharacter.set('blocks', mergedBlocks)
    }
    const characterWithBlocks = await newCharacter.save()
    console.log(characterWithBlocks.blocks)
    return characterWithBlocks.toJSON()
}

export const getAllForUser = async (userId: string | null): Promise<void | Array<CharacterType>> => {
    if (!userId) {
        throw new Error('userId not provided')
    }
    return await Models.Character.find({ userId }).lean() 
}

export const update = async (userId: string | null, characterId: string, characterData: any) => {
    if (!userId) {
        throw new Error('userId not provided')
    }
    const character = await Models.Character.findById(characterId).lean()
    console.log(character)
}