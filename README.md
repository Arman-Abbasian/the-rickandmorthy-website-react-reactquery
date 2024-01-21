# React + TypeScript + Vite

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="36"  alt="HTML5" style="padding-right:10px;" align="left"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="36"  alt="CSS3" style="padding-right:10px;" align="left" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="36" alt="javascript" style="padding-right:10px;" align="left" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="36" alt="typescript" style="padding-right:10px;" align="left" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="36"  alt="react" style="padding-right:10px;" align="left"/>
 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReGL5y1FOv0EvcYDsUjObElS-G15wowqoM39yRcjZof7O3J-Ko_zmk6-RPjbY7aDRIZbw&usqp=CAU" width="60" alt="nextjs" style="padding-right:10px;" align="left" />
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="36" alt="mongodb" style="padding-right:10px;" align="left" />
  <img src="https://w7.pngwing.com/pngs/545/451/png-transparent-node-js-express-js-javascript-solution-stack-web-application-others-angle-text-rectangle-thumbnail.png" width="60" alt="express" style="padding-right:10px;" align="left" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="36" alt="nodejs" style="padding-right:10px;" align="left" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png" width="36" alt="tailwind" style="padding-right:10px;" align="left" />
  <img src="https://mui.com/static/logo.png" width="36"  alt="materialui" style="padding-right:10px;" align="left" />
  <img src="https://user-images.githubusercontent.com/38039349/60953119-d3c6f300-a2fc-11e9-9596-4978e5d52180.png"  alt="motion" width="36" alt="Terminal"  style="padding-right:10px;" align="left" />
  <img src="https://user-images.githubusercontent.com/3369400/139447912-e0f43f33-6d9f-45f8-be46-2df5bbc91289.png"  width="36px" alt="GitHub" style="padding-right:10px;" align="left" />

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
