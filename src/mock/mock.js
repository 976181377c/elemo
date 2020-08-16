import Mock from 'mockjs';

const Random = Mock.Random;

const data = require('./data.json');
var seller = data.seller;
var goods = data.goods;
var ratings = data.ratings;

// mock需要给三个参数,url(与axios请求是传的url一致,我这个是本地启动的项目就直接用本地域名了)
// 请求类型: get post...其他看文档
// 数据处理函数,函数需要return数据
Mock.mock('/seller', 'get', () => {
  return seller;
});
Mock.mock('/goods', 'get', () => {
  return goods;
});
Mock.mock('/ratings', 'get', () => {
  return ratings;
});
