function sum_to_n_a(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_a(n - 1);
}

function sum_to_n_b(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sum_to_n_c(n: number): number {

    let sum = 0;
    while (n > 0) {
        sum += n;
        n--;
    }
    return sum;
}

const test_case = [
    {
        input: 10,
        output: 55,
    },
]

for (const test of test_case) {
    console.log('function a: ', sum_to_n_a(test.input) === test.output);
    console.log('function b: ', sum_to_n_b(test.input) === test.output);
    console.log('function c: ', sum_to_n_c(test.input) === test.output);
}