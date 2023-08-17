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
-- Table structure for table `report_item`
--

DROP TABLE IF EXISTS `report_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_item` (
  `report_item_id` bigint NOT NULL AUTO_INCREMENT,
  `report_item_eng` varchar(255) NOT NULL,
  `report_item_kor` varchar(255) NOT NULL,
  PRIMARY KEY (`report_item_id`),
  UNIQUE KEY `UK_pql0lqu14lay217w5wrb4csu9` (`report_item_eng`),
  UNIQUE KEY `UK_bo64e80qb84s3gnk1vtpw44uq` (`report_item_kor`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_item`
--

LOCK TABLES `report_item` WRITE;
/*!40000 ALTER TABLE `report_item` DISABLE KEYS */;
INSERT INTO `report_item` VALUES (1,'Profanity or Offensive Language','욕설 또는 공격적인 언어'),(2,'Hateful Behavior','부적절한 행동'),(3,'Inappropriate Content','부적절한 콘텐츠'),(4,'Spam or Unwanted Messages','스팸 또는 원치 않는 메시지'),(5,'Copyright Infringement','저작권 침해'),(6,'Impersonation','사칭'),(7,'ETC','기타(위 범주에 포함되지 않는 기타 문제의 경우)');
/*!40000 ALTER TABLE `report_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 11:04:11
