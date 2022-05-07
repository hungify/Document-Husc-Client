import axiosInstance from "services/initRequest";

const departmentService = {
  fetchDepartments: () => {
    const url = "departments";
    return axiosInstance.get(url);
  },
  createDepartment: (label) => {
    const url = "departments";
    return axiosInstance.post(url, { label });
  },
  editDepartment: (label, departmentId) => {
    const url = `departments/${departmentId}`;
    return axiosInstance.patch(url, { label });
  },
};

export default departmentService;
