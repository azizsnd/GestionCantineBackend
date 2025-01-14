-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 14 jan. 2025 à 05:19
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestioncantine`
--

-- --------------------------------------------------------

--
-- Structure de la table `dish`
--

CREATE TABLE `dish` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `checked` tinyint(4) NOT NULL DEFAULT 0,
  `imageUrl` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `dish`
--

INSERT INTO `dish` (`id`, `name`, `quantity`, `checked`, `imageUrl`, `type`) VALUES
(1, 'Dish 1', 55, 1, '/images/plat.png', 'Main Course'),
(2, 'Dish 2', 10, 1, '/images/plat.png', 'Main Course'),
(3, 'Dish 2', 10, 1, '/images/plat.png', 'Main Course'),
(4, 'Dish 2', 10, 1, '/images/plat.png', 'Main Course'),
(5, 'Dish 4', 50, 1, '/images/plat.png', 'Main Course'),
(6, 'Dish 7', 50, 1, '/images/plat.png', 'Main Course'),
(7, 'Dish Appetizers', 50, 1, '/images/plat.png', 'Appetizers'),
(8, 'Dish Desserts', 50, 1, '/images/plat.png', 'Desserts');

-- --------------------------------------------------------

--
-- Structure de la table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `nbStars` int(11) NOT NULL,
  `feedback` longtext NOT NULL,
  `idDish` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rating`
--

INSERT INTO `rating` (`id`, `nbStars`, `feedback`, `idDish`, `idUser`) VALUES
(2, 1, 'Excellent dish!', 2, 1),
(3, 1, 'Excellent dish!', 2, 1),
(6, 5, 'This dish was absolutely fantastic! The flavors were perfectly balanced, and the presentation was stunning. I especially loved the combination of spices and the tenderness of the meat. The portion size was generous, and the service was impeccable. I will definitely be coming back for more!', 4, 1),
(7, 4, 'Wow, this dish was a flavor explosion! Every bite was a delight. The ingredients were fresh, and the seasoning was spot on. I loved how the dish was both hearty and light at the same time. Highly recommend!', 2, 2),
(8, 5, 'The dish was cooked to perfection! The meat was tender and juicy, and the vegetables were crisp and flavorful. The sauce complemented everything beautifully. A truly satisfying meal!', 2, 1),
(9, 5, 'This is hands down the best dish I have ever had! The flavors were so rich and complex, and the presentation was like a work of art. I cannot wait to come back and try more from the menu!', 2, 2),
(10, 5, 'Incredible dish! The balance of flavors was perfect, and the portion size was just right. The dish was both comforting and exciting at the same time. I will definitely be recommending this to my friends!', 2, 1),
(11, 3, 'This dish was a masterpiece! The combination of textures and flavors was outstanding. Every bite was a new experience. The chef truly knows how to create a memorable meal!', 2, 2),
(12, 5, 'Absolutely delicious! The dish was bursting with flavor, and the presentation was beautiful. The ingredients were fresh and high-quality. I could not have asked for a better dining experience!', 2, 1),
(13, 5, 'This dish exceeded all my expectations! The flavors were bold and well-balanced, and the dish was cooked to perfection. I loved every bite and will definitely be coming back for more!', 2, 2),
(14, 5, 'A truly exceptional dish! The flavors were rich and satisfying, and the presentation was elegant. The dish was a perfect blend of tradition and innovation. I cannot wait to try more from the menu!', 2, 1),
(15, 5, 'This dish was a culinary delight! The flavors were vibrant and well-balanced, and the dish was beautifully presented. The portion size was generous, and the service was excellent. I will definitely be returning!', 2, 2),
(16, 3, 'good', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `userName`, `password`, `role`) VALUES
(1, 'Ahmed Ahmed', '$2b$10$GAFE6KTM6gWOFbBsLUUPuuTouTN3H8vLR442aRasEqTHJAVLgIIcC', 'admin'),
(2, 'aziz', '$2b$10$5iIdtfzPittjHW2Uujvhv.3.Gac5aRxJLWmz0wVcYSXIdSRDFRfIW', 'student');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `dish`
--
ALTER TABLE `dish`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e7d82e81fca555b2e13f8e2d91d` (`idDish`),
  ADD KEY `FK_7be8f8900f3592ea7c1602f224a` (`idUser`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `dish`
--
ALTER TABLE `dish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `FK_7be8f8900f3592ea7c1602f224a` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e7d82e81fca555b2e13f8e2d91d` FOREIGN KEY (`idDish`) REFERENCES `dish` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
