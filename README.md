# Warehouse Rack

Take home test for Aplikasi Super

## Pre Requisites

---

Make sure you have installed all of the following prerequisites on your development machine:

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/current) and the npm package manager. This is needed to run the application.

There's functional test suite which need Ruby to be installed on separate [README.MD](./functional_spec/README.md).

## Quick Install

---

Once you've cloned the repository, you're just a few step away from starting the development. To setup everything, you need to run

```
./bin/setup
```

and you're all good.

## Running your application

---

There's 2 way to use the application.

1. Interactive Mode
2. File Mode

If you want to use File Mode just pass a file path after the executable as follows:

```
./bin/warehouse_rack file_input.txt
```

and vice versa

```
./bin/warehouse_rack
```

## Testing your application

---

You can run unit test suite included warehouse_rack application by running following task:

```
npm test
```
