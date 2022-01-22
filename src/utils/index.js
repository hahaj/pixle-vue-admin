function checkPhone(number) {
  //验证手机号是否正确
  if (
    !/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(
      number
    )
  ) {
    console.log("手机号码有误，请重填");
    return false;
  } else {
    return true;
  }
}
//转意符换成普通字符
function escape2Html(str) {
  var arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
    return arrEntities[t];
  });
}

//深拷贝数据
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj)) || "";
}
//处理富文本图片和p标签间距问题  
function modifyRichText(description) {
	//修改富文本内容增加图片显示模式
	var regex = new RegExp('<img', 'gi');
	description = description.replace( regex, "<img style='max-width:100%;'");
	regex = new RegExp('<p', 'gi');
	description = description.replace( regex, "<p style='max-width:100%;margin:0px;padding:0px;' ");
	//console.log(description);
	return description
}


//文件下载
function downloadFile(url, filename) {
  if (!url) return;
  let link = document.createElement("a"); //创建a标签
  link.style.display = "none";
  link.href = url; //文件下载地址
  link.setAttribute("download", filename); //设置下载属性 以及文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//导出文件 that:vue对象this,url接口地址，filename:'下载下来文件名包含格式例如：物品清单.xls'
function exportFile(that, url, filename,data={},method='post',success=()=>{},fail=()=>{}) {
  that
    .$axios({
      responseType: "blob",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      method,
      url,
      params:data
    })
    .then((res) => {
      if (res?.data) {
        let blob = new Blob([res.data]);
        let url2 = window.URL.createObjectURL(blob);
        downloadFile(url2, filename);
        success()
      }
    }).catch(err=>{
      fail(err)
    });
}

//导入文件 success//成功回调函数 fail失败回调
function importFile(that,url,success=()=>{},fail=()=>{}){
  let input=document.createElement("input");
  input.setAttribute('type','file');
  input.setAttribute('accept','*');
  input.style.display="none";
  input.addEventListener('change',()=>{
     if(input.files&&input.files.length>0){
      uploadFile(that,url,input.files[0],success,fail)
     }
  })
  document.body.appendChild(input);
   input.click();
   document.body.removeChild(input);
}

//上传文件
function uploadFile(that, url, file,success,fail) {
  let formData = new FormData();
  formData.append("file", file);
  let url2 = process.env.VUE_APP_BASE_API + url
  let config={headers: {
    "Content-Type": "multipart/form-data",
  }}
  that.$axios.post(url2,formData,config).then(res=>{
    success(res)
  }).catch(err=>{
    fail(err)
  })
}

export default {
  checkPhone,
  escape2Html,
  deepClone,
  downloadFile,
  exportFile,
  uploadFile,
  importFile,
  modifyRichText
};
