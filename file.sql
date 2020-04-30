SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `improquebec` DEFAULT CHARACTER SET latin1 ;
USE `improquebec` ;

CREATE TABLE IF NOT EXISTS `improquebec`.`roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `role_name` VARCHAR(50) NOT NULL COMMENT '',
   PRIMARY KEY (`role_id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

INSERT INTO roles (role_name) VALUES('admin');
INSERT INTO roles (role_name) VALUES('user');
INSERT INTO roles (role_name) VALUES('equipe');
INSERT INTO roles (role_name) VALUES('coach');
INSERT INTO roles (role_name) VALUES('guest');

CREATE TABLE IF NOT EXISTS `improquebec`.`resources` (
  `resource_id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `resource_name` VARCHAR(50) NOT NULL COMMENT '',
   PRIMARY KEY (`resource_id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

INSERT INTO resources (resource_name) VALUES('accueil');
INSERT INTO resources (resource_name) VALUES('login');
INSERT INTO resources (resource_name) VALUES('register');
INSERT INTO resources (resource_name) VALUES('match');
INSERT INTO resources (resource_name) VALUES('historique');
INSERT INTO resources (resource_name) VALUES('equipe');
INSERT INTO resources (resource_name) VALUES('horaire');
INSERT INTO resources (resource_name) VALUES('enter');
INSERT INTO resources (resource_name) VALUES('logout');

CREATE TABLE IF NOT EXISTS `improquebec`.`permissions` (
  `permission_id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `permission_name` VARCHAR(50) NOT NULL COMMENT '',
   PRIMARY KEY (`permission_id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

INSERT INTO permissions (permission_name) VALUES('access');
INSERT INTO permissions (permission_name) VALUES('read');
INSERT INTO permissions (permission_name) VALUES('write');
INSERT INTO permissions (permission_name) VALUES('delete');
INSERT INTO permissions (permission_name) VALUES('update');

CREATE TABLE IF NOT EXISTS `improquebec`.`permissions_god` (
  `role_id` INT NOT NULL COMMENT '',
  `resource_id` INT NOT NULL COMMENT '',
  `permission_id` INT NOT NULL COMMENT '',

  CONSTRAINT `fk_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `improquebec`.`roles` (`role_id`),

  CONSTRAINT `fk_resources`
    FOREIGN KEY (`resource_id`)
    REFERENCES `improquebec`.`resources` (`resource_id`),

  CONSTRAINT `fk_permissions`
    FOREIGN KEY (`permission_id`)
    REFERENCES `improquebec`.`permissions` (`permission_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- USER --
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(2,1,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(2,5,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(2,6,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(2,7,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(2,8,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(2,9,1);

-- GUESS --
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(5,1,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(5,2,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(5,3,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(5,5,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(5,6,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(5,7,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(5,8,1);

-- EQUIPE --
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(3,1,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(3,4,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(3,5,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(3,6,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(3,7,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(3,8,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(3,9,1);

-- COACH --
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(4,1,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(4,5,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(4,6,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(4,7,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(4,8,1);
INSERT INTO permissions_god (role_id, resource_id, permission_id) VALUES(4,9,1);

-- -----------------------------------------------------
-- Table `improquebec`.`user_login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `improquebec`.`user_login` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `user_email` VARCHAR(50) NOT NULL COMMENT '',
  `user_password` VARCHAR(80) NOT NULL COMMENT '',
  `user_name` VARCHAR(50) NOT NULL COMMENT '',
  `user_role` INT NOT NULL COMMENT '',
  PRIMARY KEY (`user_id`)  COMMENT '',
  UNIQUE INDEX `user_name` (`user_name` ASC)  COMMENT '',
  CONSTRAINT `fk_user_roles`
    FOREIGN KEY (`user_role`)
    REFERENCES `improquebec`.`roles` (`role_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 69 
DEFAULT CHARACTER SET = latin1;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
