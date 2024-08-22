export const adminMenu = [
  {
    // quản lí người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
      {
        name: "menu.admin.crud",
        link: "/system/crud-user",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
    ],
  },
  {
    // quản lí phòng khám
    name: "menu.admin.clinics",
    menus: [
      {
        name: "menu.admin.manage-clinics",
        link: "/system/manage-clinics",
      },
    ],
  },
  {
    // quản lí phòng khám
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    // quản lí phòng khám
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
