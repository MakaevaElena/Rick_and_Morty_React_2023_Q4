# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

---

# Local Installation

clone repository to your local machine
run npm install

# Available Scripts

In the project directory, you can run:

## npm run dev

Runs the app in the development mode.
Open http://localhost:5173/ to view it in the browser.

## npm run lint

Launches Eslint for [ts,tsx] files

## npm run format:fix

Runs prettier and shows warning in CLI

### Eslint and prettier configurations

https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/module01/configs.md

Recommended libraries (versions can be different) \
"@typescript-eslint/eslint-plugin": "^5.22.0", \
"@typescript-eslint/parser": "^5.22.0", \
"eslint": "^8.14.0", \
"eslint-config-prettier": "^8.5.0", \
"eslint-import-resolver-typescript": "^2.7.1", \
"eslint-plugin-import": "^2.26.0", \
"eslint-plugin-prettier": "^4.0.0", \
"eslint-plugin-react": "^7.29.4", \
"eslint-plugin-react-hooks": "^4.6.0", \
"husky": "^7.0.4", \
"lint-staged": "^12.4.1", \
"prettier": "^2.6.2", \
The configuration might be different based on what setup has been choosen (Vite or CRA), you can check the details. Here are some details about setting up Husky on the project. \

Eslint configuration \
Might be insignificantly changed \

{ \
"parser": "@typescript-eslint/parser", \
"extends": [ \
"plugin:react/recommended", \
"plugin:@typescript-eslint/recommended", \
"prettier", \
"plugin:react-hooks/recommended", \
"plugin:prettier/recommended" \
], \
"env": { \
"browser": true, \
"es6": true, \
"jest": true, \
"node": true \
}, \
"root": true, \
"parserOptions": { \
"ecmaFeatures": { \
"jsx": true \
}, \
"ecmaVersion": "latest", \
"sourceType": "module" \
},
"plugins": [ \
"@typescript-eslint", "react", "prettier", "react-hooks" \
], \
"rules": { \
"react-hooks/rules-of-hooks": "error", \
"react-hooks/exhaustive-deps": "warn", \
"comma-dangle": ["error", "only-multiline"], \
"react/prop-types": "off", \
"react/display-name": "off", \
"@typescript-eslint/explicit-function-return-type": "off", \
"prettier/prettier": ["error", { "endOfLine": "auto" }], \
"@typescript-eslint/interface-name-prefix": "off", \
"@typescript-eslint/ban-ts-comment": "error", \
"@typescript-eslint/no-non-null-assertion": "off", \
"@typescript-eslint/explicit-module-boundary-types": "off", \
"@typescript-eslint/no-empty-function": "off", \
"@typescript-eslint/no-explicit-any": "error", \
"@typescript-eslint/no-var-requires": "off", \
"react/jsx-uses-react": "off", \
"react/react-in-jsx-scope": "off" \
}, \
"settings": { \
"react": { \
"pragma": "React", \
"version": "detect" \
} \
} \
} \
Prettier configuration \
{ \
"endOfLine": "auto", \
"semi": true, \
"singleQuote": true, \
"tabWidth": 2, \
"trailingComma": "es5", \
"printWidth": 100, \
"arrowParens": "always" \
} \
TSConfig \

{ \
"compilerOptions": { \
"target": "ESNext", \
"lib": ["DOM", "DOM.Iterable", "ESNext"], \
"allowJs": false, \
"skipLibCheck": true, \
"esModuleInterop": true, \
"allowSyntheticDefaultImports": true, \
"strict": true, \
"forceConsistentCasingInFileNames": true, \
"noFallthroughCasesInSwitch": true, \
"module": "ESNext", \
"moduleResolution": "Node", \
"resolveJsonModule": true, \
"isolatedModules": true, \
"noImplicitAny": true, \
"noEmit": true, \
"jsx": "react-jsx" \
}, \
"include": ["src"], \
"references": [{ "path": "./tsconfig.node.json" }] \
} \
Note: If you use CRA you should remove "references": [{ "path": "./tsconfig.node.json" }] from the config above \
