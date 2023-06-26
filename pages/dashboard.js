import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

const DashboardPage = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/cliente", {
          method: "GET",
          mode: "cors",
          credentials: "include",
        });
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "sobrenome", headerName: "Sobrenome", width: 200 },
    { field: "cpf", headerName: "CPF", width: 150 },
    { field: "rg", headerName: "RG", width: 150 },
    { field: "data_nascimento", headerName: "Data de Nascimento", width: 200 },
    { field: "sexo", headerName: "Sexo", width: 150 },
    { field: "estado_civil", headerName: "Estado Civil", width: 150 },
    { field: "telefone", headerName: "Telefone", width: 150 },
  ];

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8}>
        <h1>Clientes</h1>
        <Box color="black" bgcolor="ghostwhite" p={1}>
          <DataGrid
            rows={clientes}
            columns={columns}
            pageSize={5}
            getCellClassName={(params) =>
              params.field === "sexo"
                ? params.value === "m"
                  ? "sexo-masculino"
                  : "sexo-feminino"
                : ""
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
