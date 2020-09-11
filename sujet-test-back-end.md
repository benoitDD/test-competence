# Test technique Totem : Javascript Back-end

## Énoncé

Le but de ce test est de démontrer vos capacités back-end en Javascript.
Le rendu attendu est une API en NodeJS qui répondra au besoin exprimé plus bas.
L'architecture peut être faite en GraphQL.
Libre à vous d'utiliser n'importe quel framework, base de données, ORM, librairie tant que vous pouvez le justifier.

> De manière générale, et si le temps vous le permet, tout ce qui peut être ajouté au projet comme la gestion des différents environnements (développement, pré-production, production), l'ajout de docker, l'ajout d'un process manager ou encore un front qui affichera les données de votre API constitueront un vrai plus.

### Besoin

Vous êtes en charge du développement back-end d'un blog où des utilisateurs peuvent créer des articles.

- Un article est composé d'un titre, d'une image, d'un texte, d'un ou plusieurs tags, s'il est public ou privé et de commentaires.

- Un utilisateur est composé d'un email, d'un pseudonyme, d'un mot de passe, d'un avatar et d'un role (Admin ou user).

Tous les utilisateurs ont la possibilité de créer un article, de modifier ou supprimer leur propre article, de rechercher un article ainsi que de poster des commentaires.

Les administrateurs ont un rôle de modérateur et peuvent donc modifier ou supprimer n'importe quel article ou commentaire.

Libre à vous de choisir la méthode d'authentification que vous souhaitez.

## Liste de technologies conseillées

| Technos   | Documentation                           |
| --------- | --------------------------------------- |
| Express   | http://expressjs.com/                   |
| Koa       | https://koajs.com/                      |
| Prisma    | https://www.prisma.io/docs              |
| Bookshelf | https://bookshelfjs.org/                |
| Sequelize | http://docs.sequelizejs.com/            |
| PM2       | http://pm2.keymetrics.io/               |
| Docker    | https://docs.docker.com/                |
| Convict   | https://github.com/mozilla/node-convict |
| Lodash    | https://lodash.com/                     |


Bon courage,
L'équipe Totem