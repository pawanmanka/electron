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
    <div style={{ padding: "40px" }}>
      <h2>Patient Management (Electron + SQLite)</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={addPatient} style={{ marginLeft: "10px" }}>
          Add Patient
        </button>
        <button onClick={loadPatients} style={{ marginLeft: "10px" }}>
          Load Patients
        </button>
      </div>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
