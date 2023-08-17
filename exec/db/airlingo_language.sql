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
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `language_id` bigint NOT NULL AUTO_INCREMENT,
  `language_eng_name` varchar(50) NOT NULL,
  `language_kor_name` varchar(50) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`language_id`),
  UNIQUE KEY `UK_cpm6q2blp30mxw7q9rpni9w7t` (`language_eng_name`),
  UNIQUE KEY `UK_88jt7miuhg0cfgh7slwrjm7ij` (`language_kor_name`),
  UNIQUE KEY `UK_c4u4bxbtro16r6dhctsss9upb` (`image_url`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,'Korean','한국어','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-korea-icon.svg'),(2,'English','영어','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-britain-icon.svg'),(3,'Japanese','일본어','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-japan-icon.svg'),(4,'Chinese','중국어','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-china-icon.svg'),(5,'French','프랑스어','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-france-icon.svg'),(6,'Spanish','스페인어','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-spain-icon.svg');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 11:03:41
