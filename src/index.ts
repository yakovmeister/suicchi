import { GenericType } from "./types/generic.type";

export class Suicchi {
  constructor(defaultCaseRoutine: any | GenericType = null) {
    if (typeof defaultCaseRoutine === 'object' && defaultCaseRoutine !== null) {
      if (!defaultCaseRoutine.default) {
        throw new Error("'default' property must be provided");
      }

      this.cases = defaultCaseRoutine;

      return;
    }

    this.cases.default = defaultCaseRoutine;
  }
  private cases: GenericType = {};

  private processKeyOrCasesAsString(key: string, routine?: any): void {
    this.cases[key] = routine;
  }

  private processKeyOrCasesAsStringArray(keys: string[], routine?: any): void {
    keys.forEach((k) => {
      this.cases[k] = routine;
    });
  }

  private processKeyOrCasesAsObject(cases: GenericType): void {
    this.cases = {
      ...this.cases,
      ...cases
    };
  }

  /**
   * Add new Case
   * @param key Case's key or identifier
   * @param routine work to be done if case matches
   * @return Suicchi
   */
  public addCase(keyOrCases: string | string[] | GenericType, routine?: any): Suicchi {
    if (keyOrCases === null) {
      throw new Error("'keyOrCases' must be provided");
    }

    const isString = typeof keyOrCases === 'string';
    const isArray = Array.isArray(keyOrCases);
    const isObject = typeof keyOrCases === 'object';

    if (isString) {
      this.processKeyOrCasesAsString((keyOrCases as string), routine);
    } else if (isArray) {
      this.processKeyOrCasesAsStringArray((keyOrCases as string[]), routine);
    } else if (isObject) {
      this.processKeyOrCasesAsObject(keyOrCases as GenericType);
    } else {
      throw new Error("'keyOrCases' must be of type string, string[], or object");
    }

    return this;
  }

  /**
   * List down all the Cases
   * @return string[]
   */
  public getCases(): string[] {
    return Object.keys(this.cases);
  }

  /**
   * Match key to a specific case and return the routine
   * Or return the default routine if it does not exist
   * @param key case's key or identifier
   * @return Routine
   */
  public evaluateCase(key: string): Function {
    if (!this.cases[key] && this.cases.default) {
      return typeof this.cases.default === 'function' ?
        this.cases.default() :
        this.cases.default;
    }
    
    return typeof this.cases[key] === 'function' ?
      this.cases[key]() :
      this.cases[key];
  }

  public evaluate = this.evaluateCase.bind(this);
}
