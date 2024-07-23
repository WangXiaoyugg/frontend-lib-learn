declare function Omit<T, K extends keyof T>(obj: T, key: Array<K>): Omit<T, K>;
export default Omit;