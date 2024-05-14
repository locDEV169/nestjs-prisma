import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export class UtilsService {
    private static _instance: UtilsService
    private readonly _hashText = '2a10TEoTTNp8SpRb3H8HpRjJ098RNcoARSgQIE29pKVk8sSJU4HZMFW'

    static getInstance() {
        if (this._instance) return this._instance
        this._instance = new UtilsService()
        Object.freeze(this._instance)
        return this._instance
    }

    /**
     * Convert original text to hash text
     *
     * @param text
     * @returns The hash text
     */
    hashValue(text: string) {
        return hashSync(text, genSaltSync(10))
    }

    /**
     * Compare hash
     *
     * @param text
     * @param hashText
     * @returns result
     */
    compareHash(text: string, hashText: string) {
        return compareSync(text, hashText)
    }
}
