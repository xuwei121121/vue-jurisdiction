// 使用 Mock
const Mock = require('mockjs')
require('./my-radom')
const Random = Mock.Random
Mock.setup({
  timeout: '500-1000'
})

const list = []

for (let i = 0; i < 20; i++) {
  list.push({
    id: i + 1,
    date: Random.date(),
    name: Random.cname(),
    address: Random.address(),
    likes: Random.likes()
  })
}

const users = [{
  id: 1,
  username: 'normal',
  password: 'normal',
  token: 'abcdefghijklmnopqrstuvwxyz',
  navBar: {
    active: '0',
    list: [{
      name: "首页",
      subActive: '0',
      leftMenus: [{
        id: 1,
        title: '用户管理1',
        key: '/user',
        name: 'user',
        icon: 'el-icon-user-solid',
        rights: ['view', 'edit', 'delete']
      },
      {
        id: 2,
        title: '商品管理',
        key: '/product',
        name: 'product',
        icon: 'el-icon-s-goods',
        children: [{
          id: 21,
          title: '品类管理',
          key: '/category',
          name: 'category',
          icon: 'bars',
          rights: ['view', 'edit', 'add', 'delete']
        },
        {
          id: 22,
          title: '商品生产',
          key: '/product',
          name: 'product',
          icon: 'tool',
          rights: ['view', 'edit', 'add', 'delete']
        }
        ]
      },
      {
        id: 4,
        title: '图形图表',
        key: '/charts',
        name: 'charts',
        icon: 'el-icon-s-platform',
        children: [{
          id: 41,
          title: '柱线图',
          key: '/charts/bar',
          name: 'bar',
          icon: 'el-icon-s-data',
          rights: ['view', 'edit', 'add', 'delete']
        },
        {
          id: 42,
          title: '折线图',
          key: '/charts/line',
          name: 'line',
          icon: 'el-icon-s-marketing',
          rights: ['view', 'edit', 'add', 'delete']
        },
        {
          id: 43,
          title: '饼图',
          key: '/charts/pie',
          name: 'pie',
          icon: 'el-icon-s-help',
          rights: ['view', 'edit', 'add', 'delete']
        },
        ]
      }
      ]
    },
    {
      name: "商品",
      subActive: '0',
      leftMenus: [{
        id: 1,
        title: '用户管理2',
        key: '/user2',
        name: 'user2',
        icon: 'el-icon-user-solid',
        rights: ['view', 'edit', 'add', 'delete']
      }]
    },
    {
      name: "订单"
    },
    {
      name: "会员"
    },
    {
      name: "设置"
    },
    ]
  }

},
{
  id: 2,
  username: 'admin',
  password: 'admin',
  token: 'abcdefghijklmnopqrstuvwxyz'.split('').reverse().join(''),
  navBar: {
    active: '0',
    list: [{
      name: "首页",
      subActive: '0',
      leftMenus: [{
        id: 1,
        title: '用户管理',
        key: '/user',
        name: 'user',
        icon: 'el-icon-user-solid',
        rights: ['view', 'edit', 'add', 'delete']
      },
      {
        id: 2,
        title: '商品管理',
        key: '/products',
        name: 'products',
        icon: 'el-icon-s-goods',
        children: [{
          id: 21,
          title: '品类管理',
          key: '/category',
          name: 'category',
          icon: 'bars',
          rights: ['view', 'edit', 'add', 'delete']
        },
        {
          id: 22,
          title: '商品生产',
          key: '/product',
          name: 'product',
          icon: 'tool',
          rights: ['view', 'edit', 'add', 'delete']
        }
        ]
      },
      {
        id: 3,
        title: '角色管理',
        key: '/role',
        name: 'role',
        icon: 'el-icon-s-custom',
        rights: ['view', 'edit', 'delete']
      },
      {
        id: 4,
        title: '图形图表',
        key: '/charts',
        name: 'charts',
        icon: 'el-icon-s-platform',
        children: [{
          id: 41,
          title: '柱线图',
          key: '/charts/bar',
          name: 'bar',
          icon: 'el-icon-s-data',
          rights: ['view', 'edit', 'add', 'delete']
        },
        {
          id: 42,
          title: '折线图',
          key: '/charts/line',
          name: 'line',
          icon: 'el-icon-s-marketing',
          rights: ['view', 'edit', 'add', 'delete']
        },
        {
          id: 43,
          title: '饼图',
          key: '/charts/pie',
          name: 'pie',
          icon: 'el-icon-s-help',
          rights: ['view', 'edit', 'add', 'delete']
        },
        ]
      }
      ]
    },
    {
      name: "商品",
      subActive: '0',
      leftMenus: [{
        id: 1,
        title: '用户管理2',
        key: '/user2',
        name: 'user2',
        icon: 'el-icon-user-solid',
        rights: ['view', 'edit', 'add', 'delete']
      }]
    },
    {
      name: "订单",
      subActive: '0',
      leftMenus: [{
        id: 32,
        title: '订单管理',
        key: '/dingg',
        name: 'dingg',
        icon: 'el-icon-user-solid',
        rights: ['view', 'edit', 'add', 'delete']
      },
      {
        id: 34,
        title: '订单统计',
        name: 'ding',
        icon: 'el-icon-user-solid',
        children: [{
          id: 35,
          title: '订单汇总',
          key: '/ding/hui',
          name: 'dinghui',
          icon: 'el-icon-s-data',
          rights: ['view', 'edit', 'add', 'delete']
        },]
      }


      ]
    },
    {
      name: "会员"
    },
    {
      name: "设置"
    },
    ]
  }
}
]
// 获取列表
Mock.mock('/list', 'get', options => {
  const {
    current
  } = JSON.parse(options.body)
  return list.slice(((current - 1) * 10), current * 10)
})

// 总数
Mock.mock('/list/total', 'get', () => {
  return list.length
})

// 查询
Mock.mock('/list/value', 'get', options => {
  const {
    value
  } = JSON.parse(options.body)
  const _list = list.filter(item => {
    if (item.name.includes(value) || item.address.includes(value) || item.likes.includes(value)) {
      return true
    }
    return false
  })
  return {
    list: _list,
    total: _list.length
  }
})

// 添加
Mock.mock('/list/add', 'post', options => {

  const {
    rowData
  } = JSON.parse(options.body)
  console.log(rowData);
  rowData.id = list[list.length - 1].id++
  console.log(rowData.id);
  rowData.date = new Date().toLocaleDateString().replace(/\//g, '-')
  list.unshift(rowData)
  return rowData
})

// 修改
Mock.mock('/list/update', 'put', options => {
  const {
    rowData
  } = JSON.parse(options.body)
  let _rowData = {}
  list.forEach((item, idx) => {
    if (item.id === rowData.id) {
      _rowData = rowData
      list[idx] = rowData
    }
  })
  return _rowData
})

// 删除
Mock.mock('/list/delete', 'delete', options => {
  const {
    id
  } = JSON.parse(options.body)
  const index = list.findIndex(item => item.id === id)
  const item = index > 0 ? list[index] : {}
  list.splice(index, 1)
  return item
})

// 用户登录
Mock.mock('/login', 'post', options => {
  const {
    username,
    password
  } = JSON.parse(options.body)
  const user = users.find(item => {
    return item.username === username && item.password === password
  })
  console.log(user);
  return user
})
