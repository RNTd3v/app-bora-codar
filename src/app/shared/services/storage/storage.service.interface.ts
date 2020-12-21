

export abstract class IStorageService {

  abstract has(key: string): boolean;

  abstract get(chave: string): any;

  abstract set(chave: string, value: any): void;

  abstract remove(key: string): void;

  abstract clear(): void;

}
