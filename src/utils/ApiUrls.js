// ROUTE NAME FOR SERVER APIS

const ApiUrls = {
  // AUTHENTICATION
  LOGIN: "admin/login",
  LOGOUT: "",

  // USERS
  CREATE_USER: "admin/employee/add",
  EDIT_USER: "admin/employee/edit",
  DELETE_USER: "admin/employee/delete/",
  BLOCK_USER: "admin/employee/blocked/  ",
  GET_ALL_USER: "admin/employee/all",
  GET_ALL_DASHBOARD_USER: "admin/dashboard/employee/all",
  GET_ALL_DASHBOARD_USER_LEADS: "admin/dashboard/allocatedLeads/",

  USER_DATA_PAGINATION: "admin/employee/all?page=",

  // PROJECT CATEGORIES
  CREATE_PROJECT_CATEGORY: "admin/projectCategory/add",
  GET_ALL_PROJECT_CATEGORIES: "admin/projectCategory/all",
  GET_DELETED_PROJECT_CATEGORIES: "admin/projectCategory/delete/",
  POST_All_EDITED_CATEGORIES: "admin/projectCategory/edit ",

  // INVENTORIES
  CREATE_PROJECT: "admin/project/add",
  EDIT_PROJECT: "admin/project/edit",
  DELETE_PROJECT: "admin/project/delete/",

  GET_ALL_PROJECTS: "admin/project/all",
  GET_SINGLE_PROECT_INVENTORIES: "admin/inventory/all",
  POST_All_EDITED_INVENTORIES: "admin/inventory/edit",
  GET_DELETED_INVENTORIES: "admin/inventory/delete/",

  //   VIEWABLE
  ASSIGN_VIEWABLE_INVETORIES: "",
  GET_USER_VIEWABLE_INVENTORIES: "employee/inventory/all/",
  GET_ALL_VIEWABLE_INVENTORIES: "admin/viewable/getProjects",
  GET_ALL_EMPLOYEES: "admin/viewable/getEmployees",
  POST_ALL_SELECTED_EMPLOYEES_AND_INVENTORY: "admin/viewable/add ",

  // LEADS
  CREATE_LEAD: "admin/lead/add",
  EDIT_LEAD: "admin/lead/edit",
  DELETE_LEAD: "",
  GET_ALL_LEADS: "admin/lead/all",
  GET_USER_LEADS: "employee/lead/all/",

  // LEAD ALLOCATION
  GET_ALL_ALLOCATE_OR_RE_ALLOCATE_LEADS: "admin/leadAllocation/all",
  ASSIGN_LEAD_TO_USER: "leadAllocation/assign",
  UPDATE_LEAD_TO_USER: "admin/leadAllocation/assign",

  //   DASHBOARD

  // Interest
  GET_ALL_INTEREST: "admin/interest/all",
  EDIT_INTEREST: "",
  DELETE_INTEREST: "",
  ADD_INTEREST: "admin/interest/add",
};

export default ApiUrls;
