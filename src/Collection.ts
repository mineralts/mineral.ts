/**
 * A Map with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has
 * an ID, for significantly improved performance and ease-of-use.
 */
export default class Collection<K, V> extends Map<K, V> {
  public static readonly default: typeof Collection = Collection

  public get<T = V> (key: K): T | undefined {
    return super.get(key) as unknown as T
  }

  public hasAll (...keys: K[]): boolean {
    return keys.every((k) => super.has(k))
  }

  public hasAny (...keys: K[]): boolean {
    return keys.some((k) => super.has(k))
  }

  public first<T = V> (): T | undefined {
    return this.at(0) as unknown as T
  }

  public last<T = V> (): T | undefined {
    const arr = [...this.values()]
    return arr[arr.length] as unknown as T
  }

  public at (index: number) {
    const arr = [...this.values()]
    return arr.at(index)
  }

  public random<T = V> (): T | undefined {
    const arr = [...this.values()]
    return arr[Math.floor(Math.random() * arr.length)] as unknown as T
  }

  public reverse() {
    const entries = [...this.entries()].reverse()
    this.clear()
    for (const [key, value] of entries) this.set(key, value)

    return this
  }

  public find<T extends V>(fn: (value: V, key: K, collection: this) => value is T): T | undefined
  public find(fn: (value: V, key: K, collection: this) => boolean): V | undefined
  public find<This, V2 extends V>(fn: (this: This, value: V, key: K, collection: this) => value is V2, thisArg: This): V2 | undefined
  public find<This>(fn: (this: This, value: V, key: K, collection: this) => boolean, thisArg: This): V | undefined
  public find(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | undefined {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg)
    for (const [key, val] of this) {
      if (fn(val, key, this)) return val
    }

    return undefined
  }

  public filter<K2 extends K>(fn: (value: V, key: K, collection: this) => key is K2): Collection<K2, V>
  public filter<V2 extends V>(fn: (value: V, key: K, collection: this) => value is V2): Collection<K, V2>
  public filter(fn: (value: V, key: K, collection: this) => boolean): Collection<K, V>
  public filter<This, K2 extends K>(fn: (this: This, value: V, key: K, collection: this) => key is K2, thisArg: This): Collection<K2, V>
  public filter<This, V2 extends V>(fn: (this: This, value: V, key: K, collection: this) => value is V2, thisArg: This): Collection<K, V2>
  public filter<This>(fn: (this: This, value: V, key: K, collection: this) => boolean, thisArg: This): Collection<K, V>
  public filter(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): Collection<K, V> {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg)
    const results = new this.constructor[Symbol.species]<K, V>()
    for (const [key, val] of this) {
      if (fn(val, key, this)) results.set(key, val)
    }

    return results
  }

  public flatMap<T>(fn: (value: V, key: K, collection: this) => Collection<K, T>): Collection<K, T>
  public flatMap<T, This>(fn: (this: This, value: V, key: K, collection: this) => Collection<K, T>, thisArg: This): Collection<K, T>
  public flatMap<T>(fn: (value: V, key: K, collection: this) => Collection<K, T>, thisArg?: unknown): Collection<K, T> {
    const collections = this.map(fn, thisArg)
    return new this.constructor[Symbol.species]<K, T>().concat(...collections)
  }

  public map<T>(fn: (value: V, key: K, collection: this) => T): T[]
  public map<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): T[]
  public map<T>(fn: (value: V, key: K, collection: this) => T, thisArg?: unknown): T[] {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg)
    const iter = this.entries()

    return Array.from({ length: this.size }, (): T => {
      const [key, value] = iter.next().value
      return fn(value, key, this)
    })
  }

  public some(fn: (value: V, key: K, collection: this) => boolean): boolean
  public some<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean
  public some(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg)
    for (const [key, val] of this) {
      if (fn(val, key, this)) return true
    }

    return false
  }

  public reduce<T>(fn: (accumulator: T, value: V, key: K, collection: this) => T, initialValue?: T): T {
    let accumulator!: T

    if (typeof initialValue !== 'undefined') {
      accumulator = initialValue
      for (const [key, val] of this) accumulator = fn(accumulator, val, key, this)
      return accumulator
    }
    let first = true
    for (const [key, val] of this) {
      if (first) {
        accumulator = val as unknown as T
        first = false
        continue
      }
      accumulator = fn(accumulator, val, key, this)
    }

    if (first) {
      throw new TypeError('Reduce of empty collection with no initial value')
    }

    return accumulator
  }

  public each(fn: (value: V, key: K, collection: this) => void): this
  public each<T>(fn: (this: T, value: V, key: K, collection: this) => void, thisArg: T): this
  public each(fn: (value: V, key: K, collection: this) => void, thisArg?: unknown): this {
    this.forEach(fn as (value: V, key: K, map: Map<K, V>) => void, thisArg)
    return this
  }

  public clone() {
    return new this.constructor[Symbol.species](this)
  }

  public concat(...collections: Collection<K, V>[]) {
    const newColl = this.clone()
    for (const coll of collections) {
      for (const [key, val] of coll) newColl.set(key, val)
    }
    return newColl
  }

  public equals(collection: Collection<K, V>) {
    if (!collection) return false
    if (this === collection) return true
    if (this.size !== collection.size) return false

    for (const [key, value] of this) {
      if (!collection.has(key) || value !== collection.get(key)) {
        return false
      }
    }

    return true
  }

  public sort(compareFunction: Comparator<K, V> = Collection.defaultSort) {
    const entries = [...this.entries()]
    entries.sort((a, b): number => compareFunction(a[1], b[1], a[0], b[0]))

    super.clear()

    for (const [k, v] of entries) {
      super.set(k, v)
    }

    return this
  }

  public difference(other: Collection<K, V>) {
    const coll = new this.constructor[Symbol.species]<K, V>()
    for (const [k, v] of other) {
      if (!this.has(k)) coll.set(k, v)
    }

    for (const [k, v] of this) {
      if (!other.has(k)) coll.set(k, v)
    }

    return coll
  }

  private static defaultSort<V>(firstValue: V, secondValue: V): number {
    return Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1
  }
}

type Comparator<K, V> = (firstValue: V, secondValue: V, firstKey: K, secondKey: K) => number