// ---------- VALIDATION FUNCTIONS ----------------
export const validateEmployee = (employee, setError) => {
  const stringRegex = new RegExp(/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~0-9]/);
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const properties = ['firstName', 'lastName', 'jobTitle'];

  for (let i = 0; i < properties.length; i++) {
    const invalidString = stringRegex.test(employee[properties[i]]);
    if (invalidString || !employee[properties[i]]) {
      setError(
        'All fields must contain at least 1 character and contain no special characters'
      );
      return false;
    }
  }
  const validEmail = emailRegex.test(employee['email']);
  if (!validEmail || !employee['email']) {
    setError('Please use valid email address');
    return false;
  }
  setError('');
  return true;
};

export const validateNewDepartment = (
  department,
  departmentsList,
  setError
) => {
  const stringRegex = new RegExp(/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~0-9]/);
  const invalidString = stringRegex.test(department['name']);
  if (invalidString || !department['name']) {
    setError(
      'Department name contain at least 1 character and contain no special characters'
    );
    return false;
  }

  const duplicate = checkDepartmentDuplicate(department, departmentsList);
  if (duplicate) {
    setError('Department with that name already exists');
    return false;
  }

  setError('');
  return true;
};

const checkDepartmentDuplicate = (department, departmentsList) => {
  const departNameLower = department.name.toLowerCase();
  for (let i = 0; i < departmentsList.length; i++) {
    const itemNameLower = departmentsList[i].name.toLowerCase();
    if (itemNameLower === departNameLower) {
      return true;
    } else {
      return false;
    }
  }
};

// ---------- CONVERSION FUNCTIONS ----------------
// Convert name of department into an id which can interact with the database
export const convertDepartmentToDepartmentID = (employee, departments) => {
  const departmentName = employee.department;
  const departObj = departments.filter((item) => item.name === departmentName);
  return Number(departObj[0].id);
};
