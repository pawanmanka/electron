import { useEffect, useState } from "react";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

  // Load patients on component mount
  useEffect(() => {
    loadPatients();
  }, []);

  // Function to load patients from main process
  const loadPatients = async () => {
    try {
      const data = await window.api.getPatients();
      setPatients(data);
    } catch (err) {
      console.error("Error loading patients:", err);
    }
  };

  // Function to add a patient
  const addPatient = async () => {
    if (!name || !age || !phone) return;

    try {
      await window.api.addPatient({ name, age: Number(age), phone });
      setName("");
      setAge("");
      setPhone("");
      loadPatients(); // refresh table
    } catch (err) {
      console.error("Error adding patient:", err);
    }
  };

  return (
    <div className="container mt-4  align-items-center">
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <input
          className="form-control mb-1" 
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className="col-sm-12 col-md-4">
           <input
          className="form-control mb-1" 
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}          
        />
        </div>
        <div className="col-sm-12 col-md-4">
          <input
          className="form-control mb-1" 
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /> 
        </div>               
      </div>
      <div className="row d-inline">
        <button onClick={addPatient}  className="btn btn-success btn-sm m-1 w-50">
          Add Patient
        </button>
        <button onClick={loadPatients}  className="btn btn-warning btn-sm m-1 w-50">
          Load Patients
        </button>
      </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
              patients.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No patient records found
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
    // <div style={{ padding: "40px" }}>
    //   <h2>Patient Management (Electron + SQLite)</h2>

    // </div>
  );
}
