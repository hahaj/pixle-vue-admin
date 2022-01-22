import fixTooltip from "./index";

export default{
    install:Vue=>{
        Vue.directive('fixtooltip',fixTooltip)
    }
}