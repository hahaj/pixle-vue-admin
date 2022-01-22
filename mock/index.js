const Mock = require('mockjs');
const mockFiles = require.context('./modules', false, /\.js$/);
let mocks = [];

mockFiles.keys().forEach(key => {
  mocks.push(...mockFiles(key))
})

mocks.forEach(item => {
  Mock.mock(item.url, item.type, item.response)
})