# Gaïamundi

The following project is a mono-repo built using [Lerna](https://lerna.js.org/)

## Requirements

- Install lerna globally : `npm install -g lerna`
- Node v16

## Installation

```bash

yarn setup
```

## Developement

### API

If you are running the API for the first time, you will need to build first :

```sh
cd packages/gaiamundi-api
yarn build
cp .env.example .env
```

- Start API server (Strapi Headless CMS): `yarn start:api`

### Web

- Start Web app (React/Typescript/Tailwind): `yarn start:web`

### Desktop (Coming soon)

- Start Desktop app (Electron): `yarn start:desktop`
