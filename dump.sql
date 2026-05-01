-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: usapeptide
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `admin_refresh_tokens`
--

DROP TABLE IF EXISTS `admin_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_refresh_tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `token` text NOT NULL,
  `expires_at` timestamp NOT NULL,
  `is_revoked` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_refresh_tokens_admin_id_index` (`admin_id`),
  KEY `admin_refresh_tokens_expires_at_index` (`expires_at`),
  CONSTRAINT `admin_refresh_tokens_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_refresh_tokens`
--

LOCK TABLES `admin_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `admin_refresh_tokens` DISABLE KEYS */;
INSERT INTO `admin_refresh_tokens` VALUES (1,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc0FwcHJvdmVkIjp0cnVlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3NzU1MjA5MSwiZXhwIjoxNzc4MTU2ODkxfQ.slhcNRWz2I6lX_3X-_QoztvKoxevJ-drCDNzfLXGTfM','2026-05-07 12:28:11',0,'2026-04-30 12:28:11','2026-04-30 12:28:11'),(2,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc0FwcHJvdmVkIjp0cnVlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3NzU1MjExNSwiZXhwIjoxNzc4MTU2OTE1fQ.qcwnlAbpB5PcEMlgnQCeJxvs68cnVhpw2YMycIoc1Vs','2026-05-07 12:28:35',0,'2026-04-30 12:28:35','2026-04-30 12:28:35'),(3,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc0FwcHJvdmVkIjp0cnVlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3NzU1MjU4OSwiZXhwIjoxNzc4MTU3Mzg5fQ.2vRv3uIOv4DhedamXQodymHdsPIpbIuCEn3ZQ5jCU4I','2026-05-07 12:36:29',0,'2026-04-30 12:36:29','2026-04-30 12:36:29'),(4,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc0FwcHJvdmVkIjp0cnVlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3NzU1MjY5MiwiZXhwIjoxNzc4MTU3NDkyfQ.r4pkZHP4Gji1Os4ZtauieL1xp_k9VXdTA2h4azGHaUk','2026-05-07 12:38:13',0,'2026-04-30 12:38:12','2026-04-30 12:38:12'),(5,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc0FwcHJvdmVkIjp0cnVlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3NzU1MjczNCwiZXhwIjoxNzc4MTU3NTM0fQ.8blmbCmXNJx7rs4soFiTQIM5_oF22sHdjIgQmfFUaWc','2026-05-07 12:38:54',0,'2026-04-30 12:38:54','2026-04-30 12:38:54'),(6,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc0FwcHJvdmVkIjp0cnVlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3NzU1Mjc4NywiZXhwIjoxNzc4MTU3NTg3fQ.wnPUZ8OMpHEe3DaVI0ZKHOYPqTS70ZwcFHexbHInLj0','2026-05-07 12:39:48',0,'2026-04-30 12:39:47','2026-04-30 12:39:47');
/*!40000 ALTER TABLE `admin_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`),
  KEY `admins_email_index` (`email`),
  KEY `admins_created_at_index` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (2,'System','Admin','admin@example.com','$2b$10$/H6Qc2IQBbJ62Im2ZRgTFOyBcftYmqJmacR7ZZZx6gTo94Ua48dEO','2026-04-30 12:23:37','2026-04-30 12:23:37');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_table` varchar(255) NOT NULL DEFAULT 'products',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_user_id_product_id_unique` (`user_id`,`product_id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  CONSTRAINT `cart_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,3,'1',1,'2026-04-30 13:35:05','2026-04-30 13:35:05','products');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES (1,'ssss','fincom.learning@gmail.com','9309309300','General Inquiry','d','2026-04-30 12:40:14');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eliteselection_products`
--

