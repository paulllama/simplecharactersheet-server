import { GameType } from 'models/game'
import Models from '../models'
import { SheetType } from 'models/sheet'

export type GameWithSheetsType = GameType & {
    sheets: Array<SheetType>
}

export const getAllActive = async (): Promise<Array<GameType>> => {
    return await Models.Game.find({ active: true }).select(['_id', 'name', 'code']).lean()
}

export const getOneWithSheetSummaries = async (gameId: string): Promise<GameWithSheetsType> => {
    const game = await Models.Game.findById(gameId).lean()
    if (!game) {
        throw Error(`game ${gameId} not found`)
    }

    const sheets = await Models.Sheet
        .find({ gameId: game._id })
        .select(['_id', 'name', 'icon', 'description'])
        .lean()

    return {
        ...game,
        sheets,
    }
}