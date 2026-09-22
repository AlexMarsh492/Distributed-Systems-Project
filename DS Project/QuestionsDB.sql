-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: questions
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `tbl_questions`
--

DROP TABLE IF EXISTS `tbl_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_questions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `type_ID` int NOT NULL,
  `Question` text,
  `Answer` text,
  `Wrong1` text,
  `Wrong2` text,
  `Wrong3` text,
  PRIMARY KEY (`ID`),
  KEY `fk_Questions_type_idx` (`type_ID`),
  CONSTRAINT `fk_Questions_type` FOREIGN KEY (`type_ID`) REFERENCES `tbl_type` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_questions`
--

LOCK TABLES `tbl_questions` WRITE;
/*!40000 ALTER TABLE `tbl_questions` DISABLE KEYS */;
INSERT INTO `tbl_questions` VALUES (1,1,'What was the first food eaten on the moon?','Canned Peaches','Crackers','Canned Pears','Cheese'),(2,1,'In the medical field, what is milk classes as?','Food','Drink','None','Acid'),(3,1,'What animal did Thomas Edison electrocute?','Elephant','Dog','Lion','Falcon'),(4,1,'What is the dot on a dice called?','Pip','Diddle','Tiddle','One'),(5,2,'What is the only metal that is liquid at room tempreture?','Mercury','Copper','Zinc','Titainum'),(6,2,'What is the tallest type of grass?','Bamboo','Ferns','Flowers','Bushes'),(7,2,'What is the largest desert of earth?','Antartica','Sahara','Syrian','Arabian'),(8,2,'What does a geiger counter measure?','Radiation','Acid','Alkali','Tempreture'),(9,3,'What is the most used programming language?','Python','Java','C++','Dafny'),(10,3,'What operating system has their own penguin mascot?','Linux','Windows','Mac','Chrome OS'),(11,3,'What is the most popular AI program?','ChatGPT','Microsoft Copilot','Alexa','Gemini'),(12,3,'What is the name of the first computer worm?','Creeper','Jim','StarLine','Blaze'),(13,4,'What was the colour of first SFX screen used in movies?','Yellow','Blue','Green','Red'),(14,4,'In the Matrixs, what pill does neo take?','Red pill','Blue pill','White pill','Purple pill'),(15,4,'The name of the skyscraper in Die Hard?','Nakatomi Plaza','Maze Bank','Icon Tower','Empire States'),(16,4,'What is the killers name in Friday 13th movie?','Jason','Micheal','Freddy','William'),(17,3,'which one of these is not part of Programming','Tune','Class','String','Python'),(18,14,'What was the name of the person who betrayed Jesus','Judas','Peter','Michael','Samuel'),(19,14,'how many world wars are there','2','4','5','6');
/*!40000 ALTER TABLE `tbl_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_type`
--

DROP TABLE IF EXISTS `tbl_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_type` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Type` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_type`
--

LOCK TABLES `tbl_type` WRITE;
/*!40000 ALTER TABLE `tbl_type` DISABLE KEYS */;
INSERT INTO `tbl_type` VALUES (1,'General'),(2,'Science'),(3,'Programming'),(4,'Movies'),(14,'History');
/*!40000 ALTER TABLE `tbl_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-29 19:02:08
