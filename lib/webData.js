'use strict';

function WebData() {};

WebData.productTypes = [
  { 'id': 0, 'name': 'Động Cơ' },
  { 'id': 1, 'name': 'Máy Xúc' },
  { 'id': 2, 'name': 'Chi Tiết Máy' },
  { 'id': 3, 'name': 'Phụ Tùng' },
  { 'id': 4, 'name': 'Thiết Bị' },
  
];

WebData.serviceTypes = [
  { 'id': 0, 'name': 'Sửa Chữa', 'shordDes': 'Sửa chữa chi tiết và máy công trình'},
  { 'id': 1, 'name': 'Gia Công', 'shordDes': 'Gia công những sản phẩm về cơ khí có độ chính xác cao, có tính bền'},
  { 'id': 2, 'name': 'Sản Xuất', 'shordDes': 'Chế tạo những cụm chi tiết trong máy thuỷ lực'},
  { 'id': 3, 'name': 'Lắp Đặt', 'shordDes': 'Tư vấn, chuyển giao công nghệ về chế tạo các cụm chi tiết thuỷ lực và cơ khí' },
];

WebData.training = { 'shordDes': 'asdasdasd axcv xcv zxdfg dfgr', 'fullDes': 'Để đáp ứng nhu cầu của xã hội đào tạo nghề theo 03 cấp trình độ, Khoa Cơ khí chế tạo đã từng bước nâng cao chất lượng đào tạo nguồn nhân lực tay nghề cao đáp ứng nhu cầu xã hội bằng cách tập trung đầu tư phát triển nhiều mặt: Đội ngũ giảng viên, xưởng thực tập, liên kết với doanh nghiệp, chế tạo các thiết bị dạy nghề, thực hiện các đề tài nghiên cứu khoa học. Khoa hiện nay có 05 xưởng thực hành: 02 xưởng tiện, 01 xưởng phay, bào, mài, 01 xưởng gia công CNC; 01 xưởng hàn được thiết kế đạt chuẩn xưởng công nghiệp và 02 phòng CAD/CAM/CNC. Lưu lượng học sinh trong khoa hiện nay khoảng 300 học sinh, sinh viên.' };

module.exports = WebData;