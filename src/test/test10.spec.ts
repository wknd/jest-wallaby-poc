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