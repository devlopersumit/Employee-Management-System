import { useEffect, useState } from "react";

 function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDepartments() {
    try {
      const res = await fetch("http://localhost:5000/api/departments");
      const data = await res.json();

      if (data.success) {
        setDepartments(data.departments);
      }
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDepartments();
  }, []);

  if (loading) return <p className="flex justify-center items-center text-xl">Loading...</p>;

  return (
    <div>
      <h2>Departments</h2>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id}>
              <td>{dept.name}</td>
              <td>{dept.code}</td>
              <td>{dept.description || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentList;