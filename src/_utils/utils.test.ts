import { Tree } from "./utils";
import { it, expect, describe } from "vitest";

describe("sort a list of numbers into a hierarchy", () => {
  it("a simple example", () => {
    const nums = [1, 2, 2, 1, 2];
    const expected = {
      _tag: "Root",
      children: [
        {
          _tag: "Node",
          a: 1,
          children: [
            { _tag: "Node", a: 2, children: [] },
            { _tag: "Node", a: 2, children: [] },
          ],
        },
        {
          _tag: "Node",
          a: 1,
          children: [{ _tag: "Node", a: 2, children: [] }],
        },
      ],
    } as Tree.Tree<number>;
    const result = Tree.fromArray((a, b) => b > a)(nums);

    expect(result).toEqual(expected);
  });

  it("3 layers of nesting", () => {
    const nums = [1, 2, 3, 2, 1, 2];
    const expected = {
      _tag: "Root",
      children: [
        {
          _tag: "Node",
          a: 1,
          children: [
            {
              _tag: "Node",
              a: 2,
              children: [{ _tag: "Node", a: 3, children: [] }],
            },
            { _tag: "Node", a: 2, children: [] },
          ],
        },
        {
          _tag: "Node",
          a: 1,
          children: [{ _tag: "Node", a: 2, children: [] }],
        },
      ],
    } as Tree.Tree<number>;
    const result = Tree.fromArray((a, b) => b > a)(nums);

    expect(result).toEqual(expected);
  });

  it("skipped a level doesn't disrupt branches of nesting or order", () => {
    const nums = [1, 4, 2, 3, 2, 1, 2];
    const expected = {
      _tag: "Root",
      children: [
        {
          _tag: "Node",
          a: 1,
          children: [
            { _tag: "Node", a: 4, children: [] },
            {
              _tag: "Node",
              a: 2,
              children: [{ _tag: "Node", a: 3, children: [] }],
            },
            { _tag: "Node", a: 2, children: [] },
          ],
        },
        {
          _tag: "Node",
          a: 1,
          children: [{ _tag: "Node", a: 2, children: [] }],
        },
      ],
    } as Tree.Tree<number>;
    const result = Tree.fromArray((a, b) => b > a)(nums);

    expect(result).toEqual(expected);
  });

  // it("map over a tree", () => {
  //   const nums = [1, 2, 3, 2, 1, 2];
  //   const expected = {
  //     _tag: "Root",
  //     children: [
  //       {
  //         _tag: "Node",
  //         a: 11,
  //         children: [
  //           {
  //             _tag: "Node",
  //             a: 12,
  //             children: [{ _tag: "Node", a: 13, children: [] }],
  //           },
  //           { _tag: "Node", a: 12, children: [] },
  //         ],
  //       },
  //       {
  //         _tag: "Node",
  //         a: 11,
  //         children: [{ _tag: "Node", a: 12, children: [] }],
  //       },
  //     ],
  //   } as Tree.Tree<number>;
  //   const tree = Tree.fromArray((a, b) => b > a)(nums);
  //   const result = Tree.map((n: number) => n + 10)(tree);
  //
  //   expect(result).toEqual(expected);
  // });
});

describe("sort a hierarchy of numbers into a list  ", () => {
  it("a simple example", () => {
    const nums = [1, 2, 2, 1, 2];
    const tree = Tree.fromArray((a, b) => b > a)(nums);
    const result = Tree.toArray(tree);

    expect(result).toEqual(nums);
  });

  it("3 layers of nesting", () => {
    const nums = [1, 2, 3, 2, 1, 2];
    const tree = Tree.fromArray((a, b) => b > a)(nums);
    const result = Tree.toArray(tree);

    expect(result).toEqual(nums);
  });

  it("skipped a level doesn't disrupt branches of nesting or order", () => {
    const nums = [1, 4, 2, 3, 2, 1, 2];
    const tree = Tree.fromArray((a, b) => b > a)(nums);
    const result = Tree.toArray(tree);

    expect(result).toEqual(nums);
  });
});
