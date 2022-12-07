import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from "@codemirror/language";
import { completeFromList } from "@codemirror/autocomplete";
import { styleTags, tags as t } from "@lezer/highlight";

export const FLASHILanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      styleTags({
        Identifier: t.variableName,
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "#" },
  },
});

export const FLASHICompletion = FLASHILanguage.data.of({
  autocomplete: completeFromList([
    { label: "echo", type: "function" },
    { label: "press", type: "function" },
  ]),
});

export function EXAMPLE() {
  return new LanguageSupport(FLASHILanguage, [FLASHICompletion]);
}
