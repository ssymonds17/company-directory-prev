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
