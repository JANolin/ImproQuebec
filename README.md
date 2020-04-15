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
## MYSQL
1. VOUS DEVEZ __DELETE__ L'ANCIENNE DB MYSQL CAR ELLE EST OBSELETE. __OUVREZ MYSQL DEPUIS LE MEME REPERTOIRE QUE ImproQuebec__
  ```sql
  DROP DATABASE improquebec;
  ```
2. VOUS DEVEZ __CREER__ UNE NOUVELLE DB MYSQL AVEC LE FICHIER file.sql.
  ```sql
  source ./file.sql;
  ```
3. VOUS DEVEZ "UTILISER" LA DB improquebec
  ```sql
  use improquebec;
  ```
  ```
4. VOUS DEVEZ VOUS CONNECTER AU SITE A L'AIDE DE VOTRE __NOM D'UTILISATEUR (super_nom_dutilisateur)__ ET NON PLUS VOTRE EMAIL!
