export function transformDataToSelectData<T>(
    data: T[],
    labelKey: keyof T,
    valueKey: keyof T | `${string}.${string}`
): { value: string; label: string }[] {
    const isNestedValueKey =
        typeof valueKey === "string" && valueKey.includes(".");

    if (isNestedValueKey) {
        const [parentKey, childKey] = valueKey.toString().split(".");

        return data.map((item) => ({
            value: item[parentKey as keyof T][
                childKey as keyof T[keyof T]
            ] as string,
            label: item[labelKey] as string,
        }));
    }

    return data.map((item) => ({
        value: item[valueKey as keyof T] as string,
        label: item[labelKey] as string,
    }));
}
