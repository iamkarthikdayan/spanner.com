const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirm) {
    alert("Passwords do not match!");
    return;
  }
  if (!form.role) {
    alert("Please select your role.");
    return;
  }

  // ✅ Create FormData for files + text fields
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("role", form.role);
  formData.append("address", form.address);
  formData.append("phoneno", form.phoneno);
  formData.append("location", form.location);

  // ✅ Send specialization as JSON
  if (form.role === "provider") {
    formData.append("specialization", JSON.stringify(form.specialization));
  }

  // ✅ Add files if selected
  if (form.license) formData.append("license", form.license);
  if (form.documents) formData.append("documents", form.documents);

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    console.log("Backend Response:", data);
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong");
  }
};
