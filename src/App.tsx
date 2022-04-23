import { useState } from "react";
interface INote {
  done: boolean;
  text: string;
}
function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [note, setNote] = useState("");
  function saveNote() {
    setNotes([...notes, { done: false, text: note }]);
    setNote("");
  }
  function updateNote(idx: number) {
    return () => {
      setNotes((prev) =>
        prev.map((n, i) => (i == idx ? { ...n, done: !n.done } : n))
      );
    };
  }
  return (
    <div>
      <h2>Notes App - With Vim</h2>
      <input
        type="text"
        placeholder="encriba una nota..."
        value={note}
        onChange={({ target }) => setNote(target.value)}
        onKeyDown={({ key }) => {
          if (key == "Enter") {
            saveNote();
          }
        }}
      />
      {notes.map(({ done, text }, i) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          key={i.toString()}
        >
          <input type="checkbox" checked={done} onChange={updateNote(i)} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
