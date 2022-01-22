//隐藏没权限的按钮v-permission
import store from '@/store'
export default{
    // eslint-disable-next-line no-unused-vars
    inserted(el,binding){
        if( typeof(binding.value)==='string'&&binding.value.length>0&&!store.getters.permission_btns.includes(binding.value)){
            el.parentElement.removeChild(el)
        }
    }
    
   
}