DROP TABLE IF EXISTS `eliteselection_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eliteselection_products` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eliteselection_products`
--

LOCK TABLES `eliteselection_products` WRITE;
/*!40000 ALTER TABLE `eliteselection_products` DISABLE KEYS */;
INSERT INTO `eliteselection_products` VALUES ('062435a4-fa48-4e67-9b21-e2ef0244c60b','BPC-157 / TB-500 Blend',60.50,'https://example.com/p11.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('25ac0cd0-5406-4cd2-bb8c-e2314ad2fa2d','Retatrutide 20mg',183.70,'https://example.com/p2.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('2fcd720a-a752-4a3f-a90b-d133852fc280','Tirzepatide 60mg',242.00,'https://example.com/p5.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('32ce04b2-d34e-48a4-9a71-09998fa6d602','GLP-2',150.00,'https://example.com/p8.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('332f0e75-cff2-4fc3-86a0-eee8efc538d7','BPC-157 / TB-500 Blend 20mg',71.50,'https://example.com/p12.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('47344efa-65a6-4fbb-b1c4-afa72573af91','Semax',25.30,'https://example.com/p14.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('53888945-2514-4e99-842d-ca8389e41c7a','Tirzepatide 10mg',79.20,'https://example.com/p4.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('5ec9294f-ef1d-41d6-ab10-ab6c443187e9','Cagrilintide',118.80,'https://example.com/p7.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('61e4eca7-2bcc-4ed9-8b44-2aeb26de0a01','Retatrutide 10mg',108.90,'https://example.com/p1.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('944aa91e-fed6-437f-9823-9d8f82af0c8a','Semaglutide',88.00,'https://example.com/p6.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('a980abe7-f8b3-47ce-9cdc-835b302ad254','Selank',36.30,'https://example.com/p13.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('b120377d-e7b8-46cf-81cd-a1c3235678d4','Retatrutide 60mg',308.00,'https://example.com/p3.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('fbdcd9d7-8621-4f49-854d-bea93b1e9028','TB-500',51.70,'https://example.com/p10.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),('fe0908f4-75b9-42c4-8382-20e164e63147','BPC-157',49.50,'https://example.com/p9.png','2026-04-30 12:23:37','2026-04-30 12:23:37',NULL);
/*!40000 ALTER TABLE `eliteselection_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (5,'001_create_users_table.ts',1,'2026-04-30 12:20:12'),(6,'002_create_wholesale_applications_table.ts',1,'2026-04-30 12:20:12'),(7,'003_create_refresh_tokens_table.ts',1,'2026-04-30 12:20:12'),(8,'004_expand_wholesale_applications_table.ts',1,'2026-04-30 12:20:12'),(9,'005_cleanup_wholesale_applications_table.ts',1,'2026-04-30 12:20:12'),(10,'006_add_admin_role_to_users.ts',1,'2026-04-30 12:20:12'),(11,'007_remove_admin_role_from_users.ts',1,'2026-04-30 12:20:12'),(12,'008_create_admins_table.ts',1,'2026-04-30 12:20:12'),(13,'009_create_admin_refresh_tokens_table.ts',1,'2026-04-30 12:20:13'),(14,'010_seed_default_admin.ts',1,'2026-04-30 12:20:13'),(15,'20260424042459_011_create_products_table.ts',1,'2026-04-30 12:20:13'),(16,'20260424050229_012_add_image_to_products.ts',1,'2026-04-30 12:20:13'),(17,'20260424052958_create_eliteselection_products.ts',1,'2026-04-30 12:20:13'),(18,'20260424073333_update_products_image_column.ts',1,'2026-04-30 12:20:13'),(19,'20260424113356_create_wholesale_prices.ts',1,'2026-04-30 12:20:13'),(20,'20260427073322_add_wholesale_fields.ts',1,'2026-04-30 12:20:13'),(21,'20260427080056_create_contact_messages.ts',1,'2026-04-30 12:20:13'),(22,'20260427101548_change_monthly_volume_to_string.ts',1,'2026-04-30 12:20:13'),(23,'20260428172500_create_sales_reps_table.ts',1,'2026-04-30 12:20:13'),(24,'20260428172600_add_rep_to_users_and_orders.ts',2,'2026-04-30 12:23:29'),(25,'20260428172700_create_sales_rep_refresh_tokens_table.ts',2,'2026-04-30 12:23:29'),(26,'20260428173000_update_sales_rep_and_orders.ts',2,'2026-04-30 12:23:30'),(27,'20260428175200_add_rep_to_wholesale_applications.ts',2,'2026-04-30 12:23:30'),(28,'20260428_create_cart_items.ts',2,'2026-04-30 12:23:30'),(29,'20260429053002_add_product_table_to_cart_items.ts',2,'2026-04-30 12:23:30'),(30,'20260429053148_change_product_id_to_string_in_cart_items.ts',2,'2026-04-30 12:23:30'),(31,'20260429170000_add_payment_screenshot_to_orders.ts',2,'2026-04-30 12:23:30'),(32,'20260429173000_add_payment_id_to_orders.ts',2,'2026-04-30 12:23:30');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned DEFAULT NULL,
  `product_id` int unsigned DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `notes` text,
  `payment_method` varchar(255) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `sales_rep_id` int unsigned DEFAULT NULL,
  `commission_status` varchar(255) NOT NULL DEFAULT 'pending',
  `commission_paid_at` timestamp NULL DEFAULT NULL,
  `payment_screenshot` varchar(255) DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  KEY `orders_sales_rep_id_foreign` (`sales_rep_id`),
  CONSTRAINT `orders_sales_rep_id_foreign` FOREIGN KEY (`sales_rep_id`) REFERENCES `sales_reps` (`id`) ON DELETE SET NULL,
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `purity` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `old_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `wholesale_min_qty` int DEFAULT NULL,
  `wholesale_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'mg','Retatrutide_10mg','12','99.9',23.00,24.00,'2026-04-30 12:44:02','2026-04-30 12:44:02','1777553042926.png',12,200.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `token` text NOT NULL,
  `expires_at` timestamp NOT NULL,
  `is_revoked` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `refresh_tokens_user_id_index` (`user_id`),
  KEY `refresh_tokens_expires_at_index` (`expires_at`),
  CONSTRAINT `refresh_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (1,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoic0BnbWFpbC5jb20iLCJyb2xlIjoicmV0YWlsIiwiaXNBcHByb3ZlZCI6MSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3Nzc1NTYwOTEsImV4cCI6MTc3ODE2MDg5MX0.P-q97nFwt3T5kYdyoDGRtQr2xqfvJbX4xMZh4g0ETUM','2026-05-07 13:34:52',0,'2026-04-30 13:34:51','2026-04-30 13:34:51');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_rep_refresh_tokens`
