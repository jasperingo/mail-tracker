CREATE DATABASE  IF NOT EXISTS `mail-tracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mail-tracker`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mail-tracker
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `letters`
--

DROP TABLE IF EXISTS `letters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `templateId` int(11) NOT NULL,
  `title` text NOT NULL,
  `createdAt` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `templateId` (`templateId`),
  KEY `userId` (`userId`),
  CONSTRAINT `letters_ibfk_1` FOREIGN KEY (`templateId`) REFERENCES `templates` (`id`),
  CONSTRAINT `letters_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letters`
--

LOCK TABLES `letters` WRITE;
/*!40000 ALTER TABLE `letters` DISABLE KEYS */;
INSERT INTO `letters` VALUES (1,3,1,'Missing result for IMT508','2022-11-14 14:05:28'),(2,3,1,'Letter title','2022-11-14 16:24:48'),(3,3,1,'This is the letter title','2022-11-14 17:36:37'),(4,1,1,'Letter of missing result for IMT504','2022-11-19 08:29:59');
/*!40000 ALTER TABLE `letters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lettervalues`
--

DROP TABLE IF EXISTS `lettervalues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lettervalues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `letterId` int(11) NOT NULL,
  `templateVariableId` int(11) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `templateVariableId` (`templateVariableId`),
  KEY `letterId` (`letterId`),
  CONSTRAINT `lettervalues_ibfk_1` FOREIGN KEY (`templateVariableId`) REFERENCES `templatevariables` (`id`),
  CONSTRAINT `lettervalues_ibfk_2` FOREIGN KEY (`letterId`) REFERENCES `letters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lettervalues`
--

LOCK TABLES `lettervalues` WRITE;
/*!40000 ALTER TABLE `lettervalues` DISABLE KEYS */;
INSERT INTO `lettervalues` VALUES (1,1,3,'Software design'),(2,1,4,'IMT 508'),(3,2,3,'System simulation'),(4,2,4,'IMT 502'),(5,3,3,'System simulation'),(6,3,4,'IMT 502'),(7,4,3,'Computer ethics'),(8,4,4,'IMT504');
/*!40000 ALTER TABLE `lettervalues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipients`
--

DROP TABLE IF EXISTS `recipients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `letterId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `signedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `letterId` (`letterId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `recipients_ibfk_1` FOREIGN KEY (`letterId`) REFERENCES `letters` (`id`),
  CONSTRAINT `recipients_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipients`
--

LOCK TABLES `recipients` WRITE;
/*!40000 ALTER TABLE `recipients` DISABLE KEYS */;
INSERT INTO `recipients` VALUES (1,1,1,0,'2022-11-14 16:51:46'),(2,1,2,1,'2022-11-19 09:10:08'),(3,2,1,0,NULL),(4,2,2,1,NULL),(5,3,1,0,NULL),(6,4,4,0,'2022-11-19 08:48:45');
/*!40000 ALTER TABLE `recipients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `title` text NOT NULL,
  `endedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,5,'Lecturer of IMT508',NULL,'2022-11-13 04:36:02'),(2,4,'HOD of Information Technology Department',NULL,'2022-11-13 04:36:33'),(3,4,'Lecturer of IMT502',NULL,'2022-11-14 10:51:17'),(4,1,'Lecturer of IMT504',NULL,'2022-11-18 16:19:07');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,'Missing Result','Dear Sir or Madam, <br/> My name is <%= senderFirstName %> <%= senderLastName %>. <br/> I have a missing result in <%= courseTitle %> <%= courseCode %>.','2022-11-13 18:01:10'),(2,'Missing Practical','Dear Sir or Madam, <br/> My name is <%= senderFirstName %> <%= senderLastName %> with matriculation number <%= senderMatriculationNumber %>. <br/> I have a missing practical in <%= courseTitle %> <%= courseCode %>.','2022-11-13 18:02:50'),(3,'Missing test score','<div>Hello Sir/Madam.</div><div><br></div><div>My name is &lt;%= senderFirstName %&gt; &lt;%= senderLastName %&gt; with matriculation number &lt;%= senderMatriculationNumber %&gt;.<br></div><br>Please I have a missing test score in &lt;%= courseTitle %&gt; (&lt;%= courseCode %&gt;)<br>','2022-11-19 04:59:23');
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templatevariables`
--

DROP TABLE IF EXISTS `templatevariables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templatevariables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `templateId` int(11) NOT NULL,
  `name` text NOT NULL,
  `source` enum('input','database') NOT NULL,
  `databaseField` text,
  PRIMARY KEY (`id`),
  KEY `templateId` (`templateId`),
  CONSTRAINT `templatevariables_ibfk_1` FOREIGN KEY (`templateId`) REFERENCES `templates` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templatevariables`
--

LOCK TABLES `templatevariables` WRITE;
/*!40000 ALTER TABLE `templatevariables` DISABLE KEYS */;
INSERT INTO `templatevariables` VALUES (1,1,'senderFirstName','database','firstName'),(2,1,'senderLastName','database','lastName'),(3,1,'courseTitle','input',NULL),(4,1,'courseCode','input',NULL),(5,2,'senderFirstName','database','firstName'),(6,2,'senderLastName','database','lastName'),(7,2,'senderMatriculationNumber','database','matriculationNumber'),(8,2,'courseTitle','input',NULL),(9,2,'courseCode','input',NULL),(10,3,'senderFirstName','database','firstName'),(11,3,'senderLastName','database','lastName'),(12,3,'senderMatriculationNumber ','database','matriculationNumber '),(13,3,'courseTitle','input',NULL),(14,3,'courseCode','input',NULL);
/*!40000 ALTER TABLE `templatevariables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `matriculationNumber` text,
  `createdAt` datetime DEFAULT (now()),
  `isAdmin` tinyint(1) NOT NULL DEFAULT (false),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Prof','John','Doe','john.doe@futo.edu.ng','$2b$10$G075mAVITp8bUDv8jM2AYeGkQJ2rJGIL7lb/lPBU7ujqBdUUBvG/q',NULL,'2022-11-02 23:07:47',1),(3,NULL,'Peter','Pan','peter.pan@futo.edu.ng','$2b$10$htu9Rakas6KjFFEhRXc3G.Z7pBoYa2mYpUAbtP7i6y7/gISI4X9Ye','20161994946','2022-11-03 01:07:10',0),(4,NULL,'Jane','Doe','jane.doe@futo.edu.ng','$2b$10$Ru7mewgjsWYdOST2SXHnw.lANi4DUUY1UsSz3jJSm4ctf75ZiinqW',NULL,'2022-11-03 18:29:36',0),(5,NULL,'Jack','Man','jack.man@futo.edu.ng','$2b$10$5UJGhFt5mrFzl9DEJio4Ce4/jEqU0GOwCKI3G8wkSheX1WwnrLEdy',NULL,'2022-11-03 18:31:16',0),(6,NULL,'Gift','Bag','gift.bag@futo.edu.ng','$2b$10$rI36JM4WM78/fT63hXk5.uqoR5w8M88xACDCbsK/rLAOLAWuktavm','20162382901','2022-11-18 10:14:33',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-19  9:20:08
