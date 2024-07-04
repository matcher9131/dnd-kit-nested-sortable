import { atom, selector, selectorFamily } from "recoil";

export const state = atom<readonly { header: string; items: string[] }[]>({
    key: "state",
    default: [
        { header: "A", items: ["A1", "A2", "A3", "A4"] },
        { header: "B", items: ["B1", "B2"] },
        { header: "C", items: ["C1", "C2", "C3"] },
    ],
});

export const headersSelector = selector<string[]>({
    key: "headersSelector",
    get: ({ get }) => get(state).map(({ header }) => header),
});

export const itemsSelector = selectorFamily<string[], string>({
    key: "headersSelector",
    get:
        (header: string) =>
        ({ get }) =>
            get(state).find((column) => column.header === header)?.items ?? [],
});
