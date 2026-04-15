-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 15 avr. 2026 à 18:56
-- Version du serveur : 9.1.0
-- Version de PHP : 8.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tetes-nivoles`
--

-- --------------------------------------------------------

--
-- Structure de la table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `author` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description` text COLLATE utf8mb4_general_ci,
  `cover_image` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `published_year` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `sort_order` int DEFAULT '0',
  `back_cover_image` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amazon_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fnac_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `edilivre_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `books`
--

INSERT INTO `books` (`id`, `title`, `subtitle`, `author`, `quote`, `description`, `cover_image`, `published_year`, `created_at`, `updated_at`, `sort_order`, `back_cover_image`, `amazon_url`, `fnac_url`, `edilivre_url`) VALUES
(1, 'De Boue et de Vent', 'L\'art est une maison habitée', 'Mickaël Crépin', NULL, 'Son premier recueil, De boue et de vent, issu d’une lente germination de douze années, évoque l’itinéraire de l’Humanité sur la Terre. L’Homme est un funambule. Perché sur son fil, au-dessus des passions et des tourmentes noyées de boue, il se laisse porter par le vent de sa volonté et de ses idéaux. Seule alternative pour lui : avancer ou tomber. Lyriques, souvent engagés, parfois mystiques ou métaphysiques, ses poèmes dessinent un chemin vers l’unique et ultime rédemption : l’Art.', '/uploads/books/books_69df9027739358.59946118.jpg', 2024, '2026-04-13 21:35:40', '2026-04-13 21:35:40', 0, '/uploads/books/books_69df902c51a398.10229129.jpg', 'https://www.amazon.fr/boue-vent-Micka%C3%ABl-Cr%C3%A9pin/dp/2414635401', 'https://www.fr.fnac.be/a20989761/Mickael-Crepin-De-Boue-et-de-Vent', 'https://librairie.edilivre.com/poesie/33468-de-boue-et-de-vent-9782414635405.html');

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prenom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `sujet` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `prenom`, `nom`, `email`, `sujet`, `message`, `is_read`, `created_at`) VALUES
(1, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'tesss', 'qqqqqqqqqqqqqq', 0, '2026-04-13 20:44:45'),
(2, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'wwwwwww', 'wwwwwwwwwwwwwwwwwwwwwww', 0, '2026-04-13 20:46:58'),
(3, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'az', 'azzzzzzzzz', 0, '2026-04-13 20:48:46'),
(4, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'qqqqqqqqqqqq', 'qaaaaaaaaaaaaaaaaaaaaaaaaaaa', 0, '2026-04-13 20:51:05'),
(5, 'qq', 'qqqq', 'qqq@gmail.com', 'sddddds', 'sssssssssss', 0, '2026-04-13 20:52:03'),
(6, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'ssssssssssssss', 'sssjjjjjjjjjjjjjjjjj', 0, '2026-04-13 20:54:43'),
(7, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'dxxxxxxxxxxxx', 'jhhhhhhhhhhhhhh', 0, '2026-04-13 20:56:52'),
(8, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'dxxxxxxxxxxxx', 'jhhhhhhhhhhhhhh', 0, '2026-04-13 20:56:52'),
(9, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'qqqqqqqq', 'qqqqqqqqqqqqqq', 0, '2026-04-13 21:08:42'),
(10, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'qqqqqqqq', 'qqqqqqqqqqqqqq', 0, '2026-04-13 21:08:42'),
(11, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'salut c\'est greg', 'aaaaaaaaaaa', 0, '2026-04-13 21:10:32'),
(12, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'salut c\'est greg', 'aaaaaaaaaaa', 0, '2026-04-13 21:10:32'),
(13, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'ccccccccccc', 'ccmmmmmmmmmmmmmmmmm', 0, '2026-04-13 21:20:50'),
(14, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'aaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaa', 0, '2026-04-13 21:24:21'),
(15, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'zzzzzz', 'zzzzzzzzaazzzzzzzzzzzz', 0, '2026-04-14 10:06:48'),
(16, 'ssssssssssssssss', 'ssss', 'sssss@gmail.com', 'ssssssssssssss', 'sssssssss', 0, '2026-04-14 10:12:32'),
(17, 'Gauthier', 'a', 'rigauxgauthier@gmail.com', '', 'ddffff', 0, '2026-04-14 10:15:33'),
(18, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'ccccc', 'cccccccccccccccccccccc', 0, '2026-04-14 15:10:37'),
(19, 'Gauthier', 'Rigaux', 'rigauxgauthier@gmail.com', 'kkkkkkk', 'mmmmmmmmmmmmmm', 0, '2026-04-14 15:23:26');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `event_date` datetime NOT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `price` decimal(10,2) DEFAULT NULL,
  `booking_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `show_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `location`, `event_date`, `is_published`, `created_at`, `updated_at`, `price`, `booking_url`, `show_name`) VALUES
(12, 'Spectacle à la Médiathèque', 'Spectacle devant 50 personnes', 'Médiathèque François Rabelais, Aulnoy-Lez-Valenciennes', '2026-04-10 18:00:00', 1, '2026-04-15 13:24:40', '2026-04-15 13:24:40', NULL, NULL, '8ème Art'),
(13, 'Salon du livre d\'Aulnoy', 'Nous avons participé au salon du livre d\'Aulnoy et avons pu performer sur la scène des Nymphéas.', 'Espace culturel Les Nymphéas', '2026-02-14 10:00:00', 1, '2026-04-15 13:29:10', '2026-04-15 13:29:10', NULL, NULL, NULL),
(14, 'Printemps des Poètes 2026', 'es Têtes Nivoles étaient invitées à célébrer LA  LIBERTÉ ce samedi à Le Quesnoy, dans le cadre du Printemps des Poètes 2026.!\n🔥 LIBERTÉ martyrisée\n🔥 LIBERTÉ retrouvée \n🔥 LIBERTÉ éternelle \nMusique, chant choral et poésie....un cocktail puissant qui nous a fait passer par toutes les émotions. ', 'La Mairie de Le Quesnoy', '2026-03-21 18:00:00', 1, '2026-04-15 13:32:55', '2026-04-15 13:32:55', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `event_images`
--

DROP TABLE IF EXISTS `event_images`;
CREATE TABLE IF NOT EXISTS `event_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_event_images_event` (`event_id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `event_images`
--

