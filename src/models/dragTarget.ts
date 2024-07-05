import { atom } from "recoil";

export const activeIdState = atom<string | null>({ key: "activeIdAtom", default: null });

export const overIdState = atom<string | null>({ key: "overIdAtom", default: null });
