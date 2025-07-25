# Proyecto Angular con Microfrontends

Este repositorio contiene un proyecto desarrollado con Angular 17 y Node.js 18. Está organizado en una arquitectura de microfrontends dividida en tres carpetas principales:

- mf-Shell: Proyecto principal que actúa como orquestador e integrador.
- admin-frontend: Microfrontend para el módulo administrativo.
- quoter-frontend: Microfrontend para el módulo de cotización.

Se ha trabajado con Bootstrap y Sass para los estilos. Se utiliza tecnología de Microfrontends basada en Module Federation. El proyecto también se conecta con un backend desarrollado en NestJS, que corre por defecto en el puerto 3000 y se encuentra en otro repositorio.

La mayoría del proyecto está construido usando la forma tradicional de Angular con NgModules, y algunas partes usan la nueva funcionalidad de componentes standalone introducida en Angular 17.

Para levantar el proyecto completo es necesario abrir tres terminales y ejecutar los siguientes comandos por separado:

1. Levantar el Shell:
cd mf-Shell
npm install
ng serve

2. Levantar el microfrontend de administración:
cd admin-frontend
npm install
ng serve

3. Levantar el microfrontend del cotizador:
cd quoter-frontend
npm install
ng serve

Una vez que los tres servidores estén corriendo, accede a http://localhost:4200 desde el navegador. Allí se visualizarán integrados los microfrontends adminfrontend y quoterfrontend dentro del shell.

Este monorepo solo contiene un archivo .gitignore en la raíz, que ignora correctamente los node_modules, carpetas de compilación y otros archivos temporales dentro de todos los subproyectos. Los subproyectos no tienen sus propios .gitignore.

El backend en NestJS corre en http://localhost:3000, se conecta con los frontends para manejar autenticación, autorización y servicios de datos.

Todo el desarrollo sigue prácticas estándar de Angular 17, con separación clara de responsabilidades y proyectos completamente independientes pero integrables.
