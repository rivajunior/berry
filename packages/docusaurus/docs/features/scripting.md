---
category: features
slug: /features/scripting
title: "Scripting"
description: Some of the features Yarn provides to help you write scripts.
---

## Parallel tasks

Yarn has a native integration for the background job syntax (`foo&`) within scripts defined in the `scripts` field. It will run them in parallel, and each line of the output will be prefixed by an identifier showing where they come from. For example, the following command will run linting and tests in parallel, and report once both are finished:

```
yarn lint & yarn test
```

## Portable shell

Windows portability can be troublesome with other package managers. Scripts can't expect a Posix shell to be available, so you have to rely on strange hacks to use semi-portable scripts - or drop them altogether and use Node.js scripts instead, defeating the point of small, non-intrusive scripts in the first place. That is, unless you use Yarn!

Yarn implements and maintains a Posix-like shell interpreter that supports all of the syntax you typically find within scripts, along with a couple of simple builtins like `cd` / `echo`. For instance, the following command will work just fine whether you run the script on Windows or Linux:

```
rm -rf build && yarn build && cd build && node ./dist.js
```

:::info
We say it's a Posix-like interpreter rather than a Posix-compatible interpreter because it doesn't implement some of the most complex features that aren't useful in the context of the `scripts` field. For instance, multi-line flow control structures such as `while` aren't supported. 
:::

## Script arguments

By default, any parameter following the name of the script in `yarn run` will be added to the evaluated command. It works well enough in simple cases, like this one where running `yarn test packages/lib` will lead to `jest packages/lib` being evaluated:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

In more complex situations however, you may want to explicitly refer to those arguments. Yarn supports this by using the `$0`, `$1`, etc variables, which will be interpolated and will disable the automatic appending of the arguments:

```json
{
  "scripts": {
    "get-latest": "curl https://registry.yarnpkg.com/$0 | jq .['dist-tags'].latest"
  }
}
```

Of course, you can also use the `$@` array to retrieve the list of all arguments, which will let you reuse them in multiple commands:

```json
{
  "scripts": {
    "build-and-test": "yarn build \"$@\" && yarn test \"$@\""
  }
}
```
