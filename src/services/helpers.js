export const validateEmployeeEdit = (updatingEmployee) => {
  // ADD IN REGEX FOR EMAIL
  const stringRegex = new RegExp(/[ `!@#$%^&*()_+\=[\]{};':"\\|,.<>/?~0-9]/);
  let stringValid = true;
  if (
    stringRegex.test(updatingEmployee.firstName) ||
    stringRegex.test(updatingEmployee.lastName) ||
    stringRegex.test(updatingEmployee.jobTitle)
  ) {
    stringValid = false;
  }
  return stringValid;
};
