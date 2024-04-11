const menu=[
    {id:1, icon:"",title:"主页",path:"index",children:[
        {id:2, icon:"",title:"大屏",path:"/home/index"},
    ]},
    {id:5,icon:"",title:"设置",path:"setting",children:[
        {id:6, icon:"",title:"用户列表",path:"/home/userList"},
        {id:7, icon:"",title:"角色列表",path:"/home/roleList"},
        {id:8, icon:"",title:"权限列表",path:"/home/permissionList"},
        {id:9, icon:"",title:"菜单列表",path:"/home/menuList"},

    ]}
]

export const getMenu=()=>menu;