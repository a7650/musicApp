import Vue from 'vue'
import Router from 'vue-router'
import rank from 'components/rank/rank'
import singer from 'components/singer/singer'
import recommend from 'components/recommend/recommend'
import search from 'components/search/search'
import singerDetail from 'components/singer-detail/singer-detail'
import discDetail from 'components/disc-detail/disc-detail'
Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path:'/rank',
      component:rank
    },
    {
      path:'/singer',
      component:singer,
      children:[
        {
          name:'singerDetail',
          path:':id',
          component:singerDetail
        }
      ]
    },
    {
      path:'/search',
      component:search
    },
    {
      path:'/recommend',
      component:recommend,
      children:[
        {
          name:'discDetail',
          path:':id',
          component:discDetail
        }
      ]
    }
    
  ]
})
