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
// post请求,带参数,参数会在data中返回,会返回url,type,body三个参数,可以把data打印出来看看
Mock.mock('http://localhost:8081/test/cityInfo', 'post', (data) => {
  // 请求传过来的参数在body中,传回的是json字符串,需要转义一下
  const info = JSON.parse(data.body);
  return {
    img: Random.image('200x100', '#4A7BF7', info.name),
  };
});