INSERT INTO `event_images` (`id`, `event_id`, `url`, `alt_text`, `created_at`) VALUES
(13, 1, '/uploads/events/events_69de2208b06cb3.59308429.jpg', NULL, '2026-04-14 11:16:25'),
(12, 1, '/uploads/events/events_69de21ff4ddc45.41766143.jpg', NULL, '2026-04-14 11:16:25'),
(44, 14, '/uploads/events/events_69df9383c36c39.50324868.jpg', NULL, '2026-04-15 13:32:55'),
(38, 14, '/uploads/events/events_69df9362052b24.86024070.jpg', NULL, '2026-04-15 13:32:55'),
(39, 14, '/uploads/events/events_69df936719f3d5.23625694.jpg', NULL, '2026-04-15 13:32:55'),
(40, 14, '/uploads/events/events_69df936d0990d2.20611642.jpg', NULL, '2026-04-15 13:32:55'),
(41, 14, '/uploads/events/events_69df9371d46df6.61300020.jpg', NULL, '2026-04-15 13:32:55'),
(42, 14, '/uploads/events/events_69df937629e4d1.40829370.jpg', NULL, '2026-04-15 13:32:55'),
(43, 14, '/uploads/events/events_69df937e48ee45.96595248.jpg', NULL, '2026-04-15 13:32:55'),
(35, 13, '/uploads/events/events_69df929b9041a9.68931164.jpg', NULL, '2026-04-15 13:29:10'),
(36, 13, '/uploads/events/events_69df92a0db5583.61883383.jpg', NULL, '2026-04-15 13:29:10'),
(37, 13, '/uploads/events/events_69df92a59ec324.47547523.jpg', NULL, '2026-04-15 13:29:10'),
(30, 12, '/uploads/events/events_69df9177e0bbf3.99358064.jpg', NULL, '2026-04-15 13:24:40'),
(31, 12, '/uploads/events/events_69df917de42935.21287116.jpg', NULL, '2026-04-15 13:24:40'),
(32, 12, '/uploads/events/events_69df9184687b25.42014087.jpg', NULL, '2026-04-15 13:24:40'),
(33, 12, '/uploads/events/events_69df918c85d181.62280928.jpg', NULL, '2026-04-15 13:24:40'),
(34, 12, '/uploads/events/events_69df91919499a1.95702801.jpg', NULL, '2026-04-15 13:24:40');

-- --------------------------------------------------------

--
-- Structure de la table `hero`
--

DROP TABLE IF EXISTS `hero`;
CREATE TABLE IF NOT EXISTS `hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hero`
--

INSERT INTO `hero` (`id`, `title`, `subtitle`, `is_active`, `created_at`) VALUES
(1, 'L’art est une maison habitée ', '- Mickaël Crépin, « Tâche d\'encre »', 1, '2026-04-15 09:02:43');

-- --------------------------------------------------------

--
-- Structure de la table `hero_images`
--

DROP TABLE IF EXISTS `hero_images`;
CREATE TABLE IF NOT EXISTS `hero_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_id` int NOT NULL,
  `url` text COLLATE utf8mb4_general_ci NOT NULL,
  `position` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hero_id` (`hero_id`)
) ENGINE=MyISAM AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hero_images`
--

INSERT INTO `hero_images` (`id`, `hero_id`, `url`, `position`) VALUES
(70, 1, '/uploads/heros/heros_69df99770c7fd6.39720393.jpg', 4),
(69, 1, '/uploads/heros/heros_69df99721436f3.54291325.jpg', 3),
(68, 1, '/uploads/heros/heros_69df5f79393d54.23844243.jpg', 3),
(66, 1, '/uploads/heros/heros_69df991bd46fc8.33900253.jpg', 1),
(67, 1, '/uploads/heros/heros_69df9923811f61.91666989.jpg', 2);

