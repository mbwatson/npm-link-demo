# npm-link

- `cd example-module`
- `npm link`

this should create a symlink to your global installs. to see, run `npm -g ls`,
and you should see something like

```bash
├── example-module@1.0.0 -> ./../../../path/to/npm-link-demo/example-module
```

back to the project directory.

- `cd ../project`

notice we have `example-module` already in our
`package.json`. let's install our dependencies.

- `npm i`

you should see a block in `/node_modules/package-lock.json` under `packages` referencing the `example-module` package.

```json
"packages": {
  "node_modules/example-module": {
    "version": "1.0.0",
    "resolved": "https://registry.npmjs.org/example-module/-/example-module-1.0.0.tgz",
    "integrity": "sha512-37JjEbcukRDBV6jFCm+FEF6WjVon5vMsMhVa7r3tbB/pfvotKJSSY8Vqwos1urEEcn6BNP1su7FPALdwjCewMA=="
  }
}
```

but, wait, this isn't ours! we actually installed a real NPM package 
with the same name, [example-module](https://www.npmjs.com/package/example-module).

we'll tell NPM to use our own `example-module` instead.
we're still in `project`.

- `npm link ../example-module`

now that `packages` block has updated instructions for NPM.

```json
"packages": {
  "../example-module": {
    "version": "1.0.0",
    "license": "ISC"
  },
  "node_modules/example-module": {
    "resolved": "../example-module",
    "link": true
  }
}
```

> **Note**<br>
linking is easily undone with `npm unlink ../example-module`.

now let's see what we see when we run our script.

- `npm start`

the expected output looks like this.

```bash
> project@1.0.0 start
> node index

This is a log from the project
Does it work?  --  YES
```

