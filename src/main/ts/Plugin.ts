import { document } from "@ephox/dom-globals";
import { Editor } from "tinymce";

declare const tinymce: any;

const setup = (editor: Editor, url) => {
  editor.addButton("separator", {
    image: tinymce.baseURL + "/plugins/separator/assets/icons/separator.png",
    icon: false,
    onclick: () => {
      editor.execCommand(
        "mceInsertContent",
        false,
        `<p style="line-height:1px; width: 100%; border-top:1px solid #636363; margin:0; padding: 0;"></p><p></p>`
      );
      editor.insertContent(`<p></p>`);
    }
  });

  const toWrappedContent = function(element) {
    if (element.nodeName.toLowerCase() === "body") {
      const parent = element;
      const wrapper = parent.createElement("div");
      wrapper.appendChild(element);
      return wrapper;
    } else {
      const parent = element.parentNode;
      const wrapper = document.createElement("div");

      // set the wrapper as child (instead of the element)
      parent.replaceChild(wrapper, element);
      // set element as child of wrapper
      wrapper.appendChild(element);
      return wrapper;
    }
  };

  const toUnwrappedContent = function(element, className) {
    // get the element's parent node
    const parent = findUpClass(element, className);
    if (!parent) {
      return null;
    }
    const granParent = parent.parentNode;

    // move all children out of the element
    while (parent.firstChild) {
      granParent.insertBefore(parent.firstChild, parent);
    }

    // remove the empty element
    granParent.removeChild(parent);

    return granParent;
  };

  const wrapContent = function(selection, options?) {
    const wrapper = toWrappedContent(selection);
    wrapper.style.backgroundColor = "#f3f3f3";
    wrapper.style.border = "1px solid #bbb";
    wrapper.style.paddingLeft = "1rem";
    wrapper.style.paddingRight = "1rem";
    wrapper.style.borderRadius = "4px";
    if (options) {
      Object.assign(wrapper.style, options);
    }
    return wrapper;
  };

  const wrapTable = function(table, options?) {
    const parent = table.parentNode;
    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    wrapper.style["overflow-x"] = "auto";
    if (options) {
      Object.assign(wrapper.style, options);
    }

    parent.replaceChild(wrapper, table);
    // set element as child of wrapper
    wrapper.appendChild(table);

    return wrapper;
  };

  const findUpTag = function(el, tag) {
    if (el.nodeName.toLowerCase() === tag.toLowerCase()) {
      return el;
    }
    while (el.parentNode) {
      el = el.parentNode;
      if (el.nodeName.toLowerCase() === tag.toLowerCase()) {
        return el;
      }
    }
    return null;
  };

  const findUpClass = function(el, className) {
    if (el.classList && el.classList.contains(className)) {
      return el;
    }
    while (el.parentNode) {
      el = el.parentNode;
      if (el.classList && el.classList.contains(className)) {
        return el;
      }
    }
    return null;
  };

  editor.addButton("wrapper", {
    type: "splitbutton",
    icon: "insert-time",
    tooltip: "Wrap element into container",
    text: "Wrap",
    classes: "wrap-content",
    onclick: () => {
      const selection =
        (editor.selection && editor.selection.getNode()) || null;
      if (!selection) {
        return;
      }

      const table = findUpTag(selection, "table");
      const container = findUpClass(selection, "editor-container");

      if (container) {
        toUnwrappedContent(selection, "editor-container");
      } else if (table) {
        const wrapper = wrapTable(table);
        wrapper.classList.add("editor-container");
      } else {
        const wrapper = wrapContent(selection, {
          backgroundColor: "#f3f3f3",
          border: "1px solid #bbb"
        });
        wrapper.classList.add("editor-container");
        wrapper.classList.add("editor-container-gray");
      }
    },
    menu: [
      {
        text: "Gris",
        classes: "wrap-content-gray",
        onclick: function() {
          const selection =
            (editor.selection && editor.selection.getNode()) || null;
          if (!selection) {
            return;
          }
          const table = findUpTag(selection, "table");
          const container = findUpClass(selection, "editor-container");
          let wrapper;

          if (container) {
            toUnwrappedContent(selection, "editor-container");
          }
          if (table) {
            wrapper = wrapTable(table, {
              backgroundColor: "#f3f3f3"
            });
          } else {
            wrapper = wrapContent(selection, {
              backgroundColor: "#f3f3f3",
              border: "1px solid #bbb"
            });
          }

          if (wrapper) {
            wrapper.classList.add("editor-container");
            wrapper.classList.add("editor-container-gray");
          }
        }
      },
      {
        text: "Bleu",
        classes: "wrap-content-blue",
        onclick: function() {
          const selection =
            (editor.selection && editor.selection.getNode()) || null;
          if (!selection) {
            return;
          }
          const table = findUpTag(selection, "table");
          const container = findUpClass(selection, "editor-container");
          let wrapper;

          if (container) {
            toUnwrappedContent(selection, "editor-container");
          }
          if (table) {
            wrapper = wrapTable(table, {
              backgroundColor: "#d9edf6"
            });
          } else {
            wrapper = wrapContent(selection, {
              backgroundColor: "#d9edf6",
              border: "1px solid #beddeb"
            });
          }

          if (wrapper) {
            wrapper.classList.add("editor-container");
            wrapper.classList.add("editor-container-blue");
          }
        }
      },
      {
        text: "Vert",
        classes: "wrap-content-green",
        onclick: function() {
          const selection =
            (editor.selection && editor.selection.getNode()) || null;
          if (!selection) {
            return;
          }
          const table = findUpTag(selection, "table");
          const container = findUpClass(selection, "editor-container");
          let wrapper;

          if (container) {
            toUnwrappedContent(selection, "editor-container");
          }
          if (table) {
            wrapper = wrapTable(table, {
              backgroundColor: "#def0d8"
            });
          } else {
            wrapper = wrapContent(selection, {
              backgroundColor: "#def0d8",
              border: "1px solid #b9d4b0"
            });
          }

          if (wrapper) {
            wrapper.classList.add("editor-container");
            wrapper.classList.add("editor-container-green");
          }
        }
      },
      {
        text: "Jaune",
        classes: "wrap-content-yellow",
        onclick: function() {
          const selection =
            (editor.selection && editor.selection.getNode()) || null;
          if (!selection) {
            return;
          }
          const table = findUpTag(selection, "table");
          const container = findUpClass(selection, "editor-container");
          let wrapper;

          if (container) {
            toUnwrappedContent(selection, "editor-container");
          }
          if (table) {
            wrapper = wrapTable(table, {
              backgroundColor: "#fdf8e4"
            });
          } else {
            wrapper = wrapContent(selection, {
              backgroundColor: "#fdf8e4",
              border: "1px solid #f4edd1"
            });
          }

          if (wrapper) {
            wrapper.classList.add("editor-container");
            wrapper.classList.add("editor-container-yellow");
          }
        }
      }
    ]
  });

  editor.addButton("citation", {
    image: tinymce.baseURL + "/plugins/separator/assets/icons/quote.png",
    icon: false,
    tooltip: "Wrap element into quote",
    classes: "wrap-citation",
    onclick: () => {
      const selection =
        (editor.selection && editor.selection.getNode()) || null;
      if (!selection) {
        return;
      }
      const parentNode = findUpClass(selection, "editor-citation");

      if (parentNode) {
        toUnwrappedContent(selection, "editor-citation");
      } else {
        const wrapper = toWrappedContent(selection);
        wrapper.style.borderLeft = "0.2rem solid #ccc";
        wrapper.style.paddingLeft = "1rem";
        wrapper.style.marginLeft = "1rem";
        wrapper.style.marginTop = "0.5rem";
        wrapper.style.marginBottom = "0.5rem";
        wrapper.classList.add("editor-citation");
        editor.insertContent(`<p></p>`);
      }
    }
  });

  const editorEventCallback = function(e) {
    if (!e) {
      return;
    }
    const element = e.element;
    if (!element) {
      return;
    }

    const parentNode = findUpClass(element, "editor-container");
    if (parentNode) {
      $(".mce-wrap-content").addClass("mce-active");
    } else {
      $(".mce-wrap-content").removeClass("mce-active");
    }

    const colors = ["gray", "blue", "green", "yellow"];
    for (const color of colors) {
      if (
        parentNode &&
        parentNode.classList.contains(`editor-container-${color}`)
      ) {
        $(`.mce-wrap-content-${color}`).addClass("mce-active");
      } else {
        $(`.mce-wrap-content-${color}`).removeClass("mce-active");
      }
    }

    const pNode = findUpClass(element, "editor-citation");
    if (pNode) {
      $(".mce-wrap-citation").addClass("mce-active");
    } else {
      $(".mce-wrap-citation").removeClass("mce-active");
    }
  };
  editor.on("NodeChange", editorEventCallback);
  // editor.off("NodeChange", editorEventCallback);
};

tinymce.PluginManager.add("separator", setup);

// tslint:disable-next-line:no-empty
export default () => {};
