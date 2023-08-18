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
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `card_id` bigint NOT NULL AUTO_INCREMENT,
  `card_code` enum('FAMILY','FOOD','FREE_TALK','FREE_TIME','HEALTH','HOBBY','LOVE','MOVIE','RECTAL','SPORTS','TRAVEL','WEATHER') DEFAULT NULL,
  `card_eng` varchar(255) NOT NULL,
  `card_kor` varchar(255) NOT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,'WEATHER','What is the weather like today?','오늘 날씨가 어떤가요?'),(4,'FOOD','What is your favorite type of food?','가장 좋아하는 음식 종류는 무엇인가요?'),(5,'FOOD','Have you ever tried a dish from a different culture?','다른 문화의 요리를 먹어 본 적이 있나요?'),(6,'FOOD','Do you enjoy cooking? If so, what do you like to cook?','요리하는 걸 즐기나요? 그렇다면 무엇을 요리하는 걸 좋아하나요?'),(7,'TRAVEL','What is your dream travel destination?','꿈꾸는 여행지가 어디인가요?'),(8,'TRAVEL','Do you prefer traveling alone or with others?','혼자 여행하는 것과 함께 다니는 것 중 어떤 걸 더 선호하나요?'),(9,'TRAVEL','What is the most memorable trip?','지금까지 다녀온 여행 중 가장 기억에 남는 여행은 무엇인가요?'),(10,'FAMILY','Tell me about your family.','가족에 대해 알려주세요.'),(11,'FAMILY','Are you close to your extended family members?','넓은 가족 구성원들과 가까운 관계를 가지고 있나요?'),(12,'FAMILY','Do you have any siblings? If so, how many?','형제나 자매가 있나요? 있다면 몇 명인가요?'),(13,'HOBBY','What do you enjoy doing in your free time?','여가 시간에 뭐하는 걸 좋아하나요?'),(14,'HOBBY','Have you recently started any new hobbies?','최근에 새로운 취미를 시작한 적이 있나요?'),(15,'HOBBY','Do you prefer indoor or outdoor activities?','실내 활동과 야외 활동 중 어떤 걸 더 선호하나요?'),(16,'SPORTS','What is your favorite sport to watch or play?','보거나 하기 좋아하는 스포츠는 무엇인가요?'),(17,'SPORTS','Do you think participating in sports is important for a healthy lifestyle?','스포츠 참여가 건강한 생활에 중요한 역할을 하는 것 같나요?'),(18,'SPORTS','Have you ever been to a live sports event? If so, which one?','라이브 스포츠 이벤트에 참여한 적이 있나요? 있다면 어떤 이벤트에 갔나요?'),(19,'HEALTH','How do you stay healthy?','건강을 유지하는 방법은 무엇인가요?'),(20,'HEALTH','Do you have any tips for maintaining a balanced diet?','균형 잡힌 식단을 유지하기 위한 조언이 있나요?'),(21,'HEALTH','How important is regular exercise to you?','정기적인 운동이 얼마나 중요한가요?'),(22,'FREE_TIME','What do you like to do in your free time?','여가 시간에 뭐를 하는 걸 좋아하나요?'),(23,'FREE_TIME','How do you unwind and relax after a long day?','긴 하루를 보낸 후에는 어떻게 힐링하고 휴식을 취하나요?'),(24,'FREE_TIME','Do you have any favorite books or movies to recommend?','추천해주는 좋아하는 책이나 영화가 있나요?'),(25,'RECTAL','Tell me about your current company or workplace.','지금 다니고 있는 회사나 직장에 대해 알려주세요.'),(26,'RECTAL','Have you had any memorable experiences in your career?','당신의 경력에서 기억에 남는 경험이 있나요?'),(27,'RECTAL','What do you enjoy most about your job?','당신의 일에서 가장 즐거운 점은 무엇인가요?'),(28,'LOVE','What does love mean to you?','사랑이란 당신에게 어떤 의미인가요?'),(29,'LOVE','Have you ever been in love?','사랑에 빠져 본 적이 있나요?'),(30,'LOVE','What qualities do you look for in a partner?','당신이 파트너로서 가장 중요하게 생각하는 특징은 무엇인가요?'),(31,'MOVIE','What is the last movie you watched and what did you think of it?','마지막으로 본 영화는 무엇이며 어땠나요?'),(32,'MOVIE','Do you prefer watching movies at the cinema or at home?','영화를 영화관에서 보는 것과 집에서 보는 것 중 어떤 걸 더 선호하나요?'),(33,'MOVIE','Do you enjoy a particular genre of movies?','특정한 장르의 영화를 즐기나요?');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 11:04:07
