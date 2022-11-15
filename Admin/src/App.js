import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, materia: "Sist. Distribuidos", docente: "Azcurra Diego", dia: "Lunes 8:00 - 12:00" },
  { id: 2, materia: "Base de Datos", docente: "Hernan Amatriain", dia: "Viernes 8:00 - 12:00" },
  { id: 3, materia: "IOT", docente: "Alejandra Vranik", dia: "Jueves 8:00 - 12:00" },
  { id: 4, materia: "Matematica 3", docente: "Eduardo Diez", dia: "Miercoles 8:00 - 12:00" },
  { id: 5, materia: "Programacion", docente: "Roberto Garcia", dia: "Martes 8:00 - 12:00"},
  { id: 6, materia: "TFI", docente: "Laura Loidi", dia: "Martes 8:00 - 12:00" },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      materia: "",
      docente: "",
      dia:"",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].materia = dato.materia;
        arreglo[contador].docente = dato.docente;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Cargar</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>materia</th>
                <th>docente</th>
                <th>Dia</th>
                <th>Acción</th>
                
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.materia}</td>
                  <td>{dato.docente}</td>
                  <td>{dato.dia}</td>
                  <td>
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Agregar en el href la ruta al docu ( el docu tiene que estar en public) */}
          {/* https://www.youtube.com/watch?v=nb4vZqjG4Kg&list=TLPQMDExMTIwMjIVcF6j9L_lwg&index=1 */}
          <ul>
            <li>  <a href="" download={''}>Descargar Turno Maniana</a>  </li>
            <li>  <a href="" download={''}>Descargar Turno Tarde</a>  </li>
            <li>  <a href="" download={''}>Descargar Turno Noche</a>  </li>
          </ul>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Materia: 
              </label>
              <input
                className="form-control"
                name="materia"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.materia}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                docente: 
              </label>
              <input
                className="form-control"
                name="docente"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.docente}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Materia</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                  materia: 
              </label>
              <input
                className="form-control"
                name="materia"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                docente: 
              </label>
              <input
                className="form-control"
                name="docente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            {/* Hay que insertar para agregar horario */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha fabricación"
                    className='fabricationDate'
                    value={fabricationDate}
                    onChange={(newValue) => {
                      setFabricationDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
              </LocalizationProvider> */}
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
