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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_complain` int NOT NULL,
  `user_mileage` int NOT NULL,
  `user_passport_style` int NOT NULL,
  `user_rating` double NOT NULL,
  `user_study_count` int NOT NULL,
  `user_total_mileage` int NOT NULL,
  `user_total_rating` double NOT NULL,
  `language_id` bigint NOT NULL,
  `user_created_date` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `user_modified_date` datetime(6) DEFAULT NULL,
  `user_bio` varchar(100) DEFAULT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_img_url` varchar(100) DEFAULT NULL,
  `user_login_id` varchar(100) NOT NULL,
  `user_nickname` varchar(100) NOT NULL,
  `user_google_id` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_state` enum('ACTIVE','INACTIVE') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_j09k2v8lxofv2vecxu2hde9so` (`user_email`),
  UNIQUE KEY `UK_hy85e8mct2r1rmhbjt9i6bl` (`user_login_id`),
  UNIQUE KEY `UK_cr59axqya8utby3j37qi341rm` (`user_nickname`),
  KEY `FKj9k2portqypgs993xn20pywtr` (`language_id`),
  CONSTRAINT `FKj9k2portqypgs993xn20pywtr` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,10000,1,4.611111111111111,18,10000,83,1,'2023-08-15 14:07:57.894887',1,'2023-08-16 10:46:31.736923','','user1@naver.com','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png','user1','김싸피','','Ssafy1234!','ACTIVE'),(0,6000,1,4,2,10000,8,2,'2023-08-15 14:09:38.087394',2,'2023-08-16 09:26:13.462650','','user2@naver.com','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png','user2','고싸피','','Ssafy1234!','ACTIVE'),(0,3510,1,3,2,10000,6,2,'2023-08-15 14:10:12.923976',3,'2023-08-16 10:46:32.162856','','user3@naver.com','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png','user3','문싸피','','Ssafy1234!','ACTIVE'),(0,2020,1,5,7,10000,35,2,'2023-08-15 14:10:43.542615',4,'2023-08-16 09:34:45.574724','','user4@naver.com','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png','user4','박싸피','','Ssafy1234!','ACTIVE'),(0,1000,1,2,3,10000,6,3,'2023-08-15 15:56:35.961313',5,'2023-08-15 15:56:35.961313','','user5@naver.com','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png','user5','오싸피','','Ssafy1234!','ACTIVE'),(0,0,1,1,2,10000,2,4,'2023-08-15 15:57:45.212232',6,'2023-08-15 15:57:45.212232','','user6@naver.com','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png','user6','박수환','','Ssafy1234!','ACTIVE'),(0,7000,1,4,2,10000,8,5,'2023-08-15 15:58:19.265090',7,'2023-08-15 15:58:19.265090','','user7@naver.com','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png','user7','문수환','','Ssafy1234!','ACTIVE'),(0,10000,1,3,2,10000,6,6,'2023-08-15 15:58:54.399423',8,'2023-08-15 15:58:54.399423','','user8@naver.com','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png','user8','오수환','','Ssafy1234!','ACTIVE'),(0,0,1,0,0,0,0,1,'2023-08-16 09:34:23.176208',9,'2023-08-16 09:34:23.176208','','esom735@gmail.com','https://airlingobucket.s3.ap-northeast-2.amazonaws.com/322cbe51-5407-44f4-aa9d-08676f3a4e5d.png','esom','esom','','Dlthals57!','ACTIVE');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 11:03:46
