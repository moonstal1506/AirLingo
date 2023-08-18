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
-- Table structure for table `word`
--

DROP TABLE IF EXISTS `word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word` (
  `user_id` bigint NOT NULL,
  `word_id` bigint NOT NULL AUTO_INCREMENT,
  `word_description` varchar(100) NOT NULL,
  `word_name` varchar(100) NOT NULL,
  PRIMARY KEY (`word_id`),
  KEY `FKq6vj4o70ro4p1mdi1kiuv98iv` (`user_id`),
  CONSTRAINT `FKq6vj4o70ro4p1mdi1kiuv98iv` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word`
--

LOCK TABLES `word` WRITE;
/*!40000 ALTER TABLE `word` DISABLE KEYS */;
INSERT INTO `word` VALUES (1,1,'기업,회사','enterprise'),(1,2,'사람','person'),(1,3,'도시','city'),(1,4,'학교','school'),(1,5,'자동차','car'),(1,6,'음식','food'),(1,7,'컴퓨터','computer'),(1,8,'여행','travel'),(1,9,'영화','movie'),(1,10,'음악','music'),(1,11,'스포츠','sports'),(1,12,'책','book'),(1,13,'언어','language'),(1,14,'동물','animal'),(1,15,'휴일','holiday'),(1,16,'건강','health'),(1,17,'가족','family'),(1,18,'친구','friend'),(1,19,'날씨','weather'),(1,20,'화면','screen'),(1,21,'문제','issue'),(1,22,'기회','opportunity'),(1,23,'미래','future'),(1,24,'과학','science'),(1,25,'문화','culture'),(1,26,'미술','art'),(1,27,'사랑','love'),(1,28,'경제','economy');
/*!40000 ALTER TABLE `word` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 11:04:14
