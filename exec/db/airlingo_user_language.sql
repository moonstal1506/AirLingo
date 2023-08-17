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
-- Table structure for table `user_language`
--

DROP TABLE IF EXISTS `user_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_language` (
  `grade_id` bigint NOT NULL,
  `language_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `user_language_id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_language_id`),
  KEY `FKip66ewqhmss7ymygbmwdi1t47` (`grade_id`),
  KEY `FK5dhe6kqh7ol7f48ker70e368r` (`language_id`),
  KEY `FK5tj1u2cplnxdoiouqvmvy3ksp` (`user_id`),
  CONSTRAINT `FK5dhe6kqh7ol7f48ker70e368r` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`),
  CONSTRAINT `FK5tj1u2cplnxdoiouqvmvy3ksp` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKip66ewqhmss7ymygbmwdi1t47` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`grade_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_language`
--

LOCK TABLES `user_language` WRITE;
/*!40000 ALTER TABLE `user_language` DISABLE KEYS */;
INSERT INTO `user_language` VALUES (4,2,1,1),(2,1,2,2),(2,1,3,3),(2,1,4,4),(3,1,5,5),(4,1,6,6),(5,1,7,7),(6,1,8,8),(2,3,1,9),(2,4,1,10),(2,5,1,11),(2,6,1,12),(3,2,9,13);
/*!40000 ALTER TABLE `user_language` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 11:04:02
