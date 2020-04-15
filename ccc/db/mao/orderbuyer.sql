-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.8-MariaDB
-- PHP 版本： 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `triplec`
--

-- --------------------------------------------------------

--
-- 資料表結構 `orderbuyer`
--

CREATE TABLE `orderbuyer` (
  `orderId` varchar(20) NOT NULL COMMENT '訂單編號',
  `buyerName` varchar(20) NOT NULL COMMENT '購買人姓名',
  `buyerMobile` varchar(10) NOT NULL COMMENT '購買人電話',
  `discount` varchar(20) NOT NULL COMMENT '折扣金額',
  `shipcost` varchar(20) NOT NULL COMMENT '運費',
  `total` int(11) NOT NULL COMMENT '總計',
  `buyerAdress` varchar(99) NOT NULL COMMENT '購買人地址',
  `invoiceType` varchar(10) NOT NULL COMMENT '發票類別',
  `paymentType` varchar(20) NOT NULL COMMENT '付款方式',
  `taxNo` int(10) DEFAULT NULL COMMENT '統一編號',
  `shipping` varchar(20) NOT NULL COMMENT '運送方式',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `orderbuyer`
--

INSERT INTO `orderbuyer` (`orderId`, `buyerName`, `buyerMobile`, `discount`, `shipcost`, `total`, `buyerAdress`, `invoiceType`, `paymentType`, `taxNo`, `shipping`, `created_at`, `updated_at`) VALUES
('XLI856Y9I', '', '', '0', '100', 1300, '台北市大安區', 'personal-i', 'COD', 0, 'Seven-store', '2020-03-23 11:48:25', '2020-03-23 11:48:25'),
('BAWVCDE1F', '', '', '0', '100', 800, '台北市大安區', 'personal-i', 'COD', 0, 'Seven-store', '2020-03-23 11:51:37', '2020-03-23 11:51:37');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
