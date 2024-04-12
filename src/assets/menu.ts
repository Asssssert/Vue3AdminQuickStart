const menu = [
  {
    id: 1,
    icon: "",
    title: "主页",
    path: "index",
    children: [{ id: 2, icon: "", title: "大屏", path: "/home/index" }],
  },
  {
    id: 5,
    icon: "",
    title: "系统监控",
    path: "monitor",
    children: [
      { id: 6, icon: "", title: "在线用户", path: "/home/onlineUser" },
      { id: 7, icon: "", title: "错误日志", path: "/home/errorLog" },
      { id: 8, icon: "", title: "操作日志", path: "/home/operationLog" },
    ],
  },
  {
    id: 9,
    icon: "",
    title: "系统设置",
    path: "setting",
    children: [
      { id: 10, icon: "", title: "用户列表", path: "/home/userList" },
      { id: 11, icon: "", title: "角色列表", path: "/home/roleList" },
      { id: 12, icon: "", title: "权限列表", path: "/home/permissionList" },
      { id: 13, icon: "", title: "菜单列表", path: "/home/menuList" },
    ],
  },
  {
    id: 14,
    icon: "",
    title: "系统维护",
    path: "operation",
    children: [
      { id: 15, icon: "", title: "数据管理", path: "/home/dbList" },
      { id: 16, icon: "", title: "文件管理", path: "/home/fileList" },
    ],
  },
];

export const getMenu = () => menu;
