import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

const AddClientePage = () => {
  const { handleSubmit, register, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const onSubmit = async (data) => {
    setSubmitting(true);

    // Format the date field before submission
    data.data_nascimento = `${data.data_nascimento}T00:00:00`;

    try {
      const response = await fetch("http://localhost:8000/api/v1/cliente", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSnackbarMessage("Cliente adicionado com sucesso!");
        setSnackbarSeverity("success");
        reset();
      } else {
        setSnackbarMessage("Erro ao adicionar cliente.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error adding cliente:", error);
      setSnackbarMessage("Error adding cliente.");
      setSnackbarSeverity("error");
    }

    setSubmitting(false);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
      >
        <Alert severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <h1>Add Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nome"
          {...register("nome", { required: true })}
        />
        <TextField
          label="Sobrenome"
          {...register("sobrenome", { required: true })}
        />
        <TextField
          label="CPF"
          {...register("cpf", { required: true })}
        />
        <TextField
          label="RG"
          {...register("rg", { required: true })}
        />
        <TextField
          label="Data de Nascimento"
          type="date"
          {...register("data_nascimento", { required: true })}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Telefone"
          {...register("telefone", { required: true })}
        />
        <FormControl>
          <InputLabel id="sexo-label">Sexo</InputLabel>
          <Select
            labelId="sexo-label"
            {...register("sexo", { required: true })}
          >
            <MenuItem value="m">Male</MenuItem>
            <MenuItem value="f">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="estado-civil-label">Estado Civil</InputLabel>
          <Select
            labelId="estado-civil-label"
            {...register("estado_civil", { required: true })}
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="married">Married</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
};

export default AddClientePage;
