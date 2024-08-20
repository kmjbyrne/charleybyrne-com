---
title: Knapsack Problem Step by Step
category: Algorithms
# image: /content/knapsack.gif
draft: true
tags:
  - dynamic
  - programming
  - python
---

There are ${N}$ items, numbered ${1, 2, ..., N}$. For each index
${1 \le i \le N}$.

Item ${i}$ has a weight of ${w_i}$​ and a value of ${v_i}$.

James has decided to choose some of the ${N}$ items and carry them home in a
knapsack. The capacity of the knapsack is ${T}$, which means that the sum of the
weights of items taken must be at most ${T}$.

Find the maximum possible sum of the values of items that James can take home.

## Constraints

All values in input are integers.

${1 \le N \le 100}$

${1 \le T \le 105}$

${1 \le w_i​ \le W}$

${1 \le v_i​ \le 10}$

## Solution

Given the following capacity ${T}$, ${N}$ items denoted by weights ${W}$ and
item values ${V}$.

```python
capacity = 5
weight = [1, 2, 3]
items = [6, 10, 12]
```

For the table columns, we are increasing capacity from 0 to ${W}$, where ${W}$
is 5. This gives us a range of 0 to 5; the max capacity.

On each row, we must consider the items, we have denoted the weights and values.
For each row, we are really only considering items calculated in previous rows
and for each column we consider for that much capacity.

The initial starting point is for 0 weight (no item) the value is 0 regardless
of capacity and similarly if we have 0 capacity then we cannot put any item so
value would be 0.

We end up with the following memoization table.

| W   | V   | 0   | 1   | 2   | 3   | 4   | 5   |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 0   | 0   | 0   | 0   | 0   |
| 1   | 6   | 0   | -   | -   | -   | -   | -   |
| 2   | 10  | 0   | -   | -   | -   | -   | -   |
| 3   | 12  | 0   | -   | -   | -   | -   | -   |

The first row (row with weight 1) is simple as we have weight 1, so we can fill
its value from capacity 1. Since it is a single item, the entire row would have
value 6.

| W   | V   | 0   | 1     | 2     | 3     | 4     | 5     |
| --- | --- | --- | ----- | ----- | ----- | ----- | ----- |
| 0   | 0   | 0   | 0     | 0     | 0     | 0     | 0     |
| 1   | 6   | 0   | **6** | **6** | **6** | **6** | **6** |
| 2   | 10  | 0   | -     | -     | -     | -     | -     |
| 3   | 12  | 0   | -     | -     | -     | -     | -     |

For second row, now weight is 2, we can fill values same as row above it up to
capacity 2.

For capacity 2 (${w_2}$), there are two choice:

- Include the current item
- Exclude the current item

If we exclude current item then value would be same as top row 6. Where ${i}$ is
the current row index. If we include then value would be:

${V_i + F(W_i, C_i - Wi) = 10 + F(W_i, C_i - W) = 10 + 0 = 10}$

The max is 10 so result is 10. Now, the $F$ function is:

Previous item (${W_i}$) and (${W_i}$) = 0.

### Iterations

If we walk through each iteration step by step we can see this in action. We may
use ${M}$ as the memoization table symbol.

${M_{iw} = max()}$

### First

| W   | V   | 0   | 1      | 2      | 3      | 4      | 5      |
| --- | --- | --- | ------ | ------ | ------ | ------ | ------ |
| 0   | 0   | 0   | 0      | 0      | 0      | 0      | 0      |
| 1   | 6   | 0   | 6      | 6      | 6      | 6      | 6      |
| 2   | 10  | 0   | **10** | **16** | **16** | **16** | **16** |
| 3   | 12  | 0   | -      | -      | -      | -      | -      |

Finally, we reach the last row:

| W   | V   | 0   | 1     | 2      | 3      | 4      | 5      |
| --- | --- | --- | ----- | ------ | ------ | ------ | ------ |
| 0   | 0   | 0   | 0     | 0      | 0      | 0      | 0      |
| 1   | 6   | 0   | 6     | 6      | 6      | 6      | 6      |
| 2   | 10  | 0   | 10    | 16     | 16     | 16     | 16     |
| 3   | 12  | 0   | **6** | **10** | **16** | **18** | **22** |

## Code

### Iteration

...

```python
def knapsack_i(capacity: int, weights, values):
    memo = [[0 for i in range(capacity + 1)] for i in range(len(weights) + 1)]
    memo[1] = [values[0]] * (capacity + 1)
    for row in range(len(weights)):
        for w in range(capacity + 1):
            if weights[row] <= w:
                print(f"Current row weight does not exceed current capacity (column)")
                current_row_current_weight = memo[row][w]
                current_row_previous_weight = memo[row][w - weights[row]] + values[row]
                include = max(current_row_current_weight, current_row_previous_weight)
                memo[row + 1][w] = include
            else:
                print(f"Current row weight exceeds current capacity (column)")
                print(f"Weight: {weights[row]} is greater than {w}")
                print(f"Setting next row value: {memo[row][w]}")
                memo[row + 1][w] = memo[row][w]
    return memo[-1][-1]


if __name__ == "__main__":
    assert knapsack_i(5, [1, 2, 3], [6, 10, 12]) == 22
```
