function CriarAula() {
    return (
      <div>
        <h1>Criar Nova Aula</h1>
        <form>
          <label>Título da Aula:</label>
          <input type="text" placeholder="Título" required />
  
          <label>Descrição da Aula:</label>
          <textarea placeholder="Descrição da aula" required></textarea>
  
          <label>Data e Hora:</label>
          <input type="datetime-local" required />
  
          <button type="submit">Criar Aula</button>
        </form>
      </div>
    );
  }
  
  export default CriarAula;
  