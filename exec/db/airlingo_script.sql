-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: airlingo
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.2

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
-- Table structure for table `script`
--

DROP TABLE IF EXISTS `script`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `script` (
  `card_id` bigint NOT NULL,
  `script_created_date` datetime(6) DEFAULT NULL,
  `script_id` bigint NOT NULL AUTO_INCREMENT,
  `script_modified_date` datetime(6) DEFAULT NULL,
  `study_id` bigint NOT NULL,
  `script_url` varchar(100) NOT NULL,
  `script_content` tinytext NOT NULL,
  PRIMARY KEY (`script_id`),
  KEY `FK9amk3ukeesh8d1eplyrfm5qdy` (`card_id`),
  KEY `FKbl76elo9i8xihyu9bf37b6vlk` (`study_id`),
  CONSTRAINT `FK9amk3ukeesh8d1eplyrfm5qdy` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`),
  CONSTRAINT `FKbl76elo9i8xihyu9bf37b6vlk` FOREIGN KEY (`study_id`) REFERENCES `study` (`study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `script`
--

LOCK TABLES `script` WRITE;
/*!40000 ALTER TABLE `script` DISABLE KEYS */;
INSERT INTO `script` VALUES (1,'2023-08-18 09:00:00.000000',1,'2023-08-18 09:09:00.000000',10,'url','content'),(8,'2023-08-18 09:10:00.000000',2,'2023-08-18 09:18:00.000000',10,'url','content'),(12,'2023-08-18 09:20:00.000000',3,'2023-08-18 09:30:00.000000',10,'url','content'),(15,'2023-08-15 14:00:00.000000',4,'2023-08-15 14:10:00.000000',9,'url','content'),(4,'2023-08-15 14:10:00.000000',5,'2023-08-15 14:20:00.000000',9,'url','content'),(30,'2023-08-08 14:15:00.000000',6,'2023-08-08 14:30:00.000000',4,'url','content');
/*!40000 ALTER TABLE `script` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 11:03:55
