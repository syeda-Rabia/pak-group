// ROUTE NAME FOR SERVER APIS

const ApiUrls = {
  // AUTHENTICATION
  LOGIN: "/login",
  LOGOUT: "logout",
  //forgot password
  POST_PASSWORD_RESET_EMAIL:"password/email",
  POST_UPDATE_PASSWORD:"update_password",
//dashboard
GET_LEAD_REPORT_DATA:"admin/dashboard/leads_report",
POST_LEAD_FILTER:"admin/dashboard/filterLeadsReport",
GET_EMPLOYEE_LEAD_REPORT:"employee/dashboard/leads_report",
GET_EMPLOYEE_LEAD_REPORT_DATA:"admin/dashboard/user_report?page=",
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
  POST_CREATE_EXISTING_PROJECT_INVENTORIES:"admin/project/addInventory",
  EDIT_PROJECT: "admin/project/edit",
  DELETE_PROJECT: "admin/project/delete/",
  INVENTORY_REQUEST: "admin/inventoryRequest/all",

  GET_ALL_PROJECTS: "admin/project/all",
  GET_ALL_PROJECTS_PAGINATION: "admin/project/all?page=",
  GET_SINGLE_PROECT_INVENTORIES: "admin/inventory/all",
  POST_All_EDITED_INVENTORIES: "admin/inventory/edit",
  GET_DELETED_INVENTORIES: "admin/inventory/delete/",

  //   VIEWABLE
  ASSIGN_VIEWABLE_INVETORIES: "",
  GET_USER_VIEWABLE_INVENTORIES: "employee/inventory/all/",
  GET_ALL_VIEWABLE_INVENTORIES: "admin/viewable/getProjects",
  GET_ALL_EMPLOYEES: "admin/viewable/getEmployees",
  POST_ALL_SELECTED_EMPLOYEES_AND_INVENTORY: "admin/viewable/add",

  // LEADS
  CREATE_LEAD: "admin/lead/add",
  EDIT_LEAD: "admin/lead/edit",
  CALL_TO_ACTION: "admin/lead/cta",
  DELETE_LEAD: "admin/lead/delete", 
  GET_ALL_LEADS: "admin/lead/all",
  GET_USER_LEADS: "employee/lead/all",
  GET_USER_LEADS_PAGINATION:"employee/lead/all?page=",
  GET_TO_DO_LEADS_PAGINATION:"employee/lead/getToDoLeads",
  EMPLOYEE_ACTION: "employee/lead/edit",
  GET_EMPLOYEE_LEAD_ACTION:"admin/empAction/lead",
  GET_ALL_CLOSED_LEADS:"admin/lead/close",
  GET_ALL_LEADS_PAGINATION: "admin/lead/all?page=",
  POST_CLOSE_OR_WIN_LEAD:"admin/lead/closeLead",
  //excel sheet read api
  POST_ADD_LEAD_USING_EXCEL_SHEET:"admin/lead/addLeads",
// filter 
GET_FILTER_DATA:"admin/lead/getleads",
GET_LEAD_ALLOCATION_FILTER_DATA:"admin/leadAllocation/filterLeads",
GET_EMPLOYE_PROJECT:"employee/inventory/projects",
GET_EMPLOYEE_LEAD_FILTER_DATA:"employee/lead/filter",
  // LEAD ALLOCATION
  GET_ALL_ALLOCATE_OR_RE_ALLOCATE_LEADS: "admin/leadAllocation/all",
  GET_ALL_ALLOCATE_OR_RE_ALLOCATE_LEADS_PAGINATION: "admin/leadAllocation/all?page=",
  ASSIGN_LEAD_TO_USER: "leadAllocation/assign",
  UPDATE_LEAD_TO_USER: "admin/leadAllocation/assign",
  POST_ADD_MULTIPLE_LEAD_ALLOCATION: "admin/leadAllocation/leads",
  //policy
  GET_POLICY_LIST: "admin/policy/list",
  EDIT_POLICY_DETAILS:"admin/policy/edit/",
  DELETE_POLICY_DETAILS:"admin/policy/delete/",
  ADD_POLICY_DETAILS:"admin/policy/add",
  GET_EMPLOYEE_POLICY_LIST:"employee/policy/list",
//notifications 
GET_EMPLOYEE_NOTIFICATIONS:"employee/notifications/all",
GET_EMPLOYEE_NOTIFICATION_ON_LEAD:"employee/adminAction/showLead",
POST_CLOSED_LEAD_NOTIFICATION:"employee/adminAction/closedlead",
GET_ADMIN_NITIFICATIONS:"admin/notifications/all",
GET_ADMIN_NOTIFICATION_ON_LEAD:"admin/empAction/showLead",
GET_EMPLOYEE_iNVENTORY_REQUEST_NOTIFICATION:"admin/inventoryRequest/getRequest",
GET_EMPLOYEE_NEW_INVENTORIES_NOTIFICATION:"employee/inventory/newInventories",
GET_EMPLOYE_RECORDING_ON_LEAD:"admin/lead/showLead",
//notification count
GET_EMPLOYEE_NOTIFICATION_COUNT:"employee/notifications/count",
GET_ADMIN_NOTIFICATION_COUNT:"admin/notifications/count",

  //   Account
  GET_EMPLOYEE_DETAIL_LIST:"admin/accounts/employee/getEmployees",
  POST_EMPLOYEE_DETAIL:"admin/accounts/employee/add",
  POST_EDIT_EMPLOYEE_DETAILS:"admin/accounts/employee/edit",
  DELETE_EMPLOYEE:"admin/accounts/employee/delete",
  GET_SINGLE_EMPLOYEE_ATTENDANCE:"admin/accounts/attendance/showList",


  // Interest
  GET_ALL_INTEREST: "admin/interest/all",
  EDIT_INTEREST: "admin/interest/edit",
  DELETE_INTEREST: "admin/interest/delete/",
  ADD_INTEREST: "admin/interest/add",

  // Recording Employee
  ADD_RECORDING: "employee/recording/add",

  // Employee inventory request
  EMPLOYEE_INVENTORY_REQUEST: "employee/inventory/request",
  // employee action on lead
  POST_EMPLOYEE_ACTION_ON_LEAD: "employee/empAction/add",
  // admin action on lead
  GET_ADMIN_ACTION_ON_LEAD:"employee/adminAction/lead",
};

export default ApiUrls;
