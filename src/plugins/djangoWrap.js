import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export const DJANGO_VARIABLE_REGEX = /(\{\{)(.*?)(\}\})/g;
export const DJANGO_TAG_REGEX = /\{%[ ]*(.*)[^(%})]+%\}/gi;

const findDjangoTags = (doc) => {
  const decorations = [];

  doc.descendants((node, position) => {
    if (!node.text) {
      return
    }

    console.log(node);

    Array.from(node.text.matchAll(DJANGO_VARIABLE_REGEX)).forEach(match => {
      const tag = match[0]
      const index = match.index || 0
      const from = position + index
      const to = from + tag.length
      const decoration = Decoration.inline(from, to, {
        nodeName: 'span',
        class: 'custom-tag',
        style: `border: 1px dashed blue`,
      })

      decorations.push(decoration)
    })

    Array.from(node.text.matchAll(DJANGO_TAG_REGEX)).forEach(match => {
      const tag = match[0]
      const index = match.index || 0
      const from = position + index
      const to = from + tag.length
      const decoration = Decoration.inline(from, to, {
        nodeName: 'span',
        class: 'custom-tag',
        style: `border: 1px dashed red`,
      })

      decorations.push(decoration)
    })
  })

  const output = DecorationSet.create(doc, decorations);

  return output
}

export const DjangoWrapper = Extension.create({
  name: 'djangoWrapper',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findDjangoTags(doc)
          },
          apply(transaction, oldState) {
            return transaction.docChanged ? findDjangoTags(transaction.doc) : oldState
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
      }),
    ]
  },
})
