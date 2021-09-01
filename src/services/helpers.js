export const validateEmployeeEdit = (updatingEmployee, setError) => {
  const stringRegex = new RegExp(/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~0-9]/);
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const properties = ['firstName', 'lastName', 'jobTitle'];

  for (let i = 0; i < properties.length; i++) {
    const invalidString = stringRegex.test(updatingEmployee[properties[i]]);
    if (invalidString || !updatingEmployee[properties[i]]) {
      setError(
        'All fields must contain at least 1 character and contain no special characters'
      );
      return false;
    }
  }
  const validEmail = emailRegex.test(updatingEmployee['email']);
  if (!validEmail || !updatingEmployee['email']) {
    setError('Please use valid email address');
    return false;
  }
  setError('');
  return true;
};

export const convertDepartmentToDepartmentID = (employee, departments) => {
  const departmentName = employee.department;
  const departObj = departments.filter((item) => item.name === departmentName);
  return Number(departObj[0].id);
};
