import { Window } from "happy-dom";

export namespace TS {
  export const assertUnreachable = (x: never) => {
    throw new Error("This shouldn't happen: " + JSON.stringify(x));
  };

  export const inspect =
    <A>(message: string) =>
    (a: A): A => {
      console.log(message, JSON.stringify(a, null, 2));
      return a;
    };
}

export namespace HappyDom {
  export const dom = (content: string) => {
    const window = new Window();
    const document = window.document;
    document.body.innerHTML = content;
    return document;
  };

  // reverse the DOM wrapping above before writing the file
  export const content = (dom: Document): string => dom.body.innerHTML;
}

export namespace Tree {
  export type Tree<A> =
    | {
        _tag: "Root";
        children: Tree<A>[];
      }
    | {
        _tag: "Node";
        a: A;
        children: Tree<A>[];
      };

  const reverse = <A>(tree: Tree<A>): Tree<A> => ({
    ...tree,
    children: tree.children.reverse().map(reverse),
  });

  const isLeaf = <A>(t: Tree<A>): boolean => t.children.length === 0;

  const empty = () => ({ _tag: "Root", children: [] });
  const pure = <A>(a: A): Tree<A> => ({ _tag: "Node", a, children: [] });
  const cons =
    <A>(child: A) =>
    (tree: Tree<A>): Tree<A> => ({
      ...tree,
      children: [pure(child), ...tree.children],
    });

  const add =
    <A>(shouldBeChild: (treeA: A, child: A) => boolean) =>
    (a: A) =>
    (tree: Tree<A>): Tree<A> => {
      const doShouldBeChild = (t: Tree<A>, c: A): boolean => {
        if (t._tag === "Root") {
          return true;
        } else {
          return shouldBeChild(t.a, c);
        }
      };
      if (doShouldBeChild(tree, a)) {
        if (isLeaf(tree)) {
          return cons(a)(tree);
        } else {
          const [x, ...xs] = tree.children;
          if (doShouldBeChild(x, a)) {
            return { ...tree, children: [add(shouldBeChild)(a)(x), ...xs] };
          } else {
            return cons(a)(tree);
          }
        }
      } else {
        return tree;
      }
      TS.assertUnreachable(a);
    };

  export const fromArray =
    <A>(shouldBeChild: (a: A, b: A) => boolean) =>
    (xs: A[]): Tree<A> =>
      reverse(
        xs.reduce((acc, cv) => add(shouldBeChild)(cv)(acc), empty() as Tree<A>),
      );

  export const toArray = <A>(tree: Tree<A>): A[] => {
    switch (tree._tag) {
      case "Root":
        return tree.children.flatMap(toArray);
      case "Node":
        return [tree.a, ...tree.children.flatMap(toArray)];
    }
    TS.assertUnreachable(a);
  };
}

export namespace Formatting {
  export const changeLogLink = (inputPath: string): string =>
    `https://github.com/breathe-easy-events/sheffield.breathe-easy.uk/commits/main/${inputPath.slice(2)}`;
}
