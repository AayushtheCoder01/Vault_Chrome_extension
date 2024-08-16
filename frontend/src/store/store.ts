import {atom} from 'recoil'

export const loginAtom = atom({
    key: "LoginAtom",
    default: false,
})

export const themeAtom = atom({
    key: "theme atom",
    default: true,
})

export const userDataAtom = atom({
    key: "userDataAtom",
    default: {
        userId: null,
        email: "",
        vaults: [],
    }
})