-- --------------------------------------------------------

--
-- Structure de la table `members`
--

DROP TABLE IF EXISTS `members`;
CREATE TABLE IF NOT EXISTS `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `photo` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `members`
--

INSERT INTO `members` (`id`, `name`, `role`, `bio`, `photo`, `sort_order`, `created_at`) VALUES
(1, 'Stéphanie', 'Lectrice', 'Passionnée de lettres et de musique, Stéphanie est la trésorière et lectricede la Compagnie. Elle assure l\'envers logistique et financier de la troupe avec autant d\'ardeur qu\'elle porte les mots à la lumière sur scène — une femme de chiffres et de lettres, à parts égales.', '/uploads/members/members_69df844b68fbb1.49138864.jpg', 4, '2026-04-13 09:40:47'),
(2, 'Mickaël Crépin', 'Auteur & Lecteur', 'Enseignant et poète du bassin valenciennois. Mickaël Crépin écrit depuis l\'enfance, nourri par Hugo, Balzac et Zola. Son recueil \"De Boue et de Vent\" — publié en août 2024 après douze ans de gestation — rassemble 68 poèmes lyriques, engagés, mystiques. Une réflexion sur la condition humaine, portée à la scène par les Têtes Nivoles.', '/uploads/members/members_69df827c455b51.69963161.jpg', 2, '2026-04-13 09:40:47'),
(3, 'Christophe Laueur', 'Compositeur', 'Musicien autodidacte, Christophe compose des univers sonores pour les textes de la compagnie. Ses créations fusionnent musique et poésie dans les spectacles des Têtes Nivoles.', '/uploads/members/members_69df83b9062a70.51130877.jpg', 1, '2026-04-13 09:40:47'),
(4, 'Magali', 'Lectrice & Comédienne', 'Comédienne des Attrape-Rêves et lectrice des Têtes Nivoles, Magali allie aisance naturelle et conviction sur scène. Formée au Cours Florent, pratiquante de chant choral depuis dix ans, elle serait le personnage central du  prochain spectacle \"Huitième Art\" prévu en 2026.\n', '/uploads/members/members_69df84a4d6d173.81911630.jpg', 5, '2026-04-13 09:40:47'),
(5, 'Séverine Guillon', 'Régisseuse', 'Lectrice acharnée et sportive de haut niveau, Séverine est la régisseuse techniquede la Compagnie. Son, lumières, ambiances sonores : elle orchestre l\'envers du décoravec la même rigueur qu\'elle met dans ses courses, sa boxe française et — depuis peu — sa pole dance.\n', '/uploads/members/members_69df8402988501.34441216.jpg', 3, '2026-04-13 09:40:47'),
(6, 'Christophe', 'Lecteur & Comédien', 'Auteur et metteur en scène, Christophe imagine des formes scéniques mêlant poésie, théâtre et musique. Il participe aux lectures musicales de la Compagnie des Têtes Nivoles.', '/uploads/members/members_69df8565b66f25.41190117.jpg', 6, '2026-04-13 09:40:47'),
(7, 'Myriam', 'Narratrice', 'Narratrice des spectacles, Myriam guide le public avec une voix posée et sensible. Elle donne vie aux textes des lectures musicales des Têtes Nivoles.', '/uploads/members/members_69df859cea8c61.43615821.jpg', 7, '2026-04-13 09:40:47'),
(10, 'Greg', 'Lecteur & Photographe', 'Photographe et cofondateur de la Compagnie des Têtes Nivoles, Greg construit l’identité visuelle de la troupe à travers ses images et affiches. Ancien musicien, il développe un regard sensible sur les paysages et les ambiances des spectacles.', '/uploads/members/members_69df85cfb06ff9.59361505.jpg', 0, '2026-04-15 12:34:24'),
(11, 'Charlotte', 'Lectrice', 'Fondatrice de la Compagnie des Têtes Nivoles, Charlotte porte les lectures musicales et les créations de la troupe. Professeure passionnée de théâtre, elle développe depuis plus de vingt ans des projets mêlant scène, littérature et transmission.', '/uploads/members/members_69df8646d36a99.71459903.jpg', 0, '2026-04-15 12:36:23'),
(12, 'Marine', 'Artiste', 'Artiste plasticienne, Marine explore le dessin et la peinture autour du corps et de l’émotion. Étudiante en arts plastiques à Valenciennes, elle crée aujourd’hui des illustrations pour la Compagnie des Têtes Nivoles.', '/uploads/members/members_69df86a3f026e1.31160991.jpg', 0, '2026-04-15 12:37:57');

-- --------------------------------------------------------

--
-- Structure de la table `spectacles`
--

DROP TABLE IF EXISTS `spectacles`;
CREATE TABLE IF NOT EXISTS `spectacles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `date` date DEFAULT NULL,
  `location` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
