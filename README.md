# used Packages and Technologies

  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="36"  alt="HTML5" style="padding-right:10px;" align="left"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="36"  alt="CSS3" style="padding-right:10px;" align="left" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="36" alt="typescript" style="padding-right:10px;" align="left" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="36"  alt="react" style="padding-right:10px;" align="left"/>
 <img src="https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png" width="36" alt="reqctQuery" style="padding-right:10px;" align="left" />
 <img src="https://logowik.com/content/uploads/images/pwa-progressive-web-apps2549.logowik.com.webp" width="70" alt="PWA" style="padding-right:10px;" align="left" />
 <br />
 <br />
 <br />

<p width="960" style="padding-right:40px;" align="left" >cors</p>
<p width="960" style="padding-right:40px;" align="left" >bcrypt</p>
<p width="960" style="padding-right:40px;" align="left" >cookie-session</p>
<p width="960" style="padding-right:40px;" align="left" >react-toastify</p>

# summary of project
This project is a fullstack project (MERN stack), that use from mongodb, expressjs, react and nodejs to handle a chat and login/signup pages. 
validation in front-end has done with react-hook-form on form elements.
user can signup or login even with google account.chat page that used from socket.io to handle the chat process and the chats store in mongo cloud as database

# overview of project

<a href="https://www.youtube.com/watch?v=x9xTauR17ms
" target="_blank"><img src="https://static.vecteezy.com/system/resources/previews/003/399/771/original/youtube-icon-editorial-free-vector.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

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
