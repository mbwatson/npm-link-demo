# npm-link

- `cd example-module`
- `npm link`

this should create a symlink to your global installs. to see, run `npm -g ls`,
and you should see something like

```bash
├── example-module@1.0.0 -> ./../../../path/to/npm-link-demo/example-module
```

- `cd ../project`

before moving on, it's instructive to note the contents of `node_modules`,
specifically `node_modules/package-lock.json` if it already exists.

- `npm i`

you should see a block in `packages` for an example-module package.

```json
"packages": {
  "node_modules/example-module": {
    "version": "1.0.0",
    "resolved": "https://registry.npmjs.org/example-module/-/example-module-1.0.0.tgz",
    "integrity": "sha512-37JjEbcukRDBV6jFCm+FEF6WjVon5vMsMhVa7r3tbB/pfvotKJSSY8Vqwos1urEEcn6BNP1su7FPALdwjCewMA=="
  }
}
```

but it isn't ours. this is because we actually installed a real NPM package 
called [example-module](https://www.npmjs.com/package/example-module).

let's tell NPM to use our own `example-module` instead.

- `npm link ../example-module`

if you've kept an eye on that `packages` block, it now looks like the following.

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
easily undo this link with `npm unlink ../example-module`.

now let's see what we see.

- `npm start`

the expected output looks like this.

```bash
> project@1.0.0 start
> node index

This is a log from the project
Does it work?  --  YES
```

