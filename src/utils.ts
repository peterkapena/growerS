export function getEnumValues<VT, DT>(
  enumObj: any
): { value: VT; description: DT }[] {
  const enumDescriptions = {};
  Object.keys(enumObj).forEach((key) => {
    const value = enumObj[key];
    if (typeof value === "number") {
      enumDescriptions[value] = key;
    }
  });
  return Object.keys(enumObj)
    .filter((key) => !isNaN(Number(enumObj[key])))
    .map((key) => ({
      value: Number(enumObj[key]) as VT,
      description: enumDescriptions[Number(enumObj[key])] as DT,
    }));
}

export function getEnumName<T>(enumObject: T, value: Number): keyof T {
  const keys = Object.keys(enumObject).filter(
    (k) => typeof enumObject[k as any] === "number"
  );
  const key = keys.find((k) => enumObject[k as any] === value);
  if (key === undefined) {
    throw new Error(`Invalid enum value: ${value}`);
  }
  return key as keyof T;
}
