import { GenericType } from "./types/generic.type";
import { noop } from "./noop";

export class Suicchi {
  private cases: GenericType = {};

  constructor(defaultCaseRoutine: Function = noop) {
    this.cases.default = defaultCaseRoutine;
  }

  /**
   * Add new case
   * @param key case's key or identifier
   * @param routine work to be done if case matches
   * @return BetterSwitch
   */
  public addCase(key: string | string[], routine: any): Suicchi {
    if (Array.isArray(key)) {
      key.forEach((k) => {
        this.cases[k] = routine;
      });
    } else {
      this.cases[key] = routine;
    }

    return this;
  }

  /**
   * List down all the cases
   * @return array
   */
  public getCases(): string[] {
    return Object.keys(this.cases);
  }

  /**
   * Match key to a specific case
   * @param key case's key or identifier
   * @return routine
   */
  public evaluate(key: string): any {
    if (!this.cases[key] && this.cases.default) {
      return this.cases.default;
    }

    return this.cases[key];
  }
}
