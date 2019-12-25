import { expect, use } from "chai";
import deepEq from "deep-equal-in-any-order";
import { Suicchi } from "../src";

const routine = () => ('aRoutine');

const expectedKeyOrCasesError = "'keyOrCases' must be of type string, string[], or object";
const expectedDefaultPropertyMustBeProvidedError = "'default' property must be provided";
const expectedKeyOrCasesMustBeProvidedError = "'keyOrCases' must be provided";
const expectedRoutineMustBeProvidedForStringOrStringArrayError = "'routine' must be provided for string or string[] keys";

describe("suicchi", () => {
  before(() => {
    use(deepEq);
  });

  describe("constructor", () => {
    describe('defaults', () => {
      it("should initialize without any input with the default values", () => {
        const switchCase = new Suicchi();

        const expectedCases = ['default'];
        const expectedDefaultValue = null;

        const returnedCases = switchCase.getCases()
        const returnedDefaultValue = switchCase.evaluateCase('default');

        expect(expectedCases).to.deep.equalInAnyOrder(returnedCases);
        expect(expectedDefaultValue).to.equal(returnedDefaultValue);
      });
    });

    describe("function type input parameter", () => {
      it("should initialize a function for input", () => {
        const switchCase = new Suicchi(() => ('default'));

        const expectedCases = ['default'];
        const expectedDefaultValue = 'default';

        const returnedCases = switchCase.getCases()
        const returnedDefaultValue = switchCase.evaluateCase('default');

        expect(expectedCases).to.deep.equalInAnyOrder(returnedCases);
        expect(expectedDefaultValue).to.equal(returnedDefaultValue);
      });
    });

    describe("object type input parameter", () => {
      it("should set the cases based on the object's properties", () => {
        const switchCase = new Suicchi({
          default: () => ('default'),
          someProperty: () => ('someProperty')
        });

        const expectedCases = ['default', 'someProperty'];
        const expectedDefaultValue = 'default';
        const expectedSomePropertyValue = 'someProperty';

        const returnedCases = switchCase.getCases()
        const returnedDefaultValue = switchCase.evaluateCase('default');
        const returnedSomePropertyValue = switchCase.evaluateCase('someProperty');

        expect(expectedCases).to.deep.equalInAnyOrder(returnedCases);
        expect(expectedDefaultValue).to.equal(returnedDefaultValue);
        expect(expectedSomePropertyValue).to.equal(returnedSomePropertyValue);
      })
    });

    describe('object type input parameter - ERRORS', () => {
      it("should throw an error requiring a 'default' property in the object", () => {
        try {
          new Suicchi({} as any)
        } catch(err) {
          expect(err.message).to.equal(expectedDefaultPropertyMustBeProvidedError);
        }
      });
    });
  });

  describe("addCase", () => {
    describe('defaults - ERRORS', () => {
      it("should throw an error if no keyOrCases is provided", () => {
        try {
          new Suicchi().addCase(null);
        } catch(err) {
          expect(err.message).to.equal(expectedKeyOrCasesMustBeProvidedError);
        }
      });

      it("should throw an error if the keyOrCases is not of type string, string[], or object - integer", () => {
        try {
          new Suicchi().addCase(1234 as any);
        } catch(err) {
          expect(err.message).to.equal(expectedKeyOrCasesError);
        }
      });

      it("should throw an error if the keyOrCases is not of type string, string[], or object - boolean", () => {
        try {
          new Suicchi().addCase(false as any);
        } catch(err) {
          expect(err.message).to.equal(expectedKeyOrCasesError);
        }
      });
    })

    describe("string type input keyOrCases parameter", () => {
      it("should add in the new case and routine", () => {
        const switchCase = new Suicchi()
        switchCase.addCase('newCase', routine);

        const expectedCases = ['default', 'newCase']
        const expectedNewCaseValue = 'aRoutine';

        const returnedCases = switchCase.getCases();
        const returnedNewCaseValue = switchCase.evaluateCase('newCase');

        expect(expectedCases).to.deep.equalInAnyOrder(returnedCases);
        expect(expectedNewCaseValue).to.equal(returnedNewCaseValue);
      });
    });

    describe("string type input keyOrCases parameter - ERRORS", () => {
      it("should throw an error if no routine is provided - if the keyOrCases type is string", () => {
        try {
          new Suicchi().addCase('someProperty');
        } catch(err) {
          expect(err.message).to.equal(expectedRoutineMustBeProvidedForStringOrStringArrayError);
        }
      });
    });

    describe("string[] type input keyOrCases parameter", () => {
      it("should add in the new cases and routine", () => {
        const switchCase = new Suicchi()
        switchCase.addCase(['newCase1', 'newCase2'], routine);

        const expectedCases = ['default', 'newCase1', 'newCase2'];
        const expectedNewCase1Value = 'aRoutine';
        const expectedNewCase2Value = 'aRoutine';

        const returnedCases = switchCase.getCases();
        const returnedNewCase1Value = switchCase.evaluateCase('newCase1');
        const returnedNewCase2Value = switchCase.evaluateCase('newCase2');

        expect(expectedCases).to.deep.equalInAnyOrder(returnedCases);
        expect(expectedNewCase1Value).to.equal(returnedNewCase1Value);
        expect(expectedNewCase2Value).to.equal(returnedNewCase2Value);
      });
    });

    describe("string[] type input keyOrCases parameter - ERRORS", () => {
      it("should throw an error if no routine is provided - if the keyOrCases type is string[]", () => {
        try {
          new Suicchi().addCase(['someProperty']);
        } catch(err) {
          expect(err.message).to.equal(expectedRoutineMustBeProvidedForStringOrStringArrayError);
        }
      });
    });

    describe('object type input keyOrCases parameter', () => {
      it("should add in the new cases and routines", () => {
        const switchCase = new Suicchi()
        switchCase.addCase({
          newCase1: routine,
          newCase2: () => ('aRoutine2')
        });

        const expectedCases = ['default', 'newCase1', 'newCase2'];
        const expectedNewCase1Value = 'aRoutine';
        const expectedNewCase2Value = 'aRoutine2';

        const returnedCases = switchCase.getCases();
        const returnedNewCase1Value = switchCase.evaluateCase('newCase1');
        const returnedNewCase2Value = switchCase.evaluateCase('newCase2');

        expect(expectedCases).to.deep.equalInAnyOrder(returnedCases);
        expect(expectedNewCase1Value).to.equal(returnedNewCase1Value);
        expect(expectedNewCase2Value).to.equal(returnedNewCase2Value);
      });
    });
  });

  describe("getCases", () => {
    describe('defaults', () => {
      it("should return the 'default' property if Suicchi initialized without defaultCaseRoutine", () => {
        const switchCase = new Suicchi();

        const expectedCases = ['default'];
        const returnedCases = switchCase.getCases()

        expect(expectedCases).to.deep.equalInAnyOrder(returnedCases);
      });
      
      it("should return the 'default' property if Suicchi initialized with defaultCaseRoutine - function", () => {
        const switchCase = new Suicchi(() => null);

        const expectedCases = ['default'];
        const returnedCases = switchCase.getCases()

        expect(expectedCases).to.deep.equalInAnyOrder(returnedCases);
      });
      
      it("should return the 'default' property if Suicchi initialized with defaultCaseRoutine - object", () => {
        const switchCase = new Suicchi({ default: () => null });

        const expectedCases = ['default'];
        const returnedCases = switchCase.getCases()

        expect(expectedCases).to.deep.equalInAnyOrder(returnedCases);
      });
    });

    
  });

  describe("evaluateCase", () => {
    describe('defaults', () => {
      it("should run the default case if the provided key is not a propery of the cases - function", () => {
        const switchCase = new Suicchi(() => ('default'))

        const expectedPropertyValue = 'default';
        const returnedPropertyValue = switchCase.evaluateCase('randomCase');

        expect(expectedPropertyValue).to.equal(returnedPropertyValue);
      });

      it("should return the default case if the provided key is not a propery of the cases - boolean", () => {
        const switchCase = new Suicchi(true)

        const expectedPropertyValue = true;
        const returnedPropertyValue = switchCase.evaluateCase('randomCase');

        expect(expectedPropertyValue).to.equal(returnedPropertyValue);
      });

      it("should return the default case if the provided key is not a propery of the cases - integer", () => {
        const switchCase = new Suicchi(1234)

        const expectedPropertyValue = 1234;
        const returnedPropertyValue = switchCase.evaluateCase('randomCase');

        expect(expectedPropertyValue).to.equal(returnedPropertyValue);
      });

      it("should return the default case if the provided key is not a propery of the cases - string", () => {
        const switchCase = new Suicchi('default')

        const expectedPropertyValue = 'default';
        const returnedPropertyValue = switchCase.evaluateCase('randomCase');

        expect(expectedPropertyValue).to.equal(returnedPropertyValue);
      });

      it("should return the default case if the provided key is not a propery of the cases - object", () => {
        const switchCase = new Suicchi({ default: 'default' })

        const expectedPropertyValue = 'default';
        const returnedPropertyValue = switchCase.evaluateCase('randomCase');

        expect(expectedPropertyValue).to.equal(returnedPropertyValue);
      });
    });

    describe('existing input', () => {
      it("should run the routine of the specific case", () => {
        const switchCase = new Suicchi({
          default: () => ('default'),
          notDefault: () => ('!default')
        })

        const expectedPropertyValue = '!default';
        const returnedPropertyValue = switchCase.evaluateCase('notDefault');

        expect(expectedPropertyValue).to.equal(returnedPropertyValue);
      });
    });
  });
});
