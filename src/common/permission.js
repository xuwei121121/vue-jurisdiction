import Vue from "vue";
import router from "@/router/index.js";
//创建全局自定义指令
Vue.directive('permission', {
  inserted: function (el, binding) {
    const action = binding.value.action
    // console.log(action);
    //当前路由的信息
    // console.log(router.currentRoute);
    const currentRights = router.currentRoute.meta.right//通过meta元信息来拿到的
    // console.log(currentRights);
    if (currentRights) {
      if (currentRights.indexOf(action) === -1) {
        //第一种
        // el.disabled = true
        // el.classList.add('is-disabled')
        //第二种
        el.remove()
        //第三种
        // console.log(el.parentNode);
        // el.parentNode.removeChild(el)
        //第四种
        // el.style.display = 'none'
        //第五种

      }
    }
  }
})