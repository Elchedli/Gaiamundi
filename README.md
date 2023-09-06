# Gaïamundi

The following project is a mono-repo built using [Lerna](https://lerna.js.org/)

Please check our full documentation here : [https://gaiamundi.gitbook.io/](https://gaiamundi.gitbook.io/)

## Requirements

- Install lerna globally : `yarn add -G lerna`
- Node v16

## Installation

```bash

yarn setup
```

## Development

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

### Docker
You will need to install Docker and Docker Compose.

#### Development
- Note that you will need to copy `.env.example` to `.env`.
- Run Gaiamundi using Docker Compose : `docker compose -f "docker-compose.yml" -f "docker-compose.dev.yml" up -d --build`
- Login to admin using the following URL : `http://localhost/backend/admin`
- Access the app using the following URL : `http://localhost`

#### Production
Same as development but you will run Gaiamundi using Docker Compose : `docker compose -f "docker-compose.yml" -f "docker-compose.prod.yml" up -d --build`

Now for the tricky part. We need nginx to perform the Let’s Encrypt validation But nginx won’t start if the certificates are missing.

So what do we do? Create a dummy certificate, start nginx, delete the dummy and request the real certificates.
Luckily, you don’t have to do all this manually, I have created a convenient script for this.

Download the script to your working directory as init-letsencrypt.sh:

```sh
curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh
```
Edit the script to add in your domain(s) and your email address. If you’ve changed the directories of the shared Docker volumes, make sure you also adjust the `data_path` variable as well.

Then run `chmod +x init-letsencrypt.sh` and sudo `./init-letsencrypt.sh`.