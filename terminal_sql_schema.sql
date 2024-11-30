-- DB Schema for Terminal Web
-- Created by Kodspider Technologies
-- Author: sgr1806-20

DROP TABLE IF EXISTS `commands`;
CREATE TABLE IF NOT EXISTS `commands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `command` varchar(20) NOT NULL,
  `description` varchar(200) NOT NULL,
  `output` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for table `commands`
--

INSERT INTO `commands` (`id`, `command`, `description`, `output`) VALUES
(1, 'help', 'List available commands and their descriptions.', 'A list of available commands and their descriptions.'),
(2, 'about', 'Learn about this project.', 'This is a terminal-based website project.'),
(3, 'contact', 'Get in touch with the developer.', 'You can contact us via email at [your email address].'),
(4, 'version', 'Check the current version of this website.', 'Terminal Web Version: 1.02.01\nThis website is open-source and available on GitHub: https://github.com/sgr1806-20/terminal-web\nMIT License'),
(5, 'projects', 'Explore projects developed by us.', 'We have worked on various projects, but we cannot disclose any information about them due to confidentiality agreements.'),
(6, 'services', 'Discover services offered by us.', 'We offer a range of services, but we cannot disclose any information about them due to confidentiality agreements.'),
(7, 'team', 'Meet the team.', 'We are a team of experienced developers, designers, and project managers, but we cannot disclose any information about our team members due to confidentiality agreements.'),
(8, 'testimonials', 'Read testimonials from our clients.', 'We have received positive feedback from our clients, but we cannot disclose any testimonials due to confidentiality agreements.'),
(9, 'terms', 'Read our terms of service.', 'Our terms of service are available upon request.'),
(10, 'privacy', 'View our privacy policy.', 'Our privacy policy is available upon request.');

-- --------------------------------------------------------

--
-- Table structure for table `query_box`
--

DROP TABLE IF EXISTS `query_box`;
CREATE TABLE IF NOT EXISTS `query_box` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `query_count` int DEFAULT '1',
  `ip_address` varchar(255) NOT NULL,
  `operating_system` varchar(255) NOT NULL,
  `browser` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;