//默认只能输入数字
export default {
  bind(el, binding) {
    const input = el.querySelector('.el-input__inner') || el;
    input.onkeyup = ()=> {
      // v-input.num
      if (binding.modifiers.num) {//只能输入数字
         onlyNum(input);
         
      }
      //v-input.float
      else if(binding.modifiers.float){//数字+小数点
        onlyFloat(input)
      }
      //v-input.alp
      else if (binding.modifiers.alp) {//只能输入字母
        onlyAlp(input)
      }
      //v-input.num_alp
      else if(binding.modifiers.num_alp){//数字+字母
        onlyNumAlp(input)
      }
      input.dispatchEvent(new Event("input"));
    }

  },

}

function onlyNum(input) {
  input.value = input.value.replace(/\D+/g, '');
}
function onlyFloat(input){
  input.value = input.value.replace(/[^\d.]/g, "");
}
function onlyAlp(input) {
  input.value = input.value.replace(/[^A-Za-z]/g,'');
}
function onlyNumAlp(input){
  input.value = input.value.replace(/[^A-Za-z0-9]/g,'');
}
