import Swal from "sweetalert2";
import words from "./db.json";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import DataTable from "./component/DataTable";
function App() {
  const [start, setStart] = useState(false);
  const [text, setText] = useState("");
  const [randomIndex, setRandomIndex] = useState(0);
  const handleRandom = () => {
    const index = Math.floor(Math.random() * words.palabras.length);
    setRandomIndex(index);
  };
  useEffect(() => {
    handleRandom();
  }, []);
  const handleValidate = (text, trueText) => {
    if (text.trim().toLowerCase() === trueText.trim().toLowerCase()) {
      Swal.fire({
        icon: "success",
        title: "win",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: trueText,
        text: words.palabras[randomIndex].nota,
      });
    }
    handleRandom();
    setText("");
  };
  return (
    <>
      <Grid
        container
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        xs={12}
      >
        <Grid item xs={12}>
          <Typography variant="h2" component="h2">
            {words.palabras[randomIndex].incorrecta}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {!start ? (
            <Button onClick={() => setStart(true)} variant="contained">
              Empezar
            </Button>
          ) : (
            <>
              <TextField
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleValidate(text, words.palabras[randomIndex].palabra);
                  }
                }}
                label="Corrige la palabra"
                variant="outlined"
              />
              <Button
                fullWidth
                onClick={() =>
                  handleValidate(text, words.palabras[randomIndex].palabra)
                }
                variant="contained"
              >
                Validar
              </Button>
            </>
          )}
        </Grid>
      </Grid>

      <div>
        <h1>Lista de Palabras</h1>
        <DataTable
          listTitles={["Palabra", "Nota", "Incorrecta"]}
          listKeys={["palabra", "nota", "incorrecta"]}
          dataList={words.palabras}
        />
        <ul>
          {words.palabras.map((word, index) => (
            <li key={index}>
              <strong>Correcto:</strong> {word.palabra},{" "}
              <strong>Incorrecto:</strong> {word.incorrecta}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
