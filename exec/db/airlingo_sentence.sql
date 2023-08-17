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
-- Table structure for table `sentence`
--

DROP TABLE IF EXISTS `sentence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentence` (
  `sentence_id` bigint NOT NULL AUTO_INCREMENT,
  `sentence_eng` varchar(255) NOT NULL,
  `sentence_kor` varchar(255) NOT NULL,
  PRIMARY KEY (`sentence_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentence`
--

LOCK TABLES `sentence` WRITE;
/*!40000 ALTER TABLE `sentence` DISABLE KEYS */;
INSERT INTO `sentence` VALUES (1,'What is the weather like today?','오늘 날씨가 어떤가요?'),(2,'I love summer because I enjoy swimming in the ocean.','나는 여름을 좋아해, 바다에서 수영하는 걸 즐기기 때문이야.'),(3,'Have you ever tried sushi? It is a Japanese dish.','스시를 먹어 본 적 있어요? 일본 음식이에요.'),(4,'I usually go for a walk when the weather is nice.','날씨가 좋을 때는 대개 산책하러 갑니다.'),(5,'Traveling alone allows me to explore at my own pace.','혼자 여행하면 내 속도로 탐험할 수 있어요.'),(6,'My favorite book is \"To Kill a Mockingbird\".','내가 가장 좋아하는 책은 \"아버지를 죽이다\"야.'),(7,'I really enjoy playing the guitar in my free time.','여가 시간에 기타 치는 걸 정말 좋아해요.'),(8,'I try to eat a balanced diet and exercise regularly.','균형 잡힌 식단을 챙기고 규칙적으로 운동하려고 노력해요.'),(9,'I am planning to watch a movie at the cinema this weekend.','이번 주말에 영화관에서 영화를 보기로 계획 중이에요.'),(10,'I have a close-knit family, and we often have gatherings.','우리 가족은 친밀하게 사는 편이고 종종 모임을 가집니다.'),(11,'I have two older brothers and a younger sister.','나는 형 둘과 여동생 한 명이 있어요.'),(12,'I went bungee jumping for the first time last week.','나는 지난 주에 처음으로 번지점프를 해 봤어요.'),(13,'My partner and I both enjoy hiking in the mountains.','나와 내 파트너는 둘 다 산에서 하이킹을 즐겨요.'),(14,'I usually read a book or watch a movie during my free time.','대개 여가 시간에 책을 읽거나 영화를 봐요.'),(15,'I have been working at my current company for five years.','나는 현재 회사에서 다섯 해동안 일하고 있어요.'),(16,'I am very close to my extended family, including my cousins.','나는 내 사촌을 포함한 넓은 가족 구성원들과 가까운 관계를 가지고 있어요.'),(17,'I enjoy playing soccer with my friends on weekends.','주말에는 친구들과 축구를 하는 걸 좋아해요.'),(18,'I think love is all about understanding and caring for each other.','나는 사랑은 서로 이해하고 돌보는 것에 관한 것이라고 생각해요.'),(19,'I enjoy going for a run in the morning to start my day.','아침에 달리기를 하면 하루를 시작하는데 도움이 되요.'),(20,'I am thinking of taking a cooking class to improve my culinary skills.','요리 기술을 향상시키기 위해 요리 수업을 듣는 생각을 하고 있어요.'),(21,'I find solace in painting whenever I feel stressed.','스트레스를 느낄 때마다 그림 그리는 것에서 안정을 찾아요.'),(22,'I like to read mystery novels to keep my mind engaged.','마음을 활기차게 유지하기 위해 미스터리 소설을 읽는 것을 좋아해요.'),(23,'I try to eat plenty of fruits and vegetables for a healthy lifestyle.','건강한 생활을 위해 과일과 채소를 많이 섭취하려고 노력해요.'),(24,'I am planning a trip to Europe next year to explore new cultures.','내년에 유럽 여행을 계획 중이에요, 새로운 문화를 탐험하려고 해요.'),(25,'I have a good relationship with my colleagues at the office.','사무실에서 동료들과 좋은 관계를 유지하고 있어요.'),(26,'I believe communication is key to a successful career.','나는 성공한 직업 생활을 위해서는 의사 소통이 중요하다고 믿어요.'),(27,'I cherish the moments spent with my family and friends.','가족과 친구들과 함께 보내는 순간들을 소중히 생각해요.'),(28,'I am fascinated by the intricacies of nature and often go hiking.','자연의 복잡성에 놀라며 종종 하이킹을 가곤 해요.'),(29,'I am a movie enthusiast and enjoy analyzing film plots.','나는 영화 애호가로 영화 플롯을 분석하는 걸 좋아해요.'),(30,'I am trying to broaden my horizons by learning a new language.','새로운 언어를 배우면서 시야를 확장하려고 노력하고 있어요.');
/*!40000 ALTER TABLE `sentence` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 11:04:17
