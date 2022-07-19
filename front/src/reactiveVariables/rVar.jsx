import { makeVar } from '@apollo/client'

export const selectNodeTo = makeVar('')
export const possibleLinkNames = makeVar('')

export const selectedLink = makeVar([])
export const sourceNode = makeVar([])
export const targetNode = makeVar([])