--

DROP TABLE IF EXISTS `sales_rep_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_rep_refresh_tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `rep_id` int unsigned NOT NULL,
  `token` text NOT NULL,
  `expires_at` timestamp NOT NULL,
  `is_revoked` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sales_rep_refresh_tokens_rep_id_index` (`rep_id`),
  KEY `sales_rep_refresh_tokens_expires_at_index` (`expires_at`),
  CONSTRAINT `sales_rep_refresh_tokens_rep_id_foreign` FOREIGN KEY (`rep_id`) REFERENCES `sales_reps` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_rep_refresh_tokens`
--

LOCK TABLES `sales_rep_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `sales_rep_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales_rep_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_reps`
--

DROP TABLE IF EXISTS `sales_reps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_reps` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `rep_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `commission_rate` decimal(5,2) NOT NULL DEFAULT '0.10',
  `role` enum('sales_rep') NOT NULL DEFAULT 'sales_rep',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sales_reps_rep_id_unique` (`rep_id`),
  UNIQUE KEY `sales_reps_email_unique` (`email`),
  KEY `sales_reps_rep_id_index` (`rep_id`),
  KEY `sales_reps_email_index` (`email`),
  KEY `sales_reps_created_at_index` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_reps`
--

LOCK TABLES `sales_reps` WRITE;
/*!40000 ALTER TABLE `sales_reps` DISABLE KEYS */;
INSERT INTO `sales_reps` VALUES (1,'REP001','John Sales','john@elitepharm.com','$2b$10$w2kOSM60w/AMOhBkwTF6YuIoWyAU2ci01nwtPBO5fkh1AaFbQkqzm',0.10,'sales_rep','2026-04-30 12:23:37','2026-04-30 12:23:37',1),(2,'REP002','Sarah Representative','sarah@elitepharm.com','$2b$10$w2kOSM60w/AMOhBkwTF6YuIoWyAU2ci01nwtPBO5fkh1AaFbQkqzm',0.15,'sales_rep','2026-04-30 12:23:37','2026-04-30 12:23:37',1);
/*!40000 ALTER TABLE `sales_reps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_addresses`
--

DROP TABLE IF EXISTS `user_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_addresses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_addresses_user_id_foreign` (`user_id`),
  CONSTRAINT `user_addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_addresses`
--

LOCK TABLES `user_addresses` WRITE;
/*!40000 ALTER TABLE `user_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('retail','wholesale') NOT NULL DEFAULT 'retail',
  `is_approved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sales_rep_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_email_index` (`email`),
  KEY `users_role_index` (`role`),
  KEY `users_created_at_index` (`created_at`),
  KEY `users_sales_rep_id_foreign` (`sales_rep_id`),
  CONSTRAINT `users_sales_rep_id_foreign` FOREIGN KEY (`sales_rep_id`) REFERENCES `sales_reps` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Retail','retail@example.com','555-0001','Local Retail Store','$2b$10$rkmzETUWWa2seW/APJqwoe79ge9OJQHfpOH1Tnw7MPtM3z9D8Q5LO','retail',1,'2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),(2,'Jane','Wholesale','wholesale@example.com','555-0002','ABC Wholesale Corp','$2b$10$iYSa.z6R7XRobGv5aLDsQODQO4LPHILBg8sfcNQgQDAvO7QTnGQ2a','wholesale',1,'2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),(3,'s','s','s@gmail.com','1234512345','s','$2b$10$VmtylWtpP8fdUgLU.DWec.cIz6Vl2hzjqe7uYVJQmiqxDJNzTOSa.','retail',1,'2026-04-30 13:34:33','2026-04-30 13:34:33',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wholesale_applications`
--

DROP TABLE IF EXISTS `wholesale_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wholesale_applications` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `business_name` varchar(255) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `business_type` varchar(255) NOT NULL,
  `monthly_volume` int NOT NULL,
  `source` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `rejection_reason` text,
  `user_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sales_rep_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wholesale_applications_email_index` (`email`),
  KEY `wholesale_applications_status_index` (`status`),
  KEY `wholesale_applications_user_id_index` (`user_id`),
  KEY `wholesale_applications_created_at_index` (`created_at`),
  KEY `wholesale_applications_sales_rep_id_foreign` (`sales_rep_id`),
  CONSTRAINT `wholesale_applications_sales_rep_id_foreign` FOREIGN KEY (`sales_rep_id`) REFERENCES `sales_reps` (`id`) ON DELETE SET NULL,
  CONSTRAINT `wholesale_applications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wholesale_applications`
--

LOCK TABLES `wholesale_applications` WRITE;
/*!40000 ALTER TABLE `wholesale_applications` DISABLE KEYS */;
INSERT INTO `wholesale_applications` VALUES (1,'XYZ Distributors','Bob Johnson','bob@xyzdist.com','555-0003','Distributor',10000,'Trade Show','pending',NULL,NULL,'2026-04-30 12:23:37','2026-04-30 12:23:37',NULL),(2,'Global Supplies Inc','Alice Williams','alice@globalsupplies.com','555-0004','Reseller',5000,'Google Search','pending',NULL,NULL,'2026-04-30 12:23:37','2026-04-30 12:23:37',NULL);
/*!40000 ALTER TABLE `wholesale_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wholesale_prices`
--

DROP TABLE IF EXISTS `wholesale_prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wholesale_prices` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `min_qty` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `wholesale_prices_product_id_foreign` (`product_id`),
  CONSTRAINT `wholesale_prices_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wholesale_prices`
--

LOCK TABLES `wholesale_prices` WRITE;
/*!40000 ALTER TABLE `wholesale_prices` DISABLE KEYS */;
/*!40000 ALTER TABLE `wholesale_prices` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-01 17:54:25
