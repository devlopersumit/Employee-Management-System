import { Link } from "react-router-dom";

 function AdminSidebar() {
  return (
    <div style={{ width: "200px", padding: "20px", background: "#f3f3f3" }}>
      <h3>Admin Panel</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/admin/departments">Departments</Link></li>
        <li><Link to="/admin/departments/add">Add Department</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/users/add">Add User</Link></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;