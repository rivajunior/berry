---
category: features
slug: /features/extensibility
title: "Extensibility"
description: The strategies Yarn follows so you can always find a way to unblock yourself.
---

## Overview

Many Yarn users have many different use cases, and while we try to find satisfying solutions to most common problems, our team may not have the bandwidth to research and maintain some of the most exotic ones.

To avoid blocking you should you face a novel situation that Yarn doesn't support out of the box yet, we provide various ways to implement your own logic to satisfy your needs.

## Plugins

Plugins are, in essence, small scripts that Yarn will dynamically require at startup. They can be used to create new commands (which, unlike regular Node.js scripts, have access to the full Yarn API), and monitor specific events within the package manager's lifecycle.

:::tip
Learning how to use the Yarn API can sound like a daunting task, but you have access to the best examples there is: Yarn itself! For example, the implementation of `yarn focus` is only about a hundred lines of code, making it a good starting point if you wish to implement partial installs according to your own logic.
:::
