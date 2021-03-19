import { expect } from "chai";
import { countVowels, runLengthEncoding, isPaired } from "../../src/part2/part2";

describe("Assignment 1 Part 2", () => {
    describe("countVowels", () => {
        it("counts vowels", () => {
            expect(countVowels("This is SOME Text")).to.equal(5);
            expect(countVowels("aaeeiioouuAAEEIIOOUU")).to.equal(20);
            expect(countVowels("ido is THE KING")).to.equal(5);
            expect(countVowels("TAL is THE queen")).to.equal(6);
        });
    });
});

    describe("runLengthEncoding", () => {
        it("compresses a string", () => {
            expect(runLengthEncoding("aaaabbbccd")).to.equal("a4b3c2d");
        });
    });

    describe("isPaired", () => {
        it("returns true for a string with paired parens", () => {
            expect(isPaired("([{}])")).to.be.true;
        });

        it("returns false when the parens are not paired", () => {
            expect(isPaired("(]")).to.be.false;
        });
        it("returns false when the parens are not paired", () => {
            expect(isPaired("This is ]some[ (text)")).to.be.false;
        });

        it("returns true for a string with paired parens", () => {
            expect(isPaired("This is ([some]) {text}")).to.be.true;
        });
    });
