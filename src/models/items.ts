import { atom, selectorFamily } from "recoil";

export const state = atom<readonly { header: string; items: string[] }[]>({
    key: "state",
    default: [
        { header: "A", items: ["A1", "A2", "A3", "A4"] },
        { header: "B", items: ["B1", "B2"] },
        { header: "C", items: ["C1", "C2", "C3"] },
    ],
});

export const itemsSelector = selectorFamily<string[], string>({
    key: "headersSelector",
    get:
        (header: string) =>
        ({ get }) =>
            get(state).find((column) => column.header === header)?.items ?? [],
});

export const parentHeaderSelector = selectorFamily<string | undefined, string>({
    key: "parentSelector",
    get:
        (id: string) =>
        ({ get }) =>
            get(state).find((column) => column.items.includes(id))?.header,
});
