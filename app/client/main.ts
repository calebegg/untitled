import { keymap, KeyBinding } from "@codemirror/view";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { StreamLanguage } from "@codemirror/stream-parser";
import { haskell } from "@codemirror/legacy-modes/mode/haskell";

import { oneDark } from "./theme";

let socket = new WebSocket("ws://localhost:4567/");

socket.addEventListener("open", () => {
  socket.addEventListener("message", ({ data }) => {
    console.log(JSON.parse(data).data);
  });
});

import { underlineSelection } from "./highlights";

let commands: KeyBinding[] = [
  {
    key: "Shift-Enter",
    run: (view) => {
      const { state } = view;
      if (socket.readyState === WebSocket.OPEN) {
        let { from } = state.selection.main;
        socket.send(state.doc.lineAt(from).text);
        return underlineSelection(view);
      } else {
        return false;
      }
    },
  },
];

window.addEventListener("load", () => {
  let editor = new EditorView({
    state: EditorState.create({
      extensions: [
        basicSetup,
        oneDark,
        StreamLanguage.define(haskell),
        keymap.of(commands),
      ],
    }),
    parent: document.body,
  });
});
