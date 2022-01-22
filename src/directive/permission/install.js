import permission from "./index";

export default{
    install:Vue=>{
        Vue.directive('permission',permission)
    }
}