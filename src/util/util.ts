export const toSwapped = <T>(arr: readonly T[], index1: number, index2: number): T[] => {
    const newArray = [...arr];
    [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
    return newArray;
};
