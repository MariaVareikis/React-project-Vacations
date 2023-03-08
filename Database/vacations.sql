-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2023 at 05:21 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(28, 25),
(26, 23),
(30, 18),
(26, 26),
(29, 28),
(26, 24);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `role` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `role`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
(26, 'Dennis', 'Rabinovich', 'dennis', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2),
(27, 'Maria', 'Vareikis', 'mariaVareikis', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 1),
(28, 'Inna', 'Vareikis', 'inna', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2),
(29, 'Bart ', 'Simpson', 'bart', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2),
(30, 'Michael', 'Vareikis', 'michael', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `destination` varchar(70) NOT NULL,
  `imageName` varchar(200) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `imageName`, `checkIn`, `checkOut`, `price`) VALUES
(18, 'Paris is a city unlike any other. It is overflowing with culture, history, and beauty. And while people travel to Paris to see the Louvre, climb the Eiffel Tower, or see Notre-Dame, the real magic is found in the streets. Here, the ins and outs of daily life play out — chic women on bikes pedal their children to school, artists post up in cafés with a notebook, and both young and old line up morning and evening for a fresh baguette from the neighborhood boulangerie. It is likely everything you imagined, and then a bit more — because while Paris is a city with a strong cultural identity, it also houses people from all over the world who add their own culture and customs into the mix. This is why a visit to Paris\' top sights is simply not enough — to truly get a sense of the city, take to the streets where the essence and enchantment of Paris is most felt.', 'Paris', '544cc6fc-862d-45fa-89de-010a0390db1a.jfif', '2023-01-23', '2023-01-31', 2000),
(19, 'The capital of the United Kingdom is a thriving multicultural metropolis. The contrast between the spectacular historic sights, the grind of a big city, and the lively cultural and foodie scene makes London an interesting and exciting destination. Wander through St. James park, visit Westminster Abbey, explore the streets of Shoreditch, and take a ride up the River Thames. London\'s incredible shopping, endless sights, friendly locals, and vibrant nightlife offer something for every kind of traveler.', 'London', 'c05dea16-04a0-4e54-b3a0-0cce7692345d.jpg', '2023-01-30', '2023-02-07', 3000),
(20, 'The Maldives is an ancient civilization. Scholars and historians estimate that the Maldives was populated over 2,500 years ago. The Maldivian people can trace their ancestors back to parts of India, the African continent, Southeast Asia, Arabia and other distant corners of the world. The Maldivians are descendents of the different races and ethnicities that crisscrossed the Indian ocean throughout the centuries.', 'Maldives', '3e63a186-2762-4b81-b5a5-385073c56fda.jpg', '2023-04-03', '2023-06-13', 5000),
(21, 'Prague, Czech Praha, city, capital of the Czech Republic. Lying at the heart of Europe, it is one of the continent’s finest cities and the major Czech economic and cultural centre. The city has a rich architectural heritage that reflects both the uncertain currents of history in Bohemia and an urban life extending back more than 1,000 years. Prague is famous for its cultural life. Wolfgang Amadeus Mozart lived there, and his Prague Symphony and Don Giovanni were first performed in the city. In addition, the lyric music of the great Czech composers Bedřich Smetana, Antonín Dvořák, and Leoš Janáček is commemorated each year in a spring music festival. The U kalicha (“At the Chalice”) beer parlour, which is still popular with local residents and tourists alike, provided the setting for the humorously antiauthoritarian activities of Schweik, immortalized by the novelist Jaroslav Hašek in The Good Soldier Schweik. The writings of Franz Kafka, dwelling in a different way on the dilemmas and predicaments of modern life, also seem indissolubly linked with life in this city. ', 'Prague', '150f3093-2ba8-4e4b-9f09-478fc5474622.jfif', '2023-02-07', '2023-02-15', 1500),
(22, 'Kuoni was founded in 1906[4] by the entrepreneur Alfred Kuoni in Zurich, Switzerland, where the firm has continued to be based.[1][5] Over time, Kuoni grew to be the biggest travel company in Switzerland.[6] During 1965, Kuoni established a base in the United Kingdom by purchasing Challis and Benson in London’s Bond Street;[7] over time, Kuoni became the leading longhaul tour operator in the British market.[8]  In 1966, Peter Diethelm established the Kuoni UK tour operation.[9] During 1970, Kuoni introduced the country\'s first charter flight to the Far East. In 1974, the company took over Houlders World Holidays[10] and relocated its tour operation to new headquarters in Dorking, Surrey, after which it launched a long-haul tour programme.[11] During 1980, Kuoni adopted a computerised reservations system, which the firm has credited with dramatically improving both the speed and flexibility of tailor-making its holidays.[12] In 1981, Kuoni introduced its first batch of summer holidays to Switzerland.', 'Kuoni', '13d71a6d-5d40-4812-a6d8-e794e8a23398.jpg', '2023-01-25', '2023-01-31', 1200),
(23, 'New York is the most ethnically diverse, religiously varied, commercially driven, famously congested, and, in the eyes of many, the most attractive urban centre in the country. No other city has contributed more images to the collective consciousness of Americans: Wall Street means finance, Broadway is synonymous with theatre, Fifth Avenue is automatically paired with shopping, Madison Avenue means the advertising industry, Greenwich Village connotes bohemian lifestyles, Seventh Avenue signifies fashion, Tammany Hall defines machine politics, and Harlem evokes images of the Jazz Age, African American aspirations, and slums. The word tenement brings to mind both the miseries of urban life and the upward mobility of striving immigrant masses. New York has more Jews than Tel Aviv, more Irish than Dublin, more Italians than Naples, and more Puerto Ricans than San Juan. Its symbol is the Statue of Liberty, but the metropolis is itself an icon, the arena in which Emma Lazarus’s “tempest-tost” people of every nation are transformed into Americans—and if they remain in the city, they become New Yorkers.', 'New York', '0d8ce2b9-38e7-4af5-9c36-b808a6a9da40.jfif', '2023-02-01', '2023-02-14', 4000),
(24, 'Rome, Italian Roma, historic city and capital of Roma provincia (province), of Lazio regione (region), and of the country of Italy. Rome is located in the central portion of the Italian peninsula, on the Tiber River about 15 miles (24 km) inland from the Tyrrhenian Sea. Once the capital of an ancient republic and empire whose armies and polity defined the Western world in antiquity and left seemingly indelible imprints thereafter, the spiritual and physical seat of the Roman Catholic Church, and the site of major pinnacles of artistic and intellectual achievement, Rome is the Eternal City, remaining today a political capital, a religious centre, and a memorial to the creative imagination of the past. ', 'Rome', 'e828ab1a-9a53-45aa-9e51-3189037dce33.jpg', '2023-09-19', '2023-10-10', 5000),
(25, 'Stockholm, capital and largest city of Sweden. Stockholm is located at the junction of Lake Mälar (Mälaren) and Salt Bay (Saltsjön), an arm of the Baltic Sea, opposite the Gulf of Finland. The city is built upon numerous islands as well as the mainland of Uppland and Södermanland. By virtue of its location, Stockholm is regarded as one of the most beautiful capital cities in the world.  Stockholm was first mentioned as a town in 1252 and was largely built by the Swedish ruler Birger Jarl. It grew rapidly as a result of a trade agreement made with the German city of Lübeck. This agreement ensured Lübeck merchants freedom from customs charges for their trade in Sweden, as well as the right to settle there. The city came to be officially regarded as the Swedish capital in 1436. After conflicts between the Danes and Swedes for many years, Stockholm was liberated from Danish rule by Gustav I Vasa in 1523.', 'Stockholm', 'aa6ca710-c55c-4892-a0a4-8456a35ae122.jpg', '2023-06-25', '2023-07-08', 3500),
(26, 'Norway, country of northern Europe that occupies the western half of the Scandinavian peninsula. Nearly half of the inhabitants of the country live in the far south, in the region around Oslo, the capital. About two-thirds of Norway is mountainous, and off its much-indented coastline lie, carved by deep glacial fjords, some 50,000 islands.Norway’s austere natural beauty has attracted visitors from all over the world. The country has also produced many important artists, among them composer Edvard Grieg, painter Edvard Munch, novelists Knut Hamsun and Sigrid Undset, and playwright Henrik Ibsen. Of his country and its ruminative people, Ibsen observed, “The magnificent, but severe, natural environment surrounding people up there in the north, the lonely, secluded life—the farms are miles apart—forces them to…become introspective and serious.…At home every other person is a philosopher!”', 'Norway', '4295a784-7f49-4162-a6ac-f246ee4f0423.jpg', '2023-05-01', '2023-06-11', 5997),
(27, 'Switzerland, federated country of central Europe. Switzerland’s administrative capital is Bern, while Lausanne serves as its judicial centre. Switzerland’s small size—its total area is about half that of Scotland—and its modest population give little indication of its international significance.  Switzerland Switzerland A landlocked country of towering mountains, deep Alpine lakes, grassy valleys dotted with neat farms and small villages, and thriving cities that blend the old and the new, Switzerland is the nexus of the diverse physical and cultural geography of western Europe, renowned for both its natural beauty and its way of life. Aspects of both have become bywords for the country, whose very name conjures images of the glacier-carved Alps beloved of writers, artists, photographers, and outdoor sports enthusiasts from around the world.', 'Switzerland', '6b456ead-0b4f-4140-ae11-63712e7bb683.jfif', '2023-06-20', '2023-06-30', 4000),
(28, 'Once called the “Queen of the Danube,” Budapest has long been the focal point of the nation and a lively cultural centre. The city straddles the Danube (Hungarian: Duna) River in the magnificent natural setting where the hills of western Hungary meet the plains stretching to the east and south. It consists of two parts, Buda and Pest, which are situated on opposite sides of the river and connected by a series of bridges.Budapest stood apart from the relatively drab capitals of the other Soviet-bloc countries; it maintained an impression of plenty, with smart shops, good restaurants, and other amenities. The dissolution of the Soviet bloc and Hungary’s transition away from socialism brought Budapest new opportunities for prosperity and an influx of Western tourists—along with the stresses of transition to a more Western-style economy. The city, including the banks of the Danube, the Buda Castle Quarter, and Andrássy Avenue, was designated a UNESCO World Heritage site in 1987.', 'Budapest', 'ba79eb2b-4f12-4e41-adf2-2f3c2df893af.jpg', '2023-09-26', '2023-10-03', 3500),
(29, 'Los Angeles, the heart of southern California, became a world-class city very recently. At the start of the 20th century it was considered merely “a large village.” This ascendancy is all the more remarkable considering that the city originally lacked some of the essential building blocks associated with cityhood, such as a natural harbour. Yet it overcame natural deficiencies and established itself as an important centre of commerce, agriculture, tourism, and industry. For more than a century it has been indelibly associated with a benign climate, extensive leisure, and outdoor recreation, as well as the special aura of celebrity associated with Hollywood. The lifestyle of Los Angeles residents (who are called Angelenos) relies on the automobile, idealizes the single-family dwelling, and favours informality. With notable exceptions, the skyline is primarily horizontal rather than vertical. Los Angeles is a place of extraordinary ethnic and racial diversity, owing largely to immigration, and, like other world cities, it reflects a growing gap between rich and poor.', 'Los Angeles', 'b52d6b34-7964-4ae6-b111-4a5eee1715e1.jfif', '2023-06-26', '2023-07-06', 2498),
(30, 'Alaska, constituent state of the United States of America. It was admitted to the union as the 49th state on January 3, 1959.  Alaska lies at the extreme northwest of the North American continent, and the Alaska Peninsula is the largest peninsula in the Western Hemisphere. Because the 180th meridian passes through the state’s Aleutian Islands, Alaska’s westernmost portion is in the Eastern Hemisphere. Thus, technically, Alaska is in both hemispheres.  Alaska is bounded by the Beaufort Sea and the Arctic Ocean to the north, Canada’s Yukon territory and British Columbia province to the east, the Gulf of Alaska and the Pacific Ocean to the south, the Bering Strait and the Bering Sea to the west, and the Chukchi Sea to the northwest. The capital is Juneau, which lies in the southeast, in the panhandle region.', 'Alaska', '158329ba-a509-4bf6-8dec-b9e437388490.jfif', '2023-12-19', '2023-12-31', 4999),
(31, 'Kyiv, also spelled Kiev, Kyyiv, or Russian Kiyev, chief city and capital of Ukraine. A port on the Dnieper (Dnipro) River and a large railroad junction, it is a city with an ancient and proud history. As the centre of Kyivan (Kievan) Rus, the first eastern Slavic state, 1,000 years ago, it acquired the title “Mother of Rus Cities.” It was severely damaged during World War II, but by the mid-1950s it had been restored, and in the second half of the 20th century it enjoyed a well-developed economic and cultural life. ', 'Kiev', 'b4bfdd19-9a2e-45d3-92e4-92ba804ecbc6.jfif', '2023-08-07', '2023-08-29', 1998);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
