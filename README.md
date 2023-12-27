# Sistema de Gestión de Datos de Pacientes

Este proyecto es una Aplicación Web diseñada para administrar la información de pacientes médicos. Permite visualizar la lista de pacientes, editar sus detalles y agregar nuevos pacientes. Cabe destacar que dicha información no es necesariamente persistente.

## Introducción

La aplicación fue realizada con React, utilizando componentes reutilizables de Material-UI para la interfaz de usuario. Los pacientes se muestran en forma de cards, cada una con detalles básicos, como el nombre, su página web, y una opción para ver más información.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- `components/`: Contiene los componentes reutilizables de la interfaz de usuario.
- `contexts/`: Almacena los contextos de la aplicación para gestionar el estado global de los pacientes.
- `pages/`: Las páginas principales de la aplicación, como la página de inicio.
- `services/`: Archivos para interactuar con servicios externos, como una API (en este caso, para obtener datos de pacientes).
- `styles/`: Estilos globales o específicos para la aplicación.
- `types/`: Define los tipos de datos utilizados en la aplicación.
- `utils/`: Utilidades y funciones de ayuda.

## Instalación

1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/NeksHinto/patients-app
   cd patients-app
   ```

2. **Instalar dependencias:**
   ```sh
   npm install
   ```

## Uso

1. **Ejecutar la aplicación:**
   ```sh
   npm start
   ```

2. **Acceder a la aplicación:**
   Desde el browser acceder a `http://localhost:3000`.

3. **Otros Comandos:**

   - `npm test`: Ejecuta las pruebas.
   - `npm run build`: Construye la aplicación para producción en la carpeta `build`.

## Dependencias Principales

- [React](https://es.reactjs.org/): Framework de JavaScript para construir interfaces de usuario.
- [Material-UI](https://mui.com/): Librería de componentes para React basada en Material Design.
- [Yup](https://github.com/jquense/yup): Librería para validación de esquemas en formularios.
- [Jest](https://jestjs.io/): Framework de pruebas para JavaScript.
- [axios](https://github.com/axios/axios): Cliente HTTP basado en promesas para el browser y Node.js.

## Licencia

Este proyecto está bajo la Licencia [MIT](https://opensource.org/licenses/MIT).