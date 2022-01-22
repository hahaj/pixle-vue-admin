//修复el-tooltip组件在点击弹出模态确认框关闭后不消失
export default{
    // eslint-disable-next-line no-unused-vars
    bind(el, binding) { 
        el.__vueSetTimeoutIndex__ = setTimeout(() => {
          el.removeAttribute('tabindex')
          clearTimeout(el.__vueSetTimeoutIndex__)
        }, 0)
  
      },
      unbind(el) {
        clearTimeout(el.__vueSetTimeoutIndex__)
      }
   
}