import * as chai from "chai";
import deepEq from "deep-equal-in-any-order";
import { Suicchi } from "../src";

describe("suicchi", () => {
  const { expect } = chai;

  before(() => {
    chai.use(deepEq);
  });

  it("should return correct value if assertion passed", async () => {
    const switchCase = new Suicchi();

    switchCase.addCase("one", "return one");
    switchCase.addCase("two", "return two");
    switchCase.addCase("three", "return three");

    expect(switchCase.assert("two")).to.be.equal("return two");
  });

  it("should return list of the added switch case", async () => {
    const switchCase = new Suicchi();

    switchCase.addCase("one", "return one");
    switchCase.addCase("two", "return two");
    switchCase.addCase("three", "return three");

    expect(switchCase.getCases()).to.be.deep.equalInAnyOrder(["one", "two", "three", "default"]);
  });

  it("should return nothing if assertion mismatched (default)", async () => {
    const switchCase = new Suicchi();

    switchCase.addCase("one", "return one");
    switchCase.addCase("two", "return two");
    switchCase.addCase("three", "return three");

    expect(switchCase.assert("five")()).to.be.equal(undefined);
  });

  it("should allow cases to have different keys", async () => {
    const switchCase = new Suicchi();

    switchCase.addCase(["one", "1", "isa"], "return one");
    switchCase.addCase("two", "return two");
    switchCase.addCase("three", "return three");

    expect(switchCase.assert("1")).to.be.equal("return one");
    expect(switchCase.assert("isa")).to.be.equal("return one");
    expect(switchCase.assert("one")).to.be.equal("return one");
  });

  it("should allow passing of custom default switch case", async () => {
    function defaultSwitchCase(name: string) {
      return "hello " + name;
    }

    const switchCase = new Suicchi(defaultSwitchCase);

    switchCase.addCase("juan", () => "buenos dias juan");
    switchCase.addCase("tanaka", () => "ohayou tanaka-san");
    switchCase.addCase("rye", () => "buang man siguro ka rye");

    expect(switchCase.assert("rye")()).to.be.equal("buang man siguro ka rye");
    expect(switchCase.assert("gwapo")("gwapo")).to.be.equal("hello gwapo");
  });
});
