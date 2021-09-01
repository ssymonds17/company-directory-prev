const baseURL = 'http://192.168.64.2/project2-api/php';

export const fetchEmployees = async () => {
  const result = await fetch(`${baseURL}/getEmployees.php`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
  return result.data;
};

export const fetchDepartments = async () => {
  const result = await fetch(`${baseURL}/getDepartments.php`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
  return result.data;
};

export const fetchLocations = async () => {
  const result = await fetch(`${baseURL}/getLocations.php`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
  return result.data;
};

export const updateEmployee = async (employee) => {
  const { id, firstName, lastName, email, jobTitle, department } = employee;
  const result = await fetch(
    `${baseURL}/updateEmployee.php?firstName=${firstName}&lastName=${lastName}&jobTitle=${jobTitle}&email=${email}&departmentID=${department}&id=${id}`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
  return result.status;
};

export const createEmployee = async (employee) => {
  const { firstName, lastName, email, jobTitle, department } = employee;
  const url = `${baseURL}/insertEmployee.php?firstName=${firstName}&lastName=${lastName}&jobTitle=${jobTitle}&email=${email}&departmentID=${department}`;
  const result = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
  return result.status;
};
