// ROUTE NAME FOR SERVER APIS

const ApiUrls = {
  // AUTHENTICATION
  LOGIN: "admin/login",
  LOGOUT: "",

  // USERS
  CREATE_USER: "",
  EDIT_USER: "",
  DELETE_USER: "",
  BLOCK_USER: "",
  GET_ALL_USER: "admin/employee/all",

  // PROJECT CATEGORIES
  CREATE_PROJECT_CATEGORY: "admin/projectCategory/add",
  GET_ALL_PROJECT_CATEGORIES: "admin/projectCategory/all",

  // INVENTORIES
  CREATE_PROJECT: "admin/project/add",
  EDIT_PROJECT: "",
  DELETE_PROJECT: "",
  GET_ALL_PROJECTS: "admin/project/all",
  GET_SINGLE_PROECT_INVENTORIES: "admin/inventory/all",

  //   VIEWABLE
  ASSIGN_VIEWABLE_INVETORIES: "",
  GET_ALL_VIEWABLE_INVENTORIES: "",
  GET_USER_VIEWABLE_INVENTORIES: "employee/inventory/all/",

  // LEADS
  CREATE_LEAD: "admin/lead/add",
  EDIT_LEAD: "",
  DELETE_LEAD: "",
  GET_ALL_LEADS: "admin/lead/all",
  GET_USER_LEADS: "employee/lead/all/",

  // LEAD ALLOCATION
  ALLOCATE_OR_RE_ALLOCATE_LEAD: "",

  //   DASHBOARD
};

export default ApiUrls;
