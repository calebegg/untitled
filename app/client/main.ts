import { keymap, KeyBinding } from "@codemirror/view";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";

import { StreamLanguage } from "@codemirror/stream-parser";
import { haskell } from "@codemirror/legacy-modes/mode/haskell";

import { oneDark } from "./theme";

import { ipcRenderer } from "electron";

ipcRenderer.on("ghci", (event, ...args) => {
  console.log(args);
});

let commands: KeyBinding[] = [
  {
    key: "Shift-Enter",
    run: ({ state, dispatch }) => {
      let { from } = state.selection.main;
      ipcRenderer.send("ghci", state.doc.lineAt(from).text);
      return true;
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
