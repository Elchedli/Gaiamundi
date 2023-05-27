---
description: Technologies, Installation, Conception et Développement
---

# Documentation Technique

Le projet est totalement développement en Javascript/Node.js en utilisant le mono-repo avec la librairie [Lerna](https://lerna.js.org/). L'architecture de l'application étant 3 tiers :&#x20;

* Application Frontend SPA (Single Page Application) avec [React.js](https://react.dev/), [Typescript](https://www.typescriptlang.org/) et [Tailwind](https://tailwindcss.com/)
* API REST et Application Backend avec [Strapi (Headless CMS en Node.js)](https://strapi.io/)
* Base de données (Selon le choix de configuration Strapi : SqlLite, Postgres, MySQL ...)

### Pré-requis <a href="#requirements" id="requirements"></a>

* Installer lerna globally

```sh
yarn add -G lerna
```

* Utiliser Node v16 (Idéalement avec [NVM](https://fr.linux-console.net/?p=6#gsc.tab=0))

### Installation <a href="#installation" id="installation"></a>

```bash
yarn setup
```

### Développement <a href="#development" id="development"></a>

#### API <a href="#api" id="api"></a>

Lors du premier démarrage de l'API , il faut procéder par une compilation :

```sh
cd packages/gaiamundi-api
yarn build
cp .env.example .env
```

Démarrez le serveur API (Strapi Headless CMS): `yarn start:api`

#### Web <a href="#web" id="web"></a>

Démarrer l'application frontend avec la commande :&#x20;

```sh
yarn start:web
```

#### Desktop (En cours de développement) <a href="#desktop-coming-soon" id="desktop-coming-soon"></a>

Start Desktop app (Electron):&#x20;

```sh
yarn start:desktop
```

## Le modèle conceptuel des données

Le modèle conceptuel des données dans un diagramme UML :

<figure><img src=".gitbook/assets/UML.drawio.svg" alt=""><figcaption></figcaption></figure>
