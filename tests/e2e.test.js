const runSSG = require("./runSSG"); 

describe("End to End testing", () => {
    test("should print usage and options when --help option is specified", async () => {
        const { stderr, stdout, exitCode} = await runSSG("--help");

        expect(exitCode).toBe(0);
        expect(stdout).toMatchSnapshot();
        expect(stderr).toEqual("");    
    });
    test("should print nothing when the program runs succesfully", async () => {
        const { stderr, stdout, exitCode } = await runSSG("-i", "test.txt");

        expect(exitCode).toBe(0);
        expect(stdout).toMatchSnapshot();
        expect(stderr).toEqual("");    
    });
    test("should print the version of the program when --version is specified", async () => {
        const { stderr, stdout, exitCode } = await runSSG("--version");

        expect(exitCode).toBe(0);
        expect(stdout).toMatchSnapshot();
        expect(stderr).toEqual("");    
    });
})