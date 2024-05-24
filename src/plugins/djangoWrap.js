import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export const DJANGO_VARIABLE_REGEX = /(\{\{)(.*?)(\}\})/g;
export const DJANGO_TAG_REGEX = /\{%[ ]*(.*)[^(%})]+%\}/gi;

const findDjangoTags = (doc) => {
  const decorations = [];

  const makeDecoration = (node, position, tag, color) => {
    const index = node.text.indexOf(tag)
    const from = position + index
    const to = from + tag.length
    const decoration = Decoration.inline(from, to, {
      nodeName: 'span',
      class: 'custom-tag',
      style: `border: 1px dashed ${color}`,
    })

    decorations.push(decoration)
  }

  doc.descendants((node, position) => {
    if (!node.text) {
      return
    }

    Array.from(node.text.matchAll(DJANGO_VARIABLE_REGEX)).forEach(match => {
      makeDecoration(node, position, match[0], 'blue')
    })

    Array.from(node.text.matchAll(DJANGO_TAG_REGEX)).forEach(match => {
      makeDecoration(node, position, match[0], 'red')
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
