CREATE DATABASE Qlik;
USE Qlik;

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
 	`ID` int(11) NOT NULL AUTO_INCREMENT,
  	`Username` varchar(255) NOT NULL,
  	PRIMARY KEY (`ID`),
    UNIQUE KEY `Username` (`Username`)
);

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
	`ID` int(11) NOT NULL,
	`MessageID` int(11) NOT NULL AUTO_INCREMENT,
	`Subject` varchar(255) NOT NULL,
	`Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`Content` text NOT NULL,
    `Palindrome` tinyint(1) NOT NULL DEFAULT 0,
	PRIMARY KEY (`MessageID`),
	FOREIGN KEY (`ID`) REFERENCES `Users` (`ID`)
);