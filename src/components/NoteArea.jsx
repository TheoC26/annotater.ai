import React from "react";

const NoteArea = ({ notes, setNotes, updateNotes }) => {
  const doneTypingInterval = 1000;
  var typingTimer;
  function doneTyping() {
    updateNotes();
  }
  return (
    <div className="mx-6 p-3 bg-grey border-12 border-grey rounded-[3rem]">
      <textarea
        name="notes"
        className="bg-grey w-full outline-none p-3 resize-none"
        placeholder="Add your notes here..."
        cols="30"
        rows="10"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onKeyDown={(e) => {
          clearTimeout(typingTimer);
        }}
        onKeyUp={(e) => {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }}
      ></textarea>
    </div>
  );
};

export default NoteArea;
