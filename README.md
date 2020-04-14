# ImproQuebec

## Description

ImproQuebec est une plateforme web pour la diffusion et le partage d'informations en lien avec la ligue d'improvisation des Pamplemousses. 

BdeB 2020

## License
[MIT](https://choosealicense.com/licenses/mit/)


## .env
1. VOUS DEVEZ __CREER UN .env__ EN SUIVANT L'EXEMPLE DU .env.example __SINON LA DB MYSQL NE FONCTIONNE PAS!__
2. VOUS DEVEZ VOUS __CREER__ UN USER DANS VOTRE DB MYSQL ET VOUS DONNER LES __PRIVILEGES__ POUR LE USER QUE VOUS AVEZ CREER!

  ```sql
  CREATE USER 'un_certain_nom_dutilisateur'@'localhost' IDENTIFIED BY 'un_certain_mot_de_passe';
  GRANT ALL PRIVILEGES ON * . * TO 'un_certain_nom_dutilisateur'@'localhost';
  ```
