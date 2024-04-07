# project to run some useless tests to stress jest, and wallaby.js

every test file in this project does the exact same thing:
```
describe('high cpu usage test', () => {
  const testCase: number[][] = [];
  for(let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      testCase.push([i, j, i * j]);
    }
  }
  it.each(testCase)('should verify useless task: %i * %i = %i', (i, j, result) => {
    expect(i * j).toBe(result);
  });
});
```

It first has an expensive setup phase, where it creates an array of testcases, each containing 3 numbers.  
This allows us to easily run a lot of testcases without having to write a lot of code, and we also get to enjoy jest memory leaks.

Then it runs those generated tests and verifies the numbers we pre-calculated match.

## test with default limits

By default, jest will use as many workers as you have cores (or half that, if re-running tests?).

On my machine the initial setup phase will use all my CPU cores at near 100%.

It takes about 10 seconds.

## limit jest workers

Edit the jest.config.ts file to limit the amount of workers jest will by adding:
```
maxworkers="20%"

```
On my machine this makes it only do 3 tests at once, also drastically reduces ram usage and takes 13seconds.

(note how the extra time does not scale with the decreased amount of workers, this stays true if you change the for loop to be much bigger. But doing that may crash wallaby, so those results are not included for the baseline.)


## test wallaby.js

Use wallaby.js to execute your tests using the autoconfig.

wallaby will ignore the maxworkers config in jest. And instead tries to use all your cpu cores available, and takes up a lot of ram.

As soon as wallaby starts running actual tests you can use ```Wallaby.js: Copy Diagnostic Repost``` in vscode to see the used config.